import type { RefreshFile } from '../lib/refresh'

/**
 * Imperial College London: requirements for 2027 entry.
 *
 * Exported from the database on 2026-09-27 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts imperial-college-london
 */
const refresh: RefreshFile = {
  university: 'Imperial College London',
  entryYear: 2027,
  checkedOn: '2026-09-27',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2bkr00017mwxra9ydgf3',
      status: 'current',
      name: 'Aeronautical Engineering',
      description:
        "Develop engineering, computational, and analytical skills, as well as the specific knowledge and experience required for careers in the aerospace industry. Before choosing to continue or transfer to another course, all students apply to this degree, MEng Aeronautical Engineering (H401). You'll gain a solid understanding of aerodynamics, lightweight structures, and structural mechanics, as well as flight mechanics.\n\nHow competitive: 40 points is Imperial's minimum, but its typical offer for this course is 43 to 44 points, the grades it asked of at least half of the IB and A-level applicants it made offers to for 2025 entry.",
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 40,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/aeronautical-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 7, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/aeronautical-engineering/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 40 points with 7 in Mathematics and 7 in Physics at HL. Mathematics AA or AI accepted at HL; AA preferred. Typical offer 43–44. ESAT and interview. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the course page\'s typical offer (43 to 44 points; "Typical offers are based on offers made by each department to at least 50% of 2025 entry A-level and IB applicants who were yet to achieve their grades"); update it at each refresh.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2c0o00097mwxbls3325n',
      status: 'current',
      name: 'Aeronautics with Spacecraft Engineering',
      description:
        "Acquire the engineering, computational and analytical skills required for a career in the aeronautical industry in this professionally accredited course. As part of the specialist spacecraft stream, you'll be equipped with an analytical skill set appropriate to the design of spacecraft technologies. You'll also gain an insight into the unique challenges involved in designing space systems for launch and operation, working in the start-of-the-art learning environment provided by the Department of Aeronautics.\n\nHow competitive: 40 points is Imperial's minimum, but its typical offer for this course is 43 to 44 points, the grades it asked of at least half of the IB and A-level applicants it made offers to for 2025 entry.",
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 40,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/aeronautics-spacecraft-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 7, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/aeronautics-spacecraft-engineering/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Applicants apply to Aeronautical Engineering (H401) and can transfer to the spacecraft stream. Minimum 40 points with 7 in Mathematics and 7 in Physics at HL. Mathematics AA or AI accepted at HL; AA preferred. Typical offer 43–44. ESAT and interview. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the course page\'s typical offer (43 to 44 points; "Typical offers are based on offers made by each department to at least 50% of 2025 entry A-level and IB applicants who were yet to achieve their grades"); update it at each refresh.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpz2cg4000h7mwxscv3r290',
      status: 'current',
      name: 'Biochemistry',
      description:
        "Develop skills towards a career in the applied biochemistry and biotechnology industries on this three-year course. With teaching delivered through lectures and case studies from business leaders and academics, this course will prepare you for advanced study or a career in the field. You'll build familiarity with key aspects of both industries, including commercialising technology, entrepreneurship, and intellectual property and patents.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biochemistry-bsc/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/biochemistry-bsc/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Chemistry and 6 in Biology, Mathematics or Physics at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 39. ESAT required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MSci".
    {
      id: 'cmkpz2d0y000t7mwx6j1j3sd0',
      status: 'current',
      name: 'Biochemistry (MSci)',
      description:
        'Come and study at one of the largest Life Sciences departments in Europe. Develop a deep understanding of Biochemistry on this four-year course, where you will acquire the key scientific skills required for a range of research-informed graduate careers in the Life Sciences. You will study living systems at the molecular and cellular level and understand chemical processes within organisms. Through this work, you will gain a detailed knowledge of the molecular mechanisms of life and how an understanding of these underpins the development of solutions to key biological and biomedical problems.',
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biochemistry-msci/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/biochemistry-msci/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Chemistry and 6 in Biology, Mathematics or Physics at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. No typical offer published (the course began with 2026 entry). ESAT required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpz2dit00157mwxfyyov1q3',
      status: 'current',
      name: 'Biochemistry with a Language for Science',
      description:
        "Advance your understanding of biochemistry on this four-year course, which includes a year spent with an approved university in France, Germany or Spain. You'll build familiarity with key aspects of the industry, including commercialising technology, entrepreneurship, and intellectual property and patents. The language element of this course will see you explore the theory and practice of translation. This includes opportunities to analyse the history, politics, science and technology of your chosen country.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biochemistry-language/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true },
        {
          anyOf: [
            { course: 'FRA-B', level: 'HL', grade: 5 },
            { course: 'FRA-B', level: 'SL', grade: 6 },
            { course: 'FRA-LIT', level: 'HL', grade: 5 },
            { course: 'FRA-LIT', level: 'SL', grade: 6 },
            { course: 'FRA-LL', level: 'HL', grade: 5 },
            { course: 'FRA-LL', level: 'SL', grade: 6 },
            { course: 'GER-B', level: 'HL', grade: 5 },
            { course: 'GER-B', level: 'SL', grade: 6 },
            { course: 'GER-LIT', level: 'HL', grade: 5 },
            { course: 'GER-LIT', level: 'SL', grade: 6 },
            { course: 'GER-LL', level: 'HL', grade: 5 },
            { course: 'GER-LL', level: 'SL', grade: 6 },
            { course: 'SPA-B', level: 'HL', grade: 5 },
            { course: 'SPA-B', level: 'SL', grade: 6 },
            { course: 'SPA-LIT', level: 'HL', grade: 5 },
            { course: 'SPA-LIT', level: 'SL', grade: 6 },
            { course: 'SPA-LL', level: 'HL', grade: 5 },
            { course: 'SPA-LL', level: 'SL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/biochemistry-language/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Renamed to the course page\'s title (was "with Language for Science"). Minimum 38 points with 6 in Chemistry and 6 in Biology, Mathematics or Physics at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 39. ESAT required. Language requirement: grade 5 at HL or 6 at SL in the chosen language (French, German or Spanish), stored as B or A courses in those languages. Previously stored as French or Spanish B HL5 only, not critical.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpz2eou001x7mwxaxydb7rz',
      status: 'current',
      name: 'Biochemistry with Management',
      description:
        "Develop your appreciation of biochemistry on this three-year course, which includes a final year spent with the Imperial Business School. During your first two years, you'll explore the fundamentals of biological chemistry, molecular biology, integrative cell biology and genes and genomics. You'll also consider the commercial aspects of the biochemistry and biotechnology industries, including commercialising technology, entrepreneurship, and intellectual property and patents.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biochemistry-management/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/biochemistry-management/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Applicants apply to Biochemistry (C700); a 4-year option exists. Minimum 38 points with 6 in Chemistry and 6 in Biology, Mathematics or Physics at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 39. ESAT required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpz2e3y001l7mwxpxwckme5',
      status: 'current',
      name: 'Biological Sciences',
      description:
        "Develop your appreciation of biology on this three-year course, where you'll build the key scientific skills required for ongoing research or a career in the life sciences. You'll examine the behaviour of living systems from the level of cells up to whole organisms and ecosystems. Through this work, you'll gain a detailed knowledge of the relationships, evolution, and key features of various organisms as you explore the diversity of life on earth.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biological-sciences/',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/biological-sciences/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Biology and 6 in Chemistry, Mathematics or Physics at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 39. ESAT required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpz2hxc003z7mwxd3usgzrs',
      status: 'current',
      name: 'Biological Sciences with a Language for Science',
      description:
        "Develop your appreciation of biology on this four-year course, which includes a year spent with an approved university in France, Germany or Spain. You'll examine the behaviour of living systems from the level of cells up to whole organisms and ecosystems. Through this work, you'll gain a detailed knowledge of the relationships, evolution, and key features of various organisms as you explore the diversity of life on earth.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/biological-sciences-language/',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true },
        {
          anyOf: [
            { course: 'FRA-B', level: 'HL', grade: 5 },
            { course: 'FRA-B', level: 'SL', grade: 6 },
            { course: 'FRA-LIT', level: 'HL', grade: 5 },
            { course: 'FRA-LIT', level: 'SL', grade: 6 },
            { course: 'FRA-LL', level: 'HL', grade: 5 },
            { course: 'FRA-LL', level: 'SL', grade: 6 },
            { course: 'GER-B', level: 'HL', grade: 5 },
            { course: 'GER-B', level: 'SL', grade: 6 },
            { course: 'GER-LIT', level: 'HL', grade: 5 },
            { course: 'GER-LIT', level: 'SL', grade: 6 },
            { course: 'GER-LL', level: 'HL', grade: 5 },
            { course: 'GER-LL', level: 'SL', grade: 6 },
            { course: 'SPA-B', level: 'HL', grade: 5 },
            { course: 'SPA-B', level: 'SL', grade: 6 },
            { course: 'SPA-LIT', level: 'HL', grade: 5 },
            { course: 'SPA-LIT', level: 'SL', grade: 6 },
            { course: 'SPA-LL', level: 'HL', grade: 5 },
            { course: 'SPA-LL', level: 'SL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/biological-sciences-language/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Renamed to the course page\'s title (was "with Language for Science"). Minimum 38 points with 6 in Biology and 6 in Chemistry, Mathematics or Physics at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 39. ESAT required. Language requirement: grade 5 at HL or 6 at SL in the chosen language (French, German or Spanish), stored as B or A courses in those languages. Previously stored as French or Spanish B HL5 only, not critical.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpz2ise004f7mwx91z6ikpd',
      status: 'current',
      name: 'Biological Sciences with Management',
      description:
        "Further your understanding of the biological sciences on this three-year course, which includes a final year spent with the Imperial Business School. During your first two years, you'll explore the behaviour of living systems from the level of cells up to whole organisms and ecosystems. Your studies will be complemented by a dedicated Life Science Skills programme where you'll receive training in quantitative skills, programming, statistics, and scientific writing and presentation.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/biological-sciences-management/',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/biological-sciences-management/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Applicants apply to Biological Sciences (C100); a 4-year option exists. Minimum 38 points with 6 in Biology and 6 in Chemistry, Mathematics or Physics at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 39. ESAT required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2f7700297mwxd6xlvyb9',
      status: 'current',
      name: 'Biomaterials and Tissue Engineering',
      description:
        "Build your understanding of materials science and specialise in biomaterials and tissue engineering on this professionally accredited Master's degree. Technological advances in materials science and engineering (MSE) are transforming our lives in a range of areas, from targeted drug delivery and disease detection, to tissue engineered scaffolds. During your studies, you'll analyse how materials innovations solve real problems in fields such as healthcare and medical devices.",
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/biomaterials-tissue-engineering-meng/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/biomaterials-tissue-engineering-meng/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Mathematics and 6 in Physics or Chemistry at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 39. No admissions test.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpz2fne002j7mwxnkw76kpw',
      status: 'current',
      name: 'Biomedical Technology Ventures',
      description:
        "The Biomedical Technology Ventures BSc is set against the backdrop of an increasing demand for medical devices and the growth of the healthcare industry. In this programme, you will be guided in developing an entrepreneurial mindset and equipped with the skills to identify opportunities for improving human healthcare through the application of technology. You'll have balanced lectures, workshops, laboratory sessions and seminars to explore the fundamentals of mathematics, medical science, device prototyping and computer programming.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/biomedical-technology-ventures/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/biomedical-technology-ventures/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 39 points with 6 in Mathematics, 6 in Biology, Chemistry or Physics (required, so now critical) and 6 in another subject at HL (any; another science, Further Mathematics or Economics are useful). Mathematics AA or AI accepted at HL; AA preferred. Typical offer 40. No admissions test.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MSci".
    {
      id: 'cmkpz2h9s003n7mwxt26avuan',
      status: 'current',
      name: 'Biotechnology',
      description:
        'Come and study at one of the largest Life Sciences departments in Europe. Biotechnology creates a vital link between biology and technology. Develop a deep understanding of Biotechnology and Biochemistry on this four-year course, where you will acquire the key scientific skills required for a range of research-informed graduate careers in Biotechnology and related areas. You will study living systems at the molecular and cellular level and understand chemical processes within organisms.',
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biotechnology-msci/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/biotechnology-msci/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Chemistry and 6 in Biology, Mathematics or Physics at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. No typical offer published (the course began with 2026 entry). ESAT required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpz2gp300377mwxp8zd94kg',
      status: 'current',
      name: 'Biotechnology with a Language for Science',
      description:
        'Embrace the opportunity to learn a foreign language while studying biotechnology. By studying a language in conjunction with biochemistry, you can combine your training in both fields as you learn how to present scientific and technical materials in French, German or Spanish. As a bridge between biology and technology, biotechnology explores the commercialisation of technology, entrepreneurship, intellectual property, and patents.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/biotechnology-language/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true },
        {
          anyOf: [
            { course: 'FRA-B', level: 'HL', grade: 5 },
            { course: 'FRA-B', level: 'SL', grade: 6 },
            { course: 'FRA-LIT', level: 'HL', grade: 5 },
            { course: 'FRA-LIT', level: 'SL', grade: 6 },
            { course: 'FRA-LL', level: 'HL', grade: 5 },
            { course: 'FRA-LL', level: 'SL', grade: 6 },
            { course: 'GER-B', level: 'HL', grade: 5 },
            { course: 'GER-B', level: 'SL', grade: 6 },
            { course: 'GER-LIT', level: 'HL', grade: 5 },
            { course: 'GER-LIT', level: 'SL', grade: 6 },
            { course: 'GER-LL', level: 'HL', grade: 5 },
            { course: 'GER-LL', level: 'SL', grade: 6 },
            { course: 'SPA-B', level: 'HL', grade: 5 },
            { course: 'SPA-B', level: 'SL', grade: 6 },
            { course: 'SPA-LIT', level: 'HL', grade: 5 },
            { course: 'SPA-LIT', level: 'SL', grade: 6 },
            { course: 'SPA-LL', level: 'HL', grade: 5 },
            { course: 'SPA-LL', level: 'SL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/biotechnology-language/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Renamed to the course page\'s title (was "with Language for Science"). Minimum 38 points with 6 in Chemistry and 6 in Biology, Mathematics or Physics at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 39. ESAT required. Language requirement: grade 5 at HL or 6 at SL in the chosen language (French, German or Spanish), stored as B or A courses in those languages. Previously stored as French or Spanish B HL5 only, not critical.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpz2g78002v7mwx43nqn7fq',
      status: 'current',
      name: 'Biotechnology with Management',
      description:
        "Learn all facets of the biotechnology and applied biochemistry industries, including technology commercialisation, entrepreneurship, and intellectual property. This course gives you the opportunity to study the full Biotechnology curriculum before spending an additional year at the Imperial Business School. In your first two years, you'll study a common set of core modules, including biological chemistry, molecular biology, integrative cell biology, and genes and genomes.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/biotechnology-management/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/biotechnology-management/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Applicants apply to Biotechnology (J700). Minimum 38 points with 6 in Chemistry and 6 in Biology, Mathematics or Physics at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 39. ESAT required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MSci".
    {
      id: 'cmkpz2p7k008f7mwxy7pglg6u',
      status: 'current',
      name: 'Chemistry',
      description:
        "Develop your appreciation of core chemistry through to Master's level on this professionally accredited four-year course. You'll be taught by world leaders in the field as you explore fundamental chemistry topics during your first two years. You'll examine key aspects of inorganic, organic, physical, analytical, synthetic and computational chemistry, before specialising across a series of advanced topics as your degree develops.",
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/chemistry-msci/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/chemistry-msci/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Chemistry and 6 in Mathematics at HL (Mathematics is required, so now critical), and 6 in a third subject at HL, which can be any subject: Biology, Economics or Physics are preferred, not required, so the stored Biology/Economics/Physics group is removed. Mathematics AA or AI accepted at HL, no preference. Typical offer 39–40. No admissions test.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpz2old00817mwxfpx8kkzs',
      status: 'current',
      name: 'Chemistry with Management',
      description:
        "Develop a thorough understanding of core chemistry and unleash your management potential on this four-year course. During your first two years, you'll enhance your understanding of fundamental topics related to inorganic, organic, physical, analytical, synthetic and computational chemistry. You'll complement this work by building extensive laboratory experience.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/chemistry-management/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/chemistry-management/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Chemistry and 6 in Mathematics at HL (Mathematics is required, so now critical), and 6 in a third subject at HL, which can be any subject: Biology, Economics or Physics are preferred, not required, so the stored Biology/Economics/Physics group is removed. Mathematics AA or AI accepted at HL, no preference. Typical offer 39–40. No admissions test.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MSci".
    {
      id: 'cmkpz2o28007n7mwxxi2y3x2e',
      status: 'current',
      name: 'Chemistry with Medicinal Chemistry',
      description:
        "Build your appreciation of the chemical sciences and the drug development process in this four-year course. Designed to prepare you for a career in the pharmaceutical industry or biomedical research, this course will help you develop an interconnected understanding of core chemistry topics. You'll deepen your knowledge of key topics relating to inorganic, organic, physical, analytical, synthetic and computational chemistry.",
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/chemistry-medicinal/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/chemistry-medicinal/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Chemistry and 6 in Mathematics at HL (Mathematics is required, so now critical), and 6 in a third subject at HL, which can be any subject: Biology, Economics or Physics are preferred, not required, so the stored Biology/Economics/Physics group is removed. Mathematics AA or AI accepted at HL, no preference. Typical offer 39–40. No admissions test.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MSci".
    {
      id: 'cmkpz2nm4007d7mwx4273cryz',
      status: 'current',
      name: 'Chemistry with Molecular Physics',
      description:
        "If you're studying chemistry, mathematics and physics and enjoy how they intersect, this course will teach you to apply the skills and content from all three disciplines. You'll gain a thorough understanding of the foundations that underpin organic, inorganic and physical chemistry through lectures, workshops and labs, and explore this through the lens of molecular physics.",
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/chemistry-molecular-physics/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/chemistry-molecular-physics/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Chemistry, 6 in Mathematics and 6 in Physics at HL (all required, so all now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 39–40. No admissions test.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2n7f00757mwxqbxs26sm',
      status: 'current',
      name: 'Civil Engineering',
      description:
        'Civil engineering is about shaping the built and natural environments in which we live. It is a broad discipline that improves many aspects of our everyday lives, from the provision of safe drinking water to the development of earthquake-resistant structures, while also protecting our natural environment. Civil engineers will play a crucial role in tackling climate change and leading sustainable development.',
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 40,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/civil-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/civil-engineering/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 40 points with 7 in Mathematics and 6 in Physics at HL (Physics is required, so now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 40. ESAT required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BEng".
    {
      id: 'cmkpz2mhw006t7mwx093wp42b',
      status: 'current',
      name: 'Computing',
      description:
        'Computing is a creative and wide-ranging subject that focuses on using sound underlying principles and logical thinking to design and build systems that really work. This general programme offers you a wide range of module choices as you progress, allowing you to study your areas of interest. In this course, you will learn how modern computer and communications systems function, and how they can be used and adapted to build the next generation of computing applications.',
      field: 'Computer Science',
      degree: 'Bachelor of Engineering',
      duration: '3 years',
      minIBPoints: 41,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/computing-beng/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'ECON', 'PHYS'], level: 'HL', grade: 7, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/computing-beng/',
        'https://www.imperial.ac.uk/computing/prospective-students/courses/ug/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 41 points with 7 in Mathematics at HL (AA or AI) and 7 in another relevant subject at HL; typical offer 42. The course page does not define a relevant subject: the department suggests Physics, Computer Science, Chemistry, Economics or Biology at HL, so that group is not critical (previously Chemistry, Computer Science or Physics). TMUA required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2lzp006h7mwxhrwyez7b',
      status: 'current',
      name: 'Computing (Artificial Intelligence and Machine Learning)',
      description:
        "Computing is a creative and wide-ranging subject that focuses on using sound underlying principles and logical thinking to design and build systems that really work. You'll specialise in artificial intelligence and knowledge engineering, as well as machine learning and the development of computational and engineering models of complex cognitive and social behaviours. In this course, you will learn how modern computer and communications systems function, and how they can be used and adapted to build the next generation of computing applications.",
      field: 'Computer Science',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 41,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/computing-artificial-intelligence-meng/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'ECON', 'PHYS'], level: 'HL', grade: 7, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/computing-artificial-intelligence-meng/',
        'https://www.imperial.ac.uk/computing/prospective-students/courses/ug/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 41 points with 7 in Mathematics at HL (AA or AI) and 7 in another relevant subject at HL; typical offer 42. The course page does not define a relevant subject: the department suggests Physics, Computer Science, Chemistry, Economics or Biology at HL, so that group is not critical (previously Chemistry, Computer Science or Physics). TMUA required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2li500657mwxxemz341o',
      status: 'current',
      name: 'Computing (International Programme of Study)',
      description:
        'Computing is a creative and wide-ranging subject that focuses on using sound underlying principles and logical thinking to design and build systems that really work. This course gives you the opportunity to spend your fourth year studying abroad at a leading European university, or the first two terms of your third year at the University of California. In this course, you will learn how modern computer and communications systems function, and how they can be used and adapted to build the next generation of computing applications.',
      field: 'Computer Science',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 41,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/computing-international-programme-of-study/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'ECON', 'PHYS'], level: 'HL', grade: 7, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/computing-international-programme-of-study/',
        'https://www.imperial.ac.uk/computing/prospective-students/courses/ug/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 41 points with 7 in Mathematics at HL (AA or AI) and 7 in another relevant subject at HL; typical offer 42. The course page does not define a relevant subject: the department suggests Physics, Computer Science, Chemistry, Economics or Biology at HL, so that group is not critical (previously Chemistry, Computer Science or Physics). TMUA required. The page adds that a language qualification may be required; it names none, so none is stored.'
    },
    // Deleted 2026-09-27 at the owner's request (content 3.4), backup in scripts/backups/refresh/: Computing (Management and Finance) MEng (G501): not offered for 2027 entry (not in Imperial's 2027 course list; page 404).
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2kf2005f7mwxdb6g7gqu',
      status: 'current',
      name: 'Computing (Security and Reliability)',
      description:
        'Computing is a creative and wide-ranging subject that focuses on using sound underlying principles and logical thinking to design and build systems that really work. In this course, you will learn how modern computer and communications systems function, and how they can be used and adapted to build the next generation of reliable and secure computing applications. You will acquire deep understanding of software security, reliability and privacy issues.',
      field: 'Computer Science',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 41,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/computing-security-reliability-meng/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'ECON', 'PHYS'], level: 'HL', grade: 7, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/computing-security-reliability-meng/',
        'https://www.imperial.ac.uk/computing/prospective-students/courses/ug/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 41 points with 7 in Mathematics at HL (AA or AI) and 7 in another relevant subject at HL; typical offer 42. The course page does not define a relevant subject: the department suggests Physics, Computer Science, Chemistry, Economics or Biology at HL, so that group is not critical (previously Chemistry, Computer Science or Physics). TMUA required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2jwn00537mwxzh600wob',
      status: 'current',
      name: 'Computing (Software Engineering)',
      description:
        'Computing is a creative and wide-ranging subject that focuses on using sound underlying principles and logical thinking to design and build systems that really work. This course allows you to focus on the way software is engineered to form complex computing systems. Your specialism will give you a deep understanding of state-of-the-art methods for developing complex software systems that are easy to test, maintain and extend and that fulfil the needs of their users.',
      field: 'Computer Science',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 41,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/computing-software-engineering-meng/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'ECON', 'PHYS'], level: 'HL', grade: 7, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/computing-software-engineering-meng/',
        'https://www.imperial.ac.uk/computing/prospective-students/courses/ug/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 41 points with 7 in Mathematics at HL (AA or AI) and 7 in another relevant subject at HL; typical offer 42. The course page does not define a relevant subject: the department suggests Physics, Computer Science, Chemistry, Economics or Biology at HL, so that group is not critical (previously Chemistry, Computer Science or Physics). TMUA required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2jcw004r7mwxq7cydpo1',
      status: 'current',
      name: 'Computing (Visual Computing and Robotics)',
      description:
        'Computing is a creative and wide-ranging subject that focuses on using sound underlying principles and logical thinking to design and build systems that really work. This course has a strong technical emphasis, and allows you to focus on various technologies and algorithms for arts-related applications, such as computer games, visual effects and computer-generated art. In this course, you will learn how modern computer and communications systems function, and how they can be used and adapted to build the next generation of reliable and secure computing applications.',
      field: 'Computer Science',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 41,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/computing-visual-computing-robotics-meng/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'ECON', 'PHYS'], level: 'HL', grade: 7, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/computing-visual-computing-robotics-meng/',
        'https://www.imperial.ac.uk/computing/prospective-students/courses/ug/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 41 points with 7 in Mathematics at HL (AA or AI) and 7 in another relevant subject at HL; typical offer 42. The course page does not define a relevant subject: the department suggests Physics, Computer Science, Chemistry, Economics or Biology at HL, so that group is not critical (previously Chemistry, Computer Science or Physics). TMUA required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2u8e00b57mwxj3rjx5h5',
      status: 'current',
      name: 'Design Engineering',
      description:
        "Design engineering combines traditional engineering with modern design tools and mindsets. This professionally accredited four-year course prepares you to turn your creativity into real-world solutions. You'll gain essential skills, including computer-aided engineering, rapid prototyping, human-centred design, systems thinking, and sustainability, equipping you to bring innovative products to life.",
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 39,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/design-engineering/',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/design-engineering/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 39 points with 7 in Mathematics at HL and 6 in another subject at HL (any subject). Mathematics AA or AI accepted at HL, no preference. Typical offer 39. ESAT and interview.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MSci".
    {
      id: 'cmkpz2tmz00at7mwxj7yjy1pg',
      status: 'current',
      name: 'Earth and Planetary Science',
      description:
        'Find out how solid planetary bodies are explored using geological and geophysical principles. This degree focuses on planets, moons, asteroids, and comets, along with geological and geophysical processes in the Solar System. You will also learn about geosciences, physics, chemistry, mathematics, engineering, and computing as part of an interdisciplinary degree.',
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/earth-planetary-science-msci/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'GEOG', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/earth-planetary-science-msci/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Mathematics and 6 in Biology, Chemistry, Geography, Geology or Physics at HL (Geography added; the group is required, so now critical; Geology is not an IB subject). Mathematics AA or AI accepted at HL, no preference. Typical offer 39. No admissions test.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpz2t5d00ah7mwxwrm5ohkt',
      status: 'current',
      name: 'Ecology and Environmental Biology',
      description:
        'Understand the behaviour of living systems from the level of cells up to whole organisms and ecosystems. This specialist course focuses on the interaction between living organisms and species and their environment. You will learn to assess the impact plants, animals and microbes have on their ecosystem.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/ecology-environmental-biology/',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/ecology-environmental-biology/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Biology and 6 in Chemistry, Mathematics or Physics at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 39. ESAT required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpz2ss800ab7mwxfhmjls2i',
      status: 'current',
      name: 'Economics, Finance and Data Science',
      description:
        'The BSc Economics, Finance and Data Science is a first-of-its-kind degree that offers you the rigorous study of economics and finance, combined with the learning of data science and its applications. Our distinctive curriculum has been designed by leading academics at the forefront of each discipline with input from industry and public policy leaders.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/economics-finance-data-science/',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/economics-finance-data-science/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 39 points with 7 in Mathematics at HL and 6 in each of two more subjects at HL (any subjects). Mathematics AA or AI accepted at HL (the page\'s syllabus line still says "for entry in 2025"). Typical offer 39. TMUA required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2s7n00a37mwx88zds5ro',
      status: 'current',
      name: 'Electrical and Electronic Engineering',
      description:
        'Electrical and electronic engineers are at the forefront of the challenges to connect our world, to design more efficient and affordable technology, and to help us live healthily and sustainably. Electrical and electronic engineering right now is characterised by its fast-evolving and interdisciplinary nature, driving innovation across unlimited applications, and making it such an exciting and rewarding place for creative and talented problem-solvers.',
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 40,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/electrical-electronic-engineering-meng/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 7, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/electrical-electronic-engineering-meng/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 40 points with 7 in Mathematics and 7 in Physics at HL (Physics is required, so now critical). Mathematics AA or AI accepted at HL; AA preferred. Typical offer 41. ESAT and interview.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2rt7009v7mwxsupm6seb',
      status: 'current',
      name: 'Electrical and Electronic Engineering with Management',
      description:
        'Electrical and electronic engineers are at the forefront of the challenges to connect our world, to design more efficient and affordable technology, and to help us live healthy and sustainably. This degree will give you an insight into engineering the commercial world, with a programme of business modules combined with technical subjects. Taught modules are split 50:50 between technical and business modules in years three and four.',
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 40,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/electrical-electronic-engineering-management/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 7, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/electrical-electronic-engineering-management/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 40 points with 7 in Mathematics and 7 in Physics at HL (Physics is required, so now critical). Mathematics AA or AI accepted at HL; AA preferred. Typical offer 41. ESAT and interview.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2r9y009n7mwx5rxqyffm',
      status: 'current',
      name: 'Electronic and Information Engineering',
      description:
        'Electronic and information engineering right now is characterised by its fast-evolving and interdisciplinary nature, driving innovation across unlimited applications, and making it such an exciting and rewarding place for creative and talented problem-solvers. This unique course combines electronics with computer science and information engineering, with specialist modules from the Department of Computing, and projects and coursework drawn from our latest research.',
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 40,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/electronic-information-meng/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 7, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/electronic-information-meng/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 40 points with 7 in Mathematics and 7 in Physics at HL (Physics is required, so now critical). Mathematics AA or AI accepted at HL; AA preferred. Typical offer 41. ESAT and interview.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MSci".
    {
      id: 'cmkpz2qs6009b7mwx75qc52rn',
      status: 'current',
      name: 'Geology',
      description:
        "By studying Earth's internal core, crust, oceans, atmosphere, and solar system, we can gain a better understanding of how our planet works. In this course, you'll combine traditional observational and field skills with numerical and analytical fundamental science to understand the Earth more quantitatively. You'll benefit from our internationally leading research programme, as well as lectures and case studies from business and academic leaders.",
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/geology-msci/',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'GEOG', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 6,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/geology-msci/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in two of Biology, Chemistry, Geography, Geology, Mathematics and Physics at HL. The model holds one of them, not two; Geography added. Mathematics AA or AI accepted at HL, no preference. Typical offer 39. No admissions test.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MSci".
    {
      id: 'cmkpz2q7p00937mwxarksuk4t',
      status: 'current',
      name: 'Geophysics',
      description:
        "By studying the Earth's internal core, crust, oceans, atmosphere, and the solar system, we can gain a better understanding of how our planet works. This course explores how maths, physics and computer modelling can all be used to help further our knowledge of Earth processes. You'll combine traditional observational and field skills with numerical and analytical fundamental science to understand the Earth more quantitatively.",
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/geophysics-msci/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/geophysics-msci/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Mathematics, 6 in Physics (required, so now critical) and 6 in a third subject at HL (any subject). Mathematics AA or AI accepted at HL, no preference. Typical offer 39. No admissions test.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2pri008t7mwxg8jiy50p',
      status: 'current',
      name: 'Materials Science and Engineering',
      description:
        "Further your understanding of materials science and engineering (MSE) on this four-year Master's degree. You'll assess how technological advances relating to materials are helping transform our lives, from the clothes we wear through to emerging, life-changing technologies. You'll investigate how the motivation to invent or improve materials can solve problems in areas including healthcare and transport.",
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/materials-science-engineering-meng/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/materials-science-engineering-meng/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Mathematics and 6 in Physics or Chemistry at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 39. No admissions test.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BEng".
    {
      id: 'cmkpz2xgf00cr7mwxtucqu98h',
      status: 'current',
      name: 'Mathematics and Computer Science',
      description:
        'If you are both mathematically inclined and interested in computer science, then a Mathematics and Computer Science degree is perfect for you. Taught jointly by the Departments of Computing and Mathematics, this course will enable you to develop a firm foundation in mathematics – particularly in pure mathematics, numerical analysis and statistics. You will also learn the essentials of computer science, with an emphasis on software development and broader theoretical topics.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Engineering',
      duration: '3 years',
      minIBPoints: 41,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-computer-science-beng/',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-computer-science-beng/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 41 points with 7 in Mathematics at HL and 7 in another relevant subject at HL (for A-levels the page recommends Computer Science or Physics and accepts a long list of useful subjects, so no group is stored). Mathematics AA or AI accepted at HL; AA preferred. The page calls this a new course for 2027 entry (BEng, UCAS GG14) and publishes no typical offer. TMUA required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpzcijj001d7mjod6vdm8iu',
      status: 'current',
      name: 'Mathematics with Applied Mathematics/Mathematical Physics',
      description:
        "This course aims to present you with a wide range of mathematical ideas in a way that develops your critical and intellectual abilities. You'll develop a broad understanding of mathematical theory and application and have opportunities to deepen your knowledge in areas that appeal to you. As part of the Applied Mathematics/Mathematical Physics specialisation, you will examine a variety of relevant concepts, including dynamics of games, mathematical biology and scientific computation.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-applied-physics/',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-applied-physics/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 39 points with 7 in Mathematics at HL and 6 in another subject at HL (any subject). Mathematics AA or AI accepted at HL; AA preferred. Typical offer 40. TMUA required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpzci5000177mjod33mlu9v',
      status: 'current',
      name: 'Mathematics with Mathematical Computation',
      description:
        "This course aims to present you with a wide range of mathematical ideas in a way that develops your critical and intellectual abilities. You'll develop a broad understanding of mathematical theory and application, with opportunities to deepen your knowledge in areas that appeal to you. As part of the Mathematical Computation specialisation, you will focus on topics such as high-performance computing and scientific computation.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 39,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-computation/',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-computation/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 39 points with 7 in Mathematics at HL and 6 in another subject at HL (any subject). Mathematics AA or AI accepted at HL; AA preferred. Typical offer 40. TMUA required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpzchq900117mjom97743mw',
      status: 'current',
      name: 'Mathematics with Statistics',
      description:
        "This course aims to present you with a wide range of mathematical ideas in a way that develops your critical and intellectual abilities. You'll develop a broad understanding of mathematical theory and application and deepen your knowledge in areas that appeal to you. As part of the Statistics specialisation, you will examine a variety of relevant topics, such as applied probability, stochastic simulation, and games and risk-based decisions.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 39,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-statistics/',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-statistics/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 39 points with 7 in Mathematics at HL and 6 in another subject at HL (any subject). Mathematics AA or AI accepted at HL; AA preferred. Typical offer 40. TMUA required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpzchc3000v7mjoz7qgm8f2',
      status: 'current',
      name: 'Mathematics with Statistics for Finance',
      description:
        "This course aims to present you with a wide range of mathematical ideas in a way that develops your critical and intellectual abilities. You'll develop a broad understanding of mathematical theory and application and deepen your knowledge in areas that appeal to you. As part of this specialisation, you will choose modules from a variety of relevant topics such as applied probability and mathematical finance.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-statistics-finance/',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-statistics-finance/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 39 points with 7 in Mathematics at HL and 6 in another subject at HL (any subject). Mathematics AA or AI accepted at HL; AA preferred. Typical offer 40. TMUA required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2x1q00cj7mwxtva5d2im',
      status: 'current',
      name: 'Mechanical Engineering',
      description:
        "Mechanical engineers play a key role in solving key global challenges, from developing sustainable energy sources to improving the lifespan of battery technology. This course will suit you if you want to develop your mathematical, physics and computational skills to tackle tomorrow's engineering issues. Through lectures, labs and tutorials, you'll build a solid understanding of the principles of solid mechanics, thermofluids and mechatronics.",
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 40,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/mechanical-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/mechanical-engineering/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 40 points with 6 in Mathematics and 6 in Physics at HL (Physics is required, so now critical). Mathematics AA or AI accepted at HL; AA preferred. Typical offer 40 with 7 in Mathematics and 7 in Physics at HL. ESAT and interview.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2wn700cb7mwxl0nyyog2',
      status: 'current',
      name: 'Mechanical Engineering with Nuclear Engineering',
      description:
        "Deepen your understanding of engineering science and specialise in nuclear engineering in this professionally accredited four-year Master's degree. This course will help you advance your technical, practical and professional skills to tackle tomorrow's engineering issues. As the course develops, you'll start to specialise across a series of nuclear engineering modules.",
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 40,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/mechanical-engineering-nuclear/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/mechanical-engineering-nuclear/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Applicants apply to Mechanical Engineering (H301). Minimum 40 points with 6 in Mathematics and 6 in Physics at HL (Physics is required, so now critical). Mathematics AA or AI accepted at HL; AA preferred. Typical offer 40 with 7 in Mathematics and 7 in Physics at HL. ESAT and interview.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpzcgry000j7mjoavjkldlk',
      status: 'current',
      name: 'Medical Biosciences',
      description:
        "You'll explore the principles of biomedical science, and how they are applied in research, policy and industry. This course is designed to build your potential towards becoming a science leader. You'll develop your ability to think like a scientist through a research-intensive, laboratory-focused curriculum. You'll also build key skills in science communication and ethics.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/medical-biosciences/',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/medical-biosciences/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Biology and 6 in Chemistry, Mathematics or Physics at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 38. No admissions test.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpzcg6700077mjobzwfxs1g',
      status: 'current',
      name: 'Medical Biosciences with Management',
      description:
        "Explore the science that underpins human health and develop your management skills on this interdisciplinary course. You'll advance your understanding of the practice of biomedical science, and its application in research, policy and industry. This course will develop your ability to think like a scientist through a research-intensive, laboratory-focused curriculum.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/medical-biosciences-management/',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/medical-biosciences-management/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Biology and 6 in Chemistry, Mathematics or Physics at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 38. No admissions test.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MBBS/BSc".
    {
      id: 'cmkpzcfrd00017mjowvypyv3w',
      status: 'current',
      name: 'Medicine',
      description:
        'You will join one of the largest medicine departments in Europe, with medical campuses across north and west London and partnerships with a wide range of NHS Trusts, hospitals and clinics. Our newly redeveloped curriculum looks at technological developments in education and healthcare and expectations of medical practice within the NHS of the future. Successful students will graduate with both an MBBS and BSc qualification with this integrated course.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Medicine and Bachelor of Surgery',
      duration: '6 years',
      minIBPoints: 38,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/medicine/',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/medicine/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). MBBS/BSc, 6 years. Minimum 38 points with 6 in Biology and 6 in Chemistry at HL (Chemistry is required, so now critical). Mathematics AA or AI accepted. Typical offer 39 with 6 and 7 in Biology and Chemistry at HL. UCAT and multiple mini interviews; UCAS deadline 15 October 2026.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpz2w4q00bz7mwxylh25k6n',
      status: 'current',
      name: 'Microbiology',
      description:
        'Focus your study on all types of microorganisms and acquire theoretical and practical skills for a career in microbiology on this three-year course. Microbiology at Imperial aims to understand the behaviour of living systems from the level of cells up to whole organisms and ecosystems. This course focuses on all types of microorganisms, including bacteria, fungi and viruses.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/microbiology/',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/microbiology/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 38 points with 6 in Biology and 6 in Chemistry, Mathematics or Physics at HL (the second subject is required, so now critical). Mathematics AA or AI accepted at HL, no preference. Typical offer 39. ESAT required.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MEng".
    {
      id: 'cmkpz2vq800br7mwxgms7akko',
      status: 'current',
      name: 'Molecular Bioengineering',
      description:
        "As a molecular bioengineer, you'll learn how to engineer biological systems to solve challenges in health and wellbeing. Through this course, you will develop the scientific understanding and laboratory expertise of a life scientist with the technical knowledge and problem-solving skills of an engineer. With this unique combination of skills, you will be well placed to address the global challenges of today.",
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.imperial.ac.uk/study/courses/undergraduate/molecular-bioengineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/molecular-bioengineering/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 39 points with 6 in Mathematics, 6 in Chemistry (required, so now critical) and 6 in a third subject at HL (any subject). Mathematics AA or AI accepted at HL; AA preferred. Typical offer 40. No admissions test.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "MSci".
    {
      id: 'cmkpz2v6t00bj7mwxay9dd5ds',
      status: 'current',
      name: 'Physics',
      description:
        "Enhance your understanding of both fundamental and applied physics on this accredited four-year course. You'll receive an excellent grounding in a range of physics, mathematics and experimental methods. This work will prepare you for advanced study or a career within this exciting field of science. This course offers you the flexibility to tailor learning towards your career interests as your studies progress.",
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 40,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/physics-msci/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 7, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/physics-msci/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 40 points with 7 in Mathematics, 7 in Physics (required, so now critical) and 6 in a third subject at HL (any subject). Mathematics AA or AI accepted at HL; AA preferred. Typical offer 42. ESAT and interview.'
    },
    // Stored: checked for 2026 entry on 2026-01-22. Degree stored as "BSc".
    {
      id: 'cmkpz2ula00bb7mwx0iu3bhv0',
      status: 'current',
      name: 'Physics with Theoretical Physics',
      description:
        'Explore how the principles and laws of physics underpin most science and engineering disciplines on this three-year course. Problems in physics can relate to phenomena on gigantic scales such as the cosmos, minutely small ones, and virtually any other scale in between. This programme is particularly suited to those with a specific interest in mathematics and its application, with less emphasis on experimental work than our standard Physics courses.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 40,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/physics-theoretical-bsc/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 7, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/apply/undergraduate/entry-requirements/accepted-qualifications/',
        'https://www.imperial.ac.uk/study/courses/undergraduate/physics-theoretical-bsc/'
      ],
      notes:
        'Checked for 2027 entry (the course page gives a start date of October 2027). Minimum 40 points with 7 in Mathematics, 7 in Physics (required, so now critical) and 6 in a third subject at HL (any subject). Mathematics AA or AI accepted at HL; AA preferred. Typical offer 42. ESAT and interview.'
    },
    {
      id: 'cmujv4sst00a37q7mholth3s5',
      status: 'current',
      name: 'Computing (MEng)',
      description:
        "Computing is a creative and wide-ranging subject that focuses on using sound underlying principles and logical thinking to design and build systems that really work. This general programme offers a wide range of module choices as you progress, with a strong grounding in discrete mathematics, computer architecture and software engineering. At the end of the third year you complete a paid industrial placement, and your study reaches Master's level in the final year, with a wide choice of optional modules and a substantial individual project.",
      field: 'Computer Science',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 41,
      programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/computing-meng/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'ECON', 'PHYS'], level: 'HL', grade: 7, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.imperial.ac.uk/study/courses/undergraduate/computing-meng/',
        'https://www.imperial.ac.uk/computing/prospective-students/courses/ug/'
      ],
      notes:
        'Content 3.4: added as the nearest successor to Computing (Management and Finance), which is not offered for 2027. UCAS G401, start October 2027. Minimum 41 points with 7 in Mathematics at HL (AA or AI) and 7 in another relevant subject at HL; typical offer 42. The course page does not define a relevant subject: the department suggests Physics, Computer Science, Chemistry, Economics or Biology at HL, so that group is not critical. TMUA required for 2027 entry.'
    }
  ]
}

export default refresh
