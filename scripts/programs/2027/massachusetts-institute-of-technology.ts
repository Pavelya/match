import type { RefreshFile } from '../lib/refresh'

/**
 * Massachusetts Institute of Technology: majors added for content task 6, Part B2 (USA), under the
 * US model the owner chose on 10 October 2026 (docs/tasks/content-2027/usa-model-decision.md).
 *
 * MIT admits to the whole Institute: every first-year student starts undeclared and chooses a
 * major (a "Course") at the end of the first year, without a further admission. So each major
 * below is one of its Bachelor of Science degrees, chosen from the fields US-bound students pick;
 * the description says how admission works. MIT publishes no IB minimum and requires no high
 * school classes, so every program has no minimum and no subject rows. MIT's first-year pages name
 * no intake, so all are stamped 2026 (refresh rule 2).
 *
 * Program pages are the MIT Course Catalog's department pages, which describe each department's
 * undergraduate degrees.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts massachusetts-institute-of-technology
 */

/** Read on 9 and 10 October 2026, after each program's own page. */
const SOURCES = [
  'https://mitadmissions.org/apply/firstyear/international/',
  'https://mitadmissions.org/discover/the-mit-education/majors-minors/',
  'https://mitadmissions.org/apply/firstyear/deadlines-requirements/',
  'https://mitadmissions.org/apply/firstyear/tests-scores/',
  'https://ir.mit.edu/projects/2025-26-common-data-set/',
  'https://catalog.mit.edu/degree-charts/'
]

const NOTES =
  'Content 6 (Part B2, 10 October 2026): new, under the US model (owner, 10 October 2026). MIT publishes no IB minimum: "We do not have any required high school classes for domestic or international applicants", and the transcript should include IB results, with predicted grades "if available". So minIBPoints is null and there are no subject rows (checked, none required). Admission is to MIT as a whole: "all first-year students begin MIT undeclared". Stamped 2026: MIT\'s first-year pages name no intake. Degree: MIT awards the Bachelor of Science (SB). The "How competitive" paragraph is from the Common Data Set 2025-2026, C1 (fall 2025: 29,281 applied, 1,334 admitted; no international breakdown); update it at each refresh.'

/** The description's last paragraph (data conventions: "How competitive"). */
const HOW_COMPETITIVE =
  'How competitive: for fall 2025, MIT admitted 4.6% of its 29,281 first-year applicants; it publishes no separate figure for international applicants. It sets no IB minimum and requires no particular subjects: it reads your school record with your IB results, predicted grades included, and requires the SAT or ACT. You apply to MIT, not to this major: every first-year student starts undeclared and chooses a major at the end of the first year.'

/** A program's description, ending with the "How competitive" paragraph. */
const described = (text: string, extra = '') => `${text}\n\n${HOW_COMPETITIVE}${extra}`

const refresh: RefreshFile = {
  university: 'Massachusetts Institute of Technology',
  entryYear: 2027,
  checkedOn: '2026-10-10',
  programs: [
    {
      status: 'new',
      name: 'Aerospace Engineering (Course 16)',
      description: described(
        "MIT's Department of Aeronautics and Astronautics (AeroAstro) researches and engineers aerospace systems and technologies, and its Bachelor of Science in Aerospace Engineering educates the engineers who design aircraft, spacecraft and the systems in them."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/engineering/aeronautics-astronautics/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://catalog.mit.edu/schools/engineering/aeronautics-astronautics/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Biological Engineering (Course 20)',
      description: described(
        'Biological engineering fuses engineering analysis and synthesis with modern molecular-to-genomic biology, to understand how biological systems work as physical and chemical mechanisms and how they respond to medical therapeutics, environmental agents and genetic variation.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/engineering/biological-engineering/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://catalog.mit.edu/schools/engineering/biological-engineering/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Chemical Engineering (Course 10)',
      description: described(
        'Chemical engineering translates molecular information into new products and processes. It deals with chemical, physical and biological transformations, described from the submolecular to the macroscopic scale, for industries from nanotechnology and biotechnology to energy.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/engineering/chemical-engineering/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://catalog.mit.edu/schools/engineering/chemical-engineering/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Electrical Engineering with Computing (Course 6-5)',
      description: described(
        "One of the bachelor's degrees of MIT's Department of Electrical Engineering and Computer Science, combining electrical engineering (circuits and systems, devices, photonics, power and energy) with the computing it depends on."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.mit.edu/schools/engineering/electrical-engineering-computer-science/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://catalog.mit.edu/schools/engineering/electrical-engineering-computer-science/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Materials Science and Engineering (Course 3)',
      description: described(
        'Materials science and engineering studies how atoms and molecules are built into solid materials and how their structure governs their properties, for every class of material used in energy, sustainability, nanotechnology, healthcare, information technology and manufacturing.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/engineering/materials-science-engineering/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://catalog.mit.edu/schools/engineering/materials-science-engineering/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Mechanical Engineering (Course 2)',
      description: described(
        'Mechanical engineering is concerned with the responsible development of products, processes and power, at scales from molecules to large and complex systems: the world of mass, motion, forces and energy. It is one of the broadest of the engineering professions.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/engineering/mechanical-engineering/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://catalog.mit.edu/schools/engineering/mechanical-engineering/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Nuclear Science and Engineering (Course 22)',
      description: described(
        'Nuclear Science and Engineering educates students to develop and understand nuclear technologies for society and the environment, from safe, cost-competitive nuclear energy systems to new tools for measuring and modelling matter and radiation.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/engineering/nuclear-science-engineering/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://catalog.mit.edu/schools/engineering/nuclear-science-engineering/',
        ...SOURCES
      ],
      notes: `${NOTES} Field: Engineering, kept at the owner's request (10 October 2026). The fields-of-study rule files it under Natural Sciences because "Science" is named first, but it is an engineering degree in the School of Engineering. Its KEPT entry (lib/programs/fields-of-study.ts) is added at the apply, when it has an id.`
    },
    {
      status: 'new',
      name: 'Computer Science and Engineering (Course 6-3)',
      description: described(
        "MIT's computer science degree, in the Department of Electrical Engineering and Computer Science: algorithms and theory, software engineering, computer systems and architecture, security, graphics and artificial intelligence."
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.mit.edu/schools/engineering/electrical-engineering-computer-science/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://catalog.mit.edu/schools/engineering/electrical-engineering-computer-science/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Artificial Intelligence and Decision Making (Course 6-4)',
      description: described(
        'A degree of the Department of Electrical Engineering and Computer Science centred on artificial intelligence, machine learning and decision-making: how to build systems that learn, reason and act, and how to model and optimize decisions.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.mit.edu/schools/engineering/electrical-engineering-computer-science/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://catalog.mit.edu/schools/engineering/electrical-engineering-computer-science/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Mathematics (Course 18)',
      description: described(
        'Mathematics at MIT ranges from pure mathematics (analysis, algebra, geometry and topology) to applied areas such as combinatorics, computational biology, fluid dynamics, theoretical computer science and theoretical physics. Course 18 also offers Mathematics with Computer Science.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/science/mathematics/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://catalog.mit.edu/schools/science/mathematics/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Physics (Course 8)',
      description: described(
        'Physics at MIT centres on the fundamental principles that govern the physical world, including space and time and matter and energy in all its forms, from the subatomic to the cosmological.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/science/physics/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://catalog.mit.edu/schools/science/physics/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Chemistry (Course 5)',
      description: described(
        'Chemistry is the study of atoms, molecules and solids: the changes they undergo, the principles behind them and ways to create new compounds and materials, with problems from pharmaceuticals and solar cells to clean fuels and batteries.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/science/chemistry/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://catalog.mit.edu/schools/science/chemistry/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Biology (Course 7)',
      description: described(
        'Biology at MIT is quantitative: molecular biology, biochemistry, genetics and cell biology form the core, with a solid grounding in mathematics, physics and chemistry and an emphasis on practical experimentation.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/science/biology/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://catalog.mit.edu/schools/science/biology/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Earth, Atmospheric and Planetary Sciences (Course 12)',
      description: described(
        'The study of the Earth and other planets: geology, geochemistry, geobiology and geophysics, the atmosphere, oceans and climate, and planetary science.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/science/earth-atmospheric-planetary-sciences/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://catalog.mit.edu/schools/science/earth-atmospheric-planetary-sciences/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Brain and Cognitive Sciences (Course 9)',
      description: described(
        'The study of mind, brain and behaviour, asking fundamental questions about intelligent processes and how the brain is organized, through four themes: molecular and cellular neuroscience, systems neuroscience, cognitive science and computation.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/science/brain-cognitive-sciences/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://catalog.mit.edu/schools/science/brain-cognitive-sciences/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Economics (Course 14-1)',
      description: described(
        'Economics studies decision-making by individuals and the aggregate outcomes it produces, and how government and other interventions affect well-being, with methods from mathematical modelling to data science and randomized trials.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/humanities-arts-social-sciences/economics/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://catalog.mit.edu/schools/humanities-arts-social-sciences/economics/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Management (Course 15-1)',
      description: described(
        "The MIT Sloan School of Management's business degree: a foundation in probability and statistics, managerial communication and psychology, microeconomics and accounting, then core business functions (finance, operations, marketing, strategy) and a concentration of the student's choice."
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/sloan-management/management/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://catalog.mit.edu/schools/sloan-management/management/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Political Science (Course 17)',
      description: described(
        'Political science is the systematic study of government and the political process: how political power develops and is used, the causes and consequences of political behaviour and conflict, and the relationship between the individual and the state.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.mit.edu/schools/humanities-arts-social-sciences/political-science/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://catalog.mit.edu/schools/humanities-arts-social-sciences/political-science/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Architecture (Course 4)',
      description: described(
        "MIT's undergraduate architecture degree, in a department that spans architecture and urbanism, building technology, computation, the history and theory of architecture and art, and art, culture and technology."
      ),
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/architecture-planning/architecture/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://catalog.mit.edu/schools/architecture-planning/architecture/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Planning (Course 11)',
      description: described(
        "The Department of Urban Studies and Planning's Bachelor of Science in Planning studies how cities and regions work and how planning and policy can shape them."
      ),
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.mit.edu/schools/architecture-planning/urban-studies-planning/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://catalog.mit.edu/schools/architecture-planning/urban-studies-planning/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Comparative Media Studies',
      description: described(
        'Comparative Media Studies studies contemporary media (film, television, games, social media and digital interactive forms) and teaches students to think across them by creating and producing media themselves.'
      ),
      field: 'Media',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.mit.edu/schools/humanities-arts-social-sciences/comparative-media-studies-writing/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://catalog.mit.edu/schools/humanities-arts-social-sciences/comparative-media-studies-writing/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Music (Course 21M)',
      description: described(
        "MIT's music major develops creativity, research ability and aesthetic sensibility through performance, composition, history, culture, technology and analysis, in close contact with faculty, performers and composers."
      ),
      field: 'Arts & Humanities',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.mit.edu/schools/humanities-arts-social-sciences/music-theater-arts/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://catalog.mit.edu/schools/humanities-arts-social-sciences/music-theater-arts/',
        ...SOURCES
      ],
      notes: NOTES
    }
  ]
}

export default refresh
