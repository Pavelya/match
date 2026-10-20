import { cva, type VariantProps } from 'class-variance-authority'

/*
 * Buttons for the new design (rebranding 1.2, canvas board "D2.1 Button"). Focus is the global
 * outline from app/globals.css, never a box-shadow ring. A press is D1.6's: the shared press class
 * (98%) with each variant's darker fill, held while a ButtonLink's page loads. A link variant
 * changes colour instead of shrinking.
 */

/** aria-disabled doesn't grey a button out in forced colours the way disabled does. */
const disabledInForcedColours =
  'forced-colors:data-disabled:border-[GrayText] forced-colors:data-disabled:text-[GrayText]'

/** What every button shares. Home's lime band builds its two buttons on it (D4.1). */
export const buttonBase = [
  'relative inline-flex shrink-0 items-center justify-center gap-2 rounded-control border whitespace-nowrap select-none',
  '[&_svg]:pointer-events-none [&_svg]:shrink-0'
]

export const buttonVariants = cva(buttonBase, {
  variants: {
    variant: {
      // One per view
      primary: [
        'press border-transparent bg-primary font-semibold text-primary-foreground',
        'not-aria-disabled:hover:bg-brand-hover not-aria-disabled:pressed:bg-brand-ink',
        'data-disabled:bg-border data-disabled:text-ink-3',
        disabledInForcedColours
      ],
      // Everything else
      secondary: [
        'press border-line-2 bg-card font-medium text-foreground',
        'not-aria-disabled:hover:border-line-3 not-aria-disabled:hover:bg-muted',
        'not-aria-disabled:pressed:border-line-3 not-aria-disabled:pressed:bg-border',
        'data-disabled:border-border data-disabled:bg-transparent data-disabled:text-ink-3',
        disabledInForcedColours
      ],
      // Only inside a confirm dialog, for what deletes or takes away access (D2.1, D2.10). The
      // transparent edge is drawn in forced colours, where red can't mark it: the words do.
      danger: [
        'press border-transparent bg-danger font-semibold text-on-danger',
        'not-aria-disabled:hover:bg-danger-hover',
        'data-disabled:bg-border data-disabled:text-ink-3',
        disabledInForcedColours
      ],
      // Quiet actions, usually a link ("Official page"). Links are hidden, never disabled.
      link: [
        // No border, or forced colours would draw one round the link.
        'rounded-chip border-0 px-1 font-semibold text-primary underline-offset-3',
        'transition-colors duration-180 ease-standard',
        'not-aria-disabled:hover:text-brand-hover not-aria-disabled:hover:underline',
        'not-aria-disabled:pressed:text-brand-ink not-aria-disabled:pressed:underline'
      ]
    },
    // The size sets the text, so a direct buttonVariants() call, without cn() to merge, never
    // carries two text sizes: the stylesheet's order would pick text-body over text-body-l
    size: {
      // Toolbars and table rows. The look is 36px; the hit area grows to 44 by 44.
      sm: "h-9 px-3.5 text-body before:absolute before:-inset-x-1 before:-inset-y-1 before:content-['']",
      md: 'h-11 px-5 text-body',
      // The hero action on Home
      lg: 'h-13 px-6 text-body-l font-semibold',
      // Always pair with aria-label
      icon: 'size-11 p-0 text-body'
    }
  },
  compoundVariants: [
    { variant: 'secondary', size: 'md', className: 'px-4.5' },
    // Beside the hero action, secondary keeps its own weight (D4.1)
    { variant: 'secondary', size: 'lg', className: 'font-medium' },
    { variant: 'link', className: 'h-11 px-1' }
  ],
  defaultVariants: { variant: 'primary', size: 'md' }
})

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
