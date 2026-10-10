import type { RefreshFile } from '../lib/refresh'

/**
 * Arizona State University (Tempe): majors added for content task 6, Part B2 (USA), under the US
 * model the owner chose on 10 October 2026 (docs/tasks/content-2027/usa-model-decision.md); the
 * owner added ASU to the ten shortlisted universities as the accessible option.
 *
 * ASU admits on a formula, not holistically: international first-year applicants need a 3.00 GPA
 * (a B average) from secondary school, three years of coursework and a completed diploma; some
 * majors set higher GPA or test criteria, which each description gives. It publishes no IB rule
 * for admission, so every program has no IB minimum and no subject rows. Each program below is one
 * ASU major taught on campus, chosen from the fields US-bound students pick; online-only majors
 * are left out. The international admission page still lists the fall 2026 dates, so all are
 * stamped 2026 (refresh rule 2).
 *
 * Program pages are ASU Degree Search pages; each description follows the page. Nursing and
 * Journalism are taught at the Downtown Phoenix campus, the first location their pages list, so
 * their campus city is Phoenix (8.2).
 *
 * Dry run: npx tsx scripts/programs/refresh.ts arizona-state-university
 */

/** Read on 9 and 10 October 2026, after each program's own page. */
const SOURCES = [
  'https://admission.asu.edu/apply/international/first-year',
  'https://admission.asu.edu/contact',
  'https://uoia.asu.edu/sites/g/files/litvpz1436/files/2026-06/CDS%202025-26%20-%20ASU%20Campus%20Immersion.pdf'
]

const NOTES =
  'Content 6 (Part B2, 10 October 2026): new, under the US model (owner, 10 October 2026). ASU publishes no IB rule: international first-year applicants need "a 3.00 grade point average (GPA) ... from a secondary school", three years of coursework and a completed diploma, and "Some ASU programs may have higher admission or English proficiency requirements"; ACT or SAT scores are not required. So minIBPoints is null and there are no subject rows (checked, none required). Stamped 2026: the international page lists fall 2026 dates. The "How competitive" paragraph is from the Common Data Set 2025-2026 (ASU Campus Immersion), C1 (fall 2025: 69,617 applied, 61,533 admitted; international 8,906 applied, 8,009 admitted); update it at each refresh.'

/** The description's last paragraph (data conventions: "How competitive"). */
const HOW_COMPETITIVE =
  'How competitive: for fall 2025, ASU admitted 90% of its 8,906 international first-year applicants (88% of all 69,617). It sets no IB minimum: international first-year applicants need a 3.00 GPA (a B average) from secondary school, three years of coursework and a completed diploma, and the SAT and ACT are optional; some majors set higher criteria.'

/** A program's description, ending with the "How competitive" paragraph. */
const described = (text: string, extra = '') => `${text}\n\n${HOW_COMPETITIVE}${extra}`

const refresh: RefreshFile = {
  university: 'Arizona State University',
  entryYear: 2027,
  checkedOn: '2026-10-10',
  programs: [
    {
      status: 'new',
      name: 'Mechanical Engineering',
      description: described(
        'Mechanical engineers design, build and control the devices, machines, processes and systems that are the mainstay of modern industrial society, from spacecraft to sustainable energy systems.',
        " The Ira A. Fulton Schools of Engineering also ask for a 1210 SAT or 24 ACT, or a 3.00 GPA in ASU's competency courses, or a top 25% class rank."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/ESMAEMBSE/mechanical-engineering',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://degrees.asu.edu/bachelors/major/ASU00/ESMAEMBSE/mechanical-engineering',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Electrical Engineering',
      description: described(
        'How electricity powers the world, and how to identify and solve complex problems with the principles of engineering, science and mathematics.',
        " The Ira A. Fulton Schools of Engineering also ask for a 1210 SAT or 24 ACT, or a 3.00 GPA in ASU's competency courses, or a top 25% class rank."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/ESEEEBSE/electrical-engineering',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://degrees.asu.edu/bachelors/major/ASU00/ESEEEBSE/electrical-engineering',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Civil Engineering',
      description: described(
        'Turning raw materials into skyscrapers, bridges and sustainable cities, with hands-on projects that build problem-solving skills and technical expertise.',
        " The Ira A. Fulton Schools of Engineering also ask for a 1210 SAT or 24 ACT, or a 3.00 GPA in ASU's competency courses, or a top 25% class rank."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/ESCEEBSE/civil-engineering',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://degrees.asu.edu/bachelors/major/ASU00/ESCEEBSE/civil-engineering',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Chemical Engineering',
      description: described(
        'Chemistry, physics and mathematics applied to converting raw materials and chemicals into more useful or valuable forms, and to designing new materials and chemical products.',
        " The Ira A. Fulton Schools of Engineering also ask for a 1210 SAT or 24 ACT, or a 3.00 GPA in ASU's competency courses, or a top 25% class rank."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/ESCHEBSE/chemical-engineering',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://degrees.asu.edu/bachelors/major/ASU00/ESCHEBSE/chemical-engineering',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Aerospace Engineering (Aeronautics)',
      description: described(
        'The technologies behind the design and development of aerospace vehicles and systems; the aeronautics concentration centres on aircraft and helicopters.',
        " The Ira A. Fulton Schools of Engineering also ask for a 1210 SAT or 24 ACT, or a 3.00 GPA in ASU's competency courses, or a top 25% class rank."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://degrees.asu.edu/bachelors/major/ASU00/ESAEROBSE/aerospace-engineering-aeronautics',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://degrees.asu.edu/bachelors/major/ASU00/ESAEROBSE/aerospace-engineering-aeronautics',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Biomedical Engineering',
      description: described(
        'Designing medical technologies, analysing biological systems and applying data and artificial intelligence to clinical and biomedical problems.',
        " The Ira A. Fulton Schools of Engineering also ask for a 1210 SAT or 24 ACT, or a 3.00 GPA in ASU's competency courses, or a top 25% class rank."
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/ESBMEBSE/biomedical-engineering',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://degrees.asu.edu/bachelors/major/ASU00/ESBMEBSE/biomedical-engineering',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Computer Science',
      description: described(
        'A strong mathematical foundation with hands-on programming and project-based work, pairing rigorous theory with building software that works.',
        " The Ira A. Fulton Schools of Engineering also ask for a 1210 SAT or 24 ACT, or a 3.00 GPA in ASU's competency courses, or a top 25% class rank."
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/ESCSEBS/computer-science',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://degrees.asu.edu/bachelors/major/ASU00/ESCSEBS/computer-science',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Data Science',
      description: described(
        'Statistical, computational and mathematical tools for finding patterns in large, complex data, preparing critical analysts for business, research and government.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/LADATSCIBS/data-science',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://degrees.asu.edu/bachelors/major/ASU00/LADATSCIBS/data-science',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Mathematics',
      description: described(
        'A deep grounding in theoretical and applied mathematics: differential equations, modelling, numerical analysis, number theory, topology, cryptography and real analysis.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/LAMATBS/mathematics',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://degrees.asu.edu/bachelors/major/ASU00/LAMATBS/mathematics', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Physics',
      description: described(
        'The science that underpins most others: the fundamental principles of matter behind engineering, astronomy, chemistry and biochemistry.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/LAPHYBS/physics',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://degrees.asu.edu/bachelors/major/ASU00/LAPHYBS/physics', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Chemistry',
      description: described(
        'Broad expertise across organic, inorganic, analytical, physical and biological chemistry: the full foundation a professional chemist needs.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/LACHMBS/chemistry',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://degrees.asu.edu/bachelors/major/ASU00/LACHMBS/chemistry', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Biological Sciences',
      description: described(
        'The diversity of living systems and the connections that sustain life, with flexible specializations and hands-on research in faculty laboratories.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/LABSCBS/biological-sciences',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://degrees.asu.edu/bachelors/major/ASU00/LABSCBS/biological-sciences',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Neuroscience',
      description: described(
        "How the brain and nervous system work, drawing on the Department of Psychology's research and its links with Barrow Neurological Institute, Mayo Clinic and the Translational Genomics Research Institute."
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/LABMENBS/neuroscience',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://degrees.asu.edu/bachelors/major/ASU00/LABMENBS/neuroscience', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Nursing',
      description: described(
        'Evidence-based practice, clinical reasoning, innovation, interprofessional communication and information technology, in the Edson College of Nursing and Health Innovation.',
        " Edson College also asks for a top 10% class rank, or a 3.80 GPA in ASU's competency courses, or a 3.50 GPA with a 25 ACT or 1230 SAT."
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      campusCity: 'Phoenix',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/NUNURDBSN/nursing',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://degrees.asu.edu/bachelors/major/ASU00/NUNURDBSN/nursing', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Economics',
      description: described(
        'The analytical tools to identify trends, inform policy decisions and address societal challenges, and how economies function, in the W. P. Carey School of Business.',
        " The W. P. Carey School of Business also asks for a 1230 SAT or 25 ACT, a top 8% class rank, or a 3.40 GPA in ASU's competency courses."
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/BAECNBS/economics',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://degrees.asu.edu/bachelors/major/ASU00/BAECNBS/economics', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Finance',
      description: described(
        'Corporate finance, investments, valuation and financial modelling, to evaluate companies, markets and financial decisions.',
        " The W. P. Carey School of Business also asks for a 1230 SAT or 25 ACT, a top 8% class rank, or a 3.40 GPA in ASU's competency courses."
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/BAFINBS/finance',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://degrees.asu.edu/bachelors/major/ASU00/BAFINBS/finance', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Management',
      description: described(
        'Management as measurable behaviours that drive performance, taught by award-winning faculty, with the skills to lead a thriving team.',
        " The W. P. Carey School of Business also asks for a 1230 SAT or 25 ACT, a top 8% class rank, or a 3.40 GPA in ASU's competency courses."
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/BAMGTBS/management',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://degrees.asu.edu/bachelors/major/ASU00/BAMGTBS/management', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Psychology',
      description: described(
        'How biological, cognitive, developmental and social forces shape human and animal behaviour, with scientific reasoning, data analysis and quantitative methods.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/LAPGSBS/psychology',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://degrees.asu.edu/bachelors/major/ASU00/LAPGSBS/psychology', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Political Science',
      description: described(
        'How political institutions, public policies and governing systems shape societies, with research, analysis and persuasive skills for law school, campaigns or diplomacy.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/LAPOSBA/political-science',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://degrees.asu.edu/bachelors/major/ASU00/LAPOSBA/political-science',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Journalism',
      description: described(
        "The Walter Cronkite School of Journalism and Mass Communication's Bachelor of Arts: reporting, producing and audience engagement, publishing stories for real audiences."
      ),
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      campusCity: 'Phoenix',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/CSJMCBA/journalism',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://degrees.asu.edu/bachelors/major/ASU00/CSJMCBA/journalism', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Sustainability',
      description: described(
        'Environmental, economic and societal challenges tackled through science, systems thinking and hands-on experience, in the Rob Walton College of Global Futures.'
      ),
      field: 'Environmental Studies',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/SUSUSTBS/sustainability',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://degrees.asu.edu/bachelors/major/ASU00/SUSUSTBS/sustainability',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Architectural Studies',
      description: described(
        'Space and environments and how people engage with them: the intellectual, artistic and technical skills for a future in architecture, in the Herberger Institute for Design and the Arts.'
      ),
      field: 'Architecture',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://degrees.asu.edu/bachelors/major/ASU00/ARSTDBSD/architectural-studies',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://degrees.asu.edu/bachelors/major/ASU00/ARSTDBSD/architectural-studies',
        ...SOURCES
      ],
      notes: NOTES
    }
  ]
}

export default refresh
