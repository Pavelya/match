/*
 * The policy update notice's words (rebranding 4.6, board "D2.16 Policy update banner"): today's
 * sentence, naming the documents that changed, each a link to its page.
 */

/** Which published documents are newer than the ones the student accepted */
export interface PolicyUpdate {
  terms: boolean
  privacy: boolean
}

export interface PolicyDocument {
  title: string
  href: string
}

const DOCUMENTS = {
  terms: { title: 'Terms of Service', href: '/terms' },
  privacy: { title: 'Privacy Policy', href: '/privacy' }
} satisfies Record<keyof PolicyUpdate, PolicyDocument>

/** The changed documents, Terms first, and the verb that follows them ("has" for one, as today) */
export function updatedDocuments(update: PolicyUpdate): {
  documents: PolicyDocument[]
  verb: 'has' | 'have'
} {
  const documents = [
    ...(update.terms ? [DOCUMENTS.terms] : []),
    ...(update.privacy ? [DOCUMENTS.privacy] : [])
  ]
  return { documents, verb: documents.length > 1 ? 'have' : 'has' }
}

export type AcceptFailure = 'failed' | 'signedOut'

export const ACCEPT_FAILURE_WORDS: Record<AcceptFailure, string> = {
  failed: 'Your acceptance wasn’t saved. Check your connection and try again.',
  signedOut: 'You’ve been signed out, so your acceptance wasn’t saved.'
}

/** Which failure an answer from /api/consent/accept is: signed out on 401, any other otherwise */
export function acceptFailure(status: number): AcceptFailure {
  return status === 401 ? 'signedOut' : 'failed'
}
