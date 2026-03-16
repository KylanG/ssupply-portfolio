export default function Footer({ darkMode }) {
  const links = [
    { label: "Linkedin", href: "https://www.linkedin.com/in/kylan-sean-groen/" },
    { label: "Github", href: "https://github.com/KylanG" },
    { label: "Soundcloud", href: "https://soundcloud.com/ssupply" },
  ];

  return (
    <footer className={`relative z-10 flex flex-col md:flex-row justify-between items-center px-8 py-6 font-secondary text-sm gap-4 transition-colors duration-300 ${darkMode ? "text-white" : "text-black"}`}>
      <p>© 2026 SSUPPLY – All rights reserved</p>
      <div className="flex gap-6">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="nav-link"
          >
            <span className="nav-text first">{label}</span>
            <span className="nav-text second">{label}</span>
          </a>
        ))}
      </div>
    </footer>
  );
}