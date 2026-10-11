'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { CircleAlert, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ds/Button'
import { RemovableChipGroup, ToggleChip } from '@/components/ds/Chip'
import { EmptyState } from '@/components/ds/EmptyState'
import { SearchInput } from '@/components/ds/SearchInput'
import { Select } from '@/components/ds/Select'
import { useShortlist } from '@/components/match/use-shortlist'
import { APP_PLACES } from '@/components/site/nav'
import { FilterMenu } from '@/components/explore/FilterMenu'
import { FilterSheet, FiltersButton, QualifyRow } from '@/components/explore/FilterSheet'
import { Choices, PointsInputs, Shortcut, type Option } from '@/components/explore/FilterParts'
import { ResultHeadings, ResultRow, ResultRowSkeleton } from '@/components/explore/ResultRow'
import { showMoreLabel } from '@/lib/matching/match-groups'
import { LENGTHS } from '@/lib/programs/duration'
import {
  PAGE_SIZE,
  POINTS,
  SORTS,
  appliedChips,
  chosenCount,
  clearAll,
  clearFilter,
  countParts,
  exploreHref,
  exploreParams,
  hasChoices,
  noResultsText,
  pointsRange,
  programsCount,
  readExplore,
  removeChip,
  signInTo,
  type ExploreQuery,
  type ExploreSort
} from '@/lib/explore/query'
import type { ExploreFit, ExploreResponse, ExploreRow, ExploreViewer } from '@/lib/explore/types'

/*
 * Explore in the new design (rebranding 2.3; canvas boards "D4.7 Explore" and "D4.7 Explore ·
 * phone", with "D3.3 Result row", "D3.5 Filter toolbar" and "D2.15 Bottom sheet", approved 11
 * October 2026). The search, the toolbar (a sheet on a phone), the count with the applied
 * chips, the rows, and 20 at a time with "Show 20 more". A choice applies at once and goes in
 * the URL with how many rows are shown, so Back from a program returns to the same row. A change
 * keeps the rows until new ones arrive: the list is busy, with no skeleton flash. The first
 * rows come in the server HTML for everyone, with the fit when the student has grades; later
 * rows come with theirs. Replaces SearchClient, which today's design keeps until release.
 */

export interface ExploreInitial {
  query: ExploreQuery
  shown: number
  total: number
  rows: ExploreRow[]
  /** The rows' fit, signed in with grades: in the server HTML with them */
  fits: Record<string, ExploreFit>
  failed: boolean
}

export interface ExploreClientProps {
  initial: ExploreInitial
  viewer: ExploreViewer
  fields: Option[]
  countries: Option[]
  /** "1,628 programs in 23 countries, each with its IB requirements."; null if it didn't load */
  summary: string | null
}

interface List {
  rows: ExploreRow[]
  total: number
  /** By program id, signed in with grades */
  fits: Record<string, ExploreFit>
}

/** A pause after typing or ticking before the list asks again, as today's page waits */
const SETTLE_MS = 300

const LENGTH_OPTIONS: Option[] = LENGTHS.map((l) => ({ id: String(l.years), name: l.label }))
const ACADEMIC = APP_PLACES.academic.href

export function ExploreClient({ initial, viewer, fields, countries, summary }: ExploreClientProps) {
  const [query, setQuery] = useState(initial.query)
  const [text, setText] = useState(initial.query.q)
  const [list, setList] = useState<List>({
    rows: initial.rows,
    total: initial.total,
    fits: initial.fits
  })
  const [phase, setPhase] = useState<'ready' | 'busy' | 'failed'>(
    initial.failed ? 'failed' : 'ready'
  )
  const [failures, setFailures] = useState(initial.failed ? 1 : 0)
  const [retrying, setRetrying] = useState(false)
  const [more, setMore] = useState<'idle' | 'loading' | 'failed'>('idle')
  const [announcement, setAnnouncement] = useState('')
  const [sheetOpen, setSheetOpen] = useState(false)
  /** Remounts the IB points fields after a reset, which can leave the applied range as it was */
  const [pointsKey, setPointsKey] = useState(0)

  const shortlist = useShortlist(viewer.savedIds)
  const latest = useRef(initial.query)
  const request = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const focusNext = useRef<string | null>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const filtersButton = useRef<HTMLButtonElement>(null)

  const names = useMemo(
    () => ({
      fields: new Map(fields.map((f) => [f.id, f.name])),
      countries: new Map(countries.map((c) => [c.id, c.name]))
    }),
    [fields, countries]
  )

  /** The list for a query, from the top; a newer request wins */
  const load = useCallback(async (next: ExploreQuery, length = PAGE_SIZE) => {
    const id = ++request.current
    setPhase('busy')
    try {
      const data = await fetchList(next, 0, length)
      if (id !== request.current) return
      setList({ rows: data.rows, total: data.total, fits: data.fits ?? {} })
      setPhase('ready')
      setFailures(0)
      setMore('idle')
    } catch {
      if (id !== request.current) return
      setPhase('failed')
      setFailures((n) => n + 1)
    }
  }, [])

  /** Apply a change at once, in the controls and the URL; ask for the list once it settles */
  const apply = useCallback(
    (change: (current: ExploreQuery) => ExploreQuery) => {
      const next = change(latest.current)
      if (exploreHref(next) === exploreHref(latest.current)) return
      latest.current = next
      setQuery(next)
      window.history.replaceState(null, '', exploreHref(next))
      clearTimeout(timer.current)
      // Busy at once, so a request already on its way can't land after this choice
      request.current++
      setPhase('busy')
      timer.current = setTimeout(() => void load(next), SETTLE_MS)
    },
    [load]
  )

  // Back from a program can bring this page back from the browser's cache with the first
  // render's list. The URL says what was showing, so follow it.
  useEffect(() => {
    const fromUrl = readExplore(new URLSearchParams(window.location.search))
    // As the server reads it: the switch needs grades
    const asked = viewer.hasGrades ? fromUrl.query : { ...fromUrl.query, qualify: false }
    if (exploreHref(asked, fromUrl.shown) !== exploreHref(initial.query, initial.shown)) {
      latest.current = asked
      setQuery(asked)
      setText(asked.q)
      void load(asked, fromUrl.shown)
    }
    // Once, on arrival
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // "Show 20 more" moves focus to the first new name
  useEffect(() => {
    if (!focusNext.current) return
    document.getElementById(`explore-${focusNext.current}`)?.focus()
    focusNext.current = null
  }, [list.rows])

  const showMore = async () => {
    const id = request.current
    const from = list.rows.length
    setMore('loading')
    try {
      const data = await fetchList(query, from, PAGE_SIZE)
      if (id !== request.current) return
      const known = new Set(list.rows.map((r) => r.id))
      const added = data.rows.filter((r) => !known.has(r.id))
      focusNext.current = added[0]?.id ?? null
      setList((l) => ({
        rows: [...l.rows, ...added],
        total: data.total,
        fits: { ...l.fits, ...data.fits }
      }))
      setMore('idle')
      setAnnouncement(`${added.length} more shown`)
      window.history.replaceState(null, '', exploreHref(query, from + added.length))
    } catch {
      if (id === request.current) setMore('failed')
    }
  }

  const retry = async () => {
    setRetrying(true)
    await load(query, Math.max(PAGE_SIZE, list.rows.length))
    setRetrying(false)
  }

  /** A reset from outside the fields: Clear, a removed chip, Clear all */
  const reset = (change: (current: ExploreQuery) => ExploreQuery) => {
    setPointsKey((k) => k + 1)
    apply(change)
  }

  const type = (value: string) => {
    setText(value)
    apply((q) => ({ ...q, q: value.trim().slice(0, 200) }))
  }

  const chips = appliedChips(query, names)
  const total = phase === 'failed' ? null : list.total
  const fitColumn = viewer.hasGrades
  const range = pointsRange(query.from, query.to)
  const { figure, rest } = countParts(list.total, query.q)

  const shortcuts = shortcutsFor(viewer, apply)

  const sections = {
    fields: (tall: boolean) => (
      <Choices
        options={fields}
        chosen={query.fields}
        columns={tall ? 2 : 1}
        tall={tall}
        onToggle={(id, on) => apply((q) => ({ ...q, fields: toggled(fields, q.fields, id, on) }))}
      />
    ),
    countries: (tall: boolean) => (
      <Choices
        options={countries}
        chosen={query.countries}
        columns={2}
        tall={tall}
        onToggle={(id, on) =>
          apply((q) => ({ ...q, countries: toggled(countries, q.countries, id, on) }))
        }
      />
    ),
    points: (wide: boolean) => (
      <PointsInputs
        key={pointsKey}
        from={query.from}
        to={query.to}
        noMin={query.noMin}
        wide={wide}
        onRange={(from, to) => apply((q) => ({ ...q, from, to }))}
        onNoMin={(noMin) => apply((q) => ({ ...q, noMin }))}
      />
    ),
    lengths: (tall: boolean) => (
      <Choices
        options={LENGTH_OPTIONS}
        chosen={query.lengths.map(String)}
        columns={tall ? 2 : 1}
        tall={tall}
        onToggle={(id, on) =>
          apply((q) => ({
            ...q,
            lengths: LENGTHS.map((l) => l.years).filter((years) =>
              String(years) === id ? on : q.lengths.includes(years)
            )
          }))
        }
      />
    )
  }

  const qualify = (where: 'toolbar' | 'phone') =>
    viewer.hasGrades ? (
      <ToggleChip
        pressed={query.qualify}
        onPressedChange={(on) => apply((q) => ({ ...q, qualify: on }))}
      >
        Only ones I qualify for
      </ToggleChip>
    ) : (
      <Link
        href={
          viewer.signedIn
            ? ACADEMIC
            : signInTo(exploreHref(query, Math.max(PAGE_SIZE, list.rows.length)))
        }
        className={cn(
          'inline-flex min-h-9 items-center rounded-chip text-body font-medium text-primary underline underline-offset-3 hover:text-brand-hover',
          where === 'phone' ? 'basis-full px-1' : 'px-1.5'
        )}
      >
        {viewer.signedIn
          ? 'Add your grades to see which ones you qualify for'
          : 'Sign in to see which ones you qualify for'}
      </Link>
    )

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <div className="flex flex-col gap-1.5 md:gap-2">
        <h1 className="text-h1">Explore programs</h1>
        {summary && <p className="text-body text-muted-foreground">{summary}</p>}
      </div>

      <form
        role="search"
        className="max-w-[47.5rem]"
        onSubmit={(event) => {
          // The keyboard's Search key: search now, and put the keyboard away
          event.preventDefault()
          ;(document.activeElement as HTMLElement | null)?.blur()
        }}
      >
        <SearchInput
          aria-label="Search programs"
          placeholder="Program, university or city"
          enterKeyHint="search"
          value={text}
          onValueChange={type}
        />
      </form>

      {/* From 768px: four chips and their menus, the switch, and Sort at the right (D3.5) */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-3 max-md:hidden">
        <FilterMenu
          id="explore-menu-field"
          label="Field"
          count={query.fields.length}
          width={320}
          shortcut={shortcuts.fields}
          total={total}
          canClear={query.fields.length > 0}
          onClear={() => apply((q) => clearFilter(q, 'fields'))}
        >
          <fieldset>
            <legend className="sr-only">Field</legend>
            {sections.fields(false)}
          </fieldset>
        </FilterMenu>
        <FilterMenu
          id="explore-menu-country"
          label="Country"
          count={query.countries.length}
          width={440}
          shortcut={shortcuts.countries}
          total={total}
          canClear={query.countries.length > 0}
          onClear={() => apply((q) => clearFilter(q, 'countries'))}
        >
          <fieldset>
            <legend className="sr-only">Country</legend>
            {sections.countries(false)}
          </fieldset>
        </FilterMenu>
        <FilterMenu
          id="explore-menu-points"
          label="IB points"
          chosen={range ?? (query.noMin ? null : 'with a minimum')}
          width={340}
          shortcut={shortcuts.points}
          total={total}
          canClear={range !== null || !query.noMin}
          onClear={() => reset((q) => clearFilter(q, 'points'))}
        >
          {sections.points(false)}
        </FilterMenu>
        <FilterMenu
          id="explore-menu-length"
          label="Length"
          count={query.lengths.length}
          width={300}
          total={total}
          canClear={query.lengths.length > 0}
          onClear={() => apply((q) => clearFilter(q, 'lengths'))}
        >
          <fieldset>
            <legend className="sr-only">Length</legend>
            {sections.lengths(false)}
          </fieldset>
        </FilterMenu>
        {qualify('toolbar')}
        {/* Between 768 and 1023px, Sort takes its own line, still at the right */}
        <div className="ml-auto flex justify-end max-lg:w-full">
          <SortSelect sort={query.sort} onChange={(sort) => apply((q) => ({ ...q, sort }))} />
        </div>
      </div>

      {/* A phone: one Filters button, opening the sheet, and the switch beside it (D4.7) */}
      <div className="flex flex-wrap items-center gap-2 md:hidden">
        <FiltersButton
          ref={filtersButton}
          chosen={chosenCount(query)}
          open={sheetOpen}
          onClick={() => setSheetOpen(true)}
        />
        {qualify('phone')}
      </div>

      {phase !== 'failed' && (
        <div className="flex flex-col gap-3">
          <RemovableChipGroup
            items={chips}
            onRemove={(key) => reset((q) => removeChip(q, key))}
            onClearAll={() => reset(clearAll)}
            afterLastRef={countRef}
          >
            <span
              ref={countRef}
              tabIndex={-1}
              role="status"
              className="mr-2 text-body tabular-nums max-md:mb-1 max-md:basis-full"
            >
              <strong className="font-semibold">{figure}</strong> {rest}
            </span>
          </RemovableChipGroup>
          <div className="flex justify-end md:hidden">
            <SortSelect sort={query.sort} onChange={(sort) => apply((q) => ({ ...q, sort }))} />
          </div>
        </div>
      )}

      {phase === 'failed' ? (
        <EmptyState
          icon={CircleAlert}
          tone="error"
          title="Programs didn’t load"
          actions={
            <Button loading={retrying} loadingLabel="Trying again…" onClick={retry}>
              Try again
            </Button>
          }
        >
          Check your connection and try again. Your shortlist is safe.
          {failures > 1 && (
            <>
              {' '}
              If it keeps happening,{' '}
              <Link href="/contact" className="text-primary underline underline-offset-3">
                contact us
              </Link>
              .
            </>
          )}
        </EmptyState>
      ) : list.rows.length === 0 ? (
        <EmptyState
          icon={Search}
          title={
            hasChoices(query) ? 'No programs match these filters' : 'No programs match this search'
          }
          actions={
            hasChoices(query) ? (
              <Button variant="secondary" onClick={() => reset(clearAll)}>
                Clear all filters
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => {
                  setText('')
                  apply((q) => ({ ...q, q: '' }))
                }}
              >
                Clear the search
              </Button>
            )
          }
        >
          {noResultsText(query, names)}
        </EmptyState>
      ) : (
        <div className="flex flex-col gap-4 md:gap-5">
          <h2 className="sr-only">Programs</h2>
          <div
            aria-busy={phase === 'busy' || undefined}
            className="overflow-hidden rounded-card border border-border bg-card"
          >
            <ResultHeadings fitColumn={fitColumn} />
            <ol>
              {list.rows.map((row) => (
                <ResultRow
                  key={row.id}
                  row={row}
                  fitColumn={fitColumn}
                  fit={list.fits[row.id]}
                  saved={shortlist.isSaved(row.id)}
                  saving={shortlist.isSaving(row.id)}
                  onToggleSave={() => shortlist.toggle({ id: row.id, name: row.name })}
                  signInHref={viewer.signedIn ? undefined : signInTo(`/programs/${row.id}?save=1`)}
                />
              ))}
              {more === 'loading' &&
                [0, 1, 2, 3].map((i) => (
                  <ResultRowSkeleton key={i} index={i} fitColumn={fitColumn} />
                ))}
            </ol>
          </div>
          {list.rows.length < list.total && (
            <MoreRows shown={list.rows.length} total={list.total} state={more} onMore={showMore} />
          )}
        </div>
      )}

      <span role="status" className="sr-only">
        {announcement}
      </span>

      <FilterSheet
        open={sheetOpen}
        onDismiss={() => setSheetOpen(false)}
        total={phase === 'busy' ? list.total : total}
        canClear={hasChoices(query)}
        onClearAll={() => reset(clearAll)}
        live={phase === 'ready' ? programsCount(list.total) : ''}
        returnFocusTo={filtersButton}
      >
        {viewer.hasGrades && (
          <QualifyRow
            pressed={query.qualify}
            total={viewer.total}
            onPressedChange={(on) => apply((q) => ({ ...q, qualify: on }))}
          />
        )}
        <SheetSection legend="Field" chosen={query.fields.length} shortcut={shortcuts.fields}>
          {sections.fields(true)}
        </SheetSection>
        <SheetSection
          legend="Country"
          chosen={query.countries.length}
          shortcut={shortcuts.countries}
        >
          {sections.countries(true)}
        </SheetSection>
        <SheetSection legend="IB points" shortcut={shortcuts.points} group={false}>
          {sections.points(true)}
        </SheetSection>
        <SheetSection legend="Length" chosen={query.lengths.length}>
          {sections.lengths(true)}
        </SheetSection>
      </FilterSheet>
    </div>
  )
}

async function fetchList(query: ExploreQuery, offset: number, length: number) {
  const params = exploreParams(query)
  params.set('offset', String(offset))
  params.set('length', String(length))
  const response = await fetch(`/api/programs/explore?${params}`)
  if (!response.ok) throw new Error(`status ${response.status}`)
  return (await response.json()) as ExploreResponse
}

/** Ticked or not, kept in the options' order so the URL and the chips stay steady */
function toggled(options: readonly Option[], chosen: string[], id: string, on: boolean): string[] {
  return options.map((o) => o.id).filter((o) => (o === id ? on : chosen.includes(o)))
}

/** The profile's own choices, signed in with grades: each ticks those and nothing else */
function shortcutsFor(
  viewer: ExploreViewer,
  apply: (change: (current: ExploreQuery) => ExploreQuery) => void
): Record<'fields' | 'countries' | 'points', ReactNode> {
  if (!viewer.hasGrades) return { fields: null, countries: null, points: null }
  const total = viewer.total
  return {
    fields:
      viewer.fields.length > 0 ? (
        <Shortcut onClick={() => apply((q) => ({ ...q, fields: viewer.fields }))}>
          Use my fields
        </Shortcut>
      ) : null,
    countries:
      viewer.countries.length > 0 ? (
        <Shortcut onClick={() => apply((q) => ({ ...q, countries: viewer.countries }))}>
          Use my countries
        </Shortcut>
      ) : null,
    points:
      total !== null && total >= POINTS.min && total <= POINTS.max ? (
        <Shortcut
          onClick={() =>
            apply((q) => ({
              ...q,
              to: total,
              from: q.from !== null && q.from <= total ? q.from : null
            }))
          }
        >
          Up to my {total}
        </Shortcut>
      ) : null
  }
}

function SortSelect({
  sort,
  onChange
}: {
  sort: ExploreSort
  onChange: (sort: ExploreSort) => void
}) {
  return (
    <Select
      label="Sort"
      value={sort}
      onChange={(event) => onChange(event.target.value as ExploreSort)}
      className="flex-row items-center gap-2.5 [&>div]:w-55 [&>label]:text-muted-foreground"
    >
      {SORTS.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </Select>
  )
}

/** One section of the sheet: its heading saying what's chosen, a shortcut on the same line */
function SheetSection({
  legend,
  chosen = 0,
  shortcut,
  group = true,
  children
}: {
  legend: string
  chosen?: number
  shortcut?: ReactNode
  /** False where the section holds its own group: the IB points fields */
  group?: boolean
  children: ReactNode
}) {
  const heading = (
    <>
      {legend}
      {chosen > 0 && <span className="font-normal text-muted-foreground"> · {chosen} chosen</span>}
    </>
  )
  const Tag = group ? 'fieldset' : 'div'
  return (
    <Tag className="min-w-0">
      {group ? (
        <legend className="float-left text-body font-semibold">{heading}</legend>
      ) : (
        <span className="float-left text-body font-semibold">{heading}</span>
      )}
      {shortcut && <span className="float-right">{shortcut}</span>}
      <div className="clear-both pt-3">{children}</div>
    </Tag>
  )
}

/** "Show 20 more" with how many show; "Loading 20 more…"; or the notice if they didn't load */
function MoreRows({
  shown,
  total,
  state,
  onMore
}: {
  shown: number
  total: number
  state: 'idle' | 'loading' | 'failed'
  onMore: () => void
}) {
  const label = showMoreLabel(shown, total)
  const count = (
    <span className="text-small font-normal text-muted-foreground tabular-nums max-md:text-center">
      Showing {shown} of {total.toLocaleString('en-GB')}
    </span>
  )
  if (state === 'failed') {
    return (
      <>
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-card border border-border bg-card px-4 pt-3.5 pb-4 md:flex-row md:items-center md:py-3 md:pr-3"
        >
          <span className="flex flex-1 items-start gap-2.5 text-body md:items-center md:gap-3">
            <span
              aria-hidden="true"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-control border border-transparent bg-gap-soft text-gap"
            >
              <CircleAlert size={18} strokeWidth={2} />
            </span>
            <span>
              <strong className="font-semibold">The next {PAGE_SIZE} didn’t load.</strong>{' '}
              <span className="text-muted-foreground">
                Check your connection and try again. The {shown} above stay.
              </span>
            </span>
          </span>
          <Button variant="secondary" onClick={onMore} className="max-md:w-full">
            Try again
          </Button>
        </div>
        {count}
      </>
    )
  }
  return (
    <div className="flex flex-col-reverse gap-2 md:flex-row md:items-center md:gap-4">
      <Button
        variant="secondary"
        loading={state === 'loading'}
        loadingLabel={label.replace('Show', 'Loading').concat('…')}
        onClick={onMore}
        className="max-md:w-full md:min-w-40"
      >
        {label}
      </Button>
      {count}
    </div>
  )
}
