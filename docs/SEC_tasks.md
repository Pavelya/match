# Security, Privacy & Compliance Tasks

**Created:** December 9, 2025  
**Status:** Active  
**Reference:** Security Audit Report

---

## Overview

This document tracks all security, privacy, and compliance tasks identified in the security audit. Tasks are organized by priority level and include specific goals, acceptance criteria, and verification tests.

---

## 🔴 Priority 1: Critical (Pre-Launch Requirements)

These tasks MUST be completed before any production deployment.

---

### Task 1.1: Implement Rate Limiting

**Goal:** Protect API endpoints from abuse, DoS attacks, and brute force attempts.

**Scope:**
- All `/api/auth/*` endpoints
- `/api/students/profile` (POST)
- `/api/students/matches` (GET)
- `/api/students/matches/precompute` (POST)
- `/api/programs/search` (GET)

**Implementation:**
- Use Upstash Rate Limit library (compatible with existing Redis setup)
- Configure tiered limits:
  - Auth endpoints: 5 requests per 10 seconds per IP
  - Profile save: 10 requests per minute per user
  - Matches: 20 requests per minute per user
  - Search: 30 requests per minute per IP

**Acceptance Criteria:**
- [x] Rate limiter middleware created
- [x] All API routes protected
- [x] 429 responses returned when limit exceeded
- [x] Rate limit headers included in responses (`X-RateLimit-Remaining`, etc.)

**Verification Tests:**
1. **Unit Test:** Mock Redis, verify rate limit counter increments
2. **Integration Test:** Make 6 rapid auth requests, verify 6th returns 429
3. **Manual Test:** Use `curl` to hit endpoint rapidly, confirm rate limiting
4. **Load Test:** Verify legitimate burst traffic is handled gracefully

---

### Task 1.2: Add Security Headers

**Goal:** Protect against XSS, clickjacking, MIME sniffing, and protocol downgrade attacks.

**Scope:**
- All application routes

**Implementation:**
Add headers in `next.config.ts`:

```typescript
headers: [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }
]
```

**Acceptance Criteria:**
- [x] All security headers configured in `next.config.ts`
- [x] Headers present in all HTTP responses
- [x] CSP configured (if applicable)

**Verification Tests:**
1. **Manual Test:** Use browser DevTools > Network tab, verify headers present
2. **Automated Test:** `curl -I https://domain.com` and grep for headers
3. **Security Scanner:** Run Mozilla Observatory scan (score B or higher)
4. **Integration Test:** Check response headers in API route tests

---

### Task 1.3: Create Privacy Policy Page

**Goal:** GDPR Article 13 compliance - inform users about data processing.

**Scope:**
- Create `/app/privacy/page.tsx`
- Content must cover all data collection and processing

**Required Content:**
- [ ] Data controller identity and contact
- [ ] Types of personal data collected
- [ ] Purpose of data processing
- [ ] Legal basis for processing
- [ ] Data retention periods
- [ ] Third-party data sharing (Algolia, Upstash, Resend, Google)
- [ ] User rights (access, rectification, erasure, portability)
- [ ] How to exercise rights
- [ ] Cookie usage explanation
- [ ] Updates policy

**Acceptance Criteria:**
- [x] Page accessible at `/privacy`
- [x] All required GDPR disclosures included
- [x] Link from sign-in page works
- [x] Proper SEO metadata

**Verification Tests:**
1. **Manual Test:** Navigate to `/privacy`, verify content renders
2. **Link Test:** Click "Privacy Policy" link from sign-in page
3. **Content Review:** Legal review of policy contents
4. **Accessibility Test:** Screen reader compatibility

---

### Task 1.4: Create Terms of Service Page

**Goal:** Legal protection and user agreement documentation.

**Scope:**
- Create `/app/terms/page.tsx`
- Cover service usage terms

**Required Content:**
- [ ] Service description
- [ ] User eligibility requirements
- [ ] Account responsibilities
- [ ] Acceptable use policy
- [ ] Intellectual property rights
- [ ] Limitation of liability
- [ ] Indemnification
- [ ] Termination conditions
- [ ] Governing law
- [ ] Updates policy

**Acceptance Criteria:**
- [x] Page accessible at `/terms`
- [x] All standard terms included
- [x] Link from sign-in page works
- [x] Proper SEO metadata

**Verification Tests:**
1. **Manual Test:** Navigate to `/terms`, verify content renders
2. **Link Test:** Click "Terms of Service" link from sign-in page
3. **Content Review:** Legal review of terms

---

### Task 1.5: Create Application Middleware

**Goal:** Centralized security enforcement at the edge.

**Scope:**
- Create `/middleware.ts` at project root

**Implementation:**
```typescript
import { auth } from "@/lib/auth/config"
import { NextResponse } from "next/server"

export default auth((req) => {
  // Protect student routes
  if (req.nextUrl.pathname.startsWith("/student")) {
    if (!req.auth) {
      return NextResponse.redirect(new URL("/auth/signin", req.url))
    }
  }
  
  // Add security headers to all responses
  const response = NextResponse.next()
  response.headers.set("X-Frame-Options", "DENY")
  // ... more headers
  
  return response
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
```

**Acceptance Criteria:**
- [x] Middleware created and active
- [x] Unauthenticated users redirected from `/student/*`
- [x] Security headers applied to all routes

**Verification Tests:**
1. **Manual Test:** Access `/student/matches` while logged out, verify redirect
2. **Integration Test:** Verify middleware chain executes correctly
3. **Header Test:** Verify headers present on all routes

---

## 🟠 Priority 2: High (Within 2 Weeks Post-Launch)

These tasks are important for compliance and should be completed soon after launch.

---

### Task 2.1: Implement Account Deletion

**Goal:** GDPR Article 17 compliance - Right to Erasure.

**Scope:**
- Create `/api/students/account/delete` endpoint
- Create UI for account deletion request
- Cascade delete all user data

**Implementation:**
- Delete order: StudentCourse → StudentProfile → Sessions → Accounts → User
- Consider soft delete with 30-day grace period
- Send confirmation email

**Acceptance Criteria:**
- [ ] API endpoint created and protected
- [ ] All related data deleted (verified in DB)
- [ ] User logged out after deletion
- [ ] Confirmation email sent
- [ ] UI accessible from settings

**Verification Tests:**
1. **Integration Test:** Delete account, verify all tables cleaned
2. **Manual Test:** Delete test account, verify login fails
3. **Audit Test:** Verify no orphaned data remains
4. **Email Test:** Verify confirmation email received

---

### Task 2.2: Implement Data Export

**Goal:** GDPR Article 20 compliance - Right to Data Portability.

**Scope:**
- Create `/api/students/account/export` endpoint
- Return JSON with all user data
- Consider adding CSV option

**Data to Include:**
- User profile (email, name, image)
- Student profile (grades, points)
- Course selections
- Preferences (fields, countries)
- Saved programs
- Account creation date

**Acceptance Criteria:**
- [ ] API endpoint created and protected
- [ ] JSON export contains all user data
- [ ] Download triggers properly
- [ ] UI accessible from settings

**Verification Tests:**
1. **Integration Test:** Export data, verify all fields present
2. **Manual Test:** Download export, open in JSON viewer
3. **Format Test:** Validate JSON is well-formed
4. **Content Test:** Verify exported data matches DB

---

### Task 2.3: Add Consent Tracking

**Goal:** Track when users agreed to terms and privacy policy.

**Scope:**
- Add fields to User model
- Record consent at sign-up
- Handle policy updates

**Database Changes:**
```prisma
model User {
  // ... existing fields
  termsAcceptedAt       DateTime?
  termsVersion          String?
  privacyAcceptedAt     DateTime?
  privacyPolicyVersion  String?
}
```

**Acceptance Criteria:**
- [ ] Database schema updated
- [ ] Consent recorded at registration
- [ ] Consent version tracked
- [ ] Re-consent flow for policy updates

**Verification Tests:**
1. **Integration Test:** Register user, verify consent fields populated
2. **Manual Test:** Check DB after registration
3. **Update Test:** Simulate policy update, verify re-consent prompt

---

### Task 2.4: Fix Timing Attack Vulnerability

**Goal:** Secure internal API key comparison.

**Scope:**
- Update `/api/students/matches/precompute/route.ts`

**Implementation:**
```typescript
import crypto from 'crypto'

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) {
    // Compare against self to maintain constant time
    crypto.timingSafeEqual(bufA, bufA)
    return false
  }
  return crypto.timingSafeEqual(bufA, bufB)
}
```

**Acceptance Criteria:**
- [ ] `crypto.timingSafeEqual` used for key comparison
- [ ] Constant-time comparison regardless of input

**Verification Tests:**
1. **Code Review:** Verify implementation uses timing-safe comparison
2. **Unit Test:** Test with matching and non-matching keys

---

### Task 2.5: Cookie Consent Banner

**Goal:** ePrivacy Directive compliance for non-essential cookies.

**Scope:**
- Audit current cookie usage
- Implement consent banner if non-essential cookies used
- Store consent preference

**Implementation Steps:**
1. Audit: List all cookies set by the app
2. Classify: Essential vs. non-essential
3. If non-essential exist: Implement consent banner
4. Store: Save preference in localStorage + cookie

**Acceptance Criteria:**
- [ ] Cookie audit completed
- [ ] Banner implemented (if required)
- [ ] Consent stored and respected
- [ ] Non-essential cookies only set after consent

**Verification Tests:**
1. **Audit Test:** Document all cookies and purposes
2. **Manual Test:** Verify banner appears for new visitors
3. **Consent Test:** Decline cookies, verify none set

---

## 🟡 Priority 3: Medium (Within 1 Month)

These tasks improve security posture and should be completed within the first month.

---

### Task 3.1: Input Validation for Algolia Filters

**Goal:** Prevent injection in Algolia filter strings.

**Scope:**
- Validate IDs in `lib/algolia/search.ts`

**Implementation:**
```typescript
const CUID_REGEX = /^c[a-z0-9]{24}$/

function validateId(id: string): boolean {
  return CUID_REGEX.test(id)
}

// Before building filters:
const validFields = studentFields.filter(validateId)
```

**Acceptance Criteria:**
- [ ] ID validation added
- [ ] Invalid IDs rejected or filtered out
- [ ] No Algolia errors from malformed filters

**Verification Tests:**
1. **Unit Test:** Pass invalid IDs, verify rejection
2. **Integration Test:** Search with malformed filter, verify graceful handling

---

### Task 3.2: Log Sanitization

**Goal:** Prevent sensitive data from appearing in logs.

**Scope:**
- Review all logger calls
- Redact emails, tokens, and full IDs

**Implementation:**
- Create `redactId(id)` utility: shows first/last 4 chars
- Never log email addresses
- Never log tokens or secrets

**Acceptance Criteria:**
- [ ] Log audit completed
- [ ] Redaction utility created
- [ ] No sensitive data in production logs

**Verification Tests:**
1. **Log Review:** Check recent logs for sensitive data
2. **Manual Test:** Trigger log events, verify redaction

---

### Task 3.3: Email Privacy in Client Components

**Goal:** Minimize email exposure in DOM.

**Scope:**
- Review `StudentHeader` component
- Only pass necessary user data to client

**Implementation:**
- Remove email from props if only used for Gravatar
- Consider using initials instead of email display

**Acceptance Criteria:**
- [ ] Email not exposed in HTML when not needed
- [ ] Minimal data passed to client components

**Verification Tests:**
1. **DOM Inspection:** View source, search for email addresses
2. **Manual Test:** Verify functionality maintained

---

## 🟢 Priority 4: Ongoing

These are continuous security practices.

---

### Task 4.1: Dependency Security Audits

**Goal:** Keep dependencies secure and updated.

**Schedule:** Weekly

**Process:**
```bash
npm audit
npm audit fix
npm outdated
```

**Acceptance Criteria:**
- [ ] No high/critical vulnerabilities
- [ ] Dependencies updated within 30 days of patches

---

### Task 4.2: Security Monitoring

**Goal:** Detect and respond to security incidents.

**Implementation:**
- Set up error monitoring (Sentry or similar)
- Monitor for unusual API patterns
- Set up alerts for failed auth attempts

---

### Task 4.3: Penetration Testing

**Goal:** Validate security through external testing.

**Schedule:** Before major releases

**Scope:**
- API security testing
- Authentication bypass attempts
- Data exposure testing

---

## Progress Tracking

| Task | Priority | Status | Assigned | Due Date |
|------|----------|--------|----------|----------|
| 1.1 Rate Limiting | 🔴 Critical | ✅ Completed | | Dec 9, 2025 |
| 1.2 Security Headers | 🔴 Critical | ✅ Completed | | Dec 9, 2025 |
| 1.3 Privacy Policy | 🔴 Critical | ✅ Completed | | Dec 9, 2025 |
| 1.4 Terms of Service | 🔴 Critical | ✅ Completed | | Dec 9, 2025 |
| 1.5 Middleware | 🔴 Critical | ✅ Completed | | Dec 9, 2025 |
| 2.1 Account Deletion | 🟠 High | ⬜ Not Started | | +2 weeks |
| 2.2 Data Export | 🟠 High | ⬜ Not Started | | +2 weeks |
| 2.3 Consent Tracking | 🟠 High | ⬜ Not Started | | +2 weeks |
| 2.4 Timing Attack Fix | 🟠 High | ⬜ Not Started | | +2 weeks |
| 2.5 Cookie Consent | 🟠 High | ⬜ Not Started | | +2 weeks |
| 3.1 Algolia Validation | 🟡 Medium | ⬜ Not Started | | +1 month |
| 3.2 Log Sanitization | 🟡 Medium | ⬜ Not Started | | +1 month |
| 3.3 Email Privacy | 🟡 Medium | ⬜ Not Started | | +1 month |
| 4.1 Dependency Audits | 🟢 Ongoing | ⬜ Not Started | | Weekly |
| 4.2 Security Monitoring | 🟢 Ongoing | ⬜ Not Started | | Continuous |
| 4.3 Pen Testing | 🟢 Ongoing | ⬜ Not Started | | Pre-release |
