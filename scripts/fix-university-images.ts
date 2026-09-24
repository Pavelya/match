/**
 * Fix University Images Script
 *
 * Migrates university images and logos from base64 to Supabase Storage URLs.
 * Images must be URLs to appear in Algolia search results, and neither column
 * should hold binary data: every query that reads the whole University row
 * moves it, once per program when the row is joined.
 *
 * Run with: npx tsx scripts/fix-university-images.ts
 */

import { prisma } from '@/lib/prisma-standalone'
import { uploadUniversityImage, isBase64Image } from '../lib/supabase/storage'
import { syncUniversityProgramsToAlgolia } from '../lib/algolia/sync'
import { invalidateProgramsCache } from '../lib/matching/program-cache'

// The logo gets its own Storage key so it never overwrites the image's file.
const FIELDS = [
  { column: 'image', label: 'Image', fileKey: (id: string) => id },
  { column: 'logo', label: 'Logo', fileKey: (id: string) => `${id}-logo` }
] as const

async function fixUniversityImages() {
  console.log('\n🔧 Fixing University Images and Logos\n')

  try {
    // Find universities with an image or a logo
    const universities = await prisma.university.findMany({
      where: {
        OR: [{ image: { not: null } }, { logo: { not: null } }]
      },
      select: {
        id: true,
        name: true,
        image: true,
        logo: true,
        _count: {
          select: { programs: true }
        }
      }
    })

    console.log(`Found ${universities.length} universities with an image or logo\n`)

    let fixed = 0
    let skipped = 0
    let failed = 0
    let imagesFixed = 0

    for (const university of universities) {
      let imageChanged = false

      for (const { column, label, fileKey } of FIELDS) {
        const value = university[column]

        if (!value) {
          continue
        }

        // Check if it is already a URL
        if (value.startsWith('http')) {
          console.log(`✅ ${university.name}: ${label} already using URL`)
          skipped++
          continue
        }

        // Check if it's base64
        if (isBase64Image(value)) {
          console.log(`🔄 ${university.name}: Converting ${column} from base64 to Supabase URL...`)

          try {
            // Upload to Supabase
            const url = await uploadUniversityImage(value, fileKey(university.id))
            console.log(`   Uploaded to: ${url.substring(0, 60)}...`)

            // Update database
            await prisma.university.update({
              where: { id: university.id },
              data: { [column]: url },
              select: { id: true }
            })

            console.log('   ✅ Database updated')
            fixed++
            if (column === 'image') imageChanged = true
          } catch (error) {
            console.log('   ❌ Failed:', error instanceof Error ? error.message : error)
            failed++
          }
        } else {
          console.log(`⚠️ ${university.name}: Unknown ${column} format`)
          skipped++
        }
      }

      // Only the image reaches Algolia records and the programs cache; the logo
      // is in neither, so a logo-only change needs no resync.
      if (imageChanged) {
        imagesFixed++
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
      }
    }

    console.log('\n📊 Summary:')
    console.log(`   Fixed: ${fixed}`)
    console.log(`   Skipped: ${skipped}`)
    console.log(`   Failed: ${failed}`)

    // Invalidate programs cache so matches API gets fresh data
    if (imagesFixed > 0) {
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
