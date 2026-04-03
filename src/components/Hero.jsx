'use client'
import { useDarkMode } from '../context/DarkModeContext'
import Button from './Button'

export default function Hero({ title, subtitle, buttons }) {
  const { darkMode } = useDarkMode()

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="relative z-10 flex flex-col items-center">

        {title && (
          <h1 className="text-4xl md:text-5xl font-primary uppercase mb-4">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className={`text-base md:text-lg font-secondary max-w-xl mb-8 ${darkMode ? 'text-white' : 'text-black'}`}>
            {subtitle}
          </p>
        )}

        {buttons && buttons.length > 0 && (
          <div className="flex flex-row gap-3">
            {buttons.map((button) => (
              <Button
                key={button.href}
                href={button.href}
                variant={button.filled ? 'primary' : 'secondary'}
                newTab={button.external}
              >
                <span>{button.label}</span>
                {button.emoji && <span aria-hidden="true">{button.emoji}</span>}
              </Button>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
