import type { RefreshFile } from '../lib/refresh'

/**
 * Centrale Nantes: its Bachelor of Science in Engineering, added for content task 5.3 (France) and created, with the university, on 8 October 2026.
 * Its other English bachelor's, the four-year BBA Data, AI & Management with Audencia, says "No
 * recruitment in 2026-27", so it is not added.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts centrale-nantes
 */

const BSC = 'https://www.ec-nantes.fr/study/undergraduate/bachelor-of-science-in-engineering'
const ADMISSIONS =
  'https://www.ec-nantes.fr/undergraduate/bachelor-of-science-in-engineering/bachelor-of-science-admissions'
const FEES = 'https://www.ec-nantes.fr/english-version/study/tuition-fees-1'

const refresh: RefreshFile = {
  university: 'Centrale Nantes',
  entryYear: 2027,
  checkedOn: '2026-10-08',
  programs: [
    {
      id: 'cmuzj2p9t001d6x7ml962uuc8',
      status: 'current',
      name: 'Engineering',
      description:
        "Centrale Nantes's Bachelor of Science in Engineering is a three-year programme taught entirely in English to an international cohort in Nantes, accredited by the CTI, France's engineering accreditation body. The first two years build foundations in mathematics, physics, computer science, engineering, numerics and control; in the third year students choose a project-based specialisation in mechanical engineering, fluids and energy, civil engineering, or signal, control and robotics. A third of the programme covers business, social sciences and languages, and students complete a six-week internship after the second year and a 16-week internship in the final year. French classes run throughout; no French is needed at entry.\n\nThe programme takes school leavers under 22 with a high school diploma in science or equivalent. Applicants send two years of school records, which must show mathematics and science, a CV, a cover letter and two recommendations, one from a science teacher, on Centrale Nantes's eCandidat platform; shortlisted applicants have a video interview. Applications are reviewed in rounds, and early applicants pay less in the first year.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: BSC,
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS', 'CHEM', 'BIO'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: [ADMISSIONS, BSC, FEES],
      notes:
        'Content 5.3: new. "Applications for the 2027-28 intake open on 28 October 2026"; "22 places are available for international candidates for the September 2027 intake"; final deadline 17 May 2027 (FAQ). Stamped 2027. IB rule: "Open to students holding or completing a high school diploma in science or equivalent", under 22. Selection: academic results 60% ("Two-years of academic records must be provided and show courses in mathematics and/or sciences"), English 20% (TOEFL 78, TOEIC 800, IELTS 6.0, Cambridge B2 First 173 or C1 Advanced 160; waived for schooling in English), then motivation and the interview; top candidates may get a direct offer. No minimum score, so 24, the Diploma. Subjects: stored as Maths AA or AI and one of Physics, Chemistry or Biology at SL, grade 4 as none is named, not critical: the rule is "mathematics and/or sciences", which the model cannot hold exactly. French applicants in France apply on Parcoursup. Fees: €12,000 a year, guaranteed for the programme; €1,500 off the first year for international applicants who apply before 2 December 2026 and pay within a month, €500 before 18 January 2027. Contact: admission@ec-nantes.fr. No "How competitive" paragraph: no admission figures are published. Field: Engineering (8.1).'
    }
  ]
}

export default refresh
