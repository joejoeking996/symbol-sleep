'use client'

import React, { useState } from 'react'

type Props = {
  heading: string
  submitLabel: string
  successMessage: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export const ContactPageForm: React.FC<Props> = ({ heading, submitLabel, successMessage }) => {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setError(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const firstName = String(formData.get('firstName') || '')
    const lastName = String(formData.get('lastName') || '')

    const payload = {
      email: String(formData.get('email') || ''),
      message: String(formData.get('message') || ''),
      name: `${firstName} ${lastName}`.trim(),
      phone: String(formData.get('phone') || ''),
      sourcePage: window.location.pathname,
    }

    try {
      const response = await fetch('/api/inquiries', {
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) throw new Error('Submit failed')

      form.reset()
      setStatus('success')
    } catch {
      setError('Unable to submit right now. Please try again later.')
      setStatus('error')
    }
  }

  return (
    <form className="contact-page__form" onSubmit={onSubmit}>
      <h2>{heading}</h2>
      <div className="contact-page__form-grid">
        <label>
          <span>First name*</span>
          <input autoComplete="given-name" name="firstName" required type="text" />
        </label>
        <label>
          <span>Last name*</span>
          <input autoComplete="family-name" name="lastName" required type="text" />
        </label>
        <label>
          <span>Email address*</span>
          <input autoComplete="email" name="email" required type="email" />
        </label>
        <label>
          <span>Phone number*</span>
          <input autoComplete="tel" name="phone" required type="tel" />
        </label>
      </div>
      <label className="contact-page__message">
        <span>Comment:</span>
        <textarea name="message" required />
      </label>
      <button aria-busy={status === 'submitting'} disabled={status === 'submitting'} type="submit">
        {status === 'submitting' ? 'Sending...' : submitLabel}
      </button>
      <div aria-live="polite">
        {status === 'success' && <p className="contact-page__status">{successMessage}</p>}
        {error && <p className="contact-page__status contact-page__status--error">{error}</p>}
      </div>
    </form>
  )
}
