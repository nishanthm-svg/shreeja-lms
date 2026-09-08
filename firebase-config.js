// ============================================================================
// Firebase project init — Shreeja Learning Academy runs entirely client-side
// on GitHub Pages, using Firebase's free Spark plan for real accounts
// (Authentication) and per-employee progress (Firestore). No server to run
// or maintain. Loaded once here; api.js is the only other file that touches
// the Firebase SDK directly.
//
// This is a separate Firebase project from Harith Pradesh's, by design, so
// the two organizations' accounts never mix. Firestore security rules
// (role-based: employees can only read/write their own docs, admins —
// verified via a users/{uid}.role lookup — can read/write any employee's)
// are published on the "shreeja-lms" project already.
//
// Offline: Firestore's persistent local cache (IndexedDB) means an
// already-logged-in learner can open lessons, take quizzes, and view
// certificates with no signal — reads come from the on-device cache and
// writes queue there, syncing automatically the next time the device is
// back online. A device's first login still needs a connection, same as
// Auth generally. sw.js handles caching the app's static files themselves.
// ============================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyADZJDAsO2xDF0DtBgN00aTvTWluAdF3Ks",
  authDomain: "shreeja-lms.firebaseapp.com",
  projectId: "shreeja-lms",
  storageBucket: "shreeja-lms.firebasestorage.app",
  messagingSenderId: "713362564638",
  appId: "1:713362564638:web:62dc8422f41019c689300f",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});
