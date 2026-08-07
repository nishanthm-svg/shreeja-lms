# Shreeja Learning Academy (LMS)

A self-paced, instructor-free learning management system for Shreeja Sahayaks and field staff. Built as a dependency-free static site (plain HTML/CSS/JS, no build step) so it can be hosted anywhere or opened straight from a static file server.

## Module 1: Introduction to Dairy

The first module is fully built out with 5 lessons, each ending in a quiz that must be passed (70%+) to unlock the next lesson:

1. **Welcome to the World of Dairy** — quick poll + why dairy matters
2. **The Global Milk Scenario** — interactive world milk production chart (FAOSTAT 2025)
3. **India's Milk Scenario — State by State** — interactive state-wise chart (BAHS 2025)
4. **India's Journey — From Deficit to Surplus** — interactive 1946–2021 timeline (Amul, NDDB, Operation Flood)
5. **NDDB — Driving India's Dairy Cooperative Movement** — final assessment

Modules 2–12 are listed on the dashboard as "Coming soon" placeholders (titles pulled from the source training deck), ready to be filled in the same way.

## How it works

- **No login, no backend.** Progress (which lessons/quizzes are completed) is saved automatically in the learner's browser via `localStorage`.
- **Sequential unlock.** Lesson 1 of each module is always open; each next lesson unlocks only after the previous lesson's quiz is passed.
- **Content model.** All lesson content and quizzes live in [`data.js`](data.js) as plain data — add a new module by adding an entry to the `MODULES` array, no other code changes needed.
- **Rendering.** [`app.js`](app.js) is a small hash-router + renderer (`#/`, `#/module/:id`, `#/module/:id/lesson/:id`, `#/module/:id/complete`). [`progress.js`](progress.js) handles the localStorage-backed unlock/scoring logic. [`styles.css`](styles.css) has all styling.

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
