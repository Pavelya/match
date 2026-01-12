# Coordinator Analytics Page - Investigation & Recommendations

**Created**: 2026-01-12  
**Status**: Investigation Complete  

---

## Executive Summary

This document investigates what additional analytics would help IB coordinators be more effective. Based on research into IB coordinator responsibilities and analysis of available data, I've identified **must-have** metrics focused on actionable insights.

**Key Principle**: Keep the page fast, scannable, and actionable. Only include data that helps coordinators take action.

---

## IB Coordinator Responsibilities (Research Summary)

IB Coordinators need to:
1. **Monitor student academic performance** - Track IB scores, predict outcomes
2. **Support university applications** - Understand where students want to go, ensure they meet requirements
3. **Identify at-risk students** - Students with incomplete profiles or poor match quality
4. **Track engagement** - Are students using the platform to find matches?
5. **Manage program compliance** - Ensure students have valid course selections

---

## Current Analytics Page Sections

| Section | What It Shows | Value |
|---------|---------------|-------|
| Overview Stats | Total students, Avg IB, Match score, Complete profiles, Completion rate | ✅ Essential |
| Match Quality Distribution | Score buckets (90-100%, 80-89%, etc.) | ✅ Essential |
| Popular Fields of Study | Top 5 fields students prefer | ✅ Useful |
| Preferred Countries | Top 5 countries students prefer | ✅ Useful |
| Top IB Courses | Top 10 IB courses selected | ✅ Just added |

---

## Recommended Additions (Must-Have Only)

### 1. ✅ IB Score Distribution Histogram
**Priority**: HIGH  
**Data Source**: `StudentProfile.totalIBPoints`  
**Why**: Coordinators need to see the spread of predicted IB scores to identify students who may struggle to meet university requirements.

**Display**: Simple histogram buckets
- 40+ points (Excellent)
- 35-39 points (Very Good)  
- 30-34 points (Good)
- 24-29 points (Satisfactory)
- Below 24 or Missing

**Action it enables**: Identify students who need academic support or adjusted expectations.

---

### 2. ✅ Students Without Preferences Set
**Priority**: HIGH  
**Data Source**: `StudentProfile.preferredFields` (empty) or `StudentProfile.preferredCountries` (empty)  
**Why**: Students without preferences can't get good matches. This is an actionable metric.

**Display**: Single number + percentage in overview stats
- "X students (Y%) have not set preferences"

**Action it enables**: Coordinator can follow up with specific students to complete their profiles.

---

### 3. ✅ Students With No Saved Programs
**Priority**: MEDIUM  
**Data Source**: `StudentProfile.savedPrograms` (count = 0)  
**Why**: Shows engagement level. Students not saving programs may need encouragement.

**Display**: Single number + percentage in engagement section
- "X students (Y%) have not saved any programs"

**Action it enables**: Identify students not engaging with the platform.

---

### 4. ⚠️ TOK/EE Grade Distribution (Consider for Future)
**Priority**: MEDIUM  
**Data Source**: `StudentProfile.tokGrade`, `StudentProfile.eeGrade`  
**Why**: TOK and EE bonus points are crucial for total IB score.

**Display**: Simple breakdown A/B/C/D/E counts

**Concern**: May be too granular. Only add if coordinators actively request it.

---

### 5. ❌ Subject Grade Distribution by Course (Skip)
**Priority**: LOW  
**Data Source**: `StudentCourse.grade`  
**Why Not**: Too granular for analytics overview. This belongs on individual student pages.

---

### 6. ❌ Historical Trends (Skip for Now)
**Priority**: LOW (Future)  
**Why Not**: Requires time-series data tracking which doesn't exist yet. Good future enhancement.

---

## Implementation Recommendation

Based on the analysis, add these **two sections** to the coordinator analytics page:

### Section A: "At-Risk Students" Alert Card
Shows students who need attention:
- Students with no IB score entered: X
- Students with no preferences: X  
- Students with no saved programs: X

**Value**: Actionable list that helps coordinators prioritize outreach.

### Section B: IB Score Distribution  
Simple histogram of score ranges to understand cohort academic strength.

**Value**: Quick overview of cohort performance without clicking into individual students.

---

## Data Availability Check

| Metric | Data Available? | Query Complexity |
|--------|-----------------|------------------|
| Score distribution | ✅ `totalIBPoints` | Simple aggregate |
| No preferences | ✅ Count where `preferredFields` is empty | Medium (relation count) |
| No saved programs | ✅ Count where `savedPrograms` is empty | Medium (relation count) |
| TOK/EE grades | ✅ `tokGrade`, `eeGrade` | Simple aggregate |

All recommended metrics can be calculated with existing data.

---

## UI Layout (After Changes)

```
┌─────────────────────────────────────────────────────────────┐
│ Analytics for [School Name]                                 │
├─────────────────────────────────────────────────────────────┤
│ [Total] [Avg IB] [Avg Match] [Complete] [Completion %]      │  ← Existing
├─────────────────────────────────────────────────────────────┤
│ ⚠️ At-Risk Students                                         │  ← NEW
│ • No IB score: 3 students                                   │
│ • No preferences: 5 students                                │
│ • No saved programs: 8 students                             │
├─────────────────────────────────────────────────────────────┤
│ 📊 Match Quality Distribution (existing)                    │
├─────────────────────────────────────────────────────────────┤
│ 📈 IB Score Distribution                                    │  ← NEW
│ 40+   ████████ 5                                            │
│ 35-39 ████████████████ 12                                   │
│ 30-34 ████████████ 8                                        │
│ 24-29 ████ 3                                                │
│ N/A   ██ 2                                                  │
├─────────────────────────────────────────────────────────────┤
│ Popular Fields │ Preferred Countries                        │  ← Existing
├─────────────────────────────────────────────────────────────┤
│ Top IB Courses Selected by Students                         │  ← Just added
└─────────────────────────────────────────────────────────────┘
```

---

## Verification Plan

### Manual Testing
1. Navigate to `/coordinator/analytics` as VIP coordinator
2. Verify "At-Risk Students" card appears with correct counts
3. Verify "IB Score Distribution" histogram renders correctly
4. Cross-check numbers by viewing `/coordinator/students` list
5. Test with school that has 0 students (empty states)

---

## Decision Needed

Before implementing, please confirm:

1. **Add "At-Risk Students" card?** (Shows students needing attention)
2. **Add "IB Score Distribution" histogram?** (Shows cohort strength)
3. **Any other specific metrics you want?**

These additions focus on actionable insights rather than adding data for data's sake.
