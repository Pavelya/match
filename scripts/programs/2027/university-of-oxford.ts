import type { UniversityUpdate } from './types'

/**
 * University of Oxford: requirements checked for 2027 entry on 24 September 2026
 * (content task 1.2). The same targets, with the reasoning, are in
 * docs/tasks/content-2027/oxford-cambridge.md. Apply with
 * scripts/programs/apply-2027-requirements.ts.
 */
const update: UniversityUpdate = {
  university: 'University of Oxford',
  entryYear: 2027,
  // Most rows come from department pages that name no year. They count as 2026 until the
  // owner's spot check of two course pages (see the handoff file) confirms them; then 2027.
  undatedEntryYear: 2026,
  checkedOn: '2026-09-24',
  programs: [
    {
      id: 'cmkr3le5w00037mc2fc7uza3n',
      name: 'Archaeology and Anthropology',
      minIBPoints: 38,
      requirements: [],
      sources: [
        'https://www.st-hughs.ox.ac.uk/course/archaeology-anthropology/',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: 'No specific subjects required; a mix of arts and sciences is called helpful.'
    },
    {
      id: 'cmkr3leho00057mc22nhlra58',
      name: 'Asian and Middle Eastern Studies',
      minIBPoints: 39,
      requirements: [],
      sources: [
        'https://www.orinst.ox.ac.uk/article/applying-undergraduate',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        'The summary table confirms AAA and no required subjects (a language is only relevant). IB points are not on the table. 39 comes from the faculty FAQ, which still gives 2026-entry dates: confirm it on the course page.',
      hold: 'IB points are not on the summary table; confirm 39 on the course page.'
    },
    {
      id: 'cmkr3lmdl002f7mc2i4lnr19o',
      name: 'Biochemistry (Molecular and Cellular)',
      minIBPoints: 39,
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 7, critical: true },
        { courses: ['BIO', 'PHYS', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 6, critical: true }
      ],
      sources: [
        'https://www.bioch.ox.ac.uk/undergraduate-admissions',
        'https://www.st-hughs.ox.ac.uk/course/biochemistry-molecular-and-cellular/',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        '"7 in HL Chemistry and 6 in two other relevant subjects at HL or SL". The model can express one of the two; SL is used because an HL course also satisfies an SL requirement.'
    },
    {
      id: 'cmkr3ln0f002r7mc2xpkikcba',
      name: 'Biology',
      minIBPoints: 39,
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'PHYS', 'MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
      ],
      sources: [
        'https://www.st-hughs.ox.ac.uk/course/biology/',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        'Biology and one of Chemistry, Physics or Maths at HL, "with 7 in HL Mathematics or a science". Which subject carries the 7 is not fixed, so each requirement is 6.'
    },
    {
      id: 'cmkr3lnl300337mc2h7tayqs6',
      name: 'Chemistry',
      minIBPoints: 40,
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 7, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
      ],
      sources: [
        'https://www.chem.ox.ac.uk/admissions',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        'Alternative route not modelled: with SL Maths, 776 at HL with 7 in Chemistry and a second HL science, and 7 in SL Maths AA.'
    },
    {
      id: 'cmkr3leqp00077mc2fzkq30co',
      name: 'Classical Archaeology and Ancient History',
      minIBPoints: 39,
      requirements: [],
      sources: [
        'https://www.classics.ox.ac.uk/interviews',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/classical-archaeology-and-ancient-history'
      ],
      sourceYear: null,
      notes:
        'The summary table marks a classical language, Classical Civilisation and Ancient History as relevant only, so no subject is required. 39 is the Classics faculty standard offer and matches the ox.ac.uk course page as indexed by search.'
    },
    {
      id: 'cmkr3lf1j00097mc2v9vijjwd',
      name: 'Classics',
      minIBPoints: 39,
      requirements: [],
      sources: [
        'https://www.classics.ox.ac.uk/interviews',
        'https://www.st-hughs.ox.ac.uk/course/classics/',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        'No subjects required. "6s at HL in Latin and Greek if taken" is a conditional the model cannot express.'
    },
    {
      id: 'cmkr3lfcm000b7mc2a2zxhy7c',
      name: 'Classics and English',
      minIBPoints: 39,
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }],
      sources: [
        'https://www.classics.ox.ac.uk/interviews',
        'https://www.english.ox.ac.uk/faq-undergraduate',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        'English Literature or English Language and Literature at HL is required. Latin or Greek is required only for the 3-year version; the 4-year version teaches them from scratch.'
    },
    {
      id: 'cmkr3lfs6000h7mc2xh1uelk3',
      name: 'Classics and Modern Languages',
      minIBPoints: 39,
      requirements: [
        {
          courses: [
            'FRA-B',
            'GER-B',
            'ITA-B',
            'POR-B',
            'RUS-B',
            'SPA-B',
            'FRA-LIT',
            'FRA-LIT-A',
            'FRA-LL',
            'GER-LIT',
            'GER-LIT-A',
            'GER-LL',
            'SPA-LIT',
            'SPA-LIT-A',
            'SPA-LL',
            'LAT',
            'LATIN',
            'GREEK',
            'GRK'
          ],
          level: 'HL',
          grade: 6,
          critical: true
        }
      ],
      sources: [
        'https://www.mod-langs.ox.ac.uk/courses/ba-classics-modern-languages',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        "Every combination expects at least one of its two languages (classical or modern) to A-level/HL; either side may be a beginners' option, not both. Czech and Modern Greek count too but have no IB course code here."
    },
    {
      id: 'cmkr3lo1p003b7mc2b6ewty4w',
      name: 'Computer Science',
      minIBPoints: 39,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      sources: [
        'https://www.cs.ox.ac.uk/admissions/undergraduate/why_oxford/offers.html',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: '766 at HL with the 7 in Maths. AA and AI accepted "without preference".'
    },
    {
      id: 'cmkr3loec003f7mc2kn5usmc5',
      name: 'Computer Science and Philosophy',
      minIBPoints: 39,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      sources: [
        'https://www.cs.ox.ac.uk/admissions/undergraduate/why_oxford/offers.html',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: 'The department gives one IB requirement for all its courses.'
    },
    {
      id: 'cmkr3lorz003j7mc2u71naqm7',
      name: 'Earth Sciences (Geology)',
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/earth-sciences-geology',
      minIBPoints: 39,
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      sources: [
        'https://www.earth.ox.ac.uk/undergraduate/admissions',
        'https://www.st-hughs.ox.ac.uk/course/earth-sciences-geology/',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        'Maths plus Chemistry or Physics at HL, 766 overall. The stored single OR group of all four subjects let a student meet it with Chemistry alone. The summary table links the course at `earth-sciences-geology`.'
    },
    {
      id: 'cmkr3lu60005z7mc2b073xe4q',
      name: 'Economics and Management',
      minIBPoints: 39,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }],
      sources: [
        'https://www.economics.ox.ac.uk/undergraduate-admissions-criteria',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: 'Maths at HL, "score 6 or 7".'
    },
    {
      id: 'cmkr3lpat003t7mc21bfqmwks',
      name: 'Engineering Science',
      minIBPoints: 40,
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 7, critical: true }
      ],
      sources: [
        'https://www.st-hughs.ox.ac.uk/course/engineering/',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        '776 with 7s in HL Maths and Physics. Whether AI is accepted is not stated; AA and AI are both kept as stored.'
    },
    {
      id: 'cmkr3lgij000p7mc2hrwiupjd',
      name: 'English and Modern Languages',
      minIBPoints: 38,
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }],
      sources: [
        'https://www.mod-langs.ox.ac.uk/courses/ba-english-modern-languages',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: "The language can be a beginners' option, so only English is required."
    },
    {
      id: 'cmkr3lg3x000j7mc2ao1gsi9c',
      name: 'English Language and Literature',
      minIBPoints: 38,
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }],
      sources: [
        'https://www.english.ox.ac.uk/faq-undergraduate',
        'https://www.st-hughs.ox.ac.uk/course/english-language-literature/',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null
    },
    {
      id: 'cmkr3lgxx000v7mc2dprmd158',
      name: 'European and Middle Eastern Languages',
      minIBPoints: 38,
      requirements: [
        {
          courses: [
            'FRA-B',
            'GER-B',
            'ITA-B',
            'POR-B',
            'RUS-B',
            'SPA-B',
            'FRA-LIT',
            'FRA-LIT-A',
            'FRA-LL',
            'GER-LIT',
            'GER-LIT-A',
            'GER-LL',
            'SPA-LIT',
            'SPA-LIT-A',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 6,
          critical: true
        }
      ],
      sources: [
        'https://www.mod-langs.ox.ac.uk/courses/ba-european-middle-eastern-languages',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        'Every combination expects the European language to A-level/HL; the Middle Eastern language starts from scratch. Czech and Modern Greek count too but have no IB course code here.'
    },
    {
      id: 'cmkr3lh78000x7mc2v1uw9t67',
      name: 'Fine Art',
      minIBPoints: 38,
      requirements: [],
      sources: [
        'https://www.rsa.ox.ac.uk/study/undergraduate/applying-to-study-for-a-bfa',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: 2027,
      notes:
        "The summary table marks Art as recommended, not required, so the stored Visual Arts requirement goes. The Ruskin's 2027-entry page confirms the standard AAA/38."
    },
    {
      id: 'cmkr3luk900657mc2ycoa2x1f',
      name: 'Geography',
      minIBPoints: 39,
      requirements: [],
      sources: [
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements',
        'https://www.geog.ox.ac.uk/study/undergraduate/faq.html'
      ],
      sourceYear: null,
      notes:
        "The summary table gives A*AA and marks Geography as recommended only. IB points are not on the table; 39 is Oxford's usual A*AA equivalent and what the department FAQ and the indexed course page give."
    },
    {
      id: 'cmkr3lhjk00117mc279pvvaa5',
      name: 'History',
      minIBPoints: 38,
      requirements: [],
      sources: [
        'https://www.history.ox.ac.uk/making-application',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: 'History is "strongly advised … but it is not an absolute requirement".'
    },
    {
      id: 'cmkr3lhwx00157mc244nfy5y4',
      name: 'History (Ancient and Modern)',
      minIBPoints: 38,
      requirements: [],
      sources: [
        'https://www.history.ox.ac.uk/making-application',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: 'As History; no classical language needed.'
    },
    {
      id: 'cmkr3ljja001p7mc25o5wujyl',
      name: 'History and Economics',
      minIBPoints: 38,
      requirements: [],
      sources: [
        'https://www.history.ox.ac.uk/making-application',
        'https://www.economics.ox.ac.uk/undergraduate-admissions-criteria',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: 'History and Maths are both "highly recommended", neither required.'
    },
    {
      id: 'cmkr3li9y00197mc2j08ug4ja',
      name: 'History and English',
      minIBPoints: 38,
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }],
      sources: [
        'https://www.history.ox.ac.uk/making-application',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: '"You must take English (Language or Literature)"; History is advised, not required.'
    },
    {
      id: 'cmkr3lirn001h7mc28i03ye2h',
      name: 'History and Modern Languages',
      minIBPoints: 38,
      requirements: [],
      sources: [
        'https://www.history.ox.ac.uk/making-application',
        'https://www.mod-langs.ox.ac.uk/courses/ba-history-modern-languages',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        "The language is required unless a beginners' option is chosen, so nothing is required overall."
    },
    {
      id: 'cmkr3lj62001l7mc29de2sc2b',
      name: 'History and Politics',
      minIBPoints: 38,
      requirements: [],
      sources: [
        'https://www.history.ox.ac.uk/making-application',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: '"There are no specific requirements."'
    },
    {
      id: 'cmkr3lk04001x7mc2fbrml90n',
      name: 'History of Art',
      programUrl:
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history-of-art',
      minIBPoints: 38,
      requirements: [],
      sources: [
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        'The summary table requires "a subject involving essay writing", which the model cannot express (almost every IB student meets it through Language A), and links the course at `history-of-art`. IB points are not on the table: confirm 38 on the course page.',
      hold: 'IB points are not on the summary table; confirm 38 on the course page.'
    },
    {
      id: 'cmkr3luvc00677mc2ntipetz0',
      name: 'Human Sciences',
      minIBPoints: 38,
      requirements: [],
      sources: [
        'https://www.st-hughs.ox.ac.uk/course/human-sciences/',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: 'Biology or Maths "can be helpful … not required".'
    },
    {
      id: 'cmkr3lv6900697mc2sfdierl7',
      name: 'Law (Jurisprudence)',
      minIBPoints: 38,
      requirements: [],
      sources: [
        'https://www.st-hughs.ox.ac.uk/course/law/',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        'Law with Law Studies in Europe expects French, German or Spanish at HL for those countries; not modelled.'
    },
    {
      id: 'cmkr3lpte00417mc2bkushx85',
      name: 'Materials Science',
      minIBPoints: 40,
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      sources: [
        'https://www.materials.ox.ac.uk/admissions/undergraduate/admissions-criteria.html',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: 2027,
      notes:
        '"766 … with the 7 at HL in any one of Maths, Physics or Chemistry". Maths and Physics at HL are essential; Chemistry is only recommended, at SL if not HL.'
    },
    {
      id: 'cmkr3lqcb004b7mc27865olw3',
      name: 'Mathematics',
      minIBPoints: 39,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      sources: [
        'https://www.maths.ox.ac.uk/study-here/undergraduate-study/our-offer',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: '766 with a 7 in HL Maths; AA and AI accepted "without preference".'
    },
    {
      id: 'cmkr3lqp3004f7mc220lvk2j7',
      name: 'Mathematics and Computer Science',
      minIBPoints: 39,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      sources: [
        'https://www.maths.ox.ac.uk/study-here/undergraduate-study/our-offer',
        'https://www.st-hughs.ox.ac.uk/course/mathematics-computer-sciences-joint-schools/',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null
    },
    {
      id: 'cmkr3lr20004j7mc2p1l21qd0',
      name: 'Mathematics and Philosophy',
      minIBPoints: 39,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      sources: [
        'https://www.maths.ox.ac.uk/study-here/undergraduate-study/our-offer',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null
    },
    {
      id: 'cmkr3lrfp004n7mc2287igzxg',
      name: 'Mathematics and Statistics',
      minIBPoints: 39,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      sources: [
        'https://www.maths.ox.ac.uk/study-here/undergraduate-study/our-offer',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: 'Admission is joint with Mathematics.'
    },
    {
      id: 'cmkr3lrqn004r7mc2tmg5ni78',
      name: 'Medicine',
      minIBPoints: 39,
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'PHYS', 'MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
      ],
      sources: [
        'https://www.medsci.ox.ac.uk/study/medicine/pre-clinical/requirements/academic',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        '"7, 6 and 6" at HL with no subject named for the 7, so each requirement is 6. AA and AI accepted.'
    },
    {
      id: 'cmkr3lkap001z7mc26uwjrhvt',
      name: 'Modern Languages',
      minIBPoints: 38,
      requirements: [
        {
          courses: [
            'FRA-B',
            'GER-B',
            'ITA-B',
            'POR-B',
            'RUS-B',
            'SPA-B',
            'FRA-LIT',
            'FRA-LIT-A',
            'FRA-LL',
            'GER-LIT',
            'GER-LIT-A',
            'GER-LL',
            'SPA-LIT',
            'SPA-LIT-A',
            'SPA-LL'
          ],
          level: 'HL',
          grade: 6,
          critical: true
        }
      ],
      sources: [
        'https://www.mod-langs.ox.ac.uk/courses/ba-modern-languages',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        "Every combination expects at least one language to A-level/HL; a second can be a beginners' option. Czech and Modern Greek count too but have no IB course code here."
    },
    {
      id: 'cmkr3lklu00217mc2ttufv5vo',
      name: 'Modern Languages and Linguistics',
      minIBPoints: 38,
      requirements: [],
      sources: [
        'https://www.mod-langs.ox.ac.uk/courses/ba-modern-languages-linguistics',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: "Beginners' options exist, so no language is required overall."
    },
    {
      id: 'cmkr3lkuo00237mc2e6zjbate',
      name: 'Music',
      minIBPoints: 38,
      requirements: [{ courses: ['MUSIC'], level: 'HL', grade: 6, critical: false }],
      sources: [
        'https://www.st-hughs.ox.ac.uk/course/music/',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes:
        'Music at HL "or Music Theory Grade 7 or above"; not critical because of that alternative.'
    },
    {
      id: 'cmkr3ll7o00277mc2n8mfjmbz',
      name: 'Philosophy and Modern Languages',
      minIBPoints: 39,
      requirements: [],
      sources: [
        'https://www.mod-langs.ox.ac.uk/courses/ba-philosophy-modern-languages',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: "Beginners' options exist, so no language is required overall."
    },
    {
      id: 'cmkr3llin00297mc2eqftvcnu',
      name: 'Philosophy and Theology',
      minIBPoints: 39,
      requirements: [],
      sources: [
        'https://www.theology.ox.ac.uk/undergraduate-faqs',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: 2027
    },
    {
      id: 'cmkr3lvha006b7mc247n07fpt',
      name: 'Philosophy, Politics and Economics',
      minIBPoints: 39,
      requirements: [],
      sources: [
        'https://www.economics.ox.ac.uk/undergraduate-admissions-criteria',
        'https://www.st-hughs.ox.ac.uk/course/philosophy-politics-and-economics-ppe/',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: 'Maths is recommended, "not formally required".'
    },
    {
      id: 'cmkr3lscf00537mc20g8lkyzp',
      name: 'Physics',
      minIBPoints: 39,
      requirements: [
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
      ],
      sources: [
        'https://www.physics.ox.ac.uk/study/undergraduates/how-apply',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: '766 with "the 7 … in either Physics or Mathematics", so each requirement is 6.'
    },
    {
      id: 'cmkr3lssp005b7mc2r08kcaqz',
      name: 'Physics and Philosophy',
      minIBPoints: 39,
      requirements: [
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
      ],
      sources: [
        'https://www.physics.ox.ac.uk/study/undergraduates/how-apply',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: 'The department gives one requirement for Physics and MPhysPhil.'
    },
    {
      id: 'cmkr3lt94005j7mc229ipzdyd',
      name: 'Psychology (Experimental)',
      minIBPoints: 39,
      requirements: [],
      sources: [
        'https://www.st-hughs.ox.ac.uk/course/psychology/',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null,
      notes: 'A science or Maths is "highly recommended", not required.'
    },
    {
      id: 'cmkr3ltx2005x7mc2fvdg35mf',
      name: 'Psychology, Philosophy and Linguistics',
      minIBPoints: 39,
      requirements: [],
      sources: [
        'https://www.lmh.ox.ac.uk/study-here/undergraduate/courses/psychology-philosophy-and-linguistics',
        'https://www.st-hughs.ox.ac.uk/course/psychology/',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: null
    },
    {
      id: 'cmkr3llti002b7mc245qrp7ih',
      name: 'Religion and Asian and Middle Eastern Studies',
      minIBPoints: 38,
      requirements: [],
      sources: [
        'https://www.theology.ox.ac.uk/undergraduate-faqs',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: 2027
    },
    {
      id: 'cmkr3lm2m002d7mc20lz86lxq',
      name: 'Theology and Religion',
      minIBPoints: 38,
      requirements: [],
      sources: [
        'https://www.theology.ox.ac.uk/undergraduate-faqs',
        'https://www.ox.ac.uk/admissions/undergraduate/courses/admissions-requirements/summary-table-of-admissions-requirements'
      ],
      sourceYear: 2027
    }
  ]
}

export default update
