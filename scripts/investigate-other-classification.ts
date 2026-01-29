import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function investigate() {
  console.log('=== INVESTIGATING "OTHER" DEGREE CLASSIFICATION ===\n')
  console.log('This investigates the admin UI classification of Bachelor/Master/Other\n')

  const programs = await prisma.academicProgram.findMany({
    include: {
      university: {
        include: { country: true }
      },
      fieldOfStudy: true
    },
    orderBy: {
      degreeType: 'asc'
    }
  })

  let bachelorCount = 0
  let masterCount = 0
  const otherPrograms: typeof programs = []

  programs.forEach((p) => {
    const dt = p.degreeType.toLowerCase()

    // Bachelor patterns (from ProgramsListClient.tsx)
    if (
      dt.startsWith('bachelor') ||
      dt.startsWith('bsc') ||
      dt.startsWith('ba ') ||
      dt.startsWith('beng') ||
      dt.startsWith('bn') ||
      dt.startsWith('bvm') ||
      dt.startsWith('mbchb') // Medicine is undergraduate
    ) {
      bachelorCount++
    }
    // Master patterns
    else if (
      dt.startsWith('master') ||
      dt.startsWith('msc') ||
      dt.startsWith('minf') ||
      (dt.startsWith('ma ') && !dt.includes('(hons)')) // MA without (Hons) is postgrad
    ) {
      masterCount++
    }
    // Scottish MA (Hons) is undergraduate
    else if (dt.startsWith('ma (hons)') || dt.startsWith('ma(hons)')) {
      bachelorCount++
    } else {
      // This is classified as "Other"
      otherPrograms.push(p)
    }
  })

  const otherCount = programs.length - bachelorCount - masterCount

  console.log('📊 CLASSIFICATION SUMMARY:')
  console.log(`   Total Programs: ${programs.length}`)
  console.log(`   Bachelor's: ${bachelorCount}`)
  console.log(`   Master's: ${masterCount}`)
  console.log(`   Other: ${otherCount}`)
  console.log()

  // Group "Other" by degree type
  const otherByDegree: Record<string, number> = {}
  otherPrograms.forEach((p) => {
    otherByDegree[p.degreeType] = (otherByDegree[p.degreeType] || 0) + 1
  })

  console.log('📋 "OTHER" DEGREE TYPES (sorted by count):')
  Object.entries(otherByDegree)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`   ${count.toString().padStart(3)}x "${type}"`)
    })

  console.log()
  console.log('🔍 DETAILED ANALYSIS OF "OTHER" PROGRAMS:\n')

  // Group by university
  const otherByUniversity: Record<string, number> = {}
  otherPrograms.forEach((p) => {
    const uni = p.university?.name || 'Unknown'
    otherByUniversity[uni] = (otherByUniversity[uni] || 0) + 1
  })

  console.log('BY UNIVERSITY:')
  Object.entries(otherByUniversity)
    .sort((a, b) => b[1] - a[1])
    .forEach(([uni, count]) => {
      console.log(`   ${count.toString().padStart(3)}x ${uni}`)
    })

  console.log()
  console.log('📝 SAMPLE "OTHER" PROGRAMS (first 20):')
  otherPrograms.slice(0, 20).forEach((p, idx) => {
    console.log(`\n${(idx + 1).toString().padStart(2)}. ${p.name}`)
    console.log(`    Degree Type: "${p.degreeType}"`)
    console.log(`    University: ${p.university?.name}`)
    console.log(`    Country: ${p.university?.country?.name}`)
    console.log(`    Field: ${p.fieldOfStudy?.name}`)
  })

  console.log('\n\n')
  console.log('🔎 WHY ARE THESE CLASSIFIED AS "OTHER"?')
  console.log('─────────────────────────────────────────────────')
  console.log('The classification logic in ProgramsListClient.tsx checks:')
  console.log('1. Bachelor: starts with "bachelor", "bsc", "ba ", "beng", "bn", "bvm", "mbchb"')
  console.log('2. Master: starts with "master", "msc", "minf", or "ma " (without "(hons)")')
  console.log('3. Scottish MA (Hons): counted as Bachelor')
  console.log()
  console.log('Programs that don\'t match these patterns are classified as "Other"')
  console.log()

  // Identify patterns that could be added
  console.log('💡 SUGGESTED IMPROVEMENTS:')
  console.log('─────────────────────────────────────────────────')

  const suggestions: Record<string, string[]> = {
    'Bachelor (should be)': [],
    'Master (should be)': [],
    'Dual/Combined (ambiguous)': [],
    'Professional (valid "Other")': []
  }

  otherPrograms.forEach((p) => {
    const dt = p.degreeType.toLowerCase()

    // Should be Bachelor
    if (
      dt.includes('bachelor') ||
      dt.startsWith('bfa') ||
      dt.startsWith('llb') ||
      dt.startsWith('bba')
    ) {
      if (!suggestions['Bachelor (should be)'].includes(p.degreeType)) {
        suggestions['Bachelor (should be)'].push(p.degreeType)
      }
    }
    // Should be Master
    else if (
      dt.includes('master') ||
      dt.startsWith('meng') ||
      dt.startsWith('mmath') ||
      dt.startsWith('mphys') ||
      dt.startsWith('mchem') ||
      dt.startsWith('mbiol')
    ) {
      if (!suggestions['Master (should be)'].includes(p.degreeType)) {
        suggestions['Master (should be)'].push(p.degreeType)
      }
    }
    // Dual/Combined
    else if (
      dt.includes('dual') ||
      dt.includes('combined') ||
      dt.includes('double') ||
      dt.includes('/') ||
      dt.includes('+')
    ) {
      if (!suggestions['Dual/Combined (ambiguous)'].includes(p.degreeType)) {
        suggestions['Dual/Combined (ambiguous)'].push(p.degreeType)
      }
    }
    // Professional degrees (likely valid as "Other")
    else {
      if (!suggestions['Professional (valid "Other")'].includes(p.degreeType)) {
        suggestions['Professional (valid "Other")'].push(p.degreeType)
      }
    }
  })

  Object.entries(suggestions).forEach(([category, types]) => {
    if (types.length > 0) {
      console.log(`\n${category}:`)
      types.forEach((t) => console.log(`   - "${t}"`))
    }
  })

  await prisma.$disconnect()
}

investigate()
