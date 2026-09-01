import { Link } from '@/i18n/navigation'
import { siteConfig } from '@/lib/site-config'
import { ArrowUpRight } from 'lucide-react'
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
          <Badge variant="ghost" className="portfolio-kicker p-0">
            {t('kicker')}
          </Badge>
          <h2>{t('title')}</h2>
        </div>
        <p>{t('intro')}</p>
      </div>

      <div className="portfolio-project-grid">
        {projects.map((project) => (
          <Card asChild className="portfolio-project-card" key={project.number}>
            <article>
              <CardHeader className="portfolio-project-top p-0">
                <Badge variant="outline">{project.number}</Badge>
                <Button asChild variant="ghost" size="sm">
                  <Link
                    href={project.context}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('contextFor', {
                      title: t(`projects.${project.id}.title`)
                    })}
                  >
                    {t('context')} <ArrowUpRight aria-hidden="true" />
                  </Link>
                </Button>
              </CardHeader>

              <CardContent className="p-0">
                <CardTitle asChild>
                  <h3>{t(`projects.${project.id}.title`)}</h3>
                </CardTitle>

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
              </CardContent>

              <CardFooter className="portfolio-tags p-0">
                {project.stack.map((technology) => (
                  <Badge variant="secondary" key={technology}>
                    {technology}
                  </Badge>
                ))}
              </CardFooter>
            </article>
          </Card>
        ))}
      </div>
    </section>
  )
}
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
