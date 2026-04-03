import Work from '../../../views/Work'
import JsonLd from '../../../components/JsonLd'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: locale === 'nl' ? 'Work' : 'Work',
    description: locale === 'nl'
      ? 'Een collectie van projecten gebouwd, ontworpen en opgeleverd door Kylan — front-end development en web design vanuit Rotterdam.'
      : 'A collection of projects built, designed, and shipped by Kylan — front-end development and web design from Rotterdam.',
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
