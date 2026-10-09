# USA — how to model US admissions

**Task:** content 6, Part A (`docs/tasks/CONTENT_tasks.md`) · **Researched:** 9 October 2026 ·
**Decides:** the owner. Part B builds what is chosen here.

## Summary

**No US university we checked publishes an IB minimum.** Several say so outright: Georgia Tech ("There is no
minimum IB score needed to apply"), Purdue ("does not have an overall IB minimum score requirement") and Stanford
("there are no courses or minimum scores required"). US admission is holistic. The IB record is read as evidence of
rigour, alongside essays, recommendations and, at many universities, the SAT or ACT. Predicted grades stand in for
results that arrive after decisions. The Common Data Set, where US universities report their admissions figures,
has no IB item at all. IB scores matter mostly *after* admission, for college credit.

**Georgia Tech's 38 is a placeholder.** All 45 programs carry the same 38 points and the same two subject rows
(Maths HL 6, required, and a science HL 6), Applied Language and History included. None were ever checked. They were
entered over 20–23 February 2026, and the admin copy feature carries both the points and the subject rows to each copy
([below](#6-where-georgia-techs-numbers-came-from)). Georgia Tech itself publishes no minimum. Its wording is "to be
competitive, students should have mostly scores of 6 and 7", and HL maths and sciences are "encouraged but not
required". So today, 19 of the 37 students who want the USA are told they fall short of a requirement that does not
exist.

**Recommendation: option (a).** Store no points minimum (`minIBPoints` null) for US programs, with these rules:

- **Subject rows** only where the university says a subject is required.
- **One info chip** that says there is no IB minimum.
- **A "How competitive" paragraph** built from official figures: the Common Data Set admit rate (the international one
  where reported) and the university's own words about IB applicants.

Matching already treats null as "no points requirement". Part B needs a small code change for how null is shown and
searched, and no schema change ([section 4](#4-model-options)).

## Decisions for the owner

| # | Decision | Recommended |
|---|---|---|
| 1 | The model: (a) no minimum, (b) a published typical range, (c) a separate track outside points matching, or (d) the Diploma floor, 24, as France and Denmark | **(a)**, with (b)'s figures in the "How competitive" paragraph ([section 4](#4-model-options)) |
| 2 | What a card says for a program with no minimum | The badge stays requirement-based (owner, 7 October 2026), plus an info chip: **"No IB minimum · holistic admission"** |
| 3 | The "How competitive" figure for US programs, which publish no IB cut-off | The **Common Data Set admit rate** (C1), the international rate where the university reports it, plus the university's own words about IB applicants |
| 4 | Which subject rules become requirement rows | Only what the university calls **required** (Boston University: a year of calculus for Engineering and Business). "Encouraged", "recommended" and "should take" go in the description. The new card status counts any unmet row as missing, whether or not it is critical |
| 5 | Which universities to add | The first ten of the [shortlist](#5-shortlist), or swap in USC or Arizona State |
| 6 | What one stored program is | **One per major**, as Georgia Tech already is, about 15–30 majors per university chosen from the fields US-bound students pick. Not one entry per admitting college |
| 7 | Georgia Tech's **Aerospace Engineering (MS)** | A graduate degree no school leaver can apply to. Rule 3 forbids deleting it without the owner: keep or delete |
| 8 | Medicine and law | No US program to store. Both are graduate-entry, so the country page should say so. Store no "pre-med" or "pre-law" entries; they are preparation tracks, not majors |

## 1. How US admissions use the IB

- **Holistic review, no cut-off.** Universities read the whole application: the school record and its rigour,
  essays, recommendations, activities and, where required, test scores. The Common Data Set's item C7 asks each
  university to rate exactly those factors: rigour of the secondary school record, GPA, test scores, essay,
  recommendations, character and more. Georgia Tech, MIT, Stanford and Purdue state that they have no IB minimum.
  UC states that "UC campuses do not use predicted scores as the only factor for admission".
- **The IB as a signal of rigour.** Georgia Tech lists the IB among "the most rigorous curriculum available at your
  high school". UC's review counts "number of and performance in … International Baccalaureate Higher Level" courses.
  Purdue considers IB students "whether or not you are pursuing the IB diploma", and "higher level (HL) coursework is
  not given a particular preference over standard level (SL)". The Diploma itself is not an entry condition. US
  universities ask for completed secondary school, and the IB Diploma is one way to show it (NYU, Northeastern).
- **Predicted grades.** Decisions come before IB results, so predictions are what is read. Boston University and
  Michigan require them; Georgia Tech "strongly recommends" them; MIT and UC ask for them "if available". NYU emails a
  predictions form to the school counsellor. An offer can be withdrawn if the final results are not "within an
  acceptable range" of the predictions (Northeastern, NYU).
- **Tests.** Policies differ. Georgia Tech, MIT and Harvard require the SAT or ACT. Harvard accepts "IB Actual or
  Predicted Scores" only in exceptional cases. NYU is test-optional "through the 2027-2028 application cycle" and
  accepts IB predictions in place of a test. Northeastern and Arizona State are test-optional too.
- **Credit and placement after admission.** This is where IB scores count as numbers. MIT gives credit for HL 7 only.
  Georgia Tech's catalogue maps each subject and score to courses, mostly from HL 5 and SL 6 (Biology HL from 4). UC
  gives 8 quarter units for each HL 5+, and 6 more for a Diploma of 30 or above. Michigan gives credit for HL only, and Northeastern up to 32 credits. These are the
  "30 points" figures that appear on US pages, and none of them is an admission threshold.
- **Admission by major varies.** Purdue admits "into a specific major". Georgia Tech admits to the Institute: "you do
  not apply to a specific major or college", but it asks for an intended major and reviews "your interest in and
  preparation for" it. NYU and BU set rules per school ("applying to Stern or Tandon", "Applicants to the College of
  Engineering"), so they admit to a school. MIT, Harvard and Stanford admit to the university and majors come later;
  that is general knowledge, not read this session, and Part B confirms it.

## 2. What US universities publish, and where

| Where | What it holds | IB figure? |
|---|---|---|
| Admissions pages for international or IB applicants | Documents, predicted grades, sometimes subject expectations and qualitative guidance ("mostly 6s and 7s", "5-7 on all HL and SL exams") | **None found** as a minimum or typical total |
| School- or major-level requirements | Courses expected for a college (BU Engineering: calculus; Purdue Engineering: chemistry) | Subjects, no points |
| IB credit policy (registrar or catalogue) | Credit per HL/SL score, sometimes a Diploma total for extra credit | Yes, **for credit only** |
| Common Data Set, section C | C1 applicants, admits and enrolled, with an in-state, out-of-state and international breakdown "if available"; C5 high school units; C7 factor ratings; C9 SAT/ACT; C10 class rank; C11–C12 GPA | **No.** "IB" appears only in the glossary, under dual enrolment |
| IB Recognition Statements Database (`recognition.ibo.org`) | The university's own statement to the IB; about 800 US universities' credit policies | Mostly credit. UW–Madison: "no minimum score requirements or subject requirements for any major" |

The only total-points figure found for a US institution was NYU Abu Dhabi's Class of 2023: a median predicted
score of 39, reported in 2019 and read only through the search index. It is one campus abroad, seven years old, and it
describes the admitted class, not a requirement. Georgia
Tech's Common Data Set, as an example of what is usable: for fall 2025, **66,881 first-year applicants and 8,921
admitted (13%)**, of whom **9,758 international applicants and 716 admitted (7%)** (CDS 2025-2026, C1, revised 3 June
2026).

## 3. What matching does today with a null `minIBPoints`

No program stores null today: all 1,387 have a number. Null is nonetheless handled throughout:

| Where | With `minIBPoints` null | File |
|---|---|---|
| Program type | `SUBJECTS_ONLY`, or the same with no rows | `lib/matching/transformers.ts:111` |
| Academic score | Points always met, no shortfall; with no subject rows the score is 1.0 | `lib/matching/academic-matcher.ts:34`, `:178` |
| Penalties and caps | No points penalty and no "points unmet" cap | `lib/matching/unified-penalties.ts:125`, `:209` |
| Card status (rebranding 2.1) | No points chip. "Meets all requirements" if every subject row is met; with no rows, an info chip "No named subjects" | `lib/matching/match-status.ts:150`, `:101` |
| V10 category and fit quality | Treated as 30 points, tier 4 ("Open"). No live screen shows the category | `lib/matching/enhanced-match-result.ts:171`, `lib/matching/categorization.ts:103` |
| Confidence | −0.05 "no published points requirement", and −0.15 more with no subject rows | `lib/matching/confidence.ts:168` |
| Candidate index | Bucket 0, which every student's filter includes | `lib/matching/program-index.ts:209`, `:246` |
| Algolia record | `minimumIBPoints` left out. Records without it fail every numeric filter, so the search page's points filters hide them | `lib/algolia/sync.ts:163`, `lib/algolia/search.ts:222` |
| `/ib-university-requirements` | Its stats read only non-null programs, so a USA with only null programs **drops out of the country table** | `app/ib-university-requirements/page.tsx:161`, `:174` |
| Old cards, university and program pages | The points line is hidden and nothing says why | `components/student/ProgramCard.tsx:539`, `app/universities/[id]/UniversityDetailClient.tsx:260` |
| Refresh tool | Accepts null and validates only a number; the dry run prints "no points" | `scripts/programs/lib/refresh.ts:259` |

**The selectivity tier.** `selectivityTier` is a stored column that nothing reads; only the copy route resets it.
The matcher computes the tier from points, and for null that gives tier 4, the least selective. Only the fit-quality
block reads it, and no live screen shows that.

**In practice:** a US program with null points and no subject rows matches every student fully on academics. It is
then ordered against other fully met programs by country and field. That is true to "no requirement". Without copy
saying so, though, a 26-point student would see MIT as "Meets all requirements" and nothing else. Hence decisions 2
and 3.

## 4. Model options

| | (a) No minimum | (b) Published typical range | (c) Separate track | (d) Diploma floor, 24 |
|---|---|---|---|---|
| `minIBPoints` | null | The published figure, else null | null, plus a new "holistic" flag | 24 |
| True to sources | Yes | Yes, but **no US university publishes a range**, so it never applies | Yes | **No.** The Diploma is not a US entry condition |
| Matching | Points never limit; subject rows still count | As today | A new branch in the matcher | Every Diploma holder meets points |
| Students see | An info chip, the description and a "How competitive" paragraph | A number | A separate label or list | "24 points" |
| Build cost | Small: chip, requirements page, Algolia flag, page copy | None | Schema migration, matcher, UI | None |
| Precedent here | First program with null | Imperial-style typical offers in notes | None | France, Bocconi, Denmark, UTokyo (5.2) |

**Why (a).** It is the only option that states what US universities publish. (b) has nothing to store: its
competitiveness facts fit in the "How competitive" paragraph, as decision 3 proposes. (d) is the cheapest and has
precedent, but in France, Denmark and Italy the Diploma (24) is the legal entry qualification. In the US it is not:
Purdue admits IB students without the Diploma, and Stanford requires "no courses or minimum scores". Storing 24 would
publish an invented number, the same fault as 38. (c)'s only gain over (a) is telling "holistic" apart from "not
researched". A convention does that instead: no program is null today, and the data conventions can say that null
means "the university publishes no minimum", with the source in `sources`. If Japan's or other holistic systems need
more later, (c) can be built on top of (a).

**What Part B builds for (a):**

1. **Code, one PR.**
   - `deriveMatchStatus` adds the info chip when the minimum is null.
   - The program and university pages say "No IB minimum (holistic admission)" instead of hiding the line.
   - `/ib-university-requirements` shows a country whose programs set no minimum.
   - Algolia indexes a `hasMinimumIBPoints` flag, so the search page's points filter can keep those programs, if the
     owner wants them kept.
   - Vitest cases for each.
2. **Georgia Tech.** Refresh it from its starter file under the model:
   - Points null, and **no subject rows**: Georgia Tech requires none of the IB.
   - The two current rows go, with the HL "encouraged" sentence moved into each description.
   - A "How competitive" paragraph from CDS C1.
   - Fix the one redirected link (Applied Language*s* and Intercultural Studies).
   - Report the MS program.
   - Georgia Tech's IB statement names no intake. Its deadlines page lists "2026-2027 Important Dates", the cycle
     whose applications close in October 2026 to January 2027. Rule 2 decides whether that counts as naming 2027 entry.
3. **The chosen universities**, added with `scripts/programs/add-universities.ts`. Each gets an admissions contact
   (data conventions), fields per the 8.1 rule, and `field-inventory.ts` at 0 outliers.
4. **The country page.** `app/study-in-usa-with-ib-diploma/USAContent.tsx:99` claims selective universities'
   applicants "typically present scores of 38–45", with no source; replace it or source it. Add that medicine and law
   are graduate-entry.

## 5. Shortlist

Chosen for what US-bound students want. Of the 37 students who list the USA, the fields are Engineering 14, Business &
Economics 12, Natural Sciences 9, Medicine & Health 8, Law 7, Computer Science 6, Social Sciences 6, Media 6. Their
points run from 24 to 45: 18 have 38 or more, 11 have 36–37, and 8 have less. Six want only the USA. The list mixes
the most-asked-about universities with large engineering and business schools, and one accessible option. Every IB
statement below was read on the university's own page on 9 October 2026.

| # | University | Admits to | What it publishes for IB applicants | Requirement rows it supports |
|---|---|---|---|---|
| 1 | **Massachusetts Institute of Technology** (Cambridge, MA) | The Institute; majors later | No required high school classes; the transcript should show IB results, with predicted grades "if available"; SAT or ACT required, "no cutoff". Credit for HL 7 only | None |
| 2 | **Harvard University** (Cambridge, MA) | The College; concentrations later | SAT or ACT required. "IB Actual or Predicted Scores" can meet the test requirement only in exceptional cases | None |
| 3 | **Stanford University** (Stanford, CA) | The university; majors later | "There are no courses or minimum scores required to secure admission". Recommends the coursework for a bachelor's in the home country; a secondary diploma by enrolment | None |
| 4 | **University of California, Berkeley** | A college; some majors capped | UC-wide: finish secondary school and be "eligible to enter a competitive university" at home; enter predicted IB scores if released, though they are never "the only factor"; IB HL courses count in review. Credit: HL 5+ 8 quarter units, Diploma 30+ 6 more | None UC-wide; campus and major rules checked in Part B |
| 5 | **University of California, Los Angeles** | As Berkeley | As Berkeley (one UC application) | As Berkeley |
| 6 | **University of Michigan** (Ann Arbor) | A school or college | "Predicted IB results are needed if exams have not yet been taken"; credit for HL only. Its page refuses scripts; read from the Internet Archive's 14 April 2026 copy | None found |
| 7 | **Purdue University** (West Lafayette, IN) | **A specific major** | "Purdue does not have an overall IB minimum score requirement"; Diploma not needed; HL not preferred over SL; predicted scores if available | Engineering: chemistry "expected". Nursing, pharmacy and veterinary nursing: biology and chemistry |
| 8 | **New York University** | A school (Stern, Tandon, Arts & Science…) | Test-optional through the 2027-2028 cycle; IB predictions or results can be the test. Stern and Tandon applicants "should take" Maths AA HL or SL, or Maths AI HL | Recommendation only ("should take"), so description |
| 9 | **Boston University** | A school or college | Predicted results "required" for IB students | Engineering and Questrom (business): a year of calculus is **required**, met by Maths AA HL or SL, or Maths AI HL |
| 10 | **Northeastern University** (Boston) | A college and major | Test-optional; predicted grades "highly recommended"; an offer can be rescinded if results fall outside "an acceptable range"; up to 32 credits | None found |
| — | *Alternate:* **University of Southern California** (Los Angeles) | A school | "We typically expect the full IB Diploma Programme, with strong academic performance (scores of 5-7 on all HL and SL exams)" | None. Its sentence suits the "How competitive" paragraph |
| — | *Alternate:* **Arizona State University** (Tempe) | A college | A formula, not holistic: a 3.00 GPA from secondary school, three years of coursework and a completed diploma; test-optional; no IB-specific rule | None. The one accessible option, for students below the mid-30s |

The "Admits to" column comes from the universities' own pages for Georgia Tech, Purdue, NYU and Boston University.
For the others it is general knowledge, which Part B confirms. UC Berkeley and UCLA are two entries because students
choose the campus. Their rules are UC's, with campus and major additions. Most of these universities publish a Common Data Set, but whether C1 gives the international breakdown
differs: Part B checks each.

## 6. Where Georgia Tech's numbers came from

There is no seed script, data file or note for Georgia Tech before the 8.1 export of 7 October 2026. The database
shows:

- The university row was created on 20 February 2026 at 15:27 UTC.
- The first program, **Aerospace Engineering (BS)**, was created on 20 February 2026 at 15:36. The other 44 followed
  on 22 February (15) and 23 February (29).
- All 45 programs have identical points (38) and identical subject rows. None has ever been checked:
  `requirementsVerified` is false and the entry year is null.
- `app/api/admin/programs/[id]/copy/route.ts` copies `minIBPoints` and every subject row to the new program.

The likeliest origin is the first program's values, carried to each copy and never changed. That fits a Maths HL 6
rule on Applied Language and History, which no Georgia Tech source supports. Georgia Tech's own pages give no 38 and
no subject rule for the IB. One student has saved a Georgia Tech program.

## Found along the way

- **Precompute writes a cache nothing reads.** `POST /api/students/matches/precompute` runs after a profile save. It
  fills the legacy `getCachedMatches` cache, while `/api/students/matches` reads the V10 cache under a different key
  (`lib/matching/cache.ts:274`). Its Algolia pre-filter would also drop null-points programs
  (`lib/algolia/search.ts:87`, `minimumIBPoints = 0` never matches a missing attribute). It does not affect live
  matches; worth a MAINT task.
- **Demand moved:** 37 students list the USA, up from 32 at the 24 September audit.
- `www.commondataset.org` and `admissions.umich.edu` refuse scripts (403). Georgia Tech's filled-in CDS shows the
  2025-2026 template's items. Michigan's page was read from the Internet Archive.

## Sources

All read on 9 October 2026 unless noted.

- Georgia Tech: [international first-year admission](https://admission.gatech.edu/international/first-year),
  [standardized tests](https://admission.gatech.edu/first-year/standardized-tests),
  [academic preparation](https://admission.gatech.edu/first-year/academic-preparation),
  [major selection](https://admission.gatech.edu/first-year/major-selection),
  [deadlines](https://admission.gatech.edu/first-year/deadlines),
  [IB credit](https://catalog.gatech.edu/academics/undergraduate/credit-tests-scores/international-baccalaureate-exams/),
  [Common Data Set 2025-2026](https://irp.gatech.edu/sites/default/files/CDS/CDS_2025-2026_FINAL_R4_03JUN2026.pdf)
  (revised 3 June 2026)
- MIT: [international applicants](https://mitadmissions.org/apply/firstyear/international/),
  [tests and scores](https://mitadmissions.org/apply/firstyear/tests-scores/),
  [international examinations credit](https://firstyear.mit.edu/academics-exploration/ap-transfer-credit/international-examinations/)
- Harvard: [international applicants](https://college.harvard.edu/admissions/apply/international-applicants)
- Stanford: [international applicants](https://admission.stanford.edu/apply/international/index.html)
- University of California: [first year, by country](https://admission.universityofcalifornia.edu/admission-requirements/international-applicants/applying-for-admission/freshman-requirements-country.html),
  [IB credits](https://admission.universityofcalifornia.edu/admission-requirements/ap-exam-credits/ib-credits.html),
  [how applications are reviewed](https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/how-applications-are-reviewed.html)
- Michigan: [requirements by country](https://admissions.umich.edu/apply/international-applicants/requirements-deadlines/requirements-country)
  (Internet Archive copy of 14 April 2026)
- Purdue: [international curriculum requirements](https://admissions.purdue.edu/become-student/international/),
  [high school course requirements](https://admissions.purdue.edu/become-student/course-requirements/)
- NYU: [standardized tests](https://www.nyu.edu/admissions/undergraduate-admissions/how-to-apply/standardized-tests.html),
  [international applicants](https://www.nyu.edu/admissions/undergraduate-admissions/how-to-apply/international-applicants.html)
- Boston University: [international applicants](https://www.bu.edu/admissions/apply/international/)
- Northeastern: [international applicants](https://admissions.northeastern.edu/application-information/international-applicants/)
- USC: [academic expectations for international students](https://admission.usc.edu/academic-expectations-for-international-students/)
- Arizona State: [international first-year admission](https://admission.asu.edu/apply/international/first-year)
- IB: [Recognition Statements Database](https://recognition.ibo.org/) (UW–Madison's statement), through the search
  index: `ibo.org` refuses scripts
- Common Data Set: [template collection](https://commondataset.org/), read through Georgia Tech's filled-in 2025-2026 copy
- EducationUSA: [What is a graduate student?](https://educationusa.state.gov/your-5-steps-us-study/research-your-options/graduate/what-graduate-student)
  (law and medicine are professional programs after a bachelor's degree)
