import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import { ExplodedStructure, ProductDetailExperience } from './ProductDetailExperience'
import './page.scss'

import RichText from '@/components/RichText'
import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type Args = {
  params: Promise<{
    slug: string
  }>
}

const defaultDetailLead =
  'Combining refined design, advanced sleep technology, and carefully selected materials, this mattress is tailored to provide balanced support and elevated comfort through the night.'

const defaultDetailNote =
  'Dacron Fresh is a strong, durable polyester fiber laboratory tested for anti-dust mite and anti-bacterial performance.'

export default async function ProductPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const product = await queryProductBySlug(slug)

  if (!product) {
    return (
      <main className="product-detail product-detail--missing">
        <section className="product-detail__not-found">
          <p>Product</p>
          <h1>Product not found</h1>
        </section>
      </main>
    )
  }

  const mainImage = product.mainImage && typeof product.mainImage === 'object' ? product.mainImage : null
  const customHeroImage =
    product.detailHeroImage && typeof product.detailHeroImage === 'object'
      ? product.detailHeroImage
      : null
  const heroImage = product.heroImageSource === 'mainImage' ? mainImage : customHeroImage || mainImage

  const heroSrc = getImageSrc(heroImage)
  const mainImageSrc = getImageSrc(mainImage)
  const rangeName =
    product.range && typeof product.range === 'object' && 'name' in product.range
      ? product.range.name
      : ''
  const detailEyebrow = product.detailEyebrow || rangeName || 'Symbol Mattress'

  const explodedImage =
    product.explodedImage && typeof product.explodedImage === 'object'
      ? product.explodedImage
      : null
  const explodedImageSrc = getImageSrc(explodedImage)

  // Build layers array with image URLs
  const layers = Array.isArray(product.explodedLayers)
    ? product.explodedLayers.map((layer) => {
        const layerImg =
          layer.layerImage && typeof layer.layerImage === 'object' ? layer.layerImage : null
        return {
          id: layer.id,
          name: layer.name,
          description: layer.description,
          color: layer.color,
          layerImage: layerImg
            ? {
                url: layerImg.url,
                alt: layerImg.alt,
                width: layerImg.width,
                height: layerImg.height,
                updatedAt: layerImg.updatedAt,
              }
            : null,
        }
      })
    : null
  const showcaseImageSrc = explodedImageSrc || mainImageSrc || heroSrc
  const showcaseImageAlt = explodedImage?.alt || mainImage?.alt || heroImage?.alt || product.name
  const hasShowcaseVisual = Boolean(showcaseImageSrc || (layers && layers.length > 0))

  return (
    <main className="product-detail">
      <ProductDetailExperience
        eyebrow={detailEyebrow}
        heroAlt={heroImage?.alt || product.name}
        heroSrc={heroSrc}
        productName={product.name}
      />

      <section
        className={`product-detail__body ${
          hasShowcaseVisual
            ? 'product-detail__body--has-exploded'
            : 'product-detail__body--copy-only'
        }`}
      >
        {hasShowcaseVisual && (
          <ExplodedStructure
            imageAlt={showcaseImageAlt || `${product.name} product structure`}
            imageSrc={showcaseImageSrc}
            layers={layers}
          />
        )}

        <div className="product-detail__copy">
          <p className="product-detail__eyebrow">{detailEyebrow}</p>
          <h1>{product.name}</h1>
          <div className="product-detail__lead">
            {splitParagraphs(product.detailLead || product.shortDescription || defaultDetailLead).map(
              (paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ),
            )}
          </div>

          {(product.detailNote || defaultDetailNote) && (
            <aside className="product-detail__note">
              <h2>{product.detailNoteTitle || 'About Dacron Fresh©'}</h2>
              <p>{product.detailNote || defaultDetailNote}</p>
            </aside>
          )}

          {Array.isArray(product.specifications) && product.specifications.length > 0 && (
            <dl className="product-detail__specs">
              {product.specifications.map((item, index) => (
                <div key={`${item.label}-${index}`}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {product.description && (
        <section className="product-detail__article">
          <RichText data={product.description} />
        </section>
      )}
    </main>
  )
}

function getImageSrc(image: Media | null): string {
  if (!image?.url) return ''
  return getMediaUrl(image.url, image.updatedAt)
}

function splitParagraphs(value: string): string[] {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

const queryProductBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'products',
    depth: 3,
    limit: 1,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs[0] || null
})
