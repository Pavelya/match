# Design Refresh Roadmap

**Written:** 2 October 2026 · **Covers:** the design refresh proposed in
[`docs/design/design-audit-report-2026-10.md`](../design/design-audit-report-2026-10.md)

**How to use this.** [Start here](#start-here) gives the order. [The full list](#the-full-list) is
the checklist. [Standing context](#standing-context) holds the rules every session must read first.
Everything after that is one section per task, written so that a **fresh AI session with no memory
of this audit** can pick it up, finish it and prove it in one sitting.

Every task has a **Goal** (one sentence), an **End result** (what exists when it is done), **Tests**
(automated checks, visual comparison and manual checks), and a size. One task, one branch, one pull
request, merged before the next starts.

---

## Start here

**Twenty-five sessions.** The first seven build the foundations that make the rest cheap; after
that each session refreshes one area of the product. Sessions marked "any" can run whenever.

| # | Task | Session | Size | Depends on | Why here |
| --- | --- | --- | --- | --- | --- |
| 1 | DS-0 | Visual and accessibility harness, `/design` style guide route | medium | — | Every later PR needs before/after screenshots and an axe report |
| any | FIX-1 | TOK/EE bonus points match the official IB matrix | small | — | A correctness bug that changes students' totals; fix before DS-14 rebuilds step 3 |
| 2 | DS-1 | Tokens and theme in `app/globals.css` | medium | DS-0 | Everything else reads the tokens |
| 3 | DS-2 | Typography and the logo | medium | DS-1 | Fonts and type scale change every page |
| 4 | DS-3 | Primitives: actions, badges, feedback | medium | DS-1, DS-2 | Buttons and badges are used everywhere |
| 5 | DS-4 | Primitives: form controls | medium | DS-3 | Onboarding and search are built from them |
| 6 | DS-5 | Colour sweep and the palette-class guard | medium | DS-1 | Removes the second design system outside the country guides |
| 7 | DS-6 | Site header, footer, mobile menu, tab bar | large | DS-3 | One shell for every page |
| 8 | DS-7 | 404, error and loading states | small | DS-6 | Dead ends become routes back |
| 9 | DS-8 | The program card family, on search and saved | large | DS-3, DS-4 | The most reused component; folds in MAINT 5.7 |
| 10 | DS-9 | Search page | large | DS-8 | Filters, sort, pagination, default order |
| 11 | DS-10 | Program page | large | DS-8 | Requirements first, two columns |
| 12 | DS-11 | Matches, coordinator matches, university program lists | medium | DS-8 | `ProgramCard` everywhere |
| 13 | DS-12 | University page | small | DS-6, DS-11 | Last page without a shell |
| 14 | DS-13 | Onboarding shell, steps 1 and 2 | medium | DS-4 | Keyboard access, URL steps, autosave |
| 15 | DS-14 | Onboarding step 3: the diploma form | large | DS-13, FIX-1 | The biggest UX win for students |
| 16 | DS-15 | Saved, settings and the profile menu | small | DS-8, DS-6 | Small pages, one pass |
| 17 | DS-16 | Landing page | medium | DS-6, DS-8 | Product-first home page |
| 18 | DS-17 | Country guide template | medium | **MAINT 7.2**, DS-6 | Restyle once, after the 22 pages become one route |
| 19 | DS-18 | Marketing pages | medium | DS-16 | Reuse the landing sections |
| 20 | DS-19 | Sign-in, legal pages, cookie banner | small | DS-6 | Small pages, one pass |
| 21 | DS-20 | Coordinator and admin alignment | medium | DS-3, DS-4, DS-11 | Inherit tokens; fix status colours |
| 22 | DS-21 | Dark mode | medium | DS-5, DS-17, DS-18 | Only safe once no palette classes are left |
| 23 | DS-22 | Motion and view transitions | small | DS-10 | Polish last |
| 24 | DS-23 | Accessibility gate, clean-up, docs | medium | all | Make the gains permanent |

### Rules for grouping

1. **Never mix a refresh with a behaviour change** the user has not agreed. Where a task contains a
   product decision (search default order, removing the cookie banner, contact without sign-in), it
   says so and the session asks before doing it.
2. **One area per session.** If a task grows past one pull request that is easy to review, stop and
   split it; write the remainder into this file.
3. **Shared components before pages.** A page task never invents a component the design system
   lacks. Add it to `components/ui` or `components/program` and to `/design` in the same PR.

---

## The full list

Foundations

- [ ] DS-0 Visual and accessibility harness, `/design` style guide route
- [ ] FIX-1 TOK/EE bonus points match the official IB matrix
- [ ] DS-1 Tokens and theme
- [ ] DS-2 Typography and the logo
- [ ] DS-3 Primitives: actions, badges, feedback
- [ ] DS-4 Primitives: form controls
- [ ] DS-5 Colour sweep and the palette-class guard

Shell

- [ ] DS-6 Site header, footer, mobile menu, tab bar
- [ ] DS-7 404, error and loading states

Programs

- [ ] DS-8 The program card family, on search and saved
- [ ] DS-9 Search page
- [ ] DS-10 Program page
- [ ] DS-11 Matches, coordinator matches, university program lists
- [ ] DS-12 University page

Students

- [ ] DS-13 Onboarding shell, steps 1 and 2
- [ ] DS-14 Onboarding step 3: the diploma form
- [ ] DS-15 Saved, settings and the profile menu

Public pages

- [ ] DS-16 Landing page
- [ ] DS-17 Country guide template (after MAINT 7.2)
- [ ] DS-18 Marketing pages
- [ ] DS-19 Sign-in, legal pages, cookie banner

Everything else

- [ ] DS-20 Coordinator and admin alignment
- [ ] DS-21 Dark mode
- [ ] DS-22 Motion and view transitions
- [ ] DS-23 Accessibility gate, clean-up, docs

---

## Standing context

**Read this, and the [Standing context in `MAINT_tasks.md`](MAINT_tasks.md#standing-context),
before starting any task.** The maintenance rules still apply in full: the local `.env` points at
the production database, `prisma migrate dev` and `prisma db push` are forbidden, Supabase egress is
on a 5 GB free tier, and `node_modules/next/dist/docs/` is the authority on Next.js 16.

### Where the design lives

| What | Where |
| --- | --- |
| Findings and rationale | `docs/design/design-audit-report-2026-10.md` |
| Tokens (Tailwind 4 theme to adopt) | `docs/design/tokens/theme.css` |
| Tokens (W3C DTCG 2025.10) | `docs/design/tokens/ibmatch.tokens.json` |
| Contrast proof | `docs/design/tokens/contrast.md` |
| Reference screens | `docs/design/mockups/*.html` (open in a browser) and `docs/design/images/after/*.png` |
| Reference CSS for every component | `docs/design/mockups/components.css` |
| Design system with live previews | <https://claude.ai/artifact/AQnBycr6vVF2BopeyuR9kv> (read `project/README.md` with the Artifact tool, if available) |

The mockups are **targets, not code to paste**. Rebuild each component in React and Tailwind in
`components/ui` or `components/program`, matching the mockup's spacing, sizes and states. The
mockups use real catalogue data from 2 October 2026; the numbers in them are examples.

### Design rules every task follows

1. **Tokens only.** No Tailwind palette classes (`bg-blue-600`, `text-gray-500`) in new or touched
   code. Use the semantic utilities from DS-1: `bg-bg`, `bg-surface`, `bg-surface-muted`, `text-fg`,
   `text-fg-muted`, `border-border`, `border-border-strong`, `bg-primary`, `text-primary`,
   `bg-primary-soft`, `text-success`, `bg-warning-soft`, `text-danger`, `bg-highlight`. After DS-5
   a test fails on new palette classes.
2. **One component per job.** A program in a list is always `ProgramCard` (after DS-8). Headers,
   footers, buttons, chips and badges come from the shared components. A second version of a
   component is a bug, even if it looks the same.
3. **Type from the scale.** `text-display-2xl` … `text-caption` from DS-1/DS-2; no arbitrary sizes.
   Headings in order, one `h1` per page, eyebrows are `<p>`.
4. **Accessible by construction.** Real buttons and links; `aria-label` on every icon-only control;
   checkboxes, radios and `aria-pressed` for selection; visible labels on inputs; 44px touch targets;
   the focus outline untouched.
5. **Static pages stay static.** The landing page, the 22 country guides and the requirements hub
   are prerendered. A shared layout or header must not call `auth()`, `cookies()` or `headers()` on
   those routes. Read session state on the client instead (see DS-6). `npm run build` must still
   list them as `○ (Static)`.
6. **Components respond to their container.** Reusable components use Tailwind 4 container queries
   (`@container`, `@md:`) rather than viewport breakpoints, so the same card works in a sidebar and a
   list.
7. **Prettier owns formatting** (do not add stylistic ESLint rules); tests are Vitest `*.test.ts(x)`
   next to the code; use `logger` from `@/lib/logger`.

### Verification commands

Every task runs the standard set from `MAINT_tasks.md`:

```bash
npx tsc --noEmit && npx eslint . && npx prettier --check . && npm run build
npm test && npx tsx scripts/run-all-tests.ts
```

and, once DS-0 has landed, the design checks:

```bash
# before: production; after: the pull request's Vercel preview URL (or http://localhost:3000)
npx tsx scripts/design/snapshot.ts --base-url https://www.ibmatch.com --label before
npx tsx scripts/design/snapshot.ts --base-url <preview-url> --label after
```

`npm run build` and `npm run dev` query the production database (see AGENTS.md). Keep local runs
short; prefer the Vercel preview of the pull request for visual checks.

### Working agreement for design pull requests

- The PR description has a **Before / After** table with the screenshots from
  `artifacts/design-snapshots/` for the routes the task names (390px and 1440px at least), and the
  axe summary for those routes.
- It links the preview's `/design` route when components changed.
- It lists anything the task deliberately left for later.
- Merging `main` deploys to production. The user merges.

---

## Foundations

### DS-0 — Visual and accessibility harness, `/design` style guide route

**Goal:** make every later design change provable with screenshots and an accessibility report,
without touching the production database.

**End result**

- `scripts/design/snapshot.ts`: given `--base-url` and `--label`, opens each route in
  `scripts/design/routes.ts` at 390, 768 and 1440px with Playwright Chromium, saves above-the-fold and
  full-page screenshots to `artifacts/design-snapshots/<label>/` (gitignored), runs axe
  (`@axe-core/playwright`, tags `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`) and writes
  `summary.md` (violations by rule, impact, pages, element count). It pre-sets the cookie-consent
  `localStorage` entry so the banner does not cover every screenshot (except one `home-first-visit`
  capture).
- `scripts/design/routes.ts`: the public routes (home, how-it-works, faqs, for-coordinators,
  support-us, contact, programs/search, one program, one university, two country guides,
  ib-university-requirements, auth/signin, auth/coordinator, privacy, terms, a 404) plus `/design`.
- `app/design/page.tsx`: a living style guide that renders every design-system component with fixed
  example data. It returns `notFound()` when `process.env.VERCEL_ENV === 'production'`, has
  `robots: { index: false }`, and needs no database. Starts with the components that exist today;
  each later task adds its components.
- Component testing works: `@testing-library/react`, `@testing-library/user-event` and `jsdom` as
  dev dependencies, a Vitest environment for `*.test.tsx`, and one example test.
- `.gitignore` covers `artifacts/`.

**Why:** the audit (report, "How this audit was done") could only compare pages by hand. The user
assesses each PR by its screenshots and the preview's `/design` page.

**Read first:** `vitest.config.mts`, `package.json`, `.github/workflows/ci.yml`,
`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md`.

**Steps**

1. Add `@playwright/test` (or `playwright`) and `@axe-core/playwright` as dev dependencies. In the
   cloud environment Chromium is preinstalled (`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`); do not
   run `playwright install` there. In CI it is not needed yet (the script is run by hand).
2. Write `routes.ts` and `snapshot.ts`. Resolve "one program" and "one university" from
   `/sitemap.xml` on the target, so it works on any deployment.
3. Add the jsdom Vitest setup without breaking the existing node-environment tests (use
   `environmentMatchGlobs` or a per-file `// @vitest-environment jsdom` comment).
4. Create `app/design/page.tsx` with sections for colour, type, Button, Badge, Card, Input and the
   current `ProgramCard` (fixture data from `docs/design/mockups` examples: Edinburgh Psychology BSc
   (Hons), 34 points).
5. Run the snapshot script against production with `--label baseline` and attach the summary to the
   PR.

**Tests**

- Automated: the standard set; a Vitest test for the `/design` guard (production → not found);
  the example Testing Library test.
- Visual: `snapshot.ts --base-url https://www.ibmatch.com --label baseline` produces 17 × 3 × 2
  screenshots and a summary whose counts match the report's §12 table (within a few elements).
- Manual: open `/design` on the PR's Vercel preview; it renders; on production it is a 404.

**Out of scope:** CI integration (DS-23), signed-in screenshots (needs a test-account approach the
user must agree to; propose one in the PR).

**Session size:** medium.

---

### FIX-1 — TOK/EE bonus points match the official IB matrix

**Goal:** every place that computes a student's total uses one tested function that follows the
official IB matrix, and the server stops trusting the client's total.

**End result**

- `lib/ib/bonus-points.ts` exports `coreBonusPoints(tok, ee): 0 | 1 | 2 | 3 | 'fail'` and
  `totalIBPoints(courses, tok, ee)`. The matrix (TOK row, EE column): A: 3 3 2 2 F; B: 3 2 2 1 F;
  C: 2 2 1 0 F; D: 2 1 0 0 F; E: F F F F F.
- `lib/ib/bonus-points.test.ts` checks all 25 pairs.
- `app/student/onboarding/FieldSelectorClient.tsx`, `components/student/DetailedGradesInput.tsx`
  and `app/coordinator/students/[id]/edit/StudentProfileForm.tsx` use it; their own formulas are gone.
- `app/api/students/profile/route.ts` and `app/api/coordinator/students/[id]/route.ts` recompute
  `totalIBPoints` from the submitted courses and grades when six courses are present, instead of
  storing the client's number.
- A short note in the PR with the impact: profile counts per (TOK, EE) pair from one aggregate query,
  e.g. `SELECT "tokGrade", "eeGrade", count(*) FROM "StudentProfile" GROUP BY 1, 2`.
- A prepared, **not executed**, backfill script that recomputes stored totals for affected profiles
  and clears their match cache (`lib/matching/cache.ts`). Running it needs the user's explicit
  approval and a backup first (production data).

**Why:** report §16. Onboarding gives one point too few for A+D, B+C, B+D and C+C; the coordinator
form gives too many for A+C, A+D, B+B, B+C, B+D, C+C and C+D. Totals drive matching.

**Read first:** the three files above, `app/api/students/profile/route.ts`, `lib/matching/cache.ts`,
`lib/matching/transformers.ts`.

**Tests**

- Automated: the matrix test (25 cases); a route test that posts six courses with TOK B, EE C and
  checks the stored total includes +2; the standard set; `npx tsx scripts/run-all-tests.ts` (matching
  suite unchanged).
- Manual: in onboarding step 3, TOK B + EE C shows "+2"; TOK E shows the diploma-fail warning.

**Session size:** small.

---

### DS-1 — Tokens and theme

**Goal:** one semantic token set, light and dark, in `app/globals.css`, without changing any layout.

**End result**

- `app/globals.css` declares the semantic variables from `docs/design/tokens/theme.css` for `:root`
  and `.dark`, and maps them in `@theme inline` to utilities (`bg-surface`, `text-fg-muted`,
  `border-border-strong`, `bg-primary-soft`, `text-success`, `bg-highlight` …).
- The old shadcn variable names stay as aliases of the new ones, so nothing breaks:
  `--background → --bg`, `--foreground → --fg`, `--card → --surface`, `--muted → --surface-muted`,
  `--muted-foreground → --fg-muted`, `--accent → --surface-strong`, `--border`, `--input →
  --border-strong`, `--ring → --focus`, `--destructive → --danger`, `--primary` (new value),
  `--secondary → --primary-soft`. Mark them deprecated in a comment.
- Radius tokens `radius-sm` 6, `radius-md` 10, `radius-lg` 14, `radius-xl` 20; shadow tokens
  `shadow-xs` … `shadow-lg`; the type-scale utilities (`text-display-2xl` … `text-caption`, with line
  height, weight and tracking).
- `lib/design/tokens.ts` holds the hex values per theme (generated from or checked against
  `docs/design/tokens/ibmatch.tokens.json`), and `lib/design/tokens.test.ts` checks every pair in
  `docs/design/tokens/contrast.md` against WCAG thresholds (4.5:1 text, 3:1 controls).
- The root layout still forces light mode. Dark mode is DS-21.
- The `.skeleton-bg` hex and `animate-shimmer` literal colours use tokens.

**Why:** report §2. Two blues and three grey ramps; the primary fails AA at 4.43:1.

**Read first:** `app/globals.css`, `docs/design/tokens/theme.css`, `docs/design/tokens/contrast.md`,
`node_modules/next/dist/docs/` on CSS, and Tailwind 4's `@theme` (already used in the file).

**Steps**

1. Replace the `:root` and `.dark` colour blocks with the proposal; keep the animation tokens.
2. Add the aliases and the new `@theme inline` mappings; keep `--radius` working for shadcn
   components that compute from it, or move them to the explicit radius tokens.
3. Add the type utilities with `--text-*` theme variables (Tailwind 4 supports
   `--text-<name>--line-height` and `--text-<name>--font-weight`).
4. Add `lib/design/tokens.ts` and the contrast test.

**Tests**

- Automated: the standard set; `lib/design/tokens.test.ts`.
- Visual: snapshots of home, search, a program, sign-in, `/design` before and after. Expected: the
  primary blue is slightly deeper, neutrals slightly cooler, nothing moves. Any layout shift is a bug.
- Manual: buttons, links and focus rings on search and sign-in show the new primary; axe
  `color-contrast` count on those pages drops.

**Session size:** medium.

---

### DS-2 — Typography and the logo

**Goal:** Bricolage Grotesque for headings and numbers, Atkinson Hyperlegible Next for text, with
Latin Extended, and a logo that renders the same everywhere.

**End result**

- `app/layout.tsx` loads `Bricolage_Grotesque` (variable, `axes: ['opsz']`) and
  `Atkinson_Hyperlegible_Next` from `next/font/google` with `subsets: ['latin', 'latin-ext']`,
  as CSS variables used by `--font-display` and `--font-sans`. Geist and Geist Mono are removed.
- Base styles: body `text-body` (16px/1.6) in `font-sans`; `h1`–`h3` in `font-display`; numbers that
  align use `tabular-nums`.
- `components/brand/Logo.tsx`: the existing mark (blue square, "IB") plus the "IB Match" wordmark in
  the display face, in `sm` and `md` sizes; used by the current headers.
- `public/logo-restored.svg` and the favicon rebuilt with outlined paths (no `<text>`), same colour
  `#3573E5`, same proportions. Convert with a one-off script (for example `opentype.js` as a dev
  dependency) or hand-drawn paths; commit only the SVGs.
- `app/icon.svg` and `app/apple-icon.png` (180×180) per the Next 16 metadata file conventions, if
  they replace the `icons` metadata cleanly.

**Why:** report §1 and §3. Text renders in system fallbacks; "Plzeň" breaks out of the font.

**Read first:** `app/layout.tsx`, `app/globals.css`,
`node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md`, the metadata file
conventions in the same docs (`app-icons`), `docs/design/images/after/type-specimen.png`.

**Tests**

- Automated: the standard set.
- Visual: snapshots of home, search, a program, a country guide, sign-in. Expected: new faces, no
  overflow at 390px (the snapshot script reports horizontal overflow), headings no larger than before
  where the scale says so.
- Manual: `/programs/search?q=charles` shows "Plzeň" in one font; the header logo is identical in
  Chrome, Safari and Firefox; the favicon renders in a browser tab.

**Out of scope:** applying the scale to every page (each page task does that).

**Session size:** medium.

---

### DS-3 — Primitives: actions, badges, feedback

**Goal:** the shared components for actions and status match the design system.

**End result** (in `components/ui/`, each shown on `/design` with all states):

- `Button`: variants `primary`, `secondary`, `outline`, `ghost`, `danger`, `link`; sizes `sm` 36px,
  `md` 44px (default), `lg` 52px; `radius-md`; `loading` state; existing variant names (`default`,
  `destructive`) kept as aliases so call sites do not change in this task.
- `IconButton`: 44×44; `aria-label` is a required prop (TypeScript); `pressed` for toggles
  (`aria-pressed`).
- `Badge`: `neutral`, `brand`, `success`, `warning`, `danger`, `highlight`; status variants require
  an icon.
- `Callout`: info, success, warning, danger; title and body.
- `EmptyState`: title, explanation, up to two actions.
- `Skeleton`: one component replacing the ad hoc `skeleton-bg` and `animate-shimmer` uses.

**Why:** report §4. Button heights 32–52px, pill and square buttons side by side.

**Read first:** `components/ui/button.tsx`, `badge.tsx`, `page-loader.tsx`, `loading-wrapper.tsx`;
`docs/design/mockups/components.css` (`.ib-btn`, `.ib-iconbtn`, `.ib-badge`, `.ib-callout`,
`.ib-empty`); the design system's Button, IconButton, Badge, Callout and EmptyState READMEs.

**Tests**

- Automated: Testing Library tests: `IconButton` without a label fails type-checking (a
  `// @ts-expect-error` test); `pressed` sets `aria-pressed`; `Button loading` is disabled and
  announces "Loading"; the standard set.
- Visual: `/design` before and after; search and program pages (they use `Button`) change only in
  button size and radius.
- Manual: tab through `/design`: every control shows the focus outline.

**Session size:** medium.

---

### DS-4 — Primitives: form controls

**Goal:** accessible form controls that onboarding, search and settings will be rebuilt from.

**End result** (in `components/ui/`, each on `/design`):

- `TextField`: label always visible, optional hint, error with icon; `aria-describedby` and
  `aria-invalid` wired; 44px; 16px text.
- `SearchField`: `TextField` with a leading icon, 52px, a labelled clear button.
- `NativeSelect`: styled native `<select>` with a label.
- `Chip` (`aria-pressed` toggle, optional icon or flag and count) and `RemovableChip` (labelled
  "Remove …").
- `SegmentedControl`: `role="radiogroup"`, `role="radio"` options, roving tab index, arrow keys,
  `danger` tone; used later for HL/SL, grades 1–7 and TOK/EE A–E.
- `SelectableTile`: a checkbox (`role="checkbox"` + `aria-checked` on a button, or a styled input),
  icon, label, description, `disabled` with a reason.

**Why:** report §9 and §12. Onboarding tiles are not keyboard-operable; grade buttons have no radio
semantics; search inputs have no labels.

**Read first:** `components/ui/input.tsx`, `select.tsx` (Radix), `label.tsx`,
`components/student/FieldSelector.tsx`, `DetailedGradesInput.tsx`; mockup classes `.ib-field`,
`.ib-input`, `.ib-search`, `.ib-chip`, `.ib-seg`, `.ib-tile`.

**Tests**

- Automated (Testing Library + user-event): Space toggles a `SelectableTile`; arrow keys move and
  select in `SegmentedControl`; Tab enters the radiogroup once; `TextField` error is announced via
  `aria-describedby`; the standard set.
- Visual: `/design`.
- Manual: complete each control with the keyboard only, and with VoiceOver or NVDA on one control
  of each type.

**Session size:** medium.

---

### DS-5 — Colour sweep and the palette-class guard

**Goal:** no Tailwind palette colours outside the country guides, and a test that keeps it that way.

**End result**

- `lib/design/no-palette-classes.test.ts` scans `app/` and `components/` for
  `(bg|text|border|ring|fill|stroke|from|via|to|divide|outline|decoration|placeholder)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}`
  and hex colours in `className`/`style`, with an allowlist of `app/study-in-*` (removed in DS-17).
- Every other occurrence is replaced by a token: `gray-900 → fg`, `gray-600/700 → fg-muted`,
  `gray-50 → surface-muted`, `blue-600 → primary`, `blue-50/100 → primary-soft`, `green-* → success`,
  `amber-*/yellow-* → warning`, `red-* → danger`, `white → surface`. Decorative gradients that only
  exist on the old marketing pages become flat `bg`/`surface-muted`.
- Areas: `app/landing`, `app/how-it-works`, `app/for-coordinators`, `app/support-us`, `app/faqs`,
  `app/contact`, `app/ib-university-requirements`, `app/auth`, `app/student`, `components/*`,
  `app/coordinator` status colours. Admin may stay allowlisted if the session runs long; record it.

**Why:** report §2. 4,884 hard-coded classes against 795 token classes in public and student code.

**Tests**

- Automated: the new test; the standard set.
- Visual: snapshots of every marketing page, sign-in, search, a program: colours shift to the token
  palette; spacing and layout do not change.
- Manual: the cookie banner's "Accept All" and the hero CTA are now the same blue.

**Session size:** medium (mechanical, wide).

---

## Shell

### DS-6 — Site header, footer, mobile menu, tab bar

**Goal:** every page has the same header and footer, visitors see visitor navigation, students see
student navigation, and static pages stay static.

**End result**

- `components/layout/SiteHeader.tsx` with two modes. Visitor: logo, Find programs
  (`/programs/search`), Country guides (`/ib-university-requirements`), How it works, For IB schools
  (`/for-coordinators`), Sign in (ghost), Get my matches (primary, `/auth/signin`). Student: logo,
  Matches, Search, Saved, Country guides, "Finish your profile" pill when onboarding is incomplete,
  profile menu (Academic profile, Settings, Sign out). Current section marked with `aria-current`.
  A "Skip to content" link first.
- On phones: visitors get a menu button opening a sheet with the same links (Radix Dialog);
  students get `TabBar` (Matches with `Sparkles`, Search, Saved, Profile), always visible, with
  `padding-bottom: env(safe-area-inset-bottom)`. The tab bar is never shown to visitors.
- `components/layout/SiteFooter.tsx`: logo and mission line, four columns (Students, Country guides,
  IB schools, About), and "Not affiliated with the International Baccalaureate Organization."
- Header and footer on: home, all marketing pages, the requirements hub, all 22 guides, search,
  program pages, university pages, legal pages, student pages. Sign-in pages get a minimal header
  (logo only) and footer (legal links).
- **Static rendering preserved.** Pages that are prerendered today render the visitor header on the
  server; a small client component reads the session (`next-auth/react` `useSession` or a fetch of
  `/api/auth/session`) and swaps the actions to the student menu after hydration. Pages that are
  already dynamic (student area, programs) may pass the session from the server.
- `StudentHeader`, `MobileBottomNav`, `StudentFooter`, `components/shared/Header.tsx` and
  `components/shared/Footer.tsx` are deleted.
- Every page has one `header`, one `main` (with `id="main"`), one `footer`.

**Why:** report §5. More than 30 pages have no header; university pages have nothing; visitors see
"My Matches".

**Read first:** `components/layout/*`, `components/shared/Header.tsx`, `Footer.tsx`,
`app/student/layout.tsx`, `app/programs/layout.tsx`, `app/page.tsx` (`force-static`), one
`app/study-in-*/page.tsx`, `node_modules/next/dist/docs/` on layouts, route groups and static
rendering; mockups `search-desktop.html`, `landing-desktop.html`, `matches-mobile.html`.

**Tests**

- Automated: the standard set; `npm run build` output still lists `/`, the 22 guides and
  `/ib-university-requirements` as `○ (Static)` (paste the lines into the PR).
- axe: `region`, `landmark-one-main`, `landmark-unique`, `link-name` are zero on all snapshot routes.
- Visual: snapshots of every route at 390 and 1440.
- Manual: signed out, the header shows Sign in and the tab bar is absent; signed in, the student
  navigation appears on a country guide after load; keyboard: the skip link moves focus to `main`;
  on an iPhone (or Safari's responsive mode with a notch device) the tab bar clears the home
  indicator.

**Session size:** large. If it runs over, ship the header and footer; move the tab bar and mobile
menu to a follow-up written into this file.

---

### DS-7 — 404, error and loading states

**Goal:** no dead ends and no unbranded screens.

**End result**

- `app/not-found.tsx`: site header and footer, "We couldn't find that page", a search field that
  submits to `/programs/search`, links to Matches (students) or Get my matches (visitors), Country
  guides, Home. Status 404.
- `app/error.tsx` and `app/global-error.tsx` in the same style, with "Try again" (`reset`) and a link
  home; no stack traces.
- Loading states shaped like their content: search (a list of card skeletons, one column),
  program page (header, requirement rows, sidebar). The search `Suspense` fallback no longer shows a
  three-column grid.

**Why:** report §5 and §13.

**Tests**

- Automated: the standard set; a test that the not-found page has an `h1` and a search form.
- Visual: `/this-page-does-not-exist` at 390 and 1440; the search page with throttled network.
- Manual: trigger an error boundary locally (temporary throw, removed before commit).

**Session size:** small.

---

## Programs

### DS-8 — The program card family, on search and saved

**Goal:** one program card, built from small parts, used by search and saved programs.

**End result**

- `components/program/`:
  - `ProgramCard.tsx`: variants `default` and `compact`; one stretched link (the title); save button
    and university link above it; logo with monogram fallback; `IB 34+` stat; fact chips (field,
    degree, duration); optional match row. Container queries: under 520px container width the points
    move into the chips and the save button floats top right.
  - `UniversityLogo.tsx` (image or monogram such as "UoE", never an empty box), `SaveButton.tsx`
    (`IconButton` with `aria-pressed` and a label naming the program), `MatchScore.tsx` (ring + tier
    label), `MatchReasons.tsx` (three reasons with icons), `KeyFacts.tsx`, `RequirementList.tsx`
    (rows for points, single subjects and one-of groups, with status when a match result is given).
  - `requirements.ts`: pure helpers that group one-of requirements and describe them: same level and
    grade → one line; mixed → "HL 5 · SL 6"; a course listed at two levels named once ("English B —
    HL 4 or SL 5"); more than four options → three names + "and N more". This is MAINT task 5.7;
    if it is already done, reuse its helper.
  - `match.ts`: tier from score (Excellent ≥ 0.9, Strong ≥ 0.75, Good ≥ 0.6, Possible ≥ 0.4, Low),
    with the label and the colour token.
- `app/programs/search/SearchClient.tsx` and `app/student/saved/SavedProgramsClient.tsx` render the
  new `ProgramCard`. The old `components/student/ProgramCard.tsx` remains only for the program page
  (DS-10) and matches (DS-11), with a deprecation comment.
- `/design` shows every variant: signed out, signed in strong, signed in possible, saved, compact,
  missing image, long title, in a 360px container.

**Why:** report §6. A 1,278-line component, nine copies of tile markup, one result per phone screen.

**Read first:** `components/student/ProgramCard.tsx`, `SearchClient.tsx`, `SavedProgramsClient.tsx`,
`lib/matching/types.ts`, `MAINT_tasks.md` task 5.7, mockups `program-card.html`,
`program-card-mobile.html`, `search-mobile.html`, the design system's ProgramCard,
MatchScore and RequirementList READMEs.

**Tests**

- Automated: `requirements.test.ts` with the real cases from 5.7 (Edinburgh Psychology BSc
  `cmkcynsdg00197moeu7aoktel`, HKUST BBA in Marketing `cmkv8bnwd004b7mpof3j9s1q2`, Manchester BSc
  Psychology `cmkf6zfvq007d7msfu768e1dk`) as fixtures; `match.test.ts` for the tier boundaries;
  Testing Library: the card has one link named after the program, the save button toggles
  `aria-pressed`, compact hides the logo, a missing image shows the monogram; the standard set.
- Visual: search and saved at 390 and 1440. Target: three to four results per phone screen.
- Manual: the whole card is clickable, the save button and university link still work, keyboard
  order is title → university → save.

**Session size:** large.

---

### DS-9 — Search page

**Goal:** search that helps a student narrow 1,273 programs to a shortlist.

**End result**

- Layout per `docs/design/mockups/search-desktop.html` and `search-mobile.html`: title and count;
  a labelled `SearchField` and a sort select; on desktop a 280px filter sidebar (field, country,
  minimum points range, degree when normalised) with counts; on phones a "Filters (n)" button
  opening a bottom sheet with "Show N programs"; applied filters as removable chips with "Clear all".
- 20 results per page, numbered pages, page in the URL (`?page=2`), Back restores filters and page.
- Facet counts: in `scripts/configure-algolia-settings.ts` change `filterOnly(fieldOfStudyId)` and
  `filterOnly(countryId)` to faceting attributes, apply with the script, and return `facets` from
  `/api/programs/search`.
- Sort: "Best match" (relevance) and "Minimum points, low to high". Sorting by an attribute needs an
  Algolia replica; check the plan's record limits first and **ask the user** before creating one.
- **Default order (product decision, ask the user):** today `customRanking: desc(minimumIBPoints)`
  shows 45-point programs first. Options: ascending points; a neutral attribute; or, for signed-in
  students, results nearest their predicted total. Implement the one the user picks.

**Why:** report §7.

**Read first:** `app/programs/search/*`, `app/api/programs/search/route.ts`, `lib/algolia/*`,
`scripts/configure-algolia-settings.ts`, `docs/tasks/search-state-persistence-bugs.md`,
`docs/tasks/filter-countries-in-search.md`.

**Tests**

- Automated: unit tests for URL ↔ filter state (parse and serialise round-trip, page reset when a
  filter changes); the standard set.
- axe: `button-name` and `label` zero on search.
- Visual: search at 390 and 1440, with no filters, with four filters, with the sheet open, and with
  no results (empty state).
- Manual: filter, open a program, press Back: same filters, same page, same scroll position.

**Session size:** large. Algolia settings changes are cheap but global; note them in the PR.

---

### DS-10 — Program page

**Goal:** the program page answers "can I get in?" first.

**End result**

- Per `program-detail-desktop.html` and `program-detail-mobile.html`: breadcrumbs (Programs /
  Country / University / Program) plus `BreadcrumbList` JSON-LD; header block (logo, `display-lg`
  title, university link, location, degree, duration, "Checked for 2027 entry" badge from
  `requirementsCheck`); main column with the match summary (signed in: `MatchScore` large plus the
  24–45 points scale; signed out: a sign-up callout), `RequirementList`, the description rendered
  with `components/shared/MarkdownContent.tsx` at `container-prose` width, and "More programs" as
  `ProgramCard compact`; a sticky 340px sidebar with `KeyFacts`, "Visit program website" (primary)
  and Save; on phones a sticky action bar above the tab bar.
- No `history.back()`. The old `components/student/ProgramCard.tsx` `detail` variant is deleted.
- The meta description and JSON-LD use the 5.7 helper for one-of groups (if 5.7 did not already).

**Why:** report §8.

**Read first:** `app/programs/[id]/page.tsx`, `ProgramDetailClient.tsx`,
`components/shared/MarkdownContent.tsx`, `app/coordinator/students/[id]/matches/[programId]/page.tsx`
(it uses the detail variant too; switch it to the same parts).

**Tests**

- Automated: breadcrumb JSON-LD builder test; the standard set.
- Visual: Edinburgh Psychology (one-of groups), a program without requirements, the McGill
  Education program (long description with markdown) at 390 and 1440, signed out and signed in.
- Manual: markdown such as `**not offered**` renders bold, not with asterisks; lines are at most
  about 70 characters; the coordinator view of a student's program shows the same layout with the
  student's data.

**Session size:** large.

---

### DS-11 — Matches, coordinator matches, university program lists

**Goal:** after this task, every list of programs in the product is `ProgramCard`.

**End result**

- `app/student/matches/RecommendationsClient.tsx`: `PageHeader` "Your matches"; a profile summary
  line with Edit ("39 points · 3 HL · Psychology, CS · UK, NL"); tier chips with counts (All,
  Strong, Good, Possible); `ProgramCard` with the match row; "Why this score" opens the requirement
  and preference detail (on the program page or in a disclosure); no "Refresh Recommendations"
  button (matches refresh when the profile changes); no staggered entrance.
- `app/coordinator/students/[id]/matches/StudentMatchesClient.tsx` uses `ProgramCard` with the
  coordinator's link target.
- `app/universities/[id]/UniversityDetailClient.tsx` lists programs with `ProgramCard compact`; its
  own program tile markup is deleted.
- The old `components/student/ProgramCard.tsx` file is deleted (no imports remain).

**Why:** report §6 and §10.

**Tests**

- Automated: `rg "components/student/ProgramCard"` finds nothing; tier-count helper test; the
  standard set.
- Visual: matches at 390 and 1440 (needs a signed-in session: use the user's preview login or the
  approach agreed in DS-0); a university page; a coordinator student's matches.
- Manual: filter by tier; open "Why this score".

**Session size:** medium.

---

### DS-12 — University page

**Goal:** university pages become part of the site, not a dead end.

**End result:** site header and footer; breadcrumbs (Programs / Country / University); a header with
`UniversityLogo`, name, location and facts (type, students, programs); About at prose width; contact
details as a definition list; programs as `ProgramCard compact` with field chips to filter; "All N
programs" links to search filtered by this university; "Back to program" removed.

**Read first:** `app/universities/[id]/*`.

**Tests**

- Automated: the standard set.
- axe: `landmark-one-main` and `region` zero on a university page.
- Visual: McGill at 390 and 1440.

**Session size:** small.

---

## Students

### DS-13 — Onboarding shell, steps 1 and 2

**Goal:** a first-time student can complete steps 1 and 2 with a keyboard, leave and come back, and
use the browser's Back button.

**End result**

- The step lives in the URL: `/student/onboarding?step=1|2|3`; Back and refresh work.
- Each step saves on Continue (fields and countries) through the existing
  `/api/students/profile` endpoint, accepting a partial profile; "Save and exit" in the header.
- `Stepper` (one indicator: "Step 1 of 3 · Study interests", segment bar, step names); first visit
  heading "Set up your profile", returning students "Edit your academic profile" with steps as
  links. The hard-coded "Update Your Profile" in `components/ui/step-indicator.tsx` is gone.
- Step 1 per `onboarding-fields-mobile.html`: `SelectableTile` checkboxes, one column on phones and
  two on desktop, "3 of 5 chosen", limit message on the remaining tiles, sticky Continue bar on
  phones.
- Step 2: country `Chip`s with flags in a searchable list grouped by region, an "Anywhere" option,
  and "Skip for now".
- No tile is an `<h3>`.

**Why:** report §9.

**Read first:** `app/student/onboarding/*`, `components/student/FieldSelector.tsx`,
`LocationSelector.tsx`, `components/ui/step-indicator.tsx`, `app/api/students/profile/route.ts`,
`docs/tasks/onboarding-completion-ux-improvements.md`.

**Tests**

- Automated: Testing Library: Tab reaches every tile, Space selects, the sixth selection is refused
  with a message; a test that `?step=2` renders step 2; the API accepts a partial profile; the
  standard set.
- Manual: complete steps 1 and 2 with the keyboard only; refresh on step 2 (stays on step 2 with
  choices kept); press Back on step 2 (returns to step 1).

**Session size:** medium.

---

### DS-14 — Onboarding step 3: the diploma form

**Goal:** entering six subjects, grades, TOK and EE is one form on one screen.

**End result** (per `onboarding-grades-desktop.html` and `onboarding-grades-mobile.html`)

- Six rows, one per IB group (1–6, group 6 allowing the arts or a second subject from groups 1–4),
  each with a `NativeSelect` (or combobox) of that group's courses, an HL/SL `SegmentedControl` and a
  1–7 grade `SegmentedControl`. Everything is editable in place.
- TOK and EE as A–E `SegmentedControl`s (E uses the danger tone).
- A sticky summary: predicted total (`stat-xl`), subjects + bonus (from FIX-1's function), HL and SL
  sub-totals against 12 and 9, and the diploma rules as a checklist with plain explanations
  (`validateDiploma` moved to `lib/ib/`). "See my matches" submits.
- Saves on change (debounced) as well as on submit.
- `SubjectSelectorDialog` and the commented-out quick-score path are deleted; no emoji icons.

**Why:** report §9. About 24 taps through six dialogs; grades cannot be edited.

**Depends on:** FIX-1 (bonus), DS-13 (shell), DS-4 (controls).

**Tests**

- Automated: `lib/ib/diploma-rules.test.ts` (each failing condition, and a passing diploma);
  Testing Library: change a grade with arrow keys and the total updates; the standard set.
- Manual: complete step 3 with the keyboard only and with VoiceOver or NVDA (the summary announces
  changes politely); on a 390px screen the page does not scroll sideways.

**Session size:** large.

---

### DS-15 — Saved, settings and the profile menu

**Goal:** the remaining student pages use the new components.

**End result:** saved programs use `ProgramCard` (from DS-8) with an `EmptyState`; settings uses
`TextField`, `Button`, `Callout` and a danger zone for account deletion with a confirmation step;
the profile menu (from DS-6) links Academic profile, Settings and Sign out; avatar colours come from
a contrast-safe set (white initials ≥ 4.5:1, or dark initials on light tints).

**Read first:** `app/student/saved/*`, `app/student/settings/*`, `lib/avatar-utils.ts`.

**Tests:** the standard set; an avatar-colour contrast test; snapshots of both pages; delete-account
flow tested up to (not through) the final confirmation.

**Session size:** small.

---

## Public pages

### DS-16 — Landing page

**Goal:** the home page shows the product and lets a visitor try it before signing up.

**End result** (per `landing-desktop.html` and `landing-mobile.html`)

- Header and footer from DS-6.
- Hero: "Find university programs that fit your IB Diploma" with the highlighter mark on "IB
  Diploma"; a lead line with real numbers; a small form (predicted points, field) that submits a GET
  to `/programs/search` (`maxPoints` = predicted points, `fields`); three trust points.
- A product preview built from real `ProgramCard` and `MatchScore` components with example data
  marked as an example, replacing the illustration.
- A stats strip with counts read once per revalidation with `count()` aggregates (programs,
  countries, the minimum and maximum points), never a full read.
- How it works in three steps, a country-guide grid (eight countries + "All 22 guides"), a dark band
  for coordinators, the founder note (kept, restyled), the footer.
- `app/opengraph-image.tsx` (1200×630) replaces the square `og-image.png` for social cards.
- The page stays `force-static` with its current revalidate.

**Read first:** `app/page.tsx`, `app/landing/students/_components/*`, `lib/page-dates.ts`,
`node_modules/next/dist/docs/` on `opengraph-image`.

**Tests**

- Automated: the standard set; the build lists `/` as static.
- Visual: home at 390, 768, 1440; Lighthouse performance and accessibility not lower than today.
- Manual: the hero form leads to search with the right filters; the social card previews at 1200×630
  (for example with a link-preview debugger on the Vercel preview).

**Session size:** medium.

---

### DS-17 — Country guide template

**Goal:** the 22 country guides share one restyled template.

**Depends on:** **MAINT 7.2** (collapse the 22 pages into one data-driven route). Do not restyle 22
copies.

**End result:** guide header (flag, `display-xl` title, "Updated for 2027 intake" badge, a short
lead at prose width); a sticky "On this page" table of contents on desktop and a collapsible one on
phones; sections with `heading-lg`; `Callout` for "Yes / No" answers and official-source boxes;
timelines as an ordered list with dates in tabular figures; a "Programs in <country>" strip with
`ProgramCard compact`; header and footer. The `app/study-in-*` allowlist entry in the palette test is
removed. Pages remain static with the one-week revalidate.

**Tests:** the build lists the guides as static; the palette test passes with no allowlist; snapshots
of three guides at 390 and 1440; JSON-LD unchanged (diff the rendered HTML, as MAINT 7.2 describes).

**Session size:** medium.

---

### DS-18 — Marketing pages

**Goal:** How it works, For coordinators, Support us, FAQs, Contact and the requirements hub use the
same sections as the landing page instead of one repeated hero.

**End result:** a small set of section components from DS-16 (`PageHero` with left-aligned text,
`Section`, `FeatureList`, `StatsStrip`, `CtaBand`, `FaqList`); claims use real numbers ("1,273
programs", not "1,000+"); stock illustrations replaced by product visuals or removed; FAQs as an
accessible disclosure list with `FAQPage` JSON-LD kept.

**Product decision (ask):** Contact currently requires sign-in to send a message. Options: allow
visitors with an email field and the existing rate limiting, or keep sign-in and say why.

**Tests:** the standard set; snapshots of each page at 390 and 1440; axe `heading-order` zero.

**Session size:** medium.

---

### DS-19 — Sign-in, legal pages, cookie banner

**Goal:** the remaining small public screens match the system.

**End result**

- Sign-in (student and coordinator): an `h1`, labelled email field (`TextField`), Google button,
  minimal header and footer, the new logo.
- Privacy, Terms, Cookies: prose styles at `container-prose`, an "On this page" list, the site header
  and footer (visitor mode for everyone).
- Cookie banner: a slim bottom bar with two buttons ("Accept all", "Essential only") and a settings
  link, no emoji. **Product decision (ask):** the code says only essential cookies are set; if that
  is still true, ask the user whether to keep the banner at all (strictly necessary cookies do not
  need consent under the ePrivacy rules; a legal adviser should confirm).

**Tests:** the standard set; axe `page-has-heading-one` zero on sign-in; snapshots.

**Session size:** small.

---

## Everything else

### DS-20 — Coordinator and admin alignment

**Goal:** the coordinator area (and, if time allows, admin) uses the new tokens and primitives.

**End result:** coordinator sidebar and header use the new logo, nav item styles and focus states;
tables use tokens; status colours (`red`, `amber`, `green` classes, 117 in coordinator code) use
`danger`, `warning`, `success` and their soft grounds; student-match views already use
`ProgramCard` (DS-11). Admin: replace palette status colours with tokens; no layout redesign.

**Tests:** the standard set; the palette test passes with no admin allowlist (or a recorded reason);
snapshots of the coordinator dashboard and students list (signed-in coordinator session from the
user's preview).

**Session size:** medium.

---

### DS-21 — Dark mode

**Goal:** students can use IB Match in dark mode.

**Depends on:** DS-5, DS-17, DS-18 (no palette classes left anywhere).

**End result:** the root layout stops forcing light; the theme follows `prefers-color-scheme` with a
Light / Dark / System setting in student settings, stored in a cookie read without making static
pages dynamic (apply the class with a tiny inline script in `<head>`, or CSS `light-dark()`);
images and the logo work on both; every snapshot route checked in both themes.

**Tests:** the contrast test covers dark (it already does from DS-1); snapshots of all routes in
dark; no flash of the wrong theme on load (check with a throttled network).

**Session size:** medium.

---

### DS-22 — Motion and view transitions

**Goal:** motion explains changes and nothing else.

**End result:** the staggered card entrance and the score bar's grow-from-zero are removed or
limited to the first view; a `ViewTransition` morphs the program title and logo from card to program
page (`node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`); sheets and menus use
`duration-base`; everything respects `prefers-reduced-motion`.

**Tests:** the standard set; manual check with reduced motion on and off; no layout shift (CLS) added
on search and program pages.

**Session size:** small.

---

### DS-23 — Accessibility gate, clean-up, docs

**Goal:** the refresh cannot quietly regress.

**End result**

- A CI job runs `scripts/design/snapshot.ts` (axe only, no screenshots stored) against the built app
  on the throwaway database, or against the Vercel preview, and fails on any serious or critical
  violation on the snapshot routes.
- Dead code removed: unused animation helpers, `components/ui/step-indicator.tsx` if replaced,
  Next's starter SVGs in `public/`, any component the refresh replaced.
- `docs/product/DOC_3_technical-architecture.md` gains a short "Design system" section (tokens,
  where components live, the rules above); `AGENTS.md` gets two lines: tokens only, one component
  per job.
- `docs/design/README.md` updated to say which mockups are now implemented.

**Tests:** the CI job passes on `main`; a deliberately broken label in a throwaway branch makes it
fail (show in the PR, then revert).

**Session size:** medium.

---

## Deliberately not doing

| Item | Why not |
| --- | --- |
| **A new logo mark** | A brand decision for the owner. The tasks keep the existing blue "IB" square, outline it and add a wordmark. |
| **A component library migration** (MUI, Chakra, a new shadcn registry) | The current shadcn-style `components/ui` with Radix is fine; the problem is tokens and duplication, not the library. |
| **Storybook** | `/design` on Vercel previews gives the same review value with no new tooling. Revisit if the component count passes about 40. |
| **Admin redesign** | Internal tool; it inherits tokens in DS-20. |

## Owner decisions this plan needs

1. **Type pairing** — the plan uses Bricolage Grotesque + Atkinson Hyperlegible Next (option A in
   `docs/design/images/after/type-specimen.png`). Say before DS-2 if you prefer option B.
2. **Search default order** (DS-9).
3. **Algolia replica for sorting** (DS-9), if the plan's limits allow it.
4. **Contact without sign-in** (DS-18).
5. **Cookie banner** (DS-19), with legal advice.
6. **Backfilling corrected IB totals** (FIX-1), after seeing the counts.
