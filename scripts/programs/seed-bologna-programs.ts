/**
 * Seed University of Bologna Programs to Database
 *
 * Adds undergraduate and integrated (single cycle) programs for University of Bologna
 * with IB requirements. Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source: User-provided program data from Bologna website
 * All descriptions extracted directly from provided text.
 *
 * Prerequisites: University of Bologna must exist in the database.
 *
 * Run with: npx tsx scripts/programs/seed-bologna-programs.ts
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

// Standard English requirement for all Bologna programs (English-taught)
// English A Language & Literature OR Literature SL 4
const ENGLISH_REQUIREMENT: RequirementDef[] = [
  { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
]

const programs: ProgramDef[] = [
  // ============================================
  // BUSINESS & ECONOMICS PROGRAMS
  // ============================================
  {
    name: 'Business and Economics (CLaBE)',
    description:
      'The Course is a 1st cycle degree – 3 year Bachelor degree - entirely taught in English, forming graduates qualified for market oriented managerial or consultant positions within an international setting. The course provides students with management abilities in different areas, enabling them to address international issues. It is an international programme for both Italian and foreign students.',
    field: 'Business & Economics',
    degree: 'Bachelor',
    duration: '3 years',
    minIBPoints: 28,
    programUrl: 'https://corsi.unibo.it/1cycle/CLaBE/overview',
    requirements: [
      // Math for business/economics programs
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Economics and Finance',
    description:
      'An international undergraduate degree course entirely taught in English. Its goal is to provide the quantitative and qualitative tools to analyse modern economic and financial systems. On completion of the programme, students will learn and practice economic reasoning tools to formulate and evaluate economic advice and policy, for both the private and the public sector.',
    field: 'Business & Economics',
    degree: 'Bachelor',
    duration: '3 years',
    minIBPoints: 30,
    programUrl: 'https://corsi.unibo.it/1cycle/EconomicsFinance/overview',
    requirements: [
      // Quantitative focus - Math HL preferred
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Economics of Tourism and Cities',
    description:
      'The course offers an economical and managerial approach to the analysis of tourism industries, smart cities and complex interactions between tourism and urban systems. It provides students with the cultural and technical profile required to join, as a manager or professional, private and public enterprises in the contexts of touristic industries and smart cities.',
    field: 'Business & Economics',
    degree: 'Bachelor',
    duration: '3 years',
    minIBPoints: 26,
    programUrl: 'https://corsi.unibo.it/1cycle/clet/overview',
    requirements: [
      // Math for economics
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Management and Economics',
    description:
      'The programme is a multidisciplinary project aimed at developing a solid preparation in the economic and managerial field with an international perspective. It provides solid statistical-mathematical, legal, economic and managerial basis necessary to develop the skills required to promote the growth of companies operating in global markets. Key features: international perspective + data analysis.',
    field: 'Business & Economics',
    degree: 'Bachelor',
    duration: '3 years',
    minIBPoints: 28,
    programUrl: 'https://corsi.unibo.it/1cycle/Management/programme',
    requirements: [
      // Math for management
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // SOCIAL SCIENCES & POLITICS PROGRAMS
  // ============================================
  {
    name: 'Economics, Politics and Social Sciences',
    description:
      'The programme offers a multidisciplinary approach to contemporary problems through economic, political, legal and managerial studies. It provides sound quantitative training enabling you to interpret economic, political and social phenomena. You can graduate either in economics or in politics.',
    field: 'Social Sciences',
    degree: 'Bachelor',
    duration: '3 years',
    minIBPoints: 26,
    programUrl: 'https://corsi.unibo.it/1cycle/EconomicsPoliticsSocialSciences/overview',
    requirements: [
      // Multidisciplinary - Math helpful
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'European Studies',
    description:
      'This international, multidisciplinary, multilingual European programme was developed, within the framework of Una Europa, by four universities (University of Bologna, KU Leuven, Universidad Complutense de Madrid and Uniwersytet Jagielloński w Krakowie) and mobility partners. Its main focus is a compulsory mobility period abroad to foster the possibility of an international career.',
    field: 'Social Sciences',
    degree: 'Bachelor',
    duration: '3 years',
    minIBPoints: 28,
    programUrl: 'https://corsi.unibo.it/1cycle/EuropeanStudies/overview',
    requirements: [
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'International Studies',
    description:
      "The peculiarity of this Bachelor's programme is its interdisciplinary approach, which allows to gain a complete comprehension of a complex and interconnected world. Students deal with qualified professors and have access to stimulating opportunities: exchange programs, traineeships and language courses, experiences necessary to work in an international environment.",
    field: 'Social Sciences',
    degree: 'Bachelor',
    duration: '3 years',
    minIBPoints: 26,
    programUrl: 'https://corsi.unibo.it/1cycle/InternationalStudies/overview',
    requirements: [
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // ENGINEERING PROGRAMS
  // ============================================
  {
    name: 'Building Construction Engineering',
    description:
      'English-language programme focused on construction to train engineers with an international experience. The programme prepares you for a global career and gives access to various second-cycle degree programmes.',
    field: 'Engineering',
    degree: 'Bachelor',
    duration: '3 years',
    minIBPoints: 28,
    programUrl: 'https://corsi.unibo.it/1cycle/Building/overview',
    requirements: [
      // Math for engineering
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      // Physics for engineering
      { courses: ['PHYS'], level: 'SL', grade: 4 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // NATURAL SCIENCES & GENOMICS PROGRAMS
  // ============================================
  {
    name: 'Genomics',
    description:
      'The programme provides theoretical and practical basis for applying IT, mathematical and statistical skills to the analysis of genomic, and multi-omic, data. The international and multidisciplinary environment, together with numerous practical activities are distinctive elements of the course. Training is completed by the curricular internship, in university or external facilities, in Italy or abroad.',
    field: 'Natural Sciences',
    degree: 'Bachelor',
    duration: '3 years',
    minIBPoints: 30,
    programUrl: 'https://corsi.unibo.it/1cycle/Genomics/overview',
    requirements: [
      // Biology for genomics
      { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
      // Math for data analysis
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Biology of Human and Environmental Health',
    description:
      'The Universities of Padua and Bologna jointly offer an innovative, multidisciplinary degree program. The first two years in Padua cover topics like cellular biology, genetics, bioinformatics, biostatistics, and physiology. The third year focuses on biological bases of diseases or environmental influences on human health.',
    field: 'Natural Sciences',
    degree: 'Bachelor',
    duration: '3 years',
    minIBPoints: 28,
    programUrl: 'https://corsi.unibo.it/1cycle/HumanEnvironmentalHealth/overview',
    requirements: [
      // Biology required
      { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
      // Chemistry helpful
      { courses: ['CHEM'], level: 'SL', grade: 4 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // MEDICINE & HEALTH PROGRAMS (Single Cycle / Integrated Masters)
  // ============================================
  {
    name: 'Medicine and Surgery',
    description:
      "The students develop a comprehensive vision of Medicine's potential by incorporating health promotion, disease prevention, treatment, and rehabilitation into their practice. The use of English language facilitates access to medical literature and international meetings. Graduates are able to communicate better with foreign patients, and to interact with colleagues from different countries.",
    field: 'Medicine & Health',
    degree: 'Combined Bachelor and Master',
    duration: '6 years',
    minIBPoints: 36,
    programUrl: 'https://corsi.unibo.it/singlecycle/MedicineAndSurgery/overview',
    requirements: [
      // Biology required for medicine
      { courses: ['BIO'], level: 'HL', grade: 6, critical: true },
      // Chemistry required
      { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
      // Math helpful
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Pharmacy',
    description:
      'Unique in the Italian context for its catalogue of courses and for being a degree programme taught entirely in English, the international title of Pharmacist is spendable throughout the EU, offering the opportunity to operate in an international dimension to work in the supply chain of pharmaceuticals and health care products. The programme includes a curricular internship and possible experience abroad.',
    field: 'Medicine & Health',
    degree: 'Combined Bachelor and Master',
    duration: '5 years',
    minIBPoints: 32,
    programUrl: 'https://corsi.unibo.it/singlecycle/Pharmacy-Rimini/overview',
    requirements: [
      // Chemistry critical for pharmacy
      { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
      // Biology important
      { courses: ['BIO'], level: 'SL', grade: 5 },
      // Math requirement
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Veterinary Medicine',
    description:
      "The Master's Degree in Veterinary Medicine, taught in English, offers a comprehensive and globally oriented education for future veterinarians. Combining evidence-based theoretical knowledge with hands-on training, the programme prepares students for careers in clinical practice, animal production, veterinary public health and biomedical research at international levels with a One Health approach.",
    field: 'Medicine & Health',
    degree: 'Combined Bachelor and Master',
    duration: '5 years',
    minIBPoints: 34,
    programUrl: 'https://corsi.unibo.it/singlecycle/VeterinaryMedicine/overview',
    requirements: [
      // Biology critical for veterinary
      { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
      // Chemistry important
      { courses: ['CHEM'], level: 'SL', grade: 5 },
      // Math requirement
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  }
]

async function seedBolognaPrograms() {
  console.log('\n🎓 Seeding University of Bologna Programs\n')

  try {
    // 1. Find University of Bologna
    const bologna = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'University of Bologna', mode: 'insensitive' } },
          { name: { contains: 'Bologna', mode: 'insensitive' } },
          { name: { contains: 'Alma Mater', mode: 'insensitive' } }
        ]
      }
    })

    if (!bologna) {
      console.error('❌ University of Bologna not found in database.')
      console.error('   Please create the university first.')
      process.exit(1)
    }

    console.log(`✅ Found University of Bologna (ID: ${bologna.id})\n`)

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
          universityId: bologna.id
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
              universityId: bologna.id,
              fieldOfStudyId: fieldId,
              degreeType: programDef.degree,
              duration: programDef.duration,
              minIBPoints: programDef.minIBPoints,
              programUrl: programDef.programUrl,
              requirementsVerified: true,
              requirementsUpdatedAt: new Date()
            }
          })

          // Group requirements by their structure to create proper OR groups
          const reqGroups: Map<string, RequirementDef[]> = new Map()

          for (const req of programDef.requirements) {
            const key = `${req.level}-${req.grade}-${req.critical || false}`
            if (!reqGroups.has(key)) {
              reqGroups.set(key, [])
            }
            reqGroups.get(key)!.push(req)
          }

          // Create requirements with proper OR grouping
          for (const [, reqs] of reqGroups) {
            const orGroupId = crypto.randomUUID()

            for (const req of reqs) {
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
    console.error('\n❌ Error seeding Bologna programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedBolognaPrograms()
