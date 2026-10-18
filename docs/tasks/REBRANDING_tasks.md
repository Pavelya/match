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

**Where it stands, 18 October 2026.** The canvas has 80 boards. The owner approved in chat "B ·
Foundations", "Theme: System, Light, Dark" and the three "D1.2 Type" boards on 8 October (D1.1 to
D1.4), then the seven row 2 boards (D2.1 to D2.5, D2.7, D2.8) and both "D1.4 Theme" change boards
(chosen edge, phone size) on 9 October. The same day the owner decided the site chrome's open
questions and approved the four row 8 boards: "D2.12 Header", "D2.13 Footer", "D2.14 Phone tab bar"
and a third D1.4 change, "D1.4 Account menu". Then the two row 9 boards, "D1.5 Logo: Lens" and
"D1.5 Share image", with one mark in both themes (D1.5). On 10 October the owner approved the five
row 10 boards in chat, with every recommendation on them: "D3.1 Match card", "D3.1 Match card ·
phone", "D3.2 Why this match", "D3.4 Requirement checklist" and the change board "D2.7 Chip · no IB
minimum". Later that day, the four row 11 boards, again with every recommendation: "D2.9 Toast",
"D2.11 Empty and error states", "D4.6 Matches" and "D4.6 Matches · phone". Build 6–7's gate is
complete. On 11 October row 12 drew Explore's five boards, and the owner approved all five in chat:
"D2.15 Bottom sheet", with every recommendation and new labels for the profile shortcuts, then "D3.3
Result row", "D3.5 Filter toolbar" (its shortcuts worded as on the sheet), "D4.7 Explore" and "D4.7
Explore · phone", each with every recommendation. Build 8's gate is complete. A change board for one program card in every list (D3.8) is parked until the
whole design can be seen in the preview (5.1). On 12 October row 13 drew the program and university
pages, and the owner approved all four boards in chat with every recommendation: "D4.8 Program
page", "D4.8 Program page · phone", "D4.9 University page" and "D4.9 University page · phone". Build
9's gate is complete. On 13 October row 14 drew the compare table and the Shortlist screen, and the
owner approved all four boards in chat with every recommendation, but one: a phone compares two
programs side by side, at most, and the phone boards were redrawn to that: "D3.7 Compare table",
"D3.7 Compare table · phone", "D4.10 Shortlist" and "D4.10 Shortlist · phone". Build 10's gate is
complete. Later that day row 15 drew first run's steps 1 and 2, their checkbox rows and Save without
grades, and the owner approved all six boards in chat with every recommendation: "D2.6 Checkbox rows
and grid", the change board "D2.1 Save · without grades" (which also changes the D3.3 row, D4.7's link
and D4.8's Save before grades), "D4.3 First run, step 1", "D4.3 First run, step 1 · phone", "D4.4
First run, step 2" and "D4.4 First run, step 2 · phone". Build 11's gate is complete. On 14 October
row 16 drew the subject editor and first run's step 3, and the owner approved all three boards in chat
with every recommendation: "D3.6 Subject editor", "D4.5 First run, step 3" and "D4.5 First run, step 3
· phone". Build 12's gate is complete. On 18 October row 17 drew the confirm dialog, the Academic
page and Settings, and the owner approved all five boards in chat with every recommendation,
including the change it makes to D4.3, D4.4 and D4.5 after first run: "D2.10 Confirm dialog", "D4.11
Academic profile", "D4.11 Academic profile · phone", "D4.11 Settings" and "D4.11 Settings · phone".
Build 13's gate is complete. Later that day row 18 drew Home on desktop and phone, with the cookie
banner, and the owner approved both boards in chat with every recommendation: "D4.1 Home" and "D4.1
Home · phone". Build 14's gate is complete. Eight tasks have no board, D2.16 (the policy update
banner) added by the owner the same day.

### Foundations

| Task | On the canvas today | To add before review | Approved |
|---|---|---|---|
| D1.1 Colour tokens | "B · Foundations": every token in light and dark, with its contrast ratio, and the focus outline | Nothing | 8 October 2026 |
| D1.2 Type | "B · Foundations": the desktop scale in Newsreader and Geist. "D1.2 Type · phone sizes", "D1.2 Type · phone, light" and "D1.2 Type · phone, dark": the sizes below 768px, the longest real names at 390px, and the rules that go with them | Nothing | 8 October 2026: the desktop scale, then the phone sizes |
| D1.3 Space, radius, elevation, motion, icons | "B · Foundations" | Nothing | 8 October 2026 |
| D1.4 Theme: System, Light, Dark | "Theme: System, Light, Dark": the account menu in light and dark, the public footer on desktop and phone. "Phone · Profile tab" has the Appearance row. Two changes in row 7: "D1.4 Theme · chosen edge" (the chosen option gets the 1px line-3 edge from D2.4) and "D1.4 Theme · phone size" (options 44px tall below 768px). A third in row 8: "D1.4 Account menu" (Settings, FAQs, Contact, Appearance, Sign out; "Profile and settings" and Shortlist leave, since Academic and Shortlist are in the nav, decided 9 October 2026) | Nothing | 8 October 2026; the chosen edge, the phone size and the account menu 9 October 2026 |
| D1.5 Logo: Lens | "Logo options and clearance": Lens, chosen provisionally on 7 October 2026. "D1.5 Logo: Lens" (row 9): two drawings of the mark, the page mark for 24px and up and a favicon with a lens 25% larger for 16 and 32px; the mark at 16, 32 and 180px in light and dark, in browser tabs, on a home screen and in Windows contrast themes; the email header; the seven files 1.3 makes. "D1.5 Share image" (row 9): the Open Graph image at 1200 × 630. **Decided 9 October 2026 (owner):** one mark in both themes, the #2B3FD6 square with the lime lens, rather than the lighter #8E9BFF square that D2.12 and D2.13 draw in dark | Nothing | 9 October 2026 |
| D1.6 Motion and feedback | None. The motion tokens are on "B · Foundations" (D1.3) | **No board.** Session 19 (5.2), before release day: go over every built screen and list what each interaction does, then draw one rule set for press, hover, focus, open and close, saving and moving between pages, in light, dark and reduced motion. Include whether a whole program card or row is tappable | |

### Components

On "B · Components" unless another board is named. That board is light only. The account menu and
theme switch are in D1.4.

| Task | On the canvas today | To add before review | Approved |
|---|---|---|---|
| D2.1 Button | "D2.1 Button" (row 7): primary, secondary, link and icon in every state, light and dark; the Save toggle from Save to Saving to Saved, and signed out. Loading is the label "Saving…", never a spinner. "D2.1 Save · without grades" (row 15), a change board: for a signed-in student without grades, Save is a link to first run drawn exactly as Save, never a toggle, named "Save Computer Science: add your grades first", with "Add your grades first. We’ll save it when you finish." under the program page's buttons; on Explore rows the icon link carries that name. Decisions in 3.1 **Changed 18 October 2026 (owner):** a danger variant, drawn on "D2.10 Confirm dialog" (row 17): filled #B3261E with white text in light, #FF8E85 with dark text in dark, its own edge in forced colours, and only inside a confirm dialog, for Delete account and Unlink. Decisions in 3.3 | Nothing | 9 October 2026; Save without grades 13 October 2026; the danger variant 18 October 2026 |
| D2.2 Text input and search | "D2.2 Text input and search" (row 7): the sign-in email, the IB points range and the Explore search in every state, and on a phone. Field edges use the new line-3 token (owner, 8 October 2026) | Nothing | 9 October 2026 |
| D2.3 Select and subject picker | "D2.3 Select and subject picker" (row 7): a native select (the Matches sort order); the subject picker closed, open, filtered by typing, with no results, and on a phone | Nothing | 9 October 2026 |
| D2.4 Segmented control | "D2.4 Segmented control" (row 7): level, grades 1–7 and TOK and EE A–E, with focus, disabled and an E blocking saving. The chosen segment gets a 1px line-3 edge (owner, 8 October 2026) | Nothing | 9 October 2026 |
| D2.5 Chips | "D2.5 Chips" (row 7): filter, on/off and removable chips with "Clear all", in every state. No flags on country chips (owner, 8 October 2026); SVG flags in the country picker (D4.4) only if ever wanted | Nothing | 9 October 2026 |
| D2.6 Checkbox rows and grid | "D2.6 Checkbox rows and grid" (row 15): the field row, the country tile, "Open to anywhere", the filter (empty, typed, no match) and the footer with the count and Continue, in every state, light and dark, at 358px and in the desktop's 880px column, and forced colours. **Decided 13 October 2026 (owner), every recommendation:** the whole row is the label, with Explore's box at its right end; chosen shows the tick, a 1px brand edge and the brand-soft fill, and nothing reflows; at five fields the other boxes are grey and aria-disabled, still reachable, and the footer says why ("You can choose up to 5. Untick one to choose Law."); examples wrap, never cut; Education gets Lucide Presentation and Media Newspaper. Decisions in 3.1 | Nothing | 13 October 2026 |
| D2.7 Status badge and requirement chip | "D2.7 Status badge and requirement chip" (row 7): every badge and every chip case in §9, light and dark. Notes carry Lucide's Info icon; "+N met" is green with a tick (owner, 8 October 2026). "D2.7 Chip · no IB minimum" (row 10), the two chips added after approval for programs with no IB minimum (`CONTENT_tasks.md` 6, US): "No IB minimum · admits 4.6%", the overall `University.admitRate`, and "No IB minimum · holistic admission" when a university reports none | Nothing | 9 October 2026; the two US chips 10 October 2026 |
| D2.8 Card and skeleton | "D2.8 Card and skeleton" (row 7): the card's surfaces and states; skeletons for the match card, the result row and the program page, desktop and phone. Card edges are a real border, not a box-shadow hairline | Nothing | 9 October 2026 |
| D2.9 Toast | "D2.9 Toast" (row 11): every message (Saved, Removed with Undo, a failed save or removal, the save made after signing in), the action and close states, placement on desktop and phone, the longest name, forced colours, light and dark. Decisions in 2.2 | Nothing | 10 October 2026 |
| D2.10 Confirm dialog | "D2.10 Confirm dialog" (row 17): Delete account, Unlink from school and "Leave without saving?" in every state (open, the word typed, hover, keyboard focus, pressed, working, failed), light, dark, forced colours and on a phone, and the danger button in every state beside its neighbours. It replaces today's two shadcn dialogs and the browser's `alert()` in Settings. **Decided 18 October 2026 (owner), every recommendation:** one `ConfirmDialog`, a native `<dialog>` with `role="alertdialog"`; focus starts on the safe button, Escape is Cancel, a click on the dimmed page does nothing; the primary on the right, side by side at 48px on a phone; a danger button (D2.1) only inside a dialog; "Type DELETE to confirm" kept, in any case; working and failing inside the dialog; centred on a phone too. Decisions in 3.3 | Nothing | 18 October 2026 |
| D2.11 Empty and error states | "D2.11 Empty and error states" (row 11): one panel for no matches, no results, an empty shortlist, a failed load ("Trying again…", failed again) and the profile call to action with its steps, desktop and phone, light and dark, with real copy. Decisions in 2.2 | Nothing | 10 October 2026 |
| D2.12 Header | "D2.12 Header" (row 8): desktop signed in and signed out, 768 to 1023px, the phone header signed out (Sign in, Menu) and signed in (Guides, the avatar and its panel), a student editing their profile, focus mode, every state, light and dark. **Decided 9 October 2026 (owner):** prebuilt public pages show the signed-out header to everyone, and "Sign in" goes to `/student`; no search box in the header; Guides in the phone header; "Save and exit" saves the step, then goes to Home; Academic is the fourth place, in the nav and on the tab bar; Menu signed out and the avatar signed in, never both | Nothing | 9 October 2026 |
| D2.13 Footer | "D2.13 Footer" (row 8): desktop and phone, signed out and above the tab bar, light and dark. Three link groups on every page, Students, About and Legal, with Support us under About | Nothing | 9 October 2026 |
| D2.14 Phone tab bar | "D2.14 Phone tab bar" (row 8): each tab current, every state, light and dark, and hiding on scroll. **Decided 9 October 2026 (owner):** Matches · Explore · Shortlist · Academic; the bar hides on scroll down and shows on scroll up, as today. Approved with the board: Lucide's List checks for Matches (the Rings mark was rejected on 8 October), a brand-soft pill behind the current tab's icon, no count on Shortlist | Nothing | 9 October 2026 |
| D2.15 Bottom sheet | "D2.15 Bottom sheet" (row 12): Explore's filters on a phone, light and dark: open, a choice applied, "Only ones I qualify for" on, scrolled, no programs match, an IB points value it can't use, keyboard focus, signed out, the count not arriving, forced colours. Replaces "Phone · Filters sheet". **Decided 11 October 2026 (owner):** a choice applies at once and the button carries the count ("Show 43 programs"); closing never loses a choice; a native dialog, no drag handle; every section open in one scroll; "No programs match" disables the button; profile shortcuts "Use my fields", "Use my countries" and "Up to my 38", with no limit on how many boxes are ticked. **Changed 13 October 2026 (owner):** the no-minimum hint, as on D3.5 | Nothing | 11 October 2026; the hint 13 October 2026 |
| D2.16 Policy update banner | None | **No board.** "We've Updated Our Policies" (`components/shared/ReconsentBanner.tsx`) in the new design, built in 4.6: a signed-in page on desktop and phone (above the tab bar), light, dark and forced colours; the Terms, the Privacy Policy or both changed; accepting, an accept that fails (silent today), Remind me later; and with the cookie banner showing at the same time, which today's banner covers (found in build 14). Added 18 October 2026 (owner) | |

### Patterns

| Task | On the canvas today | To add before review | Approved |
|---|---|---|---|
| D3.1 Match card | "D3.1 Match card" (row 10): desktop, light and dark, 14 cases from the production matcher (every status, the worst long and either/or requirements, MIT and Arizona State), the save states, and the copy of every chip and badge. "D3.1 Match card · phone": the same cards at 390px. They replace "Match card: every state" and the cards on "Phone · Matches"; "B · Components" shows the new card. Decisions in 2.2 | Nothing | 10 October 2026 |
| D3.2 Why this match | "D3.2 Why this match" (row 10): opened on desktop and phone, light and dark, for a program within reach, one with six requirements, the largest either/or and a US program. Replaces "Phone · Why this match, opened". Decisions in 2.2 | Nothing | 10 October 2026 |
| D3.3 Result row | "D3.3 Result row" (row 12): desktop at 1192px and phone at 390, light and dark, signed in with and without a profile and signed out; meets, within reach, missing (the longest badge), a 110-character name, no image, no IB minimum, the fit loading; the name and Save in every state; three ways to show no IB minimum. Replaces the rows on "Explore programs" and "Phone · Explore". **Decided 11 October 2026 (owner), every recommendation:** no IB minimum shows "None" with the admit rate under it; the fit is the Matches badge, word for word; no fit column signed out or before grades; an ordered list, not a table; thumbnails 56px on desktop, 48 on a phone; no hover on the whole row. **Changed 13 October 2026 (owner):** signed in before adding grades, Save is the icon link to first run named "Save … : add your grades first" ("D2.1 Save · without grades", row 15), not a toggle; built in 3.1 | Nothing | 11 October 2026; Save before grades 13 October 2026 |
| D3.4 Requirement checklist | "D3.4 Requirement checklist" (row 10): signed in, signed out, signed in with no grades yet, short and long either/or groups, US programs and the entry-year line, desktop and phone, light and dark. Decisions in 2.4 | Nothing | 10 October 2026 |
| D3.5 Filter toolbar | "D3.5 Filter toolbar" (row 12): the desktop toolbar with each chip's menu open (Field, Country, IB points, Length), light and dark; no programs match; an IB points value it can't use; "Only ones I qualify for" on; signed out; signed in before adding grades; the toolbar at 900px. Phones use the sheet (D2.15). **Decided 11 October 2026 (owner), every recommendation:** a choice applies at once, as in the sheet; menus are popovers holding a labelled dialog, not ARIA menus; no count beside each option; "Include programs with no IB minimum", ticked by default; Length 3 years, 4 years, 5 years or more; Sort: Most relevant, Lowest points needed, Highest points needed; signed out or without grades, a link in the switch's place. The profile shortcuts read "Use my fields", "Use my countries" and "Up to my 38", as on the sheet. **Changed 13 October 2026 (owner):** the hint under "Include programs with no IB minimum" reads "Mostly US universities, which admit on the whole application", in place of "All 12 US universities admit without one", since two German universities now set no minimum too (`CONTENT_tasks.md` 7); built in 2.5 | Nothing | 11 October 2026; the hint 13 October 2026 |
| D3.6 Subject editor | "D3.6 Subject editor" (row 16): a subject row at the desktop column's 880px and a phone's 358px in every state (empty, focus, the list open, filtered, a subject in another row, no match, the longest name, a second science in Group 6's row, a second Language A, a 1), TOK and the Extended Essay, the diploma checks under the subjects, and the footer in 14 states, light, dark and forced colours. It replaces the subject rows on "Academic profile" and "Phone · First run, step 3". **Decided 14 October 2026 (owner), every recommendation:** any subject in any row, the last "Group 6 · The arts, or another subject"; edit in place, keeping level and grade, with no defaults; one total, in the footer, "So far" until whole; each check where it applies and again in the footer as what Finish needs; the IB's other failing conditions still stop Finish, reworded in the helper; Lucide Lightbulb and Notebook pen; on a phone only "Mathematics: Applications and Interpretation" ends in an ellipsis. Decisions in 3.2 | Nothing | 14 October 2026 |
| D3.7 Compare table | "D3.7 Compare table" (row 14): desktop at 1192px, light and dark, four, four and two programs from a real shortlist, the column heads' states, the "Choose programs" popover and the skeleton; MIT (no IB minimum, "Admits 4.6%"), Constructor University (no photo, "Holistic admission"), Nanyang's 110-character name, an earlier intake. "D3.7 Compare table · phone": two programs side by side at 390px, light and dark. They replace the table on "Shortlist and compare". **Decided 13 October 2026 (owner), every recommendation:** up to four programs on desktop, the first four until the student chooses; eight rows (fit, IB minimum, subjects, country, degree, length, checked for, official page); "None" with the admit rate or "Holistic admission"; subjects in the chip words; the earlier-intake caution in its column; 56px photos in the column heads. **On a phone, two side by side at most**, picked with two selects (owner, in place of the recommended 2 × 2 of four). Decisions in 2.5 | Nothing | 13 October 2026 |
| D3.8 Program card in every list | "Program card · one for every list (D3.1, D3.3)" (row 12): on a phone, prototype A (48px, as approved), B (64px, one header for every list, recommended on the board) and C (72px), each in Matches, Explore and Shortlist, and B in dark | **Parked 11 October 2026 (owner):** A, as approved, stays until the whole design can be seen in the preview; reviewed again in [5.1](#51--the-program-card-in-every-list) | |

### Screens and flows

| Task | On the canvas today | To add before review | Approved |
|---|---|---|---|
| D4.1 Home | "D4.1 Home" and "D4.1 Home · phone" (row 18): the whole page in light and dark on both, then the cookie banner on a first visit: keyboard focus, Customize, dark, forced colours, and on a signed-in page above the tab bar. The preview holds three real programs and their stored requirements, for D3.1's student. They replace "Home (logged out)". **Decided 18 October 2026 (owner), every recommendation:** today's h1 words; a preview of three real matches, one per status, with initials tiles and no photos, `inert`; no program count, and "23 countries" from code; a lime bar under the hero phrase and a lime final band in both themes; six sections carrying every fact today's page shows; the cookie banner keeps its three choices and its storage, with Essential only and Accept all at the same weight, bottom right on desktop, across the bottom on a phone, and on the tab bar signed in. Decisions in 4.1 | Nothing | 18 October 2026 |
| D4.2 Sign-in | None | **No board.** Sign-in, "Check your email" and the sign-in error, phone and desktop | |
| D4.3 First run, step 1: interests | "D4.3 First run, step 1" and "D4.3 First run, step 1 · phone" (row 15): the step in light and dark on both, first visit, nothing chosen, five chosen with a sixth pressed, keyboard focus, saving, a failed save and after first run ("Update your profile"); then Save without grades start to finish: Save before it is pressed, first run with the program waiting, opening at a later step, "Save and exit" with a program waiting, back on the program and on Explore, and the save failing on return. They replace "Phone · First run, step 1". The change board for Save is "D2.1 Save · without grades". **Decided 13 October 2026 (owner), every recommendation:** "Set up your profile" (or "Update your profile") is the small h1 beside the step count, the question the step's h2; the waiting line under the step count on every step; "Save and exit" with a program waiting saves, then asks once (Keep going, Exit to Home); opening at a later step says what's kept; one toast back where Save was pressed, and Explore at the same search and row; desktop one 880px column; Continue needs one field. Phone: the header stays at the top; the footer fixed to the bottom, on the tab bar after first run; the Save and exit panel drops from the header; back on the program the page opens at the top. Decisions and words in 3.1 **Changed 18 October 2026 (owner):** after first run, Academic opens this step on its own ("D4.11 Academic profile", row 17): "Back to Academic profile", no step count, Save changes, and back to Academic; built in 3.3 | Nothing | 13 October 2026; opened from Academic 18 October 2026 |
| D4.4 First run, step 2: countries | "D4.4 First run, step 2" and "D4.4 First run, step 2 · phone" (row 15): the step in light and dark on both, with the program waiting, filtering ("land"), a short name ("uk"), no country matching ("brazil"), "Open to anywhere", nothing chosen, keyboard focus, saving, a failed save, after first run, and scrolled on a phone. They replace "Phone · First run, step 2". **Decided 13 October 2026 (owner), every recommendation:** "Open to anywhere" is a checkbox row above the filter, saved as `openToAllLocations` with no countries, hiding the grid; Continue needs a country or "Open to anywhere"; the filter matches any part of a name and a few short names (UK, USA, Holland, Czechia); it hides tiles, never choices; four tiles to a row on desktop, two on a phone, alphabetical. Phone: 16px in the filter. Decisions in 3.1 **Changed 18 October 2026 (owner):** after first run, Academic opens this step on its own ("D4.11 Academic profile", row 17): "Back to Academic profile", no step count, Save changes, and back to Academic; built in 3.3 | Nothing | 13 October 2026; opened from Academic 18 October 2026 |
| D4.5 First run, step 3: subjects | "D4.5 First run, step 3" and "D4.5 First run, step 3 · phone" (row 16): the step in light and dark on both, first visit, four subjects in, the list open, a group with no subject, ready, two at Higher Level, an E in TOK, the IB's other conditions, keyboard focus, finishing, a failed save, and after first run with and without a change; then Save without grades at step 3: opening with "Your interests and countries are saved." under the step count and the waiting line, ready, and Save and exit. They replace "Phone · First run, step 3". **Decided 14 October 2026 (owner), every recommendation:** the question "What are your subjects and grades?"; the button is Finish, and Save changes after first run, with the total before the change; desktop one 880px column, each subject on one line, the core a second panel; Save and exit keeps complete rows and the core as a draft without a total; Finish saves once. Where Save changes leads is D4.11's: back to Academic (18 October 2026). Phone: rows stack, grades at 46px; the open list's field comes up under the header. Decisions in 3.2 **Changed 18 October 2026 (owner):** after first run, Academic opens this step on its own ("D4.11 Academic profile", row 17): "Back to Academic profile", no step count, Save changes, and back to Academic; built in 3.3 | Nothing | 14 October 2026; opened from Academic 18 October 2026 |
| D4.6 Matches | "D4.6 Matches" and "D4.6 Matches · phone" (row 11): the whole page in light and dark on both, then loading, a failed load, profile incomplete (`03-flows.md` F6), no matches, none meeting yet, the Missing group opened, the end of a long group (no images), a failed save, from the production matcher. They replace "Matches" and "Phone · Matches". Decisions in 2.2 | Nothing | 10 October 2026 |
| D4.7 Explore | "D4.7 Explore" and "D4.7 Explore · phone" (row 12): the whole page in light and dark on both, then signed out, signed in before adding grades, the fit arriving, "Only ones I qualify for", programs with no IB minimum, loading the next 20, the next 20 failing, no results and a failed load, from real searches. They replace "Explore programs" and "Phone · Explore". **Decided 11 October 2026 (owner), every recommendation:** 20 at a time, then "Show 20 more", with how many are shown in the URL; signed out, no fit column and a sign-in link in the switch's place, no banner; the page's questions visible as eight collapsed answers; a filter change keeps the rows until new ones arrive; the summary "1,628 programs in 23 countries"; no search typed, highest minimum first, as today. Phone: one Filters button beside the switch; the count, applied chips and Sort on their own lines; "Show 20 more" full width. **Changed 13 October 2026 (owner):** signed in before adding grades, the link in the switch's place reads "Add your grades to check your fit and save programs" ("D2.1 Save · without grades", row 15); built in 3.1 | Nothing | 11 October 2026; the link 13 October 2026 |
| D4.8 Program page | "D4.8 Program page" and "D4.8 Program page · phone" (row 13): signed in and signed out on both, light and dark, then signed in before adding grades, a requirement missing with the fit worked out, a US program with no IB minimum, no image, its admit rate and its "How competitive" section, the longest name, the image credit as a caption, back from sign-in with `?save=1`, a failed save, loading and not found, with real programs and the production matcher. They replace "Program detail" and "Phone · Program (dark)". **Decided 12 October 2026 (owner), every recommendation:** the trail stops above the page, and the country crumb opens the country's guide; the fit panel beside the requirements, the score behind "How the fit is worked out"; no "Similar programs" or "Rank in your matches" (they need the match list); descriptions cut at eight lines past ten, and "How competitive:" its own section; no image, a one-column hero; a not-found page of its own. Phone: the fit panel before the facts; no fixed bottom bar; the trail wraps. Decisions in 2.4. **Changed 13 October 2026 (owner):** signed in before adding grades, Save is the link to first run with "Add your grades first. We’ll save it when you finish." under it, and the panel's "Add your grades" comes back to the program, without `?save=1` ("D2.1 Save · without grades", row 15); built in 3.1 | Nothing | 12 October 2026; Save before grades 13 October 2026 |
| D4.9 University page | "D4.9 University page" and "D4.9 University page · phone" (row 13): signed in and signed out, light and dark, then a US university with no image and its admit rate, the longest list (Manchester, 68 programs in 12 fields), programs taught away from the main city (Sciences Po), the longest name (LSE), loading and not found. **Decided 12 October 2026 (owner), every recommendation:** the signed-in header for signed-in students; every program, grouped by field, with field links; no fit here, a link to Explore with the name typed; a US university's admit rate in its facts; "Also known as" only when the short name adds something; a program's campus city when it is taught elsewhere. Phone: field links wrap above the list; two-line rows; Contact and the guide after the programs. Decisions in 2.4 | Nothing | 12 October 2026 |
| D4.10 Shortlist | "D4.10 Shortlist" and "D4.10 Shortlist · phone" (row 14): List and Compare in light and dark on both, then choosing programs, a removal with Undo, a removal that failed, one program, an empty shortlist, profile incomplete, loading and a failed load, for the D4.6 student's eight-program shortlist. They replace "Shortlist and compare". **Decided 13 October 2026 (owner), every recommendation:** List and Compare as two links with their own address; the D3.3 rows with the fit; newest first, no sort; a removed program keeps its row until the student leaves the page; compare needs two; one read more than today, the student's subjects. Decisions in 2.5 | Nothing | 13 October 2026 |
| D4.11 Academic profile and settings | "D4.11 Academic profile" and "D4.11 Academic profile · phone" (row 17): the summary in light and dark on both, loading, the longest names with five fields and Open to anywhere, a profile the IB's rules stop, and before grades; then each screen it opens, with a change, leaving it unsaved, saving, a failed save, and back on Academic. "D4.11 Settings" and "D4.11 Settings · phone": not linked and linked to a school (the one school in production, 56 characters), no name yet, the name changed, saving, saved and failing, the download preparing and failing, unlinking, and deleting to the page after it, light and dark on both. They replace "Academic profile" and "Phone · Profile tab". **Decided 18 October 2026 (owner), every recommendation:** Academic is a summary in three panels, Subjects and grades, then Interests and Countries, each opening its own screen; each screen opens on its own, with Save changes, which goes back to Academic with a toast and See matches; leaving with changes not saved asks first (D2.10); a saved profile the IB's rules stop says why on the panel; before grades, Academic is first run. Settings keeps every feature in three panels, Account, School and Your data; the name saves on its own; Appearance and Sign out only in the account menu; "Preparing…" for the download; after deleting, a static "Your account is deleted" page. Decisions in 3.3 | Nothing | 18 October 2026 |
| D4.12 Country guide template | None | **No board.** Phone and desktop, drawn from one guide's real content | |
| D4.13 Requirements hub | None | **No board.** `/ib-university-requirements`, including a country whose programs set no IB minimum (the USA) | |
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
| 6–7 | Match card and results | 2.2 | D2.9, D2.11, D3.1, D3.2, D3.4, D4.6 | large | **Done 11 October 2026.** The Matches page, match card, "Why this match", toast and empty states. `ProgramCard` stays for today's pages until cleanup; the result row moves to 8 |
| 8 | Explore | 2.3 | D2.15, D3.3, D3.5, D4.7 | medium | **Done 11 October 2026.** Toolbar and menus, the phone sheet, result rows, 20 at a time. The fit and "Only ones I qualify for" are worked out on the server; the search index gained the length in years and the admit rate |
| 9 | Program and university pages | 2.4 | D3.4, D4.8, D4.9 | medium | **Done 12 October 2026.** Breadcrumbs with structured data, the requirement checklist signed in and out, the fit panel, every program by field, not-found pages; sign-in returns to the page and Save saves on the way back. No loading state (it would prefetch every program link) |
| 10 | Shortlist and compare | 2.5 | D3.7, D4.10 | medium | **Done 13 October 2026.** List and Compare from one response with the fit, one read more than today (the student's subjects); up to four on desktop, two on a phone. The nav count is kept in the browser, with no read of its own |
| 11 | First-run steps | 3.1 | D2.6, D4.3, D4.4; the D2.1 Save change | medium | **Done 13 October 2026.** Steps 1 and 2 in the new design, saved as drafts; focus mode from first run's mark on the page; Save without grades through first run and back, on a program or an Explore row. Step 3 is today's until 3.2 |
| 12 | Subject editor | 3.2 | D3.6, D4.5 | medium | **Done 14 October 2026.** One editor, `ProfileEditor`, for first run's step 3 and editing after: a row per IB group, any subject in any row, the core, the checks, and one total in the footer. Save and exit keeps a draft without a total; the IB's failing conditions read the same words everywhere (`lib/ib/diploma.ts`) |
| 13 | Academic profile and settings | 3.3 | D2.10, D4.11 | medium | **Done 18 October 2026.** Academic is a summary in three panels, each opening its own screen at its own address, with no request between them; Save changes comes back with a toast, and leaving with a change asks first. Settings in three panels. One `ConfirmDialog` for Delete, Unlink and leaving unsaved, with a danger button. The delete route runs in one transaction, the export includes "Open to anywhere", and deleting ends on a static page |
| 14 | Home | 4.1 | D4.1 | medium | |
| 15 | Country guides | 4.2 | D4.12 | large | Late (see the coordination rule). Two or three first, then the rest. This is `MAINT_tasks.md` 7.2, done once in the new design |
| 16 | Other public pages and the guard | 4.3, 4.4 | D4.2, D4.13–D4.16 | medium | |
| After 16 | Program card review | 5.1 | D3.8 | small to medium | Parked 11 October 2026: decided once every screen can be seen in the preview. A build only if a prototype other than A wins |
| 20 | Policy update banner | 4.6 | D2.16 | small | Added 18 October 2026 (owner). After 16, before release day: today's amber banner still shows on signed-in pages in the new design |
| 19 | Motion and feedback | 5.2 | D1.6 | medium | After 16 and the program card review, before release day: one standard for how every component moves and answers a touch, from a review of every built screen (owner, 12 October 2026) |
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
| 6–7 | `/design D3.1, D3.2, D3.4`: match card, "Why this match", requirement checklist, and the two US chips on D2.7. Then `/design D2.9, D2.11, D4.6`: toast, empty and error states, the Matches screen | Those six boards, and D2.7's US chips | `/build 6–7`: match card and results (2.2) | Done 11 October 2026 |
| 8 | `/design D2.15, D3.3, D3.5, D4.7`: bottom sheet, result row, filter toolbar, Explore | Those four boards | `/build 8`: Explore (2.3) | Done 11 October 2026 |
| 9 | `/design D4.8, D4.9`: program and university pages | Those two boards. D3.4 is approved in row 6–7 | `/build 9`: program and university pages (2.4) | Done 12 October 2026 |
| 10 | `/design D3.7, D4.10`: compare table, Shortlist | Those two boards | `/build 10`: shortlist and compare (2.5) | Done 13 October 2026 |
| 11 | `/design D2.6, D4.3, D4.4`: checkbox rows, first-run steps 1 and 2 | Those three boards, and the change board "D2.1 Save · without grades" | `/build 11`: first-run steps (3.1) | Done 13 October 2026 |
| 12 | `/design D3.6, D4.5`: subject editor, first-run step 3 | Those two boards | `/build 12`: subject editor (3.2) | Done 14 October 2026 |
| 13 | `/design D2.10, D4.11`: confirm dialog, profile and settings | Those two boards | `/build 13`: profile tab and settings (3.3) | Done 18 October 2026 |
| 14 | `/design D4.1`: Home on a phone | The Home board, with the cookie banner, which stays (owner, 10 October 2026) | `/build 14`: Home (4.1) | |
| 15 | `/design D4.12`: country guide template | The template board | `/build 15`: country guides (4.2) | Late: see the coordination rule |
| Before 16 | None. First the research in 4.5: which policy and privacy pages the redesign covers | The list in 4.5, which may add to D4.14 | None | Added 18 October 2026 (owner) |
| 16 | `/design D4.2, D4.13–D4.16`: sign-in, requirements hub, text pages, 404 and error pages, school invitation | Those five boards | `/build 16`: other public pages and the guard (4.3, 4.4) | |
| After 16 | `/design D3.8`: the program card in every list, reviewed against the built screens | D3.8 | 5.1, only if a prototype other than A wins | Parked 11 October 2026 |
| 20 | `/design D2.16`: the policy update banner | The banner board | `/build 20`: the policy update banner (4.6) | After 16, before release day |
| 19 | `/design D1.6`: go over every built screen's interactions and draw one rule set | D1.6 | `/build 19`: motion and feedback (5.2) | After 16, before release day |
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
- [x] 2.2 Match card, result row and requirement checklist (11 October 2026; the result row is built
  in 2.3, the checklist's program-page variant in 2.4)
- [x] 2.3 Explore: toolbar, phone filter sheet, rows (11 October 2026)
- [x] 2.4 Program and university pages (12 October 2026)
- [x] 2.5 Shortlist with compare (13 October 2026)

Phase 3 — Profile and onboarding

- [x] 3.1 First-run interest and country steps (13 October 2026)
- [x] 3.2 Subject editor (14 October 2026)
- [x] 3.3 Academic profile and settings (18 October 2026)

Phase 4 — Public pages

- [ ] 4.1 Home page
- [ ] 4.2 Country guides on one template
- [ ] 4.3 Other public pages
- [ ] 4.4 Guard against raw palette classes
- [ ] 4.5 Policy and privacy pages: what the redesign covers (research)
- [ ] 4.6 The policy update banner

Phase 5 — After the whole preview

- [ ] 5.1 The program card in every list (review)
- [ ] 5.2 Motion and feedback in every component

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
- [x] Decide whether the cookie banner stays: **it stays** (10 October 2026; `MAINT_tasks.md`, owner tasks). Affects 4.1
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
7. **No new database reads, and no new reads of the programs cache.** The theme lives in
   `localStorage`. Use `select` over `include` in anything touched. The programs cache
   (`programs:all:v3`) is 3 MB per read against Upstash's free 10 GB a month (MAINT_tasks.md 5.19),
   and Algolia's free plan allows 10,000 search requests a month. Before building a screen, list
   every read it makes (database, Redis, search) against today's, and raise any new one with the
   owner first (owner, 11 October 2026).
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
  stale, and reading it is a new query. It comes with the shortlist in 2.5 (decided in 2.2: the
  Matches response could feed it only on Matches).
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
  chip; any other course, or one added later, keeps its stored name. D3.1 confirmed the list (10 October 2026).
- An either/or names the course the student took, as the program card does today, so §9's
  "English A SL 6 · via Literature" reads "English A Lit SL 6". D3.1 chose the course name (10 October 2026). With
  none taken, a group of one or two courses is named in full ("French B or Spanish B HL 5 · not
  taken"); a longer one, up to 45 courses, names its first and counts the rest ("French B HL 5 or 2
  others · not taken"), as D3.1 proposed and the owner approved.
- **Badge copy beyond §9's examples, confirmed on D3.1 (10 October 2026), with one change in 2.2:** "Needs 6 more points", "Needs a 7 in
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
RequirementChecklist. The matches page groups by status. See the canvas boards "D3.1 Match card",
"D3.1 Match card · phone", "D3.2 Why this match", "D3.4 Requirement checklist" and "D2.7 Chip · no IB
minimum" (row 10), and "D2.9 Toast", "D2.11 Empty and error states", "D4.6 Matches" and "D4.6 Matches ·
phone" (row 11).

**Design gate:** D2.9, D2.11, D3.1, D3.2, D3.4 and D4.6, approved ([Step 2](#step-2--design-first)).

**Must-haves:**
- **Every requirement visible on the card** as a chip with its own status and the student's grade
  ("– Maths HL 7 · you 6"). Problems first; more than four collapse to "+N met" (audit 3.2, 3.9).
- **"Why this match"** opens in place on desktop and phone: needed against actual values, what would
  close the gap, field and country, and the fit score with its weighted parts. Reuse the logic in
  `components/student/MatchBreakdown.tsx`, then delete that file.
- **Status groups** on the matches page, the third collapsed, **grouped before any cap** (D4.6). Today
  the route keeps the best 50 by score (`MAX_MATCHES_RETURNED`, `MAINT_tasks.md` 5.12) and only then
  could the page group them. For the D4.6 student that is 50 of 139 "Meets all" programs, all at 100%,
  and none of the 21 within reach or the 11 missing a requirement; 77 of 142 profiles have more than
  50 matches. Every match reaches the page, with true group counts and no "top 10" or "best 50" copy.
  Slim what each match sends (a card needs a fraction of today's 3.3 KB) and decide whether "Why this
  match" loads with the list or on opening; the response stays small on the wire.
- **Either/or requirements** show each option's own level and grade. This is the display half of
  `MAINT_tasks.md` 5.7, which shipped to `main` first (prep P6). Reuse its helper here:
  `groupRequirements` in `lib/programs/requirement-groups.ts`.
- **Honest save.** "Saved" appears only after the server confirms; a failure reverts with a toast.
  Logged out, Save leads to sign-in (a same-origin `callbackUrl` to the program with `?save=1`) and
  saves the program on return. Today it shows "Saved" and stores nothing (audit 4.1).
- No "Refresh Recommendations" button (audit 4.4).
- **Programs with no IB minimum** (US, `CONTENT_tasks.md` 6): no points chip, the no-minimum chip and the university's admit rate
  (`University.admitRate`, `internationalAdmitRate`, `admitRateYear`), as approved on D2.7 and D3.1. The matches API and the
  programs cache do not carry the admit rate yet; add it there. Display only: matching never reads it, and the 2.1 fingerprint
  must stay byte-identical.
- Delete `ProgramCard.tsx` when nothing imports it.

**Decided on the boards (owner, 10 October 2026), every recommendation approved:**
- **Chip and badge copy** (D3.1). A met either/or names the course taken ("English A Lit SL 6"), not
  "via Literature". An unmet either/or of three or more courses names the student's course and counts
  the rest: "Spanish B HL 5 or 5 others · you SL". `match-status.ts` says "Spanish B HL 5 · you SL"
  today; change it. Groups of two stay as they are ("Maths AA HL 7 · you 6"). With no course taken in
  a long group the badge reads "Needs French B or 11 others at HL", not "Needs French B HL or 11
  others". The 15 short names in `lib/ib/course-names.ts` stay. Every other badge as the helper writes
  it (the table on "D3.1 Match card").
- **The card** (D3.1). Missing, close and note chips always show; met ones fill up to four and the
  rest collapse into "+N met", as `cardChips` does. Program and university names wrap in full
  (`overflow-wrap`), never cut with an ellipsis. A university with no image gets its initials ("MIT")
  on brand-soft, hidden from screen readers. "Why this match" has a chevron and a 44px target. Phone:
  padding 16, thumbnail 48, no line under the header, "Why this match" below the chips at 14px.
- **No IB minimum** (D2.7 change, D3.1). The chip is "No IB minimum · admits 4.6%", the overall
  `admitRate` with one decimal, first among the notes, with hidden text " of first-year applicants";
  "No IB minimum · holistic admission" when the rate is null. The status stays "Meets all
  requirements".
- **"Why this match"** (D3.2). The button keeps its name when open; aria-expanded and a turning
  chevron carry the state. The panel lists every requirement, the ones in "+N met" too, in the D3.4
  table at 14px, with the other courses at their own levels and grades. Groups of more than eight
  courses (41 of 2,170) name the student's course and open the rest from "All 25 options", grouped by
  level and grade. Then one note on what would close it, the caution line for an older intake, field
  and country, the fit score with its three parts, the sum and any cap in plain words ("capped at 80%
  because a required subject is one grade short"), "It isn't a chance of admission", and a link to
  the program page. A US program's points row says "No minimum" and gives the admit rate, the
  international one too where reported, with the year.

**Decided on the boards (owner, 10 October 2026, row 11), every recommendation approved:**
- **Five per group, then "Show 20 more"** (D4.6). Each open group shows its first five cards, then a
  secondary button ("Show 20 more", or the remainder: "Show 16 more") beside "Showing 5 of 139". It
  moves focus to the first new card's title. On a phone the button is full width.
- **Order inside a group** (D4.6). Score first, then the minimum closest to the student's total, then
  programs with no IB minimum, then university and program A–Z. 139 programs tie at 100% for the D4.6
  student, so "Best fit" needs the second key; the list opens with LSE and UCL at 38/38, then Trinity
  and UBC at 37. "Lowest points needed" and "Country" put no minimum last too. Scores don't change.
  The sort is D2.3's native select: Best fit, Lowest points needed, Country.
- **Three jump links, no filter tabs** (D4.6). Under the summary sentence: "139 meet all
  requirements", "21 within reach", "11 missing a requirement", each with its status icon, linking to
  its group heading. On a phone, a panel of three 48px rows (group, count, arrow). A group with no
  programs is left out, with its link; with one group there are no links.
- **Groups** (D4.6). Each heading is an h2 with the status icon in a 28px circle and one line under it.
  "Missing a requirement" is a bar holding a button with aria-expanded, collapsed unless it is the only
  group. The summary reads "171 programs in your fields and countries, grouped by how close you are"
  (phone: "in your 2 fields and 5 countries"). The list ends: "That's every program in your fields and
  countries near your total. Explore has every program, each with your fit." When the matcher widened
  its search (fewer than 10 candidates), the summary says "Few programs fit your fields and countries,
  so this list also includes others near your total"; the route needs to return the tier it used.
- **The profile beside the list** (D4.6, desktop). A flat panel at 320px, sticky: the predicted total,
  the six subjects by short name, TOK and EE, fields, countries, and Edit to Academic, then the line
  about intakes. It comes in the matches response (no extra database read), so loading and a failed
  load treat it like the list. Below 1024px it goes: the summary sentence counts the fields and
  countries, and Academic is a tab away.
- **Loading** (D2.8, D4.6). The header and title stay; the summary, the jump links, three cards and
  the profile are skeletons, the sort select is disabled, and one hidden status says "Loading
  matches". It replaces the page loader and the FadeIn and StaggerChildren entrances.
- **Empty and error states** (D2.11). One flat panel in the list's place: a 44px icon tile (sunken;
  gap-soft for errors; brand-soft for the profile call to action), an h2, one or two sentences, at
  most two D2.1 buttons, left-aligned; stacked full width on a phone. The copy is on the board:
  "Nothing meets the requirements yet" above the open Missing group, "No programs match these filters"
  (Explore), "Your shortlist is empty", "Your matches didn't load" with "Try again", which reads
  "Trying again…" while it runs and adds a contact line after a second failure, and "Complete your
  academic profile" with three steps (Interests, Countries, Subjects and grades) and "Add subjects and
  grades". The panel is the live region the skeleton held. It replaces `CompleteProfileCTA` and the
  full-screen blocks in `RecommendationsClient`.
- **Toast** (D2.9). The other theme: the foreground and background tokens swapped, with the other
  theme's ok, gap and focus colours. One at a time, a new one replacing the last. Bottom centre on
  desktop, 24px up; on a phone 12px above the tab bar, 16px from the edge while the bar is hidden,
  with the action under the message. Messages: "Saved to your shortlist." (View shortlist), "Removed
  from your shortlist." (Undo), "Couldn't save Computer Science." and "Couldn't remove Computer
  Science." (Try again), "Signed in. Computer Science is on your shortlist." and "Signed in, but
  Computer Science wasn't saved." Every toast has a close button. Successes 5 seconds, failures 10;
  hover or focus pauses; no progress bar. One polite live region named Notifications. It replaces
  `components/ui/toast.tsx`.
- **No image** (D3.1's initials, as drawn on D4.6). The stored `abbreviatedName` when it is an acronym
  of five letters or fewer (MIT, UCLA, UBC), otherwise the initials of the name's main words: the
  University of Michigan's is stored as the word "Michigan", so its tile reads "UM". Imperial's is
  stored as "London"; it has an image, so it never shows.

**Found on the boards, not changed by 2.2:** 16 requirement rows in 10 programs store grade 1, so a
card says "Maths AA SL 1" (Boston University, Business Administration); and one course can satisfy two
requirement groups (152 cases in 53 programs), so Manchester's MBChB card shows "Biology HL 6 · you 5"
twice. The second is a matching fault, not just a display one: such programs can show "Meets all
requirements" to a student with only one of the two subjects they need. Tracked as
`MAINT_tasks.md` 5.18; 2.2 shows what the matcher returns.

**Done 11 October 2026.**

- **The page.** `app/student/matches/MatchesClient.tsx`, loaded through `NewMatches.tsx` as its own
  chunk, so today's students download none of it (the lesson of 1.5's `chrome.tsx`). Groups by
  status before any cap, five cards a group then "Show 20 more" (focus to the first new title, "20
  more shown" read out), three jump links (a three-row panel on a phone), the sort, the profile
  panel from 1024px, the loading skeleton, and the D2.11 panels for a failed load, an incomplete
  profile and "Nothing meets the requirements yet" above an open Missing group.
- **The card and "Why this match"** in `components/match/`: `MatchCard` (and its skeleton),
  `WhyThisMatch` (the D3.4 table at 14px on desktop, a list on a phone, "All N options" over eight
  courses) and `useShortlist`, the honest save: "Saved" only after the server confirms, a failure
  reverts with a toast, removing offers Undo.
- **`Toast` and `EmptyState`** in `components/ds/`. The toast's other-theme colours are tokens
  (`--toast-ok`, `--toast-gap`, `--toast-ring`) with their contrast in `app/globals.test.ts`; on a
  phone it follows the tab bar, which now marks itself `data-tab-bar` and `data-hidden`.
- **The data.** A new route, `GET /api/students/matches/list`, returns every match as the card and
  "Why" show it, built on the server by `lib/matching/match-list.ts` and `match-why.ts`, with the
  profile panel and the shortlist's ids, from the one profile query (now a `select`). Today's
  `GET /api/students/matches` is unchanged and goes at cleanup. For the D4.6 student: 171 matches,
  1.4 KB each with "Why" included, **10 KB gzipped**, so "Why this match" loads with the list and
  opening it fetches nothing. The programs cache (`programs:all:v3`) adds the entry year and the
  admit rates; a deployment still on `v2` keeps reading its own key.
- **Copy changes approved on D3.1 and D2.7**, in `match-status.ts`: "Spanish B HL 5 or 5 others · you
  SL", "Needs French B or 11 others at HL", "No IB minimum · admits 4.6%" (read out with " of
  first-year applicants"). `MatchBreakdown.tsx` is deleted; its logic is `match-why.ts`.
- **Checked.** Scores unchanged: the 72,060-result fingerprint is byte-identical before and after.
  `npm run build` lists every route as `main` does, plus the new API route. Measured against a
  build of `main`, today's students download no new code: JS +0.4 KB gzipped on public pages and
  +0.6 KB on Matches (renamed identifiers and module ids in shared chunks), CSS +1.6 KB (28.8 KB,
  under 32). The new page's own code is 10.1 KB gzipped against today's 23.5 KB. Design QA
  screenshots of every board state, desktop and phone, light and dark, forced colours and 900px,
  are in the pull request.

Departures and hand-offs:

- **The result row moves to 2.3**, whose gate holds its board (D3.3). **The checklist's
  program-page variant** (signed out, no grades yet, the entry-year line) comes with 2.4; this
  session built the table inside "Why this match".
- **`ProgramCard.tsx` stays** until cleanup: today's Explore, program, university, shortlist and
  coordinator pages still import it, and today's design keeps them until release.
- **The signed-out Save moves to the first signed-out card** (2.3's rows, 2.4's program page).
  Matches is always signed in, and sign-in ignores `callbackUrl` today (`app/auth/signin/SignIn.tsx`
  returns to `/student`), so "saves on the way back" needs sign-in changed first. The two
  after-sign-in toasts on D2.9 go with it.
- **The Shortlist count in the desktop nav** (drawn on D4.6) moves to 2.5: the Matches response
  could feed it on Matches only, and it would vanish on every other page.
- **The toast provider is in the signed-in frame** (`AppFrame`), not the root layout: only a
  signed-in student saves, and a client component in the root layout joins every visitor's download.
- **"Why this match" opens with a fade, not a height change**: the Definition of done allows only
  transform and opacity.
- **"The route returns the tier it used"** became "the list says when it reaches beyond the
  student's fields and countries", read from the results (`isWidened`). The matcher widens past
  them only from tier 3, and every such tier adds programs outside them, so the summary appears
  exactly when the board asks; the match cache, shared with today's route, keeps its shape.
- **Copy the boards didn't draw**, kept to the boards' words: with a widened list the empty panel
  says "All 38 programs in this list" and the closing line keeps only its Explore sentence; a
  student open to every field or country reads "Business & Economics; you're open to every
  field"; "Get started" until interests and countries are both saved; the fit sentence for caps the
  boards didn't show ("capped at 90% because you're 2 points short").

### 2.3 — Explore: toolbar, phone filter sheet, rows

**Outcome:** Search uses a chip toolbar (Field, Country, IB points, Length), a bottom sheet on phones
with the result count on its button, compact result rows, and 20 results per page with "Show 20
more". See the canvas boards in row 12: "D2.15 Bottom sheet", "D3.3 Result row", "D3.5 Filter
toolbar", "D4.7 Explore" and "D4.7 Explore · phone". They replace "Explore programs", "Phone ·
Explore" and "Phone · Filters sheet".

**Design gate:** D2.15, D3.3, D3.5 and D4.7, approved ([Step 2](#step-2--design-first)).

**From 2.2:** the result row (D3.3), and signed out, Save as a link to sign-in that returns to the
program with `?save=1` (see 2.4). Saving goes through `useShortlist` (`components/match/`).

**Must-haves:** filters stay in the URL, as today. "Only ones I qualify for" appears once the student
has a profile. Rows show minimum points large and aligned, and the student's fit when logged in.
Images are 48–64px thumbnails, not full width (audit 3.3).

**Decided on the boards (owner, 11 October 2026):**
- **The phone filters sheet** (D2.15, every recommendation approved). A choice applies at once: the
  list behind the sheet updates, the URL keeps up, and the footer button carries the count ("Show 43
  programs"). Closing never loses a choice, whichever way it closes: the button, the X, the scrim,
  Escape or Android's Back. A native `<dialog>` opened with `showModal`, named by its "Filters"
  heading, which takes focus first; focus returns to the Filters button. No drag handle. 92% of the
  screen, header and footer fixed, the middle scrolling. Every section open: "Only ones I qualify
  for" (with a profile), Field and Country as two-column grids, IB points, Length, each heading
  saying what's chosen ("Country · 3 chosen"). With nothing matching, the button reads "No programs
  match" and is aria-disabled beside Clear all; if the count request fails it reads "Show programs"
  and still closes. Signed in with a profile, each heading line carries a shortcut from the profile,
  "Use my fields", "Use my countries" and "Up to my 38", which ticks the student's own choices and
  nothing else; no limit on how many boxes are ticked. Opens with a 240ms slide, closes in 180ms, a
  fade with reduced motion. The sections' filters themselves (the no-minimum box, Length's three
  options) are D3.5's, below.
- **The result row** (D3.3, every recommendation approved). A program with no IB minimum shows
  "None" in the IB minimum column, smaller than the figures, with the university's overall admit
  rate under it ("Admits 3.8%"), read as "IB minimum: none. Admits 3.8% of first-year applicants";
  "Holistic" when a university reports no rate (none did when 2.3 was built; since 12 October 2026,
  21 programs at Constructor University and Bard College Berlin do, `CONTENT_tasks.md` 7). The search
  index doesn't carry the admit rate yet. The fit is the Matches badge word for word
  (`deriveMatchStatus`), wrapping inside its column; no percentage and no requirement chips. Signed
  out, or signed in before adding grades, there is no fit column and the program column takes the
  room. An ordered list, not a table: each
  program name an h3 and the row's only link, Save the only other control; the desktop column
  headings are drawn but hidden from screen readers, and each value carries its label ("Length 4
  years", "IB minimum 37"). Desktop columns: thumbnail 56, program, country 140, length 88, IB
  minimum 104, fit 260, Save 44, 16 apart (without a fit: country 160, length 100, minimum 120). On a
  phone: thumbnail 48, the name, university and country, the fit in its status colour with its icon,
  the minimum on the right with "points" under it ("None" over "admits 3.8%"), Save; D2.8's 44px
  phone skeleton grows to 48. Names wrap in full. No hover on the whole row; the name underlines.
  The fit arrives after the rows, as a skeleton the size of a badge. Signed out, Save is a link,
  "Sign in to save Computer Science, University of Toronto", that returns to the program with
  `?save=1`.
- **The filter toolbar** (D3.5, every recommendation approved). The chips Field, Country, IB points
  and Length (D2.5), the switch "Only ones I qualify for", and Sort at the right, which moves to its
  own line between 768 and 1023px. Each chip opens a popover (the HTML popover attribute) holding a
  labelled dialog, not an ARIA menu: focus moves to its first control and returns to the chip when
  it closes; one open at a time; 8px under its chip, left edges aligned, opening leftwards at the
  window's edge. Field 320px wide, Country 440 in two columns A to Z, IB points 340, Length 300;
  rows 40px. A choice applies at once, as in the sheet; the footer holds Clear (this filter only)
  and the count button ("Show 43 programs"; "No programs match", aria-disabled, at zero); Escape and
  a click outside close the menu and keep the choice. No count beside each option. Signed in with a
  profile, the menus carry the sheet's shortcuts: "Use my fields", "Use my countries", "Up to my
  38". IB points: From and To (D2.2) with "The program's minimum: any whole number from 24 to 45"; a
  value it can't use shows D2.2's error when the field loses focus and isn't applied (the count
  stays, the chip stays unfilled). "Include programs with no IB minimum", ticked by default: today a
  "to" value keeps those 286 US programs and a "from" value drops them silently
  (`lib/algolia/search.ts`). An applied range names itself on the chip: "IB points · up to 38".
  Length: 3 years, 4 years, 5 years or more, from the 9 stored values (3½ counts as 3, 4½ and "4–5"
  as 4, "5 years (4+1)" as 5); the search index needs the length as a number of years. Sort: Most
  relevant, Lowest points needed, Highest points needed, with programs that have no IB minimum last
  in both points sorts; no "Best fit". Signed out, the switch's place holds "Sign in to see which
  ones you qualify for", which returns to this search; signed in before adding grades, "Add your
  grades to see which ones you qualify for", to Academic. "Only ones I qualify for", when on, is
  also a removable chip. The URL holds all of it: the search, fields, countries, the points range
  (which today's page leaves out), the no-minimum box, length, the switch and the sort.
- **The Explore page** (D4.7 and its phone board, every recommendation approved). The header (D2.12:
  signed in, or the public one), then a 1192px column from 40px down: the H1 "Explore programs"
  (34/40; the same meaning as today's "Search Programs", one h1) with "1,628 programs in 23
  countries, each with its IB requirements.", both numbers from what the page already loads (the
  search's total and the country list); the search at 52px, up to 760 wide, in a search landmark;
  the toolbar (D3.5); the count as a polite status ("73 programs for “computer science”") with the
  applied chips and Clear all; the rows (D3.3); "Show 20 more" with "Showing 20 of 73"; the
  questions; the footer. 20px between blocks, no side panel. **20 at a time**, in place of 50 a
  page with Previous and Next: new rows join the list, focus moves to the first new name and "20
  more shown" is read out; while they load the button reads "Loading 20 more…" (aria-busy) and
  skeleton rows the size of real ones follow the last row (D2.8). How many are shown goes in the URL
  with the filters, so Back from a program returns to the same row. If the next 20 fail, a short
  notice takes the button's place ("The next 20 didn't load. Check your connection and try again.
  The 20 above stay." with "Try again"), a case D2.11 didn't draw. **A filter change keeps the rows
  until the new ones arrive**: no skeleton flash, the list aria-busy, the count changing with the
  rows. Signed out there is no fit column, and "Sign in to see which ones you qualify for" stands
  where the switch would be; no banner. The first 20 are in the server HTML for everyone, as today;
  the fit follows in its column. 2.3 decides where the fit is computed: one narrow profile read per
  search, or the matches already cached for the student; signed out, nothing is read. With no
  search typed the list opens at the highest minimum, as today (the search service's ranking). No
  results and a failed load use D2.11's panel in the list's place ("No programs match these
  filters", naming the filters, with "Clear all filters"; "Programs didn't load", "Try again"), with
  the search, toolbar and applied chips still usable. **The page's questions become visible**: the
  eight questions of the FAQPage structured data, collapsed `<details>` at the end under the h2
  "Questions about Explore", with their words unchanged (SEO parity; the JSON-LD stays in
  `page.tsx`). Two answers are out of date ("see your match probability", "over 1000 university
  programs" when there are 1,628): rewording them is a separate pull request after 2.3. On a
  phone: one Filters button carrying the number chosen ("Filters · 3") beside the switch, opening
  the sheet (D2.15); the count, then the applied chips, then Sort on its own line at the right;
  "Show 20 more" full width under "Showing 20 of 73"; the questions and the footer above the tab
  bar. Signed out there is no tab bar (D2.14). The Shortlist count in the nav comes with 2.5.

**Done 11 October 2026.**

- **The page.** `app/programs/search/ExploreClient.tsx`, loaded through `NewExplore.tsx` as its own
  chunk, so today's visitors download none of it. `NewExplorePage.tsx` reads the list from the URL
  on the server and puts its rows in the HTML for everyone, as many as the URL had shown. Signed
  in, one narrow profile read says whether the student has grades (the fit column and the switch),
  gives the shortcuts their choices and marks what's on the shortlist; signed out, nothing is read.
  The questions (`components/explore/ExploreQuestions.tsx`) and the FAQ structured data share one
  copy, `lib/explore/questions.ts`, and today's page sends byte-identical JSON-LD.
- **The parts** in `components/explore/`: `FilterMenu` (a chip and its popover, a labelled
  dialog), `FilterSheet` (the native dialog, the Filters button and the switch's row),
  `FilterParts` (checkbox rows, the IB points fields, the shortcuts) and `ResultRow` (with its
  headings and skeleton). D2.5's `FilterChip` now names an applied range ("IB points · up to 38")
  and turns its chevron up while its menu is open, as D3.5 draws. `UniversityThumb` moved out of
  `MatchCard`, which shares it.
- **The list.** `GET /api/programs/explore` takes the page's own URL parameters and a window. In
  the search service's own order with the switch off, a window is one search, as today. The points
  sorts and "Only ones I qualify for" need every match, so they read them all (the search, then a
  browse past its 1,000-hit window), filter and sort on the server, and cut the window; programs
  with no IB minimum come last in both sorts. The URL state, words and filters are in
  `lib/explore/`, with Vitest tests.
- **Where the fit is computed, as 2.3 had to decide:** on the server, from one narrow read of the
  student's subjects per search, fresh each time so a change to the academic profile shows at
  once, and the rows' own search records, which carry the minimum and every requirement with its
  either/or group (`lib/explore/fit.ts`). Explore reads nothing else: no programs cache, no match
  cache. The cached matches cover only the student's fields and countries near their total, and
  Explore lists every program, so they couldn't serve. The status needs only the academic match,
  so the fit is the Matches badge word for word; for all 1,628 programs and three test profiles
  (29, 38 and 44 points), the fit from the search records equals the fit from the programs cache.
  The rows come with their fit, the first ones in the server HTML.
- **Why not the programs cache (owner, 11 October 2026):** it is 3 MB per read from Upstash, whose
  free plan allows 10 GB a month, so about 3,300 reads, and Matches already reads it on every load
  (MAINT_tasks.md 5.19). The first version of this build read it for the fit too; it was changed
  before merging, so the redesign adds no Upstash reads beyond 2.2's 5.5% on Matches. Upstash on
  11 October 2026: 1 GB and 6.1K commands of the month used.
- **The search index** carries `durationYears` (3, 4, or 5 for five or more), the university's
  `admitRate`, and each requirement's `orGroupId` in `requiredCourses`. `lib/algolia/sync.ts`
  writes all three; `scripts/algolia-explore-attributes.ts` filled the 1,628 records already there
  on 11 October 2026, with the owner's approval (615, 929 and 84 by length; 286 with a rate; 5,902
  requirement rows, 5,426 in either/or groups). `scripts/sync-to-algolia-standalone.ts` writes them
  too, and `noIBMinimum`, which it had left out.
- **Checked.** Without the preview, `/programs/search` sends the same HTML as `main`, signed out
  and signed in; `npm run build` lists every route as `main` does, plus the new API route, with
  36 static pages on both. Today's visitors download 0.17 KB more JavaScript, gzipped (the lazy
  wrapper's reference), and the CSS is 29.7 KB (+1.1, under 32). The new page's own code is 11.0 KB
  gzipped, plus 6.6 KB of shortlist and toast code it shares with Matches. No matcher code
  changed, and the matching suite passes. A whole run of the behaviour checks read the programs
  cache zero times.
  38 behaviour checks pass (headings, focus after "Show 20 more", Back to the same 40 rows, the
  menus' and sheet's focus and Escape, the sorts, the signed-out links). Design QA screenshots of
  every board state, desktop and phone, light and dark, forced colours and 900px, are in the pull
  request.

- **Fixed after merging (11 October 2026):** a choice of Length made in the menu or the sheet did
  nothing. The list request's window parameter was also called `length`, so it replaced the
  filter's; it is now `limit`, built by `exploreListUrl` in `lib/explore/query.ts`. A link that
  already carried `length=4` always worked, which is how the QA missed it: the behaviour checks
  now apply every filter in the browser and compare the count with the server's for the same URL.

Departures and hand-offs:

- **Rows stack below 1024px**, not 768. D3.3 draws 1192 and 390; from 768 to 1023 the seven
  columns left the name about 20px. In that range the toolbar is D3.5's, and the rows are the
  phone's with the 56px thumbnail.
- **A visually hidden h2, "Programs",** above the rows: the board's h1, then an h3 per program,
  would skip a level (Definition of done 12).
- **An IB points value it can't use removes the range while it stands,** so the count is the one
  without it, as D3.5 says ("the count stays 73"), even when the other field is usable.
- **Copy the boards didn't draw,** kept to their words: the no-minimum box unticked on its own
  shows "IB points · with a minimum" on the chip and "Only with an IB minimum" as an applied chip;
  no results for a search with no filters reads "No programs match this search", with "Clear the
  search"; with the switch on, "No Medicine & Health programs on IB Match meet every requirement
  with your grades yet."
- **The fit is in the server HTML with the rows,** so the "fit arriving" state drawn on D3.3 and
  D4.7 no longer happens: the fit needs no second request now.
- **The summary's catalogue count** is the list's own total when nothing narrows it, and otherwise
  the search service's count, kept for a day: each count is a search request against Algolia's
  free 10,000 a month. No database read.
- **"Up to my 38"** is offered for a total from 24 to 45, the range the field takes.
- **The signed-out Save** links to sign-in with the program and `?save=1`. Sign-in still returns
  to `/student`; 2.4 makes it return and save.
- **Found, not changed:** the page's title reads "… | IB Match | IB Match" on `main` too (the
  title carries the suffix and the root template adds it again), and in forced colours D2.2's
  search field draws its inner input's edge as a second box. Each is its own pull request, as is
  rewording the two out-of-date questions.

### 2.4 — Program and university pages

**Outcome:** The program page and university page in the new layout. See the canvas boards "D4.8
Program page", "D4.8 Program page · phone", "D4.9 University page" and "D4.9 University page ·
phone" (row 13, approved 12 October 2026).

**Design gate:** D3.4, D4.8 and D4.9, approved ([Step 2](#step-2--design-first)).

**Must-haves:**
- **Breadcrumbs** instead of `history.back()` links (audit 1.4). **The trail stops above the page**
  (D4.8, 12 October 2026): Explore / Canada / University of Toronto on a program page, Explore /
  Canada on a university page; the h1 names the page itself. A `nav` named Breadcrumb holding an
  `<ol>`, links 32px tall, wrapping on a phone, names never cut. **The country crumb opens the
  country's guide**, `/study-in-…-with-ib-diploma`: all 23 countries on IB Match have one. A fixed
  list keyed by the country code, which the page already reads, maps them; Explore filtered to a
  country is not used, since it points search engines back to `/programs/search`.
- **Breadcrumb structured data.** A `BreadcrumbList` JSON-LD block on both pages, item for item the
  same names and URLs as the visible breadcrumbs: Explore, the country and, on a program page, the
  university, each with its URL. None exist on the site today. It renders only with the new design,
  because structured data must match what the page shows. Validate it in Google's Rich Results Test
  by pasting the preview's HTML, since the test cannot open the preview.
- **Requirements always listed**, including the minimum points for logged-out visitors. Today the
  points tile needs a match result, so the block can render empty (audit 4.2; Sydney's Bachelor of
  Science and Doctor of Medicine).
- A fit panel (logged in) or "Sign in and add your grades to check these" (logged out). As approved
  on D4.8: see "Decided on the boards" below.
- **The signed-out Save, from 2.2.** Sign-in returns to a same-origin `callbackUrl` (today
  `app/auth/signin/SignIn.tsx` always goes to `/student`); the program page, reached with `?save=1`
  and signed in, saves the program and says so: "Signed in. Computer Science is on your shortlist."
  or "Signed in, but Computer Science wasn't saved." (D2.9).
- The entry-year note, with the caution style when the requirements are from an older intake.
- **The requirement checklist as approved on D3.4** (owner, 10 October 2026). The status icon and the
  "You" column only when the student's grades are known. Signed out, two columns ending with "Sign in
  and add your grades to check these"; signed in with no grades, "Add your grades to check these",
  linking to Academic; no line when there is nothing to check (no minimum and no named subjects). An
  either/or is named by the course the student took, with the others under it; signed out, by the
  courses themselves. More than eight courses go under "All N options" in a `<details>` element, so
  the text is in the server HTML. A US program: "No minimum", with "Holistic admission" and the admit
  rate, the international one too where reported, and the year. The entry-year line is plain when
  current and the caution line when older or unchecked.
- The campus city, and the image credit as a caption (`CONTENT_tasks.md` 8.2 and 8.3, done 7 October
  2026). Show `campusCity ?? university.city` wherever a program's place is shown, and render
  `university.imageCredit` with `components/shared/ImageCredit.tsx` as the `<figcaption>` of every full
  image. A thumbnail needs none.
- **No new read** (Definition of done 7). The program page reads what it reads today: the program
  with its requirements (a select), and signed in, the student's profile (today an `include`, which
  2.4 narrows to a `select`) and the shortlist, for Save. The university page reads its one query
  today, plus columns of rows it already reads: `admitRate`, `internationalAdmitRate` and
  `admitRateYear` on the university, `campusCity` on each program. The program page's select gains
  the same three university columns for the facts and the checklist. Neither page reads the programs
  cache or the search service.

**Decided on the boards (D4.8, D4.9, every recommendation approved 12 October 2026):**

- **The program page.** The header (signed in, or the public one), then a 1192px column: the trail;
  the hero, with the H1 (34/40, the program's name, one h1 as today), "University of Toronto ·
  Toronto, Canada" (the university's name links to its page; the place said once when city and
  country are the same, "Singapore"), four facts in one bordered row (IB minimum, Length, Degree,
  Field; with no minimum, "None" and "Admits 4.6%" under it, as on Explore's rows), Save (D2.1) and
  "Official program page" (primary, a new tab, said to screen readers), and the image at 16:11 with
  its credit as the `<figcaption>`. **No image, no figure:** the hero is one column of 760, with no
  placeholder or initials at that size (15 universities have none). Below, at 784: Entry
  requirements (D3.4) with the entry-year line; **How competitive**, its own section with an h2 when
  the description ends with a paragraph starting "How competitive:" (486 programs), placed under the
  requirements and taken out of About; About the program, Body L 17/28, the whole text in the server
  HTML but **cut at eight lines with "Read the whole description"** (`aria-expanded`) when it runs
  past ten (72 programs pass 1,500 characters; McGill's Mining and Materials Engineering is 6,316);
  and "The university", one link card (thumbnail or initials at 56px, name, place) to its page.
- **The fit panel**, at 360 beside them, staying in view as the page scrolls. Signed in with grades:
  "Your fit" (an h2 styled as a label), the large status badge (D2.7), one sentence from
  `whyThisMatch`'s note ("You meet every requirement.", "Your Chemistry is SL where HL is needed, so
  better grades alone won't meet this.", the US note), field and country as in D3.2, then **"How the
  fit is worked out"**, a button with `aria-expanded` that opens D3.2's fit score with its parts and
  sentence, so the percentage is never the headline, and "Edit your grades" to Academic. Signed out:
  "Do you meet these?", "Sign in and add your subjects and grades. IB Match checks each requirement
  against them, here and on every program.", "Sign in to check" (returning to the page) and "Takes
  about 2 minutes." Signed in with no grades: the same heading, "Add your subjects and grades, and IB
  Match checks each requirement against them." and "Add your grades" to Academic. **Not drawn:**
  "Similar programs you meet" and "Rank in your matches" from the old board, which need the
  student's whole match list.
- **Save** keeps its place in every state. Signed out it is a link styled as the button, named "Save
  Computer Science: sign in first", to sign-in with `callbackUrl` back to the page and `?save=1`;
  the page saves, Save reads "Saved", D2.9's toast says "Signed in. Computer Science is on your
  shortlist.", and the address drops `?save=1` so a reload doesn't save twice. A failed save: Save
  back to "Save" and "Couldn't save Computer Science." with Try again (D2.9).
- **Loading:** D2.8's program skeleton in this layout, the header real. **Not found:** a page of its
  own in place of Next's bare "404 | This page could not be found." (what a removed program shows
  today): "We can't find that program", "It may have been removed when its university stopped
  offering it, or the link may be incomplete. Search for it by name or university, or explore every
  program.", a search form to Explore with a Search button, and "Explore programs". It still answers
  404. The university page has the same, "We can't find that university".
- **The program page on a phone:** the trail, the image (16:10, radius 16) with its credit, the H1
  (30/36), then the fit panel (or "Do you meet these?"), the facts in a 2 × 2 grid, Save (118px) and
  "Official program page" filling the row, then the requirements (D3.4's phone list), How
  competitive, About and the university. **No bar fixed to the bottom:** signed in, the tab bar is
  there already, with no tab current on these pages.
- **The university page.** **Signed in, the signed-in header**: `/universities` reads the session as
  `/programs` does (`hasOwnChrome` and a layout like `app/programs/layout.tsx`); the page is already
  built per request, and it is the same cookie check, with no database read. The hero: H1, the place,
  "also known as U of T" **only when the short name adds something** (not when it is part of the
  name); facts (Type, Students, On IB Match "40 programs", and for a US university "Admit rate 4.6%"
  with "First-year applicants, fall 2025", the international rate too where reported); "Official
  website" and "See its programs" (to the list); the image and its credit as on the program page.
  Below at 784: About the university (the same eight-line rule) and **every program, grouped by
  field** under "Programs on IB Match" ("40 programs in 9 fields"), field links at the top (a nav
  named Fields, when there is more than one field), an h3 per field with its count, then rows A–Z:
  the name (the only link), degree, length and the minimum ("None" for a US program, the rate stays
  in the facts). **A program taught away from the university's city** says "Taught in Reims" under
  its name. Headings use the full name, never the short one. Beside them at 360: Contact (website,
  email and phone, each a link) and the country's guide as one link card ("How universities there
  read the IB: admission, grades, documents and the timeline."). **No fit on this page:** beside the
  count, "See which ones you qualify for" opens Explore with the university's name typed, which
  returns exactly its programs (Toronto 40 of 40, Manchester 68 of 68); signed out, "Sign in to see
  which ones you qualify for"; no grades, "Add your grades to see which ones you qualify for". On a
  phone: field links wrap above the list, a row is two lines (the name, then degree and length, the
  minimum on the right, the campus in the second line), and Contact and the guide follow the
  programs.

**Found while drawing, not part of 2.4** (content fixes): Imperial's `abbreviatedName` is "London"
(today's university page says "Programs at London") and Linnaeus's is "Växjö, Kalmar"; NTU's phone is
stored as "65) 67911744".

**Done 12 October 2026.**

- **The pages.** `app/programs/[id]/NewProgramPage.tsx` and `app/universities/[id]/NewUniversityPage.tsx`,
  server components: everything is server HTML but three small parts, which load as their own chunks
  through `components/detail/islands.tsx` (Save with the return from sign-in and "How the fit is
  worked out" in `components/program/ProgramIslands.tsx`; "Read the whole description" in
  `components/detail/ReadMore.tsx`). One element order serves both sizes: from 1024px a grid of
  572 + 164 + 360 puts the image beside the title and the fit panel, sticky, beside the
  requirements. The parts both pages share are in `components/detail/` (trail, facts, hero image,
  not-found panel), the checklist and fit panel in `components/program/`, the list by field in
  `components/university/`.
- **The checklist (D3.4):** a table from 768px and the phone list below, with "All N options" in a
  `<details>` element. With grades, the rows are "Why this match"'s (`statusAndWhy`, extracted from
  `matchItem` in `lib/matching/match-list.ts`); without, `requirementRows` in
  `lib/matching/match-why.ts` names each requirement by its courses. The status icons moved to
  `components/match/requirement-status.ts`, shared with "Why this match".
- **Trail and structured data:** `components/detail/trail.ts` builds the trail and the
  `BreadcrumbList` from one list; the country crumb opens its guide (`lib/programs/country-guides.ts`,
  all 23, tested against the `study-in-*` pages). Both pages' existing structured data is the same
  copy in both designs; the `BreadcrumbList` comes with the new design only.
- **Sign-in returns** to a same-site `callbackUrl` (`returnPath` in `lib/auth/callback-url.ts`) in
  the new design; today's sign-in still goes to `/student`. Back on a program with `?save=1`, the page
  saves it (or says it is saved already), D2.9's toast says so, and the address drops `?save=1`
  without reloading.
- **`/universities` reads the session** in the new design (`app/universities/layout.tsx`, the chrome
  in `components/site/SessionChrome.tsx`, shared with `/programs`); `hasOwnChrome` lists it.
- **Descriptions** are cut at eight lines past ten by an estimate made on the server (74 characters
  a line from 768px, 38 on a phone; `lib/programs/description.ts`), so the page never changes height
  as it loads. A closing "How competitive:" paragraph becomes its own section, starting with a
  capital (386 of the 486 continue in lower case after the colon).
- **Reads.** The program page reads the program as today, with three more university columns.
  Signed in, one narrow read of the profile (subjects, choices and whether this program is on the
  shortlist, `lib/programs/viewer.ts`) replaces today's two: the whole profile with every course and
  choice included, and the browser's request for the whole shortlist, with its rate-limit call to
  Upstash. Today's page narrows its include to a select too. The university page makes its one query
  with four more columns. Neither reads the programs cache or the search service.
- **Checked.** Without the preview, a program (signed out and in), a university, both not-found
  pages, sign-in, Explore, Home, a guide and the requirements hub send the same HTML as `main`, and
  `npm run build` lists every route as `main` does, `/auth/signin` still static. Today's visitors
  download 0.2 KB more JavaScript on program and university pages, gzipped (the lazy wrapper), and
  none elsewhere; CSS is 30.1 KB (+0.9, under 32). The new pages' own code is 3.6 KB gzipped signed
  in and 0.7 KB for "Read the whole description". The SEO snapshot differs only by the 1.3 logo
  URLs, the new `BreadcrumbList` and the headings of the new layout; titles, descriptions, canonical
  URLs and each page's own structured data are unchanged. Both not-found pages answer 404. Design QA
  screenshots of every board state, desktop and phone, light and dark, forced colours, 900px and the
  200% zoom width, are in the pull request.

Departures and hand-offs:

- **No loading state.** A `loading.tsx` for these routes would make Next prefetch every link to a
  program or university (dynamic routes are prefetched only with one): a server render for each of
  Explore's 20 rows, Matches' cards and today's cards, for every visitor. It would also stream the
  page, so a missing program would answer 200 with `noindex` instead of 404. Moving between pages
  keeps the previous page until the next arrives, as today; D2.8's program skeleton stays unused.
- **The university page doesn't know whether a student has grades**, so signed in it always says
  "See which ones you qualify for": telling them apart needs a profile read the page doesn't make.
  Without grades, Explore shows its own "Add your grades" link in the switch's place.
- **Save from a brand-new account: decided 12 October 2026 (owner)**, widened on 13 October 2026 to
  every Save by a student without grades, with what they are told at each step (3.1). Profiles are
  made by the first run, so a visitor who presses Save and signs up comes back with no profile, and for now the
  save fails with "Signed in, but Computer Science wasn't saved." New accounts will go through the
  first run first, then back to the program, which saves it: a must-have of 3.1 (session 11).
- **Today's design keeps Next's bare 404 for a missing program.** A not-found page in the segment
  renders inside the programs layout, which in today's design would add today's header around it;
  `app/programs/[id]/layout.tsx` sends today's 404 to the root's instead, using the request's one
  read of the program.
- **Two columns from 1024px**; from 768 to 1023 the page is the phone's order at desktop type sizes
  (the boards draw 1440 and 390). Save and the official page sit side by side from 768.
- **Copy the boards didn't draw:** a US university that reports an international admit rate adds
  "89.9% of international applicants" under its rate; no admit rate under "None" reads "Holistic
  admission".
- **Every university has an image now** (97 of 97), so the one-column hero shows only if one is
  removed; it was checked with an image hidden locally.
- **The hero image** asks the image optimizer for a 1,200px width on desktop, where today's pages ask
  for 384 and 640: one fetch from Supabase Storage per image and width, kept for 31 days.

### 2.5 — Shortlist with compare

**Outcome:** "Saved" becomes "Shortlist", with list and compare views built from existing data: fit,
minimum points against the student's, named subjects, country, degree and length, the year checked,
and the official link. See the canvas boards "D3.7 Compare table", "D3.7 Compare table · phone",
"D4.10 Shortlist" and "D4.10 Shortlist · phone" (row 14, approved 13 October 2026). The saved page
shows fit, which it does not today (audit F4 in `03-flows.md`).

**Design gate:** D3.7 and D4.10, approved ([Step 2](#step-2--design-first)).

**From 2.2:** the count beside Shortlist in the desktop nav (drawn on D4.6 and D2.12), from a source
every signed-in page has.

**Must-haves:**
- **One read more than today, and no other** (Definition of done 7). Today the page reads the
  student's profile (the whole row) and the saved programs with their requirements (a select). The
  fit needs the student's subjects and grades: read them with the profile, which becomes a `select`.
  The table's other facts are columns of rows the page already reads: `programUrl` and
  `requirementsEntryYear` on the program, `admitRate`, `internationalAdmitRate` and `admitRateYear` on
  the university. The fit is worked out on the server with `calculateMatch` and `deriveMatchStatus`,
  as Explore does (`fitProgram`), from the requirement rows the query returns. No programs cache, no
  search requests. List and Compare come from one response, so switching views reads nothing.
- Signed out, the page sends the student to sign-in and back (`callbackUrl`), as today. Behind sign-in
  and noindex, as today.
- **Explore's no-minimum hint** (owner, 13 October 2026; D3.5 and D2.15): under "Include programs
  with no IB minimum", "Mostly US universities, which admit on the whole application" in place of
  "All 12 US universities admit without one" (`components/explore/FilterParts.tsx`). Twelve US and two
  German universities set no minimum now, and the new words carry no count to go stale.

**Decided on the boards (D3.7, D4.10, every recommendation approved 13 October 2026; on a phone, two
side by side):**

- **The page.** H1 "Your shortlist" (34/40) and a summary that counts each status: "8 programs. 4 meet
  all requirements, 3 are within reach and 1 is missing a requirement." Under it, **List and Compare
  as two links** drawn like D2.4's segmented control (220 × 44; full width on a phone), each with its
  own address (`?view=compare`) and `aria-current`, so Back and a reload keep the view. The closing
  line under both: "Requirements are checked for one intake at a time, and each program says which.
  Confirm them on the university's own page before you apply." From 768 to 1023px the rows stack as
  on Explore and the table's label column narrows to 140px.
- **List.** Explore's result row (D3.3) with every bookmark filled, the fit column included, desktop
  and phone; each name an h2. **Newest first, no sort control** (41 students have a shortlist: half
  hold three or fewer, the largest 52).
- **Removing.** Save on a row (or a column head) empties the bookmark and keeps focus; **the row stays
  until the student leaves the page**, the summary and the nav count drop at once, and D2.9's toast
  says "Removed from your shortlist." with Undo. Save on the same row undoes it after the toast has
  gone. A failed removal puts the bookmark back with "Couldn't remove Economics and Management." and
  Try again.
- **Compare, desktop (D3.7).** A table (caption, column headers, row headers) of 1192px: a 184px label
  column and **up to four programs**, equal columns with 1px rules. Column heads: the 56px photo or
  initials, Save, the name (17/24, the column's only link), the university. Eight rows: **Your fit**
  (the Matches badge); **IB minimum** with "You have 38" under the label, the figure (20/28) with "Met"
  or "1 point short" in its colour, or "None" with "Admits 4.6%" (read "of first-year applicants") or
  "Holistic admission" when the university reports no rate; **Subjects** ("The grade each needs") in
  the D3.1 chip words, met in ink with a green tick, close and missing in their colour, "No named
  subjects" where there are none; **Country** with the city, and "Not one of your countries" when it
  isn't; **Degree**; **Length**; **Checked for** ("2027 entry", or "2026 entry" with "An earlier
  intake. Confirm the 2027 figures before you apply." in the close colour); and a visually hidden
  "Official page" row with "Official program page" (a new tab, said to screen readers).
- **Choosing programs, desktop.** The first four in the list are compared until the student chooses.
  "Comparing 4 of 8" and "Choose programs" (shown from three programs) open a popover holding a
  labelled dialog, as D3.5: the whole shortlist as checkbox rows, each choice applying at once, four at
  most (the rest `aria-disabled`, "4 of 4 chosen. Untick one to choose another.") and two at least,
  and Done. The choice is kept in the address.
- **Compare, phone: two programs side by side, at most** (owner, 13 October 2026, in place of the
  recommended 2 × 2 of four). Two native selects (D2.3), "Program 1" and "Program 2", each listing the
  whole shortlist; Compare opens with the first two in the list, or the first two of a choice made on
  a wider screen; picking the program the other select shows swaps them; the choice is kept in the
  address. Under each select, the program's head in full (48px photo, Save, name, university), since a
  select cuts a long name short. Each row is its label, then the two values side by side. No "Choose
  programs" and no sheet on a phone.
- **States.** One program: no view links, and "Save one more program and you can compare them side by
  side here." with links to Matches and Explore. Empty: D2.11's "Your shortlist is empty". No grades
  yet: D2.11's profile call to action (no student has saved programs without grades today; one who had
  would see the list under the panel, without the fit column). Loading: D2.8 skeleton rows under the
  real title and links, one hidden "Loading your shortlist". A failed load: D2.11's panel, "Your
  shortlist didn't load".

**Done 13 October 2026.**

- **The page.** `app/student/saved/ShortlistClient.tsx`, loaded through `NewShortlist.tsx` as its own
  chunk, so today's visitors download none of it. It asks `GET /api/students/shortlist` once; List
  and Compare are links whose addresses change with `history.pushState`, so switching views, Back
  and choosing programs read nothing (the choice replaces the history entry). The compare table is in
  `components/shortlist/` (`CompareTable` from 768px, `ComparePair` below it, the "Choose programs"
  popover and the view links); the list is Explore's `ResultRow`, which now takes `heading="h2"`. The
  rules for the address, the columns, the phone pair and the words are pure and tested
  (`lib/shortlist/view.ts`). The profile call to action moved out of Matches into
  `components/match/CompleteProfile.tsx`, so both pages show the same D2.11 panel.
- **Reads.** The route reads what today's `GET /api/students/saved-programs` reads, the profile and
  the saved programs, with one thing more: the profile becomes a select with the student's subjects
  and grades, fields and countries ("Not one of your countries" and the first-run steps). The saved
  programs are the same select with `programUrl`, `requirementsEntryYear` and the university's
  `admitRate` added, and the field's icon and description dropped. The fit is Explore's
  (`academicFit`, extracted from `programFit` in `lib/explore/fit.ts`), the subjects in the D3.1 chip
  words (`subjectChips` in `lib/matching/match-status.ts`), worked out on the server from the rows
  the query returns (`lib/shortlist/items.ts`). No programs cache, no search.
- **The nav count** (from 2.2) is kept in the browser for the signed-in student
  (`lib/shortlist/count.ts`, `components/site/shortlist-count.tsx`), as the theme is, with no read of
  its own: Matches, Explore and the Shortlist record it from the shortlist they load anyway, and every
  save or removal the server confirms moves it. Every signed-in page shows it; another account in the
  same browser never sees it. A save made on another device shows once one of those three pages
  loads, and until a count is known the link shows none. The server can't see browser storage, so the
  count appears as the page wakes: a layout shift of 0.00014 on a full load of a signed-in page with
  a count (none on navigation between pages, none on public pages).
- **The hint** under "Include programs with no IB minimum" reads "Mostly US universities, which admit
  on the whole application" (`components/explore/FilterParts.tsx`).
- **Checked.** Without the preview, eleven pages (the Shortlist, Matches and Academic signed in,
  Home, How it works, a guide, the requirements hub, a program signed in and out, a university,
  Explore) send the same HTML as `main`, and `npm run build` lists every route as `main` does, plus
  the new API route. Today's visitors download 0.1 KB more JavaScript on the Shortlist, gzipped (the
  lazy wrapper), and none elsewhere; CSS is 31.1 KB (+0.4, under 32). The new page's own code is
  14.1 KB gzipped. In the browser: every control used, the list loaded once in a production build,
  42 checks passed (views, Back, a reload, choosing, the phone selects, removing, Undo, a failed
  removal, the count). Design QA screenshots of every board state, desktop and phone, light and dark,
  forced colours, 768, 900 and the 200% zoom width, are in the pull request.

Departures, each small:

- **Copy the boards didn't draw:** "Nothing is on your shortlist now." when every program on the page
  has been removed; "Not checked yet" with "Confirm the requirements before you apply." for a program
  whose requirements haven't been checked for any intake (7 of 1,677 programs). The tab title is
  "Your shortlist" in the new design, as the page and the nav name it; today's stays "Saved Programs".
- **"Saved to your shortlist." has no "View shortlist" on the Shortlist itself** (after Undo or a
  re-save): the student is already there.
- **The phone selects use the browser's own list** (`native` on D2.3's `Select`): Chrome's styled
  select wraps a long name over several lines instead of cutting it short, as the board draws.
- **No summary before grades.** The board's "Profile incomplete" frame has none, and no student has
  saved programs without grades today; the list under the panel shows no fit column.

---

## Phase 3 — Profile and onboarding

### 3.1 — First-run interest and country steps

**Outcome:** Steps 1 and 2 of onboarding as compact lists, and Save without grades through first run
and back. See the canvas boards in row 15 (approved 13 October 2026): "D2.6 Checkbox rows and grid",
"D2.1 Save · without grades", "D4.3 First run, step 1", "D4.3 First run, step 1 · phone", "D4.4 First
run, step 2" and "D4.4 First run, step 2 · phone". They replace "Phone · First run, step 1" and
"step 2".

**Design gate:** D2.6, D4.3 and D4.4, and the change board "D2.1 Save · without grades", approved
([Step 2](#step-2--design-first)).

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
- **Save without grades goes through first run, then saves (owner, 12 October 2026; widened on 13
  October 2026 to every Save).** Saving needs subjects and grades: a shortlist is worth its fit and
  Compare, and both need them. In the preview today, a signed-in student without a profile who
  presses Save on Explore or a program page gets "Couldn't save Computer Science." with a "Try
  again" that fails the same way; one who signed up from Save gets "Signed in, but Computer Science wasn't saved." In
  production (13 October 2026) 40 of 191 student accounts have no profile, and 41 of the 152 with
  grades have saved a program. Instead:
  - **Gate on grades, not on a profile existing:** subjects and a total, as `hasSubjects`
    (`lib/matching/match-list.ts`) judges. Once this task saves drafts, a profile exists after step 1,
    and that isn't enough to save.
  - **Where Save is pressed without grades:** a program page, and Explore's rows. Matches and the
    Shortlist show the profile call to action instead. Both pages read the profile already
    (`programViewer`, `exploreViewer`), so each knows before drawing Save: no new read. Save is then a
    link to `/student/onboarding?return=` the page it was pressed on, with the program: the program
    with `?save=1`; Explore with its search, the rows shown and the program to save. Nothing is
    written until first run saves.
  - **Signed out,** Save goes to sign-in and back to the program with `?save=1`, as today (2.3, 2.4).
    Without grades, the program page then redirects to first run as above, rather than trying the
    save.
  - **First run** keeps `return` through its steps and drafts, checked with `returnPath`
    (`lib/auth/callback-url.ts`), and **opens at the first step not yet saved**, so a student who
    left after step 2 starts at step 3. When the last step saves the grades, it goes to `return`
    instead of Matches; without one it ends at Matches, as today. "Save and exit" still goes to Home
    (D2.12) and keeps nothing waiting: the next Save starts the flow again, at the first step not yet
    saved.
  - **Back where Save was pressed,** the page saves the program as for any signed-in student, and
    Explore shows the same search at the same row. The first grades mean an empty shortlist, so first
    run records a count of 0 for the nav (2.5) as it saves them, and the save makes it 1.
  - **A save refused for want of a profile** (`PROFILE_NOT_FOUND`, from a page loaded before the
    profile went) goes to first run as above, never to a failure toast whose "Try again" can't work.
  - Until 3.2 rebuilds step 3, the last step is today's (`FieldSelectorClient.tsx`), without the
    line about the waiting program. Today's design never sets `return`, so it is unchanged.
- **Tell the student where each step leads (owner, 13 October 2026: few students save, and some get
  lost on the way).** At every point of the flow above the student can see what will happen next
  and what has been kept. D4.3 drew the words and their places, approved 13 October 2026 (see
  "Decided on the boards" below); these drafts were its starting points:
  - **Before pressing:** Save without grades says where it leads, in its accessible name and in
    words where the board shows them: "Save Computer Science: add your grades first".
  - **On every step:** one line names the waiting program and the promise: "Computer Science,
    University of Toronto, is waiting. We'll add it to your shortlist when you finish." With the
    step count, "Step 1 of 3".
  - **Resuming:** opening at a later step says what is kept: "Your interests and countries are
    saved."
  - **"Save and exit" with a program waiting** says, before the student leaves, what is kept and
    what isn't: "Your choices are saved. Computer Science isn't on your shortlist yet."
  - **Back on the page:** one message names the program and where it went, "Profile saved. Computer
    Science is on your shortlist.", with "View shortlist" (D2.9). The bookmark shows Saved, and the
    nav count appears.
  - **If that save fails:** "Your profile is saved, but Computer Science wasn't." with "Try again",
    which tries the save, not first run.

**Decided on the boards (D2.6, D4.3, D4.4 and "D2.1 Save · without grades", every recommendation
approved 13 October 2026):**

- **Checkbox rows and tiles (D2.6).** The whole row is the label, with Explore's box
  (`components/explore/checkbox.ts`) at its right end. A field row: a 36px icon tile, the name (15/22
  semibold, which labels the box) and the examples (13/18 in ink-2, which describe it), at least 56px,
  wrapping and never cut. A country tile: at least 48px, the name wrapping. Chosen shows the tick, a
  1px brand edge and the brand-soft fill, with the icon in brand on a white tile; the name keeps its
  weight, so nothing reflows. Hover darkens the edge to line-3, pressed is the sunken fill, focus is
  the 2px ring round the whole row (`label:has(:focus-visible)`). Colours change in 120ms; nothing
  moves.
- **Five fields at most, as today; one at least.** At five, the other boxes turn grey and
  `aria-disabled` (still in Tab order), their text at full contrast, and pressing one ticks nothing:
  the footer says "You can choose up to 5. Untick one to choose Law.", politely. With none, Continue
  is `aria-disabled` and the footer says "Choose at least one field".
- **Icons.** Education is Lucide `Presentation`, Media `Newspaper`. Graduation cap stays the Academic
  tab's; School would read as a second building beside Architecture's.
- **The page.** Focus mode as D2.12; on a phone the header stays at the top. The h1, small, is "Set up
  your profile" ("Update your profile" after first run), beside "Step 1 of 3" and a three-part
  progress bar; each step's question is its h2 (34/40 on desktop, 30/36 on a phone) and takes focus
  when the step opens. The page title follows the step: "Set up your profile · Step 1 of 3 · IB
  Match". Step 2 has "Back to interests". Desktop is one 880px column with the field rows two to a
  line and the country tiles four; phones one and two.
- **The footer,** fixed to the bottom: the count ("2 of 5 chosen", "3 chosen", "Every country") or a
  message, and Continue; 88px with a 48px button on a phone, a full-width 76px bar on desktop with a
  44px one. Continue saves the step as a draft ("Saving…", no spinner), then opens the next. If that
  save fails, the student stays with every choice kept, and D2.9's toast says "Couldn't save your
  interests." (or "your countries") with Try again. After first run the footer sits on the tab bar
  and moves with it.
- **Step 2.** "Open to anywhere" is a checkbox row (Lucide `Earth`, "Programs in all 23 countries")
  above the filter. Ticked, the filter and the grid hide, the footer says "Every country", and the step
  saves no countries with `openToAllLocations` set, a column the profile already has and Matches
  already reads; unticked, the countries chosen before come back. Never both saved. Continue needs a
  country or "Open to anywhere" ("Choose a country, or Open to anywhere"). The filter, D2.2's field at
  16px, matches any part of a name without accents, as `picker-filter.ts` does, plus short names: UK,
  Britain and England find the United Kingdom, US and USA the United States, Holland the Netherlands,
  Czechia the Czech Republic. It hides tiles, never choices, and the count still counts them. Nothing
  found: "No country matches “brazil”", "IB Match has programs in 23 countries. Brazil isn't one of
  them yet." and Clear filter. Tiles stay in alphabetical order.
- **Save without grades ("D2.1 Save · without grades").** A link drawn exactly as Save, never a
  toggle, named "Save Computer Science: add your grades first". On the program page, "Add your grades
  first. We'll save it when you finish." sits under the buttons, and the "Do you meet these?" panel's
  "Add your grades" comes back to the program too, without `?save=1`. On an Explore row the icon
  link's name is "Save Computer Science, University of Toronto: add your grades first", and the link in
  the switch's place reads "Add your grades to check your fit and save programs".
- **The way through, word for word (D4.3).** On every step, under the step count, with the bookmark:
  "Computer Science, University of Toronto, is waiting. We'll add it to your shortlist when you
  finish." Opening at a later step, a tick line above it: "Your interests are saved." (step 3: "Your
  interests and countries are saved.", D4.5). "Save and exit" with a program waiting saves the step,
  then opens a small dialog (a popover under the button on desktop; on a phone a panel dropping from
  the header over a scrim): "Your choices are saved." and "Computer Science isn't on your shortlist
  yet. Finish your profile and we'll add it.", with Keep going (focused first; Escape does the same)
  and Exit to Home. With nothing waiting it leaves at once (D2.12). Back where Save was pressed: "Profile
  saved. Computer Science is on your shortlist." with View shortlist; Save reads Saved and the
  Shortlist count shows 1. Explore opens at the same search and row, now with the fit, and focus lands
  on that row's Save; on a phone the program page opens at the top. If the save fails: "Your profile
  is saved, but Computer Science wasn't." with Try again, which repeats the save only.
- **Reads and writes.** No new reads. One save of the student's own profile per step instead of one at
  the end.

**Built 13 October 2026 (session 11).** First run in the new design is
`app/student/onboarding/FirstRun.tsx` (lazy, through `NewOnboarding.tsx`), with the rows and tiles
in `components/ds/Choice.tsx` and the rules in `lib/student/` (`first-run.ts`, `country-filter.ts`,
`draft.ts`). Steps 1 and 2 save through `PUT /api/students/profile/preferences`: one upsert of the
student's own profile, creating it on step 1, with no read before it; cached matches are
invalidated only for a student who has grades. The page's one profile read is now a `select`.
Save without grades: `SaveSignInLink` takes `needs="grades"`, the program page redirects a `?save=1`
return without grades to first run on the server, and Explore saves on arrival from `?save=`.

Departures and hand-offs:

- **Focus mode follows the page, not the layout.** Next keeps a layout mounted through client
  navigation, so a layout choosing focus mode would keep it after first run ends, and never switch
  to it from Matches' "Add subjects and grades". Instead the signed-in frame (`AppFrame`) draws both
  headers, and first run puts a mark on its page (`data-first-run`); `app/globals.css` shows focus
  mode's header and hides the usual one, the footer and the tab bar while the mark is there, with
  `:has()`, as the toast already does. No read in the layout.
- **The two new field icons live in `components/first-run/field-icons.ts`**, not `lib/icons.tsx`'s
  maps, until cleanup (R.2) merges them: `lib/icons.tsx` feeds today's `FieldSelector`, `ProgramCard`,
  `SearchClient` and the prebuilt requirements hub, whose icons and download stay as they are
  (Definition of done 8 and 11).
- **The waiting program's names ride in first run's address** (`program`, `university`), so first run
  reads nothing to say what is waiting. A link made up with other names would show them, but saves
  only the program in its return address, which `returnPath` keeps on this site.
- **Step 3 is today's** (`DetailedGradesInput`), under the new step count and a plain h2, "Your
  subjects and grades", so the headings stay in order. "Save and exit" there keeps the interests and
  countries but not subjects in progress, since the profile route takes all six at once; 3.2's editor
  saves them as they go.
- **First run's `loading.tsx` shows today's spinner only in today's design**; the new design has no
  spinners, and its steps come in the server's HTML.
- **"Edit your grades" on the fit panel still goes to Academic**, as approved; only "Add your
  grades" (the "Do you meet these?" panel and the checklist's prompt) comes back to the program.
- **Old design unchanged.** Today's first run, program page and Explore render as before without the
  preview link; the new API route is the only route added.

### 3.2 — Subject editor

**Outcome:** One `ProfileEditor` for first run and editing, with one row per IB group (subject, SL or HL,
grade 1–7), then TOK and EE. It replaces `SubjectSelectorDialog`, `DetailedGradesInput`,
`QuickScoreInput` and `StepIndicator`. See the canvas boards in row 16 (approved 14 October 2026):
"D3.6 Subject editor", "D4.5 First run, step 3" and "D4.5 First run, step 3 · phone". They replace
"Phone · First run, step 3" and the subject rows on "Academic profile".

**Design gate:** D3.6 and D4.5, approved ([Step 2](#step-2--design-first)).

**Must-haves:**
- Radio semantics for level and grade (audit 6.4). Editing in place: no remove-and-re-add.
- A live total labelled "So far" until six subjects and both core grades are in (audit 5.5).
- Diploma checks through the shared helpers from `MAINT_tasks.md` 5.8 (core points, E blocks saving)
  and 5.13 (3 or 4 HL subjects). Messages match the disabled save button (audit 5.6).
- Lucide icons for TOK and the EE; no emoji (audit 2.7).
- **Keep first run's return address** (3.1, owner, 12 October 2026): the last step goes to `return`
  when there is one, else Matches. Step 3 shows the waiting program's line and the step count, as
  steps 1 and 2 do (3.1, owner, 13 October 2026; D4.5).

**Decided on the boards (D3.6 and D4.5, every recommendation approved 14 October 2026):**

- **Rows.** Six, one per IB group, named "Group 1 · Language and literature", "Group 2 · Language
  acquisition", "Group 3 · Individuals and societies", "Group 4 · Sciences", "Group 5 · Mathematics"
  and "Group 6 · The arts, or another subject". **Any subject in any row:** the picker (D2.3) lists
  the row's group first, then every other. Of the 152 students with six subjects on 14 October 2026,
  130 fill Group 6 with something other than an art and 24 take two Language A courses instead of a
  Group 2 language, so nothing checks which group a subject comes from, as today. A saved profile
  puts each subject in its own group's row, a second subject from one group in row 6, else in the
  first empty row.
- **One row.** The field, labelled by its group, then Level (SL, HL) and Predicted grade (1–7) as
  radio groups named with the subject ("Level, Physics"). Desktop: one line in the 880px column, the
  field 376px, the level 104px and seven grades of 44px, under a header that names the columns once
  (aria-hidden). Phone: stacked, the field at 16px, the level track, then seven grades of 46px. Level
  and grade are disabled until the row has a subject (D2.4) and have no default; a row counts once
  all three are chosen. Typing over a subject and picking another keeps its level and grade; a subject
  in another row is greyed, "In your subjects". A chosen 1 turns red like an E (`aria-invalid`). On a
  phone "Mathematics: Applications and Interpretation" ends in an ellipsis in the closed field, the
  only one of the 55; the list shows it whole.
- **The core.** "The core": Theory of Knowledge (Lucide `Lightbulb`) and Extended Essay (Lucide
  `NotebookPen`), A to E; side by side in a second panel on desktop, stacked on a phone. The line
  under them reads "Together they add up to 3 points to your total.", then "2 core points from TOK B
  and EE C" (`getCorePoints`). An E: D2.4's message under it, and no core points line.
- **Under the subjects.** The Higher Level line from the first level chosen: "2 at Higher Level so
  far. The diploma needs 3 or 4."; with six, "3 at Higher Level, 3 at Standard Level" with a tick, or
  the helper's "Take 3 or 4 subjects at Higher Level (you have 2)." Once everything is in, the IB's
  other failing conditions under "With these grades, the IB wouldn't award the diploma:", one line
  each. **They still stop Finish, as today.** Their words change in `lib/ib/diploma.ts`, so the
  coordinator's form and both APIs say the same: "No subject can have a 1 (you have a 1 in
  Physics)." · "Have no more than two grades of 2 (you have 3)." · "Have no more than three grades of
  3 or below (you have 4)." · "Your Higher Level grades need 12 points or more (you have 11)." · "Your
  Standard Level grades need 9 points or more (you have 8)." · "Your total needs to be 24 or more (you
  have 22)." These lines describe the subjects' fieldset.
- **The footer,** fixed as on steps 1 and 2 (88px on a phone, a 76px bar on desktop): a line, then
  Finish. "4 of 6 subjects" over "So far 24 points"; when one thing is left, its name: "Add your Group
  6 subject", "Add a grade for Chemistry" (or a level, or a level and grade), "Add your TOK and EE
  grades" (or "Add your Extended Essay grade"); when complete, "Total 38 points" over "36 from
  subjects, 2 core points". A failed check takes the line's place, with Lucide `Info`: the Higher Level
  message, "To finish, choose a TOK grade from A to D." (or "an Extended Essay grade", or "TOK and
  Extended Essay grades"), or "With these grades, the IB wouldn't award the diploma." Finish is
  `aria-disabled` and described by the line; pressing it says the line again and moves focus to the
  first thing missing. A row that is only empty never turns red. The total is shown nowhere else
  (audit 5.2).
- **The step (D4.5).** The h2 "What are your subjects and grades?", with "Your six subjects, each with
  its level and your predicted grade. Final grades work too. When you finish, we'll show your
  matches." (with a program waiting, without the last sentence: the waiting line says where it
  leads). The button is Finish. Opening at step 3: "Your interests and countries are saved." Finish
  saves the profile once with its total, as today, then goes to `return` or Matches; if that fails
  the student stays with everything kept, and D2.9's toast says "Couldn't save your subjects and
  grades." with Try again. **Save and exit** keeps each complete row and the core as a draft without
  a total, one write of the student's own profile, so the student still has no grades and Save leads
  back here; a row missing its level or grade isn't kept; then D4.3's panel. This replaces 3.1's
  "saves them as they go": nothing is written while choosing. On a phone, opening the list brings its
  field up under the header.
- **After first run.** The signed-in header, "Update your profile", "Change a subject, level or grade
  where it is. Your matches update when you save." and Save changes, `aria-disabled` with "No changes
  to save yet" until something changes, then "Total 39 points" over "Was 38 before your changes"; an
  E: "To save, choose a TOK grade from A to D." **Decided 18 October 2026 (D4.11):** Academic opens
  the editor on its own, and Save changes goes back to Academic (3.3).
- **Reads and writes.** No new reads: the profile and the cached subjects (`getCachedIBCourses`) that
  first run reads today. Finish writes the profile once, as today; Save and exit once, as a draft.

**Built 14 October 2026 (session 12).** The editor is `components/profile-editor/ProfileEditor.tsx`
(the six rows, the checks under them and the core), its rules `lib/student/subject-editor.ts` (where
saved subjects go, the list per row, the Higher Level line, the core line, the footer's 14 states
and what Save and exit keeps), and step 3 and its footer are in `app/student/onboarding/FirstRun.tsx`,
in first run's lazy chunk. The IB's other failing conditions are `otherFailingConditions` in
`lib/ib/diploma.ts`, in the approved words; `validateDiploma` returns them after the E and Higher
Level messages, as before. Save and exit at step 3 is a third kind of draft on
`PUT /api/students/profile/preferences` (`step: 'subjects'`): one update of the student's own
profile, written only where it has no total (`totalIBPoints: null` in the update's `where`), so a
draft can never undo a finished profile; otherwise 409. Finish and Save changes post to
`POST /api/students/profile`, unchanged. The primitives gained what the rows need: `Segmented` a
hidden legend, an id, options that share the row (`stretch`), a red choice without a message of
its own (`invalid`) and an outside description (`describedBy`); `SubjectPicker` an id and the
ellipsis; `Button` `onRefused`, for a press while it is aria-disabled.

Departures and hand-offs:

- **No `aria-invalid` on a chosen 1 or E.** ARIA doesn't allow it on a radio (build 2 found the
  same). The choice turns red, and the words say why: D2.4's message under the E, and the
  conditions under the subjects for a 1.
- **Waiting levels and grades are D2.4's disabled state,** sunken with a line edge, as D3.6's note
  says ("D2.4's disabled state"); D3.6's drawing shows them as outlines.
- **An E stops Finish as soon as it is chosen,** with the footer's "To finish, choose a TOK grade
  from A to D.", not only once everything is in; the boards draw the E with everything in. A missing
  TOK grade alone reads "Add your TOK grade", beside the board's "Add your Extended Essay grade".
- **Pressing Finish early** moves focus to the first thing missing: a row's field, its level or its
  grade, or TOK or the EE; for the Higher Level count or the IB's other conditions, to the lines
  under the subjects; for an E, to that grade.
- **Today's step shows the new words too.** The conditions live in the shared helper, as decided, so
  today's `DetailedGradesInput` lists them in the new words: 69 bytes more JavaScript (gzip) on
  today's onboarding page. Nothing else in today's design changes, and `npm run build` lists the
  same pages as Static.
- **Today's `SubjectSelectorDialog`, `DetailedGradesInput`, `QuickScoreInput` and `StepIndicator`
  stay** for today's design until cleanup (R.2); the new design no longer uses them. First run's lazy
  chunk grows from 8.3 to 15.6 KB (gzip) in the new design only, since today's step sits in the
  page's own chunk until then.
- **Opening at step 3 with a saved draft** places each subject as decided; the tick line is 3.1's.
  QA reached step 3 through steps 1 and 2, since a draft lives in the database.
- **Found, not changed: the Standard and Higher Level floors for four Higher Level subjects.** The
  helper asks for 9 points at Standard Level and 12 at Higher Level whatever the count. The IB's
  rule is 5 at Standard Level for a student with two Standard Level subjects, and the best three
  grades for one with four at Higher Level. So a student with four at Higher Level and Standard Level
  grades of 4 and 4 can't finish, and HL 4, 4, 3, 2 passes where the IB would fail it. 15 of 152
  students take four at Higher Level. A rule change, so a separate task: `MAINT_tasks.md` 5.20. Its two new messages, for four at
  Higher Level and two at Standard Level, were approved on 16 October 2026 (owner, in chat).
- **Found, not changed: `text-body/…` and `text-small/…` emit no CSS.** Both are custom
  `@utility` classes, which take no line-height modifier, so those elements inherit their size. Fixed
  here in `FirstRun.tsx` and the editor (`text-[0.9375rem]/5`); still in `components/ds/Choice.tsx`
  (first run's rows, 15/24 rather than 15/22) and `components/match/WhyThisMatch.tsx`, whose
  `text-small/5` lines may show at 15px rather than 13px.

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
- **The delete route runs its deletes in one transaction.** Today
  `app/api/students/account/delete/route.ts` deletes saved programs, courses, the profile, sessions,
  accounts, tokens and the user one after another, so a failure can leave half an account. In one
  `prisma.$transaction` a failure deletes nothing, which the dialog's message says.
- **The export includes "Open to anywhere"** (`openToAllLocations`), which 3.1 started saving and
  `app/api/students/account/export/route.ts` leaves out.
- **No new reads.** Academic reads what `/student/onboarding` reads today: the profile once, with a
  select, and the cached fields, countries and subjects for their names. Settings reads what it reads
  today, through its five-minute cache. The page after deleting is static and reads nothing.

**Decided on the boards (D2.10 and D4.11, every recommendation approved 18 October 2026).** Canvas
row 17: "D2.10 Confirm dialog", "D4.11 Academic profile", "D4.11 Academic profile · phone", "D4.11
Settings" and "D4.11 Settings · phone". They replace "Academic profile" and "Phone · Profile tab".

The confirm dialog (D2.10):

- **One component, `ConfirmDialog`,** for Delete account, Unlink from school and leaving an edit
  unsaved. A native `<dialog>` opened with `showModal`, `role="alertdialog"`, named by its title and
  described by its text: a title that asks, a sentence or a short list, an optional field, two
  buttons. 480px on desktop, the full width less 16px on a phone, centred on both, radius 16, the
  overlay elevation and a real 1px edge. Title 20/28, semibold; Delete and Unlink put Lucide
  `TriangleAlert` before it in the danger colour.
- **Focus starts on the safe button** (Cancel, Keep editing); Tab stays inside; Escape is Cancel;
  closing returns focus to the button that opened it. A click on the dimmed page does nothing.
- **Buttons.** The primary on the right; on a phone the two side by side, half the width each, 48px.
  Labels short enough for that; the title carries the detail.
- **A danger variant in `Button`** (D2.1): #B3261E with white text in light (6.5:1), hover #931F19;
  #FF8E85 with #0E1014 in dark (8.6:1), hover #FFADA6; system colours with an edge in forced
  colours. Only inside a confirm dialog, for actions that delete or take away access. The buttons
  that open the dialogs are secondary: "Delete account" in red text, "Unlink from school" in ink.
- **Working and failing inside the dialog.** The action says "Deleting…" or "Unlinking…", no spinner;
  Cancel is `aria-disabled` and the field read-only. A failure keeps the dialog open with the
  reason above the buttons (`role="alert"`), and focus moves to the action to try again.
- **Motion.** In: a fade and an 8px rise in 240ms; out: 180ms; the page dims with it. Reduced motion
  fades only.
- **The words.** Delete: "Delete your account?", "This deletes everything in your account, for
  good:", then "Your account and how you sign in", "Your subjects and grades, interests and
  countries", "Your shortlist" and, when linked, "Your link to {school}"; "You can make a new account
  with the same email any time."; the field "Type DELETE to confirm" (any case, trimmed), and Delete
  account `aria-disabled` until it matches; Cancel. Failed: "Couldn't delete your account. Nothing
  was deleted. Try again in a moment." Unlink: "Unlink from {school}?", "Coordinators at your school
  will no longer see your academic profile or your matches. To link again, your school needs to send
  you a new invitation."; Cancel, Unlink. Failed: "Couldn't unlink from your school. Nothing changed.
  Try again in a moment." Leaving: "Leave without saving?", "Your changes to your interests aren't
  saved yet. If you leave, your profile stays as it was." (or "your countries", "your subjects and
  grades"); Leave (secondary), Keep editing (primary).

The Academic page (D4.11):

- **Before grades, Academic is first run,** at the first step not yet saved, as built in 3.1.
- **With grades, a summary.** The signed-in header with Academic current; the h1 "Academic profile"
  (34/40 on desktop, 30/36 on a phone) and "Your subjects, interests and countries decide your
  matches. Change any of them here." In the 880px column, three panels: **Subjects and grades**,
  "38" (Newsreader, 52px; 44 on a phone) with "points predicted", "36 from subjects, 2 core points",
  "Your six subjects" two to a line (one on a phone) in their rows' order, each as "Physics HL 6" and
  read as "Physics, Higher Level, grade 6", then "Theory of Knowledge B · Extended Essay C", and
  "Edit subjects and grades"; then **Interests** ("2 of 5", each field with its icon on brand-soft,
  "Edit interests") and **Countries** ("3 countries", the names in one line, or "Open to anywhere"
  with "Programs in all 23 countries"; "Edit countries") side by side, stacked on a phone. The
  buttons are links drawn as secondary buttons, at the top right of the first panel and the foot of
  the others on desktop, full width at each panel's foot on a phone. Names wrap, never cut. Nothing
  on the summary edits.
- **A saved profile the IB's rules stop** shows its first message on the subjects panel, in the
  editor's words ("Take 3 or 4 subjects at Higher Level (you have 2).", Lucide `CircleAlert`, on
  gap-soft), with "Your matches use these grades until you change them."
- **Loading:** the three panels as D2.8 skeletons, the same boxes, no shimmer.
- **Each screen opens on its own** (this changes D4.3, D4.4 and D4.5 after first run, and 3.1's and
  3.2's build, which walk from step 1 to step 3): the signed-in header and tab bar, "Back to Academic
  profile", the small h1 "Update your profile" with no step count or progress bar, then the step's
  question. Subs: "Choose up to five. Your matches update when you save." / "Choose as many as you
  like, or Open to anywhere. Your matches update when you save." / 3.2's "Change a subject, level or
  grade where it is. Your matches update when you save." Page titles: "Update your interests · IB
  Match", and the same for countries and for subjects and grades. The boards don't fix the
  addresses; give each screen its own, so Back and a reload keep it.
- **Save changes.** Nothing is written until it is pressed; Continue's drafts are first run's only.
  The footer: the count ("2 of 5 chosen", "3 chosen") over "No changes to save yet", Save changes
  `aria-disabled`; after a change, "3 of 5 chosen" or "Every country" over "Not saved yet"; subjects
  as 3.2. "Saving…", then **back to Academic**, with D2.9's toast "Your interests are saved, and your
  matches are updated." (or "Your countries are saved…", "Your subjects and grades are saved…") and
  See matches. A failure keeps the student there with the change, and the toast says "Couldn't save
  your interests." (or "your countries", "your subjects and grades") with Try again.
- **Leaving with changes not saved** by any link on the page, in the header or the tab bar opens
  D2.10's "Leave without saving?". Closing the tab or reloading gets the browser's own prompt
  (`beforeunload`).

Settings (D4.11):

- **The page.** The signed-in header with no nav item or tab current; the h1 "Settings" and "Your
  account, your school and your data." Three panels in the 880px column, each row's label in a 160px
  column on desktop and above it on a phone. Appearance and Sign out leave the page; they are in the
  account menu.
- **Account.** Email, with "You sign in with this address, so it can't be changed here."; Name, a
  field (placeholder "Add your name", at most 100 characters, 16px text on a phone) with Save name
  beside it (under it on a phone), `aria-disabled` until the name changes, and "Shown in your account
  menu, and to your school's coordinator if you link your account."; Member since. An empty name is
  allowed, as today. Saving: "Saving…", then D2.9's "Name saved."; failed: "Couldn't save your name."
  with Try again.
- **School.** Not linked: Lucide `School`, "Not linked to a school", "If your IB coordinator uses IB
  Match, they can invite you by email. Accept the invitation, and they can see your academic profile
  and your matches to guide you.", and no button. Linked: the school's logo if it has one, else
  `School`; its name, wrapped; "Krakow, Poland · linked through an invitation on 2 September 2026"
  (without "through an invitation" when it wasn't); "Coordinators at your school can see your
  academic profile and your matches, to guide you."; Unlink from school, which asks first (D2.10).
  Unlinked: "You're no longer linked to your school.", and focus to the School heading. No flag emoji.
- **Your data.** "Download your data", "Your account, profile, grades, interests, countries and
  shortlist, as a JSON file.", Download: "Preparing…", then the file as today; failed, "Couldn't
  prepare your data." with Try again, in place of `alert()`. "Delete your account", "Deletes your
  account and everything in it, for good.", Delete account (D2.10).
- **After deleting,** the student is signed out onto a small static page of its own (noindex, the
  public header): "Your account is deleted", "We've deleted your account, your subjects and grades,
  your interests and countries, and your shortlist. You can make a new account with the same email
  any time.", and Go to Home. Today they land on Home with no word.

**Built 18 October 2026 (session 13).** Academic is `app/student/onboarding/Academic.tsx`, loaded
in its own chunk through `NewOnboarding.tsx` as first run is: the summary (`components/academic/`)
and the three screens, each at its own address (`?edit=interests`, `?edit=countries`,
`?edit=subjects`), drawn with first run's step parts, now shared in
`components/first-run/Steps.tsx`. Its rules and words are in `lib/student/academic.ts`. The page
reads the profile once, as first run does, and moves between the summary and its screens with
`history.pushState`, without a request; the summary shows what each save wrote. Save changes calls
first run's routes: the one upsert on `PUT /api/students/profile/preferences` for interests and
countries, and `POST /api/students/profile` for subjects and grades. With a change not saved, any
link (the header's, the tab bar's and the footer's too) and Sign out open the dialog first; a
reload or closing the tab gets the browser's prompt. `FirstRun.tsx` is now first run only. Settings
is `app/student/settings/SettingsClient.tsx`, through `NewSettings.tsx`, on the page's cached read,
with its dates written on the server. The dialog is `components/ds/ConfirmDialog.tsx`; the danger
button is a `Button` variant on three new tokens (`--danger`, `--danger-hover`, `--on-danger`).
After deleting, a server action signs the student out onto `/account-deleted`, which is static and
a 404 in today's design. The delete route runs in one `prisma.$transaction`; the export selects its
columns and includes `openToAllLocations`.

Reads, from Postgres's statement log on a local copy: the Academic summary makes the profile read
and the re-consent check, 8 statements against today's 10 (today's layout also re-reads the
profile); opening a screen and coming back, none; Settings 3 against 5, its user read behind the
five-minute cache; the page after deleting, none. While previewing, the reference lists and
Settings' cache are read on each view, as the preview switch notes.

Departures and hand-offs:

- **The skeleton is D2.8's**, in the `line` tint; D4.11's loading frame drew the lighter `sunken`.
- **The success toast wraps to two lines on desktop.** D2.9 caps the toast at 560px, and "Your
  subjects and grades are saved, and your matches are updated." with See matches is wider; D4.11
  drew it on one line. Widening it changes every toast, so that is left to the owner.
- **The route's loading state is Academic's skeleton, for first run too**, while the server reads
  the profile: the route can't tell before the read whether the student has grades.
- **Today's design downloads a little more on two pages**: the lazy wrappers that keep the new
  screens out of its chunks, 546 bytes (gzip) on `/student/onboarding` and 142 on
  `/student/settings`. Every other page is the same, and the HTML of every page compared is the
  same.
- **The new design downloads more**: Academic 4.5 KB for a student with grades, first run 1.5 KB,
  and Settings 7.8 KB, since today's Settings client stays in the page's chunk until cleanup (R.2).
- **Found, not changed: the account menu shows a new name only after the next sign-in.** The session
  token keeps the name it was signed in with, as today's Settings does; refreshing it is an auth
  change, for a separate task.
- **Lucide's `TriangleAlert` is imported as `AlertTriangle`**, the name today's pages use: the
  other name restructured the icon's module in the chunk every page loads.
- `AccountSettingsClient` and today's two dialogs stay for today's design until cleanup (R.2).

---

## Phase 4 — Public pages

### 4.1 — Home page

**Outcome:** The new home page (canvas boards "D4.1 Home" and "D4.1 Home · phone"): a hero with a real product preview instead of
the generic illustration, three steps, why the IB matters, country guides, the founder's note, a final
call to action, and the footer.

**Design gate:** D4.1, approved ([Step 2](#step-2--design-first)).

**Must-haves:** stays static. The hero image is replaced by markup, so no 575 KB PNG source. The copy
fits the sign-in-first flow. The cookie banner stays (owner, 10 October 2026), in the new design.

- **No new reads.** Home reads nothing today and reads nothing after: no database, Redis or search
  call, and no image from Supabase. The preview's three programs are fixed in code. The banner reads
  and writes its choice in the browser only, as today.
- **SEO parity** (definition of done 12): `metadata` and the JSON-LD stay in `page.tsx`, shared by
  both designs; one h1 with today's words; every fact today's page shows is still on it. The
  JSON-LD's speakable selectors name `.hero-description`, `.feature-title` and
  `.feature-description`, which no element has today: the hero paragraph and the four IB points get
  those classes.
- **The `#how-it-works` anchor stays,** on the steps section.

**Decided on the boards (D4.1, every recommendation approved 18 October 2026).** Canvas row 18: "D4.1
Home" and "D4.1 Home · phone". They replace "Home (logged out)", drawn on 6 October before the
header, footer, logo and match card were approved.

The page, top to bottom, inside the header and footer as built (1.5), in their 1240px column:

- **Hero.** Desktop two columns (the words, then the 560px preview, 72px apart), 72px above and 96px
  below; a phone one column, the preview after the words. A pill, Small, "Built by a former IB student
  who wished this existed". The h1, Display XL (56/60, 40/44 on a phone): "Find your perfect
  university match", today's words in sentence case, with "university match" on a lime bar under the
  letters (0.14em tall, at 88% of the line), not a marker behind them: light letters on lime are 1.1:1
  in dark. "Perfect" stays as today's word for SEO parity; 04-design-system §5's "no Perfect match" is
  about match labels. Body L, `hero-description`: "Use your predicted IB grades to find university
  programs that match your profile. IB Match understands the IB: Higher and Standard Level, TOK and the
  Extended Essay, and how it all adds up." Two `lg` buttons (52px), full width on a phone: Get my
  matches, primary with Lucide `ArrowRight`, to `/student` as in the header; Explore programs,
  secondary, to `/programs/search`. Two lines with Lucide `Check` in the ok colour: "Free for
  students, always" and "Universities in 23 countries".
- **The preview,** a `<figure>`: a sunken panel, radius 20, 20px in (12 on a phone), headed "Your
  matches" with "38 points predicted", holding three D3.1 cards in their phone layout, then the
  caption "Three matches for a student with 38 points, from each program's published entry
  requirements." The panel is `inert`: no Tab stops, and screen readers get the caption. Card names
  are not headings, so the page's outline stays one h1 and an h2 per section. Initials tiles, no
  photos. The three, as stored on 18 October 2026 and each checked for 2027 entry (check them at each
  content refresh): Computer Science BSc (Hons), University of Edinburgh, UE, Meets all requirements,
  chips "38 / 34 points", "Maths AA HL 6", "English A Lit SL 5"; Economics, Finance and Data Science,
  Imperial College London, ICL, "Within reach · 1 point, 1 grade", chips "38 / 39 points", "Maths AA HL
  7 · you 6"; Computer Science, Linguistics and a Language, Trinity College Dublin, TCD, "Needs Spanish
  B HL", chips "Spanish B HL 5 or 5 others · you SL", "38 / 34 points", "English A Lit SL 4", "Maths AA
  HL 5". Save and "Why this match" are drawn, inert.
- **How it works,** `id="how-it-works"`, on the surface band between two hairlines. h2, Display L
  (44/48, 32/36 on a phone): "Your matches in three steps", then "Sign in with Google or an email link,
  then tell us three things. Each step is saved as you go." An ordered list, three columns (stacked on
  a phone), each under a 2px ink rule with its number in Newsreader 40/44 in brand, `aria-hidden`:
  "Choose your fields", "Pick up to five study areas, from Engineering to the Arts."; "Choose your
  countries", "Stay close to home or look across all 23 countries. Or choose Open to anywhere."; "Add
  your subjects and grades", "Six subjects at Higher or Standard Level, predicted or final grades, TOK
  and the Extended Essay. We work out your total."
- **Why the IB matters,** on paper. h2 "Built for the IB Diploma", then "Generic university search
  tools don't understand the details of the IB. IB Match is built around them." Four points, four
  columns (stacked on a phone), each under a 1px line-2 rule, h3 `feature-title` and paragraph
  `feature-description`: "Higher and Standard Level aren't the same", "A Higher Level grade meets a
  Standard Level requirement. A Standard Level grade never meets a Higher Level one, and your matches
  follow the same rule." (`compareLevels` in `lib/matching/subject-matcher.ts`); "TOK and the Extended
  Essay count", "Your two core grades add their points to your total, from the IB's own table, just as
  universities read them."; "Every match shows why", "See which requirements you meet, which are within
  reach and what's missing, subject by subject."; "Your grades, entered once", "No more checking
  university websites one by one. Your matches are ready as soon as you finish."
- **Country guides,** on the surface band. h2 "Country guides", then "How universities in each
  country read the IB Diploma, for 2027 entry.", and the link "IB rules by country" with
  `ArrowRight`, to `/ib-university-requirements`. The 23 guides as links named by country,
  alphabetical, four to a row (two on a phone), 48px tall, paper on the band with a 1px line edge and
  `ChevronRight`. "23" and the list come from the guides in code, never a read; no program count
  (1,677 today, 1,628 a week earlier, so a typed number goes stale).
- **The founder's note,** on paper; desktop the note and a 360px column of two facts, 96px apart; a
  phone stacked. h2 "A note from the founder", a decorative “ in Newsreader, brand, `aria-hidden`;
  today's two paragraphs, the first 20/32 in ink on desktop (Body L on a phone), the second Body L in
  ink-2: "I built IB Match because I remember how overwhelming the university search was during my own
  IB years. Generic search tools didn't understand that my HL Physics meant something different than
  just "Physics". I wanted to create the tool I wished I had." and "We're still growing our database
  and improving every day. If you don't find your perfect match yet, check back soon, or tell us which
  universities you'd like to see added."; "Tal, IB Diploma graduate". The facts, two surface panels:
  "Free for students", "Always: there is nothing to pay to see your matches."; "New programs added
  regularly", "Missing a university? Tell us which one." with the link to `/contact`.
- **The final band,** lime in both themes, text #14161B: h2 "Ready to find your match?", then
  "Browse programs freely, then sign in for matches built from your IB profile, and keep the ones you
  like on your shortlist." Get my matches, an ink button (#14161B, text #F7F6F2, `ArrowRight`), to
  `/student`; Explore programs, outlined in ink, to `/programs/search`. Dark's brand button is 2.1:1
  against lime, hence ink. In forced colours the band turns black with a white edge. Side by side on
  desktop; stacked, full width, on a phone.

The cookie banner, in the new design (today's stays for today's design):

- **Same choices, same storage, new words.** Today's three choices and what each stores, the same
  half-second wait, and still not on `/auth`. No emoji. A region named by its h2, "Cookies": "We use
  essential cookies to sign you in and keep your account secure. You can accept all cookies or only
  essential ones." and the link "Cookie policy" to `/cookies`. Customize, a link-style button; then
  Essential only and Accept all, both secondary, at the same weight (today Accept all is the only
  filled button).
- **Customize opens the settings in place,** focus on their h2 "Cookie settings" (`tabindex="-1"`):
  "Essential cookies can't be turned off: the site needs them to work. IB Match sets no other cookies
  today." Four rows, no switches: Essential cookies, "Sign-in and security", "Always on"; Analytics
  cookies, "How the site is used, to improve it", "Not used"; Preference cookies, "Remembering your
  settings", "Not used"; Marketing cookies, "Advertising and retargeting", "Not used". Then Back (to
  the first view, focus on Customize), Essential only and Accept all.
- **Where it sits.** Desktop: fixed 24px from the bottom right, 420px wide, radius 16, surface, a 1px
  line edge and the overlay elevation, 20px by 24px in; 202px tall, 439px with the settings, scrolling
  inside below the header. A phone: across the bottom, radius 16 on top, 16px in, the three choices in
  one row (Customize, then the two buttons sharing the rest); 196px tall, 431px with the settings,
  scrolling inside below the header. Signed in on a phone it sits on the tab bar, and the bar stays put
  while it shows instead of hiding on scroll (D2.14); a toast rises above both.
- **Not modal.** It takes no focus when it appears and comes first in Tab order after the skip link.
  A choice closes it; if focus was inside, it moves to `#main`.
- **Motion.** After the wait it rises 8px and fades in over 240ms, and fades out in 180ms; reduced
  motion fades only. Fixed, so CLS stays 0.

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

**Design gate:** D4.2 and D4.13 to D4.16, approved ([Step 2](#step-2--design-first)). Which pages
count as "the legal pages" is settled first, by the research in
[4.5](#45--policy-and-privacy-pages-what-the-redesign-covers-research).

**Must-haves:** the FAQs page's structured data and its visible questions keep coming from one list
(today both read `faqs` in `app/faqs/page.tsx`, from the CMS or `FALLBACK_FAQS`). Every page passes
the SEO snapshot comparison (Definition of done 12).

### 4.4 — Guard against raw palette classes

**Outcome:** A lint rule fails on raw palette classes (`text-blue-600`, `bg-gray-50`, …) in
student-facing code, so the two styling systems cannot drift apart again (audit 2.2). It is a code-quality
rule, not a formatting one, so it does not conflict with Prettier.

**Design gate:** none; nothing on screen changes.

### 4.5 — Policy and privacy pages: what the redesign covers (research)

**Outcome:** One list, approved by the owner, of every page and component that shows a policy or
asks for consent. Each is marked: redesigned in 4.3 (board D4.14), redesigned in its own task, or
left as it is, with the reason. 4.3, D4.14 and [Start here](#start-here) are updated to match.
Added 18 October 2026 (owner).

**Design gate:** none. Research and a docs pull request only; run it before row 16's design
session, so D4.14 is drawn with the full list.

**Known so far (18 October 2026):**

- `/privacy`, `/terms` and `/cookies`, the "legal pages" of 4.3 and D4.14, which has no board yet.
  Privacy and Terms show the version published in the admin's legal content
  (`getPublishedDocument`, `lib/legal-documents/`) as Markdown, with text in the page as a fallback.
  All three call `auth()` to draw today's header, so `npm run build` lists them as Dynamic (ƒ) and
  each view renders on the server. The new design's header doesn't need the session, so they could
  be prebuilt like the other text pages: a cost question for the owner.
- "We've Updated Our Policies", the banner on signed-in pages when the Terms or the Privacy Policy
  has a newer version than the user accepted: its own task, 4.6 (board D2.16).
- The consent line on student and coordinator sign-in, and on the student invitation form, which
  link to `/terms` and `/privacy`: sign-in is D4.2 and the invitation D4.16. Confirm both cover it.
- The cookie banner: done in 4.1.
- The admin's legal content editor (`/admin/legal-content`): staff only, so out of scope unless the
  owner says otherwise.

**To check:** any other page, email or coordinator screen that shows policy text or asks for
consent; whether the legal pages need more than the text-page template (a contents list, the
version and its date, links between the three); and SEO parity for each (Definition of done 12).

### 4.6 — The policy update banner

**Outcome:** "We've Updated Our Policies" (`components/shared/ReconsentBanner.tsx`) in the new
design, on every signed-in student page, and wherever else 4.5 decides. Today's amber banner, with
raw palette classes and title case, keeps showing for today's design. Added 18 October 2026 (owner).

**Design gate:** D2.16, approved ([Step 2](#step-2--design-first)).

**Must-haves:**

- **Same behaviour as today:** `ReconsentChecker` decides whether it shows, from the student
  layout's existing check, so no new read. Accepting records consent through `/api/consent/accept`,
  then the page refreshes. Remind me later, and the close button, hide it until the next full load.
- **It never covers the cookie banner,** or sits under it: today's banner covers it (found in build
  14). D2.16 decides the order. On a phone it sits above the tab bar, as the cookie banner does.
- **A failed accept says so** and offers to try again; today it fails silently.
- No emoji, real buttons and links, and the Definition of done.

---

## Phase 5 — After the whole preview

Questions the owner chose to settle after seeing the whole new design, A to Z, in the preview. Each
gets a session of its own.

### 5.1 — The program card in every list

**Outcome:** One program card on phones for Matches, Explore and Shortlist, chosen with every
screen built and seen together.

**Why later (owner, 11 October 2026):** on a real phone the 48px photo looks small beside the three
lines of text in an Explore row. The change board "Program card · one for every list (D3.1, D3.3)"
(canvas row 12, task D3.8) draws three prototypes in all three lists at 390px: A, 48px, as approved
on D3.1 and D3.3; B, 64px with one header for every list, recommended on the board; C, 72px. The
owner kept A to see the whole experience first.

**Design gate:** D3.8, approved.

**When:** after session 16, once every screen is built behind the preview switch. Before release
day if the change is wanted then; otherwise as its own session after release.

**Must-haves:**
- Review Matches, Explore and Shortlist on a real phone in the preview, light and dark, beside the
  change board. Add a prototype to the board if the review suggests one.
- If B or C is chosen: one header in every list (the photo, the name at 17/24, university and
  country, the status in words, the IB minimum on the right, Save); on Matches the points and
  no-minimum chips give way to the figure on the right, and the subject chips and "Why this match"
  stay. `MatchCard` (2.2), `ResultRow` (2.3) and the Shortlist list (2.5) change together. Desktop
  keeps its 56px photo.
- If A stays: close D3.8 and this task with a note of the decision.

### 5.2 — Motion and feedback in every component

**Outcome:** One way the app moves and answers a touch, the same in every component and screen, so it
feels like one app.

**Why (owner, 12 October 2026):** testing the cards on a phone, a program's name is its only link,
with nothing to show it can be tapped and no response when it is. D1.3 (approved 8 October 2026) set
the motion tokens: 120ms for a press, 180ms for hover and state, 240ms for sheets, dialogs and list
to detail, one easing, only transform and opacity, and a fade instead of movement with reduced
motion. Each component built since has chosen its own response within them. On a press, buttons
shrink to 98%, the link cards on the program and university pages to 99%, and a tab's icon to 96%
with a grey fill, while Matches cards and Explore rows give no response at all. "Why this match"
and "How the fit is worked out" fade in, and chevrons turn. The list-to-program view transition
D1.3 describes was never built. The owner wants one standard, chosen after looking at every screen.

**When:** session 19, after session 16 and the program card review (5.1), before release day. Built
behind the preview switch, like every session before release.

**Design gate:** D1.6, approved ([Step 2](#step-2--design-first)).

**Must-haves:**
- **Investigate first** (the design session for D1.6): go over every screen on a real phone and on
  desktop, in light, dark, reduced motion and forced colours. List each interaction (a tap or press,
  hover, focus, opening and closing a menu, sheet, disclosure or dialog, saving and what follows,
  loading, toasts, moving between pages), what it does today, and in which component.
- **One rule set on one board,** "D1.6 Motion and feedback": each kind of interaction once, with its
  response, its timing and its token, in light, dark and reduced motion. Cases to settle:
  - press feedback on everything tappable, cards and rows included;
  - the tap target of a program card or row: the name only, as D3.1 and D3.3 approved, or the whole
    card through the name's link, with Save and "Why this match" above it. If 5.1 changed the card,
    review the card it chose;
  - hover on desktop only, and never the only sign that something is a link;
  - the list-to-program view transition in D1.3: build it, or drop it from the system.
- **Keep the Definition of done:** only transform and opacity, no infinite animations, a fade with
  reduced motion, and no more JavaScript than the rules need.
- **The build:** apply the approved rules to every component in one pull request, through shared
  classes or tokens rather than each component's own, so later work follows them by default.
  Screenshots beside the board, as in every build.

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
