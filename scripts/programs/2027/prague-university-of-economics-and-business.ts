import type { RefreshFile } from '../lib/refresh'

/**
 * Prague University of Economics and Business (VŠE): its bachelor's programmes taught in English,
 * added for content task 5.2. Applications for 2027/2028 open on 1 November 2026, and seven
 * programmes publish their 2027 rounds (stamped 2027); the Faculty of Economics' Economics page
 * still gives the 2026 deadlines (stamped 2026). None publishes an IB figure or subject: the IB is
 * accepted as proof of secondary education, assessed in the e-application, and admission is by
 * interview, essay and video, or the Scio GAP test, so all eight are stored at 24, the Diploma.
 * Graduates are awarded the Czech bakalář (Bc.), stored as "Bachelor".
 *
 * Dry run: npx tsx scripts/programs/refresh.ts prague-university-of-economics-and-business
 */

const PROGRAMMES = 'https://admissions.vse.cz/bachelors-programmes/'
const PROCEDURE = 'https://admissions.vse.cz/admission-procedure/'

const FEES =
  'Tuition EUR 6,000 a year for bachelor programmes (EUR 5,000 for students admitted before 2027/2028); application fee EUR 100. The foreign school leaving certificate is assessed in the e-application.'
const NONE = 'Checked, none required: no IB subject or points figure is named, so 24, the Diploma.'
const INTAKES =
  'Applications for 2027/2028: 1st intake November 2026 to 28 February 2027, 2nd 1 March to 30 April 2027, 3rd 1 May to 10 June 2027; results by 31 March, 31 May and 1 July. Stamped 2027.'
const FIS =
  'Faculty of Informatics and Statistics: admission by a CV review (20%) and the Scio General Academic Prerequisites (GAP) online test (80%), one attempt included in the fee. Round I 1 November 2026 to 28 February 2027 (tests 20 February or 20 March 2027), round II 1 March to 30 April 2027 (tests 24 April or 22 May 2027), for study from September 2027. Stamped 2027. Proof of English is required.'

const refresh: RefreshFile = {
  university: 'Prague University of Economics and Business',
  entryYear: 2027,
  checkedOn: '2026-10-05',
  programs: [
    {
      status: 'new',
      name: 'Business Administration',
      description:
        'The Bachelor of Business Administration at the Faculty of Business Administration in Prague educates future business professionals in managing business performance, with a broad economic overview, analytical thinking and social responsibility. Students can take a double degree with KEDGE Business School in Bordeaux.\n\nApplicants upload an essay on an economic topic and a short motivational video, then have an interview in Prague or online; there are three application rounds for September entry.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://bba.vse.cz/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bba.vse.cz/applicant/admission-procedure/how-to-apply/',
        PROGRAMMES,
        PROCEDURE
      ],
      notes: `Content 5.2: new. ${INTAKES} Admission: an essay in English (business plan summary, a company, or similar topics), a motivational video of one to three minutes, then an on-site or online interview. ${NONE} ${FEES} Expected intake about 150 (2026/2027 regulation).`
    },
    {
      status: 'new',
      name: 'Economics of Markets and Organizations',
      description:
        'This programme is run by the Faculty of Business Administration with CERGE-EI, the Center for Economic Research and Graduate Education. It combines economics and management to explain the principles that govern markets and industries, with a focus on market dynamics, competition and industry structure, in response to growing market concentration and a changing economic environment.\n\nApplicants upload an essay and a short motivational video, then have a brief interview in Prague or online.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://emo.vse.cz/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://emo.vse.cz/applicant/admission-procedure/how-to-apply/',
        PROGRAMMES,
        PROCEDURE
      ],
      notes: `Content 5.2: new. ${INTAKES} (The third round is subject to available places.) Admission: an essay in English on a given economic topic, a motivational video, then an interview. ${NONE} ${FEES} Expected intake about 30 (2026/2027 regulation).`
    },
    {
      status: 'new',
      name: 'International Business',
      description:
        'The Bachelor of International Business at the Faculty of International Relations gives theoretical and practical knowledge for doing business on a global scale, with strong language skills; graduates move into mid-level management in multinational companies or start their own businesses. In the third year students can take a double degree with the University of Vaasa or OTH Regensburg.\n\nAdmission is by an online interview on one of five business topics, assessing motivation and English; no English certificate is needed.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://ibb.vse.cz/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://ibb.vse.cz/admission-process/entrance-exam/', PROGRAMMES, PROCEDURE],
      notes: `Content 5.2: new. Applications open 1 November 2026, deadline 28 February 2027, interviews in March 2027 (a second round only if places remain), so stamped 2027. The online interview scores motivation (50 points, at least 25) and English (50, at least 25), and the Dean sets the minimum total. ${NONE} ${FEES}`
    },
    {
      status: 'new',
      name: 'International and Diplomatic Studies',
      description:
        'International and Diplomatic Studies at the Faculty of International Relations covers international politics and economics, international law, comparative politics, diplomatic history and diplomatic theory and practice, with economics at the core and a strong emphasis on the European Union, alongside optional courses on other world regions.\n\nThere is no entrance test, essay or motivation letter: admission is by a short online interview in English on knowledge and motivation, and applicants are admitted in order of their score.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://ids.vse.cz/admissions/bachelor-program/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://ids.vse.cz/admissions/bachelor-program/', PROGRAMMES, PROCEDURE],
      notes: `Content 5.2: new. Applications for September 2027: round I 1 November 2026 to 28 February 2027 (interviews in March), round II 1 March to 30 April 2027 (May); one round only; "Official conditions of admission 2027/2028" are linked. Stamped 2027. An online interview of about 10 minutes: knowledge and motivation (up to 50) and English (up to 50), at least 25 in each and a total above the Dean's threshold; admitted in order of score. English at B2, assessed in the interview. ${NONE} ${FEES}`
    },
    {
      status: 'new',
      name: 'Economic Data Science',
      description:
        'Economic Data Science at the Faculty of Informatics and Statistics prepares students to work with the data on which companies and public bodies base fundamental decisions. They learn to analyse data in depth with advanced statistical and econometric methods, and the link to economics equips them to make decisions at the highest level.\n\nAdmission is by a CV and an online general academic test (Scio GAP).',
      field: 'Computer Science',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://fis.vse.cz/english/about/bachelors-degree-programs/economic-data-science/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://fis.vse.cz/english/admissions/admissions/bc/', PROGRAMMES, PROCEDURE],
      notes: `Content 5.2: new. ${FIS} ${NONE} ${FEES}`
    },
    {
      status: 'new',
      name: 'Business Information Systems and Computer Science',
      description:
        'This new programme at the Faculty of Informatics and Statistics, opening for the September 2027 intake, teaches how to connect IT, data and business: developing applications, working with AI and managing projects, so that graduates can both understand technology and use it to deliver results.\n\nAdmission is by a CV and an online general academic test (Scio GAP).',
      field: 'Computer Science',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://fis.vse.cz/english/about/bachelors-degree-programs/bis/',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://fis.vse.cz/english/admissions/admissions/bc/', PROGRAMMES, PROCEDURE],
      notes: `Content 5.2: new. First intake September 2027 (VŠE's programme list). ${FIS} ${NONE} ${FEES}`
    },
    {
      status: 'new',
      name: 'Finance and Accounting',
      description:
        'The Bachelor of Finance and Accounting at the Faculty of Finance and Accounting combines the two fields: corporate finance, investments, financial and management accounting, law, taxation and ICT in business, taught in intensive blocks. The programme is accredited by ACCA, so graduates are eligible for the ACCA Higher Diploma in Accounting and Business and exemptions from four ACCA exams.\n\nApplicants with a complete e-application are invited to an online interview after each of three deadlines.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://ffu.vse.cz/english/applicants-bachelors-studies/about-the-bifa-programme/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://ffu.vse.cz/english/applicants-bachelors-studies/admission-procedure-for-bachelors-studies/',
        PROGRAMMES,
        PROCEDURE
      ],
      notes: `Content 5.2: new. Applications open 1 November 2026, deadlines 30 November 2026, 28 February 2027 and 30 April 2027, online interviews in December, March and May, start of study September 2027, so stamped 2027. A CV and motivation letter, then an online interview on MS Teams. ${NONE} ${FEES}`
    },
    {
      status: 'new',
      name: 'Economics',
      description:
        "The English-taught Economics programme at the Faculty of Economics, VŠE's primary faculty, prepares professional economists for the public and private sectors at home and abroad, with a base in economics, law and other social disciplines and an emphasis on international economics and politics. It has run since 2012/2013 and has more than 100 students from 24 countries.\n\nApplicants submit an essay, a motivational video and a CV, and are admitted from 70 points.",
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://econ.vse.cz/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://econ.vse.cz/homepage/admission/admission-procedure-2/entrance-exam-2/',
        'https://econ.vse.cz/homepage/admission/admission-procedure-2/how-to-apply/',
        PROGRAMMES,
        PROCEDURE
      ],
      notes: `Content 5.2: new. The faculty's pages give the 2026 deadlines (28 February and 30 April 2026) and enrolment by 21 September 2026; nothing for 2027 yet, so stamped 2026. Admission in long-distance form: an essay, a motivation video and a CV, scored by a committee; admitted from 70 points. ${NONE} ${FEES} Economics and Business Administration, major Economics.`
    }
  ]
}

export default refresh
