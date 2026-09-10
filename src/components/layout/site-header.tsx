import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { StyleSwitcher } from '@/components/studio/portfolio-style'
import { Button } from '@/components/ui/button'
import type { AppLocale } from '@/i18n/routing'
import { localizePath } from '@/i18n/urls'
import { useLocale, useTranslations } from 'next-intl'

export function SiteHeader() {
  const t = useTranslations('Header')
  const style = useTranslations('Portfolio')
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
            <a href={localizePath('/#contact', locale)}>{t('talk')}</a>
          </Button>
        </div>
        <div className="portfolio-nav-actions">
          <StyleSwitcher
            labels={{
              styleLabel: style('styleLabel'),
              terminal: style('terminal'),
              color: style('color'),
              minimal: style('minimal')
            }}
          />
          <LanguageSwitcher label={t('language')} locale={locale} />
        </div>
      </nav>
    </header>
  )
}
