import type { Block } from 'payload'

export const TechnologyMaterials: Block = {
  slug: 'technologyMaterials',
  interfaceName: 'TechnologyMaterialsBlock',
  labels: {
    singular: { en: 'Technology Materials Page', zh: '技术材料页' },
    plural: { en: 'Technology Materials Pages', zh: '技术材料页' },
  },
  admin: {
    group: { en: 'Brand Sections', zh: '品牌模块' },
    images: {
      thumbnail: '/admin-blocks/technology-materials.svg',
    },
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      label: { en: 'Top hero image', zh: '顶部大图' },
      relationTo: 'media',
      admin: {
        description: {
          en: 'Recommended: dark technology-style image.',
          zh: '建议上传深色科技感大图。',
        },
      },
    },
    {
      name: 'heroTitle',
      type: 'textarea',
      label: { en: 'Hero title', zh: '顶部标题' },
      defaultValue: 'Mattresses\nTechnology',
      required: true,
    },
    {
      name: 'heroSubtitle',
      type: 'text',
      label: { en: 'Hero subtitle', zh: '顶部副标题' },
      defaultValue: 'Why choose Symbol Mattresses',
    },
    {
      name: 'introHeading',
      type: 'text',
      label: { en: 'Intro heading', zh: '介绍标题' },
      defaultValue: 'The Key to Comfort',
      required: true,
    },
    {
      name: 'introBody',
      type: 'textarea',
      label: { en: 'Intro description', zh: '介绍描述' },
    },
    {
      name: 'materialBackgroundImage',
      type: 'upload',
      label: { en: 'Materials section background', zh: '材料区背景图' },
      relationTo: 'media',
      admin: {
        description: {
          en: 'Use a light texture image. A white overlay is applied automatically.',
          zh: '建议上传浅色纹理图，前台会自动叠加白色蒙层。',
        },
      },
    },
    {
      name: 'categories',
      type: 'array',
      label: { en: 'Material categories', zh: '材料大分类' },
      minRows: 1,
      maxRows: 8,
      admin: {
        components: {
          RowLabel: '@/components/AdminRowLabels/MaterialCategoryRowLabel#MaterialCategoryRowLabel',
        },
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: { en: 'Category title', zh: '分类标题' },
          required: true,
        },
        {
          name: 'materials',
          type: 'array',
          label: { en: 'Materials', zh: '材料列表' },
          minRows: 1,
          maxRows: 12,
          admin: {
            components: {
              RowLabel: '@/components/AdminRowLabels/MaterialRowLabel#MaterialRowLabel',
            },
            initCollapsed: true,
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: { en: 'Material name in left menu', zh: '左侧材料名称' },
              required: true,
            },
            {
              name: 'eyebrow',
              type: 'text',
              label: { en: 'Small label', zh: '小标签' },
            },
            {
              name: 'title',
              type: 'text',
              label: { en: 'Material detail title', zh: '材料详情标题' },
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: { en: 'Material description', zh: '材料描述' },
            },
            {
              name: 'image',
              type: 'upload',
              label: { en: 'Material image', zh: '材料大图' },
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
