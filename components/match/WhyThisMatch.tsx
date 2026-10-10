'use client'

import { useId, useState, type ReactNode } from 'react'
import Link from 'next/link'
import {
  ChevronDown,
  CircleAlert,
  CircleCheck,
  CircleMinus,
  CircleX,
  Info,
  type LucideIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ChipKind } from '@/lib/matching/match-status'
import type { WhyRow, WhyThisMatch as WhyData } from '@/lib/matching/match-why'

/*
 * "Why this match", opened inside its card (rebranding 2.2, canvas board "D3.2 Why this match",
 * approved 10 October 2026). Every requirement against the student's grades, in the D3.4
 * checklist at 14px: a table on desktop, a list on a phone. Then what would close the gap, the
 * caution line for an older intake, field and country, and the fit score with its working: the
 * only place the percentage appears. Everything is in the match the list already loaded, so
 * opening it fetches nothing. Replaces MatchBreakdown's dialog.
 */

const STATUS: Record<ChipKind, { Icon: LucideIcon; label: string; text: string; soft: string }> = {
  met: { Icon: CircleCheck, label: 'Met', text: 'text-ok', soft: 'bg-ok-soft' },
  close: { Icon: CircleMinus, label: 'Close', text: 'text-close', soft: 'bg-close-soft' },
  gap: { Icon: CircleX, label: 'Missing', text: 'text-gap', soft: 'bg-gap-soft' },
  info: { Icon: Info, label: 'Note', text: 'text-muted-foreground', soft: 'bg-muted' }
}

/** The student's value takes the status colour; a note's stays ink. */
const YOU: Record<ChipKind, string> = {
  met: 'text-ok',
  close: 'text-close',
  gap: 'text-gap',
  info: 'text-foreground'
}

interface WhyThisMatchProps {
  id: string
  programId: string
  programName: string
  why: WhyData
}

export function WhyThisMatch({ id, programId, programName, why }: WhyThisMatchProps) {
  const { note, intake, fit } = why
  const noteStatus = STATUS[note.kind]

  return (
    <div
      id={id}
      role="region"
      aria-label={`Why this match: ${programName}`}
      className={cn(
        'grid gap-3 border-t border-border pt-3 md:grid-cols-[minmax(0,1fr)_272px] md:gap-5 md:pt-4',
        // Opens with a 240ms fade; the height doesn't animate (only transform and opacity do)
        'transition-opacity duration-240 ease-standard starting:opacity-0 motion-reduce:duration-240!'
      )}
    >
      <div className="flex min-w-0 flex-col gap-3">
        <RequirementTable rows={why.rows} />
        <RequirementList rows={why.rows} />

        <p
          className={cn(
            'flex items-start gap-2.5 rounded-[0.75rem] border border-transparent px-3 py-3 text-[0.875rem]/[1.3125rem] md:px-3.5',
            noteStatus.soft
          )}
        >
          <noteStatus.Icon
            aria-hidden="true"
            size={18}
            strokeWidth={2}
            className={cn('mt-px shrink-0 max-md:hidden', noteStatus.text)}
          />
          <span>{note.text}</span>
        </p>

        {intake && (
          <p className="flex items-start gap-2.5 rounded-[0.75rem] border border-transparent bg-close-soft px-3 py-3 text-[0.875rem]/[1.3125rem] md:px-3.5">
            <CircleAlert
              aria-hidden="true"
              size={18}
              strokeWidth={2}
              className="mt-px shrink-0 text-close max-md:hidden"
            />
            <span>
              {intake.status === 'older' ? (
                <>
                  Checked for <strong>{intake.entryYear} entry</strong>. Confirm the{' '}
                  {intake.currentYear} figures{' '}
                </>
              ) : (
                <>These requirements haven’t been checked for a recent intake yet. Confirm them </>
              )}
              {why.programUrl ? (
                <>
                  on the{' '}
                  <a href={why.programUrl} className="text-primary underline underline-offset-3">
                    university’s page
                  </a>
                </>
              ) : (
                'with the university'
              )}{' '}
              before you apply.
            </span>
          </p>
        )}

        <ul aria-label="Field and country" className="flex flex-col gap-2 md:grid md:grid-cols-2">
          {[
            { what: 'Field', ...why.field },
            { what: 'Country', ...why.country }
          ].map((pref) => {
            const status = STATUS[pref.kind]
            return (
              <li
                key={pref.what}
                className="flex items-start gap-2 text-[0.875rem]/5 md:rounded-[0.625rem] md:border md:border-border md:px-3 md:py-2.5"
              >
                <status.Icon
                  role="img"
                  aria-label={status.label}
                  size={18}
                  strokeWidth={2}
                  className={cn('mt-px shrink-0', status.text)}
                />
                <span className="flex flex-col max-md:block">
                  <span className="text-label text-muted-foreground max-md:hidden">
                    {pref.what}
                  </span>
                  <span className="text-muted-foreground md:hidden">{pref.what}: </span>
                  {pref.text}
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-2.5 self-start rounded-[0.75rem] bg-muted p-3.5 md:gap-3 md:p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-label text-muted-foreground">Fit score</span>
          <span className="font-[family-name:var(--font-newsreader)] text-[2rem]/9 font-medium tabular-nums md:text-[2.5rem]/11">
            {fit.score}%
          </span>
        </div>
        {fit.parts.map((part) => (
          <div key={part.label} className="flex flex-col gap-1">
            <div className="flex justify-between gap-2 text-small font-normal tabular-nums">
              <span>
                <strong className="font-semibold">{part.label}</strong>{' '}
                <span className="text-muted-foreground">{part.calc}</span>
              </span>
              <span className="font-semibold">{part.value}</span>
            </div>
            <div aria-hidden="true" className="h-1.5 overflow-hidden rounded-full bg-border">
              <div
                className="h-1.5 rounded-full bg-primary"
                style={{ width: `${part.percent}%` }}
              />
            </div>
          </div>
        ))}
        <p className="border-t border-border pt-2.5 text-small/5 font-normal tabular-nums">
          {fit.sentence}
        </p>
        <p className="text-small/5 font-normal text-muted-foreground">
          Fit orders programs within a status. It isn’t a chance of admission.{' '}
          <Link
            href="/how-it-works"
            className="font-semibold text-primary underline-offset-3 hover:underline"
          >
            How ranking works
          </Link>
        </p>
      </div>

      <Link
        href={`/programs/${programId}`}
        className="inline-flex min-h-11 items-center justify-self-start text-[0.875rem]/5 font-semibold text-primary underline-offset-3 hover:underline md:col-span-2 md:min-h-0"
      >
        Open the program page
      </Link>
    </div>
  )
}

/** Desktop: a real table, status first and "You" in the status colour. */
function RequirementTable({ rows }: { rows: WhyRow[] }) {
  return (
    <table className="w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-[0.75rem] border border-border text-[0.875rem]/5 max-md:hidden">
      <caption className="sr-only">Requirements against your grades</caption>
      <colgroup>
        <col className="w-12" />
        <col />
        <col className="w-28" />
        <col className="w-22" />
      </colgroup>
      <thead>
        <tr className="bg-muted text-left text-label text-muted-foreground">
          <th scope="col" className="py-2.5 pl-3.5">
            <span className="sr-only">Status</span>
          </th>
          <th scope="col" className="py-2.5 pr-3">
            Requirement
          </th>
          <th scope="col" className="py-2.5 pr-3">
            Needed
          </th>
          <th scope="col" className="py-2.5 pr-3.5">
            You
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          const status = STATUS[row.kind]
          return (
            <tr key={i} className="align-top">
              <td className="border-t border-border py-[11px] pl-3.5">
                <status.Icon
                  role="img"
                  aria-label={status.label}
                  size={20}
                  strokeWidth={2}
                  className={status.text}
                />
              </td>
              <td className="border-t border-border py-[11px] pr-3">
                <RequirementName row={row} />
              </td>
              <td className="border-t border-border py-[11px] pr-3 tabular-nums">{row.needed}</td>
              <td
                className={cn(
                  'border-t border-border py-[11px] pr-3.5 font-semibold tabular-nums',
                  YOU[row.kind]
                )}
              >
                {row.you ?? 'Not taken'}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/** A phone: each requirement on its own row, "Needs HL 7 · you HL 6" under its name. */
function RequirementList({ rows }: { rows: WhyRow[] }) {
  return (
    <ul
      aria-label="Requirements against your grades"
      className="overflow-hidden rounded-[0.75rem] border border-border md:hidden"
    >
      {rows.map((row, i) => {
        const status = STATUS[row.kind]
        const [needs, you] = phoneLine(row)
        return (
          <li
            key={i}
            className="grid grid-cols-[20px_minmax(0,1fr)] items-start gap-x-2.5 border-t border-border px-3 py-[11px] text-[0.875rem]/5 first:border-t-0"
          >
            <status.Icon
              role="img"
              aria-label={status.label}
              size={20}
              strokeWidth={2}
              className={status.text}
            />
            <span className="flex min-w-0 flex-col gap-0.5">
              <RequirementName row={row}>
                <span className="text-small font-normal text-muted-foreground tabular-nums">
                  {needs}
                  {you && <strong className={cn('font-semibold', YOU[row.kind])}>{you}</strong>}
                </span>
              </RequirementName>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

/** "Needs HL 7 · " then "you HL 6"; "No minimum · you 38"; "None named" */
function phoneLine(row: WhyRow): [string, string] {
  if (row.type === 'none') return ['None named', '']
  if (row.needed === 'No minimum') return ['No minimum · ', `you ${row.you}`]
  return [`Needs ${row.needed} · `, row.you === null ? 'not taken' : `you ${row.you}`]
}

/** The requirement's name, why it falls short, the other courses, and "All N options". */
function RequirementName({ row, children }: { row: WhyRow; children?: ReactNode }) {
  return (
    <span className="flex min-w-0 flex-col gap-[3px]">
      <span className="font-medium">{row.name}</span>
      {children}
      {row.reason && (
        <span className={cn('text-small font-normal', STATUS[row.kind].text)}>{row.reason}</span>
      )}
      {row.detail && (
        <span className="text-small font-normal text-muted-foreground">{row.detail}</span>
      )}
      {row.options && <AllOptions options={row.options} />}
    </span>
  )
}

function AllOptions({ options }: { options: NonNullable<WhyRow['options']> }) {
  const [open, setOpen] = useState(false)
  const listId = useId()
  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((o) => !o)}
        className="-my-1.5 inline-flex h-8 items-center gap-1 self-start rounded-chip text-small font-semibold text-primary underline-offset-3 hover:underline"
      >
        All {options.count} options
        <ChevronDown
          aria-hidden="true"
          size={13}
          strokeWidth={2.2}
          className={cn('transition-transform duration-180 ease-standard', open && 'rotate-180')}
        />
      </button>
      {open && (
        <dl
          id={listId}
          className="mt-1 flex flex-col gap-2 rounded-[0.625rem] border border-border bg-background px-3 py-2.5"
        >
          {options.groups.map((group) => (
            <div key={group.label} className="flex flex-col gap-0.5">
              <dt className="text-label text-muted-foreground tabular-nums">{group.label}</dt>
              <dd className="text-small/[1.1875rem] font-normal">{group.courses}</dd>
            </div>
          ))}
        </dl>
      )}
    </>
  )
}
