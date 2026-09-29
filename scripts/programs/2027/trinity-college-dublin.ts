import type { RefreshFile } from '../lib/refresh'

/**
 * Trinity College Dublin: requirements for 2027 entry.
 *
 * Exported from the database on 2026-09-29 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts trinity-college-dublin
 */
const refresh: RefreshFile = {
  university: 'Trinity College Dublin',
  entryYear: 2027,
  checkedOn: '2026-09-29',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "Bachelor in Acting".
    {
      id: 'cmkkx5s1c008n7m8p6n56cbm0',
      status: 'current',
      name: 'Acting',
      description:
        "This is a three-year, full-time, intensive honours degree for anyone who is serious about acting and wants to become an actor. The structure and contents of this degree have been designed in consultation with the Royal Academy of Dramatic Art (RADA) in London and consists of a practical skills-based course that enables students to learn by doing. The UK and Ireland's leading theatre practitioners form the core panel of teachers within The Lir Academy. Students will be taught in acting technique, voice, movement, and singing.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Acting',
      duration: '3 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/acting/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/acting/'
      ],
      notes:
        'Content 4.6: Bachelor in Acting, B.Histr. Honours Bachelor Degree, 3 years, taught at The Lir Academy and applied for there, not through CAO. "Entry is by audition" (applications close at the start of February), which the model cannot hold; no subject is named beyond the minimum entry. Non-CAO (The Lir Academy). Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5qxd008d7m8pfcbu2puh',
      status: 'current',
      name: 'Ancient and Medieval History and Culture',
      description:
        'Ancient and Medieval History and Culture concentrates on the period c.2000 BC to c.1500 AD. It explores the changes in society, politics, religious practices, and art and architecture that have helped to shape the world we live in. Over the four years of the programme you will explore topics including the development of different systems of government (from democracy in ancient Greece to monarchy and empire in the Middle Ages), the formation of Europe, ancient and medieval belief systems and religious practices (from the pantheon of ancient deities to the dominance of Christianity), the development of the legal system, and the role of warfare in bringing about change. You will have the opportunity to explore developments in educational practices, including the emergence of the university, changing attitudes to gender, sexuality and the place of women in society, and the different styles of European art and architecture used in the period.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/ancient-and-medieval-history-and-culture/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/ancient-and-medieval-history-and-culture/'
      ],
      notes:
        'Content 4.6: Ancient and Medieval History and Culture (B.A.). Specific subjects required: "none"; only the minimum entry applies. TR028, CAO points 472 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5fmc002v7m8pdf76725c',
      status: 'current',
      name: 'Biochemistry (Biological and Biomedical Sciences)',
      description:
        'Biochemistry is the study of the structure and function of the building blocks of life. Biochemists seek to provide mechanistic explanations for biological processes and ask questions about how things work, why they work and what happens when they don’t. Biochemists have developed many of the key technologies used widely in biomedical sciences. Pharmaceutical companies invest heavily in biochemistry to develop new drugs for many pathological conditions.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/biochemistry-biological-and-biomedical-sciences/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        {
          courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI', 'GEOG', 'CS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/biochemistry-biological-and-biomedical-sciences/'
      ],
      notes:
        'Content 4.6: Biochemistry is a strand of Biological and Biomedical Sciences, B.Sc. for 2027 (the 2026 course page says B.A. (Moderatorship)), chosen after entry. Prospectus notes 1 and 2. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. Sciences: note 2, "Two higher level grade 4s (grade Cs at A Level, IB HL grade 5s) from the following subjects: physics, chemistry, biology, physics/chemistry, mathematics, geology, geography, applied mathematics, agricultural science, computer science", stored as one critical group of the IB courses among them (Physics, Chemistry, Biology, Maths AA or AI, Geography, Computer Science) at HL 5. The model cannot hold "two of"; it is in these notes. From 2028 the sciences narrow (the prospectus alert list). TR060 Biological and Biomedical Sciences, CAO points 553 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Biology or Chemistry HL 5 (critical); English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "Bachelor of Arts in Engineering / Master in Engineering".
    {
      id: 'cmkkx58tm00197m8pe4mxatro',
      status: 'current',
      name: 'Biomedical Engineering',
      description:
        'Biomedical engineering is at the intersection of engineering, the life sciences and healthcare. Biomedical engineers take principles from applied science and apply them to biology and medicine. The goal is to better understand, replace or fix a target system to ultimately improve the quality of healthcare. Applications include the development of biocompatible prostheses, diagnostic and therapeutic medical devices, advanced imaging methods such as MRIs and EEGs, as well as development of regenerative materials, engineered tissues and artificial organs.',
      field: 'Engineering',
      degree: "Integrated Bachelor's and Master's",
      duration: '5 years',
      minIBPoints: 37,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/biomedical-engineering/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/biomedical-engineering/'
      ],
      notes:
        'Content 4.6: Biomedical Engineering is a specialisation of Engineering (common entry), "B.A., M.A.I. Masters Degree in Engineering", 4 years or 5 with the Masters; stored as the integrated 5-year degree, as before. Requirement: "HL 5 in Mathematics", stored as Maths AA or AI HL 5, critical. Trinity accepts both Analysis and Approaches and Applications and Interpretation, but "for courses with a Higher Level Mathematics requirement we strongly recommend Mathematics: Analysis and Approaches at HL as this is likely to be a mandatory requirement". TR032 Engineering, CAO points 577 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 37 is kept, unverified. Checked for 2027. Stored before: Maths AA or Maths AI HL 5 (critical); English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5fxe00317m8psg66qa0k',
      status: 'current',
      name: 'Botany (Biological and Biomedical Sciences)',
      description:
        'Trinity’s Botany course is unique in content in Ireland and uncommon in a European context. Uniquely, we integrate small-group teaching, field-based activities and the laboratory. Field-based teaching in ecology, physiology and plant evolution is at its heart: We consider both the whole plant and how it works in a natural context. All staff are research active with high profile and strong research interests in Ireland and the tropics. Consistently, our graduates have rated our course very highly indeed: we believe that our course offers you the best possible training in Ireland for your future career.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/botany-biological-and-biomedical-sciences/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        {
          courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI', 'GEOG', 'CS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/botany-biological-and-biomedical-sciences/'
      ],
      notes:
        'Content 4.6: Botany is a strand of Biological and Biomedical Sciences, B.Sc. for 2027 (the 2026 course page says B.A. (Moderatorship)), chosen after entry. Prospectus notes 1 and 2. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. Sciences: note 2, "Two higher level grade 4s (grade Cs at A Level, IB HL grade 5s) from the following subjects: physics, chemistry, biology, physics/chemistry, mathematics, geology, geography, applied mathematics, agricultural science, computer science", stored as one critical group of the IB courses among them (Physics, Chemistry, Biology, Maths AA or AI, Geography, Computer Science) at HL 5. The model cannot hold "two of"; it is in these notes. From 2028 the sciences narrow (the prospectus alert list). TR060 Biological and Biomedical Sciences, CAO points 553 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Biology or Chemistry or Computer Science or Geography or Physics HL 5; Maths AA or Maths AI HL 5; English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5n8600797m8p36qoj4d2',
      status: 'current',
      name: 'Business (Joint Honours)',
      description:
        'The business aspects of this degree will result in a graduate with the knowledge and skills necessary to work in, understand, and critically evaluate practices within markets, organisations and business management. The study of Business is the study of the integration of a range of fundamental practices of business including finance, marketing, leadership, strategy, accounting, corporate social responsibility, business ethics, and broad management skills designed to explore and enhance our understanding of how companies and industries operate and flourish.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/business-jh/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 7 },
            { course: 'MATH-AI', level: 'SL', grade: 7 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/business-jh/'
      ],
      notes:
        'Content 4.6: Business as a Joint Honours subject (with Computer Science, B.A. (Moderatorship), or with Law, LL.B./B.A.), 4 years: the degree is now Bachelor of Arts (was Bachelor of Business Studies). Prospectus note 15 for 2027: "A higher level grade 4 or an ordinary level grade 2 in mathematics; grade C at A Level or grade A/8 at GCSE level; IB HL grade 5 or SL grade 7", stored as one critical group; the alert list raises Business and Law (TR580) to it for 2027 from SL 5. Joint Honours (BU), CAO points 554-613 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Maths AA or Maths AI HL 5; English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "Bachelor of Business Studies / Bachelor of Arts".
    {
      id: 'cmkkx5n0800777m8p7rib6sy4',
      status: 'current',
      name: 'Business, Economics and Social Studies',
      description:
        'BESS is a uniquely flexible degree programme offering you different degree options across the disciplines of Business, Economics, Political Science and Sociology. It provides students with a broad education and you specialise and graduate with a Single Honours or Joint Honours degree with another subject, or a Major with a Minor. It also offers a high level of flexibility in two very important ways: from the second year onwards students are allowed to (a) choose the specific degree they wish to take and, (b) choose individual modules within their chosen degree path. Students, therefore, have an opportunity to adjust their study programmes in accordance with their academic results, interests, aptitudes and emerging career aspirations.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/business-economics-and-social-studies/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 7 },
            { course: 'MATH-AI', level: 'SL', grade: 7 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/business-economics-and-social-studies/'
      ],
      notes:
        'Content 4.6: Business, Economic and Social Studies (BESS), 4 years, awards "B.A. (Mod.) in Economics and Social Studies" or "B.B.S. in Business Studies", one degree, not two: now Bachelor of Arts (was Double Bachelor\'s Degree). Requirement: "HL 5 or SL 7 in Mathematics"; the stored critical group already matched. TR081, CAO points 565 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 36 is kept, unverified. Checked for 2027. Stored before: Maths AA HL 5 or Maths AA SL 7 or Maths AI HL 5 or Maths AI SL 7 (critical); English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5e2k00297m8pkmus877c',
      status: 'current',
      name: 'Chemical Sciences',
      description:
        'Chemistry is a creative and central science, dealing with challenges that span the physical and life sciences. It is found and used everywhere from the creation of new materials and processes through to advancements in medical health and diagnosis of disease.\n\nA chemistry-based qualification provides students with the relevant skills and knowledge to open doors in research, medicine, education, industry, finance, consultancy and more.\n\nAs well as practical knowledge of the subject, chemistry students develop many other transferable skills that are valued by both employers and the wider community. These range from critical thinking and problem-solving to communication and creativity. Nobody knows what the jobs of the future will look like, but chemists will be needed to tackle problems in human health, sustainable energy, technology, food management and the environment. Academics at the School of Chemistry are at the forefront of cutting-edge research and are contributing to ground-breaking advances that benefit society. These include nanotechnology, drug-delivery, energy storage and computational modelling.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/chemical-sciences/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        {
          courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI', 'GEOG', 'CS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/chemical-sciences/'
      ],
      notes:
        'Content 4.6: Chemical Sciences (the common entry) is a strand of Chemical Sciences, B.Sc. for 2027 (the 2026 course page says B.A. (Moderatorship)), chosen after entry. Prospectus notes 1 and 2. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. Sciences: note 2, "Two higher level grade 4s (grade Cs at A Level, IB HL grade 5s) from the following subjects: physics, chemistry, biology, physics/chemistry, mathematics, geology, geography, applied mathematics, agricultural science, computer science", stored as one critical group of the IB courses among them (Physics, Chemistry, Biology, Maths AA or AI, Geography, Computer Science) at HL 5. The model cannot hold "two of"; it is in these notes. From 2028 Chemical Sciences asks for Maths HL 5 and one of Biology, Physics or Chemistry at HL 5 (the prospectus alert list). TR061 Chemical Sciences, CAO points 542 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Chemistry HL 5 (critical); Computer Science or Geography or Physics HL 5; Maths AA or Maths AI HL 5; English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5eca002d7m8p234w1faw',
      status: 'current',
      name: 'Chemistry (Chemical Sciences)',
      description:
        'Chemistry is a creative science that is used to develop everything from new materials for superconductors and new batteries, to new drug molecules for the pharmaceutical industry. Without it, many modern science disciplines, such as materials science, molecular biology and environmental science, would not be possible.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/chemistry-chemical-sciences/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        {
          courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI', 'GEOG', 'CS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/chemistry-chemical-sciences/'
      ],
      notes:
        'Content 4.6: Chemistry is a strand of Chemical Sciences, B.Sc. for 2027 (the 2026 course page says B.A. (Moderatorship)), chosen after entry. Prospectus notes 1 and 2. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. Sciences: note 2, "Two higher level grade 4s (grade Cs at A Level, IB HL grade 5s) from the following subjects: physics, chemistry, biology, physics/chemistry, mathematics, geology, geography, applied mathematics, agricultural science, computer science", stored as one critical group of the IB courses among them (Physics, Chemistry, Biology, Maths AA or AI, Geography, Computer Science) at HL 5. The model cannot hold "two of"; it is in these notes. From 2028 Chemical Sciences asks for Maths HL 5 and one of Biology, Physics or Chemistry at HL 5 (the prospectus alert list). TR061 Chemical Sciences, CAO points 542 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Chemistry HL 5 (critical); Computer Science or Geography or Physics HL 5; Maths AA or Maths AI HL 5; English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5elo002h7m8pqd22fd2h',
      status: 'current',
      name: 'Chemistry with Biosciences (Chemical Sciences)',
      description:
        'What is Chemistry with Biosciences?\nChemistry with Biosciences is designed to produce graduates who are prepared to work at the interface of chemistry and biology, addressing global issues in chemical and life science such as drug development and safety, biomedicine, biotechnology and clinical operations.\n\nGraduate skills and career opportunities\nAs with graduates in other branches of chemistry, the skills acquired during this course will make you highly attractive to employers in a wide variety of areas. Graduates can contribute to research developments across the healthcare, pharmaceutical, biotechnology and the food processing sectors. This degree will also prepare you to work in education, science communication, business, data analysis and administration.\n\nOur Chemistry with Biosciences degree would serve as an excellent primary degree for a graduate course in health science such as medicine or physiotherapy. Our graduates can also pursue postgraduate degrees either in the School of Chemistry or in other world-class research institutions.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/chemistry-with-biosciences-chemical-sciences/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        {
          courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI', 'GEOG', 'CS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/chemistry-with-biosciences-chemical-sciences/'
      ],
      notes:
        'Content 4.6: Chemistry with Biosciences is a strand of Chemical Sciences, B.Sc. for 2027 (the 2026 course page says B.A. (Moderatorship)), chosen after entry. Prospectus notes 1 and 2. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. Sciences: note 2, "Two higher level grade 4s (grade Cs at A Level, IB HL grade 5s) from the following subjects: physics, chemistry, biology, physics/chemistry, mathematics, geology, geography, applied mathematics, agricultural science, computer science", stored as one critical group of the IB courses among them (Physics, Chemistry, Biology, Maths AA or AI, Geography, Computer Science) at HL 5. The model cannot hold "two of"; it is in these notes. From 2028 Chemical Sciences asks for Maths HL 5 and one of Biology, Physics or Chemistry at HL 5 (the prospectus alert list). TR061 Chemical Sciences, CAO points 542 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Chemistry HL 5 (critical); Biology or Computer Science or Geography HL 5; Maths AA or Maths AI HL 5; English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5ev1002l7m8pxfru2i6q',
      status: 'current',
      name: 'Chemistry with Molecular Modelling (Chemical Sciences)',
      description:
        'What is Chemistry with Molecular Modelling?\nChemistry with molecular modelling is a chemistry-based creative science course that is used to develop everything from new materials such as superconductors for new batteries, to new drug molecules for the pharmaceutical industry. Without it, many modern science disciplines such as materials science, molecular biology and environmental science would not be possible. Chemistry with molecular modelling embeds computer-modelling techniques and their application to better understand and explore chemistry.\n\nChemistry with Molecular Modelling: The course for you?\nThe course will suit you if you have an interest in science and chemistry in particular, have a logical and inquisitive mind and want to work in industry or research after university.\n\nChemistry with Molecular Modelling at Trinity This degree is designed to train our students with the creative talent and skills required for research and industry. The course provides a broad base in organic, inorganic and physical chemistry so that our graduates have a wide selection of career prospects. This degree also provides students with the unique opportunity to study the fundamentals of modern chemistry, whilst developing computer/ IT skills and applying computer-modelling techniques to explore chemical problems.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/chemistry-with-molecular-modelling-chemical-sciences/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        {
          courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI', 'GEOG', 'CS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/chemistry-with-molecular-modelling-chemical-sciences/'
      ],
      notes:
        'Content 4.6: Chemistry with Molecular Modelling is a strand of Chemical Sciences, B.Sc. for 2027 (the 2026 course page says B.A. (Moderatorship)), chosen after entry. Prospectus notes 1 and 2. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. Sciences: note 2, "Two higher level grade 4s (grade Cs at A Level, IB HL grade 5s) from the following subjects: physics, chemistry, biology, physics/chemistry, mathematics, geology, geography, applied mathematics, agricultural science, computer science", stored as one critical group of the IB courses among them (Physics, Chemistry, Biology, Maths AA or AI, Geography, Computer Science) at HL 5. The model cannot hold "two of"; it is in these notes. From 2028 Chemical Sciences asks for Maths HL 5 and one of Biology, Physics or Chemistry at HL 5 (the prospectus alert list). TR061 Chemical Sciences, CAO points 542 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Chemistry HL 5 (critical); Biology or Computer Science or Physics HL 5; Maths AA or Maths AI HL 5; English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5qhm00897m8p7w6oizx4',
      status: 'current',
      name: 'Classical Civilisation (Joint Honours)',
      description:
        'What is Classical Civilisation?\nThe study of Classical Civilisation is concerned with the literature, thought and culture of Ancient Greece and Rome. Through the examination and contextualisation of literary works and the analysis of the main aspects of ancient history and art, you will develop a thorough knowledge of the classical world and a critical approach to Greek and Roman literature. All texts are studied in translation and no knowledge of Greek or Latin is required, but there are opportunities to study the languages at an introductory level.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/classical-civilisation-jh/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/classical-civilisation-jh/'
      ],
      notes:
        'Content 4.6: Classical Civilisation as a Joint Honours subject (B.A.). Specific subjects required: "none"; only the minimum entry applies. Joint Honours (CC). Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5qpb008b7m8p28fe3ldp',
      status: 'current',
      name: 'Classics, Ancient History and Archaeology',
      description:
        'Classics, Ancient History and Archaeology (CLAHA) is an integrated degree programme that allows you to study the history, literature, art, archaeology, culture and thought of the ancient world in conjunction with one or both of the ancient languages. Flexible pathways enable you to pursue your own interests and graduate with a Single Honours degree in Classics (Latin and Greek), Ancient History and Archaeology, or Classical Civilisation, or to choose from a wide range of Joint Honours and Major/Minor combinations. Both languages can be begun from scratch, and previous study is not necessary.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/classics-ancient-history-and-archaeology/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        {
          courses: [
            'GRK',
            'LAT',
            'FRA-B',
            'FRA-LIT',
            'FRA-LL',
            'GER-B',
            'GER-LIT',
            'GER-LL',
            'ITA-B',
            'SPA-B',
            'SPA-LIT',
            'SPA-LL',
            'RUS-B',
            'POR-B',
            'DUT-B',
            'ARA-B',
            'MAN-B',
            'MAN-LIT-A',
            'MAN-LL',
            'JPN-B',
            'KOR-B',
            'HIN-B'
          ],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/classics-ancient-history-and-archaeology/'
      ],
      notes:
        'Content 4.6: Classics, Ancient History and Archaeology (B.A.). Requirement: "HL 5 in Greek, Latin or a language other than English", stored as one critical group of Classical Greek, Latin and every other language course the list holds that can be taken at HL (it was not critical, and held only French, German, Italian and Spanish B). TR021, CAO points 419 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 35 is kept, unverified. Checked for 2027. Stored before: French B or German B or Classical Greek or Italian B or Latin or Spanish B HL 5; English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "Bachelor of Arts in Engineering / Master in Engineering".
    {
      id: 'cmkkx57wf000r7m8pxulqcwku',
      status: 'current',
      name: 'Computer Engineering',
      description:
        'A computer engineer has mastered the necessary knowledge of mathematics and systems to tackle a whole range of real-world problems. Computer engineers may design computer hardware, write computer programs, integrate the various sub-systems together – or do all three. The impact of computer engineering has been more significant and more pervasive than that of many other disciplines. The smartphone, tablet computers, the Internet and games consoles are all products that were not even imagined 30 years ago, but have now been realised by the ingenuity of computer engineers.',
      field: 'Engineering',
      degree: "Integrated Bachelor's and Master's",
      duration: '5 years',
      minIBPoints: 37,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/computer-engineering/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/computer-engineering/'
      ],
      notes:
        'Content 4.6: Computer Engineering is a specialisation of Engineering (common entry), "B.A., M.A.I. Masters Degree in Engineering", 4 years or 5 with the Masters; stored as the integrated 5-year degree, as before. Requirement: "HL 5 in Mathematics", stored as Maths AA or AI HL 5, critical. Trinity accepts both Analysis and Approaches and Applications and Interpretation, but "for courses with a Higher Level Mathematics requirement we strongly recommend Mathematics: Analysis and Approaches at HL as this is likely to be a mandatory requirement". TR032 Engineering, CAO points 577 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 37 is kept, unverified. Checked for 2027. Stored before: Maths AA or Maths AI HL 5 (critical); English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx56cr00017m8p6rnxu3qx',
      status: 'current',
      name: 'Computer Science',
      description:
        'Computer Science is concerned with the study of everything to do with computers and our relationship with them. Computer scientists are critical to the efficient running of modern societies, dealing with health, security, banking and finance, transportation, and now increasingly our interaction through social networks. Computing professionals deal with theoretical issues, solve complex problems, deal with matters of ethics and with society at large. Theoretical issues in computer science relate to the abstract notions of computation and information.\n\nThe study of these issues leads, for example, to efficient and robust algorithms for problems in many areas. Applications of computer science range from artificial intelligence to health informatics, from smart cities to information security, and from educational and training systems to analysis of content on social network sites.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/computer-science/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/computer-science/'
      ],
      notes:
        'Content 4.6: Computer Science (Single Honours): for 2027 a B.Sc. (was stored as Bachelor of Arts), 4 years, or 5 with the optional M.C.S. (was stored as 5 years). Requirement: "HL 5 in Mathematics", stored as Maths AA or AI HL 5, critical. Trinity accepts both Analysis and Approaches and Applications and Interpretation, but "for courses with a Higher Level Mathematics requirement we strongly recommend Mathematics: Analysis and Approaches at HL as this is likely to be a mandatory requirement". TR033, CAO points 533 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 37 is kept, unverified. Checked for 2027. Stored before: Maths AA or Maths AI HL 5 (critical); English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx56qb00077m8pb3fnklzg',
      status: 'current',
      name: 'Computer Science (Joint Honours)',
      description:
        'What is Computer Science?\nComputer Science is concerned with the study of everything to do with computers and our relationship with them. Computer scientists are critical to the efficient running of modern societies, dealing with health, security, banking and finance, transportation, and now increasingly our interaction through social networks. Computing professionals deal with theoretical issues, solve complex problems, deal with matters of ethics and with society at large. Theoretical issues in computer science relate to the abstract notions of computation and information.\n\nThe study of these issues leads, for example, to efficient and robust algorithms for problems in many areas. Applications of computer science range from artificial intelligence to health informatics, from smart cities to information security, and from educational and training systems to analysis of content on social network sites.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/computer-science-jh/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 7 },
            { course: 'MATH-AI', level: 'SL', grade: 7 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/computer-science-jh/'
      ],
      notes:
        'Content 4.6: Computer Science as a Joint Honours subject: a B.Sc. in the 2027 prospectus (was stored as Bachelor of Arts). Prospectus note 15: "IB HL grade 5 or SL grade 7" in mathematics; the stored critical group already matched. Joint Honours (CS), CAO points 554-594 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Maths AA HL 5 or Maths AA SL 7 or Maths AI HL 5 or Maths AI SL 7 (critical); English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx571l000d7m8pqx3j53eu',
      status: 'current',
      name: 'Computer Science, Linguistics and a Language',
      description:
        'The Computer Science, Linguistics and a Language (CSLL) degree is an integrated, interdisciplinary programme. CSLL students learn computer science, study linguistics, the scientific study of language and speech, and study a specific language (with a choice of French, Spanish or Irish). \n\nThere is an emphasis on the intersection of these subjects, on computational and empirical approaches to language, knowledge of which is important to the ever-growing fields of speech and language technology, such as machine translation, speech synthesis and recognition.\n\nAll the component disciplines are pursued to a high level, equipping CSLL graduates to pursue a very wide range of careers, such as in computing in general, in roles requiring skills in a particular language and in the speech and language technology area.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/computer-science-linguistics-and-a-language/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['FRA-B', 'FRA-LIT', 'FRA-LL', 'SPA-B', 'SPA-LIT', 'SPA-LL'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/computer-science-linguistics-and-a-language/'
      ],
      notes:
        'Content 4.6: Computer Science, Linguistics and a Language: a B.Sc. in the 2027 prospectus (was stored as Bachelor of Arts). Prospectus note 18: "IB HL grade 5" in mathematics, and "IB HL grade 5 in French or Spanish; HL grade 6 if selecting Irish", the language studied. Stored: Maths AA or AI HL 5 and French or Spanish (A or B) HL 5, both critical (the language was not critical); Irish has no IB course in the list. TR039, CAO points 512 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Maths AA or Maths AI HL 5 (critical); French B or Spanish B HL 5; English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5plv00817m8ph78yz14h',
      status: 'current',
      name: 'Deaf Studies',
      description:
        'The Centre for Deaf Studies (CDS) in Trinity affords students the opportunity to develop insights into, and genuine appreciation for the culture, contributions, and contemporary issues related to deaf people in Ireland and worldwide. The undergraduate programme is the only one of its kind in Ireland. Irish Sign Language (ISL) is the indigenous language of the deaf community in Ireland and is the working language at the Centre for Deaf Studies. There are many different signed languages in the world in the same way as there are different spoken languages.\n\nISL is the third language of Ireland, recognised in the Irish Sign Language Act (2017). It is also one of the many sign languages recognised by European Institutions and is recognised along with British Sign Language in Northern Ireland. During this four-year course students develop fluency in ISL. As a student you may choose to specialise as an ISL/English Interpreter or an ISL teacher, or to focus on Deaf Studies. Students entering the Deaf Studies programme will explore a range of educational, social, cultural, linguistic, and psycho-social aspects and their application to deaf people, as individuals, as a community, and as a linguistic and cultural minority.\n\nThe multi-disciplinary approach to your studies is led by a strong academic team, many of whom are deaf. The degree programme will provide in-depth training preparing you for a number of exciting career options working with deaf as a disability officer, resource officer, research assistant or as an administrator in deaf community organisations to give a few examples. With this foundation, graduates frequently go on to complete postgraduate study.',
      field: 'Social Sciences',
      degree: 'Bachelor of Deaf Studies',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/deaf-studies/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'HL', grade: 5, critical: true },
        {
          courses: [
            'FRA-B',
            'FRA-LIT',
            'FRA-LL',
            'GER-B',
            'GER-LIT',
            'GER-LL',
            'ITA-B',
            'SPA-B',
            'SPA-LIT',
            'SPA-LL',
            'RUS-B',
            'POR-B',
            'DUT-B',
            'ARA-B',
            'MAN-B',
            'MAN-LIT-A',
            'MAN-LL',
            'JPN-B',
            'KOR-B',
            'HIN-B',
            'FRA-AB',
            'GER-AB',
            'ITA-AB',
            'SPA-AB',
            'MAN-AB'
          ],
          level: 'SL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/deaf-studies/'
      ],
      notes:
        'Content 4.6: Deaf Studies awards a B.St.Su. Honours Bachelor Degree, not a B.A.: stored as Bachelor of Deaf Studies, an award the owner added to the degree list on 29 September 2026. Prospectus note 16: "a higher-level grade 4 in English and a grade 6 at ordinary or higher level in a language other than English" (an ISL test can replace the English requirement for applicants whose first language is ISL). The prospectus gives no IB grades for this course; the course page\'s IB equivalents, "HL Grade 5 English" and "SL Grade 5 in a language other than English", are stored, both critical (they were not critical, and the language list held only four B courses). Garda vetting applies. TR016, CAO points 317 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 32 is kept, unverified. Checked for 2027. Stored before: English A Literature or English A Language and Literature HL 5; French B or German B or Italian B or Spanish B SL 5.'
    },
    // Deleted 2026-09-29 at the owner's request (content 4.6), backup in scripts/backups/refresh/: Dental Hygiene (TR802): a two-year Diploma (NFQ Level 7), not a degree; no IB requirement published.
    // Deleted 2026-09-29 at the owner's request (content 4.6), backup in scripts/backups/refresh/: Dental Nursing (TR801): a two-year Diploma (NFQ Level 7), not a degree; no IB requirement published.
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5jet004x7m8pswu89au3',
      status: 'current',
      name: 'Dental Science',
      description:
        'Dental Science is the study of the oral cavity and the diseases associated with oral tissues. This five-year programme is designed to ensure that graduates can safely and effectively deliver the full range of primary dental care, including prevention, diagnosis and treatment of oral and dental diseases.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Dental Science',
      duration: '5 years',
      minIBPoints: 38,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/dental-science/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'PHYS', level: 'SL', grade: 1 },
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'SL', grade: 5 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/dental-science/'
      ],
      notes:
        'Content 4.6: Dental Science (B.Dent.Sc., 5 years). Prospectus note 17: "IB HL grade 6 and HL grade 5" in two of physics, chemistry, biology; without "some qualification in physics", mathematics at "IB SL grade 5". English at Band C (higher entry); health screening and Garda vetting apply. Stored as Biology, Chemistry or Physics at HL 6 and again at HL 5, both critical (the model cannot hold "two of": one subject at HL 6 meets both rows), and Physics at any level or Maths AA or AI SL 5, one critical group ("some qualification in physics" is stored as Physics SL 1, as 4.1 stored UCL\'s "Physics at HL or SL"). TR052, CAO points 625 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 38 is kept, unverified. Checked for 2027. Stored before: Biology or Chemistry or Physics HL 6 (critical); Biology or Chemistry or Physics HL 5; Maths AA SL 5 or Maths AI SL 5 or Physics HL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5kcl005f7m8peahnp2h5',
      status: 'current',
      name: 'Dental Technology',
      description:
        'What is a Dental Technician?\nDental technicians work in a laboratory which is usually remote from the dental clinic. Dental technicians work to the prescription of a dentist; they perform the laboratory aspects of dentistry – fabricating crowns and bridges, dentures, implants, maxillofacial and orthodontic appliances intended for use by the patient. Dental technicians have good manual dexterity skills and are required to work with different materials for the fabrication of the various appliances. Dental technology is a changing field, with more emphasis on the use of CAD (Computer Aided Design) / CAM (Computer Aided Manufacturing) in the laboratory.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Dental Technology',
      duration: '3 years',
      minIBPoints: 32,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/dental-technology/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/dental-technology/'
      ],
      notes:
        'Content 4.6: Dental Technology is a B.Dent.Tech. Ordinary Degree (NFQ Level 7), 3 years: stored as Bachelor of Dental Technology (was Bachelor of Science), an award the owner added to the degree list on 29 September 2026, and 3 years (was 4). Restricted entry. The 2027 prospectus gives only Leaving Certificate requirements (note A: six subjects including English, mathematics and one of physics, chemistry, biology, physics/chemistry or agricultural science, two at O4 and four at O6) and no IB equivalent: mathematics and a science are stored at SL 4, the lowest IB grade Trinity\'s minimum entry accepts, both critical. Band C English; health screening and Garda vetting apply. TR803, CAO points 499 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 32 is kept, unverified. Checked for 2027. Stored before: English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5rtd008l7m8pgj5q83ok',
      status: 'current',
      name: 'Drama Studies (Joint Honours)',
      description:
        'What is Drama?\nDrama exists on and off the stage. Theatre happens in our everyday life. It is the basis for story-telling and other forms of performance within the creative arts. It has its origins in sacred ritual and remains central today as part of our sensemaking as we negotiate our place in the world. As with other creative arts, Drama and the insights from studying performance can be applied in the fields of medicine, politics, education and more. \n\nTheatre Studies encompass all the arts that make up the live experience we call theatre – including costume, lighting, sound, devising, directing, design, dramaturgy and playwriting. We also study the meaning behind theatre, analysing culture and politics, space and place, the presence of audience and performers, and the use of digital technology.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/drama-studies-jh/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/drama-studies-jh/'
      ],
      notes:
        'Content 4.6: Drama Studies as a Joint Honours subject (B.A.), restricted entry (prospectus note 10): apply to CAO by 1 February, then a questionnaire and possibly a workshop and interview, which the model cannot hold. No subject is named beyond the minimum entry. Joint Honours (DR). Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5ng2007b7m8p0nzxlrzb',
      status: 'current',
      name: 'Economics (Joint Honours)',
      description:
        'Any society has to address the problem of how and what to produce for its material survival, and how the goods and services that are produced should be distributed among its population. Economists explore how people and institutions behave and function when producing, exchanging and using goods and services. Economists’ main motivation is to find mechanisms that encourage efficiency in the production and use of material goods and resources, while at the same time producing a pattern of income distribution that society finds acceptable.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/economics-jh/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/economics-jh/'
      ],
      notes:
        'Content 4.6: Economics as a Joint Honours subject (B.A.). Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. It was stored as Maths HL 5, not critical, which no page asks for. Joint Honours (EC). Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Maths AA or Maths AI HL 5; English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "Bachelor of Arts in Engineering / Master in Engineering".
    {
      id: 'cmkkx58ij00137m8pynyx6mwm',
      status: 'current',
      name: 'Electronic and Computer Engineering',
      description:
        'Students who wish to study Electronic and Computer Engineering apply to the Engineering degree (TR032). The first two years are common to all Engineering students and at the end of the second year students select the joint programme in Electronic and Computer Engineering as their specialist area.',
      field: 'Engineering',
      degree: "Integrated Bachelor's and Master's",
      duration: '5 years',
      minIBPoints: 37,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/electronic-and-computer-engineering-joint-programme/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/electronic-and-computer-engineering-joint-programme/'
      ],
      notes:
        'Content 4.6: Electronic and Computer Engineering is a specialisation of Engineering (common entry), "B.A., M.A.I. Masters Degree in Engineering", 4 years or 5 with the Masters; stored as the integrated 5-year degree, as before. Requirement: "HL 5 in Mathematics", stored as Maths AA or AI HL 5, critical. Trinity accepts both Analysis and Approaches and Applications and Interpretation, but "for courses with a Higher Level Mathematics requirement we strongly recommend Mathematics: Analysis and Approaches at HL as this is likely to be a mandatory requirement". TR032 Engineering, CAO points 577 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 37 is kept, unverified. Checked for 2027. Stored before: Maths AA or Maths AI HL 5 (critical); English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "Bachelor of Arts in Engineering / Master in Engineering".
    {
      id: 'cmkkx587l000x7m8p7po98bof',
      status: 'current',
      name: 'Electronic Engineering',
      description:
        'Until recently it was possible to define the skillset of an Electronic Engineer as related to the design of hardware chips that could, for instance, be found in computers and consumer devices. In fact it is a continuously evolving profession and is the driving force behind the development of the world’s information technology. Electronic engineers create, design and develop everyday devices like the mobile phone, tablets, game engines and computers. In particular they increasingly design systems which are at the interface between decision making systems and actions in the real world. That means an engineer in this speciality has to also have a working knowledge of software engineering since all engineers now exploit software design to implement ideas and prototypes.',
      field: 'Engineering',
      degree: "Integrated Bachelor's and Master's",
      duration: '5 years',
      minIBPoints: 37,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/electronic-engineering/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/electronic-engineering/'
      ],
      notes:
        'Content 4.6: Electronic Engineering is a specialisation of Engineering (common entry), "B.A., M.A.I. Masters Degree in Engineering", 4 years or 5 with the Masters; stored as the integrated 5-year degree, as before. Requirement: "HL 5 in Mathematics", stored as Maths AA or AI HL 5, critical. Trinity accepts both Analysis and Approaches and Applications and Interpretation, but "for courses with a Higher Level Mathematics requirement we strongly recommend Mathematics: Analysis and Approaches at HL as this is likely to be a mandatory requirement". TR032 Engineering, CAO points 577 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 37 is kept, unverified. Checked for 2027. Stored before: Maths AA or Maths AI HL 5 (critical); English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "Bachelor of Arts in Engineering / Master in Engineering".
    {
      id: 'cmkkx579n000f7m8pwj86vqgp',
      status: 'current',
      name: 'Engineering',
      description:
        'Engineering is about being creative in technical problem solving. Engineers make things possible by using mathematical and scientific principles together with analytical and design skills. They tackle existing problems by developing new solutions through innovative technologies.\n\nThey also expand the frontiers of society by developing advanced materials, sustainable energy systems, construction technologies, transport systems, biomedical devices, and telecommunications infrastructure.',
      field: 'Engineering',
      degree: "Integrated Bachelor's and Master's",
      duration: '5 years',
      minIBPoints: 37,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/engineering/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/engineering/'
      ],
      notes:
        'Content 4.6: Engineering (the common entry) is a specialisation of Engineering (common entry), "B.A., M.A.I. Masters Degree in Engineering", 4 years or 5 with the Masters; stored as the integrated 5-year degree, as before. Requirement: "HL 5 in Mathematics", stored as Maths AA or AI HL 5, critical. Trinity accepts both Analysis and Approaches and Applications and Interpretation, but "for courses with a Higher Level Mathematics requirement we strongly recommend Mathematics: Analysis and Approaches at HL as this is likely to be a mandatory requirement". TR032 Engineering, CAO points 577 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 37 is kept, unverified. Checked for 2027. Stored before: Maths AA or Maths AI HL 5 (critical); English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "Bachelor of Arts in Engineering".
    {
      id: 'cmkkx57l6000l7m8pb4i2wg1n',
      status: 'current',
      name: 'Engineering with Management',
      description:
        'Engineering with Management is an exciting and wide-ranging engineering programme that is broad in scope and aims to develop both the technical and business aspects of engineering. Engineers are problem solvers. In almost every human endeavour, an engineer has been involved somewhere. They have created the designs and systems to make everything from: gliders to space craft, ball-point pens to laser printers, matchbox cars to F1 racing cars, wheelchairs to artificial joints for the human body.\n\nEngineering with Management is concerned with the analysis, design, improvement, installation, and management of integrated systems of people, finance, materials and equipment. Our graduates have the technical skills common to all excellent engineers, with this knowledge augmented by an understanding of the commercial and industrial environment and the ability to generate innovative solutions to the problems of the world.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/engineering-with-management/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/engineering-with-management/'
      ],
      notes:
        'Content 4.6: Engineering with Management: "B.Sc. (Ing) Honours Bachelor Degree", optional M.A.I., 4 years or 5 with the Masters; now Bachelor of Science and 4 years (stored as Bachelor of Arts, 5 years). Requirement: "HL 5 in Mathematics", stored as Maths AA or AI HL 5, critical. Trinity accepts both Analysis and Approaches and Applications and Interpretation, but "for courses with a Higher Level Mathematics requirement we strongly recommend Mathematics: Analysis and Approaches at HL as this is likely to be a mandatory requirement". TR038, CAO points 613 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 37 is kept, unverified. Checked for 2027. Stored before: Maths AA or Maths AI HL 5 (critical); English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5q1r00857m8p2aaew5hq',
      status: 'current',
      name: 'English Studies',
      description:
        'The study of English is concerned with the history and practices of writing in English and encompasses literary works spanning English, Anglo-Irish, American and post-colonial cultures. It aims to develop a thorough knowledge of the history of these literatures while also enabling students to develop a sophisticated critical consciousness and an awareness of critical and cultural theory.\n\nCompared to (Joint Honours) students, English Studies students cover a longer historical range (including before 1300) and also consider topics such as Popular Literature and Childhood Literature.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 35,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/english-studies/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/english-studies/'
      ],
      notes:
        'Content 4.6: English Studies (B.A.). Requirement: "HL 5 in English", stored as English A HL 5, critical (it was not critical). TR023, CAO points 522 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 35 is kept, unverified. Checked for 2027. Stored before: English A Literature or English A Language and Literature HL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5953001f7m8pfqk4jcjd',
      status: 'current',
      name: 'Environmental Science and Engineering',
      description:
        'Environmental Science and Engineering is a new integrated undergraduate with postgraduate degree course that aims to train the next generation of graduates who have the competencies, knowledge and experience necessary to design and deploy solutions that protect and improve our environment and human wellbeing, and that work with rather than against the natural world to foster biodiversity, climate action and sustainable use of Earth’s finite resources\n\nStudents complete an integrated five-year course consisting of four year B.Sc. plus an additional year of study leading to either Masters in Engineering (Studies) a M.A.I. (St.) or Masters in Applied Environmental Science.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/environmental-science-and-engineering/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS', 'CHEM', 'BIO', 'GEOG', 'CS'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/environmental-science-and-engineering/'
      ],
      notes:
        'Content 4.6: Environmental Science and Engineering: B.Sc., with an optional M.A.I. or M.A.E.S., 4 years or 5 with a Masters; now 4 years (was 5). Prospectus note 20: maths at "IB HL 5" and "a higher level Grade 4 in one physics, chemistry, biology, physics/chemistry, geography, geology, agricultural science, computer science. (Grade C at A Level, IB HL 5)". Stored: Maths AA or AI HL 5 and Physics, Chemistry, Biology, Geography or Computer Science HL 5, both critical (the science was not critical). TR064, CAO points 525 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Maths AA or Maths AI HL 5 (critical); Biology or Chemistry or Computer Science or Geography or Physics HL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5g5g00337m8pau0j5ywe',
      status: 'current',
      name: 'Environmental Sciences (Biological and Biomedical Sciences)',
      description:
        'Environmental Sciences is by its nature a multidisciplinary academic field, comprising a study of the frequently complex interactions between the biological, chemical and physical components of our environment. The environmental science discipline has evolved over the last numbers of decades as key environmental problems such as climate change, air, water and soil pollution, sustainable development, deforestation, desertification and urbanisation to name a few, have become the focus of scientists, policy makers and the general public. Environmental scientists have training that is similar to other physical or life scientists, but is specifically applied to the environment. A broad scientific knowledge is required which involves a fundamental understanding of the physical and life sciences in addition to mathematics, economics, law and the social sciences.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/environmental-sciences-biological-and-biomedical-sciences/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        {
          courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI', 'GEOG', 'CS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/environmental-sciences-biological-and-biomedical-sciences/'
      ],
      notes:
        'Content 4.6: Environmental Sciences is a strand of Biological and Biomedical Sciences, B.Sc. for 2027 (the 2026 course page says B.A. (Moderatorship)), chosen after entry. Prospectus notes 1 and 2. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. Sciences: note 2, "Two higher level grade 4s (grade Cs at A Level, IB HL grade 5s) from the following subjects: physics, chemistry, biology, physics/chemistry, mathematics, geology, geography, applied mathematics, agricultural science, computer science", stored as one critical group of the IB courses among them (Physics, Chemistry, Biology, Maths AA or AI, Geography, Computer Science) at HL 5. The model cannot hold "two of"; it is in these notes. From 2028 the sciences narrow (the prospectus alert list). TR060 Biological and Biomedical Sciences, CAO points 553 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5q9o00877m8pycqm7gzw',
      status: 'current',
      name: 'European Studies',
      description:
        'European Studies is a broad-ranging and integrated programme that offers students the chance to learn European languages, and also to study history and social sciences. This programme encourages students to think about our continent in all its complexity, and to analyse Europe’s cultures, history, and politics.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 35,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/european-studies/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        {
          courses: [
            'FRA-B',
            'FRA-LIT',
            'FRA-LL',
            'GER-B',
            'GER-LIT',
            'GER-LL',
            'ITA-B',
            'RUS-B',
            'SPA-B',
            'SPA-LIT',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/european-studies/'
      ],
      notes:
        'Content 4.6: European Studies (B.A.): two of French, German, Italian, Modern Irish, Polish, Russian and Spanish. Prospectus note 8: normally a higher level grade 4 in two of them ("IB HL grade 5", French at H3), or one language at "IB HL grade 6". Stored as one critical group of French, German, Italian, Russian and Spanish (A or B) at HL 5; the model cannot hold "two at HL 5 or one at HL 6". It was stored as Arabic, French, German, Italian, Japanese, Mandarin or Spanish B at HL 6, not critical: Arabic, Japanese and Mandarin are not among the programme\'s languages. TR024, CAO points 564 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 35 is kept, unverified. Checked for 2027. Stored before: English A Literature or English A Language and Literature SL 4 (critical); Arabic B or French B or German B or Italian B or Japanese B or Mandarin B or Spanish B HL 6.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5r59008f7m8pnjrmcg9e',
      status: 'current',
      name: 'Film',
      description:
        'Why do films affect us the way they do? How did filmmakers and film theorists respond to the introduction of sound? What is a digital story world? These are just some of the many questions that Film asks students to consider in lectures and small-group seminars. Over the course of your degree, you will encounter a wide range of film styles and movements from the beginning of film up to the present day. You will engage with diverse critical perspectives and explore the social, cultural, and ideological implications of film as art and popular culture. In addition to academic assignments, you will be encouraged to respond creatively to critical issues via projects, presentations, practical exercises, and video essays, as well as to develop your screenwriting skills.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/film/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/film/'
      ],
      notes:
        'Content 4.6: Film (B.A.). Specific subjects required: "none"; only the minimum entry applies. TR042, CAO points 508 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5rd2008h7m8pd52uxn3t',
      status: 'current',
      name: 'Film Studies (Joint Honours)',
      description:
        'Why do films affect us the way they do? How did filmmakers and film theorists respond to the introduction of sound? What is a digital story world? These are just some of the many questions that Film asks students to consider in lectures and small-group seminars. Over the course of your degree, you will encounter a wide range of film styles and movements from the beginning of film up to the present day. You will engage with diverse critical perspectives and explore the social, cultural, and ideological implications of film as art and popular culture. In addition to academic assignments, you will be encouraged to respond creatively to critical issues via projects, presentations, practical exercises, and video essays, as well as to develop your screenwriting skills.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/film-studies-jh/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/film-studies-jh/'
      ],
      notes:
        'Content 4.6: Film as a Joint Honours subject (B.A.). Specific subjects required: "none"; only the minimum entry applies. Joint Honours (FS), CAO points 541-565 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: English A Language and Literature SL 4 or English A Language and Literature SL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5gda00357m8pba7ftj5d',
      status: 'current',
      name: 'Genetics (Biological and Biomedical Sciences)',
      description:
        'Genetics is the study of genes, genomes and heredity. It has developed rapidly in the last decade as new technology has made it possible to study genes in much greater detail and to rapidly sequence genomes.  A few examples of remarkable advances in knowledge include:\n\nThe discovery of the molecular basis of many inherited disorders.\nThe application of gene editing to plant and bacterial systems for biotechnology.\nThe detailed description of the evolutionary relationships of all organisms.\nThe application of DNA fingerprinting to forensic science.\nThe development of CRISPR technology for genome editing.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/genetics-biological-and-biomedical-sciences/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        {
          courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI', 'GEOG', 'CS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/genetics-biological-and-biomedical-sciences/'
      ],
      notes:
        'Content 4.6: Genetics is a strand of Biological and Biomedical Sciences, B.Sc. for 2027 (the 2026 course page says B.A. (Moderatorship)), chosen after entry. Prospectus notes 1 and 2. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. Sciences: note 2, "Two higher level grade 4s (grade Cs at A Level, IB HL grade 5s) from the following subjects: physics, chemistry, biology, physics/chemistry, mathematics, geology, geography, applied mathematics, agricultural science, computer science", stored as one critical group of the IB courses among them (Physics, Chemistry, Biology, Maths AA or AI, Geography, Computer Science) at HL 5. The model cannot hold "two of"; it is in these notes. From 2028 the sciences narrow (the prospectus alert list). TR060 Biological and Biomedical Sciences, CAO points 553 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Biology or Chemistry HL 5 (critical); English A Literature or English A Language and Literature SL 4; Maths AA or Maths AI SL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5pdt007z7m8pwt20b2nh',
      status: 'current',
      name: 'Geography (Joint Honours)',
      description:
        'Geography is a discipline inherently suited to addressing current and future societal challenges. It asks questions about how and why human, physical, and environmental phenomena vary across space and time. Geography is intrinsically interdisciplinary and, as the world becomes increasingly interconnected, geographers are well placed to bring their understanding and skills to bear on social and environmental issues.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/geography-jh/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/geography-jh/'
      ],
      notes:
        'Content 4.6: Geography as a Joint Honours subject (B.A.). Specific subjects required: "none"; only the minimum entry applies. Joint Honours (GG). Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "Bachelor in Business Studies".
    {
      id: 'cmkkx5no7007d7m8pzll5yzcn',
      status: 'current',
      name: 'Global and Sustainable Business',
      description:
        'The study of business requires a broad understanding of how human beings apply their skills, networks, knowledge and creativity to problems and opportunities in the world around them; and how they shape that world through their efforts to compete and collaborate over time.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Studies',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/global-business-bachelor-in-business-studies/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 7 },
            { course: 'MATH-AI', level: 'SL', grade: 7 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/global-business-bachelor-in-business-studies/'
      ],
      notes:
        'Content 4.6: Renamed: the prospectus alert list, "Change to the title of TR080 Global Business to Global and Sustainable Business" (B.B.S., 4 years). Requirement: "HL 5 or SL 7 in Mathematics", stored as one critical group (it was not critical). TR080, CAO points 602 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 36 is kept, unverified. Checked for 2027. Stored before: Maths AA HL 5 or Maths AA SL 7 or Maths AI HL 5 or Maths AI SL 7; English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5ptn00837m8pw2agrhws',
      status: 'current',
      name: 'History',
      description:
        'History is the study of how we and those before us interpret the past. Studying History means studying lives, events and ideas in times and places often very different from our own. History embraces everything from the rise and fall of empires, or the birth of new ideologies, to the contrasting everyday lives of people in a whole range of settings, across time and across the globe. Studying History means developing critical skills, learning to express your ideas and arguments clearly, and becoming self-directed in your studies.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 35,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/history/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/history/'
      ],
      notes:
        'Content 4.6: History (B.A.). Specific subjects required: "none"; only the minimum entry applies. TR003, CAO points 521 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 35 is kept, unverified. Checked for 2027. Stored before: English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5go6003b7m8pa35etksl',
      status: 'current',
      name: 'Human Genetics (Biological and Biomedical Sciences)',
      description:
        'Human Genetics is run by the Department of Genetics, which is part of the School of Genetics and Microbiology and is located in the Smurfit Institute of Genetics with state-of-the-art research facilities. There are 12 members of faculty and a number of academic associates, working in a wide range of areas of Human Genetics covering everything from medical genetics, gene based medicines, pharmacogenomics, stem cells to ancient and modern human population genetics, amongst other areas. The Department of Genetics has an international reputation for high-quality research and more than 50 years of experience in teaching Genetics and Human Genetics to undergraduate students. The teaching of the Department is research driven; undergraduates are taught by research-active scientists with excellent track records in their chosen fields.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/human-genetics-biological-and-biomedical-sciences/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        {
          courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI', 'GEOG', 'CS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/human-genetics-biological-and-biomedical-sciences/'
      ],
      notes:
        'Content 4.6: Human Genetics is a strand of Biological and Biomedical Sciences, B.Sc. for 2027 (the 2026 course page says B.A. (Moderatorship)), chosen after entry. Prospectus notes 1 and 2. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. Sciences: note 2, "Two higher level grade 4s (grade Cs at A Level, IB HL grade 5s) from the following subjects: physics, chemistry, biology, physics/chemistry, mathematics, geology, geography, applied mathematics, agricultural science, computer science", stored as one critical group of the IB courses among them (Physics, Chemistry, Biology, Maths AA or AI, Geography, Computer Science) at HL 5. The model cannot hold "two of"; it is in these notes. From 2028 the sciences narrow (the prospectus alert list). TR060 Biological and Biomedical Sciences, CAO points 553 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Biology or Chemistry HL 5 (critical); English A Literature or English A Language and Literature SL 4; Maths AA or Maths AI SL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5kkh005h7m8pf5iv5f68',
      status: 'current',
      name: 'Human Health and Disease',
      description:
        'The Human Health and Disease degree trains students for work in the field of biomedical research. It brings to life the fascinating connections between structure and function in the human body and explores the health and disease continuum in detail, including teaching on how medical therapies act to treat or even prevent disease. As an example, understanding brain structure and biochemistry allows us to appreciate how neurons communicate and this in turn is helping biomedical researchers and clinicians to identify new and effective ways to treat and prevent diseases such as dementia.\n\nA central feature of the learning experience is the development of a core set of real-life, transferable skills in the following areas: laboratory technique, group project work, data analysis, public presentation, report writing, research methodology and critical thinking.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/human-health-and-disease/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
        { courses: ['PHYS', 'CHEM'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/human-health-and-disease/'
      ],
      notes:
        'Content 4.6: Human Health and Disease (B.Sc.). Prospectus note 14: "A higher level grade 4 in biology and a higher level grade 4 in one of physics, chemistry or physics/chemistry (grade C at A Level; IB HL grade 5)". Stored: Biology HL 5 and Physics or Chemistry HL 5, both critical (they were not critical). TR056, CAO points 567 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Biology HL 5; Chemistry or Physics HL 5; English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5ms300757m8pd4pkvwdz',
      status: 'current',
      name: 'Law',
      description:
        'Law governs every aspect of our lives, from food labelling and football transfers to elections and crime. It regulates our social life from the contracts that we make when we buy products to the laws that determine when people can be jailed for committing criminal offences, and through to significant political decisions, such as constitutional reforms on marriage or abortion. As a law student, you will learn what laws are, how they work and how they change.',
      field: 'Law',
      degree: 'Bachelor of Laws',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/law/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/law/'
      ],
      notes:
        'Content 4.6: Law (LL.B./B.A.). Specific subjects required: "none"; only the minimum entry applies. TR004, CAO points 577 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 38 is kept, unverified. Checked for 2027. Stored before: English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5t5r008x7m8paeykekr0',
      status: 'current',
      name: 'Linguistics (Joint Honours)',
      description:
        'Linguistics is the scientific study of language. Linguists investigate how language works; how patterns of sounds, words and sentences combine to convey meaning. Language is fundamental to nearly every aspect of human experience: how we communicate, our sense of identity, how we interact socially and how we think. Linguists explore all these areas and more. They study everyday language use, how it varies and changes geographically, socially and across time, and how children acquire language.\n\nEven when they investigate specific languages, linguists are often trying to shed light on language in general. Some investigate how people acquire their knowledge about language and what this tells us about how the mind works. Many linguists investigate how languages vary across speakers, social groups and geographic regions, and some are involved in the documentation and maintenance of endangered languages. Some make computational models of speech and language based on collections of spoken and written language.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/linguistics-jh/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'FRA-B', level: 'HL', grade: 4 },
            { course: 'FRA-B', level: 'SL', grade: 6 },
            { course: 'FRA-LIT', level: 'HL', grade: 4 },
            { course: 'FRA-LIT', level: 'SL', grade: 6 },
            { course: 'FRA-LL', level: 'HL', grade: 4 },
            { course: 'FRA-LL', level: 'SL', grade: 6 },
            { course: 'GER-B', level: 'HL', grade: 4 },
            { course: 'GER-B', level: 'SL', grade: 6 },
            { course: 'GER-LIT', level: 'HL', grade: 4 },
            { course: 'GER-LIT', level: 'SL', grade: 6 },
            { course: 'GER-LL', level: 'HL', grade: 4 },
            { course: 'GER-LL', level: 'SL', grade: 6 },
            { course: 'ITA-B', level: 'HL', grade: 4 },
            { course: 'ITA-B', level: 'SL', grade: 6 },
            { course: 'SPA-B', level: 'HL', grade: 4 },
            { course: 'SPA-B', level: 'SL', grade: 6 },
            { course: 'SPA-LIT', level: 'HL', grade: 4 },
            { course: 'SPA-LIT', level: 'SL', grade: 6 },
            { course: 'SPA-LL', level: 'HL', grade: 4 },
            { course: 'SPA-LL', level: 'SL', grade: 6 },
            { course: 'RUS-B', level: 'HL', grade: 4 },
            { course: 'RUS-B', level: 'SL', grade: 6 },
            { course: 'POR-B', level: 'HL', grade: 4 },
            { course: 'POR-B', level: 'SL', grade: 6 },
            { course: 'DUT-B', level: 'HL', grade: 4 },
            { course: 'DUT-B', level: 'SL', grade: 6 },
            { course: 'ARA-B', level: 'HL', grade: 4 },
            { course: 'ARA-B', level: 'SL', grade: 6 },
            { course: 'MAN-B', level: 'HL', grade: 4 },
            { course: 'MAN-B', level: 'SL', grade: 6 },
            { course: 'MAN-LIT-A', level: 'HL', grade: 4 },
            { course: 'MAN-LIT-A', level: 'SL', grade: 6 },
            { course: 'MAN-LL', level: 'HL', grade: 4 },
            { course: 'MAN-LL', level: 'SL', grade: 6 },
            { course: 'JPN-B', level: 'HL', grade: 4 },
            { course: 'JPN-B', level: 'SL', grade: 6 },
            { course: 'KOR-B', level: 'HL', grade: 4 },
            { course: 'KOR-B', level: 'SL', grade: 6 },
            { course: 'HIN-B', level: 'HL', grade: 4 },
            { course: 'HIN-B', level: 'SL', grade: 6 },
            { course: 'FRA-AB', level: 'SL', grade: 6 },
            { course: 'GER-AB', level: 'SL', grade: 6 },
            { course: 'ITA-AB', level: 'SL', grade: 6 },
            { course: 'SPA-AB', level: 'SL', grade: 6 },
            { course: 'MAN-AB', level: 'SL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/linguistics-jh/'
      ],
      notes:
        'Content 4.6: Linguistics as a Joint Honours subject (B.A.). Requirement: "HL 4/SL 6 in a language other than English or Irish", stored as one critical group of every language course in the list other than English, at HL 4 or SL 6 (ab initio at SL 6). The stored rows split it into two groups and asked for English at HL 4, which no page does. Joint Honours (LS). Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Arabic B or French B or German B or Italian B or Japanese B or Mandarin B or Spanish B HL 4; English A Literature or English A Language and Literature HL 4; Arabic B or French B or German B or Italian B or Japanese B or Mandarin B or Spanish B SL 6.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5nw1007f7m8pbzl9gxl6',
      status: 'current',
      name: 'Management Science and Information Systems Studies',
      description:
        'Students learn how to use techniques from disciplines such as business, mathematics, computer science, statistics and management science to solve real-world problems. There is also a firm emphasis on interpersonal skills such as verbal communication, interviewing, teamwork and report writing.\n\nThe primary objective of the MSISS programme is to produce graduates who are both business and computer literate and who have a solid understanding of how to approach and solve practical problems using a variety of tools and techniques. The emphasis in MSISS is on building up analytical skills, flexibility and creative thinking.\n\nOne of the remarkable features of MSISS is the range of careers that graduates take up. The MSISS programme provides students with a unique blend of skills and experience. It is this mix which makes MSISS unique amongst other third-level courses in Ireland and helps contribute significantly to the success MSISS graduates have in getting jobs.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/management-science-and-information-systems-studies/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/management-science-and-information-systems-studies/'
      ],
      notes:
        'Content 4.6: Management Science and Information Systems Studies (MSISS): a B.Sc., 4 years (was stored as Bachelor of Business Studies). Requirement: "HL 5 in Mathematics", stored as Maths AA or AI HL 5, critical. Trinity accepts both Analysis and Approaches and Applications and Interpretation, but "for courses with a Higher Level Mathematics requirement we strongly recommend Mathematics: Analysis and Approaches at HL as this is likely to be a mandatory requirement". TR034, CAO points 625 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 36 is kept, unverified. Checked for 2027. Stored before: Maths AA or Maths AI HL 5 (critical); English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx59gy001l7m8pdykai8fk',
      status: 'current',
      name: 'Mathematics',
      description:
        'Mathematics is a broad and diverse subject which is used to model, analyse and understand several applications in the physical and biological sciences, engineering, management science, economics and finance. Its numerous applications are naturally interwoven with the underlying theory which is essential in developing one’s logical reasoning, quantitative skills and problem-solving techniques.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 36,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/mathematics/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/mathematics/'
      ],
      notes:
        'Content 4.6: Mathematics (B.A.). Requirement: "HL 6 in mathematics"; the stored Maths AA or AI HL 6 (critical) already matched. Trinity accepts both Analysis and Approaches and Applications and Interpretation, but "for courses with a Higher Level Mathematics requirement we strongly recommend Mathematics: Analysis and Approaches at HL as this is likely to be a mandatory requirement". TR031, CAO points 571 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 36 is kept, unverified. Checked for 2027. Stored before: Maths AA or Maths AI HL 6 (critical); English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx59rf001p7m8puaqqvx4y',
      status: 'current',
      name: 'Mathematics (Joint Honours)',
      description:
        'Mathematics is a broad and diverse subject which is used to model, analyse and understand several applications in the physical and biological sciences, engineering, management science, economics and finance. Its numerous applications are naturally interwoven with the underlying theory which is essential in developing one’s logical reasoning, quantitative skills and problem-solving techniques.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/mathematics-jh/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/mathematics-jh/'
      ],
      notes:
        'Content 4.6: Mathematics as a Joint Honours subject (B.A.). Requirement: "HL 6 in Mathematics"; the stored Maths AA or AI HL 6 (critical) already matched. Trinity accepts both Analysis and Approaches and Applications and Interpretation, but "for courses with a Higher Level Mathematics requirement we strongly recommend Mathematics: Analysis and Approaches at HL as this is likely to be a mandatory requirement". Joint Honours (MT). Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Maths AA or Maths AI HL 6 (critical); English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5f4p002p7m8pijo51llc',
      status: 'current',
      name: 'Medicinal Chemistry (Chemical Sciences)',
      description:
        'Medicinal chemists are the creative talent behind the modern pharmaceutical industry. As well as being expert chemists, they have extensive knowledge of molecular design, drug synthesis, and the biological function of drugs.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/medicinal-chemistry-chemical-sciences/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        {
          courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI', 'GEOG', 'CS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/medicinal-chemistry-chemical-sciences/'
      ],
      notes:
        'Content 4.6: Medicinal Chemistry is a strand of Chemical Sciences, B.Sc. for 2027 (the 2026 course page says B.A. (Moderatorship)), chosen after entry. Prospectus notes 1 and 2. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. Sciences: note 2, "Two higher level grade 4s (grade Cs at A Level, IB HL grade 5s) from the following subjects: physics, chemistry, biology, physics/chemistry, mathematics, geology, geography, applied mathematics, agricultural science, computer science", stored as one critical group of the IB courses among them (Physics, Chemistry, Biology, Maths AA or AI, Geography, Computer Science) at HL 5. The model cannot hold "two of"; it is in these notes. From 2028 Chemical Sciences asks for Maths HL 5 and one of Biology, Physics or Chemistry at HL 5 (the prospectus alert list). TR061 Chemical Sciences, CAO points 542 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Chemistry HL 5 (critical); Biology or Computer Science or Geography or Physics HL 5; Maths AA or Maths AI SL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "Bachelor of Medicine, Bachelor of Surgery, Bachelor of Obstetrics".
    {
      id: 'cmkkx5i5c00417m8pjo5ycjze',
      status: 'current',
      name: 'Medicine',
      description:
        'Medicine is a unique course in that students study a broad range of subjects with the primary goal of understanding the science and practice of healing. Medicine and healthcare are constantly evolving as new knowledge and therapies emerge to prevent and treat illness. Each day brings a new patient with new healthcare challenges.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Medicine and Bachelor of Surgery',
      duration: '5 years',
      minIBPoints: 38,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/medicine/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true },
        {
          anyOf: [
            { course: 'PHYS', level: 'SL', grade: 1 },
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'SL', grade: 5 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/medicine/'
      ],
      notes:
        'Content 4.6: Medicine (M.B., B.Ch., B.A.O., 5 years). Prospectus notes 3A and 3B: "IB HL grade 6 and grade 5" in two of physics, chemistry, biology; without "some qualification in physics", mathematics at "IB SL grade 5". Leaving Certificate applicants need at least 480 points, and EU applicants sit HPAT-Ireland (February 2027). Stored as Biology, Chemistry or Physics at HL 6 and again at HL 5, both critical (the model cannot hold "two of": one subject at HL 6 meets both rows), and Physics at any level or Maths AA or AI SL 5, one critical group ("some qualification in physics" is stored as Physics SL 1, as 4.1 stored UCL\'s "Physics at HL or SL"). TR051, CAO points 739 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 38 is kept, unverified. Checked for 2027. Stored before: Biology or Chemistry or Physics HL 6 (critical); Biology or Chemistry or Physics HL 5; English A Language and Literature SL 4; Maths AA or Maths AI SL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5gzf003h7m8pyyk21h1t',
      status: 'current',
      name: 'Microbiology (Biological and Biomedical Sciences)',
      description:
        'If you study Microbiology at Trinity you will be based in the historic Moyne Institute. The Microbiology department offers an intimate atmosphere where frequent interaction between staff and students fosters an intellectually stimulating and friendly environment for teaching and learning. To provide the extensive laboratory experience on offer, the Moyne Institute houses state of the art research and teaching laboratories containing all the equipment and expertise required for modern molecular and cellular microbiology.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/microbiology-biological-and-biomedical-sciences/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        {
          courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI', 'GEOG', 'CS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/microbiology-biological-and-biomedical-sciences/'
      ],
      notes:
        'Content 4.6: Microbiology is a strand of Biological and Biomedical Sciences, B.Sc. for 2027 (the 2026 course page says B.A. (Moderatorship)), chosen after entry. Prospectus notes 1 and 2. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. Sciences: note 2, "Two higher level grade 4s (grade Cs at A Level, IB HL grade 5s) from the following subjects: physics, chemistry, biology, physics/chemistry, mathematics, geology, geography, applied mathematics, agricultural science, computer science", stored as one critical group of the IB courses among them (Physics, Chemistry, Biology, Maths AA or AI, Geography, Computer Science) at HL 5. The model cannot hold "two of"; it is in these notes. From 2028 the sciences narrow (the prospectus alert list). TR060 Biological and Biomedical Sciences, CAO points 553 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Biology or Chemistry HL 5 (critical); English A Literature or English A Language and Literature SL 4; Maths AA or Maths AI SL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "Bachelor of Science in Midwifery".
    {
      id: 'cmkkx5l8n005v7m8pxglz3wxm',
      status: 'current',
      name: 'Midwifery',
      description:
        'The term ‘midwife’ means ‘with woman’. As a midwife, you will be helping women and their families at one of the most crucial times of their lives, supporting the woman during pregnancy, childbirth and the post-natal period. Midwives play a vital role in promoting and maintaining health, facilitating normal childbirth and helping women make informed choices about their care. The midwife is the key professional providing continuity of care and promoting choice and control to women in pregnancy and birth, and to women and their babies following birth.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/midwifery/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'PHYS', 'CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/midwifery/'
      ],
      notes:
        'Content 4.6: Midwifery (B.Sc. (A.Obs.), 4 years); "not open to non-EU applicants". Health screening and Garda vetting apply. Prospectus note 12: "a grade C/5 in Mathematics and in one of biology, physics, chemistry at GCSE level or IB SL grade 4", stored as Maths AA or AI SL 4 and Biology, Physics or Chemistry SL 4, both critical (they were not critical). TR913, CAO points 500 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 32 is kept, unverified. Checked for 2027. Stored before: Biology or Chemistry or Physics SL 4; English A Literature or English A Language and Literature SL 4; Maths AA or Maths AI SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5ham003n7m8p10y696y1',
      status: 'current',
      name: 'Molecular Medicine (Biological and Biomedical Sciences)',
      description:
        'Trinity Biomedical Sciences Institute is equipped with state-of-the-art technologies and provides a rich research environment for interdisciplinary collaboration with colleagues in medicine, pharmacy, chemistry and neuroscience while the Trinity Translational Medicine Institute (TTMI) operates from St James’s Hospital and is affiliated with the teaching hospitals of Naas General Hospital and Our Lady’s Hospice. In the area of biotechnology and biomedical research, Trinity has prioritised the areas of Immunology and Infection, Cancer, Neuroscience and Genetics – all of which are key components of the Molecular Medicine degree. Immunology at Trinity is externally recognised as an area of major research strength and the School of Biochemistry and Immunology at Trinity provides an excellent environment for young investigators to participate in innovative and high impact research. The schools research success is evident in their strong publication record which includes output in high quality journals including Nature.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/molecular-medicine-biological-and-biomedical-sciences/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        {
          courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI', 'GEOG', 'CS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/molecular-medicine-biological-and-biomedical-sciences/'
      ],
      notes:
        'Content 4.6: Molecular Medicine is a strand of Biological and Biomedical Sciences, B.Sc. for 2027 (the 2026 course page says B.A. (Moderatorship)), chosen after entry. Prospectus notes 1 and 2. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. Sciences: note 2, "Two higher level grade 4s (grade Cs at A Level, IB HL grade 5s) from the following subjects: physics, chemistry, biology, physics/chemistry, mathematics, geology, geography, applied mathematics, agricultural science, computer science", stored as one critical group of the IB courses among them (Physics, Chemistry, Biology, Maths AA or AI, Geography, Computer Science) at HL 5. The model cannot hold "two of"; it is in these notes. From 2028 the sciences narrow (the prospectus alert list). TR060 Biological and Biomedical Sciences, CAO points 553 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Biology or Chemistry HL 5 (critical); English A Literature or English A Language and Literature SL 4; Maths AA or Maths AI SL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5rl7008j7m8pqhk3hhts',
      status: 'current',
      name: 'Music',
      description:
        'Music is a discipline that stretches back to the ancient world. One of the seven original liberal arts, music maintains a place in the university as a subject of broad and passionate interest to composers, musicologists, performers, technologists, and theorists.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/music/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/music/'
      ],
      notes:
        'Content 4.6: Music (B.A.). Formal musical training is "desirable" but "not a prerequisite". Specific subjects required: "none"; only the minimum entry applies. TR002, CAO points 472 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5feg002t7m8phe9ekpvb',
      status: 'current',
      name: 'Nanoscience (Chemical Sciences)',
      description:
        'Nanoscience is the study of materials and devices at the nanoscale (<100 nm), a scale at which many exotic properties and behaviours come to the fore, leading to applications including advanced catalysis, biomedical imaging, batteries, and solar cells among many others. Nanoscience thus encompasses the design, synthesis, characterisation, testing, and use of such materials and devices, and lies at the interface of Chemistry and Physics.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/nanoscience-chemical-sciences/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        {
          courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI', 'GEOG', 'CS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/nanoscience-chemical-sciences/'
      ],
      notes:
        'Content 4.6: Nanoscience is a strand of Chemical Sciences, B.Sc. for 2027 (the 2026 course page says B.A. (Moderatorship)), chosen after entry. Prospectus notes 1 and 2. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. Sciences: note 2, "Two higher level grade 4s (grade Cs at A Level, IB HL grade 5s) from the following subjects: physics, chemistry, biology, physics/chemistry, mathematics, geology, geography, applied mathematics, agricultural science, computer science", stored as one critical group of the IB courses among them (Physics, Chemistry, Biology, Maths AA or AI, Geography, Computer Science) at HL 5. The model cannot hold "two of"; it is in these notes. From 2028 Chemical Sciences asks for Maths HL 5 and one of Biology, Physics or Chemistry at HL 5 (the prospectus alert list). TR061 Chemical Sciences, CAO points 542 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Biology or Chemistry or Computer Science HL 5; English A Language and Literature SL 4; Maths AA or Maths AI SL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "Bachelor of Science in Nursing".
    {
      id: 'cmkkx5ksk005j7m8pokfqv6ye',
      status: 'current',
      name: 'Nursing - General',
      description:
        'The role of the nurse is to provide evidence-based, culturally sensitive care in order to assist the individual to lead an independent, healthy lifestyle, overcome ill health or experience a peaceful death. The nurse achieves this through working as part of a professional multidisciplinary team to provide primary healthcare, acute hospital care, community and home and continuing care, based on individual and population health needs across the lifespan.\n\nStudents of nursing learn about caring and the complexities of health and illness through interactive teaching and learning strategies in the classroom and the healthcare environment. Practice (clinical and community) experience provides the student with opportunities to integrate the art and science of nursing and promotes the development of caring relationships with patients/service users and their families/significant others.\n\nThe four-year nursing courses (Children’s and General integrated is 4.5 years) are offered in partnership with seven health service providers. Trinity’s linked health service providers for this course are:',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/nursing---general-nursing/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'PHYS', 'CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/nursing---general-nursing/'
      ],
      notes:
        'Content 4.6: General Nursing (B.Sc. (Cur.), 4 years). Health screening and Garda vetting apply. Prospectus note 12: "a grade C/5 in Mathematics and in one of biology, physics, chemistry at GCSE level or IB SL grade 4", stored as Maths AA or AI SL 4 and Biology, Physics or Chemistry SL 4, both critical (they were not critical). TR091, CAO points 423 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 32 is kept, unverified. Checked for 2027. Stored before: Biology or Chemistry or Physics SL 4; English A Literature or English A Language and Literature SL 4; Maths AA or Maths AI SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5ina004f7m8pzmools02',
      status: 'current',
      name: 'Pharmacy',
      description:
        'Pharmacy is the study of all aspects of drugs, both natural and synthetic in origin, including their chemistry, their uses in medicines, and how they work within the body. Pharmacists work in a variety of settings – community pharmacies, hospitals, long-term care facilities, and within the pharmaceutical industry, to name just a few. In many respects, their role as a key healthcare professional is to help people achieve the best results from their medications.',
      field: 'Medicine & Health',
      degree: 'Master of Pharmacy',
      duration: '5 years',
      minIBPoints: 36,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/pharmacy/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
        {
          courses: ['PHYS', 'BIO', 'MATH-AA', 'MATH-AI', 'GEOG', 'CS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/pharmacy/'
      ],
      notes:
        'Content 4.6: Pharmacy (B.Sc. (Pharm.) and M.Pharm., 5 years, or 4 for the B.Sc. only). Prospectus notes 1 and 9. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. Note 9: "a higher level grade 4 in chemistry or physics/chemistry and a higher level grade 4 in one of physics, biology, mathematics, geology, geography, applied mathematics, agricultural science and computer science (grade C at A Level: IB HL grade 5)". Stored: Chemistry HL 5 and Physics, Biology, Maths AA or AI, Geography or Computer Science HL 5, both critical (the second was not critical and held only Biology and Physics). TR072, CAO points 601 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 36 is kept, unverified. Checked for 2027. Stored before: Chemistry HL 5 (critical); Biology or Physics HL 5; English A Literature or English A Language and Literature SL 4; Maths AA or Maths AI SL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5o76007l7m8pd8aix1lf',
      status: 'current',
      name: 'Philosophy, Political Science, Economics and Sociology',
      description:
        'Philosophy, Political Science, Economics and Sociology (PPES), offers a coherent and integrated introduction to the study of social sciences and philosophy. It brings together some of the most important approaches to understanding society and, in doing so, develops skills for a range of future careers and activities.\n\nCentral to the programme is the analysis of social and human phenomena through the lens of several complementary disciplines and analytical frameworks. By allowing a gradual specialisation over the course of the four-year degree programme, students ultimately obtain an excellent grounding in one, or at most two, of the disciplines which comprise the course.\n\nParticularly appealing is the complementarity across the PPES disciplines. For example, while the well-publicised rise in inequality has economic origins, it has political and sociological ramifications. Moreover, the question of whether to address it is ultimately a philosophical one. A training in PPES enables students to analyse such issues rigorously and comprehensively. As such, it provides an excellent training in analytical thinking, a skill highly prized by employers.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://www.tcd.ie/courses/undergraduate/courses/philosophy-political-science-economics-and-sociology/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/philosophy-political-science-economics-and-sociology/'
      ],
      notes:
        'Content 4.6: Philosophy, Political Science, Economics and Sociology (PPES, B.A.). Prospectus note 1. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. It was not critical. TR015, CAO points 581 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 37 is kept, unverified. Checked for 2027. Stored before: English A Literature or English A Language and Literature SL 4; Maths AA or Maths AI SL 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5bzm00217m8p0mi5y4gi',
      status: 'current',
      name: 'Physical Sciences',
      description:
        'Physical Sciences (TR063) at Trinity is a four year degree programme for students who like to solve problems. Whether it is studying galaxies, examining the potential of new lasers or investigating next generation nanomaterials, this degree pathway will prepare you for a lifelong career of solving problems in research, industry or business.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/physical-sciences/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS', 'CHEM', 'BIO', 'GEOG', 'CS'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/physical-sciences/'
      ],
      notes:
        'Content 4.6: Physical Sciences (B.Sc., common entry to Physics, Physics and Astrophysics, and Nanoscience). The prospectus alert list, for 2027 admission: mathematics rises from "International Baccalaureate SL 5 to Leaving Cert H3, A-Level B or International Baccalaureate HL6", and the two science subjects stay at "International Baccalaureate HL5" but agricultural science is no longer accepted: "Physics, Applied Mathematics, Chemistry, Biology, Physics with Chemistry, Geography and Computer Science". Stored: Maths AA or AI HL 6 and Physics, Chemistry, Biology, Geography or Computer Science HL 5, both critical (they were not critical). The model cannot hold "two of"; it is in these notes. TR063, CAO points 521 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Biology or Chemistry or Computer Science or Physics HL 5; Maths AA or Maths AI HL 6; English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19.
    {
      id: 'cmkkx5crq00237m8pkwhx34zn',
      status: 'current',
      name: 'Physics (Physical Sciences)',
      description:
        'Physics is the study of the laws of the universe, how these function at our everyday classical scales, at smaller quantum scales of atoms, nuclei and fundamental particles, of electrons and photons in vacuum, in materials, in devices and nanostructures, of complex collective behaviours, and how these laws act over the immense scales of stars and vast distances of the universe. Physics encompasses all of this and more.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/physics-physical-sciences/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS', 'CHEM', 'BIO', 'GEOG', 'CS'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/physics-physical-sciences/'
      ],
      notes:
        'Content 4.6: Physics is a strand of Physical Sciences (B.Sc.), chosen after entry. The prospectus alert list, for 2027 admission: mathematics rises to "International Baccalaureate HL6", and the two sciences stay at "International Baccalaureate HL5" from "Physics, Applied Mathematics, Chemistry, Biology, Physics with Chemistry, Geography and Computer Science". Stored: Maths AA or AI HL 6 and Physics, Chemistry, Biology, Geography or Computer Science HL 5, both critical (they were not critical). The model cannot hold "two of"; it is in these notes. TR063 Physical Sciences, CAO points 521 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 34 is kept, unverified. Checked for 2027. Stored before: Biology or Chemistry or Computer Science or Physics HL 5; Maths AA or Maths AI HL 6; English A Literature or English A Language and Literature SL 4.'
    },
    // Stored: checked for 2026 entry on 2026-01-19. Degree stored as "Bachelor of Science in Physiotherapy".
    {
      id: 'cmkkx5lol00677m8pypbobwbt',
      status: 'current',
      name: 'Physiotherapy',
      description:
        'Physiotherapy (also known as physical therapy) places full and functional movement at the heart of what it means to be healthy. It involves treating patients of all ages with a range of illnesses and conditions, including those with back and neck problems, sports injuries, arthritis, or those recovering from strokes and operations. The focus of treatment is exercise prescription. Physiotherapists may be part of a multidisciplinary medical team or work from clinics or specialise in particular areas of the discipline.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 35,
      programUrl: 'https://www.tcd.ie/courses/undergraduate/courses/physiotherapy/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
        {
          courses: ['PHYS', 'CHEM', 'BIO', 'MATH-AA', 'MATH-AI'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.tcd.ie/study/assets/PDF/Trinity_Undergraduate_Prospectus_2027.pdf',
        'https://www.tcd.ie/study/apply/admission-requirements/undergraduate/',
        'https://www.tcd.ie/courses/undergraduate/courses/physiotherapy/'
      ],
      notes:
        'Content 4.6: Physiotherapy (B.Sc. (Physio), 4 years). Prospectus notes 1 and 6. Maths: prospectus note 1, "IB grade 5 at SL level (maths studies not sufficient)", stored as Maths AA or AI SL 5, critical. Note 6: "Two higher level grade 4s (grade Cs at A Level; IB HL grade 5s) from the following subjects: physics, chemistry, biology, physics/chemistry, mathematics, agricultural science", stored once as a critical group (it was stored twice, which the model reads as one subject meeting both). Health screening and Garda vetting apply. TR053, CAO points 567 in 2025. Trinity\'s Undergraduate Prospectus 2027 (dated 23 September 2026; "Admission Requirements 2027", "Course Requirements 2027", with an International Baccalaureate column) gives the subject requirements; the course page gives the same for 2026 entry. Minimum entry with the IB (Trinity\'s undergraduate admission requirements page): "3 subjects at grade 5 at Higher Level and 3 subjects at grade 4 at Standard Level, to include English, mathematics and another language", in one sitting. Where the course asks for no more maths, that minimum is stored as Maths AA or AI SL 4, critical; the language other than English, which every Diploma includes, is not stored. English: the prospectus accepts "English A1, A2 or B: SL4 if presenting IB through English, HL5 if presenting through French or Spanish" as proof of English, stored not critical (English A or B SL 4), as 3.4 stored UCD\'s. Trinity publishes no IB points total for 2027: EU applicants are ranked on CAO points, to which the IB converts (30 = 420, 36 = 496, 42 = 566, 45 = 600), and non-EU applicants are assessed individually. The stored 35 is kept, unverified. Checked for 2027. Stored before: Biology or Chemistry or Maths AA or Maths AI or Physics HL 5 (critical); Biology or Chemistry or Maths AA or Maths AI or Physics HL 5; Maths AA or Maths AI SL 5.'
    }
  ]
}

export default refresh
