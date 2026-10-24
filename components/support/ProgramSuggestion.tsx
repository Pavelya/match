'use client'

import { useId, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ds/button-variants'
import { FieldMessage, fieldClasses, fieldLabelClasses } from '@/components/ds/Field'
import { TextField } from '@/components/ds/Input'
import { cn } from '@/lib/utils'

/*
 * Support us' "Suggest a program" (rebranding 4.3, board "D4.14 Text pages"): today's two fields,
 * which fill an email for the student's own mail app to send, as today. Nothing is sent from here.
 */

function mailto(programUrl: string, details: string): string {
  const subject = encodeURIComponent('New Program Submission Request')
  const body = encodeURIComponent(
    `Hi IB Match Team,

I'd like to suggest adding the following program to the platform:

Program URL: ${programUrl || '[Please add program URL]'}

Additional Details:
${details || '[Please add any additional details about the program]'}

Thank you for considering this request!`
  )
  return `mailto:support@ibmatch.com?subject=${subject}&body=${body}`
}

export function ProgramSuggestion() {
  const id = useId()
  const [programUrl, setProgramUrl] = useState('')
  const [details, setDetails] = useState('')

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="flex max-w-180 flex-col gap-5 rounded-card border border-border bg-card p-5 md:p-7"
    >
      <TextField
        id={`${id}-url`}
        label="Program URL (required)"
        type="url"
        name="program-url"
        placeholder="https://university.edu/program-page"
        value={programUrl}
        onChange={(event) => setProgramUrl(event.target.value)}
        hint="Link to the official program page on the university website"
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-details`} className={fieldLabelClasses}>
          Additional details (optional)
        </label>
        <textarea
          id={`${id}-details`}
          name="details"
          rows={4}
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          placeholder="Program name, why you think it should be added, any IB requirements you know about..."
          className={cn(fieldClasses, 'h-auto min-h-38 resize-y py-3')}
        />
      </div>
      <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:gap-5">
        <a
          href={mailto(programUrl, details)}
          className={buttonVariants({ size: 'lg', className: 'max-md:w-full' })}
        >
          Open email to submit
          <ExternalLink aria-hidden="true" size={16} strokeWidth={2} />
        </a>
        <FieldMessage>This will open your email client with a pre-filled message</FieldMessage>
      </div>
    </form>
  )
}
