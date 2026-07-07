import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { adminOnly, editorOrAdmin } from '@/access/roles'
import { adminSlugField } from '@/fields/adminSlug'

export const ProductRanges: CollectionConfig = {
  slug: 'product-ranges',
  labels: {
    singular: { en: 'Product Range', zh: '产品系列' },
    plural: { en: 'Product Ranges', zh: '产品系列' },
  },
  access: {
    create: editorOrAdmin,
    delete: adminOnly,
    read: anyone,
    update: editorOrAdmin,
  },
  admin: {
    defaultColumns: ['name', 'slug', 'updatedAt'],
    group: { en: 'Product Management', zh: '产品管理' },
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { en: 'Range name', zh: '系列名称' },
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'products',
      type: 'relationship',
      hasMany: true,
      relationTo: 'products',
    },
    adminSlugField(),
  ],
}
