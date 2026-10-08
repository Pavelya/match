import type { RefreshFile } from '../lib/refresh'

/**
 * Centrale Lille Institut: the Bachelor's degree in Management and Engineering Sciences that its
 * school ITEEM teaches with SKEMA Business School, added for content task 5.3 (France) and created, with the university, on 8 October 2026.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts centrale-lille-institut
 */

const BACHELOR =
  'https://iteem.centralelille.fr/en/bachelor-en-management-et-sciences-de-lingenieur/'
const ADMISSIONS = 'https://iteem.centralelille.fr/en/admissions-bachelor/'
const CONTENT = 'https://iteem.centralelille.fr/en/contenu-academique-bachelor/'

const refresh: RefreshFile = {
  university: 'Centrale Lille Institut',
  entryYear: 2027,
  checkedOn: '2026-10-08',
  programs: [
    {
      id: 'cmuzj2pec001j6x7mk4ot7bz9',
      status: 'current',
      name: 'Management and Engineering Sciences',
      description:
        "This four-year Bachelor's degree is taught in English by ITEEM, an engineering school of Centrale Lille Institut, and SKEMA Business School, and carries the grade de licence. It combines management with engineering for the digital and energy transitions: calculus, linear algebra, programming, thermodynamics and machine learning alongside economics, marketing, accounting and project management, then renewable energies, power grids and environmental engineering. Years 1, 2 and 4 are on ITEEM's campus in Villeneuve-d'Ascq, near Lille; the third year is international, with a semester on one of SKEMA's campuses in the United States, Brazil, China or South Africa and a semester's internship abroad. It ends with a company internship and a bachelor thesis.\n\nIB applicants take the school's own entrance examination: a review of their school record, a 90-minute mathematics test and a 30-minute English test, both multiple choice, then, if they pass, a 20-minute video interview in English.",
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: BACHELOR,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }],
      checkedFor: 2026,
      sources: [ADMISSIONS, BACHELOR, CONTENT],
      notes:
        'Content 5.3: new. IB rule (admissions page): "Holders of a baccalaureate or its equivalent"; "If you have an International Baccalaureate or its equivalent? You will be admitted through your own entrance examination": school record, mathematics test (1h30, in English) and English communication test (30 min), both MCQ, then for those eligible a 20-minute video interview in English (team spirit, extra-curricular commitment, fit with the project). No minimum score, so 24, the Diploma. Subjects: for the French baccalaureate "Mathematics specialisation in final year compulsory", "Second scientific specialisation optional but preferable"; for the IB stored as Maths AA or AI at SL, grade 4, not critical, as the school tests mathematics itself (model limit). Entry year: none of the pages names an intake; the brochure is "EN-2026", so stamped 2026 (rule 2). Fees: €14,000 a year. Where taught: years 1, 2 and 4 at ITEEM, Villeneuve-d\'Ascq (the French content page: "Les années 1, 2 et 4 se déroulent à l\'ITEEM"), with SKEMA courses in Lille; year 3 abroad. Degree: "Bachelor in Management and Engineering Sciences", Bac+4 with the grade de licence, co-accredited by the CTI and CEFDG; stored as "Bachelor". Contact: contact.iteem@centralelille.fr (ITEEM). No "How competitive" paragraph: no admission figures are published. Field: a joint degree goes to its first-named discipline, Management, in Business & Economics (8.1).'
    }
  ]
}

export default refresh
