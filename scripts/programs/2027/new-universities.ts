import type { UniversitiesFile } from '../lib/universities'

/**
 * Universities added for content task 5.1 (Austria, Belgium, Denmark), read 2026-10-04.
 *
 * Each one teaches English bachelor's programmes open to IB Diploma holders; their programs are
 * in this folder's data file named after the university. Student numbers are the latest each
 * university publishes. No image or logo: add them in /admin/universities, which uploads them to
 * Storage.
 *
 * Dry run: npx tsx scripts/programs/add-universities.ts
 */
const universities: UniversitiesFile = {
  checkedOn: '2026-10-04',
  universities: [
    {
      name: 'Aarhus University',
      abbreviatedName: 'AU',
      description:
        "Aarhus University is a public university in Aarhus, Denmark, with about 37,500 students in five faculties. It teaches six bachelor's programmes in English: Cognitive Science, Computer Science, Data Science, IT Product Development and Economics and Business Administration in Aarhus, and Economics and Business Administration at its Herning campus. Applications go through Denmark's national admission system, optagelse.dk, by 15 March for applicants with an international exam such as the IB.",
      country: 'Denmark',
      city: 'Aarhus',
      classification: 'PUBLIC',
      studentPopulation: 37500,
      websiteUrl: 'https://international.au.dk/',
      email: null,
      phone: null,
      sources: ['https://international.au.dk/key-statistics', 'https://bachelor.au.dk/en/']
    },
    {
      name: 'University of Southern Denmark',
      abbreviatedName: 'SDU',
      description:
        "The University of Southern Denmark received its first students in Odense in September 1966 and now has five faculties and about 32,000 students, more than 15% of them from abroad. Its English-taught bachelor's programmes are in Odense, in Sønderborg on the German border, and at SDU Vejle, its IT campus. Most programmes fill part of their places through an entrance test (quota 2) rather than school grades.",
      country: 'Denmark',
      city: 'Odense',
      classification: 'PUBLIC',
      studentPopulation: 32000,
      websiteUrl: 'https://www.sdu.dk/en',
      email: null,
      phone: null,
      sources: ['https://www.sdu.dk/en/om_sdu', 'https://www.sdu.dk/en/uddannelse/bachelor']
    },
    {
      name: 'Technical University of Denmark',
      abbreviatedName: 'DTU',
      description:
        "DTU is Denmark's technical university, in Kongens Lyngby north of Copenhagen, with 13,500 students and 6,000 employees working in education, research, consulting and innovation. It teaches one bachelor's programme in English, the BSc in General Engineering; its other undergraduate programmes are in Danish.",
      country: 'Denmark',
      city: 'Kongens Lyngby',
      classification: 'PUBLIC',
      studentPopulation: 13500,
      websiteUrl: 'https://www.dtu.dk/english',
      email: null,
      phone: null,
      sources: [
        'https://www.dtu.dk/english/about/facts-and-figures',
        'https://www.dtu.dk/english/education/undergraduate'
      ]
    },
    {
      name: 'IT University of Copenhagen',
      abbreviatedName: 'ITU',
      description:
        "The IT University of Copenhagen, founded in 1999, is a university devoted to information technology, with about 2,900 students. Of its four bachelor's programmes, Data Science is taught in English and open to applicants without Danish; the other three now require Danish at A level.",
      country: 'Denmark',
      city: 'Copenhagen',
      classification: 'PUBLIC',
      studentPopulation: 2941,
      websiteUrl: 'https://en.itu.dk/',
      email: null,
      phone: null,
      sources: ['https://en.itu.dk/About-ITU', 'https://en.itu.dk/Programmes/BSc-Programmes']
    },
    {
      name: 'WU Vienna University of Economics and Business',
      abbreviatedName: 'WU',
      description:
        "WU (Wirtschaftsuniversität Wien) is a public university in Vienna for business, economics and business law, with 23,019 students in autumn 2025. Its English-taught Bachelor's Program in Business and Economics (BBE) admits 240 students a year through a selection exam held each spring; its other two bachelor's programmes are taught in German.",
      country: 'Austria',
      city: 'Vienna',
      classification: 'PUBLIC',
      studentPopulation: 23019,
      websiteUrl: 'https://www.wu.ac.at/en/',
      email: null,
      phone: null,
      sources: [
        'https://www.wu.ac.at/en/the-university/about-wu/facts-figures/studierende',
        'https://www.wu.ac.at/en/programs/bachelors-programs'
      ]
    },
    {
      name: 'University of Klagenfurt',
      abbreviatedName: 'AAU',
      description:
        "The University of Klagenfurt (Alpen-Adria-Universität Klagenfurt), founded in 1970 in Carinthia, has 13,323 students, 2,915 of them international. Six of its bachelor's programmes are taught in English, and all except International Business and Economics admit every applicant with a university entrance qualification and English at B2, without an entrance exam.",
      country: 'Austria',
      city: 'Klagenfurt',
      classification: 'PUBLIC',
      studentPopulation: 13323,
      websiteUrl: 'https://www.aau.at/en/',
      email: null,
      phone: null,
      sources: [
        'https://www.aau.at/en/university/profile/facts-figures-and-data/',
        'https://www.aau.at/en/international/international-profile/degree-programmes-in-english/'
      ]
    },
    {
      name: 'Vrije Universiteit Brussel',
      abbreviatedName: 'VUB',
      description:
        "Vrije Universiteit Brussel (VUB) is a Dutch-speaking public university in Brussels with 24,199 students from 151 countries. Its English-taught bachelor's programmes are Business Economics, at the Solvay Business School, and Social Sciences, taught jointly with Ghent University. An IB Diploma gives direct access with proof of English.",
      country: 'Belgium',
      city: 'Brussels',
      classification: 'PUBLIC',
      studentPopulation: 24199,
      websiteUrl: 'https://www.vub.be/en',
      email: null,
      phone: null,
      sources: [
        'https://www.vub.be/en/about-vub/key-data-vub/facts-and-figures-vub',
        'https://www.vub.be/en/studying-vub/apply-and-enrol-vub/admission-requirements-and-deadlines/academic-and-language-requirements'
      ]
    },
    {
      name: 'University of Antwerp',
      abbreviatedName: 'UAntwerp',
      description:
        "The University of Antwerp has 24,827 students, 17.5% of them international, in nine faculties. Two of its bachelor's programmes are taught in English, Social-Economic Sciences and Urban Sustainability Studies (with the YUFE alliance of European universities); all others are in Dutch. IB Diploma holders can enrol directly.",
      country: 'Belgium',
      city: 'Antwerp',
      classification: 'PUBLIC',
      studentPopulation: 24827,
      websiteUrl: 'https://www.uantwerpen.be/en/',
      email: null,
      phone: null,
      sources: [
        'https://www.uantwerpen.be/en/about-uantwerp/organisation/facts-figures-rankings/',
        'https://www.uantwerpen.be/en/study/admission-and-enrolment/admission/academic-bachelor/admission-requirements/'
      ]
    }
  ]
}

export default universities
