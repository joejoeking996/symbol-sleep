import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'none',
  },
  meta: {
    description: 'A premium enterprise website powered by Payload CMS and Next.js.',
    title: 'SYMBOL Enterprise Website',
  },
  title: 'SYMBOL Home',
  layout: [
    {
      blockType: 'homepageHero',
      title: 'OUR STORY',
      subtitle: 'EXCELLENT SLEEP SOLUTION OVER 52 YEARS OF EXPERIENCE',
      overlayOpacity: 0,
      slides: [
        {
          title: 'OUR STORY',
          subtitle: 'EXCELLENT SLEEP SOLUTION OVER 52 YEARS OF EXPERIENCE',
          overlayOpacity: 0,
        },
        {
          title: 'For Yourself And Your Loved Ones',
          subtitle: '',
          overlayOpacity: 35,
        },
        {
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
      body: 'Symbol is the leader in sleep innovation. Decades of research and development deliver one of the world\'s most advanced sleep systems, designed to support the body and improve sleep quality.',
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
}
