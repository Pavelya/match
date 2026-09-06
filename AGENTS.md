<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

Short by design — this file is in every session's context. Depth lives in the
documents listed at the bottom.

## Before touching the database

The local `.env` points at the **production** Supabase database. There is no separate
development database, so every Prisma command run here hits production.

- **Never run `prisma migrate dev`.** It offers to reset the database when it finds
  drift, and there has been drift.
- **Never run `prisma db push`.** That is what broke the migration history once
  already; repairing it took a full phase.
- `prisma migrate deploy` (apply) and `prisma migrate diff` (inspect) are safe.
- The Prisma CLI reads `.env` **only**. `.env.local` is a Next.js convention, so a
  `DIRECT_URL` that works for the app can still fail every migrate command with `P1001`.
- Connection URLs live in `prisma.config.ts`, not `schema.prisma` — Prisma 7 rejects
  `url`/`directUrl` in the schema. That file loads `dotenv` itself and points Migrate at
  `DIRECT_URL`; the app connects through the adapter in `lib/prisma.ts` on `DATABASE_URL`.
- **Never `new PrismaClient()`** — Prisma 7 requires a driver adapter and it throws
  without one. App code imports `prisma` from `@/lib/prisma`; scripts and the seeder
  import it from `@/lib/prisma-standalone`.
- Destructive SQL needs the user's explicit approval, and a backup taken first.

## Cost — Supabase is on a 5 GB free tier

It has been exceeded once, by application code rather than traffic. Storage was
restricted and every university image broke for days.

- **Prefer `select` over `include`.** `include` returns every column of every joined
  row. Both egress incidents came from `include`.
- **Inspect production with aggregates** — `count()`, `sum(length(col))`, `max()`.
  Never `SELECT` a whole table just to see what is in it.
- **Never store binary data in a column.** Images belong in Supabase Storage as URLs.
  One 537 KB base64 image joined across 68 programs caused the outage.
- `npm run build` queries production, because `app/ib-university-requirements` is
  prerendered and calls Prisma. Fine to run; don't loop it.

## Conventions that are easy to get wrong

- **Prettier owns formatting; ESLint owns code quality.** Do not add stylistic rules to
  `eslint.config.mjs` — that conflict once produced 670 errors that could not be fixed,
  because the two tools kept reverting each other.
- **Tests are `lib/matching/*.verify.ts`, run by `npx tsx scripts/run-all-tests.ts`.**
  No Jest or Vitest is installed. Do not add `.test.ts` files expecting a runner.
- **Import `prisma` from `@/lib/prisma`.** Never `new PrismaClient()` — the shared
  client is pooled and carries the Algolia sync extensions.
- **Use `logger` from `@/lib/logger`.** `no-console` is an error outside scripts.
- **The 22 `study-in-*` pages are static with a one-week revalidate deliberately.**
  Keep them static; dynamic rendering costs both latency and money.
- `npm start` needs `AUTH_TRUST_HOST=true` outside Vercel, or every `/api/auth/*` route
  returns 500 with `UntrustedHost`. Auth.js v5 auto-trusts only in dev and on Vercel.

## Workflow

**Merging `main` deploys to production.** Work on a branch, open a pull request, let CI
pass, and let the user merge. Never commit to `main`.

Verification — all free, and nothing reaches a third party except the build:

```bash
npx tsc --noEmit && npx eslint . && npx prettier --check . && npm run build
npx tsx scripts/run-all-tests.ts
```

## Where to look

- `docs/tasks/MAINT_tasks.md` — remaining work, grouped into sessions, with the full
  standing context and per-task verification
- `docs/product/DOC_3_technical-architecture.md` — architecture and the reasoning
  behind each choice
- `docs/security/security-audit-report-2026-01.md` — security audit history
- `README.md` — setup, scripts, and database notes
