import type { RefreshFile } from '../lib/refresh'

/**
 * emlyon business school: the two bachelor's it teaches in English from the first year in Lyon,
 * added for content task 5.3 (France) and created, with the university, on 8 October 2026. The owner chose, on 8 October 2026, a few leading private
 * schools alongside the public institutions.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts emlyon-business-school
 */

const GBBA = 'https://em-lyon.com/en/student/bachelor/global-bba'
const BSC = 'https://em-lyon.com/en/student/bachelor/bsc-data-science'
const BACHELORS = 'https://em-lyon.com/en/bachelor-programs'

const refresh: RefreshFile = {
  university: 'emlyon business school',
  entryYear: 2027,
  checkedOn: '2026-10-08',
  programs: [
    {
      id: 'cmuzj2prg001s6x7mkpeoqbvh',
      status: 'current',
      name: 'Global BBA',
      description:
        "emlyon's Global BBA is a four-year bachelor's in business administration, taught in English or French from the first year in Lyon. The first two years cover the fundamentals of management, business, finance and marketing through learning by doing. In the last two years students either follow a classic path with one of ten specialisations, as an apprentice or an entrepreneur if they wish, or join a double degree with a partner university abroad. Up to 75% of the programme can be spent abroad, through exchanges, internships and emlyon's international campuses, with up to 19 months of internships in all. The degree is recognised at Bac+4 with the grade de licence.\n\nApplicants with an international diploma, the IB included, apply online and, once their file is validated, take emlyon's online admission assessments: a cognitive test, a general knowledge test and a behavioural assessment. The admissions committee then decides in monthly sessions from November to July.",
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: GBBA,
      requirements: [],
      checkedFor: 2027,
      sources: [GBBA, BACHELORS],
      notes:
        'Content 5.3: new. "Format: Full-time (next intake: September 2027)", "Tuition fees: €15,500 / year for a 1rst year admission (2027–2028 academic year)", sessions from November 2026 to July 2027, so stamped 2027. IB rule: "Students completing their High School certificate, the IB or \'National Baccalauréat\', or an equivalent certificate"; French-baccalaureate holders apply through the SESAME competitive exam instead. Selection: file review, then online assessments "a cognitive test, a general knowledge test, and a behavioral assessment" (model limit). No minimum score, so 24, the Diploma. Checked, none required: no subject is named. Language: "delivered in both English and French tracks from the first year" (bachelor programmes page); applying through the English pages means the tests are in English. Fees: €15,500 a year (2027-28), 10% off for international students admitted in the first session. Contact: a contact form only; contact@em-lyon.com is the school\'s general address. No "How competitive" paragraph: no admission figures are published. Field: a business school\'s BBA is Business & Economics (5.3 brief).'
    },
    {
      id: 'cmuzj2pse001t6x7mfq8x2mmg',
      status: 'current',
      name: 'Data Science for Responsible Business',
      description:
        "The BSc in Data Science for Responsible Business is a four-year bachelor's taught in English in Lyon by emlyon business school and École Centrale de Lyon, an engineering school, and carries the grade de licence. The first year lays the foundations in mathematics, computer science and responsible business; the second covers data science, AI technologies, business practice and corporate social responsibility; the third, advanced language models, trends in AI, digital business and corporate law. The last two years are built around year-long responsible-AI missions with a company, a research lab or a start-up incubator, and the programme includes an exchange semester.\n\nApplicants are first assessed on their school record, grades and English, then take an online test (logic reasoning and mathematics) and record a video interview. Those found eligible have an individual video interview with a member of the emlyon or Centrale Lyon panel before the final decision.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: BSC,
      requirements: [],
      checkedFor: 2027,
      sources: [BSC, BACHELORS],
      notes:
        'Content 5.3: new. "Format: Full-time (next intake: September 2027)", "Tuition fees: €15,500 / year (2027–2028 academic year)", so stamped 2027 (the page also still carries the 2025-2026 session dates). IB rule: "Students studying for their High School certificate, for the IB or \'National Baccalauréat\', or for an equivalent certificate"; French-baccalaureate holders apply on Parcoursup. Selection: school record, grades and English, then "Part 2: mathematics test" within an online test, a deferred video interview, an eligibility board and an individual video interview (model limit). No minimum score, so 24, the Diploma. Checked, none required: the page names no subject; mathematics is tested, not required as an IB course. Taught with École Centrale de Lyon, "teaching in English". First intake September 2023. Contact: as the Global BBA. No "How competitive" paragraph: no admission figures are published. Field: Data Science lives in Computer Science, and the rule files the name there (8.1).'
    }
  ]
}

export default refresh
