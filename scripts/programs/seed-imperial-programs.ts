/**
 * Seed Imperial College London Programs to Database
 *
 * Adds undergraduate programs for Imperial College London with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source: https://www.imperial.ac.uk/study/courses/undergraduate/
 * All descriptions extracted directly from Imperial website.
 *
 * Prerequisites: Imperial College London must exist in the database.
 *
 * Run with: npx tsx scripts/programs/seed-imperial-programs.ts
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
    name: 'Aeronautical Engineering',
    description:
      "Develop engineering, computational, and analytical skills, as well as the specific knowledge and experience required for careers in the aerospace industry. Before choosing to continue or transfer to another course, all students apply to this degree, MEng Aeronautical Engineering (H401). You'll gain a solid understanding of aerodynamics, lightweight structures, and structural mechanics, as well as flight mechanics.",
    field: 'Engineering',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 40,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/aeronautical-engineering/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 7, critical: true }
    ]
  },
  {
    name: 'Aeronautics with Spacecraft Engineering',
    description:
      "Acquire the engineering, computational and analytical skills required for a career in the aeronautical industry in this professionally accredited course. As part of the specialist spacecraft stream, you'll be equipped with an analytical skill set appropriate to the design of spacecraft technologies. You'll also gain an insight into the unique challenges involved in designing space systems for launch and operation, working in the start-of-the-art learning environment provided by the Department of Aeronautics.",
    field: 'Engineering',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/aeronautics-spacecraft-engineering/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 7, critical: true }
    ]
  },

  // ============================================
  // NATURAL SCIENCES PROGRAMS
  // ============================================
  {
    name: 'Biochemistry',
    description:
      "Develop skills towards a career in the applied biochemistry and biotechnology industries on this three-year course. With teaching delivered through lectures and case studies from business leaders and academics, this course will prepare you for advanced study or a career in the field. You'll build familiarity with key aspects of both industries, including commercialising technology, entrepreneurship, and intellectual property and patents.",
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biochemistry-bsc/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Biochemistry (MSci)',
    description:
      'Come and study at one of the largest Life Sciences departments in Europe. Develop a deep understanding of Biochemistry on this four-year course, where you will acquire the key scientific skills required for a range of research-informed graduate careers in the Life Sciences. You will study living systems at the molecular and cellular level and understand chemical processes within organisms. Through this work, you will gain a detailed knowledge of the molecular mechanisms of life and how an understanding of these underpins the development of solutions to key biological and biomedical problems.',
    field: 'Natural Sciences',
    degree: 'MSci',
    duration: '4 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biochemistry-msci/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Biochemistry with Language for Science',
    description:
      "Advance your understanding of biochemistry on this four-year course, which includes a year spent with an approved university in France, Germany or Spain. You'll build familiarity with key aspects of the industry, including commercialising technology, entrepreneurship, and intellectual property and patents. The language element of this course will see you explore the theory and practice of translation. This includes opportunities to analyse the history, politics, science and technology of your chosen country.",
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '4 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biochemistry-language/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 },
      { courses: ['FRA-B', 'SPA-B'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'Biological Sciences',
    description:
      "Develop your appreciation of biology on this three-year course, where you'll build the key scientific skills required for ongoing research or a career in the life sciences. You'll examine the behaviour of living systems from the level of cells up to whole organisms and ecosystems. Through this work, you'll gain a detailed knowledge of the relationships, evolution, and key features of various organisms as you explore the diversity of life on earth.",
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biological-sciences/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Biochemistry with Management',
    description:
      "Develop your appreciation of biochemistry on this three-year course, which includes a final year spent with the Imperial Business School. During your first two years, you'll explore the fundamentals of biological chemistry, molecular biology, integrative cell biology and genes and genomics. You'll also consider the commercial aspects of the biochemistry and biotechnology industries, including commercialising technology, entrepreneurship, and intellectual property and patents.",
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biochemistry-management/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Biomaterials and Tissue Engineering',
    description:
      "Build your understanding of materials science and specialise in biomaterials and tissue engineering on this professionally accredited Master's degree. Technological advances in materials science and engineering (MSE) are transforming our lives in a range of areas, from targeted drug delivery and disease detection, to tissue engineered scaffolds. During your studies, you'll analyse how materials innovations solve real problems in fields such as healthcare and medical devices.",
    field: 'Engineering',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/biomaterials-tissue-engineering-meng/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS', 'CHEM'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Biomedical Technology Ventures',
    description:
      "The Biomedical Technology Ventures BSc is set against the backdrop of an increasing demand for medical devices and the growth of the healthcare industry. In this programme, you will be guided in developing an entrepreneurial mindset and equipped with the skills to identify opportunities for improving human healthcare through the application of technology. You'll have balanced lectures, workshops, laboratory sessions and seminars to explore the fundamentals of mathematics, medical science, device prototyping and computer programming.",
    field: 'Engineering',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 39,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/biomedical-technology-ventures/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Biotechnology with Management',
    description:
      "Learn all facets of the biotechnology and applied biochemistry industries, including technology commercialisation, entrepreneurship, and intellectual property. This course gives you the opportunity to study the full Biotechnology curriculum before spending an additional year at the Imperial Business School. In your first two years, you'll study a common set of core modules, including biological chemistry, molecular biology, integrative cell biology, and genes and genomes.",
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biotechnology-management/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Biotechnology with Language for Science',
    description:
      'Embrace the opportunity to learn a foreign language while studying biotechnology. By studying a language in conjunction with biochemistry, you can combine your training in both fields as you learn how to present scientific and technical materials in French, German or Spanish. As a bridge between biology and technology, biotechnology explores the commercialisation of technology, entrepreneurship, intellectual property, and patents.',
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '4 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biotechnology-language/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 },
      { courses: ['FRA-B', 'SPA-B'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'Biotechnology',
    description:
      'Come and study at one of the largest Life Sciences departments in Europe. Biotechnology creates a vital link between biology and technology. Develop a deep understanding of Biotechnology and Biochemistry on this four-year course, where you will acquire the key scientific skills required for a range of research-informed graduate careers in Biotechnology and related areas. You will study living systems at the molecular and cellular level and understand chemical processes within organisms.',
    field: 'Natural Sciences',
    degree: 'MSci',
    duration: '4 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biotechnology-msci/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Biotechnology',
    description:
      "Biotechnology creates a vital link between biology and technology. All Biotechnology students follow the same core modules for the first two years. This gives you a solid grounding in the fundamental topics, and prepares you for advanced study. You'll cover all aspects of the applied biochemistry and biotechnology industries, including commercialising technology, entrepreneurship, and intellectual property.",
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biotechnology/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Biological Sciences with Language for Science',
    description:
      "Develop your appreciation of biology on this four-year course, which includes a year spent with an approved university in France, Germany or Spain. You'll examine the behaviour of living systems from the level of cells up to whole organisms and ecosystems. Through this work, you'll gain a detailed knowledge of the relationships, evolution, and key features of various organisms as you explore the diversity of life on earth.",
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/biological-sciences-language/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 },
      { courses: ['FRA-B', 'SPA-B'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'Biological Sciences',
    description:
      'Come and study at one of the largest Life Sciences departments in Europe. Develop a deep understanding of Biological Sciences on this four-year course, where you will acquire the key scientific skills required for a range of research-informed graduate careers in the Life Sciences. You will examine the behaviour of living systems from the level of molecules and cells up to whole organisms and ecosystems.',
    field: 'Natural Sciences',
    degree: 'MSci',
    duration: '4 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biological-sciences-msci/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Biological Sciences with Management',
    description:
      "Further your understanding of the biological sciences on this three-year course, which includes a final year spent with the Imperial Business School. During your first two years, you'll explore the behaviour of living systems from the level of cells up to whole organisms and ecosystems. Your studies will be complemented by a dedicated Life Science Skills programme where you'll receive training in quantitative skills, programming, statistics, and scientific writing and presentation.",
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/biological-sciences-management/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Computing (Visual Computing and Robotics)',
    description:
      'Computing is a creative and wide-ranging subject that focuses on using sound underlying principles and logical thinking to design and build systems that really work. This course has a strong technical emphasis, and allows you to focus on various technologies and algorithms for arts-related applications, such as computer games, visual effects and computer-generated art. In this course, you will learn how modern computer and communications systems function, and how they can be used and adapted to build the next generation of reliable and secure computing applications.',
    field: 'Computer Science',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 41,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/computing-visual-computing-robotics-meng/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['CS', 'PHYS', 'CHEM'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Computing (Software Engineering)',
    description:
      'Computing is a creative and wide-ranging subject that focuses on using sound underlying principles and logical thinking to design and build systems that really work. This course allows you to focus on the way software is engineered to form complex computing systems. Your specialism will give you a deep understanding of state-of-the-art methods for developing complex software systems that are easy to test, maintain and extend and that fulfil the needs of their users.',
    field: 'Computer Science',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 41,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/computing-software-engineering-meng/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['CS', 'PHYS', 'CHEM'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Computing (Security and Reliability)',
    description:
      'Computing is a creative and wide-ranging subject that focuses on using sound underlying principles and logical thinking to design and build systems that really work. In this course, you will learn how modern computer and communications systems function, and how they can be used and adapted to build the next generation of reliable and secure computing applications. You will acquire deep understanding of software security, reliability and privacy issues.',
    field: 'Computer Science',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 41,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/computing-security-reliability-meng/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['CS', 'PHYS', 'CHEM'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Computing (Management and Finance)',
    description:
      'Computing is a creative and wide-ranging subject that focuses on using sound underlying principles and logical thinking to design and build systems that really work. This course allows you to focus on the theory and tools of business management that require computerised solutions, including decision support and constraint solving techniques. In this course, you will learn how modern computer and communications systems function, and how they can be used and adapted to build the next generation of computing applications.',
    field: 'Computer Science',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 41,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/computing-computational-management/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['CS', 'PHYS', 'CHEM', 'ECON'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Computing (International Programme of Study)',
    description:
      'Computing is a creative and wide-ranging subject that focuses on using sound underlying principles and logical thinking to design and build systems that really work. This course gives you the opportunity to spend your fourth year studying abroad at a leading European university, or the first two terms of your third year at the University of California. In this course, you will learn how modern computer and communications systems function, and how they can be used and adapted to build the next generation of computing applications.',
    field: 'Computer Science',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 41,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/computing-international-programme-of-study/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['CS', 'PHYS', 'CHEM'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Computing (Artificial Intelligence and Machine Learning)',
    description:
      "Computing is a creative and wide-ranging subject that focuses on using sound underlying principles and logical thinking to design and build systems that really work. You'll specialise in artificial intelligence and knowledge engineering, as well as machine learning and the development of computational and engineering models of complex cognitive and social behaviours. In this course, you will learn how modern computer and communications systems function, and how they can be used and adapted to build the next generation of computing applications.",
    field: 'Computer Science',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 41,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/computing-artificial-intelligence-meng/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['CS', 'PHYS', 'CHEM'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Computing',
    description:
      'Computing is a creative and wide-ranging subject that focuses on using sound underlying principles and logical thinking to design and build systems that really work. This general programme offers you a wide range of module choices as you progress, allowing you to study your areas of interest. In this course, you will learn how modern computer and communications systems function, and how they can be used and adapted to build the next generation of computing applications.',
    field: 'Computer Science',
    degree: 'BEng',
    duration: '3 years',
    minIBPoints: 41,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/computing-beng/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['CS', 'PHYS', 'CHEM'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Computing',
    description:
      'Computing is a creative and wide-ranging subject that focuses on using sound underlying principles and logical thinking to design and build systems that really work. This general programme offers you a wide range of module choices as you progress, allowing you to study your areas of interest. In this course, you will learn how modern computer and communications systems function, and how they can be used and adapted to build the next generation of computing applications.',
    field: 'Computer Science',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 41,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/computing-meng/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['CS', 'PHYS', 'CHEM'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Civil Engineering',
    description:
      'Civil engineering is about shaping the built and natural environments in which we live. It is a broad discipline that improves many aspects of our everyday lives, from the provision of safe drinking water to the development of earthquake-resistant structures, while also protecting our natural environment. Civil engineers will play a crucial role in tackling climate change and leading sustainable development.',
    field: 'Engineering',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 40,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/civil-engineering/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Chemistry with Molecular Physics',
    description:
      "If you're studying chemistry, mathematics and physics and enjoy how they intersect, this course will teach you to apply the skills and content from all three disciplines. You'll gain a thorough understanding of the foundations that underpin organic, inorganic and physical chemistry through lectures, workshops and labs, and explore this through the lens of molecular physics.",
    field: 'Natural Sciences',
    degree: 'MSci',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/chemistry-molecular-physics/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6 },
      { courses: ['PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Chemistry with Medicinal Chemistry',
    description:
      "Build your appreciation of the chemical sciences and the drug development process in this four-year course. Designed to prepare you for a career in the pharmaceutical industry or biomedical research, this course will help you develop an interconnected understanding of core chemistry topics. You'll deepen your knowledge of key topics relating to inorganic, organic, physical, analytical, synthetic and computational chemistry.",
    field: 'Natural Sciences',
    degree: 'MSci',
    duration: '4 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/chemistry-medicinal/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6 },
      { courses: ['BIO', 'ECON', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Chemistry with Management',
    description:
      "Develop a thorough understanding of core chemistry and unleash your management potential on this four-year course. During your first two years, you'll enhance your understanding of fundamental topics related to inorganic, organic, physical, analytical, synthetic and computational chemistry. You'll complement this work by building extensive laboratory experience.",
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '4 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/chemistry-management/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6 },
      { courses: ['BIO', 'ECON', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Chemistry',
    description:
      "Develop your appreciation of core chemistry through to Master's level on this professionally accredited four-year course. You'll be taught by world leaders in the field as you explore fundamental chemistry topics during your first two years. You'll examine key aspects of inorganic, organic, physical, analytical, synthetic and computational chemistry, before specialising across a series of advanced topics as your degree develops.",
    field: 'Natural Sciences',
    degree: 'MSci',
    duration: '4 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/chemistry-msci/',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6 },
      { courses: ['BIO', 'ECON', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Materials Science and Engineering',
    description:
      "Further your understanding of materials science and engineering (MSE) on this four-year Master's degree. You'll assess how technological advances relating to materials are helping transform our lives, from the clothes we wear through to emerging, life-changing technologies. You'll investigate how the motivation to invent or improve materials can solve problems in areas including healthcare and transport.",
    field: 'Engineering',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/materials-science-engineering-meng/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS', 'CHEM'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Geophysics',
    description:
      "By studying the Earth's internal core, crust, oceans, atmosphere, and the solar system, we can gain a better understanding of how our planet works. This course explores how maths, physics and computer modelling can all be used to help further our knowledge of Earth processes. You'll combine traditional observational and field skills with numerical and analytical fundamental science to understand the Earth more quantitatively.",
    field: 'Natural Sciences',
    degree: 'MSci',
    duration: '4 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/geophysics-msci/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Geophysics',
    description:
      "By studying the Earth's internal core, crust, oceans, atmosphere, and the solar system, we can gain a better understanding of how our planet works. This course explores how maths, physics and computer modelling can all be used to help further our knowledge of Earth processes. You'll combine traditional observational and field skills with numerical and analytical fundamental science to understand the Earth more quantitatively.",
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/geophysics-bsc/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Geology',
    description:
      "By studying Earth's internal core, crust, oceans, atmosphere, and solar system, we can gain a better understanding of how our planet works. In this course, you'll combine traditional observational and field skills with numerical and analytical fundamental science to understand the Earth more quantitatively. You'll benefit from our internationally leading research programme, as well as lectures and case studies from business and academic leaders.",
    field: 'Natural Sciences',
    degree: 'MSci',
    duration: '4 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/geology-msci/',
    requirements: [
      {
        courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
        level: 'HL',
        grade: 6,
        critical: true
      }
    ]
  },
  {
    name: 'Electronic and Information Engineering',
    description:
      'Electronic and information engineering right now is characterised by its fast-evolving and interdisciplinary nature, driving innovation across unlimited applications, and making it such an exciting and rewarding place for creative and talented problem-solvers. This unique course combines electronics with computer science and information engineering, with specialist modules from the Department of Computing, and projects and coursework drawn from our latest research.',
    field: 'Engineering',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/electronic-information-meng/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Electronic and Information Engineering',
    description:
      'Electronic and information engineering right now is characterised by its fast-evolving and interdisciplinary nature, driving innovation across unlimited applications, and making it such an exciting and rewarding place for creative and talented problem-solvers. This unique course combines electronics with computer science and information engineering, with specialist modules from the Department of Computing, and projects and coursework drawn from our latest research.',
    field: 'Engineering',
    degree: 'BEng',
    duration: '3 years',
    minIBPoints: 40,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/electronic-information-beng/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Electrical and Electronic Engineering with Management',
    description:
      'Electrical and electronic engineers are at the forefront of the challenges to connect our world, to design more efficient and affordable technology, and to help us live healthy and sustainably. This degree will give you an insight into engineering the commercial world, with a programme of business modules combined with technical subjects. Taught modules are split 50:50 between technical and business modules in years three and four.',
    field: 'Engineering',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/electrical-electronic-engineering-management/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Electrical and Electronic Engineering',
    description:
      'Electrical and electronic engineers are at the forefront of the challenges to connect our world, to design more efficient and affordable technology, and to help us live healthily and sustainably. Electrical and electronic engineering right now is characterised by its fast-evolving and interdisciplinary nature, driving innovation across unlimited applications, and making it such an exciting and rewarding place for creative and talented problem-solvers.',
    field: 'Engineering',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/electrical-electronic-engineering-meng/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Electrical and Electronic Engineering',
    description:
      'Electrical and electronic engineers are at the forefront of the challenges to connect our world, to design more efficient and affordable technology, to help us live healthily and sustainably. Electrical and electronic engineering right now is characterised by its fast-evolving and interdisciplinary nature, driving innovation across unlimited applications, and making it such an exciting and rewarding place for creative and talented problem-solvers.',
    field: 'Engineering',
    degree: 'BEng',
    duration: '3 years',
    minIBPoints: 40,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/electrical-electronic-engineering-beng/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Economics, Finance and Data Science',
    description:
      'The BSc Economics, Finance and Data Science is a first-of-its-kind degree that offers you the rigorous study of economics and finance, combined with the learning of data science and its applications. Our distinctive curriculum has been designed by leading academics at the forefront of each discipline with input from industry and public policy leaders.',
    field: 'Business & Economics',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 39,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/economics-finance-data-science/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Ecology and Environmental Biology',
    description:
      'Understand the behaviour of living systems from the level of cells up to whole organisms and ecosystems. This specialist course focuses on the interaction between living organisms and species and their environment. You will learn to assess the impact plants, animals and microbes have on their ecosystem.',
    field: 'Environmental Studies',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/ecology-environmental-biology/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Earth and Planetary Science',
    description:
      'Find out how solid planetary bodies are explored using geological and geophysical principles. This degree focuses on planets, moons, asteroids, and comets, along with geological and geophysical processes in the Solar System. You will also learn about geosciences, physics, chemistry, mathematics, engineering, and computing as part of an interdisciplinary degree.',
    field: 'Natural Sciences',
    degree: 'MSci',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/earth-planetary-science-msci/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Earth and Planetary Science',
    description:
      'Find out how solid planetary bodies are explored using geological and geophysical principles. This degree focuses on planets, moons, asteroids, and comets, along with geological and geophysical processes in the Solar System. You will also learn about geosciences, physics, chemistry, mathematics, engineering, and computing as part of an interdisciplinary degree.',
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/earth-planetary-science-bsc/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Design Engineering',
    description:
      "Design engineering combines traditional engineering with modern design tools and mindsets. This professionally accredited four-year course prepares you to turn your creativity into real-world solutions. You'll gain essential skills, including computer-aided engineering, rapid prototyping, human-centred design, systems thinking, and sustainability, equipping you to bring innovative products to life.",
    field: 'Engineering',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 39,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/design-engineering/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Physics with Theoretical Physics',
    description:
      'Explore how the principles and laws of physics underpin most science and engineering disciplines on this three-year course. Problems in physics can relate to phenomena on gigantic scales such as the cosmos, minutely small ones, and virtually any other scale in between. This programme is particularly suited to those with a specific interest in mathematics and its application, with less emphasis on experimental work than our standard Physics courses.',
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 40,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/physics-theoretical-bsc/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Physics with Theoretical Physics',
    description:
      "Investigate how the principles and laws of physics underpin most science and engineering disciplines on this four-year course. You'll develop your appreciation of physics, mathematics, computational and experimental methods over the first three years of study. This course will enhance your problem-solving skills and is particularly suited to those with a specific interest in mathematics and its application in physics.",
    field: 'Natural Sciences',
    degree: 'MSci',
    duration: '4 years',
    minIBPoints: 40,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/physics-theoretical-msci/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Physics',
    description:
      "Enhance your understanding of both fundamental and applied physics on this accredited four-year course. You'll receive an excellent grounding in a range of physics, mathematics and experimental methods. This work will prepare you for advanced study or a career within this exciting field of science. This course offers you the flexibility to tailor learning towards your career interests as your studies progress.",
    field: 'Natural Sciences',
    degree: 'MSci',
    duration: '4 years',
    minIBPoints: 40,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/physics-msci/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 7 }
    ]
  },
  {
    name: 'Materials Science and Engineering',
    description:
      'Broaden your understanding of materials science and engineering (MSE) in this professionally accredited degree. Our daily routines are built around the manufactured items we use, from cars and computers to more advanced technologies such as satellite communications. This course examines how the invention and improvement of materials is helping solve real societal problems.',
    field: 'Engineering',
    degree: 'BEng',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/materials-science-engineering-beng/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS', 'CHEM'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Molecular Bioengineering',
    description:
      "As a molecular bioengineer, you'll learn how to engineer biological systems to solve challenges in health and wellbeing. Through this course, you will develop the scientific understanding and laboratory expertise of a life scientist with the technical knowledge and problem-solving skills of an engineer. With this unique combination of skills, you will be well placed to address the global challenges of today.",
    field: 'Engineering',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 39,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/molecular-bioengineering/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Microbiology',
    description:
      'Focus your study on all types of microorganisms and acquire theoretical and practical skills for a career in microbiology on this three-year course. Microbiology at Imperial aims to understand the behaviour of living systems from the level of cells up to whole organisms and ecosystems. This course focuses on all types of microorganisms, including bacteria, fungi and viruses.',
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/microbiology/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Medicine',
    description:
      'You will join one of the largest medicine departments in Europe, with medical campuses across north and west London and partnerships with a wide range of NHS Trusts, hospitals and clinics. Our newly redeveloped curriculum looks at technological developments in education and healthcare and expectations of medical practice within the NHS of the future. Successful students will graduate with both an MBBS and BSc qualification with this integrated course.',
    field: 'Medicine',
    degree: 'MBBS/BSc',
    duration: '6 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/medicine/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Medical Biosciences with Management',
    description:
      "Explore the science that underpins human health and develop your management skills on this interdisciplinary course. You'll advance your understanding of the practice of biomedical science, and its application in research, policy and industry. This course will develop your ability to think like a scientist through a research-intensive, laboratory-focused curriculum.",
    field: 'Medicine',
    degree: 'BSc',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/medical-biosciences-management/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Medical Biosciences',
    description:
      "You'll explore the principles of biomedical science, and how they are applied in research, policy and industry. This course is designed to build your potential towards becoming a science leader. You'll develop your ability to think like a scientist through a research-intensive, laboratory-focused curriculum. You'll also build key skills in science communication and ethics.",
    field: 'Medicine',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/medical-biosciences/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Mechanical Engineering with Nuclear Engineering',
    description:
      "Deepen your understanding of engineering science and specialise in nuclear engineering in this professionally accredited four-year Master's degree. This course will help you advance your technical, practical and professional skills to tackle tomorrow's engineering issues. As the course develops, you'll start to specialise across a series of nuclear engineering modules.",
    field: 'Engineering',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/mechanical-engineering-nuclear/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Mechanical Engineering',
    description:
      "Mechanical engineers play a key role in solving key global challenges, from developing sustainable energy sources to improving the lifespan of battery technology. This course will suit you if you want to develop your mathematical, physics and computational skills to tackle tomorrow's engineering issues. Through lectures, labs and tutorials, you'll build a solid understanding of the principles of solid mechanics, thermofluids and mechatronics.",
    field: 'Engineering',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 40,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/mechanical-engineering/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Mathematics with Statistics for Finance',
    description:
      "This course aims to present you with a wide range of mathematical ideas in a way that develops your critical and intellectual abilities. You'll develop a broad understanding of mathematical theory and application and deepen your knowledge in areas that appeal to you. As part of this specialisation, you will choose modules from a variety of relevant topics such as applied probability and mathematical finance.",
    field: 'Mathematics',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 39,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-statistics-finance/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Mathematics with Statistics',
    description:
      "This course aims to present you with a wide range of mathematical ideas in a way that develops your critical and intellectual abilities. You'll develop a broad understanding of mathematical theory and application and deepen your knowledge in areas that appeal to you. As part of the Statistics specialisation, you will examine a variety of relevant topics, such as applied probability, stochastic simulation, and games and risk-based decisions.",
    field: 'Mathematics',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 39,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-statistics/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Mathematics with Mathematical Computation',
    description:
      "This course aims to present you with a wide range of mathematical ideas in a way that develops your critical and intellectual abilities. You'll develop a broad understanding of mathematical theory and application, with opportunities to deepen your knowledge in areas that appeal to you. As part of the Mathematical Computation specialisation, you will focus on topics such as high-performance computing and scientific computation.",
    field: 'Mathematics',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 39,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-computation/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Mathematics with Applied Mathematics/Mathematical Physics',
    description:
      "This course aims to present you with a wide range of mathematical ideas in a way that develops your critical and intellectual abilities. You'll develop a broad understanding of mathematical theory and application and have opportunities to deepen your knowledge in areas that appeal to you. As part of the Applied Mathematics/Mathematical Physics specialisation, you will examine a variety of relevant concepts, including dynamics of games, mathematical biology and scientific computation.",
    field: 'Mathematics',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 39,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-applied-physics/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Mathematics and Computer Science',
    description:
      'If you are both mathematically inclined and interested in computer science, then a Mathematics and Computer Science degree is perfect for you. Taught jointly by the Departments of Computing and Mathematics, this course will enable you to develop a firm foundation in mathematics – particularly in pure mathematics, numerical analysis and statistics. You will also learn the essentials of computer science, with an emphasis on software development and broader theoretical topics.',
    field: 'Computer Science',
    degree: 'BEng',
    duration: '3 years',
    minIBPoints: 41,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-computer-science-beng/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Mathematics and Computer Science',
    description:
      'If you are both mathematically inclined and interested in computer science, then a Mathematics and Computer Science degree is perfect for you. Taught jointly by the Departments of Computing and Mathematics, this course will enable you to develop a firm foundation in mathematics – particularly in pure mathematics, numerical analysis and statistics. You will also cultivate valuable practical skills and gain real-world experience as you undertake a four-month industrial placement in your third year.',
    field: 'Computer Science',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 41,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-computer-science-meng/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }]
  }
]

async function seedImperialPrograms() {
  console.log('\n🎓 Seeding Imperial College London Programs\n')

  try {
    // 1. Find Imperial College London
    const imperial = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'Imperial College London', mode: 'insensitive' } },
          { name: { contains: 'Imperial College', mode: 'insensitive' } }
        ]
      }
    })

    if (!imperial) {
      console.error('❌ Imperial College London not found in database.')
      console.error('   Please create the university first.')
      process.exit(1)
    }

    console.log(`✅ Found Imperial College London (ID: ${imperial.id})\n`)

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
          universityId: imperial.id
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
              universityId: imperial.id,
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
    console.error('\n❌ Error seeding Imperial programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedImperialPrograms()
