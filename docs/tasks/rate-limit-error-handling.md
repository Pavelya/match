# Rate Limit Error Handling - Implementation Plan

**Created:** December 30, 2025  
**Status:** Planning  
**Priority:** 🟠 High  
**Reference:** SEC_tasks.md (Task 1.1 - Rate Limiting)

---

## Problem Statement

When users trigger rate limiting through repeated login/logout cycles or rapid authentication attempts:

1. **Current behavior:** The system returns a technical error with JSON payload exposing internal details:
   ```json
   {
     "error": "Too many requests",
     "message": "Rate limit exceeded. Please try again later.",
     "retryAfter": 10
   }
   ```

2. **Impact:** Users see a raw technical error page instead of remaining on the login page with a friendly message.

3. **Security concern:** Technical error responses may expose implementation details.

---

## Current Architecture Analysis

### Rate Limiting Implementation

**Location:** `lib/rate-limit.ts`

- Uses Upstash Rate Limit with Redis backend
- Auth endpoints: 5 requests per 10 seconds per IP
- Returns 429 status with JSON body when limit exceeded
- Includes `X-RateLimit-*` headers

### Auth Routes Protection

**Location:** `app/api/auth/[...nextauth]/route.ts`

```typescript
export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request.headers)
  const rateLimitResponse = await applyRateLimit('auth', clientIp)
  if (rateLimitResponse) {
    return rateLimitResponse  // Returns 429 JSON response
  }
  return handlers.POST(request)
}
```

### Sign-In Flow

**Location:** `app/auth/signin/page.tsx`

```typescript
const handleMagicLink = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  await signIn('resend', { email, callbackUrl: '/student' })
  // No error handling for rate limit responses
}
```

### Error Page

**Location:** `app/auth/error/page.tsx`

Only handles NextAuth-specific errors:
- `Configuration`
- `AccessDenied`
- `Verification`
- `Default`

Does NOT handle:
- `RateLimit` / `TooManyRequests`
- Generic API errors

---

## Best Practices Research

Based on industry research for handling 429 errors in authentication flows:

1. **Server-side:**
   - Return 429 with `Retry-After` header ✅ (already implemented)
   - Include user-friendly message in response ✅ (already implemented)
   - Redact technical details in production

2. **Client-side:**
   - Catch fetch/API errors explicitly
   - Display inline error on the same page (not redirect)
   - Show countdown timer when possible
   - Disable form temporarily to prevent spam clicks
   - Never expose technical details to users

3. **NextAuth Integration:**
   - Handle errors in `signIn()` callback using `redirect: false`
   - Check response status before proceeding
   - Map error codes to user-friendly messages

---

## Proposed Solution

### Approach

Keep users on the login page and display an inline error message. Do not redirect to error pages for rate limiting.

### User-Facing Messages

For rate limit errors, show:
> "Too many sign-in attempts. Please wait a moment and try again."

This message is:
- User-friendly (no technical jargon)
- Actionable (tells them to wait)
- Not alarming (doesn't suggest account issues)
- Secure (doesn't reveal implementation details)

---

## Tasks

### Task 1: Add Rate Limit Error Type to Auth Error Page

**Goal:** Extend the auth error page to handle rate limit errors gracefully if users are redirected there.

**Expected Outcome:**
- Add `RateLimit` and `TooManyRequests` to error messages map
- Display user-friendly message: "Too many sign-in attempts. Please wait a moment and try again."
- Include a "Try again" button that returns to sign-in page

**Files to modify:**
- `app/auth/error/page.tsx`

---

### Task 2: Update Sign-In Page to Handle Rate Limit Errors

**Goal:** Catch rate limit errors in the sign-in form and display inline error without page navigation.

**Expected Outcome:**
- Add `redirect: false` to `signIn()` calls to catch errors
- Implement try-catch around API calls
- Display error state inline on the form
- Keep user on the same page with error message visible
- Add loading state management for better UX

**Files to modify:**
- `app/auth/signin/page.tsx`

**Implementation approach:**
```typescript
const handleMagicLink = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  setError(null)
  
  try {
    const result = await signIn('resend', { 
      email, 
      callbackUrl: '/student',
      redirect: false 
    })
    
    if (result?.error) {
      // Handle auth-level errors
      setError('Unable to send magic link. Please try again.')
    } else if (result?.url) {
      // Redirect manually on success
      window.location.href = result.url
    }
  } catch (error) {
    // Handle network/rate limit errors
    setError('Too many sign-in attempts. Please wait a moment and try again.')
  } finally {
    setIsLoading(false)
  }
}
```

---

### Task 3: Update Coordinator Sign-In Page

**Goal:** Apply the same error handling pattern to the coordinator sign-in page.

**Expected Outcome:**
- Consistent error handling with student sign-in
- Inline error display for rate limits
- No exposure of technical details

**Files to modify:**
- `app/auth/coordinator/page.tsx`

---

### Task 4: Update Accept Student Invite Form

**Goal:** Apply error handling to the student invitation acceptance flow.

**Expected Outcome:**
- Handle rate limit errors during invitation acceptance
- Display user-friendly inline error
- Maintain form state to allow retry

**Files to modify:**
- `app/auth/accept-student-invite/[token]/AcceptStudentInviteForm.tsx`

---

### Task 5: Create Reusable Error Message Utility

**Goal:** Create a utility function to map error responses to user-friendly messages.

**Expected Outcome:**
- Centralized error message mapping
- Consistent messaging across all auth forms
- Easy to maintain and update

**Files to create:**
- `lib/auth/error-messages.ts`

**Implementation:**
```typescript
export const AUTH_ERROR_MESSAGES = {
  // Rate limiting
  rate_limit: 'Too many sign-in attempts. Please wait a moment and try again.',
  too_many_requests: 'Too many sign-in attempts. Please wait a moment and try again.',
  
  // Auth errors
  default: 'Something went wrong. Please try again.',
  verification: 'The sign-in link is no longer valid. It may have expired.',
  access_denied: 'You do not have permission to sign in.',
  
  // Network errors
  network: 'Unable to connect. Please check your internet connection and try again.',
}

export function getAuthErrorMessage(error: string | undefined): string {
  if (!error) return AUTH_ERROR_MESSAGES.default
  const key = error.toLowerCase().replace(/[^a-z_]/g, '_')
  return AUTH_ERROR_MESSAGES[key] || AUTH_ERROR_MESSAGES.default
}
```

---

### Task 6: Add Error Boundary for Auth Pages

**Goal:** Implement an error boundary to catch unexpected errors in auth flows.

**Expected Outcome:**
- Graceful fallback UI for unexpected errors
- No exposure of stack traces or technical details
- Logging of errors for debugging (server-side only)

**Files to create:**
- `app/auth/error-boundary.tsx`

---

### Task 7: Integration Testing

**Goal:** Verify all changes work correctly and rate limits are not affected.

**Expected Outcome:**
- Rate limiting still works (5 req/10s for auth)
- 429 responses are caught and handled
- User sees friendly error message
- User stays on login page
- Form can be retried after waiting
- No technical details exposed in UI

**Testing steps:**
1. Rapidly click "Send magic link" 6+ times
2. Verify rate limit is triggered
3. Confirm user stays on sign-in page
4. Confirm error message is user-friendly
5. Wait 10 seconds, retry, confirm success
6. Repeat for coordinator sign-in
7. Repeat for student invite acceptance

---

## Summary Checklist

| # | Task | Priority | Complexity |
|---|------|----------|------------|
| 1 | Add RateLimit error type to auth error page | High | Low |
| 2 | Update sign-in page error handling | High | Medium |
| 3 | Update coordinator sign-in page | High | Medium |
| 4 | Update accept student invite form | Medium | Low |
| 5 | Create error message utility | Medium | Low |
| 6 | Add error boundary for auth pages | Low | Medium |
| 7 | Integration testing | High | Low |

---

## Non-Goals (Out of Scope)

- Changing rate limit thresholds (current 5 req/10s remains)
- Implementing countdown timers (nice-to-have, not required)
- Changing the 429 JSON response structure (backward compatibility)
- Adding rate limit bypass for specific users

---

## Verification Checklist

After implementation, verify:

- [ ] Rate limiting still functions correctly
- [ ] Login functionality is not broken
- [ ] Users see friendly error messages
- [ ] No technical details exposed in UI
- [ ] Error messages are consistent across all auth pages
- [ ] Forms can be retried after rate limit expires
- [ ] No console errors or warnings in production build

---

## Related Documents

- [SEC_tasks.md](./SEC_tasks.md) - Security implementation tasks
- [DOC_3_technical-architecture.md](../product/DOC_3_technical-architecture.md) - Technical architecture
