/**
 * Seed University of St.Gallen (HSG) Programs to Database
 *
 * Adds undergraduate programs for University of St.Gallen with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source: HSG Admission Regulations (May 2020)
 * All HSG programs share the same baseline: 32/42 points, 3 HL with math/science from Group 4.
 * HSG has strict subject restrictions — only specific subjects are accepted per group.
 * All descriptions extracted from the HSG website.
 *
 * Note: International applicants must also pass the HSG selection procedure (not modeled here).
 *
 * Prerequisites: Switzerland (CH) must exist in the database.
 *
 * Run with: npx tsx scripts/programs/seed-stgallen-programs.ts
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

// HSG baseline IB requirement: HL in Mathematics or a Natural Science (Group 4)
const HSG_BASELINE_REQUIREMENT: RequirementDef = {
  courses: ['MATH-AA', 'MATH-AI', 'BIO', 'CHEM', 'PHYS'],
  level: 'HL',
  grade: 5,
  critical: true
}

const programs: ProgramDef[] = [
  // ============================================
  // BUSINESS & ECONOMICS
  // ============================================
  {
    name: 'Business Administration',
    description:
      'This program is designed for future leaders who value teamwork, sustainability, and global perspectives. Offered by HEC St.Gallen, it provides an internationally recognized, practice-oriented foundational education covering all essential aspects of business administration — including marketing, strategic management, corporate finance, accounting, and controlling — while considering the broader economic and legal context. The Assessment Year can be completed in English or German.',
    field: 'Business & Economics',
    degree: 'Bachelor of Arts (HSG)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl:
      'https://www.unisg.ch/en/studying/programmes/bachelor/major-in-business-administration-bwl/',
    requirements: [
      HSG_BASELINE_REQUIREMENT,
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      { courses: ['ECON', 'BUS-MGMT'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Economics',
    description:
      'This major provides students with the tools to analyze economic crises, the influence of politics on growth, and the reform of pension systems. It emphasizes sound scientific principles and the development of data-driven, fact-based solutions using modern data analysis methods. The program covers micro- and macroeconomics, political economy, and economic policy. The Assessment Year can be completed in English or German.',
    field: 'Business & Economics',
    degree: 'Bachelor of Arts (HSG)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl: 'https://www.unisg.ch/en/studying/programmes/bachelor/major-in-economics/',
    requirements: [
      HSG_BASELINE_REQUIREMENT,
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['ECON', 'BUS-MGMT'], level: 'SL', grade: 4 }
    ]
  },

  // ============================================
  // SOCIAL SCIENCES (International Affairs)
  // ============================================
  {
    name: 'International Affairs',
    description:
      'The BIA aims to educate flexible generalists capable of addressing central societal challenges. Students gain broad expertise in international affairs, understanding the interactions between states and markets across disciplines including political science, economics, business administration, and legal studies. The Assessment Year can be completed in English or German.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts (HSG)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl:
      'https://www.unisg.ch/en/studying/programmes/bachelor/major-international-affairs-bia/',
    requirements: [
      HSG_BASELINE_REQUIREMENT,
      { courses: ['HIST', 'ECON', 'GEOG'], level: 'SL', grade: 4 }
    ]
  },

  // ============================================
  // LAW
  // ============================================
  {
    name: 'Law',
    description:
      'This program equips students with comprehensive knowledge and skills across all key areas of law, including civil law, criminal law, public law, and international law. It serves as a solid foundation for subsequent master-level specialization and professional legal practice. The Assessment Year is completed in German.',
    field: 'Law',
    degree: 'Bachelor of Law (HSG)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl: 'https://www.unisg.ch/en/studying/programmes/bachelor/major-law-blaw/',
    requirements: [HSG_BASELINE_REQUIREMENT]
  },
  {
    name: 'Law and Economics',
    description:
      'The BLE offers an interdisciplinary perspective, preparing students for professional environments at the interface of law and economics. It combines legal expertise with economic analysis to address complex organizational and societal issues, making graduates well-suited for roles in business, consulting, and public policy.',
    field: 'Law',
    degree: 'Bachelor of Arts (HSG)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl: 'https://www.unisg.ch/en/studying/programmes/bachelor/major-law-and-economics-ble/',
    requirements: [
      HSG_BASELINE_REQUIREMENT,
      { courses: ['ECON', 'BUS-MGMT'], level: 'SL', grade: 4 }
    ]
  },

  // ============================================
  // COMPUTER SCIENCE
  // ============================================
  {
    name: 'Computer Science',
    description:
      'This program provides a solid foundation in computer science with a strong focus on practical application. It uniquely combines technical expertise with interdisciplinary and economic perspectives, preparing graduates for careers that require both technical and business acumen. The program covers software engineering, data science, and IT management. The Assessment Year is completed in German.',
    field: 'Computer Science',
    degree: 'Bachelor of Science (HSG)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl: 'https://www.unisg.ch/en/studying/programmes/bachelor/bcs/',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['CS'], level: 'SL', grade: 4 }
    ]
  }
]

async function seedStGallenPrograms() {
  console.log('\n🎓 Seeding University of St.Gallen (HSG) Programs\n')

  try {
    // 1. Find or create University of St.Gallen
    let uni = await prisma.university.findFirst({
      where: {
        name: { contains: 'St.Gallen', mode: 'insensitive' }
      }
    })

    if (!uni) {
      // Also check for "St Gallen" without period
      uni = await prisma.university.findFirst({
        where: {
          name: { contains: 'St Gallen', mode: 'insensitive' }
        }
      })
    }

    if (!uni) {
      // Get Switzerland country
      const ch = await prisma.country.findFirst({
        where: { code: 'CH' }
      })

      if (!ch) {
        console.error('❌ Switzerland (CH) not found in database.')
        process.exit(1)
      }

      // Create University
      uni = await prisma.university.create({
        data: {
          name: 'University of St.Gallen',
          description:
            'The University of St.Gallen (HSG) is one of the leading business universities in Europe. Founded in 1898, it is consistently ranked among the top business schools worldwide, known for its integrative approach combining economics, law, social sciences, and international affairs.',
          countryId: ch.id,
          city: 'St. Gallen',
          classification: 'PUBLIC',
          websiteUrl: 'https://www.unisg.ch',
          studentPopulation: 9400
        }
      })
      console.log(`✅ Created University of St.Gallen (ID: ${uni.id})\n`)
    } else {
      console.log(`✅ Found University of St.Gallen (ID: ${uni.id})\n`)
    }

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
          universityId: uni.id
        }
      })

      if (existing) {
        console.log(`   ⏭️  ${programDef.name} already exists, skipping`)
        skipCount++
        continue
      }

      try {
        await prisma.$transaction(async (tx) => {
          // Create the program
          const program = await tx.academicProgram.create({
            data: {
              name: programDef.name,
              description: programDef.description,
              universityId: uni.id,
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
  } catch (error) {
    console.error('\n❌ Error seeding St.Gallen programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedStGallenPrograms()
