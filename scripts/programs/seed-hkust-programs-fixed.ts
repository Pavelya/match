/**
 * Seed HKUST Programs to Database (Fixed)
 *
 * Adds failed undergraduate programs for HKUST with corrected fields.
 *
 * Run with: npx tsx scripts/programs/seed-hkust-programs-fixed.ts
 */

import { PrismaClient, CourseLevel } from '@prisma/client'

const prisma = new PrismaClient()

interface RequirementDef {
  courses: string[]
  level: CourseLevel
  grade: number
  critical?: boolean
  orGroup?: string
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
  {
    name: 'BSc in Environmental Management and Technology',
    description:
      'Sustainability is of paramount importance for the well-being of current and future generations. It is a global challenge that requires the attention and action of every organization. The BSc in Environmental Management and Technology (EVMT) program is at the forefront of tackling the pressing global concerns related to environmental and sustainability issues. This program offers motivated students a unique opportunity to become environmental and sustainability professionals equipped with cross-disciplinary knowledge to develop and implement ecologically and economically sound solutions. Graduates of the program are prepared to take on the role of sustainability managers and environmental professionals in corporations both in Hong Kong and around the globe.',
    field: 'Environmental Studies', // Fixed from 'Sciences'
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://join.hkust.edu.hk/our-programs/academy-of-interdisciplinary-studies/environmental-management-and-technology',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }]
  },
  {
    name: 'BSc in Data Science and Technology',
    description:
      'The Data Science and Technology (DSCT) program is jointly offered by the School of Science and the School of Engineering. Various business and industry sectors have a huge demand for data specialists/scientists to conduct an in-depth analysis of the valuable datasets collected during the business process. Data Science and Technology graduates are a perfect fit for these emerging job opportunities in the market. The program will equip students with various mathematical tools, data analytical skills and IT technologies to make sense of data obtained from various sources. DSCT students use a wide spectrum of mathematical and IT tools to develop basic knowledge of data analysis and programming skills that will allow them to understand and analyze actual phenomena of massive data obtained from rich information sources. Additionally, students will receive hands-on experience and expert guidance to acquire practical skills in data analysis that will provide them with an excellent step in their future.',
    field: 'Computer Science', // Fixed from 'Sciences'
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://join.hkust.edu.hk/our-programs/joint-school-program/data-science-and-technology',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
      { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      {
        courses: ['PHYS', 'CHEM', 'BIO', 'CS'],
        level: 'SL',
        grade: 4,
        critical: true
      }
    ]
  },
  {
    name: 'BSc in Data Analytics and Artificial Intelligence in Science',
    description:
      'In this big data era, an enormous amount of data is continuously generated and obtained in almost every science, technology, and social science field. Data Analytics and Artificial Intelligence in Science (DASC) is a major program designed for science students who want to learn data analysis skills and practice them in various science disciplines. The curriculum starts with basic training in programming and computational methods, as well as analytic methods and statistics, data visualization, machine learning and artificial intelligence skills. Students will then declare one of the following study tracks at the start of Year 3 to practise and sharpen their skills.',
    field: 'Natural Sciences', // Fixed from 'Sciences'
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 35,
    programUrl:
      'https://join.hkust.edu.hk/our-programs/school-of-science/data-analytics-and-artificial-intelligence-in-science',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
      {
        courses: ['PHYS', 'PHYS', 'MATH-AA', 'MATH-AA', 'MATH-AI'],
        level: 'SL',
        grade: 4,
        critical: true
      }
    ]
  },
  {
    name: 'BSc in Chemistry',
    description:
      'Students of BSc in Chemistry will study all aspects of chemistry and related disciplines. General areas covered include analytical chemistry, inorganic chemistry, organic chemistry, and physical chemistry. Specialized areas include environmental chemistry, medicinal chemistry, biological chemistry, polymer chemistry, materials chemistry including nanostructures, instrumentation, forensic science, food safety, and computational / theoretical chemistry. This program provides excellent training in both analytical thinking and problem-solving skills. The curriculum, which includes basic training in analytical, inorganic, organic, and physical chemistry and modern laboratory techniques and skills, has been specifically designed to allow students maximum flexibility in determining the extent of their specializations.',
    field: 'Natural Sciences', // Fixed from 'Sciences'
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://join.hkust.edu.hk/our-programs/school-of-science/chemistry',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
      {
        courses: ['PHYS', 'PHYS', 'CHEM', 'CHEM', 'BIO', 'BIO', 'MATH-AA', 'MATH-AA', 'MATH-AI'],
        level: 'SL',
        grade: 4,
        critical: true
      }
    ]
  },
  {
    name: 'Business with Extended Major in Artificial Intelligence / Digital Media and Creative Arts / Sustainability',
    description:
      'Talents with the ability to integrate knowledge from multiple disciplines, digital and transferable skills, and agility are in high demand in the technologically connected and driven business world. In addition to the traditional double major and/or minor approach, the flexible credit-based curriculum at the School of Business and Management allows motivated students to take additional credit. This way, students can pursue an Extended Major in addition to their business studies and complete the entire program within the 4-year time frame. Students are not required to decide whether they want to pursue an Extended Major at the time of admission. Instead, they have the autonomy to discover their academic interests and strengths at their own pace and to apply for an Extended Major at the end of the third semester （i.e., in the fall term of Year 2）. Students from the selected business majors, regardless of their admission route （school-based or program-based）, are eligible for an Extended major if they meet the major requirements. Please scroll down for the selected business majors list.',
    field: 'Business & Economics', // Fixed from 'Business'
    degree: 'Bachelor of Business Administration',
    duration: '4 years',
    minIBPoints: 36,
    programUrl:
      'https://join.hkust.edu.hk/our-programs/school-of-business-and-management/business-with-an-extended-major-in-ai-dmca',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
      { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true }
    ]
  },
  {
    name: 'BSc in Biotechnology and Business',
    description:
      'The Biotechnology and Business Program (BIBU) is jointly offered by the School of Science and the School of Business and Management. It aims to groom students with a hybrid interest in both biotechnology applications and business operations. It offers students a broad-based learning experience that encompasses essential life science and biotechnology knowledge, as well as complementary business know-how, including accounting, finance, economics, marketing, operations management. It also enhances students’ creative and critical thinking abilities while helping them develop a global outlook on biotechnology development and applications, thereby laying a solid foundation of knowledge and skills to develop, manage, and market biotechnology initiatives.',
    field: 'Natural Sciences', // Fixed from 'Sciences'
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://join.hkust.edu.hk/our-programs/joint-school-program/biotechnology-and-business',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
      { courses: ['MATH-AA', 'MATH-AA', 'MATH-AI'], level: 'SL', grade: 4, critical: true },
      {
        courses: ['BIO', 'BIO', 'CHEM', 'CHEM'],
        level: 'SL',
        grade: 4,
        critical: true
      }
    ]
  },
  {
    name: 'BSc in Biotechnology',
    description:
      'The Biotechnology (BIOT) program is designed to cover the research and development of biotechnology products and services, including medicines, cosmetics, health supplements and genetic diagnostics. The program provides students with theoretical and practical knowledge of the latest biotechnological developments, with a particular focus on the applied aspects of life science. The curriculum also requires a basic understanding of concepts across various biological spectra including biochemistry, cell biology, molecular biology, microbiology and genetics.',
    field: 'Natural Sciences', // Fixed from 'Sciences'
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl: 'https://join.hkust.edu.hk/our-programs/school-of-science/biotechnology',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
      {
        courses: ['PHYS', 'PHYS', 'CHEM', 'CHEM', 'BIO', 'BIO', 'MATH-AA', 'MATH-AA', 'MATH-AI'],
        level: 'SL',
        grade: 4,
        critical: true
      }
    ]
  },
  {
    name: 'BSc in Biomedical and Health Sciences',
    description:
      'Students will study the scientific principles of different aspects of the biomedical and health sciences. This program provides exposure to advanced diagnostic and disease modeling technologies including the use of omics technologies, computational analytical pipelines and the generation of experimental models for accelerated drug or treatment discoveries in a pre-clinical setting. The early curriculum is broad-based, covering both theoretical and practical aspects of biomedical science. The integration of foundational knowledge is achieved through inquiry-based experiential learning courses that emphasize teamwork and individualized capstone projects in the final year.',
    field: 'Medicine & Health', // Fixed from 'Sciences'
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://join.hkust.edu.hk/our-programs/school-of-science/biomedical-and-health-sciences',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
      {
        courses: ['PHYS', 'PHYS', 'CHEM', 'CHEM', 'BIO', 'BIO', 'MATH-AA', 'MATH-AA', 'MATH-AI'],
        level: 'SL',
        grade: 4,
        critical: true
      }
    ]
  },
  {
    name: 'BSc in Biochemistry and Cell Biology',
    description:
      'Students will study how living organisms are built upon the complex interplay of biological pathways. An emphasis is placed on knowledge gained through research on cell-free experimental systems (Biochemistry) and within cells (Cell Biology). The early curriculum is broad-based and teaches students the fundamental concepts and principles of Biochemistry and Cell Biology. This will enable students to explore and develop their own interests in various aspects of modern molecular life sciences. As they progress through the program, they will take more advanced and specialized elective courses. BCB students will also have the option of engaging in intensive practical training and research opportunities.',
    field: 'Natural Sciences', // Fixed from 'Sciences'
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 37,
    programUrl:
      'https://join.hkust.edu.hk/our-programs/school-of-science/biochemistry-and-cell-biology',
    requirements: [
      { courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true },
      {
        courses: ['PHYS', 'PHYS', 'CHEM', 'CHEM', 'BIO', 'BIO', 'MATH-AA', 'MATH-AA', 'MATH-AI'],
        level: 'SL',
        grade: 4,
        critical: true
      }
    ]
  },
  {
    name: 'BSc in Individualized Interdisciplinary Major',
    description:
      'The Individualized Interdisciplinary Major (IIM) offers a non-traditional, cross-school academic pathway for exceptional students with the vision, talent, and character to create their own study program. IIM students have the academic freedom to combine courses from different departments and Schools at HKUST to develop an interdisciplinary major that is tailor-made to their intellectual interests. Students should get admitted to one of the Schools in HKUST first, and enroll in IIM in their second year.',
    field: 'Natural Sciences', // Fixed from 'Interdisciplinary' - assigning Natural Sciences as a default for BSc
    degree: 'Bachelor of Science',
    duration: '4 years',
    minIBPoints: 34,
    programUrl:
      'https://join.hkust.edu.hk/our-programs/academy-of-interdisciplinary-studies/individualized-interdisciplinary-major',
    requirements: [{ courses: ['ENG-LIT', 'ENG-LL'], level: 'SL', grade: 4, critical: true }]
  }
]

async function seedHKUSTPrograms() {
  console.log('\n🎓 Seeding HKUST Programs (Fixed)\n')

  try {
    const university = await prisma.university.findFirst({
      where: {
        OR: [
          {
            name: {
              contains: 'Hong Kong University of Science and Technology',
              mode: 'insensitive'
            }
          },
          { name: { contains: 'HKUST', mode: 'insensitive' } }
        ]
      }
    })

    if (!university) {
      console.error('❌ HKUST University not found in database.')
      process.exit(1)
    }

    console.log(`✅ Found university: ${university.name} (${university.id})\n`)

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

      const existing = await prisma.academicProgram.findFirst({
        where: {
          name: programDef.name,
          universityId: university.id
        }
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
              universityId: university.id,
              fieldOfStudyId: fieldId,
              degreeType: programDef.degree,
              duration: programDef.duration,
              minIBPoints: programDef.minIBPoints,
              programUrl: programDef.programUrl,
              requirementsVerified: true,
              requirementsUpdatedAt: new Date()
            }
          })

          const orGroupMap = new Map<string, string>()

          for (const req of programDef.requirements) {
            let orGroupId: string | null = null

            if (req.orGroup) {
              if (!orGroupMap.has(req.orGroup)) {
                orGroupMap.set(req.orGroup, crypto.randomUUID())
              }
              orGroupId = orGroupMap.get(req.orGroup)!
            } else if (req.courses.length > 1) {
              orGroupId = crypto.randomUUID()
            }

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

    console.log('\n' + '─'.repeat(50))
    console.log('\n📊 Summary:')
    console.log(`   ✅ Created: ${successCount} programs`)
    console.log(`   ⏭️  Skipped: ${skipCount} programs (already exist)`)
    console.log(`   ❌ Failed: ${failCount} programs`)

    if (successCount > 0) {
      console.log('\n📡 Programs will automatically sync to Algolia via Prisma middleware.\n')
    }

    console.log('🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error seeding HKUST programs:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedHKUSTPrograms()
