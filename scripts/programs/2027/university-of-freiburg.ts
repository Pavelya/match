import type { RefreshFile } from '../lib/refresh'
import type { RequirementDef } from '../lib/requirements-diff'

/**
 * University of Freiburg: Liberal Arts and Sciences, its only English-taught bachelor's program, at University
 * College Freiburg, added for content task 7, Part B2 (Germany), and created, with the university, on 2026-10-12.
 * The owner chose it on 12 October 2026 (docs/tasks/content-2027/germany-model-decision.md, decision 6).
 *
 * Under the German model: 24 points and the KMK rows. No maths HL row, for the owner: the program awards a BA or a
 * BSc by major, and the BA majors lie outside maths, science and engineering. Stamped 2026: the application page says
 * the 2026 period is over and its guidelines will be "amended for 2027 as necessary".
 *
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-freiburg
 */

/** Read on 12 October 2026. */
const APPLY = 'https://uni-freiburg.de/ucf/las/apply/'
const INTERNATIONAL =
  'https://uni-freiburg.de/en/studies/applying/international-applicants/full-time-studies/'
const KMK_AGREEMENT =
  'https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/aktuell/283_Vereinb_Anerkenn_Int_Baccalaureate_Diploma-2023-06-15_Liste1__2026-03-26_Liste2-2026-05-22.pdf'

const NOTES =
  "Content 7 (Part B2, 12 October 2026): German model (a), owner, 12 October 2026. minIBPoints 24: the KMK's IB agreement (as amended 15 June 2023) recognises the Diploma with a 4 or better in all six subjects. Rows: a KMK science and a KMK social science (critical). Not modelled: the HL rule, the grade-3 offset, the language pair, and the schools whose maths SL counts as HL. Freiburg assesses the IB through anabin (the KMK rules). No maths HL, for the owner: a liberal arts program with BA majors (Culture and History, Governance) as well as BSc majors (Life Sciences, Environmental and Sustainability Sciences). Selection: 74 places; grade, essay and letter (each at least 4.0) for 90% of German and EU places, 10% waiting time; non-EU applicants in a 20% quota. Freiburg's programme page shows no cut-off. Degree stored as Bachelor of Arts; the description says BA or BSc. Field: the rule's Arts & Humanities."

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
  university: 'University of Freiburg',
  entryYear: 2027,
  checkedOn: '2026-10-12',
  programs: [
    {
      status: 'new',
      name: 'Liberal Arts and Sciences',
      description:
        "The Liberal Arts and Sciences (LAS) BA/BSc is a four-year, English-taught programme at University College Freiburg (UCF). It offers a shared Core, flexible Electives, and academic depth in a Major chosen after the first year, such as Its majors are Culture and History, Governance, Life Sciences, and Environmental and Sustainability Sciences.\n\nHow Freiburg decides: 74 places. For 90% of them, applicants from Germany and the EU are ranked on their school grade (converted to the German scale), an essay and a motivation letter, and the essay and the letter must each be rated at least 4.0; 10% go on waiting time. Non-EU applicants without a German school certificate compete in a separate quota of 20% of the places. You apply through hochschulstart and the university's portal from 1 June to 15 July. Freiburg publishes no cut-off. Teaching is in English (B2), with no German required; you earn a BA or a BSc depending on your major.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://uni-freiburg.de/en/studies/degree-programmes/degree-programme/391/',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://uni-freiburg.de/en/studies/degree-programmes/degree-programme/391/',
        APPLY,
        INTERNATIONAL,
        KMK_AGREEMENT
      ],
      notes: NOTES
    }
  ]
}

export default refresh
