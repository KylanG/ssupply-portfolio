import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'nl', 'pt'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
})
