import config from '@payload-config'
import 'dotenv/config'
import { getPayload } from 'payload'

const p = await getPayload({ config })
const scriptContext = { disableRevalidate: true }

await p.updateGlobal({
  slug: 'footer',
  context: scriptContext,
  data: {
    navItems: [
      { link: { type: 'custom' as const, label: 'Product Range', url: '/product-range/symbol' } },
      { link: { type: 'custom' as const, label: 'Technology', url: '/technology' } },
      { link: { type: 'custom' as const, label: 'About us', url: '/about-us' } },
      { link: { type: 'custom' as const, label: 'Contact Us', url: '/contact-us' } },
    ],
  },
})

console.log('✅ Footer updated')
process.exit(0)
