import type { RefreshFile } from '../lib/refresh'

/**
 * University College Dublin: requirements for 2027 entry.
 *
 * Exported from the database on 2026-09-27 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts university-college-dublin
 */
const refresh: RefreshFile = {
  university: 'University College Dublin',
  entryYear: 2027,
  checkedOn: '2026-09-27',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklon0kw006t7mebemskkzfz',
      status: 'current',
      name: 'Actuarial & Financial Studies (BSc)',
      description:
        'If you enjoy studying Higher Level Mathematics for the Leaving Certificate or at A-Level and you have strong analytical and problem-solving skills, Actuarial & Financial Studies could be for you. An actuary is a professional who uses numbers to make judgements about the future. This course will prepare you for a professional career in the actuarial or financial professions, but it has also been designed to be broader and more diverse than most traditional courses in actuarial science.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: 42,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=BSS3',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=BSS3'
      ],
      notes:
        'Content 3.4: the stored ucd.ie/courses/bsc-actuarial-and-financial-studies URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN230 BSS3 Actuarial & Financial Studies Course (BAFS)). UCD Global\'s IB page gives 2027 entry requirements for international applicants: IB 42, with Mathematics HL6 (the course page gives the HL alternative). Degree: UCD awards the Bachelor of Actuarial and Financial Studies, which is not in the degree list; stored as "Bachelor" (award not recorded) instead of the wrong "Bachelor of Science" until the owner approves adding it. English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 613 points). Laboratory science is read as Biology, Chemistry or Physics.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklomy05004t7mebdc074qy7',
      status: 'current',
      name: 'Bachelor of Architectural Science (Architecture)',
      description:
        "UCD Architecture is at the forefront of the architectural and urban design debate, both in Ireland and internationally. It plays a central role in society, leading innovation and development on every scale. The Architecture course at UCD offers a means to engage creatively and constructively with society. If you have a capacity and passion for creativity, for making things through technological invention or artistic experimentation, and you're excited by the idea of designing buildings, urban environments and landscapes, then this course is for you.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 554 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 41 points, or about 39 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 33 points makes them eligible to compete for a place.",
      field: 'Architecture',
      degree: 'Bachelor of Architectural Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=ATS4',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=ATS4',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/barchsc-architecture URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN100 ATS4 Architecture (BArchSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 33, with Mathematics SL4 or HL3 (the course page gives the HL alternative). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 555 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN100 (554); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklomx9t00477meb96ak1nz4',
      status: 'current',
      name: 'Bachelor of Engineering (BE)',
      description:
        "As an engineer, you will make a real difference in the world and be responsible for leading the way in finding solutions to real problems. Will you develop alternative or new sources of energy, invent life-saving medical devices or create new modes of communication? UCD Engineering offers a particularly wide range of engineering specialisations,from Mechanial, Electrical, Electronic, Civil, Materials, Chemical & Bioprocess, Biomedical Engineering, Biosystems and Food to Structural Engineering with Architecture.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 577 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, and counting the 25 points that this course's Higher Level Mathematics adds, that is about 41 points. Applicants from outside the EU apply to UCD directly, where 33 points makes them eligible to compete for a place.",
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=NUS1',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=NUS1',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bsc-engineering URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN150 NUS1 Bachelor of Engineering (BE)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 33, with Mathematics HL5 and a laboratory science HL4 (the course page gives the HL alternative). UCD calls it Engineering Omnibus (DN150); a 2027/28 pilot also accepts the OMPT-D maths test at 55%. English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 577 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN150 (577); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklomyng005b7meb892mszr1',
      status: 'current',
      name: 'Bachelor of Landscape Architecture',
      description:
        "Landscape architecture is undoubtedly one of the most relevant design disciplines today. Global climate change is altering everything - everywhere in the world. We are faced with necessary tasks relating to the design and build of our surrounding environments and ecologies. The landscape and its functions, its ecosystem services and its appearance, will inevitably change, not slow but rapidly. Landscape architects must contribute to the design of this future landscape - urban, semi-urban, and rural.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 478 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 35 points, or about 33 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 24 points makes them eligible to compete for a place.",
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=LDS2',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=LDS2',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bsc-landscape-architecture URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN120 LDS2 Landscape Architecture (BSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 24, with Mathematics SL4 or HL3 (the course page gives the HL alternative). The award is a Bachelor of Science (CAO: Landscape Architecture (BSc)), not a Bachelor of Landscape Architecture. English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 485 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN120 (478); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklon2mj008f7mebth7pv9kw',
      status: 'current',
      name: 'Biomedical, Health & Life Sciences (BSc)',
      description:
        "This course will appeal to those with a keen interest in science and in how research and technology can impact on human health. It is training scientists at the interface of science and medicine. You will learn how scientifically driven investigations can advance our knowledge of disease prevention, detection and treatment and translating these into clinical utility. The course will immerse you in modern medical and biological sciences and focus on the application of scientific developments. BHLS offers students a unique opportunity to complete a research project with a Principal Investigator in a biomedical research area that interests you and an opportunity to be involved in peer-reviewed publications.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 579 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 44 points, or about 41 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 37 points makes them eligible to compete for a place.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=BHS1',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'BIO', level: 'SL', grade: 4 },
            { course: 'CHEM', level: 'SL', grade: 4 },
            { course: 'PHYS', level: 'SL', grade: 4 },
            { course: 'BIO', level: 'HL', grade: 3 },
            { course: 'CHEM', level: 'HL', grade: 3 },
            { course: 'PHYS', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=BHS1',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bsc-biomedical-health-and-life-sciences URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN440 BHS1 Biomedical, Health & Life Sciences (BSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 37, with Mathematics SL4 or HL3 and a laboratory science SL4 or HL3 (the course page gives the HL alternative). Interview required. English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 589 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN440 (579); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklomtkz001f7mebp43trxr1',
      status: 'current',
      name: 'BSc Business',
      description:
        'The UCD Quinn School has a long tradition at the forefront of business and management education in Ireland and internationally. The BSc Business is an exciting new global-focused degree developed by the Quinn School for students aiming to develop the knowledge, skills and intercultural competencies essential in the global world of business and management. This programme offers modules focusing on real-world business skills and intercultural competencies ideal for students considering a career in international business.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 33,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=B722',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'SL', grade: 6 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=B722'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bsc-business URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (B722). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 33, with Mathematics SL6 or HL4 (the course page gives the HL alternative). Non-EU route only (no CAO code). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: none published points). Laboratory science is read as Biology, Chemistry or Physics."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklomu8d001x7meb1ocesqd4',
      status: 'current',
      name: 'Business & Law (BBL)',
      description:
        "The Business & Law (BBL) degree is a popular choice for many students and is extremely well regarded by employers across the legal and financial communities. The degree is a 'double major' which means it combines law and business in a single degree, providing an ideal skill-set for the commercial world and offering valuable career flexibility. If you choose this degree, you will undertake business and law modules in equal measure for your first three years in both the UCD Sutherland School of Law and the UCD Quinn School of Business. This allows you to gain a deep understanding of both disciplines while offering you the opportunity to choose in final year which area interests you most for your career progression.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 555 points or more (not everyone on 555 got a place). UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 42 points, or about 39 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 33 points makes them eligible to compete for a place.",
      field: 'Business & Economics',
      degree: 'Bachelor of Business and Law',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=BSJ4',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'SL', grade: 6 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=BSJ4',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bbl-business-and-law URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN610 BSJ4 Business and Law (BBL)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 33, with Mathematics SL6 or HL4 (the course page gives the HL alternative). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 555 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN610 (555*); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklomzao005t7mebw3sw0vsh',
      status: 'current',
      name: 'City Planning & Environmental Policy (BSc)',
      description:
        "Our degree in City Planning & Environmental Policy is about solving complex issues that we experience in our everyday lives. How can we provide housing for everyone? How can we reduce our climate impact and conserve our natural environment? Where should we build our schools and shops? This unique degree brings together a focus on the city, the environment and design and links them with clear routes to professions and careers.\n\nUCD Planning is also the oldest, largest and most respected planning and environmental policy school in Ireland. Most planners currently employed in Ireland were educated in the School, and the course is accredited by the Royal Town Planning Institute (RTPI).\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 474 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 35 points, or about 33 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 24 points makes them eligible to compete for a place.",
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=RCS3',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=RCS3',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bsc-city-planning-and-environmental-policy URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN130 RCS3 City Planning & Environmental Policy (BSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 24, with Mathematics SL4 or HL3 (the course page gives the HL alternative). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 481 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN130 (474); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklomrnp00017mebm49dloat',
      status: 'current',
      name: 'Commerce (BComm)',
      description:
        "The BComm is a globally recognised business degree, designed for ambitious and achievement-orientated students who want to make a significant impact in the business world. Combining strong theoretical understanding with the practical skills needed for graduate employment, students are assured of a challenging and relevant programme for the modern business world.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 554 points or more (not everyone on 554 got a place). UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 41 points, or about 39 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 33 points makes them eligible to compete for a place.",
      field: 'Business & Economics',
      degree: 'Bachelor of Commerce',
      duration: '3 years',
      minIBPoints: 33,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=BSS1',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'SL', grade: 6 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=BSS1',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bcomm-commerce URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN650 BSS1 Commerce (BComm)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 33, with Mathematics SL6 or HL4 (the course page gives the HL alternative). Three years, four with the optional internship. English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 554 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN650 (554*); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklomsxt000x7mebkq9rnuv7',
      status: 'current',
      name: 'Commerce International (BComm)',
      description:
        "(BCIT) is a multi-disciplinary Business degree incorporating intercultural competencies and linguistic knowledge, which promote creativity and comprehension of a rapidly evolving world. Students pursue a major in business alongside a minor in a chosen language.\n\nThis programme combines a flexible business education from Ireland's leading business school with the linguistic skills and multicultural insights required to succeed in the exciting world of international business.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 543 points or more (not everyone on 543 got a place). UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 41 points, or about 38 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 33 points makes them eligible to compete for a place.",
      field: 'Business & Economics',
      degree: 'Bachelor of Commerce',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=BSW1',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'SL', grade: 6 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=BSW1',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        'Content 3.4: the stored ucd.ie/courses/bcomm-commerce-intl URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN660 BSW1 Commerce International (BComm)). UCD Global\'s IB page gives 2027 entry requirements for international applicants: IB 33, with Mathematics SL6 or HL4 (the course page gives the HL alternative). Also a language: SL4 for a beginners-level language, HL5 for an advanced-level one (French only at advanced level); the model cannot hold "the language you choose". English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 543 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives CAO\'s round 1 2026 points for DN660 (543*); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity\'s indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklomzxw006b7mebfo4ygqfn',
      status: 'current',
      name: 'Computer Science (BSc)',
      description:
        "Computer Science is a common entry course and offers the following two degree subjects:\n\n    Computer Science  \n    Computer Science with Data Science & Artificial Intelligence\n\nStudents decide on their degree subject at the end of Second Year. If you are a logical thinker who likes problem solving and you enjoy subjects like mathematics, a degree in Computer Science could be for you.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 510 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 38 points, or about 36 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 33 points makes them eligible to compete for a place.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=CSSA',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'SL', grade: 6 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=CSSA',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bsc-computer-science URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN201 CSSA Computer Science Course (BSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 33, with Mathematics SL6 or HL4 (the course page gives the HL alternative). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 540 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN201 (510); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklomw2r003b7mebmtme92j6',
      status: 'current',
      name: 'Economics (BSc)',
      description:
        "Economics explores how and why people make decisions and choose between alternative ways of spending their money and using their time, energy and skills. That is why Economics can help to shed light on decision-making in areas from love and marriage, to sports and crime. If you are interested in people's behaviour and in current affairs, and if you enjoy problem-solving and are naturally analytical with good numeracy skills, then Economics will appeal to you.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 544 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, and counting the 25 points that this course's Higher Level Mathematics adds, that is about 38 points. Applicants from outside the EU apply to UCD directly, where 29 points makes them eligible to compete for a place.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 29,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=ECS4',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=ECS4',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bsc-economics URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN710 ECS4 Economics (BSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 29, with Mathematics HL5 (the course page gives the HL alternative). Direct entry (DN710); entry via Social Sciences (DN700) needs only Mathematics SL4. English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 542 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN710 (544); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklomsds000j7mebx37j0awo',
      status: 'current',
      name: 'Economics & Finance (BSc)',
      description:
        "If you have an interest in financial markets and economics, and a strong ability in maths and statistics, this degree provides an excellent springboard for a future career in economics, finance, banking, and business. Recognised as one of the premier degrees in its field in Ireland and internationally, this programme equips students with outstanding expertise in quantitative methods, analytical skills and a rigorous preparation in economics and finance. The skills developed during this course are not only essential for learning Economics and Finance but are also very valuable across numerous career paths.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 625 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that took the full 45 points plus the 25 that this course's Higher Level Mathematics adds. Applicants from outside the EU apply to UCD directly, where 39 points makes them eligible to compete for a place.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 39,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=BSS2',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=BSS2',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bsc-economics-and-finance URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN670 BSS2 Economics & Finance (BSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 39, with Mathematics HL5 (the course page gives the HL alternative). Three years, four with the optional internship (the stored 4 years was the internship option). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 625 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN670 (625); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklomuvb002f7mebyj0tr0h9',
      status: 'current',
      name: 'Law with Economics (BCL)',
      description:
        "This course allows you to obtain a highly respected degree in Irish law, whilst simultaneously acquiring a broad knowledge of economics. Certain areas of law (e.g. competition, regulation and intellectual property) are heavily influenced by economic theory. BCL (Law with Economics) graduates are uniquely equipped to understand these regulatory frameworks in all of their conceptual complexity. On this degree, you will embark on a field of cross-disciplinary study which is intellectually very demanding, but also enriching and of practical importance.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 559 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, and counting the 25 points that this course's Higher Level Mathematics adds, that is about 40 points. Applicants from outside the EU apply to UCD directly, where 33 points makes them eligible to compete for a place.",
      field: 'Law',
      degree: 'Bachelor of Civil Law',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=LWW4',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=LWW4',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bcl-law-with-economics URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN600 LWS6 Law (BCL)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 33, with Mathematics HL4 (the course page gives the HL alternative). Direct entry (LWW4); it is also reachable through the common Law entry (DN600). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 564 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN600 (559); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklon3i600957mebd9owdux6',
      status: 'current',
      name: 'Medicine',
      description:
        "Our Medicine curriculum is patient-centred and continually adapts to the needs of society and developments in medical knowledge. You will learn from world-class educators and patients in state-of-the-art facilities, immerse yourself in our acclaimed undergraduate student research programme and benefit from a diverse, international student population.\n\nThe main hospitals associated with our programme are St Vincent's University Hospital and the Mater Misericordiae University Hospital. In addition, there are more than 20 other training hospitals and more than 120 primary care practices that will facilitate your learning. You will also benefit from a diverse range of exciting international placement opportunities.\n\nHow competitive: applicants from the EU apply through the CAO, where Medicine ranks school results together with the HPAT-Ireland aptitude test. In round 1 of 2026, places went to applicants with 738 combined points or more (not everyone on 738 got a place). Applicants from outside the EU apply to UCD directly: 39 points and an interview make them eligible, and UCD notes that successful applicants often present stronger results.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Medicine and Bachelor of Surgery',
      duration: '6 years',
      minIBPoints: 39,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=MDSA',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'BIO', level: 'SL', grade: 4 },
            { course: 'CHEM', level: 'SL', grade: 4 },
            { course: 'PHYS', level: 'SL', grade: 4 },
            { course: 'BIO', level: 'HL', grade: 3 },
            { course: 'CHEM', level: 'HL', grade: 3 },
            { course: 'PHYS', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=MDSA',
        'https://www2.cao.ie/points/l8.php'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/medicine URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN400 MDSA Medicine (MB BCh BAO)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 39, with Mathematics SL4 or HL3 and a laboratory science SL4 or HL3 (the course page gives the HL alternative). The international route (MDS2, no page of its own) is IB 39 plus interview, and UCD notes successful applicants often present stronger results; EU applicants go through CAO and the HPAT (DN400, the page linked). Award MB BCh BAO, stored as the nearest listed type. English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 625 (Combined Range (HPAT): 738) points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN400 (#738*, school results and HPAT combined, so no IB conversion); update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklomvfd002t7mebuei59z0m',
      status: 'current',
      name: 'Philosophy, Politics & Economics (BSc)',
      description:
        "PPE provides a broad and deep understanding of how a society works, and indeed how international society works. It examines the complex economic and political forces in play, the problems of measuring and assessing the health of society, and the principles of justice that should guide political decision-making to improve society. PPE will teach students how to read beyond media headlines, and where to find more information about the hot policy questions of the day, in national and international contexts.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 498 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 37 points, or about 35 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 29 points makes them eligible to compete for a place.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 29,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=COS1',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=COS1',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bsc-philosophy-politics-economics URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN700 COS1 Philosophy, Politics and Economics (BSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 29, with Mathematics SL4 or HL3 (the course page gives the HL alternative). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 490 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN700 (498); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklon56m00al7mebzqsvcroj',
      status: 'current',
      name: 'Physiotherapy (BSc)',
      description:
        "Physiotherapists are healthcare professionals responsible for developing, maintaining and restoring movement and functional ability in adults and children using evidence-based practice. Studying Physiotherapy in UCD will provide you with the skills and qualifications required to practice as a physiotherapist upon graduation. With state-of-the-art facilities and globally recognised researchers as lecturers, you will learn in a culture of established academic excellence. If you enjoy working with people and would like to have a career in which you will relieve pain and treat or prevent physical conditions associated with injury, disease or other impairments, this course may be for you.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 578 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 44 points, or about 41 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 39 points makes them eligible to compete for a place.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 39,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=MDS5',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'BIO', level: 'SL', grade: 4 },
            { course: 'CHEM', level: 'SL', grade: 4 },
            { course: 'PHYS', level: 'SL', grade: 4 },
            { course: 'BIO', level: 'HL', grade: 3 },
            { course: 'CHEM', level: 'HL', grade: 3 },
            { course: 'PHYS', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=MDS5',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bsc-physiotherapy URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN420 MDS5 Physiotherapy (BSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 39, with Mathematics SL4 or HL3 and a laboratory science SL4 or HL3 (the course page gives the HL alternative). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 578 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN420 (578); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklomwm0003p7mebbkha330l',
      status: 'current',
      name: 'Psychology (BSc)',
      description:
        "If you have a questioning attitude and good reasoning skills, you will really enjoy the world opened up by Psychology. Psychology has links to the natural sciences, the social sciences and the arts, so it is likely to appeal to a wide variety of people. The course has core modules that will introduce you to major theories and research methods, and you will also have a chance to choose option modules in specialist areas of psychology (e.g. counselling, clinical psychology and forensic psychology).\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 548 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 41 points, or about 39 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 37 points makes them eligible to compete for a place.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 37,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=PCS2',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=PCS2',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bsc-psychology URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN720 PCS2 Psychology (BSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 37, with Mathematics SL4 or HL3 (the course page gives the HL alternative). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 544 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN720 (548); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklon4cf009v7mebfwbfd9wz',
      status: 'current',
      name: 'Radiography (BSc)',
      description:
        "Radiographers are responsible for producing high-quality images to assist in the diagnosis and treatment of disease. While radiography is a caring profession, it's also one that requires considerable technological and scientific expertise in both the production of images and the responsible delivery of ionising radiation. If you're interested in science and you want to use your knowledge to care for people, Radiography at UCD may be a perfect fit for you.\n\nOur aim is to prepare graduate radiographers to meet the everyday challenges arising from ongoing advances in diagnostic imaging and healthcare\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 543 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 41 points, or about 38 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 35 points makes them eligible to compete for a place.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 35,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=MDS4',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'BIO', level: 'SL', grade: 4 },
            { course: 'CHEM', level: 'SL', grade: 4 },
            { course: 'PHYS', level: 'SL', grade: 4 },
            { course: 'BIO', level: 'HL', grade: 3 },
            { course: 'CHEM', level: 'HL', grade: 3 },
            { course: 'PHYS', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=MDS4',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bsc-radiography URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN410 MDS4 Radiography (BSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 35, with Mathematics SL4 or HL3 and a laboratory science SL4 or HL3 (the course page gives the HL alternative). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 544 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN410 (543); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklon14m00777mebv47ceig7',
      status: 'current',
      name: 'Science (BSc)',
      description:
        "The UCD Science common entry course offers a range of degree subjects leading to a BSc degree in one degree subject. Subjects are grouped thematically in streams.\n\nStudents who are interested in exploring a number of streams in First Year can select the Explore Multiple Streams option. If an applicant selects Explore Multiple Streams, they are offered the same First Year module guarantees as students who choose one of the thematic streams.\n\nEmail all CAO queries to AskScience@ucd.ie and our Science Office team will help you with your query.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 540 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 40 points, or about 38 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 33 points makes them eligible to compete for a place.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=SCU1',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'SL', grade: 6 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'BIO', level: 'SL', grade: 6 },
            { course: 'CHEM', level: 'SL', grade: 6 },
            { course: 'PHYS', level: 'SL', grade: 6 },
            { course: 'BIO', level: 'HL', grade: 4 },
            { course: 'CHEM', level: 'HL', grade: 4 },
            { course: 'PHYS', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=SCU1',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/science URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN200 SCU1 Science Course (BSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 33, with Mathematics SL6 or HL4 and a laboratory science SL6 or HL4 (the course page gives the HL alternative). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 543 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN200 (540); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklon6ua00c17mebuv0689f2',
      status: 'current',
      name: 'Sport & Exercise Management (BSc)',
      description:
        "The multidisciplinary nature of the BSc in Sport & Exercise Management equips students with skills in areas such as management, marketing, event planning, human resources, economics and finance, sports development and coaching. These underpin the structure and governance of sport, health and exercise programmes today. If these opportunities interest you, the combination of UCD's internationally recognised academic excellence and sporting reputation makes this degree ideal.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 33,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=SMS2',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'BIO', level: 'SL', grade: 4 },
            { course: 'CHEM', level: 'SL', grade: 4 },
            { course: 'PHYS', level: 'SL', grade: 4 },
            { course: 'BIO', level: 'HL', grade: 3 },
            { course: 'CHEM', level: 'HL', grade: 3 },
            { course: 'PHYS', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=SMS2'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bsc-sport-and-exercise-management URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN430 SMS2 Sport & Exercise Management (BSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 33, with Mathematics SL4 or HL3 and a laboratory science SL4 or HL3 (the course page gives the HL alternative). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 477 points). Laboratory science is read as Biology, Chemistry or Physics."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklon60900bb7mebbdt47uvg',
      status: 'current',
      name: 'Sport, Health & Exercise Science (BSc)',
      description:
        "This course is suitable for you if you have a strong interest in sport and exercise science and wish to pursue a career in high performance sport, a clinical profession (e.g. physiotherapy, dietetics, medicine) and/or scientific research in sport and health sciences. Led by top industry professionals in state-of-the-art facilities, you will study the scientific principles underlying the promotion and enhancement of sport, physical health and exercise across the lifespan.\n\nPlease note that the BSc Sport, Health & Exercise Science course replaced the BSc Health & Performance Science course in September 2025.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 532 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 40 points, or about 37 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 35 points makes them eligible to compete for a place.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=MDSK',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'BIO', level: 'SL', grade: 4 },
            { course: 'CHEM', level: 'SL', grade: 4 },
            { course: 'PHYS', level: 'SL', grade: 4 },
            { course: 'BIO', level: 'HL', grade: 3 },
            { course: 'CHEM', level: 'HL', grade: 3 },
            { course: 'PHYS', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=MDSK',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bsc-sport-health-exercise-science URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN425 MDSK Sport, Health & Exercise Science (BSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 35, with Mathematics SL4 or HL3 and a laboratory science SL4 or HL3 (the course page gives the HL alternative). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 531 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN425 (532); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklon1zg007x7meb0njqt1da',
      status: 'current',
      name: 'Sustainability (BSc)',
      description:
        "The Sustainability course reflects the integrated interdisciplinary approach required in sustainability research, policy and practice. First Year is structured so that students are able to progress into one of the following degree subjects in Second Year:\n\n    Sustainability with Environmental Sciences\n    Sustainability with Social Sciences, Policy & Law\n    Sustainability with Business & Economics\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 529 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 39 points, or about 37 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 33 points makes them eligible to compete for a place.",
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=STS1',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'SL', grade: 6 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=STS1',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/sustainability URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN240 STS1 Sustainability Course (BSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 33, with Mathematics SL6 or HL4 (the course page gives the HL alternative). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 532 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN240 (529); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "Master of Veterinary Medicine".
    {
      id: 'cmklon7oh00cr7mebdxykige4',
      status: 'current',
      name: 'Veterinary Medicine (MVB)',
      description:
        "This programme will educate you to the best international standards in veterinary medicine. To work as a vet in the Republic of Ireland you must have a degree in Veterinary Medicine, which is registered by the Veterinary Council of Ireland. UCD's Bachelor of Veterinary Medicine (MVB) is Ireland's only such degree. The veterinary profession is concerned with the promotion of the health and welfare of animals of special importance to society. This involves the care of healthy and sick animals, the prevention, recognition, control and treatment of their diseases and of diseases transmitted from animals to man, and the welfare and productivity of livestock.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 589 points or more (not everyone on 589 got a place), and practical experience with animals is also required. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 45 points, or about 42 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 40 points makes them eligible to compete for a place.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Veterinary Medicine',
      duration: '5 years',
      minIBPoints: 40,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=VTS1',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=VTS1',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/mvb-veterinary-medicine URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN300 VTS1 Veterinary Medicine (MVB)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 40, with Mathematics SL4 or HL3 and Chemistry HL5 (the course page gives the HL alternative). Also at least 60 hours of practical animal-handling experience in the three years before entry (for 2027: 1 February 2024 to 5 July 2027). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 589 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN300 (#589*); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmklon8ig00dh7mebbn8mttsa',
      status: 'current',
      name: 'Veterinary Nursing (BSc)',
      description:
        "In response to the recognition and registration of veterinary nursing as a profession in Ireland, UCD developed and implemented a full-time, four-year honours BSc Veterinary Nursing degree programme in 2009. The degree provides the graduate with not only a sound academic foundation but also the practical skills and competencies with which to build a solid career as a professional veterinary nurse.\n\nHow competitive: applicants from the EU apply through the CAO and are ranked on points. In round 1 of 2026, places went to applicants with 484 points or more. UCD does not publish how it scores the IB. On Trinity College Dublin's indicative scale for the IB, that is about 36 points, or about 34 with Higher Level Mathematics at 4 or better, which adds 25. Applicants from outside the EU apply to UCD directly, where 33 points makes them eligible to compete for a place.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=VTS2',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'BIO', level: 'SL', grade: 4 },
            { course: 'CHEM', level: 'SL', grade: 4 },
            { course: 'PHYS', level: 'SL', grade: 4 },
            { course: 'BIO', level: 'HL', grade: 3 },
            { course: 'CHEM', level: 'HL', grade: 3 },
            { course: 'PHYS', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 3 },
            { course: 'ENG-LL', level: 'HL', grade: 3 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucd.ie/global/study-at-ucd/undergraduate/entryrequirements/internationalbaccalaureatediploma/',
        'https://hub.ucd.ie/usis/!W_HU_MENU.P_PUBLISH?p_tag=COURSE&MAJR=VTS2',
        'https://www2.cao.ie/points/l8.php',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/'
      ],
      notes:
        "Content 3.4: the stored ucd.ie/courses/bsc-veterinary-nursing URL still reaches this course page in a browser (a 301 to hub.ucd.ie, then a meta refresh); the 3.3 link checker read it as a soft 404. The URL now points at the course page itself (DN310 VTS2 Veterinary Nursing (BSc)). UCD Global's IB page gives 2027 entry requirements for international applicants: IB 33, with Mathematics SL4 or HL3 and a laboratory science SL4 or HL3 (the course page gives the HL alternative). English, not critical because tests also count: Language A HL3 or SL4, or Language B HL4 or SL6. EU applicants apply through CAO (2026 cut-off: 468 points). Laboratory science is read as Biology, Chemistry or Physics. Content 5.4 (9 October 2026): the description's last paragraph, \"How competitive\", gives CAO's round 1 2026 points for DN310 (484); UCD publishes no IB-to-CAO scale, so the paragraph names Trinity's indicative IB points equivalence (24 = 360, 27 = 389, 30 = 420, 36 = 496, 42 = 566, 45 = 600, interpolated; 25 more for HL Mathematics at 4 or better) as its source; update it at each refresh."
    }
  ]
}

export default refresh
