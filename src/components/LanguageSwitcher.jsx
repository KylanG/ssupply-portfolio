'use client'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useDarkMode } from '../context/DarkModeContext'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const t = useTranslations('language')
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const { darkMode } = useDarkMode()

  function switchLocale() {
    const nextLocale = locale === 'en' ? 'nl' : 'en'
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`)
    startTransition(() => {
      router.push(newPath)
    })
  }

  return (
    <button
      onClick={switchLocale}
      aria-label={t('switchTo')}
      disabled={isPending}
      className={`font-secondary text-sm px-3 py-1 rounded-full border transition-colors duration-300 ${
        isPending ? 'opacity-50 cursor-not-allowed' : ''
      } ${
        darkMode
          ? 'border-white/30 text-white hover:bg-white hover:text-black'
          : 'border-black/30 text-black hover:bg-black hover:text-white'
      }`}
    >
      {t('current')}
    </button>
  )
}
