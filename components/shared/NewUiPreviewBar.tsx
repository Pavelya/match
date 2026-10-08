/**
 * Shown on every page while the preview link has the new design on (rebranding task 0.1), so a
 * reviewer always knows which design is showing. The root layout renders it, and stops once
 * everyone has the new design. Deleted at cleanup (R.2).
 */
export function NewUiPreviewBar() {
  return (
    <aside
      aria-label="Design preview"
      className="flex items-center justify-center gap-2 border-b border-transparent bg-foreground px-4 py-1 text-sm text-background"
    >
      <span>New design preview</span>
      <span aria-hidden="true">·</span>
      <form action="/api/preview/exit" method="post">
        <button
          type="submit"
          className="rounded-sm px-2 py-1 font-medium underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          Exit
        </button>
      </form>
    </aside>
  )
}
