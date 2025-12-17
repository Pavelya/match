/**
 * ButtonLoading Component
 *
 * Enhanced Button with integrated loading and success states.
 * Shows a spinner while loading and a checkmark on success.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ButtonLoading loading={isSaving} onClick={handleSave}>
 *   Save Changes
 * </ButtonLoading>
 *
 * // With success state
 * <ButtonLoading loading={isSaving} success={saved}>
 *   Save Changes
 * </ButtonLoading>
 *
 * // With custom loading text
 * <ButtonLoading loading={isSaving} loadingText="Saving...">
 *   Save Changes
 * </ButtonLoading>
 * ```
 */

import * as React from 'react'
import { Loader2, CheckCircle } from 'lucide-react'
import { Button, buttonVariants } from './button'
import { cn } from '@/lib/utils'
import type { VariantProps } from 'class-variance-authority'

export interface ButtonLoadingProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  /** Whether the button is in a loading state */
  loading?: boolean
  /** Whether to show success state (checkmark + "Saved") */
  success?: boolean
  /** Text to show while loading (replaces children) */
  loadingText?: string
  /** Text to show on success (default: "Saved") */
  successText?: string
  /** Whether to use Slot for composition */
  asChild?: boolean
}

/**
 * Button with integrated loading and success states.
 * Automatically disables and shows spinner when loading.
 * Shows checkmark and success text briefly after success.
 */
function ButtonLoading({
  children,
  loading = false,
  success = false,
  loadingText,
  successText = 'Saved',
  disabled,
  className,
  ...props
}: ButtonLoadingProps) {
  return (
    <Button
      disabled={disabled || loading}
      className={cn(
        // Ensure consistent width during loading
        loading && 'cursor-wait',
        // Success state styling
        success && 'bg-green-600 hover:bg-green-600 text-white',
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText || children}
        </>
      ) : success ? (
        <>
          <CheckCircle className="h-4 w-4" />
          {successText}
        </>
      ) : (
        children
      )}
    </Button>
  )
}

/**
 * Button with loading state that maintains its width.
 * The spinner replaces content but button doesn't resize.
 */
function ButtonLoadingFixed({
  children,
  loading = false,
  success = false,
  successText = 'Saved',
  disabled,
  className,
  ...props
}: ButtonLoadingProps) {
  return (
    <Button
      disabled={disabled || loading}
      className={cn(
        'relative',
        loading && 'cursor-wait',
        success && 'bg-green-600 hover:bg-green-600 text-white',
        className
      )}
      {...props}
    >
      {/* Invisible content to maintain width */}
      <span className={cn((loading || success) && 'invisible')}>{children}</span>
      {/* Centered spinner overlay */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </span>
      )}
      {/* Success overlay */}
      {success && !loading && (
        <span className="absolute inset-0 flex items-center justify-center gap-2">
          <CheckCircle className="h-4 w-4" />
          {successText}
        </span>
      )}
    </Button>
  )
}

/**
 * Async button that handles loading and success states automatically.
 * Call onClick with an async function and it will show loading until complete,
 * then briefly show a success state.
 *
 * @example
 * ```tsx
 * <ButtonAsync onClick={async () => {
 *   await saveData()
 * }}>
 *   Save
 * </ButtonAsync>
 * ```
 */
function ButtonAsync({
  children,
  onClick,
  disabled,
  className,
  successDuration = 2000,
  ...props
}: Omit<ButtonLoadingProps, 'loading' | 'success'> & {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void
  /** How long to show success state in ms (default: 2000) */
  successDuration?: number
}) {
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick) return

    setLoading(true)
    setSuccess(false)
    try {
      await onClick(e)
      // Show success state briefly
      setSuccess(true)
      setTimeout(() => setSuccess(false), successDuration)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ButtonLoading
      loading={loading}
      success={success}
      disabled={disabled}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </ButtonLoading>
  )
}

export { ButtonLoading, ButtonLoadingFixed, ButtonAsync }
