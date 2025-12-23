# Contact Us / Support Ticket System - Implementation Plan

## Overview

This document outlines the implementation plan for a comprehensive Contact Us / Support Ticket system for the IB Match platform. The system enables students and coordinators to submit support requests, and provides administrators with a ticket management module.

**Target Completion Date**: Q1 2025

---

## User Stories

### As a Student
- I can access a "Contact Us" page from the footer
- I can submit a support request with category, subject, and message
- I receive an email confirmation when my ticket is created
- I receive an email notification when my ticket is resolved with the admin's response

### As a Coordinator  
- I can access a "Contact Support" page from my dashboard sidebar
- I can submit a support request with category, subject, and message
- I receive an email confirmation when my ticket is created
- I receive an email notification when my ticket is resolved with the admin's response

### As a Platform Admin
- I can view all support tickets in a dedicated admin module
- I can filter and search tickets by status, category, user type, and date
- I can view ticket details and user information
- I can respond to tickets and close them
- The system automatically sends resolution emails to users

---

## Architecture & Technical Design

### Database Schema

#### New Model: `SupportTicket`

```prisma
model SupportTicket {
  id          String              @id @default(cuid())
  ticketNumber String             @unique // Human-readable: TKT-XXXXXX
  
  // Requester info (polymorphic - can be student or coordinator)
  userId      String
  user        User                @relation(fields: [userId], references: [id])
  userRole    UserRole            // STUDENT or COORDINATOR (snapshot at creation)
  
  // School context (for coordinators)
  schoolId    String?
  school      IBSchool?           @relation(fields: [schoolId], references: [id])
  
  // Ticket content
  category    TicketCategory
  subject     String
  message     String              @db.Text
  
  // Status & resolution
  status      TicketStatus        @default(OPEN)
  priority    TicketPriority      @default(NORMAL)
  
  // Admin response
  adminResponse    String?        @db.Text
  resolvedById     String?
  resolvedBy       User?          @relation("ResolvedTickets", fields: [resolvedById], references: [id])
  resolvedAt       DateTime?
  
  // Timestamps
  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt
  
  @@index([userId])
  @@index([status])
  @@index([category])
  @@index([createdAt])
  @@index([ticketNumber])
}

enum TicketCategory {
  ACCOUNT_ISSUE          // Login, profile, account settings
  TECHNICAL_PROBLEM      // Bugs, errors, app not working
  MATCHING_QUESTION      // How matching works, results questions
  SUBSCRIPTION_BILLING   // Subscription, payment, billing (coordinators)
  DATA_PRIVACY           // GDPR requests, data deletion
  FEATURE_REQUEST        // Suggestions for new features
  OTHER                  // General inquiries
}

enum TicketStatus {
  OPEN                   // New, not yet reviewed
  IN_PROGRESS            // Admin is working on it
  RESOLVED               // Closed with response
  CLOSED                 // Closed without response (spam, duplicate, etc.)
}

enum TicketPriority {
  LOW
  NORMAL
  HIGH
  URGENT
}
```

#### Schema Updates Required

1. Add `SupportTicket` model to `schema.prisma`
2. Add relation to `User` model:
   ```prisma
   // In User model
   supportTickets    SupportTicket[]
   resolvedTickets   SupportTicket[] @relation("ResolvedTickets")
   ```
3. Add relation to `IBSchool` model:
   ```prisma
   // In IBSchool model  
   supportTickets    SupportTicket[]
   ```

---

## Tasks & Implementation Details

### Task 1: Database Schema Update

**Description**: Add the SupportTicket model and related enums to the Prisma schema.

**Files to Modify**:
- `prisma/schema.prisma`

**Acceptance Criteria**:
- [ ] `SupportTicket` model is defined with all fields
- [ ] `TicketCategory`, `TicketStatus`, `TicketPriority` enums are defined
- [ ] Relations to `User` and `IBSchool` are properly configured
- [ ] Indexes are added for performance on common query patterns
- [ ] Migration runs successfully with `npx prisma migrate dev`
- [ ] Prisma client generates without errors

**Testing**:
- Run `npx prisma migrate dev --name add_support_tickets`
- Run `npx prisma generate`
- Verify schema in Prisma Studio: `npx prisma studio`

---

### Task 2: Email Templates

**Description**: Create React Email templates for ticket notifications.

**Files to Create**:
- `emails/ticket-created.tsx` - Confirmation email when ticket is submitted
- `emails/ticket-resolved.tsx` - Notification when ticket is resolved with admin response

**Design Requirements**:
- Match existing email template styling (see `emails/magic-link.tsx`)
- Include:
  - Ticket number prominently displayed
  - Category and subject
  - Confirmation of submission / resolution message
  - Admin response (for resolution email)
  - Footer with copyright and legal links

**Acceptance Criteria**:
- [ ] Both email templates render correctly
- [ ] Templates use consistent branding (PRIMARY_COLOR = '#3573E5')
- [ ] Ticket number is clearly visible
- [ ] Resolution email includes admin response content
- [ ] Templates are mobile-responsive
- [ ] Preview text is meaningful

**Testing**:
- Use React Email preview: `npm run email:dev` (or equivalent)
- Manually review rendered HTML in browser
- Test on email clients (Gmail, Outlook) using Resend test mode

---

### Task 3: API Routes - Ticket Submission

**Description**: Create API endpoints for submitting support tickets.

**Files to Create**:
- `app/api/support/tickets/route.ts` - POST: Create ticket, GET: List user's tickets

**Endpoint Specifications**:

#### POST `/api/support/tickets`

**Request Body**:
```typescript
{
  category: TicketCategory
  subject: string       // max 200 chars
  message: string       // max 5000 chars
}
```

**Response**:
```typescript
{
  success: true
  ticketNumber: string  // e.g., "TKT-ABC123"
  message: string
}
```

**Logic**:
1. Authenticate user (must be STUDENT or COORDINATOR)
2. Validate input with Zod
3. Generate unique ticket number (TKT-XXXXXX format)
4. Create SupportTicket record
5. Send confirmation email via Resend
6. Return ticket number

**Acceptance Criteria**:
- [ ] Only authenticated STUDENT and COORDINATOR roles can submit
- [ ] Input validation (subject max 200 chars, message max 5000 chars)
- [ ] Ticket number is unique and human-readable
- [ ] Email is sent to user's email address
- [ ] CoordinatorProfile school context is captured for coordinators
- [ ] Proper error handling and logging
- [ ] Rate limiting: max 5 tickets per hour per user

**Testing**:
- Unit test: ticket number generation uniqueness
- Integration test: POST request with valid/invalid data
- Integration test: verify email is queued (mock Resend)
- Manual test: submit ticket as student, check database and email

---

### Task 4: API Routes - Admin Ticket Management

**Description**: Create API endpoints for admin ticket management.

**Files to Create**:
- `app/api/admin/support/route.ts` - GET: List all tickets with filters
- `app/api/admin/support/[id]/route.ts` - GET: Ticket detail, PATCH: Update status/respond

**Endpoint Specifications**:

#### GET `/api/admin/support`

**Query Parameters**:
- `status` - Filter by status (OPEN, IN_PROGRESS, RESOLVED, CLOSED)
- `category` - Filter by category
- `userRole` - Filter by STUDENT or COORDINATOR
- `search` - Search in subject, message, ticket number, user email
- `page`, `limit` - Pagination (default: page=1, limit=20)
- `sortBy`, `sortOrder` - Sorting options

**Response**:
```typescript
{
  tickets: SupportTicket[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
```

#### GET `/api/admin/support/[id]`

Returns full ticket details including user info.

#### PATCH `/api/admin/support/[id]`

**Request Body**:
```typescript
{
  status?: TicketStatus
  priority?: TicketPriority
  adminResponse?: string    // Required when status = RESOLVED
}
```

**Logic**:
1. Validate admin role
2. Update ticket fields
3. If status changes to RESOLVED:
   - Require adminResponse
   - Set resolvedById and resolvedAt
   - Send resolution email to user

**Acceptance Criteria**:
- [ ] Only PLATFORM_ADMIN role can access
- [ ] All filter combinations work correctly
- [ ] Pagination works correctly
- [ ] Search searches across relevant fields
- [ ] Resolution requires adminResponse
- [ ] Resolution email is sent automatically
- [ ] Audit trail: resolvedById and resolvedAt are set

**Testing**:
- Integration test: list tickets with various filters
- Integration test: update ticket status
- Integration test: resolve ticket triggers email
- Manual test: use admin dashboard to manage tickets

---

### Task 5: Student Contact Us Page

**Description**: Create the public-facing contact form for students.

**Files to Create**:
- `app/contact/page.tsx` - Main contact page (server component)
- `app/contact/_components/ContactForm.tsx` - Form component (client)

**Design Requirements**:
- Accessible from footer (already linked as `/contact`)
- For logged-in students: pre-fill email, show form
- For logged-out users: show helpful info and encourage sign-in
- Form fields:
  - Category (dropdown)
  - Subject (text input, max 200 chars)
  - Message (textarea, max 5000 chars)
- Success state with ticket number
- Loading state during submission

**UI/UX**:
- Use existing form styling patterns from the app
- Category descriptions to help users choose correctly
- Character counters for subject and message
- Mobile-responsive design

**Acceptance Criteria**:
- [ ] Page renders at `/contact`
- [ ] Form validates required fields client-side
- [ ] Form validates max lengths
- [ ] Submit button shows loading state
- [ ] Success message displays ticket number
- [ ] Error handling for API failures
- [ ] SEO: proper meta tags and title

**Testing**:
- Manual test: navigate from footer to contact page
- Manual test: submit form as logged-in student
- Manual test: verify form validation (empty fields, too long)
- Manual test: verify success state shows ticket number
- Browser test: verify responsive layout on mobile

---

### Task 6: Coordinator Support Page

**Description**: Add a support page accessible from the coordinator dashboard.

**Files to Create**:
- `app/coordinator/support/page.tsx` - Support page (server component)
- `app/coordinator/support/_components/SupportTicketForm.tsx` - Form component

**Files to Modify**:
- `components/coordinator/CoordinatorSidebar.tsx` - Add "Support" link

**Design Requirements**:
- Accessible from sidebar navigation (add "Support" or "Help" link)
- Pre-fill user info from session
- Include school context automatically
- Same form fields as student contact
- Add additional category options relevant to coordinators (e.g., SUBSCRIPTION_BILLING)
- Show history of user's previous tickets (optional, nice-to-have)

**Acceptance Criteria**:
- [ ] Page renders at `/coordinator/support`
- [ ] Link appears in coordinator sidebar
- [ ] Form uses same validation as student form
- [ ] School context is captured in ticket
- [ ] Coordinator-specific categories are available
- [ ] Follows existing coordinator dashboard styling

**Testing**:
- Manual test: navigate from sidebar to support page
- Manual test: submit form as coordinator
- Manual test: verify school info is captured
- Verify ticket appears in admin panel with school context

---

### Task 7: Admin Support Tickets Module

**Description**: Create the admin interface for managing support tickets.

**Files to Create**:
- `app/admin/support/page.tsx` - Tickets list page
- `app/admin/support/[id]/page.tsx` - Ticket detail page
- `app/admin/support/_components/TicketsList.tsx` - Client component for list
- `app/admin/support/_components/TicketDetail.tsx` - Client component for detail
- `app/admin/support/_components/TicketResponseForm.tsx` - Response form
- `components/admin/support/TicketStatusBadge.tsx` - Status badge component
- `components/admin/support/TicketPriorityBadge.tsx` - Priority badge component

**Files to Modify**:
- `components/admin/AdminSidebar.tsx` - Add "Support" or "Tickets" link

**Design Requirements**:
- Follow existing admin patterns (PageHeader, DataTable, SearchFilterBar)
- List view:
  - Table with: Ticket #, User, Category, Subject, Status, Priority, Created
  - Filters: Status, Category, User Role, Date range
  - Search by ticket number, subject, user email
  - Sort by date, priority, status
  - Pagination
- Detail view:
  - Full ticket information
  - User details (email, name, role, school if coordinator)
  - Status badge (color-coded)
  - Priority badge (color-coded)
  - Ticket content (category, subject, message)
  - Response form with textarea
  - Quick actions: Set priority, Change status, Resolve
- Dashboard stats (optional):
  - Open tickets count
  - Avg. resolution time
  - Tickets by category

**Acceptance Criteria**:
- [ ] Page renders at `/admin/support`
- [ ] Link appears in admin sidebar with appropriate icon
- [ ] List shows all tickets with proper pagination
- [ ] All filters work correctly
- [ ] Search works across ticket number, subject, email
- [ ] Clicking a ticket navigates to detail view
- [ ] Detail view shows all ticket information
- [ ] Response form validates required fields
- [ ] Resolving ticket sends email to user
- [ ] Status changes update in real-time (or on refresh)

**Testing**:
- Manual test: navigate to admin support page
- Manual test: apply various filters
- Manual test: search for ticket by number
- Manual test: view ticket details
- Manual test: respond and resolve a ticket
- Verify resolution email is received

---

### Task 8: Email Integration with Resend

**Description**: Implement the email sending functionality using Resend.

**Files to Create/Modify**:
- `lib/email/support-tickets.ts` - Functions for sending ticket emails

**Functions**:
```typescript
// Send confirmation when ticket is created
async function sendTicketCreatedEmail(params: {
  to: string
  ticketNumber: string
  category: TicketCategory
  subject: string
}): Promise<void>

// Send notification when ticket is resolved
async function sendTicketResolvedEmail(params: {
  to: string
  ticketNumber: string
  category: TicketCategory
  subject: string
  adminResponse: string
}): Promise<void>
```

**Acceptance Criteria**:
- [ ] Uses existing Resend configuration from .env
- [ ] Emails render correctly (test with React Email preview)
- [ ] Error handling with proper logging
- [ ] Emails are sent asynchronously (don't block API response)
- [ ] Sender address matches existing app emails

**Testing**:
- Integration test with Resend test mode
- Manual test: submit ticket and verify email received
- Manual test: resolve ticket and verify email received

---

## File Structure Summary

```
/app
  /api
    /support
      /tickets
        route.ts           # POST: create, GET: user's tickets
    /admin
      /support
        route.ts           # GET: list all tickets
        /[id]
          route.ts         # GET: detail, PATCH: update/respond
  /contact
    page.tsx               # Student contact page
    /_components
      ContactForm.tsx
  /coordinator
    /support
      page.tsx             # Coordinator support page
      /_components
        SupportTicketForm.tsx
  /admin
    /support
      page.tsx             # Admin tickets list
      /[id]
        page.tsx           # Admin ticket detail

/components
  /admin
    /support
      TicketStatusBadge.tsx
      TicketPriorityBadge.tsx

/emails
  ticket-created.tsx
  ticket-resolved.tsx

/lib
  /email
    support-tickets.ts

/prisma
  schema.prisma            # Updated with SupportTicket model
```

---

## Best Practices for 2025

### User Experience
1. **Single submission flow** - Users submit once, no back-and-forth on form
2. **Clear categorization** - Categories help route tickets and set expectations
3. **Immediate confirmation** - Email with ticket number builds trust
4. **Resolution notification** - Users are notified when issue is resolved, not left wondering

### Admin Experience
1. **One-click resolution** - Quick workflow for simple issues
2. **Bulk actions** - Handle spam/duplicates efficiently (future enhancement)
3. **Priority system** - Focus on urgent matters first
4. **Search & filter** - Find specific tickets quickly

### Technical Best Practices
1. **Rate limiting** - Prevent spam/abuse (5 tickets/hour/user)
2. **Input sanitization** - Prevent XSS in ticket content
3. **Soft delete consideration** - Keep tickets for audit (mark as CLOSED vs delete)
4. **Email queue** - Don't block API on email sending
5. **Structured logging** - Track ticket lifecycle for debugging

### GDPR Compliance
1. **Data retention** - Consider auto-archiving old tickets (e.g., after 2 years)
2. **Data export** - Tickets should be included in user data export
3. **Account deletion** - Handle tickets when user deletes account (anonymize or delete)

---

## Verification Plan

### Automated Tests
- Database: Migration applies cleanly
- API: Unit tests for ticket number generation
- API: Integration tests for all endpoints with auth checks

### Manual Testing Checklist

#### Student Flow
1. Navigate to `/contact` from footer
2. Submit form with all fields
3. Verify success message with ticket number
4. Check email inbox for confirmation email
5. Verify ticket appears in admin panel

#### Coordinator Flow
1. Log in as coordinator
2. Navigate to support page from sidebar
3. Submit form with all fields
4. Verify school info is captured
5. Check email inbox for confirmation

#### Admin Flow
1. Log in as admin
2. Navigate to support tickets from sidebar
3. Verify list shows tickets
4. Apply filters (status, category, role)
5. Search for ticket by number
6. Click to view ticket detail
7. Add response and resolve ticket
8. Verify user receives resolution email

---

## Out of Scope (Future Enhancements)

- **Ticket comments/thread** - Multi-message conversation (currently single response)
- **File attachments** - Screenshots, logs (would need storage solution)
- **Auto-responders** - FAQ-based automatic responses
- **SLA tracking** - First response time, resolution time targets
- **Canned responses** - Pre-written responses for common issues
- **Ticket assignment** - Assign to specific admin team members
- **Email thread integration** - Users reply to email to update ticket

---

## Dependencies

- **Resend** - Email service (already configured in .env)
- **React Email** - Email templates (already used)
- **Prisma** - Database ORM (existing)
- **Zod** - Validation (existing)
- **Shadcn/UI** - UI components (existing)

No new third-party tools required.

---

## Timeline Estimate

| Task | Estimated Hours |
|------|----------------|
| Task 1: Database Schema | 1h |
| Task 2: Email Templates | 2h |
| Task 3: API - Submission | 3h |
| Task 4: API - Admin | 3h |
| Task 5: Student Contact Page | 3h |
| Task 6: Coordinator Support Page | 2h |
| Task 7: Admin Support Module | 5h |
| Task 8: Email Integration | 1h |
| Testing & QA | 3h |
| **Total** | **~23h** |
