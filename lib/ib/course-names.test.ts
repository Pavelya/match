import { describe, expect, it } from 'vitest'
import { shortCourseName } from './course-names'

describe('shortCourseName', () => {
  it('shortens the long names the cards carry', () => {
    expect(shortCourseName('Mathematics: Analysis and Approaches')).toBe('Maths AA')
    expect(shortCourseName('Mathematics: Applications and Interpretation')).toBe('Maths AI')
    expect(shortCourseName('English A: Literature')).toBe('English A Lit')
    expect(shortCourseName('Spanish A: Language & Literature')).toBe('Spanish A Lang & Lit')
    expect(shortCourseName('Sports, Exercise and Health Science')).toBe('SEHS')
  })

  it('keeps any other name as it is', () => {
    expect(shortCourseName('Physics')).toBe('Physics')
    expect(shortCourseName('French ab initio')).toBe('French ab initio')
    expect(shortCourseName('A course added later')).toBe('A course added later')
  })
})
