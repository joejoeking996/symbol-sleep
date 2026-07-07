import config from '@payload-config'
import 'dotenv/config'
import { getPayload } from 'payload'

const payload = await getPayload({ config })
const scriptContext = {
  disableRevalidate: true,
}

const paragraph = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const heroText = {
  root: {
    type: 'root',
    children: [
      {
        type: 'heading',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'OUR STORY',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        tag: 'h1',
        version: 1,
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'EXCELLENT SLEEP SOLUTION OVER 52 YEARS OF EXPERIENCE',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
}

const navItems = [
  ['Home', '/'],
  ['Product Range', '/product-range'],
  ['Technology', '/technology'],
  ['Product Guarantee', '/product-guarantee'],
  ['About us', '/about-us'],
  ['Where to buy', '/where-to-buy'],
  ['Contact Us', '/contact-us'],
].map(([label, url]) => ({
  link: {
    type: 'custom' as const,
    label,
    url,
  },
}))

await payload.updateGlobal({
  slug: 'header',
  context: scriptContext,
  data: {
    navItems,
  },
})

await payload.updateGlobal({
  slug: 'footer',
  context: scriptContext,
  data: {
    navItems: navItems.slice(1, 5),
  },
})

const ranges = [
  {
    name: 'SYMBOL',
    shortDescription: 'For Yourself And Your Loved Ones',
    slug: 'symbol',
  },
  {
    name: 'BellaRest',
    shortDescription: 'For every age for everyone',
    slug: 'bellarest',
  },
]

for (const range of ranges) {
  const existing = await payload.find({
    collection: 'product-ranges',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: range.slug,
      },
    },
  })

  const data: any = {
    ...range,
    description: paragraph(
      `${range.name} is part of the SYMBOL sleep solution portfolio, designed for premium comfort and reliable long-term support.`,
    ),
  }

  if (existing.docs[0]) {
    await payload.update({
      collection: 'product-ranges',
      context: scriptContext,
      id: existing.docs[0].id,
      data,
    })
  } else {
    await payload.create({
      collection: 'product-ranges',
      context: scriptContext,
      data,
    })
  }
}

const symbolRange = await payload.find({
  collection: 'product-ranges',
  limit: 1,
  pagination: false,
  where: {
    slug: {
      equals: 'symbol',
    },
  },
})

const symbolRangeId = symbolRange.docs[0]?.id

if (symbolRangeId) {
  const products = [
    ['Rest Pedic', 'rest-pedic', 'extraFirm'],
    ['Luxury Comfort', 'luxury-comfort', 'extraFirm'],
    ['Ottawa', 'ottawa', 'extraFirm'],
    ['Treasure Firm', 'treasure-firm', 'firm'],
    ['Shine Firm', 'shine-firm', 'firm'],
    ['Vienna', 'vienna', 'firm'],
    ['Luxury Support', 'luxury-support', 'firm'],
    ['Ecstasy', 'ecstasy', 'firm'],
    ['Advanced Support', 'advanced-support', 'firm'],
    ['Treasure Medium', 'treasure-medium', 'medium'],
    ['Shine Medium', 'shine-medium', 'medium'],
    ['Vista', 'vista', 'medium'],
    ['Ultimate Care', 'ultimate-care', 'medium'],
    ['Comfort', 'comfort', 'medium'],
  ]

  for (const [name, slug, comfortLevel] of products) {
    const existing = await payload.find({
      collection: 'products',
      limit: 1,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    const data: any = {
      comfortLevel,
      name,
      range: symbolRangeId,
      shortDescription:
        'Exclusive stay-cool foam meets memory foam that hugs all the right spots. A customer favorite designed for comfort.',
      slug,
    }

    if (existing.docs[0]) {
      await payload.update({
        collection: 'products',
        context: scriptContext,
        id: existing.docs[0].id,
        data,
      })
    } else {
      await payload.create({
        collection: 'products',
        context: scriptContext,
        data,
      })
    }
  }
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
      title: 'OUR STORY',
      subtitle: 'EXCELLENT SLEEP SOLUTION OVER 52 YEARS OF EXPERIENCE',
      overlayOpacity: 0,
    },
    {
      blockType: 'productRangeShowcase',
      heading: 'Product Range',
      ranges: [
        {
          title: 'SYMBOL',
          subtitle: 'For Yourself And Your Loved Ones',
          href: '/product-range/symbol',
        },
        {
          title: 'BellaRest',
          subtitle: 'For every age for everyone',
          href: '/product-range/bellarest',
        },
      ],
    },
    {
      blockType: 'technologyPanel',
      eyebrow: 'Technology',
      heading: 'Leading-edge Technology And High-quality Manufacturing',
      body: 'Symbol is the leader in sleep innovation. Decades of research and development deliver one of the world’s most advanced sleep systems, designed to support the body and improve sleep quality.',
      linkLabel: 'DETAILS',
      href: '/technology',
    },
    {
      blockType: 'storyVideoPanel',
      heading: 'OUR STORY',
      subheading: 'EXCELLENT SLEEP SOLUTION OVER 52 YEARS OF EXPERIENCE',
      linkLabel: 'About Us',
      href: '/about-us',
      videoUrl: '/about-us',
    },
  ],
  meta: {
    title: 'SYMBOL | Excellent Sleep Solution',
    description: 'Premium sleep solution website powered by an operations-ready CMS.',
  },
}

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
  await payload.update({
    collection: 'pages',
    context: scriptContext,
    id: existingHome.docs[0].id,
    data: homeData,
  })
} else {
  await payload.create({
    collection: 'pages',
    context: scriptContext,
    data: homeData,
  })
}

const editablePages: any[] = [
  {
    title: 'Technology',
    slug: 'technology',
    _status: 'published',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'technologyMaterials',
        heroTitle: 'Mattresses\nTechnology',
        heroSubtitle: 'Why choose Symbol Mattresses',
        introHeading: 'The Key to Comfort',
        introBody:
          'Our mattresses are crafted with cooling features, sturdier springs, and denser foams to provide better quality sleep.',
        categories: [
          {
            title: 'Quilt Layers',
            materials: [
              {
                name: 'BEKAERT Stretch Knit Cover',
                eyebrow: 'Quilt Layer',
                title: 'Bekaert Stretch Knit Cover',
                description:
                  'A refined textile surface designed for a breathable, comfortable first touch. Use this area to explain material origin, hand-feel, durability, and how it improves comfort.',
              },
              {
                name: 'Supersoft Polyurethane Foam',
                eyebrow: 'Quilt Layer',
                title: 'Supersoft Polyurethane Foam',
                description:
                  'Soft foam layers help tune the surface feel before the body reaches the deeper support system, adding a more cushioned and balanced sleep experience.',
              },
              {
                name: 'VIRASE Antiviral Treatment',
                eyebrow: 'Quilt Layer',
                title: 'VIRASE Antiviral Treatment',
                description:
                  'Treatment technologies and freshness features can be explained here with supporting claims, usage context, and product imagery.',
              },
              {
                name: 'Dacron Fresh',
                eyebrow: 'Quilt Layer',
                title: 'Dacron Fresh',
                description:
                  'A supporting fiber layer designed to contribute to a cleaner, more comfortable sleeping environment.',
              },
            ],
          },
          {
            title: 'Support Layers',
            materials: [
              {
                name: 'Pocket Spring System',
                eyebrow: 'Support Layer',
                title: 'Pocket Spring System',
                description:
                  'Support layers define resilience, body alignment, and long-term stability across the mattress system.',
              },
              {
                name: 'High Density Base Foam',
                eyebrow: 'Support Layer',
                title: 'High Density Base Foam',
                description:
                  'Dense base foams help maintain structure and reduce unwanted movement through the mattress core.',
              },
            ],
          },
          {
            title: 'Comfort Layers',
            materials: [
              {
                name: 'Cooling Comfort Foam',
                eyebrow: 'Comfort Layer',
                title: 'Cooling Comfort Foam',
                description:
                  'Comfort layers help balance pressure relief, airflow, and the first impression of softness.',
              },
              {
                name: 'Pressure Relief Foam',
                eyebrow: 'Comfort Layer',
                title: 'Pressure Relief Foam',
                description:
                  'Pressure relief materials contour to the body and help distribute weight more evenly.',
              },
            ],
          },
        ],
      },
    ],
    meta: {
      title: 'Technology | SYMBOL',
      description: 'Technology and manufacturing strengths for SYMBOL sleep solutions.',
    },
  },
  {
    title: 'Product Guarantee',
    slug: 'product-guarantee',
    _status: 'published',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'imageTextPanel',
        eyebrow: 'Guarantee',
        heading: 'Reliable quality for long-term sleep comfort',
        body: 'Use this page to clarify product warranty, after-sales process, care guidance and customer confidence.',
        imagePosition: 'right',
        linkLabel: 'Contact Us',
        href: '/contact-us',
      },
      {
        blockType: 'faqSection',
        heading: 'Guarantee FAQ',
        items: [
          {
            question: 'How should warranty information be presented?',
            answer: 'Keep policy details clear, concise and tied to specific product categories.',
          },
          {
            question: 'Can this section be edited by operations?',
            answer: 'Yes. FAQ items can be added, removed and reordered in the page builder.',
          },
        ],
      },
    ],
    meta: {
      title: 'Product Guarantee | SYMBOL',
      description: 'Warranty and quality assurance information for SYMBOL products.',
    },
  },
  {
    title: 'About Us',
    slug: 'about-us',
    _status: 'published',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'aboutStory',
        heroHeading: 'Welcome To\nOur Story',
        heroSubheading:
          'We create better-than-best sleep solutions that help every body feel and live better.',
        introLeft:
          "For more than 52 years, our family business has focused on one essential idea: better rest begins with materials, engineering, and care that people can feel every night.\n\nSleeping is something everyone does, but every body sleeps differently. That is why SYMBOL designs mattresses around real habits, real rooms, and real comfort needs.",
        introRight:
          "Whether customers want a cooler night, stronger support, softer pressure relief, or a refined guest-room experience, our products are developed to make those details easier to choose.\n\nFrom fabric touch to foam response and spring stability, every layer works together to create a more balanced sleep solution.",
        sections: [
          {
            title: 'Why Choose Symbol?',
            body: 'SYMBOL brings together long-term manufacturing knowledge, carefully selected materials, and international product presentation standards.\n\nOur team is committed to making products that feel reliable in daily use, look refined in modern bedrooms, and give partners a clear story to present in the market.',
            imagePosition: 'left',
          },
          {
            title: 'Quality Associations',
            body: 'The brand continues to build its product system around quality control, supplier accountability, and repeatable manufacturing standards.\n\nCertification images, association logos, or audit credentials can be managed from the CMS and displayed here as supporting proof.',
            imagePosition: 'right',
          },
          {
            title: 'Retail Awards and Market Recognition',
            body: 'Use this section for awards, retail recognition, factory achievements, partner milestones, or company history. The layout is designed for longer editorial copy without making the page feel heavy.',
            imagePosition: 'none',
          },
        ],
      },
    ],
    meta: {
      title: 'About Us | SYMBOL',
      description: 'Brand story and company profile.',
    },
  },
  {
    title: 'Where to buy',
    slug: 'where-to-buy',
    _status: 'published',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'whereToBuy',
        heading: 'Shop in-store at Australia',
        subheading: 'Try Symbol Products before you buy in a store near you.',
        searchPlaceholder: 'Enter your suburb to see retailers close to you.',
        note: 'Please call each store before visiting to confirm availability, opening hours and pricing. Different retail partners may carry different mattresses within the same collections.',
        stores: [
          {
            name: 'Symbol Sleep Bedding',
            address: '156 Main Road, Moonah 7009 TAS',
            phone: '03 1234 1234',
            region: 'TAS',
          },
          {
            name: 'Symbol Sleep Bedding',
            address: '156 Main Road, Moonah 7009 TAS',
            phone: '03 1234 1234',
            region: 'TAS',
          },
          {
            name: 'Bellarest Sleep Bedding',
            address: '156 Main Road, Moonah 7009 TAS',
            phone: '03 1234 1234',
            region: 'TAS',
          },
        ],
      },
    ],
    meta: {
      title: 'Where to buy | SYMBOL',
      description: 'Find SYMBOL retail stores and view store addresses on Google Maps.',
    },
  },
  {
    title: 'Contact Us',
    slug: 'contact-us',
    _status: 'published',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'contactPage',
        heading: 'Leave Your Message',
        submitLabel: 'Send',
        successMessage: 'Thank you. Your message has been received.',
        contacts: [
          {
            title: 'Customer Care',
            description: 'For any enquiries relating to after sales support',
            email: '****@symbol.com',
            phone: '13*****',
          },
          {
            title: 'Concierge Service',
            description: 'For any enquiries relating to pre-sale support',
            email: '****@symbol.com',
            phone: '13*****',
          },
          {
            title: 'Retailer Sales Support',
            description: 'For any enquiries if you are one of our retailers',
            phone: '13*****',
          },
        ],
      },
    ],
    meta: {
      title: 'Contact Us | SYMBOL',
      description: 'Contact SYMBOL for product and partnership inquiries.',
    },
  },
]

for (const page of editablePages) {
  const existing = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: page.slug,
      },
    },
  })

  if (existing.docs[0]) {
    await payload.update({
      collection: 'pages',
      context: scriptContext,
      id: existing.docs[0].id,
      data: page,
    })
  } else {
    await payload.create({
      collection: 'pages',
      context: scriptContext,
      data: page,
    })
  }
}

console.log('Enterprise starter content seeded')
process.exit(0)
