/**
 * Admin Sidebar Component
 *
 * Navigation sidebar for admin dashboard.
 * Features:
 * - Logo at top (links to admin dashboard)
 * - Navigation links with lucide-react icons
 * - User avatar and email at bottom
 * - Logout button
 *
 * Privacy: Email is NOT exposed in DOM - only display name or initial shown.
 * Avatar color and initial are computed server-side.
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  GraduationCap,
  Users,
  UserCog,
  Handshake,
  Database,
  BarChart3,
  LogOut,
  type LucideIcon
} from 'lucide-react'

interface AdminSidebarProps {
  user: {
    image?: string | null
    name?: string | null
    // Pre-computed values (computed server-side from email)
    avatarColor: string
    initial: string
  }
}

// Navigation links configuration for admin sidebar
const navLinks: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/universities', label: 'Universities', icon: Building2 },
  { href: '/admin/programs', label: 'Programs', icon: BookOpen },
  { href: '/admin/schools', label: 'IB Schools', icon: GraduationCap },
  { href: '/admin/coordinators', label: 'Coordinators', icon: UserCog },
  { href: '/admin/students', label: 'Students', icon: Users },
  { href: '/admin/agents', label: 'University Agents', icon: Handshake },
  { href: '/admin/reference-data', label: 'Reference Data', icon: Database }
]

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r bg-background">
      {/* Logo Section */}
      <div className="flex h-16 items-center gap-3 border-b px-4">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <Image
            src="/logo-restored.svg"
            alt="IB Match"
            width={36}
            height={36}
            className="rounded-lg"
            priority
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">IB Match</span>
            <span className="text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            const Icon = link.icon

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Section at Bottom */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3 mb-3">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || 'Admin avatar'}
              width={36}
              height={36}
              className="rounded-full object-cover"
              style={{ width: 36, height: 36 }}
            />
          ) : (
            <div
              className="flex items-center justify-center rounded-full text-white font-semibold text-sm"
              style={{ backgroundColor: user.avatarColor, width: 36, height: 36 }}
            >
              {user.initial}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user.name || 'Admin User'}
            </p>
            <p className="text-xs text-muted-foreground">Platform Admin</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </aside>
  )
}
