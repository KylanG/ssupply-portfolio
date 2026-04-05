import About from '../../../views/About'
import JsonLd from '../../../components/JsonLd'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: 'About',
    description: "I'm Kylan Sean Groen, a front-end developer from Rotterdam focused on modern web interfaces and clean, detail-driven code.",
    openGraph: {
      url: locale === 'nl' ? 'https://www.seansupply.com/nl/about' : 'https://www.seansupply.com/about',
    },
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
