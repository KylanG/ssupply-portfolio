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
          <p className={`font-secondary text-sm md:text-base text-center mb-12 whitespace-pre-line ${darkMode ? 'text-white' : 'text-black  '}`}>
            {subtitle}
          </p>
        )}

        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl px-6 transition-colors duration-300 ${darkMode ? 'bg-white/10' : 'bg-black/5'}`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center py-5 text-left gap-4"
              >
                <span className="font-primary uppercase leading-none text-xl md:text-2xl">{item.question}</span>
                <span className={`text-2xl transition-transform duration-300 shrink-0 ${openIndex === index ? 'rotate-45' : ''}`}>+</span>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 pb-5' : 'max-h-0'}`}>
                <p className={`font-secondary text-base leading-relaxed ${darkMode ? 'text-white' : 'text-black'}`}>
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
