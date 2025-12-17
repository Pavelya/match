/**
 * ToastProvider Component
 *
 * Provides toast notification context to the app.
 * Wrap your app with this provider to enable toast notifications.
 *
 * @example
 * ```tsx
 * // In your layout.tsx
 * import { ToastProvider } from '@/components/providers/toast-provider'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <ToastProvider>
 *           {children}
 *         </ToastProvider>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */

'use client'

import React, { useState, useCallback, useMemo } from 'react'
import {
  ToastContext,
  generateToastId,
  type Toast,
  type ToastOptions,
  type ToastContextValue
} from '@/lib/hooks/use-toast'
import { ToastContainer } from '@/components/ui/toast'

interface ToastProviderProps {
  children: React.ReactNode
  /** Default duration for toasts in ms (default: 5000) */
  defaultDuration?: number
  /** Maximum number of visible toasts (default: 5) */
  maxToasts?: number
}

export function ToastProvider({
  children,
  defaultDuration = 5000,
  maxToasts = 5
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(
    (options: ToastOptions): string => {
      const id = generateToastId()

      const newToast: Toast = {
        id,
        title: options.title,
        description: options.description,
        variant: options.variant || 'default',
        duration: options.duration ?? defaultDuration,
        dismissible: options.dismissible ?? true
      }

      setToasts((prev) => {
        // Limit the number of visible toasts
        const updated = [...prev, newToast]
        if (updated.length > maxToasts) {
          return updated.slice(-maxToasts)
        }
        return updated
      })

      return id
    },
    [defaultDuration, maxToasts]
  )

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  const contextValue: ToastContextValue = useMemo(
    () => ({
      toasts,
      toast,
      dismiss,
      dismissAll
    }),
    [toasts, toast, dismiss, dismissAll]
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}
