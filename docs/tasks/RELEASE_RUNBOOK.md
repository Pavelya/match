# Release Runbook

**Written:** 31 October 2026 · **Covers:** everything from today to the old design being deleted

This is the one place to run the release from. Every step is here, in order, with who does it and what
"done" means. The other task files keep the detail; **for the order, this file wins.**

**The five end results:**

1. All before-go-live tasks done
2. Live with the new UI
3. All new legal pages published
4. Notices sent to the silent accounts
5. Old code removed, about two weeks after release

SEO and marketing come after these: [Stage 6](#stage-6--seo-and-marketing) says when.

---

## How to use this

**Paste this into a new session, every time:**

```
Next step in the release runbook.
```

The session reads this file, finds the step marked **Next**, and either does it or tells you exactly what
to do. To see where things stand, paste `Where are we in the release?`

**Instructions for a session:**

- Do one step, or one group of your steps, and stop. One step, one branch off `origin/main`, one pull request.
- A step marked **You** is the owner's: say what to do, and don't do it yourself.
- In the same pull request, set the finished step's Status to `Done, <date> (#PR)`, set the next step to
  **Next**, and update [Where we are](#where-we-are). Then move on to any step the owner says they have finished.
- A step that finishes a task in `MAINT_tasks.md` or `REBRANDING_tasks.md` also updates that file, as its
  own rules say.
- A new finding becomes a new row here, in the right place, not a note.
- Keep `MAINT_tasks.md`'s "Standing context" rules: production safety and cost apply to every step.

**Your own steps.** `main` takes no direct pushes, so don't tick boxes by hand. Do the step, then tell the
next session: "steps 3 and 4 are done". It records them.

**Status words:** **Next** is where you are. Open is not started. Waiting is with someone outside.
`Done, <date> (#PR)` is finished.

---

## Where we are

| Stage | End result | Steps | Status |
|---|---|---|---|
| 1 Before go-live | 1 | 1–21 | **Now** |
| 2 Go or no-go | 1 | 22–23 | Open |
| 3 Release day | 2 and 3 | 24–34 | Open |
| 4 Silent accounts | 4 | 35–38 | Open |
| 5 Watch, then cleanup | 5 | 39–49 | Open |
| 6 SEO and marketing | | 50–54 | Open |

**Stage 1 has three lists that run side by side:** your outside requests (steps 1–4), the sessions (5–9) and your
settings (10–19). Each open list has its own **Next**. Steps 1–3 are done, and step 4 can wait. Step 20 needs your
decisions on the legal review, and step 21 follows it.

### Dates

R is release day. It moves if the lawyer or the clearance search runs late, and everything else moves with it.
Step 22 fixes the real dates. **Aim to release by 1 December**, so that R+16 falls before Christmas traffic
dips and the Search Console comparison means something.

| When | What | Target | Real date |
|---|---|---|---|
| Now | Steps 1–4 sent | Monday 2 November 2026 | |
| R | Release day. A Tuesday or Wednesday, with the rest of the day free | Tuesday 17 November | |
| R+1, R+2 | Silent-account notices | 18 and 19 November | |
| R+1 to R+3 | Legal task C | By 20 November | |
| R+16 | Search Console check, then cleanup | Thursday 3 December | |
| Each notice + 30 days | Delete accounts that didn't come back | From 18 and 19 December | |

### Numbers to record

The repository is public, so totals only.

| What | Baseline, before release | R+16 |
|---|---|---|
| Indexed pages | 220| |
| Search clicks, last 3 months |125 | |
| Top pages | https://www.ibmatch.com/, https://www.ibmatch.com/study-in-portugal-with-ib-diploma, https://www.ibmatch.com/study-in-austria-with-ib-diploma, https://www.ibmatch.com/study-in-spain-with-ib-diploma, https://www.ibmatch.com/study-in-italy-with-ib-diploma| |
| Rich Results items: Home, one guide, one program | | |
| Upstash bandwidth and commands | | |
| Supabase egress | | |

**On 31 October 2026:** 203 students, 70 silent, 0 notified, 32 active in the last 30 days. Published Terms and
Privacy are labelled 2026-03-23, and no Cookie Policy is published in the admin. No season is scheduled. Algolia
3,323 of 10,000 this month.

---

## Rules while this runs

- **From the baseline until step 41: no changes to titles, URLs, robots rules or structured data**, except step 5.
  Otherwise a fall in Search Console has no clear cause.
- **From step 21 to R: only what is in this file merges.** Merging `main` deploys.
- **From R to step 41: fixes only.** No new features, and no dependency upgrades except security ones.
- **Stop lines:** if a service crosses its line in `MAINT_tasks.md` ("The free-tier guard"), finish the pull
  request in hand, start nothing new, and find the cause.
- **The repository is public.** Fix a problem first, in neutral words; write it up once it is deployed.

---

## Stage 1 — Before go-live

### You: start on Monday 2 November

| Step | Status | Who | What to do | Done when |
|---|---|---|---|---|
| 1 | Done, 31 October 2026 (owner) | You | **Send the lawyer `docs/legal-review/` as it is now**, starting with `lawyer-brief.md`. There are seven `[LAWYER]` notes and thirteen questions. A copy from before 30 October is out of date. Ask how long it will take | The answers are back |
| 2 | Done, 31 October 2026 (owner) | You | **Commission the Lens clearance search:** EUIPO and USPTO, figurative marks, Nice classes 41 and 42. Ask how long it will take | The result is back and clear |
| 3 | Done, 31 October 2026 (owner) | You | **Confirm Search Console covers `www.ibmatch.com`.** The live site and the code have no verification tag, so it is either verified through DNS or not set up. Then fill in the first three rows of [Numbers to record](#numbers-to-record) | The numbers are noted |
| 4 | Later, the owner's choice (31 October 2026): not a gate | You | **Install Node 24 LTS on the laptop.** It is on 22.12.0. `node -v` should print 24, and `npm ci` should give no `EBADENGINE` | `node -v` prints 24 |

### Sessions, in this order

| Step | Status | Who | Paste this | What it does |
|---|---|---|---|---|
| 5 | Done, 31 October 2026 (#236) | Session | `Do MAINT 5.47.` | Takes "match probability" off Explore's questions and every program page's description. First, because it changes every program page, so it settles well before release |
| 6 | Done, 31 October 2026 (#237) | Session | `Do MAINT 5.46.` | Clears the cached list before a save answers |
| 7 | Done, 31 October 2026 (#238) | Session | `Bring npm audit back to 0, as in MAINT 6.9.` | 23 → 0, with three overrides and no exceptions (MAINT 6.12). One tag leaves every email's `<head>`; nothing else moves. Lint crashes if a later session turns on a rule that calls `minimatch` directly: 6.12 says which and what to do |
| 8 | Done, 1 November 2026 (#127) | Session | `Refresh #127 for release day.` | The conflict in `lib/page-dates.ts` is solved, and "How many programs will I be matched with?" has the fourth status: "…the programs whose requirements you meet, those within reach, those with no set grades, and those missing a requirement." You approved the words on 1 November. **It stays unmerged, and a draft, until step 24** |
| 9 | **Next**, your look. Sent to your Gmail only, 1 November 2026 (#240) | You | Look at each in Gmail on the web and on a phone, light and dark. For Outlook and Apple Mail on iOS, add that mailbox to those apps, or ask a session for another run with other addresses: `npx tsx scripts/send-sample-emails.ts --send <addresses>`, with the live key in `.env` | The real send build 22 still owed, plus the inactivity notice: eight emails in the new design, with sample data, no production read, to addresses given in the session and never committed. Resend accepted all eight; its key is send-only, so delivery shows only in the inbox and the dashboard. The sample sign-in and invitation links carry made-up tokens, so they don't work. Each run counts towards Resend's 100 a day, and the script refuses more than 50 |

### You: settings, any order

Do these before R. Some may be done already: they were not checked on 31 October, because the dashboards can't
be read from here.

| Step | Status | Who | What to do | Details |
|---|---|---|---|---|
| 10 | **Next** | You | **Choose the program card.** Look at Matches, Explore and Shortlist on a real phone through the preview link. A closes the task. B or C adds a build session before step 21. Undecided by step 21 means A | `REBRANDING_tasks.md` 5.1 |
| 11 | Open | You | **Vercel:** the rate-limit rule on `/api/` (Log first) and usage alerts | `SEC_tasks.md` SEC-7 |
| 12 | Open | You | **Vercel:** delete `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` | `MAINT_tasks.md` 5.37, `SEC_tasks.md` SEC-8 |
| 13 | Open | You, then a session | **Supabase:** export the Security Advisor's list for a session to answer, turn off Auth sign-ups, check for a publishable key, upload one image in the admin | `MAINT_tasks.md` 5.37 |
| 14 | Open | You | **Supabase:** the image bucket's allowed types and 2 MB limit | `SEC_tasks.md` SEC-8 |
| 15 | Open | You | **GitHub:** Settings → Code security, then run "Dependency audit" once | `SEC_tasks.md` SEC-9 |
| 16 | Open | You | **GoDaddy:** 2-step verification on the admin mailbox | `SEC_tasks.md` SEC-10 |
| 17 | Open | You | **Ko-fi:** edit the page to match the public pages' new words | `docs/legal-review/claims.md` |
| 18 | Open | You, then a session | **Approve deleting 5.25's two old invitations**, after a Supabase backup. Then `Do MAINT 5.25 step 6.` | `MAINT_tasks.md` 5.25 |
| 19 | Open | You | **Usage:** note Upstash and Supabase in [Numbers to record](#numbers-to-record), and check them against the stop lines | `MAINT_tasks.md`, "The free-tier guard" |

### When the lawyer's answers are back

| Step | Status | Who | Paste this | What it does |
|---|---|---|---|---|
| 20 | **Next**, after your decisions | You, then a session | `Apply the lawyer's answers to the legal drafts.` | **You first:** the review of 31 October 2026 is in `../match-private/legal-review-2026-10-31/`, beside the repository on the laptop, and stays out of git. Decide which of its actions, LR-01 to LR-18 in `operational-actions.md`, come before publishing, and whether any of it changes steps 30 and 36–38. **Then the session** updates each `.proposed.md` and its redline, until no `[OWNER` or `[LAWYER` note is left in them (the check is in `docs/legal-review/README.md`, "How to publish"). **Section 8 must stay "8. Data retention"**: the inactivity notice links to `/privacy#8-data-retention`. If the number changes, the email changes in the same pull request |
| 21 | Open | Session, then you | `Run the release dress rehearsal.` | See below. The last session before the gate |

**The dress rehearsal (step 21).** The flag has not been used for a production build yet, so try it where nobody sees it:

1. Build once with `NEW_UI_FOR_EVERYONE=true` and no production deploy. `npm run build` reads production, so
   don't loop it.
2. The build lists `/privacy`, `/terms`, `/cookies` and the 23 guides as Static.
3. Compare with the live site through `scripts/seo-snapshot.ts`: Home, one guide, Explore, one program and one
   university. Every difference is explained.
4. CSS is at or under 36 KB.
5. **You:** run Home, one guide and one program through Google's Rich Results Test on the live site, and record
   the items in [Numbers to record](#numbers-to-record). Step 29 compares against them.

---

## Stage 2 — Go or no-go

| Step | Status | Who | What to do |
|---|---|---|---|
| 22 | Open | You | **Choose R,** once steps 1 and 2 are back. Tell the session, and it fills in [Dates](#dates) |
| 23 | Open | You | **Go or no-go**, on the list below. Any "no" moves R |

**The list:**

- [ ] The lawyer's answers are in the drafts (step 20)
- [ ] Lens is clear (step 2). If it isn't, stop: a new mark is a file change in `lib/brand/config.ts`, but it needs a design session first
- [ ] Search Console baseline noted (step 3)
- [ ] Steps 5–9, 20 and 21 are done
- [ ] Steps 10–19 are done, or you have decided to leave one until after release
- [ ] `npm audit` is at 0, or you accept what is left
- [ ] CI is green on `main`
- [ ] Usage is under every stop line
- [ ] #127 is the only open `go-live` pull request

---

## Stage 3 — Release day

**End results 2 and 3.** Allow a morning. Do the steps in this order, and don't skip a check. `REBRANDING_tasks.md`
R.1 and `SEC_tasks.md` SEC-4 hold the background; this order replaces theirs.

**Why this order:** setting the variable first means one deploy brings the new UI, the FAQ words and the new emails
together. The legal documents go up only after the checks pass. Publishing doesn't refresh the prebuilt legal
pages, so the second deploy does that, and closes the preview and turns on the admin's buttons at the same time.

| Step | Status | Who | What to do | Check |
|---|---|---|---|---|
| 24 | Open | Session | **Paste:** `Next step in the release runbook.` It takes #127 out of draft, as GitHub won't merge a draft, updates it with `main` and sets `/faqs`' `modified` in `lib/page-dates.ts` to today | #127 is green and mergeable |
| 25 | Open | You | **SEC-4 steps 1–4.** `npm audit` on the release commit. Vercel → Deployment Protection: previews protected. Vercel → Production: `STRIPE_WEBHOOK_SECRET` set, `INACTIVE_ACCOUNTS_ENABLED` unset or `false`, nothing secret named `NEXT_PUBLIC_` | All four pass |
| 26 | Open | You | **Vercel → Production:** set `NEW_UI_FOR_EVERYONE=true`. Production only. Nothing changes until the next deploy | The variable is saved |
| 27 | Open | You | **Merge #127.** The merge deploys production. No separate redeploy | The deployment is Ready, and `/` shows the new design in a private window |
| 28 | Open | You | **Check every page:** signed out and signed in, light and dark, on a phone and on Windows. Sign in as a student: Matches, Explore, a program, Shortlist, Academic, Settings. Open `/faqs`, a guide, For schools and the coordinator sign-in. Open `/admin/seasonal-themes` | Nothing is broken. If something is, see [Rollback](#rollback) |
| 29 | Open | You | **Rich Results Test:** Home, one guide, one program | The same items as before, plus the breadcrumbs |
| 30 | Open | You | **Publish the three documents** in `/admin/legal-content`, one straight after the other: Privacy, Terms, Cookie Policy. For each: create the version from its `.proposed.md`, label it with today's date as `YYYY-MM-DD`, publish "effective now". The Cookie Policy's first version creates its document. The policy notice shows to signed-in users at once; the Cookie Policy doesn't trigger it | All three show as published with today's label |
| 31 | Open | You | **In Vercel:** delete `NEW_UI_PREVIEW_KEY` from Production and Preview, set `INACTIVE_ACCOUNTS_ENABLED=true` in Production, then **Redeploy**. Nothing is sent: the variable only enables the admin's buttons | The deployment is Ready |
| 32 | Open | You or a session | **SEC-4 steps 6–7.** The headers on `/` and `/programs/search`, and `curl -s https://www.ibmatch.com/admin/students \| grep -c @` gives 0, also with `-H 'RSC: 1'`. `/api/preview?key=<old key>` answers 404 | All pass |
| 33 | Open | You | **Check the legal pages:** `/privacy`, `/terms` and `/cookies` show the new text and today's date, and `/privacy#8-data-retention` opens section 8. Sign in as a student: the notice shows in the new design, and Accept works. Ask for a sign-in link: it comes in the new design | All pass |
| 34 | Open | Session | **Record the day.** Marks R.1 done in `REBRANDING_tasks.md`, 7.4's step 5 in `MAINT_tasks.md` and #127's checklist | The docs agree |

### Rollback

**Roll back if** students can't sign in, or Matches or Explore fail, and the fix isn't minutes away.

1. In Vercel Production, set `NEW_UI_FOR_EVERYONE=false`, and `INACTIVE_ACCOUNTS_ENABLED=false` if it is on. Send
   nothing until the new design is back.
2. Revert #127. The merge of that revert redeploys; if #127 wasn't merged, use Redeploy.
3. If step 30 is done, leave the legal documents published. They are correct, and a second notice would be worse.

---

## Stage 4 — Silent accounts

**End result 4.** Only after the Privacy Policy that sets the rule is published. Everything is on
`/admin/students/inactive`. Sending is capped at 50 a UTC day, under Resend's 100 a day. A notice is recorded when Resend
accepts it. The rule and the wording are in `MAINT_tasks.md` 7.6.

| Step | Status | Who | When | What to do | Done when |
|---|---|---|---|---|---|
| 35 | Open | You | R+1 | Check the page's three counts look right against [Numbers to record](#numbers-to-record), and the deletion date it shows | The counts make sense |
| 36 | Open | You | R+1 | **Press Send notices.** It sends to the 50 silent longest and confirms the number first | The page shows 50 notified |
| 37 | Open | You | R+2, a new UTC day | **Press Send notices again** for the rest, 20 on 31 October's count, plus anyone newly silent. Repeat daily if any are left | None left due a notice |
| 38 | Open | You | 30 whole UTC days after each send | **Press Delete due accounts,** up to 25 a press, until none are left. **Final:** Supabase keeps no backups, and no email follows. A student who came back has already dropped off the list | None left due for deletion |

Part E, the daily job, is built only if you ask, after this round has gone well.

---

## Stage 5 — Watch, then cleanup

**End result 5.** Cleanup waits for two stable weeks. Legal task C goes first because it edits files that R.2 cuts.

### The first two weeks

| Step | Status | Who | When | What to do |
|---|---|---|---|---|
| 39 | Open | Session | R+1 to R+3 | `Do MAINT 7.4 task C.` Updates `docs/templates/legal/*.md` and `FALLBACK_CONTENT` in `app/privacy/page.tsx`, `app/terms/page.tsx` and `app/cookies/page.tsx` to the published text. In the same pull request, moves the three `.proposed.md` drafts, the three redlines and `lawyer-brief.md` to `docs/archive/legal-2026/`, and corrects "paying customers" in `docs/legal-review/README.md` and `claims.md` |
| 40 | Open | You | Weekly, and daily in the first few days | Vercel errors, then usage against the stop lines. `npx tsx scripts/algolia-usage.ts` for Algolia: Best fit costs more requests per list. Schedule Christmas at `/admin/seasonal-themes`, 14 December to 1 January, if it's wanted this year |

### Search Console check

| Step | Status | Who | When | What to do |
|---|---|---|---|---|
| 41 | Open | You | R+16, not R+14: Search Console's data lags a couple of days | Compare indexed pages and clicks with the baseline, and fill in [Numbers to record](#numbers-to-record). **No fall: go on.** A fall: stop, find the cause, and cleanup waits |

### Cleanup, in order

R.2 is three pull requests, not one: 82 files branch on the switch, and the 23 old guides alone are 21,273 lines.
`REBRANDING_tasks.md` R.2 is the base list, and the session for step 42 starts by adding what it leaves out:

```bash
git grep -nE "\bR\.2\b|at cleanup|until cleanup" -- app components lib emails eslint next.config.ts
```

**Left out of R.2's written list on 31 October 2026:**

- the old API routes: `/api/programs/search`, `/api/students/matches`, `/api/students/saved-programs`. Check every
  caller first and delete only what nothing uses, as the new design may share a method;
- `NewExplore`, `NewMatches`, `NewOnboarding`, `NewShortlist` and `NewSettings`, once each page imports its client;
- `app/programs/[id]/layout.tsx`, `components/site/chrome.tsx`, `components/site/not-found-island.tsx`,
  `components/layout/StudentFooter.tsx`, `components/brand/LegacyLogo.tsx`, and today's branch of
  `app/student/onboarding/loading.tsx`;
- `AccountSettingsClient` and its two dialogs, and `/images/landing/coordinator-hero.png`;
- merging `components/first-run/field-icons.ts` into `lib/icons.tsx`.

| Step | Status | Who | Paste this | What it does |
|---|---|---|---|---|
| 42 | Open | Session | `Do R.2, part 1 of 3: old screens and routes.` | Pages, components, country content, old routes and every list above. Each page loses its `showsNewUi()` branch |
| 43 | Open | Session | `Do R.2, part 2 of 3: emails.` | R.2's "from 4.7" list. The inactivity notice's `{ newUi: true }` goes too |
| 44 | Open | Session | `Do R.2, part 3 of 3: the switch, CSS and tokens.` | `lib/new-ui.ts`, the preview routes and bar, `NEW_UI_RELEASED`, scoped tokens to `:root`, Newsreader's preload, `LinkPending` in `ButtonLink` and `CardLink`. **CSS back to 32 KB or less.** The `git grep` above finds nothing left. Moves `docs/UX/design-refresh-2026/` to `docs/archive/`, except `04-design-system.md`, which moves to `docs/UX/` and stays current |
| 45 | Open | You | Nothing to paste | **Only after step 44 is merged and deployed:** delete `NEW_UI_FOR_EVERYONE` from Vercel. Deleted earlier, the next deploy brings the old design back. `INACTIVE_ACCOUNTS_ENABLED` stays |
| 46 | Open | Session | `Do MAINT 5.41.` | Step 10 of the matching order. You decide on Version X's unused scoring (recommended: delete). Then moves `DOC_2_matching-algo X.md`, `matching-algo-rollback-plan.md` and `5.18-shared-courses.md` to `docs/archive/`, and updates the code comments that cite them |
| 47 | Open | Session | `Do MAINT 6.11.` | `eslint-config-next` 16.4. Count the errors again first: R.2 deletes some of them |
| 48 | Open | Session | `Do MAINT 7.2.` | One route for the 23 guides. URLs, metadata and JSON-LD stay identical |
| 49 | Open | Session | `Close the release runbook.` | Marks R.2 done, checks that `MAINT_tasks.md` and `REBRANDING_tasks.md` agree with this file, and moves any open row to them. Finishes the docs: `DOC_3_technical-architecture.md` rewritten short and current, finished tasks moved out of `MAINT_tasks.md`, `REBRANDING_tasks.md` and `CONTENT_tasks.md` into `docs/archive/`, and the seven code comments that cite deleted `docs/countries/` files corrected |

---

## Stage 6 — SEO and marketing

**Planning can start the day after release. Changes wait until step 41 passes,** because the check compares against the
baseline. Anything that emails or tracks needs a new Privacy Policy version, and so a second notice to every signed-in
user: batch those changes.

| Step | Status | Who | When | Paste this | What it does |
|---|---|---|---|---|---|
| 50 | Open | Session | From R+1 | `Do MAINT 7.3.` | Planning only: the January SEO plan becomes a short current list, ordered by the Search Console data, with your decisions on AI crawlers, `llms.txt` and Bing. It changes nothing on the site. Deletes `seo-ai-seo-implementation-plan.md` once the new list is in |
| 51 | Open | Session, then you | From R+1 | `Do MAINT 7.5 Part C.` | Planning only: how to bring students back without annoying them. You approve the options |
| 52 | Open | Session, then you | From R+1 | `Do MAINT 7.5 Part D.` | Planning only: social media, LinkedIn for coordinators first. You approve the plan |
| 53 | Open | You | After a stable first week, with Lens clear | Nothing to paste | Create the accounts and start organic posts, from step 52's plan. Footer links and `sameAs` wait for step 54 |
| 54 | Open | Session | After step 41 | `Next task in the SEO plan.` | Carries out step 50's tasks and the site changes from steps 51 and 52, one per session. Footer links need a change board first (`REBRANDING_tasks.md`, Step 2) |

---

## Where the detail lives

| File | Use it for |
|---|---|
| `docs/tasks/MAINT_tasks.md` | 5.41, 5.48, 6.11, 7.2–7.6, the free-tier guard and the standing rules |
| `docs/tasks/REBRANDING_tasks.md` | R.1 and R.2's background, 5.1, the Definition of done |
| `docs/tasks/SEC_tasks.md` | SEC-4 and the owner's security settings |
| `docs/legal-review/README.md` | How the legal documents are published, and every decision behind them |
| `docs/legal-review/lawyer-brief.md` | What goes to the lawyer |

**Not part of the release:** `CONTENT_tasks.md` has nothing that gates it. `docs/archive/` holds old records. Docs
deleted on 1 November 2026 stay readable at the git tag `docs-before-cleanup`. `seo-ai-seo-implementation-plan.md` is
background until step 50 replaces it.
