/**
 * Test Algolia Auto-Sync
 *
 * Tests that Prisma extension automatically syncs changes to Algolia:
 * - Deletes 10 programs (should auto-delete from Algolia)
 * - Renames 10 programs with ALGOLIA_SYNC_ prefix (should auto-update in Algolia)
 *
 * Run with: npx tsx scripts/test-algolia-autosync.ts
 */

import { prisma } from '../lib/prisma'

async function testAutoSync() {
  console.log('\n🧪 Testing Algolia Auto-Sync\n')

  try {
    // Get all programs
    const allPrograms = await prisma.academicProgram.findMany({
      select: { id: true, name: true }
    })

    console.log(`Found ${allPrograms.length} total programs\n`)

    if (allPrograms.length < 20) {
      console.error('❌ Need at least 20 programs for this test')
      process.exit(1)
    }

    // Split into two groups
    const programsToDelete = allPrograms.slice(0, 10)
    const programsToUpdate = allPrograms.slice(10, 20)

    // STEP 1: Delete 10 programs
    console.log('1️⃣  Deleting 10 programs (should auto-delete from Algolia)...\n')

    for (const program of programsToDelete) {
      await prisma.academicProgram.delete({
        where: { id: program.id }
      })
      console.log(`   🗑️  Deleted: ${program.name}`)
    }

    console.log(`\n   ✅ Deleted ${programsToDelete.length} programs from database`)
    console.log('   ⏳ Prisma extension should auto-delete from Algolia...\n')

    // Wait a moment for async operations
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // STEP 2: Update 10 programs with prefix
    console.log(
      '2️⃣  Updating 10 programs with ALGOLIA_SYNC_ prefix (should auto-update in Algolia)...\n'
    )

    for (const program of programsToUpdate) {
      const newName = `ALGOLIA_SYNC_${program.name}`
      await prisma.academicProgram.update({
        where: { id: program.id },
        data: { name: newName }
      })
      console.log(`   ✏️  Updated: ${program.name} → ${newName}`)
    }

    console.log(`\n   ✅ Updated ${programsToUpdate.length} programs in database`)
    console.log('   ⏳ Prisma extension should auto-update in Algolia...\n')

    // Wait for async operations
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // STEP 3: Summary
    console.log('📊 Test Summary:\n')
    console.log(`   Deleted: ${programsToDelete.length} programs`)
    console.log(`   Updated: ${programsToUpdate.length} programs`)
    console.log(`   Remaining in DB: ${allPrograms.length - programsToDelete.length} programs\n`)

    console.log('🔍 Verification Steps:\n')
    console.log('   1. Check Algolia dashboard:')
    console.log(
      '      https://www.algolia.com/apps/GG2AJQZ9U4/explorer/browse/programs_production\n'
    )
    console.log('   2. You should see:')
    console.log(`      - Only ${programsToUpdate.length} programs (deleted ones removed)`)
    console.log('      - All programs have "ALGOLIA_SYNC_" prefix\n')
    console.log('   3. If auto-sync worked, changes appear WITHOUT running manual sync!\n')

    console.log('✅ Test complete! Check Algolia dashboard to verify auto-sync.\n')
  } catch (error) {
    console.error('\n❌ Test failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testAutoSync()
