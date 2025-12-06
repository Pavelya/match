import { cn } from '@/lib/utils'
import Image from 'next/image'

interface AvatarProps {
  src?: string | null
  alt: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12'
}

export function Avatar({ src, alt, size = 'md', className }: AvatarProps) {
  const sizeClass = sizeClasses[size]

  if (!src) {
    // Fallback to initials
    const initials = alt
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)

    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold',
          sizeClass,
          className
        )}
      >
        {initials}
      </div>
    )
  }

  return (
    <div className={cn('relative rounded-full overflow-hidden', sizeClass, className)}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 48px) 48px" />
    </div>
  )
}
