import { useState } from 'react'

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="flex justify-between items-center px-4 py-3">
        <div className="px-3 py-1">
          <a href="/">
            <img src="/ssupply-logo.svg" 
            className={`transition-all duration-300 ${darkMode ? 'invert' : ''}`}
            />
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full transition-colors duration-300 ${darkMode ? 'bg-white' : 'bg-black'}`}
          >
            <span className={`block w-5 h-5 rounded-full transition-transform duration-300 mx-0.5 ${darkMode ? 'bg-black translate-x-6' : 'bg-white translate-x-0'}`}></span>
          </button>

          <a href="mailto:info@seansupply.com" className={`flex gap-2 p-4 rounded-full border font-secondary leading-none transition-colors duration-300 ${darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'}`}>
            <span>Say hello</span>👋🏻
          </a>
          <a href="/kylan-groen-cv.pdf" target="_blank" rel="noopener noreferrer" className={`flex gap-2 p-4 rounded-full border font-secondary leading-none transition-colors duration-300 ${darkMode ? 'border-white text-white' : 'border-black text-black'}`}>
            <span>Download CV</span>🔗
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-1.5 px-3"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 transition-all ${darkMode ? 'bg-white' : 'bg-black'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 transition-all ${darkMode ? 'bg-white' : 'bg-black'} ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 transition-all ${darkMode ? 'bg-white' : 'bg-black'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobiel menu */}
      {menuOpen && (
        <div className="flex md:hidden flex-col gap-3 px-6 pb-6">
          <a href="mailto:info@seansupply.com" className={`flex justify-center gap-2 p-4 rounded-full border font-secondary leading-none ${darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'}`}>
            <span>Say hello</span>👋🏻
          </a>
          <a href="#" className={`flex justify-center gap-2 p-4 rounded-full border font-secondary leading-none ${darkMode ? 'border-white text-white' : 'border-black text-black'}`}>
            <span>Download CV</span>🔗
          </a>
        </div>
      )}
    </nav>
  )
}