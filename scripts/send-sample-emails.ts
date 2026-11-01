/**
 * One real send of each email to the owner's own inboxes (RELEASE_RUNBOOK.md step 9, rebranding
 * 4.7), since only a real send shows how each mail app darkens them. New design, sample data.
 *
 *   npx tsx scripts/send-sample-emails.ts                     lists them, sends nothing
 *   npx tsx scripts/send-sample-emails.ts --send a@b.com ...  sends all eight to each address
 *
 * The addresses stay on the command line so they are never committed. No database read. One Resend
 * batch, accepted whole or not at all; each run counts towards Resend's 100 a day. The client is
 * built here because `lib/email/client.ts` is server-only and `lib/env.ts` wants every variable.
 */
import 'dotenv/config'
import { Resend } from 'resend'
import { parseInboxes, renderSampleEmails } from './lib/sample-emails'

async function main() {
  const [flag, ...addresses] = process.argv.slice(2)
  const emails = await renderSampleEmails()

  for (const { name, subject, html } of emails) {
    const size = (Buffer.byteLength(html) / 1024).toFixed(1)
    console.log(`${name.padEnd(26)} ${size.padStart(4)} KB  ${subject}`)
  }

  if (flag !== '--send') {
    console.log('\nNothing sent. To send: --send followed by the addresses.')
    return
  }

  const inboxes = parseInboxes(addresses, emails.length)
  const from = process.env.EMAIL_FROM
  if (!process.env.RESEND_API_KEY || !from) {
    throw new Error('Missing RESEND_API_KEY or EMAIL_FROM in .env')
  }

  const { data, error } = await new Resend(process.env.RESEND_API_KEY).batch.send(
    inboxes.flatMap((to) =>
      emails.map(({ subject, html, text }) => ({ from, to, subject, html, text }))
    )
  )
  if (error || !data) throw new Error(`Resend refused the batch: ${error?.message}`)

  console.log(`\nResend accepted ${data.data.length} emails to ${inboxes.length} inboxes:`)
  console.log(data.data.map(({ id }) => id).join('\n'))
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
