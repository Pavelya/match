import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { StudentHeader } from '@/components/layout/StudentHeader'
import { getAvatarColor, getAvatarInitial } from '@/lib/avatar-utils'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { StudentFooter } from '@/components/layout/StudentFooter'

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  // Compute avatar values server-side to avoid exposing email to client
  const avatarColor = getAvatarColor(session.user?.email)
  const initial = getAvatarInitial(session.user?.email, session.user?.name)

  return (
    <div className="min-h-screen bg-background">
      <StudentHeader
        user={{
          image: session.user?.image,
          name: session.user?.name,
          avatarColor,
          initial
        }}
      />
      <main className="pb-20 md:pb-8">{children}</main>
      <StudentFooter />
      <MobileBottomNav />
    </div>
  )
}
