// ============================================================================
// DRAFT — Module 6: Interaction with Sahayak (One to One)
// English-only draft content. Written for learners with no formal education
// and no prior dairy knowledge (about a Class 7 reading level).
// Matches the schema used in data.js (see module "m1"). Translation (the
// L() wrapper) will be added later — every string below is plain English.
//
// Source material: 06-interaction-with-sahayak.txt (only 3 slides — very
// thin: just a title, a role-play exercise, and an untitled "Communication
// with Sahayak" slide with no listed content). This module was built almost
// entirely from general good mentoring/coaching practice: listening to a
// Sahayak's on-ground challenges, giving constructive feedback, and
// building their confidence. The framing used is that the learner may
// sometimes be the one guiding or mentoring a fellow Sahayak (for example,
// a newer one, or one who is struggling).
// ============================================================================

export const MODULE_6 = {
  id: "m6",
  number: 6,
  title: "Interaction with Sahayak (One to One)",
  subtitle:
    "Learn how to mentor and support a fellow Sahayak one-on-one — through listening, honest feedback and encouragement.",
  icon: "milk",
  available: true,
  lessons: [
    // ==================================================================
    // LESSON 1 — Understanding Before Advising
    // ==================================================================
    {
      id: "m6-l1",
      title: "Understanding Before Advising",
      estMinutes: 7,
      hook: [
        {
          type: "hero",
          heading: "Understanding Before Advising",
          text: "Sometimes you may be the one guiding another Sahayak — maybe someone new, or someone struggling at their MPP. This lesson shows you how to start that conversation the right way.",
        },
      ],
      topics: [
        {
          id: "t-sahayak-challenges",
          title: "Walking in Another Sahayak's Shoes",
          teach: [
            {
              type: "text",
              heading: "Every Sahayak's Day Is Different",
              html: "A Sahayak's daily work is not easy — testing milk, weighing it correctly, recording data, handling cash, and managing farmers who are sometimes upset. Before you offer advice to another Sahayak, take time to understand what their day actually looks like.",
            },
            {
              type: "text",
              heading: "Why This Conversation Matters",
              html: "When you sit down with a Sahayak one-on-one — maybe a new Sahayak still learning the job, or one who is struggling — your goal is not to judge them. It is to understand their challenges and help them do better.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Start by Asking, Not Telling",
              text: "Before giving any advice, ask the Sahayak to describe their day, their difficulties, and what they think is going wrong. You will often learn things you did not expect.",
            },
            {
              type: "example",
              heading: "Starting the Right Way",
              text: "Senior Sahayak: Before we talk about the low collection numbers, tell me — how has this month been for you at the MPP? New Sahayak: Honestly, it's been hard. Two farmers stopped coming and I don't fully understand why. Notice the senior Sahayak asked an open question first, instead of starting with the problem.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Before giving advice to a struggling Sahayak, what should you do first?",
              options: [
                "Tell them everything they are doing wrong",
                "Ask them to describe their day and difficulties, and listen",
                "Compare them unfavourably to other Sahayaks",
                "Wait for someone else to talk to them instead",
              ],
              answer: 1,
              explain: "Understanding a Sahayak's real challenges first helps you give advice that actually fits their situation.",
            },
            {
              type: "truefalse",
              q: "The goal of a one-on-one conversation with a struggling Sahayak is to judge their performance, not to understand them.",
              answer: false,
              explain: "The goal is to understand their challenges and help them improve — not to judge them.",
            },
          ],
        },
        {
          id: "t-active-listening-sahayak",
          title: "Listening Without Jumping to Solutions",
          teach: [
            {
              type: "text",
              heading: "Resist the Urge to Fix It Immediately",
              html: "When someone tells you a problem, it's tempting to jump straight to a solution. But if you do this too fast, the Sahayak may feel unheard — and you might end up solving the wrong problem.",
            },
            {
              type: "callout",
              style: "warning",
              heading: "A Common Mistake",
              text: "Cutting off a Sahayak mid-sentence to give advice, or assuming you already know their problem before they finish explaining, can make them stop being honest with you in future conversations.",
            },
            {
              type: "text",
              heading: "Ask Open-Ended Questions",
              html: "Instead of yes-or-no questions, ask things like 'What do you think caused this?' or 'What have you already tried?' These questions help the Sahayak think it through — and often they find their own answer.",
            },
            {
              type: "example",
              heading: "Good vs. Rushed Listening",
              text: "Rushed: You probably didn't test the milk properly, that's why farmers complained. Better: Walk me through what happened when the farmer complained. What did you do first?",
            },
            {
              type: "poll",
              heading: "What Should You Say Here?",
              questions: [
                {
                  q: "A Sahayak tells you collections have dropped this month. What's the better first response?",
                  options: [
                    "You must be doing something wrong at collection time.",
                    "Tell me more — when did you first notice the drop, and have you spoken to any farmers about it?",
                  ],
                  answer: 1,
                  reveal: "Asking first, before assuming, gets you the real reason and keeps the Sahayak comfortable being honest with you.",
                },
              ],
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is a risk of jumping straight to a solution before fully listening?",
              options: [
                "There is no risk, faster is always better",
                "You might end up solving the wrong problem",
                "The Sahayak will always agree with you anyway",
                "It saves so much time that it is always worth it",
              ],
              answer: 1,
              explain: "Without fully understanding the real problem, you risk offering a solution that doesn't actually fix it.",
            },
            {
              type: "truefalse",
              q: "Open-ended questions like 'What do you think caused this?' can help a Sahayak think through their own problem.",
              answer: true,
              explain: "Open-ended questions encourage the Sahayak to reflect and often arrive at their own useful answer.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-sahayak-challenges",
            type: "mcq",
            q: "Why is it important to understand a Sahayak's day-to-day challenges before advising them?",
            options: [
              "It isn't important — advice works the same regardless",
              "It helps you give advice that actually fits their real situation",
              "It is only a formality with no real value",
              "It wastes time that could be spent giving instructions",
            ],
            answer: 1,
            explain: "Understanding the real, on-ground challenges helps you offer advice that is actually useful and relevant.",
          },
          {
            topicId: "t-sahayak-challenges",
            type: "truefalse",
            q: "Starting a mentoring conversation with an open question, like asking how their month has been, is a good approach.",
            answer: true,
            explain: "Open questions invite honesty and help you understand the real situation before discussing problems.",
          },
          {
            topicId: "t-active-listening-sahayak",
            type: "mcq",
            q: "A Sahayak is explaining a problem, but you think you already know the cause. What should you do?",
            options: [
              "Interrupt and explain the cause immediately",
              "Let them finish and ask follow-up questions before concluding anything",
              "Change the subject",
              "Assume you're right and move on without checking",
            ],
            answer: 1,
            explain: "Letting the Sahayak finish and asking follow-up questions helps you confirm the real cause instead of guessing.",
          },
          {
            topicId: "t-active-listening-sahayak",
            type: "truefalse",
            q: "Assuming you already know a Sahayak's problem before they finish explaining can damage their trust in you.",
            answer: true,
            explain: "Jumping to conclusions can make a Sahayak feel unheard, and less likely to be open with you in future.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 2 — Feedback That Builds Confidence
    // ==================================================================
    {
      id: "m6-l2",
      title: "Feedback That Builds Confidence",
      estMinutes: 8,
      hook: [
        {
          type: "hero",
          heading: "Feedback That Builds Confidence",
          text: "Good feedback helps a Sahayak grow. Bad feedback makes them defensive or discouraged. Let's learn how to give feedback that actually helps.",
        },
      ],
      topics: [
        {
          id: "t-constructive-feedback",
          title: "Giving Feedback the Right Way",
          teach: [
            {
              type: "text",
              heading: "Be Specific, Not General",
              html: "Instead of saying 'Your record-keeping is bad,' point to something specific: 'I noticed three days last week where the evening collection wasn't logged. Let's look at why.' Specific feedback is much easier to act on.",
            },
            {
              type: "text",
              heading: "Give Feedback in Private",
              html: "Always give corrective feedback one-on-one, in private — never in front of farmers or other Sahayaks. Public criticism embarrasses people and makes them defensive instead of open to improving.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Balance Praise With Improvement",
              text: "Mention what the Sahayak is doing well, not only what needs to change. This is not about softening bad news — it is about giving an honest, complete picture so the Sahayak knows what to keep doing too.",
            },
            {
              type: "example",
              heading: "Two Ways to Give the Same Feedback",
              text: "Harsh: You keep making mistakes with the fat testing, this needs to stop. Constructive: Your farmer relationships are strong — I can see that from how they talk to you. I did notice a couple of fat-testing readings that looked off last week. Can we go over the testing steps together?",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Which is an example of specific, useful feedback?",
              options: [
                "'Your work is bad.'",
                "'I noticed three days last week where the evening collection wasn't logged. Let's look at why.'",
                "'You never do anything right.'",
                "'Just try harder next time.'",
              ],
              answer: 1,
              explain: "Specific feedback points to an exact situation, which makes it much easier for the Sahayak to act on.",
            },
            {
              type: "truefalse",
              q: "It is fine to correct a Sahayak's mistake in front of farmers if it saves time.",
              answer: false,
              explain: "Corrective feedback should always be given in private — public criticism embarrasses and discourages people.",
            },
          ],
        },
        {
          id: "t-building-confidence",
          title: "Encouraging Growth and Following Up",
          teach: [
            {
              type: "text",
              heading: "Small Wins Build Confidence",
              html: "When a Sahayak improves, even a little, notice it and say so. A new Sahayak who used to make mistakes but is now testing milk correctly deserves to hear that you noticed the improvement.",
            },
            {
              type: "text",
              heading: "Set Small, Achievable Goals",
              html: "Instead of asking a struggling Sahayak to fix everything at once, agree on one or two small, clear goals to work on before your next conversation. This feels achievable, not overwhelming.",
            },
            {
              type: "callout",
              style: "warning",
              heading: "Don't Disappear After the Conversation",
              text: "A one-time conversation is not enough. If you don't follow up, the Sahayak may feel like the conversation didn't matter, or that you have already given up on them.",
            },
            {
              type: "example",
              heading: "A Good Follow-Up Conversation",
              text: "Senior Sahayak, at the next visit: Last time we talked about logging every collection. I checked — you've logged every single one this week. That's a real improvement. New Sahayak: Thank you, that means a lot. It's easier now that I have a system for it. This follow-up shows the senior Sahayak kept track and recognised the effort.",
            },
            {
              type: "poll",
              heading: "What Should You Say Here?",
              questions: [
                {
                  q: "A Sahayak you're mentoring has improved on one goal but is still struggling with another. What's the better approach?",
                  options: [
                    "Only point out what's still going wrong",
                    "Recognise the improvement first, then gently work on the next goal together",
                  ],
                  answer: 1,
                  reveal: "Recognising progress keeps the Sahayak motivated and open to continuing to improve.",
                },
              ],
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is the benefit of setting one or two small, achievable goals instead of asking a Sahayak to fix everything at once?",
              options: [
                "It makes the goals easier to ignore",
                "It feels achievable rather than overwhelming, so the Sahayak is more likely to succeed",
                "It has no real benefit",
                "It slows down all improvement permanently",
              ],
              answer: 1,
              explain: "Small, clear goals feel achievable, which helps a struggling Sahayak build momentum and confidence.",
            },
            {
              type: "truefalse",
              q: "Once you've had one feedback conversation with a Sahayak, there is no need to follow up later.",
              answer: false,
              explain: "Following up shows the Sahayak that the conversation mattered and that you are still invested in their progress.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        isFinal: true,
        questions: [
          {
            topicId: "t-constructive-feedback",
            type: "mcq",
            q: "Why should corrective feedback be given in private, one-on-one?",
            options: [
              "Because it takes too long to do in public",
              "Because public criticism embarrasses people and makes them defensive",
              "Because private conversations don't need to be honest",
              "Because it is required only by written rules, not for any real reason",
            ],
            answer: 1,
            explain: "Private feedback avoids embarrassment and keeps the Sahayak open to hearing and acting on it.",
          },
          {
            topicId: "t-constructive-feedback",
            type: "truefalse",
            q: "Good feedback should mention what a Sahayak is doing well, not only what needs to change.",
            answer: true,
            explain: "Balanced feedback gives an honest, complete picture, so the Sahayak knows what to keep doing as well as what to improve.",
          },
          {
            topicId: "t-building-confidence",
            type: "mcq",
            q: "A Sahayak has shown a small improvement since your last conversation. What should you do?",
            options: [
              "Say nothing since the improvement is small",
              "Notice and acknowledge the improvement before discussing anything else",
              "Focus only on what's still wrong",
              "Wait for a bigger improvement before saying anything",
            ],
            answer: 1,
            explain: "Acknowledging even small improvements builds confidence and keeps the Sahayak motivated to keep improving.",
          },
          {
            topicId: "t-building-confidence",
            type: "truefalse",
            q: "Following up after a mentoring conversation shows the Sahayak that you are still invested in their progress.",
            answer: true,
            explain: "Following up proves the earlier conversation mattered and that support continues beyond a single talk.",
          },
        ],
      },
    },
  ],
};

export default MODULE_6;
