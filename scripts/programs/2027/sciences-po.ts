import type { RefreshFile } from '../lib/refresh'

/**
 * Sciences Po: the English-taught routes into its Bachelor of Arts, added for content task 5.3
 * (France) and created, with the university, on 8 October 2026.
 *
 * The Bachelor is one degree taught on seven campuses; each regional campus adds a geographical
 * minor and applicants choose up to two campus programmes. Four need no French: Le Havre
 * (Asia-Pacific, in English), Menton's English track (Mediterranean and Middle East), and Reims's
 * North America minor (in English) and Africa minor English track. Paris, Dijon, Nancy, Poitiers,
 * Menton's French track and Reims's French Africa minor need French at C1 or B1 with English C1, so
 * they are not added. The 11 international dual bachelor's (Columbia, UCL, HKU and others) are left
 * out at the owner's request (8 October 2026): their later years and admission belong to the
 * partner. The international admissions page says "Admissions for the 2027 intake are open", so
 * all four are stamped 2027.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts sciences-po
 */

const INTERNATIONAL =
  'https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/'
const LANGUAGES =
  'https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/language-requirements/'
const BACHELOR = 'https://www.sciencespo.fr/college/en/academics/bachelor/'
const GLANCE = 'https://www.sciencespo.fr/college/en/academics/undergraduate-college-at-a-glance/'
const FEES = 'https://www.sciencespo.fr/en/admissions-and-financial-aid/tuition-fees/'
const LE_HAVRE = 'https://www.sciencespo.fr/college/en/campus-life/campus/le-havre/'
const MENTON = 'https://www.sciencespo.fr/college/en/campus-life/campus/menton/'
const REIMS = 'https://www.sciencespo.fr/college/en/campus-life/campus/reims/'

const IB =
  'IB rule (international admissions page, 2027 intake): the international pathway is for anyone preparing a non-French secondary diploma, "International Baccalaureate Diploma Programme (IBDP)" first among the examples; an applicant preparing both the French baccalaureate and another diploma applies on Parcoursup instead. "There are no specific subject requirements. For example, IB candidates whose 6 subjects (3 HL, 3 SL or more HL) do not contain any science subjects are not in any way disadvantaged." Checked, none required. No minimum score: three marks (final exams or predicted grades out of 20, the academic record out of 20, written pieces out of 10) make 50 points, a minimum set each year by the jury decides who is interviewed, and the interview (out of 50) completes a mark out of 100 against a minimum admission mark set after review, so 24, the Diploma. Application fee €150; applicants choose two campus programmes. Rounds: apply by 4 November 2026 (results mid-January 2027), 13 January 2027 (early April) or 1 March 2027 (early May); interviews 8-18 December 2026, 8-19 March and 13-23 April 2027.'
const ENTRY =
  'Entry year: the page says "Admissions for the 2027 intake are open", so stamped 2027.'
const FEE_NOTE =
  'Fees 2026-27 (the published year): €0 to €14,900 a year by household income for EEA tax residents, €14,900 for others.'
const COMPETITIVE =
  'No "How competitive" paragraph: Sciences Po sets its minimum marks each year after reviewing applications and publishes no IB figure.'
const FIELD =
  'Field: "Social Sciences and Humanities" names Social Sciences first, and a joint degree goes to its first-named discipline (8.1).'

const ADMISSION_PARAGRAPH =
  "Applicants with the IB apply through Sciences Po's international admissions pathway, on its own website, and may choose two campus programmes. There are no subject requirements. Sciences Po marks the final or predicted results, the whole school record and written pieces, then interviews the strongest applicants online; the interview includes commenting on an image. Every student spends the third year abroad at a partner university."

const refresh: RefreshFile = {
  university: 'Sciences Po',
  entryYear: 2027,
  checkedOn: '2026-10-08',
  programs: [
    {
      id: 'cmuzj2o9p000l6x7mx0bikgrl',
      status: 'current',
      name: 'Social Sciences and Humanities: Asia-Pacific Minor',
      description: `Sciences Po's three-year Bachelor of Arts covers law, economics, history, political science and sociology, with a common core on every campus; in the second year students choose two majors. On the Le Havre campus, about 350 students, two thirds of them international, study the Bachelor entirely in English with a minor on Europe and the Asia-Pacific region. No French is required.\n\n${ADMISSION_PARAGRAPH}`,
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      campusCity: 'Le Havre',
      minIBPoints: 24,
      programUrl: LE_HAVRE,
      requirements: [],
      checkedFor: 2027,
      sources: [INTERNATIONAL, LANGUAGES, LE_HAVRE, BACHELOR, GLANCE, FEES],
      notes: `Content 5.3: new. Le Havre campus: "Classes on Le Havre campus are taught in English", English C1, French not a prerequisite. ${IB} ${ENTRY} ${FEE_NOTE} ${COMPETITIVE} ${FIELD}`
    },
    {
      id: 'cmuzj2od1000m6x7myoms6l9c',
      status: 'current',
      name: 'Social Sciences and Humanities: Mediterranean and Middle East Minor (English track)',
      description: `Sciences Po's three-year Bachelor of Arts covers law, economics, history, political science and sociology, with a common core on every campus; in the second year students choose two majors. On the Menton campus, on the Mediterranean coast near Italy, the English track teaches the Bachelor in English with a minor on the political, economic and social dynamics of the Mediterranean basin and the Middle East. No French is required.\n\n${ADMISSION_PARAGRAPH}`,
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      campusCity: 'Menton',
      minIBPoints: 24,
      programUrl: MENTON,
      requirements: [],
      checkedFor: 2027,
      sources: [INTERNATIONAL, LANGUAGES, MENTON, BACHELOR, GLANCE, FEES],
      notes: `Content 5.3: new. Menton campus, English track ("The Mediterranean and Middle east Minor"): English C1, "Proficiency in French is not a prerequisite"; Menton's French track needs French C1 and is not added. ${IB} ${ENTRY} ${FEE_NOTE} ${COMPETITIVE} ${FIELD}`
    },
    {
      id: 'cmuzj2oe0000n6x7me4ewvegk',
      status: 'current',
      name: 'Social Sciences and Humanities: North America Minor',
      description: `Sciences Po's three-year Bachelor of Arts covers law, economics, history, political science and sociology, with a common core on every campus; in the second year students choose two majors. On the Reims campus, Sciences Po's largest outside Paris with nearly 1,600 students, the North America minor is taught in English and studies the region's politics, economics, law, society and history. No French is required.\n\n${ADMISSION_PARAGRAPH}`,
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      campusCity: 'Reims',
      minIBPoints: 24,
      programUrl: REIMS,
      requirements: [],
      checkedFor: 2027,
      sources: [INTERNATIONAL, LANGUAGES, REIMS, BACHELOR, GLANCE, FEES],
      notes: `Content 5.3: new. Reims campus, North America minor: "(in English)" (Bachelor page), English C1. ${IB} ${ENTRY} ${FEE_NOTE} ${COMPETITIVE} ${FIELD}`
    },
    {
      id: 'cmuzj2of0000o6x7mo705fkxy',
      status: 'current',
      name: 'Social Sciences and Humanities: Africa Minor (English track)',
      description: `Sciences Po's three-year Bachelor of Arts covers law, economics, history, political science and sociology, with a common core on every campus; in the second year students choose two majors. On the Reims campus, the Africa minor's English track teaches the Bachelor in English, studying the continent through political science, economics, law, sociology and history; students may take some electives in French. No French is required.\n\n${ADMISSION_PARAGRAPH}`,
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      campusCity: 'Reims',
      minIBPoints: 24,
      programUrl: REIMS,
      requirements: [],
      checkedFor: 2027,
      sources: [INTERNATIONAL, LANGUAGES, REIMS, BACHELOR, GLANCE, FEES],
      notes: `Content 5.3: new. Reims campus, Africa minor, English track: English C1, "Proficiency in French is not a prerequisite"; the French-taught Africa minor needs French C1 and is not added. ${IB} ${ENTRY} ${FEE_NOTE} ${COMPETITIVE} ${FIELD}`
    }
  ]
}

export default refresh
