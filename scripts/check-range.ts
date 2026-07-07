import config from '@payload-config'
import 'dotenv/config'
import { getPayload } from 'payload'

const p = await getPayload({ config })
const r = await p.find({ collection: 'product-ranges', limit: 10, pagination: false, depth: 1 })
for (const doc of r.docs) {
  console.log(doc.name, '| bannerImage type:', typeof doc.bannerImage)
  const bi = doc.bannerImage as any
  console.log('  id:', bi?.id, 'filename:', bi?.filename, 'url:', bi?.url)
}
process.exit(0)
