/**
 * Program Detail Page
 *
 * Displays detailed information about a specific university program.
 * Uses ProgramCard with variant="detail" for unified component usage.
 *
 * NOTE: Coordinator access to student program matches is handled by a dedicated route:
 * /coordinator/students/[studentId]/matches/[programId]
 * This page is for students viewing their own matches or public program browsing.
 */

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import { PageContainer } from '@/components/layout/PageContainer'
import { ProgramDetailClient } from './ProgramDetailClient'
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
      university: {
        include: {
          country: true
        }
      },
      courseRequirements: {
        include: {
          ibCourse: true
        }
      },
      fieldOfStudy: true
    }
  })

  if (!program) {
    return {
      title: 'Program Not Found'
    }
  }

  // SEO-optimized title with IB-specific keywords (Task 1.1)
  // Format: "IB Requirements: [Program] at [University] | [Points] Points"
  // Respects 60-char limit for optimal SEO performance
  const generateSEOTitle = () => {
    const programName = program.name
    const universityName = program.university.name
    const ibPoints = program.minIBPoints

    // Target format: "IB Requirements: [Program] at [Uni] | [X] Points"
    if (ibPoints) {
      const baseTitle = `IB Requirements: ${programName} at ${universityName} | ${ibPoints} Points`

      // If under 60 chars, use full title
      if (baseTitle.length <= 60) {
        return baseTitle
      }

      // Truncate program/university names to fit critical keywords
      // Priority: "IB Requirements" + program name + university + points
      const shortened = `IB: ${programName} at ${universityName} | ${ibPoints}pts`
      if (shortened.length <= 60) {
        return shortened
      }

      // Further truncation: use university abbreviation if available
      const abbrev = program.university.abbreviatedName || universityName
      const compact = `IB: ${programName} at ${abbrev} | ${ibPoints}pts`
      if (compact.length <= 60) {
        return compact
      }

      // Last resort: truncate program name
      const maxProgramLength = 60 - `IB:  at ${abbrev} | ${ibPoints}pts`.length
      const truncatedProgram = programName.slice(0, maxProgramLength)
      return `IB: ${truncatedProgram} at ${abbrev} | ${ibPoints}pts`
    }

    // Fallback for programs without IB points requirement
    const fallbackTitle = `${programName} at ${universityName} | IB Match`
    if (fallbackTitle.length <= 60) {
      return fallbackTitle
    }

    // Truncate to fit
    const abbrev = program.university.abbreviatedName || universityName
    const shortFallback = `${programName} at ${abbrev}`
    return shortFallback.length <= 60 ? shortFallback : shortFallback.slice(0, 57) + '...'
  }

  const title = generateSEOTitle()

  // SEO-optimized meta description with IB requirements (Task 1.2)
  // Format: "Explore IB admission requirements for [Program] at [University].
  //          Minimum [X] IB points, [HL/SL subjects]. Check your match probability based on the 2026/27 cycle."
  // Respects 160-char limit for optimal SEO performance
  const generateSEODescription = () => {
    const programName = program.name
    const universityName = program.university.name
    const ibPoints = program.minIBPoints
    const currentYear = new Date().getFullYear()
    const academicCycle = `${currentYear}/${(currentYear + 1) % 100}` // e.g., "2026/27"

    // Build subject requirements string (max 2-3 key subjects for brevity)
    let subjectText = ''
    if (program.courseRequirements && program.courseRequirements.length > 0) {
      // Group by orGroupId to handle OR-groups correctly
      const requirements = program.courseRequirements
      const uniqueRequirements: Array<{ course: string; level: string; grade: number }> = []
      const processedGroups = new Set<string>()

      for (const req of requirements) {
        // For OR-groups, only take the first option
        if (req.orGroupId) {
          if (processedGroups.has(req.orGroupId)) continue
          processedGroups.add(req.orGroupId)
        }

        uniqueRequirements.push({
          course: req.ibCourse.name,
          level: req.requiredLevel,
          grade: req.minGrade
        })

        // Limit to 3 subjects for description brevity
        if (uniqueRequirements.length >= 3) break
      }

      if (uniqueRequirements.length > 0) {
        const subjectsList = uniqueRequirements
          .map((r) => `${r.level} ${r.course} ${r.grade}`)
          .join(', ')
        subjectText = `, ${subjectsList}`
      }
    }

    // Build description with progressive fallbacks for length
    if (ibPoints) {
      // Full format with all details
      const fullDesc = `Explore IB admission requirements for ${programName} at ${universityName}. Minimum ${ibPoints} IB points${subjectText}. Check your match probability based on the ${academicCycle} cycle.`

      if (fullDesc.length <= 160) {
        return fullDesc
      }

      // Shortened format: remove cycle year
      const withoutCycle = `Explore IB admission requirements for ${programName} at ${universityName}. Minimum ${ibPoints} IB points${subjectText}. Check your match probability.`

      if (withoutCycle.length <= 160) {
        return withoutCycle
      }

      // More concise: simplify intro
      const concise = `IB requirements for ${programName} at ${universityName}: ${ibPoints} points${subjectText}. See your match probability.`

      if (concise.length <= 160) {
        return concise
      }

      // Remove subjects if still too long
      const withoutSubjects = `IB requirements for ${programName} at ${universityName}: minimum ${ibPoints} IB points. Check if you match based on ${academicCycle} admission data.`

      if (withoutSubjects.length <= 160) {
        return withoutSubjects
      }

      // Ultra-concise fallback
      const minimal = `${programName} at ${universityName} requires ${ibPoints} IB points. See your match probability for ${academicCycle}.`

      if (minimal.length <= 160) {
        return minimal
      }

      // Last resort: truncate program name
      const maxProgramLength =
        160 -
        ` at ${universityName} requires ${ibPoints} IB points. See match for ${academicCycle}.`
          .length
      const truncatedProgram = programName.slice(0, maxProgramLength)
      return `${truncatedProgram} at ${universityName} requires ${ibPoints} IB points. See match for ${academicCycle}.`
    }

    // Fallback for programs without IB points: use original description (cleaned)
    const cleanDesc = program.description.replace(/\s+/g, ' ').trim()
    if (cleanDesc.length <= 160) {
      return cleanDesc
    }

    // Truncate and add ellipsis
    return cleanDesc.slice(0, 157) + '...'
  }

  const description = generateSEODescription()

  // SEO-optimized keywords array with IB-specific combinations (Task 1.3)
  // Helps search engines understand content relevance for niche queries
  const generateSEOKeywords = (): string[] => {
    const keywords: string[] = []
    const programName = program.name
    const universityName = program.university.name
    const universityAbbrev = program.university.abbreviatedName || universityName
    const ibPoints = program.minIBPoints
    const fieldName = program.fieldOfStudy?.name
    const countryName = program.university.country?.name

    // Core program + IB keywords
    keywords.push(`${programName} IB requirements`)
    keywords.push(`${universityName} IB admission`)
    keywords.push(`${universityAbbrev} ${programName}`)

    // IB points + field combinations
    if (ibPoints && fieldName) {
      keywords.push(`IB ${ibPoints} points ${fieldName}`)
      keywords.push(`${fieldName} IB ${ibPoints}`)
    }

    // IB points + university
    if (ibPoints) {
      keywords.push(`${universityAbbrev} IB ${ibPoints} points`)
      keywords.push(`IB ${ibPoints} ${programName}`)
    }

    // Country + IB combinations
    if (countryName) {
      keywords.push(`${countryName} university IB diploma`)
      keywords.push(`IB programs ${countryName}`)
      keywords.push(`${countryName} ${fieldName || programName} IB`)
    }

    // Course-specific keywords (limit to 5 most important)
    if (program.courseRequirements && program.courseRequirements.length > 0) {
      const processedGroups = new Set<string>()
      let courseKeywordCount = 0

      for (const req of program.courseRequirements) {
        // Skip OR-group duplicates
        if (req.orGroupId && processedGroups.has(req.orGroupId)) continue
        if (req.orGroupId) processedGroups.add(req.orGroupId)

        // Add course requirement keyword
        keywords.push(`IB ${req.ibCourse.code} ${req.requiredLevel}`)

        courseKeywordCount++
        if (courseKeywordCount >= 5) break
      }
    }

    // Generic IB admission terms
    keywords.push('IB diploma requirements')
    keywords.push('International Baccalaureate admission')

    return keywords
  }

  const keywords = generateSEOKeywords()

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
    },
    keywords
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
      id: program.university.id,
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

  // JSON-LD structured data for SEO and AI search (Task 2.1: Enhanced with Course schema)
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
    },
    // Course schema for IB requirements (Task 2.1)
    hasCourse:
      program.courseRequirements && program.courseRequirements.length > 0
        ? (() => {
            const courses = []
            const processedGroups = new Set<string>()

            for (const req of program.courseRequirements) {
              // For OR-groups, only include the first option
              if (req.orGroupId) {
                if (processedGroups.has(req.orGroupId)) continue
                processedGroups.add(req.orGroupId)
              }

              courses.push({
                '@type': 'Course',
                name: req.ibCourse.name,
                courseCode: req.ibCourse.code,
                educationalLevel: req.requiredLevel, // "HL" or "SL"
                competencyRequired: `Minimum grade ${req.minGrade}`,
                inLanguage: 'en',
                provider: {
                  '@type': 'Organization',
                  name: 'International Baccalaureate Organization',
                  url: 'https://www.ibo.org'
                }
              })
            }

            return courses
          })()
        : undefined,
    // EducationalOccupationalCredential for IB Diploma admission requirements (Task 2.2)
    educationalCredentialAwarded: program.minIBPoints
      ? {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'International Baccalaureate Diploma',
          competencyRequired: `${program.minIBPoints} IB Points`,
          educationalLevel: 'High School',
          recognizedBy: {
            '@type': 'CollegeOrUniversity',
            name: program.university.name,
            url: program.university.websiteUrl
          }
        }
      : undefined
  }

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProgramDetailClient
        program={programForCard}
        matchResult={matchResult ?? undefined}
        studentProfile={studentProfileForCard}
        isLoggedIn={!!session?.user?.id}
      />
    </PageContainer>
  )
}
