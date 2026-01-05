/**
 * Fix UBC Program URLs
 *
 * Updates UBC programs with correct official URLs.
 * The URL pattern varies by program - some have -vancouver suffix, some don't.
 *
 * Run with: npx tsx scripts/fix-ubc-urls.ts
 */

import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { invalidateProgramsCache } from '../lib/matching/program-cache'
import { syncUniversityProgramsToAlgolia } from '../lib/algolia/sync'

const prisma = new PrismaClient()

// Correct URL mapping for each program (verified against you.ubc.ca)
// Format: { "Program Name in DB": "correct-url-slug" }
const urlMappings: Record<string, string> = {
  // Engineering programs - use -vancouver suffix
  'Computer Engineering': 'computer-engineering-vancouver',
  'Electrical Engineering': 'electrical-engineering-vancouver',
  'Mechanical Engineering': 'mechanical-engineering-vancouver',
  'Civil Engineering': 'civil-engineering-vancouver',
  'Chemical Engineering': 'chemical-and-biological-engineering-vancouver',
  'Environmental Engineering': 'environmental-engineering-vancouver',
  'Biomedical Engineering': 'biomedical-engineering-vancouver',
  'Engineering Physics': 'engineering-physics-vancouver',
  'Mining Engineering': 'mining-engineering-vancouver',
  'Materials Engineering': 'materials-engineering-vancouver',
  'Geological Engineering': 'geological-engineering-vancouver',

  // Science programs - most use -vancouver suffix
  'Computer Science': 'computer-science-vancouver-science',
  Biology: 'biology-vancouver',
  Chemistry: 'chemistry-vancouver',
  Physics: 'physics-vancouver',
  Mathematics: 'mathematics-vancouver',
  Statistics: 'statistics-vancouver',
  'Earth and Ocean Sciences': 'earth-ocean-and-atmospheric-sciences-vancouver',
  'Environmental Sciences': 'environmental-sciences-vancouver',
  'Microbiology and Immunology': 'microbiology-and-immunology-vancouver',
  Biochemistry: 'biochemistry-vancouver',
  Astronomy: 'astronomy-vancouver',
  'Atmospheric Science': 'atmospheric-science-vancouver',
  'Integrated Sciences': 'integrated-sciences-vancouver',
  Pharmacology: 'pharmacology-vancouver',
  'Cognitive Systems': 'cognitive-systems-vancouver',
  'Data Science': 'data-science', // Okanagan campus, no suffix

  // Commerce (Sauder) - no suffix
  Commerce: 'commerce',

  // Arts programs - use -vancouver suffix
  Economics: 'economics-vancouver',
  Psychology: 'psychology-vancouver',
  'Political Science': 'political-science-vancouver',
  Philosophy: 'philosophy-vancouver',
  History: 'history-vancouver',
  'English Language and Literatures': 'english-vancouver',
  Sociology: 'sociology-vancouver',
  Anthropology: 'anthropology-vancouver',
  Geography: 'geography-vancouver',
  'International Relations': 'international-relations-vancouver',
  Linguistics: 'linguistics-vancouver',
  'Media Studies': 'media-studies-vancouver',

  // Kinesiology - special name
  Kinesiology: 'health-and-exercise-sciences',

  // Land & Food Systems
  'Food Science': 'food-science-vancouver',
  'Nutritional Sciences': 'food-nutrition-and-health-vancouver',
  'Global Resource Systems': 'global-resource-systems',

  // Forestry
  'Forest Sciences': 'forest-sciences-vancouver',
  'Natural Resources Conservation': 'natural-resources-conservation-vancouver',
  'Wood Products Processing': 'wood-products-processing-vancouver',

  // Architecture - SALA programs
  'Design in Architecture': 'design-in-architecture-landscape-and-urbanism',
  'Landscape Architecture': 'design-in-architecture-landscape-and-urbanism', // Same program

  // Music
  Music: 'music-vancouver'
}

const BASE_URL = 'https://you.ubc.ca/ubc_programs/'

async function fixUBCUrls() {
  console.log('\n🔧 Fixing UBC Program URLs\n')

  try {
    // Find UBC
    const ubc = await prisma.university.findFirst({
      where: {
        name: { equals: 'University of British Columbia', mode: 'insensitive' }
      }
    })

    if (!ubc) {
      console.error('❌ University of British Columbia not found')
      process.exit(1)
    }

    console.log(`✅ Found UBC (ID: ${ubc.id})\n`)

    // Get all UBC programs
    const programs = await prisma.academicProgram.findMany({
      where: { universityId: ubc.id },
      select: { id: true, name: true, programUrl: true }
    })

    console.log(`📚 Found ${programs.length} UBC programs\n`)

    let updated = 0
    let notMapped = 0
    let unchanged = 0

    for (const program of programs) {
      const slug = urlMappings[program.name]

      if (!slug) {
        console.log(`   ⚠️  No mapping for: ${program.name}`)
        notMapped++
        continue
      }

      const correctUrl = `${BASE_URL}${slug}/`

      if (program.programUrl === correctUrl) {
        console.log(`   ✅ ${program.name} - already correct`)
        unchanged++
        continue
      }

      await prisma.academicProgram.update({
        where: { id: program.id },
        data: { programUrl: correctUrl }
      })

      console.log(`   🔄 ${program.name}`)
      console.log(`      Old: ${program.programUrl}`)
      console.log(`      New: ${correctUrl}`)
      updated++
    }

    console.log('\n' + '─'.repeat(50))
    console.log('\n📊 Summary:')
    console.log(`   ✅ Updated: ${updated} programs`)
    console.log(`   ⏭️  Unchanged: ${unchanged} programs`)
    console.log(`   ⚠️  Not mapped: ${notMapped} programs`)

    if (updated > 0) {
      console.log('\n🔄 Syncing to Algolia...')
      await syncUniversityProgramsToAlgolia(ubc.id)
      console.log('   ✅ Algolia sync complete')

      console.log('\n🔄 Invalidating programs cache...')
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

fixUBCUrls()
