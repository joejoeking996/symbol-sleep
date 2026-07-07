import type { Block } from 'payload'

export const ProductRangeShowcase: Block = {
  slug: 'productRangeShowcase',
  interfaceName: 'ProductRangeShowcaseBlock',
  labels: {
    singular: { en: 'Product Range Showcase', zh: '产品系列展示' },
    plural: { en: 'Product Range Showcases', zh: '产品系列展示' },
  },
  admin: {
    group: { en: 'Commerce Sections', zh: '产品模块' },
    images: {
      thumbnail: '/admin-blocks/product-range.svg',
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Product Range',
      label: { en: 'Section heading', zh: '区块标题' },
      required: true,
    },
    {
      name: 'ranges',
      type: 'array',
      label: { en: 'Product range cards', zh: '产品系列卡片' },
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: { en: 'Range name', zh: '系列名称' },
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: { en: 'Short description', zh: '一句话说明' },
        },
        {
          name: 'image',
          type: 'upload',
          label: { en: 'Card image', zh: '卡片图片' },
          relationTo: 'media',
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '/product-range',
          label: { en: 'Link URL', zh: '跳转链接' },
        },
      ],
      admin: {
        description: {
          en: 'Each item becomes one large product range card on the homepage.',
          zh: '每一项对应首页中的一张产品系列大图卡片。',
        },
        initCollapsed: true,
      },
    },
  ],
}
