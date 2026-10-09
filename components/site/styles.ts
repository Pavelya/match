/*
 * Class lists the chrome's server and client parts share. A plain module, not 'use client', so a
 * server component that imports a string gets the string (components/ds/button-variants.ts).
 */

/** 64px on desktop, 56px on a phone; sticky, and never hidden on scroll (D2.12). */
export const headerClass = 'sticky top-0 z-40 border-b border-border bg-background'

/** The 1240px content width the footer and the pages share, with 24px (16px on a phone) sides. */
export const containerClass = 'mx-auto w-full max-w-[80.5rem]'

export const headerRowClass = `${containerClass} relative flex h-14 items-center gap-0.5 pr-1.5 pl-4 md:h-16 md:gap-2 md:px-6`

/**
 * A header link: 36px to look at, with a 44px hit area (D2.1); 44px on a phone, where it is
 * used. The current page gets the surface fill and the 1px line-3 edge of a chosen segment.
 * Forced colours draw transparent borders, so only the current link keeps one there.
 */
export const navLinkClass = [
  "relative inline-flex h-9 shrink-0 items-center gap-2 rounded-control border border-transparent px-3 text-body font-medium whitespace-nowrap text-muted-foreground before:absolute before:inset-x-0 before:-inset-y-1 before:content-['']",
  'transition-[color,background-color,scale] duration-180 ease-standard active:duration-120',
  'not-aria-[current=page]:hover:bg-muted not-aria-[current=page]:hover:text-foreground',
  'not-aria-[current=page]:active:bg-border not-aria-[current=page]:active:text-foreground motion-safe:active:scale-[0.98]',
  'aria-[current=page]:border-line-3 aria-[current=page]:bg-card aria-[current=page]:font-semibold aria-[current=page]:text-foreground dark:aria-[current=page]:bg-border',
  'forced-colors:not-aria-[current=page]:border-0'
].join(' ')

/** A row in the Menu and account panels: 40px on desktop, 48px and 17px type on a phone. */
export const panelRowClass = [
  'flex min-h-12 items-center rounded-[0.5rem] px-3 text-[1.0625rem] leading-6 text-foreground md:min-h-10 md:text-body',
  'transition-colors duration-180 ease-standard hover:bg-muted active:bg-border'
].join(' ')

/** The scrim under a panel that drops from the phone header. */
export const scrimClass =
  'absolute inset-x-0 top-full h-dvh bg-[rgb(20_22_27/0.32)] dark:bg-black/50'
