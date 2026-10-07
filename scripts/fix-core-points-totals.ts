/**
 * Correct stored IB totals the old TOK/EE formula got wrong (MAINT 5.8)
 *
 * Onboarding scored the core as min(3, max(0, TOK + EE - 6)) with A=5 … E=1, which is one
 * point low for several grade pairs, and the coordinator form as min(3, TOK + EE) with
 * A=3 … D=0, which is high for others. Matching reads the stored total. This recomputes
 * totalIBPoints from the IB core points matrix (lib/ib/core-points.ts) for every profile
 * with six courses and both core grades, and changes only those whose stored total differs.
 *
 * Dry run by default. It lists every change, then reports without changing anything:
 * profiles with an E in TOK or the EE, and six-course profiles by number of HL subjects
 * (MAINT 5.13: 3 or 4 is required). Both now block saving.
 *
 * --apply first saves a backup of each row it changes (scripts/backups/, git-ignored: it
 * holds student totals), then writes them in one transaction and clears every cached match,
 * since matching used the old totals. Re-running is safe: it plans from what is stored.
 *
 * .env points at PRODUCTION. Show the dry run to the owner and get approval before --apply.
 *
 * Run with:
 *   npx tsx scripts/fix-core-points-totals.ts                              # dry run
 *   npx tsx scripts/fix-core-points-totals.ts --apply
 *   npx tsx scripts/fix-core-points-totals.ts --restore <backup.json> [--apply]
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { prisma } from '@/lib/prisma-standalone'
import { clearAllMatchCache } from '@/lib/matching/cache'
import { calculateTotalPoints, DIPLOMA_SUBJECT_COUNT } from '@/lib/ib/diploma'

const BACKUP_DIR = path.join(__dirname, 'backups', 'fix-core-points-totals')

interface Change {
  id: string
  tokGrade: string
  eeGrade: string
  from: number | null
  to: number
}

interface Backup {
  takenAt: string
  rows: { id: string; totalIBPoints: number | null }[]
}

function parseArgs(argv: string[]) {
  const args = { apply: false, restore: null as string | null }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--apply') args.apply = true
    else if (arg === '--restore') args.restore = argv[++i] ?? null
    else throw new Error(`Unknown argument: ${arg}`)
  }
  return args
}

/** Profiles with six courses and both core grades whose stored total is off the matrix. */
async function planChanges(): Promise<{ checked: number; changes: Change[] }> {
  const profiles = await prisma.studentProfile.findMany({
    where: { tokGrade: { not: null }, eeGrade: { not: null } },
    select: {
      id: true,
      totalIBPoints: true,
      tokGrade: true,
      eeGrade: true,
      courses: { select: { level: true, grade: true } }
    }
  })

  let checked = 0
  const changes: Change[] = []
  for (const p of profiles) {
    if (p.courses.length !== DIPLOMA_SUBJECT_COUNT) continue
    checked++
    // Null for an E: no total to correct, and it is reported below.
    const expected = calculateTotalPoints(p.courses, p.tokGrade, p.eeGrade)
    if (expected !== null && expected !== p.totalIBPoints) {
      changes.push({
        id: p.id,
        tokGrade: p.tokGrade!,
        eeGrade: p.eeGrade!,
        from: p.totalIBPoints,
        to: expected
      })
    }
  }
  return { checked, changes }
}

function printChanges(checked: number, changes: Change[]) {
  console.log(
    `\n${checked} profiles have six courses and both core grades; ` +
      `${changes.length} store a total off the core points matrix.\n`
  )
  for (const c of changes) {
    console.log(`  ${c.id}  TOK ${c.tokGrade} / EE ${c.eeGrade}  ${c.from} → ${c.to}`)
  }

  const byPair = new Map<string, { count: number; deltas: Set<string> }>()
  for (const c of changes) {
    const key = `TOK ${c.tokGrade} / EE ${c.eeGrade}`
    const entry = byPair.get(key) ?? { count: 0, deltas: new Set<string>() }
    entry.count++
    entry.deltas.add(
      c.from === null ? 'from none' : `${c.to - c.from > 0 ? '+' : ''}${c.to - c.from}`
    )
    byPair.set(key, entry)
  }
  if (byPair.size > 0) console.log('\nBy grade pair:')
  for (const [key, { count, deltas }] of byPair) {
    console.log(`  ${key}: ${count} profile${count === 1 ? '' : 's'}, ${[...deltas].join(', ')}`)
  }

  const unexpected = changes.filter((c) => c.from === null || c.to - c.from !== 1)
  if (unexpected.length > 0) {
    console.log(
      `\n⚠️  ${unexpected.length} change${unexpected.length === 1 ? ' is' : 's are'} not +1. ` +
        'The old onboarding formula was only ever one point low: check these before --apply.'
    )
  }
}

/** Counts only: what the new save rules would block. Nothing here is changed. */
async function printBlockedCounts() {
  const failingCore = await prisma.studentProfile.count({
    where: { OR: [{ tokGrade: 'E' }, { eeGrade: 'E' }] }
  })
  const hlRows = await prisma.$queryRaw<{ hl: bigint; profiles: bigint }[]>`
    SELECT hl, count(*) AS profiles
    FROM (
      SELECT count(*) FILTER (WHERE level = 'HL') AS hl
      FROM "StudentCourse"
      GROUP BY "studentProfileId"
      HAVING count(*) = 6
    ) per_profile
    GROUP BY hl
    ORDER BY hl`

  console.log('\nReported only, not changed (each now blocks saving until fixed):')
  console.log(`  Profiles with an E in TOK or the EE: ${failingCore}`)
  console.log('  Six-course profiles by number of HL subjects:')
  for (const row of hlRows) {
    const ok = row.hl === BigInt(3) || row.hl === BigInt(4)
    console.log(`    ${row.hl} HL: ${row.profiles}${ok ? '' : '  ← blocked'}`)
  }
}

async function restore(file: string, apply: boolean) {
  const backup = JSON.parse(readFileSync(file, 'utf8')) as Backup
  console.log(`${backup.rows.length} totals from ${backup.takenAt}.`)
  if (!apply) {
    console.log('\nDry run: nothing written. Re-run with --apply to restore.\n')
    return
  }
  await prisma.$transaction(
    backup.rows.map(({ id, totalIBPoints }) =>
      prisma.studentProfile.update({ where: { id }, data: { totalIBPoints } })
    )
  )
  await clearAllMatchCache()
  console.log(`✅ Restored ${backup.rows.length} totals; match cache cleared.\n`)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.restore) return restore(args.restore, args.apply)

  const { checked, changes } = await planChanges()
  printChanges(checked, changes)
  await printBlockedCounts()

  if (!args.apply) {
    console.log('\nDry run: nothing written. Re-run with --apply to write.\n')
    return
  }
  if (changes.length === 0) {
    console.log('\nNothing to write.\n')
    return
  }

  const backup: Backup = {
    takenAt: new Date().toISOString(),
    rows: changes.map((c) => ({ id: c.id, totalIBPoints: c.from }))
  }
  mkdirSync(BACKUP_DIR, { recursive: true })
  const backupFile = path.join(BACKUP_DIR, `${backup.takenAt.replace(/[:.]/g, '-')}.json`)
  writeFileSync(backupFile, JSON.stringify(backup, null, 2))
  console.log(`\n💾 Backup: ${path.relative(process.cwd(), backupFile)}`)

  // Each update matches the total it planned from, so a row saved since rolls everything back.
  await prisma.$transaction(async (tx) => {
    for (const c of changes) {
      const { count } = await tx.studentProfile.updateMany({
        where: { id: c.id, totalIBPoints: c.from },
        data: { totalIBPoints: c.to }
      })
      if (count !== 1) throw new Error(`${c.id} changed since the plan; nothing was written`)
    }
  })
  console.log(`✅ Corrected ${changes.length} totals.`)

  await clearAllMatchCache()
  console.log('🗑️  Match cache cleared.')

  const after = await planChanges()
  console.log(`🔎 Off the matrix now: ${after.changes.length} of ${after.checked}.\n`)
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
