import type { Block } from 'payload'

export const AboutStory: Block = {
  slug: 'aboutStory',
  interfaceName: 'AboutStoryBlock',
  labels: {
    singular: { en: 'About Story Page', zh: '关于我们故事页' },
    plural: { en: 'About Story Pages', zh: '关于我们故事页' },
  },
  admin: {
    group: { en: 'Brand Sections', zh: '品牌模块' },
    images: {
      thumbnail: '/admin-blocks/about-story.svg',
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
      name: 'heroHeading',
      type: 'textarea',
      label: { en: 'Hero heading', zh: '顶部标题' },
      defaultValue: 'Welcome To\nOur Story',
      required: true,
    },
    {
      name: 'heroSubheading',
      type: 'textarea',
      label: { en: 'Hero subheading', zh: '顶部说明' },
    },
    {
      name: 'introLeft',
      type: 'textarea',
      label: { en: 'Story column left', zh: '故事左栏' },
      admin: {
        description: {
          en: 'Use blank lines to split paragraphs.',
          zh: '用空行分隔段落。',
        },
      },
    },
    {
      name: 'introRight',
      type: 'textarea',
      label: { en: 'Story column right', zh: '故事右栏' },
      admin: {
        description: {
          en: 'Use blank lines to split paragraphs.',
          zh: '用空行分隔段落。',
        },
      },
    },
    {
      name: 'sections',
      type: 'array',
      label: { en: 'Trust and certification sections', zh: '背书与认证内容' },
      minRows: 1,
      maxRows: 8,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: { en: 'Section title', zh: '区块标题' },
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
          label: { en: 'Section body', zh: '区块正文' },
          admin: {
            description: {
              en: 'Use blank lines to split paragraphs.',
              zh: '用空行分隔段落。',
            },
          },
        },
        {
          name: 'image',
          type: 'upload',
          label: { en: 'Supporting image', zh: '配图/认证图' },
          relationTo: 'media',
        },
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'left',
          label: { en: 'Image position', zh: '图片位置' },
          options: [
            { label: { en: 'No image', zh: '无图片' }, value: 'none' },
            { label: { en: 'Image on the left', zh: '图片在左' }, value: 'left' },
            { label: { en: 'Image on the right', zh: '图片在右' }, value: 'right' },
          ],
        },
      ],
    },
  ],
}
