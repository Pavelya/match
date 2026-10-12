import type { RefreshFile } from '../lib/refresh'

/**
 * Constructor University: its 18 on-campus bachelor's programs, added for content task 7, Part B2 (Germany), and
 * created, with the university, on 2026-10-12. The owner chose the university on 12 October 2026
 * (docs/tasks/content-2027/germany-model-decision.md, decision 6). Applied Computer Science is online-only and
 * left out, as online-only majors were in content 6.
 *
 * Constructor admits holistically and states that it has no minimum grade and no required subjects, so, under the
 * data conventions' rule for a university that publishes no minimum (content 6), minIBPoints is null and there are no
 * subject rows; the KMK conditions decide only whether the SAT or ACT is asked for at enrollment. Each program page
 * names the 2027 application periods, so every program is stamped 2027.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts constructor-university
 */

/** Read on 12 October 2026, after each program's own page. */
const FAQ =
  'https://constructor.university/programs/undergraduate-education/faq-undergraduate-study'
const APPLY = 'https://constructor.university/admission-aid/application-information-undergraduate'

const NOTES =
  'Content 7 (Part B2, 12 October 2026). No IB minimum: Constructor\'s FAQ says "we do not have any particular minimum grade requirement" and "we also do not require particular subjects for any of our majors", so minIBPoints is null, checked, none required. It names IB Diploma candidates with 34-45 points as the most successful applicants, which the How competitive paragraph quotes. The SAT or ACT "may be required for enrollment, if your high school diploma does not grant you direct admission to a university". English proof: English A Literature or Language and Literature grade 6 or 7. Stamped 2027: the program page names the Application Periods 2027 and Program Start Dates 2027.'

const refresh: RefreshFile = {
  university: 'Constructor University',
  entryYear: 2027,
  checkedOn: '2026-10-12',
  programs: [
    {
      status: 'new',
      name: 'Artificial Intelligence',
      description:
        'While Artificial Intelligence has traditionally been considered a sub-part or specialization of broader Computer Science programs, recent years have shown a clear trend toward viewing AI as a distinct field of research and technology in its own right – reflected in the establishment of dedicated AI study programs nationally and internationally, driven by advances in machine learning, generative AI, computer vision, robotics, and intelligent systems.\n\nAccreditation of this new program is expected in spring 2027. How competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/artificial-intelligence',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/artificial-intelligence',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Biochemistry and Cell Biology',
      description:
        "Biochemistry is the study of molecules and chemical processes in living organisms, while Cell Biology is concerned with the structure and physiology of cells, their components, and interactions with the environment. The two fields are combined in one comprehensive, English-taught degree program, which will give you a broad understanding of the molecular and cellular mechanisms that form the basis of life, including the principles of inheritance and gene expression. This allows BCCB graduates to address in their careers important problems in today's society, be it by basic or by applied research, for example in the areas of biomedicine, biotechnology, or molecular biology. For this, the BCCB program at Constructor University provides not only the theoretical background, but also substantial practical training. Students are, furthermore, involved in hands-on research during their studies.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/biochemistry-cell-biology',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/biochemistry-cell-biology',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Chemistry and Biotechnology',
      description:
        'Chemistry and Biotechnology (CBT) is a transdisciplinary field that combines the scientific principles of chemistry and biology to solve real-world problems. The English-taught program focuses on the composition, structure, behavior, and transformations of elements, compounds, molecules, and ions and how they can be applied in biotechnology. The biotechnology component of the program teaches students how to use biocatalysts and biomolecules to create a more sustainable future, along with the principles of biorefining and the circular economy.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/chemistry-biotechnology',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/chemistry-biotechnology',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Computer and Information Technology',
      description:
        'Large-scale information technology poses many challenges related to dependability attributes such as availability, reliability, safety, integrity, and maintainability. The Computer and Information Technology (CIT) program equips students with methods and techniques to select, develop, apply, integrate, and operate secure and dependable computing and communication technologies that enable users to accomplish their personal, organizational, and societal information processing goals.\n\nAccreditation of this new program is expected in spring 2027. How competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/computer-information-technology',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/computer-information-technology',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Computer Science',
      description:
        'Computer Science lies at the core of all modern industries, as computer systems and information technology are the basis for almost all of today’s production processes. Computer technology changes constantly, but some fundamental principles are underlying these technologies. The Computer Science program at Constructor University focuses on understanding these principles and their application in practice. In addition to courses dealing with core competencies (programming, software engineering, foundations of computer science), you will cover mathematics (calculus, linear algebra, and statistics) and take courses in engineering and sciences while conducting guided research.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/computer-science',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/computer-science',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Earth Sciences and Sustainable Management of Environmental Resources',
      description:
        'The most pressing problems of the 21st century include environmental degradation such as climate change, loss of biodiversity, soil degradation, and air pollution, and increasing resource scarcity urging for a more sustainable use of Earth’s resources. The English-taught BSc program Earth Sciences and Sustainable Management of Environmental Resources (ESSMER) is an interdisciplinary science major with a strong focus on phenomena and processes occurring at the Earth’s surface. Our students develop a holistic understanding of the system Earth, anthropogenic interaction with its land, atmosphere, oceans and biosphere, and management of environmental resources, including water, soils, biological and energy resources, and minerals. The ESSMER program is based on a solid foundation in science disciplines and uses key methodological tools and concepts from Earth Sciences and data management combined with the concepts of sustainability and resource management.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/earth-sciences-and-sustainable-management-of-environmental-resources',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/earth-sciences-and-sustainable-management-of-environmental-resources',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Electrical and Computer Engineering',
      description:
        'Over recent decades, extensive developments in microelectronics have triggered a digital revolution where computers take center stage. While we still think of a computer as a desktop or a laptop, digital computing and digital signal processing have become vital for many of the products in our everyday life, such as cars, mobile phones, tablets, cameras, household appliances, and more. The Electrical and Computer Engineering (ECE) program focuses on communications and digital signal processing, including the enabling digital processing elements and their programming. Those enabling technologies are mostly subsumed under the headline of embedded systems.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/electrical-computer-engineering',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/electrical-computer-engineering',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Global Economics and Management',
      description:
        "The bachelor program in Global Economics and Management at Constructor University provides students with a comprehensive understanding of the complex and interrelated economic and political forces that shape our globalized world. Through a unique combination of traditional business and economics studies, political science, sociology, and management, students gain a transdisciplinary perspective on the challenges faced by today's firms and economies, with a focus on sustainable development and responsible leadership.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.",
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/global-economics-management',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/global-economics-management',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Industrial Engineering and Management',
      description:
        "The B.Sc. Industrial Engineering & Management (IEM) program at Constructor University offers a diverse and adaptable approach to engineering that emphasizes the integration of people, materials, and energy in productive ways. The program covers a range of subjects including process engineering, operations research, supply chain management, engineering design, logistics, and project management. Students will gain a comprehensive understanding of management and engineering business functions, preparing them for successful careers in industry. This English-taught Bachelor's program in Industrial Engineering & Management has received high rankings in recent university rankings conducted by the Center for Higher Education (CHE), attesting to its outstanding quality and reputation.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/industrial-engineering-management',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/industrial-engineering-management',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Integrated Social and Cognitive Psychology',
      description:
        'The Constructor University BSc in Integrated Social and Cognitive Psychology adopts a holistic approach to understanding human behavior, recognizing the complex interplay of factors that shape our actions and thoughts. This interplay can include biological, psychological, and socio-cultural factors that interact in complex ways.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/integrated-social-cognitive-psychology',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/integrated-social-cognitive-psychology',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'International Business Administration',
      description:
        "The International Business Administration program is designed to equip students with the knowledge, skills, and perspectives needed to succeed in today's rapidly changing, global business landscape. This English-taught program emphasizes the study of international firms, the integration of technology across all business areas, and the impact of cultural and economic factors on business operations. With a strong emphasis on both theory and practical application, students will gain a comprehensive understanding of the critical components of international business and management, including management practices, information technology, and the global economic and cultural context. By blending theoretical knowledge with hands-on experience and scientific methods, the program provides students with a well-rounded education that prepares them to meet the challenges and opportunities of the global business world.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.",
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/international-business-administration',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/international-business-administration',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'International Relations: Politics and History',
      description:
        'The IRPH program is designed to address complex and pressing global issues today. The English-taught program takes a multidisciplinary approach, combining theories and methods from political science, history, law, and philosophy to provide students with a comprehensive understanding of international relations. The overarching goal of the program is to equip students with the knowledge and skills to analyze and tackle the historical origins and potential solutions to these global challenges.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/international-relations-politics-history',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/international-relations-politics-history',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Management, Decisions and Data Analytics',
      description:
        'The BSc Management, Decisions and Data Analytics (MDDA) program prepares students to solve management and business problems by applying methods such as machine learning, big data analytics and data visualization in the process of decision making. It addresses key managerial and methodological skills for the next generation of young professionals in times of digital transformation.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/management-decisions-and-data-analytics',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/management-decisions-and-data-analytics',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Mathematics, Modeling and Data Analytics',
      description:
        'Mathematics is at the foundation of science, ranging from the beauty of theory and pure thought to applications in almost all areas of the natural sciences, engineering, economics, finance, and even the social sciences. While Mathematics is an ancient subject, and its applications also date back to many centuries, recent advances of the last two decades in Data Science have revolutionized all these applications as well as some areas of mathematics itself. A key advantage of this interdisciplinary, English-taught program is that it equips students both with mathematical tools for formulating and analyzing problems as well as context provided in modeling real-world problems and algorithmic data-driven approaches towards solving them. The strong mathematical foundation sought for in the program equips students with more powerful methods of analysis and modeling problems serves as a wide source of mathematical questions.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/mathematics-modeling-data-analytics',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/mathematics-modeling-data-analytics',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Medicinal Chemistry and Chemical Biology',
      description:
        'The global pharmaceutical industry requires well-trained scientists who have the education and ambition to drive innovative drug development. The English-taught Medicinal Chemistry and Chemical Biology (MCCB) program places the student at the forefront of those efforts by providing a fundamental understanding of the drug-body interaction from the molecular to the physiological level. By engaging this broader approach, that is, not only trying to cure disease (medicinal chemistry) but also placing an emphasis on the underlying associated cellular pathways (chemical biology), further innovative opportunities for treating disease will come forward. In this regard the MCCB program is unique within the German academic landscape and should help bridge the evolving needs of the high growth pharmaceutical industry.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/medicinal-chemistry-chemical-biology',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/medicinal-chemistry-chemical-biology',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Physics and Data Science',
      description:
        'Are you curious about how the universe works, what its theoretical foundations are and how we can use experiments and data science to understand it better? Do you want to design new materials or apply quantum mechanics to living matter? The Physics and Data Science (PhDS) program at Constructor University combines the fascinating world of physics with the powerful tools of data science to help you explore and make sense of the world around.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/physics-and-data-science',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/physics-and-data-science',
        FAQ,
        APPLY
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Robotics and Intelligent Systems',
      description:
        'This program focuses on the engineering methods and technologies essential for developing autonomous mobile systems, such as robots, that can operate independently without constant human supervision. The English-taught program emphasizes the application of these methods and technologies in the fields of robotics and automation, including industries such as automotive and transportation, communication technologies, marine technology, and logistics.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/robotics-intelligent-systems',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/robotics-intelligent-systems',
        FAQ,
        APPLY
      ],
      notes:
        NOTES +
        ' Field by content: the rule names no discipline in "Robotics and Intelligent Systems"; an engineering program of the School of Computer Science & Engineering.'
    },
    {
      status: 'new',
      name: 'Software, Data and Technology',
      description:
        'The Software, Data and Technology BSc is an advanced program designed for students with prior programming experience (i.e., participation in olympiads and contests) who want to deepen their expertise in Software Development, Data Analysis, and Machine Learning.\n\nHow competitive: Constructor admits holistically, with no minimum grade and no required subjects, and says IB applicants with 34 to 45 points have been the most successful. Applications for fall 2027 open on 1 October 2026: early action until 1 February 2027, then rolling admissions until 31 July 2027. If your diploma does not give direct access to a German university, Constructor may ask for the SAT or ACT before you enroll. Teaching is in English; an English A grade of 6 or 7 proves your English.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: null,
      programUrl:
        'https://constructor.university/programs/undergraduate-education/software-data-and-technology',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://constructor.university/programs/undergraduate-education/software-data-and-technology',
        FAQ,
        APPLY
      ],
      notes: NOTES
    }
  ]
}

export default refresh
