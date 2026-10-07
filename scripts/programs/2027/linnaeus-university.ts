import type { RefreshFile } from '../lib/refresh'

/**
 * Linnaeus University: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts linnaeus-university
 */
const refresh: RefreshFile = {
  university: 'Linnaeus University',
  entryYear: 2027,
  checkedOn: '2026-10-02',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmm6i5ddf0003l704t6r071o0',
      status: 'current',
      name: 'Applied Mathematics Programme',
      description:
        'This programme gives you sound knowledge of mathematics and how to use mathematics as a tool in areas as computer science, economy and engineering.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://lnu.se/en/programme/applied-mathematics-programme-ngmar/vaxjo-international-autumn/',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AA', level: 'HL', grade: 3 },
            { course: 'MATH-AI', level: 'HL', grade: 3 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://lnu.se/en/programme/applied-mathematics-programme-ngmar/vaxjo-international-autumn/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: the page now shows Autumn 2027 (application code LNU-F3536, Växjö, 30 August 2027 - 9 June 2030; the 2026 occasion moved to .../2026/). Entry requirements: general entry requirements and Mathematics 4 (or the older D). UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. The stored Maths AA SL 4 only is widened to UHR's list. Selection: 60% grades, 40% aptitude test (upper secondary grades and the Swedish aptitude test). Bachelor of Science, main field Mathematics. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. lnu.se answers scripts with a Cloudflare 403; the pages were read with WebFetch."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm6w9czs0001ld04mgmj2ffm',
      status: 'current',
      name: 'Design + Change',
      description:
        'Do you want to use design and its tools and methods to make a difference in the world? Then this is the right degree for you. The most important challenge of today and in the future concerns sustainability – to create a world that is good for both people and the planet, locally and globally. The bachelor’s programme in Design +Change combines design creativity with knowledge of sustainability for a profession at the cutting edge of design.',
      field: 'Architecture',
      degree: 'Bachelor of Fine Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: 'https://lnu.se/en/programme/design-change/vaxjo-international-autumn/',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://lnu.se/en/programme/design-change/vaxjo-international-autumn/'
      ],
      notes:
        "Content 4.8: Autumn 2027 occasion LNU-F3626 (Växjö, 30 August 2027 - 9 June 2030). Entry requirements: general entry requirements plus English 6. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. Checked, no other subject required. Admission is by individual assessment of a portfolio (artistic quality, purpose, creative approach), which is not modelled. Degree of Bachelor of Fine Arts, main field Design; field corrected from Social Sciences. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. lnu.se answers scripts with a Cloudflare 403; the pages were read with WebFetch."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm6wev9w000hld049cnnlzoo',
      status: 'current',
      name: 'International Business Programme',
      description:
        'Do you want to work with international business, in Sweden or abroad? On the international business programme you will learn how to establish, maintain, and develop business relations in an international context.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://lnu.se/en/programme/international-business-programme-eginb/kalmar-international-autumn/',
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
        'https://lnu.se/en/programme/international-business-programme-eginb/kalmar-international-autumn/',
        'https://lnu.se/en/programme/international-business-programme/kalmar-international-autumn/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        'Content 4.8: the stored page shows only Autumn 2026 (LNU-F3145) and lists "International Business Programme, Autumn 2027" under similar programmes at a new address: the same programme in Kalmar, application code LNU-F3654, 30 August 2027 - 9 June 2030. The maths requirement rises for 2027: general entry requirements plus Mathematics 3b or 3c (2026: Mathematics 2a, 2b or 2c), Social Sciences 1b or 1a1+1a2 and English 6. UHR\'s IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. Selection: 70% grades, 30% aptitude test (upper secondary grades and the Swedish aptitude test). Degree of Bachelor of Science in Business and Economics, main field Business Administration. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. lnu.se answers scripts with a Cloudflare 403; the pages were read with WebFetch.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm7gkigr0001i204qbjmtivc',
      status: 'current',
      name: 'International Tourism, Hospitality and Event Management Programme',
      description:
        'The International Tourism, Hospitality and Event Management programme prepares you to work in one of the world’s largest and most dynamic industries. With more than 45 years of experience in tourism education, the programme is one of the most established in Sweden – combining global perspectives with local sustainability projects, practical assignments and close collaboration with the tourism industry.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://lnu.se/en/programme/international-tourism-hospitality-and-event-management-programme/kalmar-international-autumn/',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 3, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://lnu.se/en/programme/international-tourism-hospitality-and-event-management-programme/kalmar-international-autumn/',
        'https://lnu.se/en/programme/international-tourism-management/kalmar-international-autumn/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        'Content 4.8: renamed for 2027. The stored page (now titled "Bachelor in International Tourism - Strategic & Sustainable") shows only Autumn 2026 (LNU-F3146) and links the Autumn 2027 "International Tourism, Hospitality and Event Management programme" (LNU-F3652, Kalmar, 30 August 2027 - 9 June 2030). Neither page says one replaces the other, but the new page opens with the stored description word for word apart from the name, it is LNU\'s only tourism bachelor\'s for 2027, and the requirements and selection are the same, so it is treated as the same programme. Entry requirements: general entry requirements plus Mathematics 2a, 2b or 2c, Social Sciences 1b or 1a1+1a2 and English 6. UHR\'s IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. The stored Maths AA SL 4 only is widened. Selection: 70% grades, 30% aptitude test (upper secondary grades and the Swedish aptitude test). Bachelor of Science with specialisation in Tourism, Hospitality and Event Management. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. lnu.se answers scripts with a Cloudflare 403; the pages were read with WebFetch.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm7gm777000ci204nljk3f7r',
      status: 'current',
      name: 'Media and Entrepreneurship Programme',
      description:
        'Do you want to work with driving, developing, and leading projects and initiatives within the media and communications sector? The media industry evolves rapidly, creating a need for entrepreneurs with both well-developed skills in media production and a solid understanding of the communicative and economic conditions of the media world.',
      field: 'Media',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://lnu.se/en/programme/media-and-entrepreneurship-programme/kalmar-international-autumn/',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 3, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://lnu.se/en/programme/media-and-entrepreneurship-programme/kalmar-international-autumn/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: the page now shows Autumn 2027 (LNU-F3519, Kalmar, 30 August 2027 - 9 June 2030). Entry requirements: general entry requirements and Civics 1b or 1a1+1a2 and Mathematics 2a, 2b or 2c (English 6 is part of the general requirements). UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. The stored Maths AA SL 4 only is widened. Selection: 60% grades, 40% aptitude test (upper secondary grades and the Swedish aptitude test). Degree of Bachelor of Science with Specialisation in Media Entrepreneurship. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. lnu.se answers scripts with a Cloudflare 403; the pages were read with WebFetch."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm7gql46000ri2042n8yz613',
      status: 'current',
      name: 'Network Security Programme',
      description:
        'Trojans, ransomware, phishing and other threats to both individuals and businesses demand ever more attention. If you want to learn how to stop these threats, this programme is the right one for you!',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://lnu.se/en/programme/network-security-programme/vaxjo-international-autumn/',
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
        'https://lnu.se/en/programme/network-security-programme/vaxjo-international-autumn/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: the page now shows Autumn 2027 (LNU-F3537, Växjö, 30 August 2027 - 9 June 2030). Entry requirements: general entry requirements and Mathematics 3c. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. The stored Maths AA SL 4 only is widened. Selection: 60% grades, 40% aptitude test (upper secondary grades and the Swedish aptitude test). Bachelor of Science with specialization in Network Security, main field Computer Science. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. lnu.se answers scripts with a Cloudflare 403; the pages were read with WebFetch."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm7gtmsk0012i204x8i9567p',
      status: 'current',
      name: 'Peace and Development Programme',
      description:
        'The Peace and Development Programme provides you with comprehensive knowledge within the areas of conflict transformation, peacebuilding, development work and international development cooperation. You also gain knowledge about the connection to human rights and security issues. By combining theory with experiences from practice abroad, you will be able to work in a wide range of organisations, both in Sweden and abroad. The language of teaching is English, and the programme offers cross-cultural perspectives and experiences.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://lnu.se/en/programme/peace-and-development-programme/vaxjo-international-autumn/',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://lnu.se/en/programme/peace-and-development-programme/vaxjo-international-autumn/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: no Autumn 2027 occasion yet. The page still shows only Autumn 2026 (LNU-F3305, Växjö, 31 August 2026 - 3 June 2029) while eight of LNU's other English bachelor's in this batch show 2027, and no 2027 successor is linked, so it is checked for 2026; re-check when the autumn 2027 round opens on 16 October 2026. Entry requirements: general entry requirements plus Civics 1b or 1a2 and English 6. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. Checked, no other subject required. Selection: 60% grades, 40% aptitude test (upper secondary grades and the Swedish aptitude test). Bachelor of Science in Peace and Development Studies; field corrected from Environmental Studies. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. lnu.se answers scripts with a Cloudflare 403; the pages were read with WebFetch."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm7guso1001ci204nkcn2wir',
      status: 'current',
      name: 'Software Technology Programme',
      description:
        'Would you like to work with game development, IT systems for cars, or maybe within telecom? The future is exciting and full of possibilities!',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://lnu.se/en/programme/software-technology-programme/vaxjo-international-autumn/',
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
        'https://lnu.se/en/programme/software-technology-programme/vaxjo-international-autumn/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: the page now shows Autumn 2027 (LNU-F3538, Växjö, 30 August 2027 - 9 June 2030). Entry requirements: general entry requirements and Mathematics 3c. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. The stored Maths AA SL 4 only is widened. Selection: 60% grades, 40% aptitude test (upper secondary grades and the Swedish aptitude test). Bachelor of Science with specialization in Software Technology, main field Computer Science. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. lnu.se answers scripts with a Cloudflare 403; the pages were read with WebFetch."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm7gx0d1001mi204irftz1yj',
      status: 'current',
      name: "Bachelor's Programme in Economics and Data Analysis",
      description:
        "Are you interested in societal issues and curious about how data, statistics and mathematics can be used to understand and shape the world around you? Then the Bachelor's Programme in Economics and Data Analysis is the right programme for you. The programme prepares you for analytical work by combining knowledge of economics and data analysis, enabling you to make well-founded assessments and contribute to informed decision-making in a globalised world.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://lnu.se/en/programme/bachelor-s-programme-in-economics-and-data-analysis/vaxjo-international-autumn/',
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
        'https://lnu.se/en/programme/bachelor-s-programme-in-economics-and-data-analysis/vaxjo-international-autumn/',
        'https://lnu.se/en/programme/the-economics-programme/vaxjo-international-autumn/',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        'Content 4.8: renamed for 2027. The stored page ("The Economics Programme - Focus on Data & Analytics") shows only Autumn 2026 (LNU-F3225) and links the Autumn 2027 "Bachelor\'s Programme in Economics and Data Analysis" (LNU-F3678, Växjö, 30 August 2027 - 9 June 2030). Neither page says one replaces the other, but the new description is the stored one reworded around the new name, and the requirements and selection are the same, so it is treated as the same programme. Entry requirements: general entry requirements plus Mathematics 3b or 3c, Social Sciences 1b or 1a1+1a2 and English 6. UHR\'s IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. Selection: 70% grades, 30% aptitude test (upper secondary grades and the Swedish aptitude test). Bachelor of Science in Business and Economics, main field Economics; field corrected from Computer Science. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. lnu.se answers scripts with a Cloudflare 403; the pages were read with WebFetch.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm7gxnnl001xi204o4xzpufe',
      status: 'current',
      name: 'Visual Communication +Change',
      description:
        'Do you want to use visual communication to make a difference in the world? Then this is the right degree for you. The programme combines creative practices, visual art, and graphic design with knowledge of sustainability to prepare you for a profession as a visual communicator with a diverse set of graphic and conceptual tools.',
      field: 'Architecture',
      degree: 'Bachelor of Fine Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://lnu.se/en/programme/visual-communication-change/vaxjo-international-autumn/',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://lnu.se/en/programme/visual-communication-change/vaxjo-international-autumn/'
      ],
      notes:
        "Content 4.8: Autumn 2027 occasion LNU-F3624 (Växjö, 30 August 2027 - 9 June 2030). Entry requirements: general entry requirements plus English 6. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. Checked, no other subject required. Admission is an alternative selection on a portfolio, a letter of intent and grades, the portfolio weighted most; not modelled. Bachelor of Fine Arts with a specialisation in visual communication, main field Design; field corrected from Computer Science. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored. lnu.se answers scripts with a Cloudflare 403; the pages were read with WebFetch."
    }
  ]
}

export default refresh
