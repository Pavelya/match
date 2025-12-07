/**
 * Sync Universities to Algolia
 *
 * Creates/updates the universities_production index with all universities.
 * Run with: npx tsx scripts/sync-universities-algolia.ts
 */

import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { algoliasearch } from 'algoliasearch'

const prisma = new PrismaClient()

interface AlgoliaUniversityRecord {
  [key: string]: unknown
  objectID: string
  universityId: string
  name: string
  abbreviatedName?: string
  description?: string
  website?: string
  countryId: string
  country: {
    id: string
    name: string
    code: string
  }
  programCount: number
  createdAt: number
  updatedAt: number
}

async function syncUniversities() {
  console.log('\n🏛️  Syncing Universities to Algolia\n')
  console.log('='.repeat(50))

  const appId = process.env.ALGOLIA_APP_ID
  const apiKey = process.env.ALGOLIA_ADMIN_API_KEY

  if (!appId || !apiKey) {
    console.error('❌ Missing Algolia credentials in .env')
    process.exit(1)
  }

  const client = algoliasearch(appId, apiKey)
  const indexName = 'universities_production'

  try {
    // Fetch all universities with related data
    console.log('\n1️⃣  Fetching universities from database...')
    const universities = await prisma.university.findMany({
      include: {
        country: true,
        _count: {
          select: { programs: true }
        }
      }
    })

    console.log(`   Found ${universities.length} universities\n`)

    // Transform to Algolia records
    console.log('2️⃣  Transforming to Algolia records...')
    const records: AlgoliaUniversityRecord[] = universities.map((uni) => ({
      objectID: uni.id,
      universityId: uni.id,
      name: uni.name,
      abbreviatedName: uni.abbreviatedName ?? undefined,
      description: uni.description ?? undefined,
      website: uni.website ?? undefined,

      countryId: uni.country.id,
      country: {
        id: uni.country.id,
        name: uni.country.name,
        code: uni.country.code
      },

      programCount: uni._count.programs,
      createdAt: uni.createdAt.getTime(),
      updatedAt: uni.updatedAt.getTime()
    }))

    console.log(`   Transformed ${records.length} records\n`)

    // Sync to Algolia
    console.log('3️⃣  Syncing to Algolia...')
    await client.saveObjects({
      indexName,
      objects: records
    })

    console.log(`   ✅ Synced ${records.length} universities\n`)

    // Configure searchable attributes
    console.log('4️⃣  Configuring index settings...')
    await client.setSettings({
      indexName,
      indexSettings: {
        searchableAttributes: ['name', 'abbreviatedName', 'description', 'country.name'],
        attributesForFaceting: ['countryId', 'country.name']
      }
    })
    console.log('   ✅ Index settings configured\n')

    // Verify
    console.log('5️⃣  Verifying...')
    const { items: indices } = await client.listIndices()
    const uniIndex = indices.find((i) => i.name === indexName)

    if (uniIndex) {
      console.log(`   ✅ Index "${indexName}" created`)
      console.log(`   📊 Entries: ${uniIndex.entries || 'pending'}\n`)
    }

    console.log('='.repeat(50))
    console.log('🎉 Universities sync complete!\n')
    console.log(`Check: https://www.algolia.com/apps/${appId}/explorer/browse/${indexName}\n`)
  } catch (error) {
    console.error('\n❌ Sync failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

syncUniversities()
