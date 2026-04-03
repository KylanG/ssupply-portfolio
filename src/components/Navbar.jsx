'use client'
import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Sun, Moon } from 'lucide-react'
import { useDarkMode } from '../context/DarkModeContext'
import Button from './Button'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const { darkMode, setDarkMode } = useDarkMode()
  const [menuOpen, setMenuOpen] = useState(false)
  const t = useTranslations('nav')
  const tDark = useTranslations('darkMode')
  const locale = useLocale()

  const navLinks = [
    { label: t('work'), href: `/${locale}/work` },
    { label: t('about'), href: `/${locale}/about` },
    { label: t('music'), href: `/${locale}/music` },
    { label: t('contact'), href: 'mailto:info@seansupply.com' },
  ]

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const iconBorderClass = darkMode
    ? 'border-white/30 text-white hover:bg-white/10'
    : 'border-black/20 text-black hover:bg-black/5'

  const darkModeToggle = (
    <button
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode ? tDark('switchToLight') : tDark('switchToDark')}
      className={`relative w-11 h-11 rounded-full border flex items-center justify-center transition-colors duration-200 ${iconBorderClass}`}
    >
      <Sun
        size={15}
        className={`absolute transition-all duration-300 ${
          darkMode ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
        }`}
      />
      <Moon
        size={15}
        className={`absolute transition-all duration-300 ${
          darkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      />
    </button>
  )

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md border-b ${
      darkMode
        ? 'bg-black/40 border-white/10'
        : 'bg-white/60 border-black/10'
    }`}>
      {/* Desktop: 3-column grid so nav is always truly centered */}
      <div className="hidden md:grid grid-cols-3 items-center px-4 py-3">

        {/* Left: Logo */}
        <div className="flex items-center">
          <div className="px-3 py-1">
            <Link href={`/${locale}`} aria-label={t('homepage')}>
              <Image
                src="/ssupply-logo.svg"
                alt="SSUPPLY logo"
                width={139}
                height={41}
                className={`transition-all duration-300 ${darkMode ? 'invert' : ''}`}
                priority
              />
            </Link>
          </div>
        </div>

        {/* Center: Nav links */}
        <div className="flex items-center justify-center gap-6">
          {navLinks.map((item) => {
            const isExternal = item.href.startsWith('mailto:') || item.href.startsWith('http')
            if (isExternal) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`nav-link font-secondary text-sm ${darkMode ? 'text-white' : 'text-black'}`}
                >
                  <span className="nav-text first">{item.label}</span>
                  <span className="nav-text second" aria-hidden="true">{item.label}</span>
                </a>
              )
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`nav-link font-secondary text-sm ${darkMode ? 'text-white' : 'text-black'}`}
              >
                <span className="nav-text first">{item.label}</span>
                <span className="nav-text second" aria-hidden="true">{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Right: Say hello + language switcher + dark mode toggle */}
        <div className="flex items-center justify-end gap-2">
          <Button href="mailto:info@seansupply.com" variant="primary" className="h-11 px-4 py-0">
            <span>{t('sayHello')}</span><span aria-hidden="true">👋🏻</span>
          </Button>
          <LanguageSwitcher />
          {darkModeToggle}
        </div>
      </div>

      {/* Mobile: flex layout */}
      <div className="flex md:hidden justify-between items-center px-4 py-3">

        {/* Left: Logo */}
        <div className="px-3 py-1">
          <Link href={`/${locale}`} aria-label={t('homepage')}>
            <Image
              src="/ssupply-logo.svg"
              alt="SSUPPLY logo"
              width={139}
              height={41}
              className={`transition-all duration-300 ${darkMode ? 'invert' : ''}`}
              priority
            />
          </Link>
        </div>

        {/* Right: [☾/☀] [Taal] [☰] */}
        <div className="flex items-center gap-2 px-3">
          {darkModeToggle}
          <LanguageSwitcher />
          <button
            className="flex flex-col gap-1.5 w-9 h-9 items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-5 h-0.5 transition-all duration-300 ${darkMode ? 'bg-white' : 'bg-black'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-5 h-0.5 transition-all duration-300 ${darkMode ? 'bg-white' : 'bg-black'} ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 transition-all duration-300 ${darkMode ? 'bg-white' : 'bg-black'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className={`flex md:hidden flex-col gap-3 px-6 pb-6 border-t ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
          {navLinks.map((item) => {
            const isExternal = item.href.startsWith('mailto:') || item.href.startsWith('http')
            if (isExternal) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-secondary text-center py-2 text-xl ${darkMode ? 'text-white' : 'text-black'}`}
                >
                  {item.label}
                </a>
              )
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`font-secondary text-center py-2 text-xl ${darkMode ? 'text-white' : 'text-black'}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}
          <Button href="mailto:info@seansupply.com" variant="primary">
            <span>{t('sayHello')}</span><span aria-hidden="true">👋🏻</span>
          </Button>
        </div>
      )}
    </nav>
  )
}
