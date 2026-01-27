/**
 * Seed University of Lisbon Programs to Database
 *
 * Adds undergraduate programs for University of Lisbon (ISEG) with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source: User-provided program data from ISEG website
 * All descriptions extracted directly from provided text.
 *
 * Prerequisites: University of Lisbon must exist in the database.
 *
 * Run with: npx tsx scripts/programs/seed-ulisboa-programs.ts
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

// Standard English requirement for all ULisboa programs (B2 level requirement)
// English A Language & Literature OR Literature SL 4
const ENGLISH_REQUIREMENT: RequirementDef[] = [
  { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
]

const programs: ProgramDef[] = [
  // ============================================
  // ISEG PROGRAMS - BUSINESS & ECONOMICS
  // ============================================
  {
    name: "Bachelor's in Economics",
    description:
      "ISEG´s Bachelor's in Economics combines three essential elements for the education of an economist, in a unique way:\n\nA solid background in economic theory;\n\nA high degree of interdisciplinary learning in fields that are complementary to Economics (Management, Mathematics, Law, Sociology, and History);\n\nMastering the analytical tools of economic reality.\nThe combination of these three elements, together with the fact that students are able to choose elective course units to strengthen their areas of personal interest, means that the ISEG Bachelor's in Economics has a high standard of quality, which is widely recognized by the market, where our graduates easily find employment in both the private and public sectors.",
    field: 'Business & Economics',
    degree: "Bachelor's Degree",
    duration: '3 years',
    minIBPoints: 34,
    programUrl: 'https://www.iseg.ulisboa.pt/en/study/undergraduate/economics/#',
    requirements: [
      // Higher Level Mathematics required
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
      // One additional HL subject from Economics, Physics, Chemistry, Biology, or Geography
      { courses: ['ECON', 'PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 4 },
      // English requirement (B2 level)
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: "Bachelor's in Management",
    description:
      "ISEG's Bachelor's degree in Management, one of the first in the country, has an excellent faculty – with professors who hold PhDs from various Portuguese and foreign universities and also visiting professors – who combine scientific and technical skills with market knowledge. The syllabus of the degree in Management ensures the provision of a solid education for future managers, with a comprehensive structure based on the core subjects of Management (namely Finance, Marketing, Accounting, Human Resource Management, Production Management, and Information Systems), as well as areas which are equally key for the teaching of Management, such as Economics, Mathematics, and Social Sciences.",
    field: 'Business & Economics',
    degree: "Bachelor's Degree",
    duration: '3 years',
    minIBPoints: 32,
    programUrl: 'https://www.iseg.ulisboa.pt/en/study/undergraduate/management/#',
    requirements: [
      // Higher Level Mathematics required
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
      // One additional HL subject from Economics, Physics, Chemistry, Biology, or Geography
      { courses: ['ECON', 'PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 4 },
      // English requirement (B2 level)
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: "Bachelor's in Finance",
    description:
      "ISEG has redesigned the Bachelor in Finance! It is an innovative and up-to-date study programme, which blends current trends in finance and advancements in technology with financial theory. The Bachelor's in Finance equips students with essential quantitative skills to understand the functioning of financial markets, the operations of businesses, and how to navigate the uncertainties of the financial world.",
    field: 'Business & Economics',
    degree: "Bachelor's Degree",
    duration: '3 years',
    minIBPoints: 30,
    programUrl: 'https://www.iseg.ulisboa.pt/en/study/undergraduate/finance/#',
    requirements: [
      // Higher Level Mathematics required
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 4, critical: true },
      // One additional HL subject from Economics, Physics, Chemistry, Biology, or Geography
      { courses: ['ECON', 'PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 4 },
      // English requirement (B2 level)
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: "Bachelor's in Applied Mathematics for Economics and Management",
    description:
      'The main objective of the degree in Applied Mathematics for Economics and Management is to combine a basic education in Economics and Management with a solid foundation in Mathematics. This degree prepares professionals who can efficiently equate and solve problems in the areas of economics and management, using mathematical tools and the most modern computational resources.',
    field: 'Natural Sciences',
    degree: "Bachelor's Degree",
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.iseg.ulisboa.pt/en/study/undergraduate/applied-mathematics-for-economics-and-management/#',
    requirements: [
      // Higher Level Mathematics required (critical for this program)
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      // One additional HL subject from Economics, Physics, Chemistry, Biology, or Geography
      { courses: ['ECON', 'PHYS', 'CHEM', 'BIO'], level: 'HL', grade: 4 },
      // English requirement (B2 level)
      ...ENGLISH_REQUIREMENT
    ]
  }
]

async function seedULisboaPrograms() {
  console.log('\n🎓 Seeding University of Lisbon (ISEG) Programs\n')

  try {
    // 1. Find University of Lisbon
    const ulisboa = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'University of Lisbon', mode: 'insensitive' } },
          { name: { equals: 'Universidade de Lisboa', mode: 'insensitive' } },
          { name: { contains: 'Lisbon', mode: 'insensitive' } },
          { name: { contains: 'Lisboa', mode: 'insensitive' } },
          { name: { contains: 'ULisboa', mode: 'insensitive' } }
        ]
      }
    })

    if (!ulisboa) {
      console.error('❌ University of Lisbon not found in database.')
      console.error('   Please create the university first.')
      process.exit(1)
    }

    console.log(`✅ Found University of Lisbon (ID: ${ulisboa.id})\n`)

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
          universityId: ulisboa.id
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
              universityId: ulisboa.id,
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
    console.error('\n❌ Error seeding ULisboa programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedULisboaPrograms()
