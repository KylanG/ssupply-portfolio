import Music from '../../../views/Music'
import JsonLd from '../../../components/JsonLd'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: locale === 'nl' ? 'Muziek' : locale === 'pt' ? 'Musica' : 'Music',
    description: locale === 'nl'
      ? 'Muziekproducties door SSUPPLY. Afro house en elektronische geluiden als creatief nevenproject.'
      : locale === 'pt'
      ? 'Producoes musicais por SSUPPLY. Afro house e sons eletronicos como projeto criativo paralelo.'
      : 'Music productions by SSUPPLY. Afro house and electronic sounds as a creative side project.',
    openGraph: {
      url: locale === 'nl' ? 'https://www.seansupply.com/nl/music' : locale === 'pt' ? 'https://www.seansupply.com/pt/music' : 'https://www.seansupply.com/music',
    },
    alternates: {
      languages: {
        en: 'https://www.seansupply.com/music',
        nl: 'https://www.seansupply.com/nl/music',
      },
    },
  }
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.seansupply.com' },
    { '@type': 'ListItem', position: 2, name: 'Music', item: 'https://www.seansupply.com/music' },
  ],
}

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Music />
    </>
  )
}
