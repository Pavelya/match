import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { StudentHeader } from '@/components/layout/StudentHeader'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-background">
      <StudentHeader
        user={{
          email: session.user?.email,
          image: session.user?.image,
          name: session.user?.name
        }}
      />
      <main className="pb-20 md:pb-0">{children}</main>
      <MobileBottomNav />
    </div>
  )
}
