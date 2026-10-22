/**
 * Find and clean orphan records in Algolia
 *
 * Orphan records are entries in Algolia that no longer exist in the database.
 * This can happen when programs are deleted via the admin panel but Algolia
 * sync fails or when using seed scripts that don't clean up old data.
 *
 * Checks both indexes: programs_production against AcademicProgram and
 * universities_production against University (MAINT 5.9). Reads every record
 * with `browseObjects`, which follows the cursor.
 *
 * `--delete` saves each orphan's full record to scripts/backups/ (git-ignored)
 * first: Algolia records are not in the database backup.
 *
 * Run with: npx tsx scripts/find-algolia-orphans.ts
 * One index only: npx tsx scripts/find-algolia-orphans.ts --index universities
 * To delete orphans: npx tsx scripts/find-algolia-orphans.ts --delete
 */

import 'dotenv/config'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { prisma } from '@/lib/prisma-standalone'
import { algoliasearch, type Algoliasearch } from 'algoliasearch'

type Orphan = { objectID: string; label: string }

// Each index, the attribute its records keep the row id in, and how to read the database ids.
const INDEXES = {
  programs: {
    indexName: 'programs_production',
    idAttribute: 'programId',
    labelAttributes: ['programName', 'universityName'],
    label: (hit: Record<string, unknown>) =>
      `${hit.programName || 'Unknown'} @ ${hit.universityName || 'Unknown'}`,
    dbIds: async () =>
      (await prisma.academicProgram.findMany({ select: { id: true } })).map((p) => p.id)
  },
  universities: {
    indexName: 'universities_production',
    idAttribute: 'universityId',
    labelAttributes: ['name'],
    label: (hit: Record<string, unknown>) => String(hit.name || 'Unknown'),
    dbIds: async () => (await prisma.university.findMany({ select: { id: true } })).map((u) => u.id)
  }
} as const

type IndexKey = keyof typeof INDEXES

function parseArgs(argv: string[]) {
  const args = { delete: false, indexes: Object.keys(INDEXES) as IndexKey[] }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--delete') args.delete = true
    else if (arg === '--index') {
      const value = argv[++i]
      if (!(value in INDEXES)) throw new Error(`--index takes one of: ${Object.keys(INDEXES)}`)
      args.indexes = [value as IndexKey]
    } else throw new Error(`Unknown option: ${arg}`)
  }
  return args
}

async function findOrphans(client: Algoliasearch, key: IndexKey) {
  const { indexName, idAttribute, labelAttributes, label, dbIds } = INDEXES[key]
  console.log(`\n── ${indexName}`)

  const ids = new Set(await dbIds())
  console.log(`📊 Database ${key} count: ${ids.size}`)

  const orphans: Orphan[] = []
  let records = 0
  await client.browseObjects({
    indexName,
    browseParams: {
      query: '',
      attributesToRetrieve: ['objectID', idAttribute, ...labelAttributes],
      hitsPerPage: 1000
    },
    aggregator: (response) => {
      for (const hit of response.hits) {
        records++
        const record = hit as Record<string, unknown>
        const id = (record[idAttribute] as string | undefined) || hit.objectID
        if (!ids.has(id)) orphans.push({ objectID: hit.objectID, label: label(record) })
      }
    }
  })

  console.log(`📦 Algolia record count: ${records}`)
  console.log(`🔎 Orphan records (in Algolia but not in DB): ${orphans.length}`)
  orphans.forEach((o, i) => {
    console.log(`  ${i + 1}. ${o.label}`)
    console.log(`     objectID: ${o.objectID}`)
  })
  return orphans
}

// Save the orphans' full records, then delete them. Returns the backup file.
async function backUpAndDelete(client: Algoliasearch, key: IndexKey, orphans: Orphan[]) {
  const { indexName } = INDEXES[key]
  const { results } = await client.getObjects({
    requests: orphans.map((o) => ({ indexName, objectID: o.objectID }))
  })
  if (results.some((r) => !r)) throw new Error(`Could not read every orphan from ${indexName}`)

  const dir = path.join('scripts', 'backups')
  mkdirSync(dir, { recursive: true })
  const file = path.join(
    dir,
    `algolia-orphans-${indexName}-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
  )
  writeFileSync(file, JSON.stringify(results, null, 2))
  console.log(`💾 Saved ${results.length} records to ${file}`)

  await client.deleteObjects({
    indexName,
    objectIDs: orphans.map((o) => o.objectID),
    waitForTasks: true
  })
  console.log(`✅ Deleted ${orphans.length} orphan records from ${indexName}`)
}

async function findAlgoliaOrphans() {
  const args = parseArgs(process.argv.slice(2))

  console.log('\n🔍 Finding Algolia Orphan Records')

  const appId = process.env.ALGOLIA_APP_ID
  const apiKey = process.env.ALGOLIA_ADMIN_API_KEY

  if (!appId || !apiKey) {
    console.error('Missing Algolia credentials (ALGOLIA_APP_ID or ALGOLIA_ADMIN_API_KEY)')
    process.exit(1)
  }

  const algoliaClient = algoliasearch(appId, apiKey)

  try {
    let total = 0
    for (const key of args.indexes) {
      const orphans = await findOrphans(algoliaClient, key)
      total += orphans.length
      if (args.delete && orphans.length > 0) {
        console.log('\n🗑️  Deleting orphan records from Algolia...')
        await backUpAndDelete(algoliaClient, key, orphans)
      }
    }

    if (total === 0) {
      console.log('\n✅ No orphan records found! Database and Algolia are in sync.')
    } else if (!args.delete) {
      console.log('\n💡 To delete these orphan records, run:')
      console.log('   npx tsx scripts/find-algolia-orphans.ts --delete')
    }

    console.log('\n🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

findAlgoliaOrphans()
