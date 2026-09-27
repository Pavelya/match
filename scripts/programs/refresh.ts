/**
 * Refresh a university's programs from a data file (content task 3.3)
 *
 * Phase 4 of docs/tasks/CONTENT_tasks.md checks every program against its university's
 * sources for the next intake. The admin UI edits one program at a time and records nothing
 * about why; this tool works a university at a time, from a data file committed with the PR.
 *
 *   --export <university>  Write a starter data file from the database, at
 *                          scripts/programs/<intake>/<university-slug>.ts, with every program
 *                          unchecked. Refuses to overwrite an existing file without --force.
 *   <slug or file> ...     Dry run: check each file and print, per program, what would change.
 *                          Nothing is written. Several files can be given at once.
 *   --apply                Write it. First a backup of every program it will change
 *                          (scripts/backups/refresh/, git-ignored), then one transaction per
 *                          program: its fields, its subject requirements replaced as a set, and
 *                          the stamps `requirementsVerified`, `requirementsUpdatedAt` (the file's
 *                          checkedOn) and `requirementsEntryYear` (the program's checkedFor).
 *                          `new` programs are created. Nothing is ever deleted: `discontinued`
 *                          programs are only reported. Then syncs the written programs to Algolia
 *                          and clears the programs cache and cached matches, which the standalone
 *                          Prisma client does not do on its own.
 *   --restore <backup>     Put the programs in a backup back as they were (dry run unless
 *                          --apply). Programs the run created are listed, not deleted.
 *
 * A program is written only when it is checked (`checkedFor` set). Its degree must be in
 * lib/programs/degree-types.ts and its course codes in IBCourse. The pure half, checking and
 * planning, is scripts/programs/lib/refresh.ts.
 *
 * .env points at PRODUCTION. Show the dry run to the owner and get approval before --apply.
 *
 * Run with:
 *   npx tsx scripts/programs/refresh.ts --export "Tel Aviv University"
 *   npx tsx scripts/programs/refresh.ts tel-aviv-university                 # dry run
 *   npx tsx scripts/programs/refresh.ts tel-aviv-university --apply
 *   npx tsx scripts/programs/refresh.ts --restore <backup.json> [--apply]
 */

import { randomUUID } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma-standalone'
import { syncProgramsBatch } from '@/lib/algolia/sync'
import { invalidateProgramsCache } from '@/lib/matching/program-cache'
import { clearAllMatchCache } from '@/lib/matching/cache'
import { canonicalDegreeType } from '@/lib/programs/degree-types'
import { currentEntryYear } from '@/lib/programs/entry-year'
import { assignGroupIds, formatRequirements, type RequirementRow } from './lib/requirements-diff'
import {
  planRefresh,
  planRestore,
  type ProgramCreate,
  type ProgramWrite,
  type RefreshFile,
  type RefreshPlan,
  type RefreshState,
  type Stamps,
  type StoredProgram
} from './lib/refresh'
import { exportFile, renderRefreshFile, slugify, storedComment } from './lib/refresh-export'

const BACKUP_DIR = path.join(__dirname, '..', 'backups', 'refresh')

interface Backup {
  takenAt: string
  files: string[]
  programs: Array<{
    id: string
    university: string
    state: RefreshState
    stamps: Omit<Stamps, 'requirementsUpdatedAt'> & { requirementsUpdatedAt: string | null }
  }>
  /** Programs the run created. A restore lists them; it never deletes. */
  created: Array<{ id: string; university: string; name: string }>
}

function parseArgs(argv: string[]) {
  const args = {
    apply: false,
    force: false,
    export: null as string | null,
    restore: null as string | null,
    files: [] as string[]
  }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--apply') args.apply = true
    else if (arg === '--force') args.force = true
    else if (arg === '--export') args.export = argv[++i] ?? null
    else if (arg === '--restore') args.restore = argv[++i] ?? null
    else if (arg.startsWith('--')) throw new Error(`Unknown option: ${arg}`)
    else args.files.push(arg)
  }
  const modes = [args.export !== null, args.restore !== null, args.files.length > 0]
  if (modes.filter(Boolean).length !== 1) {
    throw new Error(
      'Give one of: --export <university>, a data file (slug or path), or --restore <backup>'
    )
  }
  if (args.export !== null && args.apply)
    throw new Error('--export writes a file, not the database')
  return args
}

/** A slug is a file in this intake's folder; anything with a slash or `.ts` is a path. */
function dataFilePath(arg: string): string {
  if (arg.includes('/') || arg.endsWith('.ts')) return path.resolve(arg)
  return path.join(__dirname, String(currentEntryYear()), `${arg}.ts`)
}

const PROGRAM_SELECT = {
  id: true,
  name: true,
  description: true,
  degreeType: true,
  duration: true,
  minIBPoints: true,
  programUrl: true,
  requirementsVerified: true,
  requirementsUpdatedAt: true,
  requirementsEntryYear: true,
  university: { select: { name: true } },
  fieldOfStudy: { select: { name: true } },
  courseRequirements: {
    select: {
      orGroupId: true,
      requiredLevel: true,
      minGrade: true,
      isCritical: true,
      ibCourse: { select: { code: true } }
    },
    orderBy: { id: 'asc' }
  }
} satisfies Prisma.AcademicProgramSelect

async function loadStored(where: Prisma.AcademicProgramWhereInput): Promise<StoredProgram[]> {
  const programs = await prisma.academicProgram.findMany({ where, select: PROGRAM_SELECT })
  return programs.map((p) => ({
    id: p.id,
    university: p.university.name,
    state: {
      name: p.name,
      description: p.description,
      field: p.fieldOfStudy.name,
      degreeType: p.degreeType,
      duration: p.duration,
      minIBPoints: p.minIBPoints,
      programUrl: p.programUrl,
      requirements: p.courseRequirements.map((r): RequirementRow => ({
        code: r.ibCourse.code,
        level: r.requiredLevel,
        grade: r.minGrade,
        critical: r.isCritical,
        group: r.orGroupId
      }))
    },
    stamps: {
      requirementsVerified: p.requirementsVerified,
      requirementsUpdatedAt: p.requirementsUpdatedAt,
      requirementsEntryYear: p.requirementsEntryYear
    }
  }))
}

async function loadReference() {
  const [courses, fields] = await Promise.all([
    prisma.iBCourse.findMany({ select: { id: true, code: true } }),
    prisma.fieldOfStudy.findMany({ select: { id: true, name: true } })
  ])
  return {
    courseIds: new Map(courses.map((c) => [c.code, c.id])),
    fieldIds: new Map(fields.map((f) => [f.name, f.id]))
  }
}

type Reference = Awaited<ReturnType<typeof loadReference>>

// --- export ---------------------------------------------------------------------------

async function exportUniversity(query: string, force: boolean) {
  const universities = await prisma.university.findMany({ select: { id: true, name: true } })
  const wanted = query.trim().toLowerCase()
  const university = universities.find(
    (u) => u.name.toLowerCase() === wanted || slugify(u.name) === slugify(query)
  )
  if (!university) {
    throw new Error(
      `No university named "${query}". Try one of:\n  ${universities
        .map((u) => u.name)
        .sort()
        .join('\n  ')}`
    )
  }

  const slug = slugify(university.name)
  const entryYear = currentEntryYear()
  const out = path.join(__dirname, String(entryYear), `${slug}.ts`)
  if (existsSync(out) && !force) {
    throw new Error(
      `${path.relative(process.cwd(), out)} exists. It may hold checked work: re-run with --force to replace it.`
    )
  }

  const stored = await loadStored({ universityId: university.id })
  const today = new Date().toISOString().slice(0, 10)
  const file = exportFile(university.name, entryYear, today, stored, canonicalDegreeType)
  const comments = new Map(stored.map((s) => [s.id, storedComment(s, canonicalDegreeType)]))
  const command = `npx tsx scripts/programs/refresh.ts ${slug}`
  const prettier = await import('prettier')
  const text = await prettier.format(renderRefreshFile(file, comments, command), {
    ...(await prettier.resolveConfig(out)),
    filepath: out
  })
  mkdirSync(path.dirname(out), { recursive: true })
  writeFileSync(out, text)

  const normalised = stored.filter(
    (s) => canonicalDegreeType(s.state.degreeType) !== s.state.degreeType
  )
  const unknown = stored.filter((s) => canonicalDegreeType(s.state.degreeType) === null)
  const years = new Map<string, number>()
  for (const s of stored) {
    const key = s.stamps.requirementsEntryYear?.toString() ?? 'not checked'
    years.set(key, (years.get(key) ?? 0) + 1)
  }
  console.log(
    `\n📄 ${path.relative(process.cwd(), out)}: ${stored.length} programs of ${university.name}`
  )
  console.log(`   Stored as checked for: ${[...years].map(([y, n]) => `${y} × ${n}`).join(', ')}`)
  if (normalised.length > 0) {
    console.log(`   ${normalised.length} degree types written in their canonical spelling (3.2).`)
  }
  if (unknown.length > 0) {
    console.log(
      `   ⚠️  ${unknown.length} degree types are not in the list; the file will not type-check until fixed.`
    )
  }
  console.log(
    `\nNext: check each program for ${entryYear} entry, then dry-run with\n  ${command}\n`
  )
}

// --- dry run and apply ----------------------------------------------------------------

async function loadDataFile(file: string): Promise<RefreshFile> {
  if (!existsSync(file)) throw new Error(`No data file at ${path.relative(process.cwd(), file)}`)
  const imported = (await import(pathToFileURL(file).href)) as { default?: RefreshFile }
  // tsx can wrap a CommonJS default export once more.
  const loaded = imported.default as RefreshFile & { default?: RefreshFile }
  return loaded?.default ?? loaded
}

function describeNew(c: ProgramCreate): string[] {
  const t = c.target
  return [
    `${t.minIBPoints ?? 'no'} points · ${t.degreeType} · ${t.duration} · ${t.field}`,
    `Subjects: ${formatRequirements(t.requirements)}`,
    `URL: ${t.programUrl ?? 'none'}`
  ]
}

function printPlan(title: string, plan: RefreshPlan) {
  console.log(`\n${title}`)
  for (const w of plan.writes) {
    if (w.changes.length > 0) {
      console.log(`  CHANGE        ${w.name}  (${w.id})`)
      for (const line of [...w.changes, ...w.stampChanges]) console.log(`                  ${line}`)
    } else {
      console.log(`  STAMP         ${w.name}  ${w.stampChanges.join('; ')}`)
    }
  }
  for (const c of plan.creates) {
    console.log(`  NEW           ${c.name}`)
    for (const line of describeNew(c)) console.log(`                  ${line}`)
  }
  for (const d of plan.discontinued) {
    console.log(`  DISCONTINUED  ${d.name}  (${d.id})${d.notes ? ` — ${d.notes}` : ''}`)
  }
  if (plan.unchecked.length > 0) {
    console.log(
      `  Not checked, not written (${plan.unchecked.length}): ${plan.unchecked.join('; ')}`
    )
  }
  if (plan.earlierIntake.length > 0) {
    console.log(
      `  Sources describe an earlier intake (${plan.earlierIntake.length}), list them in the PR: ` +
        plan.earlierIntake.map((e) => `${e.name} (${e.checkedFor})`).join('; ')
    )
  }
  if (plan.notInFile.length > 0) {
    console.log(
      `  ⚠️  Stored but not in the file, untouched (${plan.notInFile.length}): ` +
        plan.notInFile.map((p) => `${p.name} (${p.id})`).join('; ')
    )
  }
  for (const w of plan.warnings) console.log(`  ⚠️  ${w}`)
  const changed = plan.writes.filter((w) => w.changes.length > 0).length
  console.log(
    `  Summary: ${changed} change, ${plan.writes.length - changed} stamp only, ` +
      `${plan.creates.length} new, ${plan.discontinued.length} discontinued, ` +
      `${plan.unchecked.length} not checked, ${plan.upToDate.length} already up to date.`
  )
}

function requirementRows(rows: RequirementRow[], ref: Reference) {
  return assignGroupIds(rows, randomUUID).map((r) => ({
    ibCourseId: ref.courseIds.get(r.code)!,
    requiredLevel: r.level,
    minGrade: r.grade,
    isCritical: r.critical,
    orGroupId: r.orGroupId
  }))
}

function programData(t: RefreshState, stamps: Stamps, ref: Reference) {
  return {
    name: t.name,
    description: t.description,
    fieldOfStudyId: ref.fieldIds.get(t.field)!,
    degreeType: t.degreeType,
    duration: t.duration,
    minIBPoints: t.minIBPoints,
    programUrl: t.programUrl,
    ...stamps
  }
}

async function writeProgram(w: ProgramWrite, ref: Reference) {
  const ops: Prisma.PrismaPromise<unknown>[] = [
    prisma.academicProgram.update({
      where: { id: w.id },
      data: programData(w.target, w.stamps, ref),
      select: { id: true }
    })
  ]
  if (w.requirementsChanged) {
    ops.push(prisma.programCourseRequirement.deleteMany({ where: { programId: w.id } }))
    const rows = requirementRows(w.target.requirements, ref).map((r) => ({ ...r, programId: w.id }))
    if (rows.length > 0) ops.push(prisma.programCourseRequirement.createMany({ data: rows }))
  }
  await prisma.$transaction(ops)
}

/** A nested create is one transaction: the program and its requirements, or nothing. */
async function createProgram(c: ProgramCreate, universityId: string, ref: Reference) {
  const rows = requirementRows(c.target.requirements, ref)
  const created = await prisma.academicProgram.create({
    data: {
      ...programData(c.target, c.stamps, ref),
      universityId,
      courseRequirements: rows.length > 0 ? { create: rows } : undefined
    },
    select: { id: true }
  })
  return created.id
}

interface Job {
  university: string
  universityId: string | null
  writes: ProgramWrite[]
  creates: ProgramCreate[]
  /** What each written program looked like, for the backup. */
  before: Map<string, StoredProgram>
}

async function run(jobs: Job[], files: string[], ref: Reference) {
  const writes = jobs.flatMap((j) => j.writes.map((w) => ({ job: j, w })))
  const creates = jobs.flatMap((j) => j.creates.map((c) => ({ job: j, c })))
  if (writes.length + creates.length === 0) {
    console.log('\nNothing to write.\n')
    return
  }

  const backup: Backup = {
    takenAt: new Date().toISOString(),
    files: files.map((f) => path.relative(process.cwd(), f)),
    programs: writes.map(({ job, w }) => {
      const before = job.before.get(w.id)!
      return {
        id: w.id,
        university: before.university,
        state: before.state,
        stamps: {
          ...before.stamps,
          requirementsUpdatedAt: before.stamps.requirementsUpdatedAt?.toISOString() ?? null
        }
      }
    }),
    created: []
  }
  mkdirSync(BACKUP_DIR, { recursive: true })
  const backupFile = path.join(BACKUP_DIR, `${backup.takenAt.replace(/[:.]/g, '-')}.json`)
  const saveBackup = () => writeFileSync(backupFile, JSON.stringify(backup, null, 2))
  saveBackup()
  console.log(`\n💾 Backup: ${path.relative(process.cwd(), backupFile)}`)

  const synced: string[] = []
  let failed = 0
  for (const { w } of writes) {
    try {
      await writeProgram(w, ref)
      synced.push(w.id)
    } catch (error) {
      failed++
      console.error(`❌ ${w.name} (${w.id}) was not written:`, error)
    }
  }
  for (const { job, c } of creates) {
    try {
      const id = await createProgram(c, job.universityId!, ref)
      synced.push(id)
      backup.created.push({ id, university: job.university, name: c.name })
      saveBackup()
    } catch (error) {
      failed++
      console.error(`❌ ${c.name} was not created:`, error)
    }
  }
  console.log(
    `\n✅ Wrote ${synced.length - backup.created.length} of ${writes.length} programs, ` +
      `created ${backup.created.length} of ${creates.length}.`
  )
  if (backup.created.length > 0) {
    console.log("Created. In the data file, give each its id and status 'current':")
    for (const c of backup.created) console.log(`  ${c.university} — ${c.name}: id '${c.id}'`)
  }

  const sync = await syncProgramsBatch(synced)
  console.log(
    sync.failed === 0
      ? `🔎 Synced ${synced.length} programs to Algolia.`
      : `⚠️  Algolia sync failed for ${sync.failed}; run npx tsx scripts/sync-to-algolia-standalone.ts`
  )
  await invalidateProgramsCache()
  await clearAllMatchCache()
  console.log('🗑️  Programs cache and cached matches cleared.\n')
  if (failed > 0) process.exitCode = 1
}

async function refresh(args: ReturnType<typeof parseArgs>) {
  const files = args.files.map(dataFilePath)
  const ref = await loadReference()
  const lookups = {
    courseCodes: new Set(ref.courseIds.keys()),
    fields: new Set(ref.fieldIds.keys()),
    canonicalDegree: canonicalDegreeType
  }

  const jobs: Array<Job & { file: RefreshFile; path: string; plan: RefreshPlan }> = []
  for (const filePath of files) {
    const file = await loadDataFile(filePath)
    const ids = (file.programs ?? []).flatMap((p) => (p?.id ? [p.id] : []))
    const stored = await loadStored({
      OR: [{ university: { name: file.university } }, { id: { in: ids } }]
    })
    const university = await prisma.university.findFirst({
      where: { name: file.university },
      select: { id: true }
    })
    const plan = planRefresh(file, stored, lookups)
    if (!university && plan.creates.length > 0) {
      plan.errors.push(
        `${file.university} is not in the database: add it in /admin/universities first`
      )
    }
    jobs.push({
      file,
      path: filePath,
      plan,
      university: file.university,
      universityId: university?.id ?? null,
      writes: plan.writes,
      creates: plan.creates,
      before: new Map(stored.map((s) => [s.id, s]))
    })
  }

  // Check every file before printing or writing anything.
  const errors = jobs.flatMap((j) =>
    j.plan.errors.map((e) => `${path.relative(process.cwd(), j.path)}: ${e}`)
  )
  if (errors.length > 0) {
    console.error(`❌ Nothing written. Fix these first:\n  ${errors.join('\n  ')}\n`)
    process.exitCode = 1
    return
  }

  for (const j of jobs) {
    printPlan(
      `${j.file.university} — ${j.file.entryYear} entry, checked ${j.file.checkedOn} ` +
        `(${path.relative(process.cwd(), j.path)})`,
      j.plan
    )
  }
  console.log(
    '\nEvery program written gets requirementsVerified = true, requirementsUpdatedAt = the ' +
      "file's checkedOn and requirementsEntryYear = its checkedFor."
  )
  if (!args.apply) {
    console.log('\nDry run: nothing written. Re-run with --apply to write.\n')
    return
  }
  await run(jobs, files, ref)
}

async function restore(file: string, apply: boolean) {
  const backup = JSON.parse(readFileSync(file, 'utf8')) as Backup
  const ref = await loadReference()
  const stored = await loadStored({ id: { in: backup.programs.map((p) => p.id) } })
  const plan = planRestore(
    backup.programs.map((p) => ({
      id: p.id,
      state: p.state,
      stamps: {
        ...p.stamps,
        requirementsUpdatedAt: p.stamps.requirementsUpdatedAt
          ? new Date(p.stamps.requirementsUpdatedAt)
          : null
      }
    })),
    stored
  )
  for (const p of backup.programs) {
    if (!ref.fieldIds.has(p.state.field))
      plan.errors.push(`${p.state.name}: field ${p.state.field} is gone`)
    for (const r of p.state.requirements) {
      if (!ref.courseIds.has(r.code))
        plan.errors.push(`${p.state.name}: IB course ${r.code} is gone`)
    }
  }
  if (plan.errors.length > 0) {
    console.error(`❌ Nothing written. Fix these first:\n  ${plan.errors.join('\n  ')}\n`)
    process.exitCode = 1
    return
  }

  console.log(`\nRestore from ${path.relative(process.cwd(), file)} (taken ${backup.takenAt})`)
  for (const w of plan.writes) {
    console.log(`  RESTORE  ${w.name}  (${w.id})`)
    for (const line of [...w.changes, ...w.stampChanges]) console.log(`             ${line}`)
  }
  console.log(
    `  Summary: ${plan.writes.length} to restore, ${plan.upToDate.length} already as backed up.`
  )
  if (backup.created.length > 0) {
    console.log('  Created by that run, left in place (this tool never deletes):')
    for (const c of backup.created) console.log(`    ${c.university} — ${c.name} (${c.id})`)
  }
  if (!apply) {
    console.log('\nDry run: nothing written. Re-run with --apply to write.\n')
    return
  }
  const before = new Map(stored.map((s) => [s.id, s]))
  await run(
    [{ university: '', universityId: null, writes: plan.writes, creates: [], before }],
    [file],
    ref
  )
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.export !== null) return exportUniversity(args.export, args.force)
  console.log(
    `\n${args.apply ? '✏️  WRITING' : '🔍 DRY RUN'} — ${args.restore ? 'restore' : 'refresh'}`
  )
  if (args.restore !== null) return restore(path.resolve(args.restore), args.apply)
  return refresh(args)
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
    process.exit()
  })
