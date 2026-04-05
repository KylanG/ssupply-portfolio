import Home from '../../views/Home'
import JsonLd from '../../components/JsonLd'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: 'SSUPPLY — Front-end Developer Portfolio',
    description: locale === 'nl'
      ? 'Front-end developer gevestigd in Rotterdam. Gespecialiseerd in React, Next.js en TypeScript. Bouwt pixel-perfecte interfaces.'
      : locale === 'pt'
      ? 'Desenvolvedor front-end baseado em Rotterdam. Especializado em React, Next.js e TypeScript. Criando interfaces pixel-perfeitas.'
      : 'Front-end developer based in Rotterdam. Specialised in React, Next.js, and TypeScript. Building pixel-perfect interfaces.',
    openGraph: {
      url: locale === 'nl' ? 'https://www.seansupply.com/nl' : locale === 'pt' ? 'https://www.seansupply.com/pt' : 'https://www.seansupply.com',
    },
    alternates: {
      languages: {
        en: 'https://www.seansupply.com',
        nl: 'https://www.seansupply.com/nl',
      },
    },
  }
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SSUPPLY',
  url: 'https://www.seansupply.com',
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kylan Groen',
  url: 'https://www.seansupply.com',
  jobTitle: 'Front-end Developer & Web Designer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rotterdam',
    addressCountry: 'NL',
  },
  email: 'info@seansupply.com',
  sameAs: [
    'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4',
    'https://soundcloud.com/ssupply',
  ],
}

export default function Page() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={personSchema} />
      <Home />
    </>
  )
}
