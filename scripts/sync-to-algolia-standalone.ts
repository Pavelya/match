/**
 * Standalone Algolia Sync Script
 *
 * Syncs all programs to Algolia without requiring full env validation.
 * Run with: npx tsx scripts/sync-to-algolia-standalone.ts
 */

import { PrismaClient } from '@prisma/client'
import { algoliasearch } from 'algoliasearch'

const prisma = new PrismaClient()

interface AlgoliaProgramRecord {
  objectID: string
  programId: string
  programName: string
  description: string
  universityId: string
  universityName: string
  universityAbbreviation?: string
  fieldOfStudyId: string
  fieldOfStudy: {
    id: string
    name: string
    iconName?: string
    description?: string
  }
  countryId: string
  country: {
    id: string
    name: string
    code: string
  }
  degreeType: string
  duration: string
  minimumIBPoints?: number
  requiredCourses?: Array<{
    courseId: string
    courseName: string
    level: string
    minimumGrade: number
    isCritical: boolean
  }>
  isActive: boolean
  createdAt: number
  updatedAt: number
}

async function syncToAlgolia() {
  console.log('\n🔄 Syncing Programs to Algolia\n')

  // Get Algolia credentials from environment
  const appId = process.env.ALGOLIA_APP_ID
  const apiKey = process.env.ALGOLIA_ADMIN_API_KEY

  if (!appId || !apiKey) {
    console.error('❌ Missing Algolia credentials in .env')
    console.error('   Required: ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY')
    process.exit(1)
  }

  const client = algoliasearch(appId, apiKey)
  const indexName = 'programs_production'

  try {
    // Fetch all programs with related data
    console.log('1️⃣  Fetching programs from database...')
    const programs = await prisma.academicProgram.findMany({
      include: {
        university: {
          include: {
            country: true
          }
        },
        fieldOfStudy: true,
        courseRequirements: {
          include: {
            ibCourse: true
          }
        }
      }
    })

    console.log(`   Found ${programs.length} programs\n`)

    // Transform to Algolia records
    console.log('2️⃣  Transforming to Algolia records...')
    const records: AlgoliaProgramRecord[] = programs.map((program) => ({
      objectID: program.id,
      programId: program.id,
      programName: program.name,
      description: program.description,

      universityId: program.university.id,
      universityName: program.university.name,
      universityAbbreviation: program.university.abbreviatedName ?? undefined,

      fieldOfStudyId: program.fieldOfStudy.id,
      fieldOfStudy: {
        id: program.fieldOfStudy.id,
        name: program.fieldOfStudy.name,
        iconName: program.fieldOfStudy.iconName ?? undefined,
        description: program.fieldOfStudy.description ?? undefined
      },

      countryId: program.university.country.id,
      country: {
        id: program.university.country.id,
        name: program.university.country.name,
        code: program.university.country.code
      },

      degreeType: program.degreeType,
      duration: program.duration,
      minimumIBPoints: program.minIBPoints ?? undefined,
      requiredCourses: program.courseRequirements.map((req) => ({
        courseId: req.ibCourse.id,
        courseName: req.ibCourse.name,
        level: req.requiredLevel,
        minimumGrade: req.minGrade,
        isCritical: req.isCritical
      })),

      isActive: true,
      createdAt: program.createdAt.getTime(),
      updatedAt: program.updatedAt.getTime()
    }))

    console.log(`   Transformed ${records.length} records\n`)

    // Sync to Algolia
    console.log('3️⃣  Syncing to Algolia...')
    await client.saveObjects({
      indexName,
      objects: records
    })

    console.log(`   ✅ Synced ${records.length} programs to Algolia\n`)

    // Verify
    console.log('4️⃣  Verifying...')
    const { items: indices } = await client.listIndices()
    const programIndex = indices.find((i) => i.name === indexName)

    if (programIndex) {
      console.log(`   ✅ Index "${indexName}" created`)
      console.log(`   📊 Entries: ${programIndex.entries || 'unknown'}\n`)
    }

    console.log('🎉 Sync complete!\n')
    console.log('Check Algolia dashboard to verify:')
    console.log(`   https://www.algolia.com/apps/${appId}/explorer/browse/${indexName}\n`)
  } catch (error) {
    console.error('\n❌ Sync failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

syncToAlgolia()
