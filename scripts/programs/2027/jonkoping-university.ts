import type { RefreshFile } from '../lib/refresh'

/**
 * Jönköping University: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts jonkoping-university
 */
const refresh: RefreshFile = {
  university: 'Jönköping University',
  entryYear: 2027,
  checkedOn: '2026-10-02',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmm6dbc4p000rl804u78orw8k',
      status: 'current',
      name: 'International Economics',
      description:
        'Do you want to understand how the world economy works — and how to make a real impact within it? This programme equips you with strong analytical skills, advanced knowledge of economics, and the ability to use data and digital tools to address today’s most pressing challenges in business and society.\n\nHow competitive: in the 2026 second admissions round, where students finishing the IB that year apply, places awarded on grades went to applicants with a merit rating from 18.33 out of 22.5: 35 IB points, or 29 with the full 2.5 merit points Sweden adds for languages and mathematics. Some second-round places go on the Swedish Scholastic Aptitude Test (högskoleprovet), which is in Swedish.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://ju.se/en/study-at-ju/our-programmes/bachelor-programmes/international-economics-autumn-2027-ku103.html',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 3 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://ju.se/en/study-at-ju/application-and-admission/how-to-apply---bachelors/specific-country-requirements.html',
        'https://ju.se/en/study-at-ju/our-programmes/bachelor-programmes/international-economics-autumn-2027-ku103.html',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/',
        'https://www.uhr.se/studier-och-antagning/antagningsstatistik/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/du-provas-i-betygsurvalet/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/meritpoang/'
      ],
      notes:
        'Content 4.8: the stored autumn-2026 page now 404s. For Autumn 2027 JU lists the programme as "International Economics" (application code HJ-KU103, Jönköping International Business School): Degree of Bachelor of Science in Business and Economics with a major in Economics, 180 credits. It asks general entry requirements plus Mathematics 3b or 3c, Civics 1b or 1a1+1a2 and English 6. UHR\'s IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. JU\'s own IB table agrees. The stored English grade 3 was below UHR\'s minimum of 4 and is raised. Selection: the converted IB total (grades), with the Swedish aptitude test for part of the places in the national round. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. Content 5.4 Part A (27 October 2026): the description\'s last paragraph, "How competitive", gives the 2026 cut-offs: second round HJ-52103, BI 18.33 (aptitude-test group PJ 1.10). The first round splits places into groups ABI and BBI, which Jönköping does not define on its pages, so the description leaves it out: HJ-KU103, ABI 18.15, BBI 18.65. IB applicants with only the Diploma compete in group BI (antagning.se, "Du prövas i betygsurvalet", 29 September 2026); the IB total converts on antagning.se\'s table (24 = 13.18, 43-45 = 20.00) and up to 2.5 merit points are added for languages and mathematics (antagning.se, "Meritpoäng"), so each figure is given without merit points and with all 2.5. Statistics from UHR (uhr.se antagningsstatistik, term HT26; the first round is IKHT26, the second HT2026, read at its final selection, urval 2). Update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm6d83rw0001l8046k5fpje3',
      status: 'current',
      name: 'International Management',
      description:
        'Do you want a global career in business? This programme combines a strong foundation in business and economics with an international outlook, entrepreneurial mindset, and the skills to succeed in today’s dynamic global environment. Whether you aim to work for a multinational company, start your own venture, or continue with a master’s degree, you will graduate with the tools and confidence to reach your goals.\n\nHow competitive: in the 2026 second admissions round, where students finishing the IB that year apply, places awarded on grades went to applicants with a merit rating from 17.70 out of 22.5: 33 IB points, or 27 with the full 2.5 merit points Sweden adds for languages and mathematics. Some second-round places go on the Swedish Scholastic Aptitude Test (högskoleprovet), which is in Swedish.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://ju.se/en/study-at-ju/our-programmes/bachelor-programmes/international-management-autumn-2027-ku101.html',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 3 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://ju.se/en/study-at-ju/application-and-admission/how-to-apply---bachelors/specific-country-requirements.html',
        'https://ju.se/en/study-at-ju/our-programmes/bachelor-programmes/international-management-autumn-2027-ku101.html',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/',
        'https://www.uhr.se/studier-och-antagning/antagningsstatistik/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/du-provas-i-betygsurvalet/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/meritpoang/'
      ],
      notes:
        'Content 4.8: the stored autumn-2026 page now 404s. For Autumn 2027 JU lists the programme as "International Management" (application code HJ-KU101, Jönköping International Business School): Degree of Bachelor of Science in Business and Economics with a major in Business Administration, 180 credits. It asks general entry requirements plus Mathematics 3b or 3c, Civics 1b or 1a1+1a2 and English 6. UHR\'s IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. JU\'s own IB table agrees. The stored English grade 3 was below UHR\'s minimum of 4 and is raised. Selection: the converted IB total (grades), with the Swedish aptitude test for part of the places in the national round. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. Content 5.4 Part A (27 October 2026): the description\'s last paragraph, "How competitive", gives the 2026 cut-offs: second round HJ-52101, BI 17.70 (aptitude-test group PJ 0.95). The first round splits places into groups ABI and BBI, which Jönköping does not define on its pages, so the description leaves it out: HJ-KU101, ABI 15.97, BBI 11.88. IB applicants with only the Diploma compete in group BI (antagning.se, "Du prövas i betygsurvalet", 29 September 2026); the IB total converts on antagning.se\'s table (24 = 13.18, 43-45 = 20.00) and up to 2.5 merit points are added for languages and mathematics (antagning.se, "Meritpoäng"), so each figure is given without merit points and with all 2.5. Statistics from UHR (uhr.se antagningsstatistik, term HT26; the first round is IKHT26, the second HT2026, read at its final selection, urval 2). Update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm6d9rxd000el804jnuhk83h',
      status: 'current',
      name: 'International Marketing',
      description:
        'Do you want to understand customers, build brands, and shape business in a global context? This programme combines a solid foundation in business and economics with specialised knowledge in marketing, strategy, and communication. You will gain the skills to analyse markets, engage customers, and drive growth in today’s fast-changing international environment.\n\nHow competitive: in the 2026 second admissions round, where students finishing the IB that year apply, places awarded on grades went to applicants with a merit rating from 17.26 out of 22.5: 32 IB points, or 27 with the full 2.5 merit points Sweden adds for languages and mathematics. Some second-round places go on the Swedish Scholastic Aptitude Test (högskoleprovet), which is in Swedish.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://ju.se/en/study-at-ju/our-programmes/bachelor-programmes/international-marketing-autumn-2027-ku102.html',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 3 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://ju.se/en/study-at-ju/application-and-admission/how-to-apply---bachelors/specific-country-requirements.html',
        'https://ju.se/en/study-at-ju/our-programmes/bachelor-programmes/international-marketing-autumn-2027-ku102.html',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/',
        'https://www.uhr.se/studier-och-antagning/antagningsstatistik/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/du-provas-i-betygsurvalet/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/meritpoang/'
      ],
      notes:
        'Content 4.8: the stored autumn-2026 page now 404s. For Autumn 2027 JU lists the programme as "International Marketing" (application code HJ-KU102, Jönköping International Business School): Degree of Bachelor of Science in Business and Economics with a major in Business Administration, 180 credits. It asks general entry requirements plus Mathematics 3b or 3c, Civics 1b or 1a1+1a2 and English 6. UHR\'s IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. JU\'s own IB table agrees. The stored English grade 3 was below UHR\'s minimum of 4 and is raised. Selection: the converted IB total (grades), with the Swedish aptitude test for part of the places in the national round. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. Content 5.4 Part A (27 October 2026): the description\'s last paragraph, "How competitive", gives the 2026 cut-offs: second round HJ-52102, BI 17.26 (aptitude-test group PJ 0.80). The first round splits places into groups ABI and BBI, which Jönköping does not define on its pages, so the description leaves it out: HJ-KU102, ABI 15.17, BBI every qualified applicant. IB applicants with only the Diploma compete in group BI (antagning.se, "Du prövas i betygsurvalet", 29 September 2026); the IB total converts on antagning.se\'s table (24 = 13.18, 43-45 = 20.00) and up to 2.5 merit points are added for languages and mathematics (antagning.se, "Meritpoäng"), so each figure is given without merit points and with all 2.5. Statistics from UHR (uhr.se antagningsstatistik, term HT26; the first round is IKHT26, the second HT2026, read at its final selection, urval 2). Update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm6aav0j0003jo04p9n6eevd',
      status: 'current',
      name: 'Graphic Design and Web Development',
      description:
        'Want to shape the new media landscape? This programme combines graphic design, programming and web design with marketing communication and User Experience Design. The programme gives you a broad understanding and all the prerequisites to find your place in the digital world.',
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://ju.se/en/study-at-ju/our-programmes/bachelor-programmes/graphic-design-and-web-development-autumn-2027-ku018.html',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 3, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://ju.se/en/study-at-ju/application-and-admission/how-to-apply---bachelors/specific-country-requirements.html',
        'https://ju.se/en/study-at-ju/our-programmes/bachelor-programmes/graphic-design-and-web-development-autumn-2027-ku018.html',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/',
        'https://www.uhr.se/studier-och-antagning/antagningsstatistik/'
      ],
      notes:
        'Content 4.8: moved from the autumn-2026 page (now 404) to Autumn 2027 (application code HJ-KU018, School of Engineering): Degree of Bachelor of Science with a major in Informatics, 180 credits. It asks general entry requirements plus Mathematics 2a, 2b or 2c and English 6. UHR\'s IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. JU\'s own table gives Maths AI SL 3 for Mathematics 2a; Maths AA counts too, since AA SL 3 is Mathematics 3c. The stored English group (English B HL 5, English A SL 3) and Maths AI only are replaced. Selection: the converted IB total (grades), with the Swedish aptitude test for part of the places in the national round. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. Content 5.4 Part A (27 October 2026): examined, no "How competitive" paragraph: offered in the first round only in 2026 (HJ-KU018), where Jönköping splits places into groups ABI (21.21, 3 admitted) and BBI (17.08, 15 admitted) without saying on its pages which applicants each holds. Left for the owner.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm6ahxat0006l704n4cf2j58',
      status: 'current',
      name: 'Industrial Engineering and Management: Sustainable Supply Chain Management',
      description:
        'Do you want to contribute to a more sustainable future? This program offers a broad education in industrial economics and organisation, with a focus on sustainable supply chains. Upon graduation, you will be well-equipped for an international career in logistics and sustainability.\n\nHow competitive: in the 2026 second admissions round, where students finishing the IB that year apply, places awarded on grades went to applicants with a merit rating from 19.57 out of 22.5: 40 IB points, or 31 with the full 2.5 merit points Sweden adds for languages and mathematics. Some second-round places go on the Swedish Scholastic Aptitude Test (högskoleprovet), which is in Swedish.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://ju.se/en/study-at-ju/our-programmes/bachelor-programmes/industrial-engineering-and-management-sustainable-supply-chain-management-autumn-2027-ku019.html',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 3 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://ju.se/en/study-at-ju/application-and-admission/how-to-apply---bachelors/specific-country-requirements.html',
        'https://ju.se/en/study-at-ju/our-programmes/bachelor-programmes/industrial-engineering-and-management-sustainable-supply-chain-management-autumn-2027-ku019.html',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/',
        'https://www.uhr.se/studier-och-antagning/antagningsstatistik/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/du-provas-i-betygsurvalet/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/meritpoang/'
      ],
      notes:
        'Content 4.8: moved from the autumn-2026 page (now 404) to Autumn 2027 (application code HJ-KU019, School of Engineering): Degree of Bachelor of Science in Industrial Engineering and Management, 180 credits. It asks general entry requirements plus Mathematics 3b and English 6. UHR\'s IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. JU\'s own IB table agrees. The stored English grade 3 was below UHR\'s minimum of 4 and is raised. Selection: the converted IB total (grades), with the Swedish aptitude test for part of the places in the national round. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. Content 5.4 Part A (27 October 2026): the description\'s last paragraph, "How competitive", gives the 2026 cut-offs: second round HJ-52567, BI 19.57 (aptitude-test group PJ 1.05). The first round splits places into groups ABI and BBI, which Jönköping does not define on its pages, so the description leaves it out: HJ-KU019, ABI 20.48, BBI 17.40. IB applicants with only the Diploma compete in group BI (antagning.se, "Du prövas i betygsurvalet", 29 September 2026); the IB total converts on antagning.se\'s table (24 = 13.18, 43-45 = 20.00) and up to 2.5 merit points are added for languages and mathematics (antagning.se, "Meritpoäng"), so each figure is given without merit points and with all 2.5. Statistics from UHR (uhr.se antagningsstatistik, term HT26; the first round is IKHT26, the second HT2026, read at its final selection, urval 2). Update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm6dcdib0014l8047bz9dbcz',
      status: 'current',
      name: 'Prosthetics and Orthotics, BSc',
      description:
        'Do you want to help people improve their quality of life? As a prosthetist and orthotist, you will combine medical knowledge, technology, and empathy to create life-changing devices such as prostheses and orthoses. By analysing needs and developing tailored solutions, you will empower people with disabilities to live more freely and independently.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://ju.se/en/study-at-ju/our-programmes/bachelor-programmes/prosthetics-and-orthotics-bsc-autumn-2027-ku013.html',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 3 },
            { course: 'MATH-AI', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'PHYS', level: 'SL', grade: 4 },
            { course: 'PHYS', level: 'HL', grade: 3 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'CHEM', level: 'SL', grade: 4 },
            { course: 'CHEM', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://ju.se/en/study-at-ju/application-and-admission/how-to-apply---bachelors/specific-country-requirements.html',
        'https://ju.se/en/study-at-ju/our-programmes/bachelor-programmes/prosthetics-and-orthotics-bsc-autumn-2027-ku013.html',
        'https://syllabus.ju.se/Syllabus/ProgrammeOccasion/d962af2b-c9fc-11f0-a255-650837bd40cf?lang=en&pdf=true',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/',
        'https://www.uhr.se/studier-och-antagning/antagningsstatistik/'
      ],
      notes:
        'Content 4.8: moved from the autumn-2026 page (now 404) to Autumn 2027 (application code HJ-KU013, School of Health and Welfare): Degree of Bachelor of Science in Prosthetics and Orthotics, 180 credits. The page and syllabus say only "specific demand on mathematics, physics, and chemistry"; JU\'s specific country requirements page names them: English 6, Mathematics 3c, Physics 2 and Chemistry 1. UHR\'s IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. JU\'s own table gives Physics and Chemistry at SL or HL 4; UHR also accepts HL 3. Field corrected from Business & Economics. The programme requires lung-function testing for work with thermoset plastics. Selection: the converted IB total (grades), with the Swedish aptitude test for part of the places in the national round. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. Content 5.4 Part A (27 October 2026): examined, no "How competitive" paragraph: every qualified applicant was admitted in 2026, in the second round at its final selection (HJ-52347) and in the first round (HJ-KU013).'
    }
  ]
}

export default refresh
