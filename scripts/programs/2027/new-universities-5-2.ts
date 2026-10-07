import type { UniversitiesFile } from '../lib/universities'

/**
 * Universities added for content task 5.2 (Japan, Estonia, Czech Republic, Israel), read 2026-10-05.
 *
 * Each one teaches English bachelor's programmes open to IB Diploma holders; their programs are in
 * this folder's data file named after the university. Student numbers are the latest each
 * university publishes. Contacts are the admissions office's where one is published (data
 * conventions). Waseda and Keio publish none for the whole university: Waseda takes questions
 * through each school's inquiry form, and Keio lists one address per programme (PEARL,
 * pearl_admissions@info.keio.ac.jp; GIGA, ao-overseas@sfc.keio.ac.jp), so both are null and the
 * programme notes carry them. No image or logo: add them in /admin/universities, which uploads them
 * to Storage.
 *
 * Dry run: npx tsx scripts/programs/add-universities.ts scripts/programs/2027/new-universities-5-2.ts
 */
const universities: UniversitiesFile = {
  checkedOn: '2026-10-05',
  universities: [
    {
      name: 'Waseda University',
      abbreviatedName: 'Waseda',
      description:
        'Waseda University is a private university in Tokyo, founded in 1882, with about 45,000 undergraduates and 9,000 graduate students, and more international students than any other university in Japan. Six of its undergraduate schools teach degree programmes in English that need no Japanese: Political Science and Economics, Social Sciences (TAISI), International Liberal Studies, Culture, Media and Society (JCulP), and Fundamental and Creative Science and Engineering. They admit in September on application documents, with applications from early January.',
      country: 'Japan',
      city: 'Tokyo',
      classification: 'PRIVATE',
      studentPopulation: 54000,
      websiteUrl: 'https://www.waseda.jp/top/en/',
      email: null,
      phone: null,
      sources: [
        'https://www.waseda.jp/top/en/about/disclosure/students',
        'https://www.waseda.jp/inst/admission/en/undergraduate/english/',
        'https://www.waseda.jp/inst/admission/en/undergraduate/faq/',
        'https://www.waseda.jp/fsci/en/about/education/english-based/'
      ]
    },
    {
      name: 'Keio University',
      abbreviatedName: 'Keio',
      description:
        'Keio University, founded in 1858, is a private university with about 34,000 students on campuses in Tokyo and at Shonan Fujisawa (SFC). Two English-taught undergraduate routes are open to IB applicants: PEARL, a four-year BA in Economics at the Faculty of Economics in Tokyo, and the GIGA Program at SFC, where students earn a BA in Policy Management or in Environment and Information Studies. Both admit in September on submitted documents, with no interview.',
      country: 'Japan',
      city: 'Tokyo',
      classification: 'PRIVATE',
      studentPopulation: 34000,
      websiteUrl: 'https://www.keio.ac.jp/en/',
      email: null,
      phone: null,
      sources: [
        'https://www.keio.ac.jp/en/about/by-the-numbers/',
        'https://www.keio.ac.jp/en/about/',
        'https://www.keio.ac.jp/en/admissions/faculty/examinations/pearl/',
        'https://www.keio.ac.jp/en/admissions/faculty/examinations/ao-giga-sfc-pem/'
      ]
    },
    {
      name: 'Sophia University',
      abbreviatedName: 'Sophia',
      description:
        "Sophia University was founded in 1913 by the Jesuits and has all its faculties on one campus in central Tokyo, with 12,419 undergraduates and 1,653 graduate students. Its English-taught bachelor's degrees are the Faculty of Liberal Arts, the six departments of the Sophia Program for Sustainable Futures, and, from April 2027, the Department of Digital Green Technology. All admit on application documents, and none requires Japanese.",
      country: 'Japan',
      city: 'Tokyo',
      classification: 'PRIVATE',
      studentPopulation: 14072,
      websiteUrl: 'https://www.sophia.ac.jp/eng/',
      email: 'admission-u-co@sophia.ac.jp',
      phone: '+81 3 3238 4018',
      sources: [
        'https://www.sophia.ac.jp/eng/aboutsophia/facts/',
        'https://adm.sophia.ac.jp/eng/admissions/ug_p/en_ug/',
        'https://adm.sophia.ac.jp/assets/uploads/sites/2/2026/06/07c28af288f35e4dcd52d0defb0cc086.pdf'
      ]
    },
    {
      name: 'International Christian University',
      abbreviatedName: 'ICU',
      description:
        'International Christian University is a private liberal arts university in Mitaka, western Tokyo, with 3,260 students, almost all in its single College of Liberal Arts. Teaching is bilingual in Japanese and English, and students choose one of more than 30 majors before their third year. Its English Language Based Admissions admit in April or September and need no Japanese at entry; students admitted this way study Japanese at ICU.',
      country: 'Japan',
      city: 'Tokyo',
      classification: 'PRIVATE',
      studentPopulation: 3260,
      websiteUrl: 'https://www.icu.ac.jp/en/',
      email: 'admissions-center@icu.ac.jp',
      phone: null,
      sources: [
        'https://www.icu.ac.jp/en/about/docs/2_2505_students_en.pdf',
        'https://www.icu.ac.jp/en/admissions/undergraduate/faq/',
        'https://www.icu.ac.jp/en/academics/undergraduate/major/'
      ]
    },
    {
      name: 'Tallinn University',
      abbreviatedName: 'TLU',
      description:
        "Tallinn University is a public university in Estonia's capital with more than 7,500 students from 70 countries. Six of its bachelor's programmes are taught in English: Law, Politics and Governance, Liberal Arts in Social Sciences and Liberal Arts in Humanities, and, at its Baltic Film, Media and Arts School, Audiovisual Media and Crossmedia. IB applicants need at least 27 points; each programme then selects by interview, and applications for autumn 2027 run from 1 November 2026 to 1 March 2027.",
      country: 'Estonia',
      city: 'Tallinn',
      classification: 'PUBLIC',
      studentPopulation: 7500,
      websiteUrl: 'https://www.tlu.ee/en',
      email: 'admissions@tlu.ee',
      phone: null,
      sources: [
        'https://www.tlu.ee/en/find-out-more',
        'https://www.tlu.ee/en/admission-bachelors-studies',
        'https://www.tlu.ee/en/ib'
      ]
    },
    {
      name: 'Tallinn University of Technology',
      abbreviatedName: 'TalTech',
      description:
        "Tallinn University of Technology (TalTech), founded in 1918, is Estonia's technical university, with nearly 10,000 students. It teaches four bachelor's programmes in English: Cyber Security Engineering, Integrated Engineering, International Business Administration and Law. Admission is by an online test and an interview, after a secondary school average of at least 60% of the maximum.",
      country: 'Estonia',
      city: 'Tallinn',
      classification: 'PUBLIC',
      studentPopulation: 10000,
      websiteUrl: 'https://taltech.ee/en',
      email: 'study@taltech.ee',
      phone: null,
      sources: [
        'https://taltech.ee/en/incoming-students',
        'https://taltech.ee/en/programmes',
        'https://taltech.ee/en/admissions'
      ]
    },
    {
      name: 'Masaryk University',
      abbreviatedName: 'MUNI',
      description:
        "Masaryk University in Brno, founded in 1919, has about 30,500 students in ten faculties. Its English-taught bachelor's programmes are run by the Faculties of Social Studies, Economics and Administration, Science, Arts and Education, each with its own admission procedure: a general academic test, documents and an interview, or IB results. Several programmes admit in February as well as September.",
      country: 'Czech Republic',
      city: 'Brno',
      classification: 'PUBLIC',
      studentPopulation: 30500,
      websiteUrl: 'https://www.muni.cz/en',
      email: 'admission@muni.cz',
      phone: null,
      sources: [
        'https://www.muni.cz/en/about-us',
        'https://www.muni.cz/en/admissions/bachelors-and-masters-studies',
        'https://www.muni.cz/en/admissions/bachelors-and-masters-studies/contact-information'
      ]
    },
    {
      name: 'Prague University of Economics and Business',
      abbreviatedName: 'VŠE',
      description:
        "The Prague University of Economics and Business (VŠE), founded in 1953, is the Czech Republic's largest public university of economics and business, with about 14,000 students in five faculties in central Prague; in 2024 it became the first Czech university accredited by AACSB. Eight of its bachelor's programmes are taught in English. Applications for September 2027 open on 1 November 2026, and admission is by interview, essay and video, or a general academic test, depending on the faculty.",
      country: 'Czech Republic',
      city: 'Prague',
      classification: 'PUBLIC',
      studentPopulation: 14000,
      websiteUrl: 'https://www.vse.cz/english/',
      email: 'admissions@vse.cz',
      phone: '+420 224 098 527',
      sources: [
        'https://www.vse.cz/english/',
        'https://admissions.vse.cz/bachelors-programmes/',
        'https://admissions.vse.cz/contacts/'
      ]
    },
    {
      name: 'Reichman University',
      abbreviatedName: 'RUNI',
      description:
        "Reichman University, founded in 1994 in Herzliya as Israel's first private, non-profit institution of higher education, has about 8,400 students. Its Raphael Recanati International School teaches ten undergraduate programmes entirely in English, from business administration, economics and entrepreneurship to government, communication, psychology and computer science. Admission rests on high school grades, an essay, a CV and recommendation letters; no Psychometric test is required.",
      country: 'Israel',
      city: 'Herzliya',
      classification: 'PRIVATE',
      studentPopulation: 8400,
      websiteUrl: 'https://www.runi.ac.il/en/',
      email: 'RRIS.registrar@runi.ac.il',
      phone: '+972 9 960 2700',
      sources: [
        'https://www.runi.ac.il/en/about',
        'https://www.runi.ac.il/en/schools/rris/contact-us',
        'https://www.runi.ac.il/media/gplfunwu/ba-application-and-admissions-regulations-2026-27.pdf'
      ]
    },
    {
      name: 'The Hebrew University of Jerusalem',
      abbreviatedName: 'HUJI',
      description:
        'The Hebrew University of Jerusalem, established in 1918 and opened in 1925, has 23,500 students from Israel and 65 other countries. Its Rothberg International School teaches an International BA in English on the Mount Scopus campus: a three-year double major combining two of liberal arts, business administration and English.',
      country: 'Israel',
      city: 'Jerusalem',
      classification: 'PUBLIC',
      studentPopulation: 23500,
      websiteUrl: 'https://en.huji.ac.il/',
      email: 'risundergrad@savion.huji.ac.il',
      phone: '+972 2 588 2628',
      sources: [
        'https://en.huji.ac.il/university-numbers',
        'https://overseas.huji.ac.il/academics/ba/',
        'https://overseas.huji.ac.il/academics/undergraduate-programs/ugrad-usap/contact-division-undergraduate-studies/'
      ]
    }
  ]
}

export default universities
