/**
 * Ticket Resolved Notification Email Template
 *
 * Sent to users when an admin resolves their support ticket.
 * Includes the admin's response to their inquiry.
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

interface TicketResolvedEmailProps {
  ticketNumber: string
  category: TicketCategory
  subject: string
  adminResponse: string
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

export default function TicketResolvedEmail({
  ticketNumber,
  category,
  subject,
  adminResponse,
  userName
}: TicketResolvedEmailProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ibmatch.com'

  return (
    <Html>
      <Head />
      <Preview>Your support ticket {ticketNumber} has been resolved - IB Match</Preview>
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
          <Heading style={h1}>Your Request Has Been Resolved</Heading>

          <Text style={text}>Hello{userName ? ` ${userName}` : ''},</Text>

          <Text style={text}>
            Good news! Your support ticket has been reviewed and resolved by our team.
          </Text>

          <Section style={ticketBox}>
            <Text style={ticketLabel}>Ticket</Text>
            <Text style={ticketNumberStyle}>{ticketNumber}</Text>
            <Text style={ticketDetails}>
              <strong>Category:</strong> {categoryLabels[category]}
            </Text>
            <Text style={ticketDetails}>
              <strong>Subject:</strong> {subject}
            </Text>
          </Section>

          <Section style={responseBox}>
            <Text style={responseLabel}>Our Response</Text>
            <Text style={responseText}>{adminResponse}</Text>
          </Section>

          <Text style={text}>
            If you have any further questions or if this doesn&apos;t fully address your concern,
            please don&apos;t hesitate to submit a new support request.
          </Text>

          <Text style={disclaimerText}>
            Thank you for using IB Match. We appreciate your patience and feedback.
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
  backgroundColor: '#f5f5f7',
  borderRadius: '8px',
  padding: '20px 24px',
  margin: '24px 0',
  textAlign: 'center' as const
}

const ticketLabel = {
  color: '#767676',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 4px 0'
}

const ticketNumberStyle = {
  color: '#222',
  fontSize: '20px',
  fontWeight: '700',
  margin: '0 0 12px 0',
  letterSpacing: '0.5px'
}

const ticketDetails = {
  color: '#484848',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '4px 0',
  textAlign: 'left' as const
}

const responseBox = {
  backgroundColor: '#f0f7ff',
  borderLeft: `4px solid ${PRIMARY_COLOR}`,
  borderRadius: '0 8px 8px 0',
  padding: '20px 24px',
  margin: '24px 0'
}

const responseLabel = {
  color: PRIMARY_COLOR,
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 12px 0'
}

const responseText = {
  color: '#484848',
  fontSize: '15px',
  lineHeight: '26px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const
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
