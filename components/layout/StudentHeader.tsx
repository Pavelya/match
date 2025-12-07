/**
 * Student Header Component
 *
 * Navigation header for all student pages.
 * Features:
 * - Logo (links to main page)
 * - Navigation links (real <a> tags, openable in new tab)
 * - User avatar (Google image or fallback with colored initial)
 * - Desktop: logo + nav + avatar
 * - Mobile: logo + avatar only
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface StudentHeaderProps {
  user: {
    email?: string | null
    image?: string | null
    name?: string | null
  }
}

// Navigation links configuration
const navLinks = [
  { href: '/student/matches', label: 'My Matches' },
  { href: '/student/saved', label: 'Saved Programs' },
  { href: '/student/onboarding', label: 'Academic Profile' },
  { href: '/programs/search', label: 'Program Search' },
  { href: '/student/dashboard', label: 'Dashboard' }
]

// Avatar background colors - carefully selected to:
// 1. Have good contrast with white text
// 2. Work well with the app's primary blue (#3573E5)
// 3. Be visually distinct from each other
const avatarColors = [
  '#3573E5', // Primary blue
  '#10B981', // Emerald green
  '#8B5CF6', // Violet
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#6366F1', // Indigo
  '#F97316' // Orange
]

/**
 * Generate a consistent color for a user based on their email
 * Uses a simple hash to ensure the same email always gets the same color
 */
function getAvatarColor(email: string): string {
  let hash = 0
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % avatarColors.length
  return avatarColors[index]
}

/**
 * Get the initial letter for avatar fallback
 */
function getInitial(email?: string | null, name?: string | null): string {
  if (name && name.length > 0) {
    return name.charAt(0).toUpperCase()
  }
  if (email && email.length > 0) {
    return email.charAt(0).toUpperCase()
  }
  return '?'
}

export function StudentHeader({ user }: StudentHeaderProps) {
  const pathname = usePathname()

  const initial = getInitial(user.email, user.name)
  const avatarColor = user.email ? getAvatarColor(user.email) : avatarColors[0]

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
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'group relative px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
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

          {/* Avatar */}
          <div className="shrink-0">
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
                style={{ backgroundColor: avatarColor, width: 40, height: 40 }}
              >
                {initial}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
