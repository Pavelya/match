'use client'

import { createContext, useContext } from 'react'

/**
 * The chrome round the page, for the 404 and error pages (rebranding 4.3, board "D4.15 404 and
 * error pages"). PublicFrame provides it, so only the new design has it: null means today's design,
 * whose 404 and error pages stay Next's own until release.
 *
 * - "public": the root layout drew the public header and footer round the page.
 * - "own": the root layout left the page to a layout that draws its own chrome (/student, /auth,
 *   …). A 404 or an error that replaced that layout draws the public header and footer itself.
 */
export type SiteChrome = 'public' | 'own' | null

export const SiteChromeContext = createContext<SiteChrome>(null)

export function useSiteChrome(): SiteChrome {
  return useContext(SiteChromeContext)
}
