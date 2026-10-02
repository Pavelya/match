import type { RefreshFile } from '../lib/refresh'

/**
 * Catholic University of Portugal: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts catholic-university-of-portugal
 */
const refresh: RefreshFile = {
  university: 'Catholic University of Portugal',
  entryYear: 2027,
  checkedOn: '2026-10-02',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmkrz9s9a000dkw043vukad3o',
      status: 'current',
      name: 'BSc Systems and Cognitive Neuroscience',
      description:
        "Unlock the Secrets of the Brain: Neuroscience is the interdisciplinary study of the brain and nervous system. It seeks to understand how the neural circuits generate and support perception, cognition, emotions and behaviour, and how these processes are affected by disease.  \n\nImpact Health & Medicine: There is a growing need for innovative treatments for neurodegenerative diseases like Alzheimer's and Parkinson's, as well as for mental health conditions such as depression and schizophrenia. Research in Neuroscience offers an invaluable contribution to developing new therapies and improving the lives of millions worldwide.",
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://fcse.lisboa.ucp.pt/undergraduate/bsc-systems-and-cognitive-neuroscience/admission-requirements',
      requirements: [
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://fcse.lisboa.ucp.pt/undergraduate/bsc-systems-and-cognitive-neuroscience/applications-20262027/international-highschool-applicants',
        'https://fcse.lisboa.ucp.pt/undergraduate/bsc-systems-and-cognitive-neuroscience/admission-requirements'
      ],
      notes:
        'Content 4.8: international students (non-EU) need entrance exams equivalent to the Portuguese national exams 02 Biology and Geology and either 07 Physics and Chemistry or 16 Mathematics, or Católica Medical School\'s own written exams in English. For the IB: 02 = Biology SL or HL, 07 = Chemistry and Physics (both, SL or HL), 16 = Maths AA or AI, SL or HL. Every IB student has maths, so Biology plus maths is stored; Chemistry and Physics together are the other route. Each entrance exam needs at least 95/200 on the Portuguese scale; no IB-grade conversion is published, so the subjects are stored at 4. English C1 is required (CAE/CPE 180, IELTS 7, TOEFL iBT 94, Aptis C1), unless English is the first language or the secondary school taught exclusively in English. No IB points figure is published: the stored 36 is kept, unverified. The page is "Applications 2026/2027" (phases December 2025 - August 2026), so checked for 2026. The stored critical HL 6 Biology and Chemistry/Physics rows had no source and are replaced.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmks0c1jq001rkw047o2vgls6',
      status: 'current',
      name: 'Economics Degree (BSC)',
      description:
        'The Economics course is a comprehensive, cross-curricular programme for a versatile professional career. An approach that draws on critical thinking built on historical learning and past patterns that combines an analytical component.\n\nWith strong connections to the social sciences, Economics is a human science that helps to understand individual economic behaviours in society.\n\nThe scientific knowledge acquired in the course allows a world view based on economic thinking, economic history, and geo-economics with a solid mathematical underpinning.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://cpsbe.porto.ucp.pt/undergraduate/economics-degree',
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
        'https://admissions.porto.ucp.pt/pt/licenciaturas-outras-nacionalidades',
        'https://admissions.porto.ucp.pt/sites/default/files/2026-05/Aviso_Abertura_Candidaturas_FEGCPBS_Lic_EI_01_2026_27_PT_signed.pdf',
        'https://cpsbe.porto.ucp.pt/undergraduate/economics-degree'
      ],
      notes:
        'Content 4.8: the Porto school is now Católica Porto School of Business and Economics (cpsbe.porto.ucp.pt; the old address redirects). The degree can be completed entirely in English. International students (non-EU) need two entrance exams, Mathematics (mandatory, 30% of the application grade) and one more (20%: Economics, Portuguese, English, Physics and Chemistry, Geography or History, or a foreign equivalent), with the school-leaving grade at 50%; minimum 95/200 per exam and 100 overall, or two UCP exams instead. Only maths is stored: Católica Porto publishes no IB list, and Católica Lisbon and ISEG give Maths AA SL or HL and Maths AI HL as the IB equivalents of Mathematics A; almost every IB student holds one of the second-exam subjects. Each entrance exam needs at least 95/200 on the Portuguese scale; no IB-grade conversion is published, so the subjects are stored at 4. 2026/27: 20 places for international students across Economics (4) and Management (16), ranked jointly; phases December 2025 - June 2026, so checked for 2026. No IB points figure is published: the stored 38 is kept, unverified. The stored Economics/Geography/History/Physics and English rows are replaced.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkrz3kd90003kw04ve6k661l',
      status: 'current',
      name: 'Integrated Master in Medicine',
      description:
        "The UCP Medicine course is an Integrated Master's Degree lasting six academic years. It has a highly innovative curriculum, resulting from collaboration with the Faculty of Medicine of the University of Maastricht, an institution of great international prestige. It also has a partnership for the clinical component with the Luz Saúde Group, one of the largest private health groups in Portugal. The course is supported by modern pedagogies, with a strong technological base, and seeks to guarantee the humanization of the medical profession.",
      field: 'Medicine & Health',
      degree: "Single-Cycle Master's Degree",
      duration: '6 years',
      minIBPoints: 40,
      programUrl: 'https://fm.ucp.pt/integrated-master-medicine/integrated-master-medicine',
      requirements: [
        { courses: ['BIO'], level: 'SL', grade: 4, critical: true },
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://fm.ucp.pt/integrated-master-medicine/applications/special-admissions-international-students',
        'https://fm.ucp.pt/integrated-master-medicine/integrated-master-medicine'
      ],
      notes:
        "Content 4.8: the Special Competition for International Students (non-EU) requires entrance exams equivalent to 02 Biology and Geology, 07 Physics and Chemistry and 16 Mathematics (CNAES Deliberation 619/2026), or Católica Medical School's own written exams in English. For the IB: Biology SL or HL, Chemistry and Physics (both, SL or HL), Maths AA or AI, SL or HL. Each entrance exam needs at least 95/200 on the Portuguese scale; no IB-grade conversion is published, so the subjects are stored at 4. Applicants then complete an online motivation letter / portfolio and in-person multiple mini-interviews in English. 9 places for international students. No IB points figure is published: the stored 40 is kept, unverified. The page shows the 2026 calendar (third phase July - September 2026), so checked for 2026. The stored critical HL 6 sciences and HL 5 English and maths rows had no source and are replaced. Integrated Master in Medicine, 6 years."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkrzvode000ukw046fa4ms50',
      status: 'current',
      name: 'International Undergraduate Program in Business Administration',
      description:
        "The International Bachelor's Degree in Business Administration was launched in 2014 and CATÓLICA-LISBON was once again a pioneer in its internationalization strategy. Over the years, it has continued in the vanguard, keeping up with changes in international teaching standards and the demands of a constantly changing global labor market and business environment.\n\nWith a teaching staff made up of leading academics in the production of scientific knowledge and reputable members of industry and the business arena, the Bachelor's Degree in Business Administration allows students who choose this course to develop strong interdisciplinary skills in management in an international context, complemented by a highly analytic course framework.\n\nWhen you have concluded your Management course, you will have advanced knowledge of topics such as Strategy, Marketing and Accounting.",
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.clsbe.lisboa.ucp.pt/international-bachelors-degrees-business-administration/business',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'BUS-MGMT', level: 'SL', grade: 4 },
            { course: 'HIST', level: 'HL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.clsbe.lisboa.ucp.pt/international-bachelors-degrees-business-administration/how-apply',
        'https://www.clsbe.lisboa.ucp.pt/international-bachelors-degrees-business-administration/business'
      ],
      notes:
        "Content 4.8: Católica-Lisbon's international undergraduate programmes (taught in English) require a high-level Mathematics exam and a second high-level entrance exam, each taken 2022-2026, at a minimum of 50% (10/20 on the Portuguese scale; 80% recommended), and a secondary average of at least 50%. For the IB the eligible maths exams are Maths AA SL or HL and Maths AI HL (not AI SL); the eligible second exams are Business Management (SL or HL), a History HL regional option, English A Language and Literature or Literature (SL or HL) and English B HL. Economics is not on the IB list. The minimum 50% is stored as grade 4, as no IB conversion is published. English B2 (C1 recommended), a personal statement and a CV make up 15% of the application grade; a video interview may follow. Non-EU applicants without an eligible maths exam may take Católica's online Mathematics Admissions Test (70% to pass). No IB points figure is published (only the 50% secondary average): the stored 36 is kept, unverified. The pages describe the 2026 rounds (December 2025 - 2026), so checked for 2026. The stored maths, Economics/Geography/History/Physics and English rows are replaced."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmkrzzm3c0015kw04qhfkc6sp',
      status: 'current',
      name: 'International Undergraduate Program in Economics & Finance',
      description:
        "The International Bachelor's Degree in Economics was launched in 2014, becoming a Bachelor’s Degree in Economics & Finance in 2017, and CATÓLICA-LISBON was once again a pioneer in its internationalization strategy. Over the years, it has continued in the vanguard, keeping up with changes in international teaching standards and the demands of a constantly changing global labor market and business environment.\n\nWith a teaching staff made up of leading academics in the production of scientific knowledge and reputable members of industry and the business arena, the international Bachelor's Degree in Economics & Finance is intensely focused on International Economics & Finance and the course has a highly analytic framework.\n\nWhen you have concluded your Economics course, you will have advanced knowledge of topics such as Microeconomics, Macroeconomics and Corporate Finance.",
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.clsbe.lisboa.ucp.pt/iups-economics-finance/economics-finance',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'BUS-MGMT', level: 'SL', grade: 4 },
            { course: 'HIST', level: 'HL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.clsbe.lisboa.ucp.pt/international-bachelors-degrees-business-administration/how-apply',
        'https://www.clsbe.lisboa.ucp.pt/iups-economics-finance/economics-finance'
      ],
      notes:
        "Content 4.8: Católica-Lisbon's international undergraduate programmes (taught in English) require a high-level Mathematics exam and a second high-level entrance exam, each taken 2022-2026, at a minimum of 50% (10/20 on the Portuguese scale; 80% recommended), and a secondary average of at least 50%. For the IB the eligible maths exams are Maths AA SL or HL and Maths AI HL (not AI SL); the eligible second exams are Business Management (SL or HL), a History HL regional option, English A Language and Literature or Literature (SL or HL) and English B HL. Economics is not on the IB list. The minimum 50% is stored as grade 4, as no IB conversion is published. English B2 (C1 recommended), a personal statement and a CV make up 15% of the application grade; a video interview may follow. Non-EU applicants without an eligible maths exam may take Católica's online Mathematics Admissions Test (70% to pass). No IB points figure is published (only the 50% secondary average): the stored 38 is kept, unverified. The pages describe the 2026 rounds (December 2025 - 2026), so checked for 2026. The stored maths, Economics/Geography/History/Physics and English rows are replaced."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmks02yev001gkw04aimv178t',
      status: 'current',
      name: 'International Undergraduate Program in Management & Data Analytics',
      description:
        'The International Undergraduate Program in Management and Data Analytics was created to meet the growing need for professionals who can combine managerial expertise with analytical precision. This new program continues CATÓLICA-LISBON’s path of innovation, reflecting the school’s international positioning and ability to adapt to the evolving demands of a digital and data-driven global economy.\n\nWith a teaching staff composed of internationally recognized academics and experienced industry specialists, the International Undergraduate Program in Management and Data Analytics enables students to acquire a unique combination of core managerial knowledge and data analytics, to drive decisive action and solve complex business challenges with analytical rigor. Throughout the program, students will develop skills in areas such as data interpretation, digital transformation, and evidence-based decision making, while strengthening competencies in leadership and strategic thinking.\n\nWhen you complete your Management and Data Analytics degree, you will become a leader with strong data-analytical knowledge, able to pull data for strategic advantage, and will hold advanced knowledge in areas such as Strategy, Finance, Marketing, and Business Analytics.',
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.clsbe.lisboa.ucp.pt/international-undergraduate-program-management-data-analytics/management-data-analytics',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'BUS-MGMT', level: 'SL', grade: 4 },
            { course: 'HIST', level: 'HL', grade: 4 },
            { course: 'ENG-LL', level: 'SL', grade: 4 },
            { course: 'ENG-LIT', level: 'SL', grade: 4 },
            { course: 'ENG-B', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://clsbe.lisboa.ucp.pt/international-undergraduate-program-management-data-analytics/applications',
        'https://www.clsbe.lisboa.ucp.pt/international-undergraduate-program-management-data-analytics/management-data-analytics'
      ],
      notes:
        "Content 4.8: Católica-Lisbon's international undergraduate programmes (taught in English) require a high-level Mathematics exam and a second high-level entrance exam, each taken 2022-2026, at a minimum of 50% (10/20 on the Portuguese scale; 80% recommended), and a secondary average of at least 50%. For the IB the eligible maths exams are Maths AA SL or HL and Maths AI HL (not AI SL); the eligible second exams are Business Management (SL or HL), a History HL regional option, English A Language and Literature or Literature (SL or HL) and English B HL. Economics is not on the IB list. The minimum 50% is stored as grade 4, as no IB conversion is published. English B2 (C1 recommended), a personal statement and a CV make up 15% of the application grade; a video interview may follow. Non-EU applicants without an eligible maths exam may take Católica's online Mathematics Admissions Test (70% to pass). No IB points figure is published (only the 50% secondary average): the stored 38 is kept, unverified. The pages describe the 2026 rounds (December 2025 - 2026), so checked for 2026. The stored maths, Economics/Geography/History/Physics and English rows are replaced."
    },
    // Stored: not checked for any intake.
    {
      id: 'cmks0fxmf0022kw04o6ibd847',
      status: 'current',
      name: 'Management Degree (BSC)',
      description:
        "Católica Porto Business School's Management degree provides solid interdisciplinary training that qualifies you to work in this challenging and increasingly competitive world.\n\nThe teaching model, widely recognised by the business world, prioritises a close connection to the business world through solid university-company cooperation. In addition, it promotes internships in well-established companies, which brings advantageous positions for the students.",
      field: 'Business & Economics',
      degree: 'Bachelor',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://cpsbe.porto.ucp.pt/undergraduate/management-degree',
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
        'https://admissions.porto.ucp.pt/pt/licenciaturas-outras-nacionalidades',
        'https://admissions.porto.ucp.pt/sites/default/files/2026-05/Aviso_Abertura_Candidaturas_FEGCPBS_Lic_EI_01_2026_27_PT_signed.pdf',
        'https://cpsbe.porto.ucp.pt/undergraduate/management-degree'
      ],
      notes:
        'Content 4.8: the Porto school is now Católica Porto School of Business and Economics (cpsbe.porto.ucp.pt; the old address redirects). The degree can be completed entirely in English. International students (non-EU) need two entrance exams, Mathematics (mandatory, 30% of the application grade) and one more (20%: Economics, Portuguese, English, Physics and Chemistry, Geography or History, or a foreign equivalent), with the school-leaving grade at 50%; minimum 95/200 per exam and 100 overall, or two UCP exams instead. Only maths is stored: Católica Porto publishes no IB list, and Católica Lisbon and ISEG give Maths AA SL or HL and Maths AI HL as the IB equivalents of Mathematics A; almost every IB student holds one of the second-exam subjects. Each entrance exam needs at least 95/200 on the Portuguese scale; no IB-grade conversion is published, so the subjects are stored at 4. 2026/27: 20 places for international students across Economics (4) and Management (16), ranked jointly; phases December 2025 - June 2026, so checked for 2026. No IB points figure is published: the stored 38 is kept, unverified. The stored Economics/Geography/History/Physics and English rows are replaced.'
    }
  ]
}

export default refresh
