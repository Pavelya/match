import type { UniversitiesFile } from '../lib/universities'

/**
 * Universities added for content task 6, Part B2 (USA), read 2026-10-10.
 *
 * The owner chose them on 10 October 2026 (docs/tasks/content-2027/usa-model-decision.md): the
 * shortlist's first ten plus Arizona State. Their programs are in this folder's data file named
 * after each university, under the US model (no IB minimum). Student numbers are fall 2025's from
 * each Common Data Set (B1), except Harvard, which publishes none: its figures are the Office of
 * Institutional Research and Analytics' Fact Book. Contacts are the undergraduate admissions
 * office's (Boston University's international admissions office, which it lists separately); Harvard,
 * Stanford, Berkeley, UCLA, Michigan and ASU publish a phone number and a web form but no admissions
 * email, so `email` is null. No image or logo: add them in /admin/universities, which uploads them
 * to Storage.
 *
 * Dry run: npx tsx scripts/programs/add-universities.ts scripts/programs/2027/new-universities-6.ts
 */
const universities: UniversitiesFile = {
  checkedOn: '2026-10-10',
  universities: [
    {
      name: 'Massachusetts Institute of Technology',
      abbreviatedName: 'MIT',
      description:
        'The Massachusetts Institute of Technology is a private research university in Cambridge, Massachusetts, with 4,561 undergraduates and 7,255 graduate students in fall 2025. It is organized in five schools (Architecture and Planning; Engineering; Humanities, Arts, and Social Sciences; Science; and the Sloan School of Management) and the Schwarzman College of Computing. Undergraduates apply to MIT as a whole and choose a major at the end of their first year.',
      country: 'United States',
      city: 'Cambridge',
      classification: 'PRIVATE',
      studentPopulation: 11816,
      websiteUrl: 'https://www.mit.edu/',
      email: 'admissions@mit.edu',
      phone: '+1 617-253-3400',
      sources: [
        'https://ir.mit.edu/projects/2025-26-common-data-set/',
        'https://catalog.mit.edu/schools/',
        'https://mitadmissions.org/discover/the-mit-education/majors-minors/',
        'https://mitadmissions.org/help/contact/'
      ]
    },
    {
      name: 'Harvard University',
      abbreviatedName: 'Harvard',
      description:
        "Harvard University is a private research university in Cambridge, Massachusetts, with 24,317 students in fall 2025, 6,675 of them in its undergraduate school, Harvard College. Students apply to the College and choose a concentration, Harvard's word for a major, from 50 fields of study.",
      country: 'United States',
      city: 'Cambridge',
      classification: 'PRIVATE',
      studentPopulation: 24317,
      websiteUrl: 'https://www.harvard.edu/',
      email: null,
      phone: '+1 617-495-1551',
      sources: [
        'https://oira.harvard.edu/factbook/fact-book-enrollment/',
        'https://college.harvard.edu/academics/liberal-arts-sciences/concentrations',
        'https://college.harvard.edu/contact-us'
      ]
    },
    {
      name: 'Stanford University',
      abbreviatedName: 'Stanford',
      description:
        'Stanford University is a private research university in Stanford, California, with 7,346 undergraduates and 10,775 graduate students in fall 2025. Undergraduates are admitted to the university and declare a major by the end of their second year.',
      country: 'United States',
      city: 'Stanford',
      classification: 'PRIVATE',
      studentPopulation: 18121,
      websiteUrl: 'https://www.stanford.edu/',
      email: null,
      phone: '+1 650-723-2091',
      sources: [
        'https://irds.stanford.edu/data-findings/cds',
        'https://bulletin.stanford.edu/academic-polices/degree-requirements/undergraduate-major',
        'https://admission.stanford.edu/contact-us/index.html'
      ]
    },
    {
      name: 'University of California, Berkeley',
      abbreviatedName: 'UC Berkeley',
      description:
        'The University of California, Berkeley is a public research university of the University of California system, with 33,513 undergraduates and 13,145 graduate students in fall 2025. It offers over 100 majors across its colleges (Letters & Science, Engineering, Chemistry, Environmental Design, Natural Resources, and Computing, Data Science, and Society) and the Haas School of Business; first-year students apply through the UC application and name a primary major.',
      country: 'United States',
      city: 'Berkeley',
      classification: 'PUBLIC',
      studentPopulation: 46658,
      websiteUrl: 'https://www.berkeley.edu/',
      email: null,
      phone: '+1 510-642-3175',
      sources: [
        'https://opa.berkeley.edu/campus-data/common-data-set',
        'https://admissions.berkeley.edu/application-tips',
        'https://admissions.berkeley.edu/contact-us/'
      ]
    },
    {
      name: 'University of California, Los Angeles',
      abbreviatedName: 'UCLA',
      description:
        'The University of California, Los Angeles is a public research university of the University of California system, with 33,534 undergraduates and 13,898 graduate students in fall 2025. First-year students apply through the UC application to the College, which offers more than 100 majors, or to one of its professional schools, such as the Samueli School of Engineering or the School of Nursing.',
      country: 'United States',
      city: 'Los Angeles',
      classification: 'PUBLIC',
      studentPopulation: 47432,
      websiteUrl: 'https://www.ucla.edu/',
      email: null,
      phone: '+1 310-825-3101',
      sources: [
        'https://apb.ucla.edu/campus-statistics/common-data-set-undergraduate-profile',
        'https://admission.ucla.edu/apply/majors',
        'https://admission.ucla.edu/contact'
      ]
    },
    {
      name: 'University of Michigan',
      abbreviatedName: 'Michigan',
      description:
        'The University of Michigan is a public research university in Ann Arbor, with 35,358 undergraduates and 18,130 graduate students in fall 2025. First-year students apply to one of its 15 undergraduate schools and colleges, such as Literature, Science, and the Arts, Engineering or the Ross School of Business, not to the university as a whole.',
      country: 'United States',
      city: 'Ann Arbor',
      classification: 'PUBLIC',
      studentPopulation: 53488,
      websiteUrl: 'https://umich.edu/',
      email: null,
      phone: '+1 734-764-7433',
      sources: [
        'https://obp.umich.edu/wp-content/uploads/pubdata/cds/cds_2025-26_umaa.pdf',
        'https://admissions.umich.edu/academics-majors/majors-degrees',
        'https://admissions.umich.edu/apply/international-applicants/requirements-deadlines/requirements-country'
      ]
    },
    {
      name: 'Purdue University',
      abbreviatedName: 'Purdue',
      description:
        'Purdue University is a public research university in West Lafayette, Indiana, with 43,633 undergraduates and 14,243 graduate students in fall 2025. Applicants are admitted into a specific major; engineering students at West Lafayette start in First-Year Engineering and choose their specialty for the second year.',
      country: 'United States',
      city: 'West Lafayette',
      classification: 'PUBLIC',
      studentPopulation: 57876,
      websiteUrl: 'https://www.purdue.edu/',
      email: 'admissions@purdue.edu',
      phone: '+1 765-494-1776',
      sources: [
        'https://www.purdue.edu/idata/wp-content/uploads/2026/04/CDS-2025-2026.xlsx',
        'https://admissions.purdue.edu/become-student/international/',
        'https://admissions.purdue.edu/majors/mechanical-engineering/',
        'https://admissions.purdue.edu/contact/'
      ]
    },
    {
      name: 'New York University',
      abbreviatedName: 'NYU',
      description:
        'New York University is a private research university in New York City, with 29,471 undergraduates and 27,804 graduate students in fall 2025. Its schools include the College of Arts and Science, the Stern School of Business, the Tandon School of Engineering and the Rory Meyers College of Nursing, and it has degree-granting campuses in Abu Dhabi and Shanghai; applicants choose their campus and programs on the Common App.',
      country: 'United States',
      city: 'New York',
      classification: 'PRIVATE',
      studentPopulation: 57275,
      websiteUrl: 'https://www.nyu.edu/',
      email: 'admissions@nyu.edu',
      phone: '+1 212-998-4500',
      sources: [
        'https://www.nyu.edu/content/dam/nyu/institutionalResearch/documents/cds-2025-2026/CDS%202025-2026%20FINAL%20(no%20G).pdf',
        'https://www.nyu.edu/admissions/undergraduate-admissions/how-to-apply/all-freshmen-applicants.html',
        'https://www.nyu.edu/admissions/undergraduate-admissions/contact-us.html'
      ]
    },
    {
      name: 'Boston University',
      abbreviatedName: 'BU',
      description:
        'Boston University is a private research university in Boston, Massachusetts, with 18,289 undergraduates and 18,688 graduate students in fall 2025. Applicants specify one of its schools and colleges, such as the College of Arts & Sciences, the College of Engineering or the Questrom School of Business.',
      country: 'United States',
      city: 'Boston',
      classification: 'PRIVATE',
      studentPopulation: 36977,
      websiteUrl: 'https://www.bu.edu/',
      email: 'intadmis@bu.edu',
      phone: '+1 617-353-4492',
      sources: [
        'https://www.bu.edu/asir/files/2026/07/CDS-2025-2026-updated.pdf',
        'https://www.bu.edu/admissions/apply/first-year/',
        'https://www.bu.edu/admissions/contact-us/'
      ]
    },
    {
      name: 'Northeastern University',
      abbreviatedName: 'Northeastern',
      description:
        'Northeastern University is a private research university in Boston, Massachusetts, with 22,456 undergraduates and 15,947 graduate students in fall 2025. It offers over 370 majors across eight undergraduate colleges and schools, and students begin in one of its Signature Programs, on the Boston campus or across its network of campuses and partner institutions.',
      country: 'United States',
      city: 'Boston',
      classification: 'PRIVATE',
      studentPopulation: 38403,
      websiteUrl: 'https://www.northeastern.edu/',
      email: 'admissions@northeastern.edu',
      phone: '+1 617-373-2200',
      sources: [
        'https://uds.northeastern.edu/facts/common-data-set/',
        'https://admissions.northeastern.edu/visit/counselor-resources/',
        'https://admissions.northeastern.edu/contact/'
      ]
    },
    {
      name: 'Arizona State University',
      abbreviatedName: 'ASU',
      description:
        'Arizona State University is a public research university with its main campus in Tempe and further campuses across the Phoenix area, including Downtown Phoenix, Polytechnic and West Valley; its campuses had 64,662 undergraduates and 13,848 graduate students in fall 2025. First-year admission follows published criteria: international applicants need a 3.00 GPA from secondary school, and some majors set higher ones.',
      country: 'United States',
      city: 'Tempe',
      classification: 'PUBLIC',
      studentPopulation: 78510,
      websiteUrl: 'https://www.asu.edu/',
      email: null,
      phone: '+1 480-965-7788',
      sources: [
        'https://uoia.asu.edu/sites/g/files/litvpz1436/files/2026-06/CDS%202025-26%20-%20ASU%20Campus%20Immersion.pdf',
        'https://admission.asu.edu/apply/international/first-year',
        'https://admission.asu.edu/contact'
      ]
    }
  ]
}

export default universities
