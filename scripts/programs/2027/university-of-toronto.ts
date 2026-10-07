import type { RefreshFile } from '../lib/refresh'

/**
 * University of Toronto: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-toronto
 */
const refresh: RefreshFile = {
  university: 'University of Toronto',
  entryYear: 2027,
  checkedOn: '2026-09-29',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6mt2bu001p7mdgejr5tdnp',
      status: 'current',
      name: 'Actuarial Science',
      description:
        'Actuarial Science is a discipline that applies mathematical and statistical methods to assess risk in the insurance and finance industries. The program provides training in probability, statistics, financial mathematics, and economics. Students prepare for professional actuarial examinations and develop skills in risk analysis, financial modeling, and data analysis. Graduates pursue careers as actuaries in insurance companies, consulting firms, banks, and government agencies.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl: 'https://future.utoronto.ca/program/actuarial-science',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/actuarial-science'
      ],
      notes:
        'Content 4.3: The stored Maths AA HL 6 is corrected: the prerequisite is AA SL or HL, or AI HL. St. George, Faculty of Arts & Science, admission category Mathematical & Physical Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), at SL or HL. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Mathematical & Physical Sciences category, and English and Maths 5 to 7 in the required subjects; the bottom of each subject range is stored. The stored 36 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6mt0d2000v7mdg3vijeozl',
      status: 'current',
      name: 'Anthropology',
      description:
        'Anthropology examines the complexity and diversity of human experience, past and present, through evolutionary, archaeological, social, cultural, and linguistic perspectives. As such, Anthropology is a truly interdisciplinary venture that spans the natural sciences, social sciences, and humanities. This broad mandate has led to the division of the discipline into three broad areas of research: Archaeology; Evolutionary Anthropology; and the study of Society, Culture and Language. A training in anthropology prepares students to think clearly and critically; to engage with a wide range of perspectives, experiences, and world views; and to reach ethically sound decisions.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://future.utoronto.ca/program/anthropology-hba',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/anthropology-hba'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Arts & Science, admission category Social Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, at SL or HL. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Social Sciences category, and English 5 to 7 in the required subjects; the bottom of each subject range is stored. The stored 32 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6mt2mq001t7mdg5fobqqt7',
      status: 'current',
      name: 'Architecture Studies',
      description:
        'The Daniels Faculty of Architecture, Landscape, and Design offers a Bachelor of Arts in Architectural Studies that provides a foundation in architectural history, theory, and design thinking. Students explore the built environment through courses in design studios, architectural history, urban studies, and sustainability. The program prepares students for graduate studies in architecture, urban planning, landscape architecture, or related fields, as well as careers in design, heritage conservation, and the cultural sectors.',
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://future.utoronto.ca/program/architectural-studies',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://future.utoronto.ca/program/architectural-studies'
      ],
      notes:
        'Content 4.3: St. George, Daniels Faculty of Architecture, Landscape, and Design; Honours Bachelor of Arts, Architectural Studies specialist. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma including English (HL / SL), no other subject; a supplemental application is required. No grade is given; 4 is stored. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. The faculty publishes no IB points figure; the stored 33 points have no official source and are kept, not re-verified. The URL moves from the Daniels programs list to the admissions page for the program. The pages name no entry year, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6mt0m5000x7mdgi8jt942e',
      status: 'current',
      name: 'Astronomy and Astrophysics',
      description:
        'Astronomy explores the universe beyond the earth and attempts to understand the physical processes that describe its contents. Essentially all civilizations have developed astronomy to some degree, with records extending back to the Babylonians. The modern development of astronomy began with Galileo turning a telescope to the sky and the heliocentric model of the solar system. Astronomy and astrophysics have undergone a revolution in the past fifty years as telescopes ranging from the radio to the gamma ray have discovered the relict radiation from the Big Bang, stars and galaxies that were forming not long after, ultradense neutron stars and black holes, as well as planets around other stars. Astronomy as a discipline is a distinctive integration of many of the sciences. At the more advanced level a quantitative physical understanding of astrophysical systems is developed. A graduate in astronomy has a wide grounding in modern physical science which is important for a wide range of roles in society.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://future.utoronto.ca/program/astronomy-and-astrophysics',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/astronomy-and-astrophysics'
      ],
      notes:
        'Content 4.3: The stored Maths AA HL 5 and Physics HL 5 are corrected: Maths is AA SL or HL, or AI HL, and Physics is only recommended. St. George, Faculty of Arts & Science, admission category Mathematical & Physical Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), at SL or HL. Physics recommended, not stored. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Mathematical & Physical Sciences category, and English and Maths 5 to 7 in the required subjects; the bottom of each subject range is stored. The stored 34 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jachb002z7mx1d4uu2hzt',
      status: 'current',
      name: 'Biochemistry',
      description:
        'Biochemistry is the study of the chemistry of living organisms. Biochemists seek a molecular explanation of life by attempting to understand its underlying principles. Biochemistry is concerned with the relevance of a molecule to an organism and the correlations between its structure and its function. Modern biochemistry grew out of the application of chemical techniques to biological problems and is the foundation of biological science and medicine. Some of the most exciting areas of current biochemistry research include structural biology, enzyme mechanisms, signal transduction and regulation, biotechnology, molecular cell biology, gene expression and development, metabolic diseases, proteomics and bioinformatics, molecular evolution, protein folding, and membranes and transport.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://future.utoronto.ca/program/biochemistry',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/biochemistry'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Arts & Science, admission category Life Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), Biology, Chemistry, at SL or HL. Physics recommended, not stored. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Life Sciences category, and English and Maths 5 to 7 in the required subjects; the bottom of each subject range is stored. No grade is given for Biology or Chemistry; 4 is stored. The stored 33 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jabb0002d7mx1qlss2sce',
      status: 'current',
      name: 'Biology',
      description:
        "Biology is the scientific study of life. At no time in history has biology been more visible and important to human life and the future of our planet. The study of biology has vast applications: in understanding one's own body, in improving human health and natural resources, in grappling with the ethical questions that face humanity and in understanding the interdependent web of living organisms on the planet. Important discoveries and advances in the biological sciences occur weekly as scientists and their students around the world develop and use new techniques, theories, and approaches. The University of Toronto has an enormous depth of faculty members on the St. George campus who conduct leading-edge research and teach courses in the biological sciences across the broad spectrum of introductory to advanced topics.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://future.utoronto.ca/program/biology',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/biology'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Arts & Science, admission category Life Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), Biology, Chemistry, at SL or HL. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Life Sciences category, and English and Maths 5 to 7 in the required subjects; the bottom of each subject range is stored. No grade is given for Biology or Chemistry; 4 is stored. The stored 33 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6ja7ig00017mx1pad2rm0o',
      status: 'current',
      name: 'Chemical Engineering',
      description:
        'Chemical engineering is the primary engineering discipline that is based on the fundamental sciences of chemistry, physics, biochemistry and mathematics, in which processes are conceived, designed and operated to effect compositional changes in materials of all kinds. Chemical engineers play an important role in the development of a healthier environment and safer and healthier industrial workplaces. They develop new industrial processes that are more energy-efficient and environmentally friendly and create products that improve quality of life. Chemical engineers are responsible for improvements in technologies and in evaluating and controlling hazards. In addition to the basic sciences, chemical engineers use a well-defined body of knowledge in the application of the conservation laws that determine mass flow and energy relations; thermodynamics and kinetics which determine whether or not reactions are feasible and the rate at which they occur; and the chemical engineering rate laws that determine limits to the transfer of heat, mass and momentum.',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 30,
      programUrl: 'https://future.utoronto.ca/program/chemical-engineering',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://discover.engineering.utoronto.ca/how-to-apply/outofcanada/',
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://future.utoronto.ca/program/chemical-engineering'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Applied Science & Engineering. Its IB page for applicants from outside Canada: Maths (AA HL, AA SL or AI HL; AA HL "strongly recommended", not stored), Chemistry, Physics and English, at SL or HL; "Although most programs require higher scores, applicants must have a minimum predicted score of at least 30 (excluding ToK and EE points) with a minimum score of 4 in prerequisite subjects". The published minimum, 30, replaces the stored 36, which had no source; it is out of 42, stored as published, as Waterloo\'s 27 and McGill\'s figures are. Every prerequisite is critical at 4. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. The page gives its rules for "any applicant whose intended start date is September 2027", so checked for 2027. The URL moves from the academic calendar section to the admissions page for the program.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jablw002j7mx15lbywoi1',
      status: 'current',
      name: 'Chemistry',
      description:
        'Chemistry is a rewarding intellectual pursuit and a dominant force in shaping our civilization. Chemistry places a strong emphasis on an understanding of the structures and properties of individual atoms and molecules, and on using this understanding to interpret and predict the behaviour of matter. Many of the concepts of physics, and the methods of mathematics, are basic to chemistry. Chemistry is of fundamental importance to many other subjects including astrophysics, biological sciences, environmental science, geology, materials science, and medical sciences. These and other aspects of the subject are reflected in the undergraduate courses and programs offered by the Department.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://future.utoronto.ca/program/chemistry',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/chemistry'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Arts & Science, admission category Mathematical & Physical Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), Chemistry, at SL or HL. Physics recommended, not stored. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Mathematical & Physical Sciences category, and English and Maths 5 to 7 in the required subjects; the bottom of each subject range is stored. No grade is given for Chemistry; 4 is stored. The stored 33 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6ja7wm00097mx1dfyz4p2f',
      status: 'current',
      name: 'Civil Engineering',
      description:
        "Civil Engineering exists at the intersection of the human, built, and natural environments. Historically, civil engineers have been the professionals leading the design, construction, maintenance and eventual decommissioning of society's physical infrastructures, including transportation networks, water supply and wastewater treatment systems, structures for energy generation and distribution systems, buildings and other works, land, and water remediation and more. Although civil engineering is a highly technical profession, responsible engineering requires that engineers understand the impact of their decisions and their constructed works on society at large, including issues of environmental stewardship and life-cycle economic responsibility. For example, significant proportions of the world's energy and raw materials production go into the construction and operations of our buildings and transportation systems. Civil engineers have a significant role to play in making these systems more sustainable for future generations.",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 30,
      programUrl: 'https://future.utoronto.ca/program/civil-engineering',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://discover.engineering.utoronto.ca/how-to-apply/outofcanada/',
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://future.utoronto.ca/program/civil-engineering'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Applied Science & Engineering. Its IB page for applicants from outside Canada: Maths (AA HL, AA SL or AI HL; AA HL "strongly recommended", not stored), Chemistry, Physics and English, at SL or HL; "Although most programs require higher scores, applicants must have a minimum predicted score of at least 30 (excluding ToK and EE points) with a minimum score of 4 in prerequisite subjects". The published minimum, 30, replaces the stored 36, which had no source; it is out of 42, stored as published, as Waterloo\'s 27 and McGill\'s figures are. Every prerequisite is critical at 4. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. The page gives its rules for "any applicant whose intended start date is September 2027", so checked for 2027. The URL moves from the academic calendar section to the admissions page for the program.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6ja89f000h7mx112aos9vm',
      status: 'current',
      name: 'Computer Engineering',
      description:
        "The Computer Engineering undergraduate program is distinctive as it is based on the broad areas of electrical engineering and computer science. These foundations are used in the design and organization of computer systems, the design of programs that turn these systems into useful applications and the use of computers in communication and control systems. Design includes hardware, operating systems and software. Computer engineering students will learn how computer systems work and how they can be integrated into larger systems that serve a wide range of users and businesses. As a result, the program also ensures that our students will gain experience in communications, problem-solving and team management. A computer engineer may be involved in the design of computers and computer systems. They may also be engaged in the design of computer-based communications and control systems or in the design of microelectronic circuits, including computer-aided design and manufacturing. Computer system analysis and the design of both hardware and software for applications, such as artificial intelligence and expert systems, database systems, wireless networks, computer security and robotics, are included in the scope of the computer engineer's work.",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 30,
      programUrl: 'https://future.utoronto.ca/program/computer-engineering',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://discover.engineering.utoronto.ca/how-to-apply/outofcanada/',
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://future.utoronto.ca/program/computer-engineering'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Applied Science & Engineering. Its IB page for applicants from outside Canada: Maths (AA HL, AA SL or AI HL; AA HL "strongly recommended", not stored), Chemistry, Physics and English, at SL or HL; "Although most programs require higher scores, applicants must have a minimum predicted score of at least 30 (excluding ToK and EE points) with a minimum score of 4 in prerequisite subjects". The published minimum, 30, replaces the stored 37, which had no source; it is out of 42, stored as published, as Waterloo\'s 27 and McGill\'s figures are. Every prerequisite is critical at 4. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. The page gives its rules for "any applicant whose intended start date is September 2027", so checked for 2027. The URL moves from the academic calendar section to the admissions page for the program.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jaapb00217mx14lc9km6i',
      status: 'current',
      name: 'Computer Science',
      description:
        'Despite the name, Computer Science is not really a science of computers at all. Computers are quite remarkable electronic devices, but even more remarkable is what they can be made to do: simulate the flow of air over a wing, manage communication over the Internet, control the actions of a robot, synthesize realistic images, play grandmaster-level chess, learn how to automatically translate between languages, and on and on. Indeed, the application of computers in activities like these has affected most areas of modern life. What these tasks have in common has little to do with the physics or electronics of computers; what matters is that they can be formulated as some sort of computation. This is the real subject matter of Computer Science: computation, and what can or cannot be done computationally. In trying to make sense of what we can get a computer to do, a wide variety of topics come up. There are two recurring themes: the issue of scale (how big a system can we specify without getting lost in the design, or how big a task can a computer handle within reasonable bounds of time, memory, and accuracy) and the scope of computation (how far computational ideas can be applied).',
      field: 'Computer Science',
      degree: 'Bachelor of Computer Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://future.utoronto.ca/program/computer-science',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 6, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/computer-science'
      ],
      notes:
        'Content 4.3: The Computer Science major and specialist now award the Bachelor of Computer Science (BCS; the HBSc remains only for the minor), so the degree changes from Bachelor of Science. A supplemental application is required. St. George, Faculty of Arts & Science, admission category Computer Science. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), at SL or HL. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "High 30s" for the Computer Science category, and English and Maths 6 to 7 in the required subjects; the bottom of each subject range is stored. The stored 37 points are kept: "High 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6msy6600017mdgjnb9as5s',
      status: 'current',
      name: 'Criminology and Sociolegal Studies',
      description:
        'The Centre for Criminology and Sociolegal Studies (CrimSL) is a research and teaching unit at the University of Toronto. Founded in 1963 by Prof. John Edwards, CrimSL faculty and students study crime, justice, and governance through law from a variety of disciplinary perspectives and theoretical approaches. With backgrounds in sociology, anthropology, history, law, psychology, philosophy and political science, the faculty are actively engaged in Canadian and international criminological and sociolegal research. The Criminology and Sociolegal Studies program incorporates theory, research methods, and knowledge from a wide range of disciplines. The program provides students with a sound foundation for the understanding of crime and the administration of justice in Canada and abroad, and, more generally, the processes of social order and disorder.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://future.utoronto.ca/program/criminology',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/criminology'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Arts & Science, admission category Social Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, at SL or HL. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Social Sciences category, and English 5 to 7 in the required subjects; the bottom of each subject range is stored. The stored 32 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jaazz00277mx14y0yhkhl',
      status: 'current',
      name: 'Data Science',
      description:
        'Data Science is jointly offered by the Departments of Computer Science and Statistical Sciences. The program prepares students to work with large and complex datasets, combining skills in programming, statistics, and machine learning. Students learn to extract insights from data, build predictive models, and communicate findings effectively. The specialist program in Data Science exposes students to a broad range of data science topics with focuses available in Technology Leadership and Quantitative Finance.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://future.utoronto.ca/program/data-science',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 6, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/data-science'
      ],
      notes:
        'Content 4.3: Data Science Specialist, HBSc, admitted through the Computer Science category (OUAC code TAD). The stored URL was the Computer Science calendar section. St. George, Faculty of Arts & Science, admission category Computer Science. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), at SL or HL. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "High 30s" for the Computer Science category, and English and Maths 6 to 7 in the required subjects; the bottom of each subject range is stored. The stored 37 points are kept: "High 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6mszef000h7mdg83h6085v',
      status: 'current',
      name: 'Earth Sciences',
      description:
        'Do you like sciences but have a hard time choosing which one to pursue? Can you picture yourself performing experiments in the lab, or collecting data in the field, or developing and testing models on a computer? Then Earth Sciences is the discipline for you. It is the study of physical, chemical, and biological processes over a wide range of temporal and spatial scales in earth and planetary systems. Our programs emphasise hands-on lab and field work. At least one field course is required in each program, and several courses have offered optional one-day to two-week long trips. In recent years courses have travelled to Newfoundland, Texas, Arizona, Hawaii, Chile, and New Zealand, and small groups of undergraduates have been involved with field research in Turkey, Peru, Greece and South Africa.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://artsci.calendar.utoronto.ca/section/Earth-Sciences',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/geoscience'
      ],
      notes:
        'Content 4.3: The Department of Earth Sciences\' programs (Geoscience, Geology, Earth and Environmental Systems) share one set of prerequisites; the department\'s calendar section stays the link, and Geoscience\'s admissions page is the source. The future.utoronto.ca "Earth Science" page is U of T Mississauga\'s. St. George, Faculty of Arts & Science, admission category Mathematical & Physical Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), Chemistry, at SL or HL. Biology and Physics recommended, not stored. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Mathematical & Physical Sciences category, and English and Maths 5 to 7 in the required subjects; the bottom of each subject range is stored. No grade is given for Chemistry; 4 is stored. The stored 33 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jad9q003b7mx1numlmkty',
      status: 'current',
      name: 'Economics',
      description:
        'Economics studies how individuals, businesses, governments, and societies allocate scarce resources. Students learn to analyze economic systems, markets, and policy using theoretical frameworks and quantitative methods. The program covers microeconomics, macroeconomics, econometrics, and various specialized fields such as international economics, public finance, and labor economics. Graduates pursue careers in finance, consulting, government, research, and business.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://future.utoronto.ca/program/economics',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/economics'
      ],
      notes:
        'Content 4.3: The stored Maths group (AA or AI at SL 5, not critical) becomes the Calculus prerequisite, critical. St. George, Faculty of Arts & Science, admission category Social Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), at SL or HL. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Social Sciences category, and English 5 to 7 in the required subjects; the bottom of each subject range is stored. The Social Sciences category gives no grade for Maths; 4 is stored. The stored 34 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6ja8m2000p7mx1t4ohrrq5',
      status: 'current',
      name: 'Electrical Engineering',
      description:
        "Electrical engineering is an exciting and extensive field that applies the principles of science and mathematics with engineering fundamentals which are then used to develop a student's skills needed to analyze, design and build electrical, electronic and photonics systems. The program includes diverse areas of study such as microelectronics, digital communications, wireless systems, photonics systems, signal processing, control, microprocessors, computer technology, energy systems and electronic device fabrication. This breadth is unique to electrical engineering and opens a wide range of career opportunities. As a result, the program also ensures that through their course work, students gain experience in communications, problem-solving and team management. An electrical engineer may be involved in the design, development and testing of electrical and electronic equipment such as telecommunication systems, industrial process controls, signal processing, navigation systems, power generation, transmission systems, wireless and optical communications and integrated circuit engineering.",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 30,
      programUrl: 'https://future.utoronto.ca/program/electical-engineering',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://discover.engineering.utoronto.ca/how-to-apply/outofcanada/',
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://future.utoronto.ca/program/electical-engineering'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Applied Science & Engineering. Its IB page for applicants from outside Canada: Maths (AA HL, AA SL or AI HL; AA HL "strongly recommended", not stored), Chemistry, Physics and English, at SL or HL; "Although most programs require higher scores, applicants must have a minimum predicted score of at least 30 (excluding ToK and EE points) with a minimum score of 4 in prerequisite subjects". The published minimum, 30, replaces the stored 37, which had no source; it is out of 42, stored as published, as Waterloo\'s 27 and McGill\'s figures are. Every prerequisite is critical at 4. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. The page gives its rules for "any applicant whose intended start date is September 2027", so checked for 2027. The URL moves from the academic calendar section to the admissions page for the program.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6ja8yd000x7mx1a49gupdt',
      status: 'current',
      name: 'Engineering Science',
      description:
        'Engineering Science is a rigorous and comprehensive undergraduate program that provides the foundational knowledge and skills required to pursue any branch of engineering or related scientific fields. Students spend their first two years studying a broad and challenging curriculum of mathematics, physics, chemistry, and engineering fundamentals. In their third year, students choose from eight specialized majors including Aerospace Engineering, Biomedical Systems Engineering, Electrical and Computer Engineering, Energy Systems Engineering, Engineering Mathematics, Statistics and Finance, Engineering Physics, Machine Intelligence, and Robotics Engineering. The program is designed for students seeking intensive training in all aspects of engineering with the flexibility to specialize in cutting-edge fields.',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 30,
      programUrl: 'https://future.utoronto.ca/program/engineering-science',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://discover.engineering.utoronto.ca/how-to-apply/outofcanada/',
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://future.utoronto.ca/program/engineering-science'
      ],
      notes:
        'Content 4.3: Engineering Science is a single BASc program; it states no higher IB minimum of its own. St. George, Faculty of Applied Science & Engineering. Its IB page for applicants from outside Canada: Maths (AA HL, AA SL or AI HL; AA HL "strongly recommended", not stored), Chemistry, Physics and English, at SL or HL; "Although most programs require higher scores, applicants must have a minimum predicted score of at least 30 (excluding ToK and EE points) with a minimum score of 4 in prerequisite subjects". The published minimum, 30, replaces the stored 38, which had no source; it is out of 42, stored as published, as Waterloo\'s 27 and McGill\'s figures are. Every prerequisite is critical at 4. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. The page gives its rules for "any applicant whose intended start date is September 2027", so checked for 2027. The URL moves from the academic calendar section to the admissions page for the program.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jadkr003h7mx12kzl3s26',
      status: 'current',
      name: 'English',
      description:
        'The English program offers students the opportunity to study literature in the English language from the medieval period to the present day, as well as courses in creative writing, drama, and critical theory. Students develop skills in close reading, critical analysis, research, and writing that are valuable in many careers. The program prepares students for graduate studies in English, law school, education, journalism, publishing, and many other fields.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://future.utoronto.ca/program/english',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/english'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Arts & Science, admission category Humanities. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, at SL or HL. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Low to mid 30s" for the Humanities category, and English 5 to 7 in the required subjects; the bottom of each subject range is stored. The stored 32 points are kept: "Low to mid 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jaebe003r7mx1cxri00wn',
      status: 'current',
      name: 'Environmental Science',
      description:
        'Environmental Science is an interdisciplinary field that integrates physical, biological, and social sciences to understand and address environmental challenges. Students study topics such as climate change, biodiversity, pollution, resource management, and sustainability. The program combines scientific knowledge with practical skills for analyzing and solving environmental problems. Graduates pursue careers in environmental consulting, government agencies, non-profit organizations, and research.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://future.utoronto.ca/program/environmental-science',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/environmental-science'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Arts & Science, admission category Life Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), Biology, Chemistry, at SL or HL. Physics recommended, not stored. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Life Sciences category, and English and Maths 5 to 7 in the required subjects; the bottom of each subject range is stored. No grade is given for Biology or Chemistry; 4 is stored. The stored 33 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6mt0yo00137mdgcexy3jde',
      status: 'current',
      name: 'Global Health',
      description:
        'The Global Health program examines health as a global issue, exploring the social determinants of health, health inequities, and the impact of globalization on health outcomes. Students learn to analyze health challenges from multiple perspectives including epidemiology, health policy, ethics, and social sciences. The program prepares students for careers in public health, international development, health policy, and research. Students engage with topics such as infectious disease, maternal and child health, health systems strengthening, and global health governance.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://future.utoronto.ca/program/global-health',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/global-health'
      ],
      notes:
        'Content 4.3: The stored URL was the Human Biology calendar section, shared with two other programs. St. George, Faculty of Arts & Science, admission category Life Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), Biology, Chemistry, at SL or HL. Physics recommended, not stored. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Life Sciences category, and English and Maths 5 to 7 in the required subjects; the bottom of each subject range is stored. No grade is given for Biology or Chemistry; 4 is stored. The stored 33 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jadvm003n7mx1vtyk1cuw',
      status: 'current',
      name: 'History',
      description:
        'The study of History involves the investigation of past events, societies, and cultures. Students learn to analyze primary sources, evaluate historical arguments, and construct their own interpretations of the past. The program covers a wide range of topics including political, social, cultural, and economic history from ancient times to the present, across diverse regions of the world. History develops critical thinking and research skills valuable in many careers.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://future.utoronto.ca/program/history',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/history'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Arts & Science, admission category Humanities. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, at SL or HL. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Low to mid 30s" for the Humanities category, and English 5 to 7 in the required subjects; the bottom of each subject range is stored. The stored 32 points are kept: "Low to mid 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6msyfj00037mdgyhdm7kng',
      status: 'current',
      name: 'Human Biology',
      description:
        'The Human Biology Program is an undergraduate collaborative program homed in Cell and Systems Biology with strong connections between the Faculty of Arts and Science and the Faculty of Medicine. With community-engaged learning courses, undergraduate research opportunities, and award-winning faculty members, we offer an exciting educational experience for students. Our programs examine the biology of our species through interdisciplinary lenses by integrating topics from the biological and medical sciences, social sciences, and the humanities. The overall structure of the collaborative program is designed to expose students to the transdisciplinary field of human biology with opportunities to specialize in selected areas of inquiry in the field.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://future.utoronto.ca/program/human-biology',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/human-biology'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Arts & Science, admission category Life Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), Biology, Chemistry, at SL or HL. Physics recommended, not stored. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Life Sciences category, and English and Maths 5 to 7 in the required subjects; the bottom of each subject range is stored. No grade is given for Biology or Chemistry; 4 is stored. The stored 33 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6msyt100097mdgssyq810h',
      status: 'current',
      name: 'Immunology',
      description:
        "Immunology is an integrative branch of the medical sciences that draws upon the more traditional disciplines of Molecular Biology, Microbiology, Pathology, and Biochemistry. In essence, Immunology is the study of the physiological responses that result when foreign (i.e., non-self) materials are introduced into a vertebrate organism such as humans. Traditionally, the discipline has focused on the body's response to infectious micro-organisms, with the purpose of developing effective vaccines. However, the scope of modern Immunology now encompasses all aspects of self vs. non-self recognition phenomena including organ transplantation, tumour immunology and autoimmune diseases. Recent major advances in our understanding of the cellular and molecular basis of the immune response promise to provide us with a new generation of prophylactic, therapeutic and diagnostic reagents of relevance to human and animal health.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://future.utoronto.ca/program/immunology',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/immunology'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Arts & Science, admission category Life Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), Biology, Chemistry, at SL or HL. Physics recommended, not stored. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Life Sciences category, and English and Maths 5 to 7 in the required subjects; the bottom of each subject range is stored. No grade is given for Biology or Chemistry; 4 is stored. The stored 34 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6ja9az00157mx1v7eqmfy3',
      status: 'current',
      name: 'Industrial Engineering',
      description:
        "Industrial Engineering (IE) is a discipline that applies engineering principles to the design and operation of organizations. Industrial Engineering students learn to analyze, design, implement, control, evaluate and improve the performance of complex organizations, taking into consideration people, technology and information systems. Industrial engineers use operations research, information engineering, artificial intelligence and human factors tools and methods to improve and optimize systems operations and performance. Industrial engineers share the common goal of increasing an organization's efficiency, profitability and safety in a variety of industries including health care, finance, retail, entertainment, government, information technology, transportation, energy, manufacturing and consulting. Unlike traditional disciplines in engineering and the mathematical sciences, IE addresses the role of the human decision-maker as a key contributor to the inherent complexity of systems and the primary benefactor of the analyses.",
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 30,
      programUrl: 'https://future.utoronto.ca/program/industrial-engineering',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://discover.engineering.utoronto.ca/how-to-apply/outofcanada/',
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://future.utoronto.ca/program/industrial-engineering'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Applied Science & Engineering. Its IB page for applicants from outside Canada: Maths (AA HL, AA SL or AI HL; AA HL "strongly recommended", not stored), Chemistry, Physics and English, at SL or HL; "Although most programs require higher scores, applicants must have a minimum predicted score of at least 30 (excluding ToK and EE points) with a minimum score of 4 in prerequisite subjects". The published minimum, 30, replaces the stored 36, which had no source; it is out of 42, stored as published, as Waterloo\'s 27 and McGill\'s figures are. Every prerequisite is critical at 4. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. The page gives its rules for "any applicant whose intended start date is September 2027", so checked for 2027. The URL moves from the academic calendar section to the admissions page for the program.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6mt22r001n7mdg4k5smgjp',
      status: 'current',
      name: 'International Relations',
      description:
        'International Relations examines the political, economic, and social dynamics between states and other global actors. Students study topics including international security, global governance, foreign policy, international law, and global political economy. The program combines perspectives from political science, economics, history, and law to understand contemporary global challenges. Graduates pursue careers in diplomacy, international organizations, non-governmental organizations, journalism, and business.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://future.utoronto.ca/program/international-relations',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/international-relations'
      ],
      notes:
        'Content 4.3: International Relations is offered through both the Humanities (TAH) and Social Sciences (TAX) categories; both ask English 5 to 7, and the Social Sciences range is shown. St. George, Faculty of Arts & Science, admission category Social Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, at SL or HL. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Social Sciences category, and English 5 to 7 in the required subjects; the bottom of each subject range is stored. The stored 33 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jaeuj003z7mx19w3shw9u',
      status: 'current',
      name: 'Kinesiology',
      description:
        'With the growing awareness of the role that physical activity plays in the optimization of health and in the prevention and treatment of the leading causes of illness and disease, there is an increasing demand for professionals in the field of kinesiology and physical education. Students enrolled in the Bachelor of Kinesiology (BKin) program take academic courses in human movement and its relationship to health. This program combines knowledge spanning the biophysical, psychological and physical cultural areas of study and includes course topics such as exercise physiology, psychology of injury and rehabilitation, motor learning and control, ethical issues and biomechanics.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Kinesiology',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://future.utoronto.ca/program/kinesiology',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://future.utoronto.ca/program/kinesiology',
        'https://kpe.utoronto.ca/academics-researchfuture-students/bachelor-kinesiology-bkin'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Kinesiology & Physical Education, Bachelor of Kinesiology. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma including English (HL / SL); Maths, any of AA or AI at SL or HL (AI SL is accepted here, as the Advanced Functions equivalent); and "Senior level/Grade 12 academic science", stored as one of Biology, Chemistry or Physics (whether another IB science counts is not stated). Introductory kinesiology or exercise science is recommended, not stored. A supplemental application is required. No grades are given; 4 is stored. The stored program asked for no subjects. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. The faculty publishes no IB points figure; the stored 33 points have no official source and are kept, not re-verified. The URL moves from the faculty page to the admissions page for the program. The pages name no entry year, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6mszst000p7mdggmaiaae1',
      status: 'current',
      name: 'Linguistics',
      description:
        'Linguistics can trace its roots back to the ancient Sanskrit grammarians, and the study of language is probably as old as language itself. However, the twentieth century has produced an explosion in the scientific study of language. As our understanding of the nature and structure of human language develops, linguistics is becoming relevant to many other areas of research such as Cognitive Science, Artificial Intelligence, Speech-Language Pathology, Audiology, Psychology, and Philosophy. On its own, linguistics represents an invaluable key to the nature of the mind and the diverse elements of human culture; as a tool, linguistics is unmatched in preparing one for the learning and teaching of languages and for integrating language with technology.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://future.utoronto.ca/program/linguistics',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/linguistics'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Arts & Science, admission category Humanities. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, at SL or HL. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Low to mid 30s" for the Humanities category, and English 5 to 7 in the required subjects; the bottom of each subject range is stored. The stored 32 points are kept: "Low to mid 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6ja9nm001d7mx1l1uoiw3b',
      status: 'current',
      name: 'Materials Engineering',
      description:
        'The goal of the materials engineering undergraduate curriculum is to provide an understanding of the underlying principles of synthesis, characterization and processing of materials and the interrelationships among structure, properties and processing. The program prepares students for professional careers in a wide variety of industries, as well as for advanced study in this field. It also provides students with the opportunity to broaden their education in engineering and science or to expand their knowledge in a particular technical area by offering course foundations in four core areas: biomaterials, manufacturing with materials, sustainable materials processing and design of materials (including nanomaterials).',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 30,
      programUrl: 'https://future.utoronto.ca/program/materials-engineering',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://discover.engineering.utoronto.ca/how-to-apply/outofcanada/',
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://future.utoronto.ca/program/materials-engineering'
      ],
      notes:
        'Content 4.3: U of T\'s program is Materials Engineering (BASc); the stored "Materials Science and Engineering" is renamed. St. George, Faculty of Applied Science & Engineering. Its IB page for applicants from outside Canada: Maths (AA HL, AA SL or AI HL; AA HL "strongly recommended", not stored), Chemistry, Physics and English, at SL or HL; "Although most programs require higher scores, applicants must have a minimum predicted score of at least 30 (excluding ToK and EE points) with a minimum score of 4 in prerequisite subjects". The published minimum, 30, replaces the stored 35, which had no source; it is out of 42, stored as published, as Waterloo\'s 27 and McGill\'s figures are. Every prerequisite is critical at 4. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. The page gives its rules for "any applicant whose intended start date is September 2027", so checked for 2027. The URL moves from the academic calendar section to the admissions page for the program.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jac7x002v7mx1y10usk9g',
      status: 'current',
      name: 'Mathematics',
      description:
        "Mathematics is the study of shape, quantity, pattern and structure. It serves as a tool for our scientific understanding of the world. Knowledge of mathematics opens gateways to many different professions such as economics, finance, computing, engineering, and the natural sciences. Aside from practical considerations, mathematics can be a highly satisfying intellectual pursuit, with career opportunities in teaching and research. The department counts many of Canada's leading research mathematicians among its faculty. Our mathematics programs are flexible, allowing students to select courses based on specialization and interest. In the Mathematics, Applied Mathematics, Mathematics and Physics, and Mathematics and Philosophy specialist programs, students acquire an in-depth knowledge and expertise in mathematical reasoning and the language of mathematics, with its emphasis on rigor and precision.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://future.utoronto.ca/program/mathematics',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/mathematics'
      ],
      notes:
        'Content 4.3: The stored Maths AA HL 6 is corrected: the prerequisite is AA SL or HL, or AI HL. St. George, Faculty of Arts & Science, admission category Mathematical & Physical Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), at SL or HL. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Mathematical & Physical Sciences category, and English and Maths 5 to 7 in the required subjects; the bottom of each subject range is stored. The stored 34 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jaa03001l7mx18kiakfw9',
      status: 'current',
      name: 'Mechanical Engineering',
      description:
        'The Mechanical Engineering profession faces unprecedented challenges and exciting opportunities in its efforts to serve the needs of society. The broad disciplinary base and design orientation of the field will continue to make the skills of the mechanical engineer crucial to the success of virtually all technical systems that involve energy, motion, materials, design, automation and manufacturing. The explosive growth in the availability of lower-cost, compact and high-speed computing hardware and software is already revolutionizing the analysis, design, manufacture and operation of many mechanical engineering systems. Mechanical engineering systems are part of automotive engineering, robotics, fuel utilization, nuclear and thermal power generation, materials behaviour in design applications, transportation, biomechanical engineering, environmental control and many others. To prepare mechanical engineers for the challenges of such a broad discipline, the program is designed to provide fundamental knowledge of the various subdisciplines, teach methodology and systems analysis techniques for integrating this knowledge into useful design concepts, and make graduates fully conversant with modern facilities, such as CAD/CAM and microprocessor control, by which design concepts can be produced and competitively manufactured.',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 30,
      programUrl: 'https://future.utoronto.ca/program/mechanical-engineering',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://discover.engineering.utoronto.ca/how-to-apply/outofcanada/',
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://future.utoronto.ca/program/mechanical-engineering'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Applied Science & Engineering. Its IB page for applicants from outside Canada: Maths (AA HL, AA SL or AI HL; AA HL "strongly recommended", not stored), Chemistry, Physics and English, at SL or HL; "Although most programs require higher scores, applicants must have a minimum predicted score of at least 30 (excluding ToK and EE points) with a minimum score of 4 in prerequisite subjects". The published minimum, 30, replaces the stored 36, which had no source; it is out of 42, stored as published, as Waterloo\'s 27 and McGill\'s figures are. Every prerequisite is critical at 4. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. The page gives its rules for "any applicant whose intended start date is September 2027", so checked for 2027. The URL moves from the academic calendar section to the admissions page for the program.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jaad1001t7mx19bf2kb1i',
      status: 'current',
      name: 'Mineral Engineering',
      description:
        'Mineral engineering encompasses those activities necessary to extract and process natural mineral resources. The Lassonde Mineral Engineering Program is comprehensive, covering topics from the entire scope of minerals engineering: from geology and mineral exploration, through analysis and design of surface and underground excavations, mechanical and explosive excavation of geological materials, planning and management of mines and quarries, processing of metallic, non-metallic and industrial minerals, safety and environmental protection and on to financial aspects of minerals operations. Graduates obtain comprehensive training and are well prepared for future challenges in the planning and financing of mineral and related engineering projects.',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 30,
      programUrl: 'https://future.utoronto.ca/program/mineral-engineering',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://discover.engineering.utoronto.ca/how-to-apply/outofcanada/',
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://future.utoronto.ca/program/mineral-engineering'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Applied Science & Engineering. Its IB page for applicants from outside Canada: Maths (AA HL, AA SL or AI HL; AA HL "strongly recommended", not stored), Chemistry, Physics and English, at SL or HL; "Although most programs require higher scores, applicants must have a minimum predicted score of at least 30 (excluding ToK and EE points) with a minimum score of 4 in prerequisite subjects". The published minimum, 30, replaces the stored 35, which had no source; it is out of 42, stored as published, as Waterloo\'s 27 and McGill\'s figures are. Every prerequisite is critical at 4. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. The page gives its rules for "any applicant whose intended start date is September 2027", so checked for 2027. The URL moves from the academic calendar section to the admissions page for the program.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jaemi003x7mx1n22uh2vl',
      status: 'current',
      name: 'Music',
      description:
        "The Bachelor of Music program at the Faculty of Music offers specializations in Composition, Interdisciplinary Music Studies (Classical or Jazz), History, Culture & Theory, and Music Education (Classical or Jazz). All students complete core requirements in history & culture, theory, and performance. The curriculum develops students' understanding of melody, rhythm, harmony, and form through analysis and aural skills development. Performance training enhances musical and technical growth with extensive exposure to solo and ensemble repertoire.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Music',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://music.calendar.utoronto.ca/section/Bachelor-of-Music',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://future.utoronto.ca/program/music-classical',
        'https://future.utoronto.ca/program/music-jazz',
        'https://music.calendar.utoronto.ca/section/Bachelor-of-Music'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Music, Bachelor of Music (MusBac; Classical and Jazz streams). Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma including English (HL / SL), no other subject; admission also needs an audition, which the model cannot hold. No grade is given; 4 is stored. The Faculty of Music calendar section stays the link, as it covers both streams. The stored program asked for no subjects. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. The faculty publishes no IB points figure; the stored 32 points have no official source and are kept, not re-verified. The pages name no entry year, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6mt19e00177mdgc50fdkxh',
      status: 'current',
      name: 'Neuroscience',
      description:
        'Neuroscience is the study of the nervous system, including the brain and spinal cord. The program integrates knowledge from biology, psychology, chemistry, and physics to understand how the brain works. Students learn about neural development, sensory and motor systems, cognition, and neurological disorders. The program prepares students for careers in research, healthcare, pharmaceuticals, and graduate studies in neuroscience, medicine, or related fields.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://future.utoronto.ca/program/neuroscience',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/neuroscience'
      ],
      notes:
        'Content 4.3: The stored URL was the Human Biology calendar section, shared with two other programs. St. George, Faculty of Arts & Science, admission category Life Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), Biology, Chemistry, at SL or HL. Physics recommended, not stored. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Life Sciences category, and English and Maths 5 to 7 in the required subjects; the bottom of each subject range is stored. No grade is given for Biology or Chemistry; 4 is stored. The stored 34 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jad1s00397mx11kpgq4ur',
      status: 'current',
      name: 'Philosophy',
      description:
        "The Greek words from which 'Philosophy' is formed mean 'love of wisdom' and all great philosophers have been moved by an intense devotion to the search for wisdom. Philosophy takes no belief for granted, but examines the grounds for those beliefs which make up people's fundamental views of the world. The Philosophy Department at the University of Toronto offers courses in most of the main periods and areas of Philosophy, including Ancient, Medieval, Early Modern, Continental, and Analytic Philosophy, as well as specialized areas such as Ethics, Epistemology, Metaphysics, Logic, and Philosophy of Science.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://future.utoronto.ca/program/philosophy',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/philosophy'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Arts & Science, admission category Humanities. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, at SL or HL. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Low to mid 30s" for the Humanities category, and English 5 to 7 in the required subjects; the bottom of each subject range is stored. The stored 32 points are kept: "Low to mid 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jabwz002p7mx1fagg7j63',
      status: 'current',
      name: 'Physics',
      description:
        "Physics forms the bedrock of our understanding of Nature. Any physical object or process, or even the structure of the whole universe itself, can be the subject of physics. Physicists study a diverse array of systems, from the simplest subatomic particles to the most complex processes found in biological cells or in the Earth's climate. Physics provides a set of fundamental tools that can be brought to bear on many problems across a wide variety of fields. A program in physics has much to offer. A knowledge of physics is a powerful asset in research and teaching, as well as professions like Medicine or Law, or for careers involving the environmental, geological or biological sciences. An understanding of physics is essential for those who are concerned about how society is affected by climate change or advanced technology. The conceptual problem-solving tools one acquires as a physicist can be applied with great success to many occupations.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://future.utoronto.ca/program/physics',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/physics'
      ],
      notes:
        'Content 4.3: The stored Maths AA HL 5 and Physics HL 5 are corrected to SL: the pages accept either level. St. George, Faculty of Arts & Science, admission category Mathematical & Physical Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), Physics, at SL or HL. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Mathematical & Physical Sciences category, and English and Maths 5 to 7 in the required subjects; the bottom of each subject range is stored. No grade is given for Physics; 4 is stored. The stored 34 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jae37003p7mx12t0zave9',
      status: 'current',
      name: 'Political Science',
      description:
        'Political Science examines political systems, institutions, and behaviour at local, national, and international levels. Students study topics such as democratic theory, comparative politics, international relations, public policy, and political philosophy. The program develops analytical and research skills while providing understanding of how political decisions are made and their effects on society. Graduates pursue careers in government, law, journalism, international organizations, and advocacy.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://future.utoronto.ca/program/political-science',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/political-science'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Arts & Science, admission category Social Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, at SL or HL. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Social Sciences category, and English 5 to 7 in the required subjects; the bottom of each subject range is stored. The stored 32 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6jacty00377mx1jjf5d8yo',
      status: 'current',
      name: 'Psychology',
      description:
        'Psychology is the branch of science that focuses on the behaviour of human beings and animals. Our courses span the various areas of psychology and introduce students to the methods used in psychological research. The basic tools of a research psychologist include experimentation in the laboratory and field, naturalistic observation, and the use of statistical methods in interpreting data. Our faculty have highly diversified interests which are reflected in the number and variety of our undergraduate course offerings. These include courses in cognitive neuroscience, cognitive psychology, computational neuroscience, developmental psychology, human and animal learning, perception, personality psychology, physiological psychology, and social psychology.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://future.utoronto.ca/program/psychology',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/psychology'
      ],
      notes:
        'Content 4.3: The HBSc (admission category Life Sciences); the stored program asked for no subjects. St. George, Faculty of Arts & Science, admission category Life Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), Biology, at SL or HL. Chemistry and Physics recommended, not stored. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Life Sciences category, and English and Maths 5 to 7 in the required subjects; the bottom of each subject range is stored. No grade is given for Biology; 4 is stored. The stored 32 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6mt1m7001d7mdgtx87p9ib',
      status: 'current',
      name: 'Rotman Commerce',
      description:
        "Rotman Commerce is Canada's leading undergraduate business program, offered jointly by the Rotman School of Management and the Faculty of Arts & Science. The program provides a rigorous foundation in business fundamentals including finance, marketing, economics, and management. Students develop analytical, communication, and leadership skills through case studies, experiential learning, and international opportunities. Graduates pursue careers in investment banking, consulting, technology, entrepreneurship, and more. The program offers three specialist options: Finance & Economics, Management, and Accounting.",
      field: 'Business & Economics',
      degree: 'Bachelor of Commerce',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://rotmancommerce.utoronto.ca/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 6, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/finance-and-economics'
      ],
      notes:
        'Content 4.3: Bachelor of Commerce, admitted through the Rotman Commerce category (OUAC code TAC) into Accounting, Finance and Economics, or Management; the three specialists\' admissions pages list the same prerequisites. Rotman\'s own site stays the link. A supplemental application is required. English at HL 5 and Maths at HL 6 are corrected to SL: either level is accepted. St. George, Faculty of Arts & Science, admission category Rotman Commerce. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), at SL or HL. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Rotman Commerce category, and English and Maths 6 to 7 in the required subjects; the bottom of each subject range is stored. The stored 37 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6msz5l000f7mdgu2p2xvos',
      status: 'current',
      name: 'Sociology',
      description:
        "Sociology's key principle is that patterned social relationships create opportunities for, and place constraints on, human action. The influence of this idea is widespread. New research agendas in law, literature, economics, and other disciplines reflect the notion that beyond individual motives, goals, values, beliefs and emotions, patterned social relationships help to make us who we are. Our courses and faculty research examine how patterned social relationships shape and are shaped by gender roles and families; health; immigration and ethnic relations; labour markets, work and social inequality; political structures and processes; crime, law and deviance; culture; cities; and networks, and communities. To test explanations regarding the influence of social relationships on various aspects of human behaviour, sociologists collect and analyze observational, survey, experimental, and historical data.",
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://future.utoronto.ca/program/sociology',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/sociology'
      ],
      notes:
        'Content 4.3: St. George, Faculty of Arts & Science, admission category Social Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, at SL or HL. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Social Sciences category, and English 5 to 7 in the required subjects; the bottom of each subject range is stored. The stored 32 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-09.
    {
      id: 'cmk6mt01z000r7mdgyclsq4fi',
      status: 'current',
      name: 'Statistical Sciences',
      description:
        'Statistical Science is the science of learning from data. Statistical science plays a large role in data science, which broadly encompasses computational and statistical aspects of managing and learning from large and complex datasets. Statistical theory and methodology have applications in almost all areas of science, social science, public health, medicine, engineering, finance, technology, business, government and industry. Statisticians and data scientists are involved in solving problems as diverse as understanding the health risk of climate change, predicting the path of forest fires, understanding the role of genetics in human health, and creating a better search engine. New ways of collecting, organizing, visualizing, and analyzing data are increasingly driving progress in all fields and have created demand for people with data expertise.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://future.utoronto.ca/program/statistical-science',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://future.utoronto.ca/admission-requirements-international-high-school-students',
        'https://web.archive.org/web/20260131005935/https://www.artsci.utoronto.ca/future/ready-apply/admission-requirements/international-baccalaureate-ib',
        'https://future.utoronto.ca/program/statistical-science'
      ],
      notes:
        'Content 4.3: The stored Maths AA HL 5 is corrected: the prerequisite is AA SL or HL, or AI HL. St. George, Faculty of Arts & Science, admission category Mathematical & Physical Sciences. Prerequisites for IB applicants (future.utoronto.ca, IB view): a complete Diploma, and English, Maths (Calculus), at SL or HL. Maths (the Calculus prerequisite) is Maths AA SL or HL, or Maths AI HL; AI SL does not satisfy it. English is stored as English A (Literature, or Language and Literature): the pages say only "English (HL / SL)", and U of T\'s English-proficiency rule accepts English A and excludes HL English B, so English B is not stored. Arts & Science publishes recommended ranges, which it calls minimums, not a points minimum: "Mid to high 30s" for the Mathematical & Physical Sciences category, and English and Maths 5 to 7 in the required subjects; the bottom of each subject range is stored. The stored 34 points are kept: "Mid to high 30s" is not a number, so it is not re-verified. The URL moves from the academic calendar section to the admissions page for the program. The future.utoronto.ca pages name no entry year, and the newest readable copy of the Arts & Science IB page (Internet Archive, 31 January 2026; the live page is behind a bot check) describes 2026 entry, so checked for 2026.'
    }
  ]
}

export default refresh
