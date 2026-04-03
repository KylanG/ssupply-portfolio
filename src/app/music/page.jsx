import Music from '../../pages/Music'
import JsonLd from '../../components/JsonLd'

export const metadata = {
  title: 'Music',
  description: 'Listen to the latest releases and productions by SSUPPLY — available on Spotify and SoundCloud.',
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
