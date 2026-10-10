'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode
} from 'react'
import Link from 'next/link'
import { CircleAlert, CircleCheck, Info, X, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/*
 * The short message after a save or a removal (rebranding 2.2, canvas board "D2.9 Toast",
 * approved 10 October 2026). It takes the other theme, dark on light pages and light on dark
 * ones, so it stands apart from the cards under it. One at a time: a new one replaces the last.
 * Every action in a toast is also on the page, so it can time out without losing anything:
 * successes after 5 seconds, failures after 10, paused while hovered or focused. One polite live
 * region, named Notifications, is in the page from the start and reads each toast once without
 * taking focus. Bottom centre on desktop; on a phone 12px above the tab bar, following it down
 * when it hides (`.ds-toast-region` in app/globals.css). Replaces components/ui/toast.tsx.
 */

export interface ToastOptions {
  /** `ok` for a save, `gap` for a failure, `info` for a removal */
  tone: 'ok' | 'gap' | 'info'
  message: string
  /** "View shortlist" (a link), "Undo" or "Try again" (a button) */
  action?: { label: string; href?: string; onClick?: () => void }
}

type ShownToast = ToastOptions & { id: number }

const SHOW_FOR = { ok: 5000, info: 5000, gap: 10000 } as const

const ICON: Record<ToastOptions['tone'], { Icon: LucideIcon; className: string }> = {
  ok: { Icon: CircleCheck, className: 'text-toast-ok' },
  gap: { Icon: CircleAlert, className: 'text-toast-gap' },
  info: { Icon: Info, className: 'text-background' }
}

const ToastContext = createContext<(toast: ToastOptions) => void>(() => {})

/** Shows a toast, replacing any on screen. */
export function useToast() {
  return useContext(ToastContext)
}

let nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ShownToast | null>(null)
  const [leaving, setLeaving] = useState(false)

  const show = useCallback((options: ToastOptions) => {
    setLeaving(false)
    setToast({ ...options, id: ++nextId })
  }, [])

  const dismiss = useCallback(() => setLeaving(true), [])

  // Out: a 120ms fade, then gone
  useEffect(() => {
    if (!leaving) return
    const timer = window.setTimeout(() => {
      setToast(null)
      setLeaving(false)
    }, 120)
    return () => window.clearTimeout(timer)
  }, [leaving])

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        role="status"
        aria-label="Notifications"
        className="ds-toast-region pointer-events-none fixed inset-x-4 z-50 flex justify-center md:inset-x-6 md:bottom-6"
      >
        {toast && (
          <ToastMessage key={toast.id} toast={toast} leaving={leaving} onDismiss={dismiss} />
        )}
      </div>
    </ToastContext.Provider>
  )
}

function ToastMessage({
  toast,
  leaving,
  onDismiss
}: {
  toast: ShownToast
  leaving: boolean
  onDismiss: () => void
}) {
  const { Icon, className: iconClass } = ICON[toast.tone]
  const remaining = useRef<number>(SHOW_FOR[toast.tone])
  const startedAt = useRef(0)
  const timer = useRef<number | undefined>(undefined)
  const hovered = useRef(false)
  const focused = useRef(false)

  const run = useCallback(() => {
    if (hovered.current || focused.current || timer.current !== undefined) return
    startedAt.current = Date.now()
    timer.current = window.setTimeout(onDismiss, remaining.current)
  }, [onDismiss])

  const pause = useCallback(() => {
    if (timer.current === undefined) return
    window.clearTimeout(timer.current)
    timer.current = undefined
    remaining.current = Math.max(0, remaining.current - (Date.now() - startedAt.current))
  }, [])

  useEffect(() => {
    run()
    return () => window.clearTimeout(timer.current)
  }, [run])

  const { action } = toast
  const actionClass =
    'inline-flex h-11 shrink-0 items-center rounded-[0.5rem] px-3 text-body font-semibold whitespace-nowrap text-background underline underline-offset-3 transition-[background-color,scale] duration-120 ease-standard hover:bg-background/12 active:bg-background/20 motion-safe:active:scale-98 dark:hover:bg-background/8 dark:active:bg-background/14 forced-colors:text-[ButtonText]'

  return (
    <div
      className={cn(
        // The other theme's focus outline, so it keeps its contrast on the toast
        '[--ring:var(--toast-ring)]',
        'pointer-events-auto grid w-full max-w-140 grid-cols-[20px_minmax(0,1fr)_44px] items-start gap-x-3 rounded-[0.75rem] border border-transparent bg-foreground py-1 pr-1 pb-1.5 pl-4 text-body text-background shadow-overlay',
        'md:flex md:w-auto md:min-h-14 md:items-center md:py-1.5 md:pr-1.5',
        // In: a fade and an 8px rise, 180ms; out: a 120ms fade. Reduced motion keeps the fades,
        // which the important durations let through the global reduced-motion rule
        'transition-[opacity,translate] duration-180 ease-standard starting:translate-y-2 starting:opacity-0',
        'motion-reduce:transition-opacity motion-reduce:duration-180! motion-reduce:starting:translate-y-0',
        leaving && 'opacity-0 duration-120 motion-reduce:duration-120!'
      )}
      onMouseEnter={() => {
        hovered.current = true
        pause()
      }}
      onMouseLeave={() => {
        hovered.current = false
        run()
      }}
      onFocus={() => {
        focused.current = true
        pause()
      }}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return
        focused.current = false
        run()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onDismiss()
      }}
    >
      <Icon
        aria-hidden="true"
        size={20}
        strokeWidth={2}
        className={cn('mt-3 shrink-0 md:mt-0', iconClass)}
      />
      <span className="pt-2.5 md:flex-1 md:pt-0">{toast.message}</span>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={onDismiss}
        className="col-start-3 row-start-1 inline-flex size-11 shrink-0 items-center justify-center rounded-[0.5rem] text-background transition-[background-color] duration-120 hover:bg-background/12 dark:hover:bg-background/8 forced-colors:text-[ButtonText] md:order-last"
      >
        <X aria-hidden="true" size={18} strokeWidth={2} />
      </button>
      {action &&
        (action.href ? (
          <Link
            href={action.href}
            className={cn(actionClass, 'col-start-2 -ml-3 justify-self-start md:ml-0')}
          >
            {action.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => {
              onDismiss()
              action.onClick?.()
            }}
            className={cn(actionClass, 'col-start-2 -ml-3 justify-self-start md:ml-0')}
          >
            {action.label}
          </button>
        ))}
    </div>
  )
}
