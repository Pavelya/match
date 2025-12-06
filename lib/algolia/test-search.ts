/**
 * Test Algolia Search Client
 *
 * Simple test to verify search client is working correctly.
 * Run with: ALGOLIA_APP_ID=... ALGOLIA_ADMIN_API_KEY=... npx tsx lib/algolia/test-search.ts
 */
/* eslint-disable no-console */

import { algoliasearch } from 'algoliasearch'

const INDEX_NAME = 'programs_production'

async function testSearch() {
  console.log('\n🔍 Testing Algolia Search Client\n')

  const appId = process.env.ALGOLIA_APP_ID || 'GG2AJQZ9U4'
  const apiKey = process.env.ALGOLIA_ADMIN_API_KEY

  if (!apiKey) {
    console.error('❌ ALGOLIA_ADMIN_API_KEY not set')
    process.exit(1)
  }

  try {
    const client = algoliasearch(appId, apiKey)

    console.log('✅ Client initialized')
    console.log(`   App ID: ${appId}`)
    console.log(`   Index: ${INDEX_NAME}\n`)

    // Test 1: List indices
    console.log('1️⃣  Listing indices...')
    const { items: indices } = await client.listIndices()
    console.log(`   Found ${indices.length} index(es)`)

    // Test 2: Try a simple search (will be empty until we add data)
    console.log('\n2️⃣  Testing search functionality...')
    const { results } = await client.search({
      requests: [
        {
          indexName: INDEX_NAME,
          query: 'medicine'
        }
      ]
    })

    const hits = results[0].hits || []
    console.log(`   Search returned ${hits.length} results`)

    if (hits.length === 0) {
      console.log('   ℹ️  No results (index is empty - expected before data sync)')
    } else {
      console.log(`   ✅ Found ${hits.length} matching programs`)
    }

    console.log('\n✅ Search client working correctly!\n')
    console.log('Next steps:')
    console.log('  1. Create sync service')
    console.log('  2. Add program data to index')
    console.log('  3. Test search with real data\n')
  } catch (error) {
    console.error('\n❌ Search test failed:', error)
    process.exit(1)
  }
}

testSearch()
