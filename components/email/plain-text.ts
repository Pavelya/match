import { inlinePlain, type EmailBlock, type EmailContent } from './content'
import { emailBaseUrl } from './tokens'

/*
 * The plain-text body every email sends beside its HTML (rebranding 4.7, D4.18), from the same
 * words: for mail apps that show text, and for spam filters. As the boards write it: the line
 * above the heading and the heading, a blank line between blocks, every link written out, then
 * the footer under "--".
 */
export function toPlainText(content: EmailContent): string {
  const baseUrl = emailBaseUrl()
  const top = content.eyebrow ? `${content.eyebrow}\n${content.heading}` : content.heading
  const footer = [
    '--',
    'IB Match connects IB students with university programs worldwide.',
    `Terms of Service: ${baseUrl}/terms`,
    `Privacy Policy: ${baseUrl}/privacy`
  ].join('\n')

  return [top, ...content.blocks.map(blockPlain), footer].join('\n\n')
}

function blockPlain(block: EmailBlock): string {
  switch (block.type) {
    case 'text':
    case 'small':
      return block.plain ?? inlinePlain(block.content)
    case 'button':
      return block.plain === 'url' ? block.href : `${block.label}:\n${block.href}`
    case 'panel':
      return [
        block.title,
        block.intro,
        ...(block.list ?? []).map((item) => `- ${item}`),
        ...(block.rows ?? []).map(([label, value]) => `${label}: ${value}`),
        block.body,
        block.note
      ]
        .filter((line) => line !== undefined)
        .join('\n')
  }
}
