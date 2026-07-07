'use client'

import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { PlayIcon, X } from 'lucide-react'

type Props = {
  backgroundImage?: MediaType | number | string | null
  heading?: string | null
  href?: string | null
  linkLabel?: string | null
  subheading?: string | null
  videoPoster?: MediaType | number | string | null
  videoUrl?: string | null
}

export const StoryVideoPanelBlock: React.FC<Props> = ({
  backgroundImage,
  heading,
  href,
  linkLabel,
  subheading,
  videoPoster,
  videoUrl,
}) => {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = useCallback(() => {
    setModalOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    document.body.style.overflow = ''
  }, [])

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) closeModal()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [modalOpen, closeModal])

  return (
    <>
      <section className="relative min-h-[620px] overflow-hidden bg-[#f7f7f5] py-24">
        {backgroundImage && typeof backgroundImage === 'object' ? (
          <Media fill imgClassName="object-cover" resource={backgroundImage} />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(110deg,#f9faf8,#e8ebe6_45%,#cfd5d2)]" />
        )}
        <div className="absolute inset-0 bg-white/35" />

        <div className="container relative grid min-h-[430px] gap-10 md:grid-cols-[0.9fr_1fr] md:items-center">
          <div className="text-[#2A2A2A]">
            <h2 className="max-w-md font-serif text-4xl font-semibold leading-tight md:text-5xl">
              {heading || 'OUR STORY'}
            </h2>
            {subheading && (
              <p className="mt-5 max-w-md font-serif text-2xl leading-snug md:text-3xl">{subheading}</p>
            )}
            <Link
              className="symbol-text-link mt-10 inline-flex border-b border-[#C9A870] pb-1 font-serif text-xl text-[#8f7147]"
              href={href || '/about-us'}
            >
              {linkLabel || 'About Us'}
            </Link>
          </div>

          <button
            aria-label={videoUrl ? 'Watch brand video' : 'Video not available'}
            className="symbol-video-link group relative block aspect-video w-full max-w-xl overflow-hidden bg-black/75 shadow-2xl md:justify-self-end"
            disabled={!videoUrl}
            onClick={videoUrl ? openModal : undefined}
            type="button"
          >
            {videoPoster && typeof videoPoster === 'object' ? (
              <Media
                fill
                imgClassName="object-cover opacity-65 transition duration-500 group-hover:scale-[1.035]"
                resource={videoPoster}
              />
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#1f1f1f,#555)]" />
            )}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="symbol-video-link__play flex h-16 w-16 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur">
                <PlayIcon aria-hidden="true" fill="currentColor" size={24} />
              </span>
            </span>
            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-white">
              Watch Video
            </span>
          </button>
        </div>
      </section>

      {/* Video Modal */}
      {modalOpen && videoUrl && (
        <div
          aria-label="Video player"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={closeModal}
          role="dialog"
        >
          {/* Close button */}
          <button
            aria-label="Close video"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/15 p-3 text-white backdrop-blur-sm transition hover:bg-white/30 md:right-8 md:top-8"
            onClick={closeModal}
            type="button"
          >
            <X size={28} />
          </button>

          {/* Video player */}
          <video
            autoPlay
            controls
            className="max-h-[85vh] max-w-full rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            src={videoUrl}
          >
            <track kind="captions" />
          </video>
        </div>
      )}
    </>
  )
}
