'use client'

import { useMemo, useState, type ReactNode, type Ref } from 'react'
import { Earth, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ds/Button'
import { CheckboxRow, CheckboxTile } from '@/components/ds/Choice'
import { SearchInput } from '@/components/ds/SearchInput'
import { focusEditorTarget } from '@/components/profile-editor/ProfileEditor'
import { filterCountries } from '@/lib/student/country-filter'
import { MAX_FIELDS } from '@/lib/student/draft'
import type { EditorFooter } from '@/lib/student/subject-editor'
import { fieldIcon } from './field-icons'

/*
 * The parts of first run's steps (rebranding 3.1 and 3.2; boards "D2.6 Checkbox rows and grid",
 * "D4.3", "D4.4" and "D4.5 First run", approved 13 and 14 October 2026), which Academic also
 * opens one at a time after first run (3.3, "D4.11 Academic profile", approved 18 October 2026):
 * the question, the fields, the countries, and the footer fixed to the bottom of the screen.
 */

/** The step's question, which takes focus when a step opens, and the line under it */
export function StepQuestion({
  question,
  sub,
  headingRef
}: {
  question: string
  sub: string
  headingRef: Ref<HTMLHeadingElement>
}) {
  return (
    <div className="mt-1 flex flex-col gap-1.5">
      <h2 ref={headingRef} id={QUESTION_ID} tabIndex={-1} className="text-h1 outline-none">
        {question}
      </h2>
      <p className="text-body text-muted-foreground md:text-body-l">{sub}</p>
    </div>
  )
}

const QUESTION_ID = 'step-question'
const STATUS_ID = 'step-status'

/** Step 1: up to five fields, two to a row on desktop. At five, the others refuse and say why. */
export function InterestsChoice({
  fields,
  chosen,
  onChange,
  onRefused
}: {
  fields: { id: string; name: string; description: string }[]
  chosen: string[]
  onChange: (next: string[]) => void
  onRefused: (message: string) => void
}) {
  const full = chosen.length >= MAX_FIELDS
  return (
    <fieldset
      aria-labelledby={QUESTION_ID}
      className="grid min-w-0 grid-cols-1 gap-2 md:grid-cols-2"
    >
      {fields.map((field) => {
        const on = chosen.includes(field.id)
        return (
          <CheckboxRow
            key={field.id}
            id={`field-${field.id}`}
            name={field.name}
            description={field.description || undefined}
            icon={fieldIcon(field.name)}
            checked={on}
            limited={!on && full}
            onRefused={() =>
              onRefused(`You can choose up to ${MAX_FIELDS}. Untick one to choose ${field.name}.`)
            }
            onCheckedChange={(checked) =>
              onChange(
                checked
                  ? chosen.includes(field.id)
                    ? chosen
                    : [...chosen, field.id]
                  : chosen.filter((id) => id !== field.id)
              )
            }
          />
        )
      })}
    </fieldset>
  )
}

/**
 * Step 2: "Open to anywhere", which hides the grid, or any number of countries, four tiles to a
 * row on desktop and two on a phone. The filter hides tiles, never choices.
 */
export function CountriesChoice({
  countries,
  chosen,
  anywhere,
  onChange,
  onAnywhereChange
}: {
  countries: { id: string; name: string }[]
  chosen: string[]
  anywhere: boolean
  onChange: (next: string[]) => void
  onAnywhereChange: (anywhere: boolean) => void
}) {
  const [filter, setFilter] = useState('')
  const shown = useMemo(() => filterCountries(countries, filter), [countries, filter])

  return (
    <fieldset aria-labelledby={QUESTION_ID} className="flex min-w-0 flex-col gap-3">
      <CheckboxRow
        id="anywhere"
        name="Open to anywhere"
        description={`Programs in all ${countries.length} countries`}
        icon={Earth}
        checked={anywhere}
        onCheckedChange={onAnywhereChange}
        className="md:max-w-[27rem]"
      />
      {anywhere ? (
        <p className="text-body text-muted-foreground">
          You’ll see programs in all {countries.length} countries. Untick it to choose countries;
          the ones you had come back.
        </p>
      ) : (
        <>
          <SearchInput
            value={filter}
            onValueChange={setFilter}
            aria-label="Filter countries"
            placeholder="Filter countries"
            clearLabel="Clear filter"
            className="md:h-11 md:max-w-[27rem]"
          />
          <span role="status" className="sr-only">
            {filter.trim() ? (shown.length === 1 ? '1 country' : `${shown.length} countries`) : ''}
          </span>
          {shown.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {shown.map((country) => (
                <CheckboxTile
                  key={country.id}
                  id={`country-${country.id}`}
                  name={country.name}
                  checked={chosen.includes(country.id)}
                  onCheckedChange={(checked) =>
                    onChange(
                      checked
                        ? chosen.includes(country.id)
                          ? chosen
                          : [...chosen, country.id]
                        : chosen.filter((id) => id !== country.id)
                    )
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-start gap-0.5 rounded-[0.75rem] border border-border bg-card px-5 pt-4.5 pb-3">
              <p className="text-body font-semibold">No country matches “{filter.trim()}”</p>
              <p className="text-body text-muted-foreground">
                IB Match has programs in {countries.length} countries.
              </p>
              <button
                type="button"
                onClick={() => setFilter('')}
                className="-ml-1 h-11 rounded-chip px-1 text-body font-semibold text-primary underline underline-offset-3 pressed:text-brand-ink pressed:underline"
              >
                Clear filter
              </button>
            </div>
          )}
        </>
      )}
    </fieldset>
  )
}

/** What the footer of steps 1 and 2 says */
export interface StepStatus {
  text: string
  /** The bold number before the text: "3" of " of 5 chosen" */
  count?: number
  /** Under it: "No changes to save yet", "Not saved yet" */
  detail?: string
  /** Why a box didn't tick, with Info */
  notice?: boolean
  /** In ink rather than grey */
  strong?: boolean
}

/** The two lines of a footer's status; a stop between them, so they aren't read as one */
function StatusLines({ first, second }: { first: ReactNode; second: string | null }) {
  return (
    <span className="flex min-w-0 flex-col">
      <span className="text-[0.9375rem]/5">{first}</span>
      {second && (
        <span className="text-small text-muted-foreground">
          <span className="sr-only">. </span>
          {second}
        </span>
      )}
    </span>
  )
}

/**
 * The footer of steps 1 and 2 (D2.6): the count, or what the button needs, or why a box didn't
 * tick, then Continue, which saves the step, or Save changes after first run (D4.11).
 */
export function StepFooter({
  status,
  ready,
  saving,
  label,
  onPress
}: {
  status: StepStatus
  ready: boolean
  saving: boolean
  label: string
  onPress: () => void
}) {
  return (
    <StepFooterFrame
      status={
        <p
          role="status"
          id={STATUS_ID}
          className={cn(
            'flex min-w-0 items-start gap-2 tabular-nums',
            status.notice || status.strong ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {status.notice && (
            <Info aria-hidden="true" size={18} strokeWidth={2} className="mt-px shrink-0" />
          )}
          <StatusLines
            first={
              <>
                {status.count !== undefined && (
                  <strong className="font-semibold text-foreground">{status.count}</strong>
                )}
                {status.text}
              </>
            }
            second={status.detail ?? null}
          />
        </p>
      }
      button={
        <Button
          disabled={!ready}
          loading={saving}
          loadingLabel="Saving…"
          aria-describedby={ready ? undefined : STATUS_ID}
          onClick={onPress}
          className="h-12 min-w-30 px-6 text-[1rem] md:h-11 md:min-w-32 md:px-5 md:text-body"
        >
          {label}
        </Button>
      }
    />
  )
}

/**
 * Step 3's footer (D3.6): the count over "So far", the one thing left, or the total; a failed
 * check in the line's place, with Info. The button is aria-disabled and described by the line
 * until it can go on; pressing it then reads the line again and moves focus to what is missing.
 */
export function SubjectsFooter({
  footer,
  label,
  saving,
  onFinish
}: {
  footer: EditorFooter
  label: string
  saving: boolean
  onFinish: () => void
}) {
  const { line } = footer
  const key = JSON.stringify(line)
  // A press that couldn't go on: the line it was refused on, and how many times
  const [refusedOn, setRefusedOn] = useState<{ key: string; times: number } | null>(null)
  const pressed = refusedOn !== null && refusedOn.key === key
  const times = pressed ? refusedOn.times : 0

  let first: ReactNode
  let second: string | null = null
  if (line.kind === 'count') {
    first = (
      <>
        <strong className="font-semibold text-foreground">{line.done}</strong> of 6 subjects
      </>
    )
    second = line.soFar
  } else if (line.kind === 'left') {
    first = line.text
    second = line.soFar
  } else if (line.kind === 'total') {
    first = (
      <>
        Total <strong className="font-semibold">{line.total}</strong> points
      </>
    )
    second = line.detail
  } else {
    first = line.text
  }
  const notice = line.kind === 'reason' || pressed

  return (
    <StepFooterFrame
      status={
        <p
          role="status"
          id={STATUS_ID}
          className={cn(
            'flex min-w-0 items-start gap-2 tabular-nums',
            notice || line.kind === 'total' ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {notice && (
            <Info aria-hidden="true" size={18} strokeWidth={2} className="mt-px shrink-0" />
          )}
          {/* A new node each press, so the line is read out again */}
          <span key={times} className="contents">
            <StatusLines first={first} second={second} />
          </span>
        </p>
      }
      button={
        <Button
          disabled={!footer.ready}
          loading={saving}
          loadingLabel="Saving…"
          aria-describedby={footer.ready ? undefined : STATUS_ID}
          onClick={onFinish}
          onRefused={() => {
            setRefusedOn({ key, times: times + 1 })
            if (footer.target) focusEditorTarget(footer.target)
          }}
          className="h-12 min-w-30 px-6 text-[1rem] md:h-11 md:min-w-32 md:px-5 md:text-body"
        >
          {label}
        </Button>
      }
    />
  )
}

/** The bar itself: 88px on a phone, a full-width 76px bar on desktop on the page's column */
function StepFooterFrame({ status, button }: { status: ReactNode; button: ReactNode }) {
  return (
    <div
      data-step-footer=""
      className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/94 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:h-19 md:py-0"
    >
      <div className="mx-auto flex w-full max-w-[58rem] items-center justify-between gap-3 px-4 md:h-full md:gap-6 md:px-6">
        {status}
        {button}
      </div>
    </div>
  )
}
