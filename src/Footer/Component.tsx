import { getCachedGlobal } from '@/utilities/getGlobals'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const defaultNavItems = [
    { href: '/product-range', label: 'Product Range' },
    { href: '/technology', label: 'Technology' },
    { href: '/product-guarantee', label: 'Product Guarantee' },
    { href: '/about-us', label: 'About Us' },
    { href: '/where-to-buy', label: 'Where to buy' },
  ]

  return (
    <footer className="site-footer mt-auto bg-[#242424] text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-[1fr_2fr_1fr]">
        <Link className="flex items-start gap-3" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col gap-4">
          <p className="text-sm text-[#C9A870]">Navigation</p>
          <nav className="grid gap-3 text-sm text-white/65 sm:grid-cols-2">
            {navItems.length > 0
              ? navItems.map(({ link }, i) => {
                  return (
                    <CMSLink
                      className="site-footer__link text-white/65 hover:text-white"
                      key={i}
                      {...link}
                    />
                  )
                })
              : defaultNavItems.map((item) => (
                  <Link
                    className="site-footer__link text-white/65 hover:text-white"
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
          </nav>
        </div>

        <div>
          <p className="text-sm text-[#C9A870]">Contact Us</p>
          <Link
            className="site-footer__contact mt-5 flex items-center border-b border-white/35 pb-3 text-sm text-white/60"
            href="/contact-us"
          >
            <span className="grow">Leave your message</span>
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
          <p className="mt-10 text-xs text-white/35">
            Privacy Statement | Terms of Use
            <br />
            Copyright 2026 Symbol Bedding. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
