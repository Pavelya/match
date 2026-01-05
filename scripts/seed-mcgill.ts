/**
 * Seed McGill University to Database
 *
 * Adds McGill University with official information from mcgill.ca
 * The university will NOT automatically sync to Algolia since it has no programs yet.
 * Programs will sync to Algolia when they are added.
 *
 * Run with: npx tsx scripts/seed-mcgill.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedMcGill() {
  console.log('\n🏛️  Seeding McGill University\n')

  try {
    // Get Canada country ID
    const canada = await prisma.country.findUnique({
      where: { code: 'CA' }
    })

    if (!canada) {
      console.error('❌ Canada country not found in database. Run: npx prisma db seed first')
      process.exit(1)
    }

    console.log(`✅ Found Canada country (ID: ${canada.id})`)

    // Check if McGill already exists
    const existingMcGill = await prisma.university.findFirst({
      where: {
        name: {
          equals: 'McGill University',
          mode: 'insensitive'
        }
      }
    })

    if (existingMcGill) {
      console.log(`⚠️  McGill University already exists (ID: ${existingMcGill.id})`)
      console.log('   Updating with latest information...')

      const updated = await prisma.university.update({
        where: { id: existingMcGill.id },
        data: {
          abbreviatedName: 'McGill',
          description:
            "McGill University is one of Canada's best-known institutions of higher learning and one of the leading universities in the world. Founded in 1821, McGill is a public research university located in Montreal, Quebec, at the foot of Mount Royal. International students from more than 150 countries make up nearly 30% of McGill's student body – the highest proportion of any Canadian research university. McGill is recognized around the world for excellence in teaching and research, with a long tradition of innovation including Ernest Rutherford's Nobel Prize-winning research on the nature of radioactivity. The prestigious Rhodes Scholarship has gone to a nation-leading 149 McGill students.",
          city: 'Montreal',
          classification: 'PUBLIC',
          studentPopulation: 40000,
          websiteUrl: 'https://www.mcgill.ca',
          email: 'admissions@mcgill.ca',
          phone: '+1 514-398-3000'
        },
        include: {
          country: true
        }
      })

      console.log('✅ Updated McGill University')
      console.log(`   ID: ${updated.id}`)
      console.log(`   Name: ${updated.name}`)
      console.log(`   Location: ${updated.city}, ${updated.country.name}`)
      console.log(`   Classification: ${updated.classification}`)
      console.log(`   Students: ${updated.studentPopulation?.toLocaleString()}`)
      console.log(`   Website: ${updated.websiteUrl}`)
      console.log(`   Email: ${updated.email}`)
      console.log(`   Phone: ${updated.phone}`)
    } else {
      // Create McGill University with official information from mcgill.ca
      const mcgill = await prisma.university.create({
        data: {
          name: 'McGill University',
          abbreviatedName: 'McGill',
          description:
            "McGill University is one of Canada's best-known institutions of higher learning and one of the leading universities in the world. Founded in 1821, McGill is a public research university located in Montreal, Quebec, at the foot of Mount Royal. International students from more than 150 countries make up nearly 30% of McGill's student body – the highest proportion of any Canadian research university. McGill is recognized around the world for excellence in teaching and research, with a long tradition of innovation including Ernest Rutherford's Nobel Prize-winning research on the nature of radioactivity. The prestigious Rhodes Scholarship has gone to a nation-leading 149 McGill students.",
          countryId: canada.id,
          city: 'Montreal',
          classification: 'PUBLIC',
          studentPopulation: 40000,
          // Skip logo and image as per user request
          logo: null,
          image: null,
          websiteUrl: 'https://www.mcgill.ca',
          email: 'admissions@mcgill.ca',
          phone: '+1 514-398-3000'
        },
        include: {
          country: true
        }
      })

      console.log('✅ Created McGill University')
      console.log(`   ID: ${mcgill.id}`)
      console.log(`   Name: ${mcgill.name}`)
      console.log(`   Abbreviated: ${mcgill.abbreviatedName}`)
      console.log(`   Location: ${mcgill.city}, ${mcgill.country.name}`)
      console.log(`   Classification: ${mcgill.classification}`)
      console.log(`   Students: ${mcgill.studentPopulation?.toLocaleString()}`)
      console.log(`   Website: ${mcgill.websiteUrl}`)
      console.log(`   Email: ${mcgill.email}`)
      console.log(`   Phone: ${mcgill.phone}`)
    }

    console.log('\n📊 Note: McGill University has been added to the database.')
    console.log('   Algolia sync will happen automatically when programs are added.')
    console.log('   You can add an image later via the admin panel.\n')

    console.log('🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error seeding McGill University:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedMcGill()
