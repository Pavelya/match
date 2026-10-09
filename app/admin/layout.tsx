import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { getAvatarColor, getAvatarInitial } from '@/lib/avatar-utils'
import { BrandMark } from '@/components/brand/BrandMark'
import { LegacyLogo } from '@/components/brand/LegacyLogo'
import { showsNewUi } from '@/lib/new-ui'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  // Redirect to sign-in if not authenticated
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  // Verify user has PLATFORM_ADMIN role
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true, email: true, name: true, image: true }
  })

  // Redirect to home if user doesn't have admin role
  if (user?.role !== 'PLATFORM_ADMIN') {
    redirect('/')
  }

  // Compute avatar values server-side to avoid exposing email to client
  const avatarColor = getAvatarColor(user.email)
  const initial = getAvatarInitial(user.email, user.name)

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar
        user={{
          image: user.image,
          name: user.name,
          avatarColor,
          initial
        }}
        // The mark follows the design (rebranding 1.3)
        mark={(await showsNewUi()) ? <BrandMark size={36} /> : <LegacyLogo size={36} priority />}
      />
      {/* Main content with left margin to account for sidebar */}
      <main className="ml-64 min-h-screen">{children}</main>
    </div>
  )
}
