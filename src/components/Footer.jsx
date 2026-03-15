export default function Footer({ darkMode }) {
  return (
    <footer className={`relative z-10 flex flex-col md:flex-row justify-between items-center px-8 py-6 font-secondary text-sm gap-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
      <p>© 2026 SSUPPLY – All rights reserved</p>
      <div className="flex gap-6">
        <a href="https://www.linkedin.com/in/kylan-sean-groen/" target="_blank" className="underline">Linkedin</a>
        <a href="https://www.linkedin.com/in/kylan-sean-groen/" target="_blank" className="underline">Github</a>
        <a href="https://soundcloud.com/ssupply" target="_blank" className="underline">Soundcloud</a>
      </div>
    </footer>
  )
}