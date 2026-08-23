import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { Link } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'
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
        <Link
          className="portfolio-wordmark"
          href="/#top"
          aria-label={t('home')}
        >
          FH<span>.</span>
        </Link>
        <div className="portfolio-nav-links">
          <Link href="/#work">{t('work')}</Link>
          <Link href="/#about">{t('about')}</Link>
          <Link href="/#experience">{t('experience')}</Link>
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
