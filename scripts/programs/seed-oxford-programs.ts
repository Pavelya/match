/**
 * Seed University of Oxford Programs to Database
 *
 * Adds undergraduate programs for University of Oxford with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source: extracted from ox.ac.uk
 *
 * Prerequisites: University of Oxford must exist in the database.
 * If not, create it first.
 *
 * Run with: npx tsx scripts/programs/seed-oxford-programs.ts
 */

import { PrismaClient, CourseLevel } from '@prisma/client'

const prisma = new PrismaClient()

// Program definitions with IB requirements
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
  // HUMANITIES & ARTS
  // ============================================
  {
    name: 'Archaeology and Anthropology',
    description:
      'The study of Archaeology and Anthropology together offers a unique perspective on human life and society, past and present.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/archaeology-and-anthropology',
    requirements: []
  },
  {
    name: 'Asian and Middle Eastern Studies',
    description:
      'This course offers the opportunity to study the languages, literature, history and culture of one of the world’s major civilisations.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/asian-and-middle-eastern-studies',
    requirements: []
  },
  {
    name: 'Classical Archaeology and Ancient History',
    description:
      'This course integrates the study of history and archaeology of the classical world.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/classical-archaeology-and-ancient-history',
    requirements: []
  },
  {
    name: 'Classics',
    description:
      'Classics (Literae Humaniores) is a wide-ranging degree devoted to the study of the literature, history, philosophy, languages and archaeology of the ancient Greek and Roman worlds.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '4 years',
    minIBPoints: 38,
    programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/classics',
    requirements: [
      { courses: ['LAT', 'GRK'], level: 'HL', grade: 6, critical: false } // Helpful/Required depending on course I/II
    ]
  },
  {
    name: 'Classics and English',
    description: 'A course integrating the study of Classics and English.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/classics-and-english',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }]
  },
  {
    name: 'Classics and Modern Languages',
    description: 'Combine the study of a modern language with Classics.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/classics-and-modern-languages',
    requirements: []
  },
  {
    name: 'English Language and Literature',
    description: 'This course covers English literature from its origins to the present day.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/english-language-and-literature',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }]
  },
  {
    name: 'English and Modern Languages',
    description: 'Combine the study of English with a modern language.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/english-and-modern-languages',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }]
  },
  {
    name: 'European and Middle Eastern Languages',
    description: 'Combine the study of a European language with a Middle Eastern language.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/european-and-middle-eastern-languages',
    requirements: []
  },
  {
    name: 'Fine Art',
    description: 'Fine Art is the making and study of visual art.',
    field: 'Arts & Humanities',
    degree: 'BFA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/fine-art',
    requirements: [
      { courses: ['VISUAL-ARTS'], level: 'HL', grade: 6, critical: true } // Portfolio required usually implies Art background
    ]
  },
  {
    name: 'History',
    description:
      'History at Oxford combines the examination of large regions over extended periods of time with more focused work on smaller social groups.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history',
    requirements: [{ courses: ['HIST'], level: 'HL', grade: 6, critical: true }]
  },
  {
    name: 'History (Ancient and Modern)',
    description: 'Study history from the Bronze Age to the present day.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history-ancient-and-modern',
    requirements: [{ courses: ['HIST'], level: 'HL', grade: 6, critical: true }]
  },
  {
    name: 'History and English',
    description: 'Study history and English literature together.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history-and-english',
    requirements: [
      { courses: ['HIST'], level: 'HL', grade: 6, critical: true },
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'HL', grade: 6, critical: true }
    ]
  },
  {
    name: 'History and Modern Languages',
    description: 'Combine the study of History with a modern language.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history-and-modern-languages',
    requirements: [{ courses: ['HIST'], level: 'HL', grade: 6, critical: true }]
  },
  {
    name: 'History and Politics',
    description:
      'Brings together complementary but distinct disciplines to form a coherent and stimulating programme.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history-and-politics',
    requirements: [{ courses: ['HIST'], level: 'HL', grade: 6, critical: true }]
  },
  {
    name: 'History and Economics',
    description:
      'Integrates these two subjects to form a coherent and intellectually stimulating programme.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history-and-economics',
    requirements: [
      { courses: ['HIST'], level: 'HL', grade: 6, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
    ]
  },
  {
    name: 'History of Art',
    description:
      'Aims to arrive at an historical understanding of the origins, meanings and purposes of art and artefacts.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history-art',
    requirements: [] // Essay based subject
  },
  {
    name: 'Modern Languages',
    description:
      'Provides practical training in written and spoken language and an extensive introduction to European literature and thought.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/modern-languages',
    requirements: [] // Language usually required
  },
  {
    name: 'Modern Languages and Linguistics',
    description: 'Study one modern language in depth together with linguistics.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/modern-languages-and-linguistics',
    requirements: []
  },
  {
    name: 'Music',
    description: 'Music covers reading, listening, performing and composing.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/music',
    requirements: [{ courses: ['MUSIC'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Philosophy and Modern Languages',
    description:
      'Brings together some of the most important approaches to understanding language, literature and ideas.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '4 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/philosophy-and-modern-languages',
    requirements: []
  },
  {
    name: 'Philosophy and Theology',
    description:
      'Brings together some of the most important approaches to understanding and assessing the intellectual claims of religion.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/philosophy-and-theology',
    requirements: []
  },
  {
    name: 'Religion and Asian and Middle Eastern Studies',
    description:
      'Offers an in-depth understanding of one of the world’s great religious traditions.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/religion-and-asian-and-middle-eastern-studies',
    requirements: []
  },
  {
    name: 'Theology and Religion',
    description: 'Understanding of the intellectual underpinning of religious traditions.',
    field: 'Arts & Humanities',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/theology-and-religion',
    requirements: []
  },

  // ============================================
  // SCIENCES & ENGINEERING
  // ============================================
  {
    name: 'Biochemistry (Molecular and Cellular)',
    description:
      'Biochemistry helps us to understand the interaction between the various cell parts and how whole organisms function.',
    field: 'Natural Sciences',
    degree: 'MBiochem',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/biochemistry-molecular-and-cellular',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 7, critical: true },
      { courses: ['MATH-AA', 'MATH-AI', 'BIO', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Biology',
    description:
      'Biology is the study of living things and how they interact with their environment.',
    field: 'Natural Sciences',
    degree: 'MBiol',
    duration: '4 years',
    minIBPoints: 40,
    programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/biology',
    requirements: [
      { courses: ['BIO'], level: 'HL', grade: 7, critical: true },
      { courses: ['CHEM', 'MATH-AA', 'MATH-AI', 'PHYS'], level: 'HL', grade: 6 }
    ]
  },
  {
    name: 'Chemistry',
    description:
      'Chemistry is a wide-ranging science concerned with matter at the atomic and molecular scale.',
    field: 'Natural Sciences',
    degree: 'MChem',
    duration: '4 years',
    minIBPoints: 40,
    programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/chemistry',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 7, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }
    ]
  },
  {
    name: 'Computer Science',
    description: 'Computing is about understanding computer systems and networks at a deep level.',
    field: 'Computer Science',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 40,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/computer-science',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Computer Science and Philosophy',
    description: 'Study Computer Science and Philosophy together.',
    field: 'Computer Science',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 40,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/computer-science-and-philosophy',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Earth Sciences (Geology)',
    description: 'Earth Sciences is the study of the planet we live on.',
    field: 'Natural Sciences',
    degree: 'MEarthSci',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/earth-sciences',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI', 'PHYS', 'CHEM'], level: 'HL', grade: 7, critical: true } // Usually requires two sciences/maths
    ]
  },
  {
    name: 'Engineering Science',
    description: 'Engineering Science challenges students to solve real-world problems.',
    field: 'Engineering',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/engineering-science',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 7, critical: true }
    ]
  },
  {
    name: 'Materials Science',
    description:
      'Materials Science spans the physics and chemistry of matter and engineering applications.',
    field: 'Engineering',
    degree: 'MEng',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/materials-science',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true },
      { courses: ['PHYS'], level: 'HL', grade: 7, critical: true },
      { courses: ['CHEM'], level: 'HL', grade: 6 } // Recommended
    ]
  },
  {
    name: 'Mathematics',
    description: 'Mathematics is a fundamental intellectual tool.',
    field: 'Natural Sciences',
    degree: 'MMath',
    duration: '4 years',
    minIBPoints: 40,
    programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/mathematics',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Mathematics and Computer Science',
    description: 'Combine mathematical reasoning with an understanding of computing.',
    field: 'Computer Science',
    degree: 'MMathCompSci',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/mathematics-and-computer-science',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Mathematics and Philosophy',
    description: 'Brings together two fundamental intellectual skills.',
    field: 'Natural Sciences',
    degree: 'MMathPhil',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/mathematics-and-philosophy',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Mathematics and Statistics',
    description: 'Method-building and wide-ranging applied work with data.',
    field: 'Natural Sciences',
    degree: 'MMath',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/mathematics-and-statistics',
    requirements: [{ courses: ['MATH-AA'], level: 'HL', grade: 7, critical: true }]
  },
  {
    name: 'Medicine',
    description:
      'Provides a thorough intellectual training with particular emphasis on basic science research.',
    field: 'Medicine & Health',
    degree: 'BM BCh',
    duration: '6 years',
    minIBPoints: 39,
    programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/medicine',
    requirements: [
      { courses: ['CHEM'], level: 'HL', grade: 7, critical: true },
      { courses: ['BIO', 'PHYS', 'MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true } // Requires Chemistry + one other science/math at HL 7
    ]
  },
  {
    name: 'Physics',
    description: 'Study of the universe from the smallest to the largest scale.',
    field: 'Natural Sciences',
    degree: 'MPhys',
    duration: '4 years',
    minIBPoints: 40,
    programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/physics',
    requirements: [
      { courses: ['PHYS'], level: 'HL', grade: 7, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }
    ]
  },
  {
    name: 'Physics and Philosophy',
    description: 'Combines rigorous science and humanities.',
    field: 'Natural Sciences',
    degree: 'MPhysPhil',
    duration: '4 years',
    minIBPoints: 40,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/physics-and-philosophy',
    requirements: [
      { courses: ['PHYS'], level: 'HL', grade: 7, critical: true },
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 7, critical: true }
    ]
  },
  {
    name: 'Psychology (Experimental)',
    description: 'Science of mental life involving rigorous formulation and testing of ideas.',
    field: 'Social Sciences',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 39,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/psychology-experimental',
    requirements: [
      {
        courses: ['BIO', 'CHEM', 'PHYS', 'MATH-AA', 'MATH-AI', 'PSYCH'],
        level: 'HL',
        grade: 6,
        critical: true
      } // Usually one science/maths
    ]
  },
  {
    name: 'Psychology, Philosophy and Linguistics',
    description: 'Brings together three distinct but related disciplines.',
    field: 'Social Sciences',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 39,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/psychology-philosophy-and-linguistics',
    requirements: []
  },

  // ============================================
  // SOCIAL SCIENCES & LAW
  // ============================================
  {
    name: 'Economics and Management',
    description: 'Examines the way in which the economy and organisations function.',
    field: 'Business & Economics',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 39,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/economics-and-management',
    requirements: [{ courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true }]
  },
  {
    name: 'Geography',
    description: 'Diverse interdisciplinary degree bridging natural and social sciences.',
    field: 'Social Sciences',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 39,
    programUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/geography',
    requirements: []
  },
  {
    name: 'Human Sciences',
    description: 'Study humans from multiple interconnecting perspectives.',
    field: 'Social Sciences',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/human-sciences',
    requirements: []
  },
  {
    name: 'Law (Jurisprudence)',
    description: 'Provides an excellent basis for a career in the legal profession.',
    field: 'Law',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 38,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/law-jurisprudence',
    requirements: [] // Essay based subject recommended
  },
  {
    name: 'Philosophy, Politics and Economics',
    description: 'Understanding the world around us through three disciplines.',
    field: 'Social Sciences',
    degree: 'BA',
    duration: '3 years',
    minIBPoints: 39,
    programUrl:
      'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/philosophy-politics-and-economics',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: false } // Helpful
    ]
  }
]

async function seedOxfordPrograms() {
  console.log('\n🎓 Seeding University of Oxford Programs\n')

  try {
    // 1. Find or create University of Oxford
    let uni = await prisma.university.findFirst({
      where: {
        name: { contains: 'Oxford', mode: 'insensitive' }
      }
    })

    if (!uni) {
      // Get UK country
      const uk = await prisma.country.findFirst({
        where: { code: 'GB' }
      })

      if (!uk) {
        console.error('❌ UK not found in database.')
        process.exit(1)
      }

      // Create University
      uni = await prisma.university.create({
        data: {
          name: 'University of Oxford',
          description:
            'The University of Oxford is the oldest university in the English-speaking world.',
          countryId: uk.id,
          city: 'Oxford',
          classification: 'PUBLIC',
          websiteUrl: 'https://www.ox.ac.uk',
          studentPopulation: 24000
        }
      })
      console.log(`✅ Created University of Oxford (ID: ${uni.id})\n`)
    } else {
      console.log(`✅ Found University of Oxford (ID: ${uni.id})\n`)
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
    console.error('\n❌ Error seeding Oxford programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedOxfordPrograms()
