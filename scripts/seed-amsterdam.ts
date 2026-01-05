/**
 * Seed University of Amsterdam (UvA) to Database
 *
 * Adds University of Amsterdam with official information from uva.nl
 * The university will NOT automatically sync to Algolia since it has no programs yet.
 * Programs will sync to Algolia when they are added.
 *
 * Run with: npx tsx scripts/seed-amsterdam.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedAmsterdam() {
  console.log('\n🏛️  Seeding University of Amsterdam (UvA)\n')

  try {
    // Get Netherlands country ID
    const netherlands = await prisma.country.findUnique({
      where: { code: 'NL' }
    })

    if (!netherlands) {
      console.error('❌ Netherlands country not found in database. Run: npx prisma db seed first')
      process.exit(1)
    }

    console.log(`✅ Found Netherlands country (ID: ${netherlands.id})`)

    // Check if UvA already exists
    const existingUvA = await prisma.university.findFirst({
      where: {
        name: {
          equals: 'University of Amsterdam',
          mode: 'insensitive'
        }
      }
    })

    if (existingUvA) {
      console.log(`⚠️  University of Amsterdam already exists (ID: ${existingUvA.id})`)
      console.log('   Updating with latest information...')

      const updated = await prisma.university.update({
        where: { id: existingUvA.id },
        data: {
          abbreviatedName: 'UvA',
          description:
            "The University of Amsterdam (UvA) is a public research university founded in 1632, making it one of the oldest universities in Europe. The UvA is ambitious, creative and committed: a leader in international science and a partner in innovation, inspiring generations for nearly 400 years. As a top-100 university globally and one of Europe's 20 best universities, UvA has approximately 44,000 students from over 100 countries studying across four campuses in Amsterdam. With nearly 3,000 researchers carrying out experimental and theoretical research, the UvA is a research-intensive institution where every student has the chance to participate in research themselves.",
          city: 'Amsterdam',
          classification: 'PUBLIC',
          studentPopulation: 44000,
          websiteUrl: 'https://www.uva.nl',
          email: 'studentenservice@uva.nl',
          phone: '+31 20 525 1401'
        },
        include: {
          country: true
        }
      })

      console.log('✅ Updated University of Amsterdam')
      console.log(`   ID: ${updated.id}`)
      console.log(`   Name: ${updated.name}`)
      console.log(`   Location: ${updated.city}, ${updated.country.name}`)
      console.log(`   Classification: ${updated.classification}`)
      console.log(`   Students: ${updated.studentPopulation?.toLocaleString()}`)
      console.log(`   Website: ${updated.websiteUrl}`)
      console.log(`   Email: ${updated.email}`)
      console.log(`   Phone: ${updated.phone}`)
    } else {
      // Create University of Amsterdam with official information from uva.nl
      const uva = await prisma.university.create({
        data: {
          name: 'University of Amsterdam',
          abbreviatedName: 'UvA',
          description:
            "The University of Amsterdam (UvA) is a public research university founded in 1632, making it one of the oldest universities in Europe. The UvA is ambitious, creative and committed: a leader in international science and a partner in innovation, inspiring generations for nearly 400 years. As a top-100 university globally and one of Europe's 20 best universities, UvA has approximately 44,000 students from over 100 countries studying across four campuses in Amsterdam. With nearly 3,000 researchers carrying out experimental and theoretical research, the UvA is a research-intensive institution where every student has the chance to participate in research themselves.",
          countryId: netherlands.id,
          city: 'Amsterdam',
          classification: 'PUBLIC',
          studentPopulation: 44000,
          // Skip logo and image as per user request
          logo: null,
          image: null,
          websiteUrl: 'https://www.uva.nl',
          email: 'studentenservice@uva.nl',
          phone: '+31 20 525 1401'
        },
        include: {
          country: true
        }
      })

      console.log('✅ Created University of Amsterdam')
      console.log(`   ID: ${uva.id}`)
      console.log(`   Name: ${uva.name}`)
      console.log(`   Abbreviated: ${uva.abbreviatedName}`)
      console.log(`   Location: ${uva.city}, ${uva.country.name}`)
      console.log(`   Classification: ${uva.classification}`)
      console.log(`   Students: ${uva.studentPopulation?.toLocaleString()}`)
      console.log(`   Website: ${uva.websiteUrl}`)
      console.log(`   Email: ${uva.email}`)
      console.log(`   Phone: ${uva.phone}`)
    }

    console.log('\n📊 Note: University of Amsterdam has been added to the database.')
    console.log('   Algolia sync will happen automatically when programs are added.')
    console.log('   You can add an image later via the admin panel.\n')

    console.log('🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error seeding University of Amsterdam:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedAmsterdam()
