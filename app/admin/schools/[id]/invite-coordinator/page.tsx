/**
 * Admin Coordinator Invitation Page
 *
 * Allows platform admins to invite coordinators to a specific school.
 * Part of Task 3.3: Coordinator Invitation System
 */

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { CoordinatorInviteForm } from '@/components/admin/schools/CoordinatorInviteForm'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function InviteCoordinatorPage({ params }: PageProps) {
  const { id } = await params

  // Fetch school data for context display
  const school = await prisma.iBSchool.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      subscriptionTier: true,
      city: true,
      country: {
        select: {
          name: true,
          flagEmoji: true
        }
      }
    }
  })

  if (!school) {
    notFound()
  }

  return (
    <div className="p-8 max-w-2xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Invite Coordinator</h1>
        <p className="mt-2 text-muted-foreground">
          Send an invitation to a new coordinator to join this school.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border bg-card p-6">
        <CoordinatorInviteForm
          school={{
            id: school.id,
            name: school.name,
            subscriptionTier: school.subscriptionTier,
            city: school.city,
            countryName: school.country.name,
            countryFlag: school.country.flagEmoji
          }}
        />
      </div>
    </div>
  )
}
