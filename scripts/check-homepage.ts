import config from '@payload-config'
import 'dotenv/config'
import { getPayload } from 'payload'

const p = await getPayload({ config })
const home = await p.find({
  collection: 'pages',
  limit: 1,
  pagination: false,
  where: { slug: { equals: 'home' } },
})
const doc = home.docs[0]
console.log('Found homepage:', !!doc)
if (doc) {
  console.log('id:', doc.id)
  console.log('isHomepage:', doc.isHomepage)
  const layout = doc.layout as any[]
  console.log('layout length:', layout?.length)
  for (const b of layout || []) {
    console.log('--- block:', b.blockType)
    console.log('  slides:', (b as any).slides?.length)
    console.log('  backgroundImage:', !!(b as any).backgroundImage)
    console.log('  image:', !!(b as any).image)
    if (b.blockType === 'homepageHero' && (b as any).slides) {
      for (const s of (b as any).slides) {
        console.log('    slide image:', typeof s.image, s.image)
      }
    }
  }
} else {
  console.log('No homepage found!')
}

// Also check media count
const media = await p.find({ collection: 'media', limit: 20, pagination: false })
console.log('\nMedia records:', media.totalDocs)
for (const m of media.docs) {
  console.log('  #' + m.id, m.filename, m.alt)
}

process.exit(0)
