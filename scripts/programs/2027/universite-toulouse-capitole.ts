import type { RefreshFile } from '../lib/refresh'

/**
 * Université Toulouse Capitole: the Bachelor of Science in Global Management taught in English by
 * its Toulouse School of Management (TSM), added for content task 5.3 (France) and created, with the university, on 8 October 2026. The university's
 * other English-taught courses are master's or enter the second or third year.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts universite-toulouse-capitole
 */

const BSC1 = 'https://tsm-education.fr/en/programmes/bachelors/bsc-in-global-management/bsc-1'
const ADMISSION = `${BSC1}?tab=admission`
const CAMPUS_FRANCE =
  'https://tsm-education.fr/en/news/campus-france-eef-procedure-open-1-october-2026'
const ENGLISH_TAUGHT =
  'https://www.ut-capitole.fr/home/course-offer/our-courses/english-taught-courses'

const refresh: RefreshFile = {
  university: 'Université Toulouse Capitole',
  entryYear: 2027,
  checkedOn: '2026-10-08',
  programs: [
    {
      id: 'cmuzj2pkp001m6x7mr9svth1u',
      status: 'current',
      name: 'Global Management',
      description:
        'The Bachelor of Science in Global Management is a three-year programme of 180 ECTS taught entirely in English by Toulouse School of Management (TSM), part of the public Université Toulouse Capitole. It covers the fundamentals of management (accounting, finance, marketing and business economics) with international institutions and comparative politics, using flipped classes and project-based learning in groups of about 55 students, a third of them from abroad. From the first year, students can apply for double degrees with partner universities in Germany, Italy and Hungary. As a public university programme, it charges the national tuition fees.\n\nTSM ranks applicants on their school grades and then reviews each file. International applicants apply on TSM\'s eCandidatures platform with their grades or predicted grades, a CV and a motivation letter in English, an English certificate at B2, and a pre-recorded interview; those living in a country covered by Campus France\'s "Études en France" procedure apply there between October and December. Mathematics is required, and no gap year is allowed before the first year.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: BSC1,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }],
      checkedFor: 2026,
      sources: [ADMISSION, BSC1, CAMPUS_FRANCE, ENGLISH_TAUGHT],
      notes:
        'Content 5.3: new. IB rule: "a high school diploma equal to the highest level of secondary education"; selection by "the algorithmic approach, utilising quantitative criteria, ... combined with a qualitative review of applications". No minimum score, so 24, the Diploma. Subjects: "English level B2 and proficiency in Math are required; Performance in History/Geography and Literature/Culture is essential"; maths stored as Maths AA or AI at SL, grade 4 as none is named, not critical because the page names no IB course or grade. "No gap year is allowed for the first year." English B2 certificate unless all secondary schooling was in English in a listed country. Routes: French, EU and other applicants not subject to "Études en France" use Parcoursup or eCandidatures; those subject to it apply on Campus France from 1 October to 15 December 2026 for 2027-2028. Entry year: the admissions tab still gives the 2026 calendar (submission from 19 January 2026, closing 12 March 2026, results 18 May 2026); only the Campus France notice covers 2027-2028, so stamped 2026 (rule 2). Fees: national university fees, €178 a year for EU students and €2,902 for others in the Campus France catalogue (2025-26), plus the CVEC (€105). No contact address for the programme beyond the eCandidatures platform. No "How competitive" paragraph: TSM publishes no ranking figures. Field: Business & Economics (8.1).'
    }
  ]
}

export default refresh
