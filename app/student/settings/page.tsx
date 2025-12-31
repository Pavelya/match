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
import { unstable_cache } from 'next/cache'
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

/**
 * Cached user settings fetch
 * TTL: 5 minutes (300 seconds)
 * Tag: user-settings-{userId} for targeted invalidation
 */
const getCachedUserSettings = (userId: string) =>
  unstable_cache(
    async () => {
      return prisma.user.findUnique({
        where: { id: userId },
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
    },
    [`user-settings-${userId}`],
    {
      revalidate: 300, // 5 minutes
      tags: [`user-settings-${userId}`]
    }
  )()

export default async function AccountSettingsPage() {
  // Check authentication
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  // Fetch user data with caching (5-minute TTL)
  const user = await getCachedUserSettings(session.user.id)

  if (!user) {
    redirect('/auth/signin')
  }

  // Prepare school info if linked
  const consentAt = user.studentProfile?.coordinatorAccessConsentAt
  const schoolInfo = user.studentProfile?.school
    ? {
        id: user.studentProfile.school.id,
        name: user.studentProfile.school.name,
        logo: user.studentProfile.school.logo,
        city: user.studentProfile.school.city,
        countryName: user.studentProfile.school.country.name,
        countryFlag: user.studentProfile.school.country.flagEmoji,
        // Handle cached data where Date is serialized to string
        linkedAt: consentAt
          ? typeof consentAt === 'string'
            ? consentAt
            : consentAt.toISOString()
          : null,
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
          // Handle cached data where Date is serialized to string
          createdAt:
            typeof user.createdAt === 'string' ? user.createdAt : user.createdAt.toISOString()
        }}
        school={schoolInfo}
      />
    </PageContainer>
  )
}
