import ClientProviders from '../components/ClientProviders'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../index.css'

export const metadata = {
  title: 'SSUPPLY | Front-end developer portfolio',
  description: 'Front-end developer & web designer based in Rotterdam.',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
