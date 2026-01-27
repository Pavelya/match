import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function analyze() {
  console.log('=== PROGRAM DATABASE ANALYSIS ===\n')

  // Get all programs with their university and field
  const programs = await prisma.academicProgram.findMany({
    include: {
      university: {
        include: { country: true }
      },
      fieldOfStudy: true
    }
  })

  console.log('Total Programs:', programs.length)

  // By Country
  const byCountry: Record<string, number> = {}
  programs.forEach((p) => {
    const country = p.university?.country?.name || 'Unknown'
    byCountry[country] = (byCountry[country] || 0) + 1
  })
  console.log('\n📍 BY COUNTRY:')
  Object.entries(byCountry)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log('  ', k + ':', v))

  // By University
  const byUni: Record<string, number> = {}
  programs.forEach((p) => {
    const uni = p.university?.name || 'Unknown'
    byUni[uni] = (byUni[uni] || 0) + 1
  })
  console.log('\n🏛️  BY UNIVERSITY (Top 20):')
  Object.entries(byUni)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .forEach(([k, v]) => console.log('  ', k + ':', v))

  // By Field
  const byField: Record<string, number> = {}
  programs.forEach((p) => {
    const field = p.fieldOfStudy?.name || 'Unknown'
    byField[field] = (byField[field] || 0) + 1
  })
  console.log('\n📚 BY FIELD OF STUDY:')
  Object.entries(byField)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log('  ', k + ':', v))

  // By Degree Type
  const byDegree: Record<string, number> = {}
  programs.forEach((p) => {
    const deg = p.degreeType || 'Unknown'
    byDegree[deg] = (byDegree[deg] || 0) + 1
  })
  console.log('\n🎓 BY DEGREE TYPE (Top 15):')
  Object.entries(byDegree)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .forEach(([k, v]) => console.log('  ', k + ':', v))

  // IB Points distribution
  const ibRanges: Record<string, number> = {
    '24-29': 0,
    '30-34': 0,
    '35-37': 0,
    '38-40': 0,
    '41-43': 0,
    '44+': 0
  }
  programs.forEach((p) => {
    const pts = p.minIBPoints || 0
    if (pts >= 44) ibRanges['44+']++
    else if (pts >= 41) ibRanges['41-43']++
    else if (pts >= 38) ibRanges['38-40']++
    else if (pts >= 35) ibRanges['35-37']++
    else if (pts >= 30) ibRanges['30-34']++
    else ibRanges['24-29']++
  })
  console.log('\n📊 BY IB POINTS RANGE:')
  Object.entries(ibRanges).forEach(([k, v]) => console.log('  ', k + ':', v))

  await prisma.$disconnect()
}

analyze()
