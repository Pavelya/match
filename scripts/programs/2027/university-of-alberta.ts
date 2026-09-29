import type { RefreshFile } from '../lib/refresh'

/**
 * University of Alberta: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-alberta
 */
const refresh: RefreshFile = {
  university: 'University of Alberta',
  entryYear: 2027,
  checkedOn: '2026-09-29',
  programs: [
    // Stored: not checked for any intake. Degree stored as "Bachelor of Commerce (Bilingual)".
    {
      id: 'cmk8hz2y6001d7m6px1lwnd6m',
      status: 'current',
      name: 'Affaires Internationales (Bilingual)',
      description:
        'This bilingual program combines business education with French language proficiency, preparing students for careers in international business environments where French is used. Students develop both business acumen and advanced language skills.',
      field: 'Business & Economics',
      degree: 'Bachelor of Commerce',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bilingual-bachelor-of-commerce-affaires-internationales.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['FRA-LIT', 'FRA-LL', 'FRA-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bilingual-bachelor-of-commerce-affaires-internationales.html'
      ],
      notes:
        'Content 4.3: Campus Saint-Jean, bilingual Bachelor of Commerce. Not direct entry: "This program does not allow admission directly from high school"; students first complete one pre-professional year (24 units, including English, economics, mathematics, statistics and French). The program\'s own high-school requirements are stored. Admission subjects: English Language Arts 30-1, a French course (Français 30-1 or 30-2, French 30-9Y, French 31, French Language Arts 30-1 or 30-2), Mathematics 30-1, and two more subjects. French A or B (HL/SL) is French 30 in the chart; the stored Maths AA only is widened to AA or AI HL. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 30 lies inside that range; with no figure for this program, it is kept, not re-verified. The pages name no entry year, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Arts (Honors)".
    {
      id: 'cmk8hza4e003r7m6pt6brts5v',
      status: 'current',
      name: 'Anthropology (Honors)',
      description:
        'The Honors program in Anthropology explores human diversity across cultures and time periods. Students study cultural anthropology, archaeology, and biological anthropology, developing research skills for understanding human societies.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-with-honors-anthropology.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-with-honors-foundation-year.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-with-honors-anthropology.html'
      ],
      notes:
        'Content 4.3: Not direct entry: "High School applicants are admitted to the BA Honors Foundation Year", which needs "a minimum application average of 85% on the required five admission subjects" (IB 5 converts to 82%, 6 to 90%); students choose the honors major at the end of that year, against the Faculty of Arts\' chart of major requirements. The Foundation Year\'s admission subjects: English Language Arts 30-1 and four more from broad categories; only English is named. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 28 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The pages name no entry year, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hz7rw002j7m6pijb6ipkr',
      status: 'current',
      name: 'Art and Design',
      description:
        'The Art and Design major offers seven areas of study including industrial design, fine arts, and art history. From learning about socially responsible and sustainable design to exploring contemporary issues through visual art, you will have the opportunity to customize your educational experience to your interests and passions.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-art-and-design.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-art-and-design.html'
      ],
      notes:
        'Content 4.3: Faculty of Arts, Edmonton. Admission subjects: English Language Arts 30-1 and four more from Fine Arts, Humanities, Languages other than English and Math/Sciences; only English is named. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 26 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzk5a00a37m6pv6j7m09n',
      status: 'current',
      name: 'Astrophysics',
      description:
        'Astrophysics applies physics principles to study celestial objects and phenomena. Students learn about stars, galaxies, cosmology, and observational techniques.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-astrophysics.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-astrophysics.html'
      ],
      notes:
        'Content 4.3: The stored Maths AA HL 6 and Physics HL 5 have no source: U of A names no level or grade beyond 4. Faculty of Science, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, two of Biology 30, Chemistry 30, Physics 30, Mathematics 31 or Computing Science (advanced CTS), and one more subject. Stored: English, Maths (AA, or AI HL) and one critical group of Biology, Chemistry and Physics; the model cannot hold "two of" (as in 4.1), and Maths AA as Math 31 is already the Maths row. IB Computer Science counts only as a "Science 30-level" course in the chart, not as Computing Science, so it is not in the group. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 34 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzei3006j7m6povg1z0ua',
      status: 'current',
      name: 'Biochemistry',
      description:
        'Biochemistry explores the chemical processes within and relating to living organisms. Students study proteins, enzymes, metabolic pathways, and molecular biology, preparing for careers in research, biotechnology, or healthcare.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-biochemistry.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-biochemistry.html'
      ],
      notes:
        'Content 4.3: Faculty of Science, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, two of Biology 30, Chemistry 30, Physics 30, Mathematics 31 or Computing Science (advanced CTS), and one more subject. Stored: English, Maths (AA, or AI HL) and one critical group of Biology, Chemistry and Physics; the model cannot hold "two of" (as in 4.1), and Maths AA as Math 31 is already the Maths row. IB Computer Science counts only as a "Science 30-level" course in the chart, not as Computing Science, so it is not in the group. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 32 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Science (Honors)".
    {
      id: 'cmk8hzf06006v7m6padtqvqm0',
      status: 'current',
      name: 'Biochemistry (Honors)',
      description:
        'The Honors program in Biochemistry provides intensive research training and advanced coursework for students planning graduate study or research careers in biochemistry, molecular biology, or related fields.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-biochemistry.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-biochemistry.html'
      ],
      notes:
        'Content 4.3: Faculty of Science, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, two of Biology 30, Chemistry 30, Physics 30, Mathematics 31 or Computing Science (advanced CTS), and one more subject. Stored: English, Maths (AA, or AI HL) and one critical group of Biology, Chemistry and Physics; the model cannot hold "two of" (as in 4.1), and Maths AA as Math 31 is already the Maths row. IB Computer Science counts only as a "Science 30-level" course in the chart, not as Computing Science, so it is not in the group. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 34 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hz24h000x7m6pqzkpyrep',
      status: 'current',
      name: 'Business Economics and Law',
      description:
        'This major incorporates courses on both Economics and Law, examining the economic and legal aspects of business and how they combine to create the environment in which firms operate.',
      field: 'Business & Economics',
      degree: 'Bachelor of Commerce',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-commerce-business-economics-and-law.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-commerce-business-economics-and-law.html'
      ],
      notes:
        'Content 4.3: Alberta School of Business, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1 and three more from broad categories. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 30 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hz2j100157m6pr9tjvh5a',
      status: 'current',
      name: 'Business Studies',
      description:
        "Keep your options open and explore the many facets of business with a major in Business Studies. You'll take courses from all areas within the Bachelor of Commerce degree, from accounting and finance to marketing and retail.",
      field: 'Business & Economics',
      degree: 'Bachelor of Commerce',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-commerce-business-studies.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-commerce-business-studies.html'
      ],
      notes:
        'Content 4.3: Alberta School of Business, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1 and three more from broad categories. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 30 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hz08n00017m6p94cqg9b4',
      status: 'current',
      name: 'Business Technology Management',
      description:
        'Business Technology Management (BTM) is about applying information technology to manage and analyze operations and solve business problems. Knowledge of information technology is essential to modern management, and majoring in BTM will provide the capability to manage information systems or to assist senior management in its information technology strategy.',
      field: 'Business & Economics',
      degree: 'Bachelor of Commerce',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-commerce-business-technology-management.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-commerce-business-technology-management.html'
      ],
      notes:
        'Content 4.3: Alberta School of Business, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1 and three more from broad categories. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 30 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzcxk005h7m6pfnbd14me',
      status: 'current',
      name: 'Chemical and Physical Sciences',
      description:
        'This program provides a strong foundation in both chemistry and physics, preparing students for careers in research, industry, or further graduate study in materials science, chemical physics, or related fields.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-chemical-and-physical-sciences.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-chemical-and-physical-sciences.html'
      ],
      notes:
        'Content 4.3: Augustana Campus, Camrose. Admission subjects: English Language Arts 30-1, Mathematics 30-1, Chemistry 30, one of Biology 30, Physics 30 or Science 30, and one more subject. Science 30 has no IB equivalent in the chart, so the group is Biology or Physics. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 32 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Science in Engineering".
    {
      id: 'cmk8hzleo00at7m6pb82akbtc',
      status: 'current',
      name: 'Chemical Engineering',
      description:
        'Chemical engineers play an important role in society, finding new ways to convert raw materials into finished products and make improvements to daily life. Note: This is a non-direct entry program. Students must first complete the foundational/qualifying first year of Engineering.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-in-chemical-engineering-chemical-engineering.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-in-engineering-qualifying-year.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-in-chemical-engineering-chemical-engineering.html'
      ],
      notes:
        'Content 4.3: Not direct entry: students are admitted to the Engineering Qualifying Year and choose the discipline at its end. Its admission subjects: English Language Arts 30-1, Mathematics 30-1, Mathematics 31, Chemistry 30 and Physics 30. Only Maths AA is equivalent to Math 31 in the chart, so Maths is stored as AA (SL or HL); the chart lists AA against both Math 30-1 and Math 31. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. The stored Maths AA HL 5 and Physics HL 5 have no source. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 32 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Science in Engineering".
    {
      id: 'cmk8hzlwy00b57m6pi778xwk0',
      status: 'current',
      name: 'Chemical Engineering - Computer Process Control',
      description:
        'Built around the Chemical Engineering core program. Additional specialized courses will help to develop your skills as a process control and systems engineer. Note: This is a non-direct entry program.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-in-chemical-engineering-computer-process-control-chemical-engineering-computer-process-control.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-in-engineering-qualifying-year.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-in-chemical-engineering-computer-process-control-chemical-engineering-computer-process-control.html'
      ],
      notes:
        'Content 4.3: Not direct entry: students are admitted to the Engineering Qualifying Year and choose the discipline at its end. Its admission subjects: English Language Arts 30-1, Mathematics 30-1, Mathematics 31, Chemistry 30 and Physics 30. Only Maths AA is equivalent to Math 31 in the chart, so Maths is stored as AA (SL or HL); the chart lists AA against both Math 30-1 and Math 31. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. The stored Maths AA HL 5 and Physics HL 5 have no source. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 32 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Science (Honors)".
    {
      id: 'cmk8hzfwp007f7m6p7q1afdk5',
      status: 'current',
      name: 'Computing Science - Software Practice (Honors)',
      description:
        'This specialization within Honors Computing Science focuses on software engineering practices, including software design, development methodologies, and professional software development skills.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-computing-science-software-practice-option.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-computing-science-software-practice-option.html'
      ],
      notes:
        'Content 4.3: The stored Maths AA HL 6 has no source. Faculty of Science, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, two of Biology 30, Chemistry 30, Physics 30, Mathematics 31 or Computing Science (advanced CTS), and one more subject. Stored: English, Maths (AA, or AI HL) and one critical group of Biology, Chemistry and Physics; the model cannot hold "two of" (as in 4.1), and Maths AA as Math 31 is already the Maths row. IB Computer Science counts only as a "Science 30-level" course in the chart, not as Computing Science, so it is not in the group. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 34 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Science (Honors)".
    {
      id: 'cmk8hzfic00777m6p0f7rk105',
      status: 'current',
      name: 'Computing Science (Honors)',
      description:
        'The Honors Computing Science program provides comprehensive training in computer science theory and practice, preparing students for graduate study or careers in software development, research, and technology leadership.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-computing-science.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-computing-science.html'
      ],
      notes:
        'Content 4.3: The stored Maths AA HL 6 has no source. Faculty of Science, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, two of Biology 30, Chemistry 30, Physics 30, Mathematics 31 or Computing Science (advanced CTS), and one more subject. Stored: English, Maths (AA, or AI HL) and one critical group of Biology, Chemistry and Physics; the model cannot hold "two of" (as in 4.1), and Maths AA as Math 31 is already the Maths row. IB Computer Science counts only as a "Science 30-level" course in the chart, not as Computing Science, so it is not in the group. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 34 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzb94004b7m6p945f6uii',
      status: 'current',
      name: 'Computing Science and Mathematics',
      description:
        'The computing science and mathematics program at Augustana builds foundational knowledge in Python and Java to prepare you for further study in other programming languages, as well as the areas of software engineering, operating systems, computer organization and architecture, algorithms, artificial intelligence, databases, networks, parallel programming and computing theory.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-computing-science-and-mathematics.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-computing-science-and-mathematics.html'
      ],
      notes:
        'Content 4.3: Augustana Campus, Camrose. Admission subjects: English Language Arts 30-1, Mathematics 30-1, one more mathematics or science course (Mathematics 31, Biology 30, Chemistry 30, Physics 30, Science 30, Computing Science or a second Mathematics 30 course), and two more subjects. Stored as English, Maths and one of Biology, Chemistry or Physics; a second IB maths course is not possible, and IB Computer Science counts only as "Science 30-level" in the chart. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 24 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Arts in Criminology".
    {
      id: 'cmk8hz84o002p7m6p8bdhct3m',
      status: 'current',
      name: 'Criminology',
      description:
        'Criminology focuses on causes of criminal behaviour, labeling of behaviours as criminal, changing definitions of deviance and crime, and social responses to it. Students complete two field placements involving supervised work experience in a relevant criminal justice setting, stressing practical applications of criminological theory.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-in-criminology-criminology.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-in-criminology-criminology.html'
      ],
      notes:
        'Content 4.3: Faculty of Arts, Edmonton. Admission subjects: English Language Arts 30-1 and four more from Fine Arts, Humanities, Languages other than English and Math/Sciences; only English is named. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 32 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Science (Honors)".
    {
      id: 'cmk8hzhtj008n7m6pmy6cdyaq',
      status: 'current',
      name: 'Ecology, Evolution and Environmental Biology (Honors)',
      description:
        'This Honors program focuses on ecological and evolutionary processes at scales from genes to ecosystems. Students gain research experience in field and laboratory settings.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-ecology-evolution-and-environmental-biology.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-ecology-evolution-and-environmental-biology.html'
      ],
      notes:
        'Content 4.3: Faculty of Science, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, two of Biology 30, Chemistry 30, Physics 30, Mathematics 31 or Computing Science (advanced CTS), and one more subject. Stored: English, Maths (AA, or AI HL) and one critical group of Biology, Chemistry and Physics; the model cannot hold "two of" (as in 4.1), and Maths AA as Math 31 is already the Maths row. IB Computer Science counts only as a "Science 30-level" course in the chart, not as Computing Science, so it is not in the group. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 32 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hz451001n7m6p2axdazas',
      status: 'current',
      name: 'Economics',
      description:
        'Economics studies how a society manages, produces, and distributes its wealth. By studying economics, you will develop analytical skills to help you evaluate the costs and benefits associated with any action. You will be exposed to a blend of theory and methodology courses that will help you learn the analytical tools necessary to evaluate and solve complex problems.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-economics.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-economics.html'
      ],
      notes:
        'Content 4.3: Faculty of Arts, Edmonton. Admission subjects: English Language Arts 30-1 and four more from Fine Arts, Humanities, Languages other than English and Math/Sciences; only English is named. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. The stored Maths AA SL 5 (critical) is removed: the BA names no maths. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 28 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzbuz004r7m6plrngzgiw',
      status: 'current',
      name: 'Environmental Science',
      description:
        'The environmental science program at Augustana focuses on the natural sciences and offers an outdoor or experiential education component, giving you a connection to the physical environment. Students explore ecology, conservation, and environmental monitoring.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-environmental-science.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-environmental-science.html'
      ],
      notes:
        'Content 4.3: Augustana Campus, Camrose. Admission subjects: English Language Arts 30-1, Mathematics 30-1, Biology 30, Chemistry 30 and one more subject. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 24 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hz72500277m6p7gb0uln3',
      status: 'current',
      name: 'Film Studies',
      description:
        'In less than a century, films have become one of the most important influences on our society. Film studies explores the history, theory, aesthetics, cultural values, and effects of film, television, and digital media through the close analysis of individual works.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-film-studies.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-film-studies.html'
      ],
      notes:
        'Content 4.3: Faculty of Arts, Edmonton. Admission subjects: English Language Arts 30-1 and four more from Fine Arts, Humanities, Languages other than English and Math/Sciences; only English is named. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 26 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hz0r500097m6pgeuu96ri',
      status: 'current',
      name: 'Finance',
      description:
        'Finance is a broad area of study, and our program provides you with a solid foundation for a variety of business careers, including banking, investments and portfolio management, mergers and acquisitions, corporate finance, international finance, securities trading, and financial markets.',
      field: 'Business & Economics',
      degree: 'Bachelor of Commerce',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-commerce-finance.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-commerce-finance.html'
      ],
      notes:
        'Content 4.3: Alberta School of Business, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1 and three more from broad categories. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 30 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzdfl005t7m6p9eobc122',
      status: 'current',
      name: 'General Sciences/Secondary Education',
      description:
        'The General Sciences program provides flexibility for students interested in exploring multiple science disciplines before specializing. Students can combine courses across biology, chemistry, physics, and earth sciences.',
      field: 'Natural Sciences',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-general-sciences.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-general-sciences.html'
      ],
      notes:
        'Content 4.3: The page is "General Sciences/Secondary Education", a five-year combined program that grants a Bachelor of Science and a Bachelor of Education, so the name, the degree (from "Bachelor of Science") and the duration (from 4 years) change. Augustana Campus, Camrose, for three years, then two at North Campus, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, Biology 30, Chemistry 30 and one more subject. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 30 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzjn1009r7m6pbyi3to7c',
      status: 'current',
      name: 'Geology',
      description:
        'Geology studies the Earth, including its structure, composition, and history. Students learn about rocks, minerals, fossils, and geological processes, preparing for careers in resource exploration or environmental consulting.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-geology.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-geology.html'
      ],
      notes:
        'Content 4.3: Faculty of Science, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, two of Biology 30, Chemistry 30, Physics 30, Mathematics 31 or Computing Science (advanced CTS), and one more subject. Stored: English, Maths (AA, or AI HL) and one critical group of Biology, Chemistry and Physics; the model cannot hold "two of" (as in 4.1), and Maths AA as Math 31 is already the Maths row. IB Computer Science counts only as a "Science 30-level" course in the chart, not as Computing Science, so it is not in the group. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 30 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Arts (Honors)".
    {
      id: 'cmk8hz8yb00357m6pme74948k',
      status: 'current',
      name: 'History (Honors)',
      description:
        'The Honors program in History provides intensive training in historical research and writing. Students explore political, social, cultural, and economic history across regions and periods, developing critical analysis and research skills for graduate study or professional careers.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-with-honors-history.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-with-honors-foundation-year.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-with-honors-history.html'
      ],
      notes:
        'Content 4.3: Not direct entry: "High School applicants are admitted to the BA Honors Foundation Year", which needs "a minimum application average of 85% on the required five admission subjects" (IB 5 converts to 82%, 6 to 90%); students choose the honors major at the end of that year, against the Faculty of Arts\' chart of major requirements. The Foundation Year\'s admission subjects: English Language Arts 30-1 and four more from broad categories; only English is named. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 28 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The pages name no entry year, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Arts (Honors)".
    {
      id: 'cmk8hz9b7003b7m6pkvmicvhz',
      status: 'current',
      name: 'Human Geography (Honors)',
      description:
        'The Honors program in Human Geography explores the spatial dimensions of human societies, including urban development, economic geography, political geography, and cultural landscapes. Students develop skills in GIS, mapping, and spatial analysis.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-with-honors-human-geography.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-with-honors-foundation-year.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-with-honors-human-geography.html'
      ],
      notes:
        'Content 4.3: Not direct entry: "High School applicants are admitted to the BA Honors Foundation Year", which needs "a minimum application average of 85% on the required five admission subjects" (IB 5 converts to 82%, 6 to 90%); students choose the honors major at the end of that year, against the Faculty of Arts\' chart of major requirements. The Foundation Year\'s admission subjects: English Language Arts 30-1 and four more from broad categories; only English is named. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 28 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The pages name no entry year, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hz1q6000p7m6pj1lrwg7k',
      status: 'current',
      name: 'Human Resources Management',
      description:
        'Managing people is one of the most challenging and important aspects of business. This program will train you to diagnose problems, develop solutions, and formulate effective implementation and evaluation strategies for hiring, training, recruitment, and more.',
      field: 'Business & Economics',
      degree: 'Bachelor of Commerce',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-commerce-human-resources-management.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-commerce-human-resources-management.html'
      ],
      notes:
        'Content 4.3: Alberta School of Business, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1 and three more from broad categories. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 30 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzgaz007n7m6prsz41n4k',
      status: 'current',
      name: 'Immunology and Infection',
      description:
        'This program focuses on the immune system and infectious diseases. Students study immunology, microbiology, and host-pathogen interactions, preparing for careers in research, public health, or biomedical fields.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-immunology-and-infection.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-immunology-and-infection.html'
      ],
      notes:
        'Content 4.3: Faculty of Science, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, two of Biology 30, Chemistry 30, Physics 30, Mathematics 31 or Computing Science (advanced CTS), and one more subject. Stored: English, Maths (AA, or AI HL) and one critical group of Biology, Chemistry and Physics; the model cannot hold "two of" (as in 4.1), and Maths AA as Math 31 is already the Maths row. IB Computer Science counts only as a "Science 30-level" course in the chart, not as Computing Science, so it is not in the group. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 32 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzcf200557m6pxhb6lz5a',
      status: 'current',
      name: 'Integrative Biology',
      description:
        'Integrative Biology enhances scientific assessment skills through hands-on learning in evolution, function, and development across cells, organisms, and ecosystems. Students study the integration of biological systems from molecular to ecosystem levels.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-integrative-biology.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-integrative-biology.html'
      ],
      notes:
        'Content 4.3: Augustana Campus, Camrose. Admission subjects: English Language Arts 30-1, Mathematics 30-1, Biology 30, Chemistry 30 and one more subject. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 32 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hznjc00c97m6pazepyg00',
      status: 'current',
      name: 'Management and Business Economics',
      description:
        'A direct-entry program combining traditional business management with a broad arts and science foundation, covering economics, finance, accounting, and marketing. The program is offered at the Augustana campus with smaller class sizes.',
      field: 'Business & Economics',
      degree: 'Bachelor of Management',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-management-management.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-management-management.html'
      ],
      notes:
        'Content 4.3: Augustana Campus, Camrose. Admission subjects: English Language Arts 30-1, Mathematics 30-1 or 30-2, and three more subjects. Any IB maths course meets the maths subject (AI SL is Math 30-2). Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 26 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hz19n000h7m6pjk48oxth',
      status: 'current',
      name: 'Marketing',
      description:
        'Marketing acts as a link to customers, providing external perspective, steering innovation and growth, and driving revenue, value, and loyalty. The program combines research-based principles with innovative teaching methods, managerial cases, group projects, and market simulations.',
      field: 'Business & Economics',
      degree: 'Bachelor of Commerce',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-commerce-marketing.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-commerce-marketing.html'
      ],
      notes:
        'Content 4.3: Alberta School of Business, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1 and three more from broad categories. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 30 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Arts (Honors)".
    {
      id: 'cmk8hzagy003x7m6pki0sjyzy',
      status: 'current',
      name: 'Mathematics (Honors)',
      description:
        'The Honors program in Mathematics provides rigorous training in pure and applied mathematics, preparing students for graduate study or careers requiring advanced mathematical skills.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-with-honors-mathematics.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-with-honors-foundation-year.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-with-honors-mathematics.html'
      ],
      notes:
        'Content 4.3: Not direct entry: "High School applicants are admitted to the BA Honors Foundation Year", which needs "a minimum application average of 85% on the required five admission subjects" (IB 5 converts to 82%, 6 to 90%); students choose the honors major at the end of that year, against the Faculty of Arts\' chart of major requirements. The Foundation Year\'s admission subjects: English Language Arts 30-1 and four more from broad categories; only English is named. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. The stored Maths AA HL 5 (critical) is removed: the Foundation Year names no maths. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 30 lies inside that range; with no figure for this program, it is kept, not re-verified. The pages name no entry year, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Science (Honors)".
    {
      id: 'cmk8hzkln00ad7m6pky8pqlat',
      status: 'current',
      name: 'Mathematics and Economics (Honors)',
      description:
        'This joint Honors program combines rigorous mathematics training with economics, preparing students for graduate study in economics or quantitative finance.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-mathematics-and-economics.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-mathematics-and-economics.html'
      ],
      notes:
        'Content 4.3: The stored Maths AA HL 6 has no source. Faculty of Science, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, two of Biology 30, Chemistry 30, Physics 30, Mathematics 31 or Computing Science (advanced CTS), and one more subject. Stored: English, Maths (AA, or AI HL) and one critical group of Biology, Chemistry and Physics; the model cannot hold "two of" (as in 4.1), and Maths AA as Math 31 is already the Maths row. IB Computer Science counts only as a "Science 30-level" course in the chart, not as Computing Science, so it is not in the group. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 34 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Science (Honors)".
    {
      id: 'cmk8hzl0300al7m6pl5vpfede',
      status: 'current',
      name: 'Mathematics and Finance (Honors)',
      description:
        'This joint Honors program combines mathematics with finance, preparing students for careers in quantitative finance, risk management, and financial technology.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-mathematics-and-finance.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-mathematics-and-finance.html'
      ],
      notes:
        'Content 4.3: Not direct entry: "This program does not allow admission directly from high school"; students enter Year 2 with a 3.0 GPA in first-year Economics, Mathematics, Statistics and English courses. The program\'s own high-school requirements, stored here, are Science\'s. Faculty of Science, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, two of Biology 30, Chemistry 30, Physics 30, Mathematics 31 or Computing Science (advanced CTS), and one more subject. Stored: English, Maths (AA, or AI HL) and one critical group of Biology, Chemistry and Physics; the model cannot hold "two of" (as in 4.1), and Maths AA as Math 31 is already the Maths row. IB Computer Science counts only as a "Science 30-level" course in the chart, not as Computing Science, so it is not in the group. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 34 lies inside that range; with no figure for this program, it is kept, not re-verified. The pages name no entry year, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzis000997m6ptm5bt3g2',
      status: 'current',
      name: 'Mathematics-Physics',
      description:
        'This joint major combines advanced training in mathematics and physics, ideal for students interested in theoretical physics, applied mathematics, or mathematical physics.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-mathematics-physics.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-mathematics-physics.html'
      ],
      notes:
        'Content 4.3: The stored Maths AA HL 6 and Physics HL 5 have no source. Faculty of Science, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, two of Biology 30, Chemistry 30, Physics 30, Mathematics 31 or Computing Science (advanced CTS), and one more subject. Stored: English, Maths (AA, or AI HL) and one critical group of Biology, Chemistry and Physics; the model cannot hold "two of" (as in 4.1), and Maths AA as Math 31 is already the Maths row. IB Computer Science counts only as a "Science 30-level" course in the chart, not as Computing Science, so it is not in the group. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 34 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hz7f1002d7m6pcoy76sv4',
      status: 'current',
      name: 'Media Studies',
      description:
        'The Media Studies degree is designed to be multidisciplinary. Create your own learning experience across areas of interest that intersect with the study of media: political science or psychology, literary or language studies, and visual art or music.',
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-media-studies.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-media-studies.html'
      ],
      notes:
        'Content 4.3: Faculty of Arts, Edmonton. Admission subjects: English Language Arts 30-1 and four more from Fine Arts, Humanities, Languages other than English and Math/Sciences; only English is named. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 26 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzdzk00677m6pv2lzyu9z',
      status: 'current',
      name: 'Medical Laboratory Science',
      description:
        'This program prepares students for careers as medical laboratory technologists, performing diagnostic tests and analyses in clinical laboratories. Students learn clinical chemistry, hematology, microbiology, and immunology.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-science-medical-laboratory-science.html',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false },
        { courses: ['MATH-AA'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: [],
      notes:
        'Content 4.3, not checked, for the owner: "This program does not allow admission directly from high school." Applicants need 30 units of pre-professional university study (English, general and organic chemistry, cell and molecular biology, statistics and more), a 2.7 GPA, a letter of intent and an interview; Grade 12 English, Biology, Chemistry and Mathematics 30-1 are only recommended. No IB requirement exists to record. Keep, or remove it from an IB-entry database? Source: https://www.ualberta.ca/en/undergraduate-programs/bachelor-science-medical-laboratory-science.html'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzgt2007z7m6pgz33or9s',
      status: 'current',
      name: 'Molecular, Cellular and Developmental Biology',
      description:
        'This program explores life at the molecular and cellular level, including genetics, cell biology, and developmental processes. Students gain skills in laboratory research and scientific analysis.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-molecular-cellular-and-developmental-biology.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-molecular-cellular-and-developmental-biology.html'
      ],
      notes:
        'Content 4.3: Faculty of Science, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, two of Biology 30, Chemistry 30, Physics 30, Mathematics 31 or Computing Science (advanced CTS), and one more subject. Stored: English, Maths (AA, or AI HL) and one critical group of Biology, Chemistry and Physics; the model cannot hold "two of" (as in 4.1), and Maths AA as Math 31 is already the Maths row. IB Computer Science counts only as a "Science 30-level" course in the chart, not as Computing Science, so it is not in the group. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 32 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Science (Honors)".
    {
      id: 'cmk8hzhbc008b7m6p2ck9o92i',
      status: 'current',
      name: 'Molecular, Cellular and Developmental Biology (Honors)',
      description:
        'The Honors program provides intensive research training in molecular biology, cell biology, and developmental biology for students planning graduate study or research careers.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-molecular-cellular-and-developmental-biology.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-molecular-cellular-and-developmental-biology.html'
      ],
      notes:
        'Content 4.3: Faculty of Science, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, two of Biology 30, Chemistry 30, Physics 30, Mathematics 31 or Computing Science (advanced CTS), and one more subject. Stored: English, Maths (AA, or AI HL) and one critical group of Biology, Chemistry and Physics; the model cannot hold "two of" (as in 4.1), and Maths AA as Math 31 is already the Maths row. IB Computer Science counts only as a "Science 30-level" course in the chart, not as Computing Science, so it is not in the group. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 34 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzr4300e77m6pqo2hg6ys',
      status: 'current',
      name: 'Music - Performance Based Pedagogy',
      description:
        'Combines performance training with pedagogical skills for aspiring music educators. Students develop expertise in their primary instrument while learning effective teaching methodologies.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Music',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-music-performance-based-pedagogy.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-music-performance-based-pedagogy.html'
      ],
      notes:
        'Content 4.3: Augustana Campus, Camrose. Bachelor of Music. Admission subjects: English Language Arts 30-1 and four more from broad categories; only English is named. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 26 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzrgw00ed7m6pm71pc3y2',
      status: 'current',
      name: 'Music Education - Elementary',
      description:
        'Prepares students to teach music at the elementary school level. Students develop musical skills and knowledge of music education methods appropriate for young learners.',
      field: 'Education',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-music-education-music-elementary.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-music-education-music-elementary.html'
      ],
      notes:
        'Content 4.3: The page is the Bachelor of Music/Bachelor of Education (Elementary), a five-year combined program that grants both degrees, so the degree (from "Bachelor of Music Education") and the duration (from 4 years) change. Admission subjects: English Language Arts 30-1 and four more from broad categories; only English is named. Admission also needs an audition and a theory placement exam, which the model cannot hold. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 26 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Science in Nursing".
    {
      id: 'cmk8hzmef00bh7m6po480jjf1',
      status: 'current',
      name: 'Nursing',
      description:
        'A four-year program providing comprehensive training in a world-class clinical setting with patient simulation and clinical placements starting in the first semester. Students develop skills in patient care, health assessment, and professional nursing practice.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-in-nursing-nursing.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-in-nursing-nursing.html'
      ],
      notes:
        'Content 4.3: Faculty of Nursing, Edmonton (BScN Collaborative). Admission subjects: English Language Arts 30-1, Biology 30, Chemistry 30 or Science 30, Mathematics 30-1, 30-2 or 31, and one more subject. Science 30 has no IB equivalent in the chart, so Chemistry is stored; any IB maths course meets the maths subject. Offers are made in rounds; students must be 18 before their second year. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. The stored Biology at HL is corrected to SL. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 34 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Science (Honors)".
    {
      id: 'cmk8hzi9w008x7m6pajiofur5',
      status: 'current',
      name: 'Pharmacology (Honors)',
      description:
        'This program studies how drugs affect living systems. Students learn about drug mechanisms, pharmacokinetics, and toxicology, preparing for careers in pharmaceutical research or healthcare.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-pharmacology.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-honors-pharmacology.html'
      ],
      notes:
        'Content 4.3: Faculty of Science, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, two of Biology 30, Chemistry 30, Physics 30, Mathematics 31 or Computing Science (advanced CTS), and one more subject. Stored: English, Maths (AA, or AI HL) and one critical group of Biology, Chemistry and Physics; the model cannot hold "two of" (as in 4.1), and Maths AA as Math 31 is already the Maths row. IB Computer Science counts only as a "Science 30-level" course in the chart, not as Computing Science, so it is not in the group. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 34 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzmz500bv7m6pjv448ncy',
      status: 'current',
      name: 'Physical Activity and Health',
      description:
        'Focuses on the importance of physical activity for health and well-being across the lifespan, emphasizing biological, psychological, and sociological factors. Students learn about exercise science, health promotion, and physical activity programming.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Kinesiology',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-kinesiology-physical-activity-and-health.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        {
          courses: ['BIO', 'CHEM', 'PHYS', 'MATH-AA', 'MATH-AI'],
          level: 'SL',
          grade: 4,
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-kinesiology-physical-activity-and-health.html'
      ],
      notes:
        'Content 4.3: Faculty of Kinesiology, Sport, and Recreation, Edmonton. Admission subjects: English Language Arts 30-1, one mathematics or science course (Biology 30, Chemistry 30, Physics 30, Science 30, Mathematics 30-1, 30-2 or 31, Computing Science), and three more subjects. Stored as English and one of Biology, Chemistry, Physics or any IB maths, which every Diploma meets through its maths course. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 28 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hz5e3001v7m6pw497p34s',
      status: 'current',
      name: 'Political Science',
      description:
        'Political science is the study of power and governance. You will have the opportunity to learn from award-winning teachers and leading international researchers who will challenge you to think broadly about power and the responsibilities of engaged citizenship. Courses include democracy, citizenship, and law; municipal, provincial, and federal politics; politics of gender and health; and international politics.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-political-science.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-political-science.html'
      ],
      notes:
        'Content 4.3: Faculty of Arts, Edmonton. Admission subjects: English Language Arts 30-1 and four more from Fine Arts, Humanities, Languages other than English and Math/Sciences; only English is named. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 26 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Arts (Honors)".
    {
      id: 'cmk8hz9o5003h7m6p5cink8h9',
      status: 'current',
      name: 'Psychology (Honors)',
      description:
        'The Honors program in Psychology provides in-depth study of human behavior, cognition, and mental processes. Students gain advanced training in research methods and statistics, preparing for graduate studies in psychology or related fields.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-with-honors-psychology.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-with-honors-foundation-year.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-with-honors-psychology.html'
      ],
      notes:
        'Content 4.3: Not direct entry: "High School applicants are admitted to the BA Honors Foundation Year", which needs "a minimum application average of 85% on the required five admission subjects" (IB 5 converts to 82%, 6 to 90%); students choose the honors major at the end of that year, against the Faculty of Arts\' chart of major requirements. The Foundation Year\'s admission subjects: English Language Arts 30-1 and four more from broad categories; only English is named. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. The stored Maths (AA or AI, SL 4, not critical) is removed. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 28 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The pages name no entry year, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hz8hv002v7m6p3oij8cqa',
      status: 'current',
      name: 'Psychology and Mental Health',
      description:
        'Located at the Augustana campus, this degree allows students to understand and use different worldviews and theories to account for psychological phenomena. It offers two streams: mental health and well-being (arts-based) or brain and behaviour (science-based). Students also obtain a co-curricular certificate in Mental Health First Aid or Community Engagement.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-psychology-and-mental-health.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-psychology-and-mental-health.html'
      ],
      notes:
        'Content 4.3: Augustana Campus, Camrose. Admission subjects: English Language Arts 30-1, Mathematics 30-1 or 30-2, and three more subjects. Any IB maths course meets the maths subject (AI SL is Math 30-2). Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 24 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzavg00457m6pkvr0srgg',
      status: 'current',
      name: 'Science, Technology and Society',
      description:
        'This program examines the relationships between science, technology, and society from historical, philosophical, and sociological perspectives. Students analyze how scientific and technological developments shape and are shaped by social contexts.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-science-technology-and-society.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-science-technology-and-society.html'
      ],
      notes:
        'Content 4.3: Faculty of Arts, Edmonton. Admission subjects: English Language Arts 30-1 and four more from Fine Arts, Humanities, Languages other than English and Math/Sciences; only English is named. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 26 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzp5d00d57m6pdf8nh5f2',
      status: 'current',
      name: 'Secondary Education - Chemistry',
      description:
        'Prepares students to teach chemistry at the secondary school level. Students develop content expertise in chemistry alongside pedagogical training.',
      field: 'Education',
      degree: 'Bachelor of Education',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-chemistry.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-chemistry.html'
      ],
      notes:
        'Content 4.3: Faculty of Education, Edmonton, secondary route. Admission subjects: English Language Arts 30-1 and four more from broad categories; only English is named. The page adds that Mathematics 30-2 may be used for admission, though Mathematics 30-1 is a prerequisite for some required courses. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. The stored Chemistry HL 5 (critical) and Maths AA SL 5 are removed: admission names neither. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 30 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzqaq00dr7m6pht9qjgpu',
      status: 'current',
      name: 'Secondary Education - CTS Communication Arts',
      description:
        'Prepares students to teach Career and Technology Studies with a focus on communication arts, including journalism, broadcasting, and digital media.',
      field: 'Education',
      degree: 'Bachelor of Education',
      duration: '4 years',
      minIBPoints: 28,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-career-and-technology-studies-communication-arts.html',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }],
      checkedFor: null,
      sources: [],
      notes:
        'Content 4.3, not checked, for the owner: "This program does not allow admission directly from high school" ("There is no admission directly from high school"). Applicants need a relevant journey certification, degree, or two-year certificate or diploma in the Career and Technology Studies major, and a 2.0 AGPA. No IB requirement exists to record. Keep, or remove it from an IB-entry database? Source: https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-career-and-technology-studies-communication-arts.html'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzpy200dl7m6pe3f4jtnt',
      status: 'current',
      name: 'Secondary Education - CTS Design',
      description:
        'Prepares students to teach Career and Technology Studies with a focus on design thinking, visual communication, and product design.',
      field: 'Education',
      degree: 'Bachelor of Education',
      duration: '4 years',
      minIBPoints: 28,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-career-and-technology-studies-design.html',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }],
      checkedFor: null,
      sources: [],
      notes:
        'Content 4.3, not checked, for the owner: "This program does not allow admission directly from high school" ("There is no admission directly from high school"). Applicants need a relevant journey certification, degree, or two-year certificate or diploma in the Career and Technology Studies major, and a 2.0 AGPA. No IB requirement exists to record. Keep, or remove it from an IB-entry database? Source: https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-career-and-technology-studies-design.html'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzple00df7m6pw4ktd5xc',
      status: 'current',
      name: 'Secondary Education - CTS Media',
      description:
        'Prepares students to teach Career and Technology Studies with a focus on media production, digital communication, and multimedia technologies.',
      field: 'Media',
      degree: 'Bachelor of Education',
      duration: '4 years',
      minIBPoints: 28,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-career-and-technology-studies-media.html',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }],
      checkedFor: null,
      sources: [],
      notes:
        'Content 4.3, not checked, for the owner: "This program does not allow admission directly from high school" ("There is no admission directly from high school"). Applicants need a relevant journey certification, degree, or two-year certificate or diploma in the Career and Technology Studies major, and a 2.0 AGPA. No IB requirement exists to record. Keep, or remove it from an IB-entry database? Source: https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-career-and-technology-studies-media.html'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzqnh00dx7m6ptjdz7hks',
      status: 'current',
      name: 'Secondary Education - CTS Natural Resources',
      description:
        'Prepares students to teach Career and Technology Studies with a focus on natural resources, agriculture, and environmental stewardship.',
      field: 'Education',
      degree: 'Bachelor of Education',
      duration: '4 years',
      minIBPoints: 28,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-career-and-technology-studies-natural-resources.html',
      requirements: [
        { courses: ['BIO', 'CHEM'], level: 'SL', grade: 5, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: [],
      notes:
        'Content 4.3, not checked, for the owner: "This program does not allow admission directly from high school" ("There is no admission directly from high school"). Applicants need a relevant journey certification, degree, or two-year certificate or diploma in the Career and Technology Studies major, and a 2.0 AGPA. No IB requirement exists to record. Keep, or remove it from an IB-entry database? Source: https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-career-and-technology-studies-natural-resources.html'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzoc800cp7m6pommci0lt',
      status: 'current',
      name: 'Secondary Education - Drama',
      description:
        'Prepares students to teach drama and theatre arts at the secondary school level. Students develop skills in performance, directing, and theatre production alongside pedagogical training.',
      field: 'Education',
      degree: 'Bachelor of Education',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-drama.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-drama.html'
      ],
      notes:
        'Content 4.3: Faculty of Education, Edmonton, secondary route. Admission subjects: English Language Arts 30-1 and four more from broad categories; only English is named. The page adds that Mathematics 30-2 may be used for admission, though Mathematics 30-1 is a prerequisite for some required courses. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 28 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hznzm00cj7m6p0zlp6lat',
      status: 'current',
      name: 'Secondary Education - Physical Education',
      description:
        'Prepares students to teach physical education at the secondary school level. Students develop expertise in movement education, health promotion, and coaching, along with pedagogical skills for the classroom.',
      field: 'Education',
      degree: 'Bachelor of Education',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-physical-education.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-physical-education.html'
      ],
      notes:
        'Content 4.3: Faculty of Education, Edmonton, secondary route. Admission subjects: English Language Arts 30-1 and four more from broad categories; only English is named. The page adds that Mathematics 30-2 may be used for admission, though Mathematics 30-1 is a prerequisite for some required courses. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 28 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzop200cv7m6pdq6xzr1h',
      status: 'current',
      name: 'Secondary Education - Physics',
      description:
        'Prepares students to teach physics at the secondary school level. Students develop deep content knowledge in physics alongside pedagogical training for effective science instruction.',
      field: 'Education',
      degree: 'Bachelor of Education',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-physics.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-education-in-secondary-education-physics.html'
      ],
      notes:
        'Content 4.3: Faculty of Education, Edmonton, secondary route. Admission subjects: English Language Arts 30-1 and four more from broad categories; only English is named. The page adds that Mathematics 30-2 may be used for admission, though Mathematics 30-1 is a prerequisite for some required courses. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. The stored Physics HL 5 (critical) and Maths AA HL 5 are removed: admission names neither. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 30 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hz6c700217m6ppyshzd7z',
      status: 'current',
      name: 'Sociology',
      description:
        'Sociology is the study of the social forces that shape various identities, relations, and practices, such as race, inequality, health, education, family, class, and culture. Our program offers courses on interrelated facets of social life, including gender and sexuality, race and racism, deviance and conformity, justice, religion, and natural and built environments.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-sociology.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-arts-sociology.html'
      ],
      notes:
        'Content 4.3: Faculty of Arts, Edmonton. Admission subjects: English Language Arts 30-1 and four more from Fine Arts, Humanities, Languages other than English and Math/Sciences; only English is named. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 26 is below the lowest competitive score it reports for any program, so 30, the bottom of that range, is stored. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmk8hzj8h009j7m6p5eh8f6bb',
      status: 'current',
      name: 'Statistics',
      description:
        'The Statistics major provides training in statistical theory and methods, including probability, inference, regression, and data analysis. Graduates are prepared for careers in data science, research, and industry.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-statistics.html',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL', 'ENG-B'], level: 'SL', grade: 4, critical: true },
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
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/index.html',
        'https://www.ualberta.ca/en/admissions/how-to-apply/ib-students/ib-high-school-course-equivalencies.html',
        'https://www.ualberta.ca/en/undergraduate-programs/bachelor-of-science-with-major-statistics.html'
      ],
      notes:
        'Content 4.3: Faculty of Science, Edmonton. Admission subjects: English Language Arts 30-1, Mathematics 30-1, two of Biology 30, Chemistry 30, Physics 30, Mathematics 31 or Computing Science (advanced CTS), and one more subject. Stored: English, Maths (AA, or AI HL) and one critical group of Biology, Chemistry and Physics; the model cannot hold "two of" (as in 4.1), and Maths AA as Math 31 is already the Maths row. IB Computer Science counts only as a "Science 30-level" course in the chart, not as Computing Science, so it is not in the group. Each Alberta course is read through U of A\'s IB equivalents chart: English A or B (HL/SL) is English Language Arts 30-1; Maths AA (HL/SL) is Math 30-1 or Math 31, Maths AI HL is Math 30-1 and Maths AI SL is Math 30-2; Biology, Chemistry and Physics (HL/SL) are Biology 30, Chemistry 30 and Physics 30. Full-Diploma candidates must present six IB courses, five of them the required subjects, with "no grade less than 4", so every required subject is stored at 4. The remaining admission subjects are open choices from broad categories that any Diploma meets, and are not stored. U of A publishes no IB points figure per program. Its IB page asks full-Diploma candidates for "a competitive diploma score with no grade less than 4. Previous competitive scores range from 30-37 points depending on your program." The stored 32 lies inside that range; with no figure for this program, it is kept, not re-verified. The program page gives "Admissions Requirements for 2026 - 2027", September 2026 entry; 2027-28 requirements are not published yet, so checked for 2026.'
    }
  ]
}

export default refresh
