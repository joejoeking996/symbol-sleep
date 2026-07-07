'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type CarouselSlide = {
  id?: string | null
  image: MediaType | number | string | null
  title?: string | null
  subtitle?: string | null
  overlayOpacity?: number | null
}

type Props = {
  slides: CarouselSlide[]
}

const AUTOPLAY_INTERVAL = 6000

export const HomepageCarousel: React.FC<Props> = ({ slides }) => {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef<number>(0)

  const total = slides.length

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || total <= 1) return
      setIsTransitioning(true)
      setCurrent(index)
    },
    [isTransitioning, total],
  )

  const next = useCallback(() => {
    goTo((current + 1) % total)
  }, [current, goTo, total])

  const prev = useCallback(() => {
    goTo((current - 1 + total) % total)
  }, [current, goTo, total])

  // Auto-play
  useEffect(() => {
    if (total <= 1) return

    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % total)
        setIsTransitioning(true)
      }, AUTOPLAY_INTERVAL)
    }

    startTimer()

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [total])

  // Reset transition flag after animation
  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => setIsTransitioning(false), 700)
      return () => clearTimeout(timeout)
    }
  }, [isTransitioning])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
    }
  }

  if (!slides || slides.length === 0) return null

  return (
    <section
      aria-label="Homepage hero carousel"
      aria-roledescription="carousel"
      className="homepage-hero relative min-h-[900px] overflow-hidden bg-[#d8d0c2]"
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
    >
      {/* Ambient decoration shared across all slides */}
      <span aria-hidden="true" className="homepage-hero__ambient" />

      {/* Slides */}
      {slides.map((slide, index) => {
        const isActive = index === current
        const opacity = Math.min(Math.max(slide.overlayOpacity ?? 35, 0), 80) / 100

        return (
          <div
            aria-hidden={!isActive}
            aria-label={`Slide ${index + 1} of ${total}`}
            aria-roledescription="slide"
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            key={slide.id || index}
          >
            {slide.image && typeof slide.image === 'object' ? (
              <Media
                fill
                imgClassName="homepage-hero__image object-cover"
                priority={index === 0}
                resource={slide.image}
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-[linear-gradient(115deg,#d8d0c2,#f3eee6_42%,#9b8973)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(255,255,255,0.42),transparent_28%),linear-gradient(90deg,rgba(60,45,35,0.22),rgba(25,20,16,0.02)_42%,rgba(25,20,16,0.16))]" />
                <div className="absolute inset-x-[8%] bottom-0 h-[44%] rounded-t-[12rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.3),rgba(116,96,75,0.65))] opacity-70" />
              </>
            )}

            <div className="absolute inset-0 bg-black" style={{ opacity }} />

            {/* Slide content */}
            <div className="container relative flex min-h-[900px] items-center pt-20">
              <div className="homepage-hero__content text-white">
                <p className="homepage-hero__eyebrow">SYMBOL Bedding</p>
                {(slide.title || slide.subtitle) && (
                  <>
                    {slide.title && (
                      <h1 className="font-serif text-5xl font-medium leading-tight md:text-7xl">
                        {slide.title}
                      </h1>
                    )}
                    {slide.subtitle && (
                      <p className="homepage-hero__subtitle mt-4 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
                        {slide.subtitle}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )
      })}

      {/* Navigation arrows */}
      {total > 1 && (
        <>
          <button
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur-sm transition hover:bg-white/30 md:left-8"
            onClick={prev}
            type="button"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur-sm transition hover:bg-white/30 md:right-8"
            onClick={next}
            type="button"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              aria-current={index === current ? 'true' : undefined}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === current ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/75'
              }`}
              key={index}
              onClick={() => goTo(index)}
              type="button"
            />
          ))}
        </div>
      )}

      <span aria-hidden="true" className="homepage-hero__cue" />
    </section>
  )
}
