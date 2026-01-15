/**
 * Seed University of Manchester Programs to Database
 *
 * Adds undergraduate programs for The University of Manchester with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source: https://www.manchester.ac.uk/study/undergraduate/courses/2026/
 *
 * Prerequisites: University of Manchester must exist in the database.
 * If not, create it first.
 *
 * Run with: npx tsx scripts/programs/seed-manchester-programs.ts
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
  // BUSINESS & ACCOUNTING PROGRAMS
  // ============================================
  {
    name: 'BSc Accounting',
    description:
      'This unique, professionally oriented course was designed alongside the Institute of Chartered Accountants in England and Wales (ICAEW) Undergraduate Partnership Programme (UPP); one of three universities at which this is offered. This partnership ensures that our curriculum is relevant to the industry and provides students with the opportunity to gain credit towards some accountancy papers. You will also be met with further opportunities such as networking events and field trips run by the ICAEW and access to training software and platforms through their website.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/07808/bsc-accounting/',
    requirements: [] // 6,6,6 HL, no specific subject requirements
  },
  {
    name: 'BAEcon Accounting and Finance',
    description:
      'BA Accounting and Finance offers a career-focused programme of study in conjunction with Alliance Manchester Business School.',
    field: 'Business & Economics',
    degree: 'Bachelor of Arts in Economics',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/05151/baecon-accounting-and-finance/',
    requirements: [] // 6,6,6 HL, no specific subject requirements
  },
  {
    name: 'BSc Accounting with Industrial/Professional Experience',
    description:
      'This unique, professionally oriented course was designed alongside the Institute of Chartered Accountants in England and Wales Undergraduate Partnership Programme (UPP). The four-year degree offers you the opportunity to apply skills learnt into real-world practice during your degree.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/09937/bsc-accounting-with-industrial-professional-experience/',
    requirements: [] // 6,6,6 HL, no specific subject requirements
  },
  {
    name: 'BSc Actuarial Science and Mathematics',
    description:
      "This programme combines the strengths of our academics' backgrounds in mathematical research with actuarial science. It prepares students for careers in insurance, finance, and risk management.",
    field: 'Business & Economics',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 37,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/07383/bsc-actuarial-science-and-mathematics/',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'BAEcon Economics',
    description:
      'Choose an Economics degree that offers award-winning teaching and a wide range of course options all within a rich social science context.',
    field: 'Business & Economics',
    degree: 'Bachelor of Arts in Economics',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/05134/baecon-economics/',
    requirements: [] // 6,6,6 HL, no specific subject requirements
  },
  {
    name: 'BSc Management',
    description:
      'Our flexible management courses share a common first year before allowing you to focus on your chosen specialism. This course prepares students for professional and managerial careers.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/03519/bsc-management/',
    requirements: [] // 6,6,6 HL, no specific subject requirements
  },

  // ============================================
  // COMPUTER SCIENCE & ENGINEERING PROGRAMS
  // ============================================
  {
    name: 'BSc Computer Science',
    description:
      "Ranked in the UK's top 10 for Computer Science (QS World University Rankings 2025). Birthplace of the world's first stored-program computer and home to the first graduates in Computer Science! One of the most targeted universities by top UK employers. Enjoy the freedom to choose from an extremely wide range of Computer Science modules and curate your skillset.",
    field: 'Computer Science',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00560/bsc-computer-science/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true },
      { courses: ['CS', 'PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 6 } // At least one science at HL
    ]
  },
  {
    name: 'BSc Computer Science and Mathematics',
    description:
      'A joint honours programme combining computer science with mathematics, providing strong foundations in both disciplines for careers in technology and research.',
    field: 'Computer Science',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00558/bsc-computer-science-and-mathematics/',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'BEng Aerospace Engineering',
    description:
      'The platform for a career in flagship industry. This programme provides the foundation for careers in aerospace, aeronautics, and related engineering fields.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '3 years',
    minIBPoints: 37,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/03333/beng-aerospace-engineering/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'MEng Aerospace Engineering',
    description:
      "Aerospace engineering at the leading edge. This four-year integrated Master's programme provides comprehensive training in aerospace engineering.",
    field: 'Engineering',
    degree: 'Master of Engineering',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/03826/meng-aerospace-engineering/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'BEng Chemical Engineering',
    description:
      'The technical aspects of chemical engineering revolve around managing the behaviour of materials and chemical reactions. This programme prepares students for careers in process engineering, pharmaceuticals, and energy.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/03340/beng-chemical-engineering/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'BEng Civil and Structural Engineering',
    description:
      'This programme covers the planning, design, and construction of infrastructure including buildings, bridges, and transportation systems.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/03858/meng-civil-and-structural-engineering/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'BEng Electrical and Electronic Engineering',
    description:
      'Study the design and development of electrical systems, from microelectronics to power systems, telecommunications, and renewable energy technologies.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/03363/beng-electrical-and-electronic-engineering/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'BEng Mechanical Engineering',
    description:
      'Design and analyze mechanical systems from nanotechnology to spacecraft. This programme covers thermodynamics, fluid mechanics, materials science, and mechanical design.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/03389/beng-mechanical-engineering/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'BEng Mechatronic Engineering',
    description:
      'Mechatronics combines mechanical engineering, electronics, and computer science to create intelligent systems and robots.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/03394/beng-mechatronic-engineering/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 }
    ]
  },

  // ============================================
  // NATURAL SCIENCES PROGRAMS
  // ============================================
  {
    name: 'BSc Mathematics',
    description:
      'Develop advanced mathematical reasoning and problem-solving skills. This programme covers pure and applied mathematics including analysis, algebra, statistics, and computational methods.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 37,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00590/bsc-mathematics/',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'BSc Physics',
    description:
      'A Manchester physics degree gives you a thorough understanding of the physical world, and a deep insight into physics applications and technology.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00638/bsc-physics/',
    requirements: [
      { courses: ['PHYS'], level: 'HL', grade: 7, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'BSc Physics with Astrophysics',
    description:
      'Combine core physics with astrophysics to study the universe, from quantum mechanics to cosmology.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00639/bsc-physics-with-astrophysics/',
    requirements: [
      { courses: ['PHYS'], level: 'HL', grade: 7, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'BSc Chemistry',
    description:
      'Our breadth and depth means you can specialise in niche areas, and further develop key areas and concepts in chemistry.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00544/bsc-chemistry/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['MATH-AA', 'MATH-AI', 'PHYS', 'BIO'], level: 'HL', grade: 6 } // One other science or math
    ]
  },
  {
    name: 'MChem Chemistry',
    description:
      "World-class study from where the subject has its origins. This four-year integrated Master's programme provides advanced training in chemistry.",
    field: 'Natural Sciences',
    degree: 'Master of Chemistry',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/01449/mchem-chemistry/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 7, critical: true },
      { courses: ['MATH-AA', 'MATH-AI', 'PHYS', 'BIO'], level: 'HL', grade: 6 } // One other science or math
    ]
  },
  {
    name: 'BSc Biology',
    description:
      'Our BSc Biology degree covers a range of biological sciences, leading to careers in scientific research, communication, and postgraduate study.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 35,
    programUrl: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00524/bsc-biology/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'MSci Biology',
    description:
      "An integrated Master's programme in Biology providing advanced research training and in-depth study of biological sciences.",
    field: 'Natural Sciences',
    degree: 'Master of Science (Integrated)',
    duration: '4 years',
    minIBPoints: 36,
    programUrl: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/10111/msci-biology/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'BSc Biochemistry',
    description:
      'Our BSc Biochemistry degree covers the chemical properties of biologically important molecules and processes in cells and tissues.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00521/bsc-biochemistry/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'MSci Biochemistry',
    description:
      "An integrated Master's programme in Biochemistry providing advanced research training in molecular and cellular biology.",
    field: 'Natural Sciences',
    degree: 'Master of Science (Integrated)',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/10110/msci-biochemistry/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'BSc Biotechnology',
    description:
      'Study the application of biological systems and living organisms to develop or make products for specific uses.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/08662/bsc-biotechnology/',
    requirements: [{ courses: ['BIO', 'CHEM'], level: 'HL', grade: 6, critical: true }]
  },
  {
    name: 'MSci Biotechnology',
    description:
      "An integrated Master's programme in Biotechnology providing advanced training in biological applications and research.",
    field: 'Natural Sciences',
    degree: 'Master of Science (Integrated)',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/10114/msci-biotechnology/',
    requirements: [{ courses: ['BIO', 'CHEM'], level: 'HL', grade: 6, critical: true }]
  },
  {
    name: 'BSc Genetics',
    description: 'Study the science of heredity and genetic variation in living organisms.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 35,
    programUrl: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00571/bsc-genetics/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'BSc Microbiology',
    description:
      'Study microorganisms including bacteria, viruses, fungi, and their applications in medicine, industry, and the environment.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00609/bsc-microbiology/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'BSc Molecular Biology',
    description:
      'Study the molecular basis of biological activity, focusing on DNA, RNA, and protein synthesis.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00614/bsc-molecular-biology/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'BSc Zoology',
    description:
      'Study the biology of animals, their structure, embryology, evolution, classification, habits, and distribution.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 35,
    programUrl: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00663/bsc-zoology/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'BSc Life Sciences',
    description:
      'A broad-based programme covering multiple aspects of the life sciences with flexibility to specialise.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00585/bsc-life-sciences/',
    requirements: [{ courses: ['BIO'], level: 'HL', grade: 6, critical: true }]
  },
  {
    name: 'BSc Environmental Science',
    description:
      'Study the environment and develop solutions for environmental challenges including climate change and sustainability.',
    field: 'Environmental Studies',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/12124/bsc-environmental-science/',
    requirements: [{ courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true }]
  },

  // ============================================
  // MEDICINE & HEALTH PROGRAMS
  // ============================================
  {
    name: 'MBChB Medicine',
    description:
      'Our five-year MBChB Medicine degree gives you the breadth, knowledge and clinical skills you need to be the best doctor you can possibly be. Gain the knowledge, professional behaviours and clinical skills required to train as a doctor and become eligible to apply for provisional registration with the General Medical Council. Study at a university ranked 6th in the UK for Medicine (QS World University Rankings 2025).',
    field: 'Medicine & Health',
    degree: 'Bachelor of Medicine and Bachelor of Surgery',
    duration: '5 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/01428/mbchb-medicine/',
    requirements: [
      { courses: ['CHEM', 'BIO'], level: 'HL', grade: 6, critical: true }, // Chemistry or Biology at HL
      { courses: ['CHEM', 'BIO', 'PHYS', 'PSYCH', 'MATH-AA', 'MATH-AI'], level: 'HL', grade: 6 } // Another science
    ]
  },
  {
    name: 'BNurs Adult Nursing',
    description:
      'Our BNurs/MNurs Adult Nursing degree will enable you to train as a nurse specialising in the care of adult patients.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Nursing',
    duration: '3 years',
    minIBPoints: 30,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/10971/bnurs-adult-nursing/',
    requirements: [{ courses: ['BIO', 'CHEM', 'PSYCH'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: "BNurs Children's Nursing",
    description: 'Train as a nurse specialising in the care of children and young people.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Nursing',
    duration: '3 years',
    minIBPoints: 30,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/10972/bnurs-childrens-nursing/',
    requirements: [{ courses: ['BIO', 'CHEM', 'PSYCH'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'MPharm Pharmacy',
    description:
      'Our MPharm Pharmacy degree is accredited by the GPhC and provides theoretical and clinical training to prepare you for a career as a pharmacist.',
    field: 'Medicine & Health',
    degree: 'Master of Pharmacy',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/01695/mpharm-pharmacy/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO'], level: 'HL', grade: 6 }, // Either Biology HL with Math SL
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'BSc Dental Hygiene and Therapy',
    description:
      'Train to become a dental hygienist and dental therapist, providing essential oral health care.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 32,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/20060/bsc-dental-hygiene-and-therapy/',
    requirements: [{ courses: ['BIO', 'CHEM'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'BSc Medical Biochemistry',
    description:
      'Study biochemistry with a focus on its medical applications, preparing for careers in healthcare research.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00602/bsc-medical-biochemistry/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'BSc Immunology',
    description: 'Study the immune system and its role in health and disease.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/10284/bsc-immunology/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 5 }
    ]
  },

  // ============================================
  // SOCIAL SCIENCES & PSYCHOLOGY
  // ============================================
  {
    name: 'BSc Psychology',
    description:
      'Our BPS accredited BSc Psychology degree offers placement and study abroad options, alongside teaching from world-leading academics.',
    field: 'Social Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00653/bsc-psychology/',
    requirements: [
      {
        courses: ['CHEM', 'BIO', 'PHYS', 'PSYCH', 'MATH-AA', 'MATH-AI'],
        level: 'HL',
        grade: 6,
        critical: true
      }
    ]
  },
  {
    name: 'BSc Cognitive Neuroscience and Psychology',
    description:
      'Combine psychology with neuroscience to understand the biological basis of behaviour and cognition.',
    field: 'Social Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/20942/bsc-cognitive-neuroscience-and-psychology/',
    requirements: [
      {
        courses: ['CHEM', 'BIO', 'PHYS', 'PSYCH', 'MATH-AA', 'MATH-AI'],
        level: 'HL',
        grade: 6,
        critical: true
      }
    ]
  },
  {
    name: 'BSc Educational Psychology',
    description: 'Study how psychological principles apply to education and learning.',
    field: 'Social Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/11534/bsc-educational-psychology/',
    requirements: [] // 6,5,5 HL, no specific subject requirements
  },
  {
    name: 'BSoc Sociology',
    description:
      'Study society, social institutions, and social relationships through empirical investigation and critical analysis.',
    field: 'Social Sciences',
    degree: 'Bachelor of Social Science',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00678/bsocsc-sociology/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'BA Criminology',
    description: 'Study crime, criminal behaviour, and the criminal justice system.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/21803/ba-criminology/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'BSc Education',
    description:
      'Study the theory and practice of education, preparing for careers in teaching, educational policy, and research.',
    field: 'Social Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 34,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/12384/bsc-education/',
    requirements: [] // No specific subject requirements
  },

  // ============================================
  // LAW
  // ============================================
  {
    name: 'LLB Law',
    description: "Study for a qualifying law degree at one of the UK's leading law schools.",
    field: 'Law',
    degree: 'Bachelor of Laws',
    duration: '3 years',
    minIBPoints: 37,
    programUrl: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/12446/llb-law/',
    requirements: [] // 7,6,6 HL, no specific subject requirements
  },

  // ============================================
  // ARTS & HUMANITIES
  // ============================================
  {
    name: 'BA Architecture',
    description:
      "Start your career at one of the UK's top architecture schools. A mixture of science or maths and humanities or arts subjects is preferred.",
    field: 'Architecture',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00178/ba-architecture/',
    requirements: [] // 6,6,6 HL, subject mix preferred but not required
  },
  {
    name: 'BA Archaeology',
    description:
      'Study with researchers of international calibre on archaeological projects spanning the globe through Archaeology at Manchester.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 34,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00175/ba-archaeology/',
    requirements: [] // 6,5,5 HL, essay-based subject required
  },
  {
    name: 'BA Drama',
    description: "Study drama and theatre at one of the UK's leading drama departments.",
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 35,
    programUrl: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00198/ba-drama/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'BA Drama and Film Studies',
    description: 'Combine the study of drama with film studies.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/12655/ba-drama-and-film-studies/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'BA Digital Media, Culture and Society',
    description: 'Study the impact of digital media on culture and society.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/21197/ba-digital-media-culture-and-society/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'BA English Language',
    description: 'Study the English language, its structure, history, and social uses.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00212/ba-english-language/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'BA Geography',
    description:
      "Study physical and human geography at one of the UK's leading geography departments.",
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 35,
    programUrl: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00232/ba-geography/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'BA History',
    description:
      "Study history from ancient times to the present day at one of the UK's leading history departments.",
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 35,
    programUrl: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00255/ba-history/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'BA Linguistics',
    description: 'Study the scientific analysis of language, its structure, and meaning.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00291/ba-linguistics/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'BA Liberal Arts',
    description:
      'A flexible interdisciplinary programme allowing study across multiple disciplines.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/17859/ba-liberal-arts/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'MusB Music',
    description:
      "Study music performance, composition, and musicology at one of the UK's leading music departments.",
    field: 'Arts & Humanities',
    degree: 'Bachelor of Music',
    duration: '3 years',
    minIBPoints: 35,
    programUrl: 'https://www.manchester.ac.uk/study/undergraduate/courses/2026/02397/musb-music/',
    requirements: [] // Audition required, no specific IB subject requirements
  },
  {
    name: 'BA German Studies',
    description: 'Study German language, literature, and culture.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00237/ba-german-studies/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'BA Chinese Studies',
    description: 'Study Chinese language, literature, history, and culture.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00058/ba-chinese-studies/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'BA Japanese Studies',
    description: 'Study Japanese language, literature, history, and culture.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/06751/ba-japanese-studies/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'BA French and Chinese',
    description: 'Study both French and Chinese languages and cultures.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00063/ba-french-and-chinese/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'BA Middle Eastern Studies',
    description: 'Study the languages, cultures, and politics of the Middle East.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/07729/ba-middle-eastern-studies/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'BA Philosophy and Criminology',
    description: 'Combine the study of philosophy with criminology.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts in Social Sciences',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/08851/bass-philosophy-and-criminology/',
    requirements: [] // No specific subject requirements
  },

  // ============================================
  // BUSINESS & MANAGEMENT ADDITIONAL PROGRAMS
  // ============================================
  {
    name: 'BSc Fashion Management',
    description:
      'Study the business side of fashion, including marketing, buying, and brand management.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 35,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/09662/bsc-fashion-management/',
    requirements: [] // No specific subject requirements
  },
  {
    name: 'BSc International Business, Finance and Economics',
    description: 'Study international business with a focus on finance and economics.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/09224/bsc-international-business-finance-and-economics/',
    requirements: [] // 6,6,6 HL, no specific subject requirements
  },
  {
    name: 'BSc International Management',
    description: 'Study management with an international focus, including a year abroad.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/18515/bsc-international-management/',
    requirements: [] // 6,6,6 HL, no specific subject requirements
  },
  {
    name: 'BSc Management (Marketing)',
    description: 'Study management with a specialisation in marketing.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/03528/bsc-management-marketing/',
    requirements: [] // 6,6,6 HL, no specific subject requirements
  },
  {
    name: 'BAEcon Data Science and Economics',
    description: 'Combine data science skills with economic analysis.',
    field: 'Business & Economics',
    degree: 'Bachelor of Arts in Economics',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.manchester.ac.uk/study/undergraduate/courses/2026/21873/baecon-data-science-and-economics/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }]
  }
]

async function seedManchesterPrograms() {
  console.log('\n🎓 Seeding University of Manchester Programs\n')

  try {
    // 1. Find University of Manchester
    const manchester = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'University of Manchester', mode: 'insensitive' } },
          { name: { equals: 'The University of Manchester', mode: 'insensitive' } }
        ]
      }
    })

    if (!manchester) {
      console.error('❌ University of Manchester not found in database.')
      console.error('   Please create the university first.')
      process.exit(1)
    }

    console.log(`✅ Found University of Manchester (ID: ${manchester.id})\n`)

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
          universityId: manchester.id
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
              universityId: manchester.id,
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
    console.error('\n❌ Error seeding Manchester programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedManchesterPrograms()
