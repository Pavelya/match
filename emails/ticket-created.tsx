/**
 * Ticket Created Confirmation Email Template
 *
 * Sent to users when they submit a support ticket.
 * Confirms receipt and provides ticket number for reference.
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
import { TicketCategory } from '@prisma/client'

interface TicketCreatedEmailProps {
  ticketNumber: string
  category: TicketCategory
  subject: string
  userName?: string
}

// App's primary blue color (from globals.css)
const PRIMARY_COLOR = '#3573E5'

// Map category enum to human-readable labels
const categoryLabels: Record<TicketCategory, string> = {
  ACCOUNT_ISSUE: 'Account Issue',
  TECHNICAL_PROBLEM: 'Technical Problem',
  MATCHING_QUESTION: 'Matching Question',
  SUBSCRIPTION_BILLING: 'Subscription & Billing',
  DATA_PRIVACY: 'Data & Privacy',
  FEATURE_REQUEST: 'Feature Request',
  OTHER: 'General Inquiry'
}

export default function TicketCreatedEmail({
  ticketNumber,
  category,
  subject,
  userName
}: TicketCreatedEmailProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ibmatch.com'

  return (
    <Html>
      <Head />
      <Preview>Support ticket {ticketNumber} received - IB Match</Preview>
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
          <Heading style={h1}>We&apos;ve Received Your Request</Heading>

          <Text style={text}>Hello{userName ? ` ${userName}` : ''},</Text>

          <Text style={text}>
            Thank you for contacting IB Match support. We&apos;ve received your request and will get
            back to you as soon as possible.
          </Text>

          <Section style={ticketBox}>
            <Text style={ticketLabel}>Your Ticket Number</Text>
            <Text style={ticketNumberStyle}>{ticketNumber}</Text>
            <Text style={ticketDetails}>
              <strong>Category:</strong> {categoryLabels[category]}
            </Text>
            <Text style={ticketDetails}>
              <strong>Subject:</strong> {subject}
            </Text>
          </Section>

          <Text style={text}>
            Please save your ticket number for reference. We typically respond within 24-48 hours
            during business days.
          </Text>

          <Text style={disclaimerText}>
            You don&apos;t need to reply to this email. We&apos;ll contact you at this email address
            when we have an update on your request.
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

const ticketBox = {
  backgroundColor: '#f0f7ff',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
  textAlign: 'center' as const
}

const ticketLabel = {
  color: '#767676',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 8px 0'
}

const ticketNumberStyle = {
  color: PRIMARY_COLOR,
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 16px 0',
  letterSpacing: '1px'
}

const ticketDetails = {
  color: '#484848',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '4px 0',
  textAlign: 'left' as const
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
