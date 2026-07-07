'use client'

import React, { useMemo, useState } from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

type Store = {
  address?: string | null
  googleMapQuery?: string | null
  name?: string | null
  phone?: string | null
  region?: string | null
}

type Props = {
  heading?: string | null
  heroImage?: MediaType | number | string | null
  note?: string | null
  searchPlaceholder?: string | null
  stores?: Store[] | null
  subheading?: string | null
}

const fallbackStores: Store[] = [
  {
    address: '156 Main Road, Moonah 7009 TAS',
    name: 'Symbol Sleep Bedding',
    phone: '03 1234 1234',
    region: 'TAS',
  },
  {
    address: '156 Main Road, Moonah 7009 TAS',
    name: 'Symbol Sleep Bedding',
    phone: '03 1234 1234',
    region: 'TAS',
  },
  {
    address: '156 Main Road, Moonah 7009 TAS',
    name: 'Bellarest Sleep Bedding',
    phone: '03 1234 1234',
    region: 'TAS',
  },
]

export const WhereToBuyBlock: React.FC<Props> = ({
  heading,
  heroImage,
  note,
  searchPlaceholder,
  stores,
  subheading,
}) => {
  const safeStores = stores?.length ? stores : fallbackStores
  const regions = useMemo(
    () => Array.from(new Set(safeStores.map((store) => store.region).filter(Boolean))) as string[],
    [safeStores],
  )
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const filteredStores = safeStores.filter((store) => {
    const haystack =
      `${store.name || ''} ${store.address || ''} ${store.region || ''}`.toLowerCase()
    const matchesQuery = query ? haystack.includes(query.toLowerCase()) : true
    const matchesRegion = region ? store.region === region : true

    return matchesQuery && matchesRegion
  })
  const visibleStores = filteredStores
  const hasResults = visibleStores.length > 0
  const activeStore = hasResults
    ? visibleStores[Math.min(activeIndex, visibleStores.length - 1)]
    : null
  const mapQuery = getMapQuery(activeStore)
  const resetFilters = () => {
    setQuery('')
    setRegion('')
    setActiveIndex(0)
  }

  return (
    <section className="where-buy">
      <div className="where-buy__hero">
        {heroImage && typeof heroImage === 'object' ? (
          <Media fill imgClassName="object-cover" priority resource={heroImage} />
        ) : (
          <div className="where-buy__hero-fallback" />
        )}
        <div className="where-buy__overlay" />
        <div className="where-buy__hero-inner">
          <h1>{heading || 'Shop in-store at Australia'}</h1>
          {subheading && <p>{subheading}</p>}
          <div className="where-buy__search">
            <input
              onChange={(event) => {
                setQuery(event.target.value)
                setActiveIndex(0)
              }}
              placeholder={searchPlaceholder || 'Enter your suburb to see retailers close to you.'}
              value={query}
            />
            <button type="button">Search</button>
            <select
              aria-label="Region"
              onChange={(event) => {
                setRegion(event.target.value)
                setActiveIndex(0)
              }}
              value={region}
            >
              <option value="">Region</option>
              {regions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="where-buy__body">
        <div className="where-buy__stores">
          {hasResults ? (
            visibleStores.map((store, index) => (
              <button
                aria-pressed={index === activeIndex}
                className={index === activeIndex ? 'is-active' : ''}
                key={`${store.name || 'store'}-${store.address || index}-${index}`}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <strong>{store.name}</strong>
                <span>{store.address}</span>
                {store.phone && <span>Phone: {store.phone}</span>}
              </button>
            ))
          ) : (
            <div className="where-buy__empty" role="status">
              <strong>No retailers found</strong>
              <span>Try another suburb or clear the filters to view all stores.</span>
              <button onClick={resetFilters} type="button">
                Clear filters
              </button>
            </div>
          )}
        </div>

        <div className="where-buy__map">
          {activeStore ? (
            <>
              <iframe
                key={mapQuery}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                title={`${activeStore?.name || 'Store'} map`}
              />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                rel="noreferrer"
                target="_blank"
              >
                View on Google Maps
              </a>
            </>
          ) : (
            <div className="where-buy__map-empty" role="status">
              Select a retailer to view the map.
            </div>
          )}
        </div>

        {note && <p className="where-buy__note">{note}</p>}
      </div>
    </section>
  )
}

function getMapQuery(store?: Store | null) {
  if (!store) return 'Australia'

  return store.googleMapQuery || `${store.name || ''} ${store.address || ''}`.trim() || 'Australia'
}
