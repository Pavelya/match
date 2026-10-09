import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SiteFrameProps {
  header: ReactNode
  footer: ReactNode
  /** The phone tab bar, signed in. The page keeps room for it under the footer. */
  tabBar?: ReactNode
  /**
   * `div` where the page brings its own `<main>`, as today's public pages do; `main` where the
   * layout's children are bare.
   */
  mainElement?: 'main' | 'div'
  children: ReactNode
}

/**
 * The page around its content: skip link, header, content, footer and, signed in, the tab bar
 * (rebranding 1.5). The public and signed-in frames share it.
 */
export function SiteFrame({
  header,
  footer,
  tabBar,
  mainElement: Main = 'main',
  children
}: SiteFrameProps) {
  return (
    <div className={cn('flex min-h-dvh flex-col', tabBar && 'max-md:pb-20')}>
      <a
        href="#main"
        className="sr-only z-50 focus:not-sr-only focus:fixed focus:top-2.5 focus:left-4 focus:inline-flex focus:h-11 focus:items-center focus:rounded-control focus:border focus:border-line-3 focus:bg-card focus:px-4 focus:text-body focus:font-semibold focus:text-foreground focus:shadow-overlay"
      >
        Skip to main content
      </a>
      {header}
      <Main id="main" className="flex-1">
        {children}
      </Main>
      {footer}
      {tabBar}
    </div>
  )
}
