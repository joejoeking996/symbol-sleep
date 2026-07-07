import config from '@payload-config'
import 'dotenv/config'
import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const payload = await getPayload({ config })
const scriptContext = { disableRevalidate: true }

const mediaDir = path.resolve(__dirname, '../public/media')

// Helper: upload media
async function upload(filename: string, alt: string): Promise<number | null> {
  const filePath = path.join(mediaDir, filename)
  if (!fs.existsSync(filePath)) { console.log(`  ⚠ Missing: ${filename}`); return null }
  const buf = fs.readFileSync(filePath)
  const size = fs.statSync(filePath).size
  try {
    const m = await payload.create({
      collection: 'media', context: scriptContext, data: { alt },
      file: { data: buf, mimetype: filename.endsWith('.png') ? 'image/png' : 'image/jpeg', name: filename, size },
    })
    console.log(`  ✅ Media #${m.id}: ${filename}`)
    return m.id
  } catch (e: any) { console.error(`  ❌ ${filename}: ${e.message}`); return null }
}

console.log('📤 Uploading Vienna product images...\n')

// Hero image
const heroId = await upload('1-顶部图.jpg', 'Vienna mattress hero shot')

// 13 layer images
const layerNames = [
  'BEKAERT Stretch Knit Cover',
  'Supersoft Polyurethane Foam',
  'VIRASE Antiviral Treatment',
  'Dacron Fresh Fiber Layer',
  'High Resilience Comfort Foam',
  'Pressure Relief Transition Foam',
  'Individually Pocketed Spring System',
  'Reinforced Edge Support Foam',
  'High Density Support Base Foam',
  'Stabilizing Core Layer',
  'Bottom Insulation Pad',
  'Moisture Barrier Layer',
  'Non-Slip Base Fabric',
]

const layerDescs = [
  'Premium Belgian-made stretch knit textile providing a soft, breathable first touch. Engineered for durability and a luxurious hand-feel.',
  'Ultra-soft polyurethane foam layer designed to deliver immediate cushioning comfort and reduce surface pressure.',
  'Advanced antiviral treatment applied to the quilt layers, helping maintain a cleaner and fresher sleep surface.',
  'High-performance polyester fiber padding that enhances loft, breathability, and long-term shape retention.',
  'High-resilience foam that provides responsive support while maintaining consistent comfort across the mattress surface.',
  'Specialized transition foam that evenly distributes body weight and reduces motion transfer between comfort and support layers.',
  'Precision-engineered pocket springs that move independently to contour to your body shape and minimize partner disturbance.',
  'Dense foam encasement around the spring unit providing a stable seating edge and extending the usable sleep surface.',
  'High-density structural foam forming the foundation of the mattress support system for long-lasting durability.',
  'Reinforced core that locks the spring system in place and ensures consistent support across every inch of the mattress.',
  'Insulating bottom layer that isolates the spring system and provides additional structural integrity.',
  'Protective barrier that shields internal layers from environmental moisture while maintaining breathability.',
  'Durable, textured base fabric that prevents mattress shifting on bed frames and provides a clean finished underside.',
]

const layerImageIds: (number | null)[] = []
for (let i = 1; i <= 13; i++) {
  const filename = `Vienna拆分图-${i}.png`
  const id = await upload(filename, `${layerNames[i - 1]} — Vienna mattress layer ${i}`)
  layerImageIds.push(id)
}

// Build explodedLayers array
const explodedLayers = layerNames.map((name, i) => ({
  name,
  description: layerDescs[i],
  color: [
    '#d4c5b2', '#e8dcc8', '#c9e0e8', '#f0eadb',
    '#d5cfc6', '#e2d9cd', '#b8c9d4', '#dfd7c9',
    '#c4bdb0', '#d9d2c5', '#eae4d6', '#ccc7bd',
    '#d1ccbf',
  ][i],
  layerImage: layerImageIds[i],
}))

console.log('\n🛏️ Updating Vienna product...\n')

// Update Vienna product
const existing = await payload.find({
  collection: 'products',
  limit: 1, pagination: false,
  where: { slug: { equals: 'vienna' } },
})

if (existing.docs[0]) {
  await payload.update({
    collection: 'products', context: scriptContext,
    id: existing.docs[0].id,
    data: {
      detailHeroImage: heroId,
      detailLead: 'Combining refined European-inspired design with advanced pocket spring technology, the Vienna delivers a beautifully balanced sleep experience. Each layer is carefully selected to provide targeted support, cooling comfort, and lasting durability.',
      detailNoteTitle: 'About VIRASE Antiviral Treatment',
      detailNote: 'VIRASE is an advanced textile treatment that helps reduce virus activity on fabric surfaces. Laboratory tested for efficacy, it adds an extra layer of protection to your sleep environment without compromising the soft, breathable feel of the mattress cover.',
      specifications: [
        { label: 'Comfort Level', value: 'Firm' },
        { label: 'Spring System', value: 'Individually Pocketed Springs' },
        { label: 'Cover', value: 'BEKAERT Stretch Knit' },
        { label: 'Foam Type', value: 'High Resilience Polyurethane' },
        { label: 'Edge Support', value: 'Reinforced Foam Encasement' },
        { label: 'Warranty', value: '10 Years' },
        { label: 'Made In', value: 'Australia' },
      ],
      explodedLayers,
    },
  })
  console.log('✅ Vienna product updated with layers and hero image')
} else {
  console.log('⚠ Vienna product not found')
}

console.log('\n🎉 Done!')
process.exit(0)
