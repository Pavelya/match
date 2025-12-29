# Content Management System for Legal Pages

## Overview

This document outlines the tasks for implementing a Content Management System (CMS) for legal and policy pages in IB Match. The system will enable admins to manage, version, and publish content for:

- `/terms` - Terms of Service
- `/privacy` - Privacy Policy  
- `/faqs` - Frequently Asked Questions
- Cookie Consent Banner (text and categories)

## Current State Analysis

### Existing Implementation
- **Legal pages**: Hardcoded in React components (`app/terms/page.tsx`, `app/privacy/page.tsx`, `app/faqs/page.tsx`)
- **Cookie banner**: `CookieConsentBanner.tsx` with localStorage-based consent tracking
- **Consent tracking**: User model tracks `termsVersion` and `privacyPolicyVersion` 
- **Version strings**: Hardcoded in `lib/auth/config.ts` as `CURRENT_TERMS_VERSION = '2025-12-09'`
- **Admin module**: Established patterns with sidebar navigation, CRUD operations, shared components

### Problems with Current Approach
1. Content changes require code deployments
2. No draft/preview capability
3. No version history or rollback
4. No audit trail of who changed what
5. Version strings are hardcoded, not linked to actual content
6. Effective dates must be manually coordinated

---

## 2025 Best Practices Applied

Based on industry research, this CMS will incorporate:

| Practice | Implementation |
|----------|---------------|
| **Automated Versioning** | Auto-increment version on each save, timestamp every change |
| **Audit Trails** | Track author, changes, timestamps for compliance |
| **Draft/Publish Workflow** | Separate draft and published states |
| **Rollback Capability** | Revert to any previous published version |
| **Effective Dates** | Schedule when new versions take effect |
| **Rich Text Editing** | Markdown editor with preview |
| **GDPR Compliance** | Re-consent prompts when policy versions change |

---

## Database Schema Design

### New Models Required

```prisma
model LegalDocument {
  id          String   @id @default(cuid())
  type        LegalDocumentType
  
  // All versions of this document
  versions    LegalDocumentVersion[]
  
  // Currently published version
  publishedVersionId String?
  publishedVersion   LegalDocumentVersion? @relation("PublishedVersion", fields: [publishedVersionId], references: [id])
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@unique([type])
}

model LegalDocumentVersion {
  id               String   @id @default(cuid())
  documentId       String
  document         LegalDocument @relation(fields: [documentId], references: [id], onDelete: Cascade)
  
  // Content
  title            String
  content          String   @db.Text  // Markdown content
  
  // Versioning
  versionNumber    Int      // Auto-incremented per document
  versionLabel     String   // Human-readable, e.g., "2025-12-26" or "v2.1"
  
  // State management
  status           DocumentStatus @default(DRAFT)
  
  // Scheduling
  effectiveDate    DateTime?  // When this version becomes active
  
  // Audit
  createdById      String
  createdBy        User     @relation("CreatedVersions", fields: [createdById], references: [id])
  publishedById    String?
  publishedBy      User?    @relation("PublishedVersions", fields: [publishedById], references: [id])
  publishedAt      DateTime?
  
  // Metadata
  changeNotes      String?  // Summary of what changed
  
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  
  // Published relation (one-to-one back-reference)
  publishedFor     LegalDocument? @relation("PublishedVersion")
  
  @@unique([documentId, versionNumber])
  @@index([documentId])
  @@index([status])
}

enum LegalDocumentType {
  TERMS_OF_SERVICE
  PRIVACY_POLICY
  FAQ
  COOKIE_POLICY
}

enum DocumentStatus {
  DRAFT
  PENDING_REVIEW
  PUBLISHED
  ARCHIVED
}
```

---

## Task Breakdown

### Phase 1: Database & Backend Foundation
**Goal**: Create the data layer for document versioning

#### Task 1.1: Schema Migration
- Add `LegalDocument` and `LegalDocumentVersion` models to Prisma schema
- Add relations to `User` model for audit tracking
- Run migration and generate client
- **Expected Outcome**: Database tables created, Prisma client updated

#### Task 1.2: API Routes for Document Management
- `GET /api/admin/legal-documents` - List all document types with latest versions
- `GET /api/admin/legal-documents/[type]` - Get document with all versions
- `POST /api/admin/legal-documents/[type]/versions` - Create new version
- `PATCH /api/admin/legal-documents/[type]/versions/[id]` - Update draft
- `POST /api/admin/legal-documents/[type]/versions/[id]/publish` - Publish version
- `POST /api/admin/legal-documents/[type]/versions/[id]/revert` - Revert to previous version
- **Expected Outcome**: Complete CRUD API with role protection

#### Task 1.3: Version Management Service
- Create `lib/legal-documents/` with:
  - `service.ts` - Business logic for version management
  - `types.ts` - TypeScript interfaces
  - `utils.ts` - Helpers for version formatting, diff generation
- Implement auto-incrementing version numbers
- Implement effective date scheduling logic
- **Expected Outcome**: Reusable service layer for document operations

---

### Phase 2: Admin Module UI
**Goal**: Build the admin interface for content management

#### Task 2.1: Admin Navigation Update
- Add "Legal Content" link to `AdminSidebar.tsx`
- New icon: `FileText` or `Scale` from lucide-react
- **Expected Outcome**: Legal content accessible from admin sidebar

#### Task 2.2: Document List Page
- Create `app/admin/legal-content/page.tsx`
- Display cards for each document type (Terms, Privacy, FAQs, Cookies)
- Show: current published version, last updated, status badge
- Quick actions: Edit, View Published, Create New Version
- **Expected Outcome**: Dashboard view of all legal documents

#### Task 2.3: Document Editor Page
- Create `app/admin/legal-content/[type]/page.tsx`
- Tabs: "Current Draft", "Published", "Version History"
- Editor features:
  - Markdown editor with live preview (use existing patterns)
  - Title and version label fields
  - Effective date picker
  - Change notes textarea
  - Save Draft / Publish buttons
- **Expected Outcome**: Full-featured editor for document content

#### Task 2.4: Version History Component
- Create version history table/list component
- Display: version number, date, author, status, change notes
- Actions: View, Restore, Compare (future)
- Pagination for long histories
- **Expected Outcome**: Complete version history view

#### Task 2.5: Publish Workflow
- Confirmation modal before publishing
- Display effective date options (immediate, scheduled)
- Email notification option to admins
- **Expected Outcome**: Safe, confirmed publishing process

---

### Phase 3: Public Page Integration
**Goal**: Serve content from CMS instead of hardcoded components

#### Task 3.1: Public API Route
- `GET /api/legal-documents/[type]` - Get published content for public pages
- Cache with appropriate headers
- Return markdown content and metadata
- **Expected Outcome**: Public endpoint for legal content

#### Task 3.2: Update Terms Page
- Modify `app/terms/page.tsx` to fetch from CMS
- Render markdown content with proper styling
- Display effective date and version
- Fallback to static content if CMS unavailable
- **Expected Outcome**: Dynamic terms page

#### Task 3.3: Update Privacy Page
- Same approach as Terms page
- Update `app/privacy/page.tsx`
- **Expected Outcome**: Dynamic privacy page

#### Task 3.4: Update FAQs Page
- Different structure: FAQ content is array of Q&A pairs
- Consider JSON-based content structure for FAQs
- Maintain JSON-LD structured data for SEO
- **Expected Outcome**: Dynamic FAQs page with SEO

#### Task 3.5: Update Cookie Banner Content
- Store cookie category descriptions in CMS
- Make cookie banner text configurable
- Maintain consent version tracking
- **Expected Outcome**: Configurable cookie banner

---

### Phase 4: Consent Re-prompting
**Goal**: Automatically prompt users when policy versions change

#### Task 4.1: Version Comparison Logic
- Compare user's accepted version with current published version
- Trigger re-consent flow when mismatch detected
- **Expected Outcome**: Automatic detection of outdated consent

#### Task 4.2: Re-consent Modal
- Create modal component for consent re-prompt
- Display summary of changes (optional)
- Link to full document
- Accept button updates user's consent record
- **Expected Outcome**: Non-intrusive re-consent flow

#### Task 4.3: Update Auth Flow
- Remove hardcoded version strings from `lib/auth/config.ts`
- Fetch current versions from database
- Update consent recording to use dynamic versions
- **Expected Outcome**: Consent tracking uses CMS versions

---

### Phase 5: Advanced Features (Optional/Future)
**Goal**: Enhanced capabilities for mature content management

#### Task 5.1: Side-by-Side Diff View
- Compare two versions visually
- Highlight additions, deletions, modifications
- Use library like `diff-match-patch` or `jsdiff`
- **Expected Outcome**: Visual diff comparison tool

#### Task 5.2: Email Notifications
- Notify users when Terms/Privacy change (opt-in)
- Create email template for policy updates
- Batch email sending for large user base
- **Expected Outcome**: Proactive policy change notifications

#### Task 5.3: Scheduled Publishing
- Background job to publish at scheduled effective date
- Use Vercel Cron or similar
- Email confirmation when scheduled publish occurs
- **Expected Outcome**: Automated scheduled publishing

---

## Technical Considerations

### Markdown Rendering
- Use `react-markdown` with `remark-gfm` for GitHub-flavored markdown
- Apply consistent prose styling (already used in legal pages)
- Sanitize content for XSS prevention

### Caching Strategy
- Cache published content in Redis with 5-minute TTL
- Invalidate cache on publish
- CDN caching for public pages

### Migration Strategy
- Seed initial content from existing hardcoded pages
- Run seeding script as part of migration
- Keep static fallback during transition

### Backward Compatibility
- Existing consent records remain valid
- Map old version strings to new version IDs
- Gradual rollout with feature flag

---

## Priority Order

| Priority | Phase | Estimated Effort |
|----------|-------|-----------------|
| P0 | Phase 1 (Database) | 2-3 days |
| P0 | Phase 2 (Admin UI) | 3-4 days |
| P1 | Phase 3 (Public Pages) | 2 days |
| P1 | Phase 4 (Re-consent) | 1-2 days |
| P2 | Phase 5 (Advanced) | 2-3 days |

**Total Estimated Effort**: 10-14 days

---

## Success Criteria

1. ✅ Admin can create, edit, and save draft versions
2. ✅ Admin can publish a version with optional effective date
3. ✅ Admin can view complete version history with audit trail
4. ✅ Admin can revert to any previous published version
5. ✅ Public pages display content from CMS
6. ✅ Users are prompted to re-accept when policies change
7. ✅ Cookie banner content is configurable
8. ✅ All actions are logged with user attribution

---

## Related Files

### To Create
- `prisma/schema.prisma` (update)
- `lib/legal-documents/service.ts`
- `lib/legal-documents/types.ts`
- `app/api/admin/legal-documents/route.ts`
- `app/api/admin/legal-documents/[type]/route.ts`
- `app/api/admin/legal-documents/[type]/versions/route.ts`
- `app/api/legal-documents/[type]/route.ts`
- `app/admin/legal-content/page.tsx`
- `app/admin/legal-content/[type]/page.tsx`
- `components/admin/legal-content/*.tsx`

### To Modify
- `components/admin/AdminSidebar.tsx` - Add navigation link
- `app/terms/page.tsx` - Fetch from CMS
- `app/privacy/page.tsx` - Fetch from CMS
- `app/faqs/page.tsx` - Fetch from CMS
- `components/shared/CookieConsentBanner.tsx` - Configurable content
- `lib/auth/config.ts` - Dynamic version fetching
