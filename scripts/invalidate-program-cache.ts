/**
 * Invalidate Programs Cache
 *
 * Clears the Redis cache for programs to force fresh data fetch.
 * Useful after university updates (images, names, etc.)
 *
 * Run with: npx tsx scripts/invalidate-program-cache.ts
 */

import 'dotenv/config'
import { invalidateProgramsCache, warmProgramsCache } from '../lib/matching/program-cache'

async function main() {
  console.log('\n🔄 Invalidating Programs Cache\n')

  try {
    await invalidateProgramsCache()
    console.log('✅ Programs cache invalidated')

    console.log('\n🔄 Warming cache with fresh data...')
    await warmProgramsCache()
    console.log('✅ Cache warmed with fresh data')

    console.log('\n🎉 Done! Student matches will now show updated university images.\n')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }

  process.exit(0)
}

main()
