import 'server-only'
import { cache } from 'react'
import { notFound, redirect } from 'next/navigation'
import type { SubscriptionStatus, SubscriptionTier } from '@/app/generated/prisma/enums'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { COORDINATOR_SIGN_IN_PATH } from './callback-url'

/**
 * Access checks for the admin and coordinator pages (SEC-1).
 *
 * A layout's check does not cover the pages under it: Next renders a page alongside its layout,
 * not after it, and a navigation may not render the layout at all (Next's guide,
 * node_modules/next/dist/docs/01-app/02-guides/authentication.md, "Layouts and auth checks"). So
 * every page calls one of these first, before it reads anything, and `app/page-guards.test.ts`
 * fails for a page that doesn't.
 *
 * The role comes from the database, never the token: the token's can be minutes old. Each check
 * is wrapped in React's `cache()`, so the layout and the page in one request share a single read.
 */

/** The signed-in admin, as the admin layout shows them */
export interface AdminUser {
  id: string
  email: string
  name: string | null
  image: string | null
}

/** Signed in as `PLATFORM_ADMIN`, or redirected: to sign-in without a session, home otherwise. */
export const requireAdmin = cache(async (): Promise<AdminUser> => {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true, email: true, name: true, image: true }
  })
  if (user?.role !== 'PLATFORM_ADMIN') {
    redirect('/')
  }

  return { id: user.id, email: user.email, name: user.name, image: user.image }
})

/** The signed-in coordinator and their school, as the coordinator layout shows them */
export interface CoordinatorUser {
  id: string
  email: string
  name: string | null
  image: string | null
  /** False once an admin has revoked their access */
  isActive: boolean
  school: {
    id: string
    name: string
    subscriptionTier: SubscriptionTier
    subscriptionStatus: SubscriptionStatus
  }
}

/**
 * Signed in as a `COORDINATOR` with a school, or redirected: to the coordinator sign-in without a
 * session (MAINT 5.26), home otherwise. A revoked coordinator is returned with `isActive: false`,
 * for the layout's "Access revoked" screen. Pages call `requireCoordinator` instead.
 */
export const readCoordinator = cache(async (): Promise<CoordinatorUser> => {
  const session = await auth()
  if (!session?.user?.id) {
    redirect(COORDINATOR_SIGN_IN_PATH)
  }

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
            select: { id: true, name: true, subscriptionTier: true, subscriptionStatus: true }
          }
        }
      }
    }
  })
  if (user?.role !== 'COORDINATOR' || !user.coordinatorProfile?.school) {
    redirect('/')
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
    isActive: user.coordinatorProfile.isActive,
    school: user.coordinatorProfile.school
  }
})

/**
 * As `readCoordinator`, and a revoked coordinator gets a 404. The layout shows them "Access revoked"
 * in place of the page, so nothing changes on screen; the 404 only stops the page reading and
 * sending their school's data.
 */
export async function requireCoordinator(): Promise<CoordinatorUser> {
  const coordinator = await readCoordinator()
  if (!coordinator.isActive) {
    notFound()
  }
  return coordinator
}
