'use client'

import { useEffect, useState, useSyncExternalStore, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { useCookieSlot } from './cookie-slot'

/*
 * The panel the cookie banner (D4.1) and the policy update notice (D2.16) share: one at a time,
 * in one place. Desktop: 420px, bottom right. A phone: across the bottom, or on the tab bar signed
 * in, where the bar stays put while it shows and a toast rises above both (app/globals.css). Not
 * modal: it takes no focus, and sits first in Tab order after the skip link (cookie-slot.tsx).
 */

interface BottomPanelProps {
  /** The id of the panel's heading, which names the region */
  labelledBy: string
  /** Fading out, before the caller unmounts it */
  leaving: boolean
  panelRef: RefObject<HTMLElement | null>
  children: ReactNode
}

export function BottomPanel({ labelledBy, leaving, panelRef, children }: BottomPanelProps) {
  const slot = useCookieSlot()
  /** Once it has risen in. A new slot then takes it without a second entrance. */
  const [entered, setEntered] = useState(false)

  // A toast rises above the panel: --bottom-panel is how far its top is from the bottom of the
  // screen, tab bar included (app/globals.css). From layout, not the box on screen, which is
  // lower while the panel rises in.
  useEffect(() => {
    const element = panelRef.current
    if (!element) return
    const style = document.body.style
    const measure = () =>
      style.setProperty(
        '--bottom-panel',
        `${element.offsetHeight + parseFloat(getComputedStyle(element).bottom)}px`
      )
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
      style.removeProperty('--bottom-panel')
    }
  }, [panelRef, slot])

  const panel = (
    <section
      ref={panelRef}
      aria-labelledby={labelledBy}
      data-bottom-panel=""
      onTransitionEnd={() => setEntered(true)}
      className={cn(
        // Below the header, scrolling inside when it would reach it
        'fixed inset-x-0 bottom-0 z-50 flex max-h-[calc(100dvh-7rem)] flex-col gap-3.5 overflow-y-auto overscroll-contain',
        'rounded-2xl border border-border bg-card px-4 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-foreground shadow-overlay max-md:rounded-b-none',
        'md:inset-x-auto md:right-6 md:bottom-6 md:w-105 md:gap-4 md:p-5 md:px-6',
        // In: an 8px rise and a fade, 240ms; out: a 180ms fade. Reduced motion keeps the fades
        // and drops the rise (globals.css, D1.6)
        'transition-[opacity,translate] duration-240 ease-standard',
        !entered && 'starting:translate-y-2 starting:opacity-0',
        leaving && 'pointer-events-none opacity-0 duration-180'
      )}
    >
      {children}
    </section>
  )

  return slot ? createPortal(panel, slot) : panel
}

/**
 * Focus on the page's content (SiteFrame's #main), without scrolling, when a choice closes the
 * panel with focus inside. It takes focus only for this, so a click elsewhere in the page never
 * lands on it.
 */
export function focusMain() {
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

/*
 * Whether the page shows the steps' fixed footer (D2.6: first run, Academic's editing screens).
 * Both panels wait while it does, or they would cover Continue and Save changes (D2.16). Watched
 * rather than read once: those pages load their content after the first paint.
 */
const STEP_FOOTER = '[data-step-footer]'

function subscribeToStepFooter(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.body, { childList: true, subtree: true })
  return () => observer.disconnect()
}

export function useStepFooterShown(): boolean {
  return useSyncExternalStore(
    subscribeToStepFooter,
    () => document.querySelector(STEP_FOOTER) !== null,
    () => false
  )
}
