/**
 * Coordinator Program Detail Page
 *
 * Displays detailed program information in the context of a specific student's match.
 * Uses coordinator layout with proper navigation and breadcrumbs.
 *
 * Access Control:
 * - Coordinator must be from the same school as the student
 * - Student must have provided coordinator access consent
 * - VIP or subscribed REGULAR coordinators only
 */

import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import { getCoordinatorAccess } from '@/lib/auth/access-control'
import { calculateMatch } from '@/lib/matching'
import { transformStudent, transformProgram } from '@/lib/matching/transformers'
import { PageContainer, Breadcrumbs } from '@/components/admin/shared'
import { ProgramCard } from '@/components/student/ProgramCard'
import type { MatchResult } from '@/lib/matching/types'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string; programId: string }>
}

export default async function CoordinatorProgramDetailPage({ params }: PageProps) {
  const { id: studentId, programId } = await params

  const session = await auth()
  if (!session?.user?.id) {
    redirect('/auth/coordinator/signin')
  }

  // Get coordinator's school
  const coordinator = await prisma.coordinatorProfile.findFirst({
    where: { userId: session.user.id },
    include: {
      school: {
        select: {
          id: true,
          name: true,
          subscriptionTier: true,
          subscriptionStatus: true
        }
      }
    }
  })

  if (!coordinator?.school) {
    redirect('/')
  }

  const school = coordinator.school
  const access = getCoordinatorAccess(school)

  // Check if coordinator has full access
  if (!access.hasFullAccess) {
    redirect('/coordinator/students?error=upgrade-required')
  }

  // Fetch student with profile
  const student = await prisma.studentProfile.findUnique({
    where: { id: studentId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      courses: {
        include: { ibCourse: true }
      },
      preferredFields: true,
      preferredCountries: true
    }
  })

  // Check if student exists and belongs to this school
  if (!student || student.schoolId !== school.id) {
    notFound()
  }

  // Check consent
  if (!student.coordinatorAccessConsentAt) {
    redirect(`/coordinator/students/${studentId}?error=consent-required`)
  }

  // Fetch program with all related data
  const program = await prisma.academicProgram.findUnique({
    where: { id: programId },
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

  // Calculate match for this student
  const transformedStudent = transformStudent(student)
  const transformedProgram = transformProgram(program)
  const matchResult: MatchResult = calculateMatch({
    student: transformedStudent,
    program: transformedProgram,
    mode: 'BALANCED'
  })

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
  const studentProfileForCard = {
    courses: student.courses.map((c) => ({
      ibCourse: { id: c.ibCourse.id, name: c.ibCourse.name },
      level: c.level,
      grade: c.grade
    })),
    preferredFields: student.preferredFields.map((f) => ({
      id: f.id,
      name: f.name
    })),
    preferredCountries: student.preferredCountries.map((c) => ({
      id: c.id,
      name: c.name
    })),
    totalIBPoints: student.totalIBPoints
  }

  const studentName = student.user.name || student.user.email

  return (
    <PageContainer>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/coordinator/dashboard' },
          { label: 'Students', href: '/coordinator/students' },
          { label: studentName, href: `/coordinator/students/${studentId}` },
          { label: 'Matches', href: `/coordinator/students/${studentId}/matches` },
          { label: program.name }
        ]}
        showHome={false}
        className="mb-6"
      />

      {/* Back to matches link */}
      <Link
        href={`/coordinator/students/${studentId}/matches`}
        className="text-primary hover:underline text-sm inline-flex items-center gap-1 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {studentName}&apos;s matches
      </Link>

      {/* Program Detail Card */}
      <ProgramCard
        program={programForCard}
        matchResult={matchResult}
        variant="detail"
        studentProfile={studentProfileForCard}
        isCoordinatorView={true}
        // No save functionality for coordinator view
      />
    </PageContainer>
  )
}
