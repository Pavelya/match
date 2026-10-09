'use client'

import type { ComponentProps, MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { buttonVariants, type ButtonVariantProps } from './button-variants'

interface ButtonProps extends Omit<ComponentProps<'button'>, 'disabled'>, ButtonVariantProps {
  /**
   * Stays focusable (aria-disabled), so Tab still reaches it and a screen reader can read why.
   * Put the reason next to the button and point `aria-describedby` at it.
   */
  disabled?: boolean
  /** Swaps the label for `loadingLabel` ("Saving…"), never a spinner. */
  loading?: boolean
  /** Given to a button that can load, so it is as wide as the longer label and never jumps. */
  loadingLabel?: ReactNode
}

export function Button({
  variant,
  size,
  disabled = false,
  loading = false,
  loadingLabel,
  type = 'button',
  className,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const inert = disabled || loading

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    // aria-disabled doesn't stop clicks or form submission, so stop them here.
    if (inert) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }

  return (
    <button
      type={type}
      aria-disabled={inert || undefined}
      aria-busy={loading || undefined}
      data-disabled={(disabled && !loading) || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={handleClick}
      {...props}
    >
      {loadingLabel !== undefined ? (
        // Both labels share one grid cell; the hidden one keeps the width and isn't read out.
        <span className="grid">
          <span
            className={cn(
              'col-start-1 row-start-1 inline-flex items-center justify-center gap-2',
              loading && 'invisible'
            )}
          >
            {children}
          </span>
          <span className={cn('col-start-1 row-start-1', !loading && 'invisible')}>
            {loadingLabel}
          </span>
        </span>
      ) : (
        children
      )}
    </button>
  )
}
