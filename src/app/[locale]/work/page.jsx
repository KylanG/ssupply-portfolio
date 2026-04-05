import Work from '../../../views/Work'
import JsonLd from '../../../components/JsonLd'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: locale === 'pt' ? 'Trabalho' : 'Work',
    description: locale === 'nl'
      ? 'Geselecteerde front-end projecten door SSUPPLY. Gebouwd met React, Next.js en TypeScript.'
      : locale === 'pt'
      ? 'Projetos front-end selecionados por SSUPPLY. Construidos com React, Next.js e TypeScript.'
      : 'Selected front-end development projects by SSUPPLY. Built with React, Next.js, and TypeScript.',
    openGraph: {
      url: locale === 'nl' ? 'https://www.seansupply.com/nl/work' : locale === 'pt' ? 'https://www.seansupply.com/pt/work' : 'https://www.seansupply.com/work',
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
