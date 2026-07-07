import Link from 'next/link'
import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

type RangeItem = {
  href?: string | null
  image?: MediaType | number | string | null
  subtitle?: string | null
  title?: string | null
}

type Props = {
  heading?: string | null
  ranges?: RangeItem[] | null
}

export const ProductRangeShowcaseBlock: React.FC<Props> = ({ heading, ranges }) => {
  return (
    <section className="product-range-showcase bg-[#F2F1EF] py-20 md:py-28">
      <div className="container">
        <h2 className="mb-12 text-center font-serif text-4xl font-medium text-[#121212] md:text-5xl">
          {heading || 'Product Range'}
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {(ranges || []).map((item, index) => {
            const href = item.href || '/product-range'

            return (
              <Link
                className="product-range-card group relative block aspect-[1.25] overflow-hidden bg-[#2A2A2A]"
                href={href}
                key={`${item.title || 'range'}-${index}`}
              >
                {item.image && typeof item.image === 'object' ? (
                  <Media
                    fill
                    imgClassName="product-range-card__image object-cover"
                    resource={item.image}
                  />
                ) : (
                  <div className="product-range-card__fallback absolute inset-0 bg-[linear-gradient(135deg,#303030,#9c9182)]" />
                )}

                <div className="product-range-card__shade absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="product-range-card__content absolute inset-x-6 bottom-8 text-center text-white">
                  <h3 className="font-serif text-3xl font-semibold md:text-4xl">{item.title}</h3>
                  {item.subtitle && <p className="mt-2 text-sm text-white/80">{item.subtitle}</p>}
                  <span aria-hidden="true" className="product-range-card__arrow">
                    View range
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
