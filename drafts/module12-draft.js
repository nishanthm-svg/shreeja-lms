// ============================================================================
// Shreeja LMS — Module 12 DRAFT (English only, no translation)
// "Cost Associated with Milk Handling"
//
// This is a draft file only. It is written to match the exact schema used
// in data.js (see the "m1" module there), but with plain English strings
// instead of L(...) translation wrappers. Translations will be added later.
//
// This is the LAST module of the 12-module course. Lesson 3 is the course
// capstone, built around a real case study, and its finalQuiz is marked
// isFinal: true.
//
// Source material used:
//   C:\temp_lms_extract\extracted\12-cost-associated-with-milk-handling.txt
//   C:\temp_lms_extract\extracted\15-case-study-inward-transportation-cost.txt
//     (Shakti Milk Producer Company Limited case study — all names, facts
//     and figures for "Shakti MPC" below come directly from this case study)
// ============================================================================

export const module12 = {
  id: "m12",
  number: 12,
  title: "Cost Associated with Milk Handling",
  subtitle:
    "See where every rupee goes as milk travels from farmer to dairy — and learn how a real dairy company is working to bring transport costs down.",
  icon: "milk",
  available: true,
  lessons: [
    // ==================================================================
    // LESSON 1
    // ==================================================================
    {
      id: "m12-l1",
      title: "What Does It Cost to Get Milk From Farmer to Dairy?",
      estMinutes: 8,
      hook: [
        {
          type: "hero",
          heading: "Where Does the Money Go?",
          text: "Milk does not travel from a farmer's bucket to the dairy plant by magic. Every step — collecting, chilling, and transporting — costs money. Let's find out where that money goes, and why it matters to everyone.",
        },
      ],
      topics: [
        {
          id: "t-milk-journey-costs",
          title: "The Journey — And What It Costs at Each Step",
          teach: [
            {
              type: "text",
              heading: "From Bucket to Plant",
              html: "Milk travels through several steps before it reaches the dairy plant: the farmer milks the animal, brings it to the MPP, the Sahayak dispatches it, it is chilled at a BMC or MCC, and then it is transported to the plant. Each of these steps costs money to run.",
            },
            {
              type: "glossary",
              term: "BMC (Bulk Milk Cooler)",
              meaning:
                "A machine that quickly cools milk after it arrives from the villages, to keep it fresh until it reaches the dairy plant.",
            },
            {
              type: "glossary",
              term: "Inward Transportation",
              meaning:
                "The cost of moving milk from the MPPs to the chilling centre, and from there to the dairy plant. This includes fuel, the vehicle, and the driver.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Sahayak Commission",
                  text: "The Sahayak is paid a small amount for every litre of milk they help collect and dispatch correctly.",
                },
                {
                  label: "Transportation",
                  text: "Fuel, vehicle costs and driver wages to move milk from MPPs to the chilling centre and onward to the plant.",
                },
                {
                  label: "Chilling & Infrastructure",
                  text: "Rent, electricity and equipment costs to keep the chilling centre running and milk cold.",
                },
                {
                  label: "Cleaning & Maintenance",
                  text: "Regular cleaning (like Cleaning-in-Place, or CIP) and repair of equipment, so milk stays safe and machines keep working.",
                },
              ],
            },
            {
              type: "glossary",
              term: "CIP (Cleaning-in-Place)",
              meaning:
                "A standard cleaning process for milk cans, tanks and pipes, done regularly to keep milk safe and free of contamination.",
            },
            {
              type: "text",
              heading: "Transportation and Chilling Are the Biggest Costs",
              html: "Across most dairies, transportation and chilling together form the largest share of the total cost of handling milk. That is why this module looks closely at these two areas.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Which two costs together usually form the largest share of milk handling cost?",
              options: [
                "Transportation and chilling",
                "Stationery and paint",
                "Advertising and printing",
                "Office furniture and internet",
              ],
              answer: 0,
              explain:
                "Transportation and chilling together make up the largest share of the cost of handling milk from farmer to dairy.",
            },
            {
              type: "truefalse",
              q: "CIP (Cleaning-in-Place) is a one-time activity done only when a chilling centre is first built.",
              answer: false,
              explain:
                "CIP is a regular cleaning process, done again and again, to keep milk safe and equipment working well.",
            },
          ],
        },
        {
          id: "t-why-it-matters",
          title: "Why Controlling These Costs Matters for Everyone",
          teach: [
            {
              type: "text",
              heading: "One Shared Pot of Money",
              html: "Think of all the money that comes in when milk is sold to the dairy plant. Handling costs — Sahayak commission, transport, chilling, cleaning, maintenance — are taken out of that same pot before farmers are paid and before the union or company keeps its margin.",
            },
            {
              type: "example",
              heading: "A Simple Way to See It",
              text: "If handling costs are high, less money is left over to pay farmers a good price or to invest in growing the business. If handling costs are kept efficient, more money is left over — for better farmer prices, better infrastructure, and a stronger, more sustainable dairy.",
            },
            {
              type: "callout",
              style: "info",
              heading: "Every Litre Counts",
              text: "Higher milk volumes reduce the cost per litre, because fixed costs — like rent for a chilling centre — get spread across more litres. That is one reason why increasing how much milk each MPP collects is so valuable.",
            },
            {
              type: "callout",
              style: "warning",
              heading: "Hidden Losses Add Up",
              text: "Spillage, pilferage and quality problems don't just lose milk — they quietly inflate the real cost of handling every litre that does arrive safely. Careful handling protects both quantity and cost.",
            },
            {
              type: "text",
              heading: "Every Sahayak Has a Role",
              html: "As a Sahayak, the way you handle milk — careful collection, on-time dispatch, clean cans — directly affects handling costs. Small daily habits, multiplied across thousands of litres, make a real difference to what is left over for everyone.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Why does controlling milk handling costs matter for farmers?",
              options: [
                "Lower handling costs leave more money available to pay farmers a fair price",
                "It has no connection to farmer income",
                "It only matters for the dairy plant's office staff",
                "It only affects the price of animal feed",
              ],
              answer: 0,
              explain:
                "Handling costs come out of the same pot of money earned from milk sales — keeping them low leaves more for farmer payments.",
            },
            {
              type: "mcq",
              q: "Why do higher milk volumes usually lower the cost per litre?",
              options: [
                "Fixed costs like rent get spread across more litres",
                "Vehicles use less fuel when carrying more weight",
                "Farmers charge less for more milk",
                "Chilling machines work faster with more milk",
              ],
              answer: 0,
              explain:
                "Fixed costs stay roughly the same no matter the volume, so more litres means each litre carries a smaller share of that fixed cost.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-milk-journey-costs",
            type: "mcq",
            q: "What does 'Inward Transportation' cost cover?",
            options: [
              "Moving milk from the MPPs to the chilling centre and onward to the plant",
              "The price farmers are paid for milk",
              "The cost of building new farmer houses",
              "The Sahayak's mobile phone bill",
            ],
            answer: 0,
            explain:
              "Inward transportation covers the fuel, vehicle and driver costs of moving milk from MPPs to the chilling centre and then to the plant.",
          },
          {
            topicId: "t-why-it-matters",
            type: "mcq",
            q: "What happens to the money left over when handling costs are kept low and efficient?",
            options: [
              "More money is available for farmer prices and business investment",
              "It disappears completely",
              "It can only be used for advertising",
              "It has no effect on anyone",
            ],
            answer: 0,
            explain:
              "Efficient handling costs leave more of the money earned from milk sales available for fair farmer prices and growth.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 2
    // ==================================================================
    {
      id: "m12-l2",
      title: "What Drives These Costs Up or Down",
      estMinutes: 8,
      hook: [
        {
          type: "hero",
          heading: "What Makes Costs Rise or Fall?",
          text: "Some milk handling costs change with how much milk you handle. Others stay almost the same no matter what. Understanding the difference helps everyone make better decisions.",
        },
      ],
      topics: [
        {
          id: "t-fixed-variable-costs",
          title: "Fixed Costs, Variable Costs, and Volume",
          teach: [
            {
              type: "text",
              heading: "Two Kinds of Cost",
              html: "Some costs change directly with how much milk is handled — these are called <b>variable costs</b>. Others stay mostly the same, whether you handle a little milk or a lot — these are called <b>fixed costs</b>.",
            },
            {
              type: "glossary",
              term: "Variable Cost",
              meaning:
                "A cost that goes up or down depending on how much milk is handled — like fuel for a delivery van, which increases if the van makes more trips.",
            },
            {
              type: "glossary",
              term: "Fixed Cost",
              meaning:
                "A cost that stays roughly the same no matter how much milk is handled — like the monthly rent for a chilling centre building.",
            },
            {
              type: "text",
              heading: "MCC Costs vs BMC Costs",
              html: "At an MCC (Milk Chilling Centre), costs tend to be more variable — they move closely with the quantity of milk handled per litre. At a BMC (Bulk Milk Cooler), costs tend to be largely fixed — the equipment and building cost about the same to run whether it is half full or completely full. This is why volume matters so much for BMC efficiency.",
            },
            {
              type: "example",
              heading: "Seeing It With Numbers",
              text: "Imagine a BMC costs ₹35,000 a month to run, no matter how much milk passes through it. If it handles 50,000 litres that month, the fixed cost works out to ₹0.70 per litre. If it handles only 25,000 litres, the same ₹35,000 now works out to ₹1.40 per litre — double the cost, just because less milk passed through.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "The Big Idea",
              text: "Higher milk volumes at a BMC or MCC mean the same fixed costs get divided among more litres — so the cost per litre drops. This is why growing procurement at each MPP is just as important as opening new MPPs.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is a fixed cost?",
              options: [
                "A cost that stays roughly the same, no matter how much milk is handled",
                "A cost that only happens once a year",
                "A cost that farmers pay directly",
                "A cost that only applies to transport",
              ],
              answer: 0,
              explain:
                "A fixed cost — like a chilling centre's rent — stays roughly the same whether milk volumes are high or low.",
            },
            {
              type: "truefalse",
              q: "If a BMC handles less milk in a month, its fixed cost per litre usually goes down.",
              answer: false,
              explain:
                "If less milk passes through, the same fixed cost is spread over fewer litres, so the cost per litre actually goes UP.",
            },
          ],
        },
        {
          id: "t-controlling-costs",
          title: "Hidden Costs and How to Control Them",
          teach: [
            {
              type: "text",
              heading: "Routing Matters",
              html: "Inefficient routing — like a vehicle travelling a long, winding path to visit MPPs in a poor order — directly increases the cost per litre. Planning routes well is one of the simplest ways to control transport cost.",
            },
            {
              type: "text",
              heading: "Right Vehicle, Right Capacity",
              html: "Using a vehicle that matches the amount of milk on a route — not too big, not too small — gives the lowest possible cost per litre for inward transportation. A large tanker on a route that only collects a few hundred litres wastes fuel and money.",
            },
            {
              type: "glossary",
              term: "Capacity Utilisation",
              meaning:
                "How much of a vehicle's or machine's full capacity is actually being used. A tanker that could carry 3,000 litres but only carries 900 litres has poor capacity utilisation.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Right Vehicle Sizing",
                  text: "Matching vehicle capacity to the actual milk volume on a route keeps transport cost per litre as low as possible.",
                },
                {
                  label: "Energy Optimisation",
                  text: "Using electricity and fuel efficiently at chilling centres is key to keeping chilling costs down.",
                },
                {
                  label: "Capacity Utilisation",
                  text: "Filling vehicles and equipment closer to their full capacity drives down the overall cost per litre.",
                },
              ],
            },
            {
              type: "callout",
              style: "warning",
              heading: "Hidden Losses Inflate Cost",
              text: "Spillage, pilferage and quality problems don't show up as a separate 'cost' line — but they quietly increase the real cost of every litre that does arrive safely, because the same fixed costs are now spread over less usable milk.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What does 'right vehicle + right capacity' achieve?",
              options: [
                "The lowest possible inward transportation cost per litre",
                "The fastest possible speed on the highway",
                "The smallest fuel tank size",
                "The shortest driver shift",
              ],
              answer: 0,
              explain:
                "Matching vehicle size to the actual milk volume on a route gives the lowest possible transportation cost per litre.",
            },
            {
              type: "mcq",
              q: "What is capacity utilisation?",
              options: [
                "How much of a vehicle's or machine's full capacity is actually being used",
                "The number of MPPs on a route",
                "The price of diesel per litre",
                "The number of Sahayaks on a route",
              ],
              answer: 0,
              explain:
                "Capacity utilisation measures how fully a vehicle or machine's capacity is actually being used.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-fixed-variable-costs",
            type: "mcq",
            q: "Why do BMC costs tend to be largely fixed?",
            options: [
              "The equipment and building cost about the same whether it is half full or completely full",
              "BMCs never cost any money to run",
              "BMC costs change every single day",
              "BMCs only cost money in summer",
            ],
            answer: 0,
            explain:
              "BMC running costs stay roughly the same regardless of how much milk passes through, which is why higher volume lowers the cost per litre.",
          },
          {
            topicId: "t-controlling-costs",
            type: "mcq",
            q: "What is one simple way to control inward transportation cost?",
            options: [
              "Plan efficient routes and match vehicle size to actual milk volume",
              "Always use the biggest tanker available on every route",
              "Skip vehicle maintenance to save money",
              "Remove milk quality checks to save time",
            ],
            answer: 0,
            explain:
              "Efficient routing and right-sized vehicles keep transportation cost per litre as low as possible.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 3 — CASE STUDY (module capstone AND course capstone)
    // ==================================================================
    {
      id: "m12-l3",
      title: "The Shakti MPC Story: Solving the Transport Cost Puzzle",
      estMinutes: 14,
      hook: [
        {
          type: "hero",
          heading: "A Real Dairy's Cost Puzzle",
          text: "This is the story of a real Milk Producer Company working through a real transport cost problem. Everything you've learned in this course comes together here. Let's dig in.",
        },
      ],
      topics: [
        {
          id: "t-meet-shakti",
          title: "Meet Shakti MPC",
          teach: [
            {
              type: "text",
              heading: "A Growing Company",
              html: "Shakti Milk Producer Company Limited (Shakti MPC) started in 2021 to give rural milk producers a reliable market and fair prices. It began with support from an outside grant, which paid for MPPs, BMCs, testing equipment and vehicles while the company was still growing.",
            },
            {
              type: "glossary",
              term: "Grant Support",
              meaning:
                "Money given to help a company get started, which does not need to be paid back like a loan. Grant support often reduces or ends as the company grows and needs to stand on its own.",
            },
            {
              type: "text",
              heading: "Standing on Its Own",
              html: "As the grant support ended, Shakti MPC had to cover its own running costs from what it earns handling milk — its procurement margins and its own efficiency. Today, the company runs one of the largest milk procurement networks in its region.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "800 MPPs",
                  text: "Shakti MPC collects milk from about 800 village-level Milk Pooling Points.",
                },
                {
                  label: "1,200+ Villages",
                  text: "These MPPs are spread across more than 1,200 villages.",
                },
                {
                  label: "85,000 Members",
                  text: "Nearly 85,000 farmer families are members of the company.",
                },
                {
                  label: "84,000 to 1.15 Lakh Litres a Day",
                  text: "Daily milk collection ranges from about 84,000 litres in the lean season to more than 1,15,000 litres at peak season.",
                },
              ],
            },
            {
              type: "barchart",
              heading: "Five Years of Growth (Average Daily Procurement)",
              source: "Shakti MPC internal records",
              unit: "litres per day",
              data: [
                { label: "FY 2021-22", value: 22500 },
                { label: "FY 2022-23", value: 41200 },
                { label: "FY 2023-24", value: 63500 },
                { label: "FY 2024-25", value: 78800 },
                { label: "FY 2025-26", value: 84000 },
              ],
            },
            {
              type: "example",
              heading: "Fast Growth, New Problems",
              text: "In just five years, Shakti MPC nearly quadrupled its daily milk collection. But fast growth brought a new challenge: rising costs, especially for transportation — even as the amount of milk collected kept growing.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "About how many MPPs does Shakti MPC currently operate?",
              options: ["About 800", "About 80", "About 8,000", "About 8"],
              answer: 0,
              explain: "Shakti MPC procures milk from approximately 800 Milk Pooling Points.",
            },
            {
              type: "truefalse",
              q: "Shakti MPC's daily milk procurement grew steadily over five years, from about 22,500 litres to about 84,000 litres.",
              answer: true,
              explain:
                "Average daily procurement grew from 22,500 litres in FY 2021-22 to 84,000 litres in FY 2025-26.",
            },
          ],
        },
        {
          id: "t-where-money-goes",
          title: "Where the Money Goes — Real Cost Numbers",
          teach: [
            {
              type: "text",
              heading: "A Detailed Cost Review",
              html: "As grant support ended, Shakti MPC studied exactly where its procurement money was going, for every single litre of milk. Here is what they found.",
            },
            {
              type: "ledger",
              heading: "Shakti MPC — Cost per Litre of Milk Procured",
              rows: [
                { label: "Sahayak Commission", amount: "₹0.90" },
                { label: "Inward Transportation", amount: "₹2.28" },
                { label: "BMC Rent & Infrastructure", amount: "₹0.35" },
                { label: "Labour Cost", amount: "₹0.25" },
                { label: "Diesel & Utilities", amount: "₹0.42" },
                { label: "Cleaning & CIP", amount: "₹0.12" },
                { label: "Repair & Maintenance", amount: "₹0.18" },
              ],
              total: { label: "Total Cost per Litre", amount: "₹4.50" },
            },
            {
              type: "example",
              heading: "Which Cost Is the Biggest?",
              text: "Inward Transportation alone is ₹2.28 out of the ₹4.50 total cost per litre — more than half of everything spent to handle each litre of milk. This is exactly why the company is focused on solving its transportation cost problem.",
            },
            {
              type: "callout",
              style: "info",
              heading: "A Rising Trend",
              text: "Inward transportation cost per litre has been climbing every year — from ₹1.68 in FY 2021-22 to ₹2.28 in FY 2025-26 — even as the company's daily milk volumes grew. More milk did not automatically mean a lower cost per litre.",
            },
            {
              type: "barchart",
              heading: "Inward Transportation Cost Trend",
              source: "Shakti MPC internal records",
              unit: "₹ per litre",
              data: [
                { label: "FY 2021-22", value: 1.68 },
                { label: "FY 2022-23", value: 1.82 },
                { label: "FY 2023-24", value: 1.96 },
                { label: "FY 2024-25", value: 2.12 },
                { label: "FY 2025-26", value: 2.28 },
              ],
            },
          ],
          check: [
            {
              type: "mcq",
              q: "In Shakti MPC's cost structure, what is the single biggest cost per litre?",
              options: ["Inward Transportation", "Cleaning & CIP", "Repair & Maintenance", "Labour Cost"],
              answer: 0,
              explain:
                "At ₹2.28 per litre, Inward Transportation is the largest single cost, more than half of the ₹4.50 total.",
            },
            {
              type: "mcq",
              q: "What happened to inward transportation cost per litre over five years, even as milk volumes grew?",
              options: [
                "It kept rising, from ₹1.68 to ₹2.28 per litre",
                "It fell steadily every year",
                "It stayed exactly the same",
                "It dropped to zero",
              ],
              answer: 0,
              explain:
                "Despite volume growth, inward transportation cost per litre rose every year, from ₹1.68 to ₹2.28.",
            },
          ],
        },
        {
          id: "t-route-timing-puzzle",
          title: "The Route Timing Puzzle",
          teach: [
            {
              type: "text",
              heading: "The Three-Hour Rule",
              html: "To protect milk quality, Shakti MPC follows a strict rule: milk collected at the first MPP on a route must reach the chilling centre within three hours. Waiting longer lets acidity and bacteria increase, which spoils milk quality.",
            },
            {
              type: "text",
              heading: "Working Backwards From the Deadline",
              html: "Because chilled milk must reach the plant by 9:30 AM (morning) or 9:30 PM (evening), routes are planned backwards from that deadline. This means the first and second MPPs on many routes must finish pouring milk by about 6:30 AM or 6:30 PM — quite early for farmers who finish milking and housework a bit later.",
            },
            {
              type: "callout",
              style: "warning",
              heading: "A Paradox",
              text: "Competing dairies often visit these same villages as the sixth or seventh stop on their route — giving farmers 30 to 45 extra minutes. Farmers find this more convenient, so Shakti MPC's first and second MPPs on many routes collect less milk than similar villages served by competitors. Careful route discipline protects quality, but may also be holding back procurement volume.",
            },
            {
              type: "text",
              heading: "Small MPPs, Big Inefficiency",
              html: "A review of all 800 MPPs found the average was about 105 litres per MPP per day — but this hid a big problem underneath.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Less than 50 litres/day",
                  text: "About 30% of MPPs collect less than 50 litres a day — a very small amount for a vehicle to travel out for.",
                },
                {
                  label: "50 to 100 litres/day",
                  text: "About 50% of MPPs collect between 50 and 100 litres a day.",
                },
                {
                  label: "100 to 200 litres/day",
                  text: "About 15% of MPPs collect between 100 and 200 litres a day.",
                },
                {
                  label: "More than 200 litres/day",
                  text: "Only about 5% of MPPs collect more than 200 litres a day.",
                },
              ],
            },
            {
              type: "example",
              heading: "A Costly Trip",
              text: "In many cases, a vehicle visits all ten MPPs allowed on a route but collects less than 1,000 litres in total for the whole trip. That means the vehicle, the fuel, and the driver's time are being used for a very small amount of milk — pushing the transport cost per litre higher.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Why must milk from the first MPP on a route reach the chilling centre within three hours?",
              options: [
                "To prevent rising acidity, bacterial growth and quality loss",
                "Because the plant closes at that time",
                "Because Sahayaks are only paid for three hours of work",
                "Because vehicles cannot carry milk for longer",
              ],
              answer: 0,
              explain:
                "Delays beyond three hours let acidity and bacteria increase, which deteriorates milk quality.",
            },
            {
              type: "mcq",
              q: "According to the MPP review, what share of MPPs collect less than 50 litres a day?",
              options: ["About 30%", "About 5%", "About 50%", "About 100%"],
              answer: 0,
              explain: "Nearly 30 percent of MPPs were found to collect less than 50 litres per day.",
            },
          ],
        },
        {
          id: "t-what-would-you-do",
          title: "What Would You Do? — A Decision for the Sahayak",
          teach: [
            {
              type: "text",
              heading: "Doing the Maths on a Low-Volume Route",
              html: "Let's calculate what a low-volume route really costs. A vehicle visits all 10 MPPs allowed on a route and collects a total of 900 litres for the trip. If Shakti MPC's average inward transportation cost is ₹2.28 per litre, what should this trip cost to run?",
            },
            {
              type: "example",
              heading: "Step 1: What the Trip Should Cost",
              text: "At the company's average rate: 900 litres × ₹2.28 = ₹2,052. This is the transportation cost we would expect to be 'fair' for 900 litres on this route.",
            },
            {
              type: "text",
              heading: "But What If the Actual Trip Cost More?",
              html: "Suppose the actual diesel, driver time and vehicle cost for this specific ten-MPP trip was ₹3,150 — because the vehicle travelled a long distance for a small amount of milk.",
            },
            {
              type: "ledger",
              heading: "This Route: Expected vs Actual Cost",
              rows: [
                { label: "Expected cost (900 litres × ₹2.28)", amount: "₹2,052" },
                { label: "Actual cost of this trip", amount: "₹3,150" },
              ],
              total: { label: "Extra cost above expected", amount: "₹1,098" },
            },
            {
              type: "example",
              heading: "What This Means Per Litre",
              text: "₹3,150 ÷ 900 litres = ₹3.50 per litre — much higher than the company's average of ₹2.28 per litre. This single low-volume route is quietly pulling up the average cost for the whole company.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Options on the Table",
              text: "Shakti MPC's committee is weighing several options: restructuring routes, encouraging more milk at existing MPPs, trying electric or CNG vehicles, using smaller three-wheelers on low-volume routes, and possibly resequencing which villages are visited first.",
            },
            {
              type: "poll",
              heading: "What Would You Recommend First?",
              questions: [
                {
                  q: "If you were advising Shakti MPC's committee, which step would you try FIRST to reduce this route's cost per litre?",
                  options: [
                    "Use a smaller vehicle sized for this route's actual volume",
                    "Buy the most expensive new tanker available",
                    "Stop collecting milk from small MPPs completely",
                    "Ignore the cost and keep the same vehicle",
                  ],
                  answer: 0,
                  reveal:
                    "Many producer companies have found that matching vehicle size to actual route volume — smaller vehicles for smaller routes — is often the fastest and cheapest way to bring cost per litre down, without changing route timing or losing farmer trust.",
                },
              ],
            },
            {
              type: "callout",
              style: "info",
              heading: "Not a Simple Fix",
              text: "Every option has trade-offs. Smaller vehicles may struggle on poor roads or during peak season. EVs need charging infrastructure that is still limited in rural areas. Changing route timing could raise procurement but risks milk quality. Good decisions balance cost, quality, and what is fair and convenient for farmers.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "In this example, what was the extra cost above the expected amount for the 900-litre trip?",
              options: ["₹1,098", "₹2,052", "₹3,150", "₹900"],
              answer: 0,
              explain: "Extra cost = ₹3,150 actual − ₹2,052 expected = ₹1,098.",
            },
            {
              type: "mcq",
              q: "What is one practical way to lower the cost per litre on a low-volume route?",
              options: [
                "Use a smaller vehicle that better matches the route's actual milk volume",
                "Always use the biggest tanker available, regardless of volume",
                "Stop testing milk quality to save time",
                "Remove the three-hour quality rule everywhere",
              ],
              answer: 0,
              explain:
                "Right-sizing the vehicle to the route's actual volume is a practical way to bring transport cost per litre down.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        isFinal: true,
        questions: [
          {
            topicId: "t-meet-shakti",
            type: "mcq",
            q: "About how many producer members does Shakti MPC serve?",
            options: ["Nearly 85,000", "Nearly 8,500", "Nearly 850", "Nearly 8,50,000"],
            answer: 0,
            explain: "Shakti MPC serves nearly 85,000 producer members.",
          },
          {
            topicId: "t-where-money-goes",
            type: "mcq",
            q: "What share of Shakti MPC's total cost per litre (₹4.50) comes from inward transportation (₹2.28)?",
            options: [
              "More than half of the total cost",
              "Less than 5% of the total cost",
              "None of the total cost",
              "Exactly equal to the Sahayak commission",
            ],
            answer: 0,
            explain: "₹2.28 out of ₹4.50 is more than half of the total cost per litre.",
          },
          {
            topicId: "t-route-timing-puzzle",
            type: "mcq",
            q: "Why do Shakti MPC's first and second MPPs on many routes often collect less milk than nearby villages served by competitors?",
            options: [
              "Competitors visit later in the route, giving farmers more time before the vehicle arrives",
              "Those villages have no farmers",
              "Shakti MPC pays a lower price there",
              "Those MPPs are closed on some days",
            ],
            answer: 0,
            explain:
              "Competitors visiting as the sixth or seventh stop give farmers 30-45 extra minutes, which farmers find more convenient.",
          },
          {
            topicId: "t-what-would-you-do",
            type: "mcq",
            q: "What is the biggest lesson from the 900-litre route example?",
            options: [
              "A vehicle that is too big for a route's actual volume can push the cost per litre well above average",
              "Bigger vehicles are always cheaper to run",
              "Route cost has nothing to do with vehicle size",
              "Only Sahayak commission affects route cost",
            ],
            answer: 0,
            explain:
              "The 900-litre route's actual cost per litre (₹3.50) was well above the company average (₹2.28), showing how vehicle-to-volume mismatch drives up cost.",
          },
        ],
      },
    },
  ],
};

export default module12;
