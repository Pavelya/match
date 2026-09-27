import type { RefreshFile } from '../lib/refresh'

/**
 * Tel Aviv University: requirements for 2027 entry.
 *
 * Exported from the database on 2026-09-26 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts tel-aviv-university
 */
const refresh: RefreshFile = {
  university: 'Tel Aviv University',
  entryYear: 2027,
  checkedOn: '2026-09-26',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkm7ies700057m12v5mz5vup',
      status: 'current',
      name: 'BA in Management and Liberal Arts',
      description:
        "The BA in Management & Liberal Arts will provide you with a relevant, comprehensive education in management and entrepreneurship studies, combined with a rich foundation in the humanities and social sciences. Offered as a joint program by Tel Aviv University's management and humanities faculties, this BA program will prepare you for success in the global job market that values employees with multidisciplinary academic training.",
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 28,
      programUrl: 'https://international.tau.ac.il/mgmt_libarts',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }],
      checkedFor: null,
      sources: [
        'https://international.tau.ac.il/mgmt_libarts',
        'https://international.tau.ac.il/ajax/registration/sp_get_main_content/1055/5'
      ],
      notes:
        'Not checked: TAU publishes no IB points minimum. The Admissions tab, for the fall 2026/27 intake (deadline 10 September 2026), asks for a high school GPA of 3.0, maths at the level of AP Calculus AB with 90, English proficiency, an essay and two letters, and lists the IB among accepted entrance exams. The stored 28 points and Maths SL5 have no official source. 2027/28 is not published yet.'
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkm7if4b000b7m12ijrm0shc',
      status: 'current',
      name: 'Buchmann-Mehta School of Music International Program (BMus)',
      description:
        "The Buchmann-Mehta School of Music was founded in 2005 as a unique partnership between Tel-Aviv University (TAU) and the Israel Philharmonic Orchestra (IPO). Its establishment was made possible through the generosity of philanthropist Josef Buchmann, the School's patron. Maestro Zubin Mehta, the esteemed former IPO Music Director, serves as BMSM's Honorary President. All applicants must perform an audition. Entrance/placement theory exam is required.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Music',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: 'https://international.tau.ac.il/bmsm_program_ba',
      requirements: [],
      checkedFor: null,
      sources: [
        'https://international.tau.ac.il/bmsm_program_ba',
        'https://international.tau.ac.il/ajax/registration/sp_get_main_content/1059/1'
      ],
      notes:
        'Not checked: admission is by audition and a theory exam (audition dates 2026–2027); TAU publishes no IB points minimum. The stored 24 is the Diploma pass mark, with no official source.'
    },
    // Stored: checked for 2026 entry on 2026-01-20. Degree stored as "Bachelor of Arts (Dual Degree)".
    {
      id: 'cmkm7iejx00037m12ntaa8sg3',
      status: 'current',
      name: 'Dual Degree BA Program: TAU & Columbia University',
      description:
        "This four-year B.A. program provides you with an exciting, mind-expanding opportunity to gain two bachelor's degrees, one from Tel Aviv University and the other from Columbia University. Enjoy the best of two amazing cities - first discover Tel Aviv's non-stop culture and innovative spirit, before continuing your education in the metropolis of New York! The first two years at TAU consist of 80 credits, of which you can transfer up to 60 eligible points toward your degree requirements to Columbia. After completing your second year at TAU, you will matriculate at the Columbia University School of General Studies (GS) where you will further your studies, choosing from Columbia's liberal arts majors.",
      field: 'Arts & Humanities',
      degree: "Double Bachelor's Degree",
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://international.tau.ac.il/columbia_dual_degree',
      requirements: [],
      checkedFor: null,
      sources: ['https://international.tau.ac.il/columbia_dual_degree'],
      notes:
        "Not checked: TAU's program page gives no admission requirements, only contacts. The stored 32 points have no official source."
    },
    // Stored: checked for 2026 entry on 2026-01-20.
    {
      id: 'cmkm7ieay00017m12kdhbdbmu',
      status: 'current',
      name: 'International BA in Liberal Arts',
      description:
        "The International BA in Liberal Arts at Tel Aviv University puts you in charge of your education. By mixing and matching courses, you'll shape a degree that aligns with your passions, interests, and career goals. You'll select a total of four academic tracks for your undergraduate degree—a major, a minor, and two additional fields of study—from eight available options. Whether you're drawn to psychology and philosophy, or want to combine Jewish studies with entrepreneurship, this undergraduate program gives you the freedom to customize your learning experience in Israel.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://international.tau.ac.il/Liberal_Arts/?id=term-1',
      requirements: [],
      checkedFor: null,
      sources: ['https://liberal-arts.tau.ac.il/admission_requirements'],
      notes:
        'Not checked: for 2026-27 admission, a minimum 80 average on the high school transcript, SAT/ACT optional, two letters and an essay. The IB counts only for credit (grade 5+). TAU publishes no IB points minimum; the stored 24 has no official source.'
    }
  ]
}

export default refresh
