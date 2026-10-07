import type { RefreshFile } from '../lib/refresh'

/**
 * Nanyang Technological University: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts nanyang-technological-university
 */
const refresh: RefreshFile = {
  university: 'Nanyang Technological University',
  entryYear: 2027,
  checkedOn: '2026-09-30',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktshvjm000n7m853m03753t',
      status: 'current',
      name: 'Accountancy for Future Leaders (Sustainability Management and Analytics)',
      description:
        'Integrates sustainability, analytics, and 30-week internship with premier ATO employers of ACRA. Gain real-world experience and accelerated path to a Chartered Accountant.',
      field: 'Business & Economics',
      degree: 'Bachelor of Accountancy',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/accountancy-for-future-leaders-bachelor-of-accountancy-in-sustainability-management-and-analytics',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/accountancy-for-future-leaders-bachelor-of-accountancy-in-sustainability-management-and-analytics'
      ],
      notes:
        'Content 4.5: The PDF lists it as "Accountancy (Sustainability Management with Analytics)" under Accountancy: "Mathematics at Standard Level, and A good grade in English at Standard Level"; some candidates may be invited for interviews. Stored before: English A and Maths at HL 6, which no source gives. NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 38 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi3ub00597m85hwlpxz4h',
      status: 'current',
      name: 'Aerospace Engineering',
      description:
        'Covers the design, integration and testing of aircraft and spacecraft. It builds on the core mechanical engineering curriculum and provides specialization in aerodynamics, propulsion, flight mechanics and avionics.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-aerospace-engineering',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-aerospace-engineering'
      ],
      notes:
        'Content 4.5: Minimum subject requirements: "Mathematics at Higher Level, and Physics/Chemistry/Biology/Computer Science at Higher Level", both critical. The programme page says the same. Computer Science is added to the science group (task 4.5). The stored grade 6 in both groups has no source: neither the PDF nor the programme page names a grade, as 3.4 found; 4 is stored. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 38 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktshule00037m85z0o2i3za',
      status: 'current',
      name: 'Bachelor of Accountancy',
      description:
        'At Nanyang Technological University, we have the most established, well-regarded accountancy degree programme in Singapore and the region. For more than five decades, we have nurtured forward-looking professionals for leading accountancy roles. Through our full-time, three-year Bachelor of Accountancy programme, we will broaden your mind with exciting, flexible career options to pursue beyond accounting.',
      field: 'Business & Economics',
      degree: 'Bachelor of Accountancy',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-accountancy',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-accountancy'
      ],
      notes:
        'Content 4.5: Accountancy: "Mathematics at Standard Level, and A good grade in English at Standard Level"; some candidates may be invited for interviews. Stored before: both at SL 5. NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 36 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktshvzj000x7m85ztgyqqug',
      status: 'current',
      name: 'Bachelor of Accountancy with Minor in Digitalisation and Data Analytics',
      description:
        'The skills to make sense of data will enable you to make better informed decisions. Modern professionals are recognising the need to acquire skills in digital technology and data analytics to stay relevant in the increasingly digital economy.',
      field: 'Business & Economics',
      degree: 'Bachelor of Accountancy',
      duration: '3 years',
      minIBPoints: 37,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-accountancy-with-minor-in-digitalisation-and-data-analytics-(dda)',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-accountancy-with-minor-in-digitalisation-and-data-analytics-(dda)'
      ],
      notes:
        'Content 4.5: The PDF: "Accountancy" is "also offered as a single degree programme with a Minor in Digitalisation and Data Analytics", with the same requirements. Accountancy: "Mathematics at Standard Level, and A good grade in English at Standard Level"; some candidates may be invited for interviews. Stored before: both at SL 5. NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 37 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktshwhx00177m85rboj2qh4',
      status: 'current',
      name: 'Bachelor of Accountancy with Second Major in Entrepreneurship',
      description:
        'You can now choose to pursue a Second Major in Entrepreneurship (SMiE), offered by NTU Entrepreneurship Academy in collaboration with NBS.',
      field: 'Business & Economics',
      degree: 'Bachelor of Accountancy',
      duration: '3.5 years',
      minIBPoints: 37,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-accountancy-with-second-major-in-entrepreneurship',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-accountancy-with-second-major-in-entrepreneurship'
      ],
      notes:
        'Content 4.5: Accountancy: "Mathematics at Standard Level, and A good grade in English at Standard Level"; some candidates may be invited for interviews. Stored before: both at SL 5. Duration: the programme page gives "3.5 years, with direct honours" (it was stored as 4 years). NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 37 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktshwy0001h7m85fn0huueo',
      status: 'current',
      name: 'Bachelor of Applied Computing in Finance',
      description:
        'An interdisciplinary degree that blends deep domain knowledge in finance and strong technological and analytical skillsets through a unique mix of classroom learning and experiential training.',
      field: 'Computer Science',
      degree: 'Bachelor of Applied Computing',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-applied-computing-in-finance',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-applied-computing-in-finance'
      ],
      notes:
        'Content 4.5: "Mathematics at Higher Level, and A good grade in English at Standard Level". The stored Mandarin HL 5 (not critical) has no source and is removed; Maths was HL 6 and English SL 6. NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 38 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25. Degree stored as "Bachelor of Arts (Hons)".
    {
      id: 'cmktshxdy001r7m85gul68y09',
      status: 'current',
      name: 'Bachelor of Arts (Hons) in Chinese',
      description:
        'We provide a concrete foundation in both classical and modern Chinese literature, a deeper understanding of Chinese language, and a broader perspective on Modern China and the Chinese Diaspora in Southeast Asia.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-in-chinese',
      requirements: [
        { courses: ['MAN-LIT-A', 'MAN-LL', 'MAN-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-in-chinese'
      ],
      notes:
        'Content 4.5: "A good grade in Chinese at Standard Level"; selection test or interview. Chinese is stored as Mandarin A Literature, Mandarin A Language and Literature or Mandarin B. Stored before: Mandarin B or A Language and Literature at HL 5 and English A HL 5 (not critical); English is not required and is removed. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 34 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25. Degree stored as "Bachelor of Arts (Hons)".
    {
      id: 'cmktshzqf002z7m85p094ov09',
      status: 'current',
      name: 'Bachelor of Arts (Hons) in Double Major - Chinese and English',
      description:
        'During this four-year degree programme, undergraduates will read both English (ELH) and Chinese (CHIN), benefiting from the expertise and resources of the two disciplines from the School of Humanities (SoH).',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-double-major---chinese-and-english',
      requirements: [
        { courses: ['MAN-LIT-A', 'MAN-LL', 'MAN-B'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-double-major---chinese-and-english'
      ],
      notes:
        'Content 4.5: "A good grade in Chinese at Standard Level, and A good grade in English at Standard Level"; selection test or interview. Chinese is stored as Mandarin A Literature, Mandarin A Language and Literature or Mandarin B. NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. Stored before: both at HL 6. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 36 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25. Degree stored as "Bachelor of Arts (Hons)".
    {
      id: 'cmktsi06n00397m854b74ppti',
      status: 'current',
      name: 'Bachelor of Arts (Hons) in Double Major - Chinese and Linguistics',
      description:
        'During this four-year degree programme, undergraduates will read both Linguistics and Multilingual Studies (LMS) and Chinese (CHN), benefiting from the expertise and resources of both Programmes within the School of Humanities (SoH).',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-double-major---chinese-and-linguistics-and-multilingual-studies',
      requirements: [
        { courses: ['MAN-LIT-A', 'MAN-LL', 'MAN-B'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-double-major---chinese-and-linguistics-and-multilingual-studies'
      ],
      notes:
        'Content 4.5: The PDF groups it with Chinese and English: "A good grade in Chinese at Standard Level, and A good grade in English at Standard Level"; selection test or interview. Chinese is stored as Mandarin A Literature, Mandarin A Language and Literature or Mandarin B. NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. Stored before: Chinese HL 6 and Maths SL 5; Maths is not required and is removed, English is added. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 36 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25. Degree stored as "Bachelor of Arts (Hons)".
    {
      id: 'cmktsi0n9003j7m85mzp693m4',
      status: 'current',
      name: 'Bachelor of Arts (Hons) in Double Major - English and History',
      description:
        'During this four-year degree programme, undergraduates will read both English Literature (ELH) and History (HIST), benefiting from the expertise and resources of the two disciplines from the School of Humanities (SoH).',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-double-major---english-and-history',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-double-major---english-and-history'
      ],
      notes:
        'Content 4.5: "A good grade in English at Standard Level"; selection test or interview. NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. Stored before: English A HL 6. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 36 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25. Degree stored as "Bachelor of Arts (Hons)".
    {
      id: 'cmktsi10c003p7m85zjqmd253',
      status: 'current',
      name: 'Bachelor of Arts (Hons) in Double Major - English and Philosophy',
      description:
        'During this four-year degree programme, undergraduates will read both English Literature (ELH) and Philosophy (PHIL), benefiting from the expertise and resources of the two disciplines from the School of Humanities (SoH).',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-double-major---english-and-philosophy',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-double-major---english-and-philosophy'
      ],
      notes:
        'Content 4.5: "A good grade in English at Standard Level"; selection test or interview. NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. Stored before: English A HL 6. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 36 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25. Degree stored as "Bachelor of Arts (Hons)".
    {
      id: 'cmktsi2hl004h7m85pr1ykmir',
      status: 'current',
      name: 'Bachelor of Arts (Hons) in Double Major - Psychology and Linguistics',
      description:
        'The Double Major Programme is a four-year direct honours degree programme. Undergraduate students will read two majors chosen from among the disciplinary strengths of the four schools in the College.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-double-major---psychology-and-linguistics-multilingual-studies',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-double-major---psychology-and-linguistics-multilingual-studies'
      ],
      notes:
        'Content 4.5: "A good grade in Mathematics at Standard Level, and A good grade in English at Standard Level"; selection test or interview. NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. Stored before: Maths SL 5 and Mandarin HL 5 (not critical); Mandarin is not required and is removed, English is added. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 37 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25. Degree stored as "Bachelor of Arts (Hons)".
    {
      id: 'cmktshxr7001x7m85zgp38q2h',
      status: 'current',
      name: 'Bachelor of Arts (Hons) in English',
      description:
        'Our programme reflects a breadth of interests that is relevant both regionally and globally, and embraces many of the key areas that comprise contemporary literary studies.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-in-english',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-in-english'
      ],
      notes:
        'Content 4.5: "A good grade in English at Standard Level"; selection test or interview. NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. Stored before: English A HL 5. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 35 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25. Degree stored as "Bachelor of Arts (Hons)".
    {
      id: 'cmktshy4700237m85g8xme1nw',
      status: 'current',
      name: 'Bachelor of Arts (Hons) in History',
      description:
        'We seek to train students to not only think critically but also to apply interdisciplinary methods to identify and address contemporary problems from historical perspectives.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-in-history',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-in-history'
      ],
      notes:
        'Content 4.5: "A good grade in English at Standard Level", now critical. NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. Stored before: English A HL 5, not critical. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 34 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25. Degree stored as "Bachelor of Arts (Hons)".
    {
      id: 'cmktshyex00297m85ja5e3lbm',
      status: 'current',
      name: 'Bachelor of Arts (Hons) in Linguistics and Multilingual Studies',
      description:
        'As language is an integral part of all human activities, the study of linguistics provides a conducive platform for interdisciplinary discourse and research.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-linguistics-and-multilingual-studies',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-linguistics-and-multilingual-studies'
      ],
      notes:
        'Content 4.5: "A good grade in English at Standard Level". NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. Stored before: English A HL 5 and Maths SL 5; Maths is not required and is removed. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 34 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25. Degree stored as "Bachelor of Arts (Hons)".
    {
      id: 'cmktshyus002j7m85hy9867o3',
      status: 'current',
      name: 'Bachelor of Arts (Hons) in Philosophy',
      description:
        'As an academic discipline, philosophy is concerned with the study of fundamental problems, such as those about the nature of knowledge, reality, existence, mind, language, science, and morality.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 34,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-philosophy',
      requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-(hons)-in-philosophy'
      ],
      notes:
        'Content 4.5: "A good grade in English at Standard Level", now critical. NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. Stored before: English A HL 5, not critical. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 34 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25. Degree stored as "Bachelor of Arts (Education)".
    {
      id: 'cmktshz7u002p7m85b0wpealx',
      status: 'current',
      name: 'Bachelor of Arts in Art and Education',
      description:
        'The National Institute of Education (NIE) ensures that our undergraduates are equipped with high-quality skills, knowledge and values that will mould them into top-notch educators.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 33,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-in-art-and-education',
      requirements: [{ courses: ['VISUAL-ARTS'], level: 'HL', grade: 4, critical: false }],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-arts-in-art-and-education'
      ],
      notes:
        'Content 4.5: National Institute of Education, a Ministry of Education-sponsored programme; the award is the Bachelor of Arts (Hons) in Art and Education, 4 years. The PDF lists "Arts (Academic Discipline & Education)" with "A good overall International Baccalaureate Diploma score" and a selection test or interview; the programme page asks for "A pass at Higher level in Art (IB Diploma)", or "Higher level (IB Diploma) from any discipline with strong art portfolios", and a compulsory art-focused interview. Visual Arts HL is stored but not critical, because a portfolio can replace it. Applicants must also meet MOE requirements, and those taking the May 2027 IB examinations cannot apply to this programme. Stored before: English A HL 5 and Maths SL 5 (critical) and Mandarin HL 5, none of which a source gives. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 33 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktshv3e000d7m85jq1txu1p',
      status: 'current',
      name: 'Bachelor of Business',
      description:
        'Nanyang Business School’s Bachelor of Business (BBus) with Honours (Single Major) and Bachelor of Business (BBus) with Honours (Double Major) are two enhanced, four-year, full-time business programmes designed to equip future leaders with the skills to thrive in today’s dynamic, hyperconnected world.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business',
      duration: '4 years',
      minIBPoints: 36,
      programUrl: 'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-business',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-business'
      ],
      notes:
        'Content 4.5: Business (single or double major): "Mathematics at Standard Level, and A good grade in English at Standard Level". Duration: the programme page describes "two enhanced four-year business degrees" (it was stored as 3 years). NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. Stored before: both at SL 5. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 36 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi2u2004n7m85kcuy0c92',
      status: 'current',
      name: 'Bachelor of Chinese Medicine',
      description:
        'This four-year degree programme focuses on Chinese medicine as well as basic western medicine knowledge. This is a bilingual course with English and Mandarin as the media of instruction.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Chinese Medicine',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-chinese-medicine',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true },
        { courses: ['MAN-LIT-A', 'MAN-LL', 'MAN-B'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-chinese-medicine'
      ],
      notes:
        'Content 4.5: Now a single degree, "a full-time four-year Bachelor of Chinese Medicine (Honours) programme", marked NEW in the PDF (stored as 5 years). "Mathematics at Standard Level, and Physics/Chemistry/Biology at Higher Level, and Chinese at Standard Level"; selection test or interview. The programme page asks for "a good ... HL" science pass. Chinese is stored as Mandarin A Literature, Mandarin A Language and Literature or Mandarin B. Stored before: all three at HL 6. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 36 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi1dd003v7m8537q7ie3q',
      status: 'current',
      name: 'Bachelor of Communication Studies',
      description:
        'Ranked 1st in Asia and 4th in the World for Communication & Media Studies, the Wee Kim Wee School of Communication and Information (WKWSCI) offers a comprehensive and hands-on Communication Studies experience for aspiring media professionals.',
      field: 'Media',
      degree: 'Bachelor of Communication Studies',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-communication-studies',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-communication-studies'
      ],
      notes:
        'Content 4.5: "Mathematics at Standard Level, and A good grade in English at Standard Level", as on the programme page. NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. Stored before: both at SL 5. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 37 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi1tk00457m85rilh2htw',
      status: 'current',
      name: 'Bachelor of Communication Studies with Second Major in Business',
      description:
        'Combine communication skills with business knowledge. Gain hands-on experience for careers in PR, marketing, media, research, and corporate roles.',
      field: 'Media',
      degree: 'Bachelor of Communication Studies',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-communication-studies-with-second-major-in-business',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-communication-studies-with-second-major-in-business'
      ],
      notes:
        'Content 4.5: The PDF groups it with Communication Studies: "Mathematics at Standard Level, and A good grade in English at Standard Level". NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. Stored before: Maths SL 6 only. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 38 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi26n004b7m854kp7juxz',
      status: 'current',
      name: 'Bachelor of Communication Studies with Second Major in Governance and International Relations',
      description: 'Combine communication skills with governance and global affairs knowledge.',
      field: 'Media',
      degree: 'Bachelor of Communication Studies',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-communication-studies-with-second-major-in-governance-and-international-relations',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-communication-studies-with-second-major-in-governance-and-international-relations'
      ],
      notes:
        'Content 4.5: Renamed to the programme\'s full title, "... Second Major in Governance and International Relations". The PDF groups it with Communication Studies: "Mathematics at Standard Level, and A good grade in English at Standard Level". NTU does not say which IB English courses count; English A (Literature, or Language and Literature) is stored, as before. Stored before: Maths SL 6 only. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 38 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi9ce008t7m85790qm1v5',
      status: 'current',
      name: 'Bachelor of Computing (Hons) in Computer Science with a Second Major in Entrepreneurship',
      description:
        'Focuses on the theory, design, and application of computer software and systems.',
      field: 'Computer Science',
      degree: 'Bachelor of Computing',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-computing-(hons)-in-computer-science-with-a-second-major-in-entrepreneurship',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 },
            { course: 'PHYS', level: 'HL', grade: 4 },
            { course: 'CS', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-computing-(hons)-in-computer-science-with-a-second-major-in-entrepreneurship'
      ],
      notes:
        'Content 4.5: Computer Science: "Mathematics at Higher Level, or Physics/Computer Science at Higher Level", one critical group. Degree: the PDF marks it as leading to a Bachelor of Computing (stored as Bachelor of Engineering). Stored before: Maths HL 6 and one of Biology, Chemistry, Computer Science or Physics HL 6. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 39 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi9xj00977m85n9b9f2v2',
      status: 'current',
      name: 'Bachelor of Computing (Hons) in Data Science and Artificial Intelligence with a Second Major in Sustainability',
      description:
        'The Bachelor of Computing (Hons) in Data Science and Artificial Intelligence (DSAI) with a Second Major in Sustainability is an interdisciplinary programme at Nanyang Technological University (NTU). The DSAI component is jointly offered by the College of Computing and Data Science (CCDS) and the School of Physical and Mathematical Sciences (SPMS), while the Second Major in Sustainability is offered through the Asian School of the Environment (ASE). This powerful combination equips students with advanced skills in data analysis and AI development alongside a comprehensive understanding of global sustainability challenges.',
      field: 'Computer Science',
      degree: 'Bachelor of Computing',
      duration: '4 years',
      minIBPoints: 40,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-computing-(hons)-in-data-science-and-artificial-intelligence-with-a-second-major-in-sustainability',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-computing-(hons)-in-data-science-and-artificial-intelligence-with-a-second-major-in-sustainability'
      ],
      notes:
        'Content 4.5: "Mathematics at Higher Level". Degree: the PDF marks it as leading to a Bachelor of Computing (stored as Bachelor of Science). Stored before: Maths HL 6 and one of Biology, Chemistry or Physics HL 6, which is not required and is removed. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 40 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi4c1005l7m85z5co9sdc',
      status: 'current',
      name: 'Bioengineering',
      description:
        'Integrates engineering principles with biological sciences to develop new technologies and devices for healthcare.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-bioengineering',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-bioengineering'
      ],
      notes:
        'Content 4.5: Minimum subject requirements: "Mathematics at Higher Level, and Physics/Chemistry/Biology/Computer Science at Higher Level", both critical. Computer Science is added. Stored before: both at HL 5. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 36 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsiafm009j7m859r0vfwio',
      status: 'current',
      name: 'Biological Sciences',
      description: 'Provides a strong foundation in modern biology and its applications.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-biological-sciences',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-biological-sciences'
      ],
      notes:
        'Content 4.5: "Mathematics at Standard Level, and Physics/Chemistry/Biology at Higher Level"; interviews on a selective basis. Stored before: the science at HL 5 and Maths at SL 5. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 37 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi4tq005x7m85046ncng3',
      status: 'current',
      name: 'Chemical & Biomolecular Engineering',
      description:
        'Combines the principles of chemistry, biology, and engineering to solve problems in the production of chemicals, fuel, drugs, food, and many other products.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-chemical-and-biomolecular-engineering',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-chemical-and-biomolecular-engineering'
      ],
      notes:
        'Content 4.5: Minimum subject requirements: "Mathematics at Higher Level, and Physics/Chemistry/Biology/Computer Science at Higher Level", both critical. Computer Science is added. Stored before: both at HL 5. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 36 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsiaxq009v7m852i7pnyeg',
      status: 'current',
      name: 'Chemistry and Biological Chemistry',
      description: 'Focuses on the study of chemistry and its interface with biology.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-chemistry-and-biological-chemistry',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 4, critical: true },
        { courses: ['MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-chemistry-and-biological-chemistry'
      ],
      notes:
        'Content 4.5: "Chemistry at Higher Level, and Mathematics/Physics at Higher Level"; the programme page: "Pass in Chemistry and Mathematics/Physics at Higher Level". Stored before: Chemistry HL 5, Biology or Physics SL 5 and Maths SL 5; Biology is not required, and Maths or Physics is one group at HL. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 36 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi5eg00697m8596zsh6xv',
      status: 'current',
      name: 'Civil Engineering',
      description:
        'Focuses on the planning, design, construction, and maintenance of infrastructure such as buildings, bridges, and roads.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-civil-engineering',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-civil-engineering'
      ],
      notes:
        'Content 4.5: Minimum subject requirements: "Mathematics at Higher Level, and Physics/Chemistry/Biology/Computer Science at Higher Level", both critical. Computer Science is added. Stored before: both at HL 5. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 35 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi5wr006l7m85j269u9xl',
      status: 'current',
      name: 'Computer Engineering',
      description:
        'Integrates computer science and electronic engineering to develop computer systems and devices.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-computer-engineering',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-computer-engineering'
      ],
      notes:
        'Content 4.5: Minimum subject requirements: "Mathematics at Higher Level, and Physics/Chemistry/Biology/Computer Science at Higher Level", both critical. Stored before: both at HL 5. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 37 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi6gp006z7m85u2wctgn9',
      status: 'current',
      name: 'Electrical and Electronic Engineering',
      description:
        'Covers a wide range of topics including power systems, electronics, communications, and control systems.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-electrical-and-electronic-engineering-(eee)',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-electrical-and-electronic-engineering-(eee)',
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf'
      ],
      notes:
        "Content 3.4: the page moved to a new slug; same programme. Pass in HL Mathematics (AA or AI), a pass in HL Biology, Chemistry, Computer Science or Physics, and a pass in SL Physics for applicants without HL Physics. NTU publishes no IB points figure: its IB admission page says the IB sample is too small for an indicative grade profile. The stored 36 points predate this check and have no official source; they are kept, not re-verified (see the owner question in the 3.4 status). NTU asks for a pass in each prerequisite and names no grade; 4 is stored, replacing an unsourced 5. The programme page and the IB page name no entry year (the minimum subject requirements PDF is for the window closing 19 March 2026), so checked for 2026. Content 4.5: re-read on 30 September 2026; the programme page and NTU's IB PDF (still the 2026 window) are unchanged, so still checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsibhl00a77m856f3x9wh1',
      status: 'current',
      name: 'Environmental Earth Systems Science',
      description: 'An interdisciplinary program that studies the Earth as a complex system.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-environmental-earth-systems-science',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'ECON', 'PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-environmental-earth-systems-science'
      ],
      notes:
        'Content 4.5: "Mathematics at Standard Level, and Physics/Chemistry/Biology/Computer Science/Economics at Higher Level"; interviews on a selective basis. Computer Science is added. Stored before: both at HL 5, Maths too. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 36 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi70n007b7m85nsj5dfkc',
      status: 'current',
      name: 'Environmental Engineering',
      description:
        'Focuses on the application of engineering principles to improve and maintain the environment for the protection of human health and ecosystems.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-environmental-engineering',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-environmental-engineering'
      ],
      notes:
        'Content 4.5: Minimum subject requirements: "Mathematics at Higher Level, and Physics/Chemistry/Biology/Computer Science at Higher Level", both critical. Computer Science is added. Stored before: both at HL 5. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 35 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi7i8007n7m85x1yzg0z1',
      status: 'current',
      name: 'Information Engineering and Media',
      description:
        'A hybrid program that combines engineering technology with creative media design.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-information-engineering-and-media-iem',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-information-engineering-and-media-iem',
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf'
      ],
      notes:
        "Content 3.4: the page moved to a new slug; same programme. Pass in HL Mathematics (AA or AI), a pass in HL Biology, Chemistry, Computer Science or Physics, and a pass in SL Physics for applicants without HL Physics. NTU publishes no IB points figure: its IB admission page says the IB sample is too small for an indicative grade profile. The stored 36 points predate this check and have no official source; they are kept, not re-verified (see the owner question in the 3.4 status). NTU asks for a pass in each prerequisite and names no grade; 4 is stored, replacing an unsourced 5. The programme page and the IB page name no entry year (the minimum subject requirements PDF is for the window closing 19 March 2026), so checked for 2026. Content 4.5: re-read on 30 September 2026; the programme page and NTU's IB PDF (still the 2026 window) are unchanged, so still checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-25. Degree stored as "Bachelor of Science (Maritime Studies)".
    {
      id: 'cmktsi7zv007z7m85fkxm34yn',
      status: 'current',
      name: 'Maritime Studies',
      description: 'Focuses on the shipping, port, and maritime logistics industries.',
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-maritime-studies',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-maritime-studies'
      ],
      notes:
        'Content 4.5: "Mathematics at Standard Level", as on the programme page. Stored before: Maths SL 5 and Chemistry or Physics SL 5, which is not required and is removed. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 35 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi8g700897m85n5lf6ubb',
      status: 'current',
      name: 'Materials Engineering',
      description:
        'Focuses on the development and application of new materials for various industries.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-materials-engineering',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-materials-engineering'
      ],
      notes:
        'Content 4.5: "Mathematics at Higher Level, and Physics/Chemistry/Biology at Higher Level" (no Computer Science here). Biology is added. Stored before: Maths and Chemistry or Physics at HL 5. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 35 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsic1f00al7m85zplp81st',
      status: 'current',
      name: 'Mathematical Sciences',
      description: 'Provides rigorous training in mathematics and its applications.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 37,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-mathematical-sciences',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-mathematical-sciences'
      ],
      notes:
        'Content 4.5: "Mathematics at Higher Level"; the programme page: "Pass in Mathematics at Higher Level". Stored before: HL 5. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 37 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsi8w3008j7m8587iwagoz',
      status: 'current',
      name: 'Mechanical Engineering',
      description:
        'Covers the design, analysis, manufacturing, and maintenance of mechanical systems.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-mechanical-engineering',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'CHEM', 'CS', 'PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf',
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-engineering-in-mechanical-engineering'
      ],
      notes:
        'Content 4.5: Minimum subject requirements: "Mathematics at Higher Level, and Physics/Chemistry/Biology/Computer Science at Higher Level", both critical. Biology and Computer Science are added. Stored before: Maths and Chemistry or Physics at HL 5. NTU names no grade for a subject "at Higher Level" or "at Standard Level", nor for "a good grade"; 4, the IB pass, is stored, as 3.4 stored NTU\'s passes. "Mathematics" is Maths AA or AI ("both ... are acceptable"). NTU\'s IB admission page is for the 2027-28 intake (applications 15 October 2026 to 19 March 2027) and sends applicants to the programme\'s "minimum subject requirements for International Baccalaureate Diploma holders" in its linked PDF, which is still the one for the window 15 October 2025 to 19 March 2026 ("Information is correct as at February 2026"). The programme page names no year. Checked for 2026. Points: NTU publishes no IB points figure ("The sample size of students with IB Diploma holders is relatively small to derive a reflective grade profile and hence not provided"). The stored 36 predates this check and has no official source; it is kept, not re-verified (the 3.4 owner question).'
    },
    // Stored: checked for 2026 entry on 2026-01-25.
    {
      id: 'cmktsicec00ar7m85xzjc24n2',
      status: 'current',
      name: 'Physics / Applied Physics',
      description:
        'Covers the fundamental principles of physics and their applications in technology.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 36,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-physics-applied-physics',
      requirements: [
        { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
        { courses: ['PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-physics-applied-physics',
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf'
      ],
      notes:
        "Content 3.4: the page moved to a new slug and NTU names the programme Bachelor of Science in Physics / Applied Physics; same programme. Passes in Physics and Mathematics at HL. NTU publishes no IB points figure: its IB admission page says the IB sample is too small for an indicative grade profile. The stored 36 points predate this check and have no official source; they are kept, not re-verified (see the owner question in the 3.4 status). NTU asks for a pass in each prerequisite and names no grade; 4 is stored, replacing an unsourced 5. The programme page and the IB page name no entry year (the minimum subject requirements PDF is for the window closing 19 March 2026), so checked for 2026. Content 4.5: re-read on 30 September 2026; the programme page and NTU's IB PDF (still the 2026 window) are unchanged, so still checked for 2026."
    },
    // Stored: checked for 2026 entry on 2026-01-25. Degree stored as "Bachelor of Science (Stock Science and Management)".
    {
      id: 'cmktsi3hd00537m85xazxyxav',
      status: 'current',
      name: 'Sport Science and Management',
      description:
        'Focuses on the scientific principles of sport and exercise, as well as the management of sport organizations.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-sport-science-management',
      requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.ntu.edu.sg/education/undergraduate-programme/bachelor-of-science-in-sport-science-management',
        'https://www.ntu.edu.sg/admissions/undergraduate/admission-guide/international-baccalaureate-diploma',
        'https://www.ntu.edu.sg/media/docs/default-source/undergraduate-admissions/msr/emsr_ib.pdf'
      ],
      notes:
        "Content 3.4: the page moved to a new slug; same programme, Bachelor of Science (Honours) in Sport Science & Management, four years. Mathematics at SL; interviews on a selective basis. NTU publishes no IB points figure: its IB admission page says the IB sample is too small for an indicative grade profile. The stored 35 points predate this check and have no official source; they are kept, not re-verified (see the owner question in the 3.4 status). NTU names no grade for the Mathematics prerequisite; 4 is stored, replacing an unsourced 5. The programme page and the IB page name no entry year (the minimum subject requirements PDF is for the window closing 19 March 2026), so checked for 2026. Content 4.5: re-read on 30 September 2026; the programme page and NTU's IB PDF (still the 2026 window) are unchanged, so still checked for 2026."
    }
  ]
}

export default refresh
