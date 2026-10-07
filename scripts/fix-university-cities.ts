/**
 * Give each university one city: its seat or main campus (content task 8.2)
 *
 * Cards, program pages, search and the JSON-LD address show a program's city as
 * `program.campusCity ?? university.city`. Seven universities stored a list of campuses as their
 * city ("Prague, Hradec Králové, Plzeň"), which suits no single program; Linnaeus stored "LNU" and
 * Western "Ontario". This sets each to one place. A program taught elsewhere gets its own
 * campusCity through the refresh tool (scripts/programs/refresh.ts), from its official page.
 *
 * The table below is the record: each row's stored value, the city it becomes, and why. A row is
 * written only while it still holds `from`, so a re-run changes nothing; to undo one, swap its
 * `from` and `to` and run again.
 *
 * Dry run by default. --apply writes in one transaction, then syncs every program of those
 * universities to Algolia (each record copies the city) and clears the programs cache.
 *
 * .env points at PRODUCTION. Show the dry run to the owner and get approval before --apply.
 *
 * Run with:
 *   npx tsx scripts/fix-university-cities.ts            # dry run
 *   npx tsx scripts/fix-university-cities.ts --apply
 */

import { prisma } from '@/lib/prisma-standalone'
import { syncProgramsBatch } from '@/lib/algolia/sync'
import { invalidateProgramsCache } from '@/lib/matching/program-cache'

interface CityFix {
  university: string
  from: string
  to: string
  /** Why this city, and where it says so. Read 7 October 2026. */
  why: string
}

const CITIES: CityFix[] = [
  {
    university: 'Aarhus University',
    from: 'Aarhus, Herning',
    to: 'Aarhus',
    why: '5 of its 6 programs give "Place of study: Aarhus" (bachelor.au.dk); Economics and Business Administration (Herning) gets campusCity Herning'
  },
  {
    university: 'Catholic University of Portugal',
    from: 'Lisbon, Braga, Porto, Viseu',
    to: 'Lisbon',
    why: '4 of its 7 programs are at its Lisbon schools (clsbe.lisboa.ucp.pt, fcse.lisboa.ucp.pt); the two Porto programs and Medicine (Sintra campus, fm.ucp.pt) get a campusCity'
  },
  {
    university: 'Charles University',
    from: 'Prague, Hradec Králové, Plzeň',
    to: 'Prague',
    why: 'All 9 programs belong to Prague faculties: Social Sciences, Mathematics and Physics, Arts, Science, Physical Education and Sport (is.cuni.cz)'
  },
  {
    university: 'Dalarna University',
    from: 'Borlänge, Falun',
    to: 'Falun',
    why: 'Postal address "Dalarna University, 791 88 Falun" (du.se/en/about-du/contact-and-visit-us/); International Tourism Management gets campusCity Borlänge'
  },
  {
    university: 'Keio University',
    from: 'Tokyo, Fujisawa',
    to: 'Tokyo',
    why: 'PEARL is admitted at Mita, Tokyo (keio.ac.jp, PEARL page); the two GIGA programs get campusCity Fujisawa (Shonan Fujisawa Campus)'
  },
  {
    university: 'Linnaeus University',
    from: 'LNU',
    to: 'Växjö',
    why: '"LNU" is not a place. 7 of its 10 programs are at Campus Växjö (lnu.se programme pages); the 3 at Campus Kalmar get campusCity Kalmar'
  },
  {
    university: 'Technical University of Munich',
    from: 'Munich, Garching, Freising, Heilbronn, Straubing, Ottobrunn',
    to: 'Munich',
    why: 'Its main campus. Programs whose "Main Locations" (tum.de program pages) do not include Munich get a campusCity'
  },
  {
    university: 'University of Southern Denmark',
    from: 'Odense, Sønderborg, Vejle',
    to: 'Odense',
    why: 'Its main campus; Market and Management Anthropology gives "Location Odense" (sdu.dk). The 11 Sønderborg and Vejle programs get a campusCity'
  },
  {
    university: 'Western University',
    from: 'Ontario',
    to: 'London',
    why: '"Ontario" is the province. "1151 Richmond Street, London, Ontario" (uwo.ca)'
  }
]

async function main() {
  const apply = process.argv.includes('--apply')
  const unknown = process.argv.slice(2).filter((a) => a !== '--apply')
  if (unknown.length > 0) throw new Error(`Unknown argument: ${unknown.join(' ')}`)
  console.log(`\n${apply ? '✏️  WRITING' : '🔍 DRY RUN'} — university cities\n`)

  const stored = await prisma.university.findMany({
    where: { name: { in: CITIES.map((c) => c.university) } },
    select: { id: true, name: true, city: true, _count: { select: { programs: true } } }
  })
  const byName = new Map(stored.map((u) => [u.name, u]))

  const writes: Array<CityFix & { id: string }> = []
  for (const fix of CITIES) {
    const u = byName.get(fix.university)
    if (!u) {
      console.log(`  ⚠️  ${fix.university}: not in the database`)
    } else if (u.city === fix.to) {
      console.log(`  DONE    ${fix.university}: ${fix.to}`)
    } else if (u.city !== fix.from) {
      console.log(`  ⚠️  ${fix.university}: stored "${u.city}", expected "${fix.from}"; left alone`)
    } else {
      console.log(
        `  CITY    ${fix.university} (${u._count.programs} programs): "${fix.from}" → "${fix.to}"`
      )
      console.log(`            ${fix.why}`)
      writes.push({ ...fix, id: u.id })
    }
  }
  console.log(`\n  Summary: ${writes.length} to change.`)

  if (!apply) {
    console.log('\nDry run: nothing written. Re-run with --apply to write.\n')
    return
  }
  if (writes.length === 0) {
    console.log('\nNothing to write.\n')
    return
  }

  await prisma.$transaction(async (tx) => {
    for (const w of writes) {
      const { count } = await tx.university.updateMany({
        where: { id: w.id, city: w.from },
        data: { city: w.to }
      })
      if (count !== 1)
        throw new Error(`${w.university} changed since the plan; nothing was written`)
    }
  })
  console.log(`\n✅ Changed ${writes.length} cities.`)

  const programs = await prisma.academicProgram.findMany({
    where: { universityId: { in: writes.map((w) => w.id) } },
    select: { id: true }
  })
  const sync = await syncProgramsBatch(programs.map((p) => p.id))
  console.log(
    sync.failed === 0
      ? `🔎 Synced ${programs.length} programs to Algolia.`
      : `⚠️  Algolia sync failed for ${sync.failed}; run npx tsx scripts/sync-to-algolia-standalone.ts`
  )
  await invalidateProgramsCache()
  console.log('🗑️  Programs cache cleared.\n')
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
