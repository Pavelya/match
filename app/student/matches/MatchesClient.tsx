'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowDown,
  Check,
  ChevronDown,
  CircleAlert,
  GraduationCap,
  ListChecks,
  Minus,
  X,
  type LucideIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ds/Button'
import { ButtonLink } from '@/components/ds/ButtonLink'
import { EmptyState } from '@/components/ds/EmptyState'
import { Select } from '@/components/ds/Select'
import { LoadingRegion, Skeleton, SkeletonLine } from '@/components/ds/Skeleton'
import { MatchCard, MatchCardSkeleton } from '@/components/match/MatchCard'
import { useShortlist } from '@/components/match/use-shortlist'
import { APP_PLACES } from '@/components/site/nav'
import type { CardStatus } from '@/lib/matching/match-status'
import {
  FIRST_SHOWN,
  GROUPS,
  SHOW_MORE,
  SORT_ORDERS,
  WIDENED_SUMMARY,
  jumpLabel,
  showMoreLabel,
  sortMatches,
  summaryText,
  type MatchItem,
  type MatchesProfile,
  type MatchesResponse,
  type ProfileStep,
  type SortOrder
} from '@/lib/matching/match-groups'

/*
 * Matches in the new design (rebranding 2.2, canvas boards "D4.6 Matches" and "D4.6 Matches ·
 * phone", approved 10 October 2026). Every match, grouped by status before any cap, with true
 * counts: Meets all requirements, Within reach, then Missing a requirement, collapsed unless it
 * is the only group. Five cards a group, then "Show 20 more". Three jump links under the
 * summary, the sort, and on desktop the profile beside the list, all from one response. The
 * header and title stay while it loads or fails. Replaces RecommendationsClient, which today's
 * design keeps until release.
 */

type PageState =
  | { kind: 'loading' }
  | { kind: 'failed'; failures: number }
  | { kind: 'ready'; data: MatchesResponse }

const STATUS_STYLE: Record<CardStatus, { Icon: LucideIcon; text: string; soft: string }> = {
  meets: { Icon: Check, text: 'text-ok', soft: 'bg-ok-soft' },
  close: { Icon: Minus, text: 'text-close', soft: 'bg-close-soft' },
  gap: { Icon: X, text: 'text-gap', soft: 'bg-gap-soft' }
}

const ACADEMIC = APP_PLACES.academic.href
const EXPLORE = APP_PLACES.explore.href

export function MatchesClient() {
  const [state, setState] = useState<PageState>({ kind: 'loading' })
  const [retrying, setRetrying] = useState(false)
  const shortlist = useShortlist()
  const { reset } = shortlist

  const load = useCallback(async () => {
    try {
      const response = await fetch('/api/students/matches/list')
      if (!response.ok) throw new Error(`status ${response.status}`)
      const data: MatchesResponse = await response.json()
      if (data.complete) reset(data.savedIds)
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

  const data = state.kind === 'ready' ? state.data : null
  const list = data?.complete ? data : null

  return (
    <div className="mx-auto w-full max-w-[77.5rem] px-4 pt-4 pb-16 md:px-6 md:pt-10 md:pb-20 lg:grid lg:grid-cols-[minmax(0,52.5rem)_20rem] lg:items-start lg:justify-center lg:gap-x-8">
      <div className="flex min-w-0 flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-1.5 md:gap-2">
          <h1 className="text-h1">Your matches</h1>
          {state.kind === 'loading' && (
            <span aria-hidden="true" className="flex flex-col">
              <SkeletonLine bar={12} width={470} className="max-md:hidden" />
              <SkeletonLine bar={12} width="92%" className="md:hidden" />
              <SkeletonLine bar={12} width="64%" className="md:hidden" />
            </span>
          )}
          {list && <Summary list={list} />}
        </div>

        {state.kind === 'loading' && <Loading />}

        {state.kind === 'failed' && (
          <EmptyState
            icon={CircleAlert}
            tone="error"
            title="Your matches didn’t load"
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
                <Link href="/contact" className="text-primary underline underline-offset-3">
                  contact us
                </Link>
                .
              </>
            )}
          </EmptyState>
        )}

        {data && !data.complete && <CompleteProfile steps={data.steps} />}

        {list && (
          <MatchList
            matches={list.matches}
            total={list.profile.total ?? 0}
            widened={list.widened}
            shortlist={shortlist}
          />
        )}
      </div>

      {(state.kind === 'loading' || list) && (
        <div className="sticky top-22 max-lg:hidden">
          {list ? <ProfilePanel profile={list.profile} /> : <ProfileSkeleton />}
        </div>
      )}
    </div>
  )
}

function Summary({ list }: { list: Extract<MatchesResponse, { complete: true }> }) {
  const { matches, profile, widened } = list
  const text = (counted: boolean) =>
    widened
      ? WIDENED_SUMMARY
      : summaryText(matches.length, profile.fields.length, profile.countries.length, counted)
  return (
    <p className="text-body text-muted-foreground">
      {/* Below 1024px the profile panel goes, so the sentence counts fields and countries */}
      <span className="lg:hidden">{text(true)}</span>
      <span className="max-lg:hidden">{text(false)}</span>
    </p>
  )
}

function MatchList({
  matches,
  total,
  widened,
  shortlist
}: {
  matches: MatchItem[]
  total: number
  widened: boolean
  shortlist: ReturnType<typeof useShortlist>
}) {
  const [order, setOrder] = useState<SortOrder>('fit')
  const [shown, setShown] = useState<Record<CardStatus, number>>({
    meets: FIRST_SHOWN,
    close: FIRST_SHOWN,
    gap: FIRST_SHOWN
  })
  const onlyMissing = matches.length > 0 && matches.every((m) => m.status === 'gap')
  const [missingOpen, setMissingOpen] = useState(onlyMissing)
  const [announcement, setAnnouncement] = useState('')
  const focusNext = useRef<string | null>(null)

  const groups = useMemo(() => {
    const sorted = sortMatches(matches, order, total)
    return GROUPS.map((g) => ({ ...g, items: sorted.filter((m) => m.status === g.status) })).filter(
      (g) => g.items.length > 0
    )
  }, [matches, order, total])

  // "Show 20 more" moves focus to the first new card's title
  useEffect(() => {
    if (!focusNext.current) return
    document.getElementById(`match-${focusNext.current}`)?.focus()
    focusNext.current = null
  }, [shown])

  const showMore = (status: CardStatus, items: MatchItem[]) => {
    const from = shown[status]
    const more = Math.min(SHOW_MORE, items.length - from)
    focusNext.current = items[from]?.id ?? null
    setShown((s) => ({ ...s, [status]: from + more }))
    setAnnouncement(`${more} more shown`)
  }

  const nothingClose = !groups.some((g) => g.status !== 'gap')

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-4 md:gap-y-3">
        {groups.length > 1 ? <JumpLinks groups={groups} /> : <span className="max-md:hidden" />}
        <SortSelect order={order} onChange={setOrder} />
      </div>

      {nothingClose && (
        <EmptyState
          icon={ListChecks}
          title="Nothing meets the requirements yet"
          actions={
            <>
              <ButtonLink href={ACADEMIC}>Edit your academic profile</ButtonLink>
              <ButtonLink href={EXPLORE} variant="secondary">
                Explore programs
              </ButtonLink>
            </>
          }
        >
          {matches.length > 0
            ? `All ${matches.length} ${matches.length === 1 ? 'program' : 'programs'} ${widened ? 'in this list' : 'in your fields and countries'} need more points or a subject you don’t have yet. Each one below says what it needs. If your predicted grades have changed, update them, or add fields and countries to see more.`
            : 'Explore has every program, each with your fit.'}
        </EmptyState>
      )}

      {groups.map((group) => {
        const missing = group.status === 'gap'
        const open = !missing || missingOpen
        const visible = group.items.slice(0, shown[group.status])
        return (
          <section key={group.id} aria-labelledby={group.id} className="flex flex-col gap-3">
            {missing ? (
              <MissingBar
                id={group.id}
                count={group.items.length}
                open={open}
                onToggle={() => setMissingOpen((o) => !o)}
              />
            ) : (
              <GroupHeading
                id={group.id}
                status={group.status}
                title={group.title}
                count={group.items.length}
                total={total}
                order={order}
              />
            )}
            {open &&
              visible.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  saved={shortlist.isSaved(match.id)}
                  saving={shortlist.isSaving(match.id)}
                  onToggleSave={() => shortlist.toggle({ id: match.id, name: match.name })}
                />
              ))}
            {open && visible.length < group.items.length && (
              <div className="flex flex-col-reverse gap-2 md:flex-row md:items-center md:gap-4">
                <Button
                  variant="secondary"
                  onClick={() => showMore(group.status, group.items)}
                  className="max-md:w-full"
                >
                  {showMoreLabel(visible.length, group.items.length)}
                </Button>
                <span className="text-small font-normal text-muted-foreground tabular-nums max-md:text-center">
                  Showing {visible.length} of {group.items.length}
                </span>
              </div>
            )}
          </section>
        )
      })}

      <span role="status" className="sr-only">
        {announcement}
      </span>

      {matches.length > 0 && (
        <p className="mt-2 border-t border-border pt-5 text-body text-muted-foreground">
          {widened ? '' : 'That’s every program in your fields and countries near your total. '}
          <Link
            href={EXPLORE}
            className="font-semibold text-primary underline-offset-3 hover:underline"
          >
            Explore
          </Link>{' '}
          has every program, each with your fit.
        </p>
      )}
    </>
  )
}

function JumpLinks({
  groups
}: {
  groups: { status: CardStatus; id: string; title: string; items: MatchItem[] }[]
}) {
  return (
    <nav aria-label="Groups">
      {/* Desktop: three links in a row */}
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 max-md:hidden">
        {groups.map((g) => {
          const { Icon, text } = STATUS_STYLE[g.status]
          return (
            <li key={g.id}>
              <a
                href={`#${g.id}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-chip text-body font-semibold text-primary underline-offset-3 hover:underline"
              >
                <Icon aria-hidden="true" size={16} strokeWidth={2.4} className={text} />
                <span className="tabular-nums">{jumpLabel(g.status, g.items.length)}</span>
              </a>
            </li>
          )
        })}
      </ul>
      {/* A phone: a panel of three rows, each a 48px target */}
      <ul className="overflow-hidden rounded-card border border-border bg-card md:hidden">
        {groups.map((g) => {
          const { Icon, text, soft } = STATUS_STYLE[g.status]
          return (
            <li key={g.id} className="border-t border-border first:border-t-0">
              <a
                href={`#${g.id}`}
                className="grid min-h-12 grid-cols-[28px_minmax(0,1fr)_auto_16px] items-center gap-x-2.5 px-3.5 text-body font-medium text-foreground"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'inline-flex size-7 items-center justify-center rounded-full border border-transparent',
                    soft,
                    text
                  )}
                >
                  <Icon size={14} strokeWidth={2.4} />
                </span>
                <span>{g.title}</span>
                <span className="font-semibold text-muted-foreground tabular-nums">
                  {g.items.length}
                </span>
                <ArrowDown aria-hidden="true" size={16} strokeWidth={2} className="text-ink-3" />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function SortSelect({
  order,
  onChange,
  disabled = false
}: {
  order: SortOrder
  onChange?: (order: SortOrder) => void
  disabled?: boolean
}) {
  return (
    <Select
      label="Sort"
      value={order}
      disabled={disabled}
      onChange={(event) => onChange?.(event.target.value as SortOrder)}
      className="flex-row items-center gap-2.5 [&>div]:w-50 [&>label]:text-muted-foreground"
    >
      {SORT_ORDERS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </Select>
  )
}

const GROUP_LINES: Record<'meets' | 'close', { desktop: string; phone: string }> = {
  meets: { desktop: 'Every requirement met.', phone: 'Every requirement met.' },
  close: {
    desktop: 'Up to 3 points short, or one subject one grade short, or both.',
    phone: 'Up to 3 points or one grade short, or both.'
  }
}

function GroupHeading({
  id,
  status,
  title,
  count,
  total,
  order
}: {
  id: string
  status: CardStatus
  title: string
  count: number
  total: number
  order: SortOrder
}) {
  const { Icon, text, soft } = STATUS_STYLE[status]
  const lines = GROUP_LINES[status === 'meets' ? 'meets' : 'close']
  // Best fit puts the minimum closest to the student's total first; say so where it shows
  const closest =
    status === 'meets' && order === 'fit'
      ? {
          desktop: ` The minimum closest to your ${total} comes first.`,
          phone: ' Closest to your total first.'
        }
      : { desktop: '', phone: '' }
  return (
    <div className="flex flex-col gap-0.5 pt-2">
      <h2 id={id} className="flex scroll-mt-20 items-center gap-2.5 text-h2 md:scroll-mt-24">
        <StatusCircle Icon={Icon} className={cn(soft, text)} />
        {title}
        <span className="font-normal text-muted-foreground tabular-nums">{count}</span>
      </h2>
      <p className="ml-[38px] text-small font-normal text-muted-foreground">
        <span className="md:hidden">
          {lines.phone}
          {closest.phone}
        </span>
        <span className="max-md:hidden">
          {lines.desktop}
          {closest.desktop}
        </span>
      </p>
    </div>
  )
}

/** "Missing a requirement" is a bar holding a button, collapsed unless it is the only group. */
function MissingBar({
  id,
  count,
  open,
  onToggle
}: {
  id: string
  count: number
  open: boolean
  onToggle: () => void
}) {
  return (
    <h2 id={id} className="mt-2 scroll-mt-20 text-h2 md:scroll-mt-24">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="grid min-h-19 w-full grid-cols-[28px_minmax(0,1fr)_20px] items-center gap-x-2.5 rounded-card border border-border bg-card px-3.5 py-3 text-left transition-[border-color,background-color] duration-180 ease-standard hover:border-line-3 md:grid-cols-[28px_minmax(0,1fr)_auto] md:px-4"
      >
        <StatusCircle Icon={X} className="bg-gap-soft text-gap" />
        <span className="flex flex-col">
          <span>
            Missing a requirement{' '}
            <span className="font-normal text-muted-foreground tabular-nums">{count}</span>
          </span>
          <span className="text-small font-normal tracking-normal text-muted-foreground">
            <span className="md:hidden">A subject or level you don’t have, or further off.</span>
            <span className="max-md:hidden">
              Needs a subject or level you don’t have, or is further off.
            </span>
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-body font-semibold tracking-normal text-primary">
          <span className="max-md:hidden">{open ? 'Hide' : 'Show'}</span>
          <ChevronDown
            aria-hidden="true"
            size={18}
            strokeWidth={2.2}
            className={cn('transition-transform duration-240 ease-standard', open && 'rotate-180')}
          />
        </span>
      </button>
    </h2>
  )
}

function StatusCircle({ Icon, className }: { Icon: LucideIcon; className: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-transparent',
        className
      )}
    >
      <Icon size={16} strokeWidth={2.4} />
    </span>
  )
}

function CompleteProfile({ steps }: { steps: ProfileStep[] }) {
  const choicesSaved = steps.filter((s) => s.name !== 'Subjects and grades').every((s) => s.done)
  return (
    <EmptyState
      icon={GraduationCap}
      tone="brand"
      title="Complete your academic profile"
      steps={steps}
      actions={
        <>
          <ButtonLink href={ACADEMIC}>
            {choicesSaved ? 'Add subjects and grades' : 'Get started'}
          </ButtonLink>
          <ButtonLink href={EXPLORE} variant="secondary">
            Explore programs
          </ButtonLink>
        </>
      }
      meta="About 2 minutes. You can change it any time."
    >
      Add your six IB subjects and grades, and we’ll match you with programs in your fields and
      countries.
    </EmptyState>
  )
}

function Loading() {
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <div aria-hidden="true" className="flex h-11 items-center gap-5 max-md:hidden">
          <Skeleton className="h-3 w-[190px]" />
          <Skeleton className="h-3 w-[120px]" />
          <Skeleton className="h-3 w-[190px]" />
        </div>
        <div
          aria-hidden="true"
          className="overflow-hidden rounded-card border border-border bg-card md:hidden"
        >
          {[0.62, 0.44, 0.7].map((w, i) => (
            <span
              key={i}
              className="flex min-h-12 items-center gap-2.5 border-t border-border px-3.5 first:border-t-0"
            >
              <Skeleton className="size-7 rounded-full" />
              <Skeleton className="h-3" style={{ width: `${w * 100}%` }} />
            </span>
          ))}
        </div>
        <SortSelect order="fit" disabled />
      </div>
      <LoadingRegion label="Loading matches" className="flex flex-col gap-3">
        <span className="flex h-[38px] items-center gap-2.5 pt-2">
          <Skeleton className="size-7 rounded-full" />
          <Skeleton className="h-4 w-[280px] max-w-[70%]" />
        </span>
        <MatchCardSkeleton title="58%" meta="42%" />
        <MatchCardSkeleton title="46%" meta="52%" />
        <div className="max-md:hidden">
          <MatchCardSkeleton title="64%" meta="38%" />
        </div>
      </LoadingRegion>
    </>
  )
}

/** Beside the list on desktop: the predicted total, the six subjects, TOK and EE, the choices. */
function ProfilePanel({ profile }: { profile: MatchesProfile }) {
  return (
    <aside aria-label="Your profile" className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-card border border-border bg-card p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-label text-muted-foreground">Predicted total</span>
            <span className="text-[2.5rem]/11 font-semibold tabular-nums">{profile.total}</span>
          </div>
          <Link
            href={ACADEMIC}
            aria-label="Edit your academic profile"
            className="-mt-1.5 -mr-1 inline-flex h-11 items-center rounded-chip px-1 text-body font-semibold text-primary underline-offset-3 hover:underline"
          >
            Edit
          </Link>
        </div>
        <ul aria-label="Subjects" className="flex flex-col gap-1.5 text-[0.875rem]/5">
          {profile.subjects.map((s) => (
            <li key={`${s.name} ${s.level}`} className="flex justify-between gap-3">
              <span>{s.name}</span>
              <span className="text-muted-foreground tabular-nums">
                {s.level} {s.grade}
              </span>
            </li>
          ))}
          {profile.core && (
            <li className="flex justify-between gap-3 border-t border-border pt-2">
              <span>TOK · EE</span>
              <span className="text-muted-foreground tabular-nums">{profile.core}</span>
            </li>
          )}
        </ul>
        <Choices label="Fields" items={profile.fields} />
        <Choices label="Countries" items={profile.countries} />
      </div>
      <p className="px-1 text-small font-normal text-muted-foreground">
        Requirements are checked for each intake, and a card says so when its figures are from an
        earlier year. Always confirm on the university’s own page before you apply.
      </p>
    </aside>
  )
}

function Choices({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <div className="flex flex-col gap-2">
      <span className="text-label text-muted-foreground">{label}</span>
      <ul aria-label={label} className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li key={item} className="rounded-full bg-muted px-2.5 py-[3px] text-small font-normal">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-3.5 rounded-card border border-border bg-card p-5"
    >
      <Skeleton className="h-2.5 w-[110px]" />
      <Skeleton className="h-9 w-14" />
      {[100, 88, 94, 80, 90, 84].map((w) => (
        <Skeleton key={w} className="h-2.5" style={{ width: `${w}%` }} />
      ))}
      <Skeleton className="h-5.5 w-3/5 rounded-full" />
    </div>
  )
}
