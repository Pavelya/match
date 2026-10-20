'use client'

import { ChevronRight, Menu, X } from 'lucide-react'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { cn } from '@/lib/utils'
import { CurrentLink } from './CurrentLink'
import { PUBLIC_LINKS, SIGN_IN_HREF } from './nav'
import { scrimClass } from './styles'
import { useDisclosure } from './use-disclosure'

/**
 * Menu, signed out, below 1024px: the four public links and "Get my matches" in a panel that
 * drops from the header over a scrim (D2.12), both fading in (D1.6). Signed in there is no Menu;
 * the avatar opens the account panel instead, so the two never sit side by side.
 */
export function SiteMenu({ className }: { className?: string }) {
  const { open, buttonProps, panelProps } = useDisclosure()
  const Icon = open ? X : Menu

  return (
    <div className={className}>
      <button
        {...buttonProps}
        aria-label={open ? 'Close menu' : 'Menu'}
        className={cn(
          'press inline-flex size-11 items-center justify-center rounded-control border border-transparent text-foreground active:bg-border',
          'aria-expanded:border-line-3 aria-expanded:bg-muted forced-colors:not-aria-expanded:border-0'
        )}
      >
        <Icon aria-hidden="true" size={22} strokeWidth={1.75} />
      </button>
      <div aria-hidden="true" hidden={!open} className={scrimClass} />
      <nav
        {...panelProps}
        aria-label="Main"
        className="overlay-sm absolute inset-x-0 top-full flex flex-col border-b border-border bg-card px-2 pt-2 pb-4 shadow-overlay"
      >
        {PUBLIC_LINKS.map((link) => (
          <CurrentLink
            key={link.href}
            href={link.href}
            section={link.section}
            className={cn(
              'flex min-h-13 items-center justify-between rounded-control border border-transparent px-3 text-[1.0625rem] leading-6 font-medium text-foreground',
              'transition-colors duration-180 ease-standard hover:bg-muted active:bg-muted',
              'aria-[current=page]:border-line-3 aria-[current=page]:font-semibold forced-colors:not-aria-[current=page]:border-0'
            )}
          >
            {link.label}
            <ChevronRight aria-hidden="true" size={16} className="text-ink-3" />
          </CurrentLink>
        ))}
        {/* From 768px the header shows "Get my matches" beside Menu, so the panel doesn't repeat it */}
        <div className="mx-3 mt-2 mb-3 h-px bg-border md:hidden" />
        <ButtonLink href={SIGN_IN_HREF} prefetch={false} className="mx-1 md:hidden">
          Get my matches
        </ButtonLink>
      </nav>
    </div>
  )
}
