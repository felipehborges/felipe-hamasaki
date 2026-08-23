import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'pt-BR', 'es', 'fr'],
  defaultLocale: 'en',
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      'pt-BR': '/pt-br'
    }
  },
  localeDetection: true,
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365
  }
})

export type AppLocale = (typeof routing.locales)[number]
