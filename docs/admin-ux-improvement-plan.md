# Admin UX/UI Improvement Plan

**Status**: Planning  
**Created**: 2024-12-12  
**Purpose**: Modernize admin pages for reusability in B2B coordinator portal  
**Scope**: Admin pages only (excludes student-facing pages)

---

## Executive Summary

This document outlines the UX/UI improvements needed for the IB Match admin dashboard. The changes are **purely visual and interaction-focused** — no functionality changes will be made. The goal is to create a modern, consistent, and reusable admin interface that can serve as the foundation for the B2B coordinator portal.

### Key Problems Identified

1. **Inconsistent Page Layouts**: Some pages use stats cards (coordinators), others don't (schools)
2. **Missing Pages**: Students and Agents pages are linked but don't exist
3. **Underutilized Screen Real Estate**: Pages use `max-w-4xl` or less, leaving large gaps
4. **Inconsistent Component Patterns**: Tables, cards, and detail views vary across pages
5. **Dashboard Has Placeholder Content**: Analytics sections show only placeholders
6. **No Filtering/Search on List Pages**: Tables lack search and filter capabilities
7. **Inconsistent Information Architecture**: Detail pages have different layouts

---

## Design Principles (2024 Admin Dashboard Best Practices)

Based on industry research, we'll apply these principles:

1. **Full-Width Layouts**: Utilize available screen real estate effectively
2. **Consistent Card Patterns**: Unified stat cards, info cards, and table containers
3. **Progressive Disclosure**: Show essential info first, details on demand
4. **Filterable Tables**: Search+filter on all list pages
5. **Consistent Navigation**: Breadcrumbs and back links
6. **Reusable Components**: Build once, use everywhere
7. **Visual Hierarchy**: Clear distinction between headings, labels, and values

---

## Task List

### Phase 1: Foundation & Shared Components

#### ✅ TASK 1.1: Create Unified Page Layout Component
**Priority**: HIGH  
**Estimated Effort**: 2 hours  
**Status**: COMPLETE ✅

**Current State**: Each page manually adds `p-8`, headers are inconsistent, max-widths vary

**Implementation Summary**:
- Created `components/admin/shared/PageHeader.tsx` with:
  - Title with optional icon
  - Description text
  - Back navigation link (with customizable label)
  - Action buttons (primary/secondary variants)
- Created `components/admin/shared/PageContainer.tsx` with:
  - Consistent `p-8` padding
  - Optional `maxWidth` prop ('sm' to '7xl' or 'full')
- Created `components/admin/shared/index.ts` barrel export

**Pages Updated**:
- ✅ `app/admin/dashboard/page.tsx`
- ✅ `app/admin/schools/page.tsx`
- ✅ `app/admin/universities/page.tsx`
- ✅ `app/admin/programs/page.tsx`
- ✅ `app/admin/coordinators/page.tsx`
- ✅ `app/admin/schools/[id]/page.tsx` (with back navigation)

---

#### ✅ TASK 1.2: Create Unified Stat Card Component
**Priority**: HIGH  
**Estimated Effort**: 1 hour  
**Status**: COMPLETE ✅

**Current State**: 
- Dashboard uses inline `StatCard` function component
- Coordinators page has clickable filter stat cards with icons
- Schools page has no stats
- Universities page has no stats
- Programs page has no stats

**Implementation Summary**:
- Created `components/admin/shared/StatCard.tsx` with:
  - Two variants: `compact` (dashboard) and `horizontal` (filter-style)
  - Props: `title`, `value`, `icon`, `href?`, `variant?`, `isActive?`, `iconColor?`, `trend?`
  - Icon color presets: default, green, amber, red, blue, purple
  - Active state styling for filter cards
  - Optional trend indicators (positive/negative with color)
- Added export to barrel file

**Pages Updated**:
- ✅ `app/admin/dashboard/page.tsx` - Uses compact variant
- ✅ `app/admin/coordinators/page.tsx` - Uses horizontal variant with active states

---

#### ✅ TASK 1.3: Create Unified Data Table Component
**Priority**: HIGH  
**Estimated Effort**: 3 hours  
**Status**: COMPLETE ✅

**Current State**: Each list page has its own inline table with similar but inconsistent patterns

**Implementation Summary**:
- Created `components/admin/shared/DataTable.tsx` with:
  - Generic type support for any data type
  - Declarative column definitions with `key`, `header`, `align`, `width`, `render`
  - Consistent styling (rounded container, header bg, hover states, dividers)
  - Row click support via `onRowClick` prop
  - Responsive overflow handling
- Created `components/admin/shared/TableEmptyState.tsx` with:
  - Icon, title, description display
  - Optional action button with href
  - Consistent padding and styling
- Created `components/admin/schools/SchoolsTable.tsx` as example usage
- Added exports to barrel file

**Pages Updated**:
- ✅ `app/admin/schools/page.tsx` - Uses SchoolsTable + TableEmptyState

---

#### ✅ TASK 1.4: Create Search & Filter Bar Component
**Priority**: MEDIUM  
**Estimated Effort**: 2 hours  
**Status**: COMPLETE ✅

**Current State**: No search or filter capabilities on any list page

**Implementation Summary**:
- Created `components/admin/shared/SearchFilterBar.tsx` with:
  - Debounced search input (configurable delay, default 300ms)
  - Clear button for search input
  - Responsive layout (stacks on mobile, side-by-side on desktop)
  - Horizontal scroll container for filter chips
  - "Clear all" button when filters are active
- Created `components/admin/shared/FilterChip.tsx` with:
  - Active/inactive states
  - Color variants: default, success, warning, error
  - Optional icon support
  - Removable option with X button
- Added exports to barrel file

**Usage Example**:
```tsx
<SearchFilterBar
  placeholder="Search schools..."
  searchValue={search}
  onSearchChange={setSearch}
  hasActiveFilters={!!tier}
  onClearAll={handleClearAll}
>
  <FilterChip label="All" isActive={!tier} onClick={() => setTier(null)} />
  <FilterChip label="VIP" isActive={tier === 'VIP'} onClick={() => setTier('VIP')} variant="warning" />
</SearchFilterBar>
```

---

#### ✅ TASK 1.5: Create Unified Info Card Component
**Priority**: MEDIUM  
**Estimated Effort**: 1 hour  
**Status**: COMPLETE ✅

**Current State**: Detail pages use inline card components with inconsistent patterns

**Implementation Summary**:
- Created `components/admin/shared/InfoCard.tsx` with:
  - Props: `title`, `icon?`, `children`, `action?`, `padding?`
  - Two padding sizes: `default` (p-6) and `compact` (p-5)
  - Optional action link in header
  - Consistent border-radius and styling
- Created `InfoRow` helper component for label-value pairs
- Added exports to barrel file

**Pages Updated**:
- ✅ `app/admin/schools/[id]/page.tsx` - All 5 cards now use InfoCard

---

### Phase 2: Dashboard Page

#### ✅ TASK 2.1: Redesign Dashboard Stats Section
**Priority**: HIGH  
**Estimated Effort**: 2 hours  
**Status**: COMPLETE ✅

**Current State**: 
- 6-column grid of small stat cards
- Placeholder analytics sections below

**Implementation Summary**:
- **Hero Stats Row**: 4 horizontal StatCards with colored icons
  - Universities (blue), Programs (purple), Schools (amber), Total Users (green)
- **Secondary Stats Row**: 3 compact StatCards for user breakdown
  - Students, Coordinators, Agents (now fetched and displayed)
- All cards are clickable, linking to respective list pages
- Added description to PageHeader

**Files Modified**:
- `app/admin/dashboard/page.tsx`

---

#### ✅ TASK 2.2: Replace Placeholder Analytics with Quick Access Section
**Priority**: MEDIUM  
**Estimated Effort**: 1.5 hours  
**Status**: COMPLETE ✅

**Current State**: 4 placeholder cards saying "Analytics will be added in upcoming phases"

**Implementation Summary**:
- **Quick Actions Card**: Using InfoCard with Plus icon
  - Add University, Add Program, Add School links
  - Invite Coordinator (with note to go via school page)
  - Hover effects with arrow indicators
- **Platform Overview Card**: Real-time calculated metrics
  - Programs per university average
  - Schools with coordinators percentage
  - Student to coordinator ratio
- **Analytics Preview Card**: Clean "coming soon" messaging
  - Bullet points of planned features
  - Reduced from 4 placeholders to 1 focused preview

**Files Modified**:
- `app/admin/dashboard/page.tsx`

---

### Phase 3: List Pages Consistency

#### ✅ TASK 3.1: Redesign Schools List Page
**Priority**: HIGH  
**Estimated Effort**: 2 hours  
**Status**: COMPLETE ✅

**Current State**: 
- No stats summary at top
- Table with 6 columns
- No search/filter

**Implementation Summary**:
- Created `components/admin/schools/SchoolsListClient.tsx` with:
  - **Stats Row**: 4 horizontal StatCards
    - Total Schools, VIP Schools (amber), Regular Schools, Active Subscriptions (green)
  - **Search Bar**: Debounced search by name, city, or country
  - **Filter Chips**: 
    - Tier filters: All Tiers, VIP, Regular
    - Status filters: Active, Inactive
    - Divider between filter groups
  - **Results count**: "Showing X of Y schools"
  - **No results state**: With clear filters button
- Full-width layout (no max-width restriction)

**Files Created**:
- `components/admin/schools/SchoolsListClient.tsx`

**Files Modified**:
- `app/admin/schools/page.tsx`

---

#### ✅ TASK 3.2: Redesign Universities List Page
**Priority**: HIGH  
**Estimated Effort**: 2 hours  
**Status**: COMPLETE ✅

**Current State**: 
- No stats summary at top
- Table with 5 columns
- No search/filter

**Implementation Summary**:
- Created `components/admin/universities/UniversitiesTable.tsx` using shared DataTable
- Created `components/admin/universities/UniversitiesListClient.tsx` with:
  - **Stats Row**: 4 horizontal StatCards
    - Total Universities, Public (blue), Private (purple), With Programs (green)
  - **Search Bar**: Debounced search by name, abbreviation, city, or country
  - **Filter Chips**: All Types, Public, Private
  - **Results count**: "Showing X of Y universities"
  - **No results state**: With clear filters button
- Full-width layout (no max-width restriction)

**Files Created**:
- `components/admin/universities/UniversitiesTable.tsx`
- `components/admin/universities/UniversitiesListClient.tsx`

**Files Modified**:
- `app/admin/universities/page.tsx`

---

#### ✅ TASK 3.3: Redesign Programs List Page
**Priority**: HIGH  
**Estimated Effort**: 2 hours  
**Status**: COMPLETE ✅

**Current State**: 
- No stats summary at top
- Table with 6 columns
- "Showing X programs" text at bottom

**Implementation Summary**:
- Created `components/admin/programs/ProgramsTable.tsx` using shared DataTable
- Created `components/admin/programs/ProgramsListClient.tsx` with:
  - **Stats Row**: 4 horizontal StatCards
    - Total Programs, Bachelor's (blue), Master's (purple), Other Degrees (amber)
  - **Search Bar**: Debounced search by name, university, field, or city
  - **Filter Chips**: Dynamically generated from unique degree types found in data
  - **Results count**: "Showing X of Y programs" (moved to top)
  - **No results state**: With clear filters button
- Full-width layout (no max-width restriction)

**Files Created**:
- `components/admin/programs/ProgramsTable.tsx`
- `components/admin/programs/ProgramsListClient.tsx`

**Files Modified**:
- `app/admin/programs/page.tsx`

---

#### ✅ TASK 3.4: Align Coordinators Page with New Design System
**Priority**: MEDIUM  
**Estimated Effort**: 1 hour  
**Status**: COMPLETE ✅

**Current State**: Already has stats cards and table, but uses inline components

**Implementation Summary**:
- Created `components/admin/coordinators/CoordinatorsListClient.tsx` with:
  - **Stats Row**: Kept existing 3 StatCards (Total, Active, Pending) with active states
  - **Search Bar**: New debounced search by name, email, or school
  - **Filter Chips**: All, Active (success), Pending (warning) - integrated with URL params
  - **Results count**: "Showing X coordinators matching 'search'"
  - **No results state**: With clear search button
- Moved filtering/sorting logic from server to client for better interactivity
- Kept existing CoordinatorTable (has specialized cell rendering)

**Files Created**:
- `components/admin/coordinators/CoordinatorsListClient.tsx`

**Files Modified**:
- `app/admin/coordinators/page.tsx`

---

### Phase 4: Detail Pages Consistency

#### ✅ TASK 4.1: Create Standard Detail Page Layout
**Priority**: HIGH  
**Estimated Effort**: 2 hours  
**Status**: COMPLETE ✅

**Current State**:
- School detail: `max-w-4xl`, 2-column grid, then full-width coordinators list
- University detail: full-width, 3-column grid
- Coordinator detail: `max-w-4xl`, 2-column grid, then action cards

**Implementation Summary**:
Created `components/admin/shared/DetailPageLayout.tsx` with 3 components:

1. **DetailPageLayout** - Two-column layout (2/3 + 1/3)
   - `children`: Main content for left column (2/3 width)
   - `sidebar?`: Sidebar content for right column (1/3 width)
   - `footer?`: Optional full-width section below columns
   - Responsive: Stacks to single column on mobile (`lg:grid-cols-3`)

2. **DetailSection** - Container for grouping related cards
   - `title?`: Optional section heading
   - `children`: Section content
   - Consistent `space-y-4` spacing

3. **QuickStat** - Compact stat display for sidebars
   - `label`: Stat label
   - `value`: Stat value
   - `icon?`: Optional icon
   - Used for quick stats in sidebar

**Files Created**:
- `components/admin/shared/DetailPageLayout.tsx`

**Exports Added**:
- `DetailPageLayout`, `DetailSection`, `QuickStat` (and their types)

---

#### ✅ TASK 4.2: Redesign School Detail Page
**Priority**: HIGH  
**Estimated Effort**: 1.5 hours  
**Status**: COMPLETE ✅

**Current State**: 
- 4 info cards in 2x2 grid
- Coordinators list at bottom
- Mixed information architecture

**Implementation Summary**:
- Now uses `DetailPageLayout` with responsive 2-column layout
- **Left column (2/3)**:
  - Contact Information card (with website, email, phone, location)
  - Coordinators List card (with clickable links to coordinator detail, empty state with CTA)
- **Right column (1/3)**:
  - Status & Verification card (tier badge, status badge, verification state)
  - Members card (using QuickStat for coordinators/students counts)
  - Logo card (with placeholder icon when no logo)
- Removed max-width restriction for full-width layout
- Added InfoCard action link for "Invite Coordinator"
- Coordinators are now clickable, linking to their detail pages

**Files Modified**:
- `app/admin/schools/[id]/page.tsx`

---

#### ✅ TASK 4.3: Redesign University Detail Page
**Priority**: HIGH  
**Estimated Effort**: 1.5 hours  
**Status**: COMPLETE ✅

**Current State**: Full-width with 3-column layout on large screens

**Implementation Summary**:
- Now uses `PageContainer`, `PageHeader`, `DetailPageLayout` with responsive 2-column layout
- **Left column (2/3)**:
  - About card (with description or placeholder)
  - Contact Information card (website, email, phone with labels)
  - University Agents card (with avatar images, empty state)
  - Programs link card (clickable, shows count)
- **Right column (1/3)**:
  - Quick Stats card (using QuickStat: Programs, Agents, Student Population)
  - Classification card (with icon, label, and description)
  - Location card (with icon, city, country)
  - Logo card (with placeholder icon)
  - Danger Zone (delete button with warning)
- Classification badge in info bar with appropriate icons (Landmark/Building)
- Removed manual back link/header in favor of PageHeader

**Files Modified**:
- `app/admin/universities/[id]/page.tsx`

---

#### ✅ TASK 4.4: Redesign Coordinator Detail Page
**Priority**: MEDIUM  
**Estimated Effort**: 1 hour  
**Status**: COMPLETE ✅

**Current State**: `max-w-4xl`, good structure but inconsistent styling

**Implementation Summary**:
- Now uses `PageContainer`, `PageHeader`, `DetailPageLayout` with responsive 2-column layout
- **Left column (2/3)**:
  - School card (with link to school detail, location, tier badge)
  - Edit Coordinator form card
- **Right column (1/3)**:
  - Account Info card (using QuickStat: Joined date, Status, User ID)
  - Access Control card (with visual indicator, toggle button)
- **Footer (full-width)**:
  - Danger Zone section for delete action
- Info bar shows avatar, status badge, and email
- Uses `DetailPageLayout.footer` prop for danger zone placement
- Removed max-width restriction for full-width layout

**Files Modified**:
- `app/admin/coordinators/[id]/page.tsx`

---

### Phase 5: Missing Pages

#### ✅ TASK 5.1: Create Students Admin Page
**Priority**: HIGH  
**Estimated Effort**: 1.5 hours  
**Status**: COMPLETE ✅

**Current State**: Link exists in sidebar, but page doesn't exist (404)

**Implementation Summary**:
- Created `app/admin/students/page.tsx` with:
  - **Stats Row**: 4 horizontal StatCards (Total, With Profile, Without Profile, With School)
  - **Search Bar**: Debounced search by name, email, or school
  - **Filter Chips**: All Students, With Profile (green), Without Profile (amber), With School (blue)
  - **Results count**: "Showing X of Y students"
- Created `components/admin/students/StudentsListClient.tsx` - Client component for interactivity
- Created `components/admin/students/StudentsTable.tsx` - Using shared DataTable with columns:
  - Student (avatar, name, email)
  - School (linked to school detail, with VIP badge)
  - Profile (Complete/Incomplete status)
  - Activity (courses count, saved programs count)
  - Joined (formatted date)
  - Actions (View link for students with profiles)

**Files Created**:
- `app/admin/students/page.tsx`
- `components/admin/students/StudentsListClient.tsx`
- `components/admin/students/StudentsTable.tsx`

---

#### ✅ TASK 5.2: Create Agents Admin Page
**Priority**: MEDIUM  
**Estimated Effort**: 1.5 hours  
**Status**: COMPLETE ✅

**Current State**: Link exists in sidebar, but page doesn't exist (404)

**Implementation Summary**:
- Created `app/admin/agents/page.tsx` with:
  - **Stats Row**: 4 horizontal StatCards (Total Agents, Public Unis, Private Unis, Unique Universities)
  - **Search Bar**: Debounced search by name, email, or university
  - **Filter Chips**: All Agents, Public Unis, Private Unis
  - **Results count**: "Showing X of Y agents"
- Created `components/admin/agents/AgentsListClient.tsx` - Client component for interactivity
- Created `components/admin/agents/AgentsTable.tsx` - Using shared DataTable with columns:
  - Agent (avatar, name, email)
  - University (linked to detail, with classification icon and location)
  - Type (PUBLIC/PRIVATE badge)
  - Joined (formatted date)
  - Actions (View University link)

**Files Created**:
- `app/admin/agents/page.tsx`
- `components/admin/agents/AgentsListClient.tsx`
- `components/admin/agents/AgentsTable.tsx`

---

### Phase 6: Form Pages Consistency

#### ✅ TASK 6.1: Create Standard Form Layout
**Priority**: MEDIUM  
**Estimated Effort**: 1 hour  
**Status**: COMPLETE ✅

**Current State**: Each form page has different layout and max-width

**Implementation Summary**:
- Created `components/admin/shared/FormPageLayout.tsx` with:
  - **FormPageLayout**: Main layout with back link, title, description, form card wrapper, optional footer
  - **FormSection**: Groups related form fields with title and description
  - **FormDivider**: Visual separator between sections
  - **FormActions**: Container for submit/cancel buttons with alignment options
- Features:
  - Configurable max-width (xl, 2xl, 3xl, 4xl)
  - Optional icon in title
  - Back navigation link
  - Footer slot for danger zone sections
- Exported all components and types in barrel file

**Files Created**:
- `components/admin/shared/FormPageLayout.tsx`

**Files Modified**:
- `components/admin/shared/index.ts` (added exports)

---

#### ✅ TASK 6.2: Align Form Pages with New Layout
**Priority**: LOW  
**Estimated Effort**: 2 hours  
**Status**: COMPLETE ✅

**Current State**: Inline layouts in each form page

**Implementation Summary**:
- Updated all 6 form pages to use `FormPageLayout`:
  - `app/admin/schools/new/page.tsx` - Schools create form
  - `app/admin/schools/[id]/edit/page.tsx` - Schools edit form
  - `app/admin/universities/new/page.tsx` - Universities create form
  - `app/admin/universities/[id]/edit/page.tsx` - Universities edit form
  - `app/admin/programs/new/page.tsx` - Programs create form (max-w-4xl)
  - `app/admin/programs/[id]/edit/page.tsx` - Programs edit form (max-w-4xl)
- Removed inline layout code (divs, manual back links)
- Added proper back navigation links
- Added descriptive header text
- Program forms use wider layout (4xl) for course requirements section

**Files Modified**: (all 6 form pages listed above)

---

### Phase 7: Polish & Micro-Interactions

#### ✅ TASK 7.1: Add Loading States
**Priority**: LOW  
**Estimated Effort**: 1 hour  
**Status**: COMPLETE ✅

**Current State**: No loading states visible during data fetching

**Implementation Summary**:
- Created skeleton components:
  - `StatCardSkeleton` - Single stat card skeleton
  - `StatCardSkeletonRow` - Row of skeleton cards
  - `TableSkeleton` - Table with animated rows/columns
  - `SearchBarSkeleton` - Search input and filter chips
- Created loading.tsx files for all list pages:
  - `app/admin/schools/loading.tsx`
  - `app/admin/universities/loading.tsx`
  - `app/admin/programs/loading.tsx`
  - `app/admin/coordinators/loading.tsx`
  - `app/admin/students/loading.tsx`
  - `app/admin/agents/loading.tsx`
- Uses deterministic widths (not Math.random) for stable rendering
- Matches actual page structure (header, stats, search, table)

**Files Created**:
- `components/admin/shared/StatCardSkeleton.tsx`
- `components/admin/shared/TableSkeleton.tsx`
- 6 loading.tsx files (one per admin list page)

**Files Modified**:
- `components/admin/shared/index.ts` (added skeleton exports)

---

#### ✅ TASK 7.2: Add Breadcrumb Navigation
**Priority**: LOW  
**Estimated Effort**: 1.5 hours  
**Status**: COMPLETE ✅

**Current State**: Detail pages have back links, but no breadcrumbs

**Implementation Summary**:
- Created `components/admin/shared/Breadcrumbs.tsx` with:
  - `Breadcrumbs` component (responsive, accessible)
  - `generateBreadcrumbs` helper function
  - Home icon at dashboard root
  - Clickable parent links, non-clickable current page
  - Truncated labels for long names
- Integrated breadcrumbs into `FormPageLayout` component
- Added breadcrumbs to detail pages:
  - `app/admin/schools/[id]/page.tsx`
  - `app/admin/universities/[id]/page.tsx`
  - `app/admin/coordinators/[id]/page.tsx`
- Added breadcrumbs to edit pages (via FormPageLayout):
  - `app/admin/schools/[id]/edit/page.tsx`
  - `app/admin/universities/[id]/edit/page.tsx`
  - `app/admin/programs/[id]/edit/page.tsx`

**Files Created**:
- `components/admin/shared/Breadcrumbs.tsx`

**Files Modified**:
- `components/admin/shared/FormPageLayout.tsx` (added breadcrumbs prop)
- `components/admin/shared/index.ts` (added exports)
- 6 detail/edit pages (added breadcrumbs)

---

## Implementation Priority Order

### Sprint 1 (Foundation) - ~10 hours
1. TASK 1.1: Page Layout Component
2. TASK 1.2: Stat Card Component
3. TASK 1.3: Data Table Component
4. TASK 1.5: Info Card Component

### Sprint 2 (List Pages) - ~8 hours
1. TASK 2.1: Dashboard Stats Redesign
2. TASK 3.1: Schools List Redesign
3. TASK 3.2: Universities List Redesign
4. TASK 3.3: Programs List Redesign

### Sprint 3 (Detail Pages & Missing) - ~8 hours
1. TASK 4.1: Detail Page Layout
2. TASK 4.2: School Detail Redesign
3. TASK 4.3: University Detail Redesign
4. TASK 5.1: Students Page (Placeholder)
5. TASK 5.2: Agents Page (Placeholder)

### Sprint 4 (Polish) - ~7 hours
1. TASK 1.4: Search Filter Bar
2. TASK 2.2: Dashboard Quick Actions
3. TASK 3.4: Coordinators Page Alignment
4. TASK 4.4: Coordinator Detail Redesign
5. TASK 6.1: Form Page Layout
6. TASK 6.2: Align Form Pages

### Sprint 5 (Enhancement) - ~4 hours
1. TASK 7.1: Loading States
2. TASK 7.2: Breadcrumb Navigation

---

## Component Registry

After implementation, these shared components will exist:

| Component | Location | Purpose |
|-----------|----------|---------|
| `PageHeader` | `components/admin/shared/PageHeader.tsx` | Page title, description, actions |
| `PageContainer` | `components/admin/shared/PageContainer.tsx` | Consistent page padding/layout |
| `StatCard` | `components/admin/shared/StatCard.tsx` | KPI display card |
| `DataTable` | `components/admin/shared/DataTable.tsx` | Sortable data table |
| `TableEmptyState` | `components/admin/shared/TableEmptyState.tsx` | Empty table placeholder |
| `SearchFilterBar` | `components/admin/shared/SearchFilterBar.tsx` | Search and filter controls |
| `FilterChip` | `components/admin/shared/FilterChip.tsx` | Individual filter chip |
| `InfoCard` | `components/admin/shared/InfoCard.tsx` | Info section card |
| `DetailPageLayout` | `components/admin/shared/DetailPageLayout.tsx` | Detail page 2/3 + 1/3 layout |
| `FormPageLayout` | `components/admin/shared/FormPageLayout.tsx` | Form page layout with card |
| `Breadcrumbs` | `components/admin/shared/Breadcrumbs.tsx` | Breadcrumb navigation |
| `TableSkeleton` | `components/admin/shared/TableSkeleton.tsx` | Loading skeleton for tables |
| `StatCardSkeleton` | `components/admin/shared/StatCardSkeleton.tsx` | Loading skeleton for stat cards |

---

## Success Metrics

After implementation, the admin module should meet these criteria:

- [ ] All list pages have consistent stat cards at top
- [ ] All list pages have search/filter capability
- [ ] All detail pages use 2-column layout
- [ ] All pages use full-width layouts (no wasted space)
- [ ] All shared components are in `components/admin/shared/`
- [ ] Students page exists and displays data
- [ ] Agents page exists and displays data
- [ ] All pages have loading states
- [ ] All detail pages have breadcrumbs
- [ ] Icons follow `docs/icons-reference.md` (Lucide only, no emojis)

---

## Notes

- **No Functionality Changes**: This plan is UI/UX only. All existing API routes, data structures, and business logic remain unchanged.
- **B2B Reusability**: Components built here will be reused in the coordinator portal.
- **Accessibility**: Maintain WCAG 2.1 AA compliance during implementation.
- **Responsive Design**: All components must work on tablet/mobile screens.
