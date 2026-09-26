import type { UniversityUpdate } from './types'

/**
 * University of Cambridge: requirements checked for 2027 entry on 24 September 2026
 * (content task 1.2). The same targets, with the reasoning, are in
 * docs/tasks/content-2027/oxford-cambridge.md. Apply with
 * scripts/programs/apply-2027-requirements.ts.
 */
const update: UniversityUpdate = {
  university: 'University of Cambridge',
  entryYear: 2027,
  // Unused: every course page names 2027 entry.
  undatedEntryYear: 2026,
  checkedOn: '2026-09-24',
  programs: [
    {
      id: 'cmlgf8eri0003jm04l5r6l4m1',
      name: 'Anglo-Saxon, Norse, and Celtic, BA (Hons)',
      minIBPoints: 41,
      requirements: [],
      sources: [
        'https://www.undergraduate.study.cam.ac.uk/courses/anglo-saxon-norse-celtic-ba-hons'
      ],
      sourceYear: 2027,
      notes:
        '"We don\'t ask for any specific subjects." The stored English and History were recommendations.'
    },
    {
      id: 'cmlgfxo650009jm04ldzsbwyb',
      name: 'Archaeology, BA (Hons)',
      minIBPoints: 41,
      requirements: [],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/archaeology-ba-hons'],
      sourceYear: 2027,
      notes: '"We don\'t ask for any specific subjects."'
    },
    {
      id: 'cmlggitso000pjm04yh6ua3ky',
      name: 'Architecture, BA (Hons) and MArch',
      minIBPoints: 41,
      requirements: [],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/architecture-ba-hons-march'],
      sourceYear: 2027,
      notes:
        'Some Colleges ask for subjects and others do not; Maths, Art and Design and Physics are recommended.'
    },
    {
      id: 'cmlggqzvk000vjm043wvr5276',
      name: 'Asian and Middle Eastern Studies, BA (Hons)',
      minIBPoints: 41,
      requirements: [],
      sources: [
        'https://www.undergraduate.study.cam.ac.uk/courses/asian-middle-eastern-studies-ba-hons'
      ],
      sourceYear: 2027,
      notes:
        'No subjects required; a European language at HL is required only to combine it with the AMES language.'
    },
    {
      id: 'cmlgket8b0001lb043vkpgvez',
      name: 'Chemical Engineering and Biotechnology, BA (Hons) and MEng',
      minIBPoints: 41,
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      sources: [
        'https://www.undergraduate.study.cam.ac.uk/courses/chemical-engineering-biotechnology-ba-hons-meng'
      ],
      sourceYear: 2027,
      notes: 'Maths (AA), Chemistry, and Biology or Physics at HL.'
    },
    {
      id: 'cmlgl4smw0008lb04jc2tpdy5',
      name: 'Classics, BA (Hons)',
      minIBPoints: 41,
      requirements: [],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/classics-ba-hons'],
      sourceYear: 2027,
      notes:
        'Stored as the 4-year course, which requires no subjects. The 3-year course requires Latin at HL.'
    },
    {
      id: 'cmlgl9t5g000clb04mtrhejta',
      name: 'Computer Science, BA (Hons) and MEng',
      minIBPoints: 41,
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/computer-science-ba-hons-meng'],
      sourceYear: 2027,
      notes:
        '"Colleges usually require A* in Mathematics", hence 7. The stored Chemistry/Physics and Computer Science rows were not requirements.'
    },
    {
      id: 'cmlgld8hq000jlb04jvq7xkau',
      name: 'Design, BA (Hons) and MDes',
      minIBPoints: 41,
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/design-ba-hons-mdes'],
      sourceYear: 2027,
      notes: '"Mathematics (A* at A level/7 at Higher Level)", Analysis and Approaches.'
    },
    {
      id: 'cmlgljsxa000nlb04cd3fivvi',
      name: 'Economics, BA (Hons)',
      minIBPoints: 41,
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true }],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/economics-ba-hons'],
      sourceYear: 2027,
      notes: 'Maths AA at HL; no grade named beyond 776.'
    },
    {
      id: 'cmlglv9zy000rlb04tw6uhrcx',
      name: 'Education, BA (Hons)',
      minIBPoints: 41,
      requirements: [],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/education-ba-hons'],
      sourceYear: 2027,
      notes: '"We don\'t ask for any specific subjects."'
    },
    {
      id: 'cmlgm00a5001glb04ntpodzqs',
      name: 'Engineering, BA (Hons) and MEng',
      minIBPoints: 41,
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/engineering-ba-hons-meng'],
      sourceYear: 2027,
      notes:
        'Colleges "usually require A* in Mathematics" and "often" 7 in Physics. Chemistry is not required.'
    },
    {
      id: 'cmlgmyegg0001le04pty1m6dr',
      name: 'English, BA (Hons)',
      minIBPoints: 41,
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/english-ba-hons'],
      sourceYear: 2027,
      notes:
        'HL English Literature, or English Literature and Language "or the equivalent". Stored as two separate required rows, which demanded both.'
    },
    {
      id: 'cmlgnhqne0006le044p4rrc13',
      name: 'Geography, BA (Hons)',
      minIBPoints: 41,
      requirements: [],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/geography-ba-hons'],
      sourceYear: 2027,
      notes: 'Points were empty. Some Colleges ask for subjects and others do not.'
    },
    {
      id: 'cmlgp5gcf000ale044kuqi5ce',
      name: 'History and Modern Languages, BA (Hons)',
      minIBPoints: 41,
      requirements: [{ courses: ['HIST'], level: 'HL', grade: 6, critical: true }],
      sources: [
        'https://www.undergraduate.study.cam.ac.uk/courses/history-modern-languages-ba-hons'
      ],
      sourceYear: 2027,
      notes: 'The language is required only if not taken from scratch (always for French).'
    },
    {
      id: 'cmlgpbibz000lle04qc8qqtlg',
      name: 'History and Politics, BA (Hons)',
      minIBPoints: 41,
      requirements: [{ courses: ['HIST'], level: 'HL', grade: 6, critical: true }],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/history-politics-ba-hons'],
      sourceYear: 2027
    },
    {
      id: 'cmlgpghvd000ple04vjatpnd7',
      name: 'History of Art, BA (Hons)',
      minIBPoints: 41,
      requirements: [],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/history-of-art-ba-hons'],
      sourceYear: 2027,
      notes:
        'No subjects required; Colleges "usually require A*/7 in an essay-based subject or language", which the model cannot express.'
    },
    {
      id: 'cmlgpj7580019le04dqf23dru',
      name: 'History, BA (Hons)',
      minIBPoints: 41,
      requirements: [{ courses: ['HIST'], level: 'HL', grade: 6, critical: true }],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/history-ba-hons'],
      sourceYear: 2027
    },
    {
      id: 'cmlgreb460001l804ie5d78ha',
      name: 'Human, Social, and Political Sciences, BA (Hons)',
      minIBPoints: 41,
      requirements: [],
      sources: [
        'https://www.undergraduate.study.cam.ac.uk/courses/human-social-political-sciences-ba-hons'
      ],
      sourceYear: 2027,
      notes: '"We don\'t ask for any specific subjects."'
    },
    {
      id: 'cmlgri9u4000ll804vw6r8zdx',
      name: 'Land Economy, BA (Hons)',
      rename: 'Environment, Law, and Economics, BA (Hons)',
      programUrl:
        'https://www.undergraduate.study.cam.ac.uk/courses/environment-law-economics-ba-hons',
      minIBPoints: 41,
      requirements: [],
      sources: [
        'https://www.undergraduate.study.cam.ac.uk/courses/environment-law-economics-ba-hons'
      ],
      sourceYear: 2027,
      notes:
        'A rename of the same course: the page says "This course was previously called Land Economy" and keeps UCAS code KL41, 3 years. No subjects required; Economics and Maths are recommended.'
    },
    {
      id: 'cmlgrr2ro000ql804k0ohp7my',
      name: 'Law, BA (Hons)',
      minIBPoints: 41,
      requirements: [],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/law-ba-hons'],
      sourceYear: 2027,
      notes: '"We don\'t ask for any specific subjects."'
    },
    {
      id: 'cmlgvpx3r0001l704eurxg7kj',
      name: 'Linguistics, BA (Hons)',
      minIBPoints: 41,
      requirements: [],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/linguistics-ba-hons'],
      sourceYear: 2027,
      notes: '"We don\'t ask for any specific subjects."'
    },
    {
      id: 'cmlgvuc5r0006l70464uevdg7',
      name: 'Mathematics, BA (Hons) and MMath',
      minIBPoints: 41,
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/mathematics-ba-hons-mmath'],
      sourceYear: 2027,
      notes: 'STEP is part of every offer (usually grade 1 in STEP 2 and 3); not modelled.'
    },
    {
      id: 'cmlgwnrr3000al704y240cakt',
      name: 'Medicine, MB and BChir',
      minIBPoints: 41,
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 7, critical: true },
        { courses: ['BIO', 'PHYS', 'MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
      ],
      sources: [
        'https://www.undergraduate.study.cam.ac.uk/courses/medicine-mb-bchir',
        'https://www.undergraduate.study.cam.ac.uk/apply/before/accepted-qualifications'
      ],
      sourceYear: 2027,
      notes:
        'Colleges "usually require A* in Chemistry". 21 of 28 Colleges want two further sciences or Maths, 7 want one; the minimum is one. Maths AI is considered.'
    },
    {
      id: 'cmlhs5fna0001l404wlia8u3g',
      name: 'Modern and Medieval Languages, BA (Hons)',
      minIBPoints: 41,
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
            'FRA-LL',
            'GER-LIT',
            'GER-LL',
            'SPA-LIT',
            'SPA-LL',
            'LAT',
            'GRK'
          ],
          level: 'HL',
          grade: 6,
          critical: true
        }
      ],
      sources: [
        'https://www.undergraduate.study.cam.ac.uk/courses/modern-medieval-languages-ba-hons'
      ],
      sourceYear: 2027,
      notes:
        'HL in at least one language to be studied (French, German, Italian, Portuguese, Russian, Spanish, Latin or Classical Greek); French only if held at HL. English, History and Maths were recommendations, and the Asian languages belong to AMES.'
    },
    {
      id: 'cmlhs7zaq0001jp041pglucnx',
      name: 'Music, BA (Hons)',
      minIBPoints: 41,
      requirements: [{ courses: ['MUSIC'], level: 'HL', grade: 6, critical: false }],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/music-ba-hons'],
      sourceYear: 2027,
      notes:
        'HL Music "or ABRSM Grade 8 Theory at Merit"; not critical because of that alternative.'
    },
    {
      id: 'cmlhsbiq70005jp04sde6tiap',
      name: 'Natural Sciences, BA (Hons) and MSci',
      minIBPoints: 41,
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      sources: [
        'https://www.undergraduate.study.cam.ac.uk/courses/natural-sciences-ba-hons-msci',
        'https://www.undergraduate.study.cam.ac.uk/apply/before/accepted-qualifications'
      ],
      sourceYear: 2027,
      notes:
        'Maths plus two of Biology, Chemistry, Physics; the model can express one. AA is expected for Physical, AI considered for Biological.'
    },
    {
      id: 'cmlhsg049000cjp04l5dp54yc',
      name: 'Philosophy, BA (Hons)',
      minIBPoints: 41,
      requirements: [],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/philosophy-ba-hons'],
      sourceYear: 2027,
      notes: '"We don\'t ask for any specific subjects."'
    },
    {
      id: 'cmlhsu9gu000rjp0465ez8mx6',
      name: 'Psychological and Behavioural Sciences, BA (Hons)',
      minIBPoints: 41,
      requirements: [
        {
          courses: ['MATH-AA', 'MATH-AI', 'BIO', 'CHEM', 'CS', 'PHYS'],
          level: 'HL',
          grade: 6,
          critical: true
        }
      ],
      sources: [
        'https://www.undergraduate.study.cam.ac.uk/courses/psychological-behavioural-sciences-ba-hons',
        'https://www.undergraduate.study.cam.ac.uk/apply/before/accepted-qualifications'
      ],
      sourceYear: 2027,
      notes:
        'At least one of Maths, Biology, Chemistry, Computer Science, Physics at HL; Maths AI considered.'
    },
    {
      id: 'cmlhsxjnu000zjp04qg9wn7uf',
      name: 'Theology, Religion, and Philosophy of Religion, BA (Hons)',
      minIBPoints: 41,
      requirements: [],
      sources: [
        'https://www.undergraduate.study.cam.ac.uk/courses/theology-religion-philosophy-of-religion-ba-hons'
      ],
      sourceYear: 2027,
      notes: '"We don\'t ask for any specific subjects."'
    },
    {
      id: 'cmlht44tg0016jp04ibnspz8a',
      name: 'Veterinary Medicine, VetMB',
      minIBPoints: 41,
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'PHYS', 'MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
      ],
      sources: ['https://www.undergraduate.study.cam.ac.uk/courses/veterinary-medicine-vetmb'],
      sourceYear: 2027,
      notes: 'Chemistry and one of Biology, Maths or Physics at HL; Maths AI considered.'
    }
  ]
}

export default update
