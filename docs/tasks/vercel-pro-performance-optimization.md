# Vercel Pro Performance Optimization Tasks

> **Created**: December 31, 2024  
> **Status**: Ready for Implementation  
> **Context**: Vercel account upgraded to Pro plan - optimization opportunities unlocked

---

## Executive Summary

This document outlines performance optimization tasks to leverage the Vercel Pro plan features and control costs. The analysis covers code-level optimizations, Vercel Pro settings, cost management strategies, and regional alignment between services.

### Current Architecture Overview

| Service | Purpose | Region/Config |
|---------|---------|---------------|
| Vercel | Hosting & Serverless Functions | To verify |
| Vercel Postgres | Primary Database | Via DATABASE_URL |
| Upstash Redis | Matching cache, Sessions | Via REST API |
| Algolia | Program search (< 50ms) | Global CDN |
| Resend | Transactional emails | N/A |
| Supabase | Image storage | Via NEXT_PUBLIC_SUPABASE_URL |

### Pages Analyzed

| Page | Current Optimization Status | Notes |
|------|---------------------------|-------|
| `/student/matches` | ✅ Optimized | V10 algorithm, Redis cache, 30min TTL |
| `/student/saved` | ⚠️ Needs review | Suspense loading, but no explicit caching |
| `/student/onboarding` | ✅ Optimized | Reference data cached (1hr TTL) |
| `/programs/search` | ✅ Optimized | Algolia-powered (< 50ms) |
| `/student/settings` | ⚠️ Needs review | Direct Prisma query on each load |
| `/coordinator/*` | ⚠️ Sequential queries | Multiple await statements |
| `/admin/*` | ✅ Good | Parallel queries with Promise.all |
| Landing pages | ✅ Static | No DB queries |

---

## Task 1: Enable Vercel Pro Caching Features

**Goal**: Configure Vercel's Pro-tier caching capabilities to reduce function invocations and improve response times.

**Expected Outcome**: 
- Cache-Control headers properly configured
- Data Cache enabled with appropriate settings
- Reduced function invocations for repeated requests

### 1.1 Configure Vercel Data Cache

Vercel Pro includes Data Cache for `fetch` and `unstable_cache` calls.

**Files to Review/Modify**:
- `next.config.ts` - Add experimental caching options
- `lib/reference-data.ts` - Already using `unstable_cache` ✅

**Action Items**:
```typescript
// In next.config.ts, add:
const nextConfig: NextConfig = {
  experimental: {
    // Enable PPR (Partial Pre-rendering) for faster initial loads
    ppr: true,
  },
  // ... existing config
}
```

### 1.2 Add Cache-Control Headers for Static Resources

**Files to Modify**: `next.config.ts`

```typescript
async headers() {
  return [
    // Existing security headers...
    {
      source: '/api/programs/search',
      headers: [
        {
          key: 'Cache-Control',
          value: 's-maxage=60, stale-while-revalidate=300'
        }
      ]
    }
  ]
}
```

---

## Task 2: Optimize Function Execution Time

**Goal**: Reduce serverless function execution time to minimize Active CPU billing.

**Expected Outcome**:
- Coordinator dashboard loads faster
- Admin dashboard maintains performance
- Reduced CPU time on I/O-heavy routes

### 2.1 Parallelize Coordinator Dashboard Queries

The coordinator dashboard (`app/coordinator/dashboard/page.tsx`) currently has sequential queries that can be parallelized.

**Current Code** (lines 46-98 - sequential):
```typescript
const coordinator = await prisma.coordinatorProfile.findFirst({ ... })
// ... later
const stats = await prisma.studentProfile.aggregate({ ... })
const studentsWithConsent = await prisma.studentProfile.count({ ... })
const completeProfiles = await prisma.studentProfile.count({ ... })
```

**Optimized Approach** (parallel queries after initial check):
```typescript
// Keep the coordinator fetch first (needed for school context)
const coordinator = await prisma.coordinatorProfile.findFirst({ ... })
if (!coordinator?.school) redirect('/')

const school = coordinator.school

// Then parallelize dependent queries
const [stats, studentsWithConsent, completeProfiles] = await Promise.all([
  prisma.studentProfile.aggregate({
    where: { schoolId: school.id },
    _avg: { totalIBPoints: true },
    _count: true
  }),
  prisma.studentProfile.count({
    where: { schoolId: school.id, coordinatorAccessConsentAt: { not: null } }
  }),
  prisma.studentProfile.count({
    where: { schoolId: school.id, totalIBPoints: { not: null }, courses: { some: {} } }
  })
])
```

**Estimated Improvement**: ~100-200ms reduction per page load

### 2.2 Cache Student Settings Data

**File**: `app/student/settings/page.tsx`

The settings page fetches user data on every load. Consider using `unstable_cache` with a short TTL.

**Action**: Add caching for settings data with 5-minute TTL and tag-based invalidation.

---

## Task 3: Control Vercel Pro Costs

**Goal**: Ensure monthly Vercel bill stays within Pro plan limits (~$20/month).

**Expected Outcome**:
- Clear understanding of cost drivers
- Monitoring and alerts configured
- Budget caps set in Vercel dashboard

### 3.1 Understand Vercel Pro Pricing

**Included in Pro Plan ($20/month)**:
- 1M function invocations
- 100 GB-hours of function execution
- 1TB bandwidth

**What Can Cause Overage**:

| Resource | Overage Cost | Risk Areas in App |
|----------|-------------|-------------------|
| Function Invocations | $0.60/million | `/api/students/matches`, `/api/programs/search` |
| Active CPU | Region-dependent | Complex matching algorithm |
| Provisioned Memory | Region-dependent | Large program cache loads |
| Bandwidth | $0.15/GB | Image-heavy pages |

### 3.2 Dashboard Monitoring Actions

In Vercel Dashboard (`Settings > Usage`):

1. **Set Spend Limit**: 
   - Navigate to Settings > Billing > Spend Management
   - Set a spending cap (e.g., $30/month hard limit)

2. **Enable Usage Notifications**:
   - Set alerts at 50%, 80%, 90% of included quotas
   - Email notifications for overage

3. **Review Function Metrics**:
   - Check which routes consume the most invocations
   - Monitor execution duration per route

### 3.3 Rate Limiting Review

Current rate limits in `lib/rate-limit.ts`:
- Matches API: 20 requests/minute per user
- Magic link: 5 requests/hour per email

**Recommendation**: These limits are reasonable. No changes needed, but monitor for abuse.

---

## Task 4: Regional Alignment for Minimal Latency

**Goal**: Ensure Vercel functions run in the same region as database and cache services.

**Expected Outcome**:
- All services in the same region
- Network latency reduced by 50-100ms per request
- Lower Vercel costs (some regions are cheaper)

### 4.1 Identify Current Regions

| Service | How to Check Region |
|---------|-------------------|
| Vercel Functions | Dashboard > Settings > Functions > Region |
| Vercel Postgres | `DATABASE_URL` hostname (e.g., `aws-us-east-1`) |
| Upstash Redis | Dashboard > Database > Region (in URL) |
| Algolia | N/A (global CDN, always fast) |
| Supabase | `NEXT_PUBLIC_SUPABASE_URL` hostname |

**Action**: 
1. Check each service's region from their respective dashboards
2. Document current configuration
3. Align to a single region if mismatched

### 4.2 Recommended Region Strategy

**If targeting European IB schools primarily**:
- Vercel: `fra1` (Frankfurt) or `lhr1` (London)
- Upstash: Europe region
- Supabase: EU-West region
- Vercel Postgres: eu-central-1

**If targeting global audience**:
- Keep services in `iad1` (US East) - cheapest Vercel region
- Consider Edge Functions for auth-only routes

### 4.3 Vercel Function Region Configuration

**In Vercel Dashboard**:
1. Go to Project Settings > Functions
2. Set default region to match database region
3. Consider `fluid` for automatic region optimization (Pro feature)

**In `vercel.json`** (optional for per-route control):
```json
{
  "functions": {
    "app/api/students/matches/route.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

---

## Task 5: Implement ISR for Public Pages

**Goal**: Use Incremental Static Regeneration for public pages to reduce function invocations.

**Expected Outcome**:
- Landing pages served from edge cache
- Zero function invocations for most landing page visits
- Blazing fast page loads

### 5.1 Static Generation for Landing Pages

**Files to modify**:
- `app/page.tsx` (main landing)
- `app/for-coordinators/page.tsx`
- `app/faqs/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`

**Action**: Add export for static generation:
```typescript
// Already mostly static, but explicitly mark:
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour
```

### 5.2 ISR for Programs Search (Optional)

Consider pre-rendering popular search combinations if search traffic is high.

---

## Task 6: Review and Optimize Bundle Size

**Goal**: Reduce client-side JavaScript bundle to improve load times.

**Expected Outcome**:
- Smaller initial page loads
- Better Core Web Vitals
- Reduced bandwidth usage

### 6.1 Analyze Current Bundle

**Command**:
```bash
npm run build
npx @next/bundle-analyzer
```

**Or add to `next.config.ts`**:
```typescript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)
```

### 6.2 Common Optimizations

- Use dynamic imports for heavy components (charts, modals)
- Ensure icons are tree-shaken (current usage of lucide-react is correct)
- Review any large dependencies

---

## Task 7: Optimize Database Queries

**Goal**: Reduce database query latency and load.

**Expected Outcome**:
- Faster page loads for authenticated routes
- Lower Vercel Postgres connection time
- Reduced cold start impact

### 7.1 Connection Pooling

Verify Prisma is using connection pooling correctly.

**Current** (`lib/prisma.ts`):
```typescript
// Check current implementation and ensure:
// - Using Prisma Accelerate or direct connection pooling
// - Connection limit appropriate for serverless
```

### 7.2 Add Database Indexes

Check if additional indexes could help:
- `StudentProfile.schoolId` (already indexed ✅)
- `StudentCourse.studentProfileId` (already indexed ✅)

---

## Summary Checklist

| Task # | Description | Priority | Effort |
|--------|-------------|----------|--------|
| 1 | Enable Vercel Pro caching features | High | 1 hour |
| 2 | Parallelize coordinator dashboard queries | High | 30 min |
| 3 | Configure cost monitoring and limits | Critical | 15 min |
| 4 | Align regional settings | Medium | 1 hour investigation |
| 5 | Implement ISR for public pages | Medium | 30 min |
| 6 | Review bundle size | Low | 1 hour |
| 7 | Optimize database queries | Low | 30 min |

---

## Next Steps

1. **Immediate**: Configure Vercel spending limits and notifications (Task 3.2)
2. **This week**: Check and align service regions (Task 4)
3. **Ongoing**: Monitor Vercel usage dashboard after deployment

---

## Appendix: Service Region Reference

### How to Check Upstash Redis Region

Look at `UPSTASH_REDIS_REST_URL`:
- If contains `us1`: US East
- If contains `eu1`: Europe
- If contains `ap1`: Asia Pacific

### How to Check Vercel Postgres Region

Look at `DATABASE_URL`:
- Hostname pattern: `ep-xxx-yyy.aws-REGION.neon.tech` or similar
- Example: `aws-us-east-1` = US East

### Vercel Function Region Pricing

| Region | CPU/hour | Memory/GB-hour |
|--------|----------|----------------|
| iad1 (US East) | $0.18 | $0.015 |
| sfo1 (US West) | $0.18 | $0.015 |
| fra1 (Frankfurt) | $0.18 | $0.015 |
| hnd1 (Tokyo) | $0.199 | $0.017 |
| syd1 (Sydney) | $0.235 | $0.019 |
| gru1 (São Paulo) | $0.221 | $0.018 |

*Note: US East is generally cheapest and has best peering with most services.*
