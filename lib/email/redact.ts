/**
 * The recipient as the email senders log it: the first two characters of the local part, then
 * the domain — `ab***@example.com` (MAINT 5.32). A local part of one or two characters keeps
 * one fewer, so the whole address is never logged.
 */
export function redactEmailAddress(address: string): string {
  const at = address.lastIndexOf('@')
  if (at < 1) return '***'
  const kept = address.slice(0, Math.min(2, at - 1))
  return `${kept}***${address.slice(at)}`
}
