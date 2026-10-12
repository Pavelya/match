import Link from 'next/link'
import { cn } from '@/lib/utils'
import { plural, type FieldGroup } from '@/lib/universities/details'

interface ListedProgram {
  id: string
  name: string
  degreeType: string
  duration: string
  minIBPoints: number | null
  campusCity: string | null
}

/**
 * Every program a university has on IB Match, by field (rebranding 2.4, board "D4.9 University
 * page"): links to the fields when there is more than one, then an h3 per field and its programs
 * A–Z. The name is a row's only link; then degree, length and the minimum, "None" for a program
 * that sets none. A program taught away from the university's city says where. From 768px the
 * values sit in columns under headings drawn for sighted readers, each value naming itself to a
 * screen reader; on a phone a row is two lines, the minimum on the right.
 */
export function ProgramsByField({
  groups,
  universityCity
}: {
  groups: FieldGroup<ListedProgram>[]
  universityCity: string
}) {
  return (
    <>
      {groups.length > 1 && (
        <nav aria-label="Fields">
          <ul className="flex flex-wrap gap-2">
            {groups.map((group) => (
              <li key={group.anchor}>
                <a
                  href={`#${group.anchor}`}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-line-2 bg-card pr-3 pl-3.5 text-body font-medium whitespace-nowrap text-foreground transition-[border-color] duration-180 ease-standard hover:border-line-3"
                >
                  {group.name}
                  <span
                    aria-hidden="true"
                    className="text-small text-muted-foreground tabular-nums"
                  >
                    {group.programs.length}
                  </span>
                  <span className="sr-only">, {plural(group.programs.length, 'program')}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div
        aria-hidden="true"
        className="grid grid-cols-[minmax(0,1fr)_210px_72px_96px] gap-x-4 px-5.25 pt-1 text-label text-muted-foreground max-md:hidden"
      >
        <span>Program</span>
        <span>Degree</span>
        <span>Length</span>
        <span className="text-right">IB minimum</span>
      </div>

      {groups.map((group) => (
        <section key={group.anchor} aria-labelledby={group.anchor} className="flex flex-col gap-2">
          <h3 id={group.anchor} className="flex scroll-mt-4 items-baseline gap-2 text-h3">
            {group.name}
            <span className="text-small text-muted-foreground tabular-nums">
              {group.programs.length}
              <span className="sr-only">
                {' '}
                {group.programs.length === 1 ? 'program' : 'programs'}
              </span>
            </span>
          </h3>
          <ul className="overflow-hidden rounded-card border border-border bg-card">
            {group.programs.map((program) => (
              <ProgramRow
                key={program.id}
                program={program}
                campus={
                  program.campusCity && program.campusCity !== universityCity
                    ? program.campusCity
                    : null
                }
              />
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}

/**
 * One program. On a phone the degree, length and campus share the second line; from 768px the
 * wrapper steps aside (`contents`) and they take their columns, the campus under the name.
 */
function ProgramRow({ program, campus }: { program: ListedProgram; campus: string | null }) {
  const none = program.minIBPoints === null
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 border-t border-border px-3.5 py-2.5 first:border-t-0 md:grid-cols-[minmax(0,1fr)_210px_72px_96px] md:items-center md:gap-x-4 md:px-5 md:py-3">
      <Link
        href={`/programs/${program.id}`}
        className="rounded-chip text-body font-semibold break-words text-foreground underline-offset-3 hover:underline md:col-start-1 md:row-start-1"
      >
        {program.name}
      </Link>
      <span className="col-start-1 row-start-2 text-small font-normal text-muted-foreground md:contents">
        <span className="md:col-start-2 md:row-span-2 md:row-start-1 md:text-[0.9375rem]/[1.375rem]">
          <span className="sr-only">Degree: </span>
          {program.degreeType}
        </span>
        <span aria-hidden="true" className="md:hidden">
          {' · '}
        </span>
        <span className="tabular-nums md:col-start-3 md:row-span-2 md:row-start-1 md:text-body">
          <span className="sr-only">Length: </span>
          {program.duration}
        </span>
        {campus && (
          <span className="md:col-start-1 md:row-start-2">
            <span aria-hidden="true" className="md:hidden">
              {' · '}
            </span>
            {/* "· taught in Reims" on the phone's second line, "Taught in Reims" under the name */}
            <span className="md:hidden">taught</span>
            <span className="max-md:hidden">Taught</span> in {campus}
          </span>
        )}
      </span>
      <span
        className={cn(
          'col-start-2 row-span-2 row-start-1 text-right font-semibold tabular-nums md:col-start-4',
          none ? 'text-body text-muted-foreground' : 'text-[1.0625rem]/6 text-foreground'
        )}
      >
        <span className="sr-only">IB minimum: </span>
        {none ? 'None' : program.minIBPoints}
      </span>
    </li>
  )
}
