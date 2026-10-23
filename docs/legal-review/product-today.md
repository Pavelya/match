# What IB Match does with data today

MAINT 7.4, step 1. Read from the code on `main` (3015e28) and from the live site on 22–23 October 2026.
Every line says where it comes from, so the drafts can be checked against it.

## 1. Data by role

| Data | Whose | Where it lives | Who can see it | Gone when |
|---|---|---|---|---|
| Email, name (optional), Google profile picture link | Everyone | `User` (Supabase) | The person, admins; a student's also their linked school's coordinators | Account deleted |
| Google's sign-in tokens | Google sign-ins | `Account` (`access_token`, `id_token`, `refresh_token` columns, Auth.js adapter) | Admins with database access | Account deleted |
| IB courses, levels, grades, TOK and EE, total points | Student | `StudentProfile`, `StudentCourse` | The student; linked school's coordinators; admins | Account deleted |
| Preferred fields and countries, "open to anywhere" | Student | `StudentProfile` joins | Same | Account deleted |
| Shortlist | Student | `SavedProgram` | Same | Account deleted |
| School link, consent date and version | Student | `StudentProfile.schoolId`, `coordinatorAccessConsentAt`, `...Version`, `linkedByInvitation` | Same | Unlink clears the link and the consent; account deletion removes it |
| Accepted Terms and Privacy versions and dates | Everyone | `User.termsVersion`, `termsAcceptedAt`, `privacyPolicyVersion`, `privacyAcceptedAt` | The person; admins | Account deleted |
| Invitations: sender, invitee email, student name, role, status, dates | Coordinators and invited students | `Invitation` | Sender's school; admins | **Not deleted by anything except a student's own account deletion** (see 4) |
| Support tickets: category, subject, message, reply | Anyone signed in | `SupportTicket` | The person; admins | Account deleted |
| School name, city, email, phone, logo, Stripe customer and subscription IDs | School | `IBSchool` | Coordinators of that school; admins | School deleted by an admin, only once it has no coordinators or students |
| Sign-in link tokens | Everyone | `VerificationToken` | Nobody | Used, or expired after 10 minutes (`lib/auth/sign-in-link.ts`) |
| Cached match results | Student | Upstash Redis, key `matches:{studentId}:…`, 30-minute TTL (`lib/matching/cache.ts`) | The app | Expires; cleared on account deletion |
| Rate-limit counters | Visitor (IP) or account (ID) | Upstash Redis, `ratelimit:*`, with `analytics: true` (`lib/rate-limit.ts`). The owner's Data Browser screenshot shows `ratelimit:api:events:<hour>` sorted sets holding `{"identifier":"<a user ID>","success":true}`, **TTL: No**, one from 30 August 2026 | The app, the Upstash console | The counters end with their window. **The analytics events never expire**: user IDs (the `api` limiter) stay until deleted, and so would the IP addresses of the `search` and `auth` limiters (not seen in the screenshot) |
| Search words | Visitor | Sent to Algolia, whose Search API logs keep them 90 days in its France cluster with **our server's address, not the visitor's** (no `userToken`, no forwarded IP) and whose Search Analytics is on; written to the server log by `logger.info('program_search', { query … })` (`lib/algolia/search.ts`) and `explore_search` (`lib/explore/search.ts`), with no user ID | Vercel log viewer | Log retention (the Vercel plan's) |

**No analytics anywhere.** No analytics package is a dependency, the Content-Security-Policy allows
scripts only from `'self'` and `connect-src 'self'` (`next.config.ts`; the live headers match), and the live home
page loads nothing from another host. Algolia and Upstash are called from the server, never the browser.

**University agents.** The `UniversityAgentProfile` table and an admin list exist
(`app/admin/agents/page.tsx`). There is no agent sign-up (the admin invite route accepts only
`COORDINATOR`: `app/api/admin/invite/route.ts:68`), no agent dashboard (`proxy.ts` calls it a
"placeholder until agent dashboard exists"), and no code that shows an agent anything. The Terms
(2, 5.3, 6.1) and the Privacy Policy (4.2, 3) describe features that do not exist.

## 2. Consent flows

| Flow | What it does | Code |
|---|---|---|
| Sign-in line | "By continuing, you agree to our Terms of Service and Privacy Policy" under both sign-in forms. A **new** account's first sign-in records the published version labels and the time (`events.signIn`, `isNewUser` only). An existing account's sign-in records nothing | `components/sign-in/AuthPage.tsx` (`ConsentLine`), `app/auth/signin/SignIn.tsx`, `lib/auth/config.ts` |
| Student invitation, new account | A box lists what coordinators can see; a checkbox must be ticked; accepting creates the account, links the school and records consent. It stores the constant `'2025-12-14'` as the Terms and Privacy version and as the coordinator-access consent version, which is no published label | `app/auth/accept-student-invite/[token]/AcceptStudentInviteForm.tsx`, `app/api/auth/accept-student-invite/route.ts` |
| Student invitation, existing account | The same box, with "You can unlink at any time in Settings." Stores `'2025-12-14'` as the coordinator-access consent version | `components/invitation/parts.tsx`, `app/api/students/invitations/accept/route.ts` |
| Coordinator invitation | "By accepting, you agree to our Terms of Service and Privacy Policy" | `components/auth/AcceptInviteForm.tsx` |
| Policy update banner | Every signed-in user whose stored label differs from the published label (compared exactly, ignoring case and spaces) sees "We've updated our policies"; "I accept the updated policies" records the current labels for both documents. **It appears the moment a version is published; the effective date a publisher picks (now, or a later date) changes only the date shown on the page** | `components/shared/ReconsentChecker.tsx`, `lib/legal-documents/consent.ts`, `components/site/PolicyNotice.tsx`, `components/admin/legal-content/PublishConfirmModal.tsx` |
| Cookie banner | "Accept all" and "Essential only" both store a choice; "Customize" shows four rows (Essential: always on; the others: "Not used") and has **no switches**, in today's banner and the new one | `components/shared/CookieConsentBanner.tsx`, `components/site/CookieBanner.tsx`, `lib/cookie-consent.ts` |

Two things found here that the legal pages do not cause but a publication will meet:

- A student who joins by invitation is stored with `'2025-12-14'`, which is never a published label,
  so they are shown "We've updated our policies" on their first visit, minutes after agreeing. The same
  will happen after every publication, as for everyone else; today it happens at once.
- `/api/students/consent` (`app/api/students/consent/route.ts`) is called by nothing. If it were
  called it would record `'2025-12-09'`. It can go in a later cleanup.

## 3. What the browser keeps

Observed on the live site, 23 October 2026, with a request to `/`, then `/api/auth/csrf`, then the
start of a Google sign-in (no account was signed in or created):

| Name | Set | Lifetime | Source |
|---|---|---|---|
| `__Host-authjs.csrf-token` | The first page a visitor loads | Browser session | Live `Set-Cookie` on `/` |
| `__Secure-authjs.callback-url` | The first page a visitor loads | Browser session | Live `Set-Cookie` on `/` |
| `__Secure-authjs.pkce.code_verifier` | Starting "Continue with Google" | 15 minutes (`Max-Age=900`) | Live `Set-Cookie` on the redirect to Google |
| `__Secure-authjs.session-token` | After signing in | 30 days (`session.maxAge` in `lib/auth/config.ts`) | Config, not observed |
| `cookie-consent` (cookie and `localStorage`) | Choosing in the banner | Cookie: 1 year; `localStorage`: no expiry | `lib/cookie-consent.ts` |
| `ibm-theme` (`localStorage`) | The student picks a theme | No expiry | `lib/theme.ts`; new design only |
| `shortlist-count` (`localStorage`) | A signed-in student's visit | No expiry; removed on account deletion | `lib/shortlist/count.ts`; new design only |

The names are Auth.js v5's (`authjs.*`), not v4's (`next-auth.*`). The Google sign-in redirect asks for
`scope=openid profile email` only. No third-party script or font loads: `next/font` self-hosts Geist, the
flag polyfill's font is `/fonts/TwemojiCountryFlags.woff2`, and the only other host the browser
contacts is `lh3.googleusercontent.com` for a Google profile picture (`img-src` in the CSP).

## 4. Deleting and exporting

**A student deleting their account** (Settings → Delete account → `DELETE /api/students/account/delete`)
runs `deleteStudentAccount` in one transaction: saved programs, courses, profile; support tickets;
sessions and Google/email `Account` rows; sign-in link tokens for their address; every `STUDENT` invitation
sent to their address, from any school and in any status; then the `User`. A failure deletes nothing.
Afterwards, and without holding up the answer, it sends "Account deleted" and clears the student's cached
matches. An admin deleting a student runs the same function (`app/api/admin/students/[id]/route.ts`).

**Not covered by the above:**

- **Coordinators.** The portal's "Request Data Deletion" page is a placeholder ("Data Deletion Coming
  Soon… Contact support", `app/coordinator/settings/delete-request/page.tsx`). The admin's delete button
  (`app/api/admin/coordinators/[id]/route.ts`) calls `prisma.user.delete`; `Invitation.invitedBy` has no
  `onDelete`, so Prisma restricts the delete while that coordinator has sent any invitation, which is why
  `scripts/cleanup-user-invitations.sql` exists. This has not been run against production. A school
  can only be deleted once it has no coordinators and no students (`app/api/admin/schools/[id]/route.ts`).
- **Invitation records.** Nothing deletes them on a schedule: there is no Vercel cron and no job in the
  repo, and "decline" sets `CANCELLED` (`app/api/students/invitations/decline/route.ts`). The Privacy
  Policy's "deleted after 90 days" is not true.
- **Backups, logs, email logs.** Not under the app's control: see `providers.md`.

**The data export** (Settings → Download your data → `GET /api/students/account/export`) returns
account, academic profile, preferences and saved programs as JSON. It leaves out the consent records,
support tickets and invitations. Coordinators have no export of their own data.

## 5. Emails

Seven, all through Resend, none marketing: magic link, coordinator magic link, student invitation,
coordinator invitation, ticket created, ticket resolved, account deleted (`emails/`,
`lib/email/`, and Auth.js's `sendVerificationRequest` in `lib/auth/config.ts`, which posts to
`https://api.resend.com/emails`). Today's seven (`components/email/legacy/`) link to `/terms` as
"Terms And Conditions"; the new layout (`components/email/EmailLayout.tsx`) says "Terms of Service" and
"Privacy Policy", and switches in at release (rebranding 4.7). `lib/email/support-tickets.ts` logs the
recipient's address unredacted on a send; `lib/email/account-emails.ts` redacts it.

## 6. What a school's coordinators see and do

A linked student's name, email, academic profile, matches and saved programs
(`app/api/coordinator/students/route.ts`, `…/[id]/route.ts`). Only schools with full access (VIP, or
Regular with an active subscription) can edit student data, invite coordinators, see advanced analytics
or export the list as CSV (`lib/auth/access-control.ts`); a free school links up to 10 students
(`FREEMIUM_MAX_STUDENTS`). A student links only by accepting an invitation (`schoolId` is set nowhere else
in the student routes) and can unlink in Settings, which clears the link and the consent at once
(`app/api/students/school/unlink/route.ts`).
