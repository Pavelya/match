import type { RefreshFile } from '../lib/refresh'

/**
 * Masaryk University: its full-time bachelor's programmes taught in English, added for content task
 * 5.2 and created, with the university, on 6 October 2026. Each faculty runs its own procedure. Social Studies, Economics and Administration and
 * Education publish their 2027 application windows (stamped 2027); the Faculty of Arts' pages show
 * "data from the previous admission procedure" and Science's the March 2026 exam (stamped 2026).
 * Not added: Data Analytics, taught only in the combined (part-time) form, and the long-cycle General
 * Medicine, Dentistry and Pharmacy, left for a pass over English-taught medicine in the country.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts masaryk-university
 */

const PROGRAMMES = 'https://www.muni.cz/en/bachelors-and-masters-study-programmes'
const ADMISSIONS = 'https://www.muni.cz/en/admissions/bachelors-and-masters-studies'
const FSS =
  'https://www.fss.muni.cz/en/faculty-of-social-studies/admissions-and-study-programs/bachelors-studies'
const ECON = 'https://www.econ.muni.cz/en/admissions/bachelor-studies/application-requirements'
const ECON_DATES = 'https://www.econ.muni.cz/en/admissions/bachelor-studies'

const DIPLOMA =
  'No IB points figure is published for this programme and admission does not rank school results, so 24, the Diploma.'
const FSS_DATES =
  'The Faculty of Social Studies admits in February and September: applications for spring 2027 from 1 July to 31 October 2026, for autumn 2027 from 1 November 2026 to 15 May 2027, so stamped 2027. English: IB students and graduates are exempt from a test. Tuition EUR 3,500 a year from spring 2027.'
const GAP =
  'Admission by the Scio online General Academic Prerequisites (GAP) test, with a minimum 30th percentile, plus the secondary school certificate or proof of current studies; a pass threshold, not a ranking (model limit).'
const ECON_RULE =
  'ECON MUNI\'s application requirements: academic competence is shown by an IB Diploma with "28+, Mathematics 4+ (SL or HL)", among other qualifications (SAT 1050, A levels BBC with maths and others), or else a Scio test (GAP, OSP or Mathematics) at the 50th percentile; "Predicted grades do not meet the academic competence requirement", so an applicant still at school takes the Scio test. An IB holder below 28 can therefore still be admitted with a Scio result, so 24, the Diploma, is stored and the 28 route is a model limit. Maths AA or AI, SL or HL, at 4 is stored as part of that route, not critical. English: IB English A or B HL at 6, or a test (TOEFL iBT 87, IELTS 6.5 and others). A motivation video of up to two minutes. Deadlines: 31 October for the February 2027 intake, 30 April for September, so stamped 2027. Checked 2026-10-05.'
const PED_RULE =
  "Admission by an online interview (the Faculty of Education's conditions and criteria for admission). Applications 1 October 2026 to 31 March 2027, so stamped 2027. Checked, none required: no subject is named."
const FF_RULE =
  'The programme page shows "Data from the previous admission procedure (1 Dec 2025 - 30 Apr 2026)": only applicants with a secondary school diploma, after passing the entrance examination. No 2027 window is published, so stamped 2026. Checked, none required: no subject is named. Tuition CZK 76,000 a year.'

const refresh: RefreshFile = {
  university: 'Masaryk University',
  entryYear: 2027,
  checkedOn: '2026-10-05',
  programs: [
    {
      id: 'cmuw8afq1001o047mgbmjmtqk',
      status: 'current',
      name: 'Global Challenges: Society, Politics, Environment',
      description:
        "This Faculty of Social Studies programme takes an interdisciplinary approach to political, social and environmental global challenges, drawing on political science, environmental studies, social anthropology and sociology. It looks at contemporary challenges at the level of individuals, social structures and policies, and stresses a range of research methods; practical workshops in the final year deal with global political, social and environmental risks.\n\nGraduates work in government agencies, research institutions and NGOs, or continue to master's study. Admission is by an online general academic test.",
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${PROGRAMMES}/26460-global-challenges-society-politics-environment`,
      requirements: [],
      checkedFor: 2027,
      sources: [
        `${PROGRAMMES}/26460-global-challenges-society-politics-environment`,
        FSS,
        ADMISSIONS
      ],
      notes: `Content 5.2: new. ${GAP} ${DIPLOMA} Checked, none required: no subject is named. ${FSS_DATES} Bachelor (Bc.): the award is not in the degree list.`
    },
    {
      id: 'cmuw8afr1001p047m19rdv2h1',
      status: 'current',
      name: 'International Relations and European Politics',
      description:
        'This Faculty of Social Studies programme develops an understanding of international relations and European politics, with emphasis on analysing and interpreting their theory with critical reflection. It focuses on modern issues, theories of conflict and cooperation, European integration and international political economy, with courses from international security and diplomacy to the politics of the Middle East and East Asia, and builds analytical and research skills throughout.\n\nAdmission is in two rounds: a review of documents and a cover letter, then an online interview.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${PROGRAMMES}/23254-international-relations-and-european-politics`,
      requirements: [],
      checkedFor: 2027,
      sources: [
        `${PROGRAMMES}/23254-international-relations-and-european-politics`,
        FSS,
        ADMISSIONS
      ],
      notes: `Content 5.2: new. Two rounds: documents (proof of English, ID, transcript, cover letter), at least 30 of 40 points for an invitation, then an online interview, at least 30 of 40 for admission. ${DIPLOMA} Checked, none required: no subject is named. ${FSS_DATES} Bachelor (Bc.): the award is not in the degree list.`
    },
    {
      id: 'cmuw8afrx001q047msjylmndt',
      status: 'current',
      name: 'Politics, Media, and Communication',
      description:
        'This Faculty of Social Studies programme focuses on the interplay between politics, the media and society. It brings together comparative political science, political theory and research on political behaviour with the study of media audiences, new media and mass communication, reflecting how new media and the changing place of parties and states have made the media central to understanding politics today.\n\nAdmission is by an online general academic test.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${PROGRAMMES}/26459-politics-media-and-communication`,
      requirements: [],
      checkedFor: 2027,
      sources: [`${PROGRAMMES}/26459-politics-media-and-communication`, FSS, ADMISSIONS],
      notes: `Content 5.2: new. ${GAP} ${DIPLOMA} Checked, none required: no subject is named. ${FSS_DATES} Bachelor (Bc.): the award is not in the degree list.`
    },
    {
      id: 'cmuw8afw0001r047mh286mnls',
      status: 'current',
      name: 'Business Management and Finance',
      description:
        'This programme at the Faculty of Economics and Administration in Brno gives a foundation in management, finance, marketing and economics while developing leadership, teamwork, problem-solving and analytical skills. Students choose a finance track (financial markets, investments, accounting and corporate finance) or a management track (leadership, strategy and managing people and projects).\n\nIt admits in February and September. An IB Diploma of 28 points with maths at 4 shows the academic competence the faculty asks for; applicants without final results take an online Scio test instead.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${PROGRAMMES}/26520-business-management-and-finance`,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }],
      checkedFor: 2027,
      sources: [
        `${PROGRAMMES}/26520-business-management-and-finance`,
        ECON,
        ECON_DATES,
        ADMISSIONS
      ],
      notes: `Content 5.2: new. ${ECON_RULE} Tuition CZK 120,000 a year. Bachelor (Bc.): the award is not in the degree list.`
    },
    {
      id: 'cmuw8ag0k001u047m6llj22ss',
      status: 'current',
      name: 'Economics and Public Policy',
      description:
        'This programme at the Faculty of Economics and Administration in Brno gives multidisciplinary theory and practical skills for understanding economic concepts and the complexities of public policy and decision-making: how governments and the public sector operate, public administration, and traditional and innovative ways of delivering public services. It is aimed at future public sector leaders.\n\nIt admits in February and September. An IB Diploma of 28 points with maths at 4 shows the academic competence the faculty asks for; applicants without final results take an online Scio test instead.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${PROGRAMMES}/26521-economics-and-public-policy`,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }],
      checkedFor: 2027,
      sources: [`${PROGRAMMES}/26521-economics-and-public-policy`, ECON, ECON_DATES, ADMISSIONS],
      notes: `Content 5.2: new. ${ECON_RULE} Tuition CZK 100,000 a year. Bachelor (Bc.): the award is not in the degree list.`
    },
    {
      id: 'cmuw8ag41001x047mmeq0d168',
      status: 'current',
      name: 'Biology and Biochemistry',
      description:
        "This Faculty of Science programme gives a broad theoretical and practical education in biology and biochemistry, with an interdisciplinary approach: inorganic and organic chemistry, biochemistry, general biology, microbiology, physiology and molecular biology, and the laboratory skills of both fields. It prepares students for the faculty's English-taught master's programmes in Molecular and Cell Biology and in Biochemical and Cellular Technologies.\n\nAdmission is by a two-round entrance exam, starting with an online test.",
      field: 'Natural Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${PROGRAMMES}/27005-biology-and-biochemistry`,
      requirements: [],
      checkedFor: 2026,
      sources: [`${PROGRAMMES}/27005-biology-and-biochemistry`, ADMISSIONS],
      notes: `Content 5.2: new. The programme page describes the 2026 procedure: an online test of 12 open questions on 10 March 2026 (at least 350 of 500 points) with the motivation letter and transcript, then a second round, and admission by overall result within the programme's capacity. No 2027 dates, so stamped 2026. ${DIPLOMA} Checked, none required: no subject is a condition, though the test covers biology and chemistry. Tuition EUR 3,000 a year. Bachelor (Bc.): the award is not in the degree list.`
    },
    {
      id: 'cmuw8ag4z001y047mp31jacml',
      status: 'current',
      name: 'Culture, Media and Performative Arts',
      description:
        'This Faculty of Arts programme offers an interdisciplinary education in culture, media and performance, studying not only films, theatre and new media but the institutions, industries, practices, histories and audiences that shape them. It draws on its Central European setting in Brno, between Prague and Vienna, with courses from visual anthropology and film theory to media industries and the history of Central European culture, and a practical training placement.\n\nApplicants with a secondary school diploma are admitted after an entrance examination.',
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${PROGRAMMES}/26286-culture-media-and-performative-arts`,
      requirements: [],
      checkedFor: 2026,
      sources: [`${PROGRAMMES}/26286-culture-media-and-performative-arts`, ADMISSIONS],
      notes: `Content 5.2: new. ${FF_RULE} ${DIPLOMA} Bachelor (Bc.): the award is not in the degree list.`
    },
    {
      id: 'cmuw8ag5y001z047mdes1zjb7',
      status: 'current',
      name: 'English Language and Literature',
      description:
        'This Faculty of Arts programme covers the histories, cultures and literatures of English-speaking countries, mainly the UK, the USA, Canada and Australia, together with linguistic theory and the theory and practice of translation. Lectures and small seminars develop analytical and critical thinking and the use of written and spoken English; apart from translation courses, all teaching is in English, by Czech and native-speaker faculty.\n\nAdmission is in two rounds: a review of the motivation letter, recommendation letters and English certificate, then an interview in English.',
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${PROGRAMMES}/24424-english-language-and-literature`,
      requirements: [],
      checkedFor: 2026,
      sources: [`${PROGRAMMES}/24424-english-language-and-literature`, ADMISSIONS],
      notes: `Content 5.2: new. ${FF_RULE} First round: motivation letter, recommendation letters and the level of English shown by a certificate; second round: a 15-20 minute interview on English, motivation, reading and knowledge of English-speaking countries. ${DIPLOMA} Bachelor (Bc.): the award is not in the degree list.`
    },
    {
      id: 'cmuw8ag6w0020047m5haadtob',
      status: 'current',
      name: 'Education for Diversity and Inclusion',
      description:
        'This Faculty of Education programme is for future educators, social workers, coaches and facilitators in a multicultural world. Students develop intercultural competence across three tracks of their choice, education and psychology, social education, and special and inclusive education, and work in schools, NGOs and social centres in the Czech Republic and abroad, including a one-semester international internship.\n\nAdmission is by an online interview.',
      field: 'Education',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${PROGRAMMES}/26773-education-for-diversity-and-inclusion`,
      requirements: [],
      checkedFor: 2027,
      sources: [`${PROGRAMMES}/26773-education-for-diversity-and-inclusion`, ADMISSIONS],
      notes: `Content 5.2: new. ${PED_RULE} ${DIPLOMA} Tuition CZK 68,000 a year. Bachelor (Bc.): the award is not in the degree list.`
    },
    {
      id: 'cmuw8ag7t0021047ml7nc2b99',
      status: 'current',
      name: 'English Language for Education',
      description:
        "This Faculty of Education programme prepares future English teachers, teaching assistants and language school teachers. Students study the English language and the literature, history and culture of English-speaking countries, and above all how to teach them in a modern, creative and effective way, with compulsory teaching practice in real schools during the bachelor's degree. It leads on to the master's in Lower Secondary School English Language Teacher Training.\n\nAdmission is by an online interview.",
      field: 'Education',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${PROGRAMMES}/24665-english-language-for-education`,
      requirements: [],
      checkedFor: 2027,
      sources: [`${PROGRAMMES}/24665-english-language-for-education`, ADMISSIONS],
      notes: `Content 5.2: new. ${PED_RULE} ${DIPLOMA} Full-time study (a combined form also exists). Tuition CZK 68,000 a year. Bachelor (Bc.): the award is not in the degree list.`
    }
  ]
}

export default refresh
