import type { RefreshFile } from '../lib/refresh'

/**
 * Copenhagen Business School: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts copenhagen-business-school
 */
const refresh: RefreshFile = {
  university: 'Copenhagen Business School',
  entryYear: 2027,
  checkedOn: '2026-10-03',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmkxzyz1e0017l704j9mvyr4k',
      status: 'current',
      name: 'BSc in Business Administration and Digital Management',
      description:
        'Doing business in a digital age\nDigital innovation, new technologies and advanced ways of working with data shape and change virtually all aspects of how companies and other organisations do business. Digital information, including “big data”, creates new ways for companies to develop their activities and strategies. Social media and new communication platforms require companies to find new ways of managing communication internally as well as their relations with partners and customers. Planning, development, administration, and production are increasingly optimised through digital systems. In addition, organisations and the people who work within them must adapt to new ways of working, thinking and managing.\n\nUnderstanding digital strategies as part of business strategies\nTo manage this digital complexity businesses need specialists who not only understand digital innovation, data and technologies, but also the strategic goals organisations set and the business conditions and market challenges they face. This expertise is what BSc DM aims to help you develop. It does not focus on technology as such, but rather on the interactions and interrelations between technology, data, business and society. It is not so much about understanding specific IT systems or solutions as understanding how digital transformations and data-driven approaches open new ways of working and at the same time pose new challenges.\n\nTraditionally, digital technologies are seen as “add-ons”. BSc DM instead sees digital transformations as something a modern company must integrate as part of everything it does. In particular, future managers and leaders will need to take responsibility for digital developments, rather than rely on consultants or their IT department.\n\nA digital approach or plan is not something you add to an existing business model or plan – the two should go hand in hand through the whole development process. Or to put it simply: Today, a professional business mindset also needs to be a digital mindset.\n\nA highly integrated approach to working with digitalisation\nBSc DM comprises three main areas of study: business admini­stration, digital technologies and data, and sociological and organisational perspectives. Most of the courses combine and integrate elements from two or all three areas – and in some way, perspectives on digitalisation will be part of every single course.\n\nIn these integrated courses, you will work with traditional business topics such as finance, accounting, statistics, innovation, strategy and organisation. You will learn how to make sense of complex data, work with data analysis – how you collect, organise and gain insights – and how to create valuable know­ledge as a foundation for making qualified business decisions. You will also work with the many different options that are available to companies, and get an understanding of challenging and critical issues, such as data protection, privacy, ethics and responsibility. In addition, you will work with understanding digital transformations not only from the perspective of the individual company but also in terms of how they impact on a societal and global level.\n\nUnderstanding these topics – and especially how they relate to and affect each other – will make you master a range of analytical methods that enable you to understand complexities, work in a structured fashion and develop effective digital business solutions.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/bsc-business-administration-and-digital-management',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 3, critical: true },
        {
          anyOf: [
            { course: 'BUS-MGMT', level: 'SL', grade: 3 },
            { course: 'ECON', level: 'SL', grade: 3 },
            { course: 'GLOB-POL', level: 'SL', grade: 3 },
            { course: 'HIST', level: 'SL', grade: 3 },
            { course: 'GEOG', level: 'HL', grade: 3 },
            { course: 'ANTHRO', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/application-and-admission',
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/bsc-business-administration-and-digital-management',
        'https://ufsn.dk/uddannelse/anerkendelse-og-dokumentation/find-vurderinger/eksamenshaandbogen/landedbtest/#handbookId=3&countryId=269&subjectId=3'
      ],
      notes:
        "Content 4.8b: CBS's application and admission page describes the 2027 admission round (application deadline 15 March 2027, 12:00 CET, for an international exam in quota 1 or 2; diploma by 5 July). The IB Diploma qualifies with at least 24 points including bonus points, six subjects, three or four at HL, the Extended Essay, TOK and CAS. Specific requirements as CBS maps the IB (Danish 2.0 = IB 3, 6.0 = IB 5): English B at 6.0, met by English A Literature or Language and Literature or English B, SL or HL, at 5; the language requirement, English A level, is any English A or English B HL, so English B SL also needs a test. Mathematics B: Maths AA or AI, SL or HL, at 3. History, Social Studies or International Economics B: Business Management, Economics, Global Politics or History (SL or HL), or Geography or Social and Cultural Anthropology (HL), at 3. All three are conditions, so critical. Selection: 60% of places in quota 1 by the IB total converted to the Danish scale, the rest in quota 2 on a motivational essay, activities and grade level. The 2026 quota 1 cut-off was 9.8, about 38 IB points on ufsn.dk's 2026 conversion table (the 2027 table is due by 1 March 2027); 210 places. The published minimum is 24; the stored 30 had no source. The stored rows asked English at 4 or 5 and Maths AI at HL; Maths AI SL now counts. Bachelor of Science."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkxzm7ga000dl704z4dqp2qo',
      status: 'current',
      name: 'BSc in Business Administration and Service Management',
      description:
        'Services in a broad perspective\nThe service sector is the largest sector in most developed countries. In Denmark it contributes around 70 % of the national GDP. A service is an intangible offering; no physical product is exchanged between buyer and seller before purchase. Traditional examples could be services provided in shops, restaurants, hotels, tourism agencies, travelling, amusement parks or even in public institutions such as museums. Modern examples of services include subscriptions to streaming services, social media, mobile and communication services as well as business services.\n\nServices are an integral part of what a company is and what it produces. For example, physical products often also have an additional service attached to them in the form of knowledge, time or attention. A simple example could be when you buy a new phone. You are paying for a physical product, but you also receive in-store pre-purchase service where the sales assistant provides you with information and answers the questions you might have. However, you also receive post-purchase service in the form of a warranty and 24/7 customer support.\n\nA shift from products to services\nWhile companies used to talk about the products they provided, they now emphasise on the service they provide to their customers – whether it be as part of a purchased physical product or as a standalone service. The wave of digitalisation we are currently experiencing is probably the clearest example of the shift from products to services, affecting us all in our jobs or studies as well as in our personal lives. Service has become an essential part of product development and a means to compete with industry rivals. Today effective customer service is a vital element to survive and grow in a competitive market. If you do not cater to the expectations and needs of your customers, your competitors definitely will.\n\nThere is often also a trade-off between the quality of a physical product and the service provided with it. That is, although objectively the competitor might have a slightly better product, you can still attract the consumers by providing a better service and purchasing experience.\n\nThe general and the service-specific perspective\nThe BSc SEM gives you a broad understanding of business administration, how businesses develop and stay ahead of competition and how services add value across industries, both as stand-alone offerings and in relation to services and experiences. You will also get a broad understanding of the service sector as a whole while going more in-depth with one specific service sector through case studies and textbook examples.\n\nThe objective of this structure is to understand services as an integrated part of a company. As an example, imagine a company providing services of some sort, whether it be to businesses or to private consumers. The manager of such a company cannot simply develop and provide services without considering the external environment of the company. They need to understand the economic and competitive setting in which the company is embedded, how to organise and market the company and its services, what economic and strategic goals it seeks to achieve and how providing competitive services can help accomplish such goals.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/bsc-business-administration-and-service-management',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 3, critical: true },
        {
          anyOf: [
            { course: 'BUS-MGMT', level: 'SL', grade: 3 },
            { course: 'ECON', level: 'SL', grade: 3 },
            { course: 'GLOB-POL', level: 'SL', grade: 3 },
            { course: 'HIST', level: 'SL', grade: 3 },
            { course: 'GEOG', level: 'HL', grade: 3 },
            { course: 'ANTHRO', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/application-and-admission',
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/bsc-business-administration-and-service-management',
        'https://ufsn.dk/uddannelse/anerkendelse-og-dokumentation/find-vurderinger/eksamenshaandbogen/landedbtest/#handbookId=3&countryId=269&subjectId=3'
      ],
      notes:
        "Content 4.8b: CBS's application and admission page describes the 2027 admission round (application deadline 15 March 2027, 12:00 CET, for an international exam in quota 1 or 2; diploma by 5 July). The IB Diploma qualifies with at least 24 points including bonus points, six subjects, three or four at HL, the Extended Essay, TOK and CAS. Specific requirements as CBS maps the IB (Danish 2.0 = IB 3, 6.0 = IB 5): English B at 6.0, met by English A Literature or Language and Literature or English B, SL or HL, at 5; the language requirement, English A level, is any English A or English B HL, so English B SL also needs a test. Mathematics B: Maths AA or AI, SL or HL, at 3. History, Social Studies or International Economics B: Business Management, Economics, Global Politics or History (SL or HL), or Geography or Social and Cultural Anthropology (HL), at 3. All three are conditions, so critical. Selection: 70% of places in quota 1 by the IB total converted to the Danish scale, the rest in quota 2 on a motivational essay, activities and grade level. The 2026 quota 1 cut-off was 9.4, about 37 IB points on ufsn.dk's 2026 conversion table (the 2027 table is due by 1 March 2027); 170 places. The published minimum is 24; the stored 30 had no source. The stored rows asked English at 4 or 5 and Maths AI at HL; Maths AI SL now counts. Bachelor of Science."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkxzq981000nl704z1vswagd',
      status: 'current',
      name: 'BSc in Business Administration and Sociology',
      description:
        'In the BSc SOC you will learn how social dynamics shape business culture – and how cultural and social factors along with economic considerations affect the decision-making processes in companies and other types of private and public organisations.\n\nIntegrating business and sociology\nBusiness classes and sociology classes are rarely taught separately. Students work with traditional business topics and socio­logy together – and apply tools from both fields.\n\nBusiness administration gives you an understanding of how companies and other types of organisations are structured and how they make decisions based on numbers and economic thinking. Sociology provides you with tools and concepts to understand how social dimensions also affect the conditions under which business decisions must be made. In other words, you will learn how to work with business administration with focus on society – and at the same time you learn to use a sociological perspective in a business context.\n\nMaking sense of complexity\nImagine two companies or other types of complex organisations that want to work together. Perhaps they even want to merge into one company. They need to understand each other’s financial positions and ways of economic planning, products, production, strategy, and market position. However, it is also important to learn about each other’s external as well as internal contexts. External factors could for example be competitors, partners, economic and social trends and conditions affecting the industry. Equally important internal factors of the companies include an understanding of each other’s management traditions, business culture and organisational framework.\nCombining all these perspectives is essential for planning the collaboration between the two organisations – in order to make sense financially but also to gain from cooperation and to enhance the business of the new merged company. In other words, you need to understand how both economic and social factors shape business conditions and how traditional economic thinking can sometimes clash with social trends and behaviour and external conditions that may be hard to control or predict.\n\nBuilding analytical skills\nWhen companies plan strategies and make decisions, they need to understand the social context in which they operate. This relates to how the employees interact and see themselves and the company, how changing norms and values affect consumers and business partners and how economic and technological development change existing markets and helps create new ones. The BSc SOC aims to teach you how to create new knowledge by asking the right questions. To do this you will acquire a wide range of sociological and economic tools and methods that help companies make decisions based on a thorough analysis of the social and economic business context. This also makes the programme very methodological in order for students to build strong analytical skills.\n\nThe methods are both quantitative (e.g. statistical analysis) and qualitative (e.g. interviews, focus groups). You will not only learn how to use these tools but also to combine them – and most importantly to select which ones are best suited for the problem that needs to be solved. This gives you a broad and strong analytical foundation for understanding how knowledge is created – and to create new knowledge yourself – and to differentiate between what we think that we know and what we know that we know to make useful and responsible business decisions.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/bsc-business-administration-and-sociology',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'BUS-MGMT', level: 'SL', grade: 3 },
            { course: 'ECON', level: 'SL', grade: 3 },
            { course: 'GLOB-POL', level: 'SL', grade: 3 },
            { course: 'HIST', level: 'SL', grade: 3 },
            { course: 'GEOG', level: 'HL', grade: 3 },
            { course: 'ANTHRO', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/application-and-admission',
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/bsc-business-administration-and-sociology',
        'https://ufsn.dk/uddannelse/anerkendelse-og-dokumentation/find-vurderinger/eksamenshaandbogen/landedbtest/#handbookId=3&countryId=269&subjectId=3'
      ],
      notes:
        "Content 4.8b: CBS's application and admission page describes the 2027 admission round (application deadline 15 March 2027, 12:00 CET, for an international exam in quota 1 or 2; diploma by 5 July). The IB Diploma qualifies with at least 24 points including bonus points, six subjects, three or four at HL, the Extended Essay, TOK and CAS. Specific requirements as CBS maps the IB (Danish 2.0 = IB 3, 6.0 = IB 5): English B at 6.0, met by English A Literature or Language and Literature or English B, SL or HL, at 5; the language requirement, English A level, is any English A or English B HL, so English B SL also needs a test. Mathematics B with 6.0: Maths AA or AI, SL or HL, at 5. History, Social Studies or International Economics B: Business Management, Economics, Global Politics or History (SL or HL), or Geography or Social and Cultural Anthropology (HL), at 3. All three are conditions, so critical. Selection: 60% of places in quota 1 by the IB total converted to the Danish scale, the rest in quota 2 on a motivational essay, activities and grade level. The 2026 quota 1 cut-off was 9.8, about 38 IB points on ufsn.dk's 2026 conversion table (the 2027 table is due by 1 March 2027); 100 places. The published minimum is 24; the stored 30 had no source. The stored rows asked English at 4 or 5 and Maths AI at HL; Maths AI SL now counts. Bachelor of Science."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkxzu9rk000xl704ec3nje1j',
      status: 'current',
      name: 'BSc in International Business and Politics',
      description:
        'Firms and institutions constantly have to face many new and intense challenges. In recent years, for example, issues associated with inequalities, sustainability, gender and race have become prominent. BSc IBP considers these challenges and looks at the ways they are changing the relationships between businesses, governments, international organisations, and civil society organisations. The programme will prepare you to tackle them.\n\nBSc IBP interweaves training in political economy, economic theories, and core business studies subjects. You will also learn both quantitative and qualitative research methodologies, including how to craft an independent research project and conduct an analysis. BSc IBP students are known for their capacity to both ‘dig in’ to produce fine-grained analyses, as well as being about to ‘zoom out’ and locate the broader context for how business operates in our society and across societies.\n\nUnderstanding political economy\nThe BSc IBP considers the ways in which political and economic systems are always linked. Our starting point is that if you want to do business then you need to know how governments works, and if you want to govern then you need to know how business works. You will learn about formal political systems as well as the ways in which politics shape markets, institutions, and the environment for business. Many courses in IBP examine the relationship between regulation and markets. This includes how rules and standards are fought over, how they inform business strategies, and how interactions between regulation and markets create winners and losers. You will learn to analyze these interactions at both the domestic and international levels, exploring how businesses and governments navigate them, as well as understanding their political and economic consequences.\n\nUnderstanding business\nYou will learn how to analyse a company and its activities and consider how firms develop and implement strategies in national and international business settings. You will gain an understanding of companies from both an economic and an organisational point of view. This includes strategy and decision-making to optimize quality and product innovation, on pricing and market tactics, and the development of risk profiles. You will also study organisational behaviour, that is, how people act within a company including how they deal with ethical dilemmas and questions of diversity. This is important. For example, the leadership style of a CEO can have an influence on organisational culture, which can further impact employee motivation, and therefore lead ultimately to an increase or decrease in employee productivity.\n\nUnderstanding economic foundations\nA firm must always take the economic context in which it operates into account. If there for example is a recession or inflation, it can change purchasing patterns, which can in turn have effects on production, employment, incomes and the pricing of products. You need certain tools to understand the character of markets and the potential impact of government economic policies. BSc IBP gives you these tools and a broader understanding of supply and demand, as well as markets, inflation, exchange rates and trade policy.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/bsc-international-business-and-politics',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 3, critical: true },
        {
          anyOf: [
            { course: 'BUS-MGMT', level: 'SL', grade: 3 },
            { course: 'ECON', level: 'SL', grade: 3 },
            { course: 'GLOB-POL', level: 'SL', grade: 3 },
            { course: 'HIST', level: 'SL', grade: 3 },
            { course: 'GEOG', level: 'HL', grade: 3 },
            { course: 'ANTHRO', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/application-and-admission',
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/bsc-international-business-and-politics',
        'https://ufsn.dk/uddannelse/anerkendelse-og-dokumentation/find-vurderinger/eksamenshaandbogen/landedbtest/#handbookId=3&countryId=269&subjectId=3'
      ],
      notes:
        "Content 4.8b: CBS's application and admission page describes the 2027 admission round (application deadline 15 March 2027, 12:00 CET, for an international exam in quota 1 or 2; diploma by 5 July). The IB Diploma qualifies with at least 24 points including bonus points, six subjects, three or four at HL, the Extended Essay, TOK and CAS. Specific requirements as CBS maps the IB (Danish 2.0 = IB 3, 6.0 = IB 5): English B at 6.0, met by English A Literature or Language and Literature or English B, SL or HL, at 5; the language requirement, English A level, is any English A or English B HL, so English B SL also needs a test. Mathematics B: Maths AA or AI, SL or HL, at 3. History, Social Studies or International Economics B: Business Management, Economics, Global Politics or History (SL or HL), or Geography or Social and Cultural Anthropology (HL), at 3. All three are conditions, so critical. Selection: 60% of places in quota 1 by the IB total converted to the Danish scale, the rest in quota 2 on a motivational essay, activities and grade level. The 2026 quota 1 cut-off was 10.7, about 40 IB points on ufsn.dk's 2026 conversion table (the 2027 table is due by 1 March 2027); 190 places. The published minimum is 24; the stored 30 had no source. The stored rows asked English at 4 or 5 and Maths AI at HL; Maths AI SL now counts. Bachelor of Science."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkxzgvh20003l704sjkqiv9g',
      status: 'current',
      name: 'BSc in International Shipping and Trade',
      description:
        'At the heart of globalisation\nShipping is at the very core of international trade. Millions of tons of cargo are shipped from one end of the globe to the other every day, You could even describe international shipping as “globalisation in its physical form”, linking production, people and companies all over the planet. Developing efficient, reliable and cost-effective solutions to moving goods from producers to buyers is increasingly a key component in assuring business success for international companies. Shipping is not only a very large but also a highly dynamic industry. Denmark is a leading shipping country, home to the world’s largest container shipping company and many other strong, global shipping companies.\n\nSpecialisation and industry focus\nThe BSc Shipping is different from all the other programmes at CBS in that it focuses directly on just one industry. Rather than a general understanding of business conditions and business economics, you will develop a specific understanding of how shipping companies operate, how they develop strategies and business networks and how to plan and manage in a global and dynamic industry.\n\nThe programme is for those who feel quite confident that the shipping industry is indeed where they want to have their careers – and who want an academic, industry-focused university degree as the foundation for that career.\n\nInternational and practical experience\nThrough your three years in the programme, you will experience academic studies in the fields of business economics, shipping and trade combined with an international as well as intercultural understanding and practical industry experience.\n\nEach year is structured very differently: you will study at CBS, study abroad, study together with students from other countries and cultures and also spend time as an intern in a shipping company. This unique structure will provide you with a varied and exciting study experience, but it will also be demanding and require a lot of hard work.\n\nThe first year will give you a broad understanding of international business economics and introduce you to the unique aspects of the shipping industry. You will study some of your courses together with students from our International Business programme.\nThe second year will give you a global perspective on shipping. It will focus on the economic, legal and operational dynamics of the industry. You will spend this year together with students from Singapore Management University, Nanyang Technical University, Singapore, Hong Kong Polytechnics and University of Piraeus, Greece. All students will spend the first half year in Copenhagen, and the second half in Singapore, Hong Kong or Greece.\nThe third year will deepen your academic and analytical skills within maritime economics and management and it will give you considerable practical shipping experience. During this year, you will combine your studies at CBS with an internship in a shipping company. This will give you hands-on experience with shipping operations and enable you to embark on a career in shipping.\nSpecial option during BSc Shipping\nOn BSc Shipping, you can apply for GLOBAL - Global Supply Chain and Logistics Management. GLOBAL SCLM is a programme focusing on international business, global logistics and supply chain management. The accepted students will spend a semester each in Copenhagen and at two partner universities in China and in Canada.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/bsc-international-shipping-and-trade',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 3, critical: true },
        {
          anyOf: [
            { course: 'BUS-MGMT', level: 'SL', grade: 3 },
            { course: 'ECON', level: 'SL', grade: 3 },
            { course: 'GLOB-POL', level: 'SL', grade: 3 },
            { course: 'HIST', level: 'SL', grade: 3 },
            { course: 'GEOG', level: 'HL', grade: 3 },
            { course: 'ANTHRO', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/application-and-admission',
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/bsc-international-shipping-and-trade',
        'https://ufsn.dk/uddannelse/anerkendelse-og-dokumentation/find-vurderinger/eksamenshaandbogen/landedbtest/#handbookId=3&countryId=269&subjectId=3'
      ],
      notes:
        "Content 4.8b: CBS's application and admission page describes the 2027 admission round (application deadline 15 March 2027, 12:00 CET, for an international exam in quota 1 or 2; diploma by 5 July). The IB Diploma qualifies with at least 24 points including bonus points, six subjects, three or four at HL, the Extended Essay, TOK and CAS. Specific requirements as CBS maps the IB (Danish 2.0 = IB 3, 6.0 = IB 5): English B at 6.0, met by English A Literature or Language and Literature or English B, SL or HL, at 5; the language requirement, English A level, is any English A or English B HL, so English B SL also needs a test. Mathematics B: Maths AA or AI, SL or HL, at 3. History, Social Studies or International Economics B: Business Management, Economics, Global Politics or History (SL or HL), or Geography or Social and Cultural Anthropology (HL), at 3. All three are conditions, so critical. Selection: 50% of places in quota 1 by the IB total converted to the Danish scale, the rest in quota 2 on a motivational essay, activities and grade level. The 2026 quota 1 cut-off was 10.2, about 39 IB points on ufsn.dk's 2026 conversion table (the 2027 table is due by 1 March 2027); 75 places. The published minimum is 24; the stored 30 had no source. The stored rows asked English at 4 or 5 and Maths AI at HL; Maths AI SL now counts. Bachelor of Science."
    },
    // Content 5.1: CBS's English-taught programme not stored before.
    {
      id: 'cmutgqb400000lj7mc7nu03fp',
      status: 'current',
      name: 'BSc in International Business',
      description:
        'BSc IB gives a broad grounding in business economics and strategy in a global context: how international companies spot opportunities, manage risk and adapt their strategies across markets with different laws, regulations and customers.\n\nAbout 45% of the programme is economics and mathematics, 30% trade and logistics, 15% organisation and management and 10% innovation and entrepreneurship. Maths is a working tool in about half of the compulsory courses, and the focus is on global markets and business strategy rather than finance and accounting. The programme is taught in English in Frederiksberg, Copenhagen, and about a third of its students come from abroad.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/bsc-international-business',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 5, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 3, critical: true },
        {
          anyOf: [
            { course: 'BUS-MGMT', level: 'SL', grade: 3 },
            { course: 'ECON', level: 'SL', grade: 3 },
            { course: 'GLOB-POL', level: 'SL', grade: 3 },
            { course: 'HIST', level: 'SL', grade: 3 },
            { course: 'GEOG', level: 'HL', grade: 3 },
            { course: 'ANTHRO', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/application-and-admission',
        'https://www.cbs.dk/en/study-programmes/bachelor-programmes/bsc-international-business',
        'https://ufsn.dk/uddannelse/anerkendelse-og-dokumentation/find-vurderinger/eksamenshaandbogen/landedbtest/#handbookId=3&countryId=269&subjectId=3'
      ],
      notes:
        "Content 5.1: new, the one English-taught CBS bachelor's programme that was not stored. CBS's application and admission page describes the 2027 admission round (application deadline 15 March 2027, 12:00 CET, for an international exam in quota 1 or 2). The IB Diploma qualifies with at least 24 points including bonus points. Specific requirements are the same as CBS's other English programmes, as CBS maps the IB: English B at 6.0 (English A Literature or Language and Literature, or English B, SL or HL, at 5), with English A level as the language requirement (any English A or English B HL, so English B SL also needs a test); Mathematics B (Maths AA or AI, SL or HL, at 3); History, Social Studies or International Economics B (Business Management, Economics, Global Politics or History, SL or HL, or Geography or Social and Cultural Anthropology at HL, at 3). All three are conditions, so critical. Selection: 60% of places in quota 1 by the IB total converted to the Danish scale, 40% in quota 2. The 2026 quota 1 cut-off was 11.1: on ufsn.dk's 2026 conversion table 41 IB points convert to 11.0 and 42 to 11.3, so about 42 points. 245 places; 3,069 applicants in 2026, 2,528 of them in quota 2. Published minimum 24. Bachelor of Science."
    }
  ]
}

export default refresh
