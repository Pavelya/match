import type { RefreshFile } from '../lib/refresh'

/**
 * Reichman University: the undergraduate programmes of its Raphael Recanati International School
 * (RRIS), taught entirely in English, added for content task 5.2 and created, with the university, on 6 October 2026. The application and admissions
 * regulations published are for 2026-27 (applications 1 November 2025 to 15 July 2026), so nine are
 * stamped 2026; the ClimateTech double major, whose page names 2027-28 as its first intake, is
 * stamped 2027. Reichman's web pages answer scripts with an empty 247 status; WebFetch reads them
 * and the PDFs download.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts reichman-university
 */

const BASE = 'https://www.runi.ac.il/en/schools/rris/undergraduate'
const REGULATIONS =
  'https://www.runi.ac.il/media/gplfunwu/ba-application-and-admissions-regulations-2026-27.pdf'
const BROCHURE = 'https://www.runi.ac.il/media/mfodft2k/ba-brochure-2026-27.pdf'
const APPLY =
  'https://www.runi.ac.il/en/schools/rris/admissions/undergraduate-admissions/what-you-need-in-order-to-apply/'

const RULE =
  'RRIS application and admissions regulations, undergraduate degrees 2026-27: admission "is based on the level of the candidate\'s achievements", from high school grades, standardized test scores where applicable (test-optional in 2026-27 for U.S. and Israeli high schools), letters of recommendation, a CV and a personal essay; the committee may interview, and an applicant below a programme\'s threshold is offered other options. No IB points figure or subject is published, so 24, the Diploma; checked, none required. No Psychometric test is needed. English: graduates of schools not taught in English take a proficiency exam (TOEFL, IELTS, PTE, Cambridge, AMIRNET), placed in four levels; an IB score of 6 at HL in English gives exemption. One programme per application.'
const STAMP_2026 =
  'The 2026-27 regulations are the latest published (2027-28 applications are expected from 1 November 2026), so stamped 2026.'
const BUSINESS_MATHS =
  'Admitted students may be required to take a preparatory mathematics course for business before the year starts (their acceptance letter says).'
const CS_MATHS =
  'Computer Science applicants submit a math evaluation form; admitted students take an online mathematics refresher and must pass a preparatory mathematics course for computer science, with an exam in September.'

const refresh: RefreshFile = {
  university: 'Reichman University',
  entryYear: 2027,
  checkedOn: '2026-10-05',
  programs: [
    {
      id: 'cmuw8agi4002a047m0m5i6kzi',
      status: 'current',
      name: 'Business Administration',
      description:
        "Reichman's BA in Business Administration, taught entirely in English at the Raphael Recanati International School in Herzliya, prepares students for managerial and entrepreneurial roles. The first year covers mathematics, statistics, economics and business law; the second adds accounting, organisational management and corporate social responsibility; and in the third students specialise in marketing, finance, digital innovation or entrepreneurship.\n\nThe programme includes hands-on workshops, seminars with leading companies, a practicum internship and the chance to apply for a fourth-year exchange with partner universities.",
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/business-administration/`,
      requirements: [],
      checkedFor: 2026,
      sources: [`${BASE}/business-administration/`, REGULATIONS, BROCHURE, APPLY],
      notes: `Content 5.2: new. ${RULE} ${BUSINESS_MATHS} ${STAMP_2026} About 120 credits over six semesters.`
    },
    {
      id: 'cmuw8agj0002b047mh9v0skoh',
      status: 'current',
      name: 'Government',
      description:
        "Reichman's BA in Government, taught in English at the Raphael Recanati International School, prepares students for careers in public policy, diplomacy, foreign policy, and strategy and security. It combines theory with practical tools through workshops, simulations, internships and meetings with public figures, and students specialise in security studies and counter-terrorism, diplomacy and global affairs, or the contemporary Middle East.\n\nIn the third year students can add a business or a media and influence cluster.",
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/ba-government/`,
      requirements: [],
      checkedFor: 2026,
      sources: [`${BASE}/ba-government/`, REGULATIONS, BROCHURE, APPLY],
      notes: `Content 5.2: new. ${RULE} ${STAMP_2026} 120 credits over three years.`
    },
    {
      id: 'cmuw8agjz002c047mzgxo7iw8',
      status: 'current',
      name: 'Communication',
      description:
        "Reichman's BA in Communication, taught in English at the Sammy Ofer School of Communications, looks at how information, technology and people connect, from fake news and AI tools to virtual reality, product design and campaign effectiveness. After the first year students follow one specialisation or combine two: human-computer interaction, for product roles in high tech; marketing communication; or content for impact, for journalism and media.\n\nStudents use TV and radio studios, a newsroom, post-production facilities and VR labs, and internships begin in the second year.",
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/ba-communications/`,
      requirements: [],
      checkedFor: 2026,
      sources: [`${BASE}/ba-communications/`, REGULATIONS, BROCHURE, APPLY],
      notes: `Content 5.2: new. ${RULE} ${STAMP_2026}`
    },
    {
      id: 'cmuw8agkv002d047ma7h2eqn1',
      status: 'current',
      name: 'Psychology',
      description:
        "Reichman's BA in Psychology, taught in English, treats psychology both as a science and as a profession, combining theory with practical fieldwork. Students cover clinical and social psychology, neuroscience and criminology, with statistics and research methods, in small classes and research laboratories; an honours programme and the Brain and Mind neuroscience programme are open to strong students.\n\nThe degree is recognised for admission to graduate studies.",
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/ba-psychology/`,
      requirements: [],
      checkedFor: 2026,
      sources: [`${BASE}/ba-psychology/`, REGULATIONS, BROCHURE, APPLY],
      notes: `Content 5.2: new. ${RULE} ${STAMP_2026} 121 credits over six semesters.`
    },
    {
      id: 'cmuw8aglq002e047m7wxfoxu7',
      status: 'current',
      name: 'Business Administration and Economics (double major)',
      description:
        "This English-taught double major at Reichman gives a multi-dimensional understanding of the global economy and business, with the quantitative and analytical skills to work in the private and public sectors. Coursework spans finance, data analytics, economics and management, with hands-on workshops and seminars with leading companies.\n\nIt is designed for candidates with strong quantitative skills; strong students can join an accelerated track to a master's in financial economics within four years.",
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/business-and-economics/`,
      requirements: [],
      checkedFor: 2026,
      sources: [`${BASE}/business-and-economics/`, REGULATIONS, BROCHURE, APPLY],
      notes: `Content 5.2: new. ${RULE} ${BUSINESS_MATHS} ${STAMP_2026}`
    },
    {
      id: 'cmuw8agmm002f047mmj60s9tp',
      status: 'current',
      name: 'Computer Science',
      description:
        "Reichman's BSc in Computer Science, taught in English, combines a rigorous foundation in mathematics, computer science theory and practical software development. Students take calculus, linear algebra and discrete mathematics alongside algorithms, operating systems and machine learning, with electives such as cybersecurity, deep learning and computer graphics, and courses in business and entrepreneurship.\n\nAdmitted students take a mathematics refresher and a preparatory mathematics course before the first year.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/bsc-computer-science/`,
      requirements: [],
      checkedFor: 2026,
      sources: [`${BASE}/bsc-computer-science/`, REGULATIONS, BROCHURE, APPLY],
      notes: `Content 5.2: new. ${RULE} ${CS_MATHS} ${STAMP_2026} 126 credits over six semesters.`
    },
    {
      id: 'cmuw8agpy002g047muaz1stq2',
      status: 'current',
      name: 'Entrepreneurship and Business Administration (double major)',
      description:
        'This English-taught double major at Reichman, the first of its kind in Israel, follows the stages of the entrepreneurial process: identifying an opportunity, defining resources, building a business model and growing a venture. Students work in teams from idea to implementation, building prototypes of technology products and business plans, alongside business courses in marketing, finance, accounting, management and economics.\n\nIt is designed for candidates with strong quantitative and analytical skills.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/entrepreneurship-and-business/`,
      requirements: [],
      checkedFor: 2026,
      sources: [`${BASE}/entrepreneurship-and-business/`, REGULATIONS, BROCHURE, APPLY],
      notes: `Content 5.2: new. ${RULE} ${BUSINESS_MATHS} ${STAMP_2026} 120 credits over six semesters.`
    },
    {
      id: 'cmuw8agqv002h047mfsj4zy3z',
      status: 'current',
      name: 'Entrepreneurship and Computer Science (double major)',
      description:
        'This English-taught double major at Reichman awards a BA in Entrepreneurship and a BSc in Computer Science. Students build real ventures from idea to working prototype with mentors from industry, while mastering mathematics, algorithms, data structures, complexity theory, machine learning and software development, and business courses in financial management, marketing and the legal side of new ventures.\n\nAdmitted students take a mathematics refresher and a preparatory mathematics course before the first year.',
      field: 'Computer Science',
      degree: "Double Bachelor's Degree",
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/entrepreneurship-and-computer-science/`,
      requirements: [],
      checkedFor: 2026,
      sources: [`${BASE}/entrepreneurship-and-computer-science/`, REGULATIONS, BROCHURE, APPLY],
      notes: `Content 5.2: new. ${RULE} ${CS_MATHS} ${STAMP_2026} 141 credits over six semesters; BA in Entrepreneurship and BSc in Computer Science.`
    },
    {
      id: 'cmuw8agrt002i047m75oda8ui',
      status: 'current',
      name: 'Economics and Entrepreneurship with Data Science (double major)',
      description:
        'This English-taught double major at Reichman combines three parts: economic theory and policy analysis, entrepreneurship and business creation, and programming and data science tools. It aims to give a multi-dimensional understanding of the global economy and business world, with quantitative, analytical and leadership skills for any sector.\n\nIt is designed for candidates with strong quantitative and analytical skills.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/economics-and-entrepreneurship-with-data-science/`,
      requirements: [],
      checkedFor: 2026,
      sources: [
        `${BASE}/economics-and-entrepreneurship-with-data-science/`,
        REGULATIONS,
        BROCHURE,
        APPLY
      ],
      notes: `Content 5.2: new. ${RULE} ${BUSINESS_MATHS} ${STAMP_2026} 122 credits over six semesters.`
    },
    {
      id: 'cmuw8agsr002j047mpneakmf6',
      status: 'current',
      name: 'Entrepreneurship and Sustainability (ClimateTech) (double major)',
      description:
        'This new English-taught double major at Reichman, opening in 2027-28, prepares students to work where AI, energy infrastructure and climate technology meet, and to lead ventures that combine commercial opportunity with environmental impact. Students learn systems thinking and data literacy, green finance and ESG, regulation and technology-driven innovation, through courses on sustainability sectors, venture development and applied projects in renewable energy, the circular economy and climate finance.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/double-major-in-ba-entrepreneurship-sustainability-climatetech`,
      requirements: [],
      checkedFor: 2027,
      sources: [
        `${BASE}/double-major-in-ba-entrepreneurship-sustainability-climatetech`,
        `${BASE}`,
        REGULATIONS,
        APPLY
      ],
      notes: `Content 5.2: new. The programme page names 2027-28 as the first intake, so stamped 2027; it is not yet in the 2026-27 regulations, whose RRIS-wide rules are assumed. ${RULE} Bachelor of Arts in Entrepreneurship and Sustainability (ClimateTech).`
    }
  ]
}

export default refresh
