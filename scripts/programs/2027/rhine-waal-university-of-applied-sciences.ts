import type { RefreshFile } from '../lib/refresh'
import type { RequirementDef } from '../lib/requirements-diff'

/**
 * Rhine-Waal University of Applied Sciences: its 16 English-taught bachelor's programs, added for content task 7,
 * Part B2 (Germany), and created, with the university, on 2026-10-12. The owner chose the university on 12 October
 * 2026 (docs/tasks/content-2027/germany-model-decision.md, decision 6). Its German-taught programs are left out.
 *
 * Under the German model: 24 points, the KMK rows, and maths HL on maths, science and technical programs (the KMK's
 * maths rule applies at universities of applied sciences too). Seven programs restrict admission through
 * hochschulstart's DoSV, and HSRW publishes no cut-off, so they get no figure. The university's seat is Kleve; programs
 * taught at Kamp-Lintfort carry that campus city. Stamped 2026: the program pages name no intake.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts rhine-waal-university-of-applied-sciences
 */

/** Read on 12 October 2026, after each program's own page. */
const BACHELORS =
  'https://www.hochschule-rhein-waal.de/en/study/before-starting-university/application-process/bachelors-degrees'
const INTERNATIONAL =
  'https://www.hochschule-rhein-waal.de/en/study/before-starting-university/application-process/guide-for-international-applicants'
const KMK_AGREEMENT =
  'https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/aktuell/283_Vereinb_Anerkenn_Int_Baccalaureate_Diploma-2023-06-15_Liste1__2026-03-26_Liste2-2026-05-22.pdf'
/** The Bavarian recognition office's IB sheet (March 2026), which names the subjects that need maths at HL. */
const ZAST =
  'https://cms-cdn.lmu.de/media/lmu/downloads/studium/internationale-studierende/merkblatt-ib.pdf'

const NOTES =
  "Content 7 (Part B2, 12 October 2026): German model (a), owner, 12 October 2026. minIBPoints 24: the KMK's IB agreement (as amended 15 June 2023) recognises the Diploma with a 4 or better in all six subjects. Rows: a KMK science and a KMK social science (critical); maths AA or AI at HL on maths, science and technical programs. Not modelled: the HL rule, the grade-3 offset, the language pair, and the schools whose maths SL counts as HL. International applicants apply through uni-assist; English at B2, no German. Seven semesters (3.5 years). Stamped 2026: no intake named."

/** KMK 1a: Biology, Chemistry or Physics. */
const KMK_SCIENCE: RequirementDef = {
  courses: ['BIO', 'CHEM', 'PHYS'],
  level: 'SL',
  grade: 4,
  critical: true
}
/** KMK 1a: the agreement's eight social sciences. */
const KMK_SOCIAL_SCIENCE: RequirementDef = {
  courses: ['HIST', 'GEOG', 'ECON', 'PSYCH', 'PHIL', 'ANTHRO', 'BUS-MGMT', 'GLOB-POL'],
  level: 'SL',
  grade: 4,
  critical: true
}
/** KMK footnote 3: maths at SL opens only subjects outside maths, science and engineering. */
const MATHS_HL: RequirementDef = {
  courses: ['MATH-AA', 'MATH-AI'],
  level: 'HL',
  grade: 4,
  critical: true
}

const refresh: RefreshFile = {
  university: 'Rhine-Waal University of Applied Sciences',
  entryYear: 2027,
  checkedOn: '2026-10-12',
  programs: [
    {
      status: 'new',
      name: 'Agribusiness',
      description:
        'Would you like to study agribusiness and play an active role in shaping the future of the agricultural sector? The agricultural sector is booming, but global competition, increasing resource scarcity and rising consumer expectations are posing major challenges for farms. That is why companies urgently need specialists who are well-versed in current issues relating to the agricultural and food industry, rural development, sustainability management and agricultural policy. On the Agribusiness (B.A.) degree programme, you will acquire precisely this business expertise and key management skills, with a clear focus on the agricultural and food industry. You will learn how companies can successfully compete in the market in the face of growing quality demands on food and the increasing importance of logistics.\n\nHow HSRW decides: open admission. Every applicant whose qualification is recognised is admitted, with no numerus clausus. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3.5 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://www.hochschule-rhein-waal.de/en/agribusiness-ba',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/agribusiness-ba',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        ' No maths HL: a subject outside maths, science and engineering in the Bavarian recognition office\'s list (ZASt, March 2026). Unrestricted admission ("no Numerus Clausus"). Field by content: the rule names no discipline in "Agribusiness", the business of the agricultural and food industry.'
    },
    {
      status: 'new',
      name: 'Bioengineering',
      description:
        "Are you interested in studying bioengineering and fascinated by the exciting intersection of the natural sciences and engineering ? Biotechnology is present in countless aspects of our daily lives – from traditional products such as cheese, wine and bread to innovative detergents, cosmetics, biofuels and medicines. Those wishing to study bioengineering learn to understand precisely these biological processes and to apply them to the development of modern, forward-looking products. Our English-taught Bachelor’s programme at the Kleve campus offers a strongly science-oriented education. From the very start, the programme closely integrates biological and chemical subjects with technical disciplines. You will gain an understanding of all areas of what is known as ‘biotechnological colour theory ’: medical (red), agricultural (green) and industrial (white) biotechnology . As your studies progress, you will also have the opportunity to pursue individual areas of interest and specialise, for example, in plant biotechnology or industrial biotechnology. If you decide to study Bioengineering at Rhine-Waal University of Applied Sciences, you will benefit from intensive support in small study groups and the excellent facilities in our modern laboratories . With English as the language of instruction and fellow students from more than 60 countries, you will also be perfectly prepared for a career in an international environment from day one.\n\nHow HSRW decides: places are limited and, when there are more applicants than places, allocated under the rules of North Rhine-Westphalia, often by your final grade, through hochschulstart's Dialogue-Oriented Service Procedure. HSRW publishes no cut-off. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3.5 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://www.hochschule-rhein-waal.de/en/bioengineering-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/bioengineering-bsc',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        " Maths HL: a natural science or technical subject; the KMK applies the maths rule at universities of applied sciences too. Restricted admission, allocated through hochschulstart's DoSV (HSRW's bachelor's application page); no cut-off published."
    },
    {
      status: 'new',
      name: 'Engineering',
      description:
        'The Bachelor’s degree programme in Engineering gives you the opportunity to develop high-tech solutions and shape the technologies of the future. Whether it’s robotics, electronics or information and communication technology, or a combination with a focus on economics leading to a degree in Business Engineering – with us, you’ll find the specialisation that suits your interests!\n\nHow HSRW decides: open admission. Every applicant whose qualification is recognised is admitted, with no numerus clausus. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3.5 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://www.hochschule-rhein-waal.de/en/engineering-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/engineering-bsc',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        ' Maths HL: a natural science or technical subject; the KMK applies the maths rule at universities of applied sciences too. Unrestricted admission ("no Numerus Clausus").'
    },
    {
      status: 'new',
      name: 'Engineering for Sustainability',
      description:
        "Would you like to combine technology with environmental awareness? Would you like to work on projects in laboratories right from your first semester? Can you do without traditional lectures and seminars? Then you’ve come to the right place! This degree programme will prepare you for careers in sustainable product development, environmental technologies or international projects. It is aimed at anyone who wants to approach engineering in a holistic and forward-looking way.\n\nHow HSRW decides: places are limited and, when there are more applicants than places, allocated under the rules of North Rhine-Westphalia, often by your final grade, through hochschulstart's Dialogue-Oriented Service Procedure. HSRW publishes no cut-off. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3.5 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://www.hochschule-rhein-waal.de/en/engineering-for-sustainability-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/engineering-for-sustainability-bsc',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        " Maths HL: a natural science or technical subject; the KMK applies the maths rule at universities of applied sciences too. Restricted admission, allocated through hochschulstart's DoSV (HSRW's bachelor's application page); no cut-off published."
    },
    {
      status: 'new',
      name: 'Environment and Energy',
      description:
        'Do you want to help protect the environment? Are you fascinated by the natural sciences? Then consider a degree in Environment and Energy. In this degree programme you’ll study and do research in a deeply interdisciplinary environment that weaves together environmental sciences, energy technology, economics and more. Against this backdrop, the focus of your studies will be on renewable energy, sustainability and effective environmental protection measures. With a Bachelor of Science in Environment and Energy you’re qualified to work for environmental protection and monitoring organisations, in industry and in the renewable energy sector.\n\nHow HSRW decides: open admission. Every applicant whose qualification is recognised is admitted, with no numerus clausus. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3.5 years',
      campusCity: 'Kamp-Lintfort',
      minIBPoints: 24,
      programUrl: 'https://www.hochschule-rhein-waal.de/en/environment-and-energy-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/environment-and-energy-bsc',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        ' Maths HL: a natural science or technical subject; the KMK applies the maths rule at universities of applied sciences too. Unrestricted admission ("no Numerus Clausus"). Campus: Kamp-Lintfort (program page).'
    },
    {
      status: 'new',
      name: 'Gender and Diversity',
      description:
        'Study alongside like-minded people who share your enthusiasm for diversity, and play an active role in shaping society. With its interdisciplinary and international focus, our degree opens up a wide range of career and academic opportunities for you.\n\nHow HSRW decides: open admission. Every applicant whose qualification is recognised is admitted, with no numerus clausus. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3.5 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://www.hochschule-rhein-waal.de/en/gender-and-diversity-ba',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/gender-and-diversity-ba',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        ' No maths HL: a subject outside maths, science and engineering in the Bavarian recognition office\'s list (ZASt, March 2026). Unrestricted admission ("no Numerus Clausus"). Field by content: the rule names no discipline in "Gender and Diversity", a social science program.'
    },
    {
      status: 'new',
      name: 'Information and Communication Design',
      description:
        'Do you love developing ideas and making them come alive? Then Information and Communication Design is the right choice for you. Here you’ll study not only fundamental visualisation techniques such as illustration and photography, but also advanced subjects like interaction design, editorial design and identity design. Our greatest passions are the new and the visionary. During your studies, you’ll be tasked with numerous personal design projects, each one an opportunity to take your ideas from the drawing board to reality using your growing skills and knowhow. This type of approach provides the perfect preparation for a later career in the design world, whether at an agency or as an independent designer.\n\nHow HSRW decides: open admission. Every applicant whose qualification is recognised is admitted, with no numerus clausus. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.',
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '3.5 years',
      campusCity: 'Kamp-Lintfort',
      minIBPoints: 24,
      programUrl: 'https://www.hochschule-rhein-waal.de/en/information-and-communication-design-ba',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/information-and-communication-design-ba',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        ' No maths HL: a subject outside maths, science and engineering in the Bavarian recognition office\'s list (ZASt, March 2026). Unrestricted admission ("no Numerus Clausus"). Campus: Kamp-Lintfort (program page).'
    },
    {
      status: 'new',
      name: 'Infotronic Systems Engineering',
      description:
        "If you’re interested in the cutting edge and enjoy solving complex puzzles involving technology, then Infotronic (= informatics + electronics) Systems Engineering is for you. Here you’ll cut your teeth on a wide range of data collection systems and their uses, studying computer science, data processing, electrical technology and signal processing technology along the way. At the end of this challenging path stands an engineer who can effectively plan and build complex, interconnected systems.\n\nHow HSRW decides: places are limited and, when there are more applicants than places, allocated under the rules of North Rhine-Westphalia, often by your final grade, through hochschulstart's Dialogue-Oriented Service Procedure. HSRW publishes no cut-off. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3.5 years',
      campusCity: 'Kamp-Lintfort',
      minIBPoints: 24,
      programUrl: 'https://www.hochschule-rhein-waal.de/en/infotronic-systems-engineering-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/infotronic-systems-engineering-bsc',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        " Maths HL: a natural science or technical subject; the KMK applies the maths rule at universities of applied sciences too. Restricted admission, allocated through hochschulstart's DoSV (HSRW's bachelor's application page); no cut-off published. Campus: Kamp-Lintfort (program page)."
    },
    {
      status: 'new',
      name: 'International Business Administration',
      description:
        "Are you interested in global economics and international issues? Do you want to study in English and have a knack for analytical thinking and problem solving? Then study International Business Administration! In this degree programme you’ll learn how to navigate incredibly complex national and international markets and lead companies to economic success.\n\nHow HSRW decides: places are limited and, when there are more applicants than places, allocated under the rules of North Rhine-Westphalia, often by your final grade, through hochschulstart's Dialogue-Oriented Service Procedure. HSRW publishes no cut-off. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.",
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3.5 years',
      campusCity: 'Kamp-Lintfort',
      minIBPoints: 24,
      programUrl:
        'https://www.hochschule-rhein-waal.de/en/international-business-administration-ba',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/international-business-administration-ba',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        " No maths HL: a subject outside maths, science and engineering in the Bavarian recognition office's list (ZASt, March 2026). Restricted admission, allocated through hochschulstart's DoSV (HSRW's bachelor's application page); no cut-off published. Campus: Kamp-Lintfort (program page)."
    },
    {
      status: 'new',
      name: 'International Business and Management',
      description:
        "On the International Business and Management degree programme, we foster methodological, social and future-oriented skills (e.g. data literacy, critical thinking) and develop our students into generalists who can respond flexibly to changing market demands.\n\nHow HSRW decides: places are limited and, when there are more applicants than places, allocated under the rules of North Rhine-Westphalia, often by your final grade, through hochschulstart's Dialogue-Oriented Service Procedure. HSRW publishes no cut-off. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.",
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3.5 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl:
        'https://www.hochschule-rhein-waal.de/en/international-business-and-management-ba',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/international-business-and-management-ba',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        " No maths HL: a subject outside maths, science and engineering in the Bavarian recognition office's list (ZASt, March 2026). Restricted admission, allocated through hochschulstart's DoSV (HSRW's bachelor's application page); no cut-off published."
    },
    {
      status: 'new',
      name: 'International Relations',
      description:
        "With us, you’ll study politics, economics and law in an international context. Seize this opportunity: start your English-taught Bachelor’s degree in International Relations, kick-start your international career and play an active role in shaping the future.\n\nHow HSRW decides: places are limited and, when there are more applicants than places, allocated under the rules of North Rhine-Westphalia, often by your final grade, through hochschulstart's Dialogue-Oriented Service Procedure. HSRW publishes no cut-off. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.",
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3.5 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://www.hochschule-rhein-waal.de/en/international-relations-ba',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/international-relations-ba',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        " No maths HL: a subject outside maths, science and engineering in the Bavarian recognition office's list (ZASt, March 2026). Restricted admission, allocated through hochschulstart's DoSV (HSRW's bachelor's application page); no cut-off published."
    },
    {
      status: 'new',
      name: 'International Taxation and Law',
      description:
        'The International Taxation and Law degree programme aims to provide students with the best possible preparation for future developments through practice-oriented teaching and close collaboration with tax and other professional advisers in the SME sector, as well as with the ‘Big Four’ firms both in Germany and abroad.\n\nHow HSRW decides: open admission. Every applicant whose qualification is recognised is admitted, with no numerus clausus. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.',
      field: 'Law',
      degree: 'Bachelor of Arts',
      duration: '3.5 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://www.hochschule-rhein-waal.de/en/international-taxation-and-law-ba',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/international-taxation-and-law-ba',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        ' No maths HL: a subject outside maths, science and engineering in the Bavarian recognition office\'s list (ZASt, March 2026). Unrestricted admission ("no Numerus Clausus").'
    },
    {
      status: 'new',
      name: 'Mobility and Logistics',
      description:
        "Are you the kind of person who wants to move not just the little things around, but the big things, too? Then study Mobility and Logistics. Learn how to improve the transport of freight and people and explore innovative ways to enhance production and distribution processes! Imagine using the latest, sustainable technologies to make travel easier and more comfortable or manufacturing and transportation processes more robust and resilient. We’ll teach you how to plan and manage modern logistics systems, supply chains, and transportation effectively so that, as a graduate, you can not only help ensure regional logistics centres thrive in the future, but also contribute to solving thrilling and complex logistical puzzles of global importance.\n\nHow HSRW decides: places are limited and, when there are more applicants than places, allocated under the rules of North Rhine-Westphalia, often by your final grade, through hochschulstart's Dialogue-Oriented Service Procedure. HSRW publishes no cut-off. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3.5 years',
      campusCity: 'Kamp-Lintfort',
      minIBPoints: 24,
      programUrl: 'https://www.hochschule-rhein-waal.de/en/mobility-and-logistics-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/mobility-and-logistics-bsc',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        " Maths HL: a natural science or technical subject; the KMK applies the maths rule at universities of applied sciences too. Restricted admission, allocated through hochschulstart's DoSV (HSRW's bachelor's application page); no cut-off published. Campus: Kamp-Lintfort (program page). Field by content, for the owner: the rule names no discipline in \"Mobility and Logistics\", which plans and manages transport and production systems with sustainable technologies; filed under Engineering, with maths HL as a technical subject."
    },
    {
      status: 'new',
      name: 'Nature-Inspired Materials',
      description:
        'Are you interested in the natural sciences and keen to develop sustainable materials or find innovative solutions for recycling? On the Nature-Inspired Materials degree programme, you’ll study in state-of-the-art laboratories and, after gaining a broad foundation in the subject, you can specialise in one of three exciting areas: Biomaterials specialisation: Focus on the interfaces between materials and biological systems, bio-derived materials and nature-inspired innovations. Material Technology specialisation: Focus on the technical development and production of new materials.\n\nHow HSRW decides: open admission. Every applicant whose qualification is recognised is admitted, with no numerus clausus. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3.5 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://www.hochschule-rhein-waal.de/en/nature-inspired-materials-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/nature-inspired-materials-bsc',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        ' Maths HL: a natural science or technical subject; the KMK applies the maths rule at universities of applied sciences too. Unrestricted admission ("no Numerus Clausus"). Field by content: the rule names no discipline in "Nature-Inspired Materials", which "combines chemistry, materials science and biology with engineering".'
    },
    {
      status: 'new',
      name: 'Sustainable Agriculture',
      description:
        'How can the agricultural sector successfully transition to sustainable farming? If you wish to study Sustainable Agriculture , you will be addressing precisely this pressing issue for the future. Global competition, increasing resource scarcity and climate change pose immense challenges to traditional agricultural production systems worldwide. Our English-taught Bachelor’s programme in Sustainable Agriculture (B.Sc.) at the Kleve campus focuses on the ecological design of agricultural and horticultural production. This wide-ranging programme combines subjects from the natural, economic and social sciences with technical disciplines such as precision farming and urban farming. If you decide to study Sustainable Agriculture at Rhine-Waal University of Applied Sciences, you will benefit from interdisciplinary projects, practical field trips and a strong international focus. This will provide you with the best possible preparation for developing solutions and optimisation concepts for the global agricultural economy of tomorrow.\n\nHow HSRW decides: open admission. Every applicant whose qualification is recognised is admitted, with no numerus clausus. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3.5 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://www.hochschule-rhein-waal.de/en/sustainable-agriculture-bsc',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/sustainable-agriculture-bsc',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        ' Maths HL: a natural science or technical subject; the KMK applies the maths rule at universities of applied sciences too. Unrestricted admission ("no Numerus Clausus"). Maths HL as for TUM\'s agricultural sciences (owner, 12 October 2026).'
    },
    {
      status: 'new',
      name: 'Sustainable Tourism',
      description:
        'The Sustainable Tourism degree programme will equip you to become a change agent in the tourism sector and provide you with in-depth knowledge in the fields of tourism, sustainable development, economics, sociology and ecology\n\nHow HSRW decides: open admission. Every applicant whose qualification is recognised is admitted, with no numerus clausus. Teaching is in English (B2), with no German required. International applicants apply through uni-assist by 15 July.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3.5 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://www.hochschule-rhein-waal.de/en/sustainable-tourism-ba',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.hochschule-rhein-waal.de/en/sustainable-tourism-ba',
        BACHELORS,
        INTERNATIONAL,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        ' No maths HL: a subject outside maths, science and engineering in the Bavarian recognition office\'s list (ZASt, March 2026). Unrestricted admission ("no Numerus Clausus").'
    }
  ]
}

export default refresh
