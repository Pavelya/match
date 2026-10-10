import type { RefreshFile } from '../lib/refresh'

/**
 * University of California, Los Angeles: majors added for content task 6, Part B2 (USA), under the
 * US model the owner chose on 10 October 2026 (docs/tasks/content-2027/usa-model-decision.md).
 *
 * Applicants choose a major on the UC application (the College also takes "undeclared"
 * first-years); some College majors admit to pre-major status until their prerequisites are done,
 * the Samueli School of Engineering reviews its own applicants, and Nursing and the School of the
 * Arts and Architecture review applicants in their departments. Each program below is one major,
 * chosen from the fields US-bound students pick. UC publishes no IB minimum and no subject
 * requirement for IB applicants, so every program has no minimum and no subject rows. UC's dates
 * page covers "fall 2027 applicants", so all are stamped 2027.
 *
 * Program pages are the UCLA General Catalog's 2026 major pages; each description follows the
 * catalog's description of the major.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-california-los-angeles
 */

/** Read on 9 and 10 October 2026, after each program's own page. */
const SOURCES = [
  'https://admission.universityofcalifornia.edu/admission-requirements/international-applicants/applying-for-admission/freshman-requirements-country.html',
  'https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/dates-and-deadlines.html',
  'https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/filling-out-the-application.html',
  'https://admission.ucla.edu/apply/majors',
  'https://apb.ucla.edu/campus-statistics/common-data-set-undergraduate-profile'
]

const NOTES =
  'Content 6 (Part B2, 10 October 2026): new, under the US model (owner, 10 October 2026). UC publishes no IB minimum: international applicants "must complete secondary school and be eligible to enter a competitive university in their country", predicted IB scores are reported if the school releases them, and "UC campuses do not use predicted scores as the only factor for admission"; UC "will not consider SAT or ACT test scores". So minIBPoints is null and there are no subject rows (checked, none required). Stamped 2027: UC\'s dates page names "fall 2027 applicants". The "How competitive" paragraph is from UCLA\'s Common Data Set 2025-2026, C1 (fall 2025: 145,086 applied, 13,659 admitted; no international breakdown); update it at each refresh.'

/** The description's last paragraph (data conventions: "How competitive"). */
const HOW_COMPETITIVE =
  'How competitive: for fall 2025, UCLA admitted 9.4% of its 145,086 first-year applicants; it publishes no separate figure for international applicants. UC sets no IB minimum and no subject requirement: international applicants must finish secondary school and be eligible for a competitive university at home, predicted IB scores are never the only factor, and SAT or ACT scores are not considered. You apply to this major on the UC application.'

/** A program's description, ending with the "How competitive" paragraph. */
const described = (text: string, extra = '') => `${text}\n\n${HOW_COMPETITIVE}${extra}`

const refresh: RefreshFile = {
  university: 'University of California, Los Angeles',
  entryYear: 2027,
  checkedOn: '2026-10-10',
  programs: [
    {
      status: 'new',
      name: 'Aerospace Engineering',
      description: described(
        'The design and construction of fixed-wing and rotary-wing aircraft for air transportation and defence, and of spacecraft for the exploration and use of space, with the technologies around them.',
        ' Applications to the Samueli School of Engineering are reviewed by the School.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/AerospaceEngineeringBS',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/AerospaceEngineeringBS', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Bioengineering',
      description: described(
        "The Samueli School of Engineering's bioengineering degree, accredited by the Engineering Accreditation Commission of ABET, applying engineering to biology and medicine.",
        ' Applications to the Samueli School of Engineering are reviewed by the School.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/BioengineeringBS',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/BioengineeringBS', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Chemical Engineering',
      description: described(
        'A professionally oriented education in modern chemical engineering, with options in biomedical, biomolecular, environmental and semiconductor manufacturing engineering.',
        ' Applications to the Samueli School of Engineering are reviewed by the School.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/ChemicalEngineeringBS',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/ChemicalEngineeringBS', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Civil Engineering',
      description: described(
        "The Samueli School of Engineering's civil engineering degree, accredited by the Engineering Accreditation Commission of ABET.",
        ' Applications to the Samueli School of Engineering are reviewed by the School.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/CivilEngineeringBS',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/CivilEngineeringBS', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Electrical Engineering',
      description: described(
        'Preparation in mathematics and science leading to the fundamentals of the three areas of electrical engineering: signals and systems, circuits and embedded systems, and physical wave electronics.',
        ' Applications to the Samueli School of Engineering are reviewed by the School.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/ElectricalEngineeringBS',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.registrar.ucla.edu/major/2026/ElectricalEngineeringBS',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Mechanical Engineering',
      description: described(
        'Basic knowledge in thermodynamics, fluid mechanics, heat transfer, solid mechanics, mechanical design, dynamics, control, mechanical systems, manufacturing and materials; the program is ABET-accredited.',
        ' Applications to the Samueli School of Engineering are reviewed by the School.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/MechanicalEngineeringBS',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.registrar.ucla.edu/major/2026/MechanicalEngineeringBS',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Computer Science',
      description: described(
        'Professional preparation in computer science for students not necessarily interested in computer hardware: computer science courses, a minor or technical support area, and a core from the social sciences, life sciences and humanities.',
        ' Applications to the Samueli School of Engineering are reviewed by the School.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/ComputerScienceBS',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/ComputerScienceBS', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Computer Science and Engineering',
      description: described(
        'The education to design, implement, test and use the hardware and software of digital computers and systems, spanning the Computer Science and Electrical and Computer Engineering departments.',
        ' Applications to the Samueli School of Engineering are reviewed by the School.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/ComputerScienceandEngineeringBS',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.registrar.ucla.edu/major/2026/ComputerScienceandEngineeringBS',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Mathematics',
      description: described(
        "UCLA's mathematics major, for students whose basic interest is mathematics; the College also offers applied, financial actuarial and computational mathematics majors.",
        ' You are admitted to pre-major status and join the major once you complete its prerequisites.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/MathematicsBS',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/MathematicsBS', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Statistics and Data Science',
      description: described(
        'A general introduction to the practice of statistics, with the theory for graduate research and exposure to modern techniques, for graduate study or work in industry or government.',
        ' You are admitted to pre-major status and join the major once you complete its prerequisites.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/StatisticsandDataScienceBS',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://catalog.registrar.ucla.edu/major/2026/StatisticsandDataScienceBS',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Physics',
      description: described(
        'The physics major for students who intend to continue toward a PhD in physics; the department also offers a Bachelor of Arts.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/PhysicsBS',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/PhysicsBS', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Chemistry',
      description: described(
        'The chemistry major for students who intend to pursue a career in chemistry.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/ChemistryBS',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/ChemistryBS', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Biology',
      description: described(
        'For students with a broad interest in biology: preparation for postgraduate training in medicine and the health sciences, academic and public service careers in biology, and the biological industries.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/BiologyBS',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/BiologyBS', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Neuroscience',
      description: described(
        "UCLA's interdepartmental neuroscience major in the life sciences division of the College."
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/NeuroscienceBS',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/NeuroscienceBS', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Nursing (Prelicensure)',
      description: described(
        'Prepares nurse generalists with skills in primary, secondary and tertiary prevention and care for individuals and populations, and the basis for a leadership role; students learn the art and science of nursing from current research.',
        ' The School of Nursing reviews its own applicants, for the fall quarter only.'
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/NursingBSPrelicensure',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/NursingBSPrelicensure', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Economics',
      description: described(
        "The Department of Economics' general economics major in the College's social sciences division.",
        ' You are admitted to pre-major status and join the major once you complete its prerequisites.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/EconomicsBA',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/EconomicsBA', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Business Economics',
      description: described(
        'Economics with a business orientation: not a business school curriculum, but a focused one guided by the logic and integrative perspective of economics, preparing students for graduate study and business careers.',
        ' You are admitted to pre-major status and join the major once you complete its prerequisites.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/BusinessEconomicsBA',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/BusinessEconomicsBA', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Political Science',
      description: described(
        'Basic political processes and institutions in different national and cultural contexts, relations between states, the changing relations between citizens and governments, and the values by which political systems are judged.',
        ' You are admitted to pre-major status and join the major once you complete its prerequisites.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/PoliticalScienceBA',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/PoliticalScienceBA', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Psychology',
      description: described(
        "The most general of UCLA's three psychology majors, with broad and in-depth coverage of the fundamental areas of psychology, preparing for postgraduate study or further training in law, education, government and public policy.",
        ' You are admitted to pre-major status and join the major once you complete its prerequisites.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/PsychologyBA',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/PsychologyBA', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Communication',
      description: described(
        'An interdisciplinary major on human communication at many levels of analysis, drawing on the natural and social sciences and the humanities, with four areas of focus.'
      ),
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/CommunicationBA',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/CommunicationBA', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Environmental Science',
      description: described(
        'A collaboration of the Institute of the Environment and Sustainability with the departments of atmospheric and oceanic sciences, civil and environmental engineering, earth and space sciences, ecology and evolutionary biology, environmental health sciences and geography.'
      ),
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/EnvironmentalScienceBS',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/EnvironmentalScienceBS', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Architectural Studies',
      description: described(
        'A program on the built environment that treats architecture as a cultural, creative and technical practice with direct social impact, with architecture and urban design courses from the history and theory of design to studio work.',
        ' The School of the Arts and Architecture admits for the fall quarter only, with a supplementary application reviewed by the department.'
      ),
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/ArchitecturalStudiesBA',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/ArchitecturalStudiesBA', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'English',
      description: described(
        "The Department of English's major: students plan, with its counsellors and faculty adviser, a course of study in literature that fits their interests and the degree's requirements."
      ),
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://catalog.registrar.ucla.edu/major/2026/EnglishBA',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://catalog.registrar.ucla.edu/major/2026/EnglishBA', ...SOURCES],
      notes: NOTES
    }
  ]
}

export default refresh
