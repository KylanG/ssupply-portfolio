'use client'
import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
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

  const darkModeToggle = (
    <button
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode ? tDark('switchToLight') : tDark('switchToDark')}
      className={`w-12 h-6 rounded-full transition-colors duration-300 ${darkMode ? 'bg-white' : 'bg-black'}`}
    >
      <span className={`block w-5 h-5 rounded-full transition-transform duration-300 mx-0.5 ${darkMode ? 'bg-black translate-x-6' : 'bg-white translate-x-0'}`}></span>
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
        <div className="flex items-center justify-end gap-3">
          <Button href="mailto:info@seansupply.com" variant="primary">
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

        {/* Right: Dark mode toggle + hamburger */}
        <div className="flex items-center gap-3 px-3">
          {darkModeToggle}
          <button
            className="flex flex-col gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-6 h-0.5 transition-all ${darkMode ? 'bg-white' : 'bg-black'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 transition-all ${darkMode ? 'bg-white' : 'bg-black'} ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 transition-all ${darkMode ? 'bg-white' : 'bg-black'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
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
                  className={`font-secondary text-center py-2 text-1xl ${darkMode ? 'text-white' : 'text-black'}`}
                >
                  {item.label}
                </a>
              )
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`font-secondary text-center py-2 text-1xl ${darkMode ? 'text-white' : 'text-black'}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
          <Button href="mailto:info@seansupply.com" variant="primary">
            <span>{t('sayHello')}</span><span aria-hidden="true">👋🏻</span>
          </Button>
        </div>
      )}
    </nav>
  )
}
