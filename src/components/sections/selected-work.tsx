import { Link } from '@/i18n/navigation'
import { siteConfig } from '@/lib/site-config'
import { useTranslations } from 'next-intl'

const projects = [
  {
    id: 'one',
    number: '01',
    stack: ['React', 'Next.js', 'Node.js', 'MySQL', 'REST'],
    context: 'https://www.odeen.com.br/'
  },
  {
    id: 'two',
    number: '02',
    stack: ['TypeScript', 'WebSocket', 'React', 'Node.js'],
    context: 'https://www.odeen.com.br/'
  },
  {
    id: 'three',
    number: '03',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Biome', 'pnpm'],
    context: siteConfig.links.github
  }
] as const

export function SelectedWork() {
  const t = useTranslations('Home.work')

  return (
    <section className="portfolio-container portfolio-section" id="work">
      <div className="portfolio-section-heading">
        <div>
          <span className="portfolio-kicker">{t('kicker')}</span>
          <h2>{t('title')}</h2>
        </div>
        <p>{t('intro')}</p>
      </div>

      <div className="portfolio-project-grid">
        {projects.map((project) => (
          <article className="portfolio-project-card" key={project.number}>
            <div className="portfolio-project-top">
              <span>{project.number}</span>
              <Link
                href={project.context}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('contextFor', {
                  title: t(`projects.${project.id}.title`)
                })}
              >
                {t('context')} <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <h3>{t(`projects.${project.id}.title`)}</h3>

            <dl>
              <div>
                <dt>{t('problem')}</dt>
                <dd>{t(`projects.${project.id}.problem`)}</dd>
              </div>
              <div>
                <dt>{t('solution')}</dt>
                <dd>{t(`projects.${project.id}.solution`)}</dd>
              </div>
            </dl>

            <div className="portfolio-project-result">
              <span>{t('result')}</span>
              <strong>{t(`projects.${project.id}.result`)}</strong>
            </div>

            <div className="portfolio-tags">
              {project.stack.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
