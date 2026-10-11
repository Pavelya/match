'use client'

import Link from 'next/link'
import { Check, Minus, X, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SaveToggle } from '@/components/ds/SaveToggle'
import { Skeleton, SkeletonLine } from '@/components/ds/Skeleton'
import { StatusBadge } from '@/components/ds/StatusBadge'
import { UniversityThumb } from '@/components/match/UniversityThumb'
import type { CardStatus } from '@/lib/matching/match-status'
import type { ExploreFit, ExploreRow } from '@/lib/explore/types'
import { formatRate } from '@/lib/programs/ib-minimum'

/*
 * One program in Explore's list (rebranding 2.3, canvas board "D3.3 Result row", approved 11
 * October 2026). An item of an ordered list: the name is an h3 and the row's only link, Save its
 * only other control. From 1024px the values sit in columns under headings drawn for sighted
 * readers; each value carries its own label for screen readers ("Length 4 years"). Below that
 * the row stacks: the name, university and country, the fit in its status colour, and the
 * minimum on the right. No hover on the row; the name underlines. Names wrap in full.
 */

/** With the fit: thumbnail, program, country, length, minimum, fit, Save, 16 apart */
const WITH_FIT = 'lg:grid-cols-[56px_minmax(0,1fr)_140px_88px_104px_260px_44px]'
/** Signed out, or before grades: the program column takes the room */
const WITHOUT_FIT = 'lg:grid-cols-[56px_minmax(0,1fr)_160px_100px_120px_44px]'

const rowClasses = (fitColumn: boolean) =>
  cn(
    // Stacked below 1024px, where the columns would squeeze the name (D3.3 draws 1192 and 390);
    // the 56px thumbnail from 768
    'grid grid-cols-[48px_minmax(0,1fr)_auto_44px] items-start gap-x-2.5 border-t border-border py-3 pr-1 pl-3 first:border-t-0 md:grid-cols-[56px_minmax(0,1fr)_auto_44px] md:gap-x-3.5',
    'lg:items-center lg:gap-x-4 lg:px-5 lg:py-3.5',
    fitColumn ? WITH_FIT : WITHOUT_FIT
  )

const STATUS: Record<CardStatus, { Icon: LucideIcon; text: string }> = {
  meets: { Icon: Check, text: 'text-ok' },
  close: { Icon: Minus, text: 'text-close' },
  gap: { Icon: X, text: 'text-gap' }
}

interface ResultRowProps {
  row: ExploreRow
  /** Whether the list has a fit column: signed in with grades */
  fitColumn: boolean
  /** The row's fit; undefined while it loads, null when there is none */
  fit: ExploreFit | null | undefined
  saved: boolean
  saving: boolean
  onToggleSave: () => void
  /** Signed out, Save is a link to sign-in that comes back to the program */
  signInHref?: string
  /** Its place in the list, which varies the loading fit's width (D2.8) */
  index: number
}

export function ResultRow({
  row,
  fitColumn,
  fit,
  saved,
  saving,
  onToggleSave,
  signInHref,
  index
}: ResultRowProps) {
  const widths = SKELETON_WIDTHS[index % SKELETON_WIDTHS.length]
  return (
    <li className={rowClasses(fitColumn)}>
      <UniversityThumb image={row.image} initials={row.initials} />

      <div className="flex min-w-0 flex-col">
        <h3 className="text-[0.9375rem] leading-5 font-semibold break-words lg:text-h3">
          <Link
            id={`explore-${row.id}`}
            href={`/programs/${row.id}`}
            className="rounded-chip text-foreground underline-offset-3 hover:underline"
          >
            {row.name}
          </Link>
        </h3>
        <span className="text-small font-normal break-words text-muted-foreground">
          <span className="lg:hidden">
            {row.university} · {row.country}
          </span>
          <span className="max-lg:hidden">
            {row.university}
            {row.city && ` · ${row.city}`}
          </span>
        </span>
        {fitColumn && <PhoneFit fit={fit} width={widths[2]} />}
      </div>

      <span className="text-body max-lg:hidden">
        <span className="sr-only">Country </span>
        {row.country}
      </span>
      <span className="text-body text-muted-foreground tabular-nums max-lg:hidden">
        <span className="sr-only">Length </span>
        {row.length}
      </span>

      <Minimum row={row} />

      {fitColumn && (
        <span className="flex min-w-0 max-lg:hidden">
          {fit === undefined ? (
            <Skeleton className="h-7 rounded-full" style={{ width: widths[3] }} />
          ) : (
            fit && (
              <StatusBadge status={fit.status} className="rounded-[0.875rem] py-1">
                <span className="min-w-0">
                  <span className="sr-only">Your fit: </span>
                  {fit.badge}
                </span>
              </StatusBadge>
            )
          )}
        </span>
      )}

      <SaveToggle
        variant="icon"
        saved={saved}
        saving={saving}
        onToggle={onToggleSave}
        programName={`${row.name}, ${row.university}`}
        signInHref={signInHref}
        className="max-lg:-mt-2.5"
      />
    </li>
  )
}

/** The figure large and aligned; with no IB minimum, "None" and the admit rate under it */
function Minimum({ row }: { row: ExploreRow }) {
  if (row.minIBPoints !== null) {
    return (
      <span className="flex min-w-0 flex-col max-lg:items-end max-lg:text-right">
        <span className="text-[1.25rem] leading-6 font-semibold tabular-nums lg:leading-7">
          <span className="sr-only">IB minimum </span>
          {row.minIBPoints}
        </span>
        <span
          aria-hidden="true"
          className="text-[0.75rem] leading-4 text-muted-foreground lg:hidden"
        >
          points
        </span>
      </span>
    )
  }
  const rate = row.admitRate === null ? null : formatRate(row.admitRate)
  return (
    <span className="flex min-w-0 flex-col max-lg:items-end max-lg:text-right">
      <span className="text-body font-semibold text-muted-foreground">
        <span className="sr-only">IB minimum: </span>None
      </span>
      <span className="text-[0.75rem] leading-4 whitespace-nowrap text-muted-foreground tabular-nums lg:text-small lg:font-normal">
        {rate === null ? (
          'Holistic'
        ) : (
          <>
            <span className="lg:hidden">admits {rate}</span>
            <span className="max-lg:hidden">Admits {rate}</span>
            <span className="sr-only"> of first-year applicants</span>
          </>
        )}
      </span>
    </span>
  )
}

/** On a phone, the fit is the badge's words in its status colour, with its icon */
function PhoneFit({ fit, width }: { fit: ExploreFit | null | undefined; width: string }) {
  if (fit === undefined) {
    return <SkeletonLine line={18} bar={10} width={width} className="mt-1 lg:hidden" />
  }
  if (!fit) return null
  const { Icon, text } = STATUS[fit.status]
  return (
    <span
      className={cn(
        'mt-1 flex items-start gap-[5px] text-small font-semibold tabular-nums lg:hidden',
        text
      )}
    >
      <Icon aria-hidden="true" size={14} strokeWidth={2.4} className="mt-0.5 shrink-0" />
      <span>
        <span className="sr-only">Your fit: </span>
        {fit.badge}
      </span>
    </span>
  )
}

/** The column headings, drawn for sighted readers; each value names itself to a screen reader */
export function ResultHeadings({ fitColumn }: { fitColumn: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'grid items-center gap-x-4 border-b border-border px-5 py-3 text-label text-muted-foreground max-lg:hidden',
        fitColumn ? WITH_FIT : WITHOUT_FIT
      )}
    >
      <span />
      <span>Program</span>
      <span>Country</span>
      <span>Length</span>
      <span>IB minimum</span>
      {fitColumn && <span>Your fit</span>}
      <span />
    </div>
  )
}

/** A row while the next 20 load (D2.8): the size of a real one, its widths varied */
export function ResultRowSkeleton({ fitColumn, index }: { fitColumn: boolean; index: number }) {
  const widths = SKELETON_WIDTHS[index % SKELETON_WIDTHS.length]
  return (
    <li aria-hidden="true" className={rowClasses(fitColumn)}>
      <Skeleton className="size-12 rounded-control md:size-14" />
      <span className="flex flex-col">
        <SkeletonLine line={20} bar={12} width={widths[0]} className="lg:hidden" />
        <SkeletonLine width={widths[0]} className="max-lg:hidden" />
        <SkeletonLine line={18} bar={10} width={widths[1]} />
        {fitColumn && (
          <SkeletonLine line={18} bar={10} width={widths[2]} className="mt-1 lg:hidden" />
        )}
      </span>
      <Skeleton className="h-3 w-24 max-lg:hidden" />
      <Skeleton className="h-3 w-14 max-lg:hidden" />
      <span className="flex flex-col gap-1.5 max-lg:items-end">
        <Skeleton className="h-[18px] w-6 lg:w-7" />
        <Skeleton className="h-2 w-9 lg:hidden" />
      </span>
      {fitColumn && (
        <Skeleton className="h-7 rounded-full max-lg:hidden" style={{ width: widths[3] }} />
      )}
      <span />
    </li>
  )
}

/** Name, meta, phone fit line, fit pill */
const SKELETON_WIDTHS: [string, string, string, number][] = [
  ['56%', '40%', '60%', 176],
  ['72%', '46%', '52%', 150],
  ['48%', '36%', '64%', 212],
  ['62%', '44%', '56%', 176]
]
