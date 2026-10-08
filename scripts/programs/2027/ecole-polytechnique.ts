import type { RefreshFile } from '../lib/refresh'

/**
 * École polytechnique: its Bachelor of Science, added for content task 5.3 (France) and created, with the university, on 8 October 2026.
 *
 * Students apply to one Bachelor of Science and choose one of three double majors at the end of
 * the first year, which all students spend on a common curriculum; the three are stored as three
 * programs, as Waseda's School of Political Science and Economics was in 5.2. The admissions page
 * lists the application rounds from 17 September 2026 to 8 February 2027 and the fees page gives
 * "Annual tuition fees for 2027 intake", so all three are stamped 2027.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts ecole-polytechnique
 */

const ABOUT =
  'https://programmes.polytechnique.edu/en/bachelor/about-the-bachelor/bachelor-of-science'
const ADMISSIONS =
  'https://programmes.polytechnique.edu/en/bachelor/admissions/admissions-criteria-and-procedure'
const FAQ = 'https://programmes.polytechnique.edu/en/bachelor/admissions/faq'
const FEES = 'https://programmes.polytechnique.edu/en/bachelor/costs-and-funding/tuition-fees'
const CS =
  'https://programmes.polytechnique.edu/en/bachelor/program-details/double-major-in-mathematics-computer-science'
const ECON =
  'https://programmes.polytechnique.edu/en/bachelor/program-details/double-major-in-mathematics-economics'
const PHYSICS =
  'https://programmes.polytechnique.edu/en/bachelor/program-details/double-major-in-mathematics-physics'

const ENTRY =
  'Entry year: the admissions page gives the three rounds for the September 2027 intake (17 September to 20 October 2026, 21 October 2026 to 6 January 2027, 7 January to 8 February 2027; the page\'s heading still says "2026 intakes"), and the fees page gives "Annual tuition fees for 2027 intake are €15,900 for EU (including EEA) students and €19,600 for non-EU (non-EEA) students", so stamped 2027.'
const IB =
  'IB rule: the International Baccalaureate is a listed high school leaving certificate. No minimum grade or score: "For the moment, there are no minimum grades required to be able to apply" (FAQ), but applicants need "an overall strong academic average", so 24, the Diploma. Selection is holistic: the application (transcripts, personal statement, CV, two referees, €105 fee), then a remote interview of about 50 minutes in English for those shortlisted. Applications go through Polytechnique\'s own portal, not Campus France ("Any application to the Bachelor Program made through Campus France will not be examined"); French applicants may use Parcoursup instead. Entry to Year 1 only. English: C1, shown by IELTS 6.5, TOEFL iBT 90 or Cambridge B (176), unless the last two years of school were taught entirely in English. No French needed; B2 French is required to graduate, with classes provided.'
const SUBJECTS =
  'Subjects: the FAQ advises IB applicants to take "Mathematics Higher Level (preferably \'Analysis and Approaches\') and at least one other science course should be Higher Level", and the admissions page asks for "advanced mathematics courses, and at least one advanced science course". Stored as Maths AA or AI at HL and one of Physics, Chemistry, Biology or Computer Science at HL, grade 4 as none is named, not critical because both are phrased as expectations, not conditions.'
const COMPETITIVE =
  'No "How competitive" paragraph: Polytechnique publishes no admitted-applicant scores or cut-off.'
const MAJOR =
  'Students choose the double major at the end of the common first year, so admission is to the Bachelor, not to this major.'

const REQUIREMENTS = [
  { courses: ['MATH-AA', 'MATH-AI'], level: 'HL' as const, grade: 4, critical: false },
  { courses: ['PHYS', 'CHEM', 'BIO', 'CS'], level: 'HL' as const, grade: 4, critical: false }
]

const ADMISSION_PARAGRAPH =
  'Students apply to the Bachelor of Science and choose this double major at the end of a common first year. Selection is holistic: Polytechnique reviews the application, with transcripts, a personal statement and two references, and invites shortlisted applicants to a remote interview in English. It sets no minimum grade, but expects a strong academic record with mathematics and another science at Higher Level. No French is needed at entry; French classes are part of the programme.'

const refresh: RefreshFile = {
  university: 'École polytechnique',
  entryYear: 2027,
  checkedOn: '2026-10-08',
  programs: [
    {
      id: 'cmuzj2nt800006x7mkgj5y2v0',
      status: 'current',
      name: 'Mathematics and Computer Science',
      description: `École polytechnique's three-year Bachelor of Science is taught entirely in English on its campus in Palaiseau, south of Paris. In the Mathematics and Computer Science double major, students study the theory and practice of computation alongside advanced mathematics: object-oriented programming, the design and analysis of algorithms, logic and proofs, machine learning, computer architecture and networks, ending with a research-based bachelor thesis in the third year.\n\n${ADMISSION_PARAGRAPH}`,
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: CS,
      requirements: REQUIREMENTS,
      checkedFor: 2027,
      sources: [ADMISSIONS, FAQ, FEES, CS, ABOUT],
      notes: `Content 5.3: new. ${MAJOR} ${IB} ${SUBJECTS} ${ENTRY} ${COMPETITIVE} Field: a joint degree goes to its first-named discipline, Mathematics, which lives in Natural Sciences (8.1).`
    },
    {
      id: 'cmuzj2o1800076x7mdlkcnrk9',
      status: 'current',
      name: 'Mathematics and Economics',
      description: `École polytechnique's three-year Bachelor of Science is taught entirely in English on its campus in Palaiseau, south of Paris. The Mathematics and Economics double major takes a mathematical approach to economics: after an introduction in the first year, students take microeconomics, macroeconomics, econometrics and finance, then advanced courses such as game theory, international trade, industrial organisation and development, and write a research-based bachelor thesis in the third year.\n\n${ADMISSION_PARAGRAPH}`,
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: ECON,
      requirements: REQUIREMENTS,
      checkedFor: 2027,
      sources: [ADMISSIONS, FAQ, FEES, ECON, ABOUT],
      notes: `Content 5.3: new. ${MAJOR} ${IB} ${SUBJECTS} ${ENTRY} ${COMPETITIVE} Field: a joint degree goes to its first-named discipline, Mathematics, which lives in Natural Sciences (8.1).`
    },
    {
      id: 'cmuzj2o5s000e6x7mixofdxmk',
      status: 'current',
      name: 'Mathematics and Physics',
      description: `École polytechnique's three-year Bachelor of Science is taught entirely in English on its campus in Palaiseau, south of Paris. The Mathematics and Physics double major closely coordinates the two subjects, from mechanics, relativity, optics, electromagnetism and thermodynamics to the structure of matter, with laboratory work in Polytechnique's research centres. Students can add a minor in biology or chemistry and write a research-based bachelor thesis in the third year.\n\n${ADMISSION_PARAGRAPH}`,
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: PHYSICS,
      requirements: REQUIREMENTS,
      checkedFor: 2027,
      sources: [ADMISSIONS, FAQ, FEES, PHYSICS, ABOUT],
      notes: `Content 5.3: new. ${MAJOR} ${IB} ${SUBJECTS} ${ENTRY} ${COMPETITIVE} Field: a joint degree goes to its first-named discipline, Mathematics, which lives in Natural Sciences (8.1).`
    }
  ]
}

export default refresh
