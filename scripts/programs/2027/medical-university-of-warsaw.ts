import type { RefreshFile } from '../lib/refresh'

/**
 * Medical University of Warsaw: requirements for 2027 entry.
 *
 * Exported from the database on 2026-10-02 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts medical-university-of-warsaw
 */
const refresh: RefreshFile = {
  university: 'Medical University of Warsaw',
  entryYear: 2027,
  checkedOn: '2026-10-02',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmkx352j3000bi604g8p3ms39',
      status: 'current',
      name: '6-year Medicine Program (MD)',
      description:
        'Long-cycle MD program focused on scientific foundations and clinical practice across pre-clinical and clinical years, including mandatory summer.',
      field: 'Medicine & Health',
      degree: "Single-Cycle Master's Degree",
      duration: '6 years',
      minIBPoints: 36,
      programUrl: 'https://ed.wum.edu.pl/pl/node/993',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://rekrutacja-info.wum.edu.pl/sites/rekrutacja-info.wum.edu.pl/files/uchwala_senatu_42-2026_zalacznik_zalacznik_17.pdf',
        'https://rekrutacja-info.wum.edu.pl/sites/rekrutacja-info.wum.edu.pl/files/uchwala_senatu_42-2026_zalacznik_zalacznik_19.pdf',
        'https://ed.wum.edu.pl/pl/admissions-criteria',
        'https://ed.wum.edu.pl/pl/node/993'
      ],
      notes:
        "Content 4.8: Medical University of Warsaw Senate Resolution 42/2026 (29 June 2026) sets admission for 2027/2028; Attachment 17 covers this paid English programme. Result = 20% school-subject points + 80% of five times the points of a WUM competency test in English (biology, chemistry, reasoning), or for applicants with a foreign school document a UCAT, BMAT, MCAT, GAMSAT or HPAT result instead of the test. IB holders are scored on Biology HL and Chemistry HL, plus Physics (SL x0.6, HL x1.0) or Maths (AI SL x0.5, AA SL x0.6, HL x1.0), converted under Attachment 19. A missing subject can be made up by WUM's own exam in it (at most two, pass at 30/100), so the subjects are mandatory but not fatal. No minimum grade is named; stored as 4. The IB Diploma is accepted as proof of English. The stored rows asked Biology and Chemistry at HL (not critical) plus Maths and Physics both; now Physics or Maths, all three critical. No IB points figure is published: the stored points are kept, unverified. Long-cycle master's (jednolite studia magisterskie)."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkx30rby0001i6048q3p96fv',
      status: 'current',
      name: 'Doctor of Dental Medicine (DMD)',
      description:
        'Five-year EU-standard DMD program (~300 ECTS, >5000 hours) with early clinical exposure at the University Dental Center, followed by progressively intensive pre-clinical and clinical training.',
      field: 'Medicine & Health',
      degree: "Single-Cycle Master's Degree",
      duration: '5 years',
      minIBPoints: 34,
      programUrl: 'https://wls.wum.edu.pl/node/1099',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://rekrutacja-info.wum.edu.pl/sites/rekrutacja-info.wum.edu.pl/files/uchwala_senatu_42-2026_zalacznik_zalacznik_18.pdf',
        'https://rekrutacja-info.wum.edu.pl/sites/rekrutacja-info.wum.edu.pl/files/uchwala_senatu_42-2026_zalacznik_zalacznik_19.pdf',
        'https://ed.wum.edu.pl/pl/admissions-criteria',
        'https://wls.wum.edu.pl/node/1099'
      ],
      notes:
        "Content 4.8: Medical University of Warsaw Senate Resolution 42/2026 (29 June 2026) sets admission for 2027/2028; Attachment 18 covers this paid English programme. Result = 20% school-subject points + 80% of five times the points of a WUM competency test in English (biology, chemistry, reasoning), or a DAT, UCAT, BMAT, MCAT, GAMSAT or HPAT result instead of the test. IB holders are scored on Biology HL and Chemistry HL, plus Physics (SL x0.6, HL x1.0) or Maths (AI SL x0.5, AA SL x0.6, HL x1.0), converted under Attachment 19. A missing subject can be made up by WUM's own exam in it (at most two, pass at 30/100), so the subjects are mandatory but not fatal. No minimum grade is named; stored as 4. The IB Diploma is accepted as proof of English. The stored rows asked Biology and Chemistry at SL; WUM scores them at HL. Physics or Maths, not both. No IB points figure is published: the stored points are kept, unverified. Long-cycle master's (jednolite studia magisterskie)."
    }
  ]
}

export default refresh
