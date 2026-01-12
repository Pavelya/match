# Admin Analytics Page Improvement Plan

**Created**: 2026-01-11  
**Status**: Investigation Complete | Pending Implementation  
**Owner**: Platform Admin  
**Priority**: Medium

---

## Executive Summary

This document contains the investigation findings and implementation plan for improving the admin/analytics page. The changes focus on:

1. **Clarifying terminology**: Distinguishing between "supply-side" data (programs/universities) and "demand-side" data (student preferences)
2. **Adding student preference analytics**: New charts showing what students are actually interested in
3. **Removing outdated/unclear sections**: "Coming Soon" placeholder and irrelevant metrics
4. **Aligning with 2026 best practices**: Modern KPIs for education platform administrators

---

## Current State Analysis

### What Exists Now

| Section | Current Name | What It Shows | Issue |
|---------|--------------|---------------|-------|
| Chart 1 | Popular Fields of Study | Programs per field of study | Name suggests student popularity, but shows program supply |
| Chart 2 | Popular Study Destinations | Universities per country | Name suggests student interest, but shows university locations |
| Metric | Schools with Coordinators | % of schools with coordinators | Not relevant for analytics—more operational |
| Section | Coming Soon | Placeholder with bullet list | Unclear, no value to admin |

### Available Data in Database

Based on [schema.prisma](file:///Users/pavel/match/prisma/schema.prisma):

| Data Source | Description | Can Power |
|-------------|-------------|-----------|
| `StudentProfile.preferredFields` | Fields selected by students during onboarding | **True "Popular Fields"** |
| `StudentProfile.preferredCountries` | Countries selected by students | **True "Popular Destinations"** |
| `AcademicProgram.fieldOfStudyId` | Programs grouped by field | Program Distribution by Field |
| `University.countryId` | Universities grouped by country | University Distribution by Location |
| `SavedProgram` | Student saved programs | Engagement metrics |
| `StudentCourse` | Student IB courses | Course popularity |

---

## Proposed Changes

### 1. Rename Current Charts (Clarify They're Supply-Side)

**Current**: "Popular Fields of Study"  
**New**: "Program Distribution by Field"  
**Rationale**: Accurately describes that this shows how programs are distributed across fields, not student demand.

**Current**: "Popular Study Destinations"  
**New**: "University Distribution by Location"  
**Rationale**: Accurately describes that this shows where universities are located, not where students want to go.

---

### 2. Add New Student Preference Analytics

#### 2.1 Popular Fields of Study (Student Selections)

**Section Title**: "Popular Fields of Study"  
**Data Source**: `StudentProfile.preferredFields` relation  
**Query**:
```typescript
// Get field selection counts from student preferences
const fieldPreferenceStats = await prisma.fieldOfStudy.findMany({
  select: {
    id: true,
    name: true,
    iconName: true,
    _count: {
      select: { interestedStudents: true }
    }
  },
  orderBy: {
    interestedStudents: { _count: 'desc' }
  },
  take: 10
})
```

**UI Design**: Horizontal bar chart showing:
- Rank (1-10)
- Field name with icon
- Student count
- Percentage bar (relative to total students with preferences)

---

#### 2.2 Popular Study Destinations (Student Preferences)

**Section Title**: "Popular Study Destinations"  
**Data Source**: `StudentProfile.preferredCountries` relation  
**Query**:
```typescript
// Get country preference counts from student profiles
const countryPreferenceStats = await prisma.country.findMany({
  select: {
    id: true,
    name: true,
    flagEmoji: true,
    _count: {
      select: { interestedStudents: true }
    }
  },
  orderBy: {
    interestedStudents: { _count: 'desc' }
  },
  take: 10
})
```

**UI Design**: Horizontal bar chart showing:
- Rank (1-10)
- Flag + Country name
- Student count
- Percentage bar (relative to total students with preferences)

---

### 3. Platform Overview Improvements

**Remove**: "Schools with Coordinators" metric  
**Rationale**: This is an operational metric, not valuable for analytics. It doesn't tell the admin anything actionable.

**Replace With New Relevant Metrics**:

| Metric | Description | Calculation |
|--------|-------------|-------------|
| **Average IB Score** | Average predicted IB points of students | `AVG(totalIBPoints)` where not null |
| **Match Coverage** | % of students who have ≥1 matching program | Count profiles with saved programs / total profiles |
| **Engagement Rate** | Students actively using platform | Profiles with courses entered / total profiles |

**Alternative new metrics** (based on 2026 best practices):
- **New Signups (7d)**: Student registrations in last 7 days
- **Profile Completeness**: % of students with complete profiles
- **School Coverage**: % of students linked to a school

---

### 4. Remove "Coming Soon" Section

**Current State**: Placeholder with dashed border showing:
- Interactive charts and graphs
- Time-based trend analysis
- Match success rates
- User engagement metrics
- Export reports to CSV/PDF

**Action**: Remove entirely  
**Rationale**: 
- Provides no value to admin
- Creates impression of incomplete product
- These features can be added incrementally without placeholder

---

### 5. Additional Recommended Sections (2026 Best Practices)

Based on web research on admin dashboard best practices for 2025-2026:

#### 5.1 Student Engagement Card

| Metric | Description |
|--------|-------------|
| Students with Complete Profile | Count with `totalIBPoints` + courses |
| Students with Saved Programs | Count with `savedPrograms.length > 0` |
| Average Programs Saved | Per student with savings |

#### 5.2 Program Performance Preview

| Metric | Description |
|--------|-------------|
| Most Saved Programs | Top 5 programs by save count |
| Programs Never Saved | Count of programs with 0 saves |

#### 5.3 IB Course Popularity

| Metric | Description |
|--------|-------------|
| Most Popular HL Courses | Top 5 HL courses by student enrollment |
| Most Popular SL Courses | Top 5 SL courses by student enrollment |

---

## Implementation Tasks

### Phase 1: Core Renaming & Data Fixes

#### Task 1.1: Rename Supply-Side Charts
- **File**: `app/admin/analytics/page.tsx`
- **Changes**:
  - Line 173: Rename `title="Popular Study Destinations"` → `title="University Distribution by Location"`
  - Line 204: Rename `title="Popular Fields of Study"` → `title="Program Distribution by Field"`
  - Update icon from `MapPin` to `BookOpen` for field distribution (maintains semantic accuracy)
- **Outcome**: Clear distinction between supply-side and demand-side analytics
- **Test**: Visual verification that titles render correctly

#### Task 1.2: Remove "Coming Soon" Section
- **File**: `app/admin/analytics/page.tsx`
- **Changes**: Delete lines 234-251 (entire Coming Soon section)
- **Outcome**: Cleaner page without placeholder content
- **Test**: Visual verification that section is removed

---

### Phase 2: New Student Preference Analytics

#### Task 2.1: Add Student Field Preferences Query
- **File**: `app/admin/analytics/page.tsx`
- **Changes**: Add Prisma query for field preference counts
- **Outcome**: Data for true "Popular Fields of Study"
- **Test**: Verify query returns sorted field data

#### Task 2.2: Add Student Country Preferences Query
- **File**: `app/admin/analytics/page.tsx`
- **Changes**: Add Prisma query for country preference counts
- **Outcome**: Data for true "Popular Study Destinations"
- **Test**: Verify query returns sorted country data

#### Task 2.3: Implement New "Popular Fields" UI
- **File**: `app/admin/analytics/page.tsx`
- **Changes**: Add new InfoCard with student field preferences visualization
- **Outcome**: Visual chart showing what fields students want
- **Test**: Visual verification with actual student data

#### Task 2.4: Implement New "Popular Destinations" UI
- **File**: `app/admin/analytics/page.tsx`
- **Changes**: Add new InfoCard with student country preferences visualization
- **Outcome**: Visual chart showing where students want to study
- **Test**: Visual verification with actual student data

---

### Phase 3: Platform Overview Improvements

#### Task 3.1: Replace "Schools with Coordinators" Metric
- **File**: `app/admin/analytics/page.tsx`
- **Changes**: 
  - Remove coordinator/school ratio calculation (lines 148-154)
  - Add Average IB Score calculation
  - Add query for student engagement metrics
- **Outcome**: More actionable metrics in Platform Overview
- **Test**: Visual verification that new metrics display

#### Task 3.2: Add Student Engagement Section
- **File**: `app/admin/analytics/page.tsx`
- **Changes**: Add new InfoCard with engagement metrics
- **Outcome**: Insight into student platform usage
- **Test**: Visual verification

---

## UI Layout (Post-Implementation)

```
┌─────────────────────────────────────────────────────────────┐
│ Analytics                                                   │
│ Platform insights, trends, and detailed statistics          │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│ │Profile % │ │Active    │ │Programs  │ │Universities│       │
│ │Completion│ │Students  │ │Available │ │          │        │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├─────────────────────────────────────────────────────────────┤
│ Student Profile Stats      │ Platform Overview               │
│ ─────────────────────      │ ─────────────────               │
│ Total Students: 150        │ Programs/University: 12.5       │
│ With Profile: 89           │ Avg IB Score: 35.2              │
│ Completion: 59%            │ Student:Coordinator: 15:1       │
│                            │ Engagement Rate: 67%            │
├─────────────────────────────────────────────────────────────┤
│ Popular Fields of Study    │ Popular Study Destinations      │
│ (What Students Want)       │ (Where Students Want to Go)     │
│ ─────────────────────      │ ───────────────────────────     │
│ 1. 🔬 Engineering     45   │ 1. 🇬🇧 United Kingdom    67     │
│ 2. 💼 Business        38   │ 2. 🇳🇱 Netherlands       52     │
│ 3. 🏥 Medicine        31   │ 3. 🇨🇦 Canada           48     │
│ ...                        │ ...                             │
├─────────────────────────────────────────────────────────────┤
│ Program Distribution       │ University Distribution         │
│ by Field                   │ by Location                     │
│ ─────────────────────      │ ───────────────────────────     │
│ 1. Engineering       142   │ 1. 🇳🇱 Netherlands       8      │
│ 2. Business          98    │ 2. 🇨🇦 Canada           7      │
│ ...                        │ ...                             │
├─────────────────────────────────────────────────────────────┤
│ Student Engagement                                          │
│ ─────────────────────                                       │
│ Students with saved programs: 56 (37%)                      │
│ Average programs saved: 4.2                                 │
│ Most saved: Computer Science @ UBC (23 saves)               │
└─────────────────────────────────────────────────────────────┘
```

---

## Verification Plan

### Automated Tests
- No existing automated tests for analytics page
- **Recommendation**: Add integration test for data queries (optional, low priority)

### Manual Verification

#### Test 1: Chart Renaming
1. Navigate to `/admin/analytics`
2. Verify "University Distribution by Location" title appears (previously "Popular Study Destinations")
3. Verify "Program Distribution by Field" title appears (previously "Popular Fields of Study")
4. Confirm charts still show correct data

#### Test 2: Coming Soon Removal
1. Navigate to `/admin/analytics`
2. Scroll to bottom of page
3. Verify no "Coming Soon" section with dashed border exists

#### Test 3: New Student Preference Charts
1. Navigate to `/admin/analytics`
2. Verify "Popular Fields of Study" section shows student field preferences
3. Verify "Popular Study Destinations" section shows student country preferences
4. Verify counts reflect actual student selections (cross-check with database if needed)

#### Test 4: Platform Overview Updates
1. Navigate to `/admin/analytics`
2. Verify "Schools with Coordinators" metric is removed
3. Verify replacement metrics are displayed (Average IB Score, Engagement Rate)

---

## Success Criteria

- [ ] Charts clearly distinguish between supply (programs/universities) and demand (student preferences)
- [ ] Admins can see what fields students are most interested in
- [ ] Admins can see which countries students prefer
- [ ] Platform Overview shows actionable metrics
- [ ] No placeholder "Coming Soon" content
- [ ] Page follows 2026 admin dashboard best practices (clarity, actionable insights)

---

## Future Enhancements (Not in Scope)

These can be added in future iterations:

1. **Time-based trends**: Show preference changes over time
2. **Interactive charts**: Drill-down capabilities
3. **Export functionality**: CSV/PDF exports
4. **Match success analytics**: % of students finding good matches
5. **Geographic heatmap**: Visual map of student interest by region
6. **IB Course popularity**: Show which IB courses students are taking
