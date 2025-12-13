/**
 * Coordinator Dashboard Layout
 *
 * Server component that:
 * - Authenticates the user
 * - Verifies COORDINATOR role
 * - Loads the coordinator's school
 * - Checks school access (isActive flag)
 * - Provides sidebar with school context
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { CoordinatorSidebar } from '@/components/coordinator/CoordinatorSidebar'
import { getAvatarColor, getAvatarInitial } from '@/lib/avatar-utils'
import { getCoordinatorAccess } from '@/lib/auth/access-control'

export default async function CoordinatorLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  // Redirect to sign-in if not authenticated
  if (!session?.user?.id) {
    redirect('/auth/coordinator/signin')
  }

  // Verify user is a coordinator and get their school
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      role: true,
      email: true,
      name: true,
      image: true,
      coordinatorProfile: {
        select: {
          isActive: true,
          school: {
            select: {
              id: true,
              name: true,
              subscriptionTier: true,
              subscriptionStatus: true
            }
          }
        }
      }
    }
  })

  // Redirect if user is not a coordinator
  if (user?.role !== 'COORDINATOR') {
    redirect('/')
  }

  // Redirect if coordinator profile or school doesn't exist
  if (!user.coordinatorProfile?.school) {
    // Coordinator exists but no school linked - this shouldn't happen in normal flow
    redirect('/')
  }

  // Check if coordinator access is revoked
  if (!user.coordinatorProfile.isActive) {
    // Show access revoked message
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-8">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Revoked</h1>
          <p className="text-muted-foreground mb-6">
            Your coordinator access has been revoked by the platform administrator. Please contact
            your school or the IB Match support team for assistance.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const school = user.coordinatorProfile.school

  // Calculate full access based on tier and subscription status
  const access = getCoordinatorAccess(school)

  // Compute avatar values server-side to avoid exposing email to client
  const avatarColor = getAvatarColor(user.email)
  const initial = getAvatarInitial(user.email, user.name)

  return (
    <div className="min-h-screen bg-muted/30">
      <CoordinatorSidebar
        school={{
          name: school.name,
          subscriptionTier: school.subscriptionTier,
          hasFullAccess: access.hasFullAccess
        }}
        user={{
          image: user.image,
          name: user.name,
          avatarColor,
          initial
        }}
      />
      {/* Main content with left margin to account for sidebar */}
      <main className="ml-64 min-h-screen">{children}</main>
    </div>
  )
}
