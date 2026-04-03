import Music from '../../../views/Music'
import JsonLd from '../../../components/JsonLd'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: locale === 'nl' ? 'Muziek' : 'Music',
    description: locale === 'nl'
      ? 'Luister naar de laatste releases en producties van SSUPPLY — beschikbaar op Spotify en SoundCloud.'
      : 'Listen to the latest releases and productions by SSUPPLY — available on Spotify and SoundCloud.',
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
