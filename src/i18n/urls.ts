import type { AppLocale } from '@/i18n/routing'
import { routing } from '@/i18n/routing'
import { siteConfig } from '@/lib/site-config'

const localePrefixes: Record<AppLocale, string> = {
  en: '',
  'pt-BR': '/pt-br',
  es: '/es',
  fr: '/fr'
}

export function localizePath(pathname: string, locale: AppLocale) {
  const normalized = pathname === '/' ? '' : pathname
  return `${localePrefixes[locale]}${normalized}` || '/'
}

export function absoluteLocalizedUrl(pathname: string, locale: AppLocale) {
  return new URL(localizePath(pathname, locale), siteConfig.url).toString()
}

export function languageAlternates(pathname: string) {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      absoluteLocalizedUrl(pathname, locale)
    ])
  )

  return {
    ...languages,
    'x-default': absoluteLocalizedUrl(pathname, routing.defaultLocale)
  }
}
