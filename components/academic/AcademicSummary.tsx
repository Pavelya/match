import type { MouseEvent, ReactNode } from 'react'
import { CircleAlert, Earth, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ds/button-variants'
import { academicHref, type AcademicScreen, type SubjectLine } from '@/lib/student/academic'

/*
 * The Academic page's summary (rebranding 3.3, boards "D4.11 Academic profile" and "… · phone",
 * approved 18 October 2026): Subjects and grades, then Interests and Countries side by side,
 * stacked on a phone. Nothing here edits; each panel's link opens its own screen. Names wrap,
 * never cut. Not a client module: Academic.tsx renders it inside its own.
 */

export const panelClass = 'rounded-card border border-border bg-card'

/** The panel's link to its screen, for the focus to come back to */
export const editLinkId = (screen: AcademicScreen) => `academic-edit-${screen}`

export interface AcademicSummaryProps {
  subjects: {
    total: number
    /** "36 from subjects, 2 core points" */
    detail: string
    lines: SubjectLine[]
    tok: string | null
    ee: string | null
    /** The first rule a saved profile breaks, in the editor's words */
    problem: string | null
  }
  interests: { count: string; items: { name: string; icon: LucideIcon }[] }
  countries: { count: string; anywhere: boolean; names: string; all: number }
  /** Opens a screen without leaving the page; a link before hydration */
  onOpen: (screen: AcademicScreen, event: MouseEvent<HTMLAnchorElement>) => void
}

function EditLink({
  screen,
  onOpen,
  className,
  children
}: {
  screen: AcademicScreen
  onOpen: AcademicSummaryProps['onOpen']
  className?: string
  children: ReactNode
}) {
  return (
    <a
      id={editLinkId(screen)}
      href={academicHref(screen)}
      onClick={(event) => onOpen(screen, event)}
      className={cn(buttonVariants({ variant: 'secondary' }), 'px-4', className)}
    >
      {children}
    </a>
  )
}

/** A field's icon, or Earth for Open to anywhere, on brand-soft */
function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-[0.5rem] border border-transparent bg-brand-soft text-brand-ink"
    >
      <Icon size={18} strokeWidth={1.75} />
    </span>
  )
}

export function AcademicSummary({ subjects, interests, countries, onOpen }: AcademicSummaryProps) {
  return (
    <>
      <section
        aria-labelledby="academic-subjects"
        className={cn(
          panelClass,
          'flex flex-col gap-4.5 p-4 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-4 md:px-6 md:pt-5 md:pb-6'
        )}
      >
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 id="academic-subjects" className="text-h3">
            Subjects and grades
          </h2>
          <p className="mt-1.5 flex items-baseline gap-2 tabular-nums">
            <span className="font-[family-name:var(--font-newsreader)] text-[2.75rem]/12 font-medium md:text-[3.25rem]/14">
              {subjects.total}
            </span>
            <span className="text-[1.0625rem]/6 text-muted-foreground">points predicted</span>
          </p>
          <p className="text-small font-normal text-muted-foreground tabular-nums">
            {subjects.detail}
          </p>
        </div>
        {/* The panel's one link: top right on desktop, full width at its foot on a phone */}
        <EditLink
          screen="subjects"
          onOpen={onOpen}
          className="order-last w-full md:order-none md:w-auto md:self-start"
        >
          Edit subjects and grades
        </EditLink>
        {subjects.problem && (
          <div className="grid grid-cols-[18px_minmax(0,1fr)] items-start gap-x-2.5 gap-y-0.5 rounded-control border border-border bg-gap-soft px-3.5 py-3 md:col-span-2">
            <CircleAlert
              aria-hidden="true"
              size={18}
              strokeWidth={2}
              className="mt-0.5 shrink-0 text-gap"
            />
            <p className="text-[0.9375rem]/[1.375rem] font-semibold text-gap">{subjects.problem}</p>
            <p className="col-start-2 text-small font-normal text-foreground">
              Your matches use these grades until you change them.
            </p>
          </div>
        )}
        <div className="flex flex-col gap-2.5 md:col-span-2">
          <h3 className="text-label text-muted-foreground">Your six subjects</h3>
          <ul className="grid grid-cols-1 border-t border-border md:grid-cols-2 md:gap-x-8">
            {subjects.lines.map((line) => (
              <li
                key={line.name}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 border-b border-border py-2.5 text-[0.9375rem]/[1.375rem]"
              >
                <span className="break-words">{line.name}</span>
                <span className="whitespace-nowrap tabular-nums">
                  <span aria-hidden="true">
                    <span className="text-muted-foreground">{line.level}</span>{' '}
                    <strong className="font-semibold">{line.grade}</strong>
                  </span>
                  <span className="sr-only">, {line.said}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="text-[0.9375rem]/[1.375rem] tabular-nums">
            <span className="text-muted-foreground">Theory of Knowledge</span>{' '}
            <strong className="font-semibold">{subjects.tok}</strong>
            <span aria-hidden="true" className="text-ink-3">
              {' · '}
            </span>
            <span className="text-muted-foreground">Extended Essay</span>{' '}
            <strong className="font-semibold">{subjects.ee}</strong>
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <section
          aria-labelledby="academic-interests"
          className={cn(panelClass, 'flex flex-col gap-4 p-4 md:px-6 md:pt-5 md:pb-6')}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h2 id="academic-interests" className="text-h3">
              Interests
            </h2>
            <span className="text-small font-normal text-muted-foreground tabular-nums">
              {interests.count}
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {interests.items.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-3 text-[0.9375rem]/[1.375rem] font-medium"
              >
                <IconTile icon={item.icon} />
                {item.name}
              </li>
            ))}
          </ul>
          <EditLink
            screen="interests"
            onOpen={onOpen}
            className="w-full md:mt-auto md:w-auto md:self-start"
          >
            Edit interests
          </EditLink>
        </section>

        <section
          aria-labelledby="academic-countries"
          className={cn(panelClass, 'flex flex-col gap-4 p-4 md:px-6 md:pt-5 md:pb-6')}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h2 id="academic-countries" className="text-h3">
              Countries
            </h2>
            {countries.count && (
              <span className="text-small font-normal text-muted-foreground tabular-nums">
                {countries.count}
              </span>
            )}
          </div>
          {countries.anywhere ? (
            <p className="flex items-center gap-3 text-[0.9375rem]/[1.375rem] font-medium">
              <IconTile icon={Earth} />
              <span className="flex flex-col">
                <span>Open to anywhere</span>
                <span className="text-small font-normal text-muted-foreground">
                  Programs in all {countries.all} countries
                </span>
              </span>
            </p>
          ) : (
            <p className="text-body">{countries.names}</p>
          )}
          <EditLink
            screen="countries"
            onOpen={onOpen}
            className="w-full md:mt-auto md:w-auto md:self-start"
          >
            Edit countries
          </EditLink>
        </section>
      </div>
    </>
  )
}
