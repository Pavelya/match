import type { RefreshFile } from '../lib/refresh'

/**
 * The University of Manchester: requirements for 2027 entry.
 *
 * Exported from the database on 2026-09-29 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts the-university-of-manchester
 */
const refresh: RefreshFile = {
  university: 'The University of Manchester',
  entryYear: 2027,
  checkedOn: '2026-09-29',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zim5008h7msfzmmor5ap',
      status: 'current',
      name: 'BA Archaeology',
      description:
        'Study with researchers of international calibre on archaeological projects spanning the globe through Archaeology at Manchester.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00175/ba-archaeology/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00175/ba-archaeology/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 34 points with 655 at HL. Checked, no specific subjects required. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6ziae008f7msfnfmzatcr',
      status: 'current',
      name: 'BA Architecture',
      description:
        "Start your career at one of the UK's top architecture schools. A mixture of science or maths and humanities or arts subjects is preferred.",
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00178/ba-architecture/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00178/ba-architecture/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL. Checked, no specific subjects required. Applicants submit a portfolio. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zlde00937msfrzgbrgw3',
      status: 'current',
      name: 'BA Modern Languages (Chinese)',
      description: 'Study Chinese language, literature, history, and culture.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/21897/ba-modern-languages/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/21897/ba-modern-languages/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). Manchester no longer offers Chinese Studies (UCAS T100) as a course of its own: the 2027 course list drops every degree named after a particular language (Chinese Studies, French and German, History and French and so on) and adds Modern Languages BA (R901, 4 years with a year abroad), plus joint degrees such as History and Modern Languages, in which students take one or two of Arabic, Chinese, French, German, Italian, Japanese, Portuguese, Russian and Spanish, and "your degree title will reflect the language(s) you\'ve chosen", e.g. BA (Hons) Modern Languages (Italian). The course page lists Chinese Studies among its routes, so the program is renamed to that route rather than marked discontinued. The 2026 URL still serves; its 2027 URL returns 404. 34 points with 655 at HL (was 35; the 2026 page also said 34). Checked, no specific subjects required for one language: beginners are accepted. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zhif00897msfanpxl8nc',
      status: 'current',
      name: 'BA Criminology',
      description: 'Study crime, criminal behaviour, and the criminal justice system.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/21803/ba-criminology/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/21803/ba-criminology/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 34 points with 665 at HL (was 35, as the 2026 page said). Checked, no specific subjects required. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zjdb008n7msfh44ti5ox',
      status: 'current',
      name: 'BA Digital Media, Culture and Society',
      description: 'Study the impact of digital media on culture and society.',
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/21197/ba-digital-media-culture-and-society/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/21197/ba-digital-media-culture-and-society/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL. Checked, no specific subjects required. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6ziva008j7msfrazd1z5f',
      status: 'current',
      name: 'BA Drama',
      description: "Study drama and theatre at one of the UK's leading drama departments.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 35,
      programUrl: 'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00198/ba-drama/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00198/ba-drama/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL. Checked, no specific subjects required. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zj4i008l7msfg7wu5jzo',
      status: 'current',
      name: 'BA Drama and Film Studies',
      description: 'Combine the study of drama with film studies.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/12655/ba-drama-and-film-studies/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/12655/ba-drama-and-film-studies/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 34 points with 655 at HL (was 35). Checked, no specific subjects required. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zjmo008p7msfzu0txedq',
      status: 'current',
      name: 'BA English Language',
      description: 'Study the English language, its structure, history, and social uses.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00212/ba-english-language/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00212/ba-english-language/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL. Checked, no specific subjects required. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zlvs00977msf9ak5gv5b',
      status: 'current',
      name: 'BA Modern Languages (French and Chinese)',
      description: 'Study both French and Chinese languages and cultures.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/21897/ba-modern-languages/',
      requirements: [
        {
          courses: ['FRA-B', 'FRA-LIT', 'FRA-LL', 'MAN-B', 'MAN-LIT-A', 'MAN-LL'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/21897/ba-modern-languages/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). Manchester no longer offers French and Chinese (UCAS RT11) as a course of its own: the 2027 course list drops every degree named after a particular language (Chinese Studies, French and German, History and French and so on) and adds Modern Languages BA (R901, 4 years with a year abroad), plus joint degrees such as History and Modern Languages, in which students take one or two of Arabic, Chinese, French, German, Italian, Japanese, Portuguese, Russian and Spanish, and "your degree title will reflect the language(s) you\'ve chosen", e.g. BA (Hons) Modern Languages (Italian). The course page lists French and Chinese among its routes, so the program is renamed to that route rather than marked discontinued. The 2026 URL still serves; its 2027 URL returns 404. 34 points with 655 at HL (was 35; the 2026 page also said 34). "For students wishing to study two languages, we will require one of the target languages at Higher Level": French or Chinese at HL, now critical. No grade is stated; stored at 5, the lowest grade in the 655 profile. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zjvq008r7msfpe3xhkoi',
      status: 'current',
      name: 'BA Geography',
      description:
        "Study physical and human geography at one of the UK's leading geography departments.",
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/22121/ba-geography/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/22121/ba-geography/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). The course moved to a new page id (00232 → 22121); same course, UCAS L700. 35 points with 665 at HL. Checked, no specific subjects required. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zl4j00917msfor82weet',
      status: 'current',
      name: 'BA Modern Languages (German)',
      description: 'Study German language, literature, and culture.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/21897/ba-modern-languages/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/21897/ba-modern-languages/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). Manchester no longer offers German Studies (UCAS R210) as a course of its own: the 2027 course list drops every degree named after a particular language (Chinese Studies, French and German, History and French and so on) and adds Modern Languages BA (R901, 4 years with a year abroad), plus joint degrees such as History and Modern Languages, in which students take one or two of Arabic, Chinese, French, German, Italian, Japanese, Portuguese, Russian and Spanish, and "your degree title will reflect the language(s) you\'ve chosen", e.g. BA (Hons) Modern Languages (Italian). The course page lists German Studies among its routes, so the program is renamed to that route rather than marked discontinued. The 2026 URL still serves; its 2027 URL returns 404. 34 points with 655 at HL (was 35; the 2026 page also said 34). Checked, no specific subjects required for one language: beginners are accepted. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zk4y008t7msf6y9k0t2u',
      status: 'current',
      name: 'BA History',
      description:
        "Study history from ancient times to the present day at one of the UK's leading history departments.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 36,
      programUrl: 'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00255/ba-history/',
      requirements: [{ courses: ['HIST'], level: 'HL', grade: 6, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00255/ba-history/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL, including History (was 35 with no subject; the 2026 page said the same as 2027). History at HL 6 is now critical. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zlmq00957msfceivv3mo',
      status: 'current',
      name: 'BA Modern Languages (Japanese)',
      description: 'Study Japanese language, literature, history, and culture.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/21897/ba-modern-languages/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/21897/ba-modern-languages/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). Manchester no longer offers Japanese Studies (UCAS T200) as a course of its own: the 2027 course list drops every degree named after a particular language (Chinese Studies, French and German, History and French and so on) and adds Modern Languages BA (R901, 4 years with a year abroad), plus joint degrees such as History and Modern Languages, in which students take one or two of Arabic, Chinese, French, German, Italian, Japanese, Portuguese, Russian and Spanish, and "your degree title will reflect the language(s) you\'ve chosen", e.g. BA (Hons) Modern Languages (Italian). The course page lists Japanese Studies among its routes, so the program is renamed to that route rather than marked discontinued. The 2026 URL still serves; its 2027 URL returns 404. 34 points with 655 at HL (was 35; the 2026 page also said 34). Checked, no specific subjects required for one language: beginners are accepted. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zkmv008x7msf3kr95au1',
      status: 'current',
      name: 'BA Liberal Arts',
      description:
        'A flexible interdisciplinary programme allowing study across multiple disciplines.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/17859/ba-liberal-arts/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/17859/ba-liberal-arts/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL (was 35; the 2026 page also said 36). Checked, no specific subjects required. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zkdy008v7msfk9yxl8py',
      status: 'current',
      name: 'BA Linguistics',
      description: 'Study the scientific analysis of language, its structure, and meaning.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00291/ba-linguistics/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00291/ba-linguistics/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 34 points (was 35; the 2026 page also said 34). The page summary says 665 at HL, its entry requirements 655. Checked, no specific subjects required. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zm4v00997msf6ic88tdu',
      status: 'current',
      name: 'BA Middle Eastern Studies',
      description: 'Study the languages, cultures, and politics of the Middle East.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/07729/ba-middle-eastern-studies/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/07729/ba-middle-eastern-studies/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 34 points with 655 at HL (was 35; the 2026 page also said 34). 3 years, not 4: the 2026 and 2027 pages both say 3. Checked, no specific subjects required. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Arts in Social Sciences".
    {
      id: 'cmkf6zmfn009b7msfyyju0pzr',
      status: 'current',
      name: 'BASS Philosophy and Criminology',
      description: 'Combine the study of philosophy with criminology.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/08851/bass-philosophy-and-criminology/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/08851/bass-philosophy-and-criminology/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). Named BASS (Bachelor of Arts in Social Sciences) on the page; stored as BA. 34 points with 655 at HL (was 35; the 2026 page also said 34). Checked, no specific subjects required: the summary\'s "including specific subjects" refers to the A-level subject list; the IB offer names none. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Arts in Economics".
    {
      id: 'cmkf6z1mm00037msfz9s6l71w',
      status: 'current',
      name: 'BAEcon Accounting and Finance',
      description:
        'BA Accounting and Finance offers a career-focused programme of study in conjunction with Alliance Manchester Business School.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/05151/baecon-accounting-and-finance/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/05151/baecon-accounting-and-finance/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL. Checked, no specific subjects required: the summary\'s "including specific requirements" refers to the A-level subject list and GCSE Mathematics at B/6; the IB offer names none. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Arts in Economics".
    {
      id: 'cmkf6znqq009l7msfpzu5a8cb',
      status: 'current',
      name: 'BAEcon Data Science and Economics',
      description: 'Combine data science skills with economic analysis.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/21873/baecon-data-science-and-economics/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/21873/baecon-data-science-and-economics/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL. Checked, no specific subjects required: the IB offer names none, in 2026 or 2027, so the stored Mathematics HL 6 row has no source and is removed. The summary\'s "including specific subjects" refers to the A-level subject list and GCSE Mathematics at B/6. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Arts in Economics".
    {
      id: 'cmkf6z2ga000b7msft61cbyjf',
      status: 'current',
      name: 'BAEcon Economics',
      description:
        'Choose an Economics degree that offers award-winning teaching and a wide range of course options all within a rich social science context.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/05134/baecon-economics/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/05134/baecon-economics/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL. Checked, no specific subjects required: the summary\'s "including specific subjects" refers to the A-level subject list and GCSE Mathematics at B/6; the IB offer names none. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z3r7000v7msf1vav8z5q',
      status: 'current',
      name: 'BEng Aerospace Engineering',
      description:
        'The platform for a career in flagship industry. This programme provides the foundation for careers in aerospace, aeronautics, and related engineering fields.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '3 years',
      minIBPoints: 37,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03333/beng-aerospace-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03333/beng-aerospace-engineering/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 37 points with 766 at HL in Mathematics, Physics and one other subject. The page does not say which subject takes the 7, so 6 is stored for each (was Mathematics 7); Physics is required, so now critical. Mathematics AA or AI. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z4kf001b7msfo6yks0gt',
      status: 'current',
      name: 'BEng Chemical Engineering',
      description:
        'The technical aspects of chemical engineering revolve around managing the behaviour of materials and chemical reactions. This programme prepares students for careers in process engineering, pharmaceuticals, and energy.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03340/beng-chemical-engineering/',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03340/beng-chemical-engineering/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL, including Mathematics (Analysis and approaches only) and Chemistry or Physics. Chemistry or Physics is required, so now critical. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z4yr001j7msfyex8ezdl',
      status: 'current',
      name: 'MEng Civil and Structural Engineering',
      description:
        'This programme covers the planning, design, and construction of infrastructure including buildings, bridges, and transportation systems.',
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03858/meng-civil-and-structural-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03858/meng-civil-and-structural-engineering/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). Stored as a 3-year BEng, but its URL was the MEng (UCAS H220, 4 years), and Manchester offers Civil and Structural Engineering only as an MEng in both the 2026 and 2027 lists (its BEng is Civil Engineering, H200, a different course). Renamed to the MEng. 36 points with 666 at HL, including Mathematics and Physics (Physics was HL 5 and not critical). Mathematics AA or AI. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z5db001r7msf4v2jg15n',
      status: 'current',
      name: 'BEng Electrical and Electronic Engineering',
      description:
        'Study the design and development of electrical systems, from microelectronics to power systems, telecommunications, and renewable energy technologies.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '3 years',
      minIBPoints: 37,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03363/beng-electrical-and-electronic-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['CHEM', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03363/beng-electrical-and-electronic-engineering/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 37 points with 766 at HL, including 7 in Mathematics and 6 in Physics or Chemistry (was 36, Mathematics 6, Physics 5 not critical; the 2026 page said the same as 2027). Mathematics AA or AI. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z5rn001z7msfnajdxtcr',
      status: 'current',
      name: 'BEng Mechanical Engineering',
      description:
        'Design and analyze mechanical systems from nanotechnology to spacecraft. This programme covers thermodynamics, fluid mechanics, materials science, and mechanical design.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03389/beng-mechanical-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03389/beng-mechanical-engineering/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 38 points with 776 at HL, including Mathematics and Physics (was 36 with Physics 5 not critical; the 2026 page said the same as 2027). The page does not say which subjects take the 7s, so 6 is stored for each. Mathematics AA or AI. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z66f00277msfbi9oovjg',
      status: 'current',
      name: 'BEng Mechatronic Engineering',
      description:
        'Mechatronics combines mechanical engineering, electronics, and computer science to create intelligent systems and robots.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '3 years',
      minIBPoints: 37,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03394/beng-mechatronic-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
        { courses: ['CHEM', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03394/beng-mechatronic-engineering/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 37 points with 766 at HL, including 7 in Mathematics and 6 in Physics or Chemistry (was 36, Mathematics 6, Physics 5 not critical; the 2026 page said the same as 2027). Mathematics AA or AI. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zdky00657msfn4oucmff',
      status: 'current',
      name: 'BNurs Adult Nursing',
      description:
        'Our BNurs/MNurs Adult Nursing degree will enable you to train as a nurse specialising in the care of adult patients.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Nursing',
      duration: '3 years',
      minIBPoints: 30,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/10971/bnurs-adult-nursing/',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PSYCH', 'SEHS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/10971/bnurs-adult-nursing/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 30 points with 554 at HL, including one of Biology, Chemistry, Sports and Health Science or Psychology. No grade is stated for it; stored at 4, the lowest in the profile (was 5). Sports, Exercise and Health Science added. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zdzd006d7msf0tzjxkeu',
      status: 'current',
      name: "BNurs Children's Nursing",
      description: 'Train as a nurse specialising in the care of children and young people.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Nursing',
      duration: '3 years',
      minIBPoints: 32,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/10972/bnurs-childrens-nursing/',
      requirements: [
        { courses: ['BIO', 'CHEM', 'PSYCH', 'SEHS'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/10972/bnurs-childrens-nursing/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 32 points with 555 at HL, including one of Biology, Chemistry, Sports and Health Science or Psychology (was 30; the 2026 page said the same as 2027). Sports, Exercise and Health Science added. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z1c800017msfgbyxsdwo',
      status: 'current',
      name: 'BSc Accounting',
      description:
        'This unique, professionally oriented course was designed alongside the Institute of Chartered Accountants in England and Wales (ICAEW) Undergraduate Partnership Programme (UPP); one of three universities at which this is offered. This partnership ensures that our curriculum is relevant to the industry and provides students with the opportunity to gain credit towards some accountancy papers. You will also be met with further opportunities such as networking events and field trips run by the ICAEW and access to training software and platforms through their website.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/07808/bsc-accounting/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/07808/bsc-accounting/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL. Checked, no specific subjects required. The page lists preferred subjects, used to prioritise applicants; they are not stored. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z1vq00057msfiedlyprf',
      status: 'current',
      name: 'BSc Accounting with Industrial/Professional Experience',
      description:
        'This unique, professionally oriented course was designed alongside the Institute of Chartered Accountants in England and Wales Undergraduate Partnership Programme (UPP). The four-year degree offers you the opportunity to apply skills learnt into real-world practice during your degree.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/09937/bsc-accounting-with-industrial-professional-experience/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/09937/bsc-accounting-with-industrial-professional-experience/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL. Checked, no specific subjects required. The page lists preferred subjects, used to prioritise applicants; they are not stored. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z24z00077msfkdvt8sk4',
      status: 'current',
      name: 'BSc Actuarial Science and Mathematics',
      description:
        "This programme combines the strengths of our academics' backgrounds in mathematical research with actuarial science. It prepares students for careers in insurance, finance, and risk management.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 37,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/07383/bsc-actuarial-science-and-mathematics/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/07383/bsc-actuarial-science-and-mathematics/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 37 points with 766 at HL, including 7 in Mathematics: Analysis and approaches (AI not accepted). Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z9dw003z7msf93gkvs5d',
      status: 'current',
      name: 'BSc Biochemistry',
      description:
        'Our BSc Biochemistry degree covers the chemical properties of biologically important molecules and processes in cells and tissues.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00521/bsc-biochemistry/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00521/bsc-biochemistry/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL, with Chemistry and another core science (Biology, Mathematics or Physics), normally Biology. The page does not say which subject takes the 5, so both are stored at 5. Was Chemistry 6 and Biology 5, Biology not critical; the second core science is required, so now critical. The 2026 page gave 35–36. With Chemistry as the only core science at HL, Geography, Psychology or Sports, Exercise and Health Science is considered instead, with 36 points and 666; the model cannot hold that alternative offer. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z8oq003n7msfqctfaru7',
      status: 'current',
      name: 'BSc Biology',
      description:
        'Our BSc Biology degree covers a range of biological sciences, leading to careers in scientific research, communication, and postgraduate study.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00524/bsc-biology/',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00524/bsc-biology/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL, including two science subjects, normally Biology and Chemistry; the core sciences are Biology, Chemistry, Mathematics and Physics. Stored as one group of the four at 5 (the model holds one of the two, and the page does not say which subject takes the 5). Was Biology 6 and Chemistry 5, Chemistry not critical. The 2026 page gave 35–36. With only one core science at HL, Geography, Psychology or Sports, Exercise and Health Science can replace the second, with 36 points and 666; the model cannot hold that alternative offer. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6za2r004b7msfgo5n3ouy',
      status: 'current',
      name: 'BSc Biotechnology',
      description:
        'Study the application of biological systems and living organisms to develop or make products for specific uses.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/08662/bsc-biotechnology/',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/08662/bsc-biotechnology/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL, including two science subjects, normally Biology and Chemistry; the core sciences are Biology, Chemistry, Mathematics and Physics. Stored as one group of the four at 5 (the model holds one of the two, and the page does not say which subject takes the 5). Was Biology or Chemistry at 6. The 2026 page gave 35–36. With only one core science at HL, Geography, Psychology or Sports, Exercise and Health Science can replace the second, with 36 points and 666; the model cannot hold that alternative offer. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z7op002z7msfpslyribx',
      status: 'current',
      name: 'BSc Chemistry',
      description:
        'Our breadth and depth means you can specialise in niche areas, and further develop key areas and concepts in chemistry.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00544/bsc-chemistry/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00544/bsc-chemistry/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL, including Chemistry and at least one other science or mathematics subject (Biology, Physics, Mathematics AA or AI). The second subject is required, so now critical. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zgfv007r7msfyhnv3h3s',
      status: 'current',
      name: 'BSc Cognitive Neuroscience and Psychology',
      description:
        'Combine psychology with neuroscience to understand the biological basis of behaviour and cognition.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/20942/bsc-cognitive-neuroscience-and-psychology/',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'GEOG', 'MATH-AA', 'MATH-AI', 'PHYS', 'PSYCH'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/20942/bsc-cognitive-neuroscience-and-psychology/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). Typical offer 35–36 points with 665–666 at HL; the bottom of the range is stored (was 36). Two science subjects at HL, normally Biology and Chemistry, but Physics, Geography, Psychology or Mathematics (AA or AI) count. Stored as one group at 5 (the model holds one of the two); Geography added. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z2yc000f7msfjtu397bb',
      status: 'current',
      name: 'BSc Computer Science',
      description:
        "Ranked in the UK's top 10 for Computer Science (QS World University Rankings 2025). Birthplace of the world's first stored-program computer and home to the first graduates in Computer Science! One of the most targeted universities by top UK employers. Enjoy the freedom to choose from an extremely wide range of Computer Science modules and curate your skillset.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 37,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00560/bsc-computer-science/',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00560/bsc-computer-science/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 37 points with 766 at HL, including 7 in Mathematics: Analysis and approaches (AI not accepted), and at least one science at HL: Computer Science, Physics, Chemistry or Biology. Was 38 with 776, as the 2026 page said. The science is required, so now critical. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z3gh000r7msfw71tm067',
      status: 'current',
      name: 'BSc Computer Science and Mathematics',
      description:
        'A joint honours programme combining computer science with mathematics, providing strong foundations in both disciplines for careers in technology and research.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 37,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00558/bsc-computer-science-and-mathematics/',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00558/bsc-computer-science-and-mathematics/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 37 points with 766 at HL, including 7 in Mathematics: Analysis and approaches (AI not accepted), and at least one science at HL: Computer Science, Physics, Chemistry or Biology (added). Was 38 with 776, as the 2026 page said. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zeu1006v7msf49ngqyy1',
      status: 'current',
      name: 'BSc Dental Hygiene and Therapy',
      description:
        'Train to become a dental hygienist and dental therapist, providing essential oral health care.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/20060/bsc-dental-hygiene-and-therapy/',
      requirements: [{ courses: ['BIO'], level: 'HL', grade: 5, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/20060/bsc-dental-hygiene-and-therapy/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 34 points with 655 at HL, including Biology at HL (was 32 with Biology or Chemistry; the 2026 page said the same as 2027). No grade is stated for Biology; stored at 5, the lowest in the profile. Mathematics and English Language in the Diploma, or at GCSE grade 4. No offer without a successful interview. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zhrh008b7msf8i62zfa8',
      status: 'current',
      name: 'BSc Education',
      description:
        'Study the theory and practice of education, preparing for careers in teaching, educational policy, and research.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/12384/bsc-education/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/12384/bsc-education/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 34 points with 655 at HL. Checked, no specific subjects required. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zh0200857msfbcr3tqlh',
      status: 'current',
      name: 'BSc Psychology of Education',
      description: 'Study how psychological principles apply to education and learning.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/22002/bsc-psychology-of-education/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/22002/bsc-psychology-of-education/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). Renamed: Educational Psychology (UCAS C812) is now Psychology of Education (C813), with the same course description; Manchester\'s 2026 and 2027 course lists carry only the new name, and the old URL is 404 for 2027. 35 points with 665 at HL. Checked, no specific subjects required. The page lists preferred subjects, used to prioritise applicants; they are not stored. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zcil005f7msfh4f28hdq',
      status: 'current',
      name: 'BSc Environmental Science',
      description:
        'Study the environment and develop solutions for environmental challenges including climate change and sustainability.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/12124/bsc-environmental-science/',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'ESS', 'GEOG', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/12124/bsc-environmental-science/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 34 points with 655 at HL, including at least one science or mathematics subject: Biology, Chemistry, Environmental Systems and Societies, Geography, Physics or Mathematics (AA or AI). Was 35 with 665; the 2026 page said so. ESS, Geography and Mathematics added. If Geography is the only science, the offer typically asks 6 in it, which the model cannot hold. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zmph009d7msfsqt9ertz',
      status: 'current',
      name: 'BSc Fashion Management',
      description:
        'Study the business side of fashion, including marketing, buying, and brand management.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/09662/bsc-fashion-management/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/09662/bsc-fashion-management/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL. Checked, no specific subjects required. The IB offer accepts Mathematics AA or AI at SL or HL; the course asks GCSE-level Mathematics of everyone. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zas7004n7msfjay9qxqj',
      status: 'current',
      name: 'BSc Genetics',
      description: 'Study the science of heredity and genetic variation in living organisms.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00571/bsc-genetics/',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00571/bsc-genetics/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL, including two science subjects, normally Biology and Chemistry; the core sciences are Biology, Chemistry, Mathematics and Physics. Stored as one group of the four at 5 (the model holds one of the two, and the page does not say which subject takes the 5). Was Biology 6 and Chemistry 5, Chemistry not critical. The 2026 page gave 35–36. With only one core science at HL, Geography, Psychology or Sports, Exercise and Health Science can replace the second, with 36 points and 666; the model cannot hold that alternative offer. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zfja00777msftdb3dqtv',
      status: 'discontinued',
      name: 'BSc Immunology',
      description: 'Study the immune system and its role in health and disease.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2026/10284/bsc-immunology/',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: [],
      notes:
        "Not offered for 2027 entry: Immunology BSc (UCAS C550) is not in Manchester's 2027 course list, which has 306 courses against 2026's 406, and its 2027 URL returns 404. The Immunology MSci and its placement, modern-language and entrepreneurship variants are gone too. The 2026 page still serves. No successor is named. Checked 29 September 2026; the owner decides."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zmzo009f7msfjv1b2g3d',
      status: 'current',
      name: 'BSc International Business, Finance and Economics',
      description: 'Study international business with a focus on finance and economics.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/09224/bsc-international-business-finance-and-economics/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/09224/bsc-international-business-finance-and-economics/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL. Checked, no specific subjects required. The page lists preferred subjects, used to prioritise applicants; they are not stored. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zn8m009h7msfiu999891',
      status: 'current',
      name: 'BSc International Management',
      description: 'Study management with an international focus, including a year abroad.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/18515/bsc-international-management/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/18515/bsc-international-management/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL. Checked, no specific subjects required. The page lists preferred subjects, used to prioritise applicants; they are not stored. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zc6y005b7msf131j6r7d',
      status: 'current',
      name: 'BSc Life Sciences',
      description:
        'A broad-based programme covering multiple aspects of the life sciences with flexibility to specialise.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00585/bsc-life-sciences/',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00585/bsc-life-sciences/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL, including two science subjects, normally Biology and Chemistry; the core sciences are Biology, Chemistry, Mathematics and Physics. Stored as one group of the four at 5 (the model holds one of the two, and the page does not say which subject takes the 5). Was Biology 6 alone. The 2026 page gave 35–36. With only one core science at HL, Geography, Psychology or Sports, Exercise and Health Science can replace the second, with 36 points and 666; the model cannot hold that alternative offer. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z2pc000d7msfoecnjtfl',
      status: 'current',
      name: 'BSc Management',
      description:
        'Our flexible management courses share a common first year before allowing you to focus on your chosen specialism. This course prepares students for professional and managerial careers.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03519/bsc-management/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03519/bsc-management/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL. Checked, no specific subjects required. The page lists preferred subjects, used to prioritise applicants; they are not stored. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6znhl009j7msf3bzhowh6',
      status: 'current',
      name: 'BSc Management (Marketing)',
      description: 'Study management with a specialisation in marketing.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03528/bsc-management-marketing/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03528/bsc-management-marketing/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL. Checked, no specific subjects required. The page lists preferred subjects, used to prioritise applicants; they are not stored. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z6l6002f7msfs3fage99',
      status: 'current',
      name: 'BSc Mathematics',
      description:
        'Develop advanced mathematical reasoning and problem-solving skills. This programme covers pure and applied mathematics including analysis, algebra, statistics, and computational methods.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 37,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00590/bsc-mathematics/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00590/bsc-mathematics/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 37 points with 766 at HL, including 7 in Mathematics: Analysis and approaches (AI not accepted). Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zf6n00717msf1ibskvn6',
      status: 'current',
      name: 'BSc Medical Biochemistry',
      description:
        'Study biochemistry with a focus on its medical applications, preparing for careers in healthcare research.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00602/bsc-medical-biochemistry/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00602/bsc-medical-biochemistry/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL, with Chemistry and another core science (Biology, Mathematics or Physics), normally Biology. The page does not say which subject takes the 5, so both are stored at 5. Was Chemistry 6 and Biology 5, Biology not critical; the second core science is required, so now critical. The 2026 page gave 35–36. With Chemistry as the only core science at HL, Geography, Psychology or Sports, Exercise and Health Science is considered instead, with 36 points and 666; the model cannot hold that alternative offer. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zb54004t7msfqckn3x1w',
      status: 'current',
      name: 'BSc Microbiology',
      description:
        'Study microorganisms including bacteria, viruses, fungi, and their applications in medicine, industry, and the environment.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00609/bsc-microbiology/',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00609/bsc-microbiology/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL, including two science subjects, normally Biology and Chemistry; the core sciences are Biology, Chemistry, Mathematics and Physics. Stored as one group of the four at 5 (the model holds one of the two, and the page does not say which subject takes the 5). Was Biology 6 and Chemistry 5, Chemistry not critical. The 2026 page gave 35–36. With only one core science at HL, Geography, Psychology or Sports, Exercise and Health Science can replace the second, with 36 points and 666; the model cannot hold that alternative offer. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zbi1004z7msfismovs8c',
      status: 'discontinued',
      name: 'BSc Molecular Biology',
      description:
        'Study the molecular basis of biological activity, focusing on DNA, RNA, and protein synthesis.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2026/00614/bsc-molecular-biology/',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: [],
      notes:
        "Not offered for 2027 entry: Molecular Biology BSc (UCAS C720) is not in Manchester's 2027 course list, which has 306 courses against 2026's 406, and its 2027 URL returns 404. The Molecular Biology MSci and its placement, modern-language and entrepreneurship variants are gone too. The 2026 page still serves. No successor is named. Checked 29 September 2026; the owner decides."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z6w2002j7msfalxcd52k',
      status: 'current',
      name: 'BSc Physics',
      description:
        'A Manchester physics degree gives you a thorough understanding of the physical world, and a deep insight into physics applications and technology.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00638/bsc-physics/',
      requirements: [
        { courses: ['PHYS'], level: 'HL', grade: 7, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00638/bsc-physics/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 38 points with 776 at HL, including 7 in both Physics and Mathematics (AA or AI). Mathematics is required, so now critical. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z7af002r7msfawem5ds1',
      status: 'current',
      name: 'BSc Physics with Astrophysics',
      description:
        'Combine core physics with astrophysics to study the universe, from quantum mechanics to cosmology.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00639/bsc-physics-with-astrophysics/',
      requirements: [
        { courses: ['PHYS'], level: 'HL', grade: 7, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00639/bsc-physics-with-astrophysics/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 38 points with 776 at HL, including 7 in both Physics and Mathematics (AA or AI). Mathematics is required, so now critical. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zfvq007d7msfu768e1dk',
      status: 'current',
      name: 'BSc Psychology',
      description:
        'Our BPS accredited BSc Psychology degree offers placement and study abroad options, alongside teaching from world-leading academics.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00653/bsc-psychology/',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS', 'PSYCH'],
          level: 'HL',
          grade: 6,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00653/bsc-psychology/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL, one of which must be Chemistry, Biology, Physics, Psychology or Mathematics (AA or AI). Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zbub00557msfqqbgf8hv',
      status: 'current',
      name: 'BSc Zoology',
      description:
        'Study the biology of animals, their structure, embryology, evolution, classification, habits, and distribution.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00663/bsc-zoology/',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00663/bsc-zoology/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL, including two science subjects, normally Biology and Chemistry; the core sciences are Biology, Chemistry, Mathematics and Physics. Stored as one group of the four at 5 (the model holds one of the two, and the page does not say which subject takes the 5). Was Biology 6 and Chemistry 5, Chemistry not critical. The 2026 page gave 35–36. With only one core science at HL, Geography, Psychology or Sports, Exercise and Health Science can replace the second, with 36 points and 666; the model cannot hold that alternative offer. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Social Science".
    {
      id: 'cmkf6zh9c00877msf8gsihvsx',
      status: 'current',
      name: 'BSocSc Sociology',
      description:
        'Study society, social institutions, and social relationships through empirical investigation and critical analysis.',
      field: 'Social Sciences',
      degree: 'Bachelor of Social Sciences',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00678/bsocsc-sociology/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/00678/bsocsc-sociology/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). Named BSocSc on the page (was "BSoc"). 34 points with 655 at HL (was 35; the 2026 page also said 34). Checked, no specific subjects required. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zi0v008d7msf4osl47yy',
      status: 'current',
      name: 'LLB Law',
      description: "Study for a qualifying law degree at one of the UK's leading law schools.",
      field: 'Law',
      degree: 'Bachelor of Laws',
      duration: '3 years',
      minIBPoints: 37,
      programUrl: 'https://www.manchester.ac.uk/study/undergraduate/courses/2027/12446/llb-law/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/12446/llb-law/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 37 points with 766 at HL. Checked, no specific subjects required. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zcx3005n7msf1prdlp09',
      status: 'current',
      name: 'MBChB Medicine',
      description:
        'Our five-year MBChB Medicine degree gives you the breadth, knowledge and clinical skills you need to be the best doctor you can possibly be. Gain the knowledge, professional behaviours and clinical skills required to train as a doctor and become eligible to apply for provisional registration with the General Medical Council. Study at a university ranked 6th in the UK for Medicine (QS World University Rankings 2025).',
      field: 'Medicine & Health',
      degree: 'Bachelor of Medicine and Bachelor of Surgery',
      duration: '5 years',
      minIBPoints: 36,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/01428/mbchb-medicine/',
      requirements: [
        { courses: ['BIO', 'CHEM'], level: 'HL', grade: 6, critical: true },
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS', 'PSYCH'],
          level: 'HL',
          grade: 6,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/01428/mbchb-medicine/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 36 points with 666 at HL, which must include Chemistry or Biology plus another science (Chemistry, Biology, Physics, Psychology or Mathematics) and one further subject. The second science is required, so now critical (the model cannot stop one course meeting both rows). Mathematics and English Language in the Diploma, or at GCSE grade 6. UCAT required. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z86r003b7msfdwlcf93r',
      status: 'current',
      name: 'MChem Chemistry',
      description:
        "World-class study from where the subject has its origins. This four-year integrated Master's programme provides advanced training in chemistry.",
      field: 'Natural Sciences',
      degree: 'Master of Chemistry',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/01449/mchem-chemistry/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/01449/mchem-chemistry/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 37 points with 766 at HL, including Chemistry and at least one other science or mathematics subject (Biology, Physics, Mathematics AA or AI). The page does not say which subject takes the 7, so Chemistry is stored at 6 (was 7); the second subject is required, so now critical. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z45t00137msfpmsb79qt',
      status: 'current',
      name: 'MEng Aerospace Engineering',
      description:
        "Aerospace engineering at the leading edge. This four-year integrated Master's programme provides comprehensive training in aerospace engineering.",
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03826/meng-aerospace-engineering/',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/03826/meng-aerospace-engineering/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 37 points with 766 at HL, including Mathematics, Physics and one other subject. The page does not say which subject takes the 7, so 6 is stored for each (was Mathematics 7); Physics is required, so now critical. Mathematics AA or AI. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zedn006l7msfjnedpuaz',
      status: 'current',
      name: 'MPharm Pharmacy',
      description:
        'Our MPharm Pharmacy degree is accredited by the GPhC and provides theoretical and clinical training to prepare you for a career as a pharmacist.',
      field: 'Medicine & Health',
      degree: 'Master of Pharmacy',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/01695/mpharm-pharmacy/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO'], level: 'SL', grade: 1, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/01695/mpharm-pharmacy/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL, including Chemistry, with either Biology at HL and Mathematics at SL, or Mathematics (AA or AI) at HL and Biology at SL. No grades are stated for the named subjects; stored at 5, the lowest in the profile (Chemistry was 6). Stored as Chemistry, one of Biology or Mathematics at HL, and Biology taken at any level ("must be taken", as elsewhere, at SL 1). Mathematics is part of every Diploma, so the stored Mathematics SL 5 row is removed. Offer conditions are set after interview. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z9q300457msfxt5o2rtd',
      status: 'current',
      name: 'MSci Biochemistry',
      description:
        "An integrated Master's programme in Biochemistry providing advanced research training in molecular and cellular biology.",
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/10110/msci-biochemistry/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/10110/msci-biochemistry/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL, with Chemistry and another core science (Biology, Mathematics or Physics), normally Biology. The page does not say which subject takes the 5, so both are stored at 5. Was 36 with Chemistry 6 and Biology 6, Biology not critical; the 2026 page gave 35–36. The second core science is required, so now critical. With Chemistry as the only core science at HL, Geography, Psychology or Sports, Exercise and Health Science is considered instead, with 36 points and 666; the model cannot hold that alternative offer. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6z91e003t7msfjs3s89xu',
      status: 'current',
      name: 'MSci Biology',
      description:
        "An integrated Master's programme in Biology providing advanced research training and in-depth study of biological sciences.",
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/10111/msci-biology/',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/10111/msci-biology/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL, including two science subjects, normally Biology and Chemistry; the core sciences are Biology, Chemistry, Mathematics and Physics. Stored as one group of the four at 5 (the model holds one of the two, and the page does not say which subject takes the 5). Was 36 with Biology 6 and Chemistry 6, Chemistry not critical; the 2026 page gave 35–36. With only one core science at HL, Geography, Psychology or Sports, Exercise and Health Science can replace the second, with 36 points and 666; the model cannot hold that alternative offer. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zaf8004h7msfxaqe4s7a',
      status: 'current',
      name: 'MSci Biotechnology',
      description:
        "An integrated Master's programme in Biotechnology providing advanced training in biological applications and research.",
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/10114/msci-biotechnology/',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'],
          level: 'HL',
          grade: 5,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/10114/msci-biotechnology/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL, including two science subjects, normally Biology and Chemistry; the core sciences are Biology, Chemistry, Mathematics and Physics. Stored as one group of the four at 5 (the model holds one of the two, and the page does not say which subject takes the 5). Was 36 with Biology or Chemistry at 6; the 2026 page gave 35–36. With only one core science at HL, Geography, Psychology or Sports, Exercise and Health Science can replace the second, with 36 points and 666; the model cannot hold that alternative offer. Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkf6zkvn008z7msfg4gtszz1',
      status: 'current',
      name: 'MusB Music',
      description:
        "Study music performance, composition, and musicology at one of the UK's leading music departments.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Music',
      duration: '3 years',
      minIBPoints: 35,
      programUrl: 'https://www.manchester.ac.uk/study/undergraduate/courses/2027/02397/musb-music/',
      requirements: [{ courses: ['MUSIC'], level: 'HL', grade: 6, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.manchester.ac.uk/study/undergraduate/applying/before-you-apply/entry-requirements/',
        'https://www.manchester.ac.uk/study/undergraduate/courses/2027/02397/musb-music/'
      ],
      notes:
        'Checked for 2027 entry (the course page says "Year of entry: 2027"). 35 points with 665 at HL, including 6 in Music (added; the 2026 page asked 34). Manchester publishes a typical offer, not a minimum; the typical offer is stored, as before. The HL profile cannot be held by the model.'
    }
  ]
}

export default refresh
