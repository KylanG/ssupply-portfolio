import Music from '../../../views/Music'
import JsonLd from '../../../components/JsonLd'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: locale === 'nl' ? 'Muziekreleases & Producties' : 'Music Releases & Productions',
    description: locale === 'nl'
      ? 'Luister naar de laatste muziekreleases en producties van SSUPPLY — beats en melodieën beschikbaar op Spotify en SoundCloud.'
      : 'Listen to the latest music releases and productions by SSUPPLY — electronic beats and melodies available on Spotify and SoundCloud.',
    openGraph: {
      url: locale === 'nl' ? 'https://www.seansupply.com/nl/music' : 'https://www.seansupply.com/music',
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
