/**
 * Markdown Content Component
 *
 * Renders markdown content using react-markdown with GitHub Flavored Markdown.
 * Used for legal pages (Terms, Privacy, FAQs, etc.)
 */

'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
  className?: string
}

export function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  return (
    <article
      className={`
                prose prose-neutral dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-0
                prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
                prose-p:leading-relaxed prose-p:mb-4
                prose-ul:my-4 prose-li:my-1
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                prose-strong:font-semibold
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                ${className}
            `}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  )
}
