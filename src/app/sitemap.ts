import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.seansupply.com'
const locales = ['en', 'nl'] as const

const routes = [
  { path: '', changeFrequency: 'monthly' as const, priority: 1 },
  { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/work', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/music', changeFrequency: 'weekly' as const, priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map(({ path, changeFrequency, priority }) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }))
  )
}
