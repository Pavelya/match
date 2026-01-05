/**
 * Seed Delft University of Technology (TU Delft) to Database
 *
 * Adds TU Delft with official information from tudelft.nl
 * The university will NOT automatically sync to Algolia since it has no programs yet.
 * Programs will sync to Algolia when they are added.
 *
 * Run with: npx tsx scripts/seed-tudelft.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedTUDelft() {
  console.log('\n🏛️  Seeding Delft University of Technology (TU Delft)\n')

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

    // Check if TU Delft already exists
    const existingTUDelft = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { equals: 'Delft University of Technology', mode: 'insensitive' } },
          { name: { equals: 'TU Delft', mode: 'insensitive' } }
        ]
      }
    })

    if (existingTUDelft) {
      console.log(`⚠️  TU Delft already exists (ID: ${existingTUDelft.id})`)
      console.log('   Updating with latest information...')

      const updated = await prisma.university.update({
        where: { id: existingTUDelft.id },
        data: {
          name: 'Delft University of Technology',
          abbreviatedName: 'TU Delft',
          description:
            'Delft University of Technology (TU Delft) is a public research university founded in 1842 by King William II in Delft, Netherlands. As the oldest and largest technical university in the Netherlands, TU Delft offers almost 40 technological and scientific disciplines with many specialisms. With approximately 27,000 students, TU Delft is a world-leading institution in engineering and technology education, consistently ranked among the top technical universities globally. The university focuses on solving major societal challenges through innovative research and maintains strong connections with industry and business for technology transfer and entrepreneurship.',
          city: 'Delft',
          classification: 'PUBLIC',
          studentPopulation: 27000,
          websiteUrl: 'https://www.tudelft.nl',
          email: 'info@tudelft.nl',
          phone: '+31 15-2789111'
        },
        include: {
          country: true
        }
      })

      console.log('✅ Updated TU Delft')
      console.log(`   ID: ${updated.id}`)
      console.log(`   Name: ${updated.name}`)
      console.log(`   Location: ${updated.city}, ${updated.country.name}`)
      console.log(`   Classification: ${updated.classification}`)
      console.log(`   Students: ${updated.studentPopulation?.toLocaleString()}`)
      console.log(`   Website: ${updated.websiteUrl}`)
      console.log(`   Email: ${updated.email}`)
      console.log(`   Phone: ${updated.phone}`)
    } else {
      // Create TU Delft with official information from tudelft.nl
      const tudelft = await prisma.university.create({
        data: {
          name: 'Delft University of Technology',
          abbreviatedName: 'TU Delft',
          description:
            'Delft University of Technology (TU Delft) is a public research university founded in 1842 by King William II in Delft, Netherlands. As the oldest and largest technical university in the Netherlands, TU Delft offers almost 40 technological and scientific disciplines with many specialisms. With approximately 27,000 students, TU Delft is a world-leading institution in engineering and technology education, consistently ranked among the top technical universities globally. The university focuses on solving major societal challenges through innovative research and maintains strong connections with industry and business for technology transfer and entrepreneurship.',
          countryId: netherlands.id,
          city: 'Delft',
          classification: 'PUBLIC',
          studentPopulation: 27000,
          // Skip logo and image as per user request
          logo: null,
          image: null,
          websiteUrl: 'https://www.tudelft.nl',
          email: 'info@tudelft.nl',
          phone: '+31 15-2789111'
        },
        include: {
          country: true
        }
      })

      console.log('✅ Created TU Delft')
      console.log(`   ID: ${tudelft.id}`)
      console.log(`   Name: ${tudelft.name}`)
      console.log(`   Abbreviated: ${tudelft.abbreviatedName}`)
      console.log(`   Location: ${tudelft.city}, ${tudelft.country.name}`)
      console.log(`   Classification: ${tudelft.classification}`)
      console.log(`   Students: ${tudelft.studentPopulation?.toLocaleString()}`)
      console.log(`   Website: ${tudelft.websiteUrl}`)
      console.log(`   Email: ${tudelft.email}`)
      console.log(`   Phone: ${tudelft.phone}`)
    }

    console.log('\n📊 Note: TU Delft has been added to the database.')
    console.log('   Algolia sync will happen automatically when programs are added.')
    console.log('   You can add an image later via the admin panel.\n')

    console.log('🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error seeding TU Delft:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedTUDelft()
