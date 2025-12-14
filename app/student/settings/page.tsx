/**
 * Student Account Settings Page
 *
 * Allows students to manage their account:
 * - View and update profile information (name)
 * - View email (read-only)
 * - View/manage school connection
 * - Sign out
 * - Export personal data (GDPR compliance)
 * - Delete account (GDPR compliance)
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { AccountSettingsClient } from './AccountSettingsClient'
import { PageContainer, PageHeader } from '@/components/layout/PageContainer'

export const metadata = {
  title: 'Account Settings',
  description: 'Manage your IB Match account settings and preferences.',
  robots: {
    index: false,
    follow: false
  }
}

export default async function AccountSettingsPage() {
  // Check authentication
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  // Fetch user data from database with student profile and school
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      createdAt: true,
      studentProfile: {
        select: {
          id: true,
          schoolId: true,
          linkedByInvitation: true,
          coordinatorAccessConsentAt: true,
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
          }
        }
      }
    }
  })

  if (!user) {
    redirect('/auth/signin')
  }

  // Prepare school info if linked
  const schoolInfo = user.studentProfile?.school
    ? {
        id: user.studentProfile.school.id,
        name: user.studentProfile.school.name,
        logo: user.studentProfile.school.logo,
        city: user.studentProfile.school.city,
        countryName: user.studentProfile.school.country.name,
        countryFlag: user.studentProfile.school.country.flagEmoji,
        linkedAt: user.studentProfile.coordinatorAccessConsentAt?.toISOString() || null,
        linkedByInvitation: user.studentProfile.linkedByInvitation
      }
    : null

  return (
    <PageContainer narrow>
      <PageHeader
        title="Account Settings"
        description="Manage your profile information and account preferences."
      />
      <AccountSettingsClient
        user={{
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          createdAt: user.createdAt.toISOString()
        }}
        school={schoolInfo}
      />
    </PageContainer>
  )
}
