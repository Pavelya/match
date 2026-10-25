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
| P2 | ~~Choose the logo mark~~ **Done: Lens, chosen provisionally on 7 October 2026 and confirmed as the final mark on 21 October 2026 (owner).** The clearance search on it is still to commission (owner decisions) | Owner | 1.3 is no longer blocked. Brand configuration makes a later swap a file change |
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
  forms only), 5.17, 5.18, 6.6, 7.1, 7.3, 7.5.

**Needed before release day** (added since, 22 October 2026): `MAINT_tasks.md` 5.27, Explore's best
fit (the board D3.5 Sort · best fit and session 25 here); 7.4: the legal documents, drafted before and
published on release day, and the public pages' wording, which is code (#157 and the SEO pull request #158) and
may merge before it; and 5.26, a production bug that can go any
time. The order of all the open MAINT work is in that file's "Start here".
- `CONTENT_tasks.md` 5.3 (France), 5.4 (how competitive), 6 (USA), 7 (Germany).

One coordination rule: country-page edits in CONTENT (France's new page, the US and German pages)
land on `main` as usual. Once 4.2 has moved a country onto the new template, an edit to that country
goes into both versions until release, so do 4.2 late. **Met 18 October 2026:** all three landed
(France 8 October, the USA 10 October, Germany 12 October), and the open CONTENT task 5.4 changes
program descriptions only, so the owner unlocked 4.2. The second half still holds: an edit to a
migrated guide goes into both versions until release. Since build 15 (18 October 2026) every guide
is migrated: its words are in the page's `guide.ts` and in `<Country>Content.tsx`, and
`lib/guides/guides.test.ts` fails when an edit reaches only one (`docs/countries/COUNTRY-PAGE-BASELINE.md` §1).

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

**Where it stands, 25 October 2026.** The canvas has 100 boards. The owner approved in chat "B ·
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
Home · phone". Build 14's gate is complete. Then row 19 drew the country guide template, Ireland's
guide whole and sections of five other guides, on desktop and phone, and the owner approved all three
boards in chat with every recommendation, adding one rule, the same final heading on every guide:
"D4.12 Country guide", "D4.12 Country guide · other guides" and "D4.12 Country guide · phone". Build
15's gate is complete, and the owner unlocked it the same day. On 19 October row 20 drew sign-in, the
requirements hub, the text and legal pages, the 404 and error pages and the school invitation, with the
list 4.5 asked for, and the owner approved all eight boards in chat with every recommendation: "D4.2
Sign-in", "D4.13 Requirements hub", "D4.13 Requirements hub · phone", "D4.14 Text pages", "D4.14 Text
pages · phone", "D4.14 Legal pages", "D4.15 404 and error pages" and "D4.16 School invitation". Build
16's gate is complete. Approving D4.14 added For schools as D4.17, a board of its own. Later that day
row 21 drew For schools on desktop and phone, and the owner approved both boards in chat with every
recommendation: "D4.17 For schools" and "D4.17 For schools · phone". Build 21's gate is complete.
On 20 October row 22 drew the policy update notice, and the owner approved the board in chat with every
recommendation: "D2.16 Policy update banner". Build 20's gate is complete. Later that day row 23 drew the
seven emails, and the owner approved all three boards in chat with every recommendation, including the
sentence it adds to D4.11's page after deleting: "D4.18 Emails", "D4.18 Emails · support and account"
and "D4.18 Emails · phone". Build 22's gate is complete. Later that day row 24 drew the one rule set for
motion and feedback, from a review of every built component, and the owner approved it in chat with every
recommendation: "D1.6 Motion and feedback". Build 19's gate is complete, and the owner unlocked it the same
day, ahead of the program card review (5.1). D1.7, seasonal themes, was added on 20
October 2026 for after release ([6.1](#61--seasonal-themes-the-slots-the-schedule-and-the-first-season)).
On 21 October 2026 the owner moved it ahead of release day, to test in the preview, with winter as the
first season, and confirmed Lens as the final mark. On 22 October 2026 row 25 drew Explore's sort for
a student with grades, for `MAINT_tasks.md` 5.27, and the owner approved it in chat with every
recommendation, including the search requests it costs: "D3.5 Sort · best fit". Build 25's gate is
complete. On 25 October 2026 row 26 drew the four seasonal slots and winter in each, and the owner
approved the board in chat with every recommendation: "D1.7 Seasonal themes". Build 23's gate is
complete, and the owner unlocked it the same day.

### Foundations

| Task | On the canvas today | To add before review | Approved |
|---|---|---|---|
| D1.1 Colour tokens | "B · Foundations": every token in light and dark, with its contrast ratio, and the focus outline | Nothing | 8 October 2026 |
| D1.2 Type | "B · Foundations": the desktop scale in Newsreader and Geist. "D1.2 Type · phone sizes", "D1.2 Type · phone, light" and "D1.2 Type · phone, dark": the sizes below 768px, the longest real names at 390px, and the rules that go with them | Nothing | 8 October 2026: the desktop scale, then the phone sizes |
| D1.3 Space, radius, elevation, motion, icons | "B · Foundations". **Changed 20 October 2026 (owner)** by "D1.6 Motion and feedback" (row 24): the list-to-program view transition and the tab-switch transitions leave the system, and "only transform and opacity" means only they move things, while colours, edges and shadows may fade in 180ms | Nothing | 8 October 2026; the D1.6 change 20 October 2026 |
| D1.4 Theme: System, Light, Dark | "Theme: System, Light, Dark": the account menu in light and dark, the public footer on desktop and phone. "Phone · Profile tab" has the Appearance row. Two changes in row 7: "D1.4 Theme · chosen edge" (the chosen option gets the 1px line-3 edge from D2.4) and "D1.4 Theme · phone size" (options 44px tall below 768px). A third in row 8: "D1.4 Account menu" (Settings, FAQs, Contact, Appearance, Sign out; "Profile and settings" and Shortlist leave, since Academic and Shortlist are in the nav, decided 9 October 2026) | Nothing | 8 October 2026; the chosen edge, the phone size and the account menu 9 October 2026 |
| D1.5 Logo: Lens | "Logo options and clearance": Lens, chosen provisionally on 7 October 2026. "D1.5 Logo: Lens" (row 9): two drawings of the mark, the page mark for 24px and up and a favicon with a lens 25% larger for 16 and 32px; the mark at 16, 32 and 180px in light and dark, in browser tabs, on a home screen and in Windows contrast themes; the email header; the seven files 1.3 makes. "D1.5 Share image" (row 9): the Open Graph image at 1200 × 630. **Decided 9 October 2026 (owner):** one mark in both themes, the #2B3FD6 square with the lime lens, rather than the lighter #8E9BFF square that D2.12 and D2.13 draw in dark. **Confirmed 21 October 2026 (owner):** Lens is the final mark | Nothing | 9 October 2026 |
| D1.6 Motion and feedback | "D1.6 Motion and feedback" (row 24, interactive): the rule set, each kind of interaction once with its response, timing, class and reduced-motion form; a working demo in light, dark and reduced motion; every press at rest, hovered, pressed and opening a page, in light and dark; the match card and the Explore row as whole links; timing to scale; moving between pages; every built component today against the rule; reduced motion, forced colours and decorative motion. **Decided 20 October 2026 (owner), every recommendation:** the whole card or row is the link (Matches, Explore, Shortlist), with Save and "Why this match" above it; a press on everything tappable, 96%, 98% or 99% by size with a darker fill, 120ms, text links by colour, no grey tap flash; what was tapped stays pressed until the next page arrives; menus and popovers fade and drop 4px, 180 in and 120 out; no list-to-program transition; reduced motion drops movement and keeps fades; disclosures fade in at 180ms; "Updating…" on Explore after 300ms; the theme switch at once; one 480ms entrance on Home's hero for seasons (6.1). Decisions in 5.2 | Nothing | 20 October 2026 |
| D1.7 Seasonal themes | "D1.7 Seasonal themes" (row 26, interactive): the four slots empty and then winter in each, at 1440px, 390px and 320px, light and dark, signed in and signed out, forced colours (hidden) and reduced motion, with the fullest phone header (signed in, 320px) measured; the seasons and their windows; the hero's entrance, playable; what each slot allows. **Added 20 October 2026 (owner); moved ahead of release day on 21 October 2026, to test in the preview, with winter as the first season** ([6.1](#61--seasonal-themes-the-slots-the-schedule-and-the-first-season)). **Decided 25 October 2026 (owner), every recommendation:** winter, Lunar New Year, Eid al-Fitr and Diwali, and no Halloween; winter is bulbs and sparkles, with no snowflake, tree or religious symbol; the header's accessory after the name, never on the mark, hidden from 768 to 1023px signed in and on the quiet pages; the hero's bulbs hang from the lime bar under "match" and get D1.6's one entrance; the band's string on Home and the guides only; the 404's large drawing from 1280px; a light and a dark drawing per slot. Decisions in 6.1. Each later season gets a board of its own, "D1.7 Season · {name}" (6.2) | Nothing | 25 October 2026 |

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
| D2.16 Policy update banner | "D2.16 Policy update banner" (row 22): the notice over the approved Academic page at 1440px and 390 × 844, light, dark, forced colours and keyboard focus; the cookie banner first, then the notice; accepting, a failed accept, accepted with its toast, a toast while it shows; the panel's words at 420px for the Terms, the Privacy Policy or both changed, accepting, failed and signed out meanwhile, light and dark. Added 18 October 2026 (owner). **Decided 20 October 2026 (owner), every recommendation:** one at a time, the cookie banner first; the cookie banner's place and panel, no amber and no icon; today's words in sentence case, the documents as links in the sentence, no version labels and no change notes; "I accept the updated policies" and "Remind me later", no close button; a failure said in the panel, a success in a toast; it waits on pages with the steps' footer, and stays off Explore and program pages. Decisions in 4.6 | Nothing | 20 October 2026 |

### Patterns

| Task | On the canvas today | To add before review | Approved |
|---|---|---|---|
| D3.1 Match card | "D3.1 Match card" (row 10): desktop, light and dark, 14 cases from the production matcher (every status, the worst long and either/or requirements, MIT and Arizona State), the save states, and the copy of every chip and badge. "D3.1 Match card · phone": the same cards at 390px. They replace "Match card: every state" and the cards on "Phone · Matches"; "B · Components" shows the new card. Decisions in 2.2 **Changed 20 October 2026 (owner)** by "D1.6 Motion and feedback" (row 24): the whole card opens the program, through the name's link, with Save, "Why this match" and its panel above it; built in 5.2 | Nothing | 10 October 2026; the whole card 20 October 2026 |
| D3.2 Why this match | "D3.2 Why this match" (row 10): opened on desktop and phone, light and dark, for a program within reach, one with six requirements, the largest either/or and a US program. Replaces "Phone · Why this match, opened". Decisions in 2.2 | Nothing | 10 October 2026 |
| D3.3 Result row | "D3.3 Result row" (row 12): desktop at 1192px and phone at 390, light and dark, signed in with and without a profile and signed out; meets, within reach, missing (the longest badge), a 110-character name, no image, no IB minimum, the fit loading; the name and Save in every state; three ways to show no IB minimum. Replaces the rows on "Explore programs" and "Phone · Explore". **Decided 11 October 2026 (owner), every recommendation:** no IB minimum shows "None" with the admit rate under it; the fit is the Matches badge, word for word; no fit column signed out or before grades; an ordered list, not a table; thumbnails 56px on desktop, 48 on a phone; no hover on the whole row. **Changed 13 October 2026 (owner):** signed in before adding grades, Save is the icon link to first run named "Save … : add your grades first" ("D2.1 Save · without grades", row 15), not a toggle; built in 3.1. **Changed 20 October 2026 (owner)** by "D1.6 Motion and feedback" (row 24): the whole row opens the program, with Save above it, and on desktop the row takes a muted tint on hover, in place of "no hover on the whole row"; Shortlist's rows follow; built in 5.2 | Nothing | 11 October 2026; Save before grades 13 October 2026; the whole row 20 October 2026 |
| D3.4 Requirement checklist | "D3.4 Requirement checklist" (row 10): signed in, signed out, signed in with no grades yet, short and long either/or groups, US programs and the entry-year line, desktop and phone, light and dark. Decisions in 2.4 | Nothing | 10 October 2026 |
| D3.5 Filter toolbar | "D3.5 Filter toolbar" (row 12): the desktop toolbar with each chip's menu open (Field, Country, IB points, Length), light and dark; no programs match; an IB points value it can't use; "Only ones I qualify for" on; signed out; signed in before adding grades; the toolbar at 900px. Phones use the sheet (D2.15). **Decided 11 October 2026 (owner), every recommendation:** a choice applies at once, as in the sheet; menus are popovers holding a labelled dialog, not ARIA menus; no count beside each option; "Include programs with no IB minimum", ticked by default; Length 3 years, 4 years, 5 years or more; Sort: Most relevant, Lowest points needed, Highest points needed; signed out or without grades, a link in the switch's place. The profile shortcuts read "Use my fields", "Use my countries" and "Up to my 38", as on the sheet. **Changed 13 October 2026 (owner):** the hint under "Include programs with no IB minimum" reads "Mostly US universities, which admit on the whole application", in place of "All 12 US universities admit without one", since two German universities now set no minimum too (`CONTENT_tasks.md` 7); built in 2.5. **Changed 22 October 2026 (owner)** by "D3.5 Sort · best fit" (row 25): Sort gains Best fit, the default for a student with grades, and "Most relevant" shows only once words are typed; built in `MAINT_tasks.md` 5.27 | Nothing | 11 October 2026; the hint 13 October 2026; the sort 22 October 2026 |
| D3.5 Sort · best fit | "D3.5 Sort · best fit" (row 25), a change board to D3.5 and D4.7 for `MAINT_tasks.md` 5.27: the sort menu for each visitor, light and dark; where the reachable programs land with the switch off under three orders (status first, score alone, countries and fields first) and under `optionalFilters`; desktop with the switch on and off, words typed, Best fit kept while typing and signed out, in light and dark; the phone with Sort open, the sheet open and signed out, light and dark; the search requests per list and a month's figures. All from the D3.1 student against the 1,677 search records on 22 October 2026. It reverses D3.5's "no Best fit" and D4.7's "no search typed, highest minimum first". **Decided 22 October 2026 (owner), every recommendation:** "Best fit" the default for a student with grades and nothing typed, "Most relevant" once words are typed, a picked sort kept (`?sort=best`); no Best fit signed out or before grades; the label "Best fit", the same order as Matches; with nothing typed "Most relevant" leaves the menu, so signed out or before grades the select reads "Highest points needed"; with the switch off, the student's countries and fields first, then in each the ones they meet, within reach, then the rest, each closest to their total; the switch stays off by default; one line under the count, "Your countries and fields come first; in each, the ones you meet, closest to your 38.", Sort's description, only for Best fit; Sort stays out of the phone sheet; the full order read with the search's browse, one or two requests a list, about 5,000 to 6,600 a month after release, not `optionalFilters`. Decisions in 5.27 | Nothing | 22 October 2026 |
| D3.6 Subject editor | "D3.6 Subject editor" (row 16): a subject row at the desktop column's 880px and a phone's 358px in every state (empty, focus, the list open, filtered, a subject in another row, no match, the longest name, a second science in Group 6's row, a second Language A, a 1), TOK and the Extended Essay, the diploma checks under the subjects, and the footer in 14 states, light, dark and forced colours. It replaces the subject rows on "Academic profile" and "Phone · First run, step 3". **Decided 14 October 2026 (owner), every recommendation:** any subject in any row, the last "Group 6 · The arts, or another subject"; edit in place, keeping level and grade, with no defaults; one total, in the footer, "So far" until whole; each check where it applies and again in the footer as what Finish needs; the IB's other failing conditions still stop Finish, reworded in the helper; Lucide Lightbulb and Notebook pen; on a phone only "Mathematics: Applications and Interpretation" ends in an ellipsis. Decisions in 3.2 | Nothing | 14 October 2026 |
| D3.7 Compare table | "D3.7 Compare table" (row 14): desktop at 1192px, light and dark, four, four and two programs from a real shortlist, the column heads' states, the "Choose programs" popover and the skeleton; MIT (no IB minimum, "Admits 4.6%"), Constructor University (no photo, "Holistic admission"), Nanyang's 110-character name, an earlier intake. "D3.7 Compare table · phone": two programs side by side at 390px, light and dark. They replace the table on "Shortlist and compare". **Decided 13 October 2026 (owner), every recommendation:** up to four programs on desktop, the first four until the student chooses; eight rows (fit, IB minimum, subjects, country, degree, length, checked for, official page); "None" with the admit rate or "Holistic admission"; subjects in the chip words; the earlier-intake caution in its column; 56px photos in the column heads. **On a phone, two side by side at most**, picked with two selects (owner, in place of the recommended 2 × 2 of four). Decisions in 2.5 | Nothing | 13 October 2026 |
| D3.8 Program card in every list | "Program card · one for every list (D3.1, D3.3)" (row 12): on a phone, prototype A (48px, as approved), B (64px, one header for every list, recommended on the board) and C (72px), each in Matches, Explore and Shortlist, and B in dark | **Parked 11 October 2026 (owner):** A, as approved, stays until the whole design can be seen in the preview; reviewed again in [5.1](#51--the-program-card-in-every-list) | |

### Screens and flows

| Task | On the canvas today | To add before review | Approved |
|---|---|---|---|
| D4.1 Home | "D4.1 Home" and "D4.1 Home · phone" (row 18): the whole page in light and dark on both, then the cookie banner on a first visit: keyboard focus, Customize, dark, forced colours, and on a signed-in page above the tab bar. The preview holds three real programs and their stored requirements, for D3.1's student. They replace "Home (logged out)". **Decided 18 October 2026 (owner), every recommendation:** today's h1 words; a preview of three real matches, one per status, with initials tiles and no photos, `inert`; no program count, and "23 countries" from code; a lime bar under the hero phrase and a lime final band in both themes; six sections carrying every fact today's page shows; the cookie banner keeps its three choices and its storage, with Essential only and Accept all at the same weight, bottom right on desktop, across the bottom on a phone, and on the tab bar signed in. Decisions in 4.1 **Changed 20 October 2026 (owner), approving D2.16:** the banner waits while a page shows the steps’ footer (first run, Academic’s editing screens), built in 4.6 | Nothing | 18 October 2026 |
| D4.2 Sign-in | "D4.2 Sign-in" (row 20): /auth/signin at 1440px and 390px, light and dark; the card in every state (first visit, Google focused, typing, an address it can't use, sending, not sent, too many attempts, "Create your account" from an invitation, before the script), dark and forced colours; "Check your email"; the sign-in error; the coordinator sign-in and its notice for a student's address. **Decided 19 October 2026 (owner), every recommendation:** no site header, the logo above one 440px card; today's words, with "We'll save your matches and shortlist to your account."; "Continue with Google" to Google's rules (white with a #747775 edge, #131314 with #8E918F in dark, the G on a white disc in dark), its label in Geist; the field labelled "Email", with D2.2's error when the button is pressed; "Email me a sign-in link"; **a link works for 10 minutes, set in the config, and every text says 10** (owner: "make sure all the texts are aligned"); failures in an alert in the card; the error page "We couldn't sign you in", two messages reworded; the coordinator sign-in in the same card; both consent lines word for word. Decisions in 4.3 | Nothing | 19 October 2026 |
| D4.3 First run, step 1: interests | "D4.3 First run, step 1" and "D4.3 First run, step 1 · phone" (row 15): the step in light and dark on both, first visit, nothing chosen, five chosen with a sixth pressed, keyboard focus, saving, a failed save and after first run ("Update your profile"); then Save without grades start to finish: Save before it is pressed, first run with the program waiting, opening at a later step, "Save and exit" with a program waiting, back on the program and on Explore, and the save failing on return. They replace "Phone · First run, step 1". The change board for Save is "D2.1 Save · without grades". **Decided 13 October 2026 (owner), every recommendation:** "Set up your profile" (or "Update your profile") is the small h1 beside the step count, the question the step's h2; the waiting line under the step count on every step; "Save and exit" with a program waiting saves, then asks once (Keep going, Exit to Home); opening at a later step says what's kept; one toast back where Save was pressed, and Explore at the same search and row; desktop one 880px column; Continue needs one field. Phone: the header stays at the top; the footer fixed to the bottom, on the tab bar after first run; the Save and exit panel drops from the header; back on the program the page opens at the top. Decisions and words in 3.1 **Changed 18 October 2026 (owner):** after first run, Academic opens this step on its own ("D4.11 Academic profile", row 17): "Back to Academic profile", no step count, Save changes, and back to Academic; built in 3.3 | Nothing | 13 October 2026; opened from Academic 18 October 2026 |
| D4.4 First run, step 2: countries | "D4.4 First run, step 2" and "D4.4 First run, step 2 · phone" (row 15): the step in light and dark on both, with the program waiting, filtering ("land"), a short name ("uk"), no country matching ("brazil"), "Open to anywhere", nothing chosen, keyboard focus, saving, a failed save, after first run, and scrolled on a phone. They replace "Phone · First run, step 2". **Decided 13 October 2026 (owner), every recommendation:** "Open to anywhere" is a checkbox row above the filter, saved as `openToAllLocations` with no countries, hiding the grid; Continue needs a country or "Open to anywhere"; the filter matches any part of a name and a few short names (UK, USA, Holland, Czechia); it hides tiles, never choices; four tiles to a row on desktop, two on a phone, alphabetical. Phone: 16px in the filter. Decisions in 3.1 **Changed 18 October 2026 (owner):** after first run, Academic opens this step on its own ("D4.11 Academic profile", row 17): "Back to Academic profile", no step count, Save changes, and back to Academic; built in 3.3 | Nothing | 13 October 2026; opened from Academic 18 October 2026 |
| D4.5 First run, step 3: subjects | "D4.5 First run, step 3" and "D4.5 First run, step 3 · phone" (row 16): the step in light and dark on both, first visit, four subjects in, the list open, a group with no subject, ready, two at Higher Level, an E in TOK, the IB's other conditions, keyboard focus, finishing, a failed save, and after first run with and without a change; then Save without grades at step 3: opening with "Your interests and countries are saved." under the step count and the waiting line, ready, and Save and exit. They replace "Phone · First run, step 3". **Decided 14 October 2026 (owner), every recommendation:** the question "What are your subjects and grades?"; the button is Finish, and Save changes after first run, with the total before the change; desktop one 880px column, each subject on one line, the core a second panel; Save and exit keeps complete rows and the core as a draft without a total; Finish saves once. Where Save changes leads is D4.11's: back to Academic (18 October 2026). Phone: rows stack, grades at 46px; the open list's field comes up under the header. Decisions in 3.2 **Changed 18 October 2026 (owner):** after first run, Academic opens this step on its own ("D4.11 Academic profile", row 17): "Back to Academic profile", no step count, Save changes, and back to Academic; built in 3.3 | Nothing | 14 October 2026; opened from Academic 18 October 2026 |
| D4.6 Matches | "D4.6 Matches" and "D4.6 Matches · phone" (row 11): the whole page in light and dark on both, then loading, a failed load, profile incomplete (`03-flows.md` F6), no matches, none meeting yet, the Missing group opened, the end of a long group (no images), a failed save, from the production matcher. They replace "Matches" and "Phone · Matches". Decisions in 2.2 | Nothing | 10 October 2026 |
| D4.7 Explore | "D4.7 Explore" and "D4.7 Explore · phone" (row 12): the whole page in light and dark on both, then signed out, signed in before adding grades, the fit arriving, "Only ones I qualify for", programs with no IB minimum, loading the next 20, the next 20 failing, no results and a failed load, from real searches. They replace "Explore programs" and "Phone · Explore". **Decided 11 October 2026 (owner), every recommendation:** 20 at a time, then "Show 20 more", with how many are shown in the URL; signed out, no fit column and a sign-in link in the switch's place, no banner; the page's questions visible as eight collapsed answers; a filter change keeps the rows until new ones arrive; the summary "1,628 programs in 23 countries"; no search typed, highest minimum first, as today. Phone: one Filters button beside the switch; the count, applied chips and Sort on their own lines; "Show 20 more" full width. **Changed 13 October 2026 (owner):** signed in before adding grades, the link in the switch's place reads "Add your grades to check your fit and save programs" ("D2.1 Save · without grades", row 15); built in 3.1. **Changed 22 October 2026 (owner)** by "D3.5 Sort · best fit" (row 25): in place of "no search typed, highest minimum first", a student with grades gets Best fit, with its line under the count, and everyone else "Highest points needed", named; built in `MAINT_tasks.md` 5.27 | Nothing | 11 October 2026; the link 13 October 2026; the order 22 October 2026 |
| D4.8 Program page | "D4.8 Program page" and "D4.8 Program page · phone" (row 13): signed in and signed out on both, light and dark, then signed in before adding grades, a requirement missing with the fit worked out, a US program with no IB minimum, no image, its admit rate and its "How competitive" section, the longest name, the image credit as a caption, back from sign-in with `?save=1`, a failed save, loading and not found, with real programs and the production matcher. They replace "Program detail" and "Phone · Program (dark)". **Decided 12 October 2026 (owner), every recommendation:** the trail stops above the page, and the country crumb opens the country's guide; the fit panel beside the requirements, the score behind "How the fit is worked out"; no "Similar programs" or "Rank in your matches" (they need the match list); descriptions cut at eight lines past ten, and "How competitive:" its own section; no image, a one-column hero; a not-found page of its own. Phone: the fit panel before the facts; no fixed bottom bar; the trail wraps. Decisions in 2.4. **Changed 13 October 2026 (owner):** signed in before adding grades, Save is the link to first run with "Add your grades first. We’ll save it when you finish." under it, and the panel's "Add your grades" comes back to the program, without `?save=1` ("D2.1 Save · without grades", row 15); built in 3.1 | Nothing | 12 October 2026; Save before grades 13 October 2026 |
| D4.9 University page | "D4.9 University page" and "D4.9 University page · phone" (row 13): signed in and signed out, light and dark, then a US university with no image and its admit rate, the longest list (Manchester, 68 programs in 12 fields), programs taught away from the main city (Sciences Po), the longest name (LSE), loading and not found. **Decided 12 October 2026 (owner), every recommendation:** the signed-in header for signed-in students; every program, grouped by field, with field links; no fit here, a link to Explore with the name typed; a US university's admit rate in its facts; "Also known as" only when the short name adds something; a program's campus city when it is taught elsewhere. Phone: field links wrap above the list; two-line rows; Contact and the guide after the programs. Decisions in 2.4 | Nothing | 12 October 2026 |
| D4.10 Shortlist | "D4.10 Shortlist" and "D4.10 Shortlist · phone" (row 14): List and Compare in light and dark on both, then choosing programs, a removal with Undo, a removal that failed, one program, an empty shortlist, profile incomplete, loading and a failed load, for the D4.6 student's eight-program shortlist. They replace "Shortlist and compare". **Decided 13 October 2026 (owner), every recommendation:** List and Compare as two links with their own address; the D3.3 rows with the fit; newest first, no sort; a removed program keeps its row until the student leaves the page; compare needs two; one read more than today, the student's subjects. Decisions in 2.5 | Nothing | 13 October 2026 |
| D4.11 Academic profile and settings | "D4.11 Academic profile" and "D4.11 Academic profile · phone" (row 17): the summary in light and dark on both, loading, the longest names with five fields and Open to anywhere, a profile the IB's rules stop, and before grades; then each screen it opens, with a change, leaving it unsaved, saving, a failed save, and back on Academic. "D4.11 Settings" and "D4.11 Settings · phone": not linked and linked to a school (the one school in production, 56 characters), no name yet, the name changed, saving, saved and failing, the download preparing and failing, unlinking, and deleting to the page after it, light and dark on both. They replace "Academic profile" and "Phone · Profile tab". **Decided 18 October 2026 (owner), every recommendation:** Academic is a summary in three panels, Subjects and grades, then Interests and Countries, each opening its own screen; each screen opens on its own, with Save changes, which goes back to Academic with a toast and See matches; leaving with changes not saved asks first (D2.10); a saved profile the IB's rules stop says why on the panel; before grades, Academic is first run. Settings keeps every feature in three panels, Account, School and Your data; the name saves on its own; Appearance and Sign out only in the account menu; "Preparing…" for the download; after deleting, a static "Your account is deleted" page. Decisions in 3.3 **Changed 20 October 2026 (owner), approving D4.18:** the page after deleting adds "We’re also emailing you a confirmation." after what was deleted, built in 4.7 | Nothing | 18 October 2026 |
| D4.12 Country guide template | "D4.12 Country guide", "D4.12 Country guide · other guides" and "D4.12 Country guide · phone" (row 19): Ireland's guide whole at 1440px and 390px, light and dark, then a jump from "On this page", questions open and focused, a source link, dark and forced colours; sections of the USA, Australia, Hong Kong, Belgium and the Czech Republic on the same template, and the longest title (the Netherlands). **Decided 18 October 2026 (owner), every recommendation:** the question is the h2, and the short label moves into "On this page"; "On this page" a sticky column from 1024px and a closed disclosure on a phone, with no mark for the section being read; one secondary "Explore programs in {country}" in the hero, no count; three callouts (short answer, note, caution) in place of today's coloured boxes and emoji, and plain bullets; one 720px column on the paper; the questions collapsed; "More country guides" and Home's lime band at the end; the update date shown; no flag and no breadcrumb trail. **And one rule:** every guide's final heading is "Ready to find your match in {country}?", Hong Kong, Poland and Portugal included. Decisions in 4.2 | Nothing | 18 October 2026 |
| D4.13 Requirements hub | "D4.13 Requirements hub" and "D4.13 Requirements hub · phone" (row 20): the whole page at 1440px and 390px, light and dark, a card focused, a question open, forced colours, with production's figures (1,677 programs in 23 countries; the USA 286 programs with no minimum). **Decided 19 October 2026 (owner), every recommendation:** the guide template's parts, Country guides current; each section's big line is its h2, its label an eyebrow; the 23 guides as link cards, A to Z, no flags; "No IB minimum" for the USA, one number where every program asks the same ("24 IB points"); the counts read when the page is built, weekly, as today; three figures and one "Explore programs" button in the hero, "Browse Country Guides" gone; twelve field rows with the first-run icons; plain bullets and plain cards; Home's lime band. Decisions in 4.3 | Nothing | 19 October 2026 |
| D4.14 Text pages | "D4.14 Text pages" and "D4.14 Text pages · phone" (row 20): How it works, FAQs, Contact (signed in and out, the form in every state, sent) and Support us, light, dark and forced colours. "D4.14 Legal pages" (row 20): Privacy whole, Terms and Cookies, desktop and phone, light, dark and forced colours, then the 4.5 list. **Decided 19 October 2026 (owner), every recommendation:** one text-page template; today's words with the content style (sentence case, no exclamation marks in headings or buttons, no "perfect"); How it works' four categories become the three statuses; FAQs collapsed, then "Still have questions?"; three FAQ answers change on release day (PR #127, label `go-live`); Contact shows the signed-in header to a signed-in student; Contact's categories are radio rows, errors on press; Support us keeps every section (**changed 23 October 2026 (owner, `MAINT_tasks.md` 7.4, #157):** except "Where your support goes", the "Most popular" badge and the tiers' "covers…" lines, which go because no donation has been received; and How it works' filters are six cards in three columns, with Length and "Only the ones you qualify for" added); one legal template with "On this page", the version and its date under the h1, links between the three, the numbered headings in Geist; one h1 on /cookies; the legal pages prebuilt in the new design; For schools added as D4.17. Decisions in 4.3 | Nothing | 19 October 2026 |
| D4.15 404 and error pages | "D4.15 404 and error pages" (row 20): the 404 at 1440px and 390px, light, dark and forced colours, the search in use; a page failing signed out and signed in, trying again, without a reference; the root layout failing; the error inside sign-in. **Decided 19 October 2026 (owner), every recommendation:** one 404 for the whole site, "We can't find that page", with the search and three ways on; prebuilt with the signed-out header, drawing its own header and footer where the layout leaves it bare; one error page inside the page's own chrome, Try again ("Trying again…") and Home, with the digest as a reference; a bare page when the root layout fails; the error inside sign-in in D4.2's card; no codes or "Oops". Decisions in 4.3 | Nothing | 19 October 2026 |
| D4.16 School invitation | "D4.16 School invitation" (row 20): /auth/accept-student-invite at 1440px and 390px, light and dark, the card in every state; the invalid, expired, accepted and wrong-type outcomes; "Check your email" after accepting; /student/invitations with the dialog open, connecting, failed, declined and none left; a coordinator's invitation; forced colours. **Decided 19 October 2026 (owner), every recommendation:** same flow, new look; the invitation a 520px card on /auth, the school in a panel without its flag; "You can unlink at any time in Settings." added to the consent; the button always pressable, and the box says why; "Sign in to accept it" for a student who already has an account; after accepting, "Check your email" (today's provider bug is `MAINT_tasks.md` 5.21, the dead end 5.22); accepting from School invitations in D2.10's dialog, then Settings with a toast; declining asks nothing, a toast confirms; a coordinator's invitation in the same card; the real school's 56-character name. Decisions in 4.3 | Nothing | 19 October 2026 |
| D4.17 For schools | "D4.17 For schools" and "D4.17 For schools · phone" (row 21): `/for-coordinators` whole at 1440px and 390px, light and dark, keyboard focus on the call and on the portal link, forced colours, Menu open with For schools current, and today's illustration kept, for comparison. Added 19 October 2026 (owner, approving D4.14's recommendation): otherwise it would be the one public page in today's design at release. **Decided 19 October 2026 (owner), every recommendation:** D4.14's text-page template, today's words in the content style; one label for the one call, "Schedule a 15-minute call", Calendly in a new tab; the illustration goes; "Sign in to the coordinator portal" beside the call, to /auth/coordinator; headings in order ("Why partner with us?" an eyebrow, "Coordinator dashboard" an h2, today's h4 a note); the four quotes in one panel and "How IB Match helps" in plain bullets; the dashboard's features as D4.14's cards, "Early adopter benefit" the guides' note; the dashboard's words and the founder story reworded before release (`MAINT_tasks.md` 7.4); the portal's sign-in redirect fixed (5.26). **Changed 23 October 2026 (owner, `MAINT_tasks.md` 7.4, #157):** the four quotes are not real and go, so "Why partner with us?" is one column ("How IB Match helps" and the note); the dashboard's cards are "School-level analytics", "Student overview", "Student invitations" and "Data export"; the founder story names Tal and Pavel. Decisions in 4.3 | Nothing | 19 October 2026 |
| D4.18 Emails | "D4.18 Emails", "D4.18 Emails · support and account" and "D4.18 Emails · phone" (row 23). Their header is on "D1.5 Logo: Lens" (row 9) | The seven emails Resend sends (`emails/`), built in 4.7: both sign-in links, the student invitation (a new account, an existing one, the reminder), the coordinator invitation, both support ticket emails, and "Account deleted" in its two versions, from Settings and by an admin (`MAINT_tasks.md` 5.24). Each at 600px and 390px, light as sent, in the emails' own dark colours, and as Gmail and Outlook invert them (simulated), with images off; the real school's 56-character name, no coordinator or student name, a long reply from support; the plain text and the inbox line beside each. Added 19 October 2026 (owner). **Decided 20 October 2026 (owner), every recommendation:** the emails carry dark colours of their own (`prefers-color-scheme`), and the light version is drawn to survive a partial and a full invert; one layout, left-aligned, the footer under the card; no "Hello," line; the sign-in and invitation links written out under the button; words in the content style, with buttons that say what they do ("Open the invitation" for every invitation); an existing account gets its own invitation; the reminder picks its version, with one read when a coordinator presses Resend; a plain-text body for every email; Contact's ticket category labels; D4.11's "Your account is deleted" page mentions the email. Decisions in 4.7 | 20 October 2026 |

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
| 4 | Logo | 1.3 | D1.5 | small | **Done 9 October 2026.** Lens, from `lib/brand/config.ts` and seven files in `public/brand/`; confirmed as the final mark on 21 October 2026. Its clearance search is needed before release day |
| 5 | Match data | 2.1 | None | small | **Done 9 October 2026.** Requirement-based statuses (decided 7 October 2026): `deriveMatchStatus` in `lib/matching/match-status.ts`. Scores unchanged |
| 6–7 | Match card and results | 2.2 | D2.9, D2.11, D3.1, D3.2, D3.4, D4.6 | large | **Done 11 October 2026.** The Matches page, match card, "Why this match", toast and empty states. `ProgramCard` stays for today's pages until cleanup; the result row moves to 8 |
| 8 | Explore | 2.3 | D2.15, D3.3, D3.5, D4.7 | medium | **Done 11 October 2026.** Toolbar and menus, the phone sheet, result rows, 20 at a time. The fit and "Only ones I qualify for" are worked out on the server; the search index gained the length in years and the admit rate |
| 9 | Program and university pages | 2.4 | D3.4, D4.8, D4.9 | medium | **Done 12 October 2026.** Breadcrumbs with structured data, the requirement checklist signed in and out, the fit panel, every program by field, not-found pages; sign-in returns to the page and Save saves on the way back. No loading state (it would prefetch every program link) |
| 10 | Shortlist and compare | 2.5 | D3.7, D4.10 | medium | **Done 13 October 2026.** List and Compare from one response with the fit, one read more than today (the student's subjects); up to four on desktop, two on a phone. The nav count is kept in the browser, with no read of its own |
| 11 | First-run steps | 3.1 | D2.6, D4.3, D4.4; the D2.1 Save change | medium | **Done 13 October 2026.** Steps 1 and 2 in the new design, saved as drafts; focus mode from first run's mark on the page; Save without grades through first run and back, on a program or an Explore row. Step 3 is today's until 3.2 |
| 12 | Subject editor | 3.2 | D3.6, D4.5 | medium | **Done 14 October 2026.** One editor, `ProfileEditor`, for first run's step 3 and editing after: a row per IB group, any subject in any row, the core, the checks, and one total in the footer. Save and exit keeps a draft without a total; the IB's failing conditions read the same words everywhere (`lib/ib/diploma.ts`) |
| 13 | Academic profile and settings | 3.3 | D2.10, D4.11 | medium | **Done 18 October 2026.** Academic is a summary in three panels, each opening its own screen at its own address, with no request between them; Save changes comes back with a toast, and leaving with a change asks first. Settings in three panels. One `ConfirmDialog` for Delete, Unlink and leaving unsaved, with a danger button. The delete route runs in one transaction, the export includes "Open to anywhere", and deleting ends on a static page |
| 14 | Home | 4.1 | D4.1 | medium | **Done 18 October 2026.** Six sections, prebuilt, with no read: the preview's three cards are fixed in code, and a test runs the matcher over their stored requirements; the 23 guides and "23 countries" come from the guide list. The cookie banner in the new design sits first in Tab order after the skip link, and only a browser with no choice yet downloads it. CSS is now 31.9 of the 32 KB budget |
| 15 | Country guides | 4.2 | D4.12 | large | **Done 18 October 2026.** All 23 guides from one template (`components/guide/`) and typed data (each guide's `guide.ts`), prebuilt, with no read and no JavaScript of their own; the metadata and JSON-LD stay in each page.tsx, unchanged. Ireland, the USA and Australia first, then the rest, each compared word for word with today's page. A test records how the two versions differ, so an edit to one alone fails it. CSS 32.2 of the 36 KB allowed until cleanup. This is `MAINT_tasks.md` 7.2, done once in the new design, but for the 23 page shells |
| 16 | Other public pages and the guard | 4.3, 4.4 | D4.2, D4.13–D4.16 | medium | **Done 19 October 2026.** Sign-in, "Check your email", the sign-in error and the coordinator sign-in in one card; both invitations and School invitations; the requirements hub and the text pages on one template; the legal pages on another, prebuilt from release day; the 404 and error pages. A sign-in link works for 10 minutes and every text says so; `MAINT_tasks.md` 5.21 to 5.23 done for both designs. ESLint fails on raw palette classes outside today's files. For schools waits for D4.17 (session 21) |
| 21 | For schools | 4.3 (`/for-coordinators`) | D4.17 | small | **Done 19 October 2026.** One text page on D4.14's template with today's words, the Calendly call under one label, a link to the coordinator sign-in and no illustration; prebuilt, no read, and the same HTML as before for everyone else. The 52px button now has its 17px label wherever a page calls `buttonVariants()` itself, Support us included |
| After 16 | Program card review | 5.1 | D3.8 | small to medium | Parked 11 October 2026: decided once every screen can be seen in the preview. A build only if a prototype other than A wins |
| 20 | Policy update banner | 4.6 | D2.16 | small | **Done 20 October 2026.** The notice in the cookie banner's panel and place, shared as `BottomPanel`, after the cookie choice; today's words in sentence case, no close button; a failed accept says so, a success shows a toast. Both panels wait while a page shows the steps' footer (a D4.1 change). The student layout's check feeds it, so no new read, and only a student with policies to accept downloads it |
| 22 | Emails | 4.7 | D4.18 | small to medium | **Done 20 October 2026.** All seven emails on one layout in `components/email/`, with dark colours of their own and a plain-text body each; each template builds its subject, HTML and text in either design, switched by `NEW_UI_FOR_EVERYONE` alone. Until release they render byte for byte as on `main`, which a test checks against fixtures. The reminder reads the user by address in the new design only. `MAINT_tasks.md` 5.24 and 5.25 done for both designs (5.25's clean-up script waits for the owner), and D4.11's page mentions the email |
| 19 | Motion and feedback | 5.2 | D1.6 | medium | **Done 20 October 2026.** Shared classes in `app/globals.css` (three presses, the `pressed:` variants, the stretched link, the small overlay, the disclosure fade) and one reduced-motion rule for the new design. Matches cards and Explore and Shortlist rows are whole links with Save and "Why this match" above them; a press holds while the next page loads, through `useLinkStatus` in client links only, so today's design downloads nothing new. "Updating…" on Explore, the theme switch at once. CSS 34.7 of the 36 KB allowed until cleanup |
| 23 | Seasonal themes | 6.1 | D1.7 | small to medium | **Unlocked 25 October 2026** (D1.7 approved). Before release day, in the preview (owner, 21 October 2026); winter first. Four decoration slots, a schedule the admin sets with no deploy, and the first season. No read per visit, and nothing downloaded outside a season |
| 25 | Explore best fit | `MAINT_tasks.md` 5.27 | D3.5 Sort · best fit | small to medium | **Done 22 October 2026.** A student with grades opens Explore on Best fit, Matches' order with the switch on, with one line under the count; words typed make "Most relevant" the default, and a picked sort stays in the URL. Signed out or before grades, "Highest points needed", named, at one request as before. Best fit browses the list (one or two requests); `EXPLORE_BEST_FIT` (`full`, `lifted`, `off`) can make it cheaper without a code change, and `scripts/algolia-usage.ts` prints the month's requests |
| 17 | Release day | R.1 | — | small | One variable and a redeploy |
| 18 | Cleanup | R.2 | — | medium | About two weeks later |
| 24 and on | Each further season | 6.2 | That season's D1.7 board | small | One stylesheet, its SVGs and a key in the code's list. From then on the admin schedules it every year |

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
| 14 | `/design D4.1`: Home on a phone | The Home board, with the cookie banner, which stays (owner, 10 October 2026) | `/build 14`: Home (4.1) | Done 18 October 2026 |
| 15 | `/design D4.12`: country guide template | The template board | `/build 15`: country guides (4.2) | Done 18 October 2026 |
| Before 16 | None. First the research in 4.5: which policy and privacy pages the redesign covers | The list in 4.5, which may add to D4.14 | None | Done 19 October 2026, in row 16's design session: the list is on "D4.14 Legal pages", approved with it |
| 16 | `/design D4.2, D4.13–D4.16`: sign-in, requirements hub, text pages, 404 and error pages, school invitation | Those five boards | `/build 16`: other public pages and the guard (4.3, 4.4) | Done 19 October 2026 |
| 21 | `/design D4.17`: For schools | The board | `/build 21`: For schools (4.3) | Done 19 October 2026 |
| After 16 | `/design D3.8`: the program card in every list, reviewed against the built screens | D3.8 | 5.1, only if a prototype other than A wins | Parked 11 October 2026 |
| 20 | `/design D2.16`: the policy update banner | The banner board | `/build 20`: the policy update banner (4.6) | Done 20 October 2026 |
| 22 | `/design D4.18`: the seven emails, in light and dark mail apps | The three emails boards | `/build 22`: the emails (4.7) | Done 20 October 2026. One real send of each to the owner's inboxes is still to do |
| 19 | `/design D1.6`: go over every built screen's interactions and draw one rule set | D1.6 | `/build 19`: motion and feedback (5.2) | Done 20 October 2026 |
| 23 | `/design D1.7`: the four slots and the first season | D1.7, with the list of seasons | `/build 23`: seasonal themes (6.1) | D1.7 approved 25 October 2026; build 23 unlocked. Before release day, tested in the preview (owner, 21 October 2026). Winter first, if merged by 1 December 2026; otherwise Lunar New Year |
| 25 | `/design D3.5 Sort · best fit`: Explore's sort for a student with grades | D3.5 Sort · best fit, and the Algolia requests per list | `/build 25`: Explore best fit (`MAINT_tasks.md` 5.27) | Done 22 October 2026 |
| 17 | None | Lens's clearance search is back (the mark was confirmed on 21 October 2026). The Search Console baseline is noted (owner decisions) | `/build 17`: release day (R.1). You set `NEW_UI_FOR_EVERYONE=true` | |
| 18 | None | None | `/build 18`: cleanup (R.2) | About two weeks after release |
| 24 and on | `/design D1.7 {season}`: one more season | Its board | `/build 24`: that season (6.2) | One per season, a few weeks before it |

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

- [x] 4.1 Home page (18 October 2026)
- [x] 4.2 Country guides on one template (18 October 2026)
- [x] 4.3 Other public pages (19 October 2026; For schools, `/for-coordinators`, in session 21 the same day)
- [x] 4.4 Guard against raw palette classes (19 October 2026)
- [x] 4.5 Policy and privacy pages: what the redesign covers (research) (19 October 2026)
- [x] 4.6 The policy update banner (20 October 2026)
- [x] 4.7 The emails (20 October 2026; the real sends to the owner's inboxes still to do)

Phase 5 — After the whole preview

- [ ] 5.1 The program card in every list (review)
- [x] 5.2 Motion and feedback in every component (20 October 2026)

Phase 6 — Seasonal themes

- [ ] 6.1 Seasonal themes: the slots, the schedule and the first season
- [ ] 6.2 Each further season

Release

- [ ] R.1 Release day
- [ ] R.2 Cleanup

Owner decisions — not AI work

- [x] Choose the logo mark: **Lens, provisionally** (7 October 2026). Final decision after seeing all
  screens in the preview
- [x] Confirm the final mark: **Lens** (21 October 2026)
- [x] Choose how the redesign reaches production: **a preview switch on `main`** (7–8 October 2026)
- [ ] Before release day, commission a trademark clearance search on Lens: EUIPO and USPTO,
  figurative marks, Nice classes 41 and 42
- [x] Set the preview key in Vercel and bookmark the link (S2, 8 October 2026)
- [ ] Optional: share the preview link with a few students for feedback before release
- [x] Choose the match status model: **requirement-based** (7 October 2026)
- [x] Decide whether the cookie banner stays: **it stays** (10 October 2026; `MAINT_tasks.md`, owner tasks). Affects 4.1
- [ ] Before release day, make sure Google Search Console covers the site (the January 2026 SEO plan
  left this open), and note a baseline: indexed pages, clicks and the top pages for the last three
  months. R.1 and R.2 compare against it
- [x] Decide the CSS budget while both designs ship: **let it go over until cleanup**, up to 36 KB,
  back to 32 KB at R.2, which checks it (18 October 2026; Definition of done 8)

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
| Logo | **Lens**, chosen provisionally on 7 October 2026 and confirmed as the final mark on 21 October 2026. It needs a clearance search before release. **Loaded from configuration, never hard-coded** |
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
5. **No infinite animations.** Only transform and opacity move things; colours, edges and shadows may
   fade (D1.6). Reduced motion swaps movement for a fade (audit 6.7).
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
   CSS at most 32 KB, fonts at most 60 KB, CLS stays 0. **Until cleanup, CSS may reach 36 KB**
   (owner, 18 October 2026): the one stylesheet carries both designs until R.2 deletes today's
   styles, and it reached 31.9 KB with Home (4.1) and 32.9 KB with the public pages (4.3). From R.2
   on, 32 KB holds again, and R.2 checks it. CSS is measured gzipped, every stylesheet `/` loads.
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
      logo is not a heading. Every fact the old page showed is still on the page, except the claims
      `MAINT_tasks.md` 7.4 removes because the code cannot support them (`docs/legal-review/claims.md`).
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

**Uses Lens** (owner, 7 October 2026, provisional; canvas board "Logo options and clearance";
confirmed as the final mark on 21 October 2026). Swapping it must still be a change to the config and
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

**Built 19 October 2026 (build 16):** `eslint/raw-palette.mjs`, a `no-restricted-syntax` rule over
every string in `app/`, `components/` and `lib/`, failing on a palette colour with a shade. Staff
areas and tests are outside it, and so are today's student-facing files, listed by name in the same
file: R.2 deletes them and the list. A new file is checked from its first line.
`eslint/raw-palette.test.ts` lints snippets through the repo's config.

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
  in both points sorts; no "Best fit" (changed 22 October 2026 by "D3.5 Sort · best fit": Best fit
  for a student with grades, built in `MAINT_tasks.md` 5.27). Signed out, the switch's place holds "Sign in to see which
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
  search typed the list opens at the highest minimum, as today (the search service's ranking);
  changed 22 October 2026 by "D3.5 Sort · best fit": Best fit for a student with grades, and
  "Highest points needed" named as the default for everyone else (`MAINT_tasks.md` 5.27). No
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
country goes into both. **Unlocked 18 October 2026 (owner):** the CONTENT edits the
[coordination rule](#step-1--prepare) waited for have landed.

**Decided on the boards (D4.12, every recommendation approved 18 October 2026).** Canvas row 19:
"D4.12 Country guide" (Ireland's guide whole, light and dark, then moving around the page), "D4.12
Country guide · other guides" (sections of the USA, Australia, Hong Kong, Belgium and the Czech
Republic) and "D4.12 Country guide · phone".

- **A guide is data.** Its h1, eyebrow, intro, update date (`lib/page-dates.ts`) and Explore link with
  the country's id; then its sections, each an id, the short label for "On this page", the h2, blocks
  and sources; then the questions and the final band's paragraph. Eleven blocks: paragraph, list,
  subheading (h3), short answer, note, caution, cards (two or three), table, two tables, timeline and
  document list. Rich text keeps today's bold and links. Every word stays today's, headings in
  sentence case, except as listed under "Expected differences".
- **Headings.** One h1, Display L (44/48, 32/36 on a phone), today's words ("Study in Ireland with the
  IB Diploma"). Each section's h2 is today's question or title, in Newsreader at the H1 size (34/40,
  30/36 on a phone): "How Ireland recognizes the IB Diploma". Today's short label ("Recognition") is
  the section's entry in "On this page", not a heading. h3 for subheadings, cards, the short answer,
  each question and "Official sources". The body is an `<article>`, each section has
  `.content-section` and each answer `.faq-answer`, so the JSON-LD's speakable selectors find
  elements; the JSON-LD itself is unchanged.
- **Layout.** Desktop: in the 1240px column, "On this page" in a 248px column, then the 720px text
  column, 80px apart. Sections sit on the paper, divided by a hairline, 48px above and 56px below. A
  phone: one column with 16px sides, sections 40px above and 44px below. No grey and white bands.
- **Hero.** The eyebrow, Small 600 in ink-2: "Official university admission guide for IB students
  (2027)". The h1. The intro, Body L in ink-2 with class `hero-description`, today's words without
  bold. Three lines with Lucide `Check` in the ok colour: "IB Diploma only", "Official sources" and
  "Last updated for the 2027 intake, on 25 September 2026", the date in a `<time>` from
  `lib/page-dates.ts`, the same date as the Article JSON-LD's `dateModified`. One secondary `lg`
  button (52px, full width on a phone), "Explore programs in Ireland" with `ArrowRight`, to Explore
  with the country chosen. No flag (emoji or SVG), no program count, and no breadcrumb trail: the
  header marks Country guides as current (1.5), and a trail would add BreadcrumbList JSON-LD.
- **"On this page".** Desktop, from 1024px: a nav named by its h2 (Label, "On this page"), sticky 96px
  from the top, the section labels as 36px links in ink-2, then a hairline and the link "Explore
  programs in Ireland" with `ArrowRight`. Below 1024px: a `<details>` under the hero, closed, its
  52px summary with Lucide `List`, "On this page", the count ("10 sections") and a chevron; open,
  44px rows. A link jumps straight to its section's h2, under the sticky header. Nothing marks the
  section being read: that needs script on a prebuilt page.
- **Blocks.**
  - Paragraphs: Body L (17/28) in ink, bold at 600.
  - Lists: plain bullets in ink-3, never ticks, which mean a met requirement (D3.4).
  - Short answer: surface, a 1px line edge, radius 14, 24 by 28px in (20 on a phone). An h3 holding
    the word in Newsreader (34/40, 30/36 on a phone: "No", "Yes") with the line after it in H3, then
    today's paragraph in Body L ink-2. No status colour: "No" is good news in Ireland and a warning
    in the UK.
  - Note: sunken, Lucide `Info` in ink-2, Body (15/24) in ink, radius 14.
  - Caution: close-soft, Lucide `TriangleAlert` in close, Body in ink. Today's amber and red boxes and
    the warning emoji become cautions; a coloured card that isn't a warning (the Czech guide's
    Medicine card) becomes a plain card. Both callouts carry a transparent 1px border, which forced
    colours draws.
  - Cards: two or three to a row, stacked on a phone; surface, a 1px line edge, radius 14, 20px in,
    an h3 and a list or a sentence in Body.
  - Tables: a real `<table>` in a surface panel, radius 14: a caption, column headers in Label (ink-2)
    on sunken, the first column a row header, numbers right-aligned in tabular figures, words
    left-aligned and wrapping. A table of numbers only is 440px wide at most on desktop. Two of one
    kind sit side by side from 1024px and stack below it. No guide has more than three columns, so
    no table scrolls sideways. A note under a table is Body in ink-2.
  - Timeline: an ordered list in a surface panel, a row per date: the date at 600 in tabular figures
    with its time under it in Small, then the event as an h3 and its text in Body ink-2. A 168px date
    column on desktop; the date above the event on a phone. Ireland's "5 November 2026 (12:00): CAO
    Applications Open" splits into "5 November 2026", "12:00" and "CAO applications open".
  - Document list: a surface panel, a row per document with Lucide `FileText` in ink-2.
  - Sources: at the end of each section, "Official source" or "Official sources" (an h3 in Label,
    ink-3), then each link in Body 500 with Lucide `ExternalLink` and "(opens in a new tab)" for
    screen readers. The last word and the icon never part.
- **Questions.** Today's h2 ("Frequently asked questions (IB only)"), then one surface panel of
  `<details>`, all closed, as Explore's (D4.7): each summary an h3 question and a chevron that turns
  over 180ms (no turn with reduced motion); the answer in Body L with `.faq-answer`, the same text as
  the FAQ JSON-LD, then "Source:" and its link. Then today's line, "Learn how IB Match evaluates Irish
  admission requirements for your profile.", linking to `/how-it-works`.
- **The end of the page.** "More country guides" on the surface band: the h2, "How universities in each
  country read the IB Diploma, for 2027 entry.", the link "IB rules by country", and the other 22
  guides from `lib/programs/country-guides.ts` as Home lists them. Then Home's lime band (4.1): the
  final heading, the guide's own paragraph, "100% free for students. No credit card required.", Get
  my matches (ink, to `/student`) and "Explore programs in Ireland" (outlined in ink). Then the footer.
- **One final heading on every guide (owner, 18 October 2026), no exceptions:** "Ready to find your
  match in {country}?", the country as `lib/programs/country-guides.ts` names it ("the UK", "the Czech
  Republic"). Hong Kong's "Ready to Explore Universities in Hong Kong?", Poland's "Ready to Explore
  Polish Universities?" and Portugal's "Start Your Journey to Portugal" change to it. Their paragraphs
  stay their own.
- **Every source has a name.** Australia shows six source links as bare addresses today; give each a
  name when it migrates (the board proposes "UAC — IB applicants", "IB Schools Australasia —
  University entrance" and "VTAC — IB students"). A table without a caption gets one: the US credit
  table, "Example IB credit policies".
- **Expected differences** in the before-and-after comparison, and the pull request lists them:
  heading case and level (the question is the h2), the labels moved into "On this page", the visible
  date, the three final headings above, "Get my matches" in place of "Get Started — It's Free",
  Australia's source names and the US table's caption. Every other word on the page is the same.

**Built 18 October 2026 (build 15).** The template is `components/guide/CountryGuidePage.tsx`, its
blocks `GuideBlocks.tsx` and rich text `RichText.tsx`; the types are `lib/guides/types.ts`, and each
guide's words its page's `guide.ts`. Home's guide links and lime band moved to `components/home/`
(`GuideLinks.tsx`, `LimeBand.tsx`), so Home and the guides share them. Found while migrating, for the
owner to confirm in the pull request:

- Spain's and Sweden's conversion tables had no caption either: "Average IB subject grade to access
  grade" and "IB points to Swedish merit rating".
- Besides Australia's six (three named on the board, three from the pages' own titles), Canada's
  bare address is "Universities Canada" and "swissuniversities.ch" is "swissuniversities". A few
  sources panels name pages without a link ("Public university admission pages"); they stay, as
  plain text.
- A sources line inside a card ("**Source:**" under Public universities) joins its section's
  sources; "Example:" and "Examples:" lines stay in their card.
- After a jump from "On this page" the browser moves focus to the section, so the next Tab continues
  there. The board keeps focus on the link, which needs script on a prebuilt page.
- On a phone, "Explore programs in the Netherlands" and "… in the Czech Republic" take two lines in
  the hero button, the arrow kept with the last word.

### 4.3 — Other public pages

**Outcome:** `/ib-university-requirements`, `/how-it-works`, `/faqs`, `/contact`, `/support-us`,
the legal pages, sign-in, the school invitation pages, and the 404 and error pages move to the new
design, using tokens only. Geist Mono is removed with `NoAISection.tsx`.

**Design gate:** D4.2 and D4.13 to D4.16, approved 19 October 2026 ([Step 2](#step-2--design-first)).
For schools (`/for-coordinators`), D4.17, approved 19 October 2026, lands in its own pull request
(session 21). The legal pages are `/privacy`, `/terms` and `/cookies`, settled by
[4.5](#45--policy-and-privacy-pages-what-the-redesign-covers-research).

**Must-haves:** the FAQs page's structured data and its visible questions keep coming from one list
(today both read `faqs` in `app/faqs/page.tsx`, from the CMS or `FALLBACK_FAQS`). Every page passes
the SEO snapshot comparison (Definition of done 12).

**Decided on the boards (every recommendation approved 19 October 2026).** Canvas row 20: "D4.2
Sign-in", "D4.13 Requirements hub" and its phone board, "D4.14 Text pages" and its phone board, "D4.14
Legal pages", "D4.15 404 and error pages" and "D4.16 School invitation". Each board's numbered list
holds the full words; these are what the build must do.

- **Sign-in (D4.2).** /auth keeps its own chrome: no site header, the logo (a link Home) above one card,
  440px, radius 20, on the paper; the cookie banner stays off /auth. "Welcome to IB Match", "Whether
  you're new or returning, we'll get you started. We'll save your matches and shortlist to your
  account." Continue with Google first, to Google's rules (fill, edge and text colours per theme, the
  G unchanged and on a white disc in dark), the label in Geist 500 15px. "Or continue with email",
  then the field labelled "Email" (D2.2: its error, "Enter an email address like name@example.com", on
  press, never while typing), then "Email me a sign-in link" ("Sending…" while it works). Failures are
  an alert in the card: "We couldn't send your sign-in link. Please try again." and "Too many sign-in
  attempts. Please wait a moment and try again."; the address stays. The consent line, word for word,
  under the button. "Create your account" (`?declineInvite=true`) puts today's words in a note. The
  card's boxes, static, before the script. The coordinator sign-in is the same card with "IB
  coordinator portal" above "Welcome back", its notice for a student's address and "Are you a
  student? Sign in here".
- **A link works for 10 minutes, and every text says so** (owner, 19 October 2026). Nothing sets it
  today, so Auth.js's default of 24 hours applies. Set `maxAge: 10 * 60` on the Resend provider in
  `lib/auth/config.ts`. The change reaches both designs at once, so the same pull request makes every
  text say 10: today's `app/auth/verify-request/page.tsx` says 15; the new sign-in helper and "Check
  your email" say 10; `emails/magic-link.tsx`, `emails/coordinator-magic-link.tsx` and the plain-text
  bodies in `lib/auth/config.ts` already say 10. A test pins the number in one place.
- **"Check your email" and the sign-in error.** The first is today's words in the card with a
  brand-soft MailCheck tile. The error page: "We couldn't sign you in", today's message for each code,
  except Verification ("The sign-in link is no longer valid. It may have expired, or been used
  already: each link works once.") and Configuration ("Something went wrong on our side. Please try
  again in a few minutes."); Try again, and "If it keeps happening, contact us."
- **School invitation (D4.16).** The same flow. The new-account invitation is a 520px card: "School
  invitation", "Join {school}", the school in a panel (no flag), "What coordinators can access" with
  today's three lines and "You can unlink at any time in Settings.", the consent box, then "Accept and
  create account" ("Creating your account…"). Pressed without the tick, the box says "Tick the box to
  accept the invitation."; the button never greys out. Today's outcomes (invalid, expired, already
  accepted, not a student invitation) in D4.2's card. A student who already has an account gets "Sign
  in to accept it", to sign-in returning to `/student/invitations`, and after accepting the student
  reaches "Check your email": both are `MAINT_tasks.md` 5.22 and 5.21, done here for both designs if
  still open. School invitations: each invitation a panel with Accept invitation and Decline
  ("Declining…", then a toast, no Undo); Accept opens D2.10's dialog ("Connect with {school}?", focus on
  Cancel, the consent box as its field, "Connecting…", failures inside); then Settings with "You're
  connected to {school}." None left: D2.11's panel, without "You have pending invitations". A
  coordinator's invitation (/auth/accept-invite) is the same card; the portal stays today's.
- **The requirements hub (D4.13).** Prebuilt as today, the same reads at build time. Country guides
  current in the header. The hero: the eyebrow, "IB Diploma admission rules by country", the intro
  without bold, three figures (countries, programs, the points range) and one secondary "Explore
  programs". Sections on the paper, each with today's label as an eyebrow and today's big line as the
  h2. The 23 guides as link cards (`.country-card`), A to Z, three to a row from 1024px: the name,
  today's summary, "{n} programs · {min}–{max} IB points", one number when they are equal, "No IB
  minimum" when none is set. The explainer's cards plain, its HL list in plain bullets. Twelve field
  rows with `fieldIcon`, "{n} programs · average {x} IB points", each to Explore with the field. The
  questions as the guides' details panel. Home's lime band, with today's paragraph.
- **Text pages (D4.14).** One template: a hero in the 1240px column, sections on the paper divided by
  hairlines, today's label as an eyebrow and today's big line as the h2, D4.12's cards, Home's lime band
  where today's page ends on a call to action. Content style: sentence case, no exclamation marks in
  headings or buttons, no "perfect" (How it works' band: "discover programs that fit you"; Support us'
  band: "find the right university"; its community line without the emoji). "Get Started — It's Free"
  becomes Get my matches; the "← Back to Home" links go; no emoji anywhere.
  - How it works: "Match categories" becomes "What each status means", the three statuses in D2.7's
    badges with the words on the board; the scoring intro says the score orders matches within each
    group and sits under "Why this match". The No-AI eyebrow "f(x) = result" in Geist; `NoAISection.tsx`
    and Geist Mono go (04 §2).
  - FAQs: one panel of details (summaries `.faq-question`, answers `.faq-answer`), then "Still have
    questions?" as D2.11's panel with Contact support and Email us. Three answers change on release
    day, not here: draft PR #127, labelled `go-live`, is in R.1.
  - Contact: **the signed-in header for a signed-in student.** Give `/contact` a layout of its own that
    reads the session (the page already calls `auth()`: the JWT cookie, no database read) and draws the
    app header when signed in and the public header otherwise, as `/universities` does since 2.4; add
    `contact` to `OWN_CHROME` in `components/site/nav.ts` so the root layout leaves it. Only the new
    design's branch changes. The categories are radio rows in a fieldset (two to a row from 768px);
    errors on press beside each field ("Choose a category", today's two length messages); the counts
    stay; "Send request" ("Sending…"); a failure in an alert; sent: "Request sent" with the ticket
    number. Signed out: "Sign in to contact us", its Sign in returning to `/contact`.
  - Support us: every section; the allocation as a list of bars with each share written beside it;
    every outside link says it opens a new tab.
- **Legal pages (D4.14 Legal pages).** One template for `/privacy`, `/terms` and `/cookies`: links
  between the three (a nav named "Legal") above the h1; the h1 in Display L; "Last updated {date} ·
  Version {label}" under it; "On this page" from the document's `##` headings (the guides' sticky
  column from 1024px, a closed disclosure below); one 720px column; `##` as h2 in Geist 22/30, `###`
  as h3; tables and quotes as D4.12's table and note; no lime band. **One h1:** drop a leading `# `
  line from the Markdown (`MAINT_tasks.md` 5.23 does it for today's design). **Prebuilt:** the new
  design's branch calls no `auth()`; from release day, when it is the only branch, the three are
  prebuilt with today's one-hour revalidate, so the published document is read at most once an hour
  per page instead of on every view. `npm run build` lists them Static from then. The words are the
  owner's to update (`MAINT_tasks.md` 7.4).
- **404 and error pages (D4.15).** `app/not-found.tsx`: "We can't find that page", the sentence, the
  search (a plain form to Explore, as the program 404) and three ways on (Explore programs, Country
  guides, Home); prebuilt with the signed-out header; on paths whose layout draws its own chrome
  (/student, /auth, …) the page draws the public header and footer itself; title "Page not found",
  status 404. `app/error.tsx` and `app/student/error.tsx`: one panel inside the layout's chrome,
  "Something went wrong", "This page didn't load. Try again, or go back to Home.", Try again
  (`reset()`, "Trying again…") and Home, and "If it keeps happening, contact us and quote this
  reference: {digest}." when there is a digest; focus moves to the h1. `app/global-error.tsx`: the
  logo, the same words and Try again, light or dark from the system. `AuthErrorBoundary`: D4.2's card,
  today's words.
- **For schools (D4.17, session 21).** Approved 19 October 2026, every recommendation; canvas row 21,
  "D4.17 For schools" and its phone board. `/for-coordinators` on `components/text-page/`, prebuilt as
  today (`force-static`, the hourly revalidate), with no read. The metadata and the WebPage JSON-LD stay
  in `page.tsx`, outside the switch; the page's own `StudentFooter` stays in today's branch only, since
  the chrome draws the footer. For schools is current in the header and "For IB coordinators" in the
  footer, as `components/site/nav.ts` already marks them.
  - The hero: "Partner with us" as the eyebrow; the h1 "Help your students navigate university
    admissions with confidence", no word in blue; today's intro. Then "Schedule a 15-minute call", the
    primary button, to today's Calendly link in a new tab with the external-link icon and "(opens in a
    new tab)", and beside it "Sign in to the coordinator portal" to `/auth/coordinator`. No
    illustration: `/images/landing/coordinator-hero.png` stays for today's design until R.2.
  - "Built by former IB students who understand your challenges" (h2) with today's three paragraphs,
    the last in ink.
  - "Why partner with us?" as the eyebrow over today's big line, "Managing university guidance
    shouldn't be another overwhelming task", the h2. Two columns from 1024px: "What we hear from
    coordinators" (h3), the four quotes as blockquotes in one panel, hairlines between, a serif quote
    mark, not in italics; "How IB Match helps" (h3), plain bullets, then the guides' note led by "We
    need coordinator expertise to build this right."
  - "Coordinator dashboard", the h2 (a paragraph today), with today's sentence; four cards, four to a
    row from 1024px, with Lucide ChartColumn, Users, Upload and FileText in a sunken tile and the
    titles in sentence case; then the note "Early adopter benefit: …".
  - Home's lime band: "Ready to help shape IB Match?", today's paragraph and the same call.
  - Everything but the band in an `<article>`, and the four descriptions carry `.feature-description`,
    so the JSON-LD's speakable selectors (h1, h2, `.feature-description`, `article p`) find text; today
    only h1 and h2 match.
  - On a phone, one column; the call full width with the link under it.
  - The words are today's, as on the board, except where `MAINT_tasks.md` 7.4 reworded them (#157, 23 October 2026,
    with the changes listed on D4.17 above). The rewording is in both designs,
    before release day.

**Found on the boards, outside this task:** `MAINT_tasks.md` 5.21 (the invitation's sign-in provider),
5.22 (the dead end for a student with an account), 5.23 (two h1s on /cookies) and 7.4 (bring the
legal pages up to date). On D4.17: 5.26 (the portal sends a signed-out coordinator to a 404) and For
schools' claims, added to 7.4.

**Built 19 October 2026 (build 16),** every board state compared with its frame on a production
build. Where it lives: `components/sign-in/` and `components/invitation/` (the cards, client ones as
lazy islands), `components/text-page/` (the hub's and the text pages' template),
`components/legal/LegalPage.tsx`, `components/site/` (the 404, the error screen and the bare page),
each page's `New*.tsx` beside today's. 5.21 to 5.23 are done for both designs, with
`lib/auth/accept-student-invite.ts` shared by both invitation cards; a student already signed in
with the invited address goes straight to School invitations (5.22's optional step). Departures and
what the build settled:

- **Error boundaries where the board places them,** `app/error.tsx`, `app/student/error.tsx` and
  sign-in's `app/auth/error.tsx`. Next loads an `error.tsx` with every page below it, so each one
  costs today's visitors about 0.5 KB; /programs, /universities and /contact get the root's, which
  draws the public header and footer round the panel.
- **`AuthErrorBoundary` is mounted nowhere,** so the error inside sign-in is `app/auth/error.tsx` in
  D4.2's card, with its words. The class goes at R.2.
- **Try again calls `retry()`,** Next 16.3's stable replacement for `reset()`: it fetches the page
  again in a transition, which is what "Trying again…" follows.
- **`app/global-error.tsx` follows the release flag, read at build time** (`next.config.ts`,
  `NEW_UI_RELEASED`): it replaces the root layout, so it can't ask for the preview. Until release
  Next's own page shows, and the preview doesn't show the bare page either.
- **The 404 decides its chrome from the route tree, not the address:** PublicFrame reads the root
  layout's segment (`ownsChrome`), so the prebuilt 404 hydrates without a mismatch on any path, and a
  context tells the 404 and the error panel whether a layout's chrome is round them.
- **The tab title** is "Page not found" on every 404 and "Something went wrong" on an error from the
  server; after an error in the browser, Next renders the page's own title again, which wins.
- **Geist Mono is no longer preloaded,** rather than removed: today's How it works and the admin
  still use it (their pages download it on demand), and the new design never does. It goes with
  `NoAISection.tsx` at R.2.
- **`/cookies` gained the hourly revalidate** of `/privacy` and `/terms`: prebuilt from release day,
  it would otherwise never show a Cookie Policy published in the admin.
- **Measured against `main`, today's design:** the same HTML on 25 pages but for the intended fixes
  (one h1 on the legal fallbacks, 10 minutes on "Check your email"); the same route table, revalidate
  times included; the emails byte for byte; fonts 23.5 KB lighter on most pages (no Geist Mono);
  JavaScript 0.7 KB more on a plain page, up to 2.2 KB where links prefetch sign-in and the
  invitation (the error boundaries and the islands' loaders). CSS 32.9 KB of the 36 allowed.

**Built 19 October 2026 (build 21),** For schools: every frame of both D4.17 boards compared with
the build in the preview, on a production build. `app/for-coordinators/NewForCoordinators.tsx`
sits beside today's components; the switch is in `page.tsx`, with the metadata and the JSON-LD
outside it and today's `StudentFooter` in today's branch only. `CardGrid` takes a `textClassName`,
which puts `.feature-description` on the four descriptions. What the build settled:

- **The 52px button has a 17px label wherever it is called.** Primary and secondary set
  `text-body` and the large size `text-body-l`. Through `cn()` the size won, but a page that calls
  `buttonVariants()` itself kept both, and the stylesheet's order picked 15px. The size now sets the
  text (`components/ds/button-variants.ts`), and a test checks that every variant and size has one
  text size. Three buttons change, each to its approved board: For schools' call, and Support us'
  "Support on Ko-fi" and "Open email to submit".
- **Nothing changes for anyone else:** the same HTML on `/for-coordinators` and six other public
  pages, the same route table with the same revalidate times, the same JavaScript and fonts, and CSS
  34 bytes heavier, gzipped.

### 4.4 — Guard against raw palette classes

**Outcome:** A lint rule fails on raw palette classes (`text-blue-600`, `bg-gray-50`, …) in
student-facing code, so the two styling systems cannot drift apart again (audit 2.2). It is a code-quality
rule, not a formatting one, so it does not conflict with Prettier.

**Design gate:** none; nothing on screen changes.

**Built 19 October 2026 (build 16):** `eslint/raw-palette.mjs`, a `no-restricted-syntax` rule over
every string in `app/`, `components/` and `lib/`, failing on a palette colour with a shade. Staff
areas and tests are outside it, and so are today's student-facing files, listed by name in the same
file: R.2 deletes them and the list. A new file is checked from its first line.
`eslint/raw-palette.test.ts` lints snippets through the repo's config.

### 4.5 — Policy and privacy pages: what the redesign covers (research)

**Outcome:** One list, approved by the owner, of every page and component that shows a policy or
asks for consent. Each is marked: redesigned in 4.3 (board D4.14), redesigned in its own task, or
left as it is, with the reason. 4.3, D4.14 and [Start here](#start-here) are updated to match.
Added 18 October 2026 (owner).

**Design gate:** none. Research and a docs pull request only; run it before row 16's design
session, so D4.14 is drawn with the full list.

**Done 19 October 2026,** in row 16's design session, and approved by the owner with its boards: the
list is on "D4.14 Legal pages" (canvas row 20). It adds no page to D4.14 beyond the three legal pages.

| What shows a policy or asks for consent | In the redesign | Where, and how |
|---|---|---|
| `/privacy`, `/terms`, `/cookies` | Redesigned in 4.3 | "D4.14 Legal pages": one template, today's words, prebuilt from release day (the cost question: yes) |
| "We've Updated Our Policies", on signed-in pages | Its own task, 4.6 | D2.16. On coordinator pages it stays today's, with the portal |
| The consent line under student and coordinator sign-in | Redesigned in 4.3 | D4.2: the same words, under the button |
| The student invitation's consent: the card, and the dialog on School invitations | Redesigned in 4.3 | D4.16: today's list and box, and "You can unlink at any time in Settings." |
| A coordinator's invitation, with its Terms line | Redesigned in 4.3 | D4.16: the same card |
| The cookie banner | Done in 4.1 | D4.1 |
| The FAQ about coordinators seeing a student's data | Redesigned in 4.3 | "D4.14 Text pages": today's answer |
| Settings: the school link's date, Unlink, Download, Delete | Done in 3.3 | D4.11 |
| The footer's Legal links | Done in 1.5 | D2.13 |
| The seven emails' footer links | Its own task, 4.7 (added 19 October 2026) | D4.18: the links named after the pages' titles. Until then they switch with the header at release (1.3) |
| The coordinator portal's consent notice when inviting a student | Left as it is | The coordinator portal keeps today's design |
| The admin's legal content editor | Left as it is | Staff only |

**Found while checking, for the owner** (words, not design): `MAINT_tasks.md` 7.4 collects them. The
Cookie Policy names Auth.js v4's cookies and describes Customize as switches; the Privacy Policy's
sub-processors leave out Supabase and Google; both published versions are labelled 2026-03-23 but take
effect on 23 February 2026; nothing deletes invitation records after the 90 days the Privacy Policy
promises. `/cookies` has two h1s: `MAINT_tasks.md` 5.23.

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

**Decided on the board (20 October 2026, owner, every recommendation).** Canvas row 22, "D2.16 Policy
update banner". The coordinator portal keeps today's banner (4.5).

- **One at a time, the cookie banner first.** When both are due, the cookie banner shows as on every
  page; the notice is in the page but hidden until a cookie choice is stored (`lib/cookie-consent`, read
  in the browser as the cookie banner does), then rises in the banner's place. They never overlap and
  never stack.
- **The cookie banner's place and panel** (4.1): desktop bottom right, 420px, 24px from the edges; a
  phone across the bottom, sitting on the tab bar, which stays put while it shows instead of hiding on
  scroll; a toast rises 12px above it (the `--cookie-banner` measure, or one shared for both). Surface,
  1px line, the overlay shadow; no amber and no icon. Not modal, takes no focus, and sits first in Tab
  order after the skip link, in the cookie banner's slot (`components/site/cookie-slot.tsx`). A region
  named by its h2.
- **The words.** h2 "We’ve updated our policies". Then today's sentence with the documents as its
  links: "Our Terms of Service and Privacy Policy have been updated. Please review and accept to
  continue using IB Match." With one document: "Our Terms of Service has been updated." or "Our Privacy
  Policy has been updated.", then the same second sentence. Each link is named after its page's title,
  opens it in a new tab as today, with the external-link icon and "(opens in a new tab)". No version
  in the links and no icons before them; the admin's change notes are not shown.
- **Actions, in this order:** "I accept the updated policies" (primary; 44px on desktop, full width at
  48px on a phone), then "Remind me later" (a link-style button, under it on a phone). The close button
  goes. Remind me later hides the notice until the next full page load, as today.
- **Accepting:** "Accepting…", `aria-busy` and `aria-disabled`, no spinner; Remind me later is
  unavailable until the answer comes. On success the notice fades out, focus moves to the page's
  content if it was inside (as the cookie banner's `focusMain`), the toast says "You’ve accepted the
  updated policies.", and the page refreshes as today. `ReconsentChecker` moves inside the signed-in
  frame, where the toast provider is (AppFrame); no new read.
- **A failure, in the panel** (`role="alert"`, above the actions), with the button back and focus kept
  on it: "Your acceptance wasn’t saved. Check your connection and try again." for any error, 429
  included; on 401, "You’ve been signed out, so your acceptance wasn’t saved. Sign in again to accept.",
  "Sign in again" linking to sign-in with a return to the page.
- **Where it shows:** every signed-in student page, except while a page shows the steps' footer
  (`data-step-footer`: first run and the Academic editing screens), where it waits for the next page.
  Not on Explore and program pages, which have no notice today: it would read the database on every
  program view.
- **The cookie banner waits there too** (owner, 20 October 2026; a change to D4.1, found drawing
  D2.16). Today it covers the steps' footer: on a phone the whole footer, on desktop its right end,
  where Continue or Save changes is, because both are fixed to the bottom and nothing orders them.
  While a page shows `data-step-footer`, the cookie banner (`components/site/CookieBanner.tsx`) is not
  shown; it appears on the next page without the footer, half a second after it shows, as on any
  page. A choice made on Home before sign-in means it never shows there. New design only; today's
  `CookieConsentBanner` is unchanged.
- **Motion:** the cookie banner's. It rises 8px and fades in over 240ms, fades out in 180ms; reduced
  motion keeps only the fades. After a cookie choice the banner fades out, then the notice rises. Fixed,
  so CLS stays 0.

**Built 20 October 2026 (build 20).** Every state on "D2.16 Policy update banner" compared with the
build in the preview, on a production build, at 1440px and 390px, light, dark and forced colours.
What the build settled:

- **The check moved, not the component.** The student layout's new-design branch calls
  `checkConsentStatus` itself (the same three reads `ReconsentChecker` made) and passes
  `policyUpdate` through `SignedInChrome` to `AppFrame`, which lazy-loads
  `components/site/PolicyNotice.tsx` inside its toast provider only when there is one: the other
  students download nothing. `ReconsentChecker` stays for today's design and the coordinator portal.
  `/programs` passes nothing, so no notice there.
- **One panel for both.** `components/site/bottom-panel.tsx` holds what the cookie banner had: the
  place, the entrance and exit, the slot after the skip link, `focusMain`, and the measure for the
  toast, now `--bottom-panel` on `[data-bottom-panel]` (`app/globals.css`), and
  `useStepFooterShown`, which both use to wait while `[data-step-footer]` is in the page.
- **The cookie choice is announced by the new banner** (`lib/cookie-choice.ts`), not by
  `lib/cookie-consent.ts`, which today's banner imports: putting it there added 68 B to every page
  in today's design. The notice reads a stored choice, or the cookie where localStorage is blocked.
- **Accepting keeps the brand fill** with "Accepting…", as D2.1's `Button` does everywhere; the board
  drew it greyed. In forced colours, Remind me later is drawn as a button, as the cookie banner's
  Customize is.

### 4.7 — The emails

**Outcome:** The seven emails IB Match sends through Resend look and read like the new design, and
switch to it on release day with the rest of the site. Today only their header and brand colour
switch (1.3). Added 19 October 2026 (owner).

**Design gate:** D4.18, approved ([Step 2](#step-2--design-first)).

**What they are today** (19 October 2026):

| Email | Template | Sent from | To | Subject |
|---|---|---|---|---|
| Sign-in link | `emails/magic-link.tsx` | `lib/auth/config.ts` | Students | "Sign in to IB Match" |
| Coordinator sign-in link | `emails/coordinator-magic-link.tsx` | `lib/auth/config.ts` | Coordinators and admins | "Sign in to IB Match" |
| Student invitation | `emails/student-invite.tsx` | `app/api/coordinator/students/invite/route.ts`, and `invite/resend/route.ts` for the reminder | Students, with or without an account | "You're invited to join {school} on IB Match", "{school} wants to connect with your IB Match account", "Reminder: …" |
| Coordinator invitation | `emails/coordinator-invite.tsx` | `app/api/coordinator/team/invite/route.ts`, `app/api/admin/invite/route.ts` and its `resend/route.ts` | Coordinators | "You're invited to join {school} on IB Match", "Reminder: …" |
| Support ticket received | `emails/ticket-created.tsx` | `lib/email/support-tickets.ts`, from `app/api/support/tickets/route.ts` | Whoever sent Contact or the coordinator support form | "Support Ticket {number} - We've Received Your Request" |
| Support ticket resolved | `emails/ticket-resolved.tsx` | `lib/email/support-tickets.ts`, from `app/api/admin/support/[id]/route.ts` | The same | "Support Ticket {number} - Your Request Has Been Resolved" |
| Account deleted | `emails/account-deleted.tsx` | `lib/email/account-emails.ts`, from `app/api/admin/students/[id]/route.ts`, and from `app/api/students/account/delete/route.ts` once `MAINT_tasks.md` 5.24 is done | A student an admin deletes, or who deletes their own account in Settings (5.24) | "Your IB Match Account Has Been Deleted" |

Each template carries its own copy of the same styles: the system font stack, a #F5F5F7 page, a
white 560px card, title-case headings at 28px bold, grey text, a centred button, and a footer with
"© {year} IB Match. All rights reserved." and "Terms And Conditions · Privacy Policy". None has
dark-mode styles, so each mail app darkens them its own way. Only the two sign-in emails send a
plain-text body, written by hand in `lib/auth/config.ts`. Each renders 5–7 KB of HTML.

**Must-haves:**

- **One layout for all seven,** in `components/email/` beside `EmailHeader`: the page, the card, the
  heading, text, the button, a details panel (a ticket's number, category and subject, the admin's
  reply) and the footer. Each template keeps only its words. Colours are D1.1's tokens written as hex,
  since mail apps don't read CSS variables.
- **Readable in dark mail apps.** Gmail, Outlook and Apple Mail darken an email partly or fully: text
  never sits on an image, the mark keeps its square (1.3), and the button and links keep WCAG AA in
  each. They carry dark colours of their own (`prefers-color-scheme`, which Apple Mail reads and Gmail
  ignores), decided on D4.18 (below).
- **Words in the content style** (D4.14): sentence case in subjects, headings and buttons, no
  exclamation marks, today's meaning. The button says what it does, as the sign-in card does, and
  the sign-in link's lifetime still comes from `lib/auth/sign-in-link.ts`. Subjects are set in the
  senders, so they switch with the same flag. The footer names its links after the pages' titles
  ("Terms of Service", "Privacy Policy"); the legal words themselves are `MAINT_tasks.md` 7.4.
- **A plain-text body for every email,** from the same words, for mail apps that show text and for
  spam filters. The sign-in emails' hand-written ones move into the templates.
- **Accessible:** `lang="en"`, one heading, the button a real link with its words, `alt=""` on the
  mark beside the name, text at least 14px, and the link's address written out where an image-off
  or plain-text reader needs it.
- **Switches with `NEW_UI_FOR_EVERYONE` alone,** through `emailBrand()` (`lib/brand/email.ts`), as 1.3
  does: emails reach students, so never through the owner's preview. Until release, all seven render
  byte for byte as on `main`, subject and plain text included, and a Vitest test checks each one.
- **No new reads,** but one: the senders keep their queries, and the mark stays a file in
  `public/brand/`, served by Vercel, never by Supabase. The one is the reminder's, decided on D4.18: the
  user by the invitation's address, one row by a unique key, only when someone presses Resend.
- Well under Gmail's 102 KB, past which it clips a message.

**Checks:**

- Every email in both designs in React Email's preview (`npm run email:dev`, and
  `NEW_UI_FOR_EVERYONE=true npm run email:dev` for the new one), with screenshots beside D4.18.
- One real send of each to the owner's own inboxes, with a live key and the owner's go-ahead: Gmail
  on the web and on a phone, Outlook, and Apple Mail on iOS, light and dark. Only a real send shows
  how each app darkens them.

**Decided on the boards (20 October 2026, owner, every recommendation).** Canvas row 23: "D4.18
Emails" (the decisions, the layout's spec, the sign-in email in each mail app, the inbox, then the sign-in
and invitation emails), "D4.18 Emails · support and account" (the ticket and account emails, and the
change to D4.11) and "D4.18 Emails · phone". The words on the boards are the words to build, subjects,
previews and plain text included.

- **Dark colours of their own.** Each email declares `<meta name="color-scheme" content="light dark">`
  and `<meta name="supported-color-schemes" content="light dark">`, and a `prefers-color-scheme: dark`
  block in its head swaps D1.1's dark tokens in by class (`!important`, since the light ones are inline):
  paper #0E1014, card #161920 with a #2A2F3A edge, panel #1D2129, text #F1F0EB / #BBBFC9 / #9095A2, the
  button #8E9BFF with #0B0E2B text, links #8E9BFF. Apple Mail and Outlook for Mac use them. Gmail and
  Outlook.com ignore them and invert the light version, which is drawn to hold up both ways: the button
  is a solid colour with its label in text, links are underlined, and the mark keeps its square.
- **The layout,** in `components/email/`, as the spec table on "D4.18 Emails" (section 1): the paper
  around a centred 560px column, 24px above and 20px at the sides (12px on a phone); the card #FFFFFF
  with a 1px #E3E1D9 edge, 16px corners and 40px inside (24px on a phone; classic Outlook draws it
  square); the header as built (1.3); an optional line above the heading, 14/20 600 #464B57 ("IB
  coordinator portal", "School invitation", "Reminder · school invitation"); the one h1, 26/32 600, which
  wraps a 56-character school, never cuts it; text 16/26 #464B57; small print 14/22 #686D79; the button
  #2B3FD6 with white 16/24 600, 12px × 24px, 10px corners, left-aligned; the details panel #EFEEE8, 12px
  corners, 20px × 24px, a 16px title and 15px rows or list; the footer under the card on the paper, 14/22
  #686D79: "IB Match connects IB students with university programs worldwide.", "Terms of Service ·
  Privacy Policy" and "© {year} IB Match. All rights reserved." Nothing under 14px.
- **No "Hello," line,** in any email: the heading opens it. `userName` goes unused.
- **The link written out** under the button in the sign-in and invitation emails: "Button not working?
  Paste this link into your browser:", then the address, `word-break: break-all`.
- **The words, email by email** (each board shows them whole):
  - Sign-in: subject "Sign in to IB Match"; h1 "Sign in to IB Match"; "Use this link to sign in. It works
    for 10 minutes, and only once. If it’s your first time, we’ll create your account."; button "Sign in
    to IB Match"; "If you didn’t ask for this link, you can ignore this email. Nobody can sign in without
    it." The coordinator's adds "IB coordinator portal" above its h1, "to the coordinator portal" in its
    sentence, and the button "Sign in to the coordinator portal". The time comes from
    `lib/auth/sign-in-link.ts`.
  - Student invitation, a new account: "School invitation" above "Join {school} on IB Match"; "Your
    coordinator at {school} has invited you to create an IB Match account linked to their school."
    (with a name: "{name}, your IB coordinator at {school}, has invited you…"); the panel "What
    coordinators can access" with D4.16's list and "You can unlink at any time in Settings."; button
    "Open the invitation"; "Don’t want to link your account? Create a regular account instead"; "The
    invitation expires in 7 days. If you didn’t expect it, you can ignore this email."
  - Student invitation, an existing account: subject "{school} wants to connect with your IB Match
    account"; h1 "Connect with {school}"; the link to `/student/invitations`; no "Create a regular
    account instead"; "You’ll sign in first if you aren’t signed in." before the expiry line.
  - The reminder: "Reminder · school invitation" above the heading, subject "Reminder: you’re invited
    to join {school} on IB Match", and "This is a new link: the one in the first email no longer works."
    **It picks its version:** the resend route reads the user by the invitation's address (one row, by a
    unique key, only when a coordinator presses Resend) and sends the existing account's email and link
    when there is one. The coordinator's reminder works the same way, with its own words.
  - Coordinator invitation: "IB coordinator portal" above "Join {school} on IB Match"; "You’ve been
    invited to join {school} as an IB coordinator on IB Match." (with a name: "{name} has invited you
    to join…", fixing today's "You have been invited you"); the second paragraph in sentence case;
    "Open the invitation"; the expiry line.
  - Ticket received: subject "Support ticket {number}: we’ve received your request"; h1 "We’ve received
    your request"; the panel "Ticket {number}" with Category and Subject rows, the category in Contact's
    labels ("Matching question", "Data & privacy", "General inquiry"…). Resolved: subject "Support ticket
    {number}: your request is resolved"; h1 "Your request is resolved"; the ticket panel, then "Our
    reply" in a second panel, its line breaks kept (`pre-wrap`) and never cut; "If this doesn’t fully
    answer your question, send us a new request from Contact."
  - Account deleted: subject "Your IB Match account has been deleted"; h1 "Your account is deleted"; "An
    IB Match administrator has deleted your account." or, from Settings, 5.24's "This email confirms that
    you deleted your IB Match account in Settings."; the panel "What was deleted" (your account and how
    you signed in; your subjects and grades; your interests, countries and shortlist; your support
    tickets; your link to your school, and any school invitations sent to you, true once
    `MAINT_tasks.md` 5.25 is done); then "If you think this was a mistake…" or "If you didn’t do this,
    contact us straight away at support@ibmatch.com."; "You can make a new account with the same email
    any time."
- **A preview line for each,** as drawn in the inbox section, through `<Preview>`.
- **D4.11's page after deleting** adds "We’re also emailing you a confirmation." after what was deleted,
  in the new design only.

**"Account deleted" from Settings** (owner, 19 October 2026): today only an admin's deletion sends it.
`MAINT_tasks.md` 5.24 sends it when a student deletes their own account, with words for that case.
This task designs both versions, and does 5.24 for both designs if it is still open.

**Done 20 October 2026.** `components/email/`: `EmailLayout` draws an `EmailContent` (`content.ts`, the
words as data) and `toPlainText` writes the plain text from the same object, so the two can't drift;
`tokens.ts` holds the colours, the dark block and the phone padding, and `tokens.test.ts` measures every
pair at 4.5:1 in both. Each template in `emails/` now exports a message builder (`signInMessage`,
`studentInviteMessage`, …) that returns the subject, the React and the text, in today's design or the
new one through `emailBrand()`; the senders spread it into Resend's call. Today's templates moved to
`components/email/legacy/` and go at cleanup (R.2). `lib/email/emails.test.tsx` renders all twelve
versions in today's design and compares them byte for byte, subject and plain text included, with
fixtures rendered from `main` before the move (`lib/email/__fixtures__/legacy/`); the one intended
difference is the list line 5.25 adds to "Account deleted". In the new design it checks each email's
words, subject and inbox line against the boards, one h1, `lang`, the dark metas, nothing under 14px,
and the size: 7–9 KB each.

Choices the boards left open, made in the build:
- **The reminder's read happens only in the new design,** so today's reminder stays as on `main`
  until release day, including its new-account link to an existing account.
- **A reminder to an existing account** drops "This is a new link…": its link is School invitations,
  which a new token doesn't change. Its subject is "Reminder: {school} wants to connect with your IB
  Match account", its inbox line the existing account's.
- **The coordinator's reminder** reads "Reminder · IB coordinator portal" above the heading. Coordinator
  invitations only go to addresses without an account, so it needs no read.
- **With a coordinator's name,** an existing account reads "{name}, your IB coordinator at {school}, has
  invited you to link your IB Match account to their school."
- `lib/email/client.ts` no longer builds the client when it loads (5.24), so the five invite routes call
  `getResendClient()`.

Not checked here: React Email's preview, since `npm run email:dev` asks to install
`@react-email/preview-server`, which the project doesn't have; the screenshots come from the same
`render()` Resend uses, in Chrome. The real sends to the owner's inboxes are still to do.

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

**When:** session 19, before release day. Built behind the preview switch, like every session before
release. **Unlocked 20 October 2026 (owner),** ahead of the program card review (5.1): the card's tap
rule is the same for A, B or C, so if 5.1 later changes the card, the new card keeps this rule.

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
  - the list-to-program view transition in D1.3: build it, or drop it from the system;
  - decorative motion, which the seasonal themes follow (6.1): none at all, or one
    entrance on Home's hero, transform and opacity, under 5 seconds and never repeating, and none
    with reduced motion. Nothing here is built for them in 5.2.
- **Keep the Definition of done:** only transform and opacity, no infinite animations, a fade with
  reduced motion, and no more JavaScript than the rules need.
- **The build:** apply the approved rules to every component in one pull request, through shared
  classes or tokens rather than each component's own, so later work follows them by default.
  Screenshots beside the board, as in every build.

**Decided on the board (20 October 2026, owner, every recommendation).** Canvas row 24, "D1.6 Motion
and feedback". The board's table "Every built screen today, and what changes" lists each component
with Keep or Change; the build changes every row marked Change, and no other.

- **The whole card or row is the link** on Matches (`MatchCard`), Explore (`ResultRow`) and
  Shortlist's rows. The name's `<Link>` stays the only link and is stretched over the card in CSS
  (an `::after` covering it); Save, "Why this match" and the opened panel sit above it with their own
  targets. Tab order and the accessible name don't change. Desktop hover: the card takes the link
  cards' edge and shadow from D2.8, a row a muted tint, and the name underlines. Focus stays on the
  name.
- **Press, on everything tappable, 120ms:** 96% for targets under 64px wide (the tab bar's pill), 98%
  for controls (buttons, chips, Save, segmented buttons, menu buttons, toast actions), 99% for cards
  and rows (match cards, Explore and Shortlist rows, link cards, checkbox rows and tiles, Contact's
  and the invitation's choice rows), each with its one-step-darker fill. Text links turn brand-ink and
  underline, with no shrink. `-webkit-tap-highlight-color: transparent` in the new design. Check
  `:active` on a real iPhone.
- **Opening a page holds the pressed look** until the next page arrives, on cards, rows, names, the
  tab bar and the nav, through Next.js' `useLinkStatus` (read
  `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-link-status.md` first) in a
  small client component inside each link. It must not shift the layout. No spinner, no progress bar,
  no `loading.tsx`. This is the only new JavaScript, a few hundred bytes.
- **Small overlays** (the account menu, Menu's panel, the filter menus, "Choose programs", Save and
  exit's question, and their scrims): fade in and drop 4px, 180ms; fade out, 120ms, with
  `@starting-style` and `transition-behavior: allow-discrete` for the popovers. A browser without them
  shows and hides them at once. **Large overlays, the sheet, the toast and the tab bar** keep what they
  do.
- **Inline disclosures** ("Why this match", "How the fit is worked out", Read more, the guides' and
  Explore's questions, requirement groups): the content fades in over 180ms and the chevron turns in
  180ms; nothing slides open; closing is instant.
- **Reduced motion:** one rule for the new design, in place of today's global `0.01ms` and the six
  components' overrides: no scale, translate or rotate transitions; opacity and colour transitions keep
  their times. Presses keep their fill.
- **Explore:** while a filter change loads, after 300ms, the count reads "Updating…"; the rows stay at
  full strength.
- **The theme switch** changes every colour at once: transitions are off for the frame it applies.
- **Loading** stays still skeletons, and content replaces them without a fade. Jumps to a section
  stay instant.
- **No view transitions:** the list-to-program morph and the tab switches leave the system (D1.3,
  `04-design-system.md` §3).
- **Decorative motion, for 6.1 only:** one entrance on Home's hero, a fade and an 8px rise over
  480ms, once per page load, and none with reduced motion. Nothing is built for it here.
- **Budget:** CSS under 1 KB more, gzipped; JS only the link-status component. Today's unused motion
  tokens (`--duration-*`, `--ease-spring`, `.hover-lift`, the shimmer keyframes) belong to today's
  design and go at R.2.

**Built (20 October 2026, session 19).** One pull request, every row the board marks Change:
- **Shared classes** in `app/globals.css`, under "Motion and feedback": `press` (98%), `press-sm`
  (96%) and `press-lg` (99%), each with the component's own darker fill through the `pressed:`
  variant (a press, or a link whose page is loading); `link-pressed:` and `link-hover:` for a card
  or row whose name's link (`data-stretched-link`) covers it; `overlay-sm` for menus, popovers,
  the account and Menu panels, Save and exit's question and the scrims; `disclose` for an inline
  disclosure's 180ms fade. Each component uses them instead of its own transition and scale.
- **Reduced motion:** one rule for the new design limits every transition to opacity and colour,
  so the six components' overrides went; today's design keeps its global `0.01ms` rule.
- **The held press** is `components/ds/LinkPending.tsx`, inside the links of client components
  only: Matches cards, Explore and Shortlist rows, the compare table's names, "Open the program
  page", the tab bar, and every `CurrentLink` (the nav, Menu, the account panel, the footer). A
  server page that imports it would add it to that page's download in today's design too (measured:
  +86 B gzipped on Home, +65 B on a guide), so `ButtonLink`, `CardLink` and
  the university page's program names press but don't hold yet. R.2 adds it to them.
- **Not on the board's table, left as built:** the "Missing a requirement" bar on Matches, whose
  chevron still turns in 240ms and whose cards appear without a fade; the "On this page"
  disclosures on the guides and legal pages; the Menu and account panels' rows, which change
  fill without shrinking. Each is a one-line change if the owner wants the rule on them.

---

## Release

### R.1 — Release day

**Outcome:** Everyone sees the new design, in one deploy.

**Steps:**
1. The final logo is Lens (confirmed 21 October 2026, owner); its clearance search must be back.
2. Confirm the owner has the Search Console baseline (owner decisions).
3. Merge every open pull request labelled `go-live`, updated with `main` and each with its own
   checklist done. So far: #127, three FAQ answers in the new design's words (D4.14). They change
   words both designs share, so they merge on this day and no earlier.
4. Set `NEW_UI_FOR_EVERYONE=true` in Vercel's **Production** environment, then redeploy. The redeploy
   rebuilds the static pages in the new design, and the emails switch too (1.3, 4.7), as does the bare page for a
   failed root layout (`app/global-error.tsx` reads the flag at build time). `npm run build` now
   lists `/privacy`, `/terms` and `/cookies` as Static, with a one-hour revalidate (4.3).
5. Check every page logged out and logged in, light and dark, on a phone and on Windows.
   Open `/admin/seasonal-themes` (6.1): a season scheduled across release day shows to everyone from
   this redeploy, so check its slots with the rest, or switch it off.
6. Run the home page, one guide and one program page through Google's Rich Results Test: the same
   items as before release, plus the breadcrumbs.

**Rollback:** set the variable to `false` and redeploy. Every page goes back, static or not. Revert the
`go-live` pull requests too.

### R.2 — Cleanup

**Outcome:** One design in the code.

**Steps:** after about two stable weeks, once Search Console shows no fall in indexed pages or clicks
against the baseline:
- delete the old screens and components (`ProgramCard`, the replaced parts of `components/ui/`, the
  onboarding components, `StudentHeader`, `MobileBottomNav`, the old country pages: the 23
  `<Country>Content.tsx` files and the test in `lib/guides/guides.test.ts` that compares them with
  each `guide.ts`, keeping its checks of the data);
- delete the switch, the preview routes and bar, both variables and the old logo files, and
  `NEW_UI_RELEASED` in `next.config.ts` (4.3);
- from 4.3: `NoAISection.tsx` and `Geist_Mono` in `app/layout.tsx`; the unused `AuthErrorBoundary`;
  the `throw` that sends today's errors to Next's own page (`components/site/root-error.tsx`,
  `layout-error.tsx`, `components/sign-in/auth-error.tsx`); the old branch of `signInDestination`;
  the islands modules, once the pages import their cards; and `TODAYS_DESIGN` in
  `eslint/raw-palette.mjs`, with the files it lists;
- from 4.7, today's emails (added 20 October 2026, owner):
  - the seven old templates in `components/email/legacy/`;
  - in each builder in `emails/`, the `if (!emailBrand().newUi)` branch with its old subject and,
    in the two sign-in builders, the old hand-written plain text;
  - `emailBrand()` (`lib/brand/email.ts` and its test): the builders and `EmailHeader` read `brand`
    straight from `lib/brand/config.ts`; `EmailHeader` loses its centred 60px logo, and
    `legacyBrand.emailLogo` and `public/logo-email.png` go with the old logo files;
  - in the student reminder (`app/api/coordinator/students/invite/resend/route.ts`), the
    `emailBrand().newUi &&` before its read: the read stays, for every reminder;
  - `userName` on the ticket and "Account deleted" builders and their senders: only today's
    "Hello {name}," uses it. The "Account deleted" builder keeps `deletedBy`, since both versions
    stay;
  - in the tests: `lib/email/__fixtures__/legacy/` and its line in `.prettierignore`, the "until
    release day" block of `lib/email/emails.test.tsx`, the today's-design cases in
    `lib/auth/sign-in-link.test.ts` and the resend route's test, and every `NEW_UI_FOR_EVERYONE`
    stub left in them. The new design's checks stay, without the stub;
  - the "today's design" words in `components/email/message.tsx` and the `emails/` headers;
- from 5.2: put `LinkPending` in `ButtonLink`, `CardLink` and the university page's program names,
  so they hold their press too; delete today's reduced-motion rule in `app/globals.css` (the
  `:root:not([data-ui='next'])` block) and today's motion tokens (`--duration-*`, `--ease-out`,
  `--ease-in-out`, `--ease-spring`, `.hover-lift`, `.hover-scale`, the shimmer), once nothing uses them;
- move the scoped tokens to `:root`, and turn on Newsreader's preload (1.1);
- re-run the full verification and the budget check. **CSS must be back to 32 KB or less**
  (gzipped, every stylesheet `/` loads): the 36 KB allowed while both designs shipped ends here
  (Definition of done 8). If it is still over, find what kept it there before R.2 is done.

---

## Phase 6 — Seasonal themes

### 6.1 — Seasonal themes: the slots, the schedule and the first season

**Outcome:** For a few days around a holiday, four fixed places in the design wear that holiday's
decoration. An admin page turns each season on or off and sets its dates, with no code change and no
deploy. Outside a season every page renders as before. Added 20 October 2026 (owner).

**Why it is this small** (research, 20 October 2026). The students are making a decision that
matters, often under deadline, so decoration stays where people arrive and browse, and away from where
they work or are asked to trust the site. A falling-snow layer was considered and left out: it is an
infinite animation (Definition of done 5), WCAG 2.2.2 (Pause, Stop, Hide) would then require a pause
control, it drains phone batteries, and it sits over the content.

**When:** before release day (R.1), behind the preview switch, so the owner tests it in the preview
first (owner, 21 October 2026; first planned for after release). It touches only the new design's
files and the admin area, so it never delays release: if it is not merged by then, release goes ahead
without it. Until release only the preview shows a season; from release day, whatever is scheduled
shows to everyone. The first season is winter (owner, 21 October 2026), if this is merged by
1 December 2026. Otherwise Lunar New Year goes first.

**Design gate:** D1.7, approved ([Step 2](#step-2--design-first)), and D1.6's rule for decorative motion.

**Must-haves:**

- **Four slots, and nowhere else:**
  - beside the mark in the header, public and signed in, desktop and phone. The mark and the name never
    change, since the mark still waits on its clearance search (R.1);
  - Home's hero, hanging from the lime bar under "match" (`app/NewHomePage.tsx`); the word gets a span
    of its own, with no visible change;
  - the lime band that ends Home and every guide (`components/home/LimeBand.tsx`), and only those: For
    schools, How it works, the requirements hub and Support us keep a plain band;
  - the 404 (`components/site/NotFoundPage.tsx`).

  Each slot is an empty `aria-hidden` element placed absolutely inside a box that already exists, so
  it never moves the layout (CLS stays 0) and never takes a tap (`pointer-events: none`). It never
  covers text or a control, at 320px, 390px or 1440px.
- **The header's accessory stays off the quiet pages:** sign-in, the invitations, Academic, Settings,
  the legal pages and the error page carry a mark, as first run does for focus mode, and the slot
  hides there. First run's focus header has no slot.
- **Never touched:** match cards, Explore and Shortlist rows, status badges and requirement chips
  (their colours carry meaning), forms, first run and its focus mode, the subject editor, Academic,
  Settings, sign-in and invitations (a sign-in page that suddenly looks different invites doubt), the
  legal pages, the cookie and policy panels, toasts, dialogs, the error page, emails, the favicon and
  the share image, the tab bar, and the coordinator and admin areas. No token changes, so the contrast
  that `app/globals.test.ts` checks stays.
- **Decoration only, no words.** No greeting, so there is nothing to translate or to word for every
  faith, and nothing for SEO parity (Definition of done 12) to explain. The art is drawn from Lucide
  icons, already a dependency (`snowflake`, `sparkles`, `moon-star`, `lamp`, `ghost` and others), and
  the design's tokens, in light and dark. It is hidden in forced colours and in print.
- **Motion** follows D1.6's rule for decorative motion: at most one entrance on Home's hero, transform
  and opacity, under 5 seconds and never repeated, and nothing with reduced motion. Everything else
  stays still.
- **The schedule is data; the art is code.**
  - A `SeasonalTheme` table, added in one migration applied with `prisma migrate deploy`. It has `key`
    (unique, naming a season built in code), `enabled`, `startsOn` and `endsOn` (dates, both inclusive)
    and `updatedAt`. There is no free text and no upload, so nothing an admin types reaches a page.
  - `/admin/seasonal-themes` uses today's admin style, since staff areas keep today's design (4.5). It
    saves through a route under `app/api/admin/`, as the other admin pages do, and only the admin role
    can use it. It lists every season built in code with its switch, its dates and a Preview link, plus
    one "All seasonal decorations off" switch for a day when decoration would be wrong. It refuses a
    window longer than 21 days, an end before the start, and two seasons that overlap.
  - Saving calls `revalidateTag('seasonal-themes', { expire: 0 })`, as
    `app/api/admin/cache/invalidate` does. Each prebuilt page then renders again on its next visit,
    with the new schedule.
- **The browser picks the season, so static pages stay static.**
  - The root layout reads the schedule through `unstable_cache`, tagged `seasonal-themes`, with no time
    limit, as `lib/reference-data.ts` does. It reads only for the new design, uses `select`, and skips
    seasons that are over.
  - It writes the schedule into a small inline head script, next to `THEME_SCRIPT`. Before first paint
    the script compares it with the visitor's local date and sets `data-season` on `<html>`.
  - A season therefore starts and ends on time in the visitor's own time zone, without any page
    rendering again. Pages render again only when the admin changes the schedule.
  - A failed read means no season. It never fails a page or the build.
  - This is the feature's one new read (Definition of done 7, raised with the owner on 20 October
    2026). It is one small query each time the cache fills, which is after a save or when the cache is
    cleared, never per visit. Redis and search are not read.
- **Nothing is downloaded outside a season.** Each season's styles are a stylesheet of their own in
  `public/seasons/`, next to its SVGs. The head script adds that stylesheet only while the season is on.
  The site's stylesheet gains only the slot rules, under 0.3 KB gzipped. No JavaScript bundle grows,
  and the head script stays under 600 bytes.
- **Preview any season on any day** with `?season={key}` on any page. Only the head script reads it, in
  the browser, so pages stay static. It works before a season is scheduled, and in design QA.
- Vitest covers the helper that picks the season and the admin route's checks, with `@/lib/prisma`
  mocked. Cases for the helper: an inclusive end, overlaps, the visitor's midnight, an empty or broken
  schedule, the preview parameter, and everything switched off.

**Decided on the board (D1.7, every recommendation approved 25 October 2026; canvas row 26):**

- **Seasons:** winter, Lunar New Year, Eid al-Fitr and Diwali, with the windows in 6.2. Halloween is
  left out: it falls on the eve of US Early Decision, and in 2027 Diwali (29 October) lands in its
  window.
- **Winter** is a string of small bulbs and four-point sparkles (Lucide `sparkle`; the bulbs and their
  wire are circles and a curve), in ultramarine and lime in light, lime and #8E9BFF in dark. No
  snowflake (December is summer in Australia), no tree, no gift, no religious symbol.
- **Beside the mark:** a pair of sparkles, 15px and 9px, in a 20 × 20 box inside the logo's link, 8px
  after the name, its top 9px into the 44px link. Never on the mark. Hidden from 768 to 1023px signed
  in, where the header hides the name. At 320px signed in (measured with Geist) the name ends at 121px
  and Guides' box starts at 161px, so the pair (129–149px) leaves 12px; signed out has 73px.
- **Home's hero:** five bulbs hang from the lime bar's lower edge, as wide as "match" and 0.33em deep
  (about 156 × 19 on desktop, 111 × 13 on a phone), 11px above the paragraph at every width. Never
  wider than the word, so never off the page (sparkles after the word would stick out between about
  928px and 992px). They get D1.6's one entrance: a fade and an 8px rise over 480ms on the standard
  curve, once per page load, none with reduced motion. Every other slot is still.
- **The lime band:** a string of six bulbs in the band's top padding, its right end on the content's
  edge: 220 × 40, 16px from the top, from 768px; 150 × 27, 8px from the top, below. Ultramarine and
  white bulbs on an ink wire in both themes, since the band is lime in both. 13px above the heading
  on a phone; 24px or more from the buttons on desktop.
- **The 404:** from 1280px, a 440 × 200 drawing (a longer string with sparkles under it) right of the
  words, 56px from the top, 112px clear of them at 1440px. Below 1280px, the band's small string in the
  top padding (220 × 40 from 768px, 150 × 27 below), 17px above the heading on a phone.
- **Files:** each slot has a light and a dark drawing; the season's stylesheet points at the one for
  the theme in use, following the Appearance setting, so the browser fetches only that one, and only
  in season.

**Verify:**

- `npm run build` lists the same pages as Static, with the same revalidate times.
- Without the preview, the HTML of `/`, a guide and Matches is the same as on `main`: today's design
  reads no schedule and writes no script.
- In the preview, with no season on:
  - against `main`, the HTML of `/`, a guide and Matches differs only by the head script;
  - the gzipped CSS differs only by the slot rules, and the JS does not change;
  - nothing in `public/seasons/` is downloaded.
- With `?season=` set to the first season:
  - check every slot at 320px, 390px and 1440px, in light, dark, forced colours (hidden) and reduced
    motion;
  - CLS stays 0, and nothing covers a link or a button;
  - Lighthouse reports the same LCP element as before.
- On production, through the preview link (before release, only the preview shows a season):
  1. Schedule a test window that includes today.
  2. Open Home and a guide; each shows the season by its second visit at the latest.
  3. Switch everything off and check that the season is gone.

### 6.2 — Each further season

**Outcome:** One more season that the admin can schedule every year. Each one adds a board, one
stylesheet with its SVGs, and a key in the code's list of seasons. The slots, the admin page and the
schedule stay as 6.1 built them.

**Design gate:** that season's board, "D1.7 Season · {name}", approved.

**The seasons, decided on D1.7** (owner, 25 October 2026). The list is short and balanced across
traditions. A site for IB students in many countries shows either a fair set of holidays or none,
never one faith's holidays alone. The dates were checked on 25 October 2026 and must be checked each
year: three of these seasons follow lunar calendars, so the admin enters their dates each year.

| Season | Key | Next date | Window | Notes |
|---|---|---|---|---|
| Winter holidays and New Year | `winter` | Hanukkah 4–12 December 2026, Christmas, 1 January 2027 | 14 December to 1 January (19 days) | The widest reach, so the first season, drawn on D1.7. One generic season with lights and stars and no religious symbols, and no snow, because December is summer in Australia. Hanukkah falls before the window in 2026 and inside it in 2027 |
| Lunar New Year | `lunar-new-year` | 6 February 2027 | 3 to 12 February 2027 (10 days) | Large IB communities in East and Southeast Asia. Hong Kong and Singapore have guides. First, if winter misses 1 December 2026 |
| Eid al-Fitr | `eid-al-fitr` | 9 or 10 March 2027, set by the moon sighting | 3 days from the announced date | Large IB communities in the Gulf and Türkiye |
| Diwali | `diwali` | 29 October 2027 (8 November 2026 is too soon for 6.1) | 27 to 31 October 2027 (5 days) | A large IB community in India |

**Halloween is not a season** (D1.7): it falls on the eve of US Early Decision (1 November), when
students are under the most pressure, and in 2027 its window would overlap Diwali.

**No season during the IB's May exams** (about 23 April to 19 May 2027). No season runs around results
days either (early July and early January): those days are for a message students can use, not
decoration. Eid al-Adha is not a season for that reason: in 2027 it falls inside the May exams (about
16 May).

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
| 5.17 | `MAINT_tasks.md` | University pages in the sitemap. Done 22 October 2026, before the Search Console baseline, so the baseline already counts them |
| 5.18 | `MAINT_tasks.md` | One course counted for two requirements. The chip copy needs a board; with the matching review |
| 5.26 | `MAINT_tasks.md` | The coordinator portal sent a signed-out visitor to a 404. Found on D4.17. Done 22 October 2026 |
| 5.27 | `MAINT_tasks.md` | Explore's best fit. The board D3.5 Sort · best fit approved 22 October 2026; session 25, before release day |
| 6.6 | `MAINT_tasks.md` | The `prisma-client` generator. After R.2, which deletes many of the 53 files it touches |
| 7.2 | `MAINT_tasks.md` | Country pages collapse. The content is one template since 4.2; the 23 page shells wait for R.2 |
| 7.3 | `MAINT_tasks.md` | Refresh the SEO and AI search plan. After R.1 |
| 7.4 | `MAINT_tasks.md` | Legal pages and the public pages' claims. The legal documents are drafted before release and published on release day; the public pages' wording is code (#157, #158) and merges before it |
| 8.1–8.3 | `CONTENT_tasks.md` | Fields of study (used by 3.1), campus city and image credits (used by 2.4) |
