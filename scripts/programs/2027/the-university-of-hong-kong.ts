import type { RefreshFile } from '../lib/refresh'

/**
 * The University of Hong Kong: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts the-university-of-hong-kong
 */
const refresh: RefreshFile = {
  university: 'The University of Hong Kong',
  entryYear: 2027,
  checkedOn: '2026-09-27',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyn9v000v7m2rfputh7be',
      status: 'current',
      name: 'Bachelor of Arts',
      description:
        'BA is a flexible programme with a curriculum spanning the humanities and related disciplines including history, philosophy, comparative literature, languages, linguistics, and more. Students enjoy flexibility in designing their study path in the humanities. Four-year direct entry options at the time of admission include BA or BA with major in Global Creative Industries. Dual degree options include BA (Literary Studies) & BEd (English Language Education), BA & LLB, and BA & BEng (Artificial Intelligence and Data Science).',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "BA & BEd (Double Degree)".
    {
      id: 'cmkkuynvx00177m2rn3k9p1t3',
      status: 'current',
      name: 'Bachelor of Arts and Bachelor of Education in Language Education - English',
      description:
        'Jointly offered by the Faculty of Arts and the Faculty of Education, this programme enables students to earn both a BA in English language and linguistics and a BEd in English language education over five years of study. Following graduation, you will meet the requirements for English language teachers in both primary and secondary schools as recommended by the HKSAR government. The curriculum integrates academic and professional studies in language education including pedagogical, psychological and sociological underpinnings of professional practice, with teaching experience in local schools. The programme is equivalent to a BA plus a Postgraduate Diploma in Education – a professional teaching qualification recognised locally.',
      field: 'Arts & Humanities',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 32,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-and-bachelor-of-education-language-education',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "BA & BEng (Double Degree)".
    {
      id: 'cmkkuysmx004t7m2rqqp160tb',
      status: 'current',
      name: 'Bachelor of Arts and Bachelor of Engineering in Artificial Intelligence and Data Science',
      description:
        'The BA & BEng in AI and Data Science at HKU is a groundbreaking 5-year double degree programme that integrates the technical rigor of engineering and computer science with the critical perspectives of the humanities. This interdisciplinary programme is designed for students who aspire to lead in a rapidly evolving, technology-driven world, where the ability to blend computational expertise with humanistic insight is becoming increasingly vital. Students will gain proficiency in cutting-edge AI and data science, while also cultivating critical thinking, ethical reasoning, and creative problem-solving skills. Graduates will be prepared for careers in data engineering, data science, machine learning, AI ethics consultancy, digital humanities, AI policy development, human-computer interaction design, and cultural analytics.',
      field: 'Computer Science',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 37,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-and-bachelor-of-engineering-artificial',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'ECON', 'PHYS'], level: 'HL', grade: 5, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "BA & LLB (Double Degree)".
    {
      id: 'cmkkuyxmh008v7m2r8srr4w73',
      status: 'current',
      name: 'Bachelor of Arts and Bachelor of Laws',
      description:
        "Jointly offered by the Faculty of Law and the Faculty of Arts, this programme draws on the complementary strengths of the two Faculties where questions of textual interpretation are paramount. It aims to develop competence in both legal and literary analysis, encourage interdisciplinary thinking, and enrich students' sense of human and social values. As a Literary Studies major, students have the opportunity to choose from subjects including English literature, Chinese literature, comparative literature, language and communication, linguistics, translation studies, and more. Students engage in interdisciplinary seminars examining law and film, medieval law and literature, law meaning and interpretation, contemporary law and literary texts, and legal history. To practise law in Hong Kong, LLB graduates must pass the Postgraduate Certificate in Laws (PCLL).",
      field: 'Law',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 41,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-and-bachelor-of-laws',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuys8s004j7m2r7erlbk9l',
      status: 'discontinued',
      name: 'Bachelor of Arts and Sciences in Applied Artificial Intelligence',
      description:
        'HKU offers a Bachelor of Arts and Sciences in Applied Artificial Intelligence (BASc[AppliedAI]). It is an interdisciplinary degree programme focusing on the application of AI technologies in various sectors, comprising 5 focus areas: AI Technology, AI in Business and Finance, AI in Medicine, AI for Smart Cities, and AI in Neurocognitive Science. Students will learn to develop AI solutions with both technical expertise and ethical considerations.',
      field: 'Computer Science',
      degree: 'Bachelor of Arts and Sciences',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-and-sciences-applied-artificial',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: [
        'https://admissions.hku.hk/apply/international-qualifications',
        'https://admissions.hku.hk/api/international_qualification/qualification?name=IB%20Diploma',
        'https://www.basc.hku.hk/basc-applied-ai/'
      ],
      notes:
        'Content 3.4: not offered for 2027 entry. HKU\'s IB admissions data for the 2027 intake lists 58 programmes and this BASc (6224) is not among them; its admissions page now returns 403 (unpublished), and the BASc site\'s programme menu marks a programme "not open for admission in 2026/27". Its nearest relatives are already stored: Bachelor of Arts and Bachelor of Engineering in Artificial Intelligence and Data Science, and Bachelor of Engineering and Master of Science in Engineering in Artificial Intelligence in Engineering. No successor added. Owner to decide what happens to this program.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuymyt000p7m2r40wqgfq9',
      status: 'current',
      name: 'Bachelor of Arts and Sciences in Design+',
      description:
        'Hosted by the Faculty of Architecture with collaboration from other faculties (Arts, Business, Engineering, Science, Social Sciences), the programme explores interdisciplinary design practice, design methods, theory, and ethics. Encompassing hands-on projects and internships, the curriculum develops core skills in problem framing, addressing design challenges, and collaborating with diverse stakeholders and teams.',
      field: 'Architecture',
      degree: 'Bachelor of Arts and Sciences',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-and-sciences-design',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyqvv003h7m2rwzn8ob5b',
      status: 'current',
      name: 'Bachelor of Arts and Sciences in Financial Technology',
      description:
        'Jointly offered by the Faculties of Business and Economics, Engineering, and Science. The programme equips students with integrated knowledge in computer science, statistics and finance, and prepares them for the dynamic FinTech industry. Students will learn about blockchain technology, cryptocurrency, algorithmic trading, AI for finance, among other cutting-edge areas. The programme is designed to meet the growing industry demand for talents in the FinTech field.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts and Sciences',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-and-sciences-financial-technology',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyybk009b7m2r7g0wy75b',
      status: 'current',
      name: 'Bachelor of Arts and Sciences in Global Health and Development',
      description:
        'Offered by the Faculty of Medicine, this is an interdisciplinary programme that combines global health, development studies, and social sciences. The programme includes a 6-month field placement component. Students will learn about health policy, epidemiology, and sustainable development in a global context.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Arts and Sciences',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-and-sciences-global-health-and-development',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuylpq00017m2r1fqtkacn',
      status: 'current',
      name: 'Bachelor of Arts in Architectural Studies',
      description:
        'Become a creative designer in architecture and the built environment. Students will learn to think critically, analyze complex situations, and create innovative design solutions. Our programme prepares you for various opportunities in design, including postgraduate studies in architecture and related fields, and careers in design professions. The programme features Design Studio as the core of experiential, problem-based learning. An optional overseas exchange programme and numerous experiential learning opportunities are available.',
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-architectural-studies',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuynkv00117m2rz177cdms',
      status: 'current',
      name: 'Bachelor of Arts in Humanities and Digital Technologies',
      description:
        "Students will select a humanities focus after a year of exploration, which can be undertaken in any Faculty of Arts programme area (e.g. Art History). Students' growing skills in this specialisation are combined with a focus in interdisciplinary digital technologies, geared to the knowledge and needs of the individual student. These overlapping areas come together in the internship and capstone courses: a focus on experiential and project-based learning brings together students' digital technology skills with their chosen humanities discipline to create a truly interdisciplinary programme structure. HKU's big data-oriented programmes are designed to equip you with the skillsets and knowledge to excel in today's digitalised world. Digital skills are now becoming a requirement for careers including marketing, communications, consultancy, management and other fields.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-humanities-and-digital-technologies',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuymdc000d7m2rxqfi3g0y',
      status: 'current',
      name: 'Bachelor of Arts in Landscape Studies',
      description:
        'This programme is a full-time four-year undergraduate programme designed to prepare students for the profession of landscape architecture. The programme provides a solid foundation in landscape architecture design, theory, and practice. Students will learn to design outdoor spaces, parks, and public areas that are both functional and aesthetically pleasing.',
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-landscape-studies',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuymo4000j7m2roce9qrln',
      status: 'current',
      name: 'Bachelor of Arts in Urban Studies',
      description:
        'This programme is a full-time four-year undergraduate programme designed to prepare students for careers in urban planning, urban design, and related fields. The programme provides a comprehensive understanding of urban issues, including urban development, housing, transportation, and environmental sustainability.',
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-arts-urban-studies',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyymk009h7m2r7tnomjtv',
      status: 'current',
      name: 'Bachelor of Biomedical Sciences',
      description:
        'The Bachelor of Biomedical Sciences (BBiomedSc) programme covers biomedical research, bioinformatics, clinical sciences, and health technology. This programme provides hands-on research opportunities with the Faculty of Medicine. Students will gain advanced training in understanding human health and disease at the molecular, cellular, and systemic levels.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Biomedical Sciences',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-biomedical-sciences',
      requirements: [
        { courses: ['BIO', 'CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyo71001d7m2r7vpjbc1p',
      status: 'current',
      name: 'Bachelor of Business Administration',
      description:
        'The BBA programme combines functional training with communication skills, computer analytics, and other sciences or social sciences subjects. Students can choose a major in one of five areas: Entrepreneurship, Design, and Innovation; Finance; Human Resources Management; Information Systems and Analytics; or Marketing. The School offers two BBA dual degree programmes in collaboration with leading universities – Sciences Po in France and the University of British Columbia (UBC) in Canada. Students are eligible to enrol in the CGMA Finance Leadership Program and kickstart their journey to become a member of Chartered Institute of Management Accountants and a Chartered Global Management Accountant while studying. The programme is designed for students who aim to pursue a career in banking, financial investment, information technology and management, advertising, marketing, human resource management, etc.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-business-administration',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyplk002h7m2rdxtswiud',
      status: 'current',
      name: 'Bachelor of Business Administration (Business Analytics)',
      description:
        'The BBA(BA) programme is crafted to meet the growing industry demand for talents in the business analytics field. Its curriculum offers students a comprehensive coverage of both technical and managerial skill sets. Students will learn a wide spectrum of knowledge from the disciplines of information technology, data science, business statistics and management. Students are eligible to enrol in the CGMA Finance Leadership Program. Graduates are expected to land data and analytics related jobs in sectors such as IT, finance, supply chain, marketing, consulting, manufacturing, and pursue post-graduate degrees in fields such as data science, information management, decision science, and big data.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-business-administration-business-analytics',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'SL', grade: 1, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "BBA(Law) & LLB (Double Degree)".
    {
      id: 'cmkkuyxxe00917m2re4dnd7j2',
      status: 'current',
      name: 'Bachelor of Business Administration (Law) and Bachelor of Laws',
      description:
        'Jointly offered by the HKU Business School and the Faculty of Law, our Bachelor of Business Administration (Law) (BBA[Law]) and Bachelor of Laws (LLB) integrate courses to equip you with professional knowledge and intensive training in the fields of business and law. Over five years, you will earn a BBA(Law) from the HKU Business School and an LLB from the Faculty of Law. Your LLB degree is the basic requirement to pursue a legal career and the first step towards entry to a Postgraduate Certificate in Laws (PCLL) programme. The programme with a professional core in accounting is accredited by HKICPA, ACCA, and CPA Australia. Students are also eligible to enrol in the CGMA Finance Leadership Program. Graduates have gone on to accept positions at Citigroup, Clifford Chance, Deloitte, Ernst & Young, Goldman Sachs, HSBC, JPMorgan, Morgan Stanley, PwC, and many others.',
      field: 'Law',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 41,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-business-administration-law-and-bachelor-of-laws',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 6, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyq5h002z7m2rzj8f04ld',
      status: 'current',
      name: 'Bachelor of Business Administration in Accounting and Finance / Accounting Data Analytics',
      description:
        'Our Bachelor of Business Administration in Accounting and Finance (BBA[Acc&Fin]) and Bachelor of Business Administration in Accounting Data Analytics (BBA[ADA]) are offered under the same programme code. BBA(Acc&Fin) students will prepare for a professional qualification in accounting and a leadership role in finance. BBA(ADA) students will be well prepared to take up leading roles in accounting analytics, digital economies and other technology-driven business domains. Both programmes are accredited by HKICPA for direct entry to the QP, ACCA foundation level exam exemptions, and CPA Australia associate membership. Students are also eligible for the CGMA Finance Leadership Program. Graduates have secured employment at Accenture, Bloomberg, Credit Suisse, Deloitte, Ernst & Young, JP Morgan, KPMG, Morgan Stanley, and PwC.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-business-administration-accounting-and-finance',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyqja00397m2r09j7r6xn',
      status: 'current',
      name: 'Bachelor of Economics / Bachelor of Economics and Finance',
      description:
        'Our Bachelor of Economics (BEcon) and Bachelor of Economics and Finance (BEcon&Fin) teach economic and financial theories and practical applications to unpack challenges in trade, banking, labour, and financial institutions. Through the BEcon programme, you will learn to evaluate economic performance of regional markets and analyse human behaviour and social interactions. The BEcon&Fin programme recognises the significance of economics as a foundation for the study of finance. The School offers a dual-degree Future Leaders programme with Peking University (PKU). The BEcon&Fin programme is a designated CFA university affiliation programme. Students are eligible for the CGMA Finance Leadership Program. Graduates have secured employment at Bloomberg, Goldman Sachs, JPMorgan, Morgan Stanley, and PwC.',
      field: 'Business & Economics',
      degree: 'Bachelor of Economics',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-economics-bachelor-of-economics-and-finance',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "BEd & BSc (Double Degree)".
    {
      id: 'cmkkuyzbd009x7m2r6ja33zsq',
      status: 'current',
      name: 'Bachelor of Education and Bachelor of Science',
      description:
        'Jointly offered by the Faculty of Education and the Faculty of Science, this five-year degree integrates academic and professional studies in science education. The interdisciplinary programme will equip you to teach science subjects across primary and secondary schools in Hong Kong. You will complete a science major through the Faculty of Science plus core courses in professional education through the Faculty of Education. A choice of seven science majors includes biochemistry, biological sciences, chemistry, ecology and biodiversity, food and nutritional science, molecular biology and biotechnology, and physics. Graduates will earn a BSc and a BEd in Science Education. The programme is equivalent to a BSc plus a Postgraduate Diploma in Education – a professional teaching qualification recognised locally.',
      field: 'Natural Sciences',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 33,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-education-and-bachelor-of-science',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuz0rl00av7m2rbdez5opi',
      status: 'current',
      name: 'Bachelor of Education in Early Childhood Education and Special Education',
      description:
        "Learn to teach children from birth to six in kindergartens, child care centres, and special child care centres. The five-year programme will equip you with the knowledge, skills, and attitude to work with young children and their families. The curriculum fully integrates early childhood and inclusive education to prepare you to effectively recognise and acknowledge children's diverse needs and support both typical and atypical development. Following graduation, you can apply for registration as a qualified kindergarten teacher, a child care worker and supervisor under the Child Care Services Regulations. You will be considered as having acquired training on the One-year In-service Course in Special Child Care Work recognised by the Social Welfare Department, and to have met the academic qualifications required as a kindergarten principal.",
      field: 'Social Sciences',
      degree: 'Bachelor of Education',
      duration: '5 years',
      minIBPoints: 32,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-education-early-childhood-education-and-special',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "BEng + MScEng (Integrated Bachelor+Master)".
    {
      id: 'cmkkuyuwa006r7m2rflqj29g2',
      status: 'current',
      name: 'Bachelor of Engineering and Master of Science in Engineering in Artificial Intelligence in Engineering',
      description:
        'This is an integrated Bachelor and Master degree programme in AI Engineering. Students will complete a BEng degree in their first 4 years and an MScEng in their 5th year. The programme provides comprehensive training in AI technologies and their engineering applications. Students will gain hands-on experience with AI projects and research. A scholarship of HKD 120,000 is provided for the MSc year.',
      field: 'Engineering',
      degree: "Integrated Bachelor's and Master's",
      duration: '5 years (4+1)',
      minIBPoints: 39,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-engineering-and-master-of-science-engineering',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuywgg00837m2rewsh0kol',
      status: 'current',
      name: 'Bachelor of Engineering Elite Programme',
      description:
        'This is a prestigious engineering programme for high-achieving students. Students can choose their BEng major after Year 1 from any of the engineering disciplines offered at HKU. The programme provides academic advisors, industrial mentors, and scholarships. Students will have opportunities for research, internships, and exchanges.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 40,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-engineering-elite-programme',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyudb006b7m2rfh09shce',
      status: 'current',
      name: 'Bachelor of Engineering in Biomedical Engineering',
      description:
        'BEng Biomedical Engineering at HKU integrates engineering principles with life sciences. The programme is accredited by the Hong Kong Institution of Engineers and covers core areas including biomechanics, medical instrumentation, tissue engineering, bioinformatics, and biomedical imaging. There are 5 specialist areas offered, including computational bioengineering and medical engineering. Articulation pathway to MBBS is also available for outstanding students.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-engineering-biomedical-engineering',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyvf300777m2rbm7a0myk',
      status: 'current',
      name: 'Bachelor of Engineering in Civil Engineering',
      description:
        'BEng Civil Engineering at HKU is accredited by HKIE and provides comprehensive training in civil engineering principles and practices. The programme covers 5 core areas including structural engineering, geotechnical engineering, construction management, transportation engineering, and environmental engineering. Students will also learn about Building Information Modelling (BIM) and AI applications in civil engineering.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-engineering-civil-engineering',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyttr005v7m2rlg6kb76l',
      status: 'current',
      name: 'Bachelor of Engineering in Computer Engineering / Electrical Engineering',
      description:
        'Computer Engineering and Electrical Engineering at HKU prepare students for careers in software and hardware development, electronics, telecommunications, and more. The programme offers a strong foundation in engineering principles and hands-on experience through projects and internships. Graduates are well-prepared for careers in technology companies, research institutions, and startups.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-engineering-computer-engineering-electrical',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyvxt007n7m2rbyab5ebv',
      status: 'current',
      name: 'Bachelor of Engineering in Data and Systems Engineering',
      description:
        'BEng Data and Systems Engineering at HKU is offered by the Department of Industrial and Manufacturing Systems Engineering. It has dual accreditation by both the Hong Kong Institution of Engineers (HKIE) and the Chartered Institute of Logistics and Transport (CILT). The programme covers data analytics, robotics, AI, optimization, supply chain and logistics.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-engineering-data-and-systems-engineering',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyol2001n7m2rvdx2ym0a',
      status: 'current',
      name: 'Bachelor of Finance in Asset Management and Private Banking',
      description:
        'A first-of-its-kind degree in Hong Kong and Asia. Develop the skills and acumen to enter the rapidly growing fields of asset management, private wealth management and banking & finance in Hong Kong and the Asia Pacific region. The pioneering Bachelor of Finance in Asset Management and Private Banking (BFin[AMPB]) programme offers a practical and career-orientated curriculum to equip you with the knowledge and skills to excel in the finance field. Complete specialised courses in equity valuation, alternative asset classes, lending and credit, financial regulations and compliance, ESG in finance and family office. Students are expected to complete the Hong Kong Securities and Investment Institute Paper 1 examination in their third or fourth year of studies.',
      field: 'Business & Economics',
      degree: 'Bachelor of Finance',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-finance-asset-management-and-private-banking',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuz0gh00ap7m2rid0y6pem',
      status: 'current',
      name: 'Bachelor of Journalism, Media and Artificial Intelligence',
      description:
        'This programme combines journalism, media studies, and artificial intelligence. Students will learn about the role of AI in modern media, digital storytelling, and the ethics of AI in journalism. An internship is required. Double major options are available. The programme prepares students for careers in journalism, media production, public relations, and digital content creation.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-journalism-media-and-artificial-intelligence',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'SL', grade: 5 },
            { course: 'ENG-LL', level: 'SL', grade: 5 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://admissions.hku.hk/apply/international-qualifications',
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-journalism-media-and-artificial-intelligence'
      ],
      notes:
        'Content 3.4: renamed, same programme (6822, BJMAI, 4 years): "AI" is now spelt out and the page moved. HKU\\\'s international qualifications page is for the 2027 intake (applications open 23 September 2026, interviews from December 2026); its data gives the expected lower boundary for admissions. Lower boundary 34 (was 32); no specific subject requirements; interview, personal statement and predicted scores. English: 5 in English A (HL/SL) or 6 in English B, or another listed English qualification, so the group is not critical (the stored English SL4 was out of date). Degree: HKU awards the Bachelor of Journalism, Media and Artificial Intelligence, which is not in the degree list; stored as "Bachelor" (award not recorded) rather than the wrong "Bachelor of Arts" until the owner approves adding it.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyx03008j7m2r23lskm4c',
      status: 'current',
      name: 'Bachelor of Laws',
      description:
        'The Bachelor of Laws (LLB) programme at HKU is a four-year programme that prepares students for a legal career. The programme provides a solid foundation in law and prepares students for the Postgraduate Certificate in Laws (PCLL) which is required to practice law in Hong Kong. The Faculty of Law is ranked among the top law schools in Asia.',
      field: 'Law',
      degree: 'Bachelor of Laws',
      duration: '4 years',
      minIBPoints: 40,
      programUrl: 'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-laws',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyz0g009r7m2rfgtg2lux',
      status: 'current',
      name: 'Bachelor of Nursing',
      description:
        'BNurs at HKU is a 5-year professional nursing programme. The programme leads to registration with the Hong Kong Nursing Council. Students will gain comprehensive clinical training in hospitals and community settings. Communicative Cantonese proficiency is required.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Nursing',
      duration: '5 years',
      minIBPoints: 32,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-nursing',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyr9w003r7m2rz44hoc23',
      status: 'current',
      name: 'Bachelor of Science in Actuarial Science',
      description:
        'Accredited by the UK Institute of Actuaries and the Society of Actuaries. The programme equips students with strong quantitative skills to pursue careers in insurance, finance, and risk management. Students can obtain exemptions from professional examinations. Approved as a Center of Actuarial Excellence by the Society of Actuaries.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-science-actuarial-science',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyt8t005d7m2ria8qqkxo',
      status: 'current',
      name: 'Bachelor of Science in Innovation and Technology',
      description:
        'Jointly offered by the Faculty of Engineering and the Faculty of Science. The programme provides training in innovation and entrepreneurship alongside technical skills. Students will have hands-on experience with projects, internships, and a 6-month Co-operative Experience. The programme prepares students for careers in technology startups, research, and development.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-science-innovation-and-technology',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 4, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyoxn001v7m2r76u5j4le',
      status: 'current',
      name: 'Bachelor of Science in Marketing Analytics and Technology',
      description:
        'Digitization and data are fundamentally changing all businesses and industries. The BSc(MAT) equips students with quantitative skills, technology, and marketing know-how to pursue a career in the digital economy and modern businesses. The program targets both STEM students with an interest in business as well as business students interested in the technology space. Students will gain a solid foundation in cutting-edge technical areas including computer programming, data science, digital platforms and marketing technology as well as business marketing know-how such as the design & launch of new technology products, targeting consumers, forecast and predicting markets, and building a technology-focused strategy. Students are eligible to enrol in the CGMA Finance Leadership Program.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-science-marketing-analytics-and-technology',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['BIO', 'BUS-MGMT', 'CHEM', 'CS', 'ECON', 'PHYS'],
          level: 'SL',
          grade: 1,
          critical: false
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuz05g00aj7m2reo1282m6',
      status: 'current',
      name: 'Bachelor of Psychology',
      description:
        'BSc Psychology at HKU offers research-intensive training in psychology. The programme provides hands-on research experience and prepares students for careers in clinical psychology, educational psychology, and research. Students will learn about cognitive psychology, developmental psychology, social psychology, and neuroscience.',
      field: 'Social Sciences',
      degree: 'Bachelor of Psychology',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-psychology',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'SL', grade: 5 },
            { course: 'ENG-LL', level: 'SL', grade: 5 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://admissions.hku.hk/apply/international-qualifications',
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-psychology'
      ],
      notes:
        "Content 3.4: HKU lists it as the Bachelor of Psychology (6705, BPsych, 4 years), not a BSc; the stored bachelor-of-psychology-0 page is gone. HKU\\'s international qualifications page is for the 2027 intake (applications open 23 September 2026, interviews from December 2026); its data gives the expected lower boundary for admissions. Lower boundary 38 (was 35); no specific subject requirements. English: 5 in English A (HL/SL) or 6 in English B, or another listed English qualification, so the group is not critical (the stored English SL4 was out of date)."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuym2a00077m2r3fnpfxrh',
      status: 'current',
      name: 'Bachelor of Science in Surveying',
      description:
        'Open your door to the exciting world of real estate, construction, property management, or urban planning and design. Our degree is accredited by local and international professional bodies, including RICS, HKIS, CIOB, HKIH, and HKIQEP. The programme provides a solid academic foundation in property, construction, and urban studies with pathways to professional qualifications.',
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-science-surveying',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyzuf00ad7m2rtdjrordy',
      status: 'current',
      name: 'Bachelor of Social Sciences',
      description:
        'BSocSc at HKU offers comprehensive training across 5 core social science disciplines. Students can select their major after year 1 and can choose from politics, sociology, social work, psychology, and geography. The programme emphasizes experiential learning and offers a wide range of career opportunities. Graduates are well-prepared for careers in government, NGOs, business, and research.',
      field: 'Social Sciences',
      degree: 'Bachelor of Social Sciences',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-social-sciences',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "BSocSc & LLB (Double Degree)".
    {
      id: 'cmkkuyxb9008p7m2r81scr9dv',
      status: 'current',
      name: 'Bachelor of Social Sciences (Government and Laws) and Bachelor of Laws',
      description:
        'This is a prestigious 5-year double degree programme combining political science with law. Students will earn both a BSocSc and an LLB degree. The programme provides comprehensive training in both government and legal studies, preparing students for careers in law, government, and public policy.',
      field: 'Law',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 41,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-social-sciences-government-and-laws-and-bachelor-of',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'SL', grade: 5 },
            { course: 'ENG-LL', level: 'SL', grade: 5 },
            { course: 'ENG-B', level: 'SL', grade: 6 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://admissions.hku.hk/apply/international-qualifications',
        'https://admissions.hku.hk/programmes/undergraduate-programmes/bachelor-of-social-sciences-government-and-laws-and-bachelor-of'
      ],
      notes:
        "Content 3.4: the page moved to a new slug; same programme (6810, BSocSc(Govt&Laws)&LLB, 5 years). HKU\\'s international qualifications page is for the 2027 intake (applications open 23 September 2026, interviews from December 2026); its data gives the expected lower boundary for admissions. Lower boundary 41 (was 40), with at least 6 in each examined subject, which the model cannot hold. English assessment for non-local candidates, a personal statement of up to 1,000 words and an interview. English: 5 in English A (HL/SL) or 6 in English B, or another listed English qualification, so the group is not critical (the stored English SL4 was out of date)."
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkuyro100417m2rekxfst0c',
      status: 'current',
      name: 'Computing and Data Science',
      description:
        'Computing and Data Science at HKU offers a comprehensive foundation in computing, data analysis, and AI. The programme prepares students for careers in software development, data engineering, machine learning, and research. Two majors are available: Computer Science, or AI and Data Science. Students will have hands-on experience through projects and internships.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://admissions.hku.hk/programmes/undergraduate-programmes/computing-and-data-science',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 5, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    }
  ]
}

export default refresh
