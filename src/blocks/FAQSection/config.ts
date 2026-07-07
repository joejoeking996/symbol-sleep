import type { Block } from 'payload'

export const FAQSection: Block = {
  slug: 'faqSection',
  interfaceName: 'FAQSectionBlock',
  labels: {
    singular: { en: 'FAQ Section', zh: '问答区' },
    plural: { en: 'FAQ Sections', zh: '问答区' },
  },
  admin: {
    group: { en: 'Content Sections', zh: '内容模块' },
    images: {
      thumbnail: '/admin-blocks/faq.svg',
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'FAQ',
      label: { en: 'Section heading', zh: '区块标题' },
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      label: { en: 'FAQ items', zh: '问答条目' },
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'question',
          type: 'text',
          label: { en: 'Question', zh: '问题' },
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: { en: 'Answer', zh: '回答' },
          required: true,
        },
      ],
      admin: {
        description: {
          en: 'Use this for guarantee notes, buying questions, contact guidance, or common support content.',
          zh: '适合展示质保说明、购买咨询、联系方式等常见问题。',
        },
        initCollapsed: true,
      },
    },
  ],
}
