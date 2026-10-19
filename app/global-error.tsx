'use client'
/* eslint-disable @next/next/no-html-link-for-pages -- full page loads: the app that the router
   would navigate with is the part that failed */

import { useEffect, useRef, useTransition } from 'react'
import NextGlobalError from 'next/dist/client/components/builtin/global-error'
import { AlertTriangle } from 'lucide-react'
import { ERROR_TEXT, ERROR_TITLE } from '@/components/site/error-words'
import { brand } from '@/lib/brand/config'

/*
 * When the root layout itself fails (rebranding 4.3, board "D4.15 404 and error pages"): a bare
 * page with the logo, the error page's words and Try again, light or dark from the system. It
 * replaces the root layout, so it has no header or footer to draw, none of the site's styles or
 * fonts, and no way to ask for the preview: it follows the release flag, read when the app is built
 * (next.config.ts), and until release day Next's own page shows, as before. Home is a full page
 * load.
 */

interface GlobalErrorProps {
  error: Error & { digest?: string }
  retry: () => void
}

export default function GlobalError({ error, retry }: GlobalErrorProps) {
  if (process.env.NEW_UI_RELEASED !== 'true') return <NextGlobalError error={error} />
  return <BareErrorPage error={error} retry={retry} />
}

// The new design's colours, light and dark (04-design-system.md §1), and its type sizes. The
// title's serif falls back to the one Newsreader's own fallback is sized against.
const CSS = `
:root { color-scheme: light dark }
body { margin: 0; background: #f7f6f2; color: #14161b; font: 400 15px/24px ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased }
.top { padding: 20px 16px }
.logo { display: inline-flex; align-items: center; gap: 8px; height: 44px; border-radius: 6px; color: inherit; text-decoration: none; font-size: 17px; font-weight: 650; letter-spacing: -0.025em }
.main { max-width: 1288px; margin: 0 auto; box-sizing: border-box; padding: 24px 16px 80px }
.panel { max-width: 640px; display: flex; flex-direction: column; gap: 16px }
.tile { width: 44px; height: 44px; box-sizing: border-box; border-radius: 12px; border: 1px solid transparent; background: #fbe6e4; color: #b3261e; display: inline-flex; align-items: center; justify-content: center }
h1 { margin: 0; font: 500 30px/36px 'Times New Roman', Georgia, serif; letter-spacing: -0.01em; text-wrap: balance }
h1:focus { outline: none }
.text { margin: 0; font-size: 17px; line-height: 28px; color: #464b57 }
.actions { display: flex; flex-direction: column; gap: 10px; padding-top: 8px }
.button { height: 48px; box-sizing: border-box; padding: 0 24px; border-radius: 10px; font-family: inherit; font-size: 15px; line-height: 24px; display: inline-flex; align-items: center; justify-content: center; text-decoration: none; cursor: pointer }
.primary { border: 1px solid transparent; background: #2b3fd6; color: #ffffff; font-weight: 600 }
.primary:hover { background: #2233b4 }
.secondary { border: 1px solid #cfccc1; background: #ffffff; color: #14161b; font-weight: 500 }
.secondary:hover { border-color: #858277; background: #efeee8 }
.small { margin: 0; font-size: 13px; line-height: 18px; color: #464b57 }
.small a { color: #2b3fd6; font-weight: 500; text-underline-offset: 2px }
.reference { font-weight: 600; color: #14161b; font-variant-numeric: tabular-nums }
:focus-visible { outline: 2px solid #2b3fd6; outline-offset: 2px }
@media (min-width: 48rem) {
  .top { padding: 40px 48px }
  .main { padding: 48px 24px 120px }
  h1 { font-size: 34px; line-height: 40px }
  .actions { flex-direction: row; gap: 12px }
  .button { height: 52px; font-size: 17px }
}
@media (prefers-color-scheme: dark) {
  body { background: #0e1014; color: #f1f0eb }
  .tile { background: #3a1715; color: #ff8e85 }
  .text, .small { color: #bbbfc9 }
  .primary { background: #8e9bff; color: #0b0e2b }
  .primary:hover { background: #a6b0ff }
  .secondary { border-color: #3a404d; background: #161920; color: #f1f0eb }
  .secondary:hover { border-color: #6b7180; background: #1d2129 }
  .small a { color: #8e9bff }
  .reference { color: #f1f0eb }
  :focus-visible { outline-color: #8e9bff }
}
`

function BareErrorPage({ error, retry }: GlobalErrorProps) {
  const [trying, startTrying] = useTransition()
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    heading.current?.focus()
  }, [])

  return (
    <html lang="en">
      <head>
        <title>{`${ERROR_TITLE} | IB Match`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </head>
      <body>
        <div className="top">
          <a href="/" aria-label="IB Match home" className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element -- an SVG at its own size */}
            <img src={brand.mark} alt="" width={28} height={28} />
            {brand.name}
          </a>
        </div>
        <main className="main">
          <div className="panel">
            <span aria-hidden="true" className="tile">
              <AlertTriangle size={24} strokeWidth={1.75} />
            </span>
            <h1 ref={heading} tabIndex={-1}>
              {ERROR_TITLE}
            </h1>
            <p className="text">{ERROR_TEXT}</p>
            <div className="actions">
              <button
                type="button"
                aria-busy={trying || undefined}
                className="button primary"
                onClick={() => startTrying(retry)}
              >
                {trying ? 'Trying again…' : 'Try again'}
              </button>
              <a href="/" className="button secondary">
                Home
              </a>
            </div>
            <p className="small">
              If it keeps happening, <a href="/contact">contact us</a>
              {error.digest ? (
                <>
                  {' '}
                  and quote this reference: <span className="reference">{error.digest}</span>.
                </>
              ) : (
                '.'
              )}
            </p>
          </div>
        </main>
      </body>
    </html>
  )
}
