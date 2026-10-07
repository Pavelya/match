/**
 * Fields of study: inventory and descriptions (content task 8.1)
 *
 * Applies the rule in lib/programs/fields-of-study.ts to the stored catalogue:
 *
 *   1. Counts, per discipline, the programs filed under each field whose names name it. One
 *      aggregate query: the names never leave the database.
 *   2. Lists the outliers: programs filed outside the field the rule gives them. Only programs
 *      that name a discipline of another field are read, and only their id, name, field and
 *      university.
 *   3. Compares the stored field descriptions with FIELD_DESCRIPTIONS.
 *
 * Programs are re-filed through the refresh tool's data files (scripts/programs/refresh.ts),
 * one university at a time, never here. This script writes only the twelve descriptions, and
 * only with --apply. The descriptions are copied into every program's Algolia record and the
 * programs cache, so --apply clears the programs cache and cached matches and then says to run
 * the full Algolia sync.
 *
 * Run with:
 *   npx tsx scripts/programs/field-inventory.ts            # report
 *   npx tsx scripts/programs/field-inventory.ts --apply    # and write the descriptions
 */

import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma-standalone'
import { invalidateProgramsCache } from '@/lib/matching/program-cache'
import { clearAllMatchCache } from '@/lib/matching/cache'
import {
  DISCIPLINES,
  FIELD_DESCRIPTIONS,
  FIELD_NAMES,
  findOutliers,
  postgresPattern,
  type FieldName
} from '@/lib/programs/fields-of-study'

const apply = process.argv.includes('--apply')

/** Every discipline as a row of a VALUES list: (discipline, home field, pattern). */
function disciplineValues(includeWeak: boolean) {
  return Prisma.join(
    DISCIPLINES.filter((d) => includeWeak || !d.weak).map(
      (d) => Prisma.sql`(${d.name}, ${d.field}, ${postgresPattern(d)})`
    )
  )
}

async function counts() {
  const rows = await prisma.$queryRaw<Array<{ discipline: string; field: string; n: number }>>`
    SELECT d.discipline, f.name AS field, count(*)::int AS n
    FROM "AcademicProgram" p
    JOIN "FieldOfStudy" f ON f.id = p."fieldOfStudyId"
    JOIN (VALUES ${disciplineValues(false)}) AS d(discipline, home, pattern)
      ON p.name ~* d.pattern
    GROUP BY d.discipline, f.name`
  console.log('\n1. Programs whose names name each discipline, by the field they are filed under')
  console.log('   (a joint degree counts under each discipline it names)\n')
  for (const d of DISCIPLINES.filter((x) => !x.weak)) {
    const mine = rows.filter((r) => r.discipline === d.name).sort((a, b) => b.n - a.n)
    if (mine.length === 0) continue
    const total = mine.reduce((s, r) => s + r.n, 0)
    const elsewhere = mine.filter((r) => r.field !== d.field)
    const by = mine.map((r) => `${r.field === d.field ? '' : '⚠️ '}${r.field} ${r.n}`).join(', ')
    console.log(`   ${d.name} → ${d.field}: ${total}${elsewhere.length ? `  (${by})` : ''}`)
  }
}

async function outliers() {
  // Only programs that name some discipline whose home is another field can be outliers.
  const candidates = await prisma.$queryRaw<
    Array<{ id: string; name: string; field: string; university: string }>
  >`
    SELECT DISTINCT p.id, p.name, f.name AS field, u.name AS university
    FROM "AcademicProgram" p
    JOIN "FieldOfStudy" f ON f.id = p."fieldOfStudyId"
    JOIN "University" u ON u.id = p."universityId"
    JOIN (VALUES ${disciplineValues(true)}) AS d(discipline, home, pattern)
      ON p.name ~* d.pattern AND d.home <> f.name`
  const report = findOutliers(candidates)

  console.log(
    `\n2. Outliers: ${report.outliers.length} programs filed outside the field the rule gives ` +
      `(of ${candidates.length} that name another field's discipline)`
  )
  const groups: Array<[string, typeof report.outliers]> = [
    ['One discipline, filed elsewhere', report.outliers.filter((o) => o.kind === 'single')],
    [
      'Joint degrees, filed under another of their disciplines',
      report.outliers.filter((o) => o.kind === 'joint-other')
    ],
    [
      'Joint degrees, filed under none of their disciplines',
      report.outliers.filter((o) => o.kind === 'joint-none')
    ],
    ['Special cases', report.outliers.filter((o) => o.kind === 'special')],
    [
      'Kept by the owner, but filed under another field',
      report.outliers.filter((o) => o.kind === 'kept')
    ]
  ]
  for (const [title, list] of groups) {
    if (list.length === 0) continue
    console.log(`\n   ${title} (${list.length})`)
    for (const o of list.sort(
      (a, b) => a.university.localeCompare(b.university) || a.name.localeCompare(b.name)
    )) {
      console.log(
        `     ${o.university} — ${o.name}: ${o.field} → ${o.home}` + `  [${o.reason}]  (${o.id})`
      )
    }
  }
  if (report.kept.length > 0) {
    console.log(`\n   Kept by the owner where the rule would move them: ${report.kept.length}`)
  }
}

async function descriptions() {
  const stored = await prisma.fieldOfStudy.findMany({
    select: { id: true, name: true, description: true },
    orderBy: { name: 'asc' }
  })
  const known = new Set<string>(FIELD_NAMES)
  const differ = stored.filter(
    (f) => known.has(f.name) && f.description !== FIELD_DESCRIPTIONS[f.name as FieldName]
  )
  console.log(`\n3. Field descriptions: ${differ.length} of ${stored.length} differ from the rule`)
  for (const f of stored.filter((s) => !known.has(s.name))) {
    console.log(`   ⚠️  ${f.name} is stored but not in FIELD_NAMES`)
  }
  for (const name of FIELD_NAMES.filter((n) => !stored.some((s) => s.name === n))) {
    console.log(`   ⚠️  ${name} is in FIELD_NAMES but not stored`)
  }
  for (const f of differ) {
    console.log(`   ${f.name}`)
    console.log(`     now:  ${f.description ?? '(none)'}`)
    console.log(`     rule: ${FIELD_DESCRIPTIONS[f.name as FieldName]}`)
  }
  if (!apply || differ.length === 0) return differ.length

  await prisma.$transaction(
    differ.map((f) =>
      prisma.fieldOfStudy.update({
        where: { id: f.id },
        data: { description: FIELD_DESCRIPTIONS[f.name as FieldName] },
        select: { id: true }
      })
    )
  )
  console.log(`\n✅ Wrote ${differ.length} descriptions.`)
  await invalidateProgramsCache()
  await clearAllMatchCache()
  console.log('🗑️  Programs cache and cached matches cleared.')
  console.log(
    'Every Algolia record copies its field description. Re-sync them all:\n' +
      '  npx tsx scripts/sync-to-algolia-standalone.ts\n' +
      'Onboarding reads the fields through a one-hour cache, so the new text shows within the hour.'
  )
  return 0
}

async function main() {
  console.log(
    `\n${apply ? '✏️  WRITING descriptions' : '🔍 REPORT'} — fields of study (content 8.1)`
  )
  await counts()
  await outliers()
  const pending = await descriptions()
  if (!apply && pending > 0) console.log('\nRe-run with --apply to write the descriptions.')
  console.log('')
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
