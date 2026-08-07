import { MODULES, getModule, getLesson, getLessonIndex } from "./data.js";
import {
  getLessonState,
  recordQuizAttempt,
  isLessonUnlocked,
  getModuleProgress,
  resetAllProgress,
} from "./progress.js";

const root = document.getElementById("app");

const ICONS = {
  milk: "🥛",
  check: "✓",
  lock: "🔒",
  play: "▶",
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function navigate(hash) {
  if (location.hash === hash) {
    render();
  } else {
    location.hash = hash;
  }
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

// ============================================================================
// Top bar
// ============================================================================
function renderTopbar(context) {
  const { title, showBack, backHash } = context;
  return `
    <div class="topbar">
      ${
        showBack
          ? `<button class="back-btn" data-nav="${backHash}">← Back</button>`
          : `<div class="brand" data-nav="#/"><span class="brand-icon">🥛</span> Shreeja LMS</div>`
      }
      ${showBack ? `<div class="brand" data-nav="#/" style="margin-left:4px;"><span class="brand-icon">🥛</span> ${escapeHtml(title || "Shreeja LMS")}</div>` : ""}
      <div class="spacer"></div>
    </div>
  `;
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
            <h3>${escapeHtml(mod.title)}</h3>
            <div class="meta">Coming soon</div>
          </div>
          <span class="badge locked">${ICONS.lock} Locked</span>
        </div>
      `;
    }
    const progress = getModuleProgress(mod);
    const badge = progress.isComplete
      ? `<span class="badge complete">${ICONS.check} Completed</span>`
      : progress.completed > 0
      ? `<span class="badge progress">In progress</span>`
      : `<span class="badge progress">Start</span>`;
    return `
      <div class="module-card available" data-nav="#/module/${mod.id}">
        <div class="module-number">${mod.number}</div>
        <div class="module-info">
          <h3>${escapeHtml(mod.title)}</h3>
          <div class="meta">${progress.completed}/${progress.total} lessons complete</div>
          <div class="mini-bar"><div style="width:${progress.percent}%"></div></div>
        </div>
        ${badge}
      </div>
    `;
  }).join("");

  const activeModules = MODULES.filter((m) => m.available);
  const totalLessons = activeModules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
  const totalDone = activeModules.reduce((sum, m) => sum + getModuleProgress(m).completed, 0);
  const overallPct = totalLessons ? Math.round((totalDone / totalLessons) * 100) : 0;

  return `
    ${renderTopbar({ showBack: false })}
    <div class="page">
      <div class="dash-header">
        <h1>Shreeja Learning Academy</h1>
        <p>Self-paced training for Sahayaks and field staff. Complete each lesson's quiz to unlock the next.</p>
      </div>
      <div class="overall-progress">
        <div class="ring" style="--pct:${overallPct}" data-label="${overallPct}%"></div>
        <div>
          <div style="font-weight:700; font-size:15px;">${totalDone} of ${totalLessons} lessons completed</div>
          <div style="font-size:13px; color:var(--gray-500);">Keep going — every lesson builds toward your certificate.</div>
        </div>
      </div>
      <div class="module-grid">${cards}</div>
      <div class="progress-note">Your progress is saved automatically in this browser.</div>
    </div>
  `;
}

// ============================================================================
// Module page — lesson list
// ============================================================================
function renderModulePage(moduleId) {
  const mod = getModule(moduleId);
  if (!mod || !mod.available) {
    navigate("#/");
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
      return `
        <div class="lesson-row ${rowClass}" ${unlocked ? `data-nav="#/module/${mod.id}/lesson/${lesson.id}"` : ""}>
          <div class="lesson-status-icon ${iconClass}">${iconHtml}</div>
          <div class="lesson-info">
            <h4>${escapeHtml(lesson.title)}</h4>
            <div class="meta">${lesson.estMinutes} min${state.completed ? ` · Best score ${state.bestScore}%` : ""}${!unlocked ? " · Complete the previous lesson to unlock" : ""}</div>
          </div>
          ${unlocked ? `<div class="chev">›</div>` : ""}
        </div>
      `;
    })
    .join("");

  return `
    ${renderTopbar({ showBack: true, backHash: "#/", title: mod.title })}
    <div class="page">
      <div class="module-hero">
        <h1>${escapeHtml(mod.title)}</h1>
        <p>${escapeHtml(mod.subtitle || "")}</p>
        <div class="progress-row">
          <div class="bar-track"><div style="width:${progress.percent}%"></div></div>
          <div class="progress-label">${progress.completed}/${progress.total} complete</div>
        </div>
      </div>
      <div class="lesson-list">${rows}</div>
    </div>
  `;
}

// ============================================================================
// Content block renderers
// ============================================================================
function renderBlockHtml(block) {
  switch (block.type) {
    case "hero":
      return `<div class="block block-hero"><h2>${escapeHtml(block.heading)}</h2><p>${escapeHtml(block.text)}</p></div>`;

    case "text":
      return `<div class="block block-text"><h3>${escapeHtml(block.heading)}</h3><div class="body">${block.html}</div></div>`;

    case "callout":
      return `<div class="block callout ${block.style || ""}"><h4>${escapeHtml(block.heading)}</h4><p>${escapeHtml(block.text)}</p></div>`;

    case "example":
      return `<div class="block example-box"><h4>${escapeHtml(block.heading)}</h4><p>${escapeHtml(block.text)}</p></div>`;

    case "stat-grid":
      return `<div class="block stat-grid">${block.items
        .map(
          (it) => `<div class="stat-card"><div class="label">${escapeHtml(it.label)}</div><div class="text">${escapeHtml(it.text)}</div></div>`
        )
        .join("")}</div>`;

    case "barchart": {
      const max = Math.max(...block.data.map((d) => d.value));
      const rows = block.data
        .map(
          (d, i) => `
        <div class="bar-row">
          <div class="bar-label">${d.flag ? d.flag + " " : ""}${escapeHtml(d.label)}</div>
          <div class="bar-track"><div class="bar-fill" data-target="${(d.value / max) * 100}" style="transition-delay:${i * 40}ms"></div></div>
          <div class="bar-value">${d.value} ${escapeHtml(block.unit)}</div>
        </div>`
        )
        .join("");
      return `
        <div class="block chart-box">
          <h3>${escapeHtml(block.heading)}</h3>
          <div class="chart-source">${escapeHtml(block.source)}</div>
          ${rows}
        </div>`;
    }

    case "timeline": {
      const items = block.items
        .map(
          (it) => `
        <div class="timeline-item">
          <div class="year">${escapeHtml(it.year)}</div>
          <div class="text">${escapeHtml(it.text)}</div>
        </div>`
        )
        .join("");
      return `
        <div class="block timeline-box">
          <h3>${escapeHtml(block.heading)}</h3>
          <div class="timeline">${items}</div>
          ${block.result ? `<div class="timeline-result">${escapeHtml(block.result)}</div>` : ""}
        </div>`;
    }

    case "poll": {
      const qs = block.questions
        .map(
          (q, qi) => `
        <div class="poll-q" data-poll-q="${qi}">
          <div class="q-text">${escapeHtml(q.q)}</div>
          <div class="opt-list">
            ${q.options
              .map((opt, oi) => `<button class="opt-btn" data-poll-opt="${oi}">${escapeHtml(opt)}</button>`)
              .join("")}
          </div>
          <div class="poll-reveal" style="display:none;"></div>
        </div>`
        )
        .join("");
      return `<div class="block poll-box"><h3>${escapeHtml(block.heading)}</h3>${qs}</div>`;
    }

    default:
      return "";
  }
}

function wirePollHandlers(container, block, blockEl) {
  const questionEls = blockEl.querySelectorAll("[data-poll-q]");
  questionEls.forEach((qEl) => {
    const qi = Number(qEl.getAttribute("data-poll-q"));
    const qData = block.questions[qi];
    const optBtns = qEl.querySelectorAll("[data-poll-opt]");
    const revealEl = qEl.querySelector(".poll-reveal");
    optBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const oi = Number(btn.getAttribute("data-poll-opt"));
        optBtns.forEach((b, i) => {
          b.disabled = true;
          if (i === qData.answer) b.classList.add("correct");
          else if (i === oi) b.classList.add("incorrect");
        });
        revealEl.style.display = "block";
        revealEl.textContent = qData.reveal || "";
      });
    });
  });
}

function animateBars(blockEl) {
  const fills = blockEl.querySelectorAll(".bar-fill");
  requestAnimationFrame(() => {
    fills.forEach((f) => {
      f.style.width = f.getAttribute("data-target") + "%";
    });
  });
}

// ============================================================================
// Quiz
// ============================================================================
function renderQuizShell(lesson) {
  const quiz = lesson.quiz;
  return `
    <div class="quiz-section" id="quiz-section">
      <h2>${quiz.isFinal ? "Final Assessment" : "Lesson Quiz"}</h2>
      <div class="sub">Score ${quiz.passScore}% or higher to ${quiz.isFinal ? "complete this module" : "unlock the next lesson"}.</div>
      <div id="quiz-body"></div>
    </div>
  `;
}

function renderQuizQuestions(quiz) {
  return quiz.questions
    .map((q, qi) => {
      const options = q.type === "truefalse" ? ["True", "False"] : q.options;
      return `
      <div class="quiz-q" data-quiz-q="${qi}">
        <div class="q-num">Question ${qi + 1} of ${quiz.questions.length}</div>
        <div class="q-text">${escapeHtml(q.q)}</div>
        <div class="opt-list">
          ${options
            .map((opt, oi) => `<button type="button" class="opt-btn" data-quiz-opt="${oi}">${escapeHtml(opt)}</button>`)
            .join("")}
        </div>
      </div>`;
    })
    .join("");
}

function wireQuiz(moduleId, lesson) {
  const quiz = lesson.quiz;
  const body = document.getElementById("quiz-body");
  const answers = new Array(quiz.questions.length).fill(null);

  function renderQuestions() {
    body.innerHTML =
      renderQuizQuestions(quiz) +
      `<div class="btn-row"><button class="btn btn-primary" id="submit-quiz" disabled>Submit Answers</button></div>`;

    const qBlocks = body.querySelectorAll("[data-quiz-q]");
    qBlocks.forEach((qEl) => {
      const qi = Number(qEl.getAttribute("data-quiz-q"));
      const optBtns = qEl.querySelectorAll("[data-quiz-opt]");
      optBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const oi = Number(btn.getAttribute("data-quiz-opt"));
          answers[qi] = oi;
          optBtns.forEach((b) => b.classList.remove("selected-opt"));
          btn.classList.add("selected-opt");
          btn.style.borderColor = "var(--blue-600)";
          btn.style.background = "var(--blue-50)";
          optBtns.forEach((b, i) => {
            if (i !== oi) {
              b.style.borderColor = "";
              b.style.background = "";
            }
          });
          submitBtn.disabled = answers.some((a) => a === null);
        });
      });
    });

    const submitBtn = document.getElementById("submit-quiz");
    submitBtn.addEventListener("click", () => {
      let correctCount = 0;
      const results = quiz.questions.map((q, qi) => {
        const correctIdx = q.type === "truefalse" ? (q.answer ? 0 : 1) : q.answer;
        const isCorrect = answers[qi] === correctIdx;
        if (isCorrect) correctCount++;
        return { q, isCorrect };
      });
      const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);
      const passed = scorePercent >= quiz.passScore;
      recordQuizAttempt(moduleId, lesson.id, scorePercent, passed);
      renderResult(scorePercent, passed, results);
    });
  }

  function renderResult(scorePercent, passed, results) {
    const mod = getModule(moduleId);
    const lessonIdx = getLessonIndex(moduleId, lesson.id);
    const nextLesson = mod.lessons[lessonIdx + 1];

    const reviewHtml = results
      .map(
        (r, i) => `
        <div class="review-item ${r.isCorrect ? "correct" : "incorrect"}">
          <div class="mark">${r.isCorrect ? "✓" : "✕"}</div>
          <div>
            <div>${escapeHtml(r.q.q)}</div>
            <div class="exp">${escapeHtml(r.q.explanation || "")}</div>
          </div>
        </div>`
      )
      .join("");

    let actionsHtml = "";
    if (passed && quiz.isFinal) {
      actionsHtml = `<div class="btn-row" style="justify-content:center;"><button class="btn btn-success" data-nav="#/module/${moduleId}/complete">View Certificate</button></div>`;
    } else if (passed && nextLesson) {
      actionsHtml = `<div class="btn-row" style="justify-content:center;"><button class="btn btn-primary" data-nav="#/module/${moduleId}/lesson/${nextLesson.id}">Continue to Next Lesson →</button></div>`;
    } else if (passed) {
      actionsHtml = `<div class="btn-row" style="justify-content:center;"><button class="btn btn-primary" data-nav="#/module/${moduleId}">Back to Module</button></div>`;
    } else {
      actionsHtml = `<div class="btn-row" style="justify-content:center;"><button class="btn btn-primary" id="retry-quiz">Retry Quiz</button></div>`;
    }

    body.innerHTML = `
      <div class="quiz-result ${passed ? "pass" : "fail"}">
        <div class="score-circle"><div class="pct">${scorePercent}%</div><div class="lbl">${passed ? "Passed" : "Try again"}</div></div>
        <h3>${passed ? "Great work!" : "Almost there!"}</h3>
        <p>${
          passed
            ? "You've passed this quiz."
            : `You need ${quiz.passScore}% to pass. Review the explanations below and try again.`
        }</p>
        ${actionsHtml}
        <div class="quiz-review">${reviewHtml}</div>
      </div>
    `;

    const retryBtn = document.getElementById("retry-quiz");
    if (retryBtn) {
      retryBtn.addEventListener("click", () => {
        answers.fill(null);
        renderQuestions();
      });
    }
  }

  renderQuestions();
}

// ============================================================================
// Lesson page
// ============================================================================
function renderLessonPage(moduleId, lessonId) {
  const mod = getModule(moduleId);
  const lesson = getLesson(moduleId, lessonId);
  if (!mod || !lesson) {
    navigate("#/");
    return "";
  }
  if (!isLessonUnlocked(mod, lessonId)) {
    navigate(`#/module/${moduleId}`);
    return "";
  }
  const lessonIdx = getLessonIndex(moduleId, lessonId);

  const blocksHtml = lesson.blocks.map((b) => renderBlockHtml(b)).join("");

  return `
    ${renderTopbar({ showBack: true, backHash: `#/module/${moduleId}`, title: mod.title })}
    <div class="page page-narrow">
      <div class="lesson-title-bar">
        <div class="kicker">Lesson ${lessonIdx + 1} of ${mod.lessons.length}</div>
        <h1>${escapeHtml(lesson.title)}</h1>
      </div>
      <div id="lesson-blocks">${blocksHtml}</div>
      ${renderQuizShell(lesson)}
    </div>
  `;
}

function afterLessonRender(moduleId, lesson) {
  const blocksContainer = document.getElementById("lesson-blocks");
  lesson.blocks.forEach((block, i) => {
    const el = blocksContainer.children[i];
    if (!el) return;
    if (block.type === "poll") wirePollHandlers(blocksContainer, block, el);
    if (block.type === "barchart") animateBars(el);
  });
  wireQuiz(moduleId, lesson);
}

// ============================================================================
// Module completion page
// ============================================================================
function renderCompletionPage(moduleId) {
  const mod = getModule(moduleId);
  if (!mod) {
    navigate("#/");
    return "";
  }
  const nextMod = MODULES.find((m) => m.number === mod.number + 1);
  return `
    ${renderTopbar({ showBack: true, backHash: `#/module/${moduleId}`, title: mod.title })}
    <div class="page page-narrow">
      <div class="completion-box">
        <div class="icon">🏆</div>
        <h2>Module ${mod.number} Complete!</h2>
        <p>You've finished "${escapeHtml(mod.title)}". Great job working through every lesson and quiz on your own.</p>
        <div class="btn-row" style="justify-content:center;">
          <button class="btn btn-outline" style="background:white;" data-nav="#/">Back to Dashboard</button>
          ${nextMod ? `<button class="btn btn-success" data-nav="#/module/${moduleId}">Review Module</button>` : ""}
        </div>
      </div>
      ${nextMod ? `<p style="text-align:center; color:var(--gray-500); margin-top:18px; font-size:14px;">Module ${nextMod.number}: "${escapeHtml(nextMod.title)}" is coming soon.</p>` : ""}
    </div>
  `;
}

// ============================================================================
// Router
// ============================================================================
function parseHash() {
  const hash = location.hash || "#/";
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  // parts: [] -> dashboard
  // ['module', ':id'] -> module page
  // ['module', ':id', 'lesson', ':lid'] -> lesson page
  // ['module', ':id', 'complete'] -> completion page
  if (parts.length === 0) return { route: "dashboard" };
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

function render() {
  const parsed = parseHash();
  let html = "";
  let afterRender = null;

  switch (parsed.route) {
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
    default:
      html = renderDashboard();
  }

  if (html) {
    root.innerHTML = html;
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

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
if (document.readyState !== "loading") render();
