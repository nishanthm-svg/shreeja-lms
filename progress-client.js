// ============================================================================
// Server-backed replacement for progress.js's localStorage-based tracking.
// Same exported function names/shapes so app.js's render call sites don't
// change; the full progress blob is fetched once (see setProgressCache,
// called from app.js after session restore) into this in-memory cache;
// reads stay synchronous against that cache. Only recordQuizAttempt talks
// to the network — it updates the cache optimistically so the UI doesn't
// wait on a round trip, then reconciles with the server's response.
// ============================================================================
import { api } from "./api.js";

let cache = {}; // { moduleId: { lessonId: {completed,bestScore,attempts,completedAt} } }

export function setProgressCache(progress) {
  cache = progress || {};
}

export function getLessonState(moduleId, lessonId) {
  return (cache[moduleId] && cache[moduleId][lessonId]) || { completed: false, bestScore: 0, attempts: 0, completedAt: null };
}

export function recordQuizAttempt(moduleId, lessonId, scorePercent, passed) {
  const existing = getLessonState(moduleId, lessonId);
  const justCompleted = !existing.completed && !!passed;
  const optimistic = {
    completed: existing.completed || passed,
    bestScore: Math.max(existing.bestScore, scorePercent),
    attempts: existing.attempts + 1,
    completedAt: existing.completedAt || (justCompleted ? new Date().toISOString() : null),
  };
  if (!cache[moduleId]) cache[moduleId] = {};
  cache[moduleId][lessonId] = optimistic;

  api
    .quizAttempt(moduleId, lessonId, scorePercent, passed)
    .then((res) => {
      if (res && res.lessonState && cache[moduleId]) {
        cache[moduleId][lessonId] = res.lessonState;
      }
    })
    .catch((e) => {
      console.error("Failed to save quiz attempt to the server:", e);
    });

  return optimistic;
}

// First lesson in a module is always unlocked; each subsequent lesson
// unlocks once the previous lesson has been completed (quiz passed).
export function isLessonUnlocked(mod, lessonId) {
  if (!mod || !mod.lessons) return false;
  const idx = mod.lessons.findIndex((l) => l.id === lessonId);
  if (idx <= 0) return true;
  const prevLesson = mod.lessons[idx - 1];
  return getLessonState(mod.id, prevLesson.id).completed;
}

export function getModuleProgress(mod) {
  if (!mod || !mod.lessons || mod.lessons.length === 0) {
    return { completed: 0, total: 0, percent: 0, isComplete: false };
  }
  const completed = mod.lessons.filter((l) => getLessonState(mod.id, l.id).completed).length;
  const total = mod.lessons.length;
  return {
    completed,
    total,
    percent: Math.round((completed / total) * 100),
    isComplete: completed === total,
  };
}

// Overall progress across every available module — used for the dashboard's
// summary ring and to gate the course-completion certificate.
export function getOverallProgress(modules) {
  const active = modules.filter((m) => m.available);
  let done = 0;
  let total = 0;
  active.forEach((m) => {
    const p = getModuleProgress(m);
    done += p.completed;
    total += p.total;
  });
  return {
    done,
    total,
    percent: total ? Math.round((done / total) * 100) : 0,
    isComplete: total > 0 && done === total,
  };
}

export function isCourseComplete(modules) {
  return getOverallProgress(modules).isComplete;
}

// The final exam's attempt record lives at cache.finalExam — a sibling to
// the moduleId keys (never "m1".."m12", so it can't collide) in the same
// progress blob, following the exact optimistic-update-then-reconcile
// pattern as recordQuizAttempt above.
export function getFinalExamState() {
  return cache.finalExam || { attempted: false, bestScore: 0, attempts: 0, passed: false, lastAttemptAt: null };
}

export function recordFinalExamAttempt(scorePercent, passed) {
  const existing = getFinalExamState();
  const justPassed = !existing.passed && !!passed;
  const optimistic = {
    attempted: true,
    passed: existing.passed || !!passed,
    bestScore: Math.max(existing.bestScore || 0, scorePercent),
    attempts: (existing.attempts || 0) + 1,
    lastAttemptAt: new Date().toISOString(),
    passedAt: existing.passedAt || (justPassed ? new Date().toISOString() : null),
  };
  cache.finalExam = optimistic;

  api
    .finalExamAttempt(scorePercent, passed)
    .then((res) => {
      if (res && res.examState) cache.finalExam = res.examState;
    })
    .catch((e) => {
      console.error("Failed to save final exam attempt to the server:", e);
    });

  return optimistic;
}
