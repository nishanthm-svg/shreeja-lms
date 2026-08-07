// ============================================================================
// Shreeja LMS — Content data
// All lesson/quiz content lives here so new modules/lessons can be added
// without touching app.js.
// ============================================================================

export const MODULES = [
  {
    id: "m1",
    number: 1,
    title: "Introduction to Dairy",
    subtitle:
      "A comprehensive overview of global and national milk production, from grassroots initiatives to industry transformation.",
    icon: "milk",
    available: true,
    lessons: [
      // ------------------------------------------------------------------
      {
        id: "m1-l1",
        title: "Welcome to the World of Dairy",
        estMinutes: 5,
        blocks: [
          {
            type: "hero",
            heading: "Introduction to Dairy",
            text: "A comprehensive overview of global and national milk production, from grassroots initiatives to industry transformation.",
          },
          {
            type: "text",
            heading: "Why Dairy Matters",
            html: "Milk is one of the most important sources of nutrition and livelihood in the world. For millions of rural families — including the farmers you work with every day — dairy isn't just a product, it's a way of life. Before we dive into numbers, let's test what you already know.",
          },
          {
            type: "callout",
            style: "info",
            heading: "Did you know?",
            text: "Dairy supports rural livelihoods, strengthens the agri-economy, and is key to food security across the world — especially in countries like India where millions of small farmers depend on it.",
          },
          {
            type: "poll",
            heading: "Quick Poll — Let's Start!",
            questions: [
              {
                q: "Which is the largest milk producing country in the world?",
                options: ["USA", "China", "India", "Pakistan"],
                answer: 2,
                reveal:
                  "India leads global milk production, surpassing traditional dairy powerhouses through innovative cooperative models and widespread rural participation.",
              },
              {
                q: "Which is the largest milk producing state in India?",
                options: ["Rajasthan", "Uttar Pradesh", "Gujarat", "Punjab"],
                answer: 1,
                reveal:
                  "Uttar Pradesh tops the list, contributing significantly to India's position as the world's largest milk producer.",
              },
              {
                q: "Which of these is NOT among the top 5 milk producing states in India?",
                options: ["Rajasthan", "Andhra Pradesh", "Gujarat", "Kerala"],
                answer: 3,
                reveal:
                  "Rajasthan, Andhra Pradesh, Gujarat, and Punjab join Uttar Pradesh in forming the powerhouse of India's dairy sector.",
              },
            ],
          },
          {
            type: "text",
            heading: "What You'll Learn in This Module",
            html: "Over the next few lessons, you'll explore the world milk scenario, India's milk scenario state-by-state, the incredible journey that turned India from a milk-deficit nation into the world's largest milk producer, and the role of NDDB in making it all happen.",
          },
        ],
        quiz: {
          passScore: 70,
          questions: [
            {
              type: "mcq",
              q: "What is the largest milk producing country in the world?",
              options: ["USA", "China", "India", "New Zealand"],
              answer: 2,
              explanation:
                "India is the world's largest milk producer, ahead of the USA, Pakistan and China.",
            },
            {
              type: "mcq",
              q: "Which state leads India in milk production?",
              options: ["Rajasthan", "Punjab", "Uttar Pradesh", "Gujarat"],
              answer: 2,
              explanation: "Uttar Pradesh is India's top milk producing state.",
            },
            {
              type: "truefalse",
              q: "Dairy is important mainly for large commercial farms, not small rural households.",
              answer: false,
              explanation:
                "Dairy is a vital source of nutrition and livelihood for millions of small and rural households, not just large farms.",
            },
            {
              type: "mcq",
              q: "Which of the following is one of India's top 5 milk producing states?",
              options: ["Kerala", "Andhra Pradesh", "Goa", "Sikkim"],
              answer: 1,
              explanation:
                "Andhra Pradesh is among the top 5, alongside Uttar Pradesh, Rajasthan, Gujarat and Punjab.",
            },
          ],
        },
      },
      // ------------------------------------------------------------------
      {
        id: "m1-l2",
        title: "The Global Milk Scenario",
        estMinutes: 8,
        blocks: [
          {
            type: "text",
            heading: "World Milk Scenario",
            html: "Milk is a vital source of nutrition and livelihoods worldwide. Global production is spread across many countries, but a handful of nations dominate the numbers. Let's look at who's producing the most milk today.",
          },
          {
            type: "barchart",
            heading: "Global Leaders in Milk Production (Million Metric Tonnes)",
            source: "Source: FAOSTAT 2025",
            unit: "MMT",
            data: [
              { label: "India", value: 241, flag: "🇮🇳" },
              { label: "USA", value: 102, flag: "🇺🇸" },
              { label: "Pakistan", value: 65, flag: "🇵🇰" },
              { label: "China", value: 44, flag: "🇨🇳" },
              { label: "Brazil", value: 37, flag: "🇧🇷" },
              { label: "Germany", value: 34, flag: "🇩🇪" },
              { label: "Russia", value: 33, flag: "🇷🇺" },
              { label: "France", value: 24, flag: "🇫🇷" },
              { label: "New Zealand", value: 22, flag: "🇳🇿" },
              { label: "Türkiye", value: 21, flag: "🇹🇷" },
            ],
          },
          {
            type: "example",
            heading: "Worked Example",
            text: "India produced 241 MMT of milk, while the USA — the second largest producer — produced 102 MMT. That means India produces more than double (about 2.4x) the milk of the USA, and over 11x more than New Zealand, a country famous worldwide for its dairy exports.",
          },
          {
            type: "stat-grid",
            items: [
              {
                label: "Nutrition & Livelihoods",
                text: "Milk is a vital source of nutrition and livelihoods worldwide.",
              },
              {
                label: "Diverse Landscape",
                text: "Production is spread across continents — from Asia to Europe to Oceania.",
              },
              {
                label: "Food Security",
                text: "Dairy is key to food security, rural economy & sustainable growth.",
              },
              {
                label: "Global Collaboration",
                text: "Countries are collaborating for a stronger global dairy future.",
              },
            ],
          },
          {
            type: "callout",
            style: "tip",
            heading: "Why this matters for you",
            text: "When you explain to a farmer why their milk matters, remember: they are part of a chain that makes India the single largest contributor to the world's milk supply. Every litre counts on a global scale.",
          },
        ],
        quiz: {
          passScore: 70,
          questions: [
            {
              type: "mcq",
              q: "According to FAOSTAT 2025, which country is the second largest milk producer in the world?",
              options: ["China", "Pakistan", "USA", "Germany"],
              answer: 2,
              explanation: "The USA is the second largest producer at 102 MMT.",
            },
            {
              type: "mcq",
              q: "Roughly how many times more milk does India produce compared to the USA?",
              options: ["About the same", "1.2 times", "About 2.4 times", "10 times"],
              answer: 2,
              explanation: "241 MMT ÷ 102 MMT ≈ 2.4 times.",
            },
            {
              type: "truefalse",
              q: "New Zealand produces more milk than Germany, according to this data.",
              answer: false,
              explanation:
                "Germany (34 MMT) produces more than New Zealand (22 MMT) in this dataset.",
            },
            {
              type: "mcq",
              q: "Which of these countries produced the LEAST milk among the top 10 listed?",
              options: ["Türkiye", "France", "Russia", "Brazil"],
              answer: 0,
              explanation: "Türkiye, at 21 MMT, is the smallest producer among the top 10 shown.",
            },
          ],
        },
      },
      // ------------------------------------------------------------------
      {
        id: "m1-l3",
        title: "India's Milk Scenario — State by State",
        estMinutes: 8,
        blocks: [
          {
            type: "text",
            heading: "National Milk Scenario",
            html: "India's milk production is led by diverse states, each with strong dairy ecosystems. Understanding which states — and regions — contribute the most helps you see where your work fits into the bigger national picture.",
          },
          {
            type: "barchart",
            heading: "Milk Production by State ('000 MT)",
            source: "Source: BAHS 2025",
            unit: "'000 MT",
            data: [
              { label: "Uttar Pradesh", value: 39 },
              { label: "Rajasthan", value: 36 },
              { label: "Madhya Pradesh", value: 22 },
              { label: "Gujarat", value: 19 },
              { label: "Maharashtra", value: 16 },
              { label: "Punjab", value: 15 },
              { label: "Andhra Pradesh", value: 14 },
              { label: "Karnataka", value: 14 },
              { label: "Bihar", value: 14 },
              { label: "Haryana", value: 13 },
              { label: "Tamil Nadu", value: 11 },
              { label: "West Bengal", value: 8 },
              { label: "Telangana", value: 6 },
              { label: "Jharkhand", value: 3 },
              { label: "Jammu & Kashmir", value: 3 },
            ],
          },
          {
            type: "stat-grid",
            items: [
              {
                label: "Uttar Pradesh Leads",
                text: "Uttar Pradesh leads the country in milk production with 39 '000 MT.",
              },
              {
                label: "Top 5 States",
                text: "The top 5 states contribute over 65% of the total milk production.",
              },
              {
                label: "Strong Contribution",
                text: "States across North, West and South India all contribute strongly.",
              },
            ],
          },
          {
            type: "example",
            heading: "Worked Example",
            text: "The top 5 states — Uttar Pradesh (39), Rajasthan (36), Madhya Pradesh (22), Gujarat (19) and Maharashtra (16) — together account for well over half of India's milk production. This shows why cooperative and procurement work in these states has such a large impact on the national supply.",
          },
          {
            type: "callout",
            style: "info",
            heading: "Did you know?",
            text: "India's milk production is led by diverse states with strong dairy ecosystems — dairy supports rural livelihoods and strengthens the agri-economy in every one of them, not just the top few.",
          },
        ],
        quiz: {
          passScore: 70,
          questions: [
            {
              type: "mcq",
              q: "Which state leads India in milk production, according to BAHS 2025?",
              options: ["Rajasthan", "Gujarat", "Uttar Pradesh", "Punjab"],
              answer: 2,
              explanation: "Uttar Pradesh leads with 39 '000 MT.",
            },
            {
              type: "truefalse",
              q: "The top 5 states contribute over 65% of India's total milk production.",
              answer: true,
              explanation: "Yes — the top 5 states together contribute over 65% of the total.",
            },
            {
              type: "mcq",
              q: "Which state produces more milk: Bihar or Haryana?",
              options: ["Bihar", "Haryana", "They are equal", "Not enough data"],
              answer: 0,
              explanation: "Bihar produces 14 '000 MT vs Haryana's 13 '000 MT.",
            },
            {
              type: "mcq",
              q: "Which of these states has the LOWEST milk production in the data shown?",
              options: ["West Bengal", "Telangana", "Jharkhand / Jammu & Kashmir", "Tamil Nadu"],
              answer: 2,
              explanation:
                "Jharkhand and Jammu & Kashmir are tied at the bottom with 3 '000 MT each.",
            },
          ],
        },
      },
      // ------------------------------------------------------------------
      {
        id: "m1-l4",
        title: "India's Journey — From Deficit to Surplus",
        estMinutes: 10,
        blocks: [
          {
            type: "text",
            heading: "From Milk Deficit Nation to Milk Surplus Nation",
            html: "It wasn't always this way. Just a few decades ago, India imported milk to meet demand. A series of bold decisions and cooperative movements transformed the country into the world's largest milk producer. Explore the timeline below.",
          },
          {
            type: "timeline",
            heading: "India's Dairy Development Timeline",
            items: [
              { year: "1946", text: "Formation of Amul." },
              {
                year: "1965",
                text: "Establishment of NDDB under the leadership of Dr. V. Kurien.",
              },
              { year: "1970–80", text: "Operation Flood Phase I." },
              { year: "1974", text: "Formation of Mother Dairy in Delhi." },
              { year: "1981–85", text: "Operation Flood Phase II." },
              { year: "1985–96", text: "Operation Flood Phase III." },
              {
                year: "1991",
                text: "Liberalization and introduction of Private & Multi-Nationals in the dairy sector.",
              },
              { year: "1998", text: "India became the world's largest milk producer nation." },
              {
                year: "1999",
                text: "Recommendation of Dr. Alagh for setting up of Producer Companies under the Companies Act.",
              },
              {
                year: "2002–03",
                text: "Amendment in the Companies Act and inclusion of Producer Company in it.",
              },
              { year: "2009", text: "Incorporation of NDDB Dairy Services." },
              { year: "2011–19", text: "National Dairy Plan (NDP-1)." },
              { year: "2014", text: "National Programme for Dairy Development (NPDD)." },
              { year: "2021", text: "Restructuring of NPDD." },
            ],
            result: "India: Milk Surplus Nation",
          },
          {
            type: "example",
            heading: "Worked Example",
            text: "Operation Flood ran in three phases across 26 years (1970 to 1996). It linked rural milk producers to urban demand centres through cooperatives — the same model your MPP (Milk Producer Providers) work builds on today.",
          },
          {
            type: "callout",
            style: "tip",
            heading: "Connect it to your work",
            text: "Every farmer you enrol and every MPP you help form is part of the same cooperative movement that began with Amul in 1946 and scaled up through Operation Flood. You are continuing a decades-long journey.",
          },
        ],
        quiz: {
          passScore: 70,
          questions: [
            {
              type: "mcq",
              q: "In which year was Amul formed?",
              options: ["1946", "1965", "1974", "1998"],
              answer: 0,
              explanation: "Amul was formed in 1946.",
            },
            {
              type: "mcq",
              q: "Who led the establishment of NDDB in 1965?",
              options: ["Dr. Y.K. Alagh", "Dr. V. Kurien", "M.K. Gandhi", "Dr. B.R. Ambedkar"],
              answer: 1,
              explanation: "NDDB was established in 1965 under the leadership of Dr. V. Kurien.",
            },
            {
              type: "mcq",
              q: "In which year did India become the world's largest milk producer nation?",
              options: ["1991", "1998", "2009", "2014"],
              answer: 1,
              explanation: "India achieved this milestone in 1998.",
            },
            {
              type: "truefalse",
              q: "Operation Flood was completed in a single phase.",
              answer: false,
              explanation: "Operation Flood ran across three phases: 1970–80, 1981–85, and 1985–96.",
            },
            {
              type: "mcq",
              q: "What major event happened in 2014 in India's dairy development journey?",
              options: [
                "Formation of Amul",
                "Liberalization of the dairy sector",
                "National Programme for Dairy Development (NPDD) launched",
                "Formation of Mother Dairy",
              ],
              answer: 2,
              explanation: "The National Programme for Dairy Development (NPDD) was launched in 2014.",
            },
          ],
        },
      },
      // ------------------------------------------------------------------
      {
        id: "m1-l5",
        title: "NDDB — Driving India's Dairy Cooperative Movement",
        estMinutes: 7,
        blocks: [
          {
            type: "text",
            heading: "National Dairy Development Board (NDDB)",
            html: "The National Dairy Development Board (NDDB) was established in 1965 under the leadership of Dr. Verghese Kurien — often called the <b>'Father of the White Revolution'</b> and the <b>'Milkman of India'</b>. Headquartered in Anand, Gujarat, NDDB was created to replicate the success of cooperative dairying seen in Amul across the entire country.",
          },
          {
            type: "stat-grid",
            items: [
              {
                label: "The White Revolution",
                text: "NDDB spearheaded Operation Flood, the world's largest dairy development programme, turning India from milk-deficient to the world's top producer.",
              },
              {
                label: "Cooperative Model",
                text: "NDDB promotes the three-tier cooperative structure: Village Society → District Union → State Federation.",
              },
              {
                label: "Farmer-Centric",
                text: "The model ensures farmers get a fair, transparent price for their milk and a share in the cooperative's profits.",
              },
            ],
          },
          {
            type: "callout",
            style: "info",
            heading: "Did you know?",
            text: "The cooperative structure NDDB champions is the same one behind the MPPs (Milk Producer Providers) and village societies you'll learn to form and support in later modules.",
          },
          {
            type: "text",
            heading: "Module Summary",
            html: "You've now covered: the global and national milk production landscape, the remarkable journey that made India the world's largest milk producer, and the role of NDDB in leading that transformation. Take the final assessment below to complete this module.",
          },
        ],
        quiz: {
          passScore: 70,
          isFinal: true,
          questions: [
            {
              type: "mcq",
              q: "In which city is NDDB headquartered?",
              options: ["New Delhi", "Anand, Gujarat", "Mumbai", "Ahmedabad"],
              answer: 1,
              explanation: "NDDB is headquartered in Anand, Gujarat.",
            },
            {
              type: "mcq",
              q: "Dr. Verghese Kurien is often referred to as:",
              options: [
                "The Father of the Green Revolution",
                "The Milkman of India",
                "The founder of NABARD",
                "The first Prime Minister of India",
              ],
              answer: 1,
              explanation: "Dr. Kurien is known as the 'Father of the White Revolution' and 'Milkman of India'.",
            },
            {
              type: "mcq",
              q: "What is the correct order of India's cooperative dairy structure, from village level up?",
              options: [
                "State Federation → District Union → Village Society",
                "Village Society → District Union → State Federation",
                "District Union → Village Society → State Federation",
                "Village Society → State Federation → District Union",
              ],
              answer: 1,
              explanation:
                "The three-tier structure flows Village Society → District Union → State Federation.",
            },
            {
              type: "mcq",
              q: "Which country is the world's largest milk producer?",
              options: ["USA", "India", "China", "Pakistan"],
              answer: 1,
              explanation: "India is the world's largest milk producer at 241 MMT.",
            },
            {
              type: "mcq",
              q: "Roughly what share of India's milk production comes from its top 5 states?",
              options: ["Under 20%", "About 40%", "Over 65%", "100%"],
              answer: 2,
              explanation: "The top 5 states contribute over 65% of national production.",
            },
            {
              type: "truefalse",
              q: "Operation Flood was named after Dr. Kurien's hometown.",
              answer: false,
              explanation:
                "Operation Flood refers to 'flooding' India with milk through a nationwide cooperative dairy programme — not a place name.",
            },
          ],
        },
      },
    ],
  },
  // Placeholder modules — content coming soon, shown locked on the dashboard
  { id: "m2", number: 2, title: "Rationale of MPO", available: false },
  { id: "m3", number: 3, title: "Core Design Principle", available: false },
  { id: "m4", number: 4, title: "Interaction with Farmers (One to One)", available: false },
  { id: "m5", number: 5, title: "Designing a Need-Based Communication Content", available: false },
  { id: "m6", number: 6, title: "Interaction with Sahayak (One to One)", available: false },
  { id: "m7", number: 7, title: "Village Level Meeting for Small Groups", available: false },
  { id: "m8", number: 8, title: "Formation of MPP & Milk Routes", available: false },
  { id: "m9", number: 9, title: "Member Enrolment and Data Collection", available: false },
  { id: "m10", number: 10, title: "Milk Rates, Its Parameters and Methodologies", available: false },
  { id: "m11", number: 11, title: "CDA — Its Constituents and Calculation", available: false },
  { id: "m12", number: 12, title: "Cost Associated with Milk Handling", available: false },
];

export function getModule(moduleId) {
  return MODULES.find((m) => m.id === moduleId);
}

export function getLesson(moduleId, lessonId) {
  const mod = getModule(moduleId);
  if (!mod || !mod.lessons) return null;
  return mod.lessons.find((l) => l.id === lessonId);
}

export function getLessonIndex(moduleId, lessonId) {
  const mod = getModule(moduleId);
  if (!mod || !mod.lessons) return -1;
  return mod.lessons.findIndex((l) => l.id === lessonId);
}
