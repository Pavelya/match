import { useEffect } from 'react'

/**
 * The tab says what happened while an error page or a 404 shows (rebranding 4.3, D4.15): "Something
 * went wrong", "Page not found". The prebuilt 404 has it from its metadata; a notFound() thrown
 * inside a page, and every error page, set it here. A retry that works renders the page's own
 * title unchanged, so it comes back here; a navigation has already set the next page's, which stays.
 */
export function useTabTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    const ours = `${title} | IB Match`
    document.title = ours
    return () => {
      if (document.title === ours) document.title = previous
    }
  }, [title])
}
