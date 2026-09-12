// ============================================================================
// Generates a printable NCERT-style handbook (one HTML file per language)
// straight from the live course content in data.js and exam-data.js — so the
// handbook can be regenerated any time module content changes, instead of
// being hand-maintained as a separate document.
//
// Usage:  node scripts/generate-handbook.mjs
// Output: handbook-en.html, handbook-te.html  (in the project root)
// Then convert each to PDF separately (see scripts/html-to-pdf.mjs).
// ============================================================================
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { MODULES } from "../data.js";
import {
  LABELS,
  COVER_PHOTO,
  MODULE_PHOTOS,
  esc,
  pick,
  makeAssetLoaders,
  renderBlocks,
  collectGlossary,
  renderExerciseQuestion,
  renderAnswerEntry,
} from "./handbook-shared.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const LANGS = ["en", "te"];

const { logoDataUri, photoDataUri } = makeAssetLoaders(ROOT);

function buildBook(lang) {
  const L = LABELS[lang];
  const logo = logoDataUri();
  const glossary = new Map();

  const tocItems = [];
  const chapters = [];
  const answerKeyChapters = [];

  MODULES.filter((m) => m.available).forEach((mod) => {
    const modTitle = pick(mod.title, lang);
    tocItems.push({ n: mod.number, title: modTitle, lessons: mod.lessons.map((l) => pick(l.title, lang)) });

    const lessonSections = mod.lessons
      .map((lesson, li) => {
        collectGlossary(lesson.hook, lang, glossary);
        const hookHtml = renderBlocks(lesson.hook, lang);
        const topicsHtml = (lesson.topics || [])
          .map((topic) => {
            collectGlossary(topic.teach, lang, glossary);
            return `
            <div class="topic">
              <h3>${esc(pick(topic.title, lang))}</h3>
              ${renderBlocks(topic.teach, lang)}
            </div>`;
          })
          .join("");

        const examQuestions = (lesson.finalQuiz && lesson.finalQuiz.questions) || [];
        const exercisesHtml = examQuestions.length
          ? `
          <div class="practice-block">
            <h4 class="practice-title">📝 ${esc(L.practiceQuestions)}</h4>
            <p class="practice-hint">${esc(L.practiceQuestionsHint)}</p>
            ${examQuestions.map((q, qi) => renderExerciseQuestion(q, qi + 1, lang, L)).join("")}
          </div>`
          : "";

        if (examQuestions.length) {
          answerKeyChapters.push({
            modTitle,
            lessonTitle: pick(lesson.title, lang),
            entries: examQuestions.map((q, qi) => renderAnswerEntry(q, qi + 1, lang, L)),
          });
        }

        return `
        <div class="lesson" id="${esc(lesson.id)}">
          <h2>${mod.number}.${li + 1} ${esc(pick(lesson.title, lang))}</h2>
          ${hookHtml}
          ${topicsHtml}
          ${exercisesHtml}
        </div>`;
      })
      .join("");

    const photo = MODULE_PHOTOS[mod.id];
    const photoHtml = photo
      ? `
      <div class="chapter-photo">
        <div class="chapter-photo-frame"><img src="${photoDataUri(photo.file)}" alt="" /></div>
        <div class="chapter-photo-caption">${esc(L[photo.captionKey])}</div>
      </div>`
      : "";

    chapters.push(`
      <div class="chapter" id="${esc(mod.id)}">
        <div class="chapter-kicker"><span class="chapter-kicker-badge">${mod.number}</span>${esc(L.module)} ${mod.number}</div>
        <h1>${esc(modTitle)}</h1>
        <p class="chapter-subtitle">${esc(pick(mod.subtitle, lang))}</p>
        ${photoHtml}
        ${lessonSections}
      </div>`);
  });

  const tocHtml = tocItems
    .map(
      (item) => `
      <div class="toc-module">
        <div class="toc-module-badge">${item.n}</div>
        <div>
          <div class="toc-module-title"><a href="#m${item.n}">${esc(item.title)}</a></div>
          <div class="toc-lessons">${item.lessons.map((t) => `<div class="toc-lesson">${esc(t)}</div>`).join("")}</div>
        </div>
      </div>`
    )
    .join("");

  const answerKeyHtml = answerKeyChapters
    .map(
      (ch) => `
      <div class="answer-lesson">
        <h4>${esc(ch.modTitle)} — ${esc(ch.lessonTitle)}</h4>
        ${ch.entries.join("")}
      </div>`
    )
    .join("");

  const glossaryEntries = [...glossary.values()].sort((a, b) => a.term.localeCompare(b.term, lang));
  const glossaryHtml = glossaryEntries
    .map((g) => `<div class="glossary-entry"><strong>${esc(g.term)}</strong> — ${esc(g.meaning)}</div>`)
    .join("");

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="UTF-8" />
<title>${esc(L.bookTitle)} — ${esc(L.bookSubtitle)}</title>
<style>
  @page { size: A4; margin: 22mm 18mm; }
  @page :first { margin: 0; }
  * { box-sizing: border-box; }
  body {
    font-family: "Noto Serif", "Noto Sans Telugu", Georgia, "Times New Roman", serif;
    color: #1a2233;
    line-height: 1.55;
    font-size: 12.5px;
    margin: 0;
  }
  h1, h2, h3, h4, h5 { font-family: "Noto Sans", "Noto Sans Telugu", Arial, sans-serif; color: #0f2d63; }

  /* ---- Cover: full-bleed photo + colour-block title plate ---- */
  .cover { position: relative; margin: 0; padding: 0; page-break-after: always; width: 210mm; height: 297mm; overflow: hidden; }
  .cover-photo { position: absolute; inset: 0; }
  .cover-photo img { width: 100%; height: 65%; object-fit: cover; object-position: center 30%; display: block; }
  .cover-photo::after {
    content: ""; position: absolute; left: 0; right: 0; top: 48%; height: 20%;
    background: linear-gradient(to bottom, rgba(15,45,99,0) 0%, #0f2d63 100%);
  }
  .cover-plate { position: absolute; left: 0; right: 0; top: 65%; bottom: 0; background: #0f2d63; text-align: center; padding: 26px 30px 0; }
  .cover-logo-badge { position: absolute; top: -46px; left: 50%; transform: translateX(-50%); width: 92px; height: 92px; border-radius: 50%; background: white; box-shadow: 0 4px 14px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; }
  .cover-logo-badge img { width: 72px; }
  h1.cover-title { color: white; font-size: 30px; margin: 46px 0 4px; }
  .cover-subtitle { color: #93c5fd; font-size: 17px; font-weight: 400; margin: 0 0 16px; }
  .cover-edition-pill { display: inline-block; background: #16a34a; color: white; font-size: 12px; font-weight: 700; padding: 5px 16px; border-radius: 999px; letter-spacing: 0.5px; }
  .cover-tagline { color: #dbeafe; font-size: 12.5px; max-width: 360px; margin: 16px auto 0; }
  .cover-org { position: absolute; bottom: 20px; left: 0; right: 0; color: #60a5fa; font-size: 11px; }

  .toc-page { page-break-after: always; }
  .toc-page h1 { font-size: 24px; border-bottom: 3px solid #16a34a; padding-bottom: 8px; }
  .toc-module { margin: 14px 0; display: flex; gap: 10px; }
  .toc-module-badge { flex: none; width: 24px; height: 24px; border-radius: 50%; background: #2563eb; color: white; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-top: 1px; }
  .toc-module-title { font-weight: 700; font-size: 14px; }
  .toc-module-title a { color: #0f2d63; text-decoration: none; }
  .toc-lessons { margin-left: 0; color: #4b5563; font-size: 11.5px; }
  .toc-lesson { padding: 1px 0; }

  .chapter { page-break-before: always; }
  .chapter-kicker { display: flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 1px; font-size: 11px; color: #2563eb; font-weight: 700; background: #eff6ff; padding: 6px 12px; border-radius: 999px; width: fit-content; }
  .chapter-kicker-badge { width: 20px; height: 20px; border-radius: 50%; background: #2563eb; color: white; font-size: 11px; display: flex; align-items: center; justify-content: center; }
  .chapter h1 { font-size: 26px; margin: 8px 0 6px; border-bottom: 3px solid #16a34a; display: inline-block; padding-bottom: 4px; }
  .chapter-subtitle { color: #1e40af; font-style: italic; font-size: 13px; margin-bottom: 16px; }
  .chapter-photo { margin: 6px 0 22px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(15,45,99,0.15); }
  .chapter-photo-frame { position: relative; width: 100%; aspect-ratio: 16 / 7; overflow: hidden; }
  .chapter-photo-frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 35%; display: block; }
  .chapter-photo-caption { background: #0f2d63; color: #dbeafe; font-size: 10.5px; padding: 6px 12px; font-family: "Noto Sans", "Noto Sans Telugu", Arial, sans-serif; }

  .lesson { margin-top: 26px; }
  .lesson h2 { font-size: 18px; color: white; background: #2563eb; padding: 6px 12px; border-radius: 5px; }
  .topic { margin: 14px 0; }
  .topic h3 { font-size: 14.5px; color: #1e40af; border-left: 4px solid #93c5fd; padding-left: 8px; }
  .blk { margin: 10px 0; }
  .blk h4, .blk h5 { font-size: 12.5px; margin: 0 0 3px; }
  .blk p, .blk .body { margin: 2px 0; }
  .blk.callout, .blk.example, .blk.glossary { border-left: 4px solid #2563eb; background: #eff6ff; padding: 8px 12px; border-radius: 4px; }
  .blk.callout.tip { border-left-color: #16a34a; background: #f0fdf4; }
  .blk.callout.warning { border-left-color: #d97706; background: #fffbeb; }
  .blk.example { border-left-color: #7c3aed; background: #f5f3ff; }
  .blk.glossary { border-left-color: #0f2d63; background: #f0f4fa; }
  .ledger-table, .chart-table { width: 100%; border-collapse: collapse; font-size: 11.5px; margin-top: 4px; border-radius: 4px; overflow: hidden; }
  .ledger-table tr:nth-child(even) td, .chart-table tr:nth-child(even) td { background: #eff6ff; }
  .ledger-table td, .chart-table td { padding: 4px 8px; border-bottom: 1px solid #e5e7eb; }
  .ledger-table .amt, .chart-table .amt { text-align: right; font-variant-numeric: tabular-nums; }
  .ledger-table .total td { font-weight: 700; background: #0f2d63 !important; color: white; border-top: none; border-bottom: none; }
  .tl-item { display: flex; align-items: center; gap: 10px; padding: 3px 0; font-size: 11.5px; }
  .tl-year { font-weight: 700; color: white; background: #2563eb; border-radius: 999px; padding: 2px 10px; min-width: 54px; text-align: center; }
  .tl-result { margin-top: 6px; font-weight: 700; color: #16a34a; }
  .poll-q { margin: 8px 0; font-size: 11.5px; }
  .poll-q .opts { margin: 4px 0; padding-left: 18px; }
  .poll-q .opts li.correct { font-weight: 700; color: #16a34a; }
  .poll-q .reveal { color: #4b5563; font-style: italic; }
  .practice-block { margin-top: 20px; border-radius: 6px; overflow: hidden; border: 1px solid #bfdbfe; }
  .practice-title { margin: 0; background: #2563eb; color: white; padding: 8px 14px; }
  .practice-hint { font-size: 11px; color: #4b5563; margin: 0; padding: 8px 14px 0; }
  .exercise { margin: 10px 0; font-size: 12px; padding: 0 14px; }
  .exercise:last-child { padding-bottom: 12px; }
  .exercise .eq { font-weight: 600; margin-bottom: 3px; }
  .exercise .qnum { color: #2563eb; }
  .exercise ol { margin: 2px 0 0 20px; padding: 0; }
  .answer-key-page .qnum { color: white; background: #2563eb; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; font-size: 10px; font-weight: 700; }
  .answer-lesson { margin: 16px 0; }
  .answer-lesson h4 { font-size: 13px; color: white; background: #0f2d63; padding: 5px 10px; border-radius: 4px; }
  .answer-entry { font-size: 11.5px; margin: 6px 0; }
  .answer-entry .exp { color: #4b5563; }
  .glossary-page .glossary-entry { font-size: 12px; margin: 6px 0; padding: 4px 8px; border-radius: 3px; }
  .glossary-page .glossary-entry:nth-child(even) { background: #f8fafc; }
  .footer-note { margin-top: 40px; font-size: 10px; color: #9ca3af; text-align: center; }
</style>
</head>
<body>

  <div class="cover">
    <div class="cover-photo"><img src="${photoDataUri(COVER_PHOTO)}" alt="" /></div>
    <div class="cover-plate">
      <div class="cover-logo-badge"><img src="${logo}" alt="Shreeja" /></div>
      <h1 class="cover-title">${esc(L.bookTitle)}</h1>
      <div class="cover-subtitle">${esc(L.bookSubtitle)}</div>
      <div class="cover-edition-pill">${esc(L.edition)}</div>
      <div class="cover-tagline">${esc(L.tagline)}</div>
      <div class="cover-org">${esc(L.orgName)}</div>
    </div>
  </div>

  <div class="toc-page">
    <h1>${esc(L.toc)}</h1>
    ${tocHtml}
  </div>

  ${chapters.join("")}

  <div class="chapter answer-key-page" id="answer-key">
    <div class="chapter-kicker">${esc(L.bookSubtitle)}</div>
    <h1>${esc(L.answerKeyTitle)}</h1>
    <p class="chapter-subtitle">${esc(L.answerKeyHint)}</p>
    ${answerKeyHtml}
  </div>

  <div class="chapter glossary-page" id="glossary">
    <div class="chapter-kicker">${esc(L.bookSubtitle)}</div>
    <h1>${esc(L.glossaryTitle)}</h1>
    <p class="chapter-subtitle">${esc(L.glossaryHint)}</p>
    ${glossaryHtml}
    <div class="footer-note">${esc(L.generatedNote)}</div>
  </div>

</body>
</html>`;
}

for (const lang of LANGS) {
  const html = buildBook(lang);
  const outPath = join(ROOT, `handbook-${lang}.html`);
  writeFileSync(outPath, html, "utf8");
  console.log(`Wrote ${outPath} (${(html.length / 1024).toFixed(0)} KB)`);
}
