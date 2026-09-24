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
| 1 | Stop loading the base64 logo | 1.1 | small | Live egress cost on a public page. Code only |
| 2 | Oxford and Cambridge fast lane | 1.2 | medium | UCAS deadline for both is **15 October 2026** |
| 3 | Honest labels | 1.3, 1.4 | small | Trivial, one verification pass |
| 4–6 | Country pages for 2027 | 2.1–2.3 | medium each | Public pages say "2026 intake" today |
| 7 | Requirements overview page | 2.4 | small | Summarises the country pages, so goes after them |
| 8 | Entry year on every program | 3.1 | medium | Schema migration; everything after stamps it |
| 9 | Canonical degree types | 3.2 | small | The refresh tool validates against it |
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

- [ ] 1.1 Stop loading the University of Toronto's base64 logo
- [ ] 1.2 Oxford and Cambridge fast lane
- [ ] 1.3 Correct the false counts and the "Educaton" typo
- [ ] 1.4 Make page dates truthful

Phase 2 — Country pages for the 2027 intake

- [ ] 2.1 English-speaking and Asia-Pacific pages (7)
- [ ] 2.2 Western and Northern Europe pages (7)
- [ ] 2.3 Southern and Central Europe, Israel, Japan pages (8)
- [ ] 2.4 `/ib-university-requirements`

Phase 3 — Refresh groundwork

- [ ] 3.1 Record the entry year a program was checked for
- [ ] 3.2 Canonical degree types
- [ ] 3.3 Refresh tool and link checker
- [ ] 3.4 Broken and renamed programs

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
- [ ] Apply the Oxford and Cambridge changes in the admin UI (1.2)
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
  Edits made in `/admin/programs` sync both on their own.

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
  browser. Do not record them as broken.
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
6. Set the page's review date from 1.4 to the day of the session.
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

### 2.2 — Western and Northern Europe

Netherlands, Belgium, Germany, Switzerland\*, Austria\*, Denmark, Sweden\*.

**Session size:** Medium.

### 2.3 — Southern and Central Europe, Israel, Japan

Spain, Portugal, Italy, Poland, Czech Republic, Estonia, Israel, Japan.

Known issues:
- **Spain:** `comunidad.madrid/servicios/educacion/distrito-unico` returns 404.
- **Czech Republic:** `studyin.cz/plan-your-studies/recognition/` returns 404. The
  page's "March 1, 2025" references are the date a law took effect, not staleness.
- **Italy:** `mur.gov.it` returns 403, probably bot-blocking. Check by hand.

**Session size:** Medium to large; eight pages.

### 2.4 — `/ib-university-requirements`

**Outcome:** The overview page says 2027 and matches the refreshed country pages.

**Files:** `app/ib-university-requirements/page.tsx` (title "(2026)" at lines 19, 35, 44),
`RequirementsContent.tsx:130` ("Updated for 2026 Intake").

**Guardrails:** This page is prerendered and queries production at build time. Build
once to verify; do not loop builds.

**Session size:** Small.

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
  course codes against `IBCourse` and degree types against 3.2. **Never delete**:
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
