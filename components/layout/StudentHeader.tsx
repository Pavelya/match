/**
 * Student Header Component
 *
 * Navigation header for all student pages.
 * Features:
 * - Logo (links to main page)
 * - Navigation links (real <a> tags, openable in new tab)
 * - User avatar (Google image or fallback with colored initial) when logged in
 * - Sign In link when logged out
 * - Desktop: logo + nav + avatar/sign-in
 * - Mobile: logo + avatar/sign-in only
 *
 * Privacy: Email is NOT passed to this client component.
 * Avatar color and initial are computed server-side.
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LogIn } from 'lucide-react'

interface StudentHeaderProps {
  /** User data - null when logged out */
  user?: {
    image?: string | null
    name?: string | null
    // Pre-computed values (computed server-side from email)
    avatarColor: string
    initial: string
  } | null
  /** Whether the user is logged in */
  isLoggedIn?: boolean
  /** Whether the student has completed all 3 onboarding steps */
  isOnboardingComplete?: boolean
}

// Navigation links configuration
// For logged-out users, student/* routes redirect to signin
const navLinks = [
  { href: '/student/matches', label: 'My Matches', requiresAuth: true },
  { href: '/student/saved', label: 'Saved Programs', requiresAuth: true },
  { href: '/student/onboarding', label: 'Academic Profile', requiresAuth: true },
  { href: '/programs/search', label: 'Program Search', requiresAuth: false },
  { href: '/student/settings', label: 'Settings', requiresAuth: true }
]

export function StudentHeader({
  user,
  isLoggedIn = false,
  isOnboardingComplete = true
}: StudentHeaderProps) {
  const pathname = usePathname()

  // Show amber indicator on Academic Profile when onboarding is incomplete
  const showOnboardingIndicator = isLoggedIn && !isOnboardingComplete

  // Get the appropriate href for a nav link based on auth state
  const getNavHref = (link: (typeof navLinks)[0]) => {
    if (!isLoggedIn && link.requiresAuth) {
      return '/auth/signin'
    }
    return link.href
  }

  return (
    <header className="w-full bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo-restored.svg"
              alt="IB Match"
              width={48}
              height={48}
              className="rounded-lg"
              priority
            />
          </Link>

          {/* Navigation - Hidden on mobile, close to logo */}
          <nav className="hidden md:flex items-center ml-6 gap-1">
            {navLinks.map((link) => {
              const href = getNavHref(link)
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')

              return (
                <Link
                  key={link.href}
                  href={href}
                  className={cn(
                    'group relative px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
                  {/* Amber dot indicator for incomplete onboarding */}
                  {showOnboardingIndicator && link.href === '/student/onboarding' && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                    </span>
                  )}
                  {/* Active indicator - underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
                  )}
                  {/* Hover indicator - gray underline (only when not active) */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-muted-foreground/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Avatar (logged in) or Sign In button (logged out) */}
          {isLoggedIn && user ? (
            <Link
              href="/student/settings"
              className="shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            >
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || 'User avatar'}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                  style={{ width: 40, height: 40 }}
                />
              ) : (
                <div
                  className="flex items-center justify-center rounded-full text-white font-semibold text-base"
                  style={{ backgroundColor: user.avatarColor, width: 40, height: 40 }}
                >
                  {user.initial}
                </div>
              )}
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
