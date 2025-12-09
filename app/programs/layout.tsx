import { auth } from '@/lib/auth/config'
import { StudentHeader } from '@/components/layout/StudentHeader'
import { getAvatarColor, getAvatarInitial } from '@/lib/avatar-utils'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'

export default async function ProgramsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  // Compute avatar values server-side to avoid exposing email to client
  const avatarColor = session ? getAvatarColor(session.user?.email) : ''
  const initial = session ? getAvatarInitial(session.user?.email, session.user?.name) : ''

  // Programs pages can be viewed without auth, but header will show if logged in
  return (
    <div className="min-h-screen bg-background">
      {session && (
        <StudentHeader
          user={{
            image: session.user?.image,
            name: session.user?.name,
            avatarColor,
            initial
          }}
        />
      )}
      <main className={session ? 'pb-20 md:pb-0' : ''}>{children}</main>
      {session && <MobileBottomNav />}
    </div>
  )
}
