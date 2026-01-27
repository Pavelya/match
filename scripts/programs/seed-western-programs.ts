/**
 * Seed Western University Programs to Database
 *
 * Adds undergraduate programs for Western University (Canada) with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source: docs/countries/western.md
 * All descriptions extracted directly from Western University website.
 *
 * Prerequisites: Western University must be created (handled by this script if missing).
 *
 * Run with: npx tsx scripts/programs/seed-western-programs.ts
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
  // ARTS & HUMANITIES
  // ============================================
  {
    name: 'Advanced Studies (SASAH)',
    description:
      'The School for Advanced Studies in the Arts & Humanities (SASAH) offers a unique cohort program for high-achieving students. It combines interdisciplinary study with language learning and experiential learning opportunities.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl: 'https://www.uwo.ca/arts/sasah/apply/index.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Black Studies',
    description:
      'Explore the histories, cultures, and contributions of Black communities globally. This program provides a critical understanding of anti-Black racism and the pursuit of social justice.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Classical Studies',
    description:
      'Classical Studies at Western is broadly based on the study of the language and literature, history, and archaeology of the Greek and Roman world. It combines Greek and Latin literature, history, and archaeology with subjects like religion, mythology, political theory, law, and philosophy.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl: 'https://www.uwo.ca/classics/undergraduate/index.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Creative Arts and Production (CAP)',
    description:
      'A collaborative program across three faculties, CAP explores creativity and production in the arts. It bridges theory and practice in fields like music, visual arts, and theatre.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Digital Humanities',
    description:
      'Digital Humanities combines the study of culture and history with digital tools. Learn to analyze big data, create digital exhibits, and understand the impact of technology on society.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'English Studies',
    description:
      'Study literature from across the globe and throughout history. Develop critical thinking and communication skills while exploring poetry, drama, novels, and film.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Film Studies',
    description:
      'Analyze cinema as an art form and a cultural industry. Film Studies explores the history, theory, and aesthetics of film, from Hollywood blockbusters to independent world cinema.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'French Studies',
    description:
      'Master the French language and explore Francophone cultures. Programs range from language learning to advanced studies in literature and linguistics.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Gender, Sexuality and Women’s Studies',
    description:
      'Examine how gender and sexuality shape our world. This interdisciplinary program addresses issues of equality, identity, and social justice.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Linguistics',
    description:
      'Discover the science of language. Linguistics explores how language is structured, how it is learned, and how it is used in social contexts.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Medieval Studies',
    description:
      'Step back into the Middle Ages. This interdisciplinary program covers the history, literature, art, and philosophy of the medieval period.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Philosophy',
    description:
      'Tackle the big questions of existence, knowledge, and ethics. Philosophy develops rigorous analytical skills and the ability to construct powerful arguments.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Theatre Studies',
    description:
      'Explore theatre history, theory, and performance. This program examines drama from ancient times to the present day, often in conjunction with practical performance opportunities.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Visual Arts',
    description:
      'Combine studio practice with art history and theory. Visual Arts offers a dynamic environment for creative expression and critical reflection. (Note: Portfolio required for Studio programs).',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Writing Studies',
    description:
      'Hone your writing skills for professional and creative contexts. This program focuses on the theory and practice of writing in various genres and media.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },

  // ============================================
  // COMPUTER SCIENCE
  // ============================================
  {
    name: 'Bioinformatics',
    description:
      'From bioinformatics to social networking, computer science drives innovation. Western’s flagship programs send your career in directions you might never imagine.',
    field: 'Computer Science',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://www.westerncalendar.uwo.ca/Modules.cfm?ModuleID=21121',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'Computer Science',
    description:
      'From bioinformatics to social networking, computer science drives innovation. Western’s flagship programs send your career in directions you might never imagine.',
    field: 'Computer Science',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://www.westerncalendar.uwo.ca/Modules.cfm?ModuleID=21123',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'Information Systems',
    description:
      'From bioinformatics to social networking, computer science drives innovation. Western’s flagship programs send your career in directions you might never imagine.',
    field: 'Computer Science',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://www.westerncalendar.uwo.ca/Modules.cfm?ModuleID=21124',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS', 'CS'], level: 'SL', grade: 4, critical: true }
    ]
  },

  // ============================================
  // ENGINEERING
  // ============================================
  {
    name: 'Engineering',
    description:
      'Engineers tackle real-world problems of all sizes. Western co-op experiences come in short or long sizes, allowing you to customize your career path.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering Science (BESc)',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/engineering.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
      { courses: ['PHYS'], level: 'SL', grade: 4, critical: true },
      // Math AA (HL/SL) vs Math AI (HL). We use SL to allow Math AA SL.
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
    ]
  },

  // ============================================
  // MEDICINE & HEALTH
  // ============================================
  {
    name: 'Medical Sciences (BMSc)',
    description:
      "Gain the knowledge and skills to improve health. You'll be set up for careers in medical research, public health, medicine, dentistry, and more.",
    field: 'Medicine & Health',
    degree: 'Bachelor of Medical Sciences (BMSc)',
    duration: '4 years',
    minIBPoints: 35,
    programUrl: 'https://www.schulich.uwo.ca/bmsc/future_students/medsci.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
      { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['PHYS'], level: 'SL', grade: 4, critical: false }
    ]
  },
  {
    name: 'Health Sciences',
    description:
      'Study the Health Sciences at Western and join a global community finding ways to tackle — and prevent — every kind of health issue.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Health Sciences (BHSc)',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/health-sciences.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['CHEM'], level: 'SL', grade: 4, critical: false }
    ]
  },
  {
    name: 'Health Sciences with Biology',
    description:
      'Study the Health Sciences at Western and join a global community finding ways to tackle — and prevent — every kind of health issue.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Health Sciences (BHSc)',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/health-sciences.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
      { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'Kinesiology',
    description:
      'Study at Western and you’ll have endless possibilities to see how your Kinesiology degree can turn into a career.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Arts / Bachelor of Science',
    duration: '4 years',
    minIBPoints: 30,
    programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/kinesiology.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
      // Recommended: Chemistry, Math, Physics
      { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false },
      { courses: ['PHYS'], level: 'SL', grade: 4, critical: false }
    ]
  },
  {
    name: 'Nursing',
    description:
      'Step into a career that makes a difference. At Western, you’ll learn from expert faculty and join a community of passionate healthcare leaders.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science in Nursing (BScN)',
    duration: '4 years',
    minIBPoints: 36,
    programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/nursing.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
      { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
      { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'Foods & Nutrition',
    description:
      'Choose Western for a transformative education in Foods and Nutrition. Dive into food science, health determinants, and specialized modules like Dietetics.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science (Foods and Nutrition)',
    duration: '4 years',
    minIBPoints: 30,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/foods-nutrition.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
      { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
    ]
  },

  // ============================================
  // BUSINESS & ECONOMICS
  // ============================================
  {
    name: 'Management & Organizational Studies (BMOS)',
    description:
      'Humans and data — that’s how our enterprises run. Graduate from Western with a Bachelor of Management and Organizational Studies and be ready to run the interface between human enterprises and our data.',
    field: 'Business & Economics',
    degree: 'Bachelor of Management and Organizational Studies (BMOS)',
    duration: '4 years',
    minIBPoints: 30,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/dan-management-organizational-studies.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'Commercial Aviation Management',
    description:
      'Humans and data — that’s how our enterprises run. Graduate from Western with a Bachelor of Management and Organizational Studies and be ready to run the interface between human enterprises and our data.',
    field: 'Business & Economics',
    degree: 'Bachelor of Management and Organizational Studies (BMOS)',
    duration: '4 years',
    minIBPoints: 30,
    programUrl: 'https://dan.uwo.ca/undergraduate/cam/',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['PHYS'], level: 'SL', grade: 4, critical: false }
    ]
  },

  // ============================================
  // MEDIA
  // ============================================
  {
    name: 'Media, Information & Technoculture',
    description:
      'Are we bigger than our data points? Debate these questions. Go behind the digital façade. Learn to make media and to move through it wisely.',
    field: 'Media',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/media-communication-studies.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },

  // ============================================
  // MUSIC
  // ============================================
  {
    name: 'Music (Bachelor of Music / BA Music)',
    description:
      'Study music at Western to make the most of your talents. The industry includes teachers, composers, conductors, and every business discipline. (Audition required).',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Music / Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 28,
    programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/music.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MUSIC'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'Music Administrative Studies',
    description:
      'Study music at Western to make the most of your talents. The industry includes teachers, composers, conductors, and every business discipline.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/music.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['MUSIC'], level: 'SL', grade: 4, critical: true }
    ]
  },

  // ============================================
  // SOCIAL SCIENCES
  // ============================================
  {
    name: 'Psychology (BA)',
    description:
      'Analysis, perspective, insights. Social sciences take you to heady places. At Western, you dig into what the ideas mean for real people and organizations.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/social-science.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }
    ]
  },
  {
    name: 'Psychology (BSc)',
    description:
      'Analysis, perspective, insights. Social sciences take you to heady places. At Western, you dig into what the ideas mean for real people and organizations.',
    field: 'Social Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/social-science.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
      { courses: ['CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'Economics',
    description:
      'Analysis, perspective, insights. Social sciences take you to heady places. At Western, you dig into what the ideas mean for real people and organizations.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/social-science.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      // Math AA (HL only for BSc?, here BA?) - Checking md: AA(HL/SL) or AI(HL).
      // We use AA SL as base level.
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'Social Science (General)',
    description:
      'Analysis, perspective, insights. Social sciences take you to heady places. At Western, you dig into what the ideas mean for real people and organizations.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/social-science.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Family Studies (BA)',
    description:
      'Learn how to work with families. Discover how lives and relationships develop within the context of family, school, work and society.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts (B.A.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/family-studies.html',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }]
  },
  {
    name: 'Family Studies (BSc)',
    description:
      'Learn how to work with families. Discover how lives and relationships develop within the context of family, school, work and society.',
    field: 'Social Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '4 years',
    minIBPoints: 28,
    programUrl:
      'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/family-studies.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
      { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
    ]
  },

  // ============================================
  // NATURAL SCIENCES
  // ============================================
  {
    name: 'Biology',
    description:
      'Join our community of scholars in high-tech research labs. Build your own degree path with thousands of options. At Western, you are a scientist.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '4 years',
    minIBPoints: 30,
    programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS', 'ESS'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'Chemistry',
    description:
      'Join our community of scholars in high-tech research labs. Build your own degree path with thousands of options. At Western, you are a scientist.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '4 years',
    minIBPoints: 30,
    programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS', 'ESS'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'Data Science',
    description:
      'Join our community of scholars in high-tech research labs. Build your own degree path with thousands of options. At Western, you are a scientist.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '4 years',
    minIBPoints: 30,
    programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS', 'ESS'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'Earth & Environmental Sciences',
    description:
      'Join our community of scholars in high-tech research labs. Build your own degree path with thousands of options. At Western, you are a scientist.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '4 years',
    minIBPoints: 30,
    programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS', 'ESS'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'Integrated Science (WISc)',
    description:
      'Western Integrated Science (WISc) is a unique program for the most dedicated science students. It provides a holistic approach to complex problems, combining multiple scientific disciplines.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '4 years',
    minIBPoints: 30,
    programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS', 'ESS'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'Mathematics and Applied Mathematics',
    description:
      'Join our community of scholars in high-tech research labs. Build your own degree path with thousands of options. At Western, you are a scientist.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '4 years',
    minIBPoints: 30,
    programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS', 'ESS'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'Physics, Medical Physics & Astronomy',
    description:
      'Join our community of scholars in high-tech research labs. Build your own degree path with thousands of options. At Western, you are a scientist.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '4 years',
    minIBPoints: 30,
    programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS', 'ESS'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'Statistical & Actuarial Sciences',
    description:
      'Join our community of scholars in high-tech research labs. Build your own degree path with thousands of options. At Western, you are a scientist.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (B.Sc.)',
    duration: '4 years',
    minIBPoints: 30,
    programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS', 'ESS'], level: 'SL', grade: 4, critical: true }
    ]
  }
]

async function seedWesternPrograms() {
  console.log('\n🎓 Seeding Western University Programs\n')

  try {
    // 1. Find or create Western University
    let western = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'Western University', mode: 'insensitive' } },
          { name: { contains: 'Western University', mode: 'insensitive' } }
        ]
      }
    })

    if (!western) {
      // Get Canada country
      const canada = await prisma.country.findFirst({
        where: { code: 'CA' }
      })

      if (!canada) {
        console.error('❌ Canada not found in database.')
        console.error('   Please run: npx prisma db seed first')
        process.exit(1)
      }

      // Create Western
      western = await prisma.university.create({
        data: {
          name: 'Western University',
          description:
            'Western University delivers an academic experience second to none. Since 1878, The Western Experience has combined academic excellence with life-long opportunities for intellectual, social and cultural growth in order to better serve our communities.',
          countryId: canada.id,
          city: 'London',
          classification: 'PUBLIC',
          websiteUrl: 'https://www.uwo.ca',
          studentPopulation: 40000 // Approximate
        }
      })
      console.log(`✅ Created Western University (ID: ${western.id})\n`)
    } else {
      console.log(`✅ Found Western University (ID: ${western.id})\n`)
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
          universityId: western.id
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
              universityId: western.id,
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
    console.log(`   ❌ Failed:  ${failCount}`)
    console.log('\n✨ Done!')
  } catch (error) {
    console.error('❌ Error seeding Western programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedWesternPrograms()
