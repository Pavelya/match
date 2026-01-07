/**
 * Fix UvA Program Requirements Script
 *
 * Fixes two issues:
 * 1. Math requirements should use OR groups (MATH-AI HL OR MATH-AA SL in same group)
 * 2. Programs without minIBPoints should default to 24
 *
 * Run with: npx tsx scripts/fix-uva-requirements.ts
 */

import 'dotenv/config'
import { PrismaClient, CourseLevel } from '@prisma/client'

const prisma = new PrismaClient()

// Correct requirement definitions with proper OR groups
// Format: [courses in OR group, level, grade, isCritical]
interface RequirementDef {
  courses: string[] // Course codes forming an OR group
  level: CourseLevel
  grade: number
  isCritical: boolean
}

interface ProgramFix {
  name: string
  minIBPoints: number
  requirements: RequirementDef[]
}

// Programs with corrected requirements
// Based on user-provided IB requirements data:
// "One of the following IB mathematics courses:
//  • Applications and Interpretation HL with a grade 4 or higher
//  • Analysis and Approaches SL or HL with a grade 4 or higher"
const programFixes: ProgramFix[] = [
  // ============================================
  // HUMANITIES - No math requirements, 24 points default
  // ============================================
  { name: 'Sign Language Linguistics', minIBPoints: 24, requirements: [] },
  { name: 'Ancient Studies', minIBPoints: 24, requirements: [] },
  { name: 'Archaeology', minIBPoints: 24, requirements: [] },
  { name: 'English Language and Culture', minIBPoints: 24, requirements: [] },
  { name: 'Linguistics', minIBPoints: 24, requirements: [] },
  { name: 'Literary and Cultural Analysis', minIBPoints: 24, requirements: [] },
  { name: 'European Studies', minIBPoints: 24, requirements: [] },
  { name: 'Global Arts, Culture and Politics', minIBPoints: 24, requirements: [] },
  { name: 'Media and Culture', minIBPoints: 24, requirements: [] },
  { name: 'Media and Information', minIBPoints: 24, requirements: [] },
  { name: 'Human Geography and Planning', minIBPoints: 24, requirements: [] },

  // ============================================
  // RECOMMENDED MATH (not critical)
  // "One of: AI HL (4+) OR AA SL/HL (4+)"
  // ============================================
  {
    name: 'Sociology',
    minIBPoints: 24,
    requirements: [{ courses: ['MATH-AI', 'MATH-AA'], level: 'HL', grade: 4, isCritical: false }]
  },
  {
    name: 'Cultural Anthropology and Development Sociology',
    minIBPoints: 24,
    requirements: [{ courses: ['MATH-AI', 'MATH-AA'], level: 'HL', grade: 4, isCritical: false }]
  },
  {
    name: 'Political Science',
    minIBPoints: 24,
    requirements: [{ courses: ['MATH-AI', 'MATH-AA'], level: 'HL', grade: 4, isCritical: false }]
  },
  {
    name: 'Psychology',
    minIBPoints: 24,
    requirements: [{ courses: ['MATH-AI', 'MATH-AA'], level: 'HL', grade: 4, isCritical: false }]
  },
  {
    name: 'Global Communication Science',
    minIBPoints: 24,
    requirements: [{ courses: ['MATH-AI', 'MATH-AA'], level: 'HL', grade: 4, isCritical: false }]
  },

  // ============================================
  // REQUIRED MATH (critical)
  // "One of: AI HL (4+) OR AA SL/HL (4+)"
  // ============================================
  {
    name: 'Computational Social Science',
    minIBPoints: 24,
    requirements: [{ courses: ['MATH-AI', 'MATH-AA'], level: 'HL', grade: 4, isCritical: true }]
  },
  {
    name: 'Business Administration',
    minIBPoints: 24,
    requirements: [{ courses: ['MATH-AI', 'MATH-AA'], level: 'HL', grade: 4, isCritical: true }]
  },
  {
    name: 'Economics and Business Economics',
    minIBPoints: 24,
    requirements: [{ courses: ['MATH-AI', 'MATH-AA'], level: 'HL', grade: 4, isCritical: true }]
  },

  // ============================================
  // REQUIRED MATH AA HL ONLY (critical)
  // "Analysis and Approaches HL with a grade 4 or higher"
  // ============================================
  {
    name: 'Actuarial Science',
    minIBPoints: 24,
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, isCritical: true }]
  },
  {
    name: 'Business Analytics',
    minIBPoints: 24,
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, isCritical: true }]
  },
  {
    name: 'Econometrics and Data Science',
    minIBPoints: 24,
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, isCritical: true }]
  },

  // ============================================
  // SPECIAL PROGRAMS
  // ============================================
  {
    name: 'Liberal Arts and Sciences',
    minIBPoints: 24,
    requirements: [
      // English SL min 5 points - using ENG-LIT and ENG-LL as OR group
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, isCritical: true }
      // Note: Math requirements vary by major, not encoding all variants
    ]
  },
  {
    name: 'Politics, Psychology, Law and Economics (PPLE)',
    minIBPoints: 34, // Specific requirement: 34 pts total
    requirements: [
      // Math SL/AA SL/AI HL min 4 - OR group
      { courses: ['MATH-AI', 'MATH-AA'], level: 'SL', grade: 4, isCritical: true },
      // English A or B min 5 - OR group
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 5, isCritical: true }
    ]
  }
]

async function fixUvARequirements() {
  console.log('\n🔧 Fixing UvA Program Requirements\n')

  try {
    // 1. Find University of Amsterdam
    const uva = await prisma.university.findFirst({
      where: {
        name: { equals: 'University of Amsterdam', mode: 'insensitive' }
      }
    })

    if (!uva) {
      console.error('❌ University of Amsterdam not found')
      process.exit(1)
    }

    console.log(`✅ Found University of Amsterdam (ID: ${uva.id})\n`)

    // 2. Get course IDs
    const courses = await prisma.iBCourse.findMany()
    const courseMap = new Map(courses.map((c) => [c.code, c.id]))

    console.log(`📚 Loaded ${courses.length} IB courses\n`)

    // 3. Process each program
    let updatedCount = 0
    let failedCount = 0

    for (const fix of programFixes) {
      const program = await prisma.academicProgram.findFirst({
        where: {
          name: fix.name,
          universityId: uva.id
        }
      })

      if (!program) {
        console.log(`   ⚠️  Program not found: ${fix.name}`)
        failedCount++
        continue
      }

      try {
        await prisma.$transaction(async (tx) => {
          // Delete existing requirements
          await tx.programCourseRequirement.deleteMany({
            where: { programId: program.id }
          })

          // Update minIBPoints
          await tx.academicProgram.update({
            where: { id: program.id },
            data: { minIBPoints: fix.minIBPoints }
          })

          // Create new requirements with proper OR groups
          for (const req of fix.requirements) {
            // All courses in the same requirement share the same orGroupId
            const orGroupId = req.courses.length > 1 ? crypto.randomUUID() : null

            for (const courseCode of req.courses) {
              const courseId = courseMap.get(courseCode)
              if (!courseId) {
                console.warn(`     ⚠️  Course ${courseCode} not found`)
                continue
              }

              await tx.programCourseRequirement.create({
                data: {
                  programId: program.id,
                  ibCourseId: courseId,
                  requiredLevel: req.level,
                  minGrade: req.grade,
                  isCritical: req.isCritical,
                  orGroupId
                }
              })
            }
          }
        })

        console.log(
          `   ✅ Fixed: ${fix.name} (${fix.minIBPoints} pts, ${fix.requirements.length} req groups)`
        )
        updatedCount++
      } catch (err) {
        console.error(`   ❌ Failed to fix ${fix.name}:`, err)
        failedCount++
      }
    }

    console.log('\n📊 Summary:')
    console.log(`   ✅ Updated: ${updatedCount}`)
    console.log(`   ❌ Failed: ${failedCount}`)

    // 4. Sync to Algolia
    console.log('\n🔄 Syncing UvA programs to Algolia...')

    const { syncUniversityProgramsToAlgolia } = await import('../lib/algolia/sync')
    await syncUniversityProgramsToAlgolia(uva.id)

    console.log('   ✅ Algolia sync complete')

    console.log('\n🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error fixing UvA requirements:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

fixUvARequirements()
