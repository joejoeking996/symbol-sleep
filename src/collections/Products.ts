import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { adminOnly, editorOrAdmin } from '@/access/roles'
import { adminSlugField } from '@/fields/adminSlug'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: { en: 'Product', zh: '产品' },
    plural: { en: 'Products', zh: '产品资料' },
  },
  access: {
    create: editorOrAdmin,
    delete: adminOnly,
    read: anyone,
    update: editorOrAdmin,
  },
  admin: {
    defaultColumns: ['name', 'range', 'comfortLevel', 'slug', 'updatedAt'],
    group: { en: 'Product Management', zh: '产品管理' },
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { en: 'Product name', zh: '产品名称' },
      required: true,
    },
    {
      name: 'range',
      type: 'relationship',
      label: { en: 'Product range', zh: '产品系列' },
      relationTo: 'product-ranges',
    },
    {
      name: 'comfortLevel',
      type: 'select',
      defaultValue: 'firm',
      label: { en: 'Product group', zh: '产品分组' },
      options: [
        {
          label: { en: 'Extra Firm', zh: 'Extra Firm 偏硬' },
          value: 'extraFirm',
        },
        {
          label: { en: 'Firm', zh: 'Firm 硬款' },
          value: 'firm',
        },
        {
          label: { en: 'Medium', zh: 'Medium 适中' },
          value: 'medium',
        },
        {
          label: { en: 'Plush', zh: 'Plush 舒适' },
          value: 'plush',
        },
        {
          label: { en: 'Soft', zh: 'Soft 柔软' },
          value: 'soft',
        },
      ],
    },
    {
      name: 'mainImage',
      type: 'upload',
      label: { en: 'Product card / primary image', zh: '产品首图 / 卡片图' },
      relationTo: 'media',
      admin: {
        description: {
          en: 'Used on product cards and as the fallback visual inside the product detail template.',
          zh: '用于产品卡片，也会作为产品详情页模板中的默认展示图。',
        },
      },
    },
    {
      name: 'heroImageSource',
      type: 'select',
      defaultValue: 'custom',
      label: { en: 'Hero image source', zh: '顶部图来源' },
      options: [
        {
          label: { en: 'Use custom hero image', zh: '使用单独顶部图' },
          value: 'custom',
        },
        {
          label: { en: 'Use product primary image', zh: '使用产品首图' },
          value: 'mainImage',
        },
      ],
      admin: {
        description: {
          en: 'Choose whether the product detail hero uses a dedicated hero image or the primary product image.',
          zh: '选择详情页顶部大图使用单独上传的顶部图，还是直接使用产品首图。',
        },
      },
    },
    {
      name: 'detailHeroImage',
      type: 'upload',
      label: { en: 'Custom detail hero image', zh: '单独顶部图' },
      relationTo: 'media',
      admin: {
        description: {
          en: 'Large image at the top of the product detail page. If empty, the primary product image is used.',
          zh: '产品详情页顶部大图。留空时自动使用产品首图。',
        },
      },
    },
    {
      name: 'detailEyebrow',
      type: 'text',
      label: { en: 'Detail page label', zh: '详情页小标题' },
      admin: {
        description: {
          en: 'Small label shown above the product name. If empty, the product range name is used.',
          zh: '显示在产品名称上方的小标题。留空时自动使用产品系列名称。',
        },
      },
    },
    {
      name: 'gallery',
      type: 'upload',
      hasMany: true,
      label: { en: 'Gallery', zh: '产品图库' },
      relationTo: 'media',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: { en: 'Summary', zh: '摘要描述' },
    },
    {
      name: 'detailLead',
      type: 'textarea',
      label: { en: 'Product detail description', zh: '产品详情描述' },
      admin: {
        description: {
          en: 'Displayed to the right of the product visual / interactive exploded view.',
          zh: '显示在产品视觉图或互动爆炸图右侧。',
        },
      },
    },
    {
      name: 'explodedImage',
      type: 'upload',
      label: { en: 'Exploded structure image', zh: '爆炸结构总图' },
      relationTo: 'media',
      admin: {
        description: {
          en: 'Optional flat exploded-view image used as the fallback or zoom image.',
          zh: '可选。作为备用展示图或放大查看图使用。',
        },
      },
    },
    {
      name: 'detailNoteTitle',
      type: 'text',
      label: { en: 'Material title', zh: '材料标题' },
      defaultValue: 'About Dacron Fresh',
    },
    {
      name: 'detailNote',
      type: 'textarea',
      label: { en: 'Material introduction', zh: '材料介绍' },
      admin: {
        description: {
          en: 'Short material note shown below the main product description.',
          zh: '显示在产品描述下方的材料说明。',
        },
      },
    },
    {
      name: 'explodedLayers',
      type: 'array',
      label: { en: 'Exploded structure layers', zh: '爆炸图图层' },
      admin: {
        description: {
          en: 'Each row becomes one interactive layer in the product detail template.',
          zh: '每一行对应爆炸图中的一个可交互图层。',
        },
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: { en: 'Layer name', zh: '图层名称' },
          required: true,
        },
        {
          name: 'layerImage',
          type: 'upload',
          label: { en: 'Layer image', zh: '图层图片' },
          relationTo: 'media',
          admin: {
            description: {
              en: 'Upload a transparent PNG for this layer when building an interactive exploded view.',
              zh: '上传该层的透明 PNG，用于生成可交互爆炸图。',
            },
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: { en: 'Layer description', zh: '图层说明' },
        },
        {
          name: 'color',
          type: 'text',
          label: { en: 'Interaction accent color', zh: '交互强调色' },
          defaultValue: '#53ddf4',
          admin: {
            description: {
              en: 'Use a hex color, for example #53ddf4.',
              zh: '填写十六进制颜色，例如 #53ddf4。',
            },
          },
        },
      ],
    },
    {
      name: 'specifications',
      type: 'array',
      label: { en: 'Specifications', zh: '右下角参数' },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: { en: 'Parameter name', zh: '参数名称' },
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: { en: 'Parameter description', zh: '参数描述' },
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      label: { en: 'Long article content', zh: '长文章内容' },
    },
    adminSlugField(),
  ],
}
