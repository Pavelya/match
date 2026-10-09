import { cva, type VariantProps } from 'class-variance-authority'

/*
 * Buttons for the new design (rebranding 1.2, canvas board "D2.1 Button"). Focus is the global
 * outline from app/globals.css, never a box-shadow ring. Colour changes take 180 ms and the press
 * 120 ms; reduced motion keeps the colour and drops the press.
 */

/** aria-disabled doesn't grey a button out in forced colours the way disabled does. */
const disabledInForcedColours =
  'forced-colors:data-disabled:border-[GrayText] forced-colors:data-disabled:text-[GrayText]'

export const buttonVariants = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center gap-2 rounded-control border whitespace-nowrap select-none',
    'transition-[color,background-color,border-color,scale] duration-180 ease-standard active:duration-120',
    'not-aria-disabled:motion-safe:active:scale-[0.98]',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0'
  ],
  {
    variants: {
      variant: {
        // One per view
        primary: [
          'border-transparent bg-primary text-body font-semibold text-primary-foreground',
          'not-aria-disabled:hover:bg-brand-hover not-aria-disabled:active:bg-brand-ink',
          'data-disabled:bg-border data-disabled:text-ink-3',
          disabledInForcedColours
        ],
        // Everything else
        secondary: [
          'border-line-2 bg-card text-body font-medium text-foreground',
          'not-aria-disabled:hover:border-line-3 not-aria-disabled:hover:bg-muted',
          'not-aria-disabled:active:border-line-3 not-aria-disabled:active:bg-border',
          'data-disabled:border-border data-disabled:bg-transparent data-disabled:text-ink-3',
          disabledInForcedColours
        ],
        // Quiet actions, usually a link ("Official page"). Links are hidden, never disabled.
        link: [
          // No border, or forced colours would draw one round the link.
          'rounded-chip border-0 px-1 text-body font-semibold text-primary underline-offset-3',
          'not-aria-disabled:hover:text-brand-hover not-aria-disabled:hover:underline',
          'not-aria-disabled:active:text-brand-ink not-aria-disabled:active:underline'
        ]
      },
      size: {
        // Toolbars and table rows. The look is 36px; the hit area grows to 44 by 44.
        sm: "h-9 px-3.5 before:absolute before:-inset-x-1 before:-inset-y-1 before:content-['']",
        md: 'h-11 px-5',
        // The hero action on Home
        lg: 'h-13 px-6 text-body-l font-semibold',
        // Always pair with aria-label
        icon: 'size-11 p-0'
      }
    },
    compoundVariants: [
      { variant: 'secondary', size: 'md', className: 'px-4.5' },
      { variant: 'link', className: 'h-11 px-1' }
    ],
    defaultVariants: { variant: 'primary', size: 'md' }
  }
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
