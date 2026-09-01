import { useTranslations } from 'next-intl'

export function AboutSection() {
  const t = useTranslations('Home.about')

  return (
    <section
      className="portfolio-container portfolio-section portfolio-about"
      id="about"
    >
      <div>
        <Badge variant="ghost" className="portfolio-kicker p-0">
          {t('kicker')}
        </Badge>
        <h2>
          {t('titleLine1')}
          <br />
          {t('titleLine2')}
        </h2>
      </div>

      <div className="portfolio-about-copy">
        <p>{t('paragraph1')}</p>
        <p>{t('paragraph2')}</p>
        <p>{t('paragraph3')}</p>
      </div>
    </section>
  )
}
import { Badge } from '@/components/ui/badge'
