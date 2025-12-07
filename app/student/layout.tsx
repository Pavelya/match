import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { StudentHeader } from '@/components/layout/StudentHeader'

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
      <main>{children}</main>
    </div>
  )
}
