import type { RefreshFile } from '../lib/refresh'
import type { RequirementDef } from '../lib/requirements-diff'

/**
 * WHU – Otto Beisheim School of Management: its Bachelor in International Business Administration, added for
 * content task 7, Part B2 (Germany), and created, with the university, on 2026-10-12. The owner chose it on 12 October
 * 2026 (docs/tasks/content-2027/germany-model-decision.md, decision 6).
 *
 * Under the German model: WHU asks for "a secondary school diploma or equivalent higher education entrance
 * qualification (e.g., IB, Abitur, A-Levels)", so 24 points and the KMK rows; no maths HL (business). Stamped 2027: the
 * application page gives the 2027 application window and test dates.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts whu-otto-beisheim-school-of-management
 */

/** Read on 12 October 2026. */
const APPLY =
  'https://www.whu.edu/en/programs/bachelor-program/bachelor-in-international-business-administration/application-admissions/'
const KMK_AGREEMENT =
  'https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/aktuell/283_Vereinb_Anerkenn_Int_Baccalaureate_Diploma-2023-06-15_Liste1__2026-03-26_Liste2-2026-05-22.pdf'

const NOTES =
  "Content 7 (Part B2, 12 October 2026): German model (a), owner, 12 October 2026. minIBPoints 24: the KMK's IB agreement (as amended 15 June 2023) recognises the Diploma with a 4 or better in all six subjects. Rows: a KMK science and a KMK social science (critical). Not modelled: the HL rule, the grade-3 offset, the language pair, and the schools whose maths SL counts as HL. WHU requires a higher education entrance qualification (the IB counts), an English test (TOEFL iBT 95, IELTS 7, Cambridge C1 Advanced grade C; exempt from an English-taught school) and about six weeks of internships. Selection: analytical test, online assessment, interviews. No maths HL: business. Stamped 2027: applications from October 15, 2026 until May 15, 2027."

/** KMK 1a: Biology, Chemistry or Physics. */
const KMK_SCIENCE: RequirementDef = {
  courses: ['BIO', 'CHEM', 'PHYS'],
  level: 'SL',
  grade: 4,
  critical: true
}
/** KMK 1a: the agreement's eight social sciences. */
const KMK_SOCIAL_SCIENCE: RequirementDef = {
  courses: ['HIST', 'GEOG', 'ECON', 'PSYCH', 'PHIL', 'ANTHRO', 'BUS-MGMT', 'GLOB-POL'],
  level: 'SL',
  grade: 4,
  critical: true
}

const refresh: RefreshFile = {
  university: 'WHU – Otto Beisheim School of Management',
  entryYear: 2027,
  checkedOn: '2026-10-12',
  programs: [
    {
      id: 'cmv5p3uv60000xo7m99ox6dg6',
      status: 'current',
      name: 'International Business Administration',
      description:
        'Three unforgettable years at a top business school. Two internships. One semester abroad. Small classes, big topics. And a WHU family for life. We help turn your aspirations into reality. For who you want to be and everything you want to achieve. Take the first step and find your purpose with WHU.\n\nHow WHU decides: after an online application, candidates take an analytical test, an online assessment and one-on-one interviews, and WHU selects on academic performance as well as personal characteristics and activities. Applications for 2027 entry run from 15 October 2026 to 15 May 2027, with an early-bird deadline of 31 January 2027. You need a recognised school-leaving qualification such as the IB, about six weeks of internships before you start, and TOEFL iBT 95, IELTS 7 or Cambridge C1 Advanced at grade C, unless you graduate from an English-taught school. You can study in English, or in German and English.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl:
        'https://www.whu.edu/en/programs/bachelor-program/bachelor-in-international-business-administration/',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2027,
      sources: [
        'https://www.whu.edu/en/programs/bachelor-program/bachelor-in-international-business-administration/',
        APPLY,
        KMK_AGREEMENT
      ],
      notes: NOTES
    }
  ]
}

export default refresh
