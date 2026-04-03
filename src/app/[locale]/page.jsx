import Home from '../../views/Home'
import JsonLd from '../../components/JsonLd'

export async function generateMetadata() {
  return {
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
