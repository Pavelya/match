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

  const program = await prisma.academicProgram.findUnique({
    where: { id },
    include: {
      university: true
    }
  })

  if (!program) {
    return {
      title: 'Program Not Found | IB Match'
    }
  }

  return {
    title: `${program.name} at ${program.university.name} | IB Match`,
    description: program.description.slice(0, 160)
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

  return (
    <PageContainer>
      <ProgramCard
        program={programForCard}
        matchResult={matchResult ?? undefined}
        variant="detail"
        studentProfile={studentProfileForCard}
      />
    </PageContainer>
  )
}
