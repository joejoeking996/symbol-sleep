'use client'

import React, { useState } from 'react'

type Props = {
  submitLabel: string
  successMessage: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export const InquiryFormClient: React.FC<Props> = ({ submitLabel, successMessage }) => {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setError(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      email: String(formData.get('email') || ''),
      message: String(formData.get('message') || ''),
      name: String(formData.get('name') || ''),
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

      if (!response.ok) {
        throw new Error('Submit failed')
      }

      form.reset()
      setStatus('success')
    } catch {
      setError('Unable to submit right now. Please try again later.')
      setStatus('error')
    }
  }

  return (
    <form className="grid gap-5 bg-[#F2F1EF] p-6 md:p-8" onSubmit={onSubmit}>
      <label className="grid gap-2 text-sm text-[#2A2A2A]">
        Name
        <input
          className="h-12 border border-[#ded8cd] bg-white px-4 outline-none focus:border-[#C9A870]"
          name="name"
          required
          type="text"
        />
      </label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-[#2A2A2A]">
          Email
          <input
            className="h-12 border border-[#ded8cd] bg-white px-4 outline-none focus:border-[#C9A870]"
            name="email"
            type="email"
          />
        </label>
        <label className="grid gap-2 text-sm text-[#2A2A2A]">
          Phone
          <input
            className="h-12 border border-[#ded8cd] bg-white px-4 outline-none focus:border-[#C9A870]"
            name="phone"
            type="tel"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm text-[#2A2A2A]">
        Message
        <textarea
          className="min-h-36 border border-[#ded8cd] bg-white p-4 outline-none focus:border-[#C9A870]"
          name="message"
          required
        />
      </label>
      <button
        className="h-12 bg-[#2A2A2A] px-6 text-sm font-semibold text-white transition hover:bg-[#C9A870] hover:text-[#121212] disabled:opacity-60"
        disabled={status === 'submitting'}
        type="submit"
      >
        {status === 'submitting' ? 'Submitting...' : submitLabel}
      </button>
      {status === 'success' && <p className="text-sm text-[#58745f]">{successMessage}</p>}
      {error && <p className="text-sm text-[#a45d52]">{error}</p>}
    </form>
  )
}
