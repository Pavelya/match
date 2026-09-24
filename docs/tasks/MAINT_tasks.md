# Maintenance Roadmap

**Written:** 30 August 2026 · **Covers:** work remaining after maintenance phases 1–4

**How to use this.** [Start here](#start-here) says which tasks to run in which
session, and in what order. The checklist after it is the flat list. Everything below
that is one detailed section per task — the part a session actually works from.

Each task is written to be picked up by a **fresh AI session with no memory of the
earlier work**. Every session should read [Standing context](#standing-context) first:
it holds the rules that stop a session breaking production or burning the free-tier
quota.

---

## Start here

**Eleven sessions, in this order.** Each one is a fresh AI session, one branch, one
pull request, merged before the next starts.

| # | Session | Tasks | Size | Why these are together |
|---|---|---|---|---|
| 1 | Small cleanups | 5.2, 5.3, 5.4 | short | Three tiny changes, none touch the database, and one verification pass covers all three |
| 2 | Client-side navigation | 5.1 | short | Needs a judgement call at each call site, and sign-in has to be clicked through by hand |
| 3 | Prisma 7 | 6.1 | medium | **Done.** Closed all advisories, but needed an `overrides` block as well as the upgrade |
| 4 | Stripe 22 | 6.2 | medium | **Done.** Money path. Alone, so a failure points at one thing |
| 5 | Minor and patch batch | 6.4 | short | **Done.** Alone, so a regression is attributable to this batch |
| 6 | lucide-react 1.x | 6.3 | medium | **Done.** 171 files, but no source change was needed — the risk was 13 redesigned glyphs |
| 7 | TypeScript 7 | 6.5 | small | **Done.** No source change: 0 errors. The work was the packaging — TS 7 ships no JavaScript API |
| 8 | Pick a test framework, test access control | 7.1, part 1 | medium | **Done.** Vitest 5. 33 tests over the subscription gate, and both suites now run in CI |
| 9, 10 | More tests | 7.1, rest | medium each | One area per session: webhook, then API routes |
| 11+ | Country pages | 7.2 | large | Migrate two or three, prove the pattern, then the rest |
| any | Manchester's image | 5.5 | tiny | Blocked on Supabase Storage. Fold into whichever session comes after it is unrestricted |

Sessions 1 and 2 are the cheapest and safest — good places to start.
Session 3 is the most valuable.

### Rules for grouping

1. **Never two dependency upgrades in one session.** If something breaks you will not
   know which upgrade did it, and you will spend more time unpicking it than you saved.
2. **Never mix a risky change with cleanups.** Anything that might need reverting
   deserves a pull request with nothing else in it.
3. **Group only changes that are individually trivial** and share one verification
   pass. That is why session 1 works and nothing else is batched.
4. **Stop when the pull request gets hard to review**, not when the task list is empty.

### What this costs

More sessions costs more in AI time; a bad batch costs more in debugging. Batching
only trivia is the balance. Every session ends with a merged pull request, so the next
one starts from a clean `main` and does not have to rediscover anything.

---

## The full list

Phase 5 — quick wins

- [x] 5.1 Use the router for internal navigation
- [x] 5.2 Delete the unused admin programs API route
- [x] 5.3 Remove the redundant Cache-Control on Next's own static assets
- [x] 5.4 Set `trustHost` explicitly in the auth config
- [ ] 5.5 Restore the University of Manchester image

Phase 6 — dependency majors

- [x] 6.1 Prisma 6 → 7
- [x] 6.2 Stripe 20 → 22
- [x] 6.3 lucide-react 0.x → 1.x
- [x] 6.4 The minor and patch batch
- [x] 6.5 TypeScript 5.9 → 7
- [ ] 6.6 Move to the `prisma-client` generator

Phase 7 — structural

- [ ] 7.1 Test coverage beyond the matching algorithm
- [ ] 7.2 Collapse the 22 country landing pages

Owner tasks — not AI work

- [ ] Enable branch protection on `main`
- [ ] Watch Supabase egress for a week after the quota reset
- [x] Decide the test framework before session 8 — Vitest

---

## Standing context

**Read this before starting any task below.**

### What this project is

IB Match — Next.js 16 (App Router, Turbopack), React 19, TypeScript 7, PostgreSQL on
Supabase via Prisma 7, NextAuth v5, Algolia, Upstash Redis, Resend, Stripe, hosted on
Vercel. `AGENTS.md` at the repo root is authoritative: **this is Next.js 16 and it
differs from training data. Read `node_modules/next/dist/docs/` before writing code
that touches framework behaviour.** That directory is the installed version's own
documentation and has been correct every time it was consulted.

### State as of 30 August 2026

| | |
|---|---|
| Vulnerabilities | **0** — session 3 closed all 4 high, session 4 closed `qs` with Stripe 22, session 5 closed the last moderate (`@humanfs/node`, via eslint) |
| Type check / lint / format | clean — 0 errors, 0 warnings |
| CI | type-check, lint (`--max-warnings 0`), `prettier --check`, both test suites, and a production build against a throwaway Postgres |
| Tests | Vitest 5 (`npm test`), covering `lib/auth/access-control.ts` so far, plus the 20-file matching suite. Session 8 added both to CI; before that CI ran neither |
| Migrations | 5, and a fresh database can be rebuilt from them |
| Rate limits | 61 of 62 API routes (Stripe webhook excluded deliberately) |
| Programs cache | working — ~2.2 MB payload, 6-hour TTL |
| Dependency majors | `prisma` 7, `stripe` 22, `lucide-react` 1 and `typescript` 7 all landed. Only 6.6 (the `prisma-client` generator) is left in phase 6 |
| Branch protection | **off** — CI reports but does not block a red merge |

### Hard rules — production safety

The local `.env` points at the **production** Supabase database. There is no separate
development database. Every Prisma command run from this directory hits production.

1. **Never run `prisma migrate dev`.** It offers to reset the database when it detects
   drift. Use `migrate deploy` to apply and `migrate diff` to inspect; both are safe.
2. **Never run `prisma db push`** against production. That is what broke the migration
   history in the first place; it took a whole phase to repair.
3. **The Prisma CLI reads `.env` only** — `.env.local` is a Next.js convention. A
   `DIRECT_URL` that works for the app can still fail every migrate command with
   `P1001`.
4. **Destructive SQL needs explicit approval** from the user, plus a backup taken
   first. Prepare it, explain it, let them run it.
5. Schema changes go through a migration file, never a direct `ALTER`.

### Hard rules — cost

Supabase is on the **free tier: 5 GB egress per month**. It has already been exceeded
once, which restricted Storage and broke every university image for several days. The
cause was application code, not traffic: a broken cache re-reading 37 MB per request.

1. **Never `SELECT` whole tables from production to inspect them.** Use aggregates —
   `count()`, `sum(length(col))`, `max()`. A single careless `findMany` with `include`
   can move tens of megabytes.
2. **Prefer `select` over `include`** in every new query. `include` returns every
   column of every joined row. Both known egress incidents came from `include`.
3. **`npm run build` queries the production database** — `app/ib-university-requirements/page.tsx`
   is prerendered and calls Prisma. Builds are cheap but not free; don't loop them.
   CI builds against its own throwaway Postgres and costs nothing.
4. **Never store binary data in a database column.** Images belong in Supabase
   Storage as URLs. One 537 KB base64 image joined across 68 programs is what caused
   the outage.
5. Keep AI sessions scoped. Each task below names the files to read so a session does
   not have to explore the whole repo to start work.

### Verification commands

Every task's **Verify** section assumes these. All are free and hit no external service
except the build:

```bash
npx tsc --noEmit                 # must be 0 errors
npx eslint .                     # must be 0 errors
npx prettier --check .           # must be clean
npm run build                    # must exit 0
npm audit                        # compare against the baseline in the task
npm test                         # Vitest: every *.test.ts file
npx tsx scripts/run-all-tests.ts # matching algorithm suite (20 files)
```

`npm run dev` and `npm start` both work with no extra variables. Auth.js v5 auto-trusts
the host only in dev and on Vercel, so `lib/auth/config.ts` sets `trustHost: true`
explicitly (task 5.4). Without that, every `/api/auth/*` route returns 500 with
`UntrustedHost` outside those two environments.

### Working agreement

One task per branch, one PR, CI green before merge. **Merging `main` deploys to
production.** Do not commit to `main` directly.

---

## Phase 5 — Quick wins

Small, independent, low risk. Good first sessions. None of them touch the database.

### 5.1 — Use the router for internal navigation

**Outcome:** No page does a full browser reload to move between internal routes, and
CI fails if a new one appears.

**Why:** 11 uses of `window.location.href`, 7 of which ESLint flags via
`@next/next/no-location-assign-relative-destination`. Each throws away the client-side
router: full document reload, re-download, re-hydrate. They are the only warnings CI
reports, which is why `--max-warnings 0` cannot be enabled yet.

**Read first:** `node_modules/next/dist/docs/01-app/` — the routing and `useRouter`
pages.

**Files:** `app/auth/signin/page.tsx`, `app/auth/coordinator/page.tsx`,
`app/student/matches/RecommendationsClient.tsx`,
`app/universities/[id]/UniversityDetailClient.tsx`,
`components/admin/coordinators/CoordinatorsListClient.tsx`.

**Steps:**
1. `npx eslint . 2>&1 | grep no-location-assign` to get the exact list.
2. In client components, replace with `useRouter().push()`. In server components or
   the render phase, use `redirect()`.
3. Check each site individually — some sign-in paths assign a URL returned by
   NextAuth's `signIn()`, which may legitimately be external. Those should stay, and
   get a targeted `eslint-disable-next-line` with a one-line reason.
4. Once the count is zero, change the CI lint step to `npm run lint -- --max-warnings 0`.

**Verify:**
- `npx eslint .` reports **0 errors and 0 warnings**
- `npm run build` exits 0
- Manually: sign in, then use each changed control and confirm the page transitions
  without a full reload (the browser tab spinner should not restart)

**Guardrails:** Behaviour change on auth paths. Test sign-in end to end before merging.

**Session size:** Small.

---

### 5.2 — Delete the unused admin programs API route

**Outcome:** `GET /api/admin/programs` is gone; nothing regresses.

**Why:** Nothing in the codebase calls it. The admin page queries Prisma directly in
`app/admin/programs/page.tsx`. The handler still uses `include`, so it would transfer
~17 MB if it were ever hit. Dead weight with a sharp edge.

**Files:** `app/api/admin/programs/route.ts` — **the `POST` handler in this file is
live and creates programs. Only `GET` is dead.**

**Steps:**
1. Re-confirm nothing calls it: `grep -rn "api/admin/programs" --include="*.tsx" --include="*.ts" app components`.
   Expect hits only for `POST` (`components/admin/programs/ProgramForm.tsx`) and for
   page links under `/admin/programs`.
2. Delete only the `GET` export and any imports it alone used.

**Verify:** type-check, lint, build all clean; open `/admin/programs` and confirm the
table still renders; create a program and confirm `POST` still works.

**Session size:** Small.

---

### 5.3 — Remove the redundant Cache-Control on Next's own static assets

**Outcome:** The build no longer warns about custom headers on `/_next/static`.

**Why:** Next 16.3 warns that a custom `Cache-Control` on `/_next/static/:path*` can
break development behaviour. Next already serves those fingerprinted assets as
immutable, so the block adds nothing.

**Read first:** `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/headers.md`

**Files:** `next.config.ts` — the `/_next/static/:path*` entry only. **Leave the other
cache entries alone**; the ones for images, fonts and the API routes are deliberate.

**Verify:** `npm run build` output no longer contains "Custom Cache-Control headers
detected"; `curl -I` a `/_next/static/...` asset from `npm start` and confirm it still
has a long-lived cache header (Next sets its own).

**Session size:** Very small. Good to combine with 5.2.

---

### 5.4 — Set `trustHost` explicitly in the auth config

**Outcome:** A production build runs correctly outside Vercel without an extra
environment variable.

**Why:** Auth.js v5 does not take host trust from `NEXTAUTH_URL` — that is the v4
name. It auto-trusts only in development and on Vercel, so `npm start` anywhere else
returns 500 on every `/api/auth/*` route. Today that is worked around with
`AUTH_TRUST_HOST=true`, which means the app depends on a Vercel environment variable
for correctness.

**Files:** `lib/auth/config.ts`. Also update the `AUTH_TRUST_HOST` notes in
`.env.example` and `README.md` once it is no longer needed.

**Steps:** Add `trustHost: true` to the NextAuth config. It is safe here because the
app is served from a known host behind Vercel; document that reasoning in a comment.

**Verify:**
```bash
npm run build && npm start          # deliberately WITHOUT AUTH_TRUST_HOST
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/api/auth/providers
```
Expect **200**, not 500. Then confirm sign-in still works in `npm run dev`.

**Session size:** Small.

---

### 5.5 — Restore the University of Manchester image

**Outcome:** All 57 universities have a working image.

**Why:** That row held a 537 KB base64 image which was multiplied across its 68
programs and broke the cache. The column was set to `NULL` to stop the bleeding, which
discarded the only copy. It currently renders the placeholder icon.

**Depends on:** Supabase Storage being out of restriction (quota reset was due
2 September 2026). Check first:
```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  "https://<project>.supabase.co/storage/v1/object/public/university-images/<any-known-file>"
```
`402` means still restricted — stop and report.

**Steps:** Either restore the base64 from the Supabase backup taken before the `UPDATE`
and then run `npx tsx scripts/fix-university-images.ts` to move it to Storage, or
re-source the photo and upload it through the admin UI, which now converts to Storage
automatically.

**Verify:** the row's `image` starts with `https://`, not `data:`; the image renders on
a Manchester program card; `SELECT count(*) FROM "University" WHERE image LIKE 'data:%'`
returns **0**.

**Guardrails:** Do not paste base64 into the database. The admin route now returns 502
rather than storing it, and that is intentional.

**Session size:** Small, but partly a human task.

---

## Phase 6 — Dependency majors

One major per session. Sequential — do not batch them, because when something breaks
you want to know which upgrade did it.

### 6.1 — Prisma 6 → 7 — **done**

**Outcome:** `npm audit` reports **0 high** — all 4 advisories closed — Prisma is on
7.10.0, and the `package.json` seed block has moved to `prisma.config.ts`.

Two *moderate* advisories were published while this session was in flight and are still
open. Neither comes from Prisma: `qs` arrives through `stripe@20` and closes with task
6.2, and `@humanfs/node` through eslint, which belongs in the 6.4 patch batch. They were
left alone rather than folded in here, so a regression stays attributable.

**What the plan got wrong.** Three things, all worth knowing before the next upgrade:

1. **The upgrade alone does not close the advisories — it adds one.** `@prisma/config@7.10.0`
   still pins the vulnerable `deepmerge-ts@7.1.5`, and the Prisma 7 CLI bundles a
   vulnerable `mysql2` that Prisma 6 did not. Prisma 7 on its own takes the count from
   4 high to 5. What actually reaches 0 is the upgrade **plus** an `overrides` block:

   ```json
   "overrides": {
     "deepmerge-ts": "^8.0.2",
     "brace-expansion@1": "^1.1.18",
     "mysql2": "^3.22.0"
   }
   ```

   The upgrade is still required: `effect@<3.20.0`, reachable only through
   `@prisma/config`, cannot be fixed on Prisma 6. Neither half is sufficient alone.

   Note the `brace-expansion@1` key. An unscoped `brace-expansion` override forces
   every copy in the tree to 1.x, and this tree also carries 2.x and 5.x. Scope it.

2. **`npm install prisma@latest` installs a release candidate.** The `latest` dist-tag
   currently points at `8.0.0-rc`; stable v7 sits under `prev`. Pin the version.

3. **The upgrade is much larger than "swap the seed block".** Prisma 7 removed the Rust
   query engine, so a driver adapter (`@prisma/adapter-pg`) is mandatory —
   `new PrismaClient()` throws without one. That is a runtime failure, not a type error,
   so `tsc` stays green while every script is broken. All 41 construction sites had to
   move to a shared client.

**The TLS trap.** node-postgres reads `sslmode=require` as "encrypt **and** verify the
chain"; Prisma 6's engine read it as "encrypt, don't verify". Supabase's pooler presents
a chain Node does not trust, so after the upgrade every query failed with
`self-signed certificate in certificate chain` — including `npm run build`, which
prerenders `app/ib-university-requirements`. `lib/prisma-adapter.ts` rewrites the value
to `no-verify`, which is exactly the posture Prisma 6 already had. Doing it in code
rather than in `.env` means the Vercel variables did not have to change in lockstep.

**Follow-up worth doing:** verify the chain properly (`verify-full` plus Supabase's CA
certificate). That is a change to the trust model, so it was deliberately kept out of a
major-version upgrade rather than folded into it.

**Connection pool.** A driver adapter inherits node-postgres's pool defaults, where
`max` is 10 — double the Prisma 6 default it replaces (`num_cpus * 2 + 1`). On the free
tier with pgbouncer already pooling server-side, `lib/prisma.ts` sets `max: 5`
explicitly rather than silently doubling connections per instance.

**What changed:** `prisma.config.ts` (new), `lib/prisma-adapter.ts` (new),
`lib/prisma-standalone.ts` (new), `lib/prisma.ts`, `prisma/schema.prisma` (the
datasource no longer carries `url`/`directUrl` — Prisma 7 rejects them), `package.json`,
and 40 scripts repointed off `new PrismaClient()`.

**Verified:** 0 high advisories · `migrate status` up to date · type-check, lint,
prettier and build all clean · 20/20 matching tests · the 5 migrations rebuild a fresh
database with `migrate diff` reporting no difference · both Prisma extensions confirmed
firing at runtime under the new query pipeline, against a throwaway local database.

**Still to check by hand:** edit a program in the admin UI and confirm it syncs to
Algolia and invalidates the programs cache. The reference-data extension was proven to
fire; the program-level Algolia path needs a real edit, which means a production write.

**Note:** the generator is still the deprecated `prisma-client-js`, which keeps
generating into `node_modules` so all 60 `@prisma/client` import sites are unchanged.
Moving to the `prisma-client` generator means a required `output` path and rewriting
every one of those imports. It is a mechanical but wide change and deserves its own
session — see 6.6.

---

### 6.6 — Move to the `prisma-client` generator

**Outcome:** the schema uses `provider = "prisma-client"` with an explicit `output`, and
no code imports from `@prisma/client`.

**Why:** `prisma-client-js` is deprecated and Prisma has said it will be removed. It
also generates into `node_modules`, which is the thing Prisma 7 moved away from.

**Size:** ~60 files, mechanical. Check the generated directory is gitignored, and watch
for the known `.prisma/client/default` resolution issue on Next 16 + Turbopack.

---

### 6.2 — Stripe 20 → 22 — **done**

**Outcome:** `stripe` is on 22.6.1, the pinned API version moved from
`2025-11-17.clover` to `2026-08-26.dahlia`, and the `qs` advisory is closed. One
moderate advisory remains, `@humanfs/node` via eslint, which belongs to task 6.4.

**The upgrade is two lines.** `package.json` and the `apiVersion` in
`lib/stripe/server.ts`. Nothing else in the repo changed. That is a genuinely
surprising result for two majors across a money path, so it is worth recording *why*
none of the breaking changes reached this code:

- **v22 removed callbacks, per-request API keys, per-request `host`, and mixing
  `params` with `options`.** Every call site here passes a single params object and
  awaits it, which is the one pattern that survived untouched.
- **v22 made `Stripe` a real ES6 class**, so calling it without `new` throws.
  `getStripe()` already used `new Stripe(...)`.
- **v21 changed every `decimal_string` field from `string` to `Stripe.Decimal`.** This
  code reads no decimal fields — the checkout flow passes a `priceId` and never touches
  `unit_amount_decimal`.
- **v21 made the webhook helpers throw when handed the wrong kind of event.**
  `Webhooks.buildEvent` throws only for `object: 'v2.core.event'` thin notifications.
  All four subscribed events are v1 snapshot events, so `constructEvent` stays correct.

**`apiVersion` is a literal type, not a string.** `StripeConfig.apiVersion` is typed
`LatestApiVersion = typeof ApiVersion`, so the SDK accepts exactly one value and
`tsc` catches a stale pin. The current value lives in
`node_modules/stripe/cjs/apiVersion.d.ts` — read it there rather than guessing from the
changelog, because the pin moves in *minor* releases too (22.0 shipped
`2026-03-25.dahlia`; 22.6 is on `2026-08-26.dahlia`).

**The types moved.** v22 replaced the hand-maintained `types/` folder with declarations
emitted next to the implementation, and dropped the top-level ambient `"stripe"` module.
`node_modules/stripe/types/` no longer exists. `import Stripe from 'stripe'` and the
`Stripe.Checkout.Session` namespace types still resolve, so no import changed here, but
anything reaching into `stripe/types/...` by path would break.

**What changed:** `package.json`, `package-lock.json`, `lib/stripe/server.ts`.

**Verified:** type-check, lint, prettier and build all clean · 20/20 matching tests ·
`npm audit` down to 1 moderate from 2. Against **test mode** keys, every function in
`lib/stripe/server.ts` was exercised for real: `prices.list` on the configured product,
`getOrCreateStripeCustomer` (both the create and the short-circuit branch),
`createCheckoutSession`, `createPortalSession`, and `getCustomerSubscriptionStatus`.
The webhook was driven end to end with `stripe listen --forward-to` plus
`stripe trigger checkout.session.completed` against `npm run dev`: signature
verification passed on all six forwarded events, the router reached
`handleCheckoutCompleted`, and a deliberately tampered body was rejected with 400.
`customer.subscription.updated` and `.deleted` were driven with hand-signed payloads.

**Still to check by hand:** the one assertion not covered is a subscription row actually
flipping to `ACTIVE`. Every automated check used identifiers that match no row, because
the local `.env` points at the production database and proving the write would have
meant writing to it. The two routes that wrap these functions
(`create-checkout`, `create-portal`) also need a signed-in coordinator, so they were
verified through their `lib/stripe/server.ts` internals rather than through the HTTP
route. Completing a test-mode checkout as a real coordinator covers both gaps at once.

**Note:** the Stripe CLI reported `A newer version of the Stripe CLI is available`
(v1.50.10). It is a local tool, not a dependency, and was left alone.

---

### 6.3 — lucide-react 0.x → 1.x — **done**

**Outcome:** on `lucide-react` 1.41.0, with **no source file changed**. 171 files import
it and not one of them needed editing.

**Why the blast radius did not materialise.** v1's breaking change is the removal of the
13 brand icons (Github, Facebook, Figma, Slack, Instagram, LinkedIn, Gitlab, Codepen,
Codesandbox, Dribbble, Framer, Chromium, Pocket, RailSymbol). This app uses none of them.
Every v0 name is still exported in v1 as an alias of its canonical name — `AlertCircle` →
`CircleAlert`, `CheckCircle2` → `CircleCheck`, `CheckCircle` → `CircleCheckBig`,
`XCircle` → `CircleX`, and every `*Icon` suffixed form. All 113 icons and the
`LucideIcon` type used here resolve unchanged, so `tsc` had nothing to find.

**What changed:** `package.json`, `package-lock.json`, and a note in
`docs/UX/icons-reference.md`. No icon name changed, so nothing in that doc's mapping
tables needed editing.

**The real risk was glyph redesign, not missing exports.** A type checker cannot see it,
and the roadmap's answer was to walk the app by eye. Instead every icon the app imports
was rendered through `renderToStaticMarkup` under both 0.555.0 and 1.41.0 and the SVG
geometry diffed. **100 of 113 are byte-identical.** The other 13:

| Icon | Change | Where |
|---|---|---|
| `Zap` | **Redrawn.** Different bolt proportions | landing feature grid, how-it-works (3 files) |
| `BookOpen` | **Redrawn.** Squarer spread, spine now `M12 5v16` | 23 files, incl. field-of-study fallback |
| `Bookmark`, `BookmarkX` | **Redrawn.** Rounded notch instead of a sharp `V` | saved programs, program cards (6 files) |
| `Leaf` | **Redrawn.** Rounder leaf, shorter stem | `lib/icons.tsx` (Environment field) |
| `Calendar` | Subtle. Top ticks `2v4`→`2v3`, body `y=4`→`y=3`, divider `10`→`9` | 7 files |
| `CheckCircle2` | Subtle. Tick redrawn `m9 12 2 2 4-4` → `m16 9-5.5 5.5L8 12` | 48 files — the most-used icon here |
| `Landmark`, `School`, `Rocket` | Sub-pixel coordinate rewrites. Not perceptible | 15 files |
| `Clock`, `Compass`, `ThumbsUp` | Path order only, same geometry. All stroke, no fill, so no visual effect | 14 files |

None is a *wrong* glyph — each still depicts what it depicted, which is what the
"no visual regressions" outcome asked for. They are upstream redesigns and they ship
whether or not this app likes them; the only alternative is staying on 0.x. Flagged
rather than fixed.

**Verified:** type-check, `eslint .`, `prettier --check .` and `npm run build` all clean ·
20/20 matching tests · `npm audit` still **0 vulnerabilities** · the 113-icon geometry
diff above · no `lucide-react/dynamic` or other subpath import anywhere, so the dropped
UMD build and the renamed Vue package are both irrelevant here.

**Still to check by hand:** the seven visible redesigns above in the browser, most
usefully `CheckCircle2` (48 files) and `BookOpen` (23). Folded into this session from
6.4: the Radix and Tailwind bumps are also visual, so dialogs, selects and labels deserve
the same glance while the app is open.

**Session size:** Was medium; turned out to be one line of `package.json`.

---

### 6.4 — The minor and patch batch — **done**

**Outcome:** every dependency that is not a deliberate holdout is on its latest version,
and `npm audit` reports **0 vulnerabilities** for the first time.

**What moved** — 26 packages, none across a major boundary:

| | |
|---|---|
| Runtime | `next` 16.3.3→16.3.4, `react`/`react-dom` 19.2.1→19.2.8, `zod` 4.1.13→4.5.4, `algoliasearch` 5.46→5.57, `@supabase/supabase-js` 2.87.1→2.115.0, `resend` 6.24→6.26, `@upstash/redis` 1.35.7→1.38.4, `@upstash/ratelimit` 2.0.7→2.0.8 |
| UI | the four `@radix-ui/*` packages, `tailwindcss` and `@tailwindcss/postcss` 4.1.17→4.3.3, `@tailwindcss/typography` 0.5.19→0.5.20, `tailwind-merge` 3.4→3.6, `country-flag-emoji-polyfill` 0.1.8→0.1.10, `@react-email/components` 1.0.1→1.0.12 |
| Tooling | `eslint` 9.39.1→9.39.5, `eslint-config-next` 16.3.3→16.3.4, `@typescript-eslint/*` 8.48.1→8.69.0, `prettier` 3.7.3→3.9.6, `lint-staged` 16.2.7→16.4.0, `tsx` 4.21→4.23.13, `@types/react` 19.2.7→19.2.18, `@types/react-dom` 19.2.3→19.2.7 |

**Held back deliberately:** `lucide-react` (done in 6.3), `typescript` and `@types/node` (6.5),
`prisma`/`@prisma/client`/`@prisma/adapter-pg` (done in 6.1, already current),
`react-email` (5.0.5; its own task), `stripe` (current after 6.2). `next-auth` shows as
"outdated" only because npm compares the v5 beta against the v4 `latest` tag — ignore it.

**Three things this did not do by plain `npm update`:**

1. **`@humanfs/node` needed its own `npm update @humanfs/node`.** eslint 9.39.5 asks for
   `^0.16.6` and 0.16.8 carries the fix, but the lockfile was pinned at 0.16.7 and
   updating eslint alone did not move a transitive dependency that already satisfied its
   range. That one command is what took audit to zero.
2. **`@typescript-eslint/*` could not be bumped directly** — `npm install
   @typescript-eslint/eslint-plugin@latest` fails with `ERESOLVE`, because
   `eslint-config-next` pulls the `typescript-eslint` meta package, which pins the plugin
   and parser to an exact version. `npm update typescript-eslint` moves all three
   together and dedupes cleanly; the `package.json` ranges then have to be raised by hand
   to match, since the root never depends on the meta package.
3. **`npm update --save` narrows loose ranges.** `"^4"` and `"^19"` became `"^4.3.3"` and
   `"^19.2.18"`. Left as-is — the floor is now the version that was actually verified.

**Prettier 3.9 reformats 5 files.** 3.8 changed how short union types and single-argument
callbacks are printed, so unions that were one-per-line collapse onto one line where they
fit in 100 columns. Formatting only, no behaviour: `route.ts` (legal-document versions),
`PageContainer.tsx`, `page-loader.tsx`, `transformers.ts`, `unified-penalties.ts`. Any
branch open across this upgrade will conflict there.

**What changed:** `package.json`, `package-lock.json`, and those 5 files reformatted.

**Verified:** `npm audit` **0 vulnerabilities** (from 1 moderate) · type-check, lint at
`--max-warnings 0`, `prettier --check` and `npm run build` all clean · 20/20 matching
tests, which is the `zod` and `algoliasearch` check · all 7 `emails/*.tsx` templates
rendered through `render()` from the upgraded `@react-email/components` against the
held-back `react-email` 5.0.5, each producing 5–6 KB of HTML · `npm ls --all` reports no
invalid or unmet non-optional peers.

**Still to check by hand:** the Radix and Tailwind bumps are visual. Nothing in the diff
suggests a rendering change and the build is clean, but dialogs, selects and labels are
worth a glance in the browser — most cheaply folded into session 6, which has to walk the
main surfaces for icons anyway. Session 6 carried this forward rather than closing it:
it replaced its own browser walk with an SVG geometry diff, which says nothing about
Radix or Tailwind. Still open.

---

### 6.5 — TypeScript 5.9 → 7 — **done**

**Outcome:** `tsc` is the native TypeScript 7.0.2 compiler. It found **0 errors**, so no
source file changed. The whole task was packaging.

**TypeScript 7 ships no JavaScript API.** The published package is a launcher for a
platform-native binary — `bin/tsc`, plus `typescript/unstable/*` entry points — with no
`lib/typescript.js`. Everything that consumed the compiler as a library therefore breaks,
and typescript-eslint breaks loudly: it reads `ts.versionMajorMinor` at require time and
throws `typescript-eslint does not support TS 7.0` (see
`node_modules/typescript-eslint/dist/index.js`). Its peer range is `>=4.8.4 <6.1.0`, so a
plain `npm i -D typescript@7` also needs `--legacy-peer-deps`, and then every
`npx eslint .` fails. Support for TS ≥7.1 is tracked in typescript-eslint#10940.

**The fix is the two-package layout Microsoft documents,** in `package.json`:

```json
"@typescript/native": "npm:typescript@^7.0.2",
"typescript": "npm:@typescript/typescript6@^6.0.2"
```

- `@typescript/native` is TypeScript 7 under another name. It owns `node_modules/.bin/tsc`,
  so `npx tsc`, `npm run type-check` and Next's build checker all get 7.0.2.
- `typescript` resolves to the 6.0 JavaScript API (currently 6.0.3), which is what
  typescript-eslint, and anything else that imports the compiler, loads. Its version
  satisfies the `<6.1.0` peer range, so the install needs no `--legacy-peer-deps` and no
  `overrides` entry. That package's own binary is named `tsc6`, so there is no conflict
  over `tsc`.

Both are needed, and the arrangement is fragile in one specific way: `npm install -D
typescript@latest` collapses it and breaks lint. That warning now lives in `AGENTS.md`
and `README.md`.

**`next build` type checks with 7 as well.** Next 16 defaults
`experimental.useTypeScriptCli` to true, which runs the project-local `tsc` binary
instead of loading the compiler API — the docs
(`node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/useTypeScriptCli.md`)
say this exists precisely to enable TypeScript 7. Setting it to `false` under TS 7 makes
the build exit. Nothing was configured; the default is correct here.

**`@types/node` stayed on the 22 line** (22.20.1, the latest 22.x). This task's original
note said 22 → 26, but Node 26 is the current release and this project runs Node 22
everywhere — `.nvmrc`, `engines`, the CI workflow and Vercel. Types a major ahead of the
runtime would let code type check against APIs that do not exist in production. Bump them
together with the runtime, as a separate decision, or not at all.

**It is roughly 7× faster.** A cold `tsc --noEmit` over this project: 10.9s on the
JavaScript compiler, 1.6s native.

**Verified:** `npx tsc --noEmit` 0 errors on 7.0.2 (and, as a cross-check, also 0 on the
6.0 API via `npx tsc6 --noEmit`) · `npx eslint .` clean, which is the real test of the
layout · `prettier --check` clean · `npm run build` exit 0 with all 22 `study-in-*` pages
still prerendered · 20/20 matching tests · `npm audit` still 0 vulnerabilities ·
`npm ci` reinstalls from the lockfile without peer errors · `npm run dev` boots and
serves `/` with 200.

**Not closed by this session:** the Radix and Tailwind visual check carried forward from
6.4. This task changed no runtime output at all, so it was no cheaper to fold in here
than anywhere else.

---

## Phase 7 — Structural

Projects, not maintenance. Each deserves its own planning.

### 7.1 — Test coverage beyond the matching algorithm

**Outcome:** A real test runner, and coverage of the paths where a regression costs
money or leaks data.

**Why:** The working suite is 20 hand-rolled `.verify.ts` scripts run by
`scripts/run-all-tests.ts`, and it covers `lib/matching` only — the hardest part of the
product, and the right thing to have covered. Everything else has none: 62 API routes,
the RBAC in `lib/auth/access-control.ts`, subscription tier gating, and the Stripe
webhook state machine.

Two Jest test files were deleted in phase 2 because Jest was never installed and they
had never run. **The framework choice is genuinely open** — treat it as a decision to
put to the user, not an assumption.

**Suggested order, highest value first:**
1. `lib/auth/access-control.ts` — pure functions, no I/O, and they decide who sees what
2. The Stripe webhook state machine — money, and hard to test manually
3. Representative API routes — one authenticated, one admin, one unauthenticated
4. Rate limiting — that limits apply and return 429

**Guardrails:** Tests must not hit the production database. Either mock Prisma, or
stand up a local Postgres via `prisma migrate deploy` the way CI does. The CI workflow
already shows the pattern.

**Verify:** the suite runs in CI as a required check, and fails when a deliberately
broken assertion is introduced.

**Session size:** Large. Split across sessions — framework decision first, then one
area per session.

#### Part 1 — framework and access control — **done** (session 8)

**Outcome:** Vitest 5.0.0 is the test framework, chosen by the owner.
`lib/auth/access-control.test.ts` holds 33 tests, and CI has a new **Tests** job that
runs them and the 20-file matching suite. Until this session CI ran neither suite.

**Why Vitest.** It compiles TypeScript through Vite's own transform and never loads the
compiler API, so the TS 7 / TS 6 two-package layout from 6.5 does not affect it. Sessions
9 and 10 need module mocking for Prisma and `auth()`: `vi.mock` does that out of the box,
`node:test` needs an experimental flag on Node 22, and Jest needs a TypeScript transform
plus ESM workarounds for next-auth v5. Next documents it in
`node_modules/next/dist/docs/01-app/02-guides/testing/vitest.md`.

**Where the setup departs from Next's guide:**

- **`vite` must be installed alongside `vitest`.** It is a required, non-optional peer of
  vitest 5, and the guide does not list it.
- **No `vite-tsconfig-paths`.** Vite 8 has `resolve.tsconfigPaths: true` built in, so `@/`
  resolves from `tsconfig.json` with no plugin.
- **No `@vitejs/plugin-react`, jsdom or Testing Library.** Nothing here renders a component
  yet. Add them when a test needs to render one. Async Server Components cannot be
  unit-tested by Vitest at all — use E2E for those.
- **Vitest 5 needs Node `^22.12.0`.** The owner's machine is on exactly 22.12.0; CI's
  `node-version: 22` resolves to the latest 22.x.
- **`include` is `**/*.test.{ts,tsx}` only.** The `.verify.ts` scripts are not Vitest
  files — they run top-level code and exit non-zero on failure. Renaming one to `.test.ts`
  would make Vitest fail it with "no test suite found".

**What the tests pin down:**

- Every tier × status combination and the access level it grants. The expectation table
  is typed `Record<SubscriptionTier, Record<SubscriptionStatus, AccessLevel>>`, so adding
  an enum value fails `tsc` until someone decides what access it grants. The
  `isFeatureLocked` feature list uses the same trick.
- **REGULAR + CANCELLED is freemium.** This is the case where a bug would cost money.
- VIP keeps full access whatever its status, since VIP schools have no Stripe subscription.
- The invite boundary (9 students may invite, 10 may not). Remaining invites never go
  negative for a school that downgraded while over the limit.
- `FREEMIUM_MAX_STUDENTS` is 10. The number is also written out in UI copy —
  `app/coordinator/students/page.tsx` (twice) and `InviteStudentForm.tsx` — so a change to
  the constant alone would make the UI wrong.

**Proved to fail.** Four deliberate breaks, each reverted:

| Break | Result |
|---|---|
| A CANCELLED subscription keeps full access | 2 tests fail |
| `<` becomes `<=` on the invite limit | 1 test fails |
| A wrong expected value in an assertion | 1 test fails; `npm test` exits 1 |
| A status dropped from the expectation table | `tsc` fails with TS2741 |

**Read before sessions 9 and 10: role-based access control has no shared helper.**
`lib/auth/access-control.ts` handles subscription gating only; it knows nothing about
roles. Role checks are written inline: `app/` has 49 `role !== 'PLATFORM_ADMIN'`
comparisons, each after an `auth()` call and a database re-read of the role. The layouts
work the same way — `app/admin/layout.tsx` requires `PLATFORM_ADMIN`,
`app/coordinator/layout.tsx` requires `COORDINATOR`, and `app/student/layout.tsx` requires
only a session. `proxy.ts` enforces nothing beyond "signed in" for `/student/*`. Role
checks can therefore be tested only through the routes, with `@/lib/auth/config` and
`@/lib/prisma` mocked, which is what session 10 should do. A shared `requireRole` helper
would make that cheaper, but it rewrites dozens of security checks and deserves its own PR.

**Deliberately not tested:** `isFeatureLocked` returns `false` (unlocked) for a feature
name it does not recognise. The union type makes that branch unreachable. A test would
have recorded failing open as intended behaviour, so it is noted here instead.

**Remaining for 7.1:**
- the Stripe webhook (session 9)
- API routes and rate limiting (session 10)
- converting the 20 `.verify.ts` scripts to Vitest — mechanical, and a session of its own
- branch protection, so the Tests job actually blocks a merge (owner task 1)

**What changed:**
- `package.json` and `package-lock.json`: `vitest`, `vite` and their dependencies, plus
  two transitive bumps — `tinyglobby` 0.2.15→0.2.17 and `@jridgewell/sourcemap-codec`
  1.5.5→1.6.0
- `vitest.config.mts` and `lib/auth/access-control.test.ts`, both new
- `.github/workflows/ci.yml`, `AGENTS.md`, `README.md`, and this file

**Verified:**
- `npm test` passes 33/33 in about 160 ms.
- The matching suite passes 20/20, including with an empty environment, which is what the
  CI job runs with.
- Type-check, `eslint . --max-warnings 0`, `prettier --check .` and `npm run build` are all
  clean.
- `npm audit` still reports 0 vulnerabilities.
- The four deliberate breaks above all fail.

---

### 7.2 — Collapse the 22 country landing pages

**Outcome:** One `[country]` route driven by data, instead of 22 near-identical pages.

**Why:** 4,387 lines across 22 directories. The prose is genuinely country-specific and
belongs in the repo, but the ~200-line page shell around it — metadata, three or four
JSON-LD blocks, the same section scaffold — is copy-pasted every time. Adding a country
means duplicating all of it, and drift is already observable: three pages were missing
their ISR config until phase 3a fixed them.

**Read first:** `node_modules/next/dist/docs/01-app/` on dynamic routes,
`generateStaticParams` and metadata. `docs/countries/COUNTRY-PAGE-BASELINE.md`.

**Constraints that must survive:**
- Each page stays statically rendered with `revalidate = 604800`. Use
  `generateStaticParams`. **Do not let these become dynamic** — they are the public SEO
  surface and dynamic rendering costs both latency and money.
- URLs must not change: `/study-in-<country>-with-ib-diploma`. These are indexed.
- JSON-LD must be preserved per country. Use `serializeJsonLd` from `lib/utils.ts` for
  anything with a database-derived value.

**Verify:**
- `npm run build` shows all 22 routes still `○ (Static)` with a 1-week revalidate
- Every URL returns 200 and its title, meta description and JSON-LD match what the old
  page produced — diff the rendered HTML of two or three before and after
- The sitemap still lists them

**Session size:** Large. Migrate two or three countries first, prove the pattern, then
do the rest.

---

## Deliberately not doing

Recorded so nobody re-opens them without new information.

| Item | Why not |
|---|---|
| **Nonce-based CSP** | Per the Next 16 CSP guide, nonces force every page into dynamic rendering — ISR disabled, no CDN caching, higher cost. Bad trade for an app that loads no third-party scripts. `'unsafe-eval'` is already gone from production. Revisit if `experimental.sri` stops being experimental. |
| **Rate limiting the Stripe webhook** | Throttling it makes Stripe retry and eventually drop events. It is guarded by signature verification instead. |
| **Shortening the 30-day session** | Role revocation now takes effect within 5 minutes, so session length is a product preference rather than a security control. Change it if the user wants shorter, not for security. |
| **Removing `'unsafe-inline'` from `script-src`** | Next emits inline bootstrap and hydration scripts. Needs nonces or SRI — see above. |

---

## Owner tasks

Not AI work, but they gate real value.

1. **Enable branch protection on `main`.** CI currently reports but does not block; a
   red PR can still be merged. Settings → Branches → require status checks → tick
   "Type check, lint, format", "Tests", "Production build" and the Vercel check. Two
   minutes, and worth more than most remaining code changes.
2. **Watch Supabase egress** for a week after the quota reset. Expected steady state is
   well under 1 GB/month. If it climbs, look for a new `include` in a hot path first.
3. ~~**Decide the test framework** for 7.1 before that session starts.~~ Decided in
   session 8: Vitest.
