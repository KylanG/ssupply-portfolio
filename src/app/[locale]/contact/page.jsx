import Contact from '../../../views/Contact'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: 'Contact',
    description: 'Get in touch with SSUPPLY for front-end development work or collaborations.',
    openGraph: {
      url: locale === 'nl' ? 'https://www.seansupply.com/nl/contact' : 'https://www.seansupply.com/contact',
    },
    alternates: {
      languages: {
        en: 'https://www.seansupply.com/contact',
        nl: 'https://www.seansupply.com/nl/contact',
      },
    },
  }
}

export default function Page() {
  return <Contact />
}
