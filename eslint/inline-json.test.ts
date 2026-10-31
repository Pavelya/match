import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'

// The guard against bare JSON.stringify written into a page as HTML (SEC-3), through the repo's
// own ESLint config

const eslint = new ESLint({ cwd: process.cwd() })

async function ruleErrors(code: string, filePath: string, ruleId: string): Promise<number> {
  const [result] = await eslint.lintText(code, { filePath })
  return result.messages.filter((m) => m.ruleId === ruleId).length
}

const RULE = 'local/no-unescaped-inline-json'

describe('the inline JSON guard', () => {
  it('fails on JSON.stringify as the __html of a script, anywhere in the app', async () => {
    const code = [
      'export const a = (x: unknown) => (',
      '  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />',
      ')'
    ].join('\n')
    expect(await ruleErrors(code, 'app/programs/[id]/page.tsx', RULE)).toBe(1)
    expect(await ruleErrors(code, 'components/detail/Example.tsx', RULE)).toBe(1)
    expect(await ruleErrors(code, 'app/admin/example/page.tsx', RULE)).toBe(1)
  }, 30_000)

  it('passes serializeJsonLd, and JSON.stringify anywhere else', async () => {
    const code = [
      "import { serializeJsonLd } from '@/lib/utils'",
      'export const a = (x: unknown) => (',
      '  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(x) }} />',
      ')',
      'export const body = (x: unknown) => JSON.stringify(x)'
    ].join('\n')
    expect(await ruleErrors(code, 'app/programs/[id]/page.tsx', RULE)).toBe(0)
  }, 30_000)

  it('leaves the raw palette guard working in the same files', async () => {
    // Both are set for student-facing files; neither may replace the other
    const code = [
      'export const a = (x: unknown) => (',
      '  <p className="text-blue-600">',
      '    <script dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />',
      '  </p>',
      ')'
    ].join('\n')
    expect(await ruleErrors(code, 'components/detail/Example.tsx', RULE)).toBe(1)
    expect(await ruleErrors(code, 'components/detail/Example.tsx', 'no-restricted-syntax')).toBe(1)
  }, 30_000)
})
