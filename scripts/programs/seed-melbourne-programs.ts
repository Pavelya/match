/**
 * Seed University of Melbourne Programs to Database
 *
 * Adds undergraduate programs for The University of Melbourne with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source:
 * - https://study.unimelb.edu.au/how-to-apply/undergraduate-study/international-applications/entry-requirements
 * - Individual program pages at study.unimelb.edu.au
 *
 * Prerequisites: University of Melbourne must exist in the database.
 * If not, create it first.
 *
 * Run with: npx tsx scripts/programs/seed-melbourne-programs.ts
 */

import { PrismaClient, CourseLevel } from '@prisma/client'

const prisma = new PrismaClient()

// Program definitions with IB requirements
// Requirements format: array of { courses: string[], level: 'HL'|'SL', grade: number, critical?: boolean }
// When multiple courses are in the array, they form an OR group
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
  // ARTS & HUMANITIES PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Arts',
    description:
      "A Bachelor of Arts (BA) offers a flexible approach to studying the humanities, social sciences and languages at Australia's number one university. Build interdisciplinary knowledge, community leadership and cultural awareness. And, you'll graduate with the skills necessary to succeed in the rapidly changing, global workplace.",
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 30,
    programUrl: 'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-arts/',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true } // English at SL or HL grade 4
    ]
  },

  // ============================================
  // FINE ARTS PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Fine Arts (Music Theatre)',
    description:
      'Selection into the Bachelor of Fine Arts is talent-based. The selection process for this specialisation includes an audition. This program offers comprehensive training in music theatre performance, combining acting, singing, and dance in preparation for careers in professional theatre and performing arts.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Fine Arts',
    duration: '3 years',
    minIBPoints: 30,
    programUrl:
      'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-fine-arts-music-theatre/',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }]
  },
  {
    name: 'Bachelor of Fine Arts (Film and Television)',
    description:
      'Selection into the Bachelor of Fine Arts is talent-based. The selection process for this specialisation includes an audition. This program provides comprehensive training in film and television production, developing skills in directing, cinematography, editing and storytelling for screen.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Fine Arts',
    duration: '3 years',
    minIBPoints: 30,
    programUrl:
      'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-fine-arts-film-and-television/',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }]
  },
  {
    name: 'Bachelor of Fine Arts (Production)',
    description:
      'Selection into the Bachelor of Fine Arts is talent-based. The selection process for this specialisation includes an audition. This program focuses on theatrical production including stage management, technical production, design and production management for live performance.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Fine Arts',
    duration: '3 years',
    minIBPoints: 30,
    programUrl:
      'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-fine-arts-production/',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }]
  },
  {
    name: 'Bachelor of Fine Arts (Screenwriting)',
    description:
      'Selection into the Bachelor of Fine Arts is talent-based. The selection process for this specialisation includes an audition. This program develops skills in writing for film, television and digital platforms, focusing on storytelling, narrative structure and script development.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Fine Arts',
    duration: '3 years',
    minIBPoints: 30,
    programUrl:
      'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-fine-arts-screenwriting/',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }]
  },
  {
    name: 'Bachelor of Fine Arts (Acting)',
    description:
      'Selection into the Bachelor of Fine Arts is talent-based. The selection process for this specialisation includes an audition. This intensive conservatory-style program provides rigorous training in acting technique, voice, movement, and performance for stage and screen.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Fine Arts',
    duration: '3 years',
    minIBPoints: 30,
    programUrl:
      'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-fine-arts-acting/',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }]
  },

  // ============================================
  // MUSIC PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Music (Jazz and Improvisation)',
    description:
      'This program offers comprehensive training in jazz performance and improvisation, developing musicianship skills alongside theoretical understanding of jazz traditions and contemporary improvised music practices.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Music',
    duration: '3 years',
    minIBPoints: 30,
    programUrl:
      'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-music-jazz-and-improvisation/',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }]
  },

  // ============================================
  // BUSINESS & ECONOMICS PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Commerce',
    description:
      'Equip yourself with the skills and knowledge to understand and solve key business challenges. Make a difference to society, policy, and organisations while forging a pathway to a global career.',
    field: 'Business & Economics',
    degree: 'Bachelor of Commerce',
    duration: '3 years',
    minIBPoints: 35,
    programUrl: 'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-commerce/',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }, // English at SL/HL grade 4
      // Mathematics: Analysis and Approaches at HL or SL grade 4, OR Applications and Interpretations at HL only grade 4
      { courses: ['MATH-AA'], level: 'SL', grade: 4, critical: true } // Math AA at SL/HL grade 4 (AI accepted only at HL per requirements)
    ]
  },

  // ============================================
  // AGRICULTURE & ENVIRONMENTAL PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Agriculture',
    description:
      "Agriculture's focus on science and sustainability is how we will adapt to our changing climate, declining environmental health and increasing demand for safe food production to feed our growing populations. A Bachelor of Agriculture is your opportunity to use science, technology and business to tackle critical sustainability issues and build a career with lasting impact. You'll learn the science necessary to produce safe, high-quality and ethical food and fibre as well as the economics underpinning Australia's important role in international trade.",
    field: 'Environmental Studies',
    degree: 'Bachelor of Agriculture',
    duration: '3 years',
    minIBPoints: 25,
    programUrl: 'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-agriculture/',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
      // Math: Applications and interpretations HL grade 4, OR Analysis and approaches SL/HL grade 4, OR Applications and interpretations SL grade 5
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
    ]
  },

  // ============================================
  // DESIGN & ARCHITECTURE PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Design',
    description:
      'Good design has the power to transform and provide lasting solutions that improve our lives. Designers apply creative and open approaches to defining and solving problems, leading to high-quality decisions. This enables businesses and industries to overcome rigid or outdated ways of doing things. Design has applications in the creation and improvement of our cities, buildings, transport networks, furniture, websites, processes, bridges, landscapes and environment. Designers are innovators who enhance the way we live and interact with the world around us.',
    field: 'Architecture',
    degree: 'Bachelor of Design',
    duration: '3 years',
    minIBPoints: 30,
    programUrl: 'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-design/',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }]
  },

  // ============================================
  // NATURAL SCIENCES PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Science',
    description:
      "Maybe you've always known that you wanted to be a marine biologist. Or perhaps you're still deciding whether you want to be an engineer or a geologist. A doctor or a vet? A data scientist or a physicist? A chemist or a psychologist? The Bachelor of Science is a pathway to all these careers, and hundreds more. With more than 40 majors on offer, you can select from the full range of science, biomedicine, mathematics, engineering and IT subjects. You'll be taught, mentored and inspired by international experts in their fields.",
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 31,
    programUrl: 'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-science/',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
      // Math: Applications and interpretations HL grade 4, OR Analysis and approaches SL/HL grade 4
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      // One of Biology, Chemistry or Physics at HL or SL grade 4
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Science (Advanced-Honours)',
    description:
      'A challenging and rewarding pathway for high-achieving students who want to pursue an integrated undergraduate and Honours degree in Science. This program provides enhanced research opportunities and mentoring from leading academics, preparing graduates for research careers or advanced postgraduate study.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (Honours)',
    duration: '4 years',
    minIBPoints: 31,
    programUrl:
      'https://study.unimelb.edu.au/find/courses/honours/bachelor-of-science-advanced-honours/',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
      // Math: Applications and interpretations HL grade 4, OR Analysis and approaches SL/HL grade 4
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      // One of Biology, Chemistry or Physics at HL or SL grade 4
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
    ]
  },

  // ============================================
  // MEDICINE & HEALTH PROGRAMS
  // ============================================
  {
    name: 'Bachelor of Biomedicine',
    description:
      'The Bachelor of Biomedicine offers a transformative journey through the biomedical science of life, disease, and health systems right in the heart of the Melbourne Biomedical Precinct, the largest of its kind in the southern hemisphere. Learn to apply concepts across the biomedical science disciplines, from molecules to malady and from individual diseases to population health. The integrated curriculum is designed to build your understanding of the human body in its full complexity, preparing you for the challenges of modern healthcare.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Biomedicine',
    duration: '3 years',
    minIBPoints: 35,
    programUrl: 'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-biomedicine/',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
      { courses: ['CHEM'], level: 'SL', grade: 4, critical: true },
      // Math: Applications and interpretations HL grade 4, OR Analysis and approaches SL/HL grade 4
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Bachelor of Oral Health',
    description:
      'Prepare for a career in oral health care, providing preventive and therapeutic dental services. This program combines clinical training with scientific understanding of oral health, preparing graduates to work as oral health therapists in dental practices, community health settings, and public health programs.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Oral Health',
    duration: '3 years',
    minIBPoints: 37,
    programUrl: 'https://study.unimelb.edu.au/find/courses/undergraduate/bachelor-of-oral-health/',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
      // One of Biology or Chemistry at SL/HL grade 4
      { courses: ['BIO', 'CHEM'], level: 'SL', grade: 4, critical: true }
    ]
  }
]

async function seedMelbournePrograms() {
  console.log('\n🎓 Seeding University of Melbourne Programs\n')

  try {
    // 1. Find University of Melbourne
    const melbourne = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'University of Melbourne', mode: 'insensitive' } },
          { name: { equals: 'The University of Melbourne', mode: 'insensitive' } }
        ]
      }
    })

    if (!melbourne) {
      console.error('❌ University of Melbourne not found in database.')
      console.error('   Please create the university first.')
      process.exit(1)
    }

    console.log(`✅ Found University of Melbourne (ID: ${melbourne.id})\n`)

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
          universityId: melbourne.id
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
              universityId: melbourne.id,
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
    console.error('\n❌ Error seeding Melbourne programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedMelbournePrograms()
