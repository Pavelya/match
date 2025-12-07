import { auth } from '@/lib/auth/config'
import { StudentHeader } from '@/components/layout/StudentHeader'

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
      <main>{children}</main>
    </div>
  )
}
