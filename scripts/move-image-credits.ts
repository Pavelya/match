/**
 * Move image credits out of university descriptions (content task 8.3)
 *
 * Every Wikimedia photo's credit was the last line of University.description, so the About
 * text ended with "Image attribution: By Jason Tong - Own work, CC BY-SA 3.0, https://…". The
 * licence requires the credit; it now lives in University.imageCredit and shows as a caption
 * under the image. `splitImageCredit` (lib/universities/image-credit.ts) decides what a credit
 * line is: the description's last line, labelled "Image attribution:" or "Image:", or a bare
 * "By … https://commons.wikimedia.org/…".
 *
 * Dry run by default: lists each university, its credit and how its description will end, then
 * what it leaves alone (a mention that is not a last-line credit, a credit already stored that
 * differs). Reads only universities whose description mentions "image" or "wikimedia".
 *
 * --apply first saves a backup of each row it changes (scripts/backups/, git-ignored), then
 * writes them in one transaction, each only if its description is still the one planned from.
 * Program records in Algolia and the programs cache hold no university description, so nothing
 * else needs refreshing; scripts/sync-universities-algolia.ts updates the universities index,
 * which no page reads today.
 *
 * .env points at PRODUCTION. Show the dry run to the owner and get approval before --apply.
 *
 * Run with:
 *   npx tsx scripts/move-image-credits.ts                              # dry run
 *   npx tsx scripts/move-image-credits.ts --apply
 *   npx tsx scripts/move-image-credits.ts --restore <backup.json> [--apply]
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { prisma } from '@/lib/prisma-standalone'
import { splitImageCredit } from '@/lib/universities/image-credit'

const BACKUP_DIR = path.join(__dirname, 'backups', 'move-image-credits')

interface Move {
  id: string
  name: string
  from: string
  description: string
  credit: string
  hasImage: boolean
}

interface Backup {
  takenAt: string
  rows: { id: string; name: string; description: string; imageCredit: string | null }[]
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

async function plan() {
  const universities = await prisma.university.findMany({
    where: {
      OR: [
        { description: { contains: 'image', mode: 'insensitive' } },
        { description: { contains: 'wikimedia', mode: 'insensitive' } }
      ]
    },
    select: { id: true, name: true, description: true, image: true, imageCredit: true },
    orderBy: { name: 'asc' }
  })
  const moves: Move[] = []
  const left: string[] = []
  for (const u of universities) {
    const split = splitImageCredit(u.description)
    if (!split) {
      left.push(`${u.name}: mentions an image, but its last line is not a credit`)
    } else if (u.imageCredit && u.imageCredit !== split.credit) {
      left.push(`${u.name}: already credits "${u.imageCredit}"; its description ends with another`)
    } else {
      moves.push({
        id: u.id,
        name: u.name,
        from: u.description,
        description: split.description,
        credit: split.credit,
        hasImage: Boolean(u.image)
      })
    }
  }
  return { moves, left }
}

const ending = (text: string) => (text.length > 70 ? `…${text.slice(-70)}` : text)

function printPlan({ moves, left }: Awaited<ReturnType<typeof plan>>) {
  for (const m of moves) {
    console.log(
      `\n  ${m.name}${m.hasImage ? '' : '  ⚠️  no image: the caption shows once one is added'}`
    )
    console.log(`    Credit:      ${m.credit}`)
    console.log(`    About ends:  ${ending(m.description).replace(/\n/g, '⏎')}`)
  }
  for (const line of left) console.log(`\n  LEFT  ${line}`)
  console.log(`\n  Summary: ${moves.length} credits to move, ${left.length} left as they are.`)
}

/** Universities whose description still ends with a credit, by the same rule. */
async function remaining(): Promise<number> {
  return (await plan()).moves.length
}

async function restore(file: string, apply: boolean) {
  const backup = JSON.parse(readFileSync(file, 'utf8')) as Backup
  console.log(`\nRestore ${backup.rows.length} descriptions and credits from ${backup.takenAt}.`)
  if (!apply) {
    console.log('\nDry run: nothing written. Re-run with --apply to restore.\n')
    return
  }
  await prisma.$transaction(
    backup.rows.map(({ id, description, imageCredit }) =>
      prisma.university.update({
        where: { id },
        data: { description, imageCredit },
        select: { id: true }
      })
    )
  )
  console.log(`✅ Restored ${backup.rows.length} universities.\n`)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  console.log(`\n${args.apply ? '✏️  WRITING' : '🔍 DRY RUN'} — image credits`)
  if (args.restore) return restore(path.resolve(args.restore), args.apply)

  const planned = await plan()
  printPlan(planned)
  const { moves } = planned

  if (!args.apply) {
    console.log('\nDry run: nothing written. Re-run with --apply to write.\n')
    return
  }
  if (moves.length === 0) {
    console.log('\nNothing to write.\n')
    return
  }

  const stored = await prisma.university.findMany({
    where: { id: { in: moves.map((m) => m.id) } },
    select: { id: true, imageCredit: true }
  })
  const credits = new Map(stored.map((s) => [s.id, s.imageCredit]))
  const backup: Backup = {
    takenAt: new Date().toISOString(),
    rows: moves.map((m) => ({
      id: m.id,
      name: m.name,
      description: m.from,
      imageCredit: credits.get(m.id) ?? null
    }))
  }
  mkdirSync(BACKUP_DIR, { recursive: true })
  const backupFile = path.join(BACKUP_DIR, `${backup.takenAt.replace(/[:.]/g, '-')}.json`)
  writeFileSync(backupFile, JSON.stringify(backup, null, 2))
  console.log(`\n💾 Backup: ${path.relative(process.cwd(), backupFile)}`)

  // Each update matches the description it planned from, so a row edited since rolls everything back.
  await prisma.$transaction(async (tx) => {
    for (const m of moves) {
      const { count } = await tx.university.updateMany({
        where: { id: m.id, description: m.from },
        data: { description: m.description, imageCredit: m.credit }
      })
      if (count !== 1) throw new Error(`${m.name} changed since the plan; nothing was written`)
    }
  })
  console.log(`✅ Moved ${moves.length} credits.`)
  console.log(`🔎 Descriptions still ending with a credit: ${await remaining()}.\n`)
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
