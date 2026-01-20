/**
 * Seed University of Hong Kong Programs to Database
 *
 * Adds 40 undergraduate programs for The University of Hong Kong with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source: https://admissions.hku.hk/programmes/undergraduate-programmes
 *
 * Prerequisites: The University of Hong Kong must exist in the database.
 * If not, create it first.
 *
 * Run with: npx tsx scripts/programs/seed-hku-programs.ts
 */

import { PrismaClient, CourseLevel } from '@prisma/client'

const prisma = new PrismaClient()

// Program definitions with IB requirements
// Requirements format: array of { courses: string[], level: 'HL'|'SL', grade: number, critical?: boolean }
// When multiple courses are in the array, they form an OR group
interface RequirementDef {
  courses: string[] // Course codes - if multiple, they form an OR group
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
  // ARCHITECTURE & DESIGN PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Arts in Architectural Studies',
    description:
      'Become a creative designer in architecture and the built environment. Students will learn to think critically, analyze complex situations, and create innovative design solutions. Our programme prepares you for various opportunities in design, including postgraduate studies in architecture and related fields, and careers in design professions. The programme features Design Studio as the core of experiential, problem-based learning. An optional overseas exchange programme and numerous experiential learning opportunities are available.',
    field: 'Architecture',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-architectural-studies',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Bachelor of Science in Surveying',
    description:
      'Open your door to the exciting world of real estate, construction, property management, or urban planning and design. Our degree is accredited by local and international professional bodies, including RICS, HKIS, CIOB, HKIH, and HKIQEP. The programme provides a solid academic foundation in property, construction, and urban studies with pathways to professional qualifications.',
    field: 'Architecture',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 32,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-science-surveying',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Bachelor of Arts in Landscape Studies',
    description:
      'This programme is a full-time four-year undergraduate programme designed to prepare students for the profession of landscape architecture. The programme provides a solid foundation in landscape architecture design, theory, and practice. Students will learn to design outdoor spaces, parks, and public areas that are both functional and aesthetically pleasing.',
    field: 'Architecture',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-landscape-studies',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Bachelor of Arts in Urban Studies',
    description:
      'This programme is a full-time four-year undergraduate programme designed to prepare students for careers in urban planning, urban design, and related fields. The programme provides a comprehensive understanding of urban issues, including urban development, housing, transportation, and environmental sustainability.',
    field: 'Architecture',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-urban-studies',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Bachelor of Arts and Sciences in Design+',
    description:
      'Hosted by the Faculty of Architecture with collaboration from other faculties (Arts, Business, Engineering, Science, Social Sciences), the programme explores interdisciplinary design practice, design methods, theory, and ethics. Encompassing hands-on projects and internships, the curriculum develops core skills in problem framing, addressing design challenges, and collaborating with diverse stakeholders and teams.',
    field: 'Architecture',
    degree: 'Bachelor of Arts and Sciences',
    duration: '4 years',
    minIBPoints: 32,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-and-sciences-design',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },

  // ============================================
  // ARTS & HUMANITIES PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Arts',
    description:
      'BA is a flexible programme with a curriculum spanning the humanities and related disciplines including history, philosophy, comparative literature, languages, linguistics, and more. Students enjoy flexibility in designing their study path in the humanities. Four-year direct entry options at the time of admission include BA or BA with major in Global Creative Industries. Dual degree options include BA (Literary Studies) & BEd (English Language Education), BA & LLB, and BA & BEng (Artificial Intelligence and Data Science).',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Bachelor of Arts in Humanities and Digital Technologies',
    description:
      "Students will select a humanities focus after a year of exploration, which can be undertaken in any Faculty of Arts programme area (e.g. Art History). Students' growing skills in this specialisation are combined with a focus in interdisciplinary digital technologies, geared to the knowledge and needs of the individual student. These overlapping areas come together in the internship and capstone courses: a focus on experiential and project-based learning brings together students' digital technology skills with their chosen humanities discipline to create a truly interdisciplinary programme structure. HKU's big data-oriented programmes are designed to equip you with the skillsets and knowledge to excel in today's digitalised world. Digital skills are now becoming a requirement for careers including marketing, communications, consultancy, management and other fields.",
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-humanities-and-digital-technologies',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Bachelor of Arts and Bachelor of Education in Language Education - English',
    description:
      'Jointly offered by the Faculty of Arts and the Faculty of Education, this programme enables students to earn both a BA in English language and linguistics and a BEd in English language education over five years of study. Following graduation, you will meet the requirements for English language teachers in both primary and secondary schools as recommended by the HKSAR government. The curriculum integrates academic and professional studies in language education including pedagogical, psychological and sociological underpinnings of professional practice, with teaching experience in local schools. The programme is equivalent to a BA plus a Postgraduate Diploma in Education – a professional teaching qualification recognised locally.',
    field: 'Arts & Humanities',
    degree: 'BA & BEd (Double Degree)',
    duration: '5 years',
    minIBPoints: 32,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-and-bachelor-of-education-language-education',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },

  // ============================================
  // BUSINESS & ECONOMICS PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Business Administration',
    description:
      'The BBA programme combines functional training with communication skills, computer analytics, and other sciences or social sciences subjects. Students can choose a major in one of five areas: Entrepreneurship, Design, and Innovation; Finance; Human Resources Management; Information Systems and Analytics; or Marketing. The School offers two BBA dual degree programmes in collaboration with leading universities – Sciences Po in France and the University of British Columbia (UBC) in Canada. Students are eligible to enrol in the CGMA Finance Leadership Program and kickstart their journey to become a member of Chartered Institute of Management Accountants and a Chartered Global Management Accountant while studying. The programme is designed for students who aim to pursue a career in banking, financial investment, information technology and management, advertising, marketing, human resource management, etc.',
    field: 'Business & Economics',
    degree: 'Bachelor of Business Administration',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-business-administration',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Finance in Asset Management and Private Banking',
    description:
      'A first-of-its-kind degree in Hong Kong and Asia. Develop the skills and acumen to enter the rapidly growing fields of asset management, private wealth management and banking & finance in Hong Kong and the Asia Pacific region. The pioneering Bachelor of Finance in Asset Management and Private Banking (BFin[AMPB]) programme offers a practical and career-orientated curriculum to equip you with the knowledge and skills to excel in the finance field. Complete specialised courses in equity valuation, alternative asset classes, lending and credit, financial regulations and compliance, ESG in finance and family office. Students are expected to complete the Hong Kong Securities and Investment Institute Paper 1 examination in their third or fourth year of studies.',
    field: 'Business & Economics',
    degree: 'Bachelor of Finance',
    duration: '4 years',
    minIBPoints: 39,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-finance-asset-management-and-private-banking',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Science in Marketing Analytics and Technology',
    description:
      'Digitization and data are fundamentally changing all businesses and industries. The BSc(MAT) equips students with quantitative skills, technology, and marketing know-how to pursue a career in the digital economy and modern businesses. The program targets both STEM students with an interest in business as well as business students interested in the technology space. Students will gain a solid foundation in cutting-edge technical areas including computer programming, data science, digital platforms and marketing technology as well as business marketing know-how such as the design & launch of new technology products, targeting consumers, forecast and predicting markets, and building a technology-focused strategy. Students are eligible to enrol in the CGMA Finance Leadership Program.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-science-marketing-analytics-and-technology',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS', 'BUS-MGMT', 'ECON'], level: 'SL', grade: 1 },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Business Administration (Business Analytics)',
    description:
      'The BBA(BA) programme is crafted to meet the growing industry demand for talents in the business analytics field. Its curriculum offers students a comprehensive coverage of both technical and managerial skill sets. Students will learn a wide spectrum of knowledge from the disciplines of information technology, data science, business statistics and management. Students are eligible to enrol in the CGMA Finance Leadership Program. Graduates are expected to land data and analytics related jobs in sectors such as IT, finance, supply chain, marketing, consulting, manufacturing, and pursue post-graduate degrees in fields such as data science, information management, decision science, and big data.',
    field: 'Business & Economics',
    degree: 'Bachelor of Business Administration',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-business-administration-business-analytics',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS'], level: 'SL', grade: 1 },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Business Administration in Accounting and Finance / Accounting Data Analytics',
    description:
      'Our Bachelor of Business Administration in Accounting and Finance (BBA[Acc&Fin]) and Bachelor of Business Administration in Accounting Data Analytics (BBA[ADA]) are offered under the same programme code. BBA(Acc&Fin) students will prepare for a professional qualification in accounting and a leadership role in finance. BBA(ADA) students will be well prepared to take up leading roles in accounting analytics, digital economies and other technology-driven business domains. Both programmes are accredited by HKICPA for direct entry to the QP, ACCA foundation level exam exemptions, and CPA Australia associate membership. Students are also eligible for the CGMA Finance Leadership Program. Graduates have secured employment at Accenture, Bloomberg, Credit Suisse, Deloitte, Ernst & Young, JP Morgan, KPMG, Morgan Stanley, and PwC.',
    field: 'Business & Economics',
    degree: 'Bachelor of Business Administration',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-business-administration-accounting-and-finance',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Economics / Bachelor of Economics and Finance',
    description:
      'Our Bachelor of Economics (BEcon) and Bachelor of Economics and Finance (BEcon&Fin) teach economic and financial theories and practical applications to unpack challenges in trade, banking, labour, and financial institutions. Through the BEcon programme, you will learn to evaluate economic performance of regional markets and analyse human behaviour and social interactions. The BEcon&Fin programme recognises the significance of economics as a foundation for the study of finance. The School offers a dual-degree Future Leaders programme with Peking University (PKU). The BEcon&Fin programme is a designated CFA university affiliation programme. Students are eligible for the CGMA Finance Leadership Program. Graduates have secured employment at Bloomberg, Goldman Sachs, JPMorgan, Morgan Stanley, and PwC.',
    field: 'Business & Economics',
    degree: 'Bachelor of Economics',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-economics-bachelor-of-economics-and-finance',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Arts and Sciences in Financial Technology',
    description:
      'Jointly offered by the Faculties of Business and Economics, Engineering, and Science. The programme equips students with integrated knowledge in computer science, statistics and finance, and prepares them for the dynamic FinTech industry. Students will learn about blockchain technology, cryptocurrency, algorithmic trading, AI for finance, among other cutting-edge areas. The programme is designed to meet the growing industry demand for talents in the FinTech field.',
    field: 'Business & Economics',
    degree: 'Bachelor of Arts and Sciences',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-and-sciences-financial-technology',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Science in Actuarial Science',
    description:
      'Accredited by the UK Institute of Actuaries and the Society of Actuaries. The programme equips students with strong quantitative skills to pursue careers in insurance, finance, and risk management. Students can obtain exemptions from professional examinations. Approved as a Center of Actuarial Excellence by the Society of Actuaries.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 39,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-science-actuarial-science',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },

  // ============================================
  // COMPUTER SCIENCE & TECHNOLOGY PROGRAMS
  // ============================================
  {
    name: 'Computing and Data Science',
    description:
      'Computing and Data Science at HKU offers a comprehensive foundation in computing, data analysis, and AI. The programme prepares students for careers in software development, data engineering, machine learning, and research. Two majors are available: Computer Science, or AI and Data Science. Students will have hands-on experience through projects and internships.',
    field: 'Computer Science',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/computing-and-data-science',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS'], level: 'HL', grade: 5 },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Arts and Sciences in Applied Artificial Intelligence',
    description:
      'HKU offers a Bachelor of Arts and Sciences in Applied Artificial Intelligence (BASc[AppliedAI]). It is an interdisciplinary degree programme focusing on the application of AI technologies in various sectors, comprising 5 focus areas: AI Technology, AI in Business and Finance, AI in Medicine, AI for Smart Cities, and AI in Neurocognitive Science. Students will learn to develop AI solutions with both technical expertise and ethical considerations.',
    field: 'Computer Science',
    degree: 'Bachelor of Arts and Sciences',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-and-sciences-applied-artificial',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Arts and Bachelor of Engineering in Artificial Intelligence and Data Science',
    description:
      'The BA & BEng in AI and Data Science at HKU is a groundbreaking 5-year double degree programme that integrates the technical rigor of engineering and computer science with the critical perspectives of the humanities. This interdisciplinary programme is designed for students who aspire to lead in a rapidly evolving, technology-driven world, where the ability to blend computational expertise with humanistic insight is becoming increasingly vital. Students will gain proficiency in cutting-edge AI and data science, while also cultivating critical thinking, ethical reasoning, and creative problem-solving skills. Graduates will be prepared for careers in data engineering, data science, machine learning, AI ethics consultancy, digital humanities, AI policy development, human-computer interaction design, and cultural analytics.',
    field: 'Computer Science',
    degree: 'BA & BEng (Double Degree)',
    duration: '5 years',
    minIBPoints: 37,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-and-bachelor-of-engineering-artificial',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS', 'ECON', 'CS'], level: 'HL', grade: 5 },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Science in Innovation and Technology',
    description:
      'Jointly offered by the Faculty of Engineering and the Faculty of Science. The programme provides training in innovation and entrepreneurship alongside technical skills. Students will have hands-on experience with projects, internships, and a 6-month Co-operative Experience. The programme prepares students for careers in technology startups, research, and development.',
    field: 'Computer Science',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-science-innovation-and-technology',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
      { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 4 },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },

  // ============================================
  // ENGINEERING PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Engineering in Computer Engineering / Electrical Engineering',
    description:
      'Computer Engineering and Electrical Engineering at HKU prepare students for careers in software and hardware development, electronics, telecommunications, and more. The programme offers a strong foundation in engineering principles and hands-on experience through projects and internships. Graduates are well-prepared for careers in technology companies, research institutions, and startups.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-engineering-computer-engineering-electrical',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5 },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Engineering in Biomedical Engineering',
    description:
      'BEng Biomedical Engineering at HKU integrates engineering principles with life sciences. The programme is accredited by the Hong Kong Institution of Engineers and covers core areas including biomechanics, medical instrumentation, tissue engineering, bioinformatics, and biomedical imaging. There are 5 specialist areas offered, including computational bioengineering and medical engineering. Articulation pathway to MBBS is also available for outstanding students.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-engineering-biomedical-engineering',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5 },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Engineering and Master of Science in Engineering in Artificial Intelligence in Engineering',
    description:
      'This is an integrated Bachelor and Master degree programme in AI Engineering. Students will complete a BEng degree in their first 4 years and an MScEng in their 5th year. The programme provides comprehensive training in AI technologies and their engineering applications. Students will gain hands-on experience with AI projects and research. A scholarship of HKD 120,000 is provided for the MSc year.',
    field: 'Engineering',
    degree: 'BEng + MScEng (Integrated Bachelor+Master)',
    duration: '5 years (4+1)',
    minIBPoints: 39,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-engineering-and-master-of-science-engineering',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6 },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Engineering in Civil Engineering',
    description:
      'BEng Civil Engineering at HKU is accredited by HKIE and provides comprehensive training in civil engineering principles and practices. The programme covers 5 core areas including structural engineering, geotechnical engineering, construction management, transportation engineering, and environmental engineering. Students will also learn about Building Information Modelling (BIM) and AI applications in civil engineering.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-engineering-civil-engineering',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5 },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Engineering in Data and Systems Engineering',
    description:
      'BEng Data and Systems Engineering at HKU is offered by the Department of Industrial and Manufacturing Systems Engineering. It has dual accreditation by both the Hong Kong Institution of Engineers (HKIE) and the Chartered Institute of Logistics and Transport (CILT). The programme covers data analytics, robotics, AI, optimization, supply chain and logistics.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-engineering-data-and-systems-engineering',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5 },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Engineering Elite Programme',
    description:
      'This is a prestigious engineering programme for high-achieving students. Students can choose their BEng major after Year 1 from any of the engineering disciplines offered at HKU. The programme provides academic advisors, industrial mentors, and scholarships. Students will have opportunities for research, internships, and exchanges.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-engineering-elite-programme',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6 },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },

  // ============================================
  // LAW PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Laws',
    description:
      'The Bachelor of Laws (LLB) programme at HKU is a four-year programme that prepares students for a legal career. The programme provides a solid foundation in law and prepares students for the Postgraduate Certificate in Laws (PCLL) which is required to practice law in Hong Kong. The Faculty of Law is ranked among the top law schools in Asia.',
    field: 'Law',
    degree: 'Bachelor of Laws',
    duration: '4 years',
    minIBPoints: 40,
    programUrl: 'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-laws',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Bachelor of Social Sciences (Government and Laws) and Bachelor of Laws',
    description:
      'This is a prestigious 5-year double degree programme combining political science with law. Students will earn both a BSocSc and an LLB degree. The programme provides comprehensive training in both government and legal studies, preparing students for careers in law, government, and public policy.',
    field: 'Law',
    degree: 'BSocSc & LLB (Double Degree)',
    duration: '5 years',
    minIBPoints: 40,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-social-sciences-government-and-laws-and-bachelor',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Bachelor of Arts and Bachelor of Laws',
    description:
      "Jointly offered by the Faculty of Law and the Faculty of Arts, this programme draws on the complementary strengths of the two Faculties where questions of textual interpretation are paramount. It aims to develop competence in both legal and literary analysis, encourage interdisciplinary thinking, and enrich students' sense of human and social values. As a Literary Studies major, students have the opportunity to choose from subjects including English literature, Chinese literature, comparative literature, language and communication, linguistics, translation studies, and more. Students engage in interdisciplinary seminars examining law and film, medieval law and literature, law meaning and interpretation, contemporary law and literary texts, and legal history. To practise law in Hong Kong, LLB graduates must pass the Postgraduate Certificate in Laws (PCLL).",
    field: 'Law',
    degree: 'BA & LLB (Double Degree)',
    duration: '5 years',
    minIBPoints: 41,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-and-bachelor-of-laws',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Bachelor of Business Administration (Law) and Bachelor of Laws',
    description:
      'Jointly offered by the HKU Business School and the Faculty of Law, our Bachelor of Business Administration (Law) (BBA[Law]) and Bachelor of Laws (LLB) integrate courses to equip you with professional knowledge and intensive training in the fields of business and law. Over five years, you will earn a BBA(Law) from the HKU Business School and an LLB from the Faculty of Law. Your LLB degree is the basic requirement to pursue a legal career and the first step towards entry to a Postgraduate Certificate in Laws (PCLL) programme. The programme with a professional core in accounting is accredited by HKICPA, ACCA, and CPA Australia. Students are also eligible to enrol in the CGMA Finance Leadership Program. Graduates have gone on to accept positions at Citigroup, Clifford Chance, Deloitte, Ernst & Young, Goldman Sachs, HSBC, JPMorgan, Morgan Stanley, PwC, and many others.',
    field: 'Law',
    degree: 'BBA(Law) & LLB (Double Degree)',
    duration: '5 years',
    minIBPoints: 41,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-business-administration-law-and-bachelor-of-laws',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 6, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },

  // ============================================
  // MEDICINE & HEALTH PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Arts and Sciences in Global Health and Development',
    description:
      'Offered by the Faculty of Medicine, this is an interdisciplinary programme that combines global health, development studies, and social sciences. The programme includes a 6-month field placement component. Students will learn about health policy, epidemiology, and sustainable development in a global context.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Arts and Sciences',
    duration: '4 years',
    minIBPoints: 32,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-and-sciences-global-health-and-development',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Bachelor of Biomedical Sciences',
    description:
      'The Bachelor of Biomedical Sciences (BBiomedSc) programme covers biomedical research, bioinformatics, clinical sciences, and health technology. This programme provides hands-on research opportunities with the Faculty of Medicine. Students will gain advanced training in understanding human health and disease at the molecular, cellular, and systemic levels.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Biomedical Sciences',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-biomedical-sciences',
    requirements: [
      { courses: ['BIO', 'CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Nursing',
    description:
      'BNurs at HKU is a 5-year professional nursing programme. The programme leads to registration with the Hong Kong Nursing Council. Students will gain comprehensive clinical training in hospitals and community settings. Communicative Cantonese proficiency is required.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Nursing',
    duration: '5 years',
    minIBPoints: 32,
    programUrl: 'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-nursing',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },

  // ============================================
  // NATURAL SCIENCES PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Education and Bachelor of Science',
    description:
      'Jointly offered by the Faculty of Education and the Faculty of Science, this five-year degree integrates academic and professional studies in science education. The interdisciplinary programme will equip you to teach science subjects across primary and secondary schools in Hong Kong. You will complete a science major through the Faculty of Science plus core courses in professional education through the Faculty of Education. A choice of seven science majors includes biochemistry, biological sciences, chemistry, ecology and biodiversity, food and nutritional science, molecular biology and biotechnology, and physics. Graduates will earn a BSc and a BEd in Science Education. The programme is equivalent to a BSc plus a Postgraduate Diploma in Education – a professional teaching qualification recognised locally.',
    field: 'Natural Sciences',
    degree: 'BEd & BSc (Double Degree)',
    duration: '5 years',
    minIBPoints: 33,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-education-and-bachelor-of-science',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
    ]
  },

  // ============================================
  // SOCIAL SCIENCES PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Social Sciences',
    description:
      'BSocSc at HKU offers comprehensive training across 5 core social science disciplines. Students can select their major after year 1 and can choose from politics, sociology, social work, psychology, and geography. The programme emphasizes experiential learning and offers a wide range of career opportunities. Graduates are well-prepared for careers in government, NGOs, business, and research.',
    field: 'Social Sciences',
    degree: 'Bachelor of Social Sciences',
    duration: '4 years',
    minIBPoints: 32,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-social-sciences',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Bachelor of Science in Psychology',
    description:
      'BSc Psychology at HKU offers research-intensive training in psychology. The programme provides hands-on research experience and prepares students for careers in clinical psychology, educational psychology, and research. Students will learn about cognitive psychology, developmental psychology, social psychology, and neuroscience.',
    field: 'Social Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-psychology-0',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Bachelor of Journalism, Media and AI',
    description:
      'This programme combines journalism, media studies, and artificial intelligence. Students will learn about the role of AI in modern media, digital storytelling, and the ethics of AI in journalism. An internship is required. Double major options are available. The programme prepares students for careers in journalism, media production, public relations, and digital content creation.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-journalism-media-and-ai',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Bachelor of Education in Early Childhood Education and Special Education',
    description:
      "Learn to teach children from birth to six in kindergartens, child care centres, and special child care centres. The five-year programme will equip you with the knowledge, skills, and attitude to work with young children and their families. The curriculum fully integrates early childhood and inclusive education to prepare you to effectively recognise and acknowledge children's diverse needs and support both typical and atypical development. Following graduation, you can apply for registration as a qualified kindergarten teacher, a child care worker and supervisor under the Child Care Services Regulations. You will be considered as having acquired training on the One-year In-service Course in Special Child Care Work recognised by the Social Welfare Department, and to have met the academic qualifications required as a kindergarten principal.",
    field: 'Social Sciences',
    degree: 'Bachelor of Education',
    duration: '5 years',
    minIBPoints: 32,
    programUrl:
      'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-education-early-childhood-education-and-special',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  }
]

async function seedHKUPrograms() {
  console.log('\n🎓 Seeding University of Hong Kong Programs\n')

  try {
    // 1. Find University of Hong Kong
    const hku = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'University of Hong Kong', mode: 'insensitive' } },
          { name: { equals: 'The University of Hong Kong', mode: 'insensitive' } },
          { name: { contains: 'Hong Kong', mode: 'insensitive' } }
        ]
      }
    })

    if (!hku) {
      console.error('❌ The University of Hong Kong not found in database.')
      console.error('   Please create the university first.')
      process.exit(1)
    }

    console.log(`✅ Found The University of Hong Kong (ID: ${hku.id})\n`)

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
          universityId: hku.id
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
              universityId: hku.id,
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
    console.error('\n❌ Error seeding HKU programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedHKUPrograms()
