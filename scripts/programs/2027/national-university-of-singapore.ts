import type { RefreshFile } from '../lib/refresh'

/**
 * National University of Singapore: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts national-university-of-singapore
 */
const refresh: RefreshFile = {
  university: 'National University of Singapore',
  entryYear: 2027,
  checkedOn: '2026-09-30',
  programs: [
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Arts (Honours)".
    {
      id: 'cmkfy1z4l002b7mrntlgfz5x1',
      status: 'current',
      name: 'Bachelor of Arts in Industrial Design',
      description:
        'Industrial Design focuses on creating products that are functional, aesthetically pleasing, and user-centered. Students learn design thinking, prototyping, materials, and manufacturing processes. The programme prepares graduates for careers in product design, user experience, and design consulting.',
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: 36,
      programUrl: 'https://cde.nus.edu.sg/did/undergraduate/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'PHYS', level: 'SL', grade: 4 },
            { course: 'ECON', level: 'SL', grade: 4 },
            { course: 'VISUAL-ARTS', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf'
      ],
      notes:
        'Content 4.5: "Pass in SL MAA or SL Physics or SL Economics or SL Visual Arts; or HL MAI", one critical group (it was not critical and had no Maths AI HL). Selection test or interview; must be ranked among the first three choices. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 36 predates this check and has no official source; it is kept, not re-verified (as for NTU). nus.edu.sg pages, the faculty sites included, answer scripts and WebFetch with an Incapsula challenge, so the programme page was not re-read; the prerequisites come from NUS\'s PDFs under /oam/docs/, which download.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfy1unr00017mrncanpbkjx',
      status: 'current',
      name: 'Bachelor of Business Administration',
      description:
        'The NUS Business School BBA programme is designed to develop students into business professionals who are able to take on leadership positions in the business world. The programme provides a rigorous education across the fundamentals of business and management, and allows students to specialize in areas such as finance, marketing, management, and entrepreneurship. Students graduate with strong analytical skills, global perspectives, and the ability to thrive in dynamic business environments.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 40,
      programUrl: 'https://bba.nus.edu.sg/academic-programmes/bba-programme/introduction/',
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
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf'
      ],
      notes:
        'Content 4.5: "Business Administration: Pass in HL MAA or SL MAA or HL MAI" (Maths AA at SL also covers HL). Stored before: Maths AA or AI HL 5, which took no SL. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 40 predates this check and has no official source; it is kept, not re-verified (as for NTU). nus.edu.sg pages, the faculty sites included, answer scripts and WebFetch with an Incapsula challenge, so the programme page was not re-read; the prerequisites come from NUS\'s PDFs under /oam/docs/, which download.'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Business Administration (Accountancy)".
    {
      id: 'cmkfy1v1i00077mrnl2wf39x2',
      status: 'current',
      name: 'Bachelor of Business Administration (Accountancy)',
      description:
        'The BBA (Accountancy) programme prepares students to become professionally qualified accountants. It combines a rigorous business education with specialized training in accounting principles, auditing, taxation, and financial reporting. The programme is designed to meet the requirements of professional accounting bodies and provides strong foundations for careers in public accounting, corporate finance, and consulting.',
      field: 'Business & Economics',
      degree: 'Bachelor of Business Administration',
      duration: '4 years',
      minIBPoints: 40,
      programUrl:
        'https://bba.nus.edu.sg/academic-programmes/bba-accountancy-programme/introduction/',
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
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf'
      ],
      notes:
        'Content 4.5: The IB list names only "Business Administration: Pass in HL MAA or SL MAA or HL MAI"; the BBA site gives Business Administration and Business Administration (Accountancy) the same requirements. Stored before: Maths AA or AI HL 5, which took no SL. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 40 predates this check and has no official source; it is kept, not re-verified (as for NTU). nus.edu.sg pages, the faculty sites included, answer scripts and WebFetch with an Incapsula challenge, so the programme page was not re-read; the prerequisites come from NUS\'s PDFs under /oam/docs/, which download.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfy1wqd00177mrngb69ni9q',
      status: 'current',
      name: 'Bachelor of Computing in Business Artificial Intelligence Systems',
      description:
        'Integrates AI technologies with business strategy: students learn AI and machine learning fundamentals, software and data engineering and AI management, to design, implement and manage AI systems that drive digital innovation. Specialisations in AI Governance and Management, Digital Product and Platform Management, and Financial Technology. Formerly the Bachelor of Computing in Information Systems.',
      field: 'Computer Science',
      degree: 'Bachelor of Computing',
      duration: '4 years',
      minIBPoints: 40,
      programUrl: 'https://www.comp.nus.edu.sg/programmes/ug/bais/',
      requirements: [
        {
          anyOf: [
            { course: 'CS', level: 'HL', grade: 4 },
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf',
        'https://www.comp.nus.edu.sg/programmes/ug/bais/'
      ],
      notes:
        'Content 4.5: Renamed to the programme its page describes: NUS offers no "BBA with Minor in Business Analytics & AI Systems" (neither IB prerequisite list names one), and the stored page is the School of Computing\'s "Bachelor of Computing in Business Artificial Intelligence Systems (with Honours)", "formerly known as Bachelor of Computing in Information Systems". Degree Bachelor of Computing, description rewritten from that page. "Business Artificial Intelligence Systems: Pass in HL Computer Science; OR Good pass in SL MAA or HL MAI", one critical group. Stored before: Maths AA or AI HL 5. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 40 predates this check and has no official source; it is kept, not re-verified (as for NTU).'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Computing (Honours)".
    {
      id: 'cmkfy1vp6000l7mrn3qvy8jxg',
      status: 'current',
      name: 'Bachelor of Computing in Artificial Intelligence',
      description:
        'The Artificial Intelligence programme focuses on the theory and practice of building intelligent systems. Students will learn machine learning, deep learning, natural language processing, computer vision, robotics, and knowledge representation. The programme prepares graduates for careers in AI research, data science, and the growing field of intelligent systems across industries.',
      field: 'Computer Science',
      degree: 'Bachelor of Computing',
      duration: '4 years',
      minIBPoints: 42,
      programUrl: 'https://www.comp.nus.edu.sg/programmes/ug/ai/',
      requirements: [
        {
          anyOf: [
            { course: 'CS', level: 'HL', grade: 4 },
            { course: 'PHYS', level: 'HL', grade: 4 },
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf',
        'https://www.comp.nus.edu.sg/programmes/ug/ai/'
      ],
      notes:
        'Content 4.5: Offered under the Common Computer Science Programmes: "Pass in HL Computer Science or HL MAA or HL Physics; OR Good pass in either SL MAA or HL MAI", one critical group (Maths AA at SL also covers HL). Stored before: Maths AA HL 6 and Computer Science or Physics HL 5. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 42 predates this check and has no official source; it is kept, not re-verified (as for NTU).'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Computing (Honours)".
    {
      id: 'cmkfy1wf300117mrnc1jf5l2i',
      status: 'current',
      name: 'Bachelor of Science in Business Analytics',
      description:
        'The Business Analytics programme trains students in the application of data science and analytical techniques to business problems. Students learn statistics, machine learning, optimization, and how to derive actionable insights from data. The programme bridges computing and business, preparing graduates for careers in data analytics, business intelligence, and consulting.',
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 40,
      programUrl: 'https://www.comp.nus.edu.sg/programmes/ug/ba/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf',
        'https://www.comp.nus.edu.sg/programmes/ug/ba/'
      ],
      notes:
        'Content 4.5: Renamed and re-degreed: the School of Computing awards the "Bachelor of Science in Business Analytics (with Honours)" (stored as a Bachelor of Computing). "Business Analytics: Pass in HL MAA". Stored before: Maths AA or AI HL 5. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 40 predates this check and has no official source; it is kept, not re-verified (as for NTU).'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Computing (Honours)".
    {
      id: 'cmkfy1vcj000d7mrnhsl2kh9g',
      status: 'current',
      name: 'Bachelor of Computing in Computer Science',
      description:
        'Computer Science is the study of the foundations of computation and computational thinking. It spans the theory of computation, algorithms, computer architecture, programming languages, software engineering, artificial intelligence, machine learning, computer graphics, databases, and networks. The programme prepares students with strong computational thinking skills and the ability to design and implement innovative computing solutions.',
      field: 'Computer Science',
      degree: 'Bachelor of Computing',
      duration: '4 years',
      minIBPoints: 42,
      programUrl: 'https://www.comp.nus.edu.sg/programmes/ug/cs/',
      requirements: [
        {
          anyOf: [
            { course: 'CS', level: 'HL', grade: 4 },
            { course: 'PHYS', level: 'HL', grade: 4 },
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf',
        'https://www.comp.nus.edu.sg/programmes/ug/cs/'
      ],
      notes:
        'Content 4.5: Common Computer Science Programmes: "Pass in HL Computer Science or HL MAA or HL Physics; OR Good pass in either SL MAA or HL MAI", one critical group (Maths AA at SL also covers HL). Stored before: Maths AA HL 6 and Computer Science or Physics HL 5. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 42 predates this check and has no official source; it is kept, not re-verified (as for NTU).'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Computing (Honours)".
    {
      id: 'cmkfy1w2r000t7mrn8tv0l4w6',
      status: 'current',
      name: 'Bachelor of Computing in Information Security',
      description:
        'The Information Security programme provides comprehensive education in cybersecurity, cryptography, network security, and secure software development. Students learn to protect systems, networks, and data from cyber threats. The programme prepares graduates for careers in cybersecurity, penetration testing, security consulting, and information security management.',
      field: 'Computer Science',
      degree: 'Bachelor of Computing',
      duration: '4 years',
      minIBPoints: 40,
      programUrl: 'https://www.comp.nus.edu.sg/programmes/ug/isc/',
      requirements: [
        {
          anyOf: [
            { course: 'CS', level: 'HL', grade: 4 },
            { course: 'PHYS', level: 'HL', grade: 4 },
            { course: 'MATH-AA', level: 'SL', grade: 4 },
            { course: 'MATH-AI', level: 'HL', grade: 4 }
          ],
          critical: true
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf',
        'https://www.comp.nus.edu.sg/programmes/ug/isc/'
      ],
      notes:
        'Content 4.5: "Information Security": "Pass in HL Computer Science or HL MAA or HL Physics; OR Good pass in either SL MAA or HL MAI", one critical group (Maths AA at SL also covers HL). Stored before: Maths AA HL 5 and Computer Science or Physics HL 5. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 40 predates this check and has no official source; it is kept, not re-verified (as for NTU).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfy1zip002l7mrnxenfldq9',
      status: 'current',
      name: 'Bachelor of Dental Surgery',
      description:
        'The Bachelor of Dental Surgery (BDS) programme trains students to become competent and compassionate dental professionals. Students learn oral health, clinical dentistry, and patient care. The programme includes extensive clinical training and prepares graduates for dental practice, research, and specialist training.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Dental Surgery',
      duration: '4 years',
      minIBPoints: 42,
      programUrl: 'https://www.dentistry.nus.edu.sg/ug/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf'
      ],
      notes:
        'Content 4.5: "Pass in HL Chemistry; and either HL Biology or HL Physics"; selection test or interview, and Dentistry must be ranked first or second. Stored before: Chemistry HL 6 and Biology or Physics HL 5. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 42 predates this check and has no official source; it is kept, not re-verified (as for NTU). nus.edu.sg pages, the faculty sites included, answer scripts and WebFetch with an Incapsula challenge, so the programme page was not re-read; the prerequisites come from NUS\'s PDFs under /oam/docs/, which download.'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Engineering (Honours)".
    {
      id: 'cmkfy1xc4001j7mrnbk23018u',
      status: 'current',
      name: 'Bachelor of Engineering in Biomedical Engineering',
      description:
        'Biomedical Engineering applies engineering principles to healthcare and medicine. Students learn about medical devices, biomechanics, biomaterials, tissue engineering, and medical imaging. The programme prepares graduates for careers in the medical technology industry, healthcare institutions, and biomedical research.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://cde.nus.edu.sg/bme/undergraduate/what-is-bme/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf'
      ],
      notes:
        'Content 4.5: NUS admits to Engineering in one pool with 11 majors; "Engineering: Pass in HL MAA" (Maths AA only). Stored before: Maths AA HL 5. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 38 predates this check and has no official source; it is kept, not re-verified (as for NTU). nus.edu.sg pages, the faculty sites included, answer scripts and WebFetch with an Incapsula challenge, so the programme page was not re-read; the prerequisites come from NUS\'s PDFs under /oam/docs/, which download.'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Engineering (Honours)".
    {
      id: 'cmkfy1xl7001n7mrnzkc52myh',
      status: 'current',
      name: 'Bachelor of Engineering in Chemical Engineering',
      description:
        'Chemical Engineering focuses on the design and operation of processes that transform raw materials into useful products. Students learn about chemical reactions, process systems, thermodynamics, and sustainable engineering. The programme prepares graduates for careers in petrochemical, pharmaceutical, food, and energy industries.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://cde.nus.edu.sg/chbe/undergraduate/beng-che/overview-of-the-bachelor-of-engineering-chemical-engineering-programme/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf'
      ],
      notes:
        'Content 4.5: NUS admits to Engineering in one pool with 11 majors; "Engineering: Pass in HL MAA" (Maths AA only). Stored before: Maths AA HL 5. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 38 predates this check and has no official source; it is kept, not re-verified (as for NTU). nus.edu.sg pages, the faculty sites included, answer scripts and WebFetch with an Incapsula challenge, so the programme page was not re-read; the prerequisites come from NUS\'s PDFs under /oam/docs/, which download.'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Engineering (Honours)".
    {
      id: 'cmkfy1xu9001r7mrnu31hv4nf',
      status: 'current',
      name: 'Bachelor of Engineering in Civil Engineering',
      description:
        'Civil Engineering deals with the design, construction, and maintenance of infrastructure including buildings, bridges, roads, and water systems. Students learn structural engineering, geotechnical engineering, transportation, and sustainable urban development. The programme prepares graduates for careers in construction, infrastructure development, and urban planning.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://cde.nus.edu.sg/cee/undergraduate/beng-civil/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf'
      ],
      notes:
        'Content 4.5: NUS admits to Engineering in one pool with 11 majors; "Engineering: Pass in HL MAA" (Maths AA only). Stored before: Maths AA HL 5. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 38 predates this check and has no official source; it is kept, not re-verified (as for NTU). nus.edu.sg pages, the faculty sites included, answer scripts and WebFetch with an Incapsula challenge, so the programme page was not re-read; the prerequisites come from NUS\'s PDFs under /oam/docs/, which download.'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Engineering (Honours)".
    {
      id: 'cmkfy1x1e001d7mrnnv8m31q5',
      status: 'current',
      name: 'Bachelor of Engineering in Computer Engineering',
      description:
        'Computer Engineering integrates electrical engineering and computer science to design and develop computer systems and embedded devices. Students learn hardware design, software development, computer architecture, and systems integration. The programme prepares graduates for careers in hardware engineering, embedded systems, IoT, and technology companies.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 40,
      programUrl: 'https://www.comp.nus.edu.sg/programmes/ug/ceg/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf',
        'https://www.comp.nus.edu.sg/programmes/ug/ceg/'
      ],
      notes:
        'Content 4.5: "Computer Engineering: Pass in HL MAA. Admitted students without HL Physics or an equivalent would be required to take a Physics bridging course", so Physics is no longer stored. Stored before: Maths AA HL 6 and Physics HL 5. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 40 predates this check and has no official source; it is kept, not re-verified (as for NTU).'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Engineering (Honours)".
    {
      id: 'cmkfy1y3d001v7mrnc6qw3kd9',
      status: 'current',
      name: 'Bachelor of Engineering in Electrical Engineering',
      description:
        'Electrical Engineering covers the study and application of electricity, electronics, and electromagnetism. Students learn about power systems, telecommunications, signal processing, and control systems. The programme prepares graduates for careers in electronics, telecommunications, power generation, and technology industries.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://cde.nus.edu.sg/ece/nus-ece-admissions/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf'
      ],
      notes:
        'Content 4.5: NUS admits to Engineering in one pool with 11 majors; "Engineering: Pass in HL MAA" (Maths AA only). Stored before: Maths AA HL 5. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 38 predates this check and has no official source; it is kept, not re-verified (as for NTU). nus.edu.sg pages, the faculty sites included, answer scripts and WebFetch with an Incapsula challenge, so the programme page was not re-read; the prerequisites come from NUS\'s PDFs under /oam/docs/, which download.'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Engineering (Honours)".
    {
      id: 'cmkfy1yck001z7mrnwejfdjmn',
      status: 'current',
      name: 'Bachelor of Engineering in Engineering Science',
      description:
        'Engineering Science is an interdisciplinary programme that provides a broad foundation across multiple engineering disciplines. Students gain exposure to mechanical, electrical, materials, and systems engineering, and can specialize in emerging areas. The programme prepares graduates for innovation-driven roles across industries.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://cde.nus.edu.sg/esp/undergraduate/b-eng-engineering-science/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf'
      ],
      notes:
        'Content 4.5: NUS admits to Engineering in one pool with 11 majors; "Engineering: Pass in HL MAA" (Maths AA only). Stored before: Maths AA HL 5. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 38 predates this check and has no official source; it is kept, not re-verified (as for NTU). nus.edu.sg pages, the faculty sites included, answer scripts and WebFetch with an Incapsula challenge, so the programme page was not re-read; the prerequisites come from NUS\'s PDFs under /oam/docs/, which download.'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Engineering (Honours)".
    {
      id: 'cmkfy1yls00237mrnp5gkes47',
      status: 'current',
      name: 'Bachelor of Engineering in Environmental and Sustainability Engineering',
      description:
        'Environmental Engineering applies engineering principles to protect and improve the environment. Students learn about water treatment, air quality, waste management, and sustainable development. The programme prepares graduates for careers in environmental consulting, sustainability, and public health.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://cde.nus.edu.sg/cee/undergraduate/beng-env/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf'
      ],
      notes:
        'Content 4.5: Renamed: the College of Design and Engineering lists the major as "Environmental and Sustainability Engineering (with effect from cohort AY2024/2025)" (read through the search index; the site is walled). NUS admits to Engineering in one pool with 11 majors; "Engineering: Pass in HL MAA" (Maths AA only). Stored before: Maths AA HL 5. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 38 predates this check and has no official source; it is kept, not re-verified (as for NTU). nus.edu.sg pages, the faculty sites included, answer scripts and WebFetch with an Incapsula challenge, so the programme page was not re-read; the prerequisites come from NUS\'s PDFs under /oam/docs/, which download.'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Engineering (Honours)".
    {
      id: 'cmkfy1yve00277mrng7w8ifme',
      status: 'current',
      name: 'Bachelor of Engineering in Industrial and Systems Engineering',
      description:
        'Industrial and Systems Engineering focuses on optimizing complex systems and processes. Students learn about operations research, supply chain management, quality engineering, and data analytics. The programme prepares graduates for careers in manufacturing, logistics, healthcare operations, and consulting.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 38,
      programUrl: 'https://cde.nus.edu.sg/isem/undergraduate/beng/overview/',
      requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf'
      ],
      notes:
        'Content 4.5: NUS admits to Engineering in one pool with 11 majors; "Engineering: Pass in HL MAA" (Maths AA only). Stored before: Maths AA HL 5. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 38 predates this check and has no official source; it is kept, not re-verified (as for NTU). nus.edu.sg pages, the faculty sites included, answer scripts and WebFetch with an Incapsula challenge, so the programme page was not re-read; the prerequisites come from NUS\'s PDFs under /oam/docs/, which download.'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfy20mx003d7mrnhzrii62c',
      status: 'current',
      name: 'Bachelor of Laws (LLB)',
      description:
        'The NUS Faculty of Law offers a prestigious law programme that prepares students for legal practice and careers in various sectors. Students learn legal reasoning, contract law, criminal law, constitutional law, and international law. The programme is recognized by the Singapore Bar and provides a strong foundation for both practice and further legal studies.',
      field: 'Law',
      degree: 'Bachelor of Laws',
      duration: '4 years',
      minIBPoints: 43,
      programUrl: 'https://law1a.nus.edu.sg/admissions/llb_prog.html',
      requirements: [
        {
          anyOf: [
            { course: 'ENG-LL', level: 'SL', grade: 5 },
            { course: 'ENG-LIT', level: 'SL', grade: 5 },
            { course: 'ENG-B', level: 'SL', grade: 5 },
            { course: 'LIT-PERF', level: 'SL', grade: 5 }
          ],
          critical: false
        }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf'
      ],
      notes:
        'Content 4.5: "At least a grading of 5 points in SL/HL English" (English A Language and Literature, English A Literature or English B) "OR SL Literature & Performance; OR SAT Critical Reading/Evidence-Based Reading and Writing score of 700 accompanied by a minimum grading of 4 points for SL English or SL Literature & Performance". Because the SAT route accepts 4, the group is not critical. Selection test or interview; Law must be ranked among the first three choices. The Faculty of Law\'s page offers its "2026 Undergraduate" brochure. Stored before: English A HL 5, critical. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 43 predates this check and has no official source; it is kept, not re-verified (as for NTU).'
    },
    // Stored: checked for 2026 entry on 2026-01-15.
    {
      id: 'cmkfy1zv2002t7mrnei0ui9hh',
      status: 'current',
      name: 'Bachelor of Medicine and Bachelor of Surgery (MBBS)',
      description:
        'The NUS Yong Loo Lin School of Medicine offers a rigorous medical education programme. Students learn the biomedical sciences, clinical skills, and patient care through integrated curriculum and extensive clinical rotations. The programme prepares graduates to become competent, ethical, and compassionate doctors.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Medicine and Bachelor of Surgery',
      duration: '5 years',
      minIBPoints: 44,
      programUrl: 'https://medicine.nus.edu.sg/prospective-students/programme-details/',
      requirements: [
        { courses: ['CHEM'], level: 'HL', grade: 4, critical: true },
        { courses: ['BIO', 'PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf'
      ],
      notes:
        'Content 4.5: "Pass in HL Chemistry; and either HL Biology or HL Physics"; a portfolio through the NUS Medicine Admissions Portal, the UCAT for applicants with predicted results, selection tests or interviews, and Medicine ranked first or second. Stored before: Chemistry HL 6 and Biology or Physics HL 6. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 44 predates this check and has no official source; it is kept, not re-verified (as for NTU). nus.edu.sg pages, the faculty sites included, answer scripts and WebFetch with an Incapsula challenge, so the programme page was not re-read; the prerequisites come from NUS\'s PDFs under /oam/docs/, which download.'
    },
    // Stored: checked for 2026 entry on 2026-01-15. Degree stored as "Bachelor of Science (Honours)".
    {
      id: 'cmkfy207f00317mrng7vc1gj2',
      status: 'current',
      name: 'Bachelor of Science (Nursing) Honours',
      description:
        'The Alice Lee Centre for Nursing Studies at the Yong Loo Lin School of Medicine offers the Bachelor of Science (Nursing) Honours programme. Build a strong foundation in nursing science and clinical excellence with this programme that employs a hybrid learning approach, seamlessly blending physical and online lessons. The curriculum develops higher-order thinking skills and empowers students to make informed, effective decisions in complex clinical settings. Students build a foundation for practice in Year 1, consolidate theory and practice in Year 2, prepare for transition to practice as a novice registered nurse in Year 3, and in the honours year focus on planning, implementing and evaluating care using evidence-based practice.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://medicine.nus.edu.sg/nursing/education-programmes/undergraduate/bachelor-of-science-nursing-honours/',
      requirements: [
        { courses: ['BIO', 'CHEM', 'CS', 'MATH-AA', 'PHYS'], level: 'HL', grade: 4, critical: true }
      ],
      checkedFor: 2026,
      sources: [
        'https://www.nus.edu.sg/oam/docs/default-source/default-document-library/ibdp-sp.pdf',
        'https://www.nus.edu.sg/oam/docs/default-source/international-baccalaureate/faqs-for-international-baccalaureate.pdf'
      ],
      notes:
        'Content 4.5: "Any two passes in HL Biology, HL Chemistry, HL Computer Science, HL MAA, or HL Physics"; the model holds one of the list, and "two of" is recorded here. Selection test or interview; Nursing must be ranked among the first three choices. Subjects unchanged. NUS asks for a "pass", "good pass" or "very good pass" without a number; 4, the IB pass, is stored for each, and a higher grade named only in words is a limit recorded here. NUS\'s IB prerequisites for single degree programmes say "Information accurate as of December 2025", and its IB FAQ is "Updated as of December 2025 for AY2026-2027 Admissions" (applications 17 December 2025 to 23 February 2026); nothing for the 2027-28 exercise is published yet. Checked for 2026. Points: NUS publishes no IB figure. Its IB FAQ: entry "is very competitive and applicants who gain admission typically attain very good scores"; its askadmissions answer (read through the search index; the site did not resolve) says the IB sample is too small for an indicative grade profile and admitted IB students "typically have a mix of mostly 6\'s and 7\'s". The stored 30 predates this check and has no official source; it is kept, not re-verified (as for NTU). nus.edu.sg pages, the faculty sites included, answer scripts and WebFetch with an Incapsula challenge, so the programme page was not re-read; the prerequisites come from NUS\'s PDFs under /oam/docs/, which download.'
    }
  ]
}

export default refresh
