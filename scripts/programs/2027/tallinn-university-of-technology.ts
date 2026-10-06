import type { RefreshFile } from '../lib/refresh'

/**
 * Tallinn University of Technology (TalTech): its four bachelor's programmes taught in English,
 * added for content task 5.2 and created, with the university, on 6 October 2026. TalTech's admissions page still describes the 2026/2027 round
 * (international applications opened 1 February 2026), so all four are stamped 2026.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts tallinn-university-of-technology
 */

const BASE = 'https://taltech.ee/en/bachelors-programmes'
const ADMISSIONS = 'https://taltech.ee/en/admissions'
const PROGRAMMES = 'https://taltech.ee/en/programmes'
const REGULATIONS =
  'https://oigusaktid.taltech.ee/en/requirements-for-the-admission-to-the-first-and-second-level-of-studies-at-tallinn-university-of-technology/'

const RULE =
  "TalTech admits IB and EB applicants on the basis of the awarded diploma; every programme asks for secondary results of at least 60% of the highest possible CGPA (the average of the subject grades). TalTech does not say how that applies to an IB total, so 24, the Diploma, is stored and the 60% rule is a model limit. Selection is by an admission threshold, not a ranking. IB and EB graduates are exempt from the English requirement for bachelor's studies. Admissions page: international applications for 2026/2027 opened 1 February 2026, deadlines 1 April (non-EU), 1 May (OECD and others) and 1 June (EU/EEA); nothing for 2027 yet, so stamped 2026. Checked, none required: no IB subject is named."

const refresh: RefreshFile = {
  university: 'Tallinn University of Technology',
  entryYear: 2027,
  checkedOn: '2026-10-05',
  programs: [
    {
      id: 'cmuw8afmb001k047mal3u4oqg',
      status: 'current',
      name: 'Cyber Security Engineering',
      description:
        "TalTech's BSc in Cyber Security Engineering, in its School of Information Technologies, teaches students to protect the connected devices and critical infrastructure that digital life depends on. Graduates start as IT specialists and can grow into roles such as CERT member or chief security officer, or continue to TalTech's MSc in Cybersecurity, studying in one of the world's most digitised countries.\n\nApplicants who pass a document check take a proctored online test of logic, algorithmic thinking and school mathematics, then an online interview with a motivation letter. Tuition is EUR 7,000 a year, free for EU/EEA citizens.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/cyber-security-engineering`,
      requirements: [],
      checkedFor: 2026,
      sources: [`${BASE}/cyber-security-engineering`, ADMISSIONS, PROGRAMMES, REGULATIONS],
      notes: `Content 5.2: new. ${RULE} Online test at least 60 points, then the motivation letter and online interview at least 60 points; in-depth knowledge of maths, programming and IT is beneficial but not essential. 180 ECTS. BSc in Cyber Security Engineering.`
    },
    {
      id: 'cmuw8afn9001l047murd3i5j2',
      status: 'current',
      name: 'Integrated Engineering',
      description:
        "TalTech's BSc in Integrated Engineering, in its School of Engineering, trains engineers whose knowledge is not limited to one narrow subject. General studies cover mathematical analysis, physics, chemistry, metrology and entrepreneurship; core studies cover robotics, machine automation, programming, materials engineering and logistics; and special studies cover design and integrated engineering.\n\nApplicants take a 30-minute proctored online test of school mathematics, physics, chemistry and IT, and those with at least 60 points go on to an online interview. Tuition is EUR 6,000 a year, free for EU/EEA citizens.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/integrated-engineering`,
      requirements: [],
      checkedFor: 2026,
      sources: [`${BASE}/integrated-engineering`, ADMISSIONS, PROGRAMMES, REGULATIONS],
      notes: `Content 5.2: new. ${RULE} Online test at least 60 of 100 to be invited to the interview; admitted with at least 60 points for the test and interview combined. 180 ECTS. BSc in Integrated Engineering.`
    },
    {
      id: 'cmuw8afo7001m047mlpje2ovp',
      status: 'current',
      name: 'International Business Administration',
      description:
        "TalTech's EFMD-accredited International Business Administration programme, in its School of Business and Governance, prepares students for an international business career in Estonia's digital society. Core studies cover micro- and macroeconomics, business mathematics, statistics, logistics and international business ethics, and students specialise in entrepreneurship and marketing or in finance and accounting.\n\nApplicants take an online mathematics test and, if they pass, an online interview. Tuition is EUR 5,000 a year for all students.",
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/international-business-administration`,
      requirements: [],
      checkedFor: 2026,
      sources: [
        `${BASE}/international-business-administration`,
        ADMISSIONS,
        PROGRAMMES,
        REGULATIONS
      ],
      notes: `Content 5.2: new. ${RULE} A 2.5-hour proctored online mathematics test (numbers, algebra, functions, equations, calculus, probability and statistics), then an online interview; an SAT score is an asset. 180 ECTS. Bachelor of Arts in Social Sciences.`
    },
    {
      id: 'cmuw8afp6001n047mll1mddgi',
      status: 'current',
      name: 'Law',
      description:
        "TalTech's Law programme, in its School of Business and Governance, prepares lawyers, legal engineers and architects of legal solutions for a technology-driven private and public sector, in one of the world's most digitised countries. Teaching combines face-to-face and online learning with project-based work that develops critical thinking and practical skills.\n\nAdmission combines an online test, a motivation letter and CV, and an interview. Tuition is EUR 5,000 a year for all students.",
      field: 'Law',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/law`,
      requirements: [],
      checkedFor: 2026,
      sources: [`${BASE}/law`, ADMISSIONS, PROGRAMMES, REGULATIONS],
      notes: `Content 5.2: new. ${RULE} Admission points: online test up to 10, motivation letter and CV up to 40, interview up to 50; admitted from 50 points. 180 ECTS. Bachelor of Arts in Social Sciences.`
    }
  ]
}

export default refresh
