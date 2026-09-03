import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { siteConfig } from '@/lib/site-config'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('Home.hero')
  const locale = useLocale()
  const resume =
    locale === 'pt-BR' ? siteConfig.resume.pt : siteConfig.resume.en

  return (
    <section className="portfolio-container portfolio-hero" id="top">
      <div className="portfolio-hero-copy">
        <Badge variant="outline" className="portfolio-eyebrow">
          <span className="portfolio-status-dot" aria-hidden="true" />
          {t('status')}
        </Badge>

        <h1>
          {t('headline')} <em>{t('headlineEmphasis')}</em>
        </h1>

        <p className="portfolio-hero-lede">{t('lede')}</p>

        <div className="portfolio-hero-actions">
          <Button asChild className="portfolio-button portfolio-button-primary">
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(t('bookCall'))}`}
            >
              {t('bookCall')} <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="portfolio-button portfolio-button-secondary"
          >
            <a href={resume} target="_blank" rel="noopener noreferrer">
              {t('resume')} <ArrowDown aria-hidden="true" />
            </a>
          </Button>
        </div>

        <div className="portfolio-remote-facts" aria-label={t('remoteDetails')}>
          <Card className="rounded-none border-0 bg-transparent shadow-none">
            <span>{t('timeZoneLabel')}</span>
            <strong>{t('timeZoneValue')}</strong>
          </Card>
          <Card className="rounded-none border-0 bg-transparent shadow-none">
            <span>{t('englishLabel')}</span>
            <strong>{t('englishValue')}</strong>
          </Card>
          <Card className="rounded-none border-0 bg-transparent shadow-none">
            <span>{t('statusLabel')}</span>
            <strong>{t('statusValue')}</strong>
          </Card>
        </div>
      </div>

      <div className="portfolio-hero-art" aria-hidden="true">
        <div className="portfolio-art-grid" />
        <div className="portfolio-orbit portfolio-orbit-one" />
        <div className="portfolio-orbit portfolio-orbit-two" />
        <div className="portfolio-sticker portfolio-sticker-ui">UI</div>
        <div className="portfolio-sticker portfolio-sticker-code">
          &lt;/&gt;
        </div>
        <Card className="portfolio-code-card">
          <CardContent className="p-0">
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
          </CardContent>
        </Card>
        <Badge variant="secondary" className="portfolio-metric-chip">
          <b>24/7</b>
          <span>{t('operations')}</span>
        </Badge>
      </div>

      <div className="portfolio-marquee" aria-hidden="true">
        <div className="portfolio-marquee-track">
          <span>FULL STACK</span>
          <i>✦</i>
          <span>DESIGN SYSTEMS</span>
          <i>✦</i>
          <span>PRODUCT THINKING</span>
          <i>✦</i>
          <span>INTERACTION</span>
          <i>✦</i>
          <span>FULL STACK</span>
          <i>✦</i>
          <span>DESIGN SYSTEMS</span>
          <i>✦</i>
          <span>PRODUCT THINKING</span>
          <i>✦</i>
          <span>INTERACTION</span>
          <i>✦</i>
        </div>
      </div>
    </section>
  )
}
