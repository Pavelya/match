import type { RefreshFile } from '../lib/refresh'

/**
 * University of Tartu: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-tartu
 */
const refresh: RefreshFile = {
  university: 'University of Tartu',
  entryYear: 2027,
  checkedOn: '2026-10-03',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmko2p6ou0001jv04esez53ep',
      status: 'current',
      name: 'Business Administration',
      description:
        "The Business Administration bachelor's programme is one of the two most highly assessed specialisations across the University of Tartu based on student satisfaction with the programme. Find your path during your studies – our courses, student clubs, projects and professors support your journey.",
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://ut.ee/en/curriculum/business-administration',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://ut.ee/en/curriculum/business-administration',
        'https://ut.ee/en/content/calculation-admissions-scores',
        'https://ut.ee/en/content/country-specific-requirements',
        'https://ut.ee/en/english-language-requirements'
      ],
      notes:
        "Content 4.8b: the curriculum page still describes the 2026 intake (applications 2 January to 15 April, results 1 June) and says the 2027 deadlines, requirements and entrance exams will be added by the end of December, so stamped 2026. Each part of the score must give at least 51 of 100 points and the total at least 66. Higher secondary education (IB students may apply with predicted grades) and English, which an IB Diploma completed in English meets. Ranked on a motivation letter (60%) and an online maths entry test (40%, 18-22 May 2026). Checked, none required: school results are not scored, and the stored Maths HL 5 and English rows had no source. No IB figure is published and selection does not use school results, so 24 under 4.8a's approved policy (stored 34, no source). Degree: Bachelor of Arts in Social Sciences."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmko2jn1t0004jo04u24uc6kp',
      status: 'current',
      name: 'Science and Technology',
      description:
        "The three-year international bachelor's programme in Science and Technology offers innovative content that draws on key areas taught in the Faculty of Science and Technology. It provides a broad overview of natural and exact sciences and technologies.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 34,
      programUrl: 'https://ut.ee/en/curriculum/science-and-technology',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://ut.ee/en/curriculum/science-and-technology',
        'https://ut.ee/en/content/calculation-admissions-scores',
        'https://ut.ee/en/content/country-specific-requirements',
        'https://ut.ee/en/english-language-requirements'
      ],
      notes:
        'Content 4.8b: the curriculum page still describes the 2026 intake (applications 2 January to 15 April, results 1 June) and says the 2027 deadlines, requirements and entrance exams will be added by the end of December, so stamped 2026. Each part of the score must give at least 51 of 100 points and the total at least 66. Higher secondary education (IB students may apply with predicted grades) and English, which an IB Diploma completed in English meets. Ranked on five parts, 20% each: the school result in Mathematics, the best school result in Biology, Chemistry or Physics, a motivation letter, an online entry test (8-9 May 2026) and an interview (14-22 May 2026). Both school results are conditions, so critical; Tartu does not publish in English how an IB grade becomes points, so they are stored at SL 4. The stored rows asked HL 5 in both and English. No IB figure is published and selection scores school results, so the stored 34 is kept, unverified, as 4.8a did for Poland.'
    }
  ]
}

export default refresh
