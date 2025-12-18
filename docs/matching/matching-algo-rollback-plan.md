# Matching Algorithm Rollback Plan: Version X → IX

**Version:** 1.0  
**Created:** December 2024  
**Status:** CRITICAL DOCUMENT  
**Owner:** Engineering Team  
**Last Updated:** December 2024

---

## ⚠️ CRITICAL: Read Before Any Rollback

This document provides step-by-step instructions to **fully revert** from Matching Algorithm Version X to Version IX. This includes:

1. Feature flag disabling (immediate, ~1 minute)
2. Code rollback (fast, ~5 minutes)
3. Database schema rollback (requires migration, ~15 minutes)
4. Cache invalidation (~2 minutes)
5. Verification (~10 minutes)

**Total Rollback Time:** ~30-45 minutes for full reversion

---

## ⚠️ IMPORTANT: Rollback Level Availability

**Not all rollback levels are available at all times.** The available level depends on which migration tasks have been completed.

### Rollback Level Prerequisites

| Rollback Level | Requires These Migration Tasks Completed |
|----------------|------------------------------------------|
| **Level 1: Feature Flags** | Task 4.2 (Feature Flag Implementation) |
| **Level 2: Code Rollback** | Any V10 code merged to main |
| **Level 3: DB Schema** | Task 1.1 (Database Schema Updates) |

### Current State Check

**Before attempting rollback, verify what exists:**

```bash
# Check if feature flags exist
ls lib/feature-flags/matching-v10.ts 2>/dev/null && echo "Level 1 AVAILABLE" || echo "Level 1 NOT AVAILABLE"

# Check if V10 scorer exists  
ls lib/matching/scorer-v10.ts 2>/dev/null && echo "Level 2 AVAILABLE" || echo "Level 2 NOT AVAILABLE"

# Check if V10 columns exist in database
psql $DATABASE_URL -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'Program' AND column_name = 'selectivityTier';" | grep -q selectivityTier && echo "Level 3 AVAILABLE" || echo "Level 3 NOT AVAILABLE"
```

### If Feature Flags DON'T Exist Yet

If Task 4.2 has not been completed, **Level 1 rollback is NOT available**. 

In this case:
- Skip directly to **Level 2 (Code Rollback)**
- The feature flag commands in Level 1 will not work
- This is expected during early implementation phases

---

## Table of Contents

1. [Rollback Decision Criteria](#1-rollback-decision-criteria)
2. [Rollback Levels](#2-rollback-levels)
3. [Level 1: Feature Flag Rollback (Immediate)](#3-level-1-feature-flag-rollback-immediate)
4. [Level 2: Code Rollback (Fast)](#4-level-2-code-rollback-fast)
5. [Level 3: Database Schema Rollback (Full)](#5-level-3-database-schema-rollback-full)
6. [Cache and State Cleanup](#6-cache-and-state-cleanup)
7. [Verification Procedures](#7-verification-procedures)
8. [Communication Plan](#8-communication-plan)
9. [Post-Rollback Analysis](#9-post-rollback-analysis)

---

## 1. Rollback Decision Criteria

### Trigger Immediate Rollback If:

| Severity | Condition | Action |
|----------|-----------|--------|
| **P0 - Critical** | Match scores returning NaN/undefined | Level 1 immediately |
| **P0 - Critical** | Recommendations API returning 500 errors | Level 1 immediately |
| **P0 - Critical** | Match scores all returning same value | Level 1 immediately |
| **P1 - High** | >20% variance in score distribution | Level 1, investigate |
| **P1 - High** | Latency >500ms (5x regression) | Level 1, investigate |
| **P1 - High** | User complaints about "wrong" recommendations | Level 1, investigate |
| **P2 - Medium** | Category distribution heavily skewed | Monitor, consider Level 1 |
| **P2 - Medium** | Confidence scores consistently low | Monitor, consider Level 1 |

### Decision Authority

| Level | Can Authorize | Notification Required |
|-------|---------------|----------------------|
| Level 1 (Feature Flags) | Any engineer on-call | Slack #incidents |
| Level 2 (Code Rollback) | Tech Lead or Senior Engineer | Slack + Email to stakeholders |
| Level 3 (DB Rollback) | Tech Lead + Product Owner | All stakeholders + scheduled maintenance |

---

## 2. Rollback Levels

```
┌─────────────────────────────────────────────────────────────┐
│                    ROLLBACK LEVELS                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Level 1: Feature Flags     ←── Fastest (~1 min)           │
│     ↓                            No deployment needed       │
│  Level 2: Code Rollback     ←── Fast (~5 min)              │
│     ↓                            Git revert + deploy        │
│  Level 3: DB Schema         ←── Full (~15-30 min)          │
│                                  Migration + data cleanup   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Important:** Each level is cumulative. Level 2 includes Level 1. Level 3 includes Levels 1 and 2.

---

## 3. Level 1: Feature Flag Rollback (Immediate)

> **⚠️ PREREQUISITE:** This level requires **Task 4.2 (Feature Flag Implementation)** to be completed.  
> If feature flags don't exist yet, skip to **Level 2**.

**Time to Complete:** ~1 minute  
**Risk:** Low  
**Reversible:** Yes (re-enable flags)

### Step 1.1: Disable All V10 Feature Flags

**Via Environment Variables (Vercel/Production):**

```bash
# In Vercel Dashboard → Settings → Environment Variables
# Or via CLI:

# Disable all V10 features
MATCHING_V10_ENABLED=false
MATCHING_V10_FIT_QUALITY=false
MATCHING_V10_SELECTIVITY=false
MATCHING_V10_ANTI_GAMING=false
MATCHING_V10_PERFORMANCE=false
MATCHING_V10_CATEGORIZATION=false
MATCHING_V10_CONFIDENCE=false
```

**Via Feature Flag Service (if using one):**

```javascript
// lib/feature-flags/matching-v10.ts
export const MATCHING_V10_FLAGS = {
  ENABLED: false,           // Master kill switch
  FIT_QUALITY: false,
  SELECTIVITY: false,
  ANTI_GAMING: false,
  PERFORMANCE: false,
  CATEGORIZATION: false,
  CONFIDENCE: false,
}
```

### Step 1.2: Verify Flag State

```bash
# Check current flag state via API (if endpoint exists)
curl -X GET https://ibmatch.com/api/internal/feature-flags \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Expected response:
# { "MATCHING_V10_ENABLED": false, ... }
```

### Step 1.3: Confirm V9 Behavior

```bash
# Test match calculation returns V9-style response
curl -X GET "https://ibmatch.com/api/students/matches" \
  -H "Authorization: Bearer $TEST_USER_TOKEN"

# Verify response does NOT contain:
# - "category" field
# - "confidence" field
# - "fitQuality" field
```

### Level 1 Verification Checklist

- [ ] All V10 feature flags set to `false`
- [ ] API returns V9-style responses (no category/confidence)
- [ ] Match scores appear normal (not using FQS)
- [ ] No errors in logs related to V10 code paths

---

## 4. Level 2: Code Rollback (Fast)

**Time to Complete:** ~5-10 minutes  
**Risk:** Medium (requires deployment)  
**Reversible:** Yes (re-deploy V10 code)

### Prerequisite: Complete Level 1 First

### Step 2.1: Identify Rollback Commit

```bash
# Find the last stable V9 commit before V10 merge
git log --oneline --grep="V10" --grep="matching" --since="2024-12-01"

# Or find the merge commit
git log --oneline --merges | head -20

# Example output:
# abc1234 Merge: Matching Algorithm V10 implementation
# def5678 Previous stable commit (V9) ← This is your target
```

### Step 2.2: Create Rollback Branch

```bash
# Create rollback branch from current main
git checkout main
git pull origin main
git checkout -b rollback/matching-v10-to-v9

# Revert the V10 changes (preserve DB schema for now)
git revert --no-commit <V10-merge-commit>

# Or selectively revert only algorithm files:
git checkout <v9-commit> -- lib/matching/
git checkout <v9-commit> -- app/api/students/matches/
```

### Step 2.3: Keep V10 Files But Disable

Rather than deleting V10 code, we can keep it disabled:

```typescript
// lib/matching/scorer.ts

import { calculateMatch as calculateMatchV9 } from './scorer-v9'
import { calculateMatch as calculateMatchV10 } from './scorer-v10'
import { isV10Enabled } from '../feature-flags/matching-v10'

export function calculateMatch(input: MatchInput): MatchResult {
  // V10 disabled - always use V9
  // if (isV10Enabled()) {
  //   return calculateMatchV10(input)
  // }
  return calculateMatchV9(input)
}
```

### Step 2.4: Deploy Rollback

```bash
# Commit the rollback
git add .
git commit -m "ROLLBACK: Disable Matching V10, revert to V9

Reason: [DESCRIBE ISSUE]
Ticket: [INCIDENT-XXX]
Rollback Level: 2 (Code)"

# Push and deploy
git push origin rollback/matching-v10-to-v9

# Create PR for audit trail (fast-track merge)
# OR direct push to main if emergency:
git checkout main
git merge rollback/matching-v10-to-v9
git push origin main
```

### Step 2.5: Trigger Deployment

```bash
# Vercel auto-deploys on push to main
# Or manual trigger:
vercel --prod

# Wait for deployment to complete
vercel logs --follow
```

### Level 2 Verification Checklist

- [ ] V10 code disabled or reverted
- [ ] Deployment successful (no build errors)
- [ ] API returns V9-style responses
- [ ] No V10 imports being executed
- [ ] Logs show V9 algorithm path

---

## 5. Level 3: Database Schema Rollback (Full)

**Time to Complete:** ~15-30 minutes  
**Risk:** High (data modification)  
**Reversible:** Partially (new columns can be re-added, data may be lost)

### ⚠️ CRITICAL: Prerequisites

1. **Complete Levels 1 and 2 first**
2. **Create database backup before proceeding**
3. **Schedule maintenance window if possible**
4. **Have DBA or senior engineer present**

### Step 3.1: Create Database Backup

```bash
# Backup production database
pg_dump $DATABASE_URL > backup_before_v10_rollback_$(date +%Y%m%d_%H%M%S).sql

# Or via Supabase Dashboard:
# Dashboard → Settings → Database → Backups → Create Backup

# Verify backup
ls -la backup_before_v10_rollback_*.sql
```

### Step 3.2: Review Schema Changes to Rollback

**V10 Added These Columns:**

```sql
-- Programs table
ALTER TABLE "Program" ADD COLUMN "selectivityTier" SMALLINT;
ALTER TABLE "Program" ADD COLUMN "requirementsVerified" BOOLEAN DEFAULT false;
ALTER TABLE "Program" ADD COLUMN "requirementsUpdatedAt" TIMESTAMP;

-- StudentProfile table
ALTER TABLE "StudentProfile" ADD COLUMN "openToAllFields" BOOLEAN DEFAULT false;
ALTER TABLE "StudentProfile" ADD COLUMN "openToAllLocations" BOOLEAN DEFAULT false;
```

### Step 3.3: Create Rollback Migration

```bash
# Create a new migration for rollback
npx prisma migrate dev --name rollback_matching_v10 --create-only
```

**Migration File: `prisma/migrations/[timestamp]_rollback_matching_v10/migration.sql`**

```sql
-- Rollback Migration: Remove V10 Schema Additions
-- WARNING: This will DROP columns and their data

-- ============================================
-- STEP 1: Backup data before dropping (CRITICAL)
-- ============================================

-- Create backup tables to preserve V10 data if needed later
CREATE TABLE IF NOT EXISTS "_backup_v10_program_data" AS
SELECT 
    id,
    "selectivityTier",
    "requirementsVerified",
    "requirementsUpdatedAt"
FROM "Program"
WHERE "selectivityTier" IS NOT NULL 
   OR "requirementsVerified" = true;

CREATE TABLE IF NOT EXISTS "_backup_v10_student_data" AS
SELECT 
    id,
    "openToAllFields",
    "openToAllLocations"
FROM "StudentProfile"
WHERE "openToAllFields" = true 
   OR "openToAllLocations" = true;

-- ============================================
-- STEP 2: Drop V10 columns from Program table
-- ============================================

-- Check if columns exist before dropping (idempotent)
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'Program' AND column_name = 'selectivityTier'
    ) THEN
        ALTER TABLE "Program" DROP COLUMN "selectivityTier";
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'Program' AND column_name = 'requirementsVerified'
    ) THEN
        ALTER TABLE "Program" DROP COLUMN "requirementsVerified";
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'Program' AND column_name = 'requirementsUpdatedAt'
    ) THEN
        ALTER TABLE "Program" DROP COLUMN "requirementsUpdatedAt";
    END IF;
END $$;

-- ============================================
-- STEP 3: Drop V10 columns from StudentProfile table
-- ============================================

DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'StudentProfile' AND column_name = 'openToAllFields'
    ) THEN
        ALTER TABLE "StudentProfile" DROP COLUMN "openToAllFields";
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'StudentProfile' AND column_name = 'openToAllLocations'
    ) THEN
        ALTER TABLE "StudentProfile" DROP COLUMN "openToAllLocations";
    END IF;
END $$;

-- ============================================
-- STEP 4: Drop V10 materialized views (if created)
-- ============================================

DROP MATERIALIZED VIEW IF EXISTS "program_match_data";
DROP INDEX IF EXISTS "idx_program_match_points";
DROP INDEX IF EXISTS "idx_program_match_field";
DROP INDEX IF EXISTS "idx_program_match_country";
DROP INDEX IF EXISTS "idx_program_match_tier";
DROP INDEX IF EXISTS "idx_program_match_subjects";

-- ============================================
-- STEP 5: Drop V10 functions (if created)
-- ============================================

DROP FUNCTION IF EXISTS "refresh_program_match_data"();
DROP FUNCTION IF EXISTS "get_candidate_programs"(INTEGER, TEXT[], INTEGER[]);

-- ============================================
-- ROLLBACK COMPLETE
-- ============================================
-- Backup tables preserved:
--   _backup_v10_program_data
--   _backup_v10_student_data
-- 
-- To fully clean up backup tables later:
--   DROP TABLE IF EXISTS "_backup_v10_program_data";
--   DROP TABLE IF EXISTS "_backup_v10_student_data";
```

### Step 3.4: Update Prisma Schema

**Revert `prisma/schema.prisma` to V9 state:**

```prisma
model Program {
  id                    String   @id @default(cuid())
  name                  String
  // ... other existing fields ...
  
  // REMOVE these V10 fields:
  // selectivityTier       Int?
  // requirementsVerified  Boolean  @default(false)
  // requirementsUpdatedAt DateTime?
}

model StudentProfile {
  id                    String   @id @default(cuid())
  // ... other existing fields ...
  
  // REMOVE these V10 fields:
  // openToAllFields       Boolean @default(false)
  // openToAllLocations    Boolean @default(false)
}
```

### Step 3.5: Execute Rollback Migration

```bash
# Apply the rollback migration
npx prisma migrate deploy

# Regenerate Prisma client
npx prisma generate

# Verify schema matches V9
npx prisma db pull
diff prisma/schema.prisma prisma/schema.prisma.v9-backup
```

### Step 3.6: Verify Database State

```sql
-- Verify V10 columns are removed
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'Program' 
AND column_name IN ('selectivityTier', 'requirementsVerified', 'requirementsUpdatedAt');
-- Should return 0 rows

SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'StudentProfile' 
AND column_name IN ('openToAllFields', 'openToAllLocations');
-- Should return 0 rows

-- Verify backup tables exist
SELECT COUNT(*) FROM "_backup_v10_program_data";
SELECT COUNT(*) FROM "_backup_v10_student_data";
```

### Level 3 Verification Checklist

- [ ] Database backup created and verified
- [ ] V10 columns removed from Program table
- [ ] V10 columns removed from StudentProfile table
- [ ] Materialized views dropped (if created)
- [ ] Backup tables created with V10 data
- [ ] Prisma schema reverted to V9
- [ ] Prisma client regenerated
- [ ] Application starts without errors
- [ ] No TypeScript errors related to missing V10 fields

---

## 6. Cache and State Cleanup

### Step 6.1: Invalidate Redis Cache

```bash
# Connect to Redis and flush matching cache
redis-cli -u $REDIS_URL

# Flush all matching-related keys
redis-cli KEYS "match:*" | xargs redis-cli DEL
redis-cli KEYS "program-index:*" | xargs redis-cli DEL
redis-cli KEYS "student-vector:*" | xargs redis-cli DEL

# Or flush entire cache (nuclear option)
redis-cli FLUSHALL
```

### Step 6.2: Invalidate Application Cache

```typescript
// Call cache invalidation endpoint (if exists)
// POST /api/internal/cache/invalidate

// Or restart all instances to clear in-memory caches
// Vercel: Redeploy triggers fresh instances
```

### Step 6.3: Clear Precomputed Matches (if applicable)

```sql
-- If precomputed match scores were stored
DELETE FROM "PrecomputedMatch" WHERE "algorithmVersion" = 'V10';
-- Or truncate if all need refresh
TRUNCATE TABLE "PrecomputedMatch";
```

---

## 7. Verification Procedures

### 7.1: Smoke Tests

```bash
# Run matching smoke tests
npm run test:matching:smoke

# Or manually test key scenarios:

# Test 1: Basic match calculation
curl -X GET "https://ibmatch.com/api/students/matches" \
  -H "Authorization: Bearer $TEST_USER_TOKEN" \
  | jq '.matches[0] | {score: .overallScore, hasCategory: has("category")}'
# Expected: { "score": 0.XX, "hasCategory": false }

# Test 2: Match breakdown
curl -X GET "https://ibmatch.com/api/students/matches" \
  -H "Authorization: Bearer $TEST_USER_TOKEN" \
  | jq '.matches[0].academicMatch'
# Should NOT contain "pointsFitQuality"

# Test 3: Response latency
time curl -X GET "https://ibmatch.com/api/students/matches" \
  -H "Authorization: Bearer $TEST_USER_TOKEN"
# Should be similar to pre-V10 baseline
```

### 7.2: Integration Tests

```bash
# Run full integration test suite
npm run test:integration

# Specifically matching tests
npm run test:matching
```

### 7.3: Score Comparison (Spot Check)

```javascript
// Compare scores for known test cases
const testCases = [
  { studentPoints: 45, requiredPoints: 40, expectedV9Score: 1.0 },
  { studentPoints: 38, requiredPoints: 40, expectedV9Score: 0.80 }, // approximately
  { studentPoints: 45, requiredPoints: 28, expectedV9Score: 1.0 },  // V9 doesn't penalize overqualification
];

for (const tc of testCases) {
  const result = await calculateMatch(tc);
  console.assert(
    Math.abs(result.overallScore - tc.expectedV9Score) < 0.1,
    `Score mismatch: expected ~${tc.expectedV9Score}, got ${result.overallScore}`
  );
}
```

### 7.4: Health Check Dashboard

Monitor these metrics for 30 minutes post-rollback:

| Metric | Expected | Alert Threshold |
|--------|----------|-----------------|
| API Error Rate | < 0.1% | > 1% |
| Match Latency p95 | < 200ms | > 500ms |
| Score Distribution | Normal bell curve | Highly skewed |
| Null/Invalid Scores | 0 | > 0 |

---

## 8. Communication Plan

### During Rollback

```markdown
## Slack #incidents

🚨 **INCIDENT: Matching Algorithm Rollback in Progress**

**Time:** [TIMESTAMP]
**Severity:** [P0/P1/P2]
**Issue:** [Brief description]
**Action:** Rolling back Matching V10 to V9
**ETA:** ~[X] minutes
**Lead:** [Engineer Name]

Updates will be posted here every 5 minutes.
```

### After Rollback Complete

```markdown
## Slack #incidents

✅ **RESOLVED: Matching Algorithm Rollback Complete**

**Time Completed:** [TIMESTAMP]
**Rollback Level:** [1/2/3]
**Duration:** [X] minutes
**Verification:** All smoke tests passing

**Next Steps:**
- [ ] Post-incident review scheduled for [DATE/TIME]
- [ ] Root cause analysis in progress
- [ ] V10 fixes will be tracked in [TICKET]
```

### Stakeholder Email (for Level 2/3)

```markdown
Subject: [INCIDENT] Matching Algorithm Rolled Back

Team,

We have rolled back the Matching Algorithm from Version X to Version IX due to [ISSUE].

**Impact:**
- Match recommendations are now using the previous algorithm
- [Any user-facing changes]

**Timeline:**
- Issue detected: [TIME]
- Rollback initiated: [TIME]
- Rollback completed: [TIME]

**Next Steps:**
- Root cause analysis will be completed by [DATE]
- Updated V10 will be re-planned after analysis

Please reach out to [CONTACT] with any questions.

Engineering Team
```

---

## 9. Post-Rollback Analysis

### Incident Report Template

```markdown
# Matching V10 Rollback Incident Report

## Summary
- **Date:** 
- **Duration:** 
- **Rollback Level:** 
- **Impact:** 

## Timeline
| Time | Event |
|------|-------|
| HH:MM | Issue first detected |
| HH:MM | Investigation started |
| HH:MM | Rollback decision made |
| HH:MM | Rollback Level X initiated |
| HH:MM | Rollback completed |
| HH:MM | Verification passed |

## Root Cause
[Description of what went wrong]

## Detection
[How was the issue detected?]

## Resolution
[What was done to resolve?]

## Lessons Learned
1. 
2. 
3. 

## Action Items
- [ ] [Action 1] - Owner - Due Date
- [ ] [Action 2] - Owner - Due Date

## Re-Rollout Plan
[Conditions and timeline for attempting V10 again]
```

### Pre-Requisites for V10 Re-Rollout

Before attempting V10 deployment again:

- [ ] Root cause identified and fixed
- [ ] Additional test cases added for failure scenario
- [ ] Code review by second engineer
- [ ] Extended canary period (5% → 10% → 25% → 50% → 100%)
- [ ] Enhanced monitoring alerts configured
- [ ] Rollback tested in staging environment

---

## Quick Reference: Emergency Commands

```bash
# ============================================
# LEVEL 1: Disable Feature Flags (Fastest)
# ============================================
# Via Vercel CLI:
vercel env rm MATCHING_V10_ENABLED production
vercel env add MATCHING_V10_ENABLED false production
# Then redeploy or wait for env sync

# ============================================
# LEVEL 2: Code Rollback
# ============================================
git checkout main
git revert <V10-commit> --no-commit
git commit -m "ROLLBACK: Matching V10 to V9"
git push origin main
# Wait for auto-deploy

# ============================================
# LEVEL 3: Database Rollback
# ============================================
# 1. Backup first!
pg_dump $DATABASE_URL > backup_$(date +%s).sql

# 2. Run migration
npx prisma migrate deploy

# 3. Regenerate client
npx prisma generate

# 4. Restart app
vercel --prod

# ============================================
# CACHE CLEANUP
# ============================================
redis-cli -u $REDIS_URL FLUSHALL
```

---

## Appendix: File Locations

| Purpose | Location |
|---------|----------|
| Feature Flags | `lib/feature-flags/matching-v10.ts` |
| V9 Scorer | `lib/matching/scorer.ts` (original) |
| V10 Scorer | `lib/matching/scorer-v10.ts` (new) |
| Rollback Migration | `prisma/migrations/[timestamp]_rollback_matching_v10/` |
| V9 Schema Backup | `prisma/schema.prisma.v9-backup` |
| This Document | `docs/matching/matching-algo-rollback-plan.md` |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Dec 2024 | Engineering | Initial rollback plan |

---

*This is a CRITICAL document. Keep updated with any schema or architecture changes.*

---

*Document End*
