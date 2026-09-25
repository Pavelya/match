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
  checkedOn: '2026-09-24',
  programs: [
    {
      id: 'cmkr3le5w00037mc2fc7uza3n',
      name: 'Archaeology and Anthropology',
      minIBPoints: 38,
      requirements: [],
      sources: ['https://www.st-hughs.ox.ac.uk/course/archaeology-anthropology/'],
      sourceYear: null,
      notes: 'No specific subjects required; a mix of arts and sciences is called helpful.'
    },
    {
      id: 'cmkr3leho00057mc22nhlra58',
      name: 'Asian and Middle Eastern Studies',
      minIBPoints: 39,
      requirements: [],
      sources: ['https://www.orinst.ox.ac.uk/article/applying-undergraduate'],
      sourceYear: null,
      notes:
        'Faculty FAQ: "IB: 39 (including core points) with 666 at HL"; no language needed. The same page still gives 2026-entry decision dates, so confirm 39 on the summary table.',
      hold: 'The source still gives 2026-entry dates; confirm 39 on the ox.ac.uk summary table.'
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
        'https://www.st-hughs.ox.ac.uk/course/biochemistry-molecular-and-cellular/'
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
      sources: ['https://www.st-hughs.ox.ac.uk/course/biology/'],
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
      sources: ['https://www.chem.ox.ac.uk/admissions'],
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
        'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/classical-archaeology-and-ancient-history'
      ],
      sourceYear: null,
      notes:
        '39 is the Classics faculty standard offer and matches the ox.ac.uk course page as indexed by search. No reachable page states the subject rule; none are stored.',
      hold: 'No reachable page states the subject rule.'
    },
    {
      id: 'cmkr3lf1j00097mc2v9vijjwd',
      name: 'Classics',
      minIBPoints: 39,
      requirements: [],
      sources: [
        'https://www.classics.ox.ac.uk/interviews',
        'https://www.st-hughs.ox.ac.uk/course/classics/'
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
        'https://www.english.ox.ac.uk/faq-undergraduate'
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
      sources: ['https://www.mod-langs.ox.ac.uk/courses/ba-classics-modern-languages'],
      sourceYear: null,
      notes:
        "Every combination expects at least one of its two languages (classical or modern) to A-level/HL; either side may be a beginners' option, not both. Czech and Modern Greek count too but have no IB course code here."
    },
    {
      id: 'cmkr3lo1p003b7mc2b6ewty4w',
      name: 'Computer Science',
      minIBPoints: 39,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      sources: ['https://www.cs.ox.ac.uk/admissions/undergraduate/why_oxford/offers.html'],
      sourceYear: null,
      notes: '766 at HL with the 7 in Maths. AA and AI accepted "without preference".'
    },
    {
      id: 'cmkr3loec003f7mc2kn5usmc5',
      name: 'Computer Science and Philosophy',
      minIBPoints: 39,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      sources: ['https://www.cs.ox.ac.uk/admissions/undergraduate/why_oxford/offers.html'],
      sourceYear: null,
      notes: 'The department gives one IB requirement for all its courses.'
    },
    {
      id: 'cmkr3lorz003j7mc2u71naqm7',
      name: 'Earth Sciences (Geology)',
      minIBPoints: 39,
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      sources: [
        'https://www.earth.ox.ac.uk/undergraduate/admissions',
        'https://www.st-hughs.ox.ac.uk/course/earth-sciences-geology/'
      ],
      sourceYear: null,
      notes:
        'Maths plus Chemistry or Physics at HL, 766 overall. The stored single OR group of all four subjects let a student meet it with Chemistry alone.'
    },
    {
      id: 'cmkr3lu60005z7mc2b073xe4q',
      name: 'Economics and Management',
      minIBPoints: 39,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }],
      sources: ['https://www.economics.ox.ac.uk/undergraduate-admissions-criteria'],
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
      sources: ['https://www.st-hughs.ox.ac.uk/course/engineering/'],
      sourceYear: null,
      notes:
        '776 with 7s in HL Maths and Physics. Whether AI is accepted is not stated; AA and AI are both kept as stored.'
    },
    {
      id: 'cmkr3lgij000p7mc2hrwiupjd',
      name: 'English and Modern Languages',
      minIBPoints: 38,
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }],
      sources: ['https://www.mod-langs.ox.ac.uk/courses/ba-english-modern-languages'],
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
        'https://www.st-hughs.ox.ac.uk/course/english-language-literature/'
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
      sources: ['https://www.mod-langs.ox.ac.uk/courses/ba-european-middle-eastern-languages'],
      sourceYear: null,
      notes:
        'Every combination expects the European language to A-level/HL; the Middle Eastern language starts from scratch. Czech and Modern Greek count too but have no IB course code here.'
    },
    {
      id: 'cmkr3lh78000x7mc2v1uw9t67',
      name: 'Fine Art',
      minIBPoints: 38,
      requirements: [{ courses: ['VISUAL-ARTS'], level: 'HL', grade: 6, critical: true }],
      sources: ['https://www.rsa.ox.ac.uk/study/undergraduate/applying-to-study-for-a-bfa'],
      sourceYear: 2027,
      notes:
        "The Ruskin's 2027-entry page confirms the standard AAA/38 but names no required subject. The stored Visual Arts requirement is kept until the ox.ac.uk course page confirms or drops it.",
      hold: 'Confirm whether Visual Arts at HL is still required.'
    },
    {
      id: 'cmkr3luk900657mc2ycoa2x1f',
      name: 'Geography',
      minIBPoints: 39,
      requirements: [],
      sources: ['https://www.geog.ox.ac.uk/study/undergraduate/faq.html'],
      sourceYear: null,
      notes:
        'The department FAQ says A*AA (the 39 / 766 tier) and "no required subjects", but its test notes date from 2025.',
      hold: 'The only direct source dates from the 2025 cycle.'
    },
    {
      id: 'cmkr3lhjk00117mc279pvvaa5',
      name: 'History',
      minIBPoints: 38,
      requirements: [],
      sources: ['https://www.history.ox.ac.uk/making-application'],
      sourceYear: null,
      notes: 'History is "strongly advised … but it is not an absolute requirement".'
    },
    {
      id: 'cmkr3lhwx00157mc244nfy5y4',
      name: 'History (Ancient and Modern)',
      minIBPoints: 38,
      requirements: [],
      sources: ['https://www.history.ox.ac.uk/making-application'],
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
        'https://www.economics.ox.ac.uk/undergraduate-admissions-criteria'
      ],
      sourceYear: null,
      notes: 'History and Maths are both "highly recommended", neither required.'
    },
    {
      id: 'cmkr3li9y00197mc2j08ug4ja',
      name: 'History and English',
      minIBPoints: 38,
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }],
      sources: ['https://www.history.ox.ac.uk/making-application'],
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
        'https://www.mod-langs.ox.ac.uk/courses/ba-history-modern-languages'
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
      sources: ['https://www.history.ox.ac.uk/making-application'],
      sourceYear: null,
      notes: '"There are no specific requirements."'
    },
    {
      id: 'cmkr3lk04001x7mc2fbrml90n',
      name: 'History of Art',
      minIBPoints: 38,
      requirements: [],
      sources: [],
      sourceYear: null,
      notes:
        'No reachable page states the requirement; the department defers to ox.ac.uk. The stored URL slug `history-art` may now be `history-of-art` (search results use the latter).',
      hold: 'No reachable source; also check whether the URL slug is now history-of-art.'
    },
    {
      id: 'cmkr3luvc00677mc2ntipetz0',
      name: 'Human Sciences',
      minIBPoints: 38,
      requirements: [],
      sources: ['https://www.st-hughs.ox.ac.uk/course/human-sciences/'],
      sourceYear: null,
      notes: 'Biology or Maths "can be helpful … not required".'
    },
    {
      id: 'cmkr3lv6900697mc2sfdierl7',
      name: 'Law (Jurisprudence)',
      minIBPoints: 38,
      requirements: [],
      sources: ['https://www.st-hughs.ox.ac.uk/course/law/'],
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
      sources: ['https://www.materials.ox.ac.uk/admissions/undergraduate/admissions-criteria.html'],
      sourceYear: 2027,
      notes:
        '"766 … with the 7 at HL in any one of Maths, Physics or Chemistry". Maths and Physics at HL are essential; Chemistry is only recommended, at SL if not HL.'
    },
    {
      id: 'cmkr3lqcb004b7mc27865olw3',
      name: 'Mathematics',
      minIBPoints: 39,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      sources: ['https://www.maths.ox.ac.uk/study-here/undergraduate-study/our-offer'],
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
        'https://www.st-hughs.ox.ac.uk/course/mathematics-computer-sciences-joint-schools/'
      ],
      sourceYear: null
    },
    {
      id: 'cmkr3lr20004j7mc2p1l21qd0',
      name: 'Mathematics and Philosophy',
      minIBPoints: 39,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      sources: ['https://www.maths.ox.ac.uk/study-here/undergraduate-study/our-offer'],
      sourceYear: null
    },
    {
      id: 'cmkr3lrfp004n7mc2287igzxg',
      name: 'Mathematics and Statistics',
      minIBPoints: 39,
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      sources: ['https://www.maths.ox.ac.uk/study-here/undergraduate-study/our-offer'],
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
      sources: ['https://www.medsci.ox.ac.uk/study/medicine/pre-clinical/requirements/academic'],
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
      sources: ['https://www.mod-langs.ox.ac.uk/courses/ba-modern-languages'],
      sourceYear: null,
      notes:
        "Every combination expects at least one language to A-level/HL; a second can be a beginners' option. Czech and Modern Greek count too but have no IB course code here."
    },
    {
      id: 'cmkr3lklu00217mc2ttufv5vo',
      name: 'Modern Languages and Linguistics',
      minIBPoints: 38,
      requirements: [],
      sources: ['https://www.mod-langs.ox.ac.uk/courses/ba-modern-languages-linguistics'],
      sourceYear: null,
      notes: "Beginners' options exist, so no language is required overall."
    },
    {
      id: 'cmkr3lkuo00237mc2e6zjbate',
      name: 'Music',
      minIBPoints: 38,
      requirements: [{ courses: ['MUSIC'], level: 'HL', grade: 6, critical: false }],
      sources: ['https://www.st-hughs.ox.ac.uk/course/music/'],
      sourceYear: null,
      notes:
        'Music at HL "or Music Theory Grade 7 or above"; not critical because of that alternative.'
    },
    {
      id: 'cmkr3ll7o00277mc2n8mfjmbz',
      name: 'Philosophy and Modern Languages',
      minIBPoints: 39,
      requirements: [],
      sources: ['https://www.mod-langs.ox.ac.uk/courses/ba-philosophy-modern-languages'],
      sourceYear: null,
      notes: "Beginners' options exist, so no language is required overall."
    },
    {
      id: 'cmkr3llin00297mc2eqftvcnu',
      name: 'Philosophy and Theology',
      minIBPoints: 39,
      requirements: [],
      sources: ['https://www.theology.ox.ac.uk/undergraduate-faqs'],
      sourceYear: 2027
    },
    {
      id: 'cmkr3lvha006b7mc247n07fpt',
      name: 'Philosophy, Politics and Economics',
      minIBPoints: 39,
      requirements: [],
      sources: [
        'https://www.economics.ox.ac.uk/undergraduate-admissions-criteria',
        'https://www.st-hughs.ox.ac.uk/course/philosophy-politics-and-economics-ppe/'
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
      sources: ['https://www.physics.ox.ac.uk/study/undergraduates/how-apply'],
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
      sources: ['https://www.physics.ox.ac.uk/study/undergraduates/how-apply'],
      sourceYear: null,
      notes: 'The department gives one requirement for Physics and MPhysPhil.'
    },
    {
      id: 'cmkr3lt94005j7mc229ipzdyd',
      name: 'Psychology (Experimental)',
      minIBPoints: 39,
      requirements: [],
      sources: ['https://www.st-hughs.ox.ac.uk/course/psychology/'],
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
        'https://www.st-hughs.ox.ac.uk/course/psychology/'
      ],
      sourceYear: null
    },
    {
      id: 'cmkr3llti002b7mc245qrp7ih',
      name: 'Religion and Asian and Middle Eastern Studies',
      minIBPoints: 38,
      requirements: [],
      sources: ['https://www.theology.ox.ac.uk/undergraduate-faqs'],
      sourceYear: 2027
    },
    {
      id: 'cmkr3lm2m002d7mc20lz86lxq',
      name: 'Theology and Religion',
      minIBPoints: 38,
      requirements: [],
      sources: ['https://www.theology.ox.ac.uk/undergraduate-faqs'],
      sourceYear: 2027
    }
  ]
}

export default update
