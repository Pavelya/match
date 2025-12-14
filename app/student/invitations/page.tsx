/**
 * Student Pending Invitations Page
 *
 * Shows pending school connection invitations for existing students.
 * Allows students to accept or decline link requests from coordinators.
 *
 * Part of Task 4.5: Student Account Linking & Unlinking
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PageContainer, PageHeader } from '@/components/layout/PageContainer'
import { PendingInvitationsClient } from './PendingInvitationsClient'

export const metadata = {
  title: 'School Invitations',
  description: 'View pending school connection invitations.',
  robots: {
    index: false,
    follow: false
  }
}

export default async function PendingInvitationsPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  // Get user email
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      email: true,
      studentProfile: {
        select: {
          schoolId: true
        }
      }
    }
  })

  if (!user) {
    redirect('/auth/signin')
  }

  // If student is already linked to a school, redirect to settings
  if (user.studentProfile?.schoolId) {
    redirect('/student/settings')
  }

  // Get pending invitations for this email
  const pendingInvitations = await prisma.invitation.findMany({
    where: {
      email: user.email,
      role: 'STUDENT',
      status: 'PENDING',
      expiresAt: { gt: new Date() }
    },
    include: {
      school: {
        select: {
          id: true,
          name: true,
          logo: true,
          city: true,
          country: {
            select: {
              name: true,
              flagEmoji: true
            }
          }
        }
      },
      invitedBy: {
        select: {
          name: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  const invitations = pendingInvitations.map((inv) => ({
    id: inv.id,
    token: inv.token,
    school: inv.school
      ? {
          id: inv.school.id,
          name: inv.school.name,
          logo: inv.school.logo,
          city: inv.school.city,
          countryName: inv.school.country.name,
          countryFlag: inv.school.country.flagEmoji
        }
      : null,
    coordinatorName: inv.invitedBy.name,
    expiresAt: inv.expiresAt.toISOString(),
    createdAt: inv.createdAt.toISOString()
  }))

  return (
    <PageContainer narrow>
      <PageHeader
        title="School Invitations"
        description="You have pending invitations to connect with schools."
      />
      <PendingInvitationsClient invitations={invitations} />
    </PageContainer>
  )
}
