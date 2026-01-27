/**
 * Seed Imperial College London Programs - FIX SCRIPT
 *
 * This script seeds ONLY the 7 programs that failed in the main seed script
 * due to incorrect field mappings:
 * - Medicine → Medicine & Health
 * - Mathematics → Natural Sciences
 *
 * Run with: npx tsx scripts/programs/seed-imperial-fix.ts
 */

import { PrismaClient, CourseLevel } from '@prisma/client'

const prisma = new PrismaClient()

interface RequirementDef {
  courses: string[]
  level: CourseLevel
  grade: number
  critical?: boolean
}

interface ProgramDef {
  name: string
  description: string
  field: string
  degree: string
  duration: string
  minIBPoints: number
  programUrl: string
  requirements: RequirementDef[]
}

const programs: ProgramDef[] = [
  // ============================================
  // MEDICINE & HEALTH PROGRAMS (was "Medicine")
  // ============================================
  {
    name: 'Medicine',
    description:
      'You will join one of the largest medicine departments in Europe, with medical campuses across north and west London and partnerships with a wide range of NHS Trusts, hospitals and clinics. Our newly redeveloped curriculum looks at technological developments in education and healthcare and expectations of medical practice within the NHS of the future. Successful students will graduate with both an MBBS and BSc qualification with this integrated course.',
    field: 'Medicine & Health',
    degree: 'MBBS/BSc',
    duration: '6 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/medicine/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Medical Biosciences with Management',
    description:
      "Explore the science that underpins human health and develop your management skills on this interdisciplinary course. You'll advance your understanding of the practice of biomedical science, and its application in research, policy and industry. This course will develop your ability to think like a scientist through a research-intensive, laboratory-focused curriculum.",
    field: 'Medicine & Health',
    degree: 'BSc',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/medical-biosciences-management/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Medical Biosciences',
    description:
      "You'll explore the principles of biomedical science, and how they are applied in research, policy and industry. This course is designed to build your potential towards becoming a science leader. You'll develop your ability to think like a scientist through a research-intensive, laboratory-focused curriculum. You'll also build key skills in science communication and ethics.",
    field: 'Medicine & Health',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/medical-biosciences/',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },

  // ============================================
  // NATURAL SCIENCES PROGRAMS (was "Mathematics")
  // ============================================
  {
    name: 'Mathematics with Statistics for Finance',
    description:
      "This course aims to present you with a wide range of mathematical ideas in a way that develops your critical and intellectual abilities. You'll develop a broad understanding of mathematical theory and application and deepen your knowledge in areas that appeal to you. As part of this specialisation, you will choose modules from a variety of relevant topics such as applied probability and mathematical finance.",
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 39,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-statistics-finance/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Mathematics with Statistics',
    description:
      "This course aims to present you with a wide range of mathematical ideas in a way that develops your critical and intellectual abilities. You'll develop a broad understanding of mathematical theory and application and deepen your knowledge in areas that appeal to you. As part of the Statistics specialisation, you will examine a variety of relevant topics, such as applied probability, stochastic simulation, and games and risk-based decisions.",
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 39,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-statistics/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Mathematics with Mathematical Computation',
    description:
      "This course aims to present you with a wide range of mathematical ideas in a way that develops your critical and intellectual abilities. You'll develop a broad understanding of mathematical theory and application, with opportunities to deepen your knowledge in areas that appeal to you. As part of the Mathematical Computation specialisation, you will focus on topics such as high-performance computing and scientific computation.",
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 39,
    programUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-computation/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Mathematics with Applied Mathematics/Mathematical Physics',
    description:
      "This course aims to present you with a wide range of mathematical ideas in a way that develops your critical and intellectual abilities. You'll develop a broad understanding of mathematical theory and application and have opportunities to deepen your knowledge in areas that appeal to you. As part of the Applied Mathematics/Mathematical Physics specialisation, you will examine a variety of relevant concepts, including dynamics of games, mathematical biology and scientific computation.",
    field: 'Natural Sciences',
    degree: 'BSc',
    duration: '3 years',
    minIBPoints: 39,
    programUrl:
      'https://www.imperial.ac.uk/study/courses/undergraduate/mathematics-applied-physics/',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }]
  }
]

async function seedImperialFix() {
  console.log('\n🔧 Seeding Imperial College London Programs - FIX SCRIPT\n')

  try {
    // 1. Find Imperial College London
    const imperial = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'Imperial College London', mode: 'insensitive' } },
          { name: { contains: 'Imperial College', mode: 'insensitive' } }
        ]
      }
    })

    if (!imperial) {
      console.error('❌ Imperial College London not found in database.')
      console.error('   Please add the university first.')
      process.exit(1)
    }

    console.log(`✅ Found Imperial College London (ID: ${imperial.id})\n`)

    // 2. Load reference data
    const [fields, ibCourses] = await Promise.all([
      prisma.fieldOfStudy.findMany(),
      prisma.iBCourse.findMany()
    ])

    const fieldMap = new Map(fields.map((f) => [f.name, f.id]))
    const courseMap = new Map(ibCourses.map((c) => [c.code, c.id]))

    console.log(`📚 Loaded ${fields.length} fields of study and ${ibCourses.length} IB courses\n`)

    // 3. Seed programs
    let created = 0
    let skipped = 0
    let failed = 0

    for (const programDef of programs) {
      const fieldId = fieldMap.get(programDef.field)
      if (!fieldId) {
        console.error(`   ❌ Field "${programDef.field}" not found, skipping ${programDef.name}`)
        failed++
        continue
      }

      // Check if program already exists
      const existing = await prisma.academicProgram.findFirst({
        where: {
          name: programDef.name,
          universityId: imperial.id
        }
      })

      if (existing) {
        console.log(`   ⏭️  ${programDef.name} already exists, skipping`)
        skipped++
        continue
      }

      try {
        // Create program with requirements in a transaction
        await prisma.$transaction(async (tx) => {
          // Create the program
          const program = await tx.academicProgram.create({
            data: {
              name: programDef.name,
              description: programDef.description,
              universityId: imperial.id,
              fieldOfStudyId: fieldId,
              degreeType: programDef.degree,
              duration: programDef.duration,
              minIBPoints: programDef.minIBPoints,
              programUrl: programDef.programUrl,
              requirementsVerified: true,
              requirementsUpdatedAt: new Date()
            }
          })

          // Create course requirements
          for (const req of programDef.requirements) {
            // For OR groups (multiple courses), create a shared orGroupId
            const orGroupId = req.courses.length > 1 ? crypto.randomUUID() : null

            for (const courseCode of req.courses) {
              const courseId = courseMap.get(courseCode)
              if (!courseId) {
                console.warn(`      ⚠️  Course "${courseCode}" not found, skipping requirement`)
                continue
              }

              await tx.programCourseRequirement.create({
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
        })

        console.log(
          `   ✅ ${programDef.name}: ${programDef.minIBPoints} pts, ${programDef.requirements.length} requirements`
        )
        created++
      } catch (error) {
        console.error(`   ❌ Failed to create ${programDef.name}:`, error)
        failed++
      }
    }

    // Summary
    console.log('\n' + '─'.repeat(50))
    console.log('\n📊 Summary:')
    console.log(`   ✅ Created: ${created} programs`)
    console.log(`   ⏭️  Skipped: ${skipped} programs (already exist)`)
    console.log(`   ❌ Failed: ${failed} programs`)

    if (created > 0) {
      console.log('\n📡 Programs will automatically sync to Algolia via Prisma middleware.')
      console.log('   Or run: npx tsx scripts/sync-to-algolia-standalone.ts\n')
    }

    console.log('🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error seeding Imperial programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedImperialFix()
