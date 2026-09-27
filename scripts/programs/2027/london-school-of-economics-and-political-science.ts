import type { RefreshFile } from '../lib/refresh'

/**
 * London School of Economics and Political Science: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts london-school-of-economics-and-political-science
 */
const refresh: RefreshFile = {
  university: 'London School of Economics and Political Science',
  entryYear: 2027,
  checkedOn: '2026-09-27',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmlhz55800003ib04ybkwu6jw',
      status: 'current',
      name: 'BA Anthropology and Law',
      description:
        'Master the principles of law while challenging how it shapes our world. Study at the UK’s top-rated anthropology and law departments for the best of both fields',
      field: 'Environmental Studies',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 37,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/ba-anthropology-and-law',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmli6v4c20001l204vu6l1ixa',
      status: 'current',
      name: 'BA Geography',
      description:
        'This programme looks at how the environment, people and economics collectively impact on our world. It includes an international field trip.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/ba-geography#entry-requirements',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmli6wrwx0003l204ugz1zpcx',
      status: 'current',
      name: 'BA History',
      description:
        'Learn about the forces that have shaped the past and the world we live in today with our international history degree programme.',
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/ba-history',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlj5yn2t0001ju0451rqjka2',
      status: 'current',
      name: 'BA Social Anthropology',
      description:
        "Explore what makes us human. Learn about different rituals, belief systems and cultural practices. Study in the UK's top-rated anthropology research department.",
      field: 'Environmental Studies',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 37,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/ba-social-anthropology',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlj6mtu00003ju04jc6o47c4',
      status: 'current',
      name: 'BSc Accounting and Finance',
      description:
        'Gain in-demand skills for a rewarding and well-paid career in finance with this combined honours programme.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-accounting-and-finance',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 7 }
          ],
          critical: true
        }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlj6qm830008ju04lm8bvi9i',
      status: 'current',
      name: 'BSc Actuarial Science',
      description:
        'Enjoy innovative curriculum delivered by experts. Build knowledge towards diverse statistical/actuarial career prospects. Earn professional exams exemption.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 39,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-actuarial-science',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlj6sgnx000cju043pesysa3',
      status: 'current',
      name: 'BSc Actuarial Science (with a Placement Year)',
      description:
        'Gain expert knowledge and real-world industry experience. Prepare for diverse actuarial/statistical careers with opportunities for professional exam exemptions.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-actuarial-science-with-a-placement-year',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlj6ugj9000hju04cr68z1w4',
      status: 'current',
      name: 'BSc Data Science',
      description:
        'Discover how data science can help us solve real-world problems. Gain quantitative skills to prepare you for a range of professional and managerial careers.',
      field: 'Computer Science',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 39,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-data-science',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlj9tt750001l204lv5qftz4',
      status: 'current',
      name: 'BSc Econometrics and Mathematical Economics',
      description:
        'Gain the skills to apply mathematical and statistical methods to solve real-world economic problems facing our society.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-econometrics-and-mathematical-economics',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlja9hl80006l204u5sbs9h8',
      status: 'current',
      name: 'BSc Economic History',
      description:
        'Explore the drivers of global inequality, poverty, and financial turmoil. Learn from leading economic historians at the forefront of the field.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-economic-history',
      requirements: [{ courses: ['ECON', 'HIST'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljagdzf000bl204uz1kvny0',
      status: 'current',
      name: 'BSc Economic History and Geography',
      description:
        "Explore economic change's roots in geography, past and present. Learn from top economic historians and geographers at research's forefront.",
      field: 'Environmental Studies',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 37,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-economic-history-and-geography#entry-requirements',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljb0zer000dl204ciea96ge',
      status: 'current',
      name: 'BSc Economics',
      description:
        "Learn to apply economic theory and practice to real-world issues. Study with the best – LSE is often UK's top-ranked university for economics research.",
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 39,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-economics',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljcjcdd000il204msxnza1u',
      status: 'current',
      name: 'BSc Economics and Data Science',
      description:
        'Explore the complexities of the economy and the power of data. Acquire cutting-edge quantitative skills to tackle real-world economic problems and challenges.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 37,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-economics-and-data-science',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljeny2o0001ld041v98fazu',
      status: 'current',
      name: 'BSc Economics and Economic History',
      description:
        'This programme looks at how historical events from the past can shed light on real-world economic problems we face today.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-economics-and-economic-history',
      requirements: [
        { courses: ['ECON'], level: 'HL', grade: 7, critical: true },
        { courses: ['HIST'], level: 'HL', grade: 7, critical: true }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljep57y0001l4042v3sxoyo',
      status: 'current',
      name: 'BSc Environment and Sustainable Development',
      description:
        'Examine challenging issues around sustainable development and environmental protection. Study in a world-renowned geography department – rated top in the UK.',
      field: 'Environmental Studies',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 37,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-environment-and-sustainable-development',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljes8iq0003l404lhac1h5w',
      status: 'current',
      name: 'BSc Environment and Sustainable Development with Economics',
      description:
        'This programme equips you with the environmental knowledge and economics training needed to tackle global sustainability issues in your future career.',
      field: 'Environmental Studies',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-environment-and-sustainable-development-with-economics',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljeu1td0008l404oxiw78n7',
      status: 'current',
      name: 'BSc Finance',
      description:
        'Develop the financial skills for a high-flying career in finance, banking or consulting. Learn from world-leading academics and industry practitioners.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 39,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-finance',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljf03no000dl404p5sudrnd',
      status: 'current',
      name: 'BSc Financial Mathematics and Statistics',
      description:
        'Learn mathematical and statistical principles for financial decisions and investments. Prepare for careers in finance, accounting and many other areas.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-financial-mathematics-and-statistics',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljf407t000hl4045u1l4kp2',
      status: 'current',
      name: 'BSc Geography with Economics',
      description:
        'Study the impact of economics on human development and the environment. Gain geographical and mathematical skills that will set you apart.',
      field: 'Environmental Studies',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-geography-with-economics',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljf70dd000ml404dqfhznp6',
      status: 'current',
      name: 'BSc History and Politics',
      description:
        'This programme explores how political ideas, people and institutions have influenced historical change and developments through time.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 37,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-history-and-politics',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljf9pyr000ol404r1kg5emj',
      status: 'current',
      name: 'BSc International Relations',
      description:
        'Examine the critical role played by international relations in politics, economics and society. Discover how you can make a difference as a global changemaker.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-international-relations',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljfjtue000ql404nabm06m4',
      status: 'current',
      name: 'BSc International Relations and Chinese',
      description:
        'Develop your knowledge of international relations and China as a global power. Become proficient in Mandarin and study abroad at Fudan University, Shanghai.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-international-relations-and-chinese',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljfwiml000sl404gpqbspsy',
      status: 'current',
      name: 'BSc International Relations and History',
      description:
        'Explore the political, economic and social factors that have shaped international relations. Gain skills for careers in policy, journalism or research.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-international-relations-and-history',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljg5gyk000ul4040y8fofza',
      status: 'current',
      name: 'BSc International Social and Public Policy',
      description:
        'Gain the skills to help tackle pressing social problems we face in the UK and internationally.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 37,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-international-social-and-public-policy',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljg75z1000wl4049rgm00qm',
      status: 'current',
      name: 'BSc International Social and Public Policy with Economics',
      description:
        'Examine how economics can help us tackle global social policy challenges such as poverty, inequality and social justice.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 37,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-international-social-and-public-policy-with-economics',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljg8a20000yl4040p0wk9ug',
      status: 'current',
      name: 'BSc International Social and Public Policy with Politics',
      description:
        'Explore the impact of political thought on global social policies. Acquire skills for careers in government, policy bodies, or the third sector.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-international-social-and-public-policy-with-politics',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljga7lc0010l404h8k67b77',
      status: 'current',
      name: 'BSc Language, Culture and Society',
      description:
        'Combine the study of sociology with learning a modern language. Spend a year abroad at one of our partner institutions.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-language-culture-and-society',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljgcqj30012l404wknuq5ix',
      status: 'current',
      name: 'BSc Management',
      description:
        'Develop your management skills for a dynamic career in banking, finance, management consulting, technology or professional services.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-management',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljgecgn0017l4041nw7m68i',
      status: 'current',
      name: 'BSc Mathematics and Economics',
      description:
        'Dream of a career where you can apply your maths skills to solve real-world economic problems? This degree offers the perfect preparation.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 39,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-mathematics-and-economics',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljggp4u001bl404m0labp5n',
      status: 'current',
      name: 'BSc Mathematics with Data Science',
      description:
        'Combine your study of maths with data science - and explore the fascinating world of AI and machine learning.',
      field: 'Computer Science',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-mathematics-with-data-science',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljgkxp6001gl404jq8prctd',
      status: 'current',
      name: 'BSc Mathematics with Economics',
      description:
        'Develop the quantitative knowledge and analytical skills required for a rewarding career in finance or business.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 39,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-mathematics-with-economics',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljgmcvn001kl40483tpehhh',
      status: 'current',
      name: 'BSc Mathematics, Statistics and Business',
      description:
        'Dive into the real-world applications of maths and statistics in business. Complete practical projects, with opportunities for internship in the City.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-mathematics-statistics-and-business',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: false }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljgo5c5001ol404x8g478qn',
      status: 'current',
      name: 'BSc Philosophy and Economics',
      description:
        'If you’re interested in an economics degree but you’d like to take your learning to a deeper philosophical level, then this is the degree for you.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 37,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-philosophy-and-economics',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljgplvb001tl404d9rtndh6',
      status: 'current',
      name: 'BSc Philosophy, Logic and Scientific Method',
      description:
        'Grapple with some of the biggest philosophical questions facing us today and sharpen your skills in logical reasoning.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-philosophy-logic-and-scientific-method',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljgtasw001vl404gp9lquxv',
      status: 'current',
      name: 'BSc Philosophy, Politics and Economics',
      description:
        'Study philosophy, politics and economics at LSE – internationally renowned in all three subjects. Gain real-world experience on an external client project.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-philosophy-politics-and-economics',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljgwp9j001zl404i9xxgsxq',
      status: 'current',
      name: 'BSc Politics',
      description:
        'Understand how equality, sovereignty and rights are shaped by politics globally. Gain the skills for a rewarding career in politics, journalism, or policy.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-politics',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljgzkfn0021l404b1r8sklw',
      status: 'current',
      name: 'BSc Politics and Economics',
      description:
        'Examine the impact of politics and economics on society and our everyday lives on this world-leading programme',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-politics-and-economics',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljh17m80026l404phw1jxjt',
      status: 'current',
      name: 'BSc Politics and International Relations',
      description:
        'Examine the political forces that are fuelling rapid change across our world today and the complex relationships between different nations.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 37,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-politics-and-international-relations',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljh30sd0028l404gvnuvat9',
      status: 'current',
      name: 'BSc Politics and Philosophy',
      description:
        'Delve into the key political issues and philosophical questions confronting the world today on this joint honours programme.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 39,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-politics-and-philosophy',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljh7vaw002al404caaynbxb',
      status: 'current',
      name: 'BSc Psychological and Behavioural Science',
      description:
        'Learn why people think, feel and behave the way they do and how this impacts on our society. Study in a university ranked number one in the UK for Psychology.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-psychological-and-behavioural-science',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS', 'PSYCH'],
          level: 'HL',
          grade: 6,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-psychological-and-behavioural-science'
      ],
      notes:
        "Content 3.4: the page answers again. For 2027/28 entry (the page's default year; start 27 September 2027): 39 points with 766 at higher level, including at least one of Biology, Chemistry, Physics, Mathematics or Psychology at HL. That subject is one of the 766, so it needs at least 6, not the 7 stored; the 766 profile itself cannot be held by the model. Contextual offer: 38 points with 766."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljh9hxs002jl404sqcuh42i',
      status: 'current',
      name: 'BSc Social Anthropology',
      description:
        "Explore what makes us human. Learn about different rituals, belief systems and cultural practices. Study in the UK's top-rated anthropology research department.",
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 37,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-social-anthropology',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmljhbi4i002ll404qb65fzg7',
      status: 'current',
      name: 'BSc Sociology',
      description:
        'Deepen your understanding of the biggest social problems and ethical dilemmas facing us in today’s contemporary world.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 37,
      programUrl: 'https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-sociology',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.lse.ac.uk/study-at-lse/undergraduate/bsc-sociology'],
      notes:
        "Content 3.4: the page answers again. For 2027/28 entry (the page's default year): 37 points with 666 at higher level; checked, no specific subjects required. The 666 profile cannot be held by the model. Contextual offer: 36 points with 665."
    }
  ]
}

export default refresh
