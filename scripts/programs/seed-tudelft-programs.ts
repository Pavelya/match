/**
 * Seed TU Delft Programs to Database
 *
 * Adds 4 English-taught bachelor programs for Delft University of Technology (TU Delft)
 * with IB requirements based on official admission requirements.
 *
 * IB Requirements Source:
 * https://www.tudelft.nl/en/education/admission-and-application/bsc-international-diploma/admission-requirements/diploma-with-additional-requirements#c106231
 *
 * TU Delft only accepts the Mathematics course 'Analysis & Approaches HL'.
 *
 * Prerequisites: Run seed-tudelft.ts first to create the university.
 *
 * Run with: npx tsx scripts/programs/seed-tudelft-programs.ts
 */

import { PrismaClient, CourseLevel } from '@prisma/client'

const prisma = new PrismaClient()

// Program definitions with IB requirements
// All requirements use AND logic (all must be met)
interface RequirementDef {
  courses: string[] // Course codes - if multiple, they form an OR group
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
  // ENGLISH-TAUGHT BACHELOR PROGRAMS
  // ============================================
  {
    name: 'Aerospace Engineering',
    description:
      "How do you design an aircraft that can fly on hydrogen? How do you get a wind turbine to work on a floating platform at sea? Is there an easy solution for space debris? When you choose the bachelor's programme Aerospace Engineering, you will be prepared to shape the future of sustainable aerospace. You will gain the essential knowledge needed to understand aerospace engineering, giving you a strong starting point to learn how to design systems, connect different parts of engineering, and work together with students from around the world. With these vital skills you can create and optimize satellites, helicopters, aircraft, and wind turbines, all in a world where sustainability is at the forefront of attention.",
    field: 'Engineering',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 24,
    programUrl:
      'https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/ae/bsc-aerospace-engineering',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 4 }
    ]
  },
  {
    name: 'Computer Science and Engineering',
    description:
      'Self-driving cars, smartphone navigation, personalised offers based on your surfing behaviour and robots used in healthcare. During the Computer Science and Engineering degree programme you will learn how to develop software and process data for the intelligent systems of today and the future. Computer Science is an enabling technique that is used in many sectors, which means that the applications are endless. You will learn to analyse and model problems, reason about them, and write algorithms to come to a solution. At least once a year, you will work on a project in a team with fellow students, for example to build an application that helps to find study buddies.',
    field: 'Computer Science',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 24,
    programUrl:
      'https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/computer-science-and-engineering/bachelor-of-computer-science-and-engineering',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true }]
  },
  {
    name: 'Earth, Climate and Technology',
    description:
      "Are you looking for a degree that combines knowledge of the Earth with engineering? Do you want to develop solutions for challenges related to climate change, the energy transition, and the availability of scarce resources? Then Earth, Climate and Technology is the programme for you! In this English-taught bachelor's programme, you will apply your technical knowledge to the part of the Earth that closely interacts with our environment, from the atmosphere to a few kilometres deep into the Earth's crust. You'll learn how to study climate change using models and satellite data, and how to address its impacts on the planet. You will delve into technical solutions for the energy transition, such as geothermal energy and CO2 storage. Additionally, you'll explore sustainable ways to extract the natural resources needed for solar panels, wind turbines, and the batteries of electric cars.",
    field: 'Environmental Studies',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 24,
    programUrl:
      'https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/ect/bsc-earth-climate-and-technology',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 4 },
      { courses: ['CHEM'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Nanobiology',
    description:
      'Nanobiology is a joint degree programme offered by TU Delft and Erasmus University Rotterdam (Erasmus MC) that explores life at the molecular level. This unique programme combines physics, mathematics, chemistry, and biology to study living systems at the nanoscale. You will learn to apply cutting-edge techniques from physics and engineering to understand biological processes at the molecular level. The programme prepares you for careers in biotechnology, pharmaceutical research, medical technology, and academic research. With access to world-class facilities at both universities, you will gain hands-on experience with advanced research techniques used to study life at its most fundamental level.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 24,
    programUrl: 'https://www.tudelft.nl/en/education/programmes/bachelors/nb/bsc-nanobiology',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 4, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 4 },
      { courses: ['BIO'], level: 'HL', grade: 4 },
      { courses: ['CHEM'], level: 'SL', grade: 4 }
    ]
  }
]

async function seedTUDelftPrograms() {
  console.log('\n🎓 Seeding TU Delft Programs\n')

  try {
    // 1. Find TU Delft
    const tudelft = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'Delft University of Technology', mode: 'insensitive' } },
          { name: { equals: 'TU Delft', mode: 'insensitive' } }
        ]
      }
    })

    if (!tudelft) {
      console.error('❌ TU Delft not found in database.')
      console.error('   Run: npx tsx scripts/programs/seed-tudelft.ts first')
      process.exit(1)
    }

    console.log(`✅ Found Delft University of Technology (ID: ${tudelft.id})\n`)

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
          universityId: tudelft.id
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
              universityId: tudelft.id,
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
    console.error('\n❌ Error seeding TU Delft programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedTUDelftPrograms()
