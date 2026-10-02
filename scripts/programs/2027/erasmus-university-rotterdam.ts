import type { RefreshFile } from '../lib/refresh'

/**
 * Erasmus University Rotterdam: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts erasmus-university-rotterdam
 */
const refresh: RefreshFile = {
  university: 'Erasmus University Rotterdam',
  entryYear: 2027,
  checkedOn: '2026-09-29',
  programs: [
    // Deleted 2026-09-29 at the owner's request (content 4.6), backup in scripts/backups/refresh/: Bachelor in Philosophy of a Specific Discipline: admits only after the first year of another bachelor's, so no IB entry.
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8kqvoc000b7m8ildy1zygl',
      status: 'current',
      name: 'Bachelor International Business Administration',
      description:
        "IBA is a three-year English-taught bachelor of science programme, combining research and hands-on learning. It covers diverse areas like sales, marketing, finance and more, preparing you for a career in international business. Throughout your studies, RSM's commitment to being a force for positive change, aligned with the United Nations' 17 Sustainable Development Goals, will be evident. RSM has a strong global reputation. It is consistently recognised in prestigious rankings like the one from the Financial Times. RSM is among the 1 per cent of business schools worldwide with Triple Crown accreditation.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 33,
      programUrl: 'https://www.eur.nl/en/bachelor/bachelor-international-business-administration',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 4 },
            { course: 'ENG-LIT', level: 'SL', grade: 5 },
            { course: 'ENG-LL', level: 'HL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 5 },
            { course: 'ENG-B', level: 'HL', grade: 5 }
          ],
          critical: false
        },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.rsm.nl/education/bachelor/bsc-international-business-administration-iba/admission-application/',
        'https://www.rsm.nl/education/bachelor/bsc-international-business-administration-iba/admission-application/faq-category/141-international/',
        'https://www.eur.nl/en/bachelor/bachelor-international-business-administration/admission'
      ],
      notes:
        'Content 4.6: BSc International Business Administration (Rotterdam School of Management), a numerus fixus of 650 places ranked 75% on grades and 25% on motivation, Studielink by 15 January. RSM\'s IB entry (last update 22 September 2026): only the full Diploma; Mathematics "Analysis & Approaches SL minimum grade 5 OR Mathematics Analysis & Approaches HL minimum grade 4 OR Mathematics Applications & Interpretation HL minimum grade 5", or a mathematics proficiency exam (stored as one critical group, as before); English exempt if the last two IB years were taught in English, otherwise "English A SL with a minimum score of 5 OR English A HL with a minimum score of 4 OR English B HL with a minimum score of 5", or a test (stored not critical; English B was missing, and the stored group was critical). Selection points need "a total of 33 points based on the 6 exam subjects (excluding TOK and EE) or higher": 33, out of 42, is kept. The page says "The admissions requirements for September 2027 entry are currently being updated and will be finalised by 1 October 2026. Information on this page may therefore change", so it was checked for 2026 on 29 September. Re-checked 2 October 2026: the FAQ page (last update 30 September 2026) now covers the 2027–2028 application cycle without that warning, and the Diploma, Mathematics, English and 33-point rules are unchanged, so checked for 2027. Stored before: English A Literature HL 4 or English A Literature SL 5 or English A Language and Literature HL 4 or English A Language and Literature SL 5 (critical); Maths AA HL 4 or Maths AA SL 5 or Maths AI HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8kqw9u000r7m8ien5vqi5e',
      status: 'current',
      name: 'Double Bachelor BSc² in Econometrics and Economics',
      description:
        'The double bachelor BSc² in Econometrics and Economics programme will bring you: extensive knowledge of leading economic theories; the ability to apply mathematics to real-life economic and social issues; the ability to apply your analytical expertise and your social and communication skills in a professional environment.',
      field: 'Business & Economics',
      degree: "Double Bachelor's Degree",
      duration: '4 years',
      minIBPoints: 30,
      programUrl: 'https://www.eur.nl/en/bachelor/double-bachelor-bsc2-econometrics-and-economics',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 4 },
            { course: 'ENG-LIT', level: 'SL', grade: 5 },
            { course: 'ENG-LL', level: 'HL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 5 },
            { course: 'ENG-B', level: 'HL', grade: 5 }
          ],
          critical: false
        },
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.eur.nl/en/bachelor/double-bachelor-bsc2-econometrics-and-economics/admission',
        'https://www.eur.nl/en/bachelor/double-bachelor-bsc2-econometrics-and-economics'
      ],
      notes:
        'Content 4.6: Double Bachelor BSc² in Econometrics and Economics: two BSc degrees in four years, so the degree is now Double Bachelor\'s Degree (was Bachelor of Science). Its admission page ("applying for academic year 2027-2028") gives the same IB requirements as Econometrics and Operations Research: The International Bachelor Econometrics and Operations Research admission page: "English A HL (4), English A SL (5), English B HL (5)"; Mathematics "Analysis & Approaches HL minimum grade 5" (Analysis & Approaches SL at 6 may sit the mathematics entrance exam; Applications & Interpretation is "too little mathematical background"); "Minimum requirement of 30 points (TOK, EE and CAS excluded)", so 30 is out of 42 and is stored as published, as McGill\'s and Waterloo\'s are. Rolling admission instead of a numerus fixus ranking. English is listed with the IB requirements, but a valid English test can replace it, so it is stored not critical, as 3.4 stored UCD\'s and 4.2 Edinburgh\'s. English B was missing and the group was critical. Checked for 2027. Stored before: English A Literature HL 4 or English A Literature SL 5 or English A Language and Literature HL 4 or English A Language and Literature SL 5 (critical); Maths AA HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8kqwrx00137m8ih4032a2w',
      status: 'current',
      name: 'Double Bachelor in Econometrics and Philosophy of Econometrics',
      description:
        'This is a unique opportunity to study current economic issues from both mathematical and philosophical angles. Are you interested in issues relating to econometrics, but do you also aim to develop a broader academic horizon? In the current age of uncertainty and rapidly advancing technologies, knowledge of philosophical problems and skills remains relevant. Students in this programme obtain two degrees in four years: a Bachelor of Science (BSc) in Econometrics and Operations Research and a Bachelor of Arts (BA) in Philosophy of a Specific Discipline.',
      field: 'Business & Economics',
      degree: "Double Bachelor's Degree",
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.eur.nl/en/bachelor/double-bachelor-econometrics-and-philosophy-econometrics',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 4 },
            { course: 'ENG-LIT', level: 'SL', grade: 5 },
            { course: 'ENG-LL', level: 'HL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 5 },
            { course: 'ENG-B', level: 'HL', grade: 5 }
          ],
          critical: false
        },
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.eur.nl/en/bachelor/double-bachelor-econometrics-and-philosophy-econometrics/admission',
        'https://www.eur.nl/en/bachelor/international-bachelor-econometrics-and-operations-research/admission'
      ],
      notes:
        'Content 4.6: Double bachelor in Econometrics and Philosophy of Econometrics: a BSc and a BA, so the degree is now Double Bachelor\'s Degree (was Bachelor of Science). Not direct entry: "To apply for the double bachelor programme you must successfully pass the first year of International Bachelor Econometrics and Operations Research"; stored with that route\'s requirements, as 4.3 stored Alberta\'s first-year routes. The International Bachelor Econometrics and Operations Research admission page: "English A HL (4), English A SL (5), English B HL (5)"; Mathematics "Analysis & Approaches HL minimum grade 5" (Analysis & Approaches SL at 6 may sit the mathematics entrance exam; Applications & Interpretation is "too little mathematical background"); "Minimum requirement of 30 points (TOK, EE and CAS excluded)", so 30 is out of 42 and is stored as published, as McGill\'s and Waterloo\'s are. Rolling admission instead of a numerus fixus ranking. English is listed with the IB requirements, but a valid English test can replace it, so it is stored not critical, as 3.4 stored UCD\'s and 4.2 Edinburgh\'s. English B was missing and the group was critical. The Econometrics admission page still describes "students applying for academic year 2026-2027", so checked for 2026. Stored before: English A Literature HL 4 or English A Literature SL 5 or English A Language and Literature HL 4 or English A Language and Literature SL 5 (critical); Maths AA HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8kqxa9001f7m8iv4v2hbsi',
      status: 'current',
      name: 'Double Bachelor in Economics and Philosophy of Economics',
      description:
        'In this programme you will learn to approach the field of economics from a different perspective by combining it with philosophy. Are you interested in issues relating to economics and business, but do you also aim to develop a broader academic horizon? In the current age of uncertainty and rapidly advancing technologies, knowledge of philosophical problems and skills remains relevant. Students in this programme obtain two degrees in four years: a Bachelor of Science (BSc) in Economics and Business Economics and a Bachelor of Arts (BA) in Philosophy of a Specific Discipline.',
      field: 'Business & Economics',
      degree: "Double Bachelor's Degree",
      duration: '4 years',
      minIBPoints: 24,
      programUrl:
        'https://www.eur.nl/en/bachelor/double-bachelor-economics-and-philosophy-economics',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 4 },
            { course: 'ENG-LIT', level: 'SL', grade: 5 },
            { course: 'ENG-LL', level: 'HL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 5 },
            { course: 'ENG-B', level: 'HL', grade: 5 }
          ],
          critical: false
        },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.eur.nl/en/bachelor/double-bachelor-economics-and-philosophy-economics/admission',
        'https://www.eur.nl/en/bachelor/international-bachelor-economics-and-business-economics/admission'
      ],
      notes:
        'Content 4.6: Double bachelor in Economics and Philosophy of Economics: a BSc and a BA, so the degree is now Double Bachelor\'s Degree (was Bachelor of Science). Not direct entry: applicants apply to the International Bachelor Economics and Business Economics (or the Dutch Economie en Bedrijfseconomie) and add the double after passing the first year; stored with that route\'s requirements, as 4.3 stored Alberta\'s first-year routes. The International Bachelor Economics and Business Economics admission page ("applying for academic year 2027-2028"; a numerus fixus of 500 seats for 2027-2028, deadline 15 January): "English A HL (4) or English A SL (5) or English B HL (5)" and Mathematics "Analysis & Approaches HL minimum grade 4 or; Analysis & Approaches SL minimum grade 5 or; Applications & Interpretation HL minimum grade 5"; below these, or with Maths AI SL, an English and/or mathematics certificate is needed. Maths is stored as one critical group, as before. English is listed with the IB requirements, but a valid English test can replace it, so it is stored not critical, as 3.4 stored UCD\'s and 4.2 Edinburgh\'s. English B was missing and the group was critical. Erasmus publishes no IB points figure for it: 24, the Diploma\'s own minimum, is kept. Checked for 2027. Stored before: English A Literature HL 4 or English A Literature SL 5 or English A Language and Literature HL 4 or English A Language and Literature SL 5 (critical); Maths AA HL 4 or Maths AA SL 5 or Maths AI HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8kqyz7002n7m8ia1r3n5yb',
      status: 'current',
      name: 'Dual Degree in Arts and Sciences',
      description:
        "Do you have an artistic or musical talent, but would like to complement it with academic knowledge from the arts and cultural sciences? Then combine art and science during the 5-year dual bachelor in Rotterdam. The Dual Degree in Arts and Science programme is made possible by Rotterdam Arts and Sciences Lab (RASL), a collaboration of Arts and Culture Studies (EUR), Erasmus University College (EUR), Willem de Kooning Academy (WdKA) and Codarts Rotterdam. This programme is specially designed to strengthen Rotterdam's artistic profile.",
      field: 'Arts & Humanities',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 24,
      programUrl: 'https://www.eur.nl/en/bachelor/dual-degree-arts-and-sciences',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 }
          ],
          critical: false
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.eur.nl/en/bachelor/dual-degree-arts-and-sciences/admission',
        'https://www.eur.nl/en/bachelor/dual-degree-arts-and-sciences/application',
        'https://www.eur.nl/en/bachelor/international-bachelor-arts-and-culture-studies/admission'
      ],
      notes:
        "Content 4.6: Dual Degree in Arts and Sciences: five years combining an Erasmus programme (the International Bachelor Arts and Culture Studies, Erasmus University College or Philosophy) with an art or music bachelor at Willem de Kooning Academy or Codarts, two degrees, so the degree is now Double Bachelor's Degree (was Bachelor of Arts). Applicants must be accepted by both institutions: the art school by portfolio or audition, which the model cannot hold. Stored with the Arts and Culture Studies route: the IB Diploma \"with English A at Higher or Standard Level or English B at Higher Level\" (no grade named; 4 stored), which exempts from the English test. English appears only as an exemption from the English test, so it is stored not critical, as 3.4 stored UCD's and 4.2 Edinburgh's. Erasmus publishes no IB points figure for it: 24, the Diploma's own minimum, is kept. The programme's application page gives \"Application Deadlines for the academic year 2026-2027\", so checked for 2026. Stored before: English A Literature HL 4 or English A Literature SL 5 or English A Language and Literature HL 4 or English A Language and Literature SL 5."
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8kqzfl002x7m8i10sqfueg',
      status: 'current',
      name: 'International Bachelor Arts and Culture Studies',
      description:
        'Do you have a passion for arts and culture? Are you interested in cultural heritage? And do you want to know what goes on behind the scenes of the art world? The International Bachelor Arts and Culture Studies at Erasmus University Rotterdam gives you the theoretical and practical tools to start your career as a creative professional in the field of arts and culture. Study the world of arts and culture from a sociological, economic, political and media perspective; explore how art is produced and how it is presented by parties such as theatres, museums and festivals.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.eur.nl/en/bachelor/international-bachelor-arts-and-culture-studies',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.eur.nl/en/bachelor/international-bachelor-arts-and-culture-studies/admission',
        'https://www.eur.nl/en/bachelor/international-bachelor-arts-and-culture-studies/application'
      ],
      notes:
        'Content 4.6: International Bachelor Arts and Culture Studies (BA). Admission page: the IB Diploma "with English A at Higher or Standard Level or English B at Higher Level" (no grade named; 4 stored) exempts from the English test; no other subject is named. English appears only as an exemption from the English test, so it is stored not critical, as 3.4 stored UCD\'s and 4.2 Edinburgh\'s. Erasmus publishes no IB points figure for it: 24, the Diploma\'s own minimum, is kept. The application page: "you can start your application for the academic year 2027-2028", deadlines 1 April (non-EEA) and 1 May (EEA); checked for 2027. Stored before: English A Literature HL 4 or English A Literature SL 5 or English A Language and Literature HL 4 or English A Language and Literature SL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8kr0cc003h7m8i4f7mt0vx',
      status: 'current',
      name: 'International Bachelor Communication and Media',
      description:
        'Do you want to explore the world of communication and media and its social, political, economic, and cultural impact? Do you want to learn in a culturally diverse classroom where you can put your new acquired skills and knowledge to the test? The International Bachelor Communication and Media (IBCoM) at Erasmus University Rotterdam takes a comparative, international approach to communication and media studies. The IBCoM programme is taught exclusively in English to a diverse student body from all corners of the world.',
      field: 'Media',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.eur.nl/en/bachelor/international-bachelor-communication-and-media',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.eur.nl/en/bachelor/international-bachelor-communication-and-media/admission',
        'https://www.eur.nl/en/bachelor/international-bachelor-communication-and-media/application'
      ],
      notes:
        'Content 4.6: International Bachelor Communication and Media (BSc). Admission page: the IB Diploma "with English A at Higher or Standard Level (4 or higher) or English B at Higher Level (4 or higher)" exempts from the English test; no other subject is named. English appears only as an exemption from the English test, so it is stored not critical, as 3.4 stored UCD\'s and 4.2 Edinburgh\'s. Erasmus publishes no IB points figure for it: 24, the Diploma\'s own minimum, is kept. The application page: "the academic year 2027-2028", deadline 15 March 2027; checked for 2027. Stored before: English A Literature HL 4 or English A Literature SL 5 or English A Language and Literature HL 4 or English A Language and Literature SL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8kqxvs001v7m8iz3i4w308',
      status: 'current',
      name: 'International Bachelor Econometrics and Operations Research',
      description:
        'With mathematics, statistics and economics at its core, this programme enables you to systemically take on real-life economic questions. If applying math to real-life issues sounds like the challenge for you.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 30,
      programUrl:
        'https://www.eur.nl/en/bachelor/international-bachelor-econometrics-and-operations-research',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 4 },
            { course: 'ENG-LIT', level: 'SL', grade: 5 },
            { course: 'ENG-LL', level: 'HL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 5 },
            { course: 'ENG-B', level: 'HL', grade: 5 }
          ],
          critical: false
        },
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.eur.nl/en/bachelor/international-bachelor-econometrics-and-operations-research/admission',
        'https://www.eur.nl/en/bachelor/international-bachelor-econometrics-and-operations-research/application'
      ],
      notes:
        'Content 4.6: International Bachelor Econometrics and Operations Research (BSc). The International Bachelor Econometrics and Operations Research admission page: "English A HL (4), English A SL (5), English B HL (5)"; Mathematics "Analysis & Approaches HL minimum grade 5" (Analysis & Approaches SL at 6 may sit the mathematics entrance exam; Applications & Interpretation is "too little mathematical background"); "Minimum requirement of 30 points (TOK, EE and CAS excluded)", so 30 is out of 42 and is stored as published, as McGill\'s and Waterloo\'s are. Rolling admission instead of a numerus fixus ranking. English is listed with the IB requirements, but a valid English test can replace it, so it is stored not critical, as 3.4 stored UCD\'s and 4.2 Edinburgh\'s. English B was missing and the group was critical. The admission page still describes "students applying for academic year 2026-2027" (the application page gives 2027 deadlines, but the requirements are stated for 2026-2027), so checked for 2026. The Double Bachelor BSc² page, updated for 2027-2028, gives the same requirements. Stored before: English A Literature HL 4 or English A Literature SL 5 or English A Language and Literature HL 4 or English A Language and Literature SL 5 (critical); Maths AA HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8kqydo00277m8igvqn363h',
      status: 'current',
      name: 'International Bachelor Economics and Business Economics',
      description:
        'This international programme gives you an extensive understanding of worldwide issues related to economics and business economics. Are you intrigued by global economic challenges like financial crises or the rise of emerging markets? This international bachelor programme offers a deep dive into real-world economics and business economics issues. You will build strong analytical and communication skills while studying in a diverse, globally-minded environment.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.eur.nl/en/bachelor/international-bachelor-economics-and-business-economics',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 4 },
            { course: 'ENG-LIT', level: 'SL', grade: 5 },
            { course: 'ENG-LL', level: 'HL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 5 },
            { course: 'ENG-B', level: 'HL', grade: 5 }
          ],
          critical: false
        },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.eur.nl/en/bachelor/international-bachelor-economics-and-business-economics/admission'
      ],
      notes:
        'Content 4.6: International Bachelor Economics and Business Economics (BSc). The International Bachelor Economics and Business Economics admission page ("applying for academic year 2027-2028"; a numerus fixus of 500 seats for 2027-2028, deadline 15 January): "English A HL (4) or English A SL (5) or English B HL (5)" and Mathematics "Analysis & Approaches HL minimum grade 4 or; Analysis & Approaches SL minimum grade 5 or; Applications & Interpretation HL minimum grade 5"; below these, or with Maths AI SL, an English and/or mathematics certificate is needed. Maths is stored as one critical group, as before. English is listed with the IB requirements, but a valid English test can replace it, so it is stored not critical, as 3.4 stored UCD\'s and 4.2 Edinburgh\'s. English B was missing and the group was critical. Erasmus publishes no IB points figure for it: 24, the Diploma\'s own minimum, is kept. Checked for 2027. Stored before: English A Literature HL 4 or English A Literature SL 5 or English A Language and Literature HL 4 or English A Language and Literature SL 5 (critical); Maths AA HL 4 or Maths AA SL 5 or Maths AI HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8kqzw600377m8ia87qjrzn',
      status: 'current',
      name: 'International Bachelor History',
      description:
        'Are you curious about what modern global history after 1500 can teach us about contemporary politics, economics, culture, and social relations? Then the International Bachelor History at Erasmus University Rotterdam is the study that suits you! Study modern history from 1500 onwards, focusing on the last 200 years. Examine the past to answer social questions that concern politicians, the media, or citizens today. Explore developments in history thematically and make the link between then and now.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.eur.nl/en/bachelor/international-bachelor-history',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.eur.nl/en/bachelor/international-bachelor-history/admission',
        'https://www.eur.nl/en/bachelor/international-bachelor-history/application'
      ],
      notes:
        'Content 4.6: International Bachelor History (BA). Admission page: the IB Diploma "with English A at Higher or Standard Level or English B at Higher Level" (no grade named; 4 stored) exempts from the English test; no other subject is named. English appears only as an exemption from the English test, so it is stored not critical, as 3.4 stored UCD\'s and 4.2 Edinburgh\'s. Erasmus publishes no IB points figure for it: 24, the Diploma\'s own minimum, is kept. The application page: "the academic year 2027-2028", deadlines 1 April (non-EEA) and 1 May (EEA); checked for 2027. Stored before: English A Literature HL 4 or English A Literature SL 5 or English A Language and Literature HL 4 or English A Language and Literature SL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8kr0st003r7m8irzavmz1c',
      status: 'current',
      name: 'International Bachelor in Psychology',
      description:
        'Do you strive to understand why humans think, feel and act the way they do? "Creating positive societal impact" is the motto that guides education and research at Erasmus University Rotterdam. This also applies to our psychology programme. With one eye on knowledge development and the other on application, we teach a wide range of psychology subjects connected to contemporary societal issues. These include basic topics such as perception and cognition, human learning, motivation and job performance, addiction, and mental health challenges.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.eur.nl/en/bachelor/international-bachelor-psychology',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: ['https://www.eur.nl/en/bachelor/international-bachelor-psychology/admission'],
      notes:
        'Content 4.6: International Bachelor in Psychology (BSc), a numerus fixus: "For 2027-2028 the maximum total intake is 600 students", 120 of them in the English track, with a Selections Assessment; deadline 15 January 2027. Admission page: "International Baccalaureate Diploma, English A (HL or SL 4 or higher), English B (HL 4 or higher)", an exemption from the English test; no other subject is named. English appears only as an exemption from the English test, so it is stored not critical, as 3.4 stored UCD\'s and 4.2 Edinburgh\'s. Erasmus publishes no IB points figure for it: 24, the Diploma\'s own minimum, is kept. Checked for 2027. Stored before: English A Literature HL 4 or English A Literature SL 5 or English A Language and Literature HL 4 or English A Language and Literature SL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8kr19300417m8it80d5v2e',
      status: 'current',
      name: 'Liberal Arts and Sciences',
      description:
        'Shape your education in a vibrant community through an interdisciplinary, international Liberal Arts and Sciences programme. Explore various subjects and specialise in fields like Business, Psychology, or Medicine. Broaden your horizons by building your own curriculum within a Liberal Arts and Sciences Bachelor (BSc) Programme. Pursue your passion, choosing from wide range of disciplines, including Economics & Business, Neuroscience, International Relations, and more. Benefit from small tutorial groups and active participation in your studies.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 30,
      programUrl: 'https://www.eur.nl/en/bachelor/liberal-arts-and-sciences',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'HL', grade: 4 },
            { course: 'ENG-LIT', level: 'SL', grade: 5 },
            { course: 'ENG-LL', level: 'HL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 5 },
            { course: 'ENG-B', level: 'HL', grade: 5 }
          ],
          critical: false
        },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.eur.nl/en/euc/application-admissions/admission-requirements',
        'https://www.eur.nl/en/bachelor/liberal-arts-and-sciences/admission'
      ],
      notes:
        'Content 4.6: Liberal Arts and Sciences, Erasmus University College (BSc). EUC\'s admission requirements ("Applications for 2027/2028 open on 1 October"), International Baccalaureate: "Minimum 30 points (excluding TOK, EE, and CAS)", so 30 is out of 42 and is stored as published; Mathematics "Applications & Interpretation HL: 5, Analysis & Approaches SL: 5, Analysis & Approaches HL: 4" (with AI SL, an extra OMPT-A test), one critical group as before; English "English A SL: 5, English A HL: 4, English B HL: 5". English is listed with the IB requirements, but a valid English test can replace it, so it is stored not critical, as 3.4 stored UCD\'s and 4.2 Edinburgh\'s. English B was missing and the group was critical. EUC does not accept predicted grades. Checked for 2027. Stored before: English A Literature HL 4 or English A Literature SL 5 or English A Language and Literature HL 4 or English A Language and Literature SL 5 (critical); Maths AA HL 4 or Maths AA SL 5 or Maths AI HL 5 (critical).'
    },
    // Stored: checked for 2026 entry on 2026-01-10.
    {
      id: 'cmk8kr1v1004h7m8idlukuv60',
      status: 'current',
      name: 'Management of International Social Challenges',
      description:
        "Are you interested in solving social problems that transcend national borders? Migration, development, climate change, economic stability, or international crime – these are not only the challenges addressed in the Sustainable Development Goals, but also examples of social challenges that local, national and international organisations in the public sector face and try to manage. In this bachelor's programme, you will learn how to research, analyse, and contribute to strategies for public sector organisations to manage these challenges.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.eur.nl/en/bachelor/management-international-social-challenges',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.eur.nl/en/bachelor/management-international-social-challenges/admission',
        'https://www.eur.nl/en/bachelor/management-international-social-challenges/application'
      ],
      notes:
        'Content 4.6: Management of International Social Challenges (BSc). Admission page: "International Baccalaureate Diploma, English A (HL or SL 4 or higher), English B (HL 4 or higher)", an exemption from the English test, and "No mathematics requirement" (maths is advised, not assessed). English appears only as an exemption from the English test, so it is stored not critical, as 3.4 stored UCD\'s and 4.2 Edinburgh\'s. Erasmus publishes no IB points figure for it: 24, the Diploma\'s own minimum, is kept. The application page: deadline "April 1, 2027"; checked for 2027. Stored before: English A Literature HL 4 or English A Literature SL 5 or English A Language and Literature HL 4 or English A Language and Literature SL 5.'
    }
  ]
}

export default refresh
