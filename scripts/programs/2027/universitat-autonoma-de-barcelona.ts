import type { RefreshFile } from '../lib/refresh'

/**
 * Universitat Autònoma de Barcelona: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts universitat-autonoma-de-barcelona
 */
const refresh: RefreshFile = {
  university: 'Universitat Autònoma de Barcelona',
  entryYear: 2027,
  checkedOn: '2026-09-30',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk4j1d2y00017mxzcij6ehfn',
      status: 'current',
      name: 'Artificial Intelligence',
      description:
        'The UAB academic programme in Artificial Intelligence offers you comprehensive training in AI that will allow you to design intelligent systems that respond to the challenges of society. It will provide you with the cognitive, mathematical, and algorithmic foundations of the automatic reasoning and learning processes needed to develop applications in all areas of AI, such as natural language, computer vision, data analysis, robotics, or self-employed agents. It will also allow you to know the opportunities for the application of AI in the different economic and social sectors, as well as analyze and evaluate the ethical, legal or social impact of its implementation.\n\nDifferent faculties of the UAB participate in teaching, making this interdisciplinary programme one that allows rigorously addressing the different challenges of AI applications. It also has the active involvement of two reference centers in AI, the Computer Vision Centre and the Artificial Intelligence Research Institute.\n\nThroughout your studies we will accompany you by working on a learning methodology based on practice (learning by doing), using projects based on real cases, with the active collaboration of companies from the sector.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/artificial-intelligence-1216708259085.html?param1=1345834483501',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/artificial-intelligence-1216708259085.html?param1=1345834483501'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 21139). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 38 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 10.497, above the 10 the access grade can reach, so IB applicants need weighted exam subjects to get in. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored MATH-AA HL5, PHYS SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Biology, Physics, Mathematics, Technology and Engineering; 0.1 for Technical Drawing, Business and Business Models, Chemistry. Taught in English; 40 places.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk4j1dho00077mxzf9mejyrx',
      status: 'current',
      name: 'Bioinformatics',
      description:
        "Researchers and professionals in the field of biomedicine and other areas of life sciences often find themselves with an overload of data proceeding from a variety of different devices. The capacity to process, visualise and analyse this large amount of data offers unique opportunities to improve our knowledge of biology and to continue to advance in the fields of medicine, agriculture, and the food industry.\n\nThe main challenge faced by professionals in this field is to convert all these new discoveries into improvements in health, more efficient healthcare and a greater economic and social progress for society.\n\nThe bachelor's degree in Bioinformatics combines skills in mathematics, computational modelling and biology with an interdisciplinary approach and special attention to biomedical applications. You will receive an integrated training based on knowledge, values and skills.\n\nAs a student of this degree, you must have a solid foundation in science, good logical thinking skills, ability to apply abstract models and be good at observing, paying attention and concentrating. You must also be creative, imaginative and have an interest in the life sciences and medicine.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/bioinformatics-uab/upc/ub/upf-1216708259085.html?param1=1345910563150',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/bioinformatics-uab/upc/ub/upf-1216708259085.html?param1=1345910563150'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 91917). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 36 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 10.704, above the 10 the access grade can reach, so IB applicants need weighted exam subjects to get in. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored BIO/CHEM/MATH-AA/PHYS HL5 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Biology, Physics, Mathematics, Chemistry, Technology and Engineering. An interuniversity degree (UPC, UB, UAB, UPF) coordinated by UB, taught in English.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk4j1dy9000h7mxz3edaygi8',
      status: 'current',
      name: 'Business Administration (English)',
      description:
        "If you are motivated by international scenarios, working in international companies and becoming fluent in business English, this degree offers the training you need. It will help you discover how each business area is organised and functions, and all in English.\n\nThe degree is designed to equip you with the necessary managerial functions, setting up the accounting, marketing policies, organising the finances, deciding on the viability of new investments, designing a business strategy, taking over other organisational tasks and mastering English language skills in business and economics.\n\nThis degree consists of a professional approach which ensures its graduates bright professional future and prepares them to work in both international companies and local ones with close relations with other countries. Given that the bachelor's degree is offered in English, you will acquire the same level upon completion as in other prestigious universities abroad offering the same studies.\n\nIn your fourth year, you will be able to enrol in quality work placements in an English-speaking environment.\n\nThe degree also offers small groups and well-equipped classrooms in a faculty shared with students enrolled in the degrees of Economics, Accounting and Finances, and Business and Technology, as well as numerous degree-related master's degrees.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/business-administration-english-1216708259085.html?param1=1299656909532',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/business-administration-english-1216708259085.html?param1=1299656909532'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 21099). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 34 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 9.214. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored MATH-AA/MATH-AI SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Biology, Physics, Business and Business Models, Geography, Mathematics, Mathematics for the Social Sciences, Chemistry. Taught in English; 70 places.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk4j1eax000n7mxzttnupddg',
      status: 'current',
      name: 'Contemporary History, Politics and Economics',
      description:
        "This bachelor's degree is taught in a balanced way between the faculties of Arts & Humanities, Political Science and Sociology, and Economics and Business Studies. The interdisciplinarity and transversality of the contents are the main values of a degree that aims to prepare versatile people, with a great capacity for analysis and with a global and multifaceted vision of the socio-political and economic problems of the contemporary world. The degree provides graduates with the skills and knowledge needed to analyse and propose solutions to political issues and their economic consequences in a given historical setting.\n\nThis bachelor's degree is for you if...\n- You believe that the complex problems of today's world need professionals capable of conducting multidisciplinary analyses.\n- You feel passionate about current events and would like to see in the media more comprehensive visions based on historical, economic, political and social knowledge.\n- You think that a multidisciplinary perspective helps to face the challenges of today's society and to propose solutions.\n- You have a discursive spirit; you like to argue, discuss, and defend your opinions, and you have no trouble accepting opposing analyzes.\n- You are a thoughtful, critical and analytical person.\n- You have a knowledge of English that allows you to take 80% of the subjects in this language.\n- You are thinking of a degree that will allow you international mobility.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/contemporary-history-politics-and-economics-1216708259085.html?param1=1345834885248',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/contemporary-history-politics-and-economics-1216708259085.html?param1=1345834885248'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 21138). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 32 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 8.870. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored MATH-AI SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Business and Business Models, Geography, Latin, Mathematics for the Social Sciences; 0.1 for History of Art, Spanish Literature, Catalan Literature, Greek, Cultural and Artistic Movements. Taught in English (80%), Spanish (15%) and Catalan (5%).'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk4j1em2000r7mxzf7hj6jzs',
      status: 'current',
      name: 'Economics (English)',
      description:
        "The bachelor's degree in Economics in English offers four years of language immersion as you study all matters in English, similar to the bachelor's degrees in Economics offered in other prestigious universities abroad. The knowledge you obtain will allow you to make more appropriate decisions in the fields of both public organisations and private businesses.\n\nDuring your last academic year, you will be able to choose a specific itinerary which will help you specialise in the area in which you are most interested. You will also be able to participate in exchange programmes with universities abroad and quality work placements in English in start-up companies thanks to a collaboration with Barcelona Activa.\n\nYou will receive a very solid training: AQU seal of excellence with a mention for internationalisation and in the top positions of all rankings, with lecturers who publish in prestigious journals and a unique university campus. Studying the degree in English is an added value much sought after by companies and together with all other knowledge you will acquire, will give you a head start in your professional future.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/economics-english-1216708259085.html?param1=1345667929027',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/economics-english-1216708259085.html?param1=1345667929027'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 21110). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 32 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 9.660. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored MATH-AA/MATH-AI SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for Biology, Physics, Business and Business Models, Geography, Mathematics, Mathematics for the Social Sciences, Chemistry. Taught in English; 40 places.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk4j1eyu000x7mxzwvcslq76',
      status: 'current',
      name: 'English and Catalan Studies',
      description:
        "Graduates in English and Catalan Studies will be capable of combining expert knowledge in both Catalan and English, today's de facto international language. This facilitates entering the workforce in any profession related to languages and multilingualism in any country of the European Union, such as the teaching of English and/or Catalan and cultural mediation, as well as in highly qualified business, tourist and other cultural professions, etc.\n\nThe degree is programmed by the Departments of English and German and of Catalan, making it an ideal setting for the organisation of this type of interdisciplinary studies.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/english-and-catalan-1216708259085.html?param1=1345853449637',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/english-and-catalan-1216708259085.html?param1=1345853449637'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 21140). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 24 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 5.000. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for Spanish Literature, Catalan Literature, Dramatic Literature, Greek, Latin.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk4j1f7q000z7mxz8fbgeuq0',
      status: 'current',
      name: 'English and Classical Studies',
      description:
        "Graduates in English and Classical Studies will acquire expert knowledge both in today's most important international language and in the classical languages, the cultural and philosophical bases of the Western world. This facilitates entering the workforce in any profession related to languages and multilingualism in any country of the European Union, such as the teaching of English and/or classical languages and cultural mediation, as well as in highly qualified business, tourist and other cultural professions, etc. The two specialisations offered will allow students to delve deeper into either the field of language, linguistics and comparative grammar, or literature, comparative literature and culture, thanks to a wide range of subjects providing strong professionalising contents. The degree is programmed by the Departments of English and German and of Antiquity and the Middle Ages, making it an ideal setting for the organisation of these types of interdisciplinary studies.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/english-and-classics-1216708259085.html?param1=1345853467145',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/english-and-classics-1216708259085.html?param1=1345853467145'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 21141). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 24 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 5.000. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for Spanish Literature, Catalan Literature, Dramatic Literature, Greek, Latin.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk4j1fgl00117mxzh7mfaxr3',
      status: 'current',
      name: 'English and French Studies',
      description:
        'Graduates in English and French Studies offers a solid training in both the English and French languages, literatures and cultures. This leads to expert knowledge in two official European Union languages, which facilitates entering the workforce in any profession related to languages and multilingualism in any country of the European Union, such as the teaching of English and/or French, cultural mediation, cultural management, etc. The two specialisations offered will allow students to delve deeper into either the field of language, linguistics and comparative grammar, or literature, comparative literature and culture, thanks to a wide range of subjects providing strong professionalising contents. The degree is programmed by the Departments of English and German and of French and Romance Languages, making it an ideal setting for the organisation of these types of interdisciplinary studies.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/english-and-french-1216708259085.html?param1=1345853954728',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/english-and-french-1216708259085.html?param1=1345853954728'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 21143). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 24 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 5.000. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for Spanish Literature, Catalan Literature, Dramatic Literature, Greek, Latin.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk4j1fpk00137mxzzt6qdok6',
      status: 'current',
      name: 'English and Spanish Studies',
      description:
        'Graduates in English and Spanish Studies will acquire expert knowledge in both the English and Spanish languages, literatures and cultures. This facilitates entering the workforce in any profession related to languages and multilingualism in any country of the European Union, such as the teaching of English and/or Spanish and cultural mediation, as well as in highly qualified business, tourist and other cultural professions, etc. The two specialisations offered will allow students to delve deeper into either the field of language, linguistics and comparative grammar, or literature, comparative literature and culture, thanks to a wide range of subjects providing strong professionalising contents. The degree is programmed by the Departments of English and German and of Spanish, making it an ideal setting for the organisation of this type of interdisciplinary studies.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/english-and-spanish-1216708259085.html?param1=1345853742708',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/english-and-spanish-1216708259085.html?param1=1345853742708'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 21142). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 24 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 5.000. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for Spanish Literature, Catalan Literature, Dramatic Literature, Greek, Latin.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk4j1fyr00157mxzb9s1d5st',
      status: 'current',
      name: 'English Studies',
      description:
        "Do you think and dream in English? If you want to be an English language professional, our bachelor's degree provides you with a broad knowledge of the linguistic, literary and cultural dimensions of English-speaking societies from their historical origins to the most up-to-date currents of thought and research. We provide our students with a total immersion in the use and practice of English, encouraging teamwork, cooperative learning and critical thinking.\n\nAs a student of English Studies, you will learn to do linguistic analysis, analyse literary texts and interpret cultural models, and improve your communication skills.\n\nYou will also be able to enrol in elective credits with professional or research specialisation that deal with some of the following topics: English teaching methods and their pronunciation, acquisition of English in multilingual contexts, management of linguistic diversity, English for specific purposes, translation, linguistic applications, advanced syntactic analysis, advanced phonetics and phonology, intercultural studies, queer studies, transnational studies, North American literature, contemporary British and Irish fiction, and literature teaching.\n\nWe offer:\n- Multilingual and highly qualified teachers.\n- International exchange and mobility programmes.\n- External work placement programme.\n- Language tandem programme with native speakers.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/english-studies-1216708259085.html?param1=1345835096727',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/english-studies-1216708259085.html?param1=1345835096727'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 21135). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 24 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 5.000. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). 2027 weightings (Spanish Bachillerato subjects): 0.2 for Spanish Literature, Catalan Literature, Dramatic Literature, Greek, Latin.'
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk4j1g8000177mxzkms2sodt',
      status: 'current',
      name: 'Primary Education (English)',
      description:
        "Are you a responsible, organised, methodological, creative and flexible person? Do you like teaching? Do you know how to work in teams? Do you consider yourself an observer, with the ability to listen, discuss, communicate and reach agreements? Do you want to enrol in a degree in which 90% of its students graduate and a total of 97% of its graduates successfully enter the labour market? If the answer to any of these questions is yes and you have an excellent level of English, we invite you to enrol in the UAB's bachelor's degree in Primary Education in English.\n\nYou will receive the basic training needed to teach 6 to 12-year-olds in English. You will discover and be able to contrast theoretical and practical knowledge of how to be a teacher who meets the needs of an ever-changing world. You will give your classes in English and acquire a generalist-type training, with the possibility of choosing from a variety of specialisations. If you are not interested in a specialisation, you can choose from a wide number of optional subjects instead.\n\nIf you are interested in discovering other cultures, you will be able to choose from 40 different European universities and participate in an Erasmus exchange programme. The UAB also has practicum agreements with Germany, Belgium, France, Italy and the United Kingdom. Throughout your studies the degree coordinator will accompany you in the professional guidance process.",
      field: 'Education',
      degree: 'Bachelor of Education',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/primary-education-english-1216708259085.html?param1=1345663778708',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/primary-education-english-1216708259085.html?param1=1345663778708'
      ],
      notes:
        "UAB's page gives an admission mark of 8.248 and teaching in English, Catalan and Spanish, but the English-taught group has no pre-enrolment code of its own in Catalonia's June 2026 cut-offs or 2027 weighting table (UAB's Primary Education, 21018, had 9.401), so nothing names 2027 for it: stamped 2026. IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; there is no IB points minimum: the stored 30 is kept, unverified. Checked, none required: in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams, never through IB subjects. 2027 weightings for UAB's Primary Education (21018) (Spanish Bachillerato subjects): 0.2 for 21 subjects."
    },
    // Stored: checked for 2026 entry on 2026-01-07.
    {
      id: 'cmk4j1gh400197mxzsra63341',
      status: 'current',
      name: 'Tourism (English)',
      description:
        "The bachelor's degree in Tourism offers you a training experience closely linked to professional practices and the professional world. It offers:\n- knowledge and skills in business management and organisation of tourist activities, destinations, services and resources, with innovation and sustainability as central axes\n- mastery of up to 4 foreign languages, accredited by the UAB Languages Service\n- teaching 100% in English. An equivalent to the B2 Level of the Common European Framework of Reference for Languages is recommended. No specific level exam must be taken.\n- exchanges with over 75 universities\n- three specialisations:\n  - Tourism Business Management\n  - Tourism Planning and Commercialisation\n  - Hotel Management\n- academic continuity with a variety of master's degrees and PhD programmes.\n\nYou will receive tailored academic and professional support to guide you professionally which includes:\n- Over 700 work placement positions in top quality local and international businesses and entities.\n- Interaction with the labour market through professional activities and mentoring.\n- Facilities located on campus, such as the Hotel Exe Campus, where you can put into practice your theoretical knowledge.\n\nJobs bank with 96.3% of graduates entering the labour market.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 24,
      programUrl:
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/tourism-english-affiliated-school-1216708259085.html?param1=1345680861890',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/Ponderacions-2027_v2.pdf',
        'https://universitats.gencat.cat/ca/acces-universitat/acces-segons-perfils-estudiants/estudiant-sistema-educatiu-estranger/',
        'https://universitats.gencat.cat/web/.content/02_preinscripcio/enllac-documents/notes-de-tall/Notes-tall-1a-assignacio_juny_2026.pdf',
        'https://www.uab.cat/web/estudiar/ehea-degrees/general-information/tourism-english-affiliated-school-1216708259085.html?param1=1345680861890'
      ],
      notes:
        'Catalonia\'s 2027 weighting table lists this degree (pre-enrolment code 21114). IB Diploma holders enter with UNEDasiss accreditation, whose access grade (5 to 10) is the average IB subject grade plus 3; the IB total is not used, so there is no IB points minimum: the stored 24 is kept, unverified. Admission is on a grade out of 14; the June 2026 first-round cut-off was 5.000. Checked, none required: any IB Diploma gives access, and in Catalonia weighted subjects add points only through PAU or UNEDasiss PCE exams ("no subject taken at batxillerat and recognised in the UNEDasiss accreditation is taken into account"). The stored MATH-AA/MATH-AI SL4 rows were weighted subjects, not requirements, and are removed. 2027 weightings (Spanish Bachillerato subjects): 0.2 for 10 subjects; 0.1 for Musical Analysis, Performing Arts. Taught in English at an affiliated school (Escola Fundació UAB-Formació), at 94 euros per credit; the page says "A Level B2 of English is required".'
    }
  ]
}

export default refresh
