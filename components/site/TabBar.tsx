'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bookmark, Compass, GraduationCap, ListChecks, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { APP_PLACES, isInSection, nextTabBarScroll, type TabBarScroll } from './nav'

/** List checks, not a heart or the logo's mark, so the bar doesn't change with the logo (D2.14). */
const TABS: readonly { link: { href: string; label: string }; Icon: LucideIcon }[] = [
  { link: APP_PLACES.matches, Icon: ListChecks },
  { link: APP_PLACES.explore, Icon: Compass },
  { link: APP_PLACES.shortlist, Icon: Bookmark },
  { link: APP_PLACES.academic, Icon: GraduationCap }
]

/**
 * The phone tab bar, signed in, below 768px (D2.14). It slides away while the student scrolls
 * down and comes back on the way up, as MobileBottomNav does today; with reduced motion it fades
 * instead. Hidden, its links stay in the tab order, and focusing one brings it back. The bar is
 * fixed and the page keeps its room, so nothing reflows. No count on Shortlist.
 */
export function TabBar() {
  const pathname = usePathname()
  const [scroll, setScroll] = useState<TabBarScroll>({ visible: true, anchorY: 0 })

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setScroll((state) => nextTabBarScroll(state, window.scrollY))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav
      aria-label="Main"
      // The toast reads these to sit above the bar, and to follow it down (app/globals.css)
      data-tab-bar=""
      data-hidden={scroll.visible ? undefined : ''}
      onFocus={() => setScroll((state) => (state.visible ? state : { ...state, visible: true }))}
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 gap-x-1 border-t border-border bg-background/94 px-1 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] md:hidden',
        // 240ms, the system's timing for sheets; reduced motion keeps a 240ms fade and no
        // movement, which the important duration lets through the global reduced-motion rule
        'transition-[translate,opacity] duration-240 ease-standard motion-reduce:transition-opacity motion-reduce:duration-240!',
        !scroll.visible &&
          'pointer-events-none translate-y-full motion-reduce:translate-y-0 motion-reduce:opacity-0'
      )}
    >
      {TABS.map(({ link, Icon }) => {
        const current = isInSection(link, pathname)
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? 'page' : undefined}
            className={cn(
              'group flex min-h-13 flex-col items-center justify-center gap-0.5 rounded-[0.75rem] text-xs',
              current
                ? 'font-semibold text-brand-ink'
                : 'font-medium text-muted-foreground active:text-foreground'
            )}
          >
            <span
              className={cn(
                'inline-flex h-8 w-14 items-center justify-center rounded-full transition-[background-color,scale] duration-120 ease-standard',
                // A shape as well as the colour, so the current tab shows in forced colours,
                // where the transparent border is drawn
                current
                  ? 'border border-transparent bg-brand-soft'
                  : 'group-active:bg-border motion-safe:group-active:scale-96'
              )}
            >
              <Icon aria-hidden="true" size={24} strokeWidth={1.75} />
            </span>
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
