import type { SubscriptionStatus, SubscriptionTier } from '@prisma/client'
import { describe, expect, it } from 'vitest'

import {
  FREEMIUM_MAX_STUDENTS,
  getCoordinatorAccess,
  getRemainingStudentInvites,
  isFeatureLocked,
  type AccessLevel
} from './access-control'

type Feature = Parameters<typeof isFeatureLocked>[0]

/**
 * Every tier and status combination, and the access it must grant.
 *
 * Typed as a Record over the Prisma enums, so adding a tier or a status fails
 * `tsc` here until someone decides what access the new value grants.
 */
const EXPECTED_ACCESS: Record<SubscriptionTier, Record<SubscriptionStatus, AccessLevel>> = {
  // VIP is the free tier granted to partner schools; its Stripe fields are null,
  // so the status must not take access away.
  VIP: { ACTIVE: 'full', INACTIVE: 'full', CANCELLED: 'full' },
  REGULAR: { ACTIVE: 'full', INACTIVE: 'freemium', CANCELLED: 'freemium' }
}

const COMBINATIONS = Object.entries(EXPECTED_ACCESS).flatMap(([tier, statuses]) =>
  Object.entries(statuses).map(([status, accessLevel]) => ({
    tier: tier as SubscriptionTier,
    status: status as SubscriptionStatus,
    accessLevel
  }))
)

// A Record for the same reason as above: a new feature name fails `tsc` here.
const FEATURES = Object.keys({
  advancedAnalytics: true,
  editStudentData: true,
  bulkExport: true,
  inviteCoordinators: true,
  unlimitedStudents: true
} satisfies Record<Feature, true>) as Feature[]

const accessFor = (tier: SubscriptionTier, status: SubscriptionStatus) =>
  getCoordinatorAccess({ subscriptionTier: tier, subscriptionStatus: status })

const fullAccess = accessFor('REGULAR', 'ACTIVE')
const freemiumAccess = accessFor('REGULAR', 'INACTIVE')

describe('getCoordinatorAccess', () => {
  it.each(COMBINATIONS)('$tier + $status grants $accessLevel access', (row) => {
    const access = accessFor(row.tier, row.status)

    expect(access.accessLevel).toBe(row.accessLevel)
    expect(access.hasFullAccess).toBe(row.accessLevel === 'full')
  })

  it.each(COMBINATIONS)('$tier + $status reports tier and status as given', (row) => {
    const access = accessFor(row.tier, row.status)

    expect(access.isVIP).toBe(row.tier === 'VIP')
    expect(access.hasActiveSubscription).toBe(row.status === 'ACTIVE')
  })

  it.each(COMBINATIONS.filter((row) => row.accessLevel === 'full'))(
    '$tier + $status unlocks every feature',
    (row) => {
      const access = accessFor(row.tier, row.status)

      expect(access).toMatchObject({
        maxStudents: null,
        canEditStudentData: true,
        canAccessAdvancedAnalytics: true,
        canInviteCoordinators: true,
        canBulkExport: true
      })
      expect(access.canInviteStudents(FREEMIUM_MAX_STUDENTS * 100)).toBe(true)
    }
  )

  it.each(COMBINATIONS.filter((row) => row.accessLevel === 'freemium'))(
    '$tier + $status locks every paid feature',
    (row) => {
      expect(accessFor(row.tier, row.status)).toMatchObject({
        maxStudents: FREEMIUM_MAX_STUDENTS,
        canEditStudentData: false,
        canAccessAdvancedAnalytics: false,
        canInviteCoordinators: false,
        canBulkExport: false
      })
    }
  )

  it('lets a freemium school invite up to the limit and no further', () => {
    expect(freemiumAccess.canInviteStudents(0)).toBe(true)
    expect(freemiumAccess.canInviteStudents(FREEMIUM_MAX_STUDENTS - 1)).toBe(true)
    expect(freemiumAccess.canInviteStudents(FREEMIUM_MAX_STUDENTS)).toBe(false)
    expect(freemiumAccess.canInviteStudents(FREEMIUM_MAX_STUDENTS + 1)).toBe(false)
  })

  it('keeps the freemium limit at 10 students', () => {
    // The number is also written out in UI copy, in app/coordinator/students/page.tsx
    // and app/coordinator/students/invite/InviteStudentForm.tsx. Change them together.
    expect(FREEMIUM_MAX_STUDENTS).toBe(10)
  })
})

describe('getRemainingStudentInvites', () => {
  it('is unlimited with full access', () => {
    expect(getRemainingStudentInvites(0, fullAccess)).toBeNull()
    expect(getRemainingStudentInvites(FREEMIUM_MAX_STUDENTS * 100, fullAccess)).toBeNull()
  })

  it('counts down to zero with freemium access', () => {
    expect(getRemainingStudentInvites(0, freemiumAccess)).toBe(FREEMIUM_MAX_STUDENTS)
    expect(getRemainingStudentInvites(4, freemiumAccess)).toBe(FREEMIUM_MAX_STUDENTS - 4)
    expect(getRemainingStudentInvites(FREEMIUM_MAX_STUDENTS, freemiumAccess)).toBe(0)
  })

  it('never goes negative when a school is already over the limit', () => {
    // A school that downgrades keeps the students it already has.
    expect(getRemainingStudentInvites(FREEMIUM_MAX_STUDENTS + 5, freemiumAccess)).toBe(0)
  })
})

describe('isFeatureLocked', () => {
  it.each(FEATURES)('%s is unlocked with full access', (feature) => {
    expect(isFeatureLocked(feature, fullAccess)).toBe(false)
  })

  it.each(FEATURES)('%s is locked with freemium access', (feature) => {
    expect(isFeatureLocked(feature, freemiumAccess)).toBe(true)
  })
})
