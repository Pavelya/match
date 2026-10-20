import { hasConsentChoice } from './cookie-consent'

/*
 * Whether the cookie banner is done with this browser, for the policy update notice, which waits
 * for it (rebranding 4.6, board "D2.16 Policy update banner"). Its own module, and the new
 * banner announces the choice, so today's banner, which every visitor downloads, is unchanged.
 */

const COOKIE_NAME = 'cookie-consent'
const CHOICE_EVENT = 'cookie-consent-choice'

/** The new design's cookie banner calls this after storing a choice */
export function announceCookieChoice() {
  window.dispatchEvent(new Event(CHOICE_EVENT))
}

/** A stored choice; the cookie also counts, for a browser that blocks localStorage */
export function cookieChoiceMade(): boolean {
  return (
    hasConsentChoice() || document.cookie.split('; ').some((c) => c.startsWith(`${COOKIE_NAME}=`))
  )
}

/** Calls back when a choice is stored, here or in another tab. For useSyncExternalStore. */
export function subscribeToCookieChoice(onChange: () => void): () => void {
  window.addEventListener(CHOICE_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHOICE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}
