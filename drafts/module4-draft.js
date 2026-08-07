// ============================================================================
// DRAFT — Module 4: Interaction with Farmers (One to One)
// English-only draft content. Written for learners with no formal education
// and no prior dairy knowledge (about a Class 7 reading level).
// Matches the schema used in data.js (see module "m1"). Translation (the
// L() wrapper) will be added later — every string below is plain English.
//
// Source material: 05-interaction-with-farmers.txt (only 4 slides — thin).
// Slide 3 ("Role Play") and slide 4 ("Do's / Don'ts") were expanded into
// full lessons using general knowledge of respectful, trust-building
// one-to-one farmer conversations: listening first, using simple language,
// honesty about milk pricing and new MPPs/MPOs, and following up.
// ============================================================================

export const MODULE_4 = {
  id: "m4",
  number: 4,
  title: "Interaction with Farmers (One to One)",
  subtitle:
    "Learn how to talk to farmers one-on-one — with patience, respect and honesty. See real example conversations of what to say, and what to avoid.",
  icon: "milk",
  available: true,
  lessons: [
    // ==================================================================
    // LESSON 1 — Listening First, Talking Second
    // ==================================================================
    {
      id: "m4-l1",
      title: "Listening First, Talking Second",
      estMinutes: 7,
      hook: [
        {
          type: "hero",
          heading: "Listening First, Talking Second",
          text: "Every farmer you meet has their own worries, questions and experience. Before you say anything, learn how to truly listen. This lesson shows you how, with real example conversations.",
        },
      ],
      topics: [
        {
          id: "t-why-listening",
          title: "Why Listening Comes First",
          teach: [
            {
              type: "text",
              heading: "Your Most Important Tool Is Your Ears",
              html: "As a Sahayak, you meet farmers almost every day — at the MPP, on their farm, or on the road. The most important skill you bring to any conversation is not talking. It is <b>listening</b>.",
            },
            {
              type: "text",
              heading: "What Good Listening Looks Like",
              html: "Good listening means giving the farmer your full attention, letting them finish speaking, and trying to understand their problem before you reply. It does not mean quietly waiting for your turn to talk.",
            },
            {
              type: "glossary",
              term: "MPP (Milk Pooling Point)",
              meaning:
                "A place in the village where farmers bring their milk every day. It is checked for quality and farmers get paid a fair price, on time.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Do",
              text: "Listen patiently. Let the farmer finish speaking. Try to understand their concern or experience before you reply — even if you think you already know the answer.",
            },
            {
              type: "callout",
              style: "warning",
              heading: "Don't",
              text: "Do not interrupt or dismiss what a farmer is saying, even if you are in a hurry or think their concern is small. Cutting a farmer off tells them their opinion doesn't matter.",
            },
            {
              type: "example",
              heading: "A Good Conversation",
              text: "Farmer: Sahayak, my cow's milk has dropped since last week. I don't understand why. Sahayak: That must be worrying for you. Tell me — has anything changed in her feed or her routine recently? Notice the Sahayak did not jump to an answer. They listened, and then asked a question.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "A farmer is explaining a problem with their cow. What should you do first?",
              options: [
                "Interrupt with the first solution that comes to mind",
                "Let them finish, and try to understand the problem fully",
                "Change the subject to something easier",
                "Tell them their traditional practices are wrong",
              ],
              answer: 1,
              explain: "Good listening means letting the farmer finish and understanding their concern before you respond.",
            },
            {
              type: "truefalse",
              q: "It is fine to cut off a farmer mid-sentence if you already think you know the answer.",
              answer: false,
              explain: "Interrupting a farmer tells them their opinion doesn't matter, even if you think you know the answer already.",
            },
          ],
        },
        {
          id: "t-simple-language",
          title: "Speak Simply, Speak Local",
          teach: [
            {
              type: "text",
              heading: "Use Words Farmers Already Know",
              html: "Use simple, everyday words and the local language farmers are comfortable with. Avoid technical jargon — words like 'SNF' or 'compliance threshold' mean nothing to a farmer who has never studied these terms.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Do",
              text: "Use simple and local language for better communication. Respect the farmer's own knowledge and practices — they have often been raising animals for many years, longer than you may have worked in dairy.",
            },
            {
              type: "callout",
              style: "warning",
              heading: "Don't",
              text: "Avoid technical jargon that may confuse farmers. Avoid criticising traditional practices directly — even when a practice needs to change, criticising it bluntly makes a farmer defensive instead of open to change.",
            },
            {
              type: "example",
              heading: "Same Message, Two Ways",
              text: "Confusing: Your SNF is below the compliance threshold, so payment is adjusted. Simple: Today your milk had a little less of the solid content we test for, so the price is a bit lower. Let's check together why that may have happened.",
            },
            {
              type: "poll",
              heading: "What Would You Say?",
              questions: [
                {
                  q: "A farmer asks why his milk payment was lower today. Which reply is better?",
                  options: [
                    "Your SNF value fell below the compliance threshold.",
                    "Today your milk had a little less of the good solids we test for, so the rate was a bit lower. Let's look at why, together.",
                  ],
                  answer: 1,
                  reveal: "The second reply uses simple words and invites the farmer to solve the problem with you — that builds trust.",
                },
              ],
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Why should you avoid technical jargon when talking to farmers?",
              options: [
                "Jargon makes you sound less experienced",
                "It may confuse farmers who have never studied those terms",
                "Farmers already know all the technical terms",
                "It is against the rules to use any English words",
              ],
              answer: 1,
              explain: "Jargon can confuse farmers and get in the way of clear communication — plain, local language works better.",
            },
            {
              type: "truefalse",
              q: "If a farmer's traditional practice needs to change, the best approach is to criticise it directly and bluntly.",
              answer: false,
              explain: "Bluntly criticising a traditional practice makes a farmer defensive. It is better to discuss it respectfully and explain reasons.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-why-listening",
            type: "mcq",
            q: "What does good listening mean in a conversation with a farmer?",
            options: [
              "Nodding without really paying attention",
              "Giving full attention, letting them finish, and understanding before replying",
              "Waiting silently just so you can speak next",
              "Writing down only the parts you find interesting",
            ],
            answer: 1,
            explain: "Good listening means real attention and understanding, not just waiting for your turn to talk.",
          },
          {
            topicId: "t-why-listening",
            type: "truefalse",
            q: "You should never interrupt a farmer, even if you are busy.",
            answer: true,
            explain: "Even when busy, interrupting or dismissing a farmer's concern damages trust.",
          },
          {
            topicId: "t-simple-language",
            type: "mcq",
            q: "Which of these is the best way to explain a lower milk payment to a farmer?",
            options: [
              "Use only technical terms so it sounds official",
              "Say nothing and hope they don't ask",
              "Explain simply, in local language, and offer to check the reason together",
              "Tell them it's none of their business",
            ],
            answer: 2,
            explain: "Simple, honest, local-language explanations that involve the farmer build trust.",
          },
          {
            topicId: "t-simple-language",
            type: "truefalse",
            q: "Respecting a farmer's traditional knowledge and practices is part of good communication.",
            answer: true,
            explain: "Farmers often have years of experience. Respecting that experience is part of building trust.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 2 — Honest Conversations and Follow-Up
    // ==================================================================
    {
      id: "m4-l2",
      title: "Honest Conversations and Follow-Up",
      estMinutes: 8,
      hook: [
        {
          type: "hero",
          heading: "Honest Conversations and Follow-Up",
          text: "Some conversations are harder — a new MPP starting in the village, a question about milk price, or a complaint. Let's learn how to handle these with honesty and care.",
        },
      ],
      topics: [
        {
          id: "t-new-mpp-concerns",
          title: "Talking About a New MPP and Milk Price",
          teach: [
            {
              type: "text",
              heading: "Why Farmers Worry About Something New",
              html: "When a new MPP or MPO starts in a village, farmers may worry: Will I get paid on time? Will the testing be fair? Is this better or worse than where I sell now? These worries are natural — change is always a little scary, especially with something as important as daily income.",
            },
            {
              type: "glossary",
              term: "MPO (Milk Producer Organisation)",
              meaning: "A farmer-owned group that runs the MPP in a village, tests milk fairly, and pays farmers a fair price on time.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Be Honest About Milk Pricing",
              text: "If a farmer asks how the price is decided, explain it simply and honestly — for example, that the price depends on the fat and SNF (solid content) tested in their milk that day. Never guess or make up a number. If you don't know, say so and find out.",
            },
            {
              type: "example",
              heading: "Handling a Price Question Honestly",
              text: "Farmer: Why does my neighbour get a higher rate than me for the same amount of milk? Sahayak: It's not the amount that decides the rate — it's the fat and SNF content. Let's check both your test slips together so you can see the difference. The Sahayak did not get defensive. They showed the farmer real proof.",
            },
            {
              type: "callout",
              style: "warning",
              heading: "Don't Make Promises You Can't Keep",
              text: "Do not make unrealistic promises, like guaranteeing a certain price or payment date you are not sure about. A broken promise damages trust far more than an honest 'I'm not sure, let me find out.'",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "A farmer asks why a new MPP pays differently from the old buyer. What should you do?",
              options: [
                "Avoid the question so you don't have to explain",
                "Explain honestly how the price is decided, using simple language",
                "Make up a reassuring answer even if you're not fully sure",
                "Tell them to stop asking questions",
              ],
              answer: 1,
              explain: "Honesty, even about a topic like pricing, is the best way to build a farmer's trust in a new MPP.",
            },
            {
              type: "truefalse",
              q: "It is fine to promise a farmer a specific payment date, even if you are not sure it will happen.",
              answer: false,
              explain: "Unrealistic promises that later break damage trust much more than being honest about uncertainty.",
            },
          ],
        },
        {
          id: "t-followup",
          title: "Ending Well and Following Up",
          teach: [
            {
              type: "text",
              heading: "Don't Rush the Conversation",
              html: "Do not rush an interaction or appear disinterested, even when you are busy. A farmer can tell when you are only half-listening, and it makes them trust you less the next time.",
            },
            {
              type: "text",
              heading: "Involve the Farmer in the Solution",
              html: "Avoid imposing a solution without discussion. Instead, encourage participation — ask the farmer what they think, and use open-ended questions like 'What do you think is causing this?' rather than only yes-or-no questions.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Always Follow Up",
              text: "If you promise to check something or come back with an answer, do it — and tell the farmer that you did. A simple follow-up, like 'I checked, and here's what I found,' shows the farmer you kept your word.",
            },
            {
              type: "example",
              heading: "A Good Follow-Up",
              text: "Sahayak, a week later: Bhai, you asked me last week why your fat percentage looked low. I checked with the lab — your feed batch that week had less protein. Try switching back and let's test again next week. This builds trust because the Sahayak remembered and followed through.",
            },
            {
              type: "poll",
              heading: "What Should the Sahayak Say Here?",
              questions: [
                {
                  q: "A farmer's concern from last week hasn't been fully resolved. You still don't have a complete answer. What should you say?",
                  options: [
                    "Avoid the farmer until you have a full answer",
                    "Tell the farmer you're still checking, and give a realistic idea of when you'll know more",
                  ],
                  answer: 1,
                  reveal: "Being honest about not having the full answer yet — while showing you haven't forgotten — keeps trust intact.",
                },
              ],
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is the best way to make a farmer feel involved in solving their own problem?",
              options: [
                "Give them a solution without asking anything",
                "Ask open-ended questions like 'What do you think is causing this?'",
                "Tell them the answer is too technical for them to understand",
                "Ask only yes-or-no questions",
              ],
              answer: 1,
              explain: "Open-ended questions invite the farmer to think and participate, instead of just receiving an order.",
            },
            {
              type: "truefalse",
              q: "If you promised to check something for a farmer, it's fine to forget about it once you're busy with other work.",
              answer: false,
              explain: "Following up on a promise, even a small one, shows the farmer you keep your word and builds long-term trust.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        isFinal: true,
        questions: [
          {
            topicId: "t-new-mpp-concerns",
            type: "mcq",
            q: "What is the best response when a farmer questions how milk pricing works at a new MPP?",
            options: [
              "Change the topic to avoid confrontation",
              "Explain simply and honestly, and show proof like test slips if needed",
              "Say it's decided randomly",
              "Tell them to ask someone else",
            ],
            answer: 1,
            explain: "Honest, simple explanations — backed by real proof — build a farmer's confidence in a new MPP.",
          },
          {
            topicId: "t-new-mpp-concerns",
            type: "truefalse",
            q: "Farmers naturally feel some worry when a new MPP or MPO starts in their village.",
            answer: true,
            explain: "Change is naturally a little unsettling, especially for something as important as daily income — this worry is normal.",
          },
          {
            topicId: "t-followup",
            type: "mcq",
            q: "Why is following up on a promise to a farmer important?",
            options: [
              "It is not important — farmers forget quickly",
              "It shows the farmer you kept your word and builds trust",
              "It is only needed for big problems",
              "It wastes time better spent elsewhere",
            ],
            answer: 1,
            explain: "Following up, even on small promises, builds long-term trust between the Sahayak and the farmer.",
          },
          {
            topicId: "t-followup",
            type: "truefalse",
            q: "Rushing through a conversation because you are busy has no effect on how much a farmer trusts you.",
            answer: false,
            explain: "Farmers can tell when you are rushing or only half-listening, which reduces their trust in you.",
          },
        ],
      },
    },
  ],
};

export default MODULE_4;
