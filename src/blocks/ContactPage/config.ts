import type { Block } from 'payload'

export const ContactPage: Block = {
  slug: 'contactPage',
  interfaceName: 'ContactPageBlock',
  labels: {
    singular: { en: 'Contact Page', zh: '联系我们页' },
    plural: { en: 'Contact Pages', zh: '联系我们页' },
  },
  admin: {
    group: { en: 'Conversion Sections', zh: '转化模块' },
    images: {
      thumbnail: '/admin-blocks/contact-page.svg',
    },
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      label: { en: 'Background image', zh: '背景图' },
      relationTo: 'media',
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Leave Your Message',
      label: { en: 'Form heading', zh: '表单标题' },
      required: true,
    },
    {
      name: 'submitLabel',
      type: 'text',
      defaultValue: 'Send',
      label: { en: 'Submit label', zh: '提交按钮文字' },
    },
    {
      name: 'successMessage',
      type: 'text',
      defaultValue: 'Thank you. Your message has been received.',
      label: { en: 'Success message', zh: '提交成功提示' },
    },
    {
      name: 'contacts',
      type: 'array',
      label: { en: 'Contact groups', zh: '联系分组' },
      minRows: 1,
      maxRows: 8,
      admin: {
        components: {
          RowLabel: '@/components/AdminRowLabels/ContactRowLabel#ContactRowLabel',
        },
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: { en: 'Title', zh: '标题' },
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: { en: 'Description', zh: '说明' },
        },
        {
          name: 'email',
          type: 'text',
          label: { en: 'Email', zh: '邮箱' },
        },
        {
          name: 'phone',
          type: 'text',
          label: { en: 'Phone', zh: '电话' },
        },
      ],
    },
  ],
}
