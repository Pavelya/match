/**
 * Seed Additional McGill University Programs (Batch 2)
 *
 * Adds 20 more bachelor programs for McGill University with IB requirements.
 * Based on official requirements from:
 * https://www.mcgill.ca/undergraduate-admissions/apply/requirements/international/ib
 *
 * Prerequisites: Run seed-mcgill.ts first to create the university.
 *
 * Run with: npx tsx scripts/seed-mcgill-programs-batch2.ts
 */

import 'dotenv/config'
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
  // ENGINEERING - Additional programs not in batch 1
  {
    name: 'Materials Engineering',
    description:
      'Study the structure, properties, and applications of materials including metals, ceramics, polymers, and composites. Learn to develop new materials for aerospace, biomedical, and sustainable technology applications.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/engineering/undergraduate/programs/bachelor-engineering-beng-materials-engineering',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'SL', grade: 5 },
      { courses: ['CHEM'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Mining Engineering',
    description:
      'Design and manage mining operations sustainably. Learn extraction techniques, mine planning, environmental management, and resource economics for the global mining industry.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 33,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/engineering/undergraduate/programs/bachelor-engineering-beng-mining-engineering',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      { courses: ['PHYS'], level: 'SL', grade: 5 },
      { courses: ['CHEM'], level: 'SL', grade: 5 }
    ]
  },

  // AGRICULTURAL & ENVIRONMENTAL SCIENCES (Macdonald Campus)
  {
    name: 'Environmental Science',
    description:
      'Study ecosystems, climate change, conservation, and sustainable development. Combine fieldwork with laboratory research to address environmental challenges facing our planet.',
    field: 'Environmental Studies',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 30,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/agricultural/undergraduate/programs/bachelor-science-agricultural-environmental-sciences-bscagenvsci-major-environment',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Food Science',
    description:
      'Explore the science behind food production, safety, and nutrition. Learn food chemistry, microbiology, processing technologies, and quality management for the food industry.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 30,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/agricultural/undergraduate/programs/bachelor-science-food-science-bscfsc',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM'], level: 'SL', grade: 5 },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Agricultural Economics',
    description:
      'Apply economic principles to agriculture, food systems, and natural resources. Study market analysis, policy evaluation, and sustainable development in agricultural contexts.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 30,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/agricultural/undergraduate/programs/bachelor-science-agricultural-environmental-sciences-bscagenvsci-major-agricultural-economics',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5 }
    ]
  },
  {
    name: 'Bioresource Engineering',
    description:
      'Apply engineering principles to biological systems and natural resources. Design sustainable solutions for agriculture, food processing, water management, and bioenergy.',
    field: 'Engineering',
    degree: 'Bachelor of Engineering',
    duration: '4 years',
    minIBPoints: 30,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/agricultural/undergraduate/programs/bachelor-engineering-bioresource-bengbioresource',
    requirements: [
      { courses: ['MATH-AA'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5 }
    ]
  },

  // EDUCATION
  {
    name: 'Elementary Education',
    description:
      'Prepare to teach children in elementary schools. Develop pedagogical skills, classroom management techniques, and understanding of child development to inspire young learners.',
    field: 'Social Sciences',
    degree: 'Bachelor of Education',
    duration: '4 years',
    minIBPoints: 30,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/education/undergraduate/programs/bachelor-education-bed-kindergartenearly-childhood-and-elementary-education',
    requirements: [] // No specific IB subject requirements
  },
  {
    name: 'Secondary Education - Mathematics',
    description:
      'Become a high school mathematics teacher. Combine deep mathematical knowledge with pedagogical training to help students develop strong quantitative reasoning skills.',
    field: 'Social Sciences',
    degree: 'Bachelor of Education',
    duration: '4 years',
    minIBPoints: 30,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/education/undergraduate/programs/bachelor-education-bed-secondary-education',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 }]
  },
  {
    name: 'Physical Education',
    description:
      'Train to become a physical education teacher or sports professional. Study exercise science, motor learning, health promotion, and coaching methodologies.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Education',
    duration: '4 years',
    minIBPoints: 30,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/education/undergraduate/programs/bachelor-education-bed-physical-and-health-education',
    requirements: []
  },

  // KINESIOLOGY
  {
    name: 'Kinesiology',
    description:
      'Study human movement, exercise physiology, and sports science. Prepare for careers in athletic training, rehabilitation, health promotion, and sports performance.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 30,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/education/undergraduate/programs/bachelor-science-kinesiology-bsckines',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5 }
    ]
  },

  // HUMAN NUTRITION
  {
    name: 'Dietetics and Human Nutrition',
    description:
      'Study the science of nutrition and its role in human health. Prepare for careers as registered dietitians, nutrition researchers, or public health professionals.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 30,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/agricultural/undergraduate/programs/bachelor-science-nutritional-sciences-bscnutrsc-major-dietetics',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      { courses: ['BIO', 'CHEM'], level: 'SL', grade: 5 },
      { courses: ['PHYS', 'CHEM', 'BIO'], level: 'SL', grade: 5 }
    ]
  },

  // SOCIAL WORK
  {
    name: 'Social Work',
    description:
      'Prepare to help individuals, families, and communities overcome challenges. Study social policy, counseling techniques, community development, and advocacy for social justice.',
    field: 'Social Sciences',
    degree: 'Bachelor of Social Work',
    duration: '3 years',
    minIBPoints: 36,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/socialwork/undergraduate/programs/bachelor-social-work-bsw',
    requirements: [] // Admission based on written statement, no specific IB subjects
  },

  // ARTS & SCIENCE (Interfaculty)
  {
    name: 'Arts and Science',
    description:
      'Pursue an interdisciplinary degree combining majors from both Arts and Science faculties. Ideal for students who want to integrate humanities, social sciences, and natural sciences.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Arts and Science',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/arts_and_science/undergraduate/programs/bachelor-arts-and-science-basc',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 6 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 6 }
    ]
  },
  {
    name: 'Cognitive Science',
    description:
      'Study the mind from multiple perspectives including psychology, neuroscience, linguistics, philosophy, and computer science. Explore how humans think, learn, and perceive.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Arts and Science',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/arts_and_science/undergraduate/programs/bachelor-arts-and-science-basc-interfaculty-program-cognitive-science',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6 },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 5 }
    ]
  },

  // ADDITIONAL ARTS PROGRAMS
  {
    name: 'Philosophy',
    description:
      'Explore fundamental questions about existence, knowledge, ethics, and logic. Develop critical thinking and analytical reasoning skills applicable across many fields.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 34,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/arts/undergraduate/programs/bachelor-arts-ba-major-philosophy',
    requirements: []
  },
  {
    name: 'English Literature',
    description:
      'Study literary works from different periods, genres, and cultures. Develop skills in close reading, critical analysis, and written communication.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 34,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/arts/undergraduate/programs/bachelor-arts-ba-major-english',
    requirements: []
  },
  {
    name: 'Sociology',
    description:
      'Analyze social structures, institutions, and human interactions. Study inequality, culture, social movements, and policy to understand how societies function and change.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 34,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/arts/undergraduate/programs/bachelor-arts-ba-major-sociology',
    requirements: []
  },
  {
    name: 'Anthropology',
    description:
      'Study human cultures, societies, and biological evolution across time and space. Explore cultural diversity, archaeology, linguistic anthropology, and biological anthropology.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 34,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/arts/undergraduate/programs/bachelor-arts-ba-major-anthropology',
    requirements: []
  },
  {
    name: 'International Development Studies',
    description:
      'Examine global inequality, development policy, and sustainable solutions for developing nations. Study economics, politics, and social change in international contexts.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 34,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/arts/undergraduate/programs/bachelor-arts-ba-major-international-development-studies',
    requirements: []
  },

  // ADDITIONAL SCIENCE PROGRAMS
  {
    name: 'Biochemistry',
    description:
      'Study the chemical processes within living organisms. Explore protein structure, enzyme function, metabolism, and molecular genetics with applications in medicine and biotechnology.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 37,
    programUrl:
      'https://www.mcgill.ca/study/2024-2025/faculties/science/undergraduate/programs/bachelor-science-bsc-major-biochemistry',
    requirements: [
      { courses: ['MATH-AA'], level: 'HL', grade: 6 },
      { courses: ['CHEM'], level: 'HL', grade: 6 },
      { courses: ['BIO'], level: 'HL', grade: 6 }
    ]
  }
]

async function seedMcGillProgramsBatch2() {
  console.log('\n🎓 Seeding McGill University Programs (Batch 2)\n')

  try {
    // Find McGill University
    const mcgill = await prisma.university.findFirst({
      where: { name: { equals: 'McGill University', mode: 'insensitive' } }
    })

    if (!mcgill) {
      console.error('❌ McGill University not found in database.')
      console.error('   Run: npx tsx scripts/seed-mcgill.ts first')
      process.exit(1)
    }

    console.log(`✅ Found McGill University (ID: ${mcgill.id})\n`)

    // Get reference data
    const fields = await prisma.fieldOfStudy.findMany()
    const courses = await prisma.iBCourse.findMany()

    const fieldMap = new Map(fields.map((f) => [f.name, f.id]))
    const courseMap = new Map(courses.map((c) => [c.code, c.id]))

    console.log(`📚 Loaded ${fields.length} fields of study and ${courses.length} IB courses\n`)

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
        where: { name: programDef.name, universityId: mcgill.id }
      })

      if (existing) {
        console.log(`   ⏭️  ${programDef.name} already exists, skipping`)
        skipCount++
        continue
      }

      try {
        await prisma.$transaction(async (tx) => {
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

          for (const req of programDef.requirements) {
            const orGroupId = req.courses.length > 1 ? crypto.randomUUID() : null

            for (const courseCode of req.courses) {
              const courseId = courseMap.get(courseCode)
              if (!courseId) {
                console.warn(`      ⚠️  Course "${courseCode}" not found`)
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

        console.log(`   ✅ ${programDef.name} (${programDef.minIBPoints} pts)`)
        successCount++
      } catch (error) {
        console.error(`   ❌ Failed to create ${programDef.name}:`, error)
        failCount++
      }
    }

    console.log('\n' + '─'.repeat(50))
    console.log('\n📊 Summary:')
    console.log(`   ✅ Created: ${successCount} programs`)
    console.log(`   ⏭️  Skipped: ${skipCount} programs (already exist)`)
    console.log(`   ❌ Failed: ${failCount} programs`)

    console.log('\n📡 Run Algolia sync:')
    console.log('   npx tsx scripts/sync-to-algolia-standalone.ts\n')

    console.log('🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedMcGillProgramsBatch2()
