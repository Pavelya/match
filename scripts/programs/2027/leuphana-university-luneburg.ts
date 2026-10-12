import type { RefreshFile } from '../lib/refresh'
import type { RequirementDef } from '../lib/requirements-diff'

/**
 * Leuphana University Lüneburg: its seven English-taught bachelor's majors at Leuphana College, added for content
 * task 7, Part B2 (Germany), and created, with the university, on 2026-10-12. The owner chose the university on
 * 12 October 2026 (docs/tasks/content-2027/germany-model-decision.md, decision 6). The English-taught minors are not
 * programs of their own.
 *
 * Under the German model: 24 points, the KMK rows, maths HL where the KMK requires it, and a closing paragraph from
 * Leuphana College's admission pages and its Zulassungsgrenzen for winter 2025/26: 30% of places on grades alone
 * (the best quota), most of the rest on a points score, and 10% on waiting time. A best-quota grade is converted with
 * the KMK's formula (truncated). Stamped 2026: the program pages name no intake, and the study skills test page
 * describes the 20 July 2026 sitting.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts leuphana-university-luneburg
 */

/** Read on 12 October 2026, after each program's own page. */
const ADMISSION = 'https://www.leuphana.de/en/college/application/admission-process.html'
const CUT_OFFS =
  'https://www.leuphana.de/fileadmin/user_upload/college/bewerben/bachelor/Zulassungsgrenzen_WiSe_25_26.pdf'
const KMK_AGREEMENT =
  'https://www.kmk.org/zab/fileadmin/Dateien/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/aktuell/283_Vereinb_Anerkenn_Int_Baccalaureate_Diploma-2023-06-15_Liste1__2026-03-26_Liste2-2026-05-22.pdf'
/** The Bavarian recognition office's IB sheet (March 2026), which names the subjects that need maths at HL. */
const ZAST =
  'https://cms-cdn.lmu.de/media/lmu/downloads/studium/internationale-studierende/merkblatt-ib.pdf'

const NOTES =
  "Content 7 (Part B2, 12 October 2026): German model (a), owner, 12 October 2026. minIBPoints 24: the KMK's IB agreement (as amended 15 June 2023) recognises the Diploma with a 4 or better in all six subjects. Rows: a KMK science and a KMK social science (critical); maths AA or AI at HL where the KMK requires it. Not modelled: the HL rule, the grade-3 offset, the language pair, and the schools whose maths SL counts as HL. Leuphana asks for a university entrance qualification and English; no German. Stamped 2026: no intake named."

/** KMK 1a: Biology, Chemistry or Physics. */
const KMK_SCIENCE: RequirementDef = {
  courses: ['BIO', 'CHEM', 'PHYS'],
  level: 'SL',
  grade: 4,
  critical: true
}
/** KMK 1a: the agreement's eight social sciences. */
const KMK_SOCIAL_SCIENCE: RequirementDef = {
  courses: ['HIST', 'GEOG', 'ECON', 'PSYCH', 'PHIL', 'ANTHRO', 'BUS-MGMT', 'GLOB-POL'],
  level: 'SL',
  grade: 4,
  critical: true
}
/** KMK footnote 3: maths at SL opens only subjects outside maths, science and engineering. */
const MATHS_HL: RequirementDef = {
  courses: ['MATH-AA', 'MATH-AI'],
  level: 'HL',
  grade: 4,
  critical: true
}

const refresh: RefreshFile = {
  university: 'Leuphana University Lüneburg',
  entryYear: 2027,
  checkedOn: '2026-10-12',
  programs: [
    {
      id: 'cmv5p3j800000uy7mtuzazjd3',
      status: 'current',
      name: 'Cultural Studies: Organization, Society, and the Arts',
      description:
        'Are you interested in the arts and cultural sector? Are you curious about the role of the arts, cultural production, and cultural theory in social change? Would you like to study changes in the organization of art and culture through digital platforms and social media, through ecological change and sustainable organization, through urbanization and creative cities, or through migration and new forms of cultural participation? Would you like to learn to understand, research and analyze the connections between art, culture, and social change? The international English-language study program “Cultural Studies: Organization, Society, and the Arts” combines classical and contemporary cultural theory with central issues of our time as they are reflected, negotiated and advanced through art, cultural life, and cultural production. This comprehensive major is designed to prepare you for a thriving career in the ever-evolving global arts, media, and culture sectors and will provide a solid foundation for pursuing advanced studies at the graduate level, internationally.\n\nHow Leuphana decides: its 35 places are limited and awarded on your grade alone (30%), on a score from your grade and relevant activities outside school (most of the rest), and on waiting time (10%), but in winter 2025/26 every applicant was admitted. International applicants may be admitted in a special quota. Teaching is in English, with no German required.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://www.leuphana.de/en/college/bachelor/cultural-studies.html',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.leuphana.de/en/college/bachelor/cultural-studies.html',
        ADMISSION,
        CUT_OFFS,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        " No maths HL: humanities and media, which the Bavarian recognition office's list (ZASt, March 2026) opens with maths SL. Winter 2025/26: every applicant admitted in every quota (Zulassungsgrenzen PDF), so no How competitive figure. Field by content: the rule names no discipline in this name; cultural theory, the arts and cultural production."
    },
    {
      id: 'cmv5p3jet000cuy7mlwqn8v1l',
      status: 'current',
      name: 'Digital Media',
      description:
        "Do you want to help shape the digital future? Are you convinced that our culture will be defined and transformed by digital media? Whether it's net culture or the media economy: in the Digital Media Bachelor programme you will analyse the ideas, approaches and history, as well as the technical foundations and tools that define digital media. At the same time, you will develop and implement your own practical projects in video, audio, games, apps or mash ups. In the study programme you will study the theoretical foundations of digital media, analyse digital media critically and test its applications in real life.\n\nHow competitive: in winter 2025/26, the 30% of the 36 places awarded on grades alone went to applicants with a German grade of 1.4 or better, about 40 IB points on the KMK's conversion. Most other places are awarded on a score from your grade, relevant activities outside school and a study skills test written in English, and 10% on waiting time. International applicants may be admitted in a special quota. Teaching is in English, with no German required.",
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://www.leuphana.de/en/college/bachelor/ba-digital-media.html',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.leuphana.de/en/college/bachelor/ba-digital-media.html',
        ADMISSION,
        CUT_OFFS,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        " No maths HL: humanities and media, which the Bavarian recognition office's list (ZASt, March 2026) opens with maths SL. How competitive: best quota winter 2025/26 1.4 (40 IB points, KMK grade truncated); main quota criteria N,L,T; update at each refresh from the newest Zulassungsgrenzen PDF."
    },
    {
      id: 'cmv5p3jj6000ouy7mz7bidryg',
      status: 'current',
      name: 'Economics',
      description:
        "What is the best way out of a financial and economic crisis? Should railroads and postal services be privatized and banks nationalised? How are digitalization and artificial intelligence changing the world of work and what impact will this have on economic and financial policy? Should indebted EU countries be financially supported by other EU members? Should politicians introduce a nationwide minimum wage? If you decide to study Economics at the Leuphana University, you want to gain a better understanding of economics, politics, corporate strategies and human behavior. The Economics Bachelor's degree program is internationally oriented and is taught in English.\n\nHow Leuphana decides: its 55 places are limited and awarded on your grade alone (30%), on a score from your grade and relevant activities outside school (most of the rest), and on waiting time (10%), but in winter 2025/26 every applicant was admitted. International applicants may be admitted in a special quota. Teaching is in English, with no German required.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://www.leuphana.de/en/college/bachelor/economics-major.html',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.leuphana.de/en/college/bachelor/economics-major.html',
        ADMISSION,
        CUT_OFFS,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        " No maths HL: a subject the Bavarian recognition office's list (ZASt, March 2026) opens with maths SL. Winter 2025/26: every applicant admitted in every quota (Zulassungsgrenzen PDF), so no How competitive figure."
    },
    {
      id: 'cmv5p3jq30010uy7mz621d8m0',
      status: 'current',
      name: 'Global Environmental and Sustainability Sciences',
      description:
        'Do you want to acquire skills which will enable you to actively contribute to sustainable development? Would you like to be able to do so on a global level with an international perspective? Then come study Global Environmental and Sustainability Sciences in an international setting in the historic town of Lüneburg. Due to its intercultural approach the programme is taught entirely in English . It prepares you for a career in institutions and organisations which operate internationally. Become part of the Leuphana University of Lüneburg which is on the cutting-edge of inter- and transdisciplinary science and has been specialising in sustainable development in research and teaching for over 30 years.\n\nHow Leuphana decides: its 70 places are limited and awarded on your grade alone (30%), on a score from your grade and relevant activities outside school (most of the rest), and on waiting time (10%), but in winter 2025/26 every applicant was admitted. International applicants may be admitted in a special quota. Teaching is in English, with no German required.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl:
        'https://www.leuphana.de/en/college/bachelor/bsc-global-environmental-and-sustainability-studies.html',
      requirements: [MATHS_HL, KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.leuphana.de/en/college/bachelor/bsc-global-environmental-and-sustainability-studies.html',
        ADMISSION,
        CUT_OFFS,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        " Maths HL: environmental sciences are a natural science in the Bavarian recognition office's list (ZASt, March 2026), which this file follows for the KMK's maths rule. Winter 2025/26: every applicant admitted in every quota (Zulassungsgrenzen PDF), so no How competitive figure."
    },
    {
      id: 'cmv5p3jua001euy7mlznbjjwc',
      status: 'current',
      name: 'International Business Administration and Entrepreneurship',
      description:
        "Study International Business Administration and Entrepreneurship – a future-oriented programme with a sustainable and global perspective . Benefit from our AACSB accreditation for excellent career opportunities and international recognition.\n\nHow competitive: in winter 2025/26, the 30% of the 160 places awarded on grades alone went to applicants with a German grade of 1.7 or better, about 38 IB points on the KMK's conversion. Most other places are awarded on a score from your grade, relevant activities outside school and a study skills test written in English, and 10% on waiting time. International applicants may be admitted in a special quota. Teaching is in English, with no German required.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl:
        'https://www.leuphana.de/en/college/bachelor/bsc-international-business-administration-entrepreneurship.html',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.leuphana.de/en/college/bachelor/bsc-international-business-administration-entrepreneurship.html',
        ADMISSION,
        CUT_OFFS,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        " No maths HL: a subject the Bavarian recognition office's list (ZASt, March 2026) opens with maths SL. How competitive: best quota winter 2025/26 1.7 (38 IB points, KMK grade truncated); main quota criteria N,L,T; update at each refresh from the newest Zulassungsgrenzen PDF."
    },
    {
      id: 'cmv5p3jyv001quy7mo75dyth0',
      status: 'current',
      name: 'Psychology',
      description:
        "How can people be encouraged to adopt sustainable consumer behaviors? How can people be motivated to change their health behaviors? How do people react to the progressive digitalisation? And how can good leadership be promoted in organisations? Studying psychology at Leuphana College means dealing with our society and its challenges , as well as looking at individuals and groups as actors in this society. Those who choose to study psychology at Leuphana College are fundamentally interested in exploring and understanding how humans think, feel, and act in various contexts of societal relevance. Its modern and future-oriented focus aimed at socially relevant issues gives the Psychology major a unique profile in Germany and internationally.\n\nHow competitive: in winter 2025/26, the 30% of the 70 places awarded on grades alone went to applicants with a German grade of 1.1 or better, about 41 IB points on the KMK's conversion. Most other places are awarded on a score from your grade, relevant activities outside school and a study skills test written in English, and 10% on waiting time. International applicants may be admitted in a special quota. Teaching is in English, with no German required.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://www.leuphana.de/en/college/bachelor/psychology-major.html',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.leuphana.de/en/college/bachelor/psychology-major.html',
        ADMISSION,
        CUT_OFFS,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        " No maths HL: a subject the Bavarian recognition office's list (ZASt, March 2026) opens with maths SL. How competitive: best quota winter 2025/26 1.1 (41 IB points, KMK grade truncated); main quota criteria N,L,T; update at each refresh from the newest Zulassungsgrenzen PDF."
    },
    {
      id: 'cmv5p3k5j0022uy7m9zqwdatl',
      status: 'current',
      name: 'Studium Individuale',
      description:
        "Are you curious about the various challenges facing us in the contemporary world? Are you looking for a way to combine your broad academic interests? Do you care about working intensively with others while shaping your own personal course of studies? The Studium Individuale program gives you the freedom and the responsibility to design your own tailored Bachelor’s curriculum. The unique study program challenges you to engage with key questions and problems of the present. It helps you cultivate academic skills that are fundamental for living and working in today’s world and supports you in formulating your ideas and goals, and taking steps towards them.\n\nHow competitive: in winter 2025/26, the 30% of the 40 places awarded on grades alone went to applicants with a German grade of 1.5 or better, about 39 IB points on the KMK's conversion. Most other places are awarded on a score from your grade, relevant activities outside school and a study skills test written in English, plus an interview, and 10% on waiting time. International applicants may be admitted in a special quota. Teaching is in English, with no German required.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      campusCity: null,
      minIBPoints: 24,
      programUrl: 'https://www.leuphana.de/en/college/bachelor/ba-studium-individuale.html',
      requirements: [KMK_SCIENCE, KMK_SOCIAL_SCIENCE],
      checkedFor: 2026,
      sources: [
        'https://www.leuphana.de/en/college/bachelor/ba-studium-individuale.html',
        ADMISSION,
        CUT_OFFS,
        KMK_AGREEMENT,
        ZAST
      ],
      notes:
        NOTES +
        ' No maths HL: humanities and media, which the Bavarian recognition office\'s list (ZASt, March 2026) opens with maths SL. How competitive: best quota winter 2025/26 1.5 (39 IB points, KMK grade truncated); main quota criteria N,L,T,G; update at each refresh from the newest Zulassungsgrenzen PDF. Field by content: the rule names no discipline in "Studium Individuale", an individually designed interdisciplinary program in the liberal arts.'
    }
  ]
}

export default refresh
