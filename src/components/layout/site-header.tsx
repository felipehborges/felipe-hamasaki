import { LanguageSwitcher } from '@/components/layout/language-switcher'
import type { AppLocale } from '@/i18n/routing'
import { localizePath } from '@/i18n/urls'
import { siteConfig } from '@/lib/site-config'
import { useLocale, useTranslations } from 'next-intl'

export function SiteHeader() {
  const t = useTranslations('Header')
  const design = useTranslations('Design')
  const locale = useLocale() as AppLocale

  return (
    <header className="minimal-header">
      <nav
        className="minimal-container minimal-nav"
        aria-label={t('primaryNavigation')}
      >
        <a className="minimal-wordmark" href={localizePath('/#top', locale)}>
          <i /> hamasaki.dev
        </a>
        <div className="minimal-nav-links">
          <a href={localizePath('/#work', locale)}>{t('work')}</a>
          <a href={localizePath('/#about', locale)}>{t('about')}</a>
          <a href={localizePath('/#playground', locale)}>{design('play')}</a>
          <a href={`mailto:${siteConfig.email}`}>{design('email')}</a>
          <LanguageSwitcher label={t('language')} locale={locale} compact />
        </div>
      </nav>
    </header>
  )
}
