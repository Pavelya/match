/**
 * Toast Component
 *
 * Animated toast notification with variants, auto-dismiss, and progress bar.
 *
 * Features:
 * - Slide in from bottom-right
 * - Auto-dismiss after configurable duration
 * - Progress bar showing time remaining
 * - Variants: default, success, error, warning, info
 * - Dismiss on click
 * - Respects reduced motion preference
 *
 * @example
 * ```tsx
 * // Used internally by ToastContainer - not typically used directly
 * <Toast
 *   toast={{ id: '1', title: 'Saved!', variant: 'success' }}
 *   onDismiss={(id) => remove(id)}
 * />
 * ```
 */

'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/lib/hooks'
import type { Toast as ToastType, ToastVariant } from '@/lib/hooks/use-toast'

interface ToastProps {
  toast: ToastType
  onDismiss: (id: string) => void
}

// Variant styling configuration
const variantConfig: Record<
  ToastVariant,
  {
    icon: typeof CheckCircle
    iconClass: string
    containerClass: string
    progressClass: string
  }
> = {
  default: {
    icon: Info,
    iconClass: 'text-foreground',
    containerClass: 'bg-background border-border',
    progressClass: 'bg-primary'
  },
  success: {
    icon: CheckCircle,
    iconClass: 'text-green-500',
    containerClass: 'bg-background border-green-200 dark:border-green-900',
    progressClass: 'bg-green-500'
  },
  error: {
    icon: AlertCircle,
    iconClass: 'text-red-500',
    containerClass: 'bg-background border-red-200 dark:border-red-900',
    progressClass: 'bg-red-500'
  },
  warning: {
    icon: AlertTriangle,
    iconClass: 'text-amber-500',
    containerClass: 'bg-background border-amber-200 dark:border-amber-900',
    progressClass: 'bg-amber-500'
  },
  info: {
    icon: Info,
    iconClass: 'text-blue-500',
    containerClass: 'bg-background border-blue-200 dark:border-blue-900',
    progressClass: 'bg-blue-500'
  }
}

function Toast({ toast, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(100)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const variant = toast.variant || 'default'
  const config = variantConfig[variant]
  const Icon = config.icon
  const duration = toast.duration || 5000

  // Define handlers first (before effects that use them)
  const handleDismiss = useCallback(() => {
    if (toast.dismissible === false) return

    // Exit animation
    setIsVisible(false)
    // Wait for exit animation before removing
    setTimeout(
      () => {
        onDismiss(toast.id)
      },
      prefersReducedMotion ? 0 : 200
    )
  }, [toast.id, toast.dismissible, onDismiss, prefersReducedMotion])

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false)
  }, [])

  // Trigger entrance animation
  useEffect(() => {
    // Small delay for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10)
    return () => clearTimeout(timer)
  }, [])

  // Handle auto-dismiss with progress
  useEffect(() => {
    if (duration === 0) return // Never auto-dismiss

    const startTime = Date.now()
    let animationFrame: number

    const updateProgress = () => {
      if (isPaused) {
        animationFrame = requestAnimationFrame(updateProgress)
        return
      }

      const elapsed = Date.now() - startTime
      const newProgress = Math.max(0, ((duration - elapsed) / duration) * 100)

      setProgress(newProgress)

      if (newProgress > 0) {
        animationFrame = requestAnimationFrame(updateProgress)
      } else {
        // Auto-dismiss when progress reaches 0
        handleDismiss()
      }
    }

    animationFrame = requestAnimationFrame(updateProgress)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [duration, isPaused, handleDismiss])

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-lg border shadow-lg',
        'transition-all duration-200 ease-out',
        config.containerClass,
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        prefersReducedMotion && 'transition-none'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toast.dismissible ? handleDismiss : undefined}
    >
      {/* Progress bar */}
      {duration > 0 && (
        <div
          className={cn(
            'absolute top-0 left-0 h-1 transition-all duration-100',
            config.progressClass,
            isPaused && 'opacity-50'
          )}
          style={{ width: `${progress}%` }}
        />
      )}

      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', config.iconClass)} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{toast.title}</p>
          {toast.description && (
            <p className="mt-1 text-sm text-muted-foreground">{toast.description}</p>
          )}
        </div>

        {/* Dismiss button */}
        {toast.dismissible && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDismiss()
            }}
            className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * ToastContainer - Renders all active toasts
 */
interface ToastContainerProps {
  toasts: ToastType[]
  onDismiss: (id: string) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

export { Toast }
