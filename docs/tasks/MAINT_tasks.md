# Maintenance Roadmap

**Written:** 30 August 2026 · **Covers:** work remaining after maintenance phases 1–4

**How to use this.** [Start here](#start-here) says which tasks to run in which
session, and in what order. The checklist after it is the flat list. Everything below
that is one detailed section per task — the part a session actually works from.

Each task is written to be picked up by a **fresh AI session with no memory of the
earlier work**. Every session should read [Standing context](#standing-context) first:
it holds the rules that stop a session breaking production or burning the free-tier
quota.

---

## Start here

### The matching work: this order, one step at a time

**The goal (owner, 30 October 2026).** Version XI (`docs/matching/DOC_2_matching-algo XI.md`) is the
master version of the algorithm. When this table is finished the algorithm is fair, the code and XI say
the same thing, and every service stays inside its free tier.

**How to use it.** Find the first step that is not Done. Start a new session and paste the sentence in
"Paste this". One step, one session, one pull request; merge it before starting the next. Do not skip
ahead: each step relies on the one before. The session that finishes a step sets its Status to Done, with
the date and pull request, and sets the next step to **Next**, in the same pull request. So **Next** is
always where you are.

| Step | Status | Paste this | What it does | What you do | Usage |
|---|---|---|---|---|---|
| 1 | Done, 30 October 2026 (#223) | Nothing: no session | Version XI, this table and tasks 5.40–5.45 and 7.8 reach `main` (#223) | Merge #223. Give the 5.40 session this month's Upstash figures: it records them under the free-tier guard, as the starting point | None |
| 2 | Done, 30 October 2026 (#226) | `Do MAINT 7.8.` | Adds a plain paragraph on how matching works to the Privacy Policy draft, and one question to the lawyer's brief. First, so the lawyer sees it with everything else | Send it to the lawyer with the rest of 7.4 | None |
| 3 | Done, 30 October 2026 (#227) | `Do MAINT 5.40.` | Matches keeps every program the student qualifies for, so it agrees with Explore's switch: 8 on the owner's account, not 2. No score moves. Adds the test that holds XI's worked examples to the code | Merge. In the preview, check that your account shows 8 | About +10% of Upstash bytes per Matches load |
| 4 | Done, 30 October 2026 (#228) | `Do MAINT 5.42.` | Removes the precompute that writes a list nobody reads | Merge | Less: one Algolia search, one Redis write and one programs read per save |
| 5 | Done, 30 October 2026 (#229) | `Do MAINT 5.44.` | Coordinators see the list the student sees, and the old second path goes | Merge. Open one student in the portal and compare with their Matches | Less: about 2.7 MB to 0.4 MB per coordinator list |
| 6 | Done, 31 October 2026 (#230) | `Do MAINT 5.43 Part A.` | Fixes the two scoring bugs: a bigger gap never scores higher, and a perfect match reads 100% for an open student. XI becomes XI.1 | Merge. Run the cache clear the task names, once | None |
| 7 | Done, 31 October 2026 (#231) | `Do MAINT 5.45.` | Corrects the public words on How it works and the FAQ, now the matcher is right | OK the words in the pull request. Merge | None |
| 8 | Done, 31 October 2026 (#232) | `/design D3.1 No IB minimum` | Drew one board, as its own light page, for your two decisions: programs with no bar, and field against country. Approved with every recommendation | Merge | None |
| 9 | **Next** | `/build 30` | Builds what you decided: "No set grades" and field above country, with How it works and Why this match changed in the same pull request. XI becomes XI.2 | Merge after looking at the preview. Run the cache clear the task names, once | None |
| 10 | Waiting | `Do MAINT 5.41.` | After cleanup (R.2). ✋ Your decision on Version X's unused scoring (recommended: delete), then removes it and the V10 flags | Decide in the session. Merge | Less: about 470 bytes per cached result, 23% of one |

**Where release day falls.** Steps 1–7 go before release day (R.1). Steps 8 and 9 should, but do not hold
it up: if the board is not approved by then, they follow it. Step 10 waits for cleanup (R.2), because
today's route still sends the labels it removes. Release and cleanup themselves are in
`REBRANDING_tasks.md`, and nothing else in that file changes for this work.

**Terms, policies and public pages: checked 30 October 2026 against steps 1–10.**

| Page or document | Change needed | Why |
|---|---|---|
| Terms of Service | None | "Estimates", "do not guarantee admission" and section 11 already cover every step |
| Privacy Policy | One paragraph, step 2 | It says nothing about matching being a calculation. Not caused by this work: no step adds or moves data, and its coordinator list and 30-minute cache stay true |
| Cookie Policy | None | No step stores anything new in a browser |
| Invitation consent box | None, and no new consent | It already lists "your program matches and saved programs", so step 5 shows coordinators nothing new |
| How it works, FAQ | Words, step 7. Then step 9: both the weights and the statuses change | "Every program gets a fit score" and "Fast, accurate matching" say too much; the FAQ leaves out what coordinators see |
| Home, For schools, requirements hub, other guides | None | Their words stay true, and a test holds Home's preview to the matcher |
| France guide | None | It says IB Match shows 24 where no minimum is published, and the board keeps 24 on the card (31 October 2026) |

**You are finished when:**

- XI's "Known problems" is empty, or lists only what you decided to keep;
- `lib/matching/worked-examples.test.ts` passes, so XI's examples are what the code does;
- one path scores students' lists: `getCachedMatchesV10` for Matches and coordinators;
- nothing imports Version X's scoring, or you decided to keep it and XI says what it does;
- How it works, the FAQ and the Privacy Policy draft say what the matcher does;
- the usage below is under every stop line.

**The free-tier guard.** Together these steps should lower usage: steps 4, 5 and 10 remove more than step 3
adds. No step may add a read of any service; each task's "Must not" says so. If a stop line below is
crossed, finish the pull request in hand, start no new step, and find the cause first.

| Service | Free limit a month | Stop line | Where to read it |
|---|---|---|---|
| Upstash bandwidth | 10 GB | 7 GB | Upstash console, Usage tab (you) |
| Upstash commands | 500,000 | 350,000 | Upstash console, Usage tab (you) |
| Upstash storage | 250 MB | 175 MB | Upstash console, Usage tab (you) |
| Algolia requests | 10,000 | On pace for 8,000 | `npx tsx scripts/algolia-usage.ts` (a session can run it) |
| Supabase egress | 5 GB | 4 GB | Supabase dashboard (you) |

Look at these a week after steps 3 and 5, the two that move Upstash most. The last Upstash figures on
record are 1 GB and 6.1K commands for 1–11 October 2026, before 5.19. 5.40 ran without October's figures,
so the first reading after it is the starting point: record it here.

---

### Everything else

**Reviewed 26 October 2026** against `REBRANDING_tasks.md`, the code on `main` and the open pull
requests. The work is in three groups: what is done, what can be done now, before the rebranding is
released and cleaned up, and what has to wait for that. Each row in groups 2 and 3 is a fresh AI
session, one branch, one pull request, merged before the next starts.

**When a task is finished** (owner's rule, 26 October 2026), the session that finishes it updates this
section in the same pull request:

- move its row from group 2 or 3 to the end of group 1, with the date and one line on what it did. A
  task finished only in part keeps a row in its group for what is left;
- add its number to "All done tasks";
- tick it in [The full list](#the-full-list) and mark its section heading **done**, as the others are.

Groups 2 and 3 then hold only open work. A finding from a session becomes a new task and a row in group
2 or 3, not a note in group 1.

**Where the rebranding stands.** Release day (`REBRANDING_tasks.md` R.1) waits on the owner: Lens's
clearance search and the Search Console baseline. The program card review (its 5.1) goes before it if
it is ready. Cleanup (R.2) comes about two weeks after release, once Search Console shows no fall, and
deletes today's design.

### 1. Done — no need to return to these

| Session | Tasks | Done | What it did |
|---|---|---|---|
| Small cleanups | 5.26, 5.17, 5.6 | 22 October 2026 | Coordinator sign-in instead of a 404; university pages in the sitemap; the Algolia status script reads every record |
| Explore's best fit | 5.27 | 22 October 2026 | Rebranding session 25: Best fit for a student with grades, the `EXPLORE_BEST_FIT` switch and `scripts/algolia-usage.ts`. Check the usage weekly after release |
| School logos to Storage | 5.11 | 22 October 2026 | Both admin school routes upload a base64 logo to Storage or refuse with 502 |
| Older images' cache | 5.10 | 22 October 2026 | 54 objects re-uploaded with a one-year cache; no database write |
| Sample-seed leftovers | 5.9 | 22 October 2026 | Four sample universities deleted after a JSON backup; the sync removes records with no row |
| Admin forms | 5.16 | 22 October 2026 | The forms suggest the field of study and take a campus city |
| Rate-limiter retention | 5.28 | 24 October 2026 | The limiters keep no account IDs or addresses; the old ones purged (#156, #159) |
| Tests: the Stripe webhook | 7.1 Part 2 | 26 October 2026 | 42 tests, the route unchanged. Found 5.34 |
| Tests: API routes and rate limits | 7.1 Part 3 | 26 October 2026 | 462 tests; every route's gate checked by kind. Found 5.35 and 5.36 |
| Revoked coordinators and six rate limits | 5.36, 5.35 | 26 October 2026 | A revoked coordinator is refused by all 10 handlers; six signed-in handlers have limiters |
| Late Stripe events | 5.34 | 26 October 2026 | The webhook writes what Stripe says now, for the school's current subscription only |
| The database's public API | 5.37 | 26 October 2026 | Data API off; Row Level Security on all 24 tables, the API roles' grants revoked, new tables closed by an event trigger that CI checks. The Advisor's list and Vercel's old key wait for the owner |
| Invited people's policy versions | 5.30 | 26 October 2026 | Both invitation routes store the published Terms and Privacy labels, so no notice follows; the coordinator-access version stays. The unused `/api/students/consent` deleted |
| Admin deletes a coordinator with invitations | 5.29 | 26 October 2026 | `deleteCoordinatorAccount` in one transaction: the invitations they sent and the one sent to them, sign-in links, then the user. The school and its students stay |
| The whole data export | 5.31 | 26 October 2026 | The download adds the consent records, the student's support tickets and the invitations sent to their address, naming no one else (version 1.1). Privacy 9's draft sentence shortened |
| Three tiny fixes | 5.32, 5.33, 5.38 | 26 October 2026 | The ticket emails log `ab***@example.com`; the coordinator portal says "Subscribe", never "Upgrade to VIP"; For schools offers a 30-minute call in both designs |
| `prisma-client` generator | 6.6 | 26 October 2026 | The client is generated into `app/generated/prisma` (gitignored); 59 files import from its `client` or `enums`, none from `@prisma/client`. The browser gets the enums only |
| The matching scripts to Vitest | 7.1 Part 4 | 26 October 2026 | 21 scripts became 329 Vitest tests; one suite, and CI now sees a failure in the 12 scripts that exited 0 regardless. 7.1 is done. Found 7.7 |
| Three gaps in the matching tests | 7.7 | 26 October 2026 | 24 new tests and one corrected: the Redis match cache (`lib/matching/cache.test.ts`, new), both 0.25 floors in the subject matcher, and `MATCHING_V10_FULL` overriding the other flags. No score changed |
| One course for two requirements | 5.18 | 27 October 2026 | `ProgramCourseRequirement.ownCourse` and the matcher that gives marked requirements different courses (#185), rebranding build 28 (#186), and the flags on 18 programs at Trinity, Manchester and UCL (#187). Scores of unflagged programs unchanged. Found 5.39 |
| "Two of" rules stored as one | 5.39 | 27 October 2026 | 47 programs at McGill, Alberta, Waterloo, Trinity, Imperial, NUS, Leiden, Lund and Cambridge re-read and given their second requirement, both needing a course of their own (#188). Alberta counts Maths AA as Math 31 |
| Returning students: where it stands | 7.5 Part A | 27 October 2026 | From stored dates only: 24 of 199 students (12%) left a trace on a day after signing up, 4 on more than one. A floor: Google sign-ins and visits that change nothing leave none. Parts C and D wait (group 3) |
| Returning students: what to count | 7.5 Part B | 27 October 2026 | The owner chose the last-active date, which 7.6 Part A builds; returns are counted from it by month of sign-up. Other analytics may come later |
| Inactive accounts: the policy line | 7.6 Part 0 | 27 October 2026 | The Privacy Policy draft (7.4) and its redline say it: 6 months unused, one warning email, deletion 30 days later unless the student comes back. Also the last-active date (section 2) and the warning among the emails (section 3); one more line for the lawyer under question 8 |
| Inactive accounts: the last-active date | 7.6 Part A | 27 October 2026 | `User.lastActiveAt`, written by the `jwt` callback's role read at most once a day, clearing `inactivityNoticeSentAt` (#193; migration applied). Backfilled for all 201 students from their latest stored change: 69 silent, 37 active in the last 30 days |
| Inactive accounts: the admin and the dashboard | 7.6 Part B | 27 October 2026 | "Last active" and a "Silent" label on `/admin/students` and the student's page, a Silent filter, and two `count()`s on the dashboard (37 active in 30 days, 69 silent). The rule is `lib/account/inactivity.ts`, for Part D to extend |
| Inactive accounts: the notice and the admin page | 7.6 Parts C and D | 27 October 2026 | The notice (`emails/inactivity-notice.tsx`, board row 30) and `/admin/students/inactive` with Send notices (50 a day, one Resend batch, recorded on acceptance) and Delete due accounts (25 a press, re-checked in each transaction). Both off behind `INACTIVE_ACCOUNTS_ENABLED` until the policy is published. Part E only when the owner asks |
| npm 12: the impact | 6.7, steps 1–4 | 27 October 2026 | npm 12 tried on a clone: every check passes with all six dependency install scripts blocked, so `allowScripts` is five denials. No npm 12 now; Node 24 everywhere first (6.10), approved by the owner with `strict-allow-scripts`. Local npm on 11.21.1. Found 6.8, 6.9 and 6.10 |
| Next.js security patch | 6.8 | 27 October 2026 | `next` 16.3.4 → 16.4.3, which closes three critical remote-code-execution advisories, and `sharp` with it; `npm audit` 12 → 10, none critical. `eslint-config-next` stays on 16.3.4. Found 6.11 |
| The other advisories | 6.9 | 27 October 2026 | `npm audit` 10 → 0: `npm audit fix` for eight packages, lockfile only, and an override moving typography's `postcss-selector-parser` to 6.1.5, with byte-identical CSS. `zod`, `vite` and `vitest` floors raised |
| Node 24 on all three machines | 6.10 | 27 October 2026 | `engines` `24.x`, `.nvmrc` `24`, and CI reads `.nvmrc`, so CI tests on the Node and npm 11 that production runs. The matcher's fingerprint is identical on Node 22 and 24. The laptop moves when the owner installs Node 24 |
| npm 12: the `allowScripts` list | 6.7, step 5 | 27 October 2026 | `allowScripts` denies the five dependency install scripts, none needed, and `.npmrc` sets `strict-allow-scripts=true`: an unreviewed script fails `npm ci`, so CI catches it before merge. npm 12 will change nothing here. 6.7 is done |
| Matching in the Privacy Policy draft | 7.8 | 30 October 2026 | "How matching works" in section 3 of the draft and its redline, each statement checked against the code, and question 13 for the lawyer. Nothing published |
| Matches keeps every program a student qualifies for | 5.40 | 30 October 2026 | The points window has no lower end, so "Meets all requirements" holds what Explore's switch holds: 8 on the owner's account, not 2. No score moved. `worked-examples.test.ts` holds XI's examples to the code |
| Stop precomputing a list nobody reads | 5.42 | 30 October 2026 | The route, its two callers, `searchCandidatePrograms`, `isAlgoliaAvailable` and `INTERNAL_API_KEY` are gone. A save costs one Algolia search, one programs read and one Redis write less. Found 5.46 |
| Coordinators see the student's list | 5.44 | 30 October 2026 | The student page, its matches page and analytics read `getCachedMatchesV10`, in the student's order through `rankedResults`. `getCachedMatches`, the two old key kinds and the unused analytics route are gone. No score moved. About 2.7 MB to 0.4 MB per coordinator list |
| The public words on matching | 5.45 | 31 October 2026 | How it works and the FAQ say only what the matcher does, in both designs and the structured data; four rows in `claims.md`, and two tests hold the words. No score or layout moved

**All done tasks:** 5.1–5.28 (5.15 decided: no change for now; 5.25 but for its step 6,
which waits for the owner), 5.29–5.40 (5.37 but for the owner's part of steps 4 and 5), 5.42, 5.44, 5.45, 6.1–6.10, 7.1, 7.7 and 7.8. Each section below records what
was done.

### 2. Can be done now — before release day and cleanup

Tasks here do not depend on the rebranding.

**Security, from the audit of 27 October 2026:** `docs/tasks/SEC_tasks.md`. Every session task is
done or decided (#204–#213); what is left is the owner's, in its "Left for the owner" (SEC-4 on
release day, and settings in Vercel, Supabase, GitHub and the mailbox). Every other MAINT task that can run before release day was done by 27
October 2026; a new finding gets a row here.

| Session | Tasks | Size | What it is |
|---|---|---|---|
| A save clears the list before answering | 5.46 | small | Three save routes clear the cached list without waiting for it, so a save may not show on Matches at once. Unproven: from reading the code. Independent of the matching order |

The matching tasks 5.40–5.45 run in the order at the top of this section, not from here.

**Waiting on the owner, not a session:** 7.4's three legal drafts are done (`docs/legal-review/`) and
wait for the lawyer's seven `[LAWYER]` notes; they are published on release day (group 3).

### 3. Wait for release day (R.1) or cleanup (R.2)

| After | Session | Tasks | Size | Why it waits |
|---|---|---|---|---|
| R.1 | Publish the legal pages | 7.4, step 5 and task C | owner, then small | The owner publishes the three documents, with 7.8's paragraph, in `/admin/legal-content` on release day, so the new words go live with the new design. Then task C: the templates and code fallbacks updated to the published text. Pull request #127 (three FAQ answers) also merges that day |
| R.1 | SEO and AI search plan | 7.3 | small | Planning only. The redesign changes page templates and headings, and the plan starts from the Search Console baseline |
| R.1 and 7.4 published | Returning students: ways back, social media | 7.5 Parts C and D | medium | Anything that emails or tracks changes the Privacy Policy, so it waits for the new one |
| R.1 | Inactive accounts: the first round | 7.6 Part D's switch | owner | Once the Privacy Policy that sets the rule is published: turn `INACTIVE_ACCOUNTS_ENABLED` on, send the first notices over a few days under Resend's daily limit, and press Delete 30 days later |
| R.2 | Version X's unused scoring | 5.41 | small | The last step in the matching order at the top of this section |
| R.2 | Country page shells | 7.2, the rest | medium | One route for the 23 guides, once R.2 deletes the 23 `<Country>Content.tsx` files |
| R.2 | `eslint-config-next` 16.4 | 6.11 | small to medium | Its React Compiler rules find 19 errors in 14 client components, some of which R.2 deletes; fix what is left |

**For the owner, now:** install Node 24 LTS on the laptop (6.10); then `node -v` prints 24 and `npm ci` has no `EBADENGINE`. 5.37's last steps: export the Security Advisor's list for a session to answer,
turn off sign-ups to Supabase Auth, delete `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel, check for a
publishable key, and upload one image in the admin; compare Upstash bandwidth around 5.19, merged 12 October (owner task 5);
check Supabase egress (owner task 2); approve deleting 5.25's two old invitations, with a backup
first (owner task 6); the lawyer's review of 7.4's drafts. For the rebranding: one real send of each
email (build 22), Lens's clearance search and the Search Console baseline.

### Rules for grouping

1. **Never two dependency upgrades in one session.** If something breaks you will not
   know which upgrade did it, and you will spend more time unpicking it than you saved.
2. **Never mix a risky change with cleanups.** Anything that might need reverting
   deserves a pull request with nothing else in it.
3. **Group only changes that are individually trivial** and share one verification
   pass. That is why the small cleanups were one session and little else is batched.
4. **Stop when the pull request gets hard to review**, not when the task list is empty.

### What this costs

More sessions costs more in AI time; a bad batch costs more in debugging. Batching
only trivia is the balance. Every session ends with a merged pull request, so the next
one starts from a clean `main` and does not have to rediscover anything.

---

## The full list

Phase 5 — quick wins

- [x] 5.1 Use the router for internal navigation
- [x] 5.2 Delete the unused admin programs API route
- [x] 5.3 Remove the redundant Cache-Control on Next's own static assets
- [x] 5.4 Set `trustHost` explicitly in the auth config
- [x] 5.5 Restore the University of Manchester image — re-sourced and uploaded by the owner, 5 October 2026
- [x] 5.6 Make the Algolia status script read every record
- [x] 5.7 Show each option's level and grade in mixed subject groups
- [x] 5.8 Use the IB core points matrix for TOK and the Extended Essay — data fix applied 7 October 2026: 20 totals, each +1
- [x] 5.9 Remove what the December 2025 sample seed left behind (22 October 2026)
- [x] 5.10 Give the older university images a one-year cache (22 October 2026)
- [x] 5.11 Send school logos to Storage, as university logos already go (22 October 2026)
- [x] 5.12 Show every match, not only the top 10 — up to 50
- [x] 5.13 Require 3 or 4 Higher Level subjects
- [x] 5.14 Delete unused student-side components
- [x] 5.15 Decide how a missing HL level should score — decided 7 October 2026: no change now; revisit with the whole matching math later
- [x] 5.16 Suggest the field of study in the admin program forms (22 October 2026)
- [x] 5.17 List the university pages in the sitemap
- [x] 5.18 Count a course once when a program needs different subjects — 27 October 2026; 18 programs flagged
- [x] 5.19 Read the programs cache once per server, not on every Matches load — five minutes per instance; Upstash bandwidth to compare after merging
- [x] 5.20 One IB diploma rule wherever grades are saved, by any role — `checkDiploma`; no saved profile changed status
- [x] 5.21 Send an invited student to "Check your email" after accepting (19 October 2026)
- [x] 5.22 Let a student who already has an account accept an invitation (19 October 2026)
- [x] 5.23 One h1 on the legal pages (19 October 2026)
- [x] 5.24 Send "Account deleted" when a student deletes their own account (20 October 2026)
- [x] 5.25 Delete everything a student's account holds when it is deleted (20 October 2026; step 6's
  two old invitations wait for the owner)
- [x] 5.26 Send a signed-out coordinator to the coordinator sign-in, not a 404
- [x] 5.27 Order Explore by the student's fit, not by the highest minimum (22 October 2026)
- [x] 5.28 Stop the rate limiters keeping account IDs and IP addresses forever (from the legal review, 7.4) — #156, #159; purged, none left on 24 October 2026
- [x] 5.29 Let an admin delete a coordinator who has sent invitations — 26 October 2026
- [x] 5.30 Store the published policy versions when someone accepts an invitation — 26 October 2026
- [x] 5.31 Put the consent records, support tickets and invitations in the data export — 26 October 2026
- [x] 5.32 Redact the address in the support-ticket email logs — 26 October 2026
- [x] 5.33 Stop telling a coordinator to "upgrade to VIP" — 26 October 2026
- [x] 5.34 Let a late Stripe event never change a school's subscription (from 7.1 Part 2) — 26 October 2026
- [x] 5.35 Give the last six signed-in handlers a rate limit (from 7.1 Part 3) — 26 October 2026, with 5.36
- [x] 5.36 Refuse a revoked coordinator in every coordinator API route (from 7.1 Part 3) — 26 October 2026
- [x] 5.37 Close the database's public API: Row Level Security is off on every table — 26 October 2026
  (the Advisor's list and Vercel's old key wait for the owner)
- [x] 5.38 Say "30-minute call" on For schools: the call is 30 minutes — 26 October 2026
- [x] 5.39 Store the "two of" rules the matcher could not hold (from 5.18 step 1) — 27 October 2026; 47 programs
- [x] 5.40 Keep every program a student qualifies for on Matches — no lower end to the points window; scores unchanged — 30 October 2026
- [ ] 5.41 Decide what becomes of Version X's scoring (from 5.40), after R.2
- [x] 5.42 Stop precomputing a match list nobody reads (from 5.40) — 30 October 2026
- [ ] 5.43 Make the score fair (from the owner's question on Version XI) — Part A done 31 October 2026;
  Part B's board approved the same day, build 30 next
- [x] 5.44 Show coordinators the list the student sees (from 5.40) — 30 October 2026
- [x] 5.45 Correct what the public pages say about matching (from 5.40) — 31 October 2026
- [ ] 5.46 Clear the cached list before a save answers (from 5.42)

Phase 6 — dependency majors

- [x] 6.1 Prisma 6 → 7
- [x] 6.2 Stripe 20 → 22
- [x] 6.3 lucide-react 0.x → 1.x
- [x] 6.4 The minor and patch batch
- [x] 6.5 TypeScript 5.9 → 7
- [x] 6.6 Move to the `prisma-client` generator
- [x] 6.7 npm 12: find out what it changes here, and decide whether to move — 27 October 2026: no
  npm 12 for now; Node 24 everywhere (6.10), and the `allowScripts` list with strict on
- [x] 6.8 Next.js 16.3.4 → 16.4.3: the critical advisories (from 6.7) — 27 October 2026
- [x] 6.9 The other advisories (from 6.7) — 27 October 2026
- [x] 6.10 Node 24 on all three machines (from 6.7) — 27 October 2026; the laptop waits for the owner
- [ ] 6.11 `eslint-config-next` 16.4 and the React Compiler lint rules (from 6.8), after R.2

Phase 7 — structural

- [x] 7.1 Test coverage beyond the matching algorithm (26 October 2026)
- [ ] 7.2 Collapse the 23 country landing pages: the content is one template since rebranding 4.2
  (18 October 2026); the 23 page shells are left, for after R.2
- [ ] 7.3 Refresh the SEO and AI search plan, after the rebranding
- [ ] 7.4 Review the legal pages, and every claim the public pages make, and bring them up to date
- [ ] 7.5 Returning students and social media: measure where it stands, and plan how to bring students back and reach new ones — Parts A and B done 27 October 2026
- [ ] 7.6 Inactive accounts: mark them silent, warn them, then delete them
- [x] 7.7 Close three gaps in the matching tests (from 7.1 Part 4) (26 October 2026)
- [x] 7.8 Say in the Privacy Policy that matching is a calculation, not a decision (from 7.4 and 5.40) — 30 October 2026

Owner tasks — not AI work

- [x] Enable branch protection on `main` — ruleset "Protect main", 7 October 2026
- [ ] Watch Supabase egress for a week after the quota reset
- [x] Decide the test framework before session 8 — Vitest
- [x] Decide whether the cookie consent banner is needed while no optional cookies are set: it stays (10 October 2026)

---

## Standing context

**Read this before starting any task below.**

### What this project is

IB Match — Next.js 16 (App Router, Turbopack), React 19, TypeScript 7, PostgreSQL on
Supabase via Prisma 7, NextAuth v5, Algolia, Upstash Redis, Resend, Stripe, hosted on
Vercel. `AGENTS.md` at the repo root is authoritative: **this is Next.js 16 and it
differs from training data. Read `node_modules/next/dist/docs/` before writing code
that touches framework behaviour.** That directory is the installed version's own
documentation and has been correct every time it was consulted.

### State as of 30 August 2026

| | |
|---|---|
| Vulnerabilities | **0** again since 6.9 (27 October 2026). 12 had been published since 6.4 left 0: 6.8 closed `next`'s critical ones and `sharp`, 6.9 the other ten. Before that, session 3 closed all 4 high, session 4 closed `qs` with Stripe 22, session 5 closed the last moderate (`@humanfs/node`, via eslint) |
| Type check / lint / format | clean — 0 errors, 0 warnings |
| CI | type-check, lint (`--max-warnings 0`), `prettier --check`, both test suites, and a production build against a throwaway Postgres |
| Tests | Vitest 5 (`npm test`), the only suite since 7.1 Part 4 moved the matching algorithm's scripts into it (26 October 2026). Session 8 added tests to CI; before that CI ran none |
| Migrations | 5, and a fresh database can be rebuilt from them |
| Rate limits | 61 of 62 API routes (Stripe webhook excluded deliberately) |
| Programs cache | working — ~2.2 MB payload, 6-hour TTL |
| Dependency majors | `prisma` 7, `stripe` 22, `lucide-react` 1 and `typescript` 7 all landed. The `prisma-client` generator (6.6) too. `next` 16.4 (6.8), the advisories (6.9) and Node 24 everywhere (6.10). npm 12's `allowScripts` list (6.7). Left in phase 6: 6.11 (`eslint-config-next` 16.4, after R.2) |
| Branch protection | **on** since 7 October 2026 — ruleset "Protect main": a pull request is required, and so are the three CI checks and Vercel, with the branch up to date; deletion and force pushes are blocked; no bypass |

### Hard rules — production safety

The local `.env` points at the **production** Supabase database. There is no separate
development database. Every Prisma command run from this directory hits production.

1. **Never run `prisma migrate dev`.** It offers to reset the database when it detects
   drift. Use `migrate deploy` to apply and `migrate diff` to inspect; both are safe.
2. **Never run `prisma db push`** against production. That is what broke the migration
   history in the first place; it took a whole phase to repair.
3. **The Prisma CLI reads `.env` only** — `.env.local` is a Next.js convention. A
   `DIRECT_URL` that works for the app can still fail every migrate command with
   `P1001`.
4. **Destructive SQL needs explicit approval** from the user, plus a backup taken
   first. Prepare it, explain it, let them run it.
5. Schema changes go through a migration file, never a direct `ALTER`.

### Hard rules — cost

Supabase is on the **free tier: 5 GB egress per month**. It was exceeded every month
from December 2025, which restricted Storage and broke every university image. The
cause was application code, not traffic. `instrumentation.ts` called
`warmProgramsCache()` on every server start, and on Vercel every cold start is a server
start, so the full catalogue was re-read from Postgres about 600 times a day. Until
August that read used `include` and moved about 3 MB; after it, about 1.2 MB. Found
1 October 2026 from `pg_stat_statements`, and the hook removed.

1. **Nothing may read the whole catalogue per server start or per request.** The
   programs cache lives in Redis and fills itself on a miss. To attribute egress, rank
   `pg_stat_statements` by `rows` (read-only, via `DIRECT_URL`): a full-table query —
   `WHERE $2=$3 OFFSET $1` — with a high call count is the signature.
2. **Never `SELECT` whole tables from production to inspect them.** Use aggregates —
   `count()`, `sum(length(col))`, `max()`. A single careless `findMany` with `include`
   can move tens of megabytes.
3. **Prefer `select` over `include`** in every new query. `include` returns every
   column of every joined row, which roughly tripled the size of each of those reads.
4. **`npm run build` queries the production database** — `app/ib-university-requirements/page.tsx`
   is prerendered and calls Prisma. Builds are cheap but not free; don't loop them.
   CI builds against its own throwaway Postgres and costs nothing.
5. **Never store binary data in a database column.** Images belong in Supabase
   Storage as URLs. One 537 KB base64 image joined across 68 programs pushed
   the cache payload to 38 MB, past Upstash's 10 MB limit, so the cache never saved and
   every request read the database as well.
6. Keep AI sessions scoped. Each task below names the files to read so a session does
   not have to explore the whole repo to start work.

### Verification commands

Every task's **Verify** section assumes these. All are free and hit no external service
except the build:

```bash
npx tsc --noEmit                 # must be 0 errors
npx eslint .                     # must be 0 errors
npx prettier --check .           # must be clean
npm run build                    # must exit 0
npm audit                        # compare against the baseline in the task
npm test                         # Vitest: every *.test.ts file, the matching algorithm's too
```

`npm run dev` and `npm start` both work with no extra variables. Auth.js v5 auto-trusts
the host only in dev and on Vercel, so `lib/auth/config.ts` sets `trustHost: true`
explicitly (task 5.4). Without that, every `/api/auth/*` route returns 500 with
`UntrustedHost` outside those two environments.

### Working agreement

One task per branch, one PR, CI green before merge. **Merging `main` deploys to
production.** Do not commit to `main` directly.

---

## Phase 5 — Quick wins

Small, independent, low risk. Good first sessions. None of them touch the database.

### 5.1 — Use the router for internal navigation

**Outcome:** No page does a full browser reload to move between internal routes, and
CI fails if a new one appears.

**Why:** 11 uses of `window.location.href`, 7 of which ESLint flags via
`@next/next/no-location-assign-relative-destination`. Each throws away the client-side
router: full document reload, re-download, re-hydrate. They are the only warnings CI
reports, which is why `--max-warnings 0` cannot be enabled yet.

**Read first:** `node_modules/next/dist/docs/01-app/` — the routing and `useRouter`
pages.

**Files:** `app/auth/signin/page.tsx`, `app/auth/coordinator/page.tsx`,
`app/student/matches/RecommendationsClient.tsx`,
`app/universities/[id]/UniversityDetailClient.tsx`,
`components/admin/coordinators/CoordinatorsListClient.tsx`.

**Steps:**
1. `npx eslint . 2>&1 | grep no-location-assign` to get the exact list.
2. In client components, replace with `useRouter().push()`. In server components or
   the render phase, use `redirect()`.
3. Check each site individually — some sign-in paths assign a URL returned by
   NextAuth's `signIn()`, which may legitimately be external. Those should stay, and
   get a targeted `eslint-disable-next-line` with a one-line reason.
4. Once the count is zero, change the CI lint step to `npm run lint -- --max-warnings 0`.

**Verify:**
- `npx eslint .` reports **0 errors and 0 warnings**
- `npm run build` exits 0
- Manually: sign in, then use each changed control and confirm the page transitions
  without a full reload (the browser tab spinner should not restart)

**Guardrails:** Behaviour change on auth paths. Test sign-in end to end before merging.

**Session size:** Small.

---

### 5.2 — Delete the unused admin programs API route

**Outcome:** `GET /api/admin/programs` is gone; nothing regresses.

**Why:** Nothing in the codebase calls it. The admin page queries Prisma directly in
`app/admin/programs/page.tsx`. The handler still uses `include`, so it would transfer
~17 MB if it were ever hit. Dead weight with a sharp edge.

**Files:** `app/api/admin/programs/route.ts` — **the `POST` handler in this file is
live and creates programs. Only `GET` is dead.**

**Steps:**
1. Re-confirm nothing calls it: `grep -rn "api/admin/programs" --include="*.tsx" --include="*.ts" app components`.
   Expect hits only for `POST` (`components/admin/programs/ProgramForm.tsx`) and for
   page links under `/admin/programs`.
2. Delete only the `GET` export and any imports it alone used.

**Verify:** type-check, lint, build all clean; open `/admin/programs` and confirm the
table still renders; create a program and confirm `POST` still works.

**Session size:** Small.

---

### 5.3 — Remove the redundant Cache-Control on Next's own static assets

**Outcome:** The build no longer warns about custom headers on `/_next/static`.

**Why:** Next 16.3 warns that a custom `Cache-Control` on `/_next/static/:path*` can
break development behaviour. Next already serves those fingerprinted assets as
immutable, so the block adds nothing.

**Read first:** `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/headers.md`

**Files:** `next.config.ts` — the `/_next/static/:path*` entry only. **Leave the other
cache entries alone**; the ones for images, fonts and the API routes are deliberate.

**Verify:** `npm run build` output no longer contains "Custom Cache-Control headers
detected"; `curl -I` a `/_next/static/...` asset from `npm start` and confirm it still
has a long-lived cache header (Next sets its own).

**Session size:** Very small. Good to combine with 5.2.

---

### 5.4 — Set `trustHost` explicitly in the auth config

**Outcome:** A production build runs correctly outside Vercel without an extra
environment variable.

**Why:** Auth.js v5 does not take host trust from `NEXTAUTH_URL` — that is the v4
name. It auto-trusts only in development and on Vercel, so `npm start` anywhere else
returns 500 on every `/api/auth/*` route. Today that is worked around with
`AUTH_TRUST_HOST=true`, which means the app depends on a Vercel environment variable
for correctness.

**Files:** `lib/auth/config.ts`. Also update the `AUTH_TRUST_HOST` notes in
`.env.example` and `README.md` once it is no longer needed.

**Steps:** Add `trustHost: true` to the NextAuth config. It is safe here because the
app is served from a known host behind Vercel; document that reasoning in a comment.

**Verify:**
```bash
npm run build && npm start          # deliberately WITHOUT AUTH_TRUST_HOST
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/api/auth/providers
```
Expect **200**, not 500. Then confirm sign-in still works in `npm run dev`.

**Session size:** Small.

---

### 5.5 — Restore the University of Manchester image

**Outcome:** All 57 universities have a working image.

**Why:** That row held a 537 KB base64 image which was multiplied across its 68
programs and broke the cache. The column was set to `NULL` to stop the bleeding, which
discarded the only copy. It currently renders the placeholder icon.

**Depends on:** Supabase Storage being out of restriction (quota reset was due
2 September 2026). Check first:
```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  "https://<project>.supabase.co/storage/v1/object/public/university-images/<any-known-file>"
```
`402` means still restricted — stop and report. **Still 402 on 24 September 2026**, with
`exceed_egress_quota` in the body.

**Steps:** Either restore the base64 from the Supabase backup taken before the `UPDATE`
and then run `npx tsx scripts/fix-university-images.ts` to move it to Storage, or
re-source the photo and upload it through the admin UI, which now converts to Storage
automatically.

**Verify:** the row's `image` starts with `https://`, not `data:`; the image renders on
a Manchester program card; `SELECT count(*) FROM "University" WHERE image LIKE 'data:%'`
returns **0**.

**Guardrails:** Do not paste base64 into the database. The admin route now returns 502
rather than storing it, and that is intentional.

**Session size:** Small, but partly a human task.

#### Status, 5 October 2026 — done (by the owner)

The owner re-sourced the photo and uploaded it in `/admin/universities` after Storage started
answering again (CONTENT 5.1 found it at 200 on 4 October). Verified: the row's `image` is a
Storage URL; a live Manchester program page serves it (200, `image/jpeg`);
`SELECT count(*) FROM "University" WHERE image LIKE 'data:%'` returns 0, and every university now
has an image. The admin save's background Algolia sync did not finish: all 68 Manchester records
still had no image until `syncUniversityProgramsToAlgolia` ran from a script and the programs cache
was cleared. One base64 value is left in a column, the University of Toronto's `logo`: CONTENT 1.1
step 3 (`scripts/fix-university-images.ts`) can now run.

---

### 5.6 — Make the Algolia status script read every record

**Outcome:** `npx tsx scripts/check-algolia-status.ts` reports a program as missing from
Algolia only when it really is.

**Why:** Found in content session 12 (29 September 2026). The script reads the index with
a single `client.browse` call and `hitsPerPage: 1000`, and never follows the cursor. With
1,279 programs it saw 1,000 records and listed the other 279 as "Missing from Algolia",
although the database and the index both held 1,279 and every spot-checked record was
current. Its count lines are right; only the missing list is wrong. Every content session
uses the Algolia check to verify a refresh, so a list of false alarms will either be
ignored or chased.

**Files:** `scripts/check-algolia-status.ts`. `scripts/find-algolia-orphans.ts`, which
checks the other direction (in Algolia, not in the database), already pages correctly
with `browseObjects` and an `aggregator`. Copy that.

**Steps:**
1. Replace the single `browse` call with `browseObjects`, collecting every `objectID`.
2. Print how many records were read, and say so if it differs from the index's
   `entries` count, so a paging bug cannot hide again.
3. Optional: also list records in Algolia but not in the database, so one script answers
   both questions. If you do, say in the header that `find-algolia-orphans.ts` covers the
   same ground, or remove that script if nothing else uses it.

**Verify:** the script reports as many Algolia IDs as the index has records (1,279 on
29 September 2026) and "All programs are in Algolia". It reads production and Algolia
only, and writes nothing. Selecting `id` and names for every program is a few hundred KB;
keep the `select`, never `include`.

**Session size:** Tiny. Fold into any session.

**Done 22 October 2026.** `check-algolia-status.ts` reads with `browseObjects` and warns when the
records it read differ from the index's `entries`. Step 3 was left out: `find-algolia-orphans.ts`
stays the check for the other direction, since 5.9 and `docs/admin/maintenance-tools-guide.md` use
it. Run on 22 October 2026: 1,677 programs in the database, 1,677 entries and 1,677 IDs read, "All
programs are in Algolia".

---

### 5.7 — Show each option's level and grade in mixed subject groups

**Outcome:** A subject group whose options differ in level or grade ("Mathematics at HL 5,
or at SL 6") shows each option with its own level and grade on the student's program card.

**Why:** Found in content session 13 (29 September 2026). The OR-group branch of
`components/student/ProgramCard.tsx` lists every option's course name, then prints the
*first* option's level and grade under all of them. Edinburgh Psychology BSc now shows
"Mathematics: Analysis and Approaches or Mathematics: Applications and Interpretation or
Mathematics: Analysis and Approaches or Mathematics: Applications and Interpretation — HL •
Required: 5", which hides the SL 6 route and repeats the names. On 29 September 2026, 148
groups in 112 programs mixed levels or grades (the refresh tool writes them as `anyOf`;
3.3 found 73 before phase 4). The data and matching are right, and the admin page
(`app/admin/programs/[id]/page.tsx`) already lists each option with its own level and grade.

**Growing with phase 4.** After content 4.5 (30 September 2026), **436 groups in 332 programs**
mix levels or grades, and **183 of them name the same course twice** at different levels or
grades. With no levels shown, those read as a repeated name: HKUST BBA in Marketing shows
"English B or English B" for "English B at HL 4 or SL 5". Each remaining phase 4 session adds
more, so the count will keep rising until this is fixed.

**Files:** `components/student/ProgramCard.tsx`, the `else` branch that renders
`group.requirements` (the card is used on the program page, search, saved programs and
matches). `app/programs/[id]/page.tsx` also keeps only the *first* option of each group when
it builds the meta description ("HL English A: Literature 5, ...") and the JSON-LD `Course`
list, so a mixed group is misstated there too: list the options, or leave the group out.
Check whether any other student-facing view renders requirement groups the same way.

**Steps:**
1. When a group's options share one level and grade, keep today's compact line.
2. Otherwise, list each option with its level and grade, or collapse options that share
   one ("Mathematics AA or AI — HL 5 · or SL 6").
3. Name a course once when the group lists it at several levels or grades ("English B —
   HL 4 or SL 5").
4. Fix the meta description and JSON-LD in `app/programs/[id]/page.tsx` the same way, sharing
   the helper.
5. Cover the grouping with a Vitest test on a pure helper, not the component.

**Rebranding.** The redesign is built on `main` behind a preview switch, next to the old screens, so today's
`ProgramCard` stays live for students until release day. Do this task in full on `main`; it
is prep P6 in `REBRANDING_tasks.md`. Rebranding 2.2 then reuses the helper in its new requirement
checklist.

**Verify:** Edinburgh Psychology BSc (`/programs/cmkcynsdg00197moeu7aoktel`) shows the HL 5
and SL 6 routes for Mathematics; HKUST BBA in Marketing (`/programs/cmkv8bnwd004b7mpof3j9s1q2`)
shows English B once, "HL 4 or SL 5", not "English B or English B"; a single-level group, such
as the science group on Manchester BSc Psychology (`/programs/cmkf6zfvq007d7msfu768e1dk`), is
unchanged. No database access.

**Session size:** Small.

**Done, 7 October 2026.** `groupRequirements` in `lib/programs/requirement-groups.ts` turns the rows
into requirements, each with its options, each option with the levels and grades it is accepted at.
Courses accepted at the same levels and grades share an option, so a course is named once:
"Mathematics: Analysis and Approaches or Mathematics: Applications and Interpretation — Required: HL 5
or SL 6". A group whose options differ lists each with "or" between them. One course or group at one
level and grade keeps today's line, "HL • Required: 5". Vitest covers the cases in
`requirement-groups.test.ts`. All three pages above checked logged out.

The logged-in tiles showed one option only, and the matches card could show the wrong one: the matcher
returns the matched course, not its level, so English B matched at SL 5 showed as "HL • Required: 4".
Both logged-in tiles now show the student's course at every level and grade the group accepts it, and
the whole group when the student took none of its courses. On the program page, among the courses the
student took, a close one (orange) now beats one further off, so the status speaks to the nearer route.

The meta description lists each group's options and puts the level after the course ("Physics HL 6",
was "HL Physics 6"); a long group pushes it to the existing fallback without subjects, where it used to
name the first option as if it were required. JSON-LD has one `Course` per requirement, naming every
course the group accepts. The meta keywords still take each group's first option: they carry no grade.

---

### 5.8 — Use the IB core points matrix for TOK and the Extended Essay

**Outcome:** Every place that adds TOK and Extended Essay points to a student's total uses
the IB's core points matrix, in one shared helper. A grade E in either blocks saving, with a
message that it is the IB's failing condition, instead of being quietly scored. The stored
totals the old formula got wrong are corrected.

**Why:** Reported by the owner on 2 October 2026 for `/student/onboarding`. The core points
are not a sum of two grades. The IB awards 0-3 points from a fixed matrix, and an E in TOK
or the EE is a failing condition (no diploma):

| TOK \ EE | A | B | C | D | E |
|---|---|---|---|---|---|
| **A** | 3 | 3 | 2 | 2 | failing |
| **B** | 3 | 2 | 2 | 1 | failing |
| **C** | 2 | 2 | 1 | 0 | failing |
| **D** | 2 | 1 | 0 | 0 | failing |
| **E** | failing | failing | failing | failing | failing |

Confirm it on the IB's "DP passing criteria" page before coding. `ibo.org` answers curl and
WebFetch with 403, so open it in a browser or ask the owner. The search index confirms A/A = 3
and that an E is failing.

The app has two formulas, both labelled "simplified", and they are wrong in opposite
directions:

- **Onboarding undercounts.** `app/student/onboarding/FieldSelectorClient.tsx`
  (`calculateTotalPoints`) and `components/student/DetailedGradesInput.tsx` (`calculateTotal`,
  the "+N" the student sees) score A=5 … E=1 and take `min(3, max(0, TOK + EE - 6))`. That gives
  A/D 1 (should be 2), B/C and C/B 1 (2), B/D and D/B 0 (1), C/C 0 (1), and 0 for any E.
- **The coordinator's edit form overcounts.** `app/coordinator/students/[id]/edit/StudentProfileForm.tsx`
  maps A=3, B=2, C=1, D=0, E=0 and takes `min(TOK + EE, 3)`. That gives A/C, A/D, B/B and B/C 3
  (should be 2), B/D 2 (1), C/C 2 (1), C/D 1 (0), and 2-3 points for combinations with an E.

The APIs store whatever total the client sends (`app/api/students/profile/route.ts`,
`app/api/coordinator/students/[id]/route.ts`), and matching uses `totalIBPoints`. **In
production on 2 October 2026, 20 of the 140 profiles with six courses and both grades stored a
total one point low**: B/C ×8, C/B ×8, C/C ×3, B/D ×1, all from the onboarding formula. None
were high, so the coordinator form has not saved a wrong total yet. `QuickScoreInput` takes a
total the student types, so it has no calculation to fix.

**Files:** a new pure helper (for example `lib/ib/core-points.ts`), the three components
above, and their callers.

**Steps:**
1. Write the helper: TOK grade and EE grade in, points (0-3) or "failing" out, straight from
   the matrix. Cover all 25 combinations with a Vitest test next to it.
2. Use it in `FieldSelectorClient.tsx`, `DetailedGradesInput.tsx` and `StudentProfileForm.tsx`.
   Delete both local formulas and the coordinator's `GRADE_POINTS`.
3. **An E blocks saving** (owner's decision, 2 October 2026). When TOK or the EE is E, disable
   Continue / Save in the onboarding grades step, `DetailedGradesInput`, `QuickScoreInput` and the
   coordinator edit form. Say why: "A grade E in TOK or the Extended Essay is a failing condition:
   the IB does not award the diploma." Enforce it in the APIs too: `app/api/students/profile/route.ts`
   and `app/api/coordinator/students/[id]/route.ts` answer 400 for an E, so an old client cannot
   store one. No stored profile had an E on 2 October 2026, so nothing existing is locked out.
   Recheck with an aggregate count before shipping.
4. Consider recomputing the total server-side when a request carries six courses and both
   grades, so a stale client cannot store a wrong total again.
5. Correct the stored totals. Prepare a script that recomputes `totalIBPoints` only for
   profiles with six courses and both grades whose total differs. It takes a backup first,
   is a dry run by default and has `--apply`. **The owner approves before it runs**; it writes
   production. Then clear the cached matches (`clearAllMatchCache`), since they used the old
   totals. Use aggregates and `select` throughout.

**Verify:** the Vitest test covers all 25 combinations. On `/student/onboarding`, six subjects
totalling 36 with TOK B and EE C show "+2" and a total of 38 (today: "+1", 37). The coordinator
edit form shows the same total for the same grades. Choosing E for TOK or the EE disables saving
with the failing-condition message on every form, and a direct request with an E gets a 400 from
both APIs. After the data fix, re-running the
comparison query finds 0 of the 140 profiles off the matrix. `npm test`, `npx tsc --noEmit` and
`npx eslint .` pass.

**Session size:** Small. Code, a test and a 20-row data fix that needs the owner's approval.

**Done, 7 October 2026** (with 5.13). The helpers are `lib/ib/core-points.ts` and `lib/ib/diploma.ts`;
both APIs now compute the total themselves when a request carries six courses and both grades, and the
coordinator form offers its manual override only while a profile is incomplete. The data fix is
`scripts/fix-core-points-totals.ts`. Its dry run found 20 of 141 profiles off the matrix, all +1 (C/B ×8,
B/C ×8, C/C ×3, B/D ×1), and no profile with an E. The owner approved it, and `--apply` ran after the
code was deployed (PR #58): the dry run matched row for row, 0 of 141 are now off the matrix, and the
match cache was cleared. The backup of the 20 old totals is
`scripts/backups/fix-core-points-totals/2026-10-07T13-08-42-931Z.json`, on the owner's machine only
(git-ignored); `--restore` puts them back.

---

### 5.9 — Remove what the December 2025 sample seed left behind

**Outcome:** Nothing from the sample seed remains in production or in either Algolia index, and
the universities sync can no longer leave records behind.

**Why:** Asked by the owner on 4 October 2026, after content task 5.1 found four records in
Algolia's `universities_production` index that no `University` row has. On 6 December 2025,
`scripts/seed-programs.ts` (commit `76799af`, since deleted) created five sample universities
(Harvard, Oxford, Toronto, the Australian National University, ETH Zurich) and 20 sample programs,
and pushed them to Algolia. What is left, checked with aggregates on 4 October 2026:

| Where | What | Action |
|---|---|---|
| `universities_production` | 69 records for 65 universities. Orphans: `cmiudaqh700037m7zlgiho4os` University of Oxford, `cmiudarnn00097m7zpyjwfc3x` ETH Zurich, `cmiudar5900077m7zgzbep90n` Australian National University, `cmiudaq8w00017m7zoh7723vr` Harvard University | Delete |
| `University` | One seeded row, University of Toronto (`cmiudaqto00057m7zzmkvdl3j`), now holding 40 real programs added in 2026 | **Keep.** Its logo moved to Storage on 5 October 2026 (CONTENT 1.1) |
| `AcademicProgram` | No program created before 2026; the 20 sample programs are gone | Nothing |
| `programs_production` | 1,305 records for 1,305 programs | Confirm with the orphan script |
| `User`, `IBSchool` | One user and one school match "test" in a name or email; one user predates 2026 (likely the owner's account) | List for the owner; delete nothing unasked |

`searchUniversities` in `lib/algolia/search.ts` has no caller, so students never see the orphans,
but `scripts/sync-universities-algolia.ts` only upserts, so nothing removes them.

**Files:** `scripts/find-algolia-orphans.ts` (programs only today), `scripts/sync-universities-algolia.ts`.

**Steps:**
1. **Inventory.** Extend `find-algolia-orphans.ts` to check `universities_production` as well (an
   `--index` option, or both in one run), reading every record with `browseObjects`. Re-run the
   aggregate checks above; production moves. Grep git history for any other script that wrote
   sample data (`git log -i --grep=seed`).
2. **The owner approves the deletion list.** Show each record and why it is an orphan. Ask about the
   "test" user and school; they may be real.
3. **Back up, then delete.** Algolia records are not in the database backup: save the orphans' JSON
   to `scripts/backups/` (git-ignored) first, then delete them with `--delete`. If any database row is
   approved for deletion, take a Supabase backup first (hard rule 4) and delete with `select`ed ids,
   never a broad `WHERE`.
4. **Stop it recurring.** Make `sync-universities-algolia.ts` delete records whose id has no
   `University` row after it saves (or use `replaceAllObjects`), and print how many it removed.

**Verify:** `universities_production` holds as many records as there are universities (65 on
4 October 2026); the orphan script reports none in either index; the University of Toronto and its
40 programs are untouched; the program search and a Toronto program page still work.

**Guardrails:** Destructive. Nothing is deleted before the owner approves the list and the backup
exists. Never delete the Toronto row: its 40 real programs and their 5 student saves (4 October 2026) hang off it.

**Session size:** Small.

**Done 22 October 2026.** `find-algolia-orphans.ts` checks both indexes in one run (`--index
programs|universities` for one), reads every record with `browseObjects`, and with `--delete` saves
the orphans' full records to `scripts/backups/` before deleting them. `sync-universities-algolia.ts`
now deletes every record whose id has no `University` row after it saves, and prints the count.

The inventory on 22 October 2026: 104 universities, and Toronto is still the only row from before
2026, with 40 programs and 7 student saves. No program predates 2026. `programs_production` had
1,677 records for 1,677 programs and no orphans. `universities_production` had 108 records: the same
four sample universities as on 4 October. `git log -i --grep=seed` found no other sample data. The
January 2026 "seed scripts" commits added real universities' programs, and the orphan check covers
whatever they wrote.

The owner approved the list. The four records were saved to
`scripts/backups/algolia-orphans-universities_production-2026-10-22T11-23-18-765Z.json` and
deleted. Afterwards the sync ran (104 saved, 0 removed, 104 entries) and the orphan script reported
none in either index. Toronto's row, programs and saves were unchanged; its program and university
pages load in production, and a program search finds its programs. No database row was deleted, so
no Supabase backup was needed.

The owner chose to **keep** the "test" accounts: they are a demo set-up for coordinator calls, not
seed leftovers. They are the school "Test School | Demo and feedback call with IB coordinator",
with 6 students and 1 coordinator, and the user "Test IB Coordinator" (a coordinator), both created
30 January 2026. The one user from before 2026 is the platform admin.

---

### 5.10 — Give the older university images a one-year cache

**Outcome:** Every university image and logo in Storage is served with
`cache-control: max-age=31536000`, at the same URL as today.

**Why:** Found in CONTENT 1.1 on 5 October 2026. Commit `a4103e7` (1 October) made new uploads
cache for a year (`lib/supabase/storage.ts`), but objects keep the header they were uploaded with.
Of the 66 objects the `University` rows point at, **56 still say `max-age=3600`**: every image
uploaded before 1 October, 14.2 MB in all, 259 KB on average, the largest 492 KB. The other ten
(Toronto's logo and the nine images uploaded on 4–5 October) already say a year.

The same commit already covers the optimizer path, which is most traffic: `minimumCacheTTL` is
31 days (`next.config.ts`), so Vercel re-fetches a source at most once per width per 31 days
whatever its header says. The one-hour header still matters wherever a raw Storage URL leaves the
site: `og:image` on the program and university pages (`app/programs/[id]/page.tsx`,
`app/universities/[id]/page.tsx`), their JSON-LD `image`, and the admin forms that render
`unoptimized`. Whatever fetches those URLs, Supabase's CDN or the client, may only reuse its copy
for an hour, and each fetch from the origin is billed egress. The saving is small. The fix
costs one 14 MB download and changes nothing else.

**Files:** a new `scripts/fix-image-cache-control.ts`, committed like
`scripts/fix-university-images.ts`; `lib/supabase/client.ts` for `getSupabaseClient` and the bucket name.

**Steps:**
1. **Dry run by default** (the `--apply` convention of `scripts/programs/add-universities.ts`). Read
   every `University` `image` and `logo` with `select`, take each URL's object path in the
   `university-images` bucket, and read that object's `metadata.cacheControl` from the bucket's
   `list()`. No download is needed to find them. Print each one still on `max-age=3600`. Ignore
   objects no row points at; that cleanup is separate.
2. **Re-upload each object's own bytes to its own path.** `download(path)`, then
   `upload(path, bytes, { upsert: true, cacheControl: '31536000', contentType })` with the stored
   mimetype. The URL does not change, so no database write, no Algolia sync and no programs cache
   invalidation are needed. Keep the downloaded bytes in the scratchpad until step 3 passes.
3. **Do one object first**, check it (below), then the rest. Print a count at the end.

**Verify:**
- The dry run lists **0** objects on `max-age=3600` afterwards.
- `curl -s -r 0-0 -o /dev/null -D - "<url>?v=check"` shows `cache-control: max-age=31536000`. The
  query string skips Supabase's CDN copy, which can keep the old header for up to an hour. Each
  object's size is unchanged.
- The `University` rows' URLs are identical before and after (compare the list).
- A university page, a program card in search and a program page's `og:image` still show the image.

**Guardrails:** Never change a filename or URL; that would need a database write and an Algolia sync
for every program. Never delete an object here. Do not run this while someone is uploading images
in `/admin/universities`.

**Session size:** Tiny.

**Done 22 October 2026.** `scripts/fix-image-cache-control.ts` is a dry run by default; `--apply`
re-uploads, `--only <path>` limits it to one object, and the downloaded bytes go to
`--backup-dir` (default `scripts/backups/image-cache-control/`, git-ignored) before each upload.
After applying, it reads the bucket's metadata back and checks the header, size and mimetype.
Production had moved since 5 October: the rows pointed at 104 objects, 50 already on a year and
**54** on `max-age=3600` (14.0 MB). One went first (UCL's image), then the other 53. Afterwards
the dry run listed 0, the 104 `University` URLs were byte-for-byte the same, every served size
matched its backup, and a university page, a program page's `og:image` and the optimizer still
served the image.

One correction to **Verify**: a query string does **not** skip Supabase's CDN. `?v=check` came
back `cf-cache-status: HIT` with the old header and January's `last-modified`, and so did the
authenticated endpoint. The CDN holds its copy until the old one-hour header runs out. Check the
metadata `list()` returns, which the script reads, then the public URL an hour later. Here it
took minutes: by 12:57 all 104 public URLs served `public, max-age=31536000`.

---

### 5.11 — Send school logos to Storage, as university logos already go

**Outcome:** A school logo uploaded in `/admin/schools` is stored as a Storage URL, never as base64,
and the schema says so.

**Why:** Found in CONTENT 1.1 on 5 October 2026. Nothing is wrong in production yet: there is one
school and it has no logo. But `IBSchool.logo` is documented as "Base64 encoded image data (max
~500KB)" in `prisma/schema.prisma`. The admin forms (`components/admin/schools/SchoolForm.tsx`,
`SchoolEditForm.tsx`) read the file into a data URL, and both admin routes store whatever arrives
(`app/api/admin/schools/route.ts:132`, `app/api/admin/schools/[id]/route.ts:175`). That is how
Toronto's 365 KB logo reached the `University` row, the pattern in "Hard rules — cost". The first
school logo uploaded would move up to 500 KB on every read of the whole row:
- every load of the coordinator dashboard (`app/coordinator/dashboard/page.tsx:45` includes the school)
- every Stripe webhook (`app/api/webhooks/stripe/route.ts` finds and updates the school without `select`)
- the admin school list (every school's logo at once) and the admin school routes' responses

The student settings and invitations pages select the logo on purpose, to show it.

**Files:**
- `app/api/admin/schools/route.ts` (POST) and `app/api/admin/schools/[id]/route.ts` (PUT): the writes
- `app/api/admin/universities/route.ts` and `app/api/admin/universities/[id]/route.ts`: the rule to
  copy, with a `route.test.ts` next to each
- `lib/supabase/storage.ts`: `uploadUniversityImage` and `isBase64Image`
- `prisma/schema.prisma`: the comment on `IBSchool.logo`

**Steps:**
1. **Upload, or refuse.** In both routes, upload a base64 logo with `uploadUniversityImage` and
   store the URL. Use the key `school-<id>-logo` on update and `temp-<timestamp>-school-logo` on
   create, which has no id yet, as the university create route does. Use the same bucket; a second
   bucket is setup with nothing gained. If the upload fails, return 502 and save nothing. Store a
   URL as it arrives. On update, do not re-upload a logo equal to the stored one: the edit form sends
   it back on every save, and the university `[id]` route already handles this.
2. **Correct the schema comment** to match `University.logo` ("Public Supabase Storage URL. Never
   base64"). It is a comment, so no migration.
3. **Test both routes** with Vitest, mocking `@/lib/prisma` and the storage module as the university
   route tests do: base64 is uploaded and the URL stored; a failed upload returns 502 and writes
   nothing; a URL is stored as it is; an unchanged logo is not re-uploaded.
4. **Check production again before shipping.** If any school has gained a `data:` logo since
   5 October, migrate it the way `scripts/fix-university-images.ts` migrates universities. Do not
   `NULL` it.

**Verify:**
- `SELECT count(*) FROM "IBSchool" WHERE logo LIKE 'data:%'` returns **0**.
- `npm test` passes, and the usual `tsc`, ESLint, Prettier and build checks are clean.
- Only if the owner agrees, since the only school may be real: upload a logo in `/admin/schools`.
  The row holds an `https://` URL, and the logo shows on the school's admin page and on a student's
  settings page.

**Guardrails:** Never store base64 as a fallback when Storage fails; the 502 is intentional, as for
universities. Switching the whole-row reads above to `select` is not needed once the column holds
URLs. Leave them unless the file is open anyway.

**Session size:** Small.

**Done 22 October 2026.** `POST /api/admin/schools` and `PATCH /api/admin/schools/[id]` (the task
said PUT; the route is PATCH) upload a base64 logo with `uploadUniversityImage`. They use the key
`temp-<timestamp>-school-logo` on create and `school-<id>-logo` on update, and store the URL. A
failed upload returns 502 and writes nothing. A URL is stored trimmed, an empty logo clears it, and
an unchanged logo is not uploaded again. Each route uploads only after its other checks pass, so a
refused request leaves no stray object in Storage. The edit route's existence check now `select`s
`id` and `logo` rather than reading the whole row. `IBSchool.logo`'s schema comment matches
`University.logo`; it is a comment, so there is no migration. There are 11 Vitest cases in a
`route.test.ts` next to each route.

Step 4: production had 1 school and no logo at all (`count(*) FILTER (WHERE logo LIKE 'data:%')` =
0), so nothing needed migrating. The live upload check in **Verify** was not done: the only school
is the coordinator demo set-up, and it is the owner's call whether to give it a logo.

---

### 5.12 — Show every match, not only the top 10

**Outcome:** A student sees every match the algorithm returns, up to a generous bound, and the page
no longer says "Showing top 10".

**Why:** Owner's screenshot, 6 October 2026: "We found 14 programs matching your profile. Showing
top 10." Nothing on the page reaches the other four. `app/api/students/matches/route.ts:124` does
`matches.slice(0, 10)`. Program data comes from the Redis programs cache (`getCachedPrograms`), not
Postgres, so returning more costs **no extra database reads**; only the JSON grows, by about 1-2 KB
per match.

**Files:** `app/api/students/matches/route.ts`, `app/student/matches/RecommendationsClient.tsx`,
and `lib/matching/` (`getCachedMatchesV10`) to learn what `matches` contains.

**Steps:**
1. Read what `getCachedMatchesV10` returns. `totalMatches` was 14 in the owner's case, so it is
   already filtered, not the whole catalogue. Confirm the filter, and say in the PR what it is.
2. Return all of them, with a named constant as an upper bound (50). Keep `totalMatches` and
   `returnedCount` honest.
3. Change the heading copy: "14 programs match your profile". The redesign groups them later
   (`REBRANDING_tasks.md` phase 2); this task only stops hiding them.
4. Check the matches cache (`lib/matching/cache.ts`) still stores what it stored. If it holds only the top
   10, raise it to match.

**Verify:** for a profile with more than 10 matches, every one appears and the counts agree. The
response stays under about 100 KB. `npx tsx scripts/run-all-tests.ts` and `npm test` pass.

**Session size:** Small.

**Done, 7 October 2026.** The route returns every match up to `MAX_MATCHES_RETURNED` (50, in
`lib/matching/cache.ts`), and past it the page says "63 programs match your profile. Showing the best
50." Step 1's filter is the V10 candidate filter in `lib/matching/optimized-matcher.ts`: programs
within about 10 points of the student's total (5-point buckets, plus every program with no minimum), in
their fields and countries, relaxed in tiers until at least 10 remain. Every candidate is scored and
none is dropped for its score. The matches cache already stored the whole list (step 4).

Measured on the 142 profiles with courses, against the 1,367 cached programs: a profile has 63 matches
at the median, 217 at p90 and 592 at most; 141 had more than 10, and **77 still have more than 50**.
A match is about 3.3 KB of JSON (program 1.7 KB, academic match 1.1 KB), not 1-2 KB, so 50 matches
are 134 KB at the median and 274 KB at most. Vercel serves the route brotli-compressed: 7 KB at the
median and 12 KB at most on the wire. The 100 KB bound holds for what is sent, not for the raw JSON.
Rebranding 2.2 should expect lists longer than 50.

The coordinator's view of a student's matches (`app/api/coordinator/students/[id]/matches/route.ts`)
still shows the top 10. It runs the V9 path, which scores the whole catalogue, so its total is every
program; not changed here.

---

### 5.13 — Require 3 or 4 Higher Level subjects

**Outcome:** Onboarding, the coordinator's edit form and both profile APIs refuse a diploma without
3 or 4 HL subjects, and say why.

**Why:** Design audit 5.3. `validateDiploma` in `components/student/DetailedGradesInput.tsx` checks
grade 1s, 2s and 3s, the HL and SL point floors, the 24-point total and an E in the core, but not
the number of HL subjects. Six SL subjects fail anyway (0 HL points is under 12), but **two HL
subjects at 7 and 7 pass** (14 HL points), and so do five or six HL. The IB requires at least three
and at most four HL subjects. Confirm that on the IB's Diploma Programme pages before coding:
`ibo.org` refuses scripts, so open it in a browser or ask the owner.

**Files:** `components/student/DetailedGradesInput.tsx` (`validateDiploma`),
`app/coordinator/students/[id]/edit/StudentProfileForm.tsx`, `app/api/students/profile/route.ts`,
`app/api/coordinator/students/[id]/route.ts`. These are the same files as 5.8, so do the two together, and
put the diploma rules in one shared pure helper next to 5.8's core-points helper.

**Steps:**
1. Add the rule to the shared helper: "Take 3 or 4 subjects at Higher Level (you have 2)."
2. Use it in both forms and both APIs; the APIs answer 400.
3. Vitest: 2, 3, 4 and 5 HL subjects.
4. Check existing profiles with an aggregate (count of profiles whose HL course count is not 3
   or 4) and report it. Do not change stored data without the owner.

**Verify:** two HL subjects show the message and block saving; three and four pass. A direct API
request with two HL subjects gets a 400. `npm test` passes.

**Session size:** Small. Fold into 5.8.

**Done, 7 October 2026** (with 5.8). Step 4's count, from `scripts/fix-core-points-totals.ts`: of the
six-course profiles, 3 have two HL subjects, 123 three and 15 four. The three were left unchanged; they
see the message the next time they save.

---

### 5.14 — Delete unused student-side components

**Outcome:** No dead components, and none that link to routes that do not exist.

**Why:** Design audit 1.5. These have no importers (checked 6 October 2026 with grep):

- `components/shared/Header.tsx` and `components/shared/Footer.tsx`. They link to `/programs`,
  `/universities`, `/about`, `/pricing`, `/for-schools` and `/auth/signup`, none of which exist.
- `components/ui/animated-number.tsx`, `loading-wrapper.tsx`, `button-loading.tsx`.

**Keep** `components/student/MatchBreakdown.tsx`: it is also unused, but its logic becomes "Why this
match" in `REBRANDING_tasks.md` phase 2.

**Steps:** confirm each file still has no importer, delete it, and run the verification commands.

**Verify:** `tsc`, ESLint, Prettier, the build and both test suites pass.

**Session size:** Tiny.

---

### 5.15 — Decide how a missing HL level should score

**Decision, 7 October 2026 (owner): no change for now.** The rebranding's requirement-based status
groups put a level gap ("Missing a requirement") and a point gap ("Within reach") in different groups,
so students see the difference regardless of the score. Accepted until then: a level gap can show a
higher fit than a point gap, and 1 and 3 points short score the same. **The whole matching math will be
revisited later** as its own piece of work (now 5.43). The findings below are kept for that review.

**Outcome:** An owner decision, recorded here, on whether a requirement met only at the wrong level
(SL where HL is required) should rank below being a point short. If so, a scoring change with the
matching suite green.

**Why:** In the design audit (6 October 2026) the production matching code was run locally, unchanged,
for one student (38 points, Maths AA HL 6, Spanish B SL 6, …) against real programs and their
stored requirements. Criticality was left at the schema default, `isCritical = false`.

| Program | Gap | Overall |
|---|---|---|
| Trinity, Computer Science, Linguistics and a Language | language at HL, student has it at SL | **90%** |
| Oxford, Economics and Management | 1 point short | 88% |
| Cambridge, Economics | 3 points short | 88% |
| Imperial, Economics, Finance and Data Science | 1 point and 1 grade short | 77% |

Six other programs tied at 100%.

- **Level gaps outrank point gaps.** `calculateSLForHLScore` gives a level mismatch about 0.8 on that
  requirement, and the 0.9 "unmet requirements" cap is the binding limit. A level gap usually cannot be fixed in
  the final year; a point can.
- **Point gaps all score alike:** 1 and 3 points short both come out at 88%.

The redesign groups matches by status first, so this affects order within a group. It still
affects which programs are recommended at all.

**Read first:** `lib/matching/subject-matcher.ts`, `penalties.ts`, `categorization.ts` (V10
`SAFETY`/`MATCH`/`REACH`/`UNLIKELY`), `docs/matching/DOC_2_matching-algo XI.md` and
`docs/matching/matching-algo-rollback-plan.md`.

**Steps:**
1. Research only: list two or three options, with the rankings each produces for the table above
   and a few more real profiles. Use local runs of `calculateMatch`; no database writes.
2. The owner decides.
3. Implement, extend the matching tests (`lib/matching/*.test.ts`), follow the rollback plan, and
   clear the match cache (`clearAllMatchCache`).

**Verify:** `npm test` passes with the new cases. The table above re-run shows the
agreed order.

**Session size:** Research small; the change small to medium.

---

### 5.16 — Suggest the field of study in the admin program forms

**Outcome:** In `/admin/programs`, a program's field follows the fields-of-study rule by default.
Typing a new program's name pre-selects the field the rule gives. Choosing another field, on the new
or the edit form, shows why the rule disagrees. The bulk upload preview flags each row whose field
disagrees. Nothing is blocked: an admin can keep a different field.

**Why:** `CONTENT_tasks.md` 8.1 (7 October 2026) gave each discipline one field of study and re-filed
135 programs. The refresh tool's dry run warns when a program's field disagrees with the rule.
Programs added or edited in the admin pages get no check, so they can recreate the split 8.1 fixed
(Economics under Social Sciences, say). Only a later run of `scripts/programs/field-inventory.ts`
would find it.

**Read first:**

- `lib/programs/fields-of-study.ts`: `homeOf`, `KEPT` and the rule in its header. It is pure, with no
  imports, so a client component can use it.
- `components/admin/programs/ProgramForm.tsx` (new program: the name input, then the field `<select>`,
  id `fieldOfStudy`) and `ProgramEditForm.tsx` (edit).
- `components/admin/programs/BulkUploadForm.tsx` and `lib/bulk-upload/csv-parser.ts`: the preview and
  its validation; `fieldMap` maps field names to ids.
- `components/admin/reference/ReferenceDataClient.tsx`, where field names and descriptions can be
  edited.

**Steps:**

1. **A pure helper** next to the rule, for example `suggestField(name, programId?)`. It returns the
   `KEPT` field for a kept program, otherwise `homeOf(name)`'s field and the disciplines it read,
   otherwise null. Cover it with Vitest.
2. **New program form.** Until the admin picks a field, the name pre-selects the suggested one, with
   a line under the select: "Suggested from the name: Business & Economics (Economics)". Once the
   admin picks a field, typing no longer changes it. If the chosen field differs, show: "The
   fields-of-study rule files this name under Business & Economics. Keep your choice only if the
   name misleads it." Map names to ids with the `fieldsOfStudy` the form already receives.
3. **Edit form.** Never change the stored field on its own. Show the same line when the selected
   field differs from the suggestion; show nothing when they agree, or when the program is in `KEPT`
   with that field.
4. **Bulk upload.** In the preview, add a warning (not an error) to each row whose `field_of_study`
   differs from the suggestion, naming the suggested field. Rows still upload.
5. **Reference data page.** Beside Fields of Study, say that names and descriptions come from
   `lib/programs/fields-of-study.ts` and are written with `field-inventory.ts --apply`. An edit made
   on this page shows up as drift in the inventory. Ask the owner whether to make the description
   read-only there instead.
6. A field an admin keeps on purpose stays in the inventory's outlier list until the program's id is
   added to `KEPT` with the owner's reason. Say so in the hint's help text and in the PR.
7. **Campus city** (`CONTENT_tasks.md` 8.2, 7 October 2026). `AcademicProgram.campusCity` holds where a
   program is taught when that is not its university's city (UBC's Okanagan programs: Kelowna). Only
   the refresh tool writes it today; the copy route carries it over. Add an optional "Campus city"
   input to both forms and the bulk upload's columns, empty meaning the university's city, with the
   university's city as the placeholder. Its API routes trim it and store null for empty.

**Must not:**

- Add database reads: the forms already receive the fields.
- Reach a student-facing bundle: only admin components import the rule.
- Block saving or uploading.
- Touch stored data.

**Verify:** in `npm run dev`, **without saving** (the database is production):

- On the new form, typing "Economics" selects Business & Economics, and "Mathematics and Computer
  Science" selects Natural Sciences. Picking Social Sciences for "Economics" shows the line.
- Editing Bocconi's Economics shows no line, and neither does a `KEPT` program in its kept field.
- A CSV row "Economics" filed under Social Sciences shows a warning in the preview and stays valid.
- `tsc`, ESLint, Prettier, Vitest and the build pass.

**Session size:** Small.

**Done 22 October 2026.** `suggestField(name, programId?)` sits next to the rule in
`lib/programs/fields-of-study.ts`, with Vitest cases. One component,
`components/admin/programs/FieldOfStudyHint.tsx`, writes the line under the field select on both
forms:

- **New form:** the name pre-selects the suggested field until the admin picks one. The line reads
  "Suggested from the name: Business & Economics (Economics)". After a pick, typing never changes
  the field, and a different field shows the rule's field, with the reason, as a link that selects
  it. The step 6 help text sits under it.
- **Edit form:** the stored field never changes on its own, and the line shows only when the
  selection differs. A `KEPT` program moved out of its kept field says "The owner keeps this program
  under Media: …".
- **Bulk upload:** a row whose field disagrees gets a warning (`warnings`, `warningRows` and
  `formatWarnings` in `lib/bulk-upload/csv-parser.ts`) in an amber box and status icon. The row
  still uploads. A row with an unknown field is already an error, so it gets no warning.
- **Reference data** (`/admin/reference-data`): the Fields of Study tab says where the names and
  descriptions come from. The owner chose to make the description **read-only** in the modal; its
  note says to edit `FIELD_DESCRIPTIONS` and run `field-inventory.ts --apply`. Names stay editable.
- **Campus city:** an optional input on both forms, with the selected university's city as its
  placeholder, and an optional `campus_city` column in bulk upload and its template. The create,
  update and bulk routes trim it and store null for empty; the update route also refuses a value
  that is not text. Both form pages add `city` to the university query they already ran. That is one
  column, not a new read.

The rule reaches no student bundle: only admin components and the bulk-upload parser import it.
Checked in `npm run dev` with every non-GET request blocked, so nothing was saved:

- "Economics" selects Business & Economics, and "Mathematics and Computer Science" selects Natural
  Sciences. Social Sciences for "Economics" shows the line, and a name typed after a pick leaves the
  field alone.
- Bocconi's Economics shows no line, and neither does Charles University's "Sustainability in
  Marketing and Media Communication" in Media (`KEPT`).
- A CSV row "Economics" under Social Sciences is flagged, and the file stays valid ("Import 3
  Programs").
- The UBC placeholder reads Vancouver.

---

### 5.17 — List the university pages in the sitemap

**Outcome:** `app/sitemap.ts` lists every university page that has at least one program, each with a
real `lastModified`.

**Why:** `/universities/[id]` is public and indexable. It has its own metadata and
`CollegeOrUniversity` structured data, and program pages link to it. The sitemap lists every program,
the guides and the requirements hub, but no university page, so search engines find them only by
following links. Found 8 October 2026, in the SEO review for the rebranding.

**Read first:** `app/sitemap.ts`, especially its header rule: `lastModified` is only ever a real
date. Then `node_modules/next/dist/docs/` on `sitemap.ts`.

**Steps:**

1. Add `universityId` to the existing programs query's `select`. Then add one query beside it:
   `prisma.university.findMany({ where: { programs: { some: {} } }, select: { id: true, updatedAt: true } })`.
2. Each university becomes `/universities/<id>`, with `changeFrequency: 'monthly'` and a priority
   below the programs' 0.8. Its `lastModified` is the later of its own `updatedAt` and its newest
   program's, because the page lists its programs.
3. Vitest with `@/lib/prisma` mocked: a university with programs is listed with the right date, and
   one without programs is not.

**Must not:**

- Read anything but ids and dates. Use `select`, never `include` (cost rules above).
- Change any existing entry.
- Use `new Date()` for a date.

**Verify:** `npm run build` passes. `/sitemap.xml` from `npm start` lists as many university URLs as
`SELECT count(*) FROM "University" u WHERE EXISTS (SELECT 1 FROM "AcademicProgram" p WHERE
p."universityId" = u.id)` returns. That query is an aggregate, so it is safe on production.

**When:** before the owner takes the Search Console baseline for rebranding release day, or after
R.2. The new URLs would raise the indexed-page count that R.1 and R.2 compare against the baseline.

**Session size:** Tiny. Independent of the rebranding.

**Done 22 October 2026**, with 5.26 and before the Search Console baseline. `app/sitemap.ts` lists
each university with programs at priority 0.7; the test is `app/sitemap.test.ts`. The sitemap is
prerendered, so the new query runs once per build, not per request. Production, 22 October 2026: the
count query returns 104, and the built `/sitemap.xml` lists 104 university URLs (1,816 in all), more
than the 65 estimated above.

---

### 5.18 — Count a course once when a program needs different subjects — **done**

**Outcome:** A program whose requirements need different subjects ("HL 6 in one of Biology,
Chemistry or Physics, and HL 5 in another") is met only when each requirement has its own course.
Programs whose rules let one course count twice keep today's result. Scores and statuses for every
other program are unchanged.

**Why:** Found on the rebranding board "D4.6 Matches" (10 October 2026). `evaluateAllRequirements`
in `lib/matching/academic-matcher.ts` checks each requirement (a single row, or an either/or group
sharing an `orGroupId`) against all of the student's courses on its own. Nothing marks a course as
used, so one course can meet two requirements. The University of Manchester's MBChB Medicine has two
groups, all at HL 6: Biology or Chemistry; and Biology, Chemistry, Maths AA, Maths AI, Physics or
Psychology. One Biology HL 6 meets both, so a student with no second science sees "Meets all
requirements". A student with Biology HL 5 sees the chip "Biology HL 6 · you 5" twice.

**How many.** 53 programs have a course in two requirements: 39 with two groups sharing courses, 14
with a single row whose course is also in a group. Measured 10 October 2026 by a local script on an
anonymised copy of the 150 profiles that have courses (no database writes): if every requirement
needed its own course, 1,159 profile and program pairs that meet every subject requirement and the
points today would no longer meet them (97 profiles, 51 programs). 46 of those pairs are in the
student's own fields and countries, so on Matches (20 profiles, 19 programs). Not every one is wrong,
because the rules differ:

| University | Programs | Pairs that change | On Matches | How the rule reads |
|---|---|---|---|---|
| Lausanne | 15 | 615 | 3 | Swiss rule: maths, a science, a humanities subject, and an HL in maths or a science. One maths HL may count twice, so today's result is probably right |
| Trinity College Dublin | 17 | 288 | 8 | "HL 6 in one of Biology, Chemistry, Physics and HL 5 in another" (Medicine, Dental Science): two different subjects |
| Edinburgh | 12 | 134 | 17 | Unclear. Cognitive Science (Humanities): an HL 5 science or maths, and Maths HL 5 or SL 6 |
| Basel | 1 | 38 | 0 | As Lausanne |
| Manchester | 2 | 34 | 9 | Two different subjects |
| Nanyang Technological University | 2 | 24 | 6 | Physics at any level and an HL science: one Physics HL may count twice |
| UCL | 1 | 23 | 3 | BSc Psychology lists the same HL 6 group twice: two different subjects |
| Western | 1 | 3 | 0 | Probably two different subjects (Chemistry, and a science) |

TUM's two programs in the 53 change nothing for any profile. The rows cannot say which rule a
program means, so the fix needs one more fact per program, not just a different matcher.

**Read first:** `lib/matching/academic-matcher.ts`, `subject-matcher.ts`, `lib/matching/types.ts`,
`lib/programs/requirement-groups.ts`, the `ProgramCourseRequirement` model in
`prisma/schema.prisma`, 5.15 above, and `docs/matching/matching-algo-rollback-plan.md`.

**Steps:**

1. Research only. For each of the 53 programs, read the official requirements (`programUrl`) and
   record which rule it uses: different subjects, one course may count twice, or a data error (the
   rows don't match the page). List them with the link and the date checked. To find them, group
   `ProgramCourseRequirement` by program and course and keep those in more than one
   `COALESCE("orGroupId", id)`. That is an aggregate; select only ids and names.
2. The owner decides how to store the rule. The simplest is a boolean on the program, "each
   requirement needs its own course", off by default so nothing changes until it is set. The
   alternative is to restructure the rows so no course appears twice, which the current schema can't
   express for "two of these, one at HL 6".
3. Implement it in the matcher. When the flag is on, assign courses to requirements with a maximum
   bipartite matching (programs have a handful of requirements), preferring the assignment that meets
   the most requirements, then the highest grades. A requirement left without a course of its own is
   reported as not met, with the course it would have used, so the chip says what is missing.
4. The chip and badge copy for "a second subject is needed" is a visible change: add it to a design
   board and have it approved before coding (`REBRANDING_tasks.md`, Step 2).
5. The migration adds the column (additive; `prisma migrate deploy` only). Setting the flag on the
   programs from step 1 is a data change: the owner approves it and a backup comes first. Then clear
   the match cache (`clearAllMatchCache`).

**Must not:**

- Change the score or status of any program without the flag. Prove it with the synthetic fingerprint
  method from `REBRANDING_tasks.md` 2.1, restricted to unflagged programs: byte-identical before and
  after.
- Run `prisma migrate dev` or `prisma db push` (standing context).

**Verify:** `npm test` passes with new cases in `lib/matching/subject-matcher.test.ts`. Manchester MBChB: Biology HL 6
alone is not met; Biology HL 6 with Chemistry HL 6 is met. Lausanne Law: Maths AA HL alone still meets
both its maths requirements. `npm test` covers the assignment helper. Re-running the count above,
the flagged programs drop out and the rest are unchanged.

**Session size:** Research small (step 1). The change medium. Best done with the matching review
(5.15), after rebranding build 6–7, which changes `lib/matching/match-status.ts`.

**Step 1 done, 26 October 2026.** The record, with every program's link and what its page says, is
`docs/matching/5.18-shared-courses.md`. The 53 are 51: TUM's two were rewritten in CONTENT 7 Part B1
and no longer list a course twice. Each was read on its official page on 26 October (UCL from the
Internet Archive copy of 11 October, because ucl.ac.uk answers scripts with 403; Trinity's 2027 rules
from its prospectus, read 29 September, and its course pages).

- **Different subjects, wrong today (4):** Manchester MBChB Medicine, UCL BSc Psychology, Trinity
  Medicine and Dental Science.
- **"Two of" stored as one requirement (14):** Trinity's 13 science strands (TR060, TR061) and
  Physiotherapy. They are too lenient today, the opposite of the bug: one science is enough. Each needs
  its second requirement added, then both marked.
- **One course may count twice, right today (33):** Lausanne 15 and Basel (the Swiss rule's HL is a
  level on one of the six subjects); Edinburgh 12 (every shared course is "if not at HL", which settles
  the table's "Unclear"); NTU 2 (SL Physics "only applicable to applicants who have not read Higher
  Level Physics"); Western (Chemistry is one of Ontario's "two of", not a third subject, unlike the
  table's guess); Manchester MPharm and Trinity Pharmacy.

**Step 2, recommended: the rule goes on the requirement, not on the program.** A program-wide boolean
refuses students the universities accept. At Trinity Medicine, Biology HL 6, Chemistry HL 5 and Maths
SL 5 without Physics fail, because Maths must meet both the physics-or-maths requirement and the
minimum maths row. In the Trinity strands, once kind B is stored, Maths HL 5 is both the maths
requirement and one of the two HLs. Instead: one boolean on `ProgramCourseRequirement`, off by default,
the same on every row of a group. Marked requirements in a program each need a different course;
unmarked ones may use any course, as today. Step 3's matching runs over the marked requirements only.
A program with none marked takes today's path, so the fingerprint stays byte-identical. No program
found needs two separate sets. Leave the field out of the programs cache when it is false.
**Decided by the owner, 26 October 2026: the requirement column, as recommended.**

The 10 October count overstated the change: most of the 1,159 pairs were in programs where today's
result is right (Lausanne 615, Edinburgh 134, Basel 38, NTU 24, Western 3). Re-run it in step 3 with
the flags set. The query only sees programs that list a course twice, so about 47 more store a "two
of" rule as one requirement: new task 5.39.

**Step 3 done, 26 October 2026.** `ProgramCourseRequirement.ownCourse`, false by default, through
`20261026150000_add_requirement_own_course` (one `ADD COLUMN`, the whole `migrate diff`), applied with
`migrate deploy` the same day: 6,186 rows, none set; Row Level Security still on.

- **The matcher.** `lib/matching/own-course.ts`: when a program has two or more marked requirements,
  `evaluateAllRequirements` gives them different courses. Every assignment is tried (a handful of
  requirements, six or so courses). The best meets the most, then has the highest scores, then meets
  the most demanding requirements, so what is left is the easier subject (Trinity Medicine with
  Biology HL 6 alone asks for "HL 5 in another", not "HL 6"). Then it keeps each on the course it
  uses alone. A marked requirement left with no course is `NO_MATCH`, `not_taken`, with
  `courseUsedElsewhere` naming the student's course that went to another requirement. One marked
  requirement on its own changes nothing. Unmarked requirements are checked as before, and may share.
- **Where the flag travels.** The programs cache and the search records carry `ownCourse: true` only
  where it is set, so neither grows today. Explore's fit reads it from the record (`lib/explore/fit.ts`),
  so Explore and Matches agree. The admin edit form has no control for it but keeps it, and the edit,
  create and copy routes save it. A change to it re-dates the requirements like any other.
- **Not yet:** the refresh tooling (`scripts/programs/refresh.ts`, `requirements-diff.ts`) deletes and
  re-creates rows without the field. Teach it `ownCourse` in step 5, before it sets the first flag, or
  a later refresh would clear it.
- **Proof.** `scripts/score-fingerprint.ts` (new, checked in; the 2.1 copy had not survived): 72,060
  results, every score, status, reason, category and adjustment, including programs that list a course
  twice. Byte-identical before and after (sha256 `9ca39e46…`). `lib/matching/own-course.test.ts`: the
  task's cases (Manchester MBChB: Biology HL 6 alone is not met, with Chemistry HL 6 it is; Lausanne Law:
  Maths AA HL meets both maths requirements) and Trinity Medicine, Trinity's strands, UCL Psychology and
  an arrangement that taking the first fit would miss. Turning the assignment off fails 8 tests.
- **Step 4** is rebranding row 28: the change board "D2.7 Chip · a second subject", then its build.
  Until then a requirement left without a course reads as "not taken", so no program is flagged
  before that build.

**Step 4 done, 26 October 2026.** The board was approved with every recommendation and built (rebranding
row 28; design QA https://claude.ai/artifact/2HLKLrfHzGDjf5ttqzcM7T). `requirementFacts`
(`lib/matching/match-status.ts`) judges a program's requirements together, so the chip, the badge, "Why
this match", the checklist and the compare table share one rule. The build found a gap in step 3: four
queries fed the matcher without `ownCourse` and would have ignored the flag (the Shortlist,
`/api/programs/[id]/match`, saved programs and a coordinator's view of a student's program). Each selects
it now: one column more, no new read. `lib/matching/second-subject.test.ts` holds the board's cases; the
fingerprint is still byte-identical.

**Step 5, what is left:** teach `scripts/programs/refresh.ts` and `requirements-diff.ts` the field; then
in the data files mark the HL 6 and HL 5 groups of Trinity Medicine and Dental Science and both groups of
Manchester MBChB and UCL BSc Psychology, and give Trinity's 13 science strands and Physiotherapy their
second HL 5 group, both marked. Dry run, the owner's approval, a backup, the write (which re-syncs the
search records), then `clearAllMatchCache`.
- **Decided by the owner, 26 October 2026: step 5 runs as soon as build 28 has merged, before
  release day.** Until release, today's design shows a flagged program's score and status right but
  its requirement lines can be muddled (`ProgramCard` checks some rows on its own, and an unmet group
  reads "None of the OR options met"). 18 programs out of more than a thousand, for the days left
  before the new design goes to everyone, is accepted. Then 5.39.

**Step 5 done, 27 October 2026.** Approved by the owner and written the same day.
- **The refresh tooling knows the field.** A data file marks a requirement `ownCourse: true`;
  `requirements-diff.ts` compares, exports and prints it (`(own)` in the dry run), and `refresh.ts` reads it
  from the database, writes it, and backs it up, so a restore puts it back. A refresh no longer clears it.
  A file that marks only one requirement of a program is refused: on its own the flag changes nothing.
- **The data files.** Trinity Medicine and Dental Science: the HL 6 and HL 5 groups marked, the
  physics-or-maths group not. Manchester MBChB and UCL BSc Psychology: both groups marked. Trinity's 13
  science strands and Physiotherapy: the second HL 5 group added, both marked; the maths row is not, so Maths
  may be one of the two HLs as well. Each note that said the model could not hold the rule is corrected.
- **The dry run** (`npx tsx scripts/programs/refresh.ts trinity-college-dublin the-university-of-manchester
  university-college-london`): 18 changes, subjects only, and the other 132 programs of the three files up to
  date. The stamps don't move: the rules are the ones read for 2027 entry in September (CONTENT 4.1, 4.6),
  re-read on 26 October for step 1.
- **The write** (`--apply`, 27 October): backup `scripts/backups/refresh/2026-10-27T07-33-55-779Z.json`
  (git-ignored); 18 of 18 written, 18 search records synced, the programs cache and the cached matches
  cleared. Checked after: a second dry run finds nothing to change; in production 224 rows in 36 groups
  of 18 programs have `ownCourse`, and no group is marked on some options only; Manchester MBChB's search
  record carries the flag on all 8 options.
- **Not done: the count of 10 October.** It needs the anonymised profile copy, a local file that is not
  in any of the old scratchpads. The matcher tests hold the cases instead (`own-course.test.ts`,
  `second-subject.test.ts`).

---

### 5.19 — Read the programs cache once per server, not on every Matches load

**Outcome:** Matches, the match precompute and the coordinator pages read the programs cache from
Upstash at most once per server instance every few minutes, not on every request. A change to a
student's academic profile still shows at once: only program data, which changes a few times a
week, may lag by those minutes. When Upstash fails, the app reads the catalogue from Supabase once
and keeps it, instead of on every request.

**Why:** Upstash's free plan allows 10 GB of bandwidth and 500,000 commands a month. The programs
cache, `programs:all:v3`, is 3,013,227 bytes (measured 11 October 2026), and `getCachedPrograms()`
in `lib/matching/program-cache.ts` downloads all of it on every call, so 10 GB covers about 3,300
calls a month: roughly 110 a day. These call it on every request:

- `app/api/students/matches/route.ts`: today's Matches page, on every load
- `app/api/students/matches/list/route.ts`: the new design's Matches (`REBRANDING_tasks.md` 2.2),
  on every load
- `app/api/students/matches/precompute/route.ts`: after every save of the academic profile
  (`app/api/students/profile/route.ts`) and every coordinator edit of a student
- `app/coordinator/students/[id]/page.tsx`, `app/api/coordinator/students/[id]/matches/route.ts`,
  `app/coordinator/analytics/page.tsx`, `app/api/coordinator/analytics/route.ts`

Usage from 1 to 11 October 2026 (the Upstash console, Usage tab): 1 GB of 10 GB and 6.1K of 500K
commands, much of it from rebranding QA, so about 3 GB for the month at that pace. Nothing is close
to the limit yet; the risk is more students, and rebranding release day (R.1), when every student
uses the new Matches. History: rebranding 2.2 added four fields to the cache (+5.5%, 2.86 MB to
3.01 MB). Rebranding 2.3 (Explore, PR #98) first read the cache for each signed-in student's fit,
and was changed before merging to read nothing from it: the fit comes from the search records
(`lib/explore/fit.ts`). So Matches and the coordinator pages are its only readers. Raised by the
owner on 11 October 2026, after the Supabase overage (see "Hard rules — cost" above): the
service must not run out of quota in the middle of a month.

A second risk is in the same function: if the Redis read throws, `getCachedPrograms()` falls back
to `fetchProgramsFromDB()`, the full catalogue from Supabase (about 1.2 MB), on every request until
Redis answers again. That is the read pattern that kept Supabase over its quota from December 2025.

**Read first:** `lib/matching/program-cache.ts` and the callers above; `getCachedMatchesV10` in
`lib/matching/cache.ts` (the per-student match cache: 30 minutes, cleared on every profile save by
`invalidateStudentCache`, which is why profile changes show at once; this task must not change
that); "Hard rules — cost" above; `REBRANDING_tasks.md` 2.2 and 2.3 (their "Done" sections) and
its Definition of done, point 7. PR #98's first commit, `7e8ed73`, has a five-minute in-memory
copy of the catalogue in `lib/explore/student.ts` (`fitPrograms`), removed when Explore stopped
reading the cache; it is a starting point.

**Steps:**

1. Keep the parsed catalogue in module memory, per server instance, for a few minutes (five, as a
   start): one shared promise with a timestamp, so concurrent requests wait for one read, dropped
   on failure so the next request tries again. `invalidateProgramsCache()` also drops this
   instance's copy; other instances catch up within the minutes, which is fine for admin edits.
2. On a Redis failure, read from Supabase once and keep that copy for the same minutes, instead of
   reading on every request. Log it as an error so it is seen.
3. Optional, if Matches still dominates: a slimmer Redis key with only what the matcher reads (ids,
   minimum, requirements, field and country ids) beside the full one. Measure first.

**Must not:**

- Change any score or status. Prove it with the synthetic fingerprint method from
  `REBRANDING_tasks.md` 2.1: byte-identical before and after.
- Delay a student's own profile changes: the match cache and its invalidation stay as they are.
- Add any database read, or a new call to `getCachedPrograms()` anywhere.

**Verify:** a Vitest test with `@/lib/redis/client` mocked: two calls within the minutes make one
Redis read; a call after them makes a second; an invalidation makes the next call read again; a
Redis failure reads the database once for both of two calls. `npm test` and
`npx tsx scripts/run-all-tests.ts` pass. After merging, compare the Upstash bandwidth per day for
a week before and after.

**Session size:** Small. Independent of the rebranding, but before its release day.

**Done, 12 October 2026.** `getCachedPrograms()` keeps one shared promise per server instance for
five minutes (`KEPT_FOR_MS`): concurrent requests wait for the one read, and a failed read is not
kept. `invalidateProgramsCache()` drops this instance's copy before it deletes the Redis keys, so a
failed delete does not keep it either. On a Redis failure, the database copy is kept the same way and
logged as an error. One more double read went too: a miss whose Redis write failed fell into the
`catch` and read the database a second time; it now logs the failed write and returns what it read.
Sharing the array is safe because no caller changes it: the transformers copy values out, and every
sort runs on a new array. The function's comment says so for future callers.

`lib/matching/program-cache.test.ts` covers the four cases above, plus concurrent calls, a failed
Redis write and a failed read; five of its nine tests fail against the old module. Scores are
unchanged: the 72,060-result fingerprint is byte-identical before and after. Step 3, the slimmer
key, is not done: measure first.

On Vercel, "per server instance" means per function instance. Routes bundled into separate functions
keep separate copies, and an admin edit drops only the copy where it ran; the others catch up within
the five minutes. How much this saves depends on how often Vercel reuses a warm instance, which only
Upstash's usage can show, so the comparison is an owner task (5 below). If Matches still dominates
after it, do step 3.

---

### 5.20 — One IB diploma rule wherever grades are saved, by any role

**Outcome:** One check decides whether a set of grades is a diploma the IB would award, and every
place that saves grades uses it: the student's forms in both designs, the coordinator's form, and
both APIs. A student and a coordinator get the same answer for the same grades, in the same words.
The check matches the IB's current regulations, including the points floors for four Higher Level
subjects, which are wrong today. Decided by the owner on 16 October 2026: "One rule for IB,
regardless of the role, 100% aligned with the latest IB specs."

**Why:** The rule is split today, and part of it is wrong.

| Where grades are saved | What it checks today |
|---|---|
| Today's subject step (`components/student/DetailedGradesInput.tsx`, `validateDiploma`) | Everything below, with the wrong floors |
| The new design's subject editor (`components/profile-editor/ProfileEditor.tsx`, `ibConditions` in `lib/student/subject-editor.ts`; rebranding 3.2) | Everything below, with the wrong floors |
| `POST /api/students/profile` (`app/api/students/profile/route.ts`) | Six subjects, TOK and EE A to E, an E, the Higher Level count (`getSaveBlocker`). Not grade ranges, levels or repeated subjects |
| The coordinator's form (`app/coordinator/students/[id]/edit/StudentProfileForm.tsx`) | An E and the Higher Level count. **A typed total** ("Manual override") when the six subjects and both core grades aren't all there |
| `PATCH /api/coordinator/students/[id]` (`app/api/coordinator/students/[id]/route.ts`) | An E and the Higher Level count, with six subjects. Takes `totalIBPoints` from the request when the total can't be worked out |
| Admin (`app/api/admin/students/[id]/route.ts`) | Nothing to check: view and delete only |

So a coordinator, or a direct request, can save a profile with a 1, a total under 24, a grade of 9,
or a total typed over fewer than six subjects. The same subject twice reaches the database's unique
key and fails as a 500, not a 400. A student can't do any of this, but only because the page stops
them.

The points floors are wrong in the shared helper (`otherFailingConditions` in `lib/ib/diploma.ts`),
found in rebranding build 12 (PR #115). It sums every Higher Level grade against 12 and every
Standard Level grade against 9, whatever the count. The IB counts the three best Higher Level grades
for a candidate with four, and asks for 5 at Standard Level from one with two. So HL 7, 7, 6, 6 with
SL 4 and 4 is refused (34 points before the core, a diploma the IB would award), and HL 4, 4, 3, 2
passes (13, but the three best make 11).

**The IB's rule.** The IB's "DP passing criteria" page
(https://www.ibo.org/about-the-ib/what-it-means-to-be-an-ib-student/recognizing-student-achievement/about-assessment/dp-passing-criteria/)
and "General regulations: Diploma Programme" for 2026
(https://ibo.org/globalassets/new-structure/become-an-ib-school/pdfs/dp-2026-general-regulations.pdf)
are the authority. `ibo.org` refuses scripts, so **step 1 is to read both in a browser** (the owner,
or a session with a browser tool) and confirm each line below word for word. As the search index
showed them on 16 October 2026, with how this app applies each to predicted grades:

| The IB's condition | Here |
|---|---|
| Six subjects, at least three and no more than four at Higher Level (registration, in the general regulations) | Checked (5.13) |
| CAS requirements met | Not entered; not checked |
| Total of 24 points or more | Checked: six grades plus the core points |
| No N for TOK, the EE or any subject | Not applicable: an N is no grade at all |
| No E in TOK or the EE | Checked (5.8) |
| No grade 1 in any subject | Checked |
| No more than two grades of 2 | Checked |
| No more than three grades of 3 or below | Checked |
| 12 points or more at Higher Level; **with four Higher Level subjects, the three highest grades count** | **Fix:** today all count |
| 9 points or more at Standard Level; **with two Standard Level subjects, at least 5** | **Fix:** today 9 always |
| No penalty for academic misconduct | Not applicable |

Plus the core points from the IB's matrix (5.8), and grades that exist: 1 to 7 for a subject, A to
E for TOK and the EE.

**Production, 16 October 2026** (read-only aggregates): 154 profiles have a total. 153 have six
subjects; one has a total without six subjects, and isn't linked to a school. 3 have two subjects at
Higher Level (known since 5.13), and 16 have four. Every stored total equals the worked-out total. No
profile fails any other condition under the corrected rule, so **no saved profile changes status**.
The four whose grades already break the rule see why the next time anyone saves them. 6 students are
linked to a school, so a coordinator could edit them.

**The rule, as built:**

- **Grades are a diploma, or they aren't saved as one.** Saving grades with a total needs six
  different subjects, each SL or HL with a grade from 1 to 7, TOK and the EE from A to E, and every
  condition met. The total is always worked out, never taken from a form or a request.
- **One function** in `lib/ib/diploma.ts` checks shape and conditions and returns every failing
  reason, in the order the forms show them: the core, the Higher Level count, then the others. The
  forms, both APIs and the new editor's footer all call it. Keep the existing exports as thin
  wrappers, or update every caller; leave no second copy of any rule.
- **Drafts aren't diplomas.** First run's drafts (`PUT /api/students/profile/preferences`, rebranding
  3.1 and 3.2) keep choices and complete subjects without a total, and write only a profile that has
  no total. They keep their own shape check and need no diploma check.

**The words, approved by the owner on 16 October 2026.** The two new cases read "Your three best
Higher Level grades need 12 points or more (you have 11)." and "Your two Standard Level grades need 5
points or more (you have 4)." Every other case keeps the words approved on board "D3.6 Subject
editor" (14 October 2026): "Your Higher Level grades need 12 points or more (you have 11)." and "Your
Standard Level grades need 9 points or more (you have 8)." for three and three. Coordinators see the
same words.

**Steps:**

1. Read the IB's two pages in a browser and confirm the table above. Note any difference to the
   owner before coding. Put the document, its version and the date checked in the helper's comment.
2. **The rule.** In `lib/ib/diploma.ts`: the shape check, and the floors. With four Higher Level
   subjects, sum the three highest Higher Level grades; with two Standard Level subjects, the floor
   is 5. Any other count at Higher Level already fails on the count, so the sums there don't matter.
   Then the one function.
3. **The student's side.** `POST /api/students/profile` refuses anything the function refuses: 400,
   with the first reason as `error` and all of them as `reasons`. Today's step and the new editor
   take the corrected rule through the helper.
4. **The coordinator's side.** The form shows every reason, as the student's step does, and stops
   saving. **The typed total goes**: a coordinator enters six subjects and both core grades, and the
   total is worked out, as for the student. `PATCH /api/coordinator/students/[id]` checks the profile
   as it will be stored with the same function, and ignores a `totalIBPoints` in the request.
   Preferences alone (fields, countries) still save without a grades check.
5. **Tests**, all Vitest:
   - `lib/ib/diploma.test.ts`: HL 7, 7, 6, 6 with SL 4, 4 passes, and with SL 2, 2 fails (4 points
     against 5). HL 4, 4, 3, 2 fails with 11. Exactly 12 from the three best, and exactly 5 at
     Standard Level, both pass. Three and three is unchanged: SL 8 fails, and so does HL 11. A grade
     of 0 or 8, an unknown level, a repeated subject and five subjects are refused.
   - `lib/student/subject-editor.test.ts`: a footer case for each new floor.
   - Both API routes, with `@/lib/prisma` mocked: a 1, a total under 24 and four HL with SL 4, 4
     answer the same way for a student and a coordinator, and a coordinator's `totalIBPoints` is
     ignored.
6. Run the aggregate below again and report it. Change no stored data.

```sql
-- Saved six-subject profiles by Higher Level count, and how many the corrected floors would change
with c as (
  select sc."studentProfileId" p, sc.level::text lvl, sc.grade,
    row_number() over (partition by sc."studentProfileId", sc.level order by sc.grade desc) rn
  from "StudentCourse" sc
  join "StudentProfile" sp on sp.id = sc."studentProfileId" and sp."totalIBPoints" is not null
), per as (
  select p, count(*) n, count(*) filter (where lvl = 'HL') hl,
    coalesce(sum(grade) filter (where lvl = 'SL'), 0) sl_pts,
    coalesce(sum(grade) filter (where lvl = 'HL'), 0) hl_pts,
    coalesce(sum(grade) filter (where lvl = 'HL' and rn <= 3), 0) hl_best3
  from c group by p
)
select hl, count(*) profiles,
  count(*) filter (where sl_pts between 5 and 8) sl_5_to_8,
  count(*) filter (where hl_pts >= 12 and hl_best3 < 12) best3_under_12
from per where n = 6 group by hl order by hl;
```

**Must not:**

- Change any total, score or match. The conditions decide only whether grades can be saved; matching
  reads the stored total and subjects. `npx tsx scripts/run-all-tests.ts` passes unchanged.
- Change stored data, or re-save a profile to "fix" it.
- Change the approved words for any case but the two new ones.

**Verify:** the tests above pass, and `npm test`. By hand: in the new design's first run (with the
preview link), today's step and the coordinator's form, HL 7, 7, 6, 6 with SL 4 and 4 saves, and HL
4, 4, 3, 2 shows "Your three best Higher Level grades need 12 points or more (you have 11)." and
doesn't save. The coordinator's form has no typed total.
A direct request to either API with a 1 gets a 400 naming it.

**Session size:** Medium: one helper, two APIs, three forms. Independent of the rebranding; the new
editor takes the rule through the helper. If the pull request gets hard to review, land steps 1 to 3
first, then step 4, in two pull requests under this task.

**Result, 18 October 2026.** Step 1 went through a search index's copy of `ibo.org`, as that session
had no browser: every line of the table matched, with no difference. The aggregate: 155 profiles have
a total, 154 of them six subjects (3 with two at Higher Level, 135 with three, 16 with four) and one
not; `sl_5_to_8` and `best3_under_12` are 0 at every count, so no saved profile changes status. Both
APIs name subjects from the cached course list (`lib/ib/grades-to-save.ts`), so they add no database
read. A shape the forms can't produce has words of its own, approved by the owner on 18 October 2026,
seen only on the coordinator's form while it is incomplete and by a direct request: "Choose six
subjects (you have 5).", "Choose each subject only once.", "Choose SL or HL for every subject.",
"Choose a grade from 1 to 7 for every subject.", "Choose TOK and Extended Essay grades from A to E."
and "Choose every subject from the list of IB subjects." The coordinator's form checks grades once
they change, so preferences alone still save.

---

### 5.21 — Send an invited student to "Check your email" after accepting — **done**

**Done 19 October 2026** in rebranding build 16, for both designs: both invitation cards call
`acceptStudentInvite` (`lib/auth/accept-student-invite.ts`, tested), which signs in through `resend`
and follows Auth.js's address to "Check your email"; a link that can't be sent says the account is
ready and to sign in. Checked on a throwaway local database with the request answered in the browser;
the one real email through Resend is still the owner's check.

**Outcome:** A student who accepts a school invitation at `/auth/accept-student-invite/[token]` gets
the sign-in link at the invited address straight away and lands on "Check your email", as the code
intends. Today they land on the sign-in page with no word about the invitation and have to type their
address again.

**Why:** After the accept route (`app/api/auth/accept-student-invite/route.ts`) creates the account and
links the school, `AcceptStudentInviteForm.tsx` calls `signIn('email', …)`. The provider is called
`resend` (`lib/auth/config.ts`). next-auth 5's `signIn` (`node_modules/next-auth/react.js`) sends any
provider it doesn't know to `/api/auth/signin?callbackUrl=…`, which redirects to `/auth/signin`, and
the form's own `router.push('/auth/verify-request')` races that. The account and the school link are
saved; only the next step is wrong. Found 19 October 2026, drawing rebranding D4.16.

**Steps:**

1. Call `signIn('resend', { email, callbackUrl: '/student/onboarding', redirect: false })`, as
   `app/auth/signin/SignIn.tsx` does, and follow `result.url` with `window.location.href` as it does;
   else go to `/auth/verify-request`. The email is the invitation's, from the server, as now.
2. If the link can't be sent, the account already exists, so trying Accept again would fail with a
   409. Say so instead: "Your account is ready, but we couldn't send the sign-in link. Sign in with
   {email} to continue.", with a link to sign in.
3. Vitest for the handler, with `next-auth/react` and `fetch` mocked: `signIn` gets `'resend'` and the
   invited address; a failed send shows the message.

**Must not:** change the accept route, or create an account twice.

**Verify:** the test. By hand, never on production data: on a throwaway local database, an invitation
row for an address you own, then Accept on the page. You reach "Check your email" and the link
arrives (one real email through Resend).

**Session size:** Small. Rebranding build 16 draws this step in the new card (D4.16) and does this
task for both designs if it is still open.

---

### 5.22 — Let a student who already has an account accept an invitation — **done**

**Done 19 October 2026** in rebranding build 16, for both designs. The 409 offers "Sign in to accept
it" (sign-in returning to `/student/invitations`); today's sign-in follows that one return
(`signInDestination` in `lib/auth/callback-url.ts`, tested), and a student already signed in with the
invited address goes straight to School invitations, from the session cookie alone (step 3).

**Outcome:** A student whose account already exists when they open the new-account link
(`/auth/accept-student-invite/[token]`) is offered "Sign in to accept it", signs in, and lands on
School invitations (`/student/invitations`), where the invitation is listed and can be accepted.

**Why:** A coordinator who invites an address with no account sends the new-account link. If the
student signs up on their own before opening it, Accept answers 409, "An account with this email
already exists. Please sign in instead.", and after signing in the same link fails the same way.
`/student/invitations` lists every pending invitation for the student's address and accepts it, but
only the other invitation email links there. Found 19 October 2026, drawing rebranding D4.16.

**Steps:**

1. On the 409, show: "You already have an IB Match account with {email}. Sign in, and the invitation
   will be waiting.", with the link "Sign in to accept it" to
   `/auth/signin?callbackUrl=/student/invitations`.
2. Sign-in follows `callbackUrl` only in the new design today (`followCallback`, rebranding 2.4).
   Either let today's `SignIn.tsx` follow this one path too (still through `returnPath` in
   `lib/auth/callback-url.ts`), or accept that today's students land on Matches until release. Decide
   in the session; the first is a small change with a test.
3. Optional, and no database read: the page already renders per request, so when the visitor is
   signed in with the invited address, it can send them to `/student/invitations` at once
   (`auth()` reads the session cookie).

**Must not:** add a read of the user table to the page (the accept route already finds the account),
or accept the invitation without the student's consent on School invitations.

**Verify:** on a throwaway local database: an invitation for an address that has an account, the
message and its link, sign in, School invitations lists it, Accept connects, and Settings shows the
school.

**Session size:** Small. Rebranding build 16 draws it in the new card (D4.16) and does this task for
both designs if it is still open.

---

### 5.23 — One h1 on the legal pages — **done**

**Done 19 October 2026** in rebranding build 16: the three fallback texts start at their first `##`,
and the new design's legal template drops a leading `# ` from any document.

**Outcome:** `/cookies` shows "Cookie Policy" once, as its one h1. `/privacy` and `/terms` do the same
whenever they fall back to the text in code.

**Why:** Each page draws its own `<h1>`, then renders its Markdown with `MarkdownContent`, and the
fallback Markdown in code starts with its own `# Cookie Policy` (`# Privacy Policy`, `# Terms of
Service`). No Cookie Policy is published in the admin, so production's `/cookies` has two h1s today.
The published Privacy Policy and Terms start at "## 1.", so those pages are fine until a version is
withdrawn. Found 19 October 2026 on rebranding "D4.14 Legal pages", which decided one h1.

**Steps:** remove the first line, `# …`, from the three `FALLBACK_CONTENT` strings. The published
documents have no such line, so nothing else changes.

**Verify:** `npm run build`, `npm start` (with `AUTH_TRUST_HOST=true`), then `curl -s
localhost:3000/cookies | grep -o '<h1' | wc -l` prints 1.

**Session size:** Tiny. Fold into any session. Rebranding 4.3 builds the new legal template with the
same rule.

---

### 5.24 — Send "Account deleted" when a student deletes their own account

**Outcome:** A student who deletes their account in Settings gets the "Account deleted" email at the
address they signed in with, as a student an admin deletes already does, with words that say they did
it. Added 19 October 2026 (owner).

**Why:** `sendAccountDeletedEmail` (`lib/email/account-emails.ts`) is called only from the admin's
route, `app/api/admin/students/[id]/route.ts`. The student's own route,
`app/api/students/account/delete/route.ts`, deletes everything in one transaction and sends nothing,
in both designs' Settings. So the student has no record of it, and nothing tells them if someone else
did it from their signed-in browser. The template can't be sent as it is, either: it says the account
"has been deleted by our platform administrator". Found 19 October 2026, writing rebranding 4.7.

**Steps:**

1. **The template says who deleted the account.** `AccountDeletedEmail` (`emails/account-deleted.tsx`)
   takes `deletedBy: 'student' | 'admin'`; the admin's route passes `'admin'`, and its email stays byte
   for byte as today. For the student: "This email confirms that you deleted your IB Match account in
   Settings.", and "If you didn't do this, contact us straight away at support@ibmatch.com." in place
   of "If you believe this was done in error…". The list of what was removed and the line about a new
   account stay, and so does the subject. Today's look: the owner approves the words in the pull
   request, and rebranding 4.7 redesigns both versions (D4.18).
2. **Send it once the transaction has committed,** never inside it, so a deletion that rolls back
   sends nothing. The transaction already reads the user's `email`; add `name: true` to that same
   `select`, so there is no new read. Send inside `after()` from `next/server`
   (`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/after.md`): the response doesn't
   wait for Resend, and Vercel doesn't stop the function before the send finishes.
3. **A missing key or a failed send never fails the deletion.** The account is gone, and the dialog
   says so. `lib/email/account-emails.ts` builds its client when the file loads, and `new Resend()`
   throws without `RESEND_API_KEY`, so importing it into the student's route as it is would break
   deletion wherever the key is unset. Build the client when sending (`getResendClient()` in
   `lib/email/client.ts` already waits until it's called), and let `sendAccountDeletedEmail` log a
   failure with the address redacted, as now.
4. **The admin's route too:** it calls `sendAccountDeletedEmail` without waiting for it, then
   answers, and Vercel may stop the function once the response is sent. Move that call into `after()`
   as well.
5. **Vitest.** In `app/api/students/account/delete/route.test.ts`, mock `@/lib/email/account-emails`
   and `after` (run the callback at once): the send gets the address, the name and `'student'` after
   the transaction has run; nothing is sent when the transaction throws; a failed send still answers
   200. A render test for the template: the admin version byte for byte as on `main`, and the student
   version with its own sentence and without the administrator's.

**Must not:** send before the transaction commits, add a database read, or change what is deleted.
The address stays in memory for the send only and out of the logs (redacted, as now).

**Decided 19 October 2026 (owner):** the email says "All your personal information has been
permanently removed from our system", but the student's `Invitation` rows outlived either
deletion. Delete it all: 5.25 deletes the invitations, the cached matches and the browser's
shortlist count, so the words are true. Do the two in one session.

**Verify:** the tests. By hand, never on production data: on a throwaway local database, a student
account at an address you own, then Delete in Settings, in today's design and in the preview. The
email arrives once, with the student's words (one real email through Resend, with a live key and the
owner's go-ahead). With `RESEND_API_KEY` unset, the deletion still succeeds and the log says the
email wasn't sent.

**Session size:** Small. Any session; before rebranding build 22 is best, so D4.18 draws both
versions from approved words. Rebranding build 22 (4.7) does this task for both designs if it is
still open.

**Done 20 October 2026** in rebranding build 22, for both designs. `AccountDeletedEmail` takes
`deletedBy`; the admin's version is as before but for 5.25's list line. Both routes send it inside
`after()` once the transaction has committed, and `sendAccountDeletedEmail` builds the client when it
sends, never throws, and logs a failure with the address redacted. `lib/email/client.ts` no longer
builds its client when it loads, so the invite routes call `getResendClient()`. Tests: the route's,
the admin route's, and `lib/email/emails.test.tsx` for both versions in both designs. Still to do by
hand: the throwaway-database deletion with a real send, which needs a live key and the owner's go-ahead.

---

### 5.25 — Delete everything a student's account holds when it is deleted

**Outcome:** When a student deletes their account in Settings, or an admin deletes it, nothing about
them is left in IB Match's database, its cache or the browser they deleted it from. So the "Account
deleted" email's "All your personal information has been permanently removed from our system" is
true. Decided 19 October 2026 (owner): "We need to delete all the info."

**Why:** Both routes delete the user, the profile with its subjects and saved programs, sessions,
sign-in accounts, sign-in links and support tickets: the student's route
(`app/api/students/account/delete/route.ts`) through the schema's cascade, the admin's
(`app/api/admin/students/[id]/route.ts`) one table at a time. Neither deletes:

- **The student's invitations.** `Invitation` rows keep the address, the name the coordinator typed
  (`studentName`), the school, the consent flag and when it was accepted. They are found by address,
  not by user, so no cascade reaches them. Production, 19 October 2026 (an aggregate): 8 accepted
  student invitations, 2 of them for an address that no longer has an account, both with a name. Those
  are students who already deleted their accounts.
- **Their cached matches.** The Matches route keeps each student's results in Upstash for 30 minutes
  (`lib/matching/cache.ts`: keys starting `match:`, `matches:` and `matchesV10:`, then the user's id).
  They expire, but until then they outlive the account.
- **The shortlist count in the browser** (`shortlist-count` in `localStorage`, the new design's nav,
  `lib/shortlist/count.ts`): the student's id and a number, left in the browser they deleted from.

And the two routes have drifted: the admin's runs its deletes one at a time, outside a transaction, so
a failure part-way leaves part of the account, and it lists support tickets where the student's route
relies on the cascade.

**Steps:**

1. **One deletion for both routes:** `deleteStudentAccount(tx, userId)` in
   `lib/account/delete-student.ts`, run inside `prisma.$transaction` by both. Its first `select` reads
   the email and name (5.24 sends the email with them); then it deletes in the order the student's
   route uses today, support tickets included by name rather than through the cascade.
2. **The student's invitations, in the same transaction:** every `Invitation` with `role: 'STUDENT'`
   for the address, any status, any school. The invite routes store the address lower-cased
   (`normalizedEmail`) or as the account has it (an invitation to an existing account), so match it
   without case. A coordinator's pending list loses an open invitation to that address, which is right:
   nobody is left to accept it, and they can invite again.
3. **The cached matches,** with `invalidateStudentCache(userId)` once the transaction has committed,
   in the same `after()` as 5.24's email. It already catches and logs its own failures, so it never
   fails the deletion, and every profile save already runs it, so the cost is not new.
4. **The shortlist count:** the new design's Settings removes it once the deletion succeeds, before
   `signOutAfterDeleting()`, through a helper beside `writeShortlistCount`. Today's design never
   writes it.
5. **The email's list says what went** (`emails/account-deleted.tsx`, with 5.24): add "Your link to
   your school, and any school invitations sent to you". The owner approves the words in the pull
   request.
6. **The two invitations already left behind,** once, after the code is merged: a script in
   `scripts/` counts accepted student invitations whose address no account has (an aggregate), and
   deletes them only with `--apply`. Only accepted ones: a pending or expired invitation to an address
   with no account may be someone who never signed up (7.4's 90 days covers those). **The delete runs
   on production only with the owner's explicit approval, after a backup** (`AGENTS.md`).
7. **Vitest** for `deleteStudentAccount`, with the transaction client mocked: every table, the
   invitations by address without case and only `role: 'STUDENT'`, everything through `tx`, in order.
   Both routes call it, the cache is cleared after the commit, and a cache failure still answers 200.

**Must not:** touch another person's data (only this address's student invitations), add a read to
any page, or write to production without the owner's approval and a backup.

**Outside the database, for the Privacy Policy (7.4):** Resend's log of the emails it sent, Vercel's
logs, and any backups Supabase keeps each last as long as their provider keeps them. This task can't
delete them; the policy should say how long that is.

**Verify:** the tests. By hand, never on production data: on a throwaway local database, a student
with a profile, subjects, saved programs, a support ticket, an accepted invitation and a pending one
from a second school, and another student invited by the same school. Delete the first in Settings,
in today's design and in the preview, and again through the admin. Afterwards every table has no row
for that id or address, and the other student's invitation is still there.

**Session size:** Small to medium. Do it in the same session as 5.24, in one pull request: the same
two routes, the same `after()` and the same template.

**Done 20 October 2026** in rebranding build 22, but for step 6's `--apply`. `deleteStudentAccount` in
`lib/account/delete-student.ts` runs inside both routes' transaction; the admin's route no longer
deletes one table at a time. `clearShortlistCount()` beside `writeShortlistCount` runs in the new
design's Settings before signing out. Step 6 is `scripts/delete-orphaned-student-invitations.ts`; its
count on production, 20 October 2026, is 2, as above. The delete waits for the owner's approval and a
backup, after merging. Not done by hand: the throwaway-database check of every table.

---

### 5.26 — Send a signed-out coordinator to the coordinator sign-in, not a 404

**Outcome:** A coordinator who opens `/coordinator`, or any page under it, while signed out lands on
the coordinator sign-in, `/auth/coordinator`, signs in, and reaches their dashboard. Today they land
on the 404.

**Why:** `app/coordinator/layout.tsx` redirects a visitor with no session to
`/auth/coordinator/signin`, and so do 13 of the pages under it, but no such route exists. The
coordinator sign-in is `app/auth/coordinator/page.tsx`, at `/auth/coordinator`. Production, 19 October
2026: `curl -s -o /dev/null -w '%{http_code} %{redirect_url}'` gives `307
https://www.ibmatch.com/auth/coordinator/signin` for `/coordinator` and `/coordinator/dashboard`,
then `404` for that address, and `200` for `/auth/coordinator`. Every other link to the coordinator
sign-in already uses `/auth/coordinator` (the coordinator invitation cards, `app/auth/accept-invite`),
and no public page links to the portal, so only a coordinator who types the address or keeps a
bookmark reaches the 404. Found 19 October 2026, drawing rebranding D4.17 (For schools), whose board
recommends a "Sign in to the coordinator portal" link to `/auth/coordinator`.

**Steps:**

1. Export one constant, `COORDINATOR_SIGN_IN_PATH = '/auth/coordinator'`, from
   `lib/auth/callback-url.ts`, beside `INVITATIONS_PATH`.
2. Use it in all 14 redirects: `grep -rln "auth/coordinator/signin" app` lists them (the layout,
   `analytics`, `dashboard`, `settings`, `settings/subscription`, `students`, `students/invite`,
   `students/[id]`, `students/[id]/edit`, `students/[id]/matches`, `students/[id]/matches/[programId]`,
   `support`, `team` and `team/invite`). The pages' own checks run only after the layout's, but keep
   them, pointing at the constant.
3. Vitest for the layout, with `@/lib/auth/config` and `next/navigation` mocked (`redirect` throws, as
   Next's does): with no session it redirects to `COORDINATOR_SIGN_IN_PATH` and reads no database
   (`prisma` mocked, not called). The test also checks that `app/auth/coordinator/page.tsx` exists, so
   the constant can't point at a missing route again.

**Must not:** add a read to the layout or the sign-in page, or change where a signed-in student or
admin is sent (`/`, as now). The coordinator sign-in keeps returning to `/coordinator/dashboard`:
no email links deeper into the portal, so following a return path is not needed.

**Verify:** the test, and `grep -rn "auth/coordinator/signin" app lib components` prints nothing.
`npm run build`, then `npm start` (with `AUTH_TRUST_HOST=true`), then `curl -s -o /dev/null -w
'%{redirect_url}' localhost:3000/coordinator/students` ends in `/auth/coordinator`, which answers
200. After merging, the same `curl` on production.

**Session size:** Tiny. Fold into any session. Independent of the rebranding: D4.17's link goes to
`/auth/coordinator` directly.

**Done 22 October 2026**, on its own. `COORDINATOR_SIGN_IN_PATH` in `lib/auth/callback-url.ts` is used
by all 14 redirects; the test is `app/coordinator/layout.test.ts`, and it also checks that a signed-in
student is still sent to `/`. Locally, after `npm run build` and `npm start`: `/coordinator`,
`/coordinator/dashboard` and `/coordinator/students` answer `307` to `/auth/coordinator`, which answers
200. The same `curl` on production waits for the merge.

### 5.27 — Order Explore by the student's fit, not by the highest minimum

**Done 22 October 2026** (rebranding session 25, behind the preview). The order is
`lib/explore/best-fit.ts` (`fitTier`, `compareExploreBestFit`, `bestFitOrder`; `liftedOrder` and
`liftingFilters` for the fallback); the sorts, their menus and the line under the count are in
`lib/explore/query.ts` (`sortMenu`, `shownSort`, `bestFitLine`); `searchExplore` reads Best fit's
list with `browseObjects` alone. `ExploreQuery.sort` is now the picked sort or null, the visitor's
default, which is never written to the URL. With nothing typed, "Highest points needed" is served
by the one search, as "Most relevant" was, so signed out the cost and the rows are today's. The
fields and countries come in `exploreStudent`'s select and `exploreViewer`'s read, with no new
query. Checked against the board's 1,677 rows for the D3.1 student: LSE's Accounting and Finance at
row 158, Cambridge's Economics 176, UCD's Actuarial 187, Imperial's Biomaterials 189, and with the
switch on the same order as Matches' `compareBestFit` for all 1,341. In the preview, each
`EXPLORE_BEST_FIT` position once: `lifted` opens on UCD's 42, as the board said `optionalFilters`
would, `off` on Highest points needed. The usage script's first run: 2,423 of 10,000 this month
(24%), on pace for 3,500; 3,238 in the last 30 days.

**Outcome:** A signed-in student with grades who opens Explore sees the programs in their own fields
and countries first. The order is the same one Matches calls "Best fit", and the sort menu names it
honestly. Whether "Only ones I qualify for" is on or off, the order means something to the student.

**Why (owner, 20 October 2026):** on the new Explore, with "Only ones I qualify for" on and the sort
on "Most relevant", the list runs from the highest IB minimum down. The owner expected their
countries and fields first, then the rest. The code does what was built, but "Most relevant" names
something it isn't:

- The search index (`programs_production`, settings read 20 October 2026) ranks by how well the
  typed words match, then by `customRanking: desc(minimumIBPoints)` and nothing else. With nothing
  typed, every program ties on the words, so "Most relevant" is exactly "Highest minimum first", the
  third option in the same menu. That holds signed out too.
- `searchExplore` (`lib/explore/search.ts`) keeps the search's order for "Most relevant", with the
  switch on as well. The switch only removes programs; it never reorders them.
- Explore's fit ignores field and country on purpose: `programFit` (`lib/explore/fit.ts`) passes
  `NO_PREFERENCE` for both, because they don't decide the status. The page's read, `exploreViewer`
  (`lib/explore/student.ts`), already has the student's fields and countries, for the "Use my
  fields" and "Use my countries" shortcuts. But the student it hands the search, and the one the
  filter API reads with `exploreStudent`, have empty lists of both.
- D3.5 (approved 11 October 2026) chose the sorts "Most relevant", "Lowest" and "Highest", with no
  "Best fit". That suited a list for every visitor, but not a student with grades.

**What good practice says:** "relevance" means relevance to what was typed. With nothing typed, a
list should either say what its default order really is ("Highest minimum first") or rank for the
person, as a "Recommended for you" order does. Matches already has that ranking, `compareBestFit` in
`lib/matching/match-groups.ts`:
- the fit score comes first: academic 60%, country 30%, field 10%;
- then the minimum closest to the student's total;
- then programs with no minimum, then names A–Z.

With "Only ones I qualify for" on, every program left meets the academic part. The score then
separates them by country and field: the student's country and field first, their country in
another field next, then another country in their field, then the rest. Within each of those tiers,
"closest to your total" runs from the student's own total down, since every minimum left is at or
under it. So the points order the owner asked about is top-down, starting at the student's own total
rather than at 45. With the switch off, programs out of reach mix in at the same score, so the first
step decides whether the status should come first, as Matches' groups do.

**Steps:**

1. **Design first** (rebranding gates): done. "D3.5 Sort · best fit", canvas row 25, approved
   22 October 2026 (owner, every recommendation). Decisions below.
2. **Build** (session 25, `/build 25`): give the search the student's fields and countries. On the
   page they come from `exploreViewer`'s read; in `app/api/programs/explore/route.ts`, add the two
   relations to `exploreStudent`'s `select` (the same query, no new one). Give `programFit` a variant
   that also says whether the program is in the student's countries and fields, the way the matcher
   does (`calculateLocationMatch`, `calculateFieldMatch`; "Open to anywhere" counts every country).
   Order with the board's comparison: tier (countries and fields, countries, fields, the rest), then
   status (meets, close, gap), then the minimum closest to the total, then no minimum, then
   university and program A–Z. With the switch on this is `compareBestFit`'s order; test that it
   stays so. Read the full list for Best fit with `browseObjects` alone (no first search: Best fit
   uses no ranking), then cut the window. Add `best` to `ExploreSort` and `?sort=best`; the default
   is not written to the URL and depends on the visitor (below). Keep today's `?sort=relevant` links
   working.
3. **A fallback switch** (owner, 22 October 2026), so that Best fit can be made cheaper if it eats
   the search quota, by changing a setting rather than the code. One server-only variable in
   `lib/env.ts`, `EXPLORE_BEST_FIT`, `full`, `lifted` or `off`; unset means `full`. Changing it in
   Vercel and redeploying takes a couple of minutes.
   - `full`: as approved. One or two requests a list.
   - `lifted`: one search, today's single-request path, with the index's `optionalFilters` lifting the
     student's countries (`countryId:…<score=2>`) and fields (`fieldOfStudyId:…<score=1>`), so the
     tiers come first and inside each the search's own order, the highest minimum first, with the
     statuses mixed. The line under the count reads "Your countries and fields come first." and says
     nothing about status or the total. With "Only ones I qualify for" on, the full read happens
     anyway, so the approved order applies there at no extra cost.
   - `off`: no Best fit anywhere. Every visitor gets the signed-out menus and default, "Highest points
     needed" with nothing typed. One request a list.
   - A link with `?sort=best` opens with the visitor's default when the position doesn't offer it,
     and nothing breaks. Before reaching for `lifted`, the cheaper fix is to keep Best fit's full
     list on the server for a few minutes, shared between students and "Show 20 more", keyed by what
     was typed and the filters (never by student). Measure the list's size first: Next.js' data cache
     takes at most 2 MB an entry.
4. **A usage check** (owner, 22 October 2026): `scripts/algolia-usage.ts`, read-only, run with
   `npx tsx`. It reads Algolia's usage API, `GET
   https://usage.algolia.com/1/usage/total_search_requests?startDate=…&endDate=…&granularity=daily`
   with the `X-Algolia-Application-Id` and `X-Algolia-API-Key` headers (the admin key from `.env`;
   the `/2/` path answers 404), and prints this calendar month's requests against the free plan's
   10,000, the last 30 days, and this month's pace to its end: "6,200 of 10,000 this month (62%),
   on pace for 8,900". No database, no write, one request to the usage API. Add it to the README's
   scripts.
5. **Vitest:**
   - with the switch on, the order is "my country and field", then "my country", then "my field",
     then the rest, each tier closest to the student's total first, and equals `compareBestFit`;
   - with the switch off, inside a tier the ones met come first, then within reach, then missing;
   - the default sort: Best fit with grades and nothing typed, Most relevant with words typed, Highest
     points needed signed out or before grades with nothing typed; a picked sort survives typing;
   - "Most relevant" with words typed keeps the search's order;
   - a signed-out visitor's menu has no "Best fit", and with nothing typed no "Most relevant";
   - Best fit over more than 1,000 programs makes two requests, and none of them a search;
   - `EXPLORE_BEST_FIT=lifted` makes one search, with the two `optionalFilters` groups and its own
     line; `off` gives every visitor the signed-out menus; unset is `full`; `?sort=best` falls back
     to the default when the position doesn't offer it;
   - the usage script's sums and pace, from a mocked response.

**Decided on the board (22 October 2026, owner, every recommendation).** Canvas row 25.

- **"Best fit" is the default for a student with grades** when nothing is typed. Typing words makes
  "Most relevant" the default; clearing them brings Best fit back. A sort the student picks stays,
  words or not, in the URL. Signed out and before grades there is no Best fit.
- **The label is "Best fit", as on Matches,** and the order is Matches': with the switch on, Explore
  opens on Matches' first cards (LSE and UCL at 38, then Trinity and UBC at 37 for the D3.1 student).
- **The default says what it is.** With nothing typed, "Most relevant" leaves the menu, since it is
  "Highest points needed" under another name. Signed out or before grades the select reads "Highest
  points needed": the same rows as today, at one request. Menus: with grades and nothing typed, Best
  fit, Lowest, Highest; with grades and words, Most relevant, Best fit, Lowest, Highest; otherwise
  Highest and Lowest with nothing typed, and Most relevant, Lowest, Highest with words.
- **With the switch off: the student's countries and fields first, then in each the ones they meet,
  within reach, then the rest,** each closest to their total. Status first would put LSE's
  Accounting and Finance (1 point short) at row 1,342; the score alone at row 834, behind a program
  4 points short; this order at row 158.
- **The switch stays off by default** (owner, in chat): on, it would hide 336 programs, the 21
  within reach in the student's own countries and fields among them, and not fix the order.
- **One line under the count** for Best fit only: "Your countries and fields come first; in each, the
  ones you meet, closest to your 38." ("Your fields come first; …" when open to anywhere). It is
  Sort's `aria-describedby`. No group headings in the list.
- **The phone sheet doesn't change:** Sort stays on the page under the count (D4.7).
- **Search requests, approved:** the full order, read with browse: one request when 1,000 programs or
  fewer match, two past that, and the same again for each "Show 20 more". The switch's own full read
  drops from three to two the same way. 3,208 requests from 22 September to 20 October 2026, about a
  third of the free plan's 10,000 a month; about 5,000 to 6,600 a month after release at most.
  `optionalFilters` (included in the plan, tested 22 October 2026) is used only by the fallback
  switch's `lifted` position: it lifts the tiers but keeps the highest minimum first inside them.
- **A fallback switch and a usage check** (owner, in chat, after approving): `EXPLORE_BEST_FIT`
  (`full`, `lifted`, `off`) and `scripts/algolia-usage.ts`, steps 3 and 4. Check the usage each
  week after release; at about 8,000 on pace, keep the list on the server first, then `lifted`.

**Must not:** add a database query (the API route's existing query only selects two more relations),
read the programs cache, or change Matches' order. Make no more search requests than the board
approved: one or two per list for Best fit (one in `lifted`), one for every other sort with the switch
off.

**Verify:** the tests. In the preview, signed in with grades: with nothing typed and the switch on,
the first rows are in the student's countries and fields, starting at their own total. The URL
keeps the sort through a reload and Back. Signed out, the order and the menu are as the board
decides. In the preview, each position of `EXPLORE_BEST_FIT` once: `lifted` opens on the student's
countries and fields with one request in the log, `off` on Highest points needed. The usage script
prints this month's figure.

**Session size:** Small to medium: a change board (approved 22 October 2026), then one build session. Before release day,
because the new Explore shows the misleading order to every student. Independent of 5.26.

---

### 5.28 — Stop the rate limiters keeping account IDs and IP addresses forever

**Outcome:** The rate limiters keep a counter for the length of their window and nothing else. No record of who
was limited, or when, outlives its window, and the records already there are gone.

**Why:** Found 23 October 2026 by the owner's screenshot of Upstash's Data Browser while checking the legal pages
(7.4). `lib/rate-limit.ts` builds all seven limiters with `analytics: true`. Each request then adds an
entry to a sorted set named `ratelimit:<limiter>:events:<hour>`, `{"identifier": …, "success": true}`, and those sets
have **no TTL**: one on screen is from 30 August 2026, with a user ID in it. The `profile`, `matches`, `invite` and
`support` limiters, and `api` on most routes, are keyed by account ID; `search`, `auth`, and `api` on the public
legal-documents route, by IP address (`getClientIp`). Nothing reads the
records: the Upstash console's analytics view is the only consumer. They also outlive an account deletion
(5.25): a deleted student's ID stays in them. The Privacy Policy (7.4) cannot say the counters are kept "for a short time"
until this is fixed.

**Steps:**

1. In `lib/rate-limit.ts`, `analytics: false` in all seven limiters. A Vitest test mocks `@upstash/ratelimit` and
   `@/lib/redis/client` and fails if any limiter is created with `analytics: true`, so it cannot come back.
2. `scripts/purge-ratelimit-analytics.ts`: `SCAN`s for `ratelimit:*:events:*` only, checks each key's type is `zset`,
   and prints how many there are per limiter, the oldest and newest hour, and no identifiers. **A dry run by default**;
   `--apply` deletes with `UNLINK`, in batches. It never touches `ratelimit:<limiter>:<window>` (the live counters),
   `programs:all:v3` or the match cache.
3. The owner runs the dry run, reads the counts, and only then runs `--apply`. This task does not run it.

   Steps 1 and 2 are pull request #156 (`fix/rate-limit-analytics-off`); #159 fixed the script's paging.

**Done, 24 October 2026.** Both merged, and the owner applied the purge. The dry run that day found no
`ratelimit:*:events:*` key and one key in the whole database. The 429 check on production was not run (it means
sending sign-in requests to the live site); the limits themselves did not change.

**Must not:** run the purge against production without the owner approving the dry-run output; change a limit, a window or
an identifier.

**Verify:** the test; `npx tsc --noEmit`, `npx eslint .`, `npx prettier --check .`. After the purge, Upstash's Data
Browser shows no `ratelimit:*:events:*` key and the app still limits (a 429 after the sixth request in 10 seconds
to an `auth` route).

**Session size:** Tiny. **Before the new Privacy Policy is published.**

---

### 5.29 — Let an admin delete a coordinator who has sent invitations — **done**

**Outcome:** The admin's "delete coordinator" works for a coordinator who has invited anyone, and removes what the
Privacy Policy says it removes.

**Why:** Found 23 October 2026 (7.4). `Invitation.invitedBy` has no `onDelete` (`prisma/schema.prisma`, the `invitedBy`
relation), so Prisma restricts the delete, and `app/api/admin/coordinators/[id]/route.ts` calls `prisma.user.delete` alone:
a coordinator who has sent any invitation cannot be deleted from the admin. `scripts/cleanup-user-invitations.sql`
is the manual workaround. Read from the schema and the route; not run against production. The Privacy Policy
tells coordinators to ask for deletion, so it has to work.

**Steps:** one `prisma.$transaction`, as `deleteStudentAccount` is (`lib/account/delete-student.ts`): delete the
invitations the coordinator sent, and the one addressed to them (matched without case), which are what the cascade does
not reach, then the user; the profile, support tickets, sessions and sign-in rows cascade. A Vitest test with a mocked
transaction, as `delete-student.test.ts` does, for a coordinator with invitations.

**Must not:** delete the school, or the students linked to it (the school's own delete still refuses while it has
students).

**Verify:** the test and the usual checks; on a throwaway database, delete a coordinator who has an invitation.

**Session size:** Small.

**Done 26 October 2026.** `deleteCoordinatorAccount(tx, userId)` (`lib/account/delete-coordinator.ts`) deletes, in
order, every invitation the coordinator sent (students and coordinators, any status), the `COORDINATOR` invitation
sent to their address (matched without case), the sign-in links for their address, then the user; the profile,
support tickets, sessions and accounts cascade. `DELETE /api/admin/coordinators/[id]` runs it in one
`prisma.$transaction`. Nothing touches the school or its students. Vitest: `delete-coordinator.test.ts`, and a
`route.test.ts` for the handler that fails on the old route. On a throwaway local Postgres, a coordinator with an
admin's invitation, three of their own (an accepted student, a pending student, a coordinator) and a ticket, session,
account and sign-in link: the old `user.delete` failed with P2003 on `Invitation_invitedById_fkey`; the new one
deleted all of it, and the school, the linked student, the other coordinator and that coordinator's invitation
stayed. The school's other coordinators no longer see the deleted coordinator's invitations, so the Privacy Policy
draft's section 8 (`docs/legal-review/`) was reworded the same day: what a coordinator's deletion removes, and an
invitation goes with its sender's or invitee's account, not "while the school's account exists". An admin's unaccepted coordinator invitation
outlives its school (`ON DELETE SET NULL`); decided the same day (owner): kept, and the draft says so.
`scripts/cleanup-user-invitations.sql` is no longer needed for this, and was left in place.

---

### 5.30 — Store the published policy versions when someone accepts an invitation — **done**

**Outcome:** A student or coordinator who joins by invitation is recorded as having accepted the versions of the Terms and
Privacy Policy that are published, so the "We've updated our policies" notice does not appear on their first visit.

**Why:** Found 23 October 2026 (7.4). Both invitation routes store a constant that was never a published label:
`'2025-12-14'` in `app/api/auth/accept-student-invite/route.ts` and `'2025-12-09'` in
`app/api/auth/accept-invite/route.ts`. `checkConsentStatus` compares labels exactly (`lib/legal-documents/consent.ts`),
so the invited person sees the notice at once, minutes after agreeing on the invitation. `app/api/students/consent/route.ts`,
which would store `'2025-12-09'` too, is called by nothing.

**Steps:** use `getCurrentVersionLabels()` for `termsVersion` and `privacyPolicyVersion` in both routes. The
coordinator-access consent version (`'2025-12-14'` in two routes) is a separate record of what the invitation's box said:
keep it. Delete `app/api/students/consent/route.ts`. Tests for both routes.

**Must not:** change what either invitation page says or asks, or the sign-in consent line. **A consent flow, so
its own pull request, not the one that publishes the legal pages.**

**Verify:** the tests; accept an invitation on a throwaway database and confirm no notice follows.

**Session size:** Small.

**Done 26 October 2026.** `accept-student-invite` and `accept-invite` read `getCurrentVersionLabels()` after the
invitation passes its checks (two small reads of `LegalDocument`, only on an accepted invitation) and store those labels
with the time. When nothing is published they store the time and no label, and the notice appears once a version is
published, as for an account made at sign-in. The coordinator-access version `'2025-12-14'` is unchanged in both student routes. Neither page's
words changed. `app/api/students/consent/route.ts` is deleted. Each route has a `route.test.ts` that runs the real
`checkConsentStatus` on what was stored; the label tests fail on the old routes. On a throwaway local Postgres, with
both documents published, a student and a coordinator each accepted an invitation and `checkConsentStatus` showed no
notice for either. `docs/legal-review/product-today.md` and the review's README (F3) still describe the old behaviour
as the 23 October finding; they were left as written.

---

### 5.31 — Put the consent records, support tickets and invitations in the data export — **done**

**Outcome:** "Download your data" returns everything the account holds about the student, which is what the Privacy
Policy will say it does.

**Why:** Found 23 October 2026 (7.4). `app/api/students/account/export/route.ts` returns the account, profile,
preferences and saved programs. It leaves out the accepted policy versions and dates, the school link's consent, the
student's support tickets and any invitation sent to their address.

**Steps:** add three blocks to the export with `select`, not `include`: `consent` (the four `User` fields and the
`StudentProfile` coordinator-access fields), `supportTickets` (number, category, subject, message, reply, dates) and
`invitations` (school, status, dates). Raise `exportVersion` to `'1.1'`. Extend `route.test.ts`.

**Must not:** add a field that holds another person's data, or read the whole of a table.

**Verify:** the test; the download from a throwaway account.

**Session size:** Small. After it, the Privacy Policy's sentence about what the download contains is shortened.

**Done 26 October 2026.** `exportVersion` is `'1.1'`. `consent` holds the four `User` fields and, under
`coordinatorAccess`, `linkedByInvitation` and the consent's date and version (null with no profile).
`supportTickets` comes from the same `User` query: number, category, status, subject, message, the reply and three
dates, but not who resolved it. `invitations` is one more `findMany`, with the filter `lib/account/delete-student.ts` deletes
by (`role: 'STUDENT'`, the address case-insensitively), so the export shows what deleting the account removes. The
case-insensitive match cannot use the `email` index, so Postgres scans the small `Invitation` table, but only the
student's rows leave the database. It returns school name, status and the sent, expiry and accepted dates, never the sender, the
token or the address. Six new tests in `route.test.ts` fail on the old route. On a throwaway local Postgres, the
download from `next dev` held a mixed-case invitation and left out a coordinator invitation to the same address,
another student's invitation and another user's ticket. The Privacy Policy draft (`privacy-policy.proposed.md` and
its redline, section 9) now says "download all your data as a file" and no longer offers support requests by
request; `docs/legal-review/README.md` (F4) and `product-today.md` say so.

---

### 5.32 — Redact the address in the support-ticket email logs — **done**

**Outcome:** The support-ticket emails log the recipient the way the account emails do: `ab***@example.com`.

**Why:** Found 23 October 2026 (7.4). `lib/email/support-tickets.ts` passes `to: params.to` to the logger in the success
and failure branches of both senders; `lib/email/account-emails.ts` redacts it. The logs last a day on the current Vercel
plan, so this is consistency, not an incident.

**Steps:** one shared `redactEmailAddress` in `lib/email/`, used by both files; a test.

**Verify:** the test and the usual checks.

**Session size:** Tiny. Fold into any session.

**Done 26 October 2026.** `lib/email/redact.ts` keeps two characters and the domain, and one fewer for a local part of
one or two characters, so a whole address is never logged (the old regex in `account-emails.ts` logged `a@x.com`
whole). Both senders in `support-tickets.ts` and `account-emails.ts` use it. `redact.test.ts` checks the function and
what the three senders log on success and failure. `docs/legal-review/README.md` (F5) says so.

---

### 5.33 — Stop telling a coordinator to "upgrade to VIP" — **done**

**Outcome:** The portal says what a school can do: subscribe. VIP is an early-adopter plan IB Match grants, not one a
coordinator can buy (Terms 6.2).

**Why:** Found 23 October 2026 (7.4). "Upgrade to VIP" appears in `app/coordinator/students/page.tsx` (three places),
`app/coordinator/dashboard/page.tsx`, `app/coordinator/students/[id]/page.tsx`, and in two API error messages
(`app/api/coordinator/students/[id]/route.ts`, `…/matches/route.ts`), and as the default label of
`components/admin/shared/UpgradePromptBanner.tsx`. The paid route is the subscription page.

**Steps:** "Subscribe to …" wording, linking to `/coordinator/settings/subscription` where a link already exists; keep the
text of the API errors honest ("Subscribe to edit student data"). The portal keeps today's design: change words only.

**Verify:** `grep -rn "pgrade to VIP" app components` prints nothing; the usual checks.

**Session size:** Tiny. Fold into any session.

**Done 26 October 2026.** Words only. The banner's default button is "Subscribe", and its subtle variant says
"{feature} needs a subscription" with a "Subscribe" link (it said "requires VIP" and "Upgrade"). The dashboard's
locked quick action says "With a subscription" (it said "VIP Feature"). The students list, the student page and the
two API errors say "Subscribe …". The students list's limit message showed a literal `&apos;` (a JS string, not JSX
text); it now says "You've". "VIP" stays where it names the plan a school has (settings, the subscription page, the
admin). `claims.md` P1 and `docs/legal-review/README.md` F6 say so. Left as it was: the subtle banner names its
feature and then "needs a subscription", which reads oddly for "3 student invites remaining"; its description is not
shown in that variant. A wording change there needs the banner's layout, so it waits for the portal's redesign.

---

### 5.34 — Let a late Stripe event never change a school's subscription — **done**

**Outcome:** A school's subscription status follows its current Stripe subscription as it is
now, whatever order the events arrive in.

**Why:** Found 26 October 2026 while testing the webhook (7.1 Part 2). In
`app/api/webhooks/stripe/route.ts`, `handleSubscriptionUpdate` and `handleSubscriptionDeleted`
write the status in the event's snapshot, and find the school by the subscription's `schoolId`
without checking that the event's subscription is the one stored in `stripeSubscriptionId`.
Stripe does not deliver events in order, and retries a failed delivery for up to three days —
the route answers 500 on a failed write, as it should. Two ways that goes wrong:

1. **A cancelled school gets full access back.** An `updated` event with status `active` fails
   once (a database blip). The school cancels; `deleted` arrives and sets `CANCELLED`. Stripe's
   retry of the old `updated` then sets `ACTIVE`, and nothing ever corrects it, because a
   deleted subscription sends no more events.
2. **A paying school loses access.** `create-checkout` refuses only a school that is already
   `ACTIVE`, so two checkouts opened before either completes (two tabs) make two subscriptions.
   When the school cancels the extra one, its `deleted` event sets the school `CANCELLED` while
   the other is still billing. Its `updated` events also overwrite `stripeSubscriptionId`.

No school is exposed today: on 26 October 2026 no school has a Stripe customer. **Fix it before
the first REGULAR school subscribes.**

**Steps:**
- In both subscription handlers, read the subscription's current state with
  `getStripe().subscriptions.retrieve(id)` and act on that, not on the snapshot. That is
  Stripe's advice for ordering, and it costs one Stripe API call per event — no database,
  Redis or Algolia read.
- Act only on the school's current subscription: when the school already stores a different
  `stripeSubscriptionId` and that one is still live, ignore the event. Decide in the session
  what `created` should do when it arrives before `checkout.session.completed`, which sets the
  ID; the tests in `route.test.ts` show the order of lookups today.
- Stop the second subscription arising at all: `create-checkout` can refuse while the customer
  already has a live subscription. `getCustomerSubscriptionStatus` in `lib/stripe/server.ts`
  makes that check and is called by nothing today. One Stripe API call per checkout.
- Give the school lookups `select: { id: true, stripeSubscriptionId: true }`; today they read
  the whole row (Standing context: prefer `select`).
- Extend `app/api/webhooks/stripe/route.test.ts` with both scenarios above, failing first. Mock
  `subscriptions.retrieve` on the client `getStripe()` returns; keep the signing real.

**Decided by the owner, 26 October 2026: a failed renewal keeps access until Stripe gives up.**
Today `past_due` means `INACTIVE` at once, so a school whose renewal payment fails loses its paid
features that minute while Stripe is still retrying the card. In this session, map `past_due` to
`ACTIVE`; `unpaid`, `canceled` and the rest stay `INACTIVE`. Change the `past_due` row of the
status table in `route.test.ts` with it.

**This depends on a Stripe setting — check it first.** In the Stripe Dashboard's settings for
failed subscription payments (under Billing → Revenue recovery → Retries when this was written),
the action when all retries for a payment fail must be **cancel the
subscription** or **mark the subscription as unpaid**. If it is "leave the subscription past-due",
Stripe never gives up, and a school that stopped paying keeps full access forever. The session
cannot see the Dashboard: ask the owner to confirm the setting, record it here, and do not merge
the `past_due` change until they have.

**Must not:** change the signature checks, or answer 200 to a failed write.

**Verify:** the new tests fail on today's route and pass after; `npm test`; the usual checks. A
real run needs Stripe test mode and `stripe listen` against a throwaway database, never
production.

**Session size:** Small. A change to money logic, so its own pull request.

**Done 26 October 2026.** **Stripe setting confirmed by the owner, 26 October 2026: when all
retries for a payment fail, Stripe cancels the subscription.** So `past_due` ends in `canceled`,
which the webhook writes as `CANCELLED`. If that setting is ever changed to "leave the
subscription past-due", `past_due` must come out of `PAID` in `lib/stripe/subscription-status.ts`
the same day.

- **One path for every event.** `checkout.session.completed` and `customer.subscription.created`,
  `.updated` and `.deleted` all end in `applySubscription` in `app/api/webhooks/stripe/route.ts`.
  It asks Stripe for the subscription's status now (`getSubscriptionStatus` in
  `lib/stripe/server.ts`) and writes that; the status inside the event is never read. One Stripe
  API call per event, and a second only when the school stores a different subscription.
- **Only the school's current subscription.** When the school stores a different subscription
  and Stripe says that one is still live (`active`, `trialing`, `past_due`, `unpaid` or `paused`),
  the event is ignored with 200 — a late event for an old subscription, or a second one opened in
  another tab. Once the stored one has ended, or Stripe no longer has it, the event's subscription
  takes its place. That answers the open question about `created`: arriving before its checkout,
  it is adopted when the school has no live subscription, and ignored when it has.
- **The status rules** are in `lib/stripe/subscription-status.ts`: `active`, `trialing` and
  `past_due` give `ACTIVE` (the owner's decision); `canceled` gives `CANCELLED`, from whichever
  event reports it, where an `updated` saying `canceled` used to give `INACTIVE`; everything else,
  including a status Stripe adds later, gives `INACTIVE`. Access is the same for both.
- **Checkout refuses a school whose Stripe customer has a live subscription**, with 409, before a
  checkout is created (`hasLiveSubscription`, which replaced the unused
  `getCustomerSubscriptionStatus`). One Stripe call per checkout, only for a returning customer.
- **Lookups** read `select: { id: true, stripeSubscriptionId: true }`. A checkout for a school
  that does not exist, or for a subscription Stripe does not have, now answers 200 with nothing
  written, instead of failing on every retry for three days.

**Tests.** `app/api/webhooks/stripe/route.test.ts` (69) mocks only `subscriptions.retrieve`; the
signing stays real. Both scenarios above were written first and failed on the old route — 46 of
69 failed — then passed. `lib/stripe/server.test.ts` (8) covers the two Stripe reads; the
checkout test gained the 409. Three deliberate breaks each failed: the current-subscription guard
removed (3 tests), `past_due` taken out of the paid statuses (3), the checkout guard removed (1).

---

### 5.35 — Give the last six signed-in handlers a rate limit — **done**

**Outcome:** Every handler that needs a session has a limiter, so
`NOT_RATE_LIMITED` in `app/api/route-gates.test.ts` keeps only the three handlers that have none
by design.

**Why:** Found 26 October 2026 (7.1 Part 3). These six have no `applyRateLimit`: PATCH and DELETE
`admin/legal-documents/[type]/versions/[id]` (the GET beside them has one), and the GETs of
`coordinator/students/invite`, `coordinator/team/invite`, `students/consent` and
`support/tickets`. Each needs a session and reads only its caller's own rows, so this is
consistency, not an incident.

**Steps:** `applyRateLimit('api', session.user.id)` straight after the session check in each,
as their neighbours do; delete the six entries from `NOT_RATE_LIMITED`.

**Load:** one Upstash command per call to these six. All six are low-traffic: a page load, a
list, an admin edit.

**Verify:** `route-gates.test.ts` passes with the entries gone; the usual checks.

**Session size:** Tiny. Fold into any session.

**Done 26 October 2026, in the same pull request as 5.36.** `applyRateLimit('api', …)` after the
session check in all six, on the `api` limiter (60 a minute), as their neighbours use. Four of the
six are reads; the other two are admin edits. `NOT_RATE_LIMITED` now
holds only the preview pair and the Stripe webhook.

---

### 5.36 — Refuse a revoked coordinator in every coordinator API route — **done**

**Outcome:** When an admin revokes a coordinator's access, every coordinator API route refuses
them, as the coordinator pages already do.

**Why:** Found 26 October 2026 (7.1 Part 3). `PATCH /api/admin/coordinators/[id]/access` sets
`CoordinatorProfile.isActive` to `false`. `app/coordinator/layout.tsx` refuses such a coordinator,
and so do the four invitation write routes, but these 10 handlers never read `isActive`:

- `GET coordinator/students`, `GET` and `PATCH coordinator/students/[id]`,
  `GET coordinator/students/[id]/matches` — the school's students, their grades, and editing them
- `GET coordinator/analytics`
- `GET coordinator/students/invite`, `GET coordinator/students/invite/[id]`,
  `GET coordinator/team/invite`
- `POST subscriptions/create-checkout` and `POST subscriptions/create-portal` — the billing portal
  can cancel the school's subscription or change its card

Sessions are JWTs that last 30 days and renew on use, and revoking does not end them. A coordinator
who left the school, and whose access was revoked for that reason, can still call these with the
session they have.

**Steps:**
- Refuse `!coordinator.isActive` with 403, straight after the profile lookup, in all 10 —
  the same check and message as `coordinator/students/invite/[id]` DELETE. The profile lookups
  that use `select` need `isActive` added.
- Empty `REVOCATION_NOT_CHECKED` in `app/api/route-gates.test.ts`, then delete it.
- While in the two subscription routes: drop the `successUrl`, `cancelUrl` and `returnUrl` the
  routes take from the request body. Nothing sends them, and Stripe redirects the browser to
  whatever they say. Always use the built URLs.

**Must not:** change what an active coordinator can do, or add a read: `isActive` comes from the
profile row each route already reads.

**Verify:** `route-gates.test.ts` with the list gone; on a throwaway database, revoke a
coordinator and call `/api/coordinator/students` with their session: 403.

**Session size:** Small. A change to security checks, so its own pull request.

**Done 26 October 2026.** All 10 handlers refuse `!coordinator.isActive` with 403 straight after
the profile check, with the message the invitation routes already used. Every lookup used a
top-level `include`, so `isActive` was already in the row: no query changed and nothing new is
read. `REVOCATION_NOT_CHECKED` is gone, so `route-gates.test.ts` now requires every coordinator
and subscription handler to refuse a revoked coordinator — removing the check from one route fails
it. The subscription routes no longer read the request at all: `successUrl`, `cancelUrl` and
`returnUrl` are always built from `NEXT_PUBLIC_APP_URL`, and both handlers take no argument.

Three older test fixtures built a coordinator profile without `isActive` and were refused once the
check landed; they now say `isActive: true`. The two subscription tests gained a revoked case each.
No coordinator page changes: `app/coordinator/layout.tsx` already refused a revoked coordinator, so
no page of theirs calls these routes.

---

### 5.37 — Close the database's public API: Row Level Security is off on every table — **done**

**Outcome:** Supabase's Security Advisor shows no "RLS Disabled in Public" errors. The `anon` and
`authenticated` roles can't read or change any table, through the Data API or any other way. The app
works exactly as before.

Added 26 October 2026 (owner): Supabase emailed "Action required: security vulnerabilities detected in
your projects", "mostly about RLS Disabled in Public. Need to check if I can ignore it." **It can't be
ignored.** It is not open today, but one leaked key would open it.

**Why.** Checked 26 October 2026, with catalog queries and one Data API request that asked for zero
rows:

- **All 24 tables in `public` have Row Level Security off, and no policies.**
- **`anon` and `authenticated` hold `SELECT`, `INSERT`, `UPDATE` and `DELETE` on all 24.** These are
  Supabase's default grants on `public`.
- **The Data API is on and serves `public`.** With the service key, `/rest/v1/User?select=id&limit=0`
  answers 200.
- So **whoever holds the project's `anon` (or publishable) key can read, change and delete every
  table** over HTTPS. That includes:
  - every address;
  - `Account`, which holds Google's sign-in tokens;
  - `VerificationToken`, the sign-in links;
  - every profile and its grades.

  Supabase treats that key as public, meant to be put in browsers.
- **What keeps it closed today is luck, not design.** `NEXT_PUBLIC_SUPABASE_ANON_KEY` is declared in
  `lib/env.ts` and nothing uses it. Git history shows no use either, so no bundle ever carried it. The
  value in `.env` is not valid (the API answers "Invalid API key"). A key in a bundle, a screenshot or a
  leaked `.env` would open the database.
- **The app doesn't need the Data API.**
  - Prisma connects as `postgres`, which owns all 24 tables and has `BYPASSRLS`, so turning Row Level
    Security on changes nothing for the app.
  - `supabase-js` is used only for Storage, with the service-role key (`lib/supabase/storage.ts`), and
    Storage is a separate API.

**Steps:**

1. **The owner, at once, in the Supabase dashboard:** turn the Data API off, or take `public` out of
   its exposed schemas. Then the zero-row request above answers with an error, not 200. Check that an
   admin image upload still works (Storage).
2. **A migration** (`prisma migrate deploy` only):
   - `ENABLE ROW LEVEL SECURITY` on all 24 tables, with no policies, so `anon` and `authenticated` are
     refused and the owner role is unaffected;
   - `REVOKE ALL` on the tables, sequences and functions in `public` from `anon` and `authenticated`;
   - `ALTER DEFAULT PRIVILEGES` so new tables don't get those grants again.

   CI's throwaway Postgres has no `anon` or `authenticated` role. Wrap the grants in a `DO` block that
   checks the roles exist, or CI fails.
3. **Keep new tables closed.** Either an event trigger that turns Row Level Security on for every new
   table in `public`, as Supabase's docs suggest (check that `postgres` may create one), or a script
   that counts tables without it, run in each migration session. Recommend one.
4. **Read the rest of the Security Advisor.** The owner pastes the list, or exports it. Give each
   finding a fix or a reason to accept it. Supabase Auth is unused here (sign-in is Auth.js), so sign-ups
   to it can be turned off.
5. **Remove the unused key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` from `lib/env.ts`, `.env.example` and
   Vercel's variables. Check the dashboard for a publishable key, and where it is used.

**Must not:**

- Change the Storage buckets or their policies; the images are public on purpose.
- Use `FORCE ROW LEVEL SECURITY`.
- Run `prisma migrate dev` or `prisma db push`.
- Read rows to test: count, or ask for zero rows.

**Verify:**

- In the catalog, no table in `public` without Row Level Security, and no `anon` or `authenticated`
  privilege on any.
- The zero-row request is refused.
- Sign-in, Matches, Saved, an admin edit and an image upload all work.
- CI is green, so the migration runs on plain Postgres.
- The Security Advisor no longer shows the error.

**Session size:** Small. Step 1 takes the owner a minute and closes the hole; the rest makes it stay
closed.

**Done 26 October 2026.**

- **Step 1 (owner).** The Data API is off. The zero-row request now answers 503 (`PGRST002`) every
  time, even with the service key; so does `/graphql/v1`. `/storage/v1` still answers 200.
- **Step 2.** Migration `20261026120000_enable_row_level_security`, applied with `prisma migrate
  deploy`:
  - Row Level Security is on for all 24 tables, `_prisma_migrations` included, with no policies and
    no `FORCE`.
  - `anon` and `authenticated` have no privilege on any table. `public` has no sequences or
    functions; the revokes cover them anyway.
  - `postgres`'s default privileges in `public` no longer grant them anything. `supabase_admin`'s
    defaults still do. They belong to Supabase, `postgres` can't change them, and `supabase_admin`
    creates nothing in `public`.
  - The grants are in a `DO` block that checks each role exists, so CI's plain Postgres runs it.
- **Step 3: an event trigger, not a counting script.** `enable_rls_on_new_tables` turns Row Level
  Security on for every table created in `public`.
  - It works unattended; a script only works if a session remembers to run it.
  - `postgres` may create it through `supabase_privileged_role`. That was checked on production in a
    rolled-back transaction first: a new table came out with Row Level Security on, and nothing was
    left behind.
  - It isn't `SECURITY DEFINER`, and `PUBLIC` can't execute it.
  - CI's build job now counts tables without Row Level Security after `migrate deploy` and fails on
    any. That catches a later migration that turns it off, which the trigger can't.
- **Checked on a throwaway local Postgres, twice.**
  - Plain, as CI: 24 of 24 tables have Row Level Security, and `migrate diff` against the schema
    prints "No difference detected". Prisma's schema doesn't model Row Level Security, grants or
    event triggers.
  - With Supabase's roles and default grants recreated: every grant and default gone. A `SELECT` as
    `anon` is refused. New tables in `public` (`CREATE TABLE` and `CREATE TABLE AS`) start with Row
    Level Security on, and other schemas are untouched.
- **Checked on production after the apply.**
  - In the catalog: 24 of 24 tables have Row Level Security, none `FORCE`d, and no `anon` or
    `authenticated` privilege is left.
  - Through `lib/prisma-standalone`: 201 users, 1,677 programs and 104 universities counted.
  - `/`, `/ib-university-requirements` and `/api/auth/session` answer 200.
- **Step 4, the rest of the Security Advisor: waits for the owner's list.**
  - Expected now: `rls_enabled_no_policy` once per table, at INFO level. That is the intent: no
    policy means every role but the owner is refused, so accept it.
  - Checked in the catalog, so they shouldn't appear:
    - `function_search_path_mutable`: the one function sets `search_path`;
    - `extension_in_public`: no extension lives in `public`;
    - `security_definer_view` and `materialized_view_in_api`: `public` holds only tables and indexes.
  - The Auth findings (leaked-password protection, OTP expiry, MFA) are about Supabase Auth, which is
    unused here: sign-in is Auth.js. Turn off its sign-ups and accept them.
- **Step 5.** `NEXT_PUBLIC_SUPABASE_ANON_KEY` is gone from `lib/env.ts` and `.env.example`. The schema
  strips unknown keys, so the variable left in Vercel or in a local `.env` is harmless. Deleting it in
  Vercel and checking the dashboard for a publishable key wait for the owner.
- **Still for the owner:** an admin image upload (Storage), plus sign-in, Matches and Saved on the live
  site. Nothing in the app reads through the Data API, so none should change.

---

### 5.38 — Say "30-minute call" on For schools: the call is 30 minutes — **done**

**Outcome:** Every button that offers the coordinator call says 30 minutes, the length of the
Calendly event, in both designs.

Added 26 October 2026 (owner): "We have a CTA with '…15 mins…' on https://www.ibmatch.com/for-coordinators
… The actual timeslot is 30 mins. Need to find all these CTAs and fix the time to be 30 mins."

**Where.** Searched 26 October 2026 across `app`, `components`, `lib` and `emails`. Three labels, all on
`/for-coordinators`:

- `app/for-coordinators/NewForCoordinators.tsx`: `CALL = 'Schedule a 15-minute call'`, used by the
  hero's button and the closing panel's (the new design, D4.17);
- `app/for-coordinators/_components/CoordinatorHero.tsx`: "Schedule a 15-min feedback call" (today's
  design);
- `app/for-coordinators/_components/CoordinatorCTA.tsx`: "Schedule a 15-minute call" (today's design).

No other page, metadata, structured data or email mentions the call's length. The Calendly link
(`calendly.com/ibmatch/feedback-call-with-ib-coordinator`) has no length in it.

**Steps:** "15-minute" becomes "30-minute" in the new design and in `CoordinatorCTA.tsx`. "15-min
feedback call" becomes "30-minute feedback call" in `CoordinatorHero.tsx`. Update the words recorded
for D4.17 in `REBRANDING_tasks.md` (build 21, the hero) to match. Words only; the approved board's
layout doesn't change.

**Verify:** `git grep -n -i -E "15[ -]?min" -- app components` prints nothing; the page in both
designs; the usual checks.

**Session size:** Tiny. Fold into any session.

**Done 26 October 2026.** The new design's `CALL` and `CoordinatorCTA.tsx` say "Schedule a 30-minute call". Today's
hero says "Schedule a 30-min feedback call", not "30-minute": at 390px "30-minute feedback call" wrapped the pill to
two lines (76px tall, 52 before), and "30-min" is the old label's length, so the hero looks as it did. Measured with
`npm start` at 390px and 1440px: every call button one line, no horizontal scroll; at 360px both of today's buttons
wrap, as they did on `main`. `REBRANDING_tasks.md` D4.17 and build 21 record the new label.

---

### 5.39 — Store the "two of" rules the matcher could not hold — **done**

**Outcome:** A program that asks for two subjects from a list ("two of Biology, Chemistry or Physics")
stores two requirements, each needing a course of its own. Today one is stored and one science
meets it.

**Why:** Found in 5.18 step 1 (26 October 2026, `docs/matching/5.18-shared-courses.md`). The content
refreshes stored one requirement where the page says "two of", because the matcher let one course meet
both, and each program's notes say so ("the model cannot hold 'two of'"). Trinity's 14 programs of this
kind are in 5.18 itself. These are the rest, found in the notes of `scripts/programs/2027/`:

- McGill, 13: Arts and Science, Biochemistry, Biology, Bioresource Engineering, Chemistry, Computer
  Science, Dietetics and Human Nutrition, Environmental Science, Food Science, Kinesiology,
  Mathematics, Nursing, Physics.
- Alberta, 15: Astrophysics, Biochemistry and its Honors, Computing Science - Software Practice
  (Honors), Computing Science (Honors), Ecology, Evolution and Environmental Biology (Honors), Geology,
  Immunology and Infection, Mathematics and Economics (Honors), Mathematics and Finance (Honors),
  Mathematics-Physics, Molecular, Cellular and Developmental Biology and its Honors, Pharmacology
  (Honors), Statistics.
- Waterloo, 12: Biochemistry, Biology, Biomedical Sciences, Chemistry, Earth Sciences, Environmental
  Sciences, Honours Science, Kinesiology, Materials and Nanosciences, Medicinal Chemistry, Physics,
  Physics and Astronomy.
- Trinity Physical Sciences and Physics (Physical Sciences); Imperial Geology; NUS Nursing; Leiden
  Science for Sustainable Societies; Lund Physics; Cambridge Natural Sciences.

**Read first:** 5.18 and its record; the program's notes in its data file; the content refresh workflow
(`scripts/programs/refresh.ts`, `docs/tasks/CONTENT_tasks.md`).

**Steps:**

1. For each program, read the official page again and confirm the "two of" rule, and whether a course
   in it may also meet another requirement (Alberta's note says Maths AA already serves as Math 31).
2. In the data file, add the second requirement and mark the pair as needing their own courses, with
   the field 5.18 step 3 adds. Correct each note that says the model cannot hold it.
3. Dry run, then the owner approves the write; a backup comes first, as for every refresh. Clear the
   match cache.

**Must not:** start before 5.18 step 3 has merged; change any program outside the list without
reading its page.

**Verify:** the refresh dry run lists only these programs; `npm test`; a profile with one science from
the list no longer meets the requirement, and one with two does.

**Session size:** Medium, content. Depends on 5.18 steps 2 and 3.

**Done, 27 October 2026: 47 programs.** Approved by the owner and written the same day.
Each university's page was re-read on 27 October; every one still states the "two of" rule.

| University | Programs | Re-read | What it says |
|---|---|---|---|
| McGill | 13 | [IB page](https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib) | "Mathematics and two of Biology, Chemistry or Physics, at Higher or Standard Level". Maths is not one of the two. The Faculty of Science's Physical group is now "Physical, Earth, Math and Computer Sciences Group" (same grades), and an "Earth, Geographic, and Climate Sciences Group" is new for Fall 2027 (grades "TBD") |
| Alberta | 15 | [Admission to Science](https://www.ualberta.ca/en/science/programs/bachelor-of-science/admission-to-science/index.html), [IB equivalents](https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html) | "Two courses from: Biology 30; Chemistry 30; Mathematics 31; Physics 30; Computing Science Advanced Level (CTS)". Maths AA (HL/SL) is "Math 30-1/Math 31", so Maths AA is one of the list and may also be the maths row. IB Computer Science is "Science 30-level", not CTS. The programme pages' requirement tabs load by script, and the calendar answers scripts with an empty page |
| Waterloo | 12 | the six IB admission pages (Life, Physical, Biomedical, Environmental Sciences, Honours Science, Kinesiology) | "Two of Biology, Chemistry, or Physics" |
| Trinity | 2 (Physical Sciences, Physics) | 2027 prospectus, alert list | TR063 "will still require two science subjects at … International Baccalaureate HL5". Maths is not in the list. The course pages show no IB line |
| Imperial | Geology | [course page](https://www.imperial.ac.uk/study/courses/undergraduate/geology-msci/) | "grade 6 in two of the following subjects at higher level" |
| NUS | Nursing | IB prerequisites PDF ("Information accurate as of December 2025") | "Any two passes in HL Biology, HL Chemistry, HL Computer Science, HL MAA, or HL Physics" |
| Leiden | Science for Sustainable Societies | "Specific diploma requirements for science and medical programmes 2027-2028" (read through WebFetch: the site serves scripts a bot check) | "+ 1 HL and 1 SL subject" from Biology, Chemistry, Physics, Economics, Geography, ESS. Stored as the HL 4 group and the same list at SL 4 |
| Lund | Physical Geography and Ecosystem Science (the task's "Lund Physics": Physics itself stores three separate rows and is right) | [study page](https://www.lunduniversity.lu.se/study/sciences-physical-geography-and-ecosystem-science-NGNAT-INES), Autumn 2027 | "Mathematics 4 … together with two of the courses Biology 2 …, Physics 2 … and Chemistry 2" |
| Cambridge | Natural Sciences | [course page](https://www.undergraduate.study.cam.ac.uk/courses/natural-sciences-ba-hons-msci), "for entry in 2027" | "Mathematics" and "2 other science or mathematics subjects (Biology, Chemistry, Physics …)" at HL |

- **The data files.** Each program's group is stored twice and both copies are marked `ownCourse`; the
  notes are corrected and dated. Maths rows are never marked, so where the list includes maths (Alberta,
  NUS, Imperial) Maths may also count for the maths requirement.
- **Cambridge** is in the content 1.2 file, which `apply-2027-requirements.ts` writes. That script now reads
  and writes `ownCourse` too, and clears the cached matches as `refresh.ts` does.
- **Dry run:** `refresh.ts` over the eight refresh files gives 46 changes, and `apply-2027-requirements.ts
  --only university-of-cambridge` gives 1. All are subject changes; no stamps move.
- **Checked with the matcher** on each program's requirements from its data file: a student with two
  different subjects from the list meets them, and the same student without the second does not, in all 32
  programs outside Alberta. At Alberta, Maths AA with one science meets them, as the equivalents table reads.
- **Alberta, decided by the owner:** Maths AA stays in the list, so Maths AA and one science meet it.
- **The write** (27 October): `apply-2027-requirements.ts --only university-of-cambridge --apply` (backup
  `scripts/programs/2027/backups/2026-10-27T07-48-10-179Z.json`) and `refresh.ts` over the eight files
  (backup `scripts/backups/refresh/2026-10-27T07-48-14-617Z.json`), both git-ignored: 47 of 47 written,
  47 search records synced, the programs cache and the cached matches cleared. Checked after: both dry runs
  find nothing to change; in production 65 programs (5.18's 18 and these 47) have `ownCourse`, in 130
  groups, each program with two, and no group marked on some options only.

---

### 5.40 — Keep every program a student qualifies for on Matches — **done**

**Outcome:** The "Meets all requirements" group on Matches holds every program in the student's fields
and countries that they meet, the same programs as Explore with those filters and "Only ones I qualify
for" on. Scores do not change. Programs far under the student's total are not hidden; they sit lower in
the group, because the order already puts the minimum closest to the total first.

**Rewritten 30 October 2026.** The first version (#221) was words only and said the score already
handles an over-qualified student. It does not: see "Why". The owner then asked for the cost of the full
change, it was measured, and the owner chose it.

**Why (owner, 28 October 2026):** with 36 points, three fields and six countries, Matches shows 2 programs
under "Meets all requirements". Explore, filtered the same way with the switch on, shows 8.

- **Matches scores only a window of the catalogue.** `getCachedMatchesV10` calls
  `calculateOptimizedMatches` with `pointsMargin: 10`. Tier 1 of `filterWithFallback` keeps programs in
  the student's fields **and** countries **and** within ±10 of their total, in 5-point buckets
  (`filterByPointsRange`, `lib/matching/program-index.ts`), plus any with no minimum. For 36 that is
  minimums of 25 and up, so École polytechnique's two programs at 24 were never scored. The other four
  of the six are at 24 or lower too (Explore's order shows it; their names were not read).
- **Explore applies no window.** `searchExplore` keeps every program whose `programFit` status is "meets".
- **The window is a speed measure, not a product rule.** The spec presents the index as a candidate
  filter ("5000 → ~200 programs", `DOC_2_matching-algo X.md`). The catalogue is 1,676 programs.
- **Nothing else treats a low minimum as a worse fit.** Version X's fit quality would have, but it never
  reached the score (`DOC_2_matching-algo XI.md`): 36 against a minimum of 24, 34 or 36 all score 1.000.
  A low minimum is often the 24 diploma pass mark, not a sign a program is easy to enter.
- **The floor only bites from 35 up.** Under 35 it is below the IB's 24. Above the total the window stays:
  a minimum more than 10 over is a gap either way, and it keeps the list and its cost down.

**What it costs.** Measured 30 October 2026 on the 163 profiles with grades against the 1,676 programs,
with the matcher's rules on grouped counts. The profile with 36 points, 3 fields and 6 countries goes from
40 to 46, exactly the 6 the owner found.

| Programs per student | Today | Without the lower end |
|---|---|---|
| Median | 68 | 74 |
| Average | 121 | 133 (+10%) |
| Largest | 666 | 789 |
| Students whose list changes | | 74 of 163 |

| Service | Change | Limit |
|---|---|---|
| Upstash commands | none | 500,000 a month |
| Upstash bandwidth | about 0.40 to 0.44 MB a Matches load, taking 3.3 KB a result, the high end (the real matcher gave about 2 KB on made-up programs) | 10 GB a month |
| Upstash storage | +10%, for 30 minutes at a time | 250 MB |
| Largest value | about 2.2 to 2.6 MB | 10 MB a request |
| Supabase, Algolia | none | |
| Vercel | about 18 KB more per load uncompressed; matcher time up by under 1 ms on average. Largest response about 1.1 MB | 4.5 MB a response |

33 students were active in the last 30 days. At 20 loads each that is 26 MB more a month, 0.3% of the 10
GB. Match data alone would reach 10 GB at about 23,000 loads a month, against 25,000 today; at 10 loads a
student, about 2,300 active students. Past that, Upstash's pay-as-you-go plan includes 200 GB of
bandwidth. The change can be more than paid back after R.2: dropping the unused labels saves about 470
bytes a result (5.41).

**Steps:**

1. **Words, decided 30 October 2026 (owner, words only; recorded in `REBRANDING_tasks.md` 2.2):** the
   list's last line, "That's every program in your fields and countries near your total.", becomes
   "That's every program in your fields and countries, apart from those far above your total." The
   Explore sentence after it stays. The summary, the group lines and `WIDENED_SUMMARY` stay.
2. **Build.**
   - `filterByPointsRange` keeps every bucket from 0 up to the top of the window, for every tier. The
     tiers at ±20 and ±30 already have almost no floor, so one rule costs the same as limiting it to tier
     1 (measured) and is simpler. Rename nothing else; `pointsMargin` now means how far above the total.
   - Comments: `FilterCriteria.pointsMargin`, the `filterWithFallback` block, `isWidened` in
     `lib/matching/match-list.ts`.
   - The last line's words, in `app/student/matches/MatchesClient.tsx`, moved to a pure helper beside
     `summaryText` in `lib/matching/match-groups.ts` so it can be tested.
3. **Tests (Vitest, next to the code):**
   - `lib/matching/program-index.test.ts`: for 36, minimums 24, 25, 40, 49 and none are kept and 50 is
     not; for 30, 44 is kept and 45 is not; a program under the total outside the student's field or
     country is not. Update `filterCandidates`' existing combined and typical-filter cases: if a reduction
     figure changes, say so in the pull request.
   - `lib/matching/optimized-matcher.test.ts`, a new describe "no lower end (5.40)", with more than 50
     programs: a program 12 under the total in the student's field and country is scored; its score is
     what `calculateMatch` gives alone; a student with 7 near their total and 5 far under stays in tier 1
     where today they fall to tier 2.
   - **The outcome**, in `lib/explore/fit.test.ts`: over one fixture of more than 50 programs (minimums
     from 24 to 45, none, either/or groups, `ownCourse`), for totals 24, 30, 35, 36, 38 and 45, the
     programs Matches gives status `meets` in the student's fields and countries are exactly those
     `programFit` gives `meets` after the same two filters. In a widened case (tier 3), Explore's are a
     subset of Matches'.
   - `lib/matching/match-groups.test.ts`: at the same score, 28 comes before 24 for a total of 36, and
     no minimum comes last; the last line with and without `widened`.
   - `app/api/students/matches/list/route.test.ts`: a program at 24 for a student on 36 reaches the
     response as `meets`; `findUnique` once with today's `select`; `redis.get` once and `redis.set` at
     most once; nothing imported from `lib/algolia`.
   - `lib/matching/worked-examples.test.ts`, new: XI's "Worked examples" table, row by row, through
     `calculateMatch`, with a comment naming the section. A change to the algorithm then has to change
     both, which is what would have caught Version X drifting from the code.
   - The fingerprint: `npx tsx scripts/score-fingerprint.ts` on `main` and on the branch. `grep -v
     '^optimized'` of the two is byte-identical: no score moved. The `optimized` lines differ, and every
     `id:score` pair in the old line is in the new one with the same score.
4. **Docs, in the same pull request:** `DOC_2_matching-algo XI.md`'s "Candidates" and the figures in its
   "Cost", a dated `CHANGELOG.md` entry, and this task moved to group 1. Point the `Based on:` header of
   the live modules (`scorer`, `academic-matcher`, `subject-matcher`, `penalties`, `location-matcher`,
   `field-matcher`, `types`, `program-index`) at XI.

**Today's page.** Matches in today's design shows the first 50 by score, and ties keep catalogue order.
Of the 163 profiles, 90 have more than 50 matches and 47 of those gain programs, so which 50 they see can
change until R.1. Those ties are already arbitrary, so the owner accepted this on 30 October 2026, and
5.40 can merge before release day.

**Must not:** change any score, `pointsMargin`, the tiers or the status; add a database query, Redis
call or Algolia request; put a cap on the results (D4.6: group before any cap); touch `RecommendationsClient`.

**Rollback:** revert the pull request. No data changes. Cached lists expire in 30 minutes, so nothing
needs clearing in either direction.

**Verify:** the tests and the standing verification commands. In the preview, on the owner's account:
"Meets all requirements" counts 8, the same as Explore with the same fields, countries and the switch on,
and the two lists hold the same programs, Cultural Communication and Earth Sciences first. Phone width
too (CDP `setDeviceMetricsOverride`). A week after merging, the Upstash usage tab shows bandwidth in
line with the table.

**Session size:** Small: one build session. Before release day, so the new Matches page and Explore
agree from the start. Independent of other open tasks.

**Done (30 October 2026, #227).**

- **The real account, read-only:** the matcher on this branch against the cached 1,676 programs gives the
  profile with 36 points, 3 fields and 6 countries 46 programs at tier 1 and 8 that meet all requirements.
  They are exactly the 8 `programFit` gives with those fields and countries, Cultural Communication and
  Earth Sciences first, then the six at 24. One Redis read and one small profile query; no write.
- **Fingerprint:** every line but the `optimized` ones is byte-identical. Of the 60 `optimized` lines 18
  differ: 257 programs gained, none lost, no score moved.
- **Tests:** each fails with the lower end put back (11 failures), and the worked example fails when the
  0.80 cap is changed. In `program-index.test.ts` the combined and typical-filter cases go from 19 to 20
  programs, a reduction of 5.26× to 5×, both now pinned; "narrow points" moved to 30, because at 40 both
  windows now hold the whole fixture.
- **One effect the task did not list:** a student who fell from tier 1 to tier 2 for lack of programs near
  their total now stays in tier 1, so they no longer see minimums more than about 10 over it, all gaps.
  That is what the list's new last line says. None of the 60 fingerprint students lost a program this way.
- **The version stays XI**, though "Changing this algorithm" asks for a new minor version when the scored
  programs change: the order above gives XI.1 to 5.43, and XI's header says so.
- **Left:** the owner's look in the preview. Phone width was not checked: the only change on the page is
  the words of a paragraph that wraps. This month's Upstash figures were not given to the session.

---

### 5.41 — Decide what becomes of Version X's scoring

**Outcome:** An owner decision on the parts of Version X that never reached the score, and the code that
follows from it: adopted, or deleted. Today they are built, tested and cached, and change nothing.

**Why (found 30 October 2026, in 5.40):** `calculateMatch` runs Version IX's core. Fit quality, the
selectivity boost, `unified-penalties.ts` and `preference-validator.ts` affect no score, and category and
confidence are attached and read by no screen (`DOC_2_matching-algo XI.md`). No commit ever connected
them. They look like the algorithm to anyone reading the code or Version X, as they did in 5.40's first
version. They also cost: about 470 bytes of every cached result, 23% of one with four requirements, which
more than covers 5.40's +10%. Today's page passes them on to a client that ignores them, so nothing
needs them once R.2 deletes that route.

**The question for the owner:** should a program far under a student's total, or one well above what
they need, ever score lower? Today it never does, and 139 programs tied at 100% for the D4.6 student.
5.43 takes up 5.15's review. **Recommended: delete, and adopt none of it.** The IB minimum is a poor measure
of how hard a program is, so a fit-quality curve would mark down a program for stating the pass mark, and
the order already puts the closest minimum first. Version X's surplus bonus would reward grades that a
program does not ask for.

**Steps:**

1. Research only, with local runs of `calculateMatch` and no database writes: what adopting fit quality
   would do to a few real profiles, against what the order already does with its "closest minimum" key.
2. The owner decides, for each part: adopt it, or delete it.
3. Delete what is rejected, and drop the labels from `enhanceMatchResult`, so `getCachedMatchesV10`
   stores less. With them go `lib/feature-flags/`' V10 flags, `MATCHING_V10_FULL` and the path it
   switches to, which scores every program; `calculateMatches` if nothing else calls it; and the
   commented flags in `.env`. Adopted parts go through the matching tests and the rollback plan
   (`docs/matching/matching-algo-rollback-plan.md`), and take a new version of `DOC_2`.

**Must not:** move a score before step 2, or remove a label while today's route still sends it.

**Verify:** the fingerprint: identical for deletions, every difference explained for adoptions. `npm
test`.

**Session size:** Research small; the change small for deletions, medium for adoptions. After R.2: the last step
in the order at the top of this file. Update XI so that it no longer lists these modules.

---

### 5.42 — Stop precomputing a match list nobody reads — **done**

**Outcome:** Saving a profile no longer runs an Algolia search, a programs read and a Redis write for a
value that is thrown away.

**Why (found 30 October 2026, in 5.40):** `POST /api/students/matches/precompute` runs after each profile
save and coordinator edit, "so /student/matches is always fast". It stores through `getCachedMatches`,
under `matches:…:{count}`, with the count of the Algolia-filtered programs. Matches reads `matchesV10:…`,
and the coordinator pages read `matches:…` under the whole catalogue's count. So the value is read only
for a student with no fields or countries, whose list is not filtered. It has done nothing for Matches
since the V10 key was added.

**Steps:**

1. Confirm with the code at the time that nothing else reads the key, and that `matchesV10:…` is empty
   after a save, so Matches computes on the next load, as it does today.
2. Remove the two `fetch` calls (`app/api/students/profile/route.ts`,
   `app/api/coordinator/students/[id]/route.ts`), the route, and `searchCandidatePrograms` if nothing else
   calls it. Then `INTERNAL_API_KEY`, if nothing else reads it.
3. Update the 7.1 route tests that cover it.

**Must not:** delay a profile change on Matches: `invalidateStudentCache` stays.

**Verify:** `npm test`. In the preview, a saved profile shows on Matches at once. The Algolia usage
script's figure falls by the saves, or stays flat.

**Done (30 October 2026, #228).** Step 1 held: the value was reachable only from the coordinator pages, for a
student with no fields or countries, and they compute the same list on a miss. Step 3 found no test that
covered it, because the calls ran only with `INTERNAL_API_KEY` set; both routes' tests now hold that a save
clears the list and calls no other route. `isAlgoliaAvailable` and the 300-candidate limit went with
`searchCandidatePrograms`. Algolia stood at 3,215 of 10,000 for October, on pace for 3,300, on the day of
the change. The owner removes `INTERNAL_API_KEY` from Vercel and from `.env`.

**Session size:** Small. Independent.

---

### 5.43 — Make the score fair

**Outcome:** A bigger gap never scores higher than a smaller one, an open student's perfect match reads as
perfect, and "Meets all requirements" means something for every program it covers. The first two are
fixes (Part A). The last two are the owner's decisions, and one reverses a decision already made (Part B).

**Why (owner, 30 October 2026):** on making Version XI the master, the owner asked whether it is the right
way to calculate, or should be fairer. Most of it holds. The status decides the groups from the program's
real requirements, and the score only orders a group. That is right, and it protects students from every
problem below on the new Matches page. But the score is still shown ("Why this match") and still orders
today's page and the coordinator pages, and these came out of running the production scorer on pairs that
should differ, with counts from the catalogue.

| # | Finding | Evidence | Kind |
|---|---|---|---|
| 1 | **More points short can score higher.** In `calculateFullRequirementsMatch` the factor is 0.8 for 1 to 3 short, then $1 - d/m$ from 4, which starts above 0.8 | Minimum 40, subjects met: 1 to 3 short 0.88, 4 to 6 short 0.90, 7 short 0.895, 8 short 0.88. A program 5 short shows a higher fit than one 1 short | Bug |
| 2 | **Being open lowers the number.** No fields listed gives F_M 0.5, though no countries gives L_M 1.0 with its weight removed | A perfect match reads 95% with no fields, 93% with no fields or countries, 100% with both listed. The order inside the list does not change | Bug |
| 3 | **"Meets" can mean no bar at all.** A program with no minimum and no subjects scores 1.0 and "meets" for anyone with a Diploma | 301 of 1,676 programs, 280 of them in the US, and 241 of the 286 US programs are at universities admitting under 20%. A student on 24 and on 45 both get 1.00. Another 174 have a minimum of 24, the Diploma itself, and no subjects: Netherlands 45, Italy 29, Czechia 21, Japan 15, Austria 14 and others. In France that 24 is a stand-in ("Where no minimum is published, IB Match shows 24 points"). So up to 475, 28% of the catalogue. Their chip and low place in the order soften it, but they count in the heading | Owner |
| 4 | **Field counts for a third of country.** $w_F=0.1$, $w_L=0.3$ | Wrong field in their country 0.90; right field elsewhere 0.70. Law at home ranks above Medicine abroad for a student who chose Medicine, once a list reaches outside their preferences (29 of 163 today) and on Explore's Best fit | Owner |

**Checked and fine, so no change:** with the critical flag, on 83% of requirement rows (5,397 of 6,474), a
level gap scores below a point gap (SL 7 for HL 6, 0.80, against 1 point short, 0.88), so 5.15's worry
belongs to the unflagged rows; and one missing subject scores 0.40 to 0.45 however many the program lists.
On unflagged rows it runs from 0.40 to 0.69, which is not worth a rule of its own. Being over the minimum
costs nothing, and that stays: the order puts the closest minimum first, and penalising a low minimum
would push down programs like École polytechnique, whose real bar is far above it.

**Part A: the two fixes.** No board: statuses and screens do not change.

1. **Fix 1.** One curve that falls with each point and does not depend on the program's minimum. Starting
   proposal, $\max(0.5,\ 0.85 - 0.03(d-1))$, which gives with subjects met: 1 short 0.90, 2 short 0.892, 3
   short 0.874, 4 short 0.856, 7 short 0.802, 10 short 0.748, 14 short or more 0.70. Check it on a few
   profiles with local runs. Points-only programs tie from 1 to 5 short under their 0.90 ceiling: make
   them follow the same curve.
2. **Fix 2.** No fields listed removes the field's weight, as no countries does (`scorer.ts`), so a perfect
   match reads 100%.
3. **Docs:** in `DOC_2_matching-algo XI.md`, move both out of "Known problems", state the new rules and
   take the version to XI.1. Update `lib/matching/worked-examples.test.ts`' cases to match, a dated
   `CHANGELOG.md` entry, and this step in the order table.
4. **After merging, once:** clear the cached matches, since scores changed. `clearAllMatchCache` from a
   `npx tsx` one-liner; the session gives the owner the command. It costs one recompute per student at
   their next load, and old values expire in 30 minutes anyway, so this only makes it immediate:

   ```bash
   npx tsx -e "require('dotenv').config(); require('./lib/matching/cache').clearAllMatchCache().then(() => { console.log('All matching cache cleared'); process.exit(0) })"
   ```

**Tests for Part A (Vitest, next to the code):**

- `lib/matching/academic-matcher.test.ts`: for minimums 24, 30, 36 and 45, the score falls or stays equal
  at every extra point short, from 1 to 21, and is below the score at 0 short. It fails today at 3 to 4.
- The same for `POINTS_ONLY` and for a program with several requirements.
- `lib/matching/scorer.test.ts`: no fields listed gives 1.000 on a perfect match, alone and with no
  countries; a student with fields keeps today's weights.
- `lib/matching/match-why.test.ts`: the parts of the fit still add up to the score with the new weights.
- Every status is unchanged: `deriveMatchStatus` does not read the score, and the fingerprint's `status`
  fields stay identical.
- The fingerprint's scores move, by design. Each fix is its own commit, and the pull request explains
  every kind of difference.

**Part A done (31 October 2026, #230).** Both fixes as proposed. No status moved and no program joined or
left a list, on the fingerprint and on seven made-up profiles against the real 1,676 programs (one Redis
read, no database, no student's data).

- **Fix 1:** the curve reaches its floor at 13 short, not 14 as the proposal says: 12 short 0.712, 13 short
  0.70. On the real catalogue the highest score at each shortfall, subjects met, now falls in every list.
  For a student like the board's it was 0.88 at 1 short and 0.90 at 4; it is 0.90 and 0.856.
- **Fix 2:** the field reads 1.0 with its weight 0, as the country does, so "Why this match" shows "100% ×
  0%" for it, as it does for a country.
- **Two things the task did not expect.** The order does change a little for an open student: the finding's
  "does not change" holds for the bug, not the fix. Caps and floors keep their values while the sum is
  rescaled, so a pair either side of a cap can swap (14,608 of 1,596,000 fingerprint pairs, each with a cap,
  floor or penalty on one of the pair). And a student with no fields can now score 0, on a program outside
  their countries, short on points and missing every subject, as a student with fields already could on
  one outside them.
- **Left as it is:** a program 2 or more short now often reads "Adds up to 89%. Nothing lowers it." in "Why
  this match", because the sum falls under the 0.90 cap. That sentence is about caps and it already showed
  for programs with subjects, but it reads oddly beside the shortfall. Words on a screen wait for a board,
  so it can join step 8's. It did: see "Decided on the board" below.
- **Left for the owner:** the cache clear, and the look in the preview. No screen changed, so only the
  numbers can differ there.

**Part B: the two decisions.** A change board, then build session 30 in
`REBRANDING_tasks.md`.

**Decided on the board (owner, 31 October 2026), every recommendation.** "D3.1 No IB minimum", canvas row 33,
also https://claude.ai/artifact/AWKhmoBKCVn9EkWePTuy9t, which draws every case below. Steps 5 and 6 are kept as the question; this is the answer.

*Programs with no bar: a group of their own, "No set grades".*

| | Decided |
|---|---|
| Who | Status "meets" today, a minimum of none, 0 or 24, and no course requirements: 475 programs. The 183 at 24 that name subjects stay in Meets. A student under 24 is short of the 174, so they keep today's Within reach or Missing |
| Order | Meets, Within reach, No set grades, Missing, on Matches and inside each tier of Best fit. Open, five cards, then "Show 20 more", like Meets |
| Heading | "No set grades", with "No IB points or subjects beyond the Diploma, so there’s nothing to check your grades against. Getting in can still be hard."; on a phone, "Nothing to check your grades against. Getting in can still be hard." |
| Jump link | "85 with no set grades"; on a phone the row reads "No set grades" with its count |
| Badge | D2.7's `neutral`, already approved: no new colour or icon. On a phone's row, the muted colour |
| Chips | "28 / 24 points" becomes "IB Diploma · 24 points" (`info`); "No named subjects" goes; "No IB minimum · admits 4.6%" and the other notes stay |
| "Why this match" | No fit score and no "How the fit is worked out" on these programs. The points row is `info`, with "24 is the Diploma itself." at 24. The note: "There’s nothing here to check your grades against, so we can’t say how you compare. See how the university decides on its own page."; for a US program, "US universities read the whole application, not a points total, so we can’t say how you compare." |
| Program page | The same note in the panel, with the large neutral badge |
| Explore's switch | Keeps them and splits its count under the total: "128 meet every requirement, 475 have no set grades." With the switch off, one number, as today. Dropped, a student on 28 who filters to the US would see 0 of 280 programs |
| "Include programs with no IB minimum" | Stays as it is: it covers the 307 with no minimum, and it needs no new search field |
| Shortlist | The summary counts them: "1 has no set grades", "2 have no set grades". The compare table's fit row shows the badge |
| How it works | A fourth row in "What each status means", third, with the heading's words |
| Empty state | "Nothing meets the requirements yet" does not show while this group has programs |

The score does not move: it stays underneath, for today's design and the coordinator chart. Only the status does.

*Field against country: field above country, $w_F=0.3$, $w_L=0.1$.*

| | Decided |
|---|---|
| Tiers | `fitTier`: their fields and countries, their fields, their countries, then the rest. `liftingFilters`' scores swap to match |
| Best fit's line | "Your fields and countries come first, then your fields anywhere; in each, the ones you meet, closest to your 36." With the fallback switch's one search, "Your fields and countries come first." The lines for fields alone or countries alone stay |
| How it works | "How we score" reads Academic 60%, Field 30%, Location 10%, in that order |
| "Why this match" | Its rows stay Academic, Country, Field |

*One sentence from Part A.* On a program short of points where nothing caps the score: "Adds up to 89%. The 2
points you’re short are counted in Academic." ("The 1 point you’re short is …"). Everything else keeps
"Nothing lowers it."

**A correction to finding 4, from the real lists on the board.** Matches can't show Law at home above Medicine
abroad. With a field listed the fallback stops at tier 3, "their field, any country": run for all 12 fields at
24, 28, 36 and 45, no list left the student's field, since the smallest field holds 22 programs. For a Medicine
student on 36 in the Netherlands and Germany, the first 104 of 126 rows keep their order under all three weights,
and only 9 to 15 rows in Missing move. So on Matches the decision changes the number in "Why this match". It
counts on Explore's Best fit, where that student reaches Medicine abroad at row 184 today and at row 4 now. The
fallback already put field before country, so the weights now agree with it.

**Worth knowing:** the same student, if they can only study in their countries, now meets other fields there at
row 127, not row 4. "Use my countries" brings them back with one press. The first rows don't change for a student
with many programs in their fields and countries: 123 for the D3.1 student.

5. **The owner decides finding 3 (decided above).** Options: a group of its own, "No IB minimum", beside the three, for
   programs with no minimum and no subjects; or a line under the Meets heading; or leave it. Recommended:
   its own group. "Meets all requirements" stays true for everything in it. It reverses "The status stays
   Meets all requirements" (D2.7 change, D3.1), so it needs the board. Recommended: the 174 at 24 with no
   subjects go with them, since any Diploma meets them, and the group's name fits both. The 183 at 24
   that name subjects stay in Meets: those subjects are a real bar.
6. **The owner decides finding 4 (decided above).** Options: leave it; equal weights, $w_L=w_F=0.2$; or field above
   country, $w_L=0.1$, $w_F=0.3$. Recommended: decide with the real lists under each on the board. It
   changes 5.27's tier order, and Explore's Best fit must stay equal to Matches'.
7. **Build what was decided**, in one pull request with everything that states it:
   - the status or weights in `lib/matching/`, and Explore's switch and tiers (`lib/explore/`), so the two
     pages stay the same;
   - "How it works" in both designs until R.2: its 60%, 30% and 10%, and "What each status means"
     (`app/how-it-works/NewHowItWorks.tsx`, `app/how-it-works/_components/MatchingEngine.tsx`);
   - "Why this match" (`lib/matching/match-why.ts`);
   - any other public page that states them: `git grep` for "60%" and the status names;
   - every screen that shows the status, beyond those: `components/ds/StatusBadge.tsx`'s callers, the
     program page's `FitPanel`, `lib/shortlist/view.ts`, `CompareTable`, `ResultRow`'s phone fit;
   - `04-design-system.md` §9, and `docs/legal-review/claims.md`'s H12. The France guide stays: its 24 is still
     on the card;
   - XI, to XI.2, with the worked examples test; `CHANGELOG.md`; this step in the order table.
   Then clear the cached matches once, as in Part A.

**Tests for Part B:** as the board decides, at least: the group's membership on Matches equals Explore's
switch; Best fit is the same on both; "How it works" states the weights in `lib/matching/types.ts`, read
from one place or checked by a test; a program with no minimum and no subjects lands in its group for a
student on 24 and on 45; Explore's split adds up to its total; a student under 24 keeps today's status at 24;
no fit score reaches the panel for the group; Best fit's tiers follow the weights. The fingerprint's `status` and
score fields move, by design, and the pull request explains every kind of difference.

**Must not:** change a status in Part A; add a read of any service: this is arithmetic; bring in Version
X's fit quality without an owner decision (5.41); let Matches and Explore disagree.

**Verify:** the tests and the standing verification commands. The findings' table re-run shows the new
order. In the preview, "Why this match" on a program 5 short reads lower than on one 1 short.

**Rollback:** revert the pull request and clear the cached matches. No data changes.

**Load (Part B):** none. Matches works the group out from the list it already holds; Explore from the search
records it already fetches for a student with grades, and the count from the same pass. No search field is
added and no sync is needed, so the requests per list stay as they are.

**Session size:** Part A small, after 5.44. Part B a change board, then a small to medium build. Subsumes
the review 5.15 left for later.

---

### 5.44 — Show coordinators the list the student sees — **done**

**Outcome:** A coordinator looking at a student sees the student's own list, in the student's own order.
One path scores lists, and the second, much larger cached value goes.

**Why (found 30 October 2026):** the coordinator pages take an older path, and it differs from Matches:

| | Matches | Coordinator student page and matches route |
|---|---|---|
| Function | `getCachedMatchesV10` | `getCachedMatches` |
| Programs scored | The tiers in XI | All 1,676 |
| Order | Status, then closest minimum | Score alone, so ties fall in catalogue order |
| Shown | Everything | Top 3 on the student page, top 10 on the route |

So with many programs tied at 100%, a coordinator's "top 3" can be programs the student sees far down
their list, or not at all. Each list is also stored whole: 1,676 results at about 1.6 KB is about 2.7 MB in
Upstash, worked out from the size of a result rather than read. `app/coordinator/analytics/page.tsx`
repeats that for up to 50 students, so up to about 135 MB on a cold cache for one page load.

**Read first:** `lib/matching/cache.ts`; `lib/matching/match-list.ts`; `compareBestFit` and `GROUPS` in
`lib/matching/match-groups.ts`; the callers below; `DOC_2_matching-algo XI.md`, "Where each path runs".

**Steps:**

1. Check the callers with grep. On 30 October 2026, after 5.42 the callers of `getCachedMatches` are the
   three below, `app/api/coordinator/analytics/route.ts`, which nothing calls, and `scripts/perf-test.ts`,
   which step 5's deletion breaks; `getCachedMatch` has no caller outside its tests.
2. A pure helper in `lib/matching/match-list.ts`, say `rankedResults(results, programs, total)`: the
   results in the order the student's page shows them, by status as `GROUPS` lists them, then
   `compareBestFit`. Results whose program has gone are left out, as in `matchItems`.
3. Move to `getCachedMatchesV10` and the helper: `app/coordinator/students/[id]/page.tsx` (top 3) and
   `app/api/coordinator/students/[id]/matches/route.ts` (top 10). The response keeps its shape: a V10
   result holds everything a `MatchResult` does.
4. Move `app/coordinator/analytics/page.tsx` to `getCachedMatchesV10`. The chart stays as it is:
   `matches[0].overallScore` is still each student's highest score, and no screen changes, so no board.
5. Delete what is left unused: `app/api/coordinator/analytics/route.ts`, with any case for it in
   `app/api/coordinator/cross-school.test.ts`, `getCachedMatches`,
   `getCachedMatch`, `getBatchCacheKey`, the `match:` and `matches:` scans in `invalidateStudentCache` and
   `clearAllMatchCache`, and `invalidateProgramCache` with its one call in
   `app/api/admin/programs/[id]/route.ts`: it only clears `match:` keys, which nothing writes by then. Old
   `matches:` values expire within 30 minutes.
6. Docs: "Where each path runs" and "Known problems" in XI, a dated `CHANGELOG.md` entry, and this step
   in the order table.

**Tests (Vitest, next to the code):**

- `lib/matching/match-list.test.ts`, `rankedResults`: meets before close before gap; closest minimum first
  inside a status; no minimum last; a result with no program left out; for one fixture, flattening the
  student's groups gives the same ids in the same order.
- `app/api/coordinator/students/[id]/matches/route.test.ts`, new: `redis.set` writes a `matchesV10:` key
  and never `matches:`; a student who has just loaded Matches costs a cache hit, not a second
  calculation; the top 10 come in `rankedResults`' order; no consent, no access and a revoked coordinator
  are refused. Another school's student stays refused in `app/api/coordinator/cross-school.test.ts`.
- `lib/matching/cache.test.ts`: `invalidateStudentCache` scans one pattern; a profile change still clears
  the student's list.
- The fingerprint: `cmp` byte-identical. This moves no score.

**Must not:** change a consent or access check, the shape a coordinator screen reads, or any score; add a
read of any service; add a cap to what Matches shows.

**Load:** lower. About 2.7 MB to 0.4 MB per coordinator list, and up to about 135 MB to 20 MB for one cold
analytics load. A coordinator and student now share one cached list. Each profile save runs one scan
pattern, not three. Check it a week later in the free-tier guard.

**Verify:** the tests and the standing verification commands. In the preview, as a coordinator with one
consenting student: their top 3 are the first three of that student's Matches. `/coordinator/analytics`
shows the same chart. Saving the student's profile shows on both at once.

**Rollback:** revert the pull request. No data changes.

**Session size:** Small. After 5.42, and independent of the rebranding: the coordinator portal keeps its
design.

**Done (30 October 2026, #229):** as the steps say, with no score moved: the fingerprint is byte-identical.

**Beyond the steps:**

| What | Why |
|---|---|
| A student without subjects gets no list from a coordinator page (`hasSubjects`) | They have none on Matches. It would have been a list only the coordinator sees, stored in Upstash. Analytics already skipped them. The empty states say why, and the shape does not change |
| `getCacheStats` deleted too | Nothing called it, and it counted only the two removed kinds of key |
| `totalMatches` counts `rankedResults`, so the coordinator's "Found N" leaves out a program that has gone | As the student's count does |
| `app/coordinator/students/[id]/page.test.tsx`, new | The page swallows a matching error and shows no matches, so a route test alone would not show its top 3 arrive |
| `docs/UX/coordinator-dashboard-component-guide.md` loses the analytics route | The route is gone |

**Worth knowing:**

- **The order is the new design's.** Until release, a student on today's design sees their list by score, so
  compare a coordinator's top 3 with Matches in the new design (the preview switch). `sortMatches` is the
  student's default, "Best fit"; a student who picks another sort sees their own choice.
- **Analytics is the same chart on a narrower set.** It takes each student's highest score from their own
  list, not from all 1,676 programs, so a student's bar falls only where their best score was outside that
  list. Not measured: it would have meant reading every profile in production.
- **The coordinator response carries four more fields per match** (`category`, `categoryInfo`, `confidence`,
  `fitQuality`), about 470 bytes each and at most ten matches, which no screen reads. 5.41 removes them.

---

### 5.45 — Correct what the public pages say about matching — **done**

**Outcome:** How it works and the FAQ say only what the matcher does.

**Why (found 30 October 2026, checking the public pages against Version XI):**

| Where | Today | Problem | Recommended |
|---|---|---|---|
| How it works, both designs (`NewHowItWorks.tsx`, `_components/MatchingEngine.tsx`) | "Every program gets a fit score from 0 to 100%" ("a compatibility score" in today's) | Only the programs on a student's list are scored | "Every match gets a fit score from 0 to 100%" |
| How it works, both designs (`NewHowItWorks.tsx`, `_components/HowItWorksHero.tsx`) | "Fast, accurate matching" | The Terms disclaim accurate scores, section 11, and programs' data can be out of date | "Fast matching from published requirements" |
| `app/how-it-works/page.tsx`, the structured data's `articleBody` | Three factors named IB Points Compatibility, Subject Match and Preference Alignment | Not the three on the page | Academic match, Location match and Field match, as the page has them |
| `app/faqs/page.tsx`, "Can coordinators at my school see my information?" | "can view your academic profile" | Coordinators also see matches and saved programs, as the consent box, Settings and the Privacy Policy say | "can view your academic profile, matches and saved programs" |

**Steps:**

1. The owner approves the words in the pull request: words only, as for 5.38. Record it on D4.14 in
   `REBRANDING_tasks.md`.
2. Change each in both designs where it appears.
3. Add a row for each to `docs/legal-review/claims.md`, and a line to `lawyer-brief.md`'s question 11 if
   the lawyer has not answered yet.
4. Bump `/how-it-works` in `lib/page-dates.ts`. Leave `/faqs` to #127, which sets it on release day. #127
   changes three other FAQ answers, so the two do not meet.

**Tests:** `app/public-claims.test.tsx`: "Every program gets" and "accurate matching" are refused.
`app/public-seo-claims.test.tsx`: the structured data names the page's three factors. The FAQ answer names
matches and saved programs.

**Must not:** change a score, a weight or any page's layout; touch the 23 guides.

**Verify:** the tests and the standing verification commands. Both designs of How it works read the new
words. The pages stay static.

**Load:** none. Words on prebuilt pages.

**Session size:** Tiny. After 5.43 Part A.

**Done (31 October 2026, #231).** The four changes, in the words recommended above, with one exception: today's
design keeps its own term, "Every match gets a compatibility score", under its heading of the same name. H14–H16 and
M7 in `claims.md`, a line in `lawyer-brief.md`'s question 11, and D4.14's record. `/how-it-works` is dated 31 October
2026; `/faqs` stays for #127.

**Verified:** the standing commands, 2,958 tests, and `/how-it-works` still prebuilt. The seven new assertions fail on
the old words.

**Beyond the steps:** `MatchingEngine` joins the list in `app/public-claims.test.tsx`; it was not in it, so today's
wording would not have been held.

**Worth knowing:**

- **The FAQ states the widest case.** A coordinator on a free school sees saved programs but no matches, so "can view
  your academic profile, matches and saved programs" says more than that coordinator sees, and never less. The
  consent box says the same, and the sentence is what a student needs to know before linking.
- **The structured data states no weights,** so step 9 need not change it if the weights move.
- **The longer tick wraps.** In the new design from 768px up, "Your data is never sold" moves to a second row, as the
  ticks' list allows. In today's design, from 640px to just under 768px, each tick takes two lines. Measured at 390, 640,
  768, 1024 and 1440px in both designs: no sideways scroll, and both read the new words.
- **`/faqs` reads the list in the code.** The live page showed the old answer on 31 October 2026, so no FAQ document
  is published over it. If one is published before release, make the change there too.

---

### 5.46 — Clear the cached list before a save answers

**Outcome:** Once a save has answered, Matches cannot read the list from before it.

**Why (found 30 October 2026, in 5.42):** three routes start `invalidateStudentCache` and answer without
waiting for it: `app/api/students/profile/route.ts`, `app/api/students/profile/preferences/route.ts` and
`app/api/coordinator/students/[id]/route.ts`. Vercel can freeze a function once it has answered, so the clear
may stall until something wakes it, and the student's next load can read the old list for up to 30 minutes.
Even when it runs, a page that opens straight after the save races it. The two account-deletion routes
already use `after()`. This comes from reading the code: nobody has seen it happen, and no log was checked.

**Steps:**

1. In a preview, change a grade and open Matches at once, several times, to see whether it happens.
2. `await invalidateStudentCache(...)` in the three routes. It catches its own errors, so a Redis outage
   cannot fail a save. `after()` is not enough here: it runs after the answer, so the race stays.

**Must not:** add a read of any service: the same commands run, only earlier.

**Verify:** `npm test`, with a route test per route that holds the answer back until the clear finishes.
A save takes a few tens of milliseconds longer: one scan and one delete after 5.44.

**Session size:** Small. Independent. After 5.44, whose `invalidateStudentCache` runs one scan, not three.

---

## Phase 6 — Dependency majors

One major per session. Sequential — do not batch them, because when something breaks
you want to know which upgrade did it.

### 6.1 — Prisma 6 → 7 — **done**

**Outcome:** `npm audit` reports **0 high** — all 4 advisories closed — Prisma is on
7.10.0, and the `package.json` seed block has moved to `prisma.config.ts`.

Two *moderate* advisories were published while this session was in flight and are still
open. Neither comes from Prisma: `qs` arrives through `stripe@20` and closes with task
6.2, and `@humanfs/node` through eslint, which belongs in the 6.4 patch batch. They were
left alone rather than folded in here, so a regression stays attributable.

**What the plan got wrong.** Three things, all worth knowing before the next upgrade:

1. **The upgrade alone does not close the advisories — it adds one.** `@prisma/config@7.10.0`
   still pins the vulnerable `deepmerge-ts@7.1.5`, and the Prisma 7 CLI bundles a
   vulnerable `mysql2` that Prisma 6 did not. Prisma 7 on its own takes the count from
   4 high to 5. What actually reaches 0 is the upgrade **plus** an `overrides` block:

   ```json
   "overrides": {
     "deepmerge-ts": "^8.0.2",
     "brace-expansion@1": "^1.1.18",
     "mysql2": "^3.22.0"
   }
   ```

   The upgrade is still required: `effect@<3.20.0`, reachable only through
   `@prisma/config`, cannot be fixed on Prisma 6. Neither half is sufficient alone.

   Note the `brace-expansion@1` key. An unscoped `brace-expansion` override forces
   every copy in the tree to 1.x, and this tree also carries 2.x and 5.x. Scope it.

2. **`npm install prisma@latest` installs a release candidate.** The `latest` dist-tag
   currently points at `8.0.0-rc`; stable v7 sits under `prev`. Pin the version.

3. **The upgrade is much larger than "swap the seed block".** Prisma 7 removed the Rust
   query engine, so a driver adapter (`@prisma/adapter-pg`) is mandatory —
   `new PrismaClient()` throws without one. That is a runtime failure, not a type error,
   so `tsc` stays green while every script is broken. All 41 construction sites had to
   move to a shared client.

**The TLS trap.** node-postgres reads `sslmode=require` as "encrypt **and** verify the
chain"; Prisma 6's engine read it as "encrypt, don't verify". Supabase's pooler presents
a chain Node does not trust, so after the upgrade every query failed with
`self-signed certificate in certificate chain` — including `npm run build`, which
prerenders `app/ib-university-requirements`. `lib/prisma-adapter.ts` rewrites the value
to `no-verify`, which is exactly the posture Prisma 6 already had. Doing it in code
rather than in `.env` means the Vercel variables did not have to change in lockstep.

**Follow-up worth doing:** verify the chain properly (`verify-full` plus Supabase's CA
certificate). That is a change to the trust model, so it was deliberately kept out of a
major-version upgrade rather than folded into it.

**Connection pool.** A driver adapter inherits node-postgres's pool defaults, where
`max` is 10 — double the Prisma 6 default it replaces (`num_cpus * 2 + 1`). On the free
tier with pgbouncer already pooling server-side, `lib/prisma.ts` sets `max: 5`
explicitly rather than silently doubling connections per instance.

**What changed:** `prisma.config.ts` (new), `lib/prisma-adapter.ts` (new),
`lib/prisma-standalone.ts` (new), `lib/prisma.ts`, `prisma/schema.prisma` (the
datasource no longer carries `url`/`directUrl` — Prisma 7 rejects them), `package.json`,
and 40 scripts repointed off `new PrismaClient()`.

**Verified:** 0 high advisories · `migrate status` up to date · type-check, lint,
prettier and build all clean · 20/20 matching tests · the 5 migrations rebuild a fresh
database with `migrate diff` reporting no difference · both Prisma extensions confirmed
firing at runtime under the new query pipeline, against a throwaway local database.

**Still to check by hand:** edit a program in the admin UI and confirm it syncs to
Algolia and invalidates the programs cache. The reference-data extension was proven to
fire; the program-level Algolia path needs a real edit, which means a production write.
In production the reference-data sync did not finish: a field rename on 25 September 2026
never reached Algolia (`CONTENT_tasks.md` 1.3), so run this check and expect the same.

**Note:** the generator is still the deprecated `prisma-client-js`, which keeps
generating into `node_modules` so all 60 `@prisma/client` import sites are unchanged.
Moving to the `prisma-client` generator means a required `output` path and rewriting
every one of those imports. It is a mechanical but wide change and deserves its own
session — see 6.6.

---

### 6.6 — Move to the `prisma-client` generator — **done**

**Outcome:** the schema uses `provider = "prisma-client"` with an explicit `output`, and
no code imports from `@prisma/client`.

**Why:** `prisma-client-js` is deprecated and Prisma has said it will be removed. It
also generates into `node_modules`, which is the thing Prisma 7 moved away from.

**When:** any time, alone, and not in the week of release day. Checked 26 October 2026: 58 files import
`@prisma/client`, and rebranding R.2 deletes only 2 of them (`components/email/legacy/ticket-created.tsx` and
`ticket-resolved.tsx`), so it does not need to wait for cleanup.

**Size:** 58 files, mechanical. Check the generated directory is gitignored (`/app/generated/prisma` already
is), and watch for the known `.prisma/client/default` resolution issue on Next 16 + Turbopack. Three
`'use client'` components in `components/admin/legal-content/` import enums: they take them from the
generated enums file, not the client, or server code reaches the browser bundle.

**Done 26 October 2026.** `prisma/schema.prisma` uses `provider = "prisma-client"` with
`output = "../app/generated/prisma"`, which `.gitignore` already listed; `postinstall` still runs
`prisma generate`, so a fresh install, CI and Vercel write it before anything else runs. ESLint and Prettier
ignore it. 59 files changed import: those that need only enums take them from
`@/app/generated/prisma/enums` (the three legal-content client components, the emails, the seed scripts,
`types/next-auth.d.ts`); those that need `PrismaClient` or the `Prisma` namespace from
`@/app/generated/prisma/client`. No code imports `@prisma/client`; the package stays as a dependency because
the generated client loads its runtime from `@prisma/client/runtime/client`.

One cast: `@auth/prisma-adapter` 2.11.3 (the latest) types its argument as `@prisma/client`'s
`PrismaClient`, which is no longer generated, so `lib/auth/config.ts` casts the client to the adapter's
parameter type. The adapter only calls the model delegates and reads `error.code`, so nothing changes at
runtime.

The generated client sets `__dirname` from `import.meta.url`; `tsx` runs it in the scripts' CommonJS
mode without trouble.

**Verified:** `rm -rf node_modules app/generated && npm ci` generated the client with no
`node_modules/.prisma`; type-check, lint, `prettier --check`, both test suites (2212 Vitest, 20/20
matching) and `npm run build`, whose prerender of `app/ib-university-requirements` read production through
the new client. No browser chunk holds the Prisma runtime, only the enum values. `next dev` (Turbopack)
served `/`, `/api/auth/session` and `/admin/legal-content` with no resolution error. The extended client from
`@/lib/prisma`, against an unreachable database, threw the generated
`Prisma.PrismaClientKnownRequestError`.

---

### 6.7 — npm 12: find out what it changes here, and decide whether to move — **done**

**Outcome:** A short written answer with a recommendation, approved by the owner: whether to move to
npm 12, when, and on which machines. Local, CI and Vercel run the npm version that answer chooses, and
installs are proved to work on it.

Added 26 October 2026 (owner), after `npm install` printed "New major version of npm available!
11.0.0 -> 12.2.1": "Need to investigate what's the impact, if we should upgrade or not."

**Why:** npm 12 (July 2026) is a security release that changes what an install does. Read the npm/cli
v12.0.0 release notes and the GitHub changelog before trusting any of this; the summaries
online disagree on details:

- **Dependencies' install scripts no longer run** unless the project allows them, in a new
  `allowScripts` field managed with `npm install-scripts approve` and `npm install-scripts deny`
  (`approve-scripts` and `deny-scripts` are their old names, kept as aliases).
- **Dependencies from remote URLs and Git are refused** unless allowed (`--allow-remote`,
  `--allow-git`).
- `npm-shrinkwrap.json` is gone, and `npm view --json` changes shape.

**What it would touch here** (read 26 October 2026):

- **Five dependencies have install scripts** (`package-lock.json`, `hasInstallScript`): `prisma` and
  `@prisma/engines` (production), `esbuild` (twice; one copy is under `react-email`), `unrs-resolver`
  and `fsevents` (macOS only, optional). On npm 12, each has to be approved or shown not to need its
  script. Prisma's is the one that matters: the build needs the engine and the generated client.
- **The project's own scripts:** `postinstall` runs `prisma generate` and `prepare` runs `husky`.
  Check that npm 12 still runs a project's own scripts; the summaries speak only of dependencies'.
- **No Git or URL dependencies** in the lockfile, and no `.npmrc`.
- **The three machines already differ.** Locally, npm 11.0.0 on Node 22.12. In CI,
  `actions/setup-node` with `node-version: 22`, so the npm that ships with Node 22, which is npm 10.
  Vercel's npm comes from its own build image: read it from a build log. `package.json` pins only
  `"node": ">=22.0.0"`, with no `packageManager` or `engines.npm`.
- **npm follows Node.** npm 12 is expected to ship with Node 24 and 26 at most, not 22, so CI and
  Vercel move only when the Node version does. Node 22 leaves long-term support in April 2027, so the
  real question may be Node 22 → 24 (which brings npm 11), with npm 12 as a later step.

**Steps:**

1. Read the release notes and record the changes that apply, with the source and date.
2. On a copy of the repo with npm 12, run `npm ci`, then the full verification. Record which install
   scripts were skipped and what broke, then the `allowScripts` list that fixes it. Run nothing that
   writes to the database: the build's prerender only reads.
3. Find Vercel's npm and Node versions from a recent build log, and what each would need to change
   (the project's Node version setting, or `engines`).
4. Recommend one of these, with the reasons:
   - stay on npm 11 locally and change nothing;
   - move local npm only;
   - pin one npm for all three (`packageManager` or `engines.npm`);
   - fold npm into a Node 24 move, written as its own task.

   Bring the local npm up to date within 11 either way, since 11.0.0 is the first release of that
   major.
5. If the owner approves a move: one pull request with nothing else in it (rule 1). It holds
   `allowScripts`, any pin, and the CI change, and a preview deployment proves Vercel installs and builds.

**Must not:** change the Node version in the same pull request as npm; add `allowScripts` entries
for packages that turn out not to need their script; run `npm audit fix --force`.

**Verify:** `npm ci` from a clean `node_modules`, then the usual checks and both test suites, on the
chosen npm; CI green; a Vercel preview built with it.

**Session size:** Small for the investigation (steps 1 to 4). The move, if approved, small.

**Steps 1–4 done 27 October 2026; the owner approved every recommendation the same day**,
`strict-allow-scripts` included. The answer: **do not move to npm 12 now.** Fold npm into a move to Node 24 on all three machines (6.10), then write the `allowScripts`
list on npm 11 (step 5, below), so that npm 12 changes nothing here when a Node release brings it.
The local npm is on 11.21.1, the latest 11, since this session.

**What npm 12 changes here.** Sources: the npm/cli release notes for v12.0.0 (8 July 2026) and for
every release from v12.0.0-pre.0.0 to v12.2.1 (15 October 2026, the latest), read 27 October 2026,
and npm 12.2.1's own `npm help install-scripts` and config docs.

- **It needs Node `^22.22.2 || ^24.15.0 || >=26.0.0`.** The local Node, 22.12.0, is below that, and
  npm 12 warns that it does not support it.
- **Dependencies' install scripts are blocked** unless `allowScripts` in `package.json` covers them.
  The project's own `postinstall` (`prisma generate`) and `prepare` (`husky`) still run. npm 12 prints
  `npm notice run …` before each script, `npx` included, on stderr, so a redirected stdout is unchanged.
- **npm 11 has had the same machinery since 11.16 (27 May 2026), as a warning:** it lists the
  scripts `allowScripts` does not cover and runs them, and it already skips a package denied with
  `false`. Vercel's log prints that list today. `strict-allow-scripts=true` in `.npmrc` makes an
  uncovered script fail the install, on 11 and 12 alike.
- **`allow-git` and `allow-remote` default to `none`.** No effect: the lockfile has no Git or URL
  dependency.
- **Unknown CLI flags and abbreviated flags throw.** Unknown env configs still only warn. Vercel's
  build sets `npm_config_cache_dir`, which npm 11 warns about in every build log; npm 12.2.1, tried
  with the same variable, warns too ("This will error in a future major version of npm"). So Vercel's
  install would not break on 12, but may on 13.
- `npm-shrinkwrap.json`, `npm shrinkwrap`, `npm adduser` and `npm star` are gone, `npm view --json`
  always returns an array, and `npm pkg` no longer forces JSON. Nothing in the repo uses any of them.

**The trial.** A clone in a scratch directory, on Node 24.22.1 and npm 12.2.1, with `.env` copied
in for the build's read-only prerender.

- `npm ci` with no `allowScripts`: exit 0, 902 packages, `prisma generate` and `husky` ran, and six
  packages' scripts were blocked: `@prisma/engines` (postinstall), `prisma` (preinstall), `esbuild`
  0.28.2 and `react-email`'s 0.25.12 (postinstall), `unrs-resolver` (postinstall) and `fsevents`
  (macOS only).
- **Everything passed with all six blocked:** type-check, lint, `prettier --check`, 139 test files
  with 2662 tests, `npm run build` (125 pages), `tsx`, and both copies of esbuild transforming
  TypeScript.
- **Why none needs its script.** `@prisma/engines` downloads the schema engine, which the Prisma CLI
  also fetches by itself when it is missing: with the binary deleted, `prisma migrate diff
  --from-empty` downloaded it again and printed the SQL, so CI's `prisma migrate deploy` is safe.
  `prisma`'s preinstall only checks the Node version. esbuild's `install.js` checks the platform
  binary, which arrives as the optional dependency `@esbuild/<platform>`. `unrs-resolver`'s
  `napi-postinstall … check` downloads the native binding only when its optional dependency is
  missing, and it is not. `fsevents` ships `fsevents.node` prebuilt and has no `binding.gyp`.
- **So `allowScripts` approves nothing; it holds five denials.** `npm install-scripts deny --all`
  writes four and skips `fsevents`, which needs `npm install-scripts deny fsevents` by name:

  ```json
  "allowScripts": {
    "esbuild": false,
    "prisma": false,
    "unrs-resolver": false,
    "@prisma/engines": false,
    "fsevents": false
  }
  ```

  With it, `npm ci` on npm 12 prints no warning and `npm install-scripts ls` reports "No packages with
  unreviewed install scripts". npm 11.21.1 on Node 22.12 honours it: the five are skipped and the
  project's `postinstall` runs. npm 10.9.9 ignores the field and installs as before. `npm install` on
  npm 12 left `package-lock.json` unchanged.

**The three machines, 27 October 2026:**

| | Node | npm | Read from |
|---|---|---|---|
| Local | 22.12.0 | 11.0.0, now 11.21.1 | `node -v`, `npm -v` |
| CI | 22.23.3 | 10.9.9 | `actions/setup-node` with `node-version: 22`; run 40505549174 |
| Vercel | 24.x | 11, at least 11.19 | The project's Node.js setting is 24.x (`vercel project inspect match`), and `"node": ">=22.0.0"` maps to the latest 24.x. The build log prints no npm version, but its `npm warn install-scripts … not yet covered by allowScripts` wording is 11.19 or later. Vercel's package-manager docs list npm 10 for Node 22 and have no row for Node 24 |

What that shows:

- **Production builds and runs on Node 24; CI tests on Node 22.** Each pull request is checked on a
  different Node and npm from the one that deploys it.
- **The local Node is too old for one dependency.** `eslint-visitor-keys` 5.0.1 asks for
  `^22.13.0`, so every local install prints `EBADENGINE`.
- **`"node": ">=22.0.0"` lets Vercel move production to a new major by itself** when it offers one,
  and every build log warns about it. Node 26 becomes long-term support on 28 October 2026.
- **No Node release ships npm 12.** Node 26.12.1 (21 October 2026) ships npm 11.20.0, Node 24.22.1
  ships 11.19.1, Node 22.23.4 ships 10.9.9. Vercel takes npm from its Node image; any other npm there
  needs Corepack (`ENABLE_EXPERIMENTAL_COREPACK=1` and a `packageManager` field), which Vercel calls
  experimental.

**Why this recommendation, of the four:**

- *Stay on npm 11 and change nothing* leaves the Node 22/24 split in place.
- *Move local npm only* is not possible on the local Node 22.12, and would leave the laptop the only
  machine installing differently from CI and Vercel.
- *Pin one npm for all three* needs experimental Corepack on Vercel, takes CI and Vercel off the npm
  their Node ships, and buys nothing that npm 11 with the list (and, if wanted, `strict-allow-scripts`)
  does not already give.
- *Fold npm into a Node 24 move* puts all three on Node 24 and npm 11.19 or later, the version
  production already runs, with npm 12's machinery in warning mode. Chosen. It is 6.10.

npm 12 then needs no pull request of its own: it arrives with whichever Node release first ships it,
in that Node move, and the list makes it a no-op. Nothing is pinned.

**Also found: 12 advisories on `main`, one critical.** `npm audit` reports 4 moderate, 7 high and
1 critical with npm 11 as well; npm 12 did not cause them. The critical one is `next` 16.3.4: several
advisories, among them unauthenticated remote code execution, fixed after 16.4.0. That is 6.8, first
in the order; the other eleven are 6.9.

**What is left — step 5, approved, after 6.10** (on npm 10, CI would ignore the field and prove
nothing): one pull request with nothing else in it, holding the five denials above and
`strict-allow-scripts=true` in a new `.npmrc`, both approved by the owner on 27 October 2026. On
npm 11 an uncovered script still runs; with strict on, a new dependency's script fails CI before merge,
so it never reaches production unreviewed. Approving one is `npm install-scripts approve <pkg>` in that
dependency's own pull request. **Verify:** `npm ci` from a clean `node_modules` with no
`install-scripts` warning, the usual checks and `npm test`, CI green, and a Vercel preview whose log has
no `install-scripts` warning.

**Step 5 done 27 October 2026.** `package.json` gained `allowScripts` with the five denials, written by
`npm install-scripts deny --all` and `npm install-scripts deny fsevents`. A new `.npmrc` holds
`strict-allow-scripts=true`, with a comment on what to do when it fires. `npm install-scripts ls` reports
"No packages with unreviewed install scripts".

- **The install.** `npm ci` from a clean `node_modules`, on the laptop (Node 22.12, npm 11.21.1) and on
  Node 24.22.1 with npm 11.19.1 (CI's and Vercel's pair): exit 0, no `install-scripts` warning, the
  project's `postinstall` (`prisma generate`) and `prepare` (`husky`) ran, `.husky/_` written. The Prisma
  schema engine was still there, fetched by the CLI, and `prisma migrate diff --from-empty` printed all
  23 tables.
- **The break.** With `esbuild` taken off the list, `npm ci` failed with "--strict-allow-scripts: 2
  package(s) have install scripts not covered by allowScripts", naming both copies. Only `package.json`
  was restored afterwards.
- **One-off `npx` inside the repo.** Strict reaches those too: `npx -y esbuild@0.24.2` failed and
  suggested `--allow-scripts=<pkg>`. `npx -y vercel@latest` and `npx -y shadcn@latest`, the one-offs the
  docs use, have no install script and ran. The `.npmrc` comment says so.

**Verified** on Node 24.22.1: type-check, lint at `--max-warnings 0`, `prettier --check`, 139 test files
and 2662 tests, `tsx`, and `npm run build` (125 pages), whose prerender read production. CI green, and
the Vercel preview built: neither log has an `install-scripts` line any more, where both had listed the
five on every install. Vercel's own `Unknown env config "cache-dir"` warning is unrelated and stays.

---

### 6.8 — Next.js 16.3.4 → 16.4.3: the critical advisories — **done**

**Outcome:** `next` on 16.4.3 (or the latest 16.4 patch), and `npm audit` no longer lists `next`.
`eslint-config-next` stays on 16.3.4: see "Done" below and 6.11.

**Why:** found by 6.7 on 27 October 2026. `next` 16.3.4 is inside the ranges of eleven advisories,
three of them critical remote code execution: in Image Optimization when SVG files are used
(GHSA-2464-fhr4-w9xw), in `use cache` functions returning typed arrays (GHSA-673q-mjm6-r5xr) and in
`next/og` `ImageResponse` (GHSA-vcvr-r3jv-pc5j); also server-side request forgery in Image Optimization
(GHSA-cjq9-62q9-8jv4), denial of service through Server Actions (GHSA-p3m5-59mp-jv5r) and five cache and
disclosure issues. All are fixed by 16.4.1; 16.4.3 is the latest. The site uses Image Optimization
(`images.remotePatterns` in `next.config.ts`) and one Server Actions file; no `use cache` or `next/og`
was found. Which of them reach this site was not assessed; the patch is due either way.

**Steps:** read the 16.4 release notes and `node_modules/next/dist/docs/` for anything that changed;
`npm install next@16.4.3 eslint-config-next@16.4.3`; nothing else in the pull request (rule 1).

**Must not:** fold in 6.9's packages; `npm audit fix --force`.

**Verify:** the usual checks and `npm test`; `npm audit` without `next`; a Vercel preview where `/`,
Explore with university images, sign-in and one coordinator page work.

**Session size:** small. First in the order: it is the one advisory in a production path that is
critical.

**Done 27 October 2026.** `npm install next@16.4.3`, nothing else. The lockfile moved only `next`,
`@next/env`, the eight `@next/swc-*` binaries and `sharp` 0.35.4 → 0.35.5 with its `@img/*` packages, so
`sharp` left 6.9 too. `npm audit`: 12 → 10 (4 moderate, 6 high, no critical).

**`eslint-config-next` stays on 16.3.4.** 16.4.3 brings `eslint-plugin-react-hooks` 7.0.1 → 7.1.1, whose
React Compiler rules find 19 errors in 14 client components that 7.0.1 passed with the same rules on:
14 `set-state-in-effect`, 3 `static-components`, 2 `refs`. Fixing those is UI work and does not belong in
a security patch (rule 2), so that bump is 6.11. `eslint-config-next` 16.3.4 has no peer on `next`, and
lint is clean against 16.4.3. (Installing 16.3.4 back over 16.4.3 kept the plugin on 7.1.1, since 16.3.4's
range allows it; this pull request starts again from `main`'s lockfile.)

**What 16.4 changes here** (16.4.0–16.4.3 release notes and the 16.4 announcement, 6 October 2026, and
`node_modules/next/dist/docs/`):

- 16.4.1 is the security release; 16.4.2 and 16.4.3 are backported fixes. There is no 16.3 patch after
  16.3.8, and three of the advisories cover 16.3.8 too, so 16.4 is the only way out.
- React 19.3 is bundled for the App Router. The `react` and `react-dom` packages stay on 19.2.8.
- Turbopack production builds now use export mangling and shorter CSS Module class names. Measured
  against a 16.3.4 build of the same code: client JavaScript 3.55 MB → 3.47 MB in total, the main
  stylesheet unchanged at 33.4 KB gzipped, and the same 125 pages with the same static and dynamic
  split.
- "Re-enable AVIF" changes nothing: `images.formats` still defaults to `['image/webp']`, and
  `next.config.ts` does not set it.
- `experimental.agentUpgrade` is new and defaults to `'security'`. During `next dev` and `next build`
  it checks for advisories against the installed version and reminds; it upgrades nothing. Left on.
  When a coding agent runs the command, the first reminder stops it once, and a prompt retry continues.
- Cache Components is now recommended for every app and becomes the default in 17. Not adopted here.

**Verified:** type-check, lint at `--max-warnings 0`, `prettier --check`, 139 test files and 2662 tests,
and `npm run build`, whose prerender read production. `next start` served `/`, `/how-it-works`,
`/for-coordinators`, a country guide, `/faqs`, `/contact`, `/ib-university-requirements`, Explore, a
university page and `/auth/signin` with 200, an unknown path with 404, and `/api/auth/session`.
`/student/matches`, `/coordinator/dashboard` and `/admin` redirected signed-out visitors to sign-in.
The optimizer returned a university image from Supabase Storage as WebP, and refused a local SVG with
400. (`/student/matches` redirects to `localhost:3000` locally because of `NEXTAUTH_URL` in `.env`;
16.3.4 does the same.) CI green; the Vercel preview built with Next.js 16.4.3, 125 pages, in 57 s.

**Still to check by hand:** the preview's pages, which sit behind Vercel's deployment protection: `/`,
Explore with university images, sign-in and one coordinator page. `vercel curl` could reach them, but it
may create a protection-bypass secret in the project settings, so it was not used.

---

### 6.9 — The other advisories — **done**

**Outcome:** `npm audit` at 0 again, as 6.4 left it.

**Why:** found by 6.7 on 27 October 2026, with `next` (6.8). 6.8 also closed `sharp` (0.35.5, with
the new `next`); ten remain:

| Package | Severity | Installed | Comes from | Fixed in |
|---|---|---|---|---|
| `zod` | high | 4.5.4 | direct | 4.6.6 |
| `vite` | high | 8.3.0 | direct, dev | 8.3.3 |
| `brace-expansion` | high | 1.1.18, 5.0.9 | several; `overrides` pins `@1` to `^1.1.18` | 1.1.21, 5.0.12 |
| `engine.io` | high | 6.6.9 | `react-email` → `socket.io`, dev | 6.6.10 |
| `fast-uri` | high | 3.1.6 | `ajv` (react-email, prisma) | 3.1.9 |
| `source-map-js` | high | 1.2.1 | `@tailwindcss/node` | 1.2.2 |
| `vitest`, `@vitest/mocker` | moderate | 5.0.0 | direct, dev | 5.0.3 (5.0.5 latest) |
| `postcss-selector-parser` | moderate | 6.0.10 | `@tailwindcss/typography` 0.5.20 | 6.1.5 |
| `@tailwindcss/typography` | moderate | 0.5.20 | direct | npm offers a *downgrade* to 0.5.4; read the advisory first |

**Steps:** `npm audit fix` without `--force`,
then targeted `npm update <pkg>` for transitive pins that already satisfy their range (6.4's
`@humanfs/node` lesson). The `brace-expansion@1` override in `package.json` may need raising. For
`@tailwindcss/typography`, find out whether the latest still pins `postcss-selector-parser` 6.0.x; if
so, an `overrides` entry or a recorded exception, never the downgrade.

**Must not:** `npm audit fix --force`; any major version change.

**Verify:** `npm audit` at 0 or every exception written down; the usual checks and `npm test`, which
is the `zod` and `vitest` check; a Vercel preview.

**Session size:** small.

**Done 27 October 2026.** `npm audit`: 10 → **0**, no exceptions.

- **`npm audit fix`** (no `--force`) moved the lockfile only and cleared eight packages: `zod` 4.6.7,
  `vite` 8.3.5, `vitest` and `@vitest/*` 5.0.5, `brace-expansion` 1.1.21 and 5.0.12, `engine.io` 6.6.11,
  `fast-uri` 3.1.9 and `source-map-js` 1.2.2. With them, `rolldown` 1.2.15 (vite's bundler) and a few of
  vitest's own dependencies. `obug` 2 → 3 and `why-is-node-running` 2 → 3 are majors, but transitive:
  vitest 5.0.5's own ranges ask for them.
- **`postcss-selector-parser`, the one npm could not fix.** `@tailwindcss/typography` 0.5.20, the
  latest, pins it to exactly 6.0.10, and npm's only offer was a downgrade to 0.5.4. The advisory
  (GHSA-rj75-hqrm-r3gf) is CPU exhaustion on hostile selectors, and here the parser only ever reads our
  own CSS at build time. A nested override, `"@tailwindcss/typography": { "postcss-selector-parser":
  "^6.1.5" }`, moves it within the same major. `app/globals.css`, compiled through
  `@tailwindcss/postcss` with each version, came out byte-identical (249,413 bytes, the 42 `.prose`
  rules). Remove the override once typography's own dependency reaches 6.1.5.
- **`package.json` floors raised to the verified versions**, as 6.4 did: `zod` `^4.6.7`, `vite`
  `^8.3.5`, `vitest` `^5.0.5`, and the `brace-expansion@1` override `^1.1.21`.
- **zod 4.6 builds errors lazily**, so error maps run on the first read of `result.error`. Nothing here
  sets one (no `z.config()` or locale), and only three files import zod: the two support-ticket routes
  and `lib/env.ts`. The ticket schemas, copied into a script and run on 4.5.4 and 4.6.7 against eight
  payloads (valid, wrong types, too short, too long, missing, `null`, the `RESOLVED` refine), gave
  identical data and issues. `lib/env.ts` runs in every build.

**Verified:** type-check, lint at `--max-warnings 0`, `prettier --check`, 139 test files and 2662 tests
on vitest 5.0.5, and `npm run build` (125 pages), whose prerender read production.

**Not checked:** `engine.io` belongs to react-email's preview server, which does not run here:
`npm run email:dev` asks to install `@react-email/preview-server`, on `main` too. Dev-only either way.

---

### 6.10 — Node 24 on all three machines — **done**

**Outcome:** local, CI and Vercel all build on Node 24 and the npm it ships (11.19 or later), and
`package.json` names Node 24 so Vercel cannot move to a new major by itself.

**Why:** found by 6.7 on 27 October 2026. Vercel builds and runs production on Node 24.x; CI tests on
Node 22.23.3 with npm 10.9.9; the laptop has Node 22.12.0, too old for `eslint-visitor-keys` 5.0.1
(`^22.13.0`). `"node": ">=22.0.0"` lets Vercel pick up Node 26, long-term support from 28 October 2026,
without a pull request. Node 22 leaves support on 30 April 2027. This is 6.7's chosen route to npm 12.

**Steps:**

1. `package.json`: `"engines": { "node": "24.x" }`. Vercel's docs map that to the latest 24.x. Keep
   the project's Node.js setting at 24.x.
2. `.nvmrc`: `24`. CI: `node-version-file: .nvmrc` in all three `actions/setup-node` steps, so CI
   reads the same file the laptop does.
3. Local, the owner: install Node 24 LTS (24.22.1 on 20 October 2026), which brings npm 11.19.1; or
   keep `npm install -g npm@11` current on top.
4. `npm ci` and the full verification on Node 24; CI green; a Vercel preview whose log no longer warns
   about `engines`.

**Must not:** change npm or `allowScripts` in the same pull request (6.7 step 5 follows it); move to
Node 26.

**Verify:** CI's setup-node step prints Node 24 and npm 11; the Vercel preview builds; `npm ci` locally
on Node 24 has no `EBADENGINE`.

**Session size:** small.

**Done 27 October 2026.** `package.json` (and the lockfile's root entry) says `"node": "24.x"`, `.nvmrc`
says `24`, and the three `actions/setup-node` steps read `node-version-file: .nvmrc` in place of
`node-version: 22`. The README says Node 24. Vercel's project setting stays 24.x.

- **Only the lockfile's `engines` line changed.** `npm install --package-lock-only` on npm 11.21.1 also
  wrote six entries bundled inside `@tailwindcss/oxide-wasm32-wasi`, an optional package no machine
  here installs. They are that npm's lockfile format, not Node, so they were left out.
- **`@types/node` stays on `^22`.** Node 22's types are a subset of 24's, so nothing breaks; moving
  them is an upgrade of its own (rule 1), worth doing only when code wants a Node 24 API.
- **The scores do not depend on Node.** `scripts/score-fingerprint.ts` gave the same 72,060 lines
  (sha256 `9ca39e46…`) on Node 22.12 and 24.22.1.

**Verified** on Node 24.22.1 with its npm 11.19.1, the pair CI now gets: `npm ci` from a clean
`node_modules` with no `EBADENGINE` (Node 22.12 printed one for `eslint-visitor-keys`), type-check,
lint at `--max-warnings 0`, `prettier --check`, 139 test files and 2662 tests, and `npm run build`
(125 pages), whose prerender read production. CI green: setup-node printed "Resolved .nvmrc as 24",
then Node 24.21.0 and npm 11.19.0 (the runner's cached 24; it takes a newer one when the image updates).
The Vercel preview built, and its log no longer has the `Detected "engines"` warning, which every
build had printed three times.

**The owner's part:** install Node 24 LTS on the laptop (24.22.1 on 20 October 2026, with npm 11.19.1;
`npm install -g npm@11` raises it to the latest 11). Until then the laptop is on Node 22.12, which still
installs and builds, with the `EBADENGINE` warning and now one for the project's own `engines` too.

---

### 6.11 — `eslint-config-next` 16.4 and the React Compiler lint rules

**Outcome:** `eslint-config-next` matches `next`'s 16.4 line, `eslint-plugin-react-hooks` is on 7.1 or
later, and lint is clean at `--max-warnings 0` with no new `eslint-disable`.

**Why:** found by 6.8 on 27 October 2026. `eslint-config-next` 16.4.3 brings `eslint-plugin-react-hooks`
7.1.1, whose rules (on in 7.0.1 too) now find 19 errors that 7.0.1 did not:

| Rule | Errors | Files |
|---|---|---|
| `set-state-in-effect` | 14 | `StudentMatchesClient`, `ProgramDetailClient`, `ExploreClient`, `SearchClient`, `MatchesClient`, `RecommendationsClient`, `SavedProgramsClient`, `ShortlistClient`, `DocumentEditorClient`, `SearchFilterBar`, `SupportTicketsListClient`, `ProgramCard` |
| `static-components` | 3 | `app/coordinator/students/StudentsClient.tsx` |
| `refs` | 2 | `ExploreClient`, `components/contact/ContactForm.tsx` |

Most are a `useEffect` that copies a prop into state, such as `setSaved(isSaved)` in `ProgramCard`.
These cost an extra render rather than giving a wrong result, so the task can wait.

**When:** after R.2. Cleanup deletes today's design, and with it some of these files: count the errors
again then, and fix only what is left.

**Steps:** `npm install eslint-config-next@<next's version>`; run `npx eslint .`; fix each case the way
React's "You might not need an effect" says (derive during render, a `key` to reset, or an event
handler); never `eslint-disable`.

**Must not:** change a component's behaviour; combine with another upgrade (rule 1).

**Verify:** lint at `--max-warnings 0`, the usual checks and `npm test`; each changed screen in a
Vercel preview: Save on a card, Matches, Explore, the Shortlist, the coordinator's students, the
legal-content editor, support tickets and the contact form.

**Session size:** small to medium, depending on what R.2 leaves.

---

### 6.2 — Stripe 20 → 22 — **done**

**Outcome:** `stripe` is on 22.6.1, the pinned API version moved from
`2025-11-17.clover` to `2026-08-26.dahlia`, and the `qs` advisory is closed. One
moderate advisory remains, `@humanfs/node` via eslint, which belongs to task 6.4.

**The upgrade is two lines.** `package.json` and the `apiVersion` in
`lib/stripe/server.ts`. Nothing else in the repo changed. That is a genuinely
surprising result for two majors across a money path, so it is worth recording *why*
none of the breaking changes reached this code:

- **v22 removed callbacks, per-request API keys, per-request `host`, and mixing
  `params` with `options`.** Every call site here passes a single params object and
  awaits it, which is the one pattern that survived untouched.
- **v22 made `Stripe` a real ES6 class**, so calling it without `new` throws.
  `getStripe()` already used `new Stripe(...)`.
- **v21 changed every `decimal_string` field from `string` to `Stripe.Decimal`.** This
  code reads no decimal fields — the checkout flow passes a `priceId` and never touches
  `unit_amount_decimal`.
- **v21 made the webhook helpers throw when handed the wrong kind of event.**
  `Webhooks.buildEvent` throws only for `object: 'v2.core.event'` thin notifications.
  All four subscribed events are v1 snapshot events, so `constructEvent` stays correct.

**`apiVersion` is a literal type, not a string.** `StripeConfig.apiVersion` is typed
`LatestApiVersion = typeof ApiVersion`, so the SDK accepts exactly one value and
`tsc` catches a stale pin. The current value lives in
`node_modules/stripe/cjs/apiVersion.d.ts` — read it there rather than guessing from the
changelog, because the pin moves in *minor* releases too (22.0 shipped
`2026-03-25.dahlia`; 22.6 is on `2026-08-26.dahlia`).

**The types moved.** v22 replaced the hand-maintained `types/` folder with declarations
emitted next to the implementation, and dropped the top-level ambient `"stripe"` module.
`node_modules/stripe/types/` no longer exists. `import Stripe from 'stripe'` and the
`Stripe.Checkout.Session` namespace types still resolve, so no import changed here, but
anything reaching into `stripe/types/...` by path would break.

**What changed:** `package.json`, `package-lock.json`, `lib/stripe/server.ts`.

**Verified:** type-check, lint, prettier and build all clean · 20/20 matching tests ·
`npm audit` down to 1 moderate from 2. Against **test mode** keys, every function in
`lib/stripe/server.ts` was exercised for real: `prices.list` on the configured product,
`getOrCreateStripeCustomer` (both the create and the short-circuit branch),
`createCheckoutSession`, `createPortalSession`, and `getCustomerSubscriptionStatus`.
The webhook was driven end to end with `stripe listen --forward-to` plus
`stripe trigger checkout.session.completed` against `npm run dev`: signature
verification passed on all six forwarded events, the router reached
`handleCheckoutCompleted`, and a deliberately tampered body was rejected with 400.
`customer.subscription.updated` and `.deleted` were driven with hand-signed payloads.

**Still to check by hand:** the one assertion not covered is a subscription row actually
flipping to `ACTIVE`. Every automated check used identifiers that match no row, because
the local `.env` points at the production database and proving the write would have
meant writing to it. The two routes that wrap these functions
(`create-checkout`, `create-portal`) also need a signed-in coordinator, so they were
verified through their `lib/stripe/server.ts` internals rather than through the HTTP
route. Completing a test-mode checkout as a real coordinator covers both gaps at once.

**Note:** the Stripe CLI reported `A newer version of the Stripe CLI is available`
(v1.50.10). It is a local tool, not a dependency, and was left alone.

---

### 6.3 — lucide-react 0.x → 1.x — **done**

**Outcome:** on `lucide-react` 1.41.0, with **no source file changed**. 171 files import
it and not one of them needed editing.

**Why the blast radius did not materialise.** v1's breaking change is the removal of the
13 brand icons (Github, Facebook, Figma, Slack, Instagram, LinkedIn, Gitlab, Codepen,
Codesandbox, Dribbble, Framer, Chromium, Pocket, RailSymbol). This app uses none of them.
Every v0 name is still exported in v1 as an alias of its canonical name — `AlertCircle` →
`CircleAlert`, `CheckCircle2` → `CircleCheck`, `CheckCircle` → `CircleCheckBig`,
`XCircle` → `CircleX`, and every `*Icon` suffixed form. All 113 icons and the
`LucideIcon` type used here resolve unchanged, so `tsc` had nothing to find.

**What changed:** `package.json`, `package-lock.json`, and a note in
`docs/UX/icons-reference.md`. No icon name changed, so nothing in that doc's mapping
tables needed editing.

**The real risk was glyph redesign, not missing exports.** A type checker cannot see it,
and the roadmap's answer was to walk the app by eye. Instead every icon the app imports
was rendered through `renderToStaticMarkup` under both 0.555.0 and 1.41.0 and the SVG
geometry diffed. **100 of 113 are byte-identical.** The other 13:

| Icon | Change | Where |
|---|---|---|
| `Zap` | **Redrawn.** Different bolt proportions | landing feature grid, how-it-works (3 files) |
| `BookOpen` | **Redrawn.** Squarer spread, spine now `M12 5v16` | 23 files, incl. field-of-study fallback |
| `Bookmark`, `BookmarkX` | **Redrawn.** Rounded notch instead of a sharp `V` | saved programs, program cards (6 files) |
| `Leaf` | **Redrawn.** Rounder leaf, shorter stem | `lib/icons.tsx` (Environment field) |
| `Calendar` | Subtle. Top ticks `2v4`→`2v3`, body `y=4`→`y=3`, divider `10`→`9` | 7 files |
| `CheckCircle2` | Subtle. Tick redrawn `m9 12 2 2 4-4` → `m16 9-5.5 5.5L8 12` | 48 files — the most-used icon here |
| `Landmark`, `School`, `Rocket` | Sub-pixel coordinate rewrites. Not perceptible | 15 files |
| `Clock`, `Compass`, `ThumbsUp` | Path order only, same geometry. All stroke, no fill, so no visual effect | 14 files |

None is a *wrong* glyph — each still depicts what it depicted, which is what the
"no visual regressions" outcome asked for. They are upstream redesigns and they ship
whether or not this app likes them; the only alternative is staying on 0.x. Flagged
rather than fixed.

**Verified:** type-check, `eslint .`, `prettier --check .` and `npm run build` all clean ·
20/20 matching tests · `npm audit` still **0 vulnerabilities** · the 113-icon geometry
diff above · no `lucide-react/dynamic` or other subpath import anywhere, so the dropped
UMD build and the renamed Vue package are both irrelevant here.

**Still to check by hand:** the seven visible redesigns above in the browser, most
usefully `CheckCircle2` (48 files) and `BookOpen` (23). Folded into this session from
6.4: the Radix and Tailwind bumps are also visual, so dialogs, selects and labels deserve
the same glance while the app is open.

**Session size:** Was medium; turned out to be one line of `package.json`.

---

### 6.4 — The minor and patch batch — **done**

**Outcome:** every dependency that is not a deliberate holdout is on its latest version,
and `npm audit` reports **0 vulnerabilities** for the first time.

**What moved** — 26 packages, none across a major boundary:

| | |
|---|---|
| Runtime | `next` 16.3.3→16.3.4, `react`/`react-dom` 19.2.1→19.2.8, `zod` 4.1.13→4.5.4, `algoliasearch` 5.46→5.57, `@supabase/supabase-js` 2.87.1→2.115.0, `resend` 6.24→6.26, `@upstash/redis` 1.35.7→1.38.4, `@upstash/ratelimit` 2.0.7→2.0.8 |
| UI | the four `@radix-ui/*` packages, `tailwindcss` and `@tailwindcss/postcss` 4.1.17→4.3.3, `@tailwindcss/typography` 0.5.19→0.5.20, `tailwind-merge` 3.4→3.6, `country-flag-emoji-polyfill` 0.1.8→0.1.10, `@react-email/components` 1.0.1→1.0.12 |
| Tooling | `eslint` 9.39.1→9.39.5, `eslint-config-next` 16.3.3→16.3.4, `@typescript-eslint/*` 8.48.1→8.69.0, `prettier` 3.7.3→3.9.6, `lint-staged` 16.2.7→16.4.0, `tsx` 4.21→4.23.13, `@types/react` 19.2.7→19.2.18, `@types/react-dom` 19.2.3→19.2.7 |

**Held back deliberately:** `lucide-react` (done in 6.3), `typescript` and `@types/node` (6.5),
`prisma`/`@prisma/client`/`@prisma/adapter-pg` (done in 6.1, already current),
`react-email` (5.0.5; its own task), `stripe` (current after 6.2). `next-auth` shows as
"outdated" only because npm compares the v5 beta against the v4 `latest` tag — ignore it.

**Three things this did not do by plain `npm update`:**

1. **`@humanfs/node` needed its own `npm update @humanfs/node`.** eslint 9.39.5 asks for
   `^0.16.6` and 0.16.8 carries the fix, but the lockfile was pinned at 0.16.7 and
   updating eslint alone did not move a transitive dependency that already satisfied its
   range. That one command is what took audit to zero.
2. **`@typescript-eslint/*` could not be bumped directly** — `npm install
   @typescript-eslint/eslint-plugin@latest` fails with `ERESOLVE`, because
   `eslint-config-next` pulls the `typescript-eslint` meta package, which pins the plugin
   and parser to an exact version. `npm update typescript-eslint` moves all three
   together and dedupes cleanly; the `package.json` ranges then have to be raised by hand
   to match, since the root never depends on the meta package.
3. **`npm update --save` narrows loose ranges.** `"^4"` and `"^19"` became `"^4.3.3"` and
   `"^19.2.18"`. Left as-is — the floor is now the version that was actually verified.

**Prettier 3.9 reformats 5 files.** 3.8 changed how short union types and single-argument
callbacks are printed, so unions that were one-per-line collapse onto one line where they
fit in 100 columns. Formatting only, no behaviour: `route.ts` (legal-document versions),
`PageContainer.tsx`, `page-loader.tsx`, `transformers.ts`, `unified-penalties.ts`. Any
branch open across this upgrade will conflict there.

**What changed:** `package.json`, `package-lock.json`, and those 5 files reformatted.

**Verified:** `npm audit` **0 vulnerabilities** (from 1 moderate) · type-check, lint at
`--max-warnings 0`, `prettier --check` and `npm run build` all clean · 20/20 matching
tests, which is the `zod` and `algoliasearch` check · all 7 `emails/*.tsx` templates
rendered through `render()` from the upgraded `@react-email/components` against the
held-back `react-email` 5.0.5, each producing 5–6 KB of HTML · `npm ls --all` reports no
invalid or unmet non-optional peers.

**Still to check by hand:** the Radix and Tailwind bumps are visual. Nothing in the diff
suggests a rendering change and the build is clean, but dialogs, selects and labels are
worth a glance in the browser — most cheaply folded into session 6, which has to walk the
main surfaces for icons anyway. Session 6 carried this forward rather than closing it:
it replaced its own browser walk with an SVG geometry diff, which says nothing about
Radix or Tailwind. Still open.

---

### 6.5 — TypeScript 5.9 → 7 — **done**

**Outcome:** `tsc` is the native TypeScript 7.0.2 compiler. It found **0 errors**, so no
source file changed. The whole task was packaging.

**TypeScript 7 ships no JavaScript API.** The published package is a launcher for a
platform-native binary — `bin/tsc`, plus `typescript/unstable/*` entry points — with no
`lib/typescript.js`. Everything that consumed the compiler as a library therefore breaks,
and typescript-eslint breaks loudly: it reads `ts.versionMajorMinor` at require time and
throws `typescript-eslint does not support TS 7.0` (see
`node_modules/typescript-eslint/dist/index.js`). Its peer range is `>=4.8.4 <6.1.0`, so a
plain `npm i -D typescript@7` also needs `--legacy-peer-deps`, and then every
`npx eslint .` fails. Support for TS ≥7.1 is tracked in typescript-eslint#10940.

**The fix is the two-package layout Microsoft documents,** in `package.json`:

```json
"@typescript/native": "npm:typescript@^7.0.2",
"typescript": "npm:@typescript/typescript6@^6.0.2"
```

- `@typescript/native` is TypeScript 7 under another name. It owns `node_modules/.bin/tsc`,
  so `npx tsc`, `npm run type-check` and Next's build checker all get 7.0.2.
- `typescript` resolves to the 6.0 JavaScript API (currently 6.0.3), which is what
  typescript-eslint, and anything else that imports the compiler, loads. Its version
  satisfies the `<6.1.0` peer range, so the install needs no `--legacy-peer-deps` and no
  `overrides` entry. That package's own binary is named `tsc6`, so there is no conflict
  over `tsc`.

Both are needed, and the arrangement is fragile in one specific way: `npm install -D
typescript@latest` collapses it and breaks lint. That warning now lives in `AGENTS.md`
and `README.md`.

**`next build` type checks with 7 as well.** Next 16 defaults
`experimental.useTypeScriptCli` to true, which runs the project-local `tsc` binary
instead of loading the compiler API — the docs
(`node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/useTypeScriptCli.md`)
say this exists precisely to enable TypeScript 7. Setting it to `false` under TS 7 makes
the build exit. Nothing was configured; the default is correct here.

**`@types/node` stayed on the 22 line** (22.20.1, the latest 22.x). This task's original
note said 22 → 26, but Node 26 is the current release and this project runs Node 22
everywhere — `.nvmrc`, `engines`, the CI workflow and Vercel. Types a major ahead of the
runtime would let code type check against APIs that do not exist in production. Bump them
together with the runtime, as a separate decision, or not at all.

**It is roughly 7× faster.** A cold `tsc --noEmit` over this project: 10.9s on the
JavaScript compiler, 1.6s native.

**Verified:** `npx tsc --noEmit` 0 errors on 7.0.2 (and, as a cross-check, also 0 on the
6.0 API via `npx tsc6 --noEmit`) · `npx eslint .` clean, which is the real test of the
layout · `prettier --check` clean · `npm run build` exit 0 with all 22 `study-in-*` pages
still prerendered · 20/20 matching tests · `npm audit` still 0 vulnerabilities ·
`npm ci` reinstalls from the lockfile without peer errors · `npm run dev` boots and
serves `/` with 200.

**Not closed by this session:** the Radix and Tailwind visual check carried forward from
6.4. This task changed no runtime output at all, so it was no cheaper to fold in here
than anywhere else.

---

## Phase 7 — Structural

Projects, not maintenance. Each deserves its own planning.

### 7.1 — Test coverage beyond the matching algorithm — **done**

**Outcome:** A real test runner, and coverage of the paths where a regression costs
money or leaks data.

**Why:** The working suite is 20 hand-rolled `.verify.ts` scripts run by
`scripts/run-all-tests.ts`, and it covers `lib/matching` only — the hardest part of the
product, and the right thing to have covered. Everything else has none: 62 API routes,
the RBAC in `lib/auth/access-control.ts`, subscription tier gating, and the Stripe
webhook state machine.

Two Jest test files were deleted in phase 2 because Jest was never installed and they
had never run. **The framework choice is genuinely open** — treat it as a decision to
put to the user, not an assumption.

**Suggested order, highest value first:**
1. `lib/auth/access-control.ts` — pure functions, no I/O, and they decide who sees what
2. The Stripe webhook state machine — money, and hard to test manually
3. Representative API routes — one authenticated, one admin, one unauthenticated
4. Rate limiting — that limits apply and return 429

**Guardrails:** Tests must not hit the production database. Either mock Prisma, or
stand up a local Postgres via `prisma migrate deploy` the way CI does. The CI workflow
already shows the pattern.

**Verify:** the suite runs in CI as a required check, and fails when a deliberately
broken assertion is introduced.

**Session size:** Large. Split across sessions — framework decision first, then one
area per session.

#### Part 1 — framework and access control — **done**

**Outcome:** Vitest 5.0.0 is the test framework, chosen by the owner.
`lib/auth/access-control.test.ts` holds 33 tests, and CI has a new **Tests** job that
runs them and the 20-file matching suite. Until this session CI ran neither suite.

**Why Vitest.** It compiles TypeScript through Vite's own transform and never loads the
compiler API, so the TS 7 / TS 6 two-package layout from 6.5 does not affect it. Parts
2 and 3 need module mocking for Prisma and `auth()`: `vi.mock` does that out of the box,
`node:test` needs an experimental flag on Node 22, and Jest needs a TypeScript transform
plus ESM workarounds for next-auth v5. Next documents it in
`node_modules/next/dist/docs/01-app/02-guides/testing/vitest.md`.

**Where the setup departs from Next's guide:**

- **`vite` must be installed alongside `vitest`.** It is a required, non-optional peer of
  vitest 5, and the guide does not list it.
- **No `vite-tsconfig-paths`.** Vite 8 has `resolve.tsconfigPaths: true` built in, so `@/`
  resolves from `tsconfig.json` with no plugin.
- **No `@vitejs/plugin-react`, jsdom or Testing Library.** Nothing here renders a component
  yet. Add them when a test needs to render one. Async Server Components cannot be
  unit-tested by Vitest at all — use E2E for those.
- **Vitest 5 needs Node `^22.12.0`.** The owner's machine is on exactly 22.12.0; CI's
  `node-version: 22` resolves to the latest 22.x.
- **`include` is `**/*.test.{ts,tsx}` only.** The `.verify.ts` scripts are not Vitest
  files — they run top-level code and exit non-zero on failure. Renaming one to `.test.ts`
  would make Vitest fail it with "no test suite found".

**What the tests pin down:**

- Every tier × status combination and the access level it grants. The expectation table
  is typed `Record<SubscriptionTier, Record<SubscriptionStatus, AccessLevel>>`, so adding
  an enum value fails `tsc` until someone decides what access it grants. The
  `isFeatureLocked` feature list uses the same trick.
- **REGULAR + CANCELLED is freemium.** This is the case where a bug would cost money.
- VIP keeps full access whatever its status, since VIP schools have no Stripe subscription.
- The invite boundary (9 students may invite, 10 may not). Remaining invites never go
  negative for a school that downgraded while over the limit.
- `FREEMIUM_MAX_STUDENTS` is 10. The number is also written out in UI copy —
  `app/coordinator/students/page.tsx` (twice) and `InviteStudentForm.tsx` — so a change to
  the constant alone would make the UI wrong.

**Proved to fail.** Four deliberate breaks, each reverted:

| Break | Result |
|---|---|
| A CANCELLED subscription keeps full access | 2 tests fail |
| `<` becomes `<=` on the invite limit | 1 test fails |
| A wrong expected value in an assertion | 1 test fails; `npm test` exits 1 |
| A status dropped from the expectation table | `tsc` fails with TS2741 |

**Read before Parts 2 and 3: role-based access control has no shared helper.**
`lib/auth/access-control.ts` handles subscription gating only; it knows nothing about
roles. Role checks are written inline: `app/` has 49 `role !== 'PLATFORM_ADMIN'`
comparisons, each after an `auth()` call and a database re-read of the role. The layouts
work the same way — `app/admin/layout.tsx` requires `PLATFORM_ADMIN`,
`app/coordinator/layout.tsx` requires `COORDINATOR`, and `app/student/layout.tsx` requires
only a session. `proxy.ts` enforces nothing beyond "signed in" for `/student/*`. Role
checks can therefore be tested only through the routes, with `@/lib/auth/config` and
`@/lib/prisma` mocked, which is what Part 3 should do. A shared `requireRole` helper
would make that cheaper, but it rewrites dozens of security checks and deserves its own PR.

**Deliberately not tested:** `isFeatureLocked` returns `false` (unlocked) for a feature
name it does not recognise. The union type makes that branch unreachable. A test would
have recorded failing open as intended behaviour, so it is noted here instead.

**Remaining for 7.1:**
- ~~Part 2, the Stripe webhook~~ done 26 October 2026, Part 2 below
- ~~Part 3, API routes and rate limiting~~ done 26 October 2026, Part 3 below
- ~~Part 4, converting the 19 `.verify.ts` scripts to Vitest~~ done 26 October 2026, Part 4 below
- ~~branch protection, so the Tests job actually blocks a merge (owner task 1)~~ done 7 October 2026

**What changed:**
- `package.json` and `package-lock.json`: `vitest`, `vite` and their dependencies, plus
  two transitive bumps — `tinyglobby` 0.2.15→0.2.17 and `@jridgewell/sourcemap-codec`
  1.5.5→1.6.0
- `vitest.config.mts` and `lib/auth/access-control.test.ts`, both new
- `.github/workflows/ci.yml`, `AGENTS.md`, `README.md`, and this file

**Verified:**
- `npm test` passes 33/33 in about 160 ms.
- The matching suite passes 20/20, including with an empty environment, which is what the
  CI job runs with.
- Type-check, `eslint . --max-warnings 0`, `prettier --check .` and `npm run build` are all
  clean.
- `npm audit` still reports 0 vulnerabilities.
- The four deliberate breaks above all fail.

#### Part 2 — the Stripe webhook — **done** (26 October 2026)

**Outcome:** `app/api/webhooks/stripe/route.test.ts` holds 42 tests for
`app/api/webhooks/stripe/route.ts`. The route itself is unchanged.

**How the tests work.** Every request is signed by the Stripe SDK's own
`webhooks.generateTestHeaderString`, so the route's real `constructEvent` checks it; nothing
about verification is mocked. Only `@/lib/prisma`, `@/lib/logger` and `next/headers` are
replaced — the route reads the signature through `headers()`, which needs a request scope.
`NODE_ENV` is stubbed to `production`, so every state-machine test goes through the same gate
a live event does. `STRIPE_SECRET_KEY` is a fake: signing is local, and nothing calls Stripe.

**What the tests pin down:**

- **In production, only an event Stripe signed is acted on.** A body changed after signing, a
  different secret, a signature older than Stripe's five-minute tolerance and a missing header
  are each refused with 400 and write nothing. A missing `STRIPE_WEBHOOK_SECRET` refuses
  everything with 500. Outside production an unsigned event is accepted when no secret is set
  (local testing with the Stripe CLI), but a bad signature is still refused when one is.
- **`checkout.session.completed`** sets the school in the session's metadata to `ACTIVE` with
  its customer and subscription IDs. With no `schoolId` it writes nothing and answers 200, so
  Stripe does not retry an event that can never succeed. Delivered twice, it writes the same.
- **`customer.subscription.created` and `.updated`**: `active` and `trialing` are `ACTIVE`;
  every other Stripe status — `past_due`, `unpaid`, `canceled`, `incomplete`,
  `incomplete_expired`, `paused` — and any status Stripe adds later is `INACTIVE`. Each case
  also checks the access level it grants through `getCoordinatorAccess`.
- **`customer.subscription.deleted`** sets `CANCELLED`, which ends full access.
- **Finding the school**, in both subscription handlers: the subscription's `schoolId`, then the
  stored subscription ID, then the customer ID; with no match, nothing is written and the
  answer is 200.
- **An event the route does not handle** (`invoice.paid`) reads and writes nothing.
- **A failed write answers 500** on all three events, so Stripe delivers the event again.

Part 1's exhaustive-`Record` trick does not work here: `Stripe.Subscription.Status` ends in
`| OtherString`, so the compiler cannot list its members. The status table therefore ends with
an invented status, which pins that an unknown one fails closed.

**Proved to fail.** Four deliberate breaks to the route, each reverted:

| Break | Result |
|---|---|
| The body parsed without `constructEvent` | 4 tests fail: changed body, other secret, stale signature, bad signature outside production |
| `past_due` counted as paid | 2 tests fail |
| A failed write answers 200 | 3 tests fail |
| The customer-ID fallback dropped | 2 tests fail |

**Found, not fixed: filed as 5.34.** The subscription handlers write the status in the event's
snapshot, and do not check that the event's subscription is the school's current one. Stripe
neither orders events nor stops retrying a failed one for three days, so a late event can
re-activate a cancelled school, or cancel a school that is still paying. A test would have
recorded either as intended, so they are written up in 5.34 instead. **No school is exposed
today:** on 26 October 2026 production has one school, VIP and `ACTIVE`, and no school has a
Stripe customer or subscription ID (aggregate counts only).

**What changed:** `app/api/webhooks/stripe/route.test.ts`, new; this file.

**Verified:** `npm test` and the matching suite pass; type-check, `eslint . --max-warnings 0`,
`prettier --check .` and `npm run build` are clean; the four breaks above all fail.

#### Part 3 — API routes and rate limiting — **done** (26 October 2026)

**Outcome:** 462 new tests; no route changed. Before this, 22 of the 69 API routes had tests,
each written for its own task, and none checked the gates across routes.

**`app/api/route-gates.test.ts` — every route, by kind (418 tests).** It loads every
`route.ts` under `app/api` with `import.meta.glob`, so **a route added later is covered without
being listed**. Prisma and Redis are replaced by Proxies that record every call, so a refusal is
checked to come before the work: the route may make its gate's own lookup and nothing else.

- **An anonymous caller gets 401 from every route not in `PUBLIC`**, before any read. `PUBLIC`
  names 10 routes, each with what stands in for a session (an invitation token, the preview
  key, the Stripe signature, or a public page).
- **Every admin route refuses** a student, a coordinator, a university agent and a session whose
  account was deleted, with 403, after the role lookup only. That is 52 handlers × 4 callers.
- **Every coordinator and subscription route refuses a caller with no coordinator profile** —
  a student, or an admin — after the profile lookup only.
- **Every coordinator route refuses a coordinator whose access an admin revoked**, except the 10
  handlers in `REVOCATION_NOT_CHECKED` — a real gap, filed as 5.36.
- **Every handler answers 429 when its limiter says no**, having written nothing, except those in
  `NOT_RATE_LIMITED`: the preview pair and the Stripe webhook by design, and six handlers that
  need a session but have no limiter — filed as 5.35.
- The three lists are checked to name only routes that exist, so they cannot go stale.

**`app/api/coordinator/cross-school.test.ts` (16 tests).** A coordinator of `school-1` asks for a
student or invitation of `school-2` through each of the six handlers that take an ID: 403, with
nothing written, no email sent, no matching run and no data in the answer. The same request for a
record of their own school answers 200, so the refusal is known to come from the school check.
The four list reads (students, analytics, both invitation lists) filter by the coordinator's own
school, whatever the query says. Creating an invitation needs no test of its own: both create
routes take the school only from the coordinator's profile.

**The subscription routes (13 tests).** `create-checkout`: only the coordinator's own school; a
VIP or already-active school, a missing product and a product with no price are each refused
before a Stripe customer is created; a new customer is stored on the school, a stored one is
reused; a cancelled school can subscribe again; Stripe's error message never reaches the
caller. `create-portal`: only the school's own Stripe customer; VIP and a school with no customer
are refused before Stripe.

**`app/api/auth/check-role/route.test.ts` (7 tests).** The coordinator sign-in's pre-check, the
one public route that reads accounts: an unknown address, a coordinator, an agent and an admin
get the same answer, it reads only the role, and it is limited by IP before any read.

**`lib/rate-limit.test.ts` (8 more).** The real `applyRateLimit`: `null` under the limit; over
it, 429 with `Retry-After` rounded up and the `X-RateLimit-*` headers; the log keeps only the
first eight characters of the account ID or address; an Upstash failure lets the request through
(deliberate, so an outage does not take the site down). `getClientIp`'s order of headers.

**Proved to fail.** Six deliberate breaks, each reverted:

| Break | Result |
|---|---|
| The admin check dropped from one admin route | 4 tests fail, one per caller |
| The school check dropped from a coordinator's view of a student's matches | 1 test fails |
| The limiter dropped from saved programs | 2 tests fail |
| A new route added with no sign-in check, and not listed anywhere | 2 tests fail: 401 and 429 |
| Checkout let an already-active school pay again | 1 test fails |
| `check-role` told an unknown address apart from a known one | 2 tests fail |

**Found, not fixed:**

- **5.36 — a coordinator whose access was revoked can still use the API.** The coordinator
  layout refuses them, but 10 handlers never read `isActive`: the student list, a student's
  details and edits, their matches, analytics, both invitation lists, one invitation, and both
  subscription routes — the billing portal can cancel the school's subscription. Sessions are
  30-day JWTs renewed on use, and revoking does not end them. Security, so its own PR, next.
- **5.35 — six handlers with no rate limit.** All need a session. Tiny.
- **Unused redirect overrides.** `create-checkout` takes `successUrl` and `cancelUrl`, and
  `create-portal` takes `returnUrl`, from the request body, and Stripe sends the browser there.
  The client sends neither, and a cross-site POST does not carry the `SameSite=Lax` session
  cookie, so it is not exploitable today. Folded into 5.36, which edits both routes.
- `getCustomerSubscriptionStatus` in `lib/stripe/server.ts` is never called. 5.34 can use it to
  refuse a second checkout while the customer already has a live subscription.

**What changed:** `app/api/route-gates.test.ts`, `app/api/coordinator/cross-school.test.ts`,
`app/api/auth/check-role/route.test.ts`, `app/api/subscriptions/create-checkout/route.test.ts`
and `app/api/subscriptions/create-portal/route.test.ts`, all new; `lib/rate-limit.test.ts`; this
file.

#### Part 4 — the matching scripts to Vitest — **done** (26 October 2026)

**Outcome:** One test suite. The matching algorithm's 20 standalone scripts, and a 21st that nothing
ran (`lib/feature-flags/matching-v10.verify.ts`), are Vitest files next to the code: 19 new
`*.test.ts` files, 13 tests added to the existing `lib/matching/subject-matcher.test.ts`, 329 tests
in all. `scripts/run-all-tests.ts` and CI's "Matching algorithm tests" step are gone; the Tests job
runs `npm test` alone, under the same name, so branch protection is unchanged.

**Why it mattered more than it looked.** 12 of the 20 scripts in CI recorded a failed check, printed
❌ and still exited 0. Only the exit code reached CI, so a regression in categorisation, confidence,
fit quality, selectivity, the penalties, the program index, the optimised matcher or five other
modules left CI green. On 26 October 2026 every check passed, so nothing was hiding; it simply could
not have been seen.

**How the conversion was done.** Each old check is a Vitest `it` (or one row of an `it.each`) with
the same name, or an `expect` inside one that groups a section. Values are computed as the scripts
did, and stateful modules (the metrics store, the global caches) run in the same order. The six
scripts that already had a Jest-style `test`/`expect` kept their bodies unchanged. Differences:

- **`toBeCloseTo` is stricter.** The scripts' own version allowed a difference of up to 10^-p;
  Vitest's allows less than half that. All 14 such checks (academic matcher, penalties, scorer,
  subject matcher) pass under Vitest's.
- **Ranges keep their slack.** Where a script allowed ±0.001 around a range (confidence, unified
  penalties) or `Math.abs(…) < 0.001` (fit quality), the test does the same, not `toBeCloseTo`.
- **Fit quality's six categories are checked for the first time.** The script printed them without
  counting them.
- **The V10 flags start from a clean environment.** Production's `.env` sets `MATCHING_V10_FULL`, so
  the "all disabled by default" checks passed only because `tsx` does not load `.env`. The test now
  clears all 14 flag variables before each case, and passes with the flag set in the shell.
- **Its "consistent hashing" check now hashes.** It passed `forceEnable`, which returns before any
  hashing. It now sets a 50% rollout and checks that each user gets the same answer five times.
- **`cache.verify.ts` is deleted, not converted.** It printed a description of `lib/matching/cache.ts`
  and asserted nothing. That module, the Redis match cache, has no tests: filed as 7.7.
- `lib/feature-flags/matching-v10.test.ts` keeps ESLint's `react-hooks/rules-of-hooks` off, as the
  scripts had it: the flag helpers are named `use…` but are not hooks. The `*.verify.ts` override is
  gone.

**Proved to fail.** Five deliberate breaks, each reverted:

| Break | Result | The old suite |
|---|---|---|
| Tier 1 starts at 41 points, not 40 | 1 test fails | stayed green (the script exited 0) |
| The SAFETY threshold 0.92 → 0.93 | 1 test fails | stayed green |
| A critical subject 1 grade short scores 0.80, not 0.85 | 3 tests fail | failed |
| The tiered fallback never widens past tier 1 | 3 tests fail | stayed green |
| `MATCHING_V10_FULL` no longer overrides the other flags | **nothing fails** | nothing failed: filed as 7.7 |

**Found, not fixed: filed as 7.7.** Beside the two above, the test named "Grade shortfall: minimum
floor of 0.25" never reaches the floor: 3 grades short of a 7 scores 0.45. Lowering either 0.25 floor
in `subject-matcher.ts` fails nothing.

**What changed:** the 21 scripts and `scripts/run-all-tests.ts`, deleted; 19 `*.test.ts` files, new (six of them renamed from their scripts);
`lib/matching/subject-matcher.test.ts`; `.github/workflows/ci.yml`, `vitest.config.mts`,
`eslint.config.mjs`, `eslint/raw-palette.mjs`; `AGENTS.md`, `README.md`,
`docs/admin/maintenance-tools-guide.md`, and this file (the standing context, and the Verify lines of
5.15 and 5.18, which named the old runner). Finished task records that mention the matching suite are
left as written.

**Verified:** `npm test` passes, 131 files and 2,541 tests, also with an empty environment as CI runs
it; type-check, `eslint . --max-warnings 0`, `prettier --check .` and `npm run build` are clean; the
four breaks above that should fail, fail.

---

### 7.2 — Collapse the 23 country landing pages

**Outcome:** One `[country]` route driven by data, instead of 23 near-identical pages.

**Rebranding.** Done as `REBRANDING_tasks.md` 4.2, in the new design, so the guides are migrated once.
The constraints below still apply there.

**Where it stands, 18 October 2026.** Build 15 moved the content: one template
(`components/guide/CountryGuidePage.tsx`) renders each guide from its typed `guide.ts`. Left: the 23
`page.tsx` shells, each still holding its metadata and three or four JSON-LD blocks, and, until
rebranding R.2 deletes them, today's 23 `<Country>Content.tsx`. After R.2, moving the metadata and
JSON-LD into the guide data lets one route render every guide; that is what remains of this task. Each
guide's `Article`, `FAQPage` and speakable blocks must come out identical, as in 4.2. A dynamic segment is
a whole path segment, so `study-in-[country]-with-ib-diploma` is not possible: one route means a
top-level `app/[guide]/page.tsx` with `generateStaticParams` and `dynamicParams = false`, checked first
against every other top-level path it could catch.

**Why:** 4,387 lines across 22 directories. The prose is genuinely country-specific and
belongs in the repo, but the ~200-line page shell around it — metadata, three or four
JSON-LD blocks, the same section scaffold — is copy-pasted every time. Adding a country
means duplicating all of it, and drift is already observable: three pages were missing
their ISR config until phase 3a fixed them.

**Read first:** `node_modules/next/dist/docs/01-app/` on dynamic routes,
`generateStaticParams` and metadata. `docs/countries/COUNTRY-PAGE-BASELINE.md`.

**Constraints that must survive:**
- Each page stays statically rendered with `revalidate = 604800`. Use
  `generateStaticParams`. **Do not let these become dynamic** — they are the public SEO
  surface and dynamic rendering costs both latency and money.
- URLs must not change: `/study-in-<country>-with-ib-diploma`. These are indexed.
- JSON-LD must be preserved per country. Use `serializeJsonLd` from `lib/utils.ts` for
  anything with a database-derived value.

**Verify:**
- `npm run build` shows all 23 routes still `○ (Static)` with a 1-week revalidate
- Every URL returns 200 and its title, meta description and JSON-LD match what the old
  page produced — diff the rendered HTML of two or three before and after
- The sitemap still lists them

**Session size:** Large. Migrate two or three countries first, prove the pattern, then
do the rest.

---

### 7.3 — Refresh the SEO and AI search plan, after the rebranding

**Outcome:** `docs/tasks/seo-ai-seo-implementation-plan.md` is replaced by a short, current, ordered
task list, each task checked against the live site.

**When:** after `REBRANDING_tasks.md` R.1 (release day). The redesign changes the page templates and
headings, so title and content work planned before it would be planned twice. Until then the
redesign only keeps what exists (its Definition of done 12, "SEO parity").

**Why:** the plan was written on 29 January 2026 and still says "Awaiting Review", but parts of it
are live: the `/ib-university-requirements` hub (its Task 4), and program and university structured
data. The file does not say what is left.

**Steps:**

1. **Mark what is done**, from the code, not the plan: each task, with the file that implements it.
2. **Re-check the rest against current guidance**, Google Search Central first. One change since
   many such recommendations were written: in 2023 Google limited FAQ rich results to well-known
   government and health sites, and dropped HowTo rich results. The site's markup (26 pages with
   `FAQPage`, 2 with `HowTo`) still describes the pages, but it will not earn rich results. Don't add
   more for that reason.
3. **AI search: write down the owner's decisions.**
   - **Which AI crawlers may read the site.** `app/robots.ts` allows every crawler today. Search
     crawlers (such as `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`) are what get the site
     cited in AI answers. Training crawlers (such as `GPTBot`, `ClaudeBot`) and the `Google-Extended`
     token are a separate choice.
   - **Whether to add `llms.txt`.** Low priority: no major AI search engine has confirmed using it.
   - **Bing Webmaster Tools** beside Search Console: Bing's index also feeds Microsoft Copilot.
4. **Order by data.** Start from the Search Console baseline the owner takes before release
   (`REBRANDING_tasks.md`, owner decisions) and the queries that bring students today.
5. Write the result as tasks in this file's format (Outcome, Why, Steps, Verify), one per session,
   and mark the old plan superseded.

**Must not:** change titles, URLs, robots rules or structured data. This task only plans; each change
is its own session.

**Session size:** Small. Reading and writing, no code.

---

### 7.4 — Review the legal pages, and every claim the public pages make, and bring them up to date

**Outcome:** The Privacy Policy, Terms of Service and Cookie Policy describe what IB Match does today,
in the new design, with the providers it uses now and their current terms. Each has a version label
that matches its date. Every claim the public pages make about IB Match is true, or goes. The owner
approves the words and publishes them.

**Why:** The Terms and Privacy Policy were last published on 23 February 2026, the Cookie Policy is the
text in code dated 26 December 2025, and the product has changed a great deal since: the redesign
(approved through 19 October 2026), new flows, and changes at the providers. Found on rebranding
"D4.14 Legal pages" and its 4.5 list, 19 October 2026:

- **Version labels.** Both published versions are labelled 2026-03-23 but take effect on 23 February
  2026.
- **Cookie Policy.** It names `next-auth.session-token`, `next-auth.csrf-token` and
  `next-auth.callback-url`, Auth.js v4's names; v5 sets `authjs.session-token`, `authjs.csrf-token` and
  `authjs.callback-url` (with `__Secure-` and `__Host-` prefixes over https). It says the banner's
  Customize lets you "choose which categories to enable": today's banner has switches, but the new
  one's Customize only informs (approved on rebranding D4.1). It leaves out the `cookie-consent` choice
  (a cookie and a `localStorage` entry, kept a year) and `ibm-theme`, the new design's theme, in
  `localStorage`.
- **Privacy Policy, sub-processors.** It lists Vercel, Stripe, Resend, Algolia and Upstash, but not
  Supabase, which holds the database and the images, or Google, which signs students in.
- **Privacy Policy, retention.** It says expired or declined invitation records are deleted after 90
  days. Nothing does that: there is no scheduled job, and `scripts/cleanup-user-invitations.sql` is a
  manual script for one user. Build the deletion, or change the words. (A student's own
  invitations go when their account is deleted: 5.25. This is the 90 days for everyone else's.)
- **Emails.** All seven link to the Terms of Service as "Terms And Conditions". Rebranding 4.7 names the
  link after the page in the new design, from release day.
- **Claims on the public pages** (added by the owner, 19 October 2026). The rebranding keeps today's
  words on its text pages (D4.14), so these reach the new design unchecked:
  - Support us says "We're a non-profit initiative. No salaries, no fancy offices"
    (`HowFundsAreUsed.tsx`), "Non-commercial project" and "100% goes to platform costs"
    (`SupportHero.tsx`), while the Terms (6.2, 6.3) describe paid subscriptions for Regular schools
    through Stripe. Check what IB Match is, legally, and what the money pays for, and say that.
  - Support us marks the $15 tier "Most Popular" (`DonationOptions.tsx`), and gives a split of donations
    (60% infrastructure, 20% search, 15% development, 5% growth): keep only what Ko-fi's figures or the
    accounts support.
  - How it works says "GDPR Compliant", "Your data is encrypted at rest and in transit"
    (`TechStack.tsx`), and "Results in under 50 milliseconds" and "your search results update
    instantly" (`ProgramDatabase.tsx`). Keep a claim only with evidence (the providers' encryption
    pages, Algolia's measured latency, how the index sync works); "GDPR Compliant" is a legal
    conclusion, so the owner decides it.
  - How it works' "Filter system" lists countries, fields and IB points, but Explore now has Length,
    "Only ones I qualify for" and programs with no IB minimum (rebranding 2.3).
  - For schools (`app/for-coordinators/_components/`; found on rebranding D4.17, and the owner approved
    rewording it before release, 19 October 2026). "Coordinator Dashboard" says IB Match is "building"
    its four features, but the portal has most of them today: school analytics, each student's profile
    and matches, and a CSV export, the full analytics and the export on a paid or VIP plan
    (`lib/auth/access-control.ts`). Invitations go one at a time, so "Bulk Management" claims something
    that doesn't exist. A free school links up to 10 students, while the note offers early adopters
    "full access to these features for free". The story says "Built by former IB students… We started
    IB Match", where Home's founder note says "I built IB Match" and Support us "built by an IB
    graduate": say one thing everywhere.

**Steps:**

1. **What the product does now**, from the code: each role's data and where it goes, what the browser
   keeps, what is deleted and when (account deletion runs in one transaction since rebranding 3.3), the
   data export, the emails, and every consent flow (the sign-in line, the invitation's consent with "You
   can unlink at any time in Settings.", the policy update banner).
2. **What the providers ask for now**, from their current terms and data-processing pages, each cited
   with the date read: Vercel, Supabase, Upstash, Algolia, Resend, Stripe and Google. Sub-processor
   names and what they hold, regions, and the transfer mechanism each relies on (Standard Contractual
   Clauses, the EU-US Data Privacy Framework). For Google sign-in, the Google API Services User Data
   Policy and the privacy policy link on the OAuth consent screen. Note any change since February 2026.
3. **Questions for the owner, not fixes:** the age line (13 and older) against GDPR Article 8, whose
   age of digital consent each member state sets between 13 and 16; whether privacy@, legal@ and
   support@ are read; whether a lawyer reviews the drafts.
4. **Draft** each document as a redline against the published version, with a list of what changed and
   why. For the public pages' claims, a table: the claim, where it is, the evidence found, and the
   proposed words (or "remove"). This is not legal advice; the owner decides.
5. **Publish, once approved.** The Terms and Privacy Policy through the admin's legal content
   (`/admin/legal-content`), each labelled with its effective date. A new published version shows "We've
   Updated Our Policies" to every signed-in user (`ReconsentChecker`), so publish after rebranding 4.6
   gives that banner its new design, or on release day, so students see it once and in the new design.
   The Cookie Policy: publish it in the admin, or change the text in code (keeping 5.23's one h1). Words
   that the redesign makes wrong change on release day, not before: today's banner has switches until
   then. The public pages' claims change in code, in both designs: today's components, and the new
   design's text pages once build 16 has made them (For schools once build 21 has).

**Must not:** publish anything the owner hasn't approved, or change a consent flow in code in the same
pull request.

**Session size:** Medium. Research and drafting in one session, then the owner. Before rebranding
release day if possible, so the legal pages ship with correct words.

**Status, 23 October 2026: steps 1 to 4 drafted and the owner's decisions applied; step 5 (publishing) waits on a few
answers, the lawyer and release day.** Everything is in [`docs/legal-review/`](../legal-review/README.md): the
decisions and the action list, the data map, the provider notes (read from the providers' own pages, with the
owner's dashboard screenshots and files), a redline and a pasteable draft for each of the three documents, the
claims table, and a brief for the lawyer. Nothing is published and no code changed.

**Decided by the owner (23 October 2026):** IB Match is a hobby project run by Pavel Yampolsky, an individual in Poland,
with no registered company, no donations so far and paying customers (schools); Tal is the founder and it was built
together; age 16 and older; `support@` is read and `privacy@` and `legal@` forward to it; free "forever" becomes "free
for students; we have no plans to charge them"; the early adopter program is open; the four coordinator quotes are
not real; a lawyer reviews the Privacy Policy and Terms; the University Agent promises, the unkept 90-day
invitation deletion, "GDPR Compliant", "non-profit", "non-commercial" and the donation claims (the whole "where your
support goes" section, since no donations exist) all go; the three documents are published together on release day.

**Still needed before publishing:** the lawyer's review, and one small code change first:
Upstash's rate-limit analytics keep user IDs, and probably IP addresses, with no expiry (the owner's Data Browser shows
a record from 30 August), so they are to be switched off and purged. The owner's dashboards settled every other
check. **Next:** the public pages' wording in code, both designs (done: #157 for the visible words and #158 for titles,
descriptions and structured data, which may merge before release day), the rate-limit change (#156), then publishing
in `/admin/legal-content`.

**Status, 24 October 2026: everything that can be done before the lawyer and release day is done.** #157 and #158 were
cross-checked in the new design (1440px and 390px, light and dark) and four leftover words fixed on #157; both are green
and merge cleanly together. The three drafts were rendered in the new design's legal template: headings are now in
sentence case, and the Cookie Policy's tables are lists so they read on a phone (`docs/legal-review/README.md`, "Checked
in the new design"). 5.28 is done, so no `[OWNER]` note is left in the drafts. **What remains:** the owner merges #157
and #158 and edits the Ko-fi page; the lawyer settles the seven `[LAWYER]` notes; on release day the owner publishes
the three documents in `/admin/legal-content` (README, "How to publish"); then task C, the templates and code fallbacks
updated to the published text. Found on the way and left for later sessions: admin deletion of a
coordinator who has sent invitations is blocked by a foreign key; a student who joins by invitation is shown the
policy-update notice at once; the data export is partial; today's cookie banner has no switches either; and the
coordinator portal says "Upgrade to VIP" for a plan that is a subscription.

**Status, 30 October 2026: the Privacy Policy draft has changed since 24 October 2026.** 5.29 and 5.31 corrected what
it says about deletion and the export, 7.6 Part 0 added the inactive-accounts rule, and 7.8 added "How matching works"
to section 3 with one more `[LAWYER]` note and question 13 in the brief. A copy from before this date is out of date:
the lawyer should read `docs/legal-review/` as it is now.

---

### 7.5 — Returning students and social media: measure where it stands, and plan how to bring students back and reach new ones

**Outcome:** Three things, approved by the owner:

1. **Where it stands:** how many students come back after their first visit, measured from what is
   already stored, and a plain statement of what cannot be known today.
2. **What to count from now on:** one cheap way to see returning students, chosen by the owner.
3. **A plan to bring students back without annoying them:** a short list of options, each with its
   value to the student, its cost, the consent it needs and its size, written as later tasks.
4. **A social media plan:** which platforms, for which audience, posting what, at what effort, and how
   to tell whether it works.

Added 20 October 2026 (owner): "I suspect many of the students use the app as a one-time thing. One
login, check for programs, and that's all. I don't do much for the returning students, don't even
count them." Social media added the same day (owner): "Please also include the planning for social
media, LinkedIn, maybe another media."

**Why:** IB Match is useful more than once in a student's year. Predicted grades change, programs'
requirements are refreshed each cycle (`CONTENT_tasks.md`), shortlists grow, and the final IB results
come in July. A single visit leaves most of that unused. Nothing tells the owner how many students
return:

- Sessions are JWTs that last 30 days (`lib/auth/config.ts`), so the `Session` table stays empty and a
  sign-in leaves no row.
- Auth.js's `events.signIn` runs on every sign-in, but it writes only a new account's consent.
- The `jwt` callback reads the student's role every 5 minutes while they are active, but stores
  nothing.
- There is no analytics. The cookie banner says analytics cookies are "Not used", and the owner put
  analytics out of the redesign's scope (`REBRANDING_tasks.md`, decisions).
- A hint, not a measure: while drawing D2.16, the 17 students who had not accepted the February
  policies had all finished their profiles, and none had changed anything since February.

- **No social presence:** IB Match has no social media account. The Organization JSON-LD in
  `app/layout.tsx` lists none (`sameAs: []`).

**When:** any time; Part A first. Anything Part C proposes that collects data or sends email also
changes the Privacy Policy, so it waits for 7.4.

**Part A — where it stands (research, read-only).**

1. **What a return leaves behind.** From aggregates only (the hard rules on cost):
   - `User.createdAt` against `StudentProfile.updatedAt`;
   - the days of `SavedProgram.createdAt`;
   - support tickets, and invitations accepted after sign-up.

   Count students with any activity on a day other than the one they signed up, by month of sign-up.
   Then count the days from sign-up to the last stored activity. `User.updatedAt` also moves on a
   consent or an admin change, so check what moved it before counting it.
2. **What cannot be seen.** A visit that changes nothing. Check what else exists without new code:
   - Vercel's logs (retention on this plan), and whether Vercel Web Analytics is on;
   - Search Console, which counts searches and clicks, not people;
   - Resend's record of sign-in emails, which counts magic-link sign-ins, including repeat ones.
3. **Write it down:** a small table by month of sign-up, a few plain sentences, and the limit of
   what the data can say.

#### Part A — where it stands — **done** (27 October 2026)

Counted with aggregates only, in a read-only transaction on `DIRECT_URL`; no table was read whole and
no address was printed.

**What counts as a return:** any stored date on a UTC day after the day of sign-up. The dates are:

- `User.emailVerified`, which Auth.js rewrites on **every** magic-link sign-in, not only the first
  (`@auth/core`, `lib/actions/callback/handle-login.js`). So it is the date of the last email sign-in.
  A Google sign-in writes nothing to an existing account;
- `termsAcceptedAt` and `privacyAcceptedAt`, which move when a student accepts a new policy version;
- `StudentProfile.createdAt` and `updatedAt`, a profile made or saved;
- `SavedProgram.createdAt`, `SupportTicket.createdAt`, and `Invitation.acceptedAt` for the student's
  address;
- `User.updatedAt`, only when none of the dates above explains it (within 5 seconds). That leaves a
  name change, and it applies to one student.

Left out: the 20 profiles that 5.8's fix rewrote on 7 October 2026 between 13:08:42 and 13:08:43 UTC,
the only batch write among the dates; and two accounts whose address looks like the owner's or a test
account (both January, both "returned").

**Students by month of sign-up, 27 October 2026** (199 accounts):

| Signed up | Students | With a profile | Returned on a later day | Of those, last trace after: 1–7 days | 8–30 | 31–90 | over 90 |
|---|---|---|---|---|---|---|---|
| January 2026 | 7 | 7 | 3 (43%) | 1 | 1 | 0 | 1 |
| February | 25 | 23 | 5 (20%) | 2 | 1 | 1 | 1 |
| March | 25 | 18 | 3 (12%) | 2 | 0 | 0 | 1 |
| April | 15 | 10 | 0 | 0 | 0 | 0 | 0 |
| May | 19 | 15 | 2 (11%) | 1 | 0 | 0 | 1 |
| June | 17 | 15 | 2 (12%) | 0 | 0 | 2 | 0 |
| July | 9 | 8 | 0 | 0 | 0 | 0 | 0 |
| August | 23 | 22 | 3 (13%) | 1 | 1 | 1 | 0 |
| September | 33 | 20 | 4 (12%) | 2 | 2 | 0 | 0 |
| October (to the 26th) | 26 | 20 | 2 (8%) | 2 | 0 | 0 | 0 |
| **All** | **199** | **158** | **24 (12%)** | **11** | **5** | **4** | **4** |

**In plain words:**

- The owner's suspicion holds. 175 of 199 students left traces on the day they signed up and on no
  other day. 24 (12%) left one on a later day, and only 4 on more than one later day.
- Most of those returns are soon after sign-up: 11 of the 24 last left a trace within a week. Only 4
  students show anything more than 90 days after signing up.
- 41 students (21%) never finished a profile. One of them came back on a later day, and still did not
  finish it.
- What the 24 did on a later day: saved their profile (16), saved a program (11), signed in by email
  link (4), made their profile (4), accepted the new policies (3). In the last 30 days 7 students
  returned; in the last 90 days, 15.
- January's 43% rests on 7 accounts, all made on 30 January, the day the first coordinator account was
  made, so it is probably testing more than students.

**The limit of what the data can say.** These counts are a **floor**, not a measure:

- A visit that changes nothing leaves nothing. 158 of the 201 student accounts sign in with Google,
  which stores nothing on a repeat sign-in, and a session lasts 30 days, so a student who comes back
  on the same device within a month does not sign in at all. A student who reopens Matches and leaves
  is invisible.
- A deleted account takes its history with it (5.25).
- A coordinator's edit also moves `StudentProfile.updatedAt`. Only 6 students are linked to a school,
  and at most one of the 24 returns could be a coordinator's edit.
- Recent months have had less time to return, and with 9 to 33 students a month, one student moves a
  month's figure by 3 to 11 points.

**What else exists, without new code (step 2):**

- **Vercel:** Web Analytics is not collecting: there is no `@vercel/analytics` package and no
  `/_vercel/insights` script. Runtime logs on Pro are kept for **1 day** (30 days only with the paid
  Observability Plus, by Vercel's Runtime Logs page), so there is no history to count from.
- **Search Console** counts Google searches and clicks to the site. It cannot tell a new visitor from
  a returning one, or a student from anyone else. It is the baseline for release day, not a measure of
  returns.
- **Resend** keeps sent-email logs for **30 days** on every plan (its pricing page). The repo's
  `RESEND_API_KEY` is send-only (`GET /emails` answers `restricted_api_key`), so only the owner can look,
  in the dashboard. It would show repeat magic-link sign-ins, but only for the 43 students who use email
  links, only for the last 30 days, and only once their 30-day session has run out. Not worth building
  on.

**For Part B:** nothing stored today sees a Google student who comes back, and that is most students.
A last-active date on the account is the only option that would, and 7.6 Part A builds it. Part B then
only decides what to count from it: returning students per month of sign-up, as in the table above,
from the same starting point.

**Part B — what to count from now on (the owner decides; recommend one).** Options to weigh:

**26 October 2026:** 7.6 builds the first option, a last-active date, for deleting inactive accounts.
If the owner keeps that choice, Part B only decides what to count from it.

**Decided 27 October 2026 (owner): the last-active date.** 7.6 Part A builds it. It is the day a
signed-in student was last seen on any page, because `proxy.ts` checks the session on every page
request and the `jwt` callback's periodic read is where the date is written. It keeps the last day
only, so it says whether and when a student came back, not how often; visitors who are not signed in,
coordinators and admins are not counted. More analytics may be added later as a layer of its own (the
third option, with its policy changes); not now. What to count from the date: returning students per
month of sign-up, as in Part A's table, and 7.6's "Active students, last 30 days". Part C step 6
measures with these.

- **A last-seen date on the account,** written at most once a day per student, for example from the
  `jwt` callback's existing role check. One tiny write per active student per day, no new read, and
  no cookie. Returning students then become a count.
- **A row for each sign-in,** from `events.signIn`. A JWT lasts 30 days, so this misses most visits.
- **A cookieless analytics tool,** such as Vercel Web Analytics. It counts visits, not people, and
  changes the Cookie Policy, the Privacy Policy and the cookie banner's "Not used" line (7.4).

For each option give the cost on the free plans (Supabase writes, analytics event limits) and what
the Privacy Policy would have to say. Never log page views or UI events into Supabase: that kind of
data is what pushed it over the free tier before (the hard rules on cost).

**Part C — bring students back, without being annoying.**

1. **Moments when a return helps the student.** Check the exact dates for the 2027 intake:
   - predicted grades;
   - application deadlines (UCAS, the US early and regular rounds, the other countries' portals);
   - offers;
   - the IB results in July ("Update your grades: your matches may have changed");
   - the yearly requirements refresh.
2. **Reasons that come from the student's own data,** which are rarely annoying:
   - a program on their shortlist changed its requirements;
   - a new program fits their profile in their fields and countries;
   - they are one point or one grade away from a program that is within reach.

   Check what each needs. Deadlines per program are not stored today.
3. **Channels.** For each, its cost and size:
   - **Email** through Resend: check the free plan's limits. New templates follow D4.18.
   - **In the app:** a line on Matches such as "What changed since your last visit", which needs
     Part B's date.
   - **The student's school:** coordinators already invite students, and could prompt them.
   - **Not browser push:** it is intrusive, and iOS needs the site installed first.
4. **Consent and law.**
   - Marketing email needs an opt-in under GDPR and ePrivacy. Many students are under 18, and the
     age a teenager can consent alone differs by EU country (13 to 16).
   - A service email ("your shortlisted program changed") is not marketing, but still needs a way to
     turn it off.
   - Every email gets one-click unsubscribe.
   - The Privacy Policy changes (7.4). Students accept the new version through the policy update
     notice (`REBRANDING_tasks.md` 4.6).
5. **House rules against being annoying.** Propose them for the owner:
   - opt-in only;
   - a monthly cap;
   - only when something about the student's own programs changed, or a dated moment from step 1;
   - one switch in Settings to turn it all off;
   - no streaks, no countdowns, no "we miss you".
6. **How success is measured:** returning students per month of sign-up, from Part B, before and
   after.
7. **Write the options as tasks** in this file's format (Outcome, Why, Steps, Verify), ordered by
   value for effort, each with the consent and policy change it needs.

**Part D — social media: LinkedIn and the platforms students use.**

1. **Audiences, each on its own platforms:**
   - **IB students (16–18)**, who use the matcher. Check where they talk about university choices:
     Instagram, TikTok, YouTube, Reddit (r/IBO), Discord servers for IB students.
   - **IB coordinators and university counsellors**, who invite whole cohorts (For schools, the
     coordinator portal). LinkedIn is the likely place, with IB and counselling groups and events.
   - **Parents**, if the research shows they choose or pay. Facebook groups for international-school
     families are one place to check.
2. **For each platform, find out:**
   - who is there, how they talk, and what their rules say about promotion (Reddit and Discord
     communities often ban self-promotion);
   - the ad rules for under-18s: Meta, TikTok and Google limit targeting ads to teenagers. Organic
     posts only, unless the owner decides otherwise;
   - the effort a one-person team can keep up every week, and what it costs.
3. **What to post, from what IB Match already has.** Avoid claims that need a source the site doesn't
   have.
   - The 23 country guides, one fact at a time ("Ireland converts IB points to CAO points like this").
   - A program's real requirements, as on its page.
   - Moments in the IB year from Part C.
   - For coordinators: what the portal does for a cohort, and short demos.

   Never post a student's data, a screenshot with a student's name, or a testimonial nobody gave.
4. **The account itself:**
   - the handle on each platform;
   - the profile in the new design (the logo is from configuration; Lens was confirmed as the final
     mark on 21 October 2026, and its clearance search is still open);
   - links back with UTM parameters, so the site can tell visits from each platform.
5. **How it is measured:**
   - visits by source, if Part B's choice counts visits;
   - sign-ups by month;
   - coordinator calls booked from LinkedIn;
   - Search Console for branded searches.
6. **What the site would change:**
   - the accounts in `sameAs` (structured data, with 7.3's plan);
   - links in the footer, which changes D2.13, so it needs a change board (`REBRANDING_tasks.md`,
     Step 2);
   - share images for the guides (some pages have none: `REBRANDING_tasks.md` build 4 notes).
7. **Write the plan as tasks:** platforms in order, a monthly rhythm the owner can keep, the first
   month's posts as examples, and what would make the owner stop or switch platform.

**Must not:** send any email, post, create accounts, add tracking, or change code, schema or
settings. Read production with aggregates only, never whole tables. This task researches and plans;
each change is its own session.

**Session size:** Medium. Aggregates and reading, then the owner's decisions on B, C and D. Part D
can be its own session.

---

### 7.6 — Inactive accounts: mark them silent, warn them, then delete them

**Outcome:** The admin sees when each account was last active, which ones are silent, and how many
students are active, on the main dashboard. A student who stays away long enough gets one email
warning that the account will be deleted in a month. If they don't come back in that month, the
account and everything it holds is deleted. All of this runs from one admin page, and then on its own
every day once the owner trusts it. A student who comes back at any point keeps the account, and the
clock starts again.

Added 26 October 2026 (owner): "So any account that didn't make a login during 6 months will be marked
as silent in the admin … a new mail template … saying that there is no activity for 12 last months or
more > we give the user one month > then we delete their data completely … something for the admin to
easily send these emails, could be bulk … the purge of accounts in the admin. Generally I want this
process to be automated as much as we can … IF the account did make a login AFTER we sent a
notification within the month, then it can stay for another 6 months … add the analytics, how many
silent accounts we've got on the main dashboard, or how many active accounts." The same day the owner
corrected the 12 months to 6: "12 months was a mistake."

**Why:** Keeping a student's grades and plans forever, after they have stopped using IB Match, is data
the service no longer needs. The draft Privacy Policy says data is kept "for as long as your account is
active" (`docs/legal-review/privacy-policy.proposed.md`, section 8), and nothing defines or enforces
"active". On 26 October 2026, 73 of the 199 student accounts were created more than six months ago, and
71 have not changed since then (counts only).

**What exists today, and what does not:**

- **No date of last use is stored.** Sessions are JWTs that last 30 days (`lib/auth/config.ts`), so the
  `Session` table is empty (one row in production) and a sign-in leaves no row. `events.signIn` writes
  only a new account's consent. `User.updatedAt` changes only when the user row changes, not when the
  student visits. A student who opens the app every week on a valid token never "signs in". So "login"
  here has to mean **last active**, not last sign-in.
- **The `jwt` callback already re-reads the role** from the database every 5 minutes for an active
  user (`ROLE_REFRESH_MS`). That read can carry the date, and write it at most once a day, which is the
  first option in 7.5 Part B. This task builds it, so 7.5 Part B's choice is made here.
- **Deleting a student is solved:** `deleteStudentAccount` (`lib/account/delete-student.ts`, 5.25)
  deletes everything in one transaction, and 5.24 sends "Account deleted". Deleting a coordinator is
  blocked by a foreign key until 5.29.
- **No scheduled job exists.** There is no `vercel.json` and no cron route. The Vercel plan is Pro
  (`docs/legal-review/providers.md`), so a daily cron is available.
- **Email:** Resend's Free plan, 3,000 emails a month (`providers.md`) and, by Resend's pricing page, 100
  a day. Sign-in links and invitations share that daily allowance, so a first batch of about 70 notices
  has to be spread over several days. Check the limits before building.
- **The admin:** `/admin/dashboard` counts users by role; `/admin/students` lists every student, newest
  first. The admin keeps today's design.

**Decide first (the owner).** All six are decided: the first on 26 October 2026, the rest on
27 October 2026 (owner), each as recommended except the fourth, which starts with the manual half only.

1. **The times. Decided 26 October 2026 (owner): 6 months throughout**.
   After 6 months without activity a student is silent and due the notice. They are deleted 30 days
   after the notice, unless they are active again in that time. Activity after the notice clears it,
   and the clock starts again from that day, so the student is silent and due a notice again 6 months
   later.
2. **Whose accounts. Decided: students only.** Coordinators are tied to a school and its subscription,
   and are deleted on request (5.29). Admins and agents never.
3. **Where the clock starts** for the accounts that exist before the date is stored. **Decided: the
   latest stored change on the account or its profile**, not the day Part A ships. It is older than
   their real last visit for some students, so the email says "no activity on your account since
   <date>", which is true of what is stored, and the one-month warning protects anyone who still cares.
   Take the latest of the dates 7.5 Part A counted from (`emailVerified`, the policy acceptances, the
   profile's dates, saved programs, support tickets, accepted invitations, `User.updatedAt`), and leave
   out the 20 profiles 5.8's fix rewrote on 7 October 2026 at 13:08:42–43 UTC, or they would all look
   active that day.
4. **Manual or automatic. Decided: manual for now.** The admin page's buttons only (Part D). The daily
   job (Part E) is not built until the owner asks for it, after a manual round has gone well.
5. **After the deletion. Decided: no second email.** The student ignored the first, and the address may
   no longer work. So the notice has to be complete on its own: Part C lists what it says.
6. **The dashboard. Decided: both numbers.** "Active students, last 30 days" is the health number;
   "Silent" is the to-do number, linking to the list.

**Part 0 — the Privacy Policy (before the lawyer's review of 7.4). Done 27 October 2026.** Add the rule to section 8 of
`docs/legal-review/privacy-policy.proposed.md` and its redline: inactive for 6 months, a warning email,
then deletion a month later unless the student comes back. One sentence now saves a second
publication. Nothing is sent or deleted until the policy that says so is published (release day).
Done: section 8 has an "Inactive student accounts" line; section 2 names the last-active date Part A stores
(at most once a day, for finding inactive accounts and counting active students); section 3 lists the warning
among the emails. The redline's change list and diff match, and `lawyer-brief.md` question 8 asks whether one
email is enough notice and whether Terms 14 should say it too. If Part A or C changes what is stored or sent,
change these lines with it.

**Part A — the date of last activity.**

1. `lastActiveAt DateTime?` on `User`; an additive migration, applied with `prisma migrate deploy`.
2. Written on sign-in, and in the `jwt` callback's existing periodic read when the stored date is older
   than a day: the read selects the date with the role, so no new read, and at most one write per active
   student per day.
3. The backfill from decision 3 is a production data change: the owner approves it, and a backup comes
   first.

**Done 27 October 2026** (#193, and the backfill).
- Migration `20261027120000_add_user_last_active` adds `lastActiveAt` and `inactivityNoticeSentAt`
  (Part D's column, in the same migration as planned). Applied to production with `prisma migrate
  deploy` the same day, before the code merged, because the `jwt` callback selects the column.
- `lib/auth/last-active.ts`: `readRoleAndMarkActive` is the `jwt` callback's role read, on sign-in and
  every 5 minutes, now selecting the date too. When the date is empty or a day old it writes it and
  clears `inactivityNoticeSentAt`, through a conditional `updateMany`, so two requests reading the same
  old date write once. A failed write is logged and never fails the request. It runs for every role,
  as the Privacy draft says; only students are ever notified or deleted.
- The data export (version 1.2) holds both dates, so the policy's "all your data" stays true.
- `scripts/backfill-last-active.ts`: decision 3 for students with no date, in one raw `UPDATE` (so
  `User.updatedAt` keeps its meaning), skipping any date the `jwt` callback already wrote. It writes the ids it
  fills to `scripts/backups/last-active/` first. Dry run on 27 October 2026: 201 students, none with a
  date; 69 last changed 6 months ago or more (silent), 37 in the last 30 days; oldest 30 January 2026;
  no two students share a second, so no batch write is left in the dates. **Applied the same day with
  the owner's approval:** 201 filled, backup `scripts/backups/last-active/2026-10-27T09-54-25-265Z.json`.
  Checked after: 201 of 201 students have a date, 69 silent, 37 in the last 30 days, no notices, and
  no `User.updatedAt` moved. The coordinator and the admin have no date until they next sign in.

**Part B — the admin and the dashboard.**

1. A "Last active" column on `/admin/students` and on the student's own page, and a "Silent" label;
   a filter for silent students.
2. On `/admin/dashboard`, the two counts from decision 6, each a `count()` with a date condition.

**Done 27 October 2026.**
- `lib/account/inactivity.ts`: silent is 6 calendar months (UTC) since `lastActiveAt` or, with no date,
  since the account was made, so an invitation whose link was never used follows the same rule.
  Students only. `isSilent` for pages, `silentStudentsWhere` and `activeStudentsWhere` for `count()`.
  Part D adds the notice states here. Tested at the edges, across a year, and on the 31st (which
  falls back to the month's last day, as Postgres's `interval '6 months'` does).
- `/admin/students`: a "Last active" column ("Never" with no date), the "Silent" label under it, and a
  "Silent (n)" filter, opened by `?filter=silent`. The page selects instead of including. Dates in UTC.
- The student's page: "Last active" in Account info and the label beside "Profile Complete".
- `/admin/dashboard`: "Active students, last 30 days" and "Silent students, 6 months", the second
  linking to the filtered list. The rule's `count()`s gave 37 and 69 on production, the same as the
  backfill's SQL. Until real visits replace the backfilled dates, "active" means changed something
  in the last 30 days, so it reads low at first.
- Checked on a throwaway local Postgres with an admin and six students at each stage, through
  `next dev`: both counts 2 and 2 as expected, the filter shows 2 of 6, and the admin's own date was
  written by the `jwt` callback (Part A end to end). At 390px the admin already scrolls sideways on
  `main` (438px); not changed here.

**Part C — the notice email (a design gate first).** It is a new email, so it is added as a case on the
"D4.18 Emails" boards and approved before any code (`REBRANDING_tasks.md`, Step 2). It is built in
`emails/` on D4.18's layout, in the new design only, since nothing is sent before release day. It is the
only email the student gets (decision 5), so it must be clear on its own, with every explanation and
link. It says:
- why it was sent: no activity on the account for 6 months;
- the date of the last activity;
- the date of deletion;
- what is deleted (as 5.25 lists it), and that the deletion is final: nothing can be restored;
- that no further email follows;
- one button, to sign in and keep the account, and that signing in once is enough;
- that they can download their data or delete the account now, from Settings, with links;
- a link to the Privacy Policy section that sets the rule, and how to contact support.

It has a plain-text body, as every email does.

**The board, drawn 27 October 2026:** "D4.18 Emails · inactivity notice" (canvas row 30, and a page of its
own, https://claude.ai/artifact/Beec6HeoqVw5tW7aiCFAcD). The email at 600px and 390px, light as sent, in
its own dark colours, inverted partly and fully, with images off, a student linked to a school, the plain
text and the inbox line. Six decisions for the owner, each with a recommendation: the subject and heading
name the date; the button opens the sign-in page, with no token in the email; a linked student sees the
school named in the list; one email for every silent student; the date is the notice plus 30 whole days
in UTC; "Inactive account" above the heading. **Approved 27 October 2026 (owner), every
recommendation.** The board's words are the words to build, subject, preview and plain text included.

**Parts C and D built 27 October 2026.** The email is `emails/inactivity-notice.tsx`, in the board's
words, with the new header whatever `NEW_UI_FOR_EVERYONE` says, since it has no version in today's
design (`designedMessage(…, { newUi: true })`; the seven others still switch on release day, byte for
byte). The page is `/admin/students/inactive`, linked from Students: three counts and lists, the
notified with the deletion date and days left. The rule's states are `inactivityState` in
`lib/account/inactivity.ts`: due a notice, notified, due for deletion from the 30th whole UTC day, and
a date later than the notice counts as coming back even if the notice wasn't cleared.
`lib/account/inactive-accounts.ts` reads the students again for each press, never a list the browser
sent:
- **Send notices:** up to 50 a day (`NOTICES_PER_DAY`, counted from midnight UTC), in one Resend
  batch, which is accepted whole or not at all; `inactivityNoticeSentAt` is set only after, and only
  on students still without one.
- **Delete due accounts:** up to 25 a press, each in its own transaction that checks the state again
  before `deleteStudentAccount`, then clears the match cache. A failure stops there and says how many
  went. No email.
- **The switch:** both routes refuse with 409 after the admin check until `INACTIVE_ACCOUNTS_ENABLED`
  is `true`; the page says why its buttons are off. In `.env.example`, off.

Checked on a throwaway local Postgres through `next dev`, with one student in each state: off, both
buttons 409; a notified student signing in had the notice cleared by Part A's write; on, a refused
Resend batch (a dead key) recorded nothing, and Delete removed the one due account with its profile
and ticket and kept the rest. Not checked: a real send. That is release day's first round, to the
owner's own address first if wanted.

**Part D — the admin page.** Built before release day (owner, 27 October 2026), with both buttons off
until `INACTIVE_ACCOUNTS_ENABLED` is on: with it off, the page shows the lists, and the buttons are
disabled and say why. It is turned on only once the Privacy Policy that sets the rule is published.
`/admin/students/inactive`, or a tab of `/admin/students`, with three counts and lists:
- silent, not yet notified (due a notice);
- notified, with the days left;
- due for deletion.

Two buttons, each confirming with the number of accounts first:

- **Send notices.** Up to a daily cap under Resend's limit, through Resend's batch sending. A notice is
  recorded only when Resend accepts it: `inactivityNoticeSentAt DateTime?` on `User`, in the same
  migration as Part A.
- **Delete due accounts.** Each one in its own transaction, through `deleteStudentAccount`; a failure
  stops at that account. Then the match cache is cleared as the existing deletes do.

A student is due for deletion when the notice is 30 days old or older, and `lastActiveAt` is not later
than the notice. Part A's daily write clears `inactivityNoticeSentAt` when a notified student is active
again. Put the rule in one pure function with its tests, and use it in the page, both buttons and Part E.

**Part E — the daily job. Not now (decision 4):** built only when the owner asks, after a manual round.
A Vercel cron calls one route, `/api/cron/inactive-accounts`, once a day.
Read the current Vercel and `node_modules/next/dist/docs/` pages first. The route refuses anything
without `CRON_SECRET`, and does what the two buttons do, with the same caps. It runs only when
`INACTIVE_ACCOUNTS_AUTO` is on (decision 4). It logs counts, never addresses (5.32). The route-gates test
(7.1 Part 3) picks up the new route; give it a gate kind for the cron secret.

**Also check, the owner may have missed these:**

- A student linked to a school: their coordinator loses them from the school's list. Say so in the
  email if the owner wants the school told.
- Accounts that never finished sign-up (no profile) follow the same rule.
- Supabase's free project keeps no backups (`docs/legal-review/README.md`), so a deletion is final. The
  admin's confirm step has to say so.
- Every date in UTC, and days counted whole.

**Must not:**

- Send or delete anything before the Privacy Policy that describes it is published.
- Touch coordinators, admins, agents or schools.
- Store a row per visit, or write more than once a day per student (the hard rules on cost).
- Read whole tables: select ids, addresses and dates only, and count with `count()`.
- Run `prisma migrate dev` or `prisma db push`.

**Verify:**
- Vitest for the rule function: every state, the edges at 6 months and at 30 days, and activity
  after the notice.
- Vitest for the `jwt` write: once a day, and that it clears the notice.
- The two buttons' and the cron route's gates.
- The email's fixture and plain text.
- On a throwaway local Postgres, with dates set back, one account through each state and the final
  deletion.
- The usual checks.

**Session size:** Large. Split into sessions:
- ~~the decisions~~ made 27 October 2026; ~~Part 0~~ done 27 October 2026;
- ~~Part A~~ and ~~Part B~~ done 27 October 2026;
- ~~Part C's board~~ approved 27 October 2026;
- ~~Parts C and D in code~~ done 27 October 2026, the buttons behind `INACTIVE_ACCOUNTS_ENABLED`, off;
- Part E, only when the owner asks for it.

---

### 7.7 — Close three gaps in the matching tests — **done**

**Outcome:** Tests for the Redis match cache, for both 0.25 floors in the subject matcher, and for
`MATCHING_V10_FULL` overriding the other flags. No change to how anything scores.

**Why:** Found 26 October 2026 while moving the matching scripts to Vitest (7.1 Part 4). A deliberate
break to any of these fails no test:

- **`lib/matching/cache.ts` has no tests.** It caches match results in Redis, and five API routes call
  `invalidateStudentCache` after a student's grades or preferences change. A missed invalidation shows
  a student matches for grades they no longer have. Its only "test" printed a description.
- **Neither 0.25 floor in `lib/matching/subject-matcher.ts` is reached.** The grade-shortfall floor
  (`calculateGradeShortfallScore`) and the level-mismatch floor both clamp at 0.25; the test named
  "minimum floor of 0.25" is 3 grades short of a 7, which scores 0.45.
- **`MATCHING_V10_FULL` overriding each flag** (`isFeatureEnabled` in `lib/feature-flags/matching-v10.ts`)
  is untested, and production's `.env` sets that flag.

**Steps:**
1. `lib/matching/cache.test.ts`: mock `@/lib/redis` (or whatever `cache.ts` imports for its client)
   with a `Map`. A miss computes and stores; a hit returns the stored result without computing;
   different weights are different keys; `invalidateStudentCache` removes that student's keys and no
   one else's; a Redis error falls back to computing. Read `cache.ts` first; it is 495 lines and has
   a V10 path too.
2. In `subject-matcher.test.ts`: a grade shortfall large enough to hit the floor (for example a 1
   against a required 7), and an SL course far below an HL requirement, each scoring exactly 0.25.
3. In `matching-v10.test.ts`: with `MATCHING_V10_FULL=true` and no other flag, every flag is on; with
   `MATCHING_V10_FULL_ROLLOUT=0`, none is.

**Must not:** connect to Redis or the database; change any score.

**Verify:** each new test fails when the line it covers is broken (lower a floor to 0.2; drop the
`MATCHING_V10_FULL` check; skip the delete in `invalidateStudentCache`), and passes when restored.
`npm test` and the usual checks.

**Session size:** Small.

**Done 26 October 2026.** 24 new tests and one corrected, and no change outside the three test files:

- **`lib/matching/cache.test.ts`, new, 20 tests.** Redis is mocked as a `Map` of JSON strings, with a
  `scan` that pages 100 keys a call as Redis does. The scorer and the optimised matcher are the real
  ones, wrapped in spies, so a test sees whether a result was computed or read. Each of the three
  reads (single, batch, V10) is checked for a miss that computes and stores for 30 minutes, a hit that
  computes nothing, and different weights giving different keys; single and batch also for a Redis
  error falling back to computing. The V10 read is checked with `MATCHING_V10_FULL` on (the optimised
  matcher) and off (the V9 scorer, still enhanced). `invalidateStudentCache` removes all three kinds of
  key for `student-1` and none for `student-10`, follows the SCAN cursor past the first page, makes the
  next read compute again, and logs a Redis error rather than throwing. `invalidateProgramCache`,
  `clearAllMatchCache` and `getCacheStats` have one test each.
- **`subject-matcher.test.ts`.** The test named "Grade shortfall: minimum floor of 0.25" is now a 1
  against a required 7, and scores exactly 0.25; it was 3 short, which scores 0.45. A new test, SL 1
  for HL 7, reaches the level-mismatch floor: the shortfall's own floor gives 0.25, the 0.7 penalty
  0.175, and the floor 0.25.
- **`matching-v10.test.ts`.** `MATCHING_V10_FULL=true` alone turns every flag on; it overrides a flag
  set to `false`; with `MATCHING_V10_FULL_ROLLOUT=0` every flag is off, even one set to `true` on its
  own. That last case is how the code behaves now, and the test records it.

**Verified:** each break fails at least one new test, and passes again when restored. The grade-shortfall floor at
0.2: 1 test fails. The level-mismatch floor at 0.2: 1 fails. The `MATCHING_V10_FULL` check dropped: 3
fail. The delete in `invalidateStudentCache` skipped: 3 fail. Beyond the task's list: SCAN reading one page only: 1 fails;
the weights hash leaving out one weight: 6 fail; the V10 read never storing: 6 fail;
`invalidateStudentCache` missing the V10 keys: 2 fail. `npm test`, type-check, `eslint . --max-warnings
0`, `prettier --check .` and `npm run build` are clean. No Redis, database or network was reached by
the tests.

---

### 7.8 — Say in the Privacy Policy that matching is a calculation, not a decision — **done**

**Outcome:** The Privacy Policy draft says plainly how a student's data becomes a match, and that it
decides nothing about them. The lawyer has the question in the same review.

**Why (found 30 October 2026, checking the legal drafts against Version XI):** none of the matching work
adds or moves data, so nothing in 5.40–5.45 needs a change here. But the drafts never say what matching
is. Section 3 says only "Provide personalized program recommendations". IB Match scores the grades and
preferences of people aged 16 to 19, and the words "profiling" and "automated decision" appear nowhere.
GDPR Article 4(4) defines profiling, Article 22 covers decisions with legal or similar effects, and
recitals 60 and 71 touch on telling people about profiling and on children. Whether any of it applies
here is the lawyer's question, not ours. The likely answer is that nothing is decided, since no university
sees a match. The honest paragraph is short either way.

**Steps:**

1. In `docs/legal-review/privacy-policy.proposed.md`, after the list in section 3, and in its redline:

   > **How matching works.** We compare your subjects, grades, total points and chosen fields and
   > countries with each program's published requirements, using fixed rules, not artificial intelligence.
   > The result is shown to you, and to your school's coordinators if you have linked to a school. It is
   > guidance only: it makes no decision about you, and universities do not see it. [LAWYER: is this
   > profiling under Article 4(4), and does it need saying differently because students may be 16 or 17?]

   Check each statement against the code first.
2. Add question 13 to `lawyer-brief.md`, in its numbered list.
3. Update the stale row in `product-today.md`: matches are cached under `matchesV10:…`, and `matches:…`
   until 5.44 removes it.
4. Note in 7.4's status that the draft changed after 24 October 2026.

**Must not:** publish anything; change a consent flow; touch the Terms or the Cookie Policy, which need no
change. No `[LAWYER: …]` tag may remain when it is published (7.4 step 5). Publish once, with the rest of
7.4 on release day, since a later change means a second policy notice to every student.

**Verify:** `npx prettier --check docs/legal-review`. The redline shows only this paragraph.

**Load:** none. Docs only.

**Session size:** Tiny. First in the matching order, so it reaches the lawyer with the rest.

**Done (30 October 2026):** the paragraph is in the draft and its redline, with question 13 in
`lawyer-brief.md`, the cache row in `product-today.md` and 7.4's status. Nothing is published, and the
Terms, the Cookie Policy and every consent flow are unchanged.

**Checked against the code, and four changes to the words in step 1:**

| Statement | What the code does | Words used |
|---|---|---|
| Subjects, grades, total points | `subject-matcher.ts` also compares each course's level. TOK and EE reach the score only through the total | Adds "levels" |
| Fields and countries against "published requirements" | They are compared with the program's own field and country, which are not requirements (`field-matcher.ts`, `location-matcher.ts`) | "your chosen fields and countries with its field and country" |
| "each program's" | Matches scores only the candidates, the point 5.45 corrects on How it works | "a program's" |
| Shown to "your school's coordinators" | Only with full access, a paid or VIP plan, and the student's consent (`hasFullAccess`, `hasConsent`); a free school sees no matches or score distribution | "if you have linked to a school and its plan allows it" |
| Fixed rules, not artificial intelligence | True: no language-model dependency, constant weights, and `calculateMatch` reads one student and one program | Kept |
| No decision; universities do not see it | True: no database table holds a result, no email or other action follows one, and no route shows one to a university or an agent | Kept |

**Verified:** `npx prettier --check docs/legal-review` passes. The redline, applied to the published baseline,
gives the draft exactly, leaving aside heading case, table padding and blank lines. The
only new lines in its diff are this paragraph; the hunks after it moved down two lines. With this note the drafts
hold the seven `[LAWYER]` notes group 2 counts; it was six before.

---

## Deliberately not doing

Recorded so nobody re-opens them without new information.

| Item | Why not |
|---|---|
| **Nonce-based CSP** | Per the Next 16 CSP guide, nonces force every page into dynamic rendering — ISR disabled, no CDN caching, higher cost. Bad trade for an app that loads no third-party scripts. `'unsafe-eval'` is already gone from production. Revisit if `experimental.sri` stops being experimental. |
| **Rate limiting the Stripe webhook** | Throttling it makes Stripe retry and eventually drop events. It is guarded by signature verification instead. |
| **Shortening the 30-day session** | Role revocation now takes effect within 5 minutes, so session length is a product preference rather than a security control. Change it if the user wants shorter, not for security. |
| **Removing `'unsafe-inline'` from `script-src`** | Next emits inline bootstrap and hydration scripts. Needs nonces or SRI — see above. |

---

## Owner tasks

Not AI work, but they gate real value.

1. ~~**Enable branch protection on `main`.**~~ Done 7 October 2026: a repository ruleset ("Protect
   main", active, no bypass) on the default branch requires a pull request (0 approvals) and the
   status checks "Type check, lint, format", "Tests", "Production build" and Vercel, with the
   branch up to date. It also blocks deletion and force pushes. A direct push to `main` is rejected.
2. **Watch Supabase egress** for a week after the quota reset. Expected steady state is
   well under 1 GB/month. If it climbs, rank `pg_stat_statements` by `rows` first — see
   [Hard rules — cost](#hard-rules--cost).
3. ~~**Decide the test framework** for 7.1 before that session starts.~~ Decided in
   session 8: Vitest.
4. **Decide whether the cookie consent banner is needed.** It shows on every first visit and covers
   about 20% of a phone screen, including the bottom navigation. Yet its own comments say no
   optional cookies are set yet (`components/shared/CookieConsentBanner.tsx:6,14`). If only strictly
   necessary cookies are used, a consent banner is generally not required under the ePrivacy rules.
   Confirm with whoever owns legal before removing it. Analytics is a separate, later task, and
   would bring the question back (design audit §8, 6 October 2026). **Decided 10 October 2026
   (owner): the banner stays.**
5. **Compare Upstash bandwidth per day** for the week before and the week after 5.19 merges (the
   Upstash console, Usage tab). From 1 to 11 October 2026 it was about 0.1 GB a day, much of it
   rebranding QA. If it does not fall, or Matches still dominates, do 5.19's step 3.
6. **Approve deleting the two invitations 5.25 left behind**, after a Supabase backup:
   `scripts/delete-orphaned-student-invitations.ts --apply` (5.25, step 6).
