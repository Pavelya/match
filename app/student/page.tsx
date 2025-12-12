/**
 * Student Dashboard Router
 *
 * Smart redirect based on student profile status:
 * - New students (no profile or incomplete onboarding) → /student/onboarding
 * - Existing students with completed profile → /student/matches
 *
 * This page is the target callback URL after sign-in.
 */

import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function StudentPage() {
  // Check authentication
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  // Check if student has completed onboarding
  const studentProfile = await prisma.studentProfile.findUnique({
    where: { userId: session.user.id },
    select: {
      totalIBPoints: true,
      preferredFields: {
        select: { id: true }
      }
    }
  })

  // Student needs onboarding if:
  // 1. No profile exists, OR
  // 2. Profile exists but has no preferred fields (step 1 not completed), OR
  // 3. Profile exists but has no IB points (step 3 not completed)
  const needsOnboarding =
    !studentProfile ||
    studentProfile.preferredFields.length === 0 ||
    studentProfile.totalIBPoints === null

  if (needsOnboarding) {
    redirect('/student/onboarding')
  }

  // Existing student with complete profile
  redirect('/student/matches')
}
