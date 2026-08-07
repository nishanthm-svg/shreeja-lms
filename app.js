import { MODULES, getModule, getLesson, getLessonIndex } from "./data.js";
import {
  getLessonState,
  recordQuizAttempt,
  isLessonUnlocked,
  getModuleProgress,
} from "./progress.js";
import { LANGUAGES, getLang, setLang, tr, ui } from "./i18n.js";

const root = document.getElementById("app");

const ICONS = {
  check: "✓",
  lock: "🔒",
};

const TOPIC_EMOJIS = ["🥛", "🐄", "🌍", "📈", "🤝", "🏆", "🌾", "💡"];
const CALLOUT_EMOJIS = { info: "💡", tip: "✅", warning: "⚠️" };
const STAT_EMOJIS = ["🎯", "🌟", "🔑", "📌", "✨", "🌱"];

let lang = getLang(); // null until the learner picks one

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

function navigate(hash) {
  if (location.hash === hash) {
    render();
  } else {
    location.hash = hash;
  }
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
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
        <div class="lang-picker-icon">🥛</div>
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
        navigate("#/");
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
  return `
    <div class="topbar">
      ${
        showBack
          ? `<button class="back-btn" data-nav="${backHash}">${u("backButton")}</button>`
          : `<div class="brand" data-nav="#/"><span class="brand-icon">🥛</span> ${escapeHtml(u("brandName"))}</div>`
      }
      ${showBack ? `<div class="brand" data-nav="#/" style="margin-left:4px;"><span class="brand-icon">🥛</span> ${escapeHtml(title || u("brandName"))}</div>` : ""}
      <div class="spacer"></div>
      <button class="lang-switch-btn" data-nav="#/language">🌐 ${escapeHtml((LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]).native)}</button>
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

  const activeModules = MODULES.filter((m) => m.available);
  const totalLessons = activeModules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
  const totalDone = activeModules.reduce((sum, m) => sum + getModuleProgress(m).completed, 0);
  const overallPct = totalLessons ? Math.round((totalDone / totalLessons) * 100) : 0;

  return `
    ${renderTopbar({ showBack: false })}
    <div class="page">
      <div class="dash-header">
        <h1>${u("dashboardTitle")}</h1>
        <p>${u("dashboardTagline")}</p>
      </div>
      <div class="overall-progress">
        <div class="ring" style="--pct:${overallPct}" data-label="${overallPct}%"></div>
        <div>
          <div style="font-weight:700; font-size:15px;">${u("lessonsCompletedCount", { done: totalDone, total: totalLessons })}</div>
          <div style="font-size:13px; color:var(--gray-500);">${u("progressHint")}</div>
        </div>
      </div>
      <div class="module-grid">${cards}</div>
      <div class="progress-note">${u("progressNote")}</div>
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
    ${renderTopbar({ showBack: true, backHash: "#/", title: t(mod.title) })}
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
          <div class="year">${escapeHtml(it.year)}</div>
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

    let actionsHtml;
    if (lesson.finalQuiz.isFinal) {
      actionsHtml = `<button class="btn btn-success" data-nav="#/module/${moduleId}/complete">${u("viewCertificate")}</button>`;
    } else if (nextLesson) {
      actionsHtml = `<button class="btn btn-primary" data-nav="#/module/${moduleId}/lesson/${nextLesson.id}">${u("continueNextLesson")}</button>`;
    } else {
      actionsHtml = `<button class="btn btn-primary" data-nav="#/module/${moduleId}">${u("backToModule")}</button>`;
    }

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
    navigate("#/");
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
    navigate("#/");
    return "";
  }
  const nextMod = MODULES.find((m) => m.number === mod.number + 1);
  return `
    ${renderTopbar({ showBack: true, backHash: `#/module/${moduleId}`, title: t(mod.title) })}
    <div class="page page-narrow">
      <div class="completion-box">
        <div class="confetti-row">🎉 🎊 ✨ 🏆 ✨ 🎊 🎉</div>
        <div class="icon">🏆</div>
        <h2>${u("moduleCompleteTitle", { n: mod.number })}</h2>
        <p>${u("moduleCompleteText", { title: t(mod.title) })}</p>
        <div class="btn-row" style="justify-content:center;">
          <button class="btn btn-outline" style="background:white;" data-nav="#/">${u("backToDashboard")}</button>
          <button class="btn btn-success" data-nav="#/module/${moduleId}">${u("reviewModule")}</button>
        </div>
      </div>
      ${nextMod ? `<p style="text-align:center; color:var(--gray-500); margin-top:18px; font-size:14px;">${u("nextModuleComingSoon", { n: nextMod.number, title: t(nextMod.title) })}</p>` : ""}
    </div>
  `;
}

// ============================================================================
// Router
// ============================================================================
function parseHash() {
  const hash = location.hash || "#/";
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (parts.length === 0) return { route: "dashboard" };
  if (parts[0] === "language") return { route: "language" };
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

let lastNonLanguageHash = "#/";

function render() {
  const parsed = parseHash();

  // Force the language picker on first visit, before anything else.
  if (!lang && parsed.route !== "language") {
    root.innerHTML = renderLanguagePicker(false);
    wireLanguagePicker(false, null);
    return;
  }

  if (parsed.route !== "language") {
    lastNonLanguageHash = location.hash || "#/";
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
    default:
      html = renderDashboard();
  }

  if (html) {
    root.innerHTML = html;
    if (parsed.route === "language") {
      wireLanguagePicker(!!lang, lastNonLanguageHash);
    }
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
