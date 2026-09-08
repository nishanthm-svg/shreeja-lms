// ============================================================================
// Certificates: a per-lesson certificate for every completed lesson, plus one
// course-completion certificate once every available module is fully done.
// Rendered/wired by app.js's router (case "certificates"/"certificate-lesson"/
// "certificate-course"), following the same render-then-wire pattern as
// admin.js. Certificates are computed entirely from data already in the
// browser (data.js content + the progress cache) — nothing new to fetch.
// ============================================================================
import { MODULES, getModule, getLesson } from "./data.js";
import { getLessonState, getModuleProgress, getOverallProgress } from "./progress-client.js";

const DATE_LOCALES = { en: "en-IN", te: "te-IN", ta: "ta-IN", kn: "kn-IN" };

function formatDate(iso, lang) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString(DATE_LOCALES[lang] || "en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (e) {
    return iso;
  }
}

// Small deterministic hash (FNV-1a) so the same person + the same completed
// lesson/course always produces the same certificate ID — nothing sensitive,
// just a stable-looking reference code printed on the certificate.
function hashCode(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36).toUpperCase();
}

function certId(prefix, parts) {
  return `SH-${prefix}-${hashCode(parts.join("|"))}`;
}

function certificateShell(bodyHtml, ctx) {
  const { u } = ctx;
  return `
    <div class="cert-toolbar no-print">
      <button type="button" class="btn btn-primary" id="cert-print-btn">${u("certPrintButton")}</button>
    </div>
    ${bodyHtml}
  `;
}

function renderCertCard({ title, program, name, bodyLines, score, date, id, ctx }) {
  const { u, escapeHtml } = ctx;
  return `
    <div class="cert-page">
      <div class="cert-card">
        <div class="cert-corner cert-corner-tl"></div>
        <div class="cert-corner cert-corner-tr"></div>
        <div class="cert-corner cert-corner-bl"></div>
        <div class="cert-corner cert-corner-br"></div>
        <div class="cert-logo"><img src="assets/shreeja-logo.png" alt="Shreeja" /></div>
        <div class="cert-kicker">${escapeHtml(u("certIssuerName"))}</div>
        <div class="cert-seal">🏅</div>
        <h1 class="cert-title">${escapeHtml(title)}</h1>
        <div class="cert-presented">${escapeHtml(u("certPresentedTo"))}</div>
        <div class="cert-name">${escapeHtml(name)}</div>
        <div class="cert-body">${bodyLines.map((l) => escapeHtml(l)).join("<br/>")}</div>
        <div class="cert-program">${escapeHtml(program)}</div>
        <div class="cert-meta-row">
          ${score != null ? `<div class="cert-meta-item">${escapeHtml(u("certScoreLabel", { score }))}</div>` : ""}
          <div class="cert-meta-item">${escapeHtml(u("certDateLabel", { date: date || "—" }))}</div>
        </div>
        <div class="cert-id">${escapeHtml(u("certIdLabel", { id }))}</div>
      </div>
    </div>
  `;
}

function renderNotEarned(reasonText, backHash, backLabel, ctx) {
  const { u, escapeHtml } = ctx;
  return `
    <div class="page page-narrow no-print">
      <div class="admin-empty" style="background:white; border-radius:var(--radius); box-shadow:var(--shadow); padding:40px 24px;">
        <div style="font-size:40px; margin-bottom:10px;">🔒</div>
        <h2 style="margin:0 0 8px; color:var(--blue-900);">${escapeHtml(u("certNotEarnedTitle"))}</h2>
        <p style="margin:0 0 20px;">${escapeHtml(reasonText)}</p>
        <button type="button" class="btn btn-primary" data-nav="${backHash}">${escapeHtml(backLabel)}</button>
      </div>
    </div>
  `;
}

// ============================================================================
// Single-lesson certificate
// ============================================================================
export function renderCertificateLesson(moduleId, lessonId, ctx) {
  const { u, t, lang, renderTopbar, currentUser, navigate } = ctx;
  const mod = getModule(moduleId);
  const lesson = getLesson(moduleId, lessonId);
  if (!mod || !lesson) {
    navigate("#/dashboard");
    return "";
  }
  const state = getLessonState(moduleId, lessonId);
  const topbar = renderTopbar({ showBack: true, backHash: `#/module/${moduleId}/lesson/${lessonId}`, title: t(lesson.title) });

  if (!state.completed) {
    return `${topbar}${renderNotEarned(u("certNotEarnedLessonText"), `#/module/${moduleId}/lesson/${lessonId}`, u("backToModule"), ctx)}`;
  }

  const card = renderCertCard({
    title: u("certTitleLesson"),
    program: u("certCourseProgram"),
    name: currentUser.displayName,
    bodyLines: [u("certLessonBody"), `"${t(lesson.title)}"`, u("certModuleOfBody", { n: mod.number, title: t(mod.title) })],
    score: state.bestScore,
    date: formatDate(state.completedAt, lang) || formatDate(state.lastAttemptAt, lang),
    id: certId("LSN", [currentUser.id, moduleId, lessonId]),
    ctx,
  });

  return `${topbar}${certificateShell(card, ctx)}`;
}

export function wireCertificateLesson() {
  const btn = document.getElementById("cert-print-btn");
  if (btn) btn.addEventListener("click", () => window.print());
}

// ============================================================================
// Course-completion certificate
// ============================================================================
export function renderCertificateCourse(ctx) {
  const { u, lang, renderTopbar, currentUser } = ctx;
  const overall = getOverallProgress(MODULES);
  const topbar = renderTopbar({ showBack: true, backHash: "#/dashboard", title: u("certCourseCardTitle") });

  if (!overall.isComplete) {
    return `${topbar}${renderNotEarned(u("certNotEarnedCourseText"), "#/dashboard", u("backToDashboard"), ctx)}`;
  }

  // Latest completion date across every lesson stands in as the course's
  // completion date — the day the very last lesson was finished.
  let latest = null;
  MODULES.filter((m) => m.available).forEach((mod) => {
    mod.lessons.forEach((lesson) => {
      const st = getLessonState(mod.id, lesson.id);
      const at = st.completedAt || st.lastAttemptAt;
      if (at && (!latest || at > latest)) latest = at;
    });
  });

  const card = renderCertCard({
    title: u("certTitleCourse"),
    program: u("certCourseProgram"),
    name: currentUser.displayName,
    bodyLines: [u("certCourseBody")],
    score: null,
    date: formatDate(latest, lang),
    id: certId("CRS", [currentUser.id, "course"]),
    ctx,
  });

  return `${topbar}${certificateShell(card, ctx)}`;
}

export function wireCertificateCourse() {
  const btn = document.getElementById("cert-print-btn");
  if (btn) btn.addEventListener("click", () => window.print());
}

// ============================================================================
// "My Certificates" listing — every module's lessons plus the course card.
// ============================================================================
export function renderCertificatesList(ctx) {
  const { u, t, escapeHtml, renderTopbar } = ctx;
  const overall = getOverallProgress(MODULES);

  const courseCardClass = overall.isComplete ? "cert-list-course earned" : "cert-list-course locked";
  const courseCard = `
    <div class="${courseCardClass}">
      <div class="cert-list-course-icon">${overall.isComplete ? "🏆" : "🔒"}</div>
      <div class="cert-list-course-info">
        <h3>${escapeHtml(u("certCourseCardTitle"))}</h3>
        <p>${escapeHtml(
          overall.isComplete ? u("certCourseCardEarnedText") : u("certCourseCardLockedText", { done: overall.done, total: overall.total })
        )}</p>
      </div>
      ${
        overall.isComplete
          ? `<button type="button" class="btn btn-success" data-nav="#/certificate/course">${escapeHtml(u("certViewButton"))}</button>`
          : `<span class="status-pill inactive">${escapeHtml(u("certLessonLockedBadge"))}</span>`
      }
    </div>
  `;

  const moduleSections = MODULES.filter((m) => m.available)
    .map((mod) => {
      const progress = getModuleProgress(mod);
      const lessonRows = mod.lessons
        .map((lesson) => {
          const state = getLessonState(mod.id, lesson.id);
          return `
          <div class="cert-list-lesson-row">
            <div class="cert-list-lesson-title">${escapeHtml(t(lesson.title))}</div>
            ${
              state.completed
                ? `<button type="button" class="btn btn-outline btn-small" data-nav="#/certificate/${mod.id}/${lesson.id}">🎓 ${escapeHtml(u("certViewButton"))}</button>`
                : `<span class="status-pill inactive">${escapeHtml(u("certLessonLockedBadge"))}</span>`
            }
          </div>`;
        })
        .join("");
      return `
        <details class="cert-list-module">
          <summary>
            <span class="label">${escapeHtml(u("adminModuleLabel", { n: mod.number }))}: ${escapeHtml(t(mod.title))}</span>
            <span class="count">${escapeHtml(u("adminLessonsCompleteLabel", { completed: progress.completed, total: progress.total }))}</span>
          </summary>
          <div class="cert-list-lessons">${lessonRows}</div>
        </details>
      `;
    })
    .join("");

  return `
    ${renderTopbar({ showBack: false })}
    <div class="page">
      <div class="dash-header">
        <h1>${escapeHtml(u("certificatesPageTitle"))}</h1>
        <p>${escapeHtml(u("certificatesPageTagline"))}</p>
      </div>
      ${courseCard}
      <div class="cert-list-modules">${moduleSections}</div>
    </div>
  `;
}

export function wireCertificatesList() {
  // Purely static once rendered — nav is handled by app.js's global
  // [data-nav] click delegation, so there's nothing extra to wire here.
}
