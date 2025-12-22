/**
 * Memoization Cache
 *
 * NEW in Matching Algorithm V10 - Performance Optimization
 *
 * A generic LRU (Least Recently Used) cache for memoizing expensive
 * calculations during matching. Particularly useful for:
 * - Repeated subject requirement checks
 * - OR-group evaluations (same combinations tested multiple times)
 * - Score calculations for same student-program pairs in a session
 *
 * Features:
 * - Configurable max size with LRU eviction
 * - Hit/miss statistics for performance monitoring
 * - Generic typing for any cacheable computation
 * - TTL (time-to-live) support for time-sensitive data
 *
 * Based on: DOC_2_matching-algo X.md - Performance Optimizations
 */

// ============================================
// Types
// ============================================

export interface MemoCache<K, V> {
  get: (key: K) => V | undefined
  set: (key: K, value: V) => void
  has: (key: K) => boolean
  delete: (key: K) => boolean
  clear: () => void

  // Memoization helper
  getOrCompute: (key: K, compute: () => V) => V

  // Statistics
  getStats: () => CacheStats
  resetStats: () => void

  // Properties
  readonly size: number
  readonly maxSize: number
}

export interface CacheStats {
  hits: number
  misses: number
  evictions: number
  hitRate: number // 0.0 - 1.0
  size: number
  maxSize: number
}

export interface CacheOptions {
  maxSize?: number
  ttlMs?: number // Time-to-live in milliseconds (0 = no expiry)
}

// ============================================
// LRU Cache Implementation
// ============================================

interface CacheEntry<V> {
  value: V
  createdAt: number
}

/**
 * Create a memoization cache with LRU eviction
 *
 * @param options - Cache configuration
 * @returns MemoCache instance
 *
 * @example
 * // Create a cache for match scores
 * const scoreCache = createMemoCache<string, number>({ maxSize: 1000 })
 *
 * // Use getOrCompute for automatic caching
 * const score = scoreCache.getOrCompute(
 *   `${studentId}-${programId}`,
 *   () => calculateExpensiveScore(student, program)
 * )
 */
export function createMemoCache<K, V>(options: CacheOptions = {}): MemoCache<K, V> {
  const maxSize = options.maxSize ?? 1000
  const ttlMs = options.ttlMs ?? 0

  const cache = new Map<K, CacheEntry<V>>()
  const accessOrder: K[] = [] // Most recent at end

  let hits = 0
  let misses = 0
  let evictions = 0

  function isExpired(entry: CacheEntry<V>): boolean {
    if (ttlMs === 0) return false
    return Date.now() - entry.createdAt > ttlMs
  }

  function updateAccessOrder(key: K): void {
    const index = accessOrder.indexOf(key)
    if (index > -1) {
      accessOrder.splice(index, 1)
    }
    accessOrder.push(key)
  }

  function evictIfNeeded(): void {
    while (cache.size >= maxSize && accessOrder.length > 0) {
      const oldest = accessOrder.shift()
      if (oldest !== undefined) {
        cache.delete(oldest)
        evictions++
      }
    }
  }

  return {
    get(key: K): V | undefined {
      const entry = cache.get(key)
      if (!entry) {
        misses++
        return undefined
      }

      if (isExpired(entry)) {
        cache.delete(key)
        const index = accessOrder.indexOf(key)
        if (index > -1) accessOrder.splice(index, 1)
        misses++
        return undefined
      }

      hits++
      updateAccessOrder(key)
      return entry.value
    },

    set(key: K, value: V): void {
      evictIfNeeded()
      cache.set(key, { value, createdAt: Date.now() })
      updateAccessOrder(key)
    },

    has(key: K): boolean {
      const entry = cache.get(key)
      if (!entry) return false
      if (isExpired(entry)) {
        cache.delete(key)
        return false
      }
      return true
    },

    delete(key: K): boolean {
      const index = accessOrder.indexOf(key)
      if (index > -1) accessOrder.splice(index, 1)
      return cache.delete(key)
    },

    clear(): void {
      cache.clear()
      accessOrder.length = 0
    },

    getOrCompute(key: K, compute: () => V): V {
      const existing = this.get(key)
      if (existing !== undefined) {
        return existing
      }

      const value = compute()
      this.set(key, value)
      return value
    },

    getStats(): CacheStats {
      const total = hits + misses
      return {
        hits,
        misses,
        evictions,
        hitRate: total > 0 ? hits / total : 0,
        size: cache.size,
        maxSize
      }
    },

    resetStats(): void {
      hits = 0
      misses = 0
      evictions = 0
    },

    get size(): number {
      return cache.size
    },

    get maxSize(): number {
      return maxSize
    }
  }
}

// ============================================
// Specialized Caches for Matching
// ============================================

/**
 * Create a cache key for student-program matching
 */
export function createMatchCacheKey(studentId: string, programId: string): string {
  return `match:${studentId}:${programId}`
}

/**
 * Create a cache key for subject requirement checks
 */
export function createSubjectCacheKey(
  studentId: string,
  courseName: string,
  level: string,
  minGrade: number
): string {
  return `subj:${studentId}:${courseName.toLowerCase()}:${level}:${minGrade}`
}

/**
 * Create a cache key for OR-group evaluations
 */
export function createOrGroupCacheKey(studentId: string, groupHash: string): string {
  return `orgroup:${studentId}:${groupHash}`
}

// ============================================
// Global Cache Instance (for session-level caching)
// ============================================

let globalMatchCache: MemoCache<string, number> | null = null

/**
 * Get or create the global match score cache
 */
export function getGlobalMatchCache(): MemoCache<string, number> {
  if (!globalMatchCache) {
    globalMatchCache = createMemoCache<string, number>({
      maxSize: 5000, // Cache up to 5000 match scores
      ttlMs: 5 * 60 * 1000 // 5 minute TTL
    })
  }
  return globalMatchCache
}

/**
 * Clear the global cache (call on student profile update)
 */
export function clearGlobalMatchCache(): void {
  if (globalMatchCache) {
    globalMatchCache.clear()
    globalMatchCache.resetStats()
  }
}

// ============================================
// Performance Measurement
// ============================================

/**
 * Measure cache performance for a batch operation
 */
export function measureCachePerformance<T>(
  name: string,
  cache: MemoCache<string, T>,
  operation: () => void
): {
  name: string
  durationMs: number
  stats: CacheStats
} {
  cache.resetStats()
  const start = performance.now()
  operation()
  const durationMs = performance.now() - start

  return {
    name,
    durationMs,
    stats: cache.getStats()
  }
}
