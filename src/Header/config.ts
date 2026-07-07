import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: { en: 'Header Navigation', zh: '顶部菜单' },
  access: {
    read: () => true,
  },
  admin: {
    group: { en: 'Menu Settings', zh: '菜单配置' },
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: { en: 'Menu items', zh: '菜单项' },
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 12,
      admin: {
        description: {
          en: 'Configure the website top navigation shown on the public site.',
          zh: '配置官网顶部导航菜单，可调整顺序、文字和链接。',
        },
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
