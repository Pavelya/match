import type { RefreshFile } from '../lib/refresh'

/**
 * Charles University: requirements for 2027 entry.
 *
 * Exported from the database on 2026-10-03 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts charles-university
 */
const refresh: RefreshFile = {
  university: 'Charles University',
  entryYear: 2027,
  checkedOn: '2026-10-03',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmko5ikoo000wjv047ezafrzp',
      status: 'current',
      name: 'Computer Science',
      description:
        'The aim of the bachelor program Computer Science is an education of graduates with a broad knowledge in two areas. The first area of gained expertise is applied computer science, in particular the ability to analyze and program real world problems, which enables the graduates to get jobs in the industry directly after finishing their bachelor degree. The second area is theoretical computer science (including a relatively broad mathematical foundation), which enables the graduates to continue their studies on a master (and later possibly also a doctoral) level. The coverage of both above mentioned areas is in an accord with the position of computer science on the borderline between technical and natural sciences.\n\nThe study program Computer Science has three specializations. One of them is more practically oriented (Databases and web) and two more theoretically focused (General computer science, Artificial intelligence). The first year of study is common for all three specializations, which allows students to pick their specializations as late as in the second year of study, when they have enough information for such a decision.\n\nAn important part of the study program is creative work, which includes student theses. This type of work is aimed at software and specialized hardware development (in the applied area of computer science), and at scientific publications (in the theoretical area of computer science).',
      field: 'Computer Science',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=34738',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 6, critical: false }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.mff.cuni.cz/en/admissions/admission-requirements-for-bachelor-s-programmes-in-english/2026-2027',
        'https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=34738'
      ],
      notes:
        "Content 4.8b: MFF's Admission Requirements for Bachelor's Programmes in English (2026/2027) and the admission system's entry (deadline 30 April 2026). The 2027/2028 page does not exist yet (404) and the admission system lists no 2027/28 entry, so stamped 2026. Reasoning Requirements for the IB: \"A score of 6 or higher in 'Mathematics: analysis and approaches HL' or 'Mathematics: applications and interpretation HL' (total score on the IB diploma is not a factor for admission)\". 2025/26 also asked 32 points. AP Calculus, SAT, ACT, A levels or olympiad results can meet it instead, so not critical. English: \"International Baccalaureate - English 6\" is one accepted proof among TOEFL iBT 85, IELTS 6.5, C1 Advanced and others; no course or level is named, so any English at SL 6, not critical. The stored 38 points had no source: the Diploma is the only IB condition, so 24 under 4.8a's approved policy. The IB Diploma itself proves secondary education (no nostrification). Bachelor (Bc.): the award is not in the degree list."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmko5zlvh0013jv04v1m3z9w9',
      status: 'current',
      name: 'Economics and Finance',
      description:
        "If you are strong in mathematics and keen to apply this skill in the field of economics and finance, BEF is the right program for you. It will give you a thorough grounding in both theoretical and applied economics and finance and develop your abstract analytical reasoning. After completing this program, you can continue in a master's program in related fields of study or you will easily find a career in banking, consulting, investment funds or public administration.\n\nAs the program exposes you to topics in mathematical economics, mathematical statistics and finance, you have to have an excellent background in high school mathematics. Prior knowledge of economics or finance is an advantage but it is not required. You should also have a good command of English and you should be able to read textbooks of economics and mathematics without difficulties.\n\nYou will be taught not only by academics, but also by external professionals from the Central Bank and commercial banks and by business analysts. Mandatory courses will introduce you to microeconomics, macroeconomics, and equip you with advanced tools in mathematical analysis and statistics. At the BA level, you can already start specializing thanks to a wide range of elective courses that will broaden your horizons and allow you to focus on areas of interest such as finance and banking, economic policy, strategic management, international trade, and European economic integration. We also offer courses in complementary areas, such as history of economic thought, game theory and political economy.",
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 30,
      programUrl:
        'https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=36346',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }],
      checkedFor: 2027,
      sources: ['https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=36346'],
      notes:
        'Content 4.8b: Charles\'s admission system lists this programme for 2027/2028: applications from 1 November 2026, deadline 30 April 2027 (28 February 2027 recommended for visa countries). Maths is a precondition: an IB Mathematics course (AA or AI, SL or HL) is assessed, and "a minimum overall predicted or final IB subject score of 30 out of 42 is required", the six subject grades without the core, stored as 30 as published (as for Switzerland in 4.7). A-level, EB, SAT, ACT, AP, CSAT or SCIO maths, or two FSV maths courses, can replace the IB maths, so not critical; no maths grade is named (stored as 4). Applicants are ranked out of 100: mathematics 0-45, English 0-35, general profile (CV, motivation letter, recommendation, activities) 0-20; the Dean sets the cut-off. English by a test (IELTS Academic 6.5, TOEFL iBT 83, Cambridge B2 First 175 or C1 Advanced, PTE 56 and others) or at least two years of English-medium secondary school; the IB is not named as proof, so the stored English row (no source) is removed. The stored Maths AA HL 6 had no source.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkohqcum0001l704gm6dh3eu',
      status: 'current',
      name: 'History and Area Studies',
      description:
        'Are you looking for a BA program with an added value? This program will give you not only expertise in modern history, culture and politics of Central Europe but also knowledge of Czech language. It will teach you how to grasp regional problems in their context. You will understand the historical and cultural underpinnings of Central Europe. You can become a highly skilled employee in the civil service or diplomacy, in NGOs or international institutions as well as in private companies or media. \n\nHistory and Area Studies is an interdisciplinary study program that focuses on modern history, culture and politics with respect to the Czech Republic in Central European and global context. This program combines education in history and area studies with active training in the Czech language, ensuring you achieve fluency, cultural competence, historical knowledge, and social understanding of Central Europe.\n\nThe curriculum focuses both on education in modern history and area studies, and on Czech language education. The Czech language courses progress from the basic grammar and vocabulary to the advanced level of Czech that you will be able to reach by the end of your studies. Modern history and area studies mandatory courses will give you a broad overview of major topics in contemporary Central European history, culture, politics, and economics. You will then have a solid background for more in-depth study of selected topics in the elective courses where you can discuss the topics in Czech thanks to the rising language knowledge and skills.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=36347',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=36347'],
      notes:
        "Content 4.8b: Charles's admission system lists this programme for 2027/2028: applications from 1 November 2026, deadline 30 April 2027 (28 February 2027 recommended for visa countries). Admission on documents, ranked out of 100: academic background 0-40, motivation letter and recommendation 0-40, extracurricular activities 0-20; the Dean sets the cut-off. Completed secondary education is the only condition and no IB figure is published, so 24 (the Diploma) stays. Checked, none required: no subject is named. English by a test (IELTS Academic 6.5, TOEFL iBT 83, Cambridge B2 First 175 or C1 Advanced, PTE 56 and others) or at least two years of English-medium secondary school; the IB is not named as proof, so the stored English row (no source) is removed."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkoica94000il7045bj6zp37',
      status: 'current',
      name: 'Physiotherapy',
      description:
        'Physiotherapy is a subject in a health care area focusing on diagnostics, functional therapy of movement system disorders. Physiotherapy also influences the functions of the other systems including the psychical one throughout the movement and other physiotherapeutical processes.\nThe Programme offers a 3 year study programme for secondary school with final state exam graduates. The programme is devided into 6 semesters and the students take courses in the areas which are necessary for the physiotherapeutical treatmet such as biology, anathomy, physiology, pathology, pathophysiology, biophysics, biomechanics and kinesiology. The courses based on physiotherapy such as Examination and Rherapeutic Methods in Physiotherapy, Introduction in Rehabilitation, Physical Therapy, Balneology, and others (Internal Medicine, Surgery, Traumatology and Orthopaedics, Gynecology, Neurology, Psychiatry, Pediatrics, Geriatrics, Orthotics-Prosthetics) as well as the courses of prophylactic treatment such as Basics of Ergotherapy, Remedial physical education or Adapted PE for Handicaped People form the essencial part of the Study programme. The Study programme puts the emphasis on gaining practical skills which are required during the physiotherapetical procedures and treatment which take plece under a specialist supervision at the medical institutions. The curricular internship under the specialist supervision is also a part of the Study programme and is required every year. When the student gains 180 ECTS credits he or she takes the Final State Exam insluding Bachelor Thesis Defence, theoretical exams and practical medical institution exam.',
      field: 'Medicine & Health',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=37213',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=37213'],
      notes:
        "Content 4.8b: Charles's admission system lists this Faculty of Physical Education and Sport programme for 2027/2028 (deadline 31 March 2027; 20 places). Admission by an interview, online possible: motivation letter 0-5, English 0-10, discussion of a professional text 0-10; at least 15 of 25 is required. Also a motivation letter, CV, recommendation and an internationally recognised English certificate, and at enrolment a medical fitness report and hepatitis B and measles protection. A foreign school diploma is recognised by nostrification or assessed by the faculty (CZK 1,050). Checked, none required: no subject is named, and the stored English row is removed. No IB figure is published and selection does not use school results, so the stored 34 (no source) becomes 24, the Diploma, under 4.8a's approved policy."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkoi64re0006l70439ei4mbe',
      status: 'current',
      name: 'Politics, Philosophy and Economics',
      description:
        'If you are interested in politics, philosophy and economics and wish to get a thorough grounding in these three disciplines, this Oxford-style PPE program is the right choice. You will learn to analyse complex social, political and economic problems. You can pursue a career in politics, banking and finance, business management, journalism, education, public services, diplomacy and government.\n\nModeled on the Oxford PPE, this program lets you explore foundations of domestic and international politics and economics,all underpinned by philosophical rigour. Courses are designed to foster critical thinking about social developments in the world and sensitivity to ethical challenges in political decision-making in the environment marked by cultural diversity and economic inequality.\n\nYou will learn to analyse complex social, political and economic problems in an interdisciplinary manner and solve them from complementary perspectives. Since all compulsory courses have to be taken during the first three semesters of the program, from the fourth semester onwards you can choose one of three available study tracks: Politics & Philosophy, Economics & Politics or Philosophy & Economics.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=36345',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=36345'],
      notes:
        "Content 4.8b: Charles's admission system lists this programme for 2027/2028: applications from 1 November 2026, deadline 30 April 2027 (28 February 2027 recommended for visa countries). Two rounds: documents ranked out of 100 (academic background, including school results and any standardised test, 0-65; motivation and activities 0-35), then an online interview for applicants within 5 points of the Dean's cut-off (plus or minus 6 points). SAT, ACT or SCIO results are strongly recommended, especially for applicants without IB, EB or A-level results. No IB figure is published, so 24 (the Diploma) stays. Checked, none required: no subject is named. English by a test (IELTS Academic 6.5, TOEFL iBT 83, Cambridge B2 First 175 or C1 Advanced, PTE 56 and others) or at least two years of English-medium secondary school; the IB is not named as proof, so the stored English row (no source) is removed."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmko4k7bh000bjv04t2mkbjq9',
      status: 'current',
      name: 'Psychology',
      description:
        'Graduates of the bachelor’s programme in Psychology have a basic grounding in selected psychological disciplines and their application and are able to connect basic psychological knowledge with findings from the social and human sciences, as well as with knowledge of the biological foundations of psychology. They possess knowledge of the principles of psychological methodology and approaches to the exploration and investigation of man in interpersonal and social relations and processes. Furthermore, graduates have skills in communication, presentation, teamwork, small group leadership, project management and the production of specialised texts. They also have skills in the basic statistical processing of empirical data and processing of information resources, as well as skills in ethics for working with people.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=37295',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=37295',
        'https://www.ff.cuni.cz/home/applications/'
      ],
      notes:
        "Content 4.8b: Charles's admission system lists this Faculty of Arts programme for 2027/2028 (deadline 31 January 2027; about 60 places, 61 of 128 applicants admitted last year). Entrance exam by portfolio: academic preparedness 0-40 from the average of all subjects on the penultimate year's school report (converted to the Czech 1-5 scale; points = 59 - 19 x average), motivation letter 0-30, structured CV and activities 0-30. English at B2: a school-leaving certificate from a programme taught in English, or a certified B2 exam. No IB figure is published and selection ranks school results, so the stored 34 (no source) is kept, unverified, as 4.8a did for Poland. Checked, none required: no subject is named; the stored English row is removed."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmko576e3000gjv04k21c06w8',
      status: 'current',
      name: 'Science',
      description:
        'The programme is implemented without specialization.\n\nThe bachelor’s degree programme Science (studyscience.eu) responds to the need to educate professionals in the natural sciences with a strong interdisciplinary focus. The programme effectively links biology, chemistry, and physics and is currently the only one of its kind in the country. The significant interdisciplinary overlap of BSc Science graduates enables them to tackle challenging research tasks and interdisciplinary projects using both traditional and modern approaches. Graduates of the programme will also gain the fundamentals of artificial intelligence (especially machine learning) and a number of soft skills. A large part of the teaching will be provided using proactive techniques and the active involvement of students from the very beginning (“active learning” and “flipped learning” will be adopted for the specific needs of the programme). The implementation of the Science programme is based on the principle of 2 + 1 years, where the first two years of study will be common to all students in the programme, while the third one will be fully dedicated to the field of study chosen by the student (biology, chemistry, or physics). During the first two years, students will gain a solid basis in mathematics, computer science, programming, and soft skills (roughly one-third of the credits). The remaining credits (for the first two years of study) will be divided equally between biology, chemistry, and physics. After mastering the common basis in the first two years, the student will choose one of the three areas to fully focus on for the final year of study. Depending on this choice, therefore, the student will acquire knowledge in biology, chemistry, or physics that will enable him/her to study in relevant postgraduate programmes.',
      field: 'Natural Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 34,
      programUrl: 'https://natur.cuni.cz/en/admissions/study-programmes/science',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://natur.cuni.cz/en/admissions/study-programmes/science',
        'https://natur.cuni.cz/uchazeci/bakalarske-studium/podminky-prijimaciho-rizeni/programy-s-vyukou-v-anglickem-jazyce',
        'https://studyscience.eu/admission.html'
      ],
      notes:
        "Content 4.8b: the Faculty of Science says the 2027/2028 deadlines will be published by November 2026, and Charles's admission system has no 2027/28 entry yet (the stored page, id 34321, no longer exists), so the 2026/2027 conditions are used and stamped 2026. Admission out of 100: CV 10, motivation letter 25, grades in biology, chemistry, physics and maths over the last two years 10, and an online interview in English on biology, chemistry and physics 55. The interview is waived for IB applicants predicted at least 13 points in one HL and one SL subject from Biology, Chemistry or Physics (also for AP 4-5 or olympiad results). Checked, none required: no subject is a condition; the stored Maths HL 5, Biology or Physics HL 6 and Biology HL 7 had no source. No IB figure is published and selection uses school grades, so the stored 34 is kept, unverified. Taught with the Faculty of Mathematics and Physics."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkoi8npl000bl704stxy6zoi',
      status: 'current',
      name: 'Social Sciences',
      description:
        'Programme/Branch characteristic\nshrink\nThis interdisciplinary program aims to develop your analytical skills in social sciences. Not only will you learn about current transdisciplinary issues, but also you will become well versed in social research methodology. The program is made up of problem-oriented courses that develop an array of disciplinary perspectives, with the goal of training you to integrate them. You can continue your studies in any MA program in social sciences but you can also profile yourself already during your BA studies thanks to the wide range of elective courses we offer.\n\nThe program is based on an interdisciplinary approach to develop your analytical skills in the field of social sciences. You will explore current issues that are transdisciplinary in nature, such as coping with complexity, governance, mediatization of social relationships or the interaction between society, technology and the natural environment. The second pillar of the program is the methodology of social research, which we consider a prerequisite for developing analytical skills and for finding effective solutions to complex issues. We teach both analytical and interpretative approaches. The emphasis we put on the preparation of your bachelor thesis will contribute not only to the development of your soft skills, but will also serve as a preparation for project-oriented research. \n\nIn the courses, we will introduce you to various disciplines, such as sociology, public policy, media studies, political science, social anthropology, economics, or environmentalism. The composition of elective courses corresponds to the large and assorted portfolio of courses offered by our faculty and allows you to profile yourself, also with a view to follow-up studies.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=36344',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=36344'],
      notes:
        "Content 4.8b: Charles's admission system lists this programme for 2027/2028: applications from 1 November 2026, deadline 30 April 2027 (28 February 2027 recommended for visa countries). Two rounds: academic background (grades, social science subjects, relevant activities, previous study) 0-30 and motivation letter 0-20; the shortlist writes a supervised online essay, 0-50. No IB figure is published, so 24 (the Diploma) stays. Checked, none required: no subject is named. English by a test (IELTS Academic 6.5, TOEFL iBT 83, Cambridge B2 First 175 or C1 Advanced, PTE 56 and others) or at least two years of English-medium secondary school; the IB is not named as proof, so the stored English row (no source) is removed."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkoieoum000nl704341egkux',
      status: 'current',
      name: 'Sustainability in Marketing and Media Communication',
      description:
        "The bachelor's degree program “Sustainability in Marketing and Media Communication” is an interdisciplinary program that combines approaches from communication and media studies and marketing with concepts of sustainable development. A new and unique feature of this program is the implementation of sustainability principles in the fields of marketing and media communication.\n\nThe program will give you not only expertise in communicating sustainability issues, designing and presenting them in the media but also knowledge in intercultural communication strategies and their application in various international work contexts. You can critically evaluate media messages especially in the field of social media and assess the impact of media and marketing campaigns on the environment. And – most importantly – you will be able to apply the principle of sustainability to the communication process itself.\n\nThe curriculum combines four pillars:\n\nPillar 1 Sustainable communication in a global world\nPillar 2 Media analysis\nPillar 3 Media literacy – media education – sustainable use of media in the digital world\nPillar 4 Sustainable media production – sustainable marketing",
      field: 'Media',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=36343',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://is.cuni.cz/studium/eng/prijimacky/index.php?do=detail_obor&id_obor=36343'],
      notes:
        "Content 4.8b: Charles's admission system lists this programme for 2027/2028: applications from 1 November 2026, deadline 30 April 2027 (28 February 2027 recommended for visa countries). Admission on documents, ranked out of 100: a motivation video (at most 120 seconds) 0-40, structured CV 0-30, an essay on media and sustainability 0-30; the Dean sets the cut-off. No IB figure is published, so 24 (the Diploma) stays. Checked, none required: no subject is named. English by a test (IELTS Academic 6.5, TOEFL iBT 83, Cambridge B2 First 175 or C1 Advanced, PTE 56 and others) or at least two years of English-medium secondary school; the IB is not named as proof, so the stored English row (no source) is removed."
    }
  ]
}

export default refresh
