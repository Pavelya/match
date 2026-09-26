/**
 * Backfill `requirementsEntryYear`, the intake each program was checked for (content 3.1)
 *
 * What is known about each program today:
 *   - Oxford and Cambridge programs written by apply-2027-requirements.ts: the year each
 *     row's source names, else the file's `undatedEntryYear` — `checkedEntryYear`, exactly
 *     as that script stamps them. Held rows were never written there and fall to the next rule.
 *   - Every other program verified in January–February 2026 was checked for 2026 entry: 2026.
 *   - Programs never verified stay empty; their page says they have not been checked.
 * A verified program that fits neither rule is listed and left empty.
 *
 * Writes only rows whose entry year is still empty, so it never overwrites a later stamp and
 * can be re-run. Every row it writes was empty, so the undo is setting those back to NULL.
 * Raw SQL, not `updateMany`, so `updatedAt` stays put: the sitemap gives it as each program
 * page's last modification, and no requirement changes here. Neither Algolia nor the
 * programs cache carries the field, so nothing needs syncing.
 *
 * .env points at PRODUCTION. Show the dry run to the owner and get approval before --apply.
 *
 * Run with:
 *   npx tsx scripts/programs/backfill-entry-year.ts            # dry run
 *   npx tsx scripts/programs/backfill-entry-year.ts --apply
 */

import { prisma } from '@/lib/prisma-standalone'
import { checkedEntryYear, type UniversityUpdate } from './2027/types'
import oxford from './2027/university-of-oxford'
import cambridge from './2027/university-of-cambridge'

const DATA_FILES: UniversityUpdate[] = [oxford, cambridge]

/** The first data entry: verified in January–February 2026, for 2026 entry. */
const FIRST_CHECK = {
  from: new Date('2026-01-01T00:00:00Z'),
  to: new Date('2026-03-01T00:00:00Z'),
  entryYear: 2026
}

interface Counts {
  programs: number
  stamp: Map<number, number>
  neverVerified: number
  alreadyStamped: number
}

function parseArgs(argv: string[]) {
  const args = { apply: false }
  for (const arg of argv) {
    if (arg === '--apply') args.apply = true
    else throw new Error(`Unknown argument: ${arg}`)
  }
  return args
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  console.log(`\n${args.apply ? '✏️  WRITING' : '🔍 DRY RUN'} — backfill requirementsEntryYear\n`)

  const programs = await prisma.academicProgram.findMany({
    select: {
      id: true,
      name: true,
      requirementsVerified: true,
      requirementsUpdatedAt: true,
      requirementsEntryYear: true,
      university: { select: { name: true } }
    }
  })
  const byId = new Map(programs.map((p) => [p.id, p]))

  // Oxford and Cambridge: the rows the apply script has written, and the year it stamps.
  const fromFiles = new Map<string, number>()
  const errors: string[] = []
  for (const file of DATA_FILES) {
    const checkedOn = new Date(`${file.checkedOn}T00:00:00Z`)
    for (const row of file.programs) {
      const stored = byId.get(row.id)
      if (!stored) {
        errors.push(`${file.university} — ${row.name} (${row.id}): not in the database`)
        continue
      }
      if (stored.university.name !== file.university) {
        errors.push(`${row.name} (${row.id}): belongs to ${stored.university.name}`)
        continue
      }
      const written =
        !row.hold &&
        stored.requirementsVerified &&
        stored.requirementsUpdatedAt !== null &&
        stored.requirementsUpdatedAt >= checkedOn
      if (written) fromFiles.set(row.id, checkedEntryYear(file, row))
    }
  }
  if (errors.length > 0) {
    console.error(`❌ Nothing written. Fix these first:\n  ${errors.join('\n  ')}\n`)
    process.exit(1)
  }

  // Decide every program.
  const toStamp = new Map<number, string[]>()
  const counts = new Map<string, Counts>()
  const unexplained: string[] = []
  const namedFromFiles: Array<{ university: string; name: string; year: number }> = []
  for (const p of programs) {
    const university = p.university.name
    const c = counts.get(university) ?? {
      programs: 0,
      stamp: new Map<number, number>(),
      neverVerified: 0,
      alreadyStamped: 0
    }
    counts.set(university, c)
    c.programs++

    let year: number | null = null
    if (fromFiles.has(p.id)) {
      year = fromFiles.get(p.id)!
    } else if (
      p.requirementsVerified &&
      p.requirementsUpdatedAt !== null &&
      p.requirementsUpdatedAt >= FIRST_CHECK.from &&
      p.requirementsUpdatedAt < FIRST_CHECK.to
    ) {
      year = FIRST_CHECK.entryYear
    } else if (p.requirementsVerified) {
      unexplained.push(
        `${university} — ${p.name} (${p.id}), verified ${p.requirementsUpdatedAt?.toISOString() ?? 'with no date'}`
      )
    } else {
      c.neverVerified++
    }
    if (year === null) continue

    if (p.requirementsEntryYear !== null) {
      c.alreadyStamped++
      continue
    }
    c.stamp.set(year, (c.stamp.get(year) ?? 0) + 1)
    toStamp.set(year, [...(toStamp.get(year) ?? []), p.id])
    if (fromFiles.has(p.id)) namedFromFiles.push({ university, name: p.name, year })
  }

  // Report.
  const years = [...toStamp.keys()].sort((a, b) => b - a)
  const pad = (s: string | number, n: number) => String(s).padStart(n)
  console.log(
    `${'University'.padEnd(52)}${pad('Programs', 9)}${years.map((y) => pad(`→ ${y}`, 8)).join('')}` +
      `${pad('Never verified', 16)}${pad('Already set', 13)}`
  )
  for (const [university, c] of [...counts].sort(([a], [b]) => a.localeCompare(b))) {
    console.log(
      `${university.slice(0, 51).padEnd(52)}${pad(c.programs, 9)}` +
        `${years.map((y) => pad(c.stamp.get(y) ?? '', 8)).join('')}` +
        `${pad(c.neverVerified || '', 16)}${pad(c.alreadyStamped || '', 13)}`
    )
  }
  const total = (f: (c: Counts) => number) => [...counts.values()].reduce((n, c) => n + f(c), 0)
  console.log(
    `${'Total'.padEnd(52)}${pad(programs.length, 9)}` +
      `${years.map((y) => pad(toStamp.get(y)!.length, 8)).join('')}` +
      `${pad(
        total((c) => c.neverVerified),
        16
      )}${pad(
        total((c) => c.alreadyStamped),
        13
      )}`
  )

  console.log('\nOxford and Cambridge, from the 2027 data files:')
  for (const year of years) {
    const rows = namedFromFiles
      .filter((r) => r.year === year)
      .sort((a, b) => a.university.localeCompare(b.university) || a.name.localeCompare(b.name))
    if (rows.length === 0) continue
    console.log(`  ${year} (${rows.length})`)
    for (const r of rows) console.log(`    ${r.university} — ${r.name}`)
  }

  if (unexplained.length > 0) {
    console.log(`\nVerified but fitting no rule, left empty (${unexplained.length}):`)
    for (const line of unexplained) console.log(`  ${line}`)
  }

  // The same WHERE clause the write uses, as a count: what --apply would change.
  for (const year of years) {
    const ids = toStamp.get(year)!
    const [{ n }] = await prisma.$queryRaw<Array<{ n: number }>>`
      SELECT count(*)::int AS n FROM "AcademicProgram"
      WHERE id = ANY(${ids}) AND "requirementsEntryYear" IS NULL`
    console.log(`\n${year}: ${n} rows to write`)
  }

  if (!args.apply) {
    console.log('\nDry run: nothing written. Re-run with --apply to write.\n')
    return
  }
  if (years.length === 0) {
    console.log('\nNothing to write.\n')
    return
  }

  const written = await prisma.$transaction(
    years.map(
      (year) => prisma.$executeRaw`
        UPDATE "AcademicProgram" SET "requirementsEntryYear" = ${year}
        WHERE id = ANY(${toStamp.get(year)!}) AND "requirementsEntryYear" IS NULL`
    )
  )
  console.log(`\n✅ Wrote ${written.reduce((a, b) => a + b, 0)} programs.`)

  const result = await prisma.$queryRaw<Array<{ year: number | null; n: number }>>`
    SELECT "requirementsEntryYear" AS year, count(*)::int AS n
    FROM "AcademicProgram" GROUP BY 1 ORDER BY 1 DESC NULLS LAST`
  console.log('\nrequirementsEntryYear now:')
  for (const { year, n } of result) console.log(`  ${year ?? 'empty'}: ${n}`)
  console.log()
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
    process.exit()
  })
