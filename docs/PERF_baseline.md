# Performance Baseline Reference

> **Last Updated**: December 2024  
> **Current Scale**: 10 programs, 1 test user  
> **Target Scale**: 2,500 programs, 2,000 users

## Current Architecture

### `/student/matches` API Flow

```
Client → API → Redis (program cache) → Prisma (if miss)
                    ↓
              Redis (match cache) → Algorithm (if miss)
                    ↓
              Return top 15 matches
```

### `/student/onboarding` Page Flow

```
Browser → Server → unstable_cache → Prisma (if miss)
                         ↓
                 Fetch student profile
                         ↓
                 Render page
```

---

## Current Performance Measurements

### API Latencies (10 Programs)

| Endpoint | Scenario | Latency |
|----------|----------|---------|
| `/api/students/matches` | Full cache hit | ~50-80ms |
| `/api/students/matches` | Match miss, program hit | ~100-150ms |
| `/api/students/matches` | Full cache miss | ~200-300ms |
| `/student/onboarding` | Cache hit | ~100-150ms |
| `/student/onboarding` | Cache miss | ~200-300ms |

### Projected Latencies (2,500 Programs)

| Endpoint | Scenario | Projected |
|----------|----------|-----------|
| `/api/students/matches` | Full cache hit | ~80-150ms |
| `/api/students/matches` | Match miss, program hit | ~200-400ms |
| `/api/students/matches` | Full cache miss | **800ms-1.5s** |

---

## Bottleneck Analysis

| Issue | At Scale Impact | Priority |
|-------|-----------------|----------|
| Programs DB query (cache miss) | ~500ms | 🔴 Critical |
| Match calculation (cache miss) | ~300ms | 🔴 Critical |
| Cache expiration (5 min) | Frequent recalc | 🟡 Medium |
| Reference data queries | ~60ms (cached) | ✅ Fixed |

---

## Cache Configuration

| Cache | TTL | Storage |
|-------|-----|---------|
| Program data | 1 hour | Redis |
| Match results | 5 min | Redis |
| Fields/Countries/Courses | 1 hour | Next.js |

---

## Success Criteria

| Metric | Current | Target |
|--------|---------|--------|
| Cache hit latency | ~80ms | <100ms |
| Cache miss latency | ~300ms | <300ms |
| Cache hit rate | ~60% | >95% |
