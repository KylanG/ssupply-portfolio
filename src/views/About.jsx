import { getTranslations } from 'next-intl/server'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default async function About() {
  const t = await getTranslations('about')

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="relative z-10 flex-1">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
        />
      </main>
      <Footer />
    </div>
  )
}
