import type { Block } from 'payload'

export const InquiryForm: Block = {
  slug: 'inquiryForm',
  interfaceName: 'InquiryFormBlock',
  labels: {
    singular: { en: 'Inquiry Form', zh: '询盘表单' },
    plural: { en: 'Inquiry Forms', zh: '询盘表单' },
  },
  admin: {
    group: { en: 'Conversion Sections', zh: '转化模块' },
    images: {
      thumbnail: '/admin-blocks/inquiry.svg',
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Leave your message',
      label: { en: 'Form heading', zh: '表单标题' },
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      defaultValue: 'Tell us what you need, and our team will get back to you.',
      label: { en: 'Form description', zh: '表单说明' },
    },
    {
      name: 'submitLabel',
      type: 'text',
      defaultValue: 'Submit',
      label: { en: 'Submit button text', zh: '提交按钮文字' },
    },
    {
      name: 'successMessage',
      type: 'text',
      defaultValue: 'Thank you. Your message has been received.',
      label: { en: 'Success message', zh: '提交成功提示' },
    },
  ],
}
