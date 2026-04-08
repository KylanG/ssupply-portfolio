'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useDarkMode } from '../context/DarkModeContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SUBJECT_KEYS = ['generalEnquiry', 'support', 'partnership', 'other']

export default function ContactForm() {
  const { darkMode } = useDarkMode()
  const t = useTranslations('contact')

  const SUBJECTS = SUBJECT_KEYS.map((key) => ({ key, label: t(`subjects.${key}`) }))
  const EMPTY = { firstName: '', lastName: '', email: '', subject: SUBJECTS[0].key, message: '' }
  const [form, setForm] = useState(() => EMPTY)
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

  const labelClass = `font-secondary text-xs ${darkMode ? 'text-white' : 'text-black'}`

  const inputClass = `w-full px-4 py-3 rounded-xl border text-sm font-secondary outline-none transition-colors duration-150 focus:ring-2 focus:ring-black/20 ${
    darkMode
      ? 'bg-black border-white/15 text-white placeholder-white focus:border-white/40'
      : 'bg-white border-[#DCDCDC] text-black placeholder-black focus:border-black/30'
  }`

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error)
      setStatus('success')
      setForm(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={`relative min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="font-primary uppercase text-4xl md:text-5xl mb-4">{t('title')}</h1>
          <p className={`font-secondary text-base md:text-lg max-w-xl mx-auto ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
            {t('subtitle')}
          </p>
        </div>

        {/* Email links */}
        <div className="flex justify-center gap-6 mb-10 font-secondary text-sm">
          <a
            href="mailto:info@seansupply.com"
            className={`flex items-center gap-2 underline underline-offset-4 ${darkMode ? 'text-white/70 hover:text-white' : 'text-black/60 hover:text-black'} transition-colors`}
          >
            <span aria-hidden="true">✉</span>
            <span>info@seansupply.com</span>
          </a>
        </div>

        {/* Form card */}
        <div className={`max-w-2xl mx-auto rounded-2xl p-8 md:p-10 border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-[#DCDCDC]'}`}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
            aria-label={t('title')}
          >

            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="firstName" className={labelClass}>{t('firstName')}</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder={t('firstName')}
                  autoComplete="given-name"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lastName" className={labelClass}>{t('lastName')}</label>
                <input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder={t('lastName')}
                  autoComplete="family-name"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className={labelClass}>{t('email')}</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t('email')}
                required
                aria-required="true"
                aria-describedby={status === 'error' ? 'form-error' : undefined}
                autoComplete="email"
                className={inputClass}
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className={labelClass}>{t('subject')}</label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={inputClass}
              >
                {SUBJECTS.map(({ key, label }) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className={labelClass}>{t('message')}</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t('messagePlaceholder')}
                required
                aria-required="true"
                aria-describedby={status === 'error' ? 'form-error' : undefined}
                rows={6}
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Status messages */}
            {status === 'success' && (
              <p role="status" className="text-green-600 font-secondary text-sm">{t('successMessage')}</p>
            )}
            {status === 'error' && (
              <p id="form-error" role="alert" className="text-red-600 font-secondary text-sm">{t('errorMessage')}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              aria-disabled={status === 'loading'}
              aria-busy={status === 'loading'}
              className={`w-full py-4 rounded-full font-secondary text-sm transition-opacity duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
              } ${darkMode ? 'bg-white text-black hover:opacity-80 focus:ring-white' : 'bg-black text-white hover:opacity-80 focus:ring-black'}`}
            >
              {status === 'loading' ? t('sending') : t('submit')}
            </button>

          </form>
        </div>


      </main>

      <Footer />
    </div>
  )
}
