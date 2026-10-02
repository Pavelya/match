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
        'Do you want to understand how the world economy works — and how to make a real impact within it? This programme equips you with strong analytical skills, advanced knowledge of economics, and the ability to use data and digital tools to address today’s most pressing challenges in business and society.',
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
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: the stored autumn-2026 page now 404s. For Autumn 2027 JU lists the programme as \"International Economics\" (application code HJ-KU103, Jönköping International Business School): Degree of Bachelor of Science in Business and Economics with a major in Economics, 180 credits. It asks general entry requirements plus Mathematics 3b or 3c, Civics 1b or 1a1+1a2 and English 6. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. JU's own IB table agrees. The stored English grade 3 was below UHR's minimum of 4 and is raised. Selection: the converted IB total (grades), with the Swedish aptitude test for part of the places in the national round. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm6d83rw0001l8046k5fpje3',
      status: 'current',
      name: 'International Management',
      description:
        'Do you want a global career in business? This programme combines a strong foundation in business and economics with an international outlook, entrepreneurial mindset, and the skills to succeed in today’s dynamic global environment. Whether you aim to work for a multinational company, start your own venture, or continue with a master’s degree, you will graduate with the tools and confidence to reach your goals.',
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
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: the stored autumn-2026 page now 404s. For Autumn 2027 JU lists the programme as \"International Management\" (application code HJ-KU101, Jönköping International Business School): Degree of Bachelor of Science in Business and Economics with a major in Business Administration, 180 credits. It asks general entry requirements plus Mathematics 3b or 3c, Civics 1b or 1a1+1a2 and English 6. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. JU's own IB table agrees. The stored English grade 3 was below UHR's minimum of 4 and is raised. Selection: the converted IB total (grades), with the Swedish aptitude test for part of the places in the national round. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm6d9rxd000el804jnuhk83h',
      status: 'current',
      name: 'International Marketing',
      description:
        'Do you want to understand customers, build brands, and shape business in a global context? This programme combines a solid foundation in business and economics with specialised knowledge in marketing, strategy, and communication. You will gain the skills to analyse markets, engage customers, and drive growth in today’s fast-changing international environment.',
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
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: the stored autumn-2026 page now 404s. For Autumn 2027 JU lists the programme as \"International Marketing\" (application code HJ-KU102, Jönköping International Business School): Degree of Bachelor of Science in Business and Economics with a major in Business Administration, 180 credits. It asks general entry requirements plus Mathematics 3b or 3c, Civics 1b or 1a1+1a2 and English 6. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. JU's own IB table agrees. The stored English grade 3 was below UHR's minimum of 4 and is raised. Selection: the converted IB total (grades), with the Swedish aptitude test for part of the places in the national round. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm6aav0j0003jo04p9n6eevd',
      status: 'current',
      name: 'Graphic Design and Web Development',
      description:
        'Want to shape the new media landscape? This programme combines graphic design, programming and web design with marketing communication and User Experience Design. The programme gives you a broad understanding and all the prerequisites to find your place in the digital world.',
      field: 'Computer Science',
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
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: moved from the autumn-2026 page (now 404) to Autumn 2027 (application code HJ-KU018, School of Engineering): Degree of Bachelor of Science with a major in Informatics, 180 credits. It asks general entry requirements plus Mathematics 2a, 2b or 2c and English 6. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. JU's own table gives Maths AI SL 3 for Mathematics 2a; Maths AA counts too, since AA SL 3 is Mathematics 3c. The stored English group (English B HL 5, English A SL 3) and Maths AI only are replaced. Selection: the converted IB total (grades), with the Swedish aptitude test for part of the places in the national round. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm6ahxat0006l704n4cf2j58',
      status: 'current',
      name: 'Industrial Engineering and Management: Sustainable Supply Chain Management',
      description:
        'Do you want to contribute to a more sustainable future? This program offers a broad education in industrial economics and organisation, with a focus on sustainable supply chains. Upon graduation, you will be well-equipped for an international career in logistics and sustainability.',
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
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: moved from the autumn-2026 page (now 404) to Autumn 2027 (application code HJ-KU019, School of Engineering): Degree of Bachelor of Science in Industrial Engineering and Management, 180 credits. It asks general entry requirements plus Mathematics 3b and English 6. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. JU's own IB table agrees. The stored English grade 3 was below UHR's minimum of 4 and is raised. Selection: the converted IB total (grades), with the Swedish aptitude test for part of the places in the national round. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored."
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
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: moved from the autumn-2026 page (now 404) to Autumn 2027 (application code HJ-KU013, School of Health and Welfare): Degree of Bachelor of Science in Prosthetics and Orthotics, 180 credits. The page and syllabus say only \"specific demand on mathematics, physics, and chemistry\"; JU's specific country requirements page names them: English 6, Mathematics 3c, Physics 2 and Chemistry 1. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. JU's own table gives Physics and Chemistry at SL or HL 4; UHR also accepts HL 3. Field corrected from Business & Economics. The programme requires lung-function testing for work with thermoset plastics. Selection: the converted IB total (grades), with the Swedish aptitude test for part of the places in the national round. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored."
    }
  ]
}

export default refresh
