'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[6.5rem] flex min-h-[720px] items-center justify-center overflow-hidden text-white"
      data-theme="dark"
    >
      <div className="absolute inset-0 bg-[linear-gradient(115deg,#d8d0c2,#f3eee6_42%,#9b8973)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(255,255,255,0.42),transparent_28%),linear-gradient(90deg,rgba(60,45,35,0.22),rgba(25,20,16,0.02)_42%,rgba(25,20,16,0.16))]" />
      <div className="container relative z-10 flex items-center justify-center pt-28">
        <div className="max-w-[42rem] bg-black/45 px-10 py-10 text-center backdrop-blur-[1px] md:px-16">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="absolute inset-0 select-none">
        {media && typeof media === 'object' ? (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        ) : (
          <div className="absolute inset-x-[8%] bottom-0 h-[44%] rounded-t-[12rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.3),rgba(116,96,75,0.65))] opacity-70" />
        )}
      </div>
    </div>
  )
}
