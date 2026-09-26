import type { DegreeType } from '@/lib/programs/degree-types'
import { defsFromRows } from './requirements-diff'
import type { RefreshFile, RefreshProgram, StoredProgram } from './refresh'

/**
 * `refresh.ts --export`: a university's stored programs as a starter data file. Pure, so the
 * round trip (export, then plan against the same programs: no changes) is unit-tested.
 */

/** `Universitat Autònoma de Barcelona` → `universitat-autonoma-de-barcelona`. */
export function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * A stored program as the file writes it: unchecked, no sources, and the canonical spelling of
 * its degree. A stored spelling outside the list is kept, and fails the type check until fixed.
 */
export function exportProgram(
  s: StoredProgram,
  canonicalDegree: (value: string) => string | null
): RefreshProgram {
  return {
    id: s.id,
    status: 'current',
    name: s.state.name,
    description: s.state.description,
    field: s.state.field,
    degree: (canonicalDegree(s.state.degreeType) ?? s.state.degreeType) as DegreeType,
    duration: s.state.duration,
    minIBPoints: s.state.minIBPoints,
    programUrl: s.state.programUrl,
    requirements: defsFromRows(s.state.requirements),
    checkedFor: null,
    sources: []
  }
}

export function exportFile(
  university: string,
  entryYear: number,
  checkedOn: string,
  programs: StoredProgram[],
  canonicalDegree: (value: string) => string | null
): RefreshFile {
  return {
    university,
    entryYear,
    checkedOn,
    programs: [...programs]
      .sort((a, b) => a.state.name.localeCompare(b.state.name) || a.id.localeCompare(b.id))
      .map((p) => exportProgram(p, canonicalDegree))
  }
}

/** The line above each program: what was stored when it was exported. */
export function storedComment(
  s: StoredProgram,
  canonicalDegree: (value: string) => string | null
): string {
  const { requirementsEntryYear: year, requirementsUpdatedAt: on } = s.stamps
  const parts = [
    year === null
      ? 'Stored: not checked for any intake.'
      : `Stored: checked for ${year} entry on ${on?.toISOString().slice(0, 10) ?? 'an unknown date'}.`
  ]
  const degree = canonicalDegree(s.state.degreeType)
  if (degree !== s.state.degreeType) {
    parts.push(
      degree === null
        ? `Degree "${s.state.degreeType}" is not in the list: choose one from lib/programs/degree-types.ts.`
        : `Degree stored as "${s.state.degreeType}".`
    )
  }
  return parts.join(' ')
}

const IDENTIFIER = /^[A-Za-z_$][\w$]*$/

/** A value as a JavaScript literal. Prettier formats the result. */
function literal(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map(literal).join(', ')}]`
  const entries = Object.entries(value).filter(([, v]) => v !== undefined)
  return `{ ${entries
    .map(([k, v]) => `${IDENTIFIER.test(k) ? k : JSON.stringify(k)}: ${literal(v)}`)
    .join(', ')} }`
}

/**
 * The data file's source text. `comments` maps a program id to the line written above it.
 * `command` is how to dry-run the file, for its header.
 */
export function renderRefreshFile(
  file: RefreshFile,
  comments: ReadonlyMap<string, string>,
  command: string
): string {
  const programs = file.programs.map((p) => {
    const comment = p.id ? comments.get(p.id) : undefined
    return `${comment ? `// ${comment}\n` : ''}${literal(p)}`
  })
  return `import type { RefreshFile } from '../lib/refresh'

/**
 * ${file.university}: requirements for ${file.entryYear} entry.
 *
 * Exported from the database on ${file.checkedOn} by scripts/programs/refresh.ts. For each program,
 * read the university's official pages for ${file.entryYear} entry (a university-wide IB page first),
 * correct what changed, list the pages in \`sources\` and set \`checkedFor\` to the intake they
 * state: the previous one if they name none. Put a typical offer above the minimum, or "checked,
 * none required", in \`notes\`. Programs left at \`checkedFor: null\` are not written, so set
 * \`checkedOn\` to the day the pages were read. Mark a program the university no longer offers
 * \`discontinued\`, and add one it now offers with status \`new\` and no id. The comment above
 * each program is what was stored at export.
 *
 * Dry run: ${command}
 */
const refresh: RefreshFile = {
  university: ${JSON.stringify(file.university)},
  entryYear: ${file.entryYear},
  checkedOn: ${JSON.stringify(file.checkedOn)},
  programs: [
${programs.join(',\n')}
  ]
}

export default refresh
`
}
