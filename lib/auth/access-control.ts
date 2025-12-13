/**
 * Access Control Helpers
 *
 * Functions to determine access levels for coordinators and other roles.
 * Used for feature gating based on school subscription tier/status.
 *
 * Access Level Logic:
 * - VIP schools: Full access to all coordinator features (FREE)
 * - REGULAR schools WITH active subscription: Full access (PAID)
 * - REGULAR schools WITHOUT subscription: Limited/freemium access
 */

import type { SubscriptionTier, SubscriptionStatus } from '@prisma/client'

/**
 * Access level returned by getCoordinatorAccess
 */
export type AccessLevel = 'full' | 'freemium'

/**
 * Result of coordinator access check
 */
export interface CoordinatorAccessResult {
  /** The access level - 'full' or 'freemium' */
  accessLevel: AccessLevel

  /** Whether the coordinator has full access (VIP or subscribed) */
  hasFullAccess: boolean

  /** Whether the school is VIP tier */
  isVIP: boolean

  /** Whether the school has an active subscription (for REGULAR tier) */
  hasActiveSubscription: boolean

  /** Maximum number of students allowed (unlimited for full access) */
  maxStudents: number | null

  /** Whether coordinator can invite more students */
  canInviteStudents: (currentCount: number) => boolean

  /** Whether coordinator can edit student data */
  canEditStudentData: boolean

  /** Whether coordinator can access advanced analytics */
  canAccessAdvancedAnalytics: boolean

  /** Whether coordinator can invite other coordinators */
  canInviteCoordinators: boolean

  /** Whether coordinator can perform bulk exports */
  canBulkExport: boolean
}

/**
 * Maximum students for freemium accounts
 */
export const FREEMIUM_MAX_STUDENTS = 10

/**
 * Determine the access level for a coordinator based on their school's subscription
 *
 * @param school - The school with subscription tier and status
 * @returns CoordinatorAccessResult with all access flags
 *
 * @example
 * ```ts
 * const school = await prisma.iBSchool.findUnique({ where: { id: schoolId } })
 * const access = getCoordinatorAccess(school)
 *
 * if (access.hasFullAccess) {
 *   // Show all features
 * } else {
 *   // Show upgrade prompts for locked features
 * }
 * ```
 */
export function getCoordinatorAccess(school: {
  subscriptionTier: SubscriptionTier
  subscriptionStatus: SubscriptionStatus
}): CoordinatorAccessResult {
  const isVIP = school.subscriptionTier === 'VIP'
  const hasActiveSubscription = school.subscriptionStatus === 'ACTIVE'

  // Full access if VIP OR if REGULAR with active subscription
  const hasFullAccess = isVIP || (school.subscriptionTier === 'REGULAR' && hasActiveSubscription)

  const accessLevel: AccessLevel = hasFullAccess ? 'full' : 'freemium'

  return {
    accessLevel,
    hasFullAccess,
    isVIP,
    hasActiveSubscription,

    // Student limits
    maxStudents: hasFullAccess ? null : FREEMIUM_MAX_STUDENTS,
    canInviteStudents: (currentCount: number) =>
      hasFullAccess || currentCount < FREEMIUM_MAX_STUDENTS,

    // Feature access
    canEditStudentData: hasFullAccess,
    canAccessAdvancedAnalytics: hasFullAccess,
    canInviteCoordinators: hasFullAccess,
    canBulkExport: hasFullAccess
  }
}

/**
 * Get the remaining student invites for a freemium account
 *
 * @param currentCount - Current number of students
 * @param access - The access result from getCoordinatorAccess
 * @returns Number of remaining invites, or null if unlimited
 */
export function getRemainingStudentInvites(
  currentCount: number,
  access: CoordinatorAccessResult
): number | null {
  if (access.hasFullAccess) {
    return null // Unlimited
  }
  return Math.max(0, FREEMIUM_MAX_STUDENTS - currentCount)
}

/**
 * Check if a feature is locked for a coordinator
 * Used for conditional rendering of upgrade prompts
 *
 * @param featureName - Name of the feature to check
 * @param access - The access result from getCoordinatorAccess
 * @returns Whether the feature is locked
 */
export function isFeatureLocked(
  featureName:
    | 'advancedAnalytics'
    | 'editStudentData'
    | 'bulkExport'
    | 'inviteCoordinators'
    | 'unlimitedStudents',
  access: CoordinatorAccessResult
): boolean {
  if (access.hasFullAccess) {
    return false // Nothing locked for full access
  }

  switch (featureName) {
    case 'advancedAnalytics':
      return !access.canAccessAdvancedAnalytics
    case 'editStudentData':
      return !access.canEditStudentData
    case 'bulkExport':
      return !access.canBulkExport
    case 'inviteCoordinators':
      return !access.canInviteCoordinators
    case 'unlimitedStudents':
      return access.maxStudents !== null
    default:
      return false
  }
}
