import type { CSSProperties } from 'react'
import { Button, Head, Html, Preview } from '@react-email/components'
import { EmailHeader } from './EmailHeader'
import type { EmailBlock, EmailContent, Inline } from './content'
import { EMAIL_CSS, EMAIL_FONT, EMAIL_LIGHT as c, emailBaseUrl } from './tokens'

/*
 * One layout for every email in the new design (rebranding 4.7, board "D4.18 Emails", section 1,
 * approved 20 October 2026): the paper around a centred 560px column, the card with the header,
 * the line above the heading, the one h1, then the blocks, and the footer under the card. Left-
 * aligned, as the site's cards are. Tables for the structure, so classic Outlook keeps it.
 */
export function EmailLayout({ content, newUi }: { content: EmailContent; newUi?: boolean }) {
  const baseUrl = emailBaseUrl()

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <style dangerouslySetInnerHTML={{ __html: EMAIL_CSS }} />
      </Head>
      <body className="em-paper" style={body}>
        <Preview>{content.preview}</Preview>
        <table {...presentation} className="em-paper" style={paper}>
          <tbody>
            <tr>
              <td className="em-page" style={page}>
                <table {...presentation} align="center" style={column}>
                  <tbody>
                    <tr>
                      <td className="em-card" style={card}>
                        <EmailHeader baseUrl={baseUrl} newUi={newUi} />
                        {content.eyebrow && (
                          <p className="em-text" style={eyebrow}>
                            {content.eyebrow}
                          </p>
                        )}
                        <h1 className="em-ink" style={heading}>
                          {content.heading}
                        </h1>
                        {content.blocks.map((block, i) => (
                          <Block key={i} block={block} />
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td className="em-footer em-muted" style={footer}>
                        <p style={footerLine}>
                          IB Match connects IB students with university programs worldwide.
                        </p>
                        <p style={footerLine}>
                          <a href={`${baseUrl}/terms`} className="em-link" style={link}>
                            Terms of Service
                          </a>
                          {' · '}
                          <a href={`${baseUrl}/privacy`} className="em-link" style={link}>
                            Privacy Policy
                          </a>
                        </p>
                        <p style={{ margin: 0 }}>
                          © {new Date().getFullYear()} IB Match. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </Html>
  )
}

function Block({ block }: { block: EmailBlock }) {
  switch (block.type) {
    case 'text':
      return (
        <p className="em-text" style={text}>
          <Inlines content={block.content} />
        </p>
      )
    case 'small':
      return (
        <p className="em-muted" style={small}>
          <Inlines content={block.content} />
        </p>
      )
    case 'button':
      return (
        <>
          <div style={buttonRow}>
            <Button href={block.href} className="em-button" style={button}>
              {block.label}
            </Button>
          </div>
          {block.writeOut && (
            <p className="em-muted" style={writtenOut}>
              {block.writeOutLabel ?? 'Button not working? Paste this link into your browser:'}
              <br />
              <a href={block.href} className="em-link" style={{ ...link, wordBreak: 'break-all' }}>
                {block.href}
              </a>
            </p>
          )}
        </>
      )
    case 'panel':
      return (
        <div className="em-panel" style={panel}>
          <p className="em-ink" style={panelTitle}>
            {block.title}
          </p>
          {block.intro && (
            <p className="em-text" style={panelText}>
              {block.intro}
            </p>
          )}
          {block.list && (
            <ul className="em-text" style={panelList}>
              {block.list.map((item) => (
                <li key={item} style={{ margin: '2px 0' }}>
                  {item}
                </li>
              ))}
            </ul>
          )}
          {block.rows && (
            <table {...presentation} style={rows}>
              <tbody>
                {block.rows.map(([label, value]) => (
                  <tr key={label}>
                    <td className="em-text" style={rowLabel}>
                      {label}
                    </td>
                    <td className="em-ink" style={rowValue}>
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {block.body && (
            <p className="em-ink" style={panelBody}>
              {block.body}
            </p>
          )}
          {block.note && (
            <p className="em-text" style={panelNote}>
              {block.note}
            </p>
          )}
        </div>
      )
  }
}

function Inlines({ content }: { content: Inline[] }) {
  return content.map((part, i) =>
    typeof part === 'string' ? (
      part
    ) : (
      <a key={i} href={part.href} className="em-link" style={link}>
        {part.text}
      </a>
    )
  )
}

const presentation = {
  role: 'presentation',
  width: '100%',
  border: 0,
  cellPadding: 0,
  cellSpacing: 0
} as const

const body: CSSProperties = { margin: 0, padding: 0, backgroundColor: c.paper }

const paper: CSSProperties = { backgroundColor: c.paper }

const page: CSSProperties = { padding: '24px 20px 40px', fontFamily: EMAIL_FONT }

const column: CSSProperties = { maxWidth: '560px', margin: '0 auto' }

// Classic Outlook ignores the corners and draws it square
const card: CSSProperties = {
  backgroundColor: c.card,
  border: `1px solid ${c.edge}`,
  borderRadius: '16px',
  padding: '40px',
  fontFamily: EMAIL_FONT
}

const eyebrow: CSSProperties = {
  margin: '0 0 8px',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 600,
  color: c.text
}

// A 56-character school wraps, never cuts
const heading: CSSProperties = {
  margin: '0 0 16px',
  fontSize: '26px',
  lineHeight: '32px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  color: c.ink,
  overflowWrap: 'anywhere'
}

const text: CSSProperties = {
  margin: '0 0 16px',
  fontSize: '16px',
  lineHeight: '26px',
  color: c.text
}

const small: CSSProperties = {
  margin: '0 0 12px',
  fontSize: '14px',
  lineHeight: '22px',
  color: c.muted
}

const link: CSSProperties = {
  color: c.brand,
  textDecoration: 'underline',
  textUnderlineOffset: '3px'
}

const buttonRow: CSSProperties = { margin: '8px 0 20px' }

const button: CSSProperties = {
  display: 'inline-block',
  padding: '12px 24px',
  borderRadius: '10px',
  backgroundColor: c.brand,
  color: c.onBrand,
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 600,
  textDecoration: 'none'
}

const writtenOut: CSSProperties = { ...small, margin: '0 0 20px' }

const panel: CSSProperties = {
  margin: '8px 0 24px',
  padding: '20px 24px',
  borderRadius: '12px',
  backgroundColor: c.panel
}

const panelTitle: CSSProperties = {
  margin: '0 0 8px',
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 600,
  color: c.ink
}

const panelText: CSSProperties = {
  margin: '0 0 8px',
  fontSize: '15px',
  lineHeight: '24px',
  color: c.text
}

const panelList: CSSProperties = {
  margin: 0,
  paddingLeft: '20px',
  fontSize: '15px',
  lineHeight: '24px',
  color: c.text
}

const panelNote: CSSProperties = { ...panelText, margin: '8px 0 0' }

const rows: CSSProperties = { borderCollapse: 'collapse', fontSize: '15px', lineHeight: '24px' }

const rowLabel: CSSProperties = {
  padding: '2px 16px 2px 0',
  width: '96px',
  verticalAlign: 'top',
  color: c.text
}

const rowValue: CSSProperties = {
  padding: '2px 0',
  verticalAlign: 'top',
  color: c.ink,
  overflowWrap: 'anywhere'
}

// The reply keeps its line breaks and is never cut
const panelBody: CSSProperties = {
  margin: 0,
  fontSize: '15px',
  lineHeight: '24px',
  color: c.ink,
  whiteSpace: 'pre-wrap'
}

const footer: CSSProperties = {
  padding: '20px 40px 0',
  fontFamily: EMAIL_FONT,
  fontSize: '14px',
  lineHeight: '22px',
  color: c.muted
}

const footerLine: CSSProperties = { margin: '0 0 8px' }
