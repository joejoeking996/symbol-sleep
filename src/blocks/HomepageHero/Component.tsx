import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { HomepageCarousel, type CarouselSlide } from './Carousel.client'

type Props = {
  backgroundImage?: MediaType | number | string | null
  overlayOpacity?: number | null
  slides?: CarouselSlide[] | null
  subtitle?: string | null
  title?: string | null
}

export const HomepageHeroBlock: React.FC<Props> = ({
  backgroundImage,
  overlayOpacity,
  slides,
  subtitle,
  title,
}) => {
  // Carousel mode: when slides are provided
  if (slides && slides.length > 0) {
    return <HomepageCarousel slides={slides} />
  }

  // Fallback: single static hero (backward compatible)
  const opacity = Math.min(Math.max(overlayOpacity ?? 45, 0), 80) / 100

  return (
    <section className="homepage-hero relative min-h-[900px] overflow-hidden bg-[#d8d0c2]">
      <span aria-hidden="true" className="homepage-hero__ambient" />
      {backgroundImage && typeof backgroundImage === 'object' ? (
        <Media
          fill
          imgClassName="homepage-hero__image object-cover"
          priority
          resource={backgroundImage}
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(115deg,#d8d0c2,#f3eee6_42%,#9b8973)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(255,255,255,0.42),transparent_28%),linear-gradient(90deg,rgba(60,45,35,0.22),rgba(25,20,16,0.02)_42%,rgba(25,20,16,0.16))]" />
          <div className="absolute inset-x-[8%] bottom-0 h-[44%] rounded-t-[12rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.3),rgba(116,96,75,0.65))] opacity-70" />
        </>
      )}

      <div className="absolute inset-0 bg-black" style={{ opacity }} />

      <div className="container relative flex min-h-[900px] items-center pt-20">
        <div className="homepage-hero__content text-white">
          <p className="homepage-hero__eyebrow">SYMBOL Bedding</p>
          <h1 className="font-serif text-5xl font-medium leading-tight md:text-7xl">{title}</h1>
          {subtitle && <p className="homepage-hero__subtitle">{subtitle}</p>}
        </div>
      </div>
      <span aria-hidden="true" className="homepage-hero__cue" />
    </section>
  )
}
