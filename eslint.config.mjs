import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierConfig from 'eslint-config-prettier'
import tseslint from '@typescript-eslint/eslint-plugin'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Prettier owns formatting. This must stay last of the shared configs:
  // it switches off every ESLint rule that would fight `prettier --write`.
  // Formatting is enforced by `npm run format` and `prettier --check` in CI.
  prettierConfig,

  {
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      // CRITICAL: No console.log allowed
      'no-console': 'error',

      // TypeScript strict rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'error'
    }
  },
  {
    // Allow console in config files and scripts
    files: ['*.config.{js,mjs,ts}', 'scripts/**', 'prisma/**'],
    rules: {
      'no-console': 'off'
    }
  },
  {
    // Allow console and unused vars in verification test files
    files: ['**/*.verify.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/rules-of-hooks': 'off'
    }
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts'
  ])
])

export default eslintConfig
