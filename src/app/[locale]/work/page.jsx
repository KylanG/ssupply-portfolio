import Work from '../../../views/Work'
import JsonLd from '../../../components/JsonLd'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: locale === 'pt' ? 'Trabalho' : 'Work',
    description: locale === 'nl'
      ? 'Een selectie van front-end projecten door Kylan Groen (SSUPPLY). Gebouwd met React, Next.js en TypeScript — van portfolio sites tot complexe webapplicaties.'
      : locale === 'pt'
      ? 'Projetos front-end selecionados por SSUPPLY. Construidos com React, Next.js e TypeScript.'
      : 'Selected front-end projects by Kylan Groen (SSUPPLY). Built with React, Next.js, and TypeScript — from portfolio sites to complex web applications.',
    openGraph: {
      type: 'website',
      siteName: 'SSUPPLY',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
      title: locale === 'pt' ? 'Trabalho' : 'Work',
      description: locale === 'nl'
        ? 'Een selectie van front-end projecten door Kylan Groen (SSUPPLY). Gebouwd met React, Next.js en TypeScript — van portfolio sites tot complexe webapplicaties.'
        : locale === 'pt'
        ? 'Projetos front-end selecionados por SSUPPLY. Construidos com React, Next.js e TypeScript.'
        : 'Selected front-end projects by Kylan Groen (SSUPPLY). Built with React, Next.js, and TypeScript — from portfolio sites to complex web applications.',
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
