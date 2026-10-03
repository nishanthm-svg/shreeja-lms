// ============================================================================
// Shreeja Milk Calculator — a field tool for Sahayaks and staff.
// Turns the formulas taught in Modules 1, 10, 11 and 12 into simple "type your
// numbers, see the answer and the working" calculators, in all 4 languages.
// Everything runs in the browser, so it works offline once the app is loaded.
// EFU-basis pricing is intentionally NOT a separate calculator; the CDA
// calculator uses EFU internally only because the CDA method requires it.
// ============================================================================
import { L, tr } from "./i18n.js";

const STANDARD_EFU = 12.5; // reference EFU used by the CDA method (Module 11)

const S = {
  title: L("Milk Calculator", "పాల కాలిక్యులేటర్", "பால் கணிப்பான்", "ಹಾಲಿನ ಕ್ಯಾಲ್ಕುಲೇಟರ್"),
  subtitle: L(
    "Pick a calculator, type your numbers, and see the answer with the working.",
    "ఒక కాలిక్యులేటర్ ఎంచుకోండి, మీ సంఖ్యలు టైప్ చేయండి, లెక్క వివరాలతో సమాధానం చూడండి.",
    "ஒரு கணிப்பானைத் தேர்ந்தெடுங்கள், எண்களை உள்ளிடுங்கள், கணக்கு விவரத்துடன் விடையைப் பாருங்கள்.",
    "ಒಂದು ಕ್ಯಾಲ್ಕುಲೇಟರ್ ಆಯ್ಕೆಮಾಡಿ, ನಿಮ್ಮ ಸಂಖ್ಯೆಗಳನ್ನು ಟೈಪ್ ಮಾಡಿ, ಲೆಕ್ಕದ ವಿವರದೊಂದಿಗೆ ಉತ್ತರ ನೋಡಿ."
  ),
  navButton: L("🧮 Calculator", "🧮 కాలిక్యులేటర్", "🧮 கணிப்பான்", "🧮 ಕ್ಯಾಲ್ಕುಲೇಟರ್"),
  clear: L("Clear", "క్లియర్", "அழி", "ಅಳಿಸಿ"),
  howWorked: L("How it is worked out", "లెక్క ఎలా వచ్చింది", "இது எப்படி கணக்கிடப்பட்டது", "ಲೆಕ್ಕ ಹೇಗೆ ಬಂತು"),
  fillIn: L(
    "Fill in the boxes above to see the answer.",
    "సమాధానం చూడటానికి పైన ఉన్న బాక్సులను నింపండి.",
    "விடையைக் காண மேலுள்ள பெட்டிகளை நிரப்புங்கள்.",
    "ಉತ್ತರ ನೋಡಲು ಮೇಲಿನ ಬಾಕ್ಸ್‌ಗಳನ್ನು ತುಂಬಿ."
  ),
  optional: L("(optional)", "(ఐచ్ఛికం)", "(விருப்பம்)", "(ಐಚ್ಛಿಕ)"),
  checkValue: L("Please check this value", "దయచేసి ఈ విలువను తనిఖీ చేయండి", "இந்த மதிப்பைச் சரிபார்க்கவும்", "ದಯವಿಟ್ಟು ಈ ಮೌಲ್ಯವನ್ನು ಪರಿಶೀಲಿಸಿ"),
  lit: L("litres", "లీటర్లు", "லிட்டர்", "ಲೀಟರ್"),
  perLit: L("per litre", "లీటరుకు", "ஒரு லிட்டருக்கு", "ಪ್ರತಿ ಲೀಟರ್‌ಗೆ"),
  fromModule: L("From Module", "మాడ్యూల్", "தொகுதி", "ಮಾಡ್ಯೂಲ್"),
};

// Each tool: fields (id, label, unit hint, required, optional sanity range),
// compute(values) -> { results:[{label,value,big,tone}], steps:[string] } | null.
const TOOLS = [
  {
    id: "fat",
    icon: "🥛",
    module: "10",
    name: L("Price on Fat Basis", "కొవ్వు ఆధారంగా ధర", "கொழுப்பு அடிப்படையில் விலை", "ಕೊಬ್ಬಿನ ಆಧಾರದ ಮೇಲೆ ಬೆಲೆ"),
    desc: L(
      "Price per litre from FAT % and the fat rate",
      "FAT %, ఫ్యాట్ రేటు నుండి లీటరు ధర",
      "FAT %, கொழுப்பு விலையிலிருந்து லிட்டர் விலை",
      "FAT %, ಫ್ಯಾಟ್ ದರದಿಂದ ಪ್ರತಿ ಲೀಟರ್ ಬೆಲೆ"
    ),
    formula: L(
      "Price per litre = (FAT% ÷ 100) × Fat rate",
      "లీటరు ధర = (FAT% ÷ 100) × ఫ్యాట్ రేటు",
      "லிட்டர் விலை = (FAT% ÷ 100) × கொழுப்பு விலை",
      "ಪ್ರತಿ ಲೀಟರ್ ಬೆಲೆ = (FAT% ÷ 100) × ಫ್ಯಾಟ್ ದರ"
    ),
    fields: [
      { id: "fat", label: L("FAT %", "FAT %", "FAT %", "FAT %"), ph: "5.5", req: true, min: 0.1, max: 15 },
      {
        id: "rate",
        label: L("Fat rate (₹ per kg)", "ఫ్యాట్ రేటు (కిలోకు ₹)", "கொழுப்பு விலை (கிலோவுக்கு ₹)", "ಫ್ಯಾಟ್ ದರ (ಕೆಜಿಗೆ ₹)"),
        ph: "580",
        req: true,
        min: 1,
      },
      {
        id: "litres",
        label: L("Milk quantity (litres)", "పాల పరిమాణం (లీటర్లు)", "பால் அளவு (லிட்டர்)", "ಹಾಲಿನ ಪ್ರಮಾಣ (ಲೀಟರ್)"),
        ph: "2000",
        req: false,
        min: 0,
      },
    ],
    compute(v, lang) {
      const price = (v.fat / 100) * v.rate;
      const results = [{ label: L("Price per litre", "లీటరు ధర", "லிட்டருக்கு விலை", "ಪ್ರತಿ ಲೀಟರ್ ಬೆಲೆ"), value: inr(price, 2), big: true }];
      const steps = [`(${num(v.fat)} ÷ 100) × ${num(v.rate)} = ${inr(price, 2)}`];
      if (v.litres > 0) {
        const total = v.litres * price;
        results.push({ label: L("Total amount", "మొత్తం సొమ్ము", "மொத்தத் தொகை", "ಒಟ್ಟು ಮೊತ್ತ"), value: inr(total, 0), big: true });
        steps.push(`${num(v.litres)} × ${inr(price, 2)} = ${inr(total, 0)}`);
      }
      return { results, steps };
    },
  },
  {
    id: "income",
    icon: "💰",
    module: "1",
    name: L("Milk Income & Profit", "పాల ఆదాయం & లాభం", "பால் வருமானம் & லாபம்", "ಹಾಲಿನ ಆದಾಯ & ಲಾಭ"),
    desc: L(
      "Income from litres per day, days and rate; profit after costs",
      "రోజుకు లీటర్లు, రోజులు, రేటు నుండి ఆదాయం; ఖర్చుల తర్వాత లాభం",
      "நாளொன்றுக்கு லிட்டர், நாட்கள், விலையிலிருந்து வருமானம்; செலவுக்குப் பின் லாபம்",
      "ದಿನಕ್ಕೆ ಲೀಟರ್, ದಿನಗಳು, ದರದಿಂದ ಆದಾಯ; ಖರ್ಚಿನ ನಂತರ ಲಾಭ"
    ),
    formula: L(
      "Income = litres per day × days × rate.  Net profit = Income − Costs",
      "ఆదాయం = రోజుకు లీటర్లు × రోజులు × రేటు.  నికర లాభం = ఆదాయం − ఖర్చులు",
      "வருமானம் = நாளொன்றுக்கு லிட்டர் × நாட்கள் × விலை.  நிகர லாபம் = வருமானம் − செலவுகள்",
      "ಆದಾಯ = ದಿನಕ್ಕೆ ಲೀಟರ್ × ದಿನಗಳು × ದರ.  ನಿವ್ವಳ ಲಾಭ = ಆದಾಯ − ಖರ್ಚುಗಳು"
    ),
    fields: [
      { id: "lpd", label: L("Litres per day", "రోజుకు లీటర్లు", "நாளொன்றுக்கு லிட்டர்", "ದಿನಕ್ಕೆ ಲೀಟರ್"), ph: "11", req: true, min: 0.1 },
      { id: "days", label: L("Number of days", "రోజుల సంఖ్య", "நாட்களின் எண்ணிக்கை", "ದಿನಗಳ ಸಂಖ್ಯೆ"), ph: "180", req: true, min: 1 },
      { id: "rate", label: L("Rate per litre (₹)", "లీటరు రేటు (₹)", "லிட்டர் விலை (₹)", "ಪ್ರತಿ ಲೀಟರ್ ದರ (₹)"), ph: "42", req: true, min: 0.1 },
      { id: "cost", label: L("Total costs (₹)", "మొత్తం ఖర్చులు (₹)", "மொத்தச் செலவுகள் (₹)", "ಒಟ್ಟು ಖರ್ಚುಗಳು (₹)"), ph: "96000", req: false, min: 0 },
    ],
    compute(v) {
      const litres = v.lpd * v.days;
      const income = litres * v.rate;
      const results = [
        { label: L("Total litres", "మొత్తం లీటర్లు", "மொத்த லிட்டர்", "ಒಟ್ಟು ಲೀಟರ್"), value: `${num(litres)}` },
        { label: L("Income", "ఆదాయం", "வருமானம்", "ಆದಾಯ"), value: inr(income, 0), big: true },
      ];
      const steps = [`${num(v.lpd)} × ${num(v.days)} = ${num(litres)}`, `${num(litres)} × ${inr(v.rate, 2)} = ${inr(income, 0)}`];
      if (v.cost > 0) {
        const profit = income - v.cost;
        results.push({
          label: L("Net profit", "నికర లాభం", "நிகர லாபம்", "ನಿವ್ವಳ ಲಾಭ"),
          value: inr(profit, 0),
          big: true,
          tone: profit < 0 ? "bad" : "good",
        });
        steps.push(`${inr(income, 0)} − ${inr(v.cost, 0)} = ${inr(profit, 0)}`);
      }
      return { results, steps };
    },
  },
  {
    id: "cda",
    icon: "⚖️",
    module: "11",
    name: L("CDA Loss Calculator", "CDA నష్టం కాలిక్యులేటర్", "CDA இழப்பு கணிப்பான்", "CDA ನಷ್ಟ ಕ್ಯಾಲ್ಕುಲೇಟರ್"),
    desc: L(
      "Standard landing rate, pro-rata impact and CDA loss %",
      "ప్రామాణిక ల్యాండింగ్ రేటు, ప్రో-రేటా ప్రభావం, CDA నష్టం %",
      "நிலையான வருகை விகிதம், விகிதாசார தாக்கம், CDA இழப்பு %",
      "ಪ್ರಮಾಣಿತ ಲ್ಯಾಂಡಿಂಗ್ ದರ, ಪ್ರೊ-ರೇಟಾ ಪರಿಣಾಮ, CDA ನಷ್ಟ %"
    ),
    formula: L(
      "Standard Landing Rate = Average Rate × (12.5 ÷ EFU).  CDA Loss % = (Loss Value ÷ Composite Milk Value) × 100",
      "ప్రామాణిక ల్యాండింగ్ రేటు = సగటు రేటు × (12.5 ÷ EFU).  CDA నష్టం % = (నష్టం విలువ ÷ కాంపోజిట్ పాల విలువ) × 100",
      "நிலையான வருகை விகிதம் = சராசரி விகிதம் × (12.5 ÷ EFU).  CDA இழப்பு % = (இழப்பு மதிப்பு ÷ கூட்டு பால் மதிப்பு) × 100",
      "ಪ್ರಮಾಣಿತ ಲ್ಯಾಂಡಿಂಗ್ ದರ = ಸರಾಸರಿ ದರ × (12.5 ÷ EFU).  CDA ನಷ್ಟ % = (ನಷ್ಟದ ಮೌಲ್ಯ ÷ ಸಂಯೋಜಿತ ಹಾಲಿನ ಮೌಲ್ಯ) × 100"
    ),
    fields: [
      { id: "amt", label: L("Composite amount (₹)", "కాంపోజిట్ మొత్తం (₹)", "கூட்டு தொகை (₹)", "ಸಂಯೋಜಿತ ಮೊತ್ತ (₹)"), ph: "4400000", req: true, min: 1 },
      { id: "cq", label: L("Composite quantity (litres)", "కాంపోజిట్ పరిమాణం (లీటర్లు)", "கூட்டு அளவு (லிட்டர்)", "ಸಂಯೋಜಿತ ಪ್ರಮಾಣ (ಲೀಟರ್)"), ph: "100000", req: true, min: 1 },
      { id: "fat", label: L("FAT %", "FAT %", "FAT %", "FAT %"), ph: "4.2", req: true, min: 0.1, max: 15 },
      { id: "snf", label: L("SNF %", "SNF %", "SNF %", "SNF %"), ph: "8.6", req: true, min: 0.1, max: 15 },
      { id: "decl", label: L("Declared rate (₹ per litre)", "ప్రకటిత రేటు (లీటరుకు ₹)", "அறிவிக்கப்பட்ட விகிதம் (லிட்டருக்கு ₹)", "ಘೋಷಿತ ದರ (ಪ್ರತಿ ಲೀಟರ್‌ಗೆ ₹)"), ph: "52", req: true, min: 0.1 },
      { id: "aq", label: L("Actual quantity received (litres)", "అందుకున్న యాక్చువల్ పరిమాణం (లీటర్లు)", "பெறப்பட்ட உண்மையான அளவு (லிட்டர்)", "ಪಡೆದ ವಾಸ್ತವಿಕ ಪ್ರಮಾಣ (ಲೀಟರ್)"), ph: "99400", req: true, min: 0 },
    ],
    compute(v) {
      // Rounded at each step to 2 decimals so answers match the worked examples in Module 11.
      const avg = round2(v.amt / v.cq);
      const efu = round2(v.fat + (2 / 3) * v.snf);
      const slr = round2(avg * (STANDARD_EFU / efu));
      const impact = round2(v.decl - slr);
      const netLoss = v.aq - v.cq; // negative = milk went missing
      const missing = Math.max(0, -netLoss);
      const lossValue = missing * slr;
      const compValue = v.cq * slr;
      const lossPct = compValue > 0 ? (lossValue / compValue) * 100 : 0;
      const fav = impact >= 0;
      const results = [
        { label: L("Average rate", "సగటు రేటు", "சராசரி விகிதம்", "ಸರಾಸರಿ ದರ"), value: `${inr(avg, 2)} / L` },
        { label: L("EFU", "EFU", "EFU", "EFU"), value: num(efu, 2) },
        { label: L("Standard landing rate", "ప్రామాణిక ల్యాండింగ్ రేటు", "நிலையான வருகை விகிதம்", "ಪ್ರಮಾಣಿತ ಲ್ಯಾಂಡಿಂಗ್ ದರ"), value: `${inr(slr, 2)} / L`, big: true },
        {
          label: L("Pro-rata impact", "ప్రో-రేటా ప్రభావం", "விகிதாசார தாக்கம்", "ಪ್ರೊ-ರೇಟಾ ಪರಿಣಾಮ"),
          value: `${impact < 0 ? "−" : ""}${inr(Math.abs(impact), 2)} · ${
            fav ? tr(L("Favourable", "అనుకూలం", "சாதகமானது", "ಅನುಕೂಲ"), CURRENT_LANG) : tr(L("Unfavourable", "అననుకూలం", "சாதகமற்றது", "ಪ್ರತಿಕೂಲ"), CURRENT_LANG)
          }`,
          big: true,
          tone: fav ? "good" : "bad",
        },
        {
          label: L("Net quantity difference", "నికర పరిమాణ తేడా", "நிகர அளவு வேறுபாடு", "ನಿವ್ವಳ ಪ್ರಮಾಣ ವ್ಯತ್ಯಾಸ"),
          value: `${netLoss < 0 ? "−" : netLoss > 0 ? "+" : ""}${num(Math.abs(netLoss))} L`,
          tone: netLoss < 0 ? "bad" : "good",
        },
        { label: L("Loss value", "నష్టం విలువ", "இழப்பு மதிப்பு", "ನಷ್ಟದ ಮೌಲ್ಯ"), value: inr(lossValue, 0) },
        {
          label: L("CDA loss %", "CDA నష్టం %", "CDA இழப்பு %", "CDA ನಷ್ಟ %"),
          value: `${num(round2(lossPct), 2)} %`,
          big: true,
          tone: lossPct > 0 ? "bad" : "good",
        },
      ];
      const steps = [
        `${tr(L("Average rate", "సగటు రేటు", "சராசரி விகிதம்", "ಸರಾಸರಿ ದರ"), CURRENT_LANG)}: ${inr(v.amt, 0)} ÷ ${num(v.cq)} = ${inr(avg, 2)}`,
        `EFU: ${num(v.fat)} + (2/3 × ${num(v.snf)}) = ${num(efu, 2)}`,
        `${tr(L("Standard landing rate", "ప్రామాణిక ల్యాండింగ్ రేటు", "நிலையான வருகை விகிதம்", "ಪ್ರಮಾಣಿತ ಲ್ಯಾಂಡಿಂಗ್ ದರ"), CURRENT_LANG)}: ${inr(avg, 2)} × (12.5 ÷ ${num(efu, 2)}) = ${inr(slr, 2)}`,
        `${tr(L("Pro-rata impact", "ప్రో-రేటా ప్రభావం", "விகிதாசார தாக்கம்", "ಪ್ರೊ-ರೇಟಾ ಪರಿಣಾಮ"), CURRENT_LANG)}: ${inr(v.decl, 2)} − ${inr(slr, 2)} = ${impact < 0 ? "−" : ""}${inr(Math.abs(impact), 2)}`,
        `${tr(L("Net quantity difference", "నికర పరిమాణ తేడా", "நிகர அளவு வேறுபாடு", "ನಿವ್ವಳ ಪ್ರಮಾಣ ವ್ಯತ್ಯಾಸ"), CURRENT_LANG)}: ${num(v.aq)} − ${num(v.cq)} = ${netLoss < 0 ? "−" : ""}${num(Math.abs(netLoss))}`,
        `${tr(L("Loss value", "నష్టం విలువ", "இழப்பு மதிப்பு", "ನಷ್ಟದ ಮೌಲ್ಯ"), CURRENT_LANG)}: ${num(missing)} × ${inr(slr, 2)} = ${inr(lossValue, 0)}`,
        `${tr(L("Composite milk value", "కాంపోజిట్ పాల విలువ", "கூட்டு பால் மதிப்பு", "ಸಂಯೋಜಿತ ಹಾಲಿನ ಮೌಲ್ಯ"), CURRENT_LANG)}: ${num(v.cq)} × ${inr(slr, 2)} = ${inr(compValue, 0)}`,
        `CDA %: (${inr(lossValue, 0)} ÷ ${inr(compValue, 0)}) × 100 = ${num(round2(lossPct), 2)} %`,
      ];
      return { results, steps };
    },
  },
  {
    id: "transport",
    icon: "🚚",
    module: "12",
    name: L("Transport Cost per Litre", "లీటరుకు రవాణా ఖర్చు", "லிட்டருக்கு போக்குவரத்துச் செலவு", "ಪ್ರತಿ ಲೀಟರ್‌ಗೆ ಸಾಗಣೆ ವೆಚ್ಚ"),
    desc: L(
      "Cost per litre of a route, and how it compares with the company average",
      "ఒక మార్గం లీటరు ఖర్చు, కంపెనీ సగటుతో పోలిక",
      "ஒரு வழித்தடத்தின் லிட்டர் செலவு, நிறுவனச் சராசரியுடன் ஒப்பீடு",
      "ಒಂದು ಮಾರ್ಗದ ಪ್ರತಿ ಲೀಟರ್ ವೆಚ್ಚ, ಕಂಪನಿಯ ಸರಾಸರಿಯೊಂದಿಗೆ ಹೋಲಿಕೆ"
    ),
    formula: L(
      "Cost per litre = Total cost ÷ Litres.  Extra cost = Actual − Expected (litres × average cost)",
      "లీటరు ఖర్చు = మొత్తం ఖర్చు ÷ లీటర్లు.  అదనపు ఖర్చు = వాస్తవ − అంచనా (లీటర్లు × సగటు ఖర్చు)",
      "லிட்டர் செலவு = மொத்தச் செலவு ÷ லிட்டர்.  கூடுதல் செலவு = உண்மை − எதிர்பார்த்தது (லிட்டர் × சராசரிச் செலவு)",
      "ಲೀಟರ್ ವೆಚ್ಚ = ಒಟ್ಟು ವೆಚ್ಚ ÷ ಲೀಟರ್.  ಹೆಚ್ಚುವರಿ ವೆಚ್ಚ = ವಾಸ್ತವ − ನಿರೀಕ್ಷಿತ (ಲೀಟರ್ × ಸರಾಸರಿ ವೆಚ್ಚ)"
    ),
    fields: [
      { id: "cost", label: L("Total transport cost (₹)", "మొత్తం రవాణా ఖర్చు (₹)", "மொத்த போக்குவரத்துச் செலவு (₹)", "ಒಟ್ಟು ಸಾಗಣೆ ವೆಚ್ಚ (₹)"), ph: "3150", req: true, min: 0.1 },
      { id: "litres", label: L("Milk carried (litres)", "రవాణా చేసిన పాలు (లీటర్లు)", "கொண்டு செல்லப்பட்ட பால் (லிட்டர்)", "ಸಾಗಿಸಿದ ಹಾಲು (ಲೀಟರ್)"), ph: "900", req: true, min: 1 },
      { id: "avg", label: L("Company average cost (₹ per litre)", "కంపెనీ సగటు ఖర్చు (లీటరుకు ₹)", "நிறுவனச் சராசரிச் செலவு (லிட்டருக்கு ₹)", "ಕಂಪನಿಯ ಸರಾಸರಿ ವೆಚ್ಚ (ಪ್ರತಿ ಲೀಟರ್‌ಗೆ ₹)"), ph: "2.28", req: false, min: 0 },
    ],
    compute(v) {
      const perL = v.cost / v.litres;
      const results = [{ label: L("Cost per litre", "లీటరు ఖర్చు", "லிட்டர் செலவு", "ಲೀಟರ್ ವೆಚ್ಚ"), value: inr(perL, 2), big: true }];
      const steps = [`${inr(v.cost, 0)} ÷ ${num(v.litres)} = ${inr(perL, 2)}`];
      if (v.avg > 0) {
        const expected = v.litres * v.avg;
        const extra = v.cost - expected;
        results.push({ label: L("Expected cost", "అంచనా ఖర్చు", "எதிர்பார்க்கப்படும் செலவு", "ನಿರೀಕ್ಷಿತ ವೆಚ್ಚ"), value: inr(expected, 0) });
        results.push(
          extra >= 0
            ? { label: L("Extra cost", "అదనపు ఖర్చు", "கூடுதல் செலவு", "ಹೆಚ್ಚುವರಿ ವೆಚ್ಚ"), value: inr(extra, 0), big: true, tone: extra > 0 ? "bad" : undefined }
            : { label: L("Saving vs average", "సగటుతో పోలిస్తే ఆదా", "சராசரியை விட சேமிப்பு", "ಸರಾಸರಿಗಿಂತ ಉಳಿತಾಯ"), value: inr(-extra, 0), big: true, tone: "good" }
        );
        steps.push(`${num(v.litres)} × ${inr(v.avg, 2)} = ${inr(expected, 0)}`);
        steps.push(`${inr(v.cost, 0)} − ${inr(expected, 0)} = ${extra < 0 ? "−" : ""}${inr(Math.abs(extra), 0)}`);
      }
      return { results, steps };
    },
  },
];

// Language used while computing/rendering; set on every render.
let CURRENT_LANG = "en";

function num(n, dp) {
  if (!isFinite(n)) return "—";
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: dp ?? 0, maximumFractionDigits: dp ?? 2 }).format(n);
}
function inr(n, dp) {
  if (!isFinite(n)) return "—";
  return (n < 0 ? "−₹" : "₹") + num(Math.abs(n), dp);
}
function round2(n) {
  return Math.round(n * 100) / 100;
}

function esc(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function calculatorNavLabel(lang) {
  return tr(S.navButton, lang);
}

// ---------------- Picker (list of calculators) ----------------
function renderPicker(lang, ctx) {
  const cards = TOOLS.map(
    (tool) => `
      <button type="button" class="calc-card" data-nav="#/calculator/${tool.id}">
        <span class="calc-card-icon">${tool.icon}</span>
        <span class="calc-card-body">
          <span class="calc-card-name">${esc(tr(tool.name, lang))}</span>
          <span class="calc-card-desc">${esc(tr(tool.desc, lang))}</span>
          <span class="calc-card-mod">${esc(tr(S.fromModule, lang))} ${tool.module}</span>
        </span>
        <span class="calc-card-go">›</span>
      </button>`
  ).join("");
  return `
    ${ctx.renderTopbar({ showBack: true, backHash: "#/dashboard", title: tr(S.title, lang) })}
    <div class="page page-narrow">
      <div class="dash-header">
        <h1>🧮 ${esc(tr(S.title, lang))}</h1>
        <p>${esc(tr(S.subtitle, lang))}</p>
      </div>
      <div class="calc-list">${cards}</div>
    </div>`;
}

// ---------------- Single calculator ----------------
function renderTool(tool, lang, ctx) {
  const inputs = tool.fields
    .map(
      (f) => `
      <label class="calc-field">
        <span class="calc-label">${esc(tr(f.label, lang))}${f.req ? "" : ` <em>${esc(tr(S.optional, lang))}</em>`}</span>
        <input class="calc-input" type="text" inputmode="decimal" autocomplete="off" data-field="${f.id}" placeholder="${esc(f.ph)}" />
        <span class="calc-warn" data-warn="${f.id}" hidden>${esc(tr(S.checkValue, lang))}</span>
      </label>`
    )
    .join("");
  return `
    ${ctx.renderTopbar({ showBack: true, backHash: "#/calculator", title: tr(S.title, lang) })}
    <div class="page page-narrow">
      <div class="dash-header">
        <h1>${tool.icon} ${esc(tr(tool.name, lang))}</h1>
        <p>${esc(tr(tool.formula, lang))}</p>
      </div>
      <div class="calc-panel">
        <div class="calc-fields">${inputs}</div>
        <div class="btn-row"><button type="button" class="btn btn-outline" id="calc-clear">↺ ${esc(tr(S.clear, lang))}</button></div>
      </div>
      <div class="calc-output" id="calc-output"></div>
    </div>`;
}

export function renderCalculator(toolId, ctx) {
  const lang = ctx.lang;
  CURRENT_LANG = lang;
  const tool = TOOLS.find((t) => t.id === toolId);
  return tool ? renderTool(tool, lang, ctx) : renderPicker(lang, ctx);
}

function parseNum(raw) {
  const s = String(raw ?? "").replace(/[,₹\s]/g, "");
  if (s === "") return null;
  const n = Number(s);
  return isFinite(n) ? n : NaN;
}

export function wireCalculator(toolId, ctx) {
  const tool = TOOLS.find((t) => t.id === toolId);
  if (!tool) return;
  const lang = ctx.lang;
  CURRENT_LANG = lang;
  const out = document.getElementById("calc-output");
  const inputs = [...document.querySelectorAll(".calc-input")];

  function update() {
    const values = {};
    let ready = true;
    tool.fields.forEach((f) => {
      const el = inputs.find((i) => i.dataset.field === f.id);
      const warn = document.querySelector(`[data-warn="${f.id}"]`);
      const n = parseNum(el.value);
      let bad = false;
      if (n === null) {
        values[f.id] = 0;
        if (f.req) ready = false;
      } else if (Number.isNaN(n) || n < 0 || (f.min != null && f.req && n < f.min) || (f.max != null && n > f.max)) {
        bad = true;
        ready = false;
      } else {
        values[f.id] = n;
      }
      warn.hidden = !bad;
      el.classList.toggle("calc-input-bad", bad);
    });
    if (!ready) {
      out.innerHTML = `<div class="calc-empty">${esc(tr(S.fillIn, lang))}</div>`;
      return;
    }
    const res = tool.compute(values, lang);
    const rows = res.results
      .map(
        (r) => `
        <div class="calc-result${r.big ? " calc-result-big" : ""}${r.tone ? ` calc-tone-${r.tone}` : ""}">
          <span class="calc-result-label">${esc(tr(r.label, lang))}</span>
          <span class="calc-result-value">${esc(r.value)}</span>
        </div>`
      )
      .join("");
    const steps = res.steps.map((s) => `<li>${esc(s)}</li>`).join("");
    out.innerHTML = `
      <div class="calc-results">${rows}</div>
      <div class="calc-working">
        <h3>${esc(tr(S.howWorked, lang))}</h3>
        <ol>${steps}</ol>
      </div>`;
  }

  inputs.forEach((i) => i.addEventListener("input", update));
  document.getElementById("calc-clear").addEventListener("click", () => {
    inputs.forEach((i) => (i.value = ""));
    update();
    inputs[0].focus();
  });
  update();
}
