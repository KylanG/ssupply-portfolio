import Button from './Button'

export default function Hero({ darkMode, title, subtitle, buttons }) {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="relative z-10 flex flex-col items-center">

        {title && (
          <h1 className="text-4xl md:text-5xl font-primary uppercase mb-4 max-w-[85%] md:max-w-[60%]">
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
            {buttons.map((button, index) => (
              <Button
                key={index}
                href={button.href}
                variant={button.filled ? 'primary' : 'secondary'}
                darkMode={darkMode}
                newTab={button.external}
              >
                <span>{button.label}</span>
                {button.emoji && <span>{button.emoji}</span>}
              </Button>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}