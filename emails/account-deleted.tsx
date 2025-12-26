/**
 * Account Deleted Notification Email Template
 *
 * Sent to students when an admin deletes their account.
 * Confirms the deletion and provides contact information for questions.
 *
 * Styled consistently with IB Match branding using the primary blue color.
 */

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text
} from '@react-email/components'

interface AccountDeletedEmailProps {
  userName?: string
}

// App's primary blue color (from globals.css)
const PRIMARY_COLOR = '#3573E5'

export default function AccountDeletedEmail({ userName }: AccountDeletedEmailProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ibmatch.com'

  return (
    <Html>
      <Head />
      <Preview>Your IB Match account has been deleted</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={`${baseUrl}/logo-email.png`}
              width="60"
              height="60"
              alt="IB Match"
              style={logo}
            />
          </Section>
          <Heading style={h1}>Account Deleted</Heading>

          <Text style={text}>Hello{userName ? ` ${userName}` : ''},</Text>

          <Text style={text}>
            This email confirms that your IB Match account has been deleted by our platform
            administrator.
          </Text>

          <Section style={infoBox}>
            <Text style={infoTitle}>What this means</Text>
            <Text style={infoText}>
              All your personal information has been permanently removed from our system, including:
            </Text>
            <ul style={listStyle}>
              <li style={listItem}>Your account and login credentials</li>
              <li style={listItem}>Your IB academic profile and course data</li>
              <li style={listItem}>Your saved programs and preferences</li>
              <li style={listItem}>Any support tickets you submitted</li>
            </ul>
          </Section>

          <Text style={text}>
            If you believe this was done in error or have any questions, please contact us at{' '}
            <Link href="mailto:support@ibmatch.com" style={linkStyle}>
              support@ibmatch.com
            </Link>
            .
          </Text>

          <Text style={disclaimerText}>
            We&apos;re sorry to see you go. If you&apos;d like to use IB Match again in the future,
            you&apos;re welcome to create a new account at any time.
          </Text>

          <Hr style={hr} />

          <Text style={footerDescription}>
            IB Match helps connect IB students with university programs worldwide.
          </Text>

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

const logoContainer = {
  textAlign: 'center' as const,
  marginBottom: '24px'
}

const logo = {
  display: 'inline-block'
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

const infoBox = {
  backgroundColor: '#f5f5f7',
  borderRadius: '8px',
  padding: '20px 24px',
  margin: '24px 0'
}

const infoTitle = {
  color: '#222',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 12px 0'
}

const infoText = {
  color: '#484848',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 12px 0'
}

const listStyle = {
  margin: '0',
  paddingLeft: '20px'
}

const listItem = {
  color: '#484848',
  fontSize: '14px',
  lineHeight: '24px'
}

const disclaimerText = {
  color: '#767676',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '24px 0 0 0'
}

const hr = {
  borderColor: '#e5e5e5',
  borderTop: '1px solid #e5e5e5',
  margin: '32px 0 24px 0'
}

const footerDescription = {
  color: '#9ca299',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 16px 0'
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
