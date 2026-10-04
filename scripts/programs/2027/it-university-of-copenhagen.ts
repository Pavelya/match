import type { RefreshFile } from '../lib/refresh'

/**
 * IT University of Copenhagen: the one English-taught bachelor's programme open to applicants
 * without Danish, added for content task 5.1 and created, with the university, on 4 October 2026.
 * Global Business Informatics, Software Development and Digital Design and Interactive Technologies
 * now require Danish A, so they are not added. The page names no intake for Data Science, so it is
 * stamped 2026 (refresh rule 2).
 *
 * Dry run: npx tsx scripts/programs/refresh.ts it-university-of-copenhagen
 */
const refresh: RefreshFile = {
  university: 'IT University of Copenhagen',
  entryYear: 2027,
  checkedOn: '2026-10-04',
  programs: [
    {
      id: 'cmutgqcb00022lj7mowyiepvw',
      status: 'current',
      name: 'Data Science',
      description:
        "The BSc in Data Science trains data scientists who can turn large quantities of data into knowledge for software, market research, disaster prediction, investment analysis, policy and artificial intelligence. Over three years, teaching covers mathematics and statistics for data science, programming, machine learning, algorithms and data management, together with social science applications, research methods, data visualisation, communication and critical reflection.\n\nExtensive project work puts these skills to use in realistic settings with domain experts and decision makers. The programme is taught in English in Copenhagen; no programming experience is needed, and graduates have direct access to ITU's MSc in Data Science.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://en.itu.dk/Programmes/BSc-Programmes/Data-Science',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'SL', grade: 3 },
            { course: 'ENG-LL', level: 'SL', grade: 3 },
            { course: 'ENG-B', level: 'HL', grade: 3 },
            { course: 'ENG-B', level: 'SL', grade: 5 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://en.itu.dk/Programmes/BSc-Programmes/Data-Science',
        'https://bachelor.au.dk/fileadmin/ingen_mappe_valgt/IB_og_supplering.pdf',
        'https://www.sdu.dk/en/uddannelse/bachelor/bachelor-admission/admission-requirements/educational-background/international-baccalaureate',
        'https://ufsn.dk/uddannelse/anerkendelse-og-dokumentation/find-vurderinger/eksamenshaandbogen/landedbtest/#handbookId=3&countryId=269&subjectId=3'
      ],
      notes:
        "Content 5.1: new. ITU asks for a qualifying exam equal to a Danish upper secondary certificate (an IB Diploma with at least 24 points qualifies for all Danish higher education, per the Danish Agency for Higher Education and Science), plus Mathematics A with an average of at least 6 and English B with an average of at least 6 (no grade if English is passed at A level). As the Danish IB tables convert them: Mathematics A is Maths AA or AI at HL, and 6 needs IB 5 (IB 4 converts to 4, 5 to 7); English B at 6 is English B SL at 5, while English A level, passed at 3, is any English A or English B HL. Both are conditions, so critical. 2026: quota 1 GPA 5.9, which takes 28 IB points on ufsn.dk's 2026 table; 595 applicants (417 in quota 2), 100 admitted, 80% in quota 1; 73% international. Quota 2 has no GPA minimum, so the published minimum is the Diploma, 24. Summer intake only, no standby places; apply through optagelse.dk by 15 March. The page names no intake for these rules (only Software Development's page announces a GPA minimum from the 2027 round), so stamped 2026. Bachelor of Science (BSc)."
    }
  ]
}

export default refresh
