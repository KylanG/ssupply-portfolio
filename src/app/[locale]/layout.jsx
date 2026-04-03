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
      ? 'Front-end developer & web designer gevestigd in Rotterdam.'
      : 'Front-end developer & web designer based in Rotterdam.',
    icons: { icon: '/favicon.png' },
    openGraph: {
      type: 'website',
      locale: isNl ? 'nl_NL' : 'en_US',
      siteName: 'SSUPPLY',
    },
    twitter: { card: 'summary_large_image' },
    alternates: {
      languages: {
        en: 'https://www.seansupply.com',
        nl: 'https://www.seansupply.com/nl',
      },
    },
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
