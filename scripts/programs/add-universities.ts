/**
 * Add the universities a refresh brings in (content task 5.1)
 *
 * Phase 5 of docs/tasks/CONTENT_tasks.md adds programs at universities the database does not
 * hold yet. The refresh tool creates programs but refuses one whose university is missing, and
 * /admin/universities adds one at a time and keeps no record of the sources. This reads a data
 * file of universities, committed with the PR, and creates the missing ones.
 *
 *   [file]    The data file (default: scripts/programs/<intake>/new-universities.ts). Dry run:
 *             checks it and prints what would be created. Nothing is written.
 *   --apply   Create every university not stored yet. One stored under the same name, in any
 *             case, is left untouched, so the file can be run again.
 *
 * No image or logo is written: add them in /admin/universities, which uploads them to Storage
 * (never base64 in a column). Then run the refresh tool on each university's programs file.
 *
 * .env points at PRODUCTION. Show the dry run to the owner and get approval before --apply.
 *
 * Run with:
 *   npx tsx scripts/programs/add-universities.ts            # dry run
 *   npx tsx scripts/programs/add-universities.ts --apply
 *   npx tsx scripts/sync-universities-algolia.ts            # after --apply
 */

import { existsSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { prisma } from '@/lib/prisma-standalone'
import { currentEntryYear } from '@/lib/programs/entry-year'
import { planUniversities, type UniversitiesFile } from './lib/universities'

function parseArgs(argv: string[]) {
  const args = { apply: false, file: null as string | null }
  for (const arg of argv) {
    if (arg === '--apply') args.apply = true
    else if (arg.startsWith('--')) throw new Error(`Unknown option: ${arg}`)
    else if (args.file === null) args.file = path.resolve(arg)
    else throw new Error('Give one data file')
  }
  return args
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const file = args.file ?? path.join(__dirname, String(currentEntryYear()), 'new-universities.ts')
  if (!existsSync(file)) throw new Error(`No data file at ${path.relative(process.cwd(), file)}`)
  const imported = (await import(pathToFileURL(file).href)) as { default?: UniversitiesFile }
  // tsx can wrap a CommonJS default export once more.
  const loaded = imported.default as UniversitiesFile & { default?: UniversitiesFile }
  const data = loaded?.default ?? loaded

  const [stored, countries] = await Promise.all([
    prisma.university.findMany({ select: { name: true } }),
    prisma.country.findMany({ select: { id: true, name: true } })
  ])
  const countryIds = new Map(countries.map((c) => [c.name, c.id]))
  const plan = planUniversities(
    data,
    stored.map((u) => u.name),
    new Set(countryIds.keys())
  )

  console.log(
    `\n${args.apply ? '✏️  WRITING' : '🔍 DRY RUN'} — ${path.relative(process.cwd(), file)}`
  )
  if (plan.errors.length > 0) {
    console.error(`❌ Nothing written. Fix these first:\n  ${plan.errors.join('\n  ')}\n`)
    process.exitCode = 1
    return
  }
  for (const u of plan.creates) {
    console.log(`  NEW       ${u.name}${u.abbreviatedName ? ` (${u.abbreviatedName})` : ''}`)
    console.log(
      `              ${u.country}, ${u.city} · ${u.classification} · ${u.studentPopulation ?? 'no'} students`
    )
    console.log(`              ${u.websiteUrl}`)
  }
  for (const name of plan.existing) console.log(`  EXISTS    ${name}  (left as it is)`)
  console.log(`  Summary: ${plan.creates.length} new, ${plan.existing.length} already stored.`)

  if (!args.apply) {
    console.log('\nDry run: nothing written. Re-run with --apply to write.\n')
    return
  }
  if (plan.creates.length === 0) {
    console.log('\nNothing to write.\n')
    return
  }
  for (const u of plan.creates) {
    const created = await prisma.university.create({
      data: {
        name: u.name.trim(),
        abbreviatedName: u.abbreviatedName?.trim() || null,
        description: u.description.trim(),
        countryId: countryIds.get(u.country)!,
        city: u.city.trim(),
        classification: u.classification,
        studentPopulation: u.studentPopulation,
        websiteUrl: u.websiteUrl.trim(),
        email: u.email?.trim() || null,
        phone: u.phone?.trim() || null
      },
      select: { id: true }
    })
    console.log(`  ✅ ${u.name}: ${created.id}`)
  }
  console.log(
    '\nNext: npx tsx scripts/sync-universities-algolia.ts, images in /admin/universities, ' +
      'then the refresh tool on each new university.\n'
  )
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
