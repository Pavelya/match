/**
 * Coordinator Students Page
 *
 * Main student management page for coordinators.
 * Features:
 * - Student list with DataTable
 * - Search and filter functionality
 * - VIP/Freemium feature gating (10 student limit for freemium)
 * - Upgrade prompts for freemium users
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import {
  PageContainer,
  PageHeader,
  TableEmptyState,
  UpgradePromptBanner
} from '@/components/admin/shared'
import { Users, UserPlus } from 'lucide-react'
import { getCoordinatorAccess, getRemainingStudentInvites } from '@/lib/auth/access-control'
import { StudentsClient } from './StudentsClient'

export default async function CoordinatorStudentsPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/auth/coordinator/signin')
  }

  // Get coordinator's school with student data
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

  // Fetch students linked to this school
  const students = await prisma.studentProfile.findMany({
    where: { schoolId: school.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true
        }
      },
      courses: {
        select: { id: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  // Calculate stats
  const studentCount = students.length
  const remainingInvites = getRemainingStudentInvites(studentCount, access)
  const canInvite = access.canInviteStudents(studentCount)

  // Transform students for client component
  const studentData = students.map((student) => ({
    id: student.id,
    userId: student.user.id,
    name: student.user.name || 'Unnamed Student',
    email: student.user.email,
    image: student.user.image,
    totalIBPoints: student.totalIBPoints,
    coursesCount: student.courses.length,
    createdAt: student.createdAt.toISOString(),
    joinedDate: student.user.createdAt.toISOString(),
    hasConsent: student.coordinatorAccessConsentAt !== null,
    consentDate: student.coordinatorAccessConsentAt?.toISOString() || null
  }))

  // Empty state
  if (students.length === 0) {
    return (
      <PageContainer>
        <PageHeader
          title="Students"
          icon={Users}
          description="Manage students linked to your school"
          actions={[
            {
              label: 'Invite Student',
              href: '/coordinator/students/invite',
              icon: UserPlus,
              variant: 'primary'
            }
          ]}
        />

        {/* Show freemium banner if applicable */}
        {!access.hasFullAccess && (
          <UpgradePromptBanner
            feature="Unlimited Students"
            description="Free plan is limited to 10 students. Upgrade to VIP for unlimited student management."
            variant="subtle"
            className="mb-6"
          />
        )}

        <TableEmptyState
          icon={Users}
          title="No students yet"
          description="Invite students to link their IB Match accounts to your school. Once they accept, you'll be able to view and manage their academic profiles."
          action={{
            label: 'Invite Student',
            href: '/coordinator/students/invite'
          }}
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader
        title="Students"
        icon={Users}
        description={`${studentCount} student${studentCount !== 1 ? 's' : ''} linked to your school`}
        actions={
          canInvite
            ? [
                {
                  label: 'Invite Student',
                  href: '/coordinator/students/invite',
                  icon: UserPlus,
                  variant: 'primary'
                }
              ]
            : []
        }
      />

      {/* Freemium remaining invites banner */}
      {!access.hasFullAccess && remainingInvites !== null && (
        <UpgradePromptBanner
          feature={
            remainingInvites > 0
              ? `${remainingInvites} student invite${remainingInvites === 1 ? '' : 's'} remaining`
              : 'Student limit reached'
          }
          description={
            remainingInvites > 0
              ? 'Upgrade to VIP for unlimited students, advanced analytics, and more.'
              : 'You&apos;ve reached the free plan limit of 10 students. Upgrade to VIP to invite more.'
          }
          variant={remainingInvites > 3 ? 'subtle' : 'inline'}
          className="mb-6"
        />
      )}

      {/* Students table with client-side search, filtering, and sorting */}
      <StudentsClient
        students={studentData}
        hasFullAccess={access.hasFullAccess}
        canEditStudents={access.canEditStudentData}
        canBulkExport={access.canBulkExport}
      />
    </PageContainer>
  )
}
