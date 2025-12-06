/**
 * Algolia Index Initialization Script
 *
 * Simple script to verify Algolia connection and list existing indexes.
 * Algolia v5 creates indexes automatically when you add data.
 *
 * Run with: ALGOLIA_APP_ID=... ALGOLIA_ADMIN_API_KEY=... npx tsx scripts/algolia-init.ts
 */

import { algoliasearch } from 'algoliasearch'

const INDEX_NAMES = {
  PROGRAMS: 'programs_production',
  UNIVERSITIES: 'universities_production'
} as const

async function initializeAlgolia() {
  console.log('\n🔍 Algolia Connection Test\n')

  const appId = process.env.ALGOLIA_APP_ID || 'GG2AJQZ9U4'
  const apiKey = process.env.ALGOLIA_ADMIN_API_KEY

  if (!apiKey) {
    console.error('❌ ALGOLIA_ADMIN_API_KEY not set')
    console.log('\nSet it with:')
    console.log('  ALGOLIA_ADMIN_API_KEY=<your_key> npx tsx scripts/algolia-init.ts\n')
    process.exit(1)
  }

  console.log(`Application ID: ${appId}`)
  console.log(`API Key: ${apiKey.substring(0, 8)}...\n`)

  try {
    const client = algoliasearch(appId, apiKey)

    // List existing indexes
    console.log('📋 Listing indexes...\n')
    const { items: indices } = await client.listIndices()

    if (indices.length === 0) {
      console.log('   No indexes found yet.')
      console.log('   Indexes will be created automatically when data is added.\n')
    } else {
      console.log(`   Found ${indices.length} index(es):\n`)
      indices.forEach((index) => {
        console.log(`   • ${index.name} (${index.entries || 0} entries)`)
      })
      console.log('')
    }

    // Check for our expected indexes
    const indexNames = indices.map((i) => i.name)
    const programsExists = indexNames.includes(INDEX_NAMES.PROGRAMS)
    const universitiesExists = indexNames.includes(INDEX_NAMES.UNIVERSITIES)

    console.log('🎯 Expected Indexes:\n')
    console.log(`   ${programsExists ? '✅' : '⏳'} ${INDEX_NAMES.PROGRAMS}`)
    console.log(`   ${universitiesExists ? '✅' : '⏳'} ${INDEX_NAMES.UNIVERSITIES}\n`)

    if (!programsExists || !universitiesExists) {
      console.log('   ℹ️  Missing indexes will be created when you sync data.\n')
    }

    console.log('✅ Algolia connection successful!\n')
    console.log('Next steps:')
    console.log('  1. Add credentials to .env:')
    console.log('     ALGOLIA_APP_ID=GG2AJQZ9U4')
    console.log('     ALGOLIA_ADMIN_API_KEY=<your_admin_key>')
    console.log('     NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=<your_search_key>')
    console.log('  2. Create sync service')
    console.log('  3. Seed program data\n')
  } catch (error) {
    console.error('❌ Error connecting to Algolia:', error)
    process.exit(1)
  }
}

initializeAlgolia()
