import type { RefreshFile } from '../lib/refresh'

/**
 * University of Oxford: requirements for 2027 entry.
 *
 * Exported from the database on 2026-10-07 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Exported on 7 October 2026 for content task 8.1, to re-file programs under the fields of
 * study through this tool: every program here is unchecked, so only a changed `field` is
 * written. University of Oxford's checked 2027 requirements are in university-of-oxford.ts, the content task 1.2 file,
 * which has another shape and is applied with apply-2027-requirements.ts.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts scripts/programs/2027/university-of-oxford-refresh.ts
 */
const refresh: RefreshFile = {
  university: 'University of Oxford',
  entryYear: 2027,
  checkedOn: '2026-10-07',
  programs: [
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3le5w00037mc2fc7uza3n',
      status: 'current',
      name: 'Archaeology and Anthropology',
      description:
        'Archaeology and anthropology together encompass the study of humankind from the origins of the human species to the present day.\n\nBoth disciplines have a long history: archaeology grew from 18th-century antiquarianism, while anthropology began even earlier in the first days of colonial encounter.\n\nToday, both subjects involve a range of sophisticated approaches shared with the arts, social sciences and physical sciences.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/archaeology-and-anthropology',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3leho00057mc22nhlra58',
      status: 'current',
      name: 'Asian and Middle Eastern Studies',
      description:
        'This course offers the opportunity to study the languages, literature, history and culture of one of the world’s major civilisations.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/asian-and-middle-eastern-studies',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "MBiochem".
    {
      id: 'cmkr3lmdl002f7mc2i4lnr19o',
      status: 'current',
      name: 'Biochemistry (Molecular and Cellular)',
      description:
        'Biochemistry helps us to understand the interaction between the various cell parts and how whole organisms function.',
      field: 'Natural Sciences',
      degree: 'Master of Biochemistry',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/biochemistry-molecular-and-cellular',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 7, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'SL', grade: 6, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "MBiol".
    {
      id: 'cmkr3ln0f002r7mc2xpkikcba',
      status: 'current',
      name: 'Biology',
      description:
        'Biology is the study of living things and how they interact with their environment.',
      field: 'Natural Sciences',
      degree: 'Master of Biology',
      duration: '4 years',
      minIBPoints: 39,
      programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/biology',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "MChem".
    {
      id: 'cmkr3lnl300337mc2h7tayqs6',
      status: 'current',
      name: 'Chemistry',
      description:
        'Chemistry is a wide-ranging science concerned with matter at the atomic and molecular scale.',
      field: 'Natural Sciences',
      degree: 'Master of Chemistry',
      duration: '4 years',
      minIBPoints: 40,
      programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/chemistry',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 7, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3leqp00077mc2fzkq30co',
      status: 'current',
      name: 'Classical Archaeology and Ancient History',
      description:
        'This course integrates the study of history and archaeology of the classical world.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/classical-archaeology-and-ancient-history',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lf1j00097mc2v9vijjwd',
      status: 'current',
      name: 'Classics',
      description:
        'Classics (Literae Humaniores) is a wide-ranging degree devoted to the study of the literature, history, philosophy, languages and archaeology of the ancient Greek and Roman worlds.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 39,
      programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/classics',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lfcm000b7mc2a2zxhy7c',
      status: 'current',
      name: 'Classics and English',
      description: 'A course integrating the study of Classics and English.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/classics-and-english',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lfs6000h7mc2xh1uelk3',
      status: 'current',
      name: 'Classics and Modern Languages',
      description: 'Combine the study of a modern language with Classics.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/classics-and-modern-languages',
      requirements: [
        {
          courses: [
            'FRA-B',
            'FRA-LIT',
            'FRA-LL',
            'GER-B',
            'GER-LIT',
            'GER-LL',
            'GRK',
            'ITA-B',
            'LAT',
            'POR-B',
            'RUS-B',
            'SPA-B',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 6,
          critical: true
        }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lo1p003b7mc2b6ewty4w',
      status: 'current',
      name: 'Computer Science',
      description:
        'Computing is about understanding computer systems and networks at a deep level.',
      field: 'Computer Science',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/computer-science',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3loec003f7mc2kn5usmc5',
      status: 'current',
      name: 'Computer Science and Philosophy',
      description: 'Study Computer Science and Philosophy together.',
      field: 'Computer Science',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/computer-science-and-philosophy',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "MEarthSci".
    {
      id: 'cmkr3lorz003j7mc2u71naqm7',
      status: 'current',
      name: 'Earth Sciences (Geology)',
      description: 'Earth Sciences is the study of the planet we live on.',
      field: 'Natural Sciences',
      degree: 'Master of Earth Sciences',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/earth-sciences-geology',
      requirements: [
        { courses: ['CHEM', 'PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lu60005z7mc2b073xe4q',
      status: 'current',
      name: 'Economics and Management',
      description: 'Examines the way in which the economy and organisations function.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/economics-and-management',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "MEng".
    {
      id: 'cmkr3lpat003t7mc21bfqmwks',
      status: 'current',
      name: 'Engineering Science',
      description: 'Engineering Science challenges students to solve real-world problems.',
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 40,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/engineering-science',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 7, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lgij000p7mc2hrwiupjd',
      status: 'current',
      name: 'English and Modern Languages',
      description: 'Combine the study of English with a modern language.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/english-and-modern-languages',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lg3x000j7mc2ao1gsi9c',
      status: 'current',
      name: 'English Language and Literature',
      description: 'This course covers English literature from its origins to the present day.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/english-language-and-literature',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lgxx000v7mc2dprmd158',
      status: 'current',
      name: 'European and Middle Eastern Languages',
      description: 'Combine the study of a European language with a Middle Eastern language.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/european-and-middle-eastern-languages',
      requirements: [
        {
          courses: [
            'FRA-B',
            'FRA-LIT',
            'FRA-LL',
            'GER-B',
            'GER-LIT',
            'GER-LL',
            'ITA-B',
            'POR-B',
            'RUS-B',
            'SPA-B',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 6,
          critical: true
        }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BFA".
    {
      id: 'cmkr3lh78000x7mc2v1uw9t67',
      status: 'current',
      name: 'Fine Art',
      description: 'Fine Art is the making and study of visual art.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Fine Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/fine-art',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3luk900657mc2ycoa2x1f',
      status: 'current',
      name: 'Geography',
      description: 'Diverse interdisciplinary degree bridging natural and social sciences.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 39,
      programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/geography',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lhjk00117mc279pvvaa5',
      status: 'current',
      name: 'History',
      description:
        'History at Oxford combines the examination of large regions over extended periods of time with more focused work on smaller social groups.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lhwx00157mc244nfy5y4',
      status: 'current',
      name: 'History (Ancient and Modern)',
      description: 'Study history from the Bronze Age to the present day.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history-ancient-and-modern',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3ljja001p7mc25o5wujyl',
      status: 'current',
      name: 'History and Economics',
      description:
        'Integrates these two subjects to form a coherent and intellectually stimulating programme.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history-and-economics',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3li9y00197mc2j08ug4ja',
      status: 'current',
      name: 'History and English',
      description: 'Study history and English literature together.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history-and-english',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lirn001h7mc28i03ye2h',
      status: 'current',
      name: 'History and Modern Languages',
      description: 'Combine the study of History with a modern language.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history-and-modern-languages',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lj62001l7mc29de2sc2b',
      status: 'current',
      name: 'History and Politics',
      description:
        'Brings together complementary but distinct disciplines to form a coherent and stimulating programme.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history-and-politics',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lk04001x7mc2fbrml90n',
      status: 'current',
      name: 'History of Art',
      description:
        'Aims to arrive at an historical understanding of the origins, meanings and purposes of art and artefacts.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history-of-art',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3luvc00677mc2ntipetz0',
      status: 'current',
      name: 'Human Sciences',
      description: 'Study humans from multiple interconnecting perspectives.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/human-sciences',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lv6900697mc2sfdierl7',
      status: 'current',
      name: 'Law (Jurisprudence)',
      description: 'Provides an excellent basis for a career in the legal profession.',
      field: 'Law',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/law-jurisprudence',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "MEng".
    {
      id: 'cmkr3lpte00417mc2bkushx85',
      status: 'current',
      name: 'Materials Science',
      description:
        'Materials Science spans the physics and chemistry of matter and engineering applications.',
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 40,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/materials-science',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "MMath".
    {
      id: 'cmkr3lqcb004b7mc27865olw3',
      status: 'current',
      name: 'Mathematics',
      description: 'Mathematics is a fundamental intellectual tool.',
      field: 'Natural Sciences',
      degree: 'Master of Mathematics',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/mathematics',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "MMathCompSci".
    {
      id: 'cmkr3lqp3004f7mc220lvk2j7',
      status: 'current',
      name: 'Mathematics and Computer Science',
      description: 'Combine mathematical reasoning with an understanding of computing.',
      field: 'Natural Sciences',
      degree: 'Master of Mathematics and Computer Science',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/mathematics-and-computer-science',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "MMathPhil".
    {
      id: 'cmkr3lr20004j7mc2p1l21qd0',
      status: 'current',
      name: 'Mathematics and Philosophy',
      description: 'Brings together two fundamental intellectual skills.',
      field: 'Natural Sciences',
      degree: 'Master of Mathematics and Philosophy',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/mathematics-and-philosophy',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "MMath".
    {
      id: 'cmkr3lrfp004n7mc2287igzxg',
      status: 'current',
      name: 'Mathematics and Statistics',
      description: 'Method-building and wide-ranging applied work with data.',
      field: 'Natural Sciences',
      degree: 'Master of Mathematics',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/mathematics-and-statistics',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BM BCh".
    {
      id: 'cmkr3lrqn004r7mc2tmg5ni78',
      status: 'current',
      name: 'Medicine',
      description:
        'Provides a thorough intellectual training with particular emphasis on basic science research.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Medicine and Bachelor of Surgery',
      duration: '6 years',
      minIBPoints: 39,
      programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/medicine',
      requirements: [
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lkap001z7mc26uwjrhvt',
      status: 'current',
      name: 'Modern Languages',
      description:
        'Provides practical training in written and spoken language and an extensive introduction to European literature and thought.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/modern-languages',
      requirements: [
        {
          courses: [
            'FRA-B',
            'FRA-LIT',
            'FRA-LL',
            'GER-B',
            'GER-LIT',
            'GER-LL',
            'ITA-B',
            'POR-B',
            'RUS-B',
            'SPA-B',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 6,
          critical: true
        }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lklu00217mc2ttufv5vo',
      status: 'current',
      name: 'Modern Languages and Linguistics',
      description: 'Study one modern language in depth together with linguistics.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/modern-languages-and-linguistics',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lkuo00237mc2e6zjbate',
      status: 'current',
      name: 'Music',
      description: 'Music covers reading, listening, performing and composing.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/music',
      requirements: [{ courses: ['MUSIC'], level: 'HL', grade: 6, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3ll7o00277mc2n8mfjmbz',
      status: 'current',
      name: 'Philosophy and Modern Languages',
      description:
        'Brings together some of the most important approaches to understanding language, literature and ideas.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/philosophy-and-modern-languages',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3llin00297mc2eqftvcnu',
      status: 'current',
      name: 'Philosophy and Theology',
      description:
        'Brings together some of the most important approaches to understanding and assessing the intellectual claims of religion.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/philosophy-and-theology',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lvha006b7mc247n07fpt',
      status: 'current',
      name: 'Philosophy, Politics and Economics',
      description: 'Understanding the world around us through three disciplines.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/philosophy-politics-and-economics',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "MPhys".
    {
      id: 'cmkr3lscf00537mc20g8lkyzp',
      status: 'current',
      name: 'Physics',
      description: 'Study of the universe from the smallest to the largest scale.',
      field: 'Natural Sciences',
      degree: 'Master of Physics',
      duration: '4 years',
      minIBPoints: 39,
      programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/physics',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "MPhysPhil".
    {
      id: 'cmkr3lssp005b7mc2r08kcaqz',
      status: 'current',
      name: 'Physics and Philosophy',
      description: 'Combines rigorous science and humanities.',
      field: 'Natural Sciences',
      degree: 'Master of Physics and Philosophy',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/physics-and-philosophy',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lt94005j7mc229ipzdyd',
      status: 'current',
      name: 'Psychology (Experimental)',
      description: 'Science of mental life involving rigorous formulation and testing of ideas.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/psychology-experimental',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3ltx2005x7mc2fvdg35mf',
      status: 'current',
      name: 'Psychology, Philosophy and Linguistics',
      description: 'Brings together three distinct but related disciplines.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/psychology-philosophy-and-linguistics',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3llti002b7mc245qrp7ih',
      status: 'current',
      name: 'Religion and Asian and Middle Eastern Studies',
      description:
        'Offers an in-depth understanding of one of the world’s great religious traditions.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/religion-and-asian-and-middle-eastern-studies',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24. Degree stored as "BA".
    {
      id: 'cmkr3lm2m002d7mc20lz86lxq',
      status: 'current',
      name: 'Theology and Religion',
      description: 'Understanding of the intellectual underpinning of religious traditions.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/theology-and-religion',
      requirements: [],
      checkedFor: null,
      sources: []
    }
  ]
}

export default refresh
