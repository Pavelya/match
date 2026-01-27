/**
 * Seed Technical University of Munich Programs to Database
 *
 * Adds undergraduate programs for Technical University of Munich with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source: docs/countries/germany-ib-requirements.md
 * All descriptions extracted directly from TUM website.
 *
 * Prerequisites: Technical University of Munich must exist in the database.
 *
 * Run with: npx tsx scripts/programs/seed-tum-programs.ts
 */

import { PrismaClient, CourseLevel } from '@prisma/client'

const prisma = new PrismaClient()

interface RequirementDef {
  courses: string[]
  level: CourseLevel
  grade: number
  critical?: boolean
}

interface ProgramDef {
  name: string
  description: string
  field: string
  degree: string
  duration: string
  minIBPoints: number
  programUrl: string
  requirements: RequirementDef[]
}

const programs: ProgramDef[] = [
  // ============================================
  // ENGINEERING PROGRAMS
  // ============================================
  {
    name: 'Aerospace',
    description:
      'Start your personal "Mission Earth" with the Bachelor\'s Program Aerospace. This study degree program of 6 semesters (3 years) is fully taught in English and is the ideal entry to the global topic of aeronautics and astronautics.',
    field: 'Engineering',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/aerospace-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Electrical Engineering and Information Technology',
    description:
      'Industry 4.0, chip design or AI – innovations to solve key challenges are unthinkable without Electrical Engineering and Information Technology. Students on the course learn to develop, design and manufacture devices, equipment and systems according to the specific requirements.',
    field: 'Engineering',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/electrical-engineering-and-information-technology-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Civil Engineering',
    description:
      "Whether it's climate-friendly construction, sustainable mobility, or attractive living spaces – the challenges of our time cannot be met without outstanding civil engineers. In this program, students learn to develop safe, economical, and sustainable structures and infrastructures.",
    field: 'Engineering',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/civil-engineering-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Chemical Engineering',
    description:
      "The bachelor's program in Chemical Engineering traverses the interface between the natural sciences and engineering.",
    field: 'Engineering',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/chemical-engineering-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Chemical Engineering (Joint Degree with SIT)',
    description:
      'Jointly awarded by TUM and Singapore Institute of Technology (SIT), the Bachelor of Engineering with Honours in Chemical Engineering is a four-year degree program. This joint degree equips students with relevant Industry 4.0 skillsets to thrive in the local and global chemical industry.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering (B.Eng.)',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/chemical-engineering-bachelor-of-engineering-beng',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Brewing and Beverage Technology',
    description:
      "The Bachelor's program Brewing and Beverage Technology deals with the engineering, biological, technological and biochemical processes of beverage production and brewing.",
    field: 'Engineering',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/brewing-and-beverage-technology-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Electronics and Data Engineering (Joint Degree with SIT)',
    description:
      'Jointly awarded by TUM and Singapore Institute of Technology (SIT), the Bachelor of Engineering with Honours in Electronics and Data Engineering is a four-year degree programme. This programme is aimed to equip students with the necessary skills and competencies in the emerging digital workforce.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering (B.Eng.)',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/electronics-and-data-engineering-bachelor-of-engineering-beng',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Engineering and Materials Science',
    description:
      'The optimal use of materials and the development of new ones are essential to develop products that meet increasing demands in terms of performance, functionality, and sustainability. Students of the program learn to investigate, develop, and use innovative materials in line with these requirements.',
    field: 'Engineering',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/engineering-and-materials-science-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Engineering Science',
    description:
      "The Bachelor's program in Engineering Science conveys broad foundational knowledge of the discipline as well as thorough knowledge of mathematics and the natural sciences.",
    field: 'Engineering',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/engineering-science-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Environmental Engineering',
    description:
      "The bachelor's degree program in Environmental Engineering combines a profound education in the engineering and natural sciences with interdisciplinary skills focused on the environment.",
    field: 'Engineering',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/environmental-engineering-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Food Technology',
    description:
      "The Bachelor's program Food Technology deals with the engineering, biological, technological and biochemical processes of the entire value chain in food production. In addition, economic aspects are covered.",
    field: 'Engineering',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/food-technology-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Geodesy and Geoinformation',
    description:
      "The bachelor's program in Geodesy deals with the documentation of the anthroposphere through the use of surveys conducted at ground level, from the air and from outer space, as well as with the processing and representation of geoinformation.",
    field: 'Engineering',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/geodesy-and-geoinformation-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Information Engineering (Heilbronn)',
    description:
      "The Bachelor's program in Information Engineering at TUM Campus Heilbronn conveys the knowledge and skills necessary to design holistic IT systems from the sensor to the business model.",
    field: 'Engineering',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/information-engineering-at-tum-campus-heilbronn-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Pharmaceutical Bioprocess Engineering',
    description:
      'Pharmaceutical Bioprocess Engineering combines scientific and engineering fundamentals for biotechnological production in the pharmaceutical industry and related fields.',
    field: 'Engineering',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/pharmaceutical-bioprocess-engineering-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },

  // ============================================
  // BUSINESS & ECONOMICS PROGRAMS
  // ============================================
  {
    name: 'Management and Data Science',
    description:
      'Data-driven technologies, such as AI and the Internet of Things, deeply transform virtually all areas of business and the society. The Bachelor in Management and Data Science provides a flexible toolkit to holistically incorporate and use data-driven innovations for managerial decision-making.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl: 'https://www.tum.de/en/studies/degree-programs/detail/management-and-data-science',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Management and Technology (Munich)',
    description:
      "The Bachelor's program in Management and Technology combines management courses with a specialization in technology.",
    field: 'Business & Economics',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/management-and-technology-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Sustainable Management and Technology',
    description:
      'The societal interest in sustainability-oriented business grows with a changed consumer awareness and new environmental agreements. It is important for companies to master this trend towards regenerative products and this change to a climate-neutral and sustainable resource and technology management',
    field: 'Business & Economics',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/sustainable-management-and-technology-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
    ]
  },

  // ============================================
  // NATURAL SCIENCES PROGRAMS
  // ============================================
  {
    name: 'Agricultural Sciences and Horticultural Sciences',
    description:
      "The bachelor's program in Agricultural Sciences and Horticultural Sciences deals with processes of plant and animal production, and associated fundamentals relating to the natural sciences, economics, and ecology.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/agricultural-and-horticultural-sciences-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Chemistry',
    description:
      "The bachelor's degree in Chemistry offers a well founded education in a broad range of chemical disciplines.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/chemistry-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Chemical Biotechnology',
    description:
      "Chemical biotechnology is key in the sustainable and resource-conserving design of goods and value chains. Students of the Bachelor's degree program in Chemical Biotechnology learn to understand and analyze biogenic materials, tools, and processes and to put them to use for industrial purposes.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/chemical-biotechnology-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Biochemistry',
    description:
      "The bachelor's program in Biochemistry links chemistry and biology as well as traversing the interface between chemistry, biology, and medicine.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/biochemistry-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Food Chemistry',
    description:
      "The bachelor's program in Food Chemistry is devoted to the development of strategies that meet the increasing need for healthy food and food security. The program also combines knowledge of the natural sciences with the life sciences.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/food-chemistry-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Life Sciences Biology',
    description:
      'The aim of the degree program is a comprehensive understanding of systems – from the biomolecule to the ecosystem – and extensive methodological expertise.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/life-sciences-biology-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Life Sciences Nutrition',
    description:
      "Organic, vegan or personalized nutrition? How can nutrition promote health and prevent diseases such as obesity, diabetes, or cancer? In the Life Sciences Nutrition Bachelor's degree program, you will learn about the influence of different foods on our body and how they control it.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/life-sciences-nutrition-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Geosciences',
    description:
      "The Bachelor's program in Geoscience is a joint program of the Technical University of Munich and Ludwig-Maximilians-University Munich. In addition to comprehensive knowledge of the fundamentals, the program offers students the opportunity to specialize.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/geosciences-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },

  // ============================================
  // MEDICINE & HEALTH PROGRAMS
  // ============================================
  {
    name: 'Health Science',
    description:
      "The interdisciplinary Bachelor's program in Health Science considers human health in the context of the health system and current research conducted from a biomedical, psychological, and social perspective.",
    field: 'Medicine & Health',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/health-sciences-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Mathematics',
    description:
      "The Bachelor's program in Mathematics offers students a sound vocational education and training as well as their first chance to specialize within the discipline.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/mathematics-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Physics',
    description:
      "The Bachelor's program in Physics provides a wide-ranging general education in the discipline and enables students to pursue their first individual specialization.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/physics-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
      { courses: ['CHEM', 'BIO'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Molecular Biotechnology',
    description:
      "The bachelor's program in Molecular Biotechnology is devoted to the production and construction of natural as well as artificial biomolecules. In addition, it combines the basics of natural science with content from biology, biochemistry, and biotechnology.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/molecular-biotechnology-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },

  // ============================================
  // COMPUTER SCIENCE PROGRAMS
  // ============================================
  {
    name: 'Bioinformatics',
    description:
      "Health, pharma, and biotechnology are of outstanding social and economic importance – and they rely on the systematic processing of biological data. Students on the Bachelor's degree program in Bioinformatics learn to analyze this data and to make it applicable.",
    field: 'Computer Science',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/bioinformatics-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Informatics',
    description:
      "The bachelor's program in Informatics cultivates solid theoretical, practical and technical skills. The program therefore offers the best qualification for working in a field that is constantly changing.",
    field: 'Computer Science',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/informatics-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Information Systems',
    description:
      "The bachelor's program in Information Systems combines informatics and business administration.",
    field: 'Computer Science',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/information-systems-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
    ]
  },

  // ============================================
  // ENVIRONMENTAL STUDIES PROGRAMS
  // ============================================
  {
    name: 'Bioeconomy',
    description:
      "In light of the climate crisis, scarcity of raw materials, and changing consumer behavior, the shift towards a sustainable resource and technology management is imperative. Students of the Bachelor's program in Bioeconomy learn to shape the social and economic transformation towards sustainability.",
    field: 'Environmental Studies',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/bioeconomy-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['BIO', 'CHEM', 'PHYS', 'ESS'], level: 'HL', grade: 5, critical: true },
      { courses: ['GEOG'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Forest Science and Resource Management',
    description:
      'The program aims to teach students how to make sustainable use of resources, with reference to the example of the forest and wood as a renewable resource. In addition to well-founded specialist knowledge, this demands a comprehensive understanding of systems and extensive methodological competencies',
    field: 'Environmental Studies',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/forest-science-and-resource-management-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['BIO', 'CHEM', 'PHYS', 'ESS'], level: 'HL', grade: 5, critical: true },
      { courses: ['GEOG'], level: 'SL', grade: 5 }
    ]
  },

  // ============================================
  // ARCHITECTURE PROGRAMS
  // ============================================
  {
    name: 'Architecture',
    description:
      "The bachelor's degree program in Architecture provides a sound foundation in the knowledge and techniques required for the fields in which modern architects work today.",
    field: 'Architecture',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/architecture-bachelor-of-arts-ba',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['VISUAL-ARTS'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Landscape Architecture and Landscape Planning',
    description:
      "The interdisciplinary Bachelor's program in Landscape Architecture and Landscape Planning is devoted to the interpretation, development and design of landscapes.",
    field: 'Architecture',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/landscape-architecture-and-landscape-planning-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['VISUAL-ARTS'], level: 'SL', grade: 5 }
    ]
  },

  // ============================================
  // SOCIAL SCIENCES PROGRAMS
  // ============================================
  {
    name: 'Political Science',
    description:
      "The Bachelor's degree program in Political Science offers a comprehensive grounding in political science with the opportunity to specialize in focus areas at the interface of politics and technology.",
    field: 'Social Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/political-science-bachelor-of-science-bsc',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      { courses: ['GLOB-POL', 'HIST', 'ECON'], level: 'HL', grade: 5, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
    ]
  },

  // ============================================
  // EDUCATION PROGRAMS
  // ============================================
  {
    name: 'Teaching at Academic Secondary Schools (Scientific Education)',
    description:
      "This Bachelor's degree program is specifically designed for students aiming to become teachers at German academic secondary schools.",
    field: 'Education',
    degree: 'Bachelor of Education (B.Ed.)',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tum.de/en/studies/degree-programs/detail/teaching-at-academic-secondary-schools-scientific-education-bachelor-of-education-bed',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['GER-B'], level: 'HL', grade: 5, critical: true },
      {
        courses: ['ECON', 'BUS-MGMT', 'PSYCH', 'HIST', 'GEOG', 'PHIL', 'GLOB-POL', 'ANTHRO'],
        level: 'SL',
        grade: 4
      },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      // Education often requires knowledge in two subjects, we'll keep it general for now
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
    ]
  }
]

async function seedTUMPrograms() {
  console.log('\n🎓 Seeding Technical University of Munich Programs\n')

  try {
    // 1. Find or create Technical University of Munich
    let tum = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'Technical University of Munich', mode: 'insensitive' } },
          { name: { equals: 'Technische Universität München', mode: 'insensitive' } },
          { name: { contains: 'TUM', mode: 'insensitive' } }
        ]
      }
    })

    if (!tum) {
      // Get Germany country
      const germany = await prisma.country.findFirst({
        where: { code: 'DE' }
      })

      if (!germany) {
        console.error('❌ Germany not found in database.')
        console.error('   Please run: npx prisma db seed first')
        process.exit(1)
      }

      // Create TUM
      tum = await prisma.university.create({
        data: {
          name: 'Technical University of Munich',
          description:
            "Technical University of Munich (TUM) is one of Europe's leading research universities, ranked among the top universities worldwide. Known for excellence in engineering, natural sciences, and technology.",
          countryId: germany.id,
          city: 'Munich',
          classification: 'PUBLIC',
          websiteUrl: 'https://www.tum.de',
          studentPopulation: 50000
        }
      })
      console.log(`✅ Created Technical University of Munich (ID: ${tum.id})\n`)
    } else {
      console.log(`✅ Found Technical University of Munich (ID: ${tum.id})\n`)
    }

    // 2. Get reference data
    const fields = await prisma.fieldOfStudy.findMany()
    const courses = await prisma.iBCourse.findMany()

    const fieldMap = new Map(fields.map((f) => [f.name, f.id]))
    const courseMap = new Map(courses.map((c) => [c.code, c.id]))

    console.log(`📚 Loaded ${fields.length} fields of study and ${courses.length} IB courses\n`)

    // 3. Create programs
    let successCount = 0
    let skipCount = 0
    let failCount = 0

    for (const programDef of programs) {
      const fieldId = fieldMap.get(programDef.field)
      if (!fieldId) {
        console.error(`   ❌ Field "${programDef.field}" not found, skipping ${programDef.name}`)
        failCount++
        continue
      }

      // Check if program already exists
      const existing = await prisma.academicProgram.findFirst({
        where: {
          name: programDef.name,
          universityId: tum.id
        }
      })

      if (existing) {
        console.log(`   ⏭️  ${programDef.name} already exists, skipping`)
        skipCount++
        continue
      }

      try {
        // Create program with requirements in a transaction
        await prisma.$transaction(async (tx) => {
          // Create the program
          const program = await tx.academicProgram.create({
            data: {
              name: programDef.name,
              description: programDef.description,
              universityId: tum.id,
              fieldOfStudyId: fieldId,
              degreeType: programDef.degree,
              duration: programDef.duration,
              minIBPoints: programDef.minIBPoints,
              programUrl: programDef.programUrl,
              requirementsVerified: true,
              requirementsUpdatedAt: new Date()
            }
          })

          // Create course requirements
          for (const req of programDef.requirements) {
            // For OR groups (multiple courses), create a shared orGroupId
            const orGroupId = req.courses.length > 1 ? crypto.randomUUID() : null

            for (const courseCode of req.courses) {
              const courseId = courseMap.get(courseCode)
              if (!courseId) {
                console.warn(`      ⚠️  Course "${courseCode}" not found, skipping requirement`)
                continue
              }

              await tx.programCourseRequirement.create({
                data: {
                  programId: program.id,
                  ibCourseId: courseId,
                  requiredLevel: req.level,
                  minGrade: req.grade,
                  isCritical: req.critical || false,
                  orGroupId
                }
              })
            }
          }
        })

        console.log(
          `   ✅ ${programDef.name}: ${programDef.minIBPoints} pts, ${programDef.requirements.length} requirements`
        )
        successCount++
      } catch (error) {
        console.error(`   ❌ Failed to create ${programDef.name}:`, error)
        failCount++
      }
    }

    // Summary
    console.log('\n' + '─'.repeat(50))
    console.log('\n📊 Summary:')
    console.log(`   ✅ Created: ${successCount} programs`)
    console.log(`   ⏭️  Skipped: ${skipCount} programs (already exist)`)
    console.log(`   ❌ Failed: ${failCount} programs`)

    if (successCount > 0) {
      console.log('\n📡 Programs will automatically sync to Algolia via Prisma middleware.')
      console.log('   Or run: npx tsx scripts/sync-to-algolia-standalone.ts\n')
    }

    console.log('🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error seeding TUM programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedTUMPrograms()
