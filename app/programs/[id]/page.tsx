/**
 * Program Detail Page
 *
 * Displays detailed information about a specific university program.
 * Uses ProgramCard with variant="detail" for unified component usage.
 */

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import { PageContainer } from '@/components/layout/PageContainer'
import { ProgramCard } from '@/components/student/ProgramCard'
import { calculateMatch } from '@/lib/matching'
import { transformStudent, transformProgram } from '@/lib/matching/transformers'
import type { MatchResult } from '@/lib/matching/types'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ibmatch.com'

  const program = await prisma.academicProgram.findUnique({
    where: { id },
    include: {
      university: true
    }
  })

  if (!program) {
    return {
      title: 'Program Not Found'
    }
  }

  const title = `${program.name} at ${program.university.name}`
  const description = program.description.slice(0, 160)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/programs/${id}`,
      siteName: 'IB Match',
      images: program.university.image
        ? [
            {
              url: program.university.image,
              width: 1200,
              height: 630,
              alt: program.university.name
            }
          ]
        : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    },
    alternates: {
      canonical: `${baseUrl}/programs/${id}`
    }
  }
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { id } = await params

  // Fetch program with all related data
  const program = await prisma.academicProgram.findUnique({
    where: { id },
    include: {
      university: {
        include: {
          country: true
        }
      },
      fieldOfStudy: true,
      courseRequirements: {
        include: {
          ibCourse: true
        }
      }
    }
  })

  if (!program) {
    notFound()
  }

  // Check if user is logged in and get student profile for matching
  const session = await auth()
  let matchResult: MatchResult | null = null
  let studentProfile = null

  if (session?.user?.id) {
    studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        courses: {
          include: {
            ibCourse: true
          }
        },
        preferredFields: true,
        preferredCountries: true
      }
    })

    if (studentProfile) {
      const transformedStudent = transformStudent(studentProfile)
      const transformedProgram = transformProgram(program)
      matchResult = calculateMatch({
        student: transformedStudent,
        program: transformedProgram,
        mode: 'BALANCED'
      })
    }
  }

  // Transform program data for ProgramCard
  const programForCard = {
    id: program.id,
    name: program.name,
    description: program.description,
    degreeType: program.degreeType,
    duration: program.duration,
    minIBPoints: program.minIBPoints,
    programUrl: program.programUrl,
    city: program.university.city,
    university: {
      name: program.university.name,
      abbreviation: program.university.abbreviatedName,
      image: program.university.image,
      description: program.university.description,
      websiteUrl: program.university.websiteUrl
    },
    country: {
      id: program.university.country.id,
      name: program.university.country.name,
      code: program.university.country.code,
      flagEmoji: program.university.country.flagEmoji
    },
    fieldOfStudy: {
      id: program.fieldOfStudy.id,
      name: program.fieldOfStudy.name,
      iconName: program.fieldOfStudy.iconName,
      description: program.fieldOfStudy.description
    },
    courseRequirements: program.courseRequirements
  }

  // Transform student profile for ProgramCard
  const studentProfileForCard = studentProfile
    ? {
        courses: studentProfile.courses.map((c) => ({
          ibCourse: { id: c.ibCourse.id, name: c.ibCourse.name },
          level: c.level,
          grade: c.grade
        })),
        preferredFields: studentProfile.preferredFields.map((f) => ({
          id: f.id,
          name: f.name
        })),
        preferredCountries: studentProfile.preferredCountries.map((c) => ({
          id: c.id,
          name: c.name
        })),
        totalIBPoints: studentProfile.totalIBPoints
      }
    : null

  // JSON-LD structured data for SEO and AI search
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: program.name,
    description: program.description,
    provider: {
      '@type': 'CollegeOrUniversity',
      name: program.university.name,
      url: program.university.websiteUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: program.university.city,
        addressCountry: program.university.country.code
      }
    },
    educationalProgramMode: 'full-time',
    programType: program.degreeType,
    timeToComplete: program.duration,
    occupationalCategory: program.fieldOfStudy.name,
    offers: {
      '@type': 'Offer',
      category: 'Academic Program'
    }
  }

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProgramCard
        program={programForCard}
        matchResult={matchResult ?? undefined}
        variant="detail"
        studentProfile={studentProfileForCard}
      />
    </PageContainer>
  )
}
