# IB Match

A platform that matches International Baccalaureate students to university programmes,
and gives IB school coordinators tools to track and support their students.

Students use it free. Schools are either VIP (free, full access) or Regular, which can
buy a subscription for full coordinator access or run on a limited freemium tier.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript 7 |
| Database | PostgreSQL on Supabase, via Prisma 7 |
| Auth | NextAuth v5 (Auth.js) — Google OAuth and Resend magic links |
| Search | Algolia, synced from Postgres by Prisma client extensions |
| Cache / rate limiting | Upstash Redis |
| Email | Resend, with React Email templates in `emails/` |
| Payments | Stripe (Regular school subscriptions only) |
| Hosting | Vercel |

## Getting started

Requires **Node 22+** (see `.nvmrc`).

```bash
cp .env.example .env      # then fill in the values
npm install               # runs `prisma generate` via postinstall
npm run dev               # http://localhost:3000
```

`.env.example` marks which variables the app refuses to start without. They are
validated by Zod in `lib/env.ts`, so a missing or malformed value fails loudly at
boot rather than at first use.

`npm start` — a production build served locally — needs no extra variables. Auth.js
v5 trusts the request host automatically only in development and on Vercel; the config
in `lib/auth/config.ts` sets `trustHost: true` explicitly so a production build runs
correctly anywhere without `AUTH_TRUST_HOST`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build. Requires a reachable database — some pages query Prisma at build time |
| `npm run type-check` | `tsc --noEmit` |
| `npm run lint` | ESLint — code quality only; formatting belongs to Prettier |
| `npm run format` | `prettier --write .` |
| `npm test` | Vitest, once. `npm run test:watch` re-runs on save |
| `npm run email:dev` | Preview the React Email templates |

CI runs type-check, lint, `prettier --check`, both test suites and a production build on
every pull request.

`npm run type-check` runs the native TypeScript 7 compiler, installed as
`@typescript/native` — it owns the `tsc` binary. The `typescript` package is an alias
for `@typescript/typescript6`, which provides the 6.0 JavaScript API that
typescript-eslint still requires; TypeScript 7 does not ship that API. Both are
needed. Installing plain `typescript@7` over the alias makes `npm run lint` fail with
"typescript-eslint does not support TS 7.0".

## Testing

Two suites, both run in CI:

```bash
npm test                          # Vitest: every *.test.ts file
npx tsx scripts/run-all-tests.ts  # matching algorithm: lib/matching/*.verify.ts
```

**New tests use Vitest.** Put them next to the code they cover as `*.test.ts` —
`lib/auth/access-control.test.ts` is the first. Import `describe`/`it`/`expect` from
`vitest`; globals are off. The `@/` alias resolves as it does in the app.

Tests must never reach the production database that `.env` points at. Mock the client
with `vi.mock('@/lib/prisma')`, or run against a local Postgres built with
`prisma migrate deploy`, the way the CI build job does.

The matching algorithm predates Vitest. Its 20 `*.verify.ts` files are standalone
scripts — each exits non-zero on failure — and `scripts/run-all-tests.ts` runs them.
They are not Vitest files, so `npm test` does not pick them up.

## Database

Prisma schema lives in `prisma/schema.prisma`; migrations in `prisma/migrations`.

A fresh database can be built from migrations alone:

```bash
createdb ibmatch_local
DATABASE_URL=... DIRECT_URL=... npx prisma migrate deploy
```

Between December 2025 and February 2026 the schema was changed with `prisma db push`
without recording migrations. `20260828000000_baseline_invitations_support_legal_cms`
closes that gap. It is purely additive, and on any database that already has those
changes it must be marked as applied rather than executed:

```bash
npx prisma migrate resolve --applied 20260828000000_baseline_invitations_support_legal_cms
```

Two things to know before running any Prisma CLI command:

- **Connection URLs live in `prisma.config.ts`, not the schema.** Prisma 7 rejects
  `url` and `directUrl` in `schema.prisma`. The CLI reads `DIRECT_URL`; the app
  connects through the driver adapter in `lib/prisma.ts` using `DATABASE_URL`.
- **The CLI reads `.env` only.** `.env.local` is a Next.js convention, so a `DIRECT_URL`
  that works for the app can still fail every migrate command with `P1001`.
- **Never run `prisma migrate dev` against production.** It offers to reset the database
  when it detects drift. Use `migrate deploy` for applying and `migrate diff` for
  inspecting; both are safe.

## Layout

```
app/            Routes. Grouped by audience: student, coordinator, admin, plus
                public marketing and per-country SEO landing pages
components/     React components, mirroring the same grouping
lib/            Domain logic — matching, auth, algolia, stripe, email, redis
emails/         React Email templates
prisma/         Schema, migrations, seed
scripts/        Operational and data-loading scripts
docs/           Architecture, product specs, matching algorithm, task records
```

## Documentation

- `docs/product/DOC_3_technical-architecture.md` — architecture and the reasoning behind each choice
- `docs/product/DOC_1_ibmatch-requirements-doc.md` — product requirements
- `docs/matching/` — matching algorithm design and changelog
- `docs/security/` — security audit history
