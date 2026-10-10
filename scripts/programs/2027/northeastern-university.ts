import type { RefreshFile } from '../lib/refresh'

/**
 * Northeastern University (Boston): majors added for content task 6, Part B2 (USA), under the US
 * model the owner chose on 10 October 2026 (docs/tasks/content-2027/usa-model-decision.md).
 *
 * Northeastern "offers over 370 majors across 8 undergraduate colleges and schools", and students
 * "begin their Northeastern experience in one of our Signature Programs", on the Boston campus or
 * across its network of campuses and partners. Each program below is one Boston major, chosen from
 * the fields US-bound students pick; the catalog's Oakland and New York City versions are not
 * added. Northeastern publishes no IB minimum and no subject requirement for IB applicants, so
 * every program has no minimum and no subject rows. Its counselor page covers the "Fall 2027
 * Application Cycle", so all are stamped 2027.
 *
 * Program pages are the Northeastern Academic Catalog's Boston major pages; each description
 * follows the catalog.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts northeastern-university
 */

/** Read on 9 and 10 October 2026, after each program's own page. */
const SOURCES = [
  'https://admissions.northeastern.edu/application-information/international-applicants/',
  'https://admissions.northeastern.edu/application-information/first-year-applicants/',
  'https://admissions.northeastern.edu/visit/counselor-resources/',
  'https://uds.northeastern.edu/facts/common-data-set/'
]

const NOTES =
  'Content 6 (Part B2, 10 October 2026): new, under the US model (owner, 10 October 2026). Northeastern publishes no IB minimum: it "highly recommends sending final results or predicted grades", is test-optional, and "reserves the right to rescind any offers of admission" if final results are not "within an acceptable range" of the predictions. So minIBPoints is null and there are no subject rows (checked, none required). Stamped 2027: the counselor page is for the "Fall 2027 Application Cycle". The "How competitive" paragraph is from the Common Data Set (fall 2025: 105,256 applied, 5,920 admitted; international 18,754 applied, 735 admitted); update it at each refresh.'

/** The description's last paragraph (data conventions: "How competitive"). */
const HOW_COMPETITIVE =
  "How competitive: for fall 2025, Northeastern admitted 3.9% of its 18,754 international first-year applicants (5.6% of all 105,256). It sets no IB minimum: it highly recommends predicted grades and is test-optional, and it can rescind an offer if your final results fall outside an acceptable range of your predictions. Students begin in one of Northeastern's Signature Programs, on the Boston campus or across its network of campuses and partners."

/** A program's description, ending with the "How competitive" paragraph. */
const described = (text: string, extra = '') => `${text}\n\n${HOW_COMPETITIVE}${extra}`

const refresh: RefreshFile = {
  university: 'Northeastern University',
  entryYear: 2027,
  checkedOn: '2026-10-10',
  programs: [
    {
      id: 'cmv2aq5gn0000i67mhqwym6ey',
      status: 'current',
      name: 'Bioengineering',
      description: described(
        'Engineering in a biological context, such as the human body, an ecosystem or a bioreactor, where the interface with living systems shapes the design of devices, instruments and implants.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/engineering/bioengineering/bioengineering-bsbioe/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/engineering/bioengineering/bioengineering-bsbioe/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5hj0001i67mgmla2iqg',
      status: 'current',
      name: 'Chemical Engineering',
      description: described(
        'A broad education in science, mathematics and engineering fundamentals applied to current problems with modern tools such as computational software and computer-aided design.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/engineering/chemical/chemical-engineering-bsche/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/engineering/chemical/chemical-engineering-bsche/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5if0002i67mpqocf9eu',
      status: 'current',
      name: 'Civil Engineering',
      description: described(
        'Conceptualizing, designing and building sustainable infrastructure and environments: resilient urban infrastructure, clean water and a clean environment.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/engineering/civil-environmental/civil-engineering-bsce/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/engineering/civil-environmental/civil-engineering-bsce/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5je0003i67mgs6stpo6',
      status: 'current',
      name: 'Electrical Engineering',
      description: described(
        'The engineers behind global communication systems, computer chips, pacemakers, MRI and space missions, turning new concepts into the next generation of technology.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/engineering/electrical-computer/electrical-engineering-bsee/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/engineering/electrical-computer/electrical-engineering-bsee/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5ko0004i67mqvjyypcz',
      status: 'current',
      name: 'Computer Engineering',
      description: described(
        'Researching, designing and developing the hardware and software behind wireless communications, multimedia, portable devices and internet computing.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/engineering/electrical-computer/computer-engineering-bscompe/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/engineering/electrical-computer/computer-engineering-bscompe/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5lo0005i67mmqjpbebl',
      status: 'current',
      name: 'Mechanical Engineering',
      description: described(
        'The design, development and manufacture of machinery and devices that transmit power or convert thermal energy into mechanical form, practised with modern computer tools.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/engineering/mechanical-industrial/bsme/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/engineering/mechanical-industrial/bsme/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5mk0006i67m8nuiuodl',
      status: 'current',
      name: 'Industrial Engineering',
      description: described(
        'The design and analysis of systems of people, equipment and materials, evaluating alternatives to make the decisions that best advance an enterprise.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/engineering/mechanical-industrial/bsie/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/engineering/mechanical-industrial/bsie/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5nl0007i67mvu107ydw',
      status: 'current',
      name: 'Computer Science',
      description: described(
        'Program design, software development, computer organization, systems and networks, theory of computation, programming languages, and advanced algorithms and data.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/computer-information-science/computer-science/bscs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/computer-information-science/computer-science/bscs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5qg0008i67mobdcn6y5',
      status: 'current',
      name: 'Artificial Intelligence',
      description: described(
        'The full breadth of artificial intelligence, from classical methods to modern data-centric approaches, combining computer and data science with mathematics, statistics and probability.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/computer-information-science/data-science/artificial-intelligence-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/computer-information-science/data-science/artificial-intelligence-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5rg0009i67mhzgpnbv8',
      status: 'current',
      name: 'Business Administration',
      description: described(
        'The theory and practice of management through active learning, problem-driven research, corporate partnerships and experiential assignments, with a global and entrepreneurial outlook.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/business/business-administration-bsba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/business/business-administration-bsba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5sb000ai67mh33ehlem',
      status: 'current',
      name: 'Economics',
      description: described(
        'Economics with an emphasis on mathematical models, with room for economic development, game theory and mathematical economics, and supporting mathematics and computer science courses.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/social-sciences-humanities/economics/economics-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/social-sciences-humanities/economics/economics-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5tb000bi67mpvp3iiy1',
      status: 'current',
      name: 'Mathematics',
      description: described(
        'The degree most mathematics majors choose, recommended for those strongly interested in mathematics and science: 14 mathematics courses and two in physics.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/science/mathematics/mathematics-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/science/mathematics/mathematics-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5ub000ci67mwhuqj8j7',
      status: 'current',
      name: 'Physics',
      description: described(
        'A strong foundation in classical and modern physics: electromagnetism, dynamics, the building blocks of matter, energy and radiation.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.northeastern.edu/undergraduate/science/physics/physics-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/science/physics/physics-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5vb000di67mrq0h53z7',
      status: 'current',
      name: 'Chemistry',
      description: described(
        'Breadth and depth in chemistry fundamentals, quantitative problem-solving, communication skills and laboratory experience.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/science/chemistry-chemical-biology/chemistry-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/science/chemistry-chemical-biology/chemistry-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5wa000ei67mtslujijh',
      status: 'current',
      name: 'Biology',
      description: described(
        'Life from molecules and cells through organs to populations, ecosystems and evolution, on a groundwork of mathematics, chemistry and physics.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.northeastern.edu/undergraduate/science/biology/biology-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/science/biology/biology-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5xc000fi67mdt8atwnz',
      status: 'current',
      name: 'Behavioral Neuroscience',
      description: described(
        'The biological bases of behaviour in health and disease, combining biology and psychology with the physical sciences and mathematics to understand how physiological systems control behaviour.'
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/science/interdisciplinary/behavioral-neuroscience-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/science/interdisciplinary/behavioral-neuroscience-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5ya000gi67mogqrogjs',
      status: 'current',
      name: 'Nursing',
      description: described(
        'The Bachelor of Science in Nursing: 130 credits of intensive, sequential classes and clinical work, close to nursing faculty, building the core skills of a nursing career.'
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.northeastern.edu/undergraduate/health-sciences/nursing/bsn/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/health-sciences/nursing/bsn/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq5z9000hi67mvtz8kodw',
      status: 'current',
      name: 'Political Science',
      description: described(
        'American government, comparative politics, international relations and political philosophy, through introductory and methods courses, electives and a capstone.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/social-sciences-humanities/political-science/political-science-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/social-sciences-humanities/political-science/political-science-ba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq604000ii67moo5al21e',
      status: 'current',
      name: 'Psychology',
      description: described(
        "A research-based education across basic and applied psychology, with in-depth study of the student's own interests."
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/science/psychology/psychology-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/science/psychology/psychology-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq614000ji67ml3z5njmt',
      status: 'current',
      name: 'Journalism',
      description: described(
        'The skills and experience to tell stories about a hometown, the world or an organization, for students who love to write and follow the news.'
      ),
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/arts-media-design/journalism/journalism-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/arts-media-design/journalism/journalism-ba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq621000ki67moqqm5i2i',
      status: 'current',
      name: 'Communication Studies',
      description: described(
        'The communication skills and understanding of the communication process needed in a complex, changing society: effective communication, communication theory and practice.'
      ),
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/arts-media-design/communication-studies/communication-studies-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/arts-media-design/communication-studies/communication-studies-ba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq651000li67mpdpj9rd7',
      status: 'current',
      name: 'Environmental and Sustainability Sciences',
      description: described(
        'Transdisciplinary skills for pressing environmental problems, grounded in Earth systems, ecology and sustainable development, with data management and geographic information systems.'
      ),
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/science/marine-environmental/environmental-sustainability-sciences-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/science/marine-environmental/environmental-sustainability-sciences-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      id: 'cmv2aq662000mi67m5kjlj988',
      status: 'current',
      name: 'Architecture',
      description: described(
        'A rigorous studio sequence with architecture history and building technology, to respond innovatively and conscientiously to the needs of the built environment and its inhabitants.'
      ),
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://catalog.northeastern.edu/undergraduate/arts-media-design/architecture/architecture-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.northeastern.edu/undergraduate/arts-media-design/architecture/architecture-bs/',
        ...SOURCES
      ],
      notes: NOTES
    }
  ]
}

export default refresh
