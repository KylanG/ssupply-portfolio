import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import OutlineText from '../assets/outline-text.svg'

export default function NotFound({ darkMode, setDarkMode }) {
  return (
    <div className={`relative h-screen flex flex-col overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>

      {/* Decoratieve SVG achtergrond */}
      <img
        src={OutlineText}
        className={`absolute w-full bottom-0 select-none pointer-events-none z-0 transition-opacity duration-300 ${darkMode ? 'opacity-10' : 'opacity-50'}`}
      />

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-primary uppercase text-5xl mb-4">Page not found</h1>
        <p className="font-secondary text-lg mb-8">The page you are looking for doesn't
        exist or has been moved.</p>
        <a href="/" className={`flex justify-center gap-2 p-4 rounded-full border font-secondary leading-none ${darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'}`}>
          <span>Back to home</span>👋🏻
        </a>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  )
}