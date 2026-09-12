// ============================================================================
// Firebase-backed API wrapper — Shreeja Learning Academy. Same exported shape
// (api.login, api.myProgress, api.adminListEmployees, etc.) so app.js,
// admin.js and progress-client.js don't need to know Firebase exists —
// only this file and firebase-config.js touch the SDK directly.
//
// Firestore data model:
//   users/{uid}    -> { email, displayName, role: "employee"|"admin",
//                        active, mustChangePassword, createdAt }
//   progress/{uid} -> { [moduleId]: { [lessonId]: {completed, bestScore,
//                        attempts, completedAt, lastAttemptAt} } }
//
// Admin can't set another user's exact password from client-side code (that
// needs the Admin SDK / Cloud Functions, which requires the paid Blaze
// plan). So: admin-created accounts get an initial temp password via a
// secondary Firebase App instance (so the admin's own session isn't
// replaced), and later "reset password" sends the employee a real
// Firebase password-reset email instead of admin typing an exact value.
// ============================================================================
import { firebaseConfig, auth, db } from "./firebase-config.js";
import { MODULES } from "./data.js";
import { initializeApp, deleteApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
  getAuth,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

function friendlyAuthError(e) {
  const code = e && e.code;
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return new Error("Incorrect email or password.");
    case "auth/too-many-requests":
      return new Error("Too many attempts. Please wait a moment and try again.");
    case "auth/email-already-in-use":
      return new Error("That email is already registered.");
    case "auth/weak-password":
      return new Error("Password must be at least 6 characters.");
    case "auth/invalid-email":
      return new Error("That doesn't look like a valid email address.");
    case "auth/requires-recent-login":
      return new Error("Please enter your current password correctly and try again.");
    default:
      return e instanceof Error ? e : new Error(String(e));
  }
}

// Emails allowed to self-provision as admin the first time they sign in —
// solves the chicken-and-egg problem of creating the very first admin
// account without needing direct Firestore console access. Security rules
// already allow a signed-in user to create their OWN users/{uid} doc
// (request.auth.uid == uid), so this needs no rules change.
const BOOTSTRAP_ADMIN_EMAILS = ["nishanth.m@shreejamilk.com"];

function mapUserDoc(uid, data) {
  return {
    id: uid,
    loginId: data.email,
    displayName: data.displayName,
    role: data.role,
    mustChangePassword: !!data.mustChangePassword,
    active: data.active !== false,
  };
}

let authReadyPromise = null;
function waitForAuthInit() {
  if (!authReadyPromise) {
    authReadyPromise = new Promise((resolve) => {
      const unsub = onAuthStateChanged(auth, (user) => {
        unsub();
        resolve(user);
      });
    });
  }
  return authReadyPromise;
}

async function requireActiveUserDoc(uid, email) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    if (email && BOOTSTRAP_ADMIN_EMAILS.includes(email.toLowerCase())) {
      const data = {
        email,
        displayName: "Admin",
        role: "admin",
        active: true,
        mustChangePassword: false,
        createdAt: new Date().toISOString(),
      };
      await setDoc(ref, data);
      return mapUserDoc(uid, data);
    }
    await signOut(auth);
    throw new Error("No account found for this login. Contact your administrator.");
  }
  const data = snap.data();
  if (data.active === false) {
    await signOut(auth);
    throw new Error("Your account has been deactivated. Contact your administrator.");
  }
  return mapUserDoc(uid, data);
}

// ============================================================================
// Session / auth
// ============================================================================
async function login(loginId, password) {
  let cred;
  try {
    cred = await signInWithEmailAndPassword(auth, loginId, password);
  } catch (e) {
    throw friendlyAuthError(e);
  }
  const user = await requireActiveUserDoc(cred.user.uid, cred.user.email);
  return { user };
}

async function logout() {
  await signOut(auth);
}

async function session() {
  const fbUser = await waitForAuthInit();
  if (!fbUser) throw new Error("No session");
  const user = await requireActiveUserDoc(fbUser.uid, fbUser.email);
  return { user };
}

async function changePassword(oldPassword, newPassword) {
  const fbUser = auth.currentUser;
  if (!fbUser) throw new Error("Not signed in.");
  try {
    if (oldPassword) {
      const cred = EmailAuthProvider.credential(fbUser.email, oldPassword);
      await reauthenticateWithCredential(fbUser, cred);
    }
    await updatePassword(fbUser, newPassword);
  } catch (e) {
    throw friendlyAuthError(e);
  }
  await updateDoc(doc(db, "users", fbUser.uid), { mustChangePassword: false });
}

// ============================================================================
// Employee progress
// ============================================================================
async function myProgress() {
  const fbUser = auth.currentUser;
  if (!fbUser) throw new Error("Not signed in.");
  const snap = await getDoc(doc(db, "progress", fbUser.uid));
  return { progress: snap.exists() ? snap.data() : {} };
}

async function quizAttempt(moduleId, lessonId, scorePercent, passed) {
  const fbUser = auth.currentUser;
  if (!fbUser) throw new Error("Not signed in.");
  const ref = doc(db, "progress", fbUser.uid);
  const snap = await getDoc(ref);
  const data = snap.exists() ? snap.data() : {};
  const existing = (data[moduleId] && data[moduleId][lessonId]) || { completed: false, bestScore: 0, attempts: 0, completedAt: null };
  const justCompleted = !existing.completed && !!passed;
  const newState = {
    completed: existing.completed || !!passed,
    bestScore: Math.max(existing.bestScore || 0, scorePercent),
    attempts: (existing.attempts || 0) + 1,
    lastAttemptAt: new Date().toISOString(),
    completedAt: existing.completedAt || (justCompleted ? new Date().toISOString() : null),
  };
  if (snap.exists()) {
    await updateDoc(ref, { [`${moduleId}.${lessonId}`]: newState });
  } else {
    await setDoc(ref, { [moduleId]: { [lessonId]: newState } });
  }
  return { lessonState: newState };
}

// The final exam's own attempt record lives at progress/{uid}.finalExam,
// alongside the per-module keys (moduleIds are always "m1".."m12", so
// "finalExam" can never collide with one) — same document, same security
// rule, nothing new to grant access to.
async function finalExamAttempt(scorePercent, passed) {
  const fbUser = auth.currentUser;
  if (!fbUser) throw new Error("Not signed in.");
  const ref = doc(db, "progress", fbUser.uid);
  const snap = await getDoc(ref);
  const data = snap.exists() ? snap.data() : {};
  const existing = data.finalExam || { passed: false, bestScore: 0, attempts: 0, passedAt: null };
  const justPassed = !existing.passed && !!passed;
  const newState = {
    attempted: true,
    passed: existing.passed || !!passed,
    bestScore: Math.max(existing.bestScore || 0, scorePercent),
    attempts: (existing.attempts || 0) + 1,
    lastAttemptAt: new Date().toISOString(),
    passedAt: existing.passedAt || (justPassed ? new Date().toISOString() : null),
  };
  if (snap.exists()) {
    await updateDoc(ref, { finalExam: newState });
  } else {
    await setDoc(ref, { finalExam: newState });
  }
  return { examState: newState };
}

// ============================================================================
// Admin rollup helper — shared by list + detail views.
// ============================================================================
function computeRollup(progress) {
  const activeModules = MODULES.filter((m) => m.available);
  const totalLessons = activeModules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
  let completedLessons = 0;
  let modulesCompleted = 0;
  let lastActivityAt = null;
  activeModules.forEach((m) => {
    const modProgress = progress[m.id] || {};
    let moduleDone = 0;
    (m.lessons || []).forEach((l) => {
      const st = modProgress[l.id];
      if (st) {
        if (st.completed) {
          completedLessons++;
          moduleDone++;
        }
        if (st.lastAttemptAt && (!lastActivityAt || st.lastAttemptAt > lastActivityAt)) {
          lastActivityAt = st.lastAttemptAt;
        }
      }
    });
    if (m.lessons && m.lessons.length && moduleDone === m.lessons.length) modulesCompleted++;
  });
  const finalExam = progress.finalExam || null;
  return {
    overallPercent: totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0,
    completedLessons,
    totalLessons,
    modulesCompleted,
    totalModules: activeModules.length,
    lastActivityAt,
    finalExamPassed: !!(finalExam && finalExam.passed),
    finalExamBestScore: finalExam ? finalExam.bestScore : null,
  };
}

// ============================================================================
// Admin: roster
// ============================================================================
async function adminListEmployees(search) {
  const snap = await getDocs(query(collection(db, "users"), where("role", "==", "employee")));
  const needle = (search || "").trim().toLowerCase();
  const employees = [];
  for (const d of snap.docs) {
    const u = d.data();
    if (needle && !`${u.displayName || ""} ${u.email || ""}`.toLowerCase().includes(needle)) continue;
    const progSnap = await getDoc(doc(db, "progress", d.id));
    const rollup = computeRollup(progSnap.exists() ? progSnap.data() : {});
    employees.push({
      id: d.id,
      loginId: u.email,
      displayName: u.displayName,
      active: u.active !== false,
      overallPercent: rollup.overallPercent,
      modulesCompleted: rollup.modulesCompleted,
      totalModules: rollup.totalModules,
      lastActivityAt: rollup.lastActivityAt,
      finalExamPassed: rollup.finalExamPassed,
      finalExamBestScore: rollup.finalExamBestScore,
    });
  }
  employees.sort((a, b) => (a.displayName || "").localeCompare(b.displayName || ""));
  return { employees };
}

async function adminGetEmployee(id) {
  const userSnap = await getDoc(doc(db, "users", id));
  if (!userSnap.exists()) throw new Error("Employee not found.");
  const u = userSnap.data();
  const progSnap = await getDoc(doc(db, "progress", id));
  const progress = progSnap.exists() ? progSnap.data() : {};
  const rollup = computeRollup(progress);
  return {
    employee: {
      id,
      loginId: u.email,
      displayName: u.displayName,
      active: u.active !== false,
      ...rollup,
    },
    progress,
  };
}

// ============================================================================
// Admin: create employee — uses a throwaway secondary Firebase App instance
// so creating the new Auth account doesn't sign out the admin's own session
// (createUserWithEmailAndPassword signs in as the new user on whatever auth
// instance it's called against).
// ============================================================================
async function adminCreateEmployee(loginId, displayName, tempPassword) {
  const secondaryApp = initializeApp(firebaseConfig, "Secondary-" + Date.now());
  try {
    const secondaryAuth = getAuth(secondaryApp);
    let cred;
    try {
      cred = await createUserWithEmailAndPassword(secondaryAuth, loginId, tempPassword);
    } catch (e) {
      throw friendlyAuthError(e);
    }
    const newUid = cred.user.uid;
    await signOut(secondaryAuth);
    await setDoc(doc(db, "users", newUid), {
      email: loginId,
      displayName,
      role: "employee",
      active: true,
      mustChangePassword: true,
      createdAt: new Date().toISOString(),
    });
    return { id: newUid };
  } finally {
    await deleteApp(secondaryApp);
  }
}

async function adminResetPassword(id) {
  const snap = await getDoc(doc(db, "users", id));
  if (!snap.exists()) throw new Error("Employee not found.");
  const email = snap.data().email;
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (e) {
    throw friendlyAuthError(e);
  }
  return { email };
}

async function adminDeactivate(id) {
  const ref = doc(db, "users", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Employee not found.");
  const active = snap.data().active !== false;
  await updateDoc(ref, { active: !active });
}

export const api = {
  login,
  logout,
  session,
  changePassword,

  myProgress,
  quizAttempt,
  finalExamAttempt,

  adminListEmployees,
  adminGetEmployee,
  adminCreateEmployee,
  adminResetPassword,
  adminDeactivate,
};
