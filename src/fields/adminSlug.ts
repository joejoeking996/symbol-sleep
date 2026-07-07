import type { Field, RowField } from 'payload'
import { slugField } from 'payload'

type AdminSlugOptions = {
  position?: 'sidebar' | undefined
}

export const adminSlugField = ({ position = 'sidebar' }: AdminSlugOptions = {}): Field =>
  slugField({
    position,
    overrides: (baseField): RowField => ({
      ...baseField,
      fields: baseField.fields.map((field): Field => {
        if ('name' in field && field.name === 'generateSlug') {
          return {
            ...field,
            admin: {
              ...field.admin,
              description: {
                en: 'When enabled, the slug will auto-generate from the title field on save.',
                zh: '启用后，系统会在保存时根据标题自动生成 URL 标识。',
              },
            },
            label: { en: 'Auto-generate slug', zh: '自动生成 URL 标识' },
          } as Field
        }

        if ('name' in field && field.name === 'slug') {
          return {
            ...field,
            label: { en: 'Slug', zh: 'URL 标识' },
          } as Field
        }

        return field
      }),
    }),
  })
