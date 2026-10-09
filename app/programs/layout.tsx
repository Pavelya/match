import { auth } from '@/lib/auth/config'
import { StudentHeader } from '@/components/layout/StudentHeader'
import { getAvatarColor, getAvatarInitial } from '@/lib/avatar-utils'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { SignedInChrome, SignedOutChrome } from '@/components/site/chrome'
import { showsNewUi } from '@/lib/new-ui'

export default async function ProgramsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const isLoggedIn = !!session

  // The new design (rebranding 1.5): the signed-in chrome when the session says so, else the
  // public one every prebuilt page has
  if (await showsNewUi()) {
    if (!session) return <SignedOutChrome>{children}</SignedOutChrome>
    return (
      <SignedInChrome
        user={{
          name: session.user?.name ?? null,
          email: session.user?.email ?? null,
          initial: getAvatarInitial(session.user?.email, session.user?.name)
        }}
      >
        {children}
      </SignedInChrome>
    )
  }

  // Compute avatar values server-side to avoid exposing email to client
  const avatarColor = session ? getAvatarColor(session.user?.email) : ''
  const initial = session ? getAvatarInitial(session.user?.email, session.user?.name) : ''

  // Programs pages can be viewed without auth, header always shows
  return (
    <div className="min-h-screen bg-background">
      <StudentHeader
        isLoggedIn={isLoggedIn}
        user={
          session
            ? {
                image: session.user?.image,
                name: session.user?.name,
                avatarColor,
                initial
              }
            : null
        }
      />
      <main className="pb-20 md:pb-0">{children}</main>
      <MobileBottomNav isLoggedIn={isLoggedIn} />
    </div>
  )
}
