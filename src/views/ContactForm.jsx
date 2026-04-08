'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useDarkMode } from '../context/DarkModeContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'

const SUBJECTS = ['General enquiry', 'Support', 'Partnership', 'Other']

const EMPTY = { firstName: '', lastName: '', email: '', subject: SUBJECTS[0], message: '' }

export default function ContactForm() {
  const { darkMode } = useDarkMode()
  const t = useTranslations('contact')
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

  const inputClass = `w-full px-4 py-3 rounded-xl border text-sm font-secondary outline-none transition-colors duration-150 ${
    darkMode
      ? 'bg-white/5 border-white/15 text-white placeholder-white/40 focus:border-white/40'
      : 'bg-white border-black/10 text-black placeholder-black/30 focus:border-black/30'
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
            <span>✉</span>
            <span>info@seansupply.com</span>
          </a>
        </div>

        {/* Form card */}
        <div className={`max-w-2xl mx-auto rounded-2xl p-8 md:p-10 ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-100'}`}>
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className={`font-secondary text-xs ${darkMode ? 'text-white/50' : 'text-black/50'}`}>{t('firstName')}</span>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={`font-secondary text-xs ${darkMode ? 'text-white/50' : 'text-black/50'}`}>{t('lastName')}</span>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </label>
            </div>

            {/* Email */}
            <label className="flex flex-col gap-1.5">
              <span className={`font-secondary text-xs ${darkMode ? 'text-white/50' : 'text-black/50'}`}>{t('email')}</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </label>

            {/* Subject */}
            <label className="flex flex-col gap-1.5">
              <span className={`font-secondary text-xs ${darkMode ? 'text-white/50' : 'text-black/50'}`}>{t('subject')}</span>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={inputClass}
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>

            {/* Message */}
            <label className="flex flex-col gap-1.5">
              <span className={`font-secondary text-xs ${darkMode ? 'text-white/50' : 'text-black/50'}`}>{t('message')}</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t('messagePlaceholder')}
                required
                rows={6}
                className={`${inputClass} resize-y`}
              />
            </label>

            {/* Status messages */}
            {status === 'success' && (
              <p className="text-green-500 font-secondary text-sm">{t('successMessage')}</p>
            )}
            {status === 'error' && (
              <p className="text-red-500 font-secondary text-sm">{t('errorMessage')}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full py-4 rounded-full font-secondary text-sm transition-opacity duration-150 ${
                status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
              } ${darkMode ? 'bg-white text-black hover:opacity-80' : 'bg-black text-white hover:opacity-80'}`}
            >
              {status === 'loading' ? t('sending') : t('submit')}
            </button>

          </form>
        </div>

        {/* CTA section */}
        <div className="text-center mt-24">
          <h2 className="font-primary uppercase text-3xl md:text-4xl mb-4">{t('ctaTitle')}</h2>
          <p className={`font-secondary text-base mb-8 ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
            {t('ctaSubtitle')}
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button href="mailto:info@seansupply.com" variant="primary">
              <span>{t('sayHello')}</span><span aria-hidden="true">👋🏻</span>
            </Button>
            <Button href="/work" variant="secondary">
              <span>{t('checkWork')}</span><span aria-hidden="true">🔗</span>
            </Button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
