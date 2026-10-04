import type { RefreshFile } from '../lib/refresh'

/**
 * Vrije Universiteit Brussel: its English-taught bachelor's programmes, added for content task 5.1
 * and created, with the university, on 4 October 2026. Both admission pages give the application
 * deadlines for 2027 (1 April 2027 with a visa, 1 August 2027 without), so both are stamped 2027.
 * Not added: the multilingual Linguistics and Literary Studies bachelor's, taught in English with
 * French or Dutch.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts vrije-universiteit-brussel
 */

const BASE =
  'https://www.vub.be/en/studying-vub/all-study-programmes-vub/bachelors-and-masters-programmes-vub'
/** The admission pages moved here; the programme pages did not. */
const ADMISSION_BASE =
  'https://www.vub.be/en/all-study-programmes-vub/bachelors-and-masters-programmes-vub'
const REQUIREMENTS =
  'https://www.vub.be/en/studying-vub/apply-and-enrol-vub/admission-requirements-and-deadlines/academic-and-language-requirements'
const EQUIVALENT =
  'https://www.vub.be/sites/default/files/2025-08/2025_Start_je_inschrijving_hier_Gelijkgestelde_diplomas_ENG.pdf'

const RULE =
  "VUB's list of secondary school certificates equivalent to a Flemish diploma includes the International Baccalaureate Diploma, which gives direct access to its bachelor's programmes with proof of English; the screening criteria (a GPA of 3.0 out of 4.0, 70% or more, and a motivation letter) apply only to certificates that are not equivalent. VUB publishes no IB points figure, so 24, the Diploma. Checked, none required: no IB subject is set. English: a secondary diploma taught entirely in English, or a B2 test (TOEFL iBT 79 or 4.5, IELTS 6.5 with 6.0 in each part, ITACE B2 and others)."
const DATES =
  'Applications open in mid-November; apply before 1 April 2027 if a student visa is needed, before 1 August 2027 otherwise. Stamped 2027.'

const refresh: RefreshFile = {
  university: 'Vrije Universiteit Brussel',
  entryYear: 2027,
  checkedOn: '2026-10-04',
  programs: [
    {
      id: 'cmutgqecn0054lj7mhqi2bjib',
      status: 'current',
      name: 'Business Economics',
      description:
        "VUB's English-taught Business Economics programme builds strong analytical, mathematical and empirical skills for understanding economic trends, assessing risks and making data-driven business decisions. Starting from core economic theories and models, it moves on to macroeconomics, microeconomics, public finance and international monetary economics, applied in courses such as marketing, management, corporate finance and strategic brand management.\n\nIn the final year you choose a specialisation in International Business or Business & Technology. The programme stresses people skills and offers international exchanges, at VUB's Solvay Business School in Brussels.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/bachelor-business-economics`,
      requirements: [],
      checkedFor: 2027,
      sources: [
        `${ADMISSION_BASE}/bachelor-business-economics/bachelor-business-economics-admission-enrolment`,
        `${BASE}/bachelor-business-economics`,
        REQUIREMENTS,
        EQUIVALENT
      ],
      notes: `Content 5.1: new. ${RULE} VUB expects a solid prior knowledge of mathematics, taken throughout secondary school, and publishes the maths prerequisites to check before starting; not a stated condition, so not stored. ${DATES} Bachelor of Science in Business Economics, 180 ECTS.`
    },
    {
      id: 'cmutgqedl0055lj7m2tk2211z',
      status: 'current',
      name: 'Social Sciences (with Ghent University)',
      description:
        'The Bachelor in Social Sciences is an interdisciplinary programme offered jointly by Vrije Universiteit Brussel and Ghent University, with a problem-centred curriculum. It gives a broad foundation in sociology, political science and communication studies, with research methods such as statistical analysis, interviewing, participant observation and content analysis.\n\nThe first two years are shared by all students; in the third year you specialise in Sociology, Communication Studies or Political Sciences. Teaching is in English, in both Brussels and Ghent, and students hold student cards at both universities.',
      field: 'Social Sciences',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/bachelor-social-sciences`,
      requirements: [],
      checkedFor: 2027,
      sources: [
        `${ADMISSION_BASE}/bachelor-social-sciences/bachelor-social-sciences-admission-enrolment`,
        `${BASE}/bachelor-social-sciences`,
        REQUIREMENTS,
        EQUIVALENT
      ],
      notes: `Content 5.1: new. ${RULE} VUB expects mathematics throughout secondary school and offers an optional online self-test; not a stated condition, so not stored. ${DATES} Joint programme of VUB and Ghent University, stored once, at VUB. Bachelor of Science in Social Sciences, 180 ECTS.`
    }
  ]
}

export default refresh
