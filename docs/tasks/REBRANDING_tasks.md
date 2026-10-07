# Rebranding Roadmap

**Written:** 6 October 2026 · **Covers:** the student-facing redesign decided on 6 October 2026
(Direction B, "Ultramarine"), starting within days

**The order of work.**

1. [Prepare](#step-1--prepare): a short list of MAINT and CONTENT tasks that unblock the rebranding.
2. [Design first](#step-2--design-first): turn the phases below into one task per component and one per
   screen or flow. Each has an approved design before any code.
3. Build, phase by phase, on the [`rebranding` branch](#the-rebranding-branch), with each change
   compared against its approved design.
4. Release: one merge of `rebranding` into `main`, once every screen is built and approved.

Steps 1 and 2 run in parallel: prep is code, step 2 is design and documentation. **Prep tasks ship
to `main` as usual**: they are fixes production needs now. **Rebranding work never goes to `main`
piece by piece.**

**Sequence (owner, 7 October 2026):**

1. **All of P3–P8 lands on `main` first.**
2. Then B1–B3 set up the branch.
3. Then the `rebranding` branch is created from that `main`, and phase 1 starts once its boards are
   approved.

The branch thus starts with every prep fix already in it, which keeps later merges small. Step 2's
design work runs meanwhile.

**How to use this.** [Start here](#start-here) gives the build order. Each task lists its
**must-haves**: the redesign itself fixes the UX bugs the audit found, so each fix is written into
the task that rebuilds that screen rather than kept as a separate patch. Every task also meets the
[Definition of done](#definition-of-done). Read [Standing context](#standing-context) first, and the
standing context in `docs/tasks/MAINT_tasks.md` too: its production-safety and cost rules apply to
every task here.

Each task is written for a **fresh AI session with no memory of the audit**. Audit references
("audit 6.3") point to `docs/UX/design-refresh-2026/01-audit.md`, which gives file and line numbers.

---

## Step 1 — Prepare

Only what unblocks the rebranding, or would otherwise put wrong data on the new screens. The tasks
live in their own files; this is the order to run them. Everything else in `MAINT_tasks.md` and
`CONTENT_tasks.md` carries on independently.

| Order | Task | Who | Why before the rebranding |
|---|---|---|---|
| P1 | ~~Enable branch protection on `main`~~ **Done 7 October 2026** (`MAINT_tasks.md`, owner tasks) | Owner, minutes | The rebranding is 15+ pull requests, and merging `main` deploys. Today a red CI can still be merged |
| P2 | ~~Choose the logo mark~~ **Done 7 October 2026: Lens, provisionally.** The owner decides on the final mark after seeing all screens on the `rebranding` branch. The clearance search waits for that decision | Owner | 1.3 is no longer blocked. Brand configuration makes a later swap a file change |
| P3 | ~~`MAINT_tasks.md` 5.14: delete unused components~~ **Done 7 October 2026** | AI, tiny | Removes the dead `shared/Header.tsx` and `Footer.tsx` before 1.5 builds the new chrome, so no session builds on them by mistake |
| P4 | ~~`MAINT_tasks.md` 5.8 with 5.13: TOK/EE core points, 3 or 4 HL subjects, E blocks saving, and the 20-row data fix (the owner approves the data fix)~~ **Done 7 October 2026**, data fix applied | AI, small | The new cards put the points total front and centre ("38 / 37 points"), so stored totals must be right. 3.2 builds on both helpers |
| P5 | ~~`MAINT_tasks.md` 5.12: every match, not the top 10~~ **Done 7 October 2026**: up to 50. Profiles have 63 matches at the median and up to 592, so 77 of 142 still see the best 50 | AI, small | The status groups (2.2) are designed and reviewed on the full list |
| P6 | `MAINT_tasks.md` 5.7: levels and grades in either/or groups | AI, small | Recommended, not blocking. Students see "English B or English B" in 436 groups today, and 2.2 reuses the helper |
| P7 | `CONTENT_tasks.md` 8.1: one home per discipline in the fields of study (the owner approves the mapping) | AI, medium | It changes which programs match, so it should land before the matches screens are reviewed with real data. 3.1 uses the new descriptions |
| P8 | `CONTENT_tasks.md` 8.2 and 8.3: campus city and image credits (each one migration) | AI, small each | Needed by 2.4. Can run during phase 1 |
| B1 | Run CI on the `rebranding` branch: add it to `pull_request` and `push` in `.github/workflows/ci.yml` (today both list only `main`). Land it on `main`, then create `rebranding` from `main` | AI, tiny | Without it, pull requests into `rebranding` run no checks |
| B2 | Protect `rebranding` too: add it as a target of the "Protect main" ruleset, or a second ruleset with the same rules | Owner, minutes | The branch collects 15+ pull requests; it must stay green and cannot be force-pushed or deleted |
| B3 | **A review address for the branch.** In Vercel, add a domain such as `rebranding.ibmatch.com` and assign it to the Git branch `rebranding`. Then set **branch-specific** Preview variables (`NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` = that address), so sign-in and email links stay on it: `lib/env.ts` requires `NEXTAUTH_URL`, and invites build links from these two. Add the address's callback to the Google OAuth client. Make sure it is not indexed: a `noindex` header, or `app/robots.ts` disallowing everything outside production. Then sign in there, by Google and by magic link | Owner with AI, small | The owner reviews every screen there, logged-in ones included, before anything reaches production. A stable address is easier to share than per-commit preview URLs. It reads and writes the **production database** (there is no other), so a sign-up or a save there is real data, and the cost rules apply |

**Not needed before the rebranding:**

- `MAINT_tasks.md` 5.6, 5.9, 5.10, 5.11, 5.15 (level-gap scoring changes order, not design), 6.6, 7.1.
- `CONTENT_tasks.md` 5.3 (France), 5.4 (how competitive), 6 (USA), 7 (Germany).

One coordination rule: country-page edits in CONTENT (France's new page, the US and German pages)
land on `main`, while 4.2 rewrites the same pages on `rebranding`. Do 4.2 late, straight after
merging the latest `main` into `rebranding`. Port any country edit made on `main` after that into
the template before release.

### The rebranding branch

- **One long-lived branch, `rebranding`**, created from `main` after P3–P8 and B1 have landed. Every rebranding
  task is its own short branch with a pull request **into `rebranding`**, never into `main`.
  Production keeps today's look until the release merge.
- **Merge `main` into `rebranding` at least weekly**, and before starting each phase, so prep fixes
  and content work flow in and conflicts stay small. Expect them in files the redesign replaces
  (`ProgramCard.tsx`, the onboarding components). Keep the logic from `main`; keep the markup from
  `rebranding`.
- **The owner reviews on the branch's own address** (B3), which always shows the branch's latest
  deploy. Seeing every screen there, together, is also when the final logo is decided.
- **Why a branch, not feature flags or a separate Vercel environment.**
  - **Feature flags** would put unfinished redesign code into production behind a switch: the "mix in
    production" the owner ruled out. The new tokens restyle every page at once, which makes flags
    impractical anyway.
  - **Vercel's custom environments** (a paid-plan feature) or a second Vercel project would also
    deploy this branch, with more setup and nothing gained. There is still only one database.
- **Release:** one pull request from `rebranding` into `main`, once every phase is built and its
  design QA passed, and the final logo is chosen. If the final logo is a new mark, the clearance
  search must be back first.
- **Data never waits for the branch.** Migrations (`CONTENT_tasks.md` 8.2, 8.3) and data fixes go
  to `main` through their own tasks. The branch only displays them.

## Step 2 — Design first

The phases below are an outline. Before any of it is built, each becomes smaller tasks, in this
order:

1. **Foundations:** tokens, type, theme. One task each, each with a canvas board.
2. **Components:** one task per component (button, input, chip, segmented control, status badge,
   requirement chip, card, menu, sheet, tab bar, header, footer, theme switch, skeleton, empty and error
   states, …).
3. **Patterns:** composed pieces (match card, result row, requirement checklist, filter toolbar,
   "Why this match", subject row, compare table).
4. **Screens and flows:** one task per screen or flow, including the states the canvas does not
   show yet: loading, empty, error, sign-in, invitations, the university page, 404, the country guide
   template, the requirements hub, How it works and FAQs.

**The design gate.** A task can start only when its board on the canvas shows every state that
applies: default, hover, focus, active, disabled, loading, error and empty, in light and dark, on phone
and desktop. The owner must also have approved the board, by a comment on the canvas, and the task must
record the board and the approval date. After building, the pull request includes screenshots
next to the board (design QA). A visual change that is not on an approved board is not merged.

**Decided 7 October 2026:** the match status model is **requirement-based** (Meets all requirements,
Within reach, Missing a requirement). See [Open questions](#open-questions).

---

## Start here

This is the build order, after steps 1 and 2. Step 2 will replace these rows with the finer-grained
tasks.

| # | Session | Tasks | Size | Notes |
|---|---|---|---|---|
| 1 | Tokens, type and theme | 1.1, 1.4 | medium | Same files (`app/globals.css`, `app/layout.tsx`). After this, every app screen picks up the new colours |
| 2 | Primitives | 1.2 | medium | Button, Input, Select, Chip, Segmented, StatusBadge, Card, Skeleton |
| 3 | Site chrome | 1.5 | medium | Header, footer and phone tab bar on every student-facing page; static pages stay static |
| 4 | Logo | 1.3 | small | Lens, provisionally. The final mark and the clearance search are needed before the release merge, not before this task |
| 5 | Match data | 2.1 | small | Requirement-based statuses (decided 7 October 2026) |
| 6–7 | Match card and results | 2.2 | large | Replaces `ProgramCard` |
| 8 | Explore | 2.3 | medium | |
| 9 | Program and university pages | 2.4 | medium | |
| 10 | Shortlist and compare | 2.5 | medium | |
| 11 | First-run steps | 3.1 | medium | |
| 12 | Subject editor | 3.2 | medium | After `MAINT_tasks.md` 5.8 and 5.13, whose helpers it uses |
| 13 | Profile tab and settings | 3.3 | medium | |
| 14 | Home | 4.1 | medium | |
| 15+ | Country guides | 4.2 | large | Two or three first, then the rest. This is `MAINT_tasks.md` 7.2, done once in the new design |
| last | Other public pages and the guard | 4.3, 4.4 | medium | |

---

## The full list

Phase 1 — Foundations

- [ ] 1.1 Tokens and type
- [ ] 1.2 Primitives
- [ ] 1.3 Brand configuration and the new logo
- [ ] 1.4 Theme switching: System, Light, Dark
- [ ] 1.5 Site chrome on every student-facing page

Phase 2 — Core app

- [ ] 2.1 Match data for the new cards
- [ ] 2.2 Match card, result row and requirement checklist
- [ ] 2.3 Explore: toolbar, phone filter sheet, rows
- [ ] 2.4 Program and university pages
- [ ] 2.5 Shortlist with compare

Phase 3 — Profile and onboarding

- [ ] 3.1 First-run interest and country steps
- [ ] 3.2 Subject editor
- [ ] 3.3 Profile tab and settings

Phase 4 — Public pages

- [ ] 4.1 Home page
- [ ] 4.2 Country guides on one template
- [ ] 4.3 Other public pages
- [ ] 4.4 Guard against raw palette classes

Owner decisions — not AI work

- [x] Choose the logo mark: **Lens, provisionally** (7 October 2026). Final decision after seeing all
  screens on the `rebranding` branch
- [ ] Before the release merge, confirm the final mark. If it is a new mark (Lens or another), commission
  a trademark clearance search: EUIPO and USPTO, figurative marks, Nice classes 41 and 42
- [ ] Add `rebranding` to the branch protection (B2) and check sign-in on its preview (B3)
- [x] Choose the match status model: **requirement-based** (7 October 2026)
- [ ] Decide whether the cookie banner stays (`MAINT_tasks.md`, owner tasks). Affects 4.1

---

## Standing context

**Read this before starting any task below**, after the standing context in `MAINT_tasks.md`.

### Where the design lives

- **Docs:** `docs/UX/design-refresh-2026/`. `README.md` has the decisions, `01-audit.md` the
  findings, `03-flows.md` the flows, and `04-design-system.md` the tokens, components and
  implementation notes (§8 brand config, §9 match status, §10 theme).
- **Canvas:** https://claude.ai/artifact/TyMyphwJN7iwx3rSPLsjuH (private to the owner). Rows 2–4 hold
  the system and the pages; row 5 has the latest boards (match states, phone "Why this match",
  theme, logo).

### Decisions, 6 October 2026

| | |
|---|---|
| Direction | B, "Ultramarine" |
| Colour | Brand #2B3FD6 on paper #F7F6F2; lime #D5F36B for brand moments only |
| Type | Newsreader for display (22px and up), Geist for UI; Geist Mono dropped |
| Logo | **Lens, provisionally** (7 October 2026); the final decision comes after seeing all screens. A new mark needs a clearance search before release. **Loaded from configuration, never hard-coded** |
| Where the work lives | **A dedicated `rebranding` branch**; production gets the redesign in one merge at the end |
| Match score | Status first; the percentage only inside "Why this match" |
| Dark mode | Follows the OS by default, with a toggle in the desktop account menu, the phone Profile tab and the public footer |
| Sign-in | **Stays first.** No try-before-sign-up |
| Analytics | Out of scope; a separate task later |

### Definition of done

Every task below meets all of these. They replace the separate accessibility, contrast, icon and
animation patches the audit first proposed.

1. **Contrast:** WCAG 2.2 AA. Text 4.5:1, large text and UI parts 3:1, measured on the rendered
   colours, in light and dark. Today's primary button is 4.39:1 and two status colours are under 3.7:1
   (audit 6.1, 6.2).
2. **Keyboard and screen reader:** every control is a real `<button>`, `<a>`, `<input>` or
   `<label>`. Choices have checkbox or radio semantics and announce their state. Check with
   VoiceOver or NVDA (audit 6.3, 6.4).
3. **Focus:** a visible outline that survives Windows High Contrast (forced colours). Never only a
   box-shadow ring (audit 6.5).
4. **No emoji in interface chrome**; Lucide icons, per `docs/UX/icons-reference.md` (audit 2.7).
5. **No infinite animations.** Only transform and opacity; reduced motion swaps movement for a fade
   (audit 6.7).
6. **Static pages stay static.** The 22 `study-in-*` guides, `/` and `/ib-university-requirements` are
   prerendered. Nothing may call `auth()`, `cookies()` or `headers()` on them. `npm run build` must
   still list them `○ (Static)`.
7. **No new database reads.** The theme lives in `localStorage`. Use `select` over `include` in
   anything touched.
8. **Budget** (production, 5 October 2026: JS 171 KB, CSS 22 KB, fonts 52 KB, CLS 0): no more JS,
   CSS at most 32 KB, fonts at most 60 KB, CLS stays 0.
9. **Every OS:** Chrome on Windows, Safari on macOS and iOS, at 1440px and 390px, light, dark and
   forced colours, 200% zoom.
10. **Tests:** Vitest for new pure helpers, plus the AGENTS.md verification commands.

---

## Phase 1 — Foundations

### 1.1 — Tokens and type

**Outcome:** `app/globals.css` carries the Direction B tokens in light and dark, and the app uses
Newsreader and Geist.

**Must-haves:**
- Re-point the existing shadcn variables (`--background`, `--primary`, `--muted`, …) to the new
  values and add the semantic ones (`--ok`, `--close`, `--gap` and their `-soft` pairs,
  `--brand-soft`, `--ink-3`, `--lime`), so existing classes keep working (`04-design-system.md` §1).
- Every token pair passes the Definition of done's contrast rule. The table in §1 lists the
  intended ratios; measure them again.
- Fonts through `next/font`, latin subset, variable. **Remove Geist Mono**; it is used once
  (`app/how-it-works/_components/NoAISection.tsx:32`).
- Radius, spacing, elevation and motion tokens as in §3.

**Verify:** the contrast table in the PR; build static as before; font transfer at most 60 KB.

### 1.2 — Primitives

**Outcome:** Button, Input, Select, Chip, Segmented, StatusBadge, Card and Skeleton in the new style,
built from the tokens.

**Must-haves:**
- **Focus is an outline**, not `outline-none` plus a box-shadow ring (today `components/ui/button.tsx:8`,
  `input.tsx:18`). Tailwind v4's `outline-none` and `outline-hidden` differ: read its docs in
  `node_modules/tailwindcss` first.
- Segmented controls and chips use radio, checkbox or `aria-pressed` semantics.
- Heights 36, 44 and 52; one radius; 44px touch targets.
- Skeleton is a static tint the size of the final content. No shimmer.

**Verify:** keyboard and forced-colours check on a page using each primitive.

### 1.3 — Brand configuration and the new logo

**Uses Lens** (owner, 7 October 2026, provisional; canvas board "Logo options and clearance"). The
final mark is decided before the release merge, and swapping it must be a change to the config and
asset files only.

**Outcome:** One module (`lib/brand/config.ts`, `04-design-system.md` §8) names every brand asset,
and nothing else hard-codes a logo.

**Must-haves:**
- All 29 references in 19 files read from it: student, coordinator and admin headers; sign-in and
  invitation pages; `app/layout.tsx` metadata; JSON-LD logos; all 7 email templates.
- Assets are SVG with **outlined paths, never `<text>`**. Today's logo is live text in Inter and
  renders in Arial on Windows (audit 2.4). Each asset is checked at 16, 32 and 180px, light and dark.
- A PNG at 2× for email; favicon, Apple touch icon and Open Graph image made from the mark.
- Changing the logo later means replacing files and, at most, editing the config. No component changes.

### 1.4 — Theme switching: System, Light, Dark

**Outcome:** The site follows the OS by default and remembers a manual choice per device.

**Must-haves** (`04-design-system.md` §10):
- Dark tokens under `prefers-color-scheme` and `[data-theme='dark']`. Remove the forced
  `className="light"` from `<html>` (`app/layout.tsx:121`).
- The choice is stored in `localStorage` only. An inline head script sets `data-theme` before paint, so
  there is no flash. `color-scheme` is set so native controls and scrollbars follow.
- `ThemeSwitch` component (System, Light, Dark radio group). Placing it is 1.5 (account menu, footer)
  and 3.3 (phone Profile tab).

### 1.5 — Site chrome on every student-facing page

**Outcome:** The same header, footer and phone tab bar on every student-facing page, logged in or out.

**Must-haves:**
- **A header on the pages that have none today** (audit 1.1): `/`, the 22 country guides,
  `/ib-university-requirements`, `/how-it-works`, `/faqs`, `/contact`, `/support-us`,
  `/universities/[id]`.
- **Static-safe.** `app/programs/layout.tsx` calls `auth()`, which reads cookies. Public pages must
  not. Render the logged-out header statically. Sessions are JWT (`lib/auth/config.ts:97-98`), so a
  client-side check of `/api/auth/session` costs no database read, but it is one function call per
  view. Prefer linking "Sign in" to `/student`, which already redirects signed-in students.
- Logged out, link only to public destinations (audit 1.2). Logged in: Matches, Explore,
  Shortlist, Guides, and an **account menu** with Profile and settings, Shortlist, Appearance
  (`ThemeSwitch`) and Sign out. See the canvas board "Theme: System, Light, Dark".
- **Phone tab bar:** Matches · Explore · Shortlist · Profile. No heart icon (audit 1.6), no
  hide-on-scroll, no looping "incomplete" dot (today `StudentHeader.tsx:103`,
  `MobileBottomNav.tsx:141`). Hidden during first-run onboarding (3.1).
- **Footer:** public links and the `ThemeSwitch`.
- Keep URLs unchanged. Do not move the country guides' files while `CONTENT_tasks.md` phase 5
  edits them.

**Verify:** `npm run build` lists the static pages unchanged. Every listed page shows the header.
Logged out, nothing in the header leads to sign-in except "Sign in" and "Get my matches".

---

## Phase 2 — Core app

### 2.1 — Match data for the new cards

**Status model:** requirement-based, decided 7 October 2026 ([Open questions](#open-questions)).

**Outcome:** The matching result carries what the cards need, with no change to scores.

**Must-haves:**
- An additive change to `SubjectMatchDetail` (`lib/matching/types.ts`): `kind` (`met`, `grade_short`,
  `level_short`, `not_taken`), `gradeGap`, `studentLevel` and `studentGrade`. Today the detail does
  not carry the student's own grade (audit 3.9).
- A pure helper derives the card status and the chips (`04-design-system.md` §9), with a Vitest
  test per case in the §9 table.
- `npx tsx scripts/run-all-tests.ts` passes unchanged: scores must not move.

### 2.2 — Match card, result row and requirement checklist

**Outcome:** `ProgramCard` (1,278 lines, three jobs) is replaced by MatchCard, ResultRow and
RequirementChecklist. The matches page groups by status. See the canvas boards "Match card: every
state", "Matches" and "Phone · Why this match, opened".

**Must-haves:**
- **Every requirement visible on the card** as a chip with its own status and the student's grade
  ("– Maths HL 7 · you 6"). Problems first; more than four collapse to "+N met" (audit 3.2, 3.9).
- **"Why this match"** opens in place on desktop and phone: needed against actual values, what would
  close the gap, field and country, and the fit score with its weighted parts. Reuse the logic in
  `components/student/MatchBreakdown.tsx`, then delete that file.
- **Status groups** on the matches page, the third collapsed. It shows every match `MAINT_tasks.md`
  5.12 returns, with no "top 10" copy.
- **Either/or requirements** show each option's own level and grade. This is the display half of
  `MAINT_tasks.md` 5.7, which ships to `main` first (prep P6). Reuse its helper here.
- **Honest save.** "Saved" appears only after the server confirms; a failure reverts with a toast.
  Logged out, Save leads to sign-in (a same-origin `callbackUrl` to the program with `?save=1`) and
  saves the program on return. Today it shows "Saved" and stores nothing (audit 4.1).
- No "Refresh Recommendations" button (audit 4.4).
- Delete `ProgramCard.tsx` when nothing imports it.

### 2.3 — Explore: toolbar, phone filter sheet, rows

**Outcome:** Search uses a chip toolbar (Field, Country, IB points, Length), a bottom sheet on phones
with the result count on its button, compact result rows, and 20 results per page with "Show 20
more". See the canvas boards "Explore programs", "Phone · Explore" and "Phone · Filters sheet".

**Must-haves:** filters stay in the URL, as today. "Only ones I qualify for" appears once the student
has a profile. Rows show minimum points large and aligned, and the student's fit when logged in.
Images are 48–64px thumbnails, not full width (audit 3.3).

### 2.4 — Program and university pages

**Outcome:** The program page and university page in the new layout. See the canvas boards "Program
detail" and "Phone · Program (dark)".

**Must-haves:**
- **Breadcrumbs** (Explore / Canada / University of Toronto) instead of `history.back()` links
  (audit 1.4).
- **Requirements always listed**, including the minimum points for logged-out visitors. Today the
  points tile needs a match result, so the block can render empty (audit 4.2; Sydney's Bachelor of
  Science and Doctor of Medicine).
- A fit panel (logged in) or "Sign in and add your grades to check these" (logged out).
- The entry-year note, with the caution style when the requirements are from an older intake.
- When `CONTENT_tasks.md` 8.2 and 8.3 land: the campus city, and the image credit as a caption.

### 2.5 — Shortlist with compare

**Outcome:** "Saved" becomes "Shortlist", with list and compare views built from existing data: fit,
minimum points against the student's, named subjects, country, degree and length, the year checked,
and the official link. See the canvas board "Shortlist and compare". The saved page shows fit,
which it does not today (audit F4 in `03-flows.md`).

---

## Phase 3 — Profile and onboarding

### 3.1 — First-run interest and country steps

**Outcome:** Steps 1 and 2 of onboarding as compact lists. See the canvas boards "Phone · First run,
step 1" and "step 2".

**Must-haves:**
- Real checkboxes in a `<fieldset>` (today `Card` divs with `onClick`, unusable from the keyboard,
  audit 6.3).
- Fields as rows of about 56px with an icon, a name and one line of examples. **A distinct icon per field**:
  Education and Media both fall back to `BookOpen` today. Add them to `lib/icons.tsx` (`fieldIconMap`,
  `iconKeyMap`, `AVAILABLE_FIELD_ICONS`).
- Countries as a two-column grid with a filter box and "Open to anywhere".
- A sticky footer with the count and Continue (today Continue sits below 6 rows of cards, 11 on a phone).
- **Focus mode:** no tab bar; the header shows "Save and exit".
- **A draft is saved after each step.** Today nothing is saved until the last button (`03-flows.md` F1).
- The heading says "Set up your profile" on a first visit and "Update your profile" after
  (audit 1.3).
- Field descriptions come from `CONTENT_tasks.md` 8.1 once it lands.

### 3.2 — Subject editor

**Outcome:** One `ProfileEditor` for first run and editing, with one row per IB group (subject, SL or HL,
grade 1–7), then TOK and EE. It replaces `SubjectSelectorDialog`, `DetailedGradesInput`,
`QuickScoreInput` and `StepIndicator`. See the canvas boards "Academic profile" and "Phone · First
run, step 3".

**Must-haves:**
- Radio semantics for level and grade (audit 6.4). Editing in place: no remove-and-re-add.
- A live total labelled "So far" until six subjects and both core grades are in (audit 5.5).
- Diploma checks through the shared helpers from `MAINT_tasks.md` 5.8 (core points, E blocks saving)
  and 5.13 (3 or 4 HL subjects). Messages match the disabled save button (audit 5.6).
- Lucide icons for TOK and the EE; no emoji (audit 2.7).

### 3.3 — Profile tab and settings

**Outcome:** The phone Profile tab is one hub, and desktop has the same content as Profile page tabs.
`/student/settings` folds into it. See the canvas board "Phone · Profile tab".

**Must-haves:** the predicted total with "Edit subjects and grades"; interests and countries (opening
the 3.1 screens); account (name, school connection, `ThemeSwitch`); your data (download, delete);
sign out. **Keep every current Settings feature.**

---

## Phase 4 — Public pages

### 4.1 — Home page

**Outcome:** The new home page (canvas board "Home"): a hero with a real product preview instead of
the generic illustration, three steps, why the IB matters, country guides, the founder's note, a final
call to action, and the footer.

**Must-haves:** stays static. The hero image is replaced by markup, so no 575 KB PNG source. The copy
fits the sign-in-first flow. The cookie banner follows the owner's decision.

### 4.2 — Country guides on one template

**Outcome:** The 22 guides render from one template and typed data, in the new design. This is
`MAINT_tasks.md` 7.2 done once, here.

**Must-haves:** everything 7.2 lists: static with a one-week revalidate, URLs unchanged, per-country
JSON-LD preserved, the sitemap unchanged. Tokens only, which removes about 4,260 hard-coded palette
classes. Migrate two or three, compare the rendered text before and after, then do the rest. Start straight
after merging the latest `main` into `rebranding`, and port any later country edits from `main`
before release (see [The rebranding branch](#the-rebranding-branch)).

### 4.3 — Other public pages

**Outcome:** `/ib-university-requirements`, `/how-it-works`, `/faqs`, `/contact`, `/support-us`,
the legal pages and sign-in move to the new design, using tokens only.

### 4.4 — Guard against raw palette classes

**Outcome:** A lint rule fails on raw palette classes (`text-blue-600`, `bg-gray-50`, …) in
student-facing code, so the two styling systems cannot drift apart again (audit 2.2). It is a code-quality
rule, not a formatting one, so it does not conflict with Prettier.

---

## Open questions

Both are decided; kept here for the reasoning.

1. **Match status model: requirement-based** (owner, 7 October 2026).
   - **The statuses:** Meets all requirements, Within reach, Missing a requirement, derived from
     `academicMatch` (`04-design-system.md` §9). Each card shows the points margin ("✓ 38 / 33
     points"), so "comfortably above" stays visible without promising admission.
   - **V10's categories are not shown.** `SAFETY` / `MATCH` / `REACH` / `UNLIKELY` from
     `lib/matching/categorization.ts` stay in the code and the API response, unused by the UI. Their copy
     promises an admission likelihood IB Match cannot know, and "Reach" mixes fixable gaps (a point
     short) with unfixable ones (a missing subject or level).
   - Whether to remove the V10 categories belongs to the later matching review.
2. **How a level gap scores: no change for now** (owner, 7 October 2026; `MAINT_tasks.md` 5.15). The
   status groups already separate a level gap from a point gap. Scores only order cards within a group,
   and show inside "Why this match". **Accepted for now:** a "Missing a requirement" card can show a
   higher fit than a "Within reach" one, and 1 and 3 points short score the same. The whole matching
   math is revisited later, separately from the rebranding.

## Related tasks elsewhere

| Task | Where | Relation |
|---|---|---|
| 5.7 | `MAINT_tasks.md` | Either/or groups. Its display half can be done in 2.2 |
| 5.8 | `MAINT_tasks.md` | TOK/EE core points and E blocks saving. Do it before 3.2, which uses its helper |
| 5.12 | `MAINT_tasks.md` | Return every match, not the top 10. Needed by 2.2 |
| 5.13 | `MAINT_tasks.md` | 3 or 4 HL subjects. Do it with 5.8, before 3.2 |
| 5.14 | `MAINT_tasks.md` | Delete unused components. Independent |
| 5.15 | `MAINT_tasks.md` | How a level gap scores. Decided 7 October 2026: no change now; revisit with the whole matching math later |
| 7.2 | `MAINT_tasks.md` | Country pages collapse. Done as 4.2 |
| 8.1–8.3 | `CONTENT_tasks.md` | Fields of study (used by 3.1), campus city and image credits (used by 2.4) |
