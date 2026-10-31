import { brand } from '@/lib/brand/config'

/*
 * The emails' colours (rebranding 4.7, board "D4.18 Emails", section 1): D1.1's tokens written as
 * hex, since mail apps don't read CSS variables. The light ones are inline on every element; the
 * dark ones replace them by class where a mail app reads `prefers-color-scheme` (Apple Mail,
 * Outlook for Mac). Gmail and Outlook.com ignore it and invert the light ones instead, so those
 * are drawn to hold up both ways: a solid button with its label in text, underlined links.
 */

export const EMAIL_LIGHT = {
  paper: '#F7F6F2',
  card: '#FFFFFF',
  edge: '#E3E1D9',
  panel: '#EFEEE8',
  /** Headings, the name, panel titles and values */
  ink: '#14161B',
  /** Text, the line above the heading, panel text */
  text: '#464B57',
  /** Small print and the footer */
  muted: '#686D79',
  brand: brand.colors.brand,
  onBrand: '#FFFFFF'
} as const

export const EMAIL_DARK: { [K in keyof typeof EMAIL_LIGHT]: string } = {
  paper: '#0E1014',
  card: '#161920',
  edge: '#2A2F3A',
  panel: '#1D2129',
  ink: '#F1F0EB',
  text: '#BBBFC9',
  muted: '#9095A2',
  brand: '#8E9BFF',
  onBrand: '#0B0E2B'
}

/** Mail apps can't load Geist. Repeated on cells, since some apps don't let one inherit it. */
export const EMAIL_FONT =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'

/** Where the emails' links point: the site, or a preview deployment's own address */
export function emailBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || 'https://www.ibmatch.com'
}

/*
 * The head's one stylesheet: the dark colours by class, and the phone's narrower padding (the
 * phone board). `!important`, because the light colours are inline.
 */
const d = EMAIL_DARK
export const EMAIL_CSS = [
  ':root{color-scheme:light dark;supported-color-schemes:light dark}',
  '@media (prefers-color-scheme:dark){',
  `.em-paper{background-color:${d.paper}!important}`,
  `.em-card{background-color:${d.card}!important;border-color:${d.edge}!important}`,
  `.em-panel{background-color:${d.panel}!important}`,
  `.em-ink{color:${d.ink}!important}`,
  `.em-text{color:${d.text}!important}`,
  `.em-muted{color:${d.muted}!important}`,
  `.em-link{color:${d.brand}!important}`,
  `.em-button{background-color:${d.brand}!important;color:${d.onBrand}!important}`,
  '}',
  '@media only screen and (max-width:600px){',
  '.em-page{padding:24px 12px 40px!important}',
  '.em-card{padding:28px 24px!important}',
  '.em-footer{padding:20px 24px 0!important}',
  '}'
].join('')
