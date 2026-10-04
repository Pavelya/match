import type { RefreshFile } from '../lib/refresh'
import type { AnyRequirementDef } from '../lib/requirements-diff'

/**
 * Aarhus University: English-taught bachelor's programmes, added for content task 5.1 and created,
 * with the university, on 4 October 2026.
 *
 * AU's programme pages name no intake: they show the 2026 quota 1 result and were revised in
 * August-September 2026, so each program is stamped 2026 (refresh rule 2).
 *
 * Dry run: npx tsx scripts/programs/refresh.ts aarhus-university
 */

const IB_RULE =
  "An IB Diploma with at least 24 points qualifies for all Danish higher education, provided the programme's specific requirements are met (Danish Agency for Higher Education and Science, 'Optagelse af IB-elever'). Danish levels are converted as SDU and DTU publish the IB table: B is SL, A is HL; English B is English B SL, any English A or English B HL, and AU accepts the Diploma's English subject as English B without a test. A pass is 02 on the Danish scale, IB 3 on ufsn.dk's single-grade table."
const QUOTA_1 =
  "Quota 1 needs a GPA of at least 6.0, which takes 28 IB points on ufsn.dk's 2026 conversion table; quota 2, assessed on the quota 2 subjects' grades and relevant qualifications, has no GPA minimum, so the published minimum is the Diploma, 24."
const NO_YEAR =
  'The programme page names no intake (it shows the 2026 quota 1 result), so stamped 2026. Apply through optagelse.dk by 15 March, 12:00 CET. Bachelor of Science, 180 ECTS.'
const SOCIAL_GROUP =
  'The History, History of Ideas, Social Studies or Contemporary History B requirement is stored as CBS publishes the IB mapping of the Danish social studies group: Business Management, Economics, Global Politics or History (SL or HL), or Geography or Social and Cultural Anthropology (HL), at 3; AU assesses subject levels itself on application.'

const SOURCES = [
  'https://bachelor.au.dk/en/international-applicants/moreinfo/language-requirements',
  'https://bachelor.au.dk/fileadmin/ingen_mappe_valgt/IB_og_supplering.pdf',
  'https://www.sdu.dk/en/uddannelse/bachelor/bachelor-admission/admission-requirements/educational-background/international-baccalaureate',
  'https://ufsn.dk/uddannelse/anerkendelse-og-dokumentation/find-vurderinger/eksamenshaandbogen/landedbtest/#handbookId=3&countryId=269&subjectId=3'
]
const CBS_MAPPING =
  'https://www.cbs.dk/en/study-programmes/bachelor-programmes/application-and-admission'

const ENGLISH_B: AnyRequirementDef = {
  courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'],
  level: 'SL',
  grade: 3,
  critical: true
}
const MATHS_B: AnyRequirementDef = {
  courses: ['MATH-AA', 'MATH-AI'],
  level: 'SL',
  grade: 3,
  critical: true
}
const MATHS_A: AnyRequirementDef = {
  courses: ['MATH-AA', 'MATH-AI'],
  level: 'HL',
  grade: 3,
  critical: true
}
const SOCIAL_STUDIES_B: AnyRequirementDef = {
  anyOf: [
    { course: 'BUS-MGMT', level: 'SL', grade: 3 },
    { course: 'ECON', level: 'SL', grade: 3 },
    { course: 'GLOB-POL', level: 'SL', grade: 3 },
    { course: 'HIST', level: 'SL', grade: 3 },
    { course: 'GEOG', level: 'HL', grade: 3 },
    { course: 'ANTHRO', level: 'HL', grade: 3 }
  ],
  critical: true
}

const refresh: RefreshFile = {
  university: 'Aarhus University',
  entryYear: 2027,
  checkedOn: '2026-10-04',
  programs: [
    {
      id: 'cmutgqb9k000clj7mu2bc9dzp',
      status: 'current',
      name: 'Cognitive Science',
      description:
        "Cognitive Science introduces the fundamental theories of cognition and teaches you to design and run your own studies of the human mind, brain and behaviour. You learn computer programming (for example Python) and statistical data analysis (for example R and MATLAB), and in lab exercises you collect and analyse data from brain scans, behavioural experiments and large text databases.\n\nThe programme covers experimental design and statistics, cognitive neuroscience, and cognitive approaches to communication and culture: how people make decisions, and how language is used to communicate and interact. It is taught in English in Aarhus and leads on to master's programmes such as Cognitive Science.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://bachelor.au.dk/en/cognitivescience/',
      requirements: [ENGLISH_B, MATHS_B, SOCIAL_STUDIES_B],
      checkedFor: 2026,
      sources: ['https://bachelor.au.dk/en/cognitivescience/', ...SOURCES, CBS_MAPPING],
      notes: `Content 5.1: new. Specific requirements: English B, Mathematics B, and History, History of Ideas, Social Studies or Contemporary History B, all conditions, so critical. ${IB_RULE} ${SOCIAL_GROUP} ${QUOTA_1} The 2026 quota 1 cut-off was 10.7 (standby 10.5), 40 IB points on the 2026 table. ${NO_YEAR}`
    },
    {
      id: 'cmutgqbe3000olj7m6iuutakj',
      status: 'current',
      name: 'Computer Science',
      description:
        "Computer Science teaches you to design, program and verify software from scratch: programming in several languages, handling large amounts of data, processing data with artificial intelligence and visual methods, and preventing cyberattacks. Mathematical methods are central to several courses, used to develop and analyse algorithms and to study the security and efficiency of IT systems.\n\nNo programming experience is needed at the start. The programme covers algorithms, machine learning, big data, cybersecurity, artificial intelligence and software development, and is taught in English by Aarhus University's Department of Computer Science.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://bachelor.au.dk/en/computerscience',
      requirements: [ENGLISH_B, MATHS_A],
      checkedFor: 2026,
      sources: ['https://bachelor.au.dk/en/computerscience', ...SOURCES],
      notes: `Content 5.1: new. Specific requirements: English B and Mathematics A (Maths AA or AI at HL), both conditions, so critical. ${IB_RULE} ${QUOTA_1} Quota 1 also needs 6.0 in Mathematics A, which is Maths HL at 5 (IB 4 converts to 4, 5 to 7); not stored, as quota 2 admits on a pass. The 2026 quota 1 cut-off was 11.4 (standby 10.5), 43 IB points on the 2026 table. AU advises Danish applicants to list the Danish-taught Datalogi as well, as places are limited. ${NO_YEAR}`
    },
    {
      id: 'cmutgqbki000ulj7m1u3xtn43',
      status: 'current',
      name: 'Data Science',
      description:
        "Data Science is about extracting knowledge from data so that businesses and society can make evidence-based decisions, and communicating what the data shows. The programme covers statistics, data analysis, mathematical modelling, programming and machine learning, applied to data such as financial markets, healthcare, consumer behaviour and climate change.\n\nThe English-taught programme is aimed at international students and is academically the same as AU's Danish-taught Datavidenskab; both lead to the same English-taught master's degree in Data Science.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://bachelor.au.dk/en/datascience',
      requirements: [ENGLISH_B, MATHS_A],
      checkedFor: 2026,
      sources: ['https://bachelor.au.dk/en/datascience', ...SOURCES],
      notes: `Content 5.1: new. Specific requirements: English B and Mathematics A (Maths AA or AI at HL), both conditions, so critical. ${IB_RULE} ${QUOTA_1} Quota 1 also needs 6.0 in Mathematics A, which is Maths HL at 5; not stored, as quota 2 admits on a pass. The 2026 quota 1 cut-off was 11.2 (standby 10.1), 42 IB points on the 2026 table. AU advises applicants with Danish A to choose the Danish-taught Datavidenskab first. ${NO_YEAR}`
    },
    {
      id: 'cmutgqbp10010lj7m776jcg8x',
      status: 'current',
      name: 'IT Product Development',
      description:
        'IT Product Development combines software development with user-centred design to create physical IT products for everyday life, such as smartwatches, smart glasses, in-car interfaces, medical devices and building climate control systems. You learn to design, model, construct and program products with integrated software and new ways of interacting, working with sensors and actuators.\n\nThe programme also gives a foundation in software development, algorithms, programming and data analysis, and introduces computer architecture, cybersecurity, the Internet of Things, augmented reality, 3D modelling and 3D printing. No programming experience is needed, and projects are run with IT companies.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://bachelor.au.dk/en/itproductdevelopment',
      requirements: [ENGLISH_B, MATHS_A],
      checkedFor: 2026,
      sources: ['https://bachelor.au.dk/en/itproductdevelopment', ...SOURCES],
      notes: `Content 5.1: new. Specific requirements: English B and Mathematics A (Maths AA or AI at HL), both conditions, so critical. ${IB_RULE} ${QUOTA_1} Quota 1 also needs 6.0 in Mathematics A, which is Maths HL at 5; not stored, as quota 2 admits on a pass. The 2026 quota 1 cut-off was 10.1 (standby 6.9), 39 IB points on the 2026 table. ${NO_YEAR}`
    },
    {
      id: 'cmutgqbth0016lj7m1wuu1svi',
      status: 'current',
      name: 'Economics and Business Administration',
      description:
        "Economics and Business Administration is a business programme with an international focus: how to analyse and manage a company's activities so that they create value for customers, employees, owners and society. Subjects include organisational behaviour, strategy, management and financial accounting, logistics, marketing management, finance, micro- and macroeconomics and business law, with methods courses in economics and business.\n\nIn the fifth semester you build your own programme from electives or go on exchange, and the sixth semester is a bachelor's project. Teaching and literature are in English, at Aarhus BSS in Aarhus.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://bachelor.au.dk/en/economics-and-business-administration/',
      requirements: [ENGLISH_B, MATHS_B, SOCIAL_STUDIES_B],
      checkedFor: 2026,
      sources: [
        'https://bachelor.au.dk/en/economics-and-business-administration/',
        ...SOURCES,
        CBS_MAPPING
      ],
      notes: `Content 5.1: new. Specific requirements: English B, Mathematics B, and History, History of Ideas, Social Studies, Contemporary History or International Economics B, all conditions, so critical. ${IB_RULE} ${SOCIAL_GROUP} ${QUOTA_1} The 2026 quota 1 cut-off was 9.2 (standby 8.6), 36 IB points on the 2026 table. Taught in Aarhus; AU also teaches it in Herning (stored separately). ${NO_YEAR}`
    },
    {
      id: 'cmutgqbzz001ilj7mnfqnw3kd',
      status: 'current',
      name: 'Economics and Business Administration (Herning)',
      description:
        "The Herning programme in Economics and Business Administration teaches how companies create value, attract customers and make decisions, from marketing and sales to finance, management and strategy. You work with financial statements, budgets and key indicators, analyse markets and competition, and learn how management and communication shape a business.\n\nCompanies are part of the programme from the start: real cases in class, guest talks and visits, and a project-based internship option in the fifth semester. It is taught in English at Aarhus University's Herning campus.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://bachelor.au.dk/en/economics-and-business-administration-auhe/',
      requirements: [ENGLISH_B, MATHS_B, SOCIAL_STUDIES_B],
      checkedFor: 2026,
      sources: [
        'https://bachelor.au.dk/en/economics-and-business-administration-auhe/',
        ...SOURCES,
        CBS_MAPPING
      ],
      notes: `Content 5.1: new. Specific requirements: English B, Mathematics B, and History, History of Ideas, Contemporary History, Social Science or International Economics B, all conditions, so critical. ${IB_RULE} ${SOCIAL_GROUP} The Herning page names no quota 1 GPA minimum; quota 2 applicants are assessed on the quota 2 subjects and invited to a meeting to match expectations. The 2026 quota 1 cut-off was 6.9 (standby 6.0), 30 IB points on the 2026 table. The published minimum is the Diploma, 24. ${NO_YEAR}`
    }
  ]
}

export default refresh
