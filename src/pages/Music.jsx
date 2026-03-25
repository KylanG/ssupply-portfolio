import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MusicSection from '../components/MusicSection'
import Footer from '../components/Footer'

export default function Music({ darkMode, setDarkMode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="relative z-10 flex-1">
        <Hero
          darkMode={darkMode}
          title="My Music"
          subtitle="A collection of my latest releases, productions, and sounds coming out of the studio."
          buttons={[
            { label: "Listen on Spotify", emoji: "🎵", href: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4", external: true, filled: true },
            { label: "Follow on Soundcloud", emoji: "🔗", href: "https://soundcloud.com/ssupply", external: true, filled: false },
          ]}
        />
        <MusicSection darkMode={darkMode} showButtons={false} />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  )
}
