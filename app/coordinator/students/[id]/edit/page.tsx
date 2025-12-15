/**
 * Coordinator Student Profile Editor Page
 *
 * Allows coordinators to edit student academic data:
 * - IB Courses (add/edit/remove with level and grade)
 * - TOK and EE Grades
 * - Total IB Points (auto-calculated or manual override)
 * - Preferred Fields of Study
 * - Preferred Countries
 *
 * Access Control:
 * - VIP or subscribed REGULAR coordinators only
 * - Student must have coordinatorAccessConsentAt set
 *
 * Part of Task 4.6.3: Build student profile editor
 */

import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { getCoordinatorAccess } from '@/lib/auth/access-control'
import { PageContainer, FormPageLayout, Breadcrumbs } from '@/components/admin/shared'
import { User } from 'lucide-react'
import { StudentProfileForm } from './StudentProfileForm'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditStudentPage({ params }: PageProps) {
  const { id } = await params

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

  // Check if coordinator can edit student data
  if (!access.canEditStudentData) {
    redirect('/coordinator/students?error=upgrade-required')
  }

  // Fetch student with full profile data
  const student = await prisma.studentProfile.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      courses: {
        include: {
          ibCourse: true
        },
        orderBy: { ibCourse: { group: 'asc' } }
      },
      preferredFields: {
        select: { id: true, name: true }
      },
      preferredCountries: {
        select: { id: true, name: true, flagEmoji: true }
      }
    }
  })

  // Check if student exists and belongs to this school
  if (!student || student.schoolId !== school.id) {
    notFound()
  }

  // Check consent
  if (!student.coordinatorAccessConsentAt) {
    redirect(`/coordinator/students/${id}?error=consent-required`)
  }

  // Fetch reference data for form
  const [ibCourses, fieldsOfStudy, countries] = await Promise.all([
    prisma.iBCourse.findMany({
      orderBy: [{ group: 'asc' }, { name: 'asc' }]
    }),
    prisma.fieldOfStudy.findMany({
      orderBy: { name: 'asc' }
    }),
    prisma.country.findMany({
      orderBy: { name: 'asc' }
    })
  ])

  // Transform data for form
  const studentData = {
    id: student.id,
    userId: student.user.id,
    name: student.user.name || 'Unnamed Student',
    email: student.user.email,
    totalIBPoints: student.totalIBPoints,
    tokGrade: student.tokGrade,
    eeGrade: student.eeGrade,
    courses: student.courses.map((c) => ({
      courseId: c.ibCourseId,
      level: c.level as 'HL' | 'SL',
      grade: c.grade
    })),
    preferredFields: student.preferredFields.map((f) => f.id),
    preferredCountries: student.preferredCountries.map((c) => c.id)
  }

  const coursesByGroup: Record<number, typeof ibCourses> = {}
  ibCourses.forEach((course) => {
    if (!coursesByGroup[course.group]) coursesByGroup[course.group] = []
    coursesByGroup[course.group].push(course)
  })

  return (
    <PageContainer>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/coordinator/dashboard' },
          { label: 'Students', href: '/coordinator/students' },
          { label: studentData.name, href: `/coordinator/students/${id}` },
          { label: 'Edit' }
        ]}
        showHome={false}
        className="mb-6"
      />

      <FormPageLayout
        title={`Edit ${studentData.name}`}
        description="Update student academic information and preferences"
        icon={User}
        backHref={`/coordinator/students/${id}`}
        backLabel="Back to Student"
      >
        <StudentProfileForm
          student={studentData}
          coursesByGroup={coursesByGroup}
          fieldsOfStudy={fieldsOfStudy}
          countries={countries}
        />
      </FormPageLayout>
    </PageContainer>
  )
}
