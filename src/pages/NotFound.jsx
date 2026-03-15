import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NotFound({ darkMode, setDarkMode }) {
  return (
    <div className={`h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-primary uppercase text-8xl mb-4">404</h1>
        <p className="font-secondary text-lg mb-8">Oops! This page doesn't exist.</p>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  )
}