// ============================================================================
// Generates an interactive, page-turning e-book edition of the handbook —
// same content as generate-handbook.mjs (straight from data.js/exam-data.js),
// laid out as individual "pages" and driven by the vendored StPageFlip
// library (assets/vendor/page-flip.browser.js) for a realistic page-curl
// animation. Fully self-contained single HTML file — open it in any browser,
// no server or internet connection needed.
//
// Usage:  node scripts/generate-flipbook.mjs
// Output: flipbook-en.html, flipbook-te.html  (in the project root)
// ============================================================================
import { readFileSync, writeFileSync } from "fs";
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

const FLIPBOOK_LABELS = {
  en: {
    prevPage: "Previous page",
    nextPage: "Next page",
    jumpTo: "Jump to…",
    coverLabel: "Cover",
    tocLabel: "Contents",
    answerKeyLabel: "Answer Key",
    glossaryLabel: "Glossary",
    helpText: "Click or drag a page corner to turn the page — or use the arrows / ← → keys.",
  },
  te: {
    prevPage: "మునుపటి పేజీ",
    nextPage: "తదుపరి పేజీ",
    jumpTo: "వెళ్లండి…",
    coverLabel: "కవర్",
    tocLabel: "విషయ సూచిక",
    answerKeyLabel: "సమాధాన కీ",
    glossaryLabel: "పదకోశం",
    helpText: "పేజీ తిప్పడానికి పేజీ మూలను క్లిక్ చేయండి లేదా లాగండి — లేదా బాణాలు / ← → కీలను ఉపయోగించండి.",
  },
};

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// Every flip-page gets a tiny running header so a reader can tell where they
// are while flipping through, since this is a reference book, not something
// read start-to-front in one sitting.
function pageShell(kicker, bodyHtml, extraClass = "") {
  return `<div class="page ${extraClass}"><div class="page-kicker">${kicker}</div><div class="page-body">${bodyHtml}</div></div>`;
}

function buildFlipbook(lang) {
  const L = LABELS[lang];
  const FL = FLIPBOOK_LABELS[lang];
  const logo = logoDataUri();
  const glossary = new Map();

  const pages = []; // { html, navLabel?, isNavTarget? }
  const navTargets = []; // { pageIndex, label }

  // ---- Cover (StPageFlip renders the first page as a standalone cover
  // when showCover:true) ----
  pages.push(`
    <div class="page page-cover" data-density="hard">
      <div class="cover-photo"><img src="${photoDataUri(COVER_PHOTO)}" alt="" /></div>
      <div class="cover-plate">
        <div class="cover-logo-badge"><img src="${logo}" alt="Shreeja" /></div>
        <h1 class="cover-title">${esc(L.bookTitle)}</h1>
        <div class="cover-subtitle">${esc(L.bookSubtitle)}</div>
        <div class="cover-edition-pill">${esc(L.edition)}</div>
        <div class="cover-tagline">${esc(L.tagline)}</div>
        <div class="cover-org">${esc(L.orgName)}</div>
      </div>
    </div>`);
  navTargets.push({ pageIndex: 0, label: FL.coverLabel });

  // ---- Table of contents (chunked, ~5 modules per page) ----
  const modules = MODULES.filter((m) => m.available);
  const tocChunks = chunk(modules, 5);
  tocChunks.forEach((group, ci) => {
    const body = group
      .map(
        (mod) => `
      <div class="toc-module">
        <div class="toc-module-badge">${mod.number}</div>
        <div>
          <div class="toc-module-title">${esc(pick(mod.title, lang))}</div>
          <div class="toc-lessons">${mod.lessons.map((l) => `<div class="toc-lesson">${esc(pick(l.title, lang))}</div>`).join("")}</div>
        </div>
      </div>`
      )
      .join("");
    pages.push(pageShell(esc(L.toc), `${ci === 0 ? `<h1 class="page-h1">${esc(L.toc)}</h1>` : ""}${body}`, "page-toc"));
    if (ci === 0) navTargets.push({ pageIndex: pages.length - 1, label: FL.tocLabel });
  });

  const answerKeyByModule = []; // { modTitle, pages: [ [entryHtml,...], ... ] }

  modules.forEach((mod) => {
    const modTitle = pick(mod.title, lang);
    const photo = MODULE_PHOTOS[mod.id];

    // Module intro page
    const photoHtml = photo
      ? `
      <div class="chapter-photo">
        <div class="chapter-photo-frame"><img src="${photoDataUri(photo.file)}" alt="" /></div>
        <div class="chapter-photo-caption">${esc(L[photo.captionKey])}</div>
      </div>`
      : "";
    pages.push(
      pageShell(
        `${esc(L.module)} ${mod.number}`,
        `
      <div class="chapter-kicker"><span class="chapter-kicker-badge">${mod.number}</span>${esc(L.module)} ${mod.number}</div>
      <h1 class="page-h1">${esc(modTitle)}</h1>
      <p class="chapter-subtitle">${esc(pick(mod.subtitle, lang))}</p>
      ${photoHtml}`,
        "page-module-intro"
      )
    );
    navTargets.push({ pageIndex: pages.length - 1, label: `${mod.number}. ${modTitle}` });

    const modAnswerEntries = [];

    mod.lessons.forEach((lesson, li) => {
      collectGlossary(lesson.hook, lang, glossary);

      // Lesson intro page (hook content)
      pages.push(
        pageShell(
          `${mod.number}.${li + 1} ${esc(pick(lesson.title, lang))}`,
          `<h2 class="page-h2">${mod.number}.${li + 1} ${esc(pick(lesson.title, lang))}</h2>${renderBlocks(lesson.hook, lang)}`
        )
      );

      // One page per topic
      (lesson.topics || []).forEach((topic) => {
        collectGlossary(topic.teach, lang, glossary);
        pages.push(
          pageShell(
            `${mod.number}.${li + 1} ${esc(pick(lesson.title, lang))}`,
            `<h3 class="page-h3">${esc(pick(topic.title, lang))}</h3>${renderBlocks(topic.teach, lang)}`
          )
        );
      });

      // Practice questions page(s) for this lesson
      const examQuestions = (lesson.finalQuiz && lesson.finalQuiz.questions) || [];
      if (examQuestions.length) {
        const qHtml = examQuestions.map((q, qi) => renderExerciseQuestion(q, qi + 1, lang, L)).join("");
        pages.push(
          pageShell(
            `${mod.number}.${li + 1} ${esc(pick(lesson.title, lang))}`,
            `
          <div class="practice-block">
            <h4 class="practice-title">📝 ${esc(L.practiceQuestions)}</h4>
            <p class="practice-hint">${esc(L.practiceQuestionsHint)}</p>
            ${qHtml}
          </div>`
          )
        );
        modAnswerEntries.push({
          lessonTitle: pick(lesson.title, lang),
          entries: examQuestions.map((q, qi) => renderAnswerEntry(q, qi + 1, lang, L)),
        });
      }
    });

    if (modAnswerEntries.length) answerKeyByModule.push({ modTitle, lessons: modAnswerEntries });
  });

  // ---- Answer Key (chunked so no page gets too tall) ----
  {
    let firstAnswerPage = null;
    answerKeyByModule.forEach((mod) => {
      mod.lessons.forEach((lesson) => {
        const entryChunks = chunk(lesson.entries, 6);
        entryChunks.forEach((group, gi) => {
          const heading = gi === 0 ? `<h4 class="answer-lesson-h">${esc(mod.modTitle)} — ${esc(lesson.lessonTitle)}</h4>` : "";
          pages.push(
            pageShell(
              esc(L.answerKeyTitle),
              `${firstAnswerPage === null ? `<h1 class="page-h1">${esc(L.answerKeyTitle)}</h1><p class="chapter-subtitle">${esc(L.answerKeyHint)}</p>` : ""}${heading}${group.join(
                ""
              )}`,
              "page-answer-key"
            )
          );
          if (firstAnswerPage === null) firstAnswerPage = pages.length - 1;
        });
      });
    });
    if (firstAnswerPage !== null) navTargets.push({ pageIndex: firstAnswerPage, label: FL.answerKeyLabel });
  }

  // ---- Glossary (chunked alphabetically) ----
  {
    const glossaryEntries = [...glossary.values()].sort((a, b) => a.term.localeCompare(b.term, lang));
    const glossaryChunks = chunk(glossaryEntries, 10);
    let firstGlossaryPage = null;
    glossaryChunks.forEach((group, gi) => {
      const body = group.map((g) => `<div class="glossary-entry"><strong>${esc(g.term)}</strong> — ${esc(g.meaning)}</div>`).join("");
      pages.push(
        pageShell(
          esc(L.glossaryTitle),
          `${gi === 0 ? `<h1 class="page-h1">${esc(L.glossaryTitle)}</h1><p class="chapter-subtitle">${esc(L.glossaryHint)}</p>` : ""}${body}${
            gi === glossaryChunks.length - 1 ? `<div class="footer-note">${esc(L.generatedNote)}</div>` : ""
          }`,
          "page-glossary"
        )
      );
      if (firstGlossaryPage === null) firstGlossaryPage = pages.length - 1;
    });
    if (firstGlossaryPage !== null) navTargets.push({ pageIndex: firstGlossaryPage, label: FL.glossaryLabel });
  }

  const pageFlipLib = readFileSync(join(ROOT, "assets/vendor/page-flip.browser.js"), "utf8");

  const navOptionsHtml = navTargets.map((t) => `<option value="${t.pageIndex}">${esc(t.label)}</option>`).join("");

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(L.bookTitle)} — ${esc(L.bookSubtitle)}</title>
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; height: 100%; background: #0f2d63; }
  body {
    font-family: "Noto Serif", "Noto Sans Telugu", Georgia, "Times New Roman", serif;
    color: #1a2233;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    background: radial-gradient(ellipse at center, #1e3a6e 0%, #0a1a3a 100%);
  }
  h1, h2, h3, h4, h5 { font-family: "Noto Sans", "Noto Sans Telugu", Arial, sans-serif; color: #0f2d63; }

  .topbar {
    flex: none; display: flex; align-items: center; gap: 14px; padding: 10px 18px;
    background: #0f2d63; color: white; position: relative; z-index: 10;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    font-family: "Noto Sans", "Noto Sans Telugu", Arial, sans-serif;
  }
  .topbar .brand { font-weight: 700; font-size: 14px; white-space: nowrap; }
  .topbar select {
    margin-left: auto; background: #16305e; color: white; border: 1px solid #3b5c94; border-radius: 6px;
    padding: 5px 8px; font-size: 12.5px; max-width: 46vw;
  }
  .topbar .help-text { font-size: 11px; color: #93c5fd; display: none; }
  @media (min-width: 720px) { .topbar .help-text { display: inline; } }

  .stage { flex: 1; display: flex; align-items: center; justify-content: center; padding: 18px; min-height: 0; position: relative; overflow: hidden; }
  #book { filter: drop-shadow(0 20px 40px rgba(0,0,0,0.45)); }

  .navbtn {
    position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%;
    background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.3); color: white; font-size: 20px;
    cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s;
    font-family: Arial, sans-serif;
  }
  .navbtn:hover { background: rgba(255,255,255,0.25); }
  .navbtn.prev { left: 12px; } .navbtn.next { right: 12px; }
  @media (max-width: 600px) { .navbtn { width: 36px; height: 36px; font-size: 16px; } }

  .pagecount {
    flex: none; text-align: center; color: #93c5fd; font-size: 11.5px; font-family: "Noto Sans", Arial, sans-serif;
    padding: 4px 0 10px;
  }

  /* ---- Individual page look ---- */
  .page {
    background: #fdfcf9; overflow: hidden; display: flex; flex-direction: column;
  }
  .page-kicker {
    flex: none; font-family: "Noto Sans", "Noto Sans Telugu", Arial, sans-serif; font-size: 9.5px; text-transform: uppercase;
    letter-spacing: 0.5px; color: #93a5c4; padding: 10px 16px 4px; border-bottom: 1px solid #eef1f6;
  }
  .page-body { flex: 1; min-height: 0; overflow-y: auto; padding: 10px 16px 16px; font-size: 12px; line-height: 1.5; }
  .page-body::-webkit-scrollbar { width: 5px; }
  .page-body::-webkit-scrollbar-thumb { background: #d7deea; border-radius: 3px; }

  .page-h1 { font-size: 21px; margin: 4px 0 8px; border-bottom: 3px solid #16a34a; display: inline-block; padding-bottom: 3px; }
  .page-h2 { font-size: 16px; color: white; background: #2563eb; padding: 5px 10px; border-radius: 5px; margin: 0 0 8px; }
  .page-h3 { font-size: 14px; color: #1e40af; border-left: 4px solid #93c5fd; padding-left: 8px; margin: 0 0 6px; }
  .chapter-subtitle { color: #1e40af; font-style: italic; font-size: 11.5px; margin-bottom: 10px; }

  .chapter-kicker { display: flex; align-items: center; gap: 6px; text-transform: uppercase; letter-spacing: 0.5px; font-size: 9.5px; color: #2563eb; font-weight: 700; background: #eff6ff; padding: 4px 10px; border-radius: 999px; width: fit-content; font-family: "Noto Sans", Arial, sans-serif; }
  .chapter-kicker-badge { width: 15px; height: 15px; border-radius: 50%; background: #2563eb; color: white; font-size: 9px; display: flex; align-items: center; justify-content: center; }
  .chapter-photo { margin: 10px 0; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 8px rgba(15,45,99,0.15); }
  .chapter-photo-frame { position: relative; width: 100%; aspect-ratio: 4 / 3; overflow: hidden; }
  .chapter-photo-frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 35%; }
  .chapter-photo-caption { background: #0f2d63; color: #dbeafe; font-size: 9px; padding: 5px 10px; font-family: "Noto Sans", Arial, sans-serif; }

  .toc-module { margin: 10px 0; display: flex; gap: 8px; }
  .toc-module-badge { flex: none; width: 19px; height: 19px; border-radius: 50%; background: #2563eb; color: white; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-top: 1px; font-family: "Noto Sans", Arial, sans-serif; }
  .toc-module-title { font-weight: 700; font-size: 12.5px; color: #0f2d63; }
  .toc-lessons { color: #4b5563; font-size: 10.5px; }
  .toc-lesson { padding: 1px 0; }

  .blk { margin: 8px 0; }
  .blk h4, .blk h5 { font-size: 11.5px; margin: 0 0 2px; }
  .blk p, .blk .body { margin: 2px 0; }
  .blk.callout, .blk.example, .blk.glossary { border-left: 3px solid #2563eb; background: #eff6ff; padding: 6px 10px; border-radius: 4px; }
  .blk.callout.tip { border-left-color: #16a34a; background: #f0fdf4; }
  .blk.callout.warning { border-left-color: #d97706; background: #fffbeb; }
  .blk.example { border-left-color: #7c3aed; background: #f5f3ff; }
  .blk.glossary { border-left-color: #0f2d63; background: #f0f4fa; }
  .ledger-table, .chart-table { width: 100%; border-collapse: collapse; font-size: 10.5px; margin-top: 3px; border-radius: 4px; overflow: hidden; }
  .ledger-table tr:nth-child(even) td, .chart-table tr:nth-child(even) td { background: #eff6ff; }
  .ledger-table td, .chart-table td { padding: 3px 6px; border-bottom: 1px solid #e5e7eb; }
  .ledger-table .amt, .chart-table .amt { text-align: right; font-variant-numeric: tabular-nums; }
  .ledger-table .total td { font-weight: 700; background: #0f2d63 !important; color: white; }
  .tl-item { display: flex; align-items: center; gap: 8px; padding: 2px 0; font-size: 10.5px; }
  .tl-year { font-weight: 700; color: white; background: #2563eb; border-radius: 999px; padding: 1px 8px; min-width: 44px; text-align: center; font-size: 9.5px; }
  .tl-result { margin-top: 4px; font-weight: 700; color: #16a34a; }
  .poll-q { margin: 6px 0; font-size: 10.5px; }
  .poll-q .opts { margin: 3px 0; padding-left: 16px; }
  .poll-q .opts li.correct { font-weight: 700; color: #16a34a; }
  .poll-q .reveal { color: #4b5563; font-style: italic; }

  .practice-block { margin-top: 6px; border-radius: 6px; overflow: hidden; border: 1px solid #bfdbfe; }
  .practice-title { margin: 0; background: #2563eb; color: white; padding: 6px 12px; font-size: 12.5px; }
  .practice-hint { font-size: 9.5px; color: #4b5563; margin: 0; padding: 6px 12px 0; }
  .exercise { margin: 8px 0; font-size: 11px; padding: 0 12px; }
  .exercise:last-child { padding-bottom: 10px; }
  .exercise .eq { font-weight: 600; margin-bottom: 2px; }
  .exercise .qnum { color: #2563eb; }
  .exercise ol { margin: 2px 0 0 18px; padding: 0; }

  .answer-lesson-h { font-size: 11.5px; color: white; background: #0f2d63; padding: 4px 8px; border-radius: 4px; margin: 10px 0 4px; }
  .answer-entry { font-size: 10.5px; margin: 5px 0; }
  .answer-entry .qnum { color: white; background: #2563eb; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; font-size: 9px; font-weight: 700; }
  .answer-entry .exp { color: #4b5563; }

  .glossary-entry { font-size: 11px; margin: 5px 0; padding: 3px 6px; border-radius: 3px; }
  .glossary-entry:nth-child(even) { background: #f8fafc; }
  .footer-note { margin-top: 20px; font-size: 9px; color: #9ca3af; text-align: center; }

  /* ---- Cover page ---- */
  .page-cover { position: relative; padding: 0; }
  .cover-photo { position: absolute; inset: 0; }
  .cover-photo img { width: 100%; height: 62%; object-fit: cover; object-position: center 30%; display: block; }
  .cover-photo::after {
    content: ""; position: absolute; left: 0; right: 0; top: 46%; height: 20%;
    background: linear-gradient(to bottom, rgba(15,45,99,0) 0%, #0f2d63 100%);
  }
  .cover-plate { position: absolute; left: 0; right: 0; top: 62%; bottom: 0; background: #0f2d63; text-align: center; padding: 16px 14px 0; }
  .cover-logo-badge { position: absolute; top: -34px; left: 50%; transform: translateX(-50%); width: 68px; height: 68px; border-radius: 50%; background: white; box-shadow: 0 4px 14px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; }
  .cover-logo-badge img { width: 54px; }
  .cover-title { color: white; font-size: 19px; margin: 36px 0 3px; font-family: "Noto Sans", "Noto Sans Telugu", Arial, sans-serif; font-weight: 700; }
  .cover-subtitle { color: #93c5fd; font-size: 12px; margin: 0 0 10px; font-family: "Noto Sans", Arial, sans-serif; }
  .cover-edition-pill { display: inline-block; background: #16a34a; color: white; font-size: 9.5px; font-weight: 700; padding: 3px 12px; border-radius: 999px; letter-spacing: 0.5px; font-family: "Noto Sans", Arial, sans-serif; }
  .cover-tagline { color: #dbeafe; font-size: 10px; max-width: 260px; margin: 10px auto 0; }
  .cover-org { position: absolute; bottom: 10px; left: 0; right: 0; color: #60a5fa; font-size: 9px; }
</style>
</head>
<body>
  <div class="topbar">
    <span class="brand">📖 ${esc(L.bookTitle)}</span>
    <span class="help-text">${esc(FL.helpText)}</span>
    <select id="jump-select" aria-label="${esc(FL.jumpTo)}">
      <option value="">${esc(FL.jumpTo)}</option>
      ${navOptionsHtml}
    </select>
  </div>
  <div class="stage">
    <button class="navbtn prev" id="prev-btn" aria-label="${esc(FL.prevPage)}">‹</button>
    <div id="book">
      ${pages.join("")}
    </div>
    <button class="navbtn next" id="next-btn" aria-label="${esc(FL.nextPage)}">›</button>
  </div>
  <div class="pagecount" id="pagecount"></div>

<script>${pageFlipLib}</script>
<script>
  const book = document.getElementById("book");
  const pageFlip = new St.PageFlip(book, {
    width: 420,
    height: 560,
    size: "stretch",
    minWidth: 260,
    maxWidth: 560,
    minHeight: 360,
    maxHeight: 760,
    maxShadowOpacity: 0.5,
    showCover: true,
    mobileScrollSupport: false,
    useMouseEvents: true,
  });
  pageFlip.loadFromHTML(document.querySelectorAll("#book .page"));

  const pagecountEl = document.getElementById("pagecount");
  function updateCount() {
    pagecountEl.textContent = (pageFlip.getCurrentPageIndex() + 1) + " / " + pageFlip.getPageCount();
  }
  updateCount();
  pageFlip.on("flip", updateCount);

  document.getElementById("prev-btn").addEventListener("click", () => pageFlip.flipPrev());
  document.getElementById("next-btn").addEventListener("click", () => pageFlip.flipNext());
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") pageFlip.flipPrev();
    if (e.key === "ArrowRight") pageFlip.flipNext();
  });
  document.getElementById("jump-select").addEventListener("change", (e) => {
    const idx = parseInt(e.target.value, 10);
    if (!isNaN(idx)) pageFlip.turnToPage(idx);
    e.target.value = "";
  });
</script>
</body>
</html>`;
}

for (const lang of LANGS) {
  const html = buildFlipbook(lang);
  const outPath = join(ROOT, `flipbook-${lang}.html`);
  writeFileSync(outPath, html, "utf8");
  console.log(`Wrote ${outPath} (${(html.length / 1024).toFixed(0)} KB)`);
}
