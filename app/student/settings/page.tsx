/**
 * Student Account Settings Page
 *
 * Allows students to manage their account:
 * - View and update profile information (name)
 * - View email (read-only)
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

  // Fetch user data from database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      createdAt: true
    }
  })

  if (!user) {
    redirect('/auth/signin')
  }

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
      />
    </PageContainer>
  )
}
