import { describe, expect, it } from 'vitest'
import { cn } from './utils'

// The type styles are sizes, so they must survive next to a text colour and replace each other.

describe('cn with the new design tokens', () => {
  it('keeps a type style next to a text colour', () => {
    expect(cn('text-h1', 'text-muted-foreground')).toBe('text-h1 text-muted-foreground')
    expect(cn('text-small', 'text-ok')).toBe('text-small text-ok')
  })

  it('lets a later type style replace an earlier one', () => {
    expect(cn('text-body', 'text-small')).toBe('text-small')
    expect(cn('text-sm', 'text-display-xl')).toBe('text-display-xl')
  })

  it('drops an earlier leading-* that the type style sets', () => {
    expect(cn('leading-6', 'text-h2')).toBe('text-h2')
    expect(cn('text-h2', 'leading-6')).toBe('text-h2 leading-6')
  })

  it('merges the new radius and shadow names', () => {
    expect(cn('rounded-control', 'rounded-full')).toBe('rounded-full')
    expect(cn('rounded-md', 'rounded-card')).toBe('rounded-card')
    expect(cn('shadow-raised', 'shadow-overlay')).toBe('shadow-overlay')
  })

  it('still treats the new colours as colours', () => {
    expect(cn('text-ok', 'text-gap')).toBe('text-gap')
    expect(cn('bg-ok-soft', 'bg-gap-soft')).toBe('bg-gap-soft')
  })
})
