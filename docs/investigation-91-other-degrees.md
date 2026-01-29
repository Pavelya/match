# Investigation: 91 "Other" Degrees in Admin Interface

**Date:** 2026-01-27  
**Investigator:** AI Assistant  
**Status:** ✅ Complete - Root Cause Identified

---

## Executive Summary

The admin interface at `/admin/programs` shows **91 programs classified as "Other Degrees"** in the stats summary. This is **not a data error** but rather an **incomplete classification logic** in the frontend code.

### Quick Stats
- **Total Programs:** 1,101
- **Bachelor's:** 980 (correctly classified)
- **Master's:** 30 (correctly classified)
- **Other:** 91 (needs classification improvement)

---

## Root Cause

The classification logic in `components/admin/programs/ProgramsListClient.tsx` (lines 58-99) uses pattern matching on the `degreeType` field to categorize programs. The current logic **only recognizes certain degree type patterns**:

### Current Classification Rules

#### Bachelor Patterns (Recognized)
```typescript
dt.startsWith('bachelor') ||
dt.startsWith('bsc') ||
dt.startsWith('ba ') ||      // Note: requires space after "ba"
dt.startsWith('beng') ||
dt.startsWith('bn') ||
dt.startsWith('bvm') ||
dt.startsWith('mbchb')
```

#### Master Patterns (Recognized)
```typescript
dt.startsWith('master') ||
dt.startsWith('msc') ||
dt.startsWith('minf') ||
(dt.startsWith('ma ') && !dt.includes('(hons)'))
```

#### Scottish Exception
```typescript
dt.startsWith('ma (hons)') || dt.startsWith('ma(hons)')  // Counted as Bachelor
```

---

## The 91 "Other" Programs Breakdown

### By Degree Type (Top Categories)

| Count | Degree Type | Should Be Classified As |
|-------|-------------|------------------------|
| 32 | **BA** | Bachelor (missing pattern!) |
| 20 | **MEng** | Master (missing pattern!) |
| 8 | Combined Bachelor | Bachelor |
| 6 | LLB (Hons) | Bachelor |
| 4 | MEng (Hons) | Master |
| 3 | Combined Bachelor and Master | Dual (ambiguous) |
| 2 | MMath | Master |
| 1 each | Various UK integrated masters | Master |

### By University

| University | Count | Reason |
|------------|-------|--------|
| **University of Oxford** | 46 | Uses "BA" (no space) for all arts degrees |
| **Imperial College London** | 19 | Uses "MEng" for engineering masters |
| **University of Edinburgh** | 10 | Uses various UK master patterns |
| **The University of Sydney** | 9 | Various degree types |
| Others | 7 | Mixed |

---

## Why "BA" is Classified as "Other"

**Critical Issue:** The current logic checks for `dt.startsWith('ba ')` with a **space**, but Oxford (and others) use `"BA"` without a space.

```typescript
// Current logic (line 69)
dt.startsWith('ba ')   // Matches: "BA in Arts" or "Ba Something"
                       // Does NOT match: "BA" (Oxford's format)
```

This accounts for **32 of the 91 "Other" programs** (35%).

---

## Sample "Other" Programs

Here are examples of programs incorrectly classified as "Other":

### Oxford BA Programs (should be Bachelor)
1. **Modern Languages** - BA - University of Oxford
2. **Computer Science** - BA - University of Oxford  
3. **Law (Jurisprudence)** - BA - University of Oxford
4. **History** - BA - University of Oxford

### Imperial MEng Programs (should be Master)
5. **Aeronautical Engineering** - MEng - Imperial College London
6. **Chemical Engineering** - MEng - Imperial College London
7. **Computing** - MEng (Hons) - Imperial College London

### UK Integrated Masters (should be Master)
8. **Mathematics** - MMath - University of Edinburgh
9. **Physics** - MPhys - Various universities
10. **Chemistry** - MChem - Various universities

---

## Recommendations

### 1. **Immediate Fix: Update Classification Logic**

**File:** `components/admin/programs/ProgramsListClient.tsx`

Add these patterns to correctly classify the 91 programs:

#### For Bachelor's (add):
```typescript
dt.startsWith('ba') ||           // Removes space requirement - catches "BA"
dt.startsWith('llb') ||          // Bachelor of Laws
dt.startsWith('bfa') ||          // Bachelor of Fine Arts
dt === 'combined bachelor' ||    // Combined bachelor programs
dt.includes('bachelor')          // Catch-all for variations
```

#### For Master's (add):
```typescript
dt.startsWith('meng') ||         // Master of Engineering
dt.startsWith('mmath') ||        // Master of Mathematics
dt.startsWith('mphys') ||        // Master of Physics
dt.startsWith('mchem') ||        // Master of Chemistry
dt.startsWith('mbiol') ||        // Master of Biology
dt.startsWith('mbiochem') ||     // Master of Biochemistry
dt.startsWith('mearthsci') ||    // Master of Earth Sciences
dt.startsWith('mmathphil') ||    // Combined masters
dt.startsWith('mphysphil')       // Combined masters
```

### 2. **Consider New "Dual Degree" Category** (Optional)

Programs with dual/combined credentials could have their own category:
- Combined Bachelor and Master
- Double Degree programs
- BA & BEd (Double Degree)
- etc.

This would give a 4-category system: Bachelor / Master / Dual / Other

### 3. **Long-term: Normalize Degree Type Field**

Currently, `degreeType` is a free-text field with **151 unique variations**. Consider:

1. **Add enum field** `degreeLevel` to schema:
   ```prisma
   enum DegreeLevel {
     BACHELOR
     MASTER
     DOCTORAL
     DUAL
     PROFESSIONAL
   }
   ```

2. **Add migration** to populate from existing `degreeType`

3. **Update admin UI** to use `degreeLevel` for stats

4. **Keep `degreeType`** for display/search purposes

---

## Testing Script Created

Two investigation scripts have been created:

1. **`scripts/investigate-other-degrees.ts`**  
   - Searches for programs with "Other" in degree type text
   - Found only 1 program (false positive: "Physiotherapy" contains "ther")

2. **`scripts/investigate-other-classification.ts`** ✅  
   - Replicates the admin UI classification logic  
   - Identifies all 91 programs classified as "Other"
   - Provides detailed breakdown and suggestions
   - **Run with:** `npx tsx scripts/investigate-other-classification.ts`

---

## No Code Changes Required

As requested, **no code changes have been made**. This is purely an investigation report.

Next steps would be to:
1. Review the recommendations
2. Decide on classification improvements (immediate fix vs. long-term refactor)
3. Implement and test changes
4. Verify all 91 programs are properly classified

---

## Appendix: Full List of "Other" Degree Types

```
32x "BA"
20x "MEng"
 8x "Combined Bachelor"
 6x "LLB (Hons)"
 4x "MEng (Hons)"
 3x "Combined Bachelor and Master"
 2x "MMath"
 1x "BBA(Law) & LLB (Double Degree)"
 1x "BEd & BSc (Double Degree)"
 1x "BFA"
 1x "BM BCh"
 1x "BSocSc & LLB (Double Degree)"
 1x "Combined Bachelor (Honours)"
 1x "Dual Degree"
 1x "MBBS/BSc"
 1x "MBiochem"
 1x "MBiol"
 1x "MChem"
 1x "MEarthSci"
 1x "MMathCompSci"
 1x "MMathPhil"
 1x "MPhys"
 1x "MPhysPhil"
```

**Total: 91 programs**
