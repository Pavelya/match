import type { RefreshFile } from '../lib/refresh'

/**
 * University of Cambridge: requirements for 2027 entry.
 *
 * Exported from the database on 2026-10-07 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Exported on 7 October 2026 for content task 8.1, to re-file programs under the fields of
 * study through this tool: every program here is unchecked, so only a changed `field` is
 * written. University of Cambridge's checked 2027 requirements are in university-of-cambridge.ts, the content task 1.2 file,
 * which has another shape and is applied with apply-2027-requirements.ts.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts scripts/programs/2027/university-of-cambridge-refresh.ts
 */
const refresh: RefreshFile = {
  university: 'University of Cambridge',
  entryYear: 2027,
  checkedOn: '2026-10-07',
  programs: [
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgf8eri0003jm04l5r6l4m1',
      status: 'current',
      name: 'Anglo-Saxon, Norse, and Celtic, BA (Hons)',
      description:
        "This course focuses on the history, material culture, languages and literature of the peoples of Britain, Ireland and the Scandinavian world in the earlier Middle Ages.\n\nYou'll discover medieval history while learning languages like Old Norse and medieval Welsh, Irish and Latin.",
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl:
        'https://www.undergraduate.study.cam.ac.uk/courses/anglo-saxon-norse-celtic-ba-hons',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgfxo650009jm04ldzsbwyb',
      status: 'current',
      name: 'Archaeology, BA (Hons)',
      description:
        'Archaeology at Cambridge is a dynamic course. You can study archaeology, Assyriology, biological anthropology and Egyptology.​\n\nExplore human evolution and biology, ancient cultures and languages, early societies and how heritage affects identity and politics today. You can also choose a subject or 2 to specialise in.',
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/archaeology-ba-hons',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlggitso000pjm04yh6ua3ky',
      status: 'current',
      name: 'Architecture, BA (Hons) and MArch',
      description:
        'Architecture at Cambridge combines the intellectual challenges of both arts and sciences with the opportunity for creative design.\n\nStudy history and philosophy of architecture, participatory practice, inclusivity, contemporary culture and urbanism. Alongside this you’ll learn about construction, structural design and environmental design.',
      field: 'Architecture',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/architecture-ba-hons-march',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlggqzvk000vjm043wvr5276',
      status: 'current',
      name: 'Asian and Middle Eastern Studies, BA (Hons)',
      description:
        "Asian and Middle Eastern Studies at Cambridge allows you to explore contemporary global cultures. You'll study language, culture and history in depth.\n\nExplore a range of different languages and cultures, from Chinese, Japanese, and Korean to Arabic, Hebrew, Persian, Sanskrit, and Hindi. Spend a year abroad perfecting your language skills.",
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl:
        'https://www.undergraduate.study.cam.ac.uk/courses/asian-middle-eastern-studies-ba-hons',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgket8b0001lb043vkpgvez',
      status: 'current',
      name: 'Chemical Engineering and Biotechnology, BA (Hons) and MEng',
      description:
        "The Chemical Engineering and Biotechnology course at Cambridge looks at the challenge of how processes can make products in a sustainable way.\n\nChemical Engineers make chemical products from raw materials. Biotechnologists use living systems and organisms to make products. On the course, you'll learn the scientific principles used by both.",
      field: 'Engineering',
      degree: 'Master',
      duration: '4 years',
      minIBPoints: 41,
      programUrl:
        'https://www.undergraduate.study.cam.ac.uk/courses/chemical-engineering-biotechnology-ba-hons-meng',
      requirements: [
        { courses: ['BIO', 'PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgl4smw0008lb04jc2tpdy5',
      status: 'current',
      name: 'Classics, BA (Hons)',
      description:
        'Classics at Cambridge is the study of ancient Greek and Roman cultures, language, literature, philosophy, ancient history, art and archaeology.\n\nOur course is 4 years if you have little or no experience of Latin. If you have studied Latin A level (or equivalent), you can apply for the 3-year course instead.',
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/classics-ba-hons',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgl9t5g000clb04mtrhejta',
      status: 'current',
      name: 'Computer Science, BA (Hons) and MEng',
      description:
        'Computer Science at Cambridge brings together disciplines including mathematics, engineering, the natural sciences, psychology and linguistics.\n\nStudy modern computer science, along with the underlying theory and foundations in economics, law and business.',
      field: 'Computer Science',
      degree: 'Master',
      duration: '4 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/computer-science-ba-hons-meng',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgld8hq000jlb04jvq7xkau',
      status: 'current',
      name: 'Design, BA (Hons) and MDes',
      description:
        "The Design course combines architecture, engineering, and material science in one degree. It will challenge you to think about global issues in the built environment, like climate change, and how to address them.\n\nAt Cambridge, you'll have the opportunity to design solutions to a range of environmental and social challenges.",
      field: 'Architecture',
      degree: 'Master',
      duration: '4 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/design-ba-hons-mdes',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgljsxa000nlb04cd3fivvi',
      status: 'current',
      name: 'Economics, BA (Hons)',
      description:
        'Economics at Cambridge gives you an understanding of core, pure and applied economics.\n\nStudy a range of different topics, including supply and demand, the role of prices and markets, employment, inflation, the operation of financial institutions and monetary policy.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/economics-ba-hons',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlglv9zy000rlb04tw6uhrcx',
      status: 'current',
      name: 'Education, BA (Hons)',
      description:
        "Education at Cambridge is the interdisciplinary study of human development and transformation. You'll study important questions about the nature of education and the impact of education systems.\n\nExplore what it means to be educated in childhood and beyond. Consider how education can promote justice. Discover how Education relates to social, political, economic and cultural contexts.",
      field: 'Education',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/education-ba-hons',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgm00a5001glb04ntpodzqs',
      status: 'current',
      name: 'Engineering, BA (Hons) and MEng',
      description:
        'Engineering at Cambridge enables you to develop your knowledge, skills, imagination and experience to the highest levels, so you’re ready for your future career. \n\nLearn a broad range of topics, such as civil, structural, electrical and mechanical engineering and specialise in areas that interest you the most.',
      field: 'Engineering',
      degree: 'Master',
      duration: '4 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/engineering-ba-hons-meng',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgmyegg0001le04pty1m6dr',
      status: 'current',
      name: 'English, BA (Hons)',
      description:
        'English at Cambridge gives you a solid foundation in history of English literature, from the medieval period right up to the present day.\n\nGet an introduction to different types of writing, prose, fiction, drama and poetry, as well as the chance to specialise and develop your own interests.',
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/english-ba-hons',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgri9u4000ll804vw6r8zdx',
      status: 'current',
      name: 'Environment, Law, and Economics, BA (Hons)',
      description:
        'Land Economy combines law and economics with aspects of the environment, business, finance and resource management.\n\nThroughout the course you’ll study a broad range of topics including law, environmental policy and economics, and you can choose to specialise in one discipline from your second year.',
      field: 'Environmental Studies',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl:
        'https://www.undergraduate.study.cam.ac.uk/courses/environment-law-economics-ba-hons',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgnhqne0006le044p4rrc13',
      status: 'current',
      name: 'Geography, BA (Hons)',
      description:
        'Geography at Cambridge is the study of some of the biggest challenges facing our planet, from climate emergencies to pandemics and urbanisation. \n\nExplore both human and physical geography.  You will have the option to specialise in one of these areas from the second year or continue with both.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/geography-ba-hons',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgp5gcf000ale044kuqi5ce',
      status: 'current',
      name: 'History and Modern Languages, BA (Hons)',
      description:
        'History and Modern Languages at Cambridge is a joint degree that gives you the opportunity to combine the study of languages, culture and history.\n\nLanguage options include German, French, Spanish, Italian, Portuguese, and Russian. As part of the course, you’ll spend a year abroad perfecting and practicing your language while you study, teach or work.',
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: 41,
      programUrl:
        'https://www.undergraduate.study.cam.ac.uk/courses/history-modern-languages-ba-hons',
      requirements: [{ courses: ['HIST'], level: 'HL', grade: 6, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgpbibz000lle04qc8qqtlg',
      status: 'current',
      name: 'History and Politics, BA (Hons)',
      description:
        "History and Politics at Cambridge is a joint degree that gives you the opportunity to combine the study of politics and history.\n\nYou'll engage with contemporary social and political issues, reflecting on their relationship.​",
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/history-politics-ba-hons',
      requirements: [{ courses: ['HIST'], level: 'HL', grade: 6, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgpghvd000ple04vjatpnd7',
      status: 'current',
      name: 'History of Art, BA (Hons)',
      description:
        'History of Art covers a wide spectrum of art and architecture from all over the world, from antiquity to modern and contemporary periods.  \n\nYou will gain a deep understanding of art and architecture, and develop visual literacy and awareness, as well as critical and analytical skills.',
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/history-of-art-ba-hons',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgpj7580019le04dqf23dru',
      status: 'current',
      name: 'History, BA (Hons)',
      description:
        'History at Cambridge gives you the opportunity to explore the past from the ancient world to the present day. \n\nChoose from a range of different topics that interest you, from politics in the Roman Republic to material culture in the Ottoman Empire and neoliberalism in modern Britain and America.',
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/history-ba-hons',
      requirements: [{ courses: ['HIST'], level: 'HL', grade: 6, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgreb460001l804ie5d78ha',
      status: 'current',
      name: 'Human, Social, and Political Sciences, BA (Hons)',
      description:
        'Human, Social, and Political Sciences at Cambridge includes politics and international relations, social anthropology and sociology.  \n\nYou can specialise in one or two subjects, but you can also explore a variety of other subjects too.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl:
        'https://www.undergraduate.study.cam.ac.uk/courses/human-social-political-sciences-ba-hons',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgrr2ro000ql804k0ohp7my',
      status: 'current',
      name: 'Law, BA (Hons)',
      description:
        'Law at the University of Cambridge allows you to understand law in its historical and social contexts, and to examine its general principles and techniques.\n\nThis course will prepare you to become qualified as a solicitor or barrister. As part of the course you will be able to specialise from second year and study other legal systems from outside the UK.',
      field: 'Law',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/law-ba-hons',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgvpx3r0001l704eurxg7kj',
      status: 'current',
      name: 'Linguistics, BA (Hons)',
      description:
        'Linguistics is the systematic study of human language. On the course, you will use methods and knowledge from many disciplines. These include philosophy, physics, engineering and psychology.\n\nYour studies will be varied – one day you might be poring over a medieval text for evidence of how the grammar of a language has changed, and the next, learning about how the larynx creates sound energy for speech, or how we can record brain responses in a categorisation task.',
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/linguistics-ba-hons',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgvuc5r0006l70464uevdg7',
      status: 'current',
      name: 'Mathematics, BA (Hons) and MMath',
      description:
        'Mathematics at Cambridge gives you the opportunity to develop your mathematical skills to the highest levels. The course offers a wide range of subjects, from abstract logic to black holes.\n\nStudy different options to discover your strengths, extend your knowledge and develop your interests.',
      field: 'Natural Sciences',
      degree: 'Master',
      duration: '4 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/mathematics-ba-hons-mmath',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlgwnrr3000al704y240cakt',
      status: 'current',
      name: 'Medicine, MB and BChir',
      description:
        "Medicine at Cambridge prepares you to become one of tomorrow's doctors, reflecting the latest advances in medical sciences and practice.\n\nStudy medical sciences for the first 3 years, then apply your knowledge as a clinical student on a placement for the last 3 years.",
      field: 'Medicine & Health',
      degree: 'Master',
      duration: '6 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/medicine-mb-bchir',
      requirements: [
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 7, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlhs5fna0001l404wlia8u3g',
      status: 'current',
      name: 'Modern and Medieval Languages, BA (Hons)',
      description:
        'Modern and Medieval Languages at Cambridge offers the opportunity to study the languages and cultures of most European, and many non-European, countries.\n\nExplore a range of languages, from French and German to Russian and Latin, and spend a year abroad immersing yourself in the languages and cultures that interest you the most.',
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: 41,
      programUrl:
        'https://www.undergraduate.study.cam.ac.uk/courses/modern-medieval-languages-ba-hons',
      requirements: [
        {
          courses: [
            'FRA-B',
            'FRA-LIT',
            'FRA-LL',
            'GER-B',
            'GER-LIT',
            'GER-LL',
            'GRK',
            'ITA-B',
            'LAT',
            'POR-B',
            'RUS-B',
            'SPA-B',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 6,
          critical: true
        }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlhs7zaq0001jp041pglucnx',
      status: 'current',
      name: 'Music, BA (Hons)',
      description:
        'Music at Cambridge covers many exciting topics. Learn new approaches to thinking about music across styles and\ngenres.\n\nDevelop your skills in critical thinking, analysis, performance, and composition.\n\nOur graduates go on to careers in a range of sectors, including music, arts management and business.',
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/music-ba-hons',
      requirements: [{ courses: ['MUSIC'], level: 'HL', grade: 6, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlhsbiq70005jp04sde6tiap',
      status: 'current',
      name: 'Natural Sciences, BA (Hons) and MSci',
      description:
        'Natural Sciences is a broad course that gives you the opportunity to study physical and biological sciences from 14 different departments.  \n\nThe course is flexible, which means you can study a range of new and familiar areas in the sciences before choosing a subject, or two, to specialise in.',
      field: 'Natural Sciences',
      degree: 'Master',
      duration: '4 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/natural-sciences-ba-hons-msci',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlhsg049000cjp04l5dp54yc',
      status: 'current',
      name: 'Philosophy, BA (Hons)',
      description:
        'Philosophy at Cambridge enables you to look behind the curtain to ask the toughest questions that no other subject can address. \n\nExplore human thought, the basis of knowledge, the nature of reason, consciousness and cognition, as well as the foundations of value and political theory.',
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/philosophy-ba-hons',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlhsu9gu000rjp0465ez8mx6',
      status: 'current',
      name: 'Psychological and Behavioural Sciences, BA (Hons)',
      description:
        'Psychological and Behavioural Sciences at Cambridge overlaps with disciplines such as anthropology, neuroscience, philosophy and sociology. \n\nStudy cognitive, social, developmental and biological psychology within the broader context of the behavioural sciences.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl:
        'https://www.undergraduate.study.cam.ac.uk/courses/psychological-behavioural-sciences-ba-hons',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'CS', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 6,
          critical: true
        }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlhsxjnu000zjp04qg9wn7uf',
      status: 'current',
      name: 'Theology, Religion, and Philosophy of Religion, BA (Hons)',
      description:
        'Theology, Religion, and Philosophy of Religion at Cambridge addresses fundamental questions through a range of religious traditions and philosophical standpoints. \n\nExplore contemporary and historic thought, culture and texts through philosophy, ethics, history, literature, languages, social sciences and classics.',
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 41,
      programUrl:
        'https://www.undergraduate.study.cam.ac.uk/courses/theology-religion-philosophy-of-religion-ba-hons',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2027 entry on 2026-09-24.
    {
      id: 'cmlht44tg0016jp04ibnspz8a',
      status: 'current',
      name: 'Veterinary Medicine, VetMB',
      description:
        'Veterinary Medicine at Cambridge gives you the opportunity to study the scientific basis of veterinary medicine and clinical veterinary science. \n\nStudy veterinary science foundations for the first 3 years, then apply your knowledge to a veterinary practice as a clinical student for the last 3 years.',
      field: 'Medicine & Health',
      degree: 'Master',
      duration: '6 years',
      minIBPoints: 41,
      programUrl: 'https://www.undergraduate.study.cam.ac.uk/courses/veterinary-medicine-vetmb',
      requirements: [
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: null,
      sources: []
    }
  ]
}

export default refresh
