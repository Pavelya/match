import type { RefreshFile } from '../lib/refresh'

/**
 * University of Basel: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-basel
 */
const refresh: RefreshFile = {
  university: 'University of Basel',
  entryYear: 2027,
  checkedOn: '2026-09-30',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmloykf5v0001ld0403fdv0ph',
      status: 'current',
      name: 'English',
      description:
        'Anyone who studies English opens up a global horizon. Today, English is more widespread than any other language and thus of the utmost importance internationally, especially in business and science. However, the Anglophone culture also influences other areas of our daily life such as media, film, music or advertising. In English studies, the enormous diversity of the linguistic, literary and socio-cultural phenomena of the English-speaking world in the present and past is taken into account. These analyses lead not least to a better understanding of global and local cultural changes as well as social and political challenges that arise with English as the most important lingua franca. This is supported at the University of Basel by a highly cultural and interdisciplinary approach. The degree programme is divided into the three areas of literary studies, linguistics and language education.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 32,
      programUrl:
        'https://www.unibas.ch/en/Studies/Before-My-Studies/Degree-Programs/Degree-Programs.html?study=Englisch-BA&degree=bachelor&language=english&view=list',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'CS', 'DES-TECH', 'ESS', 'MATH-AA', 'MATH-AI', 'PHYS', 'SEHS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unibas.ch/en/Studies/Before-My-Studies/Application-Admission/Admission/Admission-to-the-bachelor-s-degree-program/Admission-to-bachelor-s-studies-with-foreign-educational-qualifications/Admission-with-the-International-Baccalaureate-Diploma-IB.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unibas.ch/en/Studies/Before-My-Studies/Degree-Programs/Degree-Programs.html?study=Englisch-BA&degree=bachelor&language=english&view=list'
      ],
      notes:
        'First check (never verified before). Basel\'s IB page: the IB Diploma gives access to every bachelor\'s programme with at least 32 out of 42 points without bonus points (stored as published), in six subjects, one per category: first language, second language, one of History, Geography, Economics or Business Management, one of Physics, Biology or Chemistry, Mathematics AA or AI (Math Studies not accepted), and an elective; one group 4 or 5 subject at HL. No subject grade is named, so 4. The stored requirement (any one science or maths at SL, Biology at 3) had no source. The page names no intake and swissuniversities\' list is for 2026/27, so stamped 2026. English is one of two subjects (75 credits each) in a Bachelor of Arts of 180 credits, taught mainly in English: stored as "Englisch", a plain "Bachelor", under Social Sciences.'
    }
  ]
}

export default refresh
