import type { RefreshFile } from '../lib/refresh'

/**
 * University of Tokyo: requirements for 2027 entry.
 *
 * Exported from the database on 2026-10-03 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-tokyo
 */
const refresh: RefreshFile = {
  university: 'University of Tokyo',
  entryYear: 2027,
  checkedOn: '2026-10-03',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmljqlhu20005jj04y7gx6i0b',
      status: 'discontinued',
      name: 'International Program on Environmental Sciences (PEAK, Komaba)',
      description:
        'The goal of the Environmental Sciences Program is to provide students with a broad-based, inter- and multidisciplinary understanding of Environmental Systems and Global Sciences. This is achieved by exploiting the expertise of many world experts from a large number of different disciplines, in a coherent teaching program based on six key areas. These key areas focus on both the scientific and social science aspects and details of each of them are provided below.',
      field: 'Environmental Studies',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://peak.c.u-tokyo.ac.jp/courses/es/index.html',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6, critical: false }
      ],
      checkedFor: null,
      sources: [
        'https://web.archive.org/web/20260521201451/https://www.peak.c.u-tokyo.ac.jp/apply/index.html',
        'https://www.u-tokyo.ac.jp/en/prospective-students/undergraduate_english.html'
      ],
      notes:
        'Content 4.8b: discontinued. PEAK\'s own admissions page: "The Admission for September 2026 Enrollment will be the last student recruitment for the PEAK" (Internet Archive copy of 21 May 2026). peak.c.u-tokyo.ac.jp now answers 404 or 403 and its certificate expired on 30 September 2026; UTokyo\'s page of undergraduate programmes in English lists only the Global Science Course, a third-year transfer. No intake in 2027: for the owner to decide (refresh rule 3).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljqhgdd0003jj04242tc070',
      status: 'discontinued',
      name: 'International Program on Japan in East Asia (PEAK, Komaba)',
      description:
        "The Japan in East Asia Program aims to provide students with a wide range of social science and humanities courses to develop an advanced understanding of Japanese/East Asian politics, economy, society and culture in a global context. The program is organized so that students will be able to receive a Bachelor's degree by taking classes that are taught in English. The curriculum reflects sixty years of experience and continuous improvement and innovation in liberal arts education at the College of Arts and Sciences.",
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 36,
      programUrl: 'https://peak.c.u-tokyo.ac.jp/courses/jea/index.html',
      requirements: [],
      checkedFor: null,
      sources: [
        'https://web.archive.org/web/20260521201451/https://www.peak.c.u-tokyo.ac.jp/apply/index.html',
        'https://www.u-tokyo.ac.jp/en/prospective-students/undergraduate_english.html'
      ],
      notes:
        'Content 4.8b: discontinued. PEAK\'s own admissions page: "The Admission for September 2026 Enrollment will be the last student recruitment for the PEAK" (Internet Archive copy of 21 May 2026). peak.c.u-tokyo.ac.jp now answers 404 or 403 and its certificate expired on 30 September 2026; UTokyo\'s page of undergraduate programmes in English lists only the Global Science Course, a third-year transfer. No intake in 2027: for the owner to decide (refresh rule 3).'
    }
  ]
}

export default refresh
