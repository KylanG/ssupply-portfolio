import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import NotFound from './pages/NotFound'
import useLenis from './hooks/useLenis'

export default function App() {
  useLenis()

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  return (
    <div className={`transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/work" element={<Work darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/about" element={<About darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="*" element={<NotFound darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}