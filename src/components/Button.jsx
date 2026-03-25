'use client'
import Link from 'next/link'
import { useDarkMode } from '../context/DarkModeContext'

export default function Button({ variant = 'primary', href, children, newTab = false, className = '', darkMode: _darkMode, ...props }) {
  const { darkMode } = useDarkMode()

  const base = 'flex justify-center items-center gap-2 px-6 py-4 rounded-full border font-secondary leading-none transition-colors duration-300'

  const variants = {
    primary: darkMode
      ? 'bg-white text-black border-white hover:bg-transparent hover:text-white'
      : 'bg-black text-white border-black hover:bg-transparent hover:text-black',
    secondary: darkMode
      ? 'bg-transparent text-white border-white hover:bg-white hover:text-black'
      : 'bg-transparent text-black border-black hover:bg-black hover:text-white',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  const isExternal = href && (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('//'))

  if (href) {
    if (isExternal || newTab) {
      return (
        <a
          href={href}
          className={classes}
          {...(newTab && { target: '_blank', rel: 'noopener noreferrer' })}
          {...props}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return <button className={classes} {...props}>{children}</button>
}
