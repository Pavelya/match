import type { RefreshFile } from '../lib/refresh'

/**
 * Waseda University: its English-based undergraduate programmes, added for content task 5.2.
 * Every school's page gives its September 2027 schedule, so all ten are stamped 2027.
 *
 * Waseda's PDFs (application guides, the list of application documents, the admission statistics)
 * answer scripts and WebFetch with a Cloudflare challenge; its HTML pages answer curl. The IB rules
 * come from the undergraduate FAQ and from the September 2026 list of application documents
 * (Internet Archive copy of 10 July 2026); the 2027 list is linked from every school's page but
 * could not be read. No school requires Japanese.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts waseda-university
 */

const FAQ = 'https://www.waseda.jp/inst/admission/en/undergraduate/faq/'
const EDP = 'https://www.waseda.jp/inst/admission/en/undergraduate/english/'
const DOCUMENTS =
  'https://web.archive.org/web/20260710013547/https://www.waseda.jp/inst/admission/assets/uploads/2025/08/List-of-Application-documents-by-Education-System-AY202609.pdf'
const PSE = 'https://www.waseda.jp/fpse/pse/en/applicants/admissions/'
const PSE_DEGREES = 'https://www.waseda.jp/fpse/pse/en/about/degrees/'
const FSCI = 'https://www.waseda.jp/fsci/en/admissions_us/'
const FSCI_FAQ = 'https://www.waseda.jp/fsci/en/admissions_us/admissions_us/'
const FSCI_EB = 'https://www.waseda.jp/fsci/en/about/education/english-based/'
const AVERAGES_2024 =
  'https://www.waseda.jp/inst/admission/assets/uploads/2024/08/f5e03c87bf93da7194ebc7f936ba2887.pdf'

const IB =
  'IB rule (list of application documents, September 2026 entry): final or predicted IBDP grades in at least six subjects, three or more at HL, in the Diploma Programme (not the Certificate), sent by the IB to Waseda (code 00549). Waseda has no minimum standardized test score, English score or GPA and screens the whole application, so 24, the Diploma. English: no test is needed with an IB taught entirely in English.'
const NO_SUBJECT = 'Checked, none required: the FAQ lists no subject requirement for this school.'
const MATHS =
  'Mathematics is required (FAQ: "Math is required at: School of Political Science and Economics"); SL or HL, Maths AA or AI. No grade is named, so 4. The FAQ says an applicant missing a required subject can still apply, so not critical.'
const SCIENCE =
  'The IBDP must include Mathematics, Physics and Chemistry, at SL or HL (Maths AA or AI). No grade is named, so 4. The faculty FAQ says an applicant can apply without one of Physics or Chemistry, at a disadvantage, so none is critical.'
const PSE_2027 =
  "SPSE's admissions page gives the September 2027 timeline (online application 7-28 January 2027, results 22 April 2027, enrolment 21 September 2027), so stamped 2027. Holistic screening of documents, an interview only if needed. Quota: 100 for the school's English-based programme (FAQ); applicants choose one of its three degrees when applying."
const PSE_COMPETITIVE =
  "How competitive: in 2026, 218 of 994 applicants to the school's English-based programme were admitted, and those admitted averaged 38.9 IB points out of 42 (predicted grades included, the core not counted). Waseda sets no minimum score and decides on the whole application."
const PSE_NOTE = `The description's last paragraph, "How competitive", gives SPSE's 2026 figures (its admissions page); update it at each refresh.`
const FSCI_2027 =
  "The Faculty of Science and Engineering's admissions page gives the September 2027 schedule (application 7-28 January 2027, document screening results 9 April, interview 17 or 18 April, final results 23 April 2027), so stamped 2027. Document screening, then an interview. Applicants may apply to only one major in the faculty."
const FSCI_COMPETITIVE =
  "How competitive: applicants admitted to Waseda's English-based science and engineering programmes in 2022-2024 averaged 38.1 IB points out of 42. Waseda sets no minimum score; each school admits about 30 students a year after a document screening and an interview."
const FSCI_NOTE = `The description's last paragraph, "How competitive", gives the 2022-2024 average from the international admissions office's "Average Scores of Successful Applicants" (2024), read through the search index because Waseda's PDFs refuse scripts; the faculty's 2026 figures (Average-standardized-test-scores-of-successful-applicants2026.pdf) could not be read. Update it at each refresh.`

const refresh: RefreshFile = {
  university: 'Waseda University',
  entryYear: 2027,
  checkedOn: '2026-10-05',
  programs: [
    {
      status: 'new',
      name: 'Political Science',
      description: `Waseda's School of Political Science and Economics teaches a BA in Political Science entirely in English in Tokyo. The degree promotes the scientific understanding of politics, from cooperation and conflict in local communities to disputes between states, and requires courses in analytical and quantitative methods. Students build a broad foundation over the first two years and then usually specialise in a subfield.\n\nThe English-based programme admits in September only, on a holistic review of the application documents, and no Japanese is required.\n\n${PSE_COMPETITIVE}`,
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: PSE,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }],
      checkedFor: 2027,
      sources: [PSE, PSE_DEGREES, EDP, FAQ, DOCUMENTS],
      notes: `Content 5.2: new. ${IB} ${MATHS} ${PSE_2027} B.A. in Political Science. ${PSE_NOTE}`
    },
    {
      status: 'new',
      name: 'Economics',
      description: `Waseda's School of Political Science and Economics teaches a BA in Economics entirely in English in Tokyo. It combines solid theoretical foundations with the collection and analysis of empirical data, building quantitative skills through microeconomics, macroeconomics, game theory and econometrics, and offers specialised courses that apply them to real policy issues. The school runs one of the largest laboratories for experimental economics in Asia.\n\nThe English-based programme admits in September only, on a holistic review of the application documents, and no Japanese is required.\n\n${PSE_COMPETITIVE}`,
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: PSE,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }],
      checkedFor: 2027,
      sources: [PSE, PSE_DEGREES, EDP, FAQ, DOCUMENTS],
      notes: `Content 5.2: new. ${IB} ${MATHS} ${PSE_2027} B.A. in Economics. ${PSE_NOTE}`
    },
    {
      status: 'new',
      name: 'Global Political Economy',
      description: `Waseda's School of Political Science and Economics teaches a BA in Global Political Economy entirely in English in Tokyo. The degree draws on both political science and economics, grounding students in theory and evidence from the two disciplines so they can analyse today's complex, interconnected world without the boundaries of either.\n\nThe English-based programme admits in September only, on a holistic review of the application documents, and no Japanese is required.\n\n${PSE_COMPETITIVE}`,
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: PSE,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }],
      checkedFor: 2027,
      sources: [PSE, PSE_DEGREES, EDP, FAQ, DOCUMENTS],
      notes: `Content 5.2: new. ${IB} ${MATHS} ${PSE_2027} B.A. in Global Political Economy. ${PSE_NOTE}`
    },
    {
      status: 'new',
      name: 'Transnational and Interdisciplinary Studies in Social Innovation (TAISI)',
      description:
        'TAISI is the English-based degree programme of Waseda\'s School of Social Sciences, training "social innovators". Students take foundation courses in economics, politics, humanities, history, marketing and law, then specialise in one of four fields: peace building and international cooperation, community and social development, social organization and working, or economic and environmental sustainability. Fieldwork and workshops with local governments and organisations apply classroom theory, and the programme looks at domestic and international issues from a Japanese perspective.\n\nHow competitive: in 2026, 119 of 405 applicants were admitted, and those admitted averaged 36.8 IB points out of 42 (without bonus points). Waseda sets no minimum score and decides on the whole application.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: 'https://www.waseda.jp/fsss/sss/en/applicants/admission/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.waseda.jp/fsss/sss/en/applicants/admission/',
        'https://www.waseda.jp/fsss/sss/en/about/curriculum/',
        FAQ,
        DOCUMENTS
      ],
      notes: `Content 5.2: new. ${IB} ${NO_SUBJECT} The school's admissions page links the "Application Guide for TAISI Admission September 2027 Entry", so stamped 2027. 60 places; document screening, with an online interview if needed. Bachelor of Arts in Social Sciences. The description's last paragraph, "How competitive", gives the 2026 figures from that page; update it at each refresh.`
    },
    {
      status: 'new',
      name: 'International Liberal Studies',
      description:
        "Waseda's School of International Liberal Studies (SILS), founded in 2004, teaches a liberal arts degree in English to a student body from many countries. Students take courses across a wide range of academic fields, study abroad, and pursue interdisciplinary questions about a globalising world, with the aim of living and working in a multicultural society.\n\nSILS admits in September and, for applicants from overseas, in April, on a holistic review of the application documents.\n\nHow competitive: for September 2026 entry, 315 of 1,322 applicants were admitted, and SILS's admitted applicants average 37.5 IB points out of 42. SILS has no minimum score and decides on the whole application.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: 'https://www.waseda.jp/fire/sils/en/applicants/admission/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.waseda.jp/fire/sils/en/applicants/admission/',
        'https://www.waseda.jp/fire/sils/en/applicants/data/',
        'https://www.waseda.jp/fire/sils/en/about/overview/',
        FAQ,
        DOCUMENTS
      ],
      notes: `Content 5.2: new. ${IB} ${NO_SUBJECT} SILS's admissions page gives the 2027 AO September Entry schedule (early application 7-12 January 2027, regular to 28 January 2027) and the 2027 AO April Entry (Overseas) one, so stamped 2027. Quotas: 150 in September, 100 in April. Bachelor's degree in International Liberal Studies. The description's last paragraph, "How competitive", gives the September 2026 applicants and admitted from SILS's data page, and the IBDP average it publishes (undated, beside the 2024-2026 tables); update it at each refresh.`
    },
    {
      status: 'new',
      name: 'Global Studies in Japanese Cultures Program (JCulP)',
      description:
        "JCulP is the English-based programme of Waseda's School of Culture, Media and Society, focused on research into Japanese culture in all its diversity and on Japanese literature. Japanese and overseas students study together in Tokyo and take part in cultural exchange through their research; overseas students also take Japanese language courses.\n\nHow competitive: for 2026 entry, 23 of 162 applicants in the overseas students category were admitted, and they averaged 36.4 IB points out of 42. Waseda sets no minimum score and decides on the whole application.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: 'https://www.waseda.jp/flas/cms/en/applicants-2/admission/jculp/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.waseda.jp/flas/cms/en/applicants-2/admission/',
        'https://www.waseda.jp/flas/cms/en/applicants-2/admission/jculp/',
        FAQ,
        DOCUMENTS
      ],
      notes: `Content 5.2: new. ${IB} ${NO_SUBJECT} The school's admissions page publishes the "2027 Application Guide for Overseas Students" (24 September 2026, September 2027 enrolment), so stamped 2027. Quotas: 15 in September, 15 in April (April is for graduates of Japanese high schools). Bachelor of Arts. The description's last paragraph, "How competitive", gives the 2026 figures from that page; update it at each refresh.`
    },
    {
      status: 'new',
      name: 'Mathematical Sciences',
      description: `Waseda's School of Fundamental Science and Engineering teaches a major in Mathematical Sciences in English, covering algebra, geometry, analysis, statistics and numerical analysis. At the start of the fourth year students join either the Department of Mathematics or the Department of Applied Mathematics, which decides whether they graduate with a Bachelor of Science or a Bachelor of Engineering. About 70% of the faculty's students go on to graduate school.\n\n${FSCI_COMPETITIVE}`,
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: FSCI,
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: [FSCI, FSCI_FAQ, FSCI_EB, EDP, FAQ, DOCUMENTS, AVERAGES_2024],
      notes: `Content 5.2: new. ${IB} ${SCIENCE} ${FSCI_2027} 30 places in the School of Fundamental Science and Engineering. Bachelor of Science or Bachelor of Engineering, by department; stored as Bachelor of Science. ${FSCI_NOTE}`
    },
    {
      status: 'new',
      name: 'Computer Science and Communications Engineering',
      description: `Waseda's School of Fundamental Science and Engineering teaches a major in Computer Science and Communications Engineering in English, covering programming, logic circuits and computer architecture as well as information and communications technology. Graduates receive a Bachelor of Engineering, and about 70% of the faculty's students go on to graduate school.\n\n${FSCI_COMPETITIVE}`,
      field: 'Computer Science',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: FSCI,
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: [FSCI, FSCI_FAQ, FSCI_EB, EDP, FAQ, DOCUMENTS, AVERAGES_2024],
      notes: `Content 5.2: new. ${IB} ${SCIENCE} ${FSCI_2027} 30 places in the School of Fundamental Science and Engineering. Bachelor of Engineering. ${FSCI_NOTE}`
    },
    {
      status: 'new',
      name: 'Mechanical Engineering',
      description: `Waseda's School of Creative Science and Engineering teaches a major in Mechanical Engineering in English, covering both traditional mechanical engineering, such as manufacturing, and modern fields such as robotics. The school's practice-oriented teaching looks at the technological and environmental systems that support people's lives, and about 70% of the faculty's students go on to graduate school.\n\n${FSCI_COMPETITIVE}`,
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: FSCI,
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: [FSCI, FSCI_FAQ, FSCI_EB, EDP, FAQ, DOCUMENTS, AVERAGES_2024],
      notes: `Content 5.2: new. ${IB} ${SCIENCE} ${FSCI_2027} 30 places in the School of Creative Science and Engineering. Bachelor of Engineering. ${FSCI_NOTE}`
    },
    {
      status: 'new',
      name: 'Civil and Environmental Engineering',
      description: `Waseda's School of Creative Science and Engineering teaches a major in Civil and Environmental Engineering in English: how to build a better and more sustainable society through the design and construction of infrastructure. Teaching is practice-oriented, and about 70% of the faculty's students go on to graduate school.\n\n${FSCI_COMPETITIVE}`,
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: FSCI,
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: [FSCI, FSCI_FAQ, FSCI_EB, EDP, FAQ, DOCUMENTS, AVERAGES_2024],
      notes: `Content 5.2: new. ${IB} ${SCIENCE} ${FSCI_2027} 30 places in the School of Creative Science and Engineering. Bachelor of Engineering. ${FSCI_NOTE}`
    }
  ]
}

export default refresh
