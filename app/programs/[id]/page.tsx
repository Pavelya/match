/**
 * Program Detail Page
 *
 * Displays detailed information about a specific university program.
 * Layout based on design reference:
 * - Hero section with image, program info, quick bar, save/visit buttons
 * - Match Score section (for logged-in students)
 * - Program Overview
 * - Academic Requirements with student-specific status
 * - Your Preferences section
 */

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import { PageContainer } from '@/components/layout/PageContainer'
import { ProgramDetailsView } from '@/components/programs/ProgramDetailsView'
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

  return (
    <PageContainer>
      <ProgramDetailsView
        program={program}
        matchResult={matchResult}
        studentProfile={studentProfile}
      />
    </PageContainer>
  )
}
