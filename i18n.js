// ============================================================================
// Shreeja LMS — Language support
// A learner picks a language once (stored in localStorage) and every piece
// of UI chrome and lesson content renders in that language, falling back to
// English if a translation isn't available yet for a given piece of content.
// ============================================================================

export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
];

const LANG_KEY = "shreeja_lms_lang";

export function getLang() {
  return localStorage.getItem(LANG_KEY);
}

export function setLang(code) {
  localStorage.setItem(LANG_KEY, code);
}

// Shorthand used throughout data.js to build a translatable string:
// L("English text", "Telugu text", "Tamil text", "Kannada text")
export function L(en, te, ta, kn) {
  return { en, te: te || en, ta: ta || en, kn: kn || en };
}

// Resolve a translatable field (either a plain string or an {en,te,ta,kn}
// object built with L()) to text in the given language, always falling
// back to English so nothing ever renders blank.
export function tr(field, lang) {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.en || "";
}

// UI chrome strings — everything that isn't lesson content.
const UI = {
  brandName: L("Shreeja LMS", "శ్రీజ LMS", "ஷ்ரீஜா LMS", "ಶ್ರೀಜಾ LMS"),
  backButton: L("← Back", "← వెనుకకు", "← பின்னால்", "← ಹಿಂದೆ"),
  dashboardTitle: L(
    "🥛 Shreeja Learning Academy",
    "🥛 శ్రీజ లెర్నింగ్ అకాడమీ",
    "🥛 ஷ்ரீஜா கற்றல் அகாடமி",
    "🥛 ಶ್ರೀಜಾ ಕಲಿಕಾ ಅಕಾಡೆಮಿ"
  ),
  dashboardTagline: L(
    "Learn step by step, on your own. Every topic is taught first — with examples and interactive moments — then checked, all at once, at the end.",
    "మీ అంతట మీరు, అంచెలంచెలుగా నేర్చుకోండి. ప్రతి అంశం ముందు ఉదాహరణలతో, ఆసక్తికరంగా బోధించబడుతుంది — తర్వాత చివర్లో అన్నీ కలిపి పరీక్షించబడతాయి.",
    "நீங்களே, படிப்படியாக கற்றுக்கொள்ளுங்கள். ஒவ்வொரு பாடமும் முதலில் உதாரணங்களுடன், சுவாரஸ்யமாக கற்பிக்கப்படும் — பின்னர் இறுதியில் அனைத்தும் ஒன்றாக சோதிக்கப்படும்.",
    "ನೀವೇ, ಹಂತ ಹಂತವಾಗಿ ಕಲಿಯಿರಿ. ಪ್ರತಿ ವಿಷಯವನ್ನು ಮೊದಲು ಉದಾಹರಣೆಗಳೊಂದಿಗೆ, ಆಸಕ್ತಿದಾಯಕವಾಗಿ ಕಲಿಸಲಾಗುತ್ತದೆ — ನಂತರ ಕೊನೆಯಲ್ಲಿ ಎಲ್ಲವನ್ನೂ ಒಟ್ಟಿಗೆ ಪರೀಕ್ಷಿಸಲಾಗುತ್ತದೆ."
  ),
  progressHint: L(
    "Keep going — every lesson builds toward your certificate. 🎓",
    "కొనసాగించండి — ప్రతి పాఠం మీ సర్టిఫికెట్ వైపు ఒక అడుగు. 🎓",
    "தொடருங்கள் — ஒவ்வொரு பாடமும் உங்கள் சான்றிதழை நோக்கிய ஒரு படி. 🎓",
    "ಮುಂದುವರಿಸಿ — ಪ್ರತಿ ಪಾಠವೂ ನಿಮ್ಮ ಪ್ರಮಾಣಪತ್ರದತ್ತ ಒಂದು ಹೆಜ್ಜೆ. 🎓"
  ),
  badgeCompleted: L("✓ Completed", "✓ పూర్తయింది", "✓ முடிந்தது", "✓ ಪೂರ್ಣಗೊಂಡಿದೆ"),
  badgeInProgress: L("In progress", "పురోగతిలో ఉంది", "நடந்து கொண்டிருக்கிறது", "ಪ್ರಗತಿಯಲ್ಲಿದೆ"),
  badgeStart: L("Start", "ప్రారంభించండి", "தொடங்கு", "ಪ್ರಾರಂಭಿಸಿ"),
  badgeLocked: L("🔒 Locked", "🔒 లాక్ చేయబడింది", "🔒 பூட்டப்பட்டுள்ளது", "🔒 ಲಾಕ್ ಆಗಿದೆ"),
  comingSoon: L("Coming soon", "త్వరలో వస్తుంది", "விரைவில் வரும்", "ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತದೆ"),
  progressNote: L(
    "Your progress is saved automatically in this browser.",
    "మీ పురోగతి ఈ బ్రౌజర్‌లో స్వయంచాలకంగా సేవ్ అవుతుంది.",
    "உங்கள் முன்னேற்றம் இந்த உலாவியில் தானாக சேமிக்கப்படும்.",
    "ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಉಳಿಸಲಾಗುತ್ತದೆ."
  ),
  lessonsCompleteMeta: L(
    "{completed}/{total} lessons complete",
    "{completed}/{total} పాఠాలు పూర్తయ్యాయి",
    "{completed}/{total} பாடங்கள் முடிந்தன",
    "{completed}/{total} ಪಾಠಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ"
  ),
  lessonsCompletedCount: L(
    "{done} of {total} lessons completed",
    "{total}లో {done} పాఠాలు పూర్తయ్యాయి",
    "{total} இல் {done} பாடங்கள் முடிந்தன",
    "{total}ರಲ್ಲಿ {done} ಪಾಠಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ"
  ),
  moduleProgressComplete: L(
    "{completed}/{total} complete",
    "{completed}/{total} పూర్తయింది",
    "{completed}/{total} முடிந்தது",
    "{completed}/{total} ಪೂರ್ಣಗೊಂಡಿದೆ"
  ),
  lessonMeta: L(
    "{min} min · {topics} topics",
    "{min} నిమిషాలు · {topics} అంశాలు",
    "{min} நிமிடங்கள் · {topics} தலைப்புகள்",
    "{min} ನಿಮಿಷಗಳು · {topics} ವಿಷಯಗಳು"
  ),
  bestScoreSuffix: L(
    "Best score {score}%",
    "ఉత్తమ స్కోరు {score}%",
    "சிறந்த மதிப்பெண் {score}%",
    "ಅತ್ಯುತ್ತಮ ಅಂಕ {score}%"
  ),
  lockedHint: L(
    "Complete the previous lesson to unlock",
    "అన్‌లాక్ చేయడానికి మునుపటి పాఠం పూర్తి చేయండి",
    "திறக்க முந்தைய பாடத்தை முடிக்கவும்",
    "ಅನ್‌ಲಾಕ್ ಮಾಡಲು ಹಿಂದಿನ ಪಾಠವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ"
  ),
  lessonOfTotal: L("Lesson {n} of {total}", "పాఠం {n} / {total}", "பாடம் {n} / {total}", "ಪಾಠ {n} / {total}"),
  topicOfTotal: L("Topic {n} of {total}", "అంశం {n} / {total}", "தலைப்பு {n} / {total}", "ವಿಷಯ {n} / {total}"),
  prevButton: L("← Previous", "← మునుపటి", "← முந்தைய", "← ಹಿಂದಿನ"),
  nextTopicButton: L("Next Topic →", "తదుపరి అంశం →", "அடுத்த தலைப்பு →", "ಮುಂದಿನ ವಿಷಯ →"),
  startQuizButton: L(
    "📝 Start Lesson Quiz →",
    "📝 పాఠం క్విజ్ ప్రారంభించండి →",
    "📝 பாட வினாடி வினா தொடங்கு →",
    "📝 ಪಾಠ ರಸಪ್ರಶ್ನೆ ಪ್ರಾರಂಭಿಸಿ →"
  ),
  lessonQuizTitle: L("📝 Lesson Quiz", "📝 పాఠం క్విజ్", "📝 பாட வினாடி வினா", "📝 ಪಾಠ ರಸಪ್ರಶ್ನೆ"),
  lessonQuizSub: L(
    "You've learned every topic in this lesson. Let's check everything together, all at once. If you miss something, you'll get a chance to re-learn just that part.",
    "మీరు ఈ పాఠంలోని ప్రతి అంశాన్ని నేర్చుకున్నారు. ఇప్పుడు అన్నింటినీ ఒకేసారి పరిశీలిద్దాం. మీరు ఏదైనా తప్పు చేస్తే, ఆ భాగాన్ని మళ్ళీ నేర్చుకునే అవకాశం ఉంటుంది.",
    "இந்த பாடத்தில் உள்ள ஒவ்வொரு தலைப்பையும் நீங்கள் கற்றுக்கொண்டீர்கள். இப்போது எல்லாவற்றையும் ஒன்றாக சரிபார்க்கலாம். ஏதேனும் தவறினால், அந்த பகுதியை மீண்டும் கற்க வாய்ப்பு கிடைக்கும்.",
    "ಈ ಪಾಠದಲ್ಲಿನ ಪ್ರತಿ ವಿಷಯವನ್ನೂ ನೀವು ಕಲಿತಿದ್ದೀರಿ. ಈಗ ಎಲ್ಲವನ್ನೂ ಒಟ್ಟಿಗೆ ಪರಿಶೀಲಿಸೋಣ. ನೀವು ಏನಾದರೂ ತಪ್ಪು ಮಾಡಿದರೆ, ಆ ಭಾಗವನ್ನು ಮತ್ತೆ ಕಲಿಯುವ ಅವಕಾಶ ಸಿಗುತ್ತದೆ."
  ),
  submitQuizButton: L(
    "Submit Lesson Quiz",
    "పాఠం క్విజ్ సమర్పించండి",
    "பாட வினாடி வினாவை சமர்ப்பிக்கவும்",
    "ಪಾಠ ರಸಪ್ರಶ್ನೆ ಸಲ್ಲಿಸಿ"
  ),
  checkAnswersButton: L("Check My Answers", "నా జవాబులు తనిఖీ చేయండి", "என் பதில்களை சரிபார்க்கவும்", "ನನ್ನ ಉತ್ತರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ"),
  checkAgainButton: L("Check Again", "మళ్ళీ తనిఖీ చేయండి", "மீண்டும் சரிபார்க்கவும்", "ಮತ್ತೆ ಪರಿಶೀಲಿಸಿ"),
  questionOfTotal: L("Question {n} of {total}", "ప్రశ్న {n} / {total}", "கேள்வி {n} / {total}", "ಪ್ರಶ್ನೆ {n} / {total}"),
  reviewTitlePrefix: L("📖 Let's Review:", "📖 మళ్ళీ చూద్దాం:", "📖 மீண்டும் பார்ப்போம்:", "📖 ಮತ್ತೆ ನೋಡೋಣ:"),
  reviewSub: L(
    "You missed a question about this earlier. Here it is again — take your time.",
    "మీరు దీని గురించి ఇంతకు ముందు ఒక ప్రశ్నను తప్పుగా జవాబిచ్చారు. ఇది మళ్ళీ ఇక్కడ ఉంది — మీ సమయం తీసుకోండి.",
    "இதைப் பற்றி முன்பு ஒரு கேள்விக்கு தவறான பதில் அளித்தீர்கள். இது மீண்டும் இங்கே உள்ளது — நேரம் எடுத்துக் கொள்ளுங்கள்.",
    "ಇದರ ಬಗ್ಗೆ ನೀವು ಈ ಹಿಂದೆ ಒಂದು ಪ್ರಶ್ನೆಗೆ ತಪ್ಪು ಉತ್ತರ ನೀಡಿದ್ದೀರಿ. ಇದು ಮತ್ತೆ ಇಲ್ಲಿದೆ — ನಿಮ್ಮ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳಿ."
  ),
  tryAgainHeading: L("🔄 Try Again", "🔄 మళ్ళీ ప్రయత్నించండి", "🔄 மீண்டும் முயற்சிக்கவும்", "🔄 ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ"),
  reviewNextTopic: L("Review Next Topic →", "తదుపరి అంశం సమీక్ష →", "அடுத்த தலைப்பை மதிப்பாய்வு →", "ಮುಂದಿನ ವಿಷಯ ಪರಿಶೀಲನೆ →"),
  finishLesson: L("Finish Lesson →", "పాఠం ముగించండి →", "பாடத்தை முடிக்கவும் →", "ಪಾಠ ಮುಗಿಸಿ →"),
  reviewRetry: L(
    "Read It Again & Retry",
    "మళ్ళీ చదివి, మళ్ళీ ప్రయత్నించండి",
    "மீண்டும் படித்து முயற்சிக்கவும்",
    "ಮತ್ತೆ ಓದಿ ಮತ್ತು ಪ್ರಯತ್ನಿಸಿ"
  ),
  checkPassGotIt: L(
    "🎉 Got it — that's cleared up now!",
    "🎉 అర్థమైంది — ఇప్పుడు స్పష్టంగా ఉంది!",
    "🎉 புரிந்தது — இப்போது தெளிவாக உள்ளது!",
    "🎉 ಅರ್ಥವಾಯಿತು — ಈಗ ಸ್ಪಷ್ಟವಾಗಿದೆ!"
  ),
  checkFailTitle: L(
    "Still not quite — one more look.",
    "ఇంకా సరిగ్గా అర్థం కాలేదు — మరోసారి చూడండి.",
    "இன்னும் சரியாக இல்லை — மீண்டும் ஒருமுறை பாருங்கள்.",
    "ಇನ್ನೂ ಸರಿಯಾಗಿಲ್ಲ — ಮತ್ತೊಮ್ಮೆ ನೋಡಿ."
  ),
  checkFailSub: L(
    "Scroll up and re-read this topic, then try once more.",
    "పైకి స్క్రోల్ చేసి ఈ అంశాన్ని మళ్ళీ చదవండి, తర్వాత మళ్ళీ ప్రయత్నించండి.",
    "மேலே சென்று இந்த தலைப்பை மீண்டும் படியுங்கள், பின்னர் மீண்டும் முயற்சிக்கவும்.",
    "ಮೇಲಕ್ಕೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ ಈ ವಿಷಯವನ್ನು ಮತ್ತೆ ಓದಿ, ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
  ),
  completePassTitle: L("Great work!", "చాలా బాగుంది!", "மிகச் சிறப்பு!", "ಅದ್ಭುತ ಕೆಲಸ!"),
  completeReviewedTitle: L("All caught up!", "అంతా అర్థమైంది!", "எல்லாம் புரிந்தது!", "ಎಲ್ಲವೂ ಅರ್ಥವಾಯಿತು!"),
  completePassText: L(
    "You've learned and passed every topic in this lesson.",
    "మీరు ఈ పాఠంలోని ప్రతి అంశాన్ని నేర్చుకుని, విజయవంతంగా పూర్తి చేశారు.",
    "இந்த பாடத்தில் உள்ள ஒவ்வொரு தலைப்பையும் நீங்கள் கற்று, வெற்றிகரமாக முடித்துவிட்டீர்கள்.",
    "ಈ ಪಾಠದಲ್ಲಿನ ಪ್ರತಿ ವಿಷಯವನ್ನೂ ನೀವು ಕಲಿತು, ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ."
  ),
  completeReviewedText: L(
    "You reviewed a few things and now know this lesson well.",
    "మీరు కొన్ని విషయాలను మళ్ళీ సమీక్షించారు, ఇప్పుడు ఈ పాఠం మీకు బాగా అర్థమైంది.",
    "நீங்கள் சில விஷயங்களை மீண்டும் பார்வையிட்டீர்கள், இப்போது இந்த பாடம் உங்களுக்கு நன்றாகப் புரிகிறது.",
    "ನೀವು ಕೆಲವು ವಿಷಯಗಳನ್ನು ಮತ್ತೆ ಪರಿಶೀಲಿಸಿದ್ದೀರಿ, ಈಗ ಈ ಪಾಠ ನಿಮಗೆ ಚೆನ್ನಾಗಿ ಅರ್ಥವಾಗಿದೆ."
  ),
  viewCertificate: L("View Certificate", "సర్టిఫికెట్ చూడండి", "சான்றிதழைப் பார்க்கவும்", "ಪ್ರಮಾಣಪತ್ರ ವೀಕ್ಷಿಸಿ"),
  continueNextLesson: L(
    "Continue to Next Lesson →",
    "తదుపరి పాఠానికి కొనసాగండి →",
    "அடுத்த பாடத்திற்குச் செல்லவும் →",
    "ಮುಂದಿನ ಪಾಠಕ್ಕೆ ಮುಂದುವರಿಸಿ →"
  ),
  backToModule: L("Back to Module", "మాడ్యూల్‌కు తిరిగి వెళ్ళండి", "தொகுதிக்குத் திரும்பு", "ಮಾಡ್ಯೂಲ್‌ಗೆ ಹಿಂತಿರುಗಿ"),
  moduleCompleteTitle: L(
    "Module {n} Complete!",
    "మాడ్యూల్ {n} పూర్తయింది!",
    "தொகுதி {n} முடிந்தது!",
    "ಮಾಡ್ಯೂಲ್ {n} ಪೂರ್ಣಗೊಂಡಿದೆ!"
  ),
  moduleCompleteText: L(
    'You\'ve finished "{title}". Great job working through every lesson and quiz on your own.',
    '"{title}" మీరు పూర్తి చేశారు. ప్రతి పాఠం మరియు క్విజ్‌ని మీ అంతట మీరు పూర్తి చేసినందుకు అభినందనలు.',
    '"{title}" ஐ நீங்கள் முடித்துவிட்டீர்கள். ஒவ்வொரு பாடத்தையும் வினாடி வினாவையும் நீங்களே முடித்தமைக்கு பாராட்டுகள்.',
    '"{title}" ಅನ್ನು ನೀವು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ. ಪ್ರತಿ ಪಾಠ ಮತ್ತು ರಸಪ್ರಶ್ನೆಯನ್ನು ನೀವೇ ಪೂರ್ಣಗೊಳಿಸಿದ್ದಕ್ಕೆ ಅಭಿನಂದನೆಗಳು.'
  ),
  backToDashboard: L("Back to Dashboard", "డాష్‌బోర్డ్‌కు తిరిగి వెళ్ళండి", "டாஷ்போர்டுக்குத் திரும்பு", "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ"),
  reviewModule: L("Review Module", "మాడ్యూల్ సమీక్షించండి", "தொகுதியை மதிப்பாய்வு செய்யவும்", "ಮಾಡ್ಯೂಲ್ ಪರಿಶೀಲಿಸಿ"),
  nextModuleComingSoon: L(
    'Module {n}: "{title}" is coming soon.',
    'మాడ్యూల్ {n}: "{title}" త్వరలో వస్తుంది.',
    'தொகுதி {n}: "{title}" விரைவில் வரும்.',
    'ಮಾಡ್ಯೂಲ್ {n}: "{title}" ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತದೆ.'
  ),
  tapToReveal: L(
    "👆 Tap to see what this means",
    "👆 దీని అర్థం చూడటానికి నొక్కండి",
    "👆 இதன் பொருளைப் பார்க்க தட்டவும்",
    "👆 ಇದರ ಅರ್ಥ ನೋಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ"
  ),
  langPickerTitle: L(
    "Choose Your Language",
    "మీ భాషను ఎంచుకోండి",
    "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ"
  ),
  langPickerSub: L(
    "Select the language you'd like to learn in. You can change this anytime.",
    "మీరు నేర్చుకోవాలనుకుంటున్న భాషను ఎంచుకోండి. దీన్ని మీరు ఎప్పుడైనా మార్చుకోవచ్చు.",
    "நீங்கள் கற்க விரும்பும் மொழியைத் தேர்ந்தெடுக்கவும். இதை நீங்கள் எப்போது வேண்டுமானாலும் மாற்றலாம்.",
    "ನೀವು ಕಲಿಯಲು ಬಯಸುವ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಇದನ್ನು ನೀವು ಯಾವಾಗ ಬೇಕಾದರೂ ಬದಲಾಯಿಸಬಹುದು."
  ),
  langContinue: L("Continue →", "కొనసాగించండి →", "தொடரவும் →", "ಮುಂದುವರಿಸಿ →"),
  changeLanguage: L("Language", "భాష", "மொழி", "ಭಾಷೆ"),
  trueLabel: L("True", "నిజం", "உண்மை", "ನಿಜ"),
  falseLabel: L("False", "అబద్ధం", "பொய்", "ಸುಳ್ಳು"),
};

export function ui(key, lang, vars) {
  const entry = UI[key];
  let text = entry ? entry[lang] || entry.en : key;
  if (vars) {
    Object.keys(vars).forEach((k) => {
      text = text.split(`{${k}}`).join(String(vars[k]));
    });
  }
  return text;
}
