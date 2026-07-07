'use client'

import React, { useMemo, useState } from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

type Material = {
  description?: string | null
  eyebrow?: string | null
  image?: MediaType | number | string | null
  name?: string | null
  title?: string | null
}

type MaterialCategory = {
  materials?: Material[] | null
  title?: string | null
}

type SafeMaterialCategory = {
  materials: Material[]
  title: string
}

type Props = {
  categories?: MaterialCategory[] | null
  heroImage?: MediaType | number | string | null
  heroSubtitle?: string | null
  heroTitle?: string | null
  introBody?: string | null
  introHeading?: string | null
  materialBackgroundImage?: MediaType | number | string | null
}

export const TechnologyMaterialsBlock: React.FC<Props> = ({
  categories,
  heroImage,
  heroSubtitle,
  heroTitle,
  introBody,
  introHeading,
  materialBackgroundImage,
}) => {
  const safeCategories = useMemo(() => normalizeCategories(categories), [categories])
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [materialIndexByCategory, setMaterialIndexByCategory] = useState<Record<number, number>>({})

  const activeCategory = safeCategories[categoryIndex] || safeCategories[0]
  const materialIndex = materialIndexByCategory[categoryIndex] || 0
  const activeMaterial = activeCategory?.materials[materialIndex] || activeCategory?.materials[0]

  return (
    <section className="technology-materials">
      <div className="technology-materials__hero">
        {heroImage && typeof heroImage === 'object' ? (
          <Media fill imgClassName="object-cover" priority resource={heroImage} />
        ) : (
          <div className="technology-materials__hero-fallback" />
        )}
        <div className="technology-materials__hero-shade" />
        <div className="technology-materials__hero-inner">
          <h1>{splitLines(heroTitle || 'Mattresses\nTechnology')}</h1>
          {heroSubtitle && <p>{heroSubtitle}</p>}
        </div>
      </div>

      <div className="technology-materials__intro">
        <h2>{introHeading || 'The Key to Comfort'}</h2>
        {introBody && <p>{introBody}</p>}
      </div>

      <div className="technology-materials__library">
        {materialBackgroundImage && typeof materialBackgroundImage === 'object' ? (
          <Media
            fill
            imgClassName="technology-materials__library-image"
            resource={materialBackgroundImage}
          />
        ) : (
          <div className="technology-materials__library-fallback" />
        )}
        <div className="technology-materials__library-overlay" />

        <div className="technology-materials__library-inner">
          <div className="technology-materials__tabs" role="tablist">
            {safeCategories.map((category, index) => (
              <button
                aria-selected={index === categoryIndex}
                className={index === categoryIndex ? 'is-active' : ''}
                key={`${category.title}-${index}`}
                onClick={() => setCategoryIndex(index)}
                role="tab"
                type="button"
              >
                {category.title}
              </button>
            ))}
          </div>

          <div className="technology-materials__detail">
            <nav aria-label="Material list" className="technology-materials__menu">
              {activeCategory?.materials.map((material, index) => (
                <button
                  className={index === materialIndex ? 'is-active' : ''}
                  key={`${material.name}-${index}`}
                  onClick={() =>
                    setMaterialIndexByCategory((current) => ({
                      ...current,
                      [categoryIndex]: index,
                    }))
                  }
                  type="button"
                >
                  {material.name}
                </button>
              ))}
            </nav>

            <div
              className="technology-materials__showcase"
              key={`showcase-${categoryIndex}-${materialIndex}`}
            >
              <div className="technology-materials__photo">
                {activeMaterial?.image && typeof activeMaterial.image === 'object' ? (
                  <Media fill imgClassName="object-cover" resource={activeMaterial.image} />
                ) : (
                  <div className="technology-materials__photo-fallback" />
                )}
              </div>

              <article className="technology-materials__copy">
                {activeMaterial?.eyebrow && <p>{activeMaterial.eyebrow}</p>}
                <h3>{activeMaterial?.title}</h3>
                {activeMaterial?.description && <TextParagraphs text={activeMaterial.description} />}
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function normalizeCategories(categories?: MaterialCategory[] | null): SafeMaterialCategory[] {
  const fallback = [
    {
      materials: [
        {
          description:
            'Engineered from high-quality knitted fabric, this cover features exceptional four-way stretchability that effortlessly conforms to your body contours and responds to the mattress layers beneath, delivering optimal pressure relief. Its unique micro-porous knit structure promotes continuous airflow and moisture-wicking, maintaining a fresh and breathable sleep microclimate throughout the night. Soft to the touch, it provides an instantly inviting feel for an elevated sleep experience.',
          eyebrow: 'Quilt Layer',
          name: 'Stretch Knit Cover',
          title: 'Stretch Knit Cover',
        },
        {
          description:
            'Infused with cutting-edge protective technology, this advanced treatment creates an invisible shield on the fabric surface. It actively targets and significantly reduces viral and bacterial activity upon contact, preventing microbial growth and neutralizing odors at the source. Safe, eco-friendly, and non-irritating to the skin, it ensures a continuously hygienic sleep environment for ultimate peace of mind.',
          eyebrow: 'Quilt Layer',
          name: 'Anti-Viral Treatment',
          title: 'Anti-Viral Treatment',
        },
        {
          description:
            'Serving as the ultimate comfort layer closest to the body, this supersoft foam features a delicate open-cell structure that delivers an instantly cloud-like, weightless feel. It expertly absorbs initial pressure upon contact, gently cradling high-pressure zones like the shoulders and hips to dissolve muscle tension. With exceptional resilience and plushness, it creates a seamless transition from the surface fabric\'s soft touch to the core support below, inviting your body into immediate, deep relaxation.',
          eyebrow: 'Quilt Layer',
          name: 'Supersoft Polyurethane Foam',
          title: 'Supersoft Polyurethane Foam',
        },
        {
          description:
            'Leveraging the renowned technology of Dacron®, this premium fiber is engineered to optimize your sleep microclimate. Dacron® Fresh features advanced moisture-management capabilities, acting as a network of micro-ventilation channels that rapidly capture and evaporate body moisture to maintain a dry, balanced sleep surface. By effectively inhibiting bacterial growth and odors caused by humidity, it delivers a long-lasting, self-refreshing barrier for a healthier and more revitalized night\'s rest.',
          eyebrow: 'Quilt Layer',
          name: 'Dacron® Fresh',
          title: 'Dacron® Fresh',
        },
      ],
      title: 'QUILT LAYERS',
    },
    {
      materials: [
        {
          description:
            'Engineered as a premium comfort-transition layer, the Softech® Mini Pocket Spring system redefines dynamic responsiveness with its high-density matrix. Thousands of miniature pocket springs act as responsive "micro-nodes," sensitive to the subtlest shifts in your body\'s alignment to deliver precise, millimeter-level point-to-point pressure relief. Seamlessly bridging soft comfort and deep support, this system eliminates the rigidity of traditional coils. Each spring is individually pocketed to naturally absorb motion and eliminate friction, ensuring a silent, zero-disturbance sleep environment.',
          eyebrow: 'Comfort Layer',
          name: 'Softech Mini Pocket Spring system',
          title: 'Softech Mini Pocket Spring system',
        },
        {
          description:
            'Engineered as the crown jewel of the mattress comfort layer, this Premium Cloud-feel Foam redefines the "zero-gravity" sleep experience through molecular-level resilience. It perfectly simulates the weightless sensation of floating on a cloud, gently cradling high-pressure zones like the shoulders, waist, and hips to achieve seamless, full-body contouring. Its advanced slow-resilience properties not only dissolve deep muscle tension but also absorb micro-vibrations, ensuring every movement is effortlessly cushioned for an elevated, luxurious night\'s rest.',
          eyebrow: 'Comfort Layer',
          name: 'Premium Cloud-feel Foam',
          title: 'Premium Cloud-feel Foam',
        },
        {
          description:
            'A perfect synergy of advanced temperature-regulation technology and aerospace-inspired pressure relief. By infusing premium memory foam with cooling gel particles, this material actively absorbs and dissipates excess body heat, breaking the heat-retention barrier of traditional foams to maintain a consistently fresh and cool sleep microclimate. Enhanced with its signature slow-resilience property, it fluidly contours to your body\'s unique shape, reducing localized pressure to near-zero for a perfectly cradled, sweat-free night\'s rest.',
          eyebrow: 'Comfort Layer',
          name: 'Gel Memory Foam',
          title: 'Gel Memory Foam',
        },
        {
          description:
            'Crafted from premium, sustainably sourced natural rubber, our 5-zone latex system is engineered to provide targeted, anatomical support. By varying the density across five distinct regions, it gently cradles the shoulders, provides firmer support for the lumbar area, and follows the natural curvature of the hips and legs. This isn\'t just about soft comfort; it\'s an ergonomic alignment system. With its intrinsic honeycomb ventilation structure, it ensures exceptional breathability and naturally hypoallergenic protection for a cleaner, deeper, and more rejuvenating sleep.',
          eyebrow: 'Comfort Layer',
          name: '5 Zones Natural Latex',
          title: '5 Zones Natural Latex',
        },
      ],
      title: 'COMFORT LAYERS',
    },
    {
      materials: [
        {
          description:
            'Engineered to eliminate perimeter sagging, this advanced edge support system integrates a high-density, high-rigidity reinforcement border around the entire mattress. By securing the physical boundaries, it prevents the rolling-off sensation and legalizes 100% of the sleep surface from corner to corner. Whether you are sleeping on the absolute edge or sitting on the side to put on shoes, it delivers unflinching, consistent support and enhances safety during daily sit-and-stand transitions.',
          eyebrow: 'Support Layer',
          name: 'Encased Edge Support',
          title: 'Encased Edge Support',
        },
        {
          description:
            'Serving as the "intelligent skeletal framework" of the mattress, this 7-zone pocket spring system redefines precision support. By segments the sleeping surface into seven distinct anatomical zones—head, shoulders, back, waist, hips, thighs, and lower legs—we customized the coil gauge and pre-tension across each region to perfectly balance body weight distribution. It dynamically responds to every micro-shift in posture, allowing the shoulders and hips to sink gently for pressure relief, while delivering robust counter-pressure to align the lumbar spine. With each coil individually encased to absorb motion, it provides a quiet, tailor-made alignment system for undisturbed sleep.',
          eyebrow: 'Support Layer',
          name: '7-zone Pocket Spring System',
          title: '7-zone Pocket Spring System',
        },
        {
          description:
            'Engineered for those who favor a structured feel and heavy-duty counter-pressure, this firm foam serves as a vital orthopedic protection layer. Utilizing high-density molecular compression, it delivers exceptional resistance to sagging, effectively distribution body weight to prevent spinal misalignment caused by excessive sinking. Acting as the structural cornerstone of the mattress, it seamlessly dampens bottom-layer spring feedback while providing a stabilizing foundation for upper comfort layers, balancing deep stability with unwavering skeletal support.',
          eyebrow: 'Support Layer',
          name: 'Firm Foam',
          title: 'Firm Foam',
        },
        {
          description:
            'Engineered as the structural matrix and load-dispatching core inside the mattress, this high-tenacity balance net features a specialized geometric grid designed for optimal pressure equalization. Upon receiving localized vertical body pressure, its interconnected network nodes instantaneously dissipate concentrated force horizontally, maintaining an exceptionally balanced sleep surface. Acting as a protective powerhouse between the spring core and comfort foam layers, it completely eliminates spring-on-foam friction. Furthermore, its open-grid layout serves as a built-in ventilation channel, promoting inner airflow and moisture-wicking for long-term mattress integrity.',
          eyebrow: 'Support Layer',
          name: 'Pressure Release Balance Net',
          title: 'Pressure Release Balance Net',
        },
      ],
      title: 'SUPPORT LAYERS',
    },
  ]

  const normalized = (categories || [])
    .filter((category) => category?.title && category.materials?.length)
    .map((category) => ({
      materials: (category.materials || []).filter((material) => material?.name && material?.title),
      title: category.title || '',
    }))
    .filter((category) => category.materials.length)

  return normalized.length ? normalized : fallback
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

function TextParagraphs({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph) => (
          <p className="technology-materials__paragraph" key={paragraph}>
            {paragraph}
          </p>
        ))}
    </>
  )
}
