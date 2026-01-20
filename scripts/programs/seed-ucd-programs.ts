/**
 * Seed University College Dublin Programs to Database
 *
 * Adds undergraduate programs for University College Dublin with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source: User-provided program data
 * All descriptions extracted directly from provided text.
 *
 * Prerequisites: University College Dublin must exist in the database.
 *
 * Run with: npx tsx scripts/programs/seed-ucd-programs.ts
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

// Standard English requirement for all UCD programs: English A HL 3 OR SL 4
const ENGLISH_REQUIREMENT: RequirementDef[] = [
  { courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 3 },
  { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
]

const programs: ProgramDef[] = [
  // ============================================
  // BUSINESS PROGRAMS
  // ============================================
  {
    name: 'Commerce (BComm)',
    description:
      'The BComm is a globally recognised business degree, designed for ambitious and achievement-orientated students who want to make a significant impact in the business world. Combining strong theoretical understanding with the practical skills needed for graduate employment, students are assured of a challenging and relevant programme for the modern business world.',
    field: 'Business & Economics',
    degree: 'Bachelor of Commerce',
    duration: '3 years',
    minIBPoints: 33,
    programUrl: 'https://www.ucd.ie/courses/bcomm-commerce',
    requirements: [
      // Maths SL 6 OR HL 4
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 6 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Economics & Finance (BSc)',
    description:
      'If you have an interest in financial markets and economics, and a strong ability in maths and statistics, this degree provides an excellent springboard for a future career in economics, finance, banking, and business. Recognised as one of the premier degrees in its field in Ireland and internationally, this programme equips students with outstanding expertise in quantitative methods, analytical skills and a rigorous preparation in economics and finance. The skills developed during this course are not only essential for learning Economics and Finance but are also very valuable across numerous career paths.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 39,
    programUrl: 'https://www.ucd.ie/courses/bsc-economics-and-finance',
    requirements: [
      // Maths HL 5
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Commerce International (BComm)',
    description:
      "(BCIT) is a multi-disciplinary Business degree incorporating intercultural competencies and linguistic knowledge, which promote creativity and comprehension of a rapidly evolving world. Students pursue a major in business alongside a minor in a chosen language.\n\nThis programme combines a flexible business education from Ireland's leading business school with the linguistic skills and multicultural insights required to succeed in the exciting world of international business.",
    field: 'Business & Economics',
    degree: 'Bachelor of Commerce',
    duration: '4 years',
    minIBPoints: 33,
    programUrl: 'https://www.ucd.ie/courses/bcomm-commerce-intl',
    requirements: [
      // Maths SL 6 OR HL 4
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 6 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'BSc Business',
    description:
      'The UCD Quinn School has a long tradition at the forefront of business and management education in Ireland and internationally. The BSc Business is an exciting new global-focused degree developed by the Quinn School for students aiming to develop the knowledge, skills and intercultural competencies essential in the global world of business and management. This programme offers modules focusing on real-world business skills and intercultural competencies ideal for students considering a career in international business.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 33,
    programUrl: 'https://www.ucd.ie/courses/bsc-business',
    requirements: [
      // Maths SL 6 OR HL 4
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 6 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // LAW PROGRAMS
  // ============================================
  {
    name: 'Business & Law (BBL)',
    description:
      "The Business & Law (BBL) degree is a popular choice for many students and is extremely well regarded by employers across the legal and financial communities. The degree is a 'double major' which means it combines law and business in a single degree, providing an ideal skill-set for the commercial world and offering valuable career flexibility. If you choose this degree, you will undertake business and law modules in equal measure for your first three years in both the UCD Sutherland School of Law and the UCD Quinn School of Business. This allows you to gain a deep understanding of both disciplines while offering you the opportunity to choose in final year which area interests you most for your career progression.",
    field: 'Law',
    degree: 'Bachelor of Business and Law',
    duration: '4 years',
    minIBPoints: 33,
    programUrl: 'https://www.ucd.ie/courses/bbl-business-and-law',
    requirements: [
      // Maths SL 6 OR HL 4
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 6 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Law with Economics (BCL)',
    description:
      'This course allows you to obtain a highly respected degree in Irish law, whilst simultaneously acquiring a broad knowledge of economics. Certain areas of law (e.g. competition, regulation and intellectual property) are heavily influenced by economic theory. BCL (Law with Economics) graduates are uniquely equipped to understand these regulatory frameworks in all of their conceptual complexity. On this degree, you will embark on a field of cross-disciplinary study which is intellectually very demanding, but also enriching and of practical importance.',
    field: 'Law',
    degree: 'Bachelor of Civil Law',
    duration: '4 years',
    minIBPoints: 33,
    programUrl: 'https://www.ucd.ie/courses/bcl-law-with-economics',
    requirements: [
      // Maths HL 4
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // SOCIAL SCIENCES PROGRAMS
  // ============================================
  {
    name: 'Philosophy, Politics & Economics (BSc)',
    description:
      'PPE provides a broad and deep understanding of how a society works, and indeed how international society works. It examines the complex economic and political forces in play, the problems of measuring and assessing the health of society, and the principles of justice that should guide political decision-making to improve society. PPE will teach students how to read beyond media headlines, and where to find more information about the hot policy questions of the day, in national and international contexts.',
    field: 'Social Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 29,
    programUrl: 'https://www.ucd.ie/courses/bsc-philosophy-politics-economics',
    requirements: [
      // Maths SL 4 OR HL 3
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 3 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Economics (BSc)',
    description:
      "Economics explores how and why people make decisions and choose between alternative ways of spending their money and using their time, energy and skills. That is why Economics can help to shed light on decision-making in areas from love and marriage, to sports and crime. If you are interested in people's behaviour and in current affairs, and if you enjoy problem-solving and are naturally analytical with good numeracy skills, then Economics will appeal to you.",
    field: 'Social Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 29,
    programUrl: 'https://www.ucd.ie/courses/bsc-economics',
    requirements: [
      // Maths HL 5
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Psychology (BSc)',
    description:
      'If you have a questioning attitude and good reasoning skills, you will really enjoy the world opened up by Psychology. Psychology has links to the natural sciences, the social sciences and the arts, so it is likely to appeal to a wide variety of people. The course has core modules that will introduce you to major theories and research methods, and you will also have a chance to choose option modules in specialist areas of psychology (e.g. counselling, clinical psychology and forensic psychology).',
    field: 'Social Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 37,
    programUrl: 'https://www.ucd.ie/courses/bsc-psychology',
    requirements: [
      // Maths SL 4 OR HL 3
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 3 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // ENGINEERING PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Engineering (BE)',
    description:
      'As an engineer, you will make a real difference in the world and be responsible for leading the way in finding solutions to real problems. Will you develop alternative or new sources of energy, invent life-saving medical devices or create new modes of communication? UCD Engineering offers a particularly wide range of engineering specialisations,from Mechanial, Electrical, Electronic, Civil, Materials, Chemical & Bioprocess, Biomedical Engineering, Biosystems and Food to Structural Engineering with Architecture.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 33,
    programUrl: 'https://www.ucd.ie/courses/bsc-engineering',
    requirements: [
      // Maths HL 5
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      // Biology HL4 OR Chemistry HL4 OR Physics HL4 OR Computer Science HL4
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS'], level: 'HL', grade: 4 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // ARCHITECTURE PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Architectural Science (Architecture)',
    description:
      "UCD Architecture is at the forefront of the architectural and urban design debate, both in Ireland and internationally. It plays a central role in society, leading innovation and development on every scale. The Architecture course at UCD offers a means to engage creatively and constructively with society. If you have a capacity and passion for creativity, for making things through technological invention or artistic experimentation, and you're excited by the idea of designing buildings, urban environments and landscapes, then this course is for you.",
    field: 'Architecture',
    degree: 'Bachelor of Architectural Science',
    duration: '4 years',
    minIBPoints: 33,
    programUrl: 'https://www.ucd.ie/courses/barchsc-architecture',
    requirements: [
      // Maths SL 4 OR HL 3
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 3 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Bachelor of Landscape Architecture',
    description:
      'Landscape architecture is undoubtedly one of the most relevant design disciplines today. Global climate change is altering everything - everywhere in the world. We are faced with necessary tasks relating to the design and build of our surrounding environments and ecologies. The landscape and its functions, its ecosystem services and its appearance, will inevitably change, not slow but rapidly. Landscape architects must contribute to the design of this future landscape - urban, semi-urban, and rural.',
    field: 'Architecture',
    degree: 'Bachelor of Landscape Architecture',
    duration: '4 years',
    minIBPoints: 24,
    programUrl: 'https://www.ucd.ie/courses/bsc-landscape-architecture',
    requirements: [
      // Maths SL 4 OR HL 3
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 3 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'City Planning & Environmental Policy (BSc)',
    description:
      'Our degree in City Planning & Environmental Policy is about solving complex issues that we experience in our everyday lives. How can we provide housing for everyone? How can we reduce our climate impact and conserve our natural environment? Where should we build our schools and shops? This unique degree brings together a focus on the city, the environment and design and links them with clear routes to professions and careers.\n\nUCD Planning is also the oldest, largest and most respected planning and environmental policy school in Ireland. Most planners currently employed in Ireland were educated in the School, and the course is accredited by the Royal Town Planning Institute (RTPI).',
    field: 'Architecture',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 24,
    programUrl: 'https://www.ucd.ie/courses/bsc-city-planning-and-environmental-policy',
    requirements: [
      // Maths SL 4 OR HL 3
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 3 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // COMPUTER SCIENCE PROGRAMS
  // ============================================
  {
    name: 'Computer Science (BSc)',
    description:
      'Computer Science is a common entry course and offers the following two degree subjects:\n\n    Computer Science  \n    Computer Science with Data Science & Artificial Intelligence\n\nStudents decide on their degree subject at the end of Second Year. If you are a logical thinker who likes problem solving and you enjoy subjects like mathematics, a degree in Computer Science could be for you.',
    field: 'Computer Science',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 33,
    programUrl: 'https://www.ucd.ie/courses/bsc-computer-science',
    requirements: [
      // Maths SL 6 OR HL 4
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 6 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // NATURAL SCIENCES PROGRAMS
  // ============================================
  {
    name: 'Actuarial & Financial Studies (BSc)',
    description:
      'If you enjoy studying Higher Level Mathematics for the Leaving Certificate or at A-Level and you have strong analytical and problem-solving skills, Actuarial & Financial Studies could be for you. An actuary is a professional who uses numbers to make judgements about the future. This course will prepare you for a professional career in the actuarial or financial professions, but it has also been designed to be broader and more diverse than most traditional courses in actuarial science.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 42,
    programUrl: 'https://www.ucd.ie/courses/bsc-actuarial-and-financial-studies',
    requirements: [
      // Maths HL 6
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Science (BSc)',
    description:
      'The UCD Science common entry course offers a range of degree subjects leading to a BSc degree in one degree subject. Subjects are grouped thematically in streams.\n\nStudents who are interested in exploring a number of streams in First Year can select the Explore Multiple Streams option. If an applicant selects Explore Multiple Streams, they are offered the same First Year module guarantees as students who choose one of the thematic streams.\n\nEmail all CAO queries to AskScience@ucd.ie and our Science Office team will help you with your query.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 33,
    programUrl: 'https://www.ucd.ie/courses/science',
    requirements: [
      // Maths SL 6 OR HL 4
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 6 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4 },
      // Biology HL4 OR Chemistry HL4 OR Physics HL4 OR Computer Science HL4
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS'], level: 'HL', grade: 4 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // ENVIRONMENTAL STUDIES PROGRAMS
  // ============================================
  {
    name: 'Sustainability (BSc)',
    description:
      'The Sustainability course reflects the integrated interdisciplinary approach required in sustainability research, policy and practice. First Year is structured so that students are able to progress into one of the following degree subjects in Second Year:\n\n    Sustainability with Environmental Sciences\n    Sustainability with Social Sciences, Policy & Law\n    Sustainability with Business & Economics',
    field: 'Environmental Studies',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 33,
    programUrl: 'https://www.ucd.ie/courses/sustainability',
    requirements: [
      // Maths SL 6 OR HL 4
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 6 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // MEDICINE & HEALTH PROGRAMS
  // ============================================
  {
    name: 'Biomedical, Health & Life Sciences (BSc)',
    description:
      'This course will appeal to those with a keen interest in science and in how research and technology can impact on human health. It is training scientists at the interface of science and medicine. You will learn how scientifically driven investigations can advance our knowledge of disease prevention, detection and treatment and translating these into clinical utility. The course will immerse you in modern medical and biological sciences and focus on the application of scientific developments. BHLS offers students a unique opportunity to complete a research project with a Principal Investigator in a biomedical research area that interests you and an opportunity to be involved in peer-reviewed publications.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://www.ucd.ie/courses/bsc-biomedical-health-and-life-sciences',
    requirements: [
      // Maths SL 4 OR HL 3
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 3 },
      // Biology HL4 OR Chemistry HL4 OR Physics HL4 OR Computer Science HL4
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS'], level: 'HL', grade: 4 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Medicine',
    description:
      "Our Medicine curriculum is patient-centred and continually adapts to the needs of society and developments in medical knowledge. You will learn from world-class educators and patients in state-of-the-art facilities, immerse yourself in our acclaimed undergraduate student research programme and benefit from a diverse, international student population.\n\nThe main hospitals associated with our programme are St Vincent's University Hospital and the Mater Misericordiae University Hospital. In addition, there are more than 20 other training hospitals and more than 120 primary care practices that will facilitate your learning. You will also benefit from a diverse range of exciting international placement opportunities.",
    field: 'Medicine & Health',
    degree: 'Bachelor of Medicine',
    duration: '6 years',
    minIBPoints: 39,
    programUrl: 'https://www.ucd.ie/courses/medicine',
    requirements: [
      // Maths SL 4 OR HL 3
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 3 },
      // Biology HL4 OR Chemistry HL4 OR Physics HL4 OR Computer Science HL4
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS'], level: 'HL', grade: 4 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
      // Note: Interview also required - mentioned in description
    ]
  },
  {
    name: 'Radiography (BSc)',
    description:
      "Radiographers are responsible for producing high-quality images to assist in the diagnosis and treatment of disease. While radiography is a caring profession, it's also one that requires considerable technological and scientific expertise in both the production of images and the responsible delivery of ionising radiation. If you're interested in science and you want to use your knowledge to care for people, Radiography at UCD may be a perfect fit for you.\n\nOur aim is to prepare graduate radiographers to meet the everyday challenges arising from ongoing advances in diagnostic imaging and healthcare",
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 35,
    programUrl: 'https://www.ucd.ie/courses/bsc-radiography',
    requirements: [
      // Maths SL 4 OR HL 3
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 3 },
      // Biology HL4 OR Chemistry HL4 OR Physics HL4 OR Computer Science HL4
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS'], level: 'HL', grade: 4 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Physiotherapy (BSc)',
    description:
      'Physiotherapists are healthcare professionals responsible for developing, maintaining and restoring movement and functional ability in adults and children using evidence-based practice. Studying Physiotherapy in UCD will provide you with the skills and qualifications required to practice as a physiotherapist upon graduation. With state-of-the-art facilities and globally recognised researchers as lecturers, you will learn in a culture of established academic excellence. If you enjoy working with people and would like to have a career in which you will relieve pain and treat or prevent physical conditions associated with injury, disease or other impairments, this course may be for you.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 39,
    programUrl: 'https://www.ucd.ie/courses/bsc-physiotherapy',
    requirements: [
      // Maths SL 4 OR HL 3
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 3 },
      // Biology HL4 OR Chemistry HL4 OR Physics HL4 OR Computer Science HL4
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS'], level: 'HL', grade: 4 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Sport, Health & Exercise Science (BSc)',
    description:
      'This course is suitable for you if you have a strong interest in sport and exercise science and wish to pursue a career in high performance sport, a clinical profession (e.g. physiotherapy, dietetics, medicine) and/or scientific research in sport and health sciences. Led by top industry professionals in state-of-the-art facilities, you will study the scientific principles underlying the promotion and enhancement of sport, physical health and exercise across the lifespan.\n\nPlease note that the BSc Sport, Health & Exercise Science course replaced the BSc Health & Performance Science course in September 2025.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 35,
    programUrl: 'https://www.ucd.ie/courses/bsc-sport-health-exercise-science',
    requirements: [
      // Maths SL 4 OR HL 3
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 3 },
      // Biology HL4 OR Chemistry HL4 OR Physics HL4 OR Computer Science HL4
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS'], level: 'HL', grade: 4 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Sport & Exercise Management (BSc)',
    description:
      "The multidisciplinary nature of the BSc in Sport & Exercise Management equips students with skills in areas such as management, marketing, event planning, human resources, economics and finance, sports development and coaching. These underpin the structure and governance of sport, health and exercise programmes today. If these opportunities interest you, the combination of UCD's internationally recognised academic excellence and sporting reputation makes this degree ideal.",
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 33,
    programUrl: 'https://www.ucd.ie/courses/bsc-sport-and-exercise-management',
    requirements: [
      // Maths SL 4 OR HL 3
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 3 },
      // Biology HL4 OR Chemistry HL4 OR Physics HL4 OR Computer Science HL4
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS'], level: 'HL', grade: 4 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // VETERINARY MEDICINE PROGRAMS
  // ============================================
  {
    name: 'Veterinary Medicine (MVB)',
    description:
      "This programme will educate you to the best international standards in veterinary medicine. To work as a vet in the Republic of Ireland you must have a degree in Veterinary Medicine, which is registered by the Veterinary Council of Ireland. UCD's Bachelor of Veterinary Medicine (MVB) is Ireland's only such degree. The veterinary profession is concerned with the promotion of the health and welfare of animals of special importance to society. This involves the care of healthy and sick animals, the prevention, recognition, control and treatment of their diseases and of diseases transmitted from animals to man, and the welfare and productivity of livestock.",
    field: 'Medicine & Health',
    degree: 'Master of Veterinary Medicine',
    duration: '5 years',
    minIBPoints: 40,
    programUrl: 'https://www.ucd.ie/courses/mvb-veterinary-medicine',
    requirements: [
      // Maths SL 4 OR HL 3
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 3 },
      // Biology HL5 OR Chemistry HL5 OR Physics HL5 OR Computer Science HL5
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS'], level: 'HL', grade: 5, critical: true },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Veterinary Nursing (BSc)',
    description:
      'In response to the recognition and registration of veterinary nursing as a profession in Ireland, UCD developed and implemented a full-time, four-year honours BSc Veterinary Nursing degree programme in 2009. The degree provides the graduate with not only a sound academic foundation but also the practical skills and competencies with which to build a solid career as a professional veterinary nurse.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 33,
    programUrl: 'https://www.ucd.ie/courses/bsc-veterinary-nursing',
    requirements: [
      // Maths SL 4 OR HL 3
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 3 },
      // Biology HL4 OR Chemistry HL4 OR Physics HL4 OR Computer Science HL4
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS'], level: 'HL', grade: 4 },
      // English A HL 3 OR SL 4
      ...ENGLISH_REQUIREMENT
    ]
  }
]

async function seedUCDPrograms() {
  console.log('\n🎓 Seeding University College Dublin Programs\n')

  try {
    // 1. Find University College Dublin
    const ucd = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'University College Dublin', mode: 'insensitive' } },
          { name: { contains: 'UCD', mode: 'insensitive' } },
          { abbreviatedName: { equals: 'UCD', mode: 'insensitive' } }
        ]
      }
    })

    if (!ucd) {
      console.error('❌ University College Dublin not found in database.')
      console.error('   Please create the university first.')
      process.exit(1)
    }

    console.log(`✅ Found University College Dublin (ID: ${ucd.id})\n`)

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
          universityId: ucd.id
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
              universityId: ucd.id,
              fieldOfStudyId: fieldId,
              degreeType: programDef.degree,
              duration: programDef.duration,
              minIBPoints: programDef.minIBPoints,
              programUrl: programDef.programUrl,
              requirementsVerified: true,
              requirementsUpdatedAt: new Date()
            }
          })

          // Group requirements by their structure to create proper OR groups
          // Requirements with same level and grade are treated as OR alternatives
          const reqGroups: Map<string, RequirementDef[]> = new Map()

          for (const req of programDef.requirements) {
            const key = `${req.level}-${req.grade}-${req.critical || false}`
            if (!reqGroups.has(key)) {
              reqGroups.set(key, [])
            }
            reqGroups.get(key)!.push(req)
          }

          // Create requirements with proper OR grouping
          for (const [, reqs] of reqGroups) {
            // If multiple requirements have same key, they should be in same OR group
            // Also, within each requirement, multiple courses are OR alternatives
            const orGroupId = crypto.randomUUID()

            for (const req of reqs) {
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
    console.error('\n❌ Error seeding UCD programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedUCDPrograms()
