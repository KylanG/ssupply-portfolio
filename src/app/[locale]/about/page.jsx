import About from '../../../views/About'
import JsonLd from '../../../components/JsonLd'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: locale === 'nl' ? 'Over mij' : locale === 'pt' ? 'Sobre mim' : 'About',
    description: locale === 'nl'
      ? 'Ik ben Kylan Sean Groen, een front-end developer uit Rotterdam gericht op moderne webinterfaces en schone, detailgerichte code.'
      : locale === 'pt'
      ? 'Sou Kylan Sean Groen, um desenvolvedor front-end de Rotterdam focado em interfaces web modernas e codigo limpo.'
      : "I'm Kylan Sean Groen, a front-end developer from Rotterdam focused on modern web interfaces and clean, detail-driven code.",
    openGraph: {
      url: locale === 'nl' ? 'https://www.seansupply.com/nl/about' : locale === 'pt' ? 'https://www.seansupply.com/pt/about' : 'https://www.seansupply.com/about',
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
