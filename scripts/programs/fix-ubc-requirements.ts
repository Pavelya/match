/**
 * Fix UBC Program IB Requirements
 *
 * Updates UBC programs with complete IB requirements as specified on you.ubc.ca
 *
 * Key patterns from UBC:
 * - Engineering: Math AA SL/HL OR Math AI HL + Chemistry + Physics
 * - Science: Math AA SL/HL OR Math AI HL + One of Bio/Chem/Phys
 * - Commerce: Math AA SL/HL OR Math AI HL only
 * - Arts: No specific IB requirements
 * - Kinesiology: One of Math AA/AI HL OR Bio OR Chem OR Phys
 *
 * Run with: npx tsx scripts/fix-ubc-requirements.ts
 */

import 'dotenv/config'
import { PrismaClient, CourseLevel } from '@prisma/client'
import { invalidateProgramsCache } from '../lib/matching/program-cache'
import { syncUniversityProgramsToAlgolia } from '../lib/algolia/sync'

const prisma = new PrismaClient()

// Requirement type definition
interface RequirementDef {
  courses: string[] // Course codes - if multiple, they form an OR group
  level: CourseLevel
  grade: number
  critical?: boolean
}

// Complete requirements map based on UBC official pages
// Key = program name, Value = array of requirements
const programRequirements: Record<string, RequirementDef[]> = {
  // ============================================
  // ENGINEERING: Math AA/AI HL + Chemistry + Physics
  // ============================================
  'Computer Engineering': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }, // AA SL/HL or AI HL
    { courses: ['CHEM'], level: 'SL', grade: 4 },
    { courses: ['PHYS'], level: 'SL', grade: 4 }
  ],
  'Electrical Engineering': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'SL', grade: 4 },
    { courses: ['PHYS'], level: 'SL', grade: 4 }
  ],
  'Mechanical Engineering': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'SL', grade: 4 },
    { courses: ['PHYS'], level: 'SL', grade: 4 }
  ],
  'Civil Engineering': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'SL', grade: 4 },
    { courses: ['PHYS'], level: 'SL', grade: 4 }
  ],
  'Chemical Engineering': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'SL', grade: 4 },
    { courses: ['PHYS'], level: 'SL', grade: 4 }
  ],
  'Environmental Engineering': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'SL', grade: 4 },
    { courses: ['PHYS'], level: 'SL', grade: 4 }
  ],
  'Biomedical Engineering': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'SL', grade: 4 },
    { courses: ['PHYS'], level: 'SL', grade: 4 }
  ],
  'Engineering Physics': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'SL', grade: 4 },
    { courses: ['PHYS'], level: 'SL', grade: 4 }
  ],
  'Mining Engineering': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'SL', grade: 4 },
    { courses: ['PHYS'], level: 'SL', grade: 4 }
  ],
  'Materials Engineering': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'SL', grade: 4 },
    { courses: ['PHYS'], level: 'SL', grade: 4 }
  ],
  'Geological Engineering': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['CHEM'], level: 'SL', grade: 4 },
    { courses: ['PHYS'], level: 'SL', grade: 4 }
  ],

  // ============================================
  // SCIENCE: Math AA/AI HL + One of Bio/Chem/Phys
  // ============================================
  'Computer Science': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 } // One of Bio/Chem/Phys
  ],
  Biology: [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  Chemistry: [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  Physics: [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  Mathematics: [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  Statistics: [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  'Earth and Ocean Sciences': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  'Environmental Sciences': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  'Microbiology and Immunology': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  Biochemistry: [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  Astronomy: [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  'Atmospheric Science': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  'Integrated Sciences': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  Pharmacology: [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  'Cognitive Systems': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  'Data Science': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],

  // ============================================
  // COMMERCE: Math AA/AI HL only
  // ============================================
  Commerce: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }],

  // ============================================
  // ARTS: No specific IB requirements
  // ============================================
  Economics: [], // Arts degree - no specific courses
  Psychology: [],
  'Political Science': [],
  Philosophy: [],
  History: [],
  'English Language and Literatures': [],
  Sociology: [],
  Anthropology: [],
  Geography: [],
  'International Relations': [],
  Linguistics: [],
  'Media Studies': [],

  // ============================================
  // KINESIOLOGY: One of Math/Bio/Chem/Phys
  // ============================================
  Kinesiology: [
    { courses: ['MATH-AA', 'MATH-AI', 'BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 } // One of any
  ],

  // ============================================
  // LAND & FOOD SYSTEMS: Same as Science
  // ============================================
  'Food Science': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  'Nutritional Sciences': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  'Global Resource Systems': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],

  // ============================================
  // FORESTRY: Same as Science
  // ============================================
  'Forest Sciences': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  'Natural Resources Conservation': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],
  'Wood Products Processing': [
    { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true },
    { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
  ],

  // ============================================
  // ARCHITECTURE & MUSIC: No specific IB requirements
  // ============================================
  'Design in Architecture': [], // Supplemental application required
  'Landscape Architecture': [],
  Music: [] // Audition required
}

async function fixUBCRequirements() {
  console.log('\n🔧 Fixing UBC Program IB Requirements\n')

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

    // Get all IB courses
    const courses = await prisma.iBCourse.findMany()
    const courseMap = new Map(courses.map((c) => [c.code, c.id]))
    console.log(`📚 Loaded ${courses.length} IB courses\n`)

    // Get all UBC programs
    const programs = await prisma.academicProgram.findMany({
      where: { universityId: ubc.id },
      include: { courseRequirements: true }
    })

    console.log(`📋 Found ${programs.length} UBC programs\n`)

    let updated = 0
    const skipped = 0
    let notMapped = 0

    for (const program of programs) {
      const requirements = programRequirements[program.name]

      if (requirements === undefined) {
        console.log(`   ⚠️  No mapping for: ${program.name}`)
        notMapped++
        continue
      }

      // Delete existing requirements
      if (program.courseRequirements.length > 0) {
        await prisma.programCourseRequirement.deleteMany({
          where: { programId: program.id }
        })
      }

      // Create new requirements
      if (requirements.length > 0) {
        for (const req of requirements) {
          // If multiple courses, create an OR group
          const orGroupId = req.courses.length > 1 ? crypto.randomUUID() : null

          for (const courseCode of req.courses) {
            const courseId = courseMap.get(courseCode)
            if (!courseId) {
              console.warn(`      ⚠️  Course "${courseCode}" not found`)
              continue
            }

            await prisma.programCourseRequirement.create({
              data: {
                programId: program.id,
                ibCourseId: courseId,
                requiredLevel: req.level,
                minGrade: req.grade,
                isCritical: req.critical || false,
                orGroupId
              }
            })
          }
        }
        console.log(`   ✅ ${program.name}: ${requirements.length} requirement group(s)`)
      } else {
        console.log(`   ✅ ${program.name}: No specific IB requirements (Arts/Audition)`)
      }

      updated++
    }

    console.log('\n' + '─'.repeat(50))
    console.log('\n📊 Summary:')
    console.log(`   ✅ Updated: ${updated} programs`)
    console.log(`   ⏭️  Skipped: ${skipped} programs`)
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

fixUBCRequirements()
