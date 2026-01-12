/**
 * Find and clean orphan records in Algolia
 *
 * Orphan records are entries in Algolia that no longer exist in the database.
 * This can happen when programs are deleted via the admin panel but Algolia
 * sync fails or when using seed scripts that don't clean up old data.
 *
 * Run with: npx tsx scripts/find-algolia-orphans.ts
 * To delete orphans: npx tsx scripts/find-algolia-orphans.ts --delete
 */

import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { algoliasearch } from 'algoliasearch'

const prisma = new PrismaClient()

async function findAlgoliaOrphans() {
  const shouldDelete = process.argv.includes('--delete')

  console.log('\n🔍 Finding Algolia Orphan Records\n')

  const appId = process.env.ALGOLIA_APP_ID
  const apiKey = process.env.ALGOLIA_ADMIN_API_KEY

  if (!appId || !apiKey) {
    console.error('Missing Algolia credentials (ALGOLIA_APP_ID or ALGOLIA_ADMIN_API_KEY)')
    process.exit(1)
  }

  // Initialize Algolia
  const algoliaClient = algoliasearch(appId, apiKey)
  const indexName = 'programs_production'

  try {
    // Get all program IDs from database
    const dbPrograms = await prisma.academicProgram.findMany({
      select: { id: true }
    })
    const dbIds = new Set(dbPrograms.map((p) => p.id))
    console.log(`📊 Database program count: ${dbIds.size}`)

    // Get all records from Algolia
    const algoliaRecords: {
      objectID: string
      programId: string
      programName?: string
      universityName?: string
    }[] = []

    await algoliaClient.browseObjects({
      indexName,
      browseParams: {
        query: '',
        attributesToRetrieve: ['objectID', 'programId', 'programName', 'universityName']
      },
      aggregator: (response) => {
        for (const hit of response.hits) {
          algoliaRecords.push({
            objectID: hit.objectID as string,
            programId: (hit as { programId?: string }).programId || '',
            programName: (hit as { programName?: string }).programName,
            universityName: (hit as { universityName?: string }).universityName
          })
        }
      }
    })

    console.log(`📦 Algolia record count: ${algoliaRecords.length}`)

    // Find orphans (in Algolia but not in DB)
    const orphans = algoliaRecords.filter((a) => !dbIds.has(a.programId))
    console.log(`\n🔎 Orphan records (in Algolia but not in DB): ${orphans.length}`)

    if (orphans.length === 0) {
      console.log('\n✅ No orphan records found! Database and Algolia are in sync.')
      return
    }

    // List orphans
    console.log('\nOrphan records:')
    orphans.forEach((o, i) => {
      console.log(`  ${i + 1}. ${o.programName || 'Unknown'} @ ${o.universityName || 'Unknown'}`)
      console.log(`     objectID: ${o.objectID}`)
    })

    if (shouldDelete) {
      console.log('\n🗑️  Deleting orphan records from Algolia...')

      const objectIDs = orphans.map((o) => o.objectID)
      await algoliaClient.deleteObjects({
        indexName,
        objectIDs
      })

      console.log(`✅ Deleted ${orphans.length} orphan records from Algolia`)
    } else {
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
