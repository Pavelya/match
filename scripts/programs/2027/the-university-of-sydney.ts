import type { RefreshFile } from '../lib/refresh'

/**
 * The University of Sydney: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts the-university-of-sydney
 */
const refresh: RefreshFile = {
  university: 'The University of Sydney',
  entryYear: 2027,
  checkedOn: '2026-09-30',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwq19200257mddbyzvlbzy',
      status: 'current',
      name: 'Bachelor of Advanced Computing',
      description:
        "One of Australia's most flexible and innovative IT courses. Build systems behind emerging technologies.",
      field: 'Computer Science',
      degree: 'Bachelor of Advanced Computing',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-advanced-computing.html',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-advanced-computing.html',
        'https://www.sydney.edu.au/study/applying/how-to-apply/undergraduate/mathematics-prerequisite.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 34 for international students (stored 33). 2027 prerequisite: Mathematics Advanced (Band 4), whose IB equivalent is Maths AA SL5 or HL4, or Maths AI HL4, replacing the stored AA HL5. The guide and the prerequisite page say it applies to the IB taken in Australia; stored as content 3.4 stored Mechatronic Engineering. HSC assumed knowledge (not a requirement): Mathematics Extension 1.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Combined Bachelor".
    {
      id: 'cmkgwq0ya00217mddyqxm44do',
      status: 'current',
      name: 'Bachelor of Advanced Computing and Bachelor of Commerce',
      description: "Combine two of Australia's most in-demand programs and shape a digital future.",
      field: 'Computer Science',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 38,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-advanced-computing-and-bachelor-of-commerce0.html',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-advanced-computing-and-bachelor-of-commerce0.html',
        'https://www.sydney.edu.au/study/applying/how-to-apply/undergraduate/mathematics-prerequisite.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 38 for international students, as stored. The stored page now describes 2026 entry (or redirects); the 2027 page is ...bachelor-of-advanced-computing-and-bachelor-of-commerce0.html. 2027 prerequisite: Mathematics Advanced (Band 4), whose IB equivalent is Maths AA SL5 or HL4, or Maths AI HL4, replacing the stored AA HL5. The guide and the prerequisite page say it applies to the IB taken in Australia; stored as content 3.4 stored Mechatronic Engineering. HSC assumed knowledge (not a requirement): Mathematics Extension 1, plus what the second degree assumes.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Combined Bachelor".
    {
      id: 'cmkgwq0nf001x7mddiwvfo1s0',
      status: 'current',
      name: 'Bachelor of Advanced Computing and Bachelor of Science',
      description:
        'Combine your passion for computer science and IT with a second degree in science.',
      field: 'Computer Science',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 34,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-advanced-computing-and-bachelor-of-science.html',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-advanced-computing-and-bachelor-of-science.html',
        'https://www.sydney.edu.au/study/applying/how-to-apply/undergraduate/mathematics-prerequisite.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 34 for international students, as stored. 2027 prerequisite: Mathematics Advanced (Band 4), whose IB equivalent is Maths AA SL5 or HL4, or Maths AI HL4, replacing the stored AA HL5. The guide and the prerequisite page say it applies to the IB taken in Australia; stored as content 3.4 stored Mechatronic Engineering. HSC assumed knowledge (not a requirement): Mathematics Extension 1, plus what the second degree assumes.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwpvx5000l7mdd0a82kx0g',
      status: 'current',
      name: 'Bachelor of Agricultural Science',
      description:
        "Solve the biggest problems facing our world with agricultural sciences. Australia's first university for agricultural science.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Agricultural Science',
      duration: '3 years',
      minIBPoints: 26,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-agricultural-science.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-agricultural-science.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 26 for international students, as stored. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Standard and English Standard.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwpw6j000n7mddrz6x7y3d',
      status: 'current',
      name: 'Bachelor of Animal and Veterinary Bioscience',
      description:
        'Broad overview of domestic animals and wildlife species. Study animal behaviour, biotechnologies, and nutrition.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Animal and Veterinary Bioscience',
      duration: '3 years',
      minIBPoints: 29,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-animal-and-veterinary-bioscience.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-animal-and-veterinary-bioscience.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 29 for international students (stored 28). Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Standard, Chemistry and Biology.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwq2kw002h7mddeajph21f',
      status: 'current',
      name: 'Bachelor of Applied Science (Exercise and Sport Science)',
      description:
        '3rd in the world for Sports-related subjects. Study exercise science at the University of Sydney.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Applied Science',
      duration: '3 years',
      minIBPoints: 29,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-applied-science-exercise-and-sport-science0.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-applied-science-exercise-and-sport-science0.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 29 for international students, as stored. The stored page now describes 2026 entry (or redirects); the 2027 page is ...bachelor-of-applied-science-exercise-and-sport-science0.html. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Advanced and Chemistry.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwpwrs000t7mdd43wjx1zu',
      status: 'current',
      name: 'Bachelor of Arts',
      description:
        'Discover the knowledge and skills to shape your future in arts and humanities at the University of Sydney.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 26,
      programUrl: 'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-arts.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-arts.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 26 for international students, as stored. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): depends on the subjects chosen.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Bachelor + Doctor of Medicine".
    {
      id: 'cmkgwq1k400297mddebm0x8vr',
      status: 'current',
      name: 'Bachelor of Arts and Doctor of Medicine',
      description:
        '27th globally for Medicine. Highly competitive combined degree leading to Doctor of Medicine qualification.',
      field: 'Medicine & Health',
      degree: "Bachelor's and Doctor of Medicine",
      duration: '7 years',
      minIBPoints: 45,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-arts-and-doctor-of-medicine.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-arts-and-doctor-of-medicine.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 45 for international students, as stored. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Advanced, plus what the chosen subjects assume. Admission also needs "satisfactory performance in Assessment Day" (an online group interview and written assessment, January 2027 for the 2027 intake), to which applicants who meet the score are invited; the Double Degree Medicine Program is for school leavers only.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwq3x0002t7mddj0j1vlq1',
      status: 'current',
      name: 'Bachelor of Biomedicine and Health',
      description:
        '1st in Australia for Anatomy and Physiology. Comprehensive understanding of human biology, health, and disease.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Biomedicine and Health',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-biomedicine-and-health.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-biomedicine-and-health.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 34 for international students (stored 33). Checked, none required: the course lists no prerequisites for 2027. Recommended: Mathematics Advanced, Biology and Chemistry.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwpt9t00017mdd0zpulwg3',
      status: 'current',
      name: 'Bachelor of Commerce',
      description:
        'Study at the top 1% of business schools in the world. Learn to navigate the complexities of business, economics, and management.',
      field: 'Business & Economics',
      degree: 'Bachelor of Commerce',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-commerce0.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-commerce0.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 38 for international students, as stored. The stored page now describes 2026 entry (or redirects); the 2027 page is ...bachelor-of-commerce0.html. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Standard.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Combined Bachelor".
    {
      id: 'cmkgwpv5a000f7mdddhvfxu00',
      status: 'discontinued',
      name: 'Bachelor of Commerce and Bachelor of Advanced Studies',
      description:
        'Study at the top 1% of business schools in the world. Explore business alongside other disciplines.',
      field: 'Business & Economics',
      degree: "Double Bachelor's Degree",
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-commerce-and-bachelor-of-advanced-studies.html',
      requirements: [],
      checkedFor: null,
      sources: [
        'https://www.sydney.edu.au/students/information-for-bachelor-of-advanced-studies-current-students.html',
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-commerce-and-bachelor-of-advanced-studies.html'
      ],
      notes:
        'Content 4.7: Sydney "has made the decision to discontinue the combined Bachelor of Advanced Studies degrees, effective 1 January 2027 ... The final new commencing intake is Semester 2, 2026", endorsed by the Senate on 7 August 2026. It is in neither 2027 admission guide (international or domestic). Current students finish as planned. Not written; the owner decides. Nearest stored programs: Bachelor of Commerce (38) and its doubles with Arts and Science.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Combined Bachelor".
    {
      id: 'cmkgwpumg000b7mddqug948h1',
      status: 'current',
      name: 'Bachelor of Commerce and Bachelor of Arts',
      description:
        'Study at the top 1% of business schools in the world. Explore your passions across business and the arts.',
      field: 'Business & Economics',
      degree: "Double Bachelor's Degree",
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-commerce-and-bachelor-of-arts0.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-commerce-and-bachelor-of-arts0.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 38 for international students, as stored. The stored page now describes 2026 entry (or redirects); the 2027 page is ...bachelor-of-commerce-and-bachelor-of-arts0.html. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Standard for Commerce, plus what the Arts subjects assume.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Combined Bachelor".
    {
      id: 'cmkgwpu3g00077mddrt007h8z',
      status: 'current',
      name: 'Bachelor of Commerce and Bachelor of Laws',
      description:
        'Study at the top 1% of business schools in the world. Combined Commerce and Law degree.',
      field: 'Law',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 38,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-commerce-and-bachelor-of-laws0.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-commerce-and-bachelor-of-laws0.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 38 for international students, as stored. The stored page now describes 2026 entry (or redirects); the 2027 page is ...bachelor-of-commerce-and-bachelor-of-laws0.html. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Standard.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Combined Bachelor".
    {
      id: 'cmkgwpuvs000d7mddp5g8z871',
      status: 'current',
      name: 'Bachelor of Commerce and Bachelor of Science',
      description:
        'Study at the top 1% of business schools in the world. Navigate science in the commercial world.',
      field: 'Business & Economics',
      degree: "Double Bachelor's Degree",
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-commerce-and-bachelor-of-science0.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-commerce-and-bachelor-of-science0.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 38 for international students, as stored. The stored page now describes 2026 entry (or redirects); the 2027 page is ...bachelor-of-commerce-and-bachelor-of-science0.html. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Standard for Commerce, plus what the Science subjects assume.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwpyaw00157mddj6y05et3',
      status: 'current',
      name: 'Bachelor of Design (Interaction Design)',
      description: 'Learn to design interactive products and experiences that enhance human life.',
      field: 'Architecture',
      degree: 'Bachelor of Design',
      duration: '3 years',
      minIBPoints: 26,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-design-interaction-design.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-design-interaction-design.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 26 for international students, as stored. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Advanced.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Bachelor of Design in Architecture".
    {
      id: 'cmkgwpyk600177mdd8wgz6nes',
      status: 'current',
      name: 'Bachelor of Design in Architecture',
      description: 'Your first step to becoming a registered architect.',
      field: 'Architecture',
      degree: 'Bachelor of Design',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-design-in-architecture.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-design-in-architecture.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 34 for international students (stored 33). Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Advanced and English Advanced.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwptkr00037mddqyhnghd5',
      status: 'current',
      name: 'Bachelor of Economics',
      description: 'Study economics at the University of Sydney.',
      field: 'Business & Economics',
      degree: 'Bachelor of Economics',
      duration: '3 years',
      minIBPoints: 31,
      programUrl: 'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-economics.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-economics.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 31 for international students, as stored. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Advanced.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Combined Bachelor".
    {
      id: 'cmkgwptu200057mddf9wj6nre',
      status: 'current',
      name: 'Bachelor of Economics and Bachelor of Arts',
      description:
        'Combined degree providing freedom to select subject areas reflecting your interests in economic theories, societal trends, or global issues.',
      field: 'Business & Economics',
      degree: "Double Bachelor's Degree",
      duration: '4 years',
      minIBPoints: 31,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-economics-and-bachelor-of-arts.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-economics-and-bachelor-of-arts.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 31 for international students, as stored. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Advanced for Economics, plus what the Arts subjects assume.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Combined Bachelor".
    {
      id: 'cmkgwpud400097mdd7gqvf6i9',
      status: 'current',
      name: 'Bachelor of Economics and Bachelor of Laws',
      description:
        'Think differently. The future of work is changing. Economics combined with legal training.',
      field: 'Law',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 38,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-economics-and-bachelor-of-laws.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-economics-and-bachelor-of-laws.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 38 for international students, as stored. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Advanced and English Advanced.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Bachelor of Engineering Honours".
    {
      id: 'cmkgwq0c9001t7mdd0us7glqv',
      status: 'current',
      name: 'Bachelor of Engineering Honours (Biomedical Engineering)',
      description:
        'Join one of the fastest-growing branches of engineering. Design implantable medical devices.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 31,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-engineering-honours-biomedical-engineering2.html',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-engineering-honours-biomedical-engineering2.html',
        'https://www.sydney.edu.au/study/applying/how-to-apply/undergraduate/mathematics-prerequisite.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 31 for international students, as stored. 2027 prerequisite: Mathematics Advanced (Band 4), whose IB equivalent is Maths AA SL5 or HL4, or Maths AI HL4, replacing the stored AA HL5. The guide and the prerequisite page say it applies to the IB taken in Australia; stored as content 3.4 stored Mechatronic Engineering. HSC assumed knowledge (not a requirement): Mathematics Extension 1, and Biology, Chemistry or Physics depending on the stream. Recommended: Biology and Physics.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Combined Bachelor (Honours)".
    {
      id: 'cmkgwpz4d001d7mddtmpvz2q1',
      status: 'current',
      name: 'Bachelor of Engineering Honours (Biomedical Engineering) and Bachelor of Science (Health)',
      description:
        'Combine your passion for biomedical engineering with a second degree in health science.',
      field: 'Engineering',
      degree: "Double Bachelor's Degree",
      duration: '5 years',
      minIBPoints: 31,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-engineering-honours-biomedical-engineering-and-bachelor-of-science-health.html',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-engineering-honours-biomedical-engineering-and-bachelor-of-science-health.html',
        'https://www.sydney.edu.au/study/applying/how-to-apply/undergraduate/mathematics-prerequisite.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 31 for international students, as stored. 2027 prerequisite: Mathematics Advanced (Band 4), whose IB equivalent is Maths AA SL5 or HL4, or Maths AI HL4, replacing the stored AA HL5. The guide and the prerequisite page say it applies to the IB taken in Australia; stored as content 3.4 stored Mechatronic Engineering. HSC assumed knowledge (not a requirement): Mathematics Extension 1, and Biology, Chemistry or Physics depending on the stream. Recommended: Physics.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Bachelor of Engineering Honours".
    {
      id: 'cmkgwq017001p7mddzw0bei0g',
      status: 'current',
      name: 'Bachelor of Engineering Honours (Electrical Engineering)',
      description: 'Harness the potential of electricity and create a brighter future.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 31,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-engineering-honours-electrical-engineering2.html',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-engineering-honours-electrical-engineering2.html',
        'https://www.sydney.edu.au/study/applying/how-to-apply/undergraduate/mathematics-prerequisite.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 31 for international students, as stored. 2027 prerequisite: Mathematics Advanced (Band 4), whose IB equivalent is Maths AA SL5 or HL4, or Maths AI HL4, replacing the stored AA HL5. The guide and the prerequisite page say it applies to the IB taken in Australia; stored as content 3.4 stored Mechatronic Engineering. HSC assumed knowledge (not a requirement): Mathematics Extension 1 and Physics.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Bachelor of Engineering Honours".
    {
      id: 'cmkgwpzfb001h7mddrch6pds1',
      status: 'current',
      name: 'Bachelor of Engineering Honours (Mechanical Engineering)',
      description:
        'Design the machines of tomorrow. Gain comprehensive knowledge of mechanical design.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 31,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-engineering-honours-mechanical-engineering2.html',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-engineering-honours-mechanical-engineering2.html',
        'https://www.sydney.edu.au/study/applying/how-to-apply/undergraduate/mathematics-prerequisite.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 31 for international students, as stored. 2027 prerequisite: Mathematics Advanced (Band 4), whose IB equivalent is Maths AA SL5 or HL4, or Maths AI HL4, replacing the stored AA HL5. The guide and the prerequisite page say it applies to the IB taken in Australia; stored as content 3.4 stored Mechatronic Engineering. HSC assumed knowledge (not a requirement): Mathematics Extension 1. Recommended: Physics.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Bachelor of Engineering Honours".
    {
      id: 'cmkgwpytl00197mddi45i0lgr',
      status: 'current',
      name: 'Bachelor of Engineering Honours (Mechatronic Engineering)',
      description:
        'Design the intelligent machines of the future. Combine mechanical, electrical, and computer engineering.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 31,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-engineering-honours-mechatronic-engineering2.html',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-engineering-honours-mechatronic-engineering2.html',
        'https://www.sydney.edu.au/study/applying/how-to-apply/undergraduate/mathematics-prerequisite.html'
      ],
      notes:
        "Content 3.4: the page moved from ...mechatronic-engineering0.html to ...mechatronic-engineering2.html; same course (CRICOS 083109M, 4 years). Sydney's 2027 International Admission Guide and the course data for 2027 give an IB Diploma score of 31 for international students. 2027 prerequisite: Mathematics Advanced (band 4), whose IB equivalent is Maths AA SL5 or HL4, or Maths AI HL4, replacing the stored AA HL5. Sydney states that the IB equivalent applies to the IB taken in Australia. Assumed knowledge Mathematics Extension 1; Physics recommended."
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Bachelor of Engineering Honours".
    {
      id: 'cmkgwpzq6001l7mdd7qfgik5a',
      status: 'current',
      name: 'Bachelor of Engineering Honours (Software Engineering)',
      description: 'Design, write and test the next generation of software and games.',
      field: 'Computer Science',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 31,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-engineering-honours-software-engineering1.html',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-engineering-honours-software-engineering1.html',
        'https://www.sydney.edu.au/study/applying/how-to-apply/undergraduate/mathematics-prerequisite.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 31 for international students, as stored. 2027 prerequisite: Mathematics Advanced (Band 4), whose IB equivalent is Maths AA SL5 or HL4, or Maths AI HL4, replacing the stored AA HL5. The guide and the prerequisite page say it applies to the IB taken in Australia; stored as content 3.4 stored Mechatronic Engineering. HSC assumed knowledge (not a requirement): Mathematics Extension 1. Recommended: Physics.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwpxjh000z7mdd5bnmsob6',
      status: 'current',
      name: 'Bachelor of International Studies',
      description:
        'Explore the world, shape the future and ignite change. Dive into global politics, history, culture and language.',
      field: 'Social Sciences',
      degree: 'Bachelor of International Studies',
      duration: '3 years',
      minIBPoints: 31,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-international-studies.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-international-studies.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 31 for international students, as stored. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): depends on the subjects chosen.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwpwfq000p7mddknems4lu',
      status: 'current',
      name: 'Bachelor of Mathematical Sciences',
      description:
        'Dynamic degree for mathematics, computing, data analysis, and problem-solving skills.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Mathematical Sciences',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-mathematical-sciences.html',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-mathematical-sciences.html',
        'https://www.sydney.edu.au/study/applying/how-to-apply/undergraduate/mathematics-prerequisite.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 34 for international students (stored 33). 2027 prerequisite: Mathematics Advanced (Band 4), whose IB equivalent is Maths AA SL5 or HL4, or Maths AI HL4, replacing the stored AA HL5. The guide and the prerequisite page say it applies to the IB taken in Australia; stored as content 3.4 stored Mechatronic Engineering. HSC assumed knowledge (not a requirement): Mathematics Extension 1.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwpx11000v7mddkxf432w7',
      status: 'current',
      name: 'Bachelor of Media and Communications',
      description:
        'Make your mark in media, launch your career. Gain essential skills in media production.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Media and Communications',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-media-and-communications.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-media-and-communications.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 34 for international students (stored 33). Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): depends on the subjects chosen.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwq462002v7mdd6m2rwxsd',
      status: 'current',
      name: 'Bachelor of Nursing (Advanced Studies)',
      description:
        '1st in Australia for Nursing. Focus on leadership, critical decision-making, and culturally safe care.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Nursing',
      duration: '3 years',
      minIBPoints: 29,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-nursing-advanced-studies0.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-nursing-advanced-studies0.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 29 for international students (stored 28). Checked, none required: the course lists no prerequisites for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwq2u6002j7mdd5ehqty5d',
      status: 'current',
      name: 'Bachelor of Oral Health',
      description:
        "Australia's first dental school. Dual qualifications in dental hygiene and dental therapy.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Oral Health',
      duration: '3 years',
      minIBPoints: 34,
      programUrl: 'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-oral-health.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-oral-health.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 34 for international students (stored 31). Checked, none required: the course lists no prerequisites for 2027. Recommended: Biology and Chemistry. The course data gives 32 for 2026 entry and 34 for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Bachelor (Honours) + Master".
    {
      id: 'cmkgwq3ln002p7mddk2a4z80d',
      status: 'current',
      name: 'Bachelor of Pharmacy and Management (Honours) and Master of Pharmacy Practice',
      description:
        '=19th globally for Pharmacy and Pharmacology. Combined degree with management focus.',
      field: 'Medicine & Health',
      degree: "Integrated Bachelor's and Master's",
      duration: '6 years',
      minIBPoints: 31,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-pharmacy-and-management-honours-and-master-of-pharmacy-practice.html',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-pharmacy-and-management-honours-and-master-of-pharmacy-practice.html',
        'https://www.sydney.edu.au/study/applying/how-to-apply/undergraduate/mathematics-prerequisite.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 31 for international students, as stored. 2027 prerequisite: Mathematics Advanced (Band 4), whose IB equivalent is Maths AA SL5 or HL4, or Maths AI HL4, replacing the stored AA HL5. The guide and the prerequisite page say it applies to the IB taken in Australia; stored as content 3.4 stored Mechatronic Engineering. HSC assumed knowledge (not a requirement): Mathematics Advanced, Biology and Chemistry. Recommended: Physics. The guide and the course page give 6 years full-time, not 5.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwpxsq00117mddv2yfgehu',
      status: 'current',
      name: 'Bachelor of Politics, Philosophy, and Economics',
      description:
        'Shape the future with PPE, a prestigious course recognised globally as a starting point for future leaders.',
      field: 'Social Sciences',
      degree: 'Bachelor of Politics, Philosophy, and Economics',
      duration: '3 years',
      minIBPoints: 32,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-politics-philosophy-and-economics.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-politics-philosophy-and-economics.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 32 for international students (stored 31). Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): depends on the subjects chosen.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwpver000h7mdd0hy0q5e7',
      status: 'current',
      name: 'Bachelor of Project Management',
      description:
        "Be the go-to person to get the job done in any industry. Project management skills for today's business environment.",
      field: 'Business & Economics',
      degree: 'Bachelor of Project Management',
      duration: '3 years',
      minIBPoints: 29,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-project-management0.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-project-management0.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 29 for international students (stored 28). Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): depends on the subjects chosen.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwpxab000x7mddk6gnk0mb',
      status: 'current',
      name: 'Bachelor of Psychology',
      description: "Study psychology at one of Australia's leading research universities.",
      field: 'Social Sciences',
      degree: 'Bachelor of Psychology',
      duration: '3 years',
      minIBPoints: 29,
      programUrl: 'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-psychology.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-psychology.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 29 for international students, as stored. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Advanced, plus what the chosen subjects assume.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwpvnx000j7mddnhisw3n5',
      status: 'current',
      name: 'Bachelor of Science',
      description:
        'Explore the fundamental laws of nature and the universe. Study science at the University of Sydney.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 29,
      programUrl: 'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-science.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-science.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 29 for international students, as stored. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Advanced, plus what the chosen subjects assume.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwq33a002l7mddi8j5xfrm',
      status: 'current',
      name: 'Bachelor of Science (Health)',
      description:
        'Thorough grounding in health and health systems at local, national and global level.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 29,
      programUrl: 'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-science-health.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-science-health.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 29 for international students (stored 28). Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Advanced and Biology, plus what the chosen subjects assume.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwq3cj002n7mddl0801ixf',
      status: 'current',
      name: 'Bachelor of Science (Medical Science)',
      description:
        'Ranked top 25 in the world. Foundation for graduate medicine or dentistry programs.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 31,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-science-medical-science.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-science-medical-science.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 31 for international students, as stored. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Advanced (depending on the major), Biology and Chemistry.'
    },
    // Deleted 2026-09-27 at the owner's request (content 3.4), backup in scripts/backups/refresh/: Bachelor of Science and Doctor of Dental Medicine: in neither 2027 admission guide; page redirects to the plain BSc.
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Bachelor + Doctor of Medicine".
    {
      id: 'cmkgwq1t3002b7mddshkkvyuf',
      status: 'current',
      name: 'Bachelor of Science and Doctor of Medicine',
      description:
        '27th globally for Medicine. Combined degree leading to Doctor of Medicine qualification.',
      field: 'Medicine & Health',
      degree: "Bachelor's and Doctor of Medicine",
      duration: '7 years',
      minIBPoints: 45,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-science-and-doctor-of-medicine.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-science-and-doctor-of-medicine.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 45 for international students, as stored. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Advanced (depending on the major), Biology and Chemistry. Admission also needs "satisfactory performance in Assessment Day" (an online group interview and written assessment, January 2027 for the 2027 intake), to which applicants who meet the score are invited; the Double Degree Medicine Program is for school leavers only.'
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkgwpy2000137mddrcxhy6dp',
      status: 'current',
      name: 'Bachelor of Social Work',
      description:
        'Change lives for the better. Internationally recognised program to qualify as a professional social worker.',
      field: 'Social Sciences',
      degree: 'Bachelor of Social Work',
      duration: '4 years',
      minIBPoints: 26,
      programUrl: 'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-social-work0.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-social-work0.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 26 for international students, as stored. Checked, none required: the course lists no prerequisites for 2027.'
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Bachelor + Doctor of Veterinary Medicine".
    {
      id: 'cmkgwq2bl002f7mddrmkuiz6u',
      status: 'current',
      name: 'Bachelor of Veterinary Biology and Doctor of Veterinary Medicine',
      description:
        '1st in Australia for Veterinary Science. Combined degree leading to Doctor of Veterinary Medicine qualification.',
      field: 'Medicine & Health',
      degree: "Bachelor's and Doctor of Veterinary Medicine",
      duration: '6 years',
      minIBPoints: 37,
      programUrl:
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-veterinary-biology-and-doctor-of-veterinary-medicine0.html',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.sydney.edu.au/dam/corporate/documents/study/how-to-apply/international-admission-guide.pdf',
        'https://www.sydney.edu.au/courses/courses/uc/bachelor-of-veterinary-biology-and-doctor-of-veterinary-medicine0.html'
      ],
      notes:
        'Sydney\'s International Admission Guide ("a guide for admission to our undergraduate courses in 2027"; entry "is based on the total score for the completed IB Diploma") and the course data for 2027 give an IB Diploma score of 37 for international students, as stored. The stored page now describes 2026 entry (or redirects); the 2027 page is ...bachelor-of-veterinary-biology-and-doctor-of-veterinary-medicine0.html. Checked, none required: the course lists no prerequisites for 2027. HSC assumed knowledge (not a requirement): Mathematics Advanced, Biology and Chemistry. Recommended: Physics. All applicants must also sit the Casper situational judgement test (Acuity Insights) for the 2026-2027 admissions cycle.'
    }
  ]
}

export default refresh
