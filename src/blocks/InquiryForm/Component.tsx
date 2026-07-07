import React from 'react'

import { InquiryFormClient } from './Component.client'

type Props = {
  body?: string | null
  heading?: string | null
  submitLabel?: string | null
  successMessage?: string | null
}

export const InquiryFormBlock: React.FC<Props> = (props) => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container grid gap-10 md:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#C9A870]">
            Contact Us
          </p>
          <h2 className="font-serif text-4xl font-medium text-[#121212] md:text-5xl">
            {props.heading || 'Leave your message'}
          </h2>
          {props.body && <p className="mt-5 max-w-lg text-base leading-8 text-[#555]">{props.body}</p>}
        </div>
        <InquiryFormClient
          submitLabel={props.submitLabel || 'Submit'}
          successMessage={props.successMessage || 'Thank you. Your message has been received.'}
        />
      </div>
    </section>
  )
}
