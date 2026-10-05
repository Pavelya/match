import type { RefreshFile } from '../lib/refresh'

/**
 * University of Tokyo: requirements for 2027 entry.
 *
 * Exported from the database on 2026-10-03 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Content 5.2 (5 October 2026) adds the UTokyo College of Design, which takes its first students in
 * September 2027, and moves checkedOn to the day its pages were read; the two PEAK programmes stay
 * discontinued and unwritten, for the owner.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-tokyo
 */
const refresh: RefreshFile = {
  university: 'University of Tokyo',
  entryYear: 2027,
  checkedOn: '2026-10-05',
  programs: [
    {
      status: 'new',
      name: 'College of Design',
      description:
        "The UTokyo College of Design is a new faculty of the University of Tokyo, opening in September 2027, with a five-year combined bachelor's and master's programme taught entirely in English. Students bring together knowledge from many fields and integrate it through design approaches to tackle complex social issues, building their own learning pathways across conventional disciplines, and gain practical experience through long-term internships in Japan or abroad. All first-year students live in university housing.\n\nThe college admits 100 students a year, from Japan and around the world: 50 through Japan's Common Test (Route A) and 50 through international qualifications such as the IB (Route B), selected on transcripts, test results, essays, a video, an evaluation and an online interview.\n\nHow competitive: for this first intake, the college expects IB applicants to have 38 of the 42 subject points and at least 2 points for Theory of Knowledge and the Extended Essay, 40 in all. This is not a cut-off: admission is holistic, and Route B has 50 places for applicants from across the world.",
      field: 'Arts & Humanities',
      degree: "Integrated Bachelor's and Master's",
      duration: '5 years',
      minIBPoints: 24,
      programUrl: 'https://design.adm.u-tokyo.ac.jp/admissions/admissions-overview-2027/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://design.adm.u-tokyo.ac.jp/admissions/admissions-overview-2027/',
        'https://design.adm.u-tokyo.ac.jp/admissions/application-guidelines-2027/route-b/',
        'https://design.adm.u-tokyo.ac.jp/'
      ],
      notes:
        'Content 5.2: new. Admissions for 2027 Enrollment (updated 10 July 2026) and the Route B application guidelines (14 September 2026): application 15 October to 5 November 2026, a video assignment 13-16 November, first screening results 22 December 2026, online interviews 13-22 January 2027, decisions 20 February 2027, enrolment 1 September 2027; offers on predicted grades are conditional, final results due by 16 August 2027. Route B requirement 2 lists the IB Diploma with the expectation "A total of 38 points out of 42 for the six subjects and at least 2 points for combined TOK and EE"; the guidelines say "Expected scores are not cut-off scores, and admission decisions will be made holistically". No minimum is published, so 24, the Diploma, under the data conventions, and the expectation is in the "How competitive" paragraph (owner question: store 38, as for EPFL\'s published 38 out of 42, if an expectation should count as the minimum). Checked, none required: no subject is named. English: a designated test (TOEFL iBT above 80, IELTS above 6.0 and others) unless three of the final four school years were taught in English. Applicants for September 2027 cannot also apply to other UTokyo programmes for April 2027. Admission fee JPY 282,000 and tuition JPY 642,960 a year (as of 2026); need-based and merit scholarships. The overview says the college "is currently under review by the Ministry of Education, Culture, Sports, Science and Technology (MEXT) for approval, and may be subject to change". Five-year combined bachelor\'s and master\'s programme. Update the "How competitive" paragraph at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljqlhu20005jj04y7gx6i0b',
      status: 'discontinued',
      name: 'International Program on Environmental Sciences (PEAK, Komaba)',
      description:
        'The goal of the Environmental Sciences Program is to provide students with a broad-based, inter- and multidisciplinary understanding of Environmental Systems and Global Sciences. This is achieved by exploiting the expertise of many world experts from a large number of different disciplines, in a coherent teaching program based on six key areas. These key areas focus on both the scientific and social science aspects and details of each of them are provided below.',
      field: 'Environmental Studies',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://peak.c.u-tokyo.ac.jp/courses/es/index.html',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6, critical: false }
      ],
      checkedFor: null,
      sources: [
        'https://web.archive.org/web/20260521201451/https://www.peak.c.u-tokyo.ac.jp/apply/index.html',
        'https://www.u-tokyo.ac.jp/en/prospective-students/undergraduate_english.html'
      ],
      notes:
        'Content 4.8b: discontinued. PEAK\'s own admissions page: "The Admission for September 2026 Enrollment will be the last student recruitment for the PEAK" (Internet Archive copy of 21 May 2026). peak.c.u-tokyo.ac.jp now answers 404 or 403 and its certificate expired on 30 September 2026; UTokyo\'s page of undergraduate programmes in English lists only the Global Science Course, a third-year transfer. No intake in 2027: for the owner to decide (refresh rule 3).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljqhgdd0003jj04242tc070',
      status: 'discontinued',
      name: 'International Program on Japan in East Asia (PEAK, Komaba)',
      description:
        "The Japan in East Asia Program aims to provide students with a wide range of social science and humanities courses to develop an advanced understanding of Japanese/East Asian politics, economy, society and culture in a global context. The program is organized so that students will be able to receive a Bachelor's degree by taking classes that are taught in English. The curriculum reflects sixty years of experience and continuous improvement and innovation in liberal arts education at the College of Arts and Sciences.",
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 36,
      programUrl: 'https://peak.c.u-tokyo.ac.jp/courses/jea/index.html',
      requirements: [],
      checkedFor: null,
      sources: [
        'https://web.archive.org/web/20260521201451/https://www.peak.c.u-tokyo.ac.jp/apply/index.html',
        'https://www.u-tokyo.ac.jp/en/prospective-students/undergraduate_english.html'
      ],
      notes:
        'Content 4.8b: discontinued. PEAK\'s own admissions page: "The Admission for September 2026 Enrollment will be the last student recruitment for the PEAK" (Internet Archive copy of 21 May 2026). peak.c.u-tokyo.ac.jp now answers 404 or 403 and its certificate expired on 30 September 2026; UTokyo\'s page of undergraduate programmes in English lists only the Global Science Course, a third-year transfer. No intake in 2027: for the owner to decide (refresh rule 3).'
    }
  ]
}

export default refresh
