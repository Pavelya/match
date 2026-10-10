'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SaveToggle } from '@/components/ds/SaveToggle'
import { Skeleton, SkeletonLine } from '@/components/ds/Skeleton'
import { RequirementChip, RequirementChipList, StatusBadge } from '@/components/ds/StatusBadge'
import type { MatchItem } from '@/lib/matching/match-groups'
import { WhyThisMatch } from './WhyThisMatch'

/*
 * A program on Matches (rebranding 2.2, canvas boards "D3.1 Match card" and "D3.1 Match card ·
 * phone", approved 10 October 2026). Status first: the badge, then a chip per requirement with
 * the student's own grade, problems first and met ones collapsing into "+N met". The fit score
 * stays inside "Why this match". Names wrap in full, never cut. The title is the card's only
 * link; Tab goes title, Save, "Why this match". Replaces ProgramCard on Matches.
 */

interface MatchCardProps {
  match: MatchItem
  saved: boolean
  saving: boolean
  onToggleSave: () => void
}

export function MatchCard({ match, saved, saving, onToggleSave }: MatchCardProps) {
  const [open, setOpen] = useState(false)
  const panelId = `why-${match.id}`

  return (
    <article className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 text-card-foreground shadow-raised md:gap-3.5 md:px-5 md:py-[18px]">
      <div className="grid grid-cols-[48px_minmax(0,1fr)_44px] items-center gap-3 md:grid-cols-[56px_minmax(0,1fr)_44px] md:gap-3.5">
        <UniversityThumb image={match.image} initials={match.initials} />
        <div className="flex min-w-0 flex-col">
          <h3 className="text-h3">
            <Link
              id={`match-${match.id}`}
              href={`/programs/${match.id}`}
              className="rounded-chip text-foreground underline-offset-3 hover:underline"
            >
              {match.name}
            </Link>
          </h3>
          <span className="text-small font-normal break-words text-muted-foreground">
            {match.university} · {match.country}
          </span>
        </div>
        <SaveToggle
          variant="icon"
          saved={saved}
          saving={saving}
          onToggle={onToggleSave}
          programName={`${match.name}, ${match.university}`}
        />
      </div>

      {/* Phone: badge, chips, then "Why this match". Desktop: the badge with "Why" across
          from it, a line above, then the chips. One button, placed by the grid. */}
      <div className="grid grid-cols-1 items-center gap-3 [grid-template-areas:'badge'_'chips'_'why'] md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-3 md:gap-y-2.5 md:border-t md:border-border md:pt-3.5 md:[grid-template-areas:'badge_why'_'chips_chips']">
        <StatusBadge status={match.status} className="[grid-area:badge]">
          {match.badge}
        </StatusBadge>
        <RequirementChipList className="[grid-area:chips]">
          {match.chips.map((chip, i) => (
            <RequirementChip
              // One course can count for two requirements, so a label can repeat (MAINT 5.18)
              key={i}
              kind={chip.kind}
              spokenKind={!chip.collapsed}
              spokenAfter={chip.spokenAfter}
            >
              {chip.label}
            </RequirementChip>
          ))}
        </RequirementChipList>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          onClick={() => setOpen((o) => !o)}
          className="-mt-1.5 -mb-2.5 inline-flex h-11 items-center gap-1 justify-self-start rounded-chip px-0.5 text-[0.875rem] font-semibold text-primary underline-offset-3 [grid-area:why] hover:underline md:-my-2 md:justify-self-end md:text-small"
        >
          Why this match
          <ChevronDown
            aria-hidden="true"
            size={14}
            strokeWidth={2.2}
            className={cn('transition-transform duration-240 ease-standard', open && 'rotate-180')}
          />
        </button>
      </div>

      {open && (
        <WhyThisMatch id={panelId} programId={match.id} programName={match.name} why={match.why} />
      )}
    </article>
  )
}

/** 56px (48 on a phone). Without an image, the initials on brand-soft, hidden from screen readers. */
function UniversityThumb({ image, initials }: { image: string | null; initials: string }) {
  const [failed, setFailed] = useState(false)
  if (image && !failed) {
    return (
      <Image
        src={image}
        alt=""
        // Fixed size, so 1x and 2x only; a `sizes` would bring the whole device srcset
        width={56}
        height={56}
        onError={() => setFailed(true)}
        className="size-12 rounded-control object-cover md:size-14"
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className="flex size-12 items-center justify-center rounded-control border border-transparent bg-brand-soft text-[0.875rem] font-semibold tracking-[0.02em] text-brand-ink md:size-14 md:text-body"
    >
      {initials}
    </span>
  )
}

/** The card while the list loads (D2.8, D4.6): the size of the card that replaces it. */
export function MatchCardSkeleton({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 shadow-raised md:gap-3.5 md:px-5 md:py-[18px]">
      <div className="grid grid-cols-[48px_minmax(0,1fr)_44px] items-center gap-3 md:grid-cols-[56px_minmax(0,1fr)_44px] md:gap-3.5">
        <Skeleton className="size-12 rounded-control md:size-14" />
        <span className="flex flex-col">
          <SkeletonLine width={title} />
          <SkeletonLine line={18} bar={10} width={meta} />
        </span>
        <span className="size-11" />
      </div>
      <div className="flex flex-col gap-3 md:gap-2.5 md:border-t md:border-border md:pt-3.5">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-7 w-44 rounded-full" />
          <Skeleton className="h-2.5 w-24 max-md:hidden" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-6.5 w-[110px]" />
          <Skeleton className="h-6.5 w-[150px]" />
          <Skeleton className="h-6.5 w-[104px] max-md:hidden" />
        </div>
        <Skeleton className="h-2.5 w-24 md:hidden" />
      </div>
    </div>
  )
}
