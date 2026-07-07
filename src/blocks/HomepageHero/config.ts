import type { Block } from 'payload'

export const HomepageHero: Block = {
  slug: 'homepageHero',
  interfaceName: 'HomepageHeroBlock',
  labels: {
    singular: { en: 'Homepage Hero', zh: '首页首屏' },
    plural: { en: 'Homepage Heroes', zh: '首页首屏' },
  },
  admin: {
    group: { en: 'Brand Sections', zh: '品牌模块' },
    images: {
      thumbnail: '/admin-blocks/hero.svg',
    },
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      label: { en: 'Carousel slides', zh: '轮播图' },
      minRows: 1,
      maxRows: 6,
      admin: {
        description: {
          en: 'Each slide becomes one full-screen carousel panel on the homepage.',
          zh: '每一张轮播图对应首页首屏中的一个全屏面板。',
        },
        initCollapsed: true,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          label: { en: 'Slide background image', zh: '轮播背景图' },
          relationTo: 'media',
          required: true,
          admin: {
            description: {
              en: 'Recommended: 1920×1080 or larger, bedroom/mattress/brand scene.',
              zh: '建议上传 1920×1080 或更大的卧室/床垫/品牌场景图。',
            },
          },
        },
        {
          name: 'title',
          type: 'text',
          label: { en: 'Slide title', zh: '轮播标题' },
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: { en: 'Slide subtitle', zh: '轮播副标题' },
        },
        {
          name: 'overlayOpacity',
          type: 'number',
          defaultValue: 35,
          label: { en: 'Overlay strength', zh: '遮罩强度' },
          max: 80,
          min: 0,
          admin: {
            description: {
              en: 'Controls the dark overlay on this slide. Range: 0 to 80.',
              zh: '控制当前轮播图上的深色遮罩强度，范围 0 到 80。',
            },
          },
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'OUR STORY',
      label: { en: 'Main title (fallback)', zh: '主标题（备用）' },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue: 'EXCELLENT SLEEP SOLUTION OVER 52 YEARS OF EXPERIENCE',
      label: { en: 'Subtitle (fallback)', zh: '副标题（备用）' },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: { en: 'Background image (fallback)', zh: '背景图（备用）' },
      relationTo: 'media',
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      defaultValue: 45,
      label: { en: 'Overlay strength (fallback)', zh: '遮罩强度（备用）' },
      max: 80,
      min: 0,
    },
  ],
}
