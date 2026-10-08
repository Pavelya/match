import type { RefreshFile } from '../lib/refresh'

/**
 * CentraleSupélec: its joint bachelor's taught in English that start in France, added for content
 * task 5.3 (France) and created on 8 October 2026. The owner chose, on 8 October 2026, joint degrees whose first years are in
 * France and that France admits to. The fourth, Computer Science and Artificial Intelligence with
 * BITS Pilani, starts with two years in India and admits through BITSAT, so it is not added.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts centralesupelec
 */

const GE = 'https://www.centralesupelec.fr/en/programmes/bachelor-global-engineering'
const MCGILL_IB =
  'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
const MCGILL_GE =
  'https://www.mcgill.ca/engineering/students/undergraduate/prospective-students/undergraduate-programs/global-engineering'
const CITYU = 'https://www.centralesupelec.fr/en/programmes/bachelor-of-engineering-cityuhk'
const AIDMS = 'https://www.centralesupelec.fr/en/programmes/bachelor-ai-data-management-sciences'

const refresh: RefreshFile = {
  university: 'CentraleSupélec',
  entryYear: 2027,
  checkedOn: '2026-10-08',
  programs: [
    {
      id: 'cmuzj2osn000y6x7mhwbedd3x',
      status: 'current',
      name: 'Global Engineering',
      description:
        "The Bachelor in Global Engineering is a four-year joint degree of CentraleSupélec and McGill University's Faculty of Engineering, taught in English. Students spend the first two years at CentraleSupélec's Paris-Saclay campus, south-west of Paris, on a broad, intensive curriculum in mathematics, physics, computer science, chemistry, biology and social sciences, in small classes. They then spend two years at McGill in Montreal, specialising in one of nine streams: breadth, bioengineering, chemical, civil, electrical, materials or mechanical engineering, data science, or entrepreneurship.\n\nInternational applicants apply on McGill's application platform; both universities review the application, which includes a personal statement, and shortlisted applicants have a video interview. McGill asks for mathematics, chemistry and physics, at least one of them at Higher Level, and does not accept Maths AI at Standard Level.",
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 30,
      programUrl: GE,
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'CHEM', level: 'HL', grade: 5 },
            { course: 'CHEM', level: 'SL', grade: 5 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'PHYS', level: 'HL', grade: 5 },
            { course: 'PHYS', level: 'SL', grade: 5 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [GE, MCGILL_IB, MCGILL_GE],
      notes:
        'Content 5.3: new. Joint degree, first two years in France at CentraleSupélec Paris-Saclay (Gif-sur-Yvette), last two at McGill in Montreal (owner, 8 October 2026: joint degrees that start in France are added). "International and French applicants must submit their applications on the McGill University application platform"; French-baccalaureate applicants may also use Parcoursup. McGill\'s IB page: Engineering prerequisites "Mathematics, Chemistry and Physics at Higher or Standard Level (at least one math/science at Higher Level)", "SL Math AI is not accepted"; for Global Engineering the typical minimum range is "N/A", and "Admission review, handled jointly by both universities, also takes into account the Personal Statement". McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs", so 30 (six subjects at 5) and each prerequisite at 5, critical, as McGill\'s own engineering programs are stored (4.4). The model cannot hold "at least one math/science at HL". Entry year: CentraleSupélec gives "Tuition fees for 2027 registrations" and says applications for the 2027 intake open on McGill\'s website by 1 October, and McGill\'s IB page describes 2027 entry (4.4), so stamped 2027. Fees for 2027 registrations at CentraleSupélec (years 1-2): €44,000 a year, €13,000 for EU and Canadian students; McGill\'s fees in Canadian dollars for years 3-4. Degree: CentraleSupélec titles it "Bachelor of Engineering – CentraleSupélec & McGill"; McGill awards the Bachelor of Global Engineering (B.G.E.). Contact: bachelors@centralesupelec.fr. No "How competitive" paragraph: no admission figures are published. Field: Engineering (8.1).'
    },
    {
      id: 'cmuzj2oxt00166x7mz8ce3dvf',
      status: 'current',
      name: 'Innovation Engineering and Entrepreneurship',
      description:
        "This four-year Bachelor of Engineering is a joint degree of CentraleSupélec and City University of Hong Kong, taught in English; graduates receive a Bachelor of Engineering from each university. Students choose where to begin, at CentraleSupélec's Paris-Saclay campus south-west of Paris or in Hong Kong, and follow the same two-year core in mathematics, computer science and physics, with social sciences and soft skills. In the last two years they specialise: at CentraleSupélec in bioprocess engineering, data science, electrical engineering or fluid and thermal engineering, or in one of City University's engineering majors. At least 24 weeks of internships are required.\n\nApplicants decide where to start before applying on CentraleSupélec's platform and must also meet City University of Hong Kong's entry requirements. CentraleSupélec looks for an excellent academic background in mathematics, physics and computer science.",
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: CITYU,
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2026,
      sources: [CITYU],
      notes:
        'Content 5.3: new. Joint degree with City University of Hong Kong: "students can start their studies at either City University of Hong Kong or CentraleSupélec"; stored for those who start at Paris-Saclay (owner, 8 October 2026). "Applicants should meet the qualification requirements for CityUHK" (cityu.edu.hk/admo, an Incapsula wall to scripts, not read). CentraleSupélec expects an "Excellent academic background in mathematics, physics and computer science": stored as Maths AA or AI and Physics at SL, grade 4 as none is named, not critical; computer science is not stored because few IB schools teach it. No minimum score, so 24, the Diploma. Application on CentraleSupélec\'s platform (€100 fee) in rounds; round 4 is for international candidates only; English test unless the last two years were taught in English. Entry year: the page says applications for the 2027 intake open by the end of October 2026 and gives "tuition fees for 2027 registrations" (CentraleSupélec €23,000 a year; CityUHK HK$49,500 local, HK$240,000 non-local), but its admission calendar is still the 2026 round\'s (January to May 2026), so stamped 2026 (rule 2). Contact: bachelors@centralesupelec.fr. No "How competitive" paragraph: no admission figures are published. Field: a joint degree goes to its first-named discipline, Engineering (8.1).'
    },
    {
      id: 'cmuzj2p2x001a6x7mnjxiov6s',
      status: 'current',
      name: 'Artificial Intelligence, Data and Management Sciences',
      description:
        "The Bachelor in Artificial Intelligence, Data and Management Sciences is a four-year joint degree of CentraleSupélec and ESSEC Business School, taught in English and recognised at Bac+4 level. Classes alternate between CentraleSupélec's Paris-Saclay campus and ESSEC's campus in Cergy, west of Paris. Students build mathematical modelling, statistics, coding and machine learning alongside a general grounding in management, economics and business, with internships and a research or corporate project in the final year.\n\nApplicants apply online, take a compulsory online mathematics test, and shortlisted candidates have a motivational interview in English. An English test is required unless the last three years of school were taught entirely in English.",
      field: 'Computer Science',
      degree: 'Bachelor',
      duration: '4 years',
      minIBPoints: 24,
      programUrl: AIDMS,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }],
      checkedFor: 2026,
      sources: [AIDMS],
      notes:
        'Content 5.3: new. Joint degree with ESSEC (private), taught at CentraleSupélec Paris-Saclay and ESSEC Cergy: "During the first 2 years, 75% of the courses are delivered by professors of the school hosting students"; the host campus alternates by semester. No IB rule beyond the diploma: admission on the application, "The mathematics test is compulsory as it is a criterion for eligibility to the Program", then a motivational interview in English. The page asks "Do you have a solid foundation in mathematics"; stored as Maths AA or AI at SL, grade 4 as none is named, not critical (the maths test is the model limit). No minimum score, so 24, the Diploma. Entry year: the page says applications for the 2027 intake open by the end of October 2026, but its deadlines are still "for the 2025-26 intake" and the Parcoursup round of April 2026, so stamped 2026 (rule 2). Fees shown ("Total tuition intake 2025"): €19,700 a year for EU nationals (UK included), €23,000 for non-EU. Degree: titled "Bachelor in AI, Data & Management Sciences", Bac+4, stored as "Bachelor". Contact: bachelors@centralesupelec.fr. No "How competitive" paragraph: no admission figures are published. Field: a joint degree goes to its first-named discipline, Artificial Intelligence, in Computer Science (8.1).'
    }
  ]
}

export default refresh
