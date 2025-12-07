import { auth } from '@/lib/auth/config'
import { StudentHeader } from '@/components/layout/StudentHeader'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'

export default async function ProgramsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  // Programs pages can be viewed without auth, but header will show if logged in
  return (
    <div className="min-h-screen bg-background">
      {session && (
        <StudentHeader
          user={{
            email: session.user?.email,
            image: session.user?.image,
            name: session.user?.name
          }}
        />
      )}
      <main className={session ? 'pb-20 md:pb-0' : ''}>{children}</main>
      {session && <MobileBottomNav />}
    </div>
  )
}
