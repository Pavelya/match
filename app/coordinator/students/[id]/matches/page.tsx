/**
 * Coordinator Student Matches Page
 *
 * Displays top 10 program matches for a student (coordinator view)
 *
 * Access Control:
 * - VIP or subscribed REGULAR coordinators only
 * - Student must have provided coordinator access consent
 *
 * Part of Task 4.6.5: View student matches
 */

import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { getCoordinatorAccess } from '@/lib/auth/access-control'
import { PageContainer, Breadcrumbs } from '@/components/admin/shared'
import { StudentMatchesClient } from './StudentMatchesClient'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function StudentMatchesPage({ params }: PageProps) {
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

  // Check if coordinator has full access
  if (!access.hasFullAccess) {
    redirect('/coordinator/students?error=upgrade-required')
  }

  // Fetch student basic info
  const student = await prisma.studentProfile.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
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

  const studentName = student.user.name || student.user.email

  return (
    <PageContainer>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/coordinator/dashboard' },
          { label: 'Students', href: '/coordinator/students' },
          { label: studentName, href: `/coordinator/students/${id}` },
          { label: 'Matches' }
        ]}
        showHome={false}
        className="mb-6"
      />

      <StudentMatchesClient
        studentId={id}
        studentName={studentName}
        studentProfileId={student.id}
      />
    </PageContainer>
  )
}
