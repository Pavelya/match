# Security Tasks

**Rewritten:** 27 October 2026, from a security audit of the code on `main` (`22aab89`) ahead of the
rebranding's release day (`REBRANDING_tasks.md` R.1) · **Replaces:** the list of 9 December 2025,
whose tasks are all done ([Done before this audit](#done-before-this-audit))

**How to use this.** [Start here](#start-here) says which task to run next. Each task below is written
for a **fresh AI session with no memory of this audit**: it names the finding, the files to read, the
steps, the tests, and what done looks like. Read the
[standing context in `MAINT_tasks.md`](MAINT_tasks.md#standing-context) first. Its rules on the
production database and on cost apply to every task here.

---

## Start here

**One task per session, one branch, one pull request**, branched from `origin/main`, CI green, merged
by the owner before the next starts. Branch names are given in each task. Never commit to `main`:
merging deploys to production.

**When a task is finished**, the session that finishes it updates this section in the same pull
request: move its row to [Done](#done), with the date and one line on what it did, and mark its
heading **done**. A finding from a session becomes a new task and a row here, not a note.

### Before release day — start now

SEC-1 and SEC-2 are done (27 October 2026, #204 and #205). Next is SEC-3.

| Order | Task | Priority | Size | Who |
|---|---|---|---|---|
| 3 | [SEC-3 — Escape the structured data on program pages](#sec-3--escape-the-structured-data-on-program-pages) | P1 | small | session |

### On release day (R.1)

| Task | Priority | Size | Who |
|---|---|---|---|
| [SEC-4 — Release-day security checklist](#sec-4--release-day-security-checklist) | P1 | small | owner |

### After release — within a few weeks

| Order | Task | Priority | Size | Who |
|---|---|---|---|---|
| 4 | [SEC-5 — Give the same answer for every email address](#sec-5--give-the-same-answer-for-every-email-address) | P2 | small | session, after the owner approves the words |
| 5 | [SEC-6 — End a session when its account is deleted](#sec-6--end-a-session-when-its-account-is-deleted) | P2 | small (Part A), medium (Part B) | session |
| 6 | [SEC-7 — Limits at the edge, and usage alerts](#sec-7--limits-at-the-edge-and-usage-alerts) | P2 | small | owner, then a short session |

### When convenient

| Order | Task | Priority | Size | Who |
|---|---|---|---|---|
| 7 | [SEC-8 — Small hardening batch](#sec-8--small-hardening-batch) | P3 | small | session |
| 8 | [SEC-9 — CI permissions and the dependency watch](#sec-9--ci-permissions-and-the-dependency-watch) | P3 | small | session, then owner settings |
| 9 | [SEC-10 — Admin accounts and an audit trail](#sec-10--admin-accounts-and-an-audit-trail) | P3 | owner decision first | owner, then maybe a session |

### Done

| Task | Done | What it did |
|---|---|---|
| [SEC-1](#sec-1--check-access-on-every-admin-and-coordinator-page-not-only-in-the-layout--done) | 27 October 2026 | Every admin and coordinator page checks access first (`lib/auth/guards.ts`), and the proxy turns away the wrong role from both areas (#204). `app/page-guards.test.ts` fails for a page without its check |
| [SEC-2](#sec-2--limit-sign-in-emails-per-address-and-let-a-classroom-sign-in--done) | 27 October 2026 | A sign-in email meets `signInIp` (60 an hour) and `signInAddress` (3 per 15 minutes, 10 a day), keyed by an HMAC of the address and failing closed; callbacks get `authCallback` (60 a minute per IP) (#205). The cards' existing "wait a moment" covers a refusal |

### Priorities

- **P0:** exposes personal data to anyone, today. Fix before anything else.
- **P1:** must be merged before release day. Release brings new visitors and schools signing up whole
  classes, which is when these would bite.
- **P2:** within a few weeks of release.
- **P3:** hardening. No known way to exploit it today.

---

## The audit, 27 October 2026

**Scope:** every route handler (70), the proxy, the auth configuration, every page under `app/admin`,
`app/coordinator` and `app/student`, the inline scripts, uploads, the rate limiter, environment
handling, CI, the dependency audit and the git history. It covered the work in `MAINT_tasks.md`,
`CONTENT_tasks.md` and `REBRANDING_tasks.md` since September, including the new design behind the
preview switch, which goes to everyone on release day.

### What was found

| Task | Finding | Where |
|---|---|---|
| SEC-1 | The 30 admin pages check nothing themselves. The layout's `redirect()` does not stop a page from rendering, so the page's data is sent in the body of the redirect, to anyone. The 15 coordinator pages don't check a revoked coordinator, so one still reads their school's students | `app/admin/layout.tsx:11-26`, `app/coordinator/layout.tsx:70`, `proxy.ts` |
| SEC-2 | Anyone can send sign-in emails to any address, 30 a minute from one IP. Resend's Free plan sends 100 a day, so one loop stops email sign-in for everyone until the next day. And a classroom behind one school IP shares the 5-per-10-seconds bucket, callbacks included, although the comment says callbacks are exempt | `app/api/auth/[...nextauth]/route.ts:22`, `lib/rate-limit.ts:31` |
| SEC-3 | Program pages write their JSON-LD with bare `JSON.stringify`, so `</script>` in a program's text would end the tag and run as script. The CSP allows inline scripts | `app/programs/[id]/page.tsx:298` |
| SEC-4 | The preview key outlives its purpose at release, and preview deployments run against the production database | `lib/new-ui.ts`, Vercel settings |
| SEC-5 | `/api/auth/check-role` tells anyone whether an address has a student account | `app/api/auth/check-role/route.ts:39` |
| SEC-6 | A deleted account's session keeps working as a student for up to 30 days, and no session can be revoked | `lib/auth/config.ts:128` |
| SEC-7 | Every limit lives in Upstash and fails open, and nothing counts requests before the app | `lib/rate-limit.ts:154` |
| SEC-8 | No `server-only` guard on the modules that hold secrets; a GET that flushes caches; uploads stored with whatever content type the data URL claims; an unused `NEXT_PUBLIC_` key in the schema | see the task |
| SEC-9 | CI's token has the repository's default permissions; nothing watches for new advisories between sessions | `.github/workflows/ci.yml` |
| SEC-10 | Every student's data is behind admin accounts that have one factor, the mailbox. Admin actions leave no record beyond Vercel's short log retention | `lib/auth/config.ts` |

### What was checked and holds

- **API routes.** All 70 handlers check the session, the role from the database (not the token) and
  ownership, with a rate limit on all but the Stripe webhook. 7.1 Part 3's tests check every route's
  gate by kind. Coordinator routes are scoped to the coordinator's school, check the student's consent,
  and refuse a revoked coordinator (5.36). Student routes are scoped to `session.user.id`.
- **Invitations.** Tokens are 32 random bytes and expire after 7 days. An existing student can accept
  only an invitation sent to their own address. Addresses are lowercased everywhere.
- **Stripe webhook.** A signature is required in production, and the route asks Stripe for the current
  state of the subscription rather than trusting the event (5.34).
- **Redirects.** `returnPath` (`lib/auth/callback-url.ts`) refuses absolute, protocol-relative,
  backslash and control-character paths. Auth.js's `redirect` callback keeps the same origin.
- **Search filters.** Algolia filter strings are built from validated ids and truncated numbers only,
  in both today's search and Explore (`lib/algolia/search.ts`, `lib/explore/filters.ts`).
- **Other inline scripts.** The theme and season scripts escape `<` (`lib/seasons/pick.ts:70`), and a
  `?season=` value must be a known key. The legal pages render Markdown with `react-markdown` 10,
  which allows no raw HTML and drops `javascript:` links.
- **Preview switch.** The key is compared in constant time, and a wrong key or no key is a 404.
- **CSRF.** Auth.js cookies are `SameSite=Lax`, the API takes JSON through `fetch`, and the only server
  action is sign-out, which Next checks by Origin. The only GET with a side effect is in SEC-8.
- **Database.** Row Level Security is on for every table, and the Data API is off (5.37). Prisma
  parameterises every query, and the app has no raw SQL.
- **Headers.** CSP, HSTS, `X-Frame-Options`, `nosniff`, Referrer-Policy and Permissions-Policy are set
  on every path (`next.config.ts`). The CSP keeps `'unsafe-inline'` for scripts on purpose (see
  [Considered, not doing now](#considered-not-doing-now)).
- **Logs.** The logger redacts emails, tokens and the fields named like ids, and the routes redact
  addresses by hand as well.
- **Dependencies.** `npm audit` found 0 vulnerabilities on 27 October 2026 (6.9). `strict-allow-scripts`
  is on (6.7).
- **Git history.** Searched on 27 October 2026 for Stripe, Resend, Google, AWS and JWT keys, and for
  Postgres URLs with passwords. Every hit is a placeholder or a test stub. No `.env` was ever
  committed, only `.env.example`.

---

## SEC-1 — Check access on every admin and coordinator page, not only in the layout — **done**

**Priority:** P0, now · **Size:** medium · **Branch:** `fix/sec-1-page-guards`

**Goal:** no admin or coordinator page renders anything for a visitor who isn't allowed to see it,
whatever the request looks like.

### The finding

`app/admin/layout.tsx` checks the session and the `PLATFORM_ADMIN` role, then calls `redirect()`.
None of the 30 pages under `app/admin` checks anything itself, and 25 of them read the database. For
example, `app/admin/students/page.tsx` reads every student's name and email. `proxy.ts` protects
`/student` only.

Next renders a page at the same time as its layout. A `redirect()` thrown in the layout changes the
status to 307, but the page still runs, and its output is streamed in the body of that response.
Next's own guide says so, in `node_modules/next/dist/docs/01-app/02-guides/authentication.md`,
"Layouts and auth checks": *"A layout also does not control whether the rest of the route renders."*

**Reproduced on 27 October 2026** in a minimal app built with the installed `next` 16.4.3: a layout
that redirects, and a page that returns a marker string.

| Request | Answer |
|---|---|
| `curl /admin/b`, no cookie | 307 to `/`, **with the page's text in the body** |
| The same, with the page 800 ms slower than the redirect | the same: the text is still there |
| `RSC: 1` | 200, with the page's text in the payload |
| `RSC: 1` and a `Next-Router-State-Tree` claiming the layout is already loaded | 200, the page's text, and the layout never runs |

This was not tried against production, because it would read real students' data. Run step 6's
first check on `main` locally to see the real app do the same.

**Coordinator pages.** All 15 check the session and look up the coordinator's profile, so they only
show their own school. But only the layout checks the role and `isActive`, and for a revoked
coordinator it shows the "access revoked" screen *instead of* `{children}` (`app/coordinator/layout.tsx:70`).
That doesn't stop the page from rendering either, so a revoked coordinator can still read their
school's students through the pages. 5.36 closed the API routes only.

### Read first

- `node_modules/next/dist/docs/01-app/02-guides/authentication.md`: "Layouts and auth checks",
  "Creating a Data Access Layer", and the proxy section
- `app/admin/layout.tsx`, `app/coordinator/layout.tsx`, `app/coordinator/layout.test.ts`
- `proxy.ts`, `lib/auth/config.ts` (the `jwt` callback and `ROLE_REFRESH_MS`), `lib/auth/callback-url.ts`
- Two pages of each kind: `app/admin/students/page.tsx`, `app/admin/support/[id]/page.tsx`,
  `app/coordinator/students/page.tsx`, `app/coordinator/students/[id]/page.tsx`

### Steps

1. **`lib/auth/guards.ts`** (`import 'server-only'`), each wrapped in React's `cache()`, so a
   layout and a page in the same request share one read:
   - `requireAdmin()`: no session → `redirect('/auth/signin')`; the role read from the database is not
     `PLATFORM_ADMIN` → `redirect('/')`. Returns `{ id, name, email, image }`, which the layout shows
     today.
   - `requireCoordinator()`: no session → `redirect(COORDINATOR_SIGN_IN_PATH)` (5.26); the role is not
     `COORDINATOR`, or there is no profile or school → `redirect('/')`; the profile is not active →
     `notFound()`. Returns the user, the profile id and the school (`id`, `name`, `subscriptionTier`,
     `subscriptionStatus`). `notFound()` only stops the page: the layout keeps showing today's revoked
     screen, so nothing changes on screen. Keep the layout's revoked branch, and have it call a
     variant that returns the inactive profile rather than throwing.
2. **Every `page.tsx` under `app/admin` and `app/coordinator`** calls its guard on its first line,
   before any read, including the pages that read nothing today. Do the same in any
   `generateMetadata` in those segments that reads data. Coordinator pages take the school from the
   guard and drop their own `coordinatorProfile.findFirst`. That removes a read; it adds none. Both
   layouts call the same guard instead of their own query.
3. **`proxy.ts`** becomes the first, quick layer, before anything renders. A signed-out visitor to
   `/admin/*` goes to `/auth/signin`, and to `/coordinator/*` goes to `COORDINATOR_SIGN_IN_PATH`, both
   with `callbackUrl` as `/student` has today. A role in the token that doesn't match goes to `/`. The
   token's role can be up to 5 minutes old (`ROLE_REFRESH_MS`), which is why step 2 stays: the
   database check is the real one. The matcher already covers these paths, and `auth()` there already
   runs, so this adds no read.
4. **No change on screen** for admins and active coordinators, in either design.

### Tests (Vitest)

- `lib/auth/guards.test.ts`, with `@/lib/auth/config`, `@/lib/prisma` and `next/navigation` mocked
  as in `app/coordinator/layout.test.ts`: no session; a student; an admin (returned); a coordinator
  with no school; an inactive coordinator (`notFound`); a role in the token that differs from the
  database's (the database wins).
- `app/page-guards.test.ts`: walks every `page.tsx` and `layout.tsx` under `app/admin` and
  `app/coordinator` and fails for any file that doesn't call `await requireAdmin()` or
  `await requireCoordinator()`. This is what stops the next new page from repeating the bug.
- `proxy.test.ts`: signed out on `/admin/students` → 307 to `/auth/signin`; a student token on
  `/admin/students` → `/`; an admin → passes; signed out on `/coordinator/students` → the coordinator
  sign-in; `/student/*` unchanged; a signed-in visitor on `/auth/signin` still redirected as today.
- **Break check:** delete the guard from one page and confirm `page-guards.test.ts` fails, then
  restore that one file with `git checkout -- <file>`, never a directory.

### Verify by hand: a throwaway local Postgres, never production

Use the wrapper from earlier sessions: local `DATABASE_URL`/`DIRECT_URL`, refusing any URL that
contains `supabase`, dummy auth and Algolia values, a dead Upstash URL (the limiter fails open), and
`AUTH_TRUST_HOST=true`. Apply the migrations with `prisma migrate deploy`. Create one student with a
known address, one admin, and one coordinator with `isActive = false`. Mint session cookies with
`encode()` from `next-auth/jwt`, salt `authjs.session-token`. Then `npm run build && npm start`.

1. **On `main` first**, to see the bug in the real app: `curl -s localhost:<port>/admin/students | grep -c <student address>`
   gives 1 or more. Note it in the pull request.
2. On the branch, each of these gives 0 matches:
   - no cookie: plain, with `-H 'RSC: 1'`, and with a crafted router state, followed with `-L` to get
     past the `_rsc` redirect. The state is
     `["",{"children":["admin",{"children":["dashboard",{"children":["__PAGE__",{}]}]}]}]`,
     URL-encoded, the Next 16 format checked by
     `node_modules/next/dist/server/app-render/types.js`;
   - the student's cookie, the same three ways;
   - the revoked coordinator's cookie on `/coordinator/students` and `/coordinator/students/<id>`.
3. The admin's cookie shows the students, and an active coordinator's shows their own school's
   students, in both designs (the preview cookie).

### Expected outcome

A visitor, a student or a revoked coordinator who requests any admin or coordinator URL, in any form,
gets a redirect or a 404 with no page data in the body. Admins and active coordinators see no change.
There are no new database reads, and the coordinator pages make one fewer.

### For the owner, outside the pull request

Whether anyone used this can't be proven either way: Vercel keeps runtime logs only briefly. The
session lists what the logs still show (`vercel logs`, or the dashboard: `/admin/*` and
`/coordinator/*` requests answered with a 307). Record the finding, the date of the fix and what the
logs showed. Then ask the lawyer reviewing 7.4 whether anything more is needed: the data is
students' names, addresses and grades, and many students are minors.

**Done when:** merged, the hand checks recorded in the pull request, and the row moved to Done.

---

## SEC-2 — Limit sign-in emails per address, and let a classroom sign in — **done**

**Priority:** P1, before release · **Size:** medium · **Branch:** `fix/sec-2-sign-in-limits`

**Goal:** no one can use the sign-in form to flood an address or spend the day's email quota, and a
class signing in together from one school network gets through.

### The finding

- **A flood.** `POST /api/auth/signin/resend` sends a sign-in email to any address it is given. The
  only limit is `auth`: 5 requests per 10 seconds per IP (`lib/rate-limit.ts:31`), so 30 a minute.
  Resend's Free plan sends 100 emails a day, shared with invitations, the account emails and 7.6's
  inactivity notices (`MAINT_tasks.md` 7.6). One loop from one machine spends a whole day's quota in
  under 4 minutes. Email sign-in then fails for every student and coordinator until the next day.
  The flood also lands in mailboxes that never asked, which hurts the sending domain's reputation.
- **Fails open.** If Upstash is down or over its quota, `checkRateLimit` lets everything through
  (`lib/rate-limit.ts:154`), so there is no limit at all.
- **A classroom.** Every `/api/auth/*` request from one IP shares the same 5-per-10-seconds bucket. The
  comment in `app/api/auth/[...nextauth]/route.ts` says callbacks are exempt, but
  `pathname.endsWith('/callback')` never matches `/api/auth/callback/google` or `/callback/resend`, so
  they are limited too. A school's students share one public IP, and a Google sign-in costs two or
  three of these requests. A class signing in together, which is what a coordinator's onboarding
  session looks like, gets 429s at the callback, a bare JSON page. For schools brings exactly those
  sessions after release.

### Read first

- `app/api/auth/[...nextauth]/route.ts`, `lib/rate-limit.ts` and its test, `lib/auth/config.ts`
  (`sendVerificationRequest`)
- `lib/auth/accept-student-invite.ts`: how a 429 and a failed `signIn('resend')` are shown today
- Both sign-in cards: `components/sign-in/`, and today's `app/auth/signin/`
- `MAINT_tasks.md` 5.28: the limiters keep no account IDs or addresses beyond their window

### Steps

1. **A limiter on the address**, for sign-in emails only: for example 3 per 15 minutes and 10 per day.
   The key is the SHA-256 of the trimmed, lowercased address, never the address itself (5.28). Apply
   it in the route's `POST` for `/api/auth/signin/resend`, before `handlers.POST`. Read `email` from
   `await request.clone().formData()`, since Auth.js posts a form. A refusal is a 429 like the
   others.
2. **A cap per IP on sign-in emails**: for example 60 an hour. That is loose enough for a classroom
   that asks for links together, and stops a single machine.
3. **Fail closed for these two limiters only.** When Redis can't answer, answer 503 and send nothing.
   Every other limiter keeps failing open, as today.
4. **Callbacks get their own looser limiter** per IP, for example 60 a minute, and the exemption list
   matches what it says: `/callback/` as a path segment, not `endsWith`. The `auth` limiter stays as
   it is for the other POSTs, and for `check-role` and the two accept routes.
5. **What the student sees.** Check what both designs' sign-in cards show when `signIn('resend')` gets
   a 429 or a 503. If it doesn't already read as "wait a moment and try again", stop: new words go
   through a board first (`REBRANDING_tasks.md`), so add the case to the sign-in board rather than
   writing them here.
6. **Don't add a global daily ceiling.** It would fail the same students the flood fails. The answer
   to a flood spread over many IPs is SEC-7's edge rule and, if it ever happens, Resend's paid plan.

### Tests (Vitest)

New `app/api/auth/[...nextauth]/route.test.ts`, with `handlers` and the limiters mocked:

- the fourth email to one address within 15 minutes → 429, and `handlers.POST` not called;
- `Maya@Example.com ` and `maya@example.com` count as one address;
- the identifier given to the address limiter is 64 hex characters, not the address;
- a Redis error → 503 for a sign-in email, and still passes for a callback;
- `GET /api/auth/callback/google` uses the callback limiter, not `auth`;
- `/api/auth/session` and `/api/auth/csrf` are still not limited.

### Verify

`npm test` and the standard checks. Then on the pull request's Vercel preview, with the owner's own
address: ask for four links within a minute. Three arrive, the fourth is refused with the card's
message, and Resend's dashboard shows three sends.

### Expected outcome

One address gets at most 3 sign-in emails in 15 minutes and 10 a day, from any number of IPs. One
machine can't spend the day's quota. A class of 30 behind one IP completes Google sign-in. An Upstash
outage stops sign-in emails instead of unlimiting them.

**Load:** a few Upstash commands more per sign-in email request, and none elsewhere. No database reads.

---

## SEC-3 — Escape the structured data on program pages

**Priority:** P1, before release · **Size:** small · **Branch:** `fix/sec-3-json-ld`

**Goal:** no text from the database can end a `<script>` tag, on any page.

### The finding

`app/programs/[id]/page.tsx:298` writes `JSON.stringify(programJsonLd(program))` into a
`<script type="application/ld+json">`. `JSON.stringify` leaves `</script>` as it is. A program
name, description, university name or city containing `</script><script>…` would end the tag and
run as script on every visit to that page, and the CSP allows inline scripts (`'unsafe-inline'`,
`next.config.ts`), so nothing would stop it. That text comes from the admin forms and the bulk
upload, much of it pasted or drafted from university pages during the content refresh.
`serializeJsonLd` (`lib/utils.ts:40`) already escapes `<`. The university page and the breadcrumbs
use it, but 70 other places use bare `JSON.stringify`. Those hold fixed text today, but the next one
to take data from the database would repeat the bug.

### Steps

1. Replace every `__html: JSON.stringify(…)` with `serializeJsonLd(…)` in `app/` and `components/`.
   That includes the 23 country pages that R.2 deletes: it's mechanical, and they're live until then.
2. Add an ESLint `no-restricted-syntax` rule: `__html` inside `dangerouslySetInnerHTML` must not be a
   `JSON.stringify(…)` call, with a message pointing at `serializeJsonLd`. This is a code-quality
   rule, not a style rule, so it doesn't break the Prettier/ESLint split.

### Tests

- `lib/utils.test.ts`: `serializeJsonLd({ name: '</script><script>alert(1)</script>' })` contains no
  `<`, and `JSON.parse` of it gives back the same object. The same for `<!--`.
- A test of the program page's JSON-LD built from a program with that name.
- Break check: put one bare `JSON.stringify` back and confirm `npx eslint .` fails.

### Verify

For one program page and one guide, `curl` the page before and after, parse every
`application/ld+json` block, and compare: the objects are identical. A `<` in the data comes back as
`<` once parsed. R.1's Rich Results Test (step 6) covers the rest.

### Expected outcome

No `ld+json` block contains a `<`, the structured data is unchanged once parsed, and lint stops the
pattern coming back.

**Load:** none.

---

## SEC-4 — Release-day security checklist

**Priority:** P1, on release day · **Size:** small · **Who:** owner, in Vercel and a terminal. No
pull request. `REBRANDING_tasks.md` R.1 points here.

**Goal:** release day leaves nothing open that only made sense while the new design was hidden.

### Before setting `NEW_UI_FOR_EVERYONE`

1. SEC-1, SEC-2 and SEC-3 are merged.
2. `npm audit` on the release commit says 0 vulnerabilities. If not, run a session first, as in 6.9.
3. **Vercel → Settings → Deployment Protection:** preview deployments are protected (Vercel
   Authentication, or the plan's equivalent). Previews run this code against the production database,
   since there is no development database, so a preview URL must not be open to whoever finds it.
4. **Vercel → Environment Variables, Production:** `STRIPE_WEBHOOK_SECRET` is set (the webhook refuses
   every event without it), `INACTIVE_ACCOUNTS_ENABLED` is unset or `false` until the new Privacy Policy
   is published, and nothing named `NEXT_PUBLIC_` holds a secret.

### After the redeploy

5. **Delete `NEW_UI_PREVIEW_KEY`** in Production and Preview, and redeploy. Once everyone has the new
   design, the link only turns on Draft Mode, which renders every page on demand for that browser.
   That costs money and shows nothing new, and the link may have gone to students for feedback.
   `/api/preview?key=<old key>` then answers 404. R.2 deletes the routes.
6. **Headers:** `curl -sI https://<domain>/` and `curl -sI https://<domain>/programs/search` each list
   `content-security-policy`, `strict-transport-security`, `x-frame-options`, `x-content-type-options`,
   `referrer-policy` and `permissions-policy`.
7. **SEC-1 on production:** `curl -s https://<domain>/admin/students | grep -c @` gives 0, and so does
   the same with `-H 'RSC: 1'`. Neither reads any data once SEC-1 is in.

**Expected outcome:** the new design is live with no preview key, protected previews, the same headers
as before, and admin pages that answer a signed-out request with nothing.

---

## SEC-5 — Give the same answer for every email address

**Priority:** P2 · **Size:** small · **Branch:** `fix/sec-5-account-existence` · **Waits for:** the
owner's yes on the words in step 2

**Goal:** no unauthenticated request can find out whether an address has an account.

### The finding

`POST /api/auth/check-role` answers `{ isStudent: true | false }` for any address, signed in or not
(`app/api/auth/check-role/route.ts:39`). The only limit is per IP. Both coordinator sign-in cards
(`components/sign-in/CoordinatorSignInCard.tsx`, `app/auth/coordinator/CoordinatorSignIn.tsx`) use it
to point a student at the student sign-in. Whether an address belongs to a student is personal data,
and most students are minors: anyone can check a classmate or their own child. An earlier fix
stopped it naming the role, but not this.

The coordinators' invite route also tells a coordinator that an address is "already registered with a
different account type" (`app/api/coordinator/students/invite/route.ts:272`), which shows that the
address belongs to a coordinator or an admin. A coordinator has to be signed in to see it, so this is
minor.

### Steps

1. Delete `/api/auth/check-role` and its calls. The coordinator sign-in sends the link to whatever
   address is entered. `sendVerificationRequest` (`lib/auth/config.ts`) already chooses the student
   or the coordinator email by role, so a student who used the coordinator page gets the student
   email, and sign-in lands them in the right place.
2. **Words:** the cards lose the "use the student sign-in" message, and every address sees "Check your
   email". That changes what a screen shows, so the pull request description asks the owner to
   approve it (`ui-changes-follow-rebranding-gates`), or the case goes on the sign-in board first.
3. In the invite route, say "This address can't be invited" for an address that belongs to a
   coordinator or an admin, without naming the kind of account.

### Tests

- The coordinator cards send the link for a student's address and for an unknown one, with the same
  outcome.
- The invite route's message for a coordinator's address and for an admin's address is the same.
- `/api/auth/check-role` answers 404.

**Expected outcome:** the same answer for every address, account or not. **Load:** one database read
less per coordinator sign-in.

---

## SEC-6 — End a session when its account is deleted

**Priority:** P2, before 7.6's first deletions · **Size:** Part A small, Part B medium ·
**Branch:** `fix/sec-6-session-end` (Part A), `feat/sec-6-sign-out-everywhere` (Part B)

**Goal:** a deleted account holds no session, and an admin can end a person's sessions everywhere.

### The finding

When the `jwt` callback's 5-minute re-read finds no user, the token carries on with the role
`STUDENT` (`lib/auth/config.ts:128`), for up to 30 days. After release, accounts are deleted by
students, by admins, and by 7.6's inactivity deletion. A deleted account's cookie still passes every
`session?.user?.id` check. Most routes then find no profile and fail, and some fail with a 500 on a
foreign key. That is mostly noise, but a deleted account shouldn't be signed in at all.

Sessions are JWTs, so none can be revoked. A coordinator's cookie on a lost school laptop can only be
cut off by revoking the coordinator or changing their role.

### Part A — the account is gone, the session ends

1. In the `jwt` callback, when `readRoleAndMarkActive` returns null, end the session. Check in
   `node_modules/@auth/core` how this version ends one: returning `null` from `jwt` clears the cookie
   in v5. Confirm that before relying on it.
2. Tests in `lib/auth/config` (or a callback extracted to be testable): no user → the session ends; a
   user → as today.

### Part B — sign out everywhere (owner decides whether to build it)

1. `User.sessionsValidAfter DateTime?`, through a migration file and `prisma migrate deploy`. Selected
   in the same `findUnique` the callback already makes, so there is no new read. A token issued
   before it ends at the next re-read, within 5 minutes.
2. An admin action on the student's and the coordinator's admin pages: "Sign out everywhere". Admin
   pages are not part of the rebranding. Optionally, the same for a student on Settings, which needs
   a board.
3. Tests: a token older than `sessionsValidAfter` ends; a newer one passes.

**Expected outcome:** a deleted account is signed out within 5 minutes everywhere, and (Part B) any
person's sessions can be ended. **Load:** none. The read exists already.

---

## SEC-7 — Limits at the edge, and usage alerts

**Priority:** P2 · **Size:** small · **Who:** owner in the dashboards, then a short session for the
runbook · **Branch:** `docs/sec-7-flood-runbook`

**Goal:** a flood is stopped before it reaches the app's quotas, and the owner hears about it before
a service runs out.

### The finding

Every limit lives in Upstash and fails open (`lib/rate-limit.ts:154`). Each limited request costs
Redis commands, so a flood spends Upstash's quota, and then the limits switch off. The caches switch
off with them, which sends the reads to Supabase, where the 5 GB egress cap is what broke the images
before, and to Algolia. Nothing in front of the app counts requests. And no alert says that a quota is
nearly spent.

### Steps

1. **Owner, Vercel Firewall:** a per-IP rate-limit rule for `/api/auth/signin/*`, `/api/programs/*`
   and `/api/auth/check-role` (until SEC-5 deletes it), within what the plan includes. Learn where
   "Attack Challenge Mode" is switched on.
2. **Owner, alerts:** Upstash (daily commands), Algolia (searches; `scripts/algolia-usage.ts` reads
   it), Resend (sends per day), Supabase (egress), Vercel (usage). Use email alerts where the plan has
   them, or a weekly look otherwise.
3. **Session:** a "During a flood" section in this file: what to switch on (Attack Challenge Mode,
   `EXPLORE_BEST_FIT=off`), what to check first (Vercel's top paths and IPs, Resend's dashboard), and
   how to switch back.

**Expected outcome:** edge rules on the expensive paths, an alert on each quota, and a one-page
runbook. **Load:** none in the app.

---

## SEC-8 — Small hardening batch

**Priority:** P3 · **Size:** small: four trivial changes, one verification pass ·
**Branch:** `chore/sec-8-hardening`

**Goal:** close four small gaps, none exploitable today.

1. **`server-only` on the modules that hold secrets:** `lib/prisma.ts`, `lib/stripe/server.ts`,
   `lib/supabase/client.ts`, `lib/algolia/client.ts`, `lib/redis/client.ts`, `lib/email/client.ts`,
   and `lib/env.ts` if nothing outside the app imports it. Today a client file that imported one of
   these would get `undefined` for every secret, not the secret, because Next inlines only
   `NEXT_PUBLIC_` values. But nothing stops the import at build time. Watch for two traps: scripts run
   by `tsx`, and Vitest, both of which resolve without the `react-server` condition. `server-only`
   throws there, so mock it as `lib/new-ui.test.ts` does, and leave out any module a script imports
   (check `lib/prisma-standalone.ts`).
2. **No GET on `/api/admin/cache/invalidate`** (`route.ts:24`). It changes state, and `SameSite=Lax`
   sends the cookie on a top-level GET from another site, so a link can make a signed-in admin flush
   every reference cache, which then refills from the database. Check that the admin page calls POST.
3. **Uploads take images only.** `uploadUniversityImage` (`lib/supabase/storage.ts:25-28`) stores the
   file with whatever content type the data URL claims, `text/html` included, in a public bucket.
   Allow `image/jpeg`, `image/png`, `image/webp` and `image/avif` only (no SVG), check the first bytes
   match, and cap the decoded size at 5 MB. Do the same for the school logo path (5.11).
   **Owner:** set the same allowed types and size limit on the buckets in Supabase.
4. **Drop `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY`** from `lib/env.ts`. Nothing uses it, and a `NEXT_PUBLIC_`
   value goes into the browser bundle the moment a client file mentions it. **Owner:** delete it in
   Vercel.

### Tests

- Storage: `data:text/html;base64,…` refused; `data:image/svg+xml;…` refused; a PNG with a `.jpg`
  claim refused; an oversized image refused; a PNG accepted.
- Cache route: GET → 405, POST as today.
- `npm run build` passes with the `server-only` imports.

**Expected outcome:** the four changes, with no difference to any page. **Load:** none.

---

## SEC-9 — CI permissions and the dependency watch

**Priority:** P3 · **Size:** small · **Branch:** `ci/sec-9-permissions-and-watch`

**Goal:** CI runs with the least it needs, and a new advisory is noticed within a week, not at the
next upgrade session.

1. `.github/workflows/ci.yml`: add `permissions: contents: read` at the top. Today the token gets the
   repository's default, which may be write.
2. `.github/dependabot.yml` for `npm` and `github-actions`: weekly, security updates only, a small
   limit on open pull requests. One package per pull request already fits the rule "never two
   dependency upgrades in one session".
3. A scheduled weekly workflow running `npm audit --audit-level=high`. Scheduled rather than on pull
   requests, so a newly published advisory doesn't block unrelated work. A failure is the signal to
   run a session like 6.9.
4. **Owner, GitHub settings:** Dependabot alerts on, and secret scanning with push protection if the
   plan offers it for this repository.

**Verify:** CI green on the pull request, and the scheduled workflow run once by hand
(`workflow_dispatch`). **Expected outcome:** a read-only CI token, and weekly advisory checks. **Load:**
none.

---

## SEC-10 — Admin accounts and an audit trail

**Priority:** P3 · **Who:** owner decision first; then perhaps a session,
`feat/sec-10-admin-audit`

**Goal:** an admin account is as hard to take over as the data it opens, and admin actions leave a
record.

### The finding

- `PLATFORM_ADMIN` opens every student's name, address and grades. Admins sign in by magic link or
  Google, so the mailbox is the only factor.
- Deleting students and coordinators, publishing the legal documents, revoking coordinators and
  deleting inactive accounts are recorded only in Vercel's logs, which are kept briefly. January's
  DATA-04 asked for this and is still open.

### For the owner to decide

1. 2-step verification on every admin's mailbox: the owner's settings, no code. Count the admin
   accounts with a `count()` where `role = 'PLATFORM_ADMIN'`, and confirm the number is the expected
   one.
2. Whether admins sign in **only with Google**. In code, that is the `signIn` callback refusing the
   email provider for an admin.
3. Whether to keep an **audit trail**: an `AdminAction` table (who, what, the target's id, when),
   written by each admin mutation. That is a few writes per admin action and no reads on any student
   path. If yes, a session builds it, with a test per mutating admin route that a row is written.

**Expected outcome:** a recorded decision on each of the three, and the work it asks for.

---

## Considered, not doing now

- **A CSP without `'unsafe-inline'` for scripts.** It needs a nonce per request, which makes every page
  dynamic: against the rule that the `study-in-*` pages stay static, and a cost. Revisit after R.2 if
  Next's SRI support leaves experimental. SEC-3 removes the one sink that made it matter.
- **Hashing invitation tokens at rest.** Whoever can read that table can already read every student's
  grades, and the tokens expire in 7 days.
- **Encrypting grades in the application** (January's DATA-02). Row Level Security is on and the Data
  API is off (5.37). Encrypting would stop the matcher's queries and protect against nothing the
  database's own access doesn't already cover.
- **`X-Forwarded-For`.** `getClientIp` takes the first address in it, which a client could spoof
  elsewhere. Vercel overwrites the header with the real client address, so it holds while the app
  runs on Vercel. Revisit if the hosting changes.
- **HSTS `preload`.** The header asks for it; whether to submit the domain to hstspreload.org is the
  owner's choice. It does no harm as it is.
- **An outside penetration test.** Worth doing once after R.2, when one design is left. The owner's
  call.

---

## Done before this audit

The December 2025 list: all done, as recorded then.

| Task | What |
|---|---|
| 1.1 | Rate limiting with Upstash (`lib/rate-limit.ts`) |
| 1.2 | Security headers and the CSP (`next.config.ts`) |
| 1.3, 1.4 | Privacy Policy and Terms pages (now managed in `/admin/legal-content`; 7.4 updates them) |
| 1.5 | The proxy, for `/student` (SEC-1 extends it) |
| 2.1, 2.2 | Account deletion and the data export (since widened by MAINT 5.24, 5.25 and 5.31) |
| 2.3 | Consent records and versions (re-consent: the policy update banner, rebranding 4.6) |
| 2.4 | Constant-time key comparison |
| 2.5 | The cookie banner (kept, by the owner's decision of 10 October 2026) |
| 3.1 | Validated ids in the Algolia filters |
| 3.2 | Log redaction (`lib/logger`) |
| 3.3 | No email in the client where it isn't shown |

The ongoing items of that list now live in SEC-9 (dependency audits), SEC-7 (monitoring) and
[Considered, not doing now](#considered-not-doing-now) (penetration test).

Security work done in `MAINT_tasks.md` since then: 5.4 (`trustHost`), 5.28 (no addresses or ids kept
by the limiters), 5.34 (late Stripe events), 5.35 (the last six rate limits), 5.36 (revoked
coordinators in the API), 5.37 (Row Level Security and the Data API), 6.7–6.9 (install scripts and
every advisory), and 7.1 (tests of every route's gate). The January 2026 report is
`docs/security/security-audit-report-2026-01.md`, kept as history.
