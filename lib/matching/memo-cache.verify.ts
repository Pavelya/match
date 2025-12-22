/**
 * Memoization Cache Tests
 *
 * Run with: npx tsx lib/matching/memo-cache.verify.ts
 */

import {
  createMemoCache,
  createMatchCacheKey,
  createSubjectCacheKey,
  getGlobalMatchCache,
  clearGlobalMatchCache,
  measureCachePerformance,
  type MemoCache
} from './memo-cache'

// ============================================
// Test Helpers
// ============================================

interface TestResult {
  name: string
  passed: boolean
  expected: string
  actual: string
  priority: 'P0' | 'P1'
}

const results: TestResult[] = []

function test(
  name: string,
  expected: unknown,
  actual: unknown,
  priority: 'P0' | 'P1' = 'P0'
): void {
  const passed = expected === actual
  results.push({
    name,
    passed,
    expected: String(expected),
    actual: String(actual),
    priority
  })
}

function testRange(
  name: string,
  min: number,
  max: number,
  actual: number,
  priority: 'P0' | 'P1' = 'P0'
): void {
  const passed = actual >= min && actual <= max
  results.push({
    name,
    passed,
    expected: `${min}-${max}`,
    actual: actual.toFixed(3),
    priority
  })
}

console.log('\n🧪 Memoization Cache Verification Tests\n')
console.log('='.repeat(70))

// ============================================
// Test 1: Cache hit returns same value
// ============================================

console.log('\n📋 Basic Cache Operations Tests:\n')

const cache = createMemoCache<string, number>({ maxSize: 100 })

cache.set('key1', 42)
test('Cache hit: returns same value', 42, cache.get('key1'))
test('Cache hit: has key', true, cache.has('key1'))

// ============================================
// Test 2: Cache miss returns undefined
// ============================================

test('Cache miss: returns undefined', undefined, cache.get('nonexistent'))
test('Cache miss: has returns false', false, cache.has('nonexistent'))

// ============================================
// Test 3: getOrCompute works correctly
// ============================================

console.log('\n📋 getOrCompute Tests:\n')

let computeCount = 0
const cachedValue = cache.getOrCompute('computed', () => {
  computeCount++
  return 100
})
test('getOrCompute: returns computed value', 100, cachedValue)
test('getOrCompute: computed once', 1, computeCount)

// Second call should use cache
const cachedAgain = cache.getOrCompute('computed', () => {
  computeCount++
  return 200
})
test('getOrCompute: returns cached value', 100, cachedAgain)
test('getOrCompute: not computed again', 1, computeCount)

// ============================================
// Test 4: LRU eviction works
// ============================================

console.log('\n📋 LRU Eviction Tests:\n')

const smallCache = createMemoCache<string, number>({ maxSize: 3 })
smallCache.set('a', 1)
smallCache.set('b', 2)
smallCache.set('c', 3)

test('Before eviction: size = 3', 3, smallCache.size)

// Adding 4th item should evict 'a' (oldest)
smallCache.set('d', 4)
test('After eviction: size still 3', 3, smallCache.size)
test('Oldest item evicted', undefined, smallCache.get('a'), 'P1')
test('Newest item exists', 4, smallCache.get('d'), 'P1')

// Access 'b' to make it recent, then add more
smallCache.get('b') // Touch 'b'
smallCache.set('e', 5) // Should evict 'c' (now oldest)
test('LRU eviction: touched item kept', 2, smallCache.get('b'), 'P1')

// ============================================
// Test 5: Statistics tracking
// ============================================

console.log('\n📋 Statistics Tests:\n')

const statsCache = createMemoCache<string, number>({ maxSize: 100 })
statsCache.resetStats()

// Generate some hits and misses
statsCache.set('x', 1)
statsCache.get('x') // hit
statsCache.get('x') // hit
statsCache.get('y') // miss
statsCache.get('z') // miss

const stats = statsCache.getStats()
test('Stats: hits = 2', 2, stats.hits)
test('Stats: misses = 2', 2, stats.misses)
test('Stats: hitRate = 0.5', 0.5, stats.hitRate)

// ============================================
// Test 6: High hit rate for batch operations
// ============================================

console.log('\n📋 Batch Operation Tests:\n')

const batchCache = createMemoCache<string, number>({ maxSize: 1000 })
batchCache.resetStats()

// Simulate realistic batch operation: same keys accessed multiple times
// Like OR-group checks where same student checks are repeated
for (let round = 0; round < 5; round++) {
  for (let i = 0; i < 100; i++) {
    // Same 100 keys accessed 5 times each = high hit rate after first round
    const key = `batch-key-${i}`
    batchCache.getOrCompute(key, () => Math.random())
  }
}

const batchStats = batchCache.getStats()
// First 100 are misses, remaining 400 are hits = 80% hit rate
testRange('Batch: hit rate > 75%', 0.75, 1.0, batchStats.hitRate, 'P1')
console.log(`   Actual hit rate: ${(batchStats.hitRate * 100).toFixed(1)}%`)

// ============================================
// Test 7: Cache key helpers
// ============================================

console.log('\n📋 Cache Key Helper Tests:\n')

const matchKey = createMatchCacheKey('student-123', 'program-456')
test('Match key format', 'match:student-123:program-456', matchKey)

const subjKey = createSubjectCacheKey('s1', 'Mathematics', 'HL', 5)
test('Subject key format', 'subj:s1:mathematics:HL:5', subjKey)

// ============================================
// Test 8: Global cache
// ============================================

console.log('\n📋 Global Cache Tests:\n')

clearGlobalMatchCache()
const globalCache = getGlobalMatchCache()
test('Global cache: exists', true, globalCache !== null)
test('Global cache: has maxSize', true, globalCache.maxSize > 0)

globalCache.set('test', 123)
test('Global cache: can store', 123, globalCache.get('test'))

clearGlobalMatchCache()
test('Global cache: cleared', undefined, getGlobalMatchCache().get('test'))

// ============================================
// Test 9: Performance measurement
// ============================================

console.log('\n📋 Performance Measurement Tests:\n')

const perfCache = createMemoCache<string, number>({ maxSize: 1000 })
const perfResult = measureCachePerformance('test-op', perfCache, () => {
  for (let i = 0; i < 100; i++) {
    perfCache.getOrCompute(`key-${i % 10}`, () => i)
  }
})

test('Performance: has duration', true, perfResult.durationMs >= 0)
test('Performance: has stats', true, perfResult.stats.hits > 0)
console.log(`   Duration: ${perfResult.durationMs.toFixed(3)}ms`)
console.log(`   Hit rate: ${(perfResult.stats.hitRate * 100).toFixed(1)}%`)

// ============================================
// Print Results
// ============================================

console.log('\n' + '='.repeat(70))
console.log('\n📊 Test Results:\n')

let p0Passed = 0
let p0Failed = 0
let p1Passed = 0
let p1Failed = 0

for (const r of results) {
  const status = r.passed ? '✅' : '❌'
  console.log(`${status} [${r.priority}] ${r.name}`)
  if (!r.passed) {
    console.log(`     Expected: ${r.expected}`)
    console.log(`     Actual:   ${r.actual}`)
  }

  if (r.priority === 'P0') {
    if (r.passed) p0Passed++
    else p0Failed++
  } else {
    if (r.passed) p1Passed++
    else p1Failed++
  }
}

console.log('\n' + '='.repeat(70))
console.log('\n📋 Summary:')
console.log(`   P0 Tests: ${p0Passed} passed, ${p0Failed} failed`)
console.log(`   P1 Tests: ${p1Passed} passed, ${p1Failed} failed`)
console.log(`   Total:    ${p0Passed + p1Passed} passed, ${p0Failed + p1Failed} failed\n`)

console.log('\n✅ Verification complete.\n')
