import React from 'react'

type FAQItem = {
  answer?: string | null
  question?: string | null
}

type Props = {
  heading?: string | null
  items?: FAQItem[] | null
}

export const FAQSectionBlock: React.FC<Props> = ({ heading, items }) => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
        <h2 className="font-serif text-4xl font-medium text-[#121212] md:text-5xl">{heading}</h2>
        <div className="divide-y divide-[#ded8cd] border-y border-[#ded8cd]">
          {(items || []).map((item, index) => (
            <details className="group py-6" key={`${item.question || 'faq'}-${index}`}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-8 text-lg font-semibold text-[#2A2A2A]">
                <span>{item.question}</span>
                <span className="text-2xl text-[#C9A870] group-open:rotate-45">+</span>
              </summary>
              {item.answer && <p className="mt-4 max-w-3xl text-sm leading-7 text-[#707070]">{item.answer}</p>}
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
