import { LanguageSwitcher } from '@/components/layout/language-switcher'
import type { AppLocale } from '@/i18n/routing'
import { localizePath } from '@/i18n/urls'
import { siteConfig } from '@/lib/site-config'
import { useLocale, useTranslations } from 'next-intl'

export function SiteHeader() {
  const t = useTranslations('Header')
  const locale = useLocale() as AppLocale

  return (
    <header className="portfolio-header">
      <nav
        className="portfolio-container portfolio-nav"
        aria-label={t('primaryNavigation')}
      >
        <a
          className="portfolio-wordmark"
          href={localizePath('/#top', locale)}
          aria-label={t('home')}
        >
          FH<span>.</span>
        </a>
        <div className="portfolio-nav-links">
          <a href={localizePath('/#work', locale)}>{t('work')}</a>
          <a href={localizePath('/#about', locale)}>{t('about')}</a>
          <a href={localizePath('/#experience', locale)}>{t('experience')}</a>
        </div>
        <div className="portfolio-nav-actions">
          <LanguageSwitcher label={t('language')} locale={locale} />
          <a
            className="portfolio-nav-cta"
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(t('emailSubject'))}`}
          >
            {t('talk')} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
