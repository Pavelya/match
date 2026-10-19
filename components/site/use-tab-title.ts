import { useEffect } from 'react'

/** The page's own title while one or more of these show; React can mount the next before the last goes */
let shown = 0
let pageTitle: string | null = null

/**
 * The tab says what happened while an error page or a 404 shows (rebranding 4.3, D4.15): "Something
 * went wrong", "Page not found". The prebuilt 404 has it from its metadata; a notFound() thrown
 * inside a page, and every error page, set it here. When the last one goes, a retry that worked
 * renders the page's own title unchanged, so it comes back here; a navigation has already set the
 * next page's, which stays.
 */
export function useTabTitle(title: string) {
  useEffect(() => {
    const ours = `${title} | IB Match`
    if (shown++ === 0) pageTitle = document.title
    document.title = ours
    return () => {
      if (--shown === 0 && document.title === ours && pageTitle !== null) document.title = pageTitle
    }
  }, [title])
}
