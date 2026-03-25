import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function Work({ darkMode, setDarkMode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="relative z-10 flex-1">
        <Hero
          darkMode={darkMode}
          title="Check out some of the work I've done."
          subtitle="A collection of things I've built, designed, and shipped. More coming soon."
          buttons={[
            {
              label: "Say hello",
              emoji: "👋🏻",
              href: "mailto:info@seansupply.com",
              filled: true,
              external: false,
            }
          ]}
        />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  )
}