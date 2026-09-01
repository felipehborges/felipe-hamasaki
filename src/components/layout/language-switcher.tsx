'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { type AppLocale, routing } from '@/i18n/routing'

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
  function changeLocale(value: string) {
    if (!routing.locales.includes(value as AppLocale)) return
    const nextLocale = value as AppLocale
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
    <Select value={locale} onValueChange={changeLocale}>
      <SelectTrigger className="portfolio-language-switcher" aria-label={label}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((item) => (
          <SelectItem key={item} value={item}>
            {localeNames[item]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
