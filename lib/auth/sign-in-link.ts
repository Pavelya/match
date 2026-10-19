/**
 * How long an emailed sign-in link works (rebranding 4.3, board "D4.2 Sign-in", decided by the
 * owner on 19 October 2026). The Resend provider's `maxAge` and every word that tells a student
 * the time come from here: the sign-in card, "Check your email", both sign-in emails and their
 * plain-text bodies. Before this, nothing set it, so Auth.js's default of 24 hours applied while
 * the page and the emails said 10 minutes and "Check your email" said 15.
 */
export const SIGN_IN_LINK_MINUTES = 10

/** In seconds, as the provider's `maxAge` takes it */
export const SIGN_IN_LINK_MAX_AGE = SIGN_IN_LINK_MINUTES * 60

/** "10 minutes", for a sentence */
export const SIGN_IN_LINK_LIFETIME = `${SIGN_IN_LINK_MINUTES} minutes`
