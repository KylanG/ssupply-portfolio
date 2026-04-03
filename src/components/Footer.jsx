'use client'
import { useTranslations } from 'next-intl'
import { useDarkMode } from '../context/DarkModeContext'
import Button from './Button'

export default function Footer() {
  const { darkMode } = useDarkMode()
  const t = useTranslations('footer')

  const links = [
    { label: "Linkedin", href: "https://www.linkedin.com/in/kylan-sean-groen/" },
    { label: "Github", href: "https://github.com/KylanG" },
    { label: "Soundcloud", href: "https://soundcloud.com/ssupply" },
  ]

  return (
    <footer className={`relative z-10 flex flex-col md:flex-row justify-between items-center px-8 py-6 font-secondary gap-4 transition-colors duration-300 ${darkMode ? "text-white" : "text-black"}`}>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex flex-col items-center py-24 w-full">
          <h2 className="text-3xl md:text-4xl text-center font-primary uppercase mb-4">
            {t('cta')} <span aria-hidden="true">👋🏻</span>
          </h2>

          <p className={`text-base md:text-lg font-secondary text-center max-w-xl mb-8 ${darkMode ? 'text-white' : 'text-black'}`}>
            {t('email')}{" "}
            <a href="mailto:info@seansupply.com" className="underline">info@seansupply.com</a>
          </p>

          <div className="flex flex-row gap-3">
            <Button href="mailto:info@seansupply.com" variant="primary">
              <span>{t('sayHello')}</span><span aria-hidden="true">👋🏻</span>
            </Button>
            <Button href="/kylan-groen-cv.pdf" variant="secondary" newTab>
              <span>{t('downloadCv')}</span><span aria-hidden="true">🔗</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center w-full text-sm gap-4 md:gap-0">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>

          <div className="flex gap-6">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <span className="nav-text first">{label}</span>
                <span className="nav-text second" aria-hidden="true">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
