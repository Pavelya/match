import type { RefreshFile } from '../lib/refresh'

/**
 * Tallinn University: its six bachelor's programmes taught in English, added for content task 5.2 and created, with the university, on 6 October 2026.
 * The university's application deadlines page gives the window for bachelor's programmes starting
 * in autumn 2027 (1 November 2026 to 1 March 2027), and the programme pages describe the 2027/2028
 * tuition discounts, so all six are stamped 2027.
 *
 * Dry run: npx tsx scripts/programs/refresh.ts tallinn-university
 */

const IB_PAGE = 'https://www.tlu.ee/en/ib'
const DEADLINES = 'https://www.tlu.ee/en/application-deadlines'
const BACHELOR = 'https://www.tlu.ee/en/admission-bachelors-studies'

const IB =
  'TLU\'s IB page: the Diploma or Bilingual Diploma, stating "Diploma awarded" ("Course awarded" is not eligible); six subjects, three HL and three SL; "At least 27 out of 45 points are required to qualify for studies at Tallinn University"; Extended Essay and TOK at least D; CAS completed; every HL subject at least 3, at most one SL subject at 2; at least 12 points at HL and 9 at SL. All must be met, so 27 is stored; the HL and SL conditions are a model limit. IB graduation documents prove English. Applications for autumn 2027: 1 November 2026 to 1 March 2027, through DreamApply; the minimum enrolment threshold is 65 points out of 100 in the admission exam.'
const NO_SUBJECT = 'Checked, none required: no subject is named.'

const refresh: RefreshFile = {
  university: 'Tallinn University',
  entryYear: 2027,
  checkedOn: '2026-10-05',
  programs: [
    {
      id: 'cmuw8afe2001e047mmd931wk9',
      status: 'current',
      name: 'Law',
      description:
        "Tallinn University's Law programme puts European and international law at its core and focuses on practical lawyering skills: case analysis, legal writing, research, argumentation and courtroom mooting. Learning is interactive and practice-oriented, with case studies, group work and mock trials taught by legal scholars and practitioners, and no previous legal studies are needed.\n\nThe programme prepares students for legal practice, public institutions, international organisations and the private sector. Admission is by a 20-minute interview.",
      field: 'Law',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 27,
      programUrl: 'https://www.tlu.ee/en/yti/law',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.tlu.ee/en/yti/law', IB_PAGE, DEADLINES, BACHELOR],
      notes: `Content 5.2: new. ${IB} ${NO_SUBJECT} The admission exam is an interview only, scored out of 100 with a minimum of 65, on the CV, motivation and the field. School of Governance, Law and Society; two full tuition discounts across its six English-taught programmes for 2027/2028 go to the top of the admission ranking. Tuition EUR 2,900 a semester. BA, 180 ECTS. Stamped 2027.`
    },
    {
      id: 'cmuw8afhf001f047murkxgdsz',
      status: 'current',
      name: 'Politics and Governance',
      description:
        'Politics and Governance at Tallinn University is for students who want to understand how political decisions shape societies, locally and globally. Students learn how political systems work, how policies are made and how global trends influence societies, with a balance of core courses and electives in areas such as comparative politics, public administration, global governance, European politics and international relations.\n\nGraduates go on to public service, NGOs, international organisations and political communication. Admission is by a 20-minute interview.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 27,
      programUrl: 'https://www.tlu.ee/en/yti/politics-and-governance',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.tlu.ee/en/yti/politics-and-governance', IB_PAGE, DEADLINES, BACHELOR],
      notes: `Content 5.2: new. ${IB} ${NO_SUBJECT} The admission exam is an interview only, scored out of 100 with a minimum of 65. School of Governance, Law and Society; 2027/2028 tuition discounts as for Law. Tuition EUR 2,500 a semester. BA. Stamped 2027.`
    },
    {
      id: 'cmuw8afib001g047mb34zcd47',
      status: 'current',
      name: 'Liberal Arts in Social Sciences',
      description:
        'Liberal Arts in Social Sciences at Tallinn University brings together sociology, political science, international relations, economics, law, demography, psychology and other social sciences. Rather than one discipline, students learn to connect fields, examine social and political structures critically, and study the challenges facing societies today, combining qualitative and quantitative research methods with academic writing, teamwork and project management.\n\nCompulsory core courses give a shared foundation and electives let students follow their interests. Admission is by an interview that includes a discussion of a set reading.',
      field: 'Social Sciences',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 27,
      programUrl: 'https://www.tlu.ee/en/yti/liberal-arts-social-sciences',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://www.tlu.ee/en/yti/liberal-arts-social-sciences',
        IB_PAGE,
        DEADLINES,
        BACHELOR
      ],
      notes: `Content 5.2: new. ${IB} ${NO_SUBJECT} The admission exam is an interview only, scored out of 100 with a minimum of 65, on the CV, the programme and one of the suggested readings. School of Governance, Law and Society; 2027/2028 tuition discounts as for Law. Tuition EUR 2,500 a semester. BA. Stamped 2027.`
    },
    {
      id: 'cmuw8afjb001h047mdcruvsi6',
      status: 'current',
      name: 'Liberal Arts in Humanities',
      description:
        'Liberal Arts in Humanities at Tallinn University is a three-year humanities programme for students who do not yet want to commit to a single discipline. Students study culture, history, language and society through shared courses, specialist modules, electives, project work and an internship, learning to connect ideas across fields and build well-supported arguments, with academic guidance towards a clearer direction for further study and work.\n\nAdmission is by a motivation letter and an interview that includes a discussion of set academic texts.',
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 27,
      programUrl: 'https://www.tlu.ee/en/liberal-arts-in-humanities',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.tlu.ee/en/liberal-arts-in-humanities', IB_PAGE, DEADLINES, BACHELOR],
      notes: `Content 5.2: new. ${IB} ${NO_SUBJECT} Admission exam: a motivation letter of about 500 words (30 points, at least 20 to be invited) and an interview with a discussion of two chosen academic texts (70 points, at least 45). Two 50% tuition discounts for students admitted in 2027. Tuition EUR 2,300 a semester. BA, 6 semesters. Stamped 2027.`
    },
    {
      id: 'cmuw8afkc001i047mwckihg4x',
      status: 'current',
      name: 'Audiovisual Media',
      description:
        "Audiovisual Media at Tallinn University's Baltic Film, Media and Arts School teaches students to create films, television programmes and other audiovisual content, from documentaries and fiction to series, commercials and music videos. Students choose a creative module (screenwriter, producer, director, assistant director) or a technical one (editor, colourist, cinematographer, gaffer, sound), combining theory with practical production and a compulsory internship.\n\nThe programme has 40 places; applicants take an entrance exam, and a score of 75 or more guarantees a place.",
      field: 'Media',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 27,
      programUrl: 'https://www.tlu.ee/en/bfm/audiovisual-media',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.tlu.ee/en/bfm/audiovisual-media', IB_PAGE, DEADLINES, BACHELOR],
      notes: `Content 5.2: new. ${IB} ${NO_SUBJECT} 40 places: an entrance exam score of 75 or more guarantees a place, the rest are filled by ranking above the threshold; applicants choose the creative or the technical module when applying. Tuition EUR 2,500 a semester. Bachelor of Arts in Humanities. Stamped 2027.`
    },
    {
      id: 'cmuw8afld001j047mwi3bhocl',
      status: 'current',
      name: 'Crossmedia in Film and Television',
      description:
        "Crossmedia at Tallinn University's Baltic Film, Media and Arts School combines media production, storytelling and marketing: students learn to tell stories that move from one platform to another, for example from a film to a television series to a live performance. The programme mixes theoretical groundwork with practical assignments.\n\nAdmission has three stages, starting with a three-minute audiovisual CV, and ends with an interview, online for international applicants.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '3 years',
      minIBPoints: 27,
      programUrl: 'https://www.tlu.ee/en/bfm/crossmedia',
      requirements: [],
      checkedFor: 2027,
      sources: ['https://www.tlu.ee/en/bfm/crossmedia', IB_PAGE, DEADLINES, BACHELOR],
      notes: `Content 5.2: new. ${IB} ${NO_SUBJECT} Admission in three stages: an audiovisual CV of up to three minutes (30%), then further tasks and a 20-minute Zoom interview in English. Tuition EUR 2,500 a semester. Bachelor of Arts in Humanities. Stamped 2027.`
    }
  ]
}

export default refresh
