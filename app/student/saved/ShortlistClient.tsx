'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Bookmark, CircleAlert } from 'lucide-react'
import { Button } from '@/components/ds/Button'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { EmptyState } from '@/components/ds/EmptyState'
import { LoadingRegion, SkeletonLine } from '@/components/ds/Skeleton'
import { ResultHeadings, ResultRow, ResultRowSkeleton } from '@/components/explore/ResultRow'
import { CompleteProfile } from '@/components/match/CompleteProfile'
import { useShortlist } from '@/components/match/use-shortlist'
import { APP_PLACES } from '@/components/site/nav'
import { ComparePair, CompareSkeleton, CompareTable } from '@/components/shortlist/CompareTable'
import { ComparePicker } from '@/components/shortlist/ComparePicker'
import { ViewLinks } from '@/components/shortlist/ViewLinks'
import type { ShortlistItem, ShortlistResponse } from '@/lib/shortlist/types'
import {
  comparingLabel,
  desktopColumns,
  FEWEST_COMPARED,
  phonePair,
  pickForPhone,
  readShortlistAddress,
  shortlistHref,
  shortlistSummary,
  type ShortlistAddress,
  type ShortlistView
} from '@/lib/shortlist/view'

/*
 * The Shortlist in the new design (rebranding 2.5, boards "D4.10 Shortlist" and "D4.10 Shortlist
 * · phone", with the compare table of "D3.7 Compare table", approved 13 October 2026). "Saved"
 * becomes "Shortlist": the programs the student saved, newest first, each with its fit, as a list
 * (Explore's rows, D3.3) or side by side (D3.7). One response serves both views. A removed program
 * keeps its row until the student leaves the page, so Save on it puts it back. The title and the
 * view links stay while it loads or fails. Replaces SavedProgramsClient, which today's design
 * keeps until release.
 */

type PageState =
  | { kind: 'loading' }
  | { kind: 'failed'; failures: number }
  | { kind: 'ready'; data: ShortlistResponse }

const MATCHES = APP_PLACES.matches.href
const EXPLORE = APP_PLACES.explore.href

export function ShortlistClient() {
  const address = readShortlistAddress(useSearchParams())
  const [state, setState] = useState<PageState>({ kind: 'loading' })
  const [retrying, setRetrying] = useState(false)
  const shortlist = useShortlist([], { onShortlist: true })
  const { reset } = shortlist

  const load = useCallback(async () => {
    try {
      const response = await fetch('/api/students/shortlist')
      if (!response.ok) throw new Error(`status ${response.status}`)
      const data: ShortlistResponse = await response.json()
      reset(data.programs.map((p) => p.id))
      setState({ kind: 'ready', data })
    } catch {
      setState((s) => ({ kind: 'failed', failures: s.kind === 'failed' ? s.failures + 1 : 1 }))
    }
  }, [reset])

  useEffect(() => {
    void load()
  }, [load])

  const retry = async () => {
    setRetrying(true)
    await load()
    setRetrying(false)
  }

  /** A view is a new entry in the history; a choice of programs replaces the current one */
  const go = (next: ShortlistAddress, how: 'push' | 'replace') => {
    const href = shortlistHref(next)
    if (how === 'push') window.history.pushState(null, '', href)
    else window.history.replaceState(null, '', href)
  }

  const data = state.kind === 'ready' ? state.data : null
  const programs = data?.programs ?? []
  const graded = data?.complete ? data : null
  // Compare needs two programs and the fit; one program, or no grades yet, is the list alone
  const canCompare = graded !== null && programs.length >= FEWEST_COMPARED
  const view: ShortlistView =
    address.view === 'compare' && (!data || canCompare) ? 'compare' : 'list'
  const toolbar = state.kind === 'loading' || canCompare

  const summary = graded
    ? programs.length === 0
      ? null
      : shortlistSummary(
          programs.filter((p) => shortlist.isSaved(p.id)).map((p) => p.fit?.status ?? 'meets')
        )
    : null

  return (
    <div className="mx-auto flex w-full max-w-[77.5rem] flex-col gap-4 px-4 pt-5 pb-16 md:gap-6 md:px-6 md:pt-10 md:pb-20">
      <div className="flex flex-col gap-1.5 md:gap-2">
        <h1 className="text-h1">Your shortlist</h1>
        {state.kind === 'loading' && (
          <span aria-hidden="true" className="flex flex-col">
            <SkeletonLine bar={12} width={520} className="max-md:hidden" />
            <SkeletonLine bar={12} width="92%" className="md:hidden" />
            <SkeletonLine bar={12} width="58%" className="md:hidden" />
          </span>
        )}
        {summary && <p className="text-body text-muted-foreground tabular-nums">{summary}</p>}
      </div>

      {toolbar && (
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <ViewLinks
            view={view}
            href={(v) => shortlistHref({ view: v, chosen: address.chosen })}
            onGo={(v) => go({ view: v, chosen: address.chosen }, 'push')}
          />
          {view === 'compare' && graded && programs.length > FEWEST_COMPARED && (
            <Chooser
              items={programs}
              chosen={address.chosen}
              onChange={(chosen) => go({ view: 'compare', chosen }, 'replace')}
            />
          )}
        </div>
      )}

      {state.kind === 'loading' && <Loading view={view} />}

      {state.kind === 'failed' && (
        <EmptyState
          icon={CircleAlert}
          tone="error"
          title="Your shortlist didn’t load"
          actions={
            <Button loading={retrying} loadingLabel="Trying again…" onClick={retry}>
              Try again
            </Button>
          }
        >
          Check your connection and try again. Your profile and shortlist are safe.
          {state.failures > 1 && (
            <>
              {' '}
              If it keeps happening,{' '}
              <Link
                href="/contact"
                className="text-primary underline underline-offset-3 pressed:text-brand-ink pressed:underline"
              >
                contact us
              </Link>
              .
            </>
          )}
        </EmptyState>
      )}

      {data && !data.complete && <CompleteProfile steps={data.steps} />}

      {graded && programs.length === 0 && (
        <EmptyState
          icon={Bookmark}
          title="Your shortlist is empty"
          actions={
            <>
              <ButtonLink href={MATCHES}>See your matches</ButtonLink>
              <ButtonLink href={EXPLORE} variant="secondary">
                Explore programs
              </ButtonLink>
            </>
          }
        >
          Save programs with the bookmark on any match or search result, then compare them here.
        </EmptyState>
      )}

      {data && programs.length > 0 && view === 'list' && (
        <div className="overflow-hidden rounded-card border border-border bg-card">
          <ResultHeadings fitColumn={graded !== null} />
          <ol>
            {programs.map((program) => (
              <ResultRow
                key={program.id}
                heading="h2"
                row={program}
                fitColumn={graded !== null}
                fit={program.fit}
                saved={shortlist.isSaved(program.id)}
                saving={shortlist.isSaving(program.id)}
                onToggleSave={() => shortlist.toggle({ id: program.id, name: program.name })}
              />
            ))}
          </ol>
        </div>
      )}

      {graded && canCompare && view === 'compare' && (
        <Compare
          items={programs}
          address={address}
          total={graded.total}
          currentYear={graded.currentYear}
          shortlist={shortlist}
          onChoose={(chosen) => go({ view: 'compare', chosen }, 'replace')}
        />
      )}

      {graded && programs.length === 1 && (
        <p className="text-body text-muted-foreground">
          Save one more program and you can compare them side by side here.{' '}
          <Link
            href={MATCHES}
            className="font-semibold text-primary underline underline-offset-3 pressed:text-brand-ink pressed:underline"
          >
            See your matches
          </Link>{' '}
          or{' '}
          <Link
            href={EXPLORE}
            className="font-semibold text-primary underline underline-offset-3 pressed:text-brand-ink pressed:underline"
          >
            explore programs
          </Link>
          .
        </p>
      )}

      {programs.length > 0 && (
        <p className="mt-2 border-t border-border pt-4 text-body text-muted-foreground md:pt-5">
          Requirements are checked for one intake at a time, and each program says which. Confirm
          them on the university’s own page before you apply.
        </p>
      )}
    </div>
  )
}

/** "Comparing 4 of 8" and "Choose programs", from three programs on a desktop */
function Chooser({
  items,
  chosen,
  onChange
}: {
  items: ShortlistItem[]
  chosen: string[]
  onChange: (chosen: string[]) => void
}) {
  const columns = desktopColumns(
    chosen,
    items.map((item) => item.id)
  )
  return (
    <div className="flex items-center gap-4 max-md:hidden">
      <span className="text-body text-muted-foreground tabular-nums">
        {comparingLabel(columns.length, items.length)}
      </span>
      <ComparePicker items={items} columns={columns} onChange={onChange} />
    </div>
  )
}

/** Up to four on a desktop, two on a phone, each chosen in the address */
function Compare({
  items,
  address,
  total,
  currentYear,
  shortlist,
  onChoose
}: {
  items: ShortlistItem[]
  address: ShortlistAddress
  total: number
  currentYear: number
  shortlist: ReturnType<typeof useShortlist>
  onChoose: (chosen: string[]) => void
}) {
  const ids = items.map((item) => item.id)
  const columns = desktopColumns(address.chosen, ids)
  const pair = phonePair(address.chosen, ids)
  const shown = (chosen: readonly string[]) =>
    chosen.map((id) => items.find((item) => item.id === id)).filter((item) => item !== undefined)
  return (
    <>
      <div className="max-md:hidden">
        <CompareTable
          items={shown(columns)}
          total={total}
          currentYear={currentYear}
          shortlist={shortlist}
        />
      </div>
      <div className="md:hidden">
        <ComparePair
          items={items}
          pair={pair}
          onPick={(index, id) => onChoose(pickForPhone(pair, index, id))}
          total={total}
          currentYear={currentYear}
          shortlist={shortlist}
        />
      </div>
    </>
  )
}

/** Skeleton rows under the real title and links; one hidden "Loading your shortlist" (D2.8) */
function Loading({ view }: { view: ShortlistView }) {
  const rows = (
    <LoadingRegion
      label="Loading your shortlist"
      className="overflow-hidden rounded-card border border-border bg-card"
    >
      {/* Where the column headings will be */}
      <div className="h-10 max-lg:hidden" />
      <ol>
        {[0, 1, 2, 3, 4].map((i) => (
          <ResultRowSkeleton key={i} fitColumn index={i} />
        ))}
      </ol>
    </LoadingRegion>
  )
  if (view === 'list') return rows
  return (
    <>
      <div className="max-md:hidden">
        <CompareSkeleton />
      </div>
      <div className="md:hidden">{rows}</div>
    </>
  )
}
