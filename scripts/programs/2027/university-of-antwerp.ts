import type { RefreshFile } from '../lib/refresh'

/**
 * University of Antwerp: its two English-taught bachelor's programmes, added for content task 5.1
 * and created, with the university, on 4 October 2026. The admission requirements page is written
 * for enrolment in 2026-2027 (applications for 2027-2028 open on 4 November 2026), so both are
 * stamped 2026 (refresh rule 2).
 *
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-antwerp
 */

const BASE = 'https://www.uantwerpen.be/en/study/programmes/all-programmes'
const ADMISSION =
  'https://www.uantwerpen.be/en/study/admission-and-enrolment/admission/academic-bachelor/admission-requirements/'

const RULE =
  "Antwerp's admission requirements: an International Baccalaureate diploma accredited by the IB in Geneva gives direct enrolment, verified on ibis.ibo.org, and is always treated as an EEA degree (an applicant who needs a visa still applies for admission first). Antwerp publishes no IB points figure, so 24, the Diploma. English: TOEFL iBT 80 or 4.5, IELTS 6.5 with 6.0 in each part, ITACE B2, Cambridge B2 First 176 or PTE 59; an IB Diploma with English passed as Language 1 at 5 or more, or at Level A at 3 or more, is exempt from the test. The page is written for enrolment in 2026-2027 (2027-2028 applications open 4 November 2026), so stamped 2026."

const refresh: RefreshFile = {
  university: 'University of Antwerp',
  entryYear: 2027,
  checkedOn: '2026-10-04',
  programs: [
    {
      id: 'cmutgqeeh0056lj7m97jqhyfy',
      status: 'current',
      name: 'Social-Economic Sciences',
      description:
        "The Bachelor of Social-Economic Sciences is a multidisciplinary programme between sociology and economics, with an international focus. It develops skills in socio-economic policy, business, economics, sociology, mathematics and statistics, and looks at current societal and economic challenges and the impact of globalisation.\n\nThe broad first year introduces the different fields; in the second and third years you follow one of four majors: Business Economics, Economic Analysis, Social-economic Analysis or Sociological Analysis. Taught in English at the University of Antwerp's city campus, it leads to English-taught master's programmes in Economic Policy, Political Science or Business Economics.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/social-economic-sciences/`,
      requirements: [],
      checkedFor: 2026,
      sources: [
        ADMISSION,
        `${BASE}/social-economic-sciences/admission-and-enrolment/entry-requirements/`,
        `${BASE}/social-economic-sciences/`,
        `${BASE}/social-economic-sciences/bachelor/`
      ],
      notes: `Content 5.1: new. ${RULE} The programme asks for a secondary diploma giving access to a comparable university programme in its country; proficiency in mathematics is recommended and no prior economics or sociology is needed. Checked, none required. Applicants with a non-EEA degree also sit a compulsory maths proficiency test; the IB Diploma counts as an EEA degree. Bachelor of Science (NVAO: Sociaal-economische wetenschappen), 180 ECTS.`
    },
    {
      id: 'cmutgqefg0057lj7m22rfvl8r',
      status: 'current',
      name: 'Urban Sustainability Studies',
      description:
        'The Bachelor in Urban Sustainability Studies looks at the challenges urbanisation brings, from public health and the environment to social inequality and poverty, and at how to manage them sustainably in cities and rural areas. It is delivered by ten European universities of the YUFE alliance, with the University of Antwerp as the starting university.\n\nYou personalise the curriculum, take two one-semester minors at YUFE partner universities and study abroad for two or three semesters, building a network across Europe. The programme is taught entirely in English and leads to one degree.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/urban-sustainability-studies/`,
      requirements: [],
      checkedFor: 2026,
      sources: [
        ADMISSION,
        `${BASE}/urban-sustainability-studies/about-the-programme/`,
        `${BASE}/urban-sustainability-studies/`,
        'https://www.eqar.eu/qa-results/search/by-report/report/?id=112783',
        'https://www.nvao.net/nl/besluiten/universiteit-antwerpen/bachelor-of-arts-science-in-urban-sustainability-studies/131222'
      ],
      notes: `Content 5.1: new. ${RULE} No subject is named for the programme: checked, none required. Launched in 2025-2026 by the Young Universities for the Future of Europe (YUFE) alliance; two minors of one semester each at partner universities. Accredited by NVAO from 1 September 2025 to 30 September 2030 as a joint BA/BSc; EQAR records the award as Bachelor of Science. 180 ECTS in six semesters.`
    }
  ]
}

export default refresh
