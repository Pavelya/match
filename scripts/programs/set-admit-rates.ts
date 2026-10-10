/**
 * Store universities' admit rates (content 6, US)
 *
 * Universities that set no IB minimum get their share of first-year applicants admitted, which the
 * new match card shows as a chip once its board is approved (rebranding D2.7 and D3.1). Matching
 * never reads it. This reads a data file of Common Data Set counts, committed with the PR, and
 * writes `University.admitRate`, `internationalAdmitRate` and `admitRateYear`, nothing else.
 *
 *   <file>    The data file. Dry run: checks it and prints what would change. Nothing is written.
 *   --apply   Write the changed universities. A university not stored yet is listed and skipped,
 *             so the file can be run again after the PR that adds it is applied.
 *
 * .env points at PRODUCTION. Show the dry run to the owner and get approval before --apply.
 *
 * Run with:
 *   npx tsx scripts/programs/set-admit-rates.ts scripts/programs/2027/admit-rates-us.ts
 *   npx tsx scripts/programs/set-admit-rates.ts scripts/programs/2027/admit-rates-us.ts --apply
 */

import { existsSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { prisma } from '@/lib/prisma-standalone'
import { planAdmitRates, type AdmitRates, type AdmitRatesFile } from './lib/admit-rates'

function parseArgs(argv: string[]) {
  const args = { apply: false, file: null as string | null }
  for (const arg of argv) {
    if (arg === '--apply') args.apply = true
    else if (arg.startsWith('--')) throw new Error(`Unknown option: ${arg}`)
    else if (args.file === null) args.file = path.resolve(arg)
    else throw new Error('Give one data file')
  }
  if (!args.file)
    throw new Error('Give the data file, such as scripts/programs/2027/admit-rates-us.ts')
  return args as { apply: boolean; file: string }
}

const show = (rates: AdmitRates) =>
  rates.admitRate === null
    ? 'none'
    : `${rates.admitRate}%${rates.internationalAdmitRate === null ? '' : ` (international ${rates.internationalAdmitRate}%)`}, fall ${rates.admitRateYear}`

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!existsSync(args.file)) throw new Error(`No data file at ${args.file}`)
  const imported = (await import(pathToFileURL(args.file).href)) as { default?: AdmitRatesFile }
  // tsx can wrap a CommonJS default export once more.
  const loaded = imported.default as AdmitRatesFile & { default?: AdmitRatesFile }
  const data = loaded?.default ?? loaded

  const stored = await prisma.university.findMany({
    where: { name: { in: data.universities.map((u) => u.university), mode: 'insensitive' } },
    select: {
      id: true,
      name: true,
      admitRate: true,
      internationalAdmitRate: true,
      admitRateYear: true
    }
  })
  const plan = planAdmitRates(data, stored)

  console.log(
    `\n${args.apply ? '✏️  WRITING' : '🔍 DRY RUN'} — ${path.relative(process.cwd(), args.file)}`
  )
  if (plan.errors.length > 0) {
    console.error(`❌ Nothing written. Fix these first:\n  ${plan.errors.join('\n  ')}\n`)
    process.exitCode = 1
    return
  }
  for (const w of plan.writes) {
    console.log(`  SET       ${w.name}\n              ${show(w.from)} → ${show(w.to)}`)
  }
  for (const name of plan.unchanged) console.log(`  SAME      ${name}`)
  for (const name of plan.missing)
    console.log(`  MISSING   ${name}  (not stored yet: run again after it is added)`)
  console.log(
    `  Summary: ${plan.writes.length} to write, ${plan.unchanged.length} up to date, ${plan.missing.length} not stored yet.`
  )

  if (!args.apply) {
    console.log('\nDry run: nothing written. Re-run with --apply to write.\n')
    return
  }
  for (const w of plan.writes) {
    await prisma.university.update({ where: { id: w.id }, data: w.to, select: { id: true } })
    console.log(`  ✅ ${w.name}`)
  }
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
