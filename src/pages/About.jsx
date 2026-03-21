import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function About({ darkMode, setDarkMode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="relative z-10 flex-1">
        <Hero
          darkMode={darkMode}
          title="About me"
          subtitle="A selection of projects I've worked on."
        />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  )
}