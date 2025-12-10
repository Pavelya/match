/**
 * Admin Header Component
 *
 * Navigation header for all admin pages.
 * Features:
 * - Logo (links to admin dashboard)
 * - Navigation links for admin sections
 * - User avatar with colored initial fallback
 *
 * Privacy: Email is NOT passed to this client component.
 * Avatar color and initial are computed server-side.
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface AdminHeaderProps {
  user: {
    image?: string | null
    name?: string | null
    // Pre-computed values (computed server-side from email)
    avatarColor: string
    initial: string
  }
}

// Navigation links configuration for admin
const navLinks = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/schools', label: 'Schools' },
  { href: '/admin/programs', label: 'Programs' },
  { href: '/admin/universities', label: 'Universities' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/reference-data', label: 'Reference Data' }
]

export function AdminHeader({ user }: AdminHeaderProps) {
  const pathname = usePathname()

  return (
    <header className="w-full bg-background border-b">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          {/* Logo */}
          <Link href="/admin/dashboard" className="shrink-0 flex items-center gap-2">
            <Image
              src="/logo-restored.svg"
              alt="IB Match"
              width={40}
              height={40}
              className="rounded-lg"
              priority
            />
            <span className="hidden sm:block text-sm font-semibold text-muted-foreground">
              Admin
            </span>
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center ml-8 gap-1">
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

          {/* Back to main site link */}
          <Link
            href="/"
            className="hidden sm:block text-sm text-muted-foreground hover:text-foreground mr-4 transition-colors"
          >
            ← Back to Site
          </Link>

          {/* Avatar */}
          <div className="shrink-0">
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
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-t overflow-x-auto">
        <div className="flex px-4 py-2 gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'whitespace-nowrap text-sm font-medium py-1',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
