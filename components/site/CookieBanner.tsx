'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal, flushSync } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ds/Button'
import {
  ACCEPT_ALL,
  ESSENTIAL_ONLY,
  hasConsentChoice,
  storeConsent,
  type CookieChoice
} from '@/lib/cookie-consent'
import { cn } from '@/lib/utils'
import { useCookieSlot } from './cookie-slot'

/*
 * The cookie banner in the new design (rebranding 4.1, boards "D4.1 Home" and "D4.1 Home ·
 * phone"). Today's three choices, stored as today (lib/cookie-consent.ts), half a second after
 * the page shows, and still not on /auth. Not modal: it takes no focus, and sits first in Tab
 * order after the skip link (cookie-slot.tsx). Essential only and Accept all carry the same
 * weight. Desktop: 420px, bottom right. A phone: across the bottom, or on the tab bar signed in,
 * where the bar stays put while it shows and a toast rises above both (app/globals.css). The
 * public frame renders it on every page, so only the new design downloads it.
 */

const KINDS = [
  { name: 'Essential cookies', use: 'Sign-in and security', state: 'Always on' },
  { name: 'Analytics cookies', use: 'How the site is used, to improve it', state: 'Not used' },
  { name: 'Preference cookies', use: 'Remembering your settings', state: 'Not used' },
  { name: 'Marketing cookies', use: 'Advertising and retargeting', state: 'Not used' }
]

const choiceClass = 'px-4'

export function CookieBanner() {
  const pathname = usePathname()
  const onAuth = pathname?.startsWith('/auth') ?? false
  const slot = useCookieSlot()

  const [shown, setShown] = useState(false)
  const [leaving, setLeaving] = useState(false)
  /** Once it has risen in. A new slot then takes it without a second entrance. */
  const [entered, setEntered] = useState(false)
  const [settings, setSettings] = useState(false)

  const panel = useRef<HTMLElement>(null)
  const settingsTitle = useRef<HTMLHeadingElement>(null)
  const customize = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (onAuth || hasConsentChoice()) return
    const timer = window.setTimeout(() => setShown(true), 500)
    return () => window.clearTimeout(timer)
  }, [onAuth])

  // Out: a 180ms fade, then gone
  useEffect(() => {
    if (!leaving) return
    const timer = window.setTimeout(() => setShown(false), 180)
    return () => window.clearTimeout(timer)
  }, [leaving])

  // A toast rises above the banner: --cookie-banner is how far its top is from the bottom of
  // the screen, tab bar included (app/globals.css). From layout, not the box on screen, which
  // is lower while the banner rises in.
  const visible = shown && !onAuth
  useEffect(() => {
    const element = panel.current
    if (!visible || !element) return
    const style = document.body.style
    const measure = () =>
      style.setProperty(
        '--cookie-banner',
        `${element.offsetHeight + parseFloat(getComputedStyle(element).bottom)}px`
      )
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
      style.removeProperty('--cookie-banner')
    }
  }, [visible, slot])

  if (!visible) return null

  function choose(choice: CookieChoice) {
    storeConsent(choice)
    // Focus inside goes to the page's content, never to the top of the document
    if (panel.current?.contains(document.activeElement)) focusMain()
    setLeaving(true)
  }

  function openSettings() {
    flushSync(() => setSettings(true))
    settingsTitle.current?.focus()
  }

  function closeSettings() {
    flushSync(() => setSettings(false))
    customize.current?.focus()
  }

  const titleId = settings ? 'cookie-settings-title' : 'cookie-banner-title'
  const banner = (
    <section
      ref={panel}
      aria-labelledby={titleId}
      data-cookie-banner=""
      onTransitionEnd={() => setEntered(true)}
      className={cn(
        // Below the header, scrolling inside when it would reach it
        'fixed inset-x-0 bottom-0 z-50 flex max-h-[calc(100dvh-7rem)] flex-col gap-3.5 overflow-y-auto overscroll-contain',
        'rounded-2xl border border-border bg-card px-4 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-foreground shadow-overlay max-md:rounded-b-none',
        'md:inset-x-auto md:right-6 md:bottom-6 md:w-105 md:gap-4 md:p-5 md:px-6',
        // In: an 8px rise and a fade, 240ms; out: a 180ms fade. Reduced motion keeps the fades,
        // which the important durations let through the global reduced-motion rule
        'transition-[opacity,translate] duration-240 ease-standard motion-reduce:transition-opacity motion-reduce:duration-240!',
        !entered &&
          'starting:translate-y-2 starting:opacity-0 motion-reduce:starting:translate-y-0',
        leaving && 'pointer-events-none opacity-0 duration-180 motion-reduce:duration-180!'
      )}
    >
      {settings ? (
        <>
          <div className="flex flex-col gap-1">
            <h2
              id={titleId}
              ref={settingsTitle}
              tabIndex={-1}
              className="rounded-[0.25rem] text-h3"
            >
              Cookie settings
            </h2>
            <p className="text-body text-muted-foreground">
              Essential cookies can’t be turned off: the site needs them to work. IB Match sets no
              other cookies today.
            </p>
          </div>
          <ul className="border-t border-border">
            {KINDS.map((kind) => (
              <li
                key={kind.name}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 border-b border-border py-2.5"
              >
                <span className="flex flex-col">
                  <span className="text-body leading-5 font-semibold">{kind.name}</span>
                  <span className="text-small font-normal text-muted-foreground">{kind.use}</span>
                </span>
                <span
                  className={cn(
                    'text-small font-semibold',
                    kind.state === 'Always on' ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {kind.state}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="flex flex-col gap-1">
          <h2 id={titleId} className="text-h3">
            Cookies
          </h2>
          <p className="text-body text-muted-foreground">
            We use essential cookies to sign you in and keep your account secure. You can accept all
            cookies or only essential ones.{' '}
            <Link
              href="/cookies"
              className="rounded-chip font-semibold text-primary underline underline-offset-3 transition-colors duration-180 ease-standard hover:text-brand-hover"
            >
              Cookie policy
            </Link>
          </p>
        </div>
      )}
      {/* A phone: the first choice, then the two buttons sharing the rest of the row */}
      <div className="grid grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] items-center gap-2 md:flex">
        {settings ? (
          <Button variant="link" className="mr-1 underline md:mr-auto" onClick={closeSettings}>
            Back
          </Button>
        ) : (
          <Button
            ref={customize}
            variant="link"
            className="mr-1 underline md:mr-auto"
            onClick={openSettings}
          >
            Customize
          </Button>
        )}
        <Button variant="secondary" className={choiceClass} onClick={() => choose(ESSENTIAL_ONLY)}>
          Essential only
        </Button>
        <Button variant="secondary" className={choiceClass} onClick={() => choose(ACCEPT_ALL)}>
          Accept all
        </Button>
      </div>
    </section>
  )

  return slot ? createPortal(banner, slot) : banner
}

/**
 * Focus on the page's content (SiteFrame's #main), without scrolling. It takes focus only for
 * this, so a click elsewhere in the page never lands on it.
 */
function focusMain() {
  const main = document.getElementById('main')
  if (!main) {
    const active = document.activeElement
    if (active instanceof HTMLElement) active.blur()
    return
  }
  main.setAttribute('tabindex', '-1')
  main.addEventListener('blur', () => main.removeAttribute('tabindex'), { once: true })
  main.focus({ preventScroll: true })
}
