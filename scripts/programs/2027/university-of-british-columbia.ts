import type { RefreshFile } from '../lib/refresh'

/**
 * University of British Columbia: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-british-columbia
 */
const refresh: RefreshFile = {
  university: 'University of British Columbia',
  entryYear: 2027,
  checkedOn: '2026-09-27',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj3ve00537m7fdoymhl6x',
      status: 'current',
      name: 'Anthropology',
      description:
        'Anthropology is a comparative study of the cultural and social lives of humans all over the world, from First Nations in Canada to the indigenous and non-indigenous peoples of Asia, the Pacific, and Latin America. You can take courses in Archaeology, Biological Anthropology, Cultural/Social Anthropology, Anthropological Linguistics, and Museum Studies.\n\nClasses offer you a wide variety of topics covering major developments in human societies – from those of our earlier ancestors to contemporary cultures. You can select a Major, Minor, or Honours program in Anthropology.\n\nCampus features\nUBC’s Museum of Anthropology is one of the world’s premier institutions in the field, and the most advanced ethnological and archaeological research facility in Canada.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://you.ubc.ca/ubc_programs/anthropology-vancouver/',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzojblk008t7m7ftxqlw2vx',
      status: 'current',
      name: 'Astronomy',
      description:
        'Astronomers and physicists study the material world and the energy that drives it, from the smallest particles like neutrinos and Higgs bosons to the very largest structures in the universe, and ultimately the universe itself. This program has a large overlap with mathematics, chemistry, biology, and engineering and can be approached from each of these angles.\n\nAstronomy is often considered a sub-field of physics in which principles of physics and mathematics are used to investigate the fundamental nature of the universe and its evolution; the properties of galaxies; and the birth, evolution, and death of stars and black holes.\n\nAstronomers apply this knowledge to solve problems in navigation, space flight, and satellite communications, as well as to develop the instrumentation and techniques used to observe and collect astronomical data.\n\nAstronomy is available at the undergraduate level as a major, or as a combined honours in Physics and Astronomy, which is strongly suggested for students wishing to pursue graduate studies in astronomy and a career in research.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl: 'https://you.ubc.ca/ubc_programs/astronomy',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzojbyn008z7m7fvcwg40yv',
      status: 'current',
      name: 'Atmospheric Science',
      description:
        'Atmospheric Science is the study of weather and climate. The undergraduate specialization is highly interdisciplinary with a focus on numerical problem solving/computation, the atmospheric boundary layer, and physical climatology.\n\nCourses focus on meteorological fields including air quality, environment, climate change, weather monitoring and instrumentation, and consulting. The program has deemphasized traditional weather forecasting to reflect changing industry demands.\n\nThe program’s strong emphasis on computation equips students with the computation and mathematical knowledge for data analysis and atmospheric modelling. The program’s interdisciplinary nature emphasis the integration of meteorological knowledge with issues such as air quality, environmental sustainability, and renewable energy.\n\nAtmospheric Science has integrated modern pedagogical practices into its curriculum such as flipped classrooms, just-in-time-teaching (JiTT) and two-phase exams.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://you.ubc.ca/ubc_programs/atmospheric-science',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj13k00457m7fubx7ha7z',
      status: 'current',
      name: 'Biochemistry',
      description:
        'Biochemistry is concerned with the chemical compounds and processes that occur in plants, animals, and microorganisms. Specifically, it involves the analysis of proteins, carbohydrates, and lipids, which comprise the basic constituents of cells.\n\nThis specialization equips you with a strong foundation in biochemistry while also providing the flexibility to cultivate your interests in allied fields (e.g., microbiology, food science, and chemistry). An undergraduate degree in biochemistry is particularly appropriate for students who anticipate a professional career in the health sciences or research.\n\nBiochemistry is available at the undergraduate level as a major or honours. It can also be paired with chemistry for a combined major or combined honours degree.\n\nHoused in the Faculty of Medicine, the program’s primary focus is on the biochemistry of the human body. Biochemistry can also be studied as an elective in biology, chemistry, microbiology and immunology, and cellular, anatomical and physiological sciences.\n\nCampus features\nBiochemistry and Molecular Biology is located in the Life Sciences Centre, a multi-disciplinary research space where more than 80 faculty investigators and approximately 600 trainees and research staff conduct innovative research in many areas of the life and biomedical sciences. The Laboratory for Molecular Biophysics has state-of-the-art instrumentation and facilities.\n\nExperiential learning and research\nThe Biochemistry program champions and supports the participation of undergraduates in research and provides students the opportunity gain hands-on research experience through several upper-year laboratory courses.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl: 'https://you.ubc.ca/ubc_programs/biochemistry-vancouver/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoixli002b7m7f1p5rxxwn',
      status: 'current',
      name: 'Biology',
      description:
        'Biology is a broad field dedicated to the study of all aspects of living things and their vital processes. It encompasses the study of animals, plants, insects, and microbes as well as their relationships with their environments. The Biology program at UBC’s Vancouver campus offers an extremely rich range of specialty course options that span the field’s many sub-disciplines. It is overseen by two departments: Botany (in the academic field, one of the largest and strongest in North America) which focuses on plant science; and Zoology, another powerhouse department conducting research and teaching in developmental biology, comparative animal physiology, ecology, and evolution.\n\nBiology is available as a major or honours, with combined major or combined honours available with Computer Science, Chemistry, and Oceanography. There are several honours degrees in Biology specializations as well, including\n\nAnimal Biology\nCell and Development Biology\nConservation Biology\nEcology and Environmental Biology\nEvolutionary Biology\nMarine Biology\nPlant Biology\nThe honours streams are recommended for students interested in pursuing graduate studies in a biological sciences field.\n\nExperiential learning and research\nThe Biodiversity Research Centre is a state-of-the-art facility that is home to 50 researchers in disciplines such as evolution, systematics and phylogeny, population and community ecology, fisheries management, conservation biology, and theoretical modeling.\n\nUBC students are able to visit the Beaty Biodiversity Museum for free. The museum is dedicated to promoting the appreciation of biodiversity and making the research conducted by the scientists of UBC’s Biodiversity Research Centre accessible to the public. The museum has more than two million specimens of plants, insects, fish, shells, birds, mammals, and fossils.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 35,
      programUrl: 'https://you.ubc.ca/ubc_programs/biology-vancouver/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoivn4001d7m7f1q6nvm7c',
      status: 'current',
      name: 'Biomedical Engineering',
      description:
        'As a Biomedical Engineering student, you’ll take a series of core courses aimed at building a solid foundation in engineering, biology, math, chemistry, and design. In your third year of study, you’ll have the opportunity to customize your degree to your interests by specializing in one of four streams:\n\nBiomechanics and biomaterials\nCellular and molecular bioengineering\nBiomedical systems and signals\nBiomedical informatics\nThe curriculum includes traditional, online, and mixed-instruction courses, plus hands-on studio, laboratory, and design work. Through these experiences, you’ll gain a strong understanding of biology, human anatomy, and physiology, and develop the skills required to apply this knowledge in engineering design contexts and solve engineering problems.',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://you.ubc.ca/ubc_programs/biomedical-engineering/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoiut7000x7m7fh3p8zf2q',
      status: 'current',
      name: 'Chemical Engineering',
      description:
        'The program’s objective is to provide an outstanding and distinctive education in chemical engineering, through a comprehensive and progressive range of academic courses and activities that respects society’s needs. Selection of electives from a range of topics prepares chemical engineers for meaningful, satisfying and productive careers in industry, government and academia in British Columbia, Canada and other regions of the world. The Chemical Engineering degree program puts emphasis on the analysis, design, process control and operation of efficient chemical processes within resource-based industries such as oil & gas, pulp & paper, petro-chemical, polymers, inorganic chemicals and fertilizers. In addition, pollution prevention and reduction in industrial processes and systems is emphasized.\n\nThe program places emphasis on sustainable engineering in the curriculum. Sustainability principles are integrated in individual courses and in dedicated specific technical electives. In addition, the students are engaged in sustainability projects overseen by the Department’s Sustainability Club.\n\nOn completing their first year of Engineering, undergraduate students can apply to one of the two programs in the Department of Chemical and Biological Engineering:\n\nChemical Engineering\nChemical & Biological Engineering\nBoth programs are accredited and lead to a Bachelor of Applied Science (BASc) degree in their respective areas.\n\nGraduates are eligible, after appropriate industrial experience, for registration as Professional Engineers.\n\nCampus features\nThe Chemical & Biological Engineering Building is a new building with undergraduate laboratories equipped to introduce and teach students the concepts of unit operations and processes. A week long third-year field trip is offered in collaboration with British Columbia and Alberta companies to introduce students to industrial operations.\n\nThere are over 300 undergrad students in the Chemical and Chemical & Biological Engineering program.  The Department also offers programs leading to the Master of Engineering (M.Eng.), Master of Science (M.Sc.), Master of Applied Science (M.A.Sc.) and Doctor of Philosophy (Ph.D.) degrees in a number of areas of specialization within chemical and biological engineering. The Department is actively engaged in applied research in chemical and biological engineering, supported in part by external funding of about $6 million a year.',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://you.ubc.ca/ubc_programs/chemical-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: false },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoiy23002l7m7f6raasxqg',
      status: 'current',
      name: 'Chemistry',
      description:
        'Chemistry is a creative and imaginative science with many opportunities to make new discoveries, develop new molecules and materials, and increase our understanding of important processes. The foundational knowledge and skills obtained with a chemistry degree give a solid foundation upon which to pursue a career directly related to this area. The deductive and deconstructionist thought process involved in solving chemical problems can also be used to address a wide range of issues. This means a chemistry degree can be useful in non-traditional fields, and you may be surprised at the number of different ways chemistry combines with other disciplines.\n\nThe Chemistry specialization can be tailored to focus on a particular area of chemistry through careful elective selection. Areas of focus include biological, computational, environmental, theoretical, or materials chemistry. Combined Majors/Honours in Chemical Biology or Biochemistry and Chemistry are also options for students looking to improve their understanding of foundational chemical knowledge relevant for medical or dental school.\n\nExperiential learning and research\nThe Department of Chemistry prioritizes undergraduate participation in research, offering several upper-level courses that allow students to obtain research experience. The UBC Chemistry Undergraduate Summer Research Awards provides opportunities for undergraduate students to further their interest in chemistry by conducting research in an academic environment.\n\nCampus features\nThe UBC Chemistry Building, completed in 1925, is an important heritage site on campus. It has been featured in various film and television programs (X-Men, Supernatural, The X-Files, Psych, and more) because of its unique collegiate gothic architecture. The building was updated in 2008 as part of the UBC RENEW program, which worked to restore and maintain the building’s architectural integrity while updating its chemistry labs, lecture theatres, and administrative spaces.\n\nThe late UBC professor Michael Smith won the 1993 Nobel Prize in Chemistry for discovering how to make targeted genetic mutations in DNA. The new Michael Smith Building, housing the Biotechnology Laboratory, honours his legacy.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 35,
      programUrl: 'https://you.ubc.ca/ubc_programs/chemistry-vancouver/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoiudw000p7m7fzot56q7k',
      status: 'current',
      name: 'Civil Engineering',
      description:
        'Civil Engineering provides you with a foundation in basic sciences and specific civil engineering skills. The first year Engineering program and the second year Civil Engineering program include fundamental courses in mathematics, physics, chemistry, solid mechanics, fluid mechanics, and structures. In the third and fourth years, the curriculum largely consists of civil engineering courses in various sub-disciplines including Environmental, Geotechnical, Hydraulics, Structures, and Transportation Engineering. Laboratory work is carried out in the third and fourth years. In your final year, you will work in groups on a design or laboratory project. A number of technical elective courses in the final year allow you to take additional courses in a preferred area of civil engineering.\n\nCampus features\nThe Civil Engineering Design Studio is a new facility where students can meet with peers and faculty to work on projects and gain a sense of the real-world working environment. The Earthquake Engineering Research Facility has outstanding capabilities, including three shaketables, able to simulate seismic events to a very complex level. Research in the department of Civil Engineering includes major projects in Materials, Coastal & Ocean Engineering, Environmental Fluid Mechanics, Project & Construction Management, Earthquake Engineering, Environmental Engineering, Geotechnical Engineering, Environmental Geotechnics, Hydrotechnical Engineering, Structural Engineering, and Transportation Engineering.',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://you.ubc.ca/ubc_programs/civil-engineering-vancouver/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj9mf007r7m7f821930u5',
      status: 'current',
      name: 'Cognitive Systems',
      description:
        'Cognitive Systems sits at the intersection of computer science, linguistics, philosophy, and psychology. It is the study of the systems that enable people to think, of the systems that can help and hinder our thinking, and of the artificial systems in which something like cognition is accomplished.\n\nWe teach, use, and re-conceptualize the most important and in-demand tools of the 21st century: the tools that every organization, business, and government is hoping to benefit from. We know how to understand data, and we know that data never speak for themselves. We know how to design effective cognitive systems, and we understand the ethical complexities of doing so.\n\nAs a student in the Cognitive Systems program, you’ll have hands-on research experiences that will equip you to work at the outer limits of scientific understanding, pushing to increase knowledge of those aspects of human nature that have proved most resistant to scientific explanation.',
      field: 'Computer Science',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 36,
      programUrl: 'https://you.ubc.ca/ubc_programs/cognitive-systems-ba/',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj1n1004f7m7f4vvoog89',
      status: 'current',
      name: 'Commerce',
      description:
        'The Bachelor of Commerce degree will provide you with a solid foundation of business basics and management skills you’ll need to thrive in any career you choose. You’ll sharpen your skills in critical thinking, problem solving, communication, organization, and leadership. The diverse range of course offerings and specialization options allow you to tailor your degree to your interests and career aspirations.\n\nSpecializations\n\nAccounting\nBusiness Technology Management\nEntrepreneurship\nFinance\nGeneral Business Management\nGlobal Supply Chain and Logistics Management\nMarketing\nOperations and Logistics\nOrganizational Behaviour and Human Resources\nReal Estate\nOptional concentrations\n\nBusiness Analytics\nBusiness Law\nInternational Business\nSustainability and Social Impact\nCampus features\nUBC Sauder’s state-of-the-art facilities create an ideal environment for collaborative and meaningful learning. The Canaccord Learning Commons and David Lam Management Research Library provide research and academic support services. The Wayne Deans Investment Analysis Centre and Leith Wheeler Investment Research Lab have the tools students need to access real-time financial data.',
      field: 'Business & Economics',
      degree: 'Bachelor of Commerce',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://you.ubc.ca/ubc_programs/commerce/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoit3e00017m7fezlu875t',
      status: 'current',
      name: 'Computer Engineering',
      description:
        'Electrical and Computer Engineering (ECE) consists of three eight-month academic sessions either following first-year Engineering or following a transfer program from first-year Science. The second year is common to both Electrical Engineering and Computer Engineering. In the second year, two educational streams are offered: the project integrated program (on a trial basis), which integrates principles of electrical and computer engineering with project work, and the traditional integrated learning method. Some undergraduate curriculum changes will emphasize laboratory work and engineering design, without detracting from the program’s strong analytical base. You can select an option in Software Engineering, as well as a Minor in Honours Mathematics.\n\nCampus features\nThe challenging undergraduate program in Electrical Engineering and Computer Engineering attracts some of the university’s best students. Each year, several of our students win scholarship awards. Our student design teams regularly win prizes in regional, national, and international design competitions.',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://you.ubc.ca/ubc_programs/computer-engineering/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoixaq00277m7fwtn8wid8',
      status: 'current',
      name: 'Computer Science',
      description:
        'This program provides students with an opportunity to complement their Arts degree with a core of Computer Science courses specific to their interests. This program would appeal to students interested both in computer science and visual arts (game or website design), psychology (programming for cognitive science, psychology, and human and computer interactions), English (technical writing), languages (automation of text translation), philosophy (computer ethics), or law (information security and privacy, and forensics).\n\nExperiential learning and research\nThe Capstone Software Engineering Project allows you to develop software for an actual client as part of a student team. In addition, the computer science program offers directed studies, where you can take part in the maintenance of a large software system, conduct supervised readings, and complete independent research projects. The Irving K. Barber Faculty of Science holds an annual undergraduate research conference on UBC’s Okanagan campus to showcase student research projects',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://you.ubc.ca/ubc_programs/computer-science-okanagan-ba/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj9xc007v7m7frrcpk5uv',
      status: 'current',
      name: 'Data Science',
      description:
        'In Data Science undergraduate studies at UBC’s Okanagan campus, you can complete a Bachelor of Science (BSc) with a Major in Data Science, a BSc Data Science Honours, or a Minor in Data Science.\n\nThis program provides you with thorough training in Data Science, which focuses on making decisions supported by data.\n\nExperiential learning and research\nThe Irving K. Barber Faculty of Science holds an annual Undergraduate Research Conference on UBC’s Okanagan campus to showcase student research projects. Students can also join the Quantitative Sciences Course Union on UBC’s Okanagan campus to connect with peers and access resources.\n\nCampus features\nConnect with peers through the Quantitative Sciences Course Union and the Women in Science and Engineering (WiSE) mentoring program.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://you.ubc.ca/ubc_programs/data-science/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Design in Architecture".
    {
      id: 'cmjzoj8m3007j7m7frm61wvvr',
      status: 'current',
      name: 'Design in Architecture',
      description:
        'The Bachelor of Design in Architecture, Landscape Architecture, and Urbanism program explores the connectedness of design across multiple scales – from the body to the city. The program revolves around a core design studio sequence that begins with foundational skills and culminates in the design of complex spaces. You’ll build a strong foundation in critical thinking and the practical skills necessary to create environments that are socially and ecologically sustainable. Additional courses in history, theory, media, technology, and professional practice contribute to a holistic design curriculum.\n\nExperiential learning and research\nBuild a deep disciplinary foundation and develop essential skills through hands-on practical experience, collaborative work projects, and interdisciplinary learning opportunities that integrate architecture, landscape architecture, and urban design. You’ll have the opportunity to enrol in a design-build elective where you’ll tackle real-world problems, exploring and testing solutions and then executing them. Students in the environmental design program can participate in a mentorship program, lectures, studio reviews, and an annual exhibition of graduating student work.\n\nCampus features\nThe School of Architecture and Landscape Architecture offers a comprehensive woodworking shop as well as digital fabrication devices.',
      field: 'Architecture',
      degree: 'Bachelor of Design',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://you.ubc.ca/ubc_programs/architecture-landscape-architecture-and-urbanism/',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoizg300377m7f2yarh7ff',
      status: 'current',
      name: 'Earth and Ocean Sciences',
      description:
        'Earth and Ocean Sciences offers you the opportunity to combine your interests in physics, mathematics, chemistry, biology, computer applications, and the environment. You will study the atmosphere and the solid and liquid earth, using knowledge of the past and present to predict the future of our global system.\n\nSpecific areas of focus include: Mineral and Fuel Deposits, Crustal and Mantle Processes, Sedimentary Geology and Geobiology, Environmental Geology, Understanding Earth’s Physics, Climate, and Palaeontology.\n\nCampus features\nThe Department of Earth, Ocean, and Atmospheric Sciences is home to the Pacific Museum of the Earth and the Mineral Deposit Research Unit (MDRU). The MDRU is part of an integrated geological and geophysical research program at UBC that helps train students for employment in the mineral exploration industry.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://you.ubc.ca/ubc_programs/earth-ocean-sciences/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj1zr004l7m7fmn3o4f12',
      status: 'current',
      name: 'Economics',
      description:
        'Economics offers expertise in a variety of fields including industrial organization, labour, economic measurement, economic history, macroeconomics, public policy, and international trade and finance development, as well as resource, health, and transitional economics. You may select a Minor, Major, or Honours program in Economics, as well as Combined Major programs in Economics and Political Science, Economics and Philosophy, Economics and Statistics, or Economics and Mathematics.\n\nCampus features\nThe Vancouver School of Economics at UBC is ranked top in Canada, and in the top 20 such departments in the world. UBC economics alumnus, Robert Mundell won the 1999 Nobel Prize for Economics, following his groundbreaking analysis of exchange rates and monetary policy.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://you.ubc.ca/ubc_programs/economics-vancouver/',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoitjw00097m7fl54h4g8h',
      status: 'current',
      name: 'Electrical Engineering',
      description:
        'Electrical engineers impact myriad aspects of our lives. They make essential medical equipment, design wireless communications networks, and invent new ways to generate and conserve energy. Learn essential skills in electronics, circuit analysis, and electromagnetics, and after your first year, customize your program by taking specialized courses in nanotechnology, biomedical engineering, or renewable energy.\n\nElectrical Engineering consists of three eight-month academic sessions either following first year Engineering or following a transfer program from first year Science. The second year is common to both Electrical Engineering and Computer Engineering. Some undergraduate curriculum changes will emphasize laboratory work and engineering design, without detracting from the program’s strong analytical base. You can select one of the following options: Biomedical Engineering, Nanotechnology & Microsystems, or Electrical Energy Systems,  as well as a Minor in Honours Mathematics.\n\nYour future\nYour career opportunities will vary widely across a range of fields including biomedicine, hardware design, automotive power, electronics, power systems design, autonomous robots, communications and network technology, and software design, and others.',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://you.ubc.ca/ubc_programs/electrical-engineering-vancouver/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoiw2c001l7m7frhenr0gd',
      status: 'current',
      name: 'Engineering Physics',
      description:
        'Engineering Physics is one of the most competitive and academically challenging undergraduate programs at UBC. With a strong foundation of academic courses, project courses, and co-op work experience, the five-year Engineering Physics program provides you with the skills and experience needed to develop new technology and interdisciplinary engineering projects. You will take high-level Math and Physics courses, as well as courses in Computer Science, Electrical Engineering, and Mechanical Engineering. In second year, you will take courses in each of these areas and choose Electrical, Mechanical, or Mechatronics as your specialty. The academic program is normally supplemented with technical experience, and protected time for technical work terms is built into the curriculum.\n\nCampus features\nThe UBC Sustainability Solutions Applied Physics Laboratory has unique research projects, such as the UBC Solar Canopy group, aiming to explore the potential of electromagnetics, for practical environmentally aware solutions.',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://you.ubc.ca/ubc_programs/engineering-physics/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj3d4004z7m7fs8pkqgml',
      status: 'current',
      name: 'English Language and Literatures',
      description:
        'As an English major, you’ll study literature written in English from around the world – from the earliest medieval riddles to contemporary slam poetry. You’ll also have the opportunity to study the English language: its roots, its patterns, and its uses in politics and social media. If you’re an English major or honours student, you’ll encounter the past and present of imaginative literature and understand how our language makes meaning. You’ll learn to read intelligently, to write lucidly, to imagine and to understand cultures, to work in teams, to ask good questions, and to learn independently.\n\nExperiential learning and research\nAs an English student, you can choose to take your learning in any number of directions:\n\nSeminars: Attend student-centred seminars with opportunities for independent research.\nStudent-directed seminars: Take the seminar experience one step further and design your own course!\nHonours thesis: Write an undergraduate thesis, working one-on-one with a professor.\nCommunity engagement courses: Gain real-world experience with experiential learning opportunities in First Nations communities, literary collectives, local high schools, and more.\nBook history courses: Learn how to use a printing press in a book history course.\nCampus features\nAs an English student on UBC’s Vancouver campus, you’ll have access to key on-campus resources, including:\n\nBuchanan Tower lounges and offices\nUBC Library’s Rare Books and Special Collections\nUBC Press, Canada’s pre-eminent social science publisher\nThe Ubyssey, UBC’s student newspaper\nThe Garden Statuary, UBC’s undergraduate English journal',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://you.ubc.ca/ubc_programs/english-vancouver/',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoiv8900157m7fuk4s6rbf',
      status: 'current',
      name: 'Environmental Engineering',
      description:
        'Environmental Engineering is a 4.5-year (nine semester) joint degree between UBC and the University of Northern British Columbia (UNBC – located in Prince George, BC).  Application for admission is made through UNBC.\n\nThe program starts with a two-year foundation in mathematics, basic sciences, and environmental sciences from UNBC. The third and fourth years offer training in engineering fundamentals, engineering analysis, and engineering design, through courses in Civil Engineering and Chemical & Biological Engineering at UBC. The final term at UNBC exposes you to practical environmental engineering problems.\n\nA selection of the UBC courses you can take (years three and four) are listed to the right of this page, in the “what you will learn” section. To view the UNBC courses (years one, two, and five), visit the program webpage.\n\nThe program is designed to meet the criteria of the Canadian Engineering Accreditation Board and of environmental engineering registration with the Association of Professional Engineers and Geoscientists of the Province of British Columbia. Prospective international students should determine certification requirements in the country of their intended practice.',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4.5 years',
      minIBPoints: 37,
      programUrl: 'https://you.ubc.ca/ubc_programs/environmental-engineering-joint-unbc-ubc/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoizyd003j7m7f3xbypdmg',
      status: 'current',
      name: 'Environmental Sciences',
      description:
        'Environmental Sciences is the application of scientific knowledge from many disciplines to issues relating to the sustainability of resource use, the increase in human population, the degradation of the environment caused by pollution and disturbance, the endangerment and extinction of species and natural systems.\n\nThe specialization is interdisciplinary and is designed to give students a strong foundational science background. It concentrates on understanding the major environmental issues facing human societies and adopts an integrative cross-disciplinary approach to the study of these issues. Students supplement course classes with electives in a broad range of earth and ocean sciences fields depending on their area of concentration.\n\nExperiential learning and research\nSeminars and student projects are designed to help you perfect your communication skills and ability to work in groups, preparing you for future employment and teamwork as an environmental scientist. All environmental science students are required to do a major project (two terms) in their final year. Majors students engage in a team project in collaboration with a community partner organization, while honours students undertake an individual research project with a faculty supervisor.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://you.ubc.ca/ubc_programs/environmental-sciences/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj5gc005n7m7firslv5x7',
      status: 'current',
      name: 'Food Science',
      description:
        'UBC’s Food Science degree has the added distinction of being approved by the Institute of Food Technologists (IFT): the internationally respected governing body that sets the standards in Food Science education. By choosing this program, you’ll be eligible to apply for Canadian Institute of Food Science and Technology (CIFST) scholarships and other food science-specific student funding. You’ll also have access to the IFT Student Association events and opportunities to collaborate with other students across North America.\n\nExperiential learning and research\nFood Science emphasizes hands-on experience through extensive foundational science and food-specific laboratory courses. You’ll also be able to take part in community-based learning through the Land, Food, and Community series, where you’ll investigate regional, national, and global food systems that are ecologically, socially, and economically sustainable.\n\nAdditionally, you can build business skills through hands-on opportunities such as working at the student-run Agora Cafe or at food industry co-op placements.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://you.ubc.ca/ubc_programs/food-science/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj72u006j7m7f9ttebfzh',
      status: 'current',
      name: 'Forest Sciences',
      description:
        'If you have an inquisitive mind and want to unravel the mysteries of nature, Forest Sciences could be for you. As a student in this academically challenging program, you’ll improve your understanding of forest wildlife, fires, insects, diseases, soil, tree genetics, and forest regeneration.\n\nYou’ll also learn how to ask and approach important questions like: How do plants and animals in forest ecosystems react to insects and disease, climate change, pollution, harvesting, and recreational use? How can we sustain the biological diversity of our forests while meeting our resource needs?\n\nAs a Forest Sciences student, you’ll:\n\nComplete extensive, hands-on lab or field work.\nTake part in one or two, week-long field schools at the Alex Fraser Research Forest in Williams Lake BC, and the Malcolm Knapp Research Forest in Maple Ridge, BC.\nHonours students will write an original, six-credit thesis under the supervision of a faculty member in your final year.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://you.ubc.ca/ubc_programs/forest-sciences/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj44u00557m7fyl9flsn3',
      status: 'current',
      name: 'Geography',
      description:
        'Geography is the study of human and physical landscapes on the surface of the earth, integrating ideas and methods from many different disciplines. Part of the Community, Culture, and Global Studies (CCGS) academic unit, the program emphasizes the development of theory and methodology, as well as the practical application of geographical concepts to environmental, economic, social, and cultural issues at global and local scales, and issues pertinent to southern British Columbia and Canada.\n\nIn the degree program, you’ll complete course requirements in both physical geography, and the broad range of human geography study.\n\nExperiential learning and research\nYour coursework offers opportunities to visit Kelowna-area field locations, including studying mountain hazards at a facility in the Canadian Cordillera. In third or fourth year you can undertake a supervised investigation as part of a directed studies course, which will result in a written report of your findings. The Irving K. Barber Faculty of Science holds an annual undergraduate research conference on UBC’s Okanagan campus to showcase student research projects.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://you.ubc.ca/ubc_programs/geography/',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzojb6z008l7m7fc9vikw4m',
      status: 'current',
      name: 'Geological Engineering',
      description:
        'Geological Engineering is an interdisciplinary program housed in the Faculty of Science, but leading to the Bachelor of Applied Science of the engineering Faculty of Applied Science. Our research and teaching interests span virtually all aspects of understanding the history and dynamics of our planet, as well as management of its resources and the environment we live in. This program focuses on many important aspects of geotechnology, including construction, environmental protection, transportation, energy and water supply, mining, natural hazards management, and governmental oversight.',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://you.ubc.ca/ubc_programs/geological-engineering',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj6jb00677m7fvkw4dd9c',
      status: 'current',
      name: 'Global Resource Systems',
      description:
        'The Global Resource Systems (GRS) program recognizes that solving complex resource problems requires a wide range of skills, as well as a global and interdisciplinary approach. GRS is designed to equip you with a sophisticated international understanding, well-developed problem solving skills, and the confidence to bring your knowledge and insights to bear on the international stage.\n\nYou’ll enter the program after completing your first year in Land and Food Systems, Arts, or Sciences. In the third and fourth years of the program, you’ll select a resource area and a region of the world as the focus of your studies. In this self-directed program, you’ll focus on local and international resource issues and build your own degree path through a combination of science, humanities, and social science courses offered at faculties across UBC.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://you.ubc.ca/ubc_programs/global-resource-systems/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj4x7005b7m7fajkayq6d',
      status: 'current',
      name: 'Health and Exercise Sciences (Kinesiology)',
      description:
        'Help people lead healthier, more active lives. Health and Exercise Sciences will provide you with a comprehensive understanding of human movement and its impacts on health.\n\nYou’ll examine the interdisciplinary nature of human health, including the psychological, physiological, neuromechanical, and socio-cultural aspects of movement. Together, these will equip you with practical skills to work with individuals across their lifespans.\n\nAt the end of your second year, you have the option to complete one of three concentrations: Kinesiology and Allied Health, Health Behaviour Change, or Clinical Exercise Physiology. Each concentration offers a strategic career focus to best prepare you to be a leader in your field.\n\nUpon graduation, you may start a career as a kinesiologist or clinical exercise physiologist, with a focus on the role of exercise in improving health, fitness, and performance. You could also go on to pursue graduate studies in research or in a variety of health professions, such as physiotherapy, occupational therapy, athletic therapy, public health, or medicine.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Kinesiology',
      duration: '4 years',
      minIBPoints: 35,
      programUrl: 'https://you.ubc.ca/ubc_programs/health-and-exercise-sciences/',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: false
        }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj343004x7m7fin82ktyi',
      status: 'current',
      name: 'History',
      description:
        'History is concerned with the study of the past. It draws on the social sciences and humanities for much of its data and conceptual techniques, but remains essentially a study in the dimension of time, with methods of inquiry appropriate to such a study. Since the study of history involves the examination of people in an almost unlimited variety of situations, it deepens our understanding of people’s capacities and failings. It trains the mind to generalize on the basis of evidence and to distinguish propaganda from fact. You can select a Minor, Major, or Honours in History.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://you.ubc.ca/ubc_programs/history-vancouver/',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoja8d007z7m7flcvsrp0d',
      status: 'current',
      name: 'Integrated Sciences',
      description:
        'The Integrated Sciences specialization is designed for highly motivated students whose interests in science cross disciplinary boundaries. The specialization allows you to design your own interdisciplinary course of study that better reflects your interests and can help prepare you for additional study in the health sciences, law, journalism, engineering, or business.\n\nOnce admitted into the program, you design your upper-level curriculum, which must bridge at least two disciplines within science or beyond. Individual curriculum is supplemented with Integrated Sciences “core” courses (ISCI courses). These courses are highly interactive with a focus on active learning, group discussion, and collaborative research. As an Integrated Sciences student, you’ll be assigned an IntSci Faculty Mentor to help you design your individual course of study.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://you.ubc.ca/ubc_programs/integrated-sciences/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj4et00577m7fxn1lygu2',
      status: 'current',
      name: 'International Relations',
      description:
        'International Relations is an interdisciplinary program that enables you to develop an in-depth understanding of international relations by combining the insights and perspectives of different disciplines, such as Economics, History, Political Science, Geography, Anthropology, and Asian Studies, with the study of languages. You will complete prerequisites during your first two years of study and apply for admission to the program at the end of your second year. You can select a Major or Minor in International Relations. Honours programs are available through the departments of Political Science or History.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://you.ubc.ca/ubc_programs/international-relations-vancouver/',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Design in Architecture".
    {
      id: 'cmjzoj8va007l7m7f31hv3g5f',
      status: 'current',
      name: 'Landscape Architecture',
      description:
        'The Bachelor of Design in Architecture, Landscape Architecture, and Urbanism program explores the connectedness of design across multiple scales – from the body to the city. The program revolves around a core design studio sequence that begins with foundational skills and culminates in the design of complex spaces. You’ll build a strong foundation in critical thinking and the practical skills necessary to create environments that are socially and ecologically sustainable. Additional courses in history, theory, media, technology, and professional practice contribute to a holistic design curriculum.',
      field: 'Architecture',
      degree: 'Bachelor of Design',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://you.ubc.ca/ubc_programs/architecture-landscape-architecture-and-urbanism/',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj4o300597m7f77zeroba',
      status: 'current',
      name: 'Linguistics',
      description:
        'Linguistics is the systematic study of how language works. Linguists work on sound systems (phonetics and phonology), on the relationship between form and meaning (morphology, syntax, and semantics), and on how languages change over time.\n\nIn introductory-level Linguistics courses, you study language systems by analyzing data from languages of contrasting structure. You can expect to study English, but also languages like Cantonese, local First Nations languages, Latin, or Haitian Creole.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://you.ubc.ca/ubc_programs/linguistics/',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoiwvq001z7m7fllyttv8y',
      status: 'current',
      name: 'Materials Engineering',
      description:
        'Materials Engineering is concerned with the characterization, processing, and use in design of metallic and non-metallic materials. An optional Co-operative Education program is available that allows you to obtain twenty months of related experience in the last three years of your program.\n\nCampus features\nLeading-edge research is conducted by the Department of Materials engineering in biomaterials, ceramics, composites, hydrometallurgy, metals processing, and microstructure engineering. The Centre for Metallurgical Process Engineering at UBC is an internationally recognized interdisciplinary research centre focused on the development of advanced metallurgical processes and products.\n\nThe Advanced Materials and Process Engineering Laboratory (AMPEL) is a multi-disciplinary research centre with participation of research groups of engineers, scientists, and health scientists. AMPEL brings together top-level basic and applied research groups working at the forefront of research on materials and devices in a collaborative environment sharing expertise and modern research facilities.',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://you.ubc.ca/ubc_programs/materials-engineering/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoiytk002z7m7fg02edbs5',
      status: 'current',
      name: 'Mathematics',
      description:
        'Mathematics at UBC develops rigorous analytical thinking and problem-solving abilities. Students explore pure and applied mathematics including algebra, analysis, probability, and computational methods. The program prepares graduates for careers in research, finance, technology, and education.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://you.ubc.ca/programs/mathematics-vancouver-bsc/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://you.ubc.ca/programs/mathematics-vancouver-bsc/',
        'https://you.ubc.ca/applying-ubc/requirements/international-baccalaureate/'
      ],
      notes:
        'Content 3.4: UBC split the old mathematics-vancouver page into BSc and BA pages; this is the BSc (Faculty of Science, 4 years). Degree-specific requirements, Science: IB Math AA SL or HL, or Math AI HL (AI SL is not accepted), and one of IB Biology, Chemistry or Physics; plus Grade 11 Chemistry and Physics or equivalent for students without them in the IB (Physics may be waived with 5 in IB Chemistry and IB Maths), which the model cannot hold. UBC names no minimum grade; 4 is stored, replacing an unsourced Maths 5, and the science group is now critical. UBC publishes no IB points figure: the general requirement is a completed IB Diploma with at least three HL courses, and admission weighs grades with a personal profile. The stored 37 points predate this check and have no official source; they are kept, not re-verified (see the owner question in the 3.4 status). The pages name no entry year, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoityq000h7m7fi8w6jqsy',
      status: 'current',
      name: 'Mechanical Engineering',
      description:
        'Mechanical Engineering applies physics and materials science principles to design, analyze, and manufacture mechanical systems. Students study thermodynamics, mechanics, robotics, and manufacturing processes. The program prepares graduates for diverse industries including aerospace, automotive, energy, and biomedical.',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://you.ubc.ca/ubc_programs/mechanical-engineering-vancouver/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj9dj007p7m7filzjiwlo',
      status: 'current',
      name: 'Media Studies',
      description:
        'With competencies in theory, research, and application, the Media Studies program prepares you for a rewarding and dynamic career in media, whether your aspirations are academically- or professionally-oriented. Dissecting how meaning is represented and mediated, the program’s courses and expanded learning opportunities promote critical thinking, reflection, and analysis, equipping students to become socially engaged scholars and makers that use media to contribute to the greater good as creative agents of transformation.\n\nRequired courses include a purposeful disciplinary core covering a diverse range of media perspectives and methodologies, including:\n\nArt History and Visual Art\nCreative Writing\nJournalism\nCinema Studies and Film Production\nComputer Science\nInformation Studies\nEnglish and German Studies\nThe BMS bridges disciplinary boundaries in the classroom through its MDIA courses, most of which are exclusive to the program. With multiple expert instructors and professionals from the field teaching together, you and your cohort will engage in media production, critically investigating and applying your learning in an environment that models the collaborative environment of workplaces across the field.\n\nIn addition to required courses, you’ll expand the depth of your knowledge and skills in one media studies area of focus, chosen between visual, narrative, and data. Starting in second year, these additional courses allow you to dive deeper into the theory and production of media—and how each informs the other—of your area of focus. In fourth year, you’ll have the opportunity to enroll in a hands-on Digital Media project class at the Centre for Digital Media, and other course options available to Media Studies students.\n\nSubject to an evaluation of your supplemental portfolio submission by an admissions committee, and competitive academic average, you can apply for entry to the four-year program direct from high school, or, with one year of postsecondary studies and prerequisite coursework completed, you may apply to transfer into the program for entry into the second-year cohort.',
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://you.ubc.ca/ubc_programs/media-studies/',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj0iu003v7m7fn13nvtkl',
      status: 'current',
      name: 'Microbiology and Immunology',
      description:
        'Microbiology and Immunology offers major or honours degrees that provide an in-depth knowledge of microbes and their interactions with the environment, and how they relate to human and environmental health. You’ll acquire laboratory skills in bacterial and eukaryotic cell culture and phenotyping, genomics, and data science. Our programs are distinguished by authentic course-based research experiences and opportunities to work in world-leading research labs. In your final year, you’ll engage in seminar courses focused on recent research discoveries pioneered by leading scientists in the field.\n\nThe Department of Microbiology and Immunology faculty are affiliated with the multidisciplinary Life Sciences Institute (LSI) and the Michael Smith Laboratories (MSL). The LSI is the largest institute in Canada with a mission is to perform innovative, interdisciplinary science focused on discovering the fundamental biological mechanisms underlying health and disease, and to translate this knowledge into new therapies. The Michael Smith Laboratories, named after the late Nobel laureate UBC professor, are located in the heart of campus, and bring together first-class scientists to solve biological problems using genetic engineering techniques.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 35,
      programUrl: 'https://you.ubc.ca/ubc_programs/microbiology-immunology/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoiwff001r7m7frx3hhujf',
      status: 'current',
      name: 'Mining Engineering',
      description:
        'Mining Engineering is concerned with the extraction and processing of ores containing valuable minerals or metals. To become a mining engineer, you need a thorough knowledge of general engineering principles, followed by the study of courses specific to mining and mineral processing. These courses are designed to cover a wide and diverse range of subjects in order to meet the challenges faced by the global mining industry. The program’s cross-disciplinary approach to mining is aimed at reducing the environmental impact of mining operations, improving the social impacts of mining, and increasing the efficiency of aspects of mineral extraction such as energy and water usage.',
      field: 'Engineering',
      degree: 'Bachelor of Applied Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://you.ubc.ca/ubc_programs/mining-engineering/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj948007n7m7folqakty5',
      status: 'current',
      name: 'Music',
      description:
        'Students wishing to study Music as one of the liberal arts, or who don’t meet the special admissions requirements of the School of Music may pursue a Bachelor of Arts degree with a Major, Minor, or Honours in Music. Core music courses are similar to the Bachelor of Music degree, but without individual instrumental or vocal instruction.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Music',
      duration: '4 years',
      minIBPoints: 30,
      programUrl: 'https://you.ubc.ca/ubc_programs/music/',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj7l7006v7m7fip9cp2h2',
      status: 'current',
      name: 'Natural Resources Conservation',
      description:
        'Conservation is concerned with maintaining habitats, nurturing diverse natural resources, and understanding human behaviours. Learn how to balance the social, economic, cultural, and aesthetic considerations associated with the world’s natural resources so you can help fight climate change, protect the environment, and shape our future and planet.\n\nAs a Conservation student, you’ll take courses in English, math, and science – plus conservation, wildlife, fisheries management, computer applications, remote sensing, and soil science. You’ll also have the opportunity to choose from two concentrations of study:\n\nScience and Management, which offers a rigorous education in natural and social sciences and a strong focus on solving conservation issues. Considerable field experience teaches practical approaches for achieving conservation goals.\nGlobal Perspectives, which provides more experience in policy and planning, as well as more breadth in resource systems than the Science and Management specialization. Students will obtain hands-on cultural or international experiences in a conservation context.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://you.ubc.ca/ubc_programs/conservation/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj5y5005x7m7fp0ht5nkb',
      status: 'current',
      name: 'Nutritional Sciences',
      description:
        'The Food, Nutrition, and Health program gives you the flexibility to pursue your interests while gaining a deeper knowledge of issues related to food production, food security, and the role of nutrition in disease prevention. Choosing from a wide variety of electives, you’ll study a broad curriculum of your own design as you prepare for a career in the food and health sectors. Food, Nutrition, and Health students can apply to dual degrees with Bachelor of Education or Master of Management, or one of six minors to complement their program.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 33,
      programUrl: 'https://you.ubc.ca/ubc_programs/food-nutrition-and-health/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzojaqj008b7m7fsknap5u1',
      status: 'current',
      name: 'Pharmacology',
      description:
        'Pharmacology is the science of drug action on biological systems. It deals with the sources, chemical properties, biological effects, mechanisms of action, therapeutic uses, and adverse effects of drugs. It is a science that is basic not only to medicine, but also to pharmacy, nursing, dentistry, midwifery, and veterinary medicine. Pharmacologists’ work ranges from exploring the potential hazards of pesticides and herbicides, to developing treatment and prevention of major diseases by drug therapy.  While a Bachelor of Sciences Pharmacology degree shares similarities with both the PharmD and Bachelor of Pharmaceutical Sciences degrees, the BSc Pharmacology program has a more detailed focus on drug mechanisms of action, and pre-clinical techniques used to investigate the beneficial and detrimental effects of these compounds; graduates of this program are qualified for basic research in the field, as well as further training for myriad professional programs in the Life Sciences fields.\n\nPharmacology is available as a major or honours degree, both of which can be completed with 12-16 months of co-operative work experience. Students apply for admission as part of the coordinated specialization program after completion of their first year in the Faculty of Science.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl: 'https://you.ubc.ca/ubc_programs/pharmacology/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj2v5004v7m7fvo3s3pzq',
      status: 'current',
      name: 'Philosophy',
      description:
        'The study of philosophy gives you tools to think carefully and critically about almost any subject that you may be interested in. You will learn how to analyze arguments, construct your own arguments, and understand the historical context of many of today’s most pressing problems. Philosophy can help you improve your ability to read, write persuasively, and present your ideas effectively; to analyze and evaluate complicated information usefully; and to solve complex problems.\n\nUBC’s Vancouver campus has strengths in a variety of areas of philosophy, including the philosophy of mind, philosophy of science, the analytic tradition, ethics, political philosophy, aesthetics, and feminist philosophy.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://you.ubc.ca/ubc_programs/philosophy-vancouver/',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoiygy002t7m7f4mvqwy2h',
      status: 'current',
      name: 'Physics',
      description:
        "Physics explores the fundamental laws that govern the universe, from subatomic particles to galaxies. UBC's program develops strong mathematical and problem-solving skills with opportunities in quantum mechanics, astrophysics, condensed matter, and particle physics research.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl: 'https://you.ubc.ca/ubc_programs/physics-vancouver/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj2m5004t7m7fp7m99of4',
      status: 'current',
      name: 'Political Science',
      description:
        'Political Science examines political systems, international relations, and public policy. Students analyze government institutions, political behavior, and global affairs. Located in multicultural Vancouver, UBC provides unique perspectives on Canadian and international politics.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://you.ubc.ca/ubc_programs/political-science-vancouver/',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj2cl004r7m7fzgpzm6zv',
      status: 'current',
      name: 'Psychology',
      description:
        "Psychology studies human behavior, cognition, and mental processes. UBC's program covers developmental, social, clinical, and cognitive psychology with opportunities for research. Graduates pursue careers in counseling, healthcare, human resources, research, and education.",
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://you.ubc.ca/programs/psychology-vancouver-ba/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://you.ubc.ca/programs/psychology-vancouver-ba/',
        'https://you.ubc.ca/applying-ubc/requirements/international-baccalaureate/'
      ],
      notes:
        'Content 3.4: the page moved from ubc_programs/psychology-vancouver/ to programs/psychology-vancouver-ba/; same programme (BA, Faculty of Arts, Vancouver). Checked, none required: "No specific courses required beyond those needed for general admission"; Language Arts is listed as relevant. UBC publishes no IB points figure: the general requirement is a completed IB Diploma with at least three HL courses, and admission weighs grades with a personal profile. The stored 32 points predate this check and have no official source; they are kept, not re-verified (see the owner question in the 3.4 status). The pages name no entry year, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj3m400517m7fi1f5kor9',
      status: 'current',
      name: 'Sociology',
      description:
        'Sociology is the study of human behaviour as it is shaped by society and in turn affects the social contexts in which we live. Contexts include informal groups, families, classrooms, work organizations, cultures, and societies. The effects of social categories on human behaviour constitute a topic of central interest within sociology. Sociologists use a variety of research methods, including historical analysis, participant observation, surveys, and field and laboratory experiments. You can select a Major, Minor, or Honours degree in Sociology.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://you.ubc.ca/ubc_programs/sociology-vancouver/',
      requirements: [],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoiz4z00337m7f0ywlnyoo',
      status: 'current',
      name: 'Statistics',
      description:
        'Statistics is a science that deals with collecting, organizing, and analyzing data, and the theory for statistical methods involves mathematics and probability. Statisticians extract information from data. Due to the ubiquity of computers and ability to collect massive amounts of data, statistics is a significant and ever-growing field of study.\n\nStatistics students select a nine-credit “thematic concentration” in areas such as computer science, economics, life sciences, commerce, or the social sciences to ensure that they can apply statistical methods in another discipline. The concentrations allow you to customize the major or honours programs to reflect your interests, but to a lesser extent than combined major or honours programs.\n\nThe BSc Statistics is available as a major, honours, or through the combined honours program. The honours programs are suggested for students interested in pursuing graduate work in the mathematical sciences or another field.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl: 'https://you.ubc.ca/ubc_programs/statistics-vancouver/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzoj83q00777m7f3ch857mu',
      status: 'current',
      name: 'Wood Products',
      description:
        "If you're innovative, and you enjoy engineering and problem solving, Wood Products could be for you. This award-winning program fuses science, engineering, and business and is a major in the Bachelor of Science in Nature Resources degree.\n\nGain a comprehensive understanding of wood science, business, and advanced manufacturing operations, while developing transferable skills in problem solving, communication, leadership, and teamwork.\n\nAfter completing foundational courses in math, physics, and chemistry in first year, you’ll begin developing your knowledge of wood and material science and primary and secondary wood processing technologies. In senior years, you’ll learn how to analyze and optimize manufacturing operations. In your final year, you’ll focus on an area of interest with a major project.\n\nExperiential learning and research\nAs a Wood Products student, you’ll:\n\nEnjoy access to UBC’s Centre for Advanced Wood Processing, a $2 million wood products manufacturing facility.\nGain hands-on experience at the faculty’s extensive machine laboratory.\nParticipate in a one-week tour of BC wood products manufacturing operations.\nComplete a major project in your final year.\nCampus features\nThe award-winning Forest Sciences Centre on UBC’s Vancouver campus offers wireless study space, high-tech classrooms, and labs equipped with the latest technology.\n\nThe Faculty of Forestry also has two major research forests in British Columbia, and jointly manages a third, altogether totalling 25,000 hectares or more than 60,000 acres.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://you.ubc.ca/ubc_programs/wood-products/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: null,
      sources: []
    }
  ]
}

export default refresh
