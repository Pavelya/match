import { auth } from '@/lib/auth/config'
import { StudentHeader } from '@/components/layout/StudentHeader'
import { getAvatarColor, getAvatarInitial } from '@/lib/avatar-utils'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'

export default async function ProgramsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const isLoggedIn = !!session

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
