/**
 * Mobile Bottom Navigation Component
 *
 * A fixed bottom navigation bar for mobile devices.
 * Features:
 * - Shows on scroll up, hides on scroll down
 * - Animated transitions
 * - Active state with filled icons and primary color
 * - Real links that work properly
 */

'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Bookmark, GraduationCap, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

// Navigation items with icons
const navItems = [
  {
    href: '/student/matches',
    label: 'Matches',
    icon: Heart
  },
  {
    href: '/student/saved',
    label: 'Saved',
    icon: Bookmark
  },
  {
    href: '/student/onboarding',
    label: 'Academic',
    icon: GraduationCap
  },
  {
    href: '/programs/search',
    label: 'Search',
    icon: Search
  }
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

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
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
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
