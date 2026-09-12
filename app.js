import { MODULES, getModule, getLesson, getLessonIndex } from "./data.js";
import {
  getLessonState,
  recordQuizAttempt,
  isLessonUnlocked,
  getModuleProgress,
  getOverallProgress,
  setProgressCache,
  isCourseComplete,
  getFinalExamState,
  recordFinalExamAttempt,
} from "./progress-client.js";
import { LANGUAGES, getLang, setLang, tr, ui } from "./i18n.js";
import { api } from "./api.js";
import * as admin from "./admin.js";
import * as certificates from "./certificates.js";
import { FINAL_EXAM_QUESTIONS, FINAL_EXAM_PASS_PERCENT } from "./exam-data.js";

const root = document.getElementById("app");

const ICONS = {
  check: "✓",
  lock: "🔒",
};

// Lets the admin portal's login screen accept a short username instead of
// a full email address — resolved client-side before calling Firebase Auth,
// which itself only ever sees the real, registered email.
const ADMIN_USERNAME_ALIASES = {
  admin: "nishanth.m@shreejamilk.com",
};

const TOPIC_EMOJIS = ["🥛", "🐄", "🌍", "📈", "🤝", "🏆", "🌾", "💡"];
const CALLOUT_EMOJIS = { info: "💡", tip: "✅", warning: "⚠️" };
const STAT_EMOJIS = ["🎯", "🌟", "🔑", "📌", "✨", "🌱"];

let lang = getLang(); // null until the learner picks one
let currentUser = null; // null until session-checked or logged in

function t(field) {
  return tr(field, lang || "en");
}
function u(key, vars) {
  return ui(key, lang || "en", vars);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Learner-facing lessons/quizzes/certificates work offline (cached app shell +
// Firestore's local persistence); this just keeps the learner informed while
// disconnected so a stalled network doesn't look like a broken app.
function updateOfflineBanner() {
  let banner = document.getElementById("offline-banner");
  if (navigator.onLine) {
    if (banner) banner.hidden = true;
    document.body.classList.remove("has-offline-banner");
    return;
  }
  if (!banner) {
    banner = document.createElement("div");
    banner.id = "offline-banner";
    banner.className = "offline-banner";
    document.body.insertBefore(banner, document.body.firstChild);
  }
  banner.textContent = u("offlineBannerText");
  banner.hidden = false;
  document.body.classList.add("has-offline-banner");
}

window.addEventListener("online", updateOfflineBanner);
window.addEventListener("offline", updateOfflineBanner);

function navigate(hash) {
  if (location.hash === hash) {
    render();
  } else {
    location.hash = hash;
  }
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

// ============================================================================
// Landing page — the very first screen a learner sees.
// ============================================================================
function renderLandingPage() {
  const features = [
    { icon: "📚", title: u("landingFeature1Title"), text: u("landingFeature1Text") },
    { icon: "🌐", title: u("landingFeature2Title"), text: u("landingFeature2Text") },
    { icon: "🎓", title: u("landingFeature3Title"), text: u("landingFeature3Text") },
  ]
    .map(
      (f) => `
      <div class="landing-feature">
        <div class="landing-feature-icon">${f.icon}</div>
        <h3>${escapeHtml(f.title)}</h3>
        <p>${escapeHtml(f.text)}</p>
      </div>`
    )
    .join("");

  return `
    <div class="landing-page">
      <div class="landing-hero">
        <div class="landing-logo"><img src="assets/shreeja-logo.png" alt="Shreeja Mahila Milk Producer Company" /></div>
        <h1>${escapeHtml(u("landingHeroTitle"))}</h1>
        <p>${escapeHtml(u("landingHeroSubtitle"))}</p>
        <div class="landing-cta-row">
          <button type="button" class="btn btn-primary landing-cta" id="landing-employee-login-btn">${escapeHtml(u("employeeLoginButton"))}</button>
          <button type="button" class="btn btn-outline landing-cta" id="landing-admin-login-btn">${escapeHtml(u("adminLoginButtonLabel"))}</button>
        </div>
      </div>
      <div class="page landing-body">
        <div class="landing-features">${features}</div>
        <div class="landing-supported">
          <div class="landing-supported-label">${escapeHtml(u("landingSupportedBy"))}</div>
          <div class="landing-logos">
            <img class="landing-logo-img" src="assets/nddb-logo.png" alt="National Dairy Development Board" />
            <img class="landing-logo-img" src="assets/nddb-dairy-services-logo.png" alt="NDDB Dairy Services" />
          </div>
        </div>
      </div>
    </div>
  `;
}

function wireLandingPage() {
  const empBtn = document.getElementById("landing-employee-login-btn");
  const adminBtn = document.getElementById("landing-admin-login-btn");
  if (empBtn) empBtn.addEventListener("click", () => navigate("#/login/employee"));
  if (adminBtn) adminBtn.addEventListener("click", () => navigate("#/login/admin"));
}

// ============================================================================
// Login / auth pages
// ============================================================================
function renderLoginPage(loginAs) {
  const title = loginAs === "admin" ? u("adminLoginTitle") : loginAs === "employee" ? u("employeeLoginTitle") : u("loginTitle");
  return `
    <div class="auth-page">
      <div class="auth-box">
        <div class="auth-logo"><img src="assets/shreeja-logo.png" alt="Shreeja" /></div>
        <h1>${escapeHtml(title)}</h1>
        <p class="sub">${escapeHtml(u("loginSubtitle"))}</p>
        <div id="login-error"></div>
        <form id="login-form">
          <div class="field">
            <label for="login-id">${escapeHtml(loginAs === "admin" ? u("adminUsernameLabel") : u("loginIdLabel"))}</label>
            <input type="${loginAs === "admin" ? "text" : "email"}" id="login-id" autocomplete="username" required />
          </div>
          <div class="field">
            <label for="login-password">${escapeHtml(u("passwordLabel"))}</label>
            <input type="password" id="login-password" autocomplete="current-password" required />
          </div>
          <button type="submit" class="btn btn-primary" id="login-submit">${escapeHtml(u("loginButton"))}</button>
        </form>
      </div>
    </div>
  `;
}

function wireLoginPage(loginAs) {
  const form = document.getElementById("login-form");
  const errorEl = document.getElementById("login-error");
  const submitBtn = document.getElementById("login-submit");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.innerHTML = "";
    const rawLoginId = document.getElementById("login-id").value.trim();
    const loginId =
      loginAs === "admin" ? ADMIN_USERNAME_ALIASES[rawLoginId.toLowerCase()] || rawLoginId : rawLoginId;
    const password = document.getElementById("login-password").value;
    submitBtn.disabled = true;
    submitBtn.textContent = u("loginSigningIn");
    try {
      const res = await api.login(loginId, password);
      const user = res.user;
      if (loginAs && user.role !== loginAs) {
        await api.logout();
        errorEl.innerHTML = `<div class="auth-error">${escapeHtml(
          user.role === "admin" ? u("loginWrongPortalAdmin") : u("loginWrongPortalEmployee")
        )}</div>`;
        submitBtn.disabled = false;
        submitBtn.textContent = u("loginButton");
        return;
      }
      currentUser = user;
      if (currentUser.role !== "admin") {
        try {
          const p = await api.myProgress();
          setProgressCache(p.progress);
        } catch (e2) {
          setProgressCache({});
        }
      }
      navigate(currentUser.role === "admin" ? "#/admin" : "#/dashboard");
    } catch (err) {
      errorEl.innerHTML = `<div class="auth-error">${escapeHtml(err.message || u("loginErrorGeneric"))}</div>`;
      submitBtn.disabled = false;
      submitBtn.textContent = u("loginButton");
    }
  });
}

function renderChangePasswordPage() {
  const showCurrent = !currentUser.mustChangePassword;
  return `
    <div class="auth-page">
      <div class="auth-box">
        <div class="auth-logo"><img src="assets/shreeja-logo.png" alt="Shreeja" /></div>
        <h1>${escapeHtml(u("changePasswordTitle"))}</h1>
        <p class="sub">${escapeHtml(u("changePasswordSubtitle"))}</p>
        <div id="cp-error"></div>
        <form id="cp-form">
          ${
            showCurrent
              ? `<div class="field">
                  <label for="cp-current">${escapeHtml(u("currentPasswordLabel"))}</label>
                  <input type="password" id="cp-current" autocomplete="current-password" />
                </div>`
              : ""
          }
          <div class="field">
            <label for="cp-new">${escapeHtml(u("newPasswordLabel"))}</label>
            <input type="password" id="cp-new" autocomplete="new-password" required minlength="6" />
            <div class="hint">${escapeHtml(u("newPasswordHint"))}</div>
          </div>
          <button type="submit" class="btn btn-primary" id="cp-submit">${escapeHtml(u("changePasswordButton"))}</button>
        </form>
      </div>
    </div>
  `;
}

function wireChangePasswordPage() {
  const form = document.getElementById("cp-form");
  const errorEl = document.getElementById("cp-error");
  const submitBtn = document.getElementById("cp-submit");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.innerHTML = "";
    const currentEl = document.getElementById("cp-current");
    const oldPassword = currentEl ? currentEl.value : undefined;
    const newPassword = document.getElementById("cp-new").value;
    submitBtn.disabled = true;
    submitBtn.textContent = u("changePasswordSaving");
    try {
      await api.changePassword(oldPassword, newPassword);
      currentUser.mustChangePassword = false;
      navigate(currentUser.role === "admin" ? "#/admin" : "#/dashboard");
    } catch (err) {
      errorEl.innerHTML = `<div class="auth-error">${escapeHtml(err.message || u("loginErrorGeneric"))}</div>`;
      submitBtn.disabled = false;
      submitBtn.textContent = u("changePasswordButton");
    }
  });
}

// ============================================================================
// Language picker
// ============================================================================
function renderLanguagePicker(isSwitcher) {
  const cards = LANGUAGES.map(
    (l) => `
    <button type="button" class="lang-card" data-lang="${l.code}">
      <div class="lang-native">${escapeHtml(l.native)}</div>
      <div class="lang-label">${escapeHtml(l.label)}</div>
    </button>`
  ).join("");

  return `
    <div class="lang-picker-page">
      <div class="lang-picker-box">
        <div class="lang-picker-icon"><img src="assets/shreeja-logo.png" alt="Shreeja" class="lang-picker-logo-img" /></div>
        <h1>${u("langPickerTitle")}</h1>
        <p>${u("langPickerSub")}</p>
        <div class="lang-grid">${cards}</div>
        ${isSwitcher ? `<button class="btn btn-outline lang-cancel" id="lang-cancel-btn">${escapeHtml(u("backButton"))}</button>` : ""}
      </div>
    </div>
  `;
}

function wireLanguagePicker(isSwitcher, returnHash) {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      lang = btn.getAttribute("data-lang");
      setLang(lang);
      if (isSwitcher && returnHash) {
        navigate(returnHash);
      } else {
        navigate("#/dashboard");
      }
    });
  });
  const cancelBtn = document.getElementById("lang-cancel-btn");
  if (cancelBtn && returnHash) {
    cancelBtn.addEventListener("click", () => navigate(returnHash));
  }
}

// ============================================================================
// Top bar
// ============================================================================
function renderTopbar(context) {
  const { title, showBack, backHash } = context;
  const adminLink =
    currentUser && currentUser.role === "admin"
      ? `<button class="admin-nav-btn" data-nav="#/admin">🧑‍💼 ${escapeHtml(u("adminNavLink"))}</button>`
      : "";
  const certLink =
    currentUser && currentUser.role !== "admin"
      ? `<button class="admin-nav-btn" data-nav="#/certificates">${escapeHtml(u("myCertificatesNav"))}</button>`
      : "";
  return `
    <div class="topbar no-print">
      ${
        showBack
          ? `<button class="back-btn" data-nav="${backHash}">${u("backButton")}</button>`
          : `<div class="brand" data-nav="#/dashboard"><span class="brand-icon"><img src="assets/shreeja-logo.png" alt="Shreeja" class="brand-logo-img" /></span> ${escapeHtml(u("brandName"))}</div>`
      }
      ${showBack ? `<div class="brand" data-nav="#/dashboard" style="margin-left:4px;"><span class="brand-icon"><img src="assets/shreeja-logo.png" alt="Shreeja" class="brand-logo-img" /></span> ${escapeHtml(title || u("brandName"))}</div>` : ""}
      <div class="spacer"></div>
      ${certLink}
      ${adminLink}
      <button class="lang-switch-btn" data-nav="#/language">🌐 ${escapeHtml((LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]).native)}</button>
      <button class="logout-btn" id="logout-btn">↪ ${escapeHtml(u("logoutButton"))}</button>
    </div>
  `;
}

function wireTopbarLogout() {
  const btn = document.getElementById("logout-btn");
  if (btn) {
    btn.addEventListener("click", async () => {
      try {
        await api.logout();
      } catch (e) {
        // ignore — clearing local state regardless
      }
      currentUser = null;
      setProgressCache({});
      navigate("#/login");
    });
  }
}

// ============================================================================
// Dashboard
// ============================================================================
function renderDashboard() {
  const cards = MODULES.map((mod) => {
    if (!mod.available) {
      return `
        <div class="module-card locked">
          <div class="module-number">${mod.number}</div>
          <div class="module-info">
            <h3>${escapeHtml(t(mod.title))}</h3>
            <div class="meta">${u("comingSoon")}</div>
          </div>
          <span class="badge locked">${u("badgeLocked")}</span>
        </div>
      `;
    }
    const progress = getModuleProgress(mod);
    const badge = progress.isComplete
      ? `<span class="badge complete">${u("badgeCompleted")}</span>`
      : progress.completed > 0
      ? `<span class="badge progress">${u("badgeInProgress")}</span>`
      : `<span class="badge progress">${u("badgeStart")}</span>`;
    return `
      <div class="module-card available" data-nav="#/module/${mod.id}">
        <div class="module-number">${mod.number}</div>
        <div class="module-info">
          <h3>${escapeHtml(t(mod.title))}</h3>
          <div class="meta">${u("lessonsCompleteMeta", { completed: progress.completed, total: progress.total })}</div>
          <div class="mini-bar"><div style="width:${progress.percent}%"></div></div>
        </div>
        ${badge}
      </div>
    `;
  }).join("");

  const overall = getOverallProgress(MODULES);

  const courseCertBanner = overall.isComplete
    ? `
    <div class="course-cert-banner" data-nav="#/certificate/course">
      <div class="icon">🏆</div>
      <div class="text">
        <h3>${u("certCourseCardTitle")}</h3>
        <p>${u("certCourseCardEarnedText")}</p>
      </div>
      <button type="button" class="btn btn-success" data-nav="#/certificate/course">${u("certViewButton")}</button>
    </div>`
    : "";

  const examBanner = overall.isComplete ? renderExamBanner() : "";

  return `
    ${renderTopbar({ showBack: false })}
    <div class="page">
      <div class="dash-header">
        <h1>${u("dashboardTitle")}</h1>
        <p>${u("dashboardTagline")}</p>
      </div>
      <div class="overall-progress">
        <div class="ring" style="--pct:${overall.percent}" data-label="${overall.percent}%"></div>
        <div>
          <div style="font-weight:700; font-size:15px;">${u("lessonsCompletedCount", { done: overall.done, total: overall.total })}</div>
          <div style="font-size:13px; color:var(--gray-500);">${u("progressHint")}</div>
        </div>
        <div class="spacer"></div>
        <button type="button" class="btn btn-outline" data-nav="#/certificates">${u("myCertificatesNav")}</button>
      </div>
      ${courseCertBanner}
      ${examBanner}
      <div class="module-grid">${cards}</div>
      <div class="progress-note">${u("progressNote")}</div>
    </div>
  `;
}

// Shown once every module is complete — either an invitation to take the
// final exam, or (once passed) a link to its certificate. Reused on the
// dashboard and the module-completion page.
function renderExamBanner() {
  const examState = getFinalExamState();
  if (examState.passed) {
    return `
    <div class="course-cert-banner" data-nav="#/certificate/exam">
      <div class="icon">🏅</div>
      <div class="text">
        <h3>${u("examCertCardTitle")}</h3>
        <p>${u("examCertCardEarnedText", { score: examState.bestScore })}</p>
      </div>
      <button type="button" class="btn btn-success" data-nav="#/certificate/exam">${u("certViewButton")}</button>
    </div>`;
  }
  return `
    <div class="course-cert-banner" data-nav="#/final-exam">
      <div class="icon">📝</div>
      <div class="text">
        <h3>${u("examIntroTitle")}</h3>
        <p>${u("examCertCardReadyText")}</p>
      </div>
      <button type="button" class="btn btn-primary" data-nav="#/final-exam">${u("examTakeButton")}</button>
    </div>`;
}

// ============================================================================
// Module page — lesson list
// ============================================================================
function renderModulePage(moduleId) {
  const mod = getModule(moduleId);
  if (!mod || !mod.available) {
    navigate("#/dashboard");
    return "";
  }
  const progress = getModuleProgress(mod);

  const rows = mod.lessons
    .map((lesson, idx) => {
      const state = getLessonState(mod.id, lesson.id);
      const unlocked = isLessonUnlocked(mod, lesson.id);
      let iconClass, iconHtml, rowClass;
      if (state.completed) {
        iconClass = "done";
        iconHtml = ICONS.check;
        rowClass = "unlocked";
      } else if (unlocked) {
        iconClass = "next";
        iconHtml = idx + 1;
        rowClass = "unlocked";
      } else {
        iconClass = "locked";
        iconHtml = ICONS.lock;
        rowClass = "locked";
      }
      const topicCount = lesson.topics ? lesson.topics.length : 0;
      const metaParts = [u("lessonMeta", { min: lesson.estMinutes, topics: topicCount })];
      if (state.completed) metaParts.push(u("bestScoreSuffix", { score: state.bestScore }));
      if (!unlocked) metaParts.push(u("lockedHint"));
      return `
        <div class="lesson-row ${rowClass}" ${unlocked ? `data-nav="#/module/${mod.id}/lesson/${lesson.id}"` : ""}>
          <div class="lesson-status-icon ${iconClass}">${iconHtml}</div>
          <div class="lesson-info">
            <h4>${escapeHtml(t(lesson.title))}</h4>
            <div class="meta">${metaParts.join(" · ")}</div>
          </div>
          ${unlocked ? `<div class="chev">›</div>` : ""}
        </div>
      `;
    })
    .join("");

  return `
    ${renderTopbar({ showBack: true, backHash: "#/dashboard", title: t(mod.title) })}
    <div class="page">
      <div class="module-hero">
        <h1>${escapeHtml(t(mod.title))}</h1>
        <p>${escapeHtml(t(mod.subtitle) || "")}</p>
        <div class="progress-row">
          <div class="bar-track"><div style="width:${progress.percent}%"></div></div>
          <div class="progress-label">${u("moduleProgressComplete", { completed: progress.completed, total: progress.total })}</div>
        </div>
      </div>
      <div class="lesson-list">${rows}</div>
    </div>
  `;
}

// ============================================================================
// Content block renderers (used for "hook" blocks and topic "teach" blocks)
// ============================================================================
function renderBlockHtml(block) {
  switch (block.type) {
    case "hero":
      return `<div class="block block-hero"><h2>🥛 ${escapeHtml(t(block.heading))}</h2><p>${escapeHtml(t(block.text))}</p></div>`;

    case "text":
      return `<div class="block block-text"><h3>📘 ${escapeHtml(t(block.heading))}</h3><div class="body">${t(block.html)}</div></div>`;

    case "callout": {
      const emoji = CALLOUT_EMOJIS[block.style] || "💡";
      return `<div class="block callout ${block.style || ""}"><h4>${emoji} ${escapeHtml(t(block.heading))}</h4><p>${escapeHtml(t(block.text))}</p></div>`;
    }

    case "example":
      return `<div class="block example-box"><h4>🌟 ${escapeHtml(t(block.heading))}</h4><p>${escapeHtml(t(block.text))}</p></div>`;

    case "glossary":
      return `
        <div class="block glossary-box" data-toggle="glossary">
          <span class="gloss-icon">📖</span>
          <div>
            <span class="gloss-term">${escapeHtml(t(block.term))}</span>
            <span class="gloss-hint">${u("tapToReveal")}</span>
            <div class="gloss-meaning">${escapeHtml(t(block.meaning))}</div>
          </div>
        </div>`;

    case "ledger": {
      const rows = block.rows
        .map((r) => `<div class="ledger-row"><span>${escapeHtml(t(r.label))}</span><span>${escapeHtml(r.amount)}</span></div>`)
        .join("");
      return `
        <div class="block ledger-box">
          <h3>💰 ${escapeHtml(t(block.heading))}</h3>
          ${rows}
          <div class="ledger-row ledger-total"><span>${escapeHtml(t(block.total.label))}</span><span>${escapeHtml(block.total.amount)}</span></div>
        </div>`;
    }

    case "stat-grid":
      return `<div class="block stat-grid">${block.items
        .map(
          (it, i) =>
            `<div class="stat-card"><div class="label">${STAT_EMOJIS[i % STAT_EMOJIS.length]} ${escapeHtml(t(it.label))}</div><div class="text">${escapeHtml(t(it.text))}</div></div>`
        )
        .join("")}</div>`;

    case "barchart": {
      const max = Math.max(...block.data.map((d) => d.value));
      const rows = block.data
        .map(
          (d, i) => `
        <div class="bar-row">
          <div class="bar-label">${d.flag ? d.flag + " " : ""}${escapeHtml(t(d.label))}</div>
          <div class="bar-track"><div class="bar-fill" data-target="${(d.value / max) * 100}" style="transition-delay:${i * 40}ms"></div></div>
          <div class="bar-value">${d.value} ${escapeHtml(t(block.unit))}</div>
        </div>`
        )
        .join("");
      return `
        <div class="block chart-box">
          <h3>📊 ${escapeHtml(t(block.heading))}</h3>
          <div class="chart-source">${escapeHtml(t(block.source))}</div>
          ${rows}
        </div>`;
    }

    case "timeline": {
      const items = block.items
        .map(
          (it) => `
        <div class="timeline-item">
          <div class="year">${escapeHtml(t(it.year))}</div>
          <div class="text">${escapeHtml(t(it.text))}</div>
        </div>`
        )
        .join("");
      return `
        <div class="block timeline-box">
          <h3>🕰️ ${escapeHtml(t(block.heading))}</h3>
          <div class="timeline">${items}</div>
          ${block.result ? `<div class="timeline-result">🏁 ${escapeHtml(t(block.result))}</div>` : ""}
        </div>`;
    }

    case "poll": {
      const qs = block.questions
        .map(
          (q, qi) => `
        <div class="poll-q" data-poll-answer="${q.answer}">
          <div class="q-text">${escapeHtml(t(q.q))}</div>
          <div class="opt-list">
            ${q.options.map((opt, oi) => `<button type="button" class="opt-btn" data-poll-idx="${oi}">${escapeHtml(t(opt))}</button>`).join("")}
          </div>
          <div class="poll-reveal" style="display:none;">${escapeHtml(t(q.reveal) || "")}</div>
        </div>`
        )
        .join("");
      return `<div class="block poll-box"><h3>🤔 ${escapeHtml(t(block.heading))}</h3>${qs}</div>`;
    }

    default:
      return "";
  }
}

function renderBlocks(blocks) {
  return blocks.map((b) => renderBlockHtml(b)).join("");
}

function animateBarsIn(container) {
  const fills = container.querySelectorAll(".bar-fill");
  requestAnimationFrame(() => {
    fills.forEach((f) => {
      f.style.width = f.getAttribute("data-target") + "%";
    });
  });
}

// ============================================================================
// Global interactive-content handlers (glossary tap-to-reveal, ungraded polls)
// Delegated on document so they keep working across every re-render.
// ============================================================================
document.addEventListener("click", (e) => {
  const glossEl = e.target.closest(".glossary-box");
  if (glossEl) {
    glossEl.classList.toggle("revealed");
    return;
  }
  const pollOpt = e.target.closest(".poll-q .opt-btn");
  if (pollOpt) {
    const qEl = pollOpt.closest(".poll-q");
    if (qEl.classList.contains("answered")) return;
    qEl.classList.add("answered");
    const correctIdx = Number(qEl.getAttribute("data-poll-answer"));
    const idx = Number(pollOpt.getAttribute("data-poll-idx"));
    qEl.querySelectorAll(".opt-btn").forEach((b, i) => {
      b.disabled = true;
      if (i === correctIdx) b.classList.add("correct");
      else if (i === idx) b.classList.add("incorrect");
    });
    const reveal = qEl.querySelector(".poll-reveal");
    if (reveal) reveal.style.display = "block";
    return;
  }
});

// ============================================================================
// Question set component — renders a group of questions with select+submit,
// then reports per-question results. Used for the lesson's single combined
// quiz, and for the focused re-try questions during topic review.
// ============================================================================
function renderQuestionSet(container, questions, opts) {
  const answers = new Array(questions.length).fill(null);
  const label = opts.submitLabel;

  const qsHtml = questions
    .map((q, qi) => {
      const options = q.type === "truefalse" ? [u("trueLabel") || "True", u("falseLabel") || "False"] : q.options.map((o) => t(o));
      return `
      <div class="quiz-q" data-quiz-q="${qi}">
        ${questions.length > 1 ? `<div class="q-num">${u("questionOfTotal", { n: qi + 1, total: questions.length })}</div>` : ""}
        <div class="q-text">${escapeHtml(t(q.q))}</div>
        <div class="opt-list">
          ${options.map((opt, oi) => `<button type="button" class="opt-btn" data-quiz-opt="${oi}">${escapeHtml(opt)}</button>`).join("")}
        </div>
      </div>`;
    })
    .join("");

  container.innerHTML = `${qsHtml}<div class="btn-row"><button class="btn btn-primary" id="qs-submit" disabled>${escapeHtml(label)}</button></div>`;

  const qBlocks = container.querySelectorAll("[data-quiz-q]");
  qBlocks.forEach((qEl) => {
    const qi = Number(qEl.getAttribute("data-quiz-q"));
    const optBtns = qEl.querySelectorAll("[data-quiz-opt]");
    optBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const oi = Number(btn.getAttribute("data-quiz-opt"));
        answers[qi] = oi;
        optBtns.forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        submitBtn.disabled = answers.some((a) => a === null);
      });
    });
  });

  const submitBtn = container.querySelector("#qs-submit");
  submitBtn.addEventListener("click", () => {
    const results = questions.map((q, qi) => {
      const correctIdx = q.type === "truefalse" ? (q.answer ? 0 : 1) : q.answer;
      return { q, isCorrect: answers[qi] === correctIdx, selected: answers[qi] };
    });
    opts.onSubmit(results);
  });
}

function renderQuestionReview(results) {
  return results
    .map(
      (r) => `
      <div class="review-item ${r.isCorrect ? "correct" : "incorrect"}">
        <div class="mark">${r.isCorrect ? "✓" : "✕"}</div>
        <div>
          <div>${escapeHtml(t(r.q.q))}</div>
          <div class="exp">${escapeHtml(t(r.q.explain) || "")}</div>
        </div>
      </div>`
    )
    .join("");
}

// ============================================================================
// Lesson flow controller.
//   1. Walk through every topic (teach content, examples, interactive polls,
//      animations) with Previous/Next navigation — nothing graded yet.
//   2. One combined Lesson Quiz at the end, covering every topic at once.
//   3. Any wrong answer sends the learner back into that exact topic to
//      re-learn it, then re-try just that topic, before finishing.
// ============================================================================
function runLessonFlow(moduleId, lesson) {
  const flowEl = document.getElementById("flow");
  const dotsEl = document.getElementById("topic-dots");
  const topics = lesson.topics;

  function setDots(activeIdx) {
    if (!dotsEl) return;
    dotsEl.innerHTML = topics
      .map((topic, i) => {
        let cls = "dot";
        if (i < activeIdx) cls += " dot-done";
        else if (i === activeIdx) cls += " dot-active";
        return `<div class="${cls}" title="${escapeHtml(t(topic.title))}"></div>`;
      })
      .join("");
  }

  function showTopic(idx) {
    setDots(idx);
    const topic = topics[idx];
    const emoji = TOPIC_EMOJIS[idx % TOPIC_EMOJIS.length];
    const isLast = idx + 1 >= topics.length;
    flowEl.innerHTML = `
      <div class="topic-kicker">${u("topicOfTotal", { n: idx + 1, total: topics.length })}</div>
      <h2 class="topic-title">${emoji} ${escapeHtml(t(topic.title))}</h2>
      <div id="topic-teach">${renderBlocks(topic.teach)}</div>
      <div class="topic-nav">
        ${idx > 0 ? `<button class="btn btn-outline" id="prev-topic-btn">${u("prevButton")}</button>` : `<span></span>`}
        <button class="btn btn-primary" id="next-topic-btn">${isLast ? u("startQuizButton") : u("nextTopicButton")}</button>
      </div>
    `;
    animateBarsIn(flowEl);
    document.getElementById("next-topic-btn").addEventListener("click", () => {
      if (!isLast) showTopic(idx + 1);
      else showFinalIntro();
    });
    const prevBtn = document.getElementById("prev-topic-btn");
    if (prevBtn) prevBtn.addEventListener("click", () => showTopic(idx - 1));
  }

  function showFinalIntro() {
    setDots(topics.length);
    flowEl.innerHTML = `
      <div class="quiz-section" id="final-quiz-section">
        <h2>${u("lessonQuizTitle")}</h2>
        <div class="sub">${u("lessonQuizSub")}</div>
        <div id="final-quiz-body"></div>
      </div>
    `;
    showFinalQuiz();
  }

  function showFinalQuiz() {
    const body = document.getElementById("final-quiz-body");
    renderQuestionSet(body, lesson.finalQuiz.questions, {
      submitLabel: u("submitQuizButton"),
      onSubmit: (results) => {
        const correctCount = results.filter((r) => r.isCorrect).length;
        const scorePercent = Math.round((correctCount / results.length) * 100);
        const wrongTopicIds = [...new Set(results.filter((r) => !r.isCorrect).map((r) => r.q.topicId))];
        recordQuizAttempt(moduleId, lesson.id, scorePercent, wrongTopicIds.length === 0);

        if (wrongTopicIds.length === 0) {
          showLessonComplete(scorePercent, results);
        } else {
          showReviewQueue(wrongTopicIds, 0, scorePercent);
        }
      },
    });
  }

  function showReviewQueue(queue, i, originalScore) {
    if (i >= queue.length) {
      recordQuizAttempt(moduleId, lesson.id, Math.max(originalScore, 70), true);
      showLessonComplete(100, null, true);
      return;
    }
    const topic = topics.find((tp) => tp.id === queue[i]);
    flowEl.innerHTML = `
      <div class="review-banner">
        <div class="review-banner-title">${u("reviewTitlePrefix")} ${escapeHtml(t(topic.title))}</div>
        <div class="review-banner-sub">${u("reviewSub")}</div>
      </div>
      <div id="review-teach">${renderBlocks(topic.teach)}</div>
      <div class="check-box">
        <h3>${u("tryAgainHeading")}</h3>
        <div id="review-check"></div>
      </div>
    `;
    animateBarsIn(flowEl);
    const reviewCheckEl = document.getElementById("review-check");

    function attemptReview() {
      renderQuestionSet(reviewCheckEl, topic.check, {
        submitLabel: u("checkAnswersButton"),
        onSubmit: (results) => {
          const allCorrect = results.every((r) => r.isCorrect);
          if (allCorrect) {
            reviewCheckEl.innerHTML = `
              <div class="check-pass">
                <div class="check-pass-icon">✓</div>
                <div>
                  <div class="check-pass-title">${u("checkPassGotIt")}</div>
                </div>
              </div>
              <div class="btn-row"><button class="btn btn-primary" id="review-next-btn">${
                i + 1 < queue.length ? u("reviewNextTopic") : u("finishLesson")
              }</button></div>
            `;
            document.getElementById("review-next-btn").addEventListener("click", () => {
              showReviewQueue(queue, i + 1, originalScore);
            });
          } else {
            reviewCheckEl.innerHTML = `
              <div class="check-fail">
                <div class="check-fail-icon">🤔</div>
                <div>
                  <div class="check-fail-title">${u("checkFailTitle")}</div>
                  <div class="check-fail-sub">${u("checkFailSub")}</div>
                </div>
              </div>
              <div class="btn-row"><button class="btn btn-primary" id="review-retry-btn">${u("reviewRetry")}</button></div>
            `;
            document.getElementById("review-retry-btn").addEventListener("click", () => {
              document.getElementById("review-teach").scrollIntoView({ behavior: "smooth", block: "start" });
              attemptReview();
            });
          }
        },
      });
    }
    attemptReview();
  }

  function showLessonComplete(scorePercent, results, wasReviewed) {
    const mod = getModule(moduleId);
    const lessonIdx = getLessonIndex(moduleId, lesson.id);
    const nextLesson = mod.lessons[lessonIdx + 1];
    setDots(topics.length);

    let primaryHtml;
    if (lesson.finalQuiz.isFinal) {
      primaryHtml = `<button class="btn btn-primary" data-nav="#/module/${moduleId}/complete">${u("moduleCompleteButton")}</button>`;
    } else if (nextLesson) {
      primaryHtml = `<button class="btn btn-primary" data-nav="#/module/${moduleId}/lesson/${nextLesson.id}">${u("continueNextLesson")}</button>`;
    } else {
      primaryHtml = `<button class="btn btn-primary" data-nav="#/module/${moduleId}">${u("backToModule")}</button>`;
    }
    const certHtml = `<button class="btn btn-success" data-nav="#/certificate/${moduleId}/${lesson.id}">🎓 ${u("viewCertificate")}</button>`;
    const actionsHtml = `${certHtml}${primaryHtml}`;

    flowEl.innerHTML = `
      <div class="quiz-section">
        <div class="quiz-result pass">
          <div class="confetti-row">🎉 🎊 ✨ 🎉 🎊</div>
          <div class="score-circle"><div class="pct">${scorePercent}%</div><div class="lbl">${wasReviewed ? "" : ""}</div></div>
          <h3>${wasReviewed ? u("completeReviewedTitle") : u("completePassTitle")}</h3>
          <p>${wasReviewed ? u("completeReviewedText") : u("completePassText")}</p>
          <div class="btn-row" style="justify-content:center;">${actionsHtml}</div>
          ${results ? `<div class="quiz-review">${renderQuestionReview(results)}</div>` : ""}
        </div>
      </div>
    `;
  }

  showTopic(0);
}

// ============================================================================
// Lesson page
// ============================================================================
function renderLessonPage(moduleId, lessonId) {
  const mod = getModule(moduleId);
  const lesson = getLesson(moduleId, lessonId);
  if (!mod || !lesson) {
    navigate("#/dashboard");
    return "";
  }
  if (!isLessonUnlocked(mod, lessonId)) {
    navigate(`#/module/${moduleId}`);
    return "";
  }
  const lessonIdx = getLessonIndex(moduleId, lessonId);
  const hookHtml = lesson.hook ? renderBlocks(lesson.hook) : "";

  return `
    ${renderTopbar({ showBack: true, backHash: `#/module/${moduleId}`, title: t(mod.title) })}
    <div class="page page-narrow">
      <div class="lesson-title-bar">
        <div class="kicker">${u("lessonOfTotal", { n: lessonIdx + 1, total: mod.lessons.length })}</div>
        <h1>${escapeHtml(t(lesson.title))}</h1>
      </div>
      ${hookHtml}
      <div id="topic-dots" class="topic-dots"></div>
      <div id="flow"></div>
    </div>
  `;
}

function afterLessonRender(moduleId, lesson) {
  const page = document.querySelector(".page-narrow");
  if (page) animateBarsIn(page);
  runLessonFlow(moduleId, lesson);
}

// ============================================================================
// Module completion page
// ============================================================================
function renderCompletionPage(moduleId) {
  const mod = getModule(moduleId);
  if (!mod) {
    navigate("#/dashboard");
    return "";
  }
  const finalLesson = mod.lessons[mod.lessons.length - 1];
  const overall = getOverallProgress(MODULES);
  return `
    ${renderTopbar({ showBack: true, backHash: `#/module/${moduleId}`, title: t(mod.title) })}
    <div class="page page-narrow">
      <div class="completion-box">
        <div class="confetti-row">🎉 🎊 ✨ 🏆 ✨ 🎊 🎉</div>
        <div class="icon">🏆</div>
        <h2>${u("moduleCompleteTitle", { n: mod.number })}</h2>
        <p>${u("moduleCompleteText", { title: t(mod.title) })}</p>
        <div class="btn-row" style="justify-content:center;">
          <button class="btn btn-success" data-nav="#/certificate/${moduleId}/${finalLesson.id}">🎓 ${u("viewCertificate")}</button>
          <button class="btn btn-outline" style="background:white;" data-nav="#/dashboard">${u("backToDashboard")}</button>
          <button class="btn btn-outline" style="background:white;" data-nav="#/module/${moduleId}">${u("reviewModule")}</button>
        </div>
      </div>
      ${
        overall.isComplete
          ? `
      <div class="course-cert-banner" data-nav="#/certificate/course" style="margin-top:18px;">
        <div class="icon">🏆</div>
        <div class="text">
          <h3>${u("certCourseCardTitle")}</h3>
          <p>${u("certCourseCardEarnedText")}</p>
        </div>
        <button type="button" class="btn btn-success" data-nav="#/certificate/course">${u("certViewButton")}</button>
      </div>`
          : ""
      }
      ${overall.isComplete ? renderExamBanner() : ""}
    </div>
  `;
}

// ============================================================================
// Final Exam — one comprehensive exam covering all 12 modules, unlocked once
// every module is complete. Separate from each lesson's own quiz: harder,
// application-based questions (see exam-data.js), with its own pass/fail
// result and its own certificate. Unlimited retakes, each with the question
// order reshuffled.
// ============================================================================
function shuffledExamQuestions() {
  const arr = FINAL_EXAM_QUESTIONS.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderFinalExamPage() {
  return `
    ${renderTopbar({ showBack: true, backHash: "#/dashboard", title: u("examIntroTitle") })}
    <div class="page page-narrow">
      <div id="exam-flow"></div>
    </div>
  `;
}

function afterFinalExamRender() {
  const page = document.querySelector(".page-narrow");
  if (page) animateBarsIn(page);
  runFinalExamFlow();
}

function runFinalExamFlow() {
  const flowEl = document.getElementById("exam-flow");

  function showIntro() {
    flowEl.innerHTML = `
      <div class="quiz-section">
        <h2>${u("examIntroTitle")}</h2>
        <p>${u("examIntroText", { pass: FINAL_EXAM_PASS_PERCENT })}</p>
        <div class="btn-row"><button class="btn btn-primary" id="exam-start-btn">${u("examStartButton")}</button></div>
      </div>
    `;
    document.getElementById("exam-start-btn").addEventListener("click", showQuestions);
  }

  function showQuestions() {
    flowEl.innerHTML = `<div class="quiz-section" id="exam-questions-section"></div>`;
    const body = document.getElementById("exam-questions-section");
    renderQuestionSet(body, shuffledExamQuestions(), {
      submitLabel: u("examSubmitButton"),
      onSubmit: (results) => {
        const correctCount = results.filter((r) => r.isCorrect).length;
        const scorePercent = Math.round((correctCount / results.length) * 100);
        const passed = scorePercent >= FINAL_EXAM_PASS_PERCENT;
        recordFinalExamAttempt(scorePercent, passed);
        showResult(scorePercent, passed, results);
      },
    });
  }

  function showResult(scorePercent, passed, results) {
    const actionsHtml = passed
      ? `<button class="btn btn-success" data-nav="#/certificate/exam">${u("examViewCertificateButton")}</button><button class="btn btn-outline" data-nav="#/dashboard">${u("backToDashboard")}</button>`
      : `<button class="btn btn-primary" id="exam-retake-btn">${u("examRetakeButton")}</button><button class="btn btn-outline" data-nav="#/dashboard">${u("backToDashboard")}</button>`;

    flowEl.innerHTML = `
      <div class="quiz-section">
        <div class="quiz-result ${passed ? "pass" : "fail"}">
          ${passed ? `<div class="confetti-row">🎉 🎊 ✨ 🎉 🎊</div>` : ""}
          <div class="score-circle"><div class="pct">${scorePercent}%</div></div>
          <h3>${passed ? u("examPassTitle") : u("examFailTitle")}</h3>
          <p>${passed ? u("examPassText") : u("examFailText")}</p>
          <div class="btn-row" style="justify-content:center;">${actionsHtml}</div>
          <div class="quiz-review">${renderQuestionReview(results)}</div>
        </div>
      </div>
    `;
    const retakeBtn = document.getElementById("exam-retake-btn");
    if (retakeBtn) retakeBtn.addEventListener("click", showQuestions);
  }

  showIntro();
}

// ============================================================================
// Router
// ============================================================================
function parseHash() {
  const hash = location.hash || "#/";
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (parts.length === 0) return { route: "welcome" };
  if (parts[0] === "welcome") return { route: "welcome" };
  if (parts[0] === "login") {
    if (parts[1] === "employee") return { route: "login", loginAs: "employee" };
    if (parts[1] === "admin") return { route: "login", loginAs: "admin" };
    return { route: "login", loginAs: null };
  }
  if (parts[0] === "change-password") return { route: "change-password" };
  if (parts[0] === "dashboard") return { route: "dashboard" };
  if (parts[0] === "language") return { route: "language" };
  if (parts[0] === "certificates") return { route: "certificates" };
  if (parts[0] === "certificate") {
    if (parts[1] === "course") return { route: "certificate-course" };
    if (parts[1] === "exam") return { route: "certificate-exam" };
    if (parts[1] && parts[2]) return { route: "certificate-lesson", moduleId: parts[1], lessonId: parts[2] };
    return { route: "certificates" };
  }
  if (parts[0] === "final-exam") return { route: "final-exam" };
  if (parts[0] === "admin") {
    if (parts[1] === "employee" && parts[2]) return { route: "admin-employee", employeeId: parts[2] };
    if (parts[1] === "new-employee") return { route: "admin-new-employee" };
    if (parts[1] === "bulk-add-employees") return { route: "admin-bulk-add-employees" };
    return { route: "admin" };
  }
  if (parts[0] === "module" && parts[1]) {
    if (parts[2] === "lesson" && parts[3]) {
      return { route: "lesson", moduleId: parts[1], lessonId: parts[3] };
    }
    if (parts[2] === "complete") {
      return { route: "complete", moduleId: parts[1] };
    }
    return { route: "module", moduleId: parts[1] };
  }
  return { route: "dashboard" };
}

let lastNonLanguageHash = "#/dashboard";

function render() {
  updateOfflineBanner();
  const parsed = parseHash();

  // The public landing/home page: always renders, signed in or not.
  if (parsed.route === "welcome") {
    root.innerHTML = renderLandingPage();
    wireLandingPage();
    return;
  }

  // Login page: if already signed in, bounce to the right home instead.
  if (parsed.route === "login") {
    if (currentUser) {
      navigate(currentUser.role === "admin" ? "#/admin" : "#/dashboard");
      return;
    }
    root.innerHTML = renderLoginPage(parsed.loginAs);
    wireLoginPage(parsed.loginAs);
    return;
  }

  // Every other route requires a session.
  if (!currentUser) {
    navigate("#/login");
    return;
  }

  // First login after provisioning/reset: force a real password before anything else.
  if (currentUser.mustChangePassword || parsed.route === "change-password") {
    root.innerHTML = renderChangePasswordPage();
    wireChangePasswordPage();
    return;
  }

  // Admin-only routes.
  if ((parsed.route === "admin" || parsed.route === "admin-employee" || parsed.route === "admin-new-employee" || parsed.route === "admin-bulk-add-employees") && currentUser.role !== "admin") {
    navigate("#/dashboard");
    return;
  }

  // Certificate/exam routes are employee-only (admins have no lesson progress of their own).
  if (
    (parsed.route === "certificates" ||
      parsed.route === "certificate-lesson" ||
      parsed.route === "certificate-course" ||
      parsed.route === "certificate-exam" ||
      parsed.route === "final-exam") &&
    currentUser.role === "admin"
  ) {
    navigate("#/admin");
    return;
  }

  // The final exam only unlocks once every module is complete.
  if (parsed.route === "final-exam" && !isCourseComplete(MODULES)) {
    navigate("#/dashboard");
    return;
  }

  // Force the language picker until a language is chosen.
  if (!lang && parsed.route !== "language") {
    root.innerHTML = renderLanguagePicker(false);
    wireLanguagePicker(false, null);
    return;
  }

  if (parsed.route !== "language") {
    lastNonLanguageHash = location.hash || "#/dashboard";
  }

  let html = "";
  let afterRender = null;

  switch (parsed.route) {
    case "language":
      html = renderLanguagePicker(!!lang);
      break;
    case "dashboard":
      html = renderDashboard();
      break;
    case "module":
      html = renderModulePage(parsed.moduleId);
      break;
    case "lesson": {
      html = renderLessonPage(parsed.moduleId, parsed.lessonId);
      const lesson = getLesson(parsed.moduleId, parsed.lessonId);
      if (lesson) afterRender = () => afterLessonRender(parsed.moduleId, lesson);
      break;
    }
    case "complete":
      html = renderCompletionPage(parsed.moduleId);
      break;
    case "certificates":
      html = certificates.renderCertificatesList({ t, u, lang, escapeHtml, renderTopbar, navigate, currentUser });
      afterRender = () => certificates.wireCertificatesList();
      break;
    case "certificate-lesson":
      html = certificates.renderCertificateLesson(parsed.moduleId, parsed.lessonId, { t, u, lang, escapeHtml, renderTopbar, navigate, currentUser });
      afterRender = () => certificates.wireCertificateLesson();
      break;
    case "certificate-course":
      html = certificates.renderCertificateCourse({ t, u, lang, escapeHtml, renderTopbar, navigate, currentUser });
      afterRender = () => certificates.wireCertificateCourse();
      break;
    case "certificate-exam":
      html = certificates.renderCertificateExam({ t, u, lang, escapeHtml, renderTopbar, navigate, currentUser });
      afterRender = () => certificates.wireCertificateExam();
      break;
    case "final-exam":
      html = renderFinalExamPage();
      afterRender = () => afterFinalExamRender();
      break;
    case "admin":
      html = admin.renderAdminDashboard({ t, u, lang, escapeHtml, renderTopbar });
      afterRender = () => admin.wireAdminDashboard({ t, u, lang, escapeHtml, renderTopbar, navigate });
      break;
    case "admin-employee":
      html = admin.renderEmployeeDetail(parsed.employeeId, { t, u, lang, escapeHtml, renderTopbar });
      afterRender = () => admin.wireEmployeeDetail(parsed.employeeId, { t, u, lang, escapeHtml, renderTopbar, navigate });
      break;
    case "admin-new-employee":
      html = admin.renderNewEmployeeForm({ t, u, lang, escapeHtml, renderTopbar });
      afterRender = () => admin.wireNewEmployeeForm({ t, u, lang, escapeHtml, renderTopbar, navigate });
      break;
    case "admin-bulk-add-employees":
      html = admin.renderBulkAddEmployees({ t, u, lang, escapeHtml, renderTopbar });
      afterRender = () => admin.wireBulkAddEmployees({ t, u, lang, escapeHtml, renderTopbar, navigate });
      break;
    default:
      html = renderDashboard();
  }

  if (html) {
    root.innerHTML = html;
    if (parsed.route === "language") {
      wireLanguagePicker(!!lang, lastNonLanguageHash);
    }
    wireTopbarLogout();
    if (afterRender) afterRender();
  }
}

// Event delegation for all [data-nav] elements
document.addEventListener("click", (e) => {
  const navEl = e.target.closest("[data-nav]");
  if (navEl) {
    e.preventDefault();
    navigate(navEl.getAttribute("data-nav"));
  }
});

// ============================================================================
// Boot: check for an existing session before the first render, since (unlike
// the language choice) we can't know synchronously whether the visitor is
// signed in.
// ============================================================================
async function bootstrap() {
  try {
    const res = await api.session();
    currentUser = res.user;
    if (currentUser.role !== "admin") {
      try {
        const p = await api.myProgress();
        setProgressCache(p.progress);
      } catch (e) {
        setProgressCache({});
      }
    }
  } catch (e) {
    currentUser = null;
  }
  render();
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", bootstrap);
if (document.readyState !== "loading") bootstrap();
