/**
 * Apply checked 2027-entry requirements to existing programs
 *
 * Reads the data files in scripts/programs/2027/, compares each program with the
 * database and prints what would change. Nothing is written without --apply.
 *
 * With --apply it first saves a backup of every program it will write, then writes one
 * transaction per program: points, name and URL, the subject requirements (replaced as a
 * set, as the admin form does), and the stamps `requirementsVerified = true` and
 * `requirementsUpdatedAt = checkedOn`. It finishes by syncing the written programs to
 * Algolia and invalidating the programs cache, which the standalone Prisma client does not
 * do on its own.
 *
 * Rows with a `hold` are skipped: the owner has not confirmed them yet. Clear the `hold`
 * in the data file once they have.
 *
 * .env points at PRODUCTION. Show the dry run to the owner and get approval before --apply.
 *
 * Run with:
 *   npx tsx scripts/programs/apply-2027-requirements.ts                        # dry run
 *   npx tsx scripts/programs/apply-2027-requirements.ts --only university-of-cambridge
 *   npx tsx scripts/programs/apply-2027-requirements.ts --apply
 *   npx tsx scripts/programs/apply-2027-requirements.ts --restore <backup.json> [--apply]
 */

import { randomUUID } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma-standalone'
import { syncProgramsBatch } from '@/lib/algolia/sync'
import { invalidateProgramsCache } from '@/lib/matching/program-cache'
import {
  assignGroupIds,
  diffProgram,
  rowsFromDefs,
  sameRequirements,
  type ProgramState,
  type RequirementRow
} from './lib/requirements-diff'
import type { UniversityUpdate } from './2027/types'
import oxford from './2027/university-of-oxford'
import cambridge from './2027/university-of-cambridge'

const DATA_FILES: Record<string, UniversityUpdate> = {
  'university-of-oxford': oxford,
  'university-of-cambridge': cambridge
}

const BACKUP_DIR = path.join(__dirname, '2027', 'backups')

interface Stamps {
  requirementsVerified: boolean
  requirementsUpdatedAt: Date | null
}

/** One program's intended state, from a data file or a backup. */
interface Target {
  id: string
  university: string
  /** Names the stored program may have; anything else means it changed since it was checked. */
  expectedNames: string[] | null
  state: ProgramState
  stamps: Stamps
}

interface Held {
  university: string
  name: string
  reason: string
}

interface BackupProgram extends ProgramState, Omit<Stamps, 'requirementsUpdatedAt'> {
  id: string
  university: string
  requirementsUpdatedAt: string | null
}

interface Backup {
  takenAt: string
  programs: BackupProgram[]
}

function parseArgs(argv: string[]) {
  const args = { apply: false, only: null as string | null, restore: null as string | null }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--apply') args.apply = true
    else if (arg === '--only') args.only = argv[++i] ?? null
    else if (arg === '--restore') args.restore = argv[++i] ?? null
    else throw new Error(`Unknown argument: ${arg}`)
  }
  if (args.only && !DATA_FILES[args.only]) {
    throw new Error(`--only takes one of: ${Object.keys(DATA_FILES).join(', ')}`)
  }
  if (args.restore && args.only) throw new Error('--restore and --only cannot be combined')
  return args
}

function targetsFromDataFiles(only: string | null): { targets: Target[]; held: Held[] } {
  const targets: Target[] = []
  const held: Held[] = []
  for (const [slug, file] of Object.entries(DATA_FILES)) {
    if (only && slug !== only) continue
    const checkedOn = new Date(`${file.checkedOn}T00:00:00Z`)
    for (const p of file.programs) {
      if (p.hold) {
        held.push({ university: file.university, name: p.name, reason: p.hold })
        continue
      }
      targets.push({
        id: p.id,
        university: file.university,
        expectedNames: p.rename ? [p.name, p.rename] : [p.name],
        state: {
          name: p.rename ?? p.name,
          // Filled in from the database below when the file does not change it.
          programUrl: p.programUrl ?? null,
          minIBPoints: p.minIBPoints,
          requirements: rowsFromDefs(p.requirements)
        },
        stamps: { requirementsVerified: true, requirementsUpdatedAt: checkedOn }
      })
    }
  }
  return { targets, held }
}

function targetsFromBackup(file: string): Target[] {
  const backup = JSON.parse(readFileSync(file, 'utf8')) as Backup
  return backup.programs.map((p) => ({
    id: p.id,
    university: p.university,
    expectedNames: null,
    state: {
      name: p.name,
      programUrl: p.programUrl,
      minIBPoints: p.minIBPoints,
      requirements: p.requirements
    },
    stamps: {
      requirementsVerified: p.requirementsVerified,
      requirementsUpdatedAt: p.requirementsUpdatedAt ? new Date(p.requirementsUpdatedAt) : null
    }
  }))
}

async function loadCurrent(ids: string[]) {
  const programs = await prisma.academicProgram.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      name: true,
      programUrl: true,
      minIBPoints: true,
      requirementsVerified: true,
      requirementsUpdatedAt: true,
      university: { select: { name: true } },
      courseRequirements: {
        select: {
          orGroupId: true,
          requiredLevel: true,
          minGrade: true,
          isCritical: true,
          ibCourse: { select: { code: true } }
        }
      }
    }
  })
  return new Map(
    programs.map((p) => {
      const requirements: RequirementRow[] = p.courseRequirements.map((r) => ({
        code: r.ibCourse.code,
        level: r.requiredLevel,
        grade: r.minGrade,
        critical: r.isCritical,
        group: r.orGroupId
      }))
      return [
        p.id,
        {
          university: p.university.name,
          state: {
            name: p.name,
            programUrl: p.programUrl,
            minIBPoints: p.minIBPoints,
            requirements
          } satisfies ProgramState,
          stamps: {
            requirementsVerified: p.requirementsVerified,
            requirementsUpdatedAt: p.requirementsUpdatedAt
          } satisfies Stamps
        }
      ]
    })
  )
}

function sameStamps(a: Stamps, b: Stamps): boolean {
  return (
    a.requirementsVerified === b.requirementsVerified &&
    a.requirementsUpdatedAt?.getTime() === b.requirementsUpdatedAt?.getTime()
  )
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const mode = args.restore ? `restore from ${args.restore}` : 'apply 2027 requirements'
  console.log(`\n${args.apply ? '✏️  WRITING' : '🔍 DRY RUN'} — ${mode}\n`)

  const { targets, held } = args.restore
    ? { targets: targetsFromBackup(args.restore), held: [] }
    : targetsFromDataFiles(args.only)

  // Validate everything before printing or writing anything.
  const courses = await prisma.iBCourse.findMany({ select: { id: true, code: true } })
  const courseIds = new Map(courses.map((c) => [c.code, c.id]))
  const current = await loadCurrent(targets.map((t) => t.id))
  const errors: string[] = []
  for (const t of targets) {
    const now = current.get(t.id)
    if (!now) {
      errors.push(`${t.state.name} (${t.id}): not in the database`)
      continue
    }
    if (now.university !== t.university) {
      errors.push(`${t.state.name} (${t.id}): belongs to ${now.university}, not ${t.university}`)
    }
    if (t.expectedNames && !t.expectedNames.includes(now.state.name)) {
      errors.push(
        `${t.state.name} (${t.id}): stored name is "${now.state.name}"; it changed since it was checked`
      )
    }
    for (const r of t.state.requirements) {
      if (!courseIds.has(r.code)) errors.push(`${t.state.name}: unknown IB course code ${r.code}`)
    }
    if (t.state.programUrl === null && !args.restore) t.state.programUrl = now.state.programUrl
  }
  if (errors.length > 0) {
    console.error(`❌ Nothing written. Fix these first:\n  ${errors.join('\n  ')}\n`)
    process.exit(1)
  }

  // Plan.
  const toWrite: Array<{ target: Target; changes: string[]; requirementsChanged: boolean }> = []
  let unchanged = 0
  let university = ''
  for (const t of targets) {
    const now = current.get(t.id)!
    const changes = diffProgram(now.state, t.state)
    const stampsChange = !sameStamps(now.stamps, t.stamps)
    if (t.university !== university) {
      university = t.university
      console.log(`\n${university}`)
    }
    if (changes.length > 0) {
      console.log(`  CHANGE  ${t.state.name}  (${t.id})`)
      for (const c of changes) console.log(`            ${c}`)
    } else if (stampsChange) {
      console.log(`  STAMP   ${t.state.name}`)
    } else {
      unchanged++
      continue
    }
    toWrite.push({
      target: t,
      changes,
      requirementsChanged: !sameRequirements(now.state.requirements, t.state.requirements)
    })
  }
  for (const h of held) console.log(`  HOLD    ${h.university} — ${h.name}: ${h.reason}`)

  const changed = toWrite.filter((w) => w.changes.length > 0).length
  console.log(
    `\nSummary: ${changed} change, ${toWrite.length - changed} stamp only, ` +
      `${held.length} held, ${unchanged} already up to date.`
  )
  if (!args.restore) {
    console.log(
      'Every program written also gets requirementsVerified = true and ' +
        'requirementsUpdatedAt = the date it was checked.'
    )
  }

  if (!args.apply) {
    console.log('\nDry run: nothing written. Re-run with --apply to write.\n')
    return
  }
  if (toWrite.length === 0) {
    console.log('\nNothing to write.\n')
    return
  }

  // Back up exactly what is about to be overwritten.
  const backup: Backup = {
    takenAt: new Date().toISOString(),
    programs: toWrite.map(({ target }) => {
      const now = current.get(target.id)!
      return {
        id: target.id,
        university: now.university,
        ...now.state,
        requirementsVerified: now.stamps.requirementsVerified,
        requirementsUpdatedAt: now.stamps.requirementsUpdatedAt?.toISOString() ?? null
      }
    })
  }
  mkdirSync(BACKUP_DIR, { recursive: true })
  const backupFile = path.join(BACKUP_DIR, `${backup.takenAt.replace(/[:.]/g, '-')}.json`)
  writeFileSync(backupFile, JSON.stringify(backup, null, 2))
  console.log(`\n💾 Backup: ${path.relative(process.cwd(), backupFile)}`)

  const written: string[] = []
  for (const { target, requirementsChanged } of toWrite) {
    const ops: Prisma.PrismaPromise<unknown>[] = [
      prisma.academicProgram.update({
        where: { id: target.id },
        data: {
          name: target.state.name,
          programUrl: target.state.programUrl,
          minIBPoints: target.state.minIBPoints,
          ...target.stamps
        },
        select: { id: true }
      })
    ]
    if (requirementsChanged) {
      ops.push(prisma.programCourseRequirement.deleteMany({ where: { programId: target.id } }))
      const rows = assignGroupIds(target.state.requirements, randomUUID)
      if (rows.length > 0) {
        ops.push(
          prisma.programCourseRequirement.createMany({
            data: rows.map((r) => ({
              programId: target.id,
              ibCourseId: courseIds.get(r.code)!,
              requiredLevel: r.level,
              minGrade: r.grade,
              isCritical: r.critical,
              orGroupId: r.orGroupId
            }))
          })
        )
      }
    }
    try {
      await prisma.$transaction(ops)
      written.push(target.id)
    } catch (error) {
      console.error(`❌ ${target.state.name} (${target.id}) was not written:`, error)
    }
  }
  console.log(`\n✅ Wrote ${written.length} of ${toWrite.length} programs.`)

  const { failed } = await syncProgramsBatch(written)
  console.log(
    failed === 0
      ? `🔎 Synced ${written.length} programs to Algolia.`
      : `⚠️  Algolia sync failed for ${failed}; run npx tsx scripts/sync-to-algolia-standalone.ts`
  )
  await invalidateProgramsCache()
  console.log('🗑️  Programs cache invalidated.\n')

  if (written.length < toWrite.length) process.exitCode = 1
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
