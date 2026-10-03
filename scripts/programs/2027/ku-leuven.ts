import type { RefreshFile } from '../lib/refresh'

/**
 * KU Leuven: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts ku-leuven
 */
const refresh: RefreshFile = {
  university: 'KU Leuven',
  entryYear: 2027,
  checkedOn: '2026-10-03',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmkx3rb5x000zi604vr6zt4uo',
      status: 'current',
      name: 'Bachelor of Business Administration (Brussels)',
      description:
        "The Bachelor of Science in Business Administration prepares you to find your way in an increasingly complex business environment. Globalisation has extended markets far beyond national borders and technology keeps global commerce moving 24 hours a day. Some products and services become increasingly complex, while others are becoming obsolete. Consumers demand prompt and customized service at the best price. Businesses require complex networks of distribution. These are just some examples of the issues you will address as a student in the Business Administration programme.\n\nThe three year programme is both hands-on and academic. It follows a practice-as-orientation and science-as-foundation approach. Business Administrators are managers who can take informed strategic decisions in response to economic challenges and opportunities.\n\nThe programme is taught in English and has a strong international focus. Our students can participate in exchange programmes with numerous partners both within and outside Europe. Selected students can pursue a double degree with Kedge Business School (Marseille) or the University of Galway (Ireland). These double degrees take four years of study.\n\nStudent profile\nYou have a fascination for the world of business;\nYou wish to study in the vibrant international and multicultural city of Brussels; \nYou see learning and working in a multicultural team as a personal asset;\nYou are eager to pursue an international career;\nYou aspire to enter the labour market with both practical experience and an academic bachelor's degree.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_53266472/diploma_omschrijving',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_53266472/toelatingsvoorwaarden',
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_53266472/diploma_omschrijving'
      ],
      notes:
        "Content 4.8b: KU Leuven's admission requirements, 2027-2028 tab: IB Diploma holders \"can be admitted provided they meet the English language proficiency requirements\". IB holders need no extra proof of maths (SAT, ACT, AP Calculus AB or OMPT-A is asked of non-EEA school diplomas), but every applicant takes the faculty's free online maths test and uploads the result. English: TOEFL iBT 90, IELTS 6.5, CAE or CPE, or an exemption with an IB Diploma where at least half the courses were taught in English (not an online IB). No IB figure is published: the Diploma is the only IB condition, so 24 under 4.8a's approved policy (stored 30, no source). Checked, none required: the stored Maths HL 5 and English rows had no source. Admission is at the faculty's discretion on the complete file."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkx3mfxi000ti604q7dejn7t',
      status: 'current',
      name: 'Bachelor of Business Engineering (Brussels, joint with UCLouvain Saint-Louis)',
      description:
        'About the programme\nThe Bachelor of Science in Business Engineering in Brussels is a joint English-taught programme organised by the Faculty of Economics and Business of KU Leuven and the Faculty of Economics, Social and Political Sciences and Communication of the UCLouvain Saint-Louis – Bruxelles. Both institutions are situated in the heart of the city, near Brussels Central Station. Students will attend courses and take exams at both institutions and obtain a joint degree.\n\nCompanies and organizations today operate in a highly complex and interconnected world, where they must navigate rapid technological changes, global competition, and evolving consumer expectations. To thrive in this environment, they make critical decisions that affect every aspect of their operations, from financial planning to marketing strategies, production efficiency and human resource management. \n\nThe Business Engineering programme equips students with the skills and knowledge to understand and optimize these decisions. The approach is multidisciplinary and includes a thorough study of all major business domains such as finance, accounting, marketing, logistics and human resources, as well as the economic, legal and social landscape in which businesses operate. Additionally, the programme emphasizes the development of strong analytical skills. Students learn how to use data analysis, mathematical modeling and IT tools to make informed decisions, optimize business processes, predict outcomes and assess risks. \n\nSince analytical skills are a core part of the Business Engineering programme, students are expected to come with a solid background in mathematics. They will also need to anticipate working in multiple languages, a natural extension of living and studying in multi-lingual Belgium and Brussels. Students refine their abilities in English through courses and workshops whilst studying at least one other language to encourage familiarity with today’s polyglot business environment. \n\nStudent profile\nIf you would like to:\n\ngain insight into the roles various business domains play in organisations and into the economic world surrounding organisations,\nmaster the necessary mathematical and statistical techniques to analyse and solve business problems,\nacquire a solid background in ICT and information management,\nand if you are also fascinated by the international and intercultural dimensions of business,\nthen this programme is a great fit.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_54764298/diploma_omschrijving',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_54764298/toelatingsvoorwaarden',
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_54764298/diploma_omschrijving'
      ],
      notes:
        'Content 4.8b: KU Leuven\'s admission requirements, 2027-2028 tab: the IB Diploma is a qualifying diploma. IB holders are "strongly advised" to have taken Maths AA HL, a recommendation rather than a condition (non-EEA school diplomas need AP Calculus AB 4 or OMPT-D 60%); every applicant takes the free online maths test and accounts for any gap years. English: TOEFL iBT 90, IELTS 6.5, or an exemption with an IB Diploma where at least half the courses were taught in English (not an online IB). No IB figure is published: the Diploma is the only IB condition, so 24 under 4.8a\'s approved policy, as stored. Checked, none required: the stored Maths AA HL 4 and English rows are removed; the maths advice is noted here. Joint programme in Brussels.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkxs81lg0001l104oxuq6z8h',
      status: 'current',
      name: 'Bachelor of Engineering Technology',
      description:
        "Graduates in Engineering Technology need to be all-rounders who are multi-deployable. Therefore, a polyvalent and generic engineering training is crucial. In this study programme, you will gain a solid engineering basis and a broad introduction to mathematics, chemistry, physics and biology. You will immerse yourself in typical engineering disciplines such as computer science, graphic techniques and project skills while learning to think and act critically. In addition, you will also develop skills in the field of management, communication and teamwork.\n\nThe academic bachelor's programme consists of 3 programme stages. The entire programme covers 180 ECTS. The first bachelor's stage covers generic engineering training for all students. It consists of basic sciences, introductions to various technologies, a number of broadening courses and the projects of the Engineering Experience. The generic engineering training partly continues in the second and third bachelor's stage. In the second stage of the programme, you select a specialisation. In the third bachelor's stage, you choose a specific option within your specialisation.\n\nProgramme strengths\nFrom the start of the programme, you will put your knowledge into practice in labs. The campus has an extensive and modern lab infrastructure with equipment on an industrial scale. You will also get to know the industry better through company visits and guest lectures from professionals in the field. The master's thesis in the last year is often linked to a company internship at home or abroad.\nGroup T Leuven Campus offers bachelor's and master's programmes to students of more than 87 different nationalities. This allows you to study in a truly international environment. Collaborating with other foreign students is also a learning experience and adds value to your study programme and diploma.\nGroup T Leuven Campus is a breeding ground for ambitious student projects. The first Belgian solar car was built here and in 2019, the eighth Solar Team even became world champion in Australia with their self-built solar-powered racing car. The Faculty of Engineering Technology also has several other student teams who are, among other things, building an electric racing car, developing 3D printers for medical applications or making Leuven climate neutral in 2030.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_55554488/diploma_omschrijving',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_55554488/toelatingsvoorwaarden',
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_55554488/diploma_omschrijving'
      ],
      notes:
        "Content 4.8b: KU Leuven's admission requirements, 2027-2028 tab: IB Diploma holders can be admitted provided they meet the English and maths requirements. Maths and science: an OMPT-G result of at least 60%, or, for IB holders, the starting test on the Group T campus in Leuven in early July, which is mandatory but not binding. English: TOEFL iBT 85, IELTS 6.5, CAE or CPE 176, or an exemption with an IB Diploma where at least half the courses were taught in English (not an online IB). Deadlines for 2027-2028: 15 January 2027 for non-EEA applicants, 15 June 2027 for EEA applicants. No IB figure is published: the Diploma is the only IB condition, so 24 under 4.8a's approved policy (stored 30, no source). Checked, none required: no subject is named; the stored English row had no source."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkx3jdga000oi604t0dnv2pn',
      status: 'current',
      name: 'Bachelor of European Studies (Una Europa joint programme)',
      description:
        'In this unique joint programme, organised by nine research-intensive universities within the Una Europa alliance, you study the fundamental aspects and values of the European Union as well as European states and societies.\n\nAdopting a multidisciplinary approach, you reflect on the role of Europe in the world and master research skills to analyse key issues related to Europe. Through our extensive mobility programme, you will not only learn about Europe, but also experience, live and grow in an international setting. \n\nFour key characteristics of the Bachelor of European Studies\nTruly international: You study at two to three destinations out of nine countries. Immersing yourself into different European cultures, you will develop transversal skills that are high in demand both in domestic and international work environments.\n\nTruly multidisciplinary: After a joint multidisciplinary curriculum, you follow a major and a minor out of seven fields of study, benefiting from the in-house expertise of all partner universities.\n\nTruly multilingual: In addition to English, you learn a second European language, gaining a clear added value on the European labour market.\nTruly you: Thanks to the many options, you can tailor the programme to fit your needs, interests and aspirations.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://ghum.kuleuven.be/EN/baes',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://ghum.kuleuven.be/EN/baes/apply',
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_58415826/toelatingsvoorwaarden'
      ],
      notes:
        'Content 4.8b: the Una Europa joint Bachelor of Arts in European Studies (BAES), coordinated by KU Leuven, as stored for Complutense (4.7) and Bologna (4.8a). KU Leuven assesses "capacity and suitability" on a reading and writing assignment, a video pitch, a start-university form and an English test; the IB is not among the exemptions. Checked, none required: no school subject is named. No IB points figure is published: the stored 24 is kept, unverified. The application page describes 2026-27 (deadline 1 April 2026) and says 2027-2028 applications open in fall 2026, so stamped 2026. The stored catalogue page is the old version, closed to new students from 2026-2027; the link is now the programme\'s own site. Degree corrected from Master to Bachelor of Arts.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkxsbyc3000bl104d19mp32x',
      status: 'current',
      name: 'Bachelor of Philosophy',
      description:
        'The Bachelor of  Philosophy programme will do much more than introduce you to the highly sought-after skills of logic, critical thinking and close reading. Structuring your own quest for truth, a Bachelor of philosophy will help you to orient your thoughts about the world that we are living in, and it will also teach you to use philosophical skills in analysing contemporary scientific and societal debates. \n\nThe aim of the programme is to provide a thorough, broad and comprehensive historical and systematic education in philosophy. At the same time, the programme seeks to provide students with the research skills required for successful written and verbal expression in philosophy. You’ll also learn to use philosophical skills in analysing contemporary societal debates. \n\nThe programme is structure with a common major paired with your choice of minor. The philosophy courses in the major (Truncus Communis) provide you with the necessary knowledge of systematic philosophy and its history and make you familiar with key philosophical topics and concepts. At the same time, you will learn how to read and analyse texts closely, to give well-structured presentations and to write a clear and cogent philosophical text. For the minor, you can choose one of the following options:\n\nThe Liberal Arts Minor consists of a broad range of introductory courses in the humanities, social sciences, and natural sciences with a strong interdisciplinary component. It also offers you the opportunity to read philosophical texts in French or German or to choose more philosophical electives.\n\nThe Educational Studies Minor and the Theology and Religious Studies Minor are offered in collaboration with the Faculty of Psychology and Educational Studies and the Faculty of Theology and Religious Studies, respectively. These minors introduce you to the basic topics and methods of the two disciplines.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_55540651/diploma_omschrijving',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_55540651/toelatingsvoorwaarden',
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_55540651/diploma_omschrijving'
      ],
      notes:
        "Content 4.8b: KU Leuven's admission requirements, 2027-2028 tab: the Institute of Philosophy considers any diploma that gives university access at home; its Board of Admissions decides on the complete file, including a motivation letter and the Institute's academic reading and writing assignment. English: TOEFL iBT 90, IELTS 6.5, C1 Advanced 176 or C2 Proficiency; the IB is not an exemption (only degrees from six English-speaking countries). No IB figure is published: the Diploma is the only IB condition, so 24 under 4.8a's approved policy (stored 28, no source). Checked, none required: no subject is named; the stored English row had no source."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkxsadqq0006l104q2k863z4',
      status: 'current',
      name: 'Bachelor of Theology and Religious Studies',
      description:
        "The three-year Bachelor of Theology and Religious Studies explores the study of Christianity and other religions. As an intercultural programme with students from every part of the globe, it aims for a broad development of knowledge in all theological areas whilst encouraging specialisation in particular areas of interest. Students hone skills in research, communication, cultural engagement and inquiry, as well as developing their critical and creative writing skills. The programme initiates students in all areas that together constitute Christian theology. Particular emphasis is placed on: developing a deeper understanding of the Christian tradition and the history of the Church; improving students' abilities in modern and Biblical languages; philosophy and other human sciences; a critical broadening and maturing of faith in conversation with contemporary culture; stimulating an interest in the mutual relationships between the various Christian churches, and between Christianity and other world religions. This solid basis is laid through challenging lectures, interactive seminars in small groups, and personal guidance in the writing of papers and essays to prepare students to enter into the world of independent theological research. \n\nTheology and religious studies are distinct disciplines; each offers a different perspective, yet they are closely related.\n\n1. Theology: You study various aspects of the Christian tradition:\n\nSystematic Theology: You focus on the central ideas of Christianity and their relationship with contemporary cultural, philosophical, and societal trends.\nEthics: You delve into Christian thought on what is considered good and how this is shaped on personal, social, and political levels.\nBiblical Studies: You study and interpret biblical texts using historical-critical and literary methods.\nHistory of Church and Theology: You explore the origins and development of Christianity and how churches have evolved over the centuries.\nPastoral Theology: You investigate how people today experience religion and spirituality and how they can be supported in this journey.\n\n2. Religious Studies: You become acquainted with various world religions and interreligious dialogue. You learn how to study religions in a scientific manner, for example, by critically engaging with sources.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_51016745/diploma_omschrijving',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_51016745/toelatingsvoorwaarden',
        'https://onderwijsaanbod.kuleuven.be/opleidingen/e/SC_51016745/diploma_omschrijving'
      ],
      notes:
        "Content 4.8b: KU Leuven's admission requirements, 2027-2028 tab: the IB Diploma is named as equivalent to the Flemish secondary diploma. The application needs a motivation letter, CV and writing sample in English; the committee may then ask for TOEFL iBT 79-80 or IELTS 6.5-7. No IB figure is published: the Diploma is the only IB condition, so 24 under 4.8a's approved policy, as stored. Checked, none required: no subject is named; the stored English row had no source."
    }
  ]
}

export default refresh
