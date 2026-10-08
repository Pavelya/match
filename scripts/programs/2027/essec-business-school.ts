import type { RefreshFile } from '../lib/refresh'

/**
 * ESSEC Business School: the English track of its Global BBA on the Cergy campus, added for
 * content task 5.3 (France) and created on 8 October 2026. The owner chose, on 8 October 2026, a few leading private schools
 * alongside the public institutions. The Global BBA's other first-year tracks are in French
 * (Cergy, Rabat) or outside France (Singapore, Rabat), so they are not added. Its joint Bachelor
 * in AI, Data & Management Sciences with CentraleSupélec is stored under CentraleSupélec.
 *
 * The programme page is a Next.js app; the admission calendar, fees and requirements were read
 * from the page data embedded in its HTML.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts essec-business-school
 */

const GBBA = 'https://www.essec.edu/en/program/global-bba-international/'

const refresh: RefreshFile = {
  university: 'ESSEC Business School',
  entryYear: 2027,
  checkedOn: '2026-10-08',
  programs: [
    {
      id: 'cmuzj2poh001p6x7mpzkg2k4g',
      status: 'current',
      name: 'Global BBA',
      description:
        "ESSEC's Global BBA is a four-year bachelor's in management that can be studied in English from the first year on ESSEC's historic campus in Cergy, 30 km north-west of Paris. The first two years cover the fundamentals of management (economics, marketing, accounting, statistics, business law and mathematics), with three modern languages and short professional projects, including one abroad. The last two years add a specialisation track, 10 to 12 months of internships or an apprenticeship, and at least six months at one of ESSEC's 189 partner universities; international double degrees and a semester on ESSEC's Singapore or Rabat campus are options. The degree is accredited as a bachelor's and allows students to continue straight into a one-year master's.\n\nApplicants with an international diploma, the IB included, apply on ESSEC's own platform in one of four rounds between October and April. ESSEC looks for an academic record well above average, with transcripts for the last three years and two academic references; shortlisted applicants have a video interview on their motivation and goals. An English test is required unless the last two years of school were taught entirely in English.",
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: GBBA,
      requirements: [],
      checkedFor: 2027,
      sources: [GBBA],
      notes:
        'Content 5.3: new. Entry year: the page\'s calendar is headed "Intake 2027" (round 1 deadline 28 October 2026, round 2 12 January 2027, round 3 10 March 2027, round 4 22 April 2027; interviews and results within about five weeks) and gives "Next intake: Cergy and Rabat: Sept 2027", so stamped 2027. IB rule: for students preparing "a high school diploma giving access to higher education such as the GCE A-Level, IB or other national diploma"; "Your academic record must be way above the average with consistent or increasing results", with transcripts for the last three years and two academic reference letters; interview by video for those shortlisted. No minimum score, so 24, the Diploma. Checked, none required: no subject is named for any diploma. English test required for the English tracks unless the last two years were taught entirely in English. Fees "Applicable for the 2026 intake", Cergy: tuition €15,400 a year for EU citizens and €17,383 for others, plus €2,000 registration a year and a service fee (programme total €72,253 EU, €80,340 non-EU); deposit €5,500; application fee €100. No admissions contact address on the page. No "How competitive" paragraph: no admission figures are published. Field: a business school\'s BBA is Business & Economics (5.3 brief); the name names no discipline, so the rule gives no warning.'
    }
  ]
}

export default refresh
