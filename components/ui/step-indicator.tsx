'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  number: number
  label: string
  description?: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function StepIndicator({ steps, currentStep, className }: StepIndicatorProps) {
  const totalSteps = steps.length
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Top heading */}
      <div>
        <h1 className="text-2xl font-bold">Update Your Profile</h1>
        <p className="text-sm text-muted-foreground">
          Tell us about your academic interests and scores to find the best program matches.
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="relative">
        {/* Connecting lines */}
        <div className="absolute left-0 top-6 flex w-full items-center px-6">
          <div className="flex-1 border-t-2 border-muted" />
          <div className="flex-1 border-t-2 border-muted" />
        </div>

        {/* Step circles */}
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isCompleted = step.number < currentStep
            const isCurrent = step.number === currentStep
            const isFuture = step.number > currentStep

            return (
              <div key={step.number} className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={cn(
                    'relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 bg-background font-bold transition-all duration-300',
                    isCompleted && 'border-primary bg-primary text-primary-foreground',
                    isCurrent && 'border-primary bg-background text-primary',
                    isFuture && 'border-muted bg-background text-muted-foreground'
                  )}
                >
                  {isCompleted ? <Check className="h-6 w-6" /> : <span>{step.number}</span>}
                </div>

                {/* Label */}
                <div className="mt-3 text-center">
                  <p
                    className={cn(
                      'text-sm font-medium transition-colors duration-300',
                      (isCompleted || isCurrent) && 'text-primary',
                      isFuture && 'text-muted-foreground'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
