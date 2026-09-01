import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { Button } from '@/components/ui/button'
import type { AppLocale } from '@/i18n/routing'
import { localizePath } from '@/i18n/urls'
import { siteConfig } from '@/lib/site-config'
import { ArrowUpRight } from 'lucide-react'
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
        <Button
          asChild
          variant="ghost"
          className="portfolio-wordmark h-auto p-0 hover:bg-transparent"
        >
          <a href={localizePath('/#top', locale)} aria-label={t('home')}>
            FH<span>.</span>
          </a>
        </Button>
        <div className="portfolio-nav-links">
          <Button asChild variant="ghost" size="sm">
            <a href={localizePath('/#work', locale)}>{t('work')}</a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href={localizePath('/#about', locale)}>{t('about')}</a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href={localizePath('/#experience', locale)}>{t('experience')}</a>
          </Button>
        </div>
        <div className="portfolio-nav-actions">
          <LanguageSwitcher label={t('language')} locale={locale} />
          <Button asChild className="portfolio-nav-cta">
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(t('emailSubject'))}`}
            >
              {t('talk')} <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  )
}
