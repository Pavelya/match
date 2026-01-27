# Admin Maintenance Tools Guide

This guide documents all available admin scripts and API endpoints for maintaining the IB Match platform.

---

## Quick Reference

| Task | Command/URL | When to Use |
|------|-------------|-------------|
| **Run all tests** | `npx tsx scripts/run-all-tests.ts` | Before deploying changes or after bug fixes |
| **Invalidate all caches** | `/api/admin/cache/invalidate` | After bulk imports or direct DB changes |
| **Clear matching cache** | See [After Matching Algorithm Changes](#after-matching-algorithm-code-changes) | After deploying matching code changes |
| **Sync programs to Algolia** | `npx tsx scripts/sync-to-algolia-standalone.ts` | After bulk imports |
| **Check Algolia status** | `npx tsx scripts/check-algolia.ts` | Verify search index health |
| **Invalidate Redis cache** | `npx tsx scripts/invalidate-program-cache.ts` | After university updates |


---

## API Endpoints (Browser Access)

These endpoints require admin login. Visit the URL in your browser while logged in as `PLATFORM_ADMIN`.

### Cache Invalidation

**URL:** `http://localhost:3000/api/admin/cache/invalidate`

**Purpose:** Invalidates Next.js reference data caches (countries with programs, fields of study, etc.)

**When to use:**
- After running seed scripts
- After manually adding programs/universities to the database
- When new locations don't appear in student onboarding

**Expected response:**
```json
{
  "success": true,
  "message": "All reference data caches invalidated",
  "invalidatedTags": ["countries-with-programs", "countries", "fields-of-study", "ib-courses"]
}
```

---

## CLI Scripts

All scripts are run from the project root directory.

### Algolia Search Index

#### Check Algolia Status
```bash
npx tsx scripts/check-algolia.ts
```
**Purpose:** Shows the status of all Algolia indexes with record counts and sample data.

**Use when:** Verifying search is working, debugging search issues.

---

#### Check Algolia vs Database Sync
```bash
npx tsx scripts/check-algolia-status.ts
```
**Purpose:** Compares database program count with Algolia record count and identifies missing programs.

**Use when:** Search results seem incomplete.

---

#### Sync All Programs to Algolia
```bash
npx tsx scripts/sync-to-algolia-standalone.ts
```
**Purpose:** Syncs all programs from the database to Algolia search index.

**Use when:** 
- After bulk imports via seed scripts
- After database restoration
- When Algolia is out of sync

**Note:** This is the primary sync script. It handles all program data transformation.

---

#### Manual Algolia Sync (Quick)
```bash
npx tsx scripts/manual-algolia-sync.ts
```
**Purpose:** Quick sync using the built-in library function.

**Use when:** Need a faster sync without detailed logging.

---

#### Sync Universities to Algolia
```bash
npx tsx scripts/sync-universities-algolia.ts
```
**Purpose:** Syncs all universities to the universities_production Algolia index.

**Use when:** After adding or updating universities.

---

#### Configure Algolia Settings
```bash
npx tsx scripts/configure-algolia-settings.ts
```
**Purpose:** Sets up searchable attributes, faceting, and custom ranking for Algolia indexes.

**Use when:** 
- Initial setup
- After changing search requirements
- When search relevance needs tuning

---

#### Find Algolia Orphans
```bash
# Check for orphan records
npx tsx scripts/find-algolia-orphans.ts

# Delete orphan records
npx tsx scripts/find-algolia-orphans.ts --delete
```
**Purpose:** Finds records in Algolia that no longer exist in the database.

**Use when:** 
- After deleting programs
- When Algolia has more records than the database
- Periodic cleanup

---

#### Initialize Algolia (First-time Setup)
```bash
ALGOLIA_ADMIN_API_KEY=<key> npx tsx scripts/algolia-init.ts
```
**Purpose:** Verifies Algolia connection and lists existing indexes.

**Use when:** Setting up a new environment.

---

### Cache Management

#### Invalidate Redis Program Cache
```bash
npx tsx scripts/invalidate-program-cache.ts
```
**Purpose:** Clears the Redis cache for matching algorithm program data and warms it with fresh data.

**Use when:**
- After updating university images, names, or logos
- After bulk program updates
- When student matches show stale data

**What it does:**
1. Clears Redis cache
2. Fetches fresh data from database
3. Warms the cache with new data

---

### Data Management

#### Fix University Images
```bash
npx tsx scripts/fix-university-images.ts
```
**Purpose:** Migrates university images from base64 to Supabase Storage URLs.

**Use when:**
- Images not appearing in search results
- After importing universities with base64 images

**What it does:**
1. Finds universities with base64 images
2. Uploads images to Supabase Storage
3. Updates database with URLs
4. Syncs affected programs to Algolia
5. Invalidates program cache

---

### Testing & Diagnostics

#### Test Redis Connection
```bash
npx tsx scripts/test-redis.ts
```
**Purpose:** Verifies Redis connection is working.

**Use when:** Debugging cache issues.

---

#### Test Algolia Auto-sync
```bash
npx tsx scripts/test-algolia-autosync.ts
```
**Purpose:** Tests that Prisma extension auto-syncs to Algolia.

**Use when:** Verifying automatic sync is working.

---

#### Test Reference Data Sync
```bash
npx tsx scripts/test-reference-sync.ts
```
**Purpose:** Tests reference data synchronization.

**Use when:** Debugging reference data issues.

---

#### Performance Test
```bash
npx tsx scripts/perf-test.ts
```
**Purpose:** Runs performance benchmarks for the matching algorithm.

**Use when:** Performance optimization work.

---

### Verification Tests

The matching algorithm has a comprehensive verification test suite. All test files use the `.verify.ts` extension and can be run individually or all at once.

#### Run All Verification Tests
```bash
npx tsx scripts/run-all-tests.ts
```

**Purpose:** Runs all 20+ verification tests for the matching algorithm.

**When to use:**
- Before deploying matching algorithm changes
- After fixing bugs in the matching logic
- To verify system integrity after updates
- As part of CI/CD pipeline

**Expected output:**
```
🎉 All tests passed! Matching algorithm is working correctly.

📈 Overall Results:
   ✅ Passed: 20/20
   ❌ Failed: 0/20
   📊 Success Rate: 100.0%
```

**What it tests:**
- Academic matching logic
- Subject requirement matching (including OR-groups)
- Field of study matching
- Location/country matching
- Points and grade calculations
- Cache operations (Redis & memoization)
- Penalty system
- Confidence scoring
- Fit quality scoring
- Match categorization (SAFETY/MATCH/REACH/UNLIKELY)
- Performance optimizations
- Data validation

---

#### Run Individual Verification Tests

All test files are in `/lib/matching/` with the `.verify.ts` extension.

**Core Matching:**
```bash
# Academic matching (subjects, grades, levels)
npx tsx lib/matching/academic-matcher.verify.ts

# Subject requirement matching
npx tsx lib/matching/subject-matcher.verify.ts

# OR-group display fix verification
npx tsx lib/matching/or-group-display-verify.ts

# Field of study matching
npx tsx lib/matching/field-matcher.verify.ts

# Location/country matching
npx tsx lib/matching/location-matcher.verify.ts
```

**Scoring & Categorization:**
```bash
# Overall score calculation
npx tsx lib/matching/scorer.verify.ts

# Points fit quality
npx tsx lib/matching/fit-quality.verify.ts

# Confidence scoring (High/Medium/Low)
npx tsx lib/matching/confidence.verify.ts

# Match categories (SAFETY/MATCH/REACH)
npx tsx lib/matching/categorization.verify.ts

# Selectivity boost for top programs
npx tsx lib/matching/selectivity.verify.ts
```

**Penalties & Requirements:**
```bash
# Unified penalty system
npx tsx lib/matching/unified-penalties.verify.ts

# Individual penalties
npx tsx lib/matching/penalties.verify.ts
```

**Performance & Optimization:**
```bash
# Optimized matcher with candidate filtering
npx tsx lib/matching/optimized-matcher.verify.ts

# Program index for fast filtering
npx tsx lib/matching/program-index.verify.ts

# Student capability vector (O(1) lookups)
npx tsx lib/matching/student-capability-vector.verify.ts

# Cache operations
npx tsx lib/matching/cache.verify.ts

# Memoization cache
npx tsx lib/matching/memo-cache.verify.ts
```

**Utilities:**
```bash
# Preference validation & anti-gaming
npx tsx lib/matching/preference-validator.verify.ts

# Enhanced match result structure
npx tsx lib/matching/enhanced-match-result.verify.ts

# Matching metrics tracking
npx tsx lib/matching/matching-metrics.verify.ts
```

---

#### Understanding Test Output

**Passing test:**
```
✅ PASS: [Test Name]
```

**Failing test:**
```
❌ FAIL: [Test Name]
   Error: [description]
```

**Detailed test output:**
Each verification script includes detailed output showing:
- Test scenario descriptions
- Expected vs actual values
- Assertion results
- Performance metrics (when applicable)

**Example from OR-group display verification:**
```
📋 Test 1: Full match - Computer Science (not Biology)
✅ PASS: Status is FULL_MATCH
✅ PASS: Score is 1.0
✅ PASS: matchedCourseId is cs-hl
✅ PASS: matchedCourseName is Computer Science
✅ PASS: Reason includes Computer Science
✅ PASS: Reason does NOT include Biology
```

---

#### When Tests Fail

If tests fail after making changes:

1. **Review the error message** - Each test shows what was expected vs what was received
2. **Check recent changes** - Review modifications to matching algorithm code
3. **Run specific test** - Isolate the failing test for detailed debugging:
   ```bash
   npx tsx lib/matching/[failing-test].verify.ts
   ```
4. **Verify data integrity** - Ensure test data matches current types/interfaces
5. **Check dependencies** - Ensure all imports and types are up to date

**Common issues:**
- Type mismatches after interface updates
- Logic changes that alter expected scores
- Cache state affecting results (restart Redis if needed)

---

## Seed Scripts (programs folder)

Scripts in `/scripts/programs/` are for seeding university and program data.

| Script | University | Programs |
|--------|------------|----------|
| `seed-programs.ts` | Sample universities | 20 sample programs |
| `seed-amsterdam-programs.ts` | Amsterdam | Multiple programs |
| `seed-manchester-programs.ts` | Manchester | Complete catalog |
| `seed-mcgill-programs.ts` | McGill (batch 1) | Programs |
| `seed-mcgill-programs-batch2.ts` | McGill (batch 2) | Additional programs |
| `seed-melbourne-programs.ts` | Melbourne | Programs |
| `seed-tudelft-programs.ts` | TU Delft | Engineering programs |
| `seed-ubc-programs.ts` | UBC | Complete catalog |

### After Running Seed Scripts

After running any seed script, perform these steps to ensure data is fully synced:

1. **Sync to Algolia:**
   ```bash
   npx tsx scripts/sync-to-algolia-standalone.ts
   ```

2. **Invalidate caches** (visit in browser while logged in as admin):
   ```
   http://localhost:3000/api/admin/cache/invalidate
   ```

3. **Verify sync:**
   ```bash
   npx tsx scripts/check-algolia-status.ts
   ```

---

## Common Workflows

### New University Added via Seed Script

```bash
# 1. Run your seed script
npx tsx scripts/programs/seed-<university>-programs.ts

# 2. Sync to Algolia
npx tsx scripts/sync-to-algolia-standalone.ts

# 3. Invalidate caches (in browser)
# Visit: http://localhost:3000/api/admin/cache/invalidate

# 4. Verify
npx tsx scripts/check-algolia.ts
```

### Search Not Working / Missing Programs

```bash
# 1. Check Algolia status
npx tsx scripts/check-algolia-status.ts

# 2. If programs missing, sync all
npx tsx scripts/sync-to-algolia-standalone.ts

# 3. Configure settings if needed
npx tsx scripts/configure-algolia-settings.ts
```

### Student Matches Showing Old Data

```bash
# 1. Invalidate Redis program cache
npx tsx scripts/invalidate-program-cache.ts

# 2. Invalidate Next.js caches (in browser)
# Visit: http://localhost:3000/api/admin/cache/invalidate
```

### After Matching Algorithm Code Changes

When deploying changes to the matching algorithm code (in `lib/matching/`), cached match results become stale because the cache key doesn't include an algorithm version.

**When to use:**
- After modifying `lib/matching/*.ts` files (scorer, optimized-matcher, penalties, etc.)
- After deploying fixes that change how matches are calculated
- When students see unexpected match counts (e.g., fewer than 10 programs)

**Clear ALL matching cache globally:**
```bash
npx tsx -e "require('dotenv').config(); require('./lib/matching/cache').clearAllMatchCache().then(() => console.log('✅ All matching cache cleared'))"
```

**Clear cache for a specific student:**
```bash
npx tsx -e "require('dotenv').config(); require('./lib/matching/cache').invalidateStudentCache('USER_ID_HERE').then(() => console.log('✅ Student cache cleared'))"
```

> **Note:** Student-level cache is automatically invalidated when they update their profile. This manual step is only needed after algorithm code changes.

### Images Not Appearing in Search

```bash
# 1. Fix images (uploads to Supabase)
npx tsx scripts/fix-university-images.ts

# 2. Sync to Algolia
npx tsx scripts/sync-to-algolia-standalone.ts
```

---

## Environment Variables Required

Most scripts require these environment variables (in `.env`):

```env
# Database
DATABASE_URL=...
DIRECT_URL=...

# Algolia
ALGOLIA_APP_ID=...
ALGOLIA_ADMIN_API_KEY=...

# Redis (for cache scripts)
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

---

## Troubleshooting

### "Missing Algolia credentials" Error
Ensure `ALGOLIA_APP_ID` and `ALGOLIA_ADMIN_API_KEY` are set in `.env`.

### "Unauthorized" Error on API Endpoints
You must be logged in as `PLATFORM_ADMIN` to access admin API endpoints.

### New Country Not Appearing in Onboarding
1. Ensure the country has at least one university with at least one program
2. Visit `/api/admin/cache/invalidate` in browser
3. Refresh the onboarding page

### Algolia Record Count Doesn't Match Database
Run the full sync and orphan cleanup:
```bash
npx tsx scripts/sync-to-algolia-standalone.ts
npx tsx scripts/find-algolia-orphans.ts --delete
```
