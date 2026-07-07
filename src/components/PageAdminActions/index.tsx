'use client'

import React, { useMemo, useState } from 'react'

type ActionState = 'idle' | 'copying-link' | 'duplicating' | 'deleting'

const getCurrentPageID = () => {
  const match = window.location.pathname.match(/\/admin\/collections\/pages\/([^/?#]+)/)
  return match?.[1]
}

const readSlugFromForm = () => {
  const input = document.querySelector<HTMLInputElement>(
    'input[name="slug"], input#slug, input[id$="slug"], input[name$=".slug"]',
  )

  return input?.value?.trim()
}

const getDocumentFromResponse = (response: unknown) => {
  if (response && typeof response === 'object' && 'doc' in response) {
    return (response as { doc?: Record<string, unknown> }).doc
  }

  return response as Record<string, unknown> | undefined
}

export function PageAdminActions() {
  const [state, setState] = useState<ActionState>('idle')
  const [message, setMessage] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)

  const pageID = useMemo(() => {
    if (typeof window === 'undefined') return undefined
    return getCurrentPageID()
  }, [])

  const buildFrontendURL = async () => {
    let slug = readSlugFromForm()

    if (!slug && pageID) {
      const response = await fetch(`/api/pages/${pageID}?depth=0&draft=true`, {
        credentials: 'include',
      })
      const data = getDocumentFromResponse(await response.json())
      slug = typeof data?.slug === 'string' ? data.slug : undefined
    }

    const path = !slug || slug === 'home' ? '/' : `/${slug}`
    return `${window.location.origin}${path}`
  }

  const copyPageLink = async () => {
    setState('copying-link')
    setMessage('')

    try {
      const url = await buildFrontendURL()
      await navigator.clipboard.writeText(url)
      setMessage('页面链接已复制')
    } catch {
      setMessage('复制失败，请检查浏览器剪贴板权限')
    } finally {
      setState('idle')
    }
  }

  const duplicatePage = async () => {
    if (!pageID) {
      setMessage('当前页面还没有保存，保存后才能复制页面')
      return
    }

    setState('duplicating')
    setMessage('')

    try {
      const sourceResponse = await fetch(`/api/pages/${pageID}?depth=10&draft=true`, {
        credentials: 'include',
      })

      if (!sourceResponse.ok) {
        throw new Error('Failed to load source page')
      }

      const source = getDocumentFromResponse(await sourceResponse.json())

      if (!source) {
        throw new Error('Missing source page')
      }

      const { id, createdAt, updatedAt, sizes, ...clone } = source
      void id
      void createdAt
      void updatedAt
      void sizes

      const baseSlug =
        typeof source.slug === 'string' && source.slug.length > 0 ? source.slug : 'page'
      const copySuffix = Date.now().toString(36)
      const nextSlug = `${baseSlug.replace(/-copy-.+$/, '')}-copy-${copySuffix}`

      const createResponse = await fetch('/api/pages?depth=0&draft=true', {
        body: JSON.stringify({
          ...clone,
          isHomepage: false,
          slug: nextSlug,
          title: `${typeof source.title === 'string' ? source.title : 'Untitled'} Copy`,
          _status: 'draft',
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!createResponse.ok) {
        throw new Error('Failed to create page')
      }

      const created = getDocumentFromResponse(await createResponse.json())
      const createdID = created?.id

      if (createdID) {
        window.location.href = `/admin/collections/pages/${createdID}`
        return
      }

      window.location.href = '/admin/collections/pages'
    } catch {
      setMessage('复制页面失败，请先发布或保存当前页面后再试')
      setState('idle')
    }
  }

  const deletePage = async () => {
    if (!pageID) {
      setMessage('当前页面还没有保存，无法删除')
      return
    }

    if (!confirmDelete) {
      setConfirmDelete(true)
      setMessage('再次点击确认删除页面')
      return
    }

    setState('deleting')
    setMessage('')

    try {
      const response = await fetch(`/api/pages/${pageID}`, {
        credentials: 'include',
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete page')
      }

      window.location.href = '/admin/collections/pages'
    } catch {
      setMessage('删除失败，请确认当前账号有删除权限')
      setState('idle')
      setConfirmDelete(false)
    }
  }

  return (
    <section className="page-admin-actions" aria-label="页面快捷操作">
      <div className="page-admin-actions__header">
        <p>页面操作</p>
        <span>运营常用</span>
      </div>
      <div className="page-admin-actions__grid">
        <button type="button" onClick={copyPageLink} disabled={state !== 'idle'}>
          {state === 'copying-link' ? '复制中...' : '复制链接'}
        </button>
        <button type="button" onClick={duplicatePage} disabled={state !== 'idle'}>
          {state === 'duplicating' ? '复制中...' : '复制页面'}
        </button>
        <button
          type="button"
          className={
            confirmDelete
              ? 'page-admin-actions__danger is-confirming'
              : 'page-admin-actions__danger'
          }
          onClick={deletePage}
          disabled={state !== 'idle'}
        >
          {state === 'deleting' ? '删除中...' : confirmDelete ? '确认删除' : '删除页面'}
        </button>
      </div>
      {message ? <p className="page-admin-actions__message">{message}</p> : null}
    </section>
  )
}
