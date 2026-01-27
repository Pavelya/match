/**
 * Seed NTU Programs to Database
 *
 * Adds undergraduate programs for Nanyang Technological University (Singapore) with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source: docs/countries/ntu.md
 *
 * Prerequisites: NTU must be created (handled by this script if missing).
 *
 * Run with: npx tsx scripts/programs/seed-ntu-programs.ts
 */

import { PrismaClient, CourseLevel } from '@prisma/client'
import crypto from 'crypto'

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
  // BUSINESS & ECONOMICS
  // ============================================
  {
    name: 'Bachelor of Accountancy',
    description:
      'At Nanyang Technological University, we have the most established, well-regarded accountancy degree programme in Singapore and the region. For more than five decades, we have nurtured forward-looking professionals for leading accountancy roles. Through our full-time, three-year Bachelor of Accountancy programme, we will broaden your mind with exciting, flexible career options to pursue beyond accounting.',
    field: 'Business & Economics',
    degree: 'Bachelor of Accountancy',
    duration: '3 years',
    minIBPoints: 36,
    programUrl: 'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-accountancy',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Bachelor of Business',
    description:
      'Nanyang Business School’s Bachelor of Business (BBus) with Honours (Single Major) and Bachelor of Business (BBus) with Honours (Double Major) are two enhanced, four-year, full-time business programmes designed to equip future leaders with the skills to thrive in today’s dynamic, hyperconnected world.',
    field: 'Business & Economics',
    degree: 'Bachelor of Business',
    duration: '3 years',
    minIBPoints: 36,
    programUrl: 'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-business',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Accountancy for Future Leaders (Sustainability Management and Analytics)',
    description:
      'Integrates sustainability, analytics, and 30-week internship with premier ATO employers of ACRA. Gain real-world experience and accelerated path to a Chartered Accountant.',
    field: 'Business & Economics',
    degree: 'Bachelor of Accountancy',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/accountancy-for-future-leaders-bachelor-of-accountancy-in-sustainability-management-and-analytics',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }
    ]
  },
  {
    name: 'Bachelor of Accountancy with Minor in Digitalisation and Data Analytics',
    description:
      'The skills to make sense of data will enable you to make better informed decisions. Modern professionals are recognising the need to acquire skills in digital technology and data analytics to stay relevant in the increasingly digital economy.',
    field: 'Business & Economics',
    degree: 'Bachelor of Accountancy',
    duration: '3 years',
    minIBPoints: 37,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-accountancy-with-minor-in-digitalisation-and-data-analytics-(dda)',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Bachelor of Accountancy with Second Major in Entrepreneurship',
    description:
      'You can now choose to pursue a Second Major in Entrepreneurship (SMiE), offered by NTU Entrepreneurship Academy in collaboration with NBS.',
    field: 'Business & Economics',
    degree: 'Bachelor of Accountancy',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-accountancy-with-second-major-in-entrepreneurship',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Bachelor of Applied Computing in Finance',
    description:
      'An interdisciplinary degree that blends deep domain knowledge in finance and strong technological and analytical skillsets through a unique mix of classroom learning and experiential training.',
    field: 'Business & Economics',
    degree: 'Bachelor of Applied Computing',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-applied-computing-in-finance',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 6, critical: true }
    ]
  },

  // ============================================
  // ARTS & HUMANITIES
  // ============================================
  {
    name: 'Bachelor of Arts (Hons) in Chinese',
    description:
      'We provide a concrete foundation in both classical and modern Chinese literature, a deeper understanding of Chinese language, and a broader perspective on Modern China and the Chinese Diaspora in Southeast Asia.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (Hons)',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-in-chinese',
    requirements: [
      { courses: ['MAN-LIT', 'MAN-LL', 'MAN-B'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Bachelor of Arts (Hons) in English',
    description:
      'Our programme reflects a breadth of interests that is relevant both regionally and globally, and embraces many of the key areas that comprise contemporary literary studies.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (Hons)',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-in-english',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Bachelor of Arts (Hons) in History',
    description:
      'We seek to train students to not only think critically but also to apply interdisciplinary methods to identify and address contemporary problems from historical perspectives.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (Hons)',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-in-history',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5 }]
  },
  {
    name: 'Bachelor of Arts (Hons) in Linguistics and Multilingual Studies',
    description:
      'As language is an integral part of all human activities, the study of linguistics provides a conducive platform for interdisciplinary discourse and research.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (Hons)',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-linguistics-and-multilingual-studies',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Bachelor of Arts (Hons) in Philosophy',
    description:
      'As an academic discipline, philosophy is concerned with the study of fundamental problems, such as those about the nature of knowledge, reality, existence, mind, language, science, and morality.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (Hons)',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-philosophy',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5 }]
  },
  {
    name: 'Bachelor of Arts in Art and Education',
    description:
      'The National Institute of Education (NIE) ensures that our undergraduates are equipped with high-quality skills, knowledge and values that will mould them into top-notch educators.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (Education)',
    duration: '4 years',
    minIBPoints: 33,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-in-art-and-education',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Bachelor of Arts (Hons) in Double Major - Chinese and English',
    description:
      'During this four-year degree programme, undergraduates will read both English (ELH) and Chinese (CHIN), benefiting from the expertise and resources of the two disciplines from the School of Humanities (SoH).',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (Hons)',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-double-major---chinese-and-english',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'HL', grade: 6, critical: true },
      { courses: ['MAN-LIT', 'MAN-LL', 'MAN-B'], level: 'HL', grade: 6, critical: true }
    ]
  },
  {
    name: 'Bachelor of Arts (Hons) in Double Major - Chinese and Linguistics',
    description:
      'During this four-year degree programme, undergraduates will read both Linguistics and Multilingual Studies (LMS) and Chinese (CHN), benefiting from the expertise and resources of both Programmes within the School of Humanities (SoH).',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (Hons)',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-double-major---chinese-and-linguistics-and-multilingual-studies',
    requirements: [
      { courses: ['MAN-LIT', 'MAN-LL', 'MAN-B'], level: 'HL', grade: 6, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Bachelor of Arts (Hons) in Double Major - English and History',
    description:
      'During this four-year degree programme, undergraduates will read both English Literature (ELH) and History (HIST), benefiting from the expertise and resources of the two disciplines from the School of Humanities (SoH).',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (Hons)',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-double-major---english-and-history',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'HL', grade: 6, critical: true }
    ]
  },
  {
    name: 'Bachelor of Arts (Hons) in Double Major - English and Philosophy',
    description:
      'During this four-year degree programme, undergraduates will read both English Literature (ELH) and Philosophy (PHIL), benefiting from the expertise and resources of the two disciplines from the School of Humanities (SoH).',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (Hons)',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-double-major---english-and-philosophy',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'HL', grade: 6, critical: true }
    ]
  },

  // ============================================
  // MEDIA
  // ============================================
  {
    name: 'Bachelor of Communication Studies',
    description:
      'Ranked 1st in Asia and 4th in the World for Communication & Media Studies, the Wee Kim Wee School of Communication and Information (WKWSCI) offers a comprehensive and hands-on Communication Studies experience for aspiring media professionals.',
    field: 'Media',
    degree: 'Bachelor of Communication Studies',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-communication-studies',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Bachelor of Communication Studies with Second Major in Business',
    description:
      'Combine communication skills with business knowledge. Gain hands-on experience for careers in PR, marketing, media, research, and corporate roles.',
    field: 'Media',
    degree: 'Bachelor of Communication Studies',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-communication-studies-with-second-major-in-business',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 6, critical: true }]
  },
  {
    name: 'Bachelor of Communication Studies with Second Major in Governance',
    description: 'Combine communication skills with governance and global affairs knowledge.',
    field: 'Media',
    degree: 'Bachelor of Communication Studies',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-communication-studies-with-second-major-in-governance-and-international-relations',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 6, critical: true }]
  },

  // ============================================
  // SOCIAL SCIENCES
  // ============================================
  {
    name: 'Bachelor of Arts (Hons) in Double Major - Psychology and Linguistics',
    description:
      'The Double Major Programme is a four-year direct honours degree programme. Undergraduate students will read two majors chosen from among the disciplinary strengths of the four schools in the College.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts (Hons)',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-double-major---psychology-and-linguistics-multilingual-studies',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }]
  },

  // ============================================
  // MEDICINE & HEALTH
  // ============================================
  {
    name: 'Bachelor of Chinese Medicine',
    description:
      'This four-year degree programme focuses on Chinese medicine as well as basic western medicine knowledge. This is a bilingual course with English and Mandarin as the media of instruction.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Chinese Medicine',
    duration: '5 years',
    minIBPoints: 36,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-chinese-medicine',
    requirements: [
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['MAN-LIT', 'MAN-LL', 'MAN-B'], level: 'HL', grade: 6, critical: true }
    ]
  },
  {
    name: 'Sport Science and Management',
    description:
      'Focuses on the scientific principles of sport and exercise, as well as the management of sport organizations.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science (Stock Science and Management)',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-sport-science-and-management',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }]
  },

  // ============================================
  // ENGINEERING
  // ============================================
  {
    name: 'Aerospace Engineering',
    description:
      'Covers the design, integration and testing of aircraft and spacecraft. It builds on the core mechanical engineering curriculum and provides specialization in aerodynamics, propulsion, flight mechanics and avionics.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-aerospace-engineering',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 6, critical: true }
    ]
  },
  {
    name: 'Bioengineering',
    description:
      'Integrates engineering principles with biological sciences to develop new technologies and devices for healthcare.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-bioengineering',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Chemical & Biomolecular Engineering',
    description:
      'Combines the principles of chemistry, biology, and engineering to solve problems in the production of chemicals, fuel, drugs, food, and many other products.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-chemical-and-biomolecular-engineering',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Civil Engineering',
    description:
      'Focuses on the planning, design, construction, and maintenance of infrastructure such as buildings, bridges, and roads.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-civil-engineering',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Computer Engineering',
    description:
      'Integrates computer science and electronic engineering to develop computer systems and devices.',
    field: 'Computer Science',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-computer-engineering',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS', 'CHEM', 'BIO', 'CS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Electrical and Electronic Engineering',
    description:
      'Covers a wide range of topics including power systems, electronics, communications, and control systems.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-electrical-and-electronic-engineering',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Environmental Engineering',
    description:
      'Focuses on the application of engineering principles to improve and maintain the environment for the protection of human health and ecosystems.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-environmental-engineering',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Information Engineering and Media',
    description:
      'A hybrid program that combines engineering technology with creative media design.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-information-engineering-and-media',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Maritime Studies',
    description: 'Focuses on the shipping, port, and maritime logistics industries.',
    field: 'Engineering',
    degree: 'Bachelor of Science (Maritime Studies)',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-maritime-studies',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
      { courses: ['PHYS', 'CHEM'], level: 'SL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Materials Engineering',
    description:
      'Focuses on the development and application of new materials for various industries.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-materials-engineering',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS', 'CHEM'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Mechanical Engineering',
    description:
      'Covers the design, analysis, manufacturing, and maintenance of mechanical systems.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-mechanical-engineering',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS', 'CHEM'], level: 'HL', grade: 5, critical: true }
    ]
  },

  // ============================================
  // COMPUTER SCIENCE
  // ============================================
  {
    name: 'Computer Science',
    description: 'Focuses on the theory, design, and application of computer software and systems.',
    field: 'Computer Science',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 39,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-computer-science',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS', 'CHEM', 'BIO', 'CS'], level: 'HL', grade: 6, critical: true }
    ]
  },
  {
    name: 'Data Science and Artificial Intelligence',
    description:
      'Designed to train students in the principles and practice of data science and AI, with a strong emphasis on computational and statistical methods.',
    field: 'Computer Science',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-data-science-and-artificial-intelligence',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 6, critical: true }
    ]
  },

  // ============================================
  // NATURAL SCIENCES
  // ============================================
  {
    name: 'Biological Sciences',
    description: 'Provides a strong foundation in modern biology and its applications.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-biological-sciences',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Chemistry and Biological Chemistry',
    description: 'Focuses on the study of chemistry and its interface with biology.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-chemistry-and-biological-chemistry',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS', 'BIO'], level: 'SL', grade: 5, critical: true } // Assuming physics or biology also required
    ]
  },
  {
    name: 'Environmental Earth Systems Science',
    description: 'An interdisciplinary program that studies the Earth as a complex system.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-environmental-earth-systems-science',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS', 'CHEM', 'BIO', 'ECON'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Mathematical Sciences',
    description: 'Provides rigorous training in mathematics and its applications.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-mathematical-sciences',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Physics and Applied Physics',
    description:
      'Covers the fundamental principles of physics and their applications in technology.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-physics-and-applied-physics',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  }
]

async function seedNTUPrograms() {
  console.log('\n🎓 Seeding Nanyang Technological University (NTU) Programs\n')

  try {
    // 1. Find or create NTU
    let ntu = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'Nanyang Technological University', mode: 'insensitive' } },
          { name: { contains: 'Nanyang Technological University', mode: 'insensitive' } }
        ]
      }
    })

    if (!ntu) {
      // Get Singapore country
      const sg = await prisma.country.findFirst({
        where: { code: 'SG' }
      })

      if (!sg) {
        console.error('❌ Singapore (SG) not found in database.')
        console.error('   Please run: npx prisma db seed first')
        process.exit(1)
      }

      // Create NTU
      ntu = await prisma.university.create({
        data: {
          name: 'Nanyang Technological University',
          description:
            'Nanyang Technological University (NTU) is one of the top universities in the world, known for its strong engineering and business programs. It offers a vibrant campus life and a diverse community of students and faculty.',
          countryId: sg.id,
          city: 'Singapore',
          classification: 'PUBLIC',
          websiteUrl: 'https://www.ntu.edu.sg',
          studentPopulation: 33000 // Approximate
        }
      })
      console.log(`✅ Created NTU (ID: ${ntu.id})\n`)
    } else {
      console.log(`✅ Found NTU (ID: ${ntu.id})\n`)
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
          universityId: ntu.id
        }
      })

      if (existing) {
        console.log(`   ⏭️  Skipping existing program: ${programDef.name}`)
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
              universityId: ntu.id,
              fieldOfStudyId: fieldId,
              degreeType: programDef.degree,
              duration: programDef.duration,
              minIBPoints: programDef.minIBPoints,
              programUrl: programDef.programUrl,
              requirementsVerified: true,
              requirementsUpdatedAt: new Date()
            }
          })

          // Create requirements
          for (const req of programDef.requirements) {
            // For OR groups (multiple courses), create a shared orGroupId
            const orGroupId = req.courses.length > 1 ? crypto.randomUUID() : null

            for (const courseCode of req.courses) {
              const courseId = courseMap.get(courseCode)
              if (courseId) {
                await tx.programCourseRequirement.create({
                  data: {
                    programId: program.id,
                    ibCourseId: courseId,
                    requiredLevel: req.level,
                    minGrade: req.grade,
                    isCritical: req.critical || false,
                    orGroupId: orGroupId
                  }
                })
              } else {
                console.warn(`      ⚠️  Course "${courseCode}" not found for ${programDef.name}`)
              }
            }
          }
        })

        console.log(`   ✅ Created program: ${programDef.name}`)
        successCount++
      } catch (error) {
        console.error(`   ❌ Failed to create ${programDef.name}:`, error)
        failCount++
      }
    }

    console.log('\n📊 Seeding Summary:')
    console.log(`   ✅ Created: ${successCount}`)
    console.log(`   ⏭️  Skipped: ${skipCount}`)
    console.log(`   ❌ Failed:  ${failCount}\n`)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedNTUPrograms()
