/**
 * Whether the sign-in field holds an address the link can go to (rebranding 4.3, board "D4.2
 * Sign-in"): something, an @, a domain with a dot. "maya@example" is refused with "Enter an email
 * address like name@example.com", shown when the button is pressed, never while typing (D2.2).
 * Auth.js and Resend have the last word; this only catches what can't be an address.
 */
export function isEmailAddress(value: string): boolean {
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(value.trim())
}

export const EMAIL_ERROR = 'Enter an email address like name@example.com'
