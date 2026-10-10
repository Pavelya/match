import type { RefreshFile } from '../lib/refresh'

/**
 * Purdue University (West Lafayette): majors added for content task 6, Part B2 (USA), under the US
 * model the owner chose on 10 October 2026 (docs/tasks/content-2027/usa-model-decision.md).
 *
 * Purdue admits "into a specific major", except engineering at West Lafayette, where every student
 * starts in First-Year Engineering and chooses the specialty for the second year; each engineering
 * program below says so. Each program is one major, chosen from the fields US-bound students pick.
 * Purdue has no overall IB minimum, so every program has no minimum. Its high school course
 * requirements name subjects for some majors: nursing requires a year each of biology and
 * chemistry, which are stored as rows (taken, at any level and grade, as UCL's "some qualification
 * in physics" was in 4.1); engineering's "chemistry experience is expected" is a review emphasis
 * and stays in the description. Purdue's pages name no intake, so all are stamped 2026 (refresh
 * rule 2).
 *
 * Program pages are the admissions site's major pages; each description follows its "Program
 * Summary". Programs taught at both West Lafayette and Indianapolis list West Lafayette first, so
 * none has a campus city.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts purdue-university
 */

/** Read on 9 and 10 October 2026, after each program's own page. */
const SOURCES = [
  'https://admissions.purdue.edu/become-student/international/',
  'https://admissions.purdue.edu/become-student/first-year-criteria/',
  'https://admissions.purdue.edu/become-student/course-requirements/',
  'https://www.purdue.edu/idata/wp-content/uploads/2026/04/CDS-2025-2026.xlsx'
]

const NOTES =
  'Content 6 (Part B2, 10 October 2026): new, under the US model (owner, 10 October 2026). Purdue publishes no IB minimum: "Purdue does not have an overall IB minimum score requirement"; IB students are considered "whether or not you are pursuing the IB diploma", and "higher level (HL) coursework is not given a particular preference over standard level (SL)". So minIBPoints is null. Purdue is "test expected": it expects SAT, ACT or CLT scores. Stamped 2026: the admissions pages name no intake. The "How competitive" paragraph is from the Common Data Set 2025-2026, C1 (fall 2025: 87,220 applied, 37,881 admitted; international 16,327 applied, 3,672 admitted); update it at each refresh.'

/** The description's last paragraph (data conventions: "How competitive"). */
const HOW_COMPETITIVE =
  'How competitive: for fall 2025, Purdue admitted 22% of its 16,327 international first-year applicants (43% of all 87,220). It has no overall IB minimum, gives HL no preference over SL and considers IB students with or without the full Diploma; it expects SAT, ACT or CLT scores. You apply to a specific major.'

/** A program's description, ending with the "How competitive" paragraph. */
const described = (text: string, extra = '') => `${text}\n\n${HOW_COMPETITIVE}${extra}`

const refresh: RefreshFile = {
  university: 'Purdue University',
  entryYear: 2027,
  checkedOn: '2026-10-10',
  programs: [
    {
      status: 'new',
      name: 'Aeronautical and Astronautical Engineering',
      description: described(
        'The design, development, analysis, testing and production of aircraft, missiles and space vehicles: aeronautics for military and civilian aircraft, astronautics for rockets, spacecraft and space systems, with hands-on work in the largest academic propulsion laboratory.',
        ' At West Lafayette you apply to First-Year Engineering and move into this major in your second year. The review places particular emphasis on calculus where available and four years of laboratory science, with chemistry expected.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/aeronautical-astronautical-engineering/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://admissions.purdue.edu/majors/aeronautical-astronautical-engineering/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Mechanical Engineering',
      description: described(
        'The broadest of the engineering majors: physics, electronics, 3D printing, fluid mechanics, heat transfer and controls, with motorsports and rocket teams, research and study abroad.',
        ' At West Lafayette you apply to First-Year Engineering and move into this major in your second year. The review places particular emphasis on calculus where available and four years of laboratory science, with chemistry expected.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/mechanical-engineering/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/mechanical-engineering/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Electrical Engineering',
      description: described(
        'How to design, develop and operate the systems behind autonomous vehicles, biomedical devices, robotics, artificial intelligence and power systems, from microcontrollers and lasers to smart energy and communication systems.',
        ' At West Lafayette you apply to First-Year Engineering and move into this major in your second year. The review places particular emphasis on calculus where available and four years of laboratory science, with chemistry expected.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/electrical-engineering/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/electrical-engineering/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Civil Engineering',
      description: described(
        'Resilient infrastructure, smart cities and environmental sustainability, from building roads to restoring rivers, with nine engineering emphasis areas.',
        ' At West Lafayette you apply to First-Year Engineering and move into this major in your second year. The review places particular emphasis on calculus where available and four years of laboratory science, with chemistry expected.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/civil-engineering/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/civil-engineering/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Chemical Engineering',
      description: described(
        'Chemistry and physics applied to designing the equipment and processes that make fuels, detergents, paper and food, turning laboratory processes into efficient full-scale operations.',
        ' At West Lafayette you apply to First-Year Engineering and move into this major in your second year. The review places particular emphasis on calculus where available and four years of laboratory science, with chemistry expected.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/chemical-engineering/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/chemical-engineering/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Biomedical Engineering',
      description: described(
        'Engineering principles applied to healthcare: medical imaging, prosthetics, wearable health devices and drug delivery, with engineering fundamentals, design, bioinstrumentation and circuit theory.',
        ' At West Lafayette you apply to First-Year Engineering and move into this major in your second year. The review places particular emphasis on calculus where available and four years of laboratory science, with chemistry expected.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/biomedical-engineering/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/biomedical-engineering/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Computer Engineering',
      description: described(
        'Designing computers by blending hardware and software, from smartphones to the systems behind innovation, with advanced study in artificial intelligence, compilers, graphics, networks and operating systems.',
        ' At West Lafayette you apply to First-Year Engineering and move into this major in your second year. The review places particular emphasis on calculus where available and four years of laboratory science, with chemistry expected.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/computer-engineering/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/computer-engineering/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Industrial Engineering',
      description: described(
        'Designing, analysing and improving systems of people, materials, technology and information, such as supply chains, production lines and hospital patient flow, using mathematics, science and business.',
        ' At West Lafayette you apply to First-Year Engineering and move into this major in your second year. The review places particular emphasis on calculus where available and four years of laboratory science, with chemistry expected.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/industrial-engineering/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/industrial-engineering/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Computer Science',
      description: described(
        'Computer science in the oldest computer science department in the world: programming, algorithms, systems, data science, software engineering and cybersecurity, with electives in artificial intelligence, robotics and computational biology.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/computer-science/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/computer-science/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Data Science',
      description: described(
        'Statistical analysis, machine learning and computational thinking at the meeting point of computer science and statistics, with an emphasis in computer science, mathematics or applied statistics.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/data-science/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/data-science/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Mathematics',
      description: described(
        'Pure and applied mathematics in a flexible major that teaches logical, abstract and adaptive thinking and leaves room for a second major or minor.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/mathematics/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/mathematics/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Applied Statistics',
      description: described(
        'Designing data collection, performing advanced analysis and interpreting results for decisions, with probability, statistical theory, data analytics and statistical computing.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/statistics-applied/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/statistics-applied/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Physics',
      description: described(
        'Classical mechanics, quantum theory, electromagnetism, relativity and thermodynamics, with specialization in particle physics, astrophysics or condensed matter through electives and research.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/physics/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/physics/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Chemistry',
      description: described(
        'A strong foundation in chemical principles, laboratory techniques and scientific reasoning, with room for a second major or minor in fields such as biology, psychology, management or forensic science.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/chemistry/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/chemistry/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Biology',
      description: described(
        'A broad foundation in the life sciences, from genetics and ecology to neuroscience and cell biology, for careers in healthcare, research, biotechnology and public service, and for medical, dental and veterinary school.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/biology/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/biology/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Nursing',
      description: described(
        "Purdue's Bachelor of Science in Nursing: anatomy, physiology, pharmacology, nursing ethics and specialized care, with laboratory practice, simulation and clinical placements, leading to the NCLEX-RN licensing exam."
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/nursing/',
      requirements: [
        { courses: ['BIO'], level: 'SL', grade: 1, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 1, critical: true }
      ],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/nursing/', ...SOURCES],
      notes: `${NOTES} Subject rows: "you are required to complete at least two years of science courses, which must include: Biology — 1 year, Chemistry — 1 year" (major page; "One year must be chemistry and one year must be biology", first-year criteria). Stored as Biology and Chemistry taken, SL 1 (HL counts), both critical.`
    },
    {
      status: 'new',
      name: 'Economics',
      description: described(
        'In the Daniels School of Business: how people decide with limited resources and the incentives behind their choices, applied to business and policy, with strong data analysis skills.',
        ' You apply to the economics (pre) major.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/economics-school-of-business/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/economics-school-of-business/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Finance',
      description: described(
        'Money, markets and investments in the Daniels School of Business: managing wealth, evaluating risk, interpreting financial statements and analysing global markets.',
        ' You apply to the finance (pre) major.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/finance/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/finance/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Psychological Sciences',
      description: described(
        'A broad overview of human behaviour across clinical, cognitive, developmental, industrial and organizational, behavioural neuroscience and social psychology, with research and co-op opportunities.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/psychological-sciences/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/psychological-sciences/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Political Science',
      description: described(
        'The tools to lead change and analyse current events and public problems, with applied research alongside faculty, research labs and internships from local to international.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/political-science/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/political-science/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Communication',
      description: described(
        'Crafting messages that inform, influence and inspire: students start in pre-communication with three core courses, advance with a 2.67 GPA and choose from eight concentrations such as public relations and strategic communication.'
      ),
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/communication/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/communication/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Natural Resources and Environmental Science',
      description: described(
        'An interdisciplinary applied science major on understanding and managing human impact on the environment: ecology, conservation, climate policy and sustainable land and water use, in six concentrations.'
      ),
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://admissions.purdue.edu/majors/natural-resources-and-environmental-science/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://admissions.purdue.edu/majors/natural-resources-and-environmental-science/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Landscape Architecture',
      description: described(
        'Designing outdoor spaces that blend natural systems with human needs, from parks and plazas to regional ecosystems: design, technical drafting and plant science, with a professional co-op, preparing for licensure.'
      ),
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://admissions.purdue.edu/majors/landscape-architecture/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://admissions.purdue.edu/majors/landscape-architecture/', ...SOURCES],
      notes: NOTES
    }
  ]
}

export default refresh
