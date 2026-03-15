export default function Hero({ darkMode }) {
    return (
      <section className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-primary uppercase mb-4">
            Something exciting is coming,<br />
            check back soon! 👋🏻
          </h1>
          <p className={`text-base md:text-lg font-secondary max-w-xl mb-8 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
            In the meantime feel free to reach out at{" "}
            <a href="mailto:info@seansupply.com" className="underline">info@seansupply.com</a>
          </p>
  
          <div className="flex flex-col md:flex-row gap-3">
            <a href="mailto:info@seansupply.com" className={`flex justify-center gap-2 p-4 rounded-full border font-secondary leading-none transition-colors duration-300 ${darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'}`}>
              <span>Say hello</span>👋🏻
            </a>
            <a href="/kylan-groen-cv.pdf" download className={`flex justify-center gap-2 p-4 rounded-full border font-secondary leading-none transition-colors duration-300 ${darkMode ? 'border-white text-white' : 'border-black text-black'}`}>
              <span>Download CV</span>🔗
            </a>
          </div>
        </div>
      </section>
    )
  }