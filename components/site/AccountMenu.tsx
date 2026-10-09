'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, LogOut } from 'lucide-react'
import { ThemeSwitch } from '@/components/ds/ThemeSwitch'
import { avatarPhotoUrl } from '@/lib/avatar-utils'
import { cn } from '@/lib/utils'
import { CurrentLink } from './CurrentLink'
import { ACCOUNT_LINKS } from './nav'
import { signOutAndGoHome } from './sign-out'
import { panelRowClass, scrimClass } from './styles'
import { useDisclosure } from './use-disclosure'

export interface AccountUser {
  name: string | null
  email: string | null
  /** The Google profile photo, when the student signed in with Google */
  image: string | null
  /** The name's first letter, else the email's */
  initial: string
}

/**
 * The student's Google photo, or the initial on brand-ink without one. The photo sits over the
 * initial, so the initial shows while it loads, and it gives way to it if it fails to load. Kept
 * from today's header (owner, 9 October 2026); the boards draw the initial.
 */
function Avatar({ user }: { user: AccountUser }) {
  const [photoFailed, setPhotoFailed] = useState(false)
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-ink text-[0.875rem] font-semibold text-primary-foreground forced-colors:border forced-colors:border-[CanvasText]"
    >
      {user.initial}
      {user.image && !photoFailed && (
        // A plain img: next/image would double this chunk, and there is nothing to optimise
        // eslint-disable-next-line @next/next/no-img-element
        <img
          // Google's own 64px photo, sharp at 32px
          src={avatarPhotoUrl(user.image, 64)}
          alt=""
          width={32}
          height={32}
          referrerPolicy="no-referrer"
          onError={() => setPhotoFailed(true)}
          // A photo that failed before hydration fired its error before React was listening
          ref={(img) => {
            if (img?.complete && img.naturalWidth === 0) setPhotoFailed(true)
          }}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </span>
  )
}

/**
 * The avatar and the account panel behind it ("D1.4 Account menu", D2.12): Settings, FAQs,
 * Contact, Appearance and Sign out. On desktop a 288px panel under the button; on a phone the
 * same panel drops full width from the header, with 48px rows and 44px Appearance options.
 */
export function AccountMenu({ user, className }: { user: AccountUser; className?: string }) {
  const { open, buttonProps, panelProps } = useDisclosure()
  const Chevron = open ? ChevronUp : ChevronDown

  return (
    <div className={className}>
      <button
        {...buttonProps}
        aria-label="Account"
        className={cn(
          "relative inline-flex size-11 items-center justify-center rounded-full border border-transparent text-muted-foreground md:h-9 md:w-auto md:gap-1 md:pr-2 md:pl-px md:before:absolute md:before:inset-x-0 md:before:-inset-y-1 md:before:content-['']",
          'transition-[color,background-color,scale] duration-180 ease-standard active:duration-120',
          'hover:bg-muted hover:text-foreground active:bg-border active:text-foreground motion-safe:active:scale-[0.98]',
          'aria-expanded:border-line-3 aria-expanded:bg-muted aria-expanded:text-foreground forced-colors:not-aria-expanded:border-0'
        )}
      >
        <Avatar user={user} />
        <Chevron aria-hidden="true" size={16} className="hidden md:block" />
      </button>
      {open && <div aria-hidden="true" className={cn(scrimClass, 'md:hidden')} />}
      <div
        {...panelProps}
        className={cn(
          'absolute inset-x-0 top-full flex flex-col gap-0.5 border-b border-border bg-card px-2 pt-2 pb-3 shadow-overlay',
          'md:inset-x-auto md:top-[calc(100%+0.375rem)] md:right-4 md:w-72 md:rounded-card md:border md:pb-2'
        )}
      >
        <div className="mb-1 flex flex-col gap-0.5 border-b border-border px-3 pt-2 pb-3">
          {user.name && <span className="text-body font-semibold break-words">{user.name}</span>}
          {user.email && (
            <span className="text-small font-normal break-words text-muted-foreground">
              {user.email}
            </span>
          )}
        </div>
        {ACCOUNT_LINKS.map((link) => (
          <CurrentLink key={link.href} href={link.href} match="page" className={panelRowClass}>
            {link.label}
          </CurrentLink>
        ))}
        <div className="mt-1 border-t border-border px-3 py-2.5">
          <ThemeSwitch variant="labelled" />
        </div>
        <form action={signOutAndGoHome} className="mt-1 border-t border-border">
          <button
            type="submit"
            className={cn(panelRowClass, 'w-full gap-2 rounded-none font-medium')}
          >
            <LogOut aria-hidden="true" size={16} strokeWidth={1.75} />
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}
