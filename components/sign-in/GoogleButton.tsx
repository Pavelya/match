/*
 * "Continue with Google", drawn to Google's rules (rebranding 4.3, board "D4.2 Sign-in"): white
 * with a #747775 edge in light, #131314 with a #8E918F edge in dark, the G in its own colours, on
 * a white disc in dark. Google's colours are fixed, so they are written out rather than taken
 * from the theme. The label is in the site's font, Geist 500 at 15px, rather than a typeface
 * loaded for three words. Hover lays Google's 8% of the label colour over the fill. Forced colours
 * draw the edge and keep the G's colours.
 */
export function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-13 w-full items-center justify-center gap-2.5 rounded-control border border-[#747775] bg-[#ffffff] px-3 text-[0.9375rem] leading-6 font-medium text-[#1f1f1f] transition-colors duration-180 ease-standard hover:bg-[#ededed] dark:border-[#8e918f] dark:bg-[#131314] dark:text-[#e3e3e3] dark:hover:bg-[#2a2a2b]"
    >
      <span
        aria-hidden="true"
        className="-ml-1 inline-flex size-7 items-center justify-center rounded-full dark:bg-[#ffffff]"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" className="forced-color-adjust-none">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      </span>
      Continue with Google
    </button>
  )
}

/** The rule between Google and the email: "Or continue with email" */
export function OrWithEmail() {
  return (
    <p className="flex items-center gap-3 text-small text-muted-foreground">
      <span aria-hidden="true" className="h-px flex-1 bg-border forced-colors:bg-[CanvasText]" />
      Or continue with email
      <span aria-hidden="true" className="h-px flex-1 bg-border forced-colors:bg-[CanvasText]" />
    </p>
  )
}
