import { MODULES, getModule, getLesson, getLessonIndex } from "./data.js";
import {
  getLessonState,
  recordQuizAttempt,
  isLessonUnlocked,
  getModuleProgress,
} from "./progress.js";

const root = document.getElementById("app");

const ICONS = {
  check: "✓",
  lock: "🔒",
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
        <p>Learn step by step, on your own. Every topic is taught first, then checked — no instructor needed.</p>
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
      const topicCount = lesson.topics ? lesson.topics.length : 0;
      return `
        <div class="lesson-row ${rowClass}" ${unlocked ? `data-nav="#/module/${mod.id}/lesson/${lesson.id}"` : ""}>
          <div class="lesson-status-icon ${iconClass}">${iconHtml}</div>
          <div class="lesson-info">
            <h4>${escapeHtml(lesson.title)}</h4>
            <div class="meta">${lesson.estMinutes} min · ${topicCount} topics${state.completed ? ` · Best score ${state.bestScore}%` : ""}${!unlocked ? " · Complete the previous lesson to unlock" : ""}</div>
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
// Content block renderers (used for both "hook" blocks and topic "teach" blocks)
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

    case "glossary":
      return `<div class="block glossary-box"><span class="gloss-icon">📖</span><div><span class="gloss-term">${escapeHtml(block.term)}</span> — <span class="gloss-meaning">${escapeHtml(block.meaning)}</span></div></div>`;

    case "ledger": {
      const rows = block.rows
        .map((r) => `<div class="ledger-row"><span>${escapeHtml(r.label)}</span><span>${escapeHtml(r.amount)}</span></div>`)
        .join("");
      return `
        <div class="block ledger-box">
          <h3>${escapeHtml(block.heading)}</h3>
          ${rows}
          <div class="ledger-row ledger-total"><span>${escapeHtml(block.total.label)}</span><span>${escapeHtml(block.total.amount)}</span></div>
        </div>`;
    }

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
// Question set component — renders a group of questions with select+submit,
// then reports per-question results. Used for both quick-checks and the
// lesson's final quiz.
// ============================================================================
function renderQuestionSet(container, questions, opts) {
  const answers = new Array(questions.length).fill(null);
  const label = opts.submitLabel || "Check My Answers";

  const qsHtml = questions
    .map((q, qi) => {
      const options = q.type === "truefalse" ? ["True", "False"] : q.options;
      return `
      <div class="quiz-q" data-quiz-q="${qi}">
        ${questions.length > 1 ? `<div class="q-num">Question ${qi + 1} of ${questions.length}</div>` : ""}
        <div class="q-text">${escapeHtml(q.q)}</div>
        <div class="opt-list">
          ${options
            .map((opt, oi) => `<button type="button" class="opt-btn" data-quiz-opt="${oi}">${escapeHtml(opt)}</button>`)
            .join("")}
        </div>
      </div>`;
    })
    .join("");

  container.innerHTML = `${qsHtml}<div class="btn-row"><button class="btn btn-primary" id="qs-submit" disabled>${label}</button></div>`;

  const qBlocks = container.querySelectorAll("[data-quiz-q]");
  qBlocks.forEach((qEl) => {
    const qi = Number(qEl.getAttribute("data-quiz-q"));
    const optBtns = qEl.querySelectorAll("[data-quiz-opt]");
    optBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const oi = Number(btn.getAttribute("data-quiz-opt"));
        answers[qi] = oi;
        optBtns.forEach((b) => {
          b.style.borderColor = "";
          b.style.background = "";
        });
        btn.style.borderColor = "var(--blue-600)";
        btn.style.background = "var(--blue-50)";
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
          <div>${escapeHtml(r.q.q)}</div>
          <div class="exp">${escapeHtml(r.q.explain || "")}</div>
        </div>
      </div>`
    )
    .join("");
}

// ============================================================================
// Lesson flow controller — teaches one topic at a time, checks understanding,
// and sends learners back to re-learn any topic they get wrong.
// ============================================================================
function runLessonFlow(moduleId, lesson) {
  const flowEl = document.getElementById("flow");
  const dotsEl = document.getElementById("topic-dots");
  const topics = lesson.topics;

  function setDots(activeIdx, clearedIdxs) {
    if (!dotsEl) return;
    dotsEl.innerHTML = topics
      .map((t, i) => {
        let cls = "dot";
        if (clearedIdxs.has(i)) cls += " dot-done";
        else if (i === activeIdx) cls += " dot-active";
        return `<div class="${cls}" title="${escapeHtml(t.title)}"></div>`;
      })
      .join("");
  }

  const clearedTopics = new Set();

  function showTopic(idx) {
    setDots(idx, clearedTopics);
    const topic = topics[idx];
    flowEl.innerHTML = `
      <div class="topic-kicker">Topic ${idx + 1} of ${topics.length}</div>
      <h2 class="topic-title">${escapeHtml(topic.title)}</h2>
      <div id="topic-teach">${renderBlocks(topic.teach)}</div>
      <div class="check-box">
        <h3>Quick Check</h3>
        <div class="sub">Answer these to make sure it's clear before moving on.</div>
        <div id="topic-check"></div>
      </div>
    `;
    animateBarsIn(flowEl);
    showTopicCheck(idx, 1);
  }

  function showTopicCheck(idx, attempt) {
    const topic = topics[idx];
    const checkEl = document.getElementById("topic-check");
    renderQuestionSet(checkEl, topic.check, {
      submitLabel: attempt === 1 ? "Check My Answers" : "Check Again",
      onSubmit: (results) => {
        const allCorrect = results.every((r) => r.isCorrect);
        if (allCorrect) {
          clearedTopics.add(idx);
          setDots(idx, clearedTopics);
          checkEl.innerHTML = `
            <div class="check-pass">
              <div class="check-pass-icon">✓</div>
              <div>
                <div class="check-pass-title">Nicely done — that's clear!</div>
                <div class="check-pass-sub">You got ${results.length}/${results.length} right.</div>
              </div>
            </div>
            <div class="btn-row"><button class="btn btn-primary" id="next-topic-btn">${idx + 1 < topics.length ? "Continue to Next Topic →" : "Continue to Lesson Quiz →"}</button></div>
          `;
          document.getElementById("next-topic-btn").addEventListener("click", () => {
            if (idx + 1 < topics.length) showTopic(idx + 1);
            else showFinalIntro();
          });
        } else {
          const numRight = results.filter((r) => r.isCorrect).length;
          checkEl.innerHTML = `
            <div class="check-fail">
              <div class="check-fail-title">Not quite yet — let's learn this again.</div>
              <div class="check-fail-sub">You got ${numRight}/${results.length} right. Re-read the topic above, then try again.</div>
            </div>
            <div class="btn-row"><button class="btn btn-primary" id="retry-topic-btn">Read It Again & Retry</button></div>
          `;
          document.getElementById("retry-topic-btn").addEventListener("click", () => {
            document.getElementById("topic-teach").scrollIntoView({ behavior: "smooth", block: "start" });
            showTopicCheck(idx, attempt + 1);
          });
        }
      },
    });
  }

  function showFinalIntro() {
    setDots(-1, clearedTopics);
    flowEl.innerHTML = `
      <div class="quiz-section" id="final-quiz-section">
        <h2>Lesson Quiz</h2>
        <div class="sub">You've learned every topic in this lesson. Let's check everything together. If you miss something, you'll get a chance to re-learn just that part.</div>
        <div id="final-quiz-body"></div>
      </div>
    `;
    showFinalQuiz();
  }

  function showFinalQuiz() {
    const body = document.getElementById("final-quiz-body");
    renderQuestionSet(body, lesson.finalQuiz.questions, {
      submitLabel: "Submit Lesson Quiz",
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
    const topic = topics.find((t) => t.id === queue[i]);
    const topicIdx = topics.indexOf(topic);
    flowEl.innerHTML = `
      <div class="review-banner">
        <div class="review-banner-title">📖 Let's Review: ${escapeHtml(topic.title)}</div>
        <div class="review-banner-sub">You missed a question about this earlier. Here it is again — take your time.</div>
      </div>
      <div id="review-teach">${renderBlocks(topic.teach)}</div>
      <div class="check-box">
        <h3>Try Again</h3>
        <div id="review-check"></div>
      </div>
    `;
    animateBarsIn(flowEl);
    const reviewCheckEl = document.getElementById("review-check");

    function attemptReview() {
      renderQuestionSet(reviewCheckEl, topic.check, {
        submitLabel: "Check My Answers",
        onSubmit: (results) => {
          const allCorrect = results.every((r) => r.isCorrect);
          if (allCorrect) {
            clearedTopics.add(topicIdx);
            reviewCheckEl.innerHTML = `
              <div class="check-pass">
                <div class="check-pass-icon">✓</div>
                <div>
                  <div class="check-pass-title">Got it — that's cleared up now!</div>
                </div>
              </div>
              <div class="btn-row"><button class="btn btn-primary" id="review-next-btn">${
                i + 1 < queue.length ? "Review Next Topic →" : "Finish Lesson →"
              }</button></div>
            `;
            document.getElementById("review-next-btn").addEventListener("click", () => {
              showReviewQueue(queue, i + 1, originalScore);
            });
          } else {
            reviewCheckEl.innerHTML = `
              <div class="check-fail">
                <div class="check-fail-title">Still not quite — one more look.</div>
                <div class="check-fail-sub">Scroll up and re-read this topic, then try once more.</div>
              </div>
              <div class="btn-row"><button class="btn btn-primary" id="review-retry-btn">Read It Again & Retry</button></div>
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
    setDots(-1, new Set(topics.map((_, i) => i)));

    let actionsHtml;
    if (lesson.finalQuiz.isFinal) {
      actionsHtml = `<button class="btn btn-success" data-nav="#/module/${moduleId}/complete">View Certificate</button>`;
    } else if (nextLesson) {
      actionsHtml = `<button class="btn btn-primary" data-nav="#/module/${moduleId}/lesson/${nextLesson.id}">Continue to Next Lesson →</button>`;
    } else {
      actionsHtml = `<button class="btn btn-primary" data-nav="#/module/${moduleId}">Back to Module</button>`;
    }

    flowEl.innerHTML = `
      <div class="quiz-section">
        <div class="quiz-result pass">
          <div class="score-circle"><div class="pct">${scorePercent}%</div><div class="lbl">Complete</div></div>
          <h3>${wasReviewed ? "All caught up!" : "Great work!"}</h3>
          <p>${
            wasReviewed
              ? "You reviewed a few things and now know this lesson well."
              : "You've learned and passed every topic in this lesson."
          }</p>
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
    ${renderTopbar({ showBack: true, backHash: `#/module/${moduleId}`, title: mod.title })}
    <div class="page page-narrow">
      <div class="lesson-title-bar">
        <div class="kicker">Lesson ${lessonIdx + 1} of ${mod.lessons.length}</div>
        <h1>${escapeHtml(lesson.title)}</h1>
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
    ${renderTopbar({ showBack: true, backHash: `#/module/${moduleId}`, title: mod.title })}
    <div class="page page-narrow">
      <div class="completion-box">
        <div class="icon">🏆</div>
        <h2>Module ${mod.number} Complete!</h2>
        <p>You've finished "${escapeHtml(mod.title)}". Great job working through every lesson and quiz on your own.</p>
        <div class="btn-row" style="justify-content:center;">
          <button class="btn btn-outline" style="background:white;" data-nav="#/">Back to Dashboard</button>
          <button class="btn btn-success" data-nav="#/module/${moduleId}">Review Module</button>
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
