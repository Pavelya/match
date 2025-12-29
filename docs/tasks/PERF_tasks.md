# Performance Improvement Tasks

> Priority order for implementation. Complete each task and validate before moving to next.

---

## ✅ Completed

### Task 0: Program Data Caching
**Status**: ✅ Done

**What**: Cache all program data in Redis instead of querying DB every request.

**Files Changed**:
- `lib/matching/program-cache.ts` (new)
- `app/api/students/matches/route.ts`

**Test**: Call `/api/students/matches` twice - second call should be faster.

---

### Task 0.5: Reference Data Caching  
**Status**: ✅ Done

**What**: Cache fields, countries, IB courses in Next.js cache.

**Files Changed**:
- `lib/reference-data.ts` (new)
- `app/student/onboarding/page.tsx`

**Test**: Reload onboarding page - should be faster on second load.

---

### Task 1: Pre-compute Matches on Profile Save
**Status**: ✅ Done

**What**: Pre-compute matches when profile is saved (fire-and-forget).

**Files Changed**:
- `app/api/students/matches/precompute/route.ts` (new)
- `app/api/students/profile/route.ts`
- `lib/env.ts`

**Environment Variables to Add**:
```
INTERNAL_API_KEY=your-random-secret-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Test**: Save profile → visit /student/matches → should load instantly (cache hit).

### What to Change

1. **Create pre-compute API endpoint**:
   ```
   POST /api/students/matches/precompute
   ```
   - Accepts `x-internal-key` header for security
   - Fetches student profile
   - Calculates all matches
   - Stores in Redis cache

2. **Trigger after profile save** in `app/api/students/profile/route.ts`:
   ```typescript
   // After saving profile
   await invalidateStudentCache(studentId)
   
   // Fire-and-forget pre-computation
   fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/students/matches/precompute`, {
     method: 'POST',
     headers: { 
       'Content-Type': 'application/json',
       'x-internal-key': process.env.INTERNAL_API_KEY 
     },
     body: JSON.stringify({ studentId })
   }).catch(() => {}) // Don't block on failure
   ```

3. **Add environment variable**:
   ```
   INTERNAL_API_KEY=your-random-secret-key
   ```

### Files to Create/Modify
- `app/api/students/matches/precompute/route.ts` (new)
- `app/api/students/profile/route.ts` (modify)
- `.env.local` (add INTERNAL_API_KEY)

### How to Test
1. Save profile via onboarding
2. Check Redis for `matches:{studentId}:*` key
3. Navigate to `/student/matches` - should be instant (cache hit)

### Expected Improvement
- Cache hit rate: 60% → 95%+
- First visit after profile change: ~800ms → ~100ms

---

## 🟡 Priority 2: Extend Match Cache TTL

**Goal**: Reduce cache expiration frequency.

### What to Change

Increase TTL from 5 minutes to 30 minutes in `lib/matching/cache.ts`:

```typescript
// Before
const CACHE_TTL = 300 // 5 minutes

// After  
const CACHE_TTL = 1800 // 30 minutes
```

### How to Test
1. Call `/api/students/matches`
2. Wait 10 minutes
3. Call again - should still be cache hit

### Expected Improvement
- Cache hit rate: +10-15%
- Reduced Redis operations

---

## 🟡 Priority 3: Algolia Pre-filtering

**Goal**: Match against 200 candidates instead of 2,500.

### What to Change

1. **Add Algolia search before matching**:
   ```typescript
   // Get candidate programs from Algolia (fast, <50ms)
   const candidates = await algoliaClient.search('programs_production', {
     filters: buildFilters(studentProfile),
     hitsPerPage: 200
   })
   
   // Only calculate matches for candidates
   const matches = calculateMatches(student, candidates.hits)
   ```

2. **Build smart filters**:
   - Filter by student's preferred fields
   - Filter by student's preferred countries
   - Filter by programs with points ≤ student's points + 5

### Files to Create/Modify
- `lib/algolia/search.ts` (new)
- `app/api/students/matches/route.ts` (modify)

### How to Test
1. Log candidate count vs total programs
2. Verify top 15 matches are same quality
3. Measure latency improvement

### Expected Improvement
- Match calculation: ~300ms → ~30ms
- Total API time: ~500ms → ~150ms

---

## 🟢 Priority 4: Warm Cache on Startup

**Goal**: Pre-populate program cache when server starts.

### What to Change

Use Next.js instrumentation to warm cache:

```typescript
// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { warmProgramsCache } = await import('./lib/matching/program-cache')
    await warmProgramsCache()
  }
}
```

### How to Test
1. Restart dev server
2. Check Redis for `programs:all:v1` key immediately
3. First API call should be cache hit

### Expected Improvement
- Eliminates cold start penalty
- First user always gets cache hit

---

## 🟢 Priority 5: Add Performance Logging

**Goal**: Track latency metrics for monitoring.

### What to Change

Add timing logs to API route:

```typescript
export async function GET() {
  const startTime = performance.now()
  
  // ... existing code ...
  
  const duration = performance.now() - startTime
  logger.info('matches_api_latency', {
    studentId,
    duration,
    cacheHit: !!cached,
    programCount: programs.length,
    matchCount: matches.length
  })
}
```

### How to Test
1. Check server logs for `matches_api_latency`
2. Verify all fields are logged

---

## Alternative to Vercel Cron (Free Options)

Since Vercel cron is limited on free tier, use one of these:

### Option A: Fire-and-Forget Fetch (Recommended) ✅
- No external service needed
- Works with current setup
- Pre-compute triggered inline after profile save
- See Priority 1 implementation above

### Option B: Upstash QStash (Free Tier)
- 500 messages/day free
- Reliable message queue
- Automatic retries
- https://upstash.com/qstash

### Option C: GitHub Actions (Free)
- Run on schedule (cron syntax)
- Free for public repos
- Can call your API endpoints
- Example: `0 */6 * * *` (every 6 hours)

**Recommendation**: Use Option A (fire-and-forget fetch) - it's simple, free, and doesn't require external services.

---

## Implementation Order

```
[ ] Priority 1: Pre-compute on profile save (~1 hour)
[ ] Priority 2: Extend cache TTL (~10 minutes)
[ ] Priority 3: Algolia pre-filtering (~3 hours)
[ ] Priority 4: Warm cache on startup (~30 minutes)
[ ] Priority 5: Performance logging (~30 minutes)
```

Total estimated time: ~5-6 hours
