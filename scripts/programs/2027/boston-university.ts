import type { RefreshFile } from '../lib/refresh'

/**
 * Boston University: majors added for content task 6, Part B2 (USA), under the US model the owner
 * chose on 10 October 2026 (docs/tasks/content-2027/usa-model-decision.md).
 *
 * Applicants "must specify a BU school or college", so each program below is one major in the
 * school or college that teaches it, chosen from the fields US-bound students pick. BU publishes
 * no IB minimum. Its first-year page requires a year of calculus for the College of Engineering
 * and the Questrom School of Business, met for IB students by Maths AA at HL or SL, or Maths AI at
 * HL: those programs carry that either/or as a subject row; the others have none. The first-year
 * page sets BU's testing policy for applicants "through fall 2028", so all are stamped 2027.
 *
 * Program pages are the BU Bulletin's program pages; each description follows the bulletin.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts boston-university
 */

/** Read on 9 and 10 October 2026, after each program's own page. */
const SOURCES = [
  'https://www.bu.edu/admissions/apply/international/',
  'https://www.bu.edu/admissions/apply/first-year/',
  'https://www.bu.edu/admissions/contact-us/',
  'https://www.bu.edu/asir/files/2026/07/CDS-2025-2026-updated.pdf'
]

const NOTES =
  'Content 6 (Part B2, 10 October 2026): new, under the US model (owner, 10 October 2026). BU publishes no IB minimum; for IB students "predicted results are also required", and BU "is test optional for first-year applicants applying through fall 2028 and spring 2029". So minIBPoints is null. Subject rows only for the calculus requirement of Engineering and Questrom (see those programs); the rest checked, none required. Stamped 2027 on the first-year page\'s policy through fall 2028. The "How competitive" paragraph is from the Common Data Set 2025-2026, C1 (fall 2025: 76,776 applied, 9,853 admitted; international 15,794 applied, 2,521 admitted); update it at each refresh.'

/** The description's last paragraph (data conventions: "How competitive"). */
const HOW_COMPETITIVE =
  'How competitive: for fall 2025, Boston University admitted 16% of its 15,794 international first-year applicants (13% of all 76,776). It sets no IB minimum: IB students must send predicted results, and BU is test-optional for applicants through fall 2028. You apply to the BU school or college that teaches this major.'

/** A program's description, ending with the "How competitive" paragraph. */
const described = (text: string, extra = '') => `${text}\n\n${HOW_COMPETITIVE}${extra}`

const refresh: RefreshFile = {
  university: 'Boston University',
  entryYear: 2027,
  checkedOn: '2026-10-10',
  programs: [
    {
      status: 'new',
      name: 'Biomedical Engineering',
      description: described(
        'Engineering science and technology applied to biology, medicine and biotechnology, from physiological measuring and diagnostic systems to quantitative understanding of how the human body works and fails.',
        ' This major is in the College of Engineering, which requires a year of calculus: for IB students, Maths AA at HL or SL, or Maths AI at HL.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/eng/programs/biomedical-engineering/bs/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 1 },
            { course: 'MATH-AI', level: 'HL', grade: 1 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/eng/programs/biomedical-engineering/bs/', ...SOURCES],
      notes: `${NOTES} Subject row: "Applicants to the College of Engineering are required to have a year of calculus. For students enrolled in IB courses, this requirement would be met with enrollment in HL or SL Math Analysis & Approaches or HL Math Applications & Interpretations" (first-year page; the same for the Questrom School of Business). Stored as one either/or, Maths AA SL 1 (HL counts) or Maths AI HL 1, critical: the condition is enrolment, not a grade.`
    },
    {
      status: 'new',
      name: 'Computer Engineering',
      description: described(
        'One of the two degrees of the Department of Electrical and Computer Engineering: modern computers as complex systems, single machines or networks, that are the "brains" of communication and control systems.',
        ' This major is in the College of Engineering, which requires a year of calculus: for IB students, Maths AA at HL or SL, or Maths AI at HL.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/eng/programs/computer-engineering/bs/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 1 },
            { course: 'MATH-AI', level: 'HL', grade: 1 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/eng/programs/computer-engineering/bs/', ...SOURCES],
      notes: `${NOTES} Subject row: "Applicants to the College of Engineering are required to have a year of calculus. For students enrolled in IB courses, this requirement would be met with enrollment in HL or SL Math Analysis & Approaches or HL Math Applications & Interpretations" (first-year page; the same for the Questrom School of Business). Stored as one either/or, Maths AA SL 1 (HL counts) or Maths AI HL 1, critical: the condition is enrolment, not a grade.`
    },
    {
      status: 'new',
      name: 'Electrical Engineering',
      description: described(
        'The use and control of electromagnetic energy, the thread that links the many disciplines of electrical engineering, from the transducers that capture information to the systems that process it.',
        ' This major is in the College of Engineering, which requires a year of calculus: for IB students, Maths AA at HL or SL, or Maths AI at HL.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/eng/programs/electrical-engineering/bs/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 1 },
            { course: 'MATH-AI', level: 'HL', grade: 1 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/eng/programs/electrical-engineering/bs/', ...SOURCES],
      notes: `${NOTES} Subject row: "Applicants to the College of Engineering are required to have a year of calculus. For students enrolled in IB courses, this requirement would be met with enrollment in HL or SL Math Analysis & Approaches or HL Math Applications & Interpretations" (first-year page; the same for the Questrom School of Business). Stored as one either/or, Maths AA SL 1 (HL counts) or Maths AI HL 1, critical: the condition is enrolment, not a grade.`
    },
    {
      status: 'new',
      name: 'Mechanical Engineering',
      description: described(
        'How robots move, airplanes fly and big data enables big ideas: innovation for sustainable energy, engineered biological tissues, new materials and science from the nanoscale to the solar system.',
        ' This major is in the College of Engineering, which requires a year of calculus: for IB students, Maths AA at HL or SL, or Maths AI at HL.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/eng/programs/mechanical-engineering/bs/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 1 },
            { course: 'MATH-AI', level: 'HL', grade: 1 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/eng/programs/mechanical-engineering/bs/', ...SOURCES],
      notes: `${NOTES} Subject row: "Applicants to the College of Engineering are required to have a year of calculus. For students enrolled in IB courses, this requirement would be met with enrollment in HL or SL Math Analysis & Approaches or HL Math Applications & Interpretations" (first-year page; the same for the Questrom School of Business). Stored as one either/or, Maths AA SL 1 (HL counts) or Maths AI HL 1, critical: the condition is enrolment, not a grade.`
    },
    {
      status: 'new',
      name: 'Computer Science',
      description: described(
        'The organization, design and construction of hardware and software systems, and the mathematics to abstract and analyse computational processes and design efficient solutions.',
        ' This major is in the College of Arts & Sciences.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/cas/programs/computer-science/ba/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/cas/programs/computer-science/ba/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Data Science',
      description: described(
        'Computational and inferential thinking combined to collect, explore and analyse data, identify patterns and draw conclusions, in the Faculty of Computing and Data Sciences.',
        ' This major is in the Faculty of Computing & Data Sciences.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/cds/programs/bs-in-data-science/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/cds/programs/bs-in-data-science/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Business Administration (BSBA)',
      description: described(
        "The Questrom School of Business's Bachelor of Science in Business Administration: business and functional disciplines, how they depend on each other, business's role in society, and skills such as teamwork and career management.",
        ' This major is in the Questrom School of Business, which requires a year of calculus, or a year of precalculus and one of statistics: for IB students, Maths AA at HL or SL, or Maths AI at HL.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/questrom/programs/undergrad/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 1 },
            { course: 'MATH-AI', level: 'HL', grade: 1 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/questrom/programs/undergrad/', ...SOURCES],
      notes: `${NOTES} Subject row: "Applicants to the College of Engineering are required to have a year of calculus. For students enrolled in IB courses, this requirement would be met with enrollment in HL or SL Math Analysis & Approaches or HL Math Applications & Interpretations" (first-year page; the same for the Questrom School of Business). Stored as one either/or, Maths AA SL 1 (HL counts) or Maths AI HL 1, critical: the condition is enrolment, not a grade.`
    },
    {
      status: 'new',
      name: 'Economics',
      description: described(
        'Core microeconomic and macroeconomic theory with the empirical skills to apply economic reasoning in a data-driven world, training in theory and econometrics, and electives.',
        ' This major is in the College of Arts & Sciences.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/cas/programs/economics/ba/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/cas/programs/economics/ba/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Mathematics and Statistics',
      description: described(
        'Abstract thinking and critical reasoning through courses across mathematical disciplines, for careers in every sector that needs mathematicians and statisticians.',
        ' This major is in the College of Arts & Sciences.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/cas/programs/mathematics-statistics/ba/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/cas/programs/mathematics-statistics/ba/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Physics',
      description: described(
        'A foundation of knowledge and problem-solving ability for many careers, in a department known for teaching and active research, with close contact between students and faculty.',
        ' This major is in the College of Arts & Sciences.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/cas/programs/physics/ba/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/cas/programs/physics/ba/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Chemistry',
      description: described(
        'A research-focused major: a core in analytical, organic, physical, inorganic and biochemistry, then materials, computational and biological chemistry, with project-based laboratories.',
        ' This major is in the College of Arts & Sciences.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/cas/programs/chemistry/ba/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/cas/programs/chemistry/ba/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Biology',
      description: described(
        'Breadth across the biological disciplines and a chance to study one specialized area in depth, through lecture, laboratory and research.',
        ' This major is in the College of Arts & Sciences.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/cas/programs/biology/ba/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/cas/programs/biology/ba/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Neuroscience',
      description: described(
        'How networks of nerve cells, from a few hundred in small invertebrates to about 100 billion in humans, produce motivations, sensations, memories and actions.',
        ' This major is in the College of Arts & Sciences.'
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/cas/programs/neuroscience/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/cas/programs/neuroscience/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Health Science',
      description: described(
        'An interdisciplinary Bachelor of Science in the health sciences and global public health, combining biological sciences, humanities and social sciences with a strong foundation in global health.',
        ' This major is in Sargent College of Health & Rehabilitation Sciences.'
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/sar/programs/health-science/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/sar/programs/health-science/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Political Science',
      description: described(
        'The concerns and issues of public life: how political communities reconcile justice, power, liberty and authority, drawing on history, law, economics, psychology, sociology and philosophy.',
        ' This major is in the College of Arts & Sciences.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/cas/programs/political-science/ba/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/cas/programs/political-science/ba/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Psychology',
      description: described(
        'The science of human behaviour and mental processes, preparing for graduate study in psychology, medicine, law and other professions.',
        ' This major is in the College of Arts & Sciences.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/cas/programs/psychology/ba/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/cas/programs/psychology/ba/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'International Relations',
      description: described(
        'How the world works, studied across disciplines; offered by the Frederick S. Pardee School of Global Studies to students of the College of Arts & Sciences.',
        ' This major is in the College of Arts & Sciences.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/cas/programs/international-relations/ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.bu.edu/academics/cas/programs/international-relations/ba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Journalism',
      description: described(
        'Reporting, writing, editing, production, design and civic responsibility, and how to work as a professional: deadlines, interviews and research.',
        ' This major is in the College of Communication.'
      ),
      field: 'Media',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/com/programs/journalism/bs/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/com/programs/journalism/bs/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Film and Television',
      description: described(
        'Film, television and new media with a liberal arts education: theory, storytelling and production, taught by faculty and alumni from the industry.',
        ' This major is in the College of Communication.'
      ),
      field: 'Arts & Humanities',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/com/programs/film-television/film-televisionbs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.bu.edu/academics/com/programs/film-television/film-televisionbs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Environmental Analysis and Policy',
      description: described(
        'A social science training specialized in the environment: the social and institutional framework of environmental and natural resource planning, management and policy.',
        ' This major is in the College of Arts & Sciences.'
      ),
      field: 'Environmental Studies',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.bu.edu/academics/cas/programs/earth-environment/ba-environmental-analysis-policy/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.bu.edu/academics/cas/programs/earth-environment/ba-environmental-analysis-policy/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Architectural Studies',
      description: described(
        'Understanding, designing and writing about historical and contemporary buildings and spaces, for careers and graduate study in architecture, landscape architecture, historic preservation and urban planning.',
        ' This major is in the College of Arts & Sciences.'
      ),
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/cas/programs/art-history/ba-architectural-studies/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.bu.edu/academics/cas/programs/art-history/ba-architectural-studies/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'English',
      description: described(
        'Literature in all its richness, from the canon of past works to the cultural, media, graphic and digital forms of the 21st century.',
        ' This major is in the College of Arts & Sciences.'
      ),
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.bu.edu/academics/cas/programs/english/ba/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.bu.edu/academics/cas/programs/english/ba/', ...SOURCES],
      notes: NOTES
    }
  ]
}

export default refresh
