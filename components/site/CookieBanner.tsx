'use client'

import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
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
import { announceCookieChoice } from '@/lib/cookie-choice'
import { cn } from '@/lib/utils'
import { BottomPanel, focusMain, useStepFooterShown } from './bottom-panel'

/*
 * The cookie banner in the new design (rebranding 4.1, boards "D4.1 Home" and "D4.1 Home ·
 * phone"). Today's three choices, stored as today (lib/cookie-consent.ts), half a second after
 * the page shows, and still not on /auth. Not modal: it takes no focus, and sits first in Tab
 * order after the skip link (cookie-slot.tsx). Essential only and Accept all carry the same
 * weight. Its place and panel are BottomPanel's, which the policy update notice (D2.16) shares; the
 * notice waits for this choice. Both wait while a page shows the steps' footer (owner, 20 October
 * 2026), and this one appears half a second after the next page without it. The public frame
 * renders it on every page, so only the new design downloads it.
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
  const stepFooter = useStepFooterShown()

  const [shown, setShown] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [settings, setSettings] = useState(false)

  const panel = useRef<HTMLElement>(null)
  const settingsTitle = useRef<HTMLHeadingElement>(null)
  const customize = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (onAuth || stepFooter || hasConsentChoice()) return
    const timer = window.setTimeout(() => setShown(true), 500)
    return () => window.clearTimeout(timer)
  }, [onAuth, stepFooter])

  // Out: a 180ms fade, then gone
  useEffect(() => {
    if (!leaving) return
    const timer = window.setTimeout(() => setShown(false), 180)
    return () => window.clearTimeout(timer)
  }, [leaving])

  const visible = shown && !onAuth && !stepFooter
  if (!visible) return null

  function choose(choice: CookieChoice) {
    storeConsent(choice)
    announceCookieChoice()
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
  return (
    <BottomPanel labelledBy={titleId} leaving={leaving} panelRef={panel}>
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
              className="rounded-chip font-semibold text-primary underline underline-offset-3 transition-colors duration-180 ease-standard hover:text-brand-hover pressed:text-brand-ink pressed:underline"
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
    </BottomPanel>
  )
}
