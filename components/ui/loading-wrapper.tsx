/**
 * LoadingWrapper Component
 *
 * Wraps content with automatic loading state handling.
 * Prevents flash of loading state for fast responses by delaying
 * the loader appearance.
 *
 * @example
 * ```tsx
 * // Basic usage - shows skeleton after 200ms delay
 * <LoadingWrapper loading={isLoading}>
 *   <MyContent />
 * </LoadingWrapper>
 *
 * // With custom skeleton
 * <LoadingWrapper
 *   loading={isLoading}
 *   skeleton={<MyCustomSkeleton />}
 * >
 *   <MyContent />
 * </LoadingWrapper>
 *
 * // With minimum duration (prevents flicker for very fast loads)
 * <LoadingWrapper
 *   loading={isLoading}
 *   delay={200}
 *   minDuration={500}
 * >
 *   <MyContent />
 * </LoadingWrapper>
 * ```
 */

'use client'

import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import { PageLoader, type PageLoaderVariant } from './page-loader'
import { cn } from '@/lib/utils'

export interface LoadingWrapperProps {
  /** Whether content is currently loading */
  loading: boolean
  /** Content to display when not loading */
  children: ReactNode
  /** Custom skeleton to show during loading (overrides variant) */
  skeleton?: ReactNode
  /** PageLoader variant to use if no custom skeleton provided */
  variant?: PageLoaderVariant
  /** Number of skeleton items (passed to PageLoader) */
  count?: number
  /** Loading message (for spinner variant) */
  message?: string
  /** Delay in ms before showing loader (prevents flash for fast loads) */
  delay?: number
  /** Minimum duration in ms to show loader (prevents flicker) */
  minDuration?: number
  /** Whether loader should be full screen */
  fullScreen?: boolean
  /** Additional CSS classes */
  className?: string
}

export function LoadingWrapper({
  loading,
  children,
  skeleton,
  variant = 'spinner',
  count,
  message,
  delay = 200,
  minDuration = 0,
  fullScreen = false,
  className
}: LoadingWrapperProps) {
  // Track whether we should show the loader (after delay)
  const [showLoader, setShowLoader] = useState(false)

  // Track when loading started (for minDuration)
  const loadingStartTime = useRef<number | null>(null)

  // Track timeouts for cleanup
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const minDurationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Clear all timeouts
  const clearTimeouts = useCallback(() => {
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current)
      delayTimeoutRef.current = null
    }
    if (minDurationTimeoutRef.current) {
      clearTimeout(minDurationTimeoutRef.current)
      minDurationTimeoutRef.current = null
    }
  }, [])

  // Handle loading state changes
  useEffect(() => {
    clearTimeouts()

    if (loading) {
      // Record when loading started
      loadingStartTime.current = Date.now()

      // Always use a timeout (even if delay is 0) to batch state updates
      delayTimeoutRef.current = setTimeout(
        () => {
          setShowLoader(true)
        },
        Math.max(delay, 0)
      )
    } else {
      // Loading finished
      if (minDuration > 0 && loadingStartTime.current && showLoader) {
        // Calculate remaining time to meet minimum duration
        const elapsed = Date.now() - loadingStartTime.current
        const remaining = Math.max(0, minDuration - elapsed)

        minDurationTimeoutRef.current = setTimeout(() => {
          setShowLoader(false)
          loadingStartTime.current = null
        }, remaining)
      } else {
        // No minimum duration or loader wasn't shown yet
        // Use timeout to batch state update
        minDurationTimeoutRef.current = setTimeout(() => {
          setShowLoader(false)
          loadingStartTime.current = null
        }, 0)
      }
    }

    return clearTimeouts
  }, [loading, delay, minDuration, showLoader, clearTimeouts])

  // Show content when not loading
  if (!loading && !showLoader) {
    return <div className={className}>{children}</div>
  }

  // Show nothing during the delay period (before loader appears)
  // This prevents flash - content will just stay visible
  if (loading && !showLoader) {
    return <div className={className}>{children}</div>
  }

  // Show the loader
  if (skeleton) {
    return <div className={cn(className)}>{skeleton}</div>
  }

  return (
    <PageLoader
      variant={variant}
      count={count}
      message={message}
      fullScreen={fullScreen}
      className={className}
    />
  )
}

/**
 * Hook version for more control over loading state timing
 *
 * @example
 * ```tsx
 * const { shouldShowLoader, isTransitioning } = useDelayedLoading(isLoading, {
 *   delay: 200,
 *   minDuration: 500
 * })
 *
 * if (shouldShowLoader) {
 *   return <MySkeleton />
 * }
 * return <MyContent />
 * ```
 */
export function useDelayedLoading(
  loading: boolean,
  options: { delay?: number; minDuration?: number } = {}
): { shouldShowLoader: boolean; isTransitioning: boolean } {
  const { delay = 200, minDuration = 0 } = options

  const [shouldShowLoader, setShouldShowLoader] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const loadingStartTime = useRef<number | null>(null)
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const minDurationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Clear all timeouts
  const clearTimeouts = useCallback(() => {
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current)
      delayTimeoutRef.current = null
    }
    if (minDurationTimeoutRef.current) {
      clearTimeout(minDurationTimeoutRef.current)
      minDurationTimeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    clearTimeouts()

    if (loading) {
      loadingStartTime.current = Date.now()
      // Use timeout to batch state update
      delayTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(true)
      }, 0)

      if (delay > 0) {
        delayTimeoutRef.current = setTimeout(() => {
          setShouldShowLoader(true)
        }, delay)
      } else {
        // Use timeout even for 0 delay to batch state update
        delayTimeoutRef.current = setTimeout(() => {
          setShouldShowLoader(true)
        }, 0)
      }
    } else {
      if (minDuration > 0 && loadingStartTime.current && shouldShowLoader) {
        const elapsed = Date.now() - loadingStartTime.current
        const remaining = Math.max(0, minDuration - elapsed)

        minDurationTimeoutRef.current = setTimeout(() => {
          setShouldShowLoader(false)
          setIsTransitioning(false)
          loadingStartTime.current = null
        }, remaining)
      } else {
        // Use timeout to batch state update
        minDurationTimeoutRef.current = setTimeout(() => {
          setShouldShowLoader(false)
          setIsTransitioning(false)
          loadingStartTime.current = null
        }, 0)
      }
    }

    return clearTimeouts
  }, [loading, delay, minDuration, shouldShowLoader, clearTimeouts])

  return { shouldShowLoader, isTransitioning }
}
