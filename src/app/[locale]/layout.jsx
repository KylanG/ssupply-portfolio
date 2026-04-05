import '../../index.css'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '../../i18n/routing'
import ClientProviders from '../../components/ClientProviders'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const isNl = locale === 'nl'

  return {
    metadataBase: new URL('https://www.seansupply.com'),
    title: {
      default: 'SSUPPLY | Front-end developer portfolio',
      template: '%s | SSUPPLY',
    },
    description: isNl
      ? 'Kylan Groen is een front-end developer en web designer gevestigd in Rotterdam — gespecialiseerd in pixel-perfecte websites en digitale ervaringen.'
      : 'Kylan Groen is a front-end developer and web designer based in Rotterdam — crafting pixel-perfect websites and digital experiences.',
    icons: { icon: '/favicon.png' },
    openGraph: {
      type: 'website',
      locale: isNl ? 'nl_NL' : 'en_US',
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
      </body>
    </html>
  )
}
