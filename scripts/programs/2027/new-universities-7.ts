import type { UniversitiesFile } from '../lib/universities'

/**
 * Universities added for content task 7, Part B1 (Germany), read 2026-10-12.
 *
 * The owner chose on 12 October 2026 (docs/tasks/content-2027/germany-model-decision.md, decision 8) to move
 * TUM's two joint degrees with the Singapore Institute of Technology to Singapore: they are taught there and
 * applied for through SIT's portal. `singaporetech.edu.sg` refuses scripts and WebFetch (a 212-byte page), so
 * its facts come from the Internet Archive's copy of its contact page (15 August 2026) and from its own pages
 * through the search index. It publishes a phone number and an enquiry form but no admissions email, so `email`
 * is null; the joint degrees' program pages name TUM Asia's admissions office for IB questions. No student
 * figure was found on a page that answers. No image or logo: add them in /admin/universities.
 *
 * Dry run: npx tsx scripts/programs/add-universities.ts scripts/programs/2027/new-universities-7.ts
 */
const universities: UniversitiesFile = {
  checkedOn: '2026-10-12',
  universities: [
    {
      name: 'Singapore Institute of Technology',
      abbreviatedName: 'SIT',
      description:
        "The Singapore Institute of Technology is one of Singapore's autonomous universities, teaching through applied learning with industry, and its campus is in Punggol. With the Technical University of Munich it awards two joint Bachelor of Engineering degrees, in Chemical Engineering and in Electronics and Data Engineering, taught in Singapore by both universities.",
      country: 'Singapore',
      city: 'Singapore',
      classification: 'PUBLIC',
      studentPopulation: null,
      websiteUrl: 'https://www.singaporetech.edu.sg/',
      email: null,
      phone: '+65 6592 1189',
      sources: [
        'https://web.archive.org/web/20260815021640/https://www.singaporetech.edu.sg/contact-us',
        'https://www.singaporetech.edu.sg/about/punggol-campus',
        'https://tum-asia.edu.sg/undergraduate-studies/chemical-engineering/',
        'https://tum-asia.edu.sg/undergraduate-studies/electronics-and-data-engineering/'
      ]
    }
  ]
}

export default universities
