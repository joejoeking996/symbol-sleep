import Link from 'next/link'
import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

type Props = {
  body?: string | null
  eyebrow?: string | null
  heading?: string | null
  href?: string | null
  image?: MediaType | number | string | null
  imagePosition?: 'left' | 'right' | null
  linkLabel?: string | null
}

export const ImageTextPanelBlock: React.FC<Props> = ({
  body,
  eyebrow,
  heading,
  href,
  image,
  imagePosition,
  linkLabel,
}) => {
  const imageFirst = imagePosition === 'left'

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container grid gap-10 md:grid-cols-2 md:items-center">
        <div className={imageFirst ? 'md:order-2' : ''}>
          {eyebrow && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#C9A870]">
              {eyebrow}
            </p>
          )}
          <h2 className="max-w-xl font-serif text-4xl font-medium leading-tight text-[#121212] md:text-5xl">
            {heading}
          </h2>
          {body && <p className="mt-6 max-w-xl text-base leading-8 text-[#555]">{body}</p>}
          {href && linkLabel && (
            <Link
              className="symbol-text-link mt-8 inline-flex border-b border-[#C9A870] pb-1 font-serif text-xl text-[#8f7147]"
              href={href}
            >
              {linkLabel}
            </Link>
          )}
        </div>

        <div
          className={`symbol-image-frame relative aspect-[1.18] overflow-hidden bg-[#F2F1EF] ${imageFirst ? '' : ''}`}
        >
          {image && typeof image === 'object' ? (
            <Media fill imgClassName="object-cover" resource={image} />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#e8e3d9,#b7aa99)]" />
          )}
        </div>
      </div>
    </section>
  )
}
