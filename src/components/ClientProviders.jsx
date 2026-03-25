'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { DarkModeProvider, useDarkMode } from '../context/DarkModeContext'

function LenisInit() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return null
}

function ThemedWrapper({ children }) {
  const { darkMode } = useDarkMode()
  return (
    <div className={`transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {children}
    </div>
  )
}

export default function ClientProviders({ children }) {
  return (
    <DarkModeProvider>
      <LenisInit />
      <ThemedWrapper>
        {children}
      </ThemedWrapper>
    </DarkModeProvider>
  )
}
