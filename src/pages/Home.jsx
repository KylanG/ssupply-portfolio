'use client'
import { useDarkMode } from '../context/DarkModeContext'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MusicSection from '../components/MusicSection'
import Footer from '../components/Footer'

export default function Home() {
  const { darkMode } = useDarkMode()

  return (
    <div className="relative min-h-screen flex flex-col">
      <img
        src="/outline-text.svg"
        className={`absolute w-full bottom-0 select-none pointer-events-none z-0 transition-opacity duration-300 ${darkMode ? 'opacity-10' : 'opacity-50'}`}
      />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Hero
          title="Hi! I'm Kylan, a front-end developer & web designer 👋🏻"
          subtitle="I'm a developer and web designer based in Rotterdam, passionate about creativity and bringing pixel-perfect designs to life."
          buttons={[
            { label: "Say hello", emoji: "👋🏻", href: "mailto:info@seansupply.com", filled: true },
            { label: "Download CV", emoji: "🔗", href: "/kylan-groen-cv.pdf", external: true, filled: false },
          ]}
        />
        <MusicSection />
      </main>
      <Footer />
    </div>
  )
}
