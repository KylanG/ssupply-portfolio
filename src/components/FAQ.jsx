'use client'
import { useState } from 'react'
import { useDarkMode } from '../context/DarkModeContext'

export default function FAQ({ title, subtitle, items = [] }) {
  const { darkMode } = useDarkMode()
  const [openIndex, setOpenIndex] = useState(null)

  function toggle(index) {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={`py-24 px-6 transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-2xl mx-auto">

        {title && (
          <h2 className="text-3xl md:text-4xl font-primary uppercase text-center mb-4">
            {title}
          </h2>
        )}

        {subtitle && (
          <p className={`font-secondary text-base md:text-lg text-center mb-12 whitespace-pre-line ${darkMode ? 'text-white' : 'text-black'}`}>
            {subtitle}
          </p>
        )}

        <div className="flex flex-col gap-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index
            const contentId = `faq-content-${index}`
            const buttonId = `faq-btn-${index}`

            return (
              <div
                key={item.question}
                className={`rounded-2xl px-6 transition-colors duration-300 ${darkMode ? 'bg-white/10' : 'bg-black/5'}`}
              >
                <button
                  id={buttonId}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="w-full flex justify-between items-center py-5 text-left gap-4"
                >
                  <span className="font-primary uppercase leading-none text-xl md:text-2xl">{item.question}</span>
                  <span className={`text-2xl transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
                </button>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}
                >
                  <p className={`font-secondary text-lg leading-relaxed ${darkMode ? 'text-white' : 'text-black'}`}>
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
