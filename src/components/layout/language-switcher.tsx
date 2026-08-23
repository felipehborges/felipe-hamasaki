'use client'

import { type AppLocale, routing } from '@/i18n/routing'
import type { ChangeEvent } from 'react'

const localeNames: Record<AppLocale, string> = {
  en: 'English',
  'pt-BR': 'Português (BR)',
  es: 'Español',
  fr: 'Français'
}

const localePrefixes: Record<AppLocale, string> = {
  en: '',
  'pt-BR': '/pt-br',
  es: '/es',
  fr: '/fr'
}

export function LanguageSwitcher({
  label,
  locale
}: {
  label: string
  locale: AppLocale
}) {
  function changeLocale(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as AppLocale
    const currentPrefix = localePrefixes[locale]
    const logicalPath =
      currentPrefix && window.location.pathname.startsWith(currentPrefix)
        ? window.location.pathname.slice(currentPrefix.length) || '/'
        : window.location.pathname
    const nextPath = `${localePrefixes[nextLocale]}${logicalPath}` || '/'

    document.cookie = `NEXT_LOCALE=${encodeURIComponent(nextLocale)}; Path=/; Max-Age=31536000; SameSite=Lax`
    window.location.assign(
      `${nextPath}${window.location.search}${window.location.hash}`
    )
  }

  return (
    <label className="portfolio-language-switcher">
      <span className="sr-only">{label}</span>
      <select aria-label={label} value={locale} onChange={changeLocale}>
        {routing.locales.map((item) => (
          <option key={item} value={item}>
            {localeNames[item]}
          </option>
        ))}
      </select>
    </label>
  )
}
