/**
 * Seed McGill University Programs to Database
 *
 * Adds 20 bachelor programs for McGill University with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * Prerequisites: Run seed-mcgill.ts first to create the university.
 *
 * Run with: npx tsx scripts/seed-mcgill-programs.ts
 */

import { PrismaClient, CourseLevel } from '@prisma/client'

const prisma = new PrismaClient()

// Program definitions with IB requirements
// Requirements format: array of { courses: string[], level: 'HL'|'SL', grade: number, critical?: boolean, isOrGroup?: boolean }
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
  // ENGINEERING PROGRAMS (Faculty of Engineering)
  {
    name: 'Computer Science',
    description:
      'Study algorithms, data structures, artificial intelligence, and software development. The program provides a broad introduction to the principles of computer science and allows for in-depth knowledge in sub-disciplines including machine learning, graphics, and systems.',
    field: 'Computer Science',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/science/undergraduate/programs/bachelor-science-bsc-major-computer-science',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Software Engineering',
    description:
      'Learn to design, develop, and maintain complex software systems. This program combines computer science fundamentals with engineering principles to prepare students for careers in software development and technology leadership.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/engineering/undergraduate/programs/bachelor-engineering-beng-software-engineering',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 },
      { courses: ['CHEM'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Computer Engineering',
    description:
      'Bridge the gap between hardware and software. Computer Engineering focuses on the design of computer systems and their components, including embedded systems, digital circuits, and computer architecture.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/engineering/undergraduate/programs/bachelor-engineering-beng-computer-engineering',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 },
      { courses: ['CHEM'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Electrical Engineering',
    description:
      'Explore the design and development of electrical systems, from microelectronics to power systems. Students learn about circuits, signal processing, telecommunications, and renewable energy technologies.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/engineering/undergraduate/programs/bachelor-engineering-beng-electrical-engineering',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 6 },
      { courses: ['CHEM'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Mechanical Engineering',
    description:
      'Design and analyze mechanical systems from nanotechnology to spacecraft. This program covers thermodynamics, fluid mechanics, materials science, and mechanical design to solve real-world engineering challenges.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/engineering/undergraduate/programs/bachelor-engineering-beng-mechanical-engineering',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 6 },
      { courses: ['CHEM'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Civil Engineering',
    description:
      'Plan, design, and construct the infrastructure that defines modern society. Civil engineers work on buildings, bridges, transportation systems, water resources, and environmental protection projects.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/engineering/undergraduate/programs/bachelor-engineering-beng-civil-engineering',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 },
      { courses: ['CHEM'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Chemical Engineering',
    description:
      'Transform raw materials into valuable products through chemical processes. Study reaction engineering, process design, and sustainable manufacturing in industries from pharmaceuticals to energy.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/engineering/undergraduate/programs/bachelor-engineering-beng-chemical-engineering',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 6 },
      { courses: ['PHYS'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Bioengineering',
    description:
      'Apply engineering principles to healthcare and biological systems. This highly competitive program covers biomechanics, biomedical devices, tissue engineering, and pharmaceutical engineering.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/engineering/undergraduate/programs/bachelor-engineering-beng-bioengineering',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 6 },
      { courses: ['CHEM'], level: 'HL', grade: 6 },
      { courses: ['BIO'], level: 'HL', grade: 5 }
    ]
  },
  {
    name: 'Architecture',
    description:
      'Learn the art and science of designing buildings and spaces. This program combines creative design with technical knowledge including structural systems, environmental design, and architectural history.',
    field: 'Architecture',
    degree: 'Bachelor of Science in Architecture',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/engineering/undergraduate/programs/bachelor-science-architecture-bscarch-architecture',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 5 },
      { courses: ['PHYS'], level: 'SL', grade: 5 }
    ]
  },

  // BUSINESS & ECONOMICS (Desautels Faculty of Management)
  {
    name: 'Commerce',
    description:
      "Prepare for professional and managerial careers with McGill's flagship business program. The BCom offers a flexible curriculum with specializations in finance, marketing, international management, and entrepreneurship.",
    field: 'Business & Economics',
    degree: 'Bachelor of Commerce',
    duration: '3 years',
    minIBPoints: 37,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/desautels/undergraduate/programs/bachelor-commerce-bcom',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true }]
  },
  {
    name: 'Economics',
    description:
      'Analyze economic systems, markets, and policy. This academically rigorous program provides training in economic theory, quantitative methods, and their application to real-world issues from trade to development.',
    field: 'Business & Economics',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 33,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/arts/undergraduate/programs/bachelor-arts-ba-major-economics',
    requirements: [{ courses: ['MATH-AA'], level: 'SL', grade: 5 }]
  },

  // SOCIAL SCIENCES (Faculty of Arts)
  {
    name: 'Psychology',
    description:
      'Study human behavior, cognition, and mental processes. This program covers developmental psychology, neuroscience, social psychology, and research methods to understand the human mind.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 33,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/arts/undergraduate/programs/bachelor-arts-ba-major-psychology',
    requirements: [] // No specific IB subject requirements
  },
  {
    name: 'Political Science',
    description:
      'Examine political systems, international relations, and public policy. Students analyze political institutions, comparative politics, political theory, and contemporary global challenges.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 33,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/arts/undergraduate/programs/bachelor-arts-ba-major-political-science',
    requirements: [] // No specific IB subject requirements
  },

  // NATURAL SCIENCES (Faculty of Science)
  {
    name: 'Biology',
    description:
      'Explore the science of life from molecules to ecosystems. This program covers cell biology, genetics, evolution, ecology, and provides hands-on laboratory experience in cutting-edge research.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 37,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/science/undergraduate/programs/bachelor-science-bsc-major-biology',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 5 },
      { courses: ['BIO', 'CHEM'], level: 'HL', grade: 5 }, // OR group
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'SL', grade: 5 } // OR group
    ]
  },
  {
    name: 'Chemistry',
    description:
      'Investigate the composition and properties of matter. Study organic, inorganic, physical, and analytical chemistry with applications in pharmaceuticals, materials science, and environmental chemistry.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 37,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/science/undergraduate/programs/bachelor-science-bsc-major-chemistry',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 5 },
      { courses: ['CHEM'], level: 'HL', grade: 5 },
      { courses: ['PHYS', 'BIO'], level: 'SL', grade: 5 } // OR group
    ]
  },
  {
    name: 'Physics',
    description:
      'Understand the fundamental laws governing the universe. From quantum mechanics to astrophysics, this program develops strong analytical and mathematical skills applicable across science and technology.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 37,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/science/undergraduate/programs/bachelor-science-bsc-major-physics',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 5, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 5 },
      { courses: ['CHEM', 'BIO'], level: 'SL', grade: 5 } // OR group
    ]
  },
  {
    name: 'Mathematics',
    description:
      'Develop advanced mathematical reasoning and problem-solving skills. This program covers pure and applied mathematics including analysis, algebra, statistics, and computational methods.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 37,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/science/undergraduate/programs/bachelor-science-bsc-major-mathematics',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true }]
  },

  // HEALTH (Ingram School of Nursing)
  {
    name: 'Nursing',
    description:
      'Prepare for a rewarding career in healthcare. This program combines innovative nursing courses with clinical practice to develop fundamental nursing expertise, critical thinking, and patient care skills.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science in Nursing',
    duration: '4 years',
    minIBPoints: 33,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/nursing/undergraduate/programs/bachelor-science-nursing-bscn',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }, // OR group
      { courses: ['BIO', 'CHEM'], level: 'HL', grade: 5 }, // OR group
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'SL', grade: 5 } // OR group
    ]
  },

  // ARTS & HUMANITIES
  {
    name: 'Music',
    description:
      'Develop musical artistry and scholarship at the renowned Schulich School of Music. Programs include performance, composition, music theory, and music education with world-class faculty and facilities.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Music',
    duration: '4 years',
    minIBPoints: 33,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/music/undergraduate/programs/bachelor-music-bmus',
    requirements: [] // Audition-based, no specific IB subject requirements
  },
  {
    name: 'History',
    description:
      'Study the past to understand the present. Explore political, social, cultural, and economic history across regions and periods, developing critical analysis and research skills.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 33,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/arts/undergraduate/programs/bachelor-arts-ba-major-history',
    requirements: [] // No specific IB subject requirements
  }
]

async function seedMcGillPrograms() {
  console.log('\n🎓 Seeding McGill University Programs\n')

  try {
    // 1. Find McGill University
    const mcgill = await prisma.university.findFirst({
      where: {
        name: {
          equals: 'McGill University',
          mode: 'insensitive'
        }
      }
    })

    if (!mcgill) {
      console.error('❌ McGill University not found in database.')
      console.error('   Run: npx tsx scripts/seed-mcgill.ts first')
      process.exit(1)
    }

    console.log(`✅ Found McGill University (ID: ${mcgill.id})\n`)

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
          universityId: mcgill.id
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
              universityId: mcgill.id,
              fieldOfStudyId: fieldId,
              degreeType: programDef.degree,
              duration: programDef.duration,
              minIBPoints: programDef.minIBPoints,
              programUrl: programDef.programUrl
            }
          })

          // Create course requirements
          for (const req of programDef.requirements) {
            // If multiple courses, create an OR group
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
          `   ✅ ${programDef.name} (${programDef.minIBPoints} pts, ${programDef.requirements.length} requirements)`
        )
        successCount++
      } catch (error) {
        console.error(`   ❌ Failed to create ${programDef.name}:`, error)
        failCount++
      }
    }

    // 4. Summary
    console.log('\n' + '─'.repeat(50))
    console.log('\n📊 Summary:')
    console.log(`   ✅ Created: ${successCount} programs`)
    console.log(`   ⏭️  Skipped: ${skipCount} programs (already exist)`)
    console.log(`   ❌ Failed: ${failCount} programs`)

    console.log('\n📡 Note: Programs will automatically sync to Algolia via Prisma extension.')
    console.log('   Check Algolia dashboard to confirm sync.\n')

    console.log('🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error seeding McGill programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedMcGillPrograms()
