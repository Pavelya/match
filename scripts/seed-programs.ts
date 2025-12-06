/**
 * Seed Sample Programs to Database
 *
 * Seeds 20 sample university programs which will automatically sync to Algolia
 * via the Prisma extension.
 *
 * Run with: npx tsx scripts/seed-programs.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedPrograms() {
  console.log('\n🌱 Seeding Sample Programs\n')

  try {
    // Get reference data
    const countries = await prisma.country.findMany()
    const fields = await prisma.fieldOfStudy.findMany()
    const courses = await prisma.iBCourse.findMany()

    if (countries.length === 0 || fields.length === 0 || courses.length === 0) {
      console.error('❌ Missing reference data. Run: npx prisma db seed first')
      process.exit(1)
    }

    console.log(
      `Found ${countries.length} countries, ${fields.length} fields, ${courses.length} courses\n`
    )

    // Helper to get random item
    const random = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

    // Create sample universities
    const universities = [
      {
        name: 'Harvard University',
        country: countries.find((c) => c.code === 'US')!,
        city: 'Cambridge',
        classification: 'PRIVATE' as const
      },
      {
        name: 'University of Oxford',
        country: countries.find((c) => c.code === 'GB')!,
        city: 'Oxford',
        classification: 'PUBLIC' as const
      },
      {
        name: 'University of Toronto',
        country: countries.find((c) => c.code === 'CA')!,
        city: 'Toronto',
        classification: 'PUBLIC' as const
      },
      {
        name: 'Australian National University',
        country: countries.find((c) => c.code === 'AU')!,
        city: 'Canberra',
        classification: 'PUBLIC' as const
      },
      {
        name: 'ETH Zurich',
        country: countries.find((c) => c.code === 'CH')!,
        city: 'Zurich',
        classification: 'PUBLIC' as const
      }
    ]

    console.log('1️⃣  Creating universities...')
    const createdUniversities = []
    for (const uni of universities) {
      // Check if exists first
      let created = await prisma.university.findFirst({
        where: { name: uni.name }
      })

      if (!created) {
        created = await prisma.university.create({
          data: {
            name: uni.name,
            description: 'Top-ranked university known for excellence in research and teaching.',
            countryId: uni.country.id,
            city: uni.city,
            classification: uni.classification,
            websiteUrl: `https://${uni.name.toLowerCase().replace(/\s+/g, '')}.edu`,
            studentPopulation: Math.floor(Math.random() * 30000) + 10000
          }
        })
      }
      createdUniversities.push(created)
      console.log(`   ✅ ${created.name}`)
    }

    console.log('\n2️⃣  Creating 20 sample programs...\n')

    const programTemplates = [
      {
        name: 'Computer Science',
        field: 'Computer Science',
        degree: 'Bachelor of Science',
        duration: '4 years',
        points: 38
      },
      {
        name: 'Business Administration',
        field: 'Business & Economics',
        degree: 'Bachelor of Business',
        duration: '3 years',
        points: 35
      },
      {
        name: 'Medicine',
        field: 'Medicine & Health',
        degree: 'Doctor of Medicine',
        duration: '6 years',
        points: 42
      },
      {
        name: 'Engineering',
        field: 'Engineering',
        degree: 'Bachelor of Engineering',
        duration: '4 years',
        points: 38
      },
      { name: 'Law', field: 'Law', degree: 'Bachelor of Laws', duration: '3 years', points: 36 },
      {
        name: 'Economics',
        field: 'Business & Economics',
        degree: 'Bachelor of Economics',
        duration: '3 years',
        points: 34
      },
      {
        name: 'Physics',
        field: 'Natural Sciences',
        degree: 'Bachelor of Science',
        duration: '3 years',
        points: 37
      },
      {
        name: 'Mathematics',
        field: 'Natural Sciences',
        degree: 'Bachelor of Science',
        duration: '3 years',
        points: 36
      },
      {
        name: 'Psychology',
        field: 'Social Sciences',
        degree: 'Bachelor of Arts',
        duration: '3 years',
        points: 33
      },
      {
        name: 'Mechanical Engineering',
        field: 'Engineering',
        degree: 'Bachelor of Engineering',
        duration: '4 years',
        points: 37
      },
      {
        name: 'Electrical Engineering',
        field: 'Engineering',
        degree: 'Bachelor of Engineering',
        duration: '4 years',
        points: 37
      },
      {
        name: 'Chemistry',
        field: 'Natural Sciences',
        degree: 'Bachelor of Science',
        duration: '3 years',
        points: 36
      },
      {
        name: 'International Business',
        field: 'Business & Economics',
        degree: 'Bachelor of Business',
        duration: '4 years',
        points: 35
      },
      {
        name: 'Philosophy',
        field: 'Arts & Humanities',
        degree: 'Bachelor of Arts',
        duration: '3 years',
        points: 32
      },
      {
        name: 'History',
        field: 'Arts & Humanities',
        degree: 'Bachelor of Arts',
        duration: '3 years',
        points: 32
      },
      {
        name: 'Biology',
        field: 'Natural Sciences',
        degree: 'Bachelor of Science',
        duration: '3 years',
        points: 35
      },
      {
        name: 'Finance',
        field: 'Business & Economics',
        degree: 'Bachelor of Commerce',
        duration: '3 years',
        points: 36
      },
      {
        name: 'Political Science',
        field: 'Social Sciences',
        degree: 'Bachelor of Arts',
        duration: '3 years',
        points: 33
      },
      {
        name: 'Architecture',
        field: 'Engineering',
        degree: 'Bachelor of Architecture',
        duration: '5 years',
        points: 36
      },
      {
        name: 'Nursing',
        field: 'Medicine & Health',
        degree: 'Bachelor of Nursing',
        duration: '4 years',
        points: 34
      }
    ]

    let successCount = 0
    let failCount = 0

    for (const template of programTemplates) {
      const university = random(createdUniversities)
      const field = fields.find((f) => f.name === template.field) || random(fields)

      try {
        const program = await prisma.academicProgram.create({
          data: {
            name: template.name,
            description: `Comprehensive ${template.name} program offering excellent education and career prospects.`,
            universityId: university.id,
            fieldOfStudyId: field.id,
            degreeType: template.degree,
            duration: template.duration,
            minIBPoints: template.points,
            programUrl: `${university.websiteUrl}/programs/${template.name.toLowerCase().replace(/\s+/g, '-')}`
          }
        })

        console.log(`   ✅ ${program.name} at ${university.name} (${template.points} points)`)
        successCount++
      } catch (error) {
        console.error(`   ❌ Failed to create ${template.name}:`, error)
        failCount++
      }
    }

    console.log(`\n✅ Successfully created ${successCount} programs`)
    if (failCount > 0) {
      console.log(`❌ Failed to create ${failCount} programs`)
    }

    console.log('\n📊 Verifying Algolia sync...')
    console.log('   Programs will automatically sync to Algolia via Prisma extension')
    console.log('   Check Algolia dashboard to confirm sync\n')

    console.log('🎉 Seeding complete!\n')
  } catch (error) {
    console.error('\n❌ Seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedPrograms()
