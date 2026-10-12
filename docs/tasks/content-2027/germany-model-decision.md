# Germany — how to model German admissions

**Task:** content 7, Part A (`docs/tasks/CONTENT_tasks.md`) · **Researched:** 12 October 2026 ·
**Decided:** by the owner on 12 October 2026, all as recommended (below). Part B builds it.

## Summary

**Germany has a legal minimum, and it is not 36 or 38.** An IB Diploma is a German university entrance
qualification (*Hochschulzugangsberechtigung*, HZB) when it meets the KMK's IB agreement (1986, as amended
15 June 2023). The conditions are a subject combination, at least grade 4 in all six subjects (one 3 can be
offset), and so at least 24 points. That is the same for every programme and every university. Above it,
each programme decides:

- **Open admission:** 70.7% of German bachelor's programmes (HRK, winter 2025/26). Every qualified applicant
  gets a place.
- **Ranking by grade (local numerus clausus):** the IB total is converted to a German grade with the KMK's
  formula, and the cut-off moves each semester.
- **Aptitude procedures:** TUM's is a published points formula over the converted grade and named subject
  grades, with an interview or test for the middle band.

**One KMK rule decides more than any number: maths at HL.** Maths AA or AI at SL gives access only to
subjects outside mathematics, science and engineering (MINT), unless the school is on the KMK's list of 348
schools. Of the 41 students who list Germany, 28 pick Natural Sciences, Engineering or Computer Science, and
only 14 of those take maths at HL.

**TUM's 36 and 38 are field templates.** They come from a January 2026 seeding guide
(`docs/countries/germany-ib-requirements.md`, commit `fe15f2d`, since deleted). It told the AI that seeded the
programmes to "use field-specific recommended `minIBPoints`" when no NC was given: Engineering 38, Natural
Sciences 36, and so on. TUM publishes no such figure. The same guide made **German B HL 5 "MANDATORY" on all
38 programmes**. TUM's rule is different: German A at HL proves German, and German B HL counts only for
Aerospace and Information Engineering. Five stored programmes need no German at all (Management and Data
Science, Sustainable Management and Technology, Bioeconomy and the two Singapore joint degrees). Today only 5
of the 41 Germany-bound students can meet that row.

**Recommendation: model (a), the KMK floor.** Store `minIBPoints` 24 for German programmes, as for the 292
programmes already at the Diploma floor (France, Denmark, Italy). Add requirement rows only for what is
genuinely required: maths at HL for MINT programmes, the KMK's science and social science, and German where a
university accepts an IB course as proof. Then add a closing paragraph saying how the programme selects.

## Decisions for the owner

**Owner, 12 October 2026: all nine as recommended.** Two points stay open by design. Decision 3's borderline
programmes (Architecture, Landscape Architecture, Health Science, Nutrition, science teaching) come to the owner
with Part B's dry run. Decision 4 made no recommendation for ETH and Lausanne, so they stay as they are until
Switzerland's next refresh.

**As built (Part B1, 12 October 2026):**

- **Decision 3** follows the Bavarian recognition office's IB sheet (March 2026), which lists the subjects that need maths HL. Six
  TUM programs it does not name go to the owner with the dry run.
- **Decision 7.** Bioeconomics is not added: TUM's page says "New applications are only possible for Bioeconomy". Stored Geodesy and
  Geoinformation is closed the same way, replaced by Geodesy and Earth Observation, and reported as discontinued.
- **Decision 6 (Part B2).** Constructor and Bard College Berlin publish no minimum and admit holistically, so they follow the content 6
  convention (no IB minimum) rather than the KMK's 24. This is for the owner to confirm with B2's dry run.

| # | Decision | Recommended, and chosen |
|---|---|---|
| 1 | The model: (a) the KMK floor, 24, with rows and a selection paragraph; (b) a converted cut-off or aptitude threshold as the minimum; (c) no minimum (null), as for the USA; (d) keep 36/38 | **(a)** ([section 4](#4-model-options)) |
| 2 | Which KMK conditions become requirement rows | **Maths AA or AI at HL, grade 4, critical**, on every maths, science and engineering programme. **A KMK science** (Biology, Chemistry or Physics) and **a KMK social science** (the agreement's eight), each SL 4 and critical, on every programme that admits on the KMK rules. The HL rule, the grade-3 offset, the language pair and the school exception list go in notes ([section 1](#1-recognition-the-kmk-agreement)) |
| 3 | Where MINT ends | The KMK names no list; recognition decides per application. Part B files each programme. Engineering, Natural Sciences and Computer Science get the maths row. Architecture, Landscape Architecture, Health Science, Nutrition and science teaching go to the owner with the dry run |
| 4 | German for German-taught programmes | **A critical row with the IB courses the university accepts** (TUM: German A, either course, at HL), and the other routes in the description: DSH-2, TestDaF 4 in all four parts, telc C1 Hochschule, Goethe C2. For Aerospace and Information Engineering, German A HL *or* German B HL, **not critical**, because TUM also takes A2 certificates there. ETH and Lausanne store no German or French row today: align them or leave them |
| 5 | How TUM's aptitude assessment is shown | A closing **"How TUM decides"** paragraph: the statute's weights and thresholds, and one worked IB example labelled as calculated from the statute ([section 2](#2-tum-today)). Never as `minIBPoints`. The alternative is the same paragraph without the example |
| 6 | Which universities to add | English-taught first: **Constructor University, Leuphana, Rhine-Waal University of Applied Sciences, Freiburg (Liberal Arts and Sciences), WHU, Bard College Berlin** ([section 5](#5-shortlist)). Frankfurt School as an alternate. No German-taught flagships (LMU, Heidelberg, RWTH, KIT) yet: they need C1 German, and 1 of the 41 students holds German A at HL |
| 7 | TUM programmes the database lacks | Add **Geodesy and Earth Observation** and **Sustainable Engineering for Materials and Processes** (both English), **Mechanical Engineering** and **Sport Science** (German; Sport Science partly English), and **Bioeconomics** (German). Leave out the four TUM marks as discontinued |
| 8 | The two joint degrees with the Singapore Institute of Technology (SIT) | They are taught in Singapore and admitted by SIT through its own portal, aimed at Singapore polytechnic and A-level applicants. **Move them to Singapore** under a new SIT university entry, or delete them. Nobody has saved either |
| 9 | Medicine and law | Both are German-taught state-examination degrees needing C1 German; medicine is allocated through hochschulstart. **Not in this phase.** 7 of the 41 students pick Medicine & Health, 4 pick Law. The country page already explains medicine |

## 1. Recognition: the KMK agreement

The KMK's "Agreement on the Recognition of the International Baccalaureate Diploma" (10 March 1986, as
amended 15 June 2023; appendices as at 26 March and 22 May 2026) sets the conditions. The English text is an
"unofficial translation"; where they differ, the German original is quoted here.

- **Twelve years** of full-time schooling.
- **Six subjects**, including: two languages at level A or B, at least one of them a "continued foreign
  language" as Language A or Language B HL; one natural science (Biology, Chemistry, Physics); maths (AA or AI);
  and one social science (History, Geography, Economics, Psychology, Philosophy, Social and Cultural
  Anthropology, Business Management, Global Politics). The sixth may be another of these or one of a listed
  set: the arts, another language, Computer Science, ESS, Design Technology, SEHS, Digital Society and others.
  **ESS, Computer Science or SEHS cannot be the only science**, and **Digital Society or World Religions cannot be
  the only social science**.
- **One of the three HL subjects** must be a language, maths or Biology, Chemistry or Physics (from the 2025
  exams).
- **Grade 4 or better in all six.** One 3 can be offset by a 5 in another subject at the same or a higher level,
  with at least 24 points in total. In effect the minimum is 24.
- **Maths at SL** (from the 2021 exams): "only a subject-restricted university entrance qualification for
  universities of applied sciences and universities, for subjects not in the mathematical, scientific or
  technical field". The English translation says "technical universities", which mistranslates
  *Fachhochschulen*. Exception: the schools in Appendix 1 (314 school codes) and the bilingual-IB (GIB) schools
  in Appendix 2 (34).
- **Otherwise:** the Feststellungsprüfung, prepared at a Studienkolleg, or a year of university study abroad.
  The Germany page already says so.

**How many students it affects.** Of the 41 students who list Germany: 17 take maths at HL, 37 a KMK science,
36 a KMK social science, and 38 have no grade below 4. 23 have 38 points or more, 7 have 36–37, 9 have 32–35,
and 2 have fewer. 4 want only Germany. Demand rose from 36 at the 24 September audit.

### Grade conversion

The agreement's section 3 converts the IB total to the German grade that ranking uses:
**N = 1 + 3 × (42 − P) / (42 − 24)**, bonus points included, with 42 to 45 equal to 1.0. The KMK's general
agreement on overall grades (1991, as amended) says the grade is set to one decimal and "not rounded".
Truncated, that gives:

| IB | 45–42 | 41 | 40 | 39 | 38 | 37 | 36 | 35 | 34 | 33 | 32 | 30 | 28 | 26 | 24 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| German grade | 1.0 | 1.1 | 1.3 | 1.5 | 1.6 | 1.8 | 2.0 | 2.1 | 2.3 | 2.5 | 2.6 | 3.0 | 3.3 | 3.6 | 4.0 |

Read backwards, a published cut-off needs the lowest total whose grade is that good or better: 1.3 needs 40,
2.0 needs 36, and 1.2 needs 41, as no total gives 1.2. The Germany page gives the formula but not the truncation.
Applicants get the converted grade in a uni-assist VPD (preliminary documentation), which TUM requires from
every IB applicant without a recognition notice.

### Selection, by programme

| How a programme admits | What decides | Figure to publish | Share (HRK, winter 2025/26) |
|---|---|---|---|
| **Open admission** (*zulassungsfrei*) | The HZB alone (and language proof) | None: every qualified applicant is admitted | 70.7% of bachelor's programmes |
| **Local NC** (*örtlich zulassungsbeschränkt*) | Ranking by converted grade, often with other criteria; places through hochschulstart's DoSV or the university | Last cut-off (*Auswahlgrenze*), per semester, where the university publishes it | 2,355 undergraduate programmes; 29.8% of undergraduate programmes are restricted in all |
| **Aptitude procedure** (TUM's *Eignungsfeststellungsverfahren*) | A points formula over the converted grade and named subject grades; interview or test for the middle band; no fixed number of places | The statute's thresholds, in TUM's own points | Counted with "selection/aptitude test" |
| **Central procedure** | Medicine, dentistry, veterinary medicine, pharmacy through hochschulstart | National cut-offs per quota | Four subjects |

**EU and EEA citizens apply exactly as Germans do.** For other applicants, hochschulstart says the way to a
state university is "as a rule" through uni-assist or direct to the university, and that universities may
admit them once a year with **15 January** as the only deadline. Freiburg's Liberal Arts and Sciences, for
example, gives non-EU citizens a quota of 20% of places outside its selection procedure.

### Language

The KMK (1995, as amended 16 December 2020) requires German proof for study at a German university. It
accepts DSD II, DSH-2, TestDaF 4 in all four parts, the Feststellungsprüfung, Goethe C2 and a short list of
foreign school certificates. **The only IB on that list is the bilingual GIB.** An ordinary IB with German A
or B is proof only where a university says so:

- **TUM:** "German A (Higher Level)"; for Aerospace and Information Engineering, "German B (Higher Level)"
  too, as well as A2-level certificates.
- **English-taught programmes need no German** at most universities: Leuphana ("no German required"),
  Rhine-Waal, Constructor.
- **Mannheim:** C1 German for every bachelor's, even those with many English courses.
- **Supply is small.** 439 of Germany's 11,767 undergraduate programmes (3.7%) are taught mainly in English
  (HRK, winter 2025/26).

## 2. TUM today

All 38 stored TUM programmes were seeded on 23 January 2026 and flagged verified for 2026. They split into four
admission types, which TUM's pages name in their key data (read 12 October 2026):

| Admission | Programmes | Language |
|---|---|---|
| **Open** (14) | Agricultural and Horticultural Sciences, Brewing and Beverage Technology, Chemical Biotechnology, Civil Engineering, Electrical Engineering and Information Technology, Engineering and Materials Science (applied for at Salzburg), Environmental Engineering, Food Technology, Forest Science, Geodesy and Geoinformation, Geosciences, Pharmaceutical Bioprocess Engineering, Physics, Teaching (Scientific Education) | German |
| **Aptitude assessment** (16) | Aerospace, Architecture, Biochemistry, Chemical Engineering, Engineering Science, Health Science, Informatics, Information Engineering (Heilbronn), Information Systems, Landscape Architecture, Life Sciences Nutrition, Management and Data Science (Heilbronn), Management and Technology (Munich), Molecular Biotechnology, Political Science, Sustainable Management and Technology (Straubing) | German, except: **Aerospace** and **Information Engineering** (English, with German at A2 level), **Management and Data Science** and **Sustainable Management and Technology** (English), **Management and Technology** (German or English; one specialisation fully English) |
| **Aptitude recommendation** (SOV) (5) | Bioeconomy (Straubing), Chemistry, Food Chemistry, Life Sciences Biology, Mathematics. Applicants "are either immediately admitted or invited to a mandatory interview" | German, except **Bioeconomy** (mainly English) |
| **Elsewhere** (3) | Bioinformatics (NC, applied for at LMU); the two SIT joint degrees (applied for at SIT, Singapore) | German; English |

**The aptitude formula.** Each statute scores the first stage out of 100:

- **The HZB grade** becomes points, 120 − 20 × grade (a 1.0 is 100, a 4.0 is 40).
- **Named subject grades** are averaged with weights and put on the same scale. An IB 7 is 100 and a 4 is 40,
  under Annex 2 formula 3.
- **The two are weighted**, usually 65:35 or 50:50, plus up to 4–6 extra points for internships or competitions.

At or above the pass mark an applicant is admitted; at or below the reject mark, refused; in between, an
interview or a test. Where a weighted subject has no grade on the certificate, the first stage cannot admit outright.
For Informatics that subject is German, so an IB student without German always goes to the second stage.

Worked through for an IB student (**calculated here from the statutes, not published by TUM**; converted
grade truncated as above, no extra points):

| Programme | Weighted subjects | Pass / reject | With 6s in them: passes from / refused up to | With 7s: passes from |
|---|---|---|---|---|
| Aerospace | Maths ×3, a science or CS ×2, English ×1; 50:50 | 80 / 70 | 36 / 30 | 30 |
| Information Engineering | Maths ×3, English ×1, best science or CS ×1; 65:35 | 73 / 59 | 32 / 25 | 29 |
| Management and Data Science | Maths ×2, CS or best science ×2, English ×1; 65:35 | 88 / 66 | 40 / 29 | 37 |
| Management and Technology | Maths ×2, CS or best science ×2, German or English ×1; 65:35 | 88 / 66 | 40 / 29 | 37 |
| Sustainable Management and Technology | Maths ×2, best science ×2, English ×1; 65:35 | 88 / 66 | 40 / 29 | 37 |
| Informatics (German-taught, for comparison) | Maths ×3, German ×1, English ×1, science or CS ×2; 65:35 | 84 / 72 | 38 / 31 | 34 |

So TUM has real thresholds, but they depend on subject grades as much as on the total, and the middle band can
still get in. No single IB total states them, which is why decision 5 puts them in words.

**What else TUM's catalogue shows** (its search for "bachelor" returns 161 programme pages, master's
included):

- **Not stored, still offered:** Geodesy and Earth Observation (English, SOV), Sustainable Engineering for
  Materials and Processes (English, SOV), Mechanical Engineering (German, aptitude assessment), Sport Science
  (German and English, aptitude assessment), Bioeconomics (German, open).
- **Discontinued:** Informatics: Games Engineering, Biogenic Materials, Technology of Biogenic Resources, and
  Management and Technology at Heilbronn ("as of winter semester 2024/25 ... no longer possible to newly
  enroll").
- **Stored ones are all still offered.**
- **No intake named.** The application period is 15 May to 15 July with no year, so rule 2 stamps 2026 unless
  a TUM dates page names winter semester 2027/28.

**Engineering and Materials Science** is a joint degree with the University of Salzburg: applications and
enrolment go through Salzburg, so Austria's rules, not the KMK's, decide entry. Its main locations are
Salzburg and Munich, so by 8.2's rule it shows Munich.

## 3. Where the stored numbers came from, and what they do

- **Origin.** `scripts/programs/seed-tum-programs.ts` (commit `fe15f2d`, 27 January 2026) names its source:
  `docs/countries/germany-ib-requirements.md`. That guide gave every field a template, for example Engineering
  38 with Maths HL 5, Physics HL 5 and German B HL 5, all critical. Its rule 4 reads: "No NC specified → Use
  field-specific recommended `minIBPoints`".
- **The data matches the templates.** The points follow the template of the field each programme was seeded
  under for 36 of the 38: Engineering, Computer Science, Architecture and Environmental Studies 38; Natural
  Sciences, Business and Education 36. Health Science (Medicine & Health template: 42) and Political Science
  (Social Sciences: 34) got 36. Every programme carries the German B HL 5 row and an English A row at SL 4, not
  critical.
- **What the guide got right:** the KMK formula, the 24 minimum, and the maths-HL rule for STEM. It never wired
  the maths rule to the data as a KMK requirement, though: it appears only as the template's HL 5.
- **The effect today.** 5 of the 41 Germany-bound students have German B HL 5 or better. A student without
  German B is "missing a critical subject" at all 38 programmes, which caps the score at 0.45; German B at SL,
  or below 5, counts as a shortfall. That covers the English-taught programmes too, and the one student with
  German A HL, which TUM accepts and the row does not.
- **Unrelated to German admission:** the Maths HL 5 and Physics HL 5. TUM's aptitude statutes weight these
  subjects but set no minimum grade in them.

## 4. Model options

| | (a) KMK floor, 24 | (b) Converted threshold | (c) No minimum (null) | (d) Keep 36/38 |
|---|---|---|---|---|
| `minIBPoints` | 24 | A cut-off or aptitude threshold in IB points | null | 36/38 |
| True to sources | **Yes.** The KMK's minimum, the same everywhere | Only where an NC cut-off is published; TUM's depend on subject grades too | **No.** Germany has a legal minimum; null means "publishes none, admits holistically" | **No.** Field templates |
| Matching | Points met by any Diploma; rows decide (maths HL, science, social science, German) | Excludes applicants a waiting quota, the middle band or a second stage would admit | As (a), but cards say "holistic admission", which is wrong | As today |
| Students see | 24, the rows, and a paragraph on how the programme selects | A number that moves each semester | "No IB minimum · holistic admission" | Unsourced numbers |
| Build cost | Data only | Data, refreshed each semester | Data | None |
| Precedent | 292 programmes at 24 (France, Denmark, Italy, Belgium…) | Imperial-style typical offers live in notes, never in the minimum | The USA | None |

**Why (a).** It is the only option that stores what Germany publishes: one national minimum, then a selection
step per programme.

- **(b)'s figures still have a place**, in the paragraph, as the "How competitive" rule already asks for
  ranked programmes. Cut-offs are converted with the KMK's own formula, so the IB figure is official.
- **(c) would be false.** Its chip says "holistic admission".
- **(d) is the fault this task found.**

**What matching does under (a).**

- **Points.** A student with 24 or more meets them.
- **The maths HL row.** A student with maths SL gets the chip "· you SL" (`match-status.ts`). Matching scores
  that as a near miss and caps the score at 0.8 (`unified-penalties.ts`), but in Germany it is an outright bar.
  The model has no "absolute" flag. If the owner wants one, it is a MAINT task, not part of this phase.
- **A missing critical row** (no KMK science, no German A HL for a German-taught programme) caps the score at
  0.45.
- **Not modelled**, as known limitations in notes: the HL rule, the grade-3 offset, the language pair and the
  school exception list, like Graz's and Italy's profile rules.

**What Part B builds for (a).**

1. **TUM.** Refresh from `scripts/programs/2027/technical-university-of-munich.ts`, edited in place (keep the
   8.1 note and the campus comments):
   - 24 points.
   - Drop the template rows. Add the KMK rows (decision 2) and the German row (decision 4).
   - Add the "How TUM decides" paragraph, or for Bioinformatics a "How competitive" one if LMU publishes a
     cut-off.
   - Sources: the programme page and its statute.
   - Add decision 7's programmes and act on decision 8.
   - Store English names; `field-inventory.ts` at 0 outliers.
2. **The chosen universities** with `add-universities.ts`: admissions contacts, fields per the 8.1 rule, and
   each programme's own admission (NC, aptitude or open). Rhine-Waal is a university of applied sciences: the
   maths-SL restriction applies there too.
3. **The country page.**
   - Say that the grade is truncated.
   - Say that IB German counts as proof only where a university says so (nationally, only the GIB).
   - Give the English-taught share.
   - Replace "Subject rules may be more flexible" for private universities: Frankfurt School applies the KMK
     conditions, WHU asks for an HZB, Constructor requires the SAT or ACT at enrolment when the diploma gives no
     direct access, and Bard awards its German BA only with Abitur equivalence.
   - Date it in `lib/page-dates.ts`.

## 5. Shortlist

English-taught first, chosen for what Germany-bound students pick: Natural Sciences 18, Engineering 16,
Business & Economics 11, Computer Science 9, Social Sciences 9, Medicine & Health 7, Arts & Humanities 5, Law 4.
Each statement was read on the university's own page on 12 October 2026, except where noted.

| # | University | Type | English-taught bachelor's | What it publishes for IB applicants | Selection |
|---|---|---|---|---|---|
| — | **Technical University of Munich** (stored) | Public | Aerospace, Information Engineering, Management and Data Science, Management and Technology, Sustainable Management and Technology, Bioeconomy; Geodesy and Earth Observation, Sustainable Engineering for Materials and Processes (not stored) | The KMK rules through a uni-assist VPD; German A HL as German proof | Aptitude assessment or SOV ([section 2](#2-tum-today)) |
| 1 | **Constructor University** (Bremen) | Private, state-recognised | All programmes (science, engineering, CS, business, social science) | "IB Diploma Candidates: 34 – 45 points" have been most successful; "we do not have any particular minimum grade requirement" and no required subjects; SAT or ACT at enrolment if the diploma "does not grant you direct admission" to a German university; English A grade 6–7 proves English | Holistic; early action by 1 February. The 34–45 is a "How competitive" figure |
| 2 | **Leuphana University Lüneburg** | Public | Economics; Global Environmental and Sustainability Sciences; International Business Administration and Entrepreneurship; Psychology; Digital Media; Cultural Studies; Studium Individuale | Economics: "university entrance qualification and English skills"; "no German required"; no tuition fees | Restricted (Economics: 55 places), Leuphana College's own procedure |
| 3 | **Rhine-Waal University of Applied Sciences** (Kleve, Kamp-Lintfort) | Public | 16 of its 23 listed, including Agribusiness, Bioengineering, Engineering, Engineering for Sustainability, Infotronic Systems, Mobility and Logistics, Nature-Inspired Materials, International Business, International Relations | Apply through uni-assist; English B2; "proof of German language proficiency is not required" for English-taught programmes (from the search index; its admission-requirements page 404s) | Open or restricted per programme; seven through hochschulstart's DoSV |
| 4 | **University of Freiburg**, Liberal Arts and Sciences | Public | Liberal Arts and Sciences (BA or BSc) | IB recognised by the university's admissions office; English B2 | 74 places, ranked on the converted grade, an essay and a motivation letter (each at least 4.0); 10% by waiting time; non-EU citizens in a 20% quota |
| 5 | **WHU – Otto Beisheim School of Management** (Vallendar) | Private | International Business Administration (BSc) | "A secondary school diploma or equivalent higher education entrance qualification (e.g., IB …)"; TOEFL 95 or IELTS 7; applications 15 October 2026 to 15 May 2027 | Analytical test, assessment and interview |
| 6 | **Bard College Berlin** | Private | BA programmes in the humanities, arts and social thought | Applications open for fall 2027; C1 English; a US degree for all, and a German BA only with a qualification "equivalent to the German Abitur" (an IB Diploma under the KMK rules) | Holistic |
| — | *Alternate:* **Frankfurt School of Finance & Management** | Private | Business (BSc) | Its "Eligibility for university studies in Germany" sheet (valid for May 2025 diplomas on) repeats the KMK conditions | Assessment centre. Its programme pages 404 to scripts, so the language of teaching was not read |
| — | *Not now:* **University of Mannheim** | Public | Business Administration, Economics (many English courses) | "For all bachelor degrees … proof of proficiency in German on C1 level" | Local NC |

Fees were not compared. Leuphana's Economics page says "no tuition fees", and every TUM programme page links
"Tuition fees for international students"; Part B reads each university's fees.

## Found along the way

- **The Germany page** is right on the KMK rules (2.2 checked them). Four things to align in Part B are listed in
  [section 4](#4-model-options).
- **Bioinformatics** is a joint TUM–LMU degree with a local NC, applied for at LMU. LMU's lottery notice for
  winter 2025/26 lists it. No cut-off was found on LMU's pages.
- **Access notes for the research rules:**
  - `tum.de` answers curl. Programme pages carry "Key Data" (admission category, language, locations) and link
    each aptitude statute as a PDF that PyMuPDF reads. The catalogue pages through
    `?tx_solr[q]=bachelor&tx_solr[page]=N`.
  - KMK, HRK and hochschulstart PDFs and pages answer curl.
  - DAAD's international-programmes API answers 403, and its results page loads by script (WebFetch sees no
    results).
  - Frankfurt School's programme pages answer 404 to scripts; its IB sheet downloads.

## Sources

All read on 12 October 2026 unless noted.

- KMK: [Agreement on the Recognition of the IB Diploma, English](https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/aktuell/283_Vereinb_Anerkenn_Int_Baccalaureate_Diploma-2023-06-15_Liste1-2026-03-26_Liste2-2026-05-22_ENGL.pdf)
  ("unofficial translation") and
  [German original](https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/aktuell/283_Vereinb_Anerkenn_Int_Baccalaureate_Diploma-2023-06-15_Liste1__2026-03-26_Liste2-2026-05-22.pdf),
  [overall grade for foreign certificates](http://www.kmk.org/fileadmin/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/GesNot05.pdf)
  ("es wird nicht gerundet"),
  [German proof for foreign certificates](https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/Zugang-auslaendischer-Bildungsnachweis-Deutschkenntnisse_16_12_2020.pdf)
  (16 December 2020),
  [bilingual IB (GIB)](https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/2002_04_26-IB-Schulen-Deutschunterricht.pdf),
  [access to higher education decisions](https://www.kmk.org/zab/central-office-for-foreign-education/general-information-about-recognition/publications-and-decisions/access-to-higher-education/)
- HRK: [Statistische Daten zu Studienangeboten, winter 2025/26](https://www.hrk.de/fileadmin/redaktion/hrk/02-Dokumente/02-03-Studium/02-03-01-Studium-Studienreform/HRK_Statistik_BA_MA_UEbrige_WiSe_2025_26.pdf)
- hochschulstart: [international applicants](https://www.hochschulstart.de/informieren-planen/internationale-bewerbende)
- TUM: the 38 stored programme pages under `tum.de/en/studies/degree-programs/detail/` and their linked aptitude
  statutes (16 PDFs, dated 2010 to 14 April 2026),
  [language certificates](https://www.tum.de/en/studies/application/application-info-portal/admission-requirements/language-certificates),
  [uni-assist](https://www.tum.de/en/studies/application/application-info-portal/uni-assist),
  [admission requirements](https://www.tum.de/en/studies/application/application-info-portal/admission-requirements),
  the catalogue search, and the unstored programmes' pages
- Constructor University: [undergraduate FAQ](https://constructor.university/programs/undergraduate-education/faq-undergraduate-study),
  [application information](https://constructor.university/admission-aid/application-information-undergraduate)
- Leuphana: [English-taught bachelor's](https://www.leuphana.de/en/study/studying-in-germany/how-to-study-in-germany/bachelors-in-english.html),
  [Economics major](https://www.leuphana.de/en/college/bachelor/economics-major.html)
- Rhine-Waal: [all degree programmes](https://www.hochschule-rhein-waal.de/en/study/programmes-and-enrolment-modes/all-degree-programmes),
  [bachelor's application](https://www.hochschule-rhein-waal.de/en/study/before-starting-university/application-process/bachelors-degrees);
  the uni-assist and German-language statements through the search index
- Freiburg: [Liberal Arts and Sciences](https://uni-freiburg.de/en/studies/degree-programmes/degree-programme/391/),
  [LAS application](https://uni-freiburg.de/ucf/las/apply/)
- WHU: [Bachelor in International Business Administration, application](https://www.whu.edu/en/programs/bachelor-program/bachelor-in-international-business-administration/application-admissions/)
- Bard College Berlin: [BA application requirements](https://berlin.bard.edu/admissions/how-to-apply/application-requirements/)
- Frankfurt School: [IB eligibility sheet](https://www.frankfurt-school.de/cms/fallback/de/dam/jcr:11afb288-73ae-4c59-a1ea-bbd78884bfcf/2025_Requirements%20IB%20Diploma.pdf)
- Mannheim: [bachelor's degrees](https://www.uni-mannheim.de/en/academics/before-your-studies/programs/pursuing-a-bachelors-degree-in-mannheim/)
- The seeding guide: `git show fe15f2d:docs/countries/germany-ib-requirements.md` and
  `git show fe15f2d:scripts/programs/seed-tum-programs.ts`
