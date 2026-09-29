import type { RefreshFile } from '../lib/refresh'

/**
 * Leiden University: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts leiden-university
 */
const refresh: RefreshFile = {
  university: 'Leiden University',
  entryYear: 2027,
  checkedOn: '2026-09-29',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5wekvr00017mmi92veq1r6',
      status: 'current',
      name: 'African Studies',
      description:
        "Africa is home to around 1.5 billion inhabitants in 54 countries, with a wide range of cultures and languages. As a continent, it is a key player in issues such as climate change and global economy, while its art and literature gain increasingly international appreciation. In the African Studies bachelor's programme you will acquire in-depth knowledge about Africa, from an internal perspective and with a critical eye for the external, often euro-centric approaches of 'Africa'. You will have the choice to study Africa as a continent, its individual regions or individual countries through an interdisciplinary lens.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/african-studies',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/african-studies'
      ],
      notes:
        'Content 4.6: BA African Studies (Faculty of Humanities). The programme page names no required subject: checked, none required. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5wel3x00037mmicchbfzix',
      status: 'current',
      name: 'Archaeology',
      description:
        'Make a meaningful contribution to our knowledge of humankind by studying the activities and behaviour of people from the past. With learnings from history, you will gain new insights into our present-day world. You will look at contemporary issues like migration, globalisation, and climate change through an archaeological lens. With this unique angle, you may contribute to the public debate. Depending on your preferences, you may also immerse yourself in the role of heritage in society.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/archaeology',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/archaeology'
      ],
      notes:
        'Content 4.6: BA Archaeology (Faculty of Archaeology). The programme page names no required subject: checked, none required. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5welbo00057mmibzcv993d',
      status: 'current',
      name: 'Arts, Media and Society',
      description:
        "In Arts, Media and Society you will be able to study a wide range of modern and contemporary art, including painting, video art, photography, installation art, bio-art, games, performance art and digital media art. Art does not exist in isolation, and therefore this programme encourages you to study and interpret art's relationship to our society as well as the role of media in that relationship. This means that when studying visual art within Arts, Media and Society you will also touch upon issues of visual art relating to, for instance, science and politics.",
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/arts-media-and-society',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/arts-media-and-society'
      ],
      notes:
        'Content 4.6: BA Arts, Media and Society (Faculty of Humanities, about 50 first-year students). The programme page names no required subject: checked, none required. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5wemu4000j7mmiayxt71rj',
      status: 'current',
      name: 'Cultural Anthropology and Development Sociology',
      description:
        "Our international bachelor's programme in Cultural Anthropology and Development Sociology challenges you to explore cultural diversity by seeing the world through other people's eyes. You will dive deep into topics that move you, from climate change to racism, LGBTQIA+ rights, homelessness, or child labour to name but a few. At Leiden, there's also more to being an anthropologist than just reading about people or talking to political elites. We offer a unique mix of theory and practice, with students conducting fieldwork, doing internships, and producing films in the Netherlands and abroad.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/cultural-anthropology-and-development-sociology',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/cultural-anthropology-and-development-sociology'
      ],
      notes:
        'Content 4.6: BSc Cultural Anthropology and Development Sociology (Faculty of Social and Behavioural Sciences). Its requirements page sets a mathematics condition only for HBO propaedeutic applicants. The programme page names no required subject: checked, none required. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5wenww000t7mmittmwu3ty',
      status: 'current',
      name: 'Data Science and Artificial Intelligence',
      description:
        'In Leiden we believe: a competent AI engineer, is first and foremost a skilled computer scientist. You will learn to understand how information is created, gain insights into algorithms and learn programming skills. Teaching is directly inspired by current research, students can participate in research projects, and they will be encouraged to engage in critical thinking and develop problem solving skills. The programme is organized by LIACS, the Leiden Institute of Advanced Computer Science.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/data-science-and-artificial-intelligence',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/binaries/content/assets/studentenwerving/scm/admission-and-application/specific-diploma-requirements-science-programmes.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/data-science-and-artificial-intelligence'
      ],
      notes:
        'Content 4.6: BSc Data Science and Artificial Intelligence (Faculty of Science). Leiden\'s "Specific diploma requirements for science and medical programmes 2027-2028", "Specific requirements 2027-2028": "Data Science & Artificial Intelligence (Eng): Analysis & Approaches HL"; no grade is named, and the stored Maths AA HL 4 (critical) already matched. One stale line in that document\'s notes still says "valid for admission to the academic year 2026-2027 only"; its title, headers and table say 2027-2028. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5welju00077mmi3o3x7xow',
      status: 'current',
      name: 'Dutch Studies',
      description:
        'The historical, cultural and philosophical impact of the Netherlands and the Dutch language is internationally significant. Dutch Studies is the only programme in the Netherlands for international students who wish to specialise in the Dutch language, culture, history and society at a high academic level. The unique combination of Dutch Studies and your own native language and culture will turn you into the ideal person to build intercultural connections after your study.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/dutch-studies',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/dutch-studies'
      ],
      notes:
        'Content 4.6: BA Dutch Studies (Faculty of Humanities), taught in Dutch and English, open to beginners in Dutch. The programme page names no required subject: checked, none required. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5welrh00097mmi15ktxgz2',
      status: 'current',
      name: 'English Language and Culture',
      description:
        "English is a truly global language, the mother tongue of approximately 380 million people and spoken as a second language by over a billion more. As an English bachelor's student in Leiden, you will acquire an excellent command of spoken and written English, while also learning to understand the language structure and the mechanics behind language acquisition. Moreover, you will have the chance to study the culture of Great Britain and other English-speaking countries in-depth, while analysing the relation between language changes and societal changes over the ages.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/english-language-and-culture',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/english-language-and-culture'
      ],
      notes:
        'Content 4.6: BA English Language and Culture (Faculty of Humanities). The programme page names no required subject: checked, none required. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5wen1r000l7mmigobtiyck',
      status: 'current',
      name: 'International Relations and Organisations',
      description:
        "The international, English-taught 3-year programme of IRO is part of Leiden University's Political Science curriculum and is based in The Hague, the city in which politics and international relations converge. In this specialised bachelor's programme you'll address transboundary issues from a social sciences point of view. IRO has a strong focus on diplomacy and current world problems, with particular attention paid to the role of major powers such as China, Russia, the USA and the EU, and organisations such as the IMF, NATO, UN, and the World Bank.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/political-science/international-relations-and-organisations',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/political-science/international-relations-and-organisations'
      ],
      notes:
        'Content 4.6: BSc Political Science: International Relations and Organisations (Faculty of Social and Behavioural Sciences). Its requirements page asks for mathematics "equivalent to the level of mathematics at Dutch VWO level", taken until graduation and covering "probability and statistics". The Diploma\'s compulsory maths course meets that (both Analysis and Approaches and Applications and Interpretation cover statistics and probability), so nothing is stored: checked, none required beyond the Diploma. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5welzc000b7mmif68g8o6q',
      status: 'current',
      name: 'International Studies',
      description:
        'The International Studies programme will provide you with the tools to study regional topics, developments and phenomena from a humanities perspective and put them in a global context. You will acquire in-depth knowledge of one of eight world regions and learn one of the key languages. Our multifaceted approach will allow you to interpret and analyse the world from a humanities perspective. In order to be able to do this, you will explore the historical and cultural background of the region of your choice, as well as its political and economic developments.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/international-studies',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/international-studies'
      ],
      notes:
        'Content 4.6: BA International Studies (Faculty of Humanities, The Hague). The programme page names no required subject: checked, none required. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5weohi00137mmih9j24fot',
      status: 'current',
      name: 'Liberal Arts and Sciences: Global Challenges',
      description:
        'Leiden University College (LUC) offers a Liberal Arts & Sciences programme: a challenging programme inspired by the great minds of ancient Greece, who saw the value in learning about a variety of subjects. When you approach learning this way, you increase your ability to see connections between different fields and find innovative solutions to pressing problems. The focus of the programme is on the Global Challenges of today: Peace & Justice, Sustainability, Diversity and Prosperity. You will study the Global Challenges through the lenses of various disciplines, before picking one or two to pursue in more depth.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/governance-and-global-affairs/luc/admissions-office/luc-admission-requirements-2026-2027.pdf',
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/admission-and-application/application-deadlines',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college'
      ],
      notes:
        'Content 4.6: BA/BSc Liberal Arts and Sciences: Global Challenges, Leiden University College The Hague ("Bachelor of Science / Arts, depending on major"; the stored Bachelor of Arts is kept). LUC\'s diploma list, "For admission to the academic year 2027-2028" (the file name still says 2026-2027): Leiden\'s general requirement, the IB Diploma, plus LUC\'s own selection requirement, "An average of 35 points including bonus is required to partake in the selection process for admission to LUC The Hague". 35 (out of 45, core included) is stored as that published minimum; it was stored as 24. "Mathematics advice: all math courses are sufficient for admission with a grade 4" is advice, not a requirement: checked, none required. Selective (early bird 1 December 2026, regular deadline 15 March 2027 for the September 2027 intake). Students choose their major at the end of the first year. An English-taught IB or English A HL exempts from the English test. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5wem72000d7mmi2vjwzken',
      status: 'current',
      name: 'Linguistics',
      description:
        'How do children acquire their native language? Why are some politicians better at convincing the electorate than others? How have Germanic languages developed over the centuries? How and why do languages differ from one another? These are the kind of questions linguists seek to answer. In this programme you will explore many different aspects of language. In your first year you will obtain a broad knowledge base. In your second and third year you will focus on the specialisation of your choice.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/linguistics',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/linguistics'
      ],
      notes:
        'Content 4.6: BA Linguistics (Faculty of Humanities). The programme page names no required subject: checked, none required. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5weopd00157mmiioxx6mjm',
      status: 'current',
      name: 'LUC: Culture, History and Society',
      description:
        'The Culture, History and Society (CHS) Major at Leiden University College The Hague combines conceptual and methodological insights from the social sciences (anthropology, geography and sociology) and humanities (art history, cultural studies, history and literature). Our aim is to appreciate, examine and understand the density of social life in its cultural, historical, moral and political manifestations. We explore ideas central to modern cities, migration, gender, race, coloniality, heritage, inequality and power by looking both at dynamics in social relations and the relations between humans and the environment.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/culture-history-society-ba',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/governance-and-global-affairs/luc/admissions-office/luc-admission-requirements-2026-2027.pdf',
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/admission-and-application/application-deadlines',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/culture-history-society-ba'
      ],
      notes:
        'Content 4.6: Culture, History and Society, a BA major of Liberal Arts and Sciences: Global Challenges at Leiden University College The Hague. LUC\'s diploma list, "For admission to the academic year 2027-2028" (the file name still says 2026-2027): Leiden\'s general requirement, the IB Diploma, plus LUC\'s own selection requirement, "An average of 35 points including bonus is required to partake in the selection process for admission to LUC The Hague". 35 (out of 45, core included) is stored as that published minimum; it was stored as 24. "Mathematics advice: all math courses are sufficient for admission with a grade 4" is advice, not a requirement: checked, none required. Selective (early bird 1 December 2026, regular deadline 15 March 2027 for the September 2027 intake). Students choose their major at the end of the first year. An English-taught IB or English A HL exempts from the English test. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5weox600177mmij3a3f3ln',
      status: 'current',
      name: 'LUC: Earth, Energy and Sustainability',
      description:
        'The Earth, Energy and Sustainability (EES) Major operates at the forefront of environmental sciences, with a balance between understanding key concepts within a classroom setting, and applying the gained knowledge in real-life situations, both in the field and in the laboratory. What are some of the key environmental challenges related to population growth now, and in the future? What can you do to make a real change in this world? At LUC we emphasize that sustainability ultimately exists within a human context, with many crosslinks to the social sciences.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/earth-energy-and-sustainability-bsc',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/governance-and-global-affairs/luc/admissions-office/luc-admission-requirements-2026-2027.pdf',
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/admission-and-application/application-deadlines',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/earth-energy-and-sustainability-bsc'
      ],
      notes:
        'Content 4.6: Earth, Energy and Sustainability, a BSc major of Liberal Arts and Sciences: Global Challenges at Leiden University College The Hague. LUC\'s diploma list, "For admission to the academic year 2027-2028" (the file name still says 2026-2027): Leiden\'s general requirement, the IB Diploma, plus LUC\'s own selection requirement, "An average of 35 points including bonus is required to partake in the selection process for admission to LUC The Hague". 35 (out of 45, core included) is stored as that published minimum; it was stored as 24. "Mathematics advice: all math courses are sufficient for admission with a grade 4" is advice, not a requirement: checked, none required. Selective (early bird 1 December 2026, regular deadline 15 March 2027 for the September 2027 intake). Students choose their major at the end of the first year. An English-taught IB or English A HL exempts from the English test. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5wep4w00197mmiebseqnwm',
      status: 'discontinued',
      name: 'LUC: Global Health, Innovation and Society',
      description:
        'The interdisciplinary Global Health, Innovation and Society Major at Leiden University College The Hague covers biomedicine and policy within a critical global health lens. The main goal is to make a difference in the health communities by examining individual, sociocultural and environmental factors that impact well-being. It combines both a biomedical as well as social perspective on global health. The major includes a biomedical sciences track which collaborates with the LUMC and a health data science track which combines innovative approaches such as AI and data science for health.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/global-health-innov-soc-bsc',
      requirements: [],
      checkedFor: null,
      sources: [],
      notes:
        "Content 4.6: Global Health, Innovation and Society (the former Global Public Health major) is gone from LUC's majors. LUC's programme page and its majors page (29 September 2026) list five majors: Culture, History and Society; Earth, Energy and Sustainability; Governance, Economics and Development; International Justice; World Politics. The Internet Archive's 8 March 2026 copy of the majors page still listed Global Health, Innovation and Society, and its page answered until at least 20 April 2026; the stored URL now returns 404. No notice of the change was found. Not written; the owner decides."
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5wepcn001b7mmizovxuo2d',
      status: 'current',
      name: 'LUC: Governance, Economics and Development',
      description:
        'Inequality and difference in the prosperity within and across societies concerns us. However, people seldom consider the fact that most inequality is result of human choices: over time, different societies organize themselves in different ways, these differences may affect the quality of peoples lives. This Major Governance, Economics and Development is designed to give students the tools to better understand these processes and identify how tools of governance can be used to enhance or impair development and prosperity by integrating insights from Anthropology, Data Science, Development Studies, Economics, Political Science, and Public Policy.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/governance-economics-and-development-bsc',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/governance-and-global-affairs/luc/admissions-office/luc-admission-requirements-2026-2027.pdf',
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/admission-and-application/application-deadlines',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/governance-economics-and-development-bsc'
      ],
      notes:
        'Content 4.6: Governance, Economics and Development, a BSc major of Liberal Arts and Sciences: Global Challenges at Leiden University College The Hague. LUC\'s diploma list, "For admission to the academic year 2027-2028" (the file name still says 2026-2027): Leiden\'s general requirement, the IB Diploma, plus LUC\'s own selection requirement, "An average of 35 points including bonus is required to partake in the selection process for admission to LUC The Hague". 35 (out of 45, core included) is stored as that published minimum; it was stored as 24. "Mathematics advice: all math courses are sufficient for admission with a grade 4" is advice, not a requirement: checked, none required. Selective (early bird 1 December 2026, regular deadline 15 March 2027 for the September 2027 intake). Students choose their major at the end of the first year. An English-taught IB or English A HL exempts from the English test. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5wepkd001d7mmiytc1x6fq',
      status: 'current',
      name: 'LUC: International Justice',
      description:
        'The International Justice (IJ) Major at Leiden University College The Hague explores challenges to justice and the rule of law in a globalizing and pluralistic society. These include the realization of human rights, climate justice, ending impunity for war crimes and economic and political integration. While international law and institutions serve as the starting point for many key issues, the Major focuses also on national and regional legal orders as well as relevant transnational and local norms and actors. The Major analyzes how norms, laws and institutions operate in practice through comparative and interdisciplinary approaches.',
      field: 'Law',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/international-justice-ba',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/governance-and-global-affairs/luc/admissions-office/luc-admission-requirements-2026-2027.pdf',
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/admission-and-application/application-deadlines',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/international-justice-ba'
      ],
      notes:
        'Content 4.6: International Justice, a BA major of Liberal Arts and Sciences: Global Challenges at Leiden University College The Hague. LUC\'s diploma list, "For admission to the academic year 2027-2028" (the file name still says 2026-2027): Leiden\'s general requirement, the IB Diploma, plus LUC\'s own selection requirement, "An average of 35 points including bonus is required to partake in the selection process for admission to LUC The Hague". 35 (out of 45, core included) is stored as that published minimum; it was stored as 24. "Mathematics advice: all math courses are sufficient for admission with a grade 4" is advice, not a requirement: checked, none required. Selective (early bird 1 December 2026, regular deadline 15 March 2027 for the September 2027 intake). Students choose their major at the end of the first year. An English-taught IB or English A HL exempts from the English test. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5weps5001f7mmin1k39c8e',
      status: 'current',
      name: 'LUC: World Politics',
      description:
        'In the World Politics Major, we examine interactions between states, and between states and non-state actors, including multinational corporations, nongovernmental organisations, civil societies, diasporas and armed groups. We start from the assumption that political inter-group conflict is a key driver of these interactions, which can escalate into armed conflicts, or can be managed, resolved and transformed through improved forms of cooperation. Particular attention is paid to how governments interact with each other, and how they interact with non-state actors.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/world-politics-ba',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/governance-and-global-affairs/luc/admissions-office/luc-admission-requirements-2026-2027.pdf',
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/admission-and-application/application-deadlines',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/liberal-arts-and-sciences-global-challenges-leiden-university-college/world-politics-ba'
      ],
      notes:
        'Content 4.6: World Politics, a BA major of Liberal Arts and Sciences: Global Challenges at Leiden University College The Hague. LUC\'s diploma list, "For admission to the academic year 2027-2028" (the file name still says 2026-2027): Leiden\'s general requirement, the IB Diploma, plus LUC\'s own selection requirement, "An average of 35 points including bonus is required to partake in the selection process for admission to LUC The Hague". 35 (out of 45, core included) is stored as that published minimum; it was stored as 24. "Mathematics advice: all math courses are sufficient for admission with a grade 4" is advice, not a requirement: checked, none required. Selective (early bird 1 December 2026, regular deadline 15 March 2027 for the September 2027 intake). Students choose their major at the end of the first year. An English-taught IB or English A HL exempts from the English test. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5wemem000f7mmi6v5vx8x8',
      status: 'current',
      name: 'Philosophy: Global and Comparative Perspectives',
      description:
        'Philosophy is about the Big Questions: do human beings have free will? Is capitalism a just system? Does science provide an objective picture of the world? At Leiden, you will investigate fundamental questions of this sort from a global perspective. Through careful examination of different philosophical world traditions, you will develop the skills to navigate the complex world of the present and to tackle scientific and societal problems. Leiden is the only Dutch university, and one of only a few in the world, to offer a philosophy programme that combines Western perspectives with those of India, East Asia, Africa, and the Arab world.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/philosophy-global-and-comparative-perspectives',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/philosophy-global-and-comparative-perspectives'
      ],
      notes:
        'Content 4.6: BA Philosophy: Global and Comparative Perspectives (Faculty of Humanities). The programme page names no required subject: checked, none required. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5wen9f000n7mmikeru661q',
      status: 'current',
      name: 'Psychology',
      description:
        "Would you like to know why a conflict arises among your friends or why your grandmother with Alzheimer's keeps forgetting who you are? Why do we behave differently when we're in a group? What can we do about depression? These are questions psychologists try to find answers to. And the best thing is, most psychological topics are applicable to your own life. Are you fascinated by human behaviour? Do you always wonder what's behind your first impression of someone? Then studying Psychology may be just the right choice for you!",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/psychology',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/psychology/admission-and-application/selection-and-placement',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/psychology'
      ],
      notes:
        'Content 4.6: BSc Psychology, International Bachelor (Faculty of Social and Behavioural Sciences): a numerus fixus of 600 places shared with the Dutch-taught programme, deadline 15 January, selection by school grade average, an online assessment and a draw, for "academic year 2027-2028". Its requirements page asks for mathematics "at pre-university level (i.e. VWO)", taken "throughout your entire high school career"; the Diploma\'s compulsory maths course meets that, so nothing is stored: checked, none required beyond the Diploma. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5weo6m000x7mmi2uhhgodx',
      status: 'current',
      name: 'Science for Sustainable Societies',
      description:
        "In these challenging times bright minds are needed that are able to come up with out-of-the-box ideas. This bachelor's programme is designed to help you take on today's challenges in order to create a better tomorrow – at a local, national, or international level. You will acquire in-depth knowledge about the various aspects of sustainability and environmental issues. At the same time, you will obtain practical skills such as working in teams, communication, programming and project management. The programme focuses on planet, people, and politics through natural sciences, social science, and governance.",
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/science-for-sustainable-societies',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        {
          courses: ['BIO', 'CHEM', 'PHYS', 'ECON', 'GEOG', 'ESS'],
          level: 'HL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/binaries/content/assets/studentenwerving/scm/admission-and-application/specific-diploma-requirements-science-programmes.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/science-for-sustainable-societies'
      ],
      notes:
        'Content 4.6: BSc Science for Sustainable Societies (Faculty of Science, The Hague). Leiden\'s "Specific diploma requirements for science and medical programmes 2027-2028": "Analysis & Approaches SL/HL or Applications & Interpretation HL + 1 HL and 1 SL subject in the following subjects: Biology, Chemistry, Physics, Economics, Geography, Environmental Systems and Societies". No grades are named; 4 is stored. Stored: Maths AA SL 4 or Maths AI HL 4, one critical group, and Biology, Chemistry, Physics, Economics, Geography or ESS at HL 4, one critical group. The model cannot hold the second subject from the list at SL (a "two of" rule); it is in these notes. The stored rows (Maths AI HL and Maths AA SL as two separate, non-critical rows) required both maths courses and no science. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027. Stored before: Maths AI HL 4; Maths AA SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5wenh8000p7mmikncyfnmk',
      status: 'current',
      name: 'Security Studies',
      description:
        'Terrorism, cybercrime, natural disasters and other issues affect the security and safety of millions each day. In Security Studies you learn to unravel security challenges by focusing on the political, historical and societal context in which they arise, as well as the effect of governance, institutions, and the media. You gain an academic perspective, and the ability to think critically about complex issues, while taking all relevant factors of specific security challenges into account. You will have classes in the centre of The Hague: the international City of Peace, Justice and Security.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/security-studies',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/security-studies/admission-and-application/admission',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/security-studies'
      ],
      notes:
        'Content 4.6: BSc Security Studies (Faculty of Governance and Global Affairs, The Hague). Its admission page names no required subject, only English proficiency and a compulsory matching activity: checked, none required. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5wemma000h7mmif2u232h1',
      status: 'current',
      name: 'South and Southeast Asian Studies',
      description:
        "In the South and Southeast Asian Studies programme you gain a thorough understanding of the history, cultures, and politics of a region which is home to almost a third of the world's population and to some of the world's fastest-growing economies such as India and Indonesia. Development and inequality, ethnic and religious conflict, political and cultural movements, and tensions between modernity and tradition are all addressed in lectures and seminars. Language is the key to knowing and understanding a culture, and you will learn either Hindi, Sanskrit, Tibetan, or Indonesian.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/south-and-southeast-asian-studies',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/south-and-southeast-asian-studies'
      ],
      notes:
        'Content 4.6: BA South and Southeast Asian Studies (Faculty of Humanities). The programme page names no required subject: checked, none required. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-08.
    {
      id: 'cmk5wenp1000r7mmi3mjy9tyr',
      status: 'current',
      name: 'Urban Studies',
      description:
        'In 2050, around 70% of the world population is expected to live in urban centres. This offers a vast number of social and economic opportunities, but the challenges of urban growth are daunting. As a student of our Urban Studies programme, you will develop the academic and practical skills needed to deal with the challenges of urban life. Urban Studies is built on four themes: the sustainable city, the multicultural city, the safe city and the healthy city. You will have the opportunity to specialise in one or several of these themes.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/urban-studies',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.universiteitleiden.nl/binaries/content/assets/algemeen/onderwijs/general-admission-diploma-requirements.pdf',
        'https://www.universiteitleiden.nl/en/education/study-programmes/bachelor/urban-studies'
      ],
      notes:
        'Content 4.6: BA Urban Studies (Faculty of Humanities, The Hague). The programme page names no required subject: checked, none required. Leiden\'s "General admission: diploma requirements 2027/2028" (16 September 2026): "The International Baccalaureate Diploma (IB DP) is required for general admission"; individual IB certificates are not accepted, and only programmes in the sciences, medicine, classics, cyber security and economics & society "require knowledge of compulsory subjects at Dutch VWO (pre-university diploma) level". An IB Diploma taught in English or with English A HL exempts from the English test. Leiden publishes no IB points figure for this programme: 24, the Diploma\'s own minimum, is kept. Checked for 2027.'
    }
  ]
}

export default refresh
