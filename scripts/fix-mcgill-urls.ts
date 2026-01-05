/**
 * Fix McGill Program URLs
 *
 * Updates all McGill program URLs from the old eCalendar format
 * (mcgill.ca/study/2024-2025/...) to the new Course Catalogue format
 * (coursecatalogue.mcgill.ca/en/undergraduate/...)
 *
 * Run with: npx tsx scripts/fix-mcgill-urls.ts
 */

import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Map program names to their new URLs
// Format: coursecatalogue.mcgill.ca/en/undergraduate/[faculty]/programs/[department]/[program-slug]/
const urlMappings: Record<string, string> = {
  // ENGINEERING FACULTY
  'Computer Science':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/computer-science/computer-science-major-bsc/',
  'Software Engineering':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/electrical-computer/software-engineering-beng/',
  'Computer Engineering':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/electrical-computer/computer-engineering-beng/',
  'Electrical Engineering':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/electrical-computer/electrical-engineering-beng/',
  'Mechanical Engineering':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/mechanical-engineering/mechanical-engineering-beng/',
  'Civil Engineering':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/civil-engineering/civil-engineering-beng/',
  'Chemical Engineering':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/chemical-engineering/chemical-engineering-beng/',
  Bioengineering:
    'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/bioengineering/bioengineering-beng/',
  'Materials Engineering':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/materials-engineering/materials-engineering-beng/',
  'Mining Engineering':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/mining-materials/mining-engineering-beng/',
  Architecture:
    'https://coursecatalogue.mcgill.ca/en/undergraduate/engineering/programs/architecture/architecture-bscarch/',

  // MANAGEMENT FACULTY (Commerce)
  Commerce: 'https://coursecatalogue.mcgill.ca/en/undergraduate/management/programs/',

  // SCIENCE FACULTY
  Biology:
    'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/biology/biology-major-bsc/',
  Chemistry:
    'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/chemistry/chemistry-major-bsc/',
  Physics:
    'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/physics/physics-major-bsc/',
  Mathematics:
    'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/math-stats/mathematics-major-bsc/',
  Biochemistry:
    'https://coursecatalogue.mcgill.ca/en/undergraduate/science/programs/biochemistry/biochemistry-major-bsc/',

  // ARTS FACULTY
  Economics:
    'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/economics/economics-major-ba/',
  Psychology:
    'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/psychology/psychology-major-concentration-ba/',
  'Political Science':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/political-science/political-science-major-concentration-ba/',
  History:
    'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/history-classical-studies/history-major-ba/',
  Philosophy:
    'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/philosophy/philosophy-major-ba/',
  'English Literature':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/english/english-major-concentration-ba/',
  Sociology:
    'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/sociology/sociology-major-ba/',
  Anthropology:
    'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/anthropology/anthropology-major-ba/',
  'International Development Studies':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/arts/programs/ids/international-development-studies-major-ba/',

  // NURSING
  Nursing: 'https://coursecatalogue.mcgill.ca/en/undergraduate/nursing/programs/',

  // MUSIC
  Music: 'https://coursecatalogue.mcgill.ca/en/undergraduate/music/programs/',

  // EDUCATION FACULTY
  'Elementary Education':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/education/programs/integrated-studies/kindergarten-elementary-education-bed/',
  'Secondary Education - Mathematics':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/education/programs/integrated-studies/secondary-education-bed/',
  'Physical Education':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/education/programs/kinesiology/physical-health-education-bed/',
  Kinesiology:
    'https://coursecatalogue.mcgill.ca/en/undergraduate/education/programs/kinesiology/kinesiology-bsc/',

  // AGRICULTURAL & ENVIRONMENTAL SCIENCES
  'Environmental Science':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/agri-env-sci/programs/natural-resource-sciences/environment-major-bscagenvsci/',
  'Food Science':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/agri-env-sci/programs/food-science/food-science-bscfsc/',
  'Agricultural Economics':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/agri-env-sci/programs/natural-resource-sciences/agricultural-economics-major-bscagenvsci/',
  'Bioresource Engineering':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/agri-env-sci/programs/bioresource-engineering/bioresource-engineering-beng/',
  'Dietetics and Human Nutrition':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/agri-env-sci/programs/human-nutrition/dietetics-major-bscnutrsc/',

  // SOCIAL WORK
  'Social Work': 'https://coursecatalogue.mcgill.ca/en/undergraduate/social-work/programs/',

  // INTERFACULTY (Arts & Science)
  'Arts and Science': 'https://coursecatalogue.mcgill.ca/en/undergraduate/arts-science/programs/',
  'Cognitive Science':
    'https://coursecatalogue.mcgill.ca/en/undergraduate/arts-science/programs/cognitive-science/cognitive-science-basc/'
}

async function fixMcGillUrls() {
  console.log('\n🔗 Fixing McGill Program URLs\n')

  try {
    // Find McGill University
    const mcgill = await prisma.university.findFirst({
      where: { name: { equals: 'McGill University', mode: 'insensitive' } }
    })

    if (!mcgill) {
      console.error('❌ McGill University not found')
      process.exit(1)
    }

    console.log(`✅ Found McGill University (ID: ${mcgill.id})\n`)

    // Get all McGill programs
    const programs = await prisma.academicProgram.findMany({
      where: { universityId: mcgill.id },
      select: { id: true, name: true, programUrl: true }
    })

    console.log(`📚 Found ${programs.length} programs to update\n`)

    let updated = 0
    let skipped = 0
    let notMapped = 0

    for (const program of programs) {
      const newUrl = urlMappings[program.name]

      if (!newUrl) {
        console.log(`   ⚠️  ${program.name}: No URL mapping found`)
        notMapped++
        continue
      }

      // Check if URL already updated
      if (program.programUrl === newUrl) {
        console.log(`   ⏭️  ${program.name}: Already updated`)
        skipped++
        continue
      }

      // Update the URL
      await prisma.academicProgram.update({
        where: { id: program.id },
        data: { programUrl: newUrl }
      })

      console.log(`   ✅ ${program.name}`)
      updated++
    }

    console.log('\n' + '─'.repeat(50))
    console.log('\n📊 Summary:')
    console.log(`   ✅ Updated: ${updated} programs`)
    console.log(`   ⏭️  Skipped: ${skipped} programs (already correct)`)
    console.log(`   ⚠️  Not mapped: ${notMapped} programs`)

    console.log('\n📡 Run Algolia sync to update search:')
    console.log('   npx tsx scripts/sync-to-algolia-standalone.ts\n')

    console.log('🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

fixMcGillUrls()
