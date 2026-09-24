# Oxford and Cambridge — 2027 entry check

**Task:** content 1.2 (`docs/tasks/CONTENT_tasks.md`) · **Checked:** 24 September 2026 ·
**Deadline:** UCAS, 15 October 2026

One row per program: all 46 Oxford and 30 Cambridge programs stored on 24 September 2026. Each
row gives the 2027-entry requirement, what differs from what is stored, the source, and the
program ID. Task 3.1 reads this file to stamp these programs as checked for 2027.

## Summary

| | Programs | Change | Unchanged | Owner check |
|---|---|---|---|---|
| Cambridge | 30 | 30 | 0 | 0 |
| Oxford | 46 | 31 | 15 | 5 (plus one browser pass, below) |

**Cambridge — every row changes.** All 30 course pages say "for entry in 2027" and give the same
minimum offer: **41–42 points, 776 at HL**. Stored values were the top of that range or above it
(42; Mathematics 43; Medicine and Veterinary Medicine 45; Geography empty). All become 41.
Eighteen programs required subjects Cambridge does not, most of them subjects it only recommends.
Law, for example, required English, History and a language at HL 7; Cambridge asks for no
subjects. Land Economy is now
**Environment, Law, and Economics** (a rename: same course, same UCAS code KL41).

**Oxford — mostly corrections.** Eleven programs stored 40 where Oxford asks 39 (Mathematics and
its three joint schools, both Computer Science courses, both Physics courses, Biology,
Biochemistry, Earth Sciences). Seven stored 38 where Oxford asks 39 (Classics, Classics and
English, Classics and Modern Languages, Classical Archaeology and Ancient History, Asian and Middle
Eastern Studies, Philosophy and Modern Languages, Philosophy and Theology). All six History courses stored History
as required; the History faculty only "strongly advises" it. Mathematics AI is accepted alongside
AA for the Mathematics and Computer Science courses. Modern Languages, European and Middle Eastern
Languages, and Classics and Modern Languages expect a language at HL in every combination and
stored none.

## Applying the changes (owner)

1. For each row marked **changed**, open `/admin/programs/<ID>/edit` and make the program match the
   **2027 entry** column. Saving syncs Algolia and the programs cache.
2. The form does not set `requirementsVerified` or `requirementsUpdatedAt`. Leave them: task 3.1
   stamps them from this file.
3. Rows marked **owner check** need a look in a browser first; see the next section.

**Notation.** `39 · MATH-AA HL7` means 39 points and Mathematics AA at HL grade 7 or better.
`(BIO or PHYS) HL6` is one OR group. `;` separates requirements that are all needed. Every
requirement is critical unless marked `(nc)`. `none` means checked, no subject required.
Two named groups stand for long OR groups, entered as one OR group each:

- `{Modern language}` — `FRA-B`, `GER-B`, `ITA-B`, `POR-B`, `RUS-B`, `SPA-B`, `FRA-LIT`,
  `FRA-LIT-A`, `FRA-LL`, `GER-LIT`, `GER-LIT-A`, `GER-LL`, `SPA-LIT`, `SPA-LIT-A`, `SPA-LL`
- `{Modern or classical language}` — all of the above plus `LAT`, `LATIN`, `GREEK`, `GRK`

The duplicate codes (`LAT` and `LATIN`, `FRA-LIT` and `FRA-LIT-A`) are both listed because
students are split between them; see [Found along the way](#found-along-the-way).

## Oxford: what could not be read

`ox.ac.uk` returned 403 to both curl and WebFetch on every page, including the course pages and
Oxford's own [summary table of admissions requirements][ox-summary]. The Oxford rows therefore come
from department, faculty and college pages on other `ox.ac.uk` subdomains. Those are official, but
only three say which entry year they describe (Materials, Fine Art, Theology). Two still describe
2026 entry in places (the AMES faculty FAQ and St Hugh's Modern Languages page).

**One browser pass settles this.** Open the [summary table][ox-summary], compare it with the
Oxford rows, and tick:

- [ ] Oxford rows compared with the ox.ac.uk summary table — date: ______

Until that box is ticked, task 3.1 should stamp only the Oxford rows whose source says 2027
(Materials Science, Philosophy and Theology, Religion and Asian and Middle Eastern Studies,
Theology and Religion), and stamp the rest as 2026-checked.

Rows marked **owner check** need more than the summary table:

- **History of Art** — no reachable page states the requirement. Also check the URL: the stored
  slug is `history-art`, and search results use `history-of-art`.
- **Fine Art** — 38 is confirmed for 2027; whether Visual Arts at HL is still required is not.
- **Classical Archaeology and Ancient History** — the subject rule is not stated on any reachable
  page.
- **Asian and Middle Eastern Studies** — 39 comes from a faculty page that still gives 2026-entry
  dates.
- **Geography** — the only direct source dates from the 2025 cycle.

## Rules used

- **Points** are the published minimum. Cambridge publishes a range, so 41.
- **Grades.** Where a source names a grade for the subject, that grade. Otherwise the lowest the
  course's HL profile allows: 6, since 776, 766 and 666 all let any one HL subject be a 6.
  Cambridge History, for example, is 776 with History required, so `HIST HL6`. This lowers many
  stored 7s; the notes say where a 7 was kept and why.
- **Required only.** Subjects a source calls recommended, highly recommended, strongly advised or
  helpful are not stored; the notes say so.
- **Critical** means required. A requirement with a non-IB alternative (Music: an ABRSM theory
  grade) is stored but not critical.
- **Mathematics** is AA only where the source asks for AA; otherwise AA or AI.
- **Minimum across options.** Where some routes need a subject and others don't (a beginners'
  language, Colleges that differ), nothing is required; the note says what the routes need.

**Not expressible in the data model** and recorded in the notes instead: the HL grade profile
(776, 766, 666), "a 7 in any one of", "two of these three", College-specific requirements,
admissions tests and STEP.

## Oxford (46)

| Program | Result | 2027 entry | Change from stored | Source | Checked | ID |
|---|---|---|---|---|---|---|
| Archaeology and Anthropology | unchanged | 38 · `none` | unchanged | [St Hugh's][sth-archanth] · no year | 2026-09-24 | `cmkr3le5w00037mc2fc7uza3n` |
| Asian and Middle Eastern Studies | changed · owner check | 39 · `none` | Points 38 → 39 | [AMES faculty][ames] · no year | 2026-09-24 | `cmkr3leho00057mc22nhlra58` |
| Biochemistry (Molecular and Cellular) | changed | 39 · `CHEM HL7; (BIO or PHYS or MATH-AA or MATH-AI) SL6` | Points 40 → 39; Subjects `CHEM HL7; (MATH-AA or MATH-AI or BIO or PHYS) HL6 (nc)` → `CHEM HL7; (BIO or PHYS or MATH-AA or MATH-AI) SL6` | [Biochemistry][bioch], [St Hugh's][sth-bioch] · no year | 2026-09-24 | `cmkr3lmdl002f7mc2i4lnr19o` |
| Biology | changed | 39 · `BIO HL6; (CHEM or PHYS or MATH-AA or MATH-AI) HL6` | Points 40 → 39; Subjects `BIO HL7; (CHEM or MATH-AA or MATH-AI or PHYS) HL6 (nc)` → `BIO HL6; (CHEM or PHYS or MATH-AA or MATH-AI) HL6` | [St Hugh's][sth-biology] · no year | 2026-09-24 | `cmkr3ln0f002r7mc2xpkikcba` |
| Chemistry | unchanged | 40 · `CHEM HL7; (MATH-AA or MATH-AI) HL6` | unchanged | [Chemistry][chem] · no year | 2026-09-24 | `cmkr3lnl300337mc2h7tayqs6` |
| Classical Archaeology and Ancient History | changed · owner check | 39 · `none` | Points 38 → 39 | [Classics faculty][classics] · no year; [ox.ac.uk][ox-caah] via search index only | 2026-09-24 | `cmkr3leqp00077mc2fzkq30co` |
| Classics | changed | 39 · `none` | Points 38 → 39 | [Classics faculty][classics], [St Hugh's][sth-classics] · no year | 2026-09-24 | `cmkr3lf1j00097mc2v9vijjwd` |
| Classics and English | changed | 39 · `(ENG-LIT or ENG-LL) HL6` | Points 38 → 39 | [Classics faculty][classics], [English faculty][english] · no year | 2026-09-24 | `cmkr3lfcm000b7mc2a2zxhy7c` |
| Classics and Modern Languages | changed | 39 · `{Modern or classical language} HL6` | Points 38 → 39; Subjects `none` → `{Modern or classical language} HL6` | [Modern Languages faculty][ml-cml] · no year | 2026-09-24 | `cmkr3lfs6000h7mc2xh1uelk3` |
| Computer Science | changed | 39 · `(MATH-AA or MATH-AI) HL7` | Points 40 → 39; Subjects `MATH-AA HL7` → `(MATH-AA or MATH-AI) HL7` | [Computer Science][cs] · no year | 2026-09-24 | `cmkr3lo1p003b7mc2b6ewty4w` |
| Computer Science and Philosophy | changed | 39 · `(MATH-AA or MATH-AI) HL7` | Points 40 → 39; Subjects `MATH-AA HL7` → `(MATH-AA or MATH-AI) HL7` | [Computer Science][cs] · no year | 2026-09-24 | `cmkr3loec003f7mc2kn5usmc5` |
| Earth Sciences (Geology) | changed | 39 · `(MATH-AA or MATH-AI) HL6; (CHEM or PHYS) HL6` | Points 40 → 39; Subjects `(MATH-AA or MATH-AI or PHYS or CHEM) HL7` → `(MATH-AA or MATH-AI) HL6; (CHEM or PHYS) HL6` | [Earth Sciences][earth], [St Hugh's][sth-earth] · no year | 2026-09-24 | `cmkr3lorz003j7mc2u71naqm7` |
| Economics and Management | unchanged | 39 · `(MATH-AA or MATH-AI) HL6` | unchanged | [Economics][econ] · no year | 2026-09-24 | `cmkr3lu60005z7mc2b073xe4q` |
| Engineering Science | unchanged | 40 · `(MATH-AA or MATH-AI) HL7; PHYS HL7` | unchanged | [St Hugh's][sth-engineering] · no year | 2026-09-24 | `cmkr3lpat003t7mc21bfqmwks` |
| English and Modern Languages | unchanged | 38 · `(ENG-LIT or ENG-LL) HL6` | unchanged | [Modern Languages faculty][ml-eml] · no year | 2026-09-24 | `cmkr3lgij000p7mc2hrwiupjd` |
| English Language and Literature | unchanged | 38 · `(ENG-LIT or ENG-LL) HL6` | unchanged | [English faculty][english], [St Hugh's][sth-english] · no year | 2026-09-24 | `cmkr3lg3x000j7mc2ao1gsi9c` |
| European and Middle Eastern Languages | changed | 38 · `{Modern language} HL6` | Subjects `none` → `{Modern language} HL6` | [Modern Languages faculty][ml-emel] · no year | 2026-09-24 | `cmkr3lgxx000v7mc2dprmd158` |
| Fine Art | unchanged · owner check | 38 · `VISUAL-ARTS HL6` | unchanged | [Ruskin School of Art][ruskin] · 2027 | 2026-09-24 | `cmkr3lh78000x7mc2v1uw9t67` |
| Geography | unchanged · owner check | 39 · `none` | unchanged | [Geography][geog] · refers to 2025 | 2026-09-24 | `cmkr3luk900657mc2ycoa2x1f` |
| History | changed | 38 · `none` | Subjects `HIST HL6` → `none` | [History faculty][history] · no year | 2026-09-24 | `cmkr3lhjk00117mc279pvvaa5` |
| History (Ancient and Modern) | changed | 38 · `none` | Subjects `HIST HL6` → `none` | [History faculty][history] · no year | 2026-09-24 | `cmkr3lhwx00157mc244nfy5y4` |
| History and Economics | changed | 38 · `none` | Subjects `HIST HL6; (MATH-AA or MATH-AI) HL6` → `none` | [History faculty][history], [Economics][econ] · no year | 2026-09-24 | `cmkr3ljja001p7mc25o5wujyl` |
| History and English | changed | 38 · `(ENG-LIT or ENG-LL) HL6` | Subjects `HIST HL6; (ENG-LIT or ENG-LL) HL6` → `(ENG-LIT or ENG-LL) HL6` | [History faculty][history] · no year | 2026-09-24 | `cmkr3li9y00197mc2j08ug4ja` |
| History and Modern Languages | changed | 38 · `none` | Subjects `HIST HL6` → `none` | [History faculty][history], [Modern Languages faculty][ml-hml] · no year | 2026-09-24 | `cmkr3lirn001h7mc28i03ye2h` |
| History and Politics | changed | 38 · `none` | Subjects `HIST HL6` → `none` | [History faculty][history] · no year | 2026-09-24 | `cmkr3lj62001l7mc29de2sc2b` |
| History of Art | unchanged · owner check | 38 · `none` | unchanged | none reachable | 2026-09-24 | `cmkr3lk04001x7mc2fbrml90n` |
| Human Sciences | unchanged | 38 · `none` | unchanged | [St Hugh's][sth-humsci] · no year | 2026-09-24 | `cmkr3luvc00677mc2ntipetz0` |
| Law (Jurisprudence) | unchanged | 38 · `none` | unchanged | [St Hugh's][sth-law] · no year | 2026-09-24 | `cmkr3lv6900697mc2sfdierl7` |
| Materials Science | changed | 40 · `(MATH-AA or MATH-AI) HL6; PHYS HL6` | Subjects `(MATH-AA or MATH-AI) HL7; PHYS HL7; CHEM HL6 (nc)` → `(MATH-AA or MATH-AI) HL6; PHYS HL6` | [Materials][materials] · 2027 | 2026-09-24 | `cmkr3lpte00417mc2bkushx85` |
| Mathematics | changed | 39 · `(MATH-AA or MATH-AI) HL7` | Points 40 → 39; Subjects `MATH-AA HL7` → `(MATH-AA or MATH-AI) HL7` | [Mathematical Institute][maths] · no year, updated July 2026 | 2026-09-24 | `cmkr3lqcb004b7mc27865olw3` |
| Mathematics and Computer Science | changed | 39 · `(MATH-AA or MATH-AI) HL7` | Points 40 → 39; Subjects `MATH-AA HL7` → `(MATH-AA or MATH-AI) HL7` | [Mathematical Institute][maths], [St Hugh's][sth-mathscs] · no year | 2026-09-24 | `cmkr3lqp3004f7mc220lvk2j7` |
| Mathematics and Philosophy | changed | 39 · `(MATH-AA or MATH-AI) HL7` | Points 40 → 39; Subjects `MATH-AA HL7` → `(MATH-AA or MATH-AI) HL7` | [Mathematical Institute][maths] · no year | 2026-09-24 | `cmkr3lr20004j7mc2p1l21qd0` |
| Mathematics and Statistics | changed | 39 · `(MATH-AA or MATH-AI) HL7` | Points 40 → 39; Subjects `MATH-AA HL7` → `(MATH-AA or MATH-AI) HL7` | [Mathematical Institute][maths] · no year | 2026-09-24 | `cmkr3lrfp004n7mc2287igzxg` |
| Medicine | changed | 39 · `CHEM HL6; (BIO or PHYS or MATH-AA or MATH-AI) HL6` | Subjects `CHEM HL7; (BIO or PHYS or MATH-AA or MATH-AI) HL7` → `CHEM HL6; (BIO or PHYS or MATH-AA or MATH-AI) HL6` | [Medical Sciences][medsci] · no year | 2026-09-24 | `cmkr3lrqn004r7mc2tmg5ni78` |
| Modern Languages | changed | 38 · `{Modern language} HL6` | Subjects `none` → `{Modern language} HL6` | [Modern Languages faculty][ml-ml] · no year | 2026-09-24 | `cmkr3lkap001z7mc26uwjrhvt` |
| Modern Languages and Linguistics | unchanged | 38 · `none` | unchanged | [Modern Languages faculty][ml-mll] · no year | 2026-09-24 | `cmkr3lklu00217mc2ttufv5vo` |
| Music | changed | 38 · `MUSIC HL6 (nc)` | Subjects `MUSIC HL7` → `MUSIC HL6 (nc)` | [St Hugh's][sth-music] · no year | 2026-09-24 | `cmkr3lkuo00237mc2e6zjbate` |
| Philosophy and Modern Languages | changed | 39 · `none` | Points 38 → 39 | [Modern Languages faculty][ml-pml] · no year | 2026-09-24 | `cmkr3ll7o00277mc2n8mfjmbz` |
| Philosophy and Theology | changed | 39 · `none` | Points 38 → 39 | [Theology and Religion][theology] · 2027 | 2026-09-24 | `cmkr3llin00297mc2eqftvcnu` |
| Philosophy, Politics and Economics | changed | 39 · `none` | Subjects `(MATH-AA or MATH-AI) HL6 (nc)` → `none` | [Economics][econ], [St Hugh's][sth-ppe] · no year | 2026-09-24 | `cmkr3lvha006b7mc247n07fpt` |
| Physics | changed | 39 · `PHYS HL6; (MATH-AA or MATH-AI) HL6` | Points 40 → 39; Subjects `PHYS HL7; (MATH-AA or MATH-AI) HL7` → `PHYS HL6; (MATH-AA or MATH-AI) HL6` | [Physics][physics] · no year | 2026-09-24 | `cmkr3lscf00537mc20g8lkyzp` |
| Physics and Philosophy | changed | 39 · `PHYS HL6; (MATH-AA or MATH-AI) HL6` | Points 40 → 39; Subjects `PHYS HL7; (MATH-AA or MATH-AI) HL7` → `PHYS HL6; (MATH-AA or MATH-AI) HL6` | [Physics][physics] · no year | 2026-09-24 | `cmkr3lssp005b7mc2r08kcaqz` |
| Psychology (Experimental) | changed | 39 · `none` | Subjects `(BIO or CHEM or PHYS or MATH-AA or MATH-AI or PSYCH) HL6` → `none` | [St Hugh's][sth-psychology] · no year | 2026-09-24 | `cmkr3lt94005j7mc229ipzdyd` |
| Psychology, Philosophy and Linguistics | unchanged | 39 · `none` | unchanged | [LMH][lmh-ppl], [St Hugh's][sth-psychology] · no year | 2026-09-24 | `cmkr3ltx2005x7mc2fvdg35mf` |
| Religion and Asian and Middle Eastern Studies | unchanged | 38 · `none` | unchanged | [Theology and Religion][theology] · 2027 | 2026-09-24 | `cmkr3llti002b7mc245qrp7ih` |
| Theology and Religion | unchanged | 38 · `none` | unchanged | [Theology and Religion][theology] · 2027 | 2026-09-24 | `cmkr3lm2m002d7mc20lz86lxq` |

### Oxford notes

- **Archaeology and Anthropology.** No specific subjects required; a mix of arts and sciences is called helpful.
- **Asian and Middle Eastern Studies.** Faculty FAQ: "IB: 39 (including core points) with 666 at HL"; no language needed. The same page still gives 2026-entry decision dates, so confirm 39 on the summary table.
- **Biochemistry (Molecular and Cellular).** "7 in HL Chemistry and 6 in two other relevant subjects at HL or SL". The model can express one of the two; SL is used because an HL course also satisfies an SL requirement.
- **Biology.** Biology and one of Chemistry, Physics or Maths at HL, "with 7 in HL Mathematics or a science". Which subject carries the 7 is not fixed, so each requirement is 6.
- **Chemistry.** Alternative route not modelled: with SL Maths, 776 at HL with 7 in Chemistry and a second HL science, and 7 in SL Maths AA.
- **Classical Archaeology and Ancient History.** 39 is the Classics faculty standard offer and matches the ox.ac.uk course page as indexed by search. No reachable page states the subject rule; none are stored.
- **Classics.** No subjects required. "6s at HL in Latin and Greek if taken" is a conditional the model cannot express.
- **Classics and English.** English Literature or English Language and Literature at HL is required. Latin or Greek is required only for the 3-year version; the 4-year version teaches them from scratch.
- **Classics and Modern Languages.** Every combination expects at least one of its two languages (classical or modern) to A-level/HL; either side may be a beginners' option, not both. Czech and Modern Greek count too but have no IB course code here.
- **Computer Science.** 766 at HL with the 7 in Maths. AA and AI accepted "without preference".
- **Computer Science and Philosophy.** The department gives one IB requirement for all its courses.
- **Earth Sciences (Geology).** Maths plus Chemistry or Physics at HL, 766 overall. The stored single OR group of all four subjects let a student meet it with Chemistry alone.
- **Economics and Management.** Maths at HL, "score 6 or 7".
- **Engineering Science.** 776 with 7s in HL Maths and Physics. Whether AI is accepted is not stated; AA and AI are both kept as stored.
- **English and Modern Languages.** The language can be a beginners' option, so only English is required.
- **European and Middle Eastern Languages.** Every combination expects the European language to A-level/HL; the Middle Eastern language starts from scratch. Czech and Modern Greek count too but have no IB course code here.
- **Fine Art.** The Ruskin's 2027-entry page confirms the standard AAA/38 but names no required subject. The stored Visual Arts requirement is kept until the ox.ac.uk course page confirms or drops it.
- **Geography.** The department FAQ says A*AA (the 39 / 766 tier) and "no required subjects", but its test notes date from 2025.
- **History.** History is "strongly advised … but it is not an absolute requirement".
- **History (Ancient and Modern).** As History; no classical language needed.
- **History and Economics.** History and Maths are both "highly recommended", neither required.
- **History and English.** "You must take English (Language or Literature)"; History is advised, not required.
- **History and Modern Languages.** The language is required unless a beginners' option is chosen, so nothing is required overall.
- **History and Politics.** "There are no specific requirements."
- **History of Art.** No reachable page states the requirement; the department defers to ox.ac.uk. The stored URL slug `history-art` may now be `history-of-art` (search results use the latter).
- **Human Sciences.** Biology or Maths "can be helpful … not required".
- **Law (Jurisprudence).** Law with Law Studies in Europe expects French, German or Spanish at HL for those countries; not modelled.
- **Materials Science.** "766 … with the 7 at HL in any one of Maths, Physics or Chemistry". Maths and Physics at HL are essential; Chemistry is only recommended, at SL if not HL.
- **Mathematics.** 766 with a 7 in HL Maths; AA and AI accepted "without preference".
- **Mathematics and Statistics.** Admission is joint with Mathematics.
- **Medicine.** "7, 6 and 6" at HL with no subject named for the 7, so each requirement is 6. AA and AI accepted.
- **Modern Languages.** Every combination expects at least one language to A-level/HL; a second can be a beginners' option. Czech and Modern Greek count too but have no IB course code here.
- **Modern Languages and Linguistics.** Beginners' options exist, so no language is required overall.
- **Music.** Music at HL "or Music Theory Grade 7 or above"; not critical because of that alternative.
- **Philosophy and Modern Languages.** Beginners' options exist, so no language is required overall.
- **Philosophy, Politics and Economics.** Maths is recommended, "not formally required".
- **Physics.** 766 with "the 7 … in either Physics or Mathematics", so each requirement is 6.
- **Physics and Philosophy.** The department gives one requirement for Physics and MPhysPhil.
- **Psychology (Experimental).** A science or Maths is "highly recommended", not required.

## Cambridge (30)

| Program | Result | 2027 entry | Change from stored | Source | Checked | ID |
|---|---|---|---|---|---|---|
| Anglo-Saxon, Norse, and Celtic, BA (Hons) | changed | 41 · `none` | Points 42 → 41; Subjects `(ENG-LL or ENG-LIT) HL7; HIST HL7` → `none` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/anglo-saxon-norse-celtic-ba-hons) · 2027 | 2026-09-24 | `cmlgf8eri0003jm04l5r6l4m1` |
| Archaeology, BA (Hons) | changed | 41 · `none` | Points 42 → 41; Subjects `(HIST or BUS-MGMT or DIG-SOC or ECON or GEOG or PHIL or ANTHRO) HL7; (BIO HL7 or CHEM HL7 or CS HL7 or DESIGN-TECH HL7 or ESS HL7 or PHYS HL5) (nc)` → `none` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/archaeology-ba-hons) · 2027 | 2026-09-24 | `cmlgfxo650009jm04ldzsbwyb` |
| Architecture, BA (Hons) and MArch | changed | 41 · `none` | Points 42 → 41; Subjects `MATH-AA HL7; PHYS HL7; VISUAL-ARTS HL7` → `none` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/architecture-ba-hons-march) · 2027 | 2026-09-24 | `cmlggitso000pjm04yh6ua3ky` |
| Asian and Middle Eastern Studies, BA (Hons) | changed | 41 · `none` | Points 42 → 41; Subjects `(ENG-LL or ENG-LIT) HL7; HIST HL7 (nc); (ARA-B or GREEK or DUT-B or FRA-B or GER-B or HIN-B or ITA-B or JPN-B or KOR-B or LAT or MAN-B or POR-B or RUS-B or SPA-B) HL7 (nc)` → `none` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/asian-middle-eastern-studies-ba-hons) · 2027 | 2026-09-24 | `cmlggqzvk000vjm043wvr5276` |
| Chemical Engineering and Biotechnology, BA (Hons) and MEng | changed | 41 · `MATH-AA HL6; CHEM HL6; (BIO or PHYS) HL6` | Points 42 → 41; Subjects `MATH-AA HL7; CHEM HL7; (BIO or PHYS) HL7 (nc)` → `MATH-AA HL6; CHEM HL6; (BIO or PHYS) HL6` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/chemical-engineering-biotechnology-ba-hons-meng) · 2027 | 2026-09-24 | `cmlgket8b0001lb043vkpgvez` |
| Classics, BA (Hons) | changed | 41 · `none` | Points 42 → 41; Subjects `LATIN HL7` → `none` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/classics-ba-hons) · 2027 | 2026-09-24 | `cmlgl4smw0008lb04jc2tpdy5` |
| Computer Science, BA (Hons) and MEng | changed | 41 · `MATH-AA HL7` | Points 42 → 41; Subjects `MATH-AA HL7; (CHEM HL7 or PHYS HL5) (nc); CS HL5 (nc)` → `MATH-AA HL7` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/computer-science-ba-hons-meng) · 2027 | 2026-09-24 | `cmlgl9t5g000clb04mtrhejta` |
| Design, BA (Hons) and MDes | changed | 41 · `MATH-AA HL7` | Points 42 → 41 | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/design-ba-hons-mdes) · 2027 | 2026-09-24 | `cmlgld8hq000jlb04jvq7xkau` |
| Economics, BA (Hons) | changed | 41 · `MATH-AA HL6` | Points 42 → 41; Subjects `MATH-AA HL7` → `MATH-AA HL6` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/economics-ba-hons) · 2027 | 2026-09-24 | `cmlgljsxa000nlb04cd3fivvi` |
| Education, BA (Hons) | changed | 41 · `none` | Points 42 → 41; Subjects `(ENG-LL or ENG-LIT) HL7; HIST HL7; (WORLD-REL or ANTHRO or PSYCH or PHIL or GLOB-POL) HL7 (nc); (ARA-B HL7 or GREEK HL7 or DUT-B HL7 or FRA-B HL7 or GER-B HL7 or HIN-B HL5 or ITA-B HL7 or JPN-B HL7 or KOR-B HL7 or LAT HL7 or MAN-B HL7 or POR-B HL7 or RUS-B HL7 or SPA-B HL7) (nc)` → `none` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/education-ba-hons) · 2027 | 2026-09-24 | `cmlglv9zy000rlb04tw6uhrcx` |
| Engineering, BA (Hons) and MEng | changed | 41 · `MATH-AA HL7; PHYS HL6` | Points 42 → 41; Subjects `MATH-AA HL7; PHYS HL7; CHEM HL7` → `MATH-AA HL7; PHYS HL6` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/engineering-ba-hons-meng) · 2027 | 2026-09-24 | `cmlgm00a5001glb04ntpodzqs` |
| English, BA (Hons) | changed | 41 · `(ENG-LIT or ENG-LL) HL6` | Points 42 → 41; Subjects `ENG-LIT HL7; ENG-LL HL7` → `(ENG-LIT or ENG-LL) HL6` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/english-ba-hons) · 2027 | 2026-09-24 | `cmlgmyegg0001le04pty1m6dr` |
| Geography, BA (Hons) | changed | 41 · `none` | Points empty → 41; Subjects `GEO HL7` → `none` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/geography-ba-hons) · 2027 | 2026-09-24 | `cmlgnhqne0006le044p4rrc13` |
| History and Modern Languages, BA (Hons) | changed | 41 · `HIST HL6` | Points 42 → 41; Subjects `HIST HL7; (GER-B or ITA-B or FRA-B or SPA-B or POR-B or RUS-B) HL7 (nc)` → `HIST HL6` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/history-modern-languages-ba-hons) · 2027 | 2026-09-24 | `cmlgp5gcf000ale044kuqi5ce` |
| History and Politics, BA (Hons) | changed | 41 · `HIST HL6` | Points 42 → 41; Subjects `HIST HL7` → `HIST HL6` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/history-politics-ba-hons) · 2027 | 2026-09-24 | `cmlgpbibz000lle04qc8qqtlg` |
| History of Art, BA (Hons) | changed | 41 · `none` | Points 42 → 41; Subjects `HIST HL7; (ENG-LL or ENG-LIT) HL7 (nc); (ARA-B HL7 or GREEK HL7 or DUT-B HL7 or FRA-B HL7 or GER-B HL7 or HIN-B HL7 or ITA-B HL7 or JPN-B HL7 or KOR-B HL7 or LAT SL7 or MAN-B HL7 or POR-B HL7 or RUS-B HL7 or SPA-B HL7) (nc)` → `none` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/history-of-art-ba-hons) · 2027 | 2026-09-24 | `cmlgpghvd000ple04vjatpnd7` |
| History, BA (Hons) | changed | 41 · `HIST HL6` | Points 42 → 41; Subjects `HIST HL7` → `HIST HL6` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/history-ba-hons) · 2027 | 2026-09-24 | `cmlgpj7580019le04dqf23dru` |
| Human, Social, and Political Sciences, BA (Hons) | changed | 41 · `none` | Points 42 → 41; Subjects `(ENG-LL or ENG-LIT) HL7 (nc); HIST HL7 (nc); (ARA-B or GREEK or DUT-B or FRA-B or GER-B or HIN-B or ITA-B or JPN-B or KOR-B or LAT or MAN-B or POR-B or RUS-B or SPA-B) HL7 (nc)` → `none` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/human-social-political-sciences-ba-hons) · 2027 | 2026-09-24 | `cmlgreb460001l804ie5d78ha` |
| Environment, Law, and Economics, BA (Hons) | changed | 41 · `none` | Rename to “Environment, Law, and Economics, BA (Hons)”; URL → `https://www.undergraduate.study.cam.ac.uk/courses/environment-law-economics-ba-hons`; Points 42 → 41; Subjects `MATH-AA HL7; ECON HL7` → `none` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/environment-law-economics-ba-hons) · 2027 | 2026-09-24 | `cmlgri9u4000ll804vw6r8zdx` |
| Law, BA (Hons) | changed | 41 · `none` | Points 42 → 41; Subjects `(ENG-LL or ENG-LIT) HL7; HIST HL7 (nc); (ARA-B HL7 or GREEK HL7 or DUT-B HL7 or FRA-B HL7 or GER-B HL7 or HIN-B HL5 or ITA-B HL7 or JPN-B HL7 or KOR-B HL5 or LAT HL7 or MAN-B HL7 or POR-B HL7 or RUS-B HL7 or SPA-B HL7) (nc)` → `none` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/law-ba-hons) · 2027 | 2026-09-24 | `cmlgrr2ro000ql804k0ohp7my` |
| Linguistics, BA (Hons) | changed | 41 · `none` | Points 42 → 41; Subjects `(ENG-LL or ENG-LIT) HL7` → `none` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/linguistics-ba-hons) · 2027 | 2026-09-24 | `cmlgvpx3r0001l704eurxg7kj` |
| Mathematics, BA (Hons) and MMath | changed | 41 · `MATH-AA HL7` | Points 43 → 41 | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/mathematics-ba-hons-mmath) · 2027 | 2026-09-24 | `cmlgvuc5r0006l70464uevdg7` |
| Medicine, MB and BChir | changed | 41 · `CHEM HL7; (BIO or PHYS or MATH-AA or MATH-AI) HL6` | Points 45 → 41; Subjects `CHEM HL7; (MATH-AA or BIO or PHYS) HL7 (nc)` → `CHEM HL7; (BIO or PHYS or MATH-AA or MATH-AI) HL6` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/medicine-mb-bchir) · 2027, [qualifications][cam-quals] | 2026-09-24 | `cmlgwnrr3000al704y240cakt` |
| Modern and Medieval Languages, BA (Hons) | changed | 41 · `{Modern or classical language} HL6` | Points 42 → 41; Subjects `(ENG-LL or ENG-LIT) HL7 (nc); HIST HL7 (nc); MATH-AA HL7 (nc); (ARA-B HL7 or DUT-B HL7 or FRA-B HL5 or FRA-B HL7 or GER-B HL7 or HIN-B HL7 or ITA-B HL7 or JPN-B HL7 or JPN-B HL7 or KOR-B HL7 or MAN-B HL7 or POR-B HL7 or RUS-B HL7 or SPA-B HL7) (nc)` → `{Modern or classical language} HL6` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/modern-medieval-languages-ba-hons) · 2027 | 2026-09-24 | `cmlhs5fna0001l404wlia8u3g` |
| Music, BA (Hons) | changed | 41 · `MUSIC HL6 (nc)` | Points 42 → 41; Subjects `MUSIC HL7 (nc)` → `MUSIC HL6 (nc)` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/music-ba-hons) · 2027 | 2026-09-24 | `cmlhs7zaq0001jp041pglucnx` |
| Natural Sciences, BA (Hons) and MSci | changed | 41 · `(MATH-AA or MATH-AI) HL6; (BIO or CHEM or PHYS) HL6` | Points 42 → 41; Subjects `MATH-AA HL7 (nc); (BIO or CHEM or PHYS) HL7 (nc)` → `(MATH-AA or MATH-AI) HL6; (BIO or CHEM or PHYS) HL6` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/natural-sciences-ba-hons-msci) · 2027, [qualifications][cam-quals] | 2026-09-24 | `cmlhsbiq70005jp04sde6tiap` |
| Philosophy, BA (Hons) | changed | 41 · `none` | Points 42 → 41; Subjects `MATH-AA HL7; PHIL HL7; (ENG-LL or ENG-LIT) HL7 (nc); HIST HL7; WORLD-REL SL7 (nc)` → `none` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/philosophy-ba-hons) · 2027 | 2026-09-24 | `cmlhsg049000cjp04l5dp54yc` |
| Psychological and Behavioural Sciences, BA (Hons) | changed | 41 · `(MATH-AA or MATH-AI or BIO or CHEM or CS or PHYS) HL6` | Points 42 → 41; Subjects `(MATH-AA or CS or PHYS or BIO or CHEM) HL7 (nc)` → `(MATH-AA or MATH-AI or BIO or CHEM or CS or PHYS) HL6` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/psychological-behavioural-sciences-ba-hons) · 2027, [qualifications][cam-quals] | 2026-09-24 | `cmlhsu9gu000rjp0465ez8mx6` |
| Theology, Religion, and Philosophy of Religion, BA (Hons) | changed | 41 · `none` | Points 42 → 41; Subjects `WORLD-REL HL7 (nc); (ENG-LL or ENG-LIT) HL7 (nc); HIST HL7 (nc)` → `none` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/theology-religion-philosophy-of-religion-ba-hons) · 2027 | 2026-09-24 | `cmlhsxjnu000zjp04qg9wn7uf` |
| Veterinary Medicine, VetMB | changed | 41 · `CHEM HL6; (BIO or PHYS or MATH-AA or MATH-AI) HL6` | Points 45 → 41; Subjects `CHEM HL7; (BIO or MATH-AA or PHYS) HL7` → `CHEM HL6; (BIO or PHYS or MATH-AA or MATH-AI) HL6` | [Course page](https://www.undergraduate.study.cam.ac.uk/courses/veterinary-medicine-vetmb) · 2027 | 2026-09-24 | `cmlht44tg0016jp04ibnspz8a` |

### Cambridge notes

- **Anglo-Saxon, Norse, and Celtic, BA (Hons).** "We don't ask for any specific subjects." The stored English and History were recommendations.
- **Archaeology, BA (Hons).** "We don't ask for any specific subjects."
- **Architecture, BA (Hons) and MArch.** Some Colleges ask for subjects and others do not; Maths, Art and Design and Physics are recommended.
- **Asian and Middle Eastern Studies, BA (Hons).** No subjects required; a European language at HL is required only to combine it with the AMES language.
- **Chemical Engineering and Biotechnology, BA (Hons) and MEng.** Maths (AA), Chemistry, and Biology or Physics at HL.
- **Classics, BA (Hons).** Stored as the 4-year course, which requires no subjects. The 3-year course requires Latin at HL.
- **Computer Science, BA (Hons) and MEng.** "Colleges usually require A* in Mathematics", hence 7. The stored Chemistry/Physics and Computer Science rows were not requirements.
- **Design, BA (Hons) and MDes.** "Mathematics (A* at A level/7 at Higher Level)", Analysis and Approaches.
- **Economics, BA (Hons).** Maths AA at HL; no grade named beyond 776.
- **Education, BA (Hons).** "We don't ask for any specific subjects."
- **Engineering, BA (Hons) and MEng.** Colleges "usually require A* in Mathematics" and "often" 7 in Physics. Chemistry is not required.
- **English, BA (Hons).** HL English Literature, or English Literature and Language "or the equivalent". Stored as two separate required rows, which demanded both.
- **Geography, BA (Hons).** Points were empty. Some Colleges ask for subjects and others do not.
- **History and Modern Languages, BA (Hons).** The language is required only if not taken from scratch (always for French).
- **History of Art, BA (Hons).** No subjects required; Colleges "usually require A*/7 in an essay-based subject or language", which the model cannot express.
- **Human, Social, and Political Sciences, BA (Hons).** "We don't ask for any specific subjects."
- **Environment, Law, and Economics, BA (Hons).** A rename of the same course: the page says "This course was previously called Land Economy" and keeps UCAS code KL41, 3 years. No subjects required; Economics and Maths are recommended.
- **Law, BA (Hons).** "We don't ask for any specific subjects."
- **Linguistics, BA (Hons).** "We don't ask for any specific subjects."
- **Mathematics, BA (Hons) and MMath.** STEP is part of every offer (usually grade 1 in STEP 2 and 3); not modelled.
- **Medicine, MB and BChir.** Colleges "usually require A* in Chemistry". 21 of 28 Colleges want two further sciences or Maths, 7 want one; the minimum is one. Maths AI is considered.
- **Modern and Medieval Languages, BA (Hons).** HL in at least one language to be studied (French, German, Italian, Portuguese, Russian, Spanish, Latin or Classical Greek); French only if held at HL. English, History and Maths were recommendations, and the Asian languages belong to AMES.
- **Music, BA (Hons).** HL Music "or ABRSM Grade 8 Theory at Merit"; not critical because of that alternative.
- **Natural Sciences, BA (Hons) and MSci.** Maths plus two of Biology, Chemistry, Physics; the model can express one. AA is expected for Physical, AI considered for Biological.
- **Philosophy, BA (Hons).** "We don't ask for any specific subjects."
- **Psychological and Behavioural Sciences, BA (Hons).** At least one of Maths, Biology, Chemistry, Computer Science, Physics at HL; Maths AI considered.
- **Theology, Religion, and Philosophy of Religion, BA (Hons).** "We don't ask for any specific subjects."
- **Veterinary Medicine, VetMB.** Chemistry and one of Biology, Maths or Physics at HL; Maths AI considered.

## Sources

All checked 24 September 2026. Cambridge rows link their own course pages.

[cam-quals]: https://www.undergraduate.study.cam.ac.uk/apply/before/accepted-qualifications
[ox-summary]: https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements
[ox-caah]: https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/classical-archaeology-and-ancient-history
[ames]: https://www.orinst.ox.ac.uk/article/applying-undergraduate
[bioch]: https://www.bioch.ox.ac.uk/undergraduate-admissions
[chem]: https://www.chem.ox.ac.uk/admissions
[classics]: https://www.classics.ox.ac.uk/interviews
[cs]: https://www.cs.ox.ac.uk/admissions/undergraduate/why_oxford/offers.html
[earth]: https://www.earth.ox.ac.uk/undergraduate/admissions
[econ]: https://www.economics.ox.ac.uk/undergraduate-admissions-criteria
[english]: https://www.english.ox.ac.uk/faq-undergraduate
[geog]: https://www.geog.ox.ac.uk/study/undergraduate/faq.html
[history]: https://www.history.ox.ac.uk/making-application
[lmh-ppl]: https://www.lmh.ox.ac.uk/study-here/undergraduate/courses/psychology-philosophy-and-linguistics
[materials]: https://www.materials.ox.ac.uk/admissions/undergraduate/admissions-criteria.html
[maths]: https://www.maths.ox.ac.uk/study-here/undergraduate-study/our-offer
[medsci]: https://www.medsci.ox.ac.uk/study/medicine/pre-clinical/requirements/academic
[ml-cml]: https://www.mod-langs.ox.ac.uk/courses/ba-classics-modern-languages
[ml-eml]: https://www.mod-langs.ox.ac.uk/courses/ba-english-modern-languages
[ml-emel]: https://www.mod-langs.ox.ac.uk/courses/ba-european-middle-eastern-languages
[ml-hml]: https://www.mod-langs.ox.ac.uk/courses/ba-history-modern-languages
[ml-ml]: https://www.mod-langs.ox.ac.uk/courses/ba-modern-languages
[ml-mll]: https://www.mod-langs.ox.ac.uk/courses/ba-modern-languages-linguistics
[ml-pml]: https://www.mod-langs.ox.ac.uk/courses/ba-philosophy-modern-languages
[physics]: https://www.physics.ox.ac.uk/study/undergraduates/how-apply
[ruskin]: https://www.rsa.ox.ac.uk/study/undergraduate/applying-to-study-for-a-bfa
[sth-archanth]: https://www.st-hughs.ox.ac.uk/course/archaeology-anthropology/
[sth-bioch]: https://www.st-hughs.ox.ac.uk/course/biochemistry-molecular-and-cellular/
[sth-biology]: https://www.st-hughs.ox.ac.uk/course/biology/
[sth-classics]: https://www.st-hughs.ox.ac.uk/course/classics/
[sth-earth]: https://www.st-hughs.ox.ac.uk/course/earth-sciences-geology/
[sth-engineering]: https://www.st-hughs.ox.ac.uk/course/engineering/
[sth-english]: https://www.st-hughs.ox.ac.uk/course/english-language-literature/
[sth-humsci]: https://www.st-hughs.ox.ac.uk/course/human-sciences/
[sth-law]: https://www.st-hughs.ox.ac.uk/course/law/
[sth-mathscs]: https://www.st-hughs.ox.ac.uk/course/mathematics-computer-sciences-joint-schools/
[sth-music]: https://www.st-hughs.ox.ac.uk/course/music/
[sth-ppe]: https://www.st-hughs.ox.ac.uk/course/philosophy-politics-and-economics-ppe/
[sth-psychology]: https://www.st-hughs.ox.ac.uk/course/psychology/
[theology]: https://www.theology.ox.ac.uk/undergraduate-faqs

## Found along the way

Not changed here; each is a candidate for its own task.

- **Duplicate IB course codes split students.** `GEO`/`GEOG` (6 and 8 students), `DES-TECH`/
  `DESIGN-TECH` (3 and 3), `LAT`/`LATIN`, `GREEK`/`GRK` and the `*-LIT`/`*-LIT-A` pairs are the
  same subjects under two codes. A requirement on one code does not match students who picked
  the other: 55 requirements use `GEOG`, so the 6 students on `GEO` miss them.
- **The Cambridge entry pattern may recur.** Cambridge was entered on 10–11 February 2026 with the
  top of the points range and recommended subjects stored as requirements. Other programs entered
  in February may share both habits; phase 4 should look for them.
- **Some Oxford differences may predate 2027.** Several look like entry errors rather than changes
  for 2027 (the Classics faculty's standard offer of 39, for instance). 2026 pages were not
  checked, so this file does not say which.
