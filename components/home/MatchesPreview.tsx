import { Bookmark, ChevronDown } from 'lucide-react'
import { RequirementChip, RequirementChipList, StatusBadge } from '@/components/ds/StatusBadge'
import { PREVIEW_MATCHES, PREVIEW_POINTS, type PreviewMatch } from './preview-matches'

/*
 * Home's product preview (rebranding 4.1, board "D4.1 Home"): three match cards as D3.1 draws
 * them on a phone, on a sunken panel. A picture of the product, not the product: the panel is
 * inert, so it has no Tab stops and screen readers get the caption instead. The names are not
 * headings, so the page keeps one h1 and an h2 per section. Initials tiles, never photos, so
 * Home asks Supabase for nothing. A server component: no JavaScript reaches the browser.
 */
export function MatchesPreview() {
  return (
    <figure className="flex max-w-140 min-w-0 flex-col gap-2.5">
      <div
        inert
        className="flex flex-col gap-3 rounded-sheet border border-border bg-muted p-3 md:p-5"
      >
        <div className="flex items-baseline justify-between gap-3 px-1">
          <span className="text-body font-semibold">Your matches</span>
          <span className="text-small font-normal text-muted-foreground tabular-nums">
            {PREVIEW_POINTS} points predicted
          </span>
        </div>
        {PREVIEW_MATCHES.map((match) => (
          <PreviewCard key={match.name} match={match} />
        ))}
      </div>
      <figcaption className="text-small font-normal text-muted-foreground">
        Three matches for a student with {PREVIEW_POINTS} points, from each program’s published
        entry requirements.
      </figcaption>
    </figure>
  )
}

/** MatchCard's phone layout (components/match/MatchCard.tsx), drawn without its controls. */
function PreviewCard({ match }: { match: PreviewMatch }) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-border bg-card p-4 text-card-foreground shadow-raised">
      <div className="grid grid-cols-[48px_minmax(0,1fr)_44px] items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-control border border-transparent bg-brand-soft text-[0.875rem] font-semibold tracking-[0.02em] text-brand-ink">
          {match.initials}
        </span>
        <div className="flex min-w-0 flex-col">
          <p className="text-h3">{match.name}</p>
          <span className="text-small font-normal break-words text-muted-foreground">
            {match.university} · {match.country}
          </span>
        </div>
        <span className="inline-flex size-11 items-center justify-center text-foreground">
          <Bookmark aria-hidden="true" size={20} strokeWidth={2} />
        </span>
      </div>
      <StatusBadge status={match.status}>{match.badge}</StatusBadge>
      <RequirementChipList>
        {match.chips.map((chip) => (
          <RequirementChip key={chip.label} kind={chip.kind}>
            {chip.label}
          </RequirementChip>
        ))}
      </RequirementChipList>
      <span className="inline-flex items-center gap-1 self-start text-[0.875rem]/5 font-semibold text-primary">
        Why this match
        <ChevronDown aria-hidden="true" size={14} strokeWidth={2.2} />
      </span>
    </div>
  )
}
