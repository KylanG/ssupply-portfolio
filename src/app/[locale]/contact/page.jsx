import ContactForm from '../../../views/ContactForm'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: locale === 'pt' ? 'Contato' : 'Contact',
    description: locale === 'nl'
      ? 'Neem contact op met SSUPPLY voor front-end development werk of samenwerkingen.'
      : locale === 'pt'
      ? 'Entre em contato com SSUPPLY para trabalho de desenvolvimento front-end ou colaboracoes.'
      : 'Get in touch with SSUPPLY for front-end development work or collaborations.',
    openGraph: {
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
