// @ts-nocheck
import config from '@payload-config'
import 'dotenv/config'
import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const payload = await getPayload({ config })
const scriptContext = {
  disableRevalidate: true,
}

const mediaDir = path.resolve(__dirname, '../public/media')

// Map of material files to create as media records
const mediaFiles: { filename: string; alt: string }[] = [
  { filename: '1-顶部背景图-轮播图1.jpg', alt: 'SYMBOL Bedding hero banner slide 1' },
  { filename: '1-顶部背景图-轮播图2.jpg', alt: 'For Yourself And Your Loved Ones slide 2' },
  { filename: '1-顶部背景图-轮播图3.jpg', alt: 'Leading-edge Technology slide 3' },
  { filename: '2-symbol.jpg', alt: 'SYMBOL product range card' },
  { filename: '2-Bellarest.jpg', alt: 'BellaRest product range card' },
  { filename: '3-Tech.jpg', alt: 'Technology background' },
  { filename: '4-背景图.jpg', alt: 'Our Story video section background' },
  { filename: '4-Video封面.jpg', alt: 'Brand video poster cover' },
]

// Upload each media file
const mediaRecordMap: Record<string, number> = {}

for (const { filename, alt } of mediaFiles) {
  const filePath = path.join(mediaDir, filename)

  if (!fs.existsSync(filePath)) {
    console.log(`⚠ File not found, skipping: ${filename}`)
    continue
  }

  const fileBuffer = fs.readFileSync(filePath)
  const fileSize = fs.statSync(filePath).size

  console.log(`📤 Uploading: ${filename} (${(fileSize / 1024).toFixed(1)} KB)`)

  try {
    const media = await payload.create({
      collection: 'media',
      context: scriptContext,
      data: {
        alt,
      },
      file: {
        data: fileBuffer,
        mimetype: filename.endsWith('.png') ? 'image/png' : 'image/jpeg',
        name: filename,
        size: fileSize,
      },
    })

    mediaRecordMap[filename] = media.id
    console.log(`✅ Created media #${media.id}: ${filename}`)
  } catch (err: any) {
    console.error(`❌ Failed to upload ${filename}:`, err.message)
  }
}

console.log('\n📋 Media records created:', mediaRecordMap)

// Now update the homepage
const slide1Id = mediaRecordMap['1-顶部背景图-轮播图1.jpg']
const slide2Id = mediaRecordMap['1-顶部背景图-轮播图2.jpg']
const slide3Id = mediaRecordMap['1-顶部背景图-轮播图3.jpg']
const symbolImgId = mediaRecordMap['2-symbol.jpg']
const bellarestImgId = mediaRecordMap['2-Bellarest.jpg']
const techBgId = mediaRecordMap['3-Tech.jpg']
const videoBgId = mediaRecordMap['4-背景图.jpg']
const videoPosterId = mediaRecordMap['4-Video封面.jpg']

// Build carousel slides
const carouselSlides: any[] = []

if (slide1Id) {
  carouselSlides.push({
    image: slide1Id,
    title: 'OUR STORY',
    subtitle: 'EXCELLENT SLEEP SOLUTION OVER 52 YEARS OF EXPERIENCE',
    overlayOpacity: 35,
  })
}

if (slide2Id) {
  carouselSlides.push({
    image: slide2Id,
    title: 'For Yourself And Your Loved Ones',
    subtitle: '',
    overlayOpacity: 35,
  })
}

if (slide3Id) {
  carouselSlides.push({
    image: slide3Id,
    title: 'Leading-edge Technology',
    subtitle: 'And High-quality Manufacturing',
    overlayOpacity: 35,
  })
}

const homeData: any = {
  title: 'Home',
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'none',
  },
  layout: [
    {
      blockType: 'homepageHero',
      slides: carouselSlides,
      title: 'OUR STORY',
      subtitle: 'EXCELLENT SLEEP SOLUTION OVER 52 YEARS OF EXPERIENCE',
    },
    {
      blockType: 'productRangeShowcase',
      heading: 'Product Range',
      ranges: [
        {
          title: 'SYMBOL',
          subtitle: 'For Yourself And Your Loved Ones',
          href: '/product-range/symbol',
          ...(symbolImgId ? { image: symbolImgId } : {}),
        },
        {
          title: 'BellaRest',
          subtitle: 'For every age for everyone',
          href: '/product-range/bellarest',
          ...(bellarestImgId ? { image: bellarestImgId } : {}),
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
      ...(techBgId ? { backgroundImage: techBgId } : {}),
    },
    {
      blockType: 'storyVideoPanel',
      heading: 'OUR STORY',
      subheading: 'EXCELLENT SLEEP SOLUTION OVER 52 YEARS OF EXPERIENCE',
      linkLabel: 'About Us',
      href: '/about-us',
      videoUrl: '/about-us',
      ...(videoBgId ? { backgroundImage: videoBgId } : {}),
      ...(videoPosterId ? { videoPoster: videoPosterId } : {}),
    },
  ],
  meta: {
    title: 'SYMBOL | Excellent Sleep Solution',
    description: 'Premium sleep solution website powered by an operations-ready CMS.',
  },
}

// Update or create the homepage
const existingHome = await payload.find({
  collection: 'pages',
  limit: 1,
  pagination: false,
  where: {
    slug: {
      equals: 'home',
    },
  },
})

if (existingHome.docs[0]) {
  console.log(`\n📝 Updating existing homepage (id: ${existingHome.docs[0].id})`)
  await payload.update({
    collection: 'pages',
    context: scriptContext,
    id: existingHome.docs[0].id,
    data: homeData,
  })
} else {
  console.log('\n📝 Creating new homepage')
  await payload.create({
    collection: 'pages',
    context: scriptContext,
    data: homeData,
  })
}

console.log('\n🎉 Homepage media and layout seeded successfully!')
process.exit(0)
