import type { RefreshFile } from '../lib/refresh'

/**
 * The University of Melbourne: requirements for 2027 entry.
 *
 * Exported from the database on 2026-09-30 by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for 2027 entry (a university-wide IB page first),
 * correct what changed, list the pages in `sources` and set `checkedFor` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in `notes`. Programs left at `checkedFor: null` are not written, so set
 * `checkedOn` to the day the pages were read. Mark a program the university no longer offers
 * `discontinued`, and add one it now offers with status `new` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts the-university-of-melbourne
 */
const refresh: RefreshFile = {
  university: 'The University of Melbourne',
  entryYear: 2027,
  checkedOn: '2026-09-30',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkglwvy8001f7mig9zy7v980',
      status: 'current',
      name: 'Bachelor of Agriculture',
      description:
        "Agriculture's focus on science and sustainability is how we will adapt to our changing climate, declining environmental health and increasing demand for safe food production to feed our growing populations. A Bachelor of Agriculture is your opportunity to use science, technology and business to tackle critical sustainability issues and build a career with lasting impact. You'll learn the science necessary to produce safe, high-quality and ethical food and fibre as well as the economics underpinning Australia's important role in international trade.",
      field: 'Environmental Studies',
      degree: 'Bachelor of Agriculture',
      duration: '3 years',
      minIBPoints: 25,
      programUrl:
        'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-agriculture/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: ['https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-agriculture/'],
      notes:
        "Content 4.7: the owner checked the course's entry requirements page in a browser on 30 September 2026 and confirmed the stored IB score and prerequisites for 2027 entry. study.unimelb.edu.au refuses curl, urllib and WebFetch (Cloudflare), so the check rests on that browser reading."
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkglwtdd00017migoujxscjq',
      status: 'current',
      name: 'Bachelor of Arts',
      description:
        "A Bachelor of Arts (BA) offers a flexible approach to studying the humanities, social sciences and languages at Australia's number one university. Build interdisciplinary knowledge, community leadership and cultural awareness. And, you'll graduate with the skills necessary to succeed in the rapidly changing, global workplace.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 30,
      programUrl: 'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-arts/',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: ['https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-arts/'],
      notes:
        "Content 4.7: the owner checked the course's entry requirements page in a browser on 30 September 2026 and confirmed the stored IB score and prerequisites for 2027 entry. study.unimelb.edu.au refuses curl, urllib and WebFetch (Cloudflare), so the check rests on that browser reading."
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkglwxpo002r7mig47y8y0yt',
      status: 'current',
      name: 'Bachelor of Biomedicine',
      description:
        'The Bachelor of Biomedicine offers a transformative journey through the biomedical science of life, disease, and health systems right in the heart of the Melbourne Biomedical Precinct, the largest of its kind in the southern hemisphere. Learn to apply concepts across the biomedical science disciplines, from molecules to malady and from individual diseases to population health. The integrated curriculum is designed to build your understanding of the human body in its full complexity, preparing you for the challenges of modern healthcare.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Biomedicine',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-biomedicine/',
      requirements: [
        { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: ['https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-biomedicine/'],
      notes:
        "Content 4.7: the owner checked the course's entry requirements page in a browser on 30 September 2026 and confirmed the stored IB score and prerequisites for 2027 entry. study.unimelb.edu.au refuses curl, urllib and WebFetch (Cloudflare), so the check rests on that browser reading."
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkglwvlq00177migxdt5ujr4',
      status: 'current',
      name: 'Bachelor of Commerce',
      description:
        'Equip yourself with the skills and knowledge to understand and solve key business challenges. Make a difference to society, policy, and organisations while forging a pathway to a global career.',
      field: 'Business & Economics',
      degree: 'Bachelor of Commerce',
      duration: '3 years',
      minIBPoints: 35,
      programUrl: 'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-commerce/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: ['https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-commerce/'],
      notes:
        "Content 4.7: the owner checked the course's entry requirements page in a browser on 30 September 2026 and confirmed the stored IB score and prerequisites for 2027 entry. study.unimelb.edu.au refuses curl, urllib and WebFetch (Cloudflare), so the check rests on that browser reading."
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkglwwck001p7migier16pcc',
      status: 'current',
      name: 'Bachelor of Design',
      description:
        'Good design has the power to transform and provide lasting solutions that improve our lives. Designers apply creative and open approaches to defining and solving problems, leading to high-quality decisions. This enables businesses and industries to overcome rigid or outdated ways of doing things. Design has applications in the creation and improvement of our cities, buildings, transport networks, furniture, websites, processes, bridges, landscapes and environment. Designers are innovators who enhance the way we live and interact with the world around us.',
      field: 'Architecture',
      degree: 'Bachelor of Design',
      duration: '3 years',
      minIBPoints: 30,
      programUrl: 'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-design/',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: ['https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-design/'],
      notes:
        "Content 4.7: the owner checked the course's entry requirements page in a browser on 30 September 2026 and confirmed the stored IB score and prerequisites for 2027 entry. study.unimelb.edu.au refuses curl, urllib and WebFetch (Cloudflare), so the check rests on that browser reading."
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkglwuzz000v7migu9fawleu',
      status: 'current',
      name: 'Bachelor of Fine Arts (Acting)',
      description:
        'Selection into the Bachelor of Fine Arts is talent-based. The selection process for this specialisation includes an audition. This intensive conservatory-style program provides rigorous training in acting technique, voice, movement, and performance for stage and screen.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Fine Arts',
      duration: '3 years',
      minIBPoints: 30,
      programUrl:
        'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-fine-arts-acting/',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-fine-arts-acting/'
      ],
      notes:
        "Content 4.7: the owner checked the course's entry requirements page in a browser on 30 September 2026 and confirmed the stored IB score and prerequisites for 2027 entry. study.unimelb.edu.au refuses curl, urllib and WebFetch (Cloudflare), so the check rests on that browser reading."
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkglwu27000d7migl7rycw0x',
      status: 'current',
      name: 'Bachelor of Fine Arts (Film and Television)',
      description:
        'Selection into the Bachelor of Fine Arts is talent-based. The selection process for this specialisation includes an audition. This program provides comprehensive training in film and television production, developing skills in directing, cinematography, editing and storytelling for screen.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Fine Arts',
      duration: '3 years',
      minIBPoints: 30,
      programUrl:
        'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-fine-arts-film-and-television/',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-fine-arts-film-and-television/'
      ],
      notes:
        "Content 4.7: the owner checked the course's entry requirements page in a browser on 30 September 2026 and confirmed the stored IB score and prerequisites for 2027 entry. study.unimelb.edu.au refuses curl, urllib and WebFetch (Cloudflare), so the check rests on that browser reading."
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkglwtqs00077migpqzys1tk',
      status: 'current',
      name: 'Bachelor of Fine Arts (Music Theatre)',
      description:
        'Selection into the Bachelor of Fine Arts is talent-based. The selection process for this specialisation includes an audition. This program offers comprehensive training in music theatre performance, combining acting, singing, and dance in preparation for careers in professional theatre and performing arts.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Fine Arts',
      duration: '3 years',
      minIBPoints: 30,
      programUrl:
        'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-fine-arts-music-theatre/',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-fine-arts-music-theatre/'
      ],
      notes:
        "Content 4.7: the owner checked the course's entry requirements page in a browser on 30 September 2026 and confirmed the stored IB score and prerequisites for 2027 entry. study.unimelb.edu.au refuses curl, urllib and WebFetch (Cloudflare), so the check rests on that browser reading."
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkglwudf000j7migc1w91ez9',
      status: 'current',
      name: 'Bachelor of Fine Arts (Production)',
      description:
        'Selection into the Bachelor of Fine Arts is talent-based. The selection process for this specialisation includes an audition. This program focuses on theatrical production including stage management, technical production, design and production management for live performance.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Fine Arts',
      duration: '3 years',
      minIBPoints: 30,
      programUrl:
        'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-fine-arts-production/',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-fine-arts-production/'
      ],
      notes:
        "Content 4.7: the owner checked the course's entry requirements page in a browser on 30 September 2026 and confirmed the stored IB score and prerequisites for 2027 entry. study.unimelb.edu.au refuses curl, urllib and WebFetch (Cloudflare), so the check rests on that browser reading."
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkglwuos000p7mig9mgntu07',
      status: 'current',
      name: 'Bachelor of Fine Arts (Screenwriting)',
      description:
        'Selection into the Bachelor of Fine Arts is talent-based. The selection process for this specialisation includes an audition. This program develops skills in writing for film, television and digital platforms, focusing on storytelling, narrative structure and script development.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Fine Arts',
      duration: '3 years',
      minIBPoints: 30,
      programUrl:
        'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-fine-arts-screenwriting/',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-fine-arts-screenwriting/'
      ],
      notes:
        "Content 4.7: the owner checked the course's entry requirements page in a browser on 30 September 2026 and confirmed the stored IB score and prerequisites for 2027 entry. study.unimelb.edu.au refuses curl, urllib and WebFetch (Cloudflare), so the check rests on that browser reading."
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkglwvau00117migtb25hosi',
      status: 'current',
      name: 'Bachelor of Music (Jazz and Improvisation)',
      description:
        'This program offers comprehensive training in jazz performance and improvisation, developing musicianship skills alongside theoretical understanding of jazz traditions and contemporary improvised music practices.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Music',
      duration: '3 years',
      minIBPoints: 30,
      programUrl:
        'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-music-jazz-and-improvisation/',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2027,
      sources: [
        'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-music-jazz-and-improvisation/'
      ],
      notes:
        "Content 4.7: the owner checked the course's entry requirements page in a browser on 30 September 2026 and confirmed the stored IB score and prerequisites for 2027 entry. study.unimelb.edu.au refuses curl, urllib and WebFetch (Cloudflare), so the check rests on that browser reading."
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkglwy5900337miggpd8yz8y',
      status: 'current',
      name: 'Bachelor of Oral Health',
      description:
        'Prepare for a career in oral health care, providing preventive and therapeutic dental services. This program combines clinical training with scientific understanding of oral health, preparing graduates to work as oral health therapists in dental practices, community health settings, and public health programs.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Oral Health',
      duration: '3 years',
      minIBPoints: 37,
      programUrl:
        'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-oral-health/',
      requirements: [
        { courses: ['BIO', 'CHEM'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2027,
      sources: ['https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-oral-health/'],
      notes:
        "Content 4.7: the owner checked the course's entry requirements page in a browser on 30 September 2026 and confirmed the stored IB score and prerequisites for 2027 entry. study.unimelb.edu.au refuses curl, urllib and WebFetch (Cloudflare), so the check rests on that browser reading."
    },
    // Stored: checked for 2026 entry on 2026-01-16.
    {
      id: 'cmkglwwog001v7migy13ejlnb',
      status: 'current',
      name: 'Bachelor of Science',
      description:
        "Maybe you've always known that you wanted to be a marine biologist. Or perhaps you're still deciding whether you want to be an engineer or a geologist. A doctor or a vet? A data scientist or a physicist? A chemist or a psychologist? The Bachelor of Science is a pathway to all these careers, and hundreds more. With more than 40 majors on offer, you can select from the full range of science, biomedicine, mathematics, engineering and IT subjects. You'll be taught, mentored and inspired by international experts in their fields.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 31,
      programUrl: 'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-science/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: ['https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-science/'],
      notes:
        "Content 4.7: the owner checked the course's entry requirements page in a browser on 30 September 2026 and confirmed the stored IB score and prerequisites for 2027 entry. study.unimelb.edu.au refuses curl, urllib and WebFetch (Cloudflare), so the check rests on that browser reading."
    },
    // Stored: checked for 2026 entry on 2026-01-16. Degree stored as "Bachelor of Science (Honours)".
    {
      id: 'cmkglwx6o002b7migepw429rq',
      status: 'current',
      name: 'Bachelor of Science (Advanced-Honours)',
      description:
        'A challenging and rewarding pathway for high-achieving students who want to pursue an integrated undergraduate and Honours degree in Science. This program provides enhanced research opportunities and mentoring from leading academics, preparing graduates for research careers or advanced postgraduate study.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 31,
      programUrl:
        'https://study.unimelb.edu.au/find/courses/honours/bachelor-of-science-advanced-honours/',
      requirements: [
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4, critical: false }
      ],
      checkedFor: 2027,
      sources: [
        'https://study.unimelb.edu.au/find/courses/honours/bachelor-of-science-advanced-honours/'
      ],
      notes:
        "Content 4.7: the owner checked the course's entry requirements page in a browser on 30 September 2026 and confirmed the stored IB score and prerequisites for 2027 entry. study.unimelb.edu.au refuses curl, urllib and WebFetch (Cloudflare), so the check rests on that browser reading."
    }
  ]
}

export default refresh
