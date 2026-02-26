/**
 * IB University Requirements — Country Catalog Hub
 *
 * Entry point for students to find country-specific IB Diploma admission guides.
 * Links to 16 dedicated country pages and provides program search for countries
 * without dedicated guides yet.
 */

import { prisma } from '@/lib/prisma'
import { getCachedFields, getCachedCountriesWithPrograms } from '@/lib/reference-data'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { RequirementsContent } from './RequirementsContent'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

export const revalidate = 604800 // 7 days

export const metadata = {
  title: 'IB Diploma Admission Rules by Country (2026) | IB Match',
  description:
    'Find how universities in 30+ countries evaluate the IB Diploma. Country-by-country guides to recognition, grade conversion, application systems, and entry requirements.',
  keywords: [
    'IB university requirements',
    'IB diploma admission by country',
    'IB recognition by country',
    'IB diploma university admission',
    'international baccalaureate requirements',
    'IB points university',
    'IB admission requirements by country',
    'HL SL requirements university',
    'IB 2026 requirements',
    'IB grade conversion by country'
  ],
  openGraph: {
    title: 'IB Diploma Admission Rules by Country (2026)',
    description:
      'Country-by-country catalog of IB Diploma recognition, grade conversion, and university admission rules. 30+ countries, 1000+ programs.',
    type: 'website',
    url: `${baseUrl}/ib-university-requirements`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Diploma Admission Rules by Country (2026)',
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
    summary: 'ATAR conversion · UAC/VTAC/QTAC application systems'
  },
  AT: {
    slug: 'austria',
    summary: 'Full recognition · Direct university application'
  },
  BE: {
    slug: 'belgium',
    summary: 'Community-based system · Flemish & French recognition'
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
    summary: 'Full recognition · Apply via DreamApply or direct'
  },
  DE: {
    slug: 'germany',
    summary: 'Allgemeine Hochschulreife equivalent · uni-assist or direct'
  },
  HK: {
    slug: 'hong-kong',
    summary: 'JUPAS/Non-JUPAS pathways · IB widely accepted'
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
    summary: 'DGE equivalency · Concurso Especial · Binary system (universities + polytechnics)'
  },
  IT: {
    slug: 'italy',
    summary: 'Dichiarazione di valore · Universitaly portal'
  },
  ES: {
    slug: 'spain',
    summary: 'Full recognition · UNED accreditation for grade conversion'
  },
  SE: {
    slug: 'sweden',
    summary: 'IB → Swedish grade conversion · Apply via universityadmissions.se'
  },
  CH: {
    slug: 'switzerland',
    summary: 'Full recognition · Swissuniversities guidelines'
  },
  GB: {
    slug: 'uk',
    summary: 'UCAS Tariff points · Conditional offers based on IB total'
  },
  US: {
    slug: 'usa',
    summary: 'Holistic admission · College credit for HL scores'
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
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which countries accept the IB Diploma for university admission?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The IB Diploma is recognized by universities in over ${countryData.length} countries worldwide, including the United Kingdom, United States, Canada, Australia, Germany, Switzerland, and many more. Each country has its own process for evaluating IB scores — some convert them to local equivalents, while others accept IB points directly.`
        }
      },
      {
        '@type': 'Question',
        name: 'How do universities convert IB scores to local grading systems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conversion methods vary by country. For example, the UK uses UCAS Tariff points, Ireland converts IB scores to CAO points, Sweden maps them to the Swedish grade scale, and Australia converts to an ATAR. Our country guides explain each conversion system in detail with official sources.'
        }
      },
      {
        '@type': 'Question',
        name: 'What IB points do I need for university?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `University IB requirements range from ${stats._min.minIBPoints || 24} to ${stats._max.minIBPoints || 45} points depending on the program, institution, and country. Competitive programs at top universities typically require 38–45 points, while less selective programs may accept 24–30 points.`
        }
      },
      {
        '@type': 'Question',
        name: 'Do I need specific HL subjects for university admission?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many universities require specific subjects at Higher Level (HL) with minimum grades. For example, Engineering programs often require Math HL, Medicine typically requires Chemistry HL and Biology HL, and Economics programs prefer Math HL. Requirements vary by country and institution.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I need to take entrance exams as an IB student?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This depends on the country and program. In many European countries (UK, Germany, Sweden), no entrance exams are required. However, some countries have specific tests — for example, Ireland requires HPAT for Medicine, Spain requires the PCE exam through UNED for grade conversion, and Australia may require additional tests for competitive programs.'
        }
      }
    ]
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
            minPoints: stats._min.minIBPoints || 24,
            maxPoints: stats._max.minIBPoints || 45,
            avgPoints: stats._avg.minIBPoints ? Math.round(stats._avg.minIBPoints) : 35,
            countriesCount: countryData.length
          }}
          countries={countryData}
          fields={fieldData}
        />
      </main>
      <StudentFooter />
    </>
  )
}
