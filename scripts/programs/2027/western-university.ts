import type { RefreshFile } from '../lib/refresh'

/**
 * Western University: requirements for 2027 entry.
 *
 * Exported from the database on 2026-09-29 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts western-university
 */
const refresh: RefreshFile = {
  university: 'Western University',
  entryYear: 2027,
  checkedOn: '2026-09-29',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk4ziq00017mruxqvc79j1',
      status: 'current',
      name: 'Advanced Studies (SASAH)',
      description:
        'The School for Advanced Studies in the Arts & Humanities (SASAH) offers a unique cohort program for high-achieving students. It combines interdisciplinary study with language learning and experiential learning opportunities.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://www.uwo.ca/arts/sasah/apply/index.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://www.uwo.ca/arts/sasah/apply/index.html'
      ],
      notes:
        'Content 4.4: School for Advanced Studies in Arts & Humanities (SASAH), a major taken alongside another: Faculty of Arts & Humanities, which students enter in first year before applying to a module. Arts & Humanities has "No required courses": checked, none required. SASAH also requires a Statement of Interest (deadline 28 February 2027). Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Arts & Humanities "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmksk5604002j7mru3dg9q6x0',
      status: 'discontinued',
      name: 'Bioinformatics',
      description:
        'From bioinformatics to social networking, computer science drives innovation. Western’s flagship programs send your career in directions you might never imagine.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://www.westerncalendar.uwo.ca/Modules.cfm?ModuleID=21121',
      requirements: [
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: [
        'https://www.westerncalendar.uwo.ca/Modules.cfm?ModuleID=21121',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/computer-science.html'
      ],
      notes:
        'Content 4.4: Western\'s 2026 Academic Calendar: "HONOURS SPECIALIZATION IN BIOINFORMATICS - admission discontinued effective 2027. Admission to this module is discontinued effective September 1, 2027." Students enrolled now may finish by 2030. The Computer Science admissions page no longer lists it. Not written; the owner decides.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmksk5j8i009x7mruak376yhm',
      status: 'current',
      name: 'Biology',
      description:
        'Join our community of scholars in high-tech research labs. Build your own degree path with thousands of options. At Western, you are a scientist.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        {
          courses: ['BIO', 'CHEM', 'PHYS', 'CS', 'ESS', 'DES-TECH', 'SEHS'],
          level: 'SL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html'
      ],
      notes:
        'Content 4.4: Biology: Faculty of Science, which students enter in first year and choose modules from. Science requires "HL or SL: IB Math (Any), IB Science (Any)". "IB Math (Any)" is stored as Maths AA or AI at any level, and "IB Science (Any)" as any Group 4 subject (Biology, Chemistry, Physics, Computer Science, ESS, Design Technology, SEHS), both critical at 4. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Science "typically had averages between" 28 and 32; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 30 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology or Chemistry or ESS or Physics SL 4 (critical); Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk4zyf00077mruj1r0qd5e',
      status: 'current',
      name: 'Black Studies',
      description:
        'Explore the histories, cultures, and contributions of Black communities globally. This program provides a critical understanding of anti-Black racism and the pursuit of social justice.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html'
      ],
      notes:
        'Content 4.4: Black Studies (also listed under Social Science, which likewise has none): Faculty of Arts & Humanities, which students enter in first year before applying to a module. Arts & Humanities has "No required courses": checked, none required. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Arts & Humanities "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmksk5k1i00af7mrud8y84ev2',
      status: 'current',
      name: 'Chemistry',
      description:
        'Join our community of scholars in high-tech research labs. Build your own degree path with thousands of options. At Western, you are a scientist.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        {
          courses: ['BIO', 'CHEM', 'PHYS', 'CS', 'ESS', 'DES-TECH', 'SEHS'],
          level: 'SL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html'
      ],
      notes:
        'Content 4.4: Chemistry: Faculty of Science, which students enter in first year and choose modules from. Science requires "HL or SL: IB Math (Any), IB Science (Any)". "IB Math (Any)" is stored as Maths AA or AI at any level, and "IB Science (Any)" as any Group 4 subject (Biology, Chemistry, Physics, Computer Science, ESS, Design Technology, SEHS), both critical at 4. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Science "typically had averages between" 28 and 32; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 30 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology or Chemistry or ESS or Physics SL 4 (critical); Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk50g6000d7mru5xk3s58g',
      status: 'current',
      name: 'Classical Studies',
      description:
        'Classical Studies at Western is broadly based on the study of the language and literature, history, and archaeology of the Greek and Roman world. It combines Greek and Latin literature, history, and archaeology with subjects like religion, mythology, political theory, law, and philosophy.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://www.uwo.ca/classics/undergraduate/index.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://www.uwo.ca/classics/undergraduate/index.html'
      ],
      notes:
        'Content 4.4: Classical Studies: Faculty of Arts & Humanities, which students enter in first year before applying to a module. Arts & Humanities has "No required courses": checked, none required. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Arts & Humanities "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Management and Organizational Studies (BMOS)".
    {
      id: 'cmksk5dst00757mrurv8acvy0',
      status: 'current',
      name: 'Commercial Aviation Management',
      description:
        'Humans and data — that’s how our enterprises run. Graduate from Western with a Bachelor of Management and Organizational Studies and be ready to run the interface between human enterprises and our data.',
      field: 'Business & Economics',
      degree: 'Bachelor of Management and Organizational Studies',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://dan.uwo.ca/undergraduate/cam/',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://dan.uwo.ca/undergraduate/cam/'
      ],
      notes:
        'Content 4.4: DAN Management & Organizational Studies, Commercial Aviation Management (BMOS). Required: "HL or SL IB Math (Any)", stored as Maths AA or AI, critical at 4; the CAM Supplementary Application Form is required (deadline 1 March 2027). Physics is only recommended, for the flight option, so the stored Physics row is removed. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Management & Organizational Studies - Commercial Aviation Management "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 30 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4; Physics SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmksk56sq00317mruhxbkeos6',
      status: 'current',
      name: 'Computer Science',
      description:
        'From bioinformatics to social networking, computer science drives innovation. Western’s flagship programs send your career in directions you might never imagine.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/computer-science.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        {
          courses: ['BIO', 'CHEM', 'PHYS', 'CS', 'ESS', 'DES-TECH', 'SEHS'],
          level: 'SL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/computer-science.html'
      ],
      notes:
        'Content 4.4: Computer Science has its own admission (OUAC ECS, BSc). Required: "HL or SL: IB Math (Any), IB Science (Any)". "IB Math (Any)" is stored as Maths AA or AI at any level, and "IB Science (Any)" as any Group 4 subject (Biology, Chemistry, Physics, Computer Science, ESS, Design Technology, SEHS), both critical at 4. The URL moves from the calendar\'s Honours Specialization page to the admissions page for the program. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Computer Science "typically had averages between" 30 and 32; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 32 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology or Chemistry or Computer Science or Physics SL 4 (critical); Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk50vj000j7mru7omjo7wh',
      status: 'current',
      name: 'Creative Arts and Production (CAP)',
      description:
        'A collaborative program across three faculties, CAP explores creativity and production in the arts. It bridges theory and practice in fields like music, visual arts, and theatre.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html'
      ],
      notes:
        'Content 4.4: Creative Arts and Production (CAP), a major offered by Arts & Humanities, Information and Media Studies and Music: Faculty of Arts & Humanities, which students enter in first year before applying to a module. Arts & Humanities has "No required courses": checked, none required. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Arts & Humanities "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmksk5kuv00ax7mrumf9i1npj',
      status: 'current',
      name: 'Data Science',
      description:
        'Join our community of scholars in high-tech research labs. Build your own degree path with thousands of options. At Western, you are a scientist.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        {
          courses: ['BIO', 'CHEM', 'PHYS', 'CS', 'ESS', 'DES-TECH', 'SEHS'],
          level: 'SL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html'
      ],
      notes:
        'Content 4.4: Data Science: Faculty of Science, which students enter in first year and choose modules from. Science requires "HL or SL: IB Math (Any), IB Science (Any)". "IB Math (Any)" is stored as Maths AA or AI at any level, and "IB Science (Any)" as any Group 4 subject (Biology, Chemistry, Physics, Computer Science, ESS, Design Technology, SEHS), both critical at 4. Data Science is an Honours Specialization and Major of the Department of Statistical and Actuarial Sciences. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Science "typically had averages between" 28 and 32; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 30 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology or Chemistry or ESS or Physics SL 4 (critical); Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk51b3000p7mru6dio5765',
      status: 'discontinued',
      name: 'Digital Humanities',
      description:
        'Digital Humanities combines the study of culture and history with digital tools. Learn to analyze big data, create digital exhibits, and understand the impact of technology on society.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 28,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: [
        'https://www.westerncalendar.uwo.ca/Modules.cfm?ModuleID=20967&SelectedCalendar=Live',
        'https://www.uwo.ca/languages/undergraduate/programs_degrees/digitial_humanities.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html'
      ],
      notes:
        'Content 4.4: Western offers Digital Humanities only as a Minor (4.0 courses) taken alongside another module: the 2026 Academic Calendar has "MINOR IN DIGITAL HUMANITIES" and no major or specialization, and the Arts & Humanities admissions page lists only the Minor. It is not a degree a student can apply to. Not written; the owner decides.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmksk5lqa00bf7mru2gnw3pyw',
      status: 'current',
      name: 'Earth & Environmental Sciences',
      description:
        'Join our community of scholars in high-tech research labs. Build your own degree path with thousands of options. At Western, you are a scientist.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        {
          courses: ['BIO', 'CHEM', 'PHYS', 'CS', 'ESS', 'DES-TECH', 'SEHS'],
          level: 'SL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html'
      ],
      notes:
        'Content 4.4: Earth & Environmental Sciences: Faculty of Science, which students enter in first year and choose modules from. Science requires "HL or SL: IB Math (Any), IB Science (Any)". "IB Math (Any)" is stored as Maths AA or AI at any level, and "IB Science (Any)" as any Group 4 subject (Biology, Chemistry, Physics, Computer Science, ESS, Design Technology, SEHS), both critical at 4. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Science "typically had averages between" 28 and 32; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 30 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology or Chemistry or ESS or Physics SL 4 (critical); Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk5h71008x7mru59yq2szr',
      status: 'current',
      name: 'Economics',
      description:
        'Analysis, perspective, insights. Social sciences take you to heady places. At Western, you dig into what the ideas mean for real people and organizations.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/social-science.html',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/social-science.html'
      ],
      notes:
        'Content 4.4: Economics: Faculty of Social Science, which has "No required courses". "You\'ll need IB Math Applications (HL only) or IB Math Analysis (SL or HL) for all Economics modules": stored as Maths AA or Maths AI HL, not critical, because admission to Social Science does not require it. Maths AI SL, accepted before, is not. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Social Science "typically had averages between" 28 and 32; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Engineering Science (BESc)".
    {
      id: 'cmksk58ev00417mrucl5lfafs',
      status: 'current',
      name: 'Engineering',
      description:
        'Engineers tackle real-world problems of all sizes. Western co-op experiences come in short or long sizes, allowing you to customize your career path.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering Science',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/engineering.html',
      requirements: [
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/engineering.html'
      ],
      notes:
        'Content 4.4: Western Engineering (common first year, BESc). Required: HL or SL Chemistry and Physics, and one of HL or SL Maths AA or HL Maths AI, all critical at 4; the Casper test is required. Maths AI SL, accepted before, is not. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Engineering "typically had averages between" 33 and 35; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 34 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Chemistry SL 4 (critical); Maths AA or Maths AI SL 4 (critical); Physics SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk51qk000v7mru2w0cijkx',
      status: 'current',
      name: 'English Studies',
      description:
        'Study literature from across the globe and throughout history. Develop critical thinking and communication skills while exploring poetry, drama, novels, and film.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html'
      ],
      notes:
        'Content 4.4: English Studies: Faculty of Arts & Humanities, which students enter in first year before applying to a module. Arts & Humanities has "No required courses": checked, none required. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Arts & Humanities "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk5i5e009d7mrukxnau783',
      status: 'current',
      name: 'Family Studies (BA)',
      description:
        'Learn how to work with families. Discover how lives and relationships develop within the context of family, school, work and society.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/family-studies.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/family-studies.html'
      ],
      notes:
        'Content 4.4: Family Studies & Human Development, BA (Human Ecology), Brescia School of Food and Nutritional Sciences: "No required courses": checked, none required. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Family Studies & Human Development "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmksk5ik5009j7mrue82kkwat',
      status: 'discontinued',
      name: 'Family Studies (BSc)',
      description:
        'Learn how to work with families. Discover how lives and relationships develop within the context of family, school, work and society.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 28,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/family-studies.html',
      requirements: [
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: [
        'https://westerncalendar.uwo.ca/Departments.cfm?DepartmentID=191&SelectedCalendar=Live&ArchiveID=',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/family-studies.html',
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html'
      ],
      notes:
        'Content 4.4: The BSc (Human Ecology) in Family Studies and Human Development no longer admits students: Western\'s 2026 Academic Calendar lists both BSc modules, the Honours Specialization and the Specialization, as "ADMISSION DISCONTINUED", and the admissions page offers only the BA (Degree Type: BA). Western\'s IB page still says "Interested in the BSc? Math (any), Biology, and Chemistry will be required." Not written; the owner decides.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk526700117mrui0vkbw7a',
      status: 'current',
      name: 'Film Studies',
      description:
        'Analyze cinema as an art form and a cultural industry. Film Studies explores the history, theory, and aesthetics of film, from Hollywood blockbusters to independent world cinema.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html'
      ],
      notes:
        'Content 4.4: Film Studies: Faculty of Arts & Humanities, which students enter in first year before applying to a module. Arts & Humanities has "No required courses": checked, none required. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Arts & Humanities "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Science (Foods and Nutrition)".
    {
      id: 'cmksk5cl3006h7mru6o2b17py',
      status: 'current',
      name: 'Foods & Nutrition',
      description:
        'Choose Western for a transformative education in Foods and Nutrition. Dive into food science, health determinants, and specialized modules like Dietetics.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/foods-nutrition.html',
      requirements: [
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/foods-nutrition.html'
      ],
      notes:
        'Content 4.4: Foods and Nutrition (BScFN), Brescia School of Food and Nutritional Sciences. Required: HL or SL Biology, Chemistry, and "IB Math Analysis or Math Applications", all critical at 4. The award is the Bachelor of Science in Foods and Nutrition. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Foods & Nutrition "typically had averages between" 28 and 32; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 30 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology SL 4 (critical); Chemistry SL 4 (critical); Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk52ls00177mruzfd4njog',
      status: 'current',
      name: 'French Studies',
      description:
        'Master the French language and explore Francophone cultures. Programs range from language learning to advanced studies in literature and linguistics.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html'
      ],
      notes:
        'Content 4.4: French Studies: Faculty of Arts & Humanities, which students enter in first year before applying to a module. Arts & Humanities has "No required courses": checked, none required. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Arts & Humanities "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk530z001d7mrul2jht91n',
      status: 'current',
      name: 'Gender, Sexuality and Women’s Studies',
      description:
        'Examine how gender and sexuality shape our world. This interdisciplinary program addresses issues of equality, identity, and social justice.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html'
      ],
      notes:
        'Content 4.4: Gender, Sexuality and Women’s Studies (also listed under Social Science, which likewise has none): Faculty of Arts & Humanities, which students enter in first year before applying to a module. Arts & Humanities has "No required courses": checked, none required. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Arts & Humanities "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Health Sciences (BHSc)".
    {
      id: 'cmksk59sx004v7mrutk43kp9y',
      status: 'current',
      name: 'Health Sciences',
      description:
        'Study the Health Sciences at Western and join a global community finding ways to tackle — and prevent — every kind of health issue.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Health Sciences',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/health-sciences.html',
      requirements: [
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/health-sciences.html'
      ],
      notes:
        'Content 4.4: Health Sciences (BHSc). Required: HL or SL Biology and "IB Math (Any)", both critical at 4. Chemistry is only recommended, so the stored Chemistry row is removed. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Health Science "typically had averages between" 35 and 38; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 35 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology SL 4 (critical); Maths AA or Maths AI SL 4 (critical); Chemistry SL 4; English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Health Sciences (BHSc)".
    {
      id: 'cmksk5afm00597mruaqf2wn0z',
      status: 'current',
      name: 'Health Sciences with Biology',
      description:
        'Study the Health Sciences at Western and join a global community finding ways to tackle — and prevent — every kind of health issue.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Health Sciences',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/health-sciences.html',
      requirements: [
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/health-sciences.html'
      ],
      notes:
        'Content 4.4: Honours Specialization in Health Sciences with Biology, entered through Health Sciences (BHSc). Required: HL or SL Biology and "IB Math (Any)", both critical at 4. "You\'ll need IB Chemistry to take the first year Chemistry courses required for the module": stored, not critical, because admission to Health Sciences does not require it. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Health Science "typically had averages between" 35 and 38; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 35 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology SL 4 (critical); Chemistry SL 4 (critical); Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmksk57ls003j7mruw8djripg',
      status: 'discontinued',
      name: 'Information Systems',
      description:
        'From bioinformatics to social networking, computer science drives innovation. Western’s flagship programs send your career in directions you might never imagine.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://www.westerncalendar.uwo.ca/Modules.cfm?ModuleID=21124',
      requirements: [
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: [
        'https://www.westerncalendar.uwo.ca/Modules.cfm?ModuleID=21124',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/computer-science.html'
      ],
      notes:
        'Content 4.4: Western\'s 2026 Academic Calendar: "HONOURS SPECIALIZATION IN INFORMATION SYSTEMS - admission discontinued effective 2027. Admission to this module is discontinued effective September 1, 2027." Students enrolled now may finish by 2030. The Computer Science admissions page no longer lists it. Not written; the owner decides.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmksk5mk600bx7mru3iumlyey',
      status: 'current',
      name: 'Integrated Science (WISc)',
      description:
        'Western Integrated Science (WISc) is a unique program for the most dedicated science students. It provides a holistic approach to complex problems, combining multiple scientific disciplines.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        {
          courses: ['BIO', 'CHEM', 'PHYS', 'CS', 'ESS', 'DES-TECH', 'SEHS'],
          level: 'SL',
          grade: 4,
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html'
      ],
      notes:
        'Content 4.4: Western Integrated Science (WISc): Faculty of Science, which students enter in first year and choose modules from. Science requires "HL or SL: IB Math (Any), IB Science (Any)". "IB Math (Any)" is stored as Maths AA or AI at any level, and "IB Science (Any)" as any Group 4 subject (Biology, Chemistry, Physics, Computer Science, ESS, Design Technology, SEHS), both critical at 4. WISc also requires the WISc Application (deadline "April 2027 (TBC)"). The science page asks Ontario applicants for Chemistry for WISc; the IB page does not repeat it, so Chemistry is stored, not critical. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Science "typically had averages between" 28 and 32; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 30 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology or Chemistry or ESS or Physics SL 4 (critical); Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts / Bachelor of Science".
    {
      id: 'cmksk5b57005n7mruau8bgc31',
      status: 'current',
      name: 'Kinesiology',
      description:
        'Study at Western and you’ll have endless possibilities to see how your Kinesiology degree can turn into a career.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/kinesiology.html',
      requirements: [{ courses: ['BIO'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/kinesiology.html'
      ],
      notes:
        'Content 4.4: Kinesiology, Faculty of Health Sciences: the degree is a BA or a BSc ("Degree Type: BSc, BA, Combined BA and BSc"), stored as Bachelor of Arts, the route with no further science; it is not a double degree. Required: HL or SL Biology, critical at 4. Maths and Physics are recommended, Chemistry is needed only for first-year Chemistry courses, and the IB page "strongly recommend[s]" sciences for the BSc: none is stored. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Kinesiology "typically had averages between" 30 and 32; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 30 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology SL 4 (critical); Chemistry SL 4; English A Literature or English A Language and Literature SL 4; Maths AA or Maths AI SL 4; Physics SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk53h5001j7mrudpt8gvdw',
      status: 'current',
      name: 'Linguistics',
      description:
        'Discover the science of language. Linguistics explores how language is structured, how it is learned, and how it is used in social contexts.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html'
      ],
      notes:
        'Content 4.4: Linguistics (also listed under Social Science, which likewise has none): Faculty of Arts & Humanities, which students enter in first year before applying to a module. Arts & Humanities has "No required courses": checked, none required. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Arts & Humanities "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Management and Organizational Studies (BMOS)".
    {
      id: 'cmksk5d6x006v7mruzn8hg6y7',
      status: 'current',
      name: 'Management & Organizational Studies (BMOS)',
      description:
        'Humans and data — that’s how our enterprises run. Graduate from Western with a Bachelor of Management and Organizational Studies and be ready to run the interface between human enterprises and our data.',
      field: 'Business & Economics',
      degree: 'Bachelor of Management and Organizational Studies',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/dan-management-organizational-studies.html',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/dan-management-organizational-studies.html'
      ],
      notes:
        'Content 4.4: DAN Management & Organizational Studies (BMOS). Required: "HL or SL IB Math (Any)", stored as Maths AA or AI, critical at 4. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Management & Organizational Studies "typically had averages between" 30 and 33; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 30 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmksk5nei00cf7mrupkkdjjmv',
      status: 'current',
      name: 'Mathematics and Applied Mathematics',
      description:
        'Join our community of scholars in high-tech research labs. Build your own degree path with thousands of options. At Western, you are a scientist.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        {
          courses: ['BIO', 'CHEM', 'PHYS', 'CS', 'ESS', 'DES-TECH', 'SEHS'],
          level: 'SL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html'
      ],
      notes:
        'Content 4.4: Mathematics and Applied Mathematics: Faculty of Science, which students enter in first year and choose modules from. Science requires "HL or SL: IB Math (Any), IB Science (Any)". "IB Math (Any)" is stored as Maths AA or AI at any level, and "IB Science (Any)" as any Group 4 subject (Biology, Chemistry, Physics, Computer Science, ESS, Design Technology, SEHS), both critical at 4. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Science "typically had averages between" 28 and 32; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 30 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology or Chemistry or ESS or Physics SL 4 (critical); Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk5eeh007h7mruix6c29df',
      status: 'current',
      name: 'Media, Information & Technoculture',
      description:
        'Are we bigger than our data points? Debate these questions. Go behind the digital façade. Learn to make media and to move through it wisely.',
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/media-communication-studies.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/media-communication-studies.html'
      ],
      notes:
        'Content 4.4: Media, Information and Technoculture (MIT), Faculty of Information and Media Studies: "No required courses": checked, none required. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Media and Communication Studies "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Medical Sciences (BMSc)".
    {
      id: 'cmksk592i004f7mruz9d7y0xy',
      status: 'current',
      name: 'Medical Sciences (BMSc)',
      description:
        "Gain the knowledge and skills to improve health. You'll be set up for careers in medical research, public health, medicine, dentistry, and more.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Medical Sciences',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/medical-sciences.html',
      requirements: [
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/medical-sciences.html'
      ],
      notes:
        'Content 4.4: Bachelor of Medical Sciences, entered through Medical Sciences (Faculty of Science with Schulich Medicine & Dentistry). Required: HL or SL Biology, Chemistry and "IB Math (Any)", all critical at 4. Physics is recommended ("If you didn\'t take IB Physics, that\'s okay!"), so the stored Physics row is removed. The URL moves from the Schulich page (which now redirects) to the admissions page for the program. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Medical Sciences "typically had averages between" 35 and 37; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 35 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology SL 4 (critical); Chemistry SL 4 (critical); Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4; Physics SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk53w1001p7mrusvu5cla2',
      status: 'current',
      name: 'Medieval Studies',
      description:
        'Step back into the Middle Ages. This interdisciplinary program covers the history, literature, art, and philosophy of the medieval period.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html'
      ],
      notes:
        'Content 4.4: Medieval Studies: Faculty of Arts & Humanities, which students enter in first year before applying to a module. Arts & Humanities has "No required courses": checked, none required. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Arts & Humanities "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Music / Bachelor of Arts".
    {
      id: 'cmksk5ett007n7mruvvd0dxu3',
      status: 'current',
      name: 'Music (Bachelor of Music / BA Music)',
      description:
        'Study music at Western to make the most of your talents. The industry includes teachers, composers, conductors, and every business discipline. (Audition required).',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Music',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/music.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/music.html'
      ],
      notes:
        'Content 4.4: Don Wright Faculty of Music, BMus or BA in Music. No IB courses are required; "Faculty recommendation based on your audition and/or interview (Required)", registration by 1 February 2027. Checked, none required: the stored IB Music row had no source. The degree is a BMus or a BA, not a double degree; stored as Bachelor of Music, the name keeping both. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Music (BMUS), Music (BA) "typically had averages between" 25 and 28; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Music SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk5fay007v7mru63xb4577',
      status: 'current',
      name: 'Music Administrative Studies',
      description:
        'Study music at Western to make the most of your talents. The industry includes teachers, composers, conductors, and every business discipline.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/music.html',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/music.html'
      ],
      notes:
        'Content 4.4: Music Administrative Studies (BA, Specialization), Don Wright Faculty of Music. Required: "HL or SL IB Math (Any)", stored as Maths AA or AI, critical at 4; an audition and/or interview is required of all Music applicants. IB Music is not required, so the stored Music row is removed. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Music Administrative Studies "typically had averages between" 30 and 33; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Maths AA or Maths AI SL 4 (critical); Music SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Science in Nursing (BScN)".
    {
      id: 'cmksk5bvi00637mruxd2z3tvf',
      status: 'current',
      name: 'Nursing',
      description:
        'Step into a career that makes a difference. At Western, you’ll learn from expert faculty and join a community of passionate healthcare leaders.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3.5 years',
      minIBPoints: 27,
      programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/nursing.html',
      requirements: [
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/nursing.html'
      ],
      notes:
        'Content 4.4: Direct Entry Bachelor of Science in Nursing, a 3.5-year program (was stored as 4 years). Required: HL or SL Biology, Chemistry, "IB English" and "IB Math Analysis or Math Applications", all critical at 4. "IB English" is stored as English A (Literature, or Language and Literature), as Toronto\'s "English" is: Western gives no rule for English B. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Nursing "typically had averages between" 35 and 40; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 36 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology SL 4 (critical); Chemistry SL 4 (critical); English A Literature or English A Language and Literature SL 4 (critical); Maths AA or Maths AI SL 4 (critical). The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk54bc001v7mrur1rlp00x',
      status: 'current',
      name: 'Philosophy',
      description:
        'Tackle the big questions of existence, knowledge, and ethics. Philosophy develops rigorous analytical skills and the ability to construct powerful arguments.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html'
      ],
      notes:
        'Content 4.4: Philosophy: Faculty of Arts & Humanities, which students enter in first year before applying to a module. Arts & Humanities has "No required courses": checked, none required. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Arts & Humanities "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmksk5o6s00cx7mrurof68y4t',
      status: 'current',
      name: 'Physics, Medical Physics & Astronomy',
      description:
        'Join our community of scholars in high-tech research labs. Build your own degree path with thousands of options. At Western, you are a scientist.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        {
          courses: ['BIO', 'CHEM', 'PHYS', 'CS', 'ESS', 'DES-TECH', 'SEHS'],
          level: 'SL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html'
      ],
      notes:
        'Content 4.4: Physics, Medical Physics & Astronomy: Faculty of Science, which students enter in first year and choose modules from. Science requires "HL or SL: IB Math (Any), IB Science (Any)". "IB Math (Any)" is stored as Maths AA or AI at any level, and "IB Science (Any)" as any Group 4 subject (Biology, Chemistry, Physics, Computer Science, ESS, Design Technology, SEHS), both critical at 4. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Science "typically had averages between" 28 and 32; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 30 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology or Chemistry or ESS or Physics SL 4 (critical); Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk5fy300877mrus4appanw',
      status: 'current',
      name: 'Psychology (BA)',
      description:
        'Analysis, perspective, insights. Social sciences take you to heady places. At Western, you dig into what the ideas mean for real people and organizations.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/social-science.html',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/social-science.html'
      ],
      notes:
        'Content 4.4: Psychology (BA): Faculty of Social Science, which has "No required courses". "All Specializations and Majors in Psychology requires a first-year university Math course; therefore, we highly recommend IB Math": stored as Maths AA or AI, not critical. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Social Science "typically had averages between" 28 and 32; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4; Maths AA or Maths AI SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmksk5gg4008h7mruztprcroj',
      status: 'current',
      name: 'Psychology (BSc)',
      description:
        'Analysis, perspective, insights. Social sciences take you to heady places. At Western, you dig into what the ideas mean for real people and organizations.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/social-science.html',
      requirements: [
        { courses: ['BIO'], level: 'SL', grade: 4, critical: false },
        { courses: ['CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/social-science.html'
      ],
      notes:
        'Content 4.4: Psychology (BSc): Faculty of Social Science, which has "No required courses". "For the BSc in Psychology: IB Biology, and Chemistry or Physics": stored, not critical, because admission to Social Science does not require them. "All Specializations and Majors in Psychology requires a first-year university Math course; therefore, we highly recommend IB Math": stored as Maths AA or AI, not critical. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Social Science "typically had averages between" 28 and 32; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology SL 4 (critical); Chemistry or Physics SL 4 (critical); Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk5hqo00977mru13ccxhhe',
      status: 'current',
      name: 'Social Science (General)',
      description:
        'Analysis, perspective, insights. Social sciences take you to heady places. At Western, you dig into what the ideas mean for real people and organizations.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/social-science.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/social-science.html'
      ],
      notes:
        'Content 4.4: Social Science: Faculty of Social Science, which has "No required courses". Maths is recommended, not required: checked, none required. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Social Science "typically had averages between" 28 and 32; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Science (B.Sc.)".
    {
      id: 'cmksk5oz300df7mrul5y0ce3g',
      status: 'current',
      name: 'Statistical & Actuarial Sciences',
      description:
        'Join our community of scholars in high-tech research labs. Build your own degree path with thousands of options. At Western, you are a scientist.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 27,
      programUrl: 'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        {
          courses: ['BIO', 'CHEM', 'PHYS', 'CS', 'ESS', 'DES-TECH', 'SEHS'],
          level: 'SL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/science.html'
      ],
      notes:
        'Content 4.4: Statistical & Actuarial Sciences: Faculty of Science, which students enter in first year and choose modules from. Science requires "HL or SL: IB Math (Any), IB Science (Any)". "IB Math (Any)" is stored as Maths AA or AI at any level, and "IB Science (Any)" as any Group 4 subject (Biology, Chemistry, Physics, Computer Science, ESS, Design Technology, SEHS), both critical at 4. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Science "typically had averages between" 28 and 32; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 30 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: Biology or Chemistry or ESS or Physics SL 4 (critical); Maths AA or Maths AI SL 4 (critical); English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk54re00217mruhc8t9u32',
      status: 'current',
      name: 'Theatre Studies',
      description:
        'Explore theatre history, theory, and performance. This program examines drama from ancient times to the present day, often in conjunction with practical performance opportunities.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html'
      ],
      notes:
        'Content 4.4: Theatre Studies: Faculty of Arts & Humanities, which students enter in first year before applying to a module. Arts & Humanities has "No required courses": checked, none required. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Arts & Humanities "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk556d00277mrule6199on',
      status: 'current',
      name: 'Visual Arts',
      description:
        'Combine studio practice with art history and theory. Visual Arts offers a dynamic environment for creative expression and critical reflection. (Note: Portfolio required for Studio programs).',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html'
      ],
      notes:
        'Content 4.4: Visual Arts (BA modules in Art History and Studio Art): Faculty of Arts & Humanities, which students enter in first year before applying to a module. Arts & Humanities has "No required courses": checked, none required. The direct-entry BFA in Studio Art is a separate application with a portfolio and personal statement (deadline 15 February 2027); the BA is entered through the Faculty. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Arts & Humanities "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-24. Degree stored as "Bachelor of Arts (B.A.)".
    {
      id: 'cmksk55lp002d7mru6xzcr4ns',
      status: 'current',
      name: 'Writing Studies',
      description:
        'Hone your writing skills for professional and creative contexts. This program focuses on the theory and practice of writing in various genres and media.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 27,
      programUrl:
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://welcome.uwo.ca/next-steps/requirements/international-baccalaureate.html',
        'https://welcome.uwo.ca/what-can-i-study/undergraduate-programs/arts-humanities.html'
      ],
      notes:
        'Content 4.4: Writing Studies: Faculty of Arts & Humanities, which students enter in first year before applying to a module. Arts & Humanities has "No required courses": checked, none required. Western\'s IB page: a complete Diploma with Theory of Knowledge and the Extended Essay, passes in six subjects (three at HL), "a minimum total grade of 27 (including the Extended Essay and TOK)", "no mark less than 4 on any course", and each program\'s required courses, HL or SL. The only minimum Western publishes is 27, out of 45 with the core, stored as published per the data conventions ("minIBPoints is the published minimum total"; the typical offer goes in the notes, as for Toronto Engineering\'s 30). Students admitted to Arts & Humanities "typically had averages between" 28 and 30; for "the best chance of admission, you\'ll usually need predicted results in the low to mid 30s". The stored 28 matched no published minimum. Subjects: a course the IB page lists as required is critical, at 4 (the lowest mark it accepts); a subject it says one program needs, though admission to the faculty does not, is stored but not critical; recommended subjects are not stored. Stored before: English A Literature or English A Language and Literature SL 4. The faculty page gives "Start Date: September 2027" and the IB page\'s supplemental deadlines run from February to April 2027, so checked for 2027.'
    }
  ]
}

export default refresh
