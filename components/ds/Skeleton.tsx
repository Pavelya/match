import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/*
 * Placeholders while a list or page loads (rebranding 1.2, canvas board "D2.8 Card and
 * skeleton"). A flat tint in the line colour, the size of what replaces it, so nothing jumps when
 * the content arrives (CLS 0). No shimmer, no pulse. The transparent border shows as an outline in
 * forced colours. Replaces animate-shimmer and .skeleton-bg.
 */

interface SkeletonProps {
  className?: string
  style?: CSSProperties
}

/** One block: a thumbnail, a badge, a button. Radius 6 unless the class says otherwise. */
export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      style={style}
      className={cn('block shrink-0 rounded-chip border border-transparent bg-border', className)}
    />
  )
}

interface SkeletonLineProps {
  /** The line box of the text it stands for: 24 for a title, 18 for a meta line. */
  line?: number
  /** The bar inside it: 14 for a title, 10 for a meta line. */
  bar?: number
  /** "58%", or pixels for a fixed width. */
  width: string | number
  className?: string
}

/** A bar for a line of text, sitting inside that text's line height. */
export function SkeletonLine({ line = 24, bar = 14, width, className }: SkeletonLineProps) {
  return (
    <span
      aria-hidden="true"
      style={{ height: line }}
      className={cn('flex items-center', className)}
    >
      <Skeleton style={{ height: bar, width }} />
    </span>
  )
}

interface LoadingRegionProps {
  /** Said once by screen readers: "Loading matches". */
  label: string
  children: ReactNode
  className?: string
}

/**
 * The region that is loading: aria-busy, one hidden status, and the skeleton hidden from screen
 * readers. Only the parts that load are skeletons; the header, search and filters stay real.
 */
export function LoadingRegion({ label, children, className }: LoadingRegionProps) {
  return (
    <div aria-busy="true" className={className}>
      <span role="status" className="sr-only">
        {label}
      </span>
      <div aria-hidden="true" className="contents">
        {children}
      </div>
    </div>
  )
}
