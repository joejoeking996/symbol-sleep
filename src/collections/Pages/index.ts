import type { CollectionConfig } from 'payload'

import { adminOnly, editorOrAdmin } from '@/access/roles'
import { adminSlugField } from '@/fields/adminSlug'
import { hero } from '@/heros/config'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { AboutStory } from '../../blocks/AboutStory/config'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { ContactPage } from '../../blocks/ContactPage/config'
import { Content } from '../../blocks/Content/config'
import { FAQSection } from '../../blocks/FAQSection/config'
import { FeatureGrid } from '../../blocks/FeatureGrid/config'
import { FormBlock } from '../../blocks/Form/config'
import { HomepageHero } from '../../blocks/HomepageHero/config'
import { ImageTextPanel } from '../../blocks/ImageTextPanel/config'
import { InquiryForm } from '../../blocks/InquiryForm/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { ProductRangeShowcase } from '../../blocks/ProductRangeShowcase/config'
import { StoryVideoPanel } from '../../blocks/StoryVideoPanel/config'
import { TechnologyMaterials } from '../../blocks/TechnologyMaterials/config'
import { TechnologyPanel } from '../../blocks/TechnologyPanel/config'
import { WhereToBuy } from '../../blocks/WhereToBuy/config'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { ensureSingleHomepage } from './hooks/ensureSingleHomepage'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: { en: 'Page', zh: '页面' },
    plural: { en: 'Pages', zh: '页面搭建' },
  },
  access: {
    create: editorOrAdmin,
    delete: adminOnly,
    read: authenticatedOrPublished,
    update: editorOrAdmin,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'isHomepage', 'updatedAt'],
    group: { en: 'Website Builder', zh: '官网搭建' },
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: { en: 'Page title', zh: '页面标题' },
      required: true,
    },
    {
      name: 'pageOperations',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/PageAdminActions#PageAdminActions',
        },
        position: 'sidebar',
      },
      label: { en: 'Page actions', zh: '页面操作' },
    },
    {
      name: 'isHomepage',
      type: 'checkbox',
      admin: {
        description: {
          en: 'When enabled, this page will be used for the website homepage.',
          zh: '开启后，此页面将作为官网首页。同一时间只会保留一个首页。',
        },
        position: 'sidebar',
      },
      defaultValue: false,
      label: { en: 'Set as homepage', zh: '设为首页' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: { en: 'Hero', zh: '首屏设置' },
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: { en: 'Page sections', zh: '页面组件' },
              blocks: [
                AboutStory,
                ContactPage,
                HomepageHero,
                ProductRangeShowcase,
                TechnologyMaterials,
                TechnologyPanel,
                StoryVideoPanel,
                ImageTextPanel,
                InquiryForm,
                FeatureGrid,
                FAQSection,
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                WhereToBuy,
              ],
              required: true,
              admin: {
                description: {
                  en: 'Add, collapse, edit, and drag sections to build website pages. Use Posts for article content.',
                  zh: '通过添加组件、拖动排序、折叠编辑来搭建页面。文章内容请使用文章模块。',
                },
                initCollapsed: true,
              },
            },
          ],
          label: { en: 'Content', zh: '内容' },
        },
        {
          name: 'meta',
          label: { en: 'SEO', zh: 'SEO 设置' },
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    adminSlugField(),
  ],
  hooks: {
    afterChange: [ensureSingleHomepage, revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
