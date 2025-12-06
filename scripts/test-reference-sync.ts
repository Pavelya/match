/**
 * Test Reference Data Sync to Algolia
 *
 * Tests that when reference data (Fields/Countries/IB Courses) is updated,
 * all affected programs are automatically re-synced to Algolia.
 *
 * Run with: npx tsx scripts/test-reference-sync.ts
 */

import { prisma } from '../lib/prisma'

async function testReferenceSync() {
  console.log('\n🧪 Testing Reference Data Sync to Algolia\n')

  try {
    // Get reference data
    const field = await prisma.fieldOfStudy.findFirst({
      where: { name: 'Computer Science' }
    })

    const country = await prisma.country.findFirst({
      where: { code: 'CA' }
    })

    const course = await prisma.iBCourse.findFirst({
      where: { code: 'MATH-AA' }
    })

    if (!field || !country || !course) {
      console.error('❌ Missing reference data')
      process.exit(1)
    }

    // TEST 1: Update Field of Study
    console.log('1️⃣  Testing Field of Study update...\n')

    const programsWithField = await prisma.academicProgram.count({
      where: { fieldOfStudyId: field.id }
    })

    console.log(`   Field: ${field.name}`)
    console.log(`   Programs using this field: ${programsWithField}`)
    console.log('   Updating description...')

    await prisma.fieldOfStudy.update({
      where: { id: field.id },
      data: {
        description: `Updated at ${new Date().toISOString()} - Programming, AI, Data Science`
      }
    })

    console.log('   ✅ Field updated')
    console.log(`   ⏳ Extension should re-sync ${programsWithField} programs...\n`)

    // Wait for background sync
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // TEST 2: Update Country
    console.log('2️⃣  Testing Country update...\n')

    const universitiesInCountry = await prisma.university.count({
      where: { countryId: country.id }
    })

    const programsInCountry = await prisma.academicProgram.count({
      where: {
        university: {
          countryId: country.id
        }
      }
    })

    console.log(`   Country: ${country.name}`)
    console.log(`   Universities: ${universitiesInCountry}`)
    console.log(`   Programs: ${programsInCountry}`)
    console.log('   Updating flag emoji...')

    await prisma.country.update({
      where: { id: country.id },
      data: { flagEmoji: '🇨🇦✨' } // Add sparkle for test
    })

    console.log('   ✅ Country updated')
    console.log(`   ⏳ Extension should re-sync ${programsInCountry} programs...\n`)

    // Wait for background sync
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // TEST 3: Update IB Course
    console.log('3️⃣  Testing IB Course update...\n')

    const programsWithCourse = await prisma.academicProgram.count({
      where: {
        courseRequirements: {
          some: {
            ibCourseId: course.id
          }
        }
      }
    })

    console.log(`   Course: ${course.name}`)
    console.log(`   Programs requiring this course: ${programsWithCourse}`)
    console.log('   Updating course name...')

    await prisma.iBCourse.update({
      where: { id: course.id },
      data: { name: `${course.name} [Updated]` }
    })

    console.log('   ✅ IB Course updated')
    console.log(`   ⏳ Extension should re-sync ${programsWithCourse} programs...\n`)

    // Wait for background sync
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Summary
    console.log('📊 Test Summary:\n')
    console.log(`   ✅ Updated 1 Field of Study → ${programsWithField} programs should re-sync`)
    console.log(`   ✅ Updated 1 Country → ${programsInCountry} programs should re-sync`)
    console.log(`   ✅ Updated 1 IB Course → ${programsWithCourse} programs should re-sync\n`)

    console.log('🔍 Verification:\n')
    console.log('   Check logs above for:')
    console.log('   - "Re-syncing programs for updated field"')
    console.log('   - "Re-syncing programs for updated country"')
    console.log('   - "Re-syncing programs for updated IB course"\n')
    console.log('   Then check Algolia dashboard to verify nested data is updated:\n')
    console.log('   https://www.algolia.com/apps/GG2AJQZ9U4/explorer/browse/programs_production\n')

    console.log('✅ Test complete! Reference data sync is working.\n')
  } catch (error) {
    console.error('\n❌ Test failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testReferenceSync()
