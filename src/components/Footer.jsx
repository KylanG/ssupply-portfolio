'use client'
import { useDarkMode } from '../context/DarkModeContext'
import Button from './Button'

export default function Footer() {
  const { darkMode } = useDarkMode()

  const links = [
    { label: "Linkedin", href: "https://www.linkedin.com/in/kylan-sean-groen/" },
    { label: "Github", href: "https://github.com/KylanG" },
    { label: "Soundcloud", href: "https://soundcloud.com/ssupply" },
  ]

  return (
    <footer className={`relative z-10 flex flex-col md:flex-row justify-between items-center px-8 py-6 font-secondary gap-4 transition-colors duration-300 ${darkMode ? "text-white" : "text-black"}`}>
      <div className="flex-col w-full justify-center justify-items-center">
        <div className="flex-col justify-items-center py-24 w-full">
          <h2 className="text-3xl md:text-4xl text-center font-primary uppercase mb-4">
            Let's build something awesome,<br />or just share a friendly wave! 👋🏻
          </h2>

          <p className={`text-base md:text-lg font-secondary text-center max-w-xl mb-8 ${darkMode ? 'text-white' : 'text-black'}`}>
            Feel free to reach out at{" "}
            <a href="mailto:info@seansupply.com" className="underline">info@seansupply.com</a>
          </p>

          <div className="flex flex-row md:flex-row gap-3">
            <Button href="mailto:info@seansupply.com" variant="primary">
              <span>Say hello</span>👋🏻
            </Button>
            <Button href="/kylan-groen-cv.pdf" variant="secondary" newTab>
              <span>Download CV</span>🔗
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center w-full text-sm gap-4 md:gap-0">
          <p>© {new Date().getFullYear()} SSUPPLY – All rights reserved</p>

          <div className="flex gap-6">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="nav-link"
              >
                <span className="nav-text first">{label}</span>
                <span className="nav-text second">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
