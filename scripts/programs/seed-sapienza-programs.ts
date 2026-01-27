/**
 * Seed Sapienza University of Rome Programs to Database
 *
 * Adds undergraduate and integrated programs for Sapienza University of Rome
 * with IB requirements. Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source: User-provided program data from Sapienza website
 * All descriptions extracted directly from provided text.
 *
 * Prerequisites: Sapienza University of Rome must exist in the database.
 *
 * Run with: npx tsx scripts/programs/seed-sapienza-programs.ts
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

// Standard English requirement for all Sapienza programs (English-taught)
// English A Language & Literature OR Literature SL 4
const ENGLISH_REQUIREMENT: RequirementDef[] = [
  { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4 }
]

const programs: ProgramDef[] = [
  // ============================================
  // COMPUTER SCIENCE & AI PROGRAMS
  // ============================================
  {
    name: 'Applied Computer Science and Artificial Intelligence',
    description:
      "The Bachelor's Degree Program in Applied Computer Science and Artificial Intelligence trains professionals in computer science with specialized skills in artificial intelligence and in the main areas of applied computing. Graduates in Applied Computer Science and Artificial Intelligence will acquire a solid foundational education, enabling them to keep pace with technological advancements, alongside advanced technical training that facilitates a smooth transition into the Information and Communication Technology (ICT) job market. Graduates … meet the requirements for admission to postgraduate studies, both in the field of computer science and in other scientific disciplines.",
    field: 'Computer Science',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 34,
    programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33502',
    requirements: [
      // Math HL recommended for CS/AI; SL with high score acceptable
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      // Physics HL/SL expected for science background
      { courses: ['PHYS'], level: 'SL', grade: 5 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // BIOINFORMATICS
  // ============================================
  {
    name: 'Bioinformatics',
    description:
      'The Degree Course in Bioinformatics is a three-year degree program entirely taught in English. The objective of the Degree Course is to train qualified figures with a background in bioinformatics, biomolecular, pharmaceutical, and information technology (IT) scientific research that synergistically integrates i) a solid set of theoretical skills in basic scientific disciplines; ii) extensive skills in the biomolecular, technological-applicative, and IT fields; iii) critical scientific assessment, competences, information, and communication skills. Graduates in Bioinformatics will have a solid multi- and transdisciplinary scientific cultural background and a strong foundation in the reference areas (e.g., biochemistry, genetics, molecular biology, medicinal chemistry, and computer science)….',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 34,
    programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33455',
    requirements: [
      // Biology HL recommended
      { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
      // Chemistry HL recommended
      { courses: ['CHEM'], level: 'HL', grade: 5 },
      // Math at least SL
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 5 },
      // Physics beneficial at SL
      { courses: ['PHYS'], level: 'SL', grade: 4 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // BUSINESS & ECONOMICS PROGRAMS
  // ============================================
  {
    name: 'Business Sciences',
    description:
      'The BSc in Business Sciences programme offers a fundamental multidisciplinary education aimed at understanding the functioning of modern business organizations and financial systems, as well as the main connotations of the environmental context. Graduates will be equipped to provide consultancy, and managerial and entrepreneurial activities in private and public organizations, which operate in real and financial markets. Students who graduate from the Business Sciences programme will develop adequate skills in economic, managerial, financial and legal disciplines, developing appropriate methods for the analysis and critical interpretation of business structures and dynamics.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 36,
    programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33437',
    requirements: [
      // Math HL recommended or SL with high grade
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      // Economics helpful but not mandatory
      { courses: ['ECON', 'BUS-MGMT'], level: 'SL', grade: 4 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Economics and Finance',
    description:
      'The BSc in Economics and Finance (class L-33) programme aims to equip students with the economic knowledge, qualitative and quantitative tools, and critical skills required to understand the mechanisms that govern economic phenomena. Students enrolled in the programme will learn to analyze the functioning of economic and financial markets, process and interpret statistical data, [and] learn to forecast… the future dynamics of economic and financial variables…. Furthermore, the programme offers a solid foundation for further academic studies. The BSc in Economics and Finance offers four different training paths (one in English and three in Italian)…',
    field: 'Business & Economics',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 36,
    programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33438',
    requirements: [
      // Math HL strongly preferred due to quantitative nature
      { courses: ['MATH-AA'], level: 'HL', grade: 6, critical: true },
      // Economics recommended but not mandatory
      { courses: ['ECON'], level: 'SL', grade: 4 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // ARTS & HUMANITIES PROGRAMS
  // ============================================
  {
    name: 'Classics',
    description:
      'The Programme provides a solid and thorough grounding in the knowledge of the ancient world. Particular focus is given to the languages and literature of Greece and Rome, ancient history, classical archaeology and the legacy of the Classics in medieval, modern and contemporary culture. Adopting a rigorous yet comprehensive approach, the Programme considers not only languages and literature, but also the cultural, anthropological, and reception aspects of ancient civilisations. Making the most of its location in Rome, the Programme offers opportunities for field trips, museum visits and library workshops.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 34,
    programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33528',
    requirements: [
      // History beneficial for humanities
      { courses: ['HIST'], level: 'SL', grade: 4 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },
  {
    name: 'Global Humanities',
    description:
      'The Degree in Global Humanities aims at providing students with knowledge and competences in the fields of humanities and social sciences privileging a global and transcultural perspective. It is characterized by flexible curricula, carefully planned and devised to preserve the interdisciplinary and complementary structure of the study plans. The curricula are organized around the following disciplines: history, sociology, anthropology, arts, literatures, law, economics, health. The Degree is open to Italian and international students interested in studying and expanding their knowledge on the complex historical processes affecting the global transformation of contemporary societies… in a renewed transnational perspective….',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts',
    duration: '3 years',
    minIBPoints: 32,
    programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33537',
    requirements: [
      // History beneficial for humanities and social sciences
      { courses: ['HIST'], level: 'SL', grade: 4 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // PHARMACEUTICAL SCIENCES
  // ============================================
  {
    name: 'Molecular Biology, Medicinal Chemistry and Computer Science for Pharmaceutical Applications',
    description:
      'The Degree Course in Molecular Biology, Medicinal Chemistry and Computer Science for Pharmaceutical Applications is a three-year degree program entirely taught in English. The objective of the Degree Course is to train qualified figures with a preparation in biomolecular, pharmaceutical and information technology research that integrates in a synergistic manner: i) a solid set of theoretical skills in basic scientific disciplines; ii) broad competences in molecular biology, medicinal chemistry, and applicative technological and IT fields; iii) critical scientific evaluation skills and abilities in information and communication. The combination of these skills is aimed at training graduates capable of successfully facing the challenges posed by the growing needs of the universe of biologically active compounds (drugs, nutraceuticals, cosmeceuticals)…',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 27,
    programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33457',
    requirements: [
      // Biology HL or strong SL recommended
      { courses: ['BIO'], level: 'HL', grade: 5, critical: true },
      // Chemistry HL or strong SL recommended
      { courses: ['CHEM'], level: 'HL', grade: 5, critical: true },
      // Math at least SL
      { courses: ['MATH-AA', 'MATH-AI'], level: 'SL', grade: 4 },
      // Physics at SL
      { courses: ['PHYS'], level: 'SL', grade: 4 },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  },

  // ============================================
  // ENGINEERING PROGRAMS
  // ============================================
  {
    name: 'Sustainable Building Engineering',
    description:
      'The degree aims to provide the students with the knowledge and skills needed to ensure a sustainable future for both existing and new buildings. The main purpose of this degree is to update traditional civil engineering skills with a particular focus on sustainable development.',
    field: 'Engineering',
    degree: 'Bachelor of Science',
    duration: '3 years',
    minIBPoints: 36,
    programUrl: 'https://corsidilaurea.uniroma1.it/en/course/33482',
    requirements: [
      // Math HL strongly recommended for engineering
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 6, critical: true },
      // Physics HL strongly recommended for engineering
      { courses: ['PHYS'], level: 'HL', grade: 5, critical: true },
      // English requirement
      ...ENGLISH_REQUIREMENT
    ]
  }
]

async function seedSapienzaPrograms() {
  console.log('\n🎓 Seeding Sapienza University of Rome Programs\n')

  try {
    // 1. Find Sapienza University of Rome
    const sapienza = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'Sapienza University of Rome', mode: 'insensitive' } },
          { name: { equals: 'Sapienza Università di Roma', mode: 'insensitive' } },
          { name: { contains: 'Sapienza', mode: 'insensitive' } },
          { name: { contains: 'La Sapienza', mode: 'insensitive' } }
        ]
      }
    })

    if (!sapienza) {
      console.error('❌ Sapienza University of Rome not found in database.')
      console.error('   Please create the university first.')
      process.exit(1)
    }

    console.log(`✅ Found Sapienza University of Rome (ID: ${sapienza.id})\n`)

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
          universityId: sapienza.id
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
              universityId: sapienza.id,
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
    console.error('\n❌ Error seeding Sapienza programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedSapienzaPrograms()
