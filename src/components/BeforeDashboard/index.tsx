'use client'

import { useTranslation } from '@payloadcms/ui'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

const copy = {
  en: {
    eyebrow: 'SYMBOL OPERATIONS',
    title: 'Website Operations',
    intro:
      'Manage pages, product ranges, product data, articles, inquiries, and navigation from one focused workspace.',
    viewSite: 'View website',
    cards: [
      ['01', 'Pages', 'Edit homepage and brand pages with reusable content sections.'],
      ['02', 'Product Ranges', 'Maintain range banners, descriptions, and product entry points.'],
      ['03', 'Products', 'Manage product images, comfort groups, descriptions, and specifications.'],
      ['04', 'Inquiries', 'Review website leads and update follow-up status.'],
    ],
    workflowTitle: 'Daily Workflow',
    workflow: [
      'Upload media assets before editing pages or product entries.',
      'Update product ranges and products before publishing navigation changes.',
      'Use page sections to adjust homepage, technology, story, and contact content.',
      'Preview desktop and mobile pages before publishing.',
    ],
  },
  zh: {
    eyebrow: 'SYMBOL 运营后台',
    title: '官网运维工作台',
    intro: '集中管理页面、产品系列、产品资料、文章、询盘和全站导航，适合运营人员日常使用。',
    viewSite: '查看前台网站',
    cards: [
      ['01', '页面搭建', '用可复用页面组件编辑首页和品牌页面。'],
      ['02', '产品系列', '维护系列横幅、介绍文案和产品入口。'],
      ['03', '产品资料', '管理产品图片、舒适度分组、描述和规格参数。'],
      ['04', '询盘线索', '查看官网线索，并更新跟进状态。'],
    ],
    workflowTitle: '建议工作流',
    workflow: [
      '编辑页面或产品前，先上传需要使用的媒体素材。',
      '发布导航前，先确认产品系列和产品资料已经维护完成。',
      '用页面组件调整首页、技术、故事和联系表单内容。',
      '发布前预览桌面端和移动端效果。',
    ],
  },
}

const links = [
  '/admin/collections/pages',
  '/admin/collections/product-ranges',
  '/admin/collections/products',
  '/admin/collections/inquiries',
]

const BeforeDashboard: React.FC = () => {
  const { i18n } = useTranslation()
  const text = i18n.language === 'zh' ? copy.zh : copy.en

  return (
    <div className={baseClass}>
      <section className={`${baseClass}__hero`}>
        <div>
          <p className={`${baseClass}__eyebrow`}>{text.eyebrow}</p>
          <h1>{text.title}</h1>
          <p>{text.intro}</p>
        </div>
        <a className={`${baseClass}__site-link`} href="/" target="_blank">
          {text.viewSite}
        </a>
      </section>

      <section className={`${baseClass}__grid`}>
        {text.cards.map(([number, title, description], index) => (
          <a className={`${baseClass}__card`} href={links[index]} key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </a>
        ))}
      </section>

      <section className={`${baseClass}__workflow`}>
        <h2>{text.workflowTitle}</h2>
        <ol>
          {text.workflow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </div>
  )
}

export default BeforeDashboard
