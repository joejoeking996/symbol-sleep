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
const scriptContext = { disableRevalidate: true }

const mediaDir = path.resolve(__dirname, '../public/media')

// Helper: upload a media file
async function uploadMedia(filename: string, alt: string): Promise<number | null> {
  const filePath = path.join(mediaDir, filename)
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠ File not found: ${filename}`)
    return null
  }
  const fileBuffer = fs.readFileSync(filePath)
  const fileSize = fs.statSync(filePath).size

  try {
    const media = await payload.create({
      collection: 'media',
      context: scriptContext,
      data: { alt },
      file: {
        data: fileBuffer,
        mimetype: 'image/jpeg',
        name: filename,
        size: fileSize,
      },
    })
    console.log(`  ✅ Media #${media.id}: ${filename}`)
    return media.id
  } catch (err: any) {
    console.error(`  ❌ Failed: ${filename} - ${err.message}`)
    return null
  }
}

// ====== STEP 1: Upload all product images ======
console.log('\n📤 Uploading product images...\n')

// Symbol hero
const symbolHeroId = await uploadMedia('1-背景图.jpg', 'SYMBOL product range hero banner')

// SYMBOL products
const symbolProducts: { name: string; filename: string; comfortLevel: string; slug: string }[] = [
  { name: 'Rest Pedic', filename: '2-ExtraFirm-RestPedic.jpg', comfortLevel: 'extraFirm', slug: 'rest-pedic' },
  { name: 'Luxury Comfort', filename: '2-ExtraFirm-LuxuryComfort.jpg', comfortLevel: 'extraFirm', slug: 'luxury-comfort' },
  { name: 'Ottawa', filename: '2-ExtraFirm-Ottawa.jpg', comfortLevel: 'extraFirm', slug: 'ottawa' },
  { name: 'Super Sleep', filename: '2-ExtraFirm-SuperSleep.jpg', comfortLevel: 'extraFirm', slug: 'super-sleep' },
  { name: 'Tasmania Blue Gum', filename: '2-ExtraFirm-TasmaniaBlueGum.jpg', comfortLevel: 'extraFirm', slug: 'tasmania-blue-gum' },
  { name: 'Advanced Support', filename: '3-Firm-AdvancedSupport.jpg', comfortLevel: 'firm', slug: 'advanced-support' },
  { name: 'Ecstasy', filename: '3-Firm-Ecstasy.jpg', comfortLevel: 'firm', slug: 'ecstasy' },
  { name: 'Luxury Support', filename: '3-Firm-LuxurySupport.jpg', comfortLevel: 'firm', slug: 'luxury-support' },
  { name: 'Shine Firm', filename: '3-Firm-ShineFirm.jpg', comfortLevel: 'firm', slug: 'shine-firm' },
  { name: 'Treasure Firm', filename: '3-Firm-TreasureFirm.jpg', comfortLevel: 'firm', slug: 'treasure-firm' },
  { name: 'Vienna', filename: '3-Firm-Vienna.jpg', comfortLevel: 'firm', slug: 'vienna' },
  { name: 'Comfort', filename: '4-Medum-Comfort.jpg', comfortLevel: 'medium', slug: 'comfort' },
  { name: 'Shine Medium', filename: '4-Medum-ShineMedium.jpg', comfortLevel: 'medium', slug: 'shine-medium' },
  { name: 'Treasure Medium', filename: '4-Medum-TreasureMedium.jpg', comfortLevel: 'medium', slug: 'treasure-medium' },
  { name: 'Ultimate Care', filename: '4-Medum-UltimateCare.jpg', comfortLevel: 'medium', slug: 'ultimate-care' },
  { name: 'Vissta', filename: '4-Medum-Vissta.jpg', comfortLevel: 'medium', slug: 'vissta' },
]

// BellaRest hero
const bellarestHeroId = await uploadMedia('1-首图背景.jpg', 'BellaRest product range hero banner')

// BellaRest products
const bellarestProducts: { name: string; filename: string; comfortLevel: string; slug: string }[] = [
  { name: 'Brighton Firm', filename: '2-Firm-Brighton Firm.jpg', comfortLevel: 'firm', slug: 'brighton-firm' },
  { name: 'Brighton Medium', filename: '2-Firm-Brighton Medium.jpg', comfortLevel: 'firm', slug: 'brighton-medium' },
  { name: 'Barossa', filename: '3-Plush-Barossa.jpg', comfortLevel: 'plush', slug: 'barossa' },
  { name: 'Vintage', filename: '3-Plush-Vintage.jpg', comfortLevel: 'plush', slug: 'vintage' },
]

// Upload all product images
type ProductSeed = { name: string; mediaId: number | null; comfortLevel: string; slug: string }
const symbolProductMedia: ProductSeed[] = []
for (const p of symbolProducts) {
  const mediaId = await uploadMedia(p.filename, `${p.name} mattress - SYMBOL`)
  symbolProductMedia.push({ ...p, mediaId })
}

const bellarestProductMedia: ProductSeed[] = []
for (const p of bellarestProducts) {
  const mediaId = await uploadMedia(p.filename, `${p.name} mattress - BellaRest`)
  bellarestProductMedia.push({ ...p, mediaId })
}

// ====== STEP 2: Create/update Product Ranges ======
console.log('\n📦 Creating product ranges...\n')

const upsertRange = async (slug: string, data: any) => {
  const existing = await payload.find({
    collection: 'product-ranges',
    limit: 1,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  if (existing.docs[0]) {
    const updated = await payload.update({
      collection: 'product-ranges',
      context: scriptContext,
      id: existing.docs[0].id,
      data,
    })
    console.log(`  ✅ Updated range: ${updated.name} (#${updated.id})`)
    return updated
  } else {
    const created = await payload.create({
      collection: 'product-ranges',
      context: scriptContext,
      data: { ...data, slug },
    })
    console.log(`  ✅ Created range: ${created.name} (#${created.id})`)
    return created
  }
}

const symbolRange = await upsertRange('symbol', {
  name: 'SYMBOL',
  shortDescription: 'For Yourself And Your Loved Ones — Premium sleep solutions crafted with decades of expertise for every body and every bedroom.',
  bannerImage: symbolHeroId,
})

const bellarestRange = await upsertRange('bellarest', {
  name: 'BellaRest',
  shortDescription: 'For every age for everyone — Thoughtfully designed mattresses that bring comfort, support and quality to every home.',
  bannerImage: bellarestHeroId,
})

// ====== STEP 3: Create/update Products ======
console.log('\n🛏️  Creating products...\n')

const upsertProduct = async (slug: string, rangeId: number, data: any) => {
  const existing = await payload.find({
    collection: 'products',
    limit: 1,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  if (existing.docs[0]) {
    const updated = await payload.update({
      collection: 'products',
      context: scriptContext,
      id: existing.docs[0].id,
      data: { ...data, range: rangeId },
    })
    return updated
  } else {
    const created = await payload.create({
      collection: 'products',
      context: scriptContext,
      data: { ...data, range: rangeId, slug },
    })
    return created
  }
}

const defaultDescription = 'Exclusive stay-cool foam meets memory foam that hugs all the right spots. A customer favorite designed for comfort.'

// Create SYMBOL products
const symbolProductIds: number[] = []
for (const p of symbolProductMedia) {
  const product = await upsertProduct(p.slug, symbolRange.id, {
    name: p.name,
    comfortLevel: p.comfortLevel,
    shortDescription: defaultDescription,
    mainImage: p.mediaId,
  })
  symbolProductIds.push(product.id)
  console.log(`  ✅ ${p.name} (#${product.id}) [${p.comfortLevel}]`)
}

// Create BellaRest products
const bellarestProductIds: number[] = []
for (const p of bellarestProductMedia) {
  const product = await upsertProduct(p.slug, bellarestRange.id, {
    name: p.name,
    comfortLevel: p.comfortLevel,
    shortDescription: defaultDescription,
    mainImage: p.mediaId,
  })
  bellarestProductIds.push(product.id)
  console.log(`  ✅ ${p.name} (#${product.id}) [${p.comfortLevel}]`)
}

// ====== STEP 4: Link products to ranges ======
console.log('\n🔗 Linking products to ranges...\n')

await payload.update({
  collection: 'product-ranges',
  context: scriptContext,
  id: symbolRange.id,
  data: { products: symbolProductIds },
})
console.log(`  ✅ SYMBOL range linked to ${symbolProductIds.length} products`)

await payload.update({
  collection: 'product-ranges',
  context: scriptContext,
  id: bellarestRange.id,
  data: { products: bellarestProductIds },
})
console.log(`  ✅ BellaRest range linked to ${bellarestProductIds.length} products`)

console.log('\n🎉 All product ranges and products seeded successfully!')
process.exit(0)
