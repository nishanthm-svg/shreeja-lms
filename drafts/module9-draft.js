// ============================================================================
// DRAFT — Module 9: Member Enrolment and Data Collection
// English-only draft content. Written for learners with no formal education
// and no prior dairy knowledge (about a Class 7 reading level).
// Matches the schema used in data.js (see module "m1"). Translation (the
// L() wrapper) will be added later — every string below is plain English.
//
// NOTE ON SOURCE: the original PPTX for this module was an empty/corrupt
// (0-byte) file, so there was no source deck to draw from. The content below
// is built from general, standard practice followed by Indian dairy
// cooperatives (MPOs/MPPs) for member enrolment and daily milk record
// keeping, informed by the MPP/MPO/Sahayak concepts already introduced in
// Module 1 of this course. It is presented as standard practice, not as
// content pulled from a specific deck.
// ============================================================================

export const MODULE_9 = {
  id: "m9",
  number: 9,
  title: "Member Enrolment and Data Collection",
  subtitle:
    "Learn how a farmer becomes a registered MPP member, and how daily milk records are kept accurate and fair for everyone.",
  icon: "milk",
  available: true,
  lessons: [
    // ==================================================================
    // LESSON 1 — Enrolling a New Farmer Member
    // ==================================================================
    {
      id: "m9-l1",
      title: "Enrolling a New Farmer Member",
      estMinutes: 7,
      hook: [
        {
          type: "hero",
          heading: "Welcoming a New Member",
          text: "Before a farmer can sell even one litre of milk at the MPP, they must first become a registered member. Let's learn how this is done, step by step.",
        },
      ],
      topics: [
        {
          id: "t-m9-l1-documents",
          title: "What a New Member Must Provide",
          teach: [
            {
              type: "text",
              heading: "Becoming a Member",
              html: "Before a farmer can sell milk at the MPP and get paid, they must first join as a <b>member</b>. This is called <b>enrolment</b>. Enrolment is not just paperwork — it protects both the farmer and the MPO (Milk Producer Organisation).",
            },
            {
              type: "glossary",
              term: "Enrolment",
              meaning:
                "The process of officially signing up a farmer as a member of the MPP, so they can supply milk and receive payment for it.",
            },
            {
              type: "text",
              heading: "Basic KYC Details",
              html: "Every new member must give some basic details about themselves. This is called <b>KYC</b>, which means 'Know Your Customer'. It proves who the farmer really is, before any money changes hands.",
            },
            {
              type: "glossary",
              term: "KYC (Know Your Customer)",
              meaning:
                "A simple check of a person's identity using official documents, like Aadhaar. It stops fraud and confirms who is really joining as a member.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Aadhaar Card",
                  text: "Proves the farmer's identity and address. A photocopy is kept with the enrolment form.",
                },
                {
                  label: "Bank Account Details",
                  text: "The farmer's own bank account number and IFSC code, so milk payments go directly to them — no cash, no middleman.",
                },
                {
                  label: "Passport-Size Photo",
                  text: "A recent photo for the membership file and, where used, the member's ID card.",
                },
                {
                  label: "Animal Details",
                  text: "How many milk animals the farmer owns (cows or buffaloes), and roughly how much milk each one gives.",
                },
              ],
            },
            {
              type: "callout",
              style: "tip",
              heading: "Why the Bank Account Matters So Much",
              text: "When a farmer's own bank account is on file, payment goes straight to them, automatically, every time. No one else can collect the money on their behalf without their knowledge. This is one of the biggest protections that enrolment gives a farmer.",
            },
            {
              type: "example",
              heading: "Meet Farmer Lakshmi",
              text: "Lakshmi owns two buffaloes and wants to start selling milk at her village MPP. Before she can bring even one litre of milk, the Sahayak asks her for her Aadhaar card, her bank passbook, and details of her animals. Only after this is checked and recorded does she become a registered member.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Why does the MPP collect a farmer's bank account details during enrolment?",
              options: [
                "So the MPO can lend the farmer money",
                "So milk payment goes directly to the farmer, safely and on time",
                "So the farmer can pay a membership fee",
                "It is not really necessary",
              ],
              answer: 1,
              explain:
                "A farmer's own bank account means payment goes straight to them every time — safe, direct, and on time, with no middleman.",
            },
            {
              type: "truefalse",
              q: "KYC means checking who a person really is, using documents like Aadhaar.",
              answer: true,
              explain:
                "Correct. KYC stands for 'Know Your Customer' — it confirms the true identity of the person joining as a member.",
            },
          ],
        },
        {
          id: "t-m9-l1-steps",
          title: "Steps to Register a Member at the MPP",
          teach: [
            {
              type: "text",
              heading: "From Visit to Registered Member",
              html: "Enrolling a new member follows the same basic steps at most MPPs across India. Let's walk through them one by one.",
            },
            {
              type: "text",
              heading: "The Five Steps",
              html: "<b>1. Farmer visits the MPP:</b> The farmer, usually with help from the Sahayak, comes to the MPP to ask about joining.<br><b>2. Fill the enrolment form:</b> Basic details — name, address, family details, and animal details — are written into the official enrolment form.<br><b>3. Collect and verify documents:</b> The Sahayak checks the Aadhaar card and bank passbook copies against the form, to make sure everything matches.<br><b>4. Assign a membership number:</b> Once approved, the farmer gets a unique membership number, or ID. This number is used every single day to record their milk.<br><b>5. Issue a passbook or ID card:</b> The farmer gets their own record book or card, showing their membership number and details.",
            },
            {
              type: "glossary",
              term: "Membership Number",
              meaning:
                "A unique ID number given to each farmer member. It links every milk record, quality test and payment back to that one farmer.",
            },
            {
              type: "callout",
              style: "warning",
              heading: "Never Skip Verification",
              text: "A membership must never be created without checking real documents. Enrolling a person who does not exist, or who is not really the animal owner, can lead to wrong payments and fraud that hurts the whole MPO.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Double-Check Before You Submit",
              text: "Small mistakes — a wrong Aadhaar number, a misspelled name, a wrong account number — can delay a farmer's very first payment. Always read every detail back to the farmer before finishing enrolment.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is a membership number mainly used for?",
              options: [
                "To decide how much land the farmer owns",
                "To link every milk record, test and payment to one farmer",
                "To give the farmer a bank loan",
                "It has no real use",
              ],
              answer: 1,
              explain:
                "Every day's milk record, quality test and payment is linked back to the farmer through their membership number.",
            },
            {
              type: "truefalse",
              q: "It is fine to register a new member without checking their documents, as long as they seem trustworthy.",
              answer: false,
              explain:
                "Every new member's documents must always be verified. Skipping this step can lead to fraud and wrong payments later.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-m9-l1-documents",
            type: "mcq",
            q: "Which of these is NOT something a new member usually needs to provide?",
            options: [
              "Aadhaar card copy",
              "Bank account details",
              "A vehicle registration certificate",
              "Animal details",
            ],
            answer: 2,
            explain:
              "Farmers provide identity proof, bank details and animal details — not a vehicle registration certificate.",
          },
          {
            topicId: "t-m9-l1-steps",
            type: "truefalse",
            q: "A farmer's membership number is only used once, at the time of joining.",
            answer: false,
            explain:
              "The membership number is used every day, for every milk record, test and payment — not just once at joining.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 2 — Recording Milk Data Every Day
    // ==================================================================
    {
      id: "m9-l2",
      title: "Recording Milk Data Every Day",
      estMinutes: 7,
      hook: [
        {
          type: "hero",
          heading: "Every Drop Counts",
          text: "Once a farmer is enrolled, their real work with the MPP begins — bringing milk, twice a day, every day. Each time, important information must be recorded correctly. Let's see what gets recorded, and why it matters so much.",
        },
      ],
      topics: [
        {
          id: "t-m9-l2-what-to-record",
          title: "What Gets Recorded at Every Milk Collection",
          teach: [
            {
              type: "text",
              heading: "Two Sessions a Day",
              html: "Farmers bring milk to the MPP twice a day — a <b>morning session</b> and an <b>evening session</b>. Each time, the MPP records details about that day's milk.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Membership Number",
                  text: "So the milk is credited to the correct farmer, and nobody else.",
                },
                {
                  label: "Date and Session",
                  text: "Whether it was the morning or evening collection, and on which date.",
                },
                {
                  label: "Quantity (in litres)",
                  text: "How much milk the farmer brought, measured carefully every time.",
                },
                {
                  label: "Quality Test Result",
                  text: "The FAT and SNF levels found when the milk is tested — this decides the rate paid per litre.",
                },
              ],
            },
            {
              type: "example",
              heading: "One Entry, Step by Step",
              text: "Farmer Ramu, membership number 214, brings his milk to the MPP at 7 AM. The Sahayak records: Membership No. 214, today's date, Morning session, Quantity 8 litres, and the test result from the machine. This single entry decides exactly how much Ramu will be paid for that milk.",
            },
            {
              type: "callout",
              style: "info",
              heading: "Why Twice a Day?",
              text: "Milking happens twice a day, so records are also made twice a day. This keeps payments accurate and matches what the animal actually produced, session by session.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Which of these is recorded every time a farmer brings milk?",
              options: [
                "The farmer's favourite crop",
                "Membership number, quantity and quality test result",
                "The farmer's shoe size",
                "The weather forecast for next week",
              ],
              answer: 1,
              explain:
                "Every milk collection is recorded with the farmer's membership number, the quantity, and the quality test result.",
            },
            {
              type: "truefalse",
              q: "Milk is usually collected and recorded only once a day.",
              answer: false,
              explain:
                "Milk is collected and recorded twice a day — morning and evening — because animals are milked twice a day.",
            },
          ],
        },
        {
          id: "t-m9-l2-mistakes",
          title: "Common Data Mistakes — and Why They Matter",
          teach: [
            {
              type: "text",
              heading: "Why Accuracy Protects Everyone",
              html: "Good record-keeping is not just paperwork. It is what makes sure every farmer gets paid exactly what they earned — no more, no less. A single wrong entry can cause a real problem for a real family.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Wrong Membership Number",
                  text: "Milk gets credited to the wrong farmer, so one person is underpaid while another is overpaid.",
                },
                {
                  label: "Illegible Handwriting",
                  text: "If numbers cannot be read clearly later, mistakes creep in when payments are calculated.",
                },
                {
                  label: "Delayed or Skipped Entries",
                  text: "If an entry is not made right away, details can be forgotten or guessed — and guessing is never accurate.",
                },
                {
                  label: "Mixing Up Sessions",
                  text: "Recording an evening collection as morning (or the other way around) can confuse the whole day's record.",
                },
              ],
            },
            {
              type: "callout",
              style: "warning",
              heading: "A Small Mistake, A Big Problem",
              text: "Even one wrong digit in a membership number or quantity can mean a farmer does not get paid correctly. Repeated mistakes can also make farmers lose trust in the MPP.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Good Habits for Accurate Records",
              text: "Record every entry immediately, right at the time of collection. Read the membership number and quantity back to the farmer before moving to the next person. Keep the register neat and clear, so anyone can check it later.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What can happen if a farmer's membership number is entered wrong?",
              options: [
                "Nothing, it does not matter",
                "Milk gets credited to the wrong farmer, causing wrong payments",
                "The MPP closes for the day",
                "The milk quality improves",
              ],
              answer: 1,
              explain:
                "A wrong membership number means the milk — and the payment for it — goes to the wrong person's record.",
            },
            {
              type: "truefalse",
              q: "It is fine to record milk details from memory at the end of the day, instead of at the time of collection.",
              answer: false,
              explain:
                "Details should be recorded immediately. Waiting and relying on memory leads to guesses and mistakes.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        isFinal: true,
        questions: [
          {
            topicId: "t-m9-l2-what-to-record",
            type: "mcq",
            q: "How many times a day is milk usually collected and recorded at an MPP?",
            options: ["Once", "Twice", "Three times", "Only on Sundays"],
            answer: 1,
            explain: "Milk is collected and recorded twice a day — morning and evening.",
          },
          {
            topicId: "t-m9-l2-mistakes",
            type: "mcq",
            q: "Why is it important to record milk details immediately, at the time of collection?",
            options: [
              "Because the register looks nicer",
              "Because waiting causes mistakes and guessing",
              "Because farmers prefer to wait",
              "It is not important",
            ],
            answer: 1,
            explain:
              "Recording immediately avoids guesswork and keeps every farmer's payment accurate.",
          },
        ],
      },
    },
  ],
};
