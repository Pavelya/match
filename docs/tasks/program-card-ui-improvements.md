# Program Card UI Improvements

**Created:** 2026-02-03  
**Status:** Pending Review  
**Priority:** High (User Confusion)

---

## Executive Summary

This document outlines two UI improvement tasks for the `ProgramCard` component:

1. **OR-group display for logged-out users** — Currently confusing as courses appear as separate standalone requirements
2. **Consistent IB Points display** — Add minIBPoints to the gray info bar across all relevant pages

---

## Current State Analysis

### Files Affected

| File | Role |
|------|------|
| `components/student/ProgramCard.tsx` | Core component (1114 lines) |
| `app/programs/search/SearchClient.tsx` | Uses ProgramCard with `showMatchDetails=false` |
| `app/programs/[id]/page.tsx` | Uses ProgramCard with `variant="detail"` |
| `app/student/matches/RecommendationsClient.tsx` | Uses ProgramCard with full matchResult |
| `app/student/saved/SavedProgramsClient.tsx` | Uses ProgramCard with `showMatchDetails=false` |

### ProgramCard Usage Matrix

| Page | Variant | showMatchDetails | Has matchResult | Has studentProfile | Shows minIBPoints |
|------|---------|------------------|-----------------|-------------------|-------------------|
| `programs/search` | `card` | `false` | ❌ | ❌ | ✅ (gray bar) |
| `programs/[id]` (logged out) | `detail` | `true`* | ❌ | ❌ | ✅ (requirements grid) |
| `programs/[id]` (logged in) | `detail` | `true` | ✅ | ✅ | ✅ (requirements grid) |
| `student/matches` | `card` | `true` | ✅ | ❌ | ✅ (requirements grid) |
| `student/saved` | `card` | `false` | ❌ | ❌ | ✅ (gray bar) |

*When logged out, matchResult is null but detail view still renders requirements

---

## Task 1: Fix OR-Group Display for Logged-Out Users

### 1.1 Problem Statement

When a logged-out user views the program detail page (`programs/[id]`), course requirements are displayed as a flat list. For example, a program requiring "Physics OR Chemistry" shows:

```
❌ Physics (HL 5+)
❌ Chemistry (HL 5+)
```

This is confusing because it implies **both** are required, when only **one** is needed.

### 1.2 Root Cause

In `ProgramCard.tsx` lines 651-671, when `!studentProfile`, the code iterates over all `courseRequirements` without grouping OR-groups:

```tsx
{/* Course Requirement Tiles - Without Student Profile */}
{program.courseRequirements &&
  program.courseRequirements.length > 0 &&
  !studentProfile &&
  program.courseRequirements.map((req) => (
    // Each requirement rendered individually
    <div key={req.id} className="rounded-xl border-2 border-muted p-3">
      ...
    </div>
  ))}
```

### 1.3 Proposed Solution

Create a new function `groupRequirementsForDisplay()` that:
1. Identifies OR-groups using `orGroupId`
2. Returns grouped requirements with a visual indicator (e.g., "or" separator)
3. Uses a compound card layout for OR-groups

**Visual Design (2026 Best Practices):**

```
┌─────────────────────────────────────────────┐
│  Physics or Chemistry                       │
│  ─────────────────────                      │
│  HL • Required: 5                           │
│  One of these subjects required             │
└─────────────────────────────────────────────┘
```

**Alternative Option (Side-by-side with "OR" badge):**

```
┌───────────────────┐  ┌───────────────────┐
│  Physics          │  │  Chemistry        │
│  HL • Grade 5+    │OR│  HL • Grade 5+    │
└───────────────────┘  └───────────────────┘
```

### 1.4 Implementation Checklist

- [ ] 1.4.1 Create `groupRequirementsForDisplay()` function in `ProgramCard.tsx`
- [ ] 1.4.2 Replace flat iteration (lines 651-671) with grouped rendering
- [ ] 1.4.3 Design OR-group visual indicator (e.g., "or" badge, connected cards)
- [ ] 1.4.4 Ensure mobile-responsive layout for OR-groups
- [ ] 1.4.5 Test on all pages where ProgramCard is used

### 1.5 Impact Analysis

| Page | Impact | Notes |
|------|--------|-------|
| `programs/[id]` (logged out) | ✅ Primary fix location | Detail variant, no studentProfile |
| `programs/search` | ❌ No impact | Does not show requirements (showMatchDetails=false) |
| `student/matches` | ❌ No impact | Has matchResult, uses existing OR-group logic |
| `student/saved` | ❌ No impact | Does not show requirements (showMatchDetails=false) |

### 1.6 Expected Outcome

- Logged-out users clearly see which courses are alternatives (OR) vs mandatory (AND)
- No confusion about "needing both" when only one is required
- Consistent visual language with logged-in view

---

## Task 2: Add Overall IB Points to Gray Info Bar

### 2.1 Problem Statement

The minimum IB points requirement is not consistently visible across all pages:

| Page | Currently Shows minIBPoints |
|------|----------------------------|
| `programs/search` | ✅ In gray bar |
| `programs/[id]` (logged out) | ⚠️ Only in requirements grid (not prominent) |
| `student/matches` | ⚠️ In requirements grid only |
| `student/saved` | ✅ In gray bar |

Users should always see the IB points requirement prominently in the gray info bar, regardless of login state.

### 2.2 Root Cause

In `ProgramCard.tsx` line 859-864, the minIBPoints is only shown in the gray bar when `!showMatchDetails`:

```tsx
{!showMatchDetails && program.minIBPoints && (
  <span className="flex items-center gap-1.5 text-primary font-medium">
    <GraduationCap className="h-4 w-4" />
    {program.minIBPoints} IB Points
  </span>
)}
```

This condition excludes logged-in views (where `showMatchDetails=true`).

### 2.3 Proposed Solution

**Always show minIBPoints in the gray info bar**, regardless of `showMatchDetails`. Remove the `!showMatchDetails` condition.

**Updated Logic:**

```tsx
{program.minIBPoints && (
  <span className="flex items-center gap-1.5 text-primary font-medium">
    <GraduationCap className="h-4 w-4" />
    {program.minIBPoints} IB Points
  </span>
)}
```

**Why this is safe:**
- The gray info bar is always visible in both card and detail variants
- Showing IB points upfront improves scannability
- The requirements grid provides additional context (met/not met) for logged-in users

### 2.4 Implementation Checklist

- [ ] 2.4.1 Remove `!showMatchDetails &&` condition from line 859
- [ ] 2.4.2 Verify the gray bar layout on all 4 pages
- [ ] 2.4.3 Test mobile responsiveness (bar may wrap on small screens)

### 2.5 Pages Impacted

| Page | Before | After |
|------|--------|-------|
| `programs/search` | ✅ Shows IB points | ✅ No change |
| `programs/[id]` | ❌ Not in bar | ✅ Now in bar |
| `student/matches` | ❌ Not in bar | ✅ Now in bar |
| `student/saved` | ✅ Shows IB points | ✅ No change |

### 2.6 Expected Outcome

- IB points requirement is always visible at a glance
- Users can quickly scan programs by their minimum IB requirements
- Consistent UX across all program views

---

## Verification Plan

### Automated Tests

Currently, there are no component-level tests for `ProgramCard.tsx`. The existing tests in `lib/matching/` focus on the matching algorithm, not UI rendering.

**Recommendation:** Add visual regression tests or component tests in the future. For this task, rely on manual verification.

### Manual Verification Steps

**For Task 1 (OR-Group Display):**

1. Navigate to `http://localhost:3000/programs/search`
2. Find a program that requires "Physics OR Chemistry" (or similar OR-group)
3. Click to view the program detail page
4. **Expected:** OR-group courses should be visually grouped with an "or" indicator
5. **Not Expected:** Two separate requirement cards suggesting both are required

**For Task 2 (IB Points in Gray Bar):**

1. Log out and navigate to `http://localhost:3000/programs/search`
2. Observe a program card in search results → IB points should be in the gray bar ✅
3. Click to view program detail → IB points should now also be in the gray bar
4. Log in as a student and navigate to `http://localhost:3000/student/matches`
5. Observe a matched program card → IB points should be in the gray bar (new behavior)
6. Navigate to `http://localhost:3000/student/saved`
7. Observe a saved program card → IB points should be in the gray bar ✅

---

## Design Considerations

### For OR-Group Display

| Approach | Pros | Cons |
|----------|------|------|
| **Compound card** (single card with all options listed) | Clean, saves space | May be hard to list many options |
| **Side-by-side cards with "OR" badge** | Clear visual, similar to AND requirements | Takes more horizontal space |
| **Dropdown/expandable** | Compact | Adds interaction, less scannable |

**Recommendation:** Start with compound card approach. If OR-groups have more than 3 options, consider a condensed "X subjects accepted" label.

### For IB Points Display

The current styling uses `text-primary font-medium` which stands out nicely. No design changes needed — just visibility fix.

---

## Dependencies

- None. This is a self-contained UI change.

---

## Rollback Plan

If issues arise:
1. Revert the `ProgramCard.tsx` changes
2. The component has no external dependencies that would be affected
