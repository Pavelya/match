import type { RefreshFile } from '../lib/refresh'

/**
 * Technical University of Denmark: its one English-taught bachelor's programme, added for content
 * task 5.1 and created, with the university, on 4 October 2026. DTU's pages name no intake, so it
 * is stamped 2026 (refresh rule 2).
 *
 * Dry run: npx tsx scripts/programs/refresh.ts technical-university-of-denmark
 */
const refresh: RefreshFile = {
  university: 'Technical University of Denmark',
  entryYear: 2027,
  checkedOn: '2026-10-04',
  programs: [
    {
      id: 'cmutgqc4n001ulj7ml99ojtmd',
      status: 'current',
      name: 'General Engineering',
      description:
        'The BSc in General Engineering is an interdisciplinary programme in broad engineering skills, built on mathematics, physics, chemistry and biotechnology. Design-build projects throughout the programme turn theory into practical solutions to real problems and train students to work across disciplines.\n\nStudents choose one of four specialisations, by the start of the second year: Living Systems, Advanced Materials, Cyber Systems or Future Energy. The third year is mostly electives, often with a semester abroad, and ends with a bachelor project, frequently with a company. All teaching is in English at DTU in Kongens Lyngby; about 60% of students are international.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.dtu.dk/english/education/undergraduate/general-engineering',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 3, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 3, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 3, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 3, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.dtu.dk/english/education/undergraduate/general-engineering/admission-and-deadlines/admission-requirements',
        'https://www.dtu.dk/english/-/media/dtu-endk/education/bsc-programmes/general-engineering/ib-levels_2025.pdf',
        'https://www.dtu.dk/english/education/undergraduate/general-engineering'
      ],
      notes:
        "Content 5.1: new. DTU: an IB Diploma with at least 24 points qualifies for its bachelor's programmes. Specific requirements (Danish levels): Mathematics A, Physics B, Chemistry B and English B, all conditions, so critical. DTU's IB subject conversion table (19 February 2025): Mathematics A is Maths AA or AI at HL; Physics B and Chemistry B are Physics SL and Chemistry SL; English B is English B SL, and English A (any English A, or English B HL) also meets it. A pass is 02 on the Danish scale, IB 3. English language: applicants with an IB Diploma are exempt from DTU's English test. The page publishes no quota 1 cut-off or GPA minimum, so the published minimum is the Diploma, 24. 150 places; applications by 15 March (quota 2 and every international exam). The pages name no intake, so stamped 2026. Bachelor of Science (BSc) in General Engineering, three years."
    }
  ]
}

export default refresh
