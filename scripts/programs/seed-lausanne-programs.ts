/**
 * Seed University of Lausanne (UNIL) Programs to Database
 *
 * Adds undergraduate programs for University of Lausanne with IB requirements.
 * Programs will automatically sync to Algolia via the Prisma extension.
 *
 * IB Requirements Source: swissuniversities (2026/27)
 * All Lausanne programs share the same baseline: 32/42 points, 3 HL with math/science.
 * All descriptions extracted directly from UNIL website.
 *
 * Prerequisites: Switzerland (CH) must exist in the database.
 *
 * Run with: npx tsx scripts/programs/seed-lausanne-programs.ts
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
  // NATURAL SCIENCES
  // ============================================
  {
    name: 'Biology',
    description:
      'This program provides a broad view of biology, from molecular levels to entire ecosystems. It emphasizes practical work, which becomes increasingly integrated with research laboratories as studies progress. Students acquire the knowledge and methodological skills needed to understand living organisms at all scales.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (BSc)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/biologie.html',
    requirements: [
      {
        courses: ['MATH-AA', 'MATH-AI', 'BIO', 'CHEM', 'PHYS'],
        level: 'HL',
        grade: 5,
        critical: true
      },
      { courses: ['BIO'], level: 'SL', grade: 4 },
      { courses: ['CHEM', 'PHYS'], level: 'SL', grade: 4 }
    ]
  },

  // ============================================
  // MEDICINE & HEALTH
  // ============================================
  {
    name: 'Medicine',
    description:
      "The medical course is a six-year path divided into Bachelor's and Master's stages. The first two years cover basic scientific disciplines such as chemistry, physics, and histology. The third year shifts toward clinical management of frequent illnesses. Admission is competitive with limited places.",
    field: 'Medicine & Health',
    degree: 'Bachelor of Medicine (BMed)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/medecine.html',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },
  {
    name: 'Pharmaceutical Sciences',
    description:
      'The Bachelor of Science in Pharmaceutical Sciences provides foundational training in chemistry, biology, and pharmacology. Only the first year is taught at UNIL; after passing first-year examinations, students typically continue their studies at the University of Geneva, ETH Zurich, or the University of Basel.',
    field: 'Medicine & Health',
    degree: 'Bachelor of Science (BSc)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl:
      'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/sciences-pharmaceutiques.html',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'HL', grade: 5, critical: true }
    ]
  },

  // ============================================
  // LAW
  // ============================================
  {
    name: 'Law',
    description:
      'This program focuses on Swiss positive law (private, public, criminal, etc.) and its interactions with international and European law. It also develops analytical skills through the perspectives of history, philosophy, and sociology of law, preparing students for a wide range of legal careers.',
    field: 'Law',
    degree: 'Bachelor of Law (BLaw)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/droit.html',
    requirements: [
      {
        courses: ['MATH-AA', 'MATH-AI', 'BIO', 'CHEM', 'PHYS'],
        level: 'HL',
        grade: 5,
        critical: true
      }
    ]
  },
  {
    name: 'Forensic Science',
    description:
      'A complex, interdisciplinary scientific program integrating exact sciences (physics, mathematics, chemistry) with humanities (criminology, criminal law) and engineering. Forensic Science is one of the specialized flagship programs of UNIL, training students to apply scientific methods to legal investigations.',
    field: 'Natural Sciences',
    degree: 'Bachelor of Science (BSc)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl:
      'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/science-forensique.html',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['BIO', 'CHEM', 'PHYS'], level: 'SL', grade: 4 }
    ]
  },

  // ============================================
  // ENVIRONMENTAL STUDIES
  // ============================================
  {
    name: 'Geosciences and Environment',
    description:
      "After a common first year, students choose one of three paths: Environmental Sciences (interdisciplinary sustainability), Geography (society-environment interface), or Geology (Earth's physical and chemical processes). The program combines fieldwork with laboratory and computational approaches.",
    field: 'Environmental Studies',
    degree: 'Bachelor of Science (BSc)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl:
      'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/geosciences-et-environnement.html',
    requirements: [
      {
        courses: ['MATH-AA', 'MATH-AI', 'BIO', 'CHEM', 'PHYS'],
        level: 'HL',
        grade: 5,
        critical: true
      },
      { courses: ['GEOG'], level: 'SL', grade: 4 }
    ]
  },

  // ============================================
  // BUSINESS & ECONOMICS
  // ============================================
  {
    name: 'Management',
    description:
      'Offered by HEC Lausanne, this bilingual (French/English) program emphasizes a scientific and quantitative approach to management. It covers fields such as marketing, strategy, business analytics, and organizational behavior, combining theory with practical application.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science (BSc)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/management.html',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['ECON', 'BUS-MGMT'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Economics',
    description:
      'Also offered by HEC Lausanne as a bilingual program, it focuses on using rigorous scientific analyses to explore economic questions such as growth, international trade, macroeconomic policy, and resource allocation. Students develop strong quantitative and analytical skills.',
    field: 'Business & Economics',
    degree: 'Bachelor of Science (BSc)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/economie.html',
    requirements: [
      { courses: ['MATH-AA', 'MATH-AI'], level: 'HL', grade: 5, critical: true },
      { courses: ['ECON', 'BUS-MGMT'], level: 'SL', grade: 4 }
    ]
  },

  // ============================================
  // ARTS & HUMANITIES
  // ============================================
  {
    name: 'Arts',
    description:
      'The Faculty of Arts offers a wide range of disciplines, from historical studies to theoretical approaches in the humanities, including the study of ancient and modern languages. Courses cover currents of thought and cultural output, from literature and discourse to ancient civilisations, film, photography, music, and more.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (BA)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/lettres.html',
    requirements: [
      {
        courses: ['MATH-AA', 'MATH-AI', 'BIO', 'CHEM', 'PHYS'],
        level: 'HL',
        grade: 5,
        critical: true
      }
    ]
  },
  {
    name: 'Theology',
    description:
      'The main purpose of studying theology is to develop a detailed, critical understanding of fundamental Christian texts, the Christian tradition and various historical, philosophical, theological and ethical currents of thought, as well as contemporary expressions of Christianity.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Theology (BTh)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/theologie.html',
    requirements: [
      {
        courses: ['MATH-AA', 'MATH-AI', 'BIO', 'CHEM', 'PHYS'],
        level: 'HL',
        grade: 5,
        critical: true
      }
    ]
  },
  {
    name: 'Study of Religions',
    description:
      'The main aim of this programme is to develop precise and critical knowledge of the phenomenon of religion in general, and in particular the great religious traditions (Hinduism, Judaism, Christianity, Islam, etc.) as well as more marginal religious currents. The methods used are mainly those of the human and social sciences.',
    field: 'Arts & Humanities',
    degree: 'Bachelor of Arts (BA)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl:
      'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/sciences-des-religions.html',
    requirements: [
      {
        courses: ['MATH-AA', 'MATH-AI', 'BIO', 'CHEM', 'PHYS'],
        level: 'HL',
        grade: 5,
        critical: true
      }
    ]
  },

  // ============================================
  // SOCIAL SCIENCES
  // ============================================
  {
    name: 'Political Science',
    description:
      'The Bachelor of Arts in Political Science aims to provide solid training necessary for understanding political phenomena. Areas taught include history of political ideas, public policies, comparative political science, political sociology, international relations, and studies focused on developing countries.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts (BA)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl:
      'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/science-politique.html',
    requirements: [
      {
        courses: ['MATH-AA', 'MATH-AI', 'BIO', 'CHEM', 'PHYS'],
        level: 'HL',
        grade: 5,
        critical: true
      },
      { courses: ['HIST', 'ECON', 'GEOG', 'GLOB-POL'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Social Sciences',
    description:
      'The Bachelor of Arts in Social Sciences provides solid training necessary for understanding and analyzing social and cultural phenomena. The degree course follows a largely interdisciplinary approach and strives to explain both the general functioning of societies and their diversity.',
    field: 'Social Sciences',
    degree: 'Bachelor of Arts (BA)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl:
      'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/sciences-sociales.html',
    requirements: [
      {
        courses: ['MATH-AA', 'MATH-AI', 'BIO', 'CHEM', 'PHYS'],
        level: 'HL',
        grade: 5,
        critical: true
      }
    ]
  },
  {
    name: 'Psychology',
    description:
      'Psychology is the science of behaviour and mental processes, whether individual or social, taking various determinants (biological, contextual, social, cultural, etc.) into account. The course covers development, cognitive functions, psychopathology, health psychology, and behavioral neurosciences.',
    field: 'Social Sciences',
    degree: 'Bachelor of Science (BSc)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl: 'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/psychologie.html',
    requirements: [
      {
        courses: ['MATH-AA', 'MATH-AI', 'BIO', 'CHEM', 'PHYS'],
        level: 'HL',
        grade: 5,
        critical: true
      },
      { courses: ['PSYCH'], level: 'SL', grade: 4 }
    ]
  },
  {
    name: 'Human Movement and Sport Sciences',
    description:
      'This program comprises one main discipline (Major) and one secondary discipline (Minor). Human movement and sport sciences are naturally multifaceted, addressing phenomena that are not only biological but also physiological, psychological, social, historical, and economic. Admission requires passing a physical education exam.',
    field: 'Social Sciences',
    degree: 'Bachelor of Science (BSc)',
    duration: '3 years',
    minIBPoints: 32,
    programUrl:
      'https://www.unil.ch/unil/en/home/menuinst/etudier/bachelors/sciences-du-mouvement-et-du-sport.html',
    requirements: [
      {
        courses: ['MATH-AA', 'MATH-AI', 'BIO', 'CHEM', 'PHYS'],
        level: 'HL',
        grade: 5,
        critical: true
      },
      { courses: ['BIO', 'SEHS'], level: 'SL', grade: 4 }
    ]
  }
]

async function seedLausannePrograms() {
  console.log('\n🎓 Seeding University of Lausanne (UNIL) Programs\n')

  try {
    // 1. Find or create University of Lausanne
    let uni = await prisma.university.findFirst({
      where: {
        name: { contains: 'Lausanne', mode: 'insensitive' }
      }
    })

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
          name: 'University of Lausanne',
          description:
            'The University of Lausanne (UNIL) is a leading Swiss university located on the shores of Lake Geneva. Founded in 1537, it offers programmes across seven faculties with a strong emphasis on interdisciplinary research.',
          countryId: ch.id,
          city: 'Lausanne',
          classification: 'PUBLIC',
          websiteUrl: 'https://www.unil.ch',
          studentPopulation: 17000
        }
      })
      console.log(`✅ Created University of Lausanne (ID: ${uni.id})\n`)
    } else {
      console.log(`✅ Found University of Lausanne (ID: ${uni.id})\n`)
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
    console.error('\n❌ Error seeding Lausanne programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedLausannePrograms()
