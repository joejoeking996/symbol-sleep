import React from 'react'

type Feature = {
  description?: string | null
  title?: string | null
}

type Props = {
  features?: Feature[] | null
  heading?: string | null
  intro?: string | null
}

export const FeatureGridBlock: React.FC<Props> = ({ features, heading, intro }) => {
  return (
    <section className="bg-[#F2F1EF] py-20 md:py-28">
      <div className="container">
        <div className="mb-12 max-w-3xl">
          <h2 className="font-serif text-4xl font-medium text-[#121212] md:text-5xl">{heading}</h2>
          {intro && <p className="mt-5 text-base leading-8 text-[#555]">{intro}</p>}
        </div>

        <div className="grid gap-px bg-[#d8d3ca] md:grid-cols-2 lg:grid-cols-4">
          {(features || []).map((feature, index) => (
            <article className="min-h-56 bg-white p-8" key={`${feature.title || 'feature'}-${index}`}>
              <p className="mb-8 font-serif text-3xl text-[#C9A870]">
                {(index + 1).toString().padStart(2, '0')}
              </p>
              <h3 className="text-xl font-semibold text-[#2A2A2A]">{feature.title}</h3>
              {feature.description && (
                <p className="mt-4 text-sm leading-7 text-[#707070]">{feature.description}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
