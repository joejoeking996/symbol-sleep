import Link from 'next/link'
import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

type Props = {
  backgroundImage?: MediaType | number | string | null
  body?: string | null
  eyebrow?: string | null
  heading?: string | null
  href?: string | null
  linkLabel?: string | null
}

export const TechnologyPanelBlock: React.FC<Props> = ({
  backgroundImage,
  body,
  eyebrow,
  heading,
  href,
  linkLabel,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#121212] py-24 text-white md:py-36">
      {backgroundImage && typeof backgroundImage === 'object' ? (
        <Media fill imgClassName="object-cover opacity-60" resource={backgroundImage} />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,rgba(74,144,226,0.35),transparent_28%),linear-gradient(135deg,#0d1015,#161616_48%,#2A2A2A)]" />
      )}
      <div className="absolute inset-0 bg-black/45" />
      <div className="pointer-events-none absolute -left-20 top-16 h-64 w-[130%] rotate-[-9deg] border-y border-[#4A90E2]/25 opacity-70" />

      <div className="container relative grid gap-12 md:grid-cols-[0.85fr_1fr] md:items-end">
        <div>
          <p className="mb-6 font-serif text-5xl font-medium md:text-6xl">{eyebrow || 'Technology'}</p>
          <h2 className="max-w-xl text-2xl leading-snug text-white/90 md:text-3xl">{heading}</h2>
        </div>

        <div className="max-w-2xl md:justify-self-end">
          {body && <p className="text-sm leading-7 text-white/70 md:text-base">{body}</p>}
          <Link
            className="mt-8 inline-flex items-center gap-3 font-serif text-xl text-[#C9A870]"
            href={href || '/technology'}
          >
            {linkLabel || 'DETAILS'}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
