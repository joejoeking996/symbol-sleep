import type { Block } from 'payload'

export const StoryVideoPanel: Block = {
  slug: 'storyVideoPanel',
  interfaceName: 'StoryVideoPanelBlock',
  labels: {
    singular: { en: 'Story Video Panel', zh: '品牌故事视频区' },
    plural: { en: 'Story Video Panels', zh: '品牌故事视频区' },
  },
  admin: {
    group: { en: 'Brand Sections', zh: '品牌模块' },
    images: {
      thumbnail: '/admin-blocks/story-video.svg',
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      defaultValue: 'OUR STORY',
      label: { en: 'Main heading', zh: '主标题' },
      required: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue: 'EXCELLENT SLEEP SOLUTION OVER 52 YEARS OF EXPERIENCE',
      label: { en: 'Subheading', zh: '副标题' },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: { en: 'Background image', zh: '背景图' },
      relationTo: 'media',
    },
    {
      name: 'videoPoster',
      type: 'upload',
      label: { en: 'Video poster image', zh: '视频封面图' },
      relationTo: 'media',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: { en: 'Video URL', zh: '视频链接' },
    },
    {
      name: 'linkLabel',
      type: 'text',
      defaultValue: 'About Us',
      label: { en: 'Text link label', zh: '文字链接' },
    },
    {
      name: 'href',
      type: 'text',
      defaultValue: '/about-us',
      label: { en: 'Link URL', zh: '跳转链接' },
    },
  ],
}
