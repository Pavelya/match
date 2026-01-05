/**
 * Seed University of British Columbia to Database
 *
 * Adds UBC with official information from ubc.ca
 * The university will NOT automatically sync to Algolia since it has no programs yet.
 * Programs will sync to Algolia when they are added.
 *
 * Run with: npx tsx scripts/seed-ubc.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedUBC() {
  console.log('\n🏛️  Seeding University of British Columbia\n')

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

    // Check if UBC already exists
    const existingUBC = await prisma.university.findFirst({
      where: {
        name: {
          equals: 'University of British Columbia',
          mode: 'insensitive'
        }
      }
    })

    if (existingUBC) {
      console.log(`⚠️  University of British Columbia already exists (ID: ${existingUBC.id})`)
      console.log('   Updating with latest information...')

      const updated = await prisma.university.update({
        where: { id: existingUBC.id },
        data: {
          abbreviatedName: 'UBC',
          description:
            "The University of British Columbia (UBC) is a global centre for teaching, learning and research, consistently ranked among the top 20 public universities in the world. Since 1915, UBC's entrepreneurial spirit has embraced innovation and challenged the status quo. UBC encourages its students, staff and faculty to challenge convention, lead discovery and explore new ways of learning. At UBC, bold thinking is given a place to develop into ideas that can change the world. With two main campuses in Vancouver and the Okanagan, over 70,000 students, 18,000 faculty and staff, and an annual research budget exceeding $700 million, UBC is one of Canada's leading comprehensive research universities. The campus is located on the traditional, ancestral, and unceded territory of the xʷməθkʷəy̓əm (Musqueam) people.",
          city: 'Vancouver',
          classification: 'PUBLIC',
          studentPopulation: 70000,
          websiteUrl: 'https://www.ubc.ca',
          email: 'admissions.questions@ubc.ca',
          phone: '+1 604-822-2211'
        },
        include: {
          country: true
        }
      })

      console.log('✅ Updated University of British Columbia')
      console.log(`   ID: ${updated.id}`)
      console.log(`   Name: ${updated.name}`)
      console.log(`   Location: ${updated.city}, ${updated.country.name}`)
      console.log(`   Classification: ${updated.classification}`)
      console.log(`   Students: ${updated.studentPopulation?.toLocaleString()}`)
      console.log(`   Website: ${updated.websiteUrl}`)
      console.log(`   Email: ${updated.email}`)
      console.log(`   Phone: ${updated.phone}`)
    } else {
      // Create UBC with official information from ubc.ca
      const ubc = await prisma.university.create({
        data: {
          name: 'University of British Columbia',
          abbreviatedName: 'UBC',
          description:
            "The University of British Columbia (UBC) is a global centre for teaching, learning and research, consistently ranked among the top 20 public universities in the world. Since 1915, UBC's entrepreneurial spirit has embraced innovation and challenged the status quo. UBC encourages its students, staff and faculty to challenge convention, lead discovery and explore new ways of learning. At UBC, bold thinking is given a place to develop into ideas that can change the world. With two main campuses in Vancouver and the Okanagan, over 70,000 students, 18,000 faculty and staff, and an annual research budget exceeding $700 million, UBC is one of Canada's leading comprehensive research universities. The campus is located on the traditional, ancestral, and unceded territory of the xʷməθkʷəy̓əm (Musqueam) people.",
          countryId: canada.id,
          city: 'Vancouver',
          classification: 'PUBLIC',
          studentPopulation: 70000,
          // Skip logo and image as per user request
          logo: null,
          image: null,
          websiteUrl: 'https://www.ubc.ca',
          email: 'admissions.questions@ubc.ca',
          phone: '+1 604-822-2211'
        },
        include: {
          country: true
        }
      })

      console.log('✅ Created University of British Columbia')
      console.log(`   ID: ${ubc.id}`)
      console.log(`   Name: ${ubc.name}`)
      console.log(`   Abbreviated: ${ubc.abbreviatedName}`)
      console.log(`   Location: ${ubc.city}, ${ubc.country.name}`)
      console.log(`   Classification: ${ubc.classification}`)
      console.log(`   Students: ${ubc.studentPopulation?.toLocaleString()}`)
      console.log(`   Website: ${ubc.websiteUrl}`)
      console.log(`   Email: ${ubc.email}`)
      console.log(`   Phone: ${ubc.phone}`)
    }

    console.log('\n📊 Note: University of British Columbia has been added to the database.')
    console.log('   Algolia sync will happen automatically when programs are added.')
    console.log('   You can add an image later via the admin panel.\n')

    console.log('🎉 Done!\n')
  } catch (error) {
    console.error('\n❌ Error seeding University of British Columbia:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seedUBC()
