# Task: Filter Locations in Student Onboarding by Available University Programs

**Date:** 2025-01-17  
**Status:** Proposed  
**Priority:** Medium  
**Impact:** UX Improvement / Data Integrity

---

## Problem Statement

The IB Match platform has a central `Country` table used for two purposes:
1. **University locations** - Where universities are based (and their programs)
2. **IB School locations** - Where IB schools are registered

During student onboarding (Step 2: Location Preferences), students see **all countries** in the system, including those that:
- Have IB schools but **no universities** with programs
- Have universities but **no programs** seeded yet

This creates a poor UX where students might select a location expecting to find matches, but receive zero results because no university programs exist there.

---

## Current Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Country Table                             │
│  (Central storage for all locations)                             │
├─────────────────────────────────────────────────────────────────┤
│  Used by:                                                        │
│  ├── University.countryId  → University has programs            │
│  ├── IBSchool.countryId    → School location                    │
│  └── StudentProfile.preferredCountries → Student preferences    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    Student Onboarding Flow                       │
├─────────────────────────────────────────────────────────────────┤
│  Step 1: Select Fields of Study                                 │
│  Step 2: Select Countries ← ALL countries shown                 │
│  Step 3: Enter IB Grades                                        │
└─────────────────────────────────────────────────────────────────┘
```

**Files Involved:**
- `lib/reference-data.ts` - `getCachedCountries()` fetches all countries
- `app/student/onboarding/page.tsx` - Passes all countries to client
- `components/student/LocationSelector.tsx` - Renders country cards

---

## Proposed Solutions

### Option A: Pre-computed "Countries with Programs" Cache (Recommended)

**Approach:** Create a separate cached query that returns only countries with at least one university that has programs.

**Implementation:**

#### Task A1: Create New Cached Query
**Goal:** Add a new cached function to fetch only countries with active programs.  
**Outcome:** New function `getCachedCountriesWithPrograms()` in `lib/reference-data.ts`.

```typescript
// In lib/reference-data.ts
export const getCachedCountriesWithPrograms = unstable_cache(
  async () => {
    return prisma.country.findMany({
      where: {
        universities: {
          some: {
            programs: {
              some: {} // At least one program exists
            }
          }
        }
      },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        code: true,
        flagEmoji: true
      }
    })
  },
  ['countries-with-programs'],
  { revalidate: CACHE_TTL, tags: ['countries-with-programs'] }
)
```

**Performance:**
- One-time DB query per cache TTL (1 hour)
- O(1) on page load after cache hit
- No runtime filtering needed

#### Task A2: Update Onboarding Page
**Goal:** Use the new cached query for student onboarding.  
**Outcome:** Students only see locations where they can actually find programs.

```diff
// In app/student/onboarding/page.tsx
- const countries = await getCachedCountries()
+ const countries = await getCachedCountriesWithPrograms()
```

#### Task A3: Cache Invalidation on Program Changes
**Goal:** Invalidate the cache when programs are added/deleted.  
**Outcome:** New countries appear automatically when their first program is added.

**Files to update:**
- `app/api/admin/programs/route.ts` - POST (create program)
- `app/api/admin/programs/[id]/route.ts` - DELETE (delete program)
- `lib/algolia/middleware.ts` - Algolia sync hooks (if programs created via sync)

```typescript
import { revalidateTag } from 'next/cache'
// After program create/delete:
revalidateTag('countries-with-programs')
```

#### Task A4: Preserve Original Query for Admin
**Goal:** Keep `getCachedCountries()` for admin pages.  
**Outcome:** Admins can still see all countries for school/university creation.

---

### Option B: Client-Side Filtering with Preloaded Data

**Approach:** Fetch countries with program counts and filter client-side.

**Pros:**
- Single source of truth
- Can show "No programs available" badge

**Cons:**
- Larger payload (includes count data)
- Client-side filtering logic

**Not recommended** due to unnecessary data transfer and added complexity.

---

### Option C: Database View / Materialized View

**Approach:** Create a PostgreSQL materialized view for countries with programs.

**Pros:**
- Fastest query performance
- Database-level caching

**Cons:**
- Requires database migration
- Need to schedule refresh (REFRESH MATERIALIZED VIEW)
- More complex infrastructure

**Consider for future** if performance becomes critical.

---

## Recommendation

**Option A** is the best balance of:
- ✅ Performance (cached query, ~1 hour revalidation)
- ✅ Simplicity (minimal code changes)
- ✅ Maintainability (uses existing Next.js caching patterns)
- ✅ Zero runtime overhead per page load (after cache warm)

---

## Implementation Checklist

### Phase 1: Core Implementation

- [x] **Task 1.1:** Add `getCachedCountriesWithPrograms()` function
  - File: `lib/reference-data.ts`
  - Goal: Create cached query for countries with programs
  - Outcome: New export available for use

- [x] **Task 1.2:** Update student onboarding to use new query
  - File: `app/student/onboarding/page.tsx`
  - Goal: Replace `getCachedCountries()` with `getCachedCountriesWithPrograms()`
  - Outcome: Students only see relevant locations

### Phase 2: Cache Invalidation

- [x] **Task 2.1:** Add cache invalidation on program creation
  - File: `app/api/admin/programs/route.ts`
  - Goal: Invalidate cache when new program is created
  - Outcome: New countries appear when their first program is added

- [x] **Task 2.2:** Add cache invalidation on program deletion
  - File: `app/api/admin/programs/[id]/route.ts`
  - Goal: Invalidate cache when program is deleted
  - Outcome: Countries disappear when their last program is removed

- [x] **Task 2.3:** Add cache invalidation on bulk program import
  - File: Review bulk import scripts in `/scripts/programs/`
  - Goal: Ensure bulk operations also invalidate the cache
  - Outcome: Cache auto-expires in 1 hour; use existing `scripts/invalidate-program-cache.ts` after bulk imports if needed immediately

### Phase 3: Testing & Verification

- [ ] **Task 3.1:** Verify onboarding shows filtered countries
  - Test with a country that has no programs
  - Confirm it doesn't appear in step 2

- [ ] **Task 3.2:** Verify cache invalidation works
  - Add a program to a previously empty country
  - Confirm the country appears after cache revalidation

- [ ] **Task 3.3:** Verify admin pages still show all countries
  - University creation should show all countries
  - School creation should show all countries

---

## Performance Impact Analysis

| Metric | Before | After |
|--------|--------|-------|
| Page load query | `SELECT * FROM countries` | Cached result (0ms after warm) |
| Cache revalidation | Every 1 hour | Every 1 hour |
| Payload size | All countries (~10) | Only relevant countries (~6-8) |
| User experience | May see empty locations | Only actionable locations |

**Note:** Current production has ~10 countries seeded. As the platform scales, this optimization becomes more valuable.

---

## Edge Cases

1. **New country with first program added**
   - Cache invalidation triggers on program creation
   - Country appears in student onboarding on next page load (after cache refresh)

2. **Last program in a country deleted**
   - Cache invalidation triggers on program deletion
   - Country disappears from student onboarding on next page load

3. **Race condition with cache**
   - Worst case: 1 hour delay before changes visible
   - Acceptable for this use case (not time-critical)

4. **Admin adds country but no university yet**
   - Country won't appear in student onboarding (correct behavior)
   - Admin can still use it for university/school creation

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `lib/reference-data.ts` | Modify | Add new cached query function |
| `app/student/onboarding/page.tsx` | Modify | Use new query for countries |
| `app/api/admin/programs/route.ts` | Modify | Add cache invalidation on POST |
| `app/api/admin/programs/[id]/route.ts` | Modify | Add cache invalidation on DELETE |

---

## Acceptance Criteria

1. ✅ Students only see countries with at least one university program in onboarding
2. ✅ Cache is invalidated when programs are created or deleted
3. ✅ Admin pages continue to show all countries for management
4. ✅ No noticeable performance degradation
5. ✅ Existing student profiles with "orphaned" country preferences continue to work

---

## Related Documentation

- [Matching Algorithm V10](./matching/DOC_2_matching-algo%20X.md)
- [Technical Architecture](./product/DOC_3_technical-architecture.md)
- Reference Data Cache: `lib/reference-data.ts`
