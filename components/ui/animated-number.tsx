/**
 * AnimatedNumber Component
 *
 * Smoothly animates number changes with an easing curve.
 * Only animates when the value actually changes - not on every render.
 *
 * Key features:
 * - Only animates when value changes (not on mount by default)
 * - Uses requestAnimationFrame for 60fps smooth animation
 * - Ease-out curve for natural feel
 * - Respects reduced motion preference
 * - Optional number formatting
 *
 * @example
 * ```tsx
 * // Basic usage
 * <AnimatedNumber value={1234} />
 *
 * // With formatting
 * <AnimatedNumber value={0.85} format={(n) => `${Math.round(n * 100)}%`} />
 *
 * // Animate on initial mount
 * <AnimatedNumber value={count} animateOnMount />
 *
 * // Custom duration
 * <AnimatedNumber value={score} duration={1000} />
 * ```
 */

'use client'

import { useEffect, useState, useRef } from 'react'
import { useReducedMotion } from '@/lib/hooks'

interface AnimatedNumberProps {
  /** The target value to display/animate to */
  value: number
  /** Animation duration in milliseconds (default: 500) */
  duration?: number
  /** Format function for display (default: Math.round) */
  format?: (n: number) => string
  /** Whether to animate on initial mount (default: false) */
  animateOnMount?: boolean
  /** Starting value for initial mount animation (default: 0) */
  initialValue?: number
  /** Additional CSS classes */
  className?: string
}

export function AnimatedNumber({
  value,
  duration = 500,
  format = (n) => Math.round(n).toString(),
  animateOnMount = false,
  initialValue = 0,
  className
}: AnimatedNumberProps) {
  const prefersReducedMotion = useReducedMotion()

  // Track if this is the initial mount
  const isInitialMount = useRef(true)

  // Track the previous value to detect changes
  const previousValue = useRef(animateOnMount ? initialValue : value)

  // Current display value
  const [displayValue, setDisplayValue] = useState(animateOnMount ? initialValue : value)

  // Animation refs
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const startValueRef = useRef(displayValue)

  useEffect(() => {
    // Skip animation if reduced motion is preferred
    if (prefersReducedMotion) {
      setDisplayValue(value)
      previousValue.current = value
      isInitialMount.current = false
      return
    }

    // On initial mount: only animate if animateOnMount is true
    if (isInitialMount.current) {
      isInitialMount.current = false
      if (!animateOnMount) {
        // Just set the value directly, no animation
        setDisplayValue(value)
        previousValue.current = value
        return
      }
    }

    // Check if value actually changed
    if (value === previousValue.current) {
      return // No change, no animation
    }

    // Cancel any ongoing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    // Start new animation
    startValueRef.current = displayValue
    startTimeRef.current = null

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out cubic curve for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3)

      // Interpolate between start and target
      const current = startValueRef.current + (value - startValueRef.current) * eased

      setDisplayValue(current)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        // Animation complete
        setDisplayValue(value)
        previousValue.current = value
        animationFrameRef.current = null
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    // Cleanup on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [value, duration, animateOnMount, prefersReducedMotion, displayValue])

  // Update previous value when value changes
  useEffect(() => {
    return () => {
      previousValue.current = value
    }
  }, [value])

  return <span className={className}>{format(displayValue)}</span>
}

/**
 * Pre-configured animated percentage display
 */
export function AnimatedPercentage({
  value,
  duration = 500,
  decimals = 0,
  animateOnMount = false,
  className
}: {
  value: number
  duration?: number
  decimals?: number
  animateOnMount?: boolean
  className?: string
}) {
  const formatPercent = (n: number) => {
    if (decimals === 0) {
      return `${Math.round(n)}%`
    }
    return `${n.toFixed(decimals)}%`
  }

  return (
    <AnimatedNumber
      value={value}
      duration={duration}
      format={formatPercent}
      animateOnMount={animateOnMount}
      className={className}
    />
  )
}

/**
 * Pre-configured animated currency display
 */
export function AnimatedCurrency({
  value,
  currency = 'USD',
  duration = 500,
  animateOnMount = false,
  className
}: {
  value: number
  currency?: string
  duration?: number
  animateOnMount?: boolean
  className?: string
}) {
  const formatCurrency = (n: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.round(n))
  }

  return (
    <AnimatedNumber
      value={value}
      duration={duration}
      format={formatCurrency}
      animateOnMount={animateOnMount}
      className={className}
    />
  )
}
