import type { RefreshFile } from '../lib/refresh'

/**
 * EPFL: requirements for 2027 entry.
 *
 * Exported from the database on 2026-09-30 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts epfl
 */
const refresh: RefreshFile = {
  university: 'EPFL',
  entryYear: 2027,
  checkedOn: '2026-09-30',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfja5ad004b7mqvhi3u9e7w',
      status: 'current',
      name: 'Bachelor Architecture',
      description:
        'Studies in Architecture are not structured like those in EPFL\'s other departments: the teaching relies on the perpetual dialogue between practice and theory. During their first year of studies, the students take classes dealing with the history and theory of architecture, the city and land, building techniques, as well as means of representing and modeling, all while working in parallel at the workshop in which they develop an architectural project. Sciences such as geometry and physics are also part of the training. Furthermore, the practice of an "architectural project" enables all the students to better understand theoretical teaching which in turn feeds their own reflections and their implementation in the project.',
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.epfl.ch/education/bachelor/programs/architecture/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'CS'], level: 'HL', grade: 4, critical: true },
        { courses: ['ECON', 'GEOG', 'HIST', 'PHIL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.epfl.ch/education/admission/admission-2/bachelor-admission-criteria-and-application/',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.epfl.ch/education/bachelor/programs/architecture/'
      ],
      notes:
        'EPFL\'s Bachelor admission criteria: an IB with Mathematics (AA and AI both accepted), Physics and one of Chemistry, Biology or Computer Science at HL; a first and a second modern language and one of History, Geography, Economics or Philosophy at SL or HL; at least 38 out of 42 points excluding bonus points (stored as published, out of 42), and at least 6 in Mathematics and Physics. No grade is named for the third HL subject, so 4 (the stored 5 had no source); it and the History/Geography/Economics/Philosophy subject are now required. The two modern languages are not stored: every Diploma has two languages, though a classical one (Latin, Classical Greek) would not count. The page says its criteria "are valid for the ongoing year" and swissuniversities\' list is for 2026/27, so stamped 2026. Since 2025, and for at least four years, first-year places are capped at 3,000 and IB applicants are ranked on their total points, so 38 is a floor, not an offer. French at B2 is required (C1 recommended).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfj9yru00017mqvl5meo9bs',
      status: 'current',
      name: 'Bachelor Chemistry and Chemical Engineering',
      description:
        "During the first year, classes concentrate on the basics of chemistry and biochemistry, as well as on the tools of mathematics and physics. During the second and third years, students tackle more specific subjects such as organic reactions, physical chemistry, coordination chemistry, and analytic methods. The third and final year includes optional modules which enable them to deepen their knowledge of different fields such as synthesis, biochemistry, modeling, and chemical engineering, and to prepare for the Master's program of their choice. The program places great importance on practical work: throughout the studies, at least one day a week is set aside for laboratory work or projects.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.epfl.ch/education/bachelor/programs/chemistry-and-chemical-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'CS'], level: 'HL', grade: 4, critical: true },
        { courses: ['ECON', 'GEOG', 'HIST', 'PHIL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.epfl.ch/education/admission/admission-2/bachelor-admission-criteria-and-application/',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.epfl.ch/education/bachelor/programs/chemistry-and-chemical-engineering/'
      ],
      notes:
        'EPFL\'s Bachelor admission criteria: an IB with Mathematics (AA and AI both accepted), Physics and one of Chemistry, Biology or Computer Science at HL; a first and a second modern language and one of History, Geography, Economics or Philosophy at SL or HL; at least 38 out of 42 points excluding bonus points (stored as published, out of 42), and at least 6 in Mathematics and Physics. No grade is named for the third HL subject, so 4 (the stored 5 had no source); it and the History/Geography/Economics/Philosophy subject are now required. The two modern languages are not stored: every Diploma has two languages, though a classical one (Latin, Classical Greek) would not count. The page says its criteria "are valid for the ongoing year" and swissuniversities\' list is for 2026/27, so stamped 2026. Since 2025, and for at least four years, first-year places are capped at 3,000 and IB applicants are ranked on their total points, so 38 is a floor, not an offer. French at B2 is required (C1 recommended).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfja3zp003j7mqvckk9idzc',
      status: 'current',
      name: 'Bachelor Civil Engineering',
      description:
        "During the Bachelor's studies, the training in basic sciences (mathematics and physics) is spread out over all three years of studies, thus allowing the students to tackle a good number of specific civil engineering classes even in the first year (statics, geology, structures, materials). The second and third years include classes in soil and fluid mechanics, structures (concrete, metal, etc.), and hydraulics, ending with a first project applying and synthesizing the knowledge that has been gained.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.epfl.ch/education/bachelor/programs/civil-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'CS'], level: 'HL', grade: 4, critical: true },
        { courses: ['ECON', 'GEOG', 'HIST', 'PHIL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.epfl.ch/education/admission/admission-2/bachelor-admission-criteria-and-application/',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.epfl.ch/education/bachelor/programs/civil-engineering/'
      ],
      notes:
        'EPFL\'s Bachelor admission criteria: an IB with Mathematics (AA and AI both accepted), Physics and one of Chemistry, Biology or Computer Science at HL; a first and a second modern language and one of History, Geography, Economics or Philosophy at SL or HL; at least 38 out of 42 points excluding bonus points (stored as published, out of 42), and at least 6 in Mathematics and Physics. No grade is named for the third HL subject, so 4 (the stored 5 had no source); it and the History/Geography/Economics/Philosophy subject are now required. The two modern languages are not stored: every Diploma has two languages, though a classical one (Latin, Classical Greek) would not count. The page says its criteria "are valid for the ongoing year" and swissuniversities\' list is for 2026/27, so stamped 2026. Since 2025, and for at least four years, first-year places are capped at 3,000 and IB applicants are ranked on their total points, so 38 is a floor, not an offer. French at B2 is required (C1 recommended).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfja0w4001l7mqv7lfcf1cv',
      status: 'current',
      name: 'Bachelor Communication Systems',
      description:
        'The training for communication systems engineers is founded on mathematics, computer science, electricity, and telecommunications. This study program promotes the opportunity to spend a year in a foreign university which can be chosen from the large number of institutions EPFL has frequent student exchanges with. Classes during the 1st year are given jointly to Computer Science students and Communication systems students. They all receive the fundamental basics in mathematics, computer science, and information science.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.epfl.ch/education/bachelor/programs/communication-systems/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'CS'], level: 'HL', grade: 4, critical: true },
        { courses: ['ECON', 'GEOG', 'HIST', 'PHIL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.epfl.ch/education/admission/admission-2/bachelor-admission-criteria-and-application/',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.epfl.ch/education/bachelor/programs/communication-systems/'
      ],
      notes:
        'EPFL\'s Bachelor admission criteria: an IB with Mathematics (AA and AI both accepted), Physics and one of Chemistry, Biology or Computer Science at HL; a first and a second modern language and one of History, Geography, Economics or Philosophy at SL or HL; at least 38 out of 42 points excluding bonus points (stored as published, out of 42), and at least 6 in Mathematics and Physics. No grade is named for the third HL subject, so 4 (the stored 5 had no source); it and the History/Geography/Economics/Philosophy subject are now required. The two modern languages are not stored: every Diploma has two languages, though a classical one (Latin, Classical Greek) would not count. The page says its criteria "are valid for the ongoing year" and swissuniversities\' list is for 2026/27, so stamped 2026. Since 2025, and for at least four years, first-year places are capped at 3,000 and IB applicants are ranked on their total points, so 38 is a floor, not an offer. French at B2 is required (C1 recommended).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfja09a00177mqv7gzavsqn',
      status: 'current',
      name: 'Bachelor Computer Science',
      description:
        'By deciding to study computer science at EPFL, students receive broad training focusing on the entirety of a field that is constantly changing. They tackle every aspect related to developing innovative applications, from the choice of system components to the definition of the architecture, by way of the specification and the implementation of its functionalities. Furthermore, they have the opportunity to evolve within an environment in which there are countless examples of the uses of their future specialization.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.epfl.ch/education/bachelor/programs/computer-science/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'CS'], level: 'HL', grade: 4, critical: true },
        { courses: ['ECON', 'GEOG', 'HIST', 'PHIL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.epfl.ch/education/admission/admission-2/bachelor-admission-criteria-and-application/',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.epfl.ch/education/bachelor/programs/computer-science/'
      ],
      notes:
        'EPFL\'s Bachelor admission criteria: an IB with Mathematics (AA and AI both accepted), Physics and one of Chemistry, Biology or Computer Science at HL; a first and a second modern language and one of History, Geography, Economics or Philosophy at SL or HL; at least 38 out of 42 points excluding bonus points (stored as published, out of 42), and at least 6 in Mathematics and Physics. No grade is named for the third HL subject, so 4 (the stored 5 had no source); it and the History/Geography/Economics/Philosophy subject are now required. The two modern languages are not stored: every Diploma has two languages, though a classical one (Latin, Classical Greek) would not count. The page says its criteria "are valid for the ongoing year" and swissuniversities\' list is for 2026/27, so stamped 2026. Since 2025, and for at least four years, first-year places are capped at 3,000 and IB applicants are ranked on their total points, so 38 is a floor, not an offer. French at B2 is required (C1 recommended).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfja1jo001z7mqv9tv20k10',
      status: 'current',
      name: 'Bachelor Electrical and Electronic Engineering',
      description:
        "Once the scientific basics have been acquired during the first year of the Bachelor's studies, the curriculum offers general classes on electronics, circuits and systems, and signal processing. This training is complemented by practical work in laboratories, as well as projects. During the final year, the students choose two out of three areas which make up the core of their training: micro- and nano-electronics, information technologies, and energy.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.epfl.ch/education/bachelor/programs/electrical-and-electronic-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'CS'], level: 'HL', grade: 4, critical: true },
        { courses: ['ECON', 'GEOG', 'HIST', 'PHIL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.epfl.ch/education/admission/admission-2/bachelor-admission-criteria-and-application/',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.epfl.ch/education/bachelor/programs/electrical-and-electronic-engineering/'
      ],
      notes:
        'EPFL\'s Bachelor admission criteria: an IB with Mathematics (AA and AI both accepted), Physics and one of Chemistry, Biology or Computer Science at HL; a first and a second modern language and one of History, Geography, Economics or Philosophy at SL or HL; at least 38 out of 42 points excluding bonus points (stored as published, out of 42), and at least 6 in Mathematics and Physics. No grade is named for the third HL subject, so 4 (the stored 5 had no source); it and the History/Geography/Economics/Philosophy subject are now required. The two modern languages are not stored: every Diploma has two languages, though a classical one (Latin, Classical Greek) would not count. The page says its criteria "are valid for the ongoing year" and swissuniversities\' list is for 2026/27, so stamped 2026. Since 2025, and for at least four years, first-year places are capped at 3,000 and IB applicants are ranked on their total points, so 38 is a floor, not an offer. French at B2 is required (C1 recommended).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfja5ud004p7mqvuwg0hlqu',
      status: 'current',
      name: 'Bachelor Environmental Sciences and Engineering',
      description:
        'The students acquire the fundamental scientific basics in mathematics and physics during their first year of studies. The following two years include general training in environmental science (environmental chemistry, microbiology, soil science, atmospheric physicochemistry, etc.) on the one hand, and classes devoted to engineering techniques (hydrology for engineers, sanitary engineering, water and waste management, quantitative methods, etc.) on the other. This joint program is complemented by a choice of optional classes.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.epfl.ch/education/bachelor/programs/environmental-sciences-and-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'CS'], level: 'HL', grade: 4, critical: true },
        { courses: ['ECON', 'GEOG', 'HIST', 'PHIL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.epfl.ch/education/admission/admission-2/bachelor-admission-criteria-and-application/',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.epfl.ch/education/bachelor/programs/environmental-sciences-and-engineering/'
      ],
      notes:
        'EPFL\'s Bachelor admission criteria: an IB with Mathematics (AA and AI both accepted), Physics and one of Chemistry, Biology or Computer Science at HL; a first and a second modern language and one of History, Geography, Economics or Philosophy at SL or HL; at least 38 out of 42 points excluding bonus points (stored as published, out of 42), and at least 6 in Mathematics and Physics. No grade is named for the third HL subject, so 4 (the stored 5 had no source); it and the History/Geography/Economics/Philosophy subject are now required. The two modern languages are not stored: every Diploma has two languages, though a classical one (Latin, Classical Greek) would not count. The page says its criteria "are valid for the ongoing year" and swissuniversities\' list is for 2026/27, so stamped 2026. Since 2025, and for at least four years, first-year places are capped at 3,000 and IB applicants are ranked on their total points, so 38 is a floor, not an offer. French at B2 is required (C1 recommended).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfja4m0003x7mqvf5v099nj',
      status: 'current',
      name: 'Bachelor Life Sciences Engineering',
      description:
        "The Bachelor's studies strongly emphasize mathematics and physics, since these two subjects account for almost half of the classes taken during the first and second year. Computer science also has a prominent place. There are also classes in molecular and cellular biology, as well as chemistry. During the third year, the curriculum offers units in engineering, with classes in electronics for example, and in biosciences, in which a deeper knowledge is gained of subjects such as systems physiology. The students can also choose options like genetics, developmental biology, as well as artificial intelligence or structural mechanics.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.epfl.ch/education/bachelor/programs/life-sciences-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'CS'], level: 'HL', grade: 4, critical: true },
        { courses: ['ECON', 'GEOG', 'HIST', 'PHIL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.epfl.ch/education/admission/admission-2/bachelor-admission-criteria-and-application/',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.epfl.ch/education/bachelor/programs/life-sciences-engineering/'
      ],
      notes:
        'EPFL\'s Bachelor admission criteria: an IB with Mathematics (AA and AI both accepted), Physics and one of Chemistry, Biology or Computer Science at HL; a first and a second modern language and one of History, Geography, Economics or Philosophy at SL or HL; at least 38 out of 42 points excluding bonus points (stored as published, out of 42), and at least 6 in Mathematics and Physics. No grade is named for the third HL subject, so 4 (the stored 5 had no source); it and the History/Geography/Economics/Philosophy subject are now required. The two modern languages are not stored: every Diploma has two languages, though a classical one (Latin, Classical Greek) would not count. The page says its criteria "are valid for the ongoing year" and swissuniversities\' list is for 2026/27, so stamped 2026. Since 2025, and for at least four years, first-year places are capped at 3,000 and IB applicants are ranked on their total points, so 38 is a floor, not an offer. French at B2 is required (C1 recommended).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfja3dx00357mqvurq6c5yo',
      status: 'current',
      name: 'Bachelor Materials Science and Engineering',
      description:
        'In addition to the objective of providing the students with a solid foundation in mathematics, physics, and chemistry, the program tackles the different types of materials – metals, ceramics, polymers, and composites – as well as analytical and characterization methods. They deal with the structure and properties of materials, the underlying principles of their different transformations, and development technologies. During their final year, the students carry out a research project in the laboratory of their choice.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.epfl.ch/education/bachelor/programs/materials-science-and-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'CS'], level: 'HL', grade: 4, critical: true },
        { courses: ['ECON', 'GEOG', 'HIST', 'PHIL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.epfl.ch/education/admission/admission-2/bachelor-admission-criteria-and-application/',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.epfl.ch/education/bachelor/programs/materials-science-and-engineering/'
      ],
      notes:
        'EPFL\'s Bachelor admission criteria: an IB with Mathematics (AA and AI both accepted), Physics and one of Chemistry, Biology or Computer Science at HL; a first and a second modern language and one of History, Geography, Economics or Philosophy at SL or HL; at least 38 out of 42 points excluding bonus points (stored as published, out of 42), and at least 6 in Mathematics and Physics. No grade is named for the third HL subject, so 4 (the stored 5 had no source); it and the History/Geography/Economics/Philosophy subject are now required. The two modern languages are not stored: every Diploma has two languages, though a classical one (Latin, Classical Greek) would not count. The page says its criteria "are valid for the ongoing year" and swissuniversities\' list is for 2026/27, so stamped 2026. Since 2025, and for at least four years, first-year places are capped at 3,000 and IB applicants are ranked on their total points, so 38 is a floor, not an offer. French at B2 is required (C1 recommended).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfj9za4000f7mqv18q48siv',
      status: 'current',
      name: 'Bachelor Mathematics',
      description:
        "The basics of analysis, geometry, linear algebra, and general physics are acquired during the first year of the Bachelor's degree. Teaching then continues with the inclusion of new branches such as topology, operations research, probability, statistics, and numerical analysis. During the third year, the students can choose all of their classes. They also carry out two semester projects. Their degree therefore has a personal touch which serves them well in choosing a Master's program.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.epfl.ch/education/bachelor/programs/mathematics/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'CS'], level: 'HL', grade: 4, critical: true },
        { courses: ['ECON', 'GEOG', 'HIST', 'PHIL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.epfl.ch/education/admission/admission-2/bachelor-admission-criteria-and-application/',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.epfl.ch/education/bachelor/programs/mathematics/'
      ],
      notes:
        'EPFL\'s Bachelor admission criteria: an IB with Mathematics (AA and AI both accepted), Physics and one of Chemistry, Biology or Computer Science at HL; a first and a second modern language and one of History, Geography, Economics or Philosophy at SL or HL; at least 38 out of 42 points excluding bonus points (stored as published, out of 42), and at least 6 in Mathematics and Physics. No grade is named for the third HL subject, so 4 (the stored 5 had no source); it and the History/Geography/Economics/Philosophy subject are now required. The two modern languages are not stored: every Diploma has two languages, though a classical one (Latin, Classical Greek) would not count. The page says its criteria "are valid for the ongoing year" and swissuniversities\' list is for 2026/27, so stamped 2026. Since 2025, and for at least four years, first-year places are capped at 3,000 and IB applicants are ranked on their total points, so 38 is a floor, not an offer. French at B2 is required (C1 recommended).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfja282002d7mqvnd8e0190',
      status: 'current',
      name: 'Bachelor Mechanical Engineering',
      description:
        "The first year of the Bachelor's studies is mainly focused on acquiring scientific tools, such as analysis or physics, and complemented by some more specific classes ranging from introduction to mechanical engineering to statics or metals and alloys. The second and third years provide an in-depth treatment of the foundations of mechanical engineering, from automatic-control engineering to thermodynamics and vibration mechanics. A final Bachelor's project, bringing together the different theoretical topics, completes the undergraduate degree.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.epfl.ch/education/bachelor/programs/mechanical-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'CS'], level: 'HL', grade: 4, critical: true },
        { courses: ['ECON', 'GEOG', 'HIST', 'PHIL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.epfl.ch/education/admission/admission-2/bachelor-admission-criteria-and-application/',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.epfl.ch/education/bachelor/programs/mechanical-engineering/'
      ],
      notes:
        'EPFL\'s Bachelor admission criteria: an IB with Mathematics (AA and AI both accepted), Physics and one of Chemistry, Biology or Computer Science at HL; a first and a second modern language and one of History, Geography, Economics or Philosophy at SL or HL; at least 38 out of 42 points excluding bonus points (stored as published, out of 42), and at least 6 in Mathematics and Physics. No grade is named for the third HL subject, so 4 (the stored 5 had no source); it and the History/Geography/Economics/Philosophy subject are now required. The two modern languages are not stored: every Diploma has two languages, though a classical one (Latin, Classical Greek) would not count. The page says its criteria "are valid for the ongoing year" and swissuniversities\' list is for 2026/27, so stamped 2026. Since 2025, and for at least four years, first-year places are capped at 3,000 and IB applicants are ranked on their total points, so 38 is a floor, not an offer. French at B2 is required (C1 recommended).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfja2tm002r7mqvjd0voa3j',
      status: 'current',
      name: 'Bachelor Microengineering',
      description:
        "The first year of the Bachelor's studies is mainly given to the acquisition of the scientific tools such as analysis or physics. The students also come into contact with practical realities with, among other things, the CAD project for which they design an object that they will develop during a processing internship during the second year of studies. The undergraduate program then covers all microtechnological sciences and is grouped around topics such as control systems, electronics and photonics, products and production. A first project completes the training.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.epfl.ch/education/bachelor/programs/microengineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'CS'], level: 'HL', grade: 4, critical: true },
        { courses: ['ECON', 'GEOG', 'HIST', 'PHIL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.epfl.ch/education/admission/admission-2/bachelor-admission-criteria-and-application/',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.epfl.ch/education/bachelor/programs/microengineering/'
      ],
      notes:
        'EPFL\'s Bachelor admission criteria: an IB with Mathematics (AA and AI both accepted), Physics and one of Chemistry, Biology or Computer Science at HL; a first and a second modern language and one of History, Geography, Economics or Philosophy at SL or HL; at least 38 out of 42 points excluding bonus points (stored as published, out of 42), and at least 6 in Mathematics and Physics. No grade is named for the third HL subject, so 4 (the stored 5 had no source); it and the History/Geography/Economics/Philosophy subject are now required. The two modern languages are not stored: every Diploma has two languages, though a classical one (Latin, Classical Greek) would not count. The page says its criteria "are valid for the ongoing year" and swissuniversities\' list is for 2026/27, so stamped 2026. Since 2025, and for at least four years, first-year places are capped at 3,000 and IB applicants are ranked on their total points, so 38 is a floor, not an offer. French at B2 is required (C1 recommended).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfj9zrl000t7mqvzxq7p5nj',
      status: 'current',
      name: 'Bachelor Physics',
      description:
        'Physicists are both researchers and managers of projects and of teams working on solving concrete technical problems. Their general training opens up career prospects every bit as broad as the field of investigation of the chosen specialization. Fundamental research, applied research in the field of specialized technology, the management of companies or public institutions, and teaching are among the many possible career options in which physicists are able to progress according to their goals and field of expertise. While being rooted in the practical, training in physics requires good mathematical skills, a marked taste for scientific rigor, and a penchant for conceptualization and abstraction.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.epfl.ch/education/bachelor/programs/physics/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'CS'], level: 'HL', grade: 4, critical: true },
        { courses: ['ECON', 'GEOG', 'HIST', 'PHIL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.epfl.ch/education/admission/admission-2/bachelor-admission-criteria-and-application/',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.epfl.ch/education/bachelor/programs/physics/'
      ],
      notes:
        'EPFL\'s Bachelor admission criteria: an IB with Mathematics (AA and AI both accepted), Physics and one of Chemistry, Biology or Computer Science at HL; a first and a second modern language and one of History, Geography, Economics or Philosophy at SL or HL; at least 38 out of 42 points excluding bonus points (stored as published, out of 42), and at least 6 in Mathematics and Physics. No grade is named for the third HL subject, so 4 (the stored 5 had no source); it and the History/Geography/Economics/Philosophy subject are now required. The two modern languages are not stored: every Diploma has two languages, though a classical one (Latin, Classical Greek) would not count. The page says its criteria "are valid for the ongoing year" and swissuniversities\' list is for 2026/27, so stamped 2026. Since 2025, and for at least four years, first-year places are capped at 3,000 and IB applicants are ranked on their total points, so 38 is a floor, not an offer. French at B2 is required (C1 recommended).'
    }
  ]
}

export default refresh
