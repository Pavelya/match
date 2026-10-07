import type { RefreshFile } from '../lib/refresh'

/**
 * Dalarna University: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts dalarna-university
 */
const refresh: RefreshFile = {
  university: 'Dalarna University',
  entryYear: 2027,
  checkedOn: '2026-10-02',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmm0r470l0001ky041vfc0uku',
      status: 'current',
      name: 'International Tourism Management',
      description:
        "Who is a tourist? Why do they visit particular destinations? How can we create sustainable practices and places? Do you question the way the world works and want to know how tourism can help people, what tourism can do for communities and what the challenges for the future of tourism are? If so, you are encouraged to apply to our Bachelor's Programme in International Tourism Management and become a part of an international community.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      // Campus, 7 October 2026: program page: "Location Borlänge"
      campusCity: 'Borlänge',
      minIBPoints: 24,
      programUrl:
        'https://www.du.se/en/study-at-du/programmes-courses-and-course-packages/programmes/international-tourism-management/',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 3, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://www.du.se/en/study-at-du/programmes-courses-and-course-packages/programmes/international-tourism-management/',
        'https://www.du.se/en/study-at-du/Program/programme-syllabus/?code=STMGG',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: the Autumn 2027 instance (application code HDA-H3SMU, Borlänge, application 15 October-15 January) asks general entry requirements plus Mathematics 2a, 2b or 2c, English 6 and Social Sciences 1b or 1a1+1a2. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. The stored English HL 6, a social-science group at HL 5 and Maths HL 5 had no source and are replaced. Selection: final school grades 66% and the Swedish aptitude test 34%. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored (was 30). The syllabus leads to a Bachelor of Science in Tourism Studies (180 credits, 3 years)."
    }
  ]
}

export default refresh
