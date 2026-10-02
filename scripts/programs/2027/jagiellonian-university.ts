import type { RefreshFile } from '../lib/refresh'

/**
 * Jagiellonian University: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts jagiellonian-university
 */
const refresh: RefreshFile = {
  university: 'Jagiellonian University',
  entryYear: 2027,
  checkedOn: '2026-10-02',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmkx2gn94000ale04wqssoj5e',
      status: 'current',
      name: 'Dentistry, Program in English (long-cycle)',
      description:
        'The 5-year long Dentistry, Program in English lasts 10 semesters and includes over 5000 class hours and 300 ECTS points. Within the course of studies students receive knowledge in the field of basic sciences as well as clinical disciplines that enables graduates to take up practice as dentists. Retaining the medical character of the programme whilst orienting it to the professional dental fields is of great importance. Teaching is conducted exclusively in English, using information technology with reference to both the circulation of medical documentation and logistics of the patients of the University Dental Clinic, as well as to managing the didactic procedures carried out by the Chair of Dentistry of the Faculty of Medicine of the JU MC.',
      field: 'Medicine & Health',
      degree: "Single-Cycle Master's Degree",
      duration: '5 years',
      minIBPoints: 33,
      programUrl: 'https://studia.uj.edu.pl/en_GB/kierunki/wlek/dentistry',
      requirements: [
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://bip.uj.edu.pl/documents/1384597/161027332/uchw_nr_62_2026.pdf',
        'https://bip.uj.edu.pl/documents/1384597/161027656/zal3uchw62.pdf',
        'https://studia.uj.edu.pl/en_GB/kierunki/wlek/dentistry'
      ],
      notes:
        'Content 4.8: Jagiellonian Senate Resolution 62/V/2026 (27 May 2026), Attachment 3, sets 2027/2028 admission to the School of Medicine in English. Formal conditions: an English certificate (IELTS 6.5, TOEFL iBT 87 or CAE; the IB is not listed), a school-leaving document that gives access to university, and completed school courses in Chemistry and in Biology or Physics, shown with a grade. Ranking is 0-100 on a written entrance exam in English, "Reasoning and Critical Thinking in Premedical Sciences". No grade or level is named for the courses, so they are stored at SL 4 (the stored HL 4 Biology and Chemistry rows had no source, and Biology alone is not required: Physics can replace it). Dentistry: up to 20 places (at least 15). 5 years. No IB points figure is published: the stored points are kept, unverified. Long-cycle master\'s (jednolite studia magisterskie).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkx2ix3c000hle04p37razo2',
      status: 'current',
      name: 'Earth Sciences in a Changing World (BA)',
      description:
        'Earth Sciences in a Changing World is an undergraduate interdisciplinary programme that offers a rigorous international and comparative perspective on the contemporary global system. Its mission is to foster creative thinking about complex global problems and to equip students with the analytical tools and cross-cultural understanding to guide them in that process. \n\nThe main goal of the programme is to provide basic knowledge in geography, geology and anthropogenic transformations in the environment and their impact on the lives of local communities and global change. Students gain the ability to observe and interpret phenomena and conduct basic analytical work both individually and teamwork. They also develop adaptability to changing socio-economic environment, civic responsibility and independence.',
      field: 'Natural Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 28,
      programUrl: 'https://studia.uj.edu.pl/en_GB/kierunki/wgig/earth.scie.chan.worl',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bip.uj.edu.pl/documents/1384597/161027332/uchw_nr_62_2026.pdf',
        'https://bip.uj.edu.pl/documents/1384597/161027656/zal5uchw62.pdf',
        'https://bip.uj.edu.pl/documents/1384597/161027656/zal2uchw62.pdf',
        'https://studia.uj.edu.pl/en_GB/kierunki/wgig/earth.scie.chan.worl'
      ],
      notes:
        'Content 4.8: Jagiellonian Senate Resolution 62/V/2026 (27 May 2026) sets admission for 2027/2028. Attachment 5: candidates without Polish citizenship are ranked 100% on an interview in English assessing their aptitude for the programme; Polish citizens on matura subjects, which Attachment 2 maps to IB subjects. Earth Sciences in a Changing World (Faculty of Geography and Geology): interview (G1), with documented English at B2 as an extra formal condition (JA). Checked, none required: no school subject is named for foreign candidates (the stored English row is removed; English B2 proof is checked at enrolment, and the IB Diploma counts for its language of instruction). No IB points figure is published: the stored 28 is kept, unverified. Licencjat (first-cycle, 3 years).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkx2t3070016le04jrw8jdoc',
      status: 'current',
      name: 'East European Studies: Languages and Discourses (BA)',
      description:
        'The first-cycle programme—East European Studies: Languages and Discourses—is meticulously crafted to provide students with a comprehensive understanding of Eastern Europe, a region pivotal to global political and economic stability. Renowned for its political, cultural, linguistic, and religious diversity, Eastern Europe has witnessed a multitude of historical and contemporary conflicts, including the ongoing war in Ukraine.\n\nThe programme is dedicated to equipping students with a profound understanding of the cultural underpinnings of these conflicts and nuanced knowledge of the specific cultural characteristics of individual countries. In doing so, it furnishes them with indispensable intercultural competencies crucial for careers in business, administration, journalism, or the non-governmental sector.\n\nThe programme offers intensive training in two foreign languages—Russian, Ukrainian, or Polish—culminating in B2+ proficiency in the primary language selected and B1+ in the secondary, as per the Common European Framework of Reference for Languages (CEFR). Furthermore, it empowers students to explore a diverse array of discourses, encompassing political, legal, literary, religious ones, and those pertaining to collective memory, thereby providing valuable insights into the operational dynamics of their chosen languages within specific communicative contexts.\n\nDelivered entirely in English by a faculty of seasoned professors from Jagiellonian University, who are esteemed specialists in the languages, cultures, literatures, and contemporary issues of Eastern European countries, the program includes mandatory courses covering the history of Eastern Europe, basic linguistics, discourse studies, and memory studies. Additionally, offering a broad selection of optional courses, the program grants students the autonomy to tailor their educational journey according to their interests.',
      field: 'Arts & Humanities',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 28,
      programUrl: 'https://studia.uj.edu.pl/en_GB/kierunki/wfilg/east.euro.stud',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bip.uj.edu.pl/documents/1384597/161027332/uchw_nr_62_2026.pdf',
        'https://bip.uj.edu.pl/documents/1384597/161027656/zal5uchw62.pdf',
        'https://bip.uj.edu.pl/documents/1384597/161027656/zal2uchw62.pdf',
        'https://studia.uj.edu.pl/en_GB/kierunki/wfilg/east.euro.stud'
      ],
      notes:
        'Content 4.8: Jagiellonian Senate Resolution 62/V/2026 (27 May 2026) sets admission for 2027/2028. Attachment 5: candidates without Polish citizenship are ranked 100% on an interview in English assessing their aptitude for the programme; Polish citizens on matura subjects, which Attachment 2 maps to IB subjects. East European Studies: Languages and Discourses (Faculty of Philology): interview (D5), with documented English at B2 as an extra formal condition (JA). Checked, none required: no school subject is named for foreign candidates (the stored English row is removed; English B2 proof is checked at enrolment, and the IB Diploma counts for its language of instruction). No IB points figure is published: the stored 28 is kept, unverified. Licencjat (first-cycle, 3 years).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkx2rfhl0011le04e5plk3f6',
      status: 'current',
      name: 'European Studies (BA)',
      description:
        'First-cycle programme (equivalent of BA programme) in European Studies gives students core knowledge of European politics, culture and society, whilst emphasizing Europe’s role in a wider global framework. Key concepts, such as culture, identity, diversity, democratic processes, Europeanisation and globalization are discussed in an interdisciplinary manner. \n\nTackling with European affairs through a sociological, political and economic lens, students gain a cross-sectional awareness of the many challenges contemporary societies are facing. The programme equips students with tools to analyse current events and understand the complexities of political and socio-economic phenomena, moreover prepares students for further education in the field of international relations.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 28,
      programUrl: 'https://studia.uj.edu.pl/en_GB/kierunki/wsmip/europe.stud',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bip.uj.edu.pl/documents/1384597/161027332/uchw_nr_62_2026.pdf',
        'https://bip.uj.edu.pl/documents/1384597/161027656/zal5uchw62.pdf',
        'https://bip.uj.edu.pl/documents/1384597/161027656/zal2uchw62.pdf',
        'https://studia.uj.edu.pl/en_GB/kierunki/wsmip/europe.stud'
      ],
      notes:
        'Content 4.8: Jagiellonian Senate Resolution 62/V/2026 (27 May 2026) sets admission for 2027/2028. Attachment 5: candidates without Polish citizenship are ranked 100% on an interview in English assessing their aptitude for the programme; Polish citizens on matura subjects, which Attachment 2 maps to IB subjects. European Studies (Faculty of International and Political Studies): interview in English (L2) for foreign candidates; in 2026/27 it was the whole result. Checked, none required: no school subject is named for foreign candidates (the stored English row is removed; English B2 proof is checked at enrolment, and the IB Diploma counts for its language of instruction). No IB points figure is published: the stored 28 is kept, unverified. Licencjat (first-cycle, 3 years).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkx2pnxr000wle04jxa2uu9k',
      status: 'current',
      name: 'Global and Development Studies (GLAD) (BA)',
      description:
        "Global and Development Studies (GLAD) is an interdisciplinary programme, which aims to equip students with fundamental understanding of processes of globalisation in various spheres of human activity: law, politics, economy, history, the social relations, culture and communication. \n\nStudents gain core knowledge of the very phenomena of globalisation and international development as well as specialise in their various aspects and influence they have on the contemporary world. The programme is structured in such a away that allows students to focus either on a selected part of the world, or specific global problems and challenges.\n\nInformation regarding Faculty\nThe Faculty of International and Political Studies has the category A granted by the Ministry of Science and Higher Education and was honored for education by the Polish Accreditation Committee. This Faculty is the most international and interdisciplinary unit at the Jagiellonian University. Its offer includes unique courses in English, many of which are implemented under agreements with foreign universities. The Faculty allows you to study in a nationally and culturally diverse environment, both in Polish and foreign languages. It promotes mutual getting to know each other and translates into development perspectives in the field of further studies or professional work. The Faculty has an extensive structure, reflecting the diversity of scientific research carried out there, which allows you to study with a group of specialists dealing with almost every corner of the world.\n\nThe principal seat of the Faculty of International and Political Studies is a modern building to which the Faculty moved in 2021. \nThere are four large auditoriums on eight floors, several dozen lecture and seminar rooms, a student zone, and rooms for employees. \n\nThe building also houses a departmental library with a spacious reading room. The Faculty has created comfortable conditions for studying near the Jagiellonian Library, surrounded by green areas like Kraków's Błonia and Jordan Park.",
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 28,
      programUrl: 'https://studia.uj.edu.pl/en_GB/kierunki/wsmip/global.deve.stud',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bip.uj.edu.pl/documents/1384597/161027332/uchw_nr_62_2026.pdf',
        'https://bip.uj.edu.pl/documents/1384597/161027656/zal5uchw62.pdf',
        'https://bip.uj.edu.pl/documents/1384597/161027656/zal2uchw62.pdf',
        'https://studia.uj.edu.pl/en_GB/kierunki/wsmip/global.deve.stud'
      ],
      notes:
        'Content 4.8: Jagiellonian Senate Resolution 62/V/2026 (27 May 2026) sets admission for 2027/2028. Attachment 5: candidates without Polish citizenship are ranked 100% on an interview in English assessing their aptitude for the programme; Polish citizens on matura subjects, which Attachment 2 maps to IB subjects. Global and Development Studies (Faculty of International and Political Studies): interview in English (L2). Checked, none required: no school subject is named for foreign candidates (the stored English row is removed; English B2 proof is checked at enrolment, and the IB Diploma counts for its language of instruction). No IB points figure is published: the stored 28 is kept, unverified. Licencjat (first-cycle, 3 years).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkx2ne0e000rle04756mnnql',
      status: 'current',
      name: 'International Relations and Area Studies (IRAS) (BA)',
      description:
        'International Relations and Area Studies programme is an undergraduate interdisciplinary programme that offers a rigorous international and comparative perspective on the contemporary global system and different regions of the world. Its aim is to foster creative thinking about complex global problems and to equip students with the analytical tools, language expertise, and cross-cultural understanding to guide them in that process. \n\nOur degree provides a solid grounding in international issues together with an opportunity to specialise in International Security or Area Studies. Research and teaching spans the full spectrum of topics in International Relations and Area Studies, including international politics and economics, development, global governance, ethics of international affairs, conflict resolution and peace building, regional integration, cultural diversity and intercultural dialogue.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 28,
      programUrl: 'https://studia.uj.edu.pl/en_GB/kierunki/wsmip/intern.rela.area.stud',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bip.uj.edu.pl/documents/1384597/161027332/uchw_nr_62_2026.pdf',
        'https://bip.uj.edu.pl/documents/1384597/161027656/zal5uchw62.pdf',
        'https://bip.uj.edu.pl/documents/1384597/161027656/zal2uchw62.pdf',
        'https://studia.uj.edu.pl/en_GB/kierunki/wsmip/intern.rela.area.stud'
      ],
      notes:
        'Content 4.8: Jagiellonian Senate Resolution 62/V/2026 (27 May 2026) sets admission for 2027/2028. Attachment 5: candidates without Polish citizenship are ranked 100% on an interview in English assessing their aptitude for the programme; Polish citizens on matura subjects, which Attachment 2 maps to IB subjects. International Relations and Area Studies (Faculty of International and Political Studies): interview in English (L2). Checked, none required: no school subject is named for foreign candidates (the stored English row is removed; English B2 proof is checked at enrolment, and the IB Diploma counts for its language of instruction). No IB points figure is published: the stored 28 is kept, unverified. Licencjat (first-cycle, 3 years).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkx2bujc0001le045nopml0m',
      status: 'current',
      name: 'Medicine, Program in English (long-cycle)',
      description:
        'The 6-year Medicine, Program in English is in compliance with European teaching standards. Candidates for this programme should be graduating from secondary school and excel in biology and chemistry. During six academic years pre-clinical and clinical courses are taught. The first part of the curriculum covers basic science courses. Students also have a medical Polish course to prepare them to communicate with patients. The second part of the curriculum covers clinical courses. On completion of the sixth year students are familiar with all clinical specialties.',
      field: 'Medicine & Health',
      degree: "Single-Cycle Master's Degree",
      duration: '6 years',
      minIBPoints: 34,
      programUrl: 'https://studia.uj.edu.pl/en_GB/kierunki/wlek/medicine',
      requirements: [
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://bip.uj.edu.pl/documents/1384597/161027332/uchw_nr_62_2026.pdf',
        'https://bip.uj.edu.pl/documents/1384597/161027656/zal3uchw62.pdf',
        'https://studia.uj.edu.pl/en_GB/kierunki/wlek/medicine'
      ],
      notes:
        'Content 4.8: Jagiellonian Senate Resolution 62/V/2026 (27 May 2026), Attachment 3, sets 2027/2028 admission to the School of Medicine in English. Formal conditions: an English certificate (IELTS 6.5, TOEFL iBT 87 or CAE; the IB is not listed), a school-leaving document that gives access to university, and completed school courses in Chemistry and in Biology or Physics, shown with a grade. Ranking is 0-100 on a written entrance exam in English, "Reasoning and Critical Thinking in Premedical Sciences". No grade or level is named for the courses, so they are stored at SL 4 (the stored HL 4 Biology and Chemistry rows had no source, and Biology alone is not required: Physics can replace it). Medicine: up to 120 places (at least 40). 6 years. No IB points figure is published: the stored points are kept, unverified. Long-cycle master\'s (jednolite studia magisterskie).'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkx2lgss000mle0416kla7a1',
      status: 'current',
      name: 'Una Europa Joint Bachelor in Sustainability (BASUS) (BA)',
      description:
        'Una Europa Joint Bachelor in Sustainability (BASUS) is an innovative interdisciplinary programme co-designed and co-taught by eight leading European universities, all members of the Una Europa alliance. The programme provides an extensive education on sustainability, its various complexities and the interdependence of divergent disciplines with the aim to equip its graduates with necessary tools to forge a better future and fill the growing niche on the market for professionals with a cross-cutting understanding of sustainable development.\n\nAll students of the programme will begin at the same starting university – Uniwersytet Jagielloński w Krakowie for the current edition of the programme – studying there during the entire first year of the programme. During these semesters, the students will take introductory courses, which will familiarise them with the core concepts and frameworks of sustainability, as well as transversal courses, which will equip them with core academic skills and competencies.\n\nThen, starting with the second year, the students will follow one of the six three-semester-long specialisation tracks, each coordinated by one of the degree-awarding partners of the programme. The tracks are:\n\nSustainable Chemistry & Physics (coordinated by Helsingin yliopisto/Helsingfors universitet)\nEconomy & Geography (coordinated by Université Paris 1 Panthéon-Sorbonne)\nLaw & Politics of Sustainability (coordinated by Uniwersytet Jagielloński w Krakowie)\nEnvironmental & Life Sciences (coordinated by Universidad Complutense de Madrid)\nEconomics, Management & Engineering (coordinated by KU Leuven)\nSocial Sciences & Humanities (coordinated by the Universität Zürich)\nDuring the last semester of the programme, the students can engage in optional mobility and apply to study at one of the eight universities associated with the programme, which includes the six abovementioned degree-awarding partners and two mobility partners, the University of Edinburgh and Freie Universität Berlin. Being a joint programme means that the students will be formally enrolled at all of the degree-awarding partners and upon graduation, will be awarded a single, joint diploma.',
      field: 'Environmental Studies',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 30,
      programUrl: 'https://studia.uj.edu.pl/en_GB/kierunki/wpia/basus.una.europa',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bip.uj.edu.pl/documents/1384597/161027332/uchw_nr_62_2026.pdf',
        'https://bip.uj.edu.pl/documents/1384597/161027656/zal4uchw62.pdf',
        'https://studia.uj.edu.pl/en_GB/kierunki/wpia/basus.una.europa'
      ],
      notes:
        "Content 4.8: Jagiellonian Senate Resolution 62/V/2026 (27 May 2026), Attachment 4, sets 2027/2028 admission to the Una Europa Joint Bachelor in Sustainability, for Polish and foreign candidates alike. Formal condition: an English certificate (TOEFL iBT 90, IELTS Academic 6.5, Cambridge CAE/CPE 176, PTE Academic 59, ITACE C1 or C2, or a comparable state exam at B2 or above; the IB is not listed). Ranking is 0-100 on an entrance exam in English covering the programme's six tracks (sustainability law and policy, atmospheric chemistry and physics, social sciences and humanities, biological and environmental sciences, economics and management engineering, economics and geography). Up to 180 places. Checked, none required: no school subject is named (the stored English row is removed). No IB points figure is published: the stored 30 is kept, unverified."
    }
  ]
}

export default refresh
