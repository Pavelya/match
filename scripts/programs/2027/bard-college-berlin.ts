import type { RefreshFile } from '../lib/refresh'

/**
 * Bard College Berlin: its three BA programs, added for content task 7, Part B2 (Germany), and created, with the
 * university, on 2026-10-12. The owner chose it on 12 October 2026 (docs/tasks/content-2027/germany-model-decision.md,
 * decision 6).
 *
 * Bard admits holistically, US-style, and publishes no IB minimum: every admitted student qualifies for the US degree on
 * their national high school diploma, and the German BA follows only for a certificate equivalent to the Abitur. So,
 * under the data conventions' rule for a university that publishes no minimum (content 6), minIBPoints is null and there
 * are no subject rows. Stamped 2027: the requirements page says "We are now accepting applications for entry in Fall 2027".
 *
 * Dry run: npx tsx scripts/programs/refresh.ts bard-college-berlin
 */

/** Read on 12 October 2026. */
const REQUIREMENTS = 'https://berlin.bard.edu/admissions/how-to-apply/application-requirements/'
const DEGREES = 'https://berlin.bard.edu/academics/degree-programs/'

const NOTES =
  'Content 7 (Part B2, 12 October 2026). No IB minimum: "All students admitted to Bard College Berlin qualify for the US university degree on the basis of their national high school diploma"; the German BA needs a certificate equivalent to the Abitur (for the IB, the KMK conditions). So minIBPoints is null, checked, none required. Holistic: motivation essay, graded writing sample, transcripts, two recommendations; SAT/ACT optional; C1 English; B1 German by the end of the second year. Stamped 2027: applications for Fall 2027 are open.'

const refresh: RefreshFile = {
  university: 'Bard College Berlin',
  entryYear: 2027,
  checkedOn: '2026-10-12',
  programs: [
    {
      id: 'cmv5p3wxu0000yl7m771711z7',
      status: 'current',
      name: 'Artistic Practice and Society',
      description:
        "Bard College Berlin's BA degree program in Artistic Practice and Society offers students the opportunity to explore all areas of the practicing arts in the context of a liberal arts education, with a core program in the central works and innovations of the past, and the chance to engage with the most recent and exciting developments in contemporary art.\n\nHow Bard decides: holistically, from a motivation essay, a graded writing sample, transcripts of your last four years and two academic recommendations; the SAT or ACT is optional, and there is no IB minimum. For fall 2027, early action closes on 1 November and regular decision on 10 January, and citizens of the EU and a few other countries can apply until 1 May. Teaching is in English (C1), and every student must reach B1 German by the end of the second year. Every graduate receives a US BA, and a graduate whose school certificate is equivalent to the German Abitur also a German BA.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      campusCity: null,
      minIBPoints: null,
      programUrl: 'https://berlin.bard.edu/academics/artistic-practice-and-society/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://berlin.bard.edu/academics/artistic-practice-and-society/',
        REQUIREMENTS,
        DEGREES
      ],
      notes:
        NOTES +
        ' Field by content: the rule names no discipline in "Artistic Practice and Society", a program in the practicing arts.'
    },
    {
      id: 'cmv5p3wyw0001yl7mcu7j78s6',
      status: 'current',
      name: 'Economics, Politics, and Social Thought',
      description:
        'The BA degree program in Economics, Politics, and Social Thought provides disciplinary training in economics and politics within the framework of a core program in intellectual history that encourages the thoughtful and culturally well-informed application of social-scientific methodology and principle.\n\nHow Bard decides: holistically, from a motivation essay, a graded writing sample, transcripts of your last four years and two academic recommendations; the SAT or ACT is optional, and there is no IB minimum. For fall 2027, early action closes on 1 November and regular decision on 10 January, and citizens of the EU and a few other countries can apply until 1 May. Teaching is in English (C1), and every student must reach B1 German by the end of the second year. Every graduate receives a US BA, and a graduate whose school certificate is equivalent to the German Abitur also a German BA.',
      field: 'Business & Economics',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      campusCity: null,
      minIBPoints: null,
      programUrl: 'https://berlin.bard.edu/academics/economics-politics-and-social-thought/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://berlin.bard.edu/academics/economics-politics-and-social-thought/',
        REQUIREMENTS,
        DEGREES
      ],
      notes: NOTES
    },
    {
      id: 'cmv5p3x1w0002yl7mgw80z77r',
      status: 'current',
      name: 'Humanities, the Arts, and Social Thought',
      description:
        "Bard College Berlin's BA degree program in Humanities, the Arts, and Social Thought affords students the opportunity to gain a thorough training in the fields of the humanities while also acquiring a knowledge of the key intellectual developments, works, and debates that lie at the origin of the disciplines of the social and natural sciences and the practicing arts.\n\nHow Bard decides: holistically, from a motivation essay, a graded writing sample, transcripts of your last four years and two academic recommendations; the SAT or ACT is optional, and there is no IB minimum. For fall 2027, early action closes on 1 November and regular decision on 10 January, and citizens of the EU and a few other countries can apply until 1 May. Teaching is in English (C1), and every student must reach B1 German by the end of the second year. Every graduate receives a US BA, and a graduate whose school certificate is equivalent to the German Abitur also a German BA.",
      field: 'Arts & Humanities',
      degree: 'Bachelor of Arts',
      duration: '4 years',
      campusCity: null,
      minIBPoints: null,
      programUrl: 'https://berlin.bard.edu/academics/humanities-the-arts-and-social-thought/',
      requirements: [],
      checkedFor: 2027,
      sources: [
        'https://berlin.bard.edu/academics/humanities-the-arts-and-social-thought/',
        REQUIREMENTS,
        DEGREES
      ],
      notes: NOTES
    }
  ]
}

export default refresh
