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

  landingHeroTitle: L(
    "Learn to Serve Farmers Better — At Your Own Pace",
    "రైతులకు మెరుగ్గా సేవ చేయడం నేర్చుకోండి — మీ స్వంత వేగంతో",
    "விவசாயிகளுக்கு சிறப்பாக சேவை செய்யக் கற்றுக்கொள்ளுங்கள் — உங்கள் சொந்த வேகத்தில்",
    "ರೈತರಿಗೆ ಉತ್ತಮವಾಗಿ ಸೇವೆ ಸಲ್ಲಿಸಲು ಕಲಿಯಿರಿ — ನಿಮ್ಮ ಸ್ವಂತ ವೇಗದಲ್ಲಿ"
  ),
  landingHeroSubtitle: L(
    "A free, self-paced training course for Shreeja Sahayaks and field staff. No instructor needed — learn step by step, in the language you're most comfortable with.",
    "శ్రీజ సహాయక్‌లు, క్షేత్ర సిబ్బంది కోసం ఉచిత, స్వీయ-వేగ శిక్షణ కోర్సు. బోధకుడు అవసరం లేదు — మీకు సౌకర్యవంతమైన భాషలో, దశలవారీగా నేర్చుకోండి.",
    "ஷ்ரீஜா சகாயக்கள் மற்றும் கள ஊழியர்களுக்கான இலவச, சுய-வேக பயிற்சி பாடநெறி. பயிற்சியாளர் தேவையில்லை — உங்களுக்கு வசதியான மொழியில், படிப்படியாக கற்றுக்கொள்ளுங்கள்.",
    "ಶ್ರೀಜಾ ಸಹಾಯಕ್‌ಗಳು ಮತ್ತು ಕ್ಷೇತ್ರ ಸಿಬ್ಬಂದಿಗಾಗಿ ಉಚಿತ, ಸ್ವಯಂ-ವೇಗದ ತರಬೇತಿ ಕೋರ್ಸ್. ತರಬೇತುದಾರ ಅಗತ್ಯವಿಲ್ಲ — ನಿಮಗೆ ಆರಾಮದಾಯಕವಾದ ಭಾಷೆಯಲ್ಲಿ, ಹಂತ ಹಂತವಾಗಿ ಕಲಿಯಿರಿ."
  ),
  landingGetStartedButton: L("Get Started →", "ప్రారంభించండి →", "தொடங்குங்கள் →", "ಪ್ರಾರಂಭಿಸಿ →"),
  landingFeature1Title: L("12 Modules", "12 మాడ్యూళ్లు", "12 தொகுதிகள்", "12 ಮಾಡ್ಯೂಲ್‌ಗಳು"),
  landingFeature1Text: L(
    "From dairy basics to milk pricing, MPP routes, and cost management.",
    "పాడి ప్రాథమికాల నుండి పాల ధర, MPP మార్గాలు, ఖర్చు నిర్వహణ వరకు.",
    "பால் அடிப்படைகளிலிருந்து பால் விலை, MPP வழிகள், செலவு நிர்வாகம் வரை.",
    "ಡೈರಿ ಮೂಲಭೂತ ಅಂಶಗಳಿಂದ ಹಾಲಿನ ಬೆಲೆ, MPP ಮಾರ್ಗಗಳು, ವೆಚ್ಚ ನಿರ್ವಹಣೆಯವರೆಗೆ."
  ),
  landingFeature2Title: L("4 Languages", "4 భాషలు", "4 மொழிகள்", "4 ಭಾಷೆಗಳು"),
  landingFeature2Text: L(
    "Learn in English, Telugu, Tamil, or Kannada — whichever you're comfortable with.",
    "ఆంగ్లం, తెలుగు, తమిళం, లేదా కన్నడలో నేర్చుకోండి — మీకు సౌకర్యవంతమైనది ఏదైనా.",
    "ஆங்கிலம், தெலுங்கு, தமிழ், அல்லது கன்னடத்தில் கற்றுக்கொள்ளுங்கள் — உங்களுக்கு வசதியானது எதுவாக இருந்தாலும்.",
    "ಇಂಗ್ಲಿಷ್, ತೆಲುಗು, ತಮಿಳು, ಅಥವಾ ಕನ್ನಡದಲ್ಲಿ ಕಲಿಯಿರಿ — ನಿಮಗೆ ಆರಾಮದಾಯಕವಾದುದು ಯಾವುದಾದರೂ."
  ),
  landingFeature3Title: L(
    "Learn At Your Own Pace",
    "మీ స్వంత వేగంతో నేర్చుకోండి",
    "உங்கள் சொந்த வேகத்தில் கற்றுக்கொள்ளுங்கள்",
    "ನಿಮ್ಮ ಸ್ವಂತ ವೇಗದಲ್ಲಿ ಕಲಿಯಿರಿ"
  ),
  landingFeature3Text: L(
    "Examples and interactive lessons first, a quick quiz at the end, and a certificate when you finish.",
    "ముందుగా ఉదాహరణలు, ఆసక్తికరమైన పాఠాలు, చివర్లో త్వరిత క్విజ్, పూర్తి చేసినప్పుడు సర్టిఫికెట్.",
    "முதலில் உதாரணங்களும் சுவாரஸ்யமான பாடங்களும், இறுதியில் ஒரு விரைவான வினாடி வினா, முடித்தவுடன் ஒரு சான்றிதழ்.",
    "ಮೊದಲು ಉದಾಹರಣೆಗಳು ಮತ್ತು ಆಸಕ್ತಿದಾಯಕ ಪಾಠಗಳು, ಕೊನೆಯಲ್ಲಿ ತ್ವರಿತ ರಸಪ್ರಶ್ನೆ, ಮುಗಿಸಿದಾಗ ಪ್ರಮಾಣಪತ್ರ."
  ),
  landingSupportedBy: L("Supported by", "మద్దతు ఇస్తున్నవారు", "ஆதரவு அளிப்பவர்கள்", "ಬೆಂಬಲಿಸುವವರು"),

  // ==========================================================================
  // Accounts, admin portal and certificates — added alongside real employee
  // logins. Everything below is new UI chrome; no existing key above this
  // line was changed.
  // ==========================================================================
  moduleCompleteButton: L("View Module Summary →", "మాడ్యూల్ సారాంశం చూడండి →", "தொகுதி சுருக்கத்தைப் பார்க்கவும் →", "ಮಾಡ್ಯೂಲ್ ಸಾರಾಂಶ ವೀಕ್ಷಿಸಿ →"),

  employeeLoginButton: L("👤 Employee Login →", "👤 ఉద్యోగి లాగిన్ →", "👤 பணியாளர் உள்நுழைவு →", "👤 ಉದ್ಯೋಗಿ ಲಾಗಿನ್ →"),
  adminLoginButtonLabel: L("🧑‍💼 Admin Login →", "🧑‍💼 అడ్మిన్ లాగిన్ →", "🧑‍💼 நிர்வாகி உள்நுழைவு →", "🧑‍💼 ನಿರ್ವಾಹಕ ಲಾಗಿನ್ →"),

  loginTitle: L("Sign In", "సైన్ ఇన్", "உள்நுழைவு", "ಸೈನ್ ಇನ್"),
  employeeLoginTitle: L("👤 Employee Sign In", "👤 ఉద్యోగి సైన్ ఇన్", "👤 பணியாளர் உள்நுழைவு", "👤 ಉದ್ಯೋಗಿ ಸೈನ್ ಇನ್"),
  adminLoginTitle: L("🧑‍💼 Admin Sign In", "🧑‍💼 అడ్మిన్ సైన్ ఇన్", "🧑‍💼 நிர்வாகி உள்நுழைவு", "🧑‍💼 ನಿರ್ವಾಹಕ ಸೈನ್ ಇನ್"),
  loginSubtitle: L(
    "Enter your email and password to continue.",
    "కొనసాగించడానికి మీ ఇమెయిల్ మరియు పాస్‌వర్డ్ నమోదు చేయండి.",
    "தொடர உங்கள் மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.",
    "ಮುಂದುವರಿಸಲು ನಿಮ್ಮ ಇಮೇಲ್ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ."
  ),
  loginIdLabel: L("Email Address", "ఇమెయిల్ చిరునామా", "மின்னஞ்சல் முகவரி", "ಇಮೇಲ್ ವಿಳಾಸ"),
  adminUsernameLabel: L("Username", "యూజర్‌నేమ్", "பயனர்பெயர்", "ಬಳಕೆದಾರ ಹೆಸರು"),
  passwordLabel: L("Password", "పాస్‌వర్డ్", "கடவுச்சொல்", "ಪಾಸ್‌ವರ್ಡ್"),
  loginButton: L("Sign In", "సైన్ ఇన్ చేయండి", "உள்நுழையவும்", "ಸೈನ್ ಇನ್ ಮಾಡಿ"),
  loginSigningIn: L("Signing in…", "సైన్ ఇన్ అవుతోంది…", "உள்நுழைகிறது…", "ಸೈನ್ ಇನ್ ಆಗುತ್ತಿದೆ…"),
  loginErrorGeneric: L(
    "Something went wrong. Please try again.",
    "ఏదో పొరపాటు జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి.",
    "ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்.",
    "ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
  ),
  loginWrongPortalEmployee: L(
    "This is an employee account. Please use Employee Login instead.",
    "ఇది ఉద్యోగి ఖాతా. దయచేసి బదులుగా ఉద్యోగి లాగిన్ ఉపయోగించండి.",
    "இது ஒரு பணியாளர் கணக்கு. தயவுசெய்து பணியாளர் உள்நுழைவைப் பயன்படுத்தவும்.",
    "ಇದು ಉದ್ಯೋಗಿ ಖಾತೆ. ದಯವಿಟ್ಟು ಬದಲಿಗೆ ಉದ್ಯೋಗಿ ಲಾಗಿನ್ ಬಳಸಿ."
  ),
  loginWrongPortalAdmin: L(
    "This is an admin account. Please use Admin Login instead.",
    "ఇది అడ్మిన్ ఖాతా. దయచేసి బదులుగా అడ్మిన్ లాగిన్ ఉపయోగించండి.",
    "இது ஒரு நிர்வாகி கணக்கு. தயவுசெய்து நிர்வாகி உள்நுழைவைப் பயன்படுத்தவும்.",
    "ಇದು ನಿರ್ವಾಹಕ ಖಾತೆ. ದಯವಿಟ್ಟು ಬದಲಿಗೆ ನಿರ್ವಾಹಕ ಲಾಗಿನ್ ಬಳಸಿ."
  ),
  logoutButton: L("Log out", "లాగ్ అవుట్", "வெளியேறு", "ಲಾಗ್ ಔಟ್"),
  adminNavLink: L("Admin", "అడ్మిన్", "நிர்வாகி", "ನಿರ್ವಾಹಕ"),

  changePasswordTitle: L("Set a New Password", "కొత్త పాస్‌వర్డ్ సెట్ చేయండి", "புதிய கடவுச்சொல்லை அமைக்கவும்", "ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ಹೊಂದಿಸಿ"),
  changePasswordSubtitle: L(
    "For your security, please set your own password before continuing.",
    "మీ భద్రత కోసం, కొనసాగించే ముందు దయచేసి మీ స్వంత పాస్‌వర్డ్‌ను సెట్ చేయండి.",
    "உங்கள் பாதுகாப்பிற்காக, தொடர்வதற்கு முன் உங்கள் சொந்த கடவுச்சொல்லை அமைக்கவும்.",
    "ನಿಮ್ಮ ಸುರಕ್ಷತೆಗಾಗಿ, ಮುಂದುವರಿಸುವ ಮೊದಲು ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸ್ವಂತ ಪಾಸ್‌ವರ್ಡ್ ಹೊಂದಿಸಿ."
  ),
  currentPasswordLabel: L("Current password", "ప్రస్తుత పాస్‌వర్డ్", "தற்போதைய கடவுச்சொல்", "ಪ್ರಸ್ತುತ ಪಾಸ್‌ವರ್ಡ್"),
  newPasswordLabel: L("New password", "కొత్త పాస్‌వర్డ్", "புதிய கடவுச்சொல்", "ಹೊಸ ಪಾಸ್‌ವರ್ಡ್"),
  newPasswordHint: L("At least 6 characters.", "కనీసం 6 అక్షరాలు.", "குறைந்தது 6 எழுத்துகள்.", "ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳು."),
  changePasswordButton: L("Save New Password", "కొత్త పాస్‌వర్డ్ సేవ్ చేయండి", "புதிய கடவுச்சொல்லைச் சேமிக்கவும்", "ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ಉಳಿಸಿ"),
  changePasswordSaving: L("Saving…", "సేవ్ అవుతోంది…", "சேமிக்கிறது…", "ಉಳಿಸಲಾಗುತ್ತಿದೆ…"),

  // Admin portal
  adminDashboardTitle: L("🧑‍💼 Admin Dashboard", "🧑‍💼 అడ్మిన్ డాష్‌బోర్డ్", "🧑‍💼 நிர்வாகி டாஷ்போர்டு", "🧑‍💼 ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್"),
  adminDashboardTagline: L(
    "See every employee's progress, and manage employee accounts.",
    "ప్రతి ఉద్యోగి పురోగతిని చూడండి, ఉద్యోగి ఖాతాలను నిర్వహించండి.",
    "ஒவ்வொரு பணியாளரின் முன்னேற்றத்தையும் காணுங்கள், பணியாளர் கணக்குகளை நிர்வகிக்கவும்.",
    "ಪ್ರತಿ ಉದ್ಯೋಗಿಯ ಪ್ರಗತಿಯನ್ನು ನೋಡಿ, ಉದ್ಯೋಗಿ ಖಾತೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ."
  ),
  adminAddEmployeeButton: L("+ Add Employee", "+ ఉద్యోగిని జోడించండి", "+ பணியாளரைச் சேர்க்கவும்", "+ ಉದ್ಯೋಗಿಯನ್ನು ಸೇರಿಸಿ"),
  adminExportCsvButton: L("⬇ Export CSV", "⬇ CSV డౌన్‌లోడ్ చేయండి", "⬇ CSV பதிவிறக்கவும்", "⬇ CSV ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ"),
  adminSearchPlaceholder: L(
    "Search by name or login ID…",
    "పేరు లేదా లాగిన్ ఐడీ ద్వారా వెతకండి…",
    "பெயர் அல்லது உள்நுழைவு ஐடி மூலம் தேடவும்…",
    "ಹೆಸರು ಅಥವಾ ಲಾಗಿನ್ ಐಡಿ ಮೂಲಕ ಹುಡುಕಿ…"
  ),
  adminTableName: L("Name", "పేరు", "பெயர்", "ಹೆಸರು"),
  adminTableLoginId: L("Login ID", "లాగిన్ ఐడీ", "உள்நுழைவு ஐடி", "ಲಾಗಿನ್ ಐಡಿ"),
  adminTableProgress: L("Progress", "పురోగతి", "முன்னேற்றம்", "ಪ್ರಗತಿ"),
  adminTableModules: L("Modules", "మాడ్యూళ్లు", "தொகுதிகள்", "ಮಾಡ್ಯೂಲ್‌ಗಳು"),
  adminTableLastActive: L("Last Active", "చివరిసారి క్రియాశీలం", "கடைசியாக செயலில் இருந்தது", "ಕೊನೆಯ ಸಕ್ರಿಯ"),
  adminTableStatus: L("Status", "స్థితి", "நிலை", "ಸ್ಥಿತಿ"),
  adminStatusActive: L("Active", "సక్రియం", "செயலில்", "ಸಕ್ರಿಯ"),
  adminStatusInactive: L("Inactive", "నిష్క్రియం", "செயலற்றது", "ನಿಷ್ಕ್ರಿಯ"),
  adminNoEmployees: L(
    "No employees yet. Add your first one to get started.",
    "ఇంకా ఉద్యోగులు లేరు. ప్రారంభించడానికి మీ మొదటి వ్యక్తిని జోడించండి.",
    "இதுவரை பணியாளர்கள் இல்லை. தொடங்குவதற்கு உங்கள் முதல் பணியாளரைச் சேர்க்கவும்.",
    "ಇನ್ನೂ ಉದ್ಯೋಗಿಗಳಿಲ್ಲ. ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ಮೊದಲ ಉದ್ಯೋಗಿಯನ್ನು ಸೇರಿಸಿ."
  ),
  adminNeverActive: L("Never", "ఎప్పుడూ లేదు", "ஒருபோதும் இல்லை", "ಎಂದಿಗೂ ಇಲ್ಲ"),

  adminNewEmployeeTitle: L("Add Employee", "ఉద్యోగిని జోడించండి", "பணியாளரைச் சேர்க்கவும்", "ಉದ್ಯೋಗಿಯನ್ನು ಸೇರಿಸಿ"),
  adminDisplayNameLabel: L("Full name", "పూర్తి పేరు", "முழுப் பெயர்", "ಪೂರ್ಣ ಹೆಸರು"),
  adminLoginIdHint: L(
    "Must be a real email address the employee can access.",
    "ఉద్యోగి యాక్సెస్ చేయగల నిజమైన ఇమెయిల్ చిరునామా అయి ఉండాలి.",
    "பணியாளர் அணுகக்கூடிய உண்மையான மின்னஞ்சல் முகவரியாக இருக்க வேண்டும்.",
    "ಉದ್ಯೋಗಿ ಪ್ರವೇಶಿಸಬಹುದಾದ ನಿಜವಾದ ಇಮೇಲ್ ವಿಳಾಸವಾಗಿರಬೇಕು."
  ),
  adminTempPasswordLabel: L("Temporary password", "తాత్కాలిక పాస్‌వర్డ్", "தற்காலிக கடவுச்சொல்", "ತಾತ್ಕಾಲಿಕ ಪಾಸ್‌ವರ್ಡ್"),
  adminTempPasswordHint: L(
    "The employee will be asked to set their own password on first login.",
    "మొదటి లాగిన్‌లో ఉద్యోగి తన స్వంత పాస్‌వర్డ్‌ను సెట్ చేయమని అడగబడతారు.",
    "முதல் உள்நுழைவின்போது பணியாளர் தங்கள் சொந்த கடவுச்சொல்லை அமைக்கும்படி கேட்கப்படுவார்.",
    "ಮೊದಲ ಲಾಗಿನ್‌ನಲ್ಲಿ ಉದ್ಯೋಗಿಗೆ ತಮ್ಮ ಸ್ವಂತ ಪಾಸ್‌ವರ್ಡ್ ಹೊಂದಿಸಲು ಕೇಳಲಾಗುತ್ತದೆ."
  ),
  adminCreateButton: L("Create Account", "ఖాతా సృష్టించండి", "கணக்கை உருவாக்கவும்", "ಖಾತೆ ರಚಿಸಿ"),
  adminCreating: L("Creating…", "సృష్టిస్తోంది…", "உருவாக்குகிறது…", "ರಚಿಸಲಾಗುತ್ತಿದೆ…"),
  adminCancelButton: L("Cancel", "రద్దు చేయండి", "ரத்துசெய்", "ರದ್ದುಮಾಡಿ"),

  adminResetPasswordButton: L("Reset Password", "పాస్‌వర్డ్ రీసెట్ చేయండి", "கடவுச்சொல்லை மீட்டமைக்கவும்", "ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ"),
  adminDeactivateButton: L("Deactivate", "నిష్క్రియం చేయండి", "செயலிழக்கச் செய்", "ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ"),
  adminReactivateButton: L("Reactivate", "మళ్ళీ సక్రియం చేయండి", "மீண்டும் செயல்படுத்து", "ಮತ್ತೆ ಸಕ್ರಿಯಗೊಳಿಸಿ"),
  adminResetPasswordPromptTitle: L("Reset Password", "పాస్‌వర్డ్ రీసెట్ చేయండి", "கடவுச்சொல்லை மீட்டமைக்கவும்", "ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ"),
  adminResetPasswordPromptSub: L(
    "We'll email the employee a link to set a new password themselves.",
    "కొత్త పాస్‌వర్డ్‌ను తామే సెట్ చేసుకోవడానికి మేము ఉద్యోగికి ఒక లింక్‌ను ఇమెయిల్ చేస్తాము.",
    "புதிய கடவுச்சொல்லை அவரே அமைத்துக்கொள்ள ஒரு இணைப்பை பணியாளருக்கு மின்னஞ்சல் செய்வோம்.",
    "ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ಅವರೇ ಹೊಂದಿಸಲು ನಾವು ಉದ್ಯೋಗಿಗೆ ಒಂದು ಲಿಂಕ್ ಅನ್ನು ಇಮೇಲ್ ಮಾಡುತ್ತೇವೆ."
  ),
  adminSendResetEmailButton: L("Send Reset Email", "రీసెట్ ఇమెయిల్ పంపండి", "மீட்டமைப்பு மின்னஞ்சலை அனுப்பவும்", "ಮರುಹೊಂದಿಸುವ ಇಮೇಲ್ ಕಳುಹಿಸಿ"),
  adminResetEmailSentNote: L(
    "Reset email sent to {email}.",
    "{email}కు రీసెట్ ఇమెయిల్ పంపబడింది.",
    "{email} க்கு மீட்டமைப்பு மின்னஞ்சல் அனுப்பப்பட்டது.",
    "{email} ಗೆ ಮರುಹೊಂದಿಸುವ ಇಮೇಲ್ ಕಳುಹಿಸಲಾಗಿದೆ."
  ),
  adminModuleLabel: L("Module {n}", "మాడ్యూల్ {n}", "தொகுதி {n}", "ಮಾಡ್ಯೂಲ್ {n}"),
  adminLessonsCompleteLabel: L("{completed}/{total} lessons", "{completed}/{total} పాఠాలు", "{completed}/{total} பாடங்கள்", "{completed}/{total} ಪಾಠಗಳು"),
  adminOverallLabel: L("Overall completion", "మొత్తం పూర్తి", "மொத்த முடிவு", "ಒಟ್ಟು ಪೂರ್ಣಗೊಳಿಕೆ"),
  adminLessonStatusComplete: L("✓ Completed", "✓ పూర్తయింది", "✓ முடிந்தது", "✓ ಪೂರ್ಣಗೊಂಡಿದೆ"),
  adminLessonStatusNotStarted: L("Not started", "ప్రారంభించలేదు", "தொடங்கவில்லை", "ಪ್ರಾರಂಭಿಸಿಲ್ಲ"),
  adminLessonStatusLocked: L("🔒 Locked", "🔒 లాక్ చేయబడింది", "🔒 பூட்டப்பட்டுள்ளது", "🔒 ಲಾಕ್ ಆಗಿದೆ"),
  adminLessonScoreLabel: L("Best score {score}%", "ఉత్తమ స్కోరు {score}%", "சிறந்த மதிப்பெண் {score}%", "ಅತ್ಯುತ್ತಮ ಅಂಕ {score}%"),
  adminLessonCompletedOnLabel: L("Completed {date}", "{date}న పూర్తయింది", "{date} அன்று முடிந்தது", "{date} ರಂದು ಪೂರ್ಣಗೊಂಡಿದೆ"),
  adminExpandModuleHint: L(
    "Click a module to see lesson-by-lesson progress",
    "పాఠం వారీగా పురోగతిని చూడటానికి ఒక మాడ్యూల్‌పై క్లిక్ చేయండి",
    "பாடம் வாரியான முன்னேற்றத்தைக் காண ஒரு தொகுதியைக் கிளிக் செய்யவும்",
    "ಪಾಠವಾರು ಪ್ರಗತಿಯನ್ನು ನೋಡಲು ಒಂದು ಮಾಡ್ಯೂಲ್ ಕ್ಲಿಕ್ ಮಾಡಿ"
  ),

  // Certificates
  myCertificatesNav: L("🎓 Certificates", "🎓 సర్టిఫికెట్లు", "🎓 சான்றிதழ்கள்", "🎓 ಪ್ರಮಾಣಪತ್ರಗಳು"),
  certificatesPageTitle: L("🎓 My Certificates", "🎓 నా సర్టిఫికెట్లు", "🎓 எனது சான்றிதழ்கள்", "🎓 ನನ್ನ ಪ್ರಮಾಣಪತ್ರಗಳು"),
  certificatesPageTagline: L(
    "Every lesson you complete earns its own certificate. Finish all 12 modules to earn the full course certificate.",
    "మీరు పూర్తి చేసే ప్రతి పాఠం దాని స్వంత సర్టిఫికెట్‌ను సంపాదిస్తుంది. పూర్తి కోర్సు సర్టిఫికెట్ పొందడానికి అన్ని 12 మాడ్యూళ్లను పూర్తి చేయండి.",
    "நீங்கள் முடிக்கும் ஒவ்வொரு பாடமும் அதற்கான சான்றிதழைப் பெறும். முழு பாடநெறி சான்றிதழைப் பெற அனைத்து 12 தொகுதிகளையும் முடிக்கவும்.",
    "ನೀವು ಪೂರ್ಣಗೊಳಿಸುವ ಪ್ರತಿ ಪಾಠವೂ ತನ್ನದೇ ಆದ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಗಳಿಸುತ್ತದೆ. ಪೂರ್ಣ ಕೋರ್ಸ್ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಲು ಎಲ್ಲಾ 12 ಮಾಡ್ಯೂಲ್‌ಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ."
  ),
  certCourseCardTitle: L(
    "Course Completion Certificate",
    "కోర్సు పూర్తి సర్టిఫికెట్",
    "பாடநெறி நிறைவு சான்றிதழ்",
    "ಕೋರ್ಸ್ ಪೂರ್ಣಗೊಳಿಕೆ ಪ್ರಮಾಣಪತ್ರ"
  ),
  certCourseCardEarnedText: L(
    "You've completed every lesson in every module. Congratulations! 🎉",
    "మీరు ప్రతి మాడ్యూల్‌లోని ప్రతి పాఠాన్ని పూర్తి చేశారు. అభినందనలు! 🎉",
    "நீங்கள் ஒவ்வொரு தொகுதியிலும் உள்ள ஒவ்வொரு பாடத்தையும் முடித்துவிட்டீர்கள். வாழ்த்துக்கள்! 🎉",
    "ನೀವು ಪ್ರತಿ ಮಾಡ್ಯೂಲ್‌ನಲ್ಲಿನ ಪ್ರತಿ ಪಾಠವನ್ನೂ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ. ಅಭಿನಂದನೆಗಳು! 🎉"
  ),
  certCourseCardLockedText: L(
    "{done}/{total} lessons completed — finish them all to earn this certificate.",
    "{done}/{total} పాఠాలు పూర్తయ్యాయి — ఈ సర్టిఫికెట్ పొందడానికి అన్నింటినీ పూర్తి చేయండి.",
    "{done}/{total} பாடங்கள் முடிந்தன — இந்த சான்றிதழைப் பெற அனைத்தையும் முடிக்கவும்.",
    "{done}/{total} ಪಾಠಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ — ಈ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಲು ಎಲ್ಲವನ್ನೂ ಪೂರ್ಣಗೊಳಿಸಿ."
  ),
  certLessonLockedBadge: L("Not yet earned", "ఇంకా సంపాదించలేదు", "இன்னும் பெறப்படவில்லை", "ಇನ್ನೂ ಗಳಿಸಿಲ್ಲ"),
  certViewButton: L("View Certificate", "సర్టిఫికెట్ చూడండి", "சான்றிதழைப் பார்க்கவும்", "ಪ್ರಮಾಣಪತ್ರ ವೀಕ್ಷಿಸಿ"),
  certNotEarnedTitle: L(
    "Certificate Not Yet Earned",
    "సర్టిఫికెట్ ఇంకా సంపాదించలేదు",
    "சான்றிதழ் இன்னும் பெறப்படவில்லை",
    "ಪ್ರಮಾಣಪತ್ರ ಇನ್ನೂ ಗಳಿಸಿಲ್ಲ"
  ),
  certNotEarnedLessonText: L(
    "Complete this lesson's quiz to earn its certificate.",
    "దీని సర్టిఫికెట్ పొందడానికి ఈ పాఠం క్విజ్‌ను పూర్తి చేయండి.",
    "இதற்கான சான்றிதழைப் பெற இந்த பாடத்தின் வினாடி வினாவை முடிக்கவும்.",
    "ಇದರ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಲು ಈ ಪಾಠದ ರಸಪ್ರಶ್ನೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ."
  ),
  certNotEarnedCourseText: L(
    "Complete every lesson in every module to earn the full course completion certificate.",
    "పూర్తి కోర్సు పూర్తి సర్టిఫికెట్ పొందడానికి ప్రతి మాడ్యూల్‌లోని ప్రతి పాఠాన్ని పూర్తి చేయండి.",
    "முழு பாடநெறி நிறைவு சான்றிதழைப் பெற ஒவ்வொரு தொகுதியிலும் உள்ள ஒவ்வொரு பாடத்தையும் முடிக்கவும்.",
    "ಪೂರ್ಣ ಕೋರ್ಸ್ ಪೂರ್ಣಗೊಳಿಕೆ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಲು ಪ್ರತಿ ಮಾಡ್ಯೂಲ್‌ನಲ್ಲಿನ ಪ್ರತಿ ಪಾಠವನ್ನೂ ಪೂರ್ಣಗೊಳಿಸಿ."
  ),
  certPrintButton: L(
    "🖨 Print / Save as PDF",
    "🖨 ప్రింట్ చేయండి / PDFగా సేవ్ చేయండి",
    "🖨 அச்சிடவும் / PDF ஆக சேமிக்கவும்",
    "🖨 ಮುದ್ರಿಸಿ / PDF ಆಗಿ ಉಳಿಸಿ"
  ),
  certIssuerName: L(
    "Shreeja Learning Academy",
    "శ్రీజ లెర్నింగ్ అకాడమీ",
    "ஷ்ரீஜா கற்றல் அகாடமி",
    "ಶ್ರೀಜಾ ಕಲಿಕಾ ಅಕಾಡೆಮಿ"
  ),
  certTitleLesson: L("Certificate of Completion", "పూర్తి సర్టిఫికెట్", "நிறைவு சான்றிதழ்", "ಪೂರ್ಣಗೊಳಿಕೆ ಪ್ರಮಾಣಪತ್ರ"),
  certTitleCourse: L("Certificate of Completion", "పూర్తి సర్టిఫికెట్", "நிறைவு சான்றிதழ்", "ಪೂರ್ಣಗೊಳಿಕೆ ಪ್ರಮಾಣಪತ್ರ"),
  certPresentedTo: L(
    "This certificate is proudly presented to",
    "ఈ సర్టిఫికెట్ గర్వంగా ఇవ్వబడుతుంది",
    "இந்த சான்றிதழ் பெருமையுடன் வழங்கப்படுகிறது",
    "ಈ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಹೆಮ್ಮೆಯಿಂದ ನೀಡಲಾಗುತ್ತಿದೆ"
  ),
  certLessonBody: L(
    "for successfully completing the lesson",
    "పాఠాన్ని విజయవంతంగా పూర్తి చేసినందుకు",
    "பாடத்தை வெற்றிகரமாக முடித்ததற்காக",
    "ಪಾಠವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದಕ್ಕಾಗಿ"
  ),
  certModuleOfBody: L("in Module {n}: {title}", "మాడ్యూల్ {n}లో: {title}", "தொகுதி {n} இல்: {title}", "ಮಾಡ್ಯೂಲ್ {n} ರಲ್ಲಿ: {title}"),
  certCourseBody: L(
    "for successfully completing the full 12-module training program",
    "పూర్తి 12-మాడ్యూళ్ల శిక్షణ కార్యక్రమాన్ని విజయవంతంగా పూర్తి చేసినందుకు",
    "முழு 12-தொகுதி பயிற்சி நிரலை வெற்றிகரமாக முடித்ததற்காக",
    "ಪೂರ್ಣ 12-ಮಾಡ್ಯೂಲ್ ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದಕ್ಕಾಗಿ"
  ),
  certCourseProgram: L(
    "Shreeja Mahila Milk Producer Company — Training Program",
    "శ్రీజ మహిళా మిల్క్ ప్రొడ్యూసర్ కంపెనీ — శిక్షణ కార్యక్రమం",
    "ஷ்ரீஜா மகிளா மில்க் புரொடியூசர் கம்பெனி — பயிற்சி நிரல்",
    "ಶ್ರೀಜಾ ಮಹಿಳಾ ಮಿಲ್ಕ್ ಪ್ರೊಡ್ಯೂಸರ್ ಕಂಪನಿ — ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮ"
  ),
  certScoreLabel: L("Score: {score}%", "స్కోరు: {score}%", "மதிப்பெண்: {score}%", "ಅಂಕ: {score}%"),
  certDateLabel: L("Date: {date}", "తేదీ: {date}", "தேதி: {date}", "ದಿನಾಂಕ: {date}"),
  certIdLabel: L("Certificate ID: {id}", "సర్టిఫికెట్ ఐడీ: {id}", "சான்றிதழ் ஐடி: {id}", "ಪ್ರಮಾಣಪತ್ರ ಐಡಿ: {id}"),
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
