// @ts-nocheck
import config from '@payload-config'
import 'dotenv/config'
import { getPayload } from 'payload'

const payload = await getPayload({ config })
const scriptContext = { disableRevalidate: true }

const home = await payload.find({
  collection: 'pages',
  limit: 1,
  pagination: false,
  where: { slug: { equals: 'home' } },
})

if (home.docs[0]) {
  const layout = home.docs[0].layout as any[]
  const updatedLayout = layout.map((block: any) => {
    if (block.blockType === 'storyVideoPanel') {
      return { ...block, videoUrl: '/media/4-Video.mp4' }
    }
    return block
  })

  await payload.update({
    collection: 'pages',
    context: scriptContext,
    id: home.docs[0].id,
    data: { layout: updatedLayout },
  })
  console.log('✅ Updated story video URL to /media/4-Video.mp4')
} else {
  console.log('⚠️ Homepage not found')
}

process.exit(0)
