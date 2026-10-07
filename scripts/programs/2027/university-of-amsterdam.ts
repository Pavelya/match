import type { RefreshFile } from '../lib/refresh'

/**
 * University of Amsterdam: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-amsterdam
 */
const refresh: RefreshFile = {
  university: 'University of Amsterdam',
  entryYear: 2027,
  checkedOn: '2026-09-29',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmk34qmef001l7md2blzvu5p2',
      status: 'current',
      name: 'Actuarial Science',
      description:
        "Actuaries are able to predict the future. Not really, of course. But you do use mathematics, statistics and data science to determine the likelihood of undesirable events occurring in the future. An economic crisis, for example, or a fire, or a bankruptcy. During the Bachelor's Actuarial Science you learn how to estimate risks, calculate their financial impact, and mitigate them properly. UvA is the only Dutch university offering both a Bachelor's and a Master's programme in Actuarial Science.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/actuarial-science/actuarial-science.html',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/programmes/bachelors/actuarial-science/actuarial-science.html'
      ],
      notes:
        'Content 4.6: BSc Actuarial Science. The diploma finder asks for "Analysis and Approaches HL with a grade 4 or higher"; the stored Maths AA HL 4 (critical) already matched. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34me8600037m6agesrnuns',
      status: 'current',
      name: 'Ancient Studies',
      description:
        "Was Caesar the first populist? Can Harry Potter be regarded as a mythological hero? The Bachelor's programme in Ancient Studies investigates the Classical cultures that lie at the roots of our modern world. You will gain insight in the art, literature, philosophy, history, and mythology of Antiquity. You will learn to conduct solid research into ancient topics and use your historical knowledge to develop a critical outlook on contemporary trends and developments.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.uva.nl/en/programmes/bachelors/ancient-studies/ancient-studies.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html',
        'https://www.uva.nl/en/programmes/bachelors/ancient-studies/ancient-studies.html'
      ],
      notes:
        'Content 4.6: BA Ancient Studies, English track. It is on UvA\'s IB Admissions list: EEA nationals with the IB Diploma are admitted on the diploma alone, without an application file. The diploma finder lists no extra requirement: checked, none required. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34meh700057m6acd9ytfk4',
      status: 'current',
      name: 'Archaeology',
      description:
        "In the Bachelor's in Archaeology, you will study past societies and their importance in today's world. The programme devotes attention to the study of various materials, the relationships between humans and landscape, and the presentation of research results in various media. This programme is unique in the Netherlands in how it focuses on Europe – from the Mediterranean to Middle and Western Europe, including, of course, the Netherlands and Amsterdam.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.uva.nl/en/programmes/bachelors/archaeology/archaeology.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html',
        'https://www.uva.nl/en/programmes/bachelors/archaeology/archaeology.html',
        'https://www.uva.nl/en/programmes/bachelors/archaeology/application-and-admission/international-prior-education/international-prior-education.html'
      ],
      notes:
        'Content 3.4: the page moved from archaeology/index.html to archaeology/archaeology.html; same programme (BA Archaeology, 180 EC, joint degree with VU Amsterdam, English track). Checked, no specific subjects required: the IB Diploma itself is the entry requirement, and the English track is on the UvA\'s IB Admissions list (EEA nationals are admitted on the diploma without an application file). 24 is the Diploma minimum. English proficiency: English as an IB exam subject, or a C1 test. The admission pages give 2026 deadlines and the 2026-2027 academic year, so checked for 2026. Content 4.6: 2026 → 2027. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027. Archaeology is not listed, so no extra requirement applies. The programme\'s own admission page still mixes years (UvA Matching "before 15 June 2027", a fee waiver for "the academic year 2026-2027").'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34qlaf00117md24vm7dnow',
      status: 'current',
      name: 'Business Administration',
      description:
        "Are you fascinated by the business world and want to know what role businesses play in the economy and how they influence one another? Are you good at maths and English and enjoy working with fellow students? In the Bachelor's Business Administration you will learn about the business world from multiple perspectives, combining theory with practical experience in Amsterdam's vibrant business ecosystem.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/business-administration/business-administration.html',
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
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/programmes/bachelors/business-administration/application-and-admission/international-prior-education/international-prior-education.html',
        'https://www.uva.nl/en/programmes/bachelors/business-administration/business-administration.html'
      ],
      notes:
        'Content 4.6: BSc Business Administration, English track: a numerus fixus of 650 places, deadline 15 January 2027 for the September 2027 intake, with an online selection test. The diploma finder lists "One of the following IB mathematics courses: Applications and Interpretation HL with a grade 4 or higher; Analysis and Approaches SL or HL with a grade 4 or higher"; with Maths AI SL, or below these grades, an additional mathematics certificate is needed. Stored as Maths AA SL 4 or Maths AI HL 4, one critical group (AA HL meets the SL rule). Maths AI SL is no longer accepted, and HL was never required for AA. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027. Stored before: Maths AA or Maths AI HL 4 (critical).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34qll100177md23oil8g50',
      status: 'current',
      name: 'Business Analytics',
      description:
        "If you are excited about subjects like analytics, artificial intelligence (AI), machine learning, programming, computer science and data-centric business management, our Bachelor's Business Analytics could be for you. Mathematics and programming plays a central role throughout the programme. You build a strong mathematical foundation and use it to dive into AI and machine learning techniques and apply them to real-world challenges.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/business-analytics/business-analytics.html',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/programmes/bachelors/business-analytics/business-analytics.html'
      ],
      notes:
        'Content 4.6: BSc Business Analytics. The diploma finder asks for "Analysis and Approaches HL with a grade 4 or higher"; the stored Maths AA HL 4 (critical) already matched. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34qkzg000v7md28n4k8vxz',
      status: 'current',
      name: 'Computational Social Science',
      description:
        "You're a data idealist: you care about challenges in society like climate change, inequality, and the impact of AI. And you love data, but you want more than just coding for a tech company. In this Bachelor's programme, you'll combine data science with social and behavioural science to solve real-world problems with technical solutions. From day 1, you'll work on projects for clients and develop practical skills like programming, data analysis, and project management.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/computational-social-science/computational-social-science.html',
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
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/programmes/bachelors/computational-social-science/computational-social-science.html'
      ],
      notes:
        'Content 4.6: BSc Computational Social Science (deadline 1 May 2027). The diploma finder lists "One of the following IB mathematics courses: Applications and Interpretation HL with a grade 4 or higher; Analysis and Approaches SL or HL with a grade 4 or higher"; with Maths AI SL, or below these grades, an additional mathematics certificate is needed. Stored as Maths AA SL 4 or Maths AI HL 4, one critical group (AA HL meets the SL rule). Maths AI SL is no longer accepted, and HL was not required for AA. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027. Stored before: Maths AA or Maths AI HL 4 (critical).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34qjnl00077md2xtnx3uot',
      status: 'current',
      name: 'Cultural Anthropology and Development Sociology',
      description:
        "Are you curious about cultures around the world, or eager to understand what's happening closer to home? As an anthropologist, you'll immerse yourself in the lives of others to explore why people behave the way they do. From rituals that connect generations to diverse perspectives on themes like gender and migration: you'll gain insights into how societies work and discover the role you play within them.",
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/cultural-anthropology-and-development-sociology/cultural-anthropology-and-development-sociology.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html',
        'https://www.uva.nl/en/programmes/bachelors/cultural-anthropology-and-development-sociology/cultural-anthropology-and-development-sociology.html'
      ],
      notes:
        'Content 4.6: BA Cultural Anthropology and Development Sociology, English track. It is on UvA\'s IB Admissions list: EEA nationals with the IB Diploma are admitted on the diploma alone, without an application file. The diploma finder lists maths for this programme only as "highly recommended" (Applications and Interpretation HL, or Analysis and Approaches SL or HL, at 4), so it is not stored; the programme page asks for mathematics to VWO Wiskunde A level, which the Diploma\'s compulsory maths course meets. Checked, none required. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027. Stored before: Maths AA or Maths AI HL 4.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34qlu5001b7md25ib8ohk6',
      status: 'current',
      name: 'Econometrics and Data Science',
      description:
        'How can businesses sustainably increase their profits? Can we assess the human impact on global warming? What effect does raising tobacco taxes have on the smoking behaviour of young people? Econometricians and data scientists help answer these questions by analysing real data through mathematical and statistical models. With these models, you can help businesses and organisations answer questions such as how housing prices will evolve in the coming years or what measures need to be taken to reduce traffic jams.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/econometrics-and-data-science/econometrics-and-data-science.html',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/programmes/bachelors/econometrics-and-data-science/econometrics-and-data-science.html'
      ],
      notes:
        'Content 4.6: BSc Econometrics and Data Science. The diploma finder asks for "Analysis and Approaches HL with a grade 4 or higher"; the stored Maths AA HL 4 (critical) already matched. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34qm3k001f7md2omwiub0u',
      status: 'current',
      name: 'Economics and Business Economics',
      description:
        'Why do rates of economic growth vary so widely across Europe? How can a company such as Nike retain market leadership year after year? Should the Dutch government establish a national bank? Economics and Business Economics is an incredibly broad study programme. You will learn to think critically about current, relevant economic issues. During the first 18 months, you will familiarise yourself with both areas of study. Afterwards, you will focus on either Economics or Business Economics.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/economics--business-economics/economics--business-economics.html',
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
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/programmes/bachelors/economics--business-economics/economics--business-economics.html'
      ],
      notes:
        'Content 4.6: BSc Economics and Business Economics, English track (deadline 15 January 2027; "Application process for the September 2027 intake"). The diploma finder lists "One of the following IB mathematics courses: Applications and Interpretation HL with a grade 4 or higher; Analysis and Approaches SL or HL with a grade 4 or higher"; with Maths AI SL, or below these grades, an additional mathematics certificate is needed. Stored as Maths AA SL 4 or Maths AI HL 4, one critical group (AA HL meets the SL rule). Maths AI SL is no longer accepted, and HL was not required for AA. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027. Stored before: Maths AA or Maths AI HL 4 (critical).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34meq700077m6alhpdz6t2',
      status: 'current',
      name: 'English Language and Culture',
      description:
        "From its humble beginnings as one of the languages of Britain, English has spread all over the globe and emerged as the international language of science, media, politics, and technology. Taught entirely in English, this Bachelor's explores the literary, linguistic, and cultural aspects of the English-speaking world. It will allow you to refine your command of the English language and discover the diversity of English through its literature, from its origins to its global expansion and beyond.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/english-language-and-culture/english-language-and-culture.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html',
        'https://www.uva.nl/en/programmes/bachelors/english-language-and-culture/english-language-and-culture.html'
      ],
      notes:
        'Content 4.6: BA English Language and Culture. It is on UvA\'s IB Admissions list: EEA nationals with the IB Diploma are admitted on the diploma alone, without an application file. The diploma finder lists no extra requirement: checked, none required. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34mfi4000d7m6asdcp7elw',
      status: 'current',
      name: 'European Studies',
      description:
        "With one glance at the news, you know that Europe's place in the world, and Europeans' identities, are undergoing rapid developments. In this Bachelor's you will learn to see how the borders, languages, institutions, traditions and populations of Europe have always been ambiguous, and are constantly changing – including now, as new challenges reopen old discussions on power, representation, and equality. Explore these dynamics through an interdisciplinary lens and learn about culture, history, economics, politics, law and international relations.",
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/european-studies/european-studies.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html',
        'https://www.uva.nl/en/programmes/bachelors/european-studies/european-studies.html'
      ],
      notes:
        'Content 4.6: BA European Studies, English track. It is on UvA\'s IB Admissions list: EEA nationals with the IB Diploma are admitted on the diploma alone, without an application file. The diploma finder lists no extra requirement: checked, none required. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34mfrz000f7m6abosburiw',
      status: 'current',
      name: 'Global Arts, Culture and Politics',
      description:
        "In the Bachelor's programme Global Arts, Culture and Politics you will study the greatest challenges facing contemporary society, from climate change to social inequality, through the lens of culture, politics and the arts.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/global-arts-culture-and-politics/global-arts-culture-and-politics.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html',
        'https://www.uva.nl/en/programmes/bachelors/global-arts-culture-and-politics/global-arts-culture-and-politics.html'
      ],
      notes:
        'Content 4.6: BA Global Arts, Culture and Politics, English track. It is on UvA\'s IB Admissions list: EEA nationals with the IB Diploma are admitted on the diploma alone, without an application file. The diploma finder lists no extra requirement: checked, none required. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34qkox000p7md231y03w1r',
      status: 'current',
      name: 'Global Communication Science',
      description:
        'Media and digital technologies connect people worldwide, making communication a more powerful tool than ever. Companies like Google, TikTok, and X influence what we see, hear and believe, but what goes viral in one country may be banned elsewhere. In this programme, you will explore the effect of media across cultures globally. Study with students from different countries and prepare for an exciting career in an international environment.',
      field: 'Media',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/communication-science/communication-science.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html',
        'https://www.uva.nl/en/programmes/bachelors/communication-science/communication-science.html'
      ],
      notes:
        'Content 4.6: BSc Global Communication Science. It is on UvA\'s IB Admissions list: EEA nationals with the IB Diploma are admitted on the diploma alone, without an application file. The diploma finder lists maths for this programme only as "highly recommended" (Applications and Interpretation HL, or Analysis and Approaches SL or HL, at 4), so it is not stored; the programme page asks for mathematics to VWO Wiskunde A level, which the Diploma\'s compulsory maths course meets. Checked, none required. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027. Stored before: Maths AA or Maths AI HL 4.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34mh28000p7m6aqz44djvj',
      status: 'current',
      name: 'Human Geography and Planning',
      description:
        'Learn how cities, towns, and neighbourhoods function and how policies shape daily life. How can we create sustainable, inclusive cities and affordable housing? How does climate change impact our surroundings? You will learn to analyse spatial issues, carry out research, and develop practical solutions, all while studying in the heart of Amsterdam, where the city itself becomes your classroom.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/human-geography-and-planning/human-geography-and-planning.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html',
        'https://www.uva.nl/en/programmes/bachelors/human-geography-and-planning/human-geography-and-planning.html'
      ],
      notes:
        'Content 4.6: BSc Human Geography and Planning, English track (deadline 1 May 2027). It is on UvA\'s IB Admissions list: EEA nationals with the IB Diploma are admitted on the diploma alone, without an application file. The diploma finder lists no extra requirement: checked, none required. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34mjly00197m6aeycfadi9',
      status: 'current',
      name: 'Liberal Arts and Sciences',
      description:
        'Have you always been fascinated by many different topics? Are you interested in more than one subject? Shape your own unique interdisciplinary study programme by combining courses from the sciences, social sciences and humanities by studying Liberal Arts and Sciences at AUC. Our interdisciplinary curriculum empowers you to tackle the most pressing questions in science and society. Many of the most important issues facing society today are too complex to be dealt with using the knowledge of a single subject area.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/amsterdam-university-college/amsterdam-university-college.html',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'SL', grade: 7 }
          ],
          critical: true
        },
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.auc.nl/admissions-aid/admission-requirements/admission-requirements.html',
        'https://www.auc.nl/admissions-aid/admission-requirements/mathematics-requirement/mathematics-requirement.html',
        'https://www.auc.nl/admissions-aid/admission-requirements/english-proficiency/english-proficiency.html',
        'https://www.uva.nl/en/programmes/bachelors/amsterdam-university-college/amsterdam-university-college.html'
      ],
      notes:
        'Content 4.6: BA/BSc Liberal Arts and Sciences, Amsterdam University College (the degree follows the major; the stored Bachelor of Arts is kept). The diploma finder sends AUC applicants to AUC\'s own requirements; applications for September 2027 close 1 December 2026, 1 February 2027 or 1 May 2027. AUC\'s maths requirement "varies per major". Humanities majors: Analysis & Approaches SL 4, Applications & Interpretation SL 7 or HL 4. Social Sciences: AI HL 6, AA SL 5 or AA HL 4. Sciences: AA HL 5, AI HL 6 or AA SL 6 (with a STEM subject: AI HL 6, AA SL 5 or AA HL 4). The lowest route, the Humanities one, is stored as one critical group; the model cannot tie the level to the major. English: an IELTS or TOEFL score, or an alternative proof such as "International Baccalaureate Standard level English at grade 5", stored not critical (English A or B SL 5); AUC may still ask for a test. No IB points figure is published; AUC students average a GPA of 7.0 or above in Dutch terms. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027. Stored before: English A Literature or English A Language and Literature SL 5 (critical).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34mezk00097m6a0egw7qkr',
      status: 'current',
      name: 'Linguistics',
      description:
        "Language is present in all aspects of our daily lives and our capacity to use it makes human beings unique as a species. In the Bachelor's programme in Linguistics, you will explore both the structure and acquisition of language as well as the diversity of language around the world. As a linguist you are interested in the structure and function of language in a broad sense.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.uva.nl/en/programmes/bachelors/linguistics/linguistics.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html',
        'https://www.uva.nl/en/programmes/bachelors/linguistics/linguistics.html'
      ],
      notes:
        'Content 4.6: BA Linguistics. It is on UvA\'s IB Admissions list: EEA nationals with the IB Diploma are admitted on the diploma alone, without an application file. The diploma finder lists no extra requirement: checked, none required. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34mf8q000b7m6apfk5jh19',
      status: 'current',
      name: 'Literary and Cultural Analysis',
      description:
        "What do literature, social media, art installations, political speeches, and museums have in common? They offer perfect insight into the larger philosophical questions and social challenges of our time. In the Bachelor's Literary and Cultural Analysis, you become an expert in engaging with these cultural expressions so that you can work on urgent questions about the climate crisis, political polarisation, and structural inequalities.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/literary-and-cultural-analysis-literary-studies/literary-studies-literary-and-cultural-analysis.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html',
        'https://www.uva.nl/en/programmes/bachelors/literary-and-cultural-analysis-literary-studies/literary-studies-literary-and-cultural-analysis.html'
      ],
      notes:
        'Content 4.6: BA Literary and Cultural Analysis. It is on UvA\'s IB Admissions list: EEA nationals with the IB Diploma are admitted on the diploma alone, without an application file. The diploma finder lists no extra requirement: checked, none required. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34mg19000h7m6a0c1u3thp',
      status: 'current',
      name: 'Media and Culture',
      description:
        "From anime and arthouse cinema to dating apps and reality TV, our lives are filled with media that shape how we see and act in the world. The Bachelor's Media and Culture puts the rapidly changing global media landscape centre stage and teaches students to engage critically with it through specialisations in film, television and cross-media culture. You'll learn to do advanced media research, combining this with creative assignments and production skills to give you an edge in your future career.",
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/media-and-culture/media-and-culture.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html',
        'https://www.uva.nl/en/programmes/bachelors/media-and-culture/media-and-culture.html'
      ],
      notes:
        'Content 4.6: BA Media and Culture, English track. It is on UvA\'s IB Admissions list: EEA nationals with the IB Diploma are admitted on the diploma alone, without an application file. The diploma finder lists no extra requirement: checked, none required. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34mgac000j7m6asl9zhloq',
      status: 'current',
      name: 'Media and Information',
      description:
        "From social media platforms to the latest in AI, contemporary life is shaped by ever more complex information technologies. The international Bachelor's in Media and Information prepares students for careers at the intersection of technology, information and culture by teaching them to engage critically with new media and the impacts of digitalisation.",
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/media-and-information/media-and-information.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html',
        'https://www.uva.nl/en/programmes/bachelors/media-and-information/media-and-information.html'
      ],
      notes:
        'Content 4.6: BA Media and Information. It is on UvA\'s IB Admissions list: EEA nationals with the IB Diploma are admitted on the diploma alone, without an application file. The diploma finder lists no extra requirement: checked, none required. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34qk28000d7md2lw4k6s3s',
      status: 'current',
      name: 'Political Science',
      description:
        "Politics is everywhere, and it's about more than governments and political parties. Prepare to delve beneath the surface and explore how societies function, discovering ways to make a positive impact in communities and the world.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/political-science/political-science.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html',
        'https://www.uva.nl/en/programmes/bachelors/political-science/political-science.html'
      ],
      notes:
        'Content 4.6: BSc Political Science, English track: a numerus fixus of 345 places filled by an unweighted lottery, deadline 15 January. It is on UvA\'s IB Admissions list: EEA nationals with the IB Diploma are admitted on the diploma alone, without an application file. The diploma finder lists maths for this programme only as "highly recommended" (Applications and Interpretation HL, or Analysis and Approaches SL or HL, at 4), so it is not stored; the programme page asks for mathematics to VWO Wiskunde A level, which the Diploma\'s compulsory maths course meets. Checked, none required. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027. Stored before: Maths AA or Maths AI HL 4.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34qmr8001p7md2g7ufqara',
      status: 'current',
      name: 'Politics, Psychology, Law and Economics (PPLE)',
      description:
        "PPLE is a small-scale, interdisciplinary Bachelor's programme that connects 4 disciplines: Politics, Psychology, Law and Economics. At PPLE we approach societal challenges from different angles in order to enhance our understanding of the world around us. By combining insights from these four disciplines, we aim to find innovative and sustainable solutions that help make today's world a better place for tomorrow.",
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/politics-psychology-law-and-economics/politics-psychology-law-and-economics.html',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://pple.uva.nl/how-to-apply/entry-requirements/requirements-per-diploma-type/your-entry-requirements.html',
        'https://www.uva.nl/en/programmes/bachelors/politics-psychology-law-and-economics/politics-psychology-law-and-economics.html'
      ],
      notes:
        'Content 4.6: BA Politics, Psychology, Law and Economics (PPLE College), selective. PPLE\'s requirements per diploma ("applies to the September 2027 intake") and the diploma finder: "34 points total based on 6 subjects (excl. extra points for TOK and EE)", so 34 is out of 42 and is stored as published, as McGill\'s and Waterloo\'s are; Mathematics "Analysis & Approaches SL/HL: minimum grade 4. Applications & Interpretations HL: minimum grade 4 (Applications & Interpretations SL is not sufficient)", stored as one critical group; English "Group 1 English A or Group 2 English B: minimum grade 5", stored not critical (English A or B SL 5), because supplementary English test results can replace it. Maths AI SL is no longer accepted, and English B was missing. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027. Stored before: English A Literature or English A Language and Literature SL 5 (critical); Maths AA or Maths AI SL 4 (critical).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34qkdf000j7md2eh0szm7i',
      status: 'current',
      name: 'Psychology',
      description:
        "Delve into academic research and unravel the complexities of the human mind, gaining insights to help others overcome challenges. Whether it's in the workplace, understanding consumer behaviour, or addressing mental health, psychology offers a broad perspective to navigate various aspects of the human experience.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.uva.nl/en/programmes/bachelors/psychology/psychology.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html',
        'https://www.uva.nl/en/programmes/bachelors/psychology/application-and-admission/international-prior-education/application-and-admission.html',
        'https://www.uva.nl/en/programmes/bachelors/psychology/psychology.html'
      ],
      notes:
        'Content 4.6: BSc Psychology, English track: a numerus fixus of 300 places for 2027-2028, applications 1 October 2026 to 15 January 2027, ranking numbers on 15 April 2027. It is on UvA\'s IB Admissions list: EEA nationals with the IB Diploma are admitted on the diploma alone, without an application file. The diploma finder lists maths for this programme only as "highly recommended" (Applications and Interpretation HL, or Analysis and Approaches SL or HL, at 4), so it is not stored; the programme page asks for mathematics to VWO Wiskunde A level, which the Diploma\'s compulsory maths course meets. Checked, none required. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027. Stored before: Maths AA or Maths AI HL 4.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34mdye00017m6a2s74fc22',
      status: 'current',
      name: 'Sign Language Linguistics',
      description:
        "Sign languages from all around the world demonstrate interesting similarities, but still they are not mutually intelligible and differ from each other in significant ways. In the Bachelor's in Sign Language Linguistics, you will explore sign languages, their structure, acquisition and use from the perspective of a linguist, while learning NGT (Sign Language of the Netherlands) yourself.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uva.nl/en/programmes/bachelors/sign-language-linguistics-linguistics/sign-language-linguistics.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/programmes/bachelors/sign-language-linguistics-linguistics/sign-language-linguistics.html'
      ],
      notes:
        'Content 4.6: BA Linguistics, Sign Language Linguistics track (taught in English). The diploma finder lists no extra requirement: checked, none required. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk34qjc700017md2l1b5z7yz',
      status: 'current',
      name: 'Sociology',
      description:
        "You ask questions. About inequality, identity, climate, technology, and power. You're curious and engaged, but at times you may feel lost in the chaos of all the information and opinions. Sociology helps you make sense of that chaos, uncover patterns, understand systems of power, and recognise where there's room for change. It doesn't just teach you what's happening in society. It shows you how you can make a difference.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.uva.nl/en/programmes/bachelors/sociology/sociology.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.uva.nl/en/education/admissions/bachelors/entry-requirements-for-international-qualifications.html',
        'https://www.uva.nl/en/education/admissions/bachelors/pilot-international-baccalaureate.html',
        'https://www.uva.nl/en/programmes/bachelors/sociology/sociology.html'
      ],
      notes:
        'Content 4.6: BSc Sociology, English track (deadline 1 May 2027). It is on UvA\'s IB Admissions list: EEA nationals with the IB Diploma are admitted on the diploma alone, without an application file. The diploma finder lists maths for this programme only as "highly recommended" (Applications and Interpretation HL, or Analysis and Approaches SL or HL, at 4), so it is not stored; the programme page asks for mathematics to VWO Wiskunde A level, which the Diploma\'s compulsory maths course meets. Checked, none required. UvA\'s diploma finder, International Baccalaureate entry ("It applies only to applications for the 2027–2028 academic year"): the IB Diploma or Bilingual Diploma is required, and "If your programme is not listed below, no extra/alternative requirements apply". English as an IB exam subject exempts from the English test; otherwise a test is needed, so English is not stored. UvA publishes no IB points figure: 24, the Diploma\'s own minimum, is kept. Checked for 2027. Stored before: Maths AA or Maths AI HL 4.'
    }
  ]
}

export default refresh
