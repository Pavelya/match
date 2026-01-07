/**
 * Fix McGill University Program Requirements
 *
 * Updates existing McGill programs with correct IB requirements based on
 * official McGill admissions page:
 * https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib
 *
 * Run with: npx tsx scripts/fix-mcgill-requirements.ts
 */

import 'dotenv/config'
import { PrismaClient, CourseLevel } from '@prisma/client'

const prisma = new PrismaClient()

interface ProgramFix {
  name: string
  minIBPoints: number
  requirements: Array<{
    courses: string[]
    level: CourseLevel
    grade: number
    critical?: boolean
  }>
}

// Corrected requirements based on official McGill page
const fixes: ProgramFix[] = [
  // ARCHITECTURE: 41 pts, Math + Physics (HL or SL), 7 in each, at least one HL
  {
    name: 'Architecture',
    minIBPoints: 41,
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 7 }
    ]
  },

  // MECHANICAL ENGINEERING: 38 pts, 6 in EACH math & science
  {
    name: 'Mechanical Engineering',
    minIBPoints: 38,
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 6 },
      { courses: ['CHEM'], level: 'SL', grade: 6 }
    ]
  },

  // BIOENGINEERING: Already correct at 40 pts, 6 in each - just verify grade in Bio
  {
    name: 'Bioengineering',
    minIBPoints: 40,
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 6 },
      { courses: ['CHEM'], level: 'HL', grade: 6 },
      { courses: ['BIO'], level: 'HL', grade: 6 } // Updated from 5 to 6
    ]
  },

  // NURSING: 30 pts (not 33), 5 in each math & science
  {
    name: 'Nursing',
    minIBPoints: 30,
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM'], level: 'HL', grade: 5 },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'SL', grade: 5 }
    ]
  },

  // COMPUTER SCIENCE (Science): 36 pts, 5-6 in each math & science
  {
    name: 'Computer Science',
    minIBPoints: 36,
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'SL', grade: 5 }
    ]
  },

  // BIOLOGY: 37 pts, grade 6 in each math & science
  {
    name: 'Biology',
    minIBPoints: 37,
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6 },
      { courses: ['BIO', 'CHEM'], level: 'HL', grade: 6 },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'SL', grade: 6 }
    ]
  },

  // CHEMISTRY: 37 pts, grade 6 in each math & science
  {
    name: 'Chemistry',
    minIBPoints: 37,
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6 },
      { courses: ['CHEM'], level: 'HL', grade: 6 },
      { courses: ['PHYS', 'BIO'], level: 'SL', grade: 6 }
    ]
  },

  // PHYSICS: 36 pts (Physical Sciences group), grade 5-6 in each
  {
    name: 'Physics',
    minIBPoints: 36,
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 6 },
      { courses: ['CHEM', 'BIO'], level: 'SL', grade: 5 }
    ]
  },

  // MATHEMATICS: 36 pts (Physical Sciences group)
  {
    name: 'Mathematics',
    minIBPoints: 36,
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true }]
  },

  // ARTS programs: 35 predicted / 34 final - use 34
  {
    name: 'Psychology',
    minIBPoints: 34,
    requirements: []
  },
  {
    name: 'Political Science',
    minIBPoints: 34,
    requirements: []
  },
  {
    name: 'History',
    minIBPoints: 34,
    requirements: []
  },
  {
    name: 'Economics',
    minIBPoints: 34, // Arts program, updated from 33
    requirements: [{ courses: ['MATH-AA'], level: 'SL', grade: 5 }]
  },

  // MUSIC: No prereqs, but IB requirements apply
  {
    name: 'Music',
    minIBPoints: 30, // Music doesn't specify, using Education baseline
    requirements: []
  },

  // MANAGEMENT (Commerce): 37 pts, 5 in HL Math or 6 in SL Math AA
  {
    name: 'Commerce',
    minIBPoints: 37,
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true }]
  }
]

async function fixMcGillRequirements() {
  console.log('\n🔧 Fixing McGill University Program Requirements\n')

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

    // Get IB course map
    const courses = await prisma.iBCourse.findMany()
    const courseMap = new Map(courses.map((c) => [c.code, c.id]))

    let updated = 0
    let notFound = 0

    for (const fix of fixes) {
      // Find the program
      const program = await prisma.academicProgram.findFirst({
        where: { name: fix.name, universityId: mcgill.id }
      })

      if (!program) {
        console.log(`   ⚠️  ${fix.name} not found, skipping`)
        notFound++
        continue
      }

      // Update program points
      await prisma.academicProgram.update({
        where: { id: program.id },
        data: { minIBPoints: fix.minIBPoints }
      })

      // Delete existing requirements
      await prisma.programCourseRequirement.deleteMany({
        where: { programId: program.id }
      })

      // Create new requirements
      for (const req of fix.requirements) {
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

      console.log(
        `   ✅ ${fix.name}: ${fix.minIBPoints} pts, ${fix.requirements.length} requirements`
      )
      updated++
    }

    console.log('\n' + '─'.repeat(50))
    console.log('\n📊 Summary:')
    console.log(`   ✅ Updated: ${updated} programs`)
    console.log(`   ⚠️  Not found: ${notFound} programs`)

    console.log('\n📡 Run Algolia sync to update search:')
    console.log('   npx tsx scripts/sync-to-algolia-standalone.ts\n')

    console.log('🎉 Done!\n')
  } catch (error) {
    console.error('\\n❌ Error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

fixMcGillRequirements()
