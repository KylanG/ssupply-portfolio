import NotFound from '../pages/NotFound'

export const metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFoundPage() {
  return <NotFound />
}
