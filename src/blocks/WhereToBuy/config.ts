import type { Block } from 'payload'

export const WhereToBuy: Block = {
  slug: 'whereToBuy',
  interfaceName: 'WhereToBuyBlock',
  labels: {
    singular: { en: 'Where To Buy Page', zh: '购买门店页' },
    plural: { en: 'Where To Buy Pages', zh: '购买门店页' },
  },
  admin: {
    group: { en: 'Conversion Sections', zh: '转化模块' },
    images: {
      thumbnail: '/admin-blocks/where-to-buy.svg',
    },
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      label: { en: 'Top hero image', zh: '顶部大图' },
      relationTo: 'media',
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Shop in-store at Australia',
      label: { en: 'Hero heading', zh: '顶部标题' },
      required: true,
    },
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'Try Symbol Products before you buy in a store near you.',
      label: { en: 'Hero subheading', zh: '顶部说明' },
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      defaultValue: 'Enter your suburb to see retailers close to you.',
      label: { en: 'Search placeholder', zh: '搜索框提示' },
    },
    {
      name: 'note',
      type: 'textarea',
      label: { en: 'Bottom note', zh: '底部提示' },
      defaultValue:
        'Please call each store before visiting to confirm availability, opening hours and pricing. Different retail partners may carry different mattresses within the same collections.',
    },
    {
      name: 'stores',
      type: 'array',
      label: { en: 'Stores', zh: '门店' },
      minRows: 1,
      maxRows: 80,
      admin: {
        components: {
          RowLabel: '@/components/AdminRowLabels/StoreRowLabel#StoreRowLabel',
        },
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: { en: 'Store name', zh: '门店名称' },
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          label: { en: 'Address', zh: '地址' },
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: { en: 'Phone', zh: '电话' },
        },
        {
          name: 'region',
          type: 'text',
          label: { en: 'Region', zh: '区域' },
        },
        {
          name: 'googleMapQuery',
          type: 'text',
          label: { en: 'Google Maps query override', zh: 'Google 地图搜索关键词' },
          admin: {
            description: {
              en: 'Optional. If empty, store name + address is used.',
              zh: '可选。留空时使用门店名称 + 地址。',
            },
          },
        },
      ],
    },
  ],
}
