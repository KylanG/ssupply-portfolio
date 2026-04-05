'use client'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { useDarkMode } from '../context/DarkModeContext'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

const MusicSection = dynamic(() => import('../components/MusicSection'), { ssr: false })

export default function Home() {
  const { darkMode } = useDarkMode()
  const t = useTranslations('home')

  const faqItems = t.raw('faq')

  return (
    <div className="relative min-h-screen flex flex-col">
      <img
        src="/outline-text.svg"
        alt=""
        aria-hidden="true"
        className={`absolute w-full bottom-0 select-none pointer-events-none z-0 transition-opacity duration-300 ${darkMode ? 'opacity-10' : 'opacity-50'}`}
      />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Hero
          title={<>{t('titleLine1')}<br />{t('titleLine2')} <span aria-hidden="true">👋🏻</span></>}
          subtitle={t('subtitle')}
          buttons={[
            { label: t('sayHello'), emoji: '👋🏻', href: 'mailto:info@seansupply.com', filled: true },
            { label: t('downloadCv'), emoji: '🔗', href: '/kylan-groen-cv.pdf', external: true, filled: false },
          ]}
        />
        <MusicSection />
        <FAQ
          title={t('faqTitle')}
          subtitle={t('faqSubtitle')}
          items={faqItems}
        />
      </main>
      <Footer />
    </div>
  )
}
