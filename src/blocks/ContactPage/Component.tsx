import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

import { ContactPageForm } from './Component.client'

type ContactGroup = {
  description?: string | null
  email?: string | null
  phone?: string | null
  title?: string | null
}

type Props = {
  backgroundImage?: MediaType | number | string | null
  contacts?: ContactGroup[] | null
  heading?: string | null
  submitLabel?: string | null
  successMessage?: string | null
}

const fallbackContacts: ContactGroup[] = [
  {
    description: 'For any enquiries relating to after sales support',
    email: '****@symbol.com',
    phone: '13*****',
    title: 'Customer Care',
  },
  {
    description: 'For any enquiries relating to pre-sale support',
    email: '****@symbol.com',
    phone: '13*****',
    title: 'Concierge Service',
  },
  {
    description: 'For any enquiries if you are one of our retailers',
    phone: '13*****',
    title: 'Retailer Sales Support',
  },
]

export const ContactPageBlock: React.FC<Props> = ({
  backgroundImage,
  contacts,
  heading,
  submitLabel,
  successMessage,
}) => {
  const contactGroups = contacts?.length ? contacts : fallbackContacts

  return (
    <section className="contact-page">
      {backgroundImage && typeof backgroundImage === 'object' ? (
        <Media fill imgClassName="object-cover" priority resource={backgroundImage} />
      ) : (
        <div className="contact-page__fallback" />
      )}
      <div className="contact-page__overlay" />

      <div className="contact-page__inner">
        <div className="contact-page__contacts">
          {contactGroups.map((item, index) => (
            <article key={`${item.title || 'contact'}-${index}`}>
              <h2>{item.title}</h2>
              {item.description && <p>{item.description}</p>}
              {item.email && <p>E {item.email}</p>}
              {item.phone && <p>P {item.phone}</p>}
            </article>
          ))}
        </div>

        <ContactPageForm
          heading={heading || 'Leave Your Message'}
          submitLabel={submitLabel || 'Send'}
          successMessage={successMessage || 'Thank you. Your message has been received.'}
        />
      </div>
    </section>
  )
}
