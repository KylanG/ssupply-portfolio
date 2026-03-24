export default function Button({ variant = 'primary', href, children, darkMode, newTab = false, className = '', ...props }) {
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
  
    if (href) {
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
  
    return <button className={classes} {...props}>{children}</button>
  }