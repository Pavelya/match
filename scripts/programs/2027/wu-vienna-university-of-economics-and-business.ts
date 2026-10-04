import type { RefreshFile } from '../lib/refresh'

/**
 * WU Vienna University of Economics and Business: its one English-taught bachelor's programme,
 * added for content task 5.1 and created, with the university, on 4 October 2026. The selection
 * procedure published is 2026/27's (2027/28 details are due in mid-November 2026), so it is
 * stamped 2026 (refresh rule 2).
 *
 * Dry run: npx tsx scripts/programs/refresh.ts wu-vienna-university-of-economics-and-business
 */
const refresh: RefreshFile = {
  university: 'WU Vienna University of Economics and Business',
  entryYear: 2027,
  checkedOn: '2026-10-04',
  programs: [
    {
      id: 'cmutgqe46004xlj7m31xxzeuy',
      status: 'current',
      name: 'Business and Economics (BBE)',
      description:
        "WU's English-taught Bachelor's Program in Business and Economics takes a broad, global approach to business and economics. A first-year introductory and orientation phase (Contemporary Challenges in Business and Economics, Business and Society) leads into 93 ECTS of core courses in business and economics, quantitative methods, business and economics in context, and academic skills.\n\nFrom the third semester, 65 ECTS of specialisations and electives let you build your own profile, followed by a bachelor's thesis. Many students spend a semester abroad, and selected students can add a year at Queensland University of Technology for a double degree. The programme starts each October on WU's campus in Vienna.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.wu.ac.at/en/programs/bachelors-programs/business-and-economics/overview-1',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.wu.ac.at/en/programs/bachelors-programs/business-and-economics/overview/selection-procedure-bbe-1/',
        'https://www.wu.ac.at/en/programs/bachelors-programs/business-and-economics/overview-1',
        'https://www.wu.ac.at/fileadmin/wu/h/structure/servicecenters/studieninfo/WU@School/EN_IB_Diploma_2026_27.pdf',
        'https://www.wu.ac.at/en/programs/application-and-admission/language',
        'https://www.bmwet.gv.at/bmafjgvat/wissenschaft/anerkennung/universit%C3%A4tsreife.html'
      ],
      notes:
        'Content 5.1: new. Admission needs a university entrance qualification, English at B2 and a place in the selection procedure. The Austrian science ministry states that a properly obtained IB Diploma is a general university entrance qualification, and WU\'s IB guidance for 2026/27 (written for its German-taught programmes) asks only that the full Diploma be completed: "Besides the language subjects, we currently do not specify any further subject combination or minimum grades"; Course Results, predicted grades and the IBCP do not count. WU publishes no IB points figure, so 24, the Diploma. Checked, none required: no IB subject is named. English B2: a passing grade in English on a school-leaving certificate from a school in the EU, EEA or Switzerland, or a test (TOEFL iBT 85 or 4.5, IELTS 6.0, Cambridge B2, PTE 70 and others); no German is needed. Selection 2026/27: registration 2 March to 19 May 2026 (EUR 50), an ungraded online self-assessment, then a two-hour multiple-choice exam in Vienna on 30 June 2026 in English, business and economics (set reading) and mathematics at Austrian school-leaving level; the best 240 are admitted. Model limit: the entrance exam. The 2027/28 procedure is published in mid-November 2026, so stamped 2026. Bachelor of Science, BSc (WU); 6 semesters, 180 ECTS.'
    }
  ]
}

export default refresh
