import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NotFound({ darkMode, setDarkMode }) {
  return (
    <div className={`h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-primary uppercase text-8xl mb-4">Page not found</h1>
        <p className="font-secondary text-lg mb-8">The page you are looking for doesn’t 
        exist or has been moved.</p>
        <a href="/" className={`flex justify-center gap-2 p-4 rounded-full border font-secondary leading-none ${darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'}`}>
            <span>Back to home</span>👋🏻
          </a>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  )
}