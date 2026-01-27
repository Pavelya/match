#!/usr/bin/env tsx

/**
 * Run all verification tests in the matching algorithm
 *
 * This script runs all .verify.ts files and the OR-group display verification
 */

import { execSync } from 'child_process'
import { readdirSync } from 'fs'
import { join } from 'path'

const MATCHING_DIR = join(__dirname, '../lib/matching')

console.log('🧪 Running All Matching Algorithm Tests\n')
console.log('='.repeat(70))

let totalPassed = 0
let totalFailed = 0
const results: { name: string; status: 'PASS' | 'FAIL'; error?: string }[] = []

// Find all .verify.ts files
const verifyFiles = readdirSync(MATCHING_DIR)
  .filter((file) => file.endsWith('.verify.ts'))
  .sort()

// Also include OR-group display verification
verifyFiles.push('or-group-display-verify.ts')

console.log(`\n📋 Found ${verifyFiles.length} test files\n`)

for (const file of verifyFiles) {
  const testName = file.replace('.verify.ts', '').replace(/-/g, ' ')
  const filePath = join(MATCHING_DIR, file)

  try {
    console.log(`\n🔍 Running: ${testName}`)
    console.log('-'.repeat(70))

    execSync(`npx tsx ${filePath}`, {
      encoding: 'utf-8',
      stdio: 'pipe',
      cwd: join(__dirname, '..')
    })

    // Exit code 0 means success, regardless of output format
    console.log(`✅ PASS: ${testName}`)
    results.push({ name: testName, status: 'PASS' })
    totalPassed++
  } catch (error: unknown) {
    console.log(`❌ FAIL: ${testName}`)
    const err = error as { stdout?: Buffer; stderr?: Buffer; message?: string }
    if (err.stdout) {
      console.log(err.stdout.toString().slice(0, 500))
    }
    if (err.stderr) {
      console.log('Error:', err.stderr.toString().slice(0, 500))
    }
    results.push({ name: testName, status: 'FAIL', error: err.message })
    totalFailed++
  }
}

// Summary
console.log('\n' + '='.repeat(70))
console.log('\n📊 Test Summary:')
console.log('='.repeat(70))

results.forEach((result) => {
  const icon = result.status === 'PASS' ? '✅' : '❌'
  console.log(`${icon} ${result.name}`)
  if (result.error) {
    console.log(`   Error: ${result.error.slice(0, 100)}`)
  }
})

console.log('\n' + '='.repeat(70))
console.log('\n📈 Overall Results:')
console.log(`   ✅ Passed: ${totalPassed}/${verifyFiles.length}`)
console.log(`   ❌ Failed: ${totalFailed}/${verifyFiles.length}`)
console.log(`   📊 Success Rate: ${((totalPassed / verifyFiles.length) * 100).toFixed(1)}%\n`)

if (totalFailed === 0) {
  console.log('🎉 All tests passed! Matching algorithm is working correctly.\n')
  process.exit(0)
} else {
  console.log(`⚠️  ${totalFailed} test(s) failed. Please review the issues above.\n`)
  process.exit(1)
}
