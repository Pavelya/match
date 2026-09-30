import type { RefreshFile } from '../lib/refresh'

/**
 * Universidad Complutense de Madrid: requirements for 2027 entry.
 *
 * Exported from the database on 2026-09-30 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts universidad-complutense-de-madrid
 */
const refresh: RefreshFile = {
  university: 'Universidad Complutense de Madrid',
  entryYear: 2027,
  checkedOn: '2026-09-30',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8wwgvu00017mtp7ko1blpi',
      status: 'current',
      name: 'Bachelor of European Studies (BAES)',
      description:
        "In this unique joint programme, organised by eight research-intensive universities within the Una Europa alliance, you will study the fundamental aspects and values of the European Union as well as European states and societies. Adopting a multidisciplinary approach, you will reflect on the role of Europe in the world and master research skills to analyse key issues related to Europe. Through our extensive mobility programme, you will not only learn about Europe, but also experience, live and grow in an international setting. The programme (180 ECTS) spans three years, divided into six semesters. In semesters 1, 2 and 3 (92 ECTS), you follow the truncus communis, including introductory courses to various disciplines, multidisciplinary courses on Europe, a methodology track and language courses. In semesters 4, 5 and 6, you choose a major (60 ECTS) and a minor module (18 ECTS) and you develop a bachelor's thesis (10 ECTS, includes laboratory).",
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 30,
      programUrl: 'https://www.ucm.es/baes',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.ucm.es/baes/admission',
        'https://ghum.kuleuven.be/EN/baes/apply',
        'https://www.ucm.es/baes'
      ],
      notes:
        'The Una Europa joint Bachelor of Arts in European Studies (three years, 180 ECTS), awarded by Complutense with KU Leuven, Bologna and Jagiellonian; Complutense is a start university. Applicants apply through KU Leuven, the coordinator, which assesses "capacity and suitability" on a reading and writing assignment, a video pitch and an English test (TOEFL iBT 90, IELTS 6.5, C1 Advanced 176 and equivalents; the IB is not among the exemptions). No IB points figure is published: the stored 30 is kept, unverified. Checked, none required: no subject is named. Both pages describe 2026-27 (deadline 1 April 2026); KU Leuven says applications for 2027-28 open in autumn 2026, so stamped 2026.'
    }
  ]
}

export default refresh
