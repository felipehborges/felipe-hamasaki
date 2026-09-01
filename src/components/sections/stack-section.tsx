import { useTranslations } from 'next-intl'

export function StackSection() {
  const t = useTranslations('Home.stack')
  const groups = [
    {
      title: t('frontend'),
      items: [
        'TypeScript',
        'React',
        'Next.js',
        'Tailwind CSS',
        'Zustand',
        'React Query'
      ]
    },
    {
      title: t('backend'),
      items: ['Node.js', 'Express', 'MySQL', 'SQL', 'REST APIs', 'WebSocket']
    },
    {
      title: t('engineering'),
      items: [
        'Git',
        'Biome',
        'pnpm',
        t('componentArchitecture'),
        t('featureArchitecture')
      ]
    },
    {
      title: t('collaboration'),
      items: [
        t('integrations'),
        t('technicalWriting'),
        'Agile / Scrum',
        t('aiDevelopment')
      ]
    }
  ]

  return (
    <section className="portfolio-stack-section" id="stack">
      <div className="portfolio-container portfolio-section">
        <div className="portfolio-section-heading">
          <div>
            <Badge variant="ghost" className="portfolio-kicker p-0">
              {t('kicker')}
            </Badge>
            <h2>{t('title')}</h2>
          </div>
          <p>{t('intro')}</p>
        </div>

        <div className="portfolio-stack-grid">
          {groups.map((group) => (
            <Card className="portfolio-stack-group" key={group.title}>
              <CardHeader className="p-0">
                <CardTitle asChild>
                  <h3>{group.title}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
