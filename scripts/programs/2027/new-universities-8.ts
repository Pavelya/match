import type { UniversitiesFile } from '../lib/universities'

/**
 * Universities added for content task 7, Part B2 (Germany), read 2026-10-12.
 *
 * The owner chose them on 12 October 2026 (docs/tasks/content-2027/germany-model-decision.md, decision 6): the
 * English-taught shortlist. Their programs are in this folder's data file named after each university. Contacts are
 * the admissions or student service office's where published: Rhine-Waal's application pages give only its general
 * info address; Freiburg, WHU and Bard publish no admissions phone on the pages read. No student figures: none was found
 * on a page that answers. No image or logo: add them in /admin/universities.
 *
 * Dry run: npx tsx scripts/programs/add-universities.ts scripts/programs/2027/new-universities-8.ts
 */
const universities: UniversitiesFile = {
  checkedOn: '2026-10-12',
  universities: [
    {
      name: 'Constructor University',
      abbreviatedName: 'Constructor',
      description:
        "Constructor University is a private university in Bremen, formerly Jacobs University, where every bachelor's program is taught in English and all first-year students live on campus. Students can change their major within the first year.",
      country: 'Germany',
      city: 'Bremen',
      classification: 'PRIVATE',
      studentPopulation: null,
      websiteUrl: 'https://constructor.university/',
      email: 'study@constructor.university',
      phone: '+49 421 200 4200',
      sources: [
        'https://constructor.university/programs/undergraduate-education',
        'https://constructor.university/programs/undergraduate-education/faq-undergraduate-study'
      ]
    },
    {
      name: 'Leuphana University Lüneburg',
      abbreviatedName: 'Leuphana',
      description:
        "Leuphana University Lüneburg is a public university in Lüneburg, near Hamburg. Its bachelor's programs run through Leuphana College, where students combine a major and a minor, and seven majors are taught in English with no German required.",
      country: 'Germany',
      city: 'Lüneburg',
      classification: 'PUBLIC',
      studentPopulation: null,
      websiteUrl: 'https://www.leuphana.de/en/',
      email: 'studierendenservice@leuphana.de',
      phone: '+49 4131 677-2277',
      sources: [
        'https://www.leuphana.de/en/study/studying-in-germany/how-to-study-in-germany/bachelors-in-english.html',
        'https://www.leuphana.de/en/college/application/admission-process/numerus-clausus.html'
      ]
    },
    {
      name: 'Rhine-Waal University of Applied Sciences',
      abbreviatedName: 'HSRW',
      description:
        "Rhine-Waal University of Applied Sciences (Hochschule Rhein-Waal) is a public university of applied sciences with campuses in Kleve and Kamp-Lintfort. Most of its programs are taught in English, and its bachelor's programs take seven semesters.",
      country: 'Germany',
      city: 'Kleve',
      classification: 'PUBLIC',
      studentPopulation: null,
      websiteUrl: 'https://www.hochschule-rhein-waal.de/en',
      email: 'info@hochschule-rhein-waal.de',
      phone: '+49 2821 80673-0',
      sources: [
        'https://www.hochschule-rhein-waal.de/en/study/programmes-and-enrolment-modes/all-degree-programmes',
        'https://www.hochschule-rhein-waal.de/en/study/before-starting-university/application-process/guide-for-international-applicants'
      ]
    },
    {
      name: 'University of Freiburg',
      abbreviatedName: 'Freiburg',
      description:
        "The University of Freiburg (Albert-Ludwigs-Universität Freiburg) is a public research university in Freiburg im Breisgau. Apart from Liberal Arts and Sciences at its University College Freiburg, all its bachelor's programs are taught in German.",
      country: 'Germany',
      city: 'Freiburg',
      classification: 'PUBLIC',
      studentPopulation: null,
      websiteUrl: 'https://uni-freiburg.de/en/',
      email: 'study@uni-freiburg.de',
      phone: null,
      sources: [
        'https://uni-freiburg.de/en/studies/applying/international-applicants/full-time-studies/',
        'https://uni-freiburg.de/ucf/las/apply/'
      ]
    },
    {
      name: 'WHU – Otto Beisheim School of Management',
      abbreviatedName: 'WHU',
      description:
        'WHU – Otto Beisheim School of Management is a private business school in Vallendar. Its Bachelor in International Business Administration takes three years, with two internships and a semester abroad, and can be studied in English.',
      country: 'Germany',
      city: 'Vallendar',
      classification: 'PRIVATE',
      studentPopulation: null,
      websiteUrl: 'https://www.whu.edu/en/',
      email: 'bachelor@whu.edu',
      phone: null,
      sources: [
        'https://www.whu.edu/en/programs/bachelor-program/bachelor-in-international-business-administration/',
        'https://www.whu.edu/en/programs/bachelor-program/bachelor-in-international-business-administration/application-admissions/'
      ]
    },
    {
      name: 'Bard College Berlin',
      abbreviatedName: 'BCB',
      description:
        'Bard College Berlin is a private liberal arts college in Berlin, part of the Bard network. Its four-year BA programs pair a core in intellectual history with a discipline; every graduate receives a US degree, and a German BA as well where the school certificate is equivalent to the Abitur.',
      country: 'Germany',
      city: 'Berlin',
      classification: 'PRIVATE',
      studentPopulation: null,
      websiteUrl: 'https://berlin.bard.edu/',
      email: 'admissions@berlin.bard.edu',
      phone: null,
      sources: [
        'https://berlin.bard.edu/academics/degree-programs/',
        'https://berlin.bard.edu/admissions/how-to-apply/application-requirements/'
      ]
    }
  ]
}

export default universities
