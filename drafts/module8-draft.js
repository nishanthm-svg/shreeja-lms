// ============================================================================
// DRAFT — Module 8: Formation of MPP & Milk Routes
// English-only draft content. Written for learners with no formal education
// and no prior dairy knowledge (about a Class 7 reading level).
// Matches the schema used in data.js (see module "m1"). Translation (the
// L() wrapper) will be added later — every string below is plain English.
// ============================================================================

export const MODULE_8 = {
  id: "m8",
  number: 8,
  title: "Formation of MPP & Milk Routes",
  subtitle:
    "Learn how a new Milk Pooling Point is chosen and set up, and how milk collection routes are planned so milk reaches the chilling centre fresh and on time.",
  icon: "milk",
  available: true,
  lessons: [
    // ==================================================================
    // LESSON 1 — Where Should a New MPP Go?
    // ==================================================================
    {
      id: "m8-l1",
      title: "Where Should a New MPP Go?",
      estMinutes: 7,
      hook: [
        {
          type: "hero",
          heading: "Where Should a New MPP Go?",
          text: "Before an MPP ever opens its doors, someone has to work out exactly where it should be. In this lesson, you'll learn how that decision gets made.",
        },
      ],
      topics: [
        {
          id: "t-village-survey",
          title: "The Village Survey",
          teach: [
            {
              type: "text",
              heading: "Why Survey a Village First?",
              html: "Before setting up a new <b>MPP</b> or chilling facility in an area, the organisation needs real facts about that area — not guesses. This is done through a <b>village survey</b>.",
            },
            {
              type: "glossary",
              term: "MPP (Milk Pooling Point)",
              meaning:
                "A place where farmers bring their milk daily and get paid fairly and on time — the same MPP you help form and run as a Sahayak.",
            },
            {
              type: "text",
              heading: "How Far Does the Survey Go?",
              html: "Villages located <b>4 to 5 km</b> on either side of the main road are surveyed. Villages this close to a road are within reasonable reach for a daily milk collection route.",
            },
            {
              type: "glossary",
              term: "MAH (Milk Animal Household)",
              meaning:
                "A household in the village that keeps cows or buffaloes for milk. During a survey, the team visits each MAH and asks a set of questions, using a fixed format.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "How Many Animals",
                  text: "The total number of milk animals in each household, and in the whole village.",
                },
                {
                  label: "How Much Milk",
                  text: "How much milk is produced, how much the family keeps for itself, and how much surplus is left over to sell.",
                },
                {
                  label: "Where Milk Goes Now",
                  text: "Which traders or dairies farmers currently sell to, at what price, and how (and when) they get paid.",
                },
                {
                  label: "Village Facilities",
                  text: "Roads, electricity, water, schools — these affect how easy it will be to run a collection point in this village.",
                },
              ],
            },
            {
              type: "callout",
              style: "info",
              heading: "Did You Know?",
              text: "The survey doesn't stop at milk numbers. It also looks at the different communities living in the village and how they relate to each other — because a collection point works best when it serves the whole village fairly.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "How far from the main road are villages typically surveyed?",
              options: ["Only right next to the road", "4 to 5 km on either side", "50 km on either side", "Only villages with no road access"],
              answer: 1,
              explain:
                "Villages within about 4 to 5 km of the main road are surveyed, since they are within reasonable reach of a daily collection route.",
            },
            {
              type: "truefalse",
              q: "The village survey only counts milk animals and ignores things like roads, water, and schools.",
              answer: false,
              explain:
                "The survey also looks at village facilities like roads, electricity, water, and schools, because these affect how easy it will be to run a collection point there.",
            },
          ],
        },
        {
          id: "t-siting-criteria",
          title: "Deciding Where to Place the MPP",
          teach: [
            {
              type: "text",
              heading: "From Survey to Decision",
              html: "Once several villages have been surveyed, the numbers are compared to work out how much milk could realistically be collected from the whole area. This decides both the location and the size of the facility needed.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Enough Farmers",
                  text: "The area should have enough milk-animal households to make setting up a collection point worthwhile.",
                },
                {
                  label: "Enough Milk Volume",
                  text: "The expected surplus milk (after each household's own use) must be large enough to justify running a chilling facility.",
                },
                {
                  label: "Distance Between Villages",
                  text: "Village-to-village distance is measured so a realistic collection route can connect them to the MPP.",
                },
                {
                  label: "Easy Access",
                  text: "The site must be reachable by vehicle, so milk cans can be collected and moved out quickly, every day.",
                },
              ],
            },
            {
              type: "text",
              heading: "Choosing a Cluster BMC or an MCC",
              html: "Based on how much milk is available, the organisation decides what kind of chilling setup fits best — a smaller Cluster BMC, or a bigger MCC.",
            },
            {
              type: "glossary",
              term: "BMC (Bulk Milk Cooler)",
              meaning:
                "A machine that cools milk quickly and keeps it fresh until it is picked up. A Cluster BMC serves a group of nearby villages together.",
            },
            {
              type: "glossary",
              term: "MCC (Milk Chilling Centre)",
              meaning:
                "A bigger centre that chills milk coming in from many villages, before it is sent onward to the dairy plant.",
            },
            {
              type: "example",
              heading: "Think About It",
              text: "If government census data shows an area has thousands of milk animals but very few organised dairy buyers already working there, that is a good sign for opening a new MPP nearby.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What mainly decides whether an area gets a smaller Cluster BMC or a bigger MCC?",
              options: [
                "The colour of the milk cans used",
                "How much milk is available in that area",
                "The number of Sahayaks already trained",
                "The distance to the nearest city",
              ],
              answer: 1,
              explain:
                "The amount of milk available in the area decides whether a smaller Cluster BMC or a bigger MCC is the right fit.",
            },
            {
              type: "truefalse",
              q: "Village-to-village distance is measured mainly so a realistic milk collection route can be planned.",
              answer: true,
              explain:
                "Distance between villages helps decide how they can be linked together into one practical collection route.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-village-survey",
            type: "mcq",
            q: "What does an MAH survey mainly try to find out?",
            options: [
              "How many schools are in the village",
              "How many milk animals, how much milk, and where it is currently sold",
              "The names of every child in the household",
              "The colour of each family's roof",
            ],
            answer: 1,
            explain:
              "The MAH survey collects facts about milk animals, milk production and surplus, and where the milk is currently sold.",
          },
          {
            topicId: "t-siting-criteria",
            type: "truefalse",
            q: "The expected surplus milk in an area is one of the things considered before setting up a chilling facility there.",
            answer: true,
            explain:
              "Enough surplus milk is needed to justify the cost of running a chilling facility in that area.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 2 — Setting Up the MPP, Step by Step
    // ==================================================================
    {
      id: "m8-l2",
      title: "Setting Up the MPP, Step by Step",
      estMinutes: 7,
      hook: [
        {
          type: "hero",
          heading: "Setting Up the MPP, Step by Step",
          text: "Once a location looks promising, there is still a clear sequence of steps to follow — and a village and a Sahayak to choose — before the MPP can actually open.",
        },
      ],
      topics: [
        {
          id: "t-setup-steps",
          title: "The Steps to Set Up an MPP",
          teach: [
            {
              type: "text",
              heading: "From Data to a Working MPP",
              html: "Setting up a new MPP or chilling facility follows a clear order: gather background information, check it on the ground, decide the setup needed, find someone to build it, and then follow up until it is running.",
            },
            {
              type: "stat-grid",
              items: [
                { label: "1. Gather Data", text: "Collect secondary data — government census, survey reports, and information on any organised buyers already working in the area." },
                { label: "2. Visit and Validate", text: "Visit the villages in person to check that the data matches what is really happening on the ground." },
                { label: "3. Decide the Setup", text: "Based on milk availability, decide the chilling mode (Cluster BMC or MCC) and its capacity." },
                { label: "4. Appoint and Follow Up", text: "Identify a party to build the facility, issue a Letter of Intent with a timeline, then follow up regularly until it opens." },
              ],
            },
            {
              type: "glossary",
              term: "Secondary Data",
              meaning:
                "Information that is already collected by someone else — like a government survey — that gives you a starting point before you visit a village yourself.",
            },
            {
              type: "glossary",
              term: "LOI (Letter of Intent)",
              meaning:
                "A written letter stating that the organisation intends to work with a certain party — a person or a company — to build or run the facility, along with an agreed timeline.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Don't Skip the Follow-Up",
              text: "Issuing the LOI is not the end of the job. Someone must regularly check progress, so the chilling facility opens on time — not months late.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "What usually happens right after secondary data is gathered?",
              options: [
                "The MPP opens immediately",
                "Villages are visited in person to check the data on the ground",
                "Milk rates are announced",
                "A health camp is held",
              ],
              answer: 1,
              explain:
                "After gathering secondary data, the next step is visiting villages in person to validate that the information is accurate.",
            },
            {
              type: "truefalse",
              q: "Once the LOI is issued, no more follow-up is needed.",
              answer: false,
              explain:
                "Regular follow-up after the LOI is issued is essential, so the facility actually opens on time.",
            },
          ],
        },
        {
          id: "t-choosing-sahayak",
          title: "Choosing the Village and the Sahayak",
          teach: [
            {
              type: "text",
              heading: "The Right Village",
              html: "Before finalising anything, a village-level meeting is held with farmers to explain the plan and see how much interest there really is.",
            },
            {
              type: "text",
              heading: "Choosing the MPP's Exact Location Within the Village",
              html: "Even after a village is chosen, the exact spot for the MPP matters. It should be <b>convenient</b> for the most members, easy for the milk-collection vehicle to reach, and already <b>clean and tidy</b>.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Convenient Location",
                  text: "Easy to reach for the largest possible number of member farmers, not just a few living nearby.",
                },
                {
                  label: "Vehicle Access",
                  text: "The inward vehicle that collects milk must be able to reach and turn around easily, even early in the morning.",
                },
                {
                  label: "Clean & Tidy",
                  text: "The site should already be clean, because milk is a food product and hygiene starts with the location itself.",
                },
              ],
            },
            {
              type: "text",
              heading: "Finding the Right Sahayak",
              html: "Along with choosing the location, the organisation looks for a good <b>Sahayak candidate</b> from the village — someone locally trusted, available both morning and evening, honest, and comfortable talking with people.",
            },
            {
              type: "example",
              heading: "Structure of a Good MPP",
              text: "A well-built MPP has accessible, well-designed infrastructure; a clean and hygienic environment; and clear communication — for example, a notice board showing that day's milk rate, so every farmer can see it for themselves.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Which of these is NOT one of the location criteria mentioned for placing an MPP?",
              options: [
                "Convenient for the maximum number of members",
                "Easy access for the inward vehicle",
                "Clean and tidy locality",
                "Located exactly at the centre of the district",
              ],
              answer: 3,
              explain:
                "The criteria mentioned are convenience for members, vehicle access, and cleanliness — not distance to the district centre.",
            },
            {
              type: "truefalse",
              q: "A village-level meeting with farmers is held to explain the plan before finalising an MPP in that village.",
              answer: true,
              explain:
                "A village-level meeting helps explain the plan to farmers and gauge their interest before the MPP is finalised.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        questions: [
          {
            topicId: "t-setup-steps",
            type: "mcq",
            q: "What is an LOI?",
            options: [
              "A type of milk can",
              "A written letter stating intent to work with a party, with a timeline",
              "A government census report",
              "A type of chilling machine",
            ],
            answer: 1,
            explain:
              "An LOI (Letter of Intent) is a written statement of intent to work with a chosen party, along with an agreed timeline.",
          },
          {
            topicId: "t-choosing-sahayak",
            type: "mcq",
            q: "Besides being locally trusted, what else matters when choosing a Sahayak candidate?",
            options: [
              "Being available both morning and evening, and comfortable with people",
              "Owning the most animals in the village",
              "Being related to the Management Committee",
              "Living farthest from the MPP site",
            ],
            answer: 0,
            explain:
              "A good Sahayak candidate should be locally trusted, available at both collection times, honest, and good with people.",
          },
        ],
      },
    },
    // ==================================================================
    // LESSON 3 — Planning Milk Collection Routes
    // ==================================================================
    {
      id: "m8-l3",
      title: "Planning Milk Collection Routes",
      estMinutes: 7,
      hook: [
        {
          type: "hero",
          heading: "Planning Milk Collection Routes",
          text: "Once MPPs are set up, milk still has to travel from each village to the chilling centre — fresh, and on time. That is route planning.",
        },
      ],
      topics: [
        {
          id: "t-route-goals",
          title: "What Good Route Planning Achieves",
          teach: [
            {
              type: "text",
              heading: "Four Things a Good Route Must Do",
              html: "A milk collection route is not just about connecting villages by road. A good route is planned to achieve four things together.",
            },
            {
              type: "stat-grid",
              items: [
                {
                  label: "Maintain Milk Quality",
                  text: "The shorter and better-planned the journey, the fresher the milk stays by the time it reaches the chilling centre.",
                },
                {
                  label: "Timely Collection",
                  text: "Milk must be picked up at a fixed, predictable time every day, so farmers know exactly when to be ready.",
                },
                {
                  label: "Minimise Transport Cost",
                  text: "The route should avoid unnecessary distance or repeated trips, saving fuel and vehicle cost.",
                },
                {
                  label: "Optimal Time at MPP",
                  text: "The vehicle should not sit too long at any one MPP, so it can complete the whole route without milk waiting around and losing freshness.",
                },
              ],
            },
            {
              type: "callout",
              style: "warning",
              heading: "Why This Matters",
              text: "Milk starts losing quality soon after it leaves the animal, especially in the heat. A poorly planned route — one that is too long or wastes time — can spoil milk before it even reaches the chilling centre.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "Why does a route need timely, predictable collection?",
              options: [
                "So the vehicle can visit more villages than planned",
                "So farmers know exactly when to be ready with their milk",
                "So drivers can take longer breaks",
                "It does not really matter",
              ],
              answer: 1,
              explain:
                "A fixed, predictable collection time lets farmers plan around it and have their milk ready when the vehicle arrives.",
            },
            {
              type: "truefalse",
              q: "A vehicle spending too long at one MPP can cause milk collected earlier on the route to lose freshness.",
              answer: true,
              explain:
                "Time adds up along the whole route. Delays at any one stop can affect how fresh the milk collected earlier still is by the end.",
            },
          ],
        },
        {
          id: "t-route-practice",
          title: "Planning a Route in Practice",
          teach: [
            {
              type: "text",
              heading: "Using the Village Survey",
              html: "Once village-to-village distances are collected during the survey, the route can actually be planned. A road map of the whole area, showing villages and the BMC/MCC positions, is prepared so the sequence of stops is clear.",
            },
            {
              type: "example",
              heading: "A Simple Route Example",
              text: "Villages A, B and C sit on the same road, about 3 km apart from each other. Village D is 6 km off the main road, with far fewer farmers. Instead of driving out to D first and doubling back, the route runs A, then B, then C in a straight line — and D is only added if there is enough milk there to be worth the extra time, or it gets a separate, smaller route.",
            },
            {
              type: "text",
              heading: "Balancing Speed and Coverage",
              html: "Whoever plans the route has to balance two things: covering as many villages as possible, without making the total trip so long that milk collected first spoils before the vehicle even reaches the chilling centre.",
            },
            {
              type: "callout",
              style: "tip",
              heading: "Review Routes Regularly",
              text: "As farmers join or leave, or milk volume in a village grows, routes should be reviewed and adjusted. A route planned once does not have to stay fixed forever.",
            },
          ],
          check: [
            {
              type: "mcq",
              q: "In the route example, why is village D only added if it has enough milk, or given a separate route?",
              options: [
                "Because D has no farmers at all",
                "Because visiting D first would mean doubling back, adding time to the whole route",
                "Because D does not want an MPP",
                "Because D is closer than A, B and C",
              ],
              answer: 1,
              explain:
                "Village D is off the main road, so reaching it means extra distance and doubling back — worth doing only if there is enough milk to justify the added time.",
            },
            {
              type: "truefalse",
              q: "Once a milk route is planned, it should never be changed again.",
              answer: false,
              explain:
                "Routes should be reviewed and adjusted over time, as the number of farmers or the amount of milk in a village changes.",
            },
          ],
        },
      ],
      finalQuiz: {
        passScore: 70,
        isFinal: true,
        questions: [
          {
            topicId: "t-route-goals",
            type: "mcq",
            q: "Which of these is one of the four goals of good route planning?",
            options: [
              "Maximising transport cost",
              "Minimising transportation cost",
              "Making the vehicle wait as long as possible at each stop",
              "Avoiding timely collection",
            ],
            answer: 1,
            explain:
              "Minimising transportation cost is one of the four goals, along with milk quality, timely collection, and optimal time at the MPP.",
          },
          {
            topicId: "t-route-practice",
            type: "truefalse",
            q: "A road map showing villages and BMC/MCC positions helps make the sequence of route stops clear.",
            answer: true,
            explain:
              "Preparing a road map of the area, with villages and chilling-point positions marked, helps plan a clear and practical route.",
          },
        ],
      },
    },
  ],
};
