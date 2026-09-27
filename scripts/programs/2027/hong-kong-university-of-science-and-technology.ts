import type { RefreshFile } from '../lib/refresh'

/**
 * Hong Kong University of Science and Technology: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts hong-kong-university-of-science-and-technology
 */
const refresh: RefreshFile = {
  university: 'Hong Kong University of Science and Technology',
  entryYear: 2027,
  checkedOn: '2026-09-27',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bwjs00917mpo5bmwvdbq',
      status: 'current',
      name: 'BBA in Economics',
      description:
        'The BBA in Economics (ECON) program nurtures graduates who are skilled in economic reasoning and the use of data to make sound business decisions. Compared to our BSc in Economics and Finance (ECOF) program, the ECON program offers more core courses in various business disciplines, which equips graduates with the multi-disciplinary perspective needed to analyze business problems and public policies, and to recommend solutions. Students have the flexibility to choose from a wide variety of elective economics courses. Students interested in economic research may enroll in the Honors Thesis Courses in their final year to further develop their research skills and take the opportunity to work closely with a faculty member on their own research project.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-business-and-management/economics',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bswp006t7mpov1m5iryh',
      status: 'current',
      name: 'BBA in Finance',
      description:
        'The BBA in Finance (FINA) program equips students with the quantitative and qualitative analytical skills needed to make effective financial decisions. The curriculum helps students to become proficient in working with financial databases and acquire well-rounded business knowledge. Important topics include corporate finance, derivative securities, financial markets, international finance, investment analysis, and portfolio management.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-business-and-management/finance',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bses006n7mpomxwweny6',
      status: 'current',
      name: 'BBA in General Business Management',
      description:
        'The BBA in General Business Management program provides students with a broad-based education in business and management. It is designed for students who wish to gain a solid foundation in various business disciplines without specializing in a single area. Students are required to fulfill University Common Core, English Language, School, and Major requirements. The program offers flexibility for students to tailor their studies with electives and minors.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://bmundergrad.hkust.edu.hk/admissions/program-overview/prog-overview',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 }
          ],
          critical: false
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://bmundergrad.hkust.edu.hk/admissions/admission-information/international-qualifications',
        'https://bmundergrad.hkust.edu.hk/admissions/program-overview/prog-overview',
        'https://prog-crs.hkust.edu.hk/ugprog/2026-27/GBM',
        'https://join.hkust.edu.hk/oas/elar.pdf'
      ],
      notes:
        "Content 3.4: the stored page was the 2020-21 programme catalogue. The programme continues (BBA in General Business Management, 4 years, in the 2026-27 catalogue; the 2027-28 catalogue page is still empty), so the URL now points at the Business School's programme overview, which lists GBM as a major taken through school-based admission. For the 2027 intake (applications from early October 2026, term from 1 September 2027) the school-based boundary score (Business and Management) is IBDP 34 or more, for reference; programme-based entry starts at 36 to 42. No mathematics subject required (only the quantitative programmes ask for it). English: HKUST's English language admissions requirement asks for English A at 4 or English B HL at 4; join.hkust.edu.hk refused every request this session, so this was read through the search index, and TOEFL or IELTS also count, so the group is not critical (the stored SL4 was critical)."
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8brzb006h7mpoqvde621g',
      status: 'current',
      name: 'BBA in Global Business',
      description:
        'The BBA in Global Business (GBUS) program is the first-of-its-kind in Hong Kong. As a highly sought-after business program, we envision to develop our capable and highly motivated students to “Create Impacts with a Global and Strategic Mindset” whilst embracing global challenges. Our program allows great flexibility for students to customize their learning experience. All GBUS students are ensured to spend at least one semester studying abroad at a top business school of their choice.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-business-and-management/global-business',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bpjl00557mpof078t0p5',
      status: 'current',
      name: 'BBA in Information Systems',
      description:
        'The BBA in Information Systems (IS) program trains students to become technically proficient business professionals with the ability to design, implement, analyze and audit information systems to help businesses survive and thrive in today’s data-centric world. The curriculum explores basic concepts to complex theories, covering diverse applications of information systems. Two options are available: Business Analytics and IS Auditing.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-business-and-management/information-systems',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bob4004h7mpo34mx87bv',
      status: 'current',
      name: 'BBA in Management',
      description:
        'The BBA in Management (MGMT) program equips students to succeed in today’s competitive business world by teaching them to evaluate the current needs and anticipate the future needs of organizations. MGMT students are trained in the aspects of management that are essential to drive business growth, including planning, organizing, staffing, leading, and controlling organizations. The Department of Management has introduced three options: Corporate Social Responsibility and Sustainability, Consulting, and Human Resources.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-business-and-management/management',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bnwd004b7mpof3j9s1q2',
      status: 'current',
      name: 'BBA in Marketing',
      description:
        'The BBA in Marketing (MARK) program cultivates well-rounded marketing professionals who fully appreciate the synergy created by marketing and other business functions. The curriculum content ranges from core marketing courses to advanced electives in various aspects of marketing, such as its international dimensions, strategy, and pricing. Central to the program are consumer behavior and marketing research. Our course material is continuously updated and new courses introduced to prepare students for the job market.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-business-and-management/marketing',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bkbg002d7mpordxexpn5',
      status: 'current',
      name: 'BBA in Operations Management',
      description:
        'The BBA in Operations Management (OM) program focuses on the effective management of resources and business processes that produce and deliver goods and services for all kinds of organizations. Our program emphasizes real applications of management concepts and quantitative analysis to the design, planning, control, and improvement of business operations. By the end of their studies, students are proficient in core OM concepts such as operational excellence, the alignment of people, process and technology, and the use of practical business analytics.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-business-and-management/operations-management',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bjbp001v7mpodf41gfv7',
      status: 'current',
      name: 'BBA in Professional Accounting',
      description:
        'The BBA in Professional Accounting (ACCT) program gives students a world-class start in their professional careers. It cultivates trusted accounting professionals by equipping students with a solid foundation in business and accounting knowledge, along with outstanding communication and leadership skills. Professional excellence courses, offering seminars led by prominent accounting figures, are incorporated into the curriculum to enable students to meet and learn from industry leaders.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-business-and-management/professional-accounting',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bfrx00017mpoa54o49we',
      status: 'current',
      name: 'BEng in Aerospace Engineering',
      description:
        'Our Aerospace Engineering program offers a comprehensive education in aircraft design, aerodynamics, materials, propulsion, avionics, and more. Students master both foundational principles and cutting-edge developments in sustainable aviation and emerging technologies, with an emphasis on hands-on laboratories (e.g. in the HKUST Wind Tunnel) and industry-relevant skills. Graduates excel in diverse roles across the aerospace sector, from aircraft design and development to flight test engineering and avionics integration. The aerospace industry’s robust growth, driven by sustainable aviation initiatives, space exploration projects, and urban air mobility, offers exceptional career opportunities for our graduates.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-engineering/aerospace-engineering',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8c35e00d97mpodxtq464w',
      status: 'current',
      name: 'BEng in Artificial Intelligence',
      description:
        'The Department of Computer Science and Engineering (CSE) comprises renowned educators and researchers who possess cutting-edge knowledge in areas such as big data, cybersecurity, artificial intelligence, cloud computing, networking, graphics, social media, software development, and computation theory. This program has been established to meet the growing demand for skilled AI professionals in academia and industry. It provides a solid foundation in mathematics, engineering principles, and AI technologies, while also offering flexibility for students to explore the breadth and depth of AI specifications. Students will be exposed to a wide range of theories and applications, including artificial intelligence, machine learning, deep learning, natural language processing, computer vision, robotics, and data science.',
      field: 'Computer Science',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-engineering/artificial-intelligence',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8c2af00cp7mpo3qe84gt7',
      status: 'current',
      name: 'BEng in Bioengineering',
      description:
        'Bioengineering combines engineering and the life sciences. Bioengineers use engineering principles and the power of biology to tackle medical challenges and improve human health, as well as addressing a wide range of urgent issues, from energy shortages and environmental pollution to food and water security and population aging. The program provides foundational mathematics and science courses specially designed for bioengineers, along with two areas of specialization (data-oriented and molecular-oriented). Graduates find employment as bioengineering innovators, researchers, clinical scientists, and entrepreneurs.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://join.hkust.edu.hk/our-programs/school-of-engineering/bioengineering',
      requirements: [
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8c1ge00c57mpo0b2jpsz1',
      status: 'current',
      name: 'BEng in Chemical Engineering',
      description:
        'Chemical engineers use the principles of physical, chemical and natural sciences to solve problems related to applied chemistry in manufacturing processes and plants. Students learn to design manufacturing plants, transform raw materials into valuable products, and purify the products to meet consumer demands. They also learn to meet high quality standards for manufacturing, automate plants to make production safe and economical, minimize waste and pollution, market and sell products at a profit, and work effectively with chemical engineering equipment.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-engineering/chemical-engineering',
      requirements: [
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8c0lf00bl7mpofqyh62oi',
      status: 'current',
      name: 'BEng in Civil Engineering',
      description:
        'Civil engineering is concerned with planning, developing and managing various smart and green infrastructure systems and has an immense scope: it encompasses not only buildings, road and railway networks, and other transportation facilities such as bridges and tunnels, airports, harbors and seaports, but also slopes, dams and water supply networks, landfills, waste management and sewage treatment facilities, as well as structures pertaining to society’s energy supplies. Civil engineers embrace emerging technologies to find sustainable solutions for constructing safe infrastructure of modern civilization. In a word, civil engineers are indispensable to modern societies. Our civil engineering program aims to equip students with the technical skills, relevant emerging technologies such as artificial intelligence (AI) and robotics, intellectual ambition, innovative thinking and sense of social responsibility needed to (i) build infrastructure systems locally and worldwide, and (ii) maintain a safe, clean and sustainable environment.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl: 'https://join.hkust.edu.hk/our-programs/school-of-engineering/civil-engineering',
      requirements: [
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bzpk00b17mporrmlorji',
      status: 'current',
      name: 'BEng in Computer Engineering',
      description:
        'Computer Engineering focuses on the analysis, design, implementation, and utilization of computer systems. The BEng in Computer Engineering (CPEG) program is jointly run by the Department of Computer Science and Engineering (CSE), and the Department of Electronic and Computer Engineering (ECE). The program aims to provide students an in-depth understanding of both hardware and software, and their cross-interaction in the design of cutting-edge electronic and computer systems. The curriculum covers all architectural and engineering aspects of computer-based systems, and students can deepen their knowledge by taking elective courses in various technical areas of specialization. Our students can take full advantage of the state-of-the-art facilities of both departments. CPEG is a 2-in-1 integrated program!',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-engineering/computer-engineering',
      requirements: [
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bxzr009x7mpooehv19wz',
      status: 'current',
      name: 'BEng in Decision Analytics',
      description:
        'Industrial Engineering and Decision Analytics is the engineering of making smart decisions based on domain-specific knowledge, data, model and analysis. Our major in Decision Analytics is designed to equip students to meet the current and future societal needs of the knowledge economy. Students enrolled in this program are trained to analyze real-world data, build and fit models that are consistent with these data, develop algorithms, simulate models, and design process and system innovations to find optimal solutions to important decision problems. They pursue careers in domain-specific areas such as financial engineering or consulting services, including risk management, supply and demand analytics, e-commerce, revenue optimization, health-care analytics, and even sports analytics.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl: 'https://join.hkust.edu.hk/our-programs/school-of-engineering/decision-analytics',
      requirements: [
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bv4l00877mpo9orj8e71',
      status: 'current',
      name: 'BEng in Electronic Engineering',
      description:
        'Electronic engineering is the discipline that applies physical sciences and quantitative methods to develop devices and systems that drive the flow of information and energy. Technologies innovated by electronic engineers have empowered the modern society and have vastly enhanced our quality of life. The BEng in Electronic Engineering program spans the fundamental sciences and technologies that are critical to the growth of our information-based society, covering advanced subjects in signal and information processing, communications and networking, computer engineering and embedded system design, robotics and automation, microelectronics and integrated circuit design, photonics, biomedical electronics, data analytics and artificial intelligence (AI). Our program will give students the competency to innovate, model, analyze, design, and implement devices and systems with ubiquitous applications in existing and nascent fields such as big data, autonomous systems, the Internet of Things, and quantum technologies. The program will equip our students for a vast range of opportunities for career and advanced studies.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-engineering/electronic-engineering',
      requirements: [
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bu9y007n7mpo57yp9l76',
      status: 'current',
      name: 'BEng in Energy and Environmental Engineering',
      description:
        'The Energy and Environmental Engineering program is crafted to develop leading professionals committed to creating a sustainable and environmentally friendly future. Students will learn to consider environmental impacts and energy utilization in designing and implementing products and processes, focusing on waste treatment and renewable energy generation to address global environmental challenges and sustainable energy needs. The curriculum exposes students to interdisciplinary areas such as process design, materials science, environmental engineering, renewable energy technologies, and principles related to environmental, social, and governance (ESG). Upon graduation, students will be equipped with comprehensive theoretical knowledge, practical industry experience, the skills to undertake and lead projects, and the ability to innovate in the energy and environmental sectors.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-engineering/energy-and-environmental-engineering',
      requirements: [
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bpy4005b7mporizqcx7b',
      status: 'current',
      name: 'BEng in Industrial Engineering and Engineering Management',
      description:
        'Industrial Engineering and Decision Analytics is the engineering of making smart decisions based on domain-specific knowledge, data, model and analysis. Our undergraduate program in Industrial Engineering and Engineering Management (IEEM) adopts a modern decision analytics based approach. Our curriculum covers predictive and prescriptive analytical tools, statistical models, machine learning algorithms, simulation, and creative modeling, aligning it with the needs of the modern economy.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-engineering/industrial-engineering-and-engineering-management',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bm1700377mpozs2con22',
      status: 'current',
      name: 'BEng in Mechanical Engineering',
      description:
        'Our Mechanical Engineering program follows a structured three-stage approach. The first stage establishes a strong foundation in core engineering principles. The second stage combines advanced theoretical knowledge with hands-on laboratories and exposure to emerging technologies. In the final stage, students integrate engineering science with practical applications via industrial placements and team projects. Students can tailor their education by specializing in energy systems, mechanical design, advanced materials, or research.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-engineering/mechanical-engineering',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bl8x002p7mpocgt64rty',
      status: 'current',
      name: 'BEng in Microelectronics and Integrated Circuits',
      description:
        'The Microelectronics and Integrated Circuits (MEIC) program grounds a new generation of electronic engineers in the fundamentals and up-to-date knowledge of microelectronics and integrated circuits. This program equips students with the essential skills to drive innovation in quantum technology, artificial intelligence, microelectronics, and new materials. Students can deepen their knowledge in areas such as Artificial Intelligence Chips, Bioelectronics, Robotic Systems, Photonics, Embedded Systems, and Semiconductor Devices. Graduates are well prepared to contribute to the growth of the microelectronics industry.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-engineering/microelectronics-and-integrated-circuits',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8byuq00ah7mpoegta5nnu',
      status: 'current',
      name: 'BEng/BSc in Computer Science',
      description:
        'The Department of Computer Science and Engineering (CSE) comprises renowned educators and researchers who possess cutting-edge knowledge in areas such as big data, cybersecurity, artificial intelligence, cloud computing, networking, graphics, social media, software development, and computation theory. BEng in Computer Science (COMP) - Computer science covers the application of computer technology to solve important problems in the scientific, engineering, and commercial domains. Our BEng COMP program offers a comprehensive education that cultivates problem-solving skills necessary for tackling computational problems across core areas, including programming, data structures and algorithms, operating systems, and software engineering. Students are then able to explore diverse areas of computer science, such as databases and data mining, networking, embedded systems, computer graphics, image processing, artificial intelligence, machine learning, computer vision, computer security, and theoretical computer science.',
      field: 'Computer Science',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 39,
      programUrl: 'https://join.hkust.edu.hk/our-programs/school-of-engineering/computer-science',
      requirements: [
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8lfb200437mxbs8zkoqvn',
      status: 'current',
      name: 'BSc in Biochemistry and Cell Biology',
      description:
        'Students will study how living organisms are built upon the complex interplay of biological pathways. An emphasis is placed on knowledge gained through research on cell-free experimental systems (Biochemistry) and within cells (Cell Biology). The early curriculum is broad-based and teaches students the fundamental concepts and principles of Biochemistry and Cell Biology. This will enable students to explore and develop their own interests in various aspects of modern molecular life sciences. As they progress through the program, they will take more advanced and specialized elective courses. BCB students will also have the option of engaging in intensive practical training and research opportunities.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-science/biochemistry-and-cell-biology',
      requirements: [
        {
          courses: ['BIO', 'BIO', 'CHEM', 'CHEM', 'MATH-AA', 'MATH-AA', 'MATH-AI', 'PHYS', 'PHYS'],
          level: 'SL',
          grade: 4,
          critical: true
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8lehw003f7mxbv9r7qgqv',
      status: 'current',
      name: 'BSc in Biomedical and Health Sciences',
      description:
        'Students will study the scientific principles of different aspects of the biomedical and health sciences. This program provides exposure to advanced diagnostic and disease modeling technologies including the use of omics technologies, computational analytical pipelines and the generation of experimental models for accelerated drug or treatment discoveries in a pre-clinical setting. The early curriculum is broad-based, covering both theoretical and practical aspects of biomedical science. The integration of foundational knowledge is achieved through inquiry-based experiential learning courses that emphasize teamwork and individualized capstone projects in the final year.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-science/biomedical-and-health-sciences',
      requirements: [
        {
          courses: ['BIO', 'BIO', 'CHEM', 'CHEM', 'MATH-AA', 'MATH-AA', 'MATH-AI', 'PHYS', 'PHYS'],
          level: 'SL',
          grade: 4,
          critical: true
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8ldor002r7mxbwc93us40',
      status: 'current',
      name: 'BSc in Biotechnology',
      description:
        'The Biotechnology (BIOT) program is designed to cover the research and development of biotechnology products and services, including medicines, cosmetics, health supplements and genetic diagnostics. The program provides students with theoretical and practical knowledge of the latest biotechnological developments, with a particular focus on the applied aspects of life science. The curriculum also requires a basic understanding of concepts across various biological spectra including biochemistry, cell biology, molecular biology, microbiology and genetics.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://join.hkust.edu.hk/our-programs/school-of-science/biotechnology',
      requirements: [
        {
          courses: ['BIO', 'BIO', 'CHEM', 'CHEM', 'MATH-AA', 'MATH-AA', 'MATH-AI', 'PHYS', 'PHYS'],
          level: 'SL',
          grade: 4,
          critical: true
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8lcys00277mxbry369mo7',
      status: 'current',
      name: 'BSc in Biotechnology and Business',
      description:
        'The Biotechnology and Business Program (BIBU) is jointly offered by the School of Science and the School of Business and Management. It aims to groom students with a hybrid interest in both biotechnology applications and business operations. It offers students a broad-based learning experience that encompasses essential life science and biotechnology knowledge, as well as complementary business know-how, including accounting, finance, economics, marketing, operations management. It also enhances students’ creative and critical thinking abilities while helping them develop a global outlook on biotechnology development and applications, thereby laying a solid foundation of knowledge and skills to develop, manage, and market biotechnology initiatives.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/joint-school-program/biotechnology-and-business',
      requirements: [
        { courses: ['BIO', 'BIO', 'CHEM', 'CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8lbmh00177mxblzdx9ov1',
      status: 'current',
      name: 'BSc in Chemistry',
      description:
        'Students of BSc in Chemistry will study all aspects of chemistry and related disciplines. General areas covered include analytical chemistry, inorganic chemistry, organic chemistry, and physical chemistry. Specialized areas include environmental chemistry, medicinal chemistry, biological chemistry, polymer chemistry, materials chemistry including nanostructures, instrumentation, forensic science, food safety, and computational / theoretical chemistry. This program provides excellent training in both analytical thinking and problem-solving skills. The curriculum, which includes basic training in analytical, inorganic, organic, and physical chemistry and modern laboratory techniques and skills, has been specifically designed to allow students maximum flexibility in determining the extent of their specializations.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://join.hkust.edu.hk/our-programs/school-of-science/chemistry',
      requirements: [
        {
          courses: ['BIO', 'BIO', 'CHEM', 'CHEM', 'MATH-AA', 'MATH-AA', 'MATH-AI', 'PHYS', 'PHYS'],
          level: 'SL',
          grade: 4,
          critical: true
        },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8lazk000r7mxb2kfhnxzj',
      status: 'current',
      name: 'BSc in Data Analytics and Artificial Intelligence in Science',
      description:
        'In this big data era, an enormous amount of data is continuously generated and obtained in almost every science, technology, and social science field. Data Analytics and Artificial Intelligence in Science (DASC) is a major program designed for science students who want to learn data analysis skills and practice them in various science disciplines. The curriculum starts with basic training in programming and computational methods, as well as analytic methods and statistics, data visualization, machine learning and artificial intelligence skills. Students will then declare one of the following study tracks at the start of Year 3 to practise and sharpen their skills.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-science/data-analytics-and-artificial-intelligence-in-science',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        {
          courses: ['MATH-AA', 'MATH-AA', 'MATH-AI', 'PHYS', 'PHYS'],
          level: 'SL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8la9900077mxbxb844g2m',
      status: 'current',
      name: 'BSc in Data Science and Technology',
      description:
        'The Data Science and Technology (DSCT) program is jointly offered by the School of Science and the School of Engineering. Various business and industry sectors have a huge demand for data specialists/scientists to conduct an in-depth analysis of the valuable datasets collected during the business process. Data Science and Technology graduates are a perfect fit for these emerging job opportunities in the market. The program will equip students with various mathematical tools, data analytical skills and IT technologies to make sense of data obtained from various sources. DSCT students use a wide spectrum of mathematical and IT tools to develop basic knowledge of data analysis and programming skills that will allow them to understand and analyze actual phenomena of massive data obtained from rich information sources. Additionally, students will receive hands-on experience and expert guidance to acquire practical skills in data analysis that will provide them with an excellent step in their future.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/joint-school-program/data-science-and-technology',
      requirements: [
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bvyw008r7mpoozt4eius',
      status: 'current',
      name: 'BSc in Economics and Finance',
      description:
        'Compared to the BBA in Economics, our BSc in Economics and Finance (ECOF) places greater emphasis on the use of quantitative methods and techniques to form an in-depth understanding of the modern economy and public policy. Students interested in economic research may enroll in the Honors Thesis Courses in their final year to further develop their research skills and take the opportunity to work closely with a faculty member on their own research project. This program is suitable for students who aspire to pursue careers that require strong analytical and quantitative skills, such as in investment banks, consulting, data analysis, and economics. The sophisticated analytical training and quantitative research skills offered by the program also prepare students to pursue further studies. The flexibility of our curriculum design allows ECOF students to pursue additional majors in other business areas. Synergizing economics and finance, the program makes ECOF graduates competitive in pursuing a range of careers across business fields.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-business-and-management/economics-and-finance',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8l9xz00017mxbnk3wzdyj',
      status: 'current',
      name: 'BSc in Environmental Management and Technology',
      description:
        'Sustainability is of paramount importance for the well-being of current and future generations. It is a global challenge that requires the attention and action of every organization. The BSc in Environmental Management and Technology (EVMT) program is at the forefront of tackling the pressing global concerns related to environmental and sustainability issues. This program offers motivated students a unique opportunity to become environmental and sustainability professionals equipped with cross-disciplinary knowledge to develop and implement ecologically and economically sound solutions. Graduates of the program are prepared to take on the role of sustainability managers and environmental professionals in corporations both in Hong Kong and around the globe.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/academy-of-interdisciplinary-studies/environmental-management-and-technology',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8brjq006b7mpo6z486uug',
      status: 'current',
      name: 'BSc in Global China Studies',
      description:
        'The BSc in Global China Studies program equips students with a unique portfolio of knowledge about China with a global outlook. This is achieved through a multi- and interdisciplinary curriculum in humanities and social science, and through training in comparative and advanced research methods. To help equip students with a truly global outlook, the program provides all students with international exchange opportunities.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-humanities-and-social-science/global-china-studies',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8lg49004r7mxbkju9splh',
      status: 'current',
      name: 'BSc in Individualized Interdisciplinary Major',
      description:
        'The Individualized Interdisciplinary Major (IIM) offers a non-traditional, cross-school academic pathway for exceptional students with the vision, talent, and character to create their own study program. IIM students have the academic freedom to combine courses from different departments and Schools at HKUST to develop an interdisciplinary major that is tailor-made to their intellectual interests. Students should get admitted to one of the Schools in HKUST first, and enroll in IIM in their second year.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/academy-of-interdisciplinary-studies/individualized-interdisciplinary-major',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bqr9005t7mpozd61ddj4',
      status: 'current',
      name: 'BSc in Innovation, Design and Technology',
      description:
        'The BSc in Innovation, Design and Technology program provides a multi-disciplinary training to students in innovation, design and technology. Students acquire knowledge in design and systems thinking, specific technology and entrepreneurial spirit through learning-by-doing. The program adopts team-based and project-based learning as the primary method of instruction. Students work on projects throughout their four years of study.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/academy-of-interdisciplinary-studies/innovation-design-and-technology',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bnbk003z7mpo9af8hfsg',
      status: 'current',
      name: 'BSc in Mathematics',
      description:
        'Mathematics permeates almost every discipline of science and technology. It is not only a tool for understanding the abstract models of real-world phenomena while solving practical problems, but it is also the language of commerce, engineering and other sciences. The BSc in Mathematics program is unique among all universities in the territory. It offers seven tracks: Applied Mathematics, Computer Science, Financial and Actuarial Mathematics, General Mathematics, Pure Mathematics, Pure Mathematics (Advanced), and Statistics.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 35,
      programUrl: 'https://join.hkust.edu.hk/our-programs/school-of-science/mathematics',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bmqr003p7mpoaeg9ayma',
      status: 'current',
      name: 'BSc in Mathematics and Economics',
      description:
        'The Mathematics and Economics (MAEC) program is jointly offered by the School of Science and School of Business and Management of HKUST. The program provides students with solid training in the fundamental theories of both mathematics and economics. The curriculum equips students with quantitative reasoning skills, conceptual understanding, and the ability to communicate effectively in mathematics and the language of economics and social sciences. This interdisciplinary degree is suitable for students who seek to obtain a finance industry position that emphasizes quantitative skills.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/joint-school-program/mathematics-and-economics',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bkqz002j7mponkc0rbtl',
      status: 'current',
      name: 'BSc in Ocean Science and Technology',
      description:
        'BSc in Ocean Science and Technology (OST) is an integrative program that offers students a comprehensive foundational understanding of the cross-disciplinary ocean science technology and provides exposure to the cutting-edge scientific and technological development related to investigating, conserving and managing ocean resources. Program highlights include: biological, chemical and physical processes in the ocean, marine instrumentation, data management, pollution tracking, and socio-economic conservation aspects.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-science/ocean-science-and-technology',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bjr000217mpolg4p2tj5',
      status: 'current',
      name: 'BSc in Physics',
      description:
        'Physics encompasses everything from the tiniest elementary particle to the ultimate fate of the universe, and provides the foundation for all modern science and engineering. The BSc in Physics program gives students depth and breadth in their studies. Students will learn about exciting topics ranging from quantum computing, superconductivity and nanotechnology to quarks and black holes. The program prepares students for science-related careers, or for further studies in physics and related fields.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 35,
      programUrl: 'https://join.hkust.edu.hk/our-programs/school-of-science/physics',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bism001l7mpoftu2q0ik',
      status: 'current',
      name: 'BSc in Quantitative Finance',
      description:
        'The BSc in Quantitative Finance (QFIN) program is designed for students with a strong desire to pursue careers in the finance industry. Students follow an integrated curriculum comprised of courses developed by different schools. They acquire a solid base of financial knowledge and the mathematical and statistical skills necessary to solve complex financial problems. Important topics covered include Derivative securities, Investment analysis, Portfolio management, Quantitative trading, and Risk management.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-business-and-management/quantitative-finance',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bibf001f7mpo9jjc1pc7',
      status: 'current',
      name: 'BSc in Quantitative Social Analysis',
      description:
        'The BSc in Quantitative Social Analysis prepares students to fulfill the rapidly growing need in the business, government, and non-profit sectors for the analysis of social data and interpretation and presentation of results. In all of these sectors, the increasing demand for employees with relevant skills is driven by a rapid growth in the volume and complexity of social data being collected online and offline. This program provides integrated training in social science theory and evidence, statistical methods, the analysis of social data, and the interpretation and presentation of results.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-humanities-and-social-science/quantitative-social-analysis',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bhs700157mpon2safzzs',
      status: 'current',
      name: 'BSc in Risk Management and Business Intelligence',
      description:
        'The BSc in Risk Management and Business Intelligence (RMBI) program integrates training in both risk management and business intelligence and addresses their market needs in a single undergraduate program. Combining the strengths of HKUST’s School of Business and Management, School of Engineering, and School of Science, the cutting-edge BSc RMBI program incorporates a curriculum that caters to market needs with an emphasis on quantitative techniques and business knowledge, encompassing: An understanding of risks in financial institutions and other firms, Mathematical models and methods of assessing and minimizing risks, and Data/text mining methods and advanced technologies.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/joint-school-program/risk-management-and-business-intelligence',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bgll000j7mpobhr2t051',
      status: 'current',
      name: 'BSc in Sustainable and Green Finance',
      description:
        'The BSc in Sustainable and Green Finance (SGFN) program is at the forefront of undergraduate education in Hong Kong to equip students with interdisciplinary knowledge and skills in both Business & Finance and Environment & Sustainability areas. The program is jointly offered by the School of Business and Management and the Division of Environment and Sustainability, designed for students who would like to pursue a career in the sustainable and green finance industry.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/joint-school-program/sustainable-and-green-finance',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8lcft001v7mxbpmhn4mvh',
      status: 'current',
      name: 'Business with Extended Major in Artificial Intelligence / Digital Media and Creative Arts / Sustainability',
      description:
        'Talents with the ability to integrate knowledge from multiple disciplines, digital and transferable skills, and agility are in high demand in the technologically connected and driven business world. In addition to the traditional double major and/or minor approach, the flexible credit-based curriculum at the School of Business and Management allows motivated students to take additional credit. This way, students can pursue an Extended Major in addition to their business studies and complete the entire program within the 4-year time frame. Students are not required to decide whether they want to pursue an Extended Major at the time of admission. Instead, they have the autonomy to discover their academic interests and strengths at their own pace and to apply for an Extended Major at the end of the third semester （i.e., in the fall term of Year 2）. Students from the selected business majors, regardless of their admission route （school-based or program-based）, are eligible for an Extended major if they meet the major requirements. Please scroll down for the selected business majors list.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-business-and-management/business-with-an-extended-major-in-ai-dmca',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: [],
      notes:
        'Content 3.4, not checked: the page moved to .../business-with-an-extended-major-in-ai-cadh and HKUST now titles it Business with Extended Major in Artificial Intelligence / Creative Arts and Digital Humanities / Sustainability (Digital Media and Creative Arts became CADH), per the search index. join.hkust.edu.hk returned 403 to curl, urllib and WebFetch all session, so the requirements were not re-read and the rename is left for the owner to confirm in a browser. The Business School says extended majors are chosen after admission (AI in the fall of Year 2, quota 30), so whether this is still a direct-entry choice needs checking. The old URL redirects to the new one, so the link is not broken.'
    },
    // Stored: checked for 2026 entry on 2026-01-26. Degree stored as "Dual Degree".
    {
      id: 'cmkv8bx4m009d7mpoiliz1l16',
      status: 'current',
      name: 'Dual Degree Program in Technology & Management',
      description:
        'Under the Academy of Interdisciplinary Studies, the Dual Degree Program in Technology & Management (T&M-DDP) is designed to provide a world-class interdisciplinary education that emphasizes technological innovation and managerial leadership with an inclination towards a global perspective. T&M-DDP, the first of its kind in Hong Kong, offers high-caliber students an inspiring opportunity to gain two internationally-recognized degrees in five years: Bachelor of Engineering (BEng) or Bachelor of Science (BSc), and Bachelor of Business Administration (BBA). T&M-DDP empowers students the skills to analyze issues from both technological and business viewpoints and to solve problems with both quantitative and qualitative methodologies. Students also develop awareness of different cultures and global perspectives and foster a willingness to serve. With double degrees in technology and management, our graduates have a wide variety of career advancement opportunities.',
      field: 'Engineering',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 37,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/academy-of-interdisciplinary-studies/dual-degree-program-in-technology-and-management',
      requirements: [
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8btfv00737mpocrahdv1p',
      status: 'current',
      name: 'Engineering with Extended Major in Artificial Intelligence',
      description:
        'The world is changing fast. Artificial intelligence (AI) has come to define society today in ways we never anticipated. For example, AI makes it possible for us to unlock our smartphones with our faces, ask our virtual assistants questions and receive vocalized answers. The World Economic Forum’s “The Future of Jobs 2023” report predicts that there will be 69 million new jobs in AI by 2027. Companies and individuals that do not keep up with some of the major tech trends run the risk of being left behind. To promptly equip our students for this challenge, the pioneering “Engineering+AI” program is designed as an extended major to enrich major study with cross-disciplinary AI technology applications.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-engineering/engineering-with-an-extended-major-in-artificial-intelligence',
      requirements: [
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8boqo004n7mpohf8p40l6',
      status: 'current',
      name: 'International Research Enrichment',
      description:
        'The International Research Enrichment (IRE) Program is designed for students interested in pursuing a research career in science, or broadening their exposure to research during their undergraduate studies. It emphasizes curiosity and grit. The IRE program distinguishes itself by providing free choice of major programs among Biochemistry and Cell Biology, Biotechnology, Chemistry, Mathematics, Ocean Science and Technology, and Physics; participation in advanced research projects; and exchange and internship opportunities.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-science/international-research-enrichment',
      requirements: [
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: checked for 2026 entry on 2026-01-26.
    {
      id: 'cmkv8bh7a000t7mpoohfsqoi2',
      status: 'current',
      name: 'Science (Group A) with Extended Major in Artificial Intelligence',
      description:
        'Science (Group A) with Extended Major in Artificial Intelligence (SSCI-A (AI)) is designed for science students who want to learn solid knowledge in Science disciplines PLUS innovative applications of AI in their major areas. The world is changing fast, artificial intelligence (AI) has come to define society today in ways we never anticipated. The knowledge of AI can be a perfect supplement to science subjects, which requires a solid mathematical sense and relevant tools to achieve synergy. The pioneering SSCI-A (AI) program is designed to prepare our students for opportunities and challenges. The curriculum is cross-disciplinary and practical.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://join.hkust.edu.hk/our-programs/school-of-science/science-group-a-with-an-extended-major-in-artificial-intelligence',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 5, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: null,
      sources: []
    }
  ]
}

export default refresh
