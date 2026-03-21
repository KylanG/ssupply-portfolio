export default function Hero({ darkMode, title, subtitle, buttons }) {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="relative z-10 flex flex-col items-center">

        {title && (
          <h1 className="text-3xl md:text-5xl font-primary uppercase mb-4 max-w-[55%]">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className={`text-base md:text-lg font-secondary max-w-xl mb-8 ${darkMode ? 'text-white' : 'text-black'}`}>
            {subtitle}
          </p>
        )}

        {buttons && buttons.length > 0 && (
          <div className="flex flex-col md:flex-row gap-3">
            {buttons.map((button, index) => (
              <a
                key={index}
                href={button.href}
                target={button.external ? '_blank' : undefined}
                rel={button.external ? 'noopener noreferrer' : undefined}
                className={`flex justify-center gap-2 p-4 rounded-full border font-secondary leading-none transition-colors duration-300 ${
                  button.filled
                    ? darkMode
                      ? 'border-white bg-white text-black'
                      : 'border-black bg-black text-white'
                    : darkMode
                      ? 'border-white text-white'
                      : 'border-black text-black'
                }`}
              >
                <span>{button.label}</span>
                {button.emoji && <span>{button.emoji}</span>}
              </a>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}