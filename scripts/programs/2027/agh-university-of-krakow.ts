import type { RefreshFile } from '../lib/refresh'

/**
 * AGH University of Krakow: requirements for 2027 entry.
 *
 * Exported from the database on 2026-10-02 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts agh-university-of-krakow
 */
const refresh: RefreshFile = {
  university: 'AGH University of Krakow',
  entryYear: 2027,
  checkedOn: '2026-10-02',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmkwrckql0003ju04d1q7qp9p',
      status: 'current',
      name: 'Computer Physics',
      description:
        'A graduate in "Computer Physics" will possess necessary skills to work as a computer programmer, but will also be capable of participating in physics research. However, the latter will additionally require the second-cycle studies, such as for instance "Technical Physics" (Fizyka Techniczna) at the Faculty of Physics and Computer Science. A graduate can also pursue their education in the field of computer science, choosing for example "Applied Computer Science" (Informatyka Stosowana) at the Faculty of Physics and Applied Computer Science or other similar studies (e.g. "Data Science" at the Faculty of Computer Science, Electronics and Telecommunications). After graduating from the first-cycle studies the students will readily find satisfying jobs on the IT market. Furthermore, physicists with expertise in programming and computational methods may be a useful asset for companies dealing with simulations of industrial systems. \n\nBanks and insurance companies are also among potential employers, as they may profit from the graduates\' skills in the field of computer modelling.\n\nHow competitive: AGH ranks applicants on a recruitment index out of 1,000: twice the Mathematics result, six times a main subject (Mathematics, Physics, Chemistry or Computer Science) and twice a second (Mathematics or Physics), with each IB grade scaled so that a 7 counts 100 (the two subjects at HL; 300 is the minimum). In summer 2026 the threshold for this programme was 822 in the first qualification round (13 July) and between 541 and 750 in the four later ones, to 16 September.',
      field: 'Natural Sciences',
      degree: 'Bachelor',
      duration: '3.5 years',
      minIBPoints: 38,
      programUrl: 'https://sylabusy.agh.edu.pl/en/1/2/22/1/4/17/236',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://rekrutacja.agh.edu.pl/wp-content/uploads/2026/06/uchwala_2027_2028_warunki_rekrutacji.pdf',
        'https://www.international.agh.edu.pl/en/studies/recruitment/recruitment-rules-bachelor',
        'https://www.international.agh.edu.pl/en/studies/education-offer-bachelor-studies',
        'https://sylabusy.agh.edu.pl/en/1/2/22/1/4/17/236',
        'https://rekrutacja.agh.edu.pl/kierunki-studiow/'
      ],
      notes:
        'Content 4.8: AGH Senate Resolution 82/2026 (27 May 2026) sets admission for 2027/2028. Every first-cycle programme ranks on WR = 2M + 6P1 + 2P2 (plus achievement points), out of 1000, and admits only WR of 300 or more. For IB holders M is Mathematics (SL, or HL if only HL was taken) and P1 and P2 are the best HL results among the subjects Table 1 lists for the programme (not the same subject twice), each converted linearly to 0-100. Computer Physics (Faculty of Physics and Applied Computer Science): P1 = Mathematics, Physics, Chemistry or Computer Science; P2 = Mathematics or Physics. Checked, none strictly required: a missing subject scores zero and 300 can still be reached (the stored rows had no source and are removed). The IB Diploma exempts from the AGH maths exam and from NAWA recognition. AGH publishes no IB points figure: the stored 38 is kept, unverified (as for Gdańsk in 3.4). 7 semesters (3.5 years), first-cycle engineer (inżynier) degree; the URL is the 2026/2027 syllabus. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives AGH\'s summer 2026 thresholds for this programme (five qualification rounds, 13 July to 16 September 2026: 822, 750, 674, 662, 541) from its programme list\'s "Progi punktowe" tab, and the 2027/2028 resolution\'s index (WR = 2M + 6P1 + 2P2; IB grades converted by N = 30 + 70 (N0 - Nmin) / (Nmax - Nmin), so a 7 is 100); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkwrhmqd000cju04s7leut5i',
      status: 'current',
      name: 'Computer Science',
      description:
        'Computer Science studies are conducted by Faculty of Electrical Engineering, Automatics, Computer Science and Biomedical Engineering in cooperation with Faculty of Computer Science, Electronics and Telecommunications, Faculty of Physics and Applied Computer Science, and Faculty of Metals Engineering and Industrial Computer Science.\n\nThese studies aim to provide knowledge and skills necessary to create and use broadly understood computer systems. They cover both theoretical foundations in the areas of mathematics, physics, computer science, as well as practical aspects, including design and implementation of PC and mobile systems, software development (programming in various languages), systems administration, data analysis, use of programming tools (software libraries, frameworks, and environments), including commercial applications and open-source software. Upon completion of the first-cycle studies, a student acquires knowledge at the engineering level, which is extended by the practical use of this knowledge during student internship after the sixth semester.\n\nHow competitive: AGH ranks applicants on a recruitment index out of 1,000: twice the Mathematics result, six times a main subject (Mathematics, Physics, Computer Science or a foreign language) and twice a second (from the same list), with each IB grade scaled so that a 7 counts 100 (the two subjects at HL; 300 is the minimum). In summer 2026 the threshold for this programme was 832 in the first qualification round (13 July) and between 670 and 762 in the four later ones, to 16 September.',
      field: 'Computer Science',
      degree: 'Bachelor',
      duration: '3.5 years',
      minIBPoints: 38,
      programUrl: 'https://sylabusy.agh.edu.pl/en/1/2/22/1/4/16/104',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://rekrutacja.agh.edu.pl/wp-content/uploads/2026/06/uchwala_2027_2028_warunki_rekrutacji.pdf',
        'https://www.international.agh.edu.pl/en/studies/recruitment/recruitment-rules-bachelor',
        'https://www.international.agh.edu.pl/en/studies/education-offer-bachelor-studies',
        'https://sylabusy.agh.edu.pl/en/1/2/22/1/4/16/104',
        'https://rekrutacja.agh.edu.pl/kierunki-studiow/'
      ],
      notes:
        'Content 4.8: AGH Senate Resolution 82/2026 (27 May 2026) sets admission for 2027/2028. Every first-cycle programme ranks on WR = 2M + 6P1 + 2P2 (plus achievement points), out of 1000, and admits only WR of 300 or more. For IB holders M is Mathematics (SL, or HL if only HL was taken) and P1 and P2 are the best HL results among the subjects Table 1 lists for the programme (not the same subject twice), each converted linearly to 0-100. Computer Science: P1 and P2 each Mathematics, Physics, Computer Science or a foreign language. Checked, none strictly required: a missing subject scores zero and 300 can still be reached (the stored rows had no source and are removed). The IB Diploma exempts from the AGH maths exam and from NAWA recognition. AGH publishes no IB points figure: the stored 38 is kept, unverified (as for Gdańsk in 3.4). 7 semesters (3.5 years), first-cycle engineer (inżynier) degree; the URL is the 2026/2027 syllabus. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives AGH\'s summer 2026 thresholds for this programme (five qualification rounds, 13 July to 16 September 2026: 832, 744, 670, 762, 700) from its programme list\'s "Progi punktowe" tab, and the 2027/2028 resolution\'s index (WR = 2M + 6P1 + 2P2; IB grades converted by N = 30 + 70 (N0 - Nmin) / (Nmax - Nmin), so a 7 is 100); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkwrkqw6000lju04a0nm28qt',
      status: 'current',
      name: 'Computer Science for Embedded Systems',
      description:
        'A graduate of the Faculty of Electronics and Telecommunications has knowledge in the field of digital processing and analysis of signals, operating systems, virtualization, programming (Assembler, VHDL, C, C ++, Java, Python), creating web and network applications (also for mobile devices), simulation and design of analogue and digital electronic circuits, radio and fibre optic devices, programming of microprocessors and embedded systems, measurements and validation of devices in the real work environment, signal transmission techniques, Internet networks, mobile networks, Wi-Fi networks, operator networks, network organization and administration rules, communication protocols, traffic engineering, creating virtual networks and cloud computing, network devices (routers, switches, firewalls) and data security.\nA graduate of these studies can design electronic systems based on specialized analogue\nand digital integrated circuits, processors and programmable devices, design network systems designed for various transmission channels and types of data transferred, use measurement tools (arbitrary generators, oscilloscopes, protocol testers, spectrum analysers, measuring cards) and software tools in the process of building electronic and network devices, configure devices (routers, switches, firewalls, virtual networks) and communication protocols in local and wide telecommunications networks, carry out computer simulations of electronic circuits and services\nin networks, administrate computer networks and diagnose problems of their operation, implement algorithms and build own programs for mobile devices, embedded systems, create websites and network applications, lead projects with planned and agile methods.\nThe studies allow to undertake education at the second degree studies in the field of Electronics and Telecommunications on one of two diploma paths: Embedded Systems or Networks and Services. Graduates of this course successfully continue their education also in related fields such as ICT or Computer Science studies.\n\nHow competitive: AGH ranks applicants on a recruitment index out of 1,000: twice the Mathematics result, six times a main subject (Mathematics, Physics or Computer Science) and twice a second (Mathematics, Physics, Computer Science or a foreign language), with each IB grade scaled so that a 7 counts 100 (the two subjects at HL; 300 is the minimum). In summer 2026 the threshold for this programme was 808 in the first qualification round (13 July) and between 814 and 906 in the four later ones, to 16 September.',
      field: 'Computer Science',
      degree: 'Bachelor',
      duration: '3.5 years',
      minIBPoints: 38,
      programUrl: 'https://sylabusy.agh.edu.pl/en/1/2/22/1/4/4/56',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://rekrutacja.agh.edu.pl/wp-content/uploads/2026/06/uchwala_2027_2028_warunki_rekrutacji.pdf',
        'https://www.international.agh.edu.pl/en/studies/recruitment/recruitment-rules-bachelor',
        'https://www.international.agh.edu.pl/en/studies/education-offer-bachelor-studies',
        'https://sylabusy.agh.edu.pl/en/1/2/22/1/4/4/56',
        'https://rekrutacja.agh.edu.pl/kierunki-studiow/'
      ],
      notes:
        'Content 4.8: AGH Senate Resolution 82/2026 (27 May 2026) sets admission for 2027/2028. Every first-cycle programme ranks on WR = 2M + 6P1 + 2P2 (plus achievement points), out of 1000, and admits only WR of 300 or more. For IB holders M is Mathematics (SL, or HL if only HL was taken) and P1 and P2 are the best HL results among the subjects Table 1 lists for the programme (not the same subject twice), each converted linearly to 0-100. Computer Science for Embedded Systems: P1 = Mathematics, Physics or Computer Science; P2 = Mathematics, Physics, Computer Science or a foreign language. Checked, none strictly required: a missing subject scores zero and 300 can still be reached (the stored rows had no source and are removed). The IB Diploma exempts from the AGH maths exam and from NAWA recognition. AGH publishes no IB points figure: the stored 38 is kept, unverified (as for Gdańsk in 3.4). Renamed: AGH syllabus programme 56 (Faculty of Computer Science, Electronics and Telecommunications) is "Electronics and Telecommunications" for the 2025/2026 cycle and "Computer Science for Embedded Systems" from 2026/2027, and the English bachelor offer for 2026/2027 lists only the new name; the 2027/2028 resolution lists it too. 7 semesters (3.5 years), first-cycle engineer (inżynier) degree; the URL is the 2026/2027 syllabus. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives AGH\'s summer 2026 thresholds for this programme (five qualification rounds, 13 July to 16 September 2026: 808, 840, 832, 814, 906) from its programme list\'s "Progi punktowe" tab, and the 2027/2028 resolution\'s index (WR = 2M + 6P1 + 2P2; IB grades converted by N = 30 + 70 (N0 - Nmin) / (Nmax - Nmin), so a 7 is 100); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkwrndd2000uju04l56mbdsx',
      status: 'current',
      name: 'Mechanical Engineering',
      description:
        "The course Mechanical Engineering is a field of study where students learn modern engineering in a way that responds to the industry's current challenges. Graduates of the course are prepared to solve engineering problems in the field of mechanics. Based on the knowledge and skills acquired during their studies, they are able to design mechanical systems, taking into account issues such as the selection of materials, material strength, corrosion resistance, manufacturing technology etc. Depending on the solution, they can use ready-made components or design their own solutions. They also have the competencies necessary to function in modern technical and sociological systems.\nThat is why graduates of Mechanical Engineering are employed in renowned enterprises in the automotive industry as well as other well-known companies: Valeo, Delphi, BWI, Nidec, Teamtechnik: ABB, Vissman, Tauron, KGHM Polska Miedź, Sandvik, PZL. According to research by the Career Center, every year, over 91% of graduates find employment just a few months after graduation.\nThe course is constantly improved through substantive activities (conducting research, developing a laboratory base, implementing didactic projects in Poland and in international cooperation, and supporting the student scientific movement). The high level of education in the Mechanical Engineering field is evidenced by the fact that in the prestigious PERSPEKTYW ranking, this field of study has been the best field of study or one of the three best mechanical fields in Poland for many years.",
      field: 'Engineering',
      degree: 'Bachelor',
      duration: '3.5 years',
      minIBPoints: 38,
      programUrl: 'https://sylabusy.agh.edu.pl/en/1/2/22/1/4/5/253',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://rekrutacja.agh.edu.pl/wp-content/uploads/2026/06/uchwala_2027_2028_warunki_rekrutacji.pdf',
        'https://www.international.agh.edu.pl/en/studies/recruitment/recruitment-rules-bachelor',
        'https://www.international.agh.edu.pl/en/studies/education-offer-bachelor-studies',
        'https://sylabusy.agh.edu.pl/en/1/2/22/1/4/5/253'
      ],
      notes:
        'Content 4.8: AGH Senate Resolution 82/2026 (27 May 2026) sets admission for 2027/2028. Every first-cycle programme ranks on WR = 2M + 6P1 + 2P2 (plus achievement points), out of 1000, and admits only WR of 300 or more. For IB holders M is Mathematics (SL, or HL if only HL was taken) and P1 and P2 are the best HL results among the subjects Table 1 lists for the programme (not the same subject twice), each converted linearly to 0-100. Mechanical Engineering (Faculty of Mechanical Engineering and Robotics): P1 = Mathematics, Physics or Computer Science; P2 = Mathematics, Physics, Computer Science or a foreign language. Checked, none strictly required: a missing subject scores zero and 300 can still be reached (the stored rows had no source and are removed). The IB Diploma exempts from the AGH maths exam and from NAWA recognition. AGH publishes no IB points figure: the stored 38 is kept, unverified (as for Gdańsk in 3.4). 7 semesters (3.5 years), first-cycle engineer (inżynier) degree; the URL is the 2026/2027 syllabus.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkwrqarw0018ju04jvelvt3w',
      status: 'current',
      name: 'Mechatronic Engineering',
      description:
        'Mechatronic engineering is the interdisciplinary program composed of basic courses (e.g. mathematics, physics), major courses (e.g. mechanics, control theory, computer science, electronics) as well as of specialty courses. Contents of major and specialty courses comprise techniques of computer aided engineering, problems of virtual prototyping, elements of modern control and basics of robotics. Students learn about methods and tools for analysis and synthesis of mechatronic systems and integration in mechatronics. The aim of the Mechatronics engineering first cycle study program is to build the students’ engineering knowledge considered as theoretical background and practical engineering problems. The study comprises laboratory and project classes where students gather practical engineering skills. The study in Mechatronic engineering prepares to work in interdisciplinary teams that design, manufacture and/or utilize various mechatronic systems. The interdisciplinary knowledge helps the program graduates to communicate with other engineers in the course of solving the practical, complex engineering problems. The graduates of the program are prepared to work in: design units, research and development institutions as well as in companies that manufacture or use mechatronic devices. The graduates are also prepared to continue study at the Master level both at home University (Faculty of Mechanical Engineering and Robotics offers second level Mechatronic engineering program) and at other faculties or universities in Poland or abroad.\n\nHow competitive: AGH ranks applicants on a recruitment index out of 1,000: twice the Mathematics result, six times a main subject (Mathematics, Physics or Computer Science) and twice a second (Mathematics, Physics, Computer Science or a foreign language), with each IB grade scaled so that a 7 counts 100 (the two subjects at HL; 300 is the minimum). In summer 2026 the threshold for this programme was 820 in the first qualification round (13 July) and between 814 and 850 in the four later ones, to 16 September.',
      field: 'Engineering',
      degree: 'Bachelor',
      duration: '3.5 years',
      minIBPoints: 38,
      programUrl: 'https://sylabusy.agh.edu.pl/en/1/2/22/1/4/5/55',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://rekrutacja.agh.edu.pl/wp-content/uploads/2026/06/uchwala_2027_2028_warunki_rekrutacji.pdf',
        'https://www.international.agh.edu.pl/en/studies/recruitment/recruitment-rules-bachelor',
        'https://www.international.agh.edu.pl/en/studies/education-offer-bachelor-studies',
        'https://sylabusy.agh.edu.pl/en/1/2/22/1/4/5/55',
        'https://rekrutacja.agh.edu.pl/kierunki-studiow/'
      ],
      notes:
        'Content 4.8: AGH Senate Resolution 82/2026 (27 May 2026) sets admission for 2027/2028. Every first-cycle programme ranks on WR = 2M + 6P1 + 2P2 (plus achievement points), out of 1000, and admits only WR of 300 or more. For IB holders M is Mathematics (SL, or HL if only HL was taken) and P1 and P2 are the best HL results among the subjects Table 1 lists for the programme (not the same subject twice), each converted linearly to 0-100. Mechatronic Engineering (with English as the language of instruction): P1 = Mathematics, Physics or Computer Science; P2 = Mathematics, Physics, Computer Science or a foreign language. Checked, none strictly required: a missing subject scores zero and 300 can still be reached (the stored rows had no source and are removed). The IB Diploma exempts from the AGH maths exam and from NAWA recognition. AGH publishes no IB points figure: the stored 38 is kept, unverified (as for Gdańsk in 3.4). 7 semesters (3.5 years), first-cycle engineer (inżynier) degree; the URL is the 2026/2027 syllabus. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives AGH\'s summer 2026 thresholds for this programme (five qualification rounds, 13 July to 16 September 2026: 820, 814, 846, 850, 822) from its programme list\'s "Progi punktowe" tab, and the 2027/2028 resolution\'s index (WR = 2M + 6P1 + 2P2; IB grades converted by N = 30 + 70 (N0 - Nmin) / (Nmax - Nmin), so a 7 is 100); update it at each refresh.'
    }
  ]
}

export default refresh
