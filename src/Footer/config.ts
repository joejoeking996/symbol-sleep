import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: { en: 'Footer Navigation', zh: '页脚菜单' },
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
      maxRows: 16,
      admin: {
        description: {
          en: 'Configure footer navigation and quick links.',
          zh: '配置官网页脚导航与快捷链接，可调整顺序、文字和链接。',
        },
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
