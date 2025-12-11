/**
 * Coordinator Invitation Email Template
 *
 * React Email template sent to coordinators when they are invited to a school.
 * Uses Airbnb-inspired styling consistent with magic-link.tsx.
 */

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
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

export default function CoordinatorInviteEmail({
  inviteUrl,
  schoolName,
  inviterName,
  expiresInDays = 7
}: CoordinatorInviteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You&apos;ve been invited to join {schoolName} on IB Match</Preview>
      <Body style={main}>
        <Container style={container}>
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

          <Text style={smallText}>
            This invitation will expire in {expiresInDays} days. If you didn&apos;t expect this
            invitation, you can safely ignore this email.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            IB Match helps connect IB students with university programs worldwide.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// Airbnb-inspired styling (consistent with magic-link.tsx)
const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '560px'
}

const h1 = {
  color: '#222',
  fontSize: '28px',
  fontWeight: '700',
  margin: '40px 0 20px',
  padding: '0',
  lineHeight: '32px',
  textAlign: 'center' as const
}

const text = {
  color: '#484848',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0'
}

const smallText = {
  color: '#767676',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '16px 0'
}

const buttonContainer = {
  padding: '27px 0 27px'
}

const button = {
  backgroundColor: '#FF385C',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '700',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '16px 20px'
}

const hr = {
  borderColor: '#ddd',
  marginTop: '48px'
}

const footer = {
  color: '#9ca299',
  fontSize: '14px',
  lineHeight: '24px'
}
