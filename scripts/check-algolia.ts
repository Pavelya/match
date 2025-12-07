/**
 * Check Algolia Index Status
 *
 * Run with: npx tsx scripts/check-algolia.ts
 */

import 'dotenv/config'
import { algoliasearch } from 'algoliasearch'

const INDEX_NAMES = {
  PROGRAMS: 'programs_production',
  UNIVERSITIES: 'universities_production'
} as const

async function checkAlgolia() {
  console.log('\n🔍 Algolia Index Status Check\n')
  console.log('='.repeat(50))

  const appId = process.env.ALGOLIA_APP_ID
  const apiKey = process.env.ALGOLIA_ADMIN_API_KEY

  if (!appId || !apiKey) {
    console.error('❌ Missing Algolia credentials in .env')
    process.exit(1)
  }

  console.log(`App ID: ${appId}`)
  console.log('')

  const client = algoliasearch(appId, apiKey)

  // List all indexes
  console.log('📋 All Indexes:')
  const { items: indices } = await client.listIndices()

  if (indices.length === 0) {
    console.log('   No indexes found.')
  } else {
    indices.forEach((index) => {
      console.log(`   • ${index.name}: ${index.entries || 0} records`)
    })
  }
  console.log('')

  // Check Programs index in detail
  console.log('📦 Programs Index Details:')
  try {
    const result = await client.searchSingleIndex({
      indexName: INDEX_NAMES.PROGRAMS,
      searchParams: { query: '', hitsPerPage: 3 }
    })
    console.log(`   Total records: ${result.nbHits}`)

    if (result.hits.length > 0) {
      console.log('   Sample record fields:', Object.keys(result.hits[0] as object).join(', '))
      console.log('\n   First 3 programs:')
      result.hits.forEach((hit: Record<string, unknown>, i) => {
        console.log(`     ${i + 1}. ${hit.programName} at ${hit.universityName}`)
      })
    }
  } catch (e) {
    console.log(`   ❌ Error: ${(e as Error).message}`)
  }
  console.log('')

  // Check Universities index
  console.log('🏛️  Universities Index Details:')
  try {
    const result = await client.searchSingleIndex({
      indexName: INDEX_NAMES.UNIVERSITIES,
      searchParams: { query: '', hitsPerPage: 3 }
    })
    console.log(`   Total records: ${result.nbHits}`)

    if (result.hits.length > 0) {
      console.log('   Sample record fields:', Object.keys(result.hits[0] as object).join(', '))
      console.log('\n   First 3 universities:')
      result.hits.forEach((hit: Record<string, unknown>, i) => {
        console.log(`     ${i + 1}. ${hit.name || hit.universityName || 'Unknown'}`)
      })
    }
  } catch (e) {
    console.log(`   ❌ Error: ${(e as Error).message}`)
  }
  console.log('')

  // Summary
  console.log('='.repeat(50))
  const programsIndex = indices.find((i) => i.name === INDEX_NAMES.PROGRAMS)
  const universitiesIndex = indices.find((i) => i.name === INDEX_NAMES.UNIVERSITIES)

  console.log('📊 Summary:')
  console.log(
    `   Programs:     ${programsIndex ? `${programsIndex.entries} records ✅` : 'Missing ❌'}`
  )
  console.log(
    `   Universities: ${universitiesIndex ? `${universitiesIndex.entries} records ✅` : 'Missing ❌'}`
  )
  console.log('')
}

checkAlgolia().catch(console.error)
