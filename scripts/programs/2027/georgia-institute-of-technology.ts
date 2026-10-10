import type { RefreshFile } from '../lib/refresh'

/**
 * Georgia Institute of Technology: requirements for 2027 entry.
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
 * study: every program here is unchecked, so only a changed `field` is written. Phase 6 (USA)
 * decides how these programs are checked.
 *
 * Content 6, Part B (10 October 2026): checked under the US model the owner chose on 10 October
 * 2026 (docs/tasks/content-2027/usa-model-decision.md). No IB minimum (`minIBPoints` null), no
 * subject rows (Georgia Tech requires none), and a "How competitive" paragraph from the Common
 * Data Set at the end of each description. Every bachelor's major Georgia Tech lists on its
 * all-degree-programs page is here; the rest of that list is minors and BS/MS programs for
 * enrolled students. Update the paragraph's figures at each refresh, from the newest CDS.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts georgia-institute-of-technology
 */

/** Read on 9 and 10 October 2026, after each program's own page. */
const SOURCES = [
  'https://admission.gatech.edu/international/first-year',
  'https://news.em.gatech.edu/2026/07/29/admission-supplemental-essay/',
  'https://admission.gatech.edu/first-year/deadlines',
  'https://admission.gatech.edu/first-year/standardized-tests',
  'https://admission.gatech.edu/first-year/major-selection',
  'https://irp.gatech.edu/sites/default/files/CDS/CDS_2025-2026_FINAL_R4_03JUN2026.pdf'
]

const NOTES =
  'Content 6 (Part B, 10 October 2026): US model (a), owner, 10 October 2026. Georgia Tech publishes no IB minimum ("There is no minimum IB score needed to apply, but to be competitive, students should have mostly scores of 6 and 7"), so minIBPoints is null. Checked, none required: "Higher Level Math and Sciences courses are encouraged but not required". The stored Maths HL 6 (required) and science HL 6 rows had no source: all 45 programs carried them from the February 2026 admin copies. Stamped 2027: the international page names no year, but Georgia Tech\'s news item of 29 July 2026 opens "the first-year undergraduate application to join Tech for Fall 2027" (the 2026-27 cycle the deadlines page dates) and lists what it requires (transcript, test scores, activities), with no IB score. The description ends with a "How competitive" paragraph from the Common Data Set 2025-2026, C1 (fall 2025: 66,881 applied, 8,921 admitted; international 9,758 applied, 716 admitted); update it at each refresh. Degree: Bachelor of Science (every program is a BS).'

/** The description's last paragraph (data conventions: "How competitive"). */
const HOW_COMPETITIVE =
  'How competitive: for fall 2025, Georgia Tech admitted 7% of its 9,758 international first-year applicants (13% of all 66,881). It sets no IB minimum and says competitive IB applicants have mostly 6s and 7s, with HL maths and sciences encouraged but not required. Every applicant must also submit the SAT or ACT. You apply to Georgia Tech rather than to a major, naming this one as your intended major, which the review takes into account.'

const MUSIC_TECHNOLOGY = ' Music Technology also requires a portfolio and an essay.'
const PORTFOLIO_OPTIONAL = ' A portfolio is optional.'

/** A program's description, ending with the "How competitive" paragraph. */
const described = (text: string, extra = '') => `${text}\n\n${HOW_COMPETITIVE}${extra}`

const refresh: RefreshFile = {
  university: 'Georgia Institute of Technology',
  entryYear: 2027,
  checkedOn: '2026-10-10',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmlv1yh8b0003l404e8zq8qw2',
      status: 'current',
      name: 'Aerospace Engineering (BS)',
      description: described(
        'The Aerospace Engineering BS program offers a comprehensive curriculum designed to equip students with the necessary skills and knowledge for a successful career in the aerospace industry. The program emphasizes analytical, experimental, and design aspects of aerospace engineering, allowing students to specialize in air or space-focused tracks.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/aerospace-engineering-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/aerospace-engineering-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Deleted 2026-10-10 at the owner's request (content 6, decision 7), backup in scripts/backups/refresh/: Aerospace Engineering (MS): a graduate degree (master's), which no school leaver can apply to; the Aerospace Engineering (BS) above is stored.
    // Stored: not checked for any intake.
    {
      id: 'cmlz6h3qp00ij7mpgc2uogysw',
      status: 'current',
      name: 'Applied Languages and Intercultural Studies (BS)',
      description: described(
        "Overview\n\nThe Bachelor's degree in Applied Language and Intercultural Studies delivers foreign language study in the many contexts in which other languages are spoken, including:\n\n    Social and technical communication\n    Cultural perspectives\n    Industry\n    Arts and literature\n    Media and science\n\nThe undergraduate degree will provide students with the competitive edge needed to meet 21st century language requirements of the global marketplace."
      ),
      field: 'Arts & Humanities',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.gatech.edu/academics/degrees/bachelors/applied-languages-and-intercultural-studies-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/applied-languages-and-intercultural-studies-bs',
        ...SOURCES
      ],
      notes: `${NOTES} Renamed: the page title is now "Applied Languages and Intercultural Studies (BS)", and the old address redirects to it.`
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlz2crhq00em7mpgbdtdvqf5',
      status: 'current',
      name: 'Applied Physics (BS)',
      description: described(
        'Undergraduate Applied Physics Degree Overview\n\nIn addition to its technology-focused curriculum and state-of-the-art laboratories, Georgia Tech’s B.S. in Applied Physics degree program offers several key advantages: \n\n    Undergraduate research with a world-class faculty and projects with a technological focus.\n    Flexible elective course requirements that allow for a degree to be tailored toward individual career goals.\n    The Atlanta location: Atlanta, Georgia is one of the most tech-savvy cities in the U.S. and is also home to some of the world’s largest companies. \n\nAs an Applied Physics major, you will develop knowledge of the physical sciences and mathematics, and be afforded a hands-on approach to electronics, computation, and instrumentation. The Applied Physics major differs from the Physics major — with core course requirements in computational physics and electronics (and their associated laboratories), as well as the possibility of an engineering-based capstone project.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/applied-physics-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/applied-physics-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmly82v6a002j7mpgjyvnmtt1',
      status: 'current',
      name: 'Architecture (BS)',
      description: described(
        'Focus: preparing students for graduate-level study in architecture, for graduate study in related fields, or a variety of careers related to architecture, the building industry, or government service.',
        PORTFOLIO_OPTIONAL
      ),
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/architecture-bs',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.gatech.edu/academics/degrees/bachelors/architecture-bs', ...SOURCES],
      notes: `${NOTES} A portfolio is optional for this College of Design major (CDS C7 note; recommended on the Major Selection page).`
    },
    // Stored: not checked for any intake.
    {
      id: 'cmly8rd2v002y7mpg04ms6o48',
      status: 'current',
      name: 'Arts, Entertainment, and Creative Technologies (BS)',
      description: described(
        'If you are a creative with technical promise, a Bachelor of Science in Arts, Entertainment, and Creative Technologies (AECT) means you don’t have to choose between disciplines. Within this degree program, studio-based learning is combined with the rigorous study of technology and entrepreneurship to build a fundamental understanding of the opportunities found when the arts combine with emerging technologies like AI and virtual reality.\n\nGraduates of this program will become the next generation of leaders and innovators helping to sustainably grow creative industries like film, gaming, and immersive media.',
        PORTFOLIO_OPTIONAL
      ),
      field: 'Media',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.gatech.edu/academics/degrees/bachelors/arts-entertainment-creative-technologies',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/arts-entertainment-creative-technologies',
        ...SOURCES
      ],
      notes: `${NOTES} A portfolio is optional for this College of Design major (CDS C7 note; recommended on the Major Selection page).`
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlyus5ms00e77mpg8mk2hzw6',
      status: 'current',
      name: 'Astrophysics (BS)',
      description: described(
        'The astrophysics degree provides comprehensive and rigorous training in the fundamental processes and laws that govern planetary systems, stars, galaxies, and the universe. In addition to these core topics, the degree includes training in computational techniques and data analysis that can be applied to a variety of disciplines.\n\nThe skills learned as part of the B.S. in Astrophysics are transferable to a wide range of careers across multiple sectors of the digital economy, such as data scientists, software engineers, and research analysts.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/astrophysics-bs',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.gatech.edu/academics/degrees/bachelors/astrophysics-bs', ...SOURCES],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlyud7ds00ds7mpgkb3zj7ee',
      status: 'current',
      name: 'Atmospheric and Oceanic Sciences (BS)',
      description: described(
        'The B.S. in Atmospheric and Oceanic Sciences (AOS) degree will help you to become an individual that can inform society about weather and climate impacts, including helping others mitigate and adapt to changes in the Earth’s climate.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.gatech.edu/academics/degrees/bachelors/atmospheric-and-oceanic-sciences-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/atmospheric-and-oceanic-sciences-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlytnsrj00cp7mpgdjvyqves',
      status: 'current',
      name: 'Biochemistry (BS)',
      description: described(
        'Undergraduate Biochemistry Degree Overview\n\nIn addition to its technology-focused biochemistry curriculum and state-of-the-art laboratories, Georgia Tech’s B.S. in Biochemistry degree program offers several key advantages:\n\n    The opportunity to work on cutting-edge research projects with world-class faculty and facilities, so you can round out your education by practicing what you have learned.\n    Flexible degree options: You can customize your degree to fit your specific interests and career goals.\n    Atlanta location: Atlanta, Georgia is one of the most tech-savvy cities in the U.S. and home to some of the world’s most prestigious company headquarters.\n\nAs a Biochemistry major, you will acquire basic competence and knowledge in the biological and physical sciences. You will develop a strong understanding of biochemical principles, and learn how to apply them to real-world problems.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/biochemistry-bs',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.gatech.edu/academics/degrees/bachelors/biochemistry-bs', ...SOURCES],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlyt78fv00ca7mpgk7i9z2ex',
      status: 'current',
      name: 'Biology (BS)',
      description: described(
        "Bachelor's Degree in Biology Overview\n\nGeorgia Tech’s bachelor of science in Biology degree offers students an outstanding education in the life sciences and excellent preparation for future careers in biological and health-related fields. The B.S. in Biology degree offers: \n\n    Flexible degree options: The degree can be customized to fit specific interests and career goals. \n    Undergraduate research: From research courses to international research trips, internships, and teaching experiences, the possibilities are endless. \n    Atlanta: One of the most tech-savvy cities in the U.S. and home to some of the world’s biggest companies. \n\nAs a Biology major, you will develop a basic competence and knowledge of biological processes, including cell and molecular biology, genetics, ecology, and evolution. You will develop a strong understanding of scientific thinking, as well as the know-how to apply scientific methodology to solve real-life problems."
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/biology-bs',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.gatech.edu/academics/degrees/bachelors/biology-bs', ...SOURCES],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmly8xtrn00577mpgidq9b5z4',
      status: 'current',
      name: 'Biomedical Engineering (BS)',
      description: described(
        'Focus: integrating the life sciences and engineering and applying the results of that integration to the field of medicine.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/biomedical-engineering-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/biomedical-engineering-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlz6hwuv00iy7mpgj3ycf9ry',
      status: 'current',
      name: 'Business Administration (BS)',
      description: described(
        'Focus: providing analytical and conceptual tools for analyzing complicated problems to prepare students for business and managerial responsibilities and decision making.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/business-administration-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/business-administration-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmly8zq5b005m7mpgoiw8ujpv',
      status: 'current',
      name: 'Chemical and Biomolecular Engineering (BS)',
      description: described(
        'Focus: providing the basics of biomolecular engineering while allowing flexibility for the student to pursue other areas of chemical engineering such as microelectronics, materials, and the environment. Standard Option curriculum track'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.gatech.edu/academics/degrees/bachelors/chemical-biomolecular-engineering',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/chemical-biomolecular-engineering',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmly90kyd00617mpghxi9xs3i',
      status: 'current',
      name: 'Chemical and Biomolecular Engineering (BS) – Biotechnology Option',
      description: described(
        'The Bachelor of Science in Chemical and Biomolecular Engineering provides the basics of biomolecular engineering but allows flexibility for the student to pursue other areas of chemical engineering such as microelectronics, materials, and the environment.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.gatech.edu/academics/degrees/bachelors/chemical-biomolecular-engineering-biotechnology',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/chemical-biomolecular-engineering-biotechnology',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlyt6hcg00bv7mpgzwo2l78m',
      status: 'current',
      name: 'Chemistry (BS)',
      description: described(
        "Undergraduate Chemistry Degree Overview\n\nIn addition to its technology-focused curriculum and state-of-the-art laboratories, Georgia Tech’s Bachelor's in Chemistry program offers several key advantages: \n\n    The opportunity to work on cutting-edge research projects with world-class faculty and facilities, so you can round out your education by practicing what you have learned.\n    Flexible degree options: You can customize your degree to fit your specific interests and career goals. \n    Atlanta location: Atlanta, Georgia is one of the most tech-savvy cities in the U.S. and home to some of the world’s most prestigious company headquarters. \n\nAs a Chemistry major, you will acquire a basic competence and knowledge in the physical and biological sciences. You will also develop a strong understanding of chemical principles, and learn to apply them to real-world problems."
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/chemistry-bs',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.gatech.edu/academics/degrees/bachelors/chemistry-bs', ...SOURCES],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlysk95h006v7mpg09mhxkj7',
      status: 'current',
      name: 'Civil Engineering (BS)',
      description: described(
        'Why Study Civil Engineering?\n\nCivil engineers design the systems, technologies and structures that ready our modern world for a growing, aging human population and make life better in our communities. Civil engineers are problem solvers, innovators, entrepreneurs, and global leaders. They will invent the technologies of the future and create solutions to challenges we haven’t even imagined yet.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/civil-engineering-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/civil-engineering-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmly6g8p5000g7mpggbg450jy',
      status: 'current',
      name: 'Computational Media (BS)',
      description: described(
        'The Bachelor of Science in Computational Media degree provides students with both hands-on and theoretical knowledge of computing, as well as an understanding of visual design and the history of media.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/computational-media-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/computational-media-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmly6tysg000v7mpg4dhvn9jy',
      status: 'current',
      name: 'Computer Engineering (BS)',
      description: described(
        'The School of Electrical and Computer Engineering offers two undergraduate degree programs: electrical engineering (EE) and computer engineering (CmpE). Both programs include elective hours, enabling students to individually tailor their programs to provide emphasis in a particular specialization or exposure to a broad range of subjects. Engineering analysis and design concepts are integrated throughout both programs, culminating in a common major design experience involving a broad range of issues including economic and societal considerations.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/computer-engineering-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/computer-engineering-bs',
        ...SOURCES
      ],
      notes: `${NOTES} Link: the degree's gatech.edu page, as for every other program (was the catalogue's).`
    },
    // Stored: not checked for any intake.
    {
      id: 'cmly6w5pr001a7mpgcknt4trj',
      status: 'current',
      name: 'Computer Engineering (Dual BS)',
      description: described(
        'with Georgia Tech and Korea Advanced Institute of Science & Tech Students may pursue the BSEE degree from the Korea Advanced Institute of Science and Technology (KAIST) as they earn the BSEE or BSCmpE from Georgia Tech. KAIST offers one of the top engineering programs in Korea and the Far East. All lectures at KAIST are given in English to better serve a growing number of students from overseas. While earning their dual degrees, students spend two years each at both Georgia Tech and KAIST.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/computer-engineering-dual-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/computer-engineering-dual-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmly7zdcg001p7mpgn8xum5cd',
      status: 'current',
      name: 'Computer Science (BS)',
      description: described(
        'Focus: building on a base of fundamentals in programming and computational theory to provide a solid foundation of knowledge and skills for applying digital processes effectively to issues of broad interest in a global society.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/computer-science-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/computer-science-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmly8shqq003d7mpg2cdqrn6p',
      status: 'current',
      name: 'Construction Science and Management (BS)',
      description: described(
        "Focus: developing a complete view of the building life cycle, including design, construction, and operation. Students learn technology-driven methods of construction management and critical leadership skills.\n\nThe curriculum shows students how prefabrication, 3D printing, virtual and augmented reality, drones, and robotics can impact safety, profitability, and sustainability. It's the major for students who prefer the practical and tangible aspects of the built environment, incorporating perspectives of construction contractors, owners, and facility managers."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.gatech.edu/academics/degrees/bachelors/construction-science-and-management-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/construction-science-and-management-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlz6gc4300i47mpgvewp2842',
      status: 'current',
      name: 'Economics (BS)',
      description: described(
        'Focus: providing a thorough grounding in science, the humanities, and mathematics as well as the tools of economic analysis and decision making.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/economics-bs',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.gatech.edu/academics/degrees/bachelors/economics-bs', ...SOURCES],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlz6ffnw00hp7mpglcwl93bv',
      status: 'current',
      name: 'Economics and International Affairs (BS)',
      description: described(
        'Focus: developing an understanding of economic theory and practice in the contemporary world; an understanding of the global, interdependent, and multicultural environment in which we live; and quantitative and qualitative analytical skills centered upon policy-relevant issues in the economic and international arenas.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.gatech.edu/academics/degrees/bachelors/economics-and-international-affairs-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/economics-and-international-affairs-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlysj9r2006g7mpg7eei3yei',
      status: 'current',
      name: 'Electrical Engineering (BS)',
      description: described(
        'Focus: engineering analysis and design concepts with sufficient flexibility to incorporate the study of areas such as analog electronics, bioengineering, computer engineering, systems and controls, microsystems and nanosystems, electronics packaging, digital signal processing, optics and photonics, electrical energy, electromagnetics, and telecommunications.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/electrical-engineering-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/electrical-engineering-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlysodmo008y7mpger0bbzty',
      status: 'current',
      name: 'Environmental Engineering (BS)',
      description: described(
        'Focus: providing students with the fundamental knowledge of scientific disciplines and engineering principles that are used to address emerging environmental issues such as sustainable air, water, and land resources; human health; and environmental restoration.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/environmental-engineering-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/environmental-engineering-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlysyrx400bg7mpgps9kucdu',
      status: 'current',
      name: 'Environmental Science (BS)',
      description: described(
        'The B.S. in Environmental Science (ENVS) degree encompasses the study of natural environmental systems and the interaction of humans with these systems. It includes a strong foundation in the basic sciences, requiring core content in biology, chemistry, Earth sciences, environmental policy, mathematics, and physics, as well as communication, computational skills, field, and upper-level coursework builds lab. Students are encouraged to create a focused pathway of electives that corresponds to their interests and career goals.'
      ),
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/environmental-science-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/environmental-science-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlz67r3800ha7mpgpsb1hlr4',
      status: 'current',
      name: 'Global Economics and Modern Languages (BS)',
      description: described(
        'Focus: understanding the global, economically interdependent, multilingual, and multicultural environments in which we exist, and helping students develop not only an in-depth knowledge of their own cultures, but also the capacity to function effectively in a second culture.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.gatech.edu/academics/degrees/bachelors/global-economics-and-modern-languages-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/global-economics-and-modern-languages-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlz66xa900gv7mpghps1yfgq',
      status: 'current',
      name: 'History, Technology, and Society (BS)',
      description: described(
        'Focus: building upon a broad-based training in humanities, mathematics, computing, science, and social sciences to further focus on global issues related to the origin and impact of technology and science.'
      ),
      field: 'Arts & Humanities',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.gatech.edu/academics/degrees/bachelors/history-technology-and-society-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/history-technology-and-society-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmly8tpld003s7mpgt5kjdqis',
      status: 'current',
      name: 'Industrial Design (BS)',
      description: described(
        'Focus: preparing students for a career in design practice as well as for graduate education in industrial design, the professional practice of creating products or enhancing the function, usability, value, and appearance of products with the goal of benefiting the user, manufacturer, community, and environment.',
        PORTFOLIO_OPTIONAL
      ),
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/industrial-design-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/industrial-design-bs',
        ...SOURCES
      ],
      notes: `${NOTES} A portfolio is optional for this College of Design major (CDS C7 note; recommended on the Major Selection page).`
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlysno6d008j7mpgmykws8p7',
      status: 'current',
      name: 'Industrial Engineering (BS)',
      description: described(
        'Focus: blending mathematics, physical sciences, and business applications to form a program of study built on probability, optimization, statistics, computing, economics, and psychology.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/industrial-engineering-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/industrial-engineering-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlz66aaj00gg7mpgeej230n7',
      status: 'current',
      name: 'International Affairs (BS)',
      description: described(
        'Focus: providing students with an understanding of factors that shape international affairs within the contexts of technology, scientific analysis, and ethics; security and diplomacy; comparative politics, cultures, and societies; and political economy.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/international-affairs-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/international-affairs-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlz65ly700g17mpgtwtv4dus',
      status: 'current',
      name: 'International Affairs and Modern Languages (BS)',
      description: described(
        'Focus: intensive training in foreign language and the fundamentals of engaging with foreign cultures and societies.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.gatech.edu/academics/degrees/bachelors/international-affairs-and-modern-languages-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/international-affairs-and-modern-languages-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlz64igw00fm7mpgxsyjv10o',
      status: 'current',
      name: 'Literature, Media, and Communication (BS)',
      description: described(
        "The B.S. in Literature, Media, and Communication offers a thorough education in the different modes of representation that structure our technological and global world.\n\nThe Literature, Media, and Communication bachelor's degree offers several concentrations. The Bachelor of Science in Literature, Media, and Communication provides the analytical and technical skills required for a career in fields such as Media, Public Relations, and Literature.\n\nGraduates will have both significant theoretical and hands-on experience with novels, films, games, comic books, web pages, and scientific documents."
      ),
      field: 'Arts & Humanities',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.gatech.edu/academics/degrees/bachelors/literature-media-and-communication-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/literature-media-and-communication-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlysmx4u00847mpgf2hz27oz',
      status: 'current',
      name: 'Materials Science and Engineering (BS)',
      description: described(
        'Focus: combining traditional instruction in ceramic, metallurgy, and polymer and fiber science and engineering with modern materials including nano-, bio-, composite, electronic, and optical and magnetic materials.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.gatech.edu/academics/degrees/bachelors/materials-science-and-engineering-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/materials-science-and-engineering-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlysy07k00b17mpg5asyu3d0',
      status: 'current',
      name: 'Mathematics (BS)',
      description: described(
        "Undergraduate Math Degree Overview\n\nA degree in Math at Georgia Tech includes technology-focused curriculum and state-of-the-art laboratories. The Bachelor's in Mathematics program offers these key advantages as well: \n\n    Flexible degree options. Customize your degree to fit your specific interests and career goals. \n    Undergraduate research. From research courses to international research trips, internships, and co-op positions, the possibilities are endless. \n    Atlanta location. Atlanta, Georgia is one of the most tech-savvy cities in the U.S. and home to some of the world’s biggest companies. \n\nAs a Mathematics major, you will develop a basic competence and knowledge of mathematical techniques. You will develop a strong understanding of quantitative thinking and know how to apply a systems approach to solve real-life situations."
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/mathematics-bs',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.gatech.edu/academics/degrees/bachelors/mathematics-bs', ...SOURCES],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmly81go000247mpg0iwjy5fh',
      status: 'current',
      name: 'Mathematics and Computing (BS)',
      description: described(
        'The Bachelor of Science in Mathematics and Computing stands apart by offering a balanced, integrated curriculum that develops both mathematical depth and computational fluency. It is ideal for students who want to understand not just how computational systems and algorithms work, but why they work, how to prove their properties, and how to build new ones from first principles.\n\nThis degree prepares students for cutting-edge interdisciplinary fields such as artificial intelligence, computational science, data-driven modeling, algorithm design, and mathematical foundations of machine learning.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/mathematics-computing',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/mathematics-computing',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlysmbbn007p7mpg42av6ud4',
      status: 'current',
      name: 'Mechanical Engineering (BS)',
      description: described(
        'Focus: educating students in the use of basic mechanical engineering principles to reach optimal design solutions for engineering problems.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/mechanical-engineering-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/mechanical-engineering-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmly8v3t300477mpglnqdrzyf',
      status: 'current',
      name: 'Music Technology (BS)',
      description: described(
        'The undergraduate program in the School of Music leads to a Bachelor of Science in Music Technology. In the program, students understand the role of technology in enabling new ways to access, consume, and create music. They master existing technologies and develop the skills necessary to innovate and create the ideas that will drive the music industry in the future.',
        MUSIC_TECHNOLOGY
      ),
      field: 'Arts & Humanities',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/music-technology-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/music-technology-bs',
        ...SOURCES
      ],
      notes: `${NOTES} Music Technology requires a portfolio and an essay (Major Selection page; CDS C7 note).`
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlysw2sa00am7mpgho7gnsa4',
      status: 'current',
      name: 'Neuroscience (BS)',
      description: described(
        'Undergraduate Neuroscience Degree Overview\n\nIn addition to its technology-focused curriculum and state-of-the-art laboratories, Georgia Tech’s B.S. in Neuroscience degree offers several key advantages: \n\n    Interdisciplinary training. Immersive experiences across multiple fields such as psychology, biology, biochemistry, physics, mathematics, computer science, and engineering.\n    Flexible degree options. Customized degrees to fit specific interests and career goals.\n    Research opportunities with world-renowned neuroscience researchers.\n    Atlanta location. Atlanta, Georgia is one of the most tech-savvy cities in the U.S. and home to some of the world’s biggest companies.   \n\nAs a Neuroscience major, you will develop a basic competence and knowledge of behavioral and cognitive, molecular, cellular, and systems neuroscience. You will develop a strong understanding of the structure and function of the brain and nervous system, and a familiarity with the methods, applied solutions, and technologies that enable new discoveries and support their translation into diagnoses and treatments of brain disorders.'
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/neuroscience-bs',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.gatech.edu/academics/degrees/bachelors/neuroscience-bs', ...SOURCES],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlyslnzc007a7mpgwomnuqkz',
      status: 'current',
      name: 'Nuclear and Radiological Engineering (BS)',
      description: described(
        'Focus: providing students with the basic principles of nuclear engineering, nuclear reactor core design, reactor systems engineering, nuclear power economics, reactor operations, radiation sources and detection instruments, radiation transport, radiation protection, criticality safety, regulatory requirements, and radioactive materials management.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.gatech.edu/academics/degrees/bachelors/nuclear-and-radiological-engineering-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/nuclear-and-radiological-engineering-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlysuye000a77mpgd7p7qfvn',
      status: 'current',
      name: 'Physics (BS)',
      description: described(
        'Undergraduate Physics Degree Overview\n\nIn addition to its technology-focused curriculum and state-of-the-art laboratories, Georgia Tech’s B.S. in Physics degree program offers several key advantages: \n\n    Undergraduate research with a world-class faculty and projects with a technological focus.\n    Flexible elective course requirements that allow for a degree to be tailored toward individual career goals.\n    The Atlanta location: Atlanta, Georgia is one of the most tech-savvy cities in the U.S. and is also home to some of the world’s largest companies. \n\nAs a Physics major, you will develop a basic competence in applying the scientific method, using qualitative and quantitative analysis to investigate physics problems — from the atomic to the astronomical scale. You will develop a strong understanding of how the laws of Physics shape our understanding of the world, and of how mathematical analysis and experimental methods may be used as investigative tools.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/physics-bs',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.gatech.edu/academics/degrees/bachelors/physics-bs', ...SOURCES],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlyst1cq009s7mpg49vek6s0',
      status: 'current',
      name: 'Psychology (BS)',
      description: described(
        'Undergraduate Degree in Psychology Overview\n\nIn addition to its state-of-the-art laboratories, Georgia Tech’s undergraduate psychology degree program offers several key advantages: \nA technically oriented curriculum that emphasizes quantitative and experimental approaches to the study of behavior. This strong emphasis in the sciences and mathematics provides excellent preparation for graduate school.\n\nUndergraduate research opportunities. Students have the chance to conduct research with world-renowned professors working at the forefront of the science of psychology. \nSmall size. Limiting our program size provides our students and researchers with a more personalized and focused learning experience.\n\nAs a Psychology major, you will develop a competence and knowledge of quantitative and experimental approaches to studying the mind and human behavior.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/psychology-bs',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.gatech.edu/academics/degrees/bachelors/psychology-bs', ...SOURCES],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlz633kl00f17mpgwy0ljr99',
      status: 'current',
      name: 'Public Policy (BS)',
      description: described(
        'The Bachelor of Science in Public Policy degree program combines political, social, economic and ethical approaches with practical problem solving in a technology-infused environment.\n\nAn important part of the undergraduate degree program in Public Policy is to learn how to navigate among the many disciplines that are used to shape strategic decisions.\n\nThe Bachelor of Science in Public Policy provides strong analytical, communication, management, and leadership skills to students seeking careers in public service, law, and the private sector.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gatech.edu/academics/degrees/bachelors/public-policy-bs',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.gatech.edu/academics/degrees/bachelors/public-policy-bs', ...SOURCES],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmlysp7ct009d7mpgmgohf4u5',
      status: 'current',
      name: 'Solid Earth and Planetary Sciences (BS)',
      description: described(
        'The B.S. in Solid Earth and Planetary Sciences (SEP) degree is for students interested in developing mechanical and dynamic understanding of processes that control planetary behavior and are looking to apply Georgia Tech’s strengths in mathematics and computation to understand the evolution, future, hazards, and structure of planetary bodies, including Earth.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.gatech.edu/academics/degrees/bachelors/solid-earth-and-planetary-sciences-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/solid-earth-and-planetary-sciences-bs',
        ...SOURCES
      ],
      notes: NOTES
    },
    // Stored: not checked for any intake.
    {
      id: 'cmly8wwjd004s7mpgcfusvxjl',
      status: 'current',
      name: 'Urban Planning and Spatial Analytics (BS)',
      description: described(
        'The Bachelor of Science in Urban Planning and Spatial Analytics prepares students to address some of the world’s most challenging urban problems in the context of core social values such as sustainability and resilience. The curriculum gives students both a broad understanding of the urban and regional environment and a firm grounding in the practical skills needed for effective analysis and planning.'
      ),
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://www.gatech.edu/academics/degrees/bachelors/urban-planning-spatial-analytics-bs',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.gatech.edu/academics/degrees/bachelors/urban-planning-spatial-analytics-bs',
        ...SOURCES
      ],
      notes: NOTES
    }
  ]
}

export default refresh
