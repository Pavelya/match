/**
 * Seed Tel Aviv University Programs to Database
 *
 * Adds undergraduate programs for Tel Aviv University with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source: https://international.tau.ac.il
 * All descriptions extracted directly from TAU website.
 *
 * Prerequisites: Tel Aviv University must exist in the database.
 *
 * Run with: npx tsx scripts/programs/seed-tau-programs.ts
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
  // LIBERAL ARTS PROGRAMS
  // ============================================
  {
    name: 'International BA in Liberal Arts',
    description:
      "The International BA in Liberal Arts at Tel Aviv University puts you in charge of your education. By mixing and matching courses, you'll shape a degree that aligns with your passions, interests, and career goals. You'll select a total of four academic tracks for your undergraduate degree—a major, a minor, and two additional fields of study—from eight available options. Whether you're drawn to psychology and philosophy, or want to combine Jewish studies with entrepreneurship, this undergraduate program gives you the freedom to customize your learning experience in Israel.",
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 24,
    programUrl: 'https://international.tau.ac.il/Liberal_Arts/?id=term-1',
    requirements: []
  },
  {
    name: 'Dual Degree BA Program: TAU & Columbia University',
    description:
      "This four-year B.A. program provides you with an exciting, mind-expanding opportunity to gain two bachelor's degrees, one from Tel Aviv University and the other from Columbia University. Enjoy the best of two amazing cities - first discover Tel Aviv's non-stop culture and innovative spirit, before continuing your education in the metropolis of New York! The first two years at TAU consist of 80 credits, of which you can transfer up to 60 eligible points toward your degree requirements to Columbia. After completing your second year at TAU, you will matriculate at the Columbia University School of General Studies (GS) where you will further your studies, choosing from Columbia's liberal arts majors.",
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (Dual Degree)',
    duration: '4 years',
    minIBPoints: 32,
    programUrl: 'https://international.tau.ac.il/columbia_dual_degree',
    requirements: []
  },

  // ============================================
  // BUSINESS & MANAGEMENT PROGRAMS
  // ============================================
  {
    name: 'BA in Management and Liberal Arts',
    description:
      "The BA in Management & Liberal Arts will provide you with a relevant, comprehensive education in management and entrepreneurship studies, combined with a rich foundation in the humanities and social sciences. Offered as a joint program by Tel Aviv University's management and humanities faculties, this BA program will prepare you for success in the global job market that values employees with multidisciplinary academic training.",
    field: 'Business & Economics',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 28,
    programUrl: 'https://international.tau.ac.il/mgmt_libarts',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5, critical: true }]
  },

  // ============================================
  // MUSIC PROGRAMS
  // ============================================
  {
    name: 'Buchmann-Mehta School of Music International Program (BMus)',
    description:
      "The Buchmann-Mehta School of Music was founded in 2005 as a unique partnership between Tel-Aviv University (TAU) and the Israel Philharmonic Orchestra (IPO). Its establishment was made possible through the generosity of philanthropist Josef Buchmann, the School's patron. Maestro Zubin Mehta, the esteemed former IPO Music Director, serves as BMSM's Honorary President. All applicants must perform an audition. Entrance/placement theory exam is required.",
    field: 'Arts & Humanities',
    degree: 'Bachelor of Music',
    duration: '4 years',
    minIBPoints: 24,
    programUrl: 'https://international.tau.ac.il/bmsm_program_ba',
    requirements: []
  }
]

async function seedTAUPrograms() {
  console.log('\n🎓 Seeding Tel Aviv University Programs\n')

  try {
    // 1. Find Tel Aviv University
    const tau = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'Tel Aviv University', mode: 'insensitive' } },
          { name: { contains: 'Tel Aviv', mode: 'insensitive' } }
        ]
      }
    })

    if (!tau) {
      console.error('❌ Tel Aviv University not found in database.')
      console.error('   Please create the university first.')
      process.exit(1)
    }

    console.log(`✅ Found Tel Aviv University (ID: ${tau.id})\n`)

    // 2. Get reference data
    const fields = await prisma.fieldOfStudy.findMany()
    const courses = await prisma.iBCourse.findMany()

    const fieldMap = new Map(fields.map((f) => [f.name, f.id]))
    const courseMap = new Map(courses.map((c) => [c.code, c.id]))

    console.log(`📚 Loaded ${fields.length} fields of study and ${courses.length} IB courses\n`)

    // 3. Create programs
    let successCount = 0
    let skipCount = 0
    let failCount = 0

    for (const programDef of programs) {
      const fieldId = fieldMap.get(programDef.field)
      if (!fieldId) {
        console.error(`   ❌ Field "${programDef.field}" not found, skipping ${programDef.name}`)
        failCount++
        continue
      }

      // Check if program already exists
      const existing = await prisma.academicProgram.findFirst({
        where: {
          name: programDef.name,
          universityId: tau.id
        }
      })

      if (existing) {
        console.log(`   ⏭️  ${programDef.name} already exists, skipping`)
        skipCount++
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
              universityId: tau.id,
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
        successCount++
      } catch (error) {
        console.error(`   ❌ Failed to create ${programDef.name}:`, error)
        failCount++
      }
    }

    // Summary
    console.log('\n' + '─'.repeat(50))
    console.log('\n📊 Summary:')
    console.log(`   ✅ Created: ${successCount} programs`)
    console.log(`   ⏭️  Skipped: ${skipCount} programs (already exist)`)
    console.log(`   ❌ Failed: ${failCount} programs`)

    if (successCount > 0) {
      console.log('\n📡 Programs will automatically sync to Algolia via Prisma middleware.')
      console.log('   Or run: npx tsx scripts/sync-to-algolia-standalone.ts\n')
    }

    console.log('🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error seeding TAU programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedTAUPrograms()
