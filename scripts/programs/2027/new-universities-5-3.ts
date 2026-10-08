import type { UniversitiesFile } from '../lib/universities'

/**
 * Universities added for content task 5.3 (France), read 2026-10-08.
 *
 * Each one teaches a bachelor's in English that IB Diploma holders enter in the first year; their
 * programs are in this folder's data file named after the university. Seven are public and four
 * are private business schools: the owner chose, on 8 October 2026, the public institutions plus
 * the few private schools IB applicants most often target, and joint degrees only where the first
 * years are in France. Student numbers are the latest each institution publishes. Contacts are the
 * bachelor admissions office's where one is published (data conventions); Université PSL,
 * Université Toulouse Capitole, Centrale Lille and ESSEC publish none for the whole institution,
 * so they are null and the programme notes carry the programme's contact. Sciences Po and emlyon
 * publish only a switchboard or a general address, which is stored. No image or logo: add them
 * in /admin/universities, which uploads them to Storage.
 *
 * Dry run: npx tsx scripts/programs/add-universities.ts scripts/programs/2027/new-universities-5-3.ts
 */
const universities: UniversitiesFile = {
  checkedOn: '2026-10-08',
  universities: [
    {
      name: 'École polytechnique',
      abbreviatedName: 'Polytechnique',
      description:
        "École polytechnique (l'X), founded in 1794, is a public school of science and engineering in Palaiseau, south of Paris, with about 3,700 students, 40% of them international, and a founding member of the Institut Polytechnique de Paris. Its three-year Bachelor of Science is taught entirely in English and leads to a double major in mathematics with computer science, economics or physics. School leavers apply on Polytechnique's own website in one of three rounds, and shortlisted applicants have a remote interview; no French is needed at entry.",
      country: 'France',
      city: 'Palaiseau',
      classification: 'PUBLIC',
      studentPopulation: 3700,
      websiteUrl: 'https://www.polytechnique.edu/en',
      email: 'bachelor-admissions@polytechnique.fr',
      phone: null,
      sources: [
        'https://www.polytechnique.edu/en/school/presentation-ecole-polytechnique',
        'https://programmes.polytechnique.edu/en/bachelor/about-the-bachelor/bachelor-of-science',
        'https://programmes.polytechnique.edu/en/bachelor/admissions/faq'
      ]
    },
    {
      name: 'Sciences Po',
      abbreviatedName: 'Sciences Po',
      description:
        "Sciences Po is a university of the social sciences and humanities, founded in Paris in 1872, with 13,500 students on seven campuses, 40% of them international. Its statutes combine public and private law within the French public higher education system. The three-year Bachelor of Arts is taught at its Undergraduate College: in French in Paris, and on six regional campuses, three of which teach in English with no French required: Le Havre, Menton and Reims. Every student spends the third year abroad. Applicants with a non-French diploma such as the IB apply through the international pathway on Sciences Po's own website, with written pieces and an interview.",
      country: 'France',
      city: 'Paris',
      classification: 'PUBLIC',
      studentPopulation: 13500,
      websiteUrl: 'https://www.sciencespo.fr/en/',
      email: null,
      phone: '+33 1 45 49 50 50',
      sources: [
        'https://www.sciencespo.fr/en/about/overview-facts-and-figures/',
        'https://www.sciencespo.fr/college/en/academics/undergraduate-college-at-a-glance/',
        'https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/'
      ]
    },
    {
      name: 'Université PSL',
      abbreviatedName: 'PSL',
      description:
        "Université PSL (Paris Sciences & Lettres) is a public university in Paris formed by schools such as the École normale supérieure, Mines Paris and Dauphine, with 17,000 students, two thirds of them at master's or doctoral level. Two of its bachelor's are taught entirely in English: the International Bachelor of Science in Artificial Intelligence, in central Paris, and the International Bachelor of Environmentally Engaged Engineering (I-BE³), developed by Mines Paris – PSL and taught on its campus in Sophia Antipolis, on the French Riviera.",
      country: 'France',
      city: 'Paris',
      classification: 'PUBLIC',
      studentPopulation: 17000,
      websiteUrl: 'https://psl.eu/en',
      email: null,
      phone: null,
      sources: [
        'https://psl.eu/en/university/about-us/psl-quick-facts',
        'https://psl.eu/en/education/international-bachelor-science-ai',
        'https://www.minesparis.psl.eu/en/education/i-be3/'
      ]
    },
    {
      name: 'CentraleSupélec',
      abbreviatedName: 'CentraleSupélec',
      description:
        "CentraleSupélec is a public engineering school with more than 5,000 students on four campuses, the main one at Paris-Saclay in Gif-sur-Yvette, south-west of Paris; it co-founded the Université Paris-Saclay. Its bachelor's taught in English are joint four-year degrees with partner universities: with McGill University (two years at Paris-Saclay, then two in Montreal), with City University of Hong Kong (students start at either university), and with ESSEC Business School (at Paris-Saclay and ESSEC's Cergy campus). A fourth, with BITS Pilani, starts in India.",
      country: 'France',
      city: 'Gif-sur-Yvette',
      classification: 'PUBLIC',
      studentPopulation: 5000,
      websiteUrl: 'https://www.centralesupelec.fr/en',
      email: 'bachelors@centralesupelec.fr',
      phone: null,
      sources: [
        'https://www.centralesupelec.fr/en/programmes/bachelor-computer-science-and-artificial-intelligence',
        'https://www.centralesupelec.fr/en/programmes/bachelor-global-engineering',
        'https://www.centralesupelec.fr/en/programmes/bachelor-of-engineering-cityuhk',
        'https://www.centralesupelec.fr/en/programmes/bachelor-ai-data-management-sciences'
      ]
    },
    {
      name: 'Centrale Nantes',
      abbreviatedName: 'Centrale Nantes',
      description:
        'Centrale Nantes (École Centrale de Nantes), founded in 1919, is a public engineering school with more than 2,000 students on its campus in Nantes. Its three-year Bachelor of Science in Engineering is taught entirely in English to a cohort of international students, who are admitted on their application and, if shortlisted, a video interview. French classes run throughout the programme, and no French is needed at entry.',
      country: 'France',
      city: 'Nantes',
      classification: 'PUBLIC',
      studentPopulation: 2000,
      websiteUrl: 'https://www.ec-nantes.fr/english-version',
      email: 'admission@ec-nantes.fr',
      phone: null,
      sources: [
        'https://www.ec-nantes.fr/english-version/press/short-guide-to-centrale-nantes',
        'https://www.ec-nantes.fr/study/undergraduate/bachelor-of-science-in-engineering',
        'https://www.ec-nantes.fr/undergraduate/bachelor-of-science-in-engineering/bachelor-of-science-admissions'
      ]
    },
    {
      name: 'Centrale Lille Institut',
      abbreviatedName: 'Centrale Lille',
      description:
        "Centrale Lille Institut is a public engineering institution in the Lille area, made up of four engineering schools: École Centrale de Lille, ENSCL, IG2I and ITEEM. ITEEM and SKEMA Business School jointly teach a four-year Bachelor's degree in Management and Engineering Sciences in English, on ITEEM's campus in Villeneuve-d'Ascq and SKEMA's in Lille. IB applicants sit the school's own maths and English tests and a video interview in English.",
      country: 'France',
      city: "Villeneuve-d'Ascq",
      classification: 'PUBLIC',
      studentPopulation: null,
      websiteUrl: 'https://centralelille.fr/en/',
      email: null,
      phone: null,
      sources: [
        'https://ecole.centralelille.fr/en/institut/',
        'https://iteem.centralelille.fr/en/bachelor-en-management-et-sciences-de-lingenieur/',
        'https://iteem.centralelille.fr/en/admissions-bachelor/'
      ]
    },
    {
      name: 'Université Toulouse Capitole',
      abbreviatedName: 'UT Capitole',
      description:
        'Université Toulouse Capitole is a public university of law, economics and management with 21,000 students, 3,500 of them international, on campuses in Toulouse, Rodez and Montauban. Its Toulouse School of Management (TSM) teaches a three-year Bachelor of Science in Global Management entirely in English, at public-university fees. International applicants apply on TSM\'s eCandidatures platform, or through Campus France\'s "Études en France" procedure where that applies.',
      country: 'France',
      city: 'Toulouse',
      classification: 'PUBLIC',
      studentPopulation: 21000,
      websiteUrl: 'https://www.ut-capitole.fr/home',
      email: null,
      phone: null,
      sources: [
        'https://www.ut-capitole.fr/accueil/universite/presentation',
        'https://www.ut-capitole.fr/home/course-offer/our-courses/english-taught-courses',
        'https://tsm-education.fr/en/programmes/bachelors/bsc-in-global-management/bsc-1'
      ]
    },
    {
      name: 'ESSEC Business School',
      abbreviatedName: 'ESSEC',
      description:
        "ESSEC Business School is a private business school with 8,543 students in bachelor's and master's programmes on four campuses: Cergy, north-west of Paris, Paris La Défense, Singapore and Rabat. Its four-year Global BBA can be studied in English from the first year on the Cergy campus, and every student spends at least six months abroad. Applicants with an international diploma apply on ESSEC's own platform in one of four rounds, with an interview for those shortlisted.",
      country: 'France',
      city: 'Cergy',
      classification: 'PRIVATE',
      studentPopulation: 8543,
      websiteUrl: 'https://www.essec.edu/en/',
      email: null,
      phone: null,
      sources: [
        'https://www.essec.edu/en/pages/about-essec/',
        'https://www.essec.edu/en/program/global-bba-international/'
      ]
    },
    {
      name: 'ESCP Business School',
      abbreviatedName: 'ESCP',
      description:
        "ESCP Business School is a private business school, founded in Paris in 1819, with more than 11,500 students from 140 nationalities on campuses in Paris, Berlin, London, Madrid, Turin and Warsaw. Its three-year Bachelor in Management (BSc) is taught in English and moves students between three of its European campuses, one a year: the first year in Paris, Berlin, London or Turin. Applicants with a non-French diploma apply on ESCP's own platform, with an online interview.",
      country: 'France',
      city: 'Paris',
      classification: 'PRIVATE',
      studentPopulation: 11500,
      websiteUrl: 'https://escp.eu/',
      email: 'bachelorparis@escp.eu',
      phone: null,
      sources: [
        'https://escp.eu/facts-rankings-accreditations',
        'https://escp.eu/programmes/bachelor-in-management-BSc'
      ]
    },
    {
      name: 'EDHEC Business School',
      abbreviatedName: 'EDHEC',
      description:
        'EDHEC Business School, founded in Lille in 1906, is a private, not-for-profit business school with 8,600 students, 35% of them from abroad, on campuses in Lille, Nice, Paris, London and Singapore. Its four-year International BBA has an English-only Global Business Track: the first year in Nice, the second at UCLA Extension in Los Angeles and the last two at Nanyang Technological University in Singapore. Applicants take an online personality test and an English assessment and have an online interview.',
      country: 'France',
      city: 'Lille',
      classification: 'PRIVATE',
      studentPopulation: 8600,
      websiteUrl: 'https://www.edhec.edu/en',
      email: 'bba.international.admissions@edhec.edu',
      phone: null,
      sources: [
        'https://www.edhec.edu/en/about-us/why-edhec/key-figures',
        'https://www.edhec.edu/en/programmes/bba/admissions-and-tuition-fees/international-admissions'
      ]
    },
    {
      name: 'emlyon business school',
      abbreviatedName: 'emlyon',
      description:
        "emlyon business school was founded in 1872 by the Lyon Chamber of Commerce and is a private business school with 9,865 students of 135 nationalities on campuses in Lyon, Paris and Shanghai. Two of its four-year bachelor's can be studied in English from the first year in Lyon: the Global BBA, and the BSc in Data Science for Responsible Business, taught with École Centrale de Lyon. Applicants with an international diploma apply online and take emlyon's online admission tests.",
      country: 'France',
      city: 'Lyon',
      classification: 'PRIVATE',
      studentPopulation: 9865,
      websiteUrl: 'https://em-lyon.com/en',
      email: 'contact@em-lyon.com',
      phone: null,
      sources: [
        'https://em-lyon.com/en/about-us',
        'https://em-lyon.com/en/student/bachelor/global-bba',
        'https://em-lyon.com/en/student/bachelor/bsc-data-science'
      ]
    }
  ]
}

export default universities
