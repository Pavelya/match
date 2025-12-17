/**
 * useToast Hook
 *
 * Global toast notification system.
 * Provides a simple API for showing toast messages from anywhere in the app.
 *
 * @example
 * ```tsx
 * const { toast, dismiss, dismissAll } = useToast()
 *
 * // Show a success toast
 * toast({ title: 'Saved!', variant: 'success' })
 *
 * // Show an error toast with description
 * toast({
 *   title: 'Error',
 *   description: 'Something went wrong',
 *   variant: 'error'
 * })
 *
 * // Dismiss a specific toast
 * const id = toast({ title: 'Loading...' })
 * dismiss(id)
 * ```
 */

import { createContext, useContext } from 'react'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
  dismissible?: boolean
}

export interface ToastOptions {
  title: string
  description?: string
  variant?: ToastVariant
  /** Duration in ms before auto-dismiss (default: 5000, 0 = never) */
  duration?: number
  /** Whether toast can be dismissed by clicking (default: true) */
  dismissible?: boolean
}

export interface ToastContextValue {
  /** Currently visible toasts */
  toasts: Toast[]
  /** Show a toast notification, returns toast ID */
  toast: (options: ToastOptions) => string
  /** Dismiss a specific toast by ID */
  dismiss: (id: string) => void
  /** Dismiss all toasts */
  dismissAll: () => void
}

// Create context with default noop values
export const ToastContext = createContext<ToastContextValue>({
  toasts: [],
  toast: () => '',
  dismiss: () => {},
  dismissAll: () => {}
})

/**
 * Hook to access toast functionality.
 * Must be used within a ToastProvider.
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  return context
}

/**
 * Helper function to create a unique ID for each toast
 */
export function generateToastId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}
