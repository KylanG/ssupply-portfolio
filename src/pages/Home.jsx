'use client'
import { useDarkMode } from '../context/DarkModeContext'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MusicSection from '../components/MusicSection'
import FAQ from '../components/FAQ'
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
        <FAQ
          title="Frequently Asked Questions"
          subtitle={"Holy FAQ! 🤯 Still have questions?\nHere are some frequently asked questions"}
          items={[
          {
            question: "What kind of projects do you take on?",
            answer: "I work on front-end projects ranging from portfolio sites and landing pages to more complex web applications. I focus on clean design, smooth interactions, and pixel-perfect implementation."
          },
          {
            question: "Are you available for freelance work?",
            answer: "Yes! I'm open to freelance projects. Feel free to reach out at info@seansupply.com and we can talk about what you have in mind."
          },
          {
            question: "What tools and technologies do you use?",
            answer: "I primarily work with React, Next.js, and Tailwind CSS on the front-end. For design I use Figma, and I deploy most projects on Vercel."
          },
          {
            question: "Do you also do design, or just development?",
            answer: "Both! I enjoy the full process from design to development. I can take a project from a rough idea all the way to a live, polished website."
          },
        ]} />
      </main>
      <Footer />
    </div>
  )
}
