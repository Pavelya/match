/**
 * StaggerChildren Animation Component
 *
 * Container component that animates its children in sequence with a stagger delay.
 * Each child fades in and slides in from the specified direction.
 *
 * @example
 * ```tsx
 * // Basic usage - children appear one by one
 * <StaggerChildren staggerDelay={60} className="space-y-4">
 *   {programs.map(program => (
 *     <ProgramCard key={program.id} program={program} />
 *   ))}
 * </StaggerChildren>
 *
 * // With initial delay before first child
 * <StaggerChildren staggerDelay={50} initialDelay={200}>
 *   <Card>First</Card>
 *   <Card>Second</Card>
 *   <Card>Third</Card>
 * </StaggerChildren>
 *
 * // Different direction
 * <StaggerChildren direction="left" staggerDelay={100}>
 *   <MenuItem />
 *   <MenuItem />
 * </StaggerChildren>
 * ```
 */

'use client'

import React from 'react'
import { useReducedMotion } from '@/lib/hooks'

export type StaggerDirection = 'up' | 'down' | 'left' | 'right'

export interface StaggerChildrenProps {
  /** Delay between each child animation in ms */
  staggerDelay?: number
  /** Initial delay before first child animates in ms */
  initialDelay?: number
  /** Direction children slide in from */
  direction?: StaggerDirection
  /** Animation duration for each child in ms */
  duration?: number
  /** Additional CSS classes for the container */
  className?: string
  /** Children to animate */
  children: React.ReactNode
}

/**
 * Direction to tw-animate-css class mapping
 */
const directionClasses: Record<StaggerDirection, string> = {
  up: 'animate-in fade-in slide-in-from-bottom-4',
  down: 'animate-in fade-in slide-in-from-top-4',
  left: 'animate-in fade-in slide-in-from-right-4',
  right: 'animate-in fade-in slide-in-from-left-4'
}

export function StaggerChildren({
  staggerDelay = 50,
  initialDelay = 0,
  direction = 'up',
  duration = 300,
  className,
  children
}: StaggerChildrenProps) {
  const prefersReducedMotion = useReducedMotion()

  // If reduced motion is preferred, render children without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  // Map over children and wrap each in an animated container
  const animatedChildren = React.Children.map(children, (child, index) => {
    // Skip null/undefined children
    if (!React.isValidElement(child)) {
      return child
    }

    // Calculate delay for this child
    const delay = initialDelay + index * staggerDelay

    return (
      <div
        key={child.key ?? index}
        className={directionClasses[direction]}
        style={{
          animationDelay: `${delay}ms`,
          animationDuration: `${duration}ms`,
          animationFillMode: 'backwards'
        }}
      >
        {child}
      </div>
    )
  })

  return <div className={className}>{animatedChildren}</div>
}

/**
 * Hook to get stagger animation styles for manual implementation
 *
 * @example
 * ```tsx
 * const getStaggerStyle = useStaggerStyles({ staggerDelay: 50 })
 *
 * return (
 *   <div>
 *     {items.map((item, index) => (
 *       <div key={item.id} style={getStaggerStyle(index)}>
 *         {item.content}
 *       </div>
 *     ))}
 *   </div>
 * )
 * ```
 */
export function useStaggerStyles(
  options: {
    staggerDelay?: number
    initialDelay?: number
    duration?: number
  } = {}
) {
  const { staggerDelay = 50, initialDelay = 0, duration = 300 } = options
  const prefersReducedMotion = useReducedMotion()

  return (index: number): React.CSSProperties => {
    if (prefersReducedMotion) {
      return {}
    }

    return {
      animationDelay: `${initialDelay + index * staggerDelay}ms`,
      animationDuration: `${duration}ms`,
      animationFillMode: 'backwards'
    }
  }
}

/**
 * Get stagger animation class name for a child at a given index
 * Useful when you need to apply stagger to elements that aren't direct children
 */
export function getStaggerClassName(direction: StaggerDirection = 'up'): string {
  return directionClasses[direction]
}
