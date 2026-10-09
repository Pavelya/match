# Rebranding Roadmap

**Written:** 6 October 2026 · **Covers:** the student-facing redesign decided on 6 October 2026
(Direction B, "Ultramarine"), starting within days

**The order of work.**

1. [Prepare](#step-1--prepare): a short list of MAINT and CONTENT tasks that unblock the rebranding.
2. [Design first](#step-2--design-first): turn the phases below into one task per component and one per
   screen or flow. Each has an approved design before any code.
3. Build **on `main`, behind [the preview switch](#how-the-redesign-reaches-production-the-preview-switch)**,
   in small pull requests. The owner sees the new design through a secret link; every student keeps
   today's site. Compare each change against its approved design.
4. [Release](#from-preview-to-release): one variable and a redeploy switch everyone over. The old design
   is deleted about two weeks later.

Steps 1 and 2 run in parallel: prep is code, step 2 is design and documentation. **Students never see
a mix of old and new.** Only the code holds both versions, until the cleanup.

**Decided 7–8 October 2026 (owner):** a preview switch on `main`, not a long-lived `rebranding` branch.
This is the common practice for large redesigns: small pull requests into the main branch,
unfinished work hidden behind a flag, and release kept separate from deploy. Facebook's 2020 redesign
went the same way: opt-in first, then everyone.

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
| P2 | ~~Choose the logo mark~~ **Done 7 October 2026: Lens, provisionally.** The owner decides on the final mark after seeing all screens in the preview. The clearance search waits for that decision | Owner | 1.3 is no longer blocked. Brand configuration makes a later swap a file change |
| P3 | ~~`MAINT_tasks.md` 5.14: delete unused components~~ **Done 7 October 2026** | AI, tiny | Removes the dead `shared/Header.tsx` and `Footer.tsx` before 1.5 builds the new chrome, so no session builds on them by mistake |
| P4 | ~~`MAINT_tasks.md` 5.8 with 5.13: TOK/EE core points, 3 or 4 HL subjects, E blocks saving, and the 20-row data fix (the owner approves the data fix)~~ **Done 7 October 2026**, data fix applied | AI, small | The new cards put the points total front and centre ("38 / 37 points"), so stored totals must be right. 3.2 builds on both helpers |
| P5 | ~~`MAINT_tasks.md` 5.12: every match, not the top 10~~ **Done 7 October 2026**: up to 50. Profiles have 63 matches at the median and up to 592, so 77 of 142 still see the best 50 | AI, small | The status groups (2.2) are designed and reviewed on the full list |
| P6 | ~~`MAINT_tasks.md` 5.7: levels and grades in either/or groups~~ **Done 7 October 2026**: `groupRequirements` in `lib/programs/requirement-groups.ts` | AI, small | Recommended, not blocking. Students saw "English B or English B" in 436 groups, and 2.2 reuses the helper |
| P7 | ~~`CONTENT_tasks.md` 8.1: one home per discipline in the fields of study (the owner approves the mapping)~~ **Done 7 October 2026**, applied: 135 programs re-filed, new descriptions in `FIELD_DESCRIPTIONS` (`lib/programs/fields-of-study.ts`) | AI, medium | It changes which programs match, so it should land before the matches screens are reviewed with real data. 3.1 uses the new descriptions |
| P8 | ~~`CONTENT_tasks.md` 8.2 and 8.3: campus city and image credits (each one migration)~~ **Done 7 October 2026**, both migrations and data applied: `campusCity` on 50 programs, one city per university, 66 credits in `University.imageCredit` | AI, small each | Needed by 2.4. Can run during phase 1 |
| S1 | ~~**The preview switch** (task [0.1](#01--the-preview-switch))~~ **Done 8 October 2026** (PR #65): `showsNewUi()` in `lib/new-ui.ts`, `/api/preview`, the preview bar. Verified on production: visitors get the prebuilt pages unchanged, wrong keys get a 404, the link shows the new design | AI, small | Every rebranding pull request depends on it. It replaces the earlier branch setup (B1–B3), which is no longer needed |
| S2 | ~~In Vercel, add `NEW_UI_PREVIEW_KEY` to **Production** and **Preview**: a long random string, for example from `openssl rand -hex 24`. At least 32 characters, or the build fails (`lib/env.ts`). Redeploy, then bookmark `https://<site>/api/preview?key=<key>`~~ **Done 8 October 2026** | Owner, minutes | Before S1 is verified; without it nobody can see the new design. Keep the link private. A leaked link shows only an unfinished design, and changing the key closes it |

**Not needed before the rebranding:**

- `MAINT_tasks.md` 5.6, 5.9, 5.10, 5.11, 5.15 (level-gap scoring changes order, not design), 5.16 (admin
  forms only), 6.6, 7.1.
- `CONTENT_tasks.md` 5.3 (France), 5.4 (how competitive), 6 (USA), 7 (Germany).

One coordination rule: country-page edits in CONTENT (France's new page, the US and German pages)
land on `main` as usual. Once 4.2 has moved a country onto the new template, an edit to that country
goes into both versions until release, so do 4.2 late.

### How the redesign reaches production: the preview switch

- **Everything merges into `main` in small pull requests**, public and signed-in pages alike. Each new
  page or component sits beside the old one, and the switch (task 0.1) decides which one renders.
- **The owner sees the new design through a secret link.** Opening `/api/preview?key=…` once turns
  on Next.js Draft Mode for that browser. Every page, public or signed in, then shows the new design.
  Everyone else keeps getting today's site, and static pages stay prebuilt for them. The preview ends
  when the browser closes, at "Exit", or at the next deploy; open the link again.
- **Tested 8 October 2026** on Next.js 16.3.4, in a throwaway app run locally:
  - a page with a one-week revalidate that checks Draft Mode still built as Static;
  - visitors got the prebuilt old page, before and after a preview;
  - the secret link gave the new page, rendered fresh;
  - a wrong key got a 404.

  Reading a URL parameter in the page instead made it Dynamic. That is why the key sets a cookie
  once, rather than staying in every URL.
- **Where to review:** production, with the link, signed in and signed out. Pull request previews
  work the same way, since the key is set there too. Seeing every screen together is also when the
  final logo is decided.
- **Cost:** while previewing, the owner's page views render on demand instead of from the cache, and
  the small reference lists in `lib/reference-data.ts` are read on each view instead of hourly.
  Negligible for one person. Nobody else's views change.
- **New code sits next to the old.** New screens and components live in their own files, so old
  screens are not edited. The new tokens apply only under `data-ui="next"`, which only the new design
  sets.
- **Data never waits.** Migrations and data fixes go to `main` through their own tasks, as in step 1.
- **Not chosen** (7–8 October 2026):
  - **A long-lived `rebranding` branch:** weeks of drift and weekly merges, and a big-bang release
    that can only be undone as a whole.
  - **An email allowlist:** it cannot reach static pages, which are prebuilt and never see who is
    visiting.
  - **A URL parameter on every link:** lost on the first click, and reading it makes static pages
    dynamic.
  - **A separate Vercel environment or project:** more setup for the same result, and still one
    database.

### From preview to release

1. **Preview.** Only the owner, through the link. All phases are built and reviewed here. For early
   feedback, the link can go to a few students; no code is needed.
2. **Release day (R.1).** Set `NEW_UI_FOR_EVERYONE=true` and redeploy: everyone gets the new design at
   once. **Rollback** is the reverse: set it to `false` and redeploy.
3. **Cleanup (R.2)**, after about two stable weeks: one design left in the code.

## Step 2 — Design first

**Nothing is coded before its design is approved.** Every design task below goes through the same
stages, and changes are made in the first two, while they are still cheap:

1. **Draw.** A session completes the task's boards on the canvas: phone and desktop, light and dark,
   and every state in the last-but-one column. New boards go in new rows on the canvas, named as in
   the tables.
2. **Review and fix.** The owner comments on the boards. Fixes are made on the canvas, not in code,
   and reviewed again.
3. **Approve.** The owner comments "Approved" on each board. The next session writes the date in the
   table's last column.
4. **Build.** Only then can a build task whose **design gate** lists it start. Its pull request puts
   screenshots next to the boards (design QA). A visual change that is not on an approved board is
   not merged.

Design runs ahead of the build, in the order of [Start here](#start-here), which lists each build
session's gate.

**The design gate: what a board must show before it can be approved.**

- **Components:** every interaction state that applies (default, hover, focus, active, disabled,
  loading, error), in light and dark. Screens reuse them, so screen boards need not repeat hover and
  focus.
- **Patterns and screens:** phone (390px) and desktop (1440px), light and dark (a dark switch on the
  board counts), and every content state that applies: loading, empty, error, signed in and signed
  out, profile incomplete, a missing image, a long name.

### How a design session works

A prompt such as "Do design task D1.2" or `/design D1.2` is enough: these are the standing instructions.

1. Read this Step 2, the task's row, and the documents the row or its build task names (usually
   `04-design-system.md`, `03-flows.md` and audit references).
2. Work on the [canvas](#where-the-design-lives). **Never change an approved board.** A change to
   one is a new board, reviewed again. New boards go in a new row, named as in the table.
3. Draw everything in the row's "To add before review" column, to [the design gate](#step-2--design-first):
   phone and desktop, light and dark, every state that applies.
4. Use real content: real program, university and subject names and real requirements. Read the
   database with aggregates or a narrow `select` only (`AGENTS.md`, cost).
5. **Design only:** no app code. Stop when the boards are ready, and tell the owner which boards to
   review and what changed.
6. Fixes from the owner's comments are made on the canvas. When the owner approves, on the board or
   in chat, write the date in the row's "Approved" column. Do it on a new branch from `origin/main`,
   in a docs pull request.

**Where it stands, 9 October 2026.** The canvas has 41 boards. The owner approved in chat "B ·
Foundations", "Theme: System, Light, Dark" and the three "D1.2 Type" boards on 8 October (D1.1 to
D1.4), then the seven row 2 boards (D2.1 to D2.5, D2.7, D2.8) and both "D1.4 Theme" change boards
(chosen edge, phone size) on 9 October. The same day the owner decided the site chrome's open
questions and approved the four row 8 boards: "D2.12 Header", "D2.13 Footer", "D2.14 Phone tab bar"
and a third D1.4 change, "D1.4 Account menu". Then the two row 9 boards, "D1.5 Logo: Lens" and
"D1.5 Share image", with one mark in both themes (D1.5). Eighteen tasks need a screen size or states
added. Ten have no board.

### Foundations

| Task | On the canvas today | To add before review | Approved |
|---|---|---|---|
| D1.1 Colour tokens | "B · Foundations": every token in light and dark, with its contrast ratio, and the focus outline | Nothing | 8 October 2026 |
| D1.2 Type | "B · Foundations": the desktop scale in Newsreader and Geist. "D1.2 Type · phone sizes", "D1.2 Type · phone, light" and "D1.2 Type · phone, dark": the sizes below 768px, the longest real names at 390px, and the rules that go with them | Nothing | 8 October 2026: the desktop scale, then the phone sizes |
| D1.3 Space, radius, elevation, motion, icons | "B · Foundations" | Nothing | 8 October 2026 |
| D1.4 Theme: System, Light, Dark | "Theme: System, Light, Dark": the account menu in light and dark, the public footer on desktop and phone. "Phone · Profile tab" has the Appearance row. Two changes in row 7: "D1.4 Theme · chosen edge" (the chosen option gets the 1px line-3 edge from D2.4) and "D1.4 Theme · phone size" (options 44px tall below 768px). A third in row 8: "D1.4 Account menu" (Settings, FAQs, Contact, Appearance, Sign out; "Profile and settings" and Shortlist leave, since Academic and Shortlist are in the nav, decided 9 October 2026) | Nothing | 8 October 2026; the chosen edge, the phone size and the account menu 9 October 2026 |
| D1.5 Logo: Lens | "Logo options and clearance": Lens, chosen provisionally on 7 October 2026. "D1.5 Logo: Lens" (row 9): two drawings of the mark, the page mark for 24px and up and a favicon with a lens 25% larger for 16 and 32px; the mark at 16, 32 and 180px in light and dark, in browser tabs, on a home screen and in Windows contrast themes; the email header; the seven files 1.3 makes. "D1.5 Share image" (row 9): the Open Graph image at 1200 × 630. **Decided 9 October 2026 (owner):** one mark in both themes, the #2B3FD6 square with the lime lens, rather than the lighter #8E9BFF square that D2.12 and D2.13 draw in dark | Nothing | 9 October 2026 |

### Components

On "B · Components" unless another board is named. That board is light only. The account menu and
theme switch are in D1.4.

| Task | On the canvas today | To add before review | Approved |
|---|---|---|---|
| D2.1 Button | "D2.1 Button" (row 7): primary, secondary, link and icon in every state, light and dark; the Save toggle from Save to Saving to Saved, and signed out. Loading is the label "Saving…", never a spinner | Nothing | 9 October 2026 |
| D2.2 Text input and search | "D2.2 Text input and search" (row 7): the sign-in email, the IB points range and the Explore search in every state, and on a phone. Field edges use the new line-3 token (owner, 8 October 2026) | Nothing | 9 October 2026 |
| D2.3 Select and subject picker | "D2.3 Select and subject picker" (row 7): a native select (the Matches sort order); the subject picker closed, open, filtered by typing, with no results, and on a phone | Nothing | 9 October 2026 |
| D2.4 Segmented control | "D2.4 Segmented control" (row 7): level, grades 1–7 and TOK and EE A–E, with focus, disabled and an E blocking saving. The chosen segment gets a 1px line-3 edge (owner, 8 October 2026) | Nothing | 9 October 2026 |
| D2.5 Chips | "D2.5 Chips" (row 7): filter, on/off and removable chips with "Clear all", in every state. No flags on country chips (owner, 8 October 2026); SVG flags in the country picker (D4.4) only if ever wanted | Nothing | 9 October 2026 |
| D2.6 Checkbox rows and grid | "Phone · First run, step 1" and "step 2" | Focus, the limit reached ("5 of 5"), desktop width, dark | |
| D2.7 Status badge and requirement chip | "D2.7 Status badge and requirement chip" (row 7): every badge and every chip case in §9, light and dark. Notes carry Lucide's Info icon; "+N met" is green with a tick (owner, 8 October 2026) | Nothing | 9 October 2026 |
| D2.8 Card and skeleton | "D2.8 Card and skeleton" (row 7): the card's surfaces and states; skeletons for the match card, the result row and the program page, desktop and phone. Card edges are a real border, not a box-shadow hairline | Nothing | 9 October 2026 |
| D2.9 Toast | None | **No board.** "Saved", and a save that failed and was undone (2.2) | |
| D2.10 Confirm dialog | None | **No board.** Delete account (3.3) | |
| D2.11 Empty and error states | None | **No board.** One layout for no matches, no results, an empty shortlist and a failed load | |
| D2.12 Header | "D2.12 Header" (row 8): desktop signed in and signed out, 768 to 1023px, the phone header signed out (Sign in, Menu) and signed in (Guides, the avatar and its panel), a student editing their profile, focus mode, every state, light and dark. **Decided 9 October 2026 (owner):** prebuilt public pages show the signed-out header to everyone, and "Sign in" goes to `/student`; no search box in the header; Guides in the phone header; "Save and exit" saves the step, then goes to Home; Academic is the fourth place, in the nav and on the tab bar; Menu signed out and the avatar signed in, never both | Nothing | 9 October 2026 |
| D2.13 Footer | "D2.13 Footer" (row 8): desktop and phone, signed out and above the tab bar, light and dark. Three link groups on every page, Students, About and Legal, with Support us under About | Nothing | 9 October 2026 |
| D2.14 Phone tab bar | "D2.14 Phone tab bar" (row 8): each tab current, every state, light and dark, and hiding on scroll. **Decided 9 October 2026 (owner):** Matches · Explore · Shortlist · Academic; the bar hides on scroll down and shows on scroll up, as today. Approved with the board: Lucide's List checks for Matches (the Rings mark was rejected on 8 October), a brand-soft pill behind the current tab's icon, no count on Shortlist | Nothing | 9 October 2026 |
| D2.15 Bottom sheet | "Phone · Filters sheet" | Dark | |

### Patterns

| Task | On the canvas today | To add before review | Approved |
|---|---|---|---|
| D3.1 Match card | "Match card: every state" (desktop, every requirement case, from the real algorithm); "Phone · Matches" | Saving, saved and a failed save; a long program name; dark. The card on "B · Components" predates this board and still shows a text line; replace it. **Long and either/or requirements** (owner's question, 8 October 2026), drawn from the worst real cases. Production, 8 October 2026: 1,326 of 1,367 programs name four requirements or fewer, and 41 name five or six. 1,697 of the 2,170 requirements are either/or groups of 2 to 45 options, and 466 groups mix levels or grades. Proposed: every requirement is a chip, problems first, at most four, and only met ones collapse to "+N met", so a problem is never hidden. A met group names the option that met it ("via Physics"). An unmet one names the student's nearest option and how many others there are. Every option with its own level and grade appears only in "Why this match" and on the program page. **Short course names** ("Maths AA", owner, 9 October 2026): the list in `lib/ib/course-names.ts` (2.1); the board confirms or changes it | |
| D3.2 Why this match | Open on "Match card: every state" (desktop) and on "Phone · Why this match, opened" | Dark | |
| D3.3 Result row | "Explore programs" (desktop table), "Phone · Explore" (list) | Signed out, and signed in without a profile (no fit); dark on phone | |
| D3.4 Requirement checklist | "Program detail", Components | Signed out (no "You" column, "Sign in and add your grades to check these"); either/or groups with each option's level and grade | |
| D3.5 Filter toolbar | "Explore programs" (chips closed), "Phone · Filters sheet" | Each desktop chip opened (Field, Country, IB points, Length); dark | |
| D3.6 Subject editor | "Academic profile" (desktop, interactive), "Phone · First run, step 3" | The diploma checks' messages (3 or 4 HL, an E in TOK or the EE, a group with no subject), the picker open, dark on phone | |
| D3.7 Compare table | "Shortlist and compare" (desktop) | Phone: how four programs compare at 390px | |

### Screens and flows

| Task | On the canvas today | To add before review | Approved |
|---|---|---|---|
| D4.1 Home | Desktop, signed out, with a dark switch | **Phone**; the cookie banner once the owner decides | |
| D4.2 Sign-in | None | **No board.** Sign-in, "Check your email" and the sign-in error, phone and desktop | |
| D4.3 First run, step 1: interests | Phone, light | Desktop, dark | |
| D4.4 First run, step 2: countries | Phone, light | Desktop, dark, a country filter with no results | |
| D4.5 First run, step 3: subjects | Phone, light | Desktop, dark, the diploma checks failing | |
| D4.6 Matches | Desktop (interactive, dark switch), phone, phone "Why this match" | Phone dark; loading; no matches; profile incomplete (`03-flows.md` F6); a failed load | |
| D4.7 Explore | Desktop (dark switch), phone, phone filters sheet | Signed out; no results; loading the next 20; phone dark | |
| D4.8 Program page | Desktop signed in (dark switch); phone signed in, dark only | Signed out on both; phone light; the image credit caption; no image; a program the student is missing a requirement for; not found | |
| D4.9 University page | None | **No board.** Phone and desktop | |
| D4.10 Shortlist | Desktop compare (dark switch) | Desktop list view; phone list and compare; an empty shortlist | |
| D4.11 Academic profile and settings | Desktop "Academic profile", Subjects and grades tab only (dark switch); "Phone · Profile tab" | The split decided on 9 October 2026 (3.3): the Academic page (subjects and grades, interests, countries) and Settings (account, your data); the desktop Interests, Countries and Account content; unsaved changes; a failed save; delete account; phone dark | |
| D4.12 Country guide template | None | **No board.** Phone and desktop, drawn from one guide's real content | |
| D4.13 Requirements hub | None | **No board.** `/ib-university-requirements` | |
| D4.14 Text pages | None | **No board.** How it works, FAQs, Contact, Support us and the legal pages | |
| D4.15 404 and error pages | None | **No board** | |
| D4.16 School invitation | None | **No board.** Same flow, new look (`03-flows.md`) | |

**Decided 7 October 2026:** the match status model is **requirement-based** (Meets all requirements,
Within reach, Missing a requirement). See [Open questions](#open-questions).

---

## Start here

This is the build order. **A session starts only when every design task in its gate is approved**
([Step 2](#step-2--design-first)), so the design work runs a session or two ahead. **Every session
merges into `main`, behind the preview switch.**

| # | Session | Tasks | Design gate | Size | Notes |
|---|---|---|---|---|---|
| 0 | The preview switch | 0.1 | — | small | **Done 8 October 2026** |
| 1 | Tokens, type and theme | 1.1, 1.4 | D1.1–D1.4 | medium | **Done 8 October 2026.** Same files (`app/globals.css`, `app/layout.tsx`). After this, the preview shows the new colours |
| 2 | Primitives | 1.2 | D2.1–D2.5, D2.7, D2.8; the D1.4 changes | medium | **Done 9 October 2026.** Button, Input, Select, Chip, Segmented, StatusBadge, Card, Skeleton. Also the chosen edge and 44px phone options on `ThemeSwitch` |
| 3 | Site chrome | 1.5 | D1.4 (with "D1.4 Account menu"), D2.12–D2.14 | medium | **Done 9 October 2026.** Header, footer and phone tab bar on every student-facing page; static pages stay static. First run's focus mode moved to 3.1 |
| 4 | Logo | 1.3 | D1.5 | small | **Done 9 October 2026.** Lens, provisionally, from `lib/brand/config.ts` and seven files in `public/brand/`. The final mark and the clearance search are needed before release day |
| 5 | Match data | 2.1 | None | small | **Done 9 October 2026.** Requirement-based statuses (decided 7 October 2026): `deriveMatchStatus` in `lib/matching/match-status.ts`. Scores unchanged |
| 6–7 | Match card and results | 2.2 | D2.9, D2.11, D3.1, D3.2, D3.4, D4.6 | large | Replaces `ProgramCard` |
| 8 | Explore | 2.3 | D2.15, D3.3, D3.5, D4.7 | medium | |
| 9 | Program and university pages | 2.4 | D3.4, D4.8, D4.9 | medium | |
| 10 | Shortlist and compare | 2.5 | D3.7, D4.10 | medium | |
| 11 | First-run steps | 3.1 | D2.6, D4.3, D4.4 | medium | |
| 12 | Subject editor | 3.2 | D3.6, D4.5 | medium | After `MAINT_tasks.md` 5.8 and 5.13, whose helpers it uses |
| 13 | Academic profile and settings | 3.3 | D2.10, D4.11 | medium | |
| 14 | Home | 4.1 | D4.1 | medium | |
| 15 | Country guides | 4.2 | D4.12 | large | Late (see the coordination rule). Two or three first, then the rest. This is `MAINT_tasks.md` 7.2, done once in the new design |
| 16 | Other public pages and the guard | 4.3, 4.4 | D4.2, D4.13–D4.16 | medium | |
| 17 | Release day | R.1 | — | small | One variable and a redeploy |
| 18 | Cleanup | R.2 | — | medium | About two weeks later |

### Run order: design, approve, build

The owner's sequence, one row at a time. In each row, run the design session, approve its boards
(✋), then run the build session. A row lists only the design work still to do; the Design gate
column above also lists the designs already approved. The next row's design can start while the current row builds.
Rows 3 and 4 can share a design session.

| Row | 1 · Design session | 2 · ✋ You approve | 3 · Build session | Status |
|---|---|---|---|---|
| 0 | None | None | Preview switch (0.1) | Done 8 October 2026 |
| 1 | `/design D1.2`: type on a phone | D1.2. D1.1, D1.3 and D1.4 were approved on 8 October 2026 | `/build 1`: tokens, type and theme (1.1, 1.4) | Done 8 October 2026 |
| 2 | `/design D2.1–D2.5, D2.7, D2.8`: button, input, subject picker, segmented control, chips, status badge, card and skeleton | Those seven boards | `/build 2`: primitives (1.2) | Done 9 October 2026 |
| 3 | `/design D2.12–D2.14`: header, footer, phone tab bar | Those three boards and "D1.4 Account menu". The rest of D1.4 is already approved | `/build 3`: site chrome (1.5) | Done 9 October 2026 |
| 4 | `/design D1.5`: Lens at every size | The logo board | `/build 4`: the logo from configuration (1.3) | Done 9 October 2026 |
| 5 | None | None | `/build 5`: match data (2.1) | Done 9 October 2026 |
| 6–7 | `/design D3.1, D3.2, D3.4`: match card, "Why this match", requirement checklist. Then `/design D2.9, D2.11, D4.6`: toast, empty and error states, the Matches screen | Those six boards | `/build 6–7`: match card and results (2.2) | |
| 8 | `/design D2.15, D3.3, D3.5, D4.7`: bottom sheet, result row, filter toolbar, Explore | Those four boards | `/build 8`: Explore (2.3) | |
| 9 | `/design D4.8, D4.9`: program and university pages | Those two boards. D3.4 is approved in row 6–7 | `/build 9`: program and university pages (2.4) | |
| 10 | `/design D3.7, D4.10`: compare table, Shortlist | Those two boards | `/build 10`: shortlist and compare (2.5) | |
| 11 | `/design D2.6, D4.3, D4.4`: checkbox rows, first-run steps 1 and 2 | Those three boards | `/build 11`: first-run steps (3.1) | |
| 12 | `/design D3.6, D4.5`: subject editor, first-run step 3 | Those two boards | `/build 12`: subject editor (3.2) | |
| 13 | `/design D2.10, D4.11`: confirm dialog, profile and settings | Those two boards | `/build 13`: profile tab and settings (3.3) | |
| 14 | `/design D4.1`: Home on a phone | First decide whether the cookie banner stays (owner decisions), then the Home board | `/build 14`: Home (4.1) | |
| 15 | `/design D4.12`: country guide template | The template board | `/build 15`: country guides (4.2) | Late: see the coordination rule |
| 16 | `/design D4.2, D4.13–D4.16`: sign-in, requirements hub, text pages, 404 and error pages, school invitation | Those five boards | `/build 16`: other public pages and the guard (4.3, 4.4) | |
| 17 | None | Confirm the final logo. A new mark needs its clearance search back first. The Search Console baseline is noted (owner decisions) | `/build 17`: release day (R.1). You set `NEW_UI_FOR_EVERYONE=true` | |
| 18 | None | None | `/build 18`: cleanup (R.2) | About two weeks after release |

### How a build session works

A prompt such as "Do build session 1" or `/build 1` is enough: these are the standing instructions.

1. Find the session's row above. **Check its design gate first:** every design task it lists needs a
   date in its "Approved" column in Step 2. If one is missing, stop and say which.
2. Read the task sections, [Standing context](#standing-context), the
   [Definition of done](#definition-of-done) and the approved boards on the canvas.
3. Branch from `origin/main`, and check the branch before every commit. Build behind the
   [preview switch](#how-the-redesign-reaches-production-the-preview-switch), with new files next to
   the old ones.
4. The pull request runs the `AGENTS.md` verification and puts screenshots next to the approved
   boards. The owner merges. Tick the task in [The full list](#the-full-list) in the same pull
   request.

---

## The full list

Phase 0 — Setup

- [x] 0.1 The preview switch (8 October 2026)

Phase 1 — Foundations

- [x] 1.1 Tokens and type (8 October 2026)
- [x] 1.2 Primitives (9 October 2026)
- [x] 1.3 Brand configuration and the new logo (9 October 2026)
- [x] 1.4 Theme switching: System, Light, Dark (8 October 2026)
- [x] 1.5 Site chrome on every student-facing page (9 October 2026)

Phase 2 — Core app

- [x] 2.1 Match data for the new cards (9 October 2026)
- [ ] 2.2 Match card, result row and requirement checklist
- [ ] 2.3 Explore: toolbar, phone filter sheet, rows
- [ ] 2.4 Program and university pages
- [ ] 2.5 Shortlist with compare

Phase 3 — Profile and onboarding

- [ ] 3.1 First-run interest and country steps
- [ ] 3.2 Subject editor
- [ ] 3.3 Academic profile and settings

Phase 4 — Public pages

- [ ] 4.1 Home page
- [ ] 4.2 Country guides on one template
- [ ] 4.3 Other public pages
- [ ] 4.4 Guard against raw palette classes

Release

- [ ] R.1 Release day
- [ ] R.2 Cleanup

Owner decisions — not AI work

- [x] Choose the logo mark: **Lens, provisionally** (7 October 2026). Final decision after seeing all
  screens in the preview
- [x] Choose how the redesign reaches production: **a preview switch on `main`** (7–8 October 2026)
- [ ] Before release day, confirm the final mark. If it is a new mark (Lens or another), commission
  a trademark clearance search: EUIPO and USPTO, figurative marks, Nice classes 41 and 42
- [x] Set the preview key in Vercel and bookmark the link (S2, 8 October 2026)
- [ ] Optional: share the preview link with a few students for feedback before release
- [x] Choose the match status model: **requirement-based** (7 October 2026)
- [ ] Decide whether the cookie banner stays (`MAINT_tasks.md`, owner tasks). Affects 4.1
- [ ] Before release day, make sure Google Search Console covers the site (the January 2026 SEO plan
  left this open), and note a baseline: indexed pages, clicks and the top pages for the last three
  months. R.1 and R.2 compare against it

---

## Standing context

**Read this before starting any task below**, after the standing context in `MAINT_tasks.md`.

### Where the design lives

- **Docs:** `docs/UX/design-refresh-2026/`. `README.md` has the decisions, `01-audit.md` the
  findings, `03-flows.md` the flows, and `04-design-system.md` the tokens, components and
  implementation notes (§8 brand config, §9 match status, §10 theme).
- **Canvas:** https://claude.ai/artifact/TyMyphwJN7iwx3rSPLsjuH (private to the owner). Rows 2–4 hold
  the system and the pages; row 5 has the latest boards (match states, phone "Why this match",
  theme, logo). Boards for the design tasks go in new rows, named as in
  [Step 2](#step-2--design-first).

### Decisions, 6 October 2026

| | |
|---|---|
| Direction | B, "Ultramarine" |
| Colour | Brand #2B3FD6 on paper #F7F6F2; lime #D5F36B for brand moments only |
| Type | Newsreader for display (22px and up), Geist for UI; Geist Mono dropped |
| Logo | **Lens, provisionally** (7 October 2026); the final decision comes after seeing all screens. A new mark needs a clearance search before release. **Loaded from configuration, never hard-coded** |
| Where the work lives | **On `main`, behind a preview switch** (7–8 October 2026): the owner sees the new design through a secret link, everyone else sees today's site. Release is one variable and a redeploy |
| Match score | Status first; the percentage only inside "Why this match" |
| Dark mode | Follows the OS by default, with a toggle in the account menu behind the avatar (desktop and phone, since 9 October 2026) and in the footer |
| Navigation | **Matches · Explore · Shortlist · Academic** (9 October 2026): the phone tab bar, and the desktop nav with Guides. The account is in the avatar's panel. On a phone, Menu only when signed out. The tab bar hides on scroll down and shows on scroll up, as today |
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
6. **Static pages stay static.** The 23 `study-in-*` guides, `/` and `/ib-university-requirements` are
   prerendered. Nothing may call `auth()`, `cookies()` or `headers()` on them. `showsNewUi()` (0.1) is
   the one exception: Draft Mode keeps them static. `npm run build` must still list them `○ (Static)`.
7. **No new database reads.** The theme lives in `localStorage`. Use `select` over `include` in
   anything touched.
8. **Budget** (production, 5 October 2026: JS 171 KB, CSS 22 KB, fonts 52 KB, CLS 0): no more JS,
   CSS at most 32 KB, fonts at most 60 KB, CLS stays 0.
9. **Every OS:** Chrome on Windows, Safari on macOS and iOS, at 1440px and 390px, light, dark and
   forced colours, 200% zoom.
10. **Tests:** Vitest for new pure helpers, plus the AGENTS.md verification commands.
11. **Hidden until release:** without the preview link, every page is unchanged, and `npm run build`
    lists the same pages as Static as before.
12. **SEO parity** on every page a search engine sees (everything outside `/student`):
    - **Switch the content, not the SEO.** `metadata` or `generateMetadata` and the JSON-LD stay in
      `page.tsx`, outside the `showsNewUi()` branch, so both designs share one copy. Public pages
      already keep them there, most with their content in a separate component (`UKContent`,
      `ProgramDetailClient`, …). The only intended differences are the logo URL (1.3) and the new
      breadcrumbs (2.4). Any other change to titles, descriptions or structured data is a separate
      pull request.
    - **One `<h1>`** with the same meaning as today, headings in order with no skipped level, and the
      logo is not a heading. Every fact the old page showed is still on the page.
    - **Text stays in the server HTML.** Whatever the structured data describes (FAQ answers,
      requirements) is visible on the page. A collapsed section is fine; text fetched on click is not.
    - Real `<a href>` links for navigation and breadcrumbs. Descriptive `alt` text on content images,
      `alt=""` on decorative ones.
    - **Check:** the pull request shows the SEO snapshot (1.5) of each changed page type, without and
      with the preview link, and explains every difference.

---

## Phase 0 — Setup

### 0.1 — The preview switch

**Outcome:** One server-side helper decides which design a request gets. A secret link turns the new
design on for one browser, through Next.js Draft Mode. Students see no change.

**Must-haves:**
- Read `node_modules/next/dist/docs/01-app/02-guides/draft-mode.md` first.
- `lib/new-ui.ts`, server-only: `showsNewUi()` is true when `NEW_UI_FOR_EVERYONE` is `true`, or when
  Draft Mode is on (`(await draftMode()).isEnabled`). Add `NEW_UI_FOR_EVERYONE` and
  `NEW_UI_PREVIEW_KEY` to `lib/env.ts` as optional. Neither is `NEXT_PUBLIC_`.
- `app/api/preview/route.ts` (GET, `?key=`):
  - compare the key with `NEW_UI_PREVIEW_KEY` in constant time (`crypto.timingSafeEqual`);
  - a missing key, a wrong key or an unset variable gets a 404;
  - the right key enables Draft Mode and redirects to `/`, never to a URL taken from the request.

  `app/api/preview/exit/route.ts` (POST) disables it and redirects to `/`. `proxy.ts` already skips
  `/api`.
- The root layout calls `showsNewUi()` once. For the new design it sets `data-ui="next"` on `<html>`,
  the hook for the scoped tokens (1.1). For everyone else, `<html>` stays exactly as today.
- A page that has a new version branches the same way:
  `return (await showsNewUi()) ? <NewPage /> : <OldPage />`.
- A small "New design preview · Exit" bar while Draft Mode is on, but not once everyone has the new
  design. A reviewer always knows which design is showing.
- Vitest for the key check (missing, wrong, different length, right), and for `showsNewUi()` with
  `next/headers` mocked.

**Verify:**
- `npm run build` lists the same pages as Static as before.
- On this pull request's Vercel preview, once the owner has set the key (S2):
  - without the link, the HTML is unchanged;
  - with the link, `<html data-ui="next">` and the preview bar appear;
  - a wrong key gets a 404;
  - Exit returns to today's site.
- After merging, the same check on production.

---

## Phase 1 — Foundations

### 1.1 — Tokens and type

**Outcome:** `app/globals.css` carries the Direction B tokens in light and dark, and the app uses
Newsreader and Geist.

**Design gate:** D1.1, D1.2 and D1.3, approved ([Step 2](#step-2--design-first)).

**Must-haves:**
- **Scoped to `[data-ui="next"]`** (set on `<html>` by 0.1), **not bare `:root`**, so old screens keep
  today's look until release.
  Inside the scope, re-point the shadcn variables (`--background`, `--primary`, `--muted`, …) to the new
  values and add the semantic ones (`--ok`, `--close`, `--gap` and their `-soft` pairs,
  `--brand-soft`, `--ink-3`, `--lime`) (`04-design-system.md` §1). They move to `:root` at cleanup
  (R.2).
- Every token pair passes the Definition of done's contrast rule. The table in §1 lists the
  intended ratios; measure them again.
- Fonts through `next/font`, latin subset, variable. Newsreader gets `preload: false` until cleanup,
  so today's pages don't download it; the browser fetches it only where the new design uses it. Geist
  Mono goes with `NoAISection.tsx` (`app/how-it-works/_components/NoAISection.tsx:32`, its only use) when
  4.3 rebuilds How it works.
- Type as in §2, with the phone sizes below 768px set by the tokens, not by components, and the rules
  under the table.
- Radius, spacing, elevation and motion tokens as in §3.

**Verify:** the contrast table in the PR; build static as before; font transfer at most 60 KB; type at
390px and 1440px matches the D1.2 boards; without the preview link, today's colours.

**Done 8 October 2026.** Newsreader is a static 500 cut at optical size 36, self-hosted: the variable
font missed the font budget (`04-design-system.md` §2). The owner chose the static cut on 8 October. The type styles are `text-display-xl` to
`text-total`, and the contrast check runs in `app/globals.test.ts`.

### 1.2 — Primitives

**Outcome:** Button, Input, Select, Chip, Segmented, StatusBadge, Card and Skeleton in the new style,
built from the tokens, **as new components in their own folder** (for example `components/ds/`). Today's
`components/ui/` stays untouched for the old screens until cleanup.

**Design gate:** D2.1 to D2.5, D2.7 and D2.8, approved ([Step 2](#step-2--design-first)), and the two
D1.4 change boards for `ThemeSwitch`.

**Must-haves:**
- **Focus is an outline**, not `outline-none` plus a box-shadow ring (today `components/ui/button.tsx:8`,
  `input.tsx:18`). Tailwind v4's `outline-none` and `outline-hidden` differ: read its docs in
  `node_modules/tailwindcss` first.
- Segmented controls and chips use radio, checkbox or `aria-pressed` semantics.
- Heights 36, 44 and 52; one radius; 44px touch targets.
- Skeleton is a static tint the size of the final content. No shimmer.
- **Decided on the boards** (owner, 8 and 9 October 2026; canvas row 7):
  - A new token, `--line-3` (#858277 light, #6B7180 dark), for field edges: 3.6 to 3.9:1 where
    `--line-2` is 1.5 to 1.7:1. `--input` points to it, so fields, checkboxes and the switch track
    follow; `--line-2` stays for decorative edges. Add its pairs to `app/globals.test.ts`.
  - Loading is a label ("Saving…"), never a spinner. A disabled button uses `aria-disabled`, stays
    focusable and names its reason next to it.
  - The chosen segment has a 1px `--line-3` edge, 3.3:1 against its track. `ThemeSwitch` gets the
    same edge, and options 44px tall below 768px ("D1.4 Theme · chosen edge" and "· phone size").
  - Chips are 36px tall and 8px apart, with a 44px hit area. No flags on country chips.
  - A card's edge is a real 1px border, not a box-shadow hairline, so it survives forced colours.

**Verify:** keyboard and forced-colours check on a page using each primitive.

**Done 9 October 2026.** In `components/ds/`, nothing placed yet:

- `Button` (primary, secondary, link; 36, 44 and 52px, and a 44px icon button), `ButtonLink` for an
  `<a>`, and `SaveToggle` (word and icon, Save to Saving… to Saved, a sign-in link when signed out).
  `buttonVariants` lives in `button-variants.ts` so server components can use it.
- `Input`, `TextField`, `FieldMessage` (hint or error) and `SearchInput`. `Field.tsx` holds the field box
  that Select and SubjectPicker share.
- `Select`, the native select. Chrome and Edge draw its open list in the new style (`.ds-select` in
  `app/globals.css`, customisable select); Safari and Firefox keep their own menu.
- `SubjectPicker`, the combobox for the subject editor (3.2). Its filtering is `picker-filter.ts`, with
  Vitest tests.
- `Segmented`: a `track` with a sliding thumb (the level) and `separate` buttons (grades, TOK and EE),
  never under 44px wide. `error` turns the chosen option red and reads the message out.
- `FilterChip`, `ToggleChip`, `RemovableChip`, `ClearChipsButton`, and `RemovableChipGroup`, which
  moves focus to the next chip, then Clear all, then the result count.
- `StatusBadge`, `RequirementChip` and `RequirementChipList`. Order and "+N met" stay with 2.2.
- `Card` (flat, raised, overlay), `CardLink` and `CardTitle`; `Skeleton`, `SkeletonLine` and
  `LoadingRegion`. The match card, result row and program page skeletons are put together in 2.2–2.4.
- Tokens: `--line-2` and `--line-3` (`border-line-2`, `border-line-3`), `--input` pointed at line-3,
  `shadow-raised-hover`, and the dark raised shadow from D2.8. `app/globals.test.ts` checks line-3 at 3:1
  on paper, surface and sunken.

Two small departures from the boards. The E radio doesn't get `aria-invalid`, which ARIA doesn't
support on a radio; the fieldset's description and a live region carry the error instead. Filled
chips (an applied filter, a chosen E) use `text-background`, so their light text is paper #F7F6F2
rather than #FFFFFF.

### 1.3 — Brand configuration and the new logo

**Uses Lens** (owner, 7 October 2026, provisional; canvas board "Logo options and clearance"). The
final mark is decided before release day, and swapping it must be a change to the config and
asset files only.

**Outcome:** One module (`lib/brand/config.ts`, `04-design-system.md` §8) names every brand asset,
and nothing else hard-codes a logo.

**Design gate:** D1.5, approved ([Step 2](#step-2--design-first)).

**Decided 9 October 2026 (owner):** one mark in both themes, approved with "D1.5 Logo: Lens" and
"D1.5 Share image" (canvas row 9).

**Must-haves:**
- All 29 references in 19 files read from it: student, coordinator and admin headers; sign-in and
  invitation pages; `app/layout.tsx` metadata; JSON-LD logos; all 7 email templates. Pages pick the
  logo through `showsNewUi()`, so the preview shows it everywhere. **Emails** go to students, so they
  follow `NEW_UI_FOR_EVERYONE` alone and change on release day.
- Assets are SVG with **outlined paths, never `<text>`**. Today's logo is live text in Inter and
  renders in Arial on Windows (audit 2.4). Each asset is checked at 16, 32 and 180px, light and dark.
- **One mark in both themes:** the #2B3FD6 square with the lime lens, whose lens keeps 6.1:1 at every
  size. The dark header and footer use it too, in place of the #8E9BFF square on D2.12 and D2.13 that
  `SiteLogo` builds with `fill-primary` today. So there is no `<picture>`: a dark source would follow
  the OS, not the Appearance setting.
- **Two drawings of the mark,** both in a 32-unit square with 8-unit corners. The page mark, for 24px
  and up, has its lens where two circles of radius 10, 10 apart, overlap. The favicon, for 16 and
  32px only, draws the same lens 25% larger (radius 12.5), so its points survive at 16px.
- **The logo is the mark as an `<img>` and `brand.name` as text** in Geist 650, 17/24, −0.025em,
  8px from the mark on a phone and 10px from 768px; header mark 28px, footer 26px. The name follows
  the theme and Windows contrast themes. The logo is never a heading.
- **The seven files** in `public/brand/` (the board's table): `mark.svg`; `favicon.svg`;
  `favicon-32.png` for browsers without SVG icons; `apple-touch-icon.png`, 180 × 180, opaque, with
  square corners (iOS rounds them); `logo-email.png`, 80 × 80; `logo-512.png`, the page mark full
  bleed, for the JSON-LD Organization logo; and `og-image.png`, 1200 × 630, exported from
  "D1.5 Share image".
- **Three fixes on the way**, the logo URL changes SEO parity allows (Definition of done 12):
  `icons.apple` points at `favicon.svg` today, and iOS needs the PNG; `og-image.png` is a 640 × 640
  JPEG declared as 1024 × 1024, so the new one is declared at its real 1200 × 630; and the JSON-LD
  `logo` moves from the share image to `logo-512.png`, since a logo should be square.
- **The email header:** the mark PNG at 40px, left-aligned, beside "IB Match" as text in the email's
  own font stack (22/28, 600), since mail apps in dark mode recolour text but never images. The button
  takes `brand.colors.brand`, #2B3FD6 (white on it 7.5:1; today's #3573E5 is 4.4:1). Nothing else in
  the emails changes.
- Changing the logo later means replacing files and, at most, editing the config. No component changes.

**Done 9 October 2026.**

- `lib/brand/config.ts` names every file: `brand` for the new design, and `legacyBrand` for today's
  files, which every page and email keeps until release and which go at cleanup (R.2). No logo path
  is written anywhere else. `lib/brand/metadata.ts` gives the icons, the share image and the JSON-LD
  logo for a design, and `lib/brand/email.ts` the emails' logo and colour, read from
  `NEW_UI_FOR_EVERYONE` alone. Vitest covers both, and checks that each file in `public/brand/` has
  its size, that the touch icon is opaque and that the SVGs have no `<text>`.
- **Components.** `BrandMark` (`components/brand/`) is the mark as an `<img>`. `SiteLogo` draws the
  lockup with it and `brand.name`, so the header and footer show the same #2B3FD6 mark in dark.
  `AuthLogo` gives the sign-in and invitation cards the lockup, or today's logo, from the server;
  `LegacyLogo` is today's. The root layout's `metadata` became `generateMetadata()`, which adds only
  the icons and the share image to one shared copy.
- **The client pages take their logo from the server**, so no client chunk carries the config or
  both logos: the two sign-in pages moved into `SignIn.tsx` and `CoordinatorSignIn.tsx` behind a
  small server `page.tsx`, and the student invitation form, the coordinator and admin sidebars and
  today's `StudentHeader` take a `logo` or `mark` prop.
- **Hidden until release, measured.** `npm run build` lists every route as before, revalidate times
  included. Without the preview, the HTML of `/`, a guide, FAQs, both sign-in pages, an invitation and
  Privacy is unchanged, and so is the gzipped JS and CSS they load. All seven emails render
  byte-identical with the flag off. The SEO snapshot differs only in the logo URLs.

Departures and findings:

- **The emails' whole brand colour changes, not only the button.** Links and the support tickets'
  accent use the same constant, and leaving them #3573E5 would put the second blue the board rules
  out beside the new button. The header sits 32px above the heading, as drawn.
- **Sign-in and invitation cards show the lockup**, not the bare mark, since today's logo carries the
  name in its image. The coordinator and admin sidebars swap only the mark, at today's 36px, because
  the name is already text beside it.
- **The Singapore guide's JSON-LD names `/images/logo.png`, which has never existed.** Kept for
  today's page, which stays unchanged; the new design names `logo-512.png`.
- **Pages that set their own `openGraph` have no share image.** `/`, FAQs, How it works and all 23
  guides replace the root `openGraph` without `images`, so a link to the home page shows no picture
  today, in either design. Fixing it changes their metadata, so it is a separate pull request.
- `components/layout/AdminHeader.tsx` is never rendered; it reads `legacyBrand` like the rest.

### 1.4 — Theme switching: System, Light, Dark

**Outcome:** The site follows the OS by default and remembers a manual choice per device.

**Design gate:** D1.4, approved ([Step 2](#step-2--design-first)).

**Must-haves** (`04-design-system.md` §10):
- Dark tokens under `prefers-color-scheme` and `[data-theme='dark']`, inside the `data-ui="next"`
  scope. For the new design, the root layout drops the forced `className="light"` and
  `colorScheme: 'light'` from `<html>` (`app/layout.tsx:121`). For everyone else they stay until
  release, or old screens would change for students on a dark OS.
- The choice is stored in `localStorage` only. An inline head script sets `data-theme` before paint, so
  there is no flash. `color-scheme` is set so native controls and scrollbars follow.
- `ThemeSwitch` component (System, Light, Dark radio group). Placing it is 1.5: the account menu on
  desktop and phone, and the footer (decided 9 October 2026; the phone Profile tab became Academic).

**Done 8 October 2026.** `components/ds/ThemeSwitch.tsx`, with a `labelled` variant (account menu,
Profile tab) and an `icons` variant (footer), on native radio inputs. The choice is handled in
`lib/theme.ts`; the head script is `THEME_SCRIPT`. Nothing places it yet.

### 1.5 — Site chrome on every student-facing page

**Outcome:** The same header, footer and phone tab bar on every student-facing page, logged in or out.

**Design gate:** D1.4 (with "D1.4 Account menu"), D2.12, D2.13 and D2.14, approved
([Step 2](#step-2--design-first)).

**Decided 9 October 2026 (owner):** the header proposals on "D2.12 Header"; Academic in place of
Profile; Menu or the avatar on a phone, never both; the tab bar hides on scroll as it does today. The
gate's boards were approved the same day.

**Must-haves:**
- **A header on the pages that have none today** (audit 1.1): `/`, the 23 country guides,
  `/ib-university-requirements`, `/how-it-works`, `/faqs`, `/contact`, `/support-us`,
  `/universities/[id]`.
- **Static-safe.** `app/programs/layout.tsx` calls `auth()`, which reads cookies. Public pages must
  not. **Prebuilt public pages show the signed-out header to everyone**, with no session call, and
  "Sign in" links to `/student`, which already sends signed-in students to Matches. Explore and
  program pages (whose layout reads the session) and `/student/*` show the signed-in header.
- Logged out, link only to public destinations (audit 1.2): Explore programs, Country guides, How
  it works, For schools, then "Sign in" and "Get my matches". Logged in: Matches, Explore, Shortlist,
  Academic, Guides, and an **account menu** behind the avatar with Settings, FAQs, Contact, Appearance
  (`ThemeSwitch`) and Sign out. It is a disclosure, not an ARIA menu, because it holds a radio group:
  Escape or a click outside closes it and returns focus to the avatar. Country guides and Guides go to
  `/ib-university-requirements`. No search box in the header. From 768 to 1023px the signed-out links
  move into Menu and, signed in, the wordmark hides. See "D2.12 Header" and "D1.4 Account menu".
- **Phone header:** signed out, "Sign in" and Menu (the public links and "Get my matches"); signed
  in, Guides and the avatar, which opens the same account menu. Never Menu and the avatar together.
- **Focus mode** in first run: the logo, not a link, and "Save and exit", which saves the step in
  progress, then goes to Home. `/student/onboarding` also serves students editing their profile, who
  get the normal header and tab bar with Academic current. Focus mode follows whether first run is
  finished, not the URL.
- **Phone tab bar:** Matches · Explore · Shortlist · Academic (`/student/onboarding`). No heart icon
  (audit 1.6), no looping "incomplete" dot (today `StudentHeader.tsx:103`, `MobileBottomNav.tsx:141`).
  Hidden during first-run onboarding (3.1). Matches uses Lucide's `ListChecks` and Academic its
  `GraduationCap`. The current tab gets a brand-soft pill behind its icon, as well as the colour and
  weight, so it still shows in forced colours. No count on the Shortlist tab. See "D2.14 Phone tab
  bar".
- **The tab bar hides on scroll down and shows on scroll up, as it does today** (owner, 9 October
  2026; `MobileBottomNav.tsx`). It hides once the page has moved 10px since the last change and is
  more than 100px from the top. It shows on scroll up, within 100px of the top, on a page too short to
  scroll, and whenever one of its tabs gets keyboard focus. The motion is a 240ms `transform` slide
  with the standard easing, and a fade with reduced motion. The bar is fixed and the page keeps its
  bottom padding, so nothing reflows; hidden, its links stay focusable.
- **Footer:** three link groups and the `ThemeSwitch`, on every student-facing page and, on a phone,
  above the tab bar. Students: Explore programs, Country guides, How it works, FAQs. About: For IB
  coordinators, Support us, Contact. Legal: Privacy, Terms, Cookies. The group names label their
  `<nav>`s and are not headings. See "D2.13 Footer".
- Keep URLs unchanged.
- **The SEO snapshot script**, which every later public-page task uses (Definition of done 12).
  `scripts/seo-snapshot.ts <url>` prints the `<title>`, meta description, canonical, robots meta, each
  JSON-LD block and the heading outline (`h1` to `h3`). With `NEW_UI_PREVIEW_KEY` set, it also opens the
  preview link, keeps the Draft Mode cookie, fetches the page again and prints the differences. It
  only fetches pages; no database.

**Verify:** `npm run build` lists the static pages unchanged. In the preview, every listed page shows
the header; without the link, they are as today. Logged out, nothing in the header leads to sign-in
except "Sign in" and "Get my matches". On a phone, scrolling down hides the tab bar and scrolling up
brings it back, with no layout shift. The SEO snapshot of `/`, one guide and one program page shows
no difference.

**Done 9 October 2026.** In `components/site/`:

- `PublicHeader` (signed out), `AppHeader` (signed in) with `AccountMenu`, `SiteMenu` (Menu, below
  1024px), `SiteFooter`, `TabBar` and `SiteFrame` (skip link, header, `#main`, footer, tab bar).
  `CurrentLink` sets `aria-current`; the links and the rules for "current" and for hiding the tab
  bar are in `nav.ts`, with Vitest tests. Sign out is a form action (`sign-out.ts`).
- **Placement.** The root layout wraps every page in `PublicFrame`, which gives a public page the
  signed-out header and the footer, and steps aside on `/student`, `/programs` and the staff areas
  (`hasOwnChrome`). A public page added later gets the chrome without asking. `/student` and
  `/programs` draw theirs from the session. Today's footer returns nothing in the new design, and
  the three legal pages skip today's header and bottom nav there. No page file moved.
- **Today's visitors download almost none of it.** The layouts place the chrome through
  `components/site/chrome.tsx`, which lazy-loads two chunks (5.5 and 7.0 KB gzipped) only where they
  render. Measured against `main` on the prebuilt pages without the preview: JS +0.2 KB and CSS
  +1.3 KB gzipped (26.4 KB, under the 32 KB budget). A plain import put the whole chrome in the root
  layout's chunk, and `next/dynamic` added 1.1 KB of loader. `chrome.tsx` goes at cleanup (R.2).
- `npm run build` lists every route as `main` does, revalidate times included. The SEO snapshot
  (`scripts/seo-snapshot.ts`) shows no difference on `/`, a guide, Explore, a program, a university,
  FAQs and Privacy.

Departures from the boards, each small:

- **First run's focus mode moves to 3.1.** Its "Save and exit" saves the step in progress, which
  needs the step drafts 3.1 adds; today's onboarding saves nothing before the last step, so the
  button would claim a save it can't make. Until 3.1, first run shows the normal chrome with
  Academic current. `SiteLogo` without `href` is the focus-mode logo.
- **No count beside Shortlist in the desktop nav yet** (on "D2.12 Header"). Saving happens in the
  browser and a layout doesn't re-render on navigation, so a count read by the layout would go
  stale, and reading it is a new query. It comes with the shared save state in 2.2 or 2.5.
- **The avatar keeps the student's Google photo** (owner, 9 October 2026; the boards draw only the
  initial). Google's own 64px size (`avatarPhotoUrl` in `lib/avatar-utils.ts`), not the image
  optimiser; the initial on brand-ink without a photo, and in its place if the photo fails to load.
- From 768 to 1023px, Menu holds the four links only: "Get my matches" is already beside it.
- In the preview, the skip link is the second Tab stop, after the preview bar's Exit.
- `ThemeSwitch`'s `icons` variant shows "Appearance" beside the icons on a phone, as on the footer
  board.

---

## Phase 2 — Core app

### 2.1 — Match data for the new cards

**Status model:** requirement-based, decided 7 October 2026 ([Open questions](#open-questions)).

**Outcome:** The matching result carries what the cards need, with no change to scores.

**Design gate:** none; nothing on screen changes.

**Must-haves:**
- An additive change to `SubjectMatchDetail` (`lib/matching/types.ts`): `kind` (`met`, `grade_short`,
  `level_short`, `not_taken`), `gradeGap`, `studentLevel` and `studentGrade`. Today the detail does
  not carry the student's own grade (audit 3.9).
- A pure helper derives the card status and the chips (`04-design-system.md` §9), with a Vitest
  test per case in the §9 table.
- `npx tsx scripts/run-all-tests.ts` passes unchanged: scores must not move.

**Done 9 October 2026.**

- `SubjectMatchDetail` carries `kind`, `gradeGap`, `studentLevel` and `studentGrade`, set by
  `lib/matching/subject-matcher.ts` on every detail; for an either/or, the matched course's. They
  are optional in the type, so the verify fixtures and results already cached in Redis (30 minutes)
  still type-check and render.
- `deriveMatchStatus` (`lib/matching/match-status.ts`) gives the card status as `StatusBadge` takes
  it (`meets`, `close`, `gap`), the badge copy, and every chip as `RequirementChip` takes it, in §9's
  order. `cardChips` fits them on a card: problems and notes always, met ones up to four, the rest
  "+N met". 2.2 passes these straight through.
- **Chips use short course names** (owner, 9 October 2026): "Maths AA HL 7 · you 6", from the list
  in `lib/ib/course-names.ts`. It shortens the 15 of production's 55 courses that are too long for a
  chip; any other course, or one added later, keeps its stored name. D3.1 confirms the list.
- An either/or names the course the student took, as the program card does today, so §9's
  "English A SL 6 · via Literature" reads "English A Lit SL 6". D3.1 chooses between the two. With
  none taken, a group of one or two courses is named in full ("French B or Spanish B HL 5 · not
  taken"); a longer one, up to 45 courses, names its first and counts the rest ("French B HL 5 or 2
  others · not taken"), as D3.1 proposes.
- **Badge copy beyond §9's examples, kept for now, is for D3.1 to confirm:** "Needs 6 more points", "Needs a 7 in
  Physics", two needs then "and 1 more", "Germany · not one of your countries". "Needs a language at
  HL" (the board) needs course groups the result doesn't carry; the helper says "Needs French B or
  Spanish B HL".
- **Scores did not move:** the suite passes with no test changed, and a fingerprint of 72,060
  synthetic results (every score, status, reason, category and adjustment) is byte-identical before
  and after.
- **Judged at the student's own level.** An either/or reports the option that scores best, and in a
  non-critical requirement SL 6 for an HL 5 option (0.80) outscores one grade short at SL (0.78,
  `MAINT_tasks.md` 5.15). So when the group also accepts the course at the student's level
  ("Maths AA HL 5 or SL 7"), the helper judges them there: SL 6 is "Within reach · 1 grade short",
  not missing HL. Scores are unchanged. **Left for the level-gap scoring review:** across different
  courses (Physics SL 7, or Chemistry HL 5 with a 4) the result names only the best-scoring course,
  so the card shows Physics missing HL.

### 2.2 — Match card, result row and requirement checklist

**Outcome:** `ProgramCard` (1,278 lines, three jobs) is replaced by MatchCard, ResultRow and
RequirementChecklist. The matches page groups by status. See the canvas boards "Match card: every
state", "Matches" and "Phone · Why this match, opened".

**Design gate:** D2.9, D2.11, D3.1, D3.2, D3.4 and D4.6, approved ([Step 2](#step-2--design-first)).

**Must-haves:**
- **Every requirement visible on the card** as a chip with its own status and the student's grade
  ("– Maths HL 7 · you 6"). Problems first; more than four collapse to "+N met" (audit 3.2, 3.9).
- **"Why this match"** opens in place on desktop and phone: needed against actual values, what would
  close the gap, field and country, and the fit score with its weighted parts. Reuse the logic in
  `components/student/MatchBreakdown.tsx`, then delete that file.
- **Status groups** on the matches page, the third collapsed. It shows every match `MAINT_tasks.md`
  5.12 returns, with no "top 10" copy.
- **Either/or requirements** show each option's own level and grade. This is the display half of
  `MAINT_tasks.md` 5.7, which shipped to `main` first (prep P6). Reuse its helper here:
  `groupRequirements` in `lib/programs/requirement-groups.ts`.
- **Honest save.** "Saved" appears only after the server confirms; a failure reverts with a toast.
  Logged out, Save leads to sign-in (a same-origin `callbackUrl` to the program with `?save=1`) and
  saves the program on return. Today it shows "Saved" and stores nothing (audit 4.1).
- No "Refresh Recommendations" button (audit 4.4).
- Delete `ProgramCard.tsx` when nothing imports it.

### 2.3 — Explore: toolbar, phone filter sheet, rows

**Outcome:** Search uses a chip toolbar (Field, Country, IB points, Length), a bottom sheet on phones
with the result count on its button, compact result rows, and 20 results per page with "Show 20
more". See the canvas boards "Explore programs", "Phone · Explore" and "Phone · Filters sheet".

**Design gate:** D2.15, D3.3, D3.5 and D4.7, approved ([Step 2](#step-2--design-first)).

**Must-haves:** filters stay in the URL, as today. "Only ones I qualify for" appears once the student
has a profile. Rows show minimum points large and aligned, and the student's fit when logged in.
Images are 48–64px thumbnails, not full width (audit 3.3).

### 2.4 — Program and university pages

**Outcome:** The program page and university page in the new layout. See the canvas boards "Program
detail" and "Phone · Program (dark)".

**Design gate:** D3.4, D4.8 and D4.9, approved ([Step 2](#step-2--design-first)).

**Must-haves:**
- **Breadcrumbs** (Explore / Canada / University of Toronto) instead of `history.back()` links
  (audit 1.4).
- **Breadcrumb structured data.** A `BreadcrumbList` JSON-LD block on both pages, item for item the
  same names and URLs as the visible breadcrumbs. The current page's item may leave out its URL. None
  exist on the site today. It renders only with the new design, because structured data must match
  what the page shows. Where the country crumb links is decided on board D4.8; the country's guide,
  where there is one, is the natural target. Validate it in Google's Rich Results Test by pasting the
  preview's HTML, since the test cannot open the preview.
- **Requirements always listed**, including the minimum points for logged-out visitors. Today the
  points tile needs a match result, so the block can render empty (audit 4.2; Sydney's Bachelor of
  Science and Doctor of Medicine).
- A fit panel (logged in) or "Sign in and add your grades to check these" (logged out).
- The entry-year note, with the caution style when the requirements are from an older intake.
- The campus city, and the image credit as a caption (`CONTENT_tasks.md` 8.2 and 8.3, done 7 October
  2026). Show `campusCity ?? university.city` wherever a program's place is shown, and render
  `university.imageCredit` with `components/shared/ImageCredit.tsx` as the `<figcaption>` of every full
  image. A thumbnail needs none.

### 2.5 — Shortlist with compare

**Outcome:** "Saved" becomes "Shortlist", with list and compare views built from existing data: fit,
minimum points against the student's, named subjects, country, degree and length, the year checked,
and the official link. See the canvas board "Shortlist and compare". The saved page shows fit,
which it does not today (audit F4 in `03-flows.md`).

**Design gate:** D3.7 and D4.10, approved ([Step 2](#step-2--design-first)).

---

## Phase 3 — Profile and onboarding

### 3.1 — First-run interest and country steps

**Outcome:** Steps 1 and 2 of onboarding as compact lists. See the canvas boards "Phone · First run,
step 1" and "step 2".

**Design gate:** D2.6, D4.3 and D4.4, approved ([Step 2](#step-2--design-first)).

**Must-haves:**
- Real checkboxes in a `<fieldset>` (today `Card` divs with `onClick`, unusable from the keyboard,
  audit 6.3).
- Fields as rows of about 56px with an icon, a name and one line of examples. **A distinct icon per field**:
  Education and Media both fall back to `BookOpen` today. Add them to `lib/icons.tsx` (`fieldIconMap`,
  `iconKeyMap`, `AVAILABLE_FIELD_ICONS`).
- Countries as a two-column grid with a filter box and "Open to anywhere".
- A sticky footer with the count and Continue (today Continue sits below 6 rows of cards, 11 on a phone).
- **Focus mode:** no tab bar; the header shows "Save and exit", which saves the step in progress,
  then goes to Home (decided 9 October 2026, D2.12). Moved here from 1.5, which built the rest of
  the chrome: the button needs this task's step drafts. The student layout turns it on while first
  run is unfinished, on `/student/onboarding` only.
- **A draft is saved after each step.** Today nothing is saved until the last button (`03-flows.md` F1).
- The heading says "Set up your profile" on a first visit and "Update your profile" after
  (audit 1.3).
- Field descriptions are `FIELD_DESCRIPTIONS` in `lib/programs/fields-of-study.ts` (`CONTENT_tasks.md` 8.1,
  done), stored in `FieldOfStudy.description`. Each names its own field's disciplines only; keep it so.

### 3.2 — Subject editor

**Outcome:** One `ProfileEditor` for first run and editing, with one row per IB group (subject, SL or HL,
grade 1–7), then TOK and EE. It replaces `SubjectSelectorDialog`, `DetailedGradesInput`,
`QuickScoreInput` and `StepIndicator`. See the canvas boards "Academic profile" and "Phone · First
run, step 3".

**Design gate:** D3.6 and D4.5, approved ([Step 2](#step-2--design-first)).

**Must-haves:**
- Radio semantics for level and grade (audit 6.4). Editing in place: no remove-and-re-add.
- A live total labelled "So far" until six subjects and both core grades are in (audit 5.5).
- Diploma checks through the shared helpers from `MAINT_tasks.md` 5.8 (core points, E blocks saving)
  and 5.13 (3 or 4 HL subjects). Messages match the disabled save button (audit 5.6).
- Lucide icons for TOK and the EE; no emoji (audit 2.7).

### 3.3 — Academic profile and settings

**Decided 9 October 2026 (owner):** the phone Profile tab becomes **Academic**, also in the desktop
nav, and the account moves to the menu behind the avatar ("D2.12 Header", "D1.4 Account menu"). The
hub on the canvas board "Phone · Profile tab" splits in two; D4.11 redraws it.

**Outcome:** The Academic page, at `/student/onboarding`, holds everything that changes the matches.
Settings, at `/student/settings` and reached from the account menu, holds the account. Desktop and
phone show the same content.

**Design gate:** D2.10 and D4.11, approved ([Step 2](#step-2--design-first)).

**Must-haves:** on Academic, the predicted total with "Edit subjects and grades" (3.2), then
interests and countries (opening the 3.1 screens). In Settings, the account (name, school
connection) and your data (download, delete). Appearance and Sign out are in the account menu (1.5).
**Keep every current Settings feature.**

---

## Phase 4 — Public pages

### 4.1 — Home page

**Outcome:** The new home page (canvas board "Home"): a hero with a real product preview instead of
the generic illustration, three steps, why the IB matters, country guides, the founder's note, a final
call to action, and the footer.

**Design gate:** D4.1, approved ([Step 2](#step-2--design-first)).

**Must-haves:** stays static. The hero image is replaced by markup, so no 575 KB PNG source. The copy
fits the sign-in-first flow. The cookie banner follows the owner's decision.

### 4.2 — Country guides on one template

**Outcome:** The 23 guides render from one template and typed data, in the new design. This is
`MAINT_tasks.md` 7.2 done once, here.

**Design gate:** D4.12, approved ([Step 2](#step-2--design-first)).

**Must-haves:** everything 7.2 lists: static with a one-week revalidate, URLs unchanged, per-country
JSON-LD preserved, the sitemap unchanged. Tokens only, which removes about 4,260 hard-coded palette
classes. Migrate two or three, compare the rendered text and the SEO snapshot (Definition of done 12)
before and after, then do the rest. Each guide's `Article`, `FAQPage` and speakable blocks must come
out identical. Until release, the old guides stay live beside the template, so an edit to a migrated
country goes into both. Do it late.

### 4.3 — Other public pages

**Outcome:** `/ib-university-requirements`, `/how-it-works`, `/faqs`, `/contact`, `/support-us`,
the legal pages, sign-in, the school invitation pages, and the 404 and error pages move to the new
design, using tokens only. Geist Mono is removed with `NoAISection.tsx`.

**Design gate:** D4.2 and D4.13 to D4.16, approved ([Step 2](#step-2--design-first)).

**Must-haves:** the FAQs page's structured data and its visible questions keep coming from one list
(today both read `faqs` in `app/faqs/page.tsx`, from the CMS or `FALLBACK_FAQS`). Every page passes
the SEO snapshot comparison (Definition of done 12).

### 4.4 — Guard against raw palette classes

**Outcome:** A lint rule fails on raw palette classes (`text-blue-600`, `bg-gray-50`, …) in
student-facing code, so the two styling systems cannot drift apart again (audit 2.2). It is a code-quality
rule, not a formatting one, so it does not conflict with Prettier.

**Design gate:** none; nothing on screen changes.

---

## Release

### R.1 — Release day

**Outcome:** Everyone sees the new design, in one deploy.

**Steps:**
1. Confirm the final logo. If it is a new mark, the clearance search must be back.
2. Confirm the owner has the Search Console baseline (owner decisions).
3. Set `NEW_UI_FOR_EVERYONE=true` in Vercel's **Production** environment, then redeploy. The redeploy
   rebuilds the static pages in the new design, and emails switch too.
4. Check every page logged out and logged in, light and dark, on a phone and on Windows.
5. Run the home page, one guide and one program page through Google's Rich Results Test: the same
   items as before release, plus the breadcrumbs.

**Rollback:** set the variable to `false` and redeploy. Every page goes back, static or not.

### R.2 — Cleanup

**Outcome:** One design in the code.

**Steps:** after about two stable weeks, once Search Console shows no fall in indexed pages or clicks
against the baseline:
- delete the old screens and components (`ProgramCard`, the replaced parts of `components/ui/`, the
  onboarding components, `StudentHeader`, `MobileBottomNav`, the old country pages);
- delete the switch, the preview routes and bar, both variables and the old logo files;
- move the scoped tokens to `:root`, and turn on Newsreader's preload (1.1);
- re-run the full verification and the budget check.

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
| 5.7 | `MAINT_tasks.md` | Either/or groups. Done 7 October 2026; 2.2 reuses its helper |
| 5.8 | `MAINT_tasks.md` | TOK/EE core points and E blocks saving. Do it before 3.2, which uses its helper |
| 5.12 | `MAINT_tasks.md` | Return every match, not the top 10. Needed by 2.2 |
| 5.13 | `MAINT_tasks.md` | 3 or 4 HL subjects. Do it with 5.8, before 3.2 |
| 5.14 | `MAINT_tasks.md` | Delete unused components. Independent |
| 5.15 | `MAINT_tasks.md` | How a level gap scores. Decided 7 October 2026: no change now; revisit with the whole matching math later |
| 5.17 | `MAINT_tasks.md` | University pages in the sitemap. Independent; any time |
| 7.2 | `MAINT_tasks.md` | Country pages collapse. Done as 4.2 |
| 7.3 | `MAINT_tasks.md` | Refresh the SEO and AI search plan. After R.1 |
| 8.1–8.3 | `CONTENT_tasks.md` | Fields of study (used by 3.1), campus city and image credits (used by 2.4) |
