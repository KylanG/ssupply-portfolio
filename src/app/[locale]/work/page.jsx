import Work from '../../../views/Work'
import JsonLd from '../../../components/JsonLd'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: locale === 'nl' ? 'Work — Projecten & Webdesign' : 'Work — Web Design & Development Projects',
    description: locale === 'nl'
      ? 'Een collectie van projecten gebouwd, ontworpen en opgeleverd door Kylan Groen — front-end development en web design vanuit Rotterdam.'
      : 'Browse projects built, designed, and shipped by Kylan Groen — front-end development and web design crafted in Rotterdam.',
    openGraph: {
      url: locale === 'nl' ? 'https://www.seansupply.com/nl/work' : 'https://www.seansupply.com/work',
    },
    alternates: {
      languages: {
        en: 'https://www.seansupply.com/work',
        nl: 'https://www.seansupply.com/nl/work',
      },
    },
  }
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.seansupply.com' },
    { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://www.seansupply.com/work' },
  ],
}

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Work />
    </>
  )
}
