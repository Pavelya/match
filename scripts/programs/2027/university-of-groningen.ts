import type { RefreshFile } from '../lib/refresh'

/**
 * University of Groningen: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-groningen
 */
const refresh: RefreshFile = {
  university: 'University of Groningen',
  entryYear: 2027,
  checkedOn: '2026-09-29',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qldfi00017mflxcvmic0c',
      status: 'current',
      name: 'American Studies',
      description:
        "At American Studies you learn everything about the popular culture, politics, history, literature, economics, racial relations and religions of the United States. You also study the connections between North, Central and South America and the rest of the world. American Studies is not purely focused on 'America'. Due to the international character and inter-American perspective, this programme prepares you for an international career. The entire programme is taught in English by an international team of top lecturers who introduce you to various academic disciplines.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/american-studies/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/american-studies/'
      ],
      notes:
        'Content 4.6: BA American Studies (Croho 50623, Faculty of Arts). The IB page lists it under the Faculty of Arts programmes with "none". Checked, none required. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlhut001l7mflb5ccaqbl',
      status: 'current',
      name: 'Applied Mathematics',
      description:
        "How do we model the movement of self-driving cars? What does mathematics tell us about blood flow, air resistance or satellite orbits? And how can we use equations to simulate real systems in engineering, biology or physics? If you want to use abstract mathematics to tackle real challenges, the international Bachelor's programme Applied Mathematics at the University of Groningen will prepare you with the skills to make a difference in science and technology.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/applied-mathematics/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/applied-mathematics/'
      ],
      notes:
        'Content 4.6: BSc Applied Mathematics (Croho 56965). The IB page asks for "Mathematics: Analysis and Approaches HL"; the programme page says "Sufficient background knowledge in Mathematics is required". Stored as Maths AA HL 4, critical (the stored grade 5 had no source). Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027. Stored before: Maths AA HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qli5i001p7mfllhafj068',
      status: 'current',
      name: 'Applied Physics',
      description:
        "How can physics help in designing innovative technical solutions? How can you apply scientific knowledge to develop new materials and technologies? If you are curious about applying fundamental science to practical challenges, then the Bachelor's programme Applied Physics at the University of Groningen might be for you.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/applied-physics/',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/applied-physics/'
      ],
      notes:
        'Content 4.6: BSc Applied Physics (Croho 56962). The IB page asks for "Mathematics: Analysis and Approaches HL" and "Physics HL"; both stored at 4, critical (the stored grade 5 had no source). Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027. Stored before: Maths AA HL 5 (critical); Physics HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qldos00037mfl5fxqe3p7',
      status: 'current',
      name: 'Art History',
      description:
        'Are you fascinated by artworks, architecture or cultural landscapes from past and present? Are you curious about the meaning, history and function of visual culture? Then Art History at the University of Groningen is the right choice for you.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/art-history/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/art-history/'
      ],
      notes:
        'Content 4.6: BA Art History (Croho 56824, Faculty of Arts). The IB page lists it with "none". Checked, none required. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlihx001v7mflvgfl39ik',
      status: 'current',
      name: 'Artificial Intelligence',
      description:
        "How do you develop a self-driving car? How do you teach a computer to recognize speech or emotions? How do we design intelligent systems that connect with human thinking? These are important questions you will investigate in the Bachelor's programme Artificial Intelligence at the University of Groningen. Topics include machine learning, robotics, hybrid intelligence, language and AI, and computational neuroscience.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/artificial-intelligence/',
      requirements: [
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
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/artificial-intelligence/'
      ],
      notes:
        'Content 4.6: BSc Artificial Intelligence (Croho 56981). The IB page asks for "Mathematics: Analysis and Approaches SL/HL or Mathematics: Application and Interpretation HL": stored as Maths AA SL 4 or Maths AI HL 4, one critical group (AA HL also meets the SL rule). Maths AI SL is not accepted, and HL was not required for AA. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027. Stored before: Maths AA or Maths AI HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qldy600057mflqlnr1en3',
      status: 'current',
      name: 'Arts, Culture and Media',
      description:
        'Study Film, Music or Theatre at Arts, Culture and Media and gain a broad spectrum of perspectives to understand the cultural role of arts and media in society. Explore cultural production, representation, and audience reception from historical, aesthetic, sociological and economic viewpoints.',
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/arts-culture-and-media/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/arts-culture-and-media/'
      ],
      notes:
        'Content 4.6: BA Arts, Culture and Media (Croho 50629, Faculty of Arts). The IB page lists it with "none". Checked, none required. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qliuh00217mfly409d0fy',
      status: 'current',
      name: 'Astronomy',
      description:
        "How old is the universe? How do galaxies form and evolve? What exists between the stars? If you are curious about the origin and structure of the universe, then the Bachelor's programme Astronomy at the University of Groningen might be for you.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/astronomy/',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/astronomy/'
      ],
      notes:
        'Content 4.6: BSc Astronomy (Croho 50205). The IB page asks for "Mathematics: Analysis and Approaches HL" and "Physics HL"; both stored at 4, critical (the stored grade 5 had no source). Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027. Stored before: Maths AA HL 5 (critical); Physics HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlj7700277mfl4rlpfuib',
      status: 'current',
      name: 'Biology',
      description:
        "Do you want to understand how climate change affects marine life? Are you curious about the causes of diseases like cancer, or what happens in the brain during sleep? Do you see yourself collaborating with other scientists to help solve the world's biggest biological challenges? Then Biology at the University of Groningen is the right choice for you. Note: All four subject requirements (Math, Biology, Chemistry, Physics) must be met.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/biology/',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 4, critical: true },
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
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/biology/'
      ],
      notes:
        'Content 4.6: BSc Biology (Croho 56860). The IB page asks for Biology HL, and Physics, Chemistry and Mathematics ("Analysis and approaches SL/HL or Applications and interpretation HL"), "At least 1 of the required courses at HL, the other(s) at SL"; all four "have to be met". Stored: Biology HL 4, Chemistry SL 4, Physics SL 4 and Maths AA SL 4 or AI HL 4, all critical. The model cannot hold "one of Physics, Chemistry and Maths at HL". Chemistry is no longer required at HL. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027. Stored before: Biology HL 5 (critical); Chemistry HL 5 (critical); Maths AA or Maths AI SL 4 (critical); Physics SL 4 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qljox002j7mflms1qsvfn',
      status: 'current',
      name: 'Biomedical Engineering',
      description:
        'Do you want to improve healthcare with innovative technologies? Are you curious about designing artificial organs, analyzing medical images or developing smarter prostheses? Do you see yourself working in multidisciplinary teams to come up with solutions that help people live longer and healthier lives? Then Biomedical Engineering at the University of Groningen might be for you.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/biomedical-engineering/',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/biomedical-engineering/'
      ],
      notes:
        'Content 4.6: BSc Biomedical Engineering (Croho 56226). The IB page asks for "Mathematics: Analysis and Approaches HL", Physics and Chemistry, "At least one of these two courses at HL, the other at SL"; Biology is "not mandatory but highly recommended" and is not stored. Stored: Maths AA HL 4, Physics SL 4 and Chemistry SL 4, all critical; the model cannot hold "one of Physics and Chemistry at HL". Maths AI HL is no longer accepted. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027. Stored before: Maths AA or Maths AI HL 5 (critical); Chemistry SL 4 (critical); Physics SL 4 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlk4v002t7mflz3yxscbe',
      status: 'current',
      name: 'Chemical Engineering',
      description:
        'How can we produce sustainable materials on a large scale? Can we convert CO₂ into valuable products? How do we make factories safer, cleaner and more efficient? If you get excited about the combination of chemistry, technology and innovation, then Chemical Engineering at the University of Groningen is the programme for you.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/chemical-engineering/',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/chemical-engineering/'
      ],
      notes:
        'Content 4.6: BSc Chemical Engineering (Croho 56960). The IB page asks for "Mathematics: Analysis and Approaches HL", Physics and Chemistry, "At least one of these two courses at HL, the other at SL". Stored: Maths AA HL 4, Physics SL 4 and Chemistry SL 4, all critical; the model cannot hold "one of Physics and Chemistry at HL", so Chemistry is no longer stored at HL. Maths AI HL is no longer accepted. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027. Stored before: Chemistry HL 5 (critical); Maths AA or Maths AI HL 5 (critical); Physics SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlklj00337mflcfbb42rs',
      status: 'current',
      name: 'Chemistry',
      description:
        "How can molecules help solve today's biggest challenges? Can we design smart materials for medicine, energy or the environment? Do you want to turn molecular insights into practical innovations? Read on to discover if the Bachelor's programme Chemistry at the University of Groningen is for you.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/chemistry/',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/chemistry/'
      ],
      notes:
        'Content 4.6: BSc Chemistry (Croho 56857). The IB page asks for "Mathematics: Analysis and Approaches HL", Physics and Chemistry, "At least one of these two courses at HL, the other at SL". Stored: Maths AA HL 4, Physics SL 4 and Chemistry SL 4, all critical; the model cannot hold "one of Physics and Chemistry at HL", so Chemistry is no longer stored at HL. Maths AI HL is no longer accepted. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027. Stored before: Chemistry HL 5 (critical); Maths AA or Maths AI HL 5 (critical); Physics SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qle6y00077mflopnzbzq9',
      status: 'current',
      name: 'Communication and Information Studies',
      description:
        'In Communication and Information Studies (CIS) you learn to recognize where communication succeeds or fails, design and implement interventions for improving communication, and measure the success of these interventions. CIS focuses on communication from a language perspective in the broadest sense: text, spoken language, gestures, images, digital media and, more recently, generative artificial intelligence.',
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/communication-and-information-studies/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/communication-and-information-studies/'
      ],
      notes:
        'Content 4.6: BA Communication and Information Studies (Croho 56826, Faculty of Arts). The IB page lists it with "none" (only the Dutch-taught Information Science asks for Mathematics). Checked, none required. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qll1x003d7mflq9d2dt7z',
      status: 'current',
      name: 'Computing Science',
      description:
        "How do you design secure mobile apps? Can you teach a computer to find the fastest route through a city? How can software help create detailed 3D medical images from MRI scans? If you like solving problems and want to work at the forefront of digital innovation, then the Bachelor's programme Computing Science at the University of Groningen is the programme for you.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/computing-science/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/computing-science/'
      ],
      notes:
        'Content 4.6: BSc Computing Science (Croho 56978). The IB page asks for "Mathematics: Analysis and Approaches HL": stored as Maths AA HL 4, critical. Maths AI HL is no longer accepted. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027. Stored before: Maths AA or Maths AI HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlnxs004l7mflkrdrpd8d',
      status: 'current',
      name: 'Data Science and Society',
      description:
        'Is data the new gold? Can facial recognition lead to unfair choices? Does your running session with Strava affect our infrastructure? Learn about more than just technology and data, but also what it means for the world around us. Make a difference in the world of tomorrow with your future-proof data skills! In this future-oriented bachelor you learn the social and ethical sides of data and develop technical skills to analyze and apply data.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/data-science-society/',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/data-science-society/',
        'https://www.rug.nl/cf/studeren-bij-cf/programmas/bsc-data-science-society-admissions-requirements'
      ],
      notes:
        'Content 4.6: BSc Data Science and Society (Croho 50982, Campus Fryslân, Leeuwarden; February and September starts). Its admissions page: a mathematics requirement at VWO Wiskunde A or B, for the IB "Mathematics: Applications & Interpretation SL or HL or Mathematics: Analysis & Approaches SL or HL with a passing grade". The stored Maths AA or AI SL 4 (critical) already matched; 4 is stored for "a passing grade". The university IB page does not list this programme. Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. The programme page gives deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlfy7000l7mflf9pou8tj',
      status: 'current',
      name: 'Econometrics and Operations Research',
      description:
        'Study econometrics and operations research in Groningen to learn how to use mathematical modelling to find solutions to real-life problems in our society. Combine mathematical modelling with real-world data on important topics such as climate change, welfare, and well-being. Our courses are designed to make you a pro at mathematical modelling.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/econometrics-and-operations-research/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/econometrics-and-operations-research/'
      ],
      notes:
        'Content 4.6: BSc Econometrics and Operations Research (Croho 56833). The IB page asks for "Mathematics: Analysis and approaches HL"; the programme page, mathematics "passed as a higher level (advanced) subject". Stored as Maths AA HL 4, critical (the stored grade 5 had no source). Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027. Stored before: Maths AA HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlg96000p7mflg8id0r96',
      status: 'current',
      name: 'Economics and Business Economics - Business Economics',
      description:
        "Study Business Economics in Groningen and discover how firms create financial value while balancing societal and sustainability concerns. Work on projects using real data to tackle important questions in today's society. Learn how companies can make a positive impact both locally and globally. Meet business leaders, attend career events, and hear from successful alumni.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.rug.nl/bachelors/economics-and-business-economics-business-economics/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/economics-and-business-economics-business-economics/'
      ],
      notes:
        'Content 4.6: BSc Economics and Business Economics, Business Economics track (Croho 50950). The IB page asks for "Mathematics: Analysis and approaches SL/HL or Mathematics: Applications and interpretation HL"; the stored group (Maths AA SL or HL 4 or Maths AI HL 4, critical) already matched. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlgne000x7mfl1enmqre6',
      status: 'current',
      name: 'Economics and Business Economics - Economics',
      description:
        'Study Economics in Groningen and explore how economics can address inequality and the role of the state, and learn how you can impact major societal issues for the better. Tackle real issues by analyzing complex issues, interpret data, and make smart decisions. Gain practical skills: statistical analysis, data interpretation, and economic forecasting. Become an economist who does not just understand the world but can also influence it.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/economics-and-business-economics-economics/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/economics-and-business-economics-economics/'
      ],
      notes:
        'Content 4.6: BSc Economics and Business Economics, Economics track (Croho 50950). The IB page asks for "Mathematics: Analysis and approaches SL/HL or Mathematics: Applications and interpretation HL"; the stored group (Maths AA SL or HL 4 or Maths AI HL 4, critical) already matched. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlh1p00157mfldz43qljn',
      status: 'current',
      name: 'Economics and Business Economics - International Economics and Sustainable Development',
      description:
        'Study International Economics and Sustainable Development in Groningen and learn how global trade, financial systems, and sustainability shape societies and economies worldwide. Learn how globalization and economic growth impact businesses and societies. Dive into economic theory on international trade, technological innovation, and how global production impacts nature and emissions.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.rug.nl/bachelors/economics-and-business-economics-international-economics-and-sustainable-development/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/economics-and-business-economics-international-economics-and-sustainable-development/'
      ],
      notes:
        'Content 4.6: BSc Economics and Business Economics, International Economics and Sustainable Development track (Croho 50950). The IB page asks for "Mathematics: Analysis and approaches SL/HL or Mathematics: Applications and interpretation HL"; the stored group (Maths AA SL or HL 4 or Maths AI HL 4, critical) already matched. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qleg000097mflilnbel3s',
      status: 'current',
      name: 'English Language and Culture',
      description:
        "English is a world language. In literature and films, international politics and business, English is everywhere. Only by studying the language and cultures can we understand its impact across the world. While you acquire important skills in analysis, interpretation, critical thinking, research and independence, you get the opportunity to study your favourite authors from across the English-speaking world, from medieval classics to fan fiction. The Bachelor's programme in English Language and Culture at the University of Groningen is the oldest in the Netherlands and has been the best-rated programme for the past ten years.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/english-language-and-culture/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/english-language-and-culture/'
      ],
      notes:
        'Content 4.6: BA English Language and Culture (Croho 50290, Faculty of Arts). The IB page lists it with "none". Checked, none required. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlep4000b7mflgxwzi5cb',
      status: 'current',
      name: 'European Languages, Cultures and Politics',
      description:
        'Study European languages and cultures with tracks in English, French, German or Italian. Develop a deep understanding of European linguistic and cultural diversity while gaining advanced language skills and cultural competence.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/european-languages-cultures-and-politics/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/european-languages-cultures-and-politics/'
      ],
      notes:
        'Content 3.4: renamed, same programme. The old european-languages-and-cultures URL redirects here; BA in European Languages, Cultures and Politics (Croho 56124, 180 EC, Faculty of Arts, Dutch and English), with a politics profile added to language and culture. The page gives deadlines for the September 2027 start (1 May 2027). Checked, no specific IB subjects required: an international equivalent of the VWO diploma (the IB Diploma; 24 is its minimum) and English at C1 (VWO English 6 or a listed test). The major language sets its own prerequisite, which the model cannot hold: French, German and Spanish Plus need about A2 (for example French or Spanish as an exam subject, or an A2 statement on the diploma); Dutch, Italian, Russian, Swedish and beginners\' Spanish need none. Content 4.6: re-checked against Groningen\'s IB page (last modified 25 September 2026), which lists "European Language and Cultures" under the Faculty of Arts with "none"; nothing changed.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qloaq004r7mflqf1x77gk',
      status: 'current',
      name: 'Global Politics & Sustainability',
      description:
        'Do you want to contribute to solutions for the great challenges of our time while choosing your own courses? This University College programme offers you a broad foundation and the freedom to delve deeper into what you find important. Develop the skills to turn your ideas into action and contribute to a better future! Explore a mix of disciplines like politics, psychology, sustainability, energy and global health.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/global-politics-sustainability/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/bachelors/global-politics-sustainability/',
        'https://www.rug.nl/cf/education/application/applying-for-gps',
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma'
      ],
      notes:
        'Content 3.4: renamed, same programme: the page says "Global Politics & Sustainability was previously called Global Responsibility & Leadership". BSc (Croho 59327, 180 EC, English, Campus Fryslân in Leeuwarden), starting February and September. The page gives deadlines for 2027 starts (1 November 2026 for international students, September 2027 intake). Checked, no specific IB subjects required: an international equivalent of the VWO diploma (the IB Diploma; 24 is its minimum) and sufficient English. It is selective: a CV and a motivation letter or video in English. Content 4.6: re-checked. The GPS application page (Early Bird 15 January 2027, final deadline 1 May 2027) names "two main requirements", the diploma and English. Groningen\'s IB page (last modified 25 September 2026) lists GPS as the only Campus Fryslân programme, with "Mathematics: Analysis and approaches SL/HL or Mathematics: Applications and interpretation SL/HL with a passing grade in all cases", word for word the maths rule of Data Science and Society, which that page leaves out. Kept as none required, the programme\'s own page; the owner may want Campus Fryslân to confirm.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qley7000d7mflje1aen1y',
      status: 'current',
      name: 'History (International Track)',
      description:
        "Are you curious about the connection between present and past? Do you want to delve into the backgrounds of historical events? During the Bachelor's programme in History you search for explanations for developments in the present and past. You also learn how different events are interconnected. You dare to dig deep and ask critical questions. Besides the regular track where most teaching is in Dutch, you can also choose the International track, where teaching is entirely in English.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/history/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/history/'
      ],
      notes:
        'Content 4.6: BA History, English track (Croho 56034, Faculty of Arts). The IB page lists "History (Dutch track and English track)" with "none". Checked, none required. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlmua00497mfliwmv3328',
      status: 'current',
      name: 'Human Geography and Planning',
      description:
        'Do you want to know where to build what types of houses to solve the housing crisis? Do you wonder why climate change has different consequences in different regions? Do you dare to ask critical questions about how different places develop to help remake a better world? Then Human Geography & Planning is the right choice for you! During this programme, you learn to investigate society in its geographic context. You will learn to explain how and why cities and regions develop differently, and how this relates to where and when these developments take place.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/human-geography-and-planning/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/human-geography-and-planning/'
      ],
      notes:
        'Content 4.6: BSc Human Geography and Planning (Croho 50974, Faculty of Spatial Sciences). The IB page lists it with "none"; the programme page: "There is no maths requirement for Human Geography and Planning", though a level like VWO Maths A, B or C is expected. Checked, none required. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qllef003j7mfl3ef7u7x8',
      status: 'current',
      name: 'Industrial Engineering and Management',
      description:
        "How can new technologies contribute to a more sustainable future? How can we make production processes faster and smarter? And how do you turn innovative ideas into concrete solutions for businesses? If you are curious about technology, like solving problems and want to learn how businesses improve their products, processes and sustainability, then the Bachelor's programme Industrial Engineering and Management at the University of Groningen is the right choice for you.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/industrial-engineering-and-management/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/industrial-engineering-and-management/'
      ],
      notes:
        'Content 4.6: BSc Industrial Engineering & Management (Croho 56994). The IB page asks for "Mathematics: Analysis and Approaches HL"; the programme page: "only Mathematics is a formal entry requirement", Physics is highly recommended and Chemistry advised (not stored). Stored as Maths AA HL 4, critical. Maths AI HL is no longer accepted. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027. Stored before: Maths AA or Maths AI HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlokp004t7mflv343n6h9',
      status: 'current',
      name: 'International and European Law',
      description:
        'Our LLB programme in International and European Law is specifically designed for students who wish to pursue a professional career in an international legal environment. Study international law, European Union law, human rights, and transnational legal issues in an internationally-oriented programme.',
      field: 'Law',
      degree: 'Bachelor of Laws',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/international-and-european-law/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/international-and-european-law/'
      ],
      notes:
        'Content 4.6: LLB International and European Law (Croho 56829, Faculty of Law). The IB page lists it with "none". A compulsory (non-binding) matching activity is part of applying. Checked, none required. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlhgb001d7mflqtkcf77u',
      status: 'current',
      name: 'International Business',
      description:
        "Study International Business in Groningen to learn about international markets, cross-cultural management, and innovative business strategies, all essential in today's interconnected world. Explore diverse perspectives from sociology, ethics, marketing, innovation, psychology, economics, politics, and finance. Dive into real-life projects and case studies from companies. Important: BSc International Business is a fixed quota programme (numerus fixus) accepting only 550 students.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/international-business/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/international-business/'
      ],
      notes:
        'Content 4.6: BSc International Business (Croho 50019), a numerus fixus programme with selection; the deadline is 15 January 2027 for the 1 September 2027 start. The IB page asks for "Mathematics: Analysis and approaches SL/HL or Mathematics: Applications and interpretation HL"; the stored group (Maths AA SL or HL 4 or Maths AI HL 4, critical) already matched. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (15 January 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlf7e000f7mflsyn2c1sx',
      status: 'current',
      name: 'International Relations and International Organization',
      description:
        'Can the EU survive the rise of euroscepticism and populism? Why does international cooperation on global environmental issues prove so difficult? IRIO in Groningen is a multidisciplinary, English-taught programme in which you study political issues at an international level. You look at the place of politics, history, economics and law in international relations, as well as the role of international organizations. Note: IRIO is a numerus fixus programme, with only 300 students admitted per year.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.rug.nl/bachelors/international-relations-and-international-organization/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/international-relations-and-international-organization/'
      ],
      notes:
        'Content 4.6: BA International Relations and International Organization (Croho 50627, Faculty of Arts). The IB page lists it with "none"; the programme page: "an International Baccalaureate diploma (minimum score: 24)". Checked, none required. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlnou004j7mfltu2aw9lq',
      status: 'current',
      name: 'Liberal Arts and Sciences',
      description:
        "At University College Groningen (UCG), we believe education should be more than just acquiring knowledge—it should be a journey of discovery. Our Liberal Arts and Sciences programme is designed for curious, ambitious students who want to explore multiple disciplines, think critically, and tackle the world's most pressing challenges. UCG offers a small-scale, interactive learning environment where you are encouraged to think beyond traditional academic boundaries. Our flexible and interdisciplinary curriculum allows you to explore a wide range of subjects while specialising in a major of your choice: Humanities, Sciences, or Social Sciences.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/liberal-arts-and-sciences/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/liberal-arts-and-sciences/'
      ],
      notes:
        'Content 4.6: BA/BSc Liberal Arts and Sciences, University College Groningen (Croho 50393); the degree depends on the major, and the stored Bachelor of Science is kept. The IB page lists it with "none". Selective: eligibility first, then a motivation video (not a numerus fixus). An IB Diploma taught in English exempts from the English test. Checked, none required. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qllr1003p7mfln1a0zmjx',
      status: 'current',
      name: 'Life Science and Technology',
      description:
        'How do cells communicate, heal or malfunction? Can we design molecules that target diseases specifically? What happens when we take medication? If you are curious about life at the smallest scale to solve real challenges in health and biotechnology, then Life Science and Technology (LST) at the University of Groningen is for you.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/life-science-and-technology/',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/life-science-and-technology/'
      ],
      notes:
        'Content 4.6: BSc Life Science and Technology (Croho 56286). The IB page asks for "Mathematics: Analysis and Approaches HL", Physics and Chemistry, "At least one of these two courses at HL, the other at SL". Stored: Maths AA HL 4, Physics SL 4 and Chemistry SL 4, all critical; the model cannot hold "one of Physics and Chemistry at HL", so Chemistry is no longer stored at HL. Maths AI HL is no longer accepted. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027. Stored before: Chemistry HL 5 (critical); Maths AA or Maths AI HL 5 (critical); Physics SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlm73003z7mfl9xhvtui3',
      status: 'current',
      name: 'Mathematics',
      description:
        "How many prime numbers are there in a given interval? How do you calculate a sum with infinitely many terms? How does cryptography work? And why is the weather so unpredictable? If you are curious about abstract structures, precise and logical reasoning, and the rich diversity of mathematics as a discipline, then the Bachelor's programme Mathematics at the University of Groningen offers you the tools to explore all of this.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/mathematics/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/mathematics/'
      ],
      notes:
        'Content 4.6: BSc Mathematics (Croho 56980). The IB page asks for "Mathematics: Analysis and Approaches HL": stored as Maths AA HL 4, critical (the stored grade 5 had no source). Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027. Stored before: Maths AA HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlfgb000h7mfl3dcpb14l',
      status: 'current',
      name: 'Media Studies',
      description:
        'In contemporary life, media are central. From social media to print, from website to television, from search engine to app: media determine how we see the world. Media have not only an enormous influence on how we communicate with each other, but also on how societies are organized, culturally, politically and economically. In this scientific programme, the informative and social function of media is studied.',
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/media-studies/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/media-studies/'
      ],
      notes:
        'Content 4.6: BA Media Studies (Croho 50906, Faculty of Arts). The IB page lists it with "none". Checked, none required. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Deleted 2026-09-29 at the owner's request (content 4.6), backup in scripts/backups/refresh/: Philosophy of a Specific Discipline BA (Croho 57084): admits only after a first year (60 EC) of another bachelor's, so no IB entry.
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlmhr00437mflf8xcaogr',
      status: 'current',
      name: 'Physics',
      description:
        "How does nature work? And how can we use its concepts? By creating models and formulating natural laws, we learn to describe and predict the world around us. If this interests you, then the Bachelor's programme Physics at the University of Groningen might be for you.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/physics/',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/physics/'
      ],
      notes:
        'Content 4.6: BSc Physics (Croho 50206). The IB page asks for "Mathematics: Analysis and Approaches HL" and "Physics HL"; both stored at 4, critical (the stored grade 5 had no source). Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027. Stored before: Maths AA HL 5 (critical); Physics HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlfpb000j7mflzkyckwm7',
      status: 'current',
      name: 'Psychology (English)',
      description:
        'Do you want to explore human behavior, or how people think, feel, and perceive? Learn how biological, cognitive, social, and environmental factors can shape our behaviour. Explore the broad professional field of psychology. Train your communication and diagnostic skills. Work in small groups to develop your academic, research, professional, and communication skills. Build a strong profile as a future psychologist – both in content and in practice. Note: Psychology is a numerus fixus programme with limited enrollment.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/psychology-en/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/psychology-en/'
      ],
      notes:
        'Content 4.6: BSc Psychology, English track (Croho 56604), a numerus fixus of 250 places with a selection procedure; the deadline is 15 January 2027 for the 1 September 2027 start. The IB page lists Psychology under the Faculty of Behavioural and Social Sciences with "none"; the programme page only recommends mathematics throughout secondary school. Checked, none required. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (15 January 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qlng1004h7mflscbdjx4f',
      status: 'current',
      name: 'Religious Studies',
      description:
        'What role does religion play in radicalization, conflicts, migration and climate change? And how does freedom of expression relate to freedom of religion? Study religions from various angles including anthropology, sociology, history, and philosophy to understand their impact on contemporary societies.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/religious-studies/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/religious-studies/'
      ],
      notes:
        'Content 4.6: BA Religious Studies (Croho 50902, Faculty of Religion, Culture and Society). The IB page lists it with "none". Checked, none required. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8qln3f004b7mfl3dwy2p7k',
      status: 'current',
      name: 'Spatial Planning and Design',
      description:
        'If you have a special interest in the living environment, and you aspire to combine analytical thinking with creative design, then Spatial Planning and Design is the field for you. What effects will climate change have on our future cities and rural areas? How can you develop sustainable strategies and designs for new and existing urban systems? Planners are asked to translate spatial transformations into new opportunities to enhance the quality of life.',
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.rug.nl/bachelors/spatial-planning-and-design/',
      requirements: [
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
        'https://www.rug.nl/education/application-enrolment-tuition-fees/admission/procedures/application-informatie/with-non-dutch-diploma/bachelor/bachelor-entry-requirements/bachelorlinksinternational/international-baccalaureate-diploma',
        'https://www.rug.nl/bachelors/spatial-planning-and-design/'
      ],
      notes:
        'Content 4.6: BSc Spatial Planning and Design (Croho 56194, Faculty of Spatial Sciences). The IB page asks for "Mathematics: Analysis and approaches SL/HL or Mathematics: Applications and interpretation HL": stored as Maths AA SL 4 or Maths AI HL 4, one critical group. Maths AI SL is no longer accepted. Groningen\'s IB page (bachelor entry requirements, "International Baccalaureate diploma", last modified 25 September 2026): the IB Diploma meets the general requirement, equivalence to the Dutch VWO, and each programme\'s subject-specific requirements are listed without grades. Where a subject is required and no grade is named, 4 is stored: the lowest IB grade Groningen counts on its certificate route ("externally examined by the IBO (grade 4-7)"). Groningen publishes no IB points figure: 24, the Diploma\'s own minimum, is kept (the IRIO page asks for "an International Baccalaureate diploma (minimum score: 24)"). The programme page gives application deadlines for the 1 September 2027 start (1 May 2027), so checked for 2027. Stored before: Maths AA or Maths AI SL 4 (critical).'
    }
  ]
}

export default refresh
