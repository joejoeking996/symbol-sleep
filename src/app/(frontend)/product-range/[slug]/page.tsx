import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import type { Metadata } from 'next'

import { Media } from '@/components/Media'
import type { Product, ProductRange } from '@/payload-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Args = {
  params: Promise<{
    slug: string
  }>
}

const comfortGroups = [
  { label: 'Extra Firm', value: 'extraFirm' },
  { label: 'Firm', value: 'firm' },
  { label: 'Medium', value: 'medium' },
  { label: 'Plush', value: 'plush' },
  { label: 'Soft', value: 'soft' },
]

const fallbackDescription =
  'Exclusive stay-cool foam meets memory foam that hugs all the right spots. A customer favorite designed for comfort and support.'

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const data = await queryRangeBySlug(slug)
  if (!data?.range) return { title: 'Product Range | SYMBOL' }
  return {
    title: `${data.range.name} Product Range | SYMBOL`,
    description: data.range.shortDescription || `Explore ${data.range.name} mattress collection.`,
  }
}

export default async function ProductRangePage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const data = await queryRangeBySlug(slug)

  if (!data?.range) {
    return (
      <main className="container py-24">
        <h1 className="font-serif text-5xl">Product range not found</h1>
      </main>
    )
  }

  const { products, range, allRanges } = data
  const currentIndex = allRanges.findIndex((r) => r.slug === slug)
  const prevRange = currentIndex > 0 ? allRanges[currentIndex - 1] : allRanges[allRanges.length - 1]
  const nextRange = currentIndex < allRanges.length - 1 ? allRanges[currentIndex + 1] : allRanges[0]

  const groups = comfortGroups
    .map((group) => ({
      ...group,
      products: products.filter((product) => product.comfortLevel === group.value),
    }))
    .filter((group) => group.products.length > 0)

  const displayGroups =
    groups.length > 0
      ? groups
      : [{ label: 'Products', value: 'products', products }]

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[620px] overflow-hidden bg-[#1c1a17] md:min-h-[860px]">
        {range.bannerImage && typeof range.bannerImage === 'object' ? (
          <Media fill imgClassName="object-cover opacity-80" priority resource={range.bannerImage} />
        ) : range.coverImage && typeof range.coverImage === 'object' ? (
          <Media fill imgClassName="object-cover opacity-80" priority resource={range.coverImage} />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_32%,#756453_0%,#1c1a17_58%,#070707_100%)]" />
        )}
        <div className="absolute inset-0 bg-black/15" />

        {/* Range switcher tabs */}
        <div className="absolute right-4 top-24 z-10 flex items-center gap-1 md:right-8 md:top-28">
          {allRanges.map((r) => (
            <Link
              className={`rounded-full px-5 py-2 text-sm font-medium backdrop-blur-sm transition ${
                r.slug === slug
                  ? 'bg-white/25 text-white'
                  : 'bg-white/8 text-white/60 hover:bg-white/15 hover:text-white/85'
              }`}
              href={`/product-range/${r.slug}`}
              key={r.slug}
            >
              {r.name}
            </Link>
          ))}
        </div>

        {/* Arrow navigation between ranges */}
        {allRanges.length > 1 && (
          <>
            <Link
              aria-label={`Switch to ${prevRange.name}`}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/70 backdrop-blur-sm transition hover:bg-white/25 hover:text-white md:left-8 md:p-3"
              href={`/product-range/${prevRange.slug}`}
            >
              <ChevronLeft size={24} />
            </Link>
            <Link
              aria-label={`Switch to ${nextRange.name}`}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/70 backdrop-blur-sm transition hover:bg-white/25 hover:text-white md:right-8 md:p-3"
              href={`/product-range/${nextRange.slug}`}
            >
              <ChevronRight size={24} />
            </Link>
          </>
        )}

        <div className="container relative flex min-h-[620px] items-end pb-16 md:min-h-[860px] md:pb-20">
          <div className="max-w-3xl">
            <p className="font-serif text-5xl leading-none text-white md:text-7xl lg:text-8xl">
              {range.name}
            </p>
            {range.shortDescription && (
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                {range.shortDescription}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-[#f5f4f1] py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-[160px_1fr] xl:grid-cols-[180px_1fr]">
          {/* Sidebar navigation */}
          <aside className="hidden pt-3 lg:block">
            <nav className="sticky top-28 space-y-3 border-l border-[#d9d3c8] pl-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#b09a72]">
                Comfort
              </p>
              {displayGroups.map((group) => (
                <a
                  className="block text-sm text-[#6f6a62] transition-colors hover:text-[#2a2927]"
                  href={`#${group.value}`}
                  key={group.value}
                >
                  {group.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Product groups */}
          <div className="space-y-20">
            {products.length === 0 && (
              <div className="border border-[#ddd7cc] bg-white/70 p-10 text-center">
                <h2 className="font-serif text-3xl text-[#2a2927]">Products coming soon</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6f6a62]">
                  Add products in the admin panel and assign them to this range to publish the product grid here.
                </p>
              </div>
            )}

            {displayGroups.map((group, groupIndex) => (
              <section
                className={groupIndex > 0 ? 'border-t border-[#d7d1c5] pt-14' : ''}
                id={group.value}
                key={group.value}
              >
                <h2 className="font-serif text-2xl text-[#8f7147] md:text-3xl">{group.label}</h2>
                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {group.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link className="group block" href={`/product/${product.slug}`}>
      <div className="relative aspect-[1.25] overflow-hidden rounded-sm bg-[#dedbd5] shadow-sm">
        {product.mainImage && typeof product.mainImage === 'object' ? (
          <Media
            fill
            imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            resource={product.mainImage}
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#ebe7df,#c9c3b8)]" />
        )}
      </div>
      <h3 className="mt-4 font-serif text-xl leading-tight text-[#2a2927] md:text-2xl">
        {product.name}
      </h3>
    </Link>
  )
}

const queryAllRanges = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'product-ranges',
    limit: 20,
    pagination: false,
    sort: 'createdAt',
  })
  return result.docs
})

const queryRangeBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })

  const [rangeResult, allRangesResult] = await Promise.all([
    payload.find({
      collection: 'product-ranges',
      depth: 2,
      limit: 1,
      pagination: false,
      where: { slug: { equals: slug } },
    }),
    payload.find({
      collection: 'product-ranges',
      limit: 20,
      pagination: false,
      sort: 'createdAt',
    }),
  ])

  const range = rangeResult.docs[0]

  if (!range) return null

  const allRanges = allRangesResult.docs.map((r) => ({
    name: r.name,
    slug: r.slug,
  }))

  const relatedProductIds = Array.isArray(range.products)
    ? range.products
        .map((p) => (typeof p === 'object' ? p.id : p))
        .filter(Boolean)
    : []

  const productResult = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 100,
    pagination: false,
    sort: 'createdAt',
    where:
      relatedProductIds.length > 0
        ? {
            or: [
              { range: { equals: range.id } },
              { id: { in: relatedProductIds } },
            ],
          }
        : { range: { equals: range.id } },
  })

  const uniqueProducts = Array.from(
    new Map(productResult.docs.map((p) => [p.id, p])).values(),
  )

  return { products: uniqueProducts, range, allRanges }
})
