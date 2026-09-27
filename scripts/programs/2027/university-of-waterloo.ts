import type { RefreshFile } from '../lib/refresh'

/**
 * University of Waterloo: requirements for 2027 entry.
 *
 * Exported from the database on 2026-09-27 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-waterloo
 */
const refresh: RefreshFile = {
  university: 'University of Waterloo',
  entryYear: 2027,
  checkedOn: '2026-09-27',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7v5i005f7mpm2z6gs1qe',
      status: 'current',
      name: 'Accounting and Financial Management',
      description:
        "Business shapes the world, and every choice carries weight. Accounting and Financial Management (AFM) is redefining business education, helping you understand what value is, how to create it and connect decisions to real-world outcomes. You'll build the broad perspective of a management degree and the financial expertise to deliver results that matter.",
      field: 'Business & Economics',
      degree: 'Bachelor of Accounting and Financial Management',
      duration: '5 years',
      minIBPoints: 35,
      programUrl:
        'https://uwaterloo.ca/future-students/programs/accounting-and-financial-management',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7t0j004l7mpmusybqfpy',
      status: 'current',
      name: 'Actuarial Science',
      description:
        "Actuarial Science applies mathematics, statistics, and financial theory to study uncertain future events, especially in insurance and finance. At Waterloo, you'll learn to assess risk and uncertainty while preparing for professional actuarial exams. Our program is one of the largest and most respected in the world.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Mathematics',
      duration: '5 years',
      minIBPoints: 37,
      programUrl: 'https://uwaterloo.ca/future-students/programs/actuarial-science',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7tbc004p7mpmn8g1j9fy',
      status: 'current',
      name: 'Applied Mathematics',
      description:
        'Apply mathematics to the real world with this hands-on program that combines mathematics with your interests.\n\nUse math to help solve some of humanity’s most complex problems. Whether you use your degree to fight climate change, help discover medical breakthroughs, or understand the secrets of the cosmos, Applied Math brings math to life.\n\nYou’ll learn from experienced, award-winning professors who will help you understand the explanatory and predictive power of math, and how to formulate and analyze mathematical models.\n\nYour practical knowledge in data science, analysis, and simulation will be transferable to a variety of careers including business, engineering, medicine, science, finance, and many more.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Mathematics',
      duration: '5 years',
      minIBPoints: 36,
      programUrl: 'https://uwaterloo.ca/future-students/programs/applied-mathematics',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7r1b003p7mpmldnqtjw3',
      status: 'current',
      name: 'Architectural Engineering',
      description:
        "Calling all creative problem solvers! As an Architectural Engineering student, you’ll learn how to forge impressive design, collaboration, and communication skills with strong analytical capabilities and technical applications needed for building design and operation.\n\nYou’ll learn how to discuss the aesthetic design of building projects with architects while ensuring all systems are functional, secure, and safe: lighting, heat, plumbing, structural systems, ventilation, and more.\n\nOnly a handful of schools across North America offer this in-demand engineering program that addresses the need for engineers skilled in the whole scope of a building's life cycle. You’ll explore the science of building design by combining the latest in engineering and architectural concepts.\n\nLearn how to assess, repair, and refurbish existing buildings to give them a smaller carbon footprint. There’s an emphasis on green building technology and sustainability for new builds too.",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '5 years',
      minIBPoints: 35,
      programUrl: 'https://uwaterloo.ca/future-students/programs/architectural-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7w4r005t7mpmziva41hl',
      status: 'current',
      name: 'Biochemistry',
      description:
        "In the past 200 years, advances in techniques and tools have allowed biochemists to focus on these fundamental questions: How do organisms use chemical compounds to thrive? How do organisms adjust to changes in their environment and how can our knowledge of the chemistry of life be applied to improving the human condition?\n\nTo answer these questions, we study the structures of molecules – such as enzymes – and the diverse metabolic processes – such as the Krebs cycle – that are fundamental to life.\n\nIn Biochemistry, you'll create chemicals, analyze genes, and explore the fundamentals of metabolism. You’ll start with a broad science foundation in first year, including chemistry, biology, physics, and calculus.\n\nGet ready to immerse yourself in the fun of hands-on lab experiences. You’ll graduate with strong lab training and the knowledge and skills to work in a wide range of areas, from forensics and pharmaceuticals to food and agriculture.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://uwaterloo.ca/future-students/programs/biochemistry',
      requirements: [
        { courses: ['BIO'], level: 'SL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7vrv005n7mpmr3jh18ag',
      status: 'current',
      name: 'Biology',
      description:
        "Explore all aspects of life and living creatures — from cells and genes to species and diversity.\n\nSome of the greatest scientific discoveries have occurred within the field of biology, including the mapping of the human genome, identifying the structure of DNA, and how photosynthesis works. All of these revelations happened because dedicated scientists looked at the world a little differently.\n\nAt Waterloo, you’ll dive into your Biology major right from day one. And with more than 80 biology courses available, you’ve got plenty of options. From microbes and genes to plants and zoology, we've got something for anyone who's passionate about living systems. Through co-op, you can graduate with nearly two years of paid work experience.\n\nBiology offers a broad education, a wide variety of hands-on and communication skills, and a strong base of lab safety. You’ll graduate ready for a career in laboratory or field research, environmental assessment, education, health professions, or industry.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://uwaterloo.ca/future-students/programs/biology',
      requirements: [{ courses: ['BIO', 'CHEM'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7oj900217mpm9ksntfng',
      status: 'current',
      name: 'Biomedical Engineering',
      description:
        "Combine your passions for engineering, health, and life science to create a healthier planet one cutting-edge medical device, system, or biomaterial at a time. Apply your scientific knowledge to developing medical technologies that doctors and patients depend on every day.\n\nToday surgeons use laser-guided surgical devices and implant artificial organs while other specialists fit the latest smart prosthetics – developed by biomedical engineers.\n\nAt Waterloo, you'll learn to transform biomedical research using computer and information science, develop assistive devices to optimize recovery and prevent injuries, and enhance imaging technology to better diagnose and monitor medical conditions.\n\nThere are plenty of hands-on labs to give you experience modelling, prototyping, and testing biomedical systems. Then get even more practical experience through two years of paid co-op, plus a fourth-year capstone design project.\n\nBecome part of the new generation of this exciting, evolving field!",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '5 years',
      minIBPoints: 36,
      programUrl: 'https://uwaterloo.ca/future-students/programs/biomedical-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7wh0005z7mpm646wyxa2',
      status: 'current',
      name: 'Biomedical Sciences',
      description:
        "Biomedical Sciences focuses on the biological basis of health and disease. You'll study human physiology, pharmacology, and pathology. This program prepares you for medical school, graduate studies, or careers in healthcare and pharmaceutical research.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://uwaterloo.ca/future-students/programs/biomedical-sciences',
      requirements: [
        { courses: ['BIO'], level: 'SL', grade: 5, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Computer Science / Bachelor of Business Administration".
    {
      id: 'cmk6q7sfg004d7mpm6sthyug4',
      status: 'current',
      name: 'Business Administration and Computer Science Double Degree',
      description:
        "Double down on your love of technology, computer science, and business. In this unique program, you’ll get two prestigious degrees and two sets of skills in high demand.\n\nYour Waterloo courses will cover fundamental mathematics, computer programming, data structures, algorithms, software engineering, operating systems, and social implications of computing. At nearby Wilfrid Laurier University (walking distance from our campus), you’ll study all the business basics: finance, accounting, marketing, organizational behaviour, business communication, law, human resource management, and business policy.\n\nPlus, you’ll get four to five terms of real-world work experience through the world's leading co-op program.\n\nIn just five years, you'll earn both a co-op Bachelor of Computer Science (BCS) from Waterloo and a Bachelor of Business Administration (BBA) from Laurier. You'll also have the opportunity to study abroad as a student through both Waterloo and Laurier.",
      field: 'Business & Economics',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 39,
      programUrl:
        'https://uwaterloo.ca/future-students/programs/business-administration-computer-science-double-degree',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Mathematics / Bachelor of Business Administration".
    {
      id: 'cmk6q7spy004h7mpmgxfxegya',
      status: 'current',
      name: 'Business Administration and Mathematics Double Degree',
      description:
        'Earn two degrees in five years: a Bachelor of Mathematics from Waterloo and a Bachelor of Business Administration from Wilfrid Laurier University. Combine quantitative skills with business knowledge for careers in finance, consulting, and analytics.',
      field: 'Business & Economics',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 38,
      programUrl:
        'https://uwaterloo.ca/future-students/programs/business-administration-mathematics-double-degree',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7o11001p7mpmbh668f51',
      status: 'current',
      name: 'Chemical Engineering',
      description:
        "Chemical engineers transform raw materials into valuable products, from pharmaceuticals to sustainable fuels. At Waterloo, you'll study reaction engineering, process design, thermodynamics, and materials science. You'll be prepared for careers in energy, pharmaceuticals, food processing, and environmental protection.",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '5 years',
      minIBPoints: 35,
      programUrl: 'https://uwaterloo.ca/future-students/programs/chemical-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7wuh00657mpmn8y7q3ds',
      status: 'current',
      name: 'Chemistry',
      description:
        "Chemistry investigates the composition, structure, and properties of matter. At Waterloo, you'll study organic, inorganic, physical, and analytical chemistry with applications in medicine, materials, and environmental science.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://uwaterloo.ca/future-students/programs/chemistry',
      requirements: [{ courses: ['CHEM'], level: 'SL', grade: 5, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7nj2001d7mpmncc47e0b',
      status: 'current',
      name: 'Civil Engineering',
      description:
        "Civil engineers design, build, and maintain the infrastructure that society depends on: buildings, bridges, roads, water systems, and more. At Waterloo, you'll learn structural analysis, environmental engineering, transportation systems, and project management. Through co-op, you'll gain hands-on experience on real construction and infrastructure projects.",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '5 years',
      minIBPoints: 35,
      programUrl: 'https://uwaterloo.ca/future-students/programs/civil-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q80hh007r7mpm5ckpod96',
      status: 'current',
      name: 'Climate and Environmental Change',
      description:
        "Climate and Environmental Change focuses on understanding and addressing climate change. You'll study climate science, environmental policy, and sustainable solutions. This program prepares you to work on one of the most pressing challenges of our time.",
      field: 'Environmental Studies',
      degree: 'Bachelor of Environmental Studies',
      duration: '4 years',
      minIBPoints: 30,
      programUrl: 'https://uwaterloo.ca/future-students/programs/climate-environmental-change',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7ui700557mpme941ezk6',
      status: 'current',
      name: 'Computational Mathematics',
      description:
        "Computational Mathematics focuses on developing and analyzing algorithms for mathematical problems. You'll study numerical methods, optimization, and scientific computing. Graduates work in technology, research, and quantitative fields.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Mathematics',
      duration: '5 years',
      minIBPoints: 36,
      programUrl: 'https://uwaterloo.ca/future-students/programs/computational-mathematics',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7lhh00017mpmtf29c84b',
      status: 'current',
      name: 'Computer Engineering',
      description:
        "Want to design a brain stimulator to combat symptoms of Parkinson's disease? Develop software to protect companies from cyber attacks? Create the next groundbreaking gaming platform? As an expert in computer hardware-software interactions you will be ready for a career working in cutting-edge technologies. Between labs and lectures, you'll gain experience with all aspects of computers, from chips and wiring to software, networks, and communications.",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '5 years',
      minIBPoints: 36,
      programUrl: 'https://uwaterloo.ca/future-students/programs/computer-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7rj000417mpmuq4viu00',
      status: 'current',
      name: 'Computer Science',
      description:
        "Earn a degree from one of the world's top computer science schools. Not only will you learn to develop a broad understanding of systems, networks, algorithms, and programming through 70+ courses, you can make your degree your own by adding specializations and minors to match your interests and skills. Combining theory and hands-on practice, you'll discover the mathematics that build the framework for emerging technologies from AI to machine learning.",
      field: 'Computer Science',
      degree: 'Bachelor of Computer Science',
      duration: '5 years',
      minIBPoints: 38,
      programUrl: 'https://uwaterloo.ca/future-students/programs/computer-science',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7s4l00497mpmjgkvkxbs',
      status: 'current',
      name: 'Computing and Financial Management',
      description:
        "Computing and Financial Management combines computer science with business and finance. You'll develop strong programming skills while learning accounting, economics, and financial analysis. This unique program prepares you for careers in fintech, investment banking, and technology consulting.",
      field: 'Business & Economics',
      degree: 'Bachelor of Computing and Financial Management',
      duration: '5 years',
      minIBPoints: 38,
      programUrl:
        'https://uwaterloo.ca/future-students/programs/computing-and-financial-management',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7rts00457mpm6fug6smp',
      status: 'current',
      name: 'Data Science',
      description:
        "Data Science combines statistics, computer science, and domain expertise to extract insights from data. You'll learn programming, machine learning, data visualization, and statistical modeling. This rapidly growing field offers excellent career opportunities across all industries.",
      field: 'Computer Science',
      degree: 'Bachelor of Computer Science',
      duration: '5 years',
      minIBPoints: 38,
      programUrl: 'https://uwaterloo.ca/future-students/programs/data-science',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7xuc006l7mpmpkxvl9qk',
      status: 'current',
      name: 'Earth Sciences',
      description:
        "Earth Sciences studies the physical composition and processes of our planet. You'll explore geology, mineralogy, paleontology, and environmental geology. Field work is a key component, with trips to diverse geological locations across Canada.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 31,
      programUrl: 'https://uwaterloo.ca/future-students/programs/earth-sciences',
      requirements: [{ courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7m0n000d7mpmalhvm6yh',
      status: 'current',
      name: 'Electrical Engineering',
      description:
        "Our modern world is built on electricity. Learn to harness its power to create the next generation of electronics, sensors, and information networks. You'll study the fundamentals of electromagnetism, circuits, algorithms, and instrumentation. You will be able to specialize in a range of technologies such as power generation and clean energy, electric vehicles, Internet of Things, quantum computing, integrated circuit design, and machine learning.",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '5 years',
      minIBPoints: 36,
      programUrl: 'https://uwaterloo.ca/future-students/programs/electrical-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7zqs007l7mpm359caf4w',
      status: 'current',
      name: 'Environment and Business',
      description:
        "Environment and Business combines environmental studies with business education. You'll learn sustainability, environmental policy, and business management. Graduates lead organizations in developing sustainable business practices and environmental strategies.",
      field: 'Environmental Studies',
      degree: 'Bachelor of Environmental Studies',
      duration: '4 years',
      minIBPoints: 31,
      programUrl: 'https://uwaterloo.ca/future-students/programs/environment-and-business',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7zzo007n7mpm24oh21sp',
      status: 'current',
      name: 'Environment, Resources and Sustainability',
      description:
        "Environment, Resources and Sustainability examines environmental challenges from social, economic, and scientific perspectives. You'll study sustainability, conservation, and resource management. This interdisciplinary program prepares you for careers in environmental policy and advocacy.",
      field: 'Environmental Studies',
      degree: 'Bachelor of Environmental Studies',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://uwaterloo.ca/future-students/programs/environment-resources-and-sustainability',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7p1k002d7mpmji205ozz',
      status: 'current',
      name: 'Environmental Engineering',
      description:
        "Environmental engineers develop solutions to protect and improve our environment. You'll study water treatment, air quality, waste management, and sustainable design. At Waterloo, you'll gain the skills to address pressing environmental challenges including climate change, pollution, and resource management.",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '5 years',
      minIBPoints: 35,
      programUrl: 'https://uwaterloo.ca/future-students/programs/environmental-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q808n007p7mpmvlv332mw',
      status: 'current',
      name: 'Environmental Sciences',
      description:
        "Environmental Sciences applies scientific principles to understand and address environmental challenges. You'll study ecology, climate science, pollution, and conservation. The program combines classroom learning with lab work and field research.",
      field: 'Environmental Studies',
      degree: 'Bachelor of Environmental Studies',
      duration: '4 years',
      minIBPoints: 31,
      programUrl: 'https://uwaterloo.ca/future-students/programs/environmental-sciences',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q80zo007v7mpm56wljyhl',
      status: 'current',
      name: 'Geography and Aviation',
      description:
        "Geography and Aviation is a unique program combining geography with professional flight training. You'll earn your commercial pilot license while studying aviation management, meteorology, and geography. Graduates are prepared for careers as commercial pilots and in aviation management.",
      field: 'Environmental Studies',
      degree: 'Bachelor of Environmental Studies',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://uwaterloo.ca/future-students/programs/geography-and-aviation',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q80ql007t7mpm98okit3h',
      status: 'current',
      name: 'Geography and Environmental Management',
      description:
        "Geography and Environmental Management explores the relationship between humans and the environment. You'll study urban planning, GIS, resource management, and environmental policy. The program combines physical and human geography perspectives.",
      field: 'Environmental Studies',
      degree: 'Bachelor of Environmental Studies',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://uwaterloo.ca/future-students/programs/geography-and-environmental-management',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7qjg003d7mpm2f7rza01',
      status: 'current',
      name: 'Geological Engineering',
      description:
        "Geological engineers apply geology to engineering challenges, from mining and resource extraction to environmental remediation and natural hazard assessment. You'll study rock mechanics, hydrogeology, and geotechnical engineering. Field work in diverse geological settings is a key part of the program.",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '5 years',
      minIBPoints: 34,
      programUrl: 'https://uwaterloo.ca/future-students/programs/geological-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q818q007x7mpm2laqoukt',
      status: 'current',
      name: 'Geospatial Data Science',
      description:
        "Geomatics (Geographic Information Science) focuses on collecting, managing, and analyzing spatial data. You'll study GIS, remote sensing, surveying, and spatial analysis. The program prepares you for careers in urban planning, environmental management, and technology.",
      field: 'Environmental Studies',
      degree: 'Bachelor of Environmental Studies',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://uwaterloo.ca/future-students/programs/geospatial-data-science',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://uwaterloo.ca/future-students/admissions/admission-requirements/geospatial-data-science/high-school/international-system/ib',
        'https://uwaterloo.ca/future-students/programs/geospatial-data-science',
        'https://uwaterloo.ca/environment/news/evolution-environments-geomatics-program'
      ],
      notes:
        'Content 3.4: renamed, same programme. Waterloo renamed Geomatics to Geospatial Data Science from September 2026 (Faculty of Environment news; admission pages say "Geospatial Data Science (formerly Geomatics)"); the old URL redirects. Bachelor of Environmental Studies in Geospatial Data Science, co-op or regular. IB requirements: English A (HL or SL) at 4 or English B HL at 5; Maths AA (HL or SL) or Maths AI HL at 4; total 27, excluding the core points (stored as published, as McGill\'s and Lausanne\'s out-of-42 figures are). Diploma with at least three HL. The IB page names no entry year, so checked for 2026 (rule 2). The stored 30 had no source.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q81hp007z7mpm8fvyne8b',
      status: 'current',
      name: 'Global Business and Digital Arts',
      description:
        "Global Business and Digital Arts combines business education with digital media creation. You'll study marketing, entrepreneurship, and digital design. This unique program prepares you for careers in digital marketing, user experience design, and creative industries.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Global Business and Digital Arts',
      duration: '4 years',
      minIBPoints: 31,
      programUrl: 'https://uwaterloo.ca/future-students/programs/global-business-and-digital-arts',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7yxv00757mpm7zjtd8ev',
      status: 'current',
      name: 'Health Sciences',
      description:
        "Health Sciences takes an interdisciplinary approach to understanding health and well-being. You'll study biology, psychology, and social determinants of health. This program prepares you for careers in healthcare, public health, and graduate studies in health professions.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://uwaterloo.ca/future-students/programs/health-sciences',
      requirements: [{ courses: ['BIO'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7vis005l7mpmv81p5vd4',
      status: 'current',
      name: 'Honours Science',
      description:
        "Honours Science offers a flexible entry point to the Faculty of Science. You'll explore multiple scientific disciplines before specializing in biology, chemistry, physics, or earth sciences. The program provides a strong foundation for careers in research, healthcare, and technology.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://uwaterloo.ca/future-students/programs/honours-science',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Science in Kinesiology".
    {
      id: 'cmk6q7z8v00797mpmx1mmc1is',
      status: 'current',
      name: 'Kinesiology',
      description:
        "Kinesiology studies human movement, physical activity, and health. You'll explore exercise physiology, biomechanics, motor learning, and sports psychology. The program prepares you for careers in healthcare, physical therapy, athletic training, and health promotion.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://uwaterloo.ca/future-students/programs/kinesiology',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7q1g00317mpm1d6j5hib',
      status: 'current',
      name: 'Management Engineering',
      description:
        "Management Engineering combines engineering, business, and data analytics to optimize complex systems and processes. You'll learn operations research, supply chain management, and information systems. Graduates lead organizations in improving efficiency and making data-driven decisions.",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '5 years',
      minIBPoints: 35,
      programUrl: 'https://uwaterloo.ca/future-students/programs/management-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7y8k006t7mpmo4jftfsx',
      status: 'current',
      name: 'Materials and Nanosciences',
      description:
        "Materials and Nanosciences explores the properties and applications of materials at all scales. You'll study advanced materials, nanotechnology, and their applications in electronics, medicine, and energy. This interdisciplinary program bridges chemistry, physics, and engineering.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://uwaterloo.ca/future-students/programs/materials-and-nanosciences',
      requirements: [
        { courses: ['CHEM'], level: 'SL', grade: 5, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7tx0004x7mpmxuc26v2q',
      status: 'current',
      name: 'Mathematical Economics',
      description:
        "Mathematical Economics combines rigorous mathematical training with economic theory. You'll study optimization, game theory, and econometrics. This program prepares you for graduate studies in economics or careers in policy analysis, consulting, and finance.",
      field: 'Business & Economics',
      degree: 'Bachelor of Mathematics',
      duration: '5 years',
      minIBPoints: 36,
      programUrl: 'https://uwaterloo.ca/future-students/programs/mathematical-economics',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7tm0004t7mpmc16n2msv',
      status: 'current',
      name: 'Mathematical Finance',
      description:
        "Mathematical Finance applies mathematical methods to financial markets and risk management. You'll study stochastic calculus, derivatives pricing, and portfolio optimization. This rigorous program prepares you for careers in investment banking, hedge funds, and financial technology.",
      field: 'Business & Economics',
      degree: 'Bachelor of Mathematics',
      duration: '5 years',
      minIBPoints: 37,
      programUrl: 'https://uwaterloo.ca/future-students/programs/mathematical-finance',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7usv00597mpml0thhqas',
      status: 'current',
      name: 'Mathematical Physics',
      description:
        "Mathematical Physics combines rigorous mathematics with theoretical physics. You'll study quantum mechanics, relativity, and advanced mathematical methods. This program prepares you for graduate studies and research careers at the intersection of math and physics.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Mathematics',
      duration: '5 years',
      minIBPoints: 37,
      programUrl: 'https://uwaterloo.ca/future-students/programs/mathematical-physics',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7miq000p7mpm4okhjen3',
      status: 'current',
      name: 'Mechanical Engineering',
      description:
        "If you love things that move, this is your program. At Waterloo, you'll develop the skills you need to design everything from switches to spacecrafts. You'll get a broad foundation in all aspects of mechanical design: mechanics, power, control, and manufacturing. You'll also learn to lead large, multidisciplinary teams, solve problems, come up with high-impact innovations.",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '5 years',
      minIBPoints: 36,
      programUrl: 'https://uwaterloo.ca/future-students/programs/mechanical-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7n1a00117mpm60rwxeos',
      status: 'current',
      name: 'Mechatronics Engineering',
      description:
        "Mechatronics Engineering combines mechanical engineering, electrical engineering, and computer science to design and build intelligent systems. From autonomous vehicles to advanced robotics, you'll learn to create systems that sense, think, and act. With hands-on experience through co-op, you'll be ready to lead the next generation of smart machines.",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '5 years',
      minIBPoints: 36,
      programUrl: 'https://uwaterloo.ca/future-students/programs/mechatronics-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7yl8006z7mpmimcr5a2g',
      status: 'current',
      name: 'Medicinal Chemistry',
      description:
        "Medicinal Chemistry focuses on the design and development of pharmaceutical compounds. You'll study organic chemistry, biochemistry, and pharmacology. This program prepares you for careers in drug discovery, pharmaceutical research, and graduate studies.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://uwaterloo.ca/future-students/programs/medicinal-chemistry',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: false },
        { courses: ['BIO'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7pjh002p7mpmto6ap7ox',
      status: 'current',
      name: 'Nanotechnology Engineering',
      description:
        "Nanotechnology engineers work at the atomic and molecular scale to create new materials and devices. You'll study quantum mechanics, materials science, and biological systems at the nanoscale. This cutting-edge program prepares you for careers in electronics, medicine, energy, and advanced materials.",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '5 years',
      minIBPoints: 36,
      programUrl: 'https://uwaterloo.ca/future-students/programs/nanotechnology-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7x5400697mpmw0hzm6yu',
      status: 'current',
      name: 'Physics',
      description:
        "Physics explores the fundamental laws that govern the universe, from subatomic particles to galaxies. At Waterloo, you'll develop strong mathematical and problem-solving skills with opportunities in quantum mechanics, astrophysics, and particle physics research.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://uwaterloo.ca/future-students/programs/physics',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: false },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7xht006f7mpmpg2gh1rc',
      status: 'current',
      name: 'Physics and Astronomy',
      description:
        "Physics and Astronomy combines fundamental physics with the study of celestial objects and the universe. You'll explore astrophysics, cosmology, planetary science, and observational techniques while developing strong quantitative skills.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://uwaterloo.ca/future-students/programs/physics-and-astronomy',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: false },
        { courses: ['PHYS'], level: 'HL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk6q7u7l00517mpmqlk8ozg1',
      status: 'current',
      name: 'Statistics',
      description:
        "Statistics focuses on collecting, analyzing, and interpreting data. You'll learn probability theory, statistical inference, and data analysis methods. In our data-driven world, statisticians are highly sought after in finance, healthcare, technology, and government.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Mathematics',
      duration: '5 years',
      minIBPoints: 36,
      programUrl: 'https://uwaterloo.ca/future-students/programs/statistics',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }],
      checkedFor: null,
      sources: []
    }
  ]
}

export default refresh
