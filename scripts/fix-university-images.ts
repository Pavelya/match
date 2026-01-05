/**
 * Fix University Images Script
 *
 * Migrates university images from base64 to Supabase Storage URLs.
 * This ensures images appear in Algolia search results.
 *
 * Run with: npx tsx scripts/fix-university-images.ts
 */

import { PrismaClient } from '@prisma/client'
import { uploadUniversityImage, isBase64Image } from '../lib/supabase/storage'
import { syncUniversityProgramsToAlgolia } from '../lib/algolia/sync'
import { invalidateProgramsCache } from '../lib/matching/program-cache'

const prisma = new PrismaClient()

async function fixUniversityImages() {
  console.log('\n🔧 Fixing University Images\n')

  try {
    // Find universities with base64 images
    const universities = await prisma.university.findMany({
      where: {
        image: {
          not: null
        }
      },
      select: {
        id: true,
        name: true,
        image: true,
        _count: {
          select: { programs: true }
        }
      }
    })

    console.log(`Found ${universities.length} universities with images\n`)

    let fixed = 0
    let skipped = 0
    let failed = 0

    for (const university of universities) {
      if (!university.image) {
        skipped++
        continue
      }

      // Check if image is already a URL
      if (university.image.startsWith('http')) {
        console.log(`✅ ${university.name}: Already using URL`)
        skipped++
        continue
      }

      // Check if it's base64
      if (isBase64Image(university.image)) {
        console.log(`🔄 ${university.name}: Converting base64 to Supabase URL...`)

        try {
          // Upload to Supabase
          const imageUrl = await uploadUniversityImage(university.image, university.id)
          console.log(`   Uploaded to: ${imageUrl.substring(0, 60)}...`)

          // Update database
          await prisma.university.update({
            where: { id: university.id },
            data: { image: imageUrl }
          })

          console.log('   ✅ Database updated')

          // Sync programs to Algolia if university has programs
          if (university._count.programs > 0) {
            console.log(`   🔄 Syncing ${university._count.programs} programs to Algolia...`)
            const success = await syncUniversityProgramsToAlgolia(university.id)
            if (success) {
              console.log('   ✅ Algolia sync complete')
            } else {
              console.log('   ⚠️ Algolia sync had some failures')
            }
          } else {
            console.log('   ℹ️ No programs to sync to Algolia')
          }

          fixed++
        } catch (error) {
          console.log('   ❌ Failed:', error instanceof Error ? error.message : error)
          failed++
        }
      } else {
        console.log(`⚠️ ${university.name}: Unknown image format`)
        skipped++
      }
    }

    console.log('\n📊 Summary:')
    console.log(`   Fixed: ${fixed}`)
    console.log(`   Skipped: ${skipped}`)
    console.log(`   Failed: ${failed}`)

    // Invalidate programs cache so matches API gets fresh data
    if (fixed > 0) {
      console.log('\n🔄 Invalidating programs cache for matches API...')
      await invalidateProgramsCache()
      console.log('   ✅ Cache invalidated')
    }

    console.log('\n🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

fixUniversityImages()
