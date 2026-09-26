# Content Refresh for 2027 Entry

**Written:** 24 September 2026 · **Covers:** every fix from the content audit of the same
day, the full 2026 → 2027 refresh of programs and country pages, and the two open
research questions (USA, Germany)

**Goal.** Every program and every country page states requirements for **2027 entry**,
says so, and can prove it. Today almost everything describes 2026 entry, which enrolled
this month.

**How to use this.** [Start here](#start-here) gives the session order. Each task below is
written for a **fresh AI session with no memory of this audit**. Read
[Standing context](#standing-context) first, and the standing context in
`docs/tasks/MAINT_tasks.md` too: its production-safety and cost rules apply to every task
here, and this refresh does more production writes than any work before it.

---

## Start here

| # | Session | Tasks | Size | Why here |
|---|---|---|---|---|
| 1 | Stop loading the base64 logo | 1.1 | small | **Partly done.** The cost is gone; moving the logo to Storage waits on Storage (step 3). Fold into any later session |
| 2 | Oxford and Cambridge fast lane | 1.2 | medium | **Done.** Applied 25 September 2026. Two Oxford rows wait on the IB line from their course pages |
| 3 | Honest labels | 1.3, 1.4 | small | **Done.** 25 September 2026 |
| 4–6 | Country pages for 2027 | 2.1–2.3 | medium each | **Done.** 25 September 2026. All 22 country pages say 2027 |
| 7 | Requirements overview page | 2.4 | small | **Done.** 25 September 2026 |
| 8 | Entry year on every program | 3.1 | medium | **Built and migrated** 26 September 2026; the backfill waits on the owner's approval |
| 9 | Canonical degree types and IB course codes | 3.2, 3.5 | small each | The refresh tool validates against both |
| 10 | Refresh tool and link checker | 3.3 | medium | 1,200 programs cannot be edited by hand |
| 11 | Broken and renamed programs | 3.4 | medium | First real use of the tool, small scope |
| 12–19 | Program refresh | 4.1–4.8 | large each | The core of the goal. **UK sessions by mid-December** |
| 20–21 | Thin countries | 5.1, 5.2 | large each | Landing pages promise more than search delivers |
| 22–24 | USA | 6 | research, then build | Standalone. Needs an owner decision halfway |
| 25–27 | Germany | 7 | research, then build | Standalone. Needs an owner decision halfway |

**Phases 2 and 3–4 are independent.** Country pages touch no program data. If time runs
short before 13 January 2027, prioritise sessions 12–13 (UK) over session 6.

### Rules for this refresh

1. **One session, one pull request**, as in `MAINT_tasks.md`. Data files and scripts are
   committed; the production writes they drive happen from the session, with the owner's
   approval of the diff.
2. **Never relabel without checking.** A value becomes "2027" only when a source says
   2027 entry. If a university has not published 2027 yet, keep the value, stamp it 2026,
   and list it in the PR.
3. **Never delete a program.** Report discontinued programs; the owner decides.
4. **Do not run this alongside `MAINT_tasks.md` 7.2** (collapsing the country pages).
   Phase 2 edits the same files. Do phase 2 first; 7.2 then migrates refreshed content.

---

## The full list

Phase 1 — Fix now

- [ ] 1.1 Stop loading the University of Toronto's base64 logo — steps 1, 2, 4 done; step 3
  blocked on Storage
- [x] 1.2 Oxford and Cambridge fast lane — two Oxford rows held for the owner's check
- [x] 1.3 Correct the false counts and the "Educaton" typo
- [x] 1.4 Make page dates truthful

Phase 2 — Country pages for the 2027 intake

- [x] 2.1 English-speaking and Asia-Pacific pages (7) — owner to open four bot-walled links
- [x] 2.2 Western and Northern Europe pages (7) — owner to open three bot-walled links
- [x] 2.3 Southern and Central Europe, Israel, Japan pages (8) — owner to open two bot-walled links
- [x] 2.4 `/ib-university-requirements` — four country-page follow-ups listed in its status

Phase 3 — Refresh groundwork

- [ ] 3.1 Record the entry year a program was checked for — built and migrated; backfill waits on
  the owner
- [ ] 3.2 Canonical degree types
- [ ] 3.3 Refresh tool and link checker
- [ ] 3.4 Broken and renamed programs
- [ ] 3.5 Merge duplicate IB course codes (do before 3.3)

Phase 4 — Program refresh for 2027 entry

- [ ] 4.1 UK I — Imperial, UCL, LSE
- [ ] 4.2 UK II — Manchester, Edinburgh
- [ ] 4.3 Canada I — Alberta, UBC, Toronto
- [ ] 4.4 Canada II — McGill, Waterloo, Western
- [ ] 4.5 Hong Kong and Singapore
- [ ] 4.6 Netherlands and Ireland
- [ ] 4.7 Australia, Switzerland, Spain
- [ ] 4.8 Italy, Sweden, Poland, Portugal, Czech Republic, Austria, Belgium, Denmark,
  Israel, Estonia, Japan

Phase 5 — Coverage

- [ ] 5.1 Austria, Belgium, Denmark
- [ ] 5.2 Japan, Estonia, Czech Republic, Israel

Phase 6 — USA

- [ ] 6 Research how to model US admissions, then refresh and extend

Phase 7 — Germany

- [ ] 7 Research how to model German admissions, then refresh and extend

Owner tasks — not AI work

- [ ] Review every refresh diff before `--apply`
- [ ] Decide what happens to discontinued programs
- [ ] Check bot-blocked sites by hand when the session cannot read them
- [x] Apply the Oxford and Cambridge changes (1.2) — by script, 25 September 2026
- [x] Compare the Oxford rows with Oxford's summary table (1.2) — 25 September 2026
- [ ] Read the IB line on four Oxford course pages: the two held rows, plus Computer Science and
  Classics as a spot check (1.2; details in the handoff file). A passing spot check moves 41 Oxford
  programs from 2026 to 2027 (3.1)
- [ ] Approve the entry-year backfill (3.1)
- [ ] Approve the canonical degree list (3.2)
- [ ] Choose the US model (6) and the German model (7)
- [ ] Decide about France (5)

---

## Standing context

**Read this, and the standing context in `docs/tasks/MAINT_tasks.md`, before any task.**

### The rules that matter most here

- `.env` points at the **production** database. Every script and Prisma command writes to
  production. Never `prisma migrate dev`, never `prisma db push`.
- Supabase is on a 5 GB egress free tier. **Inspect with aggregates**, and use `select`,
  never `include`, in anything new. To list a university's programs, select the columns
  you need; to list URLs, `GROUP BY "programUrl"`.
- **Never store binary data in a column.** University images and logos go to Storage
  through the admin UI.
- Scripts import `prisma` from `@/lib/prisma-standalone`, which **does not sync Algolia**.
  The headers of the seed scripts in `scripts/programs/` still say programs "automatically
  sync to Algolia via the Prisma extension"; that stopped being true with Prisma 7. After
  any script write, run:
  ```bash
  npx tsx scripts/sync-to-algolia-standalone.ts
  npx tsx scripts/invalidate-program-cache.ts
  ```
  Edits made in `/admin/programs` are meant to sync both on their own, but the sync runs
  after the response and is not guaranteed to finish on Vercel: a field rename in 1.3
  never reached Algolia. After an admin edit, check the record and run the sync script
  if it did not change.

### Calendar

| Date | What |
|---|---|
| 15 October 2026 | UCAS deadline for Oxford, Cambridge and most medicine, veterinary and dentistry courses, 2027 entry |
| 13 January 2027 | UCAS equal-consideration deadline for everything else, 2027 entry |

Both confirmed on ucas.com on 24 September 2026. Other countries' deadlines are on their
landing pages and are part of what phase 2 re-checks.

### Baseline — audit of 24 September 2026

| | |
|---|---|
| Programs | **1,282** (not 1.6k), 57 universities, 22 countries, 12 fields. Algolia matches: 1,282 records |
| When entered | 1,109 in January 2026, 166 in February, 7 in March. **1 edited since March** |
| Verified | 808 flagged `requirementsVerified`, all checked January–February 2026 for **2026 entry**. 474 never checked |
| Country pages | 17 of 22 say "Last updated for the 2026 intake". No text change since 26 February 2026 |
| Program links | 1,251 distinct URLs: 17 × 404, 1 × 500, 3 no response, 25 soft-404 (UCD), 123 redirects, 130 unverifiable (bot-blocked) |
| No subject requirements | 242 programs: UK 80, Netherlands 48, Canada 48, Australia 30, Spain 22, Italy 9, Israel 3, Austria 1, Japan 1 |
| Degree types | 156 distinct spellings |

**Drift is real.** Manchester's BSc Computer Science is stored as 38 points and flagged
verified on 15 January 2026. Manchester asks **37 points, HL 7,6,6** for 2027 entry (38,
HL 7,7,6 for 2026). Of four programs spot-checked by hand, two Imperial programs matched
2027 exactly, and NTU Aerospace now accepts Computer Science as the second HL subject,
which the stored data lacks.

**Coverage against demand** (students who list the country as a preference):

| Country | Students | Programs | Universities |
|---|---|---|---|
| United Kingdom | 49 | 323 | 7 |
| Netherlands | 43 | 101 | 5 |
| Germany | 36 | 38 | 1 |
| Canada | 34 | 272 | 6 |
| USA | 32 | 45 | 1 |
| Austria | 29 | 7 | 2 |
| Denmark | 22 | 5 | 1 |
| Belgium | 22 | 6 | 1 |
| Japan | 21 | 2 | 1 |
| Estonia | 9 | 2 | 1 |

164 students, 56 of them new in the last 90 days. Treat the demand numbers as direction,
not precision.

### Data conventions

- **`minIBPoints` is the published minimum total.** Where a university gives a minimum and
  a typical offer (Imperial: minimum 38, typical 39), store the minimum and put the
  typical offer in the data file's notes. Existing data already follows this.
- **Subject requirements:** one row per required subject. Alternatives share an
  `orGroupId`. "Mathematics" with no course named means `MATH-AA` or `MATH-AI` in one OR
  group; a named course means only that course.
- **"No specific subjects" must be explicit.** An empty requirement list should mean
  "checked, none required", with a note saying so, not "not researched".
- **Known limitation:** the model cannot express an HL grade profile without named
  subjects (Manchester: "7,6,6 at HL"). Record it in the notes. If it turns out to be
  common, raise it as a separate task rather than stretching the model.
- `programUrl` is the page for the entry year you checked. Manchester pins the year in
  the path (`/courses/2027/...`); use the new one.

### Research rules

- **Official sources only**: the university's own admissions or course pages, government
  and recognition bodies. Never aggregators (Studyportals, TopUniversities and the like).
  `docs/countries/COUNTRY-PAGE-BASELINE.md` §2 has the full source rules.
- Look for a **university-wide IB requirements page or table** first. Many universities
  publish one, and it is far cheaper than opening every program page.
- A page must **say which entry year it describes**. If it does not, note that.
- **Bot-blocked domains** return 403 to scripted requests on every URL: `ox.ac.uk`,
  `ucl.ac.uk`, `web.ub.edu`, `study.unimelb.edu.au` (and `mur.gov.it` on the country
  pages). Try WebFetch; if that fails too, list the programs for the owner to check in a
  browser. Do not record them as broken. Found in 2.1: `univcan.ca` and `ouac.on.ca` 403 (univcan
  answers WebFetch), `join.hkust.edu.hk` resets the connection (answers WebFetch), and
  `mcgill.ca/undergraduate-admissions` 403s (its `/importantdates/` pages answer).
- **A 200 can be a bot wall.** `nus.edu.sg` web pages, `admissions.smu.edu.sg` and `cityu.edu.hk`
  return 200 with an Incapsula challenge page to curl and WebFetch alike. Check the body, not just
  the status. NUS PDFs under `/oam/docs/` still download. Found in 2.2: `equivalences.cfwb.be`,
  `ares-ac.be` and `mesetudes.be` return 200 with a 244-byte "Request Rejected" page (WebFetch reads
  them); `viden.stil.dk` downloads redirect to a security check that neither passes; `orientation.ch`
  sends scripts to a cookie check. Found in 2.3: `mur.gov.it` 403s WebFetch too (Cloudflare), so its
  news pages were read through the search index; `comunidad.madrid` returns 404 to curl without a
  browser User-Agent; `unedasiss.uned.es` serves its home page for unknown paths (`/home/pce`), and
  `universidades.gob.es` redirects every path to the science ministry's home page — both are soft
  404s behind a 200.
- **A 200 can be stale.** Year-pinned URLs keep serving last year's page: Manchester
  `/2026/`, Jönköping `autumn-2026`, Gdańsk `20242025`, HKUST `2020-21`.

---

## Phase 1 — Fix now

### 1.1 — Stop loading the University of Toronto's base64 logo

**Outcome:** No query moves the base64 logo; the logo lives in Storage; the hot paths
select only the columns they use.

**Why:** `University.logo` for the University of Toronto holds a 365 KB base64 string,
the pattern that caused the storage outage. The public program page
(`app/programs/[id]/page.tsx`) loads the university with `include` in both
`generateMetadata` and the page, so **every render of any of Toronto's 40 program pages
moves the logo twice**, and the sitemap sends crawlers to all 40. The documented Algolia
sync script, `scripts/sync-to-algolia-standalone.ts:76`, moves it 40 times per run, about
15 MB, and phase 4 runs that script after every session.

**Files:**
- `app/programs/[id]/page.tsx` — both queries (around lines 29 and 303)
- `scripts/sync-to-algolia-standalone.ts` — the `findMany` at line 76
- `scripts/sync-universities-algolia.ts` — the `findMany` at line 48
- `app/api/admin/programs/[id]/route.ts` — the `update` at line 213 returns the full
  university in its response
- `app/admin/students/[id]/page.tsx:66` — `university: true`
- `app/coordinator/students/[id]/page.tsx:125` — selects `logo` on purpose to render it;
  leave it, it becomes a URL in step 3
- `scripts/fix-university-images.ts` — migrates `image` only, not `logo`

**Steps:**
1. Switch the program page's two queries to `select` with exactly the fields the page and
   its metadata use. Consider deduplicating the two lookups; read
   `node_modules/next/dist/docs/` on data fetching and `cache` first.
2. Switch the two sync scripts, the PATCH response and the admin student page to `select`.
3. Extend `fix-university-images.ts` to migrate `logo` the same way it migrates `image`,
   and run it. **Needs Supabase Storage unrestricted**; run the check in
   `MAINT_tasks.md` 5.5 first. If Storage is still restricted, ship steps 1–2 alone:
   they remove the cost.
4. Grep for any other query that reaches `University` without a `select`:
   `grep -rn "university: true\|university: {$" app lib scripts --include='*.ts*'`.

**Verify:**
- `SELECT count(*) FROM "University" WHERE logo LIKE 'data:%'` returns **0** (after step 3)
- A Toronto program page and a coordinator's student page render correctly
- `npx tsc --noEmit && npx eslint . && npm run build` clean

**Guardrails:** Do not `NULL` the logo to make it go away. That is destructive and needs
a backup and the owner's approval.

**Session size:** Small.

#### Status, 24 September 2026 — steps 1, 2 and 4 done; step 3 blocked (session 1)

- **Done.** Every query the step 4 grep found now uses `select`, plus the public
  university page (`app/universities/[id]/page.tsx`, the same double lookup as the program
  page). Both detail pages read once per render through React `cache`; `pg_stat_statements`
  shows one query per program page render, not two. A Toronto program page query went from
  368 KB to 2.5 KB.
- **Root cause, fixed.** The admin university routes stored logos as raw base64 (only
  `image` went to Storage). Logos now follow the image rule: uploaded, or a 502. An
  unchanged logo is not re-uploaded, so Toronto stays editable while Storage is down.
  Covered by `app/api/admin/universities/**/route.test.ts`.
- **Blocked.** Storage returned **402 `exceed_egress_quota`** on 24 September, three weeks
  after the reset `MAINT_tasks.md` 5.5 was waiting for. `fix-university-images.ts` now
  migrates `logo` as well as `image` but has **not been run**. When Storage answers 200,
  run it, then check `SELECT count(*) FROM "University" WHERE logo LIKE 'data:%'` is 0 and
  tick 1.1.
- **Not changed, harmless once step 3 runs:** admin-only reads that still `include` the
  university (`app/admin/programs/[id]`, its edit page, `GET /api/admin/programs/[id]`, the
  program create and bulk routes, `app/admin/universities` list and detail and their API
  `GET`s), and the seed scripts, which look up their own university by name.

---

### 1.2 — Oxford and Cambridge fast lane

**Outcome:** Oxford's 46 and Cambridge's 30 programs match their published 2027-entry
requirements before **15 October 2026**.

**Why:** Applicants to both submit by 15 October. This cannot wait for the refresh tool in
3.3, so it runs as research plus manual edits. Few changes are expected; Oxbridge
requirements are stable.

**Known issue:** Cambridge "Land Economy, BA (Hons)" now redirects to "Environment, Law
and Economics" (`/courses/environment-law-economics-ba-hons`). Establish whether it is a
rename of the same course, then update the name and URL.

**Steps:**
1. For each program, find the 2027-entry requirements: total points, HL/SL subjects and
   grades. Oxford blocks scripted requests; use WebFetch, and list what cannot be read.
2. Write `docs/tasks/content-2027/oxford-cambridge.md`: one line per program with
   "unchanged" or the exact change, plus source URL and date checked. Task 3.1 uses this
   file to stamp these programs as checked for 2027.
3. The owner applies the changes in `/admin/programs`, which syncs Algolia and the cache.

**Verify:** Every program appears in the file. Each changed program shows its new values
on its public page.

**Session size:** Medium. Research only, plus a short handoff.

#### Status, 25 September 2026 — done; two Oxford rows held for the owner (session 2)

- **Done.** `docs/tasks/content-2027/oxford-cambridge.md` has all 76 programs, one row each,
  with the program ID, the 2027-entry requirement, the change and the source. The first half of
  Verify passes.
- **Cambridge, 30 of 30 change.** Every course page says 2027 entry and "41–42 points, 776 at
  HL"; stored values were 42–45. Eighteen stored subjects Cambridge does not require. Land
  Economy is renamed Environment, Law, and Economics (same course, UCAS code KL41).
- **Oxford, 33 of 46 change.** `ox.ac.uk` returned 403 to curl and WebFetch on every page, so the
  rows come from department, faculty and college pages, most of which name no entry year.
- **Judgement call to review:** where a source names no grade for a required subject, the file
  uses 6, the lowest the HL profile allows (776, 766, 666), instead of the stored 7. The rule is
  stated at the top of the file.
- **Script, as an alternative to the admin UI.** `scripts/programs/2027/` holds the same targets
  as data; `scripts/programs/apply-2027-requirements.ts` dry-runs by default (59 changes,
  12 stamp-only, 5 held, matching the file) and writes on `--apply` after the owner approves,
  with a backup and `--restore`. Its diff helpers (`scripts/programs/lib/requirements-diff.ts`,
  Vitest-covered) and data shape are a starting point for the refresh tool in 3.3.
- **Applied, 25 September 2026.** The owner ran `apply-2027-requirements.ts --apply`: 71
  programs written (59 changed, 12 stamped only), backup
  `scripts/programs/2027/backups/2026-09-25T05-47-57-750Z.json` (git-ignored, on the owner's
  machine). A second dry run reports 71 already up to date. Live pages show the new values:
  Oxford Computer Science 39 with Maths AA or AI at HL 7, Oxford History with no subjects,
  Cambridge Economics 41, Environment, Law, and Economics under its new name, Cambridge Medicine
  with Maths AI. Both halves of Verify pass.
- **Summary table, 25 September 2026.** The owner saved Oxford's summary table from a browser.
  It gives A-level offers and subject rules for the current cycle, not IB points. Its required
  subjects agree with 45 of 46 Oxford rows; Fine Art's Visual Arts requirement goes (Art is
  recommended only). Earth Sciences and History of Art take the table's URLs. Three held rows are
  settled (Classical Archaeology and Ancient History, Fine Art, Geography). That leaves four
  programs to write with the script: three changes and one stamp.
- **Still open, owner:** Asian and Middle Eastern Studies and History of Art need the IB line from
  their course pages. A spot check of two more course pages would let 3.1 stamp every Oxford row
  as 2027; both are described in the handoff file.

---

### 1.3 — Correct the false counts and the "Educaton" typo

**Outcome:** The site makes no claim the data cannot back, and the Education field is
spelled correctly everywhere.

**Why:**
- `app/how-it-works/_components/FilterSystem.tsx:5` says **"30+ Countries"**; there are
  22. The next entry says **"30+ Fields of Study"**; there are 12.
- The `FieldOfStudy` row is named `Educaton`. It shows in the search filters, and
  `app/ib-university-requirements/RequirementsContent.tsx:83` maps an icon to the
  misspelled key, so code and data both have to change.

**Steps:**
1. Rewrite both claims so they are true and will stay true as coverage grows. A number
   that goes stale the moment a country is added is the wrong fix.
2. Grep `app` and `components` for other count claims (`[0-9]+\+ `, "over", "more than")
   and check each against the database with a `count()`.
3. Add an `Education` key next to `Educaton` in the icon map and deploy that first, so
   neither spelling misses its icon.
4. Rename the field in `/admin/reference-data`. The reference-data extension should
   resync Algolia (`MAINT_tasks.md` session 3 proved it fires); the facet check below
   confirms it. Then invalidate the program cache.
5. Remove the `Educaton` key in a follow-up commit.

**Verify:** The search filter shows "Education"; `/ib-university-requirements` shows its
icon; Algolia facet values contain no `Educaton`.

**Session size:** Small. Pairs with 1.4.

#### Status, 25 September 2026 — done (session 3)

- **Counts.** The grep in step 2 and a `count()` for each claim found five false ones, all fixed:
  "30+ Countries" and "30+ Fields of Study" on `/how-it-works` (22 and 12) now read "Countries"
  and "Fields of Study"; "Thousands of Programs" (1,282) reads "1,000+ Programs"; "Every program
  is manually reviewed" (838 of 1,282 are flagged `requirementsVerified`) and "Always fresh data"
  are gone; the requirements page metadata no longer says "30+ countries"; the support page no
  longer promises to help "hundreds" of students (134 profiles). The "1000+" claims on
  `/programs/search` are true and were kept: a floor that only grows stays true.
- **Education.** Step 3 was already live: the `Education` icon key has been on `main` since
  `7a0a2af`. The owner renamed the field in `/admin/reference-data`. Live `/programs/search` and
  `/ib-university-requirements` show "Education" and not "Educaton", the requirements page renders
  its book icon, and the Algolia facet reads `Education: 15` with no `Educaton`. The `Educaton` key
  is removed in its own commit.
- **The reference-data extension did not reach Algolia.** The rename wrote the row, but the facet
  still read `Educaton: 15` six times over 80 seconds. `npx tsx scripts/sync-to-algolia-standalone.ts`
  fixed it, then `invalidate-program-cache.ts` rebuilt the cache. Both extensions in `lib/prisma.ts`
  start the sync without awaiting it and return, and Vercel can freeze the function once the
  response is sent. `MAINT_tasks.md` session 3 proved they fire against a local database, where the
  process stays alive. The likely fix is Next's `after()` (see
  `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/after.md`), but that is a
  separate task: the program-level path in `lib/algolia/middleware.ts` has the same shape, and
  phase 4 relies on it.
- **Two more, on the owner's call.** The support page's "Many of our programs were added thanks to
  student suggestions" is removed: nothing in the data records where a program came from. On the
  requirements page, the visible FAQ said the IB is recognised in "over 100 countries" and its
  structured data said "over 22", which was the site's own country count. Both now give the IB's
  figure: over 4,500 universities in more than 110 countries and territories receive IB transcripts
  each year. `ibo.org` returns 403 to scripted requests, so the sentence was read from the search
  index, not the page; check it in a browser at
  `ibo.org/university-admission/find-countries-and-universities-that-recognize-the-ib/`.

---

### 1.4 — Make page dates truthful

**Outcome:** Structured data and the sitemap report when a page was actually last
reviewed, not the time of the last build.

**Why:** All 22 country pages and `/ib-university-requirements` set
`dateModified: new Date().toISOString().split('T')[0]` in their Article JSON-LD, and
`app/sitemap.ts` sets `lastModified: new Date()` for static routes. Every weekly
revalidation tells Google the pages were updated today, while the visible text says
"2026 intake". Search engines learn to ignore dates that always move.

**Files:** `app/study-in-*/page.tsx` (22), `app/ib-university-requirements/page.tsx:282`,
`app/sitemap.ts`, and `docs/countries/COUNTRY-PAGE-BASELINE.md` §3.2, which prescribes
`new Date()` and would bring the bug back on the next new country.

**Steps:**
1. Give each page one real review date, kept in one place that both the page and the
   sitemap read. A small map keyed by slug works, and `MAINT_tasks.md` 7.2 can carry it
   into its data later.
2. Set every date to the last real content change: **2026-02-26** for all 22 country
   pages and the requirements page (the August 2026 commit changed only caching).
3. Update the baseline doc so new pages follow the rule.

**Verify:** The rendered JSON-LD on two pages shows the fixed date; `/sitemap.xml` shows
the same dates; the build still reports all 22 routes as static.

**Session size:** Small.

#### Status, 25 September 2026 — done (session 3)

- **One place.** `lib/page-dates.ts` holds `published` and `modified` for each page, keyed by
  path. The page's JSON-LD spreads `pageDates(path)`, and `app/sitemap.ts` reads the same
  entry, so the two cannot disagree. The sitemap builds the country entries from the map, so
  a new country page needs one line there and no sitemap edit. When phase 2 refreshes a
  page, bump its `modified` in the same commit.
- **Dates, from git.** The country pages are 2026-02-26, as the task said: the August commit
  only added caching to three pages. `/ib-university-requirements` is **2026-09-25**, not
  2026-02-26, because 1.3 changed its FAQ text.
- **Beyond the listed files:**
  - `datePublished` was `'2025-01-01'` on 22 of the 23 pages, a placeholder older than the
    repository (first commit 2 December 2025). Each page now gives the day git added it.
  - The home, `/how-it-works`, `/for-coordinators` and `/faqs` pages had the same
    `new Date()` bug and now read the map. `/faqs` prefers the CMS document's date when one
    is published; production has none today.
  - In the sitemap, pages with no known date (privacy, terms, cookies, contact, support,
    sign-in, FAQs) now leave `lastModified` out rather than claim today. `/programs/search`
    uses the newest program's `updatedAt`. `/about` is removed: there is no such route, and
    it returns 404.
- **Guarded.** `lib/page-dates.test.ts` checks that every `study-in-*` directory has an entry,
  that every entry's page calls `pageDates` with its own path, and that no page or sitemap
  sets `dateModified` or `lastModified` from `new Date()`. `COUNTRY-PAGE-BASELINE.md` §3.2,
  §5 and §7 now describe the map instead of `new Date()`.
- **Verified.** In the built HTML, the UK page reads published 2026-02-15, modified 2026-02-26;
  Japan reads 2026-02-26 for both. `/sitemap.xml` gives the same dates. The build lists all
  22 country routes as static with a one-week revalidate.

---

## Phase 2 — Country pages for the 2027 intake

**Applies to 2.1–2.3.** For each page:

1. Research per `COUNTRY-PAGE-BASELINE.md` §2: official sources, every URL checked for a
   200.
2. Update **every date-bound fact**: deadlines, application windows, fees, quotas, test
   dates, document editions. The labels are the easy part.
3. Replace annual documents with their 2027 editions where they exist (below).
4. Update the labels: title and Open Graph "(2027)", H1, "Last updated for the 2027
   intake", and the "2027 intake" badge.
5. The FAQPage JSON-LD must match the visible FAQ text exactly.
6. Set the page's `modified` date in `lib/page-dates.ts` (from 1.4) to the day of the session.
7. **If a fact cannot be confirmed for 2027, do not label it 2027.** Keep it, flag it in
   the PR, and leave the page on "2026" if the core facts are unconfirmed.

**Pages already labelled 2027** (UK, USA, Austria, Sweden, Switzerland) were written in
February 2026, before most 2027 details were published. Treat them as unchecked: verify
every date. The UK page must show 15 October 2026 and 13 January 2027.

**USA and Germany pages:** refresh the labels and dated facts here. Phases 6 and 7 may
revise how the pages describe requirements.

**Verify, per session:** every external link on the batch's pages returns 200 (or is on
the bot-blocked list); `grep -rn "2026 intake" app/study-in-<batch>` returns nothing;
`npm run build` shows the routes static with a 1-week revalidate; the rendered title of
two pages checked.

### 2.1 — English-speaking and Asia-Pacific

UK\*, Ireland, Canada, USA\*, Australia, Singapore, Hong Kong. (\* already labelled 2027)

Known issues:
- **UK:** the UCAS tariff link returns 404
  (`ucas.com/undergraduate/applying-to-university/entry-requirements/ucas-tariff`).
- **Ireland:** cites the 2026 CAO guide
  (`www2.cao.ie/downloads/documents/2026/Guidelines-EU-EFTA-UK-2026.pdf`) in eight places.
- **Australia:** cites the 2026 IBA ATAR conversion
  (`ibaustralasia.org/2026-ib-diploma-conversion-to-atar-equivalent-ibas-available/`).
- **Hong Kong:** `join.hkust.edu.hk/admissions/international-qualifications` did not
  respond to a scripted request. Check by hand.

**Session size:** Medium.

#### Status, 25 September 2026 — done (session 4)

- **All seven say 2027**, and their `modified` date in `lib/page-dates.ts` is 2026-09-25. Every dated
  fact was checked against its source. Where no 2027 figure exists yet, the page gives the latest one
  and names the year it describes.
- **UK.** UCAS's published 2027 dates replace the "estimated" timeline: applications opened 12 May
  2026; the deadlines are 15 October 2026 (Oxford, Cambridge, medicine) and 13 January 2027, and the
  final one is 23 September 2027. The Tariff link has a new URL. The personal statement is described as
  it is now (three questions, 4,000 characters), and the UCAS document upload new for 2027 entry is noted.
- **Ireland.** CAO has published its 2027 handbook and important-dates PDF but not yet linked them from
  cao.ie; the page uses both. Dates and fees were wrong beyond the year: the deadline is 5:00 PM, not
  5:15 PM, and the fees are €35 early, €50 normal, €65 late, and €95 late on paper (the page said €40,
  €60 and €80). There is **no 2027 edition of the EU/EFTA/UK entry-requirements guide** yet. The eight
  links now use CAO's short link `cao.ie/euefta`, which the 2027 handbook cites and which serves the
  latest edition, and the conversion table says it comes from the 2026-entry edition. **Every value in
  that table was wrong**: it did not match CAO's (45 points is 600, not 625; 24 is 350, not 360). The
  English thresholds were wrong too. The fees answer now says €2,500 is the 2026/27 rate; the
  unsourced €9,900–€34,000 range is gone. **Recheck the 2027/28 student contribution after the
  October 2026 Budget**, and swap in the 2027 guide when CAO publishes it.
- **Canada.** The page gave only month ranges and cited "university admission calendars" without a
  link. It now gives the September 2027 entry dates of UBC, U of T and McGill (15 January 2027 at all
  three), linked.
- **USA.** The 2026–27 Common App opened on 1 August 2026 with over 1,200 members. The Coalition
  Application is now submitted through Scoir. Unsourced tuition ranges were replaced with the College
  Board's 2025–26 averages, the latest published.
- **Australia.** The conversion is the 2027-entry one ("offers made from August 2026"; UAC and IB
  Schools Australasia agree). **The page misdescribed who gets an IBAS**: it applies only to students
  who sat the IB in Australia. Everyone else is ranked on the whole-number score, so that table was
  added. The timeline has UAC and VTAC dates.
- **Singapore.** NTU's AY2027-28 window (15 October 2026 – 19 March 2027) and its May 2027 rules are in.
  NUS has not published AY2027-28 dates; the page shows its AY2026-27 dates, labelled as such. Two
  claims were unsupported and are gone: that NTU expects "5s, 6s and 7s" (NTU publishes no grade profile
  for IB) and that EE and TOK grades are "explicitly required". The timeline promised predicted-grade
  applicants "early outcomes" from mid-May, but NUS and NTU both decide May-session applicants only
  after results arrive in July.
- **Hong Kong.** HKU and HKUST 2027 dates are in. HKU was shown as "30+", with 40–41 for medicine and
  dentistry. HKU's own 2027 data (the JSON behind its requirements page) gives 34–43 by programme,
  43 for medicine and 41 for dental surgery. The English grades matched neither HKU's (5 in English A,
  6 in English B) nor CUHK's (4 in any IB English).
  The HKUST "28+" and CityU "30+" rows could not be confirmed and are labelled as February 2026 figures.
- **FAQ structured data.** On Canada and the USA the FAQPage JSON-LD did not match the visible FAQ.
  The USA's even had a different question. Both are regenerated from the visible text. Australia's visible
  sources were bare URLs and now show the same names as the JSON-LD. For all seven, the built HTML was
  checked: every JSON-LD question, answer and source appears verbatim on the page. **Run the same
  check on the 2.2 and 2.3 pages.**
- **For the owner:**
  - Open four links in a browser; scripts only get a bot wall: the NUS IB requirements page (it is
    also the only source for the "institute code 000690" line), `admissions.smu.edu.sg`,
    `univcan.ca`, and HKUST's international qualifications page (WebFetch reads the last two).
  - Left for phase 6, not checked here: "over 770 US universities" recognise the IB (the IB's own
    text, read through the search index, says about 800 have policies in its database, and that more
    than half grant credit for SL as well as HL, against the page's "SL usually no credit"); the
    Common App's 650-word essay and 20-college limits (its help pages are script-rendered); and the
    unlinked credit policies for Michigan, Stanford and Georgetown.
  - The NUS AY2027-28 window, when NUS publishes it (last year's opened in mid-December).
- **Verified.** All 47 external links return 200 except the four bot walls above.
  `grep -rn "2026 intake"` over the seven directories finds nothing. The build lists all seven
  routes as static with a one-week revalidate. The rendered titles all end in "(2027)", and the
  JSON-LD dates read modified 2026-09-25.

### 2.2 — Western and Northern Europe

Netherlands, Belgium, Germany, Switzerland\*, Austria\*, Denmark, Sweden\*.

**Session size:** Medium.

#### Status, 25 September 2026 — done (session 5)

- **All seven say 2027**, and their `modified` date in `lib/page-dates.ts` is 2026-09-25. Where a source
  has not published 2027 figures, the page gives the latest one and names its year. Every page had
  something wrong beyond the year, and those claims now follow the official source.
- **Netherlands.** The 2027-28 numerus fixus window (1 October 2026 – 15 January 2027) is from UvA and
  Twente. The page said predicted grades are "generally not accepted", but Dutch universities admit IB
  students conditionally on them (UvA: final results by 31 August). The statutory fee is €2,694 for
  2026-27. The 2027-28 fee is unpublished; a search result claims €2,771, with no official source. The
  Holland Scholarship is now the NL Scholarship, and Nuffic compares the IB CP to "at least a HAVO
  diploma". **Not on the page:** the Internationalisation in Balance bill (numerus fixus on English-taught
  tracks, caps on non-EEA students) is before the Senate with no commencement date.
- **Belgium.** **The French Community requires no equivalence for the IB.** The FWB equivalence service
  and Wallonie-Bruxelles Campus both list IB certificates among those that need none, provided the school
  is IB-authorised. The page said the opposite in six places, two FAQ answers among them. The Flemish
  entrance exam also covers Veterinary Medicine: 2027 exams 2–4 July, registration 1 March – 17 May 2027.
  The French Community's 2027 concours date is unpublished (2026: 27 August). The month-range timeline,
  sourced to "University admission calendars", now gives VUB's dates and the exam dates.
- **Germany.** Two statements contradicted the KMK's IB agreement (1986, as amended 15 June 2023). The
  page said Germany has no national IB grade conversion, but the KMK sets one: N = 1 + 3 × (42 − P) / 18.
  It also said the KMK sets field-specific HL subjects for medicine and engineering; the KMK sets general
  rules instead (one HL must be a language, mathematics or a science; grade 4 in all six, one 3
  compensable). The maths rule was missing: since 2021, either maths course at SL gives access only to
  subjects outside maths, science and engineering, unless the school is on the KMK's annex.
  hochschulstart has not published winter 2027/28 dates, so the timeline gives 2026's. Phase 7 still owns
  how the page models German admission.
- **Switzerland.** swissuniversities says applicants without Swiss citizenship or a residence permit
  cannot be admitted to medicine; the FAQ answered "Yes". The IB rules now cite swissuniversities' IB
  page, which covers 2026/27 (32/42; ETH and EPFL 38); its 2027/28 list is not out. The orientation.ch
  language source was dead and is replaced by UZH (German C1). The JSON-LD had a different fifth question.
- **Austria.** EU/EEA students pay **no** tuition within the minimum duration plus two semesters; the
  page said "~€363/semester", the fee after that. The "12 HL points" and "no grade below 3" rules are in
  neither Vienna's nor TU Graz's IB rules (24 points, six subjects with a foreign language and maths,
  three HL) and are gone. Vienna counts German taken as an IB subject only as A2 and needs C1; TU Graz
  accepts German A as C1. MedAT 2027 is unpublished (2026: registration 2–31 March, test 3 July), and the
  MedAT quotas are added. Vienna's summer 2027 window is in; its winter 2027/28 dates are not published.
- **Denmark.** The 1.08 bonus for a quick start was abolished from the 2020 intake (ministry press
  release, July 2020), yet the page applied it in three places. IB conversion tables change about every
  three years, not "annually around 1 March", and since 2024 there are two (2020–2022 graduates, and the
  rest). **Not checked:** optagelse.dk links an "Entry requirements: upcoming changes (2027-2028)" PDF on
  `viden.stil.dk` that neither curl nor WebFetch can read.
- **Sweden.** The admissions-round advice was reversed. University Admissions tells final-year IB students
  **not** to apply in the first round and recommends the second round only to EU/EEA and Swiss citizens;
  the page told unfinished non-EU applicants to use the first round only. The merit table was the one
  replaced for autumn 2025 (24 points: 12.40, now 13.18). Autumn 2027 dates are in: first round
  16 October 2026 – 15 January 2027; second round 15 March – 15 April 2027; IB results to "UHR" by 5 July
  2027. Applicants rank up to 8 courses and programmes, not 4. UHR's IB page still describes May 2026
  diplomas; recheck it when it moves to 2027.
- **FAQ structured data.** On all seven pages the FAQPage JSON-LD is now generated from the visible `faqs`
  array: the answer, then " Source: <name>.". Austria, Sweden and Switzerland had drifted, and Germany's
  sources were bare URLs. In the built HTML every JSON-LD question, answer and source name appears
  verbatim. The same check on the 2.3 pages fails Spain (6 mismatches), Czech Republic (3) and Estonia (3).
- **For the owner:**
  - Open three links in a browser: the FWB equivalence page and the ARES concours dates (both return a
    244-byte "Request Rejected" page to scripts; WebFetch read them), and the Danish 2027-2028
    entry-requirements PDF on `viden.stil.dk`, which nothing scripted could read.
  - Swap in when published: the Dutch 2027-28 statutory fee, hochschulstart's winter 2027/28 dates, the
    ARES 2027 concours, MedAT 2027, swissuniversities' 2027/28 IB list, Vienna's winter 2027/28 window,
    and UHR's IB instructions for May 2027 diplomas. Add the Dutch internationalisation law if it passes.
- **Verified.** All 68 external links return 200; two are the bot walls above, and every page title
  matches its topic (no soft 404s). `grep -rn "2026 intake"` over the seven directories finds nothing.
  The build lists all seven routes as static with a one-week revalidate. The rendered titles all end in
  "(2027)", and the JSON-LD dates read modified 2026-09-25. Type check, lint, Prettier and both test
  suites pass.

### 2.3 — Southern and Central Europe, Israel, Japan

Spain, Portugal, Italy, Poland, Czech Republic, Estonia, Israel, Japan.

Known issues:
- **Spain:** `comunidad.madrid/servicios/educacion/distrito-unico` returns 404.
- **Czech Republic:** `studyin.cz/plan-your-studies/recognition/` returns 404. The
  page's "March 1, 2025" references are the date a law took effect, not staleness.
- **Italy:** `mur.gov.it` returns 403, probably bot-blocking. Check by hand.
- **FAQ structured data:** the JSON-LD does not match the visible FAQ on Spain (6 questions, answers or
  sources), the Czech Republic (3) and Estonia (3). Generate it from the visible `faqs` array, as 2.2
  did, and check the built HTML (`.next/server/app/study-in-<country>-with-ib-diploma.html`).

**Session size:** Medium to large; eight pages.

#### Status, 25 September 2026 — done (session 6)

- **All eight say 2027**, and their `modified` date in `lib/page-dates.ts` is 2026-09-25, as is every
  other country page's. Where a source has not published 2027 dates, the page gives the latest and names
  its year. Every page had claims the official sources contradict or do not support; those now follow the
  source, and unsourced specifics (test-score ranges, fee ranges, counts) are gone.
- **Spain.** **The grade table was wrong in kind.** Under Orden EFD/550/2025 the access grade is the
  average of the IB subject grades (2–7 scale) plus 3 (6.0 → 9, 7.0 → 10); the IB total out of 45 is not
  used. The page said predicted grades "work" (UNEDasiss grades predictions only for UK and Irish
  qualifications), that Spain treats the IB as equivalent to the Bachillerato (the law exempts IB holders
  from the access exam and from homologation, which is different), and that subject recognition covers
  HL grades 5–7 (it is not limited to HL, and not every university accepts it). Weightings of 0.1/0.2 and
  the 14-point maximum are confirmed for 2027 by Catalonia's tables; Medicine now cites Madrid's 2026–27
  cut-offs (12.8–13.1). UNEDasiss has not published 2027 dates, so the timeline gives 2026's (PCE 25–29
  May, international deadline 7 July). Replaced: the dead Madrid link, both `universidades.gob.es` links
  and three UNEDasiss `/home/...` soft 404s. "UNEDassis" is now spelled UNEDasiss.
- **Portugal.** Both agencies the page named are being replaced. DGES became the Instituto para o Ensino
  Superior (IES, I.P.) on 1 October 2025 (Decree-Law 109/2025); the DGE says its work is passing to
  EduQA, I.P. The page says so. Equivalence is needed only for the national competition, not for the
  special competition for international students, as the page implied. IB exams can replace Portuguese
  entrance exams under the yearly CNAES list (Deliberation 619/2026 for 2026–27), and applicants using
  them had a shorter window (20–29 July 2026). DGE's FAQ has no translation exemption for English, French
  or Spanish documents, so that claim is gone. 2026 competition dates are shown; 2027's are unpublished.
- **Italy.** The restricted-programme list was out of date. Law 26/2025 replaced the national test for
  Italian-taught Medicine, Dentistry and Veterinary Medicine with the open "semestre aperto", the
  English-taught courses use IMAT, and Architecture tests are set by each university. The MUR procedures
  for international students **cover 2027–28** and set IB conditions the page lacked: 24 points in six
  subjects with 12 at HL, TOK, EE and CAS passed, a schooling-years rule, and CIMEA's free Attestato di
  Corrispondenza plus verification instead of a Dichiarazione di valore. The Italian B2 test and the
  31 October 2027 visa deadline are in. The HowTo JSON-LD, which repeated the old calendar, is rewritten.
- **Poland.** NAWA gives the legal basis as Article 326a of the Law on Higher Education and Science and
  lists IB certificates as recognised automatically for applying; "equivalent to the Matura since
  31 March 2015 (Art. 93)" is gone. The table's SL column was not the University of Warsaw's: its 2027/28
  rules use one scale (7 = 100% … 2 = 30%) and multiply SL results by 0.6. **New since July 2025:**
  candidates who are not EU, EFTA, Swiss or UK citizens must prove B2 in the language of study (the IB
  Diploma counts for its main language), and the new entrance-exam route for foreign documents excludes
  IB holders. BMAT (discontinued) and the "900 English programmes" count are gone.
- **Czech Republic.** The Section 48(4)(c) exemption is right. Removed: "equivalent to the maturita", an
  unsourced Czech-language exam note, the Charles University Economics "32+" example (the faculty's own
  pages disagree on it), and the fee, tuition and IELTS ranges. The Second Faculty of Medicine waiver is
  stated as published (35 points, 19 of them from HL Biology, HL Chemistry and Maths or Physics, at most 25
  waivers). The dead `studyin.cz/.../recognition/` link is replaced and links use `studyin.gov.cz`.
- **Estonia.** Tallinn University's autumn-2027 Bachelor window (1 November 2026 – 1 March 2027) is in;
  Tartu and TalTech show their 2026 dates, labelled. TLU's 27-point rule is confirmed (EE and TOK at
  least D). TLU no longer states HL English grade thresholds; it, TalTech (Bachelor's) and Tartu accept
  the IB as proof of English. The Estonian University of Life Sciences was listed as a professional
  institution; it is a university. The Riigi Teataja link pointed at a 2018 translation and is replaced.
- **Israel.** **The PET changes for 2027–28 entry:** from the December 2026 sitting it tests verbal and
  quantitative reasoning only, English moves to the separate AMIRNET test, the 200–800 scale stays, and
  scores last "at least seven years, depending on the institution". Test dates 4–6 December 2026 and
  18–19 April 2027. Study in Israel counts 9 universities, not 8. The "Ministry of Education evaluation
  unit" and the IB English exemption grades were unsourced and are gone; the IB conversion now cites the
  Technion's table (HL = 5 Bagrut units, SL = 3). Tel Aviv University accepts SAT/ACT except for Medicine
  and Dental Medicine; its English pages still give 2025–26 deadlines, shown as such.
- **Japan.** 1979 is confirmed by MEXT's own IB paper. The 2026 EJU sessions (21 June, 8 November) are
  in. "Most programmes require JLPT N2" was unsourced and is gone; IB-based admissions cite MEXT's IB
  Consortium.
- **FAQ structured data.** On all eight pages the FAQPage JSON-LD is generated from the visible `faqs`
  array, as in 2.2, and Spain's and Italy's visible sources are names instead of bare URLs. In the built
  HTML every JSON-LD question, answer and source appears verbatim, on all 22 country pages.
- **For the owner:**
  - Open two `mur.gov.it` links in a browser (Cloudflare blocks curl and WebFetch): the semestre aperto
    registration notice and the 2026–27 admission-test dates. Both were read through the search index.
    The test calendar has an errata notice, so the page says only "end of September" for IMAT.
  - Portugal: gov.pt names the Agência para a Gestão do Sistema Educativo for equivalences, while the DGE
    says EduQA. Recheck who handles IB equivalence once the reorganisation settles.
  - Swap in when published: UNEDasiss's 2027 dates; Portugal's 2027 competition calendar and the CNAES
    list (by 31 May 2027); the 2027 semestre aperto and IMAT dates; Tartu's and TalTech's 2027 deadlines;
    the 2027 EJU sessions; Tel Aviv University's 2027–28 deadlines.
- **Verified.** 74 of 76 external links return 200 with a title that matches the topic; the other two are
  the `mur.gov.it` bot wall. `grep -rn "2026 intake"` over the eight directories finds nothing. The build
  lists all eight routes as static with a one-week revalidate. The rendered titles end in "(2027)", and
  the JSON-LD dates read modified 2026-09-25. Type check, lint, Prettier and both test suites pass.

### 2.4 — `/ib-university-requirements`

**Outcome:** The overview page says 2027 and matches the refreshed country pages.

**Files:** `app/ib-university-requirements/page.tsx` (title "(2026)" at lines 19, 35, 44),
`RequirementsContent.tsx:130` ("Updated for 2026 Intake").

**Guardrails:** This page is prerendered and queries production at build time. Build
once to verify; do not loop builds.

**Session size:** Small.

#### Status, 25 September 2026 — done (session 7)

- **The page says 2027.** Title, Open Graph and Twitter titles end in "(2027)", and the keyword is
  "IB 2027 requirements". The badge says "Country guides updated for the 2027 intake", not the whole
  page: the program counts and point ranges on it come from program data that is still mostly 2026
  entry (phase 4), and a line under the country grid says so. `modified` in `lib/page-dates.ts` was
  already 2026-09-25 from 1.3. The rendered title read "… | IB Match | IB Match", because the page
  repeated the root layout's title template; the page's own suffix is gone.
- **Twelve of the 22 country cards contradicted their guide** and now follow it. Hong Kong offered
  "JUPAS/Non-JUPAS pathways", but JUPAS is for HKDSE holders only. Italy led with the Dichiarazione di
  valore, which the MUR procedures replace with CIMEA's attestation. Portugal led with DGE equivalency,
  which only the national competition needs. Spain, Switzerland, Austria and Estonia claimed "full
  recognition"; Germany said "Allgemeine Hochschulreife equivalent", not the KMK's conditions. The UK
  led with Tariff points, though the UK page says there is no national conversion. Australia named
  QTAC, which its page never mentions. Belgium and Singapore were vague where the pages are specific.
- **The FAQ.** The FAQPage JSON-LD had different answers from the visible FAQ on all five questions and
  a different fourth question. Both now come from one `faqs` array in `page.tsx`, passed to
  `RequirementsContent`, so they cannot drift. The points answer uses the database's live minimum and
  maximum (24–45 at this build). Three answers contradicted the country pages: the UK "uses UCAS
  Tariff points" (it has no national conversion), Spain "requires the PCE exam for grade conversion"
  (IB holders are exempt from the access exam; PCE is optional, for extra points), and the UK needs "no
  entrance exams" (its page lists admissions tests for competitive courses). The exams answer now names
  what the pages name: UK admissions tests, HPAT-Ireland, MedAT, the Belgian medicine and dentistry
  exams, IMAT, the PET and HKU interviews. HPAT-Ireland was checked for 2027 entry; the Irish
  Universities Association confirms it stays.
- **For the owner — country pages, not changed here:**
  - **Czech Republic:** the meta, Open Graph, Twitter and JSON-LD descriptions still say the IB "equals
    maturita since 2025", and a section heading still reads "IB Diploma and Czech Maturita
    Equivalence". 2.3 removed that claim from the body.
  - **Portugal:** the meta, Open Graph, Twitter and JSON-LD descriptions still lead with "DGE
    equivalency", which the body now says only the national competition needs.
  - **Ireland:** the page does not mention the change to Medicine entry from 2027. The IUA's press
    release "Changes to CAO entry to undergraduate medicine programmes in 2027" caps HPAT at 150
    points (was 300) and the combined maximum at 775.
  - **`/programs/search`** also repeats "| IB Match" in its title.
- **The page rebuilds hourly, not weekly.** `export const revalidate = 604800` is overridden by the
  one-hour `unstable_cache` TTL (`CACHE_TTL = 3600`) in `lib/reference-data.ts`, which the page calls.
  The build lists it as static with a 1h revalidate, before and after this change. Each rebuild runs
  a few aggregates on production. Not changed here: the TTL is shared with other pages.
- **Verified.** One build. In the built HTML every JSON-LD question and answer appears verbatim on
  the page, the CollectionPage dates read published 2026-01-29 and modified 2026-09-25, and
  `hasPart` lists all 22 guides. The title fix came after that build, so its rendered form was not
  rebuilt. `grep 2026` over the page finds only the IB figure's check date. Type check, lint,
  Prettier and both test suites pass.

---

## Phase 3 — Refresh groundwork

### 3.1 — Record the entry year a program was checked for

**Outcome:** Every program records which intake its requirements describe; admin edits
stamp it; program pages show it to students.

**Why:** `requirementsVerified` is a boolean that never expires, so 808 programs say
"verified" for 2026 data and always will. `requirementsUpdatedAt` is set only by seed
scripts: the admin PATCH in `app/api/admin/programs/[id]/route.ts` never touches either
field. Their reader, `calculateConfidence` in `lib/matching/confidence.ts`, does run for
every match through `enhanceMatchResult`, but it never gets the database values: the
calls at `lib/matching/cache.ts:383` and `:434` do not pass them and
`lib/matching/program-cache.ts` does not select them, so every match is scored as
unverified. No component renders the result either. Students see no freshness signal at
all.

**Files:** `prisma/schema.prisma`, a new migration under `prisma/migrations/`,
`app/api/admin/programs/[id]/route.ts`, `components/admin/programs/ProgramEditForm.tsx`
and `ProgramForm.tsx`, `app/programs/[id]/ProgramDetailClient.tsx`.

**Steps:**
1. Add `requirementsEntryYear Int?` to `AcademicProgram`. Write the migration file, check
   it with `prisma migrate diff`, apply with `prisma migrate deploy`.
2. Backfill: programs checked in January–February 2026 get 2026, and Oxford and Cambridge
   get 2027 from `docs/tasks/content-2027/oxford-cambridge.md`. This is a production
   `UPDATE`: prepare it, show the counts, and let the owner approve it.
3. Admin: add an "entry year checked" field. The PATCH sets `requirementsUpdatedAt` and
   `requirementsEntryYear` whenever requirements or that field change. Add a Vitest test
   for the stamping logic, mocking `@/lib/prisma`.
4. Program page: show "Requirements checked for 2027 entry", or for older data "Checked
   for 2026 entry — confirm on the university's site", linking `programUrl`.
5. Out of scope: feeding the real values into `calculateConfidence` and showing
   confidence to students. That changes matching output and deserves its own decision;
   raise it in the PR.

**Verify:** `prisma migrate status` up to date; `count(*) GROUP BY "requirementsEntryYear"`
matches the backfill; an admin edit stamps the fields; the program page shows the line.

**Session size:** Medium.

#### Status, 26 September 2026 — built and migrated; the backfill waits on the owner (session 8)

- **Column.** `AcademicProgram.requirementsEntryYear Int?`, migration
  `20260926000000_add_requirements_entry_year`, applied to production with `migrate deploy` on
  26 September; `migrate status` is up to date. In Prisma 7, `migrate diff --from-migrations` needs
  a shadow database, so the SQL was generated with `--from-config-datasource`. Production had no
  drift, so the diff is the one `ADD COLUMN`.
- **Admin.** Both program forms have an "Entry year checked" field. The PATCH stamps
  `requirementsUpdatedAt`, `requirementsEntryYear` and `requirementsVerified` (true exactly when
  there is a year) when the points, the subjects or the year change. It compares values, not
  presence: the form sends every field on each save, so a presence check would re-date the
  requirements on a name edit. OR groups compare by members, not ids. Creating a program stamps it
  the same way; copying one clears the year with the other stamps. The logic is in
  `lib/programs/entry-year.ts`, tested in `entry-year.test.ts` and
  `app/api/admin/programs/[id]/route.test.ts` (Prisma mocked). The admin detail page shows the year
  and the date. The edit page now uses `select`: its `include` sent the university's whole row,
  logo included, to the client form.
- **Program pages.** Under "Academic Requirements", on the public page and the coordinator's
  match page: "Requirements checked for 2027 entry", "Checked for 2026 entry — confirm on the
  university's site", or "Requirements not yet checked — confirm on the university's site", linking
  `programUrl`. "Current" is the intake applicants are applying for: next year's from 1 September,
  when this year's has enrolled. So 2027 data turns "older" on 1 September 2027 with no constant to
  bump. All three states were checked on a local dev server.
- **Backfill: dry run done, not applied.** `scripts/programs/backfill-entry-year.ts`:
  - **2027:** 35 programs. All 30 at Cambridge, and the 5 Oxford rows whose source names 2027.
  - **2026:** 803 programs. The 762 other programs verified January–February 2026, the 39 Oxford
    rows whose source names no year (as the handoff file asks), and the two held Oxford rows, which
    still hold January data.
  - **Left empty:** 444 programs never verified.

  Every verified program fits a rule. The script writes only empty values, and uses raw SQL, so
  `updatedAt`, which the sitemap reports, does not move. Run
  `npx tsx scripts/programs/backfill-entry-year.ts --apply` once the owner approves, then tick 3.1.
- **The 1.2 script stamps the year too.** `apply-2027-requirements.ts` writes and backs up
  `requirementsEntryYear`: the row's `sourceYear`, else the data file's new `undatedEntryYear`
  (2026 for Oxford). When the owner's Oxford spot check passes, set that to 2027 and re-run it; the
  handoff file says so. Its dry run shows the 74 written rows as stamp-only until the backfill runs,
  then as up to date.
- **Not done, needs a decision (step 5):** `calculateConfidence` still receives no database values
  (`lib/matching/cache.ts:383` and `:434`; `program-cache.ts` does not select them). Wiring it in
  changes matching output. The entry year is now a better input than a boolean and a one-year age.

---

### 3.2 — Canonical degree types

**Outcome:** A fixed list of degree types that the admin form offers and the refresh tool
enforces.

**Why:** 156 spellings of the same few things: "Bachelor of Science" (316), "Bachelor of
Science (B.Sc.)" (47), "BSc" (20), "Bachelor of Science (BSc)" (8), plain "Bachelor"
(209). The admin "Other degrees" count in `docs/investigation-91-other-degrees.md` is a
symptom.

**Steps:**
1. Read the investigation doc. Get the full list with
   `SELECT "degreeType", count(*) ... GROUP BY 1`.
2. Propose a canonical list and a mapping from every current value. Keep distinctions
   that mean something (MEng, MBChB, LLB are real degree names); merge spelling variants.
   **The owner approves the list.**
3. Put the list and the mapping in one module, and make the admin forms use a select
   instead of free text.
4. **Do not bulk-rewrite the column.** Values are normalised as each university goes
   through phase 4, so the writes happen once, in the tool.

**Verify:** Admin forms offer only canonical values; the mapping covers all 156 current
values (a Vitest test can assert that from a fixture of the list).

**Session size:** Small.

---

### 3.3 — Refresh tool and link checker

**Outcome:** `scripts/programs/refresh.ts` exports a university's programs to a data file,
shows a dry-run diff against the database, and applies it on `--apply`.
`scripts/check-program-links.ts` reports broken, redirected and year-pinned links.

**Why:** Phase 4 touches 1,199 programs. The admin UI is one program at a time and leaves
no record of what changed or why. The original seed scripts in `scripts/programs/` show
the data shape but only create programs; the bulk upload skips existing names.

**Design:**
- **Data file** per university: `scripts/programs/2027/<university-slug>.ts`, exporting the
  university name, `entryYear`, the date checked, and a list of programs in the
  `ProgramDef` shape from `scripts/programs/seed-manchester-programs.ts`, plus `id` (for
  existing programs), `status` (`current`, `new`, `discontinued`), `source` URL and
  `notes`.
- **`--export <university>`** writes a starter data file from the database, selecting only
  the fields in the file. The session then edits it against the 2027 sources instead of
  retyping 1,200 programs.
- **Dry run by default:** per program, print what would change (points, subjects, URL,
  name, degree, duration), then the new programs and the discontinued ones. Keep the diff
  function pure and cover it with Vitest.
- **`--apply`:** one transaction per program. Replace its course requirements, set
  `requirementsVerified`, `requirementsUpdatedAt` and `requirementsEntryYear`, and validate
  course codes against `IBCourse` (after 3.5) and degree types against 3.2. **Never delete**:
  `discontinued` is reported only. Finish by syncing Algolia and invalidating the program
  cache.
- **Link checker:** read URLs with `GROUP BY "programUrl"`, at most 10 requests at once,
  with a browser user agent, following redirects. Report 4xx and 5xx, timeouts, redirects
  that change the path, targets shared by many URLs (soft 404), URLs containing a past
  intake year, and the bot-blocked domains as "unverifiable", not "broken". Filter by
  university or country.

**Verify:** Export and dry-run one small university (Tel Aviv University, 4 programs) and
get zero diffs; apply that no-op and confirm only the stamps changed; the link checker
roughly reproduces the baseline numbers.

**Session size:** Medium.

---

### 3.4 — Broken and renamed programs

**Outcome:** No program links to a dead page, and renamed programs carry their current
name, URL and 2027 requirements.

**Steps:** For each program below, find its current page. **Renamed, same program:**
update the name and URL and research 2027 requirements. **Discontinued:** mark it
`discontinued`, and if there is a successor program, add it as `new`. Use the tool.

**Broken (404, 500, or no response):**

| University | Program | Found |
|---|---|---|
| HKUST | BBA in General Business Management | no response; URL is a **2020–21** catalogue |
| LSE | BSc Psychological and Behavioural Science | no response |
| LSE | BSc Sociology | no response |
| Imperial | Computing (Management and Finance) | 404 |
| McGill | Mathematics | 404 |
| McGill | Software Engineering | 404 |
| NTU | Electrical and Electronic Engineering | 404 |
| NTU | Information Engineering and Media | 404 |
| NTU | Physics and Applied Physics | 404 |
| NTU | Sport Science and Management | 404 |
| HKU | BA and Sciences in Applied Artificial Intelligence | 404 |
| HKU | Bachelor of Journalism, Media and AI | 404 |
| HKU | BSc in Psychology | 404 |
| HKU | BSocSc (Government and Laws) and LLB | 404 |
| Sydney | BE Honours (Mechatronic Engineering) | 404 |
| Amsterdam | Archaeology | 404 |
| UBC | Mathematics | 404 |
| UBC | Psychology | 404 |
| Edinburgh | Artificial Intelligence BSc (Hons) | 404 |
| Edinburgh | Artificial Intelligence and Computer Science BSc (Hons) | 404 |
| Gdańsk | Cultural Communication | 500; URL is the **2024/25** offer on `old-en.ug.edu.pl` |

**University College Dublin — all 25 programs.** Every `ucd.ie/courses/...` URL redirects
to the same generic `hub.ucd.ie` menu. Find where UCD course pages live now.

**Renamed or restructured (the old URL redirects to a different program):**

| University | Stored as | Now redirects to |
|---|---|---|
| Bocconi | Economic and Social Sciences | `.../bachelor-science/economics` |
| Bocconi | International Economics and Management (BIEM) | `.../management` |
| Bocconi | International Economics and Finance (BIEF) | `.../finance` |
| Bocconi | Economics, Management and Computer Science (BEMACS) | `.../management-and-computer-science` |
| Bocconi | Economics and Management for Arts, Culture and Communication (CLEACC) | `.../management-arts-and-cultures` |
| Groningen | European Languages and Cultures | European Languages, Cultures and Politics |
| Groningen | Global Responsibility and Leadership | Global Politics and Sustainability |
| Waterloo | Geomatics | Geospatial Data Science |
| HKUST | Business with Extended Major in AI / Digital Media and Creative Arts / Sustainability | a different slug (`...-ai-cadh`); confirm it is the same program |
| Sydney | Bachelor of Science and Doctor of Dental Medicine | the generic Bachelor of Science page; **probably discontinued** |

**Bocconi restructured its bachelor's range:** 5 of its 9 programs redirect. Refresh all 9
here, not just the five.

Harmless redirects (UBC's `ubc_programs/` → `programs/`, Lund, Linnaeus, KU Leuven, CBS,
Western, Católica's new domain, Georgia Tech) still reach the right page. They are fixed
in phase 4 with the rest of each university.

**Verify:** The link checker reports 0 broken for every program above; the Algolia record
count equals the database count.

**Session size:** Medium.

---

### 3.5 — Merge duplicate IB course codes

**Do before 3.3**, which validates course codes against `IBCourse`, and before phase 4 writes
more requirements against both codes.

**Outcome:** Each IB subject has one `IBCourse` row, every student course and program
requirement points at it, and the admin UI cannot create a second one.

**Why:** Seven subjects exist twice under different codes. The matcher compares course IDs,
so a requirement on one code never matches a student who picked the other. Geography is the
costly one: 6 students chose `GEO`, and 55 requirement rows use `GEOG`, so those students
miss all of them. The duplicates came through the admin reference-courses page:
`app/api/admin/reference/courses/route.ts` rejects a duplicate *code* but not a duplicate
*name*. No code references the extra codes.

Counts on 25 September 2026. "Keep" is the code in `prisma/seed.ts`, so production matches a
freshly seeded database:

| Subject | Keep | Retire | Students (keep / retire) | Requirement rows (keep / retire) |
|---|---|---|---|---|
| Geography | `GEOG` | `GEO` | 8 / 6 | 55 / 10 |
| Design Technology | `DES-TECH` | `DESIGN-TECH` | 3 / 3 | 7 / 1 |
| Classical Greek | `GRK` | `GREEK` | 0 / 1 | 0 / 6 |
| Latin | `LAT` | `LATIN` | 0 / 0 | 5 / 2 |
| French A: Literature | `FRA-LIT` | `FRA-LIT-A` | 1 / 1 | 0 / 0 |
| German A: Literature | `GER-LIT` | `GER-LIT-A` | 1 / 1 | 0 / 0 |
| Spanish A: Literature | `SPA-LIT` | `SPA-LIT-A` | 1 / 1 | 0 / 0 |

**Collisions a plain repoint would hit:**
- **One student has Geography under both codes, with different levels or grades.**
  `StudentCourse` is unique on (`studentProfileId`, `ibCourseId`), and which row is right is
  the student's data, not ours to guess. The owner chooses.
- **Programs with both codes in one OR group.** None today. But the Oxford and Cambridge data
  from 1.2 puts both codes of Latin, Greek and the three Language A pairs in the same OR group
  (`{Modern language}` and `{Modern or classical language}`), so once that data is applied,
  merging must delete the retired option rather than repoint it into a duplicate.

**Files:**
- New `scripts/merge-ib-courses.ts`
- `app/api/admin/reference/courses/route.ts` (POST) and `[id]/route.ts` (PATCH)
- `prisma/schema.prisma` and a new migration under `prisma/migrations/`
- `scripts/programs/2027/*.ts` and `docs/tasks/content-2027/oxford-cambridge.md`, whose
  language groups list both codes

**Steps:**
1. Re-run the counts with aggregates only:
   `SELECT name, array_agg(code) FROM "IBCourse" GROUP BY name HAVING count(*) > 1`, then
   `count(*)` per code on `StudentCourse` and `ProgramCourseRequirement`.
2. Write the merge script, dry run by default, modelled on
   `scripts/programs/apply-2027-requirements.ts`: a backup of every row it changes, then one
   transaction per pair. Repoint `StudentCourse` rows unless the student already has the kept
   course; list those collisions without writing them. Repoint `ProgramCourseRequirement` rows,
   except delete a retired row whose program already has the kept course in the same OR
   group. **The owner approves the dry run**, and chooses the row to keep for each student
   collision.
3. After `--apply`: sync the affected programs to Algolia (`syncProgramsBatch` in
   `lib/algolia/sync.ts`), then `invalidateProgramsCache()` and `clearAllMatchCache()` from
   `lib/matching/cache.ts`. Student courses changed, so cached matches are stale.
4. Delete the seven retired courses on the admin reference-courses page. Its DELETE refuses
   while a course is still referenced, which double-checks the merge, and it revalidates the
   `ib-courses` tag behind the students' course picker.
5. Prevent a repeat: POST and PATCH return 409 when another course already has the name
   (trimmed, case-insensitive). Add Vitest tests next to the routes, mocking `@/lib/prisma`, as
   in `app/api/admin/universities/**/route.test.ts`. Then make `IBCourse.name` `@unique`
   through a migration file (`prisma migrate diff`, then `prisma migrate deploy`). It has to
   come after the merge, or the migration fails.
6. Remove the retired codes from the 1.2 data files and the handoff file's named groups, and
   check `npx tsx scripts/programs/apply-2027-requirements.ts` still dry-runs with no unknown
   codes.

**Verify:** the duplicate-name query returns no rows and `IBCourse` has 55 rows (62 − 7); no
`StudentCourse` or `ProgramCourseRequirement` row points at a retired code; creating
"Geography" in the admin page returns 409; `prisma migrate status` is up to date; the
verification commands in `MAINT_tasks.md` pass.

**Guardrails:** Never delete a student's course row without the owner's choice. Deleting a
retired option that duplicates a kept one in the same OR group is safe: it means the same
thing.

**Session size:** Small.

---

## Phase 4 — Program refresh for 2027 entry

**Every session follows the same loop:**

1. `--export` each university in the batch.
2. Research 2027 requirements per the [research rules](#research-rules): the
   university-wide IB page first, then program pages.
3. Edit the data files: requirements, `source`, `notes`; normalise degree types (3.2);
   update URLs, including harmless redirects and year-pinned paths.
4. Programs with no subject requirements: confirm "none" explicitly in `notes`.
5. Dry-run. **The owner reviews the diff.** Then `--apply`.
6. Run the link checker for the batch.
7. PR: the data files, plus a summary of what changed (points up or down, subjects
   changed, renamed, discontinued) and what could not be confirmed for 2027.

**Verify, per session:** every program in the batch has `requirementsEntryYear` set;
`count(*)` for the batch's universities is unchanged apart from reported additions; the
Algolia count equals the database count; two changed programs show their new values on
their public pages.

| Task | Batch | Programs | Known issues |
|---|---|---|---|
| 4.1 | Imperial 50, UCL 37, LSE 42 | 129 | UCL blocks scripted requests. Imperial matched 2027 in the spot-check |
| 4.2 | Manchester 68, Edinburgh 50 | 118 | **All Manchester URLs pinned to `/2026/`**; BSc Computer Science changed 38 → 37 |
| 4.3 | Alberta 57, UBC 50, Toronto 40 | 147 | UBC: 47 URLs redirect (`ubc_programs/` → `programs/`). Canada: only 84 of 272 verified |
| 4.4 | McGill 36, Waterloo 45, Western 44 | 125 | Three of the most-saved programs are unverified McGill ones (Food Science, Bioresource Engineering, Education) |
| 4.5 | HKUST 47, HKU 38, NTU 40, NUS 20 | 145 | NTU Aerospace: add Computer Science to the second HL subject group, and find the source of the stored grade 6 |
| 4.6 | Groningen 36, Amsterdam 24, Leiden 23, Erasmus 14, Delft 4, Trinity 58, UCD 25 | 184 | Split in two if it runs long. 48 Dutch programs have no subject requirements. Ireland: CAO 2027 |
| 4.7 | Sydney 41, Melbourne 14, ETH 22, Lausanne 15, EPFL 13, Basel 1, Barcelona 33, UAB 12, Complutense 1 | 152 | Melbourne and Barcelona block scripted requests. Australia: 2027 ATAR conversion |
| 4.8 | Italy 30, Sweden 29, Poland 18, Portugal 11, Czech Rep. 9, Austria 7, Belgium 6, Denmark 5, Israel 4, Estonia 2, Japan 2 | 123 | Bocconi done in 3.4. Jönköping `autumn-2026` URLs. Gdańsk points at 2024/25 pages. **None of** Sweden, Poland, Czech Republic, Austria, Belgium, Denmark, Estonia or Japan is verified |

**The UK sessions (4.1, 4.2) must be finished by mid-December**, ahead of the 13 January
2027 UCAS deadline.

Germany (TUM, 38 programs) and the USA (Georgia Tech, 45) are not in this phase. Their
refresh belongs to phases 7 and 6, because how to model them is the open question.

---

## Phase 5 — Coverage

**Outcome:** Every country with a landing page has enough programs behind it for its
search link to be useful, or the page says plainly that options are limited.

**Why:** A student who reads the Japan page and clicks through to search finds 2
programs. The same pattern holds for Estonia (2), Israel (4), Denmark (5), Belgium (6)
and Austria (7), several of them with real demand.

**Steps:**
1. Research English-taught bachelor's programs open to IB applicants in each country.
   Aim for at least 3 universities per country where they exist. Where a country
   genuinely has few, **update its landing page to say so instead of padding**.
2. Add universities in `/admin/universities` (images go to Storage automatically; never
   base64). Add programs with the tool as `new`, stamped 2027.
3. **France** exists in the `Country` table with no universities and no landing page.
   Check whether students can select it as a preference, and ask the owner whether to add
   coverage or leave it.

| Task | Countries | Demand / programs today |
|---|---|---|
| 5.1 | Austria, Belgium, Denmark | 29/7, 22/6, 22/5 |
| 5.2 | Japan, Estonia, Czech Republic, Israel | 21/2, 9/2, 11/9, 4/4 |

**Verify:** Each country's search link returns the new programs; the Algolia count
matches the database; each landing page's claims match what search returns.

**Session size:** Large each.

---

## Phase 6 — USA

**Outcome:** US programs are represented in a way that is true to how US admissions
work, with more than one university.

**Why:** Coverage is Georgia Tech alone, 45 programs, and **every one of them is stored at
exactly 38 points, none verified**. US universities generally do not publish IB minimums,
so that number looks like a placeholder that matching treats as a real requirement. The
USA is the fifth most wanted country (32 students).

**Part A — research (one session, no code):**
1. How US admissions use the IB: holistic review, the Diploma as a signal of rigour,
   predicted grades, and IB scores used for credit and placement after admission.
2. What IB-related figures US universities officially publish, and where (admissions
   pages, IB credit policies, the Common Data Set). Official sources only.
3. What matching does today with a null `minIBPoints`: read `lib/matching`, including the
   selectivity-tier fallback and the missing-points handling.
4. Options for the model, with their effect on matching and on what students see. At
   least: (a) no points requirement, subject recommendations only, with UI copy
   explaining holistic admission; (b) a typical admitted IB range where one is officially
   published; (c) US programs outside points-based matching. Recommend one.
5. A shortlist of about 10 universities to add, each with what it publishes for IB
   applicants.
6. Where the Georgia Tech numbers came from, if that can be found.

**Deliverable:** `docs/tasks/content-2027/usa-model-decision.md`. **The owner chooses the
model and the universities.**

**Part B — build (one or two sessions):** Apply the model to Georgia Tech so 38 stops
being presented as a published figure. Add the chosen universities with the tool. Align
`app/study-in-usa-with-ib-diploma` with the decision.

**Session size:** One research session, one or two build sessions.

---

## Phase 7 — Germany

**Outcome:** German programs reflect how German admission actually works for IB
students, with more than one university.

**Why:** Coverage is TUM alone: 38 programs with only two distinct point values (36 and
38), all flagged verified in January 2026. It is not clear where those numbers come from.
Germany is the third most wanted country (36 students).

**Part A — research (one session, no code):**
1. **Recognition:** the KMK conditions under which an IB Diploma counts as a German
   university entrance qualification (subject combination, minimum total). Source it from
   the KMK or anabin, not secondary sites.
2. **Grade conversion:** the official IB → German grade formula used for ranking and
   numerus clausus.
3. **Program-level selection:** numerus clausus cut-offs that move each semester,
   aptitude assessments (TUM's own procedure among them), uni-assist versus direct
   application.
4. **Language:** most bachelor's programs are German-taught and need C1 proof. Which
   universities offer English-taught bachelor's programs?
5. **Model options:** general eligibility (subject combination plus minimum) against
   competitiveness (converted grade). What should `minIBPoints` mean for Germany? What do
   the stored 36–38 represent? Recommend one.
6. A shortlist of universities to add, English-taught options first.

**Deliverable:** `docs/tasks/content-2027/germany-model-decision.md`. **The owner chooses.**

**Part B — build (one or two sessions):** Refresh TUM under the chosen model, add the
chosen universities with the tool, and align `app/study-in-germany-with-ib-diploma` with
the decision. It has already had its 2027 pass in 2.2; this is about how it describes
requirements.

**Session size:** One research session, one or two build sessions.
