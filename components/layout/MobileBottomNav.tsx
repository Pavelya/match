/**
 * Mobile Bottom Navigation Component
 *
 * A fixed bottom navigation bar for mobile devices.
 * Features:
 * - Shows on scroll up, hides on scroll down
 * - Animated transitions
 * - Active state with filled icons and primary color
 * - Real links that work properly
 * - Redirect mapping for logged-out users
 */

'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Bookmark, GraduationCap, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileBottomNavProps {
  /** Whether the user is logged in */
  isLoggedIn?: boolean
}

// Navigation items with icons
// For logged-out users, student/* routes redirect to signin
const navItems = [
  {
    href: '/student/matches',
    label: 'Matches',
    icon: Heart,
    requiresAuth: true
  },
  {
    href: '/student/saved',
    label: 'Saved',
    icon: Bookmark,
    requiresAuth: true
  },
  {
    href: '/student/onboarding',
    label: 'Academic',
    icon: GraduationCap,
    requiresAuth: true
  },
  {
    href: '/programs/search',
    label: 'Search',
    icon: Search,
    requiresAuth: false
  }
]

export function MobileBottomNav({ isLoggedIn = false }: MobileBottomNavProps) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  // Get the appropriate href for a nav item based on auth state
  const getNavHref = (item: (typeof navItems)[0]) => {
    if (!isLoggedIn && item.requiresAuth) {
      return '/auth/signin'
    }
    return item.href
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          // Only trigger visibility change after scrolling more than 10px
          if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
              // Scrolling down & past 100px - hide
              setIsVisible(false)
            } else {
              // Scrolling up - show
              setIsVisible(true)
            }
            lastScrollY.current = currentScrollY
          }

          ticking.current = false
        })

        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden',
        'transition-transform duration-300 ease-in-out',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="flex items-center justify-around h-16 px-2 safe-area-inset-bottom">
        {navItems.map((item) => {
          const href = getNavHref(item)
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 py-2 gap-1',
                'transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon
                className={cn(
                  'w-6 h-6',
                  // Fill the icon when active (for icons that support it)
                  isActive && (item.icon === Heart || item.icon === Bookmark) && 'fill-current'
                )}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
