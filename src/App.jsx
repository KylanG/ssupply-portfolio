import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="*" element={<NotFound darkMode={darkMode} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}