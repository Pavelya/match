import type { ComponentProps, HTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/*
 * The surface every list and panel sits on (rebranding 1.2, canvas board "D2.8 Card and
 * skeleton"). The edge is a real 1px border, not a box-shadow hairline, so it survives forced
 * colours; the raised and overlay shadows sit on top of it.
 */

const ELEVATION = {
  /** Lists and panels */
  flat: '',
  /** Cards that open */
  raised: 'shadow-raised',
  /** Menus, sheets and dialogs */
  overlay: 'shadow-overlay'
} as const

interface CardProps extends HTMLAttributes<HTMLElement> {
  elevation?: keyof typeof ELEVATION
  as?: 'div' | 'article' | 'section' | 'li'
}

/** Radius 14 and padding 20 (16 on a phone). A card with more than one action links only its title. */
export function Card({ elevation = 'flat', as: Tag = 'div', className, ...props }: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-card border border-border bg-card p-4 text-card-foreground md:p-5',
        ELEVATION[elevation],
        className
      )}
      {...props}
    />
  )
}

/**
 * A card that goes to one place is one link ("Similar programs you meet"). Hover darkens the edge
 * and deepens the shadow, with no lift; a press goes to 99%. Put its name in CardTitle.
 */
export function CardLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        'group/card flex flex-col gap-1.5 rounded-card border border-border bg-card p-4 text-card-foreground shadow-raised',
        'transition-[border-color,box-shadow,background-color,scale] duration-180 ease-standard',
        'hover:border-line-3 hover:shadow-raised-hover',
        'active:border-line-3 active:bg-muted active:shadow-none active:duration-120 motion-safe:active:scale-[0.99]',
        className
      )}
      {...props}
    />
  )
}

/** A card's name: H3, underlined while its CardLink is hovered. */
export function CardTitle({
  as: Tag = 'span',
  className,
  children
}: {
  as?: 'span' | 'h2' | 'h3'
  className?: string
  children: ReactNode
}) {
  return (
    <Tag className={cn('text-h3 underline-offset-3 group-hover/card:underline', className)}>
      {children}
    </Tag>
  )
}
