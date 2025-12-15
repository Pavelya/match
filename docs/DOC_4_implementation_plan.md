# IB Match Platform - Implementation Plan

**Architecture Reference**: [DOC_3_technical-architecture.md](./DOC_3_technical-architecture.md)  
**Status**: Planning Approved ✅  
**Start Date**: TBD  
**Target Completion**: 12 weeks

---

## How to Use This Document

- **Track Progress**: Mark items as `[/]` when in progress, `[x]` when complete
- **Acceptance Criteria**: Each task has specific validation steps
- **Testing**: Test checklist provided for each deliverable
- **Dependencies**: Tasks are ordered sequentially within phases
- **Single Source**: Update this document as you work

---

## Phase 1: Foundation (Weeks 1-2)

**Goal**: Set up development environment, project structure, and core infrastructure

### 1.1 Project Initialization

- [x] **Initialize Next.js 16 project**
  - **Command**: `npx create-next-app@latest ibmatch --typescript --tailwind --app --use-npm`
  - **Acceptance**: 
    - ✓ Next.js 16.x installed
    - ✓ TypeScript 5.1+ configured
    - ✓ App Router structure created
    - ✓ Tailwind CSS working
  - **Test**: `npm run dev` - app loads on localhost:3000

- [x] **Configure Turbopack**
  - **File**: `next.config.js`
  - **Add**: `turbo: { enabled: true }`
  - **Acceptance**: ✓ Dev server uses Turbopack
  - **Test**: Check terminal output shows "Using Turbopack"

- [x] **Set up ESLint with flat config**
  - **Install**: `npm i -D @stylistic/eslint-plugin @typescript-eslint/parser eslint-config-prettier`
  - **Create**: `eslint.config.mjs` (see architecture doc)
  - **Acceptance**: 
    - ✓ Flat config working
    - ✓ No console.log rule enforced
    - ✓ TypeScript rules active
  - **Test**: `npm run lint` - should pass with no errors

- [x] **Set up Prettier**
  - **Create**: `.prettierrc`
  - **Install**: `npm i -D prettier`
  - **Acceptance**: ✓ Code auto-formats on save
  - **Test**: Format a file, verify semi=false, singleQuote=true

- [x] **Configure Git hooks**
  - **Install**: `npm i -D husky lint-staged`
  - **Setup**: `npx husky init`
  - **Add**: Pre-commit hook for lint + format
  - **Acceptance**: ✓ Commits trigger lint/format
  - **Test**: Try committing with console.log - should fail

### 1.2 Database Setup

- [x] **Initialize Prisma**
  - **Command**: `npm i -D prisma && npx prisma init`
  - **Acceptance**: ✓ `prisma/schema.prisma` created
  - **Test**: File exists with PostgreSQL datasource

- [x] **Create Prisma schema**
  - **File**: `prisma/schema.prisma`
  - **Add**: All models from architecture (User, StudentProfile, University, etc.)
  - **Acceptance**: 
    - ✓ 13 models defined
    - ✓ Relations configured
    - ✓ Indexes added
  - **Test**: `npx prisma format` - no errors

- [x] **Set up Supabase Postgres**
  - **Action**: Create Supabase project, add Postgres
  - **Acceptance**: ✓ DATABASE_URL in .env
  - **Test**: Copy URL to `.env`, connect successfully

- [x] **Run initial migration**
  - **Command**: `npx prisma migrate dev --name init`
  - **Acceptance**: 
    - ✓ Migration files created
    - ✓ Database tables created
  - **Test**: `npx prisma studio` - see all tables

- [x] **Create seed script**
  - **File**: `prisma/seed.ts`
  - **Add**: 
    - All IB courses (16)
    - Countries with flags (10)
    - Fields of study (10)
  - **Acceptance**: ✓ Seed data script ready
  - **Test**: `npx prisma db seed` - data populates

### 1.3 Environment Configuration

- [x] **Create environment validation**
  - **Install**: `npm i zod`
  - **File**: `lib/env.ts`
  - **Add**: Zod schema for all env vars (see architecture)
  - **Acceptance**: 
    - ✓ All required vars validated
    - ✓ TypeScript types exported
  - **Test**: Missing var → app crashes on startup with clear error

- [x] **Create .env.example**
  - **File**: `.env.example`
  - **Add**: All env vars with descriptions
  - **Acceptance**: ✓ No secret values, only placeholders
  - **Test**: Copy to .env.local, fill in, app starts

- [ ] **Set up Vercel environment variables**
  - **Action**: Add vars to Vercel project (Preview + Production)
  - **Acceptance**: ✓ All vars configured
  - **Test**: Deploy preview, check env vars work

### 1.4 Upstash Redis Setup

- [x] **Create Upstash Redis instance**
  - **Action**: Create database on Upstash dashboard
  - **Acceptance**: ✓ Instance created, URL obtained
  - **Test**: Copy URL to .env

- [x] **Create Redis client**
  - **Install**: `npm i @upstash/redis`
  - **File**: `lib/redis/client.ts`
  - **Add**: Upstash Redis client singleton
  - **Acceptance**: ✓ Client initialized with env vars
  - **Test**: `await redis.set('test', 'value')` works

### 1.5 Authentication Setup

- [x] **Install NextAuth.js v5**
  - **Command**: `npm i next-auth@beta`
  - **Acceptance**: ✓ NextAuth v5 installed
  - **Test**: Check package.json version

- [x] **Configure NextAuth**
  - **File**: `lib/auth/config.ts`
  - **Add**: 
    - Email provider (magic links)
    - Google OAuth provider
    - Prisma adapter
  - **Acceptance**: 
    - ✓ Providers configured
    - ✓ Session strategy set
  - **Test**: Auth routes exist at `/api/auth/*`

- [x] **Set up Resend for magic links**
  - **Install**: `npm i resend react-email`
  - **Create**: Resend account, get API key
  - **File**: `lib/email/client.ts`
  - **Acceptance**: ✓ Email client configured
  - **Test**: Send test email via Resend dashboard

- [x] **Create magic link email template**
  - **File**: `emails/magic-link.tsx` (React Email)
  - **Add**: Airbnb-inspired design
  - **Acceptance**: ✓ Template renders in preview
  - **Test**: `npm run email:dev` - preview template

### 1.6 Logging Infrastructure

- [x] **Set up Pino logger**
  - **Install**: `npm i pino pino-pretty`
  - **File**: `lib/logger/index.ts`
  - **Add**: Logger with context enrichment
  - **Acceptance**: 
    - ✓ Structured JSON logs
    - ✓ Different log levels
  - **Test**: `logger.info('test')` - outputs JSON

- [x] **Add request logging middleware**
  - **File**: `middleware.ts`
  - **Add**: Log all requests with ID, user, duration
  - **Acceptance**: ✓ Every request logged
  - **Test**: Make request, see log entry

### 1.7 Design System Setup

- [x] **Install shadcn/ui**
  - **Command**: `npx shadcn@latest init`
  - **Acceptance**: ✓ shadcn installed, components dir created
  - **Test**: CLI works

- [x] **Configure Tailwind theme**
  - **File**: `tailwind.config.ts`
  - **Add**: 
    - Airbnb color palette (Primary: #FF385C, etc.)
    - Inter font
    - Custom spacing
  - **Acceptance**: ✓ Theme variables in config
  - **Test**: Use theme color in component, verify it renders

- [x] **Install base shadcn components**
  - **Command**: `npx shadcn@latest add button card input dialog`
  - **Acceptance**: ✓ Components in `components/ui/`
  - **Test**: Import Button, renders correctly

- [x] **Create shared components**
  - **Files**: 
    - `components/shared/Header.tsx`
    - `components/shared/Footer.tsx`
    - `components/shared/Avatar.tsx`
  - **Acceptance**: ✓ Reusable components created
  - **Test**: Use in test page, verify rendering

### ✅ Phase 1 Acceptance Criteria

- [x] App runs locally without errors
- [x] Database migrations applied
- [x] Auth flow works (magic link sent)
- [x] Logger outputs structured JSON
- [x] ESLint blocks console.log
- [x] Tailwind theme applied
- [x] All env vars validated
- [x] Git hooks prevent bad commits

---

## Phase 2: Core Features (Weeks 3-5)

**Goal**: Build student-facing features including matching algorithm

### 2.0 Student Authentication Pages

- [x] **Create sign-in page**
  - **File**: `app/auth/signin/page.tsx`
  - **Features**:
    - Email input for magic link
    - "Continue with Google" button
    - Clean, Airbnb-inspired design
    - Auto-detect new vs existing user (handled by NextAuth)
  - **Acceptance**: 
    - ✓ Page renders at `/auth/signin`
    - ✓ Both auth methods visible
  - **Test**: Navigate to `/auth/signin`, see both options

- [x] **Implement magic link flow**
  - **Component**: Email input + submit
  - **Logic**: 
    - User enters email → Click "Send magic link"
    - NextAuth sends email via Resend
    - **New user**: Creates account automatically on link click
    - **Existing user**: Logs in automatically on link click
  - **Acceptance**: 
    - ✓ Email sent via Resend
    - ✓ Account created if new
    - ✓ Logged in if existing
  - **Test**: 
    - New email → Account created in DB
    - Existing email → No duplicate, just login

- [x] **Implement Google OAuth flow**
  - **Component**: Google button
  - **Logic**:
    - User clicks "Continue with Google"
    - NextAuth handles OAuth with Google
    - **New user**: Creates account with Google profile data
    - **Existing user**: Logs in with Google account
  - **Acceptance**:
    - ✓ Google OAuth popup works
    - ✓ Account created if new
    - ✓ Logged in if existing
    - ✓ Profile data (name, avatar) populated
  - **Test**: 
    - New Google account → User created
    - Existing Google account → Logged in

- [x] **Create verify-request page**
  - **File**: `app/auth/verify-request/page.tsx`
  - **Content**: 
    - "Check your email" message
    - Email icon
    - Resend link option (after 60s cooldown)
  - **Acceptance**: ✓ Page shows after magic link sent
  - **Test**: Submit email, land on verify-request page

- [x] **Create error page**
  - **File**: `app/auth/error/page.tsx`
  - **Content**:
    - Generic error message
    - "Try again" link back to signin
    - Different messages per error type (optional)
  - **Acceptance**: ✓ Page handles auth errors gracefully
  - **Test**: Force auth error, see error page

- [x] **Add post-login redirect logic**
  - **Logic**: After successful auth:
    - **New student**: Redirect to `/student/onboarding`
    - **Existing student with profile**: Redirect to `/student/matches`
    - **Existing student without profile**: Redirect to `/student/onboarding`
  - **File**: Update `lib/auth/config.ts` callbacks
  - **Acceptance**: ✓ Correct redirect per user state
  - **Test**: 
    - New user → Onboarding
    - Existing with profile → Matches
    - Existing without profile → Onboarding

### 2.1 Student Onboarding Wizard

- [ ] **Create onboarding route structure**
  - **Files**: 
    - `app/student/onboarding/page.tsx`
    - `app/student/onboarding/layout.tsx`
  - **Acceptance**: ✓ Routes accessible after login
  - **Test**: Navigate to `/student/onboarding`

- [x] **Build Step 1: Fields of Study selection**
  - **Component**: `components/student/FieldSelector.tsx`
  - **Features**: 
    - Multi-select fields
    - Min 3, max 5 selections
    - Icons for each field
  - **Acceptance**: 
    - ✓ Can select 3-5 fields
    - ✓ Icons display
    - ✓ Data saves to state
  - **Test**: Select fields, verify stored in React state

- [x] **2.1.1: Fix hardcoded reference data**
  - **Issue**: Onboarding uses hardcoded MOCK_FIELDS array
  - **Action**: Replace with database query
  - **File**: `app/student/onboarding/page.tsx`
  - **Changes**:
    - Convert to server component or use server action
    - Query `FieldOfStudy` from Prisma
    - Pass real data to FieldSelector
  - **Acceptance**:
    - ✓ Fetches from database
    - ✓ No hardcoded values
    - ✓ Icons load from database
  - **Test**: Add field in DB, appears in onboarding

- [x] **2.1.2: Add icon management to FieldOfStudy**
  - **Action**: Ensure iconName field is populated
  - **File**: Update seed script
  - **Changes**:
    - Add/update `iconName` (emoji) for each field in seed
    - Ensure seed data has all 10 fields with icons
  - **Seed Data Example**:
    ```typescript
    { name: "Engineering", iconName: "⚙️" },
    { name: "Medicine & Health", iconName: "🏥" },
    { name: "Computer Science", iconName: "💻" }
    ```
  - **Acceptance**: ✓ All seeded fields have iconName
  - **Test**: Query FieldOfStudy, all have iconName populated

- [x] **Build Step 2: Location preferences**
  - **Component**: `components/student/LocationSelector.tsx`
  - **Features**: 
    - Country search with flags
    - Multi-select
    - Optional (can skip)
  - **Acceptance**: 
    - ✓ Search works
    - ✓ Flags display
    - ✓ Can skip step
  - **Test**: Select countries, verify state

- [x] **Build Step 3a: Quick IB score input**
  - **Component**: `components/student/QuickScoreInput.tsx`
  - **Features**: 
    - Number input 1-45
    - "Or enter detailed grades" link
  - **Acceptance**: ✓ Input validates range
  - **Test**: Enter 42, verify valid; enter 50, see error

- [x] **Build Step 3b: Detailed grades input**
  - **Component**: `components/student/DetailedGradesInput.tsx`
  - **Features**: 
    - 6 subject selectors (HL/SL, Grade 1-7)
    - TOK grade (A-E)
    - EE grade (A-E)
  - **Acceptance**: 
    - ✓ All fields present
    - ✓ Validation works
    - ✓ Auto-calculates total points
  - **Test**: Fill all fields, see total = 45 max

- [x] **Save onboarding data to database**
  - **API Route**: `app/api/students/profile/route.ts` (POST)
  - **Action**: Create StudentProfile + courses
  - **Acceptance**: 
    - ✓ Profile created
    - ✓ Courses created
    - ✓ Relations linked
  - **Test**: Complete wizard, check DB via Prisma Studio

- [x] **Redirect to recommendations**
  - **Action**: After save, redirect to `/student/matches`
  - **Acceptance**: ✓ Redirect happens automatically
  - **Test**: Complete wizard, land on matches page

### 2.2 Matching Algorithm Implementation

- [x] **Create matching types**
  - **File**: `lib/matching/types.ts`
  - **Add**: MatchInput, MatchResult, WeightConfig interfaces
  - **Acceptance**: ✓ TypeScript types defined
  - **Test**: Import in other file, no errors

- [ ] **Implement Field Match (F_M)**
  - **File**: `lib/matching/field-matcher.ts`
  - **Function**: `calculateFieldMatch(studentFields, programField)`
  - **Logic**: Return 1.0 if match, 0.5 if no prefs, 0.0 if mismatch
  - **Acceptance**: ✓ All edge cases handled
  - **Test**: Unit tests pass (3 test cases)

- [x] **Implement Location Match (L_M)**
  - **File**: `lib/matching/location-matcher.ts`
  - **Function**: `calculateLocationMatch(studentCountries, programCountry)`
  - **Logic**: Return 1.0 if match or no prefs, 0.0 otherwise
  - **Acceptance**: ✓ Handles empty array
  - **Test**: Unit tests pass (10 test cases)

- [x] **Implement Subject Requirement Matching**
  - **File**: `lib/matching/subject-matcher.ts`
  - **Functions**: 
    - `calculateSubjectMatch()`
    - `calculateORGroupMatch()`
    - Helper functions for partial credit
  - **Logic**: Per DOC_2 algorithm spec
  - **Acceptance**: ✓ All partial credit cases work
  - **Test**: Unit tests pass (13 test cases from DOC_2)

- [x] **Implement Academic Match (G_M)**
  - **File**: `lib/matching/academic-matcher.ts`
  - **Function**: `calculateAcademicMatch()`
  - **Logic**: 
    - Subjects-only programs
    - Points-only programs
    - Full requirements programs
  - **Acceptance**: ✓ All 3 types handled
  - **Test**: Unit tests pass (8 test cases)

- [x] **Implement penalties and caps**
  - **File**: `lib/matching/penalties.ts`
  - **Functions**: 
    - `applyPenaltiesAndCaps()`
    - Helper functions for penalties
  - **Logic**: Per DOC_2 spec
  - **Acceptance**: ✓ Caps enforced correctly
  - **Test**: Unit tests pass (8 test cases)

- [x] **Implement overall score calculation**
  - **File**: `lib/matching/scorer.ts`
  - **Function**: `calculateMatch(input)`, `calculateMatches()`
  - **Logic**: Combine F_M, L_M, G_M with weights
  - **Acceptance**: 
    - ✓ Returns 0-1 score
    - ✓ Includes breakdown
  - **Test**: Integration test with full student/program data (8 tests)

- [x] **Add Redis caching layer**
  - **File**: `lib/matching/cache.ts`
  - **Function**: `getCachedMatch()`, `getCachedMatches()`, invalidation functions
  - **TTL**: 5 minutes (300 seconds)
  - **Acceptance**: ✓ Cache hit/miss logging, error fallback
  - **Test**: Demonstration of features and usage

- [ ] **Performance optimization**
  - **Action**: Benchmark matching 2,000 programs
  - **Target**: < 250ms
  - **Acceptance**: ✓ Meets performance target
  - **Test**: Run with timer, measure duration

### 2.3 Algolia Search Setup

**Note**: Reference data (Fields, Countries, IB Courses) are included as **nested objects** in indices, not separate indices. This ensures consistency with database.

- [x] **Create Algolia account and indexes**
  - **Action**: Create Algolia app, create indexes
  - **Indexes**: 
    - `programs_production`
    - `universities_production`
  - **Acceptance**: ✓ Indexes created (automatically when data added)
  - **Test**: Connection tested successfully

- [x] **Configure search client**
  - **Install**: `npm i algoliasearch` ✅
  - **File**: `lib/algolia/client.ts` ✅
  - **Add**: Algolia client with API keys ✅
  - **Acceptance**: ✓ Client connects ✅
  - **Test**: Run test search ✅

- [x] **Create sync service**
  - **File**: `lib/algolia/sync.ts` ✅
  - **Function**: `syncProgramToAlgolia(program)` + transform, delete, bulk ✅
  - **Action**: Convert Prisma model to Algolia record ✅
  - **Acceptance**: ✓ All fields mapped ✅
  - **Test**: Sync one program manually (ready for manual test)

- [x] **Add webhook for auto-sync**
  - **File**: `lib/algolia/middleware.ts` (Prisma extension) ✅
  - **Trigger**: On program CREATE/UPDATE/DELETE ✅
  - **Acceptance**: ✓ Extension hooks all operations ✅
  - **Test**: Create program via admin, auto-syncs to Algolia

- [x] **Seed initial programs**
  - **Action**: Created 20 sample programs ✅
  - **Acceptance**: ✓ All programs indexed in Algolia ✅
  - **Test**: Programs visible in database and auto-synced to Algolia

- [x] **Implement reference data sync to Algolia**
  - **Issue**: When Fields/Countries/Courses change, Algolia must re-index ✅
  - **File**: `lib/algolia/reference-sync-extension.ts` ✅
  - **Functions**: ✅
    - `syncProgramsForField(fieldId)` - Re-index all programs with this field
    - `syncProgramsForCountry(countryId)` - Re-index all programs in this country
    - `syncProgramsForCourse(courseId)` - Re-index all programs with this course requirement
  - **Test**: scripts/test-reference-sync.ts ✅ (4 programs re-synced on country update)
  - **Trigger Points**:
    - Admin edits FieldOfStudy → Trigger sync
    - Admin edits Country → Trigger sync
    - Admin edits IBCourse → Trigger sync
  - **Strategy**:
    - Find all affected records (programs, students)
    - Update nested reference data in Algolia
    - Batch update for efficiency
  - **Acceptance**:
    - ✓ Changing field name updates all Algolia records
    - ✓ Changes appear in search results immediately
  - **Test**: 
    - Edit \"Engineering\" → \"Engineering & Technology\"
    - Search in Algolia → See new name
    - Check student profiles → Updated

### 2.4 Student Recommendation Page

- [x] **Create matches API route**
  - **File**: `app/api/students/matches/route.ts` (GET) ✅
  - **Logic**: ✅
    - Get student profile
    - Fetch all programs
    - Run matching algorithm
    - Return top 15
  - **Acceptance**: ✅
    - ✓ Returns sorted matches
    - ✓ Uses cache
  - **Test**: GET request returns top 15 with scores

- [x] **Build ProgramCard component**
  - **File**: `components/student/ProgramCard.tsx` ✅
  - **Props**: program, matchResult, isSaved, onSave, onUnsave, showMatchDetails ✅
  - **Features**: ✅
    - Match score with color-coded badge
    - University name with location and flag
    - Field icon and name
    - Program details (degree, duration, IB points)
    - Save/unsave button
    - Expandable match breakdown
  - **Acceptance**: ✓ All data displays, reusable across pages ✅
  - **Test**: Render with mock data

- [x] **Build recommendation page**
  - **File**: `app/student/recommendations/page.tsx` ✅
  - **Features**: ✅
    - Fetch matches on load from API
    - Display top 15 ProgramCards with scores
    - Loading state with spinner
    - Error state with retry
    - Empty state if no matches
    - Refresh recommendations button
  - **Acceptance**: ✅
    - ✓ Matches display with scores
    - ✓ Sorted by score (API handles)
    - ✓ Program data inline (no separate fetches)
  - **Test**: Login, complete profile, see matches

- [x] **Add match breakdown modal**
  - **Component**: `components/student/MatchBreakdown.tsx` ✅
  - **Features**: ✅
    - Detailed score explanation with visual progress bars
    - Academic/Location/Field breakdown with icons
    - Course requirements check with status indicators
    - Weighting display
    - Score adjustments (caps/penalties)
  - **Acceptance**: ✓ All details shown with visuals ✅
  - **Test**: Click card → expand → click "View Detailed Breakdown" → modal opens

### 2.5 Program Search Page

- [ ] **Build search UI**
  - **File**: `app/programs/search/page.tsx`
  - **Features**: 
    - Search input
    - Filters (location, field, IB points)
    - Results grid
  - **Acceptance**: ✓ Search input works
  - **Test**: Type query, see results update

- [ ] **Implement Algolia search**
  - **File**: `lib/algolia/search.ts`
  - **Function**: `searchPrograms(query, filters)`
  - **Features**: 
    - Typo tolerance
    - Faceted filters
    - Custom ranking
  - **Acceptance**: ✓ Results < 50ms
  - **Test**: Search "Computer", see results

- [ ] **Add faceted filters**
  - **Component**: `components/search/Filters.tsx`
  - **Filters**: 
    - Country (multi-select)
    - Field (multi-select)
    - IB points range (slider)
  - **Acceptance**: ✓ All filters work
  - **Test**: Apply filters, results update

### 2.6 Program Detail Page

- [ ] **Create program detail route**
  - **File**: `app/programs/[id]/page.tsx`
  - **Data**: Fetch program + university
  - **Acceptance**: ✓ Program data loads
  - **Test**: Navigate to `/programs/123`, see details

- [ ] **Build program detail view**
  - **Component**: `components/programs/ProgramDetails.tsx`
  - **Features**: 
    - All program info
    - University section
    - IB requirements
    - Link to official page
  - **Acceptance**: ✓ All data displays
  - **Test**: Verify all fields render

- [ ] **Add personalized match section (logged-in students)**
  - **Logic**: If student logged in, show match score
  - **Component**: `components/programs/PersonalizedMatch.tsx`
  - **Acceptance**: 
    - ✓ Shows for logged-in students
    - ✓ Hidden for logged-out users
  - **Test**: Login → see match; Logout → hidden

### ✅ Phase 2 Acceptance Criteria

- [ ] Student can complete onboarding
- [ ] Matching algorithm passes all unit tests
- [ ] Top-10 recommendations display correctly
- [ ] Program search returns results < 100ms
- [ ] Match scores accurate per DOC_2 spec
- [ ] Algolia sync works automatically
- [ ] Performance: 2,000 programs matched in < 250ms

---

## Phase 3: Admin & Content (Weeks 6-7)

**Goal**: Build admin dashboard and content management tools

### 3.1 Admin Dashboard Layout

- [ ] **Create admin route structure**
  - **Files**: 
    - `app/admin/dashboard/page.tsx`
    - `app/admin/layout.tsx`
    - `app/admin/reference-data/page.tsx` (for task 3.1.1)
  - **Middleware**: Protect with admin role check
  - **Acceptance**: ✓ Only admins can access
  - **Test**: Login as non-admin → 403 error

- [ ] **3.1.1: Create Admin Interface for Reference Data Management**
  - **Priority**: HIGH - Enables single source of truth management
  - **File**: `app/admin/reference-data/page.tsx`
  - **Features**:
    - **Fields of Study**: CRUD interface
      - Add/Edit/Delete fields
      - Set name and iconName (emoji picker)
      - Bulk import from JSON/CSV
    - **Countries**: CRUD interface
      - Add/Edit/Delete countries
      - Set name, code (ISO), flagEmoji
      - Bulk import
    - **IB Courses**: CRUD interface
      - Add/Edit/Delete courses
      - Set name, code, group (1-6)
      - Bulk import
  - **Components**:
    - `components/admin/reference/FieldManagement.tsx`
    - `components/admin/reference/CountryManagement.tsx`
    - `components/admin/reference/CourseManagement.tsx`
  - **API Routes**:
    - `app/api/admin/reference/fields/route.ts`
    - `app/api/admin/reference/countries/route.ts`
    - `app/api/admin/reference/courses/route.ts`
  - **Acceptance**:
    - ✓ Can create/edit/delete all reference data
    - ✓ Changes immediately affect student onboarding
    - ✓ Bulk import works for all three types
  - **Test**: 
    - Add new field → Student sees it in onboarding
    - Edit country name → Appears in location selector
    - Delete course → No longer in course selection

- [ ] **Build admin navigation**
  - **Component**: `components/admin/AdminSidebar.tsx`
  - **Links**: Schools, Programs, Universities, Users, Analytics
  - **Acceptance**: ✓ All links work
  - **Test**: Click each link, navigate correctly

### 3.2 IB School Management

- [ ] **Create school creation form**
  - **File**: `app/admin/schools/new/page.tsx`
  - **Fields**: 
    - Name, country, city
    - **Tier selection**: VIP or REGULAR (dropdown)
    - Logo upload
    - Contact info
  - **Acceptance**: 
    - ✓ Tier selector prominent
    - ✓ Form validates
  - **Test**: Submit form, school created with tier

- [ ] **Create school CRUD API**
  - **Files**: 
    - `app/api/admin/schools/route.ts` (GET, POST)
    - `app/api/admin/schools/[id]/route.ts` (GET, PATCH, DELETE)
  - **Logic**: 
    - Create with tier (VIP/REGULAR)
    - Update tier
    - Set subscriptionStatus
  - **Acceptance**: ✓ All CRUD operations work
  - **Test**: Create VIP school → check DB, tier = VIP

- [ ] **Build schools list page**
  - **File**: `app/admin/schools/page.tsx`
  - **Features**: 
    - Table with all schools
    - Show tier badge (VIP 🆓 / REGULAR 💳)
    - Subscription status
    - Edit/Delete actions
  - **Acceptance**: ✓ All schools listed
  - **Test**: See VIP/REGULAR badges

### 3.3 Coordinator Invitation System

- [ ] **Create invitation form**
  - **File**: `app/admin/schools/[id]/invite-coordinator/page.tsx`
  - **Fields**: 
    - Coordinator email
    - School (pre-selected)
  - **Acceptance**: ✓ Email validated
  - **Test**: Submit, invitation created

- [ ] **Build invitation API**
  - **File**: `app/api/admin/invite/route.ts` (POST)
  - **Logic**: 
    - Create invitation record
    - Generate unique token
    - Send email via Resend
  - **Acceptance**: 
    - ✓ Token generated
    - ✓ Email sent
  - **Test**: Invite coordinator, receive email

- [ ] **Create invitation acceptance flow**
  - **File**: `app/auth/accept-invite/[token]/page.tsx`
  - **Logic**: 
    - Validate token
    - Create User + CoordinatorProfile
    - Link to school
    - Mark invitation as accepted
  - **Acceptance**: ✓ Coordinator account created
  - **Test**: Click invite link, create account, check DB

- [ ] **Create coordinators list page**
  - **File**: `app/admin/coordinators/page.tsx`
  - **Features**: 
    - Table with all coordinators (name, email, school, status)
    - Filter by school, status (Active/Revoked/Pending)
    - Show invite status badge (Pending/Accepted)
    - Quick actions (edit, revoke, delete)
  - **Components**:
    - `components/admin/coordinators/CoordinatorTable.tsx`
    - `components/admin/coordinators/CoordinatorStatusBadge.tsx`
  - **API Route**: `app/api/admin/coordinators/route.ts` (GET)
  - **Acceptance**: 
    - ✓ All coordinators listed
    - ✓ Pending invitations shown
    - ✓ Status badges work
  - **Test**: View list, verify all coordinators display

- [ ] **Create coordinator edit/resend page**
  - **File**: `app/admin/coordinators/[id]/page.tsx`
  - **Features**: 
    - View coordinator details (name, email, school, joined date)
    - Edit coordinator name
    - Resend invitation (if status = PENDING)
    - Show invitation history
  - **Components**:
    - `components/admin/coordinators/CoordinatorEditForm.tsx`
    - `components/admin/coordinators/ResendInviteButton.tsx`
  - **API Routes**: 
    - `app/api/admin/coordinators/[id]/route.ts` (GET, PATCH)
    - `app/api/admin/invite/resend/route.ts` (POST)
  - **Acceptance**: 
    - ✓ Can edit coordinator name
    - ✓ Resend button works for pending invites
  - **Test**: Edit name, resend invite, verify email received

- [ ] **Implement revoke/restore access**
  - **Schema Change**: Add `isActive` Boolean to `CoordinatorProfile` (default: true)
  - **File**: `app/api/admin/coordinators/[id]/access/route.ts` (PATCH)
  - **Logic**: 
    - Revoke: Set isActive = false
    - Restore: Set isActive = true
    - Reversible action
  - **UI**: Toggle switch or button on coordinator detail page
  - **Middleware**: Check isActive in coordinator dashboard access
  - **Acceptance**: 
    - ✓ Can revoke access (coordinator sees "access revoked" message)
    - ✓ Can restore access
  - **Test**: Revoke coordinator, try to access dashboard, see blocked message

- [ ] **Implement coordinator deletion**
  - **File**: `app/api/admin/coordinators/[id]/route.ts` (DELETE)
  - **Logic**: 
    - Cascade delete: CoordinatorProfile → User → Sessions
    - Confirmation dialog required
    - Log deletion for audit
  - **UI**: Delete button with confirmation modal
  - **Component**: `components/admin/coordinators/DeleteCoordinatorButton.tsx`
  - **Acceptance**: 
    - ✓ Confirmation required
    - ✓ All user data removed
    - ✓ Cannot login after deletion
  - **Test**: Delete coordinator, verify login fails

### 3.4 University & Program Management

- [ ] **Create university CRUD pages**
  - **Files**: 
    - `app/admin/universities/page.tsx` (list)
    - `app/admin/universities/new/page.tsx` (create)
    - `app/admin/universities/[id]/page.tsx` (edit)
  - **Fields**: Name, country, city, logo, description
  - **Acceptance**: ✓ All CRUD works
  - **Test**: Create university, see in list

- [ ] **Create university CRUD API**
  - **Files**: 
    - `app/api/admin/universities/route.ts`
    - `app/api/admin/universities/[id]/route.ts`
  - **Acceptance**: ✓ Endpoints work
  - **Test**: Postman tests pass

- [ ] **Create program form**
  - **File**: `app/admin/programs/new/page.tsx`
  - **Fields**: 
    - Name, description
    - University (select)
    - Field of study (select)
    - Min IB points
    - Course requirements (dynamic form)
  - **Acceptance**: ✓ Complex form works
  - **Test**: Add course requirement with OR group

- [ ] **Build course requirements builder**
  - **Component**: `components/admin/CourseRequirementsBuilder.tsx`
  - **Features**: 
    - Add requirements
    - Set HL/SL, min grade
    - Mark critical
    - Create OR groups
  - **Acceptance**: ✓ OR groups work
  - **Test**: Create "Math HL 6 OR Math SL 7"

- [ ] **Create program CRUD API**
  - **Files**: 
    - `app/api/admin/programs/route.ts`
    - `app/api/admin/programs/[id]/route.ts`
  - **Logic**: 
    - Save program + requirements
    - Trigger Algolia sync
  - **Acceptance**: 
    - ✓ Program saved
    - ✓ Algolia synced
  - **Test**: Create program, search in Algolia

### 3.5 Bulk Upload Tools

- [ ] **Create CSV upload interface**
  - **File**: `app/admin/bulk-upload/page.tsx`
  - **Features**: 
    - File upload
    - CSV preview
    - Validate before import
  - **Acceptance**: ✓ Upload works
  - **Test**: Upload CSV with 10 programs

- [ ] **Build bulk import API**
  - **File**: `app/api/admin/bulk-upload/route.ts` (POST)
  - **Logic**: 
    - Parse CSV
    - Validate all rows
    - Create programs in transaction
    - Sync to Algolia
  - **Acceptance**: 
    - ✓ All valid rows imported
    - ✓ Invalid rows reported
  - **Test**: Upload 100 programs, all created

### ✅ Phase 3 Acceptance Criteria

- [ ] Admin can create schools with tier selection
- [ ] Coordinator invitations send emails
- [ ] Coordinators can accept invites and create accounts
- [ ] Universities and programs CRUD fully functional
- [ ] Bulk upload imports 100+ programs successfully
- [ ] All admin actions logged

---

## Phase 4: Coordinator Role (Weeks 8-9)

**Goal**: Build coordinator dashboard with subscription-based feature gating, student invitation/linking, and student account management

> **Component Reuse Reference**: See [coordinator-dashboard-component-guide.md](./coordinator-dashboard-component-guide.md) for detailed component mapping and usage examples. All shared components in `/components/admin/shared` are role-agnostic and should be reused for the coordinator dashboard.

### 4.1 Coordinator Dashboard Foundation

- [x] **Create coordinator route structure**
  - **Files**: 
    - `app/coordinator/dashboard/page.tsx`
    - `app/coordinator/layout.tsx`
  - **Middleware**: Role check + school access check
  - **Reuse Components** (from `@/components/admin/shared`):
    - `PageContainer` - Full-width wrapper for all coordinator pages
    - `PageHeader` - With school context and coordinator actions
    - `StatCard` - For school KPIs (students, avg IB score, etc.)
  - **Acceptance**: ✓ Only coordinators can access
  - **Test**: Login as coordinator, see dashboard

- [x] **Create CoordinatorSidebar component**
  - **File**: `components/coordinator/CoordinatorSidebar.tsx`
  - **Pattern**: Follow AdminSidebar.tsx structure (see component guide)
  - **Features**:
    - School name + VIP badge (if applicable)
    - Navigation: Dashboard, Students, Team, Analytics (VIP), Settings
    - VIP-only links show crown icon for Regular tier
    - User profile section with logout
  - **Acceptance**: ✓ Matches admin sidebar quality
  - **Test**: Navigate between pages, verify active states

- [x] **Implement access control helper**
  - **File**: `lib/auth/access-control.ts`
  - **Function**: `getCoordinatorAccess(school)`
  - **Logic**: Per architecture RBAC section
  - **Acceptance**: 
    - ✓ VIP returns full access
    - ✓ REGULAR+subscription returns full access
    - ✓ REGULAR no subscription returns freemium
  - **Test**: Unit tests for all 3 cases

### 4.2 Feature Gating Implementation

- [x] **Leverage UpgradePromptBanner component**
  - **Note**: Already exists at `@/components/admin/shared/UpgradePromptBanner`
  - **Variants available**: `inline`, `card`, `subtle`
  - **Usage patterns** (see component guide):
    - `inline` - For small prompts within content
    - `card` - For prominent feature blocks
    - `subtle` - For inline text prompts (e.g., invites remaining)
  - **Acceptance**: ✓ Works in coordinator context
  - **Test**: Verify all 3 variants render correctly

- [x] **Build freemium student management**
  - **File**: `app/coordinator/students/page.tsx`
  - **Reuse Components**:
    - `DataTable` - Student list with columns
    - `SearchFilterBar` - Search students by name/email
    - `TableEmptyState` - "No students yet" state
    - `UpgradePromptBanner` (subtle) - "X invites remaining" for Regular tier
  - **Logic**: 
    - VIP/paid: Show all students, unlimited invites
    - Freemium: Show max 10, lock "Invite Student" after 10
  - **Acceptance**: ✓ Limit enforced
  - **Test**: Login as freemium coordinator, add 11th student → blocked

- [x] **Build freemium analytics**
  - **File**: `app/coordinator/analytics/page.tsx`
  - **Reuse Components**:
    - `StatCard` with `locked` prop for premium metrics
    - `UpgradePromptBanner` (card) for locked sections
  - **Logic**: 
    - VIP/paid: Full analytics suite
    - Freemium: Basic overview, lock advanced features
  - **Acceptance**: ✓ Advanced charts locked
  - **Test**: Freemium coordinator sees UpgradePrompt

### 4.3 Stripe Subscription Integration

- [x] **Create Stripe account and products**
  - **Action**: 
    - Create Stripe account
    - Create product: "IB Match School Subscription"
    - Create price: Monthly recurring
  - **Acceptance**: ✓ Product created
  - **Test**: See in Stripe dashboard

- [x] **Install Stripe SDK**
  - **Command**: `npm i stripe @stripe/stripe-js`
  - **File**: `lib/stripe/client.ts`
  - **Add**: Stripe client with API key
  - **Acceptance**: ✓ Client initialized
  - **Test**: Import works

- [x] **Create checkout session API**
  - **File**: `app/api/subscriptions/create-checkout/route.ts` (POST)
  - **Logic**: 
    - Get school from coordinator
    - Check tier = REGULAR
    - Create Stripe Customer (if not exists)
    - Create Checkout Session
    - Return session URL
  - **Acceptance**: 
    - ✓ VIP schools blocked
    - ✓ Session created for REGULAR
  - **Test**: POST request, get checkout URL

- [x] **Build upgrade page**
  - **File**: `app/coordinator/upgrade/page.tsx`
  - **Reuse Components**: `PageContainer`, `PageHeader`, `InfoCard`
  - **Features**: 
    - Show current plan (Freemium)
    - Benefits of VIP-level access
    - "Upgrade" button → Stripe Checkout
  - **Acceptance**: ✓ Redirects to Stripe
  - **Test**: Click upgrade, redirect to Checkout

- [x] **Create Stripe webhook handler**
  - **File**: `app/api/webhooks/stripe/route.ts` (POST)
  - **Events**: 
    - `checkout.session.completed` → Set subscriptionStatus = ACTIVE
    - `customer.subscription.deleted` → Set subscriptionStatus = CANCELLED
  - **Acceptance**: ✓ DB updated on events
  - **Test**: Complete checkout in test mode, check DB

- [x] **Build subscription management page**
  - **File**: `app/coordinator/subscription/page.tsx`
  - **Reuse Components**: `PageContainer`, `PageHeader`, `InfoCard`, `InfoRow`
  - **Features**: 
    - Show current status
    - Link to Stripe Customer Portal
    - Cancel button
  - **Acceptance**: ✓ Portal link works
  - **Test**: Click "Manage", redirect to Stripe Portal

### 4.4 Student Invitation System

> **GDPR/Consent Requirement**: Students invited by coordinators must explicitly consent to coordinator access to their account data. This consent is separate from general terms acceptance.

- [x] **4.4.1 Schema updates for student invitations**
  - **File**: `prisma/schema.prisma`
  - **Changes to Invitation model**:
    - Confirm `role` enum includes `STUDENT` (already exists)
    - Add `coordinatorAccessConsent` Boolean field (default: false) - tracks if student consented to coordinator access
  - **Changes to StudentProfile model**:
    - Add `linkedByInvitation` Boolean (default: false) - tracks if linked via coordinator invite
    - Add `coordinatorAccessConsentAt` DateTime? - when consent was given
    - Add `coordinatorAccessConsentVersion` String? - version of consent terms
  - **Migration**: `npx prisma migrate dev --name add_student_coordinator_consent`
  - **Acceptance**: ✓ Schema updated, migration applied
  - **Test**: `npx prisma studio` - see new fields

- [x] **4.4.2 Create student invitation email template**
  - **File**: `emails/student-invite.tsx` (React Email)
  - **Content must clearly state**:
    - Invitation from [Coordinator Name] at [School Name]
    - "By accepting this invitation, you agree to allow coordinators at [School Name] to view and manage your academic profile and program matches"
    - Clear CTA button: "Accept Invitation & Create Account"
    - Secondary link: "Decline and create a regular account" → `/auth/signin?declineInvite=true`
    - Expiry notice (e.g., "This invitation expires in 7 days")
  - **Styling**: Match existing email templates (Airbnb-inspired, primary blue CTA)
  - **Acceptance**: ✓ Template renders with all required elements
  - **Test**: `npm run email:dev` - preview template

- [x] **4.4.3 Create student invitation API**
  - **File**: `app/api/coordinator/students/invite/route.ts` (POST)
  - **Access Control**: VIP or subscribed REGULAR coordinators only
  - **Logic**: 
    - Validate coordinator has invite capacity (unlimited for VIP/paid, 10 max for freemium)
    - Check if email already has account → different flow (link existing student)
    - Generate unique token (48 chars, URL-safe)
    - Create Invitation record with:
      - `role: STUDENT`
      - `schoolId: coordinator.schoolId`
      - `expiresAt: now + 7 days`
    - Send email via Resend
  - **Acceptance**: 
    - ✓ Capacity check works for freemium
    - ✓ Invitation created in DB
    - ✓ Email sent with correct content
  - **Test**: 
    - Invite student as VIP coordinator → success
    - Invite 11th student as freemium → blocked (403)

- [x] **4.4.4 Create student invitation acceptance flow**
  - **File**: `app/auth/accept-student-invite/[token]/page.tsx`
  - **UI Flow**:
    1. Validate token (not expired, status = PENDING)
    2. Show consent screen with:
       - School name and coordinator info
       - Clear explanation of what coordinators can access:
         - View your academic profile (courses, grades, TOK/EE)
         - View your program matches and saved programs
         - Edit your academic data (with your profile visible to them)
       - Checkbox: "I understand and consent to [School Name] coordinators accessing my account data"
       - Primary button: "Accept & Create Account" (disabled until checkbox checked)
       - Secondary link: "Decline invitation" → redirects to regular signup
    3. On accept:
       - Create User with role STUDENT
       - Create StudentProfile with:
         - `schoolId: invitation.schoolId`
         - `linkedByInvitation: true`
         - `coordinatorAccessConsentAt: now`
         - `coordinatorAccessConsentVersion: "2025-12-13"` (current consent version)
       - Update Invitation: `status: ACCEPTED`, `acceptedAt: now`
       - Log in user automatically
       - Redirect to `/student/onboarding`
  - **Acceptance**: 
    - ✓ Consent screen displays correctly
    - ✓ Cannot proceed without checkbox
    - ✓ Account created with school link
    - ✓ Consent timestamp recorded
  - **Test**: 
    - Accept invite → account linked to school
    - Decline invite → redirected to regular signup

- [x] **4.4.5 Handle "decline invitation" flow**
  - **File**: `app/auth/signin/page.tsx` (update)
  - **Logic**: Check for `?declineInvite=true` query param
  - **UI**: Show info banner: "You can still create an account to use IB Match. Your account will not be linked to any school."
  - **Result**: Standard student signup flow without school linking
  - **Acceptance**: ✓ Decline path works correctly
  - **Test**: Click decline in email → see info banner → complete signup → no school link

- [x] **4.4.6 Resend student invitation**
  - **File**: `app/api/coordinator/students/invite/resend/route.ts` (POST)
  - **Logic**:
    - Find existing PENDING invitation by email + schoolId
    - Regenerate token
    - Update expiresAt
    - Resend email
  - **Acceptance**: ✓ Token regenerated, email resent
  - **Test**: Resend invitation, check new token in DB

- [x] **4.4.7 Cancel pending student invitation**
  - **File**: `app/api/coordinator/students/invite/[id]/route.ts` (DELETE)
  - **Logic**: Set invitation status to CANCELLED
  - **Acceptance**: ✓ Invitation cancelled, token invalid
  - **Test**: Cancel invite, try to use link → error page

### 4.5 Student Account Linking & Unlinking

- [x] **4.5.1 Display linked school in student account**
  - **File**: `app/student/account/page.tsx` (update or create)
  - **UI Section**: "School Connection"
  - **Content when linked**:
    - School name with logo (if available)
    - "Connected via invitation on [date]"
    - Info text: "Your coordinator at [School Name] can view your academic profile and program matches."
    - "Unlink from School" button (with confirmation dialog)
  - **Content when not linked**:
    - "Not connected to any school"
    - Info text: "Connect with your school to get support from your IB coordinator"
  - **Acceptance**: ✓ School info displays correctly
  - **Test**: 
    - Linked student sees school name and unlink option
    - Unlinked student sees "not connected" message

- [x] **4.5.2 Implement student unlink functionality**
  - **File**: `app/api/students/school/unlink/route.ts` (POST)
  - **Logic**:
    - Validate user is STUDENT with schoolId
    - Update StudentProfile:
      - `schoolId: null`
      - `linkedByInvitation: false`
      - `coordinatorAccessConsentAt: null`
      - `coordinatorAccessConsentVersion: null`
    - Log action for audit
  - **UI**: Confirmation dialog with warning:
    - "Are you sure you want to unlink from [School Name]?"
    - "Your coordinator will no longer be able to view or manage your academic data."
    - "You can reconnect later by accepting a new invitation from your school."
  - **Acceptance**: 
    - ✓ School link removed
    - ✓ Consent fields cleared
    - ✓ Student no longer appears in coordinator's student list
  - **Test**: Unlink → check DB → coordinator list refreshed

- [x] **4.5.3 Handle existing student invitation (link existing account)**
  - **File**: `app/api/coordinator/students/invite/route.ts` (update)
  - **Logic when email exists**:
    - If student already has schoolId → error: "Student already linked to a school"
    - If student has no schoolId → Create special "link request" invitation
  - **File**: `app/student/invitations/page.tsx` (new)
  - **UI**: Show pending invitations for existing students
    - "You've been invited to connect with [School Name]"
    - Same consent flow as new student acceptance
  - **Acceptance**: ✓ Existing students can be invited and linked
  - **Test**: Invite existing student → they see invitation → accept → linked

### 4.6 Coordinator Student Management

> **Permission Requirement**: Only VIP or subscribed REGULAR coordinators can manage student data. Consent must be given.

- [ ] **4.6.1 Build student list page**
  - **File**: `app/coordinator/students/page.tsx`
  - **Reuse Components**:
    - `PageContainer`, `PageHeader` with "Invite Student" action
    - `DataTable` with custom columns (name, email, IB points, courses, consent status)
    - `SearchFilterBar` for filtering students
    - `TableEmptyState` for no students
  - **Columns**:
    - Student name + email
    - IB Points (or "Not set")
    - Courses count
    - Consent badge (✓ Consented | ⚠️ Consent Pending)
    - Actions: View, Edit (if consented), View Matches
  - **Features**: 
    - Sort by name, IB points, joined date
    - Filter by consent status
    - Bulk export (VIP or Regular with active subscription)
  - **Acceptance**: 
    - ✓ All school students listed
    - ✓ Freemium limited to 10
    - ✓ Consent status visible
  - **Test**: See all students with correct consent states

- [ ] **4.6.2 Build student detail page**
  - **File**: `app/coordinator/students/[id]/page.tsx`
  - **Reuse Components**:
    - `PageContainer`, `PageHeader` with back link and Edit action
    - `DetailPageLayout` for two-column layout
    - `InfoCard`, `InfoRow` for student details
    - `Breadcrumbs`: Students > [Student Name]
  - **Sections**:
    - **Sidebar**: Quick stats (IB Points, TOK, EE, Courses count), Preferences summary
    - **Main**: IB Courses table, Top Matches preview, Saved Programs
  - **Access Control**: Only show if `coordinatorAccessConsentAt` is set
  - **Acceptance**: ✓ Full student data visible for consented students
  - **Test**: View student detail page with all data

- [ ] **4.6.3 Build student profile editor**
  - **File**: `app/coordinator/students/[id]/edit/page.tsx`
  - **Reuse Components**: `PageContainer`, `PageHeader`, `FormPageLayout`
  - **Editable Fields**:
    - IB Courses (add/edit/remove with level and grade)
    - Total IB Points (auto-calculated or manual override)
    - TOK Grade (A-E)
    - EE Grade (A-E)
    - Preferred Fields of Study
    - Preferred Countries
  - **Access Control**: 
    - VIP or subscribed REGULAR coordinators only
    - Student must have `coordinatorAccessConsentAt` set
  - **Acceptance**: 
    - ✓ Changes save to DB
    - ✓ Match recalculation triggered
    - ✓ Cannot edit without consent
  - **Test**: 
    - Edit student data → see in student view
    - Try edit without consent → blocked (403)

- [ ] **4.6.4 Create student management API endpoints**
  - **Files**:
    - `app/api/coordinator/students/route.ts` (GET - list students for coordinator's school)
    - `app/api/coordinator/students/[id]/route.ts` (GET, PATCH)
  - **GET /api/coordinator/students**:
    - Filter by coordinator's schoolId
    - Include consent status
    - Pagination support
    - Search by name/email
  - **GET /api/coordinator/students/[id]**:
    - Validate coordinator's school matches student's school
    - Validate consent is given
    - Return full student profile with courses, preferences
  - **PATCH /api/coordinator/students/[id]**:
    - Access control: VIP/subscribed + consent required
    - Update academic data
    - Trigger match recalculation (invalidate Redis cache)
    - Log changes for audit
  - **Acceptance**: ✓ All endpoints work with proper access control
  - **Test**: API tests for each endpoint

- [ ] **4.6.5 View student matches**
  - **File**: `app/coordinator/students/[id]/matches/page.tsx`
  - **Reuse Components**: `PageContainer`, `PageHeader`, `Breadcrumbs`
  - **Content**: Display top 10 matches for student (same as student view)
  - **Access Control**: Consent required
  - **Acceptance**: ✓ Matches display correctly
  - **Test**: View matches for consented student

### 4.7 School Analytics

- [x] **Create analytics API** ✅
  - **File**: `app/api/coordinator/analytics/route.ts` (GET)
  - **Data**: 
    - Total students (with consent)
    - Average IB score
    - Match distribution
    - Top fields/countries
  - **Acceptance**: ✓ All metrics calculated
  - **Test**: GET request returns data

- [x] **Build analytics dashboard** ✅
  - **File**: `app/coordinator/analytics/page.tsx`
  - **Implementation**: CSS-based horizontal bar charts (no external library - lightweight)
  - **Reuse Components**: `PageContainer`, `PageHeader`, `StatCard` (with `locked` prop)
  - **Charts**: 
    - Match distribution (horizontal bar chart)
    - Average IB score (stat card)
    - Top fields (horizontal bar chart)
    - Top countries (horizontal bar chart)
  - **Acceptance**: 
    - ✓ VIP/paid: All charts with visual bars
    - ✓ Freemium: Basic stats only, upgrade prompts
  - **Test**: View as VIP vs freemium

### 4.8 Coordinator-to-Coordinator Invitation

- [x] **Implement coordinator invitation from coordinator** ✅
  - **File**: `app/api/coordinator/team/invite/route.ts` (POST, GET)
  - **Logic**: 
    - Only VIP or subscribed REGULAR coordinators can invite
    - Creates invitation with role COORDINATOR and schoolId
    - Uses existing coordinator invitation flow (accept-invite)
    - Sends email with coordinator-invite template
  - **UI**: `app/coordinator/team/invite/page.tsx`
  - **Form**: `InviteCoordinatorForm.tsx` client component
  - **Reuse Components**: `PageContainer`, `PageHeader`, `FormPageLayout`, `FormSection`
  - **Acceptance**: ✓ Coordinator can invite other coordinators to their school
  - **Test**: Invite coordinator, they accept, linked to same school

- [x] **Build team list page** ✅
  - **File**: `app/coordinator/team/page.tsx`
  - **Reuse Components**: `PageContainer`, `PageHeader`, `InfoCard`, `TableEmptyState`
  - **Content**: 
    - List all coordinators at the school with join date
    - Shows "You" badge for current user
    - Shows "Primary" badge for first coordinator
    - List pending invitations with expiry dates
  - **Acceptance**: ✓ All school coordinators listed
  - **Test**: See all coordinators at school

### ✅ Phase 4 Acceptance Criteria

- [ ] Coordinator dashboard fully functional with component reuse
- [ ] Access control correctly gates features (VIP vs subscribed vs freemium)
- [ ] Freemium coordinators limited to 10 students
- [ ] Stripe checkout works end-to-end
- [ ] Subscription activates full access
- [ ] Subscription cancellation reverts to freemium
- [ ] **Student invitation flow complete**:
  - [ ] Coordinator can send invite with clear consent disclosure
  - [ ] Student sees consent screen before accepting
  - [ ] Student can decline and create regular account
  - [ ] Existing students can be invited and linked
- [ ] **Student account linking complete**:
  - [ ] Linked students see school in account settings
  - [ ] Students can unlink from school at any time
  - [ ] Consent timestamp recorded for audit
- [ ] **Coordinator student management complete**:
  - [ ] Can view all linked students with consent status
  - [ ] Can view student academic data (with consent)
  - [ ] Can edit student academic data (VIP/subscribed + consent)
  - [ ] Can view student program matches
- [ ] Analytics display correctly for all tiers

---

## Phase 5: University Agent Role (Week 10) - DEPRIORITIZED

**Note**: This phase can be deferred to post-MVP

- [ ] Agent dashboard (similar to coordinator)
- [ ] Program management
- [ ] Match analytics

---

## Phase 6: Polish & Launch (Weeks 11-12)

**Goal**: Finalize, test, optimize, and deploy

### 6.1 Landing Page

- [ ] **Design landing page**
  - **File**: `app/page.tsx`
  - **Sections**: 
    - Hero
    - How it works
    - For students/coordinators/universities
    - CTA
  - **Acceptance**: ✓ All sections present
  - **Test**: Looks good on mobile/desktop

### 6.2 Supporting Pages

- [ ] **Create About page**
  - **File**: `app/about/page.tsx`
  - **Acceptance**: ✓ Page exists
  - **Test**: Navigate, content displays

- [ ] **Create FAQ page**
  - **File**: `app/faq/page.tsx`
  - **Features**: Accordion for Q&A
  - **Acceptance**: ✓ 20+ FAQs
  - **Test**: Click question, answer expands

- [ ] **Create Privacy Policy**
  - **File**: `app/privacy/page.tsx`
  - **Content**: GDPR-compliant policy
  - **Acceptance**: ✓ All sections present
  - **Test**: Legal review approved

- [ ] **Create Terms of Service**
  - **File**: `app/terms/page.tsx`
  - **Acceptance**: ✓ Terms complete
  - **Test**: Legal review approved

- [ ] **Add Cookie Consent Banner**
  - **Component**: `components/shared/CookieBanner.tsx`
  - **Features**: Accept/reject cookies
  - **Acceptance**: ✓ Shows on first visit
  - **Test**: Accept, banner hides; reload, still hidden

### 6.3 Email Templates

- [ ] **Create all email templates**
  - **Files**: 
    - `emails/magic-link.tsx`
    - `emails/coordinator-invite.tsx`
    - `emails/student-invite.tsx`
    - `emails/subscription-confirmed.tsx`
  - **Acceptance**: ✓ All templates exist
  - **Test**: Preview all in email dev server

### 6.4 Performance Optimization

- [ ] **Run Lighthouse audit**
  - **Action**: Test all major pages
  - **Target**: All scores > 90
  - **Acceptance**: ✓ All pages pass
  - **Test**: Run Lighthouse in Chrome DevTools

- [ ] **Optimize images**
  - **Action**: Compress all images, use next/image
  - **Acceptance**: ✓ All images < 500KB
  - **Test**: Check Network tab, verify sizes

- [ ] **Enable caching**
  - **Action**: Set cache headers for static assets
  - **Acceptance**: ✓ Assets cached
  - **Test**: Reload page, assets serve from cache

- [ ] **Benchmark matching algorithm**
  - **Action**: Test with 2,000 programs
  - **Target**: < 250ms
  - **Acceptance**: ✓ Meets target
  - **Test**: Run 10 times, average < 250ms

### 6.5 Security Audit

- [ ] **Review GDPR compliance**
  - **Checklist**: 
    - Data deletion works
    - Data export works
    - Cookie consent present
    - Privacy policy complete
  - **Acceptance**: ✓ All checks passed
  - **Test**: Request data deletion, verify DB cleared

- [ ] **Test authentication flows**
  - **Tests**: 
    - Magic link expiry (15 min)
    - Single-use tokens
    - Role-based route protection
  - **Acceptance**: ✓ All security measures work
  - **Test**: Try expired link → error

- [ ] **Check for console.logs**
  - **Action**: Run ESLint on all files
  - **Acceptance**: ✓ Zero console.logs
  - **Test**: `npm run lint` passes

- [ ] **Review environment variables**
  - **Action**: Verify all vars in .env.example
  - **Acceptance**: ✓ No secrets in code
  - **Test**: Search codebase for hardcoded keys → none

### 6.6 Production Deployment

- [ ] **Set up production Vercel project**
  - **Action**: Create Vercel project, connect Git
  - **Acceptance**: ✓ Auto-deploys on push to main
  - **Test**: Push to main, see deployment

- [ ] **Configure production env vars**
  - **Action**: Add all vars to Vercel production env
  - **Acceptance**: ✓ All vars set
  - **Test**: Check Vercel dashboard

- [ ] **Run production database migration**
  - **Command**: Migrate production Vercel Postgres
  - **Acceptance**: ✓ All tables created
  - **Test**: Connect to prod DB, see tables

- [ ] **Seed production data**
  - **Action**: Run seed script on production
  - **Data**: IB courses, countries, fields of study
  - **Acceptance**: ✓ Seed data present
  - **Test**: Query prod DB, see data

- [ ] **Set up custom domain**
  - **Action**: Add domain in Vercel
  - **Acceptance**: ✓ SSL certificate active
  - **Test**: Visit https://ibmatch.com (or actual domain)

- [ ] **Configure monitoring**
  - **Action**: Enable Vercel Analytics
  - **Acceptance**: ✓ Analytics active
  - **Test**: Visit site, see analytics in Vercel

### 6.7 Final Testing

- [ ] **End-to-end testing**
  - **Tests**: 
    - Student: Sign up → onboard → see matches
    - Coordinator: Accept invite → add students → view analytics
    - Admin: Create school → invite coordinator → add programs
  - **Acceptance**: ✓ All flows work
  - **Test**: Run Playwright E2E tests

- [ ] **Cross-browser testing**
  - **Browsers**: Chrome, Firefox, Safari, Edge
  - **Acceptance**: ✓ Works in all browsers
  - **Test**: Manual testing

- [ ] **Mobile testing**
  - **Devices**: iPhone, iPad, Android phone
  - **Acceptance**: ✓ Responsive on all devices
  - **Test**: BrowserStack or real devices

### ✅ Phase 6 Acceptance Criteria

- [ ] All pages have Lighthouse scores > 90
- [ ] Security audit passed
- [ ] GDPR compliance verified
- [ ] Production deployment successful
- [ ] E2E tests pass
- [ ] Mobile/desktop responsive verified
- [ ] Zero console.logs in production

---

## Definition of Done (Overall)

A task is considered DONE when:

- ✅ Code written and reviewed
- ✅ Unit tests pass (if applicable)
- ✅ Integration tests pass
- ✅ Manual testing completed
- ✅ No console.logs
- ✅ No hardcoded values
- ✅ ESLint passes
- ✅ TypeScript compiles
- ✅ Responsive (mobile + desktop tested)
- ✅ Documented (if complex logic)

---

## Progress Tracking

**How to use:**
1. Mark `[/]` when starting a task
2. Mark `[x]` when completing a task (after all acceptance criteria met)
3. Update this document as you work
4. Review weekly to ensure on track

**Current Status**: Ready to begin Phase 1

---

**Last Updated**: December 2, 2025  
**Architecture**: [DOC_3_technical-architecture.md](./DOC_3_technical-architecture.md)
