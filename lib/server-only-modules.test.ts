import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

// Modules that hold a secret, or decide who sees what, import `server-only` (SEC-8): the build then
// fails if a client file imports them, so they can never be bundled for the browser. Tests mock the
// marker, so this checks the import is still there.
//
// lib/env.ts, lib/prisma.ts, lib/redis/client.ts, lib/algolia/client.ts and lib/supabase/client.ts
// hold secrets too, but the maintenance scripts run by tsx import them, and `server-only` only
// resolves inside a Next build. Next inlines only NEXT_PUBLIC_ values into a client bundle, so a
// client import of those would find their secrets undefined, not leak them.
const SERVER_ONLY = [
  'lib/stripe/server.ts',
  'lib/email/client.ts',
  'lib/auth/guards.ts',
  'lib/new-ui.ts'
]

describe('server-only modules', () => {
  it.each(SERVER_ONLY)('%s imports server-only', (file) => {
    const source = readFileSync(path.join(process.cwd(), file), 'utf8')
    expect(source).toMatch(/^import 'server-only'$/m)
  })
})
