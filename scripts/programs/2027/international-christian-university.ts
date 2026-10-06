import type { RefreshFile } from '../lib/refresh'

/**
 * International Christian University: the College of Liberal Arts through English Language Based
 * Admissions, added for content task 5.2 and created, with the university, on 6 October 2026. The schedule for April and September 2027 entry is
 * published, so stamped 2027.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts international-christian-university
 */

const APPLY = 'https://www.icu.ac.jp/en/admissions/undergraduate/engdoc/'

const refresh: RefreshFile = {
  university: 'International Christian University',
  entryYear: 2027,
  checkedOn: '2026-10-05',
  programs: [
    {
      id: 'cmuw8afd2001d047m9qyw085u',
      status: 'current',
      name: 'Liberal Arts',
      description:
        'ICU has a single College of Liberal Arts in Mitaka, western Tokyo, where students explore many fields before choosing one of more than 30 majors, as a single major, double major or major and minor, before their third year. Teaching is bilingual in Japanese and English: students admitted through English Language Based Admissions need no Japanese to enter and study it intensively at ICU.\n\nThey enter in April or September, after a review of their documents and, for some school systems, an online interview.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: APPLY,
      requirements: [],
      checkedFor: 2027,
      sources: [
        APPLY,
        'https://www.icu.ac.jp/en/admissions/undergraduate/engdoc/schedules/',
        'https://www.icu.ac.jp/en/admissions/undergraduate/engdoc/documents/',
        'https://www.icu.ac.jp/en/admissions/undergraduate/faq/',
        'https://www.icu.ac.jp/en/academics/undergraduate/major/'
      ],
      notes:
        "Content 5.2: new. English Language Based Admissions 2027: April 2027 entry, application 1-8 October 2026 (decisions 1 December 2026); September 2027 entry, first period 6-14 January 2027 (Type A only) and second period 15-25 February 2027 (Type A and B). Applicants apply as Type A (documents only) or Type B (documents and an online interview) according to their educational system (Japanese, U.S. and U.K. systems Type A; a Canadian school, for example, Type B); for Type A, IB Diploma grades, final or predicted, suffice and SAT or ACT is then not needed (FAQ). Only the full IB Diploma counts (not IB Course Certificates or the IBCP). Minimum scores are set only for English tests (IELTS 6.5, TOEFL iBT 79 or 4.5 on the new scale); no IB points figure or subject is named, so 24, the Diploma; checked, none required. One application term only, no deferral, and a year's wait before reapplying. Stamped 2027. Bachelor of Arts in Liberal Arts."
    }
  ]
}

export default refresh
