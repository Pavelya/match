import { Column, Img, Row, Section } from '@react-email/components'
import { brand } from '@/lib/brand/config'
import { emailBrand } from '@/lib/brand/email'

/**
 * The top of every email. From release day it is the mark at 40px, left-aligned, beside the name
 * as text ("D1.5 Logo: Lens", rebranding 1.3): mail apps in dark mode recolour text but never
 * images, so the name can't be drawn into the PNG. Until then, today's centred 60px logo.
 */
export function EmailHeader({ baseUrl }: { baseUrl: string }) {
  const { newUi, logo } = emailBrand()

  if (!newUi) {
    return (
      <Section style={legacyLogoContainer}>
        <Img src={`${baseUrl}${logo}`} width="60" height="60" alt={brand.name} style={legacyLogo} />
      </Section>
    )
  }

  return (
    <Section style={header}>
      <Row>
        <Column width="40" style={markCell}>
          {/* The name beside it says it */}
          <Img src={`${baseUrl}${logo}`} width="40" height="40" alt="" style={mark} />
        </Column>
        <Column style={name}>{brand.name}</Column>
      </Row>
    </Section>
  )
}

const legacyLogoContainer = {
  textAlign: 'center' as const,
  marginBottom: '24px'
}

const legacyLogo = {
  display: 'inline-block'
}

const header = {
  marginBottom: '32px'
}

const markCell = {
  width: '40px',
  verticalAlign: 'middle' as const
}

const mark = {
  display: 'block'
}

// The emails' own font stack: mail apps can't load Geist. Repeated here because some mail apps
// don't let a table cell inherit the body's font.
const name = {
  paddingLeft: '12px',
  verticalAlign: 'middle' as const,
  color: '#14161B',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: '22px',
  lineHeight: '28px',
  fontWeight: '600',
  letterSpacing: '-0.02em'
}
