/**
 * Seed University of Waterloo to Database
 *
 * Adds University of Waterloo with official information from uwaterloo.ca
 * The university will NOT automatically sync to Algolia since it has no programs yet.
 * Programs will sync to Algolia when they are added.
 *
 * Run with: npx tsx scripts/seed-waterloo.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedWaterloo() {
  console.log('\n🏛️  Seeding University of Waterloo\n')

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

    // Check if Waterloo already exists
    const existingWaterloo = await prisma.university.findFirst({
      where: {
        name: {
          equals: 'University of Waterloo',
          mode: 'insensitive'
        }
      }
    })

    if (existingWaterloo) {
      console.log(`⚠️  University of Waterloo already exists (ID: ${existingWaterloo.id})`)
      console.log('   Updating with latest information...')

      const updated = await prisma.university.update({
        where: { id: existingWaterloo.id },
        data: {
          abbreviatedName: 'Waterloo',
          description:
            "The University of Waterloo is a leading global research-intensive university, renowned for entrepreneurship and innovation. Founded in 1957 with co-operative education as its cornerstone, Waterloo opened its doors to 74 engineering students and has grown to welcome more than 42,000 students annually. Waterloo is #1 in Canada for experiential learning and employer-student connections, with a global network spanning more than 261,000 alumni in 152 countries. The university leads in providing work-integrated learning opportunities with 8,000+ active co-op employers and fosters an entrepreneurial spirit that has created 5,000+ jobs through Velocity alone, Canada's most productive startup incubator by private investment.",
          city: 'Waterloo',
          classification: 'PUBLIC',
          studentPopulation: 42000,
          websiteUrl: 'https://uwaterloo.ca',
          email: 'askus@uwaterloo.ca',
          phone: '+1 519-888-4567'
        },
        include: {
          country: true
        }
      })

      console.log('✅ Updated University of Waterloo')
      console.log(`   ID: ${updated.id}`)
      console.log(`   Name: ${updated.name}`)
      console.log(`   Location: ${updated.city}, ${updated.country.name}`)
      console.log(`   Classification: ${updated.classification}`)
      console.log(`   Students: ${updated.studentPopulation?.toLocaleString()}`)
      console.log(`   Website: ${updated.websiteUrl}`)
      console.log(`   Email: ${updated.email}`)
      console.log(`   Phone: ${updated.phone}`)
    } else {
      // Create University of Waterloo with official information from uwaterloo.ca
      const waterloo = await prisma.university.create({
        data: {
          name: 'University of Waterloo',
          abbreviatedName: 'Waterloo',
          description:
            "The University of Waterloo is a leading global research-intensive university, renowned for entrepreneurship and innovation. Founded in 1957 with co-operative education as its cornerstone, Waterloo opened its doors to 74 engineering students and has grown to welcome more than 42,000 students annually. Waterloo is #1 in Canada for experiential learning and employer-student connections, with a global network spanning more than 261,000 alumni in 152 countries. The university leads in providing work-integrated learning opportunities with 8,000+ active co-op employers and fosters an entrepreneurial spirit that has created 5,000+ jobs through Velocity alone, Canada's most productive startup incubator by private investment.",
          countryId: canada.id,
          city: 'Waterloo',
          classification: 'PUBLIC',
          studentPopulation: 42000,
          // Skip logo and image as per user request
          logo: null,
          image: null,
          websiteUrl: 'https://uwaterloo.ca',
          email: 'askus@uwaterloo.ca',
          phone: '+1 519-888-4567'
        },
        include: {
          country: true
        }
      })

      console.log('✅ Created University of Waterloo')
      console.log(`   ID: ${waterloo.id}`)
      console.log(`   Name: ${waterloo.name}`)
      console.log(`   Abbreviated: ${waterloo.abbreviatedName}`)
      console.log(`   Location: ${waterloo.city}, ${waterloo.country.name}`)
      console.log(`   Classification: ${waterloo.classification}`)
      console.log(`   Students: ${waterloo.studentPopulation?.toLocaleString()}`)
      console.log(`   Website: ${waterloo.websiteUrl}`)
      console.log(`   Email: ${waterloo.email}`)
      console.log(`   Phone: ${waterloo.phone}`)
    }

    console.log('\n📊 Note: University of Waterloo has been added to the database.')
    console.log('   Algolia sync will happen automatically when programs are added.')
    console.log('   You can add an image later via the admin panel.\n')

    console.log('🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error seeding University of Waterloo:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedWaterloo()
