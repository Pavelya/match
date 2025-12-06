/**
 * Manually sync all programs to Algolia
 *
 * Run with credentials:
 * ALGOLIA_APP_ID=... ALGOLIA_ADMIN_API_KEY=... npx tsx scripts/manual-algolia-sync.ts
 */

import { syncAllProgramsToAlgolia } from '../lib/algolia/sync'

async function manualSync() {
  console.log('\n🔄 Manual Algolia Sync\n')

  const result = await syncAllProgramsToAlgolia()

  console.log('\n✅ Sync complete:')
  console.log(`   Success: ${result.success}`)
  console.log(`   Failed: ${result.failed}\n`)

  if (result.failed > 0) {
    console.log('⚠️  Some programs failed to sync. Check logs for details.\n')
  }
}

manualSync()
