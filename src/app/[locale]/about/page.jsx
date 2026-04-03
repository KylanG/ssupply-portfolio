import About from '../../../views/About'
import JsonLd from '../../../components/JsonLd'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: locale === 'nl' ? 'Over mij' : 'About',
    description: locale === 'nl'
      ? 'Leer Kylan kennen — een front-end developer en web designer gevestigd in Rotterdam met een passie voor pixel-perfect design.'
      : 'Get to know Kylan — a front-end developer and web designer based in Rotterdam with a passion for pixel-perfect design.',
    alternates: {
      languages: {
        en: 'https://www.seansupply.com/about',
        nl: 'https://www.seansupply.com/nl/about',
      },
    },
  }
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.seansupply.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.seansupply.com/about' },
  ],
}

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <About />
    </>
  )
}
