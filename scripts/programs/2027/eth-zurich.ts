import type { RefreshFile } from '../lib/refresh'

/**
 * ETH Zürich: requirements for 2027 entry.
 *
 * Exported from the database on 2026-09-30 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts eth-zurich
 */
const refresh: RefreshFile = {
  university: 'ETH Zürich',
  entryYear: 2027,
  checkedOn: '2026-09-30',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfiede8002p7m771f9vt4np',
      status: 'current',
      name: 'Bachelor Agricultural Sciences',
      description:
        'Agricultural Sciences graduates are in great demand in the global food system. They play a significant role in the search for solutions to problems such as how the growing world population can be sustainably fed without damaging soil, water and air resources, and how the raw materials for producing food and their processing quality can be continuously adapted to market requirements. Agricultural scientists occupy management positions in commerce and industry, public administration, private organisations and research.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/system-oriented-natural-sciences/agricultural-sciences.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/system-oriented-natural-sciences/agricultural-sciences.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfiehq900617m77tigfqtpz',
      status: 'current',
      name: 'Bachelor Architecture',
      description:
        'Architects use architectural resources to create, alter and preserve a structured environment to fulfil the expectations and address the conditions of both the individual and society. In the broad field of construction, their area of responsibility involves analysis, creative thought and action, and negotiation. They reflect on the needs of society and convert these into a structured environment. Architects either work independently or as employees in architectural offices. They are also employed in construction companies, administration and large businesses, and work in the fields of design, art and culture.',
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/architecture-and-civil-engineering/architecture.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/architecture-and-civil-engineering/architecture.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html',
        'https://arch.ethz.ch/en/studium/studienangebot/bachelor-architektur.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue. The degree is a Bachelor of Science ETH in Architecture (BSc ETH Arch), not a Bachelor of Arts; six months of internship are also required."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfieaca000d7m77h8wvckvz',
      status: 'current',
      name: 'Bachelor Biochemistry – Chemical Biology',
      description:
        'This curriculum provides a sound theoretical and practical training in the core subjects of chemistry, biochemistry and molecular biology. Building on a broad foundation of basic scientific knowledge in mathematics, physics and general and physical chemistry, teaching focuses on organic-chemical and biochemical reaction mechanisms, including chemical synthesis and research into the mode of action of biologically active compounds. Graduates of this course of study are sought-after specialists in biochemical research laboratories in the university environment or in the chemical, pharmaceutical, biotechnological or biomedical industry.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/biochemistry-chemicalbiology.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/biochemistry-chemicalbiology.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfie9v800017m775d6muvfw',
      status: 'current',
      name: 'Bachelor Biology',
      description:
        "The study programme for biology is a course in fundamental principles which encompasses an enormously wide range of specialist areas. After the solid grounding of the Bachelor's course, in the Master's degree programme students opt for one of nine specialisation, in which they learn about the specific methods of working and research that are applied in biology. About two thirds of all Master's graduates continue their education with a doctorate. With their broad scientific training, Biology graduates find that a wide range of careers is open to them.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/biology.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/biology.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfiearv000p7m772qioeh0p',
      status: 'current',
      name: 'Bachelor Chemistry / Chemical and Bioengineering',
      description:
        'Chemistry deals with the fascinating world of molecules. During their studies, chemists gain the knowledge and skills to research, understand and describe the properties and behaviour of molecules. They also learn the methods and strategies for producing new molecules with desired characteristics. Chemical engineers develop and implement transformation processes at an industrial level, always taking into account economic efficiency and ecological sustainability.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/bachelor-chemistry-chemical-and-bioengineering.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/bachelor-chemistry-chemical-and-bioengineering.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfiei5t006d7m775wou7nug',
      status: 'current',
      name: 'Bachelor Civil Engineering',
      description:
        'It is difficult to imagine our everyday lives without bridges, tunnels, hydroelectric power plants, road and rail networks, or residential, office and industrial buildings. Civil engineers are highly sought-after specialists who perform demanding tasks in the service of our society. While taking the environment into account, they must ensure that buildings and installations are planned functionally, built cost-effectively and can be economically operated and maintained. They work in engineering offices and construction companies; for federal, cantonal and municipal authorities; in power supply and transport companies; and in research and education.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/architecture-and-civil-engineering/civil-engineering.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/architecture-and-civil-engineering/civil-engineering.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfieb8100117m77s6nrfbqi',
      status: 'current',
      name: 'Bachelor Computational Science and Engineering',
      description:
        'Computational Science and Engineering differs from Computer Science. It also differs from traditional natural and engineering sciences, offering a third component in addition to theory and experiment. Computational Science and Engineering is interdisciplinary, application-oriented, focuses on problem-solving and is essentially based on the use of the computer. Graduates understand a problem from the scientific and technological point of view, and they have the skills necessary to perform a computer-based analysis of a problem.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/computational-science-and-engineering.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/computational-science-and-engineering.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfiegfl00517m776vviyucz',
      status: 'current',
      name: 'Bachelor Computer Science',
      description:
        "In computer science, it's all about information, or rather the scientific and technical ways of processing, storing, transmitting and presenting information and, ultimately, imparting knowledge. In addition to technical knowledge, creativity and social skills are also very important. Computer scientists are often globally active and collaborate on projects with other experts. They operate in very diverse areas of society, which include science, administration, medicine, transport, the environmental sector and finance. Thus computer science is an important mainstay of modern society.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/engineering-sciences/computer-science.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/engineering-sciences/computer-science.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfiee96003d7m77e5jy3w4r',
      status: 'current',
      name: 'Bachelor Earth and Climate Sciences',
      description:
        "Earth scientists make a vital contribution to the exploration of all parts of planet Earth. They study the Earth's materials from the atomic to the planetary scale and try to understand the evolution of the planet in the past as well as its present and future development. Their work is practice-based: searching for water, mineral resources and energy sources; predicting and controlling natural disasters; solving hydrogeological problems in major technical projects; developing long-term solutions for the disposal of all types of waste; understanding the causes and consequences of climatic and other environmental change.",
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/system-oriented-natural-sciences/earth-and-climate-sciences.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/system-oriented-natural-sciences/earth-and-climate-sciences.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfiefzg004p7m77z27vz8wx',
      status: 'current',
      name: 'Bachelor Electrical Engineering and Information Technology',
      description:
        'Many of the findings and products of electrical engineering influence the way our society functions. Most notably, they include smartphones, navigation satellites, industrial robots, imaging techniques and renewable energies. By studying Electrical Engineering and Information Technology, students will gain the theoretical foundations and practical skills they need to build a successful career in a wide range of different fields relating to information processing, electronics, energy supply and biomedical engineering.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/engineering-sciences/electrical-engineering-and-information-technology.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/engineering-sciences/electrical-engineering-and-information-technology.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfieilf006p7m77njyuto2r',
      status: 'current',
      name: 'Bachelor Environmental Engineering',
      description:
        'Environmental engineers produce well-founded technical solutions drawn from the engineering sciences in the fields of hydrology and water resources management, groundwater, environmental microfluidics, urban water management, river and hydraulic engineering, ecological systems design, earth observation for environmental applications, and industrial ecology. They work mainly in the fields of water resources management, prevention of water pollution, water supply and waste water treatment, recycling and waste disposal engineering, soil protection, and air and noise pollution control.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/architecture-and-civil-engineering/environmental-engineering.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/architecture-and-civil-engineering/environmental-engineering.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfieeow003p7m77sq029tt9',
      status: 'current',
      name: 'Bachelor Environmental Sciences',
      description:
        'Environmental scientists work in a range of professional fields, their interdisciplinary training makes them highly sought-after experts. Nowadays, environmental and planning offices, public administration, insurance providers, financial institutions and other service companies all need the expertise of highly qualified environmental specialists, as do political bodies and organisations involved in international cooperation. Environmental scientists are typically employed as project managers for environmental organisations, specialists in sustainable investment products, risk experts for dealing with natural disasters, environmental consultants for building projects, forest rangers, or research scientists.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/system-oriented-natural-sciences/environmental-sciences.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/system-oriented-natural-sciences/environmental-sciences.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfiedtn00317m77cl5otmpg',
      status: 'current',
      name: 'Bachelor Food Science and Nutrition',
      description:
        'Graduates of the study programme Food Science and Nutrition deal with processing, refining and preserving foodstuffs. Thanks to broad, interdisciplinary training in scientific and technical subjects, they are able to work in various fields. As well as being specialists in their discipline, they are able to communicate and coordinate with experts from other areas too. They work in the national and international food industry, administration, national and international organisations, commerce, the service sector and development cooperation.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/system-oriented-natural-sciences/food-science.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/system-oriented-natural-sciences/food-science.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfiej1200717m77ba4nwd8d',
      status: 'current',
      name: 'Bachelor Geospatial Engineering',
      description:
        'Geomatic engineers are specialists in recording and visualising spatial structures and changes. They use all kinds of different measuring systems, data sources and methods to digitise, analyse and visualise our habitat. Their field of activity ranges from taking measurements of the entire planet through to creating plans, maps and apps, or even applying their skills to dimensional verification in the shipbuilding and plant engineering industries. Engineers with a specialisation in spatial development and infrastructure systems deal with the sustainable development of settlements, landscapes, transport and infrastructure.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/architecture-and-civil-engineering/geospatial-engineering.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/architecture-and-civil-engineering/geospatial-engineering.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfief4300417m77ajfao9ge',
      status: 'current',
      name: 'Bachelor Health Sciences and Technology',
      description:
        'This study programme offers innovative training at the interface between the human being, health and technology. Graduates will be able to build bridges between engineers and doctors/therapists and between the macro and micro worlds. They work as experts in the biomedical, medical technology and pharmaceutical sectors, in research, development, production and marketing, as well as in health policy, administration and insurance. Other career options can be found in medical research and consultancy.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/system-oriented-natural-sciences/health-sciences-and-technology.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/system-oriented-natural-sciences/health-sciences-and-technology.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfiefjq004d7m77skl1bial',
      status: 'current',
      name: 'Bachelor Human Medicine',
      description:
        "The path via ETH Zurich (for the Bachelor's degree) and one of its partner universities (for the Master's degree) lays the foundations for an education in human medicine that will go on to open up opportunities for exchange with the world of science and pave the way towards new developments and technologies. Tackling methods used in the world today, for instance in the areas of personalised medicine and medical engineering, provides a greater understanding of the opportunities and limitations of future treatment methods. The programme admits only Swiss citizens and residents (a Swiss passport or Swiss settlement permit).",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/system-oriented-natural-sciences/human-medicine.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/system-oriented-natural-sciences/human-medicine.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html',
        'https://www.swissuniversities.ch/service/anmeldung-zum-medizinstudium/zulassungsverfahren-mit-numerus-clausus'
      ],
      notes:
        'ETH\'s country list (Academic Year 2026/27) and swissuniversities\' IB list (2026/27) give ETH\'s IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: "three of"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue. The programme page: the degree is a Bachelor of Science ETH in Medicine (stored as Bachelor of Medicine), and the programme is "only open for students with a Swiss passport or Swiss settlement permit". Applications go through swissuniversities, with the aptitude test for medical studies. The description says so at the owner\'s request (content 4.7).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfiebnn001d7m77623spx1h',
      status: 'current',
      name: 'Bachelor Interdisciplinary Sciences',
      description:
        'This programme provides interdisciplinary knowledge in different sciences and mathematics. It is mainly suited to students with a broad range of interests. Features of the programme are great freedom in selecting subjects and the fact that all lectures are attended together with the students of the particular course unit discipline. The programme is very demanding, but opens up the way to a host of activities in research, teaching, industry, business and public services.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/interdisciplinary-sciences.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/interdisciplinary-sciences.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfieham005p7m77dhsn9n4r',
      status: 'current',
      name: 'Bachelor Materials Science',
      description:
        'Research, development, production, testing and life cycle analysis of high-performance materials are some of the areas in which materials scientists are active. They build a bridge between the microstructure and composition of materials on the one hand, and the macroscopic properties of the products made from the materials on the other. This requires a thorough scientific education as well as an understanding of issues relating to process engineering, economics and ecology. A willingness to collaborate on an interdisciplinary level with experts from all these fields is essential.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/engineering-sciences/materials-science.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/engineering-sciences/materials-science.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfiec33001p7m777db0jwkj',
      status: 'current',
      name: 'Bachelor Mathematics',
      description:
        'The principal aim of a degree in Mathematics is a broad education in the fundamentals of mathematics that allows graduates to independently acquire further knowledge for their future professional work. Mathematicians work in many different fields. They conduct research and teach at universities, universities of applied sciences and secondary schools. They work for insurance companies and, increasingly, in banks, industry, software development, planning and business optimisation, or as statisticians in the public sector.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/mathematics.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/mathematics.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfiegv3005d7m77xxo5vlst',
      status: 'current',
      name: 'Bachelor Mechanical Engineering',
      description:
        'Mechanical engineers develop many varied products, ranging from tiny microsensors for medical technology and highly efficient energy plants to applications for automotive and aviation engineering. They use computers to design new machine tools or construct wheelchairs that can climb stairs. In the process engineering field, they control industrial, biotechnical or chemical processes. They also assume management tasks in companies, work as quality or risk assessment experts in the service industry, draw up production forecasts, and work in the field of strategic consultancy.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/engineering-sciences/mechanical-engineering.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/engineering-sciences/mechanical-engineering.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfieciq00217m77dsw79tqw',
      status: 'current',
      name: 'Bachelor Pharmaceutical Sciences',
      description:
        'Pharmacists acquire fundamental knowledge about drugs. They are specialists in this field and work in a very diverse range of areas for the benefit of society. They perform research on new therapeutic and diagnostic approaches in industry, address pharmaceutical questions in complex health-related and sociopolitical contexts, work in consulting and knowledge transfer, hold positions in the public sector or manage public or hospital pharmacies.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/pharmaceutical-sciences.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/pharmaceutical-sciences.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfiecyk002d7m77l3pzzsj9',
      status: 'current',
      name: 'Bachelor Physics',
      description:
        "The Bachelor's degree programme in physics builds upon a robust basic knowledge of mathematics and fosters abstract thinking as well as analytical and problem-solving skills. It provides solid foundations that allow physics graduates to acquire further knowledge independently in their chosen profession. Physics graduates may be found carrying out scientific research in state-owned or industrial laboratories, but their broad skillset and their versatility are highly valued in many other professional roles.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/physics.html',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        {
          courses: [
            'ENG-LIT',
            'ENG-LL',
            'FRA-LIT',
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'MAN-LIT-A',
            'MAN-LL',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://ethz.ch/en/studies/bachelor/bachelors-degree-programmes/natural-sciences-and-mathematics/physics.html',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://ethz.ch/content/dam/ethz/main/education/admission/bachelor/andere-qual/ETH-ZulassungsbedingungenHS2026_EN.pdf',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/admission-prerequisites.html',
        'https://ethz.ch/en/studies/bachelor/application/non-swiss-matriculation-certificate/language-requirements.html'
      ],
      notes:
        "ETH's country list (Academic Year 2026/27) and swissuniversities' IB list (2026/27) give ETH's IB rule for admission without an entrance examination: 38 out of 42 points without bonus points (stored as published, out of 42); at HL Maths AA or AI, one of Physics, Chemistry or Biology, and one Language A; at SL three more from Physics, Chemistry, Biology, Geography, History, Economics or Business Management, one further language and Computer Science (not modelled: \"three of\"). Otherwise the reduced ETH entrance examination. No subject grade is named, so 4 (the stored 5s had no source); the HL science and the HL Language A are now required. ETH plans new entry requirements from autumn 2028 and says they do not affect autumn 2027, but nothing it publishes names 2027 entry, so stamped 2026. Teaching is in German: a German C1 certificate by 31 March, which the IB does not replace unless German is the mother tongue."
    }
  ]
}

export default refresh
