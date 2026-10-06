import type { RefreshFile } from '../lib/refresh'

/**
 * Keio University: its English-taught undergraduate programmes open to IB applicants, added for
 * content task 5.2 and created, with the university, on 6 October 2026. PEARL's page gives the September 2027 application periods and GIGA's the Winter
 * AO 2026 round for September 2027 or April 2028 entry, so all three are stamped 2027. Neither
 * publishes an IB figure: PEARL says there are no cut-off scores, and both screen documents only.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts keio-university
 */

const PEARL = 'https://www.keio.ac.jp/en/admissions/faculty/examinations/pearl/'
const PEARL_FAQ = 'https://www.keio.ac.jp/en/admissions/undergraduate/pearl/faq.html'
const GIGA = 'https://www.keio.ac.jp/en/admissions/faculty/examinations/ao-giga-sfc-pem/'
const GIGA_GUIDEBOOK =
  'https://www.keio.ac.jp/files/a4a9f182205773d65b21fc9a316f71e05740cfc37eeda152fe5d0e00c40e4b81'
const GIGA_SYSTEM = 'https://admission.sfc.keio.ac.jp/giga/'

const GIGA_RULE =
  'GIGA Winter AO 2026 guidebook (published 11 September 2026) for September 2027 or April 2028 entry: application 8 December 2026 to 22 January 2027, results 12 March 2027; documents only, entirely in English, no interview or travel to Japan. Eligibility (4): an IB Diploma obtained or on track; with it, no English test is required. No IB points figure or subject is set, so 24, the Diploma; checked, none required. Applicants choose one of the two faculties. Scholarships for September entrants are applied for with the application. Contact: Admissions Office, Keio SFC, ao-overseas@sfc.keio.ac.jp. Stamped 2027.'

const refresh: RefreshFile = {
  university: 'Keio University',
  entryYear: 2027,
  checkedOn: '2026-10-05',
  programs: [
    {
      id: 'cmuw8aex5000x047mz2l9n4e3',
      status: 'current',
      name: 'Economics (PEARL)',
      description:
        "PEARL is Keio University's four-year Bachelor of Arts in Economics at the Faculty of Economics in Tokyo, taught entirely in English. It combines advanced economics with the liberal arts; international students can also study Japanese to an employment-ready level, and students admitted in the first two application periods can apply in their first year to a double degree with Sciences Po. Students who meet set conditions may graduate in three and a half years.\n\nAbout 100 students start each September. Admission is decided on the submitted materials alone, with no interview, and there are three application periods between October and April.",
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: PEARL,
      requirements: [],
      checkedFor: 2027,
      sources: [PEARL, PEARL_FAQ],
      notes:
        'Content 5.2: new. PEARL\'s page gives the September 2027 entry (22 September 2027) and three application periods: 21 October to 2 December 2026, 4 December 2026 to 27 January 2027, and 24 February to 7 April 2027. Every applicant submits IB Diploma grades (final or predicted) or SAT scores, and TOEFL iBT or IELTS Academic, native speakers included; ACT is no longer accepted from September 2027 entry. The FAQ: "There are no subject or subject level requirements for IB grades" and "There are no \'cut-off\' scores", so 24, the Diploma; checked, none required. Screening on submitted materials only. About 100 students over the three periods. Contact: PEARL Team, Admissions Center, pearl_admissions@info.keio.ac.jp. Bachelor of Arts in Economics; 3.5-year graduation possible.'
    },
    {
      id: 'cmuw8aey2000y047m96xkxy4w',
      status: 'current',
      name: 'Policy Management (GIGA Program)',
      description:
        "The GIGA Program lets students take a degree in English at Keio's Shonan Fujisawa Campus (SFC). In the Faculty of Policy Management, founded in 1990, policy is studied as an art that brings together many disciplines: students learn to analyse social problems that cross academic boundaries and to design policies that address them, drawing on SFC's resources across both of its faculties.\n\nStudents enter in September or April and start in the first year; GIGA's Winter AO round is decided on documents submitted online, with no interview. In 2026, 60 of 318 applicants to the faculty through GIGA were admitted.",
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: GIGA,
      requirements: [],
      checkedFor: 2027,
      sources: [GIGA, GIGA_GUIDEBOOK, GIGA_SYSTEM],
      notes: `Content 5.2: new. ${GIGA_RULE} Admissions statistics (guidebook appendix), Faculty of Policy Management: 2024 157 applicants and 61 admitted, 2025 249 and 82, 2026 318 and 60; no grade figure is published, so no "How competitive" paragraph. Bachelor of Arts in Policy Management.`
    },
    {
      id: 'cmuw8aeyy000z047mdf3kpr00',
      status: 'current',
      name: 'Environment and Information Studies (GIGA Program)',
      description:
        "The GIGA Program lets students take a degree in English at Keio's Shonan Fujisawa Campus (SFC). The Faculty of Environment and Information Studies looks for students who will use science and technology to work on problems such as climate change, biodiversity loss, natural disasters and a shrinking, ageing population, and to shape a society changing as fast as generative AI has shown it can.\n\nStudents enter in September or April and start in the first year; GIGA's Winter AO round is decided on documents submitted online, with no interview. In 2026, 87 of 322 applicants to the faculty through GIGA were admitted.",
      field: 'Environmental Studies',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: GIGA,
      requirements: [],
      checkedFor: 2027,
      sources: [GIGA, GIGA_GUIDEBOOK, GIGA_SYSTEM],
      notes: `Content 5.2: new. ${GIGA_RULE} Admissions statistics (guidebook appendix), Faculty of Environment and Information Studies: 2024 170 applicants and 50 admitted, 2025 277 and 57, 2026 322 and 87; no grade figure is published, so no "How competitive" paragraph. Bachelor of Arts in Environment and Information Studies.`
    }
  ]
}

export default refresh
