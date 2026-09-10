import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    // Reads the `@/*` mapping from tsconfig.json, so the alias has one source of truth.
    tsconfigPaths: true
  },
  test: {
    // `*.test.ts` only. The matching suite (`lib/matching/*.verify.ts`) is a set of
    // standalone scripts run by `scripts/run-all-tests.ts`, not Vitest files.
    include: ['**/*.test.{ts,tsx}'],
    exclude: [...configDefaults.exclude, '.next/**'],
    environment: 'node'
  }
})
