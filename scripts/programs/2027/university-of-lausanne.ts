import type { RefreshFile } from '../lib/refresh'

/**
 * University of Lausanne: requirements for 2027 entry.
 *
 * Exported from the database on 2026-09-30 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-lausanne
 */
const refresh: RefreshFile = {
  university: 'University of Lausanne',
  entryYear: 2027,
  checkedOn: '2026-09-30',
  programs: [
    // Stored: checked for 2026 entry on 2026-02-16. Degree stored as "Bachelor of Arts (BA)".
    {
      id: 'cmlp0loc9002v7mafdzhanusv',
      status: 'current',
      name: 'Arts',
      description:
        'The Faculty of Arts offers a wide range of disciplines, from historical studies to theoretical approaches in the humanities, including the study of ancient and modern languages. Courses cover currents of thought and cultural output, from literature and discourse to ancient civilisations, film, photography, music, and more.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 32,
      programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/lettres.html',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unil.ch/files/live/sites/unil/files/04-etudier/0400-immatriculations/02-bachelor-diplome-etranger/tableau-des-pays-en.pdf',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/immatriculations-et-inscriptions/bachelor-avec-diplome-etranger.html',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/lettres.html'
      ],
      notes:
        'UNIL\'s list of requirements by country ("Academic year 2026/2027"; the admissions page says it "is only valid for the academic year 2026-2027") and swissuniversities\' IB list (2026/27): 32 points out of 42, not counting bonus points (stored as published); three subjects at HL and three at SL covering the six general education subjects, one from each category (first language, second language, mathematics, one of Biology, Chemistry or Physics, one of Geography, History or Economics/Business Management, an elective), with Mathematics or an experimental science at HL. UNIL does not recognise Psychology, Global Politics, Social and Cultural Anthropology, World Religions, Design Technology, SEHS, ESS, Literature and Performance or the arts. No subject grade is named, so 4. UNIL sets no programme-specific IB subjects: its programme pages and HEC Lausanne refer to the admissions service. Plus UNIL\'s French exam unless French is the mother tongue or language of instruction or an exemption applies.'
    },
    // Stored: checked for 2026 entry on 2026-02-16. Degree stored as "Bachelor of Science (BSc)".
    {
      id: 'cmlp0lj7000037mafx73i1wqa',
      status: 'current',
      name: 'Biology',
      description:
        'This program provides a broad view of biology, from molecular levels to entire ecosystems. It emphasizes practical work, which becomes increasingly integrated with research laboratories as studies progress. Students acquire the knowledge and methodological skills needed to understand living organisms at all scales.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 32,
      programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/biologie.html',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unil.ch/files/live/sites/unil/files/04-etudier/0400-immatriculations/02-bachelor-diplome-etranger/tableau-des-pays-en.pdf',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/immatriculations-et-inscriptions/bachelor-avec-diplome-etranger.html',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/biologie.html'
      ],
      notes:
        'UNIL\'s list of requirements by country ("Academic year 2026/2027"; the admissions page says it "is only valid for the academic year 2026-2027") and swissuniversities\' IB list (2026/27): 32 points out of 42, not counting bonus points (stored as published); three subjects at HL and three at SL covering the six general education subjects, one from each category (first language, second language, mathematics, one of Biology, Chemistry or Physics, one of Geography, History or Economics/Business Management, an elective), with Mathematics or an experimental science at HL. UNIL does not recognise Psychology, Global Politics, Social and Cultural Anthropology, World Religions, Design Technology, SEHS, ESS, Literature and Performance or the arts. No subject grade is named, so 4. UNIL sets no programme-specific IB subjects: its programme pages and HEC Lausanne refer to the admissions service. Plus UNIL\'s French exam unless French is the mother tongue or language of instruction or an exemption applies. The stored Biology SL and Chemistry or Physics SL rows had no source and are replaced by the university-wide rule.'
    },
    // Stored: checked for 2026 entry on 2026-02-16. Degree stored as "Bachelor of Science (BSc)".
    {
      id: 'cmlp0lnr7002l7mafv6wtdar3',
      status: 'current',
      name: 'Economics',
      description:
        'Also offered by HEC Lausanne as a bilingual program, it focuses on using rigorous scientific analyses to explore economic questions such as growth, international trade, macroeconomic policy, and resource allocation. Students develop strong quantitative and analytical skills.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 32,
      programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/economie.html',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unil.ch/files/live/sites/unil/files/04-etudier/0400-immatriculations/02-bachelor-diplome-etranger/tableau-des-pays-en.pdf',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/immatriculations-et-inscriptions/bachelor-avec-diplome-etranger.html',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/economie.html'
      ],
      notes:
        'UNIL\'s list of requirements by country ("Academic year 2026/2027"; the admissions page says it "is only valid for the academic year 2026-2027") and swissuniversities\' IB list (2026/27): 32 points out of 42, not counting bonus points (stored as published); three subjects at HL and three at SL covering the six general education subjects, one from each category (first language, second language, mathematics, one of Biology, Chemistry or Physics, one of Geography, History or Economics/Business Management, an elective), with Mathematics or an experimental science at HL. UNIL does not recognise Psychology, Global Politics, Social and Cultural Anthropology, World Religions, Design Technology, SEHS, ESS, Literature and Performance or the arts. No subject grade is named, so 4. UNIL sets no programme-specific IB subjects: its programme pages and HEC Lausanne refer to the admissions service. Plus UNIL\'s French exam unless French is the mother tongue or language of instruction or an exemption applies. The stored Maths HL 5 and Economics or Business Management rows had no source; maths is required at SL (or at HL as the HL science). Taught in French and English.'
    },
    // Stored: checked for 2026 entry on 2026-02-16. Degree stored as "Bachelor of Science (BSc)".
    {
      id: 'cmlp0llxr001l7mafq3j220nh',
      status: 'current',
      name: 'Forensic Science',
      description:
        'A complex, interdisciplinary scientific program integrating exact sciences (physics, mathematics, chemistry) with humanities (criminology, criminal law) and engineering. Forensic Science is one of the specialized flagship programs of UNIL, training students to apply scientific methods to legal investigations.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 32,
      programUrl:
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/science-forensique.html',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unil.ch/files/live/sites/unil/files/04-etudier/0400-immatriculations/02-bachelor-diplome-etranger/tableau-des-pays-en.pdf',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/immatriculations-et-inscriptions/bachelor-avec-diplome-etranger.html',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/science-forensique.html'
      ],
      notes:
        'UNIL\'s list of requirements by country ("Academic year 2026/2027"; the admissions page says it "is only valid for the academic year 2026-2027") and swissuniversities\' IB list (2026/27): 32 points out of 42, not counting bonus points (stored as published); three subjects at HL and three at SL covering the six general education subjects, one from each category (first language, second language, mathematics, one of Biology, Chemistry or Physics, one of Geography, History or Economics/Business Management, an elective), with Mathematics or an experimental science at HL. UNIL does not recognise Psychology, Global Politics, Social and Cultural Anthropology, World Religions, Design Technology, SEHS, ESS, Literature and Performance or the arts. No subject grade is named, so 4. UNIL sets no programme-specific IB subjects: its programme pages and HEC Lausanne refer to the admissions service. Plus UNIL\'s French exam unless French is the mother tongue or language of instruction or an exemption applies. The stored Maths HL 5 and science SL rows had no source and are replaced by the university-wide rule.'
    },
    // Stored: checked for 2026 entry on 2026-02-16. Degree stored as "Bachelor of Science (BSc)".
    {
      id: 'cmlp0lmjq001x7maftrmmqmrr',
      status: 'current',
      name: 'Geosciences and Environment',
      description:
        "After a common first year, students choose one of three paths: Environmental Sciences (interdisciplinary sustainability), Geography (society-environment interface), or Geology (Earth's physical and chemical processes). The program combines fieldwork with laboratory and computational approaches.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 32,
      programUrl:
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/geosciences-et-environnement.html',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unil.ch/files/live/sites/unil/files/04-etudier/0400-immatriculations/02-bachelor-diplome-etranger/tableau-des-pays-en.pdf',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/immatriculations-et-inscriptions/bachelor-avec-diplome-etranger.html',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/geosciences-et-environnement.html'
      ],
      notes:
        'UNIL\'s list of requirements by country ("Academic year 2026/2027"; the admissions page says it "is only valid for the academic year 2026-2027") and swissuniversities\' IB list (2026/27): 32 points out of 42, not counting bonus points (stored as published); three subjects at HL and three at SL covering the six general education subjects, one from each category (first language, second language, mathematics, one of Biology, Chemistry or Physics, one of Geography, History or Economics/Business Management, an elective), with Mathematics or an experimental science at HL. UNIL does not recognise Psychology, Global Politics, Social and Cultural Anthropology, World Religions, Design Technology, SEHS, ESS, Literature and Performance or the arts. No subject grade is named, so 4. UNIL sets no programme-specific IB subjects: its programme pages and HEC Lausanne refer to the admissions service. Plus UNIL\'s French exam unless French is the mother tongue or language of instruction or an exemption applies. The stored Geography SL row had no source; Geography is one of the three humanities subjects that count.'
    },
    // Stored: checked for 2026 entry on 2026-02-16. Degree stored as "Bachelor of Science (BSc)".
    {
      id: 'cmlp0lsb900557mafn23y9nz3',
      status: 'current',
      name: 'Human Movement and Sport Sciences',
      description:
        'This program comprises one main discipline (Major) and one secondary discipline (Minor). Human movement and sport sciences are naturally multifaceted, addressing phenomena that are not only biological but also physiological, psychological, social, historical, and economic. Admission requires passing a physical education exam.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 32,
      programUrl:
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/sciences-du-mouvement-et-du-sport.html',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unil.ch/files/live/sites/unil/files/04-etudier/0400-immatriculations/02-bachelor-diplome-etranger/tableau-des-pays-en.pdf',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/immatriculations-et-inscriptions/bachelor-avec-diplome-etranger.html',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/sciences-du-mouvement-et-du-sport.html'
      ],
      notes:
        'UNIL\'s list of requirements by country ("Academic year 2026/2027"; the admissions page says it "is only valid for the academic year 2026-2027") and swissuniversities\' IB list (2026/27): 32 points out of 42, not counting bonus points (stored as published); three subjects at HL and three at SL covering the six general education subjects, one from each category (first language, second language, mathematics, one of Biology, Chemistry or Physics, one of Geography, History or Economics/Business Management, an elective), with Mathematics or an experimental science at HL. UNIL does not recognise Psychology, Global Politics, Social and Cultural Anthropology, World Religions, Design Technology, SEHS, ESS, Literature and Performance or the arts. No subject grade is named, so 4. UNIL sets no programme-specific IB subjects: its programme pages and HEC Lausanne refer to the admissions service. Plus UNIL\'s French exam unless French is the mother tongue or language of instruction or an exemption applies. The stored Biology or SEHS SL row had no source, and UNIL does not recognise SEHS. A preliminary examination of physical skills comes first.'
    },
    // Stored: checked for 2026 entry on 2026-02-16. Degree stored as "Bachelor of Law (BLaw)".
    {
      id: 'cmlp0llas00197mafcq74jwnh',
      status: 'current',
      name: 'Law',
      description:
        'This program focuses on Swiss positive law (private, public, criminal, etc.) and its interactions with international and European law. It also develops analytical skills through the perspectives of history, philosophy, and sociology of law, preparing students for a wide range of legal careers.',
      field: 'Law',
      degree: 'Bachelor of Laws',
      duration: '3 years',
      minIBPoints: 32,
      programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/droit.html',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unil.ch/files/live/sites/unil/files/04-etudier/0400-immatriculations/02-bachelor-diplome-etranger/tableau-des-pays-en.pdf',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/immatriculations-et-inscriptions/bachelor-avec-diplome-etranger.html',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/droit.html'
      ],
      notes:
        'UNIL\'s list of requirements by country ("Academic year 2026/2027"; the admissions page says it "is only valid for the academic year 2026-2027") and swissuniversities\' IB list (2026/27): 32 points out of 42, not counting bonus points (stored as published); three subjects at HL and three at SL covering the six general education subjects, one from each category (first language, second language, mathematics, one of Biology, Chemistry or Physics, one of Geography, History or Economics/Business Management, an elective), with Mathematics or an experimental science at HL. UNIL does not recognise Psychology, Global Politics, Social and Cultural Anthropology, World Religions, Design Technology, SEHS, ESS, Literature and Performance or the arts. No subject grade is named, so 4. UNIL sets no programme-specific IB subjects: its programme pages and HEC Lausanne refer to the admissions service. Plus UNIL\'s French exam unless French is the mother tongue or language of instruction or an exemption applies.'
    },
    // Stored: checked for 2026 entry on 2026-02-16. Degree stored as "Bachelor of Science (BSc)".
    {
      id: 'cmlp0ln8i002b7maf1kuahlus',
      status: 'current',
      name: 'Management',
      description:
        'Offered by HEC Lausanne, this bilingual (French/English) program emphasizes a scientific and quantitative approach to management. It covers fields such as marketing, strategy, business analytics, and organizational behavior, combining theory with practical application.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 32,
      programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/management.html',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unil.ch/files/live/sites/unil/files/04-etudier/0400-immatriculations/02-bachelor-diplome-etranger/tableau-des-pays-en.pdf',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/immatriculations-et-inscriptions/bachelor-avec-diplome-etranger.html',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/management.html'
      ],
      notes:
        'UNIL\'s list of requirements by country ("Academic year 2026/2027"; the admissions page says it "is only valid for the academic year 2026-2027") and swissuniversities\' IB list (2026/27): 32 points out of 42, not counting bonus points (stored as published); three subjects at HL and three at SL covering the six general education subjects, one from each category (first language, second language, mathematics, one of Biology, Chemistry or Physics, one of Geography, History or Economics/Business Management, an elective), with Mathematics or an experimental science at HL. UNIL does not recognise Psychology, Global Politics, Social and Cultural Anthropology, World Religions, Design Technology, SEHS, ESS, Literature and Performance or the arts. No subject grade is named, so 4. UNIL sets no programme-specific IB subjects: its programme pages and HEC Lausanne refer to the admissions service. Plus UNIL\'s French exam unless French is the mother tongue or language of instruction or an exemption applies. The stored Maths HL 5 and Economics or Business Management rows had no source; maths is required at SL (or at HL as the HL science). Taught in French and English.'
    },
    // Stored: checked for 2026 entry on 2026-02-16. Degree stored as "Bachelor of Medicine (BMed)".
    {
      id: 'cmlp0lk2z000l7maf6sqdumwj',
      status: 'current',
      name: 'Medicine',
      description:
        "The medical course is a six-year path divided into Bachelor's and Master's stages. The first two years cover basic scientific disciplines such as chemistry, physics, and histology. The third year shifts toward clinical management of frequent illnesses. Admission is competitive with limited places, and only Swiss citizens and residents are admitted.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Medicine',
      duration: '3 years',
      minIBPoints: 32,
      programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/medecine.html',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unil.ch/files/live/sites/unil/files/04-etudier/0400-immatriculations/02-bachelor-diplome-etranger/tableau-des-pays-en.pdf',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/immatriculations-et-inscriptions/bachelor-avec-diplome-etranger.html',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/medecine.html',
        'https://www.swissuniversities.ch/en/service/applying-to-medical-school'
      ],
      notes:
        'UNIL\'s list of requirements by country ("Academic year 2026/2027"; the admissions page says it "is only valid for the academic year 2026-2027") and swissuniversities\' IB list (2026/27): 32 points out of 42, not counting bonus points (stored as published); three subjects at HL and three at SL covering the six general education subjects, one from each category (first language, second language, mathematics, one of Biology, Chemistry or Physics, one of Geography, History or Economics/Business Management, an elective), with Mathematics or an experimental science at HL. UNIL does not recognise Psychology, Global Politics, Social and Cultural Anthropology, World Religions, Design Technology, SEHS, ESS, Literature and Performance or the arts. No subject grade is named, so 4. UNIL sets no programme-specific IB subjects: its programme pages and HEC Lausanne refer to the admissions service. Plus UNIL\'s French exam unless French is the mother tongue or language of instruction or an exemption applies. The stored rows (a science and maths, both at HL 5) had no source: one of them at HL is required. Special admission conditions apply to foreign candidates throughout Switzerland (swissuniversities: without Swiss citizenship or a Swiss residence permit, no admission to medicine); registration with swissuniversities before 15 February; a competitive examination at the end of the first year. The description says so at the owner\'s request (content 4.7).'
    },
    // Stored: checked for 2026 entry on 2026-02-16. Degree stored as "Bachelor of Science (BSc)".
    {
      id: 'cmlp0lkq7000x7mafqp17p9xd',
      status: 'current',
      name: 'Pharmaceutical Sciences',
      description:
        'The Bachelor of Science in Pharmaceutical Sciences provides foundational training in chemistry, biology, and pharmacology. Only the first year is taught at UNIL; after passing first-year examinations, students typically continue their studies at the University of Geneva, ETH Zurich, or the University of Basel.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 32,
      programUrl:
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/sciences-pharmaceutiques.html',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unil.ch/files/live/sites/unil/files/04-etudier/0400-immatriculations/02-bachelor-diplome-etranger/tableau-des-pays-en.pdf',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/immatriculations-et-inscriptions/bachelor-avec-diplome-etranger.html',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/sciences-pharmaceutiques.html'
      ],
      notes:
        'UNIL\'s list of requirements by country ("Academic year 2026/2027"; the admissions page says it "is only valid for the academic year 2026-2027") and swissuniversities\' IB list (2026/27): 32 points out of 42, not counting bonus points (stored as published); three subjects at HL and three at SL covering the six general education subjects, one from each category (first language, second language, mathematics, one of Biology, Chemistry or Physics, one of Geography, History or Economics/Business Management, an elective), with Mathematics or an experimental science at HL. UNIL does not recognise Psychology, Global Politics, Social and Cultural Anthropology, World Religions, Design Technology, SEHS, ESS, Literature and Performance or the arts. No subject grade is named, so 4. UNIL sets no programme-specific IB subjects: its programme pages and HEC Lausanne refer to the admissions service. Plus UNIL\'s French exam unless French is the mother tongue or language of instruction or an exemption applies. The stored rows (a science and maths, both at HL 5) had no source. After the first year at UNIL the degree continues, in principle, at the University of Geneva.'
    },
    // Stored: checked for 2026 entry on 2026-02-16. Degree stored as "Bachelor of Arts (BA)".
    {
      id: 'cmlp0lq33003v7mafu9jmj8c3',
      status: 'current',
      name: 'Political Science',
      description:
        'The Bachelor of Arts in Political Science aims to provide solid training necessary for understanding political phenomena. Areas taught include history of political ideas, public policies, comparative political science, political sociology, international relations, and studies focused on developing countries.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 32,
      programUrl:
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/science-politique.html',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unil.ch/files/live/sites/unil/files/04-etudier/0400-immatriculations/02-bachelor-diplome-etranger/tableau-des-pays-en.pdf',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/immatriculations-et-inscriptions/bachelor-avec-diplome-etranger.html',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/science-politique.html'
      ],
      notes:
        'UNIL\'s list of requirements by country ("Academic year 2026/2027"; the admissions page says it "is only valid for the academic year 2026-2027") and swissuniversities\' IB list (2026/27): 32 points out of 42, not counting bonus points (stored as published); three subjects at HL and three at SL covering the six general education subjects, one from each category (first language, second language, mathematics, one of Biology, Chemistry or Physics, one of Geography, History or Economics/Business Management, an elective), with Mathematics or an experimental science at HL. UNIL does not recognise Psychology, Global Politics, Social and Cultural Anthropology, World Religions, Design Technology, SEHS, ESS, Literature and Performance or the arts. No subject grade is named, so 4. UNIL sets no programme-specific IB subjects: its programme pages and HEC Lausanne refer to the admissions service. Plus UNIL\'s French exam unless French is the mother tongue or language of instruction or an exemption applies. The stored humanities row included Global Politics, which UNIL does not recognise; it is now Geography, History, Economics or Business Management.'
    },
    // Stored: checked for 2026 entry on 2026-02-16. Degree stored as "Bachelor of Science (BSc)".
    {
      id: 'cmlp0lrmg004r7mafza5nz5d9',
      status: 'current',
      name: 'Psychology',
      description:
        'Psychology is the science of behaviour and mental processes, whether individual or social, taking various determinants (biological, contextual, social, cultural, etc.) into account. The course covers development, cognitive functions, psychopathology, health psychology, and behavioral neurosciences.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 32,
      programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/psychologie.html',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unil.ch/files/live/sites/unil/files/04-etudier/0400-immatriculations/02-bachelor-diplome-etranger/tableau-des-pays-en.pdf',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/immatriculations-et-inscriptions/bachelor-avec-diplome-etranger.html',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/psychologie.html'
      ],
      notes:
        'UNIL\'s list of requirements by country ("Academic year 2026/2027"; the admissions page says it "is only valid for the academic year 2026-2027") and swissuniversities\' IB list (2026/27): 32 points out of 42, not counting bonus points (stored as published); three subjects at HL and three at SL covering the six general education subjects, one from each category (first language, second language, mathematics, one of Biology, Chemistry or Physics, one of Geography, History or Economics/Business Management, an elective), with Mathematics or an experimental science at HL. UNIL does not recognise Psychology, Global Politics, Social and Cultural Anthropology, World Religions, Design Technology, SEHS, ESS, Literature and Performance or the arts. No subject grade is named, so 4. UNIL sets no programme-specific IB subjects: its programme pages and HEC Lausanne refer to the admissions service. Plus UNIL\'s French exam unless French is the mother tongue or language of instruction or an exemption applies. The stored Psychology SL row had no source, and UNIL does not recognise Psychology as an IB subject.'
    },
    // Stored: checked for 2026 entry on 2026-02-16. Degree stored as "Bachelor of Arts (BA)".
    {
      id: 'cmlp0lqx1004f7maf9hqsjmk6',
      status: 'current',
      name: 'Social Sciences',
      description:
        'The Bachelor of Arts in Social Sciences provides solid training necessary for understanding and analyzing social and cultural phenomena. The degree course follows a largely interdisciplinary approach and strives to explain both the general functioning of societies and their diversity.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 32,
      programUrl:
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/sciences-sociales.html',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unil.ch/files/live/sites/unil/files/04-etudier/0400-immatriculations/02-bachelor-diplome-etranger/tableau-des-pays-en.pdf',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/immatriculations-et-inscriptions/bachelor-avec-diplome-etranger.html',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/sciences-sociales.html'
      ],
      notes:
        'UNIL\'s list of requirements by country ("Academic year 2026/2027"; the admissions page says it "is only valid for the academic year 2026-2027") and swissuniversities\' IB list (2026/27): 32 points out of 42, not counting bonus points (stored as published); three subjects at HL and three at SL covering the six general education subjects, one from each category (first language, second language, mathematics, one of Biology, Chemistry or Physics, one of Geography, History or Economics/Business Management, an elective), with Mathematics or an experimental science at HL. UNIL does not recognise Psychology, Global Politics, Social and Cultural Anthropology, World Religions, Design Technology, SEHS, ESS, Literature and Performance or the arts. No subject grade is named, so 4. UNIL sets no programme-specific IB subjects: its programme pages and HEC Lausanne refer to the admissions service. Plus UNIL\'s French exam unless French is the mother tongue or language of instruction or an exemption applies.'
    },
    // Stored: checked for 2026 entry on 2026-02-16. Degree stored as "Bachelor of Arts (BA)".
    {
      id: 'cmlp0lpj2003j7maf4ugzteig',
      status: 'current',
      name: 'Study of Religions',
      description:
        'The main aim of this programme is to develop precise and critical knowledge of the phenomenon of religion in general, and in particular the great religious traditions (Hinduism, Judaism, Christianity, Islam, etc.) as well as more marginal religious currents. The methods used are mainly those of the human and social sciences.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 32,
      programUrl:
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/sciences-des-religions.html',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unil.ch/files/live/sites/unil/files/04-etudier/0400-immatriculations/02-bachelor-diplome-etranger/tableau-des-pays-en.pdf',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/immatriculations-et-inscriptions/bachelor-avec-diplome-etranger.html',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/sciences-des-religions.html'
      ],
      notes:
        'UNIL\'s list of requirements by country ("Academic year 2026/2027"; the admissions page says it "is only valid for the academic year 2026-2027") and swissuniversities\' IB list (2026/27): 32 points out of 42, not counting bonus points (stored as published); three subjects at HL and three at SL covering the six general education subjects, one from each category (first language, second language, mathematics, one of Biology, Chemistry or Physics, one of Geography, History or Economics/Business Management, an elective), with Mathematics or an experimental science at HL. UNIL does not recognise Psychology, Global Politics, Social and Cultural Anthropology, World Religions, Design Technology, SEHS, ESS, Literature and Performance or the arts. No subject grade is named, so 4. UNIL sets no programme-specific IB subjects: its programme pages and HEC Lausanne refer to the admissions service. Plus UNIL\'s French exam unless French is the mother tongue or language of instruction or an exemption applies.'
    },
    // Stored: checked for 2026 entry on 2026-02-16. Degree stored as "Bachelor of Theology (BTh)".
    {
      id: 'cmlp0lown00377maf8zni7xh2',
      status: 'current',
      name: 'Theology',
      description:
        'The main purpose of studying theology is to develop a detailed, critical understanding of fundamental Christian texts, the Christian tradition and various historical, philosophical, theological and ethical currents of thought, as well as contemporary expressions of Christianity.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Theology',
      duration: '3 years',
      minIBPoints: 32,
      programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/theologie.html',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 4,
          critical: true
        },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['BUS-MGMT', 'ECON', 'GEOG', 'HIST'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.unil.ch/files/live/sites/unil/files/04-etudier/0400-immatriculations/02-bachelor-diplome-etranger/tableau-des-pays-en.pdf',
        'https://www.swissuniversities.ch/en/themen/zulassung/zulassung-universitaere-hochschulen/international-baccalaureate',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/immatriculations-et-inscriptions/bachelor-avec-diplome-etranger.html',
        'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/theologie.html'
      ],
      notes:
        'UNIL\'s list of requirements by country ("Academic year 2026/2027"; the admissions page says it "is only valid for the academic year 2026-2027") and swissuniversities\' IB list (2026/27): 32 points out of 42, not counting bonus points (stored as published); three subjects at HL and three at SL covering the six general education subjects, one from each category (first language, second language, mathematics, one of Biology, Chemistry or Physics, one of Geography, History or Economics/Business Management, an elective), with Mathematics or an experimental science at HL. UNIL does not recognise Psychology, Global Politics, Social and Cultural Anthropology, World Religions, Design Technology, SEHS, ESS, Literature and Performance or the arts. No subject grade is named, so 4. UNIL sets no programme-specific IB subjects: its programme pages and HEC Lausanne refer to the admissions service. Plus UNIL\'s French exam unless French is the mother tongue or language of instruction or an exemption applies.'
    }
  ]
}

export default refresh
