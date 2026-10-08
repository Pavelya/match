import type { RefreshFile } from '../lib/refresh'

/**
 * EDHEC Business School: the Global Business Track of its International BBA, added for content
 * task 5.3 (France) and created on 8 October 2026. The owner chose, on 8 October 2026, a few leading private schools alongside
 * the public institutions. The BBA's Business Management Track is for applicants "proficient in
 * French and English", so it is not added; EDHEC's International Business Analytics and
 * Management BSc was not researched.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts edhec-business-school
 */

const GBT = 'https://www.edhec.edu/en/programmes/bba/degrees/global-business-track'
const ADMISSIONS =
  'https://www.edhec.edu/en/programmes/bba/admissions-and-tuition-fees/international-admissions'

const refresh: RefreshFile = {
  university: 'EDHEC Business School',
  entryYear: 2027,
  checkedOn: '2026-10-08',
  programs: [
    {
      id: 'cmuzj2pqh001r6x7mtzkuqxkz',
      status: 'current',
      name: 'International BBA: Global Business Track',
      description:
        "The Global Business Track of EDHEC's International BBA is a four-year business degree taught entirely in English across three continents. Students spend the first year on EDHEC's campus in Nice, studying business management, economics, accounting, law and marketing through business games and projects; the second at UCLA Extension in Los Angeles, in its International Trade and Commerce concentration; and the third and fourth at Nanyang Technological University in Singapore, with long internships between periods of study. Graduates receive the EDHEC International BBA, accredited by the French ministry, with certificates from UCLA Extension and NTU. Places are limited.\n\nOnly the full IB Diploma is accepted. Applicants apply online in one of five rounds between October and June with transcripts for the last three semesters, a CV and a one-page personal statement; EDHEC gives priority to grades in science, mathematics, economics, humanities and languages. They then complete the Emage-me personality app and an online English assessment, and have an online interview.",
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      campusCity: 'Nice',
      minIBPoints: 24,
      programUrl: GBT,
      requirements: [],
      checkedFor: 2027,
      sources: [ADMISSIONS, GBT],
      notes:
        'Content 5.3: new. Entry year: the five application rounds run from 1 October 2026 to 8 June 2027 (round 1: apply by 3 November 2026, interviews 26 November to 8 December, results 17 December 2026), and the track page gives "Tuition fees applicable for the 2027 intake", so stamped 2027. IB rule: "Only the IB Diploma Programme is considered for admission. IB Certificates and IB Career Related Programme (CP) are not valid for admission", and "retakes in November 2026 will not be accepted". No minimum score, so 24, the Diploma. Checked, none required: "Priority should be given to grades in Science, Mathematics, Economics, Humanities, as well as your first and second languages", which ranks applications but requires no subject. Where taught: year 1 EDHEC Nice, year 2 UCLA Extension (Los Angeles), years 3-4 NTU (Singapore); campusCity Nice, as EDHEC\'s seat is Lille. Fees: €23,900 a year for the 2027 intake (full four-year payment; a monthly plan costs 2% more); deposit €5,000; application fee €100. Contact: bba.international.admissions@edhec.edu. No "How competitive" paragraph: no admission figures are published. Field: a business school\'s BBA is Business & Economics (5.3 brief).'
    }
  ]
}

export default refresh
