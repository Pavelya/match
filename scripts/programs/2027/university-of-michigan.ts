import type { RefreshFile } from '../lib/refresh'

/**
 * University of Michigan (Ann Arbor): majors added for content task 6, Part B2 (USA), under the US
 * model the owner chose on 10 October 2026 (docs/tasks/content-2027/usa-model-decision.md).
 *
 * At Michigan "you don't apply to the university – you apply to one of our 15 undergraduate
 * schools and colleges"; each program below is one major, chosen from the fields US-bound students
 * pick, and its description names the school or college. Michigan publishes no IB minimum and no
 * subject requirement for IB applicants, so every program has no minimum and no subject rows.
 * Michigan's application changes page covers "students seeking entry in the fall 2027 term", so
 * all are stamped 2027.
 *
 * Every umich.edu site (admissions, LSA, Engineering, Ross, Nursing) answered curl and WebFetch
 * with 403 on 10 October 2026, so admissions pages were read from Internet Archive copies of 14
 * April to 4 October 2026, and LSA major descriptions from the search index; the descriptions are
 * kept short. LSA awards the A.B. or the B.S. by the credits a student takes, so its majors are
 * stored as "Bachelor". Taubman College answered curl.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-michigan
 */

/** Read on 9 and 10 October 2026, after each program's own page. */
const SOURCES = [
  'https://admissions.umich.edu/apply/international-applicants/requirements-deadlines/requirements-country',
  'https://admissions.umich.edu/apply/first-year-applicants/requirements-deadlines/application-changes',
  'https://admissions.umich.edu/academics-majors/majors-degrees',
  'https://admissions.umich.edu/apply/first-year-applicants/selection-process',
  'https://obp.umich.edu/wp-content/uploads/pubdata/cds/cds_2025-26_umaa.pdf'
]

const NOTES =
  'Content 6 (Part B2, 10 October 2026): new, under the US model (owner, 10 October 2026). Michigan publishes no IB minimum: "Predicted IB results are needed if exams have not yet been taken", and for the 2026-2027 cycle "AP and IB results are considered in context with the academic record"; it is test-optional for that cycle. So minIBPoints is null and there are no subject rows (checked, none required). Stamped 2027: the application changes page is for "students seeking entry in the fall 2027 term". umich.edu refused scripts; read from Internet Archive copies (international page 14 April 2026, application changes 4 October 2026, majors list 29 September 2026). The "How competitive" paragraph is from the Common Data Set 2025-2026, C1 (fall 2025: 109,112 applied, 17,915 admitted; no international breakdown); update it at each refresh.'

/** The description's last paragraph (data conventions: "How competitive"). */
const HOW_COMPETITIVE =
  'How competitive: for fall 2025, the University of Michigan admitted 16% of its 109,112 first-year applicants; it publishes no separate figure for international applicants. It sets no IB minimum: it asks for predicted IB results if your exams are not yet taken, considers IB grades in context with your academic record, and is test-optional for fall 2027 entry. At Michigan you apply to one of its 15 undergraduate schools and colleges, not to the university as a whole.'

/** A program's description, ending with the "How competitive" paragraph. */
const described = (text: string, extra = '') => `${text}\n\n${HOW_COMPETITIVE}${extra}`

const refresh: RefreshFile = {
  university: 'University of Michigan',
  entryYear: 2027,
  checkedOn: '2026-10-10',
  programs: [
    {
      id: 'cmv2apm7l0000ew7mjpy3269d',
      status: 'current',
      name: 'Aerospace Engineering',
      description: described(
        'Aerospace engineering is the science and practice of flight, in two branches: aeronautics, the design of aircraft within the atmosphere, and astronautics, the design of spacecraft just outside it and beyond.',
        ' This major is in the College of Engineering.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://aero.engin.umich.edu/undergraduate/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://aero.engin.umich.edu/undergraduate/', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apm8l0001ew7mwjdc8gfo',
      status: 'current',
      name: 'Mechanical Engineering',
      description: described(
        "The College of Engineering's Bachelor of Science in Engineering in mechanical engineering.",
        ' This major is in the College of Engineering.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://me.engin.umich.edu/admissions/undergraduate/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://me.engin.umich.edu/admissions/undergraduate/', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apmbd0002ew7mksda5ig2',
      status: 'current',
      name: 'Electrical Engineering',
      description: described(
        "The Bachelor of Science in Engineering in electrical engineering, from the College of Engineering's Electrical and Computer Engineering division.",
        ' This major is in the College of Engineering.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://ece.engin.umich.edu/academics/undergraduate/prospective-undergrad/electrical-engineering/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://ece.engin.umich.edu/academics/undergraduate/prospective-undergrad/electrical-engineering/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2apmcd0003ew7mij5v4xtl',
      status: 'current',
      name: 'Chemical Engineering',
      description: described(
        "Chemical engineers transform matter into solutions to society's greatest challenges, from the future of medicine to powering a sustainable society.",
        ' This major is in the College of Engineering.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://che.engin.umich.edu/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://che.engin.umich.edu/', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apmda0004ew7mtmpg4d64',
      status: 'current',
      name: 'Civil Engineering',
      description: described(
        'Civil engineering is the design, building and maintenance of the infrastructure that supports modern society (bridges, roads, buildings and water systems) with sustainability and resilience built in.',
        ' This major is in the College of Engineering.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://cee.engin.umich.edu/undergraduate-studies/major-in-civil-engineering/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://cee.engin.umich.edu/undergraduate-studies/major-in-civil-engineering/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2apme90005ew7mlhns36bv',
      status: 'current',
      name: 'Biomedical Engineering',
      description: described(
        'Biomedical engineering for students who enjoy mathematics, physics and chemistry and are interested in biology and medicine, with a design program that solves problems for real clients.',
        ' This major is in the College of Engineering.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bme.umich.edu/academics/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://bme.umich.edu/academics/', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apmf70006ew7m1bm8rghb',
      status: 'current',
      name: 'Materials Science and Engineering',
      description: described(
        'A broad foundation in every class of material (metals, polymers, ceramics and semiconductors), using chemistry and physics to understand how bonding and atomic arrangement shape their properties.',
        ' This major is in the College of Engineering.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://mse.engin.umich.edu/undergraduate',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://mse.engin.umich.edu/undergraduate', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apmg60007ew7m69y2x77x',
      status: 'current',
      name: 'Computer Science (BSE)',
      description: described(
        'Computer science in the College of Engineering: the theory of computation and its applications, designing and analysing algorithms, storing and retrieving information, how computers work and building software systems for complex problems. LSA offers the same major as a Bachelor of Science.',
        ' This major is in the College of Engineering.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://cse.engin.umich.edu/academics/undergraduate/programs/computer-science-eng/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://cse.engin.umich.edu/academics/undergraduate/programs/computer-science-eng/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2apmh60008ew7m4nbmbkaf',
      status: 'current',
      name: 'Data Science',
      description: described(
        'A foundation in the parts of computer science, statistics and mathematics needed to analyse and manipulate large or complex data, ending in a capstone.',
        ' This major is in the College of Literature, Science, and the Arts (LSA).'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://lsa.umich.edu/lsa/academics/majors-minors/data-science-major.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://lsa.umich.edu/lsa/academics/majors-minors/data-science-major.html',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2apmi40009ew7m3odctjhq',
      status: 'current',
      name: 'Mathematics',
      description: described(
        'Mathematics in several tracks: pure mathematics, mathematical sciences, actuarial mathematics, the mathematics of finance and risk management, and honors mathematics.',
        ' This major is in the College of Literature, Science, and the Arts (LSA).'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://lsa.umich.edu/lsa/academics/majors-minors/mathematics-major.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://lsa.umich.edu/lsa/academics/majors-minors/mathematics-major.html',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2apmj2000aew7mw36gjimj',
      status: 'current',
      name: 'Statistics',
      description: described(
        'Applied statistics, statistical theory and statistical computing, built on multivariable calculus, linear algebra and programming, with advanced electives and a capstone.',
        ' This major is in the College of Literature, Science, and the Arts (LSA).'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://lsa.umich.edu/lsa/academics/majors-minors/statistics-major.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://lsa.umich.edu/lsa/academics/majors-minors/statistics-major.html',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2apmk1000bew7mf5xxscnb',
      status: 'current',
      name: 'Physics',
      description: described(
        "The Department of Physics' major in the College of Literature, Science, and the Arts.",
        ' This major is in the College of Literature, Science, and the Arts (LSA).'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://lsa.umich.edu/lsa/academics/majors-minors.html#physics-maj',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://lsa.umich.edu/lsa/academics/majors-minors.html#physics-maj', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apmkx000cew7mfr1dyokd',
      status: 'current',
      name: 'Chemistry',
      description: described(
        "The Department of Chemistry's majors in the College of Literature, Science, and the Arts, including a Bachelor of Science in Chemistry with 60 credits in the sciences and mathematics.",
        ' This major is in the College of Literature, Science, and the Arts (LSA).'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://lsa.umich.edu/lsa/academics/majors-minors.html#chemical_science_bschem-maj',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://lsa.umich.edu/lsa/academics/majors-minors.html#chemical_science_bschem-maj',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2apmls000dew7m64zyiink',
      status: 'current',
      name: 'Neuroscience',
      description: described(
        'A major whose core covers neurobiology, genetics, biochemistry and biopsychology, with an honors track built on two terms of independent research.',
        ' This major is in the College of Literature, Science, and the Arts (LSA).'
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://lsa.umich.edu/lsa/academics/majors-minors/neuroscience-major.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://lsa.umich.edu/lsa/academics/majors-minors/neuroscience-major.html',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2apmmo000eew7maw5yj56l',
      status: 'current',
      name: 'Nursing',
      description: described(
        "The School of Nursing's Bachelor of Science in Nursing develops clinical expertise and critical thinkers and leaders in the profession, with hands-on experience and world-renowned faculty.",
        ' This major is in the School of Nursing.'
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://nursing.umich.edu/academics/BSN',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://nursing.umich.edu/academics/BSN', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apmpx000few7mawaesmif',
      status: 'current',
      name: 'Economics',
      description: described(
        "The Department of Economics' major in the College of Literature, Science, and the Arts.",
        ' This major is in the College of Literature, Science, and the Arts (LSA).'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://lsa.umich.edu/lsa/academics/majors-minors.html#economics-maj',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://lsa.umich.edu/lsa/academics/majors-minors.html#economics-maj', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apmqt000gew7msukb1grx',
      status: 'current',
      name: 'Business Administration (BBA)',
      description: described(
        "The Ross School of Business's BBA, built on action-based learning: its students start, advise, invest in and lead real businesses.",
        ' This major is in the Ross School of Business, which admits first-year students; students admitted to another Michigan college can join Ross in their second year through Preferred Admission.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://michiganross.umich.edu/undergraduate/bba',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://michiganross.umich.edu/undergraduate/bba', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apmrt000hew7mzmlibbad',
      status: 'current',
      name: 'Political Science',
      description: described(
        "The Department of Political Science's major in the College of Literature, Science, and the Arts.",
        ' This major is in the College of Literature, Science, and the Arts (LSA).'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://lsa.umich.edu/lsa/academics/majors-minors.html#political_science-maj',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://lsa.umich.edu/lsa/academics/majors-minors.html#political_science-maj',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2apmsq000iew7mirtxhn5e',
      status: 'current',
      name: 'Psychology',
      description: described(
        "LSA's general psychology major, with experiential lab courses and an honors research track; Michigan also offers Biopsychology, Cognition, and Neuroscience.",
        ' This major is in the College of Literature, Science, and the Arts (LSA).'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://lsa.umich.edu/lsa/academics/majors-minors/psychology-general-social-science-major.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://lsa.umich.edu/lsa/academics/majors-minors/psychology-general-social-science-major.html',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2apmtr000jew7mxuhdmqke',
      status: 'current',
      name: 'Communication and Media',
      description: described(
        'The mass media and emerging media: how they evolved, their effects, how people use them, and their regulation and industry practices.',
        ' This major is in the College of Literature, Science, and the Arts (LSA).'
      ),
      field: 'Media',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://lsa.umich.edu/lsa/academics/majors-minors/communication-and-media-major.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://lsa.umich.edu/lsa/academics/majors-minors/communication-and-media-major.html',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2apmur000kew7m1q2xj9wr',
      status: 'current',
      name: 'Environment',
      description: described(
        'The Program in the Environment, run jointly by LSA and the School for Environment and Sustainability, studies the interactions of human beings and their environment across the natural sciences, social sciences and humanities.',
        ' This major is in the College of Literature, Science, and the Arts (LSA).'
      ),
      field: 'Environmental Studies',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://lsa.umich.edu/lsa/academics/majors-minors/the-environment-major.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://lsa.umich.edu/lsa/academics/majors-minors/the-environment-major.html',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2apmvq000lew7mtgydrfc2',
      status: 'current',
      name: 'Architecture',
      description: described(
        "Taubman College's Bachelor of Science in Architecture, one of the leading undergraduate design programs in the US, combines a collaborative studio culture with technology, global perspectives and sustainable design.",
        ' This major is in the Taubman College of Architecture and Urban Planning.'
      ),
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://taubmancollege.umich.edu/academics/architecture/bachelor-of-science-in-architecture/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://taubmancollege.umich.edu/academics/architecture/bachelor-of-science-in-architecture/',
        ...SOURCES
      ],
      notes: NOTES
    }
  ]
}

export default refresh
