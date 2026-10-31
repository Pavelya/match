import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    // Reads the `@/*` mapping from tsconfig.json, so the alias has one source of truth.
    tsconfigPaths: true
  },
  test: {
    include: ['**/*.test.{ts,tsx}'],
    exclude: [...configDefaults.exclude, '.next/**'],
    environment: 'node'
  }
})
