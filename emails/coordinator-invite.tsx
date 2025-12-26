/**
 * Coordinator Invitation Email Template
 *
 * Professional email template sent to coordinators when they are invited to a school.
 * Styled consistently with IB Match branding using the primary blue color.
 */

import {
  Body,
  Button,
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

interface CoordinatorInviteEmailProps {
  inviteUrl: string
  schoolName: string
  inviterName?: string
  expiresInDays: number
}

// App's primary blue color (from globals.css)
const PRIMARY_COLOR = '#3573E5'

export default function CoordinatorInviteEmail({
  inviteUrl,
  schoolName,
  inviterName,
  expiresInDays = 7
}: CoordinatorInviteEmailProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ibmatch.com'

  return (
    <Html>
      <Head />
      <Preview>You&apos;ve been invited to join {schoolName} on IB Match</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={`${baseUrl}/logo-restored.svg`}
              width="60"
              height="60"
              alt="IB Match"
              style={logo}
            />
          </Section>
          <Heading style={h1}>Join {schoolName} on IB Match</Heading>

          <Text style={text}>Hello,</Text>

          <Text style={text}>
            {inviterName ? `${inviterName} has` : 'You have been'} invited you to join{' '}
            <strong>{schoolName}</strong> as an IB Coordinator on IB Match.
          </Text>

          <Text style={text}>
            As a coordinator, you&apos;ll be able to manage students, view analytics, and help your
            students find the best university programs for their IB profiles.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={inviteUrl}>
              Accept Invitation
            </Button>
          </Section>

          <Text style={disclaimerText}>
            This invitation will expire in {expiresInDays} days. If you didn&apos;t expect this
            invitation, you can safely ignore this email.
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
