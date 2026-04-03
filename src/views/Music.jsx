'use client'
import { useTranslations } from 'next-intl'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MusicSection from '../components/MusicSection'
import Footer from '../components/Footer'

export default function Music() {
  const t = useTranslations('music')

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="relative z-10 flex-1">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          buttons={[
            { label: t('listenOnSpotify'), emoji: '🎵', href: 'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4', external: true, filled: true },
            { label: t('followOnSoundcloud'), emoji: '🔗', href: 'https://soundcloud.com/ssupply', external: true, filled: false },
          ]}
        />
        <MusicSection showButtons={false} />
      </main>
      <Footer />
    </div>
  )
}
