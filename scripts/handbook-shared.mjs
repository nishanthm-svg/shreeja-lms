// ============================================================================
// Shared content-rendering helpers used by BOTH handbook generators:
//   - generate-handbook.mjs  (printable PDF edition)
//   - generate-flipbook.mjs  (interactive page-turning e-book edition)
// Keeping this in one place means both editions always render data.js's
// content blocks (text, glossary, examples, callouts, ledgers, bar charts,
// timelines, polls) identically — no drift between the two formats.
// ============================================================================
import { readFileSync } from "fs";
import { join } from "path";

export const LABELS = {
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
    photoCaptionFeeding: "A Shreeja farmer feeding her buffalo — good daily care is where quality milk starts.",
    photoCaptionMPP: "A Shreeja Milk Pooling Point — where farmers bring their milk every day, and where this course begins.",
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
    photoCaptionFeeding: "తన గేదెకు మేత పెడుతున్న శ్రీజ రైతు — నాణ్యమైన పాలు మంచి రోజువారీ సంరక్షణ నుండే మొదలవుతాయి.",
    photoCaptionMPP: "ఒక శ్రీజ పాల సేకరణ కేంద్రం — ప్రతిరోజూ రైతులు తమ పాలను తీసుకువచ్చే చోటు, ఈ కోర్సు ప్రారంభమయ్యే చోటు కూడా.",
  },
};

// Real Shreeja field photos, placed where their subject matches the module.
export const COVER_PHOTO = "cover-farmers-hillside.jpg";
export const MODULE_PHOTOS = {
  m1: { file: "feeding-buffalo.jpg", captionKey: "photoCaptionFeeding" },
  m8: { file: "milk-pooling-point.jpg", captionKey: "photoCaptionMPP" },
};

export function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function pick(field, lang) {
  if (!field) return "";
  return field[lang] ?? field.en ?? "";
}

export function makeAssetLoaders(root) {
  return {
    logoDataUri() {
      const buf = readFileSync(join(root, "assets/shreeja-logo.png"));
      return `data:image/png;base64,${buf.toString("base64")}`;
    },
    photoDataUri(filename) {
      const buf = readFileSync(join(root, "assets/handbook-photos", filename));
      return `data:image/jpeg;base64,${buf.toString("base64")}`;
    },
  };
}

const CALLOUT_EMOJI = { info: "💡", tip: "✅", warning: "⚠️" };

export function renderBlock(block, lang) {
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

export function renderBlocks(blocks, lang) {
  return (blocks || []).map((b) => renderBlock(b, lang)).join("");
}

// Collect glossary terms as we walk the content, for the consolidated
// glossary appendix at the back of the book.
export function collectGlossary(blocks, lang, out) {
  (blocks || []).forEach((b) => {
    if (b.type === "glossary") {
      const term = pick(b.term, lang);
      if (!out.has(term.toLowerCase())) {
        out.set(term.toLowerCase(), { term, meaning: pick(b.meaning, lang) });
      }
    }
  });
}

export function renderExerciseQuestion(q, idx, lang, L) {
  const isTF = q.type === "truefalse";
  const optionsHtml = isTF
    ? `<ol type="A"><li>${esc(L.trueLabel)}</li><li>${esc(L.falseLabel)}</li></ol>`
    : `<ol type="A">${q.options.map((o) => `<li>${esc(pick(o, lang))}</li>`).join("")}</ol>`;
  return `<div class="exercise"><div class="eq"><span class="qnum">${idx}.</span> ${esc(pick(q.q, lang))}</div>${optionsHtml}</div>`;
}

export function renderAnswerEntry(q, idx, lang, L) {
  const isTF = q.type === "truefalse";
  const answerText = isTF ? (q.answer ? L.trueLabel : L.falseLabel) : esc(pick(q.options[q.answer], lang));
  return `<div class="answer-entry"><span class="qnum">${idx}.</span> <strong>${esc(L.answerWord)}: ${answerText}.</strong> <span class="exp">${esc(pick(q.explain, lang))}</span></div>`;
}
