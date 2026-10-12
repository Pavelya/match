import type { RefreshFile } from '../lib/refresh'

/**
 * Singapore Institute of Technology: requirements for 2027 entry.
 *
 * Exported from the database on 2026-10-12 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Content 7, Part B1 (12 October 2026): TUM's two joint degrees with SIT, moved here from the Technical
 * University of Munich on 12 October 2026 (decision 8 of docs/tasks/content-2027/germany-model-decision.md):
 * they are taught in Singapore and applied for through SIT's portal. Checked the same day under the German
 * model, from TUM Asia's program pages, which state the IB conditions (the KMK's, with maths at HL) and the
 * next intake, September 2027. TUM's program pages stay their links: TUM Asia's are the admission pages.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts singapore-institute-of-technology
 */
/** Read on 12 October 2026. */
const TUM_ASIA_CHE = 'https://tum-asia.edu.sg/undergraduate-studies/chemical-engineering/'
const TUM_ASIA_EDDE =
  'https://tum-asia.edu.sg/undergraduate-studies/electronics-and-data-engineering/'
const KMK_AGREEMENT =
  'https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/aktuell/283_Vereinb_Anerkenn_Int_Baccalaureate_Diploma-2023-06-15_Liste1__2026-03-26_Liste2-2026-05-22.pdf'

const NOTES =
  "Content 7 (Part B1, 12 October 2026): German model (a), owner, 12 October 2026. Joint degree of TUM and SIT, taught in Singapore and applied for through SIT's portal (mid-January to mid-March). TUM Asia's program page states the IB conditions: the KMK's (two languages, a science, a social science, a 4 or better in all six, 24 points) with maths at HL, so 24 points and rows for maths HL, a KMK science and a KMK social science, all critical. Stamped 2027: \"Next intake September 2027\". Moved from TUM to SIT on 12 October 2026 (decision 8); campus city cleared, as SIT's city is Singapore. The stored Maths HL 5, Physics HL 5 and German B HL 5 rows were January 2026 field templates with no source."

const refresh: RefreshFile = {
  university: 'Singapore Institute of Technology',
  entryYear: 2027,
  checkedOn: '2026-10-12',
  programs: [
    // Stored: checked for 2027 entry on 2026-10-12.
    {
      id: 'cmkraexci003d7mjvujybfiyj',
      status: 'current',
      name: 'Chemical Engineering (Joint Degree with TUM)',
      description:
        "Jointly awarded by TUM and Singapore Institute of Technology (SIT), the Bachelor of Engineering with Honours in Chemical Engineering is a four-year degree program. This joint degree equips students with relevant Industry 4.0 skillsets to thrive in the local and global chemical industry.\n\nHow it is decided: you apply through the Singapore Institute of Technology's portal, from mid-January to mid-March, for the September 2027 intake. TUM Asia, which teaches the program with SIT, applies Germany's IB conditions, with maths at HL. Teaching is in English, in Singapore.",
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/chemical-engineering-bachelor-of-engineering-beng',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [TUM_ASIA_CHE, KMK_AGREEMENT],
      notes: NOTES
    },
    // Stored: checked for 2027 entry on 2026-10-12.
    {
      id: 'cmkraezlf00517mjvalf8bv2n',
      status: 'current',
      name: 'Electronics and Data Engineering (Joint Degree with TUM)',
      description:
        "Jointly awarded by TUM and Singapore Institute of Technology (SIT), the Bachelor of Engineering with Honours in Electronics and Data Engineering is a four-year degree programme. This programme is aimed to equip students with the necessary skills and competencies in the emerging digital workforce.\n\nHow it is decided: you apply through the Singapore Institute of Technology's portal, from mid-January to mid-March, for the September 2027 intake. TUM Asia, which teaches the program with SIT, applies Germany's IB conditions, with maths at HL. Teaching is in English, in Singapore.",
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl:
        'https://www.tum.de/en/studies/degree-programs/detail/electronics-and-data-engineering-bachelor-of-engineering-beng',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        {
          courses: ['ANTHRO', 'BUS-MGMT', 'ECON', 'GEOG', 'GLOB-POL', 'HIST', 'PHIL', 'PSYCH'],
          level: 'SL',
          grade: 4,
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [TUM_ASIA_EDDE, KMK_AGREEMENT],
      notes: NOTES
    }
  ]
}

export default refresh
