import config from '@payload-config'
import 'dotenv/config'
import { getPayload } from 'payload'

const p = await getPayload({ config })
const scriptContext = { disableRevalidate: true }

// Update header nav: Product Range → /product-range/symbol
await p.updateGlobal({
  slug: 'header',
  context: scriptContext,
  data: {
    navItems: [
      { link: { type: 'custom' as const, label: 'Home', url: '/' } },
      { link: { type: 'custom' as const, label: 'Product Range', url: '/product-range/symbol' } },
      { link: { type: 'custom' as const, label: 'Technology', url: '/technology' } },
      { link: { type: 'custom' as const, label: 'Product Guarantee', url: '/product-guarantee' } },
      { link: { type: 'custom' as const, label: 'About us', url: '/about-us' } },
      { link: { type: 'custom' as const, label: 'Where to buy', url: '/where-to-buy' } },
      { link: { type: 'custom' as const, label: 'Contact Us', url: '/contact-us' } },
    ],
  },
})

console.log('✅ Nav updated: Product Range → /product-range/symbol')
process.exit(0)
