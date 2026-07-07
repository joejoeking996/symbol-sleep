import { Field } from 'payload'

export const searchFields: Field[] = [
  {
    name: 'slug',
    label: { en: 'Slug', zh: 'URL 标识' },
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'meta',
    label: { en: 'Meta', zh: 'SEO 信息' },
    type: 'group',
    index: true,
    admin: {
      readOnly: true,
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        label: { en: 'Title', zh: '标题' },
      },
      {
        type: 'text',
        name: 'description',
        label: { en: 'Description', zh: '描述' },
      },
      {
        name: 'image',
        label: { en: 'Image', zh: '图片' },
        type: 'upload',
        relationTo: 'media',
      },
    ],
  },
  {
    label: { en: 'Categories', zh: '分类' },
    name: 'categories',
    type: 'array',
    admin: {
      readOnly: true,
    },
    fields: [
      {
        name: 'relationTo',
        label: { en: 'Relation type', zh: '关联类型' },
        type: 'text',
      },
      {
        name: 'categoryID',
        label: { en: 'Category ID', zh: '分类 ID' },
        type: 'text',
      },
      {
        name: 'title',
        label: { en: 'Title', zh: '标题' },
        type: 'text',
      },
    ],
  },
]
