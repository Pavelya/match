import type { RefreshFile } from '../lib/refresh'

/**
 * University of Gdańsk: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-gdansk
 */
const refresh: RefreshFile = {
  university: 'University of Gdańsk',
  entryYear: 2027,
  checkedOn: '2026-09-27',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmkpir6vb000eii0475fh8tqg',
      status: 'current',
      name: 'Cultural Communication',
      description:
        'The Cultural Communication course, taught entirely in English, is designed for candidates with an interest in contemporary culture, literature and linguistics, who want to acquire a broad range of theoretical and practical knowledge as well as skills necessary for work in international cultural institutions and organisations.\nDrawing on the research and teaching experience of the Faculty of Languages at the University of Gdańsk, the interdisciplinary study programme explores various aspects of communication within culture, through culture and between cultures. It includes courses on audiovisual and digital culture; theatre, dance and performance; European and world literatures and their intermedial adaptations; the interrelations between culture and politics; as well as classes on linguistic analysis of discourse and social aspects of language. Taking the cue from its location in a city where for centuries the cultures of Western and Eastern Europe have met in fruitful dialogue, the programme also offers an introduction to the literature and culture of Poland and Central and Eastern Europe.',
      field: 'Social Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 34,
      programUrl: 'https://rekrutacja.ug.edu.pl/en/kierunek/cultural-communication-2/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://rekrutacja.ug.edu.pl/en/kierunek/cultural-communication-2/',
        'https://en.ug.edu.pl/study/educational-offer'
      ],
      notes:
        "Content 3.4: the stored page was the 2024/25 offer on old-en.ug.edu.pl (500); the programme now lives on UG's recruitment site. Same programme: first-cycle, full-time, English, Faculty of Languages, 3 years, 25 places. Checked, no subject strictly required: the ranking weights English 0.5, the candidate's native language 0.3 (another foreign language if English is native) and one of History, History of Art, Biology, Civics, Geography, Mathematics, Physics, Chemistry, a foreign language or Latin 0.2. The stored English SL4, science HL5 and language HL5 rows had no source and are removed. IB holders are exempt from the entrance exam for non-EU diplomas. 2025/26 threshold: 91.75 UG points. UG publishes no IB points minimum: candidates are ranked on weighted exam results, and the page gives only last year's threshold on UG's own scale. The stored 34 points predate this check and have no official source; they are kept, not re-verified (see the owner question in the 3.4 status). The page is for 2026/27 recruitment (registration June-July 2026, now closed), so checked for 2026."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkpj4ulz000sii04zxenuv9t',
      status: 'discontinued',
      name: 'Finance and Accounting, spec. Financial Analyst',
      description:
        'The curriculum of the Financial Analyst specialisation integrates general university subjects with specialised financial topics, focusing on the investment process. Students will acquire essential knowledge, skills, and competencies in modules such as Economics, Quantitative Methods, Corporate Finance and Reporting, Financial Markets and Instruments, Law and Ethics, and Social Sciences. Additionally, the programme offers elective modules customized to individual interests.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://old-en.ug.edu.pl/study/educational_offer/20252026/finance_and_accounting_spec_financial_analyst-stacjonarne-i_stopnia',
      requirements: [
        { courses: ['CS', 'ECON', 'GEOG', 'HIST'], level: 'HL', grade: 5, critical: false },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 5, critical: false },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: [
        'https://en.ug.edu.pl/study/educational-offer',
        'https://rekrutacja.ug.edu.pl/en/kierunek/finance-and-accounting-2/'
      ],
      notes:
        "Content 3.4: not in UG's English offer for 2026/27. UG's educational offer lists four English programmes: Cultural Communication and International Business (first cycle), and Finance and Accounting and International Business (second cycle). Finance and Accounting is now offered in English only as a two-year master's, which is not entered from school, so there is no successor to add. The stored page is the 2025/26 offer, still served on old-en.ug.edu.pl. Owner to decide what happens to this program."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkpihc2z0004ii046lhdtfuw',
      status: 'current',
      name: 'International Business',
      description:
        "The prestigious, English-language International Business Bachelor’s Degree was developed based on the Faculty of Economics' extensive experience in specialized programs conducted since 2008. This study program covers various topics, including international trade, marketing, transportation, finance, globalization, and international business relations. It also emphasizes cultural differences in business, preparing graduates to excel in culturally and linguistically diverse teams.",
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 34,
      programUrl: 'https://rekrutacja.ug.edu.pl/en/kierunek/international-business-4/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://rekrutacja.ug.edu.pl/en/kierunek/international-business-4/',
        'https://en.ug.edu.pl/study/educational-offer'
      ],
      notes:
        "Content 3.4: the stored page was the 2025/26 offer on old-en.ug.edu.pl (year-pinned); the programme now lives on UG's recruitment site (international-business-4 is the first-cycle one; -3 is the master's). Same programme: first-cycle, full-time, English, Faculty of Economics, 3 years, 105 places. Checked, no subject strictly required: the ranking weights English 0.6 and two of Geography, History, Computer Science, Mathematics or Civics 0.2 each. The stored English SL4 (critical), humanities HL5 and Maths HL5 rows had no source and are removed. IB holders are exempt from the entrance exam for non-EU diplomas. 2025/26 threshold: 110.30 UG points. UG publishes no IB points minimum: candidates are ranked on weighted exam results, and the page gives only last year's threshold on UG's own scale. The stored 34 points predate this check and have no official source; they are kept, not re-verified (see the owner question in the 3.4 status). The page is for 2026/27 recruitment (registration June-July 2026, now closed), so checked for 2026."
    }
  ]
}

export default refresh
