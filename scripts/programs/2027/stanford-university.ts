import type { RefreshFile } from '../lib/refresh'

/**
 * Stanford University: majors added for content task 6, Part B2 (USA), under the US model the
 * owner chose on 10 October 2026 (docs/tasks/content-2027/usa-model-decision.md).
 *
 * Stanford admits to the university, not to a major; undergraduates must declare a major by the
 * end of their sophomore year. Each program below is one Stanford major, chosen from the fields
 * US-bound students pick, with the degree the Stanford Bulletin gives it. Stanford requires no
 * courses and sets no minimum scores, so every program has no minimum and no subject rows.
 * Stanford's first-year pages name no intake, so all are stamped 2026 (refresh rule 2).
 *
 * Program pages are the Stanford Bulletin's program pages (bulletin.stanford.edu/programs/<code>);
 * each description follows its "Program Overview".
 *
 * Dry run: npx tsx scripts/programs/refresh.ts stanford-university
 */

/** Read on 9 and 10 October 2026, after each program's own page. */
const SOURCES = [
  'https://admission.stanford.edu/apply/international/index.html',
  'https://admission.stanford.edu/apply/first-year/testing.html',
  'https://bulletin.stanford.edu/academic-polices/degree-requirements/undergraduate-major',
  'https://admission.stanford.edu/contact-us/index.html',
  'https://irds.stanford.edu/data-findings/cds'
]

const NOTES =
  'Content 6 (Part B2, 10 October 2026): new, under the US model (owner, 10 October 2026). Stanford publishes no IB minimum: "there are no courses or minimum scores required to secure admission to Stanford" (international applicants page); "ACT or SAT scores are required" (testing page, updated 31 July 2026). So minIBPoints is null and there are no subject rows (checked, none required). Admission is to Stanford: a major is declared by the end of the sophomore year (Bulletin). Stamped 2026: the first-year pages name no intake. The "How competitive" paragraph is from the Common Data Set 2025-2026, C1 (fall 2025: 60,646 applied, 2,302 admitted; no international breakdown); update it at each refresh.'

/** The description's last paragraph (data conventions: "How competitive"). */
const HOW_COMPETITIVE =
  'How competitive: for fall 2025, Stanford admitted 3.8% of its 60,646 first-year applicants; it publishes no separate figure for international applicants. It sets no IB minimum and requires no particular courses, and it requires the SAT or ACT. You apply to Stanford, not to this major: students declare a major by the end of their second year.'

/** A program's description, ending with the "How competitive" paragraph. */
const described = (text: string, extra = '') => `${text}\n\n${HOW_COMPETITIVE}${extra}`

const refresh: RefreshFile = {
  university: 'Stanford University',
  entryYear: 2027,
  checkedOn: '2026-10-10',
  programs: [
    {
      id: 'cmv2ap8pz0000cj7m5574h9rn',
      status: 'current',
      name: 'Mechanical Engineering',
      description: described(
        "Stanford's bachelor's degree in Mechanical Engineering gives a rigorous mathematical, scientific and engineering education for analysing and designing mechanical systems: materials, structures, fluid mechanics, thermodynamics, heat transfer, dynamical systems, control and design methods."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/ME-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/ME-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap8qx0001cj7mbdiuyqd4',
      status: 'current',
      name: 'Electrical Engineering',
      description: described(
        'The Electrical Engineering program gives a basic understanding of electrical engineering on a balanced foundation of physical sciences, mathematics and computing, and develops skills in designing and building systems that meet societal needs.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/EE-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/EE-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap8rw0002cj7mz7hxeouw',
      status: 'current',
      name: 'Aeronautics and Astronautics',
      description: described(
        "Stanford's bachelor's degree in Aeronautics and Astronautics Engineering educates students to design and develop aerospace systems, applying engineering fundamentals, mathematics and the physical sciences to aircraft and spacecraft."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/AA-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/AA-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap8sv0003cj7m808yhdhj',
      status: 'current',
      name: 'Chemical Engineering',
      description: described(
        'Chemical engineers conceive and design processes for producing, transforming and transporting materials, from laboratory experiments to full-scale production. The program builds the core scientific, mathematical and engineering principles behind them.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/CHEME-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/CHEME-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap8ts0004cj7m6rvp7ndx',
      status: 'current',
      name: 'Civil Engineering',
      description: described(
        "Stanford's Civil Engineering major prepares students to plan, design, construct and sustain the built environment, manage air, energy and water resources, protect the natural environment and protect society from natural and climate-related hazards."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/CE-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/CE-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap8up0005cj7m8yqb9l55',
      status: 'current',
      name: 'Bioengineering',
      description: described(
        'Bioengineering combines engineering and the life sciences to advance scientific discovery, health care and medicine, manufacturing and environmental quality: a fundamental engineering degree whose materials and toolkits are defined by living systems.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/BIOE-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/BIOE-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap8vo0006cj7md0x4uwy6',
      status: 'current',
      name: 'Materials Science and Engineering',
      description: described(
        'A foundation in the scientific and engineering principles of material structure, processing, properties and performance, for all classes of materials used in engineering systems, with focus areas from energy materials to biomaterials.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/MATSC-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/MATSC-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap8yt0007cj7mdg0bmbwd',
      status: 'current',
      name: 'Management Science and Engineering',
      description: described(
        'The fundamentals of engineering systems analysis for planning, designing and running complex economic and technical management systems: mathematical modelling, optimization, probability and statistics, organization theory, computer science and economics.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/MGTSC-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/MGTSC-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap8zr0008cj7miba0j9y7',
      status: 'current',
      name: 'Computer Science',
      description: described(
        'Breadth across computer science: its theory, abstraction, design and implementation, applied to solve problems. After core programming and mathematical foundations, students specialize in a track.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/CS-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/CS-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap90q0009cj7mn6fri3l2',
      status: 'current',
      name: 'Data Science',
      description: described(
        'An analytical and quantitative foundation for data-driven problems in science, industry and society, combining computational and inferential reasoning; sponsored by the departments of Statistics, Mathematics, Computer Science and Management Science and Engineering.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/DATSC-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/DATSC-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap91q000acj7mn9pkbeoe',
      status: 'current',
      name: 'Mathematics',
      description: described(
        'A broad understanding of mathematics (logical reasoning, generalization, abstraction and formal proof), with courses on creating, analysing and interpreting mathematical models and arguing from mathematical reasoning and careful data analysis.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/MATH-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/MATH-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap92o000bcj7mlcqgrfwv',
      status: 'current',
      name: 'Physics',
      description: described(
        'A strong foundation in classical and modern physics, quantitative problem-solving and the ability to design experiments and interpret data, through coursework and independent research.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/PHYS-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/PHYS-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap93q000ccj7mgai9cai5',
      status: 'current',
      name: 'Chemistry',
      description: described(
        'Chemistry is about the nature of matter: how to make it, measure it and model it. It holds the key to new drugs and materials and to understanding and controlling material properties.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/CHEM-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/CHEM-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap94n000dcj7m3uairhjl',
      status: 'current',
      name: 'Biology',
      description: described(
        'A strong foundation in the basic life sciences with laboratory experience, for careers in research and technical work, and for medical, dental, veterinary or graduate school.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/BIO-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/BIO-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap95j000ecj7mhn4a01u7',
      status: 'current',
      name: 'Human Biology',
      description: described(
        'An interdisciplinary approach to understanding human beings from biological, behavioural, social and cultural perspectives. After the core, each student designs an individual course of study drawing on disciplines across the university.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/HUMBI-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/HUMBI-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap96h000fcj7mhipm9yzr',
      status: 'current',
      name: 'Earth Systems',
      description: described(
        'An interdisciplinary environmental science major: students investigate environmental problems caused by human activities together with natural changes in the Earth system, drawing on natural science, social science and policy.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/EASYS-BS',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/EASYS-BS', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap97d000gcj7mssshxw3p',
      status: 'current',
      name: 'Economics',
      description: described(
        'The economic aspects of modern society: macro- and microeconomic theory, techniques for analysing contemporary economic problems, and judgment in evaluating public policy.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/ECON-BA',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/ECON-BA', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap98c000hcj7m5egwv6wn',
      status: 'current',
      name: 'Political Science',
      description: described(
        'A solid grasp of the American political system and other political systems in the context of global forces, international conflicts, social movements, ideologies and diversity, with research methods and analytical frameworks.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/POLSC-BA',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/POLSC-BA', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap999000icj7mkd0a9fqs',
      status: 'current',
      name: 'Psychology',
      description: described(
        'The theories and empirical studies of human behaviour: development, cognitive processes, emotion, decision-making, group behaviour, health, language, learning and memory, personality, social perception and more.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/PSYCH-BA',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/PSYCH-BA', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2ap9a7000jcj7ml19h5v7g',
      status: 'current',
      name: 'Communication',
      description: described(
        "A liberal arts major on communication in society from the social sciences' perspective: the field's fundamental concerns, theories and methods, and advanced work in one or both of its sub-areas."
      ),
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletin.stanford.edu/programs/COMMU-BA',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://bulletin.stanford.edu/programs/COMMU-BA', ...SOURCES],
      notes: NOTES
    }
  ]
}

export default refresh
