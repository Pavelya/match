/**
 * useReducedMotion Hook
 *
 * Detects if the user has enabled "reduce motion" in their OS accessibility settings.
 * Use this hook to conditionally disable or simplify animations in JavaScript/React.
 *
 * Note: CSS animations are already handled by the @media (prefers-reduced-motion: reduce)
 * query in globals.css. This hook is for cases where you need to control animations
 * programmatically in React components.
 *
 * @example
 * ```tsx
 * const prefersReducedMotion = useReducedMotion()
 *
 * return (
 *   <motion.div
 *     animate={{ opacity: 1, y: prefersReducedMotion ? 0 : 20 }}
 *     transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
 *   />
 * )
 * ```
 */

'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Subscribe to media query changes
 */
function subscribe(callback: () => void): () => void {
  const mediaQuery = window.matchMedia(QUERY)
  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}

/**
 * Get current value of media query (client-side)
 */
function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches
}

/**
 * Server snapshot - always return false (allow animations)
 * This prevents hydration mismatch
 */
function getServerSnapshot(): boolean {
  return false
}

/**
 * Returns true if the user prefers reduced motion.
 * Updates automatically if the user changes their OS preference.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * Helper function to get animation duration based on reduced motion preference.
 * Returns 0 if reduced motion is preferred, otherwise returns the provided duration.
 */
export function getAnimationDuration(duration: number, prefersReducedMotion: boolean): number {
  return prefersReducedMotion ? 0 : duration
}

/**
 * Helper function to get animation config based on reduced motion preference.
 * Useful for conditional animation props.
 */
export function getAnimationConfig<T>(
  fullConfig: T,
  reducedConfig: T,
  prefersReducedMotion: boolean
): T {
  return prefersReducedMotion ? reducedConfig : fullConfig
}
