// ============================================================================
// DRAFT — Module 7: Village Level Meeting for Small Groups
// English-only draft content. Written for learners with no formal education
// and no prior dairy knowledge (about a Class 7 reading level).
// Matches the schema used in data.js (see module "m1"). Translation (the
// L() wrapper) will be added later — every string below is plain English.
// ============================================================================

export const MODULE_7 = {
  id: "m7",
  number: 7,
  title: "Village Level Meeting for Small Groups",
  subtitle:
    "Learn how to plan and run a good meeting with a small group of farmers — and how that is different from a big village-wide meeting.",
  icon: "milk",
  available: true,
  lessons: [
    // ==================================================================
    // LESSON 1 — Why We Call a Village Meeting
    // ==================================================================
    {
      id: "m7-l1",
      title: "Why We Call a Village Meeting",
      estMinutes: 6,
      hook: [
        {
          type: "hero",
          heading: "Why We Call a Village Meeting",
          text: "Collecting milk is only part of your job. Talking to farmers, together, in one place — that is where trust is built. Let's see why meetings matter.",
        },
      ],
      topics: [
        {
          id: "t-why-meetings",
          title: "Why Meetings Matter",
          teach: [
            {
              type: "text",
              heading: "More Than Just Collecting Milk",
              html: "As a <b>Sahayak</b>, your job is not only to collect milk every day. You also need to talk with farmers regularly — explain new things, answer questions, and solve problems together. A <b>meeting</b> is the best way to do all of this at once.",
            },
            {
              type: "glossary",
              term: "Village Meeting",
              meaning:
                "A meeting is when farmers and the Sahayak come together, at one place and one time, to talk about the dairy business — new information, a problem, or a plan.",
            },
            {
              type: "text",
              heading: "When Should You Call a Meeting?",
              html: "Call a meeting when: <b>a new rule or scheme</b> needs to be explained, <b>many farmers</b> are facing the same problem, <b>new members</b> need to be welcomed, or something important is about to change — like a change in milk rate.",
            },
            {
              type: "example",
              heading: "Think About It",
              text: "If 5 farmers each ask you the same question on 5 different days, you answer it 5 times — and each answer may come out a little different. If you call one meeting instead, you answer it once, and everyone hears the same, correct answer together.",
            },
            {
              type: "callout",
              style: "info",
              heading: "Did You Know?",
              text: "A good meeting builds trust. When farmers feel heard, they trust the MPP more — and they keep bringing their milk there instead of selling it to someone else.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Why is it better to answer a common question in a meeting instead of one farmer at a time?",
              options: [
                "It takes more of your time",
                "Everyone hears the same, correct answer together",
                "Farmers do not like meetings",
                "It is not better — one at a time is always best",
              ],
              answer: 1,
              explain:
                "A meeting lets you give one clear, correct answer to everyone at the same time, instead of repeating (and possibly changing) the answer many times.",
            },
            {
              type: "truefalse",
              q: "You should only call a meeting when milk rates change — never for anything else.",
              answer: false,
              explain:
                "Meetings are also useful for explaining new rules, solving a shared problem, or welcoming new members — not only for rate changes.",
            },
          ],
        },
        {
          id: "t-meeting-groups",
          title: "Who Meets in a Small Group?",
          teach: [
            {
              type: "text",
              heading: "Two Kinds of Small Groups",
              html: "Not every meeting needs the whole village. Often, a <b>small group</b> of the right people is enough to solve a problem or share information quickly. Two common small groups are the VCG and the MRG.",
            },
            {
              type: "glossary",
              term: "VCG (Village Contact Group)",
              meaning:
                "A small group of active, respected farmers in the village who help the Sahayak stay in touch with all the other farmer members and pass on information both ways.",
            },
            {
              type: "glossary",
              term: "MRG (Member Relation Group)",
              meaning:
                "A small group that looks after the relationship with members — listening to their problems and helping solve them, so members stay happy with the MPP.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Sahayak",
                  text: "Leads the meeting, shares information, and listens to what farmers say.",
                },
                {
                  label: "Management Committee",
                  text: "Local leaders who help run the MPP and take decisions on behalf of the members.",
                },
                {
                  label: "Transporter",
                  text: "The person who drives the vehicle that carries milk cans — sometimes called in to discuss collection timing.",
                },
              ],
            },
            {
              type: "text",
              heading: "Small Meeting Means a Small Number of People",
              html: "A small-group meeting usually has only the people who are directly involved in that topic — maybe 5 to 15 people. This makes it easy for everyone to speak, ask questions, and be heard.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What does the VCG (Village Contact Group) mainly help with?",
              options: [
                "Repairing the milk collection vehicle",
                "Keeping the Sahayak in touch with all the other farmer members",
                "Setting the price of milk for the whole state",
                "Printing farmer ID cards",
              ],
              answer: 1,
              explain:
                "The VCG is a small group of active farmers who help the Sahayak pass information to and from all the other members in the village.",
            },
            {
              type: "truefalse",
              q: "A small-group meeting usually includes the entire village, sometimes hundreds of people.",
              answer: false,
              explain:
                "A small-group meeting is kept small on purpose — often just 5 to 15 people — so everyone can speak and be heard.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-why-meetings",
            type: "mcq",
            q: "Which of these is a good reason to call a village meeting?",
            options: [
              "To avoid talking to farmers directly",
              "To explain a new rule to many farmers at the same time",
              "To collect milk faster",
              "To replace the Management Committee",
            ],
            answer: 1,
            explain:
              "Meetings are called to explain something important, like a new rule, to many farmers at once, so everyone hears the same correct information.",
          },
          {
            topicId: "t-meeting-groups",
            type: "truefalse",
            q: "The MRG (Member Relation Group) mainly focuses on listening to members' problems and helping solve them.",
            answer: true,
            explain:
              "The MRG's main job is looking after the relationship with members — hearing problems and helping resolve them.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 2 — Planning and Running a Small-Group Meeting
    // ==================================================================
    {
      id: "m7-l2",
      title: "Planning and Running a Small-Group Meeting",
      estMinutes: 7,
      hook: [
        {
          type: "hero",
          heading: "Planning and Running a Small-Group Meeting",
          text: "Calling a meeting is easy. Running one well — where quiet people speak up and problems get solved — takes a little planning. Let's learn how.",
        },
      ],
      topics: [
        {
          id: "t-plan-agenda",
          title: "Before the Meeting: Planning",
          teach: [
            {
              type: "text",
              heading: "Every Meeting Needs an Agenda",
              html: "Before you call people together, decide exactly what you want to talk about, and in what order. Writing this down — even as a short list — is called an <b>agenda</b>.",
            },
            {
              type: "glossary",
              term: "Agenda",
              meaning:
                "A short list of the topics you will talk about in a meeting, in order. It keeps the meeting on track and stops it from running too long.",
            },
            {
              type: "text",
              heading: "Where and How People Sit",
              html: "How people sit changes how they talk. Sitting in a <b>circle</b> or facing each other lets everyone see who is speaking and feel equally included. If people sit in rows facing only the Sahayak, like a classroom, quiet farmers often stay quiet.",
            },
            {
              type: "example",
              heading: "A Good Agenda Looks Like This",
              text: "1) Welcome the farmers (2 minutes). 2) Share today's topic — for example, a new milk-testing method (5 minutes). 3) Answer questions (10 minutes). 4) Agree on next steps (3 minutes).",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Keep It Short",
              text: "A small-group meeting works best when it stays short — around 15 minutes. A focused, on-time meeting keeps farmers willing to come to the next one.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is an agenda?",
              options: [
                "The place where the meeting is held",
                "A short list of topics to discuss, in order",
                "The list of farmers who did not attend",
                "The bill for the meeting's tea and snacks",
              ],
              answer: 1,
              explain:
                "An agenda is a short, ordered list of what will be discussed. It keeps a meeting focused and on time.",
            },
            {
              type: "truefalse",
              q: "Seating everyone in a circle, facing each other, usually helps more people speak up than seating them in rows facing only the Sahayak.",
              answer: true,
              explain:
                "A circle lets everyone see each other and feel equally part of the discussion, which encourages quieter people to speak.",
            },
          ],
        },
        {
          id: "t-encourage-speak",
          title: "Getting Everyone to Speak — and Handling Objections",
          teach: [
            {
              type: "text",
              heading: "Quiet Members Have Good Ideas Too",
              html: "In every group, some people speak up easily and some stay quiet — even when they have something important to say. Part of your job as Sahayak is to gently invite the quiet ones into the conversation.",
            },
            {
              type: "example",
              heading: "Try This",
              text: "Sahayak: \"Lakshmi akka, you have kept animals for many years. What do you think about this new collection time?\" Lakshmi: \"I think it will help — but what about the days when it rains heavily?\" A simple, direct question, asked kindly, brought out a real concern that everyone needed to hear.",
            },
            {
              type: "text",
              heading: "When Someone Objects",
              html: "When a farmer disagrees or raises a problem, do not argue or brush it aside. First, <b>listen fully</b>. Then <b>repeat the concern back</b> in your own words, so they know you understood. Then answer calmly, using facts. If you do not know the answer, say so honestly, and promise to find out and come back.",
            },
            {
              type: "example",
              heading: "Handling an Objection — Do This",
              text: "Farmer: \"Why should we trust this new payment schedule? Last time we were told something and it did not happen.\" Sahayak: \"I understand your worry — trust was broken before. Let me explain exactly how this is different, and I will also write down the new dates so you can check them yourself.\"",
            },
            {
              type: "callout",
              style: "warning",
              heading: "Don't Do This",
              text: "Don't argue back. Don't say \"just trust me.\" Don't ignore an objection and quickly move to the next topic. Doing this makes farmers feel unheard — and they may stop coming to meetings altogether.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "A farmer raises an objection you don't have an answer for. What should you do?",
              options: [
                "Ignore it and move to the next topic",
                "Argue that the farmer is wrong",
                "Admit you don't know, and promise to find out and come back",
                "End the meeting early",
              ],
              answer: 2,
              explain:
                "Honesty builds trust. It is far better to admit you don't know and follow up later than to guess or dismiss the concern.",
            },
            {
              type: "truefalse",
              q: "Directly and kindly inviting a quiet member to speak, by name, can help bring out concerns the group needs to hear.",
              answer: true,
              explain:
                "Asking a quiet member directly, in a respectful way, often draws out useful information that would otherwise go unsaid.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-plan-agenda",
            type: "mcq",
            q: "About how long should a small-group meeting last?",
            options: ["Around 15 minutes", "2 hours", "The whole day", "5 minutes, no more"],
            answer: 0,
            explain:
              "A small-group meeting works best when kept short and focused — around 15 minutes.",
          },
          {
            topicId: "t-encourage-speak",
            type: "truefalse",
            q: "When handling an objection, you should first listen fully and repeat the concern back before answering.",
            answer: true,
            explain:
              "Listening first and repeating the concern shows the farmer you understood, which makes your answer land better.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 3 — Small Group Meeting or Mass Meeting?
    // ==================================================================
    {
      id: "m7-l3",
      title: "Small Group Meeting or Mass Meeting?",
      estMinutes: 6,
      hook: [
        {
          type: "hero",
          heading: "Small Group Meeting or Mass Meeting?",
          text: "From a handful of farmers to a whole village — which meeting do you call, and when? Let's learn the difference.",
        },
      ],
      topics: [
        {
          id: "t-mass-meeting",
          title: "What Is a Village Mass Meeting?",
          teach: [
            {
              type: "text",
              heading: "When the Whole Village Comes Together",
              html: "Sometimes a topic is important enough that most or all farmer families in the village need to hear it directly. For this, a <b>mass meeting</b> is called — much bigger than a small-group meeting.",
            },
            {
              type: "glossary",
              term: "Mass Meeting",
              meaning:
                "A large meeting where most or all of the farmer families in a village are invited — not just a small group directly affected by one issue.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Village Meeting",
                  text: "A general meeting for the whole village, used to share important news or take a big decision together.",
                },
                {
                  label: "Health Camp",
                  text: "A camp where trained staff check the health of milk animals, give advice, and sometimes vaccinate them — held for the whole village at once.",
                },
                {
                  label: "Milk Testing Camp (DMT)",
                  text: "A camp where milk quality is tested openly in front of many farmers together, so they can see for themselves how testing works and trust it.",
                },
              ],
            },
            {
              type: "callout",
              style: "info",
              heading: "Did You Know?",
              text: "A mass meeting usually needs more planning than a small-group meeting — more space, more chairs, and more helpers to manage a bigger crowd.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is a mass meeting?",
              options: [
                "A meeting with only the Management Committee",
                "A large meeting where most or all farmer families in the village are invited",
                "A meeting held only once a year",
                "A meeting only for new members",
              ],
              answer: 1,
              explain:
                "A mass meeting is a large, village-wide meeting, unlike a small-group meeting which involves only the people directly affected by one topic.",
            },
            {
              type: "truefalse",
              q: "A health camp for milk animals is an example of an activity that can be part of a village mass meeting.",
              answer: true,
              explain:
                "Health camps, along with village meetings and milk testing camps, are examples of activities held for the whole village at once.",
            },
          ],
        },
        {
          id: "t-choosing-right-meeting",
          title: "Which One Should You Call?",
          teach: [
            {
              type: "text",
              heading: "Small Group vs Mass Meeting",
              html: "The right choice depends on <b>who is affected</b> and <b>what you need from the meeting</b>. A small group works when only a few farmers are involved and you need real discussion. A mass meeting works when everyone needs the same information at once.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Choose a Small Group When...",
                  text: "the topic affects only a few farmers, or you need everyone present to discuss in detail and be heard.",
                },
                {
                  label: "Choose a Mass Meeting When...",
                  text: "the topic affects the whole village — like a new MPP opening or a big rate change — and you mainly need to inform many people at once.",
                },
              ],
            },
            {
              type: "example",
              heading: "Think About It",
              text: "Ten farmers are unhappy about how their milk's fat percentage is being measured. Should you call a mass meeting of 100 people, or a small group of these 10? A small group is better here — it lets you discuss each farmer's concern in real detail.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Plan Extra Time for Mass Meetings",
              text: "A mass meeting for a large group usually needs about 20 minutes or more, often with two or more people helping manage the crowd — much more than a small 15-minute group meeting.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "A new MPP is opening and every farmer in the village needs to know about it. Which type of meeting fits best?",
              options: ["A small-group meeting with 5 farmers", "A mass meeting for the whole village", "No meeting is needed", "A meeting only with the transporter"],
              answer: 1,
              explain:
                "Since this news affects every farmer in the village, a mass meeting is the right choice so everyone hears it directly.",
            },
            {
              type: "truefalse",
              q: "A mass meeting usually needs less planning time than a small-group meeting.",
              answer: false,
              explain:
                "A mass meeting needs MORE planning — more space, more helpers, and more time — because it involves far more people.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        isFinal: true,
        questions: [
          {
            topicId: "t-mass-meeting",
            type: "mcq",
            q: "Which of these best describes a mass meeting?",
            options: [
              "A meeting with just the VCG",
              "A large, village-wide meeting for most or all farmer families",
              "A one-on-one talk with a single farmer",
              "A meeting held only inside the MPP office",
            ],
            answer: 1,
            explain: "A mass meeting is large and village-wide, unlike a small-group meeting.",
          },
          {
            topicId: "t-choosing-right-meeting",
            type: "mcq",
            q: "A handful of farmers have a detailed complaint about payment delays. What is the better choice?",
            options: [
              "A mass meeting for the whole village",
              "A small-group meeting with just those farmers",
              "No meeting, just wait for it to resolve itself",
              "A health camp",
            ],
            answer: 1,
            explain:
              "Since only a few farmers are affected and the issue needs real discussion, a small-group meeting is the better choice.",
          },
        ],
      },
    },
  ],
};
