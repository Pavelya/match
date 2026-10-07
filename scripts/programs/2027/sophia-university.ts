import type { RefreshFile } from '../lib/refresh'

/**
 * Sophia University: its English-taught undergraduate programmes, added for content task 5.2 and created, with the university, on 6 October 2026.
 * The application procedure booklets for 2027 entry (published May to July 2026) give the rules and
 * schedules, so all eight are stamped 2027. Green Science and Green Engineering took their last
 * students in autumn 2026; the Department of Digital Green Technology replaces them from April 2027.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts sophia-university
 */

const ADMISSIONS = 'https://adm.sophia.ac.jp/eng/admissions/ug_p/en_ug/'
const NEWS_2027 =
  'https://adm.sophia.ac.jp/eng/news/english-taught/2027-intake-admission-inform-all-english-taught-programs-now-available/'
const FLA = 'https://adm.sophia.ac.jp/eng/admissions/ug_p/en_ug/fla/w_h/'
const FLA_BOOKLET =
  'https://adm.sophia.ac.jp/assets/uploads/sites/2/2026/06/03f35ed5ff1d1382e4ff273b1a97f0b2.pdf'
const SPSF = 'https://adm.sophia.ac.jp/eng/admissions/ug_p/en_ug/spsf/w_h/'
const SPSF_BOOKLET =
  'https://adm.sophia.ac.jp/assets/uploads/sites/2/2026/06/07c28af288f35e4dcd52d0defb0cc086.pdf'
const DGTECH = 'https://adm.sophia.ac.jp/eng/admissions/ug_p/en_ug/dgtech/w_h/'
const DGTECH_BOOKLET =
  'https://adm.sophia.ac.jp/assets/uploads/sites/2/2026/07/2027_DGTech_Application-Procedure.pdf'

const IB =
  'Standardized tests: SAT, ACT, the IB Diploma or three GCE A levels. Sophia requires the full IB Diploma (six subjects; the IB Certificate is not acceptable); candidates apply with predicted grades on its form and get a conditional offer. No IB points figure is published and screening is holistic (documents, essays, recommendation letters, test scores), so 24, the Diploma.'
const SPSF_RULE = `Content 5.2: new. SPSF application procedure booklet, Autumn 2027 (September entry only, 21 September 2027): two application periods, 11 November to 4 December 2026 (results 5 February 2027) and 10 to 31 March 2027 (results 4 June 2027); each department admits a limited number. ${IB} Checked, none required: no subject is named. Applicants specify the department when applying (two recommendation letters cover several departments). Stamped 2027.`
const SPSF_INTRO =
  "The Sophia Program for Sustainable Futures (SPSF) teaches bachelor's degrees in English in Tokyo, built around global issues such as conflict, economic disparity, poverty, the environment and education that the UN's Sustainable Development Goals ask the world to tackle. Students take discipline-based classes in their own department alongside interdisciplinary and cross-listed classes from the others, all on Sophia's single campus in central Tokyo."
const SPSF_OUTRO =
  'SPSF admits in September only, on a review of application documents (essays, recommendation letters and test scores such as the IB Diploma), with no Japanese required.'

const refresh: RefreshFile = {
  university: 'Sophia University',
  entryYear: 2027,
  checkedOn: '2026-10-05',
  programs: [
    {
      id: 'cmuw8aezx0010047m3597auz6',
      status: 'current',
      name: 'Liberal Arts',
      description:
        "Sophia's Faculty of Liberal Arts has taught an international liberal arts education in English in Tokyo for more than fifty years. Students begin with the Core Program's training in critical thinking and writing, then choose one of three majors: Comparative Culture, Social Studies, or International Business and Economics. The faculty also hosts many exchange students each semester.\n\nIt admits in April and September on a review of application documents, with no Japanese required.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: FLA,
      requirements: [],
      checkedFor: 2027,
      sources: [FLA, FLA_BOOKLET, ADMISSIONS, NEWS_2027, 'https://fla.sophia.ac.jp/'],
      notes: `Content 5.2: new. FLA application procedure booklet, Spring and Autumn 2027 (published May 2026): enrolment 1 April or 21 September 2027; 60 places in spring (up to 46 more through recommendation-based admissions) and 80 in autumn. ${IB} Checked, none required: no subject is named. Stamped 2027. B.A. in Liberal Arts.`
    },
    {
      id: 'cmuw8af2v0011047mzuppbe8s',
      status: 'current',
      name: 'Journalism (SPSF)',
      description: `${SPSF_INTRO} The Department of Journalism, in the Faculty of Humanities, awards a BA in Journalism.\n\n${SPSF_OUTRO}`,
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: SPSF,
      requirements: [],
      checkedFor: 2027,
      sources: [SPSF, SPSF_BOOKLET, ADMISSIONS, NEWS_2027],
      notes: `${SPSF_RULE} BA in Journalism.`
    },
    {
      id: 'cmuw8af3r0012047mi6i7fkkn',
      status: 'current',
      name: 'Education (SPSF)',
      description: `${SPSF_INTRO} The Department of Education, in the Faculty of Human Sciences, awards a BA in Education.\n\n${SPSF_OUTRO}`,
      field: 'Education',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: SPSF,
      requirements: [],
      checkedFor: 2027,
      sources: [SPSF, SPSF_BOOKLET, ADMISSIONS, NEWS_2027],
      notes: `${SPSF_RULE} BA in Education.`
    },
    {
      id: 'cmuw8af4q0013047meuoseg00',
      status: 'current',
      name: 'Sociology (SPSF)',
      description: `${SPSF_INTRO} The Department of Sociology, in the Faculty of Human Sciences, awards a BA in Sociology.\n\n${SPSF_OUTRO}`,
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: SPSF,
      requirements: [],
      checkedFor: 2027,
      sources: [SPSF, SPSF_BOOKLET, ADMISSIONS, NEWS_2027],
      notes: `${SPSF_RULE} BA in Sociology.`
    },
    {
      id: 'cmuw8af5n0014047meek9g9eb',
      status: 'current',
      name: 'Economics (SPSF)',
      description: `${SPSF_INTRO} The Department of Economics, in the Faculty of Economics, awards a BA in Economics.\n\n${SPSF_OUTRO}`,
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: SPSF,
      requirements: [],
      checkedFor: 2027,
      sources: [SPSF, SPSF_BOOKLET, ADMISSIONS, NEWS_2027],
      notes: `${SPSF_RULE} BA in Economics.`
    },
    {
      id: 'cmuw8af6m0015047m19fzs6ws',
      status: 'current',
      name: 'Management (SPSF)',
      description: `${SPSF_INTRO} The Department of Management, in the Faculty of Economics, awards a BA in Management.\n\n${SPSF_OUTRO}`,
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: SPSF,
      requirements: [],
      checkedFor: 2027,
      sources: [SPSF, SPSF_BOOKLET, ADMISSIONS, NEWS_2027],
      notes: `${SPSF_RULE} BA in Management.`
    },
    {
      id: 'cmuw8af7k0016047mon13cazq',
      status: 'current',
      name: 'Global Studies: International Relations or Area Studies (SPSF)',
      description: `${SPSF_INTRO} The Department of Global Studies, in the Faculty of Global Studies, awards a BA in International Relations or a BA in Area Studies; students choose between them in their second year.\n\n${SPSF_OUTRO}`,
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: SPSF,
      requirements: [],
      checkedFor: 2027,
      sources: [SPSF, SPSF_BOOKLET, ADMISSIONS, NEWS_2027],
      notes: `${SPSF_RULE} BA in International Relations or BA in Area Studies, the major chosen in the sophomore year; stored as one program, as applicants apply to the department.`
    },
    {
      id: 'cmuw8af9d0017047m7q2qvc4r',
      status: 'current',
      name: 'Digital Green Technology',
      description:
        "Sophia's Department of Digital Green Technology (DGTech), opening in April 2027 in the Faculty of Science and Technology, teaches engineering in English with data science and digital technologies at its core. Students build a foundation in data science and programming, machine learning and AI, then study electrical and mechanical engineering, biology and chemistry, and finally green transformation technologies for problems such as carbon neutrality, resource recycling and biodiversity.\n\nClasses are small, about half of each intake is expected to be international, and the department admits in April and September on a review of application documents.",
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: DGTECH,
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        DGTECH,
        DGTECH_BOOKLET,
        'https://adm.sophia.ac.jp/eng/admissions/ug_p/en_ug/dgtech/overview/',
        'https://adm.sophia.ac.jp/eng/admissions/ug_p/en_ug/dgtech/number/',
        NEWS_2027
      ],
      notes:
        'Content 5.2: new. DGTech application procedure booklet, Spring and Autumn 2027: at most 13 places in spring (up to 12 more through recommendation-based admissions) and 25 in autumn; no transfer entry. To apply with the IB, the full Diploma must include Maths AA or AI at HL and at least one of Physics, Chemistry or Biology at HL ("Only HL subjects are accepted. SL of Math AA/AI cannot be used as a substitute"), so both are critical; no grade is named, so 4. SAT, ACT, EJU or A levels with maths and a science can be used instead of the IB. No IB points figure, so 24, the Diploma. The establishment plan was "under application for approval" when the 2027 information was published (May 2026). Stamped 2027. Bachelor of Engineering in Digital Green Technology.'
    }
  ]
}

export default refresh
