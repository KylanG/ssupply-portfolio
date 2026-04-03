'use client'
import { useRef, useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useDarkMode } from '../context/DarkModeContext'
import { routing } from '../i18n/routing'

const LOCALE_LABELS = { en: 'EN', nl: 'NL' }

export default function LanguageSwitcher() {
  const locale = useLocale()
  const t = useTranslations('language')
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const { darkMode } = useDarkMode()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  function switchLocale(nextLocale) {
    if (nextLocale === locale) { setOpen(false); return }
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`)
    setOpen(false)
    startTransition(() => router.push(newPath))
  }

  const borderClass = darkMode
    ? 'border-white/30 text-white hover:bg-white/10'
    : 'border-black/20 text-black hover:bg-black/5'

  const dropdownBg = darkMode ? 'bg-black border-white/10' : 'bg-white border-black/10'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label={t('switchTo')}
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={isPending}
        className={`w-9 h-9 rounded-full border font-secondary text-xs flex items-center justify-center transition-colors duration-200 ${borderClass} ${isPending ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        {LOCALE_LABELS[locale]}
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className={`absolute right-0 mt-2 w-20 rounded-xl border shadow-lg overflow-hidden z-50 ${dropdownBg}`}
        >
          {routing.locales.map((loc) => (
            <li key={loc} role="option" aria-selected={loc === locale}>
              <button
                onClick={() => switchLocale(loc)}
                className={`w-full px-3 py-2 text-xs font-secondary text-left transition-colors duration-150 ${
                  loc === locale
                    ? darkMode ? 'bg-white/10 text-white' : 'bg-black/5 text-black'
                    : darkMode ? 'text-white/70 hover:bg-white/10 hover:text-white' : 'text-black/60 hover:bg-black/5 hover:text-black'
                }`}
              >
                {LOCALE_LABELS[loc]} — {loc === 'en' ? 'English' : 'Nederlands'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
