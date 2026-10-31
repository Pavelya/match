import { requireAdmin } from '@/lib/auth/guards'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { getAvatarColor, getAvatarInitial } from '@/lib/avatar-utils'
import { BrandMark } from '@/components/brand/BrandMark'
import { LegacyLogo } from '@/components/brand/LegacyLogo'
import { showsNewUi } from '@/lib/new-ui'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Signed in as an admin, or redirected. Each page checks again (SEC-1): this one only covers the
  // sidebar
  const user = await requireAdmin()

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
