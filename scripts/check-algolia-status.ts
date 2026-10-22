/**
 * Check Algolia index status and compare with database
 *
 * Reads every record with `browseObjects`, which follows the cursor. A single `browse` stops at
 * 1,000, which once listed 279 programs as missing that were in the index (MAINT 5.6).
 * Read-only: writes nothing to the database or Algolia.
 */
import 'dotenv/config'
import { prisma } from '@/lib/prisma-standalone'
import { algoliasearch } from 'algoliasearch'

async function checkAlgoliaStatus() {
  console.log('\n🔍 Checking Algolia Status\n')

  const appId = process.env.ALGOLIA_APP_ID
  const apiKey = process.env.ALGOLIA_ADMIN_API_KEY

  if (!appId || !apiKey) {
    console.error('Missing Algolia credentials')
    process.exit(1)
  }

  const client = algoliasearch(appId, apiKey)
  const indexName = 'programs_production'

  // Get DB count
  const dbCount = await prisma.academicProgram.count()
  console.log('Database programs:', dbCount)

  // Get Algolia count
  const { items } = await client.listIndices()
  const idx = items.find((i) => i.name === indexName)

  if (idx) {
    console.log('Algolia entries:', idx.entries)
    console.log('Difference:', dbCount - (idx.entries || 0))
  }

  // Try to find which programs are missing
  console.log('\n🔄 Checking which programs are in Algolia...')

  // Get all DB program IDs
  const dbPrograms = await prisma.academicProgram.findMany({
    select: { id: true, name: true, university: { select: { name: true } } }
  })

  // Browse all records in Algolia, page by page
  const algoliaIds = new Set<string>()

  await client.browseObjects({
    indexName,
    browseParams: {
      attributesToRetrieve: ['objectID'],
      hitsPerPage: 1000
    },
    aggregator: (response) => {
      for (const hit of response.hits) {
        algoliaIds.add(hit.objectID)
      }
    }
  })

  console.log('Algolia IDs found:', algoliaIds.size)

  // A paging bug shows up here rather than as a list of false "missing" programs
  if (idx && algoliaIds.size !== idx.entries) {
    console.log(`⚠️  Read ${algoliaIds.size} records but the index reports ${idx.entries} entries`)
  }

  // Find missing
  const missing = dbPrograms.filter((p) => !algoliaIds.has(p.id))

  if (missing.length > 0) {
    console.log('\n❌ Missing from Algolia:')
    for (const p of missing.slice(0, 20)) {
      console.log(`  - ${p.university.name}: ${p.name}`)
    }
    if (missing.length > 20) {
      console.log(`  ... and ${missing.length - 20} more`)
    }
  } else {
    console.log('\n✅ All programs are in Algolia!')
  }

  await prisma.$disconnect()
}

checkAlgoliaStatus()
