import Work from '../../pages/Work'
import JsonLd from '../../components/JsonLd'

export const metadata = {
  title: 'Work',
  description: 'A collection of projects built, designed, and shipped by Kylan — front-end development and web design from Rotterdam.',
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
