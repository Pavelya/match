/**
 * Markdown Help Popup Component
 *
 * Small help dialog showing markdown formatting options.
 * Can be opened/closed without taking up page real estate.
 */

'use client'

import { useState } from 'react'
import { HelpCircle, X } from 'lucide-react'

export function MarkdownHelpButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Markdown help"
      >
        <HelpCircle className="h-4 w-4" />
        Formatting Help
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          {/* Popup */}
          <div className="absolute left-0 top-full mt-2 z-50 w-80 rounded-lg border bg-card p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-sm">Markdown Quick Reference</h4>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                <code className="bg-muted px-1 rounded"># Heading 1</code>
                <span className="text-muted-foreground">Main title</span>

                <code className="bg-muted px-1 rounded">## Heading 2</code>
                <span className="text-muted-foreground">Section</span>

                <code className="bg-muted px-1 rounded">### Heading 3</code>
                <span className="text-muted-foreground">Subsection</span>

                <code className="bg-muted px-1 rounded">**bold**</code>
                <span className="text-muted-foreground">Bold text</span>

                <code className="bg-muted px-1 rounded">*italic*</code>
                <span className="text-muted-foreground">Italic text</span>

                <code className="bg-muted px-1 rounded">[text](url)</code>
                <span className="text-muted-foreground">Link</span>

                <code className="bg-muted px-1 rounded">- item</code>
                <span className="text-muted-foreground">Bullet list</span>

                <code className="bg-muted px-1 rounded">1. item</code>
                <span className="text-muted-foreground">Numbered list</span>

                <code className="bg-muted px-1 rounded">&gt; quote</code>
                <span className="text-muted-foreground">Blockquote</span>

                <code className="bg-muted px-1 rounded">---</code>
                <span className="text-muted-foreground">Horizontal line</span>
              </div>

              <p className="text-muted-foreground pt-2 border-t mt-2">
                Leave a blank line between paragraphs.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
