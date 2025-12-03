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

interface MagicLinkEmailProps {
  url: string
}

export default function MagicLinkEmail({ url }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Sign in to IB Match</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Sign in to IB Match</Heading>
          <Text style={text}>
            Click the button below to securely sign in to your IB Match account. This link will
            expire in 15 minutes.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={url}>
              Sign in to IB Match
            </Button>
          </Section>
          <Text style={text}>
            Or copy and paste this URL into your browser:{' '}
            <Link href={url} style={link}>
              {url}
            </Link>
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            If you didn&apos;t request this email, you can safely ignore it.
            <br />
            This link will expire in 15 minutes for your security.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// Airbnb-inspired styling
const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px'
}

const h1 = {
  color: '#222',
  fontSize: '32px',
  fontWeight: '700',
  margin: '40px 0',
  padding: '0',
  lineHeight: '36px'
}

const text = {
  color: '#484848',
  fontSize: '16px',
  lineHeight: '24px',
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
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '14px 20px'
}

const link = {
  color: '#FF385C',
  fontSize: '14px',
  textDecoration: 'underline'
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
