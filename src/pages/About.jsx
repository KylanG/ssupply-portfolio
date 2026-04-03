'use client'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="relative z-10 flex-1">
        <Hero
          title="About me"
          subtitle="Front-end developer and web designer based in Rotterdam, passionate about creativity and pixel-perfect design."
        />
      </main>
      <Footer />
    </div>
  )
}
