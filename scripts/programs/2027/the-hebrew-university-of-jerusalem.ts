import type { RefreshFile } from '../lib/refresh'

/**
 * The Hebrew University of Jerusalem: the International BA of its Rothberg International School,
 * taught in English, added for content task 5.2. The page takes applications for 2026/27 (deadline
 * 1 August 2026) and names no 2027 dates, so stamped 2026.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts the-hebrew-university-of-jerusalem
 */

const BA = 'https://overseas.huji.ac.il/academics/ba/'

const refresh: RefreshFile = {
  university: 'The Hebrew University of Jerusalem',
  entryYear: 2027,
  checkedOn: '2026-10-05',
  programs: [
    {
      status: 'new',
      name: 'International BA (double major: Liberal Arts, Business Administration, English)',
      description:
        "The Rothberg International School's International BA lets students complete a double-major degree in English in three years on the Hebrew University's Mount Scopus campus in Jerusalem, choosing two of three fields: liberal arts, business administration and English. Students can add a semester- or year-long internship, and can go straight on to a one-year international MA, earning both degrees within four years.\n\nAdmission is decided by committee: direct admission with SAT or ACT scores, or a test-optional track that adds a first year in the school's study abroad programme.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: BA,
      requirements: [],
      checkedFor: 2026,
      sources: [BA, 'https://en.huji.ac.il/university-numbers'],
      notes:
        "Content 5.2: new. Admissions criteria on the programme page: direct admission requires SAT or ACT scores (AP results may be considered instead) and takes 3 years; the test-optional track needs no scores but begins with a year in the first-year study abroad programme, completed with an average of 80, so the degree takes 4 years. The IB is not named as a replacement for SAT or ACT. Applicants submit transcripts and any AP or matriculation results. The business track needs an advanced maths exam or preparatory courses (Algebra II, calculus), and combined business tracks need business's minimum scores; the English track adds a writing workshop for students from non-English-speaking countries. No IB points figure or subject is published, so 24, the Diploma; checked, none required. Applications for 2026/27 closed 1 August 2026; no 2027/28 dates yet, so stamped 2026. Tuition US$15,500 a year. Contact: risundergrad@savion.huji.ac.il."
    }
  ]
}

export default refresh
