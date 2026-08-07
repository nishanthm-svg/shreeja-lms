// ============================================================================
// Shreeja LMS — Module 11 DRAFT (English only, no translation)
// "CDA — Its Constituents and Calculation"
//
// This is a draft file only. It is written to match the exact schema used
// in data.js (see the "m1" module there), but with plain English strings
// instead of L(...) translation wrappers. Translations will be added later.
//
// Source material used:
//   C:\temp_lms_extract\extracted\11-cda-constituents-calculation.txt
//   C:\temp_lms_extract\extracted\16-cda-calculation-case.txt
//   C:\temp_lms_extract\extracted\17-cda-calculation-solution.txt
//
// Note on the acronym "CDA": the source slides never spell the letters out
// directly. But the deck's own structure — "Composite Control (MPP Level)",
// "Dispatch Control (Sahayak Stage)", and "Actual Receipt & Transit Control
// (MCC/BMC)" — maps exactly onto three checkpoints. This draft expands CDA
// as "Composite – Dispatch – Actual" based on that structure. Please verify
// this expansion against any internal glossary before publishing.
// ============================================================================

export const module11 = {
  id: "m11",
  number: 11,
  title: "CDA — Its Constituents and Calculation",
  subtitle:
    "Learn what happens to milk quantity as it travels from farmer to dairy — and how CDA finds and fixes any milk that goes missing along the way.",
  icon: "milk",
  available: true,
  lessons: [
    // ==================================================================
    // LESSON 1
    // ==================================================================
    {
      id: "m11-l1",
      title: "What Is CDA, and Why Does It Exist?",
      estMinutes: 8,
      hook: [
        {
          type: "hero",
          heading: "What Is CDA?",
          text: "Every day, milk travels from a farmer's bucket to the dairy plant. Sometimes, a little milk goes missing on the way. In this lesson, you'll learn why that happens — and how CDA helps find and fix it.",
        },
      ],
      topics: [
        {
          id: "t-milk-goes-missing",
          title: "The Problem: Milk That Goes Missing",
          teach: [
            {
              type: "text",
              heading: "A Simple Question",
              html: "A farmer pours 10 litres of milk into a can at the village Milk Pooling Point, or MPP. That milk then travels — by can, by van, sometimes by tanker — until it reaches the dairy plant. Does the plant always receive exactly 10 litres? Not always. Sometimes a little less arrives. This lesson is about why that happens, and what the dairy does about it.",
            },
            {
              type: "glossary",
              term: "MPP (Milk Pooling Point)",
              meaning:
                "The place in the village where farmers bring their milk every day. Here, the milk is weighed, tested for quality, and written down before it is sent onward.",
            },
            {
              type: "text",
              heading: "Five Reasons Milk Quantity Can Change",
              html: "Milk quantity recorded at the village can end up different from milk quantity received at the dairy. There are five common reasons for this. Let's look at each one.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Measurement Mistakes",
                  text: "A weighing scale that is not set correctly, or a person who writes down the wrong number by mistake, can make the recorded quantity wrong — even if no milk was actually lost.",
                },
                {
                  label: "Spillage on the Way",
                  text: "Milk can spill out of a can or tanker while it is being poured, loaded, or driven over a bumpy road. This is called a handling loss.",
                },
                {
                  label: "Milk Taken Without Permission",
                  text: "Sometimes, a small amount of milk is deliberately removed during handling or transport. This is called pilferage, and it is not allowed.",
                },
                {
                  label: "Changes in Fat and SNF",
                  text: "If milk is tested incorrectly, or if water or another substance is mixed into it, the Fat and SNF readings can change — and this affects what the milk is worth, even if the volume looks the same.",
                },
              ],
            },
            {
              type: "callout",
              style: "warning",
              heading: "A Fifth Reason: Gaps on Paper",
              text: "Sometimes the problem is not the milk at all — it's the paperwork. If the dispatch quantity written down is more than the quantity that was actually tested (the composite quantity), or if entries are delayed or use the wrong units, the numbers will not match — even if every drop of milk arrived safely.",
            },
            {
              type: "example",
              heading: "Think About It",
              text: "Imagine a Sahayak collects milk in the morning and pours it into a can to send to the chilling centre. If the can's lid is loose, a little milk can spill out on the bumpy village road. Nobody stole it, nobody made a paperwork mistake — but the chilling centre will still receive less milk than was recorded at the village. This is exactly the kind of gap that CDA is designed to catch.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Which of these is an example of a handling loss?",
              options: [
                "Milk spilling out of a can while it is being loaded",
                "A farmer selling extra milk to a neighbour",
                "A cow giving less milk in summer",
                "A Sahayak's phone running out of battery",
              ],
              answer: 0,
              explain:
                "Milk spilling during loading, transfer or transport is called a handling loss — one of the common reasons milk quantity changes between the village and the dairy.",
            },
            {
              type: "truefalse",
              q: "Milk quantity can only go missing if someone steals it.",
              answer: false,
              explain:
                "Milk quantity can change for many reasons — spillage, measurement mistakes, testing errors and paperwork gaps — not only theft.",
            },
          ],
        },
        {
          id: "t-what-cda-does",
          title: "What CDA Does About It",
          teach: [
            {
              type: "text",
              heading: "Meet CDA",
              html: "CDA stands for <b>Composite, Dispatch and Actual</b> — the names of three points where milk quantity is written down as it moves from the village to the dairy. By comparing the numbers at these three points, the dairy can find out exactly where — and how much — milk went missing.",
            },
            {
              type: "glossary",
              term: "CDA (Composite – Dispatch – Actual)",
              meaning:
                "A system that compares three numbers: how much milk was recorded at the MPP (Composite), how much was sent out (Dispatch), and how much actually arrived at the chilling centre (Actual). Comparing these numbers helps the dairy find and recover any shortfall.",
            },
            {
              type: "text",
              heading: "Why CDA Matters",
              html: "CDA is not about blaming anyone. It exists so that farmers are paid correctly for the milk they actually gave, so the union or company can find exactly where losses are happening — which village, which route, which Sahayak — and fix the problem quickly, and so everyone handling milk is encouraged to be careful and honest, because their numbers are being checked.",
            },
            {
              type: "callout",
              style: "info",
              heading: "Checked at Many Levels",
              text: "CDA is not calculated only once for the whole dairy. It can be worked out MPP-wise, route-wise, officer-wise, and BMC or MCC-wise. This helps managers compare performance across units, spot the weakest links, and track whether things are improving over time.",
            },
            {
              type: "example",
              heading: "Why This Protects Everyone",
              text: "A Sahayak whose route shows very little missing milk is clearly handling milk carefully — checking cans, weighing correctly, and dispatching on time. A low CDA loss is proof of good work, and it protects both the Sahayak's reputation and the farmers' income.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What three points does CDA compare to find missing milk?",
              options: [
                "Composite, Dispatch and Actual quantities",
                "Morning, afternoon and evening prices",
                "Fat, SNF and water content only",
                "Cow, buffalo and goat milk",
              ],
              answer: 0,
              explain:
                "CDA compares the Composite (recorded at the MPP), Dispatch (sent out) and Actual (received at the chilling centre) quantities to find any gap.",
            },
            {
              type: "truefalse",
              q: "CDA can be calculated separately for each route or each Sahayak, not just for the whole dairy.",
              answer: true,
              explain:
                "CDA can be worked out at many levels — MPP-wise, route-wise, officer-wise and BMC/MCC-wise — to find exactly where losses happen.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-milk-goes-missing",
            type: "mcq",
            q: "Which of these can cause milk quantity to change between the MPP and the dairy?",
            options: [
              "A wrongly calibrated weighing scale",
              "The name written on the milk can",
              "The colour of the Sahayak's uniform",
              "The distance from the MPP to the farmer's house",
            ],
            answer: 0,
            explain:
              "A wrongly calibrated weighing scale can record the wrong quantity, even though no milk was actually lost.",
          },
          {
            topicId: "t-what-cda-does",
            type: "mcq",
            q: "What is the main purpose of CDA?",
            options: [
              "To find and recover milk quantity that goes missing between the village and the dairy",
              "To decide which cows give the most milk",
              "To fix the price of cattle feed",
              "To choose which Sahayak gets promoted",
            ],
            answer: 0,
            explain:
              "CDA compares recorded quantities at the Composite, Dispatch and Actual stages so that any shortfall can be found and recovered.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 2
    // ==================================================================
    {
      id: "m11-l2",
      title: "The Three Checkpoints of CDA",
      estMinutes: 9,
      hook: [
        {
          type: "hero",
          heading: "The Three Checkpoints",
          text: "CDA works by checking milk quantity at three different points in its journey. Let's walk through each checkpoint and see what is checked there.",
        },
      ],
      topics: [
        {
          id: "t-checkpoint-mpp-dispatch",
          title: "Checkpoint 1 and 2: At the MPP and On the Road",
          teach: [
            {
              type: "text",
              heading: "Checkpoint 1: Composite Control (At the MPP)",
              html: "The first checkpoint happens right at the village MPP. This is where the <b>Composite</b> quantity is set — the official recorded amount of milk collected that day.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Correct Weighing",
                  text: "The weighing scale must be checked and calibrated so every pour is measured correctly.",
                },
                {
                  label: "Careful Handling",
                  text: "Collection must be supervised so milk is not spilled, leaked, or mixed up between farmers.",
                },
                {
                  label: "Proper Testing",
                  text: "Milk must be sampled and tested correctly for Fat and SNF, using the right method.",
                },
                {
                  label: "Checking for Mixing",
                  text: "Random checks — like using a lactometer — help catch water or other substances mixed into the milk.",
                },
              ],
            },
            {
              type: "text",
              heading: "Checkpoint 2: Dispatch Control (At the Sahayak Stage)",
              html: "The second checkpoint happens when the Sahayak sends the milk onward — from the MPP toward the chilling centre. This is the <b>Dispatch</b> stage.",
            },
            {
              type: "glossary",
              term: "Dispatch",
              meaning:
                "The act of sending milk out from the MPP toward the chilling centre or dairy. The dispatch quantity is the amount recorded as being sent.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Quantity Matches",
                  text: "The quantity being dispatched must match what was recorded at the composite stage — no more, no less.",
                },
                {
                  label: "Careful Loading",
                  text: "Pouring and loading must be supervised to prevent spillage or leakage.",
                },
                {
                  label: "Cans and Vehicle Ready",
                  text: "Cans must be clean and leak-proof, and the vehicle must be ready before milk is loaded.",
                },
                {
                  label: "Sealed and Documented",
                  text: "Cans or tankers must be properly sealed, and dispatch slips filled in correctly, so nothing can be added or removed unnoticed.",
                },
              ],
            },
            {
              type: "callout",
              style: "tip",
              heading: "Why Sealing Matters",
              text: "A sealed can or tanker is like a locked box — if the seal is broken when it reaches the chilling centre, everyone knows something may have happened on the way. This is one of the simplest ways to protect milk quantity during transport.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "At the MPP (Composite stage), what helps make sure milk quantity is recorded correctly?",
              options: [
                "A correctly calibrated weighing scale",
                "A louder radio at the MPP",
                "Selling milk at a discount",
                "Painting the MPP a bright colour",
              ],
              answer: 0,
              explain:
                "A correctly calibrated weighing scale, checked regularly, ensures every pour of milk is measured accurately.",
            },
            {
              type: "truefalse",
              q: "Sealing cans and tankers before dispatch has nothing to do with protecting milk quantity.",
              answer: false,
              explain:
                "Sealing helps prevent milk from being added or removed unnoticed during transport, protecting the recorded quantity.",
            },
          ],
        },
        {
          id: "t-checkpoint-actual-receipt",
          title: "Checkpoint 3: Arrival at the Chilling Centre",
          teach: [
            {
              type: "text",
              heading: "Checkpoint 3: Actual Receipt and Transit Control",
              html: "The third and final checkpoint happens when the milk actually arrives at the chilling centre — the MCC or BMC. This is where the <b>Actual</b> quantity is recorded.",
            },
            {
              type: "glossary",
              term: "MCC / BMC",
              meaning:
                "MCC (Milk Chilling Centre) and BMC (Bulk Milk Cooler) are places where milk is cooled quickly after it arrives, to keep it fresh before it goes on to the dairy plant.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Re-checking Quantity",
                  text: "The actual quantity received is compared with the dispatch quantity, using a properly calibrated scale.",
                },
                {
                  label: "Checking Quality on Arrival",
                  text: "Fat and SNF are tested again, and the milk is checked for sourness, curdling, smell or contamination before it is accepted.",
                },
                {
                  label: "Checking Seals",
                  text: "Seals on cans or tankers are checked for any sign of tampering, which could mean milk was removed on the way.",
                },
                {
                  label: "Spotting Transit Losses",
                  text: "Any leakage, spillage or delay during the journey is noted, since it can affect both quantity and quality.",
                },
              ],
            },
            {
              type: "text",
              heading: "Putting the Three Checkpoints Together",
              html: "Now you know all three checkpoints: <b>Composite</b> (at the MPP), <b>Dispatch</b> (when the Sahayak sends it out), and <b>Actual</b> (when it arrives at the chilling centre). CDA compares these three numbers to find exactly where any milk went missing.",
            },
            {
              type: "callout",
              style: "info",
              heading: "The CDA Loss Formula",
              text: "The basic idea is simple: Net Loss = Actual Quantity minus Composite Quantity. If the actual quantity received is lower, that difference is the loss. In the next lesson, you will learn how to turn this into a full worked calculation, including how the value of that loss is measured.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What is recorded at the third CDA checkpoint?",
              options: [
                "The Actual quantity of milk received at the chilling centre",
                "The name of the cow that gave the most milk",
                "The number of MPPs in the district",
                "The price of diesel that week",
              ],
              answer: 0,
              explain:
                "The third checkpoint records the Actual quantity received at the MCC or BMC, so it can be compared against Composite and Dispatch.",
            },
            {
              type: "mcq",
              q: "What is checked when milk arrives at the chilling centre?",
              options: [
                "Quantity, Fat and SNF, seal condition, and any signs of transit loss",
                "Only the colour of the milk can",
                "Only how fast the driver was going",
                "Only the Sahayak's attendance",
              ],
              answer: 0,
              explain:
                "On arrival, the chilling centre checks quantity, quality (Fat and SNF), seal integrity, and any leakage, spillage or delay during transit.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-checkpoint-mpp-dispatch",
            type: "mcq",
            q: "Why must cans or tankers be sealed before dispatch?",
            options: [
              "So nothing can be added or removed unnoticed during transport",
              "So the milk looks nicer",
              "So the vehicle uses less fuel",
              "So the Sahayak can finish work early",
            ],
            answer: 0,
            explain:
              "A proper seal protects the recorded quantity — if it is broken on arrival, it is a sign something may have happened during transport.",
          },
          {
            topicId: "t-checkpoint-actual-receipt",
            type: "mcq",
            q: "At the Actual Receipt checkpoint, what does the chilling centre compare the received quantity against?",
            options: [
              "The Dispatch quantity that was sent out",
              "The price of milk last month",
              "The number of farmers in the village",
              "The weather forecast",
            ],
            answer: 0,
            explain:
              "The chilling centre checks the Actual quantity received against the Dispatch quantity to spot any gap during transit.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 3 — WORKED CALCULATION (module capstone)
    // ==================================================================
    {
      id: "m11-l3",
      title: "Let's Calculate CDA — A Worked Example",
      estMinutes: 12,
      hook: [
        {
          type: "hero",
          heading: "Let's Calculate CDA",
          text: "Now that you know why CDA exists and what its three checkpoints are, let's work through a real calculation step by step — just like a dairy accountant would.",
        },
      ],
      topics: [
        {
          id: "t-value-the-milk",
          title: "Step 1: Finding the Real Value of the Milk",
          teach: [
            {
              type: "text",
              heading: "Meet the Numbers",
              html: "At a BMC, the composite record for one day shows: Composite Amount = ₹44,00,000 and Composite Quantity = 1,00,000 litres. The milk tested at Fat = 4.2% and SNF = 8.6%. Let's use these numbers to find the true value of this milk, step by step.",
            },
            {
              type: "glossary",
              term: "Average Rate",
              meaning:
                "The average price paid per litre, found by dividing the total money (composite amount) by the total quantity of milk.",
            },
            {
              type: "example",
              heading: "Step 1: Calculate the Average Rate",
              text: "Average Rate = Composite Amount ÷ Composite Quantity = ₹44,00,000 ÷ 1,00,000 litres = ₹44 per litre. This tells us what was paid, on average, for every litre — but it does not yet tell us if that price matches the milk's real quality.",
            },
            {
              type: "glossary",
              term: "EFU (Equivalent Fat Unit)",
              meaning:
                "A single number that combines Fat % and SNF % into one score, so milk of different quality can be compared fairly. EFU = Fat % + (2 ÷ 3 × SNF %).",
            },
            {
              type: "example",
              heading: "Step 2: Calculate the EFU",
              text: "EFU = Fat + (2/3 × SNF) = 4.2 + (2/3 × 8.6) = 4.2 + 5.73 = 9.93. This milk's EFU is 9.93 — a little below the standard reference EFU of 12.5, which comes from standard buffalo milk (6.5% Fat, 9% SNF) used as the benchmark for comparison.",
            },
            {
              type: "glossary",
              term: "Standard Landing Rate",
              meaning:
                "The fair per-litre value of milk after adjusting the Average Rate for its actual quality (EFU), compared against the standard reference EFU of 12.5.",
            },
            {
              type: "example",
              heading: "Step 3: Calculate the Standard Landing Rate",
              text: "Standard Landing Rate = Average Rate × (12.5 ÷ EFU) = ₹44 × (12.5 ÷ 9.93) = ₹44 × 1.259 = ₹55.39 per litre. Because this milk's EFU (9.93) is lower than the standard (12.5), the calculation adjusts the rate upward, to show what one litre of this exact quality is really worth.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "In this example, what is the Average Rate?",
              options: ["₹44 per litre", "₹100 per litre", "₹4,400 per litre", "₹0.44 per litre"],
              answer: 0,
              explain: "Average Rate = ₹44,00,000 ÷ 1,00,000 litres = ₹44 per litre.",
            },
            {
              type: "mcq",
              q: "What does EFU combine into a single number?",
              options: ["Fat % and SNF %", "Distance and time", "Price and season", "Litres and rupees"],
              answer: 0,
              explain:
                "EFU (Equivalent Fat Unit) combines Fat % and SNF % into one quality score, so milk of different quality can be compared fairly.",
            },
          ],
        },
        {
          id: "t-pro-rata-and-loss",
          title: "Step 2: Pro-Rata Impact and the CDA Loss",
          teach: [
            {
              type: "text",
              heading: "Comparing Declared Rate with Landing Rate",
              html: "The union had already declared a rate of ₹52 per litre for this milk — this is called the <b>Declared Rate</b>. We just calculated the Standard Landing Rate as ₹55.39. Let's compare them.",
            },
            {
              type: "glossary",
              term: "Declared Rate",
              meaning:
                "The rate per litre that the union or company announces it will pay, before adjusting for the exact quality of milk received that day.",
            },
            {
              type: "glossary",
              term: "Pro-Rata Impact",
              meaning:
                "The difference between the Declared Rate and the Standard Landing Rate. It shows whether the declared price was enough to cover the real value of the milk received.",
            },
            {
              type: "example",
              heading: "Step 4: Calculate the Pro-Rata Impact",
              text: "Pro-Rata Impact = Declared Rate − Standard Landing Rate = ₹52 − ₹55.39 = −₹3.39. Because this number is negative, it is Unfavourable — the milk received was actually worth more than the declared rate paid for it, based on its real Fat and SNF quality.",
            },
            {
              type: "ledger",
              heading: "Today's Quality-Value Summary",
              rows: [
                { label: "Average Rate (per litre)", amount: "₹44.00" },
                { label: "Standard Landing Rate (per litre)", amount: "₹55.39" },
                { label: "Declared Rate (per litre)", amount: "₹52.00" },
              ],
              total: { label: "Pro-Rata Impact (Declared − Landing)", amount: "−₹3.39 (Unfavourable)" },
            },
            {
              type: "text",
              heading: "Now Let's Find the CDA Quantity Loss",
              html: "Pro-Rata Impact tells us about VALUE. But CDA is also about QUANTITY — how much milk itself went missing. Suppose the chilling centre's records for the same day show: Composite Quantity (recorded at the MPP) = 1,00,000 litres, but Actual Quantity (received at the BMC) = 99,400 litres.",
            },
            {
              type: "example",
              heading: "Step 5: Calculate the Net Loss (Quantity)",
              text: "Net Loss (Quantity) = Actual Quantity − Composite Quantity = 99,400 − 1,00,000 = −600 litres. So, 600 litres of milk went missing somewhere between the MPP and the BMC.",
            },
            {
              type: "example",
              heading: "Step 6: Calculate the CDA Loss %",
              text: "First, find the value of the loss: Loss Value = 600 litres × ₹55.39 (Standard Landing Rate) = ₹33,234. Next, find the value of the full composite milk: Composite Milk Value = 1,00,000 litres × ₹55.39 = ₹55,39,000. Finally: CDA Loss % = (Loss Value ÷ Composite Milk Value) × 100 = (₹33,234 ÷ ₹55,39,000) × 100 = 0.6%.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "A Handy Shortcut",
              text: "Notice that the CDA Loss % (0.6%) came out exactly the same as 600 litres out of 1,00,000 litres (0.6%). That's because both the loss and the composite milk were valued at the same rate, so the rate cancels out. This shortcut works whenever quality hasn't changed between dispatch and receipt.",
            },
            {
              type: "callout",
              style: "info",
              heading: "Is 0.6% a Lot?",
              text: "A CDA Loss of 0.6% may look small, but across a large dairy handling lakhs of litres every day, even a small percentage adds up to a big amount of money. This is exactly why the dairy tracks CDA Loss % for every route, MPP and officer — small, steady losses are just as important to catch as big, sudden ones.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "In this example, is the Pro-Rata Impact favourable or unfavourable?",
              options: [
                "Unfavourable, because the milk was worth more than the declared rate paid",
                "Favourable, because the union saved money",
                "Neither, because Pro-Rata does not apply here",
                "Unfavourable, because too much milk arrived",
              ],
              answer: 0,
              explain:
                "Declared Rate (₹52) was less than the Standard Landing Rate (₹55.39), giving a Pro-Rata Impact of −₹3.39 — Unfavourable.",
            },
            {
              type: "mcq",
              q: "How is CDA Loss % calculated?",
              options: [
                "(Loss Value ÷ Composite Milk Value) × 100",
                "(Composite Quantity ÷ Actual Quantity) × 100",
                "(Declared Rate ÷ Average Rate) × 100",
                "(Actual Quantity × Declared Rate)",
              ],
              answer: 0,
              explain:
                "CDA Loss % = (Loss Value ÷ Composite Milk Value) × 100 — the value of the missing milk as a percentage of the total composite milk value.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        isFinal: true,
        questions: [
          {
            topicId: "t-value-the-milk",
            type: "mcq",
            q: "What is the Standard Landing Rate in this lesson's example?",
            options: ["₹44.00", "₹52.00", "₹55.39", "₹9.93"],
            answer: 2,
            explain: "Standard Landing Rate = ₹44 × (12.5 ÷ 9.93) = ₹55.39 per litre.",
          },
          {
            topicId: "t-value-the-milk",
            type: "mcq",
            q: "EFU = Fat % + (2/3 × SNF %). If Fat = 4.2% and SNF = 8.6%, what is the EFU?",
            options: ["9.93", "12.5", "4.2", "8.6"],
            answer: 0,
            explain: "EFU = 4.2 + (2/3 × 8.6) = 4.2 + 5.73 = 9.93.",
          },
          {
            topicId: "t-pro-rata-and-loss",
            type: "mcq",
            q: "In this lesson's example, how many litres of milk went missing between the MPP and the BMC?",
            options: ["600 litres", "1,00,000 litres", "99,400 litres", "6,000 litres"],
            answer: 0,
            explain: "Net Loss = 99,400 − 1,00,000 = −600 litres, so 600 litres went missing.",
          },
          {
            topicId: "t-pro-rata-and-loss",
            type: "mcq",
            q: "What was the CDA Loss % in this lesson's example?",
            options: ["0.6%", "6%", "60%", "0.06%"],
            answer: 0,
            explain: "CDA Loss % = (₹33,234 ÷ ₹55,39,000) × 100 = 0.6%.",
          },
        ],
      },
    },
  ],
};

export default module11;
