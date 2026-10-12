import Link from 'next/link'
import { ChevronDown, CircleAlert, CircleCheck, ListChecks } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  REQUIREMENT_STATUS as STATUS,
  YOU_TEXT as YOU
} from '@/components/match/requirement-status'
import type { WhyRow } from '@/lib/matching/match-why'
import type { RequirementsCheck } from '@/lib/programs/entry-year'

/*
 * A program's entry requirements (rebranding 2.4, board "D3.4 Requirement checklist" at the
 * program page's size, approved 10 October 2026). Always listed, the minimum points too, signed
 * out as well (audit 4.2: the block could render empty). With the student's grades, a status and
 * a "You" column; without them, two columns ending with the line that leads to sign-in or to
 * Academic, or none when there is nothing to check. A table from 768px, a list on a phone. A
 * group of more than eight courses lists them under "All N options", a details element, so the
 * text is in the server HTML. The entry-year line goes under it.
 */

interface RequirementChecklistProps {
  rows: WhyRow[]
  /** Status and "You" columns: signed in with grades */
  graded: boolean
  /** "Sign in and add your grades to check these", "Add your grades to check these" */
  prompt: { text: string; href: string } | null
  check: RequirementsCheck
  /** The intake students apply for now: 2027 in October 2026 */
  currentYear: number
  programUrl: string | null
}

export function RequirementChecklist({
  rows,
  graded,
  prompt,
  check,
  currentYear,
  programUrl
}: RequirementChecklistProps) {
  return (
    <>
      <div className="overflow-hidden rounded-card border border-border bg-card shadow-raised">
        <RequirementTable rows={rows} graded={graded} />
        <RequirementList rows={rows} graded={graded} />
        {prompt && (
          <p className="flex items-center gap-2.5 border-t border-border bg-brand-soft px-3.5 py-3.25 text-body/[1.375rem] text-brand-ink md:px-4.5 md:py-3.5">
            <ListChecks
              aria-hidden="true"
              size={20}
              strokeWidth={2}
              className="shrink-0 max-md:hidden"
            />
            <Link
              href={prompt.href}
              className="rounded-chip font-semibold text-brand-ink underline underline-offset-3"
            >
              {prompt.text}
            </Link>
          </p>
        )}
      </div>
      <EntryYear check={check} currentYear={currentYear} programUrl={programUrl} />
    </>
  )
}

/** From 768px: a real table, the status first and "You" in the status colour. */
function RequirementTable({ rows, graded }: { rows: WhyRow[]; graded: boolean }) {
  const cell = 'border-t border-border py-3.5 align-top'
  return (
    <table className="w-full table-fixed border-separate border-spacing-0 text-[0.9375rem]/[1.375rem] max-md:hidden">
      <caption className="sr-only">
        {graded ? 'Entry requirements against your grades' : 'Entry requirements'}
      </caption>
      <colgroup>
        {graded && <col className="w-[60px]" />}
        <col />
        <col className={graded ? 'w-[134px]' : 'w-[158px]'} />
        {graded && <col className="w-[114px]" />}
      </colgroup>
      <thead>
        <tr className="bg-muted text-left text-label text-muted-foreground">
          {graded && (
            <th scope="col" className="py-2.75 pl-4.5">
              <span className="sr-only">Status</span>
            </th>
          )}
          <th scope="col" className={cn('py-2.75 pr-3.5', !graded && 'pl-4.5')}>
            Requirement
          </th>
          <th scope="col" className={cn('py-2.75', graded ? 'pr-3.5' : 'pr-4.5')}>
            Needed
          </th>
          {graded && (
            <th scope="col" className="py-2.75 pr-4.5">
              You
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          const status = STATUS[row.kind]
          return (
            <tr key={i}>
              {graded && (
                <td className={cn(cell, 'pl-4.5')}>
                  <status.Icon
                    role="img"
                    aria-label={status.label}
                    size={22}
                    strokeWidth={2}
                    className={status.text}
                  />
                </td>
              )}
              <td className={cn(cell, 'pr-3.5', !graded && 'pl-4.5')}>
                <RequirementName row={row} graded={graded} />
              </td>
              <td className={cn(cell, 'tabular-nums', graded ? 'pr-3.5' : 'pr-4.5')}>
                {row.needed}
              </td>
              {graded && (
                <td className={cn(cell, 'pr-4.5 font-semibold tabular-nums', YOU[row.kind])}>
                  {row.you ?? 'Not taken'}
                </td>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/** A phone: each requirement on its own row, "Needs HL 6 · you SL 6" under its name. */
function RequirementList({ rows, graded }: { rows: WhyRow[]; graded: boolean }) {
  return (
    <ul
      aria-label={graded ? 'Entry requirements against your grades' : 'Entry requirements'}
      className="md:hidden"
    >
      {rows.map((row, i) => {
        const status = STATUS[row.kind]
        const [needs, you] = phoneLine(row, graded)
        return (
          <li
            key={i}
            className={cn(
              'grid items-start gap-x-2.5 border-t border-border px-3.5 py-3.25 text-[0.9375rem]/[1.375rem] first:border-t-0',
              graded ? 'grid-cols-[20px_minmax(0,1fr)]' : 'grid-cols-1'
            )}
          >
            {graded && (
              <status.Icon
                role="img"
                aria-label={status.label}
                size={20}
                strokeWidth={2}
                className={cn('mt-px', status.text)}
              />
            )}
            <RequirementName row={row} graded={graded}>
              <span className="text-[0.8125rem]/[1.1875rem] text-muted-foreground tabular-nums">
                {needs}
                {you && <strong className={cn('font-semibold', YOU[row.kind])}>{you}</strong>}
              </span>
            </RequirementName>
          </li>
        )
      })}
    </ul>
  )
}

/** "Needs HL 6 · " then "you SL 6"; "No minimum · you 38"; "None named"; signed out "Needs 37" */
function phoneLine(row: WhyRow, graded: boolean): [string, string] {
  if (row.type === 'none') return ['None named', '']
  if (!graded) return [row.needed === 'No minimum' ? row.needed : `Needs ${row.needed}`, '']
  if (row.needed === 'No minimum') return ['No minimum · ', `you ${row.you}`]
  return [`Needs ${row.needed} · `, row.you === null ? 'not taken' : `you ${row.you}`]
}

/** The requirement's name, why it falls short, the other courses, and "All N options". */
function RequirementName({
  row,
  graded,
  children
}: {
  row: WhyRow
  graded: boolean
  children?: React.ReactNode
}) {
  const sub = 'text-[0.8125rem]/[1.1875rem] font-normal'
  return (
    <span className="flex min-w-0 flex-col gap-0.75 break-words">
      <span className="font-medium">{row.name}</span>
      {children}
      {graded && row.reason && <span className={cn(sub, STATUS[row.kind].text)}>{row.reason}</span>}
      {row.detail && <span className={cn(sub, 'text-muted-foreground')}>{row.detail}</span>}
      {row.options && (
        <details className="group mt-0.5">
          <summary className="flex min-h-8 w-fit cursor-pointer list-none items-center gap-1 rounded-chip text-small font-semibold text-primary [&::-webkit-details-marker]:hidden">
            All {row.options.count} options
            <ChevronDown
              aria-hidden="true"
              size={13}
              strokeWidth={2.2}
              className="transition-transform duration-180 ease-standard group-open:rotate-180"
            />
          </summary>
          <dl className="mt-1 flex flex-col gap-2 rounded-[0.625rem] border border-border bg-background px-3 py-2.5">
            {row.options.groups.map((group) => (
              <div key={group.label} className="flex flex-col gap-0.5">
                <dt className="text-label text-muted-foreground tabular-nums">{group.label}</dt>
                <dd className={sub}>{group.courses}</dd>
              </div>
            ))}
          </dl>
        </details>
      )}
    </span>
  )
}

/**
 * The intake the requirements were checked for: a plain line when it is this cycle's, the
 * caution line when it is older or unchecked, linking to the program's own page.
 */
function EntryYear({
  check,
  currentYear,
  programUrl
}: {
  check: RequirementsCheck
  currentYear: number
  programUrl: string | null
}) {
  if (check.status === 'current') {
    return (
      <p className="flex items-start gap-2.5 text-[0.875rem]/[1.3125rem] text-muted-foreground">
        <CircleCheck
          aria-hidden="true"
          size={18}
          strokeWidth={2}
          className="mt-px shrink-0 text-ok"
        />
        Requirements checked for {check.entryYear} entry.
      </p>
    )
  }
  const where = programUrl ? (
    <>
      on the{' '}
      <a href={programUrl} className="text-primary underline underline-offset-3">
        university’s page
      </a>
    </>
  ) : (
    'with the university'
  )
  return (
    <p className="flex items-start gap-2.5 rounded-[0.75rem] border border-transparent bg-close-soft px-3.5 py-3 text-[0.875rem]/[1.3125rem]">
      <CircleAlert
        aria-hidden="true"
        size={18}
        strokeWidth={2}
        className="mt-px shrink-0 text-close"
      />
      <span>
        {check.status === 'older' ? (
          <>
            These requirements were checked for {check.entryYear} entry. Confirm the {currentYear}{' '}
            figures {where} before you apply.
          </>
        ) : (
          <>
            These requirements haven’t been checked for a recent intake yet. Confirm them {where}{' '}
            before you apply.
          </>
        )}
      </span>
    </p>
  )
}
