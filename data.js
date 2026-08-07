// ============================================================================
// Shreeja LMS — Content data
// Written for learners with no formal education and no prior dairy
// knowledge (about a Class 7 reading level). Every lesson is broken into
// small TOPICS. Each topic is taught, then checked with a couple of quick
// questions. If a learner gets something wrong, they are sent back to that
// exact topic to learn it again before moving on — never a whole lesson.
// ============================================================================

export const MODULES = [
  {
    id: "m1",
    number: 1,
    title: "Introduction to Dairy",
    subtitle:
      "Learn step by step — no experience needed. Every topic is taught first, then checked with a few simple questions.",
    icon: "milk",
    available: true,
    lessons: [
      // ==================================================================
      // LESSON 1
      // ==================================================================
      {
        id: "m1-l1",
        title: "What is Dairy, and Why Does It Matter?",
        estMinutes: 6,
        hook: [
          {
            type: "hero",
            heading: "What is Dairy?",
            text: "Let's start from zero — no experience needed. By the end of this lesson, you'll know why milk matters to families like yours.",
          },
        ],
        topics: [
          {
            id: "t-milk-body",
            title: "Milk and Your Body",
            teach: [
              {
                type: "text",
                heading: "What Does 'Dairy' Mean?",
                html: "<b>Dairy</b> means anything made from milk — milk, curd (dahi), buttermilk (chaas), butter, ghee, paneer and cheese. A <b>dairy farmer</b> is a person who keeps cows or buffaloes and collects their milk to sell.",
              },
              {
                type: "text",
                heading: "Why Do We Drink Milk?",
                html: "Milk is not just a drink — it is food. It has things our body needs every single day to grow and stay strong.",
              },
              {
                type: "stat-grid",
                items: [
                  {
                    label: "Protein — for strong muscles",
                    text: "Milk has protein. Protein helps build and repair muscles — like bricks build a house.",
                  },
                  {
                    label: "Calcium — for strong bones",
                    text: "Milk has calcium. Calcium makes bones and teeth strong — very important for growing children.",
                  },
                  {
                    label: "Vitamins — for energy",
                    text: "Milk has Vitamin A and Vitamin B12. These help our eyes, our skin, and give us energy for the day's work.",
                  },
                ],
              },
              {
                type: "glossary",
                term: "Nutrition",
                meaning:
                  "The good things in food that help our body grow, stay healthy, and have energy.",
              },
              {
                type: "example",
                heading: "Think About It",
                text: "A glass of milk in the morning gives a child protein and calcium for the whole day. That is why many schools and anganwadis give milk to children.",
              },
            ],
            check: [
              {
                type: "mcq",
                q: "Which part of milk helps make our bones strong?",
                options: ["Water", "Calcium", "Its colour", "Its smell"],
                answer: 1,
                explain: "Calcium in milk builds strong bones and teeth.",
              },
              {
                type: "truefalse",
                q: "Milk only tastes good — it does not really help the body.",
                answer: false,
                explain:
                  "Milk is real food. It gives protein, calcium and vitamins that the body needs every day.",
              },
            ],
          },
          {
            id: "t-dairy-livelihood",
            title: "Dairy as a Livelihood",
            teach: [
              {
                type: "text",
                heading: "More Than Just Food",
                html: "For millions of families in India, milk is not only food — it is also their main way of earning money. Keeping even 1, 2 or 4 milk animals and selling milk every day can support a whole family.",
              },
              {
                type: "stat-grid",
                items: [
                  {
                    label: "8 crore farmers",
                    text: "More than 8 crore (80 million) families across India earn a living from dairy.",
                  },
                  {
                    label: "Dairy earns the most",
                    text: "Milk is India's single largest farm product — worth more than wheat, rice or sugarcane.",
                  },
                  {
                    label: "7 out of 10 workers are women",
                    text: "About 70% of the people who do daily dairy work — feeding, milking, cleaning — are women.",
                  },
                ],
              },
              {
                type: "callout",
                style: "info",
                heading: "Did you know?",
                text: "Dairy work happens every single day, twice a day — morning and evening. That is why it gives families a steady income, not income that comes only once or twice a year like some crops.",
              },
            ],
            check: [
              {
                type: "mcq",
                q: "About how many families in India earn a living from dairy?",
                options: ["8 lakh", "80 lakh", "8 crore", "8 thousand"],
                answer: 2,
                explain:
                  "More than 8 crore (80 million) families across India depend on dairy for their livelihood.",
              },
              {
                type: "mcq",
                q: "Roughly what share of dairy farm workers are women?",
                options: ["1 in 10", "3 in 10", "5 in 10", "7 in 10"],
                answer: 3,
                explain: "About 70% (7 out of 10) of dairy farm workers are women.",
              },
            ],
          },
        ],
        finalQuiz: {
          passScore: 70,
          questions: [
            {
              topicId: "t-milk-body",
              type: "mcq",
              q: "Which of these is found in milk and helps build strong muscles?",
              options: ["Protein", "Sugar", "Salt", "Oil"],
              answer: 0,
              explain: "Protein in milk helps build and repair muscles.",
            },
            {
              topicId: "t-dairy-livelihood",
              type: "truefalse",
              q: "Dairy farming gives income only once a year, like some crops.",
              answer: false,
              explain: "Dairy gives income every day, twice a day, because animals are milked daily.",
            },
          ],
        },
      },
      // ==================================================================
      // LESSON 2
      // ==================================================================
      {
        id: "m1-l2",
        title: "The World's Biggest Milk Bowl",
        estMinutes: 7,
        hook: [
          {
            type: "hero",
            heading: "The World's Biggest Milk Bowl",
            text: "Which countries make the most milk? Let's find out — and see where India stands.",
          },
        ],
        topics: [
          {
            id: "t-world-chart",
            title: "Which Countries Make the Most Milk?",
            teach: [
              {
                type: "text",
                heading: "Milk Around the World",
                html: "Milk is made in almost every country. But a few countries make much more than others. Let's look at the top 10.",
              },
              {
                type: "poll",
                heading: "Guess Before You Look",
                questions: [
                  {
                    q: "Which country do YOU think makes the most milk in the world?",
                    options: ["USA", "China", "India", "Pakistan"],
                    answer: 2,
                    reveal: "Let's check the real numbers below and see if you guessed right!",
                  },
                ],
              },
              {
                type: "glossary",
                term: "Million Tonnes",
                meaning:
                  "A HUGE amount. 1 tonne = 1,000 kg. 1 million tonnes = 1,000,000 tonnes. If you filled milk tankers that each carry 10 tonnes, 1 million tonnes would need 1,00,000 tankers, one after another.",
              },
              {
                type: "barchart",
                heading: "Top 10 Milk-Making Countries (Million Tonnes per year)",
                source: "Source: FAOSTAT 2025",
                unit: "million tonnes",
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
                heading: "Let's Compare",
                text: "India makes 241 million tonnes of milk a year. The USA, in 2nd place, makes 102 million tonnes. That means India makes more than DOUBLE what the USA makes.",
              },
            ],
            check: [
              {
                type: "mcq",
                q: "Which country makes the most milk in the world?",
                options: ["USA", "China", "India", "Pakistan"],
                answer: 2,
                explain: "India is the world's largest milk producer.",
              },
              {
                type: "mcq",
                q: "Which country is in 2nd place for milk production?",
                options: ["Pakistan", "China", "USA", "Germany"],
                answer: 2,
                explain: "The USA is 2nd, making 102 million tonnes a year.",
              },
            ],
          },
          {
            id: "t-world-why",
            title: "Why is India Number One?",
            teach: [
              {
                type: "text",
                heading: "How Did This Happen?",
                html: "India did not become the world's top milk maker with a few giant farms. It happened because MILLIONS of small farmers — people like you, and the farmers you work with — each keep a few animals and sell milk every day.",
              },
              {
                type: "callout",
                style: "tip",
                heading: "Small Farmers, Big Result",
                text: "Most milk in India comes from farmers who own just 1 to 4 animals — not big companies. Every small farmer's milk adds up to the world's largest supply.",
              },
              {
                type: "stat-grid",
                items: [
                  {
                    label: "Nutrition for millions",
                    text: "This much milk helps feed families and children across India and the world.",
                  },
                  {
                    label: "Income for villages",
                    text: "Every litre sold puts money directly into a village family's hands.",
                  },
                ],
              },
            ],
            check: [
              {
                type: "truefalse",
                q: "India became the top milk producer mainly because of a few very large dairy companies.",
                answer: false,
                explain: "It happened because of millions of small farmers, each keeping a few animals.",
              },
              {
                type: "mcq",
                q: "What is the main reason India makes so much milk?",
                options: [
                  "A few huge factories",
                  "Millions of small farmers together",
                  "Milk imported from other countries",
                  "Only cows, no buffaloes",
                ],
                answer: 1,
                explain: "Millions of small farmers, each with a few animals, together produce the most milk in the world.",
              },
            ],
          },
        ],
        finalQuiz: {
          passScore: 70,
          questions: [
            {
              topicId: "t-world-chart",
              type: "mcq",
              q: "About how many times more milk does India make compared to the USA?",
              options: ["Same amount", "Half as much", "About 2 times more", "10 times more"],
              answer: 2,
              explain: "India (241) makes a little more than double the USA's (102) milk.",
            },
            {
              topicId: "t-world-why",
              type: "mcq",
              q: "India is the world's top milk maker mainly because of:",
              options: [
                "A few big companies",
                "Millions of small farmers",
                "Milk imported from abroad",
                "Only cows, no buffaloes",
              ],
              answer: 1,
              explain: "Millions of small farmers together make India number one.",
            },
          ],
        },
      },
      // ==================================================================
      // LESSON 3
      // ==================================================================
      {
        id: "m1-l3",
        title: "India's Milk Map",
        estMinutes: 7,
        hook: [
          {
            type: "hero",
            heading: "India's Milk Map",
            text: "Now let's zoom into India. Which states make the most milk?",
          },
        ],
        topics: [
          {
            id: "t-state-chart",
            title: "Top Milk-Making States",
            teach: [
              {
                type: "text",
                heading: "Every State Contributes",
                html: "Milk is made in every state of India. But some states make much more than others.",
              },
              {
                type: "poll",
                heading: "Guess Before You Look",
                questions: [
                  {
                    q: "Which state do YOU think makes the most milk in India?",
                    options: ["Punjab", "Uttar Pradesh", "Kerala", "Bihar"],
                    answer: 1,
                    reveal: "Let's check the chart below and see if you guessed right!",
                  },
                ],
              },
              {
                type: "barchart",
                heading: "Milk Production by State",
                source: "Source: BAHS 2025",
                unit: "'000 tonnes",
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
                type: "example",
                heading: "Let's Compare",
                text: "Uttar Pradesh makes the most milk. That is more than 10 times what Jharkhand or Jammu & Kashmir make.",
              },
            ],
            check: [
              {
                type: "mcq",
                q: "Which state makes the most milk in India?",
                options: ["Punjab", "Uttar Pradesh", "Gujarat", "Bihar"],
                answer: 1,
                explain: "Uttar Pradesh leads all Indian states in milk production.",
              },
              {
                type: "truefalse",
                q: "All Indian states make about the same amount of milk.",
                answer: false,
                explain: "Some states, like Uttar Pradesh and Rajasthan, make much more milk than others.",
              },
            ],
          },
          {
            id: "t-state-meaning",
            title: "What This Means for You",
            teach: [
              {
                type: "text",
                heading: "The Top 5 States",
                html: "Uttar Pradesh, Rajasthan, Madhya Pradesh, Gujarat and Maharashtra are the top 5 milk-making states. Together, just these 5 states make more than 65 out of every 100 litres of milk in India.",
              },
              {
                type: "callout",
                style: "info",
                heading: "Did you know?",
                text: "Even in states that make less milk overall, dairy is still a vital income source for the families there. Every village's contribution matters.",
              },
            ],
            check: [
              {
                type: "mcq",
                q: "Roughly what share of India's milk comes from the top 5 states?",
                options: ["Under 20%", "About 40%", "Over 65%", "100%"],
                answer: 2,
                explain: "The top 5 states together contribute over 65% of India's total milk.",
              },
              {
                type: "mcq",
                q: "Which of these is one of the top 5 milk-making states?",
                options: ["Kerala", "Gujarat", "Goa", "Assam"],
                answer: 1,
                explain: "Gujarat is one of the top 5 states, along with UP, Rajasthan, MP and Maharashtra.",
              },
            ],
          },
        ],
        finalQuiz: {
          passScore: 70,
          questions: [
            {
              topicId: "t-state-chart",
              type: "mcq",
              q: "Which state produces more milk — Bihar or Haryana?",
              options: ["Bihar", "Haryana", "Exactly equal", "Cannot say"],
              answer: 0,
              explain: "Bihar (14 units) produces slightly more than Haryana (13 units).",
            },
            {
              topicId: "t-state-meaning",
              type: "truefalse",
              q: "The top 5 states alone make more than half of all of India's milk.",
              answer: true,
              explain: "Yes — the top 5 states make over 65% of India's total milk.",
            },
          ],
        },
      },
      // ==================================================================
      // LESSON 4
      // ==================================================================
      {
        id: "m1-l4",
        title: "The White Revolution — India's Dairy Story",
        estMinutes: 9,
        hook: [
          {
            type: "hero",
            heading: "The White Revolution",
            text: "How did India go from not having enough milk to being the world's biggest milk maker? It's a story about ordinary farmers.",
          },
        ],
        topics: [
          {
            id: "t-problem",
            title: "The Problem: Farmers Were Cheated",
            teach: [
              {
                type: "text",
                heading: "Before 1946",
                html: "Long ago, in Kaira district in Gujarat, farmers sold their milk to a private trader. The trader paid very little and decided the price all by himself. Farmers had no other place to sell milk, so they had no choice but to accept it.",
              },
              {
                type: "callout",
                style: "warning",
                heading: "The Unfair Deal",
                text: "The trader made a big profit, but the farmers who did all the hard work stayed poor. This is called exploitation — when someone with power takes unfair advantage of people who have no other choice.",
              },
              {
                type: "poll",
                heading: "What Do You Think?",
                questions: [
                  {
                    q: "If only one trader buys your milk and he alone sets the price, is that fair to farmers?",
                    options: ["Yes, that's fair", "No, that's not fair"],
                    answer: 1,
                    reveal: "Right — when farmers have no other buyer to go to, the trader can pay whatever he wants. That's not a fair deal.",
                  },
                ],
              },
            ],
            check: [
              {
                type: "mcq",
                q: "Before 1946, why did farmers in Kaira accept a low price for their milk?",
                options: [
                  "The trader paid a fair price",
                  "They had no other place to sell milk",
                  "They didn't need money",
                  "Milk was not valuable then",
                ],
                answer: 1,
                explain: "With only one trader to sell to, farmers had no choice but to accept the low price he offered.",
              },
              {
                type: "truefalse",
                q: "Before 1946, farmers in Kaira were getting a fair price for their milk.",
                answer: false,
                explain: "A single private trader controlled the price and paid farmers very little.",
              },
            ],
          },
          {
            id: "t-amul",
            title: "1946: Farmers Build Their Own Dairy",
            teach: [
              {
                type: "text",
                heading: "A New Idea: Owning It Together",
                html: "In 1946, the farmers of Kaira stopped selling to the unfair trader. With support from leaders like Sardar Patel, they formed their own dairy — owned by the farmers themselves. This dairy became AMUL.",
              },
              {
                type: "glossary",
                term: "Cooperative",
                meaning:
                  "A business owned and run TOGETHER by the people who use it — here, by the farmers themselves. No single trader controls the price.",
              },
              {
                type: "text",
                heading: "How It Was Different",
                html: "In a cooperative, there is no middleman taking a big cut. Farmers bring their milk, it gets tested and sold, and the profit goes back to the farmers who own it. Today, Amul is owned by 3.6 million farmer families.",
              },
              {
                type: "example",
                heading: "Think About It",
                text: "Imagine 100 farmers each owning a small part of one big dairy business, instead of 100 farmers each depending on one trader's mood. That is the power of a cooperative.",
              },
            ],
            check: [
              {
                type: "mcq",
                q: "What is a 'cooperative'?",
                options: [
                  "A business owned by one rich trader",
                  "A business owned together by the farmers who use it",
                  "A government office",
                  "A bank loan",
                ],
                answer: 1,
                explain: "A cooperative is owned and run together by its members — the farmers themselves.",
              },
              {
                type: "mcq",
                q: "In which year was Amul formed?",
                options: ["1946", "1965", "1991", "1998"],
                answer: 0,
                explain: "Amul was formed in 1946 by the farmers of Kaira district.",
              },
            ],
          },
          {
            id: "t-operation-flood",
            title: "Spreading the Idea Across India",
            teach: [
              {
                type: "text",
                heading: "One Success Becomes a Movement",
                html: "Amul worked so well that the government wanted every state to have the same kind of farmer-owned dairy. In 1965, NDDB (National Dairy Development Board) was formed to make this happen, led by Dr. Verghese Kurien.",
              },
              {
                type: "timeline",
                heading: "India's Dairy Journey",
                items: [
                  { year: "1946", text: "Formation of Amul." },
                  { year: "1965", text: "Establishment of NDDB, led by Dr. V. Kurien." },
                  { year: "1970–80", text: "Operation Flood Phase I begins." },
                  { year: "1974", text: "Formation of Mother Dairy in Delhi." },
                  { year: "1981–85", text: "Operation Flood Phase II." },
                  { year: "1985–96", text: "Operation Flood Phase III." },
                  { year: "1991", text: "Private and multi-national dairy companies allowed to enter India." },
                  { year: "1998", text: "India becomes the world's largest milk producer." },
                  { year: "1999", text: "Dr. Alagh recommends setting up Producer Companies." },
                  { year: "2002–03", text: "Companies Act amended to include Producer Companies." },
                  { year: "2009", text: "NDDB Dairy Services is formed." },
                  { year: "2011–19", text: "National Dairy Plan (NDP-1)." },
                  { year: "2014", text: "National Programme for Dairy Development (NPDD)." },
                  { year: "2021", text: "NPDD is restructured." },
                ],
                result: "India: Milk Surplus Nation",
              },
              {
                type: "callout",
                style: "tip",
                heading: "From Deficit to Surplus",
                text: "Deficit means not having enough — India used to import milk powder from other countries. Surplus means having more than enough. By 1998, India made more milk than any other country in the world.",
              },
            ],
            check: [
              {
                type: "mcq",
                q: "What does NDDB stand for?",
                options: [
                  "National Dairy Development Board",
                  "New Delhi Dairy Board",
                  "National Development Bank",
                  "North Dairy District Board",
                ],
                answer: 0,
                explain: "NDDB = National Dairy Development Board, formed in 1965.",
              },
              {
                type: "mcq",
                q: "In which year did India become the world's largest milk producer?",
                options: ["1965", "1985", "1998", "2014"],
                answer: 2,
                explain: "India reached the top spot in 1998.",
              },
            ],
          },
        ],
        finalQuiz: {
          passScore: 70,
          questions: [
            {
              topicId: "t-problem",
              type: "truefalse",
              q: "Before Amul, one private trader alone decided the price farmers got for milk.",
              answer: true,
              explain: "Yes — a single trader controlled the price, which was unfair to farmers.",
            },
            {
              topicId: "t-amul",
              type: "mcq",
              q: "The biggest benefit of a cooperative like Amul is that:",
              options: [
                "A trader still controls the price",
                "Farmers own the business and share the profit",
                "Only the government profits",
                "Milk becomes free",
              ],
              answer: 1,
              explain: "In a cooperative, the farmers themselves are the owners and share the profit.",
            },
            {
              topicId: "t-operation-flood",
              type: "mcq",
              q: "Who led NDDB and is known as the 'Father of the White Revolution'?",
              options: ["Sardar Patel", "Dr. Verghese Kurien", "Dr. Y.K. Alagh", "Mahatma Gandhi"],
              answer: 1,
              explain: "Dr. Verghese Kurien led NDDB and is called the Father of the White Revolution.",
            },
          ],
        },
      },
      // ==================================================================
      // LESSON 5
      // ==================================================================
      {
        id: "m1-l5",
        title: "NDDB and How a Cooperative Works",
        estMinutes: 7,
        hook: [
          {
            type: "hero",
            heading: "How the Cooperative Family Works",
            text: "You've heard about NDDB and Amul. Now let's see exactly how a cooperative is organised, from your village up to the whole state.",
          },
        ],
        topics: [
          {
            id: "t-nddb",
            title: "What is NDDB?",
            teach: [
              {
                type: "text",
                heading: "NDDB — The Organisation Behind the Movement",
                html: "NDDB (National Dairy Development Board) was started in 1965 to help farmers all over India build cooperatives like Amul. It is based in Anand, Gujarat — the same town where Amul began.",
              },
              {
                type: "text",
                heading: "Dr. Verghese Kurien",
                html: "Dr. Kurien led NDDB for many years. People call him the <b>'Milkman of India'</b> because of everything he did to help farmers earn a fair, steady income from milk.",
              },
            ],
            check: [
              {
                type: "mcq",
                q: "Where is NDDB based?",
                options: ["New Delhi", "Mumbai", "Anand, Gujarat", "Chennai"],
                answer: 2,
                explain: "NDDB is headquartered in Anand, Gujarat.",
              },
              {
                type: "mcq",
                q: "Dr. Verghese Kurien is known as:",
                options: ["The Milkman of India", "The first Prime Minister", "A private milk trader", "A bank manager"],
                answer: 0,
                explain: "Dr. Kurien is known as the 'Milkman of India'.",
              },
            ],
          },
          {
            id: "t-structure",
            title: "The Three Steps of a Cooperative",
            teach: [
              {
                type: "text",
                heading: "From Your Village to the Whole State",
                html: "A dairy cooperative works in 3 simple steps — like 3 floors of a building.",
              },
              {
                type: "stat-grid",
                items: [
                  {
                    label: "1. Village Society",
                    text: "Farmers in one village bring their milk here every day. The ground floor — closest to the farmer.",
                  },
                  {
                    label: "2. District Union",
                    text: "Many Village Societies in a district join together here. Milk from many villages is collected and processed.",
                  },
                  {
                    label: "3. State Federation",
                    text: "All the District Unions in a state join together here, and sell milk and milk products (like Amul does) to customers everywhere.",
                  },
                ],
              },
              {
                type: "callout",
                style: "info",
                heading: "Why This Matters to You",
                text: "This is the same three-step model behind the MPPs (Milk Pooling Points) you will help form and run in later training. You are joining a system that has worked for over 75 years.",
              },
            ],
            check: [
              {
                type: "mcq",
                q: "What is the first, ground-floor step of a dairy cooperative?",
                options: ["State Federation", "District Union", "Village Society", "NDDB"],
                answer: 2,
                explain: "The Village Society is the first step, closest to the farmer.",
              },
              {
                type: "mcq",
                q: "Put these in the correct order, smallest to largest:",
                options: [
                  "State Federation → District Union → Village Society",
                  "Village Society → District Union → State Federation",
                  "District Union → Village Society → State Federation",
                  "They are all the same size",
                ],
                answer: 1,
                explain: "The order is Village Society → District Union → State Federation.",
              },
            ],
          },
        ],
        finalQuiz: {
          passScore: 70,
          questions: [
            {
              topicId: "t-nddb",
              type: "mcq",
              q: "NDDB was formed in which year?",
              options: ["1946", "1965", "1991", "2009"],
              answer: 1,
              explain: "NDDB was formed in 1965.",
            },
            {
              topicId: "t-structure",
              type: "mcq",
              q: "Which comes right after the Village Society in the cooperative structure?",
              options: ["State Federation", "District Union", "NDDB office", "Nothing, it ends there"],
              answer: 1,
              explain: "District Union comes next, joining many village societies.",
            },
          ],
        },
      },
      // ==================================================================
      // LESSON 6 — CASE STUDY (module capstone)
      // ==================================================================
      {
        id: "m1-l6",
        title: "Real Story: Ramesh and Sita's Dairy Journey",
        estMinutes: 12,
        hook: [
          {
            type: "hero",
            heading: "Real Story: Ramesh & Sita",
            text: "Everything you've learned so far comes to life in this real story of one family. Let's follow their journey step by step.",
          },
        ],
        topics: [
          {
            id: "t-city-struggle",
            title: "Life in the City",
            teach: [
              {
                type: "text",
                heading: "Meet Ramesh and Sita",
                html: "Ramesh and Sita lived in a small village called Rampur in Uttar Pradesh. About five years ago, they moved to a big city looking for better work. Ramesh worked as a daily-wage labourer on construction sites. Sita worked cleaning houses. They lived in one small rented room with their 2-year-old son, Chintu.",
              },
              {
                type: "poll",
                heading: "What Do You Think?",
                questions: [
                  {
                    q: "Do you think Ramesh and Sita found it easy to save money in the city?",
                    options: ["Yes, easily", "No, it was hard"],
                    answer: 1,
                    reveal: "Let's find out exactly why, in the numbers below.",
                  },
                ],
              },
              {
                type: "stat-grid",
                items: [
                  {
                    label: "Their income",
                    text: "Together they earned about ₹18,000 to ₹22,000 a month — but only on days they found work.",
                  },
                  {
                    label: "Their expenses",
                    text: "Most of that money went to room rent, electricity, travel and doctor visits — leaving almost nothing to save.",
                  },
                  {
                    label: "Their struggle",
                    text: "Little Chintu often fell sick because of the crowded, polluted place they lived in.",
                  },
                ],
              },
              {
                type: "callout",
                style: "warning",
                heading: "A Hard Truth",
                text: "Even though Ramesh and Sita worked hard every single day, they could not save money or improve their life. This is a common story for many families who leave their villages for city work.",
              },
            ],
            check: [
              {
                type: "mcq",
                q: "Why couldn't Ramesh and Sita save money in the city?",
                options: [
                  "They didn't want to save",
                  "Most of their income went to rent, bills and daily costs",
                  "They earned too much money",
                  "They didn't work hard",
                ],
                answer: 1,
                explain: "Rent, bills, travel and healthcare costs used up almost all of their income, leaving little to save.",
              },
              {
                type: "truefalse",
                q: "Ramesh and Sita were financially comfortable and stress-free in the city.",
                answer: false,
                explain: "They were always under money stress, and their son was often sick.",
              },
            ],
          },
          {
            id: "t-coming-home",
            title: "A New Chance Back Home",
            teach: [
              {
                type: "text",
                heading: "A Visit That Changed Everything",
                html: "In 2026, Ramesh and Sita went back to Rampur for a family wedding. They noticed something new — their village now had a Milk Pooling Point (MPP), run by a Milk Producer Organisation (MPO).",
              },
              {
                type: "glossary",
                term: "MPP (Milk Pooling Point)",
                meaning:
                  "A place in the village where farmers bring their milk every day. It is checked for quality and farmers get paid a fair price, on time.",
              },
              {
                type: "text",
                heading: "What the MPP Offered",
                html: "The MPP collected milk twice a day. It tested milk quality fairly, in front of the farmer. And most importantly — it paid farmers on time, every time. Several farmers told Ramesh that dairy had become their most reliable source of income.",
              },
              {
                type: "text",
                heading: "Getting Expert Advice",
                html: "Ramesh and Sita owned 1.5 acres of land. Before jumping in, they visited the local Krishi Vigyan Kendra (KVK) — a government farm-advice centre — and met dairy expert Dr. Anil Sharma.",
              },
              {
                type: "glossary",
                term: "KVK (Krishi Vigyan Kendra)",
                meaning: "A government centre in most districts where farmers can get free expert advice on farming and animal care.",
              },
              {
                type: "stat-grid",
                items: [
                  {
                    label: "Treat it as a business",
                    text: "Dr. Sharma's first advice: don't treat dairy as just a household chore — treat it like a real business, with planning.",
                  },
                  {
                    label: "Choose the right animal",
                    text: "He suggested local breeds like Gir or Sahiwal cows — they handle local weather well and resist disease better.",
                  },
                  {
                    label: "Balanced feed = more milk",
                    text: "He explained that giving animals a mix of feed, green fodder, dry fodder, minerals and calcium every day is the single biggest key to good milk production.",
                  },
                ],
              },
            ],
            check: [
              {
                type: "mcq",
                q: "What is an MPP?",
                options: [
                  "A bank",
                  "A place in the village where farmers sell milk daily at a fair price",
                  "A type of cow",
                  "A government tax",
                ],
                answer: 1,
                explain: "An MPP (Milk Pooling Point) is where farmers bring milk daily and get paid fairly and on time.",
              },
              {
                type: "mcq",
                q: "According to Dr. Sharma, what is the biggest key to more milk production?",
                options: ["Buying the most expensive cow", "Balanced, regular feed", "Never visiting the vet", "Keeping animals hungry"],
                answer: 1,
                explain: "A balanced diet — feed, fodder, minerals and calcium — is the biggest key to good milk production.",
              },
            ],
          },
          {
            id: "t-money-story",
            title: "The Money Story — Year 1",
            teach: [
              {
                type: "text",
                heading: "Starting the Business",
                html: "Ramesh and Sita had saved ₹1,50,000 from their years of city work. They decided to use it to start their dairy business.",
              },
              {
                type: "ledger",
                heading: "What It Cost to Start (Capital Expenditure)",
                rows: [
                  { label: "One milking cow", amount: "₹60,000" },
                  { label: "Shed for the animal", amount: "₹40,000" },
                  { label: "Buckets, cans & equipment", amount: "₹20,000" },
                  { label: "Starting working capital", amount: "₹20,000" },
                ],
                total: { label: "Total needed", amount: "₹1,40,000" },
              },
              {
                type: "callout",
                style: "tip",
                heading: "The Plan",
                text: "They had ₹1,50,000 saved and needed ₹1,40,000 — leaving ₹10,000 spare. They decided to buy just ONE cow first, and buy a second cow later using the money the first cow earns.",
              },
              {
                type: "text",
                heading: "Let's Do the Maths Together",
                html: "Their cow gave 11 litres of milk a day. The MPP paid ₹42 for every litre. For the first 180 days: 11 litres × 180 days = 1,980 litres. Then, 1,980 litres × ₹42 = ₹83,160 earned!",
              },
              {
                type: "example",
                heading: "Try It Yourself",
                text: "If the same cow gives milk for another 120 days at the same rate (11 litres/day), that's 11 × 120 = 1,320 litres, worth 1,320 × ₹42 = ₹55,440 more. Adding it up: ₹83,160 + ₹55,440 = ₹1,38,600 from ONE cow in a year!",
              },
              {
                type: "ledger",
                heading: "Year 1: Full Result",
                rows: [
                  { label: "Total income from milk sales", amount: "₹2,21,760" },
                  { label: "Total yearly running costs (feed, health, etc.)", amount: "₹96,000" },
                ],
                total: { label: "Net profit (savings)", amount: "₹1,25,760" },
              },
              {
                type: "callout",
                style: "info",
                heading: "That's More Than Half!",
                text: "Ramesh and Sita kept more than 56 out of every 100 rupees they earned as pure profit — because they did the daily care themselves and grew some of their own green fodder on their land.",
              },
            ],
            check: [
              {
                type: "mcq",
                q: "If a cow gives 10 litres of milk a day for 10 days, and each litre sells for ₹42, how much money is that in total?",
                options: ["₹420", "₹4,200", "₹42,000", "₹840"],
                answer: 1,
                explain: "10 litres × 10 days = 100 litres. 100 litres × ₹42 = ₹4,200.",
              },
              {
                type: "mcq",
                q: "In Year 1, what share of Ramesh and Sita's milk income was kept as net profit?",
                options: ["About 10%", "About 25%", "More than 56%", "100%"],
                answer: 2,
                explain: "They kept more than 56% of their income as profit — ₹1,25,760 out of ₹2,21,760.",
              },
            ],
          },
          {
            id: "t-expansion",
            title: "A Big Decision — Should They Grow?",
            teach: [
              {
                type: "text",
                heading: "Year 2: Thinking Bigger",
                html: "After a successful first year, Ramesh and Sita considered buying 2 more cows — growing from 2 to 4 animals. Since they already had the shed and equipment, they would only need to spend on 2 new cows and some extra working capital: about ₹1,40,000 in total, paid fully from their Year 1 savings — no loan needed.",
              },
              {
                type: "ledger",
                heading: "Year 2: The Projected Numbers",
                rows: [
                  { label: "Projected income (4 cows)", amount: "₹5,54,400" },
                  { label: "Projected yearly running costs", amount: "₹2,25,000" },
                ],
                total: { label: "Projected net profit", amount: "₹3,29,400" },
              },
              {
                type: "callout",
                style: "tip",
                heading: "That's About ₹27,450 Every Month",
                text: "If things go as planned, this is more than the total combined income Ramesh and Sita earned doing daily-wage work in the city — and this time, they are their own boss, living at home with their family.",
              },
              {
                type: "text",
                heading: "But Is It Risk-Free?",
                html: "Before deciding, Ramesh and Sita thought about what could go wrong: What if the milk price drops? What if feed becomes more costly? What if an animal falls sick? More animals also means more daily work and care.",
              },
              {
                type: "callout",
                style: "warning",
                heading: "Growing a Business Always Has Risk",
                text: "More cows can mean more profit — but only if feed costs stay reasonable, milk prices hold steady, and all animals stay healthy. A good farmer plans for these risks instead of ignoring them.",
              },
            ],
            check: [
              {
                type: "mcq",
                q: "What is a real risk Ramesh and Sita should think about before adding 2 more cows?",
                options: [
                  "Milk price and feed costs could change unfavourably",
                  "There are absolutely no risks at all",
                  "Cows never get sick",
                  "More cows always cost less to keep",
                ],
                answer: 0,
                explain: "Milk prices could fall or feed costs could rise — real risks that could reduce the expected profit.",
              },
              {
                type: "truefalse",
                q: "Because Year 1 went well, expanding in Year 2 is completely guaranteed to succeed with no risk.",
                answer: false,
                explain: "Even a successful business has risks — prices, costs and animal health can all change. Good planning matters.",
              },
            ],
          },
        ],
        finalQuiz: {
          passScore: 70,
          isFinal: true,
          questions: [
            {
              topicId: "t-city-struggle",
              type: "mcq",
              q: "What was the biggest problem with Ramesh and Sita's life in the city?",
              options: [
                "They earned too much money",
                "Little to no savings despite hard work every day",
                "They had too much free time",
                "They didn't like their son",
              ],
              answer: 1,
              explain: "Despite working every day, they could barely save anything after rent, bills and other costs.",
            },
            {
              topicId: "t-coming-home",
              type: "mcq",
              q: "What made the MPP valuable to village farmers?",
              options: ["It gave loans only", "It offered fair testing and reliable, on-time payment for milk", "It sold cows", "It replaced the KVK"],
              answer: 1,
              explain: "The MPP tested milk fairly and paid farmers reliably and on time — a dependable market.",
            },
            {
              topicId: "t-money-story",
              type: "mcq",
              q: "In Year 1, what was Ramesh and Sita's net profit from their dairy business?",
              options: ["₹10,000", "₹96,000", "₹1,25,760", "₹2,21,760"],
              answer: 2,
              explain: "Net profit = ₹2,21,760 income − ₹96,000 costs = ₹1,25,760.",
            },
            {
              topicId: "t-expansion",
              type: "mcq",
              q: "Before expanding to 4 cows, what should Ramesh and Sita carefully plan for?",
              options: [
                "Nothing, expansion has no downside",
                "Possible changes in milk price and feed cost",
                "Selling their existing cow",
                "Moving back to the city",
              ],
              answer: 1,
              explain: "Smart expansion means planning for risks like changing milk prices and feed costs.",
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
