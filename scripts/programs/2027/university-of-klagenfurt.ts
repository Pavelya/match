import type { RefreshFile } from '../lib/refresh'

/**
 * University of Klagenfurt: its six English-taught bachelor's programmes, added for content task
 * 5.1 and created, with the university, on 4 October 2026. The admission pages give the periods for
 * winter semester 2026/27 and summer semester 2027 and name no rule for 2027/28, so every program
 * is stamped 2026 (refresh rule 2).
 *
 * Dry run: npx tsx scripts/programs/refresh.ts university-of-klagenfurt
 */

const BASE = 'https://www.aau.at/en/studien'
const ADMISSION =
  'https://www.aau.at/en/study/studying-at-aau/applying/admission-bachelor-programme/admission-bachelor-non-at-de/'
const MINISTRY =
  'https://www.bmwet.gv.at/bmafjgvat/wissenschaft/anerkennung/universit%C3%A4tsreife.html'

const RULE =
  'Klagenfurt asks for a general university entrance qualification and English at B2 (CEFR); the Austrian science ministry states that a properly obtained IB Diploma is one. Klagenfurt publishes no IB points figure or subject, so 24, the Diploma. Checked, none required: no IB subject is named.'
const OPEN = 'No entrance exam: the general admission procedure admits every qualified applicant.'
const DATES =
  'Non-EU applicants apply 1 April to 30 June for the winter semester; EU/EEA applicants at any time; admission for winter semester 2026/27 ran 6 July to 5 September 2026. The pages name no 2027/28 rule, so stamped 2026.'

const sources = (slug: string, ...extra: string[]) => [
  `${BASE}/${slug}/`,
  ADMISSION,
  MINISTRY,
  ...extra
]

const refresh: RefreshFile = {
  university: 'University of Klagenfurt',
  entryYear: 2027,
  checkedOn: '2026-10-04',
  programs: [
    {
      id: 'cmutgqe55004ylj7mm8gskm3b',
      status: 'current',
      name: 'Robotics and Artificial Intelligence',
      description:
        "The Bachelor's programme in Robotics and Artificial Intelligence gives a theoretical foundation in robotics and AI alongside hands-on seminars with robots and drones. It covers computer science and software development in every phase, from planning and design to implementation and testing, and artificial intelligence: automating smart behaviour and enabling machines to learn on their own.\n\nStudents work with cyber-physical systems and have access to labs that include one of Europe's largest indoor drone flight halls. The programme is taught entirely in English in Klagenfurt.",
      field: 'Computer Science',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/bachelor-robotics-artificial-intelligence/`,
      requirements: [],
      checkedFor: 2026,
      sources: sources('bachelor-robotics-artificial-intelligence'),
      notes: `Content 5.1: new. ${RULE} ${OPEN} ${DATES} Bachelor of Science (BSc); 6 semesters, 180 ECTS.`
    },
    {
      id: 'cmutgqe61004zlj7mtottu1bn',
      status: 'current',
      name: 'Information and Communications Engineering',
      description:
        "The Bachelor's programme in Information and Communications Engineering goes deep into computer science, electrical engineering, physics and mathematics, showing how technical systems capture, transmit, process and secure information. You learn programming, networks, electronic circuits and sensors, signal processing, measurement and control, working with smart devices, robotics, 6G networks and the Internet of Things.\n\nTheory, lab exercises and project work prepare graduates for R&D in communication technology, automation, microelectronics, embedded systems and medical technology. It is taught in English in Klagenfurt.",
      field: 'Engineering',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/bachelor-information-and-communications-engineering/`,
      requirements: [],
      checkedFor: 2026,
      sources: sources('bachelor-information-and-communications-engineering'),
      notes: `Content 5.1: new. ${RULE} ${OPEN} ${DATES} Bachelor of Science (BSc); 6 semesters, 180 ECTS, or a 120-ECTS major with minors.`
    },
    {
      id: 'cmutgqe6z0050lj7ms4b42845',
      status: 'current',
      name: 'International Business and Economics',
      description:
        "The English-language Bachelor's programme in International Business and Economics trains managers who can find market opportunities around the world, with tools that work anywhere: accounting, controlling, marketing, human resources management, logistics, data analytics and economics.\n\nIt is taught in English in Klagenfurt and prepares graduates for international careers in business.",
      field: 'Business & Economics',
      degree: 'Bachelor of Science',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/bachelor-international-business-and-economics/`,
      requirements: [],
      checkedFor: 2026,
      sources: sources(
        'bachelor-international-business-and-economics',
        'https://www.aau.at/en/study/studying-at-aau/applying/entrance-examination/bachelor-ibe/'
      ),
      notes: `Content 5.1: new. ${RULE} Unlike Klagenfurt's other English programmes, it has a special admission procedure, held once a year before the winter semester, followed by the general admission procedure: 50 places for 2026/27, with registration 12 January to 23 February 2026; 376 applicants registered, so the procedure ran. Model limit: the selection procedure. ${DATES} Bachelor of Science (BSc); 6 semesters, 180 ECTS.`
    },
    {
      id: 'cmutgqe7z0051lj7mmh8a0yz4',
      status: 'current',
      name: 'Digital Media, Culture, and Communication',
      description:
        "The Bachelor's programme in Digital Media, Culture, and Communication (DMC²) studies how digital media work and what they mean for society: the logic of platforms such as Instagram, TikTok and YouTube, how companies and NGOs use strategic communication and networks to spread their messages, and how to interpret the data trails people leave online.\n\nThe programme combines a scientific and theoretical foundation with practical understanding, and is taught in English in Klagenfurt as a 120-ECTS major with one or two minors.",
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/bachelor-digital-media-culture-and-communication/`,
      requirements: [],
      checkedFor: 2026,
      sources: sources('bachelor-digital-media-culture-and-communication'),
      notes: `Content 5.1: new. ${RULE} ${OPEN} ${DATES} Bachelor of Arts (BA); 6 semesters, 180 ECTS: a 120-ECTS major with 60 ECTS of minors.`
    },
    {
      id: 'cmutgqe8y0052lj7mnlbg3dz3',
      status: 'current',
      name: 'Social Sciences',
      description:
        "The Bachelor's combination programme in Social Sciences brings together sociology, geography, psychology, science and technology studies, political science, and media and communication studies. You learn to analyse the challenges facing society from several perspectives and to develop scientifically sound solutions.\n\nIt is taught entirely in English in Klagenfurt, as a 120-ECTS major with 60 ECTS of minors.",
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/bachelor-social-sciences/`,
      requirements: [],
      checkedFor: 2026,
      sources: sources('bachelor-social-sciences'),
      notes: `Content 5.1: new. ${RULE} ${OPEN} ${DATES} Bachelor of Arts (BA); 6 semesters, 180 ECTS: a 120-ECTS major with 60 ECTS of minors.`
    },
    {
      id: 'cmutgqebs0053lj7mosicebt4',
      status: 'current',
      name: 'Worlds of English',
      description:
        "Worlds of English is a Bachelor's degree programme in the languages, literatures and cultures of the English-speaking world, preparing students to work as intercultural experts. English is the principal common language internationally, with almost two billion first and second language speakers.\n\nThe programme is taught in English in Klagenfurt.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 24,
      programUrl: `${BASE}/bachelor-worlds-of-english/`,
      requirements: [],
      checkedFor: 2026,
      sources: sources('bachelor-worlds-of-english'),
      notes: `Content 5.1: new. ${RULE} ${OPEN} ${DATES} Bachelor of Arts (BA); 6 semesters, 180 ECTS.`
    }
  ]
}

export default refresh
