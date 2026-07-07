import type { CollectionConfig } from 'payload'

import {
  adminOnly,
  adminOnlyField,
  canManageOwnUserOrAdmin,
  viewerOrAbove,
  viewerOrAboveBoolean,
} from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { en: 'User', zh: '管理员' },
    plural: { en: 'Users', zh: '管理员' },
  },
  access: {
    admin: viewerOrAboveBoolean,
    create: adminOnly,
    delete: adminOnly,
    read: viewerOrAbove,
    update: canManageOwnUserOrAdmin,
  },
  admin: {
    defaultColumns: ['name', 'username', 'email'],
    group: { en: 'Settings', zh: '系统设置' },
    useAsTitle: 'name',
  },
  auth: {
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: false,
      requireUsername: false,
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      access: {
        create: adminOnlyField,
        update: adminOnlyField,
      },
      admin: {
        description: {
          en: 'admin manages settings and users; editor manages content; viewer can read admin data.',
          zh: 'admin 可管理系统和账号；editor 可维护内容；viewer 只读查看后台。',
        },
        position: 'sidebar',
      },
      defaultValue: ['editor'],
      hasMany: true,
      label: { en: 'Roles', zh: '角色' },
      options: [
        {
          label: { en: 'Admin', zh: '超级管理员' },
          value: 'admin',
        },
        {
          label: { en: 'Editor', zh: '内容编辑' },
          value: 'editor',
        },
        {
          label: { en: 'Viewer', zh: '只读查看' },
          value: 'viewer',
        },
      ],
      saveToJWT: true,
    },
  ],
  timestamps: true,
}
