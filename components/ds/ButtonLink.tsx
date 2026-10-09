import type { ComponentProps } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants, type ButtonVariantProps } from './button-variants'

interface ButtonLinkProps extends ComponentProps<typeof Link>, ButtonVariantProps {}

/** An `<a>` that looks like a button, for anything that goes somewhere. */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
