import type { RefreshFile } from '../lib/refresh'

/**
 * New York University (New York campus): programs added for content task 6, Part B2 (USA), under
 * the US model the owner chose on 10 October 2026 (docs/tasks/content-2027/usa-model-decision.md).
 *
 * Applicants choose their campus and programs of interest on the NYU page of the Common App, so
 * each program below is one NYU program in the school that teaches it (College of Arts and
 * Science, Stern, Tandon, Rory Meyers College of Nursing), chosen from the fields US-bound
 * students pick. NYU publishes no IB minimum. Its standardized testing page says Stern and Tandon
 * applicants "should take" Mathematics: Analysis and Approaches HL or SL, or Applications and
 * Interpretation HL; that is advice, not a requirement (owner's decision 4), so it is in the
 * description and there are no subject rows. The same page sets NYU's policy "through the
 * 2027-2028 application cycle", so all are stamped 2027.
 *
 * Program pages are the NYU Bulletins' program pages; each description follows the bulletin. NYU
 * Abu Dhabi and NYU Shanghai are separate campuses and are not added. Tandon teaches in Brooklyn,
 * part of New York City, so no campus city is set.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts new-york-university
 */

/** Read on 9 and 10 October 2026, after each program's own page. */
const SOURCES = [
  'https://www.nyu.edu/admissions/undergraduate-admissions/how-to-apply/standardized-tests.html',
  'https://www.nyu.edu/admissions/undergraduate-admissions/how-to-apply/international-applicants.html',
  'https://www.nyu.edu/admissions/undergraduate-admissions/how-to-apply/all-freshmen-applicants.html',
  'https://www.nyu.edu/content/dam/nyu/institutionalResearch/documents/cds-2025-2026/CDS%202025-2026%20FINAL%20(no%20G).pdf'
]

const NOTES =
  'Content 6 (Part B2, 10 October 2026): new, under the US model (owner, 10 October 2026). NYU publishes no IB minimum: the IB Diploma counts as one of its testing options ("Predictions or Final Results can be submitted"), and NYU is test-optional "through the 2027-2028 application cycle". Stern and Tandon applicants "should take" Maths AA HL or SL, or Maths AI HL: advice, not a requirement, so no subject rows (checked, none required). Stamped 2027 on that testing page. The "How competitive" paragraph is from the Common Data Set 2025-2026, C1 (fall 2025: 114,125 applied, 10,340 admitted; no international breakdown); update it at each refresh.'

/** The description's last paragraph (data conventions: "How competitive"). */
const HOW_COMPETITIVE =
  "How competitive: for fall 2025, NYU admitted 9.1% of its 114,125 first-year applicants; it publishes no separate figure for international applicants. It sets no IB minimum: your IB predictions or final results can serve as your testing, and the SAT and ACT are optional through the 2027-2028 application cycle. You choose NYU's campus and programs on the Common App."

/** A program's description, ending with the "How competitive" paragraph. */
const described = (text: string, extra = '') => `${text}\n\n${HOW_COMPETITIVE}${extra}`

const refresh: RefreshFile = {
  university: 'New York University',
  entryYear: 2027,
  checkedOn: '2026-10-10',
  programs: [
    {
      status: 'new',
      name: 'Mechanical Engineering',
      description: described(
        'Mechanical engineering builds the physical systems and devices of modern society, from air conditioning and automobiles to robots, power plants, artificial limbs and rocket engines, with hands-on computer and laboratory work.',
        ' This program is in the Tandon School of Engineering, whose applicants should take Maths AA at HL or SL, or Maths AI at HL.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://bulletins.nyu.edu/undergraduate/engineering/programs/mechanical-engineering-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/engineering/programs/mechanical-engineering-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Electrical Engineering',
      description: described(
        'From subway systems to smartphones, innovations by electrical engineers touch every part of modern life, and the program trains the next generation of them.',
        ' This program is in the Tandon School of Engineering, whose applicants should take Maths AA at HL or SL, or Maths AI at HL.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://bulletins.nyu.edu/undergraduate/engineering/programs/electrical-engineering-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/engineering/programs/electrical-engineering-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Civil Engineering',
      description: described(
        'The design, construction and operation of the built environment, from individual structures such as bridges and skyscrapers to transportation and water supply networks.',
        ' This program is in the Tandon School of Engineering, whose applicants should take Maths AA at HL or SL, or Maths AI at HL.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://bulletins.nyu.edu/undergraduate/engineering/programs/civil-engineering-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/engineering/programs/civil-engineering-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Chemical and Biomolecular Engineering',
      description: described(
        'Broad scientific and engineering principles applied to chemical, pharmaceutical, consumer product and materials industries, also preparing for graduate study in engineering, medicine, business and law.',
        ' This program is in the Tandon School of Engineering, whose applicants should take Maths AA at HL or SL, or Maths AI at HL.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://bulletins.nyu.edu/undergraduate/engineering/programs/chemical-biomolecular-engineering-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/engineering/programs/chemical-biomolecular-engineering-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Computer Engineering',
      description: described(
        'Computer-based devices and information networks, and the work they make possible, from reconstructing genomes to designing robots and business software.',
        ' This program is in the Tandon School of Engineering, whose applicants should take Maths AA at HL or SL, or Maths AI at HL.'
      ),
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://bulletins.nyu.edu/undergraduate/engineering/programs/computer-engineering-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/engineering/programs/computer-engineering-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Computer Science (Tandon)',
      description: described(
        "How to design, build and use the computers and systems people rely on every day, from smartphones to the databases of banks and hospitals; the Tandon School of Engineering's computer science degree.",
        ' This program is in the Tandon School of Engineering, whose applicants should take Maths AA at HL or SL, or Maths AI at HL.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://bulletins.nyu.edu/undergraduate/engineering/programs/computer-science-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/engineering/programs/computer-science-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Computer Science (Arts and Science)',
      description: described(
        'Computing in theory and application, in the Department of Computer Science of the Courant Institute of Mathematical Sciences, a world-renowned centre for mathematics and computer science.',
        ' This program is in the College of Arts and Science.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/computer-science-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/computer-science-ba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Data Science',
      description: described(
        'Rigorous training in statistical modelling, machine learning and data-driven reasoning, grounded in computer science and mathematics, with attention to ethics.',
        ' This program is in the College of Arts and Science.'
      ),
      field: 'Computer Science',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletins.nyu.edu/undergraduate/arts-science/programs/data-science-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/data-science-ba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Business',
      description: described(
        "The Stern School of Business's STEM-certified Bachelor of Science, combining business fundamentals with a broad liberal arts foundation.",
        ' This program is in the Stern School of Business, whose applicants should take Maths AA at HL or SL, or Maths AI at HL.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletins.nyu.edu/undergraduate/business/programs/business-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/business/programs/business-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Economics',
      description: described(
        'Individual and group decision-making, the structure of markets and economies, and the relations between regions in the global economy.',
        ' This program is in the College of Arts and Science.'
      ),
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletins.nyu.edu/undergraduate/arts-science/programs/economics-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/economics-ba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Mathematics',
      description: described(
        'Pure and applied mathematics taught by the faculty of the Courant Institute of Mathematical Sciences, a leading research centre that integrates mathematical theory and applications.',
        ' This program is in the College of Arts and Science.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletins.nyu.edu/undergraduate/arts-science/programs/mathematics-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/mathematics-ba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Physics',
      description: described(
        'The most basic of the natural sciences: understanding the world on every scale of length, time and energy through fundamental models that quantitatively explain observation and experiment.',
        ' This program is in the College of Arts and Science.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletins.nyu.edu/undergraduate/arts-science/programs/physics-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/physics-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Chemistry',
      description: described(
        "The Bachelor of Science of NYU's Department of Chemistry, one of the oldest in the College of Arts and Science, where the American Chemical Society was founded in 1876.",
        ' This program is in the College of Arts and Science.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletins.nyu.edu/undergraduate/arts-science/programs/chemistry-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/chemistry-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Biology',
      description: described(
        'The workings of life in all its forms, from microbes to animals and plants and from molecular and cellular processes to ecosystems, in a department with world-class laboratories.',
        ' This program is in the College of Arts and Science.'
      ),
      field: 'Natural Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletins.nyu.edu/undergraduate/arts-science/programs/biology-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/biology-ba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Neural Science',
      description: described(
        'The function of the brain across disciplines, from molecular and cellular mechanisms in nerve cells to the behaviour of whole organisms, with mathematical and computational modelling.',
        ' This program is in the College of Arts and Science.'
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/neural-science-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/neural-science-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Nursing',
      description: described(
        "Rory Meyers College of Nursing's four-year Bachelor of Science, which first-year students enter in the fall: arts and science courses with a progression of nursing courses, preparing for the NCLEX licensure examination.",
        ' This program is in the Rory Meyers College of Nursing.'
      ),
      field: 'Medicine & Health',
      degree: 'Bachelor of Science',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://bulletins.nyu.edu/undergraduate/nursing/programs/nursing-traditional-4-year-bs/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/nursing/programs/nursing-traditional-4-year-bs/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Politics',
      description: described(
        'A deeper analytical understanding of political events grounded in logic and evidence, in the Wilf Family Department of Politics.',
        ' This program is in the College of Arts and Science.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletins.nyu.edu/undergraduate/arts-science/programs/politics-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/politics-ba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'International Relations',
      description: described(
        "The global system's past, the tools to work in it today and to respond to future developments, on an interdisciplinary basis, in the Wilf Family Department of Politics.",
        ' This program is in the College of Arts and Science.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/international-relations-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/international-relations-ba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Psychology',
      description: described(
        'Mind and behaviour from many perspectives: cognitive psychology, social and personality psychology, cognitive neuroscience and developmental psychology.',
        ' This program is in the College of Arts and Science.'
      ),
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletins.nyu.edu/undergraduate/arts-science/programs/psychology-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/psychology-ba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Journalism',
      description: described(
        'Journalism with a public mission: the skills of reporting, research, writing and multimedia storytelling.',
        ' This program is in the College of Arts and Science.'
      ),
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletins.nyu.edu/undergraduate/arts-science/programs/journalism-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/journalism-ba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Environmental Studies',
      description: described(
        'The breadth of understanding and skills to resolve environmental questions and build a sustainable future from local to global scale, through integrated, problem-oriented study across disciplines.',
        ' This program is in the College of Arts and Science.'
      ),
      field: 'Environmental Studies',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/environmental-studies-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/environmental-studies-ba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'Urban Design and Architecture Studies',
      description: described(
        'An interdisciplinary, analytic approach to the physical city, with a humanistic perspective and preprofessional training for future architects, city planners, public administrators and writers on urban problems.',
        ' This program is in the College of Arts and Science.'
      ),
      field: 'Architecture',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl:
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/urban-design-architecture-studies-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/urban-design-architecture-studies-ba/',
        ...SOURCES
      ],
      notes: NOTES
    },
    {
      status: 'new',
      name: 'History',
      description: described(
        'The study of human experience in its times and places, and a method of thinking that teaches students to analyse and interpret cultural, social, economic and political evidence.',
        ' This program is in the College of Arts and Science.'
      ),
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      minIBPoints: null,
      programUrl: 'https://bulletins.nyu.edu/undergraduate/arts-science/programs/history-ba/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://bulletins.nyu.edu/undergraduate/arts-science/programs/history-ba/',
        ...SOURCES
      ],
      notes: NOTES
    }
  ]
}

export default refresh
