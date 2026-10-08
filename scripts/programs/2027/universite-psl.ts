import type { RefreshFile } from '../lib/refresh'

/**
 * Université PSL: its two bachelor's taught entirely in English, added for content task 5.3
 * (France) and created, with the university, on 8 October 2026. PSL's other bachelor's (the CPES, Dauphine's licences) are taught in French, and its
 * Bachelor in Sustainability Sciences admits into the third year only.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts universite-psl
 */

const AI = 'https://psl.eu/en/education/international-bachelor-science-ai'
const IBE3 = 'https://www.minesparis.psl.eu/en/education/i-be3/'
const CAMPUS_FRANCE = 'https://www.campusfrance.org/en/application-higher-education-france'

const refresh: RefreshFile = {
  university: 'Université PSL',
  entryYear: 2027,
  checkedOn: '2026-10-08',
  programs: [
    {
      id: 'cmuzj2ogy000p6x7mxq9qz3ry',
      status: 'current',
      name: 'Artificial Intelligence',
      description:
        'PSL\'s International Bachelor of Science in Artificial Intelligence is a three-year programme taught entirely in English in central Paris, as part of the Paris School of AI. Students master the mathematical and computer science foundations of AI in the first two years, with courses in economics, law and the societal questions AI raises, then specialise in natural language processing, computer vision and robotics, with a research or company internship and a final-year project.\n\nAdmission is on an application file, judged on academic results, English (C1) and motivation. PSL expects an excellent level in mathematics: applicants from other systems should have completed an advanced school mathematics curriculum covering limits, continuity, differentiation and integration. Most applicants apply on Parcoursup; those subject to Campus France\'s "Études en France" procedure apply there between 1 October and 15 December.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: AI,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: false }],
      checkedFor: 2026,
      sources: [AI, CAMPUS_FRANCE],
      notes:
        'Content 5.3: new. IB rule: "a foreign diploma with recognized equivalence, with strong academic results across all subjects"; selection "based on an application file, via the national Parcoursup portal", on academic excellence, language proficiency and motivation. No minimum score, so 24, the Diploma. Subjects: applicants from non-French systems are "expected" to have "completed an advanced high school mathematics curriculum" (limits, continuity, differentiation and integration, polynomial equations, basic arithmetic); the French equivalent is the Mathematics specialty with Expert Mathematics. Stored as Maths AA or AI at HL, grade 4 as none is named, not critical because the page says "expected". English C1. Entry year: the page gives "Tuition fees (sept. 2026 intake)" and the Parcoursup 2026 calendar; only its "Études en France" window (1 October to 15 December 2026) belongs to the 2027 round, without naming it, so stamped 2026 (rule 2). Fees for the 2026 intake: €0 to €14,900 by household income for EU tax residents, €19,500 otherwise. Taught in Paris 5e. No contact address on the page. No "How competitive" paragraph: no admission figures are published. Field: Artificial Intelligence lives in Computer Science (8.1).'
    },
    {
      id: 'cmuzj2olv000s6x7mxs5k19v3',
      status: 'current',
      name: 'Environmentally Engaged Engineering',
      description:
        "PSL's International Bachelor of Environmentally Engaged Engineering (I-BE³) is a three-year science and engineering degree taught entirely in English, developed by Mines Paris – PSL with Chimie ParisTech – PSL. The first two years are on Mines Paris's Pierre Laffitte campus in Sophia Antipolis, Europe's largest technology park, near Nice. Students learn by doing, with six engineering, entrepreneurial or research projects built around the UN Sustainable Development Goals (energy, water, sustainable cities, health), a solid grounding in engineering and data science, and a six-month international internship. French as a foreign language is taught alongside.\n\nThe programme admits about 60 students a year with a high school diploma in sciences, the IB included. Applicants send their transcripts for the last two years and a description of their courses through Mines Paris's online platform, and shortlisted applicants have a motivational interview in English by video. English at B2 is required.",
      field: 'Engineering',
      degree: 'Bachelor',
      duration: '3 years',
      campusCity: 'Sophia Antipolis',
      minIBPoints: 24,
      programUrl: IBE3,
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS', 'CHEM', 'BIO'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: [IBE3],
      notes:
        'Content 5.3: new. "Admission: September 2027 / Applications open October 1, 2026", so stamped 2027. IB rule: "open to students preparing for or holding a high school diploma in sciences, such as the French or International Baccalaureate"; admission "based on academic record and interview". No minimum score, so 24, the Diploma. Subjects: the programme wants "a strong background in mathematics and science"; stored as Maths AA or AI and one of Physics, Chemistry or Biology at SL, grade 4 as none is named, not critical. Optional SAT, ACT or language test results are considered. English B2. Taught in semesters 1-4 at Sophia Antipolis (Mines Paris – PSL\'s Pierre Laffitte campus), semester 6 at Sophia Antipolis and in the Paris region, so campusCity is Sophia Antipolis. Degree: a Université PSL bachelor\'s "in Sciences and Engineering" with the grade de licence, recognised by the CTI "as a Bachelor of Science and Engineering"; that award is not in the degree list, so stored as "Bachelor" for the owner to approve or not. Fees: €15,000 a year by household income for EU tax residents, €20,000 for non-EU students. Programme contact: bacheloribe3@minesparis.psl.eu, +33 4 93 95 75 25. No "How competitive" paragraph: no admission figures are published. Field: a compound goes to its last discipline, Engineering (8.1).'
    }
  ]
}

export default refresh
