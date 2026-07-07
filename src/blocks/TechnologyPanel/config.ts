import type { Block } from 'payload'

export const TechnologyPanel: Block = {
  slug: 'technologyPanel',
  interfaceName: 'TechnologyPanelBlock',
  labels: {
    singular: { en: 'Technology Panel', zh: '技术介绍区' },
    plural: { en: 'Technology Panels', zh: '技术介绍区' },
  },
  admin: {
    group: { en: 'Brand Sections', zh: '品牌模块' },
    images: {
      thumbnail: '/admin-blocks/technology.svg',
    },
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Technology',
      label: { en: 'Eyebrow title', zh: '小标题' },
    },
    {
      name: 'heading',
      type: 'textarea',
      defaultValue: 'Leading-edge Technology And High-quality Manufacturing',
      label: { en: 'Main heading', zh: '主标题' },
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      label: { en: 'Body copy', zh: '正文说明' },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: { en: 'Background image', zh: '背景图' },
      relationTo: 'media',
      admin: {
        description: {
          en: 'Recommended: dark technology-style background image.',
          zh: '建议上传暗色科技感背景图。',
        },
      },
    },
    {
      name: 'linkLabel',
      type: 'text',
      defaultValue: 'DETAILS',
      label: { en: 'Link label', zh: '链接文字' },
    },
    {
      name: 'href',
      type: 'text',
      defaultValue: '/technology',
      label: { en: 'Link URL', zh: '链接地址' },
    },
  ],
}
