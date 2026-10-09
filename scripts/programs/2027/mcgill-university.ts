import type { RefreshFile } from '../lib/refresh'

/**
 * McGill University: requirements for 2027 entry.
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
 * Dry run: npx tsx scripts/programs/refresh.ts mcgill-university
 */
const refresh: RefreshFile = {
  university: 'McGill University',
  entryYear: 2027,
  checkedOn: '2026-09-29',
  programs: [
    // Stored: not checked for any intake.
    {
      id: 'cmjzmxwck004d7met3e7bbzbs',
      status: 'current',
      name: 'Anthropology',
      description:
        'Anthropologists study the variety of human experiences past and present and ask how these experiences are shaped by different historical, cultural, and material practices. Across its sub-disciplines–from archeology to socio-cultural, legal, psychological, and medical anthropology–anthropology challenges our most tenacious assumptions and imagines alternatives about what it means to be human.\n\nSociocultural anthropologists undertake ethnographic research in such diverse places as cities, forests, internet forums, and submarines. In doing so, they develop deep qualitative understandings of human experiences by conducting interviews, making audio-visual recordings, and hanging out with people. Through these methods, they study local relationships (such as those between families, neighbours, ethnic and religious groups, and animals), large-scale relations (such as capitalism, ecology, and globalization), and the institutions that define and shape human lives (such as courts, hospitals, and international agencies).\n\nArchaeologists reconstruct the entirety of the human past, from ancient to contemporary, using the physical traces left behind from past activities. These material remains may include artifacts, architecture, the remains of plants, animals, and people, and oral histories and historical documents. Archaeologists work in teams and in collaboration with descendant communities in order to create reconstructions that have contemporary relevance.\n\nMcGill’s anthropology department is home to faculty who do research in ethnographic film, indigenous cosmologies, poetry, ecology, global mental health, economic exchange, Islamic law, gender and sexuality, addiction, therapeutic rituals, and death. They conduct research across the globe and through human history. All of these professors teach undergraduate courses in which they introduce students to anthropology and to their own areas of expertise. Students specializing in anthropology at McGill will learn about the diversity of human society and experience through space and time, and will develop the critical analytical and writing skills required to thoughtfully navigate our world.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 33 and 36 points from the six subjects (out of 42: the core points do not count), so 33 does not guarantee a place.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 33,
      programUrl: 'https://www.mcgill.ca/anthropology/undergraduate',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://www.mcgill.ca/anthropology/undergraduate',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: checked, none required. Anthropology is a Faculty of Arts program: "No specific prerequisites". Typical minimum range 33 to 36 subject points out of 42 (core excluded); the bottom, 33, is stored, as 3.4 did; it replaces the stored 34. Stored before: no subjects. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Science in Architecture".
    {
      id: 'cmjzl9cl0001r7mm9vqh7q1rx',
      status: 'current',
      name: 'Architecture',
      description:
        'Offered by: Architecture (Faculty of Engineering)   \nDegree: Bachelor of Science (Architecture)\nProgram credit weight: 126 credits\n\nProgram credit weight: 126 credits\n\nThe B.Sc.(Arch.) program provides conceptual, technical, and procedural foundations for the professional M.Arch. program, which is accredited by the Canadian Architectural Certification Board and recognized as accredited by the National Council of Architectural Registration Boards in the US. Students entering the B.Sc.(Arch.) program complete first-year courses in general studies (including sciences, humanities, and social sciences), for which individuals entering with the Québec Diploma of Collegial Studies in Arts and Science or Pure and Applied Science (or equivalent) are generally granted transfer credits. All students then complete six terms of immersion in architecture, centered in studio courses exploring principles of design, norms of representation, cultures of construction, and the human experience of architecture. Studio-based learning is complemented by lecture courses on foundational knowledge. Complementary courses provide further opportunities to learn about how culture intersects with technology in the work of architecture, and students select electives to customize their learning experience.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 39 and 42 points from the six subjects (out of 42: the core points do not count), with 6 to 7 in each maths and science subject, so 39 does not guarantee a place.',
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/architecture/architecture-bsc/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 6 }
          ],
          critical: true
        },
        { courses: ['PHYS'], level: 'SL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/architecture/architecture-bsc/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Architecture (B.Sc.(Arch.)). Prerequisites: Mathematics and Physics at HL or SL, with at least one math/science at HL; "Each math & science: 6 to 7", stored at 6, both critical. The stored Maths AA HL 7 and HL 7 in Biology, Chemistry, Computer Science or Physics had no source. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "at least one math/science at HL". Typical minimum range 39 to 42 subject points out of 42 (core excluded); the bottom, 39, is stored, as 3.4 did; it replaces the stored 41. Stored before: Maths AA HL 7 (critical); Biology or Chemistry or Computer Science or Physics HL 7. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Arts and Science".
    {
      id: 'cmjzmxujv003h7met71t7qd79',
      status: 'current',
      name: 'Arts and Science',
      description:
        "The Bachelor of Arts and Science (B.A. & Sc.) is a special and unique degree that is jointly offered by McGill's two largest faculties: the Faculty of Arts and the Faculty of Science. The overall objective is to provide a broad, liberal education spanning substantive areas in the two faculties so that students can learn diverse content and varied methods of inquiry.",
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts and Sciences',
      duration: '4 years',
      minIBPoints: 35,
      programUrl: 'https://coursecatalogue.mcgill.ca/en/undergraduate/arts-science/programs/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'BIO', level: 'HL', grade: 5 },
            { course: 'BIO', level: 'SL', grade: 6 },
            { course: 'CHEM', level: 'HL', grade: 5 },
            { course: 'CHEM', level: 'SL', grade: 6 },
            { course: 'PHYS', level: 'HL', grade: 5 },
            { course: 'PHYS', level: 'SL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts-science/programs/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Bachelor of Arts and Science (B.A. & Sc.), jointly offered by Arts and Science. Prerequisites: Mathematics and two of Biology, Chemistry or Physics at HL or SL, at least one math/science at HL; "Each math & science: 6 (5 to 6 if HL)", stored as 5 at HL or 6 at SL. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "two of": one critical group of the three is stored, which one subject satisfies. The model cannot hold "at least one math/science at HL". Typical minimum range 35 to 37 subject points out of 42 (core excluded); the bottom, 35, is stored, as 3.4 did; it replaces the stored 36. Stored before: Biology or Chemistry or Physics HL 6; Maths AA HL 6; Biology or Chemistry or Physics SL 6. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzmxwul004h7metvwrq9j8q',
      status: 'current',
      name: 'Biochemistry',
      description:
        'B.Sc. Liberal Program - 47 credits\nThis is the most flexible of the B.Sc. programs offered, providing students with a useful concentration in Biochemistry while allowing them to pursue a minor in another speciality or to broaden their education in the sciences.\n\nMajor Program - 64 credits\nThe Major program becomes more specialized in Biochemistry during the final two years, with a total of 67 science credits. This program requires skills and insight from all areas of chemistry, and from other areas such as biology, physiology, microbiology and immunology, statistics, and pharmacology.\n\nFor students aiming for a professional career in the biological sciences or in medicine, these programs can lead to post-graduate studies and research careers in hospital, university or industrial laboratories.\n\nHonours Program - 73 credits\nThe Honours program in Biochemistry combines the substantial background given by the Major program with a challenging opportunity to carry out laboratory research projects in the U3 year. These courses provide students with research experience under the supervision of a professor in the Department.\n\nHonours students intending to pursue an MSc in Biochemistry may be interested in the BSc/MSc Track, which offers a streamlined path to a graduate degree.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 36 and 39 points from the six subjects (out of 42: the core points do not count), with 6 in each maths and science subject (5 to 6 at HL), so 36 does not guarantee a place.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl: 'https://www.mcgill.ca/biochemistry/undergrad-studies/programs',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'BIO', level: 'HL', grade: 5 },
            { course: 'BIO', level: 'SL', grade: 6 },
            { course: 'CHEM', level: 'HL', grade: 5 },
            { course: 'CHEM', level: 'SL', grade: 6 },
            { course: 'PHYS', level: 'HL', grade: 5 },
            { course: 'PHYS', level: 'SL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://www.mcgill.ca/biochemistry/undergrad-studies/programs',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Biochemistry is in McGill\'s Biological, Biomedical and Life Sciences Group (Faculty of Science). Prerequisites: Mathematics and two of Biology, Chemistry or Physics at HL or SL, at least one math/science at HL; "Each math & science: 6 (5 to 6 if HL)", stored as 5 at HL or 6 at SL. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "two of": one critical group of the three is stored, which one subject satisfies. The model cannot hold "at least one math/science at HL". Typical minimum range 36 to 39 subject points out of 42 (core excluded); the bottom, 36, is stored, as 3.4 did; it replaces the stored 37. Stored before: Biology HL 6; Chemistry HL 6; Maths AA HL 6. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9c6q001h7mm9ejr3kz63',
      status: 'current',
      name: 'Bioengineering',
      description:
        'Offered by: Bioengineering (Faculty of Engineering)    \nDegree: Bachelor of Engineering\nProgram credit weight: 142-143 credits\n\nThe B.Eng.; Major in Bioengineering will\n\n1.\tprovide students with the ability to apply systematic knowledge of biology, physical sciences and mathematics; and sound engineering foundations in order to solve problems of a biological nature; and\n\n2.\tprepare students for the broad area of bioengineering, incorporating both biology-focused biological engineering and medicine-focused biomedical engineering.\n\nStudents will acquire fundamental knowledge in bioengineering-related natural sciences and mathematics, as well as in the foundations of general engineering and bioengineering. Students will also acquire knowledge in one area of specialization of bioengineering:\n\n1.\tbiological materials and biomechanics;\n2.\tbiomolecular and cellular engineering; or\n3.\tbiological information and computation',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 39,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/bioengineering/bioengineering-beng/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 6 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/bioengineering/bioengineering-beng/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Bioengineering: Faculty of Engineering. Prerequisites: Mathematics, Chemistry and Physics at HL or SL (at least one math/science at HL); "Each math & science: 6", all critical. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "at least one math/science at HL". Typical minimum range 39 to 41 subject points out of 42 (core excluded); the bottom, 39, is stored, as 3.4 did; it replaces the stored 40. Stored before: Maths AA HL 6 (critical); Biology HL 6; Chemistry HL 6; Physics HL 6. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9dtg00297mm9zvme6j2c',
      status: 'current',
      name: 'Biology',
      description:
        'Offered by: Biology (Faculty of Science)\nDegree: Bachelor of Science; Bachelor of Arts and Science\nProgram credit weight: 59\n\nThe Biology Major covers a range of fundamental biological concepts spanning molecules and cells to organisms and ecosystems, including development, behavior and evolution. The areas of focus include:\n\n1. molecular, cellular and developmental biology,\n2. conservation, ecology and evolution, and\n3. neurobiology and behavior.\n\nThis program is offered as part of a Bachelor of Science (B.Sc.) degree.\n\nTo graduate, students must satisfy both their program requirements and their degree requirements.\n\nThe program requirements (i.e., the specific courses that make up this program) are listed under the Course Tab (above).\nThe degree requirements—including the mandatory Foundation program, appropriate degree structure, and any additional components—are outlined on the Degree Requirements page.\nStudents are responsible for ensuring that this program fits within the overall structure of their degree and that all degree requirements are met. Consult the Degree Planning Guide on the SOUSA website for additional guidance.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 36 and 39 points from the six subjects (out of 42: the core points do not count), with 6 in each maths and science subject (5 to 6 at HL), so 36 does not guarantee a place.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 36,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/biology/biology-major-bsc/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'BIO', level: 'HL', grade: 5 },
            { course: 'BIO', level: 'SL', grade: 6 },
            { course: 'CHEM', level: 'HL', grade: 5 },
            { course: 'CHEM', level: 'SL', grade: 6 },
            { course: 'PHYS', level: 'HL', grade: 5 },
            { course: 'PHYS', level: 'SL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/biology/biology-major-bsc/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Biology is in McGill\'s Biological, Biomedical and Life Sciences Group (Faculty of Science). Prerequisites: Mathematics and two of Biology, Chemistry or Physics at HL or SL, at least one math/science at HL; "Each math & science: 6 (5 to 6 if HL)", stored as 5 at HL or 6 at SL. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "two of": one critical group of the three is stored, which one subject satisfies. The model cannot hold "at least one math/science at HL". Typical minimum range 36 to 39 subject points out of 42 (core excluded); the bottom, 36, is stored, as 3.4 did; it replaces the stored 37. Stored before: Biology or Chemistry HL 6; Maths AA HL 6; Biology or Chemistry or Physics SL 6. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzmxrma001r7metbg8axp72',
      status: 'current',
      name: 'Bioresource Engineering',
      description:
        'Offered by: Bioresource Engineering (Faculty of Agricultural and Environmental Sciences)  \nDegree: Bachelor of Engineering (Bioresource)\nProgram credit weight: 113\n\nProgram Description\nThe B.Eng.(Bioresource); Major in Bioresource Engineering program focuses on biological, agricultural, food, environmental areas, and applying professional engineering skills to biological systems. The design and implementation of technology for the creation of bio-based products, including food, fiber, fuel, and biomaterials, while sustaining a healthful environment. Graduates of this program are eligible for registration as professional engineers in any province across Canada, as well as in some international jurisdictions.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 28,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/agri-env-sci/programs/bioresource-engineering/bioresource-engineering-major-beng/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/agri-env-sci/programs/bioresource-engineering/bioresource-engineering-major-beng/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Bioresource Engineering (B.Eng.(Bioresource)) is admitted with the Faculty of Agricultural and Environmental Sciences (Macdonald campus), whose range and prerequisites it shares. Prerequisites: Mathematics and two of Biology, Chemistry or Physics, at HL or SL; each math and science 5. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "two of": one critical group of the three is stored, which one subject satisfies. Typical minimum range 28 to 30 subject points out of 42 (core excluded); the bottom, 28, is stored, as 3.4 did; it replaces the stored 30. Stored before: Biology or Chemistry or Physics SL 5; Biology or Chemistry or Physics SL 5; Maths AA SL 5. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9buj00197mm9vrv9a3dt',
      status: 'current',
      name: 'Chemical Engineering',
      description:
        'Offered by: Chemical Engineering (Faculty of Engineering)   \nDegree: Bachelor of Engineering\nProgram credit weight: 143 credits\n\nThe discipline of chemical engineering is distinctive in being based equally on physics, mathematics, and chemistry. Application of these three fundamental sciences is basic to a quantitative understanding of the process industries. Those with an interest in the fourth fundamental science, biology, will find several courses in the chemical engineering curriculum that integrate aspects of the biological sciences relevant to process industries such as food processing, fermentation, biomedical, and water pollution control. Courses on the technical operations and economics of the process industries are added to this foundation. The core curriculum concludes with process design courses taught by practising design engineers. Problem-solving, experimenting, planning, and communication skills are emphasized in courses throughout the core curriculum.\n\nCertain students who take advantage of Summer session courses can complete the departmental program in three calendar years.\n\nIn some cases, students from university science disciplines have sufficient credits to complete the requirements for the B.Eng. (Chemical) program in two and a half years. Those concerned should discuss this with their adviser.\n\nStudents must obtain a grade of C or better in all core courses. For the Department of Chemical Engineering, core courses include all required courses (departmental and non-departmental) as well as technical complementary courses.\n\nNote to CEGEP Students\nIf you have successfully completed a course at CEGEP that is equivalent to CHEM 212 Introductory Organic Chemistry 1. or CHEM 234 Topics in Organic Chemistry., you may obtain transfer credits for either or both courses by passing the McGill Science Placement Exam for the course(s). You must complete an application form available on the Science Placement Exam website and an application fee will be charged to your student account. Science placement exams take place in August and September before classes begin. If you pass the exam(s), transfer credits for the course(s) will be reflected on your transcript and your program credit requirements will be decreased to reflect these transfer credits. For information on Science Placement Exams, including application deadlines, the application form, application fee, dates, times, and location of the exams, see www.mcgill.ca/exams/dates/science. If you do not pass the placement exams, you must register for CHEM 212 Introductory Organic Chemistry 1. and CHEM 234 Topics in Organic Chemistry. during your studies at McGill as outlined in your program requirements.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 35 and 38 points from the six subjects (out of 42: the core points do not count), with 5 to 6 in each maths and science subject (6 in each at SL), so 35 does not guarantee a place.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/chemical-engineering/chemical-engineering-beng/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'CHEM', level: 'HL', grade: 5 },
            { course: 'CHEM', level: 'SL', grade: 6 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'PHYS', level: 'HL', grade: 5 },
            { course: 'PHYS', level: 'SL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/chemical-engineering/chemical-engineering-beng/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Chemical Engineering: Faculty of Engineering. Prerequisites: Mathematics, Chemistry and Physics at HL or SL (at least one math/science at HL); "Each math & science: 5 to 6 (6 in each SL math & science)", stored as 5 at HL or 6 at SL, all critical. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "at least one math/science at HL". Typical minimum range 35 to 38 subject points out of 42 (core excluded); the bottom, 35, is stored, as 3.4 did; it replaces the stored 37. Stored before: Maths AA HL 6 (critical); Chemistry HL 6; Physics SL 5. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9eao002n7mm9hhwj80mc',
      status: 'current',
      name: 'Chemistry',
      description:
        'Offered by: Chemistry (Faculty of Science)\nDegree: Bachelor of Science; Bachelor of Arts and Science\nProgram credit weight: 59\n\nDegree Requirements — B.Sc.\nThis program is offered as part of a Bachelor of Science (B.Sc.) degree.\n\nTo graduate, students must satisfy both their program requirements and their degree requirements.\n\nThe program requirements (i.e., the specific courses that make up this program) are listed under the Course Tab (above).\nThe degree requirements—including the mandatory Foundation program, appropriate degree structure, and any additional components—are outlined on the Degree Requirements page.\nStudents are responsible for ensuring that this program fits within the overall structure of their degree and that all degree requirements are met. Consult the Degree Planning Guide on the SOUSA website for additional guidance.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 35 and 38 points from the six subjects (out of 42: the core points do not count), with 5 to 6 in each maths and science subject and at least one 6 (6 in Maths AA at SL), so 35 does not guarantee a place.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/chemistry/chemistry-major-bsc/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/chemistry/chemistry-major-bsc/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Chemistry is in McGill\'s Physical, Environmental, Math and Computer Sciences Group (Faculty of Science). Prerequisites: Mathematics and two of Biology, Chemistry or Physics at HL or SL, at least one math/science at HL; "Each math & science: 5 to 6 (and at least one 6); 6 if SL Math AA". McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "two of": one critical group of the three is stored, which one subject satisfies. The model cannot hold "at least one math/science at HL". Nor can it hold "at least one 6". Typical minimum range 35 to 38 subject points out of 42 (core excluded); the bottom, 35, is stored, as 3.4 did; it replaces the stored 37. Stored before: Chemistry HL 6; Maths AA HL 6; Biology or Physics SL 6. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9bi000117mm9dyfywdy7',
      status: 'current',
      name: 'Civil Engineering',
      description:
        'Offered by: Civil Engineering (Faculty of Engineering)    \nDegree: Bachelor of Engineering\nProgram credit weight: 139 credits\n\nThe Civil Engineering program is comprehensive in providing the fundamentals in mechanics and engineering associated with the diverse fields of the profession, in offering choices of specialization, and in fully reflecting the advances in science, mathematics, engineering, and computing that have transformed all fields of engineering in recent years. The resulting knowledge and training enables graduates to not only enter the profession thoroughly well prepared, but also to adapt to further change.\n\nThe required courses ensure a sound scientific and analytical basis for professional studies through courses in solid mechanics, fluid mechanics, soil mechanics, environmental engineering, water resources management, structural analysis, systems analysis, and mathematics. Fundamental concepts are applied to various fields of practice in both required and complementary courses.\n\nBy a suitable choice of complementary courses, students can attain advanced levels of technical knowledge in the specialized areas mentioned above. Alternatively, students may choose to develop their interests in a more general way by combining complementary courses within the Department with several from other departments or faculties.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 35 and 38 points from the six subjects (out of 42: the core points do not count), with 5 to 6 in each maths and science subject (6 in each at SL), so 35 does not guarantee a place.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/civil-engineering/civil-engineering-beng/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'CHEM', level: 'HL', grade: 5 },
            { course: 'CHEM', level: 'SL', grade: 6 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'PHYS', level: 'HL', grade: 5 },
            { course: 'PHYS', level: 'SL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/civil-engineering/civil-engineering-beng/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Civil Engineering: Faculty of Engineering. Prerequisites: Mathematics, Chemistry and Physics at HL or SL (at least one math/science at HL); "Each math & science: 5 to 6 (6 in each SL math & science)", stored as 5 at HL or 6 at SL, all critical. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "at least one math/science at HL". Typical minimum range 35 to 38 subject points out of 42 (core excluded); the bottom, 35, is stored, as 3.4 did; it replaces the stored 37. Stored before: Maths AA HL 6 (critical); Physics HL 5; Chemistry SL 5. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9cw2001x7mm9bn26qgui',
      status: 'current',
      name: 'Commerce',
      description:
        'BCom Programs Offered\nThe Desautels Faculty of Management offers several programs leading to a B.Com. degree, which fall within the following categories:\n\nBCom Programs\nFoundation Program Course Distribution\nConcentrations (General Management Major)\nMajors\nHonours\nMinors for Management Students\nMinor for Non-Management Students\nThe following information outlines the credit structure for each BCom program type:\n\nBCom Program Credit Structures and Course Distributions\nFoundation Program Course Distribution\nManagement Core\nBCom Program Credit Structure: General Management Program (Concentrations)\nBCom Program Credit Structure: Major or Honours Programs\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 35 and 38 points from the six subjects (out of 42: the core points do not count), with 5 in Maths at HL or 6 in Maths AA at SL, so 35 does not guarantee a place.',
      field: 'Business & Economics',
      degree: 'Bachelor of Commerce',
      duration: '3 years',
      minIBPoints: 35,
      programUrl: 'https://coursecatalogue.mcgill.ca/en/undergraduate/management/programs/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/management/programs/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Desautels Faculty of Management (B.Com.). Prerequisite: "Higher Level Mathematics (AA or AI), or Standard Level Mathematics AA with a predicted/final result of 6 or 7"; "Math: 5 (HL Math AA/AI); 6 (SL Math AA)". SL Maths AI is not accepted. Stored as one critical group. Typical minimum range 35 to 38 subject points out of 42 (core excluded); the bottom, 35, is stored, as 3.4 did; it replaces the stored 37. Stored before: Maths AA or Maths AI HL 5 (critical). McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9agh000d7mm985cvdqht',
      status: 'current',
      name: 'Computer Engineering',
      description:
        'Offered by: Electrical & Computer Engr (Faculty of Engineering)   \nDegree: Bachelor of Engineering\nProgram credit weight: 133 credits\n\nThe Computer Engineering program provides students with greater depth and breadth of knowledge in the hardware and software aspects of computers. Students are exposed to both theoretical and practical issues of both hardware and software in well-equipped laboratories. Although the program is designed to meet the growing demands by industry for engineers with a strong background in modern computer technology, it also provides the underlying depth for graduate studies in all fields of Computer Engineering.\n\nIn addition to technical complementary courses, students in the program take general complementary courses in social sciences, management studies, and humanities. These courses allow students to develop specific interests in areas such as psychology, economics, management, or political science.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 35 and 38 points from the six subjects (out of 42: the core points do not count), with 5 to 6 in each maths and science subject (6 in each at SL), so 35 does not guarantee a place.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/electrical-computer-engineering/computer-engineering-beng/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'CHEM', level: 'HL', grade: 5 },
            { course: 'CHEM', level: 'SL', grade: 6 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'PHYS', level: 'HL', grade: 5 },
            { course: 'PHYS', level: 'SL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/electrical-computer-engineering/computer-engineering-beng/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Computer Engineering: Faculty of Engineering. Prerequisites: Mathematics, Chemistry and Physics at HL or SL (at least one math/science at HL); "Each math & science: 5 to 6 (6 in each SL math & science)", stored as 5 at HL or 6 at SL, all critical. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "at least one math/science at HL". Typical minimum range 35 to 38 subject points out of 42 (core excluded); the bottom, 35, is stored, as 3.4 did; it replaces the stored 37. Stored before: Maths AA SL 6 (critical); Chemistry or Physics SL 6. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl99u000017mm93g75ely3',
      status: 'current',
      name: 'Computer Science',
      description:
        'Offered by: Computer Science (Faculty of Science)\nDegree: Bachelor of Science\nProgram credit weight: 63\n\nThis program is the standard Major program offered by the School of Computer Science. It provides a broad introduction to the principles of computer science and offers ample opportunity to acquire in-depth knowledge of several sub-disciplines. At the same time, its credit requirements allow students to take an additional minor.\n\nStudents may complete this program with a minimum of 60 credits or a maximum of 63 credits depending if they are exempt from taking COMP 202 Foundations of Programming..\n\nDegree Requirements — B.Sc.\nThis program is offered as part of a Bachelor of Science (B.Sc.) degree.\n\nTo graduate, students must satisfy both their program requirements and their degree requirements.\n\nThe program requirements (i.e., the specific courses that make up this program) are listed under the Course Tab (above).\nThe degree requirements—including the mandatory Foundation program, appropriate degree structure, and any additional components—are outlined on the Degree Requirements page.\nStudents are responsible for ensuring that this program fits within the overall structure of their degree and that all degree requirements are met. Consult the Degree Planning Guide on the SOUSA website for additional guidance.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 35 and 38 points from the six subjects (out of 42: the core points do not count), with 5 to 6 in each maths and science subject and at least one 6 (6 in Maths AA at SL), so 35 does not guarantee a place.',
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/computer-science/computer-science-major-bsc/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/computer-science/computer-science-major-bsc/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Computer Science is in McGill\'s Physical, Environmental, Math and Computer Sciences Group (Faculty of Science). Prerequisites: Mathematics and two of Biology, Chemistry or Physics at HL or SL, at least one math/science at HL; "Each math & science: 5 to 6 (and at least one 6); 6 if SL Math AA". McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "two of": one critical group of the three is stored, which one subject satisfies. The model cannot hold "at least one math/science at HL". Nor can it hold "at least one 6". Typical minimum range 35 to 38 subject points out of 42 (core excluded); the bottom, 35, is stored, as 3.4 did; it replaces the stored 36. Stored before: Maths AA HL 6 (critical); Biology or Chemistry or Physics SL 5. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzmxtpo002z7met31f2muwc',
      status: 'current',
      name: 'Dietetics and Human Nutrition',
      description:
        'MAJOR IN DIETETICS\nThree and a Half Year Program (excluding freshman year)\n\nThe 3.5 year (115 credits) Dietetics Major leads to eligibility for registration as a professional Dietitian/Nutritionist. The program includes 40 weeks of internship (Professional Practice – Stage) which is integrated into each year of study. The program is accredited by Dietitians of Canada. Students are exposed to a variety of practice settings including clinical nutrition, community nutrition and food service. \n\nRequired Courses: 109 credits including 32 stage credits\nComplementary Courses: 3 credits\nElective Courses: 3 credits\n(Total 115 Credits)\n\nAdmission Requirements: Refer to the Admissions Guide. Use the search tool or contact the Student Affairs Office or 514-398-7925 for specific information.\n\nFor more information on the Major in Dietetics, you may contact Sandy Phillips with questions.\n\nStudents in the Nutrition Major with questions about their program or transferring to another program should contact their Student Advisor.\n\nMAJOR IN NUTRITION\nThree Year Program (excluding freshman year)\n\nThe BSc (NutrSc) Nutrition Major is a 90-credit undergraduate science degree. At its core, it deals with how diet and nutrition affect human health and disease risk. It offers exciting opportunities to specialize in one of 4 concentrations, to incorporate research experience, travel for field studies, or a Minor in your program. It is excellent preparation for many careers including medical school, veterinary school and other professional schools, for graduate school, or for work in the food, pharma or other industry, government or NGO, or global health organizations. This Major does not lead to professional licensure as a Dietitian/Nutritionist. The 3-year Nutrition Major offers four specializations:\n\nFood Function and Safety\nGlobal Nutrition\nSports Nutrition\nMetabolism, Health and Disease\nRequired Courses: 63 credits\nComplementary Courses: 12 credits\nElective Courses: 15 credits\n(Total 90 Credits)\n\nAdmission Requirements: Refer to the Admissions Guide. Use the search tool or contact the Student Affairs Office or 514-398-7925 for specific information.\n\nFor more information on the Nutrition Major, you may contact Christine Gurekian with questions.\n\nStudents in the Nutrition Major with questions about their program or transferring to another program should contact their Student Advisor.\n\nBSc IN FOOD SCIENCE/BSc IN NUTRITIONAL SCIENCES\nTwo Complementary Fields, One Program\n\nEarn two concurrent BSc degrees: one in Food Science and one in Nutritional Sciences\n\nFour Year program (excluding freshman year)\n\nPlenty of Great Employment Opportunities\n\nMcGill University has taken the innovative lead in combining both majors. Unique in North America, the new concurrent degree program in Food Science and Nutritional Science offers the best education in these complementary fields and opens the door to a multitude of career paths.\n\nThe Food Science component of the program focuses on the chemistry of food and the scientific principles underlying food preservation, processing and packaging to provide consumers with quality foods. The Nutritional Science component deals with the science of the nutritional aspects of food and metabolism.\n\nThe program has been carefully structured to ensure that students receive the training that Industry demands. A 3-month stage in industry is included in the final term of the program. The stage can be either in the food or nutrition sector according to each student’s individual interests.\n\nRequired Courses: 80 credits\nComplementary Courses: 30 credits\nElective Courses: 12 credits\n\nAdmission Requirements: Refer to the Admissions Guide. Use the search tool or contact the Student Affairs Office or 514-398-7925 for specific information.\n\nFor more information on the Concurrent Degree, you may contact Dr Stan Kubow with questions.\n\nStudents in the Concurrent Degree with questions about their program or transferring to another program should contact their Student Advisor.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 28,
      programUrl: 'https://www.mcgill.ca/nutrition/programs/undergraduate',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://www.mcgill.ca/nutrition/programs/undergraduate',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: School of Human Nutrition (Macdonald campus). Prerequisites: Mathematics and two of Biology, Chemistry or Physics, at HL or SL; each math and science 5. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "two of": one critical group of the three is stored, which one subject satisfies. Typical minimum range 28 to 30 subject points out of 42 (core excluded); the bottom, 28, is stored, as 3.4 did; it replaces the stored 30. Stored before: Biology or Chemistry SL 5; Biology or Chemistry or Physics SL 5; Maths AA or Maths AI SL 5. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9d5500217mm9cjznt8uc',
      status: 'current',
      name: 'Economics',
      description:
        "Available Programs\nEconomics / Accounting Joint Honours Component (B.A.) (60 credits)\nEconomics / Finance Joint Honours Component (B.A.) (60 credits)\nEconomics Honours (B.A.) (42 credits)\nEconomics Joint Honours Component (B.A.) (30 credits)\nEconomics Major Concentration (B.A.) (36 credits)\nEconomics Minor Concentration (B.A.) (18 credits)\nStanding in Honours and Joint Honours Programs\nNormally, to be awarded an Honours degree, a student must obtain a 3.00 program GPA in the required and complementary credits in Economics, and a CGPA of 3.00. For a First-Class Honours degree, the minimum requirements are normally a 3.50 program GPA in the required and complementary credits in Economics, and a CGPA of 3.50. For additional requirements for the B.Com. Honours in Economics, Joint Honours in Economics and Finance, and Joint Honours in Economics and Accounting, consult the Desautels Faculty of Management section of this publication for their program grade and GPA requirements. In particular, these programs also require a minimum grade of B- in all Management courses.\n\nEconomics (ECON) Related Program\nMinor in Management\nEconomics students can also pursue the minor offered by the Desautels Faculty of Management for non-Management students. For detailed information on program requirements and application procedures, see the section on Minor for Non-Management Students on the Desautels Faculty of Management's website.\n\nFor details on this 18-credit program, see the Desautels Faculty of Management's section of this publication about the Minor Management (For Non-Management Students) (18 credits).\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 33 and 36 points from the six subjects (out of 42: the core points do not count), so 33 does not guarantee a place.",
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 33,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/economics/#programstext',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/economics/#programstext',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: checked, none required. Economics (B.A.) is a Faculty of Arts program: "No specific prerequisites". The stored Maths AA SL 5 had no source. Typical minimum range 33 to 36 subject points out of 42 (core excluded); the bottom, 33, is stored, as 3.4 did; it replaces the stored 34. Stored before: Maths AA SL 5. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzmxs7v00277metma0vg6oq',
      status: 'current',
      name: 'Education',
      description:
        "The Faculty of Education offers the following undergraduate programs. Details of each program may be found in this publication under the headings of the appropriate department.\n\nAll Bachelor of Education programs have been accredited by the Comité d'agrément des programmes de formation à l'enseignement (CAPFE).\n\nThe credit weights given are for students who have completed a Quebec CEGEP degree, or have been granted 30 credits of Advanced Standing. Students who have not completed Quebec CEGEP, French Baccalaureate, International Baccalaureate, or at least one year of university studies prior to commencing their degree must also complete a minimum of 30 credits of Foundation Program courses (in addition to the 90-credit or 120/140-credit programs) for a total of 120 credits (B.A.(Education), B.Sc.(Kinesiology)) or 150/167 credits (B.Ed.).\n\nBachelor of Education Programs Leading to Teacher Certification\nDepartment of Integrated Studies in Education:\n\nSecondary English (B.Ed.) (120 credits)\nSecondary Mathematics (B.Ed.) (120 credits)\n​Secondary Science and Technology (B.Ed.) (120 credits)\nSecondary Social Sciences - History and Citizenship, Culture and Citizenship in Quebec (120 credits)\nSecondary Social Sciences (B.Ed.) - History and Citizenship, Geography (120 credits)\nKindergarten and Elementary Education (B.Ed.) (120 credits)\nKindergarten and Elementary Education (B.Ed.) - First Nations and Inuit Studies (120 credits)\nKindergarten and Elementary Jewish Studies (B.Ed.) (120 credits)\nKindergarten and Elementary Pédagogie de l'Immersion Française (B.Ed.) (120 credits)\nTeaching English as a Second Language (TESL) (B.Ed.) - Elementary and Secondary (120 credits)\nTeaching English as a Second Language (TESL) (B.Ed.) - Elementary and Secondary: Teaching Greek Language & Culture (120 credits)\nDepartment of Kinesiology and Physical Education:\n\nPhysical and Health Education (B.Ed.) (120 credits)  \nJoint Program with the Department of Integrated Studies in Education and the Department of Music Research (Schulich School of Music):\n\nConcurrent Major Music Education (B.Mus.) / Music Elementary and Secondary (B.Ed.) (170 credits), offered jointly by the Department of Integrated Studies in Education and the Schulich School of Music. **This program is currently not offered.** \nA student who successfully completes any of the above programs (and meets other requirements set out by the Ministère de l'Éducation) is recommended for certification as a teacher in the province of Quebec; see Quebec Teacher Certification.\n\nBachelor of Arts and Bachelor of Science Education Programs\nMajor Education in Global Contexts (B.A. Education) (90 credits), offered by the Department of Integrated Studies in Education.\nThe program focuses on understanding the role of education in addressing contemporary and emergent global challenges. Students will take the concepts of teaching and learning outside of the classroom environment, exploring subject areas in sociology, psychology, leadership studies, history, philosophy, and public policy. Students will benefit from examining the world through an international scope and learning to problem-solve using the foundation of educational principles and hands-on experiences through a semester-long internship. Designed for anyone who wishes to take on the role of educator in non-traditional contexts: in non-profit, government, business, and other career sectors.\nKinesiology (B.Sc.) (90 credits), offered by the Department of Kinesiology and Physical Education.\nThe program entails a comprehensive understanding of human movement. Kinesiology is a multidisciplinary field viewing human movement from social, historical, psychological, or biological perspectives. The program provides students with a breadth of theoretical knowledge as well as an opportunity to explore related areas in greater depth, including minor programs available elsewhere within the University. An honours program is available for particularly strong students who aspire to continue their studies at the graduate level and offers the opportunity to pursue more advanced coursework and research.",
      field: 'Education',
      degree: 'Bachelor of Education',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/education/overview/programs/#text',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/education/overview/programs/#text',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: checked, none required for most programs: the Faculty of Education asks for "No specific prerequisites except" Mathematics for B.Ed. Secondary Mathematics and Mathematics and two of Biology, Chemistry or Physics for B.Ed. Secondary Science & Technology (each 5 when required). TESL, TESL Greek and French immersion applicants also pass a language test. Kindergarten/Elementary, Physical Education, TESL, Global Contexts and Secondary Education are each listed at "30 subject points". Typical minimum: 30 subject points out of 42 (core excluded), stored as 3.4 stored McGill\'s figures; the stored 30 is confirmed. Stored before: no subjects. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9ass000l7mm9fnjlsmjt',
      status: 'current',
      name: 'Electrical Engineering',
      description:
        'Offered by: Electrical & Computer Engr (Faculty of Engineering)    \nDegree: Bachelor of Engineering\nProgram credit weight: 134 credits\n\nThis program gives students a broad understanding of the key principles that are responsible for the extraordinary advances in the technology of computers, micro-electronics, automation and robotics, telecommunications, and power systems. These areas are critical to the development of our industries and, more generally, to our economy. A graduate of this program is exposed to all basic elements of electrical engineering and can function in any of our client industries. This breadth is what distinguishes an engineer from, for example, a computer scientist or physicist.\n\nIn addition to technical complementary courses, students in the Electrical Engineering program take general complementary courses in social sciences, administrative studies, and humanities. These courses allow students to develop specific interests in areas such as psychology, economics, management, or political science.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 35 and 38 points from the six subjects (out of 42: the core points do not count), with 5 to 6 in each maths and science subject (6 in each at SL), so 35 does not guarantee a place.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/electrical-computer-engineering/electrical-engineering-beng/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'CHEM', level: 'HL', grade: 5 },
            { course: 'CHEM', level: 'SL', grade: 6 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'PHYS', level: 'HL', grade: 5 },
            { course: 'PHYS', level: 'SL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/electrical-computer-engineering/electrical-engineering-beng/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Electrical Engineering: Faculty of Engineering. Prerequisites: Mathematics, Chemistry and Physics at HL or SL (at least one math/science at HL); "Each math & science: 5 to 6 (6 in each SL math & science)", stored as 5 at HL or 6 at SL, all critical. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "at least one math/science at HL". Typical minimum range 35 to 38 subject points out of 42 (core excluded); the bottom, 35, is stored, as 3.4 did; it replaces the stored 37. Stored before: Maths AA HL 6 (critical); Physics HL 6; Chemistry SL 5. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzmxvun00497met9buq56l2',
      status: 'current',
      name: 'English Literature',
      description:
        "Offered by: English (Faculty of Arts)\nDegree: Bachelor of Arts\nProgram credit weight: 54\n\nEntry to Honours is by application, normally after two terms in a Departmental program, including at least 18 credits of English. The Faculty of Arts requires that all students admitted to Honours programs complete a second program minor in addition to their Honours program.\n\nAdmission to the Honours program is limited to a small number of students with excellent records. The minimum CGPA for application to the Honours program is 3.30. Students with a CGPA lower than 3.3 and at or above 3.0 (but with the requisite 3.5 program GPA) may consult the Director of the Honours program for special permission to apply. Students with a program GPA lower than 3.5 and at or above 3.3 (but with the requisite CGPA of 3.3) may also consult the Director of the Honours program for special permission to apply. In neither instance is admission guaranteed. After admission into the Honours program, the student is required to maintain a CGPA at a level set by the Faculty for graduation with Honours and a program GPA at the level set by the Department.\n\nThe Honours program in English requires 54 credits. Students intending to apply for Honours should plan to complete as many of the specific requirements of their option as possible within the first two years. With the written approval of an adviser, up to 9 credits may be taken outside the Department. All Honours students must complete at least 6 of their complementary credits at the 500 level. Ideally, 500-level seminars chosen will be relevant to the area of the student's independent study in the Honours Essay course (ENGL 491D1 Honours Essay./ENGL 491D2 Honours Essay.), taken without exception in the final year of the program. The Honours Essay is first planned in consultation with a supervisor at the time of application to the Honours program; it is then guided and evaluated by that supervisor during the completion of ENGL 491. Graduation with Honours requires 54 credits of English, a minimum mark of B+ on the Honours Essay, a minimum CGPA of 3.00, and a minimum program GPA of 3.50. Graduation with First Class Honours requires a mark of A on the Honours Essay, a minimum CGPA of 3.50, and a minimum program GPA of 3.70.\n\nDegree Requirements — B.A. students\nTo be eligible for a B.A. degree, a student must fulfil all Faculty and program requirements as indicated in Degree Requirements for the Faculty of Arts.\n\nWe recommend that students consult an Arts OASIS advisor for degree planning.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 33 and 36 points from the six subjects (out of 42: the core points do not count), so 33 does not guarantee a place.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 33,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/english/english-literature-honours-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/english/english-literature-honours-ba/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: checked, none required. English Literature is a Faculty of Arts program: "No specific prerequisites". Typical minimum range 33 to 36 subject points out of 42 (core excluded); the bottom, 33, is stored, as 3.4 did; it replaces the stored 34. Stored before: no subjects. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzmxpoq000h7meti50y4rwz',
      status: 'current',
      name: 'Environmental Science',
      description:
        'The Faculty of Agricultural and Environmental Sciences and the School of Human Nutrition offer degrees, certificates, and diplomas in:\n\nBachelor of Engineering (Bioresource Engineering)\nBachelor of Science (Agricultural and Environmental Sciences)\nBachelor of Science (Food Science)\nBachelor of Science (Nutritional Sciences)\nBachelor of Science (Food Science and Nutritional Science (Concurrent))\nCertificate in Ecological Agriculture\nCertificate in Food Science\nDiploma in Environment\nDiploma of College Studies in Farm Management and Technology\nThe Faculty of Agricultural and Environmental Sciences is one of the four faculties in partnership with the Bieler School of Environment.\n\nSeveral programs offered by the Faculty and School can lead to professional accreditation. These include:\n\nthe Agricultural Economics major and the Sustainable Agricultural Systems major programs – membership in the Ordre des agronomes du Québec and other provincial Institutes of Agriculture;\nBioresource Engineering – membership as a professional engineer in any province of Canada and the Ordre des agronomes du Québec;\nthe Dietetics Major – membership in the Dietitians of Canada and the Ordre des diététistes-nutritionnistes du Québec (ODNQ), previously named Ordre professionnel des diététistes du Québec;\nFood Science – accreditation by the Institute of Food Technologists and professional accreditation by the Ordre des chimistes du Québec.\nProfessional Practice experiences to complete the Dietetics practicum are provided in the McGill teaching hospitals and in a wide variety of health, education, business, government, and community agencies.\n\nThe Faculty also offers M.Sc. and Ph.D. programs in a variety of areas. Further information about these programs is available in the Faculty of Agricultural and Environmental Studies Graduate and Postdoctoral Studies section.',
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 28,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/agri-env-sci/program-overview/#undergraduateprogramstext',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/agri-env-sci/program-overview/#undergraduateprogramstext',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: The Faculty of Agricultural and Environmental Sciences\' B.Sc.(Ag.Env.Sc.) programs ("All B.Sc.(Ag.Env.Sc.) programs": 28-30). Prerequisites: Mathematics and two of Biology, Chemistry or Physics, at HL or SL; each math and science 5. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "two of": one critical group of the three is stored, which one subject satisfies. Typical minimum range 28 to 30 subject points out of 42 (core excluded); the bottom, 28, is stored, as 3.4 did; it replaces the stored 30. Stored before: Biology or Chemistry or Physics SL 5; Biology or Chemistry or Physics SL 5; Maths AA or Maths AI SL 5. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzmxqcm000z7met90mlfy7m',
      status: 'current',
      name: 'Food Science',
      description:
        'Available Programs\nFood Science - Food Chemistry Option (B.Sc.(F.Sc.))\nFood Science/Nutritional Science Honours (Concurrent) (B.Sc.(F.Sc.)) and (B.Sc.(Nutr.Sc.))\nFood Science/Nutritional Science Major (Concurrent) (B.Sc.(F.Sc.)) and (B.Sc.(Nutr.Sc.))\nFood Science - Food Science Option (B.Sc.(F.Sc.))\nFood Science - Food Science Option Honours (B.Sc.(F.Sc.))\nFood Science (Certificate)',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 28,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/agri-env-sci/programs/food-science-agricultural-chemistry/#programstext',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/agri-env-sci/programs/food-science-agricultural-chemistry/#programstext',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Food Science (B.Sc.(F.Sc.)) is admitted with the Faculty of Agricultural and Environmental Sciences (Macdonald campus), whose range and prerequisites it shares. Prerequisites: Mathematics and two of Biology, Chemistry or Physics, at HL or SL; each math and science 5. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "two of": one critical group of the three is stored, which one subject satisfies. Typical minimum range 28 to 30 subject points out of 42 (core excluded); the bottom, 28, is stored, as 3.4 did; it replaces the stored 30. Stored before: Biology or Chemistry SL 5; Biology or Chemistry or Physics SL 5; Maths AA or Maths AI SL 5. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9g26003t7mm9q6fp0q0w',
      status: 'current',
      name: 'History and Classical Studies',
      description:
        'Available Programs\nClassics Honours (B.A.) (54 credits)\nClassics Joint Honours Component (B.A.) (36 credits)\nClassics Major Concentration (B.A.) (36 credits)\nClassics Minor Concentration (B.A.) (18 credits)\nHistory Honours (B.A.) (54 credits)\nHistory Joint Honours Component (B.A.) (36 credits)\nHistory Major Concentration (B.A.) (36 credits)\nHistory Minor Concentration (B.A.) (18 credits)\nSouth Asian Studies Minor Concentration (B.A.) (18 credits)\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 33 and 36 points from the six subjects (out of 42: the core points do not count), so 33 does not guarantee a place.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 33,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/history-classical-studies/#programstext',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/history-classical-studies/#programstext',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: checked, none required. History and Classical Studies is a Faculty of Arts program: "No specific prerequisites". Typical minimum range 33 to 36 subject points out of 42 (core excluded); the bottom, 33, is stored, as 3.4 did; it replaces the stored 34. Stored before: no subjects. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzmxwli004f7met90ty93ac',
      status: 'current',
      name: 'International Development Studies',
      description:
        "About International Development\nMcGill's Institute for the Study of International Development (ISID) works to improve people's lives through cutting edge research, training, and communication that accelerates global sustainable development. It does this by educating successive generations of socially responsible and politically engaged students, developing intellectual capacity, and conducting leading edge research that is relevant for policymaking. Equally important, ISID is committed to connecting our teaching and research with the decision makers and principal actors tackling today's most pressing issues by supporting and engaging with NGOs, governments, community organizations, private sector actors, and civil society more broadly, working to increase our collective capacity for achieving sustainable development that will lead to economic and social improvements across the globe.\n\nInternational Development Studies\nThe International Development Studies (IDS) program is designed for those students who wish to take advantage of the resources available at McGill to pursue an interdisciplinary program of study focusing on the problems of the developing countries.\n\nMost courses above the 200 level have prerequisites. Although these may be waived by instructors in some cases, students are urged to confirm their eligibility for courses when they prepare their programs of study. Note that certain courses (especially those in Management) may not be available owing to space limitations. Students should check the Class Schedule on Minerva for confirmation as to which term courses are offered.\n\nFurther information for new and returning students is available on the ISID Department page.\n\nAvailable Programs\n\nInternational Development Studies Honours (B.A.) (57 credits)\nInternational Development Studies Joint Honours Component (B.A.) (36 credits)\nInternational Development Studies Major Concentration (B.A.) (36 credits)\nInternational Development Studies Minor Concentration (B.A.) (18 credits)\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 33 and 36 points from the six subjects (out of 42: the core points do not count), so 33 does not guarantee a place.",
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 33,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/international-development/#programstext',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/international-development/#programstext',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: checked, none required. International Development Studies is a Faculty of Arts program: "No specific prerequisites". Typical minimum range 33 to 36 subject points out of 42 (core excluded); the bottom, 33, is stored, as 3.4 did; it replaces the stored 34. Stored before: no subjects. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzmxt2j002h7metfzgvid3p',
      status: 'current',
      name: 'Kinesiology',
      description:
        'About the Department of Kinesiology and Physical Education\nThe Department of Kinesiology and Physical Education offers one program leading to a B.Ed. degree in Physical and Health Education, one program leading to a B.Sc. degree in Kinesiology (Major or Honours), and a Minor in Kinesiology for Science students. For more information, please visit the undergraduate program information section.\n\nKinesiology (B.Sc.) (90 credits)\nKinesiology - Honours (B.Sc.) (90 credits)\nPhysical and Health Education (B.Ed.) (120 credits)',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 30,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/education/kinesiology-physical-education/kinesiology-bsc/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/education/kinesiology-physical-education/#programstext',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: renamed Kinesiology: the stored degree is the B.Sc., and "Kinesiology and Physical Education" is the department, which also offers the B.Ed. stored separately as Physical Education. The URL moves from the department to the Kinesiology (B.Sc.) catalogue page. Prerequisites: Mathematics and two of Biology, Chemistry or Physics, at HL or SL; each math and science 5. SL Maths AI, accepted before, is not. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "two of": one critical group of the three is stored, which one subject satisfies. Typical minimum range 30 to 31 subject points out of 42 (core excluded); the bottom, 30, is stored, as 3.4 did; the stored 30 is confirmed. Stored before: Maths AA or Maths AI SL 5 (critical); Biology or Chemistry or Physics SL 5. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9f2n00377mm9fqbr2nt0',
      status: 'current',
      name: 'Mathematics',
      description:
        'Develop advanced mathematical reasoning and problem-solving skills. This program covers pure and applied mathematics including analysis, algebra, statistics, and computational methods.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 35 and 38 points from the six subjects (out of 42: the core points do not count), with 5 to 6 in each maths and science subject and at least one 6 (6 in Maths AA at SL), so 35 does not guarantee a place.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/mathematics-statistics/mathematics-major-bsc/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/mathematics-statistics/mathematics-major-bsc/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Mathematics is in McGill\'s Physical, Environmental, Math and Computer Sciences Group (Faculty of Science): Mathematics and two of Biology, Chemistry or Physics at HL or SL, at least one at HL; "Each math & science: 5 to 6 (and at least one 6); 6 if SL Math AA". Requirements unchanged. Typical minimum range 35 to 38 subject points out of 42 (core excluded); 35 is stored, unchanged. Re-read after 3.4, which stamped it 2026: the page now names Fall 2027. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. 3.4\'s note: Content 3.4: the catalogue moved the page from math-stats/ to mathematics-statistics/; same program, Mathematics Major (B.Sc.). McGill\'s IB page names no entry year, so checked for 2026 (rule 2). Science, Physical, Earth, Math and Computer Sciences group: typical minimum range 35 to 38 subject points out of 42 (core points excluded, as Lausanne\'s 32/42 is stored); 35 is stored. Prerequisites: Mathematics and two of Biology, Chemistry or Physics at HL or SL, at least one math/science at HL; each math and science 5 to 6 with at least one 6, and 6 if SL Math AA. SL Math AI is not accepted. The model cannot hold "two of", "at least one at HL" or "at least one 6": the science group needs only one. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9b5e000t7mm9ukutjivb',
      status: 'current',
      name: 'Mechanical Engineering',
      description:
        'Design and analyze mechanical systems from nanotechnology to spacecraft. This program covers thermodynamics, fluid mechanics, materials science, and mechanical design to solve real-world engineering challenges.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 38 and 42 points from the six subjects (out of 42: the core points do not count), with 6 in each maths and science subject, so 38 does not guarantee a place.',
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 38,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/mechanical-engineering/mechanical-engineering-beng/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 6 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 6, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 6, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/mechanical-engineering/mechanical-engineering-beng/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Mechanical Engineering: Faculty of Engineering. Prerequisites: Mathematics, Chemistry and Physics at HL or SL (at least one math/science at HL); "Each math & science: 6", all critical. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "at least one math/science at HL". Typical minimum range 38 to 42 subject points out of 42 (core excluded); the bottom, 38, is stored, as 3.4 did; the stored 38 is confirmed. Stored before: Maths AA HL 6 (critical); Physics HL 6; Chemistry SL 6. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzmxoul00017metq8es1w11',
      status: 'current',
      name: 'Mining and Materials Engineering',
      description:
        "About the Department of Mining and Materials Engineering\nThe Department of Mining and Materials Engineering offers programs leading to the Bachelor of Engineering degree in Materials Engineering or Mining Engineering. In addition to regular courses and laboratories, the curriculum includes seminars, colloquia, and student projects reinforced by field trips to industrial operations.\n\nFor detailed information on each program, see the Programs tab.\n\nScholarships\nThe Department offers renewable Entrance Scholarships every year. A substantial number of other scholarships and bursaries are also awarded by the Department, as well as by the Canadian Mineral Industry Education Foundation, Canadian Institute of Mining Foundation, Quebec Mining Association, and others.\n\nPlease refer to the Faculty of Engineering website's Scholarships and Financial Aid section for more information.\n\nAbout Materials Engineering\nCo-op in Materials Engineering\nThe Materials Engineering degree is a cooperative program leading to a B.Eng. and includes formal industrial work periods. It is built on a strong background of mathematics, basic sciences, computer skills and applications, and specific engineering and design courses to provide up-to-date training in materials engineering. Students take core courses covering processing, fabrication, applications, and performance of materials.\n\nThe program is fully accredited by the Canadian Engineering Accreditation Board (CEAB) and is designed to offer students exceptional training for employment in the field.\n\nThe core courses are supplemented by complementary courses, which provide a diverse selection of specialties for the graduating engineer. The course structure is reinforced with laboratory exercises. Graduates find employment in a wide range of industries, including the resource and manufacturing sectors. Students in the Co-op program benefit from practical learning experience gained from work-term employment in meaningful engineering jobs, as well as non-tangible learning experiences arising from the responsibilities required to obtain and successfully complete the work terms.\n\nRegarding the Co-op program fees, an amount of $273.76 will be billed during ten consecutive terms for a total amount of $2,737.60 before graduation. These fees cover expenses directly related to the operation of the Co-op program. Students must register for each of their industrial training courses within the university registration period for returning students or late fees will apply. Before registering for any work term course, students must contact the Co-op in Materials Engineering Liaison Officer for approval.\n\nStudent Advising\nStudents entering this program must plan their schedule of studies in consultation with one of the departmental advisors. Appointments may be obtained by contacting the Administrative and Student Affairs Coordinator.\n\nFor more information, please refer to the Academic Advising section of the department's website.\n\nAbout Mining Engineering\nCo-op in Mining Engineering\nMcGill is proud to be the host of the oldest mining engineering program in Canada, which started in 1871. The program is known for the excellence of its courses as well as the training it provides in mining science and technology, mineral economics, mine planning, rock mechanics, renewable energy, and mine design. Mining offers excellent career opportunities in Canada and around the world. There have been rapid technological developments in recent years, presenting numerous challenges to students with strong interest in engineering and a taste for innovation.\n\nThe Department offers a co-operative program leading to an accredited B.Eng. degree in Mining Engineering. It includes three paid industrial work terms. The Department has a dedicated Mining Co-op Liaison Officer to help the students find jobs in industry. The program is offered in one of two streams: English Stream for high school students and Bilingual Stream for CEGEP students, in collaboration with the mining engineering program at Polytechnique Montréal. Students in the Bilingual Stream take six mining courses at Polytechnique Montréal at the latter part of the program. The teaching and learning style in mining courses is one that permits the students to sharpen their communication skills—both written and oral—and develop their team working skills.\n\nA wide range of scholarships are available to new and continuing students from the Department, Faculty of Engineering, as well as from industry. The Department provides financial support to students who are willing to participate in mining competitions, such as the Canadian Mining Games and World Mining Competition.\n\nWhen taking a co-op work term, students must register for MIME 290 Industrial Work Period 1., MIME 291 Industrial Work Period 2., and MIME 392 Industrial Work Period 3.; thus, co-op work terms appear on the student transcript. Interested students may also take a fourth work term as a complementary course and a fifth one as an extra course.\n\nStudent Advising\nThe Department gives priority to their academic advising service. Each student in the mining engineering program is assigned an academic advisor at the start of their study at McGill and for the duration of their undergraduate degree. Our academic advising service ensures quality and individual guidance to each student in the program. Students will meet with their advisor at least once a year to discuss their progress and interest in exchange with other mining schools or taking a minor in their areas of interest among other things.\n\nFor more information, please refer to the Academic Advising section of our website.\n\nAvailable Programs\nCo-op in Materials Engineering (B.Eng.) (148 credits)\nCo-op in Mining Engineering (B.Eng.) (150 credits)\nMaterials Engineering (B.Eng.) (148 credits)\nMining Engineering (B.Eng.) (144 credits)\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 33 and 36 points for Materials Engineering and between 32 and 35 for Mining Engineering, from the six subjects (out of 42: the core points do not count), with 5 to 6 in each maths and science subject (6 in maths at SL), so 32 does not guarantee a place.",
      field: 'Engineering',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 32,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/mining-materials-engineering/#programstext',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['CHEM'], level: 'SL', grade: 5, critical: true },
        { courses: ['PHYS'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/mining-materials-engineering/#programstext',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: one stored program for the department\'s two B.Eng. degrees, Materials Engineering (33 to 36) and Mining Engineering (32 to 35); the lower bottom, 32, is stored. Both: Mathematics, Chemistry and Physics at HL or SL (at least one math/science at HL); "Each math & science: 5 to 6 (6 if SL math)", stored as Maths 5 at HL or 6 at SL, Chemistry and Physics 5, all critical. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "at least one math/science at HL". Typical minimum range 32 to 36 subject points out of 42 (core excluded); the bottom, 32, is stored, as 3.4 did; it replaces the stored 35. Stored before: Maths AA HL 6 (critical); Chemistry SL 5; Physics SL 5. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"), which now gives Materials Engineering 33 to 36 and Mining Engineering 32 to 35; update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9fug003r7mm963fa4wqn',
      status: 'current',
      name: 'Music',
      description:
        'Browse Academic Units and Programs\nThe Department of Music Research offers undergraduate degrees (Bachelor of Music) in Music Composition, Music Education, Music History, Theory, and the Music Studies Program. The Department also offers Minors in Applied Performance Sciences, Music History, Music Composition, Music Education, Music Entrepreneurship, Music Theory, Musical Applications of Technology, and Musical Science and Technology.\n\nThe Department of Performance offers undergraduate degrees (Bachelor of Music) in Performance, Early Music Performance, and Jazz Performance; diploma programs in Licentiate in Music; and Minors in Conducting, Early Music Performance, Jazz Arranging and Composition, and Jazz Performance.\n\nThe programs and courses in the following sections have been approved for the 2025-2026 session as listed.\n\nDepartment of Music Research\nApplied Performance Sciences Minor (B.Mus.)\nComposition Major (B.Mus.)\nComposition Minor (B.Mus.)\nMusic Studies Major (B.Mus.)\nFaculty Program Music - Jazz (B.Mus.)\nMusic Education / Music Elementary and Secondary Concurrent Major (B.Mus./B.Ed.)\nMusic Education Minor (B.Mus.)\nMusic Entrepreneurship Minor (B.Mus.)\nMusic History Major (B.Mus.)\nMusic History Minor (B.Mus.)\nMusical Applications of Technology Minor (B.Mus.)\nMusical Science and Technology Minor (B.Mus.)\nTheory Major (B.Mus.)\nMusic Theory Minor (B.Mus.)\nDepartment of Performance\nPerformance Piano Major (B.Mus.)\nPerformance Voice Major (B.Mus.)\nPerformance (Orchestral Instruments) Major (B.Mus.)\nEarly Music Performance Major (Baroque Violin, Viola, Cello, Viola da Gamba, Flute, Recorder, Oboe, Organ, Harpsichord and Early Brass Instruments) (B.Mus.)\nEarly Music Performance Major (Voice) (B.Mus.)\nPerformance Jazz Major (B.Mus.)\nPerformance (Organ and Guitar) Major (B.Mus.)\nConducting Minor (B.Mus.)\nEarly Music Performance Minor (B.Mus.)\nJazz Arranging and Composition Minor (B.Mus.)\nJazz Performance Minor (B.Mus.)\nPerformance Piano Major (L.Mus.)\nPerformance Major (All Instruments except Piano, Voice and Jazz) (L.Mus.)\nPerformance Jazz Major (L.Mus.)\nPerformance Voice Major (L.Mus.)\n\nUndergraduate Admission Requirements\nYou need to meet basic academic requirements in order to be considered for admission to McGill University. Entrance to the Schulich School of Music is competitive and subject to the availability of places in each program.\n\nAdmission decisions are based on:\nYour audition\nYour academic record\nOther supporting materials, such as scores if you are a composition applicant or proof of English Proficiency if you are an international student.\nAvailable spots in a given program or for an instrument\nAdmission decisions based on screening material or auditions (recorded or live) cannot be appealed.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Music',
      duration: '4 years',
      minIBPoints: 30,
      programUrl: 'https://coursecatalogue.mcgill.ca/en/undergraduate/music/programs/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.mcgill.ca/music/admissions/undergraduate/prepare',
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://www.mcgill.ca/music/admissions/undergraduate/audition-dates'
      ],
      notes:
        'Content 4.4: checked, none required. McGill\'s IB page sends Music applicants to the Schulich School of Music, whose requirements for IB students outside Canada are predicted results of "5 or better on each Higher and Standard Level subject", plus an audition (or recorded screening) that decides admission. No total is published: six subjects at 5 make 30 subject points, the stored figure, which is kept on that reading. The requirements page names no year, and the Music admissions page still says "Fall 2026" while its audition schedule is for Fall 2027, so checked for 2026 (rule 2).'
    },
    // Stored: not checked for any intake. Degree stored as "Bachelor of Science in Nursing".
    {
      id: 'cmjzl9fbq003b7mm97oarykw7',
      status: 'current',
      name: 'Nursing',
      description:
        'Offered by: Ingram School of Nursing (Faculty of Medicine and Health Sciences)   \nDegree: BSCNUR\nProgram credit weight: 103\n\n\nThe B.Sc.(N.) is a 3-4 year program (including summer sessions) that focuses on complex and contemporary nursing issues. As a preparation for a nursing career, the program includes innovative courses on fundamental nursing expertise, skills and critical thinking. Completion of this program entitles successful graduates to sit licensure examinations in Quebec, Canada, and other countries. This program is accredited by the Canadian Association of Schools of Nursing.',
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/nursing/nursing/nursing-bscn/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'SL', grade: 5 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/nursing/nursing/nursing-bscn/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Ingram School of Nursing, B.Sc.(N.). Prerequisites: Mathematics and two of Biology, Chemistry or Physics, at HL or SL; each math and science 5; "Proof of French proficiency" is also required. McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "two of": one critical group of the three is stored, which one subject satisfies. The stored Biology or Chemistry HL 5 had no source. Typical minimum: 30 subject points out of 42 (core excluded), stored as 3.4 stored McGill\'s figures; the stored 30 is confirmed. Stored before: Biology or Chemistry HL 5; Biology or Chemistry or Physics SL 5; Maths AA or Maths AI SL 5. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzmxvll00477metptuxfwmy',
      status: 'current',
      name: 'Philosophy',
      description:
        "About Philosophy\nBroadly speaking, the principal aim of philosophy is to increase our understanding of ourselves, the world, and our place in it. Philosophy differs from the empirical and social sciences in important respects. Different areas of philosophy are characterized by the questions they address. For example:\n\nEpistemology inquires into the nature of knowledge;\nMetaphysics is concerned with the fundamental nature of the world and of the types of things that it contains;\nEthics investigates the nature of moral judgment and moral reasoning;\nPolitical Philosophy examines such matters as justice, freedom, rights, democracy, and power;\nLogic is broadly the analysis of the structure of correct reasoning.\nIn addition, there are the various “Philosophies of...” e.g., Philosophy of Science, Philosophy of Language, Philosophy of Mind, and Philosophy of Religion.\n\nSome of the courses in the Department are explicitly devoted to these specific areas of philosophy, each exploring one or several ways of construing and answering the questions it poses. Other courses explore some period or individual figure in the history of philosophy, approaching philosophical questions through the work of past thinkers, and often exploring connections between the different areas of philosophy.\n\nThe discipline of Philosophy, as a particular way of thinking, emphasizes clarity in expression, both written and oral, and rigour in argument. Philosophical questions are intriguing and complex, and so philosophical method stresses thoroughness and intellectual generosity—the willingness and ability to grasp another's arguments and respond to them.\n\nThe Department requires that all students in the Honours and Joint Honours programs take a special 3-credit course (PHIL 301 Philosophical Fundamentals.), the principal aim of which is to equip students with the distinctively philosophical skills required for advanced work in the field. The course is not available to students in the Major or Minor programs.\n\nThe B.A. in Philosophy is not a professional qualification. It prepares students for graduate work in philosophy and for study in other disciplines, e.g., Law. As the interdisciplinary discipline par excellence, philosophy also maintains and encourages ties with other fields, so many students will find that certain classes in philosophy are directly relevant to their major area of study. The Department has a strong commitment to providing an intensive yet broad-based philosophical education. The research interests of members of the Department are wide-ranging.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 33 and 36 points from the six subjects (out of 42: the core points do not count), so 33 does not guarantee a place.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 33,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/philosophy/#programstext',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/philosophy/#programstext',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: checked, none required. Philosophy is a Faculty of Arts program: "No specific prerequisites". Typical minimum range 33 to 36 subject points out of 42 (core excluded); the bottom, 33, is stored, as 3.4 did; it replaces the stored 34. Stored before: no subjects. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzmxstm002f7metimvbcwpo',
      status: 'current',
      name: 'Physical Education',
      description:
        'Offered by: Kinesiology and Physical Ed (Faculty of Education)  \nDegree: Bachelor of Education\nProgram credit weight: 120 credits\n\nThe Bachelor of Education (B.Ed.) - Physical and Health Education is a 120-credit program leading to teacher certification. Students who have not completed Quebec CEGEP, French Baccalaureate, International Baccalaureate, or at least one year of university studies prior to commencing the B.Ed. must also complete a minimum of 30 credits of Foundation courses (in addition to the 120 credit program) for a total of 150 credits.\n\nThe Physical and Health Education program prepares students to teach physical and health education at the elementary and secondary levels. In a unique structure interweaving academic studies, professional course work, and teaching practices over the course of study, students are rapidly given the opportunity to assume a teaching role; the extent of teaching involvement and expectations progressively building on additional academic and professional courses.\n\nPlease note that graduates of teacher education programs are recommended by the University for Quebec certification to the Ministère de l\'Éducation, et L\'Enseignment supérieur (MEES). For more information about teacher certification in Quebec, please refer to the Faculty of Education section under "Overview of Faculty Programs", "Undergraduate Education Programs", and "Quebec Teacher Certification".',
      field: 'Education',
      degree: 'Bachelor of Education',
      duration: '4 years',
      minIBPoints: 30,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/education/kinesiology-physical-education/physical-health-education-bed/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/education/kinesiology-physical-education/physical-health-education-bed/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: checked, none required. B.Ed. Physical and Health Education, Faculty of Education: "No specific prerequisites"; listed at "30 subject points". Typical minimum: 30 subject points out of 42 (core excluded), stored as 3.4 stored McGill\'s figures; the stored 30 is confirmed. Stored before: no subjects. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9eor002x7mm9c9990hqn',
      status: 'current',
      name: 'Physics',
      description:
        'Offered by: Physics (Faculty of Science)\nDegree: Bachelor of Science \nProgram credit weight: 63\n\nThe B.Sc.; Major in Physics program covers a range of fundamental physical concepts from classical physics to modern topics relevant to contemporary research. The program may be completed in 60-63 credits.\n\nDegree Requirements — B.Sc.\nThis program is offered as part of a Bachelor of Science (B.Sc.) degree.\n\nTo graduate, students must satisfy both their program requirements and their degree requirements.\n\nThe program requirements (i.e., the specific courses that make up this program) are listed under the Course Tab (above).\nThe degree requirements—including the mandatory Foundation program, appropriate degree structure, and any additional components—are outlined on the Degree Requirements page.\nStudents are responsible for ensuring that this program fits within the overall structure of their degree and that all degree requirements are met. Consult the Degree Planning Guide on the SOUSA website for additional guidance.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 35 and 38 points from the six subjects (out of 42: the core points do not count), with 5 to 6 in each maths and science subject and at least one 6 (6 in Maths AA at SL), so 35 does not guarantee a place.',
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/physics/physics-major-bsc/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5, critical: true }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/physics/physics-major-bsc/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Physics is in McGill\'s Physical, Environmental, Math and Computer Sciences Group (Faculty of Science). Prerequisites: Mathematics and two of Biology, Chemistry or Physics at HL or SL, at least one math/science at HL; "Each math & science: 5 to 6 (and at least one 6); 6 if SL Math AA". McGill: "The Diploma with grades of 5 or better on each Higher and Standard Level subject is the minimum expected for most programs"; where maths is a prerequisite it takes Maths AA (HL or SL) or Maths AI HL, and "SL Math AI is not accepted". The model cannot hold "two of": one critical group of the three is stored, which one subject satisfies. The model cannot hold "at least one math/science at HL". Nor can it hold "at least one 6". Typical minimum range 35 to 38 subject points out of 42 (core excluded); the bottom, 35, is stored, as 3.4 did; it replaces the stored 36. Stored before: Maths AA HL 6 (critical); Physics HL 6; Biology or Chemistry SL 5. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9dls00277mm9bs2uoraq',
      status: 'current',
      name: 'Political Science',
      description:
        'Offered by: Political Science (Faculty of Arts)\nDegree: Bachelor of Arts; Bachelor of Arts and Science\nProgram credit weight: 36\n\nThe Major Concentration in Political Science is a 36-credit program in four fields: comparative politics, international relations, Canadian politics, and political theory, including empirical methods.\n\nDegree Requirements — B.A. students\nTo be eligible for a B.A. degree, a student must fulfil all Faculty and program requirements as indicated in Degree Requirements for the Faculty of Arts.\n\nWe recommend that students consult an Arts OASIS advisor for degree planning.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 33 and 36 points from the six subjects (out of 42: the core points do not count), so 33 does not guarantee a place.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 33,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/political-science/political-science-major-concentration-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/political-science/political-science-major-concentration-ba/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: checked, none required. Political Science is a Faculty of Arts program: "No specific prerequisites". Typical minimum range 33 to 36 subject points out of 42 (core excluded); the bottom, 33, is stored, as 3.4 did; it replaces the stored 34. Stored before: no subjects. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9ddy00257mm9huyj6v3c',
      status: 'current',
      name: 'Psychology',
      description:
        'Offered by: Psychology (Faculty of Arts)\nDegree: Bachelor of Arts; Bachelor of Arts and Science\nProgram credit weight: 36\n\nPsychology is the scientific study of the mind and behavior. The B.A. Major Concentration in Psychology (36 credits) provides students with a basic overview, covering the core areas of psychological science as well as more advanced courses in specialized content areas. Students also have the option to complete a research course(s) (see Program Requirements for details). Note: this program may not provide sufficient undergraduate background preparation for certain graduate programs. Students who wish to go on to graduate training in psychology, and those who wish to complete the undergraduate credits in psychology as specified by the Ordre des Psychologues du Québec (which are required by some graduate psychology programs), are advised to take the supplementary Minor Concentration Behavioural Science. This specialization option will give students the space to take the additional courses they may need for such applications.\n\nDegree Requirements — B.A. students\nTo be eligible for a B.A. degree, a student must fulfil all Faculty and program requirements as indicated in Degree Requirements for the Faculty of Arts.\n\nWe recommend that students consult an Arts OASIS advisor for degree planning.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 33 and 36 points from the six subjects (out of 42: the core points do not count), so 33 does not guarantee a place.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 33,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/psychology/psychology-major-concentration-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/psychology/psychology-major-concentration-ba/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: checked, none required. Psychology (B.A.) is a Faculty of Arts program: "No specific prerequisites". Typical minimum range 33 to 36 subject points out of 42 (core excluded); the bottom, 33, is stored, as 3.4 did; it replaces the stored 34. Stored before: no subjects. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzmxuaz003f7metolixj4zt',
      status: 'current',
      name: 'Social Work',
      description:
        "About Social Work\nThe School of Social Work offers an undergraduate program leading to a Bachelor of Social Work (B.S.W.) degree. The B.S.W. program prepares students for:\n\nGeneralist social work practice in a range of health and social service positions. The B.S.W. degree represents the point of admission into the Ordre des travailleurs sociaux et des thérapeutes conjugaux et familiaux du Québec (OTSTCFQ) and the Canadian Association of Social Workers.\nEntry into specialized professional studies at the graduate level.\nA 90-credit program is offered to students entering from CEGEP or equivalent, students who transfer from within McGill or other universities, and Mature students. For more information, refer to the school's website.\n\nFor graduates intending to practice social work in Quebec, please note that Quebec law requires candidates seeking admission to the professional social work order of Quebec (OTSTCFQ) to demonstrate a working knowledge of the French language. For more information, please see our Working in Quebec page.\n\nThe objectives of the B.S.W. program are to provide an academic environment where students can develop:\n\nintegrated social work knowledge pertaining to history, theory, research, practice modalities, and policies that influence the delivery of health and social services;\nprofessional skills in well-established methods of practice with individuals, families, and community organizations;\nunderstanding of the factors, processes, and forces that form and govern social policy in Canada, and the skills to work toward policy improvement and change;\nawareness of various dimensions of diversity and how they intersect in an increasingly heterogeneous society;\na sense of identity as an intervening agent in social work practice and a sense of responsibility that accompanies acts of intervention; and\na commitment to advancing knowledge and improving skills within ethical social work practice that are the prerequisites for more advanced studies at the graduate level.\nAdmission to the Bachelor of Social Work (B.S.W.) Three-Year Program \nThe B.S.W. program aims to ensure that social workers are as diverse as the communities with which we work. First Nations, Inuit, Métis, people with disabilities, racialized people, visible minorities, ethnic and religious minorities, gender non-conforming and LGBTQ+ people, and women are strongly encouraged to apply. Applications from CEGEP, French and International Baccalaureate, Transfer, and Mature students are welcome. Admission to the B.S.W. program is limited and competitive. All candidates are expected to have better than average grades, significant social work-related experience, paid or volunteer, and also to demonstrate personal suitability for the social work profession. Classes are offered in English, but French proficiency (comprehension, spoken, and written) is needed for local field placements and for securing admission to the OTSTCFQ.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 35 and 38 points from the six subjects (out of 42: the core points do not count), so 35 does not guarantee a place.",
      field: 'Social Sciences',
      degree: 'Bachelor of Social Work',
      duration: '3 years',
      minIBPoints: 35,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/social-work/#programstext',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/social-work/#programstext',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: checked, none required. Bachelor of Social Work: "No specific prerequisites"; "A resumé, a personal statement, and letters of recommendation must also be submitted". Typical minimum range 35 to 38 subject points out of 42 (core excluded); the bottom, 35, is stored, as 3.4 did; it replaces the stored 36. Stored before: no subjects. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzmxw3j004b7metudo5cpp4',
      status: 'current',
      name: 'Sociology',
      description:
        'About Sociology\nSociology is commonly defined as the scientific study of society. It offers the student an educational experience which is both intellectually rewarding and practically useful as a preparation for future career opportunities. It provides the student with the theoretical and analytical tools to better understand the complex social forces which affect our lives, contributing in this way to personal enrichment and more effective citizenship. It is also valuable preparation for advanced study in the social sciences, as well as for careers in management; education; law; medicine and health-related areas; social work; and communications in both the public sector and private industry.\n\nThe Department offers a Minor Concentration, a Major Concentration, an Honours, and a Joint Honours program in Sociology. Although a student from outside the Department may take courses in the Department without having taken SOCI 210 Sociological Perspectives. (except where noted otherwise), the course is recommended. The purpose of the Minor Concentration is to give the student a basic understanding of the field of Sociology, while the Major Concentration will provide a more comprehensive coverage of the field. The purpose of the Honours program is to permit a student to study the field in depth, and to do an Honours Project—a research paper under the supervision of a faculty member—whose topic and supervisor are chosen by mutual agreement between the student and the professor.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 33 and 36 points from the six subjects (out of 42: the core points do not count), so 33 does not guarantee a place.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 33,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/sociology/#programstext',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/sociology/#programstext',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: checked, none required. Sociology is a Faculty of Arts program: "No specific prerequisites". Typical minimum range 33 to 36 subject points out of 42 (core excluded); the bottom, 33, is stored, as 3.4 did; it replaces the stored 34. Stored before: no subjects. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    },
    // Stored: not checked for any intake.
    {
      id: 'cmjzl9a4100057mm9vpukar79',
      status: 'current',
      name: 'Software Engineering (Co-op)',
      description:
        'About Computer Science\nComputer Science covers the theory and practice behind the design and implementation of computer and information systems. Fundamental to computer science are questions about how to describe, process, manage, and analyze information and computation. A fundamental building block is the study of algorithms. An algorithm presents a detailed sequence of actions solving a particular task. A computer program is the implementation of an algorithm in a specific programming language, which enables a computer to execute the algorithm. Software generally refers to a computer program or a set of related computer programs.\n\nBased on the building blocks of computational thinking and programming, computer science is split into many different areas. Examples are:\n\nAlgorithms and data structures\nProgramming languages and methodology\nTheory of computation\nSoftware engineering (the design of large software systems)\nComputer architecture (the structure of the hardware)\nCommunication between computers\nOperating systems (the software that shields users from the underlying hardware)\nDatabase systems (software that handles large amounts of data efficiently)\nArtificial intelligence and Machine Learning (algorithms inspired by human information processing)\nComputer vision (algorithms that let computers see and recognize their environment)\nComputer graphics\nRobotics (algorithms that control robots)\nComputational biology (algorithms and methods that address problems inspired by biology)\nComputer science also plays an important role in many other fields, including biology, physics, engineering, business, music, and neuroscience, where it is necessary to process and reason about large amounts of data. Computer science is strongly related to mathematics, linguistics, and engineering.\n\nA degree in computer science offers excellent job prospects. The use of computers and specialized software plays a crucial role in business, science, and our personal life. Computer science graduates are in high demand. Computer scientists find jobs in software development, consulting, research, and project management. As computer scientists often develop the software for a specific application domain (e.g., business, engineering, medicine), they must be prepared and willing to get to know their application area.\n\nHow competitive: McGill admits on grades, and the lowest grades it accepts change from year to year with the applicants. For this program they have typically fallen between 35 and 38 points from the six subjects (out of 42: the core points do not count), with 5 to 6 in each maths and science subject (6 in each at SL), so 35 does not guarantee a place.',
      field: 'Computer Science',
      degree: 'Bachelor of Engineering',
      duration: '4 years',
      minIBPoints: 35,
      programUrl:
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/electrical-computer-engineering/co-op-software-engineering-beng/',
      requirements: [
        {
          anyOf: [
            { course: 'MATH-AA', level: 'HL', grade: 5 },
            { course: 'MATH-AA', level: 'SL', grade: 6 },
            { course: 'MATH-AI', level: 'HL', grade: 5 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'CHEM', level: 'HL', grade: 5 },
            { course: 'CHEM', level: 'SL', grade: 6 }
          ],
          critical: true
        },
        {
          anyOf: [
            { course: 'PHYS', level: 'HL', grade: 5 },
            { course: 'PHYS', level: 'SL', grade: 6 }
          ],
          critical: true
        }
      ],
      checkedFor: 2027,
      sources: [
        'https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib',
        'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/electrical-computer-engineering/co-op-software-engineering-beng/',
        'https://web.archive.org/web/20260203120041/https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib'
      ],
      notes:
        'Content 4.4: Software Engineering is listed at 35 to 38 subject points out of 42 (core excluded), "Each math & science: 5 to 6 (6 in each SL math & science)"; 35 and the three rows are unchanged. Re-read after 3.4, which stamped it 2026: the page now names Fall 2027. McGill\'s IB page lists the Science program groups applicants choose from, including an "Earth, Geographic, and Climate Sciences Group — TBD (new stream for Fall 2027)", and it replaced the version the Internet Archive holds from 3 February 2026, which gave "last year\'s cut-offs" for 2026 applicants; so it describes 2027 entry and the program is checked for 2027. Its ranges are "typical minimum admission grades ranges", a guide, not a guarantee. 3.4\'s note: Content 3.4: renamed, same program. The old software-engineering-beng page 404s; the catalogue now lists the B.Eng. as Co-op in Software Engineering (141-144 credits including Year 0, with mandatory co-op terms). McGill\'s IB page names no entry year, so checked for 2026 (rule 2). Software Engineering: typical minimum range 35 to 38 subject points out of 42 (core excluded); 35 is stored. Prerequisites: Mathematics, Chemistry and Physics at HL or SL, at least one math/science at HL; each 5 to 6, and 6 in each SL math and science. SL Math AI is not accepted. The stored Computer Science SL6 has no source and is removed. Content 5.4 (9 October 2026): the description\'s last paragraph, "How competitive", gives the typical minimum admission range on McGill\'s IB page ("the minimum grades ranges (out of 42) typically admitted"; "minimum grades for entry fluctuate from year to year"); update it at each refresh.'
    }
  ]
}

export default refresh
