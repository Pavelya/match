/**
 * IB University Requirements Landing Page
 *
 * High-authority content page targeting "IB university requirements" queries.
 * Provides comprehensive overview of IB admission requirements by country and field.
 */

import { prisma } from '@/lib/prisma'
import { getCachedFields, getCachedCountriesWithPrograms } from '@/lib/reference-data'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { RequirementsContent } from './RequirementsContent'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ibmatch.com'

// Revalidate once per week (program/country data doesn't change daily)
export const revalidate = 604800 // 7 days in seconds

export const metadata = {
  title: 'IB University Requirements 2026/27: Complete Guide by Country & Program | IB Match',
  description:
    'Comprehensive guide to IB Diploma university requirements worldwide. Compare IB points, subject requirements (HL/SL), and admission criteria for 1000+ programs across 30+ countries.',
  keywords: [
    'IB university requirements',
    'IB diploma university admission',
    'international baccalaureate requirements',
    'IB points university',
    'IB admission requirements by country',
    'HL SL requirements university',
    'IB 2026/27 requirements',
    'university IB points needed',
    'IB subject requirements',
    'minimum IB points university'
  ],
  openGraph: {
    title: 'IB University Requirements 2026/27: Complete Guide',
    description:
      'Compare IB Diploma admission requirements for 1000+ programs worldwide. Find IB points and subject requirements by country and field of study.',
    type: 'website',
    url: `${baseUrl}/ib-university-requirements`,
    siteName: 'IB Match'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB University Requirements 2026/27',
    description:
      'Complete guide to IB Diploma admission requirements worldwide - 1000+ programs across 30+ countries.'
  },
  alternates: {
    canonical: `${baseUrl}/ib-university-requirements`
  }
}

export default async function IBUniversityRequirementsPage() {
  // Fetch comprehensive stats from database
  const [stats, _countries, fields] = await Promise.all([
    // IB points statistics
    prisma.academicProgram.aggregate({
      where: { minIBPoints: { not: null } },
      _count: true,
      _min: { minIBPoints: true },
      _max: { minIBPoints: true },
      _avg: { minIBPoints: true }
    }),
    // Countries with programs
    getCachedCountriesWithPrograms(),
    // Fields of study
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

  // Get university-country mapping
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
  const countryStats = new Map()
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

    const stat = countryStats.get(countryId)
    stat.programCount += program._count
    stat.minPoints = Math.min(stat.minPoints, program._min.minIBPoints || 45)
    stat.maxPoints = Math.max(stat.maxPoints, program._max.minIBPoints || 24)
    if (program._avg.minIBPoints) {
      stat.totalPoints += program._avg.minIBPoints * program._count
      stat.countForAvg += program._count
    }
  })

  // Convert to array and calculate averages
  const countryData = Array.from(countryStats.values())
    .map((stat) => ({
      id: stat.country.id,
      name: stat.country.name,
      code: stat.country.code,
      flagEmoji: stat.country.flagEmoji,
      programCount: stat.programCount,
      minPoints: stat.minPoints,
      maxPoints: stat.maxPoints,
      avgPoints: stat.countForAvg > 0 ? Math.round(stat.totalPoints / stat.countForAvg) : 0
    }))
    .sort((a, b) => b.programCount - a.programCount)

  // Get program counts by field
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
    '@type': 'WebPage',
    name: 'IB University Requirements Guide',
    description:
      'Comprehensive guide to IB Diploma admission requirements for universities worldwide',
    url: `${baseUrl}/ib-university-requirements`,
    about: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'International Baccalaureate Diploma',
      description: 'University admission requirements for IB Diploma holders'
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What IB points do I need for university?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'University IB requirements range from 24 to 45 points depending on the program and institution. Competitive programs at top universities typically require 38-45 points, while less selective programs may accept 24-30 points. Use our database to find specific requirements for each program.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which countries accept the IB Diploma?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Universities in over ${countryData.length} countries accept the IB Diploma, including the UK, USA, Canada, Australia, Netherlands, Singapore, and many more. The IB Diploma is recognized worldwide as a university entrance qualification.`
        }
      },
      {
        '@type': 'Question',
        name: 'What are HL and SL requirements?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HL (Higher Level) and SL (Standard Level) refer to the depth of study in IB courses. Universities often require specific subjects at HL (e.g., Math HL for Engineering) with minimum grades (typically 5-7). Check individual program pages for specific HL/SL requirements.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do universities evaluate IB scores?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Universities evaluate IB applications based on: (1) Total IB points (out of 45), (2) Specific subject grades and levels (HL/SL), (3) Subject relevance to the program. Some universities also consider Theory of Knowledge and Extended Essay scores.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the average IB requirement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Based on our database of ${stats._count} programs, the average IB requirement is approximately ${stats._avg.minIBPoints ? Math.round(stats._avg.minIBPoints) : 35} points. However, this varies significantly by country, field of study, and university ranking.`
        }
      },
      {
        '@type': 'Question',
        name: 'Can I search programs by my IB points?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, use our program search tool to filter universities by your predicted or achieved IB points. You can also filter by country, field of study, and specific IB subject requirements to find programs that match your profile.'
        }
      }
    ]
  }

  return (
    <>
      {/* JSON-LD Schemas */}
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
