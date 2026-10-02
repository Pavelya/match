import type { RefreshFile } from '../lib/refresh'

/**
 * University of Lisbon: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-lisbon
 */
const refresh: RefreshFile = {
  university: 'University of Lisbon',
  entryYear: 2027,
  checkedOn: '2026-10-02',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-20. Degree stored as "Bachelor's Degree".
    {
      id: 'cmkmxg1s7001j7mdnbaiwkvk1',
      status: 'current',
      name: "Bachelor's in Applied Mathematics for Economics and Management",
      description:
        'The main objective of the degree in Applied Mathematics for Economics and Management is to combine a basic education in Economics and Management with a solid foundation in Mathematics. This degree prepares professionals who can efficiently equate and solve problems in the areas of economics and management, using mathematical tools and the most modern computational resources.',
      field: 'Natural Sciences',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.iseg.ulisboa.pt/en/study/undergraduate/applied-mathematics-for-economics-and-management/',
      requirements: [
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
        'https://www.iseg.ulisboa.pt/secretaria/en/applications/crediting/international-students/homologated-tests/',
        'https://www.iseg.ulisboa.pt/secretaria/en/applications/crediting/international-students/',
        'https://www.iseg.ulisboa.pt/en/study/undergraduate/applied-mathematics-for-economics-and-management/'
      ],
      notes:
        "Content 4.8: ISEG (Lisbon School of Economics and Management), taught in English, numerus clausus 30. International students (non-EU) need one homologous exam, Mathematics (mandatory); for the IB, Maths AA SL or HL or Maths AI HL (ISEG's list, from CNAES Deliberation 674/2025). Without one they sit ISEG's own maths exam in person in the first phase. The national route asks Mathematics A alone or with Portuguese, Economics, Physics and Chemistry, Geography, English or Biology and Geology. Minimum 95/200 per exam and an application grade of 100/200 (school-leaving grade 50%, exams 50%). Each entrance exam needs at least 95/200 on the Portuguese scale; no IB-grade conversion is published, so the subjects are stored at 4. English at B2 unless from an English-speaking country. No IB points figure is published: the stored 36 is kept, unverified. The pages name no intake, so checked for 2026. The stored rows (a science or Economics group and English, not critical) had no source and are removed; maths was HL 5 and is now AA SL or AI HL."
    },
    // Stored: checked for 2026 entry on 2026-01-20. Degree stored as "Bachelor's Degree".
    {
      id: 'cmkmxfzr700017mdnb6nqlqpk',
      status: 'current',
      name: "Bachelor's in Economics",
      description:
        "ISEG´s Bachelor's in Economics combines three essential elements for the education of an economist, in a unique way:\n\nA solid background in economic theory;\n\nA high degree of interdisciplinary learning in fields that are complementary to Economics (Management, Mathematics, Law, Sociology, and History);\n\nMastering the analytical tools of economic reality.\nThe combination of these three elements, together with the fact that students are able to choose elective course units to strengthen their areas of personal interest, means that the ISEG Bachelor's in Economics has a high standard of quality, which is widely recognized by the market, where our graduates easily find employment in both the private and public sectors.",
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 34,
      programUrl: 'https://www.iseg.ulisboa.pt/en/study/undergraduate/economics/',
      requirements: [
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
        'https://www.iseg.ulisboa.pt/secretaria/en/applications/crediting/international-students/homologated-tests/',
        'https://www.iseg.ulisboa.pt/secretaria/en/applications/crediting/international-students/',
        'https://www.iseg.ulisboa.pt/en/study/undergraduate/economics/'
      ],
      notes:
        "Content 4.8: ISEG (Lisbon School of Economics and Management), taught in English, numerus clausus 30. International students (non-EU) need one homologous exam, Mathematics (mandatory); for the IB, Maths AA SL or HL or Maths AI HL (ISEG's list, from CNAES Deliberation 674/2025). Without one they sit ISEG's own maths exam in person in the first phase. The national route asks Mathematics A alone or with Portuguese, Economics, Physics and Chemistry, Geography, English or Biology and Geology. Minimum 95/200 per exam and an application grade of 100/200 (school-leaving grade 50%, exams 50%). Each entrance exam needs at least 95/200 on the Portuguese scale; no IB-grade conversion is published, so the subjects are stored at 4. English at B2 unless from an English-speaking country. No IB points figure is published: the stored 34 is kept, unverified. The pages name no intake, so checked for 2026. The stored rows (a science or Economics group and English, not critical) had no source and are removed; maths was HL 4 and is now AA SL or AI HL."
    },
    // Stored: checked for 2026 entry on 2026-01-20. Degree stored as "Bachelor's Degree".
    {
      id: 'cmkmxg14u00117mdnkqdasehe',
      status: 'current',
      name: "Bachelor's in Finance",
      description:
        "ISEG has redesigned the Bachelor in Finance! It is an innovative and up-to-date study programme, which blends current trends in finance and advancements in technology with financial theory. The Bachelor's in Finance equips students with essential quantitative skills to understand the functioning of financial markets, the operations of businesses, and how to navigate the uncertainties of the financial world.",
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 30,
      programUrl: 'https://www.iseg.ulisboa.pt/en/study/undergraduate/finance/',
      requirements: [
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
        'https://www.iseg.ulisboa.pt/secretaria/en/applications/crediting/international-students/homologated-tests/',
        'https://www.iseg.ulisboa.pt/secretaria/en/applications/crediting/international-students/',
        'https://www.iseg.ulisboa.pt/en/study/undergraduate/finance/'
      ],
      notes:
        "Content 4.8: ISEG (Lisbon School of Economics and Management), taught in English, numerus clausus 32. International students (non-EU) need one homologous exam, Mathematics (mandatory); for the IB, Maths AA SL or HL or Maths AI HL (ISEG's list, from CNAES Deliberation 674/2025). Without one they sit ISEG's own maths exam in person in the first phase. The national route asks Mathematics A alone or with Portuguese, Economics, Physics and Chemistry, Geography, English or Biology and Geology. Minimum 95/200 per exam and an application grade of 100/200 (school-leaving grade 50%, exams 50%). Each entrance exam needs at least 95/200 on the Portuguese scale; no IB-grade conversion is published, so the subjects are stored at 4. English at B2 unless from an English-speaking country. No IB points figure is published: the stored 30 is kept, unverified. The pages name no intake, so checked for 2026. The stored rows (a science or Economics group and English, not critical) had no source and are removed; maths was HL 4 and is now AA SL or AI HL."
    },
    // Stored: checked for 2026 entry on 2026-01-20. Degree stored as "Bachelor's Degree".
    {
      id: 'cmkmxg0hf000j7mdn75wnvb5b',
      status: 'current',
      name: "Bachelor's in Management",
      description:
        "ISEG's Bachelor's degree in Management, one of the first in the country, has an excellent faculty – with professors who hold PhDs from various Portuguese and foreign universities and also visiting professors – who combine scientific and technical skills with market knowledge. The syllabus of the degree in Management ensures the provision of a solid education for future managers, with a comprehensive structure based on the core subjects of Management (namely Finance, Marketing, Accounting, Human Resource Management, Production Management, and Information Systems), as well as areas which are equally key for the teaching of Management, such as Economics, Mathematics, and Social Sciences.",
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 32,
      programUrl: 'https://www.iseg.ulisboa.pt/en/study/undergraduate/management/',
      requirements: [
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
        'https://www.iseg.ulisboa.pt/secretaria/en/applications/crediting/international-students/homologated-tests/',
        'https://www.iseg.ulisboa.pt/secretaria/en/applications/crediting/international-students/',
        'https://www.iseg.ulisboa.pt/en/study/undergraduate/management/'
      ],
      notes:
        "Content 4.8: ISEG (Lisbon School of Economics and Management), taught in English, numerus clausus 60. International students (non-EU) need one homologous exam, Mathematics (mandatory); for the IB, Maths AA SL or HL or Maths AI HL (ISEG's list, from CNAES Deliberation 674/2025). Without one they sit ISEG's own maths exam in person in the first phase. The national route asks Mathematics A alone or with Portuguese, Economics, Physics and Chemistry, Geography, English or Biology and Geology. Minimum 95/200 per exam and an application grade of 100/200 (school-leaving grade 50%, exams 50%). Each entrance exam needs at least 95/200 on the Portuguese scale; no IB-grade conversion is published, so the subjects are stored at 4. English at B2 unless from an English-speaking country. No IB points figure is published: the stored 32 is kept, unverified. The pages name no intake, so checked for 2026. The stored rows (a science or Economics group and English, not critical) had no source and are removed; maths was HL 4 and is now AA SL or AI HL."
    }
  ]
}

export default refresh
