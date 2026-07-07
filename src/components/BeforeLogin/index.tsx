'use client'

import { useTranslation } from '@payloadcms/ui'
import React from 'react'

const copy = {
  en: {
    eyebrow: 'SYMBOL CMS',
    title: 'Website Operations Console',
    body: 'Sign in to manage pages, product data, articles, inquiries, media, and site navigation.',
  },
  zh: {
    eyebrow: 'SYMBOL CMS',
    title: '企业官网运维后台',
    body: '登录后可管理页面、产品资料、文章、询盘、媒体资源和全站导航。',
  },
}

const BeforeLogin: React.FC = () => {
  const { i18n } = useTranslation()
  const text = i18n.language === 'zh' ? copy.zh : copy.en

  return (
    <div className="symbol-login-intro">
      <div className="symbol-login-intro__mark">S</div>
      <p className="symbol-login-intro__eyebrow">{text.eyebrow}</p>
      <h1>{text.title}</h1>
      <p className="symbol-login-intro__copy">{text.body}</p>
    </div>
  )
}

export default BeforeLogin
