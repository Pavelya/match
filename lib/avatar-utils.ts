/**
 * Avatar Utilities
 *
 * Utility functions for computing avatar colors and initials.
 * These are intentionally NOT 'use client' so they can be used in server components.
 */

// Avatar background colors - carefully selected to:
// 1. Have good contrast with white text
// 2. Work well with the app's primary blue (#3573E5)
// 3. Be visually distinct from each other
const avatarColors = [
  '#3573E5', // Primary blue
  '#10B981', // Emerald green
  '#8B5CF6', // Violet
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#6366F1', // Indigo
  '#F97316' // Orange
]

/**
 * Generate a consistent color for a user based on their email
 * Uses a simple hash to ensure the same email always gets the same color
 * Safe to call from server components
 */
export function getAvatarColor(email?: string | null): string {
  if (!email) return avatarColors[0]
  let hash = 0
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % avatarColors.length
  return avatarColors[index]
}

/**
 * Get the initial letter for avatar fallback
 * Safe to call from server components
 */
export function getAvatarInitial(email?: string | null, name?: string | null): string {
  if (name && name.length > 0) {
    return name.charAt(0).toUpperCase()
  }
  if (email && email.length > 0) {
    return email.charAt(0).toUpperCase()
  }
  return '?'
}
