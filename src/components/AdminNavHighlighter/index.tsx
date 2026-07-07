'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const activeLinkClass = 'symbol-nav-active'
const activeGroupClass = 'symbol-nav-group-active'

const normalizePath = (value: string | null): string => {
  if (!value) return ''

  try {
    return new URL(value, window.location.origin).pathname.replace(/\/$/, '')
  } catch {
    return value.split('?')[0]?.replace(/\/$/, '') || ''
  }
}

const isActiveHref = (pathname: string, href: string | null): boolean => {
  const normalizedHref = normalizePath(href)

  if (!normalizedHref || normalizedHref === '/admin') return false

  return pathname === normalizedHref || pathname.startsWith(`${normalizedHref}/`)
}

export default function AdminNavHighlighter() {
  const pathnameFromRouter = usePathname()

  useEffect(() => {
    const updateActiveNav = () => {
      const pathname = normalizePath(pathnameFromRouter || window.location.pathname)
      const nav = document.querySelector('.nav')

      if (!nav) return

      nav.querySelectorAll(`.${activeLinkClass}`).forEach((element) => {
        element.classList.remove(activeLinkClass)
      })

      nav.querySelectorAll(`.${activeGroupClass}`).forEach((element) => {
        element.classList.remove(activeGroupClass)
      })

      nav.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
        if (!isActiveHref(pathname, link.getAttribute('href'))) return

        link.classList.add(activeLinkClass)
        link.closest('.nav-group')?.classList.add(activeGroupClass)
      })
    }

    updateActiveNav()

    const observer = new MutationObserver(updateActiveNav)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [pathnameFromRouter])

  return null
}
