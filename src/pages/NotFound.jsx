'use client'
import { useDarkMode } from '../context/DarkModeContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'

export default function NotFound() {
  const { darkMode } = useDarkMode()

  return (
    <div className={`relative h-screen flex flex-col overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <img
        src="/outline-text.svg"
        className={`absolute w-full bottom-0 select-none pointer-events-none z-0 transition-opacity duration-300 ${darkMode ? 'opacity-10' : 'opacity-50'}`}
      />
      <Navbar />
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-primary uppercase text-5xl mb-4">Page not found</h1>
        <p className="font-secondary text-lg mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Button href="/" variant="primary">
          <span>Back to home</span>👋🏻
        </Button>
      </main>
      <Footer />
    </div>
  )
}
