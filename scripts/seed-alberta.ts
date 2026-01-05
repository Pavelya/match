/**
 * Seed University of Alberta to Database
 *
 * Adds University of Alberta with official information from ualberta.ca
 * The university will NOT automatically sync to Algolia since it has no programs yet.
 * Programs will sync to Algolia when they are added.
 *
 * Run with: npx tsx scripts/seed-alberta.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedAlberta() {
  console.log('\n🏛️  Seeding University of Alberta\n')

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

    // Check if UAlberta already exists
    const existingAlberta = await prisma.university.findFirst({
      where: {
        name: {
          equals: 'University of Alberta',
          mode: 'insensitive'
        }
      }
    })

    if (existingAlberta) {
      console.log(`⚠️  University of Alberta already exists (ID: ${existingAlberta.id})`)
      console.log('   Updating with latest information...')

      const updated = await prisma.university.update({
        where: { id: existingAlberta.id },
        data: {
          abbreviatedName: 'UAlberta',
          description:
            "The University of Alberta is a public research university founded in 1908, located in Edmonton, Alberta, Canada. As Canada's 5th largest university with approximately 46,000 students from 159 countries, it offers around 200 undergraduate and over 500 graduate programs across 18 faculties. The university is a member of the U15 association of prominent Canadian research universities and consistently ranks among the top five in Canada for sponsored research funding. U of A is recognized as a world leader in artificial intelligence research, ranking #1 in Canada for AI. The university has produced 72 Rhodes Scholars and 3 Nobel Prize winners, and its professors have won more 3M Teaching Fellowships than any other Canadian university.",
          city: 'Edmonton',
          classification: 'PUBLIC',
          studentPopulation: 46000,
          websiteUrl: 'https://www.ualberta.ca',
          email: 'welcome@ualberta.ca',
          phone: '+1 780-492-3111'
        },
        include: {
          country: true
        }
      })

      console.log('✅ Updated University of Alberta')
      console.log(`   ID: ${updated.id}`)
      console.log(`   Name: ${updated.name}`)
      console.log(`   Location: ${updated.city}, ${updated.country.name}`)
      console.log(`   Classification: ${updated.classification}`)
      console.log(`   Students: ${updated.studentPopulation?.toLocaleString()}`)
      console.log(`   Website: ${updated.websiteUrl}`)
      console.log(`   Email: ${updated.email}`)
      console.log(`   Phone: ${updated.phone}`)
    } else {
      // Create University of Alberta with official information from ualberta.ca
      const alberta = await prisma.university.create({
        data: {
          name: 'University of Alberta',
          abbreviatedName: 'UAlberta',
          description:
            "The University of Alberta is a public research university founded in 1908, located in Edmonton, Alberta, Canada. As Canada's 5th largest university with approximately 46,000 students from 159 countries, it offers around 200 undergraduate and over 500 graduate programs across 18 faculties. The university is a member of the U15 association of prominent Canadian research universities and consistently ranks among the top five in Canada for sponsored research funding. U of A is recognized as a world leader in artificial intelligence research, ranking #1 in Canada for AI. The university has produced 72 Rhodes Scholars and 3 Nobel Prize winners, and its professors have won more 3M Teaching Fellowships than any other Canadian university.",
          countryId: canada.id,
          city: 'Edmonton',
          classification: 'PUBLIC',
          studentPopulation: 46000,
          // Skip logo and image as per user request
          logo: null,
          image: null,
          websiteUrl: 'https://www.ualberta.ca',
          email: 'welcome@ualberta.ca',
          phone: '+1 780-492-3111'
        },
        include: {
          country: true
        }
      })

      console.log('✅ Created University of Alberta')
      console.log(`   ID: ${alberta.id}`)
      console.log(`   Name: ${alberta.name}`)
      console.log(`   Abbreviated: ${alberta.abbreviatedName}`)
      console.log(`   Location: ${alberta.city}, ${alberta.country.name}`)
      console.log(`   Classification: ${alberta.classification}`)
      console.log(`   Students: ${alberta.studentPopulation?.toLocaleString()}`)
      console.log(`   Website: ${alberta.websiteUrl}`)
      console.log(`   Email: ${alberta.email}`)
      console.log(`   Phone: ${alberta.phone}`)
    }

    console.log('\n📊 Note: University of Alberta has been added to the database.')
    console.log('   Algolia sync will happen automatically when programs are added.')
    console.log('   You can add an image later via the admin panel.\n')

    console.log('🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error seeding University of Alberta:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedAlberta()
