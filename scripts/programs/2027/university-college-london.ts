import type { RefreshFile } from '../lib/refresh'

/**
 * University College London: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts university-college-london
 */
const refresh: RefreshFile = {
  university: 'University College London',
  entryYear: 2027,
  checkedOn: '2026-09-27',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcelrh005t7mydbu6e8z2h',
      status: 'current',
      name: 'BA Ancient History',
      description:
        'How have events and developments in the distant past shaped our world? Dive into topics spanning ancient Greece, the imperial might of Rome and the history of the Middle East and Egypt from the third millennium BC to late antiquity. Working with UCL’s renowned historians, you’ll develop sought-after research and analytical skills relevant to careers in academia, law, journalism, media, creative arts, politics, health and education.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/ancient-history-ba',
      requirements: [{ courses: ['HIST'], level: 'HL', grade: 6, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/ancient-history-ba',
        'https://web.archive.org/web/20260330001814/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/ancient-history-ba'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 30 March 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 38 points including 6 in History at HL. UCL also asks for 18 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 34 (16 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcem0n005x7myd9f1p5xqx',
      status: 'current',
      name: 'BA Archaeology',
      description:
        'Build your expertise of archaeological concepts and major issues of prehistory, and get to grips with practical and analytical techniques, transferable to many sectors. Learning from UCL’s internationally renowned researchers, you’ll go deeper into the chronological periods, geographical areas and specialist skills that interest you most. Fieldwork is a major component of this three-year degree, to sharpen your skills in excavation, museum work, research, and digital projects, both locally and (where possible) overseas.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/archaeology-ba',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/archaeology-ba',
        'https://web.archive.org/web/20260712223449/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/archaeology-ba'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 12 July 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 34 points. Checked, no specific subjects required. UCL also asks for 16 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 30 (15 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcelj1005r7mydc9obt8us',
      status: 'current',
      name: 'BSc Architecture',
      description:
        'Architecture BSc offers students a wide and diverse range of experiences. Our students will develop an independent, experimental and rigorous approach to architecture and design. Students are guided towards discovering their own architectural vision as well as working collaboratively within a vibrant and exciting studio culture.',
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/architecture-bsc',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/architecture-bsc',
        'https://web.archive.org/web/20260511083753/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/architecture-bsc'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 11 May 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. The course is Architecture BSc (UCAS K100); it was stored as "BA Architecture". 36 points. Checked, no specific subjects required. A portfolio of creative work is required on invitation at application stage. UCL also asks for 17 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 30 (15 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcekp7005f7mydl7rcug8u',
      status: 'current',
      name: 'BA English',
      description:
        'Study English literature ranging from the seventh century to the modern day, take specialist linguistics modules, and develop transferable skills in writing, research and critical thinking. UCL English is the only UK English department to provide one-to-one tutorial teaching, elevating your experience of studying here. You’ll benefit from bespoke learning led by expert academics in Bloomsbury, the heart of British literary life. Graduates go on to work in education, creative arts, media, publishing and beyond.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/english-ba',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/english-ba',
        'https://web.archive.org/web/20260527095629/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/english-ba'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 27 May 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 38 points including 6 in English A (Literature, or Language and Literature) at HL. UCL also asks for 18 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 34 (16 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcem8d005z7mydso3rrm5g',
      status: 'current',
      name: 'BA Fine Art',
      description:
        'Develop your skills as a professional artist or creative professional by embarking on this four-year degree at the prestigious UCL Slade School of Fine Art. The practice-based Fine Art BA incorporates painting, fine art media and sculpture, as well as history and theory of art. You’ll be taught by practising artists and scholars, enjoy dedicated studio space, and have access to London’s vast cultural resources. Graduates go on to careers as artists, or find employment in the performance and creative arts sector.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/fine-art-ba',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/fine-art-ba',
        'https://web.archive.org/web/20260609114159/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/fine-art-ba'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 9 June 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 34 points. Checked, no specific subjects required. A portfolio of work is required. Four years. UCL also asks for 16 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 30 (15 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfceobs007b7myddxhfald2',
      status: 'current',
      name: 'BA Geography',
      description:
        "Examine and learn to address urgent global issues like climate change, migration, geopolitics and urban development from a human and physical geography standpoint. Get first-hand experience on field trips, specialise with optional modules, and engage with the boundary-pushing research of UCL's leading academics. A theoretical and practical training that will set you up to work in a vast array of sectors.",
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/geography-ba',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/geography-ba',
        'https://web.archive.org/web/20260512060642/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/geography-ba'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 12 May 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 36 points (was 38). Checked, no specific subjects required. UCL also asks for 17 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 32 (15 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcekzu005l7mydzurf0nq3',
      status: 'current',
      name: 'BA History',
      description:
        'What can ancient, medieval and modern history teach us about societies and life today? Broaden your cultural awareness and develop sought-after research and analytical skills while examining your choice of topics across a vast range of geographical regions and time periods, from the Ancient Near East to modern China, the US and the Caribbean. Excellent preparation for a career in academia, law, journalism, media, creative arts, politics, health or education.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl: 'https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/history-ba',
      requirements: [{ courses: ['HIST'], level: 'HL', grade: 6, critical: true }],
      checkedFor: null,
      sources: [],
      notes:
        'Content 4.1: not checked. ucl.ac.uk blocks scripted requests and WebFetch, and the Internet Archive has no readable copy of this course at its new address (/study/prospective-students/undergraduate/courses/<slug>) — only the 2026-entry page at the old one. Owner: open the page in a browser. The search index lists /study/prospective-students/undergraduate/courses/history-ba.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcelb5005p7myds69j5t42',
      status: 'current',
      name: 'BA Philosophy',
      description:
        'Immerse yourself in a wide range of philosophical areas and develop highly transferable skills valued by employers. The Philosophy BA incorporates all major areas of philosophy, including moral and political philosophy, metaphysics, epistemology and logic. A wide selection of optional modules enables you to pursue your specific areas of interest too. Graduates go on to succeed in careers in the media, law, finance and beyond.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/philosophy-ba',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/philosophy-ba',
        'https://web.archive.org/web/20260506164329/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/philosophy-ba'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 6 May 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 38 points. Checked, no specific subjects required. UCL also asks for 18 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 34 (16 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcephr007p7mydgw08lp7b',
      status: 'current',
      name: 'BA Scandinavian Studies',
      description:
        'Gain near-native language skills and develop an intercultural understanding of the humanities through this versatile degree. Through the Scandinavian Studies BA, you’ll have access to incredible resources at one of the largest Scandinavian libraries in the country, and you’ll enjoy a year studying abroad. Graduates from this department pursue a variety of careers in translation, publishing, education and other sectors.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/scandinavian-studies-ba',
      requirements: [
        { courses: ['FRA-B', 'GER-B', 'SPA-B'], level: 'HL', grade: 5, critical: false }
      ],
      checkedFor: null,
      sources: [],
      notes:
        "Content 4.1: not checked. ucl.ac.uk blocks scripted requests and WebFetch, and the Internet Archive has no readable copy of this course at its new address (/study/prospective-students/undergraduate/courses/<slug>) — only the 2026-entry page at the old one. Owner: open the page in a browser. No standalone Scandinavian Studies BA appears in UCL's archived course list, only joint degrees (Danish, Norwegian, Swedish, Icelandic combinations): it may no longer be offered."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfced0u00157myda1qmyeao',
      status: 'current',
      name: 'BEng Civil Engineering',
      description:
        'Our Civil Engineering BEng equips you with the skills to tackle real-world engineering challenges through hands-on, multidisciplinary learning. Covering structural design, transport systems, earthquake resilience, and environmental engineering, this programme prepares you for a dynamic career shaping the built and natural environments in an ever-evolving world.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/civil-engineering-beng',
      requirements: [
        {
          anyOf: [
            { course: 'PHYS', level: 'HL', grade: 5 },
            { course: 'PHYS', level: 'SL', grade: 5 }
          ],
          critical: true
        }
      ],
      checkedFor: null,
      sources: [],
      notes:
        "Content 4.1: not checked. ucl.ac.uk blocks scripted requests and WebFetch, and the Internet Archive has no readable copy of this course at its new address (/study/prospective-students/undergraduate/courses/<slug>) — only the 2026-entry page at the old one. Owner: open the page in a browser. Only the MEng appears in UCL's archived course list: the BEng may no longer be offered."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcedmh001h7mydpm1tmtbr',
      status: 'current',
      name: 'BEng Mechanical Engineering',
      description:
        'Take the latest scientific discoveries and find ways to put them into action, to solve the most urgent challenges facing our communities, our economies and our planet. This comprehensive three-year bachelor’s degree provides you with the practical, mathematical and computational skills and theories you’ll need to engineer innovative solutions to complex problems, while managing resources sustainably and helping reduce environmental impacts.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mechanical-engineering-beng',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mechanical-engineering-beng',
        'https://web.archive.org/web/20260607204234/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mechanical-engineering-beng'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 7 June 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 39 points with 7 and 6 in Mathematics and Physics at HL, in either order; stored as 6 in each because the model cannot say "one of them 7" (was 7 in each). Mathematics AA or AI. Economics is preferred as the third HL subject but not essential, so the stored Economics HL4 row is removed. UCL also asks for 19 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 38 (18 at HL, 7 in Mathematics or Physics).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcejo9004z7mydqwgrrblu',
      status: 'current',
      name: 'BSc Economics (Econ)',
      description:
        'Gain a rigorous foundation in economic theories and quantitative tools, and consider their influence on real-world issues like climate change, inequality and inflation. Working with UCL’s renowned economists, you’ll learn to research and solve problems independently using evidenced-based economic analysis. Solid preparation for further study or roles in public policy, finance, banking, and management.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/economics-bsc-econ',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/economics-bsc-econ',
        'https://web.archive.org/web/20260807051456/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/economics-bsc-econ'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 7 August 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. Name had a double space. 39 points including 7 in Mathematics at HL (AA or AI). The 2027 page no longer mentions Economics, so the stored Economics HL6 row is removed. TMUA required for 2027 entry. UCL also asks for 19 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 38 (18 at HL, 7 in Mathematics).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfceouo007j7mydcunzsh1j',
      status: 'current',
      name: 'BSc Anthropology',
      description:
        'What is it to be human? Delve into the evolutionary, environmental, social, cultural and material aspects of this vast topic on this broad-based anthropology degree. You’ll gain the skills and analytical perspectives to explore and respond to the challenges of today, from conflict, poverty and climate change to racial discrimination and gender bias. Ideal preparation for human-focused careers in the civil service, NGOs, market research, advertising, the arts, journalism, consultancy and business.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/anthropology-bsc',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/anthropology-bsc',
        'https://web.archive.org/web/20260812064155/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/anthropology-bsc'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 12 August 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 36 points. Checked, no specific subjects required. UCL also asks for 17 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 32 (15 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcegtc003j7mydmdsto2kd',
      status: 'current',
      name: 'BSc Biological Sciences',
      description:
        'Gain the core competencies and skills needed to become a professional biologist. This flexible BSc lets you combine a broad base of biological scientific knowledge with a chosen specialism, so you can shape the programme to match your research and career goals.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/biological-sciences-bsc',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/biological-sciences-bsc',
        'https://web.archive.org/web/20260527044950/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/biological-sciences-bsc'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 27 May 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 38 points including 6 in Biology and one of Chemistry, Mathematics or Physics at HL (at least 5, as no HL score may be below 5; required, so now critical). Mathematics AA or AI. UCL also asks for 18 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 34 (16 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcefij002r7mydvhk8815d',
      status: 'current',
      name: 'BSc Chemistry',
      description:
        'This three-year programme offers a complete education in chemistry, covering all the important areas of the subject while also allowing you to take optional modules in other areas such as life sciences, mathematics, management and languages.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/chemistry-bsc',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/chemistry-bsc',
        'https://web.archive.org/web/20260518210551/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/chemistry-bsc'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 18 May 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 38 points including 6 in Chemistry and 6 in one of Biology, Physics or Mathematics at HL (required, so now critical). Mathematics AA or AI. Biology, Physics, Mathematics, Further Mathematics, Computer Science or Psychology are preferred as the third subject, not required, so the stored Computer Science/Psychology HL4 row is removed. UCL also asks for 18 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 34 (16 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcej2k004n7mydn24vdiqa',
      status: 'current',
      name: 'BSc Computer Science',
      description:
        'The Computer Science BSc at UCL gives you the foundational knowledge, practical skills and engineering principles needed for a successful computing career across a broad range of industries. You’ll tackle real-world problems and enjoy opportunities to collaborate with world-leading finance and tech companies.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 40,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/computer-science-bsc',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/computer-science-bsc',
        'https://web.archive.org/web/20260807051515/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/computer-science-bsc'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 7 August 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. Minimum 40 points with 20 across three HL subjects, including 7 in Mathematics at HL (AA or AI; AA preferred). Contextual offer: 38 (18 at HL, 7 in Mathematics, no HL score below 5).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfceolc007f7mydjd4pe8g0',
      status: 'current',
      name: 'BSc Geography',
      description:
        "Examine and learn to address urgent global issues like climate change, migration, geopolitics and urban development from a human and physical geography standpoint. Get first-hand experience on field trips, specialise with optional modules, and engage with the boundary-pushing research of UCL's leading academics. A theoretical and practical training that will set you up to work in a vast array of sectors.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/geography-bsc',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/geography-bsc',
        'https://web.archive.org/web/20260519155538/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/geography-bsc'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 19 May 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 36 points (was 38). Checked, no specific subjects required. UCL also asks for 17 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 32 (15 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcejd8004t7mydhixje6d0',
      status: 'current',
      name: 'BSc Information Management for Business',
      description:
        "Developed in close collaboration with some of the UK's best-known companies, this pioneering Information Management for Business BSc offers a unique balance of IT, management and business skills to ensure that our graduates have the expertise to succeed in the industries of the future.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/information-management-business-bsc',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }],
      checkedFor: null,
      sources: [],
      notes:
        "Content 4.1: not checked. ucl.ac.uk blocks scripted requests and WebFetch, and the Internet Archive has no readable copy of this course at its new address (/study/prospective-students/undergraduate/courses/<slug>) — only the 2026-entry page at the old one. Owner: open the page in a browser. The School of Management's own page (mgmt.ucl.ac.uk/imb) says start September 2027, AAA at A level, and gives no IB figure."
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcehez003v7mydwseohoj1',
      status: 'current',
      name: 'BSc Mathematics',
      description:
        'This three-year programme allows you to study varied aspects of mathematics to an advanced level, with core modules in algebra, analysis, applied mathematics and mathematical methods. With this core knowledge you may then build your degree, choosing options from over 30 specialist modules.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 40,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mathematics-bsc',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mathematics-bsc',
        'https://web.archive.org/web/20260805092533/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mathematics-bsc'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 5 August 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 40 points with 20 across three HL subjects including 7 in Mathematics: analysis and approaches (AA only); or 39 (19 at HL) with grade 2 in any STEP paper or a distinction in Mathematics AEA. The third subjects listed (Physics, Chemistry, Computer Science, Biology, Economics, English and others) are preferred, not required, so the stored group is removed. Contextual offer: 38 (18 at HL, 7 in Mathematics).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfceigx004b7mydnea3868u',
      status: 'current',
      name: 'BSc Mathematics and Physics',
      description:
        'Physics and mathematics are inextricably linked. It is not really possible to understand the basic concepts of physics such as elementary particle theory without a strong grounding in both pure and applied mathematics. This BSc combines the study of mathematics and physics on an equal basis, each reinforcing the other.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 40,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mathematics-and-physics-bsc',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mathematics-and-physics-bsc',
        'https://web.archive.org/web/20260524140004/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mathematics-and-physics-bsc'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 24 May 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 40 points with 20 across three HL subjects including 7 in Mathematics: analysis and approaches (AA only) and 6 in Physics at HL (required, so now critical); or 39 (19 at HL) with grade 2 in any STEP paper or a distinction in Mathematics AEA. Contextual offer: 39 (19 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfceerm00297mydsm2ea63b',
      status: 'current',
      name: 'BSc Neuroscience',
      description:
        'Explore the nervous system. Learn about the physiological mechanisms and anatomical organisation underlying thoughts, feelings and behaviour. Develop world-class skills in research, data analysis and problem-solving. Build your expertise in one of the most popular and impactful scientific disciplines with the help of pioneering academics at one of the world’s most influential centres for neuroscience.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/neuroscience-bsc',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: false }
      ],
      checkedFor: null,
      sources: [],
      notes:
        'Content 4.1: not checked. ucl.ac.uk blocks scripted requests and WebFetch, and the Internet Archive has no readable copy of this course at its new address (/study/prospective-students/undergraduate/courses/<slug>) — only the 2026-entry page at the old one. Owner: open the page in a browser. Not the same programme as Human Neuroscience BSc (B142, Faculty of Brain Sciences); this is the Faculty of Life Sciences Neuroscience BSc (B140).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfceg7k00377mydjfoejqec',
      status: 'current',
      name: 'BSc Physics',
      description:
        "When we turn on a light or check the weather forecast, we are reaping the practical benefits of physics research. As well as exploring fundamental science, this BSc goes to the cutting edge of technologies that affect everyday life, equipping you with the tools and imagination to address tomorrow's questions.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/physics-bsc',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/physics-bsc',
        'https://web.archive.org/web/20260605200800/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/physics-bsc'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 5 June 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 39 points with 7 and 6 in Mathematics and Physics at HL, in either order; stored as 6 in each because the model cannot say "one of them 7" (was 7 in each). Mathematics AA or AI (was AA only). UCL also asks for 19 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 36 (17 at HL, 6 in each).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcenn7006v7mydy3k6rxot',
      status: 'current',
      name: 'BSc Politics and International Relations',
      description:
        "Want to understand the substance behind the political headlines and deepen your knowledge of the forces shaping today's world? Develop the skills to assess some of the most pressing challenges of our time, both domestically and globally, while learning to analyse data and conduct impactful research. You’ll engage with practitioners from the world of politics, policy, and activism and be equipped to make your mark in the public and private sector, grassroots movements, NGOs, think tanks and academia.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/politics-and-international-relations-bsc',
      requirements: [],
      checkedFor: null,
      sources: [],
      notes:
        'Content 4.1: not checked. ucl.ac.uk blocks scripted requests and WebFetch, and the Internet Archive has no readable copy of this course at its new address (/study/prospective-students/undergraduate/courses/<slug>) — only the 2026-entry page at the old one. Owner: open the page in a browser.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcemgr00617myd2x505nnu',
      status: 'current',
      name: 'BSc Psychology',
      description:
        'The Psychology BSc is a three-year, British Psychological Society (BPS)-accredited course that teaches students to use scientific methods to explore and understand human behaviour. They ask fundamental questions about the mind and tackle pressing societal challenges, from understanding everyday well-being and behaviour to complex clinical disorders. Psychology students will be key to responding to mental health issues, climate change and artificial intelligence – each rooted in the need for behaviour change. Whether you want to predict, measure, influence or understand people, or just make them feel better, psychology at UCL is where to start',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/psychology-bsc',
      requirements: [
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS', 'PSYCH'],
          level: 'HL',
          grade: 6,
          critical: true
        },
        {
          courses: ['BIO', 'CHEM', 'MATH-AA', 'MATH-AI', 'PHYS', 'PSYCH'],
          level: 'HL',
          grade: 6,
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/psychology-bsc',
        'https://web.archive.org/web/20260519040700/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/psychology-bsc'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 19 May 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 39 points with 7 and 6 in two subjects from Biology, Chemistry, Mathematics, Physics or Psychology at HL. Stored as two groups at 6, both required, so both critical (the second was not); the model cannot stop one subject counting for both, or say "one of them 7". Mathematics AA or AI. UCL also asks for 19 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 36 (17 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcenuu006x7mydbggubeov',
      status: 'current',
      name: 'BSc Psychology and Language Sciences',
      description:
        "Become the next generation of psychology and language sciences experts by studying UCL's Psychology and Language Science BSc course. \nWe are ranked 4th in the world for Psychology in the Shanghai Ranking Global Ranking of Academic Subjects for 2024. Accredited by the British Psychological Society (BPS), this is a dynamic and engaging course that explores psychology through the prism of human interaction and communication - an integral aspect of what it means to be human.",
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/psychology-and-language-sciences-bsc',
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
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/psychology-and-language-sciences-bsc',
        'https://web.archive.org/web/20260515040753/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/psychology-and-language-sciences-bsc'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 15 May 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 38 points including 6 in one of Biology, Chemistry, Mathematics, Physics or Psychology at HL. Mathematics AA or AI. UCL also asks for 18 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 34 (16 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcenfh006t7mydkzyz0t8o',
      status: 'current',
      name: 'BSc Social Sciences',
      description:
        'A rapidly changing global landscape raises fundamental issues about the relationship between individuals and society. The interdisciplinary Social Sciences BSc at UCL offers opportunities to engage with global perspectives on social change, and tools for understanding, shaping and innovating in future policy and practice. \n\nAs a Social Sciences BSc student you will develop excellent skills in critical thinking and empirical analysis, preparing you for careers in a range of areas such as government, politics, journalism, non-governmental organisations and international development.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/social-sciences-bsc',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/social-sciences-bsc',
        'https://web.archive.org/web/20260807051347/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/social-sciences-bsc'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 7 August 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 36 points (was 38). Checked, no specific subjects required. UCL also asks for 17 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 32 (15 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcen7r006r7mydjgzxnwqe',
      status: 'current',
      name: 'BSc Sociology',
      description:
        'The Sociology BSc blends local and global sociological perspectives to examine contemporary social issues and transformations, ranging from environmental risks and climate change, to the intensification of inequalities, and imaginings of the future. Students will graduate with the skills and mindset appropriate to tackle the challenges of 21st century society. You will also have the opportunity to study abroad for one academic year.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/sociology-bsc',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/sociology-bsc',
        'https://web.archive.org/web/20260511085207/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/sociology-bsc'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 11 May 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 36 points (was 38). Checked, no specific subjects required. UCL also asks for 17 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 32 (15 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcepa6007n7mydx5w0lfgb',
      status: 'current',
      name: 'BSc Urban Studies',
      description:
        'We are training new generations of urban experts with a deep understanding of how cities are formed and change, along with the tools to find innovative solutions for pressing urban problems. UCL’s Urban Studies BSc draws from sociology, urban economics, urban design, politics, and spatial analytics to prepare you to work in both the public and private sectors, where there is demand for analytical, research, and ideation skills.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/urban-studies-bsc',
      requirements: [
        {
          courses: ['BUS-MGMT', 'ECON', 'ENG-LIT', 'ENG-LL', 'GEOG', 'HIST'],
          level: 'HL',
          grade: 5,
          critical: false
        }
      ],
      checkedFor: null,
      sources: [],
      notes:
        'Content 4.1: not checked. ucl.ac.uk blocks scripted requests and WebFetch, and the Internet Archive has no readable copy of this course at its new address (/study/prospective-students/undergraduate/courses/<slug>) — only the 2026-entry page at the old one. Owner: open the page in a browser. In August 2026 the search index still showed the 2026-entry page ("details for 2027 entry will be published soon").'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcekhd005d7mydws01j0eu',
      status: 'current',
      name: 'LLB Law',
      description:
        'Our vision is of a faculty which provides a diverse, inclusive and deeply non-discriminatory home for both staff and students – competitive as well as caring to achieve excellence and to allow all its members to flourish. Our intellectually demanding three-year programme combines theory and research with practical application and will equip you with valuable transferable skills.The UCL Centre for Access to Justice combines legal education with the provision of pro bono advice to vulnerable communities. \n\nStudents may also have the opportunity, after year two, to extend their studies by a year and spend part of their degree studying abroad in the USA, Australia, Hong Kong or Singapore. No previous knowledge of law is assumed or required.',
      field: 'Law',
      degree: 'Bachelor of Laws',
      duration: '3 years',
      minIBPoints: 39,
      programUrl: 'https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/law-llb',
      requirements: [],
      checkedFor: null,
      sources: [],
      notes:
        'Content 4.1: not checked. ucl.ac.uk blocks scripted requests and WebFetch, and the Internet Archive has no readable copy of this course at its new address (/study/prospective-students/undergraduate/courses/<slug>) — only the 2026-entry page at the old one. Owner: open the page in a browser.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfceebf001x7myd2rdntebo',
      status: 'current',
      name: 'MBBS Medicine',
      description:
        "Study the Bachelor of Medicine and Bachelor of Surgery (MBBS) with us to become a highly capable, patient-centred clinician, grounded in science and best practice. You will be joining a prestigious medical school in the heart of London and be taught by internationally renowned educators and researchers. This integrated course takes five years (if you already have a BSc) or six (if you don't).",
      field: 'Medicine & Health',
      degree: 'Bachelor of Medicine and Bachelor of Surgery',
      duration: '6 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/medicine-mbbs-bsc',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/medicine-mbbs-bsc',
        'https://web.archive.org/web/20260801143959/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/medicine-mbbs-bsc'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 1 August 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. Medicine MBBS BSc, 6 years. 39 points with 6 and 7 in Biology and Chemistry at HL, in either order; stored as 6 in each because the model cannot say "one of them 7" (was 7 in each). The stored Mathematics/Physics HL7 row has no basis on the page and is removed. UCAT and interview; UCAS deadline 15 October 2026. UCL also asks for 19 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 36 (17 at HL, 6 in Biology and Chemistry).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcedbt001b7mydg4vubbxf',
      status: 'current',
      name: 'MEng Civil Engineering',
      description:
        'Our Civil Engineering MEng is a challenging four-year programme that combines theory, hands-on projects, and multidisciplinary learning. You’ll develop expertise in structural design, transport systems, earthquake resilience, and environmental engineering, preparing you to tackle real-world challenges and shape the built and natural environments in a changing world.',
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/civil-engineering-meng',
      requirements: [{ courses: ['PHYS'], level: 'SL', grade: 1, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/civil-engineering-meng',
        'https://web.archive.org/web/20260714023801/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/civil-engineering-meng'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 14 July 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 39 points. Physics must be taken at HL or SL, with no grade stated: stored as Physics SL, grade 1 (was no subject stored). UCL also asks for 19 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 36 (17 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcedyz001p7myds4p5vuzo',
      status: 'current',
      name: 'MEng Mechanical Engineering',
      description:
        'This four-year integrated Mechanical Engineering MEng programme will give you the skills and expertise to turn exciting scientific discoveries into answers for the most urgent challenges we face. You’ll learn mechanical engineering, mathematical and computational skills, enabling you to design sustainable solutions that will help you master the management competencies needed to lead large-scale engineering projects, while saving resources and minimising environmental impact.',
      field: 'Engineering',
      degree: 'Master of Engineering',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mechanical-engineering-meng',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mechanical-engineering-meng',
        'https://web.archive.org/web/20260714023759/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mechanical-engineering-meng'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 14 July 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 39 points with 7 and 6 in Mathematics and Physics at HL, in either order; stored as 6 in each (Physics is required, so now critical). Mathematics AA or AI. Design Technology, Engineering, Economics, Geography, Chemistry and Biology are preferred as the third HL subject, not required, so the stored Economics HL5 row is removed. UCL also asks for 19 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 38 (18 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfceh41003p7mydmj5o0rui',
      status: 'current',
      name: 'MSci Biological Sciences',
      description:
        'On this four-year integrated master’s, you’ll develop a broad base of biological scientific knowledge, before choosing a research-intensive specialist pathway, working as a member of a research group alongside world-leading biological scientists.',
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/biological-sciences-msci',
      requirements: [
        { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
        { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/biological-sciences-msci',
        'https://web.archive.org/web/20260712223450/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/biological-sciences-msci'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 12 July 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 38 points including 6 in Biology and one of Chemistry, Mathematics or Physics at HL (at least 5; required, so now critical). Mathematics AA or AI. Degree was "Master". UCL also asks for 18 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 34 (16 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcefv6002z7mydvxhe2fh6',
      status: 'current',
      name: 'MSci Chemistry',
      description:
        'This four-year programme offers an additional year on top of the Chemistry BSc, in which you may specialise further and deepen your knowledge by undertaking advanced modules and an advanced research project.',
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/chemistry-msci',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 6, critical: true },
        { courses: ['BIO', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/chemistry-msci',
        'https://web.archive.org/web/20260517112440/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/chemistry-msci'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 17 May 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 38 points including 6 in Chemistry and 6 in one of Biology, Physics or Mathematics at HL (was 5, not critical). Mathematics AA or AI. Degree was "Master". UCL also asks for 18 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 34 (16 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcehpj003z7mydvjy1lij4',
      status: 'current',
      name: 'MSci Mathematics',
      description:
        'The four-year Mathematics MSci offers an additional year on top of the Mathematics BSc, allowing students to specialise further by taking more advanced modules, and undertaking a major final-year project.',
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 40,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mathematics-msci',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mathematics-msci',
        'https://web.archive.org/web/20260805093149/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mathematics-msci'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 5 August 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 40 points with 20 across three HL subjects including 7 in Mathematics: analysis and approaches (AA only); or 39 (19 at HL) with grade 2 in any STEP paper or a distinction in Mathematics AEA. The third subjects listed are preferred, not required, so the stored group is removed. Degree was "Master". Contextual offer: 38 (18 at HL, 7 in Mathematics).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfceirm004h7myd9q150nid',
      status: 'current',
      name: 'MSci Mathematics and Physics',
      description:
        'This MSci offers an additional year of study on top of the Mathematics and Physics BSc, during which students have the opportunity to specialise further by taking more advanced modules and completing a major project.',
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 40,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mathematics-and-physics-msci',
      requirements: [
        { courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mathematics-and-physics-msci',
        'https://web.archive.org/web/20260524140004/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/mathematics-and-physics-msci'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 24 May 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 40 points with 20 across three HL subjects including 7 in Mathematics: analysis and approaches (AA only) and 6 in Physics at HL (required, so now critical); or 39 (19 at HL) with grade 2 in any STEP paper or a distinction in Mathematics AEA. Degree was "Master". Contextual offer: 39 (19 at HL).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfcegig003d7myde412fk89',
      status: 'current',
      name: 'MSci Physics',
      description:
        'This four-year programme offers an additional year of study on top of the Physics BSc, during which students have the opportunity to specialise further by taking advanced optional modules, and undertaking a research project.',
      field: 'Natural Sciences',
      degree: 'Master in Science',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/physics-msci',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/physics-msci',
        'https://web.archive.org/web/20260502181907/https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/physics-msci'
      ],
      notes:
        'Checked for 2027 entry: the course page says "Course starts: September 2027". ucl.ac.uk blocks scripted requests, so it was read from the Internet Archive copy of 2 May 2026; the owner may want to confirm in a browser. Course pages moved from /prospective-students/undergraduate/degrees/ to /study/prospective-students/undergraduate/courses/. 39 points with 7 and 6 in Mathematics and Physics at HL, in either order; stored as 6 in each (Physics was 7). Mathematics AA or AI. Degree was "Master". UCL also asks for 19 points across three HL subjects with no HL score below 5, which the model cannot hold. Contextual offer: 36 (17 at HL, 6 in each).'
    }
  ]
}

export default refresh
