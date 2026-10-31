import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

// Every admin and coordinator page checks access for itself, as the first thing it does (SEC-1).
// The layout's check does not cover the pages under it (lib/auth/guards.ts), so a new page without
// its own check fails here.

/** The files under a directory that render a route segment */
function segmentFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile() && /^(page|layout|template|default)\.tsx$/.test(entry.name))
    .map((entry) => path.join(entry.parentPath, entry.name))
    .sort()
}

/** The first `await` in the default export, which must be the check */
function firstAwait(file: string): string | null {
  const source = readFileSync(file, 'utf8')
  const start = source.search(/^export default /m)
  if (start === -1) return null
  return source.slice(start).match(/await\s+[\w.]+\([^)]*\)/)?.[0] ?? null
}

const AREAS = [
  { dir: 'app/admin', page: 'await requireAdmin()', layout: 'await requireAdmin()' },
  {
    dir: 'app/coordinator',
    page: 'await requireCoordinator()',
    // The layout shows a revoked coordinator "Access revoked"; its pages refuse them
    layout: 'await readCoordinator()'
  }
]

describe.each(AREAS)('$dir', ({ dir, page, layout }) => {
  const files = segmentFiles(path.join(process.cwd(), dir))

  it('has pages to check', () => {
    expect(files.length).toBeGreaterThan(10)
  })

  it.each(files.map((file) => [path.relative(process.cwd(), file)]))(
    '%s checks access before anything else',
    (file) => {
      const expected = path.basename(file) === 'layout.tsx' ? layout : page
      expect(firstAwait(file)).toBe(expected)
    }
  )
})
