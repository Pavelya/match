/**
 * FadeIn Animation Component
 *
 * Reusable wrapper component for entrance animations.
 * Uses tw-animate-css classes for smooth fade and slide effects.
 *
 * @example
 * ```tsx
 * // Basic fade in from bottom (default)
 * <FadeIn>
 *   <MyContent />
 * </FadeIn>
 *
 * // Fade in from right with delay
 * <FadeIn direction="left" delay={200}>
 *   <MyContent />
 * </FadeIn>
 *
 * // Custom duration
 * <FadeIn duration={500} direction="up">
 *   <MyContent />
 * </FadeIn>
 * ```
 */

'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/lib/hooks'

export type FadeInDirection = 'up' | 'down' | 'left' | 'right' | 'none'

export interface FadeInProps {
  /** Direction to fade in from */
  direction?: FadeInDirection
  /** Delay before animation starts (in ms) */
  delay?: number
  /** Animation duration (in ms) */
  duration?: number
  /** Additional CSS classes */
  className?: string
  /** Content to animate */
  children: React.ReactNode
}

/**
 * Direction to tw-animate-css class mapping
 * 'up' means content slides up into view (comes from bottom)
 */
const directionClasses: Record<FadeInDirection, string> = {
  up: 'animate-in fade-in slide-in-from-bottom-4',
  down: 'animate-in fade-in slide-in-from-top-4',
  left: 'animate-in fade-in slide-in-from-right-4',
  right: 'animate-in fade-in slide-in-from-left-4',
  none: 'animate-in fade-in'
}

export function FadeIn({
  direction = 'up',
  delay = 0,
  duration = 300,
  className,
  children
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion()

  // If user prefers reduced motion, render without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      className={cn(directionClasses[direction], className)}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        // 'backwards' applies the starting state before the animation begins
        // This prevents a flash of the final state before animation starts
        animationFillMode: 'backwards'
      }}
    >
      {children}
    </div>
  )
}

/**
 * FadeInGroup - Wrapper for multiple FadeIn elements with automatic stagger
 *
 * @example
 * ```tsx
 * <FadeInGroup stagger={100}>
 *   <FadeIn><Card1 /></FadeIn>
 *   <FadeIn><Card2 /></FadeIn>
 *   <FadeIn><Card3 /></FadeIn>
 * </FadeInGroup>
 * ```
 */
export interface FadeInGroupProps {
  /** Delay between each child animation (in ms) */
  stagger?: number
  /** Initial delay before first child animates (in ms) */
  initialDelay?: number
  /** Additional CSS classes for the container */
  className?: string
  /** FadeIn children */
  children: React.ReactNode
}

export function FadeInGroup({
  stagger = 50,
  initialDelay = 0,
  className,
  children
}: FadeInGroupProps) {
  const prefersReducedMotion = useReducedMotion()

  // If reduced motion, just render children without modification
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  // Clone children and add staggered delays
  const childrenWithDelay = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child

    // Calculate delay for this child
    const childDelay = initialDelay + index * stagger

    // If child is a FadeIn component, add to its existing delay
    if (child.type === FadeIn) {
      const existingDelay = (child.props as FadeInProps).delay || 0
      return React.cloneElement(child as React.ReactElement<FadeInProps>, {
        delay: existingDelay + childDelay
      })
    }

    // Otherwise, wrap in a simple fade-in div
    return (
      <div
        className="animate-in fade-in"
        style={{
          animationDelay: `${childDelay}ms`,
          animationDuration: '300ms',
          animationFillMode: 'backwards'
        }}
      >
        {child}
      </div>
    )
  })

  return <div className={className}>{childrenWithDelay}</div>
}
