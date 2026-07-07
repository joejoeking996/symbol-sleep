import type { Block } from 'payload'

export const ImageTextPanel: Block = {
  slug: 'imageTextPanel',
  interfaceName: 'ImageTextPanelBlock',
  labels: {
    singular: { en: 'Image + Text Panel', zh: '图文介绍区' },
    plural: { en: 'Image + Text Panels', zh: '图文介绍区' },
  },
  admin: {
    group: { en: 'Brand Sections', zh: '品牌模块' },
    images: {
      thumbnail: '/admin-blocks/image-text.svg',
    },
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: { en: 'Eyebrow title', zh: '小标题' },
    },
    {
      name: 'heading',
      type: 'textarea',
      label: { en: 'Main heading', zh: '主标题' },
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      label: { en: 'Body copy', zh: '正文说明' },
    },
    {
      name: 'image',
      type: 'upload',
      label: { en: 'Image', zh: '配图' },
      relationTo: 'media',
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      label: { en: 'Image position', zh: '图片位置' },
      options: [
        { label: { en: 'Image on the right', zh: '图片在右侧' }, value: 'right' },
        { label: { en: 'Image on the left', zh: '图片在左侧' }, value: 'left' },
      ],
    },
    {
      name: 'linkLabel',
      type: 'text',
      label: { en: 'Link label', zh: '链接文字' },
    },
    {
      name: 'href',
      type: 'text',
      label: { en: 'Link URL', zh: '链接地址' },
    },
  ],
}
