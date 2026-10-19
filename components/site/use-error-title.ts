import { useEffect } from 'react'
import { ERROR_TITLE } from './error-words'

/**
 * The tab says what happened while an error page shows (rebranding 4.3, D4.15). A retry that works
 * renders the page's own title unchanged, so it comes back here; a navigation has already set the
 * next page's, which stays.
 */
export function useErrorTitle() {
  useEffect(() => {
    const previous = document.title
    const ours = `${ERROR_TITLE} | IB Match`
    document.title = ours
    return () => {
      if (document.title === ours) document.title = previous
    }
  }, [])
}
