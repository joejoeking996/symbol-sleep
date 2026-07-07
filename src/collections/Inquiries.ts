import type { CollectionConfig } from 'payload'

import { adminOnly, viewerOrAbove } from '@/access/roles'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: {
    singular: { en: 'Inquiry', zh: '询盘' },
    plural: { en: 'Inquiries', zh: '询盘线索' },
  },
  access: {
    create: () => true,
    delete: adminOnly,
    read: viewerOrAbove,
    update: viewerOrAbove,
  },
  admin: {
    defaultColumns: ['name', 'email', 'sourcePage', 'status', 'createdAt'],
    group: { en: 'Leads', zh: '客户线索' },
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'sourcePage',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: { en: 'New', zh: '新线索' }, value: 'new' },
        { label: { en: 'In progress', zh: '跟进中' }, value: 'inProgress' },
        { label: { en: 'Closed', zh: '已关闭' }, value: 'closed' },
      ],
    },
  ],
}
