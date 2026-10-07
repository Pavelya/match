import type { RefreshFile } from '../lib/refresh'

/**
 * Technical University of Munich: requirements for 2027 entry.
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
 * study: every program here is unchecked, so only a changed `field` is written. Phase 7 (Germany)
 * decides how these programs are checked.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts technical-university-of-munich
 */
const refresh: RefreshFile = {
  university: 'Technical University of Munich',
  entryYear: 2027,
  checkedOn: '2026-10-07',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraesrw00017mjvod7hjlpw',
      status: 'current',
      name: 'Aerospace',
      description:
        'Start your personal "Mission Earth" with the Bachelor\'s Program Aerospace. This study degree program of 6 semesters (3 years) is fully taught in English and is the ideal entry to the global topic of aeronautics and astronautics.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Garching, Ottobrunn
      campusCity: 'Garching',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/aerospace-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafc5s00en7mjvgyl1icl5',
      status: 'current',
      name: 'Agricultural Sciences and Horticultural Sciences',
      description:
        "The bachelor's program in Agricultural Sciences and Horticultural Sciences deals with processes of plant and animal production, and associated fundamentals relating to the natural sciences, economics, and ecology.",
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Weihenstephan (Freising)
      campusCity: 'Freising',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/agricultural-and-horticultural-sciences-bachelor-of-science-bsc',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmkrafx5400ux7mjvkm022v0s',
      status: 'current',
      name: 'Architecture',
      description:
        "The bachelor's degree program in Architecture provides a sound foundation in the knowledge and techniques required for the fields in which modern architects work today.",
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/architecture-bachelor-of-arts-ba',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        { courses: ['VISUAL-ARTS'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafful00hh7mjvs129xbi0',
      status: 'current',
      name: 'Biochemistry',
      description:
        "The bachelor's program in Biochemistry links chemistry and biology as well as traversing the interface between chemistry, biology, and medicine.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Garching, Weihenstephan (Freising)
      campusCity: 'Garching',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/biochemistry-bachelor-of-science-bsc',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafufk00st7mjv4mz4qism',
      status: 'current',
      name: 'Bioeconomy',
      description:
        "In light of the climate crisis, scarcity of raw materials, and changing consumer behavior, the shift towards a sustainable resource and technology management is imperative. Students of the Bachelor's program in Bioeconomy learn to shape the social and economic transformation towards sustainability.",
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Straubing
      campusCity: 'Straubing',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/bioeconomy-bachelor-of-science-bsc',
      requirements: [
        { courses: ['BIO', 'CHEM', 'ESS', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        { courses: ['GEOG'], level: 'SL', grade: 5, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafqrz00pz7mjvlsevgslu',
      status: 'current',
      name: 'Bioinformatics',
      description:
        "Health, pharma, and biotechnology are of outstanding social and economic importance – and they rely on the systematic processing of biological data. Students on the Bachelor's degree program in Bioinformatics learn to analyze this data and to make it applicable.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/bioinformatics-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraeyh300477mjvlwgz7j4m',
      status: 'current',
      name: 'Brewing and Beverage Technology',
      description:
        "The Bachelor's program Brewing and Beverage Technology deals with the engineering, biological, technological and biochemical processes of beverage production and brewing.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Weihenstephan (Freising)
      campusCity: 'Freising',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/brewing-and-beverage-technology-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafem200gj7mjvkq16j80p',
      status: 'current',
      name: 'Chemical Biotechnology',
      description:
        "Chemical biotechnology is key in the sustainable and resource-conserving design of goods and value chains. Students of the Bachelor's degree program in Chemical Biotechnology learn to understand and analyze biogenic materials, tools, and processes and to put them to use for industrial purposes.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Straubing
      campusCity: 'Straubing',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/chemical-biotechnology-bachelor-of-science-bsc',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraewab002j7mjv7xrwzyom',
      status: 'current',
      name: 'Chemical Engineering',
      description:
        "The bachelor's program in Chemical Engineering traverses the interface between the natural sciences and engineering.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Garching
      campusCity: 'Garching',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/chemical-engineering-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Engineering (B.Eng.)".
    {
      id: 'cmkraexci003d7mjvujybfiyj',
      status: 'current',
      name: 'Chemical Engineering (Joint Degree with SIT)',
      description:
        'Jointly awarded by TUM and Singapore Institute of Technology (SIT), the Bachelor of Engineering with Honours in Chemical Engineering is a four-year degree program. This joint degree equips students with relevant Industry 4.0 skillsets to thrive in the local and global chemical industry.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Singapore, at TUM Asia; the country stays Germany (owner)
      campusCity: 'Singapore',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/chemical-engineering-bachelor-of-engineering-beng',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafddd00fl7mjv9uyk4bkg',
      status: 'current',
      name: 'Chemistry',
      description:
        "The bachelor's degree in Chemistry offers a well founded education in a broad range of chemical disciplines.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Garching
      campusCity: 'Garching',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/chemistry-bachelor-of-science-bsc',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraev4l001p7mjvftousj62',
      status: 'current',
      name: 'Civil Engineering',
      description:
        "Whether it's climate-friendly construction, sustainable mobility, or attractive living spaces – the challenges of our time cannot be met without outstanding civil engineers. In this program, students learn to develop safe, economical, and sustainable structures and infrastructures.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/civil-engineering-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraetys000v7mjvetnfie2y',
      status: 'current',
      name: 'Electrical Engineering and Information Technology',
      description:
        'Industry 4.0, chip design or AI – innovations to solve key challenges are unthinkable without Electrical Engineering and Information Technology. Students on the course learn to develop, design and manufacture devices, equipment and systems according to the specific requirements.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/electrical-engineering-and-information-technology-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Engineering (B.Eng.)".
    {
      id: 'cmkraezlf00517mjvalf8bv2n',
      status: 'current',
      name: 'Electronics and Data Engineering (Joint Degree with SIT)',
      description:
        'Jointly awarded by TUM and Singapore Institute of Technology (SIT), the Bachelor of Engineering with Honours in Electronics and Data Engineering is a four-year degree programme. This programme is aimed to equip students with the necessary skills and competencies in the emerging digital workforce.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Singapore, at TUM Asia; the country stays Germany (owner)
      campusCity: 'Singapore',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/electronics-and-data-engineering-bachelor-of-engineering-beng',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf0pq005v7mjvjcpc13si',
      status: 'current',
      name: 'Engineering and Materials Science',
      description:
        'The optimal use of materials and the development of new ones are essential to develop products that meet increasing demands in terms of performance, functionality, and sustainability. Students of the program learn to investigate, develop, and use innovative materials in line with these requirements.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/engineering-and-materials-science-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf1rd006p7mjvyf84y4iy',
      status: 'current',
      name: 'Engineering Science',
      description:
        "The Bachelor's program in Engineering Science conveys broad foundational knowledge of the discipline as well as thorough knowledge of mathematics and the natural sciences.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Garching
      campusCity: 'Garching',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/engineering-science-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf2vm007j7mjv16rwrwxm',
      status: 'current',
      name: 'Environmental Engineering',
      description:
        "The bachelor's degree program in Environmental Engineering combines a profound education in the engineering and natural sciences with interdisciplinary skills focused on the environment.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/environmental-engineering-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafh2a00if7mjvf6p1vm4h',
      status: 'current',
      name: 'Food Chemistry',
      description:
        "The bachelor's program in Food Chemistry is devoted to the development of strategies that meet the increasing need for healthy food and food security. The program also combines knowledge of the natural sciences with the life sciences.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Weihenstephan (Freising), Garching
      campusCity: 'Freising',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/food-chemistry-bachelor-of-science-bsc',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf410008d7mjvqrect2we',
      status: 'current',
      name: 'Food Technology',
      description:
        "The Bachelor's program Food Technology deals with the engineering, biological, technological and biochemical processes of the entire value chain in food production. In addition, economic aspects are covered.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Weihenstephan (Freising)
      campusCity: 'Freising',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/food-technology-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafvt900tv7mjvsbjcq384',
      status: 'current',
      name: 'Forest Science and Resource Management',
      description:
        'The program aims to teach students how to make sustainable use of resources, with reference to the example of the forest and wood as a renewable resource. In addition to well-founded specialist knowledge, this demands a comprehensive understanding of systems and extensive methodological competencies',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Weihenstephan (Freising)
      campusCity: 'Freising',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/forest-science-and-resource-management-bachelor-of-science-bsc',
      requirements: [
        { courses: ['BIO', 'CHEM', 'ESS', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        { courses: ['GEOG'], level: 'SL', grade: 5, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf55100977mjvrgd95dl7',
      status: 'current',
      name: 'Geodesy and Geoinformation',
      description:
        "The bachelor's program in Geodesy deals with the documentation of the anthroposphere through the use of surveys conducted at ground level, from the air and from outer space, as well as with the processing and representation of geoinformation.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/geodesy-and-geoinformation-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafkpc00l97mjvo5pe8bgy',
      status: 'current',
      name: 'Geosciences',
      description:
        "The Bachelor's program in Geoscience is a joint program of the Technical University of Munich and Ludwig-Maximilians-University Munich. In addition to comprehensive knowledge of the fundamentals, the program offers students the opportunity to specialize.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/geosciences-bachelor-of-science-bsc',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraflx500m77mjvcizhsjhp',
      status: 'current',
      name: 'Health Science',
      description:
        "The interdisciplinary Bachelor's program in Health Science considers human health in the context of the health system and current research conducted from a biomedical, psychological, and social perspective.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/health-sciences-bachelor-of-science-bsc',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafs0700qx7mjv0plo7uz7',
      status: 'current',
      name: 'Informatics',
      description:
        "The bachelor's program in Informatics cultivates solid theoretical, practical and technical skills. The program therefore offers the best qualification for working in a field that is constantly changing.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Garching
      campusCity: 'Garching',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/informatics-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf66v00a17mjv2hehx1zw',
      status: 'current',
      name: 'Information Engineering (Heilbronn)',
      description:
        "The Bachelor's program in Information Engineering at TUM Campus Heilbronn conveys the knowledge and skills necessary to design holistic IT systems from the sensor to the business model.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Heilbronn
      campusCity: 'Heilbronn',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/information-engineering-at-tum-campus-heilbronn-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraft8300rv7mjvhqn9ym9x',
      status: 'current',
      name: 'Information Systems',
      description:
        "The bachelor's program in Information Systems combines informatics and business administration.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Garching
      campusCity: 'Garching',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/information-systems-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafyet00vx7mjvdvewu738',
      status: 'current',
      name: 'Landscape Architecture and Landscape Planning',
      description:
        "The interdisciplinary Bachelor's program in Landscape Architecture and Landscape Planning is devoted to the interpretation, development and design of landscapes.",
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/landscape-architecture-and-landscape-planning-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        { courses: ['VISUAL-ARTS'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafi9z00jd7mjvalmmrus1',
      status: 'current',
      name: 'Life Sciences Biology',
      description:
        'The aim of the degree program is a comprehensive understanding of systems – from the biomolecule to the ecosystem – and extensive methodological expertise.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Weihenstephan (Freising)
      campusCity: 'Freising',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/life-sciences-biology-bachelor-of-science-bsc',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafjhq00kb7mjvtnqab6d1',
      status: 'current',
      name: 'Life Sciences Nutrition',
      description:
        "Organic, vegan or personalized nutrition? How can nutrition promote health and prevent diseases such as obesity, diabetes, or cancer? In the Life Sciences Nutrition Bachelor's degree program, you will learn about the influence of different foods on our body and how they control it.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Weihenstephan (Freising)
      campusCity: 'Freising',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/life-sciences-nutrition-bachelor-of-science-bsc',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf8iv00bt7mjvzegh4yv8',
      status: 'current',
      name: 'Management and Data Science',
      description:
        'Data-driven technologies, such as AI and the Internet of Things, deeply transform virtually all areas of business and the society. The Bachelor in Management and Data Science provides a flexible toolkit to holistically incorporate and use data-driven innovations for managerial decision-making.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Heilbronn
      campusCity: 'Heilbronn',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/management-and-data-science',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf9qc00cr7mjvrwr4248a',
      status: 'current',
      name: 'Management and Technology (Munich)',
      description:
        "The Bachelor's program in Management and Technology combines management courses with a specialization in technology.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/management-and-technology-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafn5500n57mjv0xaqswn4',
      status: 'current',
      name: 'Mathematics',
      description:
        "The Bachelor's program in Mathematics offers students a sound vocational education and training as well as their first chance to specialize within the discipline.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Garching
      campusCity: 'Garching',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/mathematics-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafpjy00p17mjv0q71v557',
      status: 'current',
      name: 'Molecular Biotechnology',
      description:
        "The bachelor's program in Molecular Biotechnology is devoted to the production and construction of natural as well as artificial biomolecules. In addition, it combines the basics of natural science with content from biology, biochemistry, and biotechnology.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Weihenstephan (Freising), Garching
      campusCity: 'Freising',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/molecular-biotechnology-bachelor-of-science-bsc',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkraf7b200av7mjvdtq0hn1s',
      status: 'current',
      name: 'Pharmaceutical Bioprocess Engineering',
      description:
        'Pharmaceutical Bioprocess Engineering combines scientific and engineering fundamentals for biotechnological production in the pharmaceutical industry and related fields.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Weihenstephan (Freising)
      campusCity: 'Freising',
      minIBPoints: 38,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/pharmaceutical-bioprocess-engineering-bachelor-of-science-bsc',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafoci00o37mjvbzb3ulla',
      status: 'current',
      name: 'Physics',
      description:
        "The Bachelor's program in Physics provides a wide-ranging general education in the discipline and enables students to pursue their first individual specialization.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Garching
      campusCity: 'Garching',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/physics-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['BIO', 'CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafzoe00wx7mjvx031klij',
      status: 'current',
      name: 'Political Science',
      description:
        "The Bachelor's degree program in Political Science offers a comprehensive grounding in political science with the opportunity to specialize in focus areas at the interface of politics and technology.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/political-science-bachelor-of-science-bsc',
      requirements: [
        { courses: ['ECON', 'GLOB-POL', 'HIST'], level: 'HL', grade: 5, critical: true },
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmkrafay900dp7mjvwfclpsah',
      status: 'current',
      name: 'Sustainable Management and Technology',
      description:
        'The societal interest in sustainability-oriented business grows with a changed consumer awareness and new environmental agreements. It is important for companies to master this trend towards regenerative products and this change to a climate-neutral and sustainable resource and technology management',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: tum.de "Main Locations": Straubing
      campusCity: 'Straubing',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/sustainable-management-and-technology-bachelor-of-science-bsc',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-23. Degree stored as "Bachelor of Education (B.Ed.)".
    {
      id: 'cmkrag0l300xl7mjvy5pb28d2',
      status: 'current',
      name: 'Teaching at Academic Secondary Schools (Scientific Education)',
      description:
        "This Bachelor's degree program is specifically designed for students aiming to become teachers at German academic secondary schools.",
      field: 'Education',
      degree: 'Bachelor of Education',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/teaching-at-academic-secondary-schools-scientific-education-bachelor-of-education-bed',
      requirements: [
        { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: false
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    }
  ]
}

export default refresh
