import Home from '../../views/Home'
import JsonLd from '../../components/JsonLd'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: 'SSUPPLY — Front-end Developer Portfolio',
    description: locale === 'nl'
      ? 'Front-end developer en webdesigner gevestigd in Rotterdam. Ik bouw snelle, moderne websites en web apps met React en Next.js.'
      : locale === 'pt'
      ? 'Desenvolvedor front-end baseado em Rotterdam. Especializado em React, Next.js e TypeScript. Criando interfaces pixel-perfeitas.'
      : 'Front-end developer and web designer based in Rotterdam. I build fast, modern websites and web apps using React and Next.js.',
    openGraph: {
      type: 'website',
      siteName: 'SSUPPLY',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
      title: 'SSUPPLY — Front-end Developer Portfolio',
      description: locale === 'nl'
        ? 'Front-end developer en webdesigner gevestigd in Rotterdam. Ik bouw snelle, moderne websites en web apps met React en Next.js.'
        : locale === 'pt'
        ? 'Desenvolvedor front-end baseado em Rotterdam. Especializado em React, Next.js e TypeScript. Criando interfaces pixel-perfeitas.'
        : 'Front-end developer and web designer based in Rotterdam. I build fast, modern websites and web apps using React and Next.js.',
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
