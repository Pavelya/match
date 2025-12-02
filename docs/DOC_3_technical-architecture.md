# IB Match Platform - Technical Architecture Proposal
**Version:** 1.1 (Updated December 2025)  
**Last Updated:** December 2, 2025

## Executive Summary

This document outlines the comprehensive technical architecture for the IB Match platform - a sophisticated web application connecting IB students with university programs through an intelligent matching algorithm. The architecture prioritizes **performance at scale** (2-3K programs), **security & privacy compliance**, **code quality**, and **exceptional UX** with Airbnb-inspired minimalist design.

**Tech Stack (December 2025):** Next.js 16, React 19, TypeScript 5, PostgreSQL, Prisma, Algolia, Upstash Redis, Vercel

---

## Core Requirements Summary

### Scale & Performance
- **2,000-3,000 university programs** with complex admission requirements
- **Fast search and retrieval** (< 200ms response time)
- **Complex matching algorithm** with real-time calculations
- **Concurrent users**: Plan for 100-500+ concurrent students during peak admission seasons

### Technical Standards
- **No console logs** - structured logging only
- **No hardcoded values** - comprehensive environment management
- **Best practices** throughout codebase
- **Type safety** end-to-end
- **GDPR & privacy compliance**

### User Experience
- **Airbnb-inspired minimalist design**
- **Responsive** - desktop and mobile web (single responsive version)
- **Visual richness**: university images, country flags, field icons, IB subject icons
- **Fast load times** and smooth interactions

### Subscription Model
- **Students**: 🆓 Always FREE (all students, no exceptions)
- **VIP Schools** (IB Coordinators): 🆓 **FREE - Full Access** to all coordinator features
- **REGULAR Schools WITH Subscription**: 💳 **Paid - Full Access** to all coordinator features  
- **REGULAR Schools WITHOUT Subscription**: 🔒 **Freemium - Limited Access** with upgrade prompts
- **Admin**: 👑 Creates schools, assigns tier (VIP or REGULAR), full platform access
- **Note**: Only REGULAR schools can/need to purchase subscriptions via Stripe

---

## Technology Stack (December 2025)

### Frontend Framework
**Next.js 16 (App Router) + React 19 + TypeScript 5**

**Rationale:**
- **Vercel-optimized**: Native platform for the hosting requirement
- **Turbopack (Stable)**: Now the default bundler - 2-5x faster production builds, up to 10x faster Fast Refresh during development
- **Cache Components**: New `use cache` directive for fine-grained caching control - perfect for matching results
- **React Compiler (Stable)**: Automatic memoization, reducing unnecessary re-renders without manual optimization
- **React Server Components**: Reduce client bundle by 40-60%, faster initial loads
- **TypeScript 5+**: End-to-end type safety preventing runtime errors
- **Image optimization**: Built-in next/image for university logos/photos
- **SEO-friendly**: Server-side rendering for public pages
- **Proxy.ts**: Replaces middleware with clearer network boundary control (better for RBAC)

**Next.js 16 Key Improvements:**
- **Turbopack**: Critical for developer productivity - dramatically faster builds and Hot Module Replacement
- **`use cache` directive**: Explicit caching for matching results, dashboard data
- **Enhanced routing**: Optimized prefetching and layout deduplication for faster navigation
- **Build Performance**: 2-5x faster production builds compared to Next.js 15

**Requirements:**
- Node.js 20.9+ (LTS)
- TypeScript 5.1+

**Alternative considered**: Next.js 15 - rejected as Next.js 16 is stable (released Oct 2025) with significant performance improvements

---

### Database
**PostgreSQL (Vercel Postgres) + Prisma ORM 6.x**

**Rationale:**
- **Relational data**: Complex relationships between students, programs, universities, requirements, schools
- **ACID compliance**: Critical for subscription management, user data integrity
- **PostgreSQL strengths**:
  - JSONB for flexible program requirements (AND/OR conditions)
  - Full-text search capabilities (fallback to Algolia)
  - Excellent indexing for query performance
  - Mature ecosystem
- **Prisma 6.x benefits**:
  - Type-safe database queries (TypeScript integration)
  - Schema migrations with version control
  - Intuitive data modeling
  - Built-in connection pooling
  - Query optimization and caching
  - Performance improvements in Prisma 6

**Vercel Postgres**: Serverless PostgreSQL, optimized for serverless functions, automatic scaling

**Alternative considered**: MongoDB - rejected due to lack of ACID guarantees for transactions, weaker relational support

---

### Search Infrastructure
**Algolia**

**Rationale:**
- **Sub-50ms search**: Industry-leading speed for 2-3K programs
- **Features needed**:
  - Multi-faceted filtering (location, field of study, IB points range)
  - Typo tolerance
  - Synonym handling (e.g., "Computer Science" = "CS")
  - Custom ranking (by match score for logged-in students)
  - Instant search experience
- **Indexing strategy**:
  - Primary index: Program search (name, university, field, location)
  - Secondary index: University search
  - Custom ranking attributes: IB points, match score, program popularity
- **Real-time sync**: Webhook from database on program CRUD operations

**Data flow**: PostgreSQL (source of truth) → Algolia (search index) via sync service

**Cost estimate** (December 2025): ~$50-100/month for 2-3K programs, 10K searches/month

**Alternative considered**: PostgreSQL full-text search - rejected due to inferior performance and UX at scale

---

### Caching Layer
**Upstash Redis**

**Rationale:**
- **Serverless-first**: No connection management overhead, perfect for Vercel edge
- **Use cases**:
  - **Matching results cache**: Student profile + top-10 matches (5-minute TTL) - critical for performance
  - **Session storage**: NextAuth.js session data
  - **Rate limiting**: API protection (magic link emails, search queries)
  - **Static data cache**: IB courses, fields of study, countries (1-hour TTL)
  - **Computed scores**: Expensive match calculations for recently active students
  - **Next.js 16 Cache Components**: Integration with `use cache` directive
- **Global replication**: Fast access worldwide
- **Durable**: Persistence for critical cached data

**Cache invalidation strategy**:
- Student profile update → invalidate student's match cache
- Program update → invalidate affected students' caches (background job)
- Manual cache clear via admin dashboard

**Next.js 16 Integration**: Use `use cache` directive with Redis backend for matching results

---

### Authentication
**NextAuth.js v5 (Auth.js)**

**Rationale:**
- **OAuth providers**: Built-in Google authentication for students
- **Email authentication**: Magic link support out of the box
- **Session management**: JWT tokens + database sessions for security
- **Role-based access**: Custom callbacks for role/permissions
- **Security**: CSRF protection, encrypted tokens
- **Email integration**: Works seamlessly with Resend
- **Next.js 16 compatibility**: Full support for App Router and proxy.ts

**Authentication flows**:
1. **Students**: Email magic link OR Google OAuth
2. **Admins/Coordinators/Agents**: Email magic link only (invitation-based)

**Session strategy**:
- **JWT** for stateless auth (better for serverless)
- **Database sessions** for invited roles (revocation support)
- **Redis** for session caching (performance)

---

### Email Service
**Resend**

**Rationale:**
- **Developer-first**: Simple API, React email templates
- **Deliverability**: High inbox rates
- **Email templates**:
  - React Email components for rich HTML emails
  - Magic link authentication
  - Invitation emails (coordinators, agents, students)
  - Match notifications (optional feature)
  - Subscription confirmations

**Template library**: Shared components for consistent branding (Airbnb-inspired minimalism)

---

### Payments
**Stripe**

**Subscription Model:**
- **VIP Schools**: Full coordinator access **FREE** (no Stripe integration needed)  
- **REGULAR Schools**: Can purchase subscription for full coordinator access
  - **WITH subscription**: Full access (same features as VIP)
  - **WITHOUT subscription**: Freemium/limited access with upgrade prompts

**Rationale:**
- **School-level subscriptions**: REGULAR schools only (VIP schools don't need/can't buy subscriptions)
- **Customer portal**: Self-service subscription management for REGULAR school coordinators
- **Admin control**: Admin assigns tier (VIP or REGULAR) at school creation
- **Features needed**:
  - Subscription plans for REGULAR tier schools
  - Prorated upgrades/downgrades
  - Payment method management
  - Invoice generation
  - Webhook handling (subscription lifecycle events)
- **Security**: PCI compliance handled by Stripe

**Integration**: 
- Stripe Checkout for REGULAR schools purchasing subscription
- Customer Portal for subscription management (REGULAR schools only)
- No Stripe interaction for VIP schools or students

---

### File Storage
**Vercel Blob Storage**

**Use cases**:
- User avatars
- University logos
- University campus images
- School logos

**Rationale**:
- **Vercel-native**: Optimized edge delivery
- **Image optimization**: Integration with next/image
- **Automatic CDN**: Global distribution
- **Next.js 16**: Enhanced image optimization with Turbopack

**Limits**: Max 5MB per image, automatic resizing and optimization

**Alternative**: Cloudinary - considered if need advanced image transformations

---

### Logging & Monitoring
**Structured Logging: Pino + Vercel Logs**

**Rationale**:
- **Pino**: High-performance JSON logger for Node.js
- **Structured logs**: Searchable, filterable in Vercel dashboard
- **Log levels**: ERROR, WARN, INFO, DEBUG
- **Context enrichment**: Request ID, user ID, role, timestamp

**No console.log policy**: Enforced via ESLint rules

**Monitoring stack**:
- **Vercel Analytics**: Performance monitoring, Core Web Vitals
- **Sentry** (optional): Error tracking with source maps
- **Uptime monitoring**: Vercel's built-in monitoring

**Key metrics**:
- API response times
- Match algorithm execution time
- Search query performance
- Cache hit rates
- Error rates by endpoint
- Turbopack build times

---

### Environment & Secrets Management
**Vercel Environment Variables + .env.local**

**Strategy**:
- **Environments**: Development, Preview, Production
- **Secret rotation**: Quarterly rotation for API keys
- **Validation**: Zod schema for environment variables on startup
- **Type-safe access**: Centralized `lib/env.ts` with TypeScript types

**No hardcoded values**:
- API endpoints
- Feature flags
- Rate limits
- Cache TTLs
- Email templates
- Subscription tier limits

**Example structure**:
```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  ALGOLIA_APP_ID: z.string(),
  ALGOLIA_API_KEY: z.string(),
  UPSTASH_REDIS_URL: z.string().url(),
  RESEND_API_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  // ... all env vars with validation
})

export const env = envSchema.parse(process.env)
```

---

## Database Architecture

### Schema Design (Prisma Models)

#### Core Entities

**User**
```prisma
model User {
  id                String    @id @default(cuid())
  email             String    @unique
  name              String?
  avatar            String?
  role              UserRole  @default(STUDENT)
  
  // Role-specific relations
  studentProfile    StudentProfile?
  coordinatorProfile CoordinatorProfile?
  agentProfile      UniversityAgentProfile?
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}

enum UserRole {
  STUDENT
  COORDINATOR
  UNIVERSITY_AGENT
  PLATFORM_ADMIN
}
```

**StudentProfile**
```prisma
model StudentProfile {
  id                String    @id @default(cuid())
  userId            String    @unique
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  schoolId          String?
  school            IBSchool? @relation(fields: [schoolId], references: [id])
  
  // Academic data
  totalIBPoints     Int?
  tokGrade          String? // A, B, C, D, E
  eeGrade           String? // A, B, C, D, E
  
  // Courses taken
  courses           StudentCourse[]
  
  // Preferences
  preferredFields   FieldOfStudy[]
  preferredCountries Country[]
  
  // Saved programs
  savedPrograms     SavedProgram[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([schoolId])
}
```

**StudentCourse**
```prisma
model StudentCourse {
  id                String    @id @default(cuid())
  studentProfileId  String
  studentProfile    StudentProfile @relation(fields: [studentProfileId], references: [id], onDelete: Cascade)
  
  ibCourseId        String
  ibCourse          IBCourse  @relation(fields: [ibCourseId], references: [id])
  
  level             CourseLevel // HL, SL
  grade             Int       // 1-7
  
  @@unique([studentProfileId, ibCourseId])
}

enum CourseLevel {
  HL
  SL
}
```

**IBCourse**
```prisma
model IBCourse {
  id                String    @id @default(cuid())
  name              String
  code              String    @unique
  group             Int       // 1-6 (IB curriculum groups)
  
  studentCourses    StudentCourse[]
  programRequirements ProgramCourseRequirement[]
}
```

**University**
```prisma
model University {
  id                String    @id @default(cuid())
  name              String
  abbreviatedName   String?
  description       String    @db.Text
  
  countryId         String
  country           Country   @relation(fields: [countryId], references: [id])
  city              String
  
  classification    UniversityType // PUBLIC, PRIVATE
  studentPopulation Int?
  
  logo              String?
  image             String?
  websiteUrl        String
  email             String?
  phone             String?
  
  programs          AcademicProgram[]
  agents            UniversityAgentProfile[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([countryId])
}

enum UniversityType {
  PUBLIC
  PRIVATE
}
```

**AcademicProgram**
```prisma
model AcademicProgram {
  id                String    @id @default(cuid())
  name              String
  description       String    @db.Text
  
  universityId      String
  university        University @relation(fields: [universityId], references: [id], onDelete: Cascade)
  
  fieldOfStudyId    String
  fieldOfStudy      FieldOfStudy @relation(fields: [fieldOfStudyId], references: [id])
  
  degreeType        String    // Bachelor, Master, etc.
  duration          String    // "4 years"
  
  // IB Requirements
  minIBPoints       Int?
  
  // Subject requirements (AND/OR logic)
  courseRequirements ProgramCourseRequirement[]
  
  programUrl        String?
  
  savedBy           SavedProgram[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([fieldOfStudyId])
  @@index([universityId])
  @@index([minIBPoints])
}
```

**ProgramCourseRequirement**
```prisma
model ProgramCourseRequirement {
  id                String    @id @default(cuid())
  programId         String
  program           AcademicProgram @relation(fields: [programId], references: [id], onDelete: Cascade)
  
  // OR group - requirements with same orGroupId are alternatives
  orGroupId         String?
  
  ibCourseId        String
  ibCourse          IBCourse  @relation(fields: [ibCourseId], references: [id])
  
  requiredLevel     CourseLevel // HL, SL
  minGrade          Int       // 1-7
  isCritical        Boolean   @default(false)
  
  @@index([programId])
  @@index([ibCourseId])
}
```

**IBSchool**
```prisma
model IBSchool {
  id                String    @id @default(cuid())
  name              String
  
  countryId         String
  country           Country   @relation(fields: [countryId], references: [id])
  city              String
  
  subscriptionTier  SubscriptionTier @default(REGULAR)
  subscriptionStatus SubscriptionStatus @default(ACTIVE)
  
  // Stripe fields - only used for REGULAR tier schools with subscriptions
  // VIP schools: these fields remain NULL (no payment needed)
  stripeCustomerId  String?   @unique
  stripeSubscriptionId String? @unique
  
  studentCount      Int?
  logo              String?
  email             String?
  phone             String?
  
  isVerified        Boolean   @default(false)
  
  coordinators      CoordinatorProfile[]
  students          StudentProfile[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([countryId])
  @@index([subscriptionTier])
}

enum SubscriptionTier {
  VIP      // Full access FREE - Stripe fields NULL
  REGULAR  // Requires subscription for full access
}

enum SubscriptionStatus {
  ACTIVE    // Currently active (for REGULAR with subscription, or VIP schools)
  INACTIVE  // REGULAR school without subscription (freemium mode)
  CANCELLED // REGULAR school cancelled subscription
}
```

**CoordinatorProfile**
```prisma
model CoordinatorProfile {
  id                String    @id @default(cuid())
  userId            String    @unique
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  schoolId          String
  school            IBSchool  @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  
  // Access level logic:
  // - VIP school: Full access to all coordinator features (FREE)
  // - REGULAR school WITH subscription: Full access (PAID)
  // - REGULAR school WITHOUT subscription: Limited/freemium access
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([schoolId])
}
```

**FieldOfStudy**
```prisma
model FieldOfStudy {
  id                String    @id @default(cuid())
  name              String    @unique
  iconName          String?   // Icon identifier for consistent rendering
  
  programs          AcademicProgram[]
  interestedStudents StudentProfile[]
}
```

**Country**
```prisma
model Country {
  id                String    @id @default(cuid())
  name              String    @unique
  code              String    @unique // ISO 3166-1 alpha-2
  flagEmoji         String    // For easy display
  
  universities      University[]
  schools           IBSchool[]
  interestedStudents StudentProfile[]
}
```

**SavedProgram**
```prisma
model SavedProgram {
  id                String    @id @default(cuid())
  studentProfileId  String
  studentProfile    StudentProfile @relation(fields: [studentProfileId], references: [id], onDelete: Cascade)
  
  programId         String
  program           AcademicProgram @relation(fields: [programId], references: [id], onDelete: Cascade)
  
  createdAt         DateTime  @default(now())
  
  @@unique([studentProfileId, programId])
  @@index([studentProfileId])
}
```

**UniversityAgentProfile**
```prisma
model UniversityAgentProfile {
  id                String    @id @default(cuid())
  userId            String    @unique
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  universityId      String
  university        University @relation(fields: [universityId], references: [id], onDelete: Cascade)
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([universityId])
}
```

### Database Optimization Strategy

**Indexes**:
- `AcademicProgram`: `(fieldOfStudyId)`, `(universityId)`, `(minIBPoints)`
- `StudentProfile`: `(schoolId)` for coordinator queries
- `ProgramCourseRequirement`: `(programId)`, `(ibCourseId)`
- `CoordinatorProfile`: `(schoolId)`
- `UniversityAgentProfile`: `(universityId)`
- `SavedProgram`: `(studentProfileId)`
- Composite index: `(name, email)` on User for fast lookups

**Query optimization**:
- **Prisma middleware**: Automatic logging of slow queries (>1s)
- **Connection pooling**: Prisma connection limit = 10 for serverless
- **Prepared statements**: Prisma handles automatically
- **Cascade deletes**: Properly configured for data integrity

**Data seeding**:
- IB courses (official IB curriculum - ~50 courses)
- Countries with flags (~200 countries)
- Fields of study with icons (~30 fields)
- Sample universities and programs for development

---

## Matching Algorithm Implementation

### Architecture

**Location**: `lib/matching/` directory

**Files**:
- `scorer.ts` - Core algorithm implementation
- `types.ts` - TypeScript interfaces for matching
- `weights.ts` - Configurable weight constants
- `cache.ts` - Redis caching layer for match results (uses `use cache`)
- `async-matcher.ts` - Background job for pre-computing matches

### Implementation Approach

**Real-time vs Pre-computed**:
- **Real-time**: On-demand calculation when student views recommendations (max 300ms)
- **Pre-computed** (future optimization): Background job nightly for active students
- **Caching**: Redis cache with Next.js 16 `use cache` directive (5-minute TTL)

**Performance targets**:
- Calculate match score for 1 program: < 5ms
- Calculate matches for 2,000 programs: < 250ms
- Cache hit rate: > 80% for active students

### Code Structure

```typescript
// lib/matching/types.ts
export interface MatchInput {
  student: {
    totalIBPoints: number
    courses: Array<{
      courseId: string
      level: 'HL' | 'SL'
      grade: number
    }>
    preferredFields: string[]
    preferredCountries: string[]
  }
  program: {
    id: string
    minIBPoints: number | null
    courseRequirements: Array<{
      orGroupId: string | null
      courseId: string
      requiredLevel: 'HL' | 'SL'
      minGrade: number
      isCritical: boolean
    }>
    fieldOfStudyId: string
    countryId: string
  }
  weights?: WeightConfig
}

export interface MatchResult {
  programId: string
  overallScore: number // 0-1
  academicMatch: number // G_M
  locationMatch: number // L_M
  fieldMatch: number // F_M
  breakdown: {
    meetsIBPoints: boolean
    courseMatches: CourseMatchDetail[]
    appliedPenalties: string[]
  }
}
```

**Calculation pipeline**:
1. Field match (F_M) - simple lookup
2. Location match (L_M) - simple lookup
3. Academic match (G_M) - complex:
   - Evaluate each course requirement
   - Handle OR groups
   - Calculate subject match score
   - Apply IB points scaling
   - Apply penalties and caps
4. Combine with weights
5. Apply final adjustments and floors

**Optimizations**:
- Early termination: If field/location mismatch with high weight, skip expensive academic calc
- Batch queries: Fetch all programs with one query, evaluate in memory
- Parallel processing: Use Web Workers for large result sets (future)
- **Next.js 16**: Leverage Turbopack for faster algorithm compilation

### Testing Strategy

**Unit tests** for each component:
- Individual scores (F_M, L_M, G_M)
- Partial credit calculations
- Penalty application
- Edge cases from algorithm doc (DOC_2)

**Integration tests**:
- Full matching pipeline
- Performance benchmarks (2,000 programs < 300ms)

---

## API Architecture

### API Routes Structure

**Next.js 16 App Router API Routes** (`app/api/`)

```
app/api/
├── auth/
│   └── [...nextauth]/
│       └── route.ts
├── students/
│   ├── profile/route.ts (GET, PATCH)
│   ├── matches/route.ts (GET)
│   └── saved-programs/route.ts (GET, POST, DELETE)
├── programs/
│   ├── search/route.ts (GET)
│   ├── [id]/route.ts (GET)
│   └── [id]/match/route.ts (GET - for logged-in students)
├── universities/
│   ├── route.ts (GET list, POST - admin only)
│   └── [id]/route.ts (GET, PATCH, DELETE)
├── coordinators/
│   ├── dashboard/route.ts (GET)
│   ├── students/route.ts (GET, POST)
│   └── invite/route.ts (POST)
├── agents/
│   ├── dashboard/route.ts (GET)
│   └── programs/route.ts (GET, POST, PATCH, DELETE)
├── admin/
│   ├── dashboard/route.ts (GET)
│   ├── schools/route.ts (GET, POST)
│   ├── invite/route.ts (POST)
│   └── subscriptions/route.ts (GET)
└── webhooks/
    ├── stripe/route.ts
    └── algolia-sync/route.ts
```

### Middleware & Protection

**Authentication middleware** (`middleware.ts` or `proxy.ts` in Next.js 16):
- Verify JWT token
- Inject user context
- Role-based route protection
- **Next.js 16**: Use proxy.ts for clearer network boundaries

**Rate limiting** (Upstash Redis):
- API calls: 100 requests/minute per user
- Magic link emails: 5 requests/hour per email
- Search queries: 50 requests/minute per user (logged in)

---

## Component Architecture

### Design System

**Inspired by Airbnb Design System**

**Color palette**:
- Primary: `#FF385C` (vibrant red-pink - energetic, academic ambition)
- Neutral: `#222222`, `#717171`, `#DDDDDD`, `#F7F7F7`
- Success: `#00A699` (matches confirmed)
- Warning: `#FFCC00` (near-miss matches)
- Error: `#D93900`

**Typography**:
- Font: `Inter` (Google Fonts) - clean, modern, highly readable
- Headings: 600 weight
- Body: 400 weight
- Captions: 300 weight

**Spacing system**: 4px base unit (Tailwind's spacing scale)

### Component Library Structure

```
components/
├── ui/ (shadcn/ui components)
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── input.tsx
│   └── ... (other primitives)
├── shared/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Avatar.tsx
│   ├── CountryFlag.tsx
│   ├── FieldIcon.tsx
│   └── IBSubjectBadge.tsx
├── student/
│   ├── ProgramCard.tsx (reusable!)
│   ├── MatchScoreDisplay.tsx
│   ├── ProfileForm.tsx
│   └── OnboardingWizard.tsx
├── coordinator/
│   ├── StudentTable.tsx
│   ├── SchoolAnalytics.tsx
│   └── UpgradePrompt.tsx (for Regular schools)
├── agent/
│   ├── ProgramForm.tsx
│   └── MatchAnalytics.tsx
└── admin/
    ├── UserManagement.tsx
    ├── SchoolManagement.tsx
    └── PlatformAnalytics.tsx
```

**Component reusability**:
- `ProgramCard` used across student matches, saved programs, search results, coordinator/agent views
- `Avatar` with consistent initials + color fallback for all roles
- `CountryFlag` for country selection and display
- `FieldIcon` standardized across forms and displays

**Styling approach**: **Tailwind CSS**
- **Utility-first** for flexibility
- **Custom theme** in `tailwind.config.ts` matching Airbnb aesthetic
- **No hardcoded colors** - all via theme variables
- **Responsive design** using Tailwind breakpoints (mobile-first)
- **Turbopack optimization**: Faster CSS compilation with Next.js 16

---

## Responsive Design Strategy

### Single Codebase, Adaptive UI

**Breakpoints** (Tailwind):
- `sm`: 640px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

**Layout patterns**:
- Mobile: Single column, stacked navigation (hamburger menu)
- Tablet: Two-column grids, collapsible sidebar
- Desktop: Multi-column layouts, fixed sidebar, hover interactions

**Key responsive components**:
- **Header**: Mobile hamburger → Desktop horizontal nav
- **Dashboards**: Mobile stacked cards → Desktop grid layouts
- **Program cards**: Mobile full-width → Desktop 2-3 column grid
- **Forms**: Mobile single-column → Desktop multi-step horizontal

**Testing**: Vercel's device preview + manual testing on real devices

---

## Role-Based Access Control & Subscription Model

### Overview

The platform implements a **school-level subscription model** where access to coordinator features is determined by the school's tier, not individual coordinator accounts.

### User Roles & Access Levels

#### 1. Students
**Access**: 🆓 **Always FREE**
- **Features**: Full access to all student features
  - Onboarding wizard
  - Academic profile management
  - Top-10 program recommendations
  - Program search and filtering
  - Save programs
  - View match breakdowns
- **Restrictions**: None
- **Payment**: Never required

#### 2. Platform Administrators
**Access**: 👑 **Full Platform Control**
- **Features**:
  - Create IB schools and assign tier (VIP or REGULAR)
  - Invite coordinators to schools
  - Manage all universities and programs
  - View all students, schools, coordinators
  - Access platform-wide analytics
  - Manage subscriptions and billing data
  - Bulk operations (upload programs, etc.)
- **Restrictions**: None
- **Payment**: N/A (internal role)

#### 3. IB Coordinators
**Access**: Determined by **school's subscription tier**

##### VIP School Coordinators
**Access**: 🆓 **FREE - Full Access**
- School tier set to VIP by admin at creation
- **All coordinator features unlocked**:
  - Student management (unlimited)
  - School analytics (full suite)
  - Invite other coordinators
  - Invite students to school
  - Bulk student data operations
  - Advanced reporting
  - Data exports
  - View student matches
- **Stripe fields**: NULL (no payment setup needed)
- **Cannot purchase subscription**: Don't need it

##### REGULAR School Coordinators WITH Subscription
**Access**: 💳 **Paid - Full Access**
- School tier set to REGULAR by admin
- Active Stripe subscription
- **All coordinator features unlocked** (same as VIP)
- **Subscription management**:
  - Self-service via Stripe Customer Portal
  - Can upgrade/downgrade/cancel
  - Automatic billing

##### REGULAR School Coordinators WITHOUT Subscription  
**Access**: 🔒 **Freemium - Limited Access**
- School tier set to REGULAR by admin
- No active Stripe subscription
- **See full coordinator interface** but with limitations:
  - Student management: Max 10 students
  - Analytics: Basic overview only, advanced features locked
  - No bulk operations
  - No data exports
  - Limited reporting
  - "Upgrade to unlock" prompts throughout UI
- **Can purchase subscription** to unlock full access

#### 4. University Agents (Deprioritized for MVP)
**Access**: 🆓 **FREE**
- Manage their university's programs
- View match analytics for their programs
- Invite other agents to their university

### Implementation Strategy

#### Access Control Logic

```typescript
// lib/auth/access-control.ts

export function getCoordinatorAccess(school: IBSchool): CoordinatorAccess {
  // VIP schools: full access, no payment
  if (school.subscriptionTier === 'VIP') {
    return {
      tier: 'VIP',
      hasFullAccess: true,
      isFree: true,
      canPurchaseSubscription: false,
      features: ALL_COORDINATOR_FEATURES
    }
  }
  
  // REGULAR schools WITH active subscription: full access, paid
  if (school.subscriptionTier === 'REGULAR' && 
      school.subscriptionStatus === 'ACTIVE' && 
      school.stripeSubscriptionId) {
    return {
      tier: 'REGULAR',
      hasFullAccess: true,
      isFree: false,
      canPurchaseSubscription: false, // already subscribed
      canManageSubscription: true,
      features: ALL_COORDINATOR_FEATURES
    }
  }
  
  // REGULAR schools WITHOUT subscription: freemium
  return {
    tier: 'REGULAR',
    hasFullAccess: false,
    isFree: true, // freemium
    canPurchaseSubscription: true,
    features: FREEMIUM_COORDINATOR_FEATURES
  }
}

const ALL_COORDINATOR_FEATURES = {
  studentManagement: {
    maxStudents: null, // unlimited
    canBulkImport: true,
    canExport: true
  },
  analytics: {
    schoolOverview: true,
    advancedReports: true,
    comparativeAnalytics: true,
    dataExport: true
  },
  invitations: {
    canInviteCoordinators: true,
    canInviteStudents: true,
    unlimited: true
  }
}

const FREEMIUM_COORDINATOR_FEATURES = {
  studentManagement: {
    maxStudents: 10,
    canBulkImport: false,
    canExport: false
  },
  analytics: {
    schoolOverview: true, // basic only
    advancedReports: false,
    comparativeAnalytics: false,
    dataExport: false
  },
  invitations: {
    canInviteCoordinators: true,
    canInviteStudents: true,
    unlimited: false // limited to max students
  }
}
```

#### Feature Gating in Components

```typescript
// components/coordinator/UpgradePrompt.tsx
import { getCoordinatorAccess } from '@/lib/auth/access-control'

export function AdvancedAnalytics({ school }: Props) {
  const access = getCoordinatorAccess(school)
  
  if (!access.features.analytics.advancedReports) {
    return (
      <UpgradePrompt
        feature="Advanced Analytics"
        description="Unlock detailed reporting, comparative analytics, and data exports"
      />
    )
  }
  
  return <AnalyticsDashboard school={school} />
}
```

#### API Route Protection

```typescript
// app/api/coordinators/students/export/route.ts
export async function GET(req: Request) {
  const session = await getServerSession()
  if (!session || session.user.role !== 'COORDINATOR') {
    return new Response('Unauthorized', { status: 401 })
  }
  
  const coordinator = await db.coordinatorProfile.findUnique({
    where: { userId: session.user.id },
    include: { school: true }
  })
  
  const access = getCoordinatorAccess(coordinator.school)
  
  // Feature gate: data export
  if (!access.features.analytics.dataExport) {
    return new Response(
      JSON.stringify({ 
        error: 'Subscription required',
        message: 'Upgrade to VIP or purchase subscription to export data'
      }),
      { status: 403 }
    )
  }
  
  // Proceed with export...
}
```

### Admin School Creation Workflow

**When admin creates a new school:**

1. **Admin selects tier**: VIP or REGULAR
2. **If VIP**:
   - `subscriptionTier = VIP`
   - `subscriptionStatus = ACTIVE` (free access)
   - `stripeCustomerId = NULL`
   - `stripeSubscriptionId = NULL`
3. **If REGULAR**:
   - `subscriptionTier = REGULAR`
   - `subscriptionStatus = INACTIVE` (freemium until subscription purchased)
   - `stripeCustomerId = NULL` (will be set when first coordinator subscribes)
   - `stripeSubscriptionId = NULL`

**Admin invites coordinators:**
- Coordinators inherit school's access level
- VIP school coordinators get full access immediately
- REGULAR school coordinators see freemium UI with upgrade options

### Subscription Purchase Flow (REGULAR Schools Only)

1. **Coordinator clicks "Upgrade"** in freemium dashboard
2. **Redirect to Stripe Checkout**:
   - Create Stripe Customer (if not exists)
   - Create Stripe Subscription
3. **Stripe webhook** on successful subscription:
   - Update school: `subscriptionStatus = ACTIVE`
   - Store `stripeCustomerId` and `stripeSubscriptionId`
4. **Coordinator refreshes**: Full access unlocked

### Subscription Management (REGULAR Schools Only)

- **Coordinators** can:
  - View subscription status
  - Access Stripe Customer Portal
  - Update payment method
  - Cancel subscription
- **On cancellation**:
  - Stripe webhook updates: `subscriptionStatus = CANCELLED`
  - School reverts to freemium access immediately
- **Admin** can:
  - View all schools' subscription status
  - See revenue data
  - Change school tier (VIP ↔ REGULAR) manually if needed

### Database Queries for Access Control

```typescript
// Check if coordinator has full access
const coordinatorHasFullAccess = await db.coordinatorProfile.findUnique({
  where: { userId },
  include: { school: true }
}).then(coord => {
  if (!coord) return false
  return coord.school.subscriptionTier === 'VIP' || 
         (coord.school.subscriptionTier === 'REGULAR' && 
          coord.school.subscriptionStatus === 'ACTIVE' &&
          coord.school.stripeSubscriptionId !== null)
})

// Get all schools needing payment reminders (REGULAR tier, cancelled)
const schoolsNeedingRenewal = await db.iBSchool.findMany({
  where: {
    subscriptionTier: 'REGULAR',
    subscriptionStatus: 'CANCELLED'
  },
  include: { coordinators: { include: { user: true } } }
})
```

### Key Differences from Typical SaaS

❌ **NOT like typical SaaS**:
- Individual user subscriptions
- Free trial periods
- Per-user pricing

✅ **IB Match model**:
- School-level subscriptions
- Two school categories: VIP (free forever) and REGULAR (can subscribe)
- Admin assigns VIP status (promotional/partnership tier)
- REGULAR schools have freemium access without payment

---

## Security & Privacy

### GDPR Compliance

**Data protection measures**:
- **Data minimization**: Only collect necessary data
- **Consent**: Explicit consent for data processing (cookie banner, account creation)
- **Right to access**: Users can download their data (account settings)
- **Right to deletion**: Delete account functionality with cascading deletes
- **Data portability**: Export student profile as JSON
- **Encryption**: All data encrypted at rest (Vercel Postgres) and in transit (HTTPS)

**Cookie policy**:
- **Essential cookies**: Authentication session (GDPR-exempt)
- **Analytics cookies**: Opt-in via cookie banner (Vercel Analytics)
- **Banner**: Onetrust or custom implementation

### Authentication Security

**Magic link security**:
- **Token expiry**: 15 minutes
- **Single-use tokens**: Invalidated after first use
- **Rate limiting**: Max 5 magic link requests per hour per email
- **HTTPS only**

**Password-less advantages**:
- No password breaches
- No weak passwords
- Better UX

**Session management**:
- **Secure cookies**: `httpOnly`, `secure`, `sameSite=strict`
- **Session expiry**: 7 days for students, 24 hours for admin roles
- **Logout**: Explicit session revocation

### Data Access Control

**Role-based access control (RBAC)**:
- Middleware/proxy.ts enforces route-level permissions
- API endpoints verify user role before data access
- Database queries filter by user ownership (e.g., coordinators only see their school's students)

**Data isolation**:
- University agents: Only their university's data
- Coordinators: Only their school's data
- Students: Only their own profile

**Audit logging** (future):
- Track admin actions (user creation, deletion, subscription changes)
- Log data access for compliance

---

## Performance Optimization

### Core Web Vitals Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Optimization Strategies

**Next.js 16 Performance Features**:
- **Turbopack**: 2-5x faster production builds, 10x faster dev server
- **Cache Components**: `use cache` directive for matching results, dashboard data
- **Enhanced prefetching**: Optimized route prefetching and layout deduplication
- **React Compiler**: Automatic memoization reduces re-renders

**Server Components**:
- Public pages (landing, search, university/program details) as RSC
- Reduce client bundle by 40-60%

**Code splitting**:
- Route-based splitting (automatic with Next.js)
- Dynamic imports for heavy components (dashboards, charts)

**Image optimization**:
- `next/image` for all images (enhanced in Next.js 16)
- Lazy loading below fold
- Responsive image sizes
- WebP format with JPEG fallback

**Caching strategy**:
- **Static pages**: ISR (Incremental Static Regeneration) for landing, about pages
- **Dynamic data**: Redis cache with `use cache` (5-60 min TTL based on update frequency)
- **CDN**: Vercel Edge Network for static assets

**Database query optimization**:
- Prisma query batching
- Avoid N+1 queries (use `include` carefully)
- Cursor-based pagination for large datasets

---

## Development Workflow

### Project Setup

**Recommended stack versions (December 2025)**:
- Node.js: 20.9+ LTS
- Next.js: 16.x
- React: 19.x
- TypeScript: 5.1+
- Prisma: 6.x

### Code Quality Tools

**Linting**: ESLint v9+ with Flat Config
- **@stylistic/eslint-plugin**: For formatting/stylistic rules (ESLint deprecated these in v8.53.0)
- **@next/eslint-config-next**: Next.js recommended rules
- **Flat Config** (`eslint.config.mjs`): Modern ESLint configuration format
- **Custom rules**: 
  - No `console.log` → Must use logger
  - No hardcoded values → Must use env vars
  - Enforce Pino logger import
- **TypeScript strict mode**: Full type checking

**ESLint Configuration** (`eslint.config.mjs`):
```javascript
import stylistic from '@stylistic/eslint-plugin'
import nextPlugin from '@next/eslint-plugin-next'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@stylistic': stylistic,
      '@next': nextPlugin
    },
    rules: {
      // Stylistic rules (formatting)
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'never'],
      
      // Next.js rules
      ...nextPlugin.configs.recommended.rules,
      
      // Custom rules - NO CONSOLE.LOG
      'no-console': ['error', { allow: [] }],
      
      // TypeScript strict
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    }
  },
  {
    // Allow console in scripts and config files
    files: ['scripts/**', '*.config.{js,mjs,ts}'],
    rules: {
      'no-console': 'off'
    }
  }
]
```

**Prettier Integration**:
- Prettier handles code formatting
- ESLint Stylistic handles code style enforcement
- Run together: `eslint --fix` then `prettier --write`

**Formatting**: Prettier
- Integrated with ESLint via `eslint-config-prettier` (disables conflicting rules)
- Pre-commit hooks (Husky + lint-staged)
- Config:
  ```json
  {
    "semi": false,
    "singleQuote": true,
    "trailingComma": "none",
    "printWidth": 100,
    "tabWidth": 2
  }
  ```

**Type checking**:
- `npm run type-check` (CI/CD step)
- Strict TypeScript config (`strict: true`)

**Testing** (recommended):
- **Unit tests**: Vitest (faster than Jest for modern apps)
- **Integration tests**: Playwright for API routes
- **E2E tests**: Playwright for critical user flows


### Git Workflow

**Branching strategy**:
- `main` - production
- `develop` - staging
- Feature branches: `feature/matching-algorithm`, `feature/coordinator-dashboard`

**Vercel deployments**:
- `main` → Production deployment
- `develop` → Preview deployment (staging environment)
- Feature branches → Ephemeral preview deployments

**Pull request checklist**:
- TypeScript compiles
- ESLint passes
- Tests pass
- No console.logs
- Environment variables documented

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Project scaffolding (Next.js 16, TypeScript 5, Tailwind)
- [ ] Database schema (Prisma 6)
- [ ] Environment setup (Vercel, PostgreSQL, Redis)
- [ ] Authentication (NextAuth.js v5 + magic links)
- [ ] Logging infrastructure (Pino)
- [ ] Design system setup (Tailwind theme, shadcn/ui)

### Phase 2: Core Features (Week 3-5)
- [ ] Student onboarding wizard
- [ ] Academic profile management
- [ ] Matching algorithm implementation (with `use cache`)
- [ ] Program search (Algolia integration)
- [ ] Program/University detail pages
- [ ] Student recommendation page

### Phase 3: Admin & Content (Week 6-7)
- [ ] Admin dashboard
- [ ] University/Program CRUD
- [ ] IB School creation
- [ ] Invitation system (coordinators, agents)
- [ ] Bulk upload tools

### Phase 4: Coordinator Role (Week 8-9)
- [ ] Coordinator dashboard
- [ ] Student management
- [ ] School analytics
- [ ] Subscription management (Stripe integration)
- [ ] Freemium UX (Regular schools)

### Phase 5: University Agent Role (Week 10) - Deprioritized
- [ ] Agent dashboard
- [ ] Program management
- [ ] Match analytics

### Phase 6: Polish & Launch (Week 11-12)
- [ ] Landing page
- [ ] Supporting pages (About, FAQ, Privacy, Terms)
- [ ] Email templates (Resend)
- [ ] Performance optimization (leverage Turbopack)
- [ ] Security audit
- [ ] GDPR compliance verification
- [ ] Production deployment

---

## Alternative Architectures Considered

### Next.js 15 vs Next.js 16
**Decision**: Next.js 16

**Rationale**:
- Stable release (October 2025) - 2 months of production use
- Turbopack performance gains critical for development velocity
- Cache Components perfect for matching results caching
- React Compiler reduces manual optimization work
- No downside - fully backward compatible with Next.js 15 patterns

### Monorepo vs Single Repo
**Decision**: Single Next.js repo

**Rationale**: 
- Smaller team, simpler deployment
- Shared types between frontend/backend trivial
- Vercel optimized for single-app deployments

**Future**: If mobile apps needed, migrate to Turborepo monorepo

### GraphQL vs REST
**Decision**: REST (Next.js API routes)

**Rationale**:
- Simpler for MVP
- Next.js API routes are lightweight
- No GraphQL learning curve
- Direct Prisma → API route → React Server Component flow

**Future**: Consider GraphQL if complex data fetching patterns emerge

### Client-Side vs Server-Side Rendering
**Decision**: Hybrid (RSC + Client Components)

**Pages as RSC**:
- Landing, About, FAQ
- Program/University detail pages
- Search results

**Client Components**:
- Dashboards (interactive charts)
- Forms with complex validation
- Real-time features (future)

---

## Risk Mitigation

### Matching Algorithm Performance
**Risk**: Algorithm too slow for 2-3K programs

**Mitigation**:
- Performance benchmarks early
- Pre-compute matches nightly (background job)
- Redis caching aggressively with `use cache`
- Algolia for pre-filtering programs before matching
- Turbopack for faster algorithm compilation

### Data Privacy / GDPR
**Risk**: Non-compliance fines

**Mitigation**:
- Legal review of privacy policy
- GDPR checklist implementation
- Data deletion functionality
- Cookie consent management
- Encryption at rest and in transit

### Vendor Lock-in (Vercel, Algolia)
**Risk**: Platform dependencies

**Mitigation**:
- **Vercel**: Standard Next.js app, portable to AWS/GCP with minimal changes
- **Algolia**: Abstraction layer (`lib/search/`), can swap to Meilisearch/Typesense
- **Upstash Redis**: Standard Redis protocol, portable

### Next.js 16 Adoption
**Risk**: New version instability

**Mitigation**:
- Released October 2025 - 2 months of production testing by community
- Vercel's flagship framework - well-tested and supported
- Active community and rapid bug fixes
- Backward compatible with Next.js 15 patterns

---

## Critical Architecture Decisions

> [!IMPORTANT]
> **University Representative Role Deferral**
> The architecture supports the University Agent role fully (database schema, API routes, dashboard components), but implementation will be **deprioritized** as requested. Core focus: students, coordinators, admins.

> [!WARNING]
> **Algolia Costs at Scale**
> Algolia pricing scales with records and search operations. For 2-3K programs with moderate traffic (est. 10K searches/month), cost is ~$50-100/month. If traffic exceeds 100K searches/month, consider self-hosted alternatives (Meilisearch, Typesense).

> [!CAUTION]
> **Matching Algorithm Complexity**
> The algorithm has 10+ edge cases (critical subjects, OR groups, partial credits, multiple penalties). **Extensive testing required** before launch. Budget 1-2 weeks for algorithm implementation and testing alone.

---

## Initial Project Structure

```
ibmatch/
├── .env.example
├── .env.local (local development)
├── eslint.config.mjs (ESLint v9+ flat config)
├── .prettierrc
├── next.config.js (Turbopack enabled)
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/
│   ├── icons/ (field icons, IB subject icons)
│   └── flags/ (country flags as SVGs)
├── app/
│   ├── layout.tsx
│   ├── page.tsx (landing)
│   ├── auth/
│   │   ├── login/ (student login)
│   │   ├── admin-login/
│   │   ├── coordinator-login/
│   │   └── agent-login/
│   ├── student/
│   │   ├── onboarding/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── saved/
│   │   └── layout.tsx
│   ├── coordinator/
│   │   ├── dashboard/
│   │   └── layout.tsx
│   ├── admin/
│   │   ├── dashboard/
│   │   └── layout.tsx
│   ├── programs/
│   │   ├── search/
│   │   └── [id]/
│   ├── universities/
│   │   └── [id]/
│   └── api/ (API routes)
├── components/ (as detailed above)
├── lib/
│   ├── auth/ (NextAuth config)
│   ├── db/ (Prisma client)
│   ├── redis/ (Upstash client)
│   ├── algolia/ (search client)
│   ├── email/ (Resend templates)
│   ├── matching/ (algorithm with use cache)
│   ├── logger/ (Pino setup)
│   ├── env.ts (validated env vars)
│   └── utils.ts
├── types/
│   └── index.ts (shared TypeScript types)
├── proxy.ts (Next.js 16 - replaces middleware)
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

---

## Verification Plan

### Manual Verification Steps

Since this is a greenfield architecture proposal (no code yet), verification will occur during implementation:

1. **Environment Setup Verification**
   - Create Vercel project
   - Set up PostgreSQL database (Vercel Postgres)
   - Configure Upstash Redis instance
   - Set up Algolia account and indexes
   - Configure Resend API key
   - All environment variables validated via Zod schema

2. **Database Schema Verification**
   - Run `npx prisma migrate dev`
   - Seed database with IB courses, countries, sample data
   - Verify relationships in Prisma Studio
   - Test cascade deletes (user deletion removes profile)

3. **Matching Algorithm Verification**
   - Implement unit tests for all algorithm components
   - Test against examples in DOC_2 (matching-algo IX.md)
   - Performance benchmark: 2,000 programs in < 300ms
   - Cache hit rate monitoring with `use cache`

4. **Authentication Flow Verification**
   - Test magic link for each role
   - Test Google OAuth for students
   - Verify role-based route protection
   - Test invitation flows

5. **Search Performance Verification**
   - Index 2,000+ programs in Algolia
   - Test search response time < 100ms
   - Test faceted filtering
   - Verify sync from PostgreSQL to Algolia

6. **Responsive Design Verification**
   - Test on mobile (iPhone 14, Pixel 7)
   - Test on tablet (iPad)
   - Test on desktop (various screen sizes)
   - Lighthouse scores: All 90+

7. **Code Quality Verification**
   - No `console.log` statements (ESLint check)
   - TypeScript strict mode passes
   - All environment variables in .env.example
   - Prettier formatting consistent

8. **GDPR Compliance Verification**
   - Cookie consent banner functional
   - Account deletion removes all user data
   - Privacy policy complete
   - Data export functionality works

9. **Next.js 16 Feature Verification**
   - Turbopack build performance (measure improvement)
   - `use cache` directive working with Redis
   - React Compiler optimization active
   - Proxy.ts route protection working

### Automated Tests (Post-Implementation)

**Unit tests**:
```bash
npm run test:unit
```
- Matching algorithm components (50+ test cases)
- Utility functions
- Data transformations

**API tests**:
```bash
npm run test:api
```
- Authentication endpoints
- CRUD operations
- Permission checks

**E2E tests** (critical flows):
```bash
npm run test:e2e
```
- Student onboarding flow
- Match generation
- Program search and filtering
- Coordinator student management

---

## Summary

This architecture provides:

✅ **Performance**: Next.js 16 Turbopack, Algolia search, Redis caching, optimized matching algorithm  
✅ **Scalability**: Serverless architecture, 2-3K programs ready, horizontal scaling  
✅ **Security**: GDPR-compliant, magic links, RBAC, encrypted data  
✅ **Code Quality**: TypeScript 5, ESLint, no console.logs, env validation, structured logging  
✅ **UX Excellence**: Airbnb-inspired design, responsive, fast load times  
✅ **Maintainability**: Clear architecture, reusable components, comprehensive documentation  
✅ **Modern Stack**: Latest stable versions (Next.js 16, React 19, TypeScript 5, Prisma 6)

**Next steps**: Implementation begins with Phase 1 (Foundation).

---

**Document Version History:**
- v1.0 - Initial architecture proposal (Next.js 15)
- v1.1 - Updated for December 2025 stack (Next.js 16, enhanced with Turbopack, Cache Components, React Compiler)
