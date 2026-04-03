import About from '../../pages/About'
import JsonLd from '../../components/JsonLd'

export const metadata = {
  title: 'About',
  description: 'Get to know Kylan — a front-end developer and web designer based in Rotterdam with a passion for pixel-perfect design.',
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
