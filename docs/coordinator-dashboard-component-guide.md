# Coordinator Dashboard Component Reuse Guide

This document outlines how the shared dashboard components can be reused for the IB Coordinator Dashboard, ensuring consistent UX/UI between the Platform Admin and Coordinator dashboards.

## Overview

The components in `/components/admin/shared` are **role-agnostic** and designed to work across different dashboard types:

- **Platform Admin Dashboard** (current - implemented)
- **IB Coordinator Dashboard** (future - documented here)
- **University Agent Dashboard** (future)

> **Note**: Despite being in the `/admin/shared` folder, these components are designed for reuse. When implementing the Coordinator dashboard, import from `@/components/admin/shared`.

## Component Mapping for Coordinator Dashboard

### Key Components and Their Coordinator Use Cases

| Component | Admin Use | Coordinator Use |
|-----------|-----------|-----------------|
| `PageContainer` | Full-width wrapper | Same wrapper for coordinator pages |
| `PageHeader` | Admin page titles with actions | Coordinator page titles, "Invite Student" action |
| `StatCard` | Platform metrics (users, programs) | School metrics (students, avg IB score) |
| `StatCard` (locked) | N/A | Show locked features for Regular tier |
| `DataTable` | List universities, programs, students | List school's students, view profiles |
| `SearchFilterBar` | Search/filter all entities | Search/filter school's students |
| `InfoCard` | Display entity details | School info, subscription status |
| `InfoRow` | Key-value pairs | Student details, school info |
| `DetailPageLayout` | Two-column layouts for entities | Student detail view |
| `TableEmptyState` | Empty state for tables | "No students yet" states |
| `Breadcrumbs` | Navigation breadcrumbs | School > Students > [Name] |
| `UpgradePromptBanner` | N/A | VIP upgrade prompts for Regular tier |
| `FormPageLayout` | Create/edit forms | Invite student, edit profile forms |

---

## VIP vs Regular School Access Control

The IB Coordinator dashboard must differentiate between VIP and Regular tier schools. Components support this through:

### 1. StatCard `locked` Prop

```tsx
import { StatCard } from '@/components/admin/shared'
import { BarChart3 } from 'lucide-react'

// Show locked stat for Regular tier schools
<StatCard
  title="Match Distribution"
  value={0}
  icon={BarChart3}
  locked={school.subscriptionTier !== 'VIP'}
  lockedMessage="Upgrade to VIP"
/>
```

### 2. UpgradePromptBanner Component

```tsx
import { UpgradePromptBanner } from '@/components/admin/shared'

// Inline variant - for small prompts
<UpgradePromptBanner
  feature="Advanced Analytics"
  description="Track student match performance over time"
  variant="inline"
/>

// Card variant - for prominent feature blocks
<UpgradePromptBanner
  feature="Comparative Statistics"
  description="See how your school compares to global averages"
  variant="card"
  upgradeHref="/coordinator/settings/subscription"
/>

// Subtle variant - for inline text prompts
<UpgradePromptBanner
  feature="Export Data"
  variant="subtle"
/>
```

### 3. Conditional Feature Rendering

```tsx
// Pattern for VIP-only features
{school.subscriptionTier === 'VIP' ? (
  <AdvancedAnalyticsSection data={analytics} />
) : (
  <UpgradePromptBanner
    feature="Advanced Analytics"
    description="Unlock detailed insights about your students' university matches"
    variant="card"
  />
)}
```

### 4. Regular Tier Usage Limits

```tsx
// Example: Limiting student invitations for Regular tier
const MAX_STUDENTS_REGULAR = 10

const canInviteMore = school.subscriptionTier === 'VIP' || 
  school.studentCount < MAX_STUDENTS_REGULAR

{!canInviteMore && (
  <UpgradePromptBanner
    feature={`Student Limit Reached (${MAX_STUDENTS_REGULAR})`}
    description="Upgrade to VIP for unlimited student invitations"
    variant="inline"
  />
)}
```

---

## Coordinator Dashboard Pages Structure

Based on requirements (DOC_1_ibmatch-requirements-doc.md Section 5.4):

```
app/coordinator/
├── layout.tsx                    # Coordinator layout with sidebar
├── page.tsx                      # Redirect to /coordinator/dashboard
├── dashboard/
│   └── page.tsx                  # Main dashboard with KPIs
├── students/
│   ├── page.tsx                  # Student list (with search/filter)
│   ├── [id]/
│   │   ├── page.tsx              # Student detail/profile view
│   │   └── edit/
│   │       └── page.tsx          # Edit student academic data
│   └── invite/
│       └── page.tsx              # Invite students form
├── team/
│   ├── page.tsx                  # Other coordinators list
│   └── invite/
│       └── page.tsx              # Invite coordinator form
├── analytics/
│   └── page.tsx                  # School analytics (VIP only)
├── settings/
│   ├── page.tsx                  # School settings overview
│   ├── subscription/
│   │   └── page.tsx              # Subscription management (Stripe portal)
│   └── delete-request/
│       └── page.tsx              # Request school deletion
└── account/
    └── page.tsx                  # Personal account settings
```

---

## Component Usage Examples

### Dashboard Home Page

```tsx
// app/coordinator/dashboard/page.tsx
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import {
  PageContainer,
  PageHeader,
  StatCard,
  InfoCard,
  UpgradePromptBanner
} from '@/components/admin/shared'
import {
  GraduationCap,
  Users,
  Target,
  CheckCircle,
  Bookmark,
  TrendingUp
} from 'lucide-react'

export default async function CoordinatorDashboard() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/signin')

  // Get coordinator's school data
  const coordinator = await prisma.iBCoordinator.findFirst({
    where: { userId: session.user.id },
    include: {
      school: {
        include: {
          _count: { select: { students: true, coordinators: true } }
        }
      }
    }
  })

  if (!coordinator?.school) redirect('/coordinator/setup')

  const school = coordinator.school
  const isVIP = school.subscriptionTier === 'VIP'

  // Fetch school statistics
  const stats = await prisma.studentProfile.aggregate({
    where: { schoolId: school.id },
    _avg: { totalIBPoints: true },
    _count: true
  })

  return (
    <PageContainer>
      <PageHeader
        title="School Dashboard"
        icon={GraduationCap}
        description={`Welcome back! Here's an overview of ${school.name}`}
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Students"
          value={school._count.students}
          icon={Users}
          href="/coordinator/students"
          iconColor="blue"
        />
        <StatCard
          title="Avg IB Score"
          value={Math.round(stats._avg.totalIBPoints || 0)}
          icon={Target}
          iconColor="green"
        />
        <StatCard
          title="Coordinators"
          value={school._count.coordinators}
          icon={Users}
          href="/coordinator/team"
        />
        <StatCard
          title="Match Insights"
          value={0}
          icon={TrendingUp}
          locked={!isVIP}
          lockedMessage="VIP Feature"
        />
      </div>

      {/* Analytics Preview */}
      {isVIP ? (
        <AnalyticsPreview schoolId={school.id} />
      ) : (
        <UpgradePromptBanner
          feature="Advanced Analytics"
          description="Track student match performance, popular fields, and compare with global trends"
          variant="card"
        />
      )}

      {/* Quick Actions */}
      <InfoCard title="Quick Actions" className="mt-6">
        <div className="grid grid-cols-2 gap-4">
          <Link href="/coordinator/students/invite" className="...">
            Invite Student
          </Link>
          <Link href="/coordinator/team/invite" className="...">
            Invite Coordinator
          </Link>
        </div>
      </InfoCard>
    </PageContainer>
  )
}
```

### Student List Page

```tsx
// app/coordinator/students/page.tsx
import {
  PageContainer,
  PageHeader,
  DataTable,
  SearchFilterBar,
  TableEmptyState,
  UpgradePromptBanner,
  type Column
} from '@/components/admin/shared'
import { Users, UserPlus } from 'lucide-react'

interface Student {
  id: string
  name: string
  email: string
  totalIBPoints: number | null
  coursesCount: number
}

const columns: Column<Student>[] = [
  {
    key: 'name',
    header: 'Student',
    render: (student) => (
      <div>
        <div className="font-medium">{student.name}</div>
        <div className="text-sm text-muted-foreground">{student.email}</div>
      </div>
    )
  },
  {
    key: 'ibPoints',
    header: 'IB Points',
    render: (student) => student.totalIBPoints ?? '—'
  },
  {
    key: 'courses',
    header: 'Courses',
    render: (student) => student.coursesCount
  },
  {
    key: 'actions',
    header: '',
    render: (student) => (
      <Link href={`/coordinator/students/${student.id}`}>
        View Profile
      </Link>
    )
  }
]

export default async function CoordinatorStudents() {
  // ... fetch school and students
  const isVIP = school.subscriptionTier === 'VIP'
  const MAX_STUDENTS_REGULAR = 10
  const canInvite = isVIP || students.length < MAX_STUDENTS_REGULAR

  return (
    <PageContainer>
      <PageHeader
        title="Students"
        icon={Users}
        description="Manage students linked to your school"
        actions={[
          {
            label: 'Invite Student',
            href: '/coordinator/students/invite',
            icon: UserPlus,
            variant: 'primary',
            disabled: !canInvite
          }
        ]}
      />

      {/* Usage limit warning for Regular tier */}
      {!isVIP && students.length >= MAX_STUDENTS_REGULAR - 2 && (
        <UpgradePromptBanner
          feature={`${MAX_STUDENTS_REGULAR - students.length} invites remaining`}
          description="Upgrade to VIP for unlimited student invitations"
          variant="subtle"
          className="mb-4"
        />
      )}

      <SearchFilterBar
        searchPlaceholder="Search students by name or email..."
        onSearch={handleSearch}
        activeFilterCount={0}
      />

      {students.length === 0 ? (
        <TableEmptyState
          icon={Users}
          title="No students yet"
          description="Invite students to link their IB Match accounts to your school"
          actionLabel="Invite Student"
          actionHref="/coordinator/students/invite"
        />
      ) : (
        <DataTable
          columns={columns}
          data={students}
          getRowKey={(s) => s.id}
        />
      )}
    </PageContainer>
  )
}
```

### Student Detail Page

```tsx
// app/coordinator/students/[id]/page.tsx
import {
  PageContainer,
  PageHeader,
  DetailPageLayout,
  InfoCard,
  InfoRow,
  Breadcrumbs
} from '@/components/admin/shared'
import { User, Target, BookOpen, Globe } from 'lucide-react'

export default async function StudentDetailPage({ params }) {
  // ... fetch student with profile
  
  return (
    <PageContainer>
      <Breadcrumbs
        items={[
          { label: 'Students', href: '/coordinator/students' },
          { label: student.name || student.email }
        ]}
        className="mb-6"
      />

      <PageHeader
        backHref="/coordinator/students"
        title={student.name || 'Student Profile'}
        icon={User}
        actions={[
          { label: 'Edit Profile', href: `${student.id}/edit`, icon: Pencil }
        ]}
      />

      <DetailPageLayout
        sidebar={
          <>
            <InfoCard title="Quick Stats" icon={Target}>
              <InfoRow label="IB Points" value={profile?.totalIBPoints?.toString() ?? '—'} />
              <InfoRow label="TOK Grade" value={profile?.tokGrade ?? '—'} />
              <InfoRow label="EE Grade" value={profile?.eeGrade ?? '—'} />
              <InfoRow label="Courses" value={profile?.courses.length.toString() ?? '0'} />
            </InfoCard>

            <InfoCard title="Preferences" icon={Globe}>
              <InfoRow label="Fields" value={profile?.preferredFields.length.toString() ?? '0'} />
              <InfoRow label="Countries" value={profile?.preferredCountries.length.toString() ?? '0'} />
            </InfoCard>
          </>
        }
      >
        {/* Main content: courses, recommendations, etc. */}
        <InfoCard title="IB Courses" icon={BookOpen}>
          {/* Course list */}
        </InfoCard>

        <InfoCard title="Top Matches">
          {/* Student's program matches */}
        </InfoCard>
      </DetailPageLayout>
    </PageContainer>
  )
}
```

---

## Creating the Coordinator Sidebar

The coordinator sidebar should follow the same pattern as `AdminSidebar.tsx`:

```tsx
// components/coordinator/CoordinatorSidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  UserCog,
  BarChart3,
  Settings,
  Crown,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavLink {
  label: string
  href: string
  icon: LucideIcon
  vipOnly?: boolean
}

const navLinks: NavLink[] = [
  { label: 'Dashboard', href: '/coordinator/dashboard', icon: LayoutDashboard },
  { label: 'Students', href: '/coordinator/students', icon: Users },
  { label: 'Team', href: '/coordinator/team', icon: UserCog },
  { label: 'Analytics', href: '/coordinator/analytics', icon: BarChart3, vipOnly: true },
  { label: 'Settings', href: '/coordinator/settings', icon: Settings },
]

interface CoordinatorSidebarProps {
  school: {
    name: string
    subscriptionTier: 'VIP' | 'REGULAR'
  }
  user: {
    name: string | null
    email: string
    image: string | null
  }
}

export function CoordinatorSidebar({ school, user }: CoordinatorSidebarProps) {
  const pathname = usePathname()
  const isVIP = school.subscriptionTier === 'VIP'

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-card border-r flex flex-col">
      {/* Logo & School Name */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">IB Match</span>
          {isVIP && <Crown className="h-4 w-4 text-amber-500" />}
        </div>
        <p className="text-sm text-muted-foreground truncate mt-1">
          {school.name}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href)
          const isLocked = link.vipOnly && !isVIP

          return (
            <Link
              key={link.href}
              href={isLocked ? '/coordinator/settings/subscription' : link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                isLocked && 'opacity-60'
              )}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
              {isLocked && <Crown className="h-3 w-3 ml-auto text-amber-500" />}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-3">
          <Avatar user={user} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground">Coordinator</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </aside>
  )
}
```

---

## Key Differences from Admin Dashboard

| Aspect | Admin Dashboard | Coordinator Dashboard |
|--------|-----------------|----------------------|
| Data Scope | All platform data | School-specific data only |
| User List | All users platform-wide | Only students at their school |
| Student Management | View-only (no edit) | Full CRUD (with student consent) |
| Analytics | Platform-wide metrics | School-level metrics only |
| Invitation | Invite any role to platform | Invite students/coordinators to school |
| Subscription | View/manage all schools | Manage own school's subscription |
| Delete Requests | Process all requests | Submit request for own school |
| Access Control | Full access | VIP vs Regular tier limits |

---

## Authentication & Authorization

### Route Protection

```tsx
// app/coordinator/layout.tsx
import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { CoordinatorSidebar } from '@/components/coordinator/CoordinatorSidebar'

export default async function CoordinatorLayout({ children }) {
  const session = await auth()

  // Redirect if not authenticated
  if (!session?.user?.id) {
    redirect('/auth/coordinator/signin')
  }

  // Verify user is a coordinator
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      coordinator: {
        include: { school: true }
      }
    }
  })

  if (user?.role !== 'IB_COORDINATOR' || !user.coordinator?.school) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <CoordinatorSidebar
        school={user.coordinator.school}
        user={user}
      />
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}
```

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Create `/app/coordinator` folder structure
- [ ] Create `CoordinatorSidebar.tsx` based on AdminSidebar
- [ ] Create `CoordinatorLayout.tsx` with sidebar and auth
- [ ] Set up route protection for coordinator role

### Phase 2: Core Pages
- [ ] Implement dashboard home page with StatCards
- [ ] Implement student list with DataTable and search
- [ ] Implement student detail with DetailPageLayout
- [ ] Implement team (coordinators) list page

### Phase 3: Actions
- [ ] Create student invitation form and API
- [ ] Create coordinator invitation form and API
- [ ] Implement student profile editing (with consent)

### Phase 4: VIP Features
- [ ] Add VIP/Regular tier access control
- [ ] Implement analytics page (VIP only)
- [ ] Add UpgradePromptBanner for locked features
- [ ] Create subscription management page (Stripe portal)

### Phase 5: Polish
- [ ] Add loading states with skeletons
- [ ] Implement error boundaries
- [ ] Add empty states for all lists
- [ ] Test VIP vs Regular tier flows

---

## API Endpoints Needed

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/coordinator/students` | GET | List students at coordinator's school |
| `/api/coordinator/students/[id]` | GET, PATCH | Get/update student profile |
| `/api/coordinator/students/invite` | POST | Send student invitation |
| `/api/coordinator/team` | GET | List coordinators at school |
| `/api/coordinator/team/invite` | POST | Send coordinator invitation |
| `/api/coordinator/analytics` | GET | School analytics (VIP only) |
| `/api/coordinator/settings` | GET, PATCH | School settings |
| `/api/coordinator/subscription` | GET | Get Stripe portal URL |

---

## Notes

1. **Import Path**: Continue using `@/components/admin/shared` for shared components. A future refactor could move these to `@/components/dashboard/shared`.

2. **School Context**: Most coordinator pages need the school context. Consider creating a `useSchool()` hook or passing school data through layout.

3. **Student Consent**: When coordinators edit student data, ensure proper consent flows are implemented as per GDPR requirements.

4. **Stripe Integration**: Subscription management uses Stripe Customer Portal. Ensure the school has a Stripe customer ID.
