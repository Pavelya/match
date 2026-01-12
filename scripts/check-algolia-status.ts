/**
 * Check Algolia index status and compare with database
 */
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { algoliasearch } from 'algoliasearch'

const prisma = new PrismaClient()

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

  // Browse all records in Algolia
  const algoliaIds = new Set<string>()

  // Use browse to get all records
  const browseResponse = await client.browse({
    indexName,
    browseParams: {
      attributesToRetrieve: ['objectID'],
      hitsPerPage: 1000
    }
  })

  for (const hit of browseResponse.hits) {
    algoliaIds.add((hit as { objectID: string }).objectID)
  }

  console.log('Algolia IDs found:', algoliaIds.size)

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
