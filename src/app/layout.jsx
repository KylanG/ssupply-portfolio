import ClientProviders from '../components/ClientProviders'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../index.css'

export const metadata = {
  metadataBase: new URL('https://www.seansupply.com'),
  title: {
    default: 'SSUPPLY | Front-end developer portfolio',
    template: '%s | SSUPPLY',
  },
  description: 'Front-end developer & web designer based in Rotterdam.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SSUPPLY',
  },
  twitter: {
    card: 'summary_large_image',
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
