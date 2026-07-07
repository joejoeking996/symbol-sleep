import config from '@payload-config'
import 'dotenv/config'
import { getPayload } from 'payload'

const p = await getPayload({ config })
const scriptContext = { disableRevalidate: true }

// Build the full homepage data with proper media references
const homeData: any = {
  title: 'Home',
  slug: 'home',
  _status: 'published',
  isHomepage: true,
  hero: {
    type: 'none',
  },
  layout: [
    {
      blockType: 'homepageHero',
      title: 'OUR STORY',
      subtitle: 'EXCELLENT SLEEP SOLUTION OVER 52 YEARS OF EXPERIENCE',
      slides: [
        {
          image: 1,
          title: 'OUR STORY',
          subtitle: 'EXCELLENT SLEEP SOLUTION OVER 52 YEARS OF EXPERIENCE',
          overlayOpacity: 35,
        },
        {
          image: 2,
          title: 'For Yourself And Your Loved Ones',
          subtitle: '',
          overlayOpacity: 35,
        },
        {
          image: 3,
          title: 'Leading-edge Technology',
          subtitle: 'And High-quality Manufacturing',
          overlayOpacity: 35,
        },
      ],
    },
    {
      blockType: 'productRangeShowcase',
      heading: 'Product Range',
      ranges: [
        {
          title: 'SYMBOL',
          subtitle: 'For Yourself And Your Loved Ones',
          href: '/product-range/symbol',
          image: 4,
        },
        {
          title: 'BellaRest',
          subtitle: 'For every age for everyone',
          href: '/product-range/bellarest',
          image: 5,
        },
      ],
    },
    {
      blockType: 'technologyPanel',
      eyebrow: 'Technology',
      heading: 'Leading-edge Technology And High-quality Manufacturing',
      body: 'Symbol is the leader in sleep innovation. Decades of research and development deliver one of the world\'s most advanced sleep systems, designed to support the body and improve sleep quality.',
      linkLabel: 'DETAILS',
      href: '/technology',
      backgroundImage: 6,
    },
    {
      blockType: 'storyVideoPanel',
      heading: 'OUR STORY',
      subheading: 'EXCELLENT SLEEP SOLUTION OVER 52 YEARS OF EXPERIENCE',
      linkLabel: 'About Us',
      href: '/about-us',
      videoUrl: '/media/4-Video.mp4',
      backgroundImage: 7,
      videoPoster: 8,
    },
  ],
  meta: {
    title: 'SYMBOL | Excellent Sleep Solution',
    description: 'Premium sleep solution website powered by an operations-ready CMS.',
  },
}

const existingHome = await p.find({
  collection: 'pages',
  limit: 1,
  pagination: false,
  where: { slug: { equals: 'home' } },
})

if (existingHome.docs[0]) {
  console.log('Updating homepage id:', existingHome.docs[0].id)
  const result = await p.update({
    collection: 'pages',
    context: scriptContext,
    id: existingHome.docs[0].id,
    data: homeData,
  })
  console.log('✅ Updated! isHomepage:', result.isHomepage)
  const layout = result.layout as any[]
  const heroBlock = layout[0] as any
  console.log('  slides count:', heroBlock.slides?.length)
  console.log('  slide 1 image:', heroBlock.slides?.[0]?.image)
} else {
  console.log('Creating new homepage')
  await p.create({
    collection: 'pages',
    context: scriptContext,
    data: homeData,
  })
  console.log('✅ Created!')
}

// Also make sure nav items are set
await p.updateGlobal({
  slug: 'header',
  context: scriptContext,
  data: {
    navItems: [
      { link: { type: 'custom' as const, label: 'Home', url: '/' } },
      { link: { type: 'custom' as const, label: 'Product Range', url: '/product-range' } },
      { link: { type: 'custom' as const, label: 'Technology', url: '/technology' } },
      { link: { type: 'custom' as const, label: 'Product Guarantee', url: '/product-guarantee' } },
      { link: { type: 'custom' as const, label: 'About us', url: '/about-us' } },
      { link: { type: 'custom' as const, label: 'Where to buy', url: '/where-to-buy' } },
      { link: { type: 'custom' as const, label: 'Contact Us', url: '/contact-us' } },
    ],
  },
})

await p.updateGlobal({
  slug: 'footer',
  context: scriptContext,
  data: {
    navItems: [
      { link: { type: 'custom' as const, label: 'Product Range', url: '/product-range' } },
      { link: { type: 'custom' as const, label: 'Technology', url: '/technology' } },
      { link: { type: 'custom' as const, label: 'About us', url: '/about-us' } },
      { link: { type: 'custom' as const, label: 'Contact Us', url: '/contact-us' } },
    ],
  },
})

console.log('✅ Nav and footer updated')
process.exit(0)
