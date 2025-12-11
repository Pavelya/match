/**
 * Country Utilities
 *
 * Utility functions for country-related operations.
 */

/**
 * Convert ISO 3166-1 alpha-2 country code to flag emoji
 *
 * Uses Unicode regional indicator symbols. Each letter A-Z has a corresponding
 * regional indicator symbol, and combining two forms a country flag.
 *
 * @param code - ISO 3166-1 alpha-2 country code (e.g., "US", "DE", "GB")
 * @returns Flag emoji (e.g., "🇺🇸", "🇩🇪", "🇬🇧")
 */
export function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) {
    return '🏳️' // Default flag for invalid codes
  }

  const upperCode = code.toUpperCase()

  // Regional Indicator Symbol Letter A is at code point 127462 (0x1F1E6)
  // Regular 'A' is at code point 65
  // Offset is 127462 - 65 = 127397
  const OFFSET = 127397

  const firstChar = upperCode.charCodeAt(0) + OFFSET
  const secondChar = upperCode.charCodeAt(1) + OFFSET

  return String.fromCodePoint(firstChar, secondChar)
}

/**
 * Validate ISO 3166-1 alpha-2 country code format
 *
 * @param code - Country code to validate
 * @returns True if valid format (2 uppercase letters)
 */
export function isValidCountryCode(code: string): boolean {
  return /^[A-Z]{2}$/i.test(code)
}
