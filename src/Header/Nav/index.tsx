'use client'

import React, { useEffect, useMemo, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react'

type NavLink = {
  href: string
  label?: string | null
  newTab?: boolean | null
}

const defaultNavItems: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/product-range', label: 'Product Range' },
  { href: '/technology', label: 'Technology' },
  { href: '/product-guarantee', label: 'Product Guarantee' },
  { href: '/about-us', label: 'About us' },
  { href: '/where-to-buy', label: 'Where to buy' },
  { href: '/contact-us', label: 'Contact Us' },
]

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const links = useMemo<NavLink[]>(() => {
    if (!navItems.length) return defaultNavItems

    return navItems
      .map(({ link }) => {
        const href = getLinkHref(link)

        if (!href) return null

        return {
          href,
          label: link?.label,
          newTab: link?.newTab,
        }
      })
      .filter(Boolean) as NavLink[]
  }, [navItems])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <nav className="site-nav flex items-center gap-3 text-sm text-[#333333]">
      <div className="site-nav__desktop">
        {links.map((item) => (
          <NavAnchor item={item} key={item.href} pathname={pathname} />
        ))}
      </div>
      <SearchLink />
      <button
        aria-controls="site-mobile-nav"
        aria-expanded={open}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        className="site-nav__menu"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {open ? <XIcon aria-hidden="true" size={21} /> : <MenuIcon aria-hidden="true" size={21} />}
      </button>

      <div className={open ? 'site-nav__mobile is-open' : 'site-nav__mobile'} id="site-mobile-nav">
        {links.map((item) => (
          <NavAnchor item={item} key={item.href} pathname={pathname} />
        ))}
        <Link className="site-nav__mobile-search" href="/search">
          <SearchIcon aria-hidden="true" size={18} />
          <span>Search</span>
        </Link>
      </div>
    </nav>
  )
}

function NavAnchor({ item, pathname }: { item: NavLink; pathname: string }) {
  return (
    <Link
      aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
      className={isActivePath(pathname, item.href) ? 'site-nav__link is-active' : 'site-nav__link'}
      href={item.href}
      rel={item.newTab ? 'noopener noreferrer' : undefined}
      target={item.newTab ? '_blank' : undefined}
    >
      {item.label}
    </Link>
  )
}

function SearchLink() {
  return (
    <Link className="site-nav__search" href="/search">
      <span className="sr-only">Search</span>
      <SearchIcon className="w-5 text-[#2A2A2A]" />
    </Link>
  )
}

function getLinkHref(link: NonNullable<HeaderType['navItems']>[number]['link']) {
  if (link?.type === 'reference' && typeof link.reference?.value === 'object') {
    const slug = link.reference.value.slug

    if (!slug) return null

    return link.reference.relationTo === 'pages'
      ? `/${slug}`
      : `/${link.reference.relationTo}/${slug}`
  }

  return link?.url || null
}

function isActivePath(pathname: string, href?: string | null) {
  if (!href) return false
  if (href === '/') return pathname === '/'

  return pathname === href || pathname.startsWith(`${href}/`)
}
