/**
 * Performance Test Script
 *
 * Run with: npx tsx scripts/perf-test.ts
 *
 * Tests the matches API performance after all optimizations.
 * Requires a valid student profile to exist.
 */

import { prisma } from '../lib/prisma'
import { getCachedPrograms, warmProgramsCache } from '../lib/matching/program-cache'
import { getCachedMatches } from '../lib/matching'
import { transformStudent, transformPrograms } from '../lib/matching/transformers'
import { redis } from '../lib/redis/client'

async function runPerfTest() {
  console.log('\n🚀 Performance Test for IB Match\n')
  console.log('='.repeat(50))

  // Step 1: Check program count
  const programCount = await prisma.academicProgram.count()
  console.log(`\n📊 Current program count: ${programCount}`)

  // Step 2: Test cache warming
  console.log('\n🔥 Testing cache warming...')
  const warmStart = performance.now()
  await warmProgramsCache()
  const warmDuration = Math.round(performance.now() - warmStart)
  console.log(`   Cache warmed in ${warmDuration}ms`)

  // Step 3: Test cached programs fetch
  console.log('\n📦 Testing cached programs fetch...')
  const cacheStart = performance.now()
  const programs = await getCachedPrograms()
  const cacheDuration = Math.round(performance.now() - cacheStart)
  console.log(`   Fetched ${programs.length} programs in ${cacheDuration}ms (cache hit)`)

  // Step 4: Find a test student
  const testStudent = await prisma.studentProfile.findFirst({
    include: {
      courses: { include: { ibCourse: true } },
      preferredFields: true,
      preferredCountries: true
    }
  })

  if (!testStudent) {
    console.log('\n⚠️  No student profile found. Please complete onboarding first.')
    console.log('   Skipping match calculation test.\n')
    await prisma.$disconnect()
    return
  }

  console.log(`\n👤 Testing with student: ${testStudent.userId}`)
  console.log(
    `   Fields: ${testStudent.preferredFields.length}, Countries: ${testStudent.preferredCountries.length}`
  )
  console.log(`   IB Points: ${testStudent.totalIBPoints}`)

  // Step 5: Clear match cache for accurate test
  const cacheKey = `matches:${testStudent.userId}:*`
  const keys = await redis.keys(cacheKey)
  if (keys.length > 0) {
    await redis.del(...keys)
    console.log(`   Cleared ${keys.length} cached match keys`)
  }

  // Step 6: Test match calculation (cold)
  console.log('\n🧮 Testing match calculation (cold)...')
  const transformedStudent = transformStudent(testStudent)
  const transformedPrograms = transformPrograms(programs)

  const coldStart = performance.now()
  const coldMatches = await getCachedMatches(
    testStudent.userId,
    transformedStudent,
    transformedPrograms,
    'BALANCED'
  )
  const coldDuration = Math.round(performance.now() - coldStart)
  console.log(`   Calculated ${coldMatches.length} matches in ${coldDuration}ms (cache miss)`)
  console.log(`   Top match score: ${coldMatches[0]?.overallScore?.toFixed(2) || 'N/A'}`)

  // Step 7: Test match calculation (warm)
  console.log('\n🏃 Testing match calculation (warm)...')
  const warmMatchStart = performance.now()
  const warmMatches = await getCachedMatches(
    testStudent.userId,
    transformedStudent,
    transformedPrograms,
    'BALANCED'
  )
  const warmMatchDuration = Math.round(performance.now() - warmMatchStart)
  console.log(`   Fetched ${warmMatches.length} matches in ${warmMatchDuration}ms (cache hit)`)

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('📋 PERFORMANCE SUMMARY')
  console.log('='.repeat(50))
  console.log(`
  Programs in database:    ${programCount}
  
  Cache Warming:           ${warmDuration}ms
  Programs Fetch (cached): ${cacheDuration}ms
  
  Match Calculation:
    - Cold (cache miss):   ${coldDuration}ms
    - Warm (cache hit):    ${warmMatchDuration}ms
    - Speedup:             ${(coldDuration / warmMatchDuration).toFixed(1)}x
  
  Top Match Score:         ${coldMatches[0]?.overallScore?.toFixed(2) || 'N/A'}
  `)

  // Check against baseline targets
  console.log('🎯 TARGET COMPARISON')
  console.log('='.repeat(50))
  console.log(`
  Metric                   Target    Actual    Status
  ─────────────────────────────────────────────────
  Cache hit latency        <100ms    ${warmMatchDuration}ms      ${warmMatchDuration < 100 ? '✅' : '❌'}
  Cache miss latency       <300ms    ${coldDuration}ms     ${coldDuration < 300 ? '✅' : '⚠️'}
  `)

  await prisma.$disconnect()
}

runPerfTest().catch(console.error)
