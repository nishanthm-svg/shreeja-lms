# Shreeja Learning Academy (LMS)

A self-paced, instructor-free learning management system for Shreeja Sahayaks and field staff. Built as a dependency-free static site (plain HTML/CSS/JS, no build step) so it can be hosted anywhere or opened straight from a static file server.

## Module 1: Introduction to Dairy

Written for learners with **no formal education and no prior dairy knowledge** — plain, short sentences (about a Class 7 reading level), every technical term explained in a glossary callout, and real numbers instead of abstract jargon.

Each lesson is broken into small **topics**, walked through one at a time with Previous/Next navigation — examples, comparison charts, "guess before you look" polls, tap-to-reveal glossary boxes, and light animation throughout. Nothing is graded during teaching.

Once every topic in the lesson has been seen, a single **Lesson Quiz** covers everything together, all at once. Any question missed there routes the learner back into a focused review of just that one topic (the teaching content again, then a fresh try on it) — never the whole lesson — before the lesson is marked complete and the next one unlocks.

1. **What is Dairy, and Why Does It Matter?** — what milk gives your body, dairy as a livelihood (8 crore Indian families)
2. **The World's Biggest Milk Bowl** — which countries make the most milk, and why India leads (FAOSTAT 2025)
3. **India's Milk Map** — state-by-state milk production (BAHS 2025)
4. **The White Revolution — India's Dairy Story** — the Amul story (farmers cheated by a trader → forming their own cooperative), then Operation Flood and NDDB
5. **NDDB and How a Cooperative Works** — Dr. Kurien, and the Village Society → District Union → State Federation structure
6. **Real Story: Ramesh and Sita's Dairy Journey** — a full real-numbers case study (a couple who leave the city, start a 1-cow dairy business with real costs/income, and weigh expanding to 4 cows) — this is the module's final assessment

Modules 2–12 are listed on the dashboard as "Coming soon" placeholders (titles pulled from the source training deck), ready to be filled in the same way.

## How it works

- **No login, no backend.** Progress (which lessons are completed) is saved automatically in the learner's browser via `localStorage`.
- **Sequential unlock.** Lesson 1 of each module is always open; each next lesson unlocks only after the previous lesson is fully completed (quiz passed, any wrong topics reviewed).
- **Teach fully, then test once.** All topics are taught first (with examples, polls and animation); the quiz happens in one pass at the end, not interleaved.
- **Remedial, not punitive.** A wrong quiz answer never just says "try again" — it shows the exact topic's teaching content again first, then a fresh question on just that topic.
- **Interactive by default.** Glossary boxes are tap-to-reveal ("👆 Tap to see what this means"), some topics include an ungraded "🤔 Guess Before You Look" poll before a chart reveals the real answer, and every content block animates in.
- **Content model.** All lesson content lives in [`data.js`](data.js) as plain data: each lesson has a `hook` (opening blocks), a `topics` array (each with `teach` blocks + `check` questions used for remedial retries), and a `finalQuiz` (questions tagged with `topicId` for remedial routing). Add a new module by adding an entry to the `MODULES` array — no other code changes needed.
- **Rendering.** [`app.js`](app.js) is a small hash-router + renderer (`#/`, `#/module/:id`, `#/module/:id/lesson/:id`, `#/module/:id/complete`) plus a topic-by-topic lesson flow controller (`runLessonFlow`) that manages topic navigation → single end quiz → remedial-review state. [`progress.js`](progress.js) handles the localStorage-backed unlock logic. [`styles.css`](styles.css) has all styling and animation keyframes.
- **Block types available for content:** `hero`, `text`, `callout`, `example`, `glossary` (tap-to-reveal new-word explainer), `ledger` (simple rupee income/expense tables), `stat-grid`, `barchart`, `timeline`, `poll` (ungraded interactive predict-then-reveal question).

## Running locally

No install needed — it's static files. Serve the folder with any static file server, e.g.:

```bash
py -m http.server 5301
```

Then open `http://localhost:5301`. (Opening `index.html` directly via `file://` will NOT work — ES modules require an HTTP server.)

## Adding the next module

1. Extract the source PPTX content for the module (title, key stats, examples).
2. Add a new object to `MODULES` in `data.js` with `available: true`, a `lessons` array (each with `blocks` and a `quiz`), following the Module 1 pattern.
3. Reuse the existing block types: `hero`, `text`, `callout`, `example`, `stat-grid`, `barchart`, `timeline`, `poll`. Add a new block type in `app.js` (`renderBlockHtml`) only if none of these fit.

## Deployment

Any static hosting works (Render static site, Netlify, Vercel, GitHub Pages, or an internal file server) — just publish this folder as-is.
