// ============================================================================
// Shreeja LMS — Module 2 draft: "Rationale of MPO"
// ENGLISH-ONLY DRAFT — no L() translation wrapper used yet.
// Written for learners with no formal education and no prior dairy
// knowledge (about a Class 7 reading level). Structure matches MODULES[0]
// (m1) in data.js exactly. Feed translations into this shape later.
//
// Source: "3. Rationale of MPO.pptx" (4 slides, image-only — read directly
// as images) + general knowledge of the Indian dairy Producer Company
// model, kept consistent with what Module 1 already teaches about
// Amul / NDDB / the three-tier cooperative structure.
// ============================================================================

export const module2 = {
  id: "m2",
  number: 2,
  title: "Rationale of MPO",
  subtitle:
    "Understand why the MPO model exists, how it is different from the old cooperative system, and how it is organised — from the farmer with a milk can all the way to the Board of Directors.",
  icon: "milk",
  available: true,
  lessons: [
    // ==================================================================
    // LESSON 1
    // ==================================================================
    {
      id: "m2-l1",
      title: "Why the MPO Model Was Born",
      estMinutes: 8,
      hook: [
        {
          type: "hero",
          heading: "Why the MPO Model Was Born",
          text: "You already know about Amul and cooperatives. Now let's learn about a newer idea — the MPO — and why it came about.",
        },
      ],
      topics: [
        {
          id: "t-what-is-mpo",
          title: "What Is an MPO?",
          teach: [
            {
              type: "text",
              heading: "A New Word: MPO",
              html: "<b>MPO</b> stands for <b>Milk Producer Organisation</b>. It is a company that is formed and owned by dairy farmers themselves — built to collect their milk, pay them fairly, and grow their business together.",
            },
            {
              type: "glossary",
              term: "MPO (Milk Producer Organisation)",
              meaning:
                "A company formed and owned by dairy farmers themselves, to collect, test and sell their milk together.",
            },
            {
              type: "glossary",
              term: "Producer Company",
              meaning:
                "The legal type of company under Indian law that lets farmers own and run a business together, with special rules that protect them.",
            },
            {
              type: "text",
              heading: "Built on What Already Worked",
              html: "In Module 1, you learned about the Anand Pattern cooperative — Village Society, District Union, State Federation. An MPO uses the same core idea, farmers owning the business together, but is organised as a newer, more flexible kind of company.",
            },
            {
              type: "callout",
              style: "info",
              heading: "MPO or MPC?",
              text: "You may also hear the word MPC (Milk Producer Company). In dairy work, MPO and MPC usually mean the same thing — a Producer Company that deals in milk.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What does MPO stand for?",
              options: [
                "Milk Producer Organisation",
                "Milk Purchase Office",
                "Milk Processing Outlet",
                "Ministry of Public Operations",
              ],
              answer: 0,
              explain: "MPO stands for Milk Producer Organisation — a company owned by the milk farmers themselves.",
            },
            {
              type: "truefalse",
              q: "An MPO is a company owned and run by the milk farmers themselves.",
              answer: true,
              explain: "Yes — an MPO is a farmer-owned company, just like a cooperative, but organised differently.",
            },
          ],
        },
        {
          id: "t-why-change",
          title: "Why Farmers Needed Something New",
          teach: [
            {
              type: "text",
              heading: "The World Was Changing",
              html: "From the 1990s, India opened its markets to the world. This is called <b>globalisation</b> — when countries trade and do business freely with each other. Big companies, including foreign ones, started selling milk products in India too.",
            },
            {
              type: "glossary",
              term: "Globalisation",
              meaning:
                "When countries trade and do business freely with each other, so companies from other countries can also sell in India.",
            },
            {
              type: "text",
              heading: "The Old Cooperative Structure Had Limits",
              html: "The Village Society → District Union → State Federation model worked very well for decades. But it was built under an old law meant mainly for village societies. It could not always move fast, raise money easily, or make quick business decisions, because many steps needed government approval.",
            },
            {
              type: "callout",
              style: "warning",
              heading: "A Real Problem",
              text: "In many states, the government had a strong say in how cooperatives were run — sometimes even in choosing board members or delaying elections. This made it harder for farmer-members to feel it was truly \"their own\" business.",
            },
            {
              type: "text",
              heading: "Connecting Farmers to Bigger Markets",
              html: "Milk producers needed a way to reach not just their district, but national and even global markets, and to compete with private and multi-national dairy companies — while still keeping farmers as the owners.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is 'globalisation'?",
              options: [
                "When one village trades only with itself",
                "When countries trade and do business freely with each other",
                "A new kind of cow breed",
                "A government rule against private companies",
              ],
              answer: 1,
              explain: "Globalisation means countries trade and do business freely with each other, opening up bigger markets and more competition.",
            },
            {
              type: "truefalse",
              q: "The old cooperative structure had no limits and never needed any reform.",
              answer: false,
              explain: "The old cooperative structure worked well for years, but it moved slowly and needed too much government approval — so a reform was needed.",
            },
          ],
        },
        {
          id: "t-alagh-act",
          title: "The Law That Made It Possible",
          teach: [
            {
              type: "text",
              heading: "A Committee Looks for a Solution",
              html: "The Government of India set up a committee led by economist <b>Dr. Y. K. Alagh</b> to study the problem, and to recommend a new legal way for farmers to form modern, farmer-owned businesses.",
            },
            {
              type: "glossary",
              term: "Committee",
              meaning:
                "A small group of experts asked by the government to study a problem and suggest solutions.",
            },
            {
              type: "timeline",
              heading: "From Idea to Law",
              items: [
                { year: "1990s", text: "Government sees the need for a new farmer-owned business model." },
                {
                  year: "Y. K. Alagh Committee",
                  text: "Studies the problem and recommends a new legal framework for producer-owned companies.",
                },
                {
                  year: "2002",
                  text: "Companies (Amendment) Act, 2002 is passed — it creates the legal idea of a 'Producer Company' for the first time.",
                },
                { year: "Today", text: "Thousands of Producer Companies, including many MPOs, now operate across India using this law." },
              ],
            },
            {
              type: "text",
              heading: "What the Act Achieved",
              html: "The new law combined the best of both worlds: the fairness and shared-ownership values of a cooperative, with the flexibility and professional efficiency of a modern company. This is exactly what MPOs use today.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Which law first created the legal idea of a 'Producer Company' in India?",
              options: [
                "Companies (Amendment) Act, 2002",
                "Right to Information Act",
                "Panchayati Raj Act",
                "Cooperative Societies Act",
              ],
              answer: 0,
              explain: "The Companies (Amendment) Act, 2002 introduced the concept of Producer Companies in Indian law.",
            },
            {
              type: "mcq",
              q: "Who led the committee that recommended this new legal framework?",
              options: ["Dr. Y. K. Alagh", "Dr. Verghese Kurien", "Dr. Anil Sharma", "M. S. Swaminathan"],
              answer: 0,
              explain: "Dr. Y. K. Alagh led the committee. (Dr. Verghese Kurien, from Module 1, led NDDB and Amul — a different, earlier chapter of the story.)",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-what-is-mpo",
            type: "mcq",
            q: "An MPO is best described as:",
            options: [
              "A government department",
              "A company formed and owned by dairy farmers themselves",
              "A private trader who buys milk cheaply",
              "A bank that only lends to farmers",
            ],
            answer: 1,
            explain: "An MPO (Milk Producer Organisation) is a company that dairy farmers form and own together.",
          },
          {
            topicId: "t-why-change",
            type: "truefalse",
            q: "One reason MPOs were needed was that old cooperatives needed a lot of government approval to make decisions.",
            answer: true,
            explain: "Yes — old cooperatives often needed government approval, which slowed things down and reduced farmers' sense of ownership.",
          },
          {
            topicId: "t-alagh-act",
            type: "mcq",
            q: "In what year was the law passed that created 'Producer Companies'?",
            options: ["1965", "1991", "2002", "2020"],
            answer: 2,
            explain: "The Companies (Amendment) Act was passed in 2002.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 2
    // ==================================================================
    {
      id: "m2-l2",
      title: "How an MPO Is Different — and Better",
      estMinutes: 9,
      hook: [
        {
          type: "hero",
          heading: "How an MPO Is Different — and Better",
          text: "Now that you know why MPOs began, let's see exactly what makes them different from the old system — and what that means for the farmers you'll work with.",
        },
      ],
      topics: [
        {
          id: "t-old-vs-new",
          title: "Cooperative vs Producer Company: What Changed?",
          teach: [
            {
              type: "text",
              heading: "Same Goal, Different Tools",
              html: "Both the old cooperative and the new MPO (Producer Company) want the same thing: farmers owning their own dairy business together. But they are built differently.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Government's role",
                  text: "Old cooperatives needed government approval for many decisions. An MPO is registered under the Companies Act and is run independently by its farmer-members.",
                },
                {
                  label: "Raising money",
                  text: "It was harder for old cooperatives to raise extra capital. An MPO, like any company, can raise funds more easily while keeping farmers as the owners.",
                },
                {
                  label: "Running the business",
                  text: "Old cooperatives sometimes mixed daily business decisions with village politics. An MPO separates ownership (farmers) from day-to-day management (trained staff).",
                },
                {
                  label: "Protection from takeover",
                  text: "An MPO's shares cannot be bought or sold on the stock market, so outside companies cannot buy control of it — farmers stay in charge.",
                },
              ],
            },
            {
              type: "glossary",
              term: "Stock Exchange",
              meaning:
                "A marketplace where shares of big companies are bought and sold by anyone. MPO shares can never be sold there.",
            },
            {
              type: "example",
              heading: "Think of It This Way",
              text: "Old cooperative: a village committee that needed the government's permission for many things. MPO: an independent company that farmers themselves fully own and control, using modern business rules.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is one key difference between an old cooperative and an MPO?",
              options: [
                "MPOs are owned by the government",
                "MPO shares cannot be traded on the stock exchange, which keeps farmer control safe",
                "MPOs are not allowed to sell milk",
                "Old cooperatives had no members at all",
              ],
              answer: 1,
              explain: "Because MPO shares can't be traded on the stock exchange, outside companies can't buy their way into control — farmers stay the owners.",
            },
            {
              type: "truefalse",
              q: "In an MPO, outside investors can easily buy shares on the stock market and take control.",
              answer: false,
              explain: "MPO (Producer Company) shares cannot be traded on the stock exchange, so this kind of takeover cannot happen.",
            },
          ],
        },
        {
          id: "t-legal-features",
          title: "The Rules That Protect Farmers",
          teach: [
            {
              type: "text",
              heading: "Who Can Start an MPO?",
              html: "The law says an MPO (Producer Company) can be formed by: at least <b>10 individual farmers</b>, OR at least <b>2 farmer institutions</b> (like existing societies), OR a mix of both.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "10 or more farmers",
                  text: "Any 10 or more individual milk producers can come together to form a Producer Company.",
                },
                {
                  label: "2 or more institutions",
                  text: "Two or more existing farmer institutions can also join together to form one.",
                },
                {
                  label: "One member, one vote",
                  text: "No matter how much milk a member supplies or how many shares they hold, every member gets exactly one vote. This keeps the company fair and democratic.",
                },
              ],
            },
            {
              type: "glossary",
              term: "One Member, One Vote",
              meaning:
                "A rule where every member has equal voting power, whether they are a big supplier or a small one.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Why This Matters to You",
              text: "As a Sahayak, this is important to explain to farmers: joining an MPO means they get a real, equal voice — not just a service they buy.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "How many individual producers are needed, at minimum, to form a Producer Company?",
              options: ["2", "5", "10", "50"],
              answer: 2,
              explain: "At least 10 individual producers (or 2 or more producer institutions) can form a Producer Company.",
            },
            {
              type: "mcq",
              q: "Under 'one member, one vote', a farmer who supplies more milk gets:",
              options: [
                "More votes than others",
                "Exactly one vote, the same as everyone else",
                "No vote at all",
                "Extra free shares automatically",
              ],
              answer: 1,
              explain: "Every member gets exactly one vote, no matter how much milk they supply — this keeps the MPO democratic.",
            },
          ],
        },
        {
          id: "t-farmer-benefits",
          title: "What's In It For the Farmer?",
          teach: [
            {
              type: "text",
              heading: "Five Reasons Farmers Join an MPO",
              html: "An MPO is built around five simple ideas. Together, they explain why farmers choose to join and stay.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Empowering Milk Producers",
                  text: "Farmers get training, support and a real say in decisions — not just a place to sell milk.",
                },
                {
                  label: "Democratic & Producer Owned",
                  text: "The company belongs to its farmer-members, who elect their own representatives.",
                },
                {
                  label: "Better Returns & Sustainability",
                  text: "Profits go back to farmer-members, and fair pricing means a more reliable, lasting income.",
                },
                {
                  label: "Professional Governance",
                  text: "Trained managers run daily operations, so the business runs efficiently — while farmers still own and guide it.",
                },
              ],
            },
            {
              type: "callout",
              style: "info",
              heading: "Stronger Together",
              text: "When many MPOs and cooperatives work well, the whole dairy sector gets stronger — better prices, better quality, and better lives for farming families across India.",
            },
            {
              type: "example",
              heading: "Remember Ramesh and Sita?",
              text: "Their village's Milk Pooling Point, run by an MPO, tested milk fairly and paid on time, every time. That is these benefits working in real life.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Which of these is a real benefit of joining an MPO?",
              options: [
                "Fair pricing, with profits shared with farmer-members",
                "Only the biggest farmers get paid",
                "No say in how the business is run",
                "Milk is tested in secret with no farmer present",
              ],
              answer: 0,
              explain: "MPOs are built to share profits fairly with member-farmers and to test milk openly and honestly.",
            },
            {
              type: "truefalse",
              q: "In an MPO, trained professional staff manage daily business while farmers remain the owners.",
              answer: true,
              explain: "That's the idea of 'Professional Governance' — professionals run daily work, but farmers own and guide the company.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-old-vs-new",
            type: "mcq",
            q: "Why can't an outside company easily take control of an MPO?",
            options: [
              "MPO shares cannot be traded on the stock exchange",
              "MPOs are too small to be interesting",
              "The government owns all MPOs",
              "MPOs are not allowed to have a Board",
            ],
            answer: 0,
            explain: "MPO shares can't be bought and sold on the stock exchange, which protects farmer ownership from outside takeover.",
          },
          {
            topicId: "t-legal-features",
            type: "truefalse",
            q: "In an MPO, a member with more shares gets more votes than a member with fewer shares.",
            answer: false,
            explain: "Every member gets exactly one vote under the 'one member, one vote' rule, regardless of shares held.",
          },
          {
            topicId: "t-farmer-benefits",
            type: "mcq",
            q: "Which pillar of an MPO means daily operations are run by trained managers, not just elected farmers?",
            options: ["Professional Governance", "Stronger Cooperatives", "Democratic & Producer Owned", "Empowering Milk Producers"],
            answer: 0,
            explain: "Professional Governance means trained staff handle daily operations, while farmer-members still own and guide the company.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 3 — CAPSTONE (module close)
    // ==================================================================
    {
      id: "m2-l3",
      title: "The Structure of an MPO",
      estMinutes: 8,
      hook: [
        {
          type: "hero",
          heading: "The Structure of an MPO",
          text: "How is an MPO actually organised, from a single farmer's milk can all the way up to the company's board? Let's map it out.",
        },
      ],
      topics: [
        {
          id: "t-operational-governance",
          title: "From Farmer to Board",
          teach: [
            {
              type: "text",
              heading: "Two Layers Where Farmers Have a Voice",
              html: "An MPO's structure starts with the farmer and builds upward through two layers: the <b>Operational</b> layer (local village groups) and the <b>Governance</b> layer (company-wide decisions).",
            },
            {
              type: "text",
              heading: "Operational: MPP and MPC",
              html: "Every producer member pours milk at their local <b>MPP</b> (Milk Pooling Point). Members at each MPP elect a small committee, sometimes called the <b>MPC</b> (Milk Producer Committee), to represent them. Several MPCs join together into bigger village-cluster groups, so that even a farmer in the smallest village has a representative all the way up.",
            },
            {
              type: "glossary",
              term: "MPP (Milk Pooling Point)",
              meaning:
                "The village-level place where farmers bring their milk to be measured, tested and collected by the MPO.",
            },
            {
              type: "text",
              heading: "Governance: General Body and Board",
              html: "All members of the MPO together form the <b>General Body</b> — its highest decision-making group. The General Body elects a <b>Board of Directors</b>, who set policy and watch over the company on behalf of every member.",
            },
            {
              type: "glossary",
              term: "Board of Directors",
              meaning: "A group of members elected to guide and watch over the company's business on behalf of all members.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is an MPP?",
              options: [
                "The village-level place where farmers bring milk to be measured, tested and collected",
                "A bank that lends money to farmers",
                "The head office of the state government",
                "A type of milk animal",
              ],
              answer: 0,
              explain: "MPP stands for Milk Pooling Point — the village-level milk collection place.",
            },
            {
              type: "mcq",
              q: "Who elects the Board of Directors of an MPO?",
              options: ["The state government", "The General Body of all members", "Only the Sahayaks", "The largest dairy company nearby"],
              answer: 1,
              explain: "The General Body — made up of all the MPO's members — elects the Board of Directors.",
            },
          ],
        },
        {
          id: "t-management-structure",
          title: "Who Runs the Business Every Day",
          teach: [
            {
              type: "text",
              heading: "Professionals Run the Daily Work",
              html: "The Board appoints a <b>Chief Executive (CEO)</b> to manage daily operations. Below the CEO are functional heads — for example, staff in charge of procurement, quality testing, or finance — and field staff, like the Sahayaks, who work directly with farmers every single day.",
            },
            {
              type: "glossary",
              term: "Chief Executive (CEO)",
              meaning: "The senior professional manager appointed by the Board to run the company's day-to-day business.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Why Separate Governance from Management?",
              text: "Farmers, through the General Body and Board, decide WHAT the company should do. Trained professional staff decide HOW to do it well, every day. This separation is a big reason MPOs run more smoothly than some older cooperatives, where daily business and village politics sometimes got mixed up.",
            },
            {
              type: "example",
              heading: "Where You Fit In",
              text: "As a Sahayak, you are part of the Management Structure — the field staff who connect the company's decisions to real farmers, every single day.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Who does the Board appoint to run the MPO's daily operations?",
              options: ["The Chief Executive (CEO)", "The state Registrar", "Any random member", "A private trader"],
              answer: 0,
              explain: "The Board appoints a Chief Executive (CEO) to manage day-to-day business.",
            },
            {
              type: "truefalse",
              q: "Sahayaks are members of the Board of Directors.",
              answer: false,
              explain: "Sahayaks are field staff in the Management Structure. The Board is made up of members elected by the General Body.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        isFinal: true,
        questions: [
          {
            topicId: "t-operational-governance",
            type: "mcq",
            q: "Which of these is part of the Operational structure of an MPO, closest to the farmer?",
            options: ["The MPP (Milk Pooling Point)", "The Chief Executive", "The state government", "A private bank"],
            answer: 0,
            explain: "The MPP is the village-level collection point where every farmer's journey with the MPO begins.",
          },
          {
            topicId: "t-operational-governance",
            type: "truefalse",
            q: "The General Body is made up of all the members of the MPO together.",
            answer: true,
            explain: "Yes — the General Body is the full membership meeting together, the highest decision-making group.",
          },
          {
            topicId: "t-management-structure",
            type: "mcq",
            q: "What is the main reason an MPO separates governance (farmers/Board) from management (CEO, staff)?",
            options: [
              "So daily business runs efficiently while farmers still own and guide the company",
              "So farmers never get to make any decisions",
              "So the government can control the company",
              "So Sahayaks can become Directors automatically",
            ],
            answer: 0,
            explain: "This separation keeps daily operations professional and efficient, while member-farmers retain ownership and direction through the Board.",
          },
        ],
      },
    },
  ],
};

export default module2;
