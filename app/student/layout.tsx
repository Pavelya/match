import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { StudentHeader } from '@/components/layout/StudentHeader'
import { getAvatarColor, getAvatarInitial } from '@/lib/avatar-utils'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { StudentFooter } from '@/components/layout/StudentFooter'
import { ReconsentChecker } from '@/components/shared/ReconsentChecker'
import { SignedInChrome } from '@/components/site/chrome'
import { showsNewUi } from '@/lib/new-ui'

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  // The new design (rebranding 1.5): its header, footer and tab bar. The account panel shows the
  // student their own name and email. First run's focus mode comes with 3.1, whose step drafts its
  // "Save and exit" needs, so until then first run shows the normal chrome.
  if (await showsNewUi()) {
    return (
      <>
        <SignedInChrome
          user={{
            name: session.user?.name ?? null,
            email: session.user?.email ?? null,
            initial: getAvatarInitial(session.user?.email, session.user?.name)
          }}
        >
          {children}
        </SignedInChrome>
        <ReconsentChecker />
      </>
    )
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
