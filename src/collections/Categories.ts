import type { CollectionConfig } from 'payload'

import { createBreadcrumbsField, createParentField } from '@payloadcms/plugin-nested-docs'
import { anyone } from '../access/anyone'
import { adminOnly, editorOrAdmin } from '@/access/roles'
import { adminSlugField } from '@/fields/adminSlug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: { en: 'Article Category', zh: '文章分类' },
    plural: { en: 'Article Categories', zh: '文章分类' },
  },
  access: {
    create: editorOrAdmin,
    delete: adminOnly,
    read: anyone,
    update: editorOrAdmin,
  },
  admin: {
    group: { en: 'Content', zh: '内容运营' },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: { en: 'Category name', zh: '分类名称' },
      required: true,
    },
    adminSlugField({
      position: undefined,
    }),
    createParentField('categories', {
      label: { en: 'Parent category', zh: '上级分类' },
      admin: {
        description: {
          en: 'Optional. Use this only when categories need a hierarchy.',
          zh: '选填。仅在文章分类需要层级时使用。',
        },
        position: 'sidebar',
      },
    }),
    createBreadcrumbsField('categories', {
      label: { en: 'Category path', zh: '分类路径' },
      admin: {
        hidden: true,
        readOnly: true,
      },
    }),
  ],
}
