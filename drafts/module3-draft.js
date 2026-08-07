// ============================================================================
// Shreeja LMS — Module 3 draft: "Core Design Principle"
// ENGLISH-ONLY DRAFT — no L() translation wrapper used yet.
// Written for learners with no formal education and no prior dairy
// knowledge (about a Class 7 reading level). Structure matches MODULES[0]
// (m1) in data.js exactly. Feed translations into this shape later.
//
// Source: "04-core-design-principle.txt" (11 slides: warm-up + 8 design
// principles) and the Pragati Milk Producer Company (PMPC) case study in
// "13b-case-study-core-design-principle-CDPfolder.txt", used as the basis
// for the capstone lesson (module's final, isFinal lesson).
// ============================================================================

export const module3 = {
  id: "m3",
  number: 3,
  title: "Core Design Principle",
  subtitle:
    "Learn the core design principles that make an MPO work as a true farmer-owned business — from active membership to technology — and see them tested in a real case study.",
  icon: "milk",
  available: true,
  lessons: [
    // ==================================================================
    // LESSON 1
    // ==================================================================
    {
      id: "m3-l1",
      title: "Farmer, Milk Producer, or Member?",
      estMinutes: 8,
      hook: [
        {
          type: "hero",
          heading: "Farmer, Milk Producer, or Member?",
          text: "Three words that sound almost the same — but mean very different things in an MPO. Getting this right is the first design principle.",
        },
      ],
      topics: [
        {
          id: "t-three-words",
          title: "Three Words That Sound the Same, But Aren't",
          teach: [
            {
              type: "text",
              heading: "Why This Matters",
              html: "You will hear three similar words a lot in your work: <b>Farmer</b>, <b>Milk Producer</b>, and <b>Member</b>. They are not the same thing. Let's tell them apart.",
            },
            {
              type: "glossary",
              term: "Farmer",
              meaning: "Someone who works on land or keeps animals, growing crops or producing milk, for a living.",
            },
            {
              type: "glossary",
              term: "Milk Producer",
              meaning: "Any farmer who actually keeps milk animals and produces milk to sell — a more specific kind of farmer.",
            },
            {
              type: "glossary",
              term: "Member",
              meaning:
                "A milk producer who has formally joined the MPO, holds shares in it, and has ownership rights and duties.",
            },
            {
              type: "example",
              heading: "Not Every Milk Producer Is a Member",
              text: "A farmer down the road may produce milk every day, but if they have not joined the MPO — bought shares, filled the membership form — they are not a Member. Only Members truly own the company.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What makes someone a 'Member' of an MPO, and not just a milk producer?",
              options: [
                "Owning the most cows in the village",
                "Formally joining the MPO, holding shares, and taking on membership duties",
                "Living closest to the MPP",
                "Being the oldest farmer in the village",
              ],
              answer: 1,
              explain: "A Member has formally joined, holds shares, and has both rights and duties — not just anyone who produces milk.",
            },
            {
              type: "truefalse",
              q: "Every milk producer in a village is automatically a Member of the local MPO.",
              answer: false,
              explain: "A milk producer only becomes a Member after formally joining the MPO and taking up shares.",
            },
          ],
        },
        {
          id: "t-members-only",
          title: "Business Only With Members",
          teach: [
            {
              type: "text",
              heading: "Design Principle 1: Business Only With Members",
              html: "An MPO's most basic rule is: it does business only with its own <b>Members</b>. Why? Because an MPO is a user-owned enterprise — it belongs to the very people who use its services. Non-members should not get the same benefits without sharing the same responsibilities.",
            },
            {
              type: "callout",
              style: "warning",
              heading: "What Goes Wrong Otherwise",
              text: "If an MPO accepts milk from non-members too, it can hurt the very members who invested their own share capital and time — because outsiders get the same payment and services for free, without any ownership stake or duty.",
            },
            {
              type: "text",
              heading: "How MPOs Make This Work",
              html: "To keep this rule strong, MPOs keep membership enrolment simple and easy, get Board approval for new members, and give each member a special code so only members' milk is accepted for payment.",
            },
            {
              type: "glossary",
              term: "Share Capital",
              meaning: "Money that a member pays into the company to become a part-owner, in return for shares.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Why does an MPO do business only with its Members?",
              options: [
                "Because it is a user-owned enterprise, and benefits should go to those who share the responsibilities",
                "Because the government forbids selling to non-members",
                "Because non-members produce worse milk",
                "Because Members pay higher prices",
              ],
              answer: 0,
              explain: "An MPO belongs to its Members. Business only with Members keeps ownership and benefit fairly linked.",
            },
            {
              type: "truefalse",
              q: "It is good practice for an MPO to buy milk from non-members regularly, alongside members.",
              answer: false,
              explain: "This weakens the MPO's ownership model and is unfair to Members who invested share capital and took on duties.",
            },
          ],
        },
        {
          id: "t-active-membership",
          title: "Active Members, Not Free Riders",
          teach: [
            {
              type: "text",
              heading: "Design Principle 2: No Free Riders",
              html: "Being a Member is not just a one-time sign-up. Members are expected to stay active — regularly supplying milk and taking part in meetings. Someone who joined once, took the benefits, but never supplies milk or shows up, is a <b>free rider</b>.",
            },
            {
              type: "glossary",
              term: "Free Rider",
              meaning: "Someone who enjoys the benefits of membership without actively contributing to or participating in the business.",
            },
            {
              type: "callout",
              style: "info",
              heading: "Why This Matters",
              text: "Active participation makes the business predictable and efficient. If too many members are inactive, it becomes harder to plan operations, and it wastes the company's resources.",
            },
            {
              type: "text",
              heading: "How MPOs Encourage Active Membership",
              html: "MPOs follow up regularly with new members to make sure they start supplying milk. They hold special meetings with members who are not supplying milk regularly. And anyone who wants to stand for election as a Director must meet stricter conditions, like being a regular, active supplier.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is a 'free rider' in an MPO?",
              options: [
                "A farmer who delivers milk on a bicycle",
                "Someone who enjoys membership benefits without actively contributing or participating",
                "A member who wins a Board election",
                "A Sahayak who visits every MPP",
              ],
              answer: 1,
              explain: "A free rider takes the benefits of membership without regularly supplying milk or taking part.",
            },
            {
              type: "mcq",
              q: "What is expected of a member who wants to stand for election as a Director?",
              options: [
                "Nothing extra is expected",
                "They must meet stricter conditions, like being a regular, active milk supplier",
                "They must own the most land in the village",
                "They must be related to a current Director",
              ],
              answer: 1,
              explain: "MPOs apply stricter conditions for Director candidates, to make sure leaders are genuinely active members.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-three-words",
            type: "mcq",
            q: "Which word describes a person who has formally joined the MPO and holds shares in it?",
            options: ["Farmer", "Milk Producer", "Member", "Trader"],
            answer: 2,
            explain: "A Member is a milk producer who has formally joined the MPO and holds shares, with ownership rights and duties.",
          },
          {
            topicId: "t-members-only",
            type: "truefalse",
            q: "An MPO's basic rule is to do business only with its Members.",
            answer: true,
            explain: "Yes — this is Design Principle 1, and it protects the value of being a Member.",
          },
          {
            topicId: "t-active-membership",
            type: "mcq",
            q: "Why do MPOs discourage 'free riders'?",
            options: [
              "Because too many inactive members make business planning harder and waste resources",
              "Because free riders produce more milk than everyone else",
              "Because the law bans inactive members entirely",
              "Because free riders are always dishonest",
            ],
            answer: 0,
            explain: "Inactive membership makes operations unpredictable and wastes company resources — so MPOs encourage active participation.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 2
    // ==================================================================
    {
      id: "m3-l2",
      title: "Owning a Real Stake",
      estMinutes: 9,
      hook: [
        {
          type: "hero",
          heading: "Owning a Real Stake",
          text: "Real ownership means more than a membership card. Let's see how MPOs link ownership to real contribution — and how members get heard.",
        },
      ],
      topics: [
        {
          id: "t-skin-in-game",
          title: "Equity in Proportion to Patronage",
          teach: [
            {
              type: "text",
              heading: "Design Principle 3: Skin in the Game",
              html: "In an MPO, the more milk a member supplies, the more shares (<b>equity</b>) they are expected to hold. This is sometimes called having <b>'skin in the game'</b> — members have their own money invested, so they care about protecting the company.",
            },
            {
              type: "glossary",
              term: "Patronage",
              meaning: "How much business — in this case, how much milk — a member actually gives to the company.",
            },
            {
              type: "glossary",
              term: "Equity",
              meaning: "The share of ownership a member holds in the company, based on the shares they bought.",
            },
            {
              type: "example",
              heading: "In Numbers",
              text: "If a member supplies twice as much milk as another member, the company expects them to hold roughly twice as much equity too — keeping ownership fair and linked to real contribution.",
            },
            {
              type: "text",
              heading: "How MPOs Make This Work",
              html: "MPOs display each member's patronage details at the MPP, hand out share certificates on time, and share information about profits — so members can see and trust the link between what they give and what they own.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What does 'skin in the game' mean for a member of an MPO?",
              options: [
                "They have their own money invested, so they care about protecting the company",
                "They must physically work at the MPP every day",
                "They get free milk for their family",
                "They are exempt from all rules",
              ],
              answer: 0,
              explain: "Skin in the game means a member has real money (equity) invested, giving them a genuine stake in the company's success.",
            },
            {
              type: "truefalse",
              q: "A member's equity (shares) should be linked to how much milk they actually supply.",
              answer: true,
              explain: "Yes — equity in proportion to patronage keeps ownership fair and tied to real contribution.",
            },
          ],
        },
        {
          id: "t-member-classes",
          title: "Fair Representation on the Board",
          teach: [
            {
              type: "text",
              heading: "Design Principle 4: Member Classes",
              html: "Not all members supply the same amount of milk. So an MPO can group members into different <b>classes</b> based on how much milk (patronage) they supply, and give each class fair representation on the Board.",
            },
            {
              type: "glossary",
              term: "Member Class",
              meaning: "A group of members categorised by how much milk they supply, used to make sure the Board fairly represents everyone.",
            },
            {
              type: "text",
              heading: "Why This Is Fair",
              html: "Board seats for each member class are decided in proportion to the milk that class supplies. This way, both big and small suppliers get a genuine voice in decisions — not just the loudest or the largest.",
            },
            {
              type: "callout",
              style: "info",
              heading: "Decided Together",
              text: "How members are grouped into classes is approved at the company's AGM — a yearly meeting where all members can take part in big decisions.",
            },
            {
              type: "glossary",
              term: "AGM (Annual General Meeting)",
              meaning: "A meeting held once a year where all members of the company gather to review performance and make key decisions.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Why does an MPO create 'member classes' based on patronage?",
              options: [
                "To make sure the Board fairly represents both big and small milk suppliers",
                "To stop small farmers from joining at all",
                "To give free shares to the largest supplier",
                "To reduce the number of members",
              ],
              answer: 0,
              explain: "Member classes ensure Board representation is fair and proportional to how much each group contributes.",
            },
            {
              type: "mcq",
              q: "Where is the grouping of members into classes approved?",
              options: ["At a private meeting of the CEO alone", "At the AGM (Annual General Meeting)", "By the state government", "By a private trader"],
              answer: 1,
              explain: "Member class categorisation is approved at the AGM, where all members can take part.",
            },
          ],
        },
        {
          id: "t-grievance",
          title: "Being Heard: Communication and Grievance Redressal",
          teach: [
            {
              type: "text",
              heading: "Design Principle 5: A Way to Be Heard",
              html: "Members need an easy way to talk to their company — and to complain when something goes wrong. This is called <b>grievance redressal</b>.",
            },
            {
              type: "glossary",
              term: "Grievance Redressal",
              meaning: "A proper system for members to raise complaints and get them resolved.",
            },
            {
              type: "text",
              heading: "Tools MPOs Use",
              html: "Many MPOs provide a toll-free phone number for members to register complaints, and appoint a <b>Grievance Redressal Officer (GRO)</b> whose job is to solve them. Village and member representative groups hold regular meetings and share notes with senior company officials.",
            },
            {
              type: "glossary",
              term: "GRO (Grievance Redressal Officer)",
              meaning: "The staff member responsible for handling and resolving member complaints.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Why It Builds Trust",
              text: "When members know exactly who to call, and see their problems actually get solved, they trust the company more — and stay active, engaged members.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is the job of a GRO (Grievance Redressal Officer)?",
              options: [
                "To handle and resolve member complaints",
                "To sell milk to non-members",
                "To run the Board elections only",
                "To manage the milk tankers",
              ],
              answer: 0,
              explain: "The GRO is specifically responsible for handling and resolving members' complaints.",
            },
            {
              type: "truefalse",
              q: "A toll-free number and a GRO are examples of tools that help with grievance redressal.",
              answer: true,
              explain: "Yes — these are practical tools MPOs use to make sure members can be heard and helped.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-skin-in-game",
            type: "mcq",
            q: "A member's equity (shares) in an MPO should ideally be linked to:",
            options: ["Their age", "How much milk (patronage) they supply", "How far they live from the MPP", "Their family size"],
            answer: 1,
            explain: "Equity in proportion to patronage keeps ownership fair and tied to real contribution — 'skin in the game'.",
          },
          {
            topicId: "t-member-classes",
            type: "truefalse",
            q: "Member class categorisation must be approved at the AGM.",
            answer: true,
            explain: "Yes — this decision is made together with all members at the Annual General Meeting.",
          },
          {
            topicId: "t-grievance",
            type: "mcq",
            q: "Why do MPOs set up a formal grievance redressal system?",
            options: [
              "So members have a clear way to raise and resolve complaints, which builds trust",
              "So complaints can be ignored more easily",
              "Because the law requires no communication with members",
              "To reduce the number of members",
            ],
            answer: 0,
            explain: "A formal system for hearing and resolving complaints keeps members engaged and builds their trust in the company.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 3
    // ==================================================================
    {
      id: "m3-l3",
      title: "Running It Like a Real Business",
      estMinutes: 8,
      hook: [
        {
          type: "hero",
          heading: "Running It Like a Real Business",
          text: "An MPO is not just a village committee — it is a real company competing in the market. Let's see what that takes.",
        },
      ],
      topics: [
        {
          id: "t-professional-mgmt",
          title: "Run by Trained Professionals",
          teach: [
            {
              type: "text",
              heading: "Design Principle 6: Professional Management",
              html: "An MPO is a real business enterprise, competing with private and multi-national dairy companies. To succeed, it needs properly trained, capable people running it.",
            },
            {
              type: "text",
              heading: "How MPOs Build This",
              html: "MPOs recruit capable staff, train and groom them for their roles, and adopt the best practices used across the dairy business — not just old habits.",
            },
            {
              type: "callout",
              style: "info",
              heading: "Big Enough to Matter",
              text: "A design goal for every MPO is to reach a scale of business that is big enough to sustain itself — enough milk, enough members, enough income — so it does not depend forever on outside support.",
            },
            {
              type: "glossary",
              term: "Economy of Scale",
              meaning: "When a business becomes more efficient and cost-effective as it grows bigger.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Why does an MPO need professionally trained management?",
              options: [
                "Because it competes with private and multi-national dairy companies, and needs to run efficiently",
                "Because the law requires it to hire only outsiders",
                "Because farmers are not capable of any decisions",
                "Because it has no real business to run",
              ],
              answer: 0,
              explain: "As a real business competing in the market, an MPO needs skilled, trained people to run it well.",
            },
            {
              type: "truefalse",
              q: "'Economy of scale' means a business becomes more efficient and cost-effective as it grows bigger.",
              answer: true,
              explain: "Correct — bigger, well-run scale usually brings down costs per unit and improves efficiency.",
            },
          ],
        },
        {
          id: "t-value-chain",
          title: "Getting the Most Value for Members",
          teach: [
            {
              type: "text",
              heading: "Design Principle 7: Managing the Whole Value Chain",
              html: "From the moment milk leaves a farmer's animal to the moment it reaches a customer as milk, curd, or ghee, every step is called the <b>value chain</b>. An MPO tries to manage this whole chain efficiently, so more value — and more money — reaches the farmer-members.",
            },
            {
              type: "glossary",
              term: "Value Chain",
              meaning: "Every step a product passes through, from raw milk at the farm to the finished product reaching a customer.",
            },
            {
              type: "text",
              heading: "How MPOs Do This",
              html: "They standardise how every part of the business works using <b>SOPs</b> (Standard Operating Procedures), hire quality auditors to check accounting practices, and have the Board regularly review how the business is performing — market by market, product by product.",
            },
            {
              type: "glossary",
              term: "SOP (Standard Operating Procedure)",
              meaning: "A written, step-by-step way of doing a task, so it is done correctly and the same way every time.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is the 'value chain' of milk?",
              options: [
                "Every step from raw milk at the farm to the finished product reaching a customer",
                "Only the moment milk is collected at the MPP",
                "The price printed on a milk packet",
                "The list of Board members",
              ],
              answer: 0,
              explain: "The value chain covers every step milk passes through, from the farm to the final product a customer buys.",
            },
            {
              type: "mcq",
              q: "What does SOP stand for?",
              options: ["Standard Operating Procedure", "State Office Policy", "Special Ownership Plan", "Simple Order Process"],
              answer: 0,
              explain: "SOP means Standard Operating Procedure — a consistent, written way of doing a task correctly.",
            },
          ],
        },
        {
          id: "t-technology",
          title: "Using Technology for Transparency",
          teach: [
            {
              type: "text",
              heading: "Design Principle 8: Technology for Trust",
              html: "Good governance needs good information. MPOs use technology to track data accurately, keep members updated, and stay ready for new tools in the future.",
            },
            {
              type: "text",
              heading: "What This Looks Like",
              html: "MPOs share each member's equity and patronage details regularly, automate as much of the process as they can (like the DPMCU machines you may use at an MPP), and adopt new digital tools to stay future-ready.",
            },
            {
              type: "glossary",
              term: "DPMCU (Dairy Producer Milk Collection Unit)",
              meaning: "A machine at the MPP that automatically measures milk quantity and quality, and prints a receipt.",
            },
            {
              type: "callout",
              style: "warning",
              heading: "What Happens Without It",
              text: "Without reliable technology and data, it becomes hard to know which members are active, resolve payment disputes fairly, or build member trust. You'll see exactly what this looks like in the next lesson's real case study.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is a DPMCU used for?",
              options: [
                "Automatically measuring milk quantity and quality at the MPP, and printing a receipt",
                "Paying member salaries",
                "Running Board elections",
                "Transporting milk to the city",
              ],
              answer: 0,
              explain: "A DPMCU is the machine at the MPP that measures milk and prints a collection receipt.",
            },
            {
              type: "truefalse",
              q: "Reliable technology and data help build trust and resolve disputes fairly in an MPO.",
              answer: true,
              explain: "Yes — good data and technology support transparency, fairness, and member trust.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-professional-mgmt",
            type: "mcq",
            q: "Why do MPOs need to run like professionally managed businesses?",
            options: [
              "Because they compete with private and multi-national dairy companies",
              "Because farmers are not allowed to be involved",
              "Because the government manages them directly",
              "Because there is no real competition in dairy",
            ],
            answer: 0,
            explain: "MPOs compete in a real market, so they need trained, professional management to succeed and grow.",
          },
          {
            topicId: "t-value-chain",
            type: "truefalse",
            q: "Managing the value chain well helps more money reach the farmer-members.",
            answer: true,
            explain: "Efficient value chain management increases the value captured at each step, benefiting member-farmers.",
          },
          {
            topicId: "t-technology",
            type: "mcq",
            q: "What is one benefit of using technology like DPMCUs at the MPP?",
            options: [
              "Accurate, automatic measurement that builds transparency and trust",
              "It removes the need for any farmers to supply milk",
              "It replaces the Board of Directors",
              "It stops members from asking questions",
            ],
            answer: 0,
            explain: "Technology like DPMCUs makes measurement accurate and consistent, supporting transparency and trust.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 4 — CASE STUDY (module capstone)
    // ==================================================================
    {
      id: "m3-l4",
      title: "Case Study: What Went Wrong at Pragati MPC",
      estMinutes: 13,
      hook: [
        {
          type: "hero",
          heading: "Case Study: Pragati Milk Producer Company",
          text: "Every design principle you just learned exists for a reason. Let's see what happens to a real MPO when some of them start slipping.",
        },
      ],
      topics: [
        {
          id: "t-pmpc-growth",
          title: "A Company That Grew Fast",
          teach: [
            {
              type: "text",
              heading: "Meet Pragati MPC",
              html: "Pragati Milk Producer Company Limited (PMPC) was set up in 2018 to give milk producers across 42 villages an organised, fair market for their milk. The dream: farmers would not just sell milk, but truly own the business.",
            },
            {
              type: "stat-grid",
              items: [
                { label: "18 MPPs", text: "PMPC grew its milk collection network to 18 Milk Pooling Points across its area." },
                { label: "1 Bulk Chilling Centre", text: "One Bulk Milk Chilling Centre (BMC) can chill up to 10,000 litres of milk a day." },
                { label: "Village Sahayaks", text: "Village-level Sahayaks handle milk collection, member engagement and record-keeping." },
              ],
            },
            {
              type: "ledger",
              heading: "A Sahayak's Average Monthly Income at PMPC",
              rows: [
                { label: "Milk collection commission", amount: "₹8,750" },
                { label: "Input sales commission", amount: "₹2,100" },
                { label: "Incentives", amount: "₹1,650" },
                { label: "Other income", amount: "₹3,500" },
              ],
              total: { label: "Total average income", amount: "₹16,000" },
            },
            {
              type: "text",
              heading: "Five Years Later, Cracks Appear",
              html: "After five years, the Board of Directors began to worry. Membership numbers looked great on paper — but something felt wrong underneath.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "In which year was Pragati Milk Producer Company (PMPC) established?",
              options: ["2002", "2018", "2020", "2026"],
              answer: 1,
              explain: "PMPC was established in 2018, to give milk producers across 42 villages an organised market.",
            },
            {
              type: "mcq",
              q: "How many Milk Pooling Points (MPPs) did PMPC operate?",
              options: ["8", "12", "18", "42"],
              answer: 2,
              explain: "PMPC expanded its network to 18 MPPs, plus one Bulk Milk Chilling Centre.",
            },
          ],
        },
        {
          id: "t-warning-signs",
          title: "The Warning Signs",
          teach: [
            {
              type: "text",
              heading: "Members On Paper vs Members in Practice",
              html: "PMPC had enrolled thousands of members. But how many were actually active — regularly bringing milk and taking part?",
            },
            {
              type: "stat-grid",
              items: [
                { label: "4,850 registered members", text: "The total number of members enrolled in the company." },
                {
                  label: "3,210 supplied milk at least once",
                  text: "Only about two-thirds of registered members even brought milk in the past month.",
                },
                {
                  label: "1,985 regular suppliers",
                  text: "Fewer than half of all members supplied milk on more than 25 days that month — the truly active core.",
                },
              ],
            },
            {
              type: "callout",
              style: "warning",
              heading: "The Free Rider Problem, in Real Life",
              text: "Worse, 638 non-members were also selling milk to PMPC's MPPs — receiving almost the same payment and service as real members, without buying shares or taking on any membership duties. This is exactly the 'free rider' problem you learned about, and it made active members feel cheated.",
            },
            {
              type: "text",
              heading: "Weak Skin in the Game",
              html: "Many members who now supplied a lot more milk than before still held only the smallest, minimum required shares — breaking the link between patronage and equity that Design Principle 3 calls for.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Out of 4,850 registered members, how many were regular suppliers (more than 25 days a month)?",
              options: ["638", "1,985", "3,210", "4,850"],
              answer: 1,
              explain: "Only 1,985 members were regular suppliers — a much smaller number than total registered membership.",
            },
            {
              type: "truefalse",
              q: "PMPC's non-member milk suppliers were a healthy sign of a well-run MPO.",
              answer: false,
              explain: "Non-members getting near-identical benefits without ownership duties is the 'free rider' problem — it weakens the MPO model and upsets real members.",
            },
          ],
        },
        {
          id: "t-fixing-it",
          title: "Fixing the System",
          teach: [
            {
              type: "text",
              heading: "Technology Troubles Too",
              html: "PMPC had installed DPMCU machines at all 18 MPPs, but breakdowns were common. In one year alone, there were 126 total days of downtime, caused by printer failures, testing-machine failures, and other issues.",
            },
            {
              type: "barchart",
              heading: "DPMCU Breakdown Incidents (One Year)",
              source: "PMPC internal case study data",
              unit: "incidents",
              data: [
                { label: "Printer failure", value: 41 },
                { label: "Software sync problems", value: 37 },
                { label: "Analyzer failure", value: 29 },
                { label: "Power backup failure", value: 24 },
                { label: "Weigh scale issues", value: 18 },
              ],
            },
            {
              type: "text",
              heading: "No Way to Complain Properly",
              html: "Members had complaints — about payments, milk testing, membership and share capital — 522 complaints in total during the year. But there was no formal system to register or track them. Most were just told to the Sahayak by word of mouth, and many were forgotten.",
            },
            {
              type: "text",
              heading: "The Board's Response",
              html: "The Board considered spending about ₹42 lakh over three years on a digital system (a CRM platform and mobile app) to fix record-keeping, communication and grievance redressal. Some directors worried technology alone would not fix deeper problems, like weak active-membership rules and low participation.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Back to the Design Principles",
              text: "PMPC's real fix is not just new software — it is going back to basics: enforcing 'business only with members', encouraging active participation, linking equity to patronage, and building a proper grievance system. Technology can help, but only alongside strong design principles.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "About how many member complaints did PMPC receive in one year, with no formal tracking system?",
              options: ["126", "42", "522", "638"],
              answer: 2,
              explain: "PMPC received 522 complaints in the year, but had no formal system to register or track them.",
            },
            {
              type: "truefalse",
              q: "Buying new technology alone is enough to fix all of PMPC's governance problems.",
              answer: false,
              explain: "Technology helps, but PMPC also needs to strengthen its core design principles — active membership, equity linked to patronage, and grievance redressal.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        isFinal: true,
        questions: [
          {
            topicId: "t-pmpc-growth",
            type: "mcq",
            q: "PMPC was set up to give milk producers across how many villages an organised market?",
            options: ["18", "42", "126", "522"],
            answer: 1,
            explain: "PMPC served a semi-rural cluster of 42 villages.",
          },
          {
            topicId: "t-warning-signs",
            type: "mcq",
            q: "What did the gap between 4,850 registered members and 1,985 regular suppliers reveal?",
            options: [
              "That most members were highly active and engaged",
              "That a large share of 'members' were inactive or barely participating",
              "That PMPC had too few registered members",
              "That non-members were the most loyal suppliers",
            ],
            answer: 1,
            explain: "The big gap between registered and regularly active members showed weak active-membership enforcement — a warning sign for any MPO.",
          },
          {
            topicId: "t-warning-signs",
            type: "truefalse",
            q: "Accepting milk from 638 non-members alongside members is a good long-term practice for an MPO.",
            answer: false,
            explain: "This is the 'free rider' problem — it weakens the value of membership and can create dissatisfaction among genuine member-owners.",
          },
          {
            topicId: "t-fixing-it",
            type: "mcq",
            q: "What is the biggest lesson from PMPC's story?",
            options: [
              "Technology alone can fix any governance problem",
              "Strong design principles — active membership, fair equity, grievance redressal — matter as much as technology",
              "MPOs should stop accepting new members",
              "Case studies are not useful for real MPOs",
            ],
            answer: 1,
            explain: "PMPC's troubles show that design principles and technology must work together — neither one alone is enough to keep an MPO healthy.",
          },
        ],
      },
    },
  ],
};

export default module3;
