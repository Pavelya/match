import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { StudentHeader } from '@/components/layout/StudentHeader'
import { getAvatarColor, getAvatarInitial } from '@/lib/avatar-utils'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { ReconsentChecker } from '@/components/shared/ReconsentChecker'

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  // Compute avatar values server-side to avoid exposing email to client
  const avatarColor = getAvatarColor(session.user?.email)
  const initial = getAvatarInitial(session.user?.email, session.user?.name)

  // Check if student has completed onboarding (same logic as student/page.tsx)
  // Lightweight query: only selects the two fields needed to determine completeness
  const studentProfile = session.user?.id
    ? await prisma.studentProfile.findUnique({
        where: { userId: session.user.id },
        select: {
          totalIBPoints: true,
          preferredFields: { select: { id: true } }
        }
      })
    : null

  const isOnboardingComplete = Boolean(
    studentProfile &&
    studentProfile.preferredFields.length > 0 &&
    studentProfile.totalIBPoints !== null
  )

  return (
    <div className="min-h-screen bg-background">
      <StudentHeader
        isLoggedIn={true}
        user={{
          image: session.user?.image,
          name: session.user?.name,
          avatarColor,
          initial
        }}
        isOnboardingComplete={isOnboardingComplete}
      />
      <main className="pb-20 md:pb-8">{children}</main>
      <StudentFooter />
      <MobileBottomNav isLoggedIn={true} isOnboardingComplete={isOnboardingComplete} />
      <ReconsentChecker />
    </div>
  )
}
