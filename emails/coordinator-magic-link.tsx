/**
 * Coordinator Magic Link Sign-in Email Template
 *
 * Professional email template for IB Coordinator magic link authentication.
 * Contains coordinator-relevant messaging about student management and analytics.
 */

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text
} from '@react-email/components'

interface CoordinatorMagicLinkEmailProps {
  url: string
}

// App's primary blue color (from globals.css)
const PRIMARY_COLOR = '#3573E5'

export default function CoordinatorMagicLinkEmail({ url }: CoordinatorMagicLinkEmailProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ibmatch.com'

  return (
    <Html>
      <Head />
      <Preview>Sign in to IB Match Coordinator Dashboard</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Sign in to IB Match</Heading>

          <Text style={text}>Hello,</Text>

          <Text style={text}>
            Click the button below to securely sign in to your IB Match Coordinator account. This
            link will expire in 10 minutes.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={url}>
              Sign in to IB Match
            </Button>
          </Section>

          <Text style={text}>
            IB Match empowers you to guide your students through their university journey. Access
            your dashboard to manage student profiles, view analytics, and help your IB students
            find the best programs for their academic achievements.
          </Text>

          <Text style={disclaimerText}>
            If you didn&apos;t request this link, you can safely ignore this email.
          </Text>

          <Hr style={hr} />

          <Text style={footerCopyright}>
            © {new Date().getFullYear()} IB Match. All rights reserved.
          </Text>

          <Text style={footerLinks}>
            <Link href={`${baseUrl}/terms`} style={linkStyle}>
              Terms And Conditions
            </Link>
            {' · '}
            <Link href={`${baseUrl}/privacy`} style={linkStyle}>
              Privacy Policy
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// Clean, professional styling matching IB Match brand
const main = {
  backgroundColor: '#f5f5f7',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'
}

const container = {
  backgroundColor: '#ffffff',
  margin: '40px auto',
  padding: '40px 48px',
  maxWidth: '560px',
  borderRadius: '8px'
}

const h1 = {
  color: '#222',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 32px 0',
  padding: '0',
  lineHeight: '32px'
}

const text = {
  color: '#484848',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0'
}

const disclaimerText = {
  color: '#767676',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '24px 0 0 0'
}

const buttonContainer = {
  padding: '24px 0',
  textAlign: 'center' as const
}

const button = {
  backgroundColor: PRIMARY_COLOR,
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 48px'
}

const hr = {
  borderColor: '#e5e5e5',
  borderTop: '1px solid #e5e5e5',
  margin: '32px 0 24px 0'
}

const footerCopyright = {
  color: '#9ca299',
  fontSize: '13px',
  lineHeight: '20px',
  margin: '0 0 8px 0'
}

const footerLinks = {
  color: '#9ca299',
  fontSize: '13px',
  lineHeight: '20px',
  margin: '0'
}

const linkStyle = {
  color: PRIMARY_COLOR,
  textDecoration: 'underline'
}
