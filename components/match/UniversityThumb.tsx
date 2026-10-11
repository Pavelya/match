'use client'

import { useState } from 'react'
import Image from 'next/image'

/*
 * A university's picture beside a program (rebranding 2.2 and 2.3; boards "D3.1 Match card" and
 * "D3.3 Result row"). Shared by the match card and Explore's result row.
 */

/** 56px (48 on a phone). Without an image, the initials on brand-soft, hidden from screen readers. */
export function UniversityThumb({ image, initials }: { image: string | null; initials: string }) {
  const [failed, setFailed] = useState(false)
  if (image && !failed) {
    return (
      <Image
        src={image}
        alt=""
        // Fixed size, so 1x and 2x only; a `sizes` would bring the whole device srcset
        width={56}
        height={56}
        onError={() => setFailed(true)}
        className="size-12 rounded-control object-cover md:size-14"
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className="flex size-12 items-center justify-center rounded-control border border-transparent bg-brand-soft text-[0.875rem] font-semibold tracking-[0.02em] text-brand-ink md:size-14 md:text-body"
    >
      {initials}
    </span>
  )
}
