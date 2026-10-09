import Image from 'next/image'
import { brand, legacyBrand } from '@/lib/brand/config'

/** Today's logo, on the old screens until cleanup (R.2) removes them. */
export function LegacyLogo({ size, priority }: { size: number; priority?: boolean }) {
  return (
    <Image
      src={legacyBrand.logo}
      alt={brand.name}
      width={size}
      height={size}
      className="rounded-lg"
      priority={priority}
    />
  )
}
