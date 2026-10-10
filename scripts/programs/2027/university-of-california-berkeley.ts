import type { RefreshFile } from '../lib/refresh'

/**
 * University of California, Berkeley: majors added for content task 6, Part B2 (USA), under the US
 * model the owner chose on 10 October 2026 (docs/tasks/content-2027/usa-model-decision.md).
 *
 * Applicants choose a primary major on the UC application, and Berkeley reviews only that choice;
 * the colleges of Engineering, Chemistry, Environmental Design, Natural Resources and Computing,
 * Data Science, and Society, and the Haas School of Business, admit to the major on the letter,
 * while Letters & Science guarantees a place in a high-demand major chosen as primary. Each
 * program below is one major, chosen from the fields US-bound students pick. UC publishes no IB
 * minimum and no subject requirement for IB applicants, so every program has no minimum and no
 * subject rows. UC's dates page covers "fall 2027 applicants", so all are stamped 2027.
 *
 * Program pages are the UC Berkeley Catalog's program pages; each description follows its
 * Overview.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-california-berkeley
 */

/** Read on 9 and 10 October 2026, after each program's own page. */
const SOURCES = [
  'https://admission.universityofcalifornia.edu/admission-requirements/international-applicants/applying-for-admission/freshman-requirements-country.html',
  'https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/dates-and-deadlines.html',
  'https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/filling-out-the-application.html',
  'https://admissions.berkeley.edu/application-tips',
  'https://admissions.berkeley.edu/academics/ls-high-demand-major/',
  'https://opa.berkeley.edu/campus-data/common-data-set'
]

const NOTES =
  'Content 6 (Part B2, 10 October 2026): new, under the US model (owner, 10 October 2026). UC publishes no IB minimum: international applicants "must complete secondary school and be eligible to enter a competitive university in their country", predicted IB scores are reported if the school releases them, and "UC campuses do not use predicted scores as the only factor for admission"; UC "will not consider SAT or ACT test scores". So minIBPoints is null and there are no subject rows (checked, none required). Stamped 2027: UC\'s dates page names "fall 2027 applicants". The "How competitive" paragraph is from Berkeley\'s Common Data Set 2025-2026, C1 (fall 2025: 126,864 applied, 14,524 admitted; no international breakdown); update it at each refresh.'

/** The description's last paragraph (data conventions: "How competitive"). */
const HOW_COMPETITIVE =
  'How competitive: for fall 2025, UC Berkeley admitted 11% of its 126,864 first-year applicants; it publishes no separate figure for international applicants. UC sets no IB minimum and no subject requirement: international applicants must finish secondary school and be eligible for a competitive university at home, predicted IB scores are never the only factor, and SAT or ACT scores are not considered. You choose this major as your primary major when you apply, and Berkeley reviews only that choice.'

/** A program's description, ending with the "How competitive" paragraph. */
const described = (text: string, extra = '') => `${text}\n\n${HOW_COMPETITIVE}${extra}`

const refresh: RefreshFile = {
  university: 'University of California, Berkeley',
  entryYear: 2027,
  checkedOn: '2026-10-10',
  programs: [
    {
      id: 'cmv2apd1i0000dc7mu7hkwid8',
      status: 'current',
      name: 'Mechanical Engineering',
      description: described(
        'Mechanical engineers serve society by solving problems in transportation, energy, the environment and human health, from investigating the physical phenomena around us to manufacturing and evaluating products. The degree is ABET-accredited.',
        ' Admission to this college admits you to the major on your letter (Berkeley application tips).'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/16330U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/16330U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apd2h0001dc7mk0qxzhnd',
      status: 'current',
      name: 'Electrical Engineering and Computer Sciences',
      description: described(
        'The EECS major, in the College of Engineering, combines the fundamentals of computer science and electrical engineering in one major. It requires more mathematics and science than the Computer Science BA, which requires more breadth courses.',
        ' Admission to this college admits you to the major on your letter (Berkeley application tips).'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/16306U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/16306U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apd3i0002dc7mab0yzz3c',
      status: 'current',
      name: 'Aerospace Engineering',
      description: described(
        "Berkeley's aerospace engineering degree, taught by the Department of Mechanical Engineering, for students who want to design aircraft, spacecraft and the systems that fly them.",
        ' Admission to this college admits you to the major on your letter (Berkeley application tips).'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/16279U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/16279U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apd4e0003dc7m66d2c6c1',
      status: 'current',
      name: 'Chemical Engineering',
      description: described(
        'The College of Chemistry offers Chemical Engineering through its Department of Chemical and Biomolecular Engineering, an ABET-accredited Bachelor of Science in the design of chemical and biomolecular processes.',
        ' Admission to this college admits you to the major on your letter (Berkeley application tips).'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/10294U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/10294U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apd5e0004dc7motwh8h5a',
      status: 'current',
      name: 'Civil Engineering',
      description: described(
        'An ABET-accredited four-year curriculum with a strong background in engineering science, design and practice, and optional emphases in project management, environmental engineering, geosystems, structures and transportation.',
        ' Admission to this college admits you to the major on your letter (Berkeley application tips).'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/16300U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/16300U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apd6c0005dc7mldpqd5xn',
      status: 'current',
      name: 'Bioengineering',
      description: described(
        'A multidisciplinary major for students strong in the physical sciences, mathematics and biology, with concentrations in biomedical devices, imaging, cell and tissue engineering, and synthetic and computational biology.',
        ' Admission to this college admits you to the major on your letter (Berkeley application tips).'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/16288U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/16288U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apd7e0006dc7mit7sqesc',
      status: 'current',
      name: 'Materials Science and Engineering',
      description: described(
        'Materials scientists and engineers work in every aspect of technology, from designing materials for integrated circuits to materials for energy, medicine and structures.',
        ' Admission to this college admits you to the major on your letter (Berkeley application tips).'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/16328U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/16328U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apd8e0007dc7m382avo75',
      status: 'current',
      name: 'Computer Science',
      description: described(
        'The CS major of the College of Computing, Data Science, and Society emphasizes the science of computer science: theory of computation, algorithms, computer architecture, programming languages, operating systems, databases and artificial intelligence.',
        ' Admission to this college admits you to the major on your letter (Berkeley application tips).'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/A5201U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/A5201U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apd9e0008dc7mpr6p1lpf',
      status: 'current',
      name: 'Data Science',
      description: described(
        "Data Science combines computational and inferential reasoning to draw conclusions from data about the real world, with a core in mathematics, computing, probability and human contexts and ethics, and a domain emphasis of the student's choice.",
        ' Admission to this college admits you to the major on your letter (Berkeley application tips).'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/A50AMU',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/A50AMU', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apdac0009dc7ml1veldjg',
      status: 'current',
      name: 'Mathematics',
      description: described(
        "The Department of Mathematics' major leads to the Bachelor of Arts and prepares students for advanced degrees in mathematics, the physical sciences, economics and engineering, and for graduate work in business, education, law and medicine.",
        ' In Letters & Science, if you are admitted with this as your primary major you are guaranteed a place in it (High Demand Majors policy).'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/25540U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/25540U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apdb9000adc7m8e2xq9ux',
      status: 'current',
      name: 'Statistics',
      description: described(
        'A systematic grounding in applied and theoretical statistics and probability, in a department particularly strong in machine learning.',
        ' Admission to this college admits you to the major on your letter (Berkeley application tips).'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/A5891U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/A5891U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apdc9000bdc7m3c5kbvkh',
      status: 'current',
      name: 'Physics',
      description: described(
        'A broad and thorough understanding of the fundamentals of physics, rather than specialized skills; graduates go on to graduate work in many sciences or to academic, industrial and government laboratories.',
        ' In Letters & Science, if you are admitted with this as your primary major you are guaranteed a place in it (High Demand Majors policy).'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/25666U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/25666U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apdey000cdc7mj9lwrfmq',
      status: 'current',
      name: 'Chemistry',
      description: described(
        "The College of Chemistry's Bachelor of Science gives a strong foundation in experimental processes, instrumentation and quantitative analysis, with advanced mathematics and physics, for careers as professional chemists or graduate study.",
        ' Admission to this college admits you to the major on your letter (Berkeley application tips).'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/10153U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/10153U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apdfw000ddc7m263hmsn9',
      status: 'current',
      name: 'Molecular and Cell Biology',
      description: described(
        'The molecular structures and processes of cellular life and their roles in how organisms function, reproduce and develop, across biochemistry, microbiology, biophysics, genetics, cell physiology, immunology and neurobiology.',
        ' In Letters & Science, if you are admitted with this as your primary major you are guaranteed a place in it (High Demand Majors policy).'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/25974U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/25974U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apdgr000edc7mmr1x57kr',
      status: 'current',
      name: 'Economics',
      description: described(
        'A department of over 1,500 undergraduates offering courses from economic history to advanced macroeconomics, with study abroad and research opportunities.',
        ' In Letters & Science, if you are admitted with this as your primary major you are guaranteed a place in it (High Demand Majors policy).'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/25246U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/25246U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apdhp000fdc7mnxsqoyg6',
      status: 'current',
      name: 'Business Administration',
      description: described(
        'The Haas School of Business undergraduate program, leading to the Bachelor of Science; first-year applicants can enter Haas directly through its Spieker Undergraduate business program or the Global Management Program.',
        ' Admission to this college admits you to the major on your letter (Berkeley application tips).'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/70141U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/70141U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apdin000gdc7m1t5qreio',
      status: 'current',
      name: 'Environmental Economics and Policy',
      description: described(
        'The Rausser College of Natural Resources major on the economic and political institutions that shape how natural resources and the environment are developed and managed, built on microeconomic theory and resource economics.',
        ' Admission to this college admits you to the major on your letter (Berkeley application tips).'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/04779U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/04779U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apdjk000hdc7msn966rif',
      status: 'current',
      name: 'Political Science',
      description: described(
        'The exercise of power in its many forms and consequences: the ethics of power, political ideas such as liberty and justice, the historical, economic and social forces on politics, and how the US and other political systems work.',
        ' In Letters & Science, if you are admitted with this as your primary major you are guaranteed a place in it (High Demand Majors policy).'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/25699U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/25699U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apdkk000idc7mu5k16ly0',
      status: 'current',
      name: 'Psychology',
      description: described(
        'Psychology as a science that describes, understands and predicts behaviour, from sensory experience to complex cognition, genetics to culture, and early childhood to old age.',
        ' In Letters & Science, if you are admitted with this as your primary major you are guaranteed a place in it (High Demand Majors policy).'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/25780U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/25780U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apdlk000jdc7mk0j0lq5q',
      status: 'current',
      name: 'Public Health',
      description: described(
        'Offered by the School of Public Health through Letters & Science: epidemiology, biostatistics, environmental health, health behaviour and health policy, the interdisciplinary science of preventing disease and injury in communities.',
        ' In Letters & Science, if you are admitted with this as your primary major you are guaranteed a place in it (High Demand Majors policy).'
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/25789U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/25789U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apdmh000kdc7m08ajys2g',
      status: 'current',
      name: 'Media Studies',
      description: described(
        'An interdisciplinary framework from the liberal arts, social sciences and humanities for understanding the role of media in economic, social, political and cultural life, with concentrations in digital studies, global cultural studies and media law and policy.',
        ' In Letters & Science, if you are admitted with this as your primary major you are guaranteed a place in it (High Demand Majors policy).'
      ),
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/252A9U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/252A9U', ...SOURCES],
      notes: NOTES
    },
    {
      id: 'cmv2apdnf000ldc7mqe1uiat9',
      status: 'current',
      name: 'Architecture',
      description: described(
        "Berkeley's preprofessional architecture degree combines required courses in environmental design and architecture with varied individual programs, and prepares students for a Master of Architecture.",
        ' Admission to this college admits you to the major on your letter (Berkeley application tips).'
      ),
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://undergraduate.catalog.berkeley.edu/programs/19084U',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://undergraduate.catalog.berkeley.edu/programs/19084U', ...SOURCES],
      notes: NOTES
    }
  ]
}

export default refresh
