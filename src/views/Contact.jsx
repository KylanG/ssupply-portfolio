import { getTranslations } from 'next-intl/server'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default async function Contact() {
  const t = await getTranslations('contact')

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="relative z-10 flex-1">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          buttons={[
            { label: t('sayHello'), emoji: '👋🏻', href: 'mailto:info@seansupply.com', filled: true },
          ]}
        />
      </main>
      <Footer />
    </div>
  )
}
