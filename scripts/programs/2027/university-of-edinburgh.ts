import type { RefreshFile } from '../lib/refresh'

/**
 * University of Edinburgh: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-edinburgh
 */
const refresh: RefreshFile = {
  university: 'University of Edinburgh',
  entryYear: 2027,
  checkedOn: '2026-09-29',
  programs: [
    // Stored: not checked for any intake. Degree stored as "MA (Hons)".
    {
      id: 'cmkcj2nd1003u7mherjp0gvul',
      status: 'current',
      name: 'Accounting and Business MA (Hons)',
      description:
        'This programme combines the study of accounting and business to prepare you for the social, political, environmental and cultural challenges facing contemporary businesses, governments and not-for-profit organisations.',
      field: 'Business & Economics',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/189-accounting-and-business',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/189-accounting-and-business/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/189-accounting-and-business'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS NN14, MA (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. Checked, no HL subject required. Mathematics (AA or AI) at SL 5 is required, so now critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "MA (Hons)".
    {
      id: 'cmkcj2mz8003k7mhe4th47ork',
      status: 'current',
      name: 'Accounting and Finance MA (Hons)',
      description:
        'This programme combines the study of accounting and finance to prepare you for the social, political, environmental and cultural challenges facing contemporary businesses, governments and not-for-profit organisations.',
      field: 'Business & Economics',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/464-accounting-and-finance',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/464-accounting-and-finance/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/464-accounting-and-finance'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS NN43, MA (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. Checked, no HL subject required. Mathematics (AA or AI) at SL 5 is required, so now critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "BSc (Hons)".
    {
      id: 'cmkcj2lk3002e7mhew5zhv5bl',
      status: 'current',
      name: 'Anatomy and Development BSc (Hons)',
      description:
        'The fields of anatomy and developmental biology are closely linked. Knowledge of anatomy is vital in many areas of biology and medicine, including developmental biology. Similarly, developmental biology tells us much about how normal anatomy is formed and maintained.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/656-anatomy-and-development',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/656-anatomy-and-development/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/656-anatomy-and-development'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS C183, BSc (Hons). IB standard requirements: 34 points with 655 at HL. Biology and Chemistry at HL, one at 5 and one at 6; stored at 5 each, as the model cannot say "one of them at 6". Mathematics or Physics recommended, not stored. Mathematics (AA or AI) at SL 5 is required, so now critical: Mathematics is part of every Diploma, so the GCSE alternative the page offers applies only to English. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL. Second-year entry: 36 points with 666 at HL to include Biology and Chemistry.'
    },
    // Stored: not checked for any intake. Degree stored as "BSc (Hons)".
    {
      id: 'cmkcw4mzo000i7mio7hs85gco',
      status: 'current',
      name: 'Artificial Intelligence and Computer Science BSc (Hons)',
      description:
        'A fascinating joint degree that enables you to explore both core areas of computing. You will gain a deep understanding of how computer systems are designed and how intelligent behavior can be modeled and implemented.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://study.ed.ac.uk/programmes/undergraduate/66-artificial-intelligence-and-computer-science',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/programmes/undergraduate/66-artificial-intelligence-and-computer-science/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/66-artificial-intelligence-and-computer-science'
      ],
      notes:
        'Content 3.4: the degree finder moved the programme from 61-... to 66-artificial-intelligence-and-computer-science; same programme (UCAS GG47, BSc (Hons), 4 years). Year of entry 2027 (start September 2027). IB standard requirements: offers in recent years ranged from 43 points with 777 at HL down to 34 points with 665 at HL; 34 is stored. Mathematics (Analysis and approaches only) at HL 6, taken no more than two years before entry. English at SL 5 (ab initio not accepted), not critical because an English test also meets the language requirement; English B now counts. The 665 HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 with 655.'
    },
    // Stored: not checked for any intake. Degree stored as "BSc (Hons)".
    {
      id: 'cmkcw4mku000a7mio2gie3v4j',
      status: 'current',
      name: 'Artificial Intelligence BSc (Hons)',
      description:
        'Artificial Intelligence aims to understand and develop systems that display properties normally associated with intelligence, such as learning from experience, using language, and problem-solving. You will study the fundamental ideas and techniques that make AI possible.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/388-artificial-intelligence',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/programmes/undergraduate/388-artificial-intelligence/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/388-artificial-intelligence'
      ],
      notes:
        'Content 3.4: the degree finder moved the programme from 56-artificial-intelligence to 388-artificial-intelligence; same programme (UCAS G700, BSc (Hons), 4 years). Year of entry 2027 (start September 2027). IB standard requirements: offers in recent years ranged from 43 points with 777 at HL down to 34 points with 665 at HL; 34 is stored. Mathematics (Analysis and approaches only) at HL 6, taken no more than two years before entry. English at SL 5 (ab initio not accepted), not critical because an English test also meets the language requirement; English B now counts. The 665 HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 with 655.'
    },
    // Stored: not checked for any intake. Degree stored as "BSc (Hons)".
    {
      id: 'cmkcj2jqm000y7mhe72ti6yr6',
      status: 'current',
      name: 'Biomedical Sciences BSc (Hons)',
      description:
        'The aim of biomedical science is to understand the function of the human body. In both health and disease, it looks at the following levels: molecular, cellular, organ, system.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/383-biomedical-sciences',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/383-biomedical-sciences/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/383-biomedical-sciences'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS C190, BSc (Hons). IB standard requirements: 34 points with 655 at HL. Biology and Chemistry at HL, one at 5 and one at 6; stored at 5 each, as the model cannot say "one of them at 6". Mathematics or Physics recommended, not stored. Mathematics (AA or AI) at SL 5 is required, so now critical: Mathematics is part of every Diploma, so the GCSE alternative the page offers applies only to English. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL. Second-year entry: 36 points with 666 at HL to include Biology and Chemistry.'
    },
    // Stored: not checked for any intake. Degree stored as "MA (Hons)".
    {
      id: 'cmkcj2nqt00447mhee77j1g60',
      status: 'current',
      name: 'Business and Economics MA (Hons)',
      description:
        'The MA Business and Economics combines the relative academic rigour of mainstream economics with the more practical and vocational perspective of business.',
      field: 'Business & Economics',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/186-business-and-economics',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'SL', grade: 6 }
          ],
          critical: true
        },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/186-business-and-economics/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/186-business-and-economics'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS NL11, MA (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. Mathematics (AA or AI) at HL 5, or at SL 6 if not taken at HL, stored as one mixed group (was Mathematics HL 5 alone). English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "MA (Hons)".
    {
      id: 'cmkcw4usl005u7mio4alqomrv',
      status: 'current',
      name: 'Business and Law MA (Hons)',
      description:
        'Combines the study of business and law to prepare you for social, political and legal challenges facing contemporary organizations. AACSB and EQUIS double accredited.',
      field: 'Business & Economics',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/188-business-and-law',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/188-business-and-law/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/188-business-and-law'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS NM11, MA (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. English at HL 5, critical; the page names no English course, so English B is added, as the university excludes only ab initio. Mathematics (AA or AI) at SL 5 is required, so now critical. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "MA (Hons)".
    {
      id: 'cmkcj2owh004y7mhe2eoipgz0',
      status: 'current',
      name: 'Business with Marketing MA (Hons)',
      description:
        'Combine the study of business with marketing to prepare for the social, political, environmental and cultural challenges facing contemporary businesses, governments and not-for-profit organisations.',
      field: 'Business & Economics',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/607-business-with-marketing',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/607-business-with-marketing/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/607-business-with-marketing'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS N1N5, MA (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. Checked, no HL subject required. Mathematics (AA or AI) at SL 5 is required, so now critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "BEng (Hons)".
    {
      id: 'cmkcw4o43001a7mio97neivgz',
      status: 'current',
      name: 'Chemical Engineering BEng (Hons)',
      description:
        'Chemical engineers design, develop and operate processes that convert raw materials into high-value products. You will learn to tackle global challenges in energy, environment, and sustainability.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/99-chemical-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 5, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/99-chemical-engineering/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/99-chemical-engineering'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS H800, BEng (Hons). IB standard requirements: offers in recent years ranged from 37 points with 666 at HL to 32 points with 655 at HL; the bottom of the range is stored. Mathematics (Analysis and approaches only) and Chemistry at HL 5; Physics at SL 5, required, so now critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL. Second-year entry: 38 points with 666 at HL to include Chemistry and Mathematics (Analysis and approaches only) at 6.'
    },
    // Stored: not checked for any intake. Degree stored as "MEng (Hons)".
    {
      id: 'cmkcw4olv001m7miodwlo28eh',
      status: 'current',
      name: 'Chemical Engineering MEng (Hons)',
      description:
        'The five-year integrated Masters in Chemical Engineering includes advanced study and a paid industry placement. Fully accredited by IChemE for Chartered Engineer status.',
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '5 years',
      minIBPoints: 32,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/100-chemical-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 5, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/100-chemical-engineering/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/100-chemical-engineering'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS H804, MEng (Hons). IB standard requirements: offers in recent years ranged from 37 points with 666 at HL to 32 points with 655 at HL; the bottom of the range is stored. Mathematics (Analysis and approaches only) and Chemistry at HL 5; Physics at SL 5, required, so now critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL. Second-year entry: 38 points with 666 at HL to include Chemistry and Mathematics (Analysis and approaches only) at 6.'
    },
    // Stored: not checked for any intake. Degree stored as "BEng (Hons)".
    {
      id: 'cmkcw4p3u001y7mio9gagzr4l',
      status: 'current',
      name: 'Civil Engineering BEng (Hons)',
      description:
        'Civil engineers design, build, and maintain infrastructure that forms the backbone of modern society, from buildings and bridges to water supply and transportation systems.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/76-civil-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['BIO', 'CHEM', 'CS', 'DES-TECH', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        },
        { courses: ['PHYS'], level: 'SL', grade: 5, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/76-civil-engineering/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/76-civil-engineering'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS H200, BEng (Hons). IB standard requirements: offers in recent years ranged from 34 points with 655 at HL to 32 points with 555 at HL; the bottom of the range is stored. Mathematics (Analysis and approaches only) at HL 5; one of Physics, Biology, Chemistry, Computer Science or Design Technology at HL 5 (Physics preferred); Physics at SL 5 if not at HL. Both are required, so now critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 555 at HL. Second-year entry: 37 points with 666 at HL to include Mathematics (Analysis and approaches only) and Physics or Design Technology at 6.'
    },
    // Stored: not checked for any intake. Degree stored as "MA (Hons)".
    {
      id: 'cmkcj2qsp006a7mhe20tkxpdj',
      status: 'current',
      name: 'Cognitive Science (Humanities) MA (Hons)',
      description:
        'Cognitive science is the interdisciplinary attempt to understand the human mind. It focuses on abilities such as reasoning, perception, memory, awareness, emotion, attention, judgement, motor control, and language use.',
      field: 'Social Sciences',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://study.ed.ac.uk/programmes/undergraduate/479-cognitive-science-humanities',
      requirements: [
        {
          courses: [
            'BIO',
            'CHEM',
            'CS',
            'ESS',
            'GEOG',
            'MATH-AA',
            'MATH-AI',
            'PHYS',
            'PSYCH',
            'SEHS'
          ],
          level: 'HL',
          grade: 5,
          critical: true
        },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'SL', grade: 6 }
          ],
          critical: true
        },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/479-cognitive-science-humanities/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/479-cognitive-science-humanities'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS C851, MA (Hons). IB standard requirements: 34 points with 655 at HL. One of Biology, Chemistry, Computer Science, Environmental Systems and Societies, Geography, Mathematics, Physics, Psychology or Sports, Exercise and Health Science at HL 5 (ESS and SEHS added), and Mathematics (AA or AI) at SL 6 if not at HL, stored as one mixed group with HL 5. Both are required, so now critical. Before, the science group was not critical and Mathematics was not stored. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "BSc (Hons)".
    {
      id: 'cmkcj2s4n007c7mheu9w6xcc4',
      status: 'current',
      name: 'Computer Science and Mathematics BSc (Hons)',
      description:
        'Mathematics forms the foundation of computer science. With the increasing scale of computing systems, and growing volumes of data, we are developing and using more sophisticated mathematical techniques every day.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://study.ed.ac.uk/programmes/undergraduate/64-computer-science-and-mathematics',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/64-computer-science-and-mathematics/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/64-computer-science-and-mathematics'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS GG14, BSc (Hons). IB standard requirements: offers in recent years ranged from 43 points with 777 at HL to 34 points with 755 at HL; the bottom of the range is stored. Mathematics (Analysis and approaches only) at HL 7, taken no more than two years before entry. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. English B added. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 755 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "BSc (Hons)".
    {
      id: 'cmkcw4m5f00027mio91jit7ca',
      status: 'current',
      name: 'Computer Science BSc (Hons)',
      description:
        'Computer science is the study of computation, information, and automation. You will explore the theory, design, and implementation of algorithms and data structures, study how systems manage complexity, and examine the profound impact of computer science on almost every aspect of our lives.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/57-computer-science',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/57-computer-science/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/57-computer-science'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS G400, BSc (Hons). IB standard requirements: offers in recent years ranged from 43 points with 777 at HL to 34 points with 665 at HL; the bottom of the range is stored. Mathematics (Analysis and approaches only) at HL 6, taken no more than two years before entry. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. English B added. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "MA (Hons)".
    {
      id: 'cmkcj2qgd00627mheucg3xpvs',
      status: 'current',
      name: 'Economics and Mathematics MA (Hons)',
      description:
        'This combined programme complements the basic grounding in mathematical techniques provided within Economics, with a more thorough and rigorous development of mathematical principles.',
      field: 'Business & Economics',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/133-economics-and-mathematics',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/133-economics-and-mathematics/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/133-economics-and-mathematics'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS LG11, MA (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. Mathematics (Analysis and approaches only) at HL 6. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "MA (Hons)".
    {
      id: 'cmkcj2oio004o7mhe4xh31isw',
      status: 'current',
      name: 'Economics and Politics MA (Hons)',
      description: 'This popular joint programme combines two core social science disciplines.',
      field: 'Business & Economics',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/135-economics-and-politics',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'SL', grade: 6 }
          ],
          critical: true
        },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/135-economics-and-politics/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/135-economics-and-politics'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS LL12, MA (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. Mathematics (AA or AI) at HL 5, or at SL 6 if not taken at HL, stored as one mixed group (was Mathematics HL 5 alone). English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "MA (Hons)".
    {
      id: 'cmkcj2o4r004e7mheajsct8bb',
      status: 'current',
      name: 'Economics MA (Hons)',
      description:
        'This programme gives you the opportunity to examine the economic incentives that shape and reconcile the important decisions made by individuals, businesses, governments and societies.',
      field: 'Business & Economics',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/122-economics',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'SL', grade: 6 }
          ],
          critical: true
        },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/122-economics/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/122-economics'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS L100, MA (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. Mathematics (AA or AI) at HL 5, or at SL 6 if not taken at HL, stored as one mixed group (was Mathematics HL 5 alone). English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "MA (Hons)".
    {
      id: 'cmkcj2q26005s7mhewby9jrao',
      status: 'current',
      name: 'Economics with Finance MA (Hons)',
      description:
        'There are obvious crossovers between economics and finance. In addition to covering the core of the economics programme, we will introduce you to the basic principles of finance before moving onto more advanced topics such as: investments, securities, corporate finance.',
      field: 'Business & Economics',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/469-economics-with-finance',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'SL', grade: 6 }
          ],
          critical: true
        },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/469-economics-with-finance/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/469-economics-with-finance'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS L1N3, MA (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. Mathematics (AA or AI) at HL 5, or at SL 6 if not taken at HL, stored as one mixed group (was Mathematics HL 5 alone). English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "MEng (Hons)".
    {
      id: 'cmkcw4rxa00467mio5jsw3kfm',
      status: 'current',
      name: 'Electrical and Mechanical Engineering MEng (Hons)',
      description:
        'Electromechanical engineers work on everything from energy generation and hybrid vehicles to aircraft design and satellite technology. Dual accredited by IMechE and IET.',
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '5 years',
      minIBPoints: 32,
      programUrl:
        'https://study.ed.ac.uk/programmes/undergraduate/109-electrical-and-mechanical-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['BIO', 'CHEM', 'CS', 'DES-TECH', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        },
        { courses: ['PHYS'], level: 'SL', grade: 5, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/109-electrical-and-mechanical-engineering/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/109-electrical-and-mechanical-engineering'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS HHH6, MEng (Hons). IB standard requirements: offers in recent years ranged from 37 points with 666 at HL to 32 points with 655 at HL; the bottom of the range is stored. Mathematics (Analysis and approaches only) at HL 5; one of Physics, Biology, Chemistry, Computer Science or Design Technology at HL 5 (Physics preferred); Physics at SL 5 if not at HL. Both are required, so now critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL. Second-year entry: 38 points with 766 at HL to include Mathematics (Analysis and approaches only) and Physics or Design Technology at 6.'
    },
    // Stored: not checked for any intake. Degree stored as "MEng (Hons)".
    {
      id: 'cmkcw4r85003m7mioxeps8uk4',
      status: 'current',
      name: 'Electronics and Computer Science MEng (Hons)',
      description:
        'A fascinating combination of electronics and computer science. Learn to design and apply both hardware and software of general-purpose and embedded computer systems.',
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '5 years',
      minIBPoints: 34,
      programUrl:
        'https://study.ed.ac.uk/programmes/undergraduate/70-electronics-and-computer-science',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
        {
          courses: ['BIO', 'CHEM', 'CS', 'DES-TECH', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        },
        { courses: ['PHYS'], level: 'SL', grade: 5, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/70-electronics-and-computer-science/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/70-electronics-and-computer-science'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS GHK6, MEng (Hons). IB standard requirements: offers in recent years ranged from 37 points with 666 at HL to 34 points with 665 at HL; the bottom of the range is stored. Mathematics (Analysis and approaches only) at HL 6; one of Physics, Biology, Chemistry, Computer Science or Design Technology at HL 5 (Physics preferred); Physics at SL 5 if not at HL. Both are required, so now critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "BEng (Hons)".
    {
      id: 'cmkcynuds00257moe92pb6dyz',
      status: 'current',
      name: 'Electronics and Electrical Engineering BEng (Hons)',
      description:
        'Pioneer change in modern technologies from smartphone processors to wind turbine power electronics. Create more powerful, efficient and universal products, systems and materials.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://study.ed.ac.uk/programmes/undergraduate/88-electronics-and-electrical-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['BIO', 'CHEM', 'CS', 'DES-TECH', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        },
        { courses: ['PHYS'], level: 'SL', grade: 5, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/88-electronics-and-electrical-engineering/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/88-electronics-and-electrical-engineering'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS H600, BEng (Hons). IB standard requirements: offers in recent years ranged from 37 points with 666 at HL to 32 points with 655 at HL; the bottom of the range is stored. Mathematics (Analysis and approaches only) at HL 5; one of Physics, Biology, Chemistry, Computer Science or Design Technology at HL 5 (Physics preferred); Physics at SL 5 if not at HL. Both are required, so now critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL. Second-year entry: 38 points with 766 at HL to include Mathematics (Analysis and approaches only) and Physics or Design Technology at 6.'
    },
    // Stored: not checked for any intake. Degree stored as "BEng (Hons) / MEng (Hons)".
    {
      id: 'cmkcw4ne4000q7mio5hf1lpuw',
      status: 'current',
      name: 'Engineering BEng/MEng (Hons)',
      description:
        'This entry route degree allows you to experience different areas of engineering before specializing in Year 2. Choose from Chemical, Civil, Electrical, Electronics, or Mechanical Engineering.',
      field: 'Engineering',
      degree: "Integrated Bachelor's and Master's",
      duration: '4-5 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/75-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['BIO', 'CHEM', 'CS', 'DES-TECH', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        },
        { courses: ['PHYS'], level: 'SL', grade: 5, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/75-engineering/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/75-engineering'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS H100, BEng/MEng (Hons). IB standard requirements: offers in recent years ranged from 37 points with 666 at HL to 34 points with 655 at HL; the bottom of the range is stored. Mathematics (Analysis and approaches only) at HL 5; one of Physics, Biology, Chemistry, Computer Science or Design Technology at HL 5 (Physics preferred); Physics at SL 5 if not at HL. Both are required, so now critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "MA (Hons)".
    {
      id: 'cmkcj2po2005i7mhet7hrjztr',
      status: 'current',
      name: 'Finance and Business MA (Hons)',
      description:
        'This degree combines the study of finance and business to prepare for the social, political, environmental and cultural challenges facing contemporary businesses, governments and not-for-profit organisations.',
      field: 'Business & Economics',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/603-finance-and-business',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/603-finance-and-business/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/603-finance-and-business'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS NN13, MA (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. Checked, no HL subject required. Mathematics (AA or AI) at SL 5 is required, so now critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "LLB (Hons)".
    {
      id: 'cmkcw4sm6004q7mioe47d3w3c',
      status: 'current',
      name: 'Global Law LLB (Hons)',
      description:
        'Designed to prepare you for globally oriented legal careers. Includes a mandatory exchange year abroad at partner law schools spanning six continents. Does not qualify for Scottish legal practice.',
      field: 'Law',
      degree: 'Bachelor of Laws',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/671-global-law',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/671-global-law/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/671-global-law'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS M116, LLB (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. English at HL 5, critical. The page names no English course; English B added, as the university excludes only ab initio. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "BA (Hons)".
    {
      id: 'cmkcynq98000d7moeylsbb5w5',
      status: 'current',
      name: 'Graphic Design BA (Hons)',
      description:
        'Balance project guidelines with personal expression through traditional and contemporary technologies. Bold, lateral thinking with understanding of process, technique and business.',
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/500-graphic-design',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/500-graphic-design/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/500-graphic-design'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS W210, BA (Hons). IB standard requirements: 34 points with 655 at HL. Checked, no specific subjects required apart from English. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. A portfolio is required; submissions close 27 January 2027. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "BSc (Hons)".
    {
      id: 'cmkcj2m16002s7mheiyt0pqcc',
      status: 'current',
      name: 'Infectious Diseases BSc (Hons)',
      description:
        'Infectious diseases shape our world, representing hugely complex global challenges not only to healthcare, but also economically and societally.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/437-infectious-diseases',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/437-infectious-diseases/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/437-infectious-diseases'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS C590, BSc (Hons). IB standard requirements: 34 points with 655 at HL. Biology and Chemistry at HL, one at 5 and one at 6; stored at 5 each, as the model cannot say "one of them at 6". Mathematics or Physics recommended, not stored. Mathematics (AA or AI) at SL 5 is required, so now critical: Mathematics is part of every Diploma, so the GCSE alternative the page offers applies only to English. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL. Second-year entry: 36 points with 666 at HL to include Biology and Chemistry.'
    },
    // Stored: not checked for any intake. Degree stored as "MInf".
    {
      id: 'cmkcj2rg4006w7mhef8yhr8tf',
      status: 'current',
      name: 'Informatics MInf',
      description:
        'Our flagship MInf degree is an integrated programme that earns you a Masters level qualification over five years. You will gain a range of experience across all areas of informatics and be able to study your chosen specialist area in-depth at Masters level.',
      field: 'Computer Science',
      degree: 'Master of Informatics',
      duration: '5 years',
      minIBPoints: 34,
      programUrl:
        'https://study.ed.ac.uk/programmes/undergraduate/430-informatics-5-year-undergraduate-masters-programme',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/430-informatics-5-year-undergraduate-masters-programme/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/430-informatics-5-year-undergraduate-masters-programme'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS G500, MInf. IB standard requirements: offers in recent years ranged from 43 points with 777 at HL to 34 points with 665 at HL; the bottom of the range is stored. Mathematics (Analysis and approaches only) at HL 6, taken no more than two years before entry. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. English B added. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "BA (Hons)".
    {
      id: 'cmkcynpwj00077moefgz5pdqu',
      status: 'current',
      name: 'Interior Design BA (Hons)',
      description:
        'Interior Design practice involves the reuse of existing buildings and places to reinvent them for new activities, ensuring human occupation, inclusivity, accessibility, and reduced environmental impact.',
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/502-interior-design',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/502-interior-design/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/502-interior-design'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS W250, BA (Hons). IB standard requirements: 34 points with 655 at HL. Checked, no specific subjects required apart from English. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. A portfolio is required; submissions close 27 January 2027. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "MA (Hons)".
    {
      id: 'cmkcj2pa500587mhe2tgt8dbl',
      status: 'current',
      name: 'International Business MA (Hons)',
      description:
        'This degree prepares you for the social, political, environmental and cultural challenges facing contemporary businesses, governments and not-for-profit organisations.',
      field: 'Business & Economics',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/183-international-business',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/183-international-business/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/183-international-business'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS N120, MA (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. Checked, no HL subject required. Mathematics (AA or AI) at SL 5 is required, so now critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkcj2t4200867mheilxpy2vx',
      status: 'current',
      name: 'Landscape Architecture MA (Hons)',
      description:
        'Throughout MA Landscape Architecture you will develop an understanding of materials and technology, alongside cultural and ecological processes, enabling you to design sustainable environments fit for the locations they inhabit.',
      field: 'Architecture',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '5 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/674-landscape-architecture',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'CS', 'GEOG', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'SL',
          grade: 4,
          critical: true
        },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/674-landscape-architecture/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/674-landscape-architecture'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS K310, MA (Hons). IB standard requirements: 34 points with 655 at HL. The award is an MA (Hons), so the degree is the Scottish undergraduate MA (was "Bachelor"). No HL subject required. One of Biology, Chemistry, Computer Science, Geography, Mathematics or Physics at SL 4 is required, so now critical. Evidence of artistic ability, for example Visual Arts or Design Technology at HL or SL, is normally required; not stored, as the page gives examples rather than a list. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "LLB (Hons)".
    {
      id: 'cmkcw4tes00567mior4z7mrsf',
      status: 'current',
      name: 'Law (Ordinary and Honours) LLB (Hons)',
      description:
        'The main qualifying LLB for Scottish legal practice. Prepares you for a career as a solicitor or advocate in Scotland, with foundation in Scots law and legal systems.',
      field: 'Law',
      degree: 'Bachelor of Laws',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/168-law-ordinary-and-honours',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/168-law-ordinary-and-honours/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/168-law-ordinary-and-honours'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS M114, LLB (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. English at HL 5, critical. The page names no English course; English B added, as the university excludes only ab initio. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "LLB (Hons)".
    {
      id: 'cmkcw4syl004w7miofopxhawj',
      status: 'current',
      name: 'Law and Business LLB (Hons)',
      description:
        'Study law alongside business, exploring important connections between legal and business practices, particularly in property rights, contracting, and regulation.',
      field: 'Law',
      degree: 'Bachelor of Laws',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/174-law-and-business',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/174-law-and-business/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/174-law-and-business'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS MN11, LLB (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. English at HL 5, critical. The page names no English course; English B added, as the university excludes only ab initio. Mathematics (AA or AI) at SL 5 is required, so now critical. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "LLB (Hons)".
    {
      id: 'cmkcw4u3n005i7miofqtfirgm',
      status: 'current',
      name: 'Law and History LLB (Hons)',
      description:
        'Study law alongside one of the largest and most diverse history departments in the UK, deepening your knowledge of geographical regions, chronological periods and themes.',
      field: 'Law',
      degree: 'Bachelor of Laws',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/180-law-and-history',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/180-law-and-history/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/180-law-and-history'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS MV11, LLB (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. English at HL 5, critical. The page names no English course; English B added, as the university excludes only ab initio. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "LLB (Hons)".
    {
      id: 'cmkcw4tr7005c7mioynqjoxvm',
      status: 'current',
      name: 'Law and International Relations LLB (Hons)',
      description:
        'Combine law with international relations, studying the origins and evolution of the state system, global non-state actors, and international cooperation and conflict.',
      field: 'Law',
      degree: 'Bachelor of Laws',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://study.ed.ac.uk/programmes/undergraduate/482-law-and-international-relations',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/482-law-and-international-relations/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/482-law-and-international-relations'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS ML1F, LLB (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. English at HL 5, critical. The page names no English course; English B added, as the university excludes only ab initio. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "LLB (Hons)".
    {
      id: 'cmkcw4ug9005o7mio71ackfjj',
      status: 'current',
      name: 'Law and Politics LLB (Hons)',
      description:
        'Study law alongside politics, gaining understanding of political systems, governance processes, and political analysis. Ideal location near Scottish Parliament.',
      field: 'Law',
      degree: 'Bachelor of Laws',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/171-law-and-politics',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/171-law-and-politics/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/171-law-and-politics'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS ML12, LLB (Hons). IB standard requirements: offers in recent years ranged from 40 points with 766 at HL to 37 points with 666 at HL; the bottom of the range is stored. English at HL 5, critical. The page names no English course; English B added, as the university excludes only ab initio. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "MBChB".
    {
      id: 'cmkcj2inq00027mheya3wlqjk',
      status: 'current',
      name: 'MBChB Medicine (6-year programme)',
      description:
        'Our six-year Bachelor of Medicine and Surgery (MBChB) degree equips you with the knowledge, understanding and skills you need to become a Foundation Year 1 doctor.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Medicine and Bachelor of Surgery',
      duration: '6 years',
      minIBPoints: 38,
      programUrl:
        'https://study.ed.ac.uk/programmes/undergraduate/354-mbchb-medicine-6-year-programme',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 6, critical: true },
        { courses: ['BIO'], level: 'SL', grade: 6, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 6, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/354-mbchb-medicine-6-year-programme/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/354-mbchb-medicine-6-year-programme'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS A100, MBChB. IB standard requirements: 38 points with 666 at HL. Chemistry and one of Biology, Mathematics or Physics at HL (666); Mathematics (AA or AI) at SL 6; Biology at SL 6 if not at HL. All are required, so the second HL subject and Biology are now critical. English at SL 6 (ab initio not accepted), not critical as elsewhere; English B added. All grades at the first attempt. A minimum UCAT score is required. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "BEng (Hons)".
    {
      id: 'cmkcw4psw002i7mio3a6rtyq5',
      status: 'current',
      name: 'Mechanical Engineering BEng (Hons)',
      description:
        'Mechanical engineers turn ideas into realities, creating systems and machines that generate movement and power. Lead technological advancements across diverse industries.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/82-mechanical-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['BIO', 'CHEM', 'CS', 'DES-TECH', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        },
        { courses: ['PHYS'], level: 'SL', grade: 5, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/82-mechanical-engineering/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/82-mechanical-engineering'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS H300, BEng (Hons). IB standard requirements: offers in recent years ranged from 37 points with 666 at HL to 32 points with 655 at HL; the bottom of the range is stored. Mathematics (Analysis and approaches only) at HL 5; one of Physics, Biology, Chemistry, Computer Science or Design Technology at HL 5 (Physics preferred); Physics at SL 5 if not at HL. Both are required, so now critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL. Second-year entry: 38 points with 766 at HL to include Mathematics (Analysis and approaches only) and Physics or Design Technology at 6.'
    },
    // Stored: not checked for any intake. Degree stored as "MEng (Hons)".
    {
      id: 'cmkcw4qiu00327mio1l28oe5u',
      status: 'current',
      name: 'Mechanical Engineering MEng (Hons)',
      description:
        'The five-year integrated Masters in Mechanical Engineering includes a paid industrial placement. Fully accredited by IMechE for Chartered Engineer status.',
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '5 years',
      minIBPoints: 32,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/83-mechanical-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['BIO', 'CHEM', 'CS', 'DES-TECH', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        },
        { courses: ['PHYS'], level: 'SL', grade: 5, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/83-mechanical-engineering/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/83-mechanical-engineering'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS H303, MEng (Hons). IB standard requirements: offers in recent years ranged from 37 points with 666 at HL to 32 points with 655 at HL; the bottom of the range is stored. Mathematics (Analysis and approaches only) at HL 5; one of Physics, Biology, Chemistry, Computer Science or Design Technology at HL 5 (Physics preferred); Physics at SL 5 if not at HL. Both are required, so now critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL. Second-year entry: 38 points with 766 at HL to include Mathematics (Analysis and approaches only) and Physics or Design Technology at 6.'
    },
    // Stored: not checked for any intake. Degree stored as "BSc (Hons)".
    {
      id: 'cmkcj2klq001m7mhez4wpkoze',
      status: 'current',
      name: 'Neuroscience BSc (Hons)',
      description:
        'Neuroscience is the study of the nervous system, how the brain works, and how cells interact to control behaviour. Research in neuroscience tries to better understand the structure of the nervous system, exploring how it works, develops, malfunctions, and can be manipulated.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/2-neuroscience',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/2-neuroscience/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/2-neuroscience'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS B140, BSc (Hons). IB standard requirements: 34 points with 655 at HL. Biology and Chemistry at HL, one at 5 and one at 6; stored at 5 each, as the model cannot say "one of them at 6". Mathematics or Physics recommended, not stored. Mathematics (AA or AI) at SL 5 is required, so now critical: Mathematics is part of every Diploma, so the GCSE alternative the page offers applies only to English. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL. Second-year entry: 36 points with 666 at HL to include Biology and Chemistry.'
    },
    // Stored: not checked for any intake. Degree stored as "BN".
    {
      id: 'cmkcj2k7n001c7mhes3q8x8pg',
      status: 'current',
      name: 'Nursing Studies BN',
      description:
        'The Bachelor of Nursing (BN) with honours programme reflects global, UK and Scottish perspectives of healthcare. This highly regarded programme allows you to work closely with academic staff who are engaged in international nursing leadership, research and practice.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Nursing',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/113-nursing-studies',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/113-nursing-studies/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/113-nursing-studies'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS B700, BN (Hons). IB standard requirements: 34 points with 655 at HL. No HL subject required. Mathematics (AA or AI) at SL 4 is required, so now critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. Admission includes an interview. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "BSc (Hons)".
    {
      id: 'cmkcj2l3200207mhe615c2du9',
      status: 'current',
      name: 'Pharmacology BSc (Hons)',
      description:
        'Pharmacology is the study of how drugs can affect the body - whether to treat disorders or change bodily functions. It brings together the study of physiology, biochemistry, and molecular biology, combining the three disciplines to encourage new insights.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/3-pharmacology',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/3-pharmacology/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/3-pharmacology'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS B210, BSc (Hons). IB standard requirements: 34 points with 655 at HL. Biology and Chemistry at HL, one at 5 and one at 6; stored at 5 each, as the model cannot say "one of them at 6". Mathematics or Physics recommended, not stored. Mathematics (AA or AI) at SL 5 is required, so now critical: Mathematics is part of every Diploma, so the GCSE alternative the page offers applies only to English. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL. Second-year entry: 36 points with 666 at HL to include Biology and Chemistry.'
    },
    // Stored: not checked for any intake. Degree stored as "MA (Hons)".
    {
      id: 'cmkcj2sgr007k7mhe6kx5akda',
      status: 'current',
      name: 'Philosophy and Psychology MA (Hons)',
      description:
        'Philosophy gives you the skills to think about great philosophical questions in a clear and systematic way. Psychology is an experimental and observational science that studies how we perceive, think and learn about the world around us.',
      field: 'Arts & Humanities',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/319-philosophy-and-psychology',
      requirements: [
        {
          courses: [
            'BIO',
            'CHEM',
            'CS',
            'ESS',
            'GEOG',
            'MATH-AA',
            'MATH-AI',
            'PHYS',
            'PSYCH',
            'SEHS'
          ],
          level: 'HL',
          grade: 5,
          critical: true
        },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'SL', grade: 6 }
          ],
          critical: true
        },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/319-philosophy-and-psychology/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/319-philosophy-and-psychology'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS VC58, MA (Hons). IB standard requirements: offers in recent years ranged from 36 points with 665 at HL to 34 points with 655 at HL; the bottom of the range is stored. One of Biology, Chemistry, Computer Science, Environmental Systems and Societies, Geography, Mathematics, Physics, Psychology or Sports, Exercise and Health Science at HL 5 (ESS and SEHS added), and Mathematics (AA or AI) at SL 6 if not at HL, stored as one mixed group with HL 5. Both are required, so now critical. Before, the science group was not critical and Mathematics was not stored. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "MA (Hons)".
    {
      id: 'cmkcyntvv001z7moeyywbx1wx',
      status: 'current',
      name: 'Politics MA (Hons)',
      description:
        'Study the theory and practice of how societies are governed. Explore political institutions, power dynamics, and the nature of a just society under leading academics.',
      field: 'Social Sciences',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/124-politics',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/124-politics/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/124-politics'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS L200, MA (Hons). IB standard requirements: offers in recent years ranged from 37 points with 666 at HL to 34 points with 655 at HL; the bottom of the range is stored. Checked, no specific subjects required apart from English. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "BA (Hons)".
    {
      id: 'cmkcynpgv00017moeh8cyjitr',
      status: 'current',
      name: 'Product Design BA (Hons)',
      description:
        "Understand people and society by questioning and reflecting on design's role in existing and emerging systems. Develop diverse skill sets building on traditional methods and exploring those at the forefront of the discipline.",
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/505-product-design',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/505-product-design/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/505-product-design'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS W240, BA (Hons). IB standard requirements: 34 points with 655 at HL. Checked, no specific subjects required apart from English. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. A portfolio is required; submissions close 27 January 2027. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "MA (Hons)".
    {
      id: 'cmkcynqpx000j7moecbzo7e44',
      status: 'current',
      name: 'Psychology and Business MA (Hons)',
      description:
        'Study how we perceive, think and learn about the world, combined with preparation for challenges facing contemporary businesses, governments and not-for-profit organisations.',
      field: 'Social Sciences',
      degree: 'Master of Arts (Scottish undergraduate)',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/116-psychology-and-business',
      requirements: [
        {
          courses: [
            'BIO',
            'CHEM',
            'CS',
            'ESS',
            'GEOG',
            'MATH-AA',
            'MATH-AI',
            'PHYS',
            'PSYCH',
            'SEHS'
          ],
          level: 'HL',
          grade: 5,
          critical: true
        },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'SL', grade: 6 }
          ],
          critical: true
        },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/116-psychology-and-business/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/116-psychology-and-business'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS CN81, MA (Hons). IB standard requirements: offers in recent years ranged from 37 points with 666 at HL to 34 points with 655 at HL; the bottom of the range is stored. One of Biology, Chemistry, Computer Science, Environmental Systems and Societies, Geography, Mathematics, Physics, Psychology or Sports, Exercise and Health Science at HL 5 (ESS and SEHS added), and Mathematics (AA or AI) at SL 6 if not at HL, stored as one mixed group with HL 5. Both are required, so now critical. Was 37, the top of the range; the science group and Mathematics SL 6 were not critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "BSc (Hons)".
    {
      id: 'cmkcynsdg00197moeu7aoktel',
      status: 'current',
      name: 'Psychology BSc (Hons)',
      description:
        'The scientific study of the mind, brain, and behaviour. Focus on building and testing theories to explain how people interact with each other and the world around them using experimental and observational methods.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/370-psychology',
      requirements: [
        {
          courses: [
            'BIO',
            'CHEM',
            'CS',
            'ESS',
            'GEOG',
            'MATH-AA',
            'MATH-AI',
            'PHYS',
            'PSYCH',
            'SEHS'
          ],
          level: 'HL',
          grade: 5,
          critical: true
        },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'SL', grade: 6 }
          ],
          critical: true
        },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/370-psychology/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/370-psychology'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS C802, BSc (Hons). IB standard requirements: offers in recent years ranged from 37 points with 666 at HL to 34 points with 655 at HL; the bottom of the range is stored. One of Biology, Chemistry, Computer Science, Environmental Systems and Societies, Geography, Mathematics, Physics, Psychology or Sports, Exercise and Health Science at HL 5 (ESS and SEHS added), and Mathematics (AA or AI) at SL 6 if not at HL, stored as one mixed group with HL 5. Both are required, so now critical. Was 37, the top of the range; the science group and Mathematics SL 6 were not critical. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 34 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "BSc (Hons)".
    {
      id: 'cmkcj2mi500367mhe5tdp51fn',
      status: 'current',
      name: 'Reproductive Biology BSc (Hons)',
      description:
        'Reproductive biology aims to understand the scientific principles that govern reproduction in humans and other mammals.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/384-reproductive-biology',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/384-reproductive-biology/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/384-reproductive-biology'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS C142, BSc (Hons). IB standard requirements: 34 points with 655 at HL. Biology and Chemistry at HL, one at 5 and one at 6; stored at 5 each, as the model cannot say "one of them at 6". Mathematics or Physics recommended, not stored. Mathematics (AA or AI) at SL 5 is required, so now critical: Mathematics is part of every Diploma, so the GCSE alternative the page offers applies only to English. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL. Second-year entry: 36 points with 666 at HL to include Biology and Chemistry.'
    },
    // Stored: not checked for any intake. Degree stored as "BEng (Hons)".
    {
      id: 'cmkcj2rsk00747mhe75zlb30j',
      status: 'current',
      name: 'Software Engineering BEng (Hons)',
      description:
        'The study of software engineering will allow you to write good software and give you the necessary engineering skills to meet system requirements, including: reliability, maintainability, usability, cost-effectiveness.',
      field: 'Computer Science',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://study.ed.ac.uk/programmes/undergraduate/59-software-engineering',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/59-software-engineering/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/59-software-engineering'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS G600, BEng (Hons). IB standard requirements: offers in recent years ranged from 43 points with 777 at HL to 34 points with 665 at HL; the bottom of the range is stored. Mathematics (Analysis and approaches only) at HL 6, taken no more than two years before entry. English at SL 5 (ab initio not accepted), not critical because an English language qualification also meets it; English B counts. English B added. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 32 points with 655 at HL.'
    },
    // Stored: not checked for any intake. Degree stored as "BVM&S".
    {
      id: 'cmkcj2jcm000o7mheb98d0l8i',
      status: 'current',
      name: 'Veterinary Medicine (5-year programme)',
      description:
        'This five-year Bachelor of Veterinary Medicine and Surgery (BVM&S) programme will prepare you for many aspects of the veterinary profession.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Veterinary Medicine and Surgery',
      duration: '5 years',
      minIBPoints: 38,
      programUrl:
        'https://study.ed.ac.uk/programmes/undergraduate/356-veterinary-medicine-5-year-programme',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.ed.ac.uk/undergraduate/entry-requirements/international-qualifications/international-baccalaureate',
        'https://study.ed.ac.uk/programmes/undergraduate/356-veterinary-medicine-5-year-programme/entry-requirements?country=267',
        'https://study.ed.ac.uk/programmes/undergraduate/356-veterinary-medicine-5-year-programme'
      ],
      notes:
        'Year of entry 2027 (start September 2027); UCAS D100, BVM&S. IB standard requirements: 38 points with 666 at HL. Chemistry and Biology at HL 6. English at SL 5 or GCSE English at B/6, not critical as elsewhere; English B added. All grades at the first attempt. Offers follow an interview. The HL profile cannot be held by the model. Widening access minimum (UK residents only): 36 points with 665 at HL.'
    }
  ]
}

export default refresh
