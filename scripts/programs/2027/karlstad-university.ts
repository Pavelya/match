import type { RefreshFile } from '../lib/refresh'

/**
 * Karlstad University: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts karlstad-university
 */
const refresh: RefreshFile = {
  university: 'Karlstad University',
  entryYear: 2027,
  checkedOn: '2026-10-02',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmm6dv9ed0023l804tjr7ttok',
      status: 'current',
      name: 'Artificial Intelligence - Bachelor Programme in Computer Science',
      description:
        'Are you passionate about the future of technology and eager to be part of the AI revolution? This Bachelor of Science program in Computer Science with a focus on Artificial Intelligence (AI) and Machine Learning (ML) prepares you to be at the forefront of tomorrow´s digital advancements. By bridging the gap between our established expertise in computer science and cutting-edge AI education, the program equips you with the skills to drive innovation both ethically and effectively in industry and research.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.kau.se/en/education/programmes-and-courses/programmes/TGKAI?occasion=80950',
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
        'https://www.kau.se/en/education/programmes-and-courses/programmes/TGKAI?occasion=80950',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: the stored occasion (80732) is Autumn 2026; the Autumn 2027 occasion in the same mode (distance with 12 on-campus meetings in Karlstad) is KAU-80950, and two campus occasions (80959, 80961) also start Autumn 2027. Prerequisites: general entry requirements plus Mathematics 3c (or the older D). UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. Degree of Bachelor of Science in Computer Science; field corrected from Social Sciences. Selection: the converted IB total (grades), with the Swedish aptitude test for part of the places in the national round. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm6dsya5001ll8040176bchb',
      status: 'current',
      name: 'Bachelor Programme in Music',
      description:
        'The Fine Arts/Music programme at Karlstad University is an artistic education designed for students who want to develop their technical and artistic musical skills to a very high level. With studies on main instrument, ensemble and musical knowledge the student acquires a solid foundation for a professional life as a musician in various musical constellations. The programme comprises 180 credits and leads to a Degree of Bachelor of Fine Arts with a Major in Music. The studies are at the Ingesund school of music in Arvika. At the school we have symphony orchestras, string bands, choirs, symphonic brass band, jazz orchestra, and a variety of small ensembles.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Fine Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.kau.se/en/education/programmes-and-courses/programmes/HGMSK?occasion=80899',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://www.kau.se/en/education/programmes-and-courses/programmes/HGMSK?occasion=80899'
      ],
      notes:
        "Content 4.8: Autumn 2027 occasion KAU-80899 (Ingesund School of Music, Arvika), replacing the stored 2026 occasion 80639. Prerequisites: general eligibility plus passing the entrance exam (an audition, not modelled). Checked, no subject required beyond English 6, part of the general entry requirements: UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. Degree of Bachelor of Fine Arts with a Major in Music. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmm6dtv8y001rl804q071j5la',
      status: 'current',
      name: 'Global Perspectives on Gender, Human Rights and Social Justice',
      description:
        'Are you passionate about making a difference in the world? The bachelor’s programme Global Perspectives on Gender, Human Rights and Social Justice offers you a unique opportunity to study some of the most pressing issues of our time – from gender equality and human rights to sustainable development and social justice – all within a truly global context.',
      field: 'Social Sciences',
      degree: 'Bachelor of Social Sciences',
      duration: '3 years',
      minIBPoints: 24,
      programUrl:
        'https://www.kau.se/en/education/programmes-and-courses/programmes/SGGGJ?occasion=80812',
      requirements: [
        { courses: ['ENG-B', 'ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.universityadmissions.se/en/apply-to-bachelors/provide-application-documents-bachelors/ib-studies/for-ib-diplomas-2021-and-later/',
        'https://www.kau.se/en/education/programmes-and-courses/programmes/SGGGJ?occasion=80812',
        'https://www.antagning.se/sv/betyg-och-behorighet/international-baccalaureate/ib-examen-2021-och-framat/rakna-ut-ditt-meritvarde/'
      ],
      notes:
        "Content 4.8: Autumn 2027 occasion KAU-80812 (campus, Karlstad; 80813 is a second 2027 occasion), replacing the stored 2026 occasion 80684. Prerequisites: general requirements plus English 6 and Civics 1b or 1a1+1a2. UHR's IB page (universityadmissions.se, updated 1 October 2026; it names no intake) translates the Swedish courses: English 6 = English B SL or any English A, at 4 (a test can replace it, so English is stored not critical); Mathematics 2a/2b/2c = any IB maths at 3 (Maths AI SL 3 is Mathematics 2a); Mathematics 3b/3c = Maths AA SL 3, Maths AI SL 4 or Maths AI HL 3; Mathematics 4 = Maths AA SL 4, or Maths AA or AI HL 3; Physics, Chemistry and Biology 2 = the subject at SL 4 or HL 3; Civics (Social Studies) 1b = the IB Diploma itself. Checked, no other subject required. Degree of Bachelor of Social Science, main field Gender Studies. Selection: the converted IB total (grades), with the Swedish aptitude test for part of the places in the national round. The IB Diploma meets the general entry requirements; selection converts the IB total to the Swedish 10-20 scale from 24 points (13.18) up, and no higher minimum is published, so 24, the Diploma minimum, is stored."
    }
  ]
}

export default refresh
