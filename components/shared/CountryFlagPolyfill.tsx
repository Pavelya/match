'use client'

/**
 * Country Flag Emoji Polyfill
 *
 * This component fixes country flag emoji display in Windows browsers
 * (Edge, Chrome) which don't natively support flag emojis.
 *
 * The polyfill loads a small Twemoji font (~77KB) only when needed,
 * enabling proper flag display for country selection and location displays.
 *
 * @see https://github.com/nicolo-ribaudo/country-flag-emoji-polyfill
 */

import { useEffect } from 'react'
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill'

export function CountryFlagPolyfill() {
  useEffect(() => {
    // Only runs on client-side, detects if polyfill is needed
    // Returns true if polyfill was applied, false otherwise
    polyfillCountryFlagEmojis()
  }, [])

  // This component doesn't render anything
  return null
}
