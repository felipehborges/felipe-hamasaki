'use client'

import type { AppLocale } from '@/i18n/routing'
import { localizePath } from '@/i18n/urls'

export function LanguageSwitcher({
  label,
  locale
}: { label: string; locale: AppLocale }) {
  const nextLocale = locale === 'en' ? 'pt-BR' : 'en'
  const nextLabel = nextLocale === 'en' ? 'EN' : 'PT-BR'

  function changeLocale() {
    const path = window.location.pathname
    const logicalPath =
      locale === 'pt-BR' ? path.replace(/^\/pt-br(?=\/|$)/i, '') || '/' : path
    document.cookie = `NEXT_LOCALE=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`
    window.location.assign(
      `${localizePath(logicalPath, nextLocale)}${window.location.search}${window.location.hash}`
    )
  }

  return (
    <button
      type="button"
      className="portfolio-language-switcher"
      onClick={changeLocale}
      aria-label={`${label}: ${nextLabel}`}
      title={nextLocale === 'en' ? 'Switch to English' : 'Mudar para português'}
    >
      {nextLabel}
    </button>
  )
}
