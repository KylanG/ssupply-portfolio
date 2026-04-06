import '../../index.css'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '../../i18n/routing'
import ClientProviders from '../../components/ClientProviders'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const isNl = locale === 'nl'
  const isPt = locale === 'pt'

  return {
    metadataBase: new URL('https://www.seansupply.com'),
    ...(isPt && { robots: { index: false, follow: false } }),
    title: 'SSUPPLY — Front-end Developer Portfolio',
    description: 'Front-end developer based in Rotterdam. Specialised in React, Next.js, and TypeScript. Building pixel-perfect interfaces.',
    icons: { icon: '/favicon.png' },
    openGraph: {
      type: 'website',
      locale: isNl ? 'nl_NL' : isPt ? 'pt_BR' : 'en_US',
      siteName: 'SSUPPLY',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ClientProviders>
            {children}
          </ClientProviders>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="IVudNs/5r1pUTWugJfYvbw"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
