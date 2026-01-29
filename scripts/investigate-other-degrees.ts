import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function investigate() {
  console.log('=== INVESTIGATING "OTHER" DEGREE TYPES ===\n')

  // Find all programs with "Other" in the degree type
  const otherPrograms = await prisma.academicProgram.findMany({
    where: {
      degreeType: {
        contains: 'Other',
        mode: 'insensitive'
      }
    },
    include: {
      university: {
        include: { country: true }
      },
      fieldOfStudy: true
    },
    orderBy: {
      university: {
        name: 'asc'
      }
    }
  })

  console.log(`Found ${otherPrograms.length} programs with "Other" in degree type\n`)

  // Group by exact degree type
  const byDegreeType: Record<string, number> = {}
  otherPrograms.forEach((p) => {
    const deg = p.degreeType || 'NULL'
    byDegreeType[deg] = (byDegreeType[deg] || 0) + 1
  })

  console.log('📊 BY EXACT DEGREE TYPE:')
  Object.entries(byDegreeType)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log(`   ${k}: ${v}`))

  // Group by university
  const byUniversity: Record<string, number> = {}
  otherPrograms.forEach((p) => {
    const uni = p.university?.name || 'Unknown'
    byUniversity[uni] = (byUniversity[uni] || 0) + 1
  })

  console.log('\n🏛️  BY UNIVERSITY:')
  Object.entries(byUniversity)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log(`   ${k}: ${v}`))

  // Show sample programs
  console.log('\n📝 SAMPLE PROGRAMS (first 10):')
  otherPrograms.slice(0, 10).forEach((p, idx) => {
    console.log(`\n${idx + 1}. ${p.name}`)
    console.log(`   University: ${p.university?.name}`)
    console.log(`   Country: ${p.university?.country?.name}`)
    console.log(`   Degree Type: "${p.degreeType}"`)
    console.log(`   Field: ${p.fieldOfStudy?.name}`)
    console.log(`   Min IB Points: ${p.minIBPoints}`)
    console.log(`   Program ID: ${p.id}`)
  })

  // Check for all degree types to see patterns
  console.log('\n\n=== ALL DEGREE TYPES (showing all variations) ===\n')
  const allDegreeTypes = await prisma.academicProgram.groupBy({
    by: ['degreeType'],
    _count: {
      degreeType: true
    },
    orderBy: {
      _count: {
        degreeType: 'desc'
      }
    }
  })

  console.log('Total unique degree types:', allDegreeTypes.length)
  console.log('\nAll degree types:')
  allDegreeTypes.forEach((dt) => {
    console.log(`   "${dt.degreeType}": ${dt._count.degreeType}`)
  })

  await prisma.$disconnect()
}

investigate()
