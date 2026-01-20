# Admin Maintenance Tools Guide

This guide documents all available admin scripts and API endpoints for maintaining the IB Match platform.

---

## Quick Reference

| Task | Command/URL | When to Use |
|------|-------------|-------------|
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
