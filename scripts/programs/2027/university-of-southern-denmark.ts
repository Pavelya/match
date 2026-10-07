import type { RefreshFile } from '../lib/refresh'
import type { AnyRequirementDef } from '../lib/requirements-diff'

/**
 * University of Southern Denmark: English-taught bachelor's programmes, added for content task 5.1
 * and created, with the university, on 4 October 2026.
 *
 * SDU's pages give last year's intake as "Required GPA in 2026" but date the rules themselves only
 * once: Economics and Business Administration in Sønderborg announces its quota 1 GPA minimum "from
 * 2027 onwards", so it is stamped 2027 and the rest 2026 (refresh rule 2). Not added: International
 * Business Administration, Language and Culture, taught in English, German and Danish, and the
 * Bachelor of Engineering (diplomingeniør) versions of Electronics, Mechanical Engineering and
 * Mechatronics, which SDU lists separately.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-southern-denmark
 */

const BASE = 'https://www.sdu.dk/en/uddannelse/bachelor'
const IB_PAGE = `${BASE}/bachelor-admission/admission-requirements/educational-background/international-baccalaureate`
const UFSN =
  'https://ufsn.dk/uddannelse/anerkendelse-og-dokumentation/find-vurderinger/eksamenshaandbogen/landedbtest/#handbookId=3&countryId=269&subjectId=3'
const CBS_MAPPING =
  'https://www.cbs.dk/en/study-programmes/bachelor-programmes/application-and-admission'

const sources = (slug: string, ...extra: string[]) => [
  `${BASE}/${slug}/adgangskrav`,
  `${BASE}/${slug}`,
  IB_PAGE,
  UFSN,
  ...extra
]

const IB_RULE =
  "SDU's IB page: an IB Diploma qualifies for its bachelor's programmes, and its conversion table sets English A as any English A or English B HL, English B as English B SL, Mathematics A as Maths AA or AI at HL, Mathematics B as either at SL, Physics B as Physics SL and History B as History SL. A pass is 02 on the Danish scale, IB 3."
const QUOTA_7 =
  "Quota 1 needs a GPA of at least 7.0, which takes 31 IB points on ufsn.dk's 2026 conversion table (30 converts to 6.9); quota 2 places go to the best scores in SDU's entrance test, with no GPA minimum, so the published minimum is the Diploma, 24. SDU recommends everyone take the test."
const NO_YEAR =
  'The page names no intake for these rules, so stamped 2026. Apply through optagelse.dk by 15 March, 12:00 noon.'
const PHYSICS_NOTE =
  'Physics B or Geoscience A: stored as Physics SL, as the IB has no geoscience course.'
const SOCIAL_GROUP =
  "The History, Social Sciences, History of Ideas or Contemporary History B requirement is stored as CBS publishes the IB mapping of the Danish social studies group: Business Management, Economics, Global Politics or History (SL or HL), or Geography or Social and Cultural Anthropology (HL), at 3; SDU's own table lists History SL, and Economics and Business Management SL for the business subjects."

const ENGLISH_B: AnyRequirementDef = {
  courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'],
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
const MATHS_B: AnyRequirementDef = {
  courses: ['MATH-AA', 'MATH-AI'],
  level: 'SL',
  grade: 3,
  critical: true
}
const PHYSICS_B: AnyRequirementDef = { courses: ['PHYS'], level: 'SL', grade: 3, critical: true }
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
  university: 'University of Southern Denmark',
  entryYear: 2027,
  checkedOn: '2026-10-04',
  programs: [
    {
      id: 'cmutgqcfk0029lj7m6owptdf4',
      status: 'current',
      name: 'Artificial Intelligence (Vejle)',
      description:
        "The Bachelor's programme in Artificial Intelligence at SDU Vejle teaches you to develop and apply the tools and methods of artificial intelligence, working with data, information and software to solve real-world problems. Compared with Computer Science, it puts more weight on the theory, development and application of AI and covers fewer of the classic computer science topics.\n\nNo coding experience is needed. The programme is taught in English on SDU's IT campus in Vejle, close to large employers of IT specialists.\n\nHow competitive: in 2026, the 80% of places awarded on grades (quota 1) went to applicants from about 32 IB points (a Danish GPA of 7.6). The other 20% go to the best scores in SDU's admission test, uniTEST (quota 2), where any Diploma holder (24 points) can compete.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: program page: "Location Vejle"
      campusCity: 'Vejle',
      minIBPoints: 24,
      programUrl: `${BASE}/artificial-intelligence-vejle`,
      requirements: [ENGLISH_B, MATHS_A],
      checkedFor: 2026,
      sources: sources('artificial-intelligence-vejle'),
      notes: `Content 5.1: new. Specific requirements: English B and Mathematics A, both conditions, so critical. ${IB_RULE} ${QUOTA_7} 2026: 30 expected places, 80% in quota 1; the required GPA was 7.6 (32 IB points on the 2026 table) and 66 were admitted. ${NO_YEAR} Bachelor of Science (BSc) in Artificial Intelligence. The description's last paragraph, "How competitive", gives the 2026 quota 1 cut-off for students (content 5.1 follow-up, 4 October 2026); update it at each refresh.`
    },
    {
      id: 'cmutgqck2002flj7m962fieyf',
      status: 'current',
      name: 'Computer Science (Vejle)',
      description:
        "Computer Science at SDU Vejle gives a broad introduction to all the major areas of the discipline, with room to specialise. The programme emphasises understanding, analysis and logical thinking, and teaches you to develop software that solves real problems, in areas such as AI, cybersecurity, software and data systems.\n\nPrior programming experience is not required. Teaching is in English on SDU's IT campus in Vejle, and graduates can go into software development, IT security or databases, or on to a master's programme.\n\nHow competitive: in 2026, places awarded on grades (quota 1) went to applicants from about 33 IB points (a Danish GPA of 7.8). The other places go to the best scores in SDU's admission test, uniTEST (quota 2), where any Diploma holder (24 points) can compete.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: program page: "Location Vejle"
      campusCity: 'Vejle',
      minIBPoints: 24,
      programUrl: `${BASE}/computer-science-vejle`,
      requirements: [ENGLISH_B, MATHS_A],
      checkedFor: 2026,
      sources: sources('computer-science-vejle'),
      notes: `Content 5.1: new. Specific requirements: English B and Mathematics A, both conditions, so critical. ${IB_RULE} ${QUOTA_7} 2026: the required GPA was 7.8 (33 IB points on the 2026 table) and 88 were admitted. ${NO_YEAR} Bachelor of Science (BSc) in Computer Science. The description's last paragraph, "How competitive", gives the 2026 quota 1 cut-off for students (content 5.1 follow-up, 4 October 2026); update it at each refresh.`
    },
    {
      id: 'cmutgqcqk002llj7m6m00aiwd',
      status: 'current',
      name: 'Electronics (Sønderborg)',
      description:
        "The BSc in Engineering in Electronics combines hardware and software to build electronic solutions for green energy technology, electric motors, robots, sensors and embedded systems. You learn to design, develop and test electronic systems, working with analogue and digital electronics, programming, signal processing and control engineering on a strong base of mathematics and physics.\n\nTeaching is in English and tied to hands-on project work in laboratories every semester, at SDU in Sønderborg. Graduates work in green energy, automation, robotics, electric vehicles and medical technology, or continue to a master's.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: program page: "Location Campus: Sønderborg"
      campusCity: 'Sønderborg',
      minIBPoints: 24,
      programUrl: `${BASE}/electronics`,
      requirements: [ENGLISH_B, MATHS_A, PHYSICS_B],
      checkedFor: 2026,
      sources: sources('electronics'),
      notes: `Content 5.1: new. Specific requirements: English B, Mathematics A, and Physics B or Geoscience A, all conditions, so critical. ${PHYSICS_NOTE} ${IB_RULE} ${QUOTA_7} 2026: 30 expected places, 60% in quota 1; every qualified applicant was admitted (24). ${NO_YEAR} BSc in Engineering (stored as Bachelor of Science); SDU also offers a Bachelor of Engineering in Electronics, not stored.`
    },
    {
      id: 'cmutgqcuy002slj7mj39m3vl4',
      status: 'current',
      name: 'European Studies (Sønderborg)',
      description:
        "The BSc in European Studies analyses regional, national and transnational structures and developments in Europe, drawing on political science, cultural studies, history and economics. The interdisciplinary programme builds theoretical understanding, factual knowledge and analytical skills in four main areas, among them politics and institutions, the historical foundations of European integration, and regional development.\n\nIt is taught in English in Sønderborg, on the Danish-German border.\n\nHow competitive: in 2026, the 60% of places awarded on grades (quota 1) went to applicants from about 34 IB points (a Danish GPA of 8.2). The other 40% go to the best scores in SDU's admission test, uniTEST (quota 2), where any Diploma holder (24 points) can compete.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: program page: "Location Sønderborg"
      campusCity: 'Sønderborg',
      minIBPoints: 24,
      programUrl: `${BASE}/europaeiske_studier`,
      requirements: [ENGLISH_B, MATHS_B, SOCIAL_STUDIES_B],
      checkedFor: 2026,
      sources: sources('europaeiske_studier', CBS_MAPPING),
      notes: `Content 5.1: new. Specific requirements: English B, Mathematics B, and History, Social Sciences, History of Ideas or Contemporary History B, all conditions, so critical. ${IB_RULE} ${SOCIAL_GROUP} ${QUOTA_7} 2026: 45 expected places, 60% in quota 1; the required GPA was 8.2 (34 IB points on the 2026 table) and 76 were admitted. ${NO_YEAR} BSc in European Studies. The description's last paragraph, "How competitive", gives the 2026 quota 1 cut-off for students (content 5.1 follow-up, 4 October 2026); update it at each refresh.`
    },
    {
      id: 'cmutgqczd0034lj7mmh2tnufd',
      status: 'current',
      name: 'Economics and Business Administration (Sønderborg)',
      description:
        "This bachelor's programme in Economics and Business Administration covers a broad range of business subjects, including marketing, accounting, finance and organisation, giving skills that can be used in private and public companies across industries. The Sønderborg programme focuses on global business: global marketing, international cooperation and cultural issues, and the challenges and opportunities modern global companies face.\n\nIt is taught in English at SDU Business School in Sønderborg.\n\nHow competitive: in 2026, the 65% of places awarded on grades (quota 1) went to applicants from about 34 IB points (a Danish GPA of 8.3). The other 35% go to the best scores in SDU's admission test, uniTEST (quota 2), where any Diploma holder (24 points) can compete.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: program page: "Location Sønderborg"
      campusCity: 'Sønderborg',
      minIBPoints: 24,
      programUrl: `${BASE}/ha-soenderborg`,
      requirements: [ENGLISH_B, MATHS_B, SOCIAL_STUDIES_B],
      checkedFor: 2027,
      sources: sources('ha-soenderborg', CBS_MAPPING),
      notes: `Content 5.1: new. Specific requirements: English B, Mathematics B, and History, Social Sciences, History of Ideas, Contemporary History or International Economy B, all conditions, so critical. ${IB_RULE} ${SOCIAL_GROUP} The page states that for applicants from 2027 onwards the quota 1 GPA minimum rises from 6.0 to 7.0, which takes 31 IB points on ufsn.dk's 2026 table (6.0 took 28); quota 2 places go to the best scores in SDU's entrance test, with no GPA minimum, so the published minimum is the Diploma, 24. 2026: 65 expected places, 65% in quota 1; the required GPA was 8.3 (34 IB points on the 2026 table) and 103 were admitted. Stamped 2027: the page gives the 2027 rule. Apply through optagelse.dk by 15 March, 12:00 noon. BSc in Economics and Business Administration. The description's last paragraph, "How competitive", gives the 2026 quota 1 cut-off for students (content 5.1 follow-up, 4 October 2026); update it at each refresh.`
    },
    {
      id: 'cmutgqd5u003glj7mvohbtrsq',
      status: 'current',
      name: 'Engineering, Innovation and Business (Sønderborg)',
      description:
        'The BSc in Engineering in Engineering, Innovation and Business combines technical understanding with creativity and business insight, so that you can take ideas from concept to reality: new products, technical solutions, business models or companies. Graduates act as a bridge between engineering and business.\n\nThe programme is taught in English at SDU in Sønderborg and suits curious, creative students interested in product development and entrepreneurship.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: program page: "Location Campus: Sønderborg"
      campusCity: 'Sønderborg',
      minIBPoints: 24,
      programUrl: `${BASE}/innovation_and_business`,
      requirements: [ENGLISH_B, MATHS_A, PHYSICS_B],
      checkedFor: 2026,
      sources: sources('innovation_and_business'),
      notes: `Content 5.1: new. Specific requirements: English B, Mathematics A, and Physics B or Geoscience A, all conditions, so critical. ${PHYSICS_NOTE} ${IB_RULE} ${QUOTA_7} 2026: 65 expected places, 60% in quota 1; every qualified applicant was admitted (58). ${NO_YEAR} BSc in Engineering (stored as Bachelor of Science).`
    },
    {
      id: 'cmutgqda7003nlj7miicb01q3',
      status: 'current',
      name: 'Interactive Technology Engineering (Vejle)',
      description:
        "The BSc in Interactive Technology Engineering, new at SDU Vejle from 2026, teaches you to build the systems that connect the digital world with people: apps, AI assistants, computer games, VR experiences, smart home products, robots and large platforms in areas such as healthcare. It combines engineering with creative design and user insight so that solutions work naturally for their users.\n\nThe programme is taught in English on SDU's IT campus in Vejle.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: program page: "Location Campus: Vejle"
      campusCity: 'Vejle',
      minIBPoints: 24,
      programUrl: `${BASE}/interactive-technology-engineering`,
      requirements: [ENGLISH_B, MATHS_A, PHYSICS_B],
      checkedFor: 2026,
      sources: sources('interactive-technology-engineering'),
      notes: `Content 5.1: new. Specific requirements: English B, Mathematics A, and Physics B or Geoscience A, all conditions, so critical. ${PHYSICS_NOTE} ${IB_RULE} ${QUOTA_7} 30 expected places, 60% in quota 1; the programme started in 2026 and the page gives no 2026 intake figures. ${NO_YEAR} BSc in Engineering (stored as Bachelor of Science).`
    },
    {
      id: 'cmutgqdeg003ulj7ma2jlggc8',
      status: 'current',
      name: 'Market and Management Anthropology',
      description:
        "Market and Management Anthropology is a signature programme of SDU Business School, with a small intake and intensive teaching, for students who want to become globally conscious, culturally sensitive and socially responsible managers. It combines anthropological theory and fieldwork methods with courses on marketing and management as social processes and practical managerial skills.\n\nYou study how markets emerge and work, how organisations navigate global and local conditions, and how people use goods and services to build identities. A semester of fieldwork abroad is compulsory. Taught entirely in English in Odense.\n\nHow competitive: in 2026, the 75% of places awarded on grades (quota 1) went to applicants from about 35 IB points (a Danish GPA of 8.7). The other 25% go to the best scores in SDU's admission test, uniTEST (quota 2), where any Diploma holder (24 points) can compete.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/market_management_anthropology`,
      requirements: [ENGLISH_B, MATHS_B, SOCIAL_STUDIES_B],
      checkedFor: 2026,
      sources: sources('market_management_anthropology', CBS_MAPPING),
      notes: `Content 5.1: new. Specific requirements: English B, Mathematics B, and History, Social Sciences, History of Ideas or Contemporary History B, all conditions, so critical. ${IB_RULE} ${SOCIAL_GROUP} ${QUOTA_7} 2026: 40 expected places, 75% in quota 1; the required GPA was 8.7 (35 IB points on the 2026 table) and 48 were admitted. ${NO_YEAR} Bachelor of Science (BSc) in Market and Management Anthropology. The description's last paragraph, "How competitive", gives the 2026 quota 1 cut-off for students (content 5.1 follow-up, 4 October 2026); update it at each refresh.`
    },
    {
      id: 'cmutgqdlt0046lj7me3q0ecrt',
      status: 'current',
      name: 'Mechanical Engineering (Sønderborg)',
      description:
        'The BSc in Engineering in Mechanical Engineering is about developing the products and technologies society depends on, from robots and wind turbines to production equipment and intelligent mechanical systems. You work through the whole process from idea to finished product, learning how mechanical systems are designed, calculated, simulated and tested.\n\nThe programme focuses on mechanics, materials, structural design, product development and modern manufacturing, and is taught in English at SDU in Sønderborg.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: program page: "Location Sønderborg"
      campusCity: 'Sønderborg',
      minIBPoints: 24,
      programUrl: `${BASE}/mechanical-engineering`,
      requirements: [
        ENGLISH_B,
        MATHS_A,
        PHYSICS_B,
        { courses: ['CHEM'], level: 'SL', grade: 3, critical: true }
      ],
      checkedFor: 2026,
      sources: sources('mechanical-engineering'),
      notes: `Content 5.1: new. Specific requirements: English B, Mathematics A, and one of Physics B with Chemistry C, Physics B with Biotechnology A, or Geoscience A with Chemistry C, all conditions, so critical. For the IB that is Physics SL and Chemistry SL, as the IB has no geoscience or biotechnology course; stored so. ${IB_RULE} ${QUOTA_7} 2026: 65 expected places, 65% in quota 1; every qualified applicant was admitted (86). ${NO_YEAR} BSc in Engineering (stored as Bachelor of Science); SDU also offers a Bachelor of Engineering in Mechanical Engineering, not stored.`
    },
    {
      id: 'cmutgqdq1004elj7mwy0g0mq0',
      status: 'current',
      name: 'Mechatronics (Sønderborg)',
      description:
        'The BSc in Engineering in Mechatronics makes mechanics, electronics and software work together, developing technologies that sense, think and act: intelligent products, automated machines, robots and healthcare technology. The interdisciplinary programme teaches you to treat complex technical systems as a whole.\n\nIt is taught in English in Sønderborg, with close links to industry, and prepares for work on high-tech products, sustainable technologies, AI, autonomous systems and industrial automation.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: program page: "Location Campus: Sønderborg"
      campusCity: 'Sønderborg',
      minIBPoints: 24,
      programUrl: `${BASE}/mechatronics`,
      requirements: [ENGLISH_B, MATHS_A, PHYSICS_B],
      checkedFor: 2026,
      sources: sources('mechatronics'),
      notes: `Content 5.1: new. Specific requirements: English B, Mathematics A, and Physics B or Geoscience A, all conditions, so critical. ${PHYSICS_NOTE} ${IB_RULE} ${QUOTA_7} 2026: 100 expected places, 65% in quota 1; every qualified applicant was admitted (98). ${NO_YEAR} BSc in Engineering (stored as Bachelor of Science); SDU also offers a Bachelor of Engineering in Mechatronics, not stored.`
    },
    {
      id: 'cmutgqduf004llj7mby8crxz3',
      status: 'current',
      name: 'Software Engineering (Vejle)',
      description:
        "The BSc in Engineering in Software Engineering at SDU Vejle teaches you to develop software and AI systems reliably, securely and in line with users' needs, from the first ideas and analyses through design, implementation, testing and maintenance. Software systems underpin everything from phone apps to critical solutions in banking and healthcare.\n\nThe programme is taught in English on SDU's IT campus in Vejle.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: program page: "Software Engineering BSc in Engineering / Vejle"
      campusCity: 'Vejle',
      minIBPoints: 24,
      programUrl: `${BASE}/software-engineering-vejle`,
      requirements: [ENGLISH_B, MATHS_A],
      checkedFor: 2026,
      sources: sources('software-engineering-vejle'),
      notes: `Content 5.1: new. Specific requirements: English B and Mathematics A, both conditions, so critical. ${IB_RULE} ${QUOTA_7} 2026: 30 expected places, 60% in quota 1; every qualified applicant was admitted (18). ${NO_YEAR} BSc in Engineering (stored as Bachelor of Science). The same programme is taught in Sønderborg (stored separately).`
    },
    {
      id: 'cmutgqe0k004rlj7mufuhln83',
      status: 'current',
      name: 'Software Engineering (Sønderborg)',
      description:
        'The BSc in Engineering in Software Engineering in Sønderborg teaches you to develop software that suits the people and organisations who use it, through the whole process from needs analysis and ideas to design, programming, testing, implementation and further development. Software is the infrastructure of healthcare, industry, energy and the public sector.\n\nThe programme is taught in English in an international environment with close links to companies, at SDU in Sønderborg.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: program page: "Software Engineering BSc in Engineering / Sønderborg"
      campusCity: 'Sønderborg',
      minIBPoints: 24,
      programUrl: `${BASE}/softwareengineering-sb`,
      requirements: [ENGLISH_B, MATHS_A],
      checkedFor: 2026,
      sources: sources('softwareengineering-sb'),
      notes: `Content 5.1: new. Specific requirements: English B and Mathematics A, both conditions, so critical. ${IB_RULE} ${QUOTA_7} 2026: 120 expected places, 60% in quota 1; every qualified applicant was admitted (44). ${NO_YEAR} BSc in Engineering (stored as Bachelor of Science). The same programme is taught in Vejle (stored separately).`
    }
  ]
}

export default refresh
