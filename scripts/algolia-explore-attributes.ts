/**
 * Give every search record what Explore needs (rebranding 2.3): `durationYears` for the Length
 * filter (3, 4, or 5 for five years or more), the university's `admitRate`, shown beside "None"
 * for a program with no IB minimum, and `requiredCourses` with each requirement's `orGroupId`,
 * so Explore can work out a student's fit from the search results instead of reading the
 * programs cache (3 MB from Upstash per read). lib/algolia/sync.ts writes all three from now on;
 * this fills in the records written before it.
 *
 * Two narrow reads (each program's duration and admit rate; every requirement row's course,
 * level, grade and group: about 0.7 MB for 1,628 programs and 5,902 rows), then a partial update
 * of those three attributes alone. Nothing else in a record changes, and a program missing from
 * the index is not created. Today's search page never reads them, so students see no
 * difference. A re-run writes the same values again.
 *
 * Dry run by default: it prints what it would write. --apply writes to the production index.
 * Show the dry run to the owner and get approval before --apply.
 *
 * Run with:
 *   npx tsx scripts/algolia-explore-attributes.ts            # dry run
 *   npx tsx scripts/algolia-explore-attributes.ts --apply
 */

import 'dotenv/config'
import { algoliasearch } from 'algoliasearch'
import { prisma } from '@/lib/prisma-standalone'
import { durationYears } from '@/lib/programs/duration'

const INDEX = 'programs_production'

async function main() {
  const apply = process.argv.includes('--apply')
  const appId = process.env.ALGOLIA_APP_ID
  const apiKey = process.env.ALGOLIA_ADMIN_API_KEY
  if (!appId || !apiKey) throw new Error('Set ALGOLIA_APP_ID and ALGOLIA_ADMIN_API_KEY in .env')

  const programs = await prisma.academicProgram.findMany({
    select: { id: true, duration: true, university: { select: { admitRate: true } } }
  })
  // As lib/algolia/sync.ts writes them, in the same order
  const requirements = await prisma.programCourseRequirement.findMany({
    select: {
      programId: true,
      requiredLevel: true,
      minGrade: true,
      isCritical: true,
      orGroupId: true,
      ibCourse: { select: { id: true, name: true } }
    }
  })
  const byProgram = new Map<string, Record<string, unknown>[]>()
  for (const req of requirements) {
    const list = byProgram.get(req.programId) ?? []
    list.push({
      courseId: req.ibCourse.id,
      courseName: req.ibCourse.name,
      level: req.requiredLevel,
      minimumGrade: req.minGrade,
      isCritical: req.isCritical,
      orGroupId: req.orGroupId
    })
    byProgram.set(req.programId, list)
  }

  const updates = programs.map((program) => {
    const record: Record<string, unknown> = { objectID: program.id }
    const years = durationYears(program.duration)
    // Null keeps a value that has gone from lingering in the index
    record.durationYears = years
    record.admitRate = program.university.admitRate
    record.requiredCourses = byProgram.get(program.id) ?? []
    return { record, years, duration: program.duration }
  })

  const byYears = new Map<string, number>()
  const unread = new Map<string, number>()
  for (const { years, duration } of updates) {
    byYears.set(String(years), (byYears.get(String(years)) ?? 0) + 1)
    if (years === null) unread.set(duration, (unread.get(duration) ?? 0) + 1)
  }
  const withRate = updates.filter((u) => u.record.admitRate !== null).length

  console.log(`${updates.length} programs`)
  for (const [years, count] of [...byYears].sort())
    console.log(`  durationYears ${years}: ${count}`)
  for (const [duration, count] of unread) console.log(`  not read: "${duration}" (${count})`)
  console.log(`  with an admit rate: ${withRate}`)
  const grouped = requirements.filter((r) => r.orGroupId !== null).length
  console.log(`  requirement rows: ${requirements.length}, ${grouped} in either/or groups`)

  if (!apply) {
    console.log('\nDry run: nothing written. Run again with --apply to update the index.')
    return
  }

  const client = algoliasearch(appId, apiKey)
  const responses = await client.partialUpdateObjects({
    indexName: INDEX,
    objects: updates.map((u) => u.record),
    createIfNotExists: false,
    waitForTasks: true
  })
  console.log(`\nUpdated ${updates.length} records in ${responses.length} batches.`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
