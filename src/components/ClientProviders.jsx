'use client'
import { useEffect } from 'react'
import { DarkModeProvider, useDarkMode } from '../context/DarkModeContext'

function LenisInit() {
  useEffect(() => {
    let lenis
    let rafId

    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      function raf(time) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
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
