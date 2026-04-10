import About from '../../../views/About'
import JsonLd from '../../../components/JsonLd'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: locale === 'nl' ? 'Over Mij' : locale === 'pt' ? 'Sobre mim' : 'About',
    description: locale === 'nl'
      ? "Ik ben Kylan Sean Groen — front-end developer en webdesigner uit Rotterdam. Gepassioneerd door clean code, pixel-perfect design en het bouwen van dingen die echt werken."
      : locale === 'pt'
      ? 'Sou Kylan Sean Groen, um desenvolvedor front-end de Rotterdam focado em interfaces web modernas e codigo limpo.'
      : "I'm Kylan Sean Groen — front-end developer and web designer from Rotterdam. Passionate about clean code, pixel-perfect design, and building things that work beautifully.",
    openGraph: {
      type: 'website',
      siteName: 'SSUPPLY',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
      title: locale === 'nl' ? 'Over Mij' : locale === 'pt' ? 'Sobre mim' : 'About',
      description: locale === 'nl'
        ? "Ik ben Kylan Sean Groen — front-end developer en webdesigner uit Rotterdam. Gepassioneerd door clean code, pixel-perfect design en het bouwen van dingen die echt werken."
        : locale === 'pt'
        ? 'Sou Kylan Sean Groen, um desenvolvedor front-end de Rotterdam focado em interfaces web modernas e codigo limpo.'
        : "I'm Kylan Sean Groen — front-end developer and web designer from Rotterdam. Passionate about clean code, pixel-perfect design, and building things that work beautifully.",
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
