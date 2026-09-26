/**
 * Merge duplicate IB courses (content task 3.5)
 *
 * Seven subjects exist twice under different codes. Matching compares course ids, so a
 * requirement on one code never matches a student who picked the other. For each pair this
 * points every row at the code in prisma/seed.ts (planning in scripts/lib/course-merge.ts):
 *   - StudentCourse rows are repointed, unless the student already has the kept course.
 *     Those collisions are listed and left alone until the owner records which row to keep
 *     in STUDENT_CHOICES below; the other row is then deleted.
 *   - ProgramCourseRequirement rows are repointed, except that a retired row identical to a
 *     kept one in the same program and OR group is deleted: it means the same thing.
 *
 * Dry run by default. --apply first saves a backup of every row it will change or delete
 * (scripts/backups/, git-ignored: it holds student grades), then writes one transaction per
 * pair. It finishes by syncing the changed programs to Algolia and clearing the programs
 * cache and every cached match, since student courses changed.
 *
 * Afterwards, delete the seven retired courses on /admin/reference-data. Its DELETE refuses
 * while a course is still referenced, which double-checks the merge, and it refreshes the
 * students' course picker. Re-running this script is safe: it plans from what is stored.
 *
 * .env points at PRODUCTION. Show the dry run to the owner and get approval before --apply.
 *
 * Run with:
 *   npx tsx scripts/merge-ib-courses.ts                              # dry run
 *   npx tsx scripts/merge-ib-courses.ts --apply
 *   npx tsx scripts/merge-ib-courses.ts --restore <backup.json> [--apply]
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { prisma } from '@/lib/prisma-standalone'
import { syncProgramsBatch } from '@/lib/algolia/sync'
import { invalidateProgramsCache } from '@/lib/matching/program-cache'
import { clearAllMatchCache } from '@/lib/matching/cache'
import {
  planPair,
  type PairPlan,
  type RequirementRow,
  type StudentChoice,
  type StudentCourseRow
} from './lib/course-merge'

/** Keep the code prisma/seed.ts creates, so production matches a freshly seeded database. */
const PAIRS = [
  { keep: 'GEOG', retire: 'GEO' },
  { keep: 'DES-TECH', retire: 'DESIGN-TECH' },
  { keep: 'GRK', retire: 'GREEK' },
  { keep: 'LAT', retire: 'LATIN' },
  { keep: 'FRA-LIT', retire: 'FRA-LIT-A' },
  { keep: 'GER-LIT', retire: 'GER-LIT-A' },
  { keep: 'SPA-LIT', retire: 'SPA-LIT-A' }
]

/**
 * The owner's choice for each student who has both courses of a pair: the code of the row
 * whose level and grade survive. Keyed by kept code, then studentProfileId.
 */
const STUDENT_CHOICES: Record<string, Record<string, string>> = {
  // Owner, 26 September 2026: the student takes Geography at SL, grade 6; GEO HL4 goes.
  GEOG: { cmslxsmnm0004l204ivh0zqg4: 'GEOG' }
}

const BACKUP_DIR = path.join(__dirname, 'backups', 'merge-ib-courses')

interface Backup {
  takenAt: string
  studentCourses: StudentCourseRow[]
  requirements: RequirementRow[]
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

const describeRequirement = (r: RequirementRow, code: string) =>
  `${code} ${r.requiredLevel}${r.minGrade}${r.isCritical ? '' : ' (nc)'}${r.orGroupId ? ' in an OR group' : ''}`

async function programNames(ids: string[]): Promise<Map<string, string>> {
  const programs = await prisma.academicProgram.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true, university: { select: { name: true } } }
  })
  return new Map(programs.map((p) => [p.id, `${p.university.name} — ${p.name}`]))
}

async function finish(programIds: string[]) {
  const { failed } = await syncProgramsBatch(programIds)
  console.log(
    failed === 0
      ? `🔎 Synced ${programIds.length} programs to Algolia.`
      : `⚠️  Algolia sync failed for ${failed}; run npx tsx scripts/sync-to-algolia-standalone.ts`
  )
  await invalidateProgramsCache()
  await clearAllMatchCache()
  console.log('🗑️  Programs cache and match cache cleared.\n')
}

async function restore(file: string, apply: boolean) {
  const backup = JSON.parse(readFileSync(file, 'utf8')) as Backup
  console.log(
    `${backup.studentCourses.length} student course rows and ${backup.requirements.length} ` +
      `requirement rows from ${backup.takenAt}.`
  )
  if (!apply) {
    console.log('\nDry run: nothing written. Re-run with --apply to restore.\n')
    return
  }
  await prisma.$transaction([
    ...backup.studentCourses.map(({ id, ...row }) =>
      prisma.studentCourse.upsert({ where: { id }, create: { id, ...row }, update: row })
    ),
    ...backup.requirements.map(({ id, ...row }) =>
      prisma.programCourseRequirement.upsert({ where: { id }, create: { id, ...row }, update: row })
    )
  ])
  console.log('\n✅ Restored.')
  await finish([...new Set(backup.requirements.map((r) => r.programId))])
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const mode = args.restore ? `restore from ${args.restore}` : 'merge duplicate IB courses'
  console.log(`\n${args.apply ? '✏️  WRITING' : '🔍 DRY RUN'} — ${mode}\n`)
  if (args.restore) return restore(args.restore, args.apply)

  const courses = await prisma.iBCourse.findMany({ select: { id: true, code: true, name: true } })
  const byCode = new Map(courses.map((c) => [c.code, c]))

  // Validate everything before printing or writing anything.
  const errors: string[] = []
  const pairs: Array<{ keep: string; retire: string; keepId: string; retireId: string }> = []
  for (const { keep, retire } of PAIRS) {
    const kept = byCode.get(keep)
    const retired = byCode.get(retire)
    if (!kept) errors.push(`${keep}: the course to keep is not in the database`)
    else if (!retired) console.log(`${retire} → ${keep}: ${retire} no longer exists; done.`)
    else if (kept.name.trim().toLowerCase() !== retired.name.trim().toLowerCase()) {
      errors.push(`${retire} ("${retired.name}") and ${keep} ("${kept.name}") are not one subject`)
    } else pairs.push({ keep, retire, keepId: kept.id, retireId: retired.id })

    for (const [studentProfileId, code] of Object.entries(STUDENT_CHOICES[keep] ?? {})) {
      if (code !== keep && code !== retire) {
        errors.push(
          `STUDENT_CHOICES.${keep}.${studentProfileId}: ${code} is neither ${keep} nor ${retire}`
        )
      }
    }
  }
  if (errors.length > 0) {
    console.error(`❌ Nothing written. Fix these first:\n  ${errors.join('\n  ')}\n`)
    process.exit(1)
  }

  // Plan each pair.
  const plans: Array<{ pair: (typeof pairs)[number]; plan: PairPlan }> = []
  for (const pair of pairs) {
    const ids = [pair.keepId, pair.retireId]
    const students = await prisma.studentCourse.findMany({
      where: { ibCourseId: { in: ids } },
      select: { id: true, studentProfileId: true, ibCourseId: true, level: true, grade: true }
    })
    // Only programs with a retired row matter; their kept rows decide what is a duplicate.
    const programIds = (
      await prisma.programCourseRequirement.findMany({
        where: { ibCourseId: pair.retireId },
        select: { programId: true },
        distinct: ['programId']
      })
    ).map((r) => r.programId)
    const requirements = await prisma.programCourseRequirement.findMany({
      where: { ibCourseId: { in: ids }, programId: { in: programIds } },
      select: {
        id: true,
        programId: true,
        orGroupId: true,
        ibCourseId: true,
        requiredLevel: true,
        minGrade: true,
        isCritical: true
      }
    })
    const choices: Record<string, StudentChoice> = {}
    for (const [studentProfileId, code] of Object.entries(STUDENT_CHOICES[pair.keep] ?? {})) {
      choices[studentProfileId] = code === pair.keep ? 'kept' : 'retired'
    }
    plans.push({
      pair,
      plan: planPair({
        keepId: pair.keepId,
        retireId: pair.retireId,
        students,
        requirements,
        choices
      })
    })
  }

  // Report.
  const names = await programNames([
    ...new Set(
      plans.flatMap(({ plan }) =>
        [...plan.requirementRepoint, ...plan.requirementDelete].map((r) => r.programId)
      )
    )
  ])
  const collisionUsers = new Map(
    (
      await prisma.studentProfile.findMany({
        where: {
          id: {
            in: plans.flatMap(({ plan }) =>
              plan.studentCollisions.map((c) => c.kept.studentProfileId)
            )
          }
        },
        select: { id: true, userId: true }
      })
    ).map((p) => [p.id, p.userId])
  )
  let undecided = 0
  for (const { pair, plan } of plans) {
    console.log(`\n${pair.retire} → ${pair.keep}`)
    console.log(`  Students: ${plan.studentRepoint.length} repointed`)
    for (const c of plan.studentCollisions) {
      const rows = `${pair.retire} ${c.retired.level}${c.retired.grade} and ${pair.keep} ${c.kept.level}${c.kept.grade}`
      const verdict =
        c.choice === null
          ? 'NO CHOICE RECORDED — left alone'
          : `keep the ${c.choice === 'kept' ? pair.keep : pair.retire} values`
      console.log(
        `  COLLISION student profile ${c.kept.studentProfileId} ` +
          `(/admin/students/${collisionUsers.get(c.kept.studentProfileId)}): ${rows} — ${verdict}`
      )
      if (c.choice === null) undecided++
    }
    for (const r of plan.requirementRepoint) {
      console.log(`  REPOINT ${names.get(r.programId)}: ${describeRequirement(r, pair.retire)}`)
    }
    for (const r of plan.requirementDelete) {
      console.log(
        `  DELETE  ${names.get(r.programId)}: ${describeRequirement(r, pair.retire)}, ` +
          `same as its ${pair.keep} row`
      )
    }
  }

  const sum = (f: (p: PairPlan) => number) => plans.reduce((n, { plan }) => n + f(plan), 0)
  console.log(
    `\nSummary: students ${sum((p) => p.studentRepoint.length)} repointed, ` +
      `${sum((p) => p.studentCollisions.filter((c) => c.choice).length)} collisions resolved, ` +
      `${undecided} waiting for a choice; requirements ${sum((p) => p.requirementRepoint.length)} ` +
      `repointed, ${sum((p) => p.requirementDelete.length)} duplicates deleted.`
  )
  if (undecided > 0) {
    console.log(
      'Record each choice in STUDENT_CHOICES and re-run; until then the retired course stays ' +
        'referenced and cannot be deleted.'
    )
  }

  if (!args.apply) {
    console.log('\nDry run: nothing written. Re-run with --apply to write.\n')
    return
  }

  // Back up exactly what is about to change.
  const touchedStudents = plans.flatMap(({ plan }) => [
    ...plan.studentRepoint,
    ...plan.studentCollisions.filter((c) => c.choice).flatMap((c) => [c.kept, c.retired])
  ])
  const touchedRequirements = plans.flatMap(({ plan }) => [
    ...plan.requirementRepoint,
    ...plan.requirementDelete
  ])
  if (touchedStudents.length === 0 && touchedRequirements.length === 0) {
    console.log('\nNothing to write.\n')
    return
  }
  const backup: Backup = {
    takenAt: new Date().toISOString(),
    studentCourses: touchedStudents,
    requirements: touchedRequirements
  }
  mkdirSync(BACKUP_DIR, { recursive: true })
  const backupFile = path.join(BACKUP_DIR, `${backup.takenAt.replace(/[:.]/g, '-')}.json`)
  writeFileSync(backupFile, JSON.stringify(backup, null, 2))
  console.log(`\n💾 Backup: ${path.relative(process.cwd(), backupFile)}`)

  // One transaction per pair; a count that differs from the plan rolls the pair back.
  const written = new Set<string>()
  for (const { pair, plan } of plans) {
    try {
      await prisma.$transaction(async (tx) => {
        for (const c of plan.studentCollisions) {
          if (c.choice === 'retired') {
            await tx.studentCourse.update({
              where: { id: c.kept.id },
              data: { level: c.retired.level, grade: c.retired.grade }
            })
          }
          if (c.choice) await tx.studentCourse.delete({ where: { id: c.retired.id } })
        }
        const expect = (label: string, actual: number, planned: number) => {
          if (actual !== planned) {
            throw new Error(`${label}: ${actual} rows, planned ${planned}; something changed`)
          }
        }
        expect(
          'student repoint',
          (
            await tx.studentCourse.updateMany({
              where: {
                id: { in: plan.studentRepoint.map((s) => s.id) },
                ibCourseId: pair.retireId
              },
              data: { ibCourseId: pair.keepId }
            })
          ).count,
          plan.studentRepoint.length
        )
        expect(
          'requirement delete',
          (
            await tx.programCourseRequirement.deleteMany({
              where: {
                id: { in: plan.requirementDelete.map((r) => r.id) },
                ibCourseId: pair.retireId
              }
            })
          ).count,
          plan.requirementDelete.length
        )
        expect(
          'requirement repoint',
          (
            await tx.programCourseRequirement.updateMany({
              where: {
                id: { in: plan.requirementRepoint.map((r) => r.id) },
                ibCourseId: pair.retireId
              },
              data: { ibCourseId: pair.keepId }
            })
          ).count,
          plan.requirementRepoint.length
        )
      })
      for (const r of [...plan.requirementRepoint, ...plan.requirementDelete]) {
        written.add(r.programId)
      }
      console.log(`✅ ${pair.retire} → ${pair.keep}`)
    } catch (error) {
      console.error(`❌ ${pair.retire} → ${pair.keep} was not written:`, error)
      process.exitCode = 1
    }
  }

  // What is left pointing at each retired code: 0 everywhere means it can be deleted.
  console.log('\nStill pointing at a retired code:')
  for (const { pair } of plans) {
    const [students, requirements] = await Promise.all([
      prisma.studentCourse.count({ where: { ibCourseId: pair.retireId } }),
      prisma.programCourseRequirement.count({ where: { ibCourseId: pair.retireId } })
    ])
    console.log(`  ${pair.retire}: ${students} students, ${requirements} requirements`)
  }
  console.log()

  await finish([...written])
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
