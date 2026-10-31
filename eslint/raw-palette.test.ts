import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'

// The guard against raw palette classes (rebranding 4.4), through the repo's own ESLint config

const eslint = new ESLint({ cwd: process.cwd() })

async function paletteErrors(code: string, filePath: string): Promise<number> {
  const [result] = await eslint.lintText(code, { filePath })
  return result.messages.filter((m) => m.ruleId === 'no-restricted-syntax').length
}

describe('the raw palette guard', () => {
  it('fails on a palette colour with a shade, in a class list or a template', async () => {
    const code = [
      'export const a = <p className="mt-2 text-blue-600">x</p>',
      "export const b = 'hover:bg-gray-50 border-t-red-200'",
      'export const c = (on: boolean) => `px-2 ${on ? "" : ""} ring-indigo-500/40`'
    ].join('\n')
    expect(await paletteErrors(code, 'components/example/Example.tsx')).toBe(3)
    expect(await paletteErrors(code, 'app/some-page/page.tsx')).toBe(3)
  }, 30_000)

  it('passes the tokens, the lime token and arbitrary values', async () => {
    const code = [
      'export const a = <p className="text-primary bg-muted text-ok border-line-3">x</p>',
      "export const b = 'bg-lime text-on-lime bg-[#131314] text-small'",
      "export const c = 'grey-blue-600-ish text'"
    ].join('\n')
    expect(await paletteErrors(code, 'components/example/Example.tsx')).toBe(0)
  }, 30_000)

  it("leaves staff pages and today's design, which cleanup deletes, to themselves", async () => {
    const code = 'export const a = <p className="text-blue-600">x</p>'
    expect(await paletteErrors(code, 'components/admin/Example.tsx')).toBe(0)
    expect(await paletteErrors(code, 'app/study-in-uk-with-ib-diploma/UKContent.tsx')).toBe(0)
    expect(
      await paletteErrors(
        code,
        'app/auth/accept-student-invite/[token]/AcceptStudentInviteForm.tsx'
      )
    ).toBe(0)
    // A guide's data, beside today's page, is checked
    expect(
      await paletteErrors(
        "export const a = 'text-blue-600'",
        'app/study-in-uk-with-ib-diploma/guide.ts'
      )
    ).toBe(1)
  }, 30_000)
})
