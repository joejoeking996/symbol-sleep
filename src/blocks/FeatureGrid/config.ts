import type { Block } from 'payload'

export const FeatureGrid: Block = {
  slug: 'featureGrid',
  interfaceName: 'FeatureGridBlock',
  labels: {
    singular: { en: 'Feature Grid', zh: '优势网格' },
    plural: { en: 'Feature Grids', zh: '优势网格' },
  },
  admin: {
    group: { en: 'Content Sections', zh: '内容模块' },
    images: {
      thumbnail: '/admin-blocks/feature-grid.svg',
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: { en: 'Section heading', zh: '区块标题' },
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      label: { en: 'Section intro', zh: '区块说明' },
    },
    {
      name: 'features',
      type: 'array',
      label: { en: 'Feature items', zh: '优势条目' },
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: { en: 'Title', zh: '标题' },
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: { en: 'Description', zh: '说明' },
        },
      ],
      admin: {
        description: {
          en: 'Use this for technology advantages, brand benefits, service promises, or structured selling points.',
          zh: '适合展示技术优势、品牌卖点、服务承诺等结构化内容。',
        },
        initCollapsed: true,
      },
    },
  ],
}
