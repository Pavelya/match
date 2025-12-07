/**
 * Configure Algolia Index Settings
 *
 * Sets up searchable attributes, faceting, and custom ranking.
 * Run with: npx tsx scripts/configure-algolia-settings.ts
 */

import 'dotenv/config'
import { algoliasearch } from 'algoliasearch'

async function configureAlgolia() {
  console.log('\n⚙️  Configuring Algolia Index Settings\n')
  console.log('='.repeat(50))

  const appId = process.env.ALGOLIA_APP_ID
  const apiKey = process.env.ALGOLIA_ADMIN_API_KEY

  if (!appId || !apiKey) {
    console.error('❌ Missing Algolia credentials')
    process.exit(1)
  }

  const client = algoliasearch(appId, apiKey)

  // Configure Programs index
  console.log('\n📦 Configuring programs_production index...')
  await client.setSettings({
    indexName: 'programs_production',
    indexSettings: {
      // Searchable attributes in order of priority
      searchableAttributes: [
        'programName',
        'universityName',
        'fieldOfStudy.name',
        'country.name',
        'description'
      ],

      // Faceting for filters
      attributesForFaceting: [
        'filterOnly(fieldOfStudyId)',
        'filterOnly(countryId)',
        'filterOnly(minimumIBPoints)',
        'searchable(fieldOfStudy.name)',
        'searchable(country.name)',
        'degreeType'
      ],

      // Custom ranking
      customRanking: [
        'desc(minimumIBPoints)' // Higher requirement programs rank higher
      ],

      // Typo tolerance (enabled by default, but being explicit)
      typoTolerance: true,
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 6,

      // Highlighting
      attributesToHighlight: ['programName', 'universityName', 'fieldOfStudy.name'],
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',

      // Performance
      hitsPerPage: 50,
      maxValuesPerFacet: 100
    }
  })
  console.log('   ✅ Programs index configured')

  // Configure Universities index
  console.log('\n🏛️  Configuring universities_production index...')
  await client.setSettings({
    indexName: 'universities_production',
    indexSettings: {
      searchableAttributes: ['name', 'abbreviatedName', 'country.name', 'description'],

      attributesForFaceting: ['filterOnly(countryId)', 'searchable(country.name)'],

      customRanking: [
        'desc(programCount)' // Universities with more programs rank higher
      ],

      typoTolerance: true,
      hitsPerPage: 20
    }
  })
  console.log('   ✅ Universities index configured')

  console.log('\n' + '='.repeat(50))
  console.log('✅ All index settings configured!\n')

  console.log('Configured features:')
  console.log('  • Searchable attributes with priority')
  console.log('  • Faceted filtering (field, country, points)')
  console.log('  • Custom ranking')
  console.log('  • Typo tolerance')
  console.log('  • Highlighting')
  console.log('')
}

configureAlgolia().catch(console.error)
