import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

type AboutSection = {
  body?: string | null
  image?: MediaType | number | string | null
  imagePosition?: 'left' | 'right' | 'none' | null
  title?: string | null
}

type Props = {
  heroHeading?: string | null
  heroImage?: MediaType | number | string | null
  heroSubheading?: string | null
  introLeft?: string | null
  introRight?: string | null
  sections?: AboutSection[] | null
}

export const AboutStoryBlock: React.FC<Props> = ({
  heroHeading,
  heroImage,
  heroSubheading,
  introLeft,
  introRight,
  sections,
}) => {
  return (
    <section className="about-story">
      <div className="about-story__hero">
        {heroImage && typeof heroImage === 'object' ? (
          <Media fill imgClassName="object-cover" priority resource={heroImage} />
        ) : (
          <div className="about-story__hero-fallback" />
        )}
        <div className="about-story__hero-shade" />
        <div className="about-story__hero-inner">
          <h1>{splitLines(heroHeading || 'Welcome To\nOur Story')}</h1>
          {heroSubheading && <p>{heroSubheading}</p>}
        </div>
      </div>

      <div className="about-story__content">
        <div className="about-story__intro">
          <TextColumn className="about-story__intro-left" text={introLeft} />
          <TextColumn text={introRight} />
        </div>

        <div className="about-story__sections">
          {(sections || []).map((section, index) => (
            <TrustSection key={`${section.title || 'about-section'}-${index}`} section={section} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TrustSection({ section }: { section: AboutSection }) {
  const hasImage = section.image && typeof section.image === 'object'
  const imagePosition = section.imagePosition || 'left'
  const imageLeft = hasImage && imagePosition === 'left'
  const imageRight = hasImage && imagePosition === 'right'

  return (
    <article
      className={[
        'about-story__section',
        !hasImage || imagePosition === 'none' ? 'about-story__section--text-only' : '',
        imageRight ? 'about-story__section--image-right' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {imageLeft && <SectionImage image={section.image as MediaType} />}
      <div className="about-story__section-copy">
        <h2>{section.title}</h2>
        <TextColumn text={section.body} />
      </div>
      {imageRight && <SectionImage image={section.image as MediaType} />}
    </article>
  )
}

function SectionImage({ image }: { image: MediaType }) {
  return (
    <div className="about-story__section-image">
      <Media fill imgClassName="object-contain" resource={image} />
    </div>
  )
}

function TextColumn({ className, text }: { className?: string; text?: string | null }) {
  const paragraphs = splitParagraphs(text)

  if (!paragraphs.length) return null

  return (
    <div className={className}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  )
}

function splitLines(value: string) {
  const lines = value.split('\n')

  return lines.map((line, index) => (
    <React.Fragment key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </React.Fragment>
  ))
}

function splitParagraphs(value?: string | null): string[] {
  if (!value) return []

  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}
