import { describe, expect, it } from 'vitest'
import {
  createMemoCache,
  createMatchCacheKey,
  createSubjectCacheKey,
  getGlobalMatchCache,
  clearGlobalMatchCache,
  measureCachePerformance
} from './memo-cache'

describe('basic cache operations', () => {
  const cache = createMemoCache<string, number>({ maxSize: 100 })
  cache.set('key1', 42)

  it('Cache hit: returns same value', () => {
    expect(cache.get('key1')).toBe(42)
    expect(cache.has('key1')).toBe(true)
  })

  it('Cache miss: returns undefined', () => {
    expect(cache.get('nonexistent')).toBe(undefined)
    expect(cache.has('nonexistent')).toBe(false)
  })

  it('getOrCompute: computes once, then returns the cached value', () => {
    let computeCount = 0
    const computed = cache.getOrCompute('computed', () => {
      computeCount++
      return 100
    })
    expect(computed).toBe(100)
    expect(computeCount).toBe(1)

    const cachedAgain = cache.getOrCompute('computed', () => {
      computeCount++
      return 200
    })
    expect(cachedAgain).toBe(100)
    expect(computeCount).toBe(1)
  })
})

describe('LRU eviction', () => {
  it('evicts the least recently used item', () => {
    const smallCache = createMemoCache<string, number>({ maxSize: 3 })
    smallCache.set('a', 1)
    smallCache.set('b', 2)
    smallCache.set('c', 3)
    expect(smallCache.size).toBe(3)

    // Adding a 4th item evicts 'a' (oldest)
    smallCache.set('d', 4)
    expect(smallCache.size).toBe(3)
    expect(smallCache.get('a')).toBe(undefined)
    expect(smallCache.get('d')).toBe(4)

    // Touching 'b' makes it recent, so adding 'e' evicts 'c' instead
    smallCache.get('b')
    smallCache.set('e', 5)
    expect(smallCache.get('b')).toBe(2)
  })
})

describe('statistics', () => {
  it('Stats: two hits, two misses, hitRate 0.5', () => {
    const statsCache = createMemoCache<string, number>({ maxSize: 100 })
    statsCache.resetStats()
    statsCache.set('x', 1)
    statsCache.get('x') // hit
    statsCache.get('x') // hit
    statsCache.get('y') // miss
    statsCache.get('z') // miss

    const stats = statsCache.getStats()
    expect(stats.hits).toBe(2)
    expect(stats.misses).toBe(2)
    expect(stats.hitRate).toBe(0.5)
  })

  it('Batch: hit rate > 75%', () => {
    const batchCache = createMemoCache<string, number>({ maxSize: 1000 })
    batchCache.resetStats()

    // The same 100 keys accessed 5 times each, like repeated OR-group checks for one student
    for (let round = 0; round < 5; round++) {
      for (let i = 0; i < 100; i++) {
        batchCache.getOrCompute(`batch-key-${i}`, () => Math.random())
      }
    }

    // First 100 are misses, remaining 400 are hits = 80% hit rate
    const { hitRate } = batchCache.getStats()
    expect(hitRate).toBeGreaterThanOrEqual(0.75)
    expect(hitRate).toBeLessThanOrEqual(1.0)
  })
})

describe('cache key helpers', () => {
  it('Match key format', () => {
    expect(createMatchCacheKey('student-123', 'program-456')).toBe('match:student-123:program-456')
  })

  it('Subject key format', () => {
    expect(createSubjectCacheKey('s1', 'Mathematics', 'HL', 5)).toBe('subj:s1:mathematics:HL:5')
  })
})

describe('global cache', () => {
  it('exists, stores and clears', () => {
    clearGlobalMatchCache()
    const globalCache = getGlobalMatchCache()
    expect(globalCache).not.toBe(null)
    expect(globalCache.maxSize).toBeGreaterThan(0)

    globalCache.set('test', 123)
    expect(globalCache.get('test')).toBe(123)

    clearGlobalMatchCache()
    expect(getGlobalMatchCache().get('test')).toBe(undefined)
  })
})

describe('measureCachePerformance', () => {
  it('Performance: has duration and stats', () => {
    const perfCache = createMemoCache<string, number>({ maxSize: 1000 })
    const perfResult = measureCachePerformance('test-op', perfCache, () => {
      for (let i = 0; i < 100; i++) {
        perfCache.getOrCompute(`key-${i % 10}`, () => i)
      }
    })
    expect(perfResult.durationMs).toBeGreaterThanOrEqual(0)
    expect(perfResult.stats.hits).toBeGreaterThan(0)
  })
})
