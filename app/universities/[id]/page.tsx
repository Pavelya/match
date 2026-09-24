/**
 * University Detail Page
 *
 * Displays detailed information about a specific university.
 * Accessible from program pages when clicking on university name.
 */

import { cache } from 'react'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PageContainer } from '@/components/layout/PageContainer'
import { UniversityDetailClient } from './UniversityDetailClient'
import { serializeJsonLd } from '@/lib/utils'

interface PageProps {
  params: Promise<{ id: string }>
}

// One read per render, shared by generateMetadata and the page: React's cache
// memoises it for the rest of the request. Selected, not included - `include`
// returned University.logo, which can hold an inline base64 image (365KB for
// Toronto) that this page never shows, and every column of every program.
// Keep this to the fields read below.
const getUniversity = cache((id: string) =>
  prisma.university.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      abbreviatedName: true,
      description: true,
      city: true,
      classification: true,
      studentPopulation: true,
      image: true,
      websiteUrl: true,
      email: true,
      phone: true,
      country: {
        select: { id: true, name: true, code: true, flagEmoji: true }
      },
      programs: {
        select: {
          id: true,
          name: true,
          degreeType: true,
          duration: true,
          minIBPoints: true,
          fieldOfStudy: { select: { id: true, name: true } }
        },
        orderBy: {
          name: 'asc'
        }
      },
      _count: {
        select: {
          programs: true
        }
      }
    }
  })
)

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ibmatch.com'

  const university = await getUniversity(id)

  if (!university) {
    return {
      title: 'University Not Found'
    }
  }

  const title = `${university.name} - IB Match`
  const description = university.description.slice(0, 160)

  return {
    title,
    description,
    openGraph: {
      title: university.name,
      description,
      type: 'website',
      url: `${baseUrl}/universities/${id}`,
      siteName: 'IB Match',
      images: university.image
        ? [
            {
              url: university.image,
              width: 1200,
              height: 630,
              alt: university.name
            }
          ]
        : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: university.name,
      description
    },
    alternates: {
      canonical: `${baseUrl}/universities/${id}`
    }
  }
}

export default async function UniversityDetailPage({ params }: PageProps) {
  const { id } = await params

  const university = await getUniversity(id)

  if (!university) {
    notFound()
  }

  // Transform data for client component
  const universityData = {
    id: university.id,
    name: university.name,
    abbreviatedName: university.abbreviatedName,
    description: university.description,
    city: university.city,
    country: {
      id: university.country.id,
      name: university.country.name,
      code: university.country.code,
      flagEmoji: university.country.flagEmoji
    },
    classification: university.classification,
    studentPopulation: university.studentPopulation,
    image: university.image,
    websiteUrl: university.websiteUrl,
    email: university.email,
    phone: university.phone,
    programCount: university._count.programs,
    programs: university.programs.map((program) => ({
      id: program.id,
      name: program.name,
      degreeType: program.degreeType,
      duration: program.duration,
      minIBPoints: program.minIBPoints,
      fieldOfStudy: {
        id: program.fieldOfStudy.id,
        name: program.fieldOfStudy.name
      }
    }))
  }

  // JSON-LD structured data for SEO and AI search (Task 2.3: Enhanced comprehensive schema)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: university.name,
    alternateName: university.abbreviatedName,
    description: university.description,
    url: university.websiteUrl,
    sameAs: university.websiteUrl, // Official university website
    address: {
      '@type': 'PostalAddress',
      addressLocality: university.city,
      addressCountry: university.country.code
    },
    ...(university.email && { email: university.email }),
    ...(university.phone && { telephone: university.phone }),
    ...(university.image && {
      logo: university.image,
      image: university.image
    }),
    ...(university.studentPopulation && {
      numberOfStudents: university.studentPopulation,
      // Additional context for AI understanding
      alumni: {
        '@type': 'Organization',
        name: `${university.name} Alumni`
      }
    }),
    // Accepted credentials (IB Diploma)
    acceptsCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'International Baccalaureate Diploma',
      description: `${university.name} accepts the International Baccalaureate Diploma for undergraduate admission`
    },
    // Programs catalog with IB requirements
    hasOfferCatalog:
      university.programs.length > 0
        ? {
            '@type': 'OfferCatalog',
            name: `${university.name} Academic Programs`,
            itemListElement: university.programs.map((program, index) => ({
              '@type': 'EducationalOccupationalProgram',
              position: index + 1,
              name: program.name,
              programType: program.degreeType,
              timeToComplete: program.duration,
              occupationalCategory: program.fieldOfStudy.name,
              ...(program.minIBPoints && {
                educationalCredentialAwarded: {
                  '@type': 'EducationalOccupationalCredential',
                  credentialCategory: 'International Baccalaureate Diploma',
                  competencyRequired: `${program.minIBPoints} IB Points`
                }
              }),
              provider: {
                '@type': 'CollegeOrUniversity',
                name: university.name
              }
            }))
          }
        : undefined
  }

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <UniversityDetailClient university={universityData} />
    </PageContainer>
  )
}
