import { siteConfig } from '@/lib/site-config'
import { useLocale, useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('Home.hero')
  const locale = useLocale()
  const resume =
    locale === 'pt-BR' ? siteConfig.resume.pt : siteConfig.resume.en

  return (
    <section className="portfolio-container portfolio-hero" id="top">
      <div className="portfolio-hero-copy">
        <div className="portfolio-eyebrow">
          <span className="portfolio-status-dot" />
          {t('status')}
        </div>

        <h1>
          {t('headline')} <em>{t('headlineEmphasis')}</em>
        </h1>

        <p className="portfolio-hero-lede">{t('lede')}</p>

        <div className="portfolio-hero-actions">
          <a
            className="portfolio-button portfolio-button-primary"
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(t('bookCall'))}`}
          >
            {t('bookCall')} <span aria-hidden="true">↗</span>
          </a>
          <a
            className="portfolio-button portfolio-button-secondary"
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('resume')} <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="portfolio-remote-facts" aria-label={t('remoteDetails')}>
          <div>
            <span>{t('timeZoneLabel')}</span>
            <strong>{t('timeZoneValue')}</strong>
          </div>
          <div>
            <span>{t('englishLabel')}</span>
            <strong>{t('englishValue')}</strong>
          </div>
          <div>
            <span>{t('statusLabel')}</span>
            <strong>{t('statusValue')}</strong>
          </div>
        </div>
      </div>

      <div className="portfolio-hero-art" aria-hidden="true">
        <div className="portfolio-orbit portfolio-orbit-one" />
        <div className="portfolio-orbit portfolio-orbit-two" />
        <div className="portfolio-code-card">
          <div className="portfolio-code-dots">
            <i />
            <i />
            <i />
          </div>
          <code>
            <span>felipe</span>@são-paulo:~$
          </code>
          <p>
            {t('codeLine1')}
            <br />
            {t('codeLine2')}
          </p>
          <small>{t('codeComment')}</small>
        </div>
        <div className="portfolio-metric-chip">
          <b>24/7</b>
          <span>{t('operations')}</span>
        </div>
      </div>
    </section>
  )
}
