// ============================================================================
// DRAFT — Module 10: Milk Rates, Its Parameters and Methodologies
// English-only draft content. Written for learners with no formal education
// and no prior dairy knowledge (about a Class 7 reading level).
// Matches the schema used in data.js (see module "m1"). Translation (the
// L() wrapper) will be added later — every string below is plain English.
//
// SOURCE: 10-milk-rates-parameters-methodologies.txt (8 slides on FAT/SNF
// based milk pricing), plus the worked practice sets 18/19 (EFU pricing
// case + solution) and 20/21 (Single-Axis / Pro-Rata Fat pricing case +
// solution). All numeric worked examples below use the real figures and
// answers from those practice-set solution files. Note: the source slides
// title the fat-only method "Pricing on Pro-rata fat basis"; the practice
// set files call the same method "Single-Axis" pricing — this draft treats
// them as the same method and names it "Pro-Rata Fat (Single-Axis) pricing"
// so learners recognise both terms.
// ============================================================================

export const MODULE_10 = {
  id: "m10",
  number: 10,
  title: "Milk Rates, Its Parameters and Methodologies",
  subtitle:
    "Learn why milk is priced on quality, not just quantity — and practice the real maths MPPs use to work out a fair rate.",
  icon: "milk",
  available: true,
  lessons: [
    // ==================================================================
    // LESSON 1 — Why FAT and SNF Decide the Price
    // ==================================================================
    {
      id: "m10-l1",
      title: "Why FAT and SNF Decide the Price",
      estMinutes: 7,
      hook: [
        {
          type: "hero",
          heading: "Why Isn't Milk Priced Like Water?",
          text: "Two farmers each bring 10 litres of milk. Do they always get paid the same amount? Not necessarily — and there's a good reason why. Let's find out.",
        },
      ],
      topics: [
        {
          id: "t-m10-l1-not-just-volume",
          title: "Why Milk Isn't Priced by Volume Alone",
          teach: [
            {
              type: "text",
              heading: "Same Litres, Different Value",
              html: "If milk was priced only by how many litres a farmer brings, there would be no reward for good-quality milk — and no way to stop someone from adding water to increase volume. That is why MPPs price milk mainly on two things found inside it: <b>FAT</b> and <b>SNF</b>.",
            },
            {
              type: "glossary",
              term: "FAT",
              meaning:
                "The fat content of milk — it is what gives milk its richness, and is used to make butter, ghee and cream. It is measured as a percentage, like 4% or 6%.",
            },
            {
              type: "glossary",
              term: "SNF (Solids-Not-Fat)",
              meaning:
                "Everything solid in milk except fat — mainly protein, milk sugar (lactose) and minerals. It is also measured as a percentage, and matters for products like paneer and milk powder.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "FAT — Richness",
                  text: "Higher FAT means richer milk, better for ghee and butter. Cow milk is usually lower in FAT; buffalo milk is usually higher.",
                },
                {
                  label: "SNF — Solids",
                  text: "Higher SNF means more protein, minerals and milk sugar — important for the milk's real food value and for products like paneer.",
                },
                {
                  label: "Testing Before Payment",
                  text: "Every farmer's milk is tested for FAT and SNF before the rate is worked out — this is what makes the payment fair.",
                },
              ],
            },
            {
              type: "callout",
              style: "info",
              heading: "Fair Pay for Real Quality",
              text: "A farmer who feeds their animal well and takes good care of it usually gets milk with higher FAT and SNF — and earns a better rate. This system rewards good care, not just a bigger can of milk.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What does FAT in milk mainly affect?",
              options: [
                "The colour of the milk can",
                "The richness of the milk, used for ghee and butter",
                "The distance milk travels to the MPP",
                "The size of the farmer's herd",
              ],
              answer: 1,
              explain: "FAT is what gives milk its richness, and is used to make products like ghee and butter.",
            },
            {
              type: "truefalse",
              q: "SNF stands for 'Solids-Not-Fat' and includes things like protein and milk sugar.",
              answer: true,
              explain:
                "Correct. SNF covers all the solid parts of milk apart from fat — mainly protein, lactose (milk sugar) and minerals.",
            },
          ],
        },
        {
          id: "t-m10-l1-factors",
          title: "What Makes FAT and SNF Go Up or Down",
          teach: [
            {
              type: "text",
              heading: "Not Every Litre Is the Same",
              html: "FAT and SNF levels are not fixed — they change based on a few real factors. Knowing these helps a Sahayak explain milk rates to farmers clearly.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Species (Cow or Buffalo)",
                  text: "Buffalo milk usually has more FAT (around 6-8%) than cow milk (around 3-4.5%). That is one reason buffalo milk often earns a higher rate per litre.",
                },
                {
                  label: "Breed",
                  text: "Some breeds, like local indigenous breeds, can naturally give milk with higher FAT than some high-yield crossbred (HF) cows, even if the crossbred cow gives more total litres.",
                },
                {
                  label: "Season",
                  text: "FAT and SNF can dip a little in hot summer months and rise in cooler winter months, because animals eat and drink differently.",
                },
              ],
            },
            {
              type: "callout",
              style: "warning",
              heading: "Why Adulteration Is Caught",
              text: "Adding water to milk lowers both FAT and SNF, because it dilutes everything in the milk. This is exactly why every sample is tested before payment — it protects honest farmers and the MPO.",
            },
            {
              type: "example",
              heading: "Buffalo vs Cow, Same Rate",
              text: "At the same fat rate, a buffalo giving 7% FAT milk will earn more per litre than a cow giving 4% FAT milk — because the buffalo's milk has more of what is actually being paid for.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Which of these can cause FAT and SNF to be lower than they should be?",
              options: [
                "The farmer's name",
                "Adding water to the milk",
                "The colour of the milk can",
                "The time the Sahayak wakes up",
              ],
              answer: 1,
              explain: "Adding water dilutes the milk, lowering both its FAT and SNF readings.",
            },
            {
              type: "truefalse",
              q: "Buffalo milk usually has lower FAT than cow milk.",
              answer: false,
              explain:
                "It is the opposite — buffalo milk usually has more FAT (around 6-8%) than cow milk (around 3-4.5%).",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-m10-l1-not-just-volume",
            type: "mcq",
            q: "Why do MPPs test milk for FAT and SNF before paying farmers?",
            options: [
              "To decide the colour of the milk can",
              "To make sure the rate paid matches the real quality of the milk",
              "Because it is required for the animal's health",
              "To count how many farmers are members",
            ],
            answer: 1,
            explain:
              "Testing FAT and SNF makes sure farmers are paid fairly, based on the real quality of the milk they brought.",
          },
          {
            topicId: "t-m10-l1-factors",
            type: "truefalse",
            q: "Season can affect the FAT and SNF levels in milk.",
            answer: true,
            explain:
              "Yes — FAT and SNF can shift a little between summer and winter, because of changes in what animals eat and drink.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 2 — Pricing on Fat Basis: Let's Do the Maths
    // ==================================================================
    {
      id: "m10-l2",
      title: "Pricing on Fat Basis — Let's Do the Maths",
      estMinutes: 8,
      hook: [
        {
          type: "hero",
          heading: "Method 1: Pro-Rata Fat Pricing",
          text: "This is the simplest pricing method — sometimes called Single-Axis pricing because it looks at just ONE thing: FAT. Let's learn the formula and try it with real numbers.",
        },
      ],
      topics: [
        {
          id: "t-m10-l2-formula",
          title: "The Pro-Rata Fat Formula",
          teach: [
            {
              type: "text",
              heading: "One Simple Formula",
              html: "In <b>Pro-Rata Fat pricing</b> (also called <b>Single-Axis pricing</b>), the price per litre depends only on the milk's FAT percentage and the <b>fat rate</b> the MPO has set. The formula is:<br><b>Price per litre = (FAT% ÷ 100) × Fat Rate</b>",
            },
            {
              type: "glossary",
              term: "Fat Rate",
              meaning:
                "The price the MPO sets for one full kilogram of fat — for example, ₹580 per kg. It is the starting number used to work out what each farmer's milk is worth.",
            },
            {
              type: "text",
              heading: "Let's Do the Maths Together",
              html: "A farmer's milk has FAT of 5.5%, and the fat rate is ₹580 per kg.<br>Price per litre = (5.5 ÷ 100) × 580 = <b>₹31.90 per litre</b>.",
            },
            {
              type: "example",
              heading: "Try It Yourself — Scaling Up",
              text: "If the MPP collects 2,000 litres today, all at this same average FAT, the total paid to farmers is: 2,000 litres × ₹31.90 = ₹63,800 in one day, from milk alone.",
            },
            {
              type: "callout",
              style: "info",
              heading: "Same Formula, Every Time",
              text: "Whether it's one litre or ten thousand litres, the formula stays exactly the same — only the FAT percentage and the total quantity change.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "A farmer's milk has 7% FAT. The fat rate is ₹500 per kg. What is the price per litre?",
              options: ["₹7", "₹35", "₹350", "₹500"],
              answer: 1,
              explain: "Price = (7 ÷ 100) × 500 = ₹35 per litre.",
            },
            {
              type: "mcq",
              q: "In the Pro-Rata Fat method, which two numbers decide the price per litre?",
              options: [
                "The farmer's name and village",
                "The FAT percentage and the fat rate",
                "The colour of the can and the season",
                "The number of members in the MPP",
              ],
              answer: 1,
              explain: "Price per litre = (FAT% ÷ 100) × Fat Rate — nothing else is needed for this method.",
            },
          ],
        },
        {
          id: "t-m10-l2-deductions-incentives",
          title: "Deductions, Incentives and Comparing Milk Types",
          teach: [
            {
              type: "text",
              heading: "Not Always a Flat Formula",
              html: "MPOs often adjust the base price up or down, to reward good quality and discourage poor quality. Let's see two real examples.",
            },
            {
              type: "ledger",
              heading: "Example: A Deduction for Low SNF",
              rows: [
                { label: "Base price (6% FAT × ₹600/kg fat rate)", amount: "₹36.00" },
                { label: "Deduction for SNF below standard", amount: "−₹1.50" },
              ],
              total: { label: "Final price paid per litre", amount: "₹34.50" },
            },
            {
              type: "ledger",
              heading: "Example: An Incentive for High FAT",
              rows: [
                { label: "Base price (6.8% FAT × ₹610/kg fat rate)", amount: "₹41.48" },
                { label: "Incentive for FAT above 6.5%", amount: "+₹2.00" },
              ],
              total: { label: "Final price paid per litre", amount: "₹43.48" },
            },
            {
              type: "callout",
              style: "tip",
              heading: "Why Incentives Help Everyone",
              text: "Incentives reward farmers who feed and care for their animals well enough to get richer milk. This encourages better care across the whole village, which means better milk for the MPP too.",
            },
            {
              type: "barchart",
              heading: "Price per Litre by Milk Type (at ₹620/kg fat rate)",
              source: "Worked example, Pro-Rata Fat method",
              unit: "₹ per litre",
              data: [
                { label: "Buffalo milk (7.5% FAT)", value: 46.5 },
                { label: "Cow milk (4% FAT)", value: 24.8 },
              ],
            },
            {
              type: "text",
              heading: "Same Rate, Different Result",
              html: "Both farmers are paid at the exact same fat rate of ₹620 per kg. The buffalo milk earns more per litre only because it naturally has more FAT — not because it is treated differently.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Why does buffalo milk usually earn a higher price per litre than cow milk, at the same fat rate?",
              options: [
                "Buffaloes are bigger animals",
                "Buffalo milk usually has a higher FAT percentage",
                "Cow milk is tested less often",
                "There is no real difference",
              ],
              answer: 1,
              explain:
                "Since the price depends on FAT%, and buffalo milk usually has more FAT, it earns more per litre at the same fat rate.",
            },
            {
              type: "truefalse",
              q: "A deduction lowers the base price, and an incentive raises it.",
              answer: true,
              explain:
                "Correct — deductions (for issues like low SNF) reduce the price, while incentives (for high FAT) increase it.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-m10-l2-formula",
            type: "mcq",
            q: "A farmer's milk has FAT 5%. The fat rate is ₹500 per kg. What is the price per litre?",
            options: ["₹5", "₹25", "₹50", "₹500"],
            answer: 1,
            explain: "Price = (5 ÷ 100) × 500 = ₹25 per litre.",
          },
          {
            topicId: "t-m10-l2-deductions-incentives",
            type: "mcq",
            q: "What is the effect of an incentive on the price paid to a farmer?",
            options: [
              "It lowers the price",
              "It raises the price",
              "It has no effect",
              "It changes the FAT test result",
            ],
            answer: 1,
            explain: "An incentive is an amount added on top of the base price, so it raises what the farmer is paid.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 3 — Pricing on EFU Basis: A Second Method
    // ==================================================================
    {
      id: "m10-l3",
      title: "Pricing on EFU Basis — A Second Method",
      estMinutes: 8,
      hook: [
        {
          type: "hero",
          heading: "Method 2: Equivalent Fat Units (EFU)",
          text: "The Pro-Rata Fat method looks at FAT alone. This second method — EFU — combines FAT and SNF into one fair number. Let's learn how it works, with real numbers.",
        },
      ],
      topics: [
        {
          id: "t-m10-l3-efu-formula",
          title: "What Is EFU and How Do We Calculate It",
          teach: [
            {
              type: "text",
              heading: "Combining FAT and SNF",
              html: "<b>EFU</b> stands for <b>Equivalent Fat Units</b>. Instead of looking at FAT alone, it combines FAT and SNF into a single number, so both are rewarded fairly. The formula is:<br><b>EFU = FAT% + (SNF% × 2/3)</b>",
            },
            {
              type: "glossary",
              term: "EFU (Equivalent Fat Units)",
              meaning:
                "A single number that combines a milk sample's FAT and SNF together, so both can be compared fairly against a standard reference point.",
            },
            {
              type: "text",
              heading: "Let's Do the Maths Together",
              html: "A farmer's milk has FAT 5.5% and SNF 8.6%.<br>EFU = 5.5 + (8.6 × 2/3) = 5.5 + 5.73 = <b>11.23</b>.",
            },
            {
              type: "example",
              heading: "Try It Yourself",
              text: "Milk with FAT 6.8% and SNF 9.0%: EFU = 6.8 + (9.0 × 2/3) = 6.8 + 6.0 = 12.8. Many MPOs use 12.5 EFU as the standard base level — so this milk, at 12.8, is slightly ABOVE standard.",
            },
            {
              type: "callout",
              style: "info",
              heading: "What the Base EFU Means",
              text: "12.5 EFU is a common standard reference point. Milk above this base is richer than standard and earns more. Milk below this base earns less.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What does EFU combine into one number?",
              options: [
                "FAT and the price of feed",
                "FAT and SNF",
                "The farmer's age and animal breed",
                "Season and distance to the MPP",
              ],
              answer: 1,
              explain: "EFU (Equivalent Fat Units) combines a milk sample's FAT and SNF into a single number.",
            },
            {
              type: "mcq",
              q: "Milk has FAT 4% and SNF 9%. Using EFU = FAT + (SNF × 2/3), what is its EFU?",
              options: ["4", "9", "10", "13"],
              answer: 2,
              explain: "EFU = 4 + (9 × 2/3) = 4 + 6 = 10.",
            },
          ],
        },
        {
          id: "t-m10-l3-efu-price",
          title: "Using EFU to Work Out the Price",
          teach: [
            {
              type: "text",
              heading: "From EFU to Rupees",
              html: "Once we know a farmer's EFU, we compare it to the base EFU to work out the price. The formula is:<br><b>Price per litre = (Farmer's EFU ÷ Base EFU) × Declared Rate</b>",
            },
            {
              type: "glossary",
              term: "Declared Rate",
              meaning:
                "The price per litre the MPO announces for milk that is exactly at the base EFU (for example, 12.5 EFU). It is the reference price used in the formula.",
            },
            {
              type: "text",
              heading: "Let's Do the Maths Together",
              html: "A farmer's milk has FAT 4.5% and SNF 8.2%. First, find the EFU: EFU = 4.5 + (8.2 × 2/3) = 4.5 + 5.47 = 9.97.<br>The declared rate (for 12.5 EFU) is ₹60 per litre.<br>Price = (9.97 ÷ 12.5) × 60 = <b>₹47.86 per litre</b>.",
            },
            {
              type: "example",
              heading: "Try It Yourself",
              text: "Milk with FAT 6.0% and SNF 8.8%, declared rate ₹58 per litre: EFU = 6.0 + (8.8 × 2/3) = 6.0 + 5.87 = 11.87. Price = (11.87 ÷ 12.5) × 58 = ₹55.05 per litre.",
            },
            {
              type: "ledger",
              heading: "What Happens When SNF Improves?",
              rows: [
                { label: "Price at old SNF (FAT 5.5%, SNF 8.2%)", amount: "₹52.66" },
                { label: "Extra earned per litre from better SNF (8.9%)", amount: "+₹2.20" },
              ],
              total: { label: "New price per litre (FAT 5.5%, SNF 8.9%)", amount: "₹54.86" },
            },
            {
              type: "callout",
              style: "tip",
              heading: "Why Improving SNF Pays Off",
              text: "Improving SNF — through better feed and animal care — raises the EFU even if FAT stays exactly the same. That means more income for the farmer, without needing a different animal.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Milk has FAT 6.0% and SNF 8.8%, and the declared rate is ₹58 per litre. What is the approximate price per litre?",
              options: ["₹48", "₹55", "₹58", "₹65"],
              answer: 1,
              explain: "EFU = 6.0 + (8.8 × 2/3) = 11.87. Price = (11.87 ÷ 12.5) × 58 ≈ ₹55.",
            },
            {
              type: "truefalse",
              q: "Improving SNF, even if FAT stays the same, can increase a farmer's price per litre under the EFU method.",
              answer: true,
              explain:
                "Yes — because EFU includes SNF too, a higher SNF raises the EFU, and therefore the price, even without any change in FAT.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        isFinal: true,
        questions: [
          {
            topicId: "t-m10-l3-efu-formula",
            type: "mcq",
            q: "What is the formula for EFU?",
            options: [
              "EFU = FAT × SNF",
              "EFU = FAT + (SNF × 2/3)",
              "EFU = FAT − SNF",
              "EFU = SNF ÷ FAT",
            ],
            answer: 1,
            explain: "EFU = FAT% + (SNF% × 2/3).",
          },
          {
            topicId: "t-m10-l3-efu-price",
            type: "mcq",
            q: "Under the EFU method, what happens to a farmer's price if their milk's EFU is higher than the base EFU?",
            options: [
              "The price is lower than the declared rate",
              "The price is exactly the declared rate no matter what",
              "The price is higher than the declared rate",
              "EFU has no effect on price",
            ],
            answer: 2,
            explain:
              "When EFU is above the base (for example, above 12.5), the price paid is higher than the declared rate.",
          },
        ],
      },
    },
  ],
};
