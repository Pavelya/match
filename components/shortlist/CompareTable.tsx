'use client'

import Link from 'next/link'
import { Check, CircleAlert, ExternalLink, Info, Minus, X, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SaveToggle } from '@/components/ds/SaveToggle'
import { Select } from '@/components/ds/Select'
import { LoadingRegion, Skeleton } from '@/components/ds/Skeleton'
import { StatusBadge } from '@/components/ds/StatusBadge'
import { UniversityThumb } from '@/components/match/UniversityThumb'
import type { useShortlist } from '@/components/match/use-shortlist'
import type { ChipKind } from '@/lib/matching/match-status'
import { formatRate } from '@/lib/programs/ib-minimum'
import type { ShortlistItem } from '@/lib/shortlist/types'

/*
 * Programs from the shortlist side by side (rebranding 2.5, boards "D3.7 Compare table" and
 * "D3.7 Compare table · phone", approved 13 October 2026). From 768px a real table: a caption,
 * each program a column header and each label a row header, so a value is read with both ("IB
 * minimum, Economics, Finance and Data Science, 39, 1 point short"). Below 768px two programs,
 * each picked in a select, with each label above its two values; the same table, with its roles
 * spelled out, since a table drawn as a grid can lose them in Safari. Eight rows, in the order a
 * decision runs. Status words are text, never colour alone. Removing empties the bookmark and
 * keeps the column until the student leaves the page.
 */

type Shortlist = ReturnType<typeof useShortlist>

interface CompareProps {
  items: ShortlistItem[]
  /** "You have 38" */
  total: number
  /** The intake an earlier one is confirmed against: "Confirm the 2027 figures" */
  currentYear: number
  shortlist: Shortlist
}

type RowKey = 'fit' | 'minimum' | 'subjects' | 'country' | 'degree' | 'length' | 'intake' | 'link'

const ROWS: { key: RowKey; label: string; sub?: (total: number) => string }[] = [
  { key: 'fit', label: 'Your fit' },
  { key: 'minimum', label: 'IB minimum', sub: (total) => `You have ${total}` },
  { key: 'subjects', label: 'Subjects', sub: () => 'The grade each needs' },
  { key: 'country', label: 'Country' },
  { key: 'degree', label: 'Degree' },
  { key: 'length', label: 'Length' },
  { key: 'intake', label: 'Checked for' },
  // Its label is hidden on desktop, where the link names itself
  { key: 'link', label: 'Official page' }
]

/** Up to four programs, from 768px (D3.7) */
export function CompareTable({ items, total, currentYear, shortlist }: CompareProps) {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-card">
      <table className="w-full table-fixed border-collapse">
        <caption className="sr-only">{`Comparing ${items.length} programs from your shortlist`}</caption>
        <colgroup>
          {/* The label column narrows from 184 to 140 below 1024px */}
          <col className="w-[140px] lg:w-[184px]" />
          {items.map((item) => (
            <col key={item.id} />
          ))}
        </colgroup>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="px-5 py-4 max-lg:px-4">
              <span className="sr-only">Program</span>
            </th>
            {items.map((item) => (
              <th
                key={item.id}
                scope="col"
                aria-label={item.name}
                className="border-l border-border pt-4 pr-3 pb-[1.125rem] pl-5 text-left align-top font-normal"
              >
                <ColumnHead item={item} shortlist={shortlist} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, index) => (
            <tr key={row.key} className={cn(index > 0 && 'border-t border-border')}>
              <th scope="row" className="px-5 py-4 text-left align-top font-normal max-lg:px-4">
                {row.key === 'link' ? (
                  <span className="sr-only">{row.label}</span>
                ) : (
                  <RowLabel label={row.label} sub={row.sub?.(total)} />
                )}
              </th>
              {items.map((item) => (
                <td key={item.id} className="border-l border-border px-5 py-4 align-top">
                  <CompareValue row={row.key} item={item} currentYear={currentYear} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Two programs side by side, below 768px (D3.7 phone, decided 13 October 2026) */
export function ComparePair({
  items,
  pair,
  onPick,
  total,
  currentYear,
  shortlist
}: CompareProps & {
  /** The two programs' ids, Program 1 first */
  pair: readonly [string, string]
  onPick: (index: 0 | 1, id: string) => void
}) {
  const shown = pair.map((id) => items.find((item) => item.id === id) ?? items[0])
  return (
    <table role="table" className="block w-full">
      <caption className="sr-only">Comparing two programs from your shortlist</caption>
      <thead role="rowgroup" className="block">
        <tr role="row" className="grid grid-cols-2 gap-2.5">
          {shown.map((item, index) => (
            <th
              key={index}
              role="columnheader"
              scope="col"
              aria-label={item.name}
              className="flex min-w-0 flex-col gap-2.5 text-left align-top font-normal"
            >
              <Select
                native
                label={`Program ${index + 1}`}
                value={item.id}
                onChange={(event) => onPick(index as 0 | 1, event.target.value)}
              >
                {items.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Select>
              <span className="flex flex-col rounded-card border border-border bg-card pt-3 pr-1.5 pb-3.5 pl-3">
                <ColumnHead item={item} shortlist={shortlist} />
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody role="rowgroup" className="mt-5 flex flex-col gap-5">
        {ROWS.map((row) => (
          <tr key={row.key} role="row" className="grid grid-cols-2">
            <th
              role="rowheader"
              scope="row"
              className="col-span-2 mb-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-left font-normal"
            >
              <span className="text-body font-semibold">{row.label}</span>
              {row.sub && (
                <span className="text-small text-muted-foreground tabular-nums">
                  {row.sub(total)}
                </span>
              )}
            </th>
            {shown.map((item, index) => (
              <td
                key={index}
                role="cell"
                className={cn(
                  'min-w-0 border-y border-border bg-card p-3 align-top',
                  index === 0 ? 'rounded-l-card border-l' : 'rounded-r-card border-x'
                )}
              >
                <CompareValue row={row.key} item={item} currentYear={currentYear} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function RowLabel({ label, sub }: { label: string; sub?: string }) {
  return (
    <span className="flex flex-col">
      <span className="text-body font-semibold">{label}</span>
      {sub && <span className="text-small text-muted-foreground tabular-nums">{sub}</span>}
    </span>
  )
}

/** The program as every list shows it: photo or initials, Save, the name (the only link), the university */
function ColumnHead({ item, shortlist }: { item: ShortlistItem; shortlist: Shortlist }) {
  return (
    <>
      <span className="flex items-start justify-between gap-2">
        <UniversityThumb image={item.image} initials={item.initials} />
        <SaveToggle
          variant="icon"
          saved={shortlist.isSaved(item.id)}
          saving={shortlist.isSaving(item.id)}
          onToggle={() => shortlist.toggle({ id: item.id, name: item.name })}
          programName={`${item.name}, ${item.university}`}
          className="-mt-1 md:-mr-0.5"
        />
      </span>
      <span className="mt-2 flex min-w-0 flex-col pr-1.5 md:mt-3 md:pr-0">
        <Link
          href={`/programs/${item.id}`}
          className="w-fit rounded-chip text-[0.9375rem] leading-5 font-semibold break-words text-foreground underline-offset-3 hover:underline md:text-[1.0625rem] md:leading-6"
        >
          {item.name}
        </Link>
        <span className="text-small text-muted-foreground">{item.university}</span>
      </span>
    </>
  )
}

const MARK: Record<ChipKind | 'caution', { Icon: LucideIcon; classes: string }> = {
  met: { Icon: Check, classes: 'font-semibold text-ok' },
  close: { Icon: Minus, classes: 'font-semibold text-close' },
  gap: { Icon: X, classes: 'font-semibold text-gap' },
  info: { Icon: Info, classes: 'text-muted-foreground' },
  caution: { Icon: CircleAlert, classes: 'font-medium text-close' }
}

/** A status line under a value: "1 point short", "Not one of your countries" */
function Mark({ kind, children }: { kind: keyof typeof MARK; children: string }) {
  const { Icon, classes } = MARK[kind]
  return (
    <span className={cn('flex items-start gap-1.5 text-small', classes)}>
      <Icon aria-hidden="true" size={14} strokeWidth={2.4} className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </span>
  )
}

const SUBJECT: Record<ChipKind, { Icon: LucideIcon; icon: string; text: string; said: string }> = {
  met: { Icon: Check, icon: 'text-ok', text: 'text-foreground', said: 'Met: ' },
  close: { Icon: Minus, icon: 'text-close', text: 'font-medium text-close', said: 'Close: ' },
  gap: { Icon: X, icon: 'text-gap', text: 'font-medium text-gap', said: 'Missing: ' },
  info: { Icon: Info, icon: 'text-muted-foreground', text: 'text-muted-foreground', said: '' }
}

/** The subjects in the match card's words (D3.1), met in ink with a green tick */
function Subjects({ subjects }: { subjects: NonNullable<ShortlistItem['fit']>['subjects'] }) {
  const listed = subjects.length > 0 ? subjects : [{ kind: 'info', label: 'No named subjects' }]
  return (
    <ul className="flex flex-col gap-1.5 md:gap-2">
      {listed.map(({ kind, label }) => {
        const { Icon, icon, text, said } = SUBJECT[kind as ChipKind]
        return (
          <li
            key={label}
            className={cn(
              'flex items-start gap-1.5 text-small tabular-nums md:gap-2 md:text-[0.875rem] md:leading-5',
              text
            )}
          >
            <Icon
              aria-hidden="true"
              size={14}
              strokeWidth={2.6}
              className={cn('mt-0.5 size-[13px] shrink-0 md:mt-[3px] md:size-3.5', icon)}
            />
            <span>
              {said && <span className="sr-only">{said}</span>}
              {label}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

/** A value: 15px, 20/24 line on a phone and desktop */
const VALUE = 'text-body tabular-nums max-md:leading-5'
const NOTE = 'text-small text-muted-foreground tabular-nums'

function CompareValue({
  row,
  item,
  currentYear
}: {
  row: RowKey
  item: ShortlistItem
  currentYear: number
}) {
  const { fit } = item
  switch (row) {
    case 'fit':
      return fit ? (
        <StatusBadge status={fit.status} className="rounded-[0.875rem] py-1 max-md:items-start">
          <span className="min-w-0">{fit.badge}</span>
        </StatusBadge>
      ) : null
    case 'minimum':
      return (
        <span className="flex flex-col items-start gap-1">
          {item.minIBPoints !== null ? (
            <>
              <span className="text-[1.25rem] leading-7 font-semibold tabular-nums">
                {item.minIBPoints}
              </span>
              {fit?.points && <Mark kind={fit.points.kind}>{fit.points.text}</Mark>}
            </>
          ) : (
            <>
              <span className="text-body font-semibold text-muted-foreground">None</span>
              <span className={NOTE}>
                {item.admitRate === null ? (
                  'Holistic admission'
                ) : (
                  <>
                    Admits {formatRate(item.admitRate)}
                    <span className="sr-only"> of first-year applicants</span>
                  </>
                )}
              </span>
            </>
          )}
        </span>
      )
    case 'subjects':
      return fit ? <Subjects subjects={fit.subjects} /> : null
    case 'country':
      return (
        <span className="flex flex-col items-start gap-1">
          <span className={VALUE}>{item.country}</span>
          {item.city && <span className={NOTE}>{item.city}</span>}
          {item.notYourCountry && <Mark kind="info">Not one of your countries</Mark>}
        </span>
      )
    case 'degree':
      return <span className={VALUE}>{item.degree}</span>
    case 'length':
      return <span className={VALUE}>{item.length}</span>
    case 'intake':
      return (
        <span className="flex flex-col items-start gap-1">
          {item.intake ? (
            <>
              <span className={VALUE}>{item.intake.year} entry</span>
              {item.intake.earlier && (
                <Mark kind="caution">
                  {`An earlier intake. Confirm the ${currentYear} figures before you apply.`}
                </Mark>
              )}
            </>
          ) : (
            <>
              <span className={VALUE}>Not checked yet</span>
              <Mark kind="caution">Confirm the requirements before you apply.</Mark>
            </>
          )}
        </span>
      )
    case 'link':
      return item.programUrl ? (
        <a
          href={item.programUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-chip text-body font-semibold text-primary underline underline-offset-3 hover:text-brand-hover max-md:-my-2.5 max-md:min-h-11 max-md:leading-5 md:min-h-6"
        >
          <span>
            Official<span className="max-md:hidden"> program</span> page
          </span>
          <ExternalLink aria-hidden="true" size={16} strokeWidth={2} className="shrink-0" />
          <span className="sr-only">{` for ${item.name} (opens in a new tab)`}</span>
        </a>
      ) : null
  }
}

/** The table's shape while the shortlist loads (D3.7): the head and five rows */
export function CompareSkeleton() {
  const columns =
    'grid grid-cols-[140px_repeat(4,minmax(0,1fr))] lg:grid-cols-[184px_repeat(4,minmax(0,1fr))]'
  return (
    <LoadingRegion
      label="Loading your shortlist"
      className="overflow-hidden rounded-card border border-border bg-card"
    >
      <div className={cn(columns, 'border-b border-border')}>
        <span />
        {HEAD_WIDTHS.map(([name, university], i) => (
          <span
            key={i}
            className="flex flex-col gap-3 border-l border-border px-5 pt-4 pb-[1.125rem]"
          >
            <Skeleton className="size-14 rounded-control" />
            <span className="flex flex-col gap-2">
              <Skeleton className="h-3.5" style={{ width: name }} />
              <Skeleton className="h-2.5" style={{ width: university }} />
            </span>
          </span>
        ))}
      </div>
      {ROW_WIDTHS.map(({ label, cells }, i) => (
        <div key={i} className={cn(columns, i > 0 && 'border-t border-border')}>
          <span className="px-5 py-[1.375rem] max-lg:px-4">
            <Skeleton className="h-3" style={{ width: label }} />
          </span>
          {cells.map((width, j) => (
            <span key={j} className="border-l border-border px-5 py-[1.375rem]">
              <Skeleton className="h-3 max-w-full" style={{ width }} />
            </span>
          ))}
        </div>
      ))}
    </LoadingRegion>
  )
}

/** Name and university in each head */
const HEAD_WIDTHS = [
  ['80%', '60%'],
  ['90%', '50%'],
  ['60%', '64%'],
  ['84%', '56%']
]

/** Label, then four cells: the fit, the minimum, the subjects, the country, the degree */
const ROW_WIDTHS = [
  { label: 70, cells: [150, 190, 150, 120] },
  { label: 84, cells: [40, 28, 28, 28] },
  { label: 64, cells: [120, 160, 130, 170] },
  { label: 60, cells: [100, 110, 70, 70] },
  { label: 56, cells: [130, 130, 130, 130] }
]
