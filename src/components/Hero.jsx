export default function Hero({ darkMode }) {
    return (
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-primary uppercase mb-4">
            Hi! I’m Kylan, a front-end<br></br>developer & web designer 👋🏻
          </h1>
          <p className={`text-base md:text-lg font-secondary max-w-xl mb-8 ${darkMode ? 'text-white' : 'text-black'}`}>
          I’m a developer and web designer based in Rotterdam, passionate<br></br>about creativity and bringing pixel-perfect designs to life.
          </p>
  
          <div className="flex flex-col md:flex-row gap-3">
            <a href="mailto:info@seansupply.com" className={`flex justify-center gap-2 p-4 rounded-full border font-secondary leading-none transition-colors duration-300 ${darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'}`}>
              <span>Say hello</span>👋🏻
            </a>
            <a href="/kylan-groen-cv.pdf" target="_blank" rel="noopener noreferrer" className={`flex justify-center gap-2 p-4 rounded-full border font-secondary leading-none transition-colors duration-300 ${darkMode ? 'border-white text-white' : 'border-black text-black'}`}>
              <span>Download CV</span>🔗
            </a>
          </div>
        </div>
      </section>
    )
  }