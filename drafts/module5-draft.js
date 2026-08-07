// ============================================================================
// DRAFT — Module 5: Designing a Need-Based Communication Content
// English-only draft content. Written for learners with no formal education
// and no prior dairy knowledge (about a Class 7 reading level).
// Matches the schema used in data.js (see module "m1"). Translation (the
// L() wrapper) will be added later — every string below is plain English.
//
// Source material: 06-designing-need-based-communication.txt (5 slides).
// This module explains the CRI (Criterion-Referenced Instruction) method:
// designing training content around what learners actually need, checked
// with before/after evaluation — rather than teaching generic content.
// Slide 4's example topics (falling membership, low milk production,
// membership, animal nutrition) were translated from Hindi shorthand and
// used as realistic examples of picking topics from real field problems.
// ============================================================================

export const MODULE_5 = {
  id: "m5",
  number: 5,
  title: "Designing a Need-Based Communication Content",
  subtitle:
    "Learn the CRI method for building training content that answers real problems in the field — not generic lessons nobody asked for.",
  icon: "milk",
  available: true,
  lessons: [
    // ==================================================================
    // LESSON 1 — What Is CRI, and Why "Need-Based" Matters
    // ==================================================================
    {
      id: "m5-l1",
      title: "What Is CRI, and Why 'Need-Based' Matters",
      estMinutes: 7,
      hook: [
        {
          type: "hero",
          heading: "Why Generic Training Doesn't Work",
          text: "Imagine sitting through a training on animal vaccination when your real problem is farmers leaving your MPP. That training would feel like a waste of time. This lesson shows you a better way — CRI.",
        },
      ],
      topics: [
        {
          id: "t-generic-vs-needbased",
          title: "The Problem With Generic Content",
          teach: [
            {
              type: "text",
              heading: "One Size Does Not Fit All Villages",
              html: "Every village and every MPP has different problems. One village may be losing members. Another may have farmers whose milk fat is dropping. A third may need help with animal nutrition. If you teach the same generic content everywhere, it may not solve anyone's real problem.",
            },
            {
              type: "callout",
              style: "info",
              heading: "Did You Know?",
              text: "Training designed around a clear, planned approach and teaching-learning psychology is far more effective for adult learners than a generic lecture. Adults learn best when the content answers a real problem they are facing right now.",
            },
            {
              type: "glossary",
              term: "CRI",
              meaning: "Short for Criterion-Referenced Instruction — a method for designing training content that is built around exactly what learners need to be able to do, instead of around generic topics.",
            },
            {
              type: "text",
              heading: "What CRI Helps You Do",
              html: "CRI helps trainers design need-based, field-relevant programs. It also helps build the capability to actually change behaviour — not just deliver information, but check that people really do things differently afterward.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Why might the same generic training content fail in different villages?",
              options: [
                "Because every village has the exact same problems",
                "Because different villages have different real problems, so one-size-fits-all content may not help",
                "Because generic content is always more effective",
                "Because farmers dislike all training equally",
              ],
              answer: 1,
              explain: "Villages face different problems, so content built for one specific problem often does not solve another.",
            },
            {
              type: "truefalse",
              q: "CRI stands for a method that designs training around what learners actually need to be able to do.",
              answer: true,
              explain: "CRI (Criterion-Referenced Instruction) is built around real learner needs, not generic topics.",
            },
          ],
        },
        {
          id: "t-cri-four-steps",
          title: "The Four Steps of CRI",
          teach: [
            {
              type: "text",
              heading: "Four Steps, Always in Order",
              html: "CRI has four steps, always followed in the same order. Each step checks that the training really matches what learners need — not just what a trainer assumes they need.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "1. Behavioural Objectives",
                  text: "Decide exactly what learners should be able to DO after the training — an action you can see and measure, not just 'understand' something.",
                },
                {
                  label: "2. Pre-Evaluation",
                  text: "Check what learners already know and can do, before you teach anything. This stops you from teaching things they already know.",
                },
                {
                  label: "3. Teaching",
                  text: "Deliver the content itself, using teaching-learning principles that help adults learn faster — covered in the next lesson.",
                },
                {
                  label: "4. Post-Evaluation",
                  text: "Check what learners actually learned after the training, to see if it worked and to find any gaps that still need attention.",
                },
              ],
            },
            {
              type: "example",
              heading: "CRI in Action",
              text: "Suppose many farmers in a village are leaving the MPP. Behavioural Objective: Sahayak should be able to explain 3 reasons farmers stay with an MPP. Pre-Evaluation: ask Sahayaks what they currently tell farmers. Teaching: run a short session filling the gaps. Post-Evaluation: check a week later if fewer farmers are leaving.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Remember",
              text: "Behavioural Objectives and Evaluation are like bookends — they make sure training is not just delivered, but actually works.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is a 'Behavioural Objective' in CRI?",
              options: [
                "A vague hope that learners feel inspired",
                "A clear, measurable action learners should be able to DO after training",
                "The name of the trainer's manager",
                "A test given only at the very end of the year",
              ],
              answer: 1,
              explain: "A Behavioural Objective is a specific, observable action — something you can actually see the learner do.",
            },
            {
              type: "truefalse",
              q: "Pre-Evaluation happens after the teaching is complete.",
              answer: false,
              explain: "Pre-Evaluation happens BEFORE teaching — it checks what learners already know so training doesn't repeat it.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-generic-vs-needbased",
            type: "mcq",
            q: "What makes CRI different from a generic training lecture?",
            options: [
              "CRI is always longer than a lecture",
              "CRI is built around what learners actually need, checked before and after",
              "CRI uses only videos, never live teaching",
              "CRI is only for new employees",
            ],
            answer: 1,
            explain: "CRI matches content to real, checked learner needs — unlike a one-size-fits-all lecture.",
          },
          {
            topicId: "t-generic-vs-needbased",
            type: "truefalse",
            q: "Adults generally learn best from content that connects to a real problem they are facing right now.",
            answer: true,
            explain: "Adult learners respond best to training that clearly answers a problem relevant to their own situation.",
          },
          {
            topicId: "t-cri-four-steps",
            type: "mcq",
            q: "Put these CRI steps in the correct order: Teaching, Post-Evaluation, Behavioural Objectives, Pre-Evaluation.",
            options: [
              "Behavioural Objectives, Pre-Evaluation, Teaching, Post-Evaluation",
              "Post-Evaluation, Teaching, Pre-Evaluation, Behavioural Objectives",
              "Teaching, Behavioural Objectives, Post-Evaluation, Pre-Evaluation",
              "Pre-Evaluation, Post-Evaluation, Teaching, Behavioural Objectives",
            ],
            answer: 0,
            explain: "CRI always follows this order: decide the objective, check existing knowledge, teach, then check what was learned.",
          },
          {
            topicId: "t-cri-four-steps",
            type: "truefalse",
            q: "Post-Evaluation helps find gaps that still need attention after training.",
            answer: true,
            explain: "Post-Evaluation checks whether the training actually worked, and reveals any remaining gaps.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 2 — Designing and Delivering a Real Session
    // ==================================================================
    {
      id: "m5-l2",
      title: "Designing and Delivering a Real Session",
      estMinutes: 8,
      hook: [
        {
          type: "hero",
          heading: "From Village Problem to Training Content",
          text: "Now let's turn what you've learned into practice — picking a real topic and building a short session that Sahayaks or farmers actually need.",
        },
      ],
      topics: [
        {
          id: "t-teaching-principles",
          title: "Five Principles That Help Adults Learn",
          teach: [
            {
              type: "text",
              heading: "Teaching the CRI Way",
              html: "Inside the 'Teaching' step of CRI, five principles make learning stick — especially for adult learners who are busy and practical-minded.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Perceived Purpose",
                  text: "Learners must know WHY this matters to them before you begin — make the goal clear upfront.",
                },
                {
                  label: "Individual Differentiation",
                  text: "Different learners already know different things. Address their different needs, instead of teaching everyone the exact same way.",
                },
                {
                  label: "Graduated Sequence",
                  text: "Teach simple ideas first, moving to more complex ideas only after the basics are clear.",
                },
              ],
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Appropriate Practice",
                  text: "Let learners actually try the skill themselves — hands-on practice, not just listening.",
                },
                {
                  label: "Knowledge of Results",
                  text: "Tell learners quickly whether they got it right or wrong, so they can correct themselves while it's fresh.",
                },
              ],
            },
            {
              type: "example",
              heading: "Putting It Together",
              text: "Teaching Sahayaks how to explain milk pricing: start with why it matters (a common farmer complaint), teach the simple fat/SNF idea before the payment formula, let them practice explaining it to each other, then correct any mistakes on the spot.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What does 'Graduated Sequence' mean in teaching?",
              options: [
                "Teaching only to learners who have graduated school",
                "Teaching simple ideas first, then moving to more complex ones",
                "Giving a certificate at the end",
                "Repeating the same idea many times without changing it",
              ],
              answer: 1,
              explain: "Graduated Sequence means building understanding step by step, from simple to complex.",
            },
            {
              type: "truefalse",
              q: "'Knowledge of Results' means telling learners quickly whether they got something right or wrong.",
              answer: true,
              explain: "Fast feedback helps learners correct mistakes while the lesson is still fresh in their minds.",
            },
          ],
        },
        {
          id: "t-picking-topics",
          title: "Choosing the Right Topic From Real Data",
          teach: [
            {
              type: "text",
              heading: "Let the Problem Choose the Topic",
              html: "The best training topics come from real problems happening in the field — not guesses. Look at what MPPs are actually struggling with.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Falling membership",
                  text: "Fewer farmers are staying members of the MPP — training could cover how to listen to farmers' concerns and rebuild trust.",
                },
                {
                  label: "Low milk production",
                  text: "Farmers' animals are giving less milk than expected — training could cover animal feeding and care basics.",
                },
                {
                  label: "Animal nutrition problems",
                  text: "Farmers may be feeding animals incorrectly — training could cover simple, low-cost nutrition improvements.",
                },
              ],
            },
            {
              type: "callout",
              style: "info",
              heading: "Group Activity",
              text: "In your training group, you may be asked to pick a real topic like these, prepare a short 15-minute session on it, and then deliver it to the group. This practice is exactly how CRI content gets built in real life.",
            },
            {
              type: "poll",
              heading: "What Would You Choose?",
              questions: [
                {
                  q: "Your MPP has seen 6 farmers stop supplying milk this month. Which is the better first training topic?",
                  options: [
                    "A generic session on the history of dairy in India",
                    "A short session on why farmers leave, and how to listen and respond to their concerns",
                  ],
                  answer: 1,
                  reveal: "Training should follow the real problem on the ground — here, it's farmers leaving, so the content should target that directly.",
                },
              ],
            },
            {
              type: "example",
              heading: "A Simple Session Outline",
              text: "Behavioural Objective: Sahayak can list 3 reasons for farmer drop-off and respond to each. Pre-Evaluation: ask Sahayaks what they think the reasons are. Teaching: share real reasons from farmer conversations. Practice: role-play a talk with a farmer thinking of leaving. Post-Evaluation: ask Sahayaks to explain the 3 reasons back.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Where should a good training topic come from?",
              options: [
                "Whatever topic the trainer personally finds most interesting",
                "Real problems actually happening in the field, like falling membership or low milk production",
                "A random topic chosen without any data",
                "The longest topic available",
              ],
              answer: 1,
              explain: "CRI-based training topics come from real field problems, not guesses or personal preference.",
            },
            {
              type: "truefalse",
              q: "A 15-minute group activity to design and deliver a short session is a realistic way to practice the CRI method.",
              answer: true,
              explain: "Practicing on a small, real topic is exactly how the CRI method is used to build effective training in the field.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        isFinal: true,
        questions: [
          {
            topicId: "t-teaching-principles",
            type: "mcq",
            q: "Why is 'Perceived Purpose' important at the start of a teaching session?",
            options: [
              "It is not important, learners will pay attention anyway",
              "Learners need to know why the content matters to them before they will engage",
              "It replaces the need for any practice",
              "It is only useful for children, not adults",
            ],
            answer: 1,
            explain: "Adult learners engage better when they understand upfront why the content matters to them.",
          },
          {
            topicId: "t-teaching-principles",
            type: "truefalse",
            q: "Appropriate Practice means learners only listen and never try the skill themselves.",
            answer: false,
            explain: "Appropriate Practice means letting learners actually try the skill hands-on, not just listen.",
          },
          {
            topicId: "t-picking-topics",
            type: "mcq",
            q: "A village is struggling with low milk production. What kind of training content fits this problem best?",
            options: [
              "A session on village meeting etiquette",
              "A session on animal feeding and care basics",
              "A session on the history of milk cooperatives",
              "No training is needed for this problem",
            ],
            answer: 1,
            explain: "Content should match the real problem — here, low milk production points to feeding and animal care training.",
          },
          {
            topicId: "t-picking-topics",
            type: "truefalse",
            q: "Real field data, like membership numbers or milk production trends, can help decide what training content to design.",
            answer: true,
            explain: "Real field data points trainers toward the actual problems that need solving, making content more relevant.",
          },
        ],
      },
    },
  ],
};

export default MODULE_5;
