'use client'

import { useSyncExternalStore } from 'react'

/*
 * Where the cookie banner sits in the page (rebranding 4.1, board "D4.1 Home"): straight after the
 * skip link, so it comes first in Tab order after it. SiteFrame draws the slot, and the banner,
 * which PublicFrame renders on every page, moves into it. The slot changes when a navigation
 * swaps frames (Home to /programs, say); the store hands the banner the new one before the page
 * paints. Staff pages have no frame and no slot, and get the banner at the end of the page.
 */

let slot: HTMLElement | null = null
const listeners = new Set<() => void>()

function setSlot(next: HTMLElement | null) {
  slot = next
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function CookieSlot() {
  return (
    <div
      ref={(element) => {
        setSlot(element)
        // The next frame may already have taken over
        return () => {
          if (slot === element) setSlot(null)
        }
      }}
    />
  )
}

export function useCookieSlot(): HTMLElement | null {
  return useSyncExternalStore(
    subscribe,
    () => slot,
    () => null
  )
}
