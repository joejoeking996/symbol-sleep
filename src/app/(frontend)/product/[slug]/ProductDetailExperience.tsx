'use client'

import { Maximize2, Minus, Plus, RotateCcw, X } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { getMediaUrl } from '@/utilities/getMediaUrl'

type ExplodedLayer = {
  id?: string | null
  name: string
  description?: string | null
  color?: string | null
  layerImage?: {
    url?: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
    updatedAt?: string | null
  } | null
}

type ProductDetailExperienceProps = {
  eyebrow: string
  heroAlt: string
  heroSrc: string
  productName: string
}

type ExplodedStructureProps = {
  imageAlt: string
  imageSrc: string
  layers?: ExplodedLayer[] | null
}

type ZoomDialogProps = {
  alt: string
  onClose: () => void
  src: string
}

const layerAssetVersion = 'product-template-20260706'

function fullUrl(path: string | null | undefined, cacheTag?: string | null): string {
  if (!path) return ''
  const clean = getMediaUrl(path)
  const params = new URLSearchParams()
  if (cacheTag) params.set('updated', String(new Date(cacheTag).getTime()))
  params.set('v', layerAssetVersion)
  return `${clean}?${params.toString()}`
}

/* 鈹€鈹€鈹€鈹€ Hero 鈹€鈹€鈹€鈹€ */
export function ProductDetailExperience({
  eyebrow, heroAlt, heroSrc, productName,
}: ProductDetailExperienceProps) {
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  return (
    <>
      <section className="product-detail-hero">
        {heroSrc ? (
          <Image alt={heroAlt || productName} className="product-detail-hero__image" fill priority quality={100} sizes="100vw" src={heroSrc} />
        ) : (
          <div className="product-detail-hero__fallback" />
        )}
        <div className="product-detail-hero__shade" />
        <div className="product-detail-hero__inner"><p>{eyebrow} / {productName}</p></div>
        {heroSrc && (
          <button aria-label="Zoom product image" className="product-detail-hero__zoom" onClick={() => setIsZoomOpen(true)} type="button">
            <Maximize2 aria-hidden="true" size={18} /><span>ZOOM</span>
          </button>
        )}
      </section>
      {isZoomOpen && (
        <ZoomDialog
          alt={heroAlt || productName}
          onClose={() => setIsZoomOpen(false)}
          src={heroSrc}
        />
      )}
    </>
  )
}

/* 鈹€鈹€鈹€鈹€ Stacked Exploded View 鈹€鈹€鈹€鈹€ */
export function ExplodedStructure({ imageAlt, imageSrc, layers }: ExplodedStructureProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const hasLayers = layers && layers.length > 0
  if (!hasLayers) return <ExplodedImageOnly imageAlt={imageAlt} imageSrc={imageSrc} />

  const activeLayer = layers![activeIndex]
  const activeLayerStyle = {
    '--layer-accent': activeLayer.color || '#53ddf4',
    '--layer-shift-x': `${(activeIndex - 6) * 2.2}%`,
    '--layer-shift-y': `${((activeIndex % 5) - 2) * 1.4}%`,
  } as React.CSSProperties

  return (
    <div className="exploded-view exploded-view--stacked">
      <div className="exploded-view__stacked-visual" style={activeLayerStyle}>
        <span aria-hidden="true" className="exploded-view__layer-sweep" key={`sweep-${activeIndex}`} />
        <div className="exploded-view__stack">
          {layers!.map((layer, index) => {
            const imgUrl = layer.layerImage?.url
              ? fullUrl(layer.layerImage.url, layer.layerImage.updatedAt)
              : null

            return (
              <div
                className={`exploded-view__stack-layer ${
                  activeIndex === index ? 'exploded-view__stack-layer--active' : ''
                } ${activeIndex !== index ? 'exploded-view__stack-layer--dimmed' : ''}`}
                key={layer.id || index}
                style={{ '--layer-order': index } as React.CSSProperties}
              >
                {imgUrl ? (
                  <img alt={layer.name} className="exploded-view__stack-img" src={imgUrl} />
                ) : (
                  <div className="exploded-view__stack-placeholder" style={{ background: layer.color || '#d5cfc6' }}>
                    <span>{index + 1}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div className="exploded-view__stack-rail" aria-label={`${imageAlt} layer selector`}>
          {layers!.map((layer, index) => (
            <button
              aria-label={`View layer ${index + 1}: ${layer.name}`}
              className={`exploded-view__stack-hint ${
                activeIndex === index ? 'exploded-view__stack-hint--active' : ''
              }`}
              key={layer.id || index}
              onClick={() => setActiveIndex(index)}
              title={layer.name}
              type="button"
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
        <div className="exploded-view__layer-label" aria-live="polite">
          <span>Layer {activeIndex + 1}</span>
          <strong>{activeLayer.name}</strong>
        </div>
      </div>
    </div>
  )
}

/* Fallback */
function ExplodedImageOnly({ imageAlt, imageSrc }: { imageAlt: string; imageSrc: string }) {
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  return (
    <div className="exploded-view">
      {imageSrc ? (
        <button
          aria-label={`Open ${imageAlt} image`}
          className="exploded-view__stage exploded-view__stage--clickable"
          onClick={() => setIsZoomOpen(true)}
          type="button"
        >
          <Image
            alt={imageAlt}
            className="exploded-view__image"
            fill
            sizes="(max-width: 980px) 100vw, 720px"
            src={imageSrc}
          />
        </button>
      ) : (
        <div className="exploded-view__stage">
          <div className="exploded-view__empty" />
        </div>
      )}
      {isZoomOpen && imageSrc && (
        <ZoomDialog alt={imageAlt} onClose={() => setIsZoomOpen(false)} src={imageSrc} />
      )}
    </div>
  )
}

function ZoomDialog({ alt, onClose, src }: ZoomDialogProps) {
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)

  const updateScale = useCallback((nextScale: number) => {
    setScale(Math.min(4, Math.max(0.75, Number(nextScale.toFixed(2)))))
  }, [])

  const resetZoom = useCallback(() => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === '0') resetZoom()
      if (event.key === '=' || event.key === '+') updateScale(scale + 0.2)
      if (event.key === '-') updateScale(scale - 0.2)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, resetZoom, scale, updateScale])

  return createPortal(
    <div aria-modal="true" className="product-zoom" role="dialog">
      <button
        aria-label="Close image preview"
        className="product-zoom__close"
        onClick={onClose}
        type="button"
      >
        <X aria-hidden="true" size={22} />
      </button>
      <div className="product-zoom__controls" aria-label="Image zoom controls">
        <button aria-label="Zoom out" onClick={() => updateScale(scale - 0.2)} type="button">
          <Minus aria-hidden="true" size={18} />
        </button>
        <button aria-label="Reset zoom" onClick={resetZoom} type="button">
          <RotateCcw aria-hidden="true" size={17} />
          <span>{Math.round(scale * 100)}%</span>
        </button>
        <button aria-label="Zoom in" onClick={() => updateScale(scale + 0.2)} type="button">
          <Plus aria-hidden="true" size={18} />
        </button>
      </div>
      <div
        className="product-zoom__viewport"
        onMouseDown={(event) => setDragStart({ x: event.clientX - offset.x, y: event.clientY - offset.y })}
        onMouseLeave={() => setDragStart(null)}
        onMouseMove={(event) => {
          if (!dragStart || scale <= 1) return
          setOffset({ x: event.clientX - dragStart.x, y: event.clientY - dragStart.y })
        }}
        onMouseUp={() => setDragStart(null)}
        onWheel={(event) => {
          event.preventDefault()
          updateScale(scale + (event.deltaY < 0 ? 0.16 : -0.16))
        }}
      >
        <Image
          alt={alt}
          className="product-zoom__image"
          draggable={false}
          fill
          quality={100}
          sizes="100vw"
          src={src}
          style={{
            cursor: scale > 1 ? (dragStart ? 'grabbing' : 'grab') : 'zoom-in',
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          }}
        />
      </div>
    </div>,
    document.body,
  )
}
