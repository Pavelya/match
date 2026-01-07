/**
 * Seed UBC Programs to Database
 *
 * Adds 50 bachelor programs for University of British Columbia with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * Prerequisites: Run seed-ubc.ts first to create the university.
 *
 * Run with: npx tsx scripts/seed-ubc-programs.ts
 */

import { PrismaClient, CourseLevel } from '@prisma/client'

const prisma = new PrismaClient()

// Program definitions with IB requirements
// Requirements format: array of { courses: string[], level: 'HL'|'SL', grade: number, critical?: boolean }
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
  // ENGINEERING PROGRAMS (Faculty of Applied Science)
  // ============================================
  {
    name: 'Computer Engineering',
    description:
      'Computer Engineering integrates electrical engineering and computer science to design and develop computer systems and embedded devices. Students learn about digital systems, computer architecture, software development, and hardware-software integration. The program prepares graduates for careers in technology companies, telecommunications, and research.',
    field: 'Engineering',
    degree: 'Bachelor of Applied Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://you.ubc.ca/programs/computer-engineering/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 },
      { courses: ['CHEM'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Electrical Engineering',
    description:
      'Electrical Engineering focuses on the study, design, and application of equipment, devices and systems that use electricity and electromagnetism. Students explore circuits, electronics, power systems, telecommunications, and signal processing. Graduates work in industries from renewable energy to telecommunications.',
    field: 'Engineering',
    degree: 'Bachelor of Applied Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://you.ubc.ca/programs/electrical-engineering/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 },
      { courses: ['CHEM'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Mechanical Engineering',
    description:
      'Mechanical Engineering applies physics and materials science principles to design, analyze, and manufacture mechanical systems. Students study thermodynamics, mechanics, robotics, and manufacturing processes. The program prepares graduates for diverse industries including aerospace, automotive, energy, and biomedical.',
    field: 'Engineering',
    degree: 'Bachelor of Applied Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://you.ubc.ca/programs/mechanical-engineering/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 },
      { courses: ['CHEM'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Civil Engineering',
    description:
      'Civil Engineering involves the design, construction, and maintenance of the physical and natural built environment. Students study structural engineering, transportation, water resources, and geotechnical engineering. Graduates build and maintain the infrastructure that supports modern society.',
    field: 'Engineering',
    degree: 'Bachelor of Applied Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://you.ubc.ca/programs/civil-engineering/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 },
      { courses: ['CHEM'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Chemical Engineering',
    description:
      'Chemical Engineering applies chemistry, physics, and mathematics to convert raw materials into valuable products. Students learn about process design, reaction engineering, and industrial processes. Graduates work in pharmaceuticals, energy, food processing, and environmental protection.',
    field: 'Engineering',
    degree: 'Bachelor of Applied Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://you.ubc.ca/programs/chemical-engineering/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 5 },
      { courses: ['PHYS'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Environmental Engineering',
    description:
      'Environmental Engineering applies engineering principles to protect and improve public health and the environment. Students study water treatment, air pollution control, waste management, and sustainable design. Graduates work on solutions for climate change, pollution, and resource management.',
    field: 'Engineering',
    degree: 'Bachelor of Applied Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://you.ubc.ca/programs/environmental-engineering/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM', 'PHYS'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'Biomedical Engineering',
    description:
      'Biomedical Engineering combines engineering principles with medical and biological sciences to design healthcare technologies. Students study biomechanics, medical imaging, biomaterials, and biomedical devices. Graduates develop life-saving technologies from prosthetics to diagnostic equipment.',
    field: 'Engineering',
    degree: 'Bachelor of Applied Science',
    duration: '4 years',
    minIBPoints: 38,
    programUrl: 'https://you.ubc.ca/programs/biomedical-engineering/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 },
      { courses: ['CHEM'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'Engineering Physics',
    description:
      'Engineering Physics bridges fundamental physics and practical engineering. This highly selective program emphasizes mathematical rigor and physical understanding while developing engineering design skills. Graduates pursue careers in cutting-edge technology, research, and advanced engineering.',
    field: 'Engineering',
    degree: 'Bachelor of Applied Science',
    duration: '4 years',
    minIBPoints: 38,
    programUrl: 'https://you.ubc.ca/programs/engineering-physics/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Mining Engineering',
    description:
      "Mining Engineering focuses on the extraction and processing of minerals from the earth. Students learn about mineral exploration, mine design, rock mechanics, and sustainable resource extraction. British Columbia's rich mining industry provides excellent career opportunities for graduates.",
    field: 'Engineering',
    degree: 'Bachelor of Applied Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://you.ubc.ca/programs/mining-engineering/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 },
      { courses: ['CHEM'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Materials Engineering',
    description:
      'Materials Engineering studies the relationship between the structure and properties of materials. Students learn about metals, polymers, ceramics, and composites used in manufacturing. Graduates develop new materials for applications in electronics, aerospace, medicine, and construction.',
    field: 'Engineering',
    degree: 'Bachelor of Applied Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://you.ubc.ca/programs/materials-engineering/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 5 },
      { courses: ['PHYS'], level: 'SL', grade: 5 }
    ]
  },

  // ============================================
  // SCIENCE PROGRAMS (Faculty of Science)
  // ============================================
  {
    name: 'Computer Science',
    description:
      'Computer Science at UBC provides a comprehensive education in algorithms, programming, artificial intelligence, computer systems, and software engineering. The program emphasizes both theoretical foundations and practical applications, preparing graduates for careers in technology, research, and innovation.',
    field: 'Computer Science',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://you.ubc.ca/programs/computer-science/',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true }]
  },
  {
    name: 'Biology',
    description:
      "Biology explores the science of life from molecules to ecosystems. UBC's program covers genetics, cell biology, ecology, evolution, and physiology. With access to world-class research facilities and the diverse ecosystems of British Columbia, students gain hands-on experience in cutting-edge biological research.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 35,
    programUrl: 'https://you.ubc.ca/programs/biology/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'Chemistry',
    description:
      "Chemistry investigates the composition, structure, and properties of matter. UBC's program covers organic, inorganic, physical, and analytical chemistry with applications in medicine, materials, and environmental science. Modern laboratory facilities provide extensive hands-on training.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 35,
    programUrl: 'https://you.ubc.ca/programs/chemistry/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['CHEM'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'Physics',
    description:
      "Physics explores the fundamental laws that govern the universe, from subatomic particles to galaxies. UBC's program develops strong mathematical and problem-solving skills with opportunities in quantum mechanics, astrophysics, condensed matter, and particle physics research.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 36,
    programUrl: 'https://you.ubc.ca/programs/physics/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'Mathematics',
    description:
      'Mathematics at UBC develops rigorous analytical thinking and problem-solving abilities. Students explore pure and applied mathematics including algebra, analysis, probability, and computational methods. The program prepares graduates for careers in research, finance, technology, and education.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://you.ubc.ca/programs/mathematics/',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true }]
  },
  {
    name: 'Statistics',
    description:
      "Statistics focuses on collecting, analyzing, and interpreting data. UBC's program covers probability theory, statistical inference, data analysis, and machine learning. In our data-driven world, graduates are highly sought after in finance, healthcare, technology, and government.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 36,
    programUrl: 'https://you.ubc.ca/programs/statistics/',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 5 }]
  },
  {
    name: 'Earth and Ocean Sciences',
    description:
      'Earth and Ocean Sciences explores the physical, chemical, and biological processes that shape our planet. Students study geology, oceanography, climate science, and natural hazards. Located on the Pacific coast, UBC offers unique access to diverse geological and oceanic environments.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://you.ubc.ca/programs/earth-ocean-sciences/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Environmental Sciences',
    description:
      "Environmental Sciences applies scientific principles to understand and address environmental challenges. Students study ecology, climate change, pollution, and conservation. UBC's location provides access to diverse ecosystems from rainforests to oceans for field research.",
    field: 'Environmental Studies',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://you.ubc.ca/programs/environmental-sciences/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Microbiology and Immunology',
    description:
      'Microbiology and Immunology studies microorganisms and the immune system. Students explore bacteria, viruses, fungi, and how the body defends against pathogens. This program prepares graduates for careers in healthcare, biotechnology, pharmaceutical research, and public health.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 35,
    programUrl: 'https://you.ubc.ca/programs/microbiology-immunology/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'Biochemistry',
    description:
      'Biochemistry explores the chemical processes within living organisms. Students study molecular biology, protein structure, metabolism, and genetics. This interdisciplinary program prepares graduates for careers in medical research, biotechnology, pharmaceuticals, and graduate studies.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 36,
    programUrl: 'https://you.ubc.ca/programs/biochemistry/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['CHEM'], level: 'HL', grade: 5 },
      { courses: ['BIO'], level: 'SL', grade: 5 }
    ]
  },

  // ============================================
  // COMMERCE (Sauder School of Business)
  // ============================================
  {
    name: 'Commerce',
    description:
      "The UBC Sauder School of Business Bachelor of Commerce is one of Canada's premier business programs. Students study accounting, finance, marketing, operations, and entrepreneurship. The program emphasizes ethical leadership, global thinking, and real-world business experience through co-op and case competitions.",
    field: 'Business & Economics',
    degree: 'Bachelor of Commerce',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://you.ubc.ca/programs/commerce/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }]
  },

  // ============================================
  // ARTS PROGRAMS (Faculty of Arts)
  // ============================================
  {
    name: 'Economics',
    description:
      'Economics at UBC analyzes how societies allocate scarce resources. Students study microeconomics, macroeconomics, econometrics, and policy analysis. The Vancouver School of Economics is internationally recognized for research excellence, preparing graduates for careers in policy, finance, and academia.',
    field: 'Business & Economics',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 33,
    programUrl: 'https://you.ubc.ca/programs/economics/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }]
  },
  {
    name: 'Psychology',
    description:
      "Psychology studies human behavior, cognition, and mental processes. UBC's program covers developmental, social, clinical, and cognitive psychology with opportunities for research. Graduates pursue careers in counseling, healthcare, human resources, research, and education.",
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/psychology/',
    requirements: [] // No specific IB requirements beyond general admission
  },
  {
    name: 'Political Science',
    description:
      'Political Science examines political systems, international relations, and public policy. Students analyze government institutions, political behavior, and global affairs. Located in multicultural Vancouver, UBC provides unique perspectives on Canadian and international politics.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/political-science/',
    requirements: []
  },
  {
    name: 'Philosophy',
    description:
      'Philosophy develops critical thinking, logical reasoning, and ethical analysis. Students explore metaphysics, epistemology, ethics, and the philosophy of mind. The program prepares graduates for law school, graduate studies, business, and careers requiring rigorous analytical skills.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/philosophy/',
    requirements: []
  },
  {
    name: 'History',
    description:
      'History at UBC explores human experience across time and cultures. Students develop research, writing, and analytical skills while studying diverse topics from ancient civilizations to modern global events. The program prepares graduates for careers in education, journalism, law, and public service.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/history/',
    requirements: []
  },
  {
    name: 'English Language and Literatures',
    description:
      'English studies literature, language, and writing from various periods and traditions. Students analyze texts critically, develop strong communication skills, and explore creative writing. Graduates pursue careers in education, publishing, journalism, communications, and the creative industries.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/english/',
    requirements: []
  },
  {
    name: 'Sociology',
    description:
      'Sociology analyzes social structures, institutions, and human interactions. Students study inequality, culture, crime, media, and social movements. The program develops research and analytical skills applicable to careers in social services, policy, research, and community organizations.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/sociology/',
    requirements: []
  },
  {
    name: 'Anthropology',
    description:
      'Anthropology studies human cultures and societies across time and space. Students explore cultural diversity, archaeology, linguistics, and biological anthropology. The program provides unique perspectives on global issues and prepares graduates for careers in research, museums, and international development.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/anthropology/',
    requirements: []
  },
  {
    name: 'Geography',
    description:
      "Geography examines the relationship between humans and their environment. Students study urban planning, climate change, geospatial analysis, and environmental management. UBC's location provides access to diverse landscapes for field research in this increasingly relevant discipline.",
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/geography/',
    requirements: []
  },
  {
    name: 'International Relations',
    description:
      'International Relations analyzes global politics, diplomacy, and international organizations. Students study foreign policy, international security, global economics, and transnational issues. The program prepares graduates for careers in diplomacy, international organizations, NGOs, and global business.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 33,
    programUrl: 'https://you.ubc.ca/programs/international-relations/',
    requirements: []
  },
  {
    name: 'Linguistics',
    description:
      'Linguistics explores the science of human language—its structure, meaning, and use. Students study phonetics, syntax, semantics, and sociolinguistics. The program prepares graduates for careers in language technology, translation, education, speech pathology, and computational linguistics.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/linguistics/',
    requirements: []
  },

  // ============================================
  // KINESIOLOGY (Faculty of Education)
  // ============================================
  {
    name: 'Kinesiology',
    description:
      'Kinesiology studies human movement, physical activity, and health. Students explore exercise physiology, biomechanics, motor learning, and sports psychology. The program prepares graduates for careers in healthcare, physical therapy, athletic training, and health promotion.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Kinesiology',
    duration: '4 years',
    minIBPoints: 35,
    programUrl: 'https://you.ubc.ca/programs/kinesiology/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO'], level: 'SL', grade: 4 },
      { courses: ['CHEM'], level: 'SL', grade: 4 },
      { courses: ['PHYS'], level: 'SL', grade: 4 }
    ]
  },

  // ============================================
  // LAND AND FOOD SYSTEMS
  // ============================================
  {
    name: 'Food Science',
    description:
      'Food Science applies biology, chemistry, and engineering to food production and safety. Students study food processing, nutrition, quality control, and product development. Graduates work in food industry, research, quality assurance, and public health.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/food-science/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Nutritional Sciences',
    description:
      'Nutritional Sciences studies how food and nutrients affect human health. Students learn about metabolism, clinical nutrition, public health nutrition, and food security. Graduates pursue careers as dietitians, nutrition researchers, public health professionals, and food industry specialists.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 33,
    programUrl: 'https://you.ubc.ca/programs/nutritional-sciences/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Global Resource Systems',
    description:
      'Global Resource Systems addresses food security, sustainable development, and resource management from a global perspective. Students study international development, environmental policy, and sustainable agriculture. The program includes mandatory international field experience.',
    field: 'Environmental Studies',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/global-resource-systems/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5 }
    ]
  },

  // ============================================
  // FORESTRY
  // ============================================
  {
    name: 'Forest Sciences',
    description:
      "Forest Sciences studies forest ecosystems, conservation, and sustainable management. Students learn about forest ecology, wildlife, climate change impacts, and natural resource policy. British Columbia's diverse forests provide exceptional learning opportunities.",
    field: 'Environmental Studies',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/forest-sciences/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Natural Resources Conservation',
    description:
      'Natural Resources Conservation focuses on protecting natural environments while meeting human needs. Students study ecology, conservation biology, environmental policy, and resource management. Graduates work in parks, conservation organizations, and environmental consulting.',
    field: 'Environmental Studies',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/natural-resources-conservation/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Wood Products Processing',
    description:
      'Wood Products Processing combines engineering with forest resources to develop sustainable wood products. Students learn about wood science, manufacturing processes, and product design. Graduates work in forest products industry, research, and sustainable construction.',
    field: 'Engineering',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/wood-products-processing/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5 }
    ]
  },

  // ============================================
  // ARCHITECTURE
  // ============================================
  {
    name: 'Design in Architecture',
    description:
      'Design in Architecture combines creative design with technical knowledge to shape built environments. Students study architectural history, design principles, digital fabrication, and sustainable construction. A supplemental portfolio submission is required for admission.',
    field: 'Architecture',
    degree: 'Bachelor of Design in Architecture',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/design-architecture/',
    requirements: [] // No specific IB requirements; supplemental application required
  },
  {
    name: 'Landscape Architecture',
    description:
      'Landscape Architecture designs outdoor spaces that are beautiful, functional, and sustainable. Students study site planning, environmental restoration, urban design, and plant sciences. The program prepares graduates to create parks, gardens, campuses, and public spaces.',
    field: 'Architecture',
    degree: 'Bachelor of Design in Architecture',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/landscape-architecture/',
    requirements: []
  },

  // ============================================
  // MUSIC
  // ============================================
  {
    name: 'Music',
    description:
      'Music at UBC offers comprehensive training in performance, composition, and music scholarship. Students have access to world-class faculty and facilities at the UBC School of Music. An audition is required for admission to all music programs.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Music',
    duration: '4 years',
    minIBPoints: 30,
    programUrl: 'https://you.ubc.ca/programs/music/',
    requirements: [] // Audition-based admission
  },

  // ============================================
  // MEDIA AND CREATIVE ARTS
  // ============================================
  {
    name: 'Media Studies',
    description:
      "Media Studies analyzes media's role in society, culture, and politics. Students study digital media, film, journalism, and communication theory. The program prepares graduates for careers in media production, journalism, communications, marketing, and content creation.",
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://you.ubc.ca/programs/media-studies/',
    requirements: []
  },

  // ============================================
  // ADDITIONAL SCIENCE PROGRAMS
  // ============================================
  {
    name: 'Cognitive Systems',
    description:
      'Cognitive Systems is an interdisciplinary program combining psychology, philosophy, linguistics, and computer science to study the mind. Students explore human cognition and artificial intelligence. Graduates work in AI research, user experience design, and cognitive science.',
    field: 'Computer Science',
    degree: 'Bachelor of Arts',
    duration: '4 years',
    minIBPoints: 36,
    programUrl: 'https://you.ubc.ca/programs/cognitive-systems/',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 5 }]
  },
  {
    name: 'Data Science',
    description:
      'Data Science combines statistics, computer science, and domain expertise to extract insights from data. Students learn programming, machine learning, data visualization, and statistical modeling. This rapidly growing field offers excellent career opportunities across all industries.',
    field: 'Computer Science',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://you.ubc.ca/programs/data-science/',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true }]
  },
  {
    name: 'Integrated Sciences',
    description:
      'Integrated Sciences allows students to design their own interdisciplinary science program. Students combine courses from multiple science departments to address complex real-world problems. The program emphasizes collaboration, innovation, and scientific literacy.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://you.ubc.ca/programs/integrated-sciences/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Pharmacology',
    description:
      'Pharmacology studies how drugs affect living systems. Students learn about drug mechanisms, development, toxicology, and therapeutics. The program prepares graduates for careers in pharmaceutical research, healthcare, regulatory agencies, and graduate studies in medicine.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 36,
    programUrl: 'https://you.ubc.ca/programs/pharmacology/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['CHEM'], level: 'HL', grade: 5 },
      { courses: ['BIO'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Geological Engineering',
    description:
      'Geological Engineering applies geological knowledge to engineering challenges. Students study geotechnical engineering, hydrogeology, resource exploration, and natural hazards. Graduates work in construction, mining, environmental consulting, and infrastructure development.',
    field: 'Engineering',
    degree: 'Bachelor of Applied Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://you.ubc.ca/programs/geological-engineering/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS', 'CHEM'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'Astronomy',
    description:
      "Astronomy studies celestial objects and the universe. Students explore astrophysics, cosmology, planetary science, and observational techniques. UBC's department is internationally recognized for research in galaxy evolution, stellar physics, and exoplanets.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 36,
    programUrl: 'https://you.ubc.ca/programs/astronomy/',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'Atmospheric Science',
    description:
      'Atmospheric Science studies weather, climate, and atmospheric processes. Students learn about meteorology, climate modeling, air quality, and climate change. Graduates work in weather forecasting, environmental consulting, research, and climate policy.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl: 'https://you.ubc.ca/programs/atmospheric-science/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['PHYS'], level: 'SL', grade: 5 }
    ]
  }
]

async function seedUBCPrograms() {
  console.log('\n🎓 Seeding UBC Programs\n')

  try {
    // 1. Find UBC
    const ubc = await prisma.university.findFirst({
      where: {
        name: {
          equals: 'University of British Columbia',
          mode: 'insensitive'
        }
      }
    })

    if (!ubc) {
      console.error('❌ University of British Columbia not found in database.')
      console.error('   Run: npx tsx scripts/seed-ubc.ts first')
      process.exit(1)
    }

    console.log(`✅ Found University of British Columbia (ID: ${ubc.id})\n`)

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
          universityId: ubc.id
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
              universityId: ubc.id,
              fieldOfStudyId: fieldId,
              degreeType: programDef.degree,
              duration: programDef.duration,
              minIBPoints: programDef.minIBPoints,
              programUrl: programDef.programUrl
            }
          })

          // Create course requirements
          for (const req of programDef.requirements) {
            // If multiple courses, create an OR group
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
          `   ✅ ${programDef.name} (${programDef.minIBPoints} pts, ${programDef.requirements.length} requirements)`
        )
        successCount++
      } catch (error) {
        console.error(`   ❌ Failed to create ${programDef.name}:`, error)
        failCount++
      }
    }

    // 4. Summary
    console.log('\n' + '─'.repeat(50))
    console.log('\n📊 Summary:')
    console.log(`   ✅ Created: ${successCount} programs`)
    console.log(`   ⏭️  Skipped: ${skipCount} programs (already exist)`)
    console.log(`   ❌ Failed: ${failCount} programs`)

    console.log('\n📡 Run Algolia sync to update search:')
    console.log('   npx tsx scripts/sync-to-algolia-standalone.ts\n')

    console.log('🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error seeding UBC programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedUBCPrograms()
