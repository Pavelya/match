/**
 * Coordinator Sidebar Component
 *
 * Navigation sidebar for coordinator dashboard.
 * Features:
 * - Logo at top (links to coordinator dashboard)
 * - School name with VIP badge (if applicable)
 * - Navigation links with lucide-react icons
 * - Subscription-required links show lock icon for freemium schools
 * - User avatar and name at bottom
 * - Logout button
 *
 * Access Logic:
 * - VIP schools: Full access (free forever)
 * - REGULAR + subscribed: Full access
 * - REGULAR + not subscribed: Freemium (limited features)
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
  Users,
  UserCog,
  BarChart3,
  Settings,
  LogOut,
  Crown,
  Lock,
  type LucideIcon
} from 'lucide-react'

interface NavLink {
  href: string
  label: string
  icon: LucideIcon
  /** If true, requires subscription (not just VIP) for access */
  requiresSubscription?: boolean
}

// Navigation links configuration for coordinator sidebar
const navLinks: NavLink[] = [
  { href: '/coordinator/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/coordinator/students', label: 'Students', icon: Users },
  { href: '/coordinator/team', label: 'Team', icon: UserCog },
  {
    href: '/coordinator/analytics',
    label: 'Analytics',
    icon: BarChart3,
    requiresSubscription: true
  },
  { href: '/coordinator/settings', label: 'Settings', icon: Settings }
]

export interface CoordinatorSidebarProps {
  school: {
    name: string
    subscriptionTier: 'VIP' | 'REGULAR'
    hasFullAccess: boolean // VIP OR (REGULAR + subscribed)
  }
  user: {
    image?: string | null
    name?: string | null
    // Pre-computed values (computed server-side from email)
    avatarColor: string
    initial: string
  }
}

export function CoordinatorSidebar({ school, user }: CoordinatorSidebarProps) {
  const pathname = usePathname()
  const isVIP = school.subscriptionTier === 'VIP'
  const hasFullAccess = school.hasFullAccess

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r bg-background">
      {/* Logo Section */}
      <div className="flex h-16 items-center gap-3 border-b px-4">
        <Link href="/coordinator/dashboard" className="flex items-center gap-3">
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
            <span className="text-xs text-muted-foreground">Coordinator</span>
          </div>
        </Link>
      </div>

      {/* School Info Section */}
      <div className="border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground truncate flex-1">{school.name}</span>
          {isVIP && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
              <Crown className="h-3 w-3" />
              VIP
            </span>
          )}
          {!isVIP && hasFullAccess && (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              Subscribed
            </span>
          )}
        </div>
        {/* Show subscribe link only for REGULAR schools without subscription */}
        {!isVIP && !hasFullAccess && (
          <Link
            href="/coordinator/settings/subscription"
            className="text-xs text-primary hover:underline mt-1 inline-block"
          >
            Subscribe for full access
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            const Icon = link.icon
            const isLocked = link.requiresSubscription && !hasFullAccess

            return (
              <li key={link.href}>
                <Link
                  href={isLocked ? '/coordinator/settings/subscription' : link.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    isLocked && 'opacity-60'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="flex-1">{link.label}</span>
                  {isLocked && <Lock className="h-3 w-3 text-muted-foreground" />}
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
              alt={user.name || 'Coordinator avatar'}
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
              {user.name || 'Coordinator'}
            </p>
            <p className="text-xs text-muted-foreground">Coordinator</p>
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
