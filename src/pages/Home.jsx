import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import OutlineText from '../assets/outline-text.svg'

export default function Home({ darkMode, setDarkMode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <img
        src={OutlineText}
        className={`absolute w-full bottom-0 select-none pointer-events-none z-0 transition-opacity duration-300 ${darkMode ? 'opacity-10' : 'opacity-50'}`}
      />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="relative z-10 flex-1">
      <Hero
  darkMode={darkMode}
  title="Hi! I'm Kylan, a front-end developer & web designer 👋🏻"
  subtitle="I'm a developer and web designer based in Rotterdam, passionate about creativity and bringing pixel-perfect designs to life."
  buttons={[
    { label: "Say hello", emoji: "👋🏻", href: "mailto:info@seansupply.com", filled: true },
    { label: "Download CV", emoji: "🔗", href: "/kylan-groen-cv.pdf", external: true, filled: false },
  ]}
/>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  )
}