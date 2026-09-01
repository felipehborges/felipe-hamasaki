import { useTranslations } from 'next-intl'

export function ExperienceTimeline() {
  const t = useTranslations('Home.experience')
  const experience = [
    'fullstack',
    'frontend',
    'junior',
    'hrAnalyst',
    'hrIntern',
    'teacher'
  ] as const

  return (
    <section className="portfolio-experience" id="experience">
      <div className="portfolio-container portfolio-section">
        <div className="portfolio-section-heading portfolio-section-heading-compact">
          <div>
            <Badge variant="ghost" className="portfolio-kicker p-0">
              {t('kicker')}
            </Badge>
            <h2>{t('title')}</h2>
          </div>
        </div>

        <div className="portfolio-timeline">
          {experience.map((entry) => (
            <Card asChild className="portfolio-timeline-row" key={entry}>
              <article>
                <time>{t(`entries.${entry}.period`)}</time>
                <div>
                  <h3>{t(`entries.${entry}.role`)}</h3>
                  <span>{t(`entries.${entry}.company`)}</span>
                </div>
                <p>{t(`entries.${entry}.impact`)}</p>
              </article>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
