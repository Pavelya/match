/**
 * IB University Requirements — Country Catalog Hub
 *
 * Entry point for students to find country-specific IB Diploma admission guides.
 * Links to the dedicated country pages and provides program search for countries
 * without dedicated guides yet.
 */

import { prisma } from '@/lib/prisma'
import { getCachedFields, getCachedCountriesWithPrograms } from '@/lib/reference-data'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { RequirementsContent } from './RequirementsContent'
import { pageDates } from '@/lib/page-dates'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const revalidate = 604800 // 7 days

export const metadata = {
  title: 'IB Diploma Admission Rules by Country (2027)',
  description:
    'Find how universities around the world evaluate the IB Diploma. Country-by-country guides to recognition, grade conversion, application systems, and entry requirements.',
  keywords: [
    'IB university requirements',
    'IB diploma admission by country',
    'IB recognition by country',
    'IB diploma university admission',
    'international baccalaureate requirements',
    'IB points university',
    'IB admission requirements by country',
    'HL SL requirements university',
    'IB 2027 requirements',
    'IB grade conversion by country'
  ],
  openGraph: {
    title: 'IB Diploma Admission Rules by Country (2027)',
    description:
      'Country-by-country catalog of IB Diploma recognition, grade conversion, and university admission rules, with IB requirements for 1,000+ programs.',
    type: 'website',
    url: `${baseUrl}/ib-university-requirements`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Diploma Admission Rules by Country (2027)',
    description:
      'Find how universities worldwide evaluate the IB Diploma — country-by-country guides.'
  },
  alternates: {
    canonical: `${baseUrl}/ib-university-requirements`
  }
}

/**
 * Map of country codes (ISO 3166-1 alpha-2) to their dedicated guide page slugs.
 * Countries in this map get a primary card linking to the guide.
 * Countries NOT in this map get a secondary card linking to program search.
 */
const COUNTRY_GUIDE_SLUGS: Record<string, { slug: string; summary: string }> = {
  AU: {
    slug: 'australia',
    summary: 'ATAR-equivalent conversion · UAC and VTAC application systems'
  },
  AT: {
    slug: 'austria',
    summary: 'University entrance qualification if criteria are met · Direct university application'
  },
  BE: {
    slug: 'belgium',
    summary: 'No equivalence needed in either Community · Entrance exams for Medicine and Dentistry'
  },
  CA: {
    slug: 'canada',
    summary: 'Province-specific rules · Transfer credit for HL courses'
  },
  CZ: {
    slug: 'czech-republic',
    summary: 'Nostrification exemption · Direct application to universities'
  },
  DK: {
    slug: 'denmark',
    summary: 'Quota system · Apply via optagelse.dk'
  },
  EE: {
    slug: 'estonia',
    summary: 'Accepted without Estonian state exams · Apply via DreamApply'
  },
  DE: {
    slug: 'germany',
    summary: 'KMK subject rules for direct access · KMK grade conversion · uni-assist or direct'
  },
  HK: {
    slug: 'hong-kong',
    summary: 'Non-JUPAS direct application · IB widely accepted'
  },
  IL: {
    slug: 'israel',
    summary: 'Bagrut equivalent · Psychometric Entrance Test (PET) · Direct application'
  },
  JP: {
    slug: 'japan',
    summary:
      'MEXT recognition since 1979 · Decentralized admission · EJU for Japanese-taught programs'
  },
  NL: {
    slug: 'netherlands',
    summary: 'VWO equivalence via Nuffic · Studielink application · Numerus Fixus selection'
  },
  IE: {
    slug: 'ireland',
    summary: 'IB → CAO points conversion · Centralized CAO application'
  },
  PL: {
    slug: 'poland',
    summary:
      'Automatic recognition by law · Decentralized admission · University-specific conversion'
  },
  PT: {
    slug: 'portugal',
    summary:
      'Concurso Especial for international students · Equivalence only for the national competition'
  },
  IT: {
    slug: 'italy',
    summary: 'CIMEA attestation and verification · Universitaly pre-enrolment for visa applicants'
  },
  ES: {
    slug: 'spain',
    summary: 'No access exam for IB holders · UNEDasiss accreditation · 5–14 admission grade'
  },
  SE: {
    slug: 'sweden',
    summary: 'IB → Swedish grade conversion · Apply via universityadmissions.se'
  },
  CH: {
    slug: 'switzerland',
    summary: 'University-specific IB rules · Published by swissuniversities'
  },
  GB: {
    slug: 'uk',
    summary: 'UCAS application · No national conversion; each university sets its IB offer'
  },
  US: {
    slug: 'usa',
    summary: 'Holistic admission · College credit for HL scores'
  },
  SG: {
    slug: 'singapore',
    summary: 'Decentralized admission · Highly competitive · Offers after final IB results'
  }
}

export default async function IBUniversityRequirementsPage() {
  const [stats, _countries, fields] = await Promise.all([
    prisma.academicProgram.aggregate({
      where: { minIBPoints: { not: null } },
      _count: true,
      _min: { minIBPoints: true },
      _max: { minIBPoints: true },
      _avg: { minIBPoints: true }
    }),
    getCachedCountriesWithPrograms(),
    getCachedFields()
  ])

  // Get program counts by country
  const programsByCountry = await prisma.academicProgram.groupBy({
    by: ['universityId'],
    where: { minIBPoints: { not: null } },
    _count: true,
    _min: { minIBPoints: true },
    _max: { minIBPoints: true },
    _avg: { minIBPoints: true }
  })

  const universities = await prisma.university.findMany({
    select: {
      id: true,
      name: true,
      abbreviatedName: true,
      country: {
        select: {
          id: true,
          name: true,
          code: true,
          flagEmoji: true
        }
      }
    }
  })

  // Aggregate by country
  const countryStats = new Map<
    string,
    {
      country: { id: string; name: string; code: string; flagEmoji: string }
      programCount: number
      minPoints: number
      maxPoints: number
      totalPoints: number
      countForAvg: number
    }
  >()

  programsByCountry.forEach((program) => {
    const university = universities.find((u) => u.id === program.universityId)
    if (!university) return

    const countryId = university.country.id
    if (!countryStats.has(countryId)) {
      countryStats.set(countryId, {
        country: university.country,
        programCount: 0,
        minPoints: program._min.minIBPoints || 45,
        maxPoints: program._max.minIBPoints || 24,
        totalPoints: 0,
        countForAvg: 0
      })
    }

    const stat = countryStats.get(countryId)!
    stat.programCount += program._count
    stat.minPoints = Math.min(stat.minPoints, program._min.minIBPoints || 45)
    stat.maxPoints = Math.max(stat.maxPoints, program._max.minIBPoints || 24)
    if (program._avg.minIBPoints) {
      stat.totalPoints += program._avg.minIBPoints * program._count
      stat.countForAvg += program._count
    }
  })

  const countryData = Array.from(countryStats.values())
    .map((stat) => ({
      id: stat.country.id,
      name: stat.country.name,
      code: stat.country.code,
      flagEmoji: stat.country.flagEmoji,
      programCount: stat.programCount,
      minPoints: stat.minPoints,
      maxPoints: stat.maxPoints,
      avgPoints: stat.countForAvg > 0 ? Math.round(stat.totalPoints / stat.countForAvg) : 0,
      // Attach guide info if available
      guideSlug: COUNTRY_GUIDE_SLUGS[stat.country.code]?.slug || null,
      guideSummary: COUNTRY_GUIDE_SLUGS[stat.country.code]?.summary || null
    }))
    .sort((a, b) => {
      // Countries with guides first, then by program count
      if (a.guideSlug && !b.guideSlug) return -1
      if (!a.guideSlug && b.guideSlug) return 1
      return b.programCount - a.programCount
    })

  // Field data
  const programsByField = await prisma.academicProgram.groupBy({
    by: ['fieldOfStudyId'],
    where: { minIBPoints: { not: null } },
    _count: true,
    _avg: { minIBPoints: true }
  })

  const fieldData = fields
    .map((field) => {
      const stat = programsByField.find((p) => p.fieldOfStudyId === field.id)
      return {
        id: field.id,
        name: field.name,
        iconName: field.iconName,
        description: field.description,
        programCount: stat?._count || 0,
        avgPoints: stat?._avg.minIBPoints ? Math.round(stat._avg.minIBPoints) : 0
      }
    })
    .filter((f) => f.programCount > 0)
    .sort((a, b) => b.programCount - a.programCount)

  // JSON-LD schemas
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'IB Diploma Admission Rules by Country',
    description:
      'Country-by-country catalog of IB Diploma recognition, grade conversion, and university admission rules worldwide.',
    url: `${baseUrl}/ib-university-requirements`,
    ...pageDates('/ib-university-requirements'),
    isPartOf: {
      '@type': 'WebSite',
      name: 'IB Match',
      url: baseUrl
    },
    about: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'International Baccalaureate Diploma',
      description: 'University admission requirements for IB Diploma holders worldwide'
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: ['IB Student', 'IB Coordinator', 'Parent']
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.country-card', 'article p', '.faq-answer']
    },
    hasPart: countryData
      .filter((c) => c.guideSlug)
      .map((c) => ({
        '@type': 'WebPage',
        name: `Study in ${c.name} with the IB Diploma`,
        url: `${baseUrl}/study-in-${c.guideSlug}-with-ib-diploma`
      }))
  }

  const minPoints = stats._min.minIBPoints || 24
  const maxPoints = stats._max.minIBPoints || 45

  // One list feeds both the visible FAQ and the FAQPage JSON-LD, so they cannot drift.
  // Country facts follow the country pages as refreshed for the 2027 intake.
  const faqs = [
    {
      question: 'Which countries accept the IB Diploma for university admission?',
      // IB figure, checked 25 September 2026:
      // https://ibo.org/university-admission/find-countries-and-universities-that-recognize-the-ib/
      answer:
        'Universities in more than 110 countries and territories admit IB Diploma students — each year, over 4,500 of them receive IB transcripts, according to the IB. Each country has its own process for evaluating IB results: some convert them to a local scale (CAO points in Ireland, an ATAR equivalent in Australia), while others, like universities in the UK, set their own IB requirements for each course. Use the country guides above to find the rules for your target country.'
    },
    {
      question: 'How do universities convert IB scores to local grading systems?',
      answer:
        'Conversion methods vary by country. Ireland converts IB scores to CAO points, Australia to an ATAR equivalent, Sweden to a merit rating, Germany to a German grade with the KMK formula, and Spain to an admission grade on a 5–14 scale. The UK has no national conversion: each university sets its own IB requirements. Our country guides explain each system with official sources.'
    },
    {
      question: 'What IB points do I need for university?',
      answer: `Minimum requirements in our database range from ${minPoints} to ${maxPoints} points, depending on the program, institution, and country. Competitive programs at top universities often ask for 38 or more, while less selective programs may accept 24–30. Many programs also require specific subjects at Higher Level (HL) with minimum grades.`
    },
    {
      question: 'Do I need specific Higher Level (HL) subjects?',
      answer:
        'Many universities require specific subjects at HL with minimum grades. For example, Engineering programs often require Math HL (grade 5–6+), Medicine typically requires Chemistry HL and Biology HL, and Economics programs prefer Math HL. Some countries also set rules for every IB applicant: in Germany, one of your HL subjects must be a language, mathematics or a natural science. Requirements vary by country and institution — check our country guides for details.'
    },
    {
      question: 'Do I need to take entrance exams as an IB student?',
      answer:
        'It depends on the country and the program. In most countries the IB Diploma is enough to apply, and Spain exempts IB holders from its university access exam. Competitive programs often add a test: admissions tests for some UK courses, HPAT-Ireland for Medicine in Ireland, the MedAT for Medicine and Dentistry in Austria, entrance exams for Medicine and Dentistry in Belgium, and the IMAT for English-taught Medicine in Italy. Most Israeli universities also use the Psychometric Entrance Test (PET), and HKU interviews shortlisted applicants.'
    }
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="flex min-h-screen flex-col">
        <RequirementsContent
          stats={{
            totalPrograms: stats._count,
            minPoints,
            maxPoints,
            avgPoints: stats._avg.minIBPoints ? Math.round(stats._avg.minIBPoints) : 35,
            countriesCount: countryData.length
          }}
          countries={countryData}
          fields={fieldData}
          faqs={faqs}
        />
      </main>
      <StudentFooter />
    </>
  )
}
