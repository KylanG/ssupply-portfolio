'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useDarkMode } from '../context/DarkModeContext'
import Button from './Button'

export default function Navbar() {
  const { darkMode, setDarkMode } = useDarkMode()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Music', href: '/music' },
    { label: 'Contact', href: 'mailto:info@seansupply.com' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md border-b ${
      darkMode
        ? 'bg-black/40 border-white/10'
        : 'bg-white/60 border-black/10'
    }`}>
      <div className="flex justify-between items-center px-4 py-3">

        {/* Left side: Logo + nav links */}
        <div className="flex items-center gap-6">
          <div className="px-3 py-1">
            <Link href="/" aria-label="Go to homepage">
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

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link font-secondary text-sm ${darkMode ? 'text-white' : 'text-black'}`}
              >
                <span className="nav-text first">{item.label}</span>
                <span className="nav-text second" aria-hidden="true">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Buttons — desktop only */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`w-12 h-6 rounded-full transition-colors duration-300 ${darkMode ? 'bg-white' : 'bg-black'}`}
          >
            <span className={`block w-5 h-5 rounded-full transition-transform duration-300 mx-0.5 ${darkMode ? 'bg-black translate-x-6' : 'bg-white translate-x-0'}`}></span>
          </button>
          <Button href="mailto:info@seansupply.com" variant="primary">
            <span>Say hello</span>👋🏻
          </Button>
          <Button href="/kylan-groen-cv.pdf" variant="secondary" newTab>
            <span>Download CV</span>🔗
          </Button>
        </div>

        {/* Toggle + Hamburger — mobile only */}
        <div className="flex md:hidden items-center gap-3 px-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`w-12 h-6 rounded-full transition-colors duration-300 ${darkMode ? 'bg-white' : 'bg-black'}`}
          >
            <span className={`block w-5 h-5 rounded-full transition-transform duration-300 mx-0.5 ${darkMode ? 'bg-black translate-x-6' : 'bg-white translate-x-0'}`}></span>
          </button>
          <button
            className="flex flex-col gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-0.5 transition-all ${darkMode ? 'bg-white' : 'bg-black'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 transition-all ${darkMode ? 'bg-white' : 'bg-black'} ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 transition-all ${darkMode ? 'bg-white' : 'bg-black'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`flex md:hidden flex-col gap-3 px-6 pb-6 border-t ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`font-secondary text-center py-2 text-1xl ${darkMode ? 'text-white' : 'text-black'}`}
            >
              {item.label}
            </a>
          ))}
          <Button href="mailto:info@seansupply.com" variant="primary">
            <span>Say hello</span>👋🏻
          </Button>
          <Button href="/kylan-groen-cv.pdf" variant="secondary" newTab>
            <span>Download CV</span>🔗
          </Button>
        </div>
      )}
    </nav>
  )
}
