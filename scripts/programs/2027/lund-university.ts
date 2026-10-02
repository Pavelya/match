import type { RefreshFile } from '../lib/refresh'

/**
 * Lund University: requirements for 2027 entry.
 *
 * Exported from the database on 2026-10-02 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts lund-university
 */
const refresh: RefreshFile = {
  university: 'Lund University',
  entryYear: 2027,
  checkedOn: '2026-10-02',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cml69y3yd000cl8040djsj4rd',
      status: 'current',
      name: 'Development Studies – Bachelor of Science (BIDS)',
      description:
        "The interdisciplinary Bachelor's programme in Development Studies (BIDS) focuses on economic, social, and political processes linked to development. As our student, you learn to critically examine global and local preconditions and processes of development.\n\nBIDS – Programme Structure\nBIDS is a three-year programme that brings together the perspectives of different social sciences to the study of development. As members of an interdisciplinary programme, students follow general courses in development studies and specialized courses at any of the four departments that are part of BIDS: Economic history, Human geography, Political science, and Sociology. This means that, by the end of your studies, you will have a degree in development studies with a major area of specialization in one of these disciplines.\n\nDuring the first year, BIDS students take four courses that establish the basic theoretical and methodological foundations for development studies. Towards the end of the year, students choose a discipline for their major.\n\nThe second year starts by offering students the opportunity to gain more specialized knowledge by taking courses in the discipline they chose for their major. \n\nDuring the third year, BIDS students are invited to put into practice the knowledge and skills that they have developed during the first two years of the programme. The sixth semester is divided into two components. During the first half of the semester, students can either get a head start on their thesis by pursuing a desk-study track, going on fieldwork abroad, or pursue an internship. The semester ends with a full course devoted to writing a bachelor thesis. \n\nInternship, Fieldwork, and desk studies \nStudents have carried out internships across a wide variety of organizations, for example the Swedish Embassy in Bolivia, MSI Reproductive Choices in Ethiopia or the National Nutrition Development Council in Senegal.\n\nBIDS students are also eligible to apply for grants to carry out field research in another country. In the past, our students have benefitted from these opportunities to carry out research on topics such as climate adaptation practices by small-scale farmers in Tanzania, indigenous movements in Southern Mexico, and women’s representation in the Senegalese Parliament.\n\nAlternatively, BIDS students can also decide to stay in Lund and pursue a desk study track.\n\nCareer prospects\nOur graduates tend to be very successful at securing admission to prestigious graduate programmes, and can pursue exciting and impactful careers.\n\nOur students will get both the theoretical knowledge and the practical skills needed for jobs in the development sector. Upon graduation, our students can continue with Master’s and Doctoral studies; or pursue various positions within government agencies, private firms, and NGOs. The opportunities are many and varied.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.lunduniversity.lu.se/study/development-studies-bachelor-of-science-programme-SGUTV',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://www.lunduniversity.lu.se/study/development-studies-bachelor-of-science-programme-SGUTV',
        'https://kursplaner.lu.se/pdf/program/en/SGUTV',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: the stored /lubas/ address redirects to the study page, which shows Autumn 2027 (start 30 August 2027; the syllabus is valid from autumn 2027). Entry requirements: general requirements plus English 6 and Social Studies 1b or 1a1+1a2. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. Checked, no other subject required: the stored critical group of Economics, Geography, History or Psychology had no source and is removed. Selection: in the early international round, entirely on the secondary school GPA (the converted IB total); in the national round, GPA 66% and the Swedish aptitude test 34%. Degree of Bachelor of Science in Development Studies. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored."
    },
    // Stored: not checked for any intake.
    {
      id: 'cml69tf5f0006l804myr5dbm7',
      status: 'current',
      name: 'Economy and Society – Bachelor’s Programme',
      description:
        'How can understanding economic change in the past foster future sustainable development? The programme is taught in English and aimed at recent high school graduates with a strong academic background, international career ambitions, and the drive to gain knowledge and skills in global context analysis, both in the public and private sector.\n\nYou will study at the department of economic history, where teaching is concerned with how understanding economic change in the past can help us shape the future. Economic historians use concepts and theories from the social sciences to study the development of economies in many different social, political and cultural contexts. They combine the skills of the economist and the historian, the statistician and the sociologist. Most courses are taught at the department of economic history, but the program also contains four courses taught at the department of economics.\n\nThis programme combines the two complementary fields of economic history and economics. It will appeal if you want training in the application of economic theory and quantitative methods to real problems.\n\nYou will examine important global issues, for example mechanisms driving economic growth and development over time at both national and regional levels, and the importance of education and human capital in economic change.\n\nYou will also learn about future sustainable development at the national, company and household levels. While the scope is global, the Scandinavian experience will be central when identifying lessons to be learned.\n\nThe BSc in Economy and Society offers:\n\nA vast, yet focused curriculum in economic history and economics, combined with complementing electives in other social sciences\nInternational perspectives from faculty members and students\nTeam-based projects enhancing cross-cultural learning\nOpportunities of internships in companies and/or exchange studies abroad at one of our partner universities\nStudy and career advice\n\nCareer prospects\nThe skills you will develop by studying economy and society are attractive to a range of employers. Our graduates are likely to find work in a variety of industries, including politics and government, banking and finance, NGOs, charities and international development, as well as in the press and media.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.lunduniversity.lu.se/study/economy-and-society-bachelors-programme-EGESO',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 3 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://www.lunduniversity.lu.se/study/economy-and-society-bachelors-programme-EGESO',
        'https://kursplaner.lu.se/pdf/program/en/EGESO',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: the study page shows Autumn 2027 (start 30 August 2027). Entry requirements: general requirements plus English 6, Mathematics 3b or 3c and Social Studies 1b or 1a1+1a2. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. Maths is now critical (stored as Maths AA SL 4, not critical). Selection: in the early international round, entirely on the secondary school GPA (the converted IB total); in the national round, GPA 66% and the Swedish aptitude test 34%. Degree of Bachelor of Science. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored (was 36, which no Lund page gives; competition for places is a matter of rank, not a published minimum)."
    },
    // Stored: not checked for any intake.
    {
      id: 'cml69qyyi0001l804s0t4uj0a',
      status: 'current',
      name: 'Fine Arts – Bachelor’s Programme',
      description:
        'The Bachelor of Fine Arts is a three-year full-time study programme that aims to educate artists with high artistic and professional ability. The programme has a distinct international profile and prepares students for an international career. The programme’s internationally active professors work in a range of different artistic fields.  Not only does this lead to important interaction at Malmö Art Academy but it also provides students with the opportunity to choose courses that reflect their own artistic intentions.\n\nThe programme is characterised by freedom of choice and independent study, consisting of individual studio work, individual supervision from internationally active professors and other teaching staff as well as elective courses in the major fields of technique, creation and theory. The degree project consists of an artistic project presented in a group exhibition and a short written assignment. The main language of instruction and supervision is English.\n\nThe Bachelor of Fine Arts programme prepares the students to independently create and operate in different professional capacities, as well as working in a constantly changing cultural scene. The programme is also a foundation for further studies in a Master’s programme in Fine Arts.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Fine Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.lunduniversity.lu.se/study/fine-arts-bachelors-programme-KGFKO',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://www.lunduniversity.lu.se/study/fine-arts-bachelors-programme-KGFKO',
        'https://kursplaner.lu.se/pdf/program/en/KGFKO'
      ],
      notes:
        "Content 4.8: the study page shows only Autumn 2026, so checked for 2026. Entry requirements: general requirements for university studies in Sweden; selection by admission exam (work samples) and interview, not modelled (Malmö Art Academy). Checked, no subject required beyond English 6, part of the general requirements: UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. Degree of Bachelor of Fine Arts in Visual Arts. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored."
    },
    // Stored: not checked for any intake.
    {
      id: 'cml5d39xg0006jv04vva01ez1',
      status: 'current',
      name: "Folk- and World Music - Bachelor's Programme",
      description:
        'Malmö Academy of Music is a leading educational institution specialised in musical studies, training, and research. We offer programmes aimed at students who want to work professionally as musicians, church musicians, composers or music teachers. With a clear international profile, we move art forward – always with the passion for music and learning at our core.\n\nThe Performance Programme, World Music, aims to train musicians that possess excellent artistic and professional qualities. The programme is offered to both instrument players and vocalists with a background in folk music or non-Western classical music. After the successful completion of the programme of study, students shall have sufficient knowledge, understanding and skills to be able to pursue a career within various professional areas.\n\nThe student must also have developed the skills necessary for continued or in-depth studies that are to a great degree autonomous. Furthermore, on completion of the programme, the student must have acquired basic entrepreneurial skills that increase his/her professional versatility in an ever-changing cultural life.\n\nThe academic year is divided into weeks of scheduled classes, project weeks and weeks for independent studies as well as examination and assignment weeks.\n\nOnce the programme is successfully completed, students are awarded a degree of Bachelor in Music.\n\nStudents are also given the opportunity to partake in ensemble classes together with those studying folk music enrolled on the Music Teacher’s programmes.\n\nA number of well-known musicians have visited the Academy as guest lecturers. They have come from both Scandinavian countries and countries beyond Scandinavia such as Cuba, Gambia, England and Chile among others. A list of guest lecturers is decided on by students and those responsible for the programme. Once a year students and staff partake in Nordtrad - a meeting of all the music academies in the Scandinavian and Baltic regions - to meet and exchange experiences with other students and teachers of music. Read more about this at nordtrad.net.\n\nConcert performances of various forms are included and seen as an important part of the programme.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Music',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.lunduniversity.lu.se/study/music-folk-and-world-music-bachelors-programme-KGMUS-FOV%C3%84',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://www.lunduniversity.lu.se/study/music-folk-and-world-music-bachelors-programme-KGMUS-FOV%C3%84',
        'https://kursplaner.lu.se/pdf/program/en/KGMUS'
      ],
      notes:
        "Content 4.8: the study page shows only Autumn 2026, so checked for 2026. Entry requirements: general requirements and the School of Music entrance test; selection by audition, not modelled (Malmö Academy of Music). Checked, no subject required beyond English 6, part of the general requirements: UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. Degree of Bachelor of Music in Performance, Folk- and World Music. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored."
    },
    // Stored: not checked for any intake.
    {
      id: 'cml5dazc9000gjv04c2r71ok0',
      status: 'current',
      name: 'International Business – Bachelor’s Programme',
      description:
        "Companies and organisations that operate in an international context need employees with international competence and skills, including a solid understanding of cross-border, cross-cultural international business, trade, law, and economics.\n\nLund University School of Economics and Management offers a three year Bachelor's in International Business. The programme is taught in English and aimed at recent high school graduates with a strong academic background, international career ambitions, and the drive to gain knowledge and skills in the international business field.\n\nThe BSc in International Business offers:\n\nA vast, yet focused curriculum in business, economics, statistics, business law and information systems\nInternational perspectives from faculty members and students\nTeam-based projects enhancing cross-cultural learning\nOpportunities of internships in companies and/or exchange studies abroad at one of our partner universities\nStudy and career advice\nThe overall purpose of the programme is to prepare you for a career in international business. You will train in advanced problem solving in an international context, and learn theoretical concepts, models, and tools derived from relevant research. This will throughout the programme be related to real and complex business problems.\n\nThe programme has an international focus, and is combining courses in business with courses in economics, economic history, statistics, informatics and business law.\n\nProgramme structure\nIt starts by introducing you to basic concepts and theories within central areas of the programme, including general skills such as for example working in teams, academic writing, and oral presentations.\n\nThe courses that follow after the first semester add additional perspectives and models that provide further, in depth insights into the practical and theoretical areas that are related to the broad field of international business.\n\nAs a final part of the programme, you will conduct your own research project in a small team and demonstrate your ability to independently apply ideas and theories introduced by the different courses. \n\nCareer\nGlobalisation creates new demands on both the employer and the employee. The new competitive landscape makes it essential for existing companies to renew and develop. Companies and organisations that operate in an international context need employees with international competence and skills, including a solid understanding of cross-border, cross-cultural international business, trade, law, and economics. The Bachelor’s in International Business specialises you in how to understand and analyse global trade and its complexity.\n\nThis programme will enable you to compete in the international business labour market as well as add value to domestic firms/employers with international relationships. The skills you develop by studying international business are attractive to a number of employers. Your strength lies in the ability to work with analysis and strategy in an international environment.\n\nAfter graduation, you will be well equipped for junior management positions at large international companies, government institutions or other organisations. Functional areas can include export, import, finance, controlling, business development, sales, marketing and customer care, for example. Or why not go the entrepreneurial route and manage your own international start-up?",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.lunduniversity.lu.se/study/international-business-bachelors-programme-EGIBU',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 3 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://www.lunduniversity.lu.se/study/international-business-bachelors-programme-EGIBU',
        'https://kursplaner.lu.se/pdf/program/en/EGIBU',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: the study page shows Autumn 2027 (start 30 August 2027). Entry requirements: general requirements plus English 6, Mathematics 3b or 3c and Social Studies 1b or 1a1+1a2. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. Maths is now critical (stored as Maths AA SL 4, not critical); the stored Business Management or Economics row had no source and is removed. Selection: in the early international round, entirely on the secondary school GPA (the converted IB total); in the national round, GPA 66% and the Swedish aptitude test 34%. Degree of Bachelor of Science in Business and Economics. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored (was 36, which no Lund page gives; competition for places is a matter of rank, not a published minimum)."
    },
    // Stored: not checked for any intake.
    {
      id: 'cml5d6v1s000bjv04uiozv3b4',
      status: 'current',
      name: 'Mathematics – Bachelor’s Programme',
      description:
        "This Bachelor's programme is designed for students with a strong interest in mathematics, mathematical statistics and scientific computing. The programme is structured in a highly flexible manner in order to give students a solid theoretical knowledge in mathematics at the same time as providing possibilities for each student to pursue his/her own educational profile according to interests and career aspirations.\n\nA vast variety of courses in mathematics, statistics and numerical analysis are available within the programme together with courses from all other science areas, economy and finance, engineering as well as humanities and social sciences. For students with a strong interest in pure mathematics, the programme offers a path of courses at a higher theoretical level that can be continued at Master’s and even further at PhD level. \n\nFor students interested in more applied areas there is a high degree of flexibility in choosing course combinations suitable for certain professions. For instance, courses in mathematical statistics and numerical analysis can be combined with courses in financial mathematics and economics. Another usual path is combining studies in mathematics and physics. Each direction implies a different combination of courses. Predefined recommended course chains suitable for the different directions are available and study counselling is provided throughout the entire programme.\n\nProgramme modules/courses The programme consists of compulsory courses (75 credits), alternative-compulsory courses (30 credits), elective courses (60 credits) and ends with a Bachelor’s degree project (15 credits) on a topic of interest.\n\nCompulsory courses: The first part of the programme covers analysis in one and several variables, foundations of algebra, linear algebra, mathematical statistics and probability theory. These courses constitute the theoretical core that is fundamental to applied mathematics, statistics, mathematical physics, economics and many other areas.\n\nAlternative compulsory courses: After completing the compulsory courses students are offered a wide range of courses in pure mathematics, mathematical statistics and numerical analysis. Discrete mathematics, number theory, abstract algebra, topology, ordinary differential equations, complex analysis, differential geometry are some of the main areas in pure mathematics that are available within this course module. Courses in mathematical statistics, probability theory and scientific computing provide the balance between mathematical theory and practical applications.\n\nElectives courses can be chosen amongst more advanced courses within the mathematical sciences as well as other disciplines available across the University. At least 30 credits must be courses outside the range of mathematical sciences. Most students choose to combine mathematics with physics, computer science or economics. Elective courses offer students the possibility to both deepen and broaden their knowledge according to their own objects of interest.\n\nBachelor's Degree Project may be done in pure mathematics, mathematical statistics or numerical analysis on a subject of interest chosen in cooperation with a supervisor. The project may be of theoretical character but can also be done in an applied area in cooperation with an industrial partner.\n\nCareer prospects\n\nThe growth of the information society has led to an increased need for understanding and predicting the real world. There is an increasing demand for people who can structure and analyse the growing amount of produced and stored data. A thorough mathematical education provides the tools for such tasks. Mathematics is inherent in a manifold of technical and scientific achievements and plays a special role as an exact science with emphasis on quantitative aspects. Today's advancements in science and technology, medicine and pharmacology, economics and finance would not have been possible without mathematics.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.lunduniversity.lu.se/study/sciences-mathematics-NGNAT-ENMA',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://www.lunduniversity.lu.se/study/sciences-mathematics-NGNAT-ENMA',
        'https://kursplaner.lu.se/pdf/program/en/NGNAT',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        'Content 4.8: the study page ("Sciences, Mathematics") shows Autumn 2027 (start 30 August 2027). Entry requirements: general requirements plus Mathematics 4 (or the older D). UHR\'s IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. The maths requirement was missing and is added. Selection: in the early international round, entirely on the secondary school GPA (the converted IB total); in the national round, GPA 66% and the Swedish aptitude test 34%. Degree of Bachelor of Science with major in Mathematics. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cml5cz30b0001jv04ycej6okx',
      status: 'current',
      name: 'Music, Individual Programme – Bachelor’s Programme',
      description:
        'Malmö Academy of Music is a leading educational institution specialised in musical studies, training, and research. We offer programmes aimed at students who want to work professionally as musicians, church musicians, composers or music teachers. With a clear international profile, we move art forward – always with the passion for music and learning at our core.\n\nThe Bachelor’s Programme in Music, Individual Programme, aims to educate musicians that possess good artistic and professional qualities. On completion of the programme, the student must have adequate knowledge and skill in order to comfortably work within the various functions and engagements of the professional musician: either as a soloist, a member of an established ensemble and/or independent projects. The student must also have developed such skills necessary for continued or in-depth studies that are to a great degree autonomous. Furthermore, on completion of the programme, the student must have acquired basic entrepreneurial skills that increase his/her professional versatility in an ever-changing cultural life.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Music',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.lunduniversity.lu.se/study/music-individual-programme-bachelors-programme-KGMUS-INST',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://www.lunduniversity.lu.se/study/music-individual-programme-bachelors-programme-KGMUS-INST',
        'https://kursplaner.lu.se/pdf/program/en/KGMUS'
      ],
      notes:
        "Content 4.8: the study page shows only Autumn 2026, so checked for 2026. Entry requirements: general requirements and the School of Music entrance test; selection by audition, not modelled (Malmö Academy of Music). Checked, no subject required beyond English 6, part of the general requirements: UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. Degree of Bachelor of Music in Performance, Individual Programme. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored."
    },
    // Stored: not checked for any intake.
    {
      id: 'cml454o2q0001js04ap82rrnt',
      status: 'current',
      name: 'Physics – Bachelor’s Programme',
      description:
        'Are you intrigued by the fundamental forces of nature? Do you dream of developing environmentally friendly technology or creating materials with unique properties? The Bachelor’s Programme in Physics provides you with the theoretical and experimental knowledge needed to explore these areas.\n\nPhysics is about the fundamental building blocks of our world and the forces and laws that govern them. Physicists explore the properties of matter through advanced experiments and develop models to describe reality, often with the help of detailed computer simulations. Depending on your specialization, you may for example work on investigating elementary particles or developing new components for energy-efficient technology and advanced solar cells.\n\nDuring the Programme\nIn your first year, you’ll build a solid foundation with courses in mechanics, electromagnetism, quantum mechanics, thermodynamics, and mathematics. From the second year, you’ll deepen your knowledge by integrating physics with mathematics. You will study applications in molecular physics, atomic and nuclear physics, elementary particles, and materials science.\n\nThe programme includes lectures, laboratory work, problem-solving exercises, and independent projects. You will learn how to plan, conduct, and analyze experiments, to program, to use advanced experimental equipment, as well as to process and interpret data. In the third year, you can choose elective courses, allowing you to either specialize or broaden your knowledge in other subjects. The final semester is dedicated to a bachelor’s thesis, often connected to ongoing research.\n\nThere are many exciting research opportunities, both theoretical and experimental, within Lund’s profile area "Light and Materials" (with the 2023 Nobel laureate Anne L’Huillier), particle physics in collaboration with CERN, astronomy, or industry-based research. Some projects are conducted at Lund’s world-leading research facilities, such as the MAX IV synchrotron and the upcoming European Spallation Source (ESS), with applications in natural sciences, technology, and medicine. Through the Bachelor’s Programme in Physics, you are well-prepared to engage with these cutting-edge developments.\n\nAfter Graduation\nMany students choose to continue their studies at the master’s level. As a trained physicist, you can work in a wide range of fields, such as environmental technology, space research, energy development, computational modelling, and simulations. Potential career roles include design engineer, measurement engineer, process developer, or quality manager.\n\nThis is the international track of the Bachelor’s Programme in Physics, taught entirely in English. You start with the mathematics block in the first semester, followed by the physics block in the second semester',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://www.lunduniversity.lu.se/study/sciences-physics-NGNAT-ENFY',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'PHYS', level: 'SL', grade: 4 },
            { course: 'PHYS', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'CHEM', level: 'SL', grade: 4 },
            { course: 'CHEM', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://www.lunduniversity.lu.se/study/sciences-physics-NGNAT-ENFY',
        'https://kursplaner.lu.se/pdf/program/en/NGNAT',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        'Content 4.8: the study page ("Sciences, Physics") shows Autumn 2027 (start 26 August 2027). Entry requirements: general requirements plus Physics 2, Chemistry 1 and Mathematics 4 (or the older D). UHR\'s IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. Any IB Chemistry at SL 4 or HL 3 is Chemistry 2, above Chemistry 1. The stored single OR group of Chemistry, Maths AA or Physics is split into the three requirements. Selection: in the early international round, entirely on the secondary school GPA (the converted IB total); in the national round, GPA 66% and the Swedish aptitude test 34%. Degree of Bachelor of Science with major in Physics. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored (was 35, which no Lund page gives).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cml469xtc0001jr04lgejqmop',
      status: 'current',
      name: "Sciences, Physical Geography and Ecosystem Science - Bachelor's Programme",
      description:
        "Are you interested in understanding the ongoing processes in our environment? Perhaps wanting to work with climate models and climate solutions, or collection and analysis of environmental data? This education gives you knowledge and tools that can be used in many different contexts and in different geographical areas of the world.\n\nUnderstanding the environment, including climate change and weather events, increasing demands and exploitation of natural resources, and population growth, is probably the greatest emerging challenge influencing our future. The demand for well-educated and highly skilled graduates within this field is, and will remain, extremely high.\n\nWe are offering a world-class BSc programme in Physical Geography and Ecosystem Science, focusing on environmental modelling and management. A unique blend of courses results in a high-profile degree from a top international university - a perfect platform for a career or future study.\n\nProgramme content\nThis three-year programme consists of one introductory year and two years of specialisation. During the first year a solid foundation is laid in natural science, focusing on environmental science and climate. After this, courses are taken in subjects such as climatology, geographical information science, and remote sensing. Theory and practice are integrated on different scales, local to global, as well as in different locations. The programme has a large extent of field trips and close contact with private and governmental bodies within Sweden, as well as international contacts during a field trip outside Europe which in the last years has been to Rwanda.\n\nThe fifth semester is dedicated at studying complementary subjects at another department, university or preferably abroad through exchange studies. Lund University has many partner universities all over the world.\n\nCareer prospects\nAfter graduation you can either start work as an environmental or GIS specialist, or continue with Master's studies at Lund (or another university). Examples of Master's programmes taught at Lund include GIS and Remote Sensing, Physical Geography and Ecosystem Science, and the prestigious Erasmus Mundus GEM (Geo-information and Earth Observation for Environmental Modelling and Management).",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.lunduniversity.lu.se/study/sciences-physical-geography-and-ecosystem-science-NGNAT-INES',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'BIO', level: 'SL', grade: 4 },
            { course: 'BIO', level: 'HL', grade: 3 },
            { course: 'CHEM', level: 'SL', grade: 4 },
            { course: 'CHEM', level: 'HL', grade: 3 },
            { course: 'PHYS', level: 'SL', grade: 4 },
            { course: 'PHYS', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://www.lunduniversity.lu.se/study/sciences-physical-geography-and-ecosystem-science-NGNAT-INES',
        'https://kursplaner.lu.se/pdf/program/en/NGNAT',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: the study page shows Autumn 2027 (start 30 August 2027). Entry requirements: general requirements plus either Biology 1, Physics 1a or 1b1+1b2, Chemistry 1 and Mathematics 4, or Mathematics 4 and two of Biology 2, Physics 2 and Chemistry 2. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. With the IB the second route is the easier: Maths 4 and two of Biology, Chemistry and Physics (each SL 4 or HL 3). The model holds one OR group, so one science is stored and the second is in this note. Selection: in the early international round, entirely on the secondary school GPA (the converted IB total); in the national round, GPA 66% and the Swedish aptitude test 34%. Degree of Bachelor of Science with major in Physical Geography and Ecosystem Science. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored (was 30, which no Lund page gives)."
    }
  ]
}

export default refresh
