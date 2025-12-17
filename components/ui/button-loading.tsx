/**
 * ButtonLoading Component
 *
 * Enhanced Button with integrated loading state.
 * Shows a spinner and optional loading text while an async action is in progress.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ButtonLoading loading={isSaving} onClick={handleSave}>
 *   Save Changes
 * </ButtonLoading>
 *
 * // With custom loading text
 * <ButtonLoading loading={isSaving} loadingText="Saving...">
 *   Save Changes
 * </ButtonLoading>
 *
 * // With icon
 * <ButtonLoading loading={isSaving}>
 *   <Save className="h-4 w-4" />
 *   Save Changes
 * </ButtonLoading>
 * ```
 */

import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { Button, buttonVariants } from './button'
import { cn } from '@/lib/utils'
import type { VariantProps } from 'class-variance-authority'

export interface ButtonLoadingProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  /** Whether the button is in a loading state */
  loading?: boolean
  /** Text to show while loading (replaces children) */
  loadingText?: string
  /** Whether to use Slot for composition */
  asChild?: boolean
}

/**
 * Button with integrated loading state.
 * Automatically disables and shows spinner when loading.
 */
function ButtonLoading({
  children,
  loading = false,
  loadingText,
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
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText || children}
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
  disabled,
  className,
  ...props
}: ButtonLoadingProps) {
  return (
    <Button
      disabled={disabled || loading}
      className={cn('relative', loading && 'cursor-wait', className)}
      {...props}
    >
      {/* Invisible content to maintain width */}
      <span className={cn(loading && 'invisible')}>{children}</span>
      {/* Centered spinner overlay */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </span>
      )}
    </Button>
  )
}

/**
 * Async button that handles loading state automatically.
 * Call onClick with an async function and it will show loading until complete.
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
  ...props
}: Omit<ButtonLoadingProps, 'loading'> & {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void
}) {
  const [loading, setLoading] = React.useState(false)

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick) return

    setLoading(true)
    try {
      await onClick(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ButtonLoading
      loading={loading}
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
