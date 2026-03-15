export default function NotFound({ darkMode }) {
    return (
      <div className={`h-screen flex flex-col items-center justify-center text-center px-6 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <h1 className="font-primary uppercase text-8xl mb-4">404</h1>
        <p className="font-secondary text-lg mb-8">Oops! This page doesn't exist.</p>
        
          href="/"
          className={`flex gap-2 px-6 py-4 rounded-full border font-secondary leading-none transition-colors duration-300 ${darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'}`}
        <a>
          Go back home
        </a>
      </div>
    )
  }