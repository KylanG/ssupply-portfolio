import ContactForm from '../../../views/ContactForm'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: locale === 'pt' ? 'Contato' : 'Contact',
    description: locale === 'nl'
      ? 'Een project in gedachten of gewoon hallo zeggen? Stuur me een e-mail en ik kom bij je terug.'
      : locale === 'pt'
      ? 'Entre em contato com SSUPPLY para trabalho de desenvolvimento front-end ou colaboracoes.'
      : 'Got a project in mind or just want to say hi? Drop me an email and I\'ll get back to you.',
    openGraph: {
      type: 'website',
      siteName: 'SSUPPLY',
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
      title: locale === 'pt' ? 'Contato' : 'Contact',
      description: locale === 'nl'
        ? 'Een project in gedachten of gewoon hallo zeggen? Stuur me een e-mail en ik kom bij je terug.'
        : locale === 'pt'
        ? 'Entre em contato com SSUPPLY para trabalho de desenvolvimento front-end ou colaboracoes.'
        : 'Got a project in mind or just want to say hi? Drop me an email and I\'ll get back to you.',
      url: locale === 'nl' ? 'https://www.seansupply.com/nl/contact' : locale === 'pt' ? 'https://www.seansupply.com/pt/contact' : 'https://www.seansupply.com/contact',
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
  return <ContactForm />
}
