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
            <span className="portfolio-kicker">{t('kicker')}</span>
            <h2>{t('title')}</h2>
          </div>
          <p>{t('intro')}</p>
        </div>

        <div className="portfolio-stack-grid">
          {groups.map((group) => (
            <div className="portfolio-stack-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
