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
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { MODULES } from "../data.js";
import { FINAL_EXAM_QUESTIONS } from "../exam-data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const LANGS = ["en", "te"];

const LABELS = {
  en: {
    bookTitle: "Shreeja Learning Academy",
    bookSubtitle: "Training Handbook",
    edition: "English Edition",
    tagline: "A reference guide for Shreeja Sahayaks and field staff",
    orgName: "Shreeja Mahila Milk Producer Company",
    toc: "Table of Contents",
    module: "Module",
    practiceQuestions: "Practice Questions",
    practiceQuestionsHint: "Try these on your own, then check your answers in the Answer Key at the back of this book.",
    answerKeyTitle: "Answer Key",
    answerKeyHint: "Answers and explanations for every practice question, organized by module and lesson.",
    glossaryTitle: "Glossary",
    glossaryHint: "Key terms used throughout this handbook, in one place for quick reference.",
    trueLabel: "True",
    falseLabel: "False",
    answerWord: "Answer",
    explanationWord: "Explanation",
    generatedNote: "Generated from the Shreeja Learning Academy course content.",
  },
  te: {
    bookTitle: "శ్రీజ లెర్నింగ్ అకాడమీ",
    bookSubtitle: "శిక్షణ చేతిపుస్తకం",
    edition: "తెలుగు ఎడిషన్",
    tagline: "శ్రీజ సహాయక్‌లు మరియు ఫీల్డ్ సిబ్బంది కోసం ఒక సూచన గైడ్",
    orgName: "శ్రీజ మహిళా మిల్క్ ప్రొడ్యూసర్ కంపెనీ",
    toc: "విషయ సూచిక",
    module: "మాడ్యూల్",
    practiceQuestions: "అభ్యాస ప్రశ్నలు",
    practiceQuestionsHint: "వీటిని మీరే ప్రయత్నించండి, తర్వాత ఈ పుస్తకం చివరిలో ఉన్న సమాధాన కీలో మీ సమాధానాలను తనిఖీ చేసుకోండి.",
    answerKeyTitle: "సమాధాన కీ",
    answerKeyHint: "మాడ్యూల్, పాఠం వారీగా ప్రతి అభ్యాస ప్రశ్నకు సమాధానాలు, వివరణలు.",
    glossaryTitle: "పదకోశం",
    glossaryHint: "త్వరిత సూచన కోసం ఈ చేతిపుస్తకం అంతటా ఉపయోగించిన కీలక పదాలు, ఒకే చోట.",
    trueLabel: "నిజం",
    falseLabel: "అబద్ధం",
    answerWord: "సమాధానం",
    explanationWord: "వివరణ",
    generatedNote: "శ్రీజ లెర్నింగ్ అకాడమీ కోర్సు కంటెంట్ నుండి రూపొందించబడింది.",
  },
};

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function pick(field, lang) {
  if (!field) return "";
  return field[lang] ?? field.en ?? "";
}

function logoDataUri() {
  const buf = readFileSync(join(ROOT, "assets/shreeja-logo.png"));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

const CALLOUT_EMOJI = { info: "💡", tip: "✅", warning: "⚠️" };

function renderBlock(block, lang) {
  const p = (f) => esc(pick(f, lang));
  const raw = (f) => pick(f, lang);
  switch (block.type) {
    case "hero":
      return `<div class="blk hero"><h3>${p(block.heading)}</h3><p>${p(block.text)}</p></div>`;
    case "text":
      return `<div class="blk text"><h4>${p(block.heading)}</h4><div class="body">${raw(block.html)}</div></div>`;
    case "callout": {
      const emoji = CALLOUT_EMOJI[block.style] || "💡";
      return `<div class="blk callout ${esc(block.style || "")}"><h5>${emoji} ${p(block.heading)}</h5><p>${p(block.text)}</p></div>`;
    }
    case "example":
      return `<div class="blk example"><h5>🌟 ${p(block.heading)}</h5><p>${p(block.text)}</p></div>`;
    case "glossary":
      return `<div class="blk glossary"><h5>📖 ${p(block.term)}</h5><p>${p(block.meaning)}</p></div>`;
    case "ledger": {
      const rows = block.rows.map((r) => `<tr><td>${p(r.label)}</td><td class="amt">${esc(r.amount)}</td></tr>`).join("");
      return `<div class="blk ledger"><h5>💰 ${p(block.heading)}</h5><table class="ledger-table">${rows}<tr class="total"><td>${p(
        block.total.label
      )}</td><td class="amt">${esc(block.total.amount)}</td></tr></table></div>`;
    }
    case "barchart": {
      const rows = block.data
        .map((d) => `<tr><td>${d.flag ? d.flag + " " : ""}${p(d.label)}</td><td class="amt">${esc(d.value)} ${p(block.unit)}</td></tr>`)
        .join("");
      return `<div class="blk chart"><h5>📊 ${p(block.heading)}</h5><div class="src">${p(block.source)}</div><table class="chart-table">${rows}</table></div>`;
    }
    case "timeline": {
      const items = block.items.map((it) => `<div class="tl-item"><span class="tl-year">${esc(it.year)}</span><span class="tl-text">${p(it.text)}</span></div>`).join("");
      return `<div class="blk timeline"><h5>🕰️ ${p(block.heading)}</h5>${items}${block.result ? `<div class="tl-result">🏁 ${p(block.result)}</div>` : ""}</div>`;
    }
    case "poll": {
      const qs = block.questions
        .map((q, qi) => {
          const opts = q.options.map((o, i) => `<li${i === q.answer ? ' class="correct"' : ""}>${p(o)}</li>`).join("");
          return `<div class="poll-q"><div class="q">${qi + 1}. ${p(q.q)}</div><ul class="opts">${opts}</ul><div class="reveal">${p(q.reveal)}</div></div>`;
        })
        .join("");
      return `<div class="blk poll"><h5>🤔 ${p(block.heading)}</h5>${qs}</div>`;
    }
    default:
      return "";
  }
}

function renderBlocks(blocks, lang) {
  return (blocks || []).map((b) => renderBlock(b, lang)).join("");
}

// Collect glossary terms as we walk the content, for the consolidated
// glossary appendix at the back of the book.
function collectGlossary(blocks, lang, out) {
  (blocks || []).forEach((b) => {
    if (b.type === "glossary") {
      const term = pick(b.term, lang);
      if (!out.has(term.toLowerCase())) {
        out.set(term.toLowerCase(), { term, meaning: pick(b.meaning, lang) });
      }
    }
  });
}

function renderExerciseQuestion(q, idx, lang, L) {
  const isTF = q.type === "truefalse";
  const optionsHtml = isTF
    ? `<ol type="A"><li>${esc(L.trueLabel)}</li><li>${esc(L.falseLabel)}</li></ol>`
    : `<ol type="A">${q.options.map((o) => `<li>${esc(pick(o, lang))}</li>`).join("")}</ol>`;
  return `<div class="exercise"><div class="eq"><span class="qnum">${idx}.</span> ${esc(pick(q.q, lang))}</div>${optionsHtml}</div>`;
}

function renderAnswerEntry(q, idx, lang, L) {
  const isTF = q.type === "truefalse";
  const answerText = isTF ? (q.answer ? L.trueLabel : L.falseLabel) : esc(pick(q.options[q.answer], lang));
  return `<div class="answer-entry"><span class="qnum">${idx}.</span> <strong>${esc(L.answerWord)}: ${answerText}.</strong> <span class="exp">${esc(pick(q.explain, lang))}</span></div>`;
}

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

    chapters.push(`
      <div class="chapter" id="${esc(mod.id)}">
        <div class="chapter-kicker">${esc(L.module)} ${mod.number}</div>
        <h1>${esc(modTitle)}</h1>
        <p class="chapter-subtitle">${esc(pick(mod.subtitle, lang))}</p>
        ${lessonSections}
      </div>`);
  });

  const tocHtml = tocItems
    .map(
      (item) => `
      <div class="toc-module">
        <div class="toc-module-title"><a href="#m${item.n}">${L.module} ${item.n}: ${esc(item.title)}</a></div>
        <div class="toc-lessons">${item.lessons.map((t) => `<div class="toc-lesson">${esc(t)}</div>`).join("")}</div>
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
  * { box-sizing: border-box; }
  body {
    font-family: "Noto Serif", "Noto Sans Telugu", Georgia, "Times New Roman", serif;
    color: #1a2233;
    line-height: 1.55;
    font-size: 12.5px;
    margin: 0;
  }
  h1, h2, h3, h4, h5 { font-family: "Noto Sans", "Noto Sans Telugu", Arial, sans-serif; color: #0f2d63; }
  .cover { text-align: center; padding-top: 90px; page-break-after: always; }
  .cover img { width: 220px; margin-bottom: 30px; }
  .cover h1 { font-size: 34px; margin: 0 0 6px; }
  .cover h2 { font-size: 20px; font-weight: 400; color: #2563eb; margin: 0 0 40px; }
  .cover .edition { font-size: 16px; color: #374151; margin-bottom: 10px; }
  .cover .tagline { font-size: 13px; color: #6b7280; max-width: 380px; margin: 0 auto 60px; }
  .cover .org { font-size: 12px; color: #9ca3af; margin-top: 100px; }
  .toc-page { page-break-after: always; }
  .toc-page h1 { font-size: 24px; border-bottom: 2px solid #0f2d63; padding-bottom: 8px; }
  .toc-module { margin: 14px 0; }
  .toc-module-title { font-weight: 700; font-size: 14px; }
  .toc-module-title a { color: #0f2d63; text-decoration: none; }
  .toc-lessons { margin-left: 16px; color: #4b5563; font-size: 11.5px; }
  .toc-lesson { padding: 1px 0; }
  .chapter { page-break-before: always; }
  .chapter-kicker { text-transform: uppercase; letter-spacing: 1px; font-size: 11px; color: #2563eb; font-weight: 700; }
  .chapter h1 { font-size: 26px; margin: 2px 0 6px; }
  .chapter-subtitle { color: #4b5563; font-size: 13px; margin-bottom: 20px; }
  .lesson { margin-top: 26px; }
  .lesson h2 { font-size: 18px; border-bottom: 1px solid #dbeafe; padding-bottom: 6px; }
  .topic { margin: 14px 0; }
  .topic h3 { font-size: 14.5px; color: #1e40af; }
  .blk { margin: 10px 0; }
  .blk h4, .blk h5 { font-size: 12.5px; margin: 0 0 3px; }
  .blk p, .blk .body { margin: 2px 0; }
  .blk.callout, .blk.example, .blk.glossary { border-left: 3px solid #2563eb; background: #f8fafc; padding: 8px 12px; border-radius: 4px; }
  .blk.callout.tip { border-left-color: #16a34a; }
  .blk.callout.warning { border-left-color: #d97706; }
  .blk.glossary { border-left-color: #6b7280; background: #f3f4f6; }
  .ledger-table, .chart-table { width: 100%; border-collapse: collapse; font-size: 11.5px; margin-top: 4px; }
  .ledger-table td, .chart-table td { padding: 3px 6px; border-bottom: 1px solid #e5e7eb; }
  .ledger-table .amt, .chart-table .amt { text-align: right; font-variant-numeric: tabular-nums; }
  .ledger-table .total td { font-weight: 700; border-top: 2px solid #0f2d63; border-bottom: none; }
  .tl-item { display: flex; gap: 10px; padding: 3px 0; font-size: 11.5px; }
  .tl-year { font-weight: 700; color: #0f2d63; min-width: 70px; }
  .tl-result { margin-top: 6px; font-weight: 700; color: #16a34a; }
  .poll-q { margin: 8px 0; font-size: 11.5px; }
  .poll-q .opts { margin: 4px 0; padding-left: 18px; }
  .poll-q .opts li.correct { font-weight: 700; color: #16a34a; }
  .poll-q .reveal { color: #4b5563; font-style: italic; }
  .practice-block { margin-top: 20px; padding: 12px 14px; background: #eff6ff; border-radius: 6px; }
  .practice-title { margin: 0 0 2px; }
  .practice-hint { font-size: 11px; color: #4b5563; margin: 0 0 10px; }
  .exercise { margin: 10px 0; font-size: 12px; }
  .exercise .eq { font-weight: 600; margin-bottom: 3px; }
  .exercise .qnum { color: #2563eb; }
  .exercise ol { margin: 2px 0 0 20px; padding: 0; }
  .answer-key-page .qnum { color: #2563eb; font-weight: 700; }
  .answer-lesson { margin: 16px 0; }
  .answer-lesson h4 { font-size: 13px; border-bottom: 1px solid #dbeafe; padding-bottom: 4px; }
  .answer-entry { font-size: 11.5px; margin: 6px 0; }
  .answer-entry .exp { color: #4b5563; }
  .glossary-page .glossary-entry { font-size: 12px; margin: 6px 0; }
  .footer-note { margin-top: 40px; font-size: 10px; color: #9ca3af; text-align: center; }
</style>
</head>
<body>

  <div class="cover">
    <img src="${logo}" alt="Shreeja" />
    <h1>${esc(L.bookTitle)}</h1>
    <h2>${esc(L.bookSubtitle)}</h2>
    <div class="edition">${esc(L.edition)}</div>
    <div class="tagline">${esc(L.tagline)}</div>
    <div class="org">${esc(L.orgName)}</div>
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
