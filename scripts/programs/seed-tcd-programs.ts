/**
 * Seed Trinity College Dublin Programs to Database
 *
 * Adds undergraduate programs for Trinity College Dublin with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source: https://www.tcd.ie/courses/undergraduate/courses/
 * All descriptions extracted directly from TCD website.
 *
 * Prerequisites: Trinity College Dublin must exist in the database.
 *
 * Run with: npx tsx scripts/programs/seed-tcd-programs.ts
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
  // COMPUTER SCIENCE PROGRAMS
  // ============================================
  {
    name: 'Computer Science',
    description:
      'Computer Science is concerned with the study of everything to do with computers and our relationship with them. Computer scientists are critical to the efficient running of modern societies, dealing with health, security, banking and finance, transportation, and now increasingly our interaction through social networks. Computing professionals deal with theoretical issues, solve complex problems, deal with matters of ethics and with society at large. Applications of computer science range from artificial intelligence to health informatics, from smart cities to information security, and from educational and training systems to analysis of content on social network sites. This course is accredited by Engineers Ireland.',
    field: 'Computer Science',
    degree: 'Bachelor of Arts',
    duration: '5 years',
    minIBPoints: 37,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/computer-science/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Computer Science (Joint Honours)',
    description:
      'Computer Science is concerned with the study of everything to do with computers and our relationship with them. Computer scientists are critical to the efficient running of modern societies, dealing with health, security, banking and finance, transportation, and now increasingly our interaction through social networks. The study of these issues leads to efficient and robust algorithms for problems in many areas. This Joint Honours programme allows you to combine Computer Science with another subject such as Business, Economics, Geography, or Linguistics.',
    field: 'Computer Science',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/computer-science-jh/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Computer Science, Linguistics and a Language',
    description:
      'This unique course combines Computer Science with Linguistics and a modern European language: French, German, Irish, Italian, Polish, Russian, or Spanish. The emphasis on critical thinking and linguistics will give you the skills for a career at the forefront of language technology. The course comprises Computer Science, Linguistics and a language as well as modules from a range of humanities subjects.',
    field: 'Computer Science',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/computer-science-linguistics-and-a-language/',
    requirements: []
  },

  // ============================================
  // ENGINEERING PROGRAMS
  // ============================================
  {
    name: 'Engineering',
    description:
      'Engineering is about being creative in technical problem solving. Engineers make things possible by using mathematical and scientific principles together with analytical and design skills. They tackle existing problems by developing new solutions through innovative technologies. They also expand the frontiers of society by developing advanced materials, sustainable energy systems, construction technologies, transport systems, biomedical devices, and telecommunications infrastructure. The Engineering programme is fully accredited by Engineers Ireland up to Masters level (M.A.I) and offers excellent career prospects in Ireland and abroad.',
    field: 'Engineering',
    degree: 'Bachelor of Arts in Engineering / Master in Engineering',
    duration: '5 years',
    minIBPoints: 37,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/engineering/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Engineering with Management',
    description:
      'Engineering with Management allows you to combine a strong engineering foundation with business and management skills. The programme adds management and business modules to the engineering core, preparing graduates for careers that bridge technical and business roles in engineering firms, technology companies, and consulting.',
    field: 'Engineering',
    degree: 'Bachelor of Arts in Engineering',
    duration: '5 years',
    minIBPoints: 37,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/engineering-with-management/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Computer Engineering',
    description:
      'A computer engineer has mastered the necessary knowledge of mathematics and systems to tackle a whole range of real-world problems. Computer engineers may design computer hardware, write computer programs, integrate the various sub-systems together – or do all three. The impact of computer engineering has been more significant and more pervasive than that of many other disciplines. The smartphone, tablet computers, the Internet and games consoles are all products that were not even imagined 30 years ago, but have now been realised by the ingenuity of computer engineers.',
    field: 'Engineering',
    degree: 'Bachelor of Arts in Engineering / Master in Engineering',
    duration: '5 years',
    minIBPoints: 37,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/computer-engineering/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Electronic Engineering',
    description:
      'Electronic Engineering focuses on the design and development of electronic circuits, devices, and systems. Students learn about signal processing, telecommunications, embedded systems, and semiconductor technology. Electronic engineers develop technologies used in telecommunications, consumer electronics, computing and intelligent systems.',
    field: 'Engineering',
    degree: 'Bachelor of Arts in Engineering / Master in Engineering',
    duration: '5 years',
    minIBPoints: 37,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/electronic-engineering/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Electronic and Computer Engineering',
    description:
      'This joint programme combines electronic engineering with computer engineering, providing a comprehensive understanding of both hardware and software systems. Electronic engineers develop technologies used in telecommunications, consumer electronics, computing and intelligent systems. Computer engineers design computer hardware, write programs and integrate systems. This programme provides expertise in both areas.',
    field: 'Engineering',
    degree: 'Bachelor of Arts in Engineering / Master in Engineering',
    duration: '5 years',
    minIBPoints: 37,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/electronic-and-computer-engineering-joint-programme/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Biomedical Engineering',
    description:
      'Biomedical engineering is at the intersection of engineering, the life sciences and healthcare. Biomedical engineers take principles from applied science and apply them to biology and medicine. The goal is to better understand, replace or fix a target system to ultimately improve the quality of healthcare. Applications include the development of biocompatible prostheses, diagnostic and therapeutic medical devices, advanced imaging methods such as MRIs and EEGs, as well as development of regenerative materials, engineered tissues and artificial organs.',
    field: 'Engineering',
    degree: 'Bachelor of Arts in Engineering / Master in Engineering',
    duration: '5 years',
    minIBPoints: 37,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/biomedical-engineering/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Environmental Science and Engineering',
    description:
      'This programme combines environmental science with engineering principles to address environmental challenges. Students learn about sustainability, climate science, renewable energy, and environmental engineering solutions. The programme covers topics from environmental chemistry to ecological systems.',
    field: 'Environmental Studies',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/environmental-science-and-engineering/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }]
  },

  // ============================================
  // MATHEMATICS & NATURAL SCIENCES
  // ============================================
  {
    name: 'Mathematics',
    description:
      "Mathematics is a broad and diverse subject which is used to model, analyse and understand several applications in the physical and biological sciences, engineering, management science, economics and finance. Its numerous applications are naturally interwoven with the underlying theory which is essential in developing one's logical reasoning, quantitative skills and problem-solving techniques. Trinity is justly proud of its long tradition of excellence in mathematics.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 36,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/mathematics/',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true }]
  },
  {
    name: 'Mathematics (Joint Honours)',
    description:
      'This Joint Honours programme allows students to combine Mathematics with another subject. The programme is designed to provide a broad mathematical training that will allow you to work in any environment that requires strong numerical and logical skills. Graduates have found employment in computing, financial services, statistics, teaching, accountancy, and actuarial work.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/mathematics-jh/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Theoretical Physics',
    description:
      'Theoretical Physics explores the natural world at its most fundamental level, using mathematical theories guided by experimental investigation. For some it is the foundation for an academic career in mathematics or physics. For others it provides the basis for many career options in industry, medicine, law, finance and computing. Trinity provides a course which ranges widely across physics and mathematics. Its graduates are in demand for their technical skills and versatility.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/theoretical-physics/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Physical Sciences',
    description:
      'Physical Sciences provides a broad foundation in physics and related sciences. Students develop strong analytical and problem-solving skills through the study of classical and modern physics, with practical laboratory experience.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/physical-sciences/',
    requirements: []
  },
  {
    name: 'Physics (Physical Sciences)',
    description:
      'Physics explores the fundamental principles governing the universe, from subatomic particles to cosmological structures. Students develop strong mathematical and analytical skills while studying mechanics, electromagnetism, quantum physics, and thermodynamics.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/physics-physical-sciences/',
    requirements: []
  },
  {
    name: 'Physics and Astrophysics (Physical Sciences)',
    description:
      'This programme combines core physics with astrophysics to study the universe, from stellar evolution to cosmology. Students learn about observational techniques, theoretical astrophysics, and space science.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/physics-and-astrophysics-physical-sciences/',
    requirements: []
  },
  {
    name: 'Science',
    description:
      'Science is about knowledge: the generation of knowledge through research and its acquisition through learning. Scientific investigation allows us to understand the world around us: how the physical world has evolved and changed since the Big Bang and how life has advanced into complex, diverse forms. The application of scientific knowledge has led to world changing developments such as modern medicine, the mobile phone and efficient methods of energy production. Trinity Science is offered through four different entry routes leading to an Honours degree following four years of study.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/science/',
    requirements: []
  },
  {
    name: 'Chemical Sciences',
    description:
      'Chemical Sciences provides comprehensive training in chemistry and related disciplines. Students study organic, inorganic, physical, and analytical chemistry with extensive laboratory experience.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/chemical-sciences/',
    requirements: [{ courses: ['CHEM'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Chemistry (Chemical Sciences)',
    description:
      'Chemistry at Trinity provides rigorous training in all branches of chemistry. Students develop strong practical skills through extensive laboratory work alongside theoretical understanding.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/chemistry-chemical-sciences/',
    requirements: [{ courses: ['CHEM'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Chemistry with Biosciences (Chemical Sciences)',
    description:
      'This programme combines chemistry with biological sciences, preparing students for careers at the interface of chemistry and biology. Students study biochemistry, molecular biology, and organic chemistry.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/chemistry-with-biosciences-chemical-sciences/',
    requirements: [{ courses: ['CHEM'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Chemistry with Molecular Modelling (Chemical Sciences)',
    description:
      'This programme combines chemistry with computational methods for molecular modelling. Students learn to use computer simulations to understand chemical systems and drug design.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/chemistry-with-molecular-modelling-chemical-sciences/',
    requirements: [{ courses: ['CHEM'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Medicinal Chemistry (Chemical Sciences)',
    description:
      'Medicinal Chemistry focuses on the design, synthesis, and development of pharmaceutical compounds. Students study organic chemistry, pharmacology, and drug development processes.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/medicinal-chemistry-chemical-sciences/',
    requirements: [{ courses: ['CHEM'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Nanoscience (Chemical Sciences)',
    description:
      'Nanoscience explores materials and phenomena at the nanometer scale. Students study nanotechnology, materials science, and their applications in electronics, medicine, and energy.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/nanoscience-chemical-sciences/',
    requirements: []
  },

  // ============================================
  // BIOLOGICAL & BIOMEDICAL SCIENCES
  // ============================================
  {
    name: 'Biochemistry (Biological and Biomedical Sciences)',
    description:
      'Biochemistry studies the chemical processes within and relating to living organisms. Students learn about molecular biology, genetics, metabolism, and protein structure.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/biochemistry-biological-and-biomedical-sciences/',
    requirements: [{ courses: ['CHEM', 'BIO'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Botany (Biological and Biomedical Sciences)',
    description:
      'Botany focuses on the study of plants, their biology, ecology, and applications. Students learn about plant physiology, taxonomy, and environmental science.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/botany-biological-and-biomedical-sciences/',
    requirements: []
  },
  {
    name: 'Environmental Sciences (Biological and Biomedical Sciences)',
    description:
      'Environmental Sciences examines the natural environment and human impacts on ecosystems. Students study ecology, environmental chemistry, climate science, and conservation biology.',
    field: 'Environmental Studies',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/environmental-sciences-biological-and-biomedical-sciences/',
    requirements: []
  },
  {
    name: 'Genetics (Biological and Biomedical Sciences)',
    description:
      'Genetics studies heredity and the variation of inherited characteristics. Students learn about molecular genetics, genomics, and genetic engineering.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/genetics-biological-and-biomedical-sciences/',
    requirements: [{ courses: ['CHEM', 'BIO'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Human Genetics (Biological and Biomedical Sciences)',
    description:
      'Human Genetics focuses on genetic variation and disease in humans. Students study medical genetics, genetic counselling, and ethical issues in genomics.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/human-genetics-biological-and-biomedical-sciences/',
    requirements: [{ courses: ['CHEM', 'BIO'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Microbiology (Biological and Biomedical Sciences)',
    description:
      'Microbiology studies microorganisms including bacteria, viruses, and fungi. Students learn about infectious diseases, immunology, and biotechnology applications.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/microbiology-biological-and-biomedical-sciences/',
    requirements: [{ courses: ['CHEM', 'BIO'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Molecular Medicine (Biological and Biomedical Sciences)',
    description:
      'Molecular Medicine applies molecular biology to understand and treat human diseases. Students study disease mechanisms, drug development, and clinical research.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/molecular-medicine-biological-and-biomedical-sciences/',
    requirements: [{ courses: ['CHEM', 'BIO'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Physiology (Biological and Biomedical Sciences)',
    description:
      'Physiology studies how living systems function, from molecular processes to whole organisms. Students learn about human body systems, experimental techniques, and clinical applications.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/physiology-biological-and-biomedical-sciences/',
    requirements: [{ courses: ['CHEM', 'BIO'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Zoology (Biological and Biomedical Sciences)',
    description:
      'Zoology studies animals, their behaviour, ecology, and evolution. Students learn about animal physiology, conservation, and biodiversity.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/zoology-biological-and-biomedical-sciences/',
    requirements: []
  },

  // ============================================
  // MEDICINE & HEALTH SCIENCES
  // ============================================
  {
    name: 'Medicine',
    description:
      'Medicine is a unique course in that students study a broad range of subjects with the primary goal of understanding the science and practice of healing. Founded in 1711, the School of Medicine at Trinity has played a central role in the golden age of Irish medicine. Medical students at Trinity follow a five-year programme. Following graduation, students are required to spend one year as an intern in an approved post before becoming a fully registered medical practitioner.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Medicine, Bachelor of Surgery, Bachelor of Obstetrics',
    duration: '5 years',
    minIBPoints: 38,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/medicine/',
    requirements: [
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'Pharmacy',
    description:
      'Pharmacy is the study of all aspects of drugs, both natural and synthetic in origin, including their chemistry, their uses in medicines, and how they work within the body. Trinity is ranked in the top 40 universities in the world for Pharmacy and Pharmacology. The five-year integrated Pharmacy programme comprises a variety of approaches to teaching pharmacy including lectures, seminars, laboratory work, and clinical placements.',
    field: 'Medicine & Health',
    degree: 'Master of Pharmacy',
    duration: '5 years',
    minIBPoints: 36,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/pharmacy/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS', 'BIO', 'MATH-AA', 'MATH-AI'], level: 'HL', grade: 5 },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Pharmacy - Graduate Entry',
    description:
      'This graduate entry route to Pharmacy is available for students who already hold a degree. The programme provides comprehensive training in pharmaceutical sciences and clinical pharmacy practice.',
    field: 'Medicine & Health',
    degree: 'Master of Pharmacy',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/pharmacy---graduate-entry-to-pharmacy/',
    requirements: []
  },
  {
    name: 'Dental Science',
    description:
      'Dental Science is the study of the oral cavity and the diseases associated with oral tissues. This five-year programme is designed to ensure that graduates can safely and effectively deliver the full range of primary dental care, including prevention, diagnosis and treatment of oral and dental diseases. Class sizes are small, to ensure that students receive considerable staff input into their progress throughout the programme. Much of the teaching is delivered through problem-based learning and there is lots of hands-on clinical experience treating patients.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Dental Science',
    duration: '5 years',
    minIBPoints: 38,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/dental-science/',
    requirements: [
      { courses: ['CHEM', 'PHYS', 'BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM', 'PHYS', 'BIO'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'Dental Hygiene',
    description:
      'Dental Hygiene prepares students for careers as dental hygienists. Students learn about oral health promotion, periodontal treatment, and patient care.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 32,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/dental-hygiene/',
    requirements: []
  },
  {
    name: 'Dental Nursing',
    description:
      'Dental Nursing prepares students for careers supporting dental practitioners. Students learn about chair-side assistance, infection control, and patient communication.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 30,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/dental-nursing/',
    requirements: []
  },
  {
    name: 'Dental Technology',
    description:
      'Dental Technology prepares students to design and manufacture dental prostheses and appliances. Students learn about dental materials, digital dentistry, and laboratory techniques.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/dental-technology/',
    requirements: []
  },
  {
    name: 'Human Health and Disease',
    description:
      'The Human Health and Disease degree trains students for work in the field of biomedical research. It brings to life the fascinating connections between structure and function in the human body and explores the health and disease continuum in detail, including teaching on how medical therapies act to treat or even prevent disease. A central feature of the learning experience is the development of a core set of real-life, transferable skills in laboratory technique, group project work, data analysis, public presentation, report writing, research methodology and critical thinking.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/human-health-and-disease/',
    requirements: []
  },
  {
    name: 'Nursing - General',
    description:
      'The role of the nurse is to provide evidence-based, culturally sensitive care in order to assist the individual to lead an independent, healthy lifestyle, overcome ill health or experience a peaceful death. The nurse achieves this through working as part of a professional multidisciplinary team to provide primary healthcare, acute hospital care, community and home and continuing care, based on individual and population health needs across the lifespan. The School of Nursing and Midwifery at Trinity is ranked 20th worldwide in the 2025 QS World University Rankings.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science in Nursing',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/nursing---general-nursing/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['BIO', 'PHYS', 'CHEM'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Midwifery',
    description:
      "The term 'midwife' means 'with woman'. As a midwife, you will be helping women and their families at one of the most crucial times of their lives, supporting the woman during pregnancy, childbirth and the post-natal period. Midwives play a vital role in promoting and maintaining health, facilitating normal childbirth and helping women make informed choices about their care. The midwife is the key professional providing continuity of care and promoting choice and control to women in pregnancy and birth.",
    field: 'Medicine & Health',
    degree: 'Bachelor of Science in Midwifery',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/midwifery/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['BIO', 'PHYS', 'CHEM'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Physiotherapy',
    description:
      'Physiotherapy (also known as physical therapy) places full and functional movement at the heart of what it means to be healthy. It involves treating patients of all ages with a range of illnesses and conditions, including those with back and neck problems, sports injuries, arthritis, or those recovering from strokes and operations. The focus of treatment is exercise prescription. Physiotherapists may be part of a multidisciplinary medical team or work from clinics or specialise in particular areas of the discipline.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science in Physiotherapy',
    duration: '4 years',
    minIBPoints: 35,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/physiotherapy/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      {
        courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI'],
        level: 'HL',
        grade: 5,
        critical: true
      },
      { courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'Radiation Therapy',
    description:
      'Radiation therapy uses targeted high energy X-rays to treat patients with cancer and is one of the main treatments for cancer. This course qualifies you to work as a radiation therapist – the healthcare professional who, together with the other multidisciplinary team members, is responsible for the preparation and delivery of a course of radiation therapy. This degree provides you with the required scientific understanding and the critical clinical and research skills to adapt to the ever-changing medical environment.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science in Radiation Therapy',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/radiation-therapy/',
    requirements: [{ courses: ['PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 5, critical: true }]
  },

  // ============================================
  // LAW & BUSINESS
  // ============================================
  {
    name: 'Law',
    description:
      "Law governs every aspect of our lives, from food labelling and football transfers to elections and crime. Trinity's School of Law is Ireland's oldest and most internationally renowned law school. The programme prepares students not only for life as lawyers but also enables them to enter many career fields such as business, journalism, accountancy, banking, insurance, politics, foreign affairs and public policy.",
    field: 'Law',
    degree: 'Bachelor of Laws',
    duration: '4 years',
    minIBPoints: 38,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/law/',
    requirements: []
  },
  {
    name: 'Business, Economics and Social Studies',
    description:
      'BESS is a uniquely flexible degree programme offering you different degree options across the disciplines of Business, Economics, Political Science and Sociology. It provides students with a broad education and you specialise and graduate with a Single Honours or Joint Honours degree with another subject, or a Major with a Minor. From the second year onwards students are allowed to choose the specific degree they wish to take and choose individual modules within their chosen degree path.',
    field: 'Business & Economics',
    degree: 'Bachelor of Business Studies / Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/business-economics-and-social-studies/',
    requirements: []
  },
  {
    name: 'Business (Joint Honours)',
    description:
      'This Joint Honours programme allows students to combine Business with another subject. Students develop strong analytical and management skills while gaining expertise in their chosen second subject.',
    field: 'Business & Economics',
    degree: 'Bachelor of Business Studies',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/business-jh/',
    requirements: []
  },
  {
    name: 'Economics (Joint Honours)',
    description:
      'This Joint Honours programme allows students to combine Economics with another subject. Students develop strong analytical and quantitative skills for careers in finance, policy, consulting, and academia.',
    field: 'Business & Economics',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/economics-jh/',
    requirements: []
  },
  {
    name: 'Global Business',
    description:
      'The Global Business degree is a unique programme, designed for students who wish to focus on business from the very beginning of their degree. The degree is both innovative and practical with a strong focus on experiential learning. Trinity Business School places an emphasis on blended learning, where academic excellence meets industry experience with a keen focus on how business operates within the global economy. During the programme students will have the opportunity to develop foreign language proficiency, work as an intern, live and study in another country, and carry out a research project.',
    field: 'Business & Economics',
    degree: 'Bachelor in Business Studies',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/global-business-bachelor-in-business-studies/',
    requirements: []
  },
  {
    name: 'Management Science and Information Systems Studies',
    description:
      'Students learn how to use techniques from disciplines such as business, mathematics, computer science, statistics and management science to solve real-world problems. There is also a firm emphasis on interpersonal skills such as verbal communication, interviewing, teamwork and report writing. MSISS has one of the best graduate employment records of any undergraduate course in Ireland. Employers include Deloitte, Ernst and Young, Accenture, McKinsey, KPMG, PwC, Bank of America, Google, and many more.',
    field: 'Business & Economics',
    degree: 'Bachelor of Business Studies',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/management-science-and-information-systems-studies/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Philosophy, Political Science, Economics and Sociology',
    description:
      'Philosophy, Political Science, Economics and Sociology (PPES) offers a coherent and integrated introduction to the study of social sciences and philosophy. It brings together some of the most important approaches to understanding society. Central to the programme is the analysis of social and human phenomena through the lens of several complementary disciplines and analytical frameworks. Trinity is the only university in the Republic of Ireland that offers this broad combination of subjects in a single programme.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/philosophy-political-science-economics-and-sociology/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }]
  },

  // ============================================
  // SOCIAL SCIENCES
  // ============================================
  {
    name: 'Psychology',
    description:
      "Psychology is the study of human behaviour and mental processes. Trinity's School of Psychology is ranked in the top 100 universities for Psychology. The course develops knowledge and understanding of the concepts, principles, theories, and research methods of contemporary psychology. Students are trained in all aspects of psychology as a discipline. The Single Honours degree confers eligibility for graduate membership of the Psychological Society of Ireland.",
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/psychology/',
    requirements: []
  },
  {
    name: 'Social Studies',
    description:
      'Social Studies is a professional degree designed for students who wish to become social workers and who believe they have the personal attributes and motivation for social work. This degree combines an academic social science degree with professional social work training. Graduates are eligible to apply for registration with CORU (Irish Social Work Registration Board). This is one of only two undergraduate programmes in Ireland which qualifies students to a professional level in social work.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/social-studies/',
    requirements: []
  },
  {
    name: 'Sociology (Joint Honours)',
    description:
      'Sociology studies society, social institutions, and social relationships. This Joint Honours programme allows students to combine Sociology with another subject.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/sociology-jh/',
    requirements: []
  },
  {
    name: 'Political Science (Joint Honours)',
    description:
      'Political Science studies government, public policy, and political behaviour. This Joint Honours programme allows students to combine Political Science with another subject.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/political-science-jh/',
    requirements: []
  },
  {
    name: 'Geography (Joint Honours)',
    description:
      'Geography studies the Earth and its environments, populations, and resources. This Joint Honours programme allows students to combine Geography with another subject.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/geography-jh/',
    requirements: []
  },
  {
    name: 'Deaf Studies',
    description:
      'The Centre for Deaf Studies in Trinity affords students the opportunity to develop insights into, and genuine appreciation for the culture, contributions, and contemporary issues related to deaf people in Ireland and worldwide. Irish Sign Language (ISL) is the indigenous language of the deaf community in Ireland and is the working language at the Centre for Deaf Studies. During this four-year course students develop fluency in ISL. Students may choose to specialise as an ISL/English Interpreter or an ISL teacher, or to focus on Deaf Studies.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/deaf-studies/',
    requirements: []
  },

  // ============================================
  // ARTS & HUMANITIES
  // ============================================
  {
    name: 'History',
    description:
      'History is the study of how we and those before us interpret the past. Studying History means studying lives, events and ideas in times and places often very different from our own. History embraces everything from the rise and fall of empires, or the birth of new ideologies, to the contrasting everyday lives of people in a whole range of settings, across time and across the globe. The History Department at Trinity offers a remarkably broad range of discipline options for its size.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 35,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/history/',
    requirements: []
  },
  {
    name: 'English Studies',
    description:
      'The study of English is concerned with the history and practices of writing in English and encompasses literary works spanning English, Anglo-Irish, American and post-colonial cultures. Trinity is ranked 27th in the world for English Language and Literature (QS World University Rankings by Subject 2025). Our commitment to small-group teaching means that you will benefit from close, personal staff supervision. Many well-known creative writers are Trinity English graduates, including Eavan Boland, Sally Rooney, Anne Enright, and Derek Mahon.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 35,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/english-studies/',
    requirements: []
  },
  {
    name: 'European Studies',
    description:
      "European Studies is a broad-ranging and integrated programme that offers students the chance to learn European languages, and also to study history and social sciences. This programme encourages students to think about our continent in all its complexity, and to analyse Europe's cultures, history, and politics. You will study and gain fluency in two European languages and spend an exciting year abroad in one of our partner universities.",
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 35,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/european-studies/',
    requirements: []
  },
  {
    name: 'Classical Civilisation (Joint Honours)',
    description:
      'Classical Civilisation studies the literature, thought, and culture of Ancient Greece and Rome. Through examination of literary works and analysis of ancient history and art, students develop thorough knowledge of the classical world. All texts are studied in translation and no knowledge of Greek or Latin is required.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/classical-civilisation-jh/',
    requirements: []
  },
  {
    name: 'Classics, Ancient History and Archaeology',
    description:
      'Classics, Ancient History and Archaeology (CLAHA) is an integrated degree programme that allows you to study the history, literature, art, archaeology, culture and thought of the ancient world in conjunction with one or both of the ancient languages. Flexible pathways enable you to pursue your own interests. Both languages can be begun from scratch, and previous study is not necessary. The Department of Classics has a world-renowned reputation, with courses taught by academics at the top of their fields.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/classics-ancient-history-and-archaeology/',
    requirements: []
  },
  {
    name: 'Ancient and Medieval History and Culture',
    description:
      'This programme explores history and culture from antiquity through the medieval period. Students study political, social, and cultural developments across Europe and the Mediterranean.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/ancient-and-medieval-history-and-culture/',
    requirements: []
  },
  {
    name: 'Film',
    description:
      'Film at Trinity is built on strong academic and intellectual foundations, asking students to consider questions about how films affect us, how filmmakers respond to cultural changes, and what constitutes a digital story world. Over the course of your degree, you will encounter a wide range of film styles and movements from the beginning of film up to the present day. Trinity is ranked in the top 50 for Performing Arts (QS World University Rankings by Subject 2025).',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/film/',
    requirements: []
  },
  {
    name: 'Film Studies (Joint Honours)',
    description:
      'This Joint Honours programme allows students to combine Film Studies with another subject. Students study film history, theory, aesthetics, and criticism alongside their chosen second subject.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/film-studies-jh/',
    requirements: []
  },
  {
    name: 'Music',
    description:
      "Music is a discipline that stretches back to the ancient world. One of the seven original liberal arts, music maintains a place in the university as a subject of broad and passionate interest to composers, musicologists, performers, technologists, and theorists. Performing Arts at Trinity was ranked in the top 50 subjects worldwide in the QS Rankings 2025. Trinity's Music Department is Ireland's oldest and most internationally renowned venue for the study of music.",
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 35,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/music/',
    requirements: []
  },
  {
    name: 'Drama Studies (Joint Honours)',
    description:
      'Drama Studies combines theatrical theory with practical performance. Students study dramatic literature, theatre history, and stagecraft.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/drama-studies-jh/',
    requirements: []
  },
  {
    name: 'Acting',
    description:
      "This is a three-year, full-time, intensive honours degree for anyone who is serious about acting and wants to become an actor. The structure and contents of this degree have been designed in consultation with the Royal Academy of Dramatic Art (RADA) in London and consists of a practical skills-based course that enables students to learn by doing. The UK and Ireland's leading theatre practitioners form the core panel of teachers within The Lir Academy. Students will be taught in acting technique, voice, movement, and singing.",
    field: 'Arts & Humanities',
    degree: 'Bachelor in Acting',
    duration: '3 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/acting/',
    requirements: []
  },
  {
    name: 'Stage Management and Technical Theatre',
    description:
      'This programme provides professional training in technical theatre and stage management. Students learn lighting, sound, set design, and production management.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 32,
    programUrl:
      'https://www.tcd.ie/courses/undergraduate/courses/stage-management-and-technical-theatre/',
    requirements: []
  },
  {
    name: 'Religion',
    description:
      'Religion studies religious traditions, beliefs, and practices across cultures. Students examine the role of religion in society, politics, and culture.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/religion/',
    requirements: []
  },
  {
    name: 'Irish (Joint Honours)',
    description:
      'Irish studies the Irish language, literature, and culture from ancient to modern times. Students develop proficiency in written and spoken Irish.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/irish-jh/',
    requirements: []
  },
  {
    name: 'Early and Modern Irish',
    description:
      'This programme provides comprehensive study of Irish language and literature from medieval to contemporary periods. Students develop expertise in Old, Middle, and Modern Irish.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/early-and-modern-irish/',
    requirements: []
  },
  {
    name: 'Linguistics (Joint Honours)',
    description:
      'Linguistics is the scientific study of language. Students examine language structure, acquisition, and use across communities.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/linguistics-jh/',
    requirements: []
  }
]

async function seedTCDPrograms() {
  console.log('\n🎓 Seeding Trinity College Dublin Programs\n')

  try {
    // 1. Find Trinity College Dublin
    const tcd = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'Trinity College Dublin', mode: 'insensitive' } },
          {
            name: {
              equals: 'Trinity College Dublin, The University of Dublin',
              mode: 'insensitive'
            }
          },
          { name: { contains: 'Trinity College', mode: 'insensitive' } }
        ]
      }
    })

    if (!tcd) {
      console.error('❌ Trinity College Dublin not found in database.')
      console.error('   Please create the university first.')
      process.exit(1)
    }

    console.log(`✅ Found Trinity College Dublin (ID: ${tcd.id})\n`)

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
          universityId: tcd.id
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
              universityId: tcd.id,
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
    console.error('\n❌ Error seeding TCD programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedTCDPrograms()
