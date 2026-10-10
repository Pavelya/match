import type { RefreshFile } from '../lib/refresh'

/**
 * Harvard University: Harvard College concentrations added for content task 6, Part B2 (USA),
 * under the US model the owner chose on 10 October 2026
 * (docs/tasks/content-2027/usa-model-decision.md).
 *
 * Students apply to Harvard College and choose a concentration, Harvard's word for a major, from
 * 50 fields; each program below is one concentration, chosen from the fields US-bound students
 * pick, with the degree the College lists for it. Harvard publishes no IB minimum and no subject
 * requirement, so every program has no minimum and no subject rows. Harvard's first-year pages
 * name no intake, so all are stamped 2026 (refresh rule 2).
 *
 * Program pages are the departments' undergraduate pages, as linked from the College's
 * concentrations page, which also gives each description's source text. The fas.harvard.edu
 * department sites and www.math.harvard.edu answered scripts with 403 (a bot check) on 10 October
 * 2026; the links come from the College's own page.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts harvard-university
 */

/** Read on 9 and 10 October 2026, after each program's own page. */
const SOURCES = [
  'https://college.harvard.edu/admissions/apply/international-applicants',
  'https://college.harvard.edu/academics/liberal-arts-sciences/concentrations',
  'https://college.harvard.edu/admissions/apply/first-year-applicants',
  'https://oira.harvard.edu/factbook/fact-book-admissions/'
]

const NOTES =
  'Content 6 (Part B2, 10 October 2026): new, under the US model (owner, 10 October 2026). Harvard publishes no IB minimum and no subject requirement; it requires the SAT or ACT, and "IB Actual or Predicted Scores" meet that requirement only in exceptional cases (international applicants page). So minIBPoints is null and there are no subject rows (checked, none required). Stamped 2026: Harvard\'s first-year pages name no intake. Harvard publishes no Common Data Set; the "How competitive" paragraph is from the Office of Institutional Research and Analytics\' Fact Book (Class of 2029: 47,893 applicants, 2,003 admitted, 4.2%; no international figure); update it at each refresh.'

/** The description's last paragraph (data conventions: "How competitive"). */
const HOW_COMPETITIVE =
  "How competitive: for the Class of 2029, which entered in fall 2025, Harvard admitted 4.2% of its 47,893 applicants; it publishes no separate figure for international applicants. It sets no IB minimum and no subject requirement, and it requires the SAT or ACT: IB results, final or predicted, count in their place only in exceptional cases. Students apply to Harvard College and choose a concentration, Harvard's name for a major, from 50 fields."

/** A program's description, ending with the "How competitive" paragraph. */
const described = (text: string, extra = '') => `${text}\n\n${HOW_COMPETITIVE}${extra}`

const refresh: RefreshFile = {
  university: 'Harvard University',
  entryYear: 2027,
  checkedOn: '2026-10-10',
  programs: [
    {
      status: 'new',
      name: 'Computer Science',
      description: described(
        'Computer science at Harvard is about tools and technology and about understanding the world: the computational viewpoint applies to systems from swarms of insects to markets and neurons. The concentration has strong ties to engineering, economics, law, biology, physics, statistics, mathematics and linguistics.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://seas.harvard.edu/computer-science/undergraduate-program',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://seas.harvard.edu/computer-science/undergraduate-program', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Electrical Engineering',
      description: described(
        'Electrical engineering builds the information and communication pathways that link us and the devices and systems that send, receive, store and compute on information ever faster. Harvard offers it as an accredited Bachelor of Science and as a Bachelor of Arts.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://seas.harvard.edu/electrical-engineering/undergraduate-programs',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://seas.harvard.edu/electrical-engineering/undergraduate-programs',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Mechanical Engineering',
      description: described(
        'Mechanical engineering uses the principles of physics and materials science to analyse and design mechanical and thermal systems, central to energy, transportation, manufacturing and infrastructure.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://seas.harvard.edu/materials-science-mechanical-engineering',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://seas.harvard.edu/materials-science-mechanical-engineering', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Biomedical Engineering',
      description: described(
        'Biomedical engineering lies where the physical and life sciences meet, using physics and chemistry to understand how living systems work. Its approach is quantitative: mathematical analysis and modelling of systems from the subcellular to the whole organism.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://seas.harvard.edu/bioengineering/undergraduate-program',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://seas.harvard.edu/bioengineering/undergraduate-program', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Engineering Sciences',
      description: described(
        'The Engineering Sciences program gives future engineers the technical background to develop and evaluate engineering innovations, apply them to local and global problems and decide about them in their social context. Harvard offers it as an accredited Bachelor of Science and as a Bachelor of Arts.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://seas.harvard.edu/about-us/school-overview/accreditation-abet/engineering-sciences-sb',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://seas.harvard.edu/about-us/school-overview/accreditation-abet/engineering-sciences-sb',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Environmental Science and Engineering',
      description: described(
        'An interdisciplinary program for understanding, predicting and responding to natural and human-induced environmental change, from global warming to air and water pollution, drawing on atmospheric physics and chemistry, oceanography, hydrology, geophysics and ecology.'
      ),
      field: 'Environmental Studies',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://seas.harvard.edu/environmental-science-engineering/undergraduate-program',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://seas.harvard.edu/environmental-science-engineering/undergraduate-program',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Environmental Science and Public Policy',
      description: described(
        'A multidisciplinary introduction to current environmental problems, combining the underlying science and technology with their economic, political, legal, historical and ethical dimensions.'
      ),
      field: 'Environmental Studies',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://espp.fas.harvard.edu/pages/academics',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://espp.fas.harvard.edu/pages/academics', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Applied Mathematics',
      description: described(
        "Applied mathematics is a quantitative liberal arts degree that combines mathematical thinking with an application area of the student's choice, from physics or biology to economics."
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://seas.harvard.edu/applied-mathematics/undergraduate-program',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://seas.harvard.edu/applied-mathematics/undergraduate-program', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Mathematics',
      description: described(
        'Mathematics is the science of order: finding the tools to perceive order where it is hidden. The concentration builds from analysis and algebra to the fields of modern mathematics.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.math.harvard.edu/undergraduate/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://www.math.harvard.edu/undergraduate/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Statistics',
      description: described(
        'Statistics is the body of principled methods for collecting and analysing data, making rational decisions under uncertainty and modelling randomness, with a theoretical core and applications across the social, natural and medical sciences.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://statistics.fas.harvard.edu/undergraduate',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://statistics.fas.harvard.edu/undergraduate', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Physics',
      description: described(
        'Physics studies the fundamental laws that govern all matter (relativity, quantum mechanics and the basic forces), from molecules, atoms and sub-nuclear particles to the properties those laws give rise to in larger systems.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.physics.harvard.edu/undergrad',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://www.physics.harvard.edu/undergrad', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Chemistry',
      description: described(
        'Chemistry is the science of the structure, properties and reactions of matter: a basic science for understanding the world and a practical one with a great variety of applications, fundamental to biology, biochemistry and engineering.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://chemistry.harvard.edu/undergraduate-programs',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://chemistry.harvard.edu/undergraduate-programs', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Molecular and Cellular Biology',
      description: described(
        'Molecular and Cellular Biology investigates biological processes through molecules and their interactions in cells and tissues, and how the genome orchestrates cell behaviour.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.mcb.harvard.edu/undergraduate/molecular-and-cellular-biology-mcb/',
      requirements: [],
      checkedFor: 2026,
      sources: [
        'https://www.mcb.harvard.edu/undergraduate/molecular-and-cellular-biology-mcb/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Neuroscience',
      description: described(
        'Neuroscience asks how billions of neurons create sensory, emotional and intellectual life and all animal behaviour. The field is interdisciplinary, drawing on genetics, chemistry, molecular biology, mathematics, systems biology, computer science and cognitive science.'
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.mcb.harvard.edu/undergraduate/neuroscience/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://www.mcb.harvard.edu/undergraduate/neuroscience/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Economics',
      description: described(
        'Economics studies social systems such as markets, corporations, legislatures and families as the outcome of interactions between goal-directed individuals, and makes recommendations meant to leave people better off.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://economics.harvard.edu/undergraduate',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://economics.harvard.edu/undergraduate', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Government',
      description: described(
        "Harvard's Department of Government is, like political science, an umbrella for a wide range of political subjects and ways of studying them, at the crossroads of history, law, economics, sociology, philosophy and ethics."
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://www.gov.harvard.edu/undergraduate/',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://www.gov.harvard.edu/undergraduate/', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Psychology',
      description: described(
        'Psychology is the scientific study of the mind, at every level from measurements of the brain to individuals, groups and organizations, with research on attention, perception, memory, reasoning and decision-making.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://psychology.fas.harvard.edu/undergraduate',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://psychology.fas.harvard.edu/undergraduate', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'History',
      description: described(
        'History covers every dimension of human interaction in the past (social life, the economy, culture, thought and politics) with the techniques of the humanities and social sciences, in courses that span the globe.'
      ),
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://history.fas.harvard.edu/undergraduate-programs',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://history.fas.harvard.edu/undergraduate-programs', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'English',
      description: described(
        'The English concentration makes students expert makers and interpreters of stories: analysing and appreciating the language of the past, crafting new narratives and communicating meaningfully through language.'
      ),
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://english.fas.harvard.edu/undergraduate',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://english.fas.harvard.edu/undergraduate', ...SOURCES],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Philosophy',
      description: described(
        "Philosophy studies humanity's fundamental questions (how to live, what society to strive for, the limits of knowledge, truth, justice and beauty) systematically and rigorously, through careful argument."
      ),
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://philosophy.fas.harvard.edu/welcome-undergraduate',
      requirements: [],
      checkedFor: 2026,
      sources: ['https://philosophy.fas.harvard.edu/welcome-undergraduate', ...SOURCES],
      notes: NOTES
    }
  ]
}

export default refresh
