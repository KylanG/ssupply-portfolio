'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useDarkMode } from '../context/DarkModeContext'
import Button from './Button'

export default function Navbar() {
  const { darkMode, setDarkMode } = useDarkMode()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = ['Work', 'About', 'Music', 'Contact']

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
            <Link href="/">
              <img
                src="/ssupply-logo.svg"
                className={`transition-all duration-300 ${darkMode ? 'invert' : ''}`}
              />
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`nav-link font-secondary text-sm ${darkMode ? 'text-white' : 'text-black'}`}
              >
                <span className="nav-text first">{item}</span>
                <span className="nav-text second">{item}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Buttons — desktop only */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
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
            className={`w-12 h-6 rounded-full transition-colors duration-300 ${darkMode ? 'bg-white' : 'bg-black'}`}
          >
            <span className={`block w-5 h-5 rounded-full transition-transform duration-300 mx-0.5 ${darkMode ? 'bg-black translate-x-6' : 'bg-white translate-x-0'}`}></span>
          </button>
          <button
            className="flex flex-col gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
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
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`font-secondary text-center py-2 text-1xl ${darkMode ? 'text-white' : 'text-black'}`}
            >
              {item}
            </Link>
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
