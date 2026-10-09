'use client'

import { useEffect, useId, useRef, useState, type MouseEvent } from 'react'

/**
 * A button that shows and hides a panel: Menu signed out, the account panel signed in. A
 * disclosure, not an ARIA menu, because the account panel holds a radio group (D2.12). Escape
 * closes it and puts focus back on the button; so does a click outside, unless that click put
 * focus somewhere else. Tabbing out of it, or following one of its links, closes it too.
 */
export function useDisclosure() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const inside = (node: EventTarget | null) =>
      node instanceof Node &&
      (buttonRef.current?.contains(node) || panelRef.current?.contains(node) || false)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (inside(event.target)) return
      setOpen(false)
      // After the click has moved focus, if it moved it nowhere
      requestAnimationFrame(() => {
        const active = document.activeElement
        if (!active || active === document.body) buttonRef.current?.focus()
      })
    }
    const onFocusIn = (event: FocusEvent) => {
      if (!inside(event.target)) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [open])

  return {
    open,
    buttonProps: {
      ref: buttonRef,
      type: 'button' as const,
      'aria-expanded': open,
      'aria-controls': panelId,
      onClick: () => setOpen((wasOpen) => !wasOpen)
    },
    panelProps: {
      ref: panelRef,
      id: panelId,
      hidden: !open,
      // A followed link leaves the panel open on a page that keeps the header
      onClick: (event: MouseEvent) => {
        if ((event.target as Element).closest('a')) setOpen(false)
      }
    }
  }
}
